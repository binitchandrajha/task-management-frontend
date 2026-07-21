import type { FormEvent } from 'react';
import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, CloudUpload, Mail, ShieldCheck } from 'lucide-react';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { TextInput } from '../../components/ui/TextInput';
import { PasswordInput } from '../../components/ui/PasswordInput';
import { Checkbox } from '../../components/ui/Checkbox';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { GoogleIcon } from '../../components/ui/GoogleIcon';

export const LoginPage = () => {
  // Demo-only UI state. Replace with your real auth logic.
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    // TODO: call your sign-in API here.
    setTimeout(() => setIsLoading(false), 1200);
  };

  return (
    <AuthLayout
      showLogoIcon
      below={
        <div className="flex items-center justify-center gap-6 text-xs text-slate-400 dark:text-slate-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4" /> Enterprise Security
          </span>
          <span className="flex items-center gap-1.5">
            <CloudUpload className="h-4 w-4" /> Uptime 99.9%
          </span>
        </div>
      }
    >
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome back</h1>
      <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
        Manage your tasks with controlled momentum.
      </p>

      {error && (
        <div className="mt-5">
          <Alert variant="error">{error}</Alert>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <TextInput
          label="Work Email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="name@company.com"
          icon={<Mail className="h-5 w-5" />}
        />

        <PasswordInput
          label="Password"
          name="password"
          autoComplete="current-password"
          labelAddon={
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
            >
              Forgot Password?
            </Link>
          }
        />

        <Checkbox name="remember" label="Remember me for 30 days" />

        <Button type="submit" isLoading={isLoading} rightIcon={<ArrowRight className="h-4 w-4" />}>
          Sign In
        </Button>
      </form>

      <div className="my-6 border-t border-slate-200 dark:border-slate-800" />

      <Button variant="social" leftIcon={<GoogleIcon className="h-5 w-5" />}>
        Continue with Google
      </Button>

      <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        Don't have an account?{' '}
        <Link
          to="/register"
          className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400"
        >
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
};
