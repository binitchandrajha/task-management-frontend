import type { ReactNode } from 'react';

type AvatarSize = 'xs' | 'sm' | 'md';

interface AvatarProps {
  /** Full name — initials are derived from it and used as the alt text / fallback. */
  name: string;
  /** Optional image URL. Falls back to initials when omitted. */
  src?: string;
  size?: AvatarSize;
  className?: string;
}

const sizes: Record<AvatarSize, string> = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
};

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function Avatar({ name, src, size = 'sm', className = '' }: AvatarProps) {
  const dimensions = sizes[size];

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${dimensions} shrink-0 rounded-full object-cover ${className}`}
      />
    );
  }

  return (
    <span
      title={name}
      className={`${dimensions} flex shrink-0 items-center justify-center rounded-full bg-brand-100 font-semibold text-brand-700 dark:bg-brand-500/20 dark:text-brand-200 ${className}`}
    >
      {initials(name)}
    </span>
  );
}

interface AvatarGroupProps {
  /** Names (and optional images) of the people to stack. */
  people: { name: string; src?: string }[];
  size?: AvatarSize;
  /** Show at most this many avatars; the rest collapse into a "+N" chip. */
  max?: number;
  children?: ReactNode;
}

export function AvatarGroup({ people, size = 'sm', max = 4 }: AvatarGroupProps) {
  const shown = people.slice(0, max);
  const overflow = people.length - shown.length;
  const dimensions = sizes[size];

  return (
    <div className="flex items-center -space-x-2">
      {shown.map((person) => (
        <Avatar
          key={person.name}
          name={person.name}
          src={person.src}
          size={size}
          className="ring-2 ring-white dark:ring-slate-900"
        />
      ))}
      {overflow > 0 && (
        <span
          className={`${dimensions} flex items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-600 ring-2 ring-white dark:bg-slate-700 dark:text-slate-200 dark:ring-slate-900`}
        >
          +{overflow}
        </span>
      )}
    </div>
  );
}
