import { contact, footer, site } from "@/data/content";

export function Footer() {
  return (
    <footer className="border-t border-ink/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <p className="font-display text-xl tracking-tight text-ink">{footer.wordmark}</p>
          <p className="mt-2 text-sm text-ink/60">{footer.line}</p>
        </div>
        <div className="text-sm text-ink/55 sm:text-right">
          <p>{footer.note}</p>
          <p className="mt-2">
            <a href={contact.href} className="underline-offset-4 hover:underline">
              Contact
            </a>
          </p>
          <p className="mt-2 text-[11px] uppercase tracking-sheet text-ink/35">
            {site.legalName} · {site.productionUrl}
          </p>
        </div>
      </div>
    </footer>
  );
}
