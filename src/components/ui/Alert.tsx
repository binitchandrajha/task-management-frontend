import type { ReactNode } from 'react';
import { CheckCircle2, Info, XCircle } from 'lucide-react';
import type { AlertVariant } from '../../types/auth';

const styles: Record<AlertVariant, { wrap: string; icon: ReactNode }> = {
  success: {
    wrap: 'border-green-200 bg-green-50 text-green-800 dark:border-green-500/30 dark:bg-green-500/10 dark:text-green-300',
    icon: <CheckCircle2 className="h-5 w-5 shrink-0" />,
  },
  error: {
    wrap: 'border-red-200 bg-red-50 text-red-800 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300',
    icon: <XCircle className="h-5 w-5 shrink-0" />,
  },
  info: {
    wrap: 'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300',
    icon: <Info className="h-5 w-5 shrink-0" />,
  },
};

interface AlertProps {
  variant?: AlertVariant;
  children: ReactNode;
}

export function Alert({ variant = 'info', children }: AlertProps) {
  const s = styles[variant];
  return (
    <div
      role="alert"
      className={`flex items-start gap-2.5 rounded-lg border px-3.5 py-3 text-sm ${s.wrap}`}
    >
      {s.icon}
      <div>{children}</div>
    </div>
  );
}
