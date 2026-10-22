import { daysSinceVerified, isStale, programStatus } from "./status";
import type { Program } from "./types";

const when = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", dateStyle: "long", timeStyle: "short" }).format(new Date(iso));

function statusLine(p: Program, now: Date): string {
  const status = programStatus(p, now);
  switch (status) {
    case "closed":
      return `closed (it closed ${when(p.closes as string)})`;
    case "upcoming":
      return `not open yet (opens ${when(p.opens as string)})`;
    case "open": {
      const closes = typeof p.closes === "string" ? new Date(p.closes).getTime() : Number.NaN;
      return Number.isFinite(closes) ? `open now, until ${when(p.closes as string)}` : "open now";
    }
    case "rolling":
      return "no cycle: people can join or ask any time";
    case "unknown":
      return "dates not on file: send people to the official page";
    default: {
      const unreachable: never = status;
      return unreachable;
    }
  }
}

/** Who-lines for the prompt. A string is one line. Anything else is omitted, so a bad value cannot throw. */
export function whoLine(who: unknown): string {
  const lines = Array.isArray(who)
    ? who.filter((line): line is string => typeof line === "string" && line.trim().length > 0)
    : typeof who === "string" && who.trim()
      ? [who.trim()]
      : [];
  return lines.length
    ? `  Who (the official page's wording; never say someone is eligible): ${lines.join("; ")}`
    : "";
}

/** One program as plain text for Muse. Status and age are worked out now, not stored. */
export function renderProgram(p: Program, now: Date = new Date()): string {
  const days = daysSinceVerified(p, now);
  const lines = [
    `- ${p.name} [${p.kind}, ${p.region}] STATUS: ${statusLine(p, now)}`,
    `  What: ${p.summary}`,
    whoLine(p.who),
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
