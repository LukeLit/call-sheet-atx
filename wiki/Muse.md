# Muse

The assistant in the drawer. Route: `POST /api/muse` (`src/app/api/muse/route.ts`).

## How an answer is made
1. The system prompt is the knowledge in `src/lib/muse/knowledge.ts` (who Open Call is, what it does and doesn't, voice) plus a **PROGRAMS block** built per request from [[Programs database]] (`src/lib/programs/prompt.ts`): today's date, each program's status worked out now, its official link, and when it was last checked (with a STALE flag past 90 days). A date that does not parse is not a window, so a bad close does not come out as open. A `who` value that is not a list of lines is left off the block instead of failing the request. The programs fetch gives up after 10 seconds. A page that says the table has more rows than it returned is not used; the starter list is. A one-row reply that does not say the table is larger is that table.
2. The model chain is tried in order and falls back on a 404, 402, 408, 429 or 5xx: `poolside/laguna-s-2.1-free`, `nvidia/nemotron-3.5-lightning-free`, `alibaba/qwen3.7-flash`, `inclusionai/ling-3.0-flash` (through the Vercel AI Gateway; `/admin` can change the chain).
3. Needs `AI_GATEWAY_API_KEY` (an environment variable, never committed).

## Rules (from the prompt)
- Talk about a program only from the PROGRAMS block. If it isn't there, say so and point to the official agency.
- Never invent a deadline, amount or eligibility call. Never say someone is eligible: say where to check.
- Use each program's status as given (a closed round is closed). Say when something may be stale.
- No write tools. Plain, warm, short. Doesn't put the organizer's name in casual replies.
- People in tech, games or design who are out of work can ask too: say which programs may fit and which don't (TWC serves people with uneven work, not only artists; arts programs define who counts; HAAM is for musicians).

Muse is a proof of concept. It answers from baked data (see [[Programs database]]) that Luke updates by hand when he can; it is not a live feed and can lag the official pages. The prompt tells it to say so.

Not built yet: the artist app (profiles, matches, deadlines) and the human ops desk are listed as coming.
