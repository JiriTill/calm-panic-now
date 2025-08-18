"use client";

import { useState } from "react";

type Step = {
  key: string;
  label: string;
  count: number;
  optional?: boolean; // 👈 allow optional steps
};

const STEPS: Step[] = [
  { key: "see", label: "Name 5 things you can see", count: 5 },
  { key: "touch", label: "Name 4 things you can touch", count: 4 },
  { key: "hear", label: "Name 3 things you can hear", count: 3 },
  { key: "smell", label: "Name 2 things you can smell", count: 2 },
  { key: "taste", label: "Name 1 thing you can taste", count: 1, optional: true }, // 👈 optional
];

export default function Grounding54321Page() {
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  const step = STEPS[stepIdx];
  const filled = answers[step.key]?.length || 0;

  const handleInput = (value: string, idx: number) => {
    setAnswers((prev) => {
      const copy = { ...prev };
      const arr = [...(copy[step.key] || [])];
      arr[idx] = value;
      copy[step.key] = arr;
      return copy;
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">5-4-3-2-1 Grounding Exercise</h1>
      <p className="mb-6">{step.label}</p>

      <div className="space-y-2 mb-6">
        {Array.from({ length: step.count }).map((_, i) => (
          <input
            key={i}
            type="text"
            placeholder={`Enter ${step.key} ${i + 1}`}
            value={answers[step.key]?.[i] || ""}
            onChange={(e) => handleInput(e.target.value, i)}
            className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
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
          disabled={filled < (step.optional ? 0 : step.count)} // 👈 fixed
          onClick={() =>
            setStepIdx((i) => Math.min(STEPS.length - 1, i + 1))
          }
        >
          {stepIdx === STEPS.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}
