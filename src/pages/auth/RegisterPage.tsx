import type { FormEvent } from 'react';
import { useState } from 'react';
import { Link } from 'react-router';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { TextInput } from '../../components/ui/TextInput';
import { PasswordInput } from '../../components/ui/PasswordInput';
import { Checkbox } from '../../components/ui/Checkbox';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { GoogleIcon } from '../../components/ui/GoogleIcon';

export const RegisterPage = () => {
  // Demo-only UI state. Replace with your real registration logic.
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    // TODO: call your create-account API here.
    setTimeout(() => setIsLoading(false), 1200);
  };

  return (
    <AuthLayout
      below={
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-slate-400 dark:text-slate-500">
          <span className="text-[11px] font-semibold uppercase leading-tight tracking-wide">
            Trusted by
            <br />
            teams at
          </span>
          <span className="text-lg font-bold tracking-wide">TECHCO</span>
          <span className="text-lg font-bold tracking-wide">GLOBEX</span>
          <span className="text-lg font-bold tracking-wide">VORTEX</span>
        </div>
      }
    >
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create your workspace</h1>
      <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
        Streamline your team's velocity and focus.
      </p>

      {error && (
        <div className="mt-5">
          <Alert variant="error">{error}</Alert>
        </div>
      )}

      <div className="mt-6">
        <Button variant="social" leftIcon={<GoogleIcon className="h-5 w-5" />}>
          Sign up with Google
        </Button>
      </div>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Or register with email
        </span>
        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <TextInput label="Full Name" name="fullName" autoComplete="name" placeholder="Alex Rivera" />

        <TextInput
          label="Work Email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="alex@company.com"
        />

        <PasswordInput label="Password" name="password" showIcon={false} autoComplete="new-password" />

        <Checkbox
          name="agree"
          label={
            <>
              I agree to the{' '}
              <a href="#" className="font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400">
                Privacy Policy
              </a>
              .
            </>
          }
        />

        <Button type="submit" isLoading={isLoading}>
          Create Account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400"
        >
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
};
