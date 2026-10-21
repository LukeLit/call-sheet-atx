"use client";

import { useState } from "react";
import type { ProgramStatus } from "@/lib/programs/types";

export type ProgramRow = {
  id: string;
  name: string;
  kind: string;
  url: string;
  status: ProgramStatus;
  lastVerified: string;
  daysAgo: number;
  verifiedBy: string;
  stale: boolean;
};

const STATUS_LABEL: Record<ProgramStatus, string> = {
  open: "Open",
  closed: "Closed",
  upcoming: "Not open yet",
  rolling: "Year-round",
  unknown: "No dates on file",
};

export function ProgramsPanel({
  rows,
  source,
  writable,
}: {
  rows: ProgramRow[];
  source: "supabase" | "seed";
  writable: boolean;
}) {
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const verify = async (id: string) => {
    setBusy(id);
    setError(null);
    try {
      const res = await fetch(`/api/admin/programs/${encodeURIComponent(id)}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      if (!res.ok) throw new Error(((await res.json()) as { error?: string }).error ?? "Verify failed.");
      window.location.reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Verify failed.");
      setBusy(null);
    }
  };

  const stale = rows.filter((r) => r.stale).length;

  return (
    <section className="mt-14">
      <h2 className="font-display text-2xl tracking-tight text-ink">Programs</h2>
      <p className="mt-2 text-sm text-ink/65">
        {rows.length} on file, read from {source === "supabase" ? "the database" : "the starter list in the code"}.{" "}
        {stale ? `${stale} not checked against the official page in over 90 days.` : "All checked in the last 90 days."}
      </p>
      {!writable ? (
        <p className="mt-2 rounded-md border border-ink/10 bg-paper/60 px-3 py-2 text-sm text-ink/70">
          The database is not connected (set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY), so this list is read-only and
          Muse is answering from the starter list.
        </p>
      ) : null}
      {error ? <p className="mt-2 text-sm text-red-700">{error}</p> : null}
      <ul className="mt-5 divide-y divide-ink/10 border-y border-ink/10">
        {rows.map((r) => (
          <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
            <div className="min-w-0">
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="font-medium text-ink underline-offset-2 hover:underline">
                {r.name}
              </a>
              <p className="text-xs text-ink/55">
                {r.kind} · {STATUS_LABEL[r.status]} · checked {r.lastVerified} ({r.daysAgo} days ago, {r.verifiedBy})
                {r.stale ? " · needs a check" : ""}
              </p>
            </div>
            {writable ? (
              <button
                type="button"
                disabled={busy === r.id}
                onClick={() => verify(r.id)}
                className="rounded-md border border-ink/15 px-3 py-1.5 text-xs text-ink/80 transition hover:border-ink/40 disabled:opacity-50"
              >
                {busy === r.id ? "Saving…" : "I checked it today"}
              </button>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
