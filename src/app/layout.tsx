import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import MobileNav from "./ui/MobileNav";
import KoFiSmallButton from "./ui/KoFiSmallButton";
import Image from "next/image";

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
  icons: {
    icon: "/favicon.ico",
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
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image src="/logo.png" alt="Calm Panic Now logo" width={28} height={28} />
              <span>Calm Panic Now</span>
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
        <div className="container max-w-5xl py-10">
          <div className="grid gap-12 md:grid-cols-12 items-start">
            {/* LEFT: logo + name */}
            <div className="md:col-span-4 space-y-4">
              <Link href="/" className="flex items-center gap-3">
                {/* use your PNG logo */}
                <Image
                  src="/logo.png"
                  alt="Calm Panic Now logo"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-xl ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900"
                />
                <span className="text-base font-semibold">Calm Panic Now</span>
              </Link>
            </div>
      
            {/* CENTER: Ko-fi card only */}
            <div className="md:col-span-5">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 p-6">
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                  Keep this app free for everyone by supporting it:
                </p>
                <div className="flex justify-center">
                  <KoFiSmallButton />
                </div>
              </div>
            </div>
      
            {/* RIGHT: links in two columns */}
            <div className="md:col-span-3 grid grid-cols-2 gap-6">
              <nav className="text-sm">
                <h4 className="eyebrow mb-2">Tools</h4>
                <ul className="space-y-1">
                  <li><Link href="/calm/box-breathing">Box Breathing</Link></li>
                  <li><Link href="/calm/grounding-54321">Grounding 5-4-3-2-1</Link></li>
                </ul>
              </nav>
              <nav className="text-sm">
                <h4 className="eyebrow mb-2">Learn</h4>
                <ul className="space-y-1">
                  <li><Link href="/library">Library</Link></li>
                  <li><Link href="/about">About</Link></li>
                  <li><Link href="/">Home</Link></li>
                </ul>
              </nav>
            </div>
          </div>
      
          {/* Bottom center: disclaimer + copyright */}
          <div className="mt-10 border-t border-slate-200 dark:border-slate-800 pt-6 text-center text-xs text-slate-600 dark:text-slate-400 space-y-2">
            <p>Educational only. Not medical advice. If you are in danger, call your local emergency number.</p>
            <p>© {new Date().getFullYear()} Calm Panic Now</p>
          </div>
        </div>
      </footer>


        <MobileNav />
      </body>
    </html>
  );
}
