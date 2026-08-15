export function LoginForm({ error }: { error?: boolean }) {
  return (
    <div className="paper-grain max-w-md shadow-sheet">
      <div className="flex items-center gap-2 border-b border-ink/10 px-4 py-3">
        <span className="punch" />
        <span className="punch" />
        <span className="punch" />
        <span className="ml-auto text-[10px] font-medium uppercase tracking-sheet text-ink/50">
          Gate
        </span>
      </div>
      <form action="/api/admin/login" method="post" className="space-y-5 px-5 py-6">
        <div>
          <h1 className="font-display text-2xl font-medium tracking-tight text-ink">
            Open Call ops
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink/70">
            Shared secret. Cheap gate until the nonprofit has government tokens.
          </p>
        </div>
        {error ? (
          <p className="text-sm text-clay" role="alert">
            That password did not match.
          </p>
        ) : null}
        <label className="block">
          <span className="text-[10px] font-medium uppercase tracking-sheet text-ink/45">
            Password
          </span>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            required
            className="mt-2 w-full border border-ink/15 bg-paper-50 px-3 py-2 text-sm text-ink outline-none focus:border-ink/40"
          />
        </label>
        <button
          type="submit"
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-night-50"
        >
          Open
        </button>
      </form>
    </div>
  );
}
