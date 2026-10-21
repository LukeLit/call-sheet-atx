import { daysSinceVerified, isStale, programStatus } from "./status";
import type { Program } from "./types";

const when = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", dateStyle: "long", timeStyle: "short" }).format(new Date(iso));

function statusLine(p: Program, now: Date): string {
  switch (programStatus(p, now)) {
    case "closed":
      return `closed (it closed ${when(p.closes as string)})`;
    case "upcoming":
      return `not open yet (opens ${when(p.opens as string)})`;
    case "open":
      return p.closes ? `open now, until ${when(p.closes)}` : "open now";
    case "rolling":
      return "no cycle: people can join or ask any time";
    default:
      return "dates not on file: send people to the official page";
  }
}

/** One program as plain text for Muse. Status and age are worked out now, not stored. */
export function renderProgram(p: Program, now: Date = new Date()): string {
  const days = daysSinceVerified(p, now);
  const lines = [
    `- ${p.name} [${p.kind}, ${p.region}] STATUS: ${statusLine(p, now)}`,
    `  What: ${p.summary}`,
    p.who.length ? `  Who (the official page's wording; never say someone is eligible): ${p.who.join("; ")}` : "",
    p.amount ? `  Amount: ${p.amount}` : "",
    p.timing_note ? `  Timing: ${p.timing_note}` : "",
    p.how_to_apply ? `  How to apply: ${p.how_to_apply}` : "",
    `  Official page: ${p.url}`,
    `  Last checked against the official page: ${p.last_verified} (${days} days ago, by ${p.verified_by})${isStale(p, now) ? ". STALE: say it may have changed" : ""}`,
  ];
  return lines.filter(Boolean).join("\n");
}

const MAX_ROWS = 30;

/**
 * Which programs go to Muse for this question. A small list goes whole; a long one is cut to the
 * rows that share words with the question (and always the rolling ones people can use today).
 */
export function selectPrograms(all: Program[], question: string): Program[] {
  if (all.length <= MAX_ROWS) return all;
  const words = new Set(question.toLowerCase().match(/[a-z]{3,}/g) ?? []);
  const score = (p: Program) => {
    const hay = `${p.name} ${p.kind} ${p.group ?? ""} ${p.summary} ${p.region}`.toLowerCase();
    let s = p.rolling ? 0.5 : 0;
    for (const w of Array.from(words)) if (hay.includes(w)) s += 1;
    return s;
  };
  return [...all].sort((a, b) => score(b) - score(a)).slice(0, MAX_ROWS);
}

export function renderPrograms(all: Program[], question: string, now: Date = new Date()): string {
  const today = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", dateStyle: "full" }).format(now);
  return [
    `Today is ${today} (Austin time).`,
    `PROGRAMS: the only programs you may talk about, ${all.length} on file. Statuses were worked out today from each program's dates.`,
    ...selectPrograms(all, question).map((p) => renderProgram(p, now)),
  ].join("\n");
}
