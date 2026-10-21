# Keeping this wiki current

The wiki lives in the repo's `wiki/` folder and is published to the GitHub wiki by `.github/workflows/wiki.yml` when a change to `wiki/**` merges to `main`. Edit the files in the repo; edits made in the GitHub wiki UI are overwritten by the next sync. (One-time setup: create any first page in the GitHub wiki so the wiki repository exists.)

## With every change, in the same pull request
- **Added or changed a program** → [[Programs database]] table and [[Changelog]].
- **Added a news article** → [[News]] (published and planned) and [[Changelog]].
- **Changed what Muse may say or how it answers** → [[Muse]] and [[Changelog]].
- **Changed the FAQ or its policy** → [[FAQ]] and [[Changelog]].
- **New page, route or env var name** → [[Home]].
- Say what changed and the date; say what has not been verified. Never put keys or secrets here (variable names only).
