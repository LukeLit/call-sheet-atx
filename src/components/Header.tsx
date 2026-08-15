import Image from "next/image";
import { contact, nav, site } from "@/data/content";

type NavItem = { href: string; label: string };

type HeaderProps = {
  extra?: NavItem[];
};

export function Header({ extra }: HeaderProps) {
  const items = extra ? [...nav, ...extra] : nav;

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-3.5 sm:px-8">
        <a href="/#top" className="flex items-center gap-2.5">
          <Image
            src="/images/brand/opencall-mark.png"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7"
            unoptimized
          />
          <span className="flex items-baseline gap-3">
            <span className="font-display text-lg tracking-tight text-ink sm:text-xl">
              {site.wordmark}
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-sheet text-ink/45 sm:inline">
              {site.product}
            </span>
          </span>
        </a>
        <nav className="flex items-center gap-5 text-sm text-ink/70 sm:gap-7">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hidden transition hover:text-ink sm:inline"
            >
              {item.label}
            </a>
          ))}
          <a
            href={contact.href}
            className="rounded-full bg-ink px-3.5 py-1.5 text-xs font-medium text-paper transition hover:bg-night-50 sm:text-sm"
          >
            {contact.label}
          </a>
        </nav>
      </div>
    </header>
  );
}
