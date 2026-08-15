import { contact, ask } from "@/data/content";
import { Reveal } from "@/components/Reveal";
import { SceneMark } from "@/components/SceneMark";

export function Ask() {
  return (
    <section id="ask" className="border-t border-ink/10">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <div className="border border-ink/10 bg-paper-50 px-6 py-10 sm:px-12 sm:py-14">
            <SceneMark scene={ask.scene} slug={ask.slug} />
            <h2 className="mt-6 max-w-2xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl">
              {ask.title}
            </h2>
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-ink/75 sm:text-lg">
              {ask.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={contact.href}
                className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-night-50"
              >
                {ask.cta}
              </a>
              <a
                href={contact.href}
                className="text-sm text-ink/60 transition hover:text-ink"
              >
                Get in touch
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
