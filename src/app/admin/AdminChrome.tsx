import type { ReactNode } from "react";

export function AdminChrome({
  children,
  signedIn = false,
}: {
  children: ReactNode;
  signedIn?: boolean;
}) {
  return (
    <div className="min-h-screen sun-wash">
      <header className="border-b border-ink/10 bg-paper/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-6 px-5 py-3.5 sm:px-8">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-sheet text-ink/45">
              Ops
            </p>
            <p className="font-display text-lg tracking-tight text-ink">
              Open Call ops
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <a href="/" className="text-ink/70 transition hover:text-ink">
              Public site
            </a>
            {signedIn ? (
              <form action="/api/admin/logout" method="post">
                <button
                  type="submit"
                  className="text-ink/55 transition hover:text-ink"
                >
                  Sign out
                </button>
              </form>
            ) : null}
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
        {children}
      </main>
    </div>
  );
}
