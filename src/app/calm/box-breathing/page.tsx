"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BreathRing, { type PatternKey } from "../../ui/BreathRing";
import KoFiSmallButton from "../../ui/KoFiSmallButton";

export default function BoxBreathingPage() {
  const [pattern, setPattern] = useState<PatternKey>("4-4-4-4");
  const [duration, setDuration] = useState<number>(180);
  const [reduced, setReduced] = useState(false);

  // start handling
  const [started, setStarted] = useState(false);
  const [startKey, setStartKey] = useState(0);

  // quick thumbs feedback
  const [vote, setVote] = useState<"up" | "down" | null>(null);

  // Respect OS setting for reduced motion by default
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <div className="container py-10 space-y-8">
      <header className="space-y-2">
        <h1>Box Breathing</h1>
        <p className="text-slate-600 dark:text-slate-300">
          A steady four-part breath can help downshift your nervous system.
          Choose a pattern and duration, then press <strong>Start</strong> and
          follow the ring: <em>Inhale → Hold → Exhale → Hold</em>. Use{" "}
          <strong>Reduced motion</strong> if animations feel uncomfortable.
        </p>
      </header>

      {/* Controls row (chip-style) */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Pattern</span>
          {(["4-4-4-4", "3-3-3-3", "5-5-5-5", "4-7-8"] as const).map((p) => (
            <button
              key={p}
              type="button"
              aria-pressed={pattern === p}
              className="chip"
              onClick={() => setPattern(p)}
              disabled={started}
              title={started ? "Stop to change pattern" : "Set pattern"}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Duration</span>
          {[120, 180, 240].map((d) => (
            <button
              key={d}
              type="button"
              aria-pressed={duration === d}
              className="chip"
              onClick={() => setDuration(d)}
              disabled={started}
              title={started ? "Stop to change duration" : "Set duration"}
            >
              {d / 60} min
            </button>
          ))}
        </div>

        <label className="text-sm flex items-center gap-2">
          <input
            type="checkbox"
            checked={reduced}
            onChange={(e) => setReduced(e.target.checked)}
            disabled={started}
          />
          Reduced motion
        </label>
      </div>

      {/* Start / Stop — centered for visibility */}
      <div className="flex justify-center">
        {!started ? (
          <button
            className="px-6 py-3 rounded-xl bg-sky-600 text-white hover:bg-sky-700 smooth"
            onClick={() => {
              setStartKey((k) => k + 1); // reset timer & phases
              setStarted(true);
              setVote(null);
            }}
          >
            Start
          </button>
        ) : (
          <button
            className="px-6 py-3 rounded-xl bg-slate-200 dark:bg-slate-800"
            onClick={() => setStarted(false)}
          >
            Stop
          </button>
        )}
      </div>

      {/* Breathing ring + progress */}
      <BreathRing
        durationSec={duration}
        pattern={pattern}
        reducedMotion={reduced}
        started={started}
        startKey={startKey}
        onFinish={() => setStarted(false)}
      />

      {/* Quick thumbs feedback */}
      <section className="text-center space-y-3">
        <h2 className="text-lg font-semibold">How do you feel now?</h2>
        <div className="flex justify-center gap-3">
          <button
            className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700"
            aria-pressed={vote === "up"}
            onClick={() => setVote("up")}
          >
            👍 Felt calmer
          </button>
          <button
            className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700"
            aria-pressed={vote === "down"}
            onClick={() => setVote("down")}
          >
            👎 Not much
          </button>
        </div>
        {vote && (
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Thanks for the feedback.
          </p>
        )}
      </section>

      {/* Ko-fi support (small button) */}
      <div className="mt-2 flex justify-center">
        <KoFiSmallButton />
      </div>

      {/* Helpful links to Library */}
      <section className="pt-6">
        <h2 className="text-xl font-semibold mb-3">Keep learning</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {[
            {
              slug: "stop-panic-attack",
              title: "How to stop a panic attack (3 steps)",
            },
            {
              slug: "box-breathing",
              title: "Box breathing: why it helps",
            },
            {
              slug: "grounding-54321",
              title: "5-4-3-2-1 grounding guide",
            },
            {
              slug: "sleep-anxiety",
              title: "Anxiety at night & sleep",
            },
          ].map((i) => (
            <li
              key={i.slug}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 smooth hover:translate-y-[-2px]"
            >
              <Link
                className="underline decoration-sky-400 underline-offset-4"
                href={`/library/${i.slug}`}
              >
                {i.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
