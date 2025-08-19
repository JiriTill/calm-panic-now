"use client";

import { useState } from "react";
import Link from "next/link";
import KoFiSmallButton from "../../ui/KoFiSmallButton";

type Step = {
  key: string;
  label: string;
  count: number;
  optional?: boolean;
};

const STEPS: Step[] = [
  { key: "see", label: "Name 5 things you can see", count: 5 },
  { key: "touch", label: "Name 4 things you can touch", count: 4 },
  { key: "hear", label: "Name 3 things you can hear", count: 3 },
  { key: "smell", label: "Name 2 things you can smell", count: 2 },
  { key: "taste", label: "Name 1 thing you can taste (optional)", count: 1, optional: true },
];

export default function Grounding54321Page() {
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [vote, setVote] = useState<"up" | "down" | null>(null);

  const step = STEPS[stepIdx];
  const filled = answers[step.key]?.filter(Boolean).length || 0;

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
    <div className="container py-10 space-y-8">
      {/* Header */}
      <header className="space-y-2">
        <h1>5-4-3-2-1 Grounding Exercise</h1>
        <p className="text-slate-600 dark:text-slate-300">
          Move through your senses to anchor attention in the present:{" "}
          <strong>5</strong> things you can see, <strong>4</strong> you can touch,{" "}
          <strong>3</strong> you can hear, <strong>2</strong> you can smell, and{" "}
          <strong>1</strong> you can taste (optional). Type a word in each field—short
          answers are perfect.
        </p>
      </header>

      {/* Current step */}
      <section>
        <p className="mb-4 font-medium">{step.label}</p>

        <div className="space-y-2 mb-6">
          {Array.from({ length: step.count }).map((_, i) => (
            <input
              key={i}
              type="text"
              placeholder={`${step.key} ${i + 1}`}
              value={answers[step.key]?.[i] || ""}
              onChange={(e) => handleInput(e.target.value, i)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
            />
          ))}
        </div>

        {/* Nav */}
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
      </section>

      {/* Thumbs feedback */}
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

      {/* Support callout + Ko-fi button */}
      <div className="text-center">
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
          Keep this app free for everyone by supporting it.
        </p>
        <div className="flex justify-center">
          <KoFiSmallButton />
        </div>
      </div>

      {/* Helpful links to Library */}
      <section className="pt-6">
        <h2 className="text-xl font-semibold mb-3">Keep learning</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {[
            { slug: "stop-panic-attack", title: "How to stop a panic attack (3 steps)" },
            { slug: "box-breathing", title: "Box breathing: why it helps" },
            { slug: "grounding-54321", title: "5-4-3-2-1 grounding guide" },
            { slug: "sleep-anxiety", title: "Anxiety at night & sleep" },
          ].map((i) => (
            <li
              key={i.slug}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 smooth hover:translate-y-[-2px]"
            >
              <Link
                className="underline decoration-emerald-500 underline-offset-4"
                href={`/library/${i.slug}`}
              >
                {i.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* SEO / educational section */}
      <section className="pt-10 pb-16 prose prose-slate dark:prose-invert max-w-none">
        <h2>5-4-3-2-1 grounding: how it calms anxiety quickly</h2>
        <p>
          <strong>5-4-3-2-1 grounding</strong> is a simple{" "}
          <em>sensory grounding technique</em> used to reduce anxiety and help during
          the early signs of a <strong>panic attack</strong>. By naming what you can
          <em> see, touch, hear, smell, and taste</em>, you redirect attention from
          racing thoughts to the present moment.
        </p>

        <h3>Step-by-step: how to do 5-4-3-2-1 grounding</h3>
        <ol>
          <li>Look around and name <strong>5 things you can see</strong>.</li>
          <li>Notice <strong>4 things you can touch</strong> (and feel their texture/temperature).</li>
          <li>Listen for <strong>3 sounds you can hear</strong>.</li>
          <li>Identify <strong>2 smells</strong> around you.</li>
          <li>Optionally, name <strong>1 taste</strong> (or sip water/mint).</li>
        </ol>

        <h3>Why this grounding technique helps</h3>
        <ul>
          <li>Shifts attention from threat thoughts to concrete sensory facts</li>
          <li>Slows over-breathing when combined with a steady pace</li>
          <li>Works anywhere—no equipment, takes 2–4 minutes</li>
        </ul>

        <h3>Tips &amp; safety</h3>
        <ul>
          <li>Go slowly—one item at a time; short words are fine.</li>
          <li>If a sense is hard (e.g., smell), swap in another sense.</li>
          <li>This is educational and not medical advice—stop if you feel worse and seek professional support if symptoms persist.</li>
        </ul>

        <p>
          For a breathing alternative, try{" "}
          <a href="/calm/box-breathing">box breathing (4-4-4-4)</a>. For a plan that
          combines both, read{" "}
          <a href="/library/stop-panic-attack">How to stop a panic attack</a>.
        </p>
      </section>
    </div>
  );
}
