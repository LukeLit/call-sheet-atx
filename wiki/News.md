# News

`/news`: short, dated notes on programs with a date attached. Data in `src/data/news.ts`; pages in `src/app/news/`.

An article names the program ids it is about. The page draws their official links, status and last-checked dates from [[Programs database]], so an article shows when its facts are old. An article says only what those programs' official pages say.

## Published
| Date | Article | Programs |
|---|---|---|
| 2026-10-21 | Nov. 1: open enrollment for insurance help starts. What HAAM says. (`/news/haam-open-enrollment-nov-1`) | `haam` |

HAAM's page lists open enrollment for insurance help as Nov 1 to Dec 15 and says people can join year-round. It was last checked 2026-08-15 and should be re-checked against HAAM's page.

## Planned (not written until each is verified against its official page)
- What closed and what's next in the City of Austin's arts funding (Nexus listed for September 2026, Creative Space Assistance for Summer 2027): needs the current dates.
- Texas Workforce Commission help for uneven work (and for people in tech who are between jobs): needs the current official wording.
- HAAM, explained: who it's for and how to start (partly covered by the first article).
- Which programs may fit people in tech and design (links to `/faq`).

## Adding an article
Add it to `articles` in `src/data/news.ts`, add or verify the program rows it names, update this page and [[Changelog]].
