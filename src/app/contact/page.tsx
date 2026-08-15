import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { contact, site } from "@/data/content";

export const metadata: Metadata = {
  title: `Contact — ${site.wordmark}`,
  description: `Get in touch with ${site.wordmark}. ${site.founder}, ${site.city}.`,
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <p className="text-[11px] font-medium uppercase tracking-sheet text-ink/50">
            Contact
          </p>
          <h1 className="mt-4 font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl">
            Get in touch
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75">
            Open Call is forming in Austin. Muse is the assistant. If you want
            to talk about founding directors, the map, or the work, write here.
          </p>

          <div className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-start">
            <div className="relative h-28 w-28 shrink-0 overflow-hidden border border-ink/10">
              <Image
                src="/images/luke.png"
                alt="Portrait of Luke Litman."
                width={1600}
                height={1600}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="max-w-md flex-1 paper-grain shadow-sheet">
              <div className="flex items-center gap-2 border-b border-ink/10 px-4 py-3">
                <span className="punch" />
                <span className="punch" />
                <span className="punch" />
                <span className="ml-auto text-[10px] font-medium uppercase tracking-sheet text-ink/50">
                  Open Call
                </span>
              </div>
              <dl className="space-y-3 px-4 py-4 text-ink">
                <Row k="Name" v={site.founder} />
                <Row k="City" v={site.city} />
                <Row k="Org" v={site.wordmark} />
                <Row k="Product" v={site.product} />
                <Row k="Email" v={contact.email} />
              </dl>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={contact.mailto}
              className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-night-50"
            >
              {contact.label}
            </a>
            <p className="text-sm text-ink/60">{contact.email}</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-ink/10 pb-2 last:border-0">
      <dt className="text-[10px] font-medium uppercase tracking-sheet text-ink/45">
        {k}
      </dt>
      <dd className="text-right text-sm font-medium">{v}</dd>
    </div>
  );
}
