import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PhotoBand } from "@/components/PhotoBand";
import { Reveal } from "@/components/Reveal";
import { SceneMark } from "@/components/SceneMark";
import { contact, directors, directorsNavItem, photos, site } from "@/data/content";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: `Founding directors — ${site.wordmark}`,
  description:
    "A note from Luke about the two open founding-director seats. Texas nonprofit. Governance, not a job.",
};

export default function DirectorsPage() {
  return (
    <>
      <Header extra={[directorsNavItem]} />
      <main>
        <section className="mx-auto max-w-6xl px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-24">
          <Reveal>
            <SceneMark scene={directors.scene} slug={directors.slug} />
            <p className="mt-6 text-[11px] font-medium uppercase tracking-sheet text-amber">
              {directors.kicker}
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl">
              {directors.title}
            </h1>
            <div className="mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-ink/80 sm:text-lg">
              {directors.spiel.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
        </section>

        <PhotoBand photo={photos.capitolMusic} />

        <section className="border-t border-ink/10">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
            <Reveal>
              <SceneMark scene="02" slug="Three seats" />
              <h2 className="mt-6 max-w-2xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl">
                Texas wants three.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg">
                One filled. Two open. That is the whole board we need to file.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-4 lg:grid-cols-3">
              {directors.seats.map((seat, i) => (
                <Reveal key={seat.id} delay={0.08 * (i + 1)}>
                  <SeatCard seat={seat} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-ink/10">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
            <Reveal>
              <div className="border border-ink/10 bg-paper-50 px-6 py-10 sm:px-12 sm:py-14">
                <SceneMark scene="03" slug="Next" />
                <h2 className="mt-6 max-w-2xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl">
                  {directors.next.title}
                </h2>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/75 sm:text-lg">
                  {directors.next.body}
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <a
                    href={contact.seatMailto}
                    className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-night-50"
                  >
                    {directors.next.cta}
                  </a>
                  <a
                    href={contact.href}
                    className="text-sm text-ink/60 transition hover:text-ink"
                  >
                    Or use the contact page
                  </a>
                </div>
                <p className="mt-6 text-sm text-ink/55">{directors.next.hint}</p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

type Seat = (typeof directors.seats)[number];

function SeatCard({ seat }: { seat: Seat }) {
  const filled = seat.status === "filled";

  return (
    <article
      className={cn(
        "flex h-full flex-col border",
        filled ? "border-amber/40 bg-amber/10" : "border-dashed border-ink/20 bg-paper-50/50",
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden border-b border-ink/10">
        {filled && seat.photo ? (
          <Image
            src={seat.photo.src}
            alt={seat.photo.alt}
            width={seat.photo.width}
            height={seat.photo.height}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 paper-grain">
            <span className="punch" />
            <p className="text-[11px] font-medium uppercase tracking-sheet text-ink/35">
              Empty seat
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col px-5 py-5">
        <p className="text-[10px] font-medium uppercase tracking-sheet text-ink/45">
          Seat {seat.id} · {filled ? "Filled" : "Open"}
        </p>
        <h3 className="mt-3 font-display text-2xl font-medium text-ink">{seat.name}</h3>
        <p className={cn("mt-1 text-sm font-medium", filled ? "text-amber" : "text-ink/45")}>
          {seat.role}
        </p>
        {filled && "city" in seat && seat.city ? (
          <p className="mt-1 text-sm text-ink/55">{seat.city}</p>
        ) : null}
        {filled && "bio" in seat && seat.bio ? (
          <p className="mt-4 text-sm leading-relaxed text-ink/70">{seat.bio}</p>
        ) : (
          <p className="mt-4 text-sm leading-relaxed text-ink/50">
            Waiting on a name.
          </p>
        )}
      </div>
    </article>
  );
}
