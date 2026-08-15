"use client";

import { motion } from "framer-motion";
import { ask, contact, site } from "@/data/content";
import { SceneMark } from "@/components/SceneMark";

export function Ask() {
  return (
    <section id="ask" className="paper-grain text-ink">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <SceneMark scene={ask.scene} slug={ask.slug} tone="paper" />
        <div className="mt-8 grid gap-12 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
            >
              {ask.title}
            </motion.h2>
            <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-ink-soft sm:text-lg">
              {ask.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <a
              href={contact.mailto}
              className="mt-8 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-night-50"
            >
              {ask.cta}
            </a>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-sheet text-ink/40">
              {contact.placeholderNote}
            </p>
          </div>
          <aside className="border border-ink/10 bg-paper-50/60 p-6 sm:p-8">
            <p className="font-mono text-[10px] uppercase tracking-sheet text-ink/40">
              Who to talk to
            </p>
            <p className="mt-3 font-display text-3xl tracking-tight">{site.founder}</p>
            <p className="mt-1 text-ink-soft">{site.city}</p>
            <div className="mt-6 space-y-3 border-t border-ink/10 pt-5 text-sm text-ink-soft">
              <p>Founder of {site.legalName}.</p>
              <p>
                Texas nonprofit. Founding directors set the board and keep the
                mission honest. Not a staff hire.
              </p>
              <p className="font-medium text-ink">
                {site.product} is the assistant — not the legal name.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
