import { Link } from 'react-router';
import { CheckCircle2, Clock, FolderKanban, ListTodo } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { projects } from '../../data/mockData';
import { STATUS_META } from '../../types/project';

// Sab mock data se derive — simple summary, koi gamification nahi.
const allTasks = projects.flatMap((p) =>
  p.tasks.map((t) => ({ ...t, projectName: p.name, projectId: p.id })),
);

const summary = [
  {
    label: 'Projects',
    value: projects.length,
    icon: FolderKanban,
    color: 'bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300',
  },
  {
    label: 'In Progress',
    value: allTasks.filter((t) => t.status === 'in-progress').length,
    icon: Clock,
    color: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
  },
  {
    label: 'Completed',
    value: allTasks.filter((t) => t.status === 'done').length,
    icon: CheckCircle2,
    color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  },
  {
    label: 'To Do',
    value: allTasks.filter((t) => t.status === 'todo').length,
    icon: ListTodo,
    color: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  },
];

// "My tasks" = pehle 5 tasks (mock).
const myTasks = allTasks.slice(0, 5);

export const DashboardPage = () => {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Good morning, Alex.
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Here's what's happening across your projects.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {summary.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.color}`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
                {item.value}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{item.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* My tasks */}
        <div className="lg:col-span-2">
          <Card title="My Tasks">
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {myTasks.map((task) => (
                <li key={task.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                      {task.title}
                    </p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                      {task.projectName}
                    </p>
                  </div>
                  <Badge variant={STATUS_META[task.status].badge}>
                    {STATUS_META[task.status].label}
                  </Badge>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Recent projects */}
        <Card
          title="Recent Projects"
          action={
            <Link
              to="/projects"
              className="text-xs font-medium text-brand-600 hover:underline dark:text-brand-300"
            >
              View All
            </Link>
          }
        >
          <ul className="space-y-4">
            {projects.map((project) => {
              const done = project.tasks.filter((t) => t.status === 'done').length;
              const total = project.tasks.length;
              return (
                <li key={project.id}>
                  <Link
                    to={`/projects/${project.id}`}
                    className="block rounded-lg p-2 transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {project.name}
                      </span>
                      <span className="text-xs text-slate-400">
                        {done}/{total}
                      </span>
                    </div>
                    <ProgressBar value={total === 0 ? 0 : (done / total) * 100} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>
    </div>
  );
};
