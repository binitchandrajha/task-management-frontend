import type { FormEvent } from 'react';
import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, KeyRound, Mail, MailCheck } from 'lucide-react';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { TextInput } from '../../components/ui/TextInput';
import { Button } from '../../components/ui/Button';

export const ForgotPasswordPage = () => {
  // Demo-only UI state. Replace with your real password-reset logic.
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: call your send-reset-link API here.
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <AuthLayout>
      {submitted ? (
        // Success response view
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-600 dark:bg-green-500/15 dark:text-green-400">
            <MailCheck className="h-7 w-7" />
          </div>
          <h1 className="mt-5 text-2xl font-bold text-slate-900 dark:text-white">
            Check your inbox
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            We sent a password reset link to{' '}
            <span className="font-medium text-slate-700 dark:text-slate-200">
              {email || 'your email'}
            </span>
            .
          </p>
          <div className="mt-6">
            <Button
              variant="ghost"
              leftIcon={<ArrowLeft className="h-4 w-4" />}
              onClick={() => setSubmitted(false)}
            >
              Back to Login
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
            <KeyRound className="h-7 w-7" />
          </div>
          <h1 className="mt-5 text-center text-2xl font-bold text-slate-900 dark:text-white">
            Reset your password
          </h1>
          <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
            Enter the email address associated with your account and we'll send you a recovery link.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <TextInput
              label="Email Address"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="name@company.com"
              icon={<Mail className="h-5 w-5" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button type="submit" isLoading={isLoading}>
              Send reset link
            </Button>
          </form>

          <div className="my-6 border-t border-slate-200 dark:border-slate-800" />

          <div className="text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Login
            </Link>
          </div>
        </>
      )}
    </AuthLayout>
  );
};
