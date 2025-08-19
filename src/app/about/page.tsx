export const metadata = {
  title: "About — Calm Panic Now",
  description:
    "Why we built Calm Panic Now and how to use these free tools safely.",
};

export default function AboutPage() {
  return (
    <div className="container py-10 prose prose-slate dark:prose-invert max-w-none">
      <h1>About</h1>
      <p>
        Calm Panic Now is a tiny, independent project providing two quick tools that many
        people find helpful during anxious moments: <a href="/calm/box-breathing">box breathing</a> and
        the <a href="/calm/grounding-54321">5-4-3-2-1 grounding exercise</a>. No sign-up, works offline.
      </p>
      <p>
        These tools are educational and not medical advice. If your symptoms persist or worsen,
        consider speaking with a licensed clinician. If you are in immediate danger, call your
        local emergency number.
      </p>
      <h2>Support</h2>
      <p>
        If the site helps you, consider supporting our hosting costs on Ko-fi:
        <a href="https://ko-fi.com/calmpanicnow" target="_blank" rel="noopener noreferrer">
          {" "}ko-fi.com/calmpanicnow
        </a>.
      </p>
    </div>
  );
}
