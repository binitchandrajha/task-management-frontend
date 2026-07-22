import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft, Plus, UserPlus } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { getProject, getMember, members as allMembers } from '../../data/mockData';
import { PRIORITY_LABEL, STATUS_META } from '../../types/project';
import type { Task, TaskStatus } from '../../types/project';
import { NewTaskModal } from './NewTaskModal';
import { AddMemberModal } from './AddMemberModal';
import { TaskDetailModal } from './TaskDetailModal';

const columns: TaskStatus[] = ['todo', 'in-progress', 'done'];

/** One task card inside a board column. */
function TaskCard({ task, onOpen }: { task: Task; onOpen: (t: Task) => void }) {
  const assignee = getMember(task.assigneeId);
  return (
    <button
      onClick={() => onOpen(task)}
      className="w-full rounded-xl border border-slate-200 bg-white p-3 text-left shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-medium text-slate-900 dark:text-white">
          {task.title}
        </h3>
        <Badge variant={task.priority}>{PRIORITY_LABEL[task.priority]}</Badge>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-slate-400">{task.dueDate ?? ''}</span>
        {assignee ? (
          <Avatar name={assignee.name} size="xs" />
        ) : (
          <span className="text-xs text-slate-400">Unassigned</span>
        )}
      </div>
    </button>
  );
}

export const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const project = getProject(projectId);

  const [showNewTask, setShowNewTask] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  if (!project) {
    return (
      <div className="mx-auto max-w-6xl">
        <p className="text-slate-500 dark:text-slate-400">Project not found.</p>
        <Link to="/projects" className="mt-2 inline-block text-sm text-brand-600 hover:underline">
          ← Back to projects
        </Link>
      </div>
    );
  }

  const projectMembers = project.memberIds
    .map((id) => getMember(id))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  const candidates = allMembers.filter((m) => !project.memberIds.includes(m.id));

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Back + header */}
      <div>
        <Link
          to="/projects"
          className="inline-flex items-center gap-1 text-sm text-slate-500 transition hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <ArrowLeft className="h-4 w-4" /> Projects
        </Link>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              {project.name}
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {project.description}
            </p>
          </div>
        </div>
      </div>

      {/* Team members */}
      <Card
        title="Team Members"
        action={
          <button
            onClick={() => setShowAddMember(true)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-600 hover:underline dark:text-brand-300"
          >
            <UserPlus className="h-3.5 w-3.5" /> Add Member
          </button>
        }
      >
        <div className="flex flex-wrap gap-4">
          {projectMembers.map((m) => (
            <div key={m.id} className="flex items-center gap-2">
              <Avatar name={m.name} size="sm" />
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {m.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{m.role}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Tasks board */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Tasks</h2>
          <div className="w-auto">
            <Button
              className="w-auto"
              leftIcon={<Plus className="h-4 w-4" />}
              onClick={() => setShowNewTask(true)}
            >
              New Task
            </Button>
          </div>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-2">
          {columns.map((status) => {
            const tasks = project.tasks.filter((t) => t.status === status);
            return (
              <div key={status} className="flex w-72 shrink-0 flex-col gap-3">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    {STATUS_META[status].label}
                  </h3>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    {tasks.length}
                  </span>
                </div>
                {tasks.map((task) => (
                  <TaskCard key={task.id} task={task} onOpen={setSelectedTask} />
                ))}
                <button
                  onClick={() => setShowNewTask(true)}
                  className="flex items-center justify-center gap-1 rounded-xl border border-dashed border-slate-300 py-2 text-xs font-medium text-slate-500 transition hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:text-slate-400"
                >
                  <Plus className="h-3.5 w-3.5" /> Add task
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      <NewTaskModal
        open={showNewTask}
        onClose={() => setShowNewTask(false)}
        members={projectMembers}
      />
      <AddMemberModal
        open={showAddMember}
        onClose={() => setShowAddMember(false)}
        candidates={candidates}
      />
      <TaskDetailModal task={selectedTask} onClose={() => setSelectedTask(null)} />
    </div>
  );
};
