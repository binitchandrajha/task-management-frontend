import type { Member, Project } from '../types/project';

// TODO: replace this mock data with real API calls later.
// Sab dummy data ek hi jagah — pages yahin se import karte hain.

export const members: Member[] = [
  { id: 'u1', name: 'Alex Rivera', role: 'Project Manager' },
  { id: 'u2', name: 'Sarah Jenkins', role: 'Designer' },
  { id: 'u3', name: 'Mark Thompson', role: 'Frontend Developer' },
  { id: 'u4', name: 'Elena Ruiz', role: 'Backend Developer' },
  { id: 'u5', name: 'Julian Wong', role: 'QA Engineer' },
];

export const projects: Project[] = [
  {
    id: 'p1',
    name: 'Website Redesign',
    description: 'Revamp the marketing website with a new design system.',
    memberIds: ['u1', 'u2', 'u3'],
    tasks: [
      {
        id: 't1',
        title: 'Design new landing page',
        description: 'Create hero, features and pricing sections.',
        status: 'in-progress',
        priority: 'high',
        assigneeId: 'u2',
        dueDate: 'Aug 05',
      },
      {
        id: 't2',
        title: 'Set up component library',
        status: 'todo',
        priority: 'medium',
        assigneeId: 'u3',
        dueDate: 'Aug 10',
      },
      {
        id: 't3',
        title: 'Audit current accessibility',
        status: 'done',
        priority: 'low',
        assigneeId: 'u2',
        dueDate: 'Jul 28',
      },
      {
        id: 't4',
        title: 'Write project brief',
        status: 'done',
        priority: 'medium',
        assigneeId: 'u1',
        dueDate: 'Jul 20',
      },
    ],
  },
  {
    id: 'p2',
    name: 'Mobile App Launch',
    description: 'Ship the v1 mobile app to the app stores.',
    memberIds: ['u1', 'u3', 'u4', 'u5'],
    tasks: [
      {
        id: 't5',
        title: 'Build authentication flow',
        status: 'in-progress',
        priority: 'high',
        assigneeId: 'u4',
        dueDate: 'Aug 08',
      },
      {
        id: 't6',
        title: 'QA test on Android',
        status: 'todo',
        priority: 'high',
        assigneeId: 'u5',
        dueDate: 'Aug 15',
      },
      {
        id: 't7',
        title: 'Prepare store screenshots',
        status: 'todo',
        priority: 'low',
        assigneeId: 'u3',
        dueDate: 'Aug 18',
      },
    ],
  },
  {
    id: 'p3',
    name: 'Q3 Marketing Campaign',
    description: 'Plan and run the Q3 product marketing campaign.',
    memberIds: ['u1', 'u2'],
    tasks: [
      {
        id: 't8',
        title: 'Draft campaign strategy',
        status: 'done',
        priority: 'medium',
        assigneeId: 'u1',
        dueDate: 'Jul 30',
      },
      {
        id: 't9',
        title: 'Design social media assets',
        status: 'in-progress',
        priority: 'medium',
        assigneeId: 'u2',
        dueDate: 'Aug 12',
      },
    ],
  },
];

/** Helper: look up a member by id (mock version of a DB fetch). */
export function getMember(id?: string): Member | undefined {
  return members.find((m) => m.id === id);
}

/** Helper: look up a project by id. */
export function getProject(id?: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
