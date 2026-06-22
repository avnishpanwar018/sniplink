import { Link } from 'react-router-dom';
import { Scissors } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Layout({ children }) {

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Navbar ─────────────────────────────── */}
      <header className="sticky top-0 z-50 glass">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 group"
          >
            <div className="p-2 rounded-xl gradient-bg shadow-md shadow-primary-500/20
                            group-hover:shadow-lg group-hover:shadow-primary-500/30 transition-all">
              <Scissors className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">
              Sniplink
            </span>
          </Link>

          <ThemeToggle />
        </nav>
      </header>

      {/* ── Main Content ───────────────────────── */}
      <main className="flex-1">
        {children}
      </main>

      {/* ── Footer ─────────────────────────────── */}
      <footer className="py-8 text-center">
        <p className="text-sm text-slate-400 dark:text-slate-500">
          <span className="gradient-text font-semibold">Sniplink</span>
          {' — '}
          Simplify your links, amplify your impact.
        </p>
        <p className="text-xs text-slate-300 dark:text-slate-600 mt-1">
          © {new Date().getFullYear()} Sniplink. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
