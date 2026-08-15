"use client";

import { motion } from "framer-motion";
import { platform } from "@/data/content";
import { SceneMark } from "@/components/SceneMark";

export function Platform() {
  return (
    <section id="platform" className="relative">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <SceneMark scene={platform.scene} slug={platform.slug} />
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mt-8 max-w-xl font-display text-4xl leading-[1.05] tracking-tight text-paper sm:text-5xl md:text-6xl"
        >
          {platform.title}
        </motion.h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-paper/65 sm:text-lg">
          {platform.lede}
        </p>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {platform.surfaces.map((surface, i) => (
            <motion.article
              key={surface.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="paper-grain shadow-sheet text-ink"
            >
              <div className="flex items-center gap-2 border-b border-ink/10 px-5 py-3">
                <span className="punch" />
                <span className="ml-auto font-mono text-[10px] uppercase tracking-sheet text-ink/45">
                  Line {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="px-5 py-6">
                <p className="font-mono text-[10px] uppercase tracking-sheet text-clay">
                  {surface.role}
                </p>
                <h3 className="mt-2 font-display text-3xl tracking-tight">{surface.name}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{surface.text}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
