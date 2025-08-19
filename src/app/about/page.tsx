import Link from "next/link";
import KoFiSmallButton from "../ui/KoFiSmallButton";

export const metadata = {
  title: "About — Calm Panic Now | Free tools to calm panic & anxiety",
  description:
    "Calm Panic Now offers free, privacy-friendly tools like box breathing and the 5-4-3-2-1 grounding technique to help calm panic attacks and anxiety quickly.",
};

export default function AboutPage() {
  return (
    <div className="container py-10 prose prose-slate dark:prose-invert max-w-none">
      <h1>About Calm Panic Now</h1>

      <p>
        <strong>Calm Panic Now</strong> is an independent, non-commercial project that
        provides two fast, practical tools many people use to reduce anxiety:
        {" "}
        <Link href="/calm/box-breathing">box breathing (4-4-4-4)</Link> and the{" "}
        <Link href="/calm/grounding-54321">5-4-3-2-1 grounding technique</Link>.
        There’s no sign-up, it works offline, and it’s designed for those moments when
        you need to <strong>calm a panic attack quickly</strong>.
      </p>

      <h2>Why we built this</h2>
      <p>
        <strong>Panic attacks are common</strong> and can feel overwhelming—racing heart,
        shortness of breath, dizziness, a rush of fear. Simple, structured techniques can
        help your body downshift and your mind re-anchor in the present. Our goal is to put
        effective, evidence-informed exercises in a clean interface you can open in seconds,
        on any device.
      </p>

      <h2>When this can help</h2>
      <ul>
        <li>Early signs of a <strong>panic attack</strong> or surging anxiety</li>
        <li>Before a <strong>job interview</strong>, presentation, or performance</li>
        <li>During <strong>exams</strong> or stressful study sessions</li>
        <li>At bedtime when your mind won’t switch off</li>
        <li>Anytime you want a quick reset to feel calmer and more grounded</li>
      </ul>

      <h2>What’s inside</h2>
      <ul>
        <li>
          <strong>Box Breathing</strong> — a steady
          {" "}
          <em>Inhale → Hold → Exhale → Hold</em> rhythm to reduce physiological arousal.
          Start on the <Link href="/calm/box-breathing">Box Breathing page</Link>.
        </li>
        <li>
          <strong>5-4-3-2-1 Grounding</strong> — name things you can see, touch, hear, smell,
          and taste to bring attention back to the present.
          Try it on the{" "}
          <Link href="/calm/grounding-54321">Grounding page</Link>.
        </li>
        <li>
          <strong>Quick reads</strong> — short guides in the{" "}
          <Link href="/library">Library</Link> including{" "}
          <Link href="/library/stop-panic-attack">How to stop a panic attack</Link>,
          {" "}
          <Link href="/library/box-breathing">Box breathing benefits</Link>,
          {" "}
          and{" "}
          <Link href="/library/grounding-54321">how to do 5-4-3-2-1 grounding</Link>.
        </li>
      </ul>

      <h2>Privacy: no personal data collection</h2>
      <p>
        We built Calm Panic Now to be <strong>privacy-friendly</strong>. We do <em>not</em> ask
        for or store names, emails, or any other personal information. We only measure basic,
        aggregated analytics like page traffic and the number of times each tool is used.
        This helps us:
      </p>
      <ul>
        <li>Understand which tools are most helpful</li>
        <li>Improve performance and reliability</li>
        <li>Decide what to build next</li>
      </ul>
      <p>
        Any analytics we use are configured to avoid personal identifiers and to respect user
        privacy as much as possible.
      </p>

      <h2>Support &amp; sustainability</h2>
      <p>
        We maintain this site in our free time. There are ongoing costs for hosting, domain,
        and development. If these tools help you, please consider a small donation to help us
        keep everything <strong>free for everyone</strong>.
      </p>
      <div className="not-prose my-3">
        <div className="text-sm text-slate-600 dark:text-slate-300 mb-2">
          Keep this project running:
        </div>
        <div className="flex justify-start">
          <KoFiSmallButton />
        </div>
      </div>
      <p>
        Every contribution, no matter the size, is genuinely appreciated. Thank you for helping
        us keep Calm Panic Now online and improving.
      </p>

      <h2>Important disclaimer</h2>
      <p>
        Calm Panic Now is for <strong>education only</strong> and is <strong>not medical advice</strong>.
        These tools are not a diagnosis or a substitute for professional care. If your symptoms
        persist or worsen, consider speaking with a licensed clinician. If you feel unsafe or are
        in immediate danger, call your <strong>local emergency number</strong> right away.
      </p>

      <h2>Get started</h2>
      <p>
        Try <Link href="/calm/box-breathing">Box Breathing</Link> or{" "}
        <Link href="/calm/grounding-54321">5-4-3-2-1 Grounding</Link> now, or browse the{" "}
        <Link href="/library">Library</Link> for quick guides. We hope these tools help you
        feel a little calmer and more in control—wherever you are.
      </p>
    </div>
  );
}
