import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import type { Member } from '../../types/project';

interface AddMemberModalProps {
  open: boolean;
  onClose: () => void;
  /** Members not yet on the project — the ones you can add. */
  candidates: Member[];
}

// UI-only: checkbox toggle karo, "Add" abhi kuch save nahi karta.
export function AddMemberModal({ open, onClose, candidates }: AddMemberModalProps) {
  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-md">
      <div className="p-5 sm:p-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Add Team Members
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Select people to add to this project.
        </p>

        <div className="mt-5 space-y-1">
          {candidates.length === 0 && (
            <p className="rounded-lg bg-slate-50 px-3 py-4 text-center text-sm text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              Everyone is already on this project.
            </p>
          )}
          {candidates.map((m) => (
            <label
              key={m.id}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 dark:border-slate-600 dark:bg-slate-800"
              />
              <Avatar name={m.name} size="sm" />
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {m.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{m.role}</p>
              </div>
            </label>
          ))}
        </div>

        <div className="mt-5 flex gap-3">
          <Button type="button" variant="social" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={onClose}>
            Add Selected
          </Button>
        </div>
      </div>
    </Modal>
  );
}
