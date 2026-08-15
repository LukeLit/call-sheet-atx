import { MessageCircle, UserRound, Database } from "lucide-react";
import { platform } from "@/data/content";
import { Reveal } from "@/components/Reveal";
import { SceneMark } from "@/components/SceneMark";
import { cn } from "@/lib/cn";

const icons = {
  muse: MessageCircle,
  app: UserRound,
  ops: Database,
} as const;

export function Platform() {
  return (
    <section id="platform" className="border-t border-paper/10">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <SceneMark scene={platform.scene} slug={platform.slug} />
          <h2 className="mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-paper sm:text-5xl">
            {platform.title}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-paper/70 sm:text-lg">
            {platform.lede}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {platform.surfaces.map((surface, i) => {
            const Icon = icons[surface.id as keyof typeof icons];
            const featured = surface.id === "muse";
            return (
              <Reveal key={surface.id} delay={0.08 * (i + 1)}>
                <article
                  className={cn(
                    "flex h-full flex-col border px-5 py-6",
                    featured
                      ? "border-amber/40 bg-amber/10"
                      : "border-paper/10 bg-night-100/60",
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[10px] font-medium uppercase tracking-sheet text-paper/45">
                      Side {String.fromCharCode(65 + i)}
                    </p>
                    {Icon ? (
                      <Icon
                        className={cn(
                          "h-4 w-4",
                          featured ? "text-amber" : "text-paper/50",
                        )}
                        strokeWidth={1.75}
                        aria-hidden
                      />
                    ) : null}
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-medium text-paper">
                    {surface.name}
                  </h3>
                  <p
                    className={cn(
                      "mt-1 text-sm font-medium",
                      featured ? "text-amber" : "text-paper/55",
                    )}
                  >
                    {surface.role}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-paper/70">
                    {surface.text}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2} className="mt-6">
          <div className="paper-grain shadow-sheet">
            <div className="flex items-center gap-2 border-b border-ink/10 px-4 py-3">
              <span className="punch" />
              <span className="punch" />
              <span className="punch" />
              <span className="ml-auto text-[10px] font-medium uppercase tracking-sheet text-ink/50">
                Muse · sample
              </span>
            </div>
            <div className="space-y-4 px-5 py-5 text-ink">
              <Chat who="Artist" text="I write songs and I need help finding fall grants." />
              <Chat
                who="Muse"
                text="I can walk you through that. A few programs are open where you work. I’ll match them to your work — then we’ll read the form together, in plain English."
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Chat({ who, text }: { who: string; text: string }) {
  const muse = who === "Muse";
  return (
    <div className={cn("max-w-xl", muse ? "ml-0" : "ml-auto")}>
      <p className="text-[10px] font-medium uppercase tracking-sheet text-ink/45">{who}</p>
      <p
        className={cn(
          "mt-1.5 px-3.5 py-2.5 text-sm leading-relaxed",
          muse ? "bg-ink text-paper" : "bg-paper-100 text-ink",
        )}
      >
        {text}
      </p>
    </div>
  );
}
