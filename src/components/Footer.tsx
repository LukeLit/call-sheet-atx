import { footer, site } from "@/data/content";

export function Footer() {
  return (
    <footer className="border-t border-paper/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <p className="font-display text-xl tracking-tight text-paper">{footer.wordmark}</p>
          <p className="mt-2 text-sm text-paper/55">
            {footer.city} · first city · {footer.product}
          </p>
        </div>
        <div className="text-sm text-paper/45 sm:text-right">
          <p>{footer.note}</p>
          <p className="mt-2 text-[11px] uppercase tracking-sheet text-paper/30">
            {site.legalName} · {site.productionUrl}
          </p>
        </div>
      </div>
    </footer>
  );
}
