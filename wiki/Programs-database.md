# Programs database

The programs Open Call knows about. Muse talks about these and nothing else. **It is baked data, updated by hand when Luke can; it is a proof of concept, not a maintained feed.** The database (Supabase) is optional plumbing so rows can be edited and verified without a deploy.

## Where it lives
- **Starter list:** `src/data/programs.json` in the repo. One source for everything below.
- **Table:** `public.programs` in Supabase (`supabase/001_programs.sql`), seeded by `supabase/002_seed_programs.sql`, which `pnpm seed:sql` writes from the JSON.
- **Which one is used:** if `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (or `SUPABASE_SECRET_KEY`) are set, the table; otherwise the JSON, read-only. An empty table falls back to the JSON. So does a failed read, a fetch still going after 10 seconds, and a page whose `Content-Range` total is larger than the rows returned. A one-row reply with no larger total is that table. The service key is tried once: a rejected JWT is not retried as `SUPABASE_SECRET_KEY`. The service key is server-only. RLS is on with no policies. A close that does not parse is not called open.
- **Code:** `src/lib/programs/` (`types.ts`, `status.ts`, `prompt.ts`, `store.ts`).

## A row
`id` (lowercase, digits, dashes), `name`, `kind` (grant, health, work, business, other), `group`, `summary`, `who` (eligibility in the official page's own words), `amount`, `opens`, `closes` (timestamps with a UTC offset), `rolling` (no cycle), `timing_note`, `how_to_apply`, `url` (official page), `source_url`, `region`, `last_verified` (date), `verified_by`.

## Rules for the data
- Only what an official page says, with its link. Never invent a deadline, amount, or eligibility call.
- Eligibility is the program's wording, never "you qualify".
- `last_verified` is the day someone checked the official page against the row, not the day it was written.
- Status is **computed when asked**, never stored: `closed` after `closes`, `upcoming` before `opens`, `open` inside a window, `rolling`, else `unknown` (no dates on file: send people to the official page). A row not verified in over 90 days is flagged **stale**.

## On file now (9)
| id | name | kind | region | dates | last verified |
|---|---|---|---|---|---|
| `acme-elevate` | Elevate (City of Austin ACME FY27) | grant | Austin | closed 2026-08-18 | 2026-08-15 |
| `acme-thrive` | Thrive (City of Austin ACME FY27) | grant | Austin | closed 2026-08-18 | 2026-08-15 |
| `acme-live-music-fund` | Austin Live Music Fund (City of Austin ACME FY27) | grant | Austin | closed 2026-08-18 | 2026-08-15 |
| `acme-heritage-preservation` | Heritage Preservation Grant (City of Austin ACME FY27) | grant | Austin | closed 2026-08-18 | 2026-08-15 |
| `acme-nexus` | Nexus (City of Austin ACME) | grant | Austin | no dates on file | 2026-08-15 |
| `acme-creative-space` | Creative Space Assistance Program (City of Austin ACME) | other | Austin | no dates on file | 2026-08-15 |
| `haam` | HAAM (Health Alliance for Austin Musicians) | health | Austin | year-round | 2026-08-15 |
| `twc` | Texas Workforce Commission (TWC) | work | Texas | year-round | 2026-08-15 |
| `tca` | Texas Commission on the Arts (TCA) | grant | Texas | no dates on file | 2026-08-15 |

All were taken from the first starter list, written 2026-08-15. None has been re-checked since.

## Adding or verifying
1. Add the row to `src/data/programs.json`, run `pnpm seed:sql` (rewrites `supabase/002_seed_programs.sql` and the one-paste `supabase/setup.sql`), run the new SQL in Supabase. The first time, paste all of `supabase/setup.sql` into the Supabase SQL editor.
2. To mark a row checked: `/admin` has an "I checked it today" button when the database is connected.
3. Update this page's table and [[Changelog]].
