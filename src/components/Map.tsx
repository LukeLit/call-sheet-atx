import { map } from "@/data/content";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";

export function Map() {
  return (
    <section id="map" className="border-t border-ink/10">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <h2 className="max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl">
            {map.title}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/75 sm:text-lg">
            {map.lede}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {map.items.map((item, i) => {
            const featured = item.id === "grants";
            return (
              <Reveal key={item.id} delay={0.06 * (i + 1)}>
                <article
                  className={cn(
                    "h-full border px-5 py-6",
                    featured
                      ? "border-amber/40 bg-amber/10 md:col-span-2"
                      : "border-ink/10 bg-paper-50/70",
                  )}
                >
                  <p className="text-[10px] font-medium uppercase tracking-sheet text-ink/45">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-medium text-ink">
                    {item.name}
                  </h3>
                  <p
                    className={cn(
                      "mt-1 text-sm font-medium",
                      featured ? "text-amber" : "text-ink/55",
                    )}
                  >
                    {item.role}
                  </p>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink/70">
                    {item.text}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
