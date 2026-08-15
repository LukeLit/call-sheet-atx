# Call Sheet ATX

Pitch site and platform bones for Call Sheet ATX, a Texas nonprofit forming in Austin. The legal name is Call Sheet ATX. The product / assistant is Muse. Do not brand the legal entity as Muse.

Production URL: CSA.Ironreach.xyz (Porkbun domain, later).

This page is a founding-director recruiting pitch and the first public face of the product: Muse (chat), a simple artist frontend with profiles and matches, and an ops desk for the grants database.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Vercel-ready (src/app, src/components, src/data)

## Run locally
Install dependencies, then start the dev server. Open http://localhost:3000. Production build: next build && next start.

## Deploy

Push to main and import the GitHub repo in Vercel (framework preset: Next.js). Set the production domain to CSA.Ironreach.xyz when the Porkbun DNS is ready.

## Contact placeholder

The Talk to Luke buttons use a clearly marked placeholder mailto in src/data/content.ts. Swap contact.mailto for a real address before you share the page widely.

## Mission

Connect Austin artists, especially musicians, to grants and other existing programs so they can make a living from their art. Navigation, matching, education, referral. Not a check-writing shop.
