"use client";

import { motion } from "framer-motion";
import { problem } from "@/data/content";
import { SceneMark } from "@/components/SceneMark";

export function Problem() {
  return (
    <section id="problem" className="paper-grain text-ink">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <SceneMark scene={problem.scene} slug={problem.slug} tone="paper" />
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
          >
            {problem.title}
          </motion.h2>
          <div className="space-y-4 text-base leading-relaxed text-ink-soft sm:text-lg">
            {problem.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className="mt-14 grid gap-px bg-ink/10 sm:grid-cols-3">
          {problem.points.map((point, i) => (
            <motion.article
              key={point.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-[#f3ebe0] px-5 py-7 sm:px-6"
            >
              <p className="font-mono text-[10px] uppercase tracking-sheet text-ink/40">
                0{i + 1}
              </p>
              <h3 className="mt-3 font-display text-2xl tracking-tight">{point.label}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{point.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
