import {
  Activity,
  Briefcase,
  Code2,
  Folder,
  HardDrive,
  Palette,
  Plus,
  Settings2,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { ProgressBar } from '../../components/ui/ProgressBar';

interface Space {
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  folders: number;
  activeTasks: number;
}

// TODO: replace with real spaces data from the API.
const spaces: Space[] = [
  {
    name: 'Marketing',
    description: 'Global campaigns, brand assets, and creative pipelines.',
    icon: Briefcase,
    color: 'bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300',
    folders: 12,
    activeTasks: 84,
  },
  {
    name: 'Engineering',
    description: 'Product roadmap, sprints, and technical documentation.',
    icon: Code2,
    color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
    folders: 8,
    activeTasks: 142,
  },
  {
    name: 'Design',
    description: 'UI/UX kits, research, and collaborative workshops.',
    icon: Palette,
    color: 'bg-pink-100 text-pink-700 dark:bg-pink-500/15 dark:text-pink-300',
    folders: 9,
    activeTasks: 37,
  },
  {
    name: 'Operations',
    description: 'Hiring, payroll, and internal logistics.',
    icon: Settings2,
    color: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
    folders: 14,
    activeTasks: 21,
  },
];

const recentFolders = [
  { name: 'Mobile App Refresh', meta: 'Space: Engineering · 12 Tasks Pending', active: '14m ago' },
  { name: 'Investor Presentation', meta: 'Space: Operations · 4 Tasks Pending', active: '1h ago' },
];

export const SpacesPage = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Spaces Hierarchy
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Organize your workspace into high-level functional areas.
          </p>
        </div>
        <button className="inline-flex items-center gap-1.5 self-start rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
          <Settings2 className="h-4 w-4" /> Manage Layout
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main column: spaces grid + recent folders */}
        <div className="space-y-6 lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {spaces.map((space) => {
              const Icon = space.icon;
              return (
                <div
                  key={space.name}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${space.color}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">
                    {space.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {space.description}
                  </p>
                  <div className="mt-4 flex gap-6 border-t border-slate-100 pt-3 dark:border-slate-800">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-400">Folders</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {space.folders}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-400">
                        Active Tasks
                      </p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {space.activeTasks}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Create new space tile */}
            <button className="flex min-h-[180px] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 p-5 text-center text-slate-500 transition hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:text-slate-400 sm:col-span-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                <Plus className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold">Create New Space</span>
              <span className="text-xs">Add a dedicated area for your team.</span>
            </button>
          </div>

          {/* Recent folders */}
          <Card title="Recent Folders" action={
            <button className="text-xs font-medium text-brand-600 hover:underline dark:text-brand-300">
              View All
            </button>
          }>
            <ul className="space-y-2">
              {recentFolders.map((folder) => (
                <li
                  key={folder.name}
                  className="flex items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    <Folder className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                      {folder.name}
                    </p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                      {folder.meta}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-slate-400">
                    Last active {folder.active}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Right sidebar: pulse + usage */}
        <div className="space-y-6">
          <Card
            title={
              <span className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-slate-400" /> Workspace Pulse
              </span>
            }
          >
            <div className="rounded-xl bg-brand-700 p-4 text-white dark:bg-brand-800">
              <p className="text-xs text-brand-100">Completed Tasks</p>
              <p className="mt-1 text-3xl font-bold">1,240</p>
              <p className="mt-1 text-xs text-brand-100">78% of monthly goal achieved</p>
            </div>
          </Card>

          <Card
            title={
              <span className="flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-slate-400" /> Workspace Usage
              </span>
            }
          >
            <div className="space-y-4">
              <div>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Storage</span>
                  <span className="font-medium text-slate-700 dark:text-slate-200">
                    8.4 / 20 GB
                  </span>
                </div>
                <ProgressBar value={42} />
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
                <span className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <Users className="h-4 w-4 text-slate-400" /> Total Members
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">42</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Floating new-space button */}
      <button
        type="button"
        aria-label="New space"
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-brand-700 text-white shadow-lg transition hover:bg-brand-800 dark:bg-brand-600 dark:hover:bg-brand-500"
      >
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
};
