import Link from "next/link";
import CrisisBanner from "./ui/CrisisBanner";
import HomeToolTabs from "./ui/HomeToolTabs";

export default function Home() {
  return (
    <div className="container">
      <CrisisBanner />

      {/* Hero */}
      <section className="py-10 md:py-16 text-center">
        <h1>Calm yourself right now</h1>
      </section>

      <section className="text-center max-w-2xl mx-auto section pt-0">
        <h2>Quick calm: start here</h2>
        <p className="mt-2 muted">
          Two proven options. Tap a tool to begin below — no sign-up, works offline.
        </p>
      </section>
      {/* Inline tools (tabs) */}
      <HomeToolTabs />

      {/* Quick reads (same look as Library) */}
      <section className="pb-12">
        <h2 className="mb-4">Quick reads</h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {[
            { slug: "stop-panic-attack", title: "How to stop a panic attack (3 steps that work)", blurb: "A quick plan with breathing + grounding you can use anywhere." },
            { slug: "box-breathing", title: "Box breathing: calm your nervous system in 2 minutes", blurb: "Why 4-4-4-4 or 4-7-8 helps and when to use it." },
            { slug: "grounding-54321", title: "5-4-3-2-1 grounding: a quick reset for anxiety", blurb: "Shift attention to your senses with a short, structured exercise." },
            { slug: "sleep-anxiety", title: "Anxiety at night: how to switch off and sleep", blurb: "A simple wind-down routine and what to do when your mind won’t stop." },
          ].map((i) => (
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
        <div className="mt-4">
          <Link className="underline decoration-sky-400 underline-offset-4" href="/library">
            Browse all articles →
          </Link>
        </div>
      </section>

      {/* SEO section */}
      <section className="pb-20 prose prose-slate dark:prose-invert max-w-none">
        <h2>How to calm panic and anxiety fast</h2>
        <p>
          If you need to <strong>calm a panic attack now</strong> or you’re searching for
          <em> how to calm anxiety quickly</em>, start with two simple tools:
          <a href="/calm/box-breathing"> box breathing</a> and
          <a href="/calm/grounding-54321"> the 5-4-3-2-1 grounding exercise</a>.
          Both are quick, evidence-informed, and work offline.
        </p>
        <p>
          Box breathing guides a steady rhythm—<em>Inhale → Hold → Exhale → Hold</em>—which can reduce physiological arousal.
          Grounding redirects attention to the present using sight, touch, sound, smell, and taste.
          Together they’re practical ways to <strong>calm panic fast</strong> at home, at work, or on the go.
        </p>
        <h3>When to use these techniques</h3>
        <ul>
          <li>During early signs of a <strong>panic attack</strong> or rising anxiety</li>
          <li>Before presentations, exams, or stressful conversations</li>
          <li>As a quick reset to wind down at night</li>
        </ul>
        <p>
          Want a step-by-step plan? Read <a href="/library/stop-panic-attack">How to stop a panic attack</a> or
          learn <a href="/library/box-breathing">how box breathing works</a> and
          <a href="/library/grounding-54321">how to do 5-4-3-2-1 grounding</a>.
          This site is educational and not medical advice—if symptoms persist or worsen, consider speaking with a licensed clinician.
        </p>
      </section>
    </div>
  );
}
