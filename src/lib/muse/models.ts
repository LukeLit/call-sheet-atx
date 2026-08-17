export const DEFAULT_MODELS = [
  "poolside/laguna-s-2.1-free",
  "alibaba/qwen3.8-27b",
  "alibaba/qwen3.7-flash",
] as const;

export type AllowlistedModel = {
  id: string;
  label: string;
  note?: string;
};

export const ALLOWLIST: AllowlistedModel[] = [
  { id: "poolside/laguna-s-2.1-free", label: "poolside/laguna-s-2.1-free" },
  {
    id: "alibaba/qwen3.8-27b",
    label: "alibaba/qwen3.8-27b",
    note: "free",
  },
  { id: "alibaba/qwen3.7-flash", label: "alibaba/qwen3.7-flash" },
  { id: "inclusionai/ling-3.0-flash", label: "inclusionai/ling-3.0-flash" },
  {
    id: "zai/glm-4.6v-flash",
    label: "zai/glm-4.6v-flash",
    note: "vision only",
  },
];

export const MODEL_SLOTS = [
  { key: "primary", label: "Primary" },
  { key: "fallback", label: "Fallback" },
  { key: "last", label: "Last" },
] as const;

const MODEL_ID = /^[a-z0-9][a-z0-9._-]*\/[a-z0-9._/-]+$/i;

export function parseModelList(value: unknown): string[] | null {
  if (typeof value === "string") {
    const parts = value
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);
    return parts.length ? parts : null;
  }
  if (Array.isArray(value)) {
    const parts = value
      .map((part) => (typeof part === "string" ? part.trim() : ""))
      .filter(Boolean);
    return parts.length ? parts : null;
  }
  return null;
}

export function serializeModels(models: string[]): string {
  return models.map((model) => model.trim()).filter(Boolean).join(",");
}

export function isValidModelId(value: string): boolean {
  return MODEL_ID.test(value.trim());
}

export function normalizeChain(models: string[]): string[] | null {
  const chain = models.map((model) => model.trim()).filter(Boolean);
  if (chain.length !== 3) return null;
  if (!chain.every(isValidModelId)) return null;
  return chain;
}

export type ModelSource = "edge" | "env" | "default";

export type LiveModels = {
  models: string[];
  source: ModelSource;
};
