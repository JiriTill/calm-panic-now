import Link from "next/link";
import CrisisBanner from "./ui/CrisisBanner";

export default function Home() {
  return (
    <div className="container">
      <CrisisBanner />
      <section className="py-10 md:py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Calm yourself right now
        </h1>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          Two quick tools, zero sign-up. Evidence-informed. Works offline.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/calm/box-breathing"
            className="px-6 py-3 rounded-xl bg-sky-600 text-white hover:bg-sky-700 smooth w-full sm:w-auto"
          >
            Box Breathing
          </Link>
          <Link
            href="/calm/grounding-54321"
            className="px-6 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 smooth w-full sm:w-auto"
          >
            Grounding 5-4-3-2-1
          </Link>
        </div>
      </section>

      <section className="pb-20">
        <h2 className="text-xl font-semibold mb-4">Quick reads</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          <li className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 smooth hover:translate-y-[-2px]">
            <Link href="/library/stop-panic-attack">How to stop a panic attack</Link>
          </li>
          <li className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 smooth hover:translate-y-[-2px]">
            <Link href="/library/box-breathing">Box breathing: why it helps</Link>
          </li>
          <li className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 smooth hover:translate-y-[-2px]">
            <Link href="/library/grounding-54321">Grounding 5-4-3-2-1</Link>
          </li>
          <li className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 smooth hover:translate-y-[-2px]">
            <Link href="/library/sleep-anxiety">Anxiety at night & sleep</Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
