import { Check, Send } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { getMember } from '../../data/mockData';
import { PRIORITY_LABEL, STATUS_META } from '../../types/project';
import type { Task } from '../../types/project';

interface TaskDetailModalProps {
  task: Task | null;
  onClose: () => void;
}

// A labelled row in the right-hand meta panel.
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
  const assignee = getMember(task?.assigneeId);

  return (
    <Modal open={task !== null} onClose={onClose} maxWidth="max-w-3xl">
      {task && (
        <div className="p-5 sm:p-6">
          {/* Title */}
          <div className="pr-8">
            <Badge variant={STATUS_META[task.status].badge}>
              {STATUS_META[task.status].label}
            </Badge>
            <h1 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
              {task.title}
            </h1>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {/* Main column */}
            <div className="space-y-6 sm:col-span-2">
              <section>
                <h2 className="mb-2 text-sm font-semibold text-slate-900 dark:text-white">
                  Description
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {task.description ?? 'No description added yet.'}
                </p>
              </section>

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
              </section>
            </div>

            {/* Meta panel */}
            <div className="space-y-5 rounded-xl border border-slate-200 p-4 dark:border-slate-800">
              <MetaRow label="Status">
                <Badge variant={STATUS_META[task.status].badge}>
                  {STATUS_META[task.status].label}
                </Badge>
              </MetaRow>
              <MetaRow label="Assignee">
                {assignee ? (
                  <div className="flex items-center gap-2">
                    <Avatar name={assignee.name} size="xs" />
                    <span className="text-sm text-slate-700 dark:text-slate-200">
                      {assignee.name}
                    </span>
                  </div>
                ) : (
                  <span className="text-sm text-slate-400">Unassigned</span>
                )}
              </MetaRow>
              <MetaRow label="Priority">
                <Badge variant={task.priority}>{PRIORITY_LABEL[task.priority]}</Badge>
              </MetaRow>
              <MetaRow label="Due Date">
                <span className="text-sm text-slate-700 dark:text-slate-200">
                  {task.dueDate ?? '—'}
                </span>
              </MetaRow>
              <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                <Check className="h-3.5 w-3.5" /> Task ID: {task.id}
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
