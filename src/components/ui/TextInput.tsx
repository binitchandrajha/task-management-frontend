import type { InputHTMLAttributes, ReactNode } from 'react';
import { useId } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  /** Icon shown inside the field on the left (e.g. mail / lock). */
  icon?: ReactNode;
  /** Element rendered to the right of the label (e.g. "Forgot Password?"). */
  labelAddon?: ReactNode;
  /** Element rendered inside the field on the right (e.g. the eye toggle). */
  rightSlot?: ReactNode;
  error?: string;
}

export function TextInput({
  label,
  icon,
  labelAddon,
  rightSlot,
  error,
  id,
  className = '',
  ...props
}: TextInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <div className="w-full">
      {(label || labelAddon) && (
        <div className="mb-1.5 flex items-center justify-between">
          {label && (
            <label
              htmlFor={inputId}
              className="text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              {label}
            </label>
          )}
          {labelAddon}
        </div>
      )}

      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          className={`block w-full rounded-lg border bg-white py-3 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:outline-none focus:ring-2 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 ${
            icon ? 'pl-10' : 'pl-3.5'
          } ${rightSlot ? 'pr-11' : 'pr-3.5'} ${
            error
              ? 'border-red-400 focus:border-red-500 focus:ring-red-500/30 dark:border-red-500/60'
              : 'border-slate-200 focus:border-brand-500 focus:ring-brand-500/30 dark:border-slate-700'
          } ${className}`}
          {...props}
        />
        {rightSlot && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            {rightSlot}
          </span>
        )}
      </div>

      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}
