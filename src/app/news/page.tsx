import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/content";
import { articles } from "@/data/news";

export const metadata: Metadata = {
  title: `News — ${site.wordmark}`,
  description: "Time-sensitive notes on programs for artists and gig workers: what's opening, what's closing, and where to check.",
};

const day = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", dateStyle: "long" }).format(new Date(`${iso}T12:00:00-05:00`));

export default function NewsPage() {
  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <Header />
      <main>
        <section className="mx-auto max-w-6xl px-5 pb-16 pt-16 sm:px-8 sm:pt-24">
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-sheet text-amber">News</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl">
              What&rsquo;s opening, and what&rsquo;s closing.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75">
              Short notes on programs with a date attached, each with the official link and when we last checked it.
            </p>
          </Reveal>
          <ul className="mt-12 max-w-3xl divide-y divide-ink/10 border-y border-ink/10">
            {sorted.map((a) => (
              <li key={a.slug} className="py-7">
                <p className="text-[11px] font-medium uppercase tracking-sheet text-ink/50">
                  <time dateTime={a.date}>{day(a.date)}</time>
                </p>
                <a href={`/news/${a.slug}`} className="mt-2 block font-display text-2xl tracking-tight text-ink underline-offset-4 hover:underline sm:text-3xl">
                  {a.title}
                </a>
                <p className="mt-3 text-base leading-relaxed text-ink/75">{a.dek}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
