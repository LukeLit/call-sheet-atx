import { problem } from "@/data/content";
import { Reveal } from "@/components/Reveal";
import { MuseAsk } from "@/components/MuseAsk";

export function Problem() {
  return (
    <section id="problem" className="border-t border-ink/10">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <h2 className="max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl">
            {problem.title}
          </h2>
          <div className="mt-8 max-w-2xl space-y-4 text-base leading-relaxed text-ink/75 sm:text-lg">
            {problem.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {problem.points.map((point, i) => (
            <Reveal key={point.label} delay={0.08 * (i + 1)}>
              <article className="h-full border border-ink/10 bg-paper-50/70 px-5 py-6">
                <p className="text-[10px] font-medium uppercase tracking-sheet text-amber">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-xl font-medium text-ink">
                  {point.label}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{point.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.28} className="mt-8 hidden md:block">
          <MuseAsk
            prompt="Deadlines hide in PDFs. What's actually open in Austin this month?"
            topic="what's open this month"
          />
        </Reveal>
      </div>
    </section>
  );
}
