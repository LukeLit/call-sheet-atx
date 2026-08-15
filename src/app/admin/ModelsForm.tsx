"use client";

import { FormEvent, useMemo, useState } from "react";
import { ALLOWLIST, MODEL_SLOTS, type LiveModels } from "@/lib/muse/models";

type Persist = "live" | "preview";

type Props = {
  live: LiveModels;
  preview: string[] | null;
  writable: boolean;
};

const CUSTOM = "__custom__";

function sourceLabel(source: LiveModels["source"]): string {
  if (source === "edge") return "Edge Config";
  if (source === "env") return "MUSE_MODELS";
  return "built-in default";
}

export function ModelsForm({ live, preview, writable }: Props) {
  const initial = !writable && preview?.length === 3 ? preview : live.models;
  const padded = [initial[0] ?? "", initial[1] ?? "", initial[2] ?? ""];

  const [slots, setSlots] = useState<string[]>(padded);
  const [custom, setCustom] = useState(() => {
    return padded.find((id) => !ALLOWLIST.some((item) => item.id === id)) ?? "";
  });
  const [status, setStatus] = useState<{
    persist: Persist;
    message: string;
    museModelsEnv: string;
    writeError?: string;
  } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const options = useMemo(() => {
    const extra = custom.trim();
    const known = ALLOWLIST.map((item) => item.id);
    if (extra && !known.includes(extra)) {
      return [...ALLOWLIST, { id: extra, label: extra, note: "custom" }];
    }
    return ALLOWLIST;
  }, [custom]);

  const persistKind: Persist = writable ? "live" : "preview";
  const banner =
    persistKind === "live"
      ? "Live for everyone"
      : "Preview only (set MUSE_MODELS or Edge Config to persist)";

  const onSlot = (index: number, value: string) => {
    setSlots((current) => {
      const next = [...current];
      next[index] = value === CUSTOM ? custom.trim() : value;
      return next;
    });
  };

  const onCustom = (value: string) => {
    setCustom(value);
    setSlots((current) =>
      current.map((slot) =>
        !ALLOWLIST.some((item) => item.id === slot) ? value.trim() : slot,
      ),
    );
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/models", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ models: slots }),
      });
      const data = (await res.json()) as {
        error?: string;
        persist?: Persist;
        message?: string;
        museModelsEnv?: string;
        writeError?: string;
      };
      if (!res.ok) {
        setError(data.error ?? "Save failed.");
        return;
      }
      setStatus({
        persist: data.persist === "live" ? "live" : "preview",
        message: data.message ?? banner,
        museModelsEnv: data.museModelsEnv ?? slots.join(","),
        writeError: data.writeError,
      });
    } catch {
      setError("Save failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <p className="text-[11px] font-medium uppercase tracking-sheet text-ink/50">
          Muse
        </p>
        <h1 className="mt-3 font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink">
          Open Call ops
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/75">
          Model chain for the public Muse drawer. Primary, then fallback, then last.
        </p>
      </div>

      <div
        className={
          persistKind === "live"
            ? "border border-sage/40 bg-sage/10 px-4 py-3 text-sm text-ink"
            : "border border-amber/35 bg-amber/10 px-4 py-3 text-sm text-ink"
        }
      >
        <p className="font-medium">{banner}</p>
        <p className="mt-1 text-ink/70">
          Configured chain ({sourceLabel(live.source)}):{" "}
          <span className="break-all text-ink">{live.models.join(" → ")}</span>
        </p>
        <p className="mt-2 text-ink/65">
          Live Muse still uses the built-in default until the model-list read is
          wired. A preview cookie never changes Muse for anyone else.
        </p>
      </div>

      <section className="paper-grain shadow-sheet">
        <div className="flex items-center gap-2 border-b border-ink/10 px-4 py-3">
          <span className="punch" />
          <span className="punch" />
          <span className="punch" />
          <span className="ml-auto text-[10px] font-medium uppercase tracking-sheet text-ink/50">
            Chain
          </span>
        </div>
        <form onSubmit={submit} className="space-y-6 px-5 py-6">
          {MODEL_SLOTS.map((slot, index) => {
            const value = slots[index] ?? "";
            const listed = options.some((item) => item.id === value);
            return (
              <label key={slot.key} className="block">
                <span className="text-[10px] font-medium uppercase tracking-sheet text-ink/45">
                  {slot.label}
                </span>
                <select
                  value={listed ? value : CUSTOM}
                  onChange={(event) => onSlot(index, event.target.value)}
                  className="mt-2 w-full border border-ink/15 bg-paper-50 px-3 py-2 text-sm text-ink outline-none focus:border-ink/40"
                >
                  {options.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                      {item.note ? ` (${item.note})` : ""}
                    </option>
                  ))}
                  <option value={CUSTOM}>Custom…</option>
                </select>
              </label>
            );
          })}

          <label className="block">
            <span className="text-[10px] font-medium uppercase tracking-sheet text-ink/45">
              Custom model id
            </span>
            <input
              type="text"
              value={custom}
              onChange={(event) => onCustom(event.target.value)}
              placeholder="provider/model-id"
              className="mt-2 w-full border border-ink/15 bg-paper-50 px-3 py-2 text-sm text-ink outline-none focus:border-ink/40"
            />
          </label>

          <p className="text-sm leading-relaxed text-ink/60">
            <code className="text-ink">zai/glm-4.6v-flash</code> is vision only.
            glm-5.2 is not actually free for regular Gateway chat — do not list it
            as free.
          </p>

          {error ? (
            <p className="text-sm text-clay" role="alert">
              {error}
            </p>
          ) : null}

          {status ? (
            <div className="border border-ink/10 bg-paper-50 px-4 py-3 text-sm text-ink">
              <p className="font-medium">{status.message}</p>
              {status.writeError ? (
                <p className="mt-2 text-ink/65">{status.writeError}</p>
              ) : null}
              {status.persist === "preview" ? (
                <p className="mt-3 break-all text-ink/80">
                  Paste into Vercel env, then redeploy:
                  <br />
                  <code>MUSE_MODELS={status.museModelsEnv}</code>
                </p>
              ) : null}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={busy}
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-night-50 disabled:opacity-60"
          >
            {busy ? "Saving…" : "Save"}
          </button>
        </form>
      </section>

      <p className="text-sm text-ink/55">
        <a href="/" className="underline-offset-4 hover:underline">
          Back to the public site
        </a>
      </p>
    </div>
  );
}
