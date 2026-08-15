import {
  DEFAULT_MODELS,
  parseModelList,
  serializeModels,
  type LiveModels,
} from "@/lib/muse/models";

export const MUSE_MODELS_KEY = "muse_models";

export type { LiveModels, ModelSource } from "@/lib/muse/models";

function connectionString(): string | undefined {
  return process.env.EDGE_CONFIG || process.env.GLOBAL_CONFIG || undefined;
}

export function parseEdgeConfigId(conn: string): string | null {
  try {
    const url = new URL(conn);
    const id = url.pathname.split("/").filter(Boolean)[0];
    return id || null;
  } catch {
    return null;
  }
}

/**
 * Official write path is the Vercel REST API with a Vercel Access Token.
 * There is no dedicated Edge Config write env. Store id is parsed from
 * EDGE_CONFIG / GLOBAL_CONFIG. Token env used in Vercel REST examples:
 * VERCEL_ACCESS_TOKEN.
 */
export function edgeWriteToken(): string | undefined {
  return process.env.VERCEL_ACCESS_TOKEN || undefined;
}

export function canWriteEdgeConfig(): boolean {
  const conn = connectionString();
  return Boolean(conn && parseEdgeConfigId(conn) && edgeWriteToken());
}

async function readEdgeModels(): Promise<string[] | null> {
  const conn = connectionString();
  if (!conn) return null;
  try {
    const url = new URL(conn);
    const itemUrl = `${url.origin}${url.pathname.replace(/\/$/, "")}/item/${MUSE_MODELS_KEY}${url.search}`;
    const res = await fetch(itemUrl, { cache: "no-store" });
    if (!res.ok) return null;
    const value: unknown = await res.json();
    return parseModelList(value);
  } catch (error) {
    console.warn("[admin] Edge Config read failed", error);
    return null;
  }
}

export async function readLiveModels(): Promise<LiveModels> {
  const fromEdge = await readEdgeModels();
  if (fromEdge) {
    return { models: fromEdge, source: "edge" };
  }
  const fromEnv = parseModelList(process.env.MUSE_MODELS);
  if (fromEnv) {
    return { models: fromEnv, source: "env" };
  }
  return { models: [...DEFAULT_MODELS], source: "default" };
}

export async function writeEdgeModels(models: string[]): Promise<void> {
  const conn = connectionString();
  const id = conn ? parseEdgeConfigId(conn) : null;
  const token = edgeWriteToken();
  if (!conn || !id || !token) {
    throw new Error("Edge Config write is not configured.");
  }

  let host = "";
  try {
    host = new URL(conn).host;
  } catch {
    host = "";
  }

  const resource = host.includes("global-config") ? "global-config" : "edge-config";
  const url = new URL(`https://api.vercel.com/v1/${resource}/${id}/items`);

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [
        {
          operation: "upsert",
          key: MUSE_MODELS_KEY,
          value: models,
        },
      ],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Edge Config write failed (${res.status}): ${text}`);
  }
}

export function museModelsEnvValue(models: string[]): string {
  return serializeModels(models);
}
