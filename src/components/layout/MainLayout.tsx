import { useState } from 'react';
import { NavLink, Outlet } from 'react-router';
import {
  Archive,
  Bell,
  Folder,
  HelpCircle,
  Home,
  LayoutGrid,
  List,
  Menu,
  Moon,
  Plus,
  Search,
  Settings,
  Sun,
  Trash2,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';

interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
}

const primaryNav: NavItem[] = [
  { label: 'Home', to: '/dashboard', icon: Home },
  { label: 'My Tasks', to: '/board', icon: List },
  { label: 'Spaces', to: '/spaces', icon: LayoutGrid },
  { label: 'Folders', to: '/folders', icon: Folder },
  { label: 'Lists', to: '/lists', icon: List },
];

const secondaryNav: NavItem[] = [
  { label: 'Archive', to: '/archive', icon: Archive },
  { label: 'Trash', to: '/trash', icon: Trash2 },
];

/** Renders a single sidebar link with active-state styling. */
function SidebarLink({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.to}
      onClick={onNavigate}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
          isActive
            ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-200'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
        }`
      }
    >
      <Icon className="h-5 w-5" />
      {item.label}
    </NavLink>
  );
}

/** The sidebar body, shared between the desktop rail and the mobile drawer. */
function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col gap-6 p-4">
      {/* Workspace badge */}
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2.5 dark:border-slate-800">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-700 text-white">
          <LayoutGrid className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
            Workspace
          </p>
          <p className="truncate text-xs text-slate-500 dark:text-slate-400">
            Professional Plan
          </p>
        </div>
      </div>

      <Button leftIcon={<Plus className="h-4 w-4" />} onClick={onNavigate}>
        New Task
      </Button>

      <nav className="flex flex-1 flex-col gap-1">
        {primaryNav.map((item) => (
          <SidebarLink key={item.label} item={item} onNavigate={onNavigate} />
        ))}
      </nav>

      <nav className="flex flex-col gap-1 border-t border-slate-200 pt-4 dark:border-slate-800">
        {secondaryNav.map((item) => (
          <SidebarLink key={item.label} item={item} onNavigate={onNavigate} />
        ))}
      </nav>
    </div>
  );
}

export function MainLayout() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-600 dark:bg-slate-950 dark:text-slate-300">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:block dark:border-slate-800 dark:bg-slate-900">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/50"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <aside className="absolute inset-y-0 left-0 w-64 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <div className="flex justify-end p-2">
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur sm:px-6 dark:border-slate-800 dark:bg-slate-900/80">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden dark:hover:bg-slate-800"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Search */}
          <div className="relative hidden max-w-md flex-1 sm:block">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="search"
              placeholder="Search tasks, docs, people..."
              className="block w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-900 transition placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
            />
          </div>

          <div className="ml-auto flex items-center gap-1">
            <button
              type="button"
              aria-label="Notifications"
              className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <Bell className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Settings"
              className="hidden rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 sm:block dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <Settings className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Help"
              className="hidden rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 sm:block dark:hover:bg-slate-800 dark:hover:text-slate-200"
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

            <div className="ml-2 flex items-center gap-2">
              <Avatar name="Alex Rivera" size="sm" />
              <div className="hidden leading-tight sm:block">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Alex Rivera
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Project Manager
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Routed page content */}
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
