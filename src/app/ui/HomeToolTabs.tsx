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
    <section className="pb-8">
      <div className="home-card">
        {/* FULL-WIDTH CONNECTED TABS */}
        <div className="px-3 pt-3">
          <div className="grid grid-cols-2 gap-0 relative z-10">
            <button
              className={`tool-tab w-full h-12 text-center ${
                tab === "breathing" ? "tool-tab--active" : "tool-tab--inactive"
              }`}
              aria-pressed={tab === "breathing"}
              onClick={() => setTab("breathing")}
            >
              Box Breathing
            </button>
            <button
              className={`tool-tab w-full h-12 text-center ${
                tab === "grounding" ? "tool-tab--active" : "tool-tab--inactive"
              }`}
              aria-pressed={tab === "grounding"}
              onClick={() => setTab("grounding")}
            >
              Grounding 5-4-3-2-1
            </button>
          </div>
        </div>

        {/* CARD BODY (connects to active tab) */}
        <div className="home-card-body">
          {tab === "breathing" ? (
            <div className="grid gap-5 justify-items-center">
              <p className="text-sm muted text-center max-w-prose">
                Follow the ring: <em>Inhale → Hold → Exhale → Hold</em>.
                Pick a pattern and duration, then press <strong>Start</strong>.
              </p>

              {/* Controls */}
              <div className="flex flex-wrap gap-3 items-center justify-center">
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
              </div>

              {/* Start below controls */}
              <div className="text-center">
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

              {/* Ring + timeline */}
              <BreathRing
                durationSec={duration}
                pattern={pattern}
                reducedMotion={reduced}
                started={started}
                startKey={startKey}
                onFinish={() => setStarted(false)}
              />
            </div>
          ) : (
            <div className="grid gap-5">
              <p className="text-sm muted text-center max-w-prose mx-auto">
                Move through your senses to anchor attention in the present.
                You can type a word or just check the boxes.
              </p>
              <GroundingWidget />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
