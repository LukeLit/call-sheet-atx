import { cn } from "@/lib/cn";

type SceneMarkProps = {
  scene: string;
  slug: string;
  tone?: "night" | "paper";
};

export function SceneMark({ scene, slug, tone = "paper" }: SceneMarkProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 text-[11px] font-medium uppercase tracking-sheet",
        tone === "paper" ? "text-ink/50" : "text-paper/70",
      )}
    >
      <span>Scene {scene}</span>
      <span className="h-px w-8 bg-current opacity-50" />
      <span>{slug}</span>
    </div>
  );
}
