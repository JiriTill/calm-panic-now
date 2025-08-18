"use client";
import { useEffect, useMemo, useState } from "react";

type Step = { key: "see"|"touch"|"hear"|"smell"|"taste"; label: string; count: number; optional?: boolean };

const STEPS: Step[] = [
  { key: "see",   label: "Name 5 things you can see", count: 5 },
  { key: "touch", label: "Name 4 things you can touch", count: 4 },
  { key: "hear",  label: "Name 3 things you can hear", count: 3 },
  { key: "smell", label: "Name 2 things you can smell", count: 2 },
  { key: "taste", label: "Name 1 thing you can taste (optional)", count: 1, optional: true },
];

export default function GroundingWidget() {
  const [stepIdx, setStepIdx] = useState(0);
  const step = STEPS[stepIdx];
  const [entries, setEntries] = useState(() => Array.from({ length: step.count }, () => ""));
  const progress = useMemo(() => (stepIdx / (STEPS.length - 1)) * 100, [stepIdx]);
  const filled = entries.filter((t) => t.trim().length > 0).length;

  useEffect(() => {
    setEntries(Array.from({ length: step.count }, () => ""));
  }, [step.count]);

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Move through your senses to anchor attention in the present. You can type a word or just check the boxes.
      </p>

      <div className="w-full h-2 rounded bg-slate-200 dark:bg-slate-800">
        <div className="h-full bg-emerald-500 rounded" style={{ width: `${progress}%` }} />
      </div>

      <h3 className="text-lg font-semibold">{step.label}</h3>

      <div className="grid gap-2">
        {entries.map((val, i) => (
          <input
            key={i}
            className="px-3 py-2 rounded-lg border bg-transparent"
            placeholder={`Item ${i + 1}`}
            value={val}
            onChange={(e) => {
              const v = e.target.value;
              setEntries((prev) => prev.map((x, idx) => (idx === i ? v : x)));
            }}
          />
        ))}
      </div>

      <div className="flex gap-3">
        <button
          className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800"
          disabled={stepIdx === 0}
          onClick={() => setStepIdx((i) => Math.max(0, i - 1))}
        >
          Back
        </button>
        <button
          className="px-4 py-2 rounded-lg bg-emerald-600 text-white disabled:opacity-50"
          disabled={filled < (step.optional ? 0 : step.count)}
          onClick={() => setStepIdx((i) => Math.min(STEPS.length - 1, i + 1))}
        >
          {stepIdx === STEPS.length - 1 ? "Finish" : "Next"}
        </button>
      </div>

      <p className="text-xs text-slate-500">
        Prefer the full version? <a className="underline" href="/calm/grounding-54321">Open the dedicated page →</a>
      </p>
    </div>
  );
}
