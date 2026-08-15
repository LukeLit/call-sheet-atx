import { problem } from "@/data/content";
import { Reveal } from "@/components/Reveal";
import { SceneMark } from "@/components/SceneMark";

export function Problem() {
  return (
    <section id="problem" className="border-t border-paper/10">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <SceneMark scene={problem.scene} slug={problem.slug} />
          <h2 className="mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-paper sm:text-5xl">
            {problem.title}
          </h2>
          <div className="mt-8 max-w-2xl space-y-4 text-base leading-relaxed text-paper/70 sm:text-lg">
            {problem.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {problem.points.map((point, i) => (
            <Reveal key={point.label} delay={0.08 * (i + 1)}>
              <article className="h-full border border-paper/10 bg-night-100/60 px-5 py-6">
                <p className="text-[10px] font-medium uppercase tracking-sheet text-amber">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-xl font-medium text-paper">
                  {point.label}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/65">{point.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
