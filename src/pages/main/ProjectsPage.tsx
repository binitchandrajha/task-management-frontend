import { useState } from 'react';
import { Link } from 'react-router';
import { Plus } from 'lucide-react';
import { AvatarGroup } from '../../components/ui/Avatar';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Button } from '../../components/ui/Button';
import { projects, getMember } from '../../data/mockData';
import { NewProjectModal } from './NewProjectModal';

export const ProjectsPage = () => {
  const [showNew, setShowNew] = useState(false);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Projects</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {projects.length} projects
          </p>
        </div>
        <div className="w-auto">
          <Button
            className="w-auto"
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={() => setShowNew(true)}
          >
            New Project
          </Button>
        </div>
      </div>

      {/* Project cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          const done = project.tasks.filter((t) => t.status === 'done').length;
          const total = project.tasks.length;
          const percent = total === 0 ? 0 : (done / total) * 100;
          const people = project.memberIds
            .map((id) => getMember(id))
            .filter((m): m is NonNullable<typeof m> => Boolean(m))
            .map((m) => ({ name: m.name }));

          return (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                {project.name}
              </h2>
              <p className="mt-1 line-clamp-2 flex-1 text-sm text-slate-500 dark:text-slate-400">
                {project.description}
              </p>

              {/* Progress */}
              <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Progress</span>
                  <span className="font-medium text-slate-700 dark:text-slate-200">
                    {done}/{total} tasks
                  </span>
                </div>
                <ProgressBar value={percent} />
              </div>

              {/* Members */}
              <div className="mt-4 flex items-center justify-between">
                <AvatarGroup people={people} size="sm" max={4} />
                <span className="text-xs text-slate-400">
                  {project.memberIds.length} members
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <NewProjectModal open={showNew} onClose={() => setShowNew(false)} />
    </div>
  );
};
