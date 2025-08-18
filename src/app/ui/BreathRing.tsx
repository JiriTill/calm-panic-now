"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

export type PatternKey = "4-4-4-4" | "3-3-3-3" | "5-5-5-5" | "4-7-8";

type Phase = { label: string; seconds: number; targetScale: number };

function getPattern(p: PatternKey): Phase[] {
  switch (p) {
    case "4-7-8":
      return [
        { label: "Inhale", seconds: 4, targetScale: 1.1 },
        { label: "Hold", seconds: 7, targetScale: 1.1 },
        { label: "Exhale", seconds: 8, targetScale: 0.7 },
      ];
    case "3-3-3-3":
      return [
        { label: "Inhale", seconds: 3, targetScale: 1.1 },
        { label: "Hold", seconds: 3, targetScale: 1.1 },
        { label: "Exhale", seconds: 3, targetScale: 0.7 },
        { label: "Hold", seconds: 3, targetScale: 0.7 },
      ];
    case "5-5-5-5":
      return [
        { label: "Inhale", seconds: 5, targetScale: 1.1 },
        { label: "Hold", seconds: 5, targetScale: 1.1 },
        { label: "Exhale", seconds: 5, targetScale: 0.7 },
        { label: "Hold", seconds: 5, targetScale: 0.7 },
      ];
    default:
      return [
        { label: "Inhale", seconds: 4, targetScale: 1.1 },
        { label: "Hold", seconds: 4, targetScale: 1.1 },
        { label: "Exhale", seconds: 4, targetScale: 0.7 },
        { label: "Hold", seconds: 4, targetScale: 0.7 },
      ];
  }
}

function mmss(total: number) {
  const m = Math.floor(total / 60);
  const s = Math.max(0, Math.floor(total % 60));
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function BreathRing({
  durationSec = 120,
  pattern = "4-4-4-4",
  reducedMotion = false,
  started = false,
  startKey = 0, // increment to hard reset
  onFinish,
}: {
  durationSec?: number;
  pattern?: PatternKey;
  reducedMotion?: boolean;
  started?: boolean;
  startKey?: number;
  onFinish?: () => void;
}) {
  const phases = useMemo(() => getPattern(pattern), [pattern]);

  const idxRef = useRef(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [phaseLeft, setPhaseLeft] = useState(phases[0].seconds);
  const [totalLeft, setTotalLeft] = useState(durationSec);

  // Reset when startKey, pattern, or duration changes
  useEffect(() => {
    idxRef.current = 0;
    setPhaseIndex(0);
    setPhaseLeft(phases[0].seconds);
    setTotalLeft(durationSec);
  }, [startKey, phases, durationSec]);

  // Tick 1x/sec only when started
  useEffect(() => {
    if (!started) return;
    if (totalLeft <= 0) return;

    const id = setInterval(() => {
      setPhaseLeft((prev) => {
        if (prev <= 1) {
          const next = (idxRef.current + 1) % phases.length;
          idxRef.current = next;
          setPhaseIndex(next);
          return phases[next].seconds;
        }
        return prev - 1;
      });
      setTotalLeft((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          clearInterval(id);
          onFinish?.();
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [started, phases, totalLeft, onFinish]);

  const current = phases[phaseIndex];
  const progressPct = Math.max(0, Math.min(100, ((durationSec - totalLeft) / durationSec) * 100));

  return (
    <div className="grid place-items-center gap-6">
      {/* Phase label + seconds */}
      <div className="text-2xl font-semibold" aria-live="polite">
        {started ? current.label : "Ready"}
      </div>
      <div className="text-sm text-slate-500" aria-live="polite">
        {started ? `${phaseLeft}s` : `${mmss(durationSec)} total`}
      </div>

      {/* Ring */}
      <div className="h-48 w-48 grid place-items-center">
        {reducedMotion ? (
          <div className="h-40 w-40 rounded-full border-4 border-sky-400 grid place-items-center">
            <span className="sr-only">Breathing ring (reduced motion)</span>
          </div>
        ) : (
          <motion.div
            key={started ? phaseIndex : -1} // keep static before start
            initial={{ scale: current.label === "Exhale" ? 1.1 : 0.7 }}
            animate={{ scale: started ? current.targetScale : 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="h-40 w-40 rounded-full border-8 border-sky-400/70 shadow-inner"
            aria-hidden
          />
        )}
      </div>

      {/* Progress bar + time left */}
      <div className="w-full max-w-sm">
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>{mmss(durationSec - totalLeft)}</span>
          <span>{mmss(totalLeft)}</span>
        </div>
        <div className="h-2 rounded bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-sky-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
