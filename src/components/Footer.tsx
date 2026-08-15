import { footer, site } from "@/data/content";

export function Footer() {
  return (
    <footer className="border-t border-paper/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <p className="font-display text-2xl tracking-tight text-paper">{footer.legal}</p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-sheet text-paper/50">
            {footer.city}
            <span className="mx-2 text-paper/25">·</span>
            {footer.product}
          </p>
          <p className="mt-3 max-w-sm text-sm text-paper/45">{footer.note}</p>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-sheet text-paper/40">
          Production · {site.productionUrl}
        </p>
      </div>
    </footer>
  );
}
