"use client";

import { motion, useReducedMotion } from "framer-motion";
import { contact, hero, site } from "@/data/content";
import { SceneMark } from "@/components/SceneMark";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function Hero() {
  const reduce = useReducedMotion();
  const fade = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
  };

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="max-w-3xl"
        >
          <motion.div variants={fade}>
            <SceneMark scene={hero.scene} slug={hero.slug} />
          </motion.div>
          <motion.p
            variants={fade}
            className="mt-6 text-[11px] font-medium uppercase tracking-sheet text-amber"
          >
            {hero.kicker}
          </motion.p>
          <motion.h1
            variants={fade}
            className="mt-4 font-display text-[3.2rem] font-medium leading-[0.95] tracking-tight text-paper sm:text-7xl md:text-8xl"
          >
            {hero.title}
          </motion.h1>
          <motion.p
            variants={fade}
            className="mt-8 max-w-xl text-xl leading-snug text-paper/85 sm:text-2xl"
          >
            {hero.lede}
          </motion.p>
          <motion.p
            variants={fade}
            className="mt-4 font-display text-2xl font-medium text-amber sm:text-3xl"
          >
            {hero.muse}
          </motion.p>
          <motion.p
            variants={fade}
            className="mt-6 max-w-lg text-base leading-relaxed text-paper/65 sm:text-lg"
          >
            {hero.body}
          </motion.p>
          <motion.div variants={fade} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={contact.mailto}
              className="rounded-full bg-amber px-5 py-2.5 text-sm font-medium text-night transition hover:bg-amber-dim"
            >
              {contact.label} / join as a founding director
            </a>
            <a
              href="#platform"
              className="rounded-full border border-paper/25 px-5 py-2.5 text-sm text-paper/80 transition hover:border-paper/50 hover:text-paper"
            >
              See the platform
            </a>
          </motion.div>
        </motion.div>

        <motion.aside
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7, ease }}
          className="mt-16 max-w-md paper-grain shadow-sheet sm:absolute sm:right-8 sm:top-28 sm:mt-0 sm:w-72"
        >
          <div className="flex items-center gap-2 border-b border-ink/10 px-4 py-3">
            <span className="punch" />
            <span className="punch" />
            <span className="punch" />
            <span className="ml-auto text-[10px] font-medium uppercase tracking-sheet text-ink/50">
              Open Call
            </span>
          </div>
          <div className="space-y-3 px-4 py-4 text-ink">
            <Row k="Production" v={site.wordmark} />
            <Row k="Assistant" v={site.product} />
            <Row k="First city" v={site.city} />
            <Row k="Founder" v={site.founder} />
            <Row k="Call time" v="Now" />
          </div>
        </motion.aside>
      </div>
    </section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-ink/10 pb-2 last:border-0">
      <span className="text-[10px] font-medium uppercase tracking-sheet text-ink/45">{k}</span>
      <span className="text-right text-sm font-medium">{v}</span>
    </div>
  );
}
