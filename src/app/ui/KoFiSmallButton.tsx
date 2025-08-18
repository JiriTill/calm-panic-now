// FILE: src/app/ui/KoFiSmallButton.tsx
export default function KoFiSmallButton() {
  return (
    <a
      href="https://ko-fi.com/calmpanicnow"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white
                 dark:bg-slate-100 dark:text-slate-900 text-sm smooth hover:opacity-90"
      aria-label="Support us on Ko-fi"
    >
      <span>☕</span>
      <span>Support on Ko-fi</span>
    </a>
  );
}
