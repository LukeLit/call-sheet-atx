import { gateway, GatewayModelNotFoundError } from "@ai-sdk/gateway";
import {
  convertToModelMessages,
  streamText,
  type ModelMessage,
  type UIMessage,
} from "ai";
import { MUSE_KNOWLEDGE } from "@/lib/muse/knowledge";

export const maxDuration = 60;
export const runtime = "nodejs";

const MODELS = [
  "inclusionai/ling-3.0-tiny-free",
  "inclusionai/ling-3.0-tiny",
  "openai/gpt-4o-mini",
] as const;

type MuseModel = (typeof MODELS)[number];

function errorText(error: unknown): string {
  if (error instanceof Error) {
    return `${error.name} ${error.message} ${error.stack ?? ""}`;
  }
  if (error && typeof error === "object") {
    const record = error as { message?: unknown; status?: unknown; statusCode?: unknown };
    return `${String(record.status ?? record.statusCode ?? "")} ${String(record.message ?? error)}`;
  }
  return String(error);
}

function isRetryableGatewayError(error: unknown): boolean {
  if (GatewayModelNotFoundError.isInstance(error)) return true;
  const status =
    error && typeof error === "object" && "statusCode" in error
      ? Number((error as { statusCode?: number }).statusCode)
      : undefined;
  if (status === 404 || status === 402) return true;
  const text = errorText(error).toLowerCase();
  if (/\b404\b/.test(text)) return true;
  if (/\b402\b/.test(text)) return true;
  if (text.includes("model not found") || text.includes("not_found")) return true;
  if (text.includes("does not exist")) return true;
  if (text.includes("payment required") || text.includes("payment")) return true;
  if (text.includes("insufficient") || text.includes("quota") || text.includes("billing")) return true;
  return false;
}

async function startModelStream(
  model: MuseModel,
  messages: ModelMessage[],
  signal: AbortSignal,
) {
  const result = streamText({
    model: gateway(model),
    system: MUSE_KNOWLEDGE,
    messages,
    abortSignal: signal,
  });

  const iterator = result.fullStream[Symbol.asyncIterator]();
  const first = await iterator.next();

  if (first.value && first.value.type === "error") {
    throw first.value.error instanceof Error
      ? first.value.error
      : new Error(String(first.value.error ?? `${model} stream error`));
  }

  return result;
}

export async function POST(request: Request) {
  if (!process.env.AI_GATEWAY_API_KEY) {
    return Response.json(
      { error: "Muse is missing AI_GATEWAY_API_KEY." },
      { status: 500 },
    );
  }

  let body: { messages?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const incoming = body.messages;
  if (!Array.isArray(incoming) || incoming.length === 0) {
    return Response.json({ error: "No valid messages provided." }, { status: 400 });
  }

  const first = incoming[0] as { parts?: unknown };
  const modelMessages: ModelMessage[] = first?.parts
    ? await convertToModelMessages(incoming as UIMessage[])
    : (incoming as ModelMessage[]);

  let lastError: unknown;

  for (let i = 0; i < MODELS.length; i += 1) {
    const model = MODELS[i];
    try {
      const result = await startModelStream(model, modelMessages, request.signal);
      console.info(`[muse] served by ${model}`);
      return result.toUIMessageStreamResponse();
    } catch (error) {
      lastError = error;
      const retryable = isRetryableGatewayError(error);
      const hasNext = i < MODELS.length - 1;
      console.warn(`[muse] ${model} failed`, error);
      if (!retryable || !hasNext) {
        break;
      }
    }
  }

  console.error("[muse] all models failed", lastError);
  return Response.json(
    { error: "Muse could not reach a model." },
    { status: 502 },
  );
}
