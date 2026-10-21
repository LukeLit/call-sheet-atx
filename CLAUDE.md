# Open Call

Next.js site for Open Call (csa.ironreach.xyz). Muse, the assistant, answers from the programs database.

## Standing rules
- **Keep the wiki current.** The wiki's source is `wiki/` (published to the GitHub wiki by `.github/workflows/wiki.yml`). With every change to programs, news, FAQ, Muse's rules, or a feature, update the matching page and `wiki/Changelog.md` in the same pull request. The checklist is `wiki/Keeping-this-wiki-current.md`. The wiki is how Luke keeps the Muse Grok bot informed.
- **Say only what an official page says.** Programs are rows in `src/data/programs.json` (and the `programs` table). Never invent a deadline, amount, or eligibility call, and never tell anyone they are eligible. `last_verified` means someone checked the official page that day.
- **Dates are computed** (`src/lib/programs/status.ts`), never stored as "open" or "closed".
- No secrets in the repo or the wiki: environment variable names only.
