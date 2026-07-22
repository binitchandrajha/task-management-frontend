import {
  BarChart3,
  Check,
  ChevronRight,
  CalendarDays,
  Plus,
  Trophy,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';

// TODO: replace all of this placeholder data with real API responses.
const quickStats = [
  { label: 'Completed', value: '128', tone: 'brand' as const },
  { label: 'Overdue', value: '03', tone: 'danger' as const },
  { label: 'Upcoming', value: '42', tone: 'neutral' as const },
];

const myWork = [
  {
    title: 'Finalize Q4 Revenue Projections',
    meta: 'In Finance · Due at 4:00 PM',
    priority: 'high' as const,
    done: false,
  },
  {
    title: 'Update Design System Tokens',
    meta: 'In Design · Due tomorrow',
    priority: 'medium' as const,
    done: false,
  },
  {
    title: 'Client Presentation Deck',
    meta: 'In Marketing · 2 days left',
    priority: 'low' as const,
    done: false,
  },
  {
    title: 'Review Weekly Sprint Logs',
    meta: 'Completed 2h ago',
    priority: 'low' as const,
    done: true,
  },
];

const recentActivity = [
  { name: 'Sarah J.', text: 'commented on Project Aurora', time: '5m ago' },
  { name: 'Mark T.', text: 'uploaded brand_assets.zip', time: '22m ago' },
  { name: 'Elena R.', text: 'updated status of Landing Page Refactor', time: '1h ago' },
  { name: 'Julian W.', text: 'joined the Engineering space', time: 'Yesterday' },
];

const streak = [
  { day: 'M', value: 60 },
  { day: 'T', value: 80 },
  { day: 'W', value: 45 },
  { day: 'T', value: 95 },
  { day: 'F', value: 70 },
];

// October 2023 for the mini calendar. `today` highlights the current cell.
const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
const weekdayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const today = 17;

const statTone: Record<string, string> = {
  brand: 'text-brand-600 dark:text-brand-300',
  danger: 'text-red-500 dark:text-red-400',
  neutral: 'text-slate-900 dark:text-white',
};

const priorityLabel: Record<string, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

export const DashboardPage = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Greeting header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Good morning, Alex.
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            You have 5 high priority tasks to tackle today.
          </p>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Due Today
            </p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">12</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Upcoming
            </p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">24</p>
          </div>
        </div>
      </div>

      {/* Top row: Quick Stats · My Work · Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Quick Stats */}
        <Card title="Quick Stats">
          <div className="space-y-3">
            {quickStats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/50"
              >
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  {stat.label}
                </span>
                <span className={`text-xl font-bold ${statTone[stat.tone]}`}>
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* My Work */}
        <Card
          title="My Work"
          action={
            <button className="flex items-center gap-1 text-xs font-medium text-brand-600 hover:underline dark:text-brand-300">
              View All <ChevronRight className="h-3.5 w-3.5" />
            </button>
          }
        >
          <ul className="space-y-1">
            {myWork.map((task) => (
              <li
                key={task.title}
                className="flex items-start gap-3 rounded-lg px-2 py-2 transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                    task.done
                      ? 'border-brand-600 bg-brand-600 text-white'
                      : 'border-slate-300 dark:border-slate-600'
                  }`}
                >
                  {task.done && <Check className="h-3.5 w-3.5" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-sm font-medium ${
                      task.done
                        ? 'text-slate-400 line-through dark:text-slate-500'
                        : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    {task.title}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {task.meta}
                  </p>
                </div>
                {!task.done && (
                  <Badge variant={task.priority}>{priorityLabel[task.priority]}</Badge>
                )}
              </li>
            ))}
          </ul>
        </Card>

        {/* Recent Activity */}
        <Card title="Recent Activity">
          <ul className="space-y-4">
            {recentActivity.map((item, i) => (
              <li key={i} className="flex gap-3">
                <Avatar name={item.name} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-slate-700 dark:text-slate-200">
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {item.name}
                    </span>{' '}
                    {item.text}
                  </p>
                  <p className="text-xs text-slate-400">{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Bottom row: Calendar · Productivity Streak · Level */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Calendar View */}
        <Card
          title={
            <span className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-slate-400" /> Calendar View
            </span>
          }
        >
          <p className="mb-3 text-xs font-medium text-slate-500 dark:text-slate-400">
            October 2023
          </p>
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {weekdayLabels.map((day, i) => (
              <span key={i} className="py-1 font-medium text-slate-400">
                {day}
              </span>
            ))}
            {calendarDays.map((day) => (
              <span
                key={day}
                className={`flex h-8 items-center justify-center rounded-lg ${
                  day === today
                    ? 'bg-brand-600 font-semibold text-white'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                {day}
              </span>
            ))}
          </div>
        </Card>

        {/* Productivity Streak */}
        <Card className="bg-brand-700 text-white dark:bg-brand-800" flush>
          <div className="p-5">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              <h2 className="text-sm font-semibold">Productivity Streak</h2>
            </div>
            <p className="mt-2 text-xs text-brand-100">
              You've hit your daily goals for 14 consecutive days. Keep the momentum!
            </p>
            <div className="mt-4 flex h-24 items-end justify-between gap-2">
              {streak.map((bar, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <div className="flex w-full flex-1 items-end">
                    <div
                      className="w-full rounded-t bg-white/80"
                      style={{ height: `${bar.value}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-brand-100">{bar.day}</span>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full rounded-lg bg-white/15 py-2 text-xs font-semibold transition hover:bg-white/25">
              See Performance Report
            </button>
          </div>
        </Card>

        {/* Level / gamification */}
        <Card>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400">
              <Trophy className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                Level 24 Master
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                1,250 XP to Next Rank
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div className="h-full w-3/4 rounded-full bg-brand-600" />
            </div>
            <p className="mt-2 text-xs text-slate-400">75% of monthly goal achieved</p>
          </div>
        </Card>
      </div>

      {/* Floating new-task button */}
      <button
        type="button"
        aria-label="New task"
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-brand-700 text-white shadow-lg transition hover:bg-brand-800 dark:bg-brand-600 dark:hover:bg-brand-500"
      >
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
};
