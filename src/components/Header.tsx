import { contact, nav, site } from "@/data/content";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-paper/10 bg-night/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-3.5 sm:px-8">
        <a href="#top" className="flex items-baseline gap-3">
          <span className="font-display text-lg tracking-tight text-paper sm:text-xl">
            {site.wordmark}
          </span>
          <span className="hidden text-[10px] font-medium uppercase tracking-sheet text-paper/45 sm:inline">
            {site.product}
          </span>
        </a>
        <nav className="flex items-center gap-5 text-sm text-paper/70 sm:gap-7">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hidden transition hover:text-paper sm:inline"
            >
              {item.label}
            </a>
          ))}
          <a
            href={contact.mailto}
            className="rounded-full bg-paper px-3.5 py-1.5 text-xs font-medium text-ink transition hover:bg-paper-50 sm:text-sm"
          >
            {contact.label}
          </a>
        </nav>
      </div>
    </header>
  );
}
