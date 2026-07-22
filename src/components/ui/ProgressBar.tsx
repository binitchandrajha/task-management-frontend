interface ProgressBarProps {
  /** Fill percentage, 0–100. */
  value: number;
  /** Tailwind height class (default: h-2). */
  className?: string;
  /** Tailwind background class for the filled portion (default: brand). */
  barClassName?: string;
}

export function ProgressBar({
  value,
  className = 'h-2',
  barClassName = 'bg-brand-600',
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      className={`w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800 ${className}`}
    >
      <div
        className={`h-full rounded-full transition-all ${barClassName}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
