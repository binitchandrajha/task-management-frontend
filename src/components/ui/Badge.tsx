import type { ReactNode } from 'react';

type BadgeVariant =
  | 'high'
  | 'medium'
  | 'low'
  | 'brand'
  | 'neutral'
  | 'success';

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const base =
  'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium';

const variants: Record<BadgeVariant, string> = {
  high: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300',
  medium: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
  low: 'bg-slate-100 text-slate-600 dark:bg-slate-700/50 dark:text-slate-300',
  brand: 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300',
  neutral: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  success:
    'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
};

export function Badge({ variant = 'neutral', children, className = '' }: BadgeProps) {
  return <span className={`${base} ${variants[variant]} ${className}`}>{children}</span>;
}
