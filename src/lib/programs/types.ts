export const PROGRAM_KINDS = ["grant", "health", "work", "business", "other"] as const;
export type ProgramKind = (typeof PROGRAM_KINDS)[number];

/** One program Open Call knows about. The same shape as the `programs` table (supabase/001_programs.sql). */
export interface Program {
  id: string;
  name: string;
  kind: ProgramKind;
  /** Programs that run in one round (e.g. a city's funding cycle). */
  group?: string | null;
  summary: string;
  /** Eligibility as the official page words it. Never turned into "you qualify". */
  who: string[];
  amount?: string | null;
  /** ISO timestamps with a UTC offset. Null when the program has no dated window. */
  opens?: string | null;
  closes?: string | null;
  /** Joins any time (no cycle). */
  rolling?: boolean;
  /** Timing that is not a date: "opens in Summer 2027". */
  timing_note?: string | null;
  how_to_apply?: string | null;
  url: string;
  source_url?: string | null;
  region: string;
  /** The day someone last checked the official page against this row (YYYY-MM-DD). */
  last_verified: string;
  verified_by: string;
}

export type ProgramStatus = "open" | "closed" | "upcoming" | "rolling" | "unknown";
