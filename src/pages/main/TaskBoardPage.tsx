import { useState } from 'react';
import {
  ArrowUpDown,
  MessageSquare,
  Paperclip,
  Plus,
  SlidersHorizontal,
} from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { AvatarGroup } from '../../components/ui/Avatar';
import { TaskDetailModal } from './TaskDetailModal';
import type { BoardTask } from './TaskDetailModal';

interface Card extends BoardTask {
  description?: string;
  date: string;
  comments: number;
  attachments: number;
  people: { name: string }[];
}

interface Column {
  name: string;
  cards: Card[];
}

// TODO: replace with real board data from the API.
const columns: Column[] = [
  {
    name: 'To Do',
    cards: [
      {
        id: 'TF-201',
        title: 'Finalize Q4 Marketing Budget',
        description: 'Review all department proposals and consolidate into a single spreadsheet.',
        priority: 'high',
        date: 'Oct 24',
        comments: 4,
        attachments: 1,
        people: [{ name: 'Alex Rivera' }, { name: 'Mark T.' }],
      },
      {
        id: 'TF-202',
        title: 'Brand Guidelines Update',
        priority: 'low',
        date: 'Oct 28',
        comments: 2,
        attachments: 0,
        people: [{ name: 'Elena R.' }],
      },
    ],
  },
  {
    name: 'In Progress',
    cards: [
      {
        id: 'TF-150',
        title: 'User Testing Session #3',
        description: 'Analyzing recordings from the beta group regarding the new navigation.',
        priority: 'medium',
        date: 'Oct 22',
        comments: 8,
        attachments: 3,
        people: [{ name: 'Sarah Jenkins' }, { name: 'Julian W.' }, { name: 'Mark T.' }],
      },
    ],
  },
  {
    name: 'In Review',
    cards: [
      {
        id: 'TF-102',
        title: 'Update Privacy Policy',
        priority: 'low',
        date: 'Oct 20',
        comments: 1,
        attachments: 0,
        people: [{ name: 'Alex Rivera' }],
      },
    ],
  },
];

const priorityLabel = { high: 'High', medium: 'Medium', low: 'Low' } as const;

/** A single draggable-looking task card on the board. */
function BoardCard({ card, onOpen }: { card: Card; onOpen: (task: BoardTask) => void }) {
  return (
    <button
      onClick={() => onOpen(card)}
      className="w-full rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
    >
      <Badge variant={card.priority}>{priorityLabel[card.priority]}</Badge>
      <h3 className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
        {card.title}
      </h3>
      {card.description && (
        <p className="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
          {card.description}
        </p>
      )}
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-slate-400">{card.date}</span>
        <div className="flex items-center gap-3 text-xs text-slate-400">
          {card.comments > 0 && (
            <span className="flex items-center gap-1">
              <MessageSquare className="h-3.5 w-3.5" /> {card.comments}
            </span>
          )}
          {card.attachments > 0 && (
            <span className="flex items-center gap-1">
              <Paperclip className="h-3.5 w-3.5" /> {card.attachments}
            </span>
          )}
          <AvatarGroup people={card.people} size="xs" max={3} />
        </div>
      </div>
    </button>
  );
}

const tabs = ['List', 'Board', 'Calendar'];

export const TaskBoardPage = () => {
  const [activeTab, setActiveTab] = useState('Board');
  const [selectedTask, setSelectedTask] = useState<BoardTask | null>(null);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Product Launch 2024
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Track and manage the launch workstream.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <AvatarGroup
            people={[
              { name: 'Alex Rivera' },
              { name: 'Sarah Jenkins' },
              { name: 'Mark T.' },
              { name: 'Elena R.' },
              { name: 'Julian W.' },
            ]}
            max={4}
          />
          {/* Tabs */}
          <div className="flex rounded-lg border border-slate-200 p-0.5 dark:border-slate-700">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                  activeTab === tab
                    ? 'bg-brand-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
            <SlidersHorizontal className="h-3.5 w-3.5" /> Filter
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
            <ArrowUpDown className="h-3.5 w-3.5" /> Sort
          </button>
        </div>
      </div>

      {/* Board columns (horizontal scroll on small screens) */}
      <div className="flex gap-5 overflow-x-auto pb-2">
        {columns.map((column) => (
          <div key={column.name} className="flex w-72 shrink-0 flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                {column.name}
              </h2>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                {column.cards.length}
              </span>
            </div>
            {column.cards.map((card) => (
              <BoardCard key={card.id} card={card} onOpen={setSelectedTask} />
            ))}
            <button className="flex items-center justify-center gap-1 rounded-xl border border-dashed border-slate-300 py-2 text-xs font-medium text-slate-500 transition hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:text-slate-400">
              <Plus className="h-3.5 w-3.5" /> New Task
            </button>
          </div>
        ))}
      </div>

      <TaskDetailModal task={selectedTask} onClose={() => setSelectedTask(null)} />
    </div>
  );
};
