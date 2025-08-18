"use client";
import { useEffect, useState } from "react";
import BreathRing, { type PatternKey } from "./BreathRing";
import GroundingWidget from "./GroundingWidget";

export default function HomeToolTabs() {
  const [tab, setTab] = useState<"breathing" | "grounding">("breathing");

  // Fixed defaults for the home page
  const FIXED_PATTERN: PatternKey = "4-4-4-4";
  const FIXED_DURATION = 120;

  // State for breathing
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
        {/* Full-width connected tabs */}
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

        {/* Card body */}
        <div className="home-card-body">
          {tab === "breathing" ? (
            <div className="grid gap-5 justify-items-center">
              <p className="text-sm muted text-center max-w-prose">
                Follow the ring: <em>Inhale → Hold → Exhale → Hold</em>. This quick version runs a{" "}
                <strong>4-4-4-4 pattern for 2 minutes</strong>. Press <strong>Start</strong> to begin.
              </p>

              {/* Reduced motion + Start below it */}
              <div className="flex items-center gap-3">
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
                    onClick={() => { setStartKey((k) => k + 1); setStarted(true); }}
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
                durationSec={FIXED_DURATION}
                pattern={FIXED_PATTERN}
                reducedMotion={reduced}
                started={started}
                startKey={startKey}
                onFinish={() => setStarted(false)}
              />

              <p className="text-xs text-slate-500">
                Need options (4-7-8, 3–5 mins)?{" "}
                <a className="underline" href="/calm/box-breathing">Open the full tool →</a>
              </p>
            </div>
          ) : (
            <div className="grid gap-5">
              <p className="text-sm muted text-center max-w-prose mx-auto">
                Move through your senses to anchor attention in the present. You can type a word or just check the boxes.
              </p>
              <GroundingWidget />
              <p className="text-xs text-slate-500 text-center">
                Prefer the full version?{" "}
                <a className="underline" href="/calm/grounding-54321">Open Grounding →</a>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
