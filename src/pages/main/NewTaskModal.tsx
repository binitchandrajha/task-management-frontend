import { Modal } from '../../components/ui/Modal';
import { TextInput } from '../../components/ui/TextInput';
import { Button } from '../../components/ui/Button';
import type { Member } from '../../types/project';

interface NewTaskModalProps {
  open: boolean;
  onClose: () => void;
  /** Project members shown in the assignee dropdown. */
  members: Member[];
}

const selectClass =
  'block w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100';

const labelClass =
  'mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200';

// UI-only: submit abhi kuch save nahi karta.
export function NewTaskModal({ open, onClose, members }: NewTaskModalProps) {
  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-md">
      <div className="p-5 sm:p-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">New Task</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Add a task and assign it to a team member.
        </p>

        <form
          className="mt-5 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: create the task, then:
            onClose();
          }}
        >
          <TextInput label="Task title" placeholder="e.g. Design new landing page" />

          <div>
            <label className={labelClass}>Assignee</label>
            <select className={selectClass} defaultValue="">
              <option value="" disabled>
                Select a member
              </option>
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Status</label>
              <select className={selectClass} defaultValue="todo">
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Priority</label>
              <select className={selectClass} defaultValue="medium">
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          <TextInput label="Due date" type="date" />

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="social" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Task</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
