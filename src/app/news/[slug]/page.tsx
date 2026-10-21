import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { contact, site } from "@/data/content";
import { findArticle } from "@/data/news";
import { daysSinceVerified, isStale, programStatus } from "@/lib/programs/status";
import { readPrograms } from "@/lib/programs/store";
import type { ProgramStatus } from "@/lib/programs/types";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const a = findArticle(params.slug);
  return a ? { title: `${a.title} — ${site.wordmark}`, description: a.dek } : {};
}

const day = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", dateStyle: "long" }).format(new Date(`${iso}T12:00:00-05:00`));

const STATUS: Record<ProgramStatus, string> = {
  open: "Open now",
  closed: "Closed",
  upcoming: "Not open yet",
  rolling: "Year-round",
  unknown: "No dates on file",
};

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const a = findArticle(params.slug);
  if (!a) notFound();
  const { programs } = await readPrograms();
  const named = a.programs.map((id) => programs.find((p) => p.id === id)).filter((p) => p !== undefined);
  const now = new Date();

  return (
    <>
      <Header />
      <main>
        <article className="mx-auto max-w-3xl px-5 pb-20 pt-16 sm:px-8 sm:pt-24">
          <p className="text-[11px] font-medium uppercase tracking-sheet text-amber">
            <a href="/news" className="underline-offset-4 hover:underline">News</a>
            <span className="mx-2 text-ink/30" aria-hidden>·</span>
            <time dateTime={a.date}>{day(a.date)}</time>
          </p>
          <h1 className="mt-4 font-display text-4xl font-medium leading-[1.08] tracking-tight text-ink sm:text-5xl">{a.title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-ink/75">{a.dek}</p>

          <div className="mt-10 space-y-10">
            {a.blocks.map((b, i) => (
              <section key={i}>
                {b.h ? <h2 className="font-display text-2xl tracking-tight text-ink">{b.h}</h2> : null}
                {b.p?.map((t) => (
                  <p key={t} className="mt-3 text-base leading-relaxed text-ink/80 sm:text-lg">{t}</p>
                ))}
                {b.ul ? (
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-ink/80 sm:text-lg">
                    {b.ul.map((t) => <li key={t}>{t}</li>)}
                  </ul>
                ) : null}
                {b.after?.map((t) => (
                  <p key={t} className="mt-4 text-base leading-relaxed text-ink/80 sm:text-lg">{t}</p>
                ))}
              </section>
            ))}
          </div>

          {named.length ? (
            <aside className="mt-14 border-t border-ink/10 pt-8" aria-label="Official links">
              <h2 className="text-[11px] font-medium uppercase tracking-sheet text-ink/50">Check it yourself</h2>
              <ul className="mt-4 space-y-5">
                {named.map((p) => (
                  <li key={p.id}>
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="font-display text-xl tracking-tight text-ink underline-offset-4 hover:underline">
                      {p.name} ↗
                    </a>
                    {p.source_url ? (
                      <p className="mt-1 text-sm">
                        <a href={p.source_url} target="_blank" rel="noopener noreferrer" className="text-ink/70 underline underline-offset-4">What it offers ↗</a>
                      </p>
                    ) : null}
                    <p className="mt-1 text-sm text-ink/60">
                      {STATUS[programStatus(p, now)]} · last checked against the official page {p.last_verified} ({daysSinceVerified(p, now)} days ago)
                      {isStale(p, now) ? ". It's been a while: check the official page before you rely on this." : ""}
                    </p>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}

          <p className="mt-12 text-sm text-ink/60">
            Something wrong or out of date? <a href={contact.mailto} className="underline underline-offset-4">Tell me</a>. We do not write checks and we do not decide who qualifies.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
