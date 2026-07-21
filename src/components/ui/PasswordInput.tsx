import type { ComponentProps } from 'react';
import { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { TextInput } from './TextInput';

type PasswordInputProps = Omit<
  ComponentProps<typeof TextInput>,
  'icon' | 'rightSlot' | 'type'
> & {
  /** Show the lock icon on the left (Login) or not (Register). */
  showIcon?: boolean;
};

export function PasswordInput({ showIcon = true, ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <TextInput
      type={visible ? 'text' : 'password'}
      icon={showIcon ? <Lock className="h-5 w-5" /> : undefined}
      rightSlot={
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          className="text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-200"
        >
          {visible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      }
      {...props}
    />
  );
}
