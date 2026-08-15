"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";
import { openMuse } from "@/lib/muse/open";

type MuseAskProps = {
  prompt: string;
  label?: string;
  variant?: "solid" | "ghost";
};

export function MuseAsk({
  prompt,
  label = "Ask Muse",
  variant = "solid",
}: MuseAskProps) {
  return (
    <button
      type="button"
      onClick={() => openMuse(prompt)}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm transition",
        variant === "solid"
          ? "bg-ink font-medium text-paper hover:bg-night-50"
          : "border border-ink/20 text-ink/80 hover:border-ink/45 hover:text-ink",
      )}
    >
      <Image
        src="/images/brand/muse-avatar.png"
        alt=""
        width={16}
        height={16}
        className="h-4 w-4 rounded-full object-cover"
        unoptimized
      />
      {label}
    </button>
  );
}
