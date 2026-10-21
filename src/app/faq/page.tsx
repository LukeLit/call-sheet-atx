import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { contact, site } from "@/data/content";
import { faqIntro, faqStory, faqs } from "@/data/faq";

export const metadata: Metadata = {
  title: `Questions — ${site.wordmark}`,
  description:
    "Plain answers for artists and gig workers, including people in tech who are out of work: what Open Call does, what it doesn't, and how to check a program.",
};

export default function FaqPage() {
  return (
    <>
      <Header />
      <main>
        <section className="mx-auto max-w-6xl px-5 pb-12 pt-16 sm:px-8 sm:pt-24">
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-sheet text-amber">
              {faqIntro.kicker}
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl">
              {faqIntro.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75">{faqIntro.lede}</p>
          </Reveal>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
          <ul className="max-w-3xl divide-y divide-ink/10 border-y border-ink/10">
            {faqs.map((f) => (
              <li key={f.q}>
                <details className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-xl tracking-tight text-ink sm:text-2xl">
                    <span>{f.q}</span>
                    <span aria-hidden className="mt-1 text-amber transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div className="mt-4 max-w-2xl space-y-4 text-base leading-relaxed text-ink/80">
                    {f.a.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t border-ink/10">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <Reveal>
              <h2 className="max-w-2xl font-display text-3xl font-medium leading-[1.1] tracking-tight text-ink sm:text-4xl">
                {faqStory.title}
              </h2>
              <div className="mt-6 max-w-2xl space-y-5 text-base leading-relaxed text-ink/80 sm:text-lg">
                {faqStory.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                <p className="text-ink/60">— {faqStory.sign}</p>
              </div>
              <a
                href={contact.mailto}
                className="mt-8 inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-night-50"
              >
                Tell me how it goes
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
