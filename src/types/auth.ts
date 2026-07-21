export type AlertVariant = 'success' | 'error' | 'info';

export interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

export interface RegisterFormValues {
  fullName: string;
  email: string;
  password: string;
  agree: boolean;
}

export interface ForgotPasswordFormValues {
  email: string;
}
