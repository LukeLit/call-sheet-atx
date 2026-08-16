"use client";

import Image from "next/image";
import { openMuse } from "@/lib/muse/open";

type MuseAskProps = {
  prompt: string;
  /** Hover tooltip and the topic named in the accessible label. Not shown on the face. */
  topic: string;
};

export function MuseAsk({ prompt, topic }: MuseAskProps) {
  const name = `Ask Muse about ${topic}`;

  return (
    <button
      type="button"
      onClick={() => openMuse(prompt)}
      title={topic}
      aria-label={name}
      className="hidden items-center gap-2 rounded-full border border-ink/15 bg-paper-50/80 py-1 pl-1 pr-2.5 text-[11px] font-medium uppercase tracking-sheet text-ink/55 transition hover:border-amber/55 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper md:inline-flex"
    >
      <Image
        src="/images/brand/muse-avatar.png"
        alt=""
        width={28}
        height={28}
        className="h-7 w-7 rounded-full object-cover"
        unoptimized
      />
      Muse
    </button>
  );
}
