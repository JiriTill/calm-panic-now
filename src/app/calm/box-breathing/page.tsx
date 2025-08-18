"use client";

import { useEffect, useState } from "react";
import BreathRing, { type PatternKey } from "../../ui/BreathRing";
import FeedbackWidget, { type Feedback } from "../../ui/FeedbackWidget";

export default function BoxBreathingPage() {
  const [pattern, setPattern] = useState<PatternKey>("4-4-4-4");
  const [duration, setDuration] = useState<number>(180);
  const [reduced, setReduced] = useState(false);
  const [saved, setSaved] = useState<Feedback | null>(null);

  // start handling
  const [started, setStarted] = useState(false);
  const [startKey, setStartKey] = useState(0);

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
          Choose a pattern and duration, press <strong>Start</strong>, and follow the ring:
          <em> Inhale → Hold → Exhale → Hold.</em> You can use the{" "}
          <strong>Reduced motion</strong> option if animations feel uncomfortable.
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

        {/* Start / Stop */}
        {!started ? (
          <button
            className="px-5 py-2 rounded-xl bg-sky-600 text-white hover:bg-sky-700 smooth"
            onClick={() => {
              setStartKey((k) => k + 1); // reset timer & phases
              setStarted(true);
              setSaved(null);
            }}
          >
            Start
          </button>
        ) : (
          <button
            className="px-5 py-2 rounded-xl bg-slate-200 dark:bg-slate-800"
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

      {/* Quick feedback (saved to localStorage only) */}
      <section className="grid gap-4">
        <h2>How did it go?</h2>
        <p className="text-slate-600 dark:text-slate-300">
          Rate before and after to see what helps you most over time. Saved only in your browser.
        </p>
        <FeedbackWidget
          onDone={(fb) => {
            setSaved(fb);
            try {
              const arr = JSON.parse(localStorage.getItem("sessions") || "[]");
              arr.push({ tool: "box-breathing", ts: Date.now(), ...fb });
              localStorage.setItem("sessions", JSON.stringify(arr));
            } catch {}
          }}
        />
        {saved && (
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Saved locally. You can clear your browser storage anytime.
          </p>
        )}
      </section>
    </div>
  );
}
