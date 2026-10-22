import seed from "@/data/programs.json" with { type: "json" };
import type { Program } from "./types";

/**
 * Where the programs live. With SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SECRET_KEY) set, the `programs` table
 * (supabase/001_programs.sql) is the source of truth and the ops desk can verify rows from /admin.
 * Without them the starter list in src/data/programs.json is served, read-only, so the site never
 * depends on the database being there. The key is server-only: never expose it to the browser.
 */
export type ProgramSource = "supabase" | "seed";

const seedPrograms = seed as Program[];

/** Give up on a hung programs host and let the starter list answer. Shorter than the function's maxDuration. */
export const PROGRAMS_FETCH_TIMEOUT_MS = 10_000;

function config(): { url: string; key: string } | null {
  const url = process.env.SUPABASE_URL?.trim().replace(/\/+$/, "");
  // The Vercel integration sets both: the legacy service role key (a JWT) and the newer secret key
  const key = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY)?.trim();
  return url && key ? { url, key } : null;
}

export function canWritePrograms(): boolean {
  return config() !== null;
}

/** PostgREST `Content-Range` total (`0-0/9` → 9). `*` and a missing header are an unknown total. */
export function contentRangeTotal(header: string | null): number | null {
  if (!header) return null;
  const match = /\/(\d+)\s*$/.exec(header);
  return match ? Number(match[1]) : null;
}

function headers(key: string, extra?: Record<string, string>): Record<string, string> {
  // The legacy key is a JWT and also goes in Authorization; the newer sb_secret_ key is not a JWT and
  // goes in apikey alone
  return { apikey: key, ...(key.startsWith("eyJ") ? { Authorization: `Bearer ${key}` } : {}), ...extra };
}

export async function readPrograms(): Promise<{ programs: Program[]; source: ProgramSource }> {
  const c = config();
  if (!c) return { programs: seedPrograms, source: "seed" };
  try {
    const res = await fetch(`${c.url}/rest/v1/programs?select=*&order=name.asc`, {
      headers: headers(c.key, { Prefer: "count=exact" }),
      cache: "no-store",
      signal: AbortSignal.timeout(PROGRAMS_FETCH_TIMEOUT_MS),
    });
    if (!res.ok) throw new Error(`Supabase ${res.status}`);
    const rows = (await res.json()) as Program[];
    // An empty table is not "no programs": it is a database nobody has seeded yet
    if (!Array.isArray(rows) || rows.length === 0) throw new Error("programs table is empty");
    // A page that says the table is larger is not the catalog. A one-row 200 with no larger
    // total is the whole table (check 9): do not backfill the starter list over it.
    const total = contentRangeTotal(res.headers.get("content-range"));
    if (total !== null && rows.length < total) {
      throw new Error(`programs page is short of the table (${rows.length}/${total})`);
    }
    return { programs: rows, source: "supabase" };
  } catch (error) {
    console.warn("[programs] database read failed, serving the starter list", error);
    return { programs: seedPrograms, source: "seed" };
  }
}

/** Record that someone checked this program against its official page today. */
export async function verifyProgram(id: string, by: string): Promise<void> {
  const c = config();
  if (!c) throw new Error("The programs database is not configured.");
  if (!/^[a-z0-9-]+$/.test(id)) throw new Error("Bad program id.");
  const today = new Date().toISOString().slice(0, 10);
  const res = await fetch(`${c.url}/rest/v1/programs?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: headers(c.key, { "Content-Type": "application/json", Prefer: "return=representation" }),
    body: JSON.stringify({ last_verified: today, verified_by: by }),
  });
  if (!res.ok) throw new Error(`Verify failed (${res.status}): ${await res.text()}`);
  const rows = (await res.json()) as unknown[];
  if (!rows.length) throw new Error("No such program.");
}
