import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Optional heading shown at the top of the card. */
  title?: ReactNode;
  /** Optional element rendered on the right of the title (e.g. a "View All" link). */
  action?: ReactNode;
  /** When true, removes the inner padding so children control their own spacing. */
  flush?: boolean;
}

const base =
  'rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900';

export function Card({
  title,
  action,
  flush = false,
  children,
  className = '',
  ...props
}: CardProps) {
  return (
    <div className={`${base} ${className}`} {...props}>
      {(title || action) && (
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-800">
          {title && (
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
              {title}
            </h2>
          )}
          {action}
        </div>
      )}
      <div className={flush ? '' : 'p-5'}>{children}</div>
    </div>
  );
}
