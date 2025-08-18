import Link from "next/link";

export default function LibraryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container py-8">
      {/* Breadcrumb / actions */}
      <nav className="text-sm mb-4 flex gap-3">
        <Link className="underline decoration-sky-400 underline-offset-4" href="/">← Home</Link>
        <span>•</span>
        <Link className="underline decoration-sky-400 underline-offset-4" href="/library">Back to Library</Link>
      </nav>

      {/* Article body */}
      <article className="prose prose-slate dark:prose-invert max-w-none">
        {children}
      </article>

      {/* Related tools CTA */}
      <section className="mt-8 grid gap-3 sm:grid-cols-2">
        <Link
          href="/calm/box-breathing"
          className="block p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 hover:translate-y-[-2px] smooth"
        >
          <h3 className="m-0">Try Box Breathing</h3>
          <p className="m-0 text-sm text-slate-600 dark:text-slate-300">
            2–4 minute guided breathing with a clear rhythm (Inhale–Hold–Exhale–Hold).
          </p>
        </Link>
        <Link
          href="/calm/grounding-54321"
          className="block p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 hover:translate-y-[-2px] smooth"
        >
          <h3 className="m-0">Do 5-4-3-2-1 Grounding</h3>
          <p className="m-0 text-sm text-slate-600 dark:text-slate-300">
            A quick sensory reset you can use anywhere—no account, works offline.
          </p>
        </Link>
      </section>
    </div>
  );
}
