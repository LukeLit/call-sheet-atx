"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { hero } from "@/data/content";
import { MuseAsk } from "@/components/MuseAsk";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function Hero() {
  const reduce = useReducedMotion();
  const fade = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
  };

  return (
    <section id="top" className="relative pb-12 sm:pb-16">
      <div className="relative h-[260px] w-full overflow-hidden sm:h-[420px] lg:h-[520px]">
        <Image
          src="/images/brand/hero.jpg"
          alt="Open Call — Muse is the assistant. Find the support that already exists."
          fill
          priority
          sizes="100vw"
          className="object-cover object-[78%_center] sm:object-center"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-paper via-paper/55 to-transparent sm:via-paper/25"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto -mt-24 max-w-6xl px-5 sm:-mt-28 sm:px-8">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="max-w-xl bg-paper/95 px-5 py-6 shadow-sheet backdrop-blur-sm sm:px-8 sm:py-8"
        >
          <motion.p
            variants={fade}
            className="text-[11px] font-medium uppercase tracking-sheet text-amber"
          >
            {hero.kicker}
          </motion.p>
          <h1 className="sr-only">{hero.title}</h1>
          <motion.p
            variants={fade}
            className="mt-3 font-display text-2xl font-medium leading-snug tracking-tight text-ink sm:text-3xl"
          >
            {hero.lede}
          </motion.p>
          <motion.p
            variants={fade}
            className="mt-3 font-display text-xl font-medium text-amber"
          >
            {hero.muse}
          </motion.p>
          <motion.div
            variants={fade}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            <a
              href={hero.primaryCta.href}
              className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-night-50"
            >
              {hero.primaryCta.label}
            </a>
            <MuseAsk
              prompt="What city of Austin grants are open right now for a working musician?"
              label="Ask Muse"
            />
            <a
              href={hero.secondaryCta.href}
              className="rounded-full border border-ink/20 px-5 py-2.5 text-sm text-ink/80 transition hover:border-ink/45 hover:text-ink"
            >
              {hero.secondaryCta.label}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
