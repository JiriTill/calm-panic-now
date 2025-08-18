"use client";

import { useEffect, useState } from "react";
import BreathRing, { type PatternKey } from "../../ui/BreathRing";
import FeedbackWidget, { type Feedback } from "../../ui/FeedbackWidget";

export default function BoxBreathingPage() {
  const [pattern, setPattern] = useState<PatternKey>("4-4-4-4");
  const [duration, setDuration] = useState<number>(180); // 3 min default (change to 120 if you prefer 2 min)
  const [reduced, setReduced] = useState(false);
  const [saved, setSaved] = useState<Feedback | null>(null);

  // Respect user's OS "reduced motion" setting by default
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <div className="container py-10 space-y-8">
      <h1 className="text-3xl font-bold">Box Breathing</h1>

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
          />
          Reduced motion
        </label>
      </div>

      {/* Breathing ring + countdown */}
      <BreathRing durationSec={duration} pattern={pattern} reducedMotion={reduced} />

      {/* Quick feedback (saved to localStorage only) */}
      <section className="grid gap-4">
        <h2 className="text-xl font-semibold">How did it go?</h2>
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
