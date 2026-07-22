import { Modal } from '../../components/ui/Modal';
import { TextInput } from '../../components/ui/TextInput';
import { Button } from '../../components/ui/Button';

interface NewProjectModalProps {
  open: boolean;
  onClose: () => void;
}

// UI-only: form submit abhi kuch nahi karta. User baad mein logic wire karega.
export function NewProjectModal({ open, onClose }: NewProjectModalProps) {
  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-md">
      <div className="p-5 sm:p-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Create New Project
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Give your project a name and a short description.
        </p>

        <form
          className="mt-5 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: create the project, then:
            onClose();
          }}
        >
          <TextInput label="Project name" placeholder="e.g. Website Redesign" />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="What is this project about?"
              className="block w-full rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="social" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Project</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
