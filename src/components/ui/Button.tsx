import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

type Variant = 'primary' | 'social' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const base =
  'inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-700 text-white shadow-sm hover:bg-brand-800 dark:bg-brand-600 dark:hover:bg-brand-500',
  social:
    'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700',
  ghost:
    'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white',
};

export function Button({
  variant = 'primary',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : leftIcon}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
}
