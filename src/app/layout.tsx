import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import MobileNav from "./ui/MobileNav";
import KoFiSmallButton from "./ui/KoFiSmallButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://calmpanicnow.com"),
  title: "Calm Panic Now — Box Breathing & 5-4-3-2-1 Grounding",
  description:
    "Two quick tools to help ease panic and anxiety. Free, no sign-up. Works offline.",
  openGraph: {
    title: "Calm Panic Now",
    description: "Box Breathing & 5-4-3-2-1 Grounding",
    url: "https://calmpanicnow.com",
    siteName: "Calm Panic Now",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white text-slate-900 dark:bg-slate-800 dark:text-slate-100 px-3 py-2 rounded">
          Skip to content
        </a>
        <header className="sticky top-0 z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur border-b border-slate-200 dark:border-slate-800">
          <nav className="container py-3 flex items-center gap-4">
            <Link href="/" className="font-semibold">
              Calm Panic Now
            </Link>
            <div className="ml-auto hidden sm:flex gap-4 text-sm">
              <Link href="/calm/box-breathing">Box Breathing</Link>
              <Link href="/calm/grounding-54321">Grounding</Link>
              <Link href="/library">Library</Link>
            </div>
          </nav>
        </header>

        <main id="content" className="flex-1 pb-16 sm:pb-0">{children}</main>

      <footer className="border-t border-slate-200 dark:border-slate-800">
        <div className="container py-8 grid gap-8 md:grid-cols-3">
          {/* Brand + Support */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Calm Panic Now</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Educational only. Not medical advice. If you are in danger, call your local emergency number.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
              Keep this app free for everyone by supporting it:
            </p>
            <div className="mt-2">
              <KoFiSmallButton />
            </div>
          </div>
      
          {/* Links */}
          <nav className="text-sm">
            <h4 className="eyebrow mb-2">Tools</h4>
            <ul className="space-y-1">
              <li><Link href="/calm/box-breathing">Box Breathing</Link></li>
              <li><Link href="/calm/grounding-54321">Grounding 5-4-3-2-1</Link></li>
            </ul>
      
            <h4 className="eyebrow mt-4 mb-2">Learn</h4>
            <ul className="space-y-1">
              <li><Link href="/library">Library</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/">Home</Link></li>
            </ul>
          </nav>
      
          {/* Legal / meta */}
          <div className="text-xs text-slate-600 dark:text-slate-400 md:text-right self-end">
            <p>© {new Date().getFullYear()} Calm Panic Now</p>
          </div>
        </div>
      </footer>

        <MobileNav />
      </body>
    </html>
  );
}
