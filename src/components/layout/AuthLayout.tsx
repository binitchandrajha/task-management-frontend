import type { ReactNode } from 'react';
import { HelpCircle, LayoutGrid, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

interface AuthLayoutProps {
  children: ReactNode;
  /** Optional content rendered below the card (trust badges, logos, etc.). */
  below?: ReactNode;
  /** Show the filled logo icon next to the wordmark (Login screen). */
  showLogoIcon?: boolean;
}

export function AuthLayout({ children, below, showLogoIcon = false }: AuthLayoutProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-600 dark:bg-slate-950 dark:text-slate-300">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 sm:px-8">
        <div className="flex items-center gap-2">
          {showLogoIcon && (
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-700 text-white">
              <LayoutGrid className="h-5 w-5" />
            </span>
          )}
          <span className="text-xl font-bold text-brand-700 dark:text-brand-300">
            TaskFlow
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Help"
            className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <HelpCircle className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="flex w-full max-w-md flex-col gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
            {children}
          </div>
          {below}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 px-4 py-5 sm:px-8 dark:border-slate-800">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 text-sm text-slate-500 sm:flex-row sm:justify-between dark:text-slate-400">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <span className="font-bold text-slate-700 dark:text-slate-200">TaskFlow</span>
            <span className="hidden text-slate-300 sm:inline dark:text-slate-700">|</span>
            <span>© 2024 TaskFlow Systems. All rights reserved.</span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a href="#" className="transition hover:text-slate-700 dark:hover:text-slate-200">
              Privacy Policy
            </a>
            <a href="#" className="transition hover:text-slate-700 dark:hover:text-slate-200">
              Terms of Service
            </a>
            <a href="#" className="transition hover:text-slate-700 dark:hover:text-slate-200">
              Contact Support
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
