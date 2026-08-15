import { closer, contact, hero } from "@/data/content";
import { Reveal } from "@/components/Reveal";

export function Closer() {
  return (
    <section className="border-t border-ink/10">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <Reveal>
          <h2 className="max-w-2xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl">
            {closer.title}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/75 sm:text-lg">
            {closer.body}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={hero.primaryCta.href}
              className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-night-50"
            >
              {hero.primaryCta.label}
            </a>
            <a
              href={contact.href}
              className="rounded-full border border-ink/20 px-5 py-2.5 text-sm text-ink/80 transition hover:border-ink/45 hover:text-ink"
            >
              {contact.label}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
