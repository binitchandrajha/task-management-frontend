// Domain types for the simple ClickUp-style app. Kept minimal on purpose —
// mock data and pages both build on these shapes.

export type TaskStatus = 'todo' | 'in-progress' | 'done';

export type Priority = 'high' | 'medium' | 'low';

export interface Member {
  id: string;
  name: string;
  role: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  /** Member.id of the assignee, if any. */
  assigneeId?: string;
  dueDate?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  /** Ids of the members on this project. */
  memberIds: string[];
  tasks: Task[];
}

/** Human-readable labels + Badge variants for each status. */
export const STATUS_META: Record<
  TaskStatus,
  { label: string; badge: 'neutral' | 'brand' | 'success' }
> = {
  todo: { label: 'To Do', badge: 'neutral' },
  'in-progress': { label: 'In Progress', badge: 'brand' },
  done: { label: 'Done', badge: 'success' },
};

export const PRIORITY_LABEL: Record<Priority, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};
