export const STARTERS = [
  "What is HAAM?",
  "What does TWC help with?",
  "How will the grants workbench work?",
] as const;

export type TopicId = "haam" | "twc" | "grants" | "business" | "directors";

export const TOPICS: Array<{
  id: TopicId;
  keywords: string[];
  questions: string[];
}> = [
  {
    id: "haam",
    keywords: ["haam", "health", "coverage", "insurance", "medical"],
    questions: [
      "Who can join HAAM?",
      "What if I only play a few gigs a month?",
      "What other health help exists besides HAAM?",
    ],
  },
  {
    id: "twc",
    keywords: ["twc", "workforce", "unemployment", "day job"],
    questions: [
      "What can TWC do if my gigs are uneven?",
      "Is there help if I also work retail?",
      "What should I bring to a TWC office?",
    ],
  },
  {
    id: "grants",
    keywords: ["grant", "workbench", "fellowship", "residency"],
    questions: [
      "What kinds of grants fit Austin musicians?",
      "How will the workbench actually match me?",
      "What do I need before I apply?",
    ],
  },
  {
    id: "business",
    keywords: [
      "business",
      "studio",
      "one-person",
      "one person",
      "small-business",
      "small business",
    ],
    questions: [
      "Are there small-business grants for a one-person shop?",
      "Does a band count as a business?",
    ],
  },
  {
    id: "directors",
    keywords: ["director", "board", "founding"],
    questions: [
      "What does a founding director actually do?",
      "Where do I go if I want a board seat?",
    ],
  },
];

function uniquePreserve(items: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of items) {
    const key = item.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

function sameQuestion(a: string, b: string): boolean {
  return a.trim().toLowerCase() === b.trim().toLowerCase();
}

function topicHits(text: string, keywords: string[]): number {
  const lower = text.toLowerCase();
  let hits = 0;
  for (const keyword of keywords) {
    if (lower.includes(keyword)) hits += 1;
  }
  return hits;
}

function mixPool(): string[] {
  return uniquePreserve([
    ...STARTERS,
    ...TOPICS.flatMap((topic) => topic.questions),
  ]);
}

export function pickFollowUps(
  lastUserText: string,
  lastAssistantText: string,
  previous: readonly string[] = [],
): string[] {
  const haystack = `${lastUserText} ${lastAssistantText}`;
  const lastQ = lastUserText.trim();
  const notLast = (question: string) => !sameQuestion(question, lastQ);

  const scored = TOPICS.map((topic) => ({
    topic,
    hits: topicHits(haystack, topic.keywords),
  }))
    .filter((row) => row.hits > 0)
    .sort((a, b) => b.hits - a.hits);

  const primary = scored[0]?.topic.questions ?? [];
  const leftovers = scored.slice(1).flatMap((row) => row.topic.questions);
  const fallback = scored.length ? [...primary, ...leftovers] : [...STARTERS];

  let candidates = uniquePreserve(fallback.filter(notLast));

  if (candidates.length < 3) {
    const fillers = mixPool().filter(
      (question) =>
        notLast(question) &&
        !candidates.some((candidate) => sameQuestion(candidate, question)),
    );
    candidates = [...candidates, ...fillers];
  }

  let picked = candidates.slice(0, 3);

  const sameAsPrevious =
    previous.length === 3 &&
    picked.length === 3 &&
    picked.every((question) =>
      previous.some((prior) => sameQuestion(prior, question)),
    );

  if (sameAsPrevious) {
    const swap =
      candidates
        .slice(3)
        .find(
          (question) =>
            !picked.some((candidate) => sameQuestion(candidate, question)),
        ) ??
      mixPool().find(
        (question) =>
          notLast(question) &&
          !picked.some((candidate) => sameQuestion(candidate, question)),
      );

    if (swap) {
      picked = [...picked.slice(0, 2), swap];
    }
  }

  return picked.slice(0, 3);
}
