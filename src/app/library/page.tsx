import Link from "next/link";

export const metadata = { title: "Library — Calm Panic Now" };

const items = [
  {
    slug: "stop-panic-attack",
    title: "How to stop a panic attack (3 steps that work)",
    blurb: "A quick two-step plan with breathing + grounding you can use anywhere."
  },
  {
    slug: "box-breathing",
    title: "Box breathing: calm your nervous system in 2 minutes",
    blurb: "Why a steady 4-4-4-4 breath pattern helps and when to use it."
  },
  {
    slug: "grounding-54321",
    title: "5-4-3-2-1 grounding: a quick reset for anxiety",
    blurb: "Shift attention to your senses with a short, structured exercise."
  },
  {
    slug: "sleep-anxiety",
    title: "Anxiety at night: how to switch off and sleep",
    blurb: "A simple wind-down routine and what to do when your mind won’t stop."
  },
];

export default function Library() {
  return (
    <div className="container py-10">
      <h1>Library</h1>
      <p className="text-slate-600 dark:text-slate-300 mb-6">
        Short, practical reads that pair with the tools. No fluff, just steps that help.
      </p>

      <ul className="grid gap-4 sm:grid-cols-2">
        {items.map((i) => (
          <li
            key={i.slug}
            className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 smooth hover:translate-y-[-2px]"
          >
            <h3 className="mb-1">
              <Link className="underline decoration-sky-400 underline-offset-4" href={`/library/${i.slug}`}>
                {i.title}
              </Link>
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">{i.blurb}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
