"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/calm/box-breathing", label: "Breathing" },
  { href: "/calm/grounding-54321", label: "Grounding" },
  { href: "/library", label: "Library" },
];

export default function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="sm:hidden fixed bottom-0 inset-x-0 z-50 border-t border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur">
      <ul className="grid grid-cols-3">
        {items.map((it) => {
          const active = pathname?.startsWith(it.href);
          return (
            <li key={it.href}>
              <Link
                href={it.href}
                className={`block text-center py-3 ${active ? "text-sky-600 font-semibold" : "text-slate-600 dark:text-slate-300"}`}
              >
                {it.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
