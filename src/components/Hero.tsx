"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { hero, photos } from "@/data/content";
import { MuseAsk } from "@/components/MuseAsk";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function Hero() {
  const reduce = useReducedMotion();
  const fade = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
  };

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-10 sm:gap-12 sm:px-8 sm:pb-24 sm:pt-16 lg:grid-cols-12 lg:gap-14 lg:pt-20">
        <motion.figure
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="order-1 lg:order-2 lg:col-span-5"
        >
          <div className="paper-grain rounded-sm p-1.5 shadow-sheet sm:p-2">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[2px] sm:aspect-[4/5]">
              <Image
                src={photos.capitolMusic.src}
                alt={photos.capitolMusic.alt}
                fill
                priority
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover object-[center_42%]"
              />
            </div>
          </div>
          <figcaption className="mt-3 text-[11px] uppercase tracking-sheet text-ink/45">
            {photos.capitolMusic.caption}
          </figcaption>
        </motion.figure>

        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="order-2 lg:order-1 lg:col-span-7"
        >
          <motion.div variants={fade}>
            <Image
              src="/images/brand/opencall-mark.png"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8"
              unoptimized
            />
          </motion.div>
          <motion.p
            variants={fade}
            className="mt-5 text-[11px] font-medium uppercase tracking-sheet text-amber"
          >
            {hero.kicker}
          </motion.p>
          <motion.h1
            variants={fade}
            className="mt-4 max-w-xl font-display text-4xl font-medium leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            {hero.lede}
          </motion.h1>
          <motion.p
            variants={fade}
            className="mt-6 font-display text-2xl font-medium text-amber sm:text-3xl"
          >
            {hero.muse}
          </motion.p>
          <motion.p
            variants={fade}
            className="mt-5 max-w-lg text-base leading-relaxed text-ink/70 sm:text-lg"
          >
            {hero.body}
          </motion.p>
          <motion.div variants={fade} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={hero.primaryCta.href}
              className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-night-50"
            >
              {hero.primaryCta.label}
            </a>
            <MuseAsk
              prompt="What city of Austin grants are open right now for a working musician?"
              topic="open City of Austin grants"
            />
            <a
              href={hero.secondaryCta.href}
              className="rounded-full border border-ink/20 px-5 py-2.5 text-sm text-ink/80 transition hover:border-ink/45 hover:text-ink"
            >
              {hero.secondaryCta.label}
            </a>
            <a
              href={hero.tertiaryCta.href}
              className="text-sm text-ink/60 transition hover:text-ink"
            >
              {hero.tertiaryCta.label}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
