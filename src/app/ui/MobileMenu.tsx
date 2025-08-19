"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [open]);

  // close on ESC
  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  return (
    <div className="relative sm:hidden ml-auto" ref={ref}>
      <button
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="p-2 rounded-lg border border-slate-300 dark:border-slate-700"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="sr-only">Menu</span>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg p-2"
        >
          <Link className="block px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800" href="/calm/box-breathing">
            Box Breathing
          </Link>
          <Link className="block px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800" href="/calm/grounding-54321">
            Grounding 5-4-3-2-1
          </Link>
          <div className="my-2 border-t border-slate-200 dark:border-slate-800" />
          <Link className="block px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800" href="/library">
            Library
          </Link>
          <Link className="block px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800" href="/about">
            About
          </Link>
        </div>
      )}
    </div>
  );
}
