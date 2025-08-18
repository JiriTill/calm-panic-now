import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  metadataBase: new URL('https://calmpanicnow.com'),
  title: 'Calm Panic Now — Box Breathing & 5-4-3-2-1 Grounding',
  description: 'Two quick tools to help ease panic and anxiety. Free, no sign-up. Works offline.',
  openGraph: {
    title: 'Calm Panic Now',
    description: 'Box Breathing & 5-4-3-2-1 Grounding',
    url: 'https://calmpanicnow.com',
    siteName: 'Calm Panic Now',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur border-b border-slate-200 dark:border-slate-800">
          <nav className="mx-auto max-w-3xl px-4 py-3 flex items-center gap-4">
            <Link href="/" className="font-semibold">Calm Panic Now</Link>
            <div className="ml-auto flex gap-4 text-sm">
              <Link href="/calm/box-breathing">Box Breathing</Link>
              <Link href="/calm/grounding-54321">Grounding</Link>
              <Link href="/library">Library</Link>
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
          <div className="mx-auto max-w-3xl px-4 py-6 space-y-2">
            <p>Educational only. Not medical advice. If you are in danger, call your local emergency number.</p>
            <p>© {new Date().getFullYear()} Calm Panic Now</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
