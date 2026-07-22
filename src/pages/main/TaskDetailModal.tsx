import {
  Bell,
  Check,
  ListChecks,
  Paperclip,
  Pause,
  Send,
} from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { ProgressBar } from '../../components/ui/ProgressBar';

export interface BoardTask {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
}

interface TaskDetailModalProps {
  task: BoardTask | null;
  onClose: () => void;
}

// TODO: fetch the real task by id. For now the body is placeholder content
// modelled on the "Design System Audit" screenshot.
const subtasks = [
  { title: 'Audit Color Tokens', done: true },
  { title: 'Review Button Component States', done: true },
  { title: 'Test Typography Hierarchy', done: false },
  { title: 'Form Accessibility Validation', done: false },
];

const description = [
  'Verify color contrast ratios for primary and secondary buttons.',
  'Check keyboard navigation focus states for all interactive elements.',
  'Document discrepancies in a central spreadsheet.',
];

const activity = [
  { name: 'Sarah Jenkins', text: 'changed status to In Progress', time: '2h ago' },
  { name: 'Mark T.', text: 'added the "accessibility" tag', time: '4h ago' },
];

/** A labelled row in the right-hand meta panel. */
function MetaRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>
      {children}
    </div>
  );
}

export function TaskDetailModal({ task, onClose }: TaskDetailModalProps) {
  const doneCount = subtasks.filter((s) => s.done).length;

  return (
    <Modal open={task !== null} onClose={onClose}>
      {task && (
        <div className="p-5 sm:p-6">
          {/* Breadcrumb + title */}
          <div className="pr-8">
            <p className="text-xs text-slate-400">
              Spaces › Product Design › {task.id}
            </p>
            <h1 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
              {task.title}
            </h1>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Created by{' '}
              <span className="font-medium text-slate-700 dark:text-slate-200">
                Sarah Jenkins
              </span>{' '}
              · 2 days ago
            </p>
          </div>

          {/* Quick actions */}
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { label: 'Attach', icon: Paperclip },
              { label: 'Add Subtask', icon: ListChecks },
              { label: 'Reminder', icon: Bell },
            ].map(({ label, icon: Icon }) => (
              <button
                key={label}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <Icon className="h-3.5 w-3.5" /> {label}
              </button>
            ))}
          </div>

          {/* Body: main + meta */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Main column */}
            <div className="space-y-6 lg:col-span-2">
              {/* Description */}
              <section>
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Description
                  </h2>
                  <button className="text-xs font-medium text-brand-600 hover:underline dark:text-brand-300">
                    Edit
                  </button>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Perform a comprehensive review of all current UI components against the
                  newly established accessibility standards (WCAG 2.1 AA).
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-300">
                  {description.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </section>

              {/* Subtasks */}
              <section>
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Subtasks ({doneCount}/{subtasks.length})
                  </h2>
                </div>
                <ProgressBar value={(doneCount / subtasks.length) * 100} className="mb-3 h-1.5" />
                <ul className="space-y-1">
                  {subtasks.map((sub) => (
                    <li
                      key={sub.title}
                      className="flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                          sub.done
                            ? 'border-brand-600 bg-brand-600 text-white'
                            : 'border-slate-300 dark:border-slate-600'
                        }`}
                      >
                        {sub.done && <Check className="h-3.5 w-3.5" />}
                      </span>
                      <span
                        className={`text-sm ${
                          sub.done
                            ? 'text-slate-400 line-through dark:text-slate-500'
                            : 'text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        {sub.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Activity */}
              <section>
                <h2 className="mb-2 text-sm font-semibold text-slate-900 dark:text-white">
                  Activity
                </h2>
                <div className="flex items-center gap-2">
                  <Avatar name="Alex Rivera" size="sm" />
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      className="block w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-3 pr-10 text-sm text-slate-900 transition placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
                    />
                    <button
                      aria-label="Send comment"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-brand-600 dark:text-brand-300"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <ul className="mt-4 space-y-4">
                  {activity.map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <Avatar name={item.name} size="sm" />
                      <div>
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
              </section>
            </div>

            {/* Meta panel */}
            <div className="space-y-5 rounded-xl border border-slate-200 p-4 dark:border-slate-800">
              <MetaRow label="Status">
                <Badge variant="brand">In Progress</Badge>
              </MetaRow>
              <MetaRow label="Assignee">
                <div className="flex items-center gap-2">
                  <Avatar name="Sarah Jenkins" size="xs" />
                  <span className="text-sm text-slate-700 dark:text-slate-200">
                    Sarah Jenkins
                  </span>
                </div>
              </MetaRow>
              <MetaRow label="Priority">
                <Badge variant={task.priority}>
                  {task.priority === 'high'
                    ? 'High'
                    : task.priority === 'medium'
                      ? 'Medium'
                      : 'Low'}
                </Badge>
              </MetaRow>
              <MetaRow label="Time Tracking">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-slate-900 dark:text-white">
                    04:20:15
                  </span>
                  <button
                    aria-label="Pause timer"
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-white"
                  >
                    <Pause className="h-3.5 w-3.5" />
                  </button>
                </div>
                <p className="mt-1 text-xs text-slate-400">Logged: 12h / Est: 20h</p>
              </MetaRow>
              <MetaRow label="Tags">
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="neutral">Design System</Badge>
                  <Badge variant="neutral">Accessibility</Badge>
                  <Badge variant="neutral">Audit</Badge>
                </div>
              </MetaRow>
              <MetaRow label="Due Date">
                <span className="text-sm text-slate-700 dark:text-slate-200">
                  Oct 24, 2023
                </span>
              </MetaRow>
              <MetaRow label="Estimate">
                <span className="text-sm text-slate-700 dark:text-slate-200">20 Hours</span>
              </MetaRow>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
