import type { InputHTMLAttributes, ReactNode } from 'react';
import { useId } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode;
}

export function Checkbox({ label, id, className = '', ...props }: CheckboxProps) {
  const autoId = useId();
  const checkboxId = id ?? autoId;

  return (
    <div className="flex items-start gap-2.5">
      <input
        id={checkboxId}
        type="checkbox"
        className={`mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-700 focus:ring-brand-500 dark:border-slate-600 dark:bg-slate-800 ${className}`}
        {...props}
      />
      <label
        htmlFor={checkboxId}
        className="select-none text-sm text-slate-600 dark:text-slate-300"
      >
        {label}
      </label>
    </div>
  );
}
