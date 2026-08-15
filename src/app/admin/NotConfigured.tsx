export function NotConfigured() {
  return (
    <div className="max-w-lg">
      <p className="text-[11px] font-medium uppercase tracking-sheet text-ink/50">
        Not configured
      </p>
      <h1 className="mt-4 font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink">
        Open Call ops
      </h1>
      <p className="mt-6 text-base leading-relaxed text-ink/75">
        Admin is not configured. Set <code className="text-ink">ADMIN_SECRET</code> in
        the environment to unlock this page. The public site is unaffected.
      </p>
      <a
        href="/"
        className="mt-8 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-night-50"
      >
        Back to the public site
      </a>
    </div>
  );
}
