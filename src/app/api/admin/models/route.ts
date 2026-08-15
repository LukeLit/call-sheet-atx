import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { PREVIEW_COOKIE, previewCookieOptions } from "@/lib/admin/auth";
import { normalizeChain, parseModelList } from "@/lib/muse/models";
import {
  canWriteEdgeConfig,
  museModelsEnvValue,
  readLiveModels,
  writeEdgeModels,
} from "@/lib/muse/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const live = await readLiveModels();
  const preview = parseModelList(cookies().get(PREVIEW_COOKIE)?.value);
  const writable = canWriteEdgeConfig();
  return NextResponse.json({
    live,
    preview,
    persist: writable ? "live" : "preview",
    museModelsEnv: museModelsEnvValue(preview ?? live.models),
  });
}

export async function POST(request: Request) {
  let body: { models?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const incoming = Array.isArray(body.models)
    ? body.models.map((model) => String(model))
    : [];
  const chain = normalizeChain(incoming);
  if (!chain) {
    return NextResponse.json(
      { error: "Need primary, fallback, and last as provider/model ids." },
      { status: 400 },
    );
  }

  const envValue = museModelsEnvValue(chain);
  const liveAfterWrite = async () => readLiveModels();

  const payload = async (
    persist: "live" | "preview",
    extra: Record<string, unknown> = {},
  ) => {
    const body = {
      ok: true,
      persist,
      live: await liveAfterWrite(),
      preview: chain,
      museModelsEnv: envValue,
      message:
        persist === "live"
          ? "Live for everyone"
          : "Preview only (set MUSE_MODELS or Edge Config to persist)",
      ...extra,
    };
    const response = NextResponse.json(body);
    response.cookies.set(PREVIEW_COOKIE, envValue, previewCookieOptions());
    return response;
  };

  if (canWriteEdgeConfig()) {
    try {
      await writeEdgeModels(chain);
      return payload("live");
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return payload("preview", { writeError: message });
    }
  }

  return payload("preview");
}
