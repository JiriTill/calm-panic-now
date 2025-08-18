"use client";
import { useEffect, useState } from "react";
import BreathRing, { type PatternKey } from "./BreathRing";
import GroundingWidget from "./GroundingWidget";

export default function HomeToolTabs() {
  const [tab, setTab] = useState<"breathing" | "grounding">("breathing");

  // Breathing state
  const [pattern, setPattern] = useState<PatternKey>("4-4-4-4");
  const [duration, setDuration] = useState<number>(120);
  const [reduced, setReduced] = useState(false);
  const [started, setStarted] = useState(false);
  const [startKey, setStartKey] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <section className="py-6">
      {/* Tabs */}
      <div className="flex gap-2 justify-center mb-6">
        <button
          className="chip"
          aria-pressed={tab === "breathing"}
          onClick={() => setTab("breathing")}
        >
          Box Breathing
        </button>
        <button
          className="chip"
          aria-pressed={tab === "grounding"}
          onClick={() => setTab("grounding")}
        >
          Grounding 5-4-3-2-1
        </button>
      </div>

      {tab === "breathing" ? (
        <div className="grid gap-6 justify-items-center">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Follow the ring: <em>Inhale → Hold → Exhale → Hold</em>. Choose a pattern and duration, then press <strong>Start</strong>.
          </p>

          {/* Controls */}
          <div className="flex flex-wrap gap-3 items-center">
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

            {!started ? (
              <button
                className="px-5 py-2 rounded-xl bg-sky-600 text-white hover:bg-sky-700 smooth"
                onClick={() => {
                  setStartKey((k) => k + 1);
                  setStarted(true);
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

          {/* Ring */}
          <BreathRing
            durationSec={duration}
            pattern={pattern}
            reducedMotion={reduced}
            started={started}
            startKey={startKey}
            onFinish={() => setStarted(false)}
          />

          <p className="text-xs text-slate-500">
            Prefer the full page with notes? <a className="underline" href="/calm/box-breathing">Open Box Breathing →</a>
          </p>
        </div>
      ) : (
        <GroundingWidget />
      )}
    </section>
  );
}
