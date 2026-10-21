import type { Program, ProgramStatus } from "./types";

/** A program not checked against its official page for this long is called out as stale. */
export const STALE_AFTER_DAYS = 90;

/**
 * Where the program stands right now, worked out from its dates, never stored. Only a dated window
 * or a rolling program gets a verdict; everything else is "unknown" and sends people to the
 * official page.
 */
export function programStatus(p: Program, now: Date = new Date()): ProgramStatus {
  const opens = p.opens ? new Date(p.opens).getTime() : null;
  const closes = p.closes ? new Date(p.closes).getTime() : null;
  const t = now.getTime();
  if (closes !== null && t > closes) return "closed";
  if (opens !== null && t < opens) return "upcoming";
  if (opens !== null || closes !== null) return "open";
  if (p.rolling) return "rolling";
  return "unknown";
}

export function daysSinceVerified(p: Program, now: Date = new Date()): number {
  const t = Date.parse(`${p.last_verified}T00:00:00Z`);
  return Number.isNaN(t) ? Infinity : Math.floor((now.getTime() - t) / 86_400_000);
}

export function isStale(p: Program, now: Date = new Date()): boolean {
  return daysSinceVerified(p, now) > STALE_AFTER_DAYS;
}
