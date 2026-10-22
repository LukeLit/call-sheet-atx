# Changelog

Newest first. Every data or feature change gets a line (see [[Keeping this wiki current]]).

## 2026-10-22
- **Programs read:** a PostgREST page that is short of the table is not Muse's catalog (the starter list is served instead). A one-row reply that does not advertise a larger total still is. A `who` value that is not a list no longer crashes the request. A close that does not parse is not called open. The programs fetch times out after 10 seconds and then uses the starter list. The 90-day stale flag is unchanged. Not re-checked against official pages.

## 2026-10-21
- **Framing:** Muse and the program list are described everywhere as a proof of concept with baked data that Luke updates by hand when he can (FAQ, Muse's own prompt, this wiki).
- **Programs database** (PR #2): the starter list became rows with dates, official links and a last-checked day; Muse reads them with statuses worked out per request (it had been telling people the City of Austin round was open two months after it closed on Aug 18); `/admin` lists programs with a "checked today" button once Supabase is connected; Supabase table and seed SQL added. Starts with 9 programs, none re-checked since 2026-08-15.
- **FAQ page** `/faq`, including whether people in tech who are out of work can use it (some programs, not all) and Luke's story.
- **News** `/news`, first article: HAAM's open enrollment for insurance help, Nov 1 to Dec 15.
- **This wiki**, published from `wiki/` in the repo.
