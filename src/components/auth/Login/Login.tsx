'use client';

import { useRouter } from 'next/navigation';
import { useState, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/hooks/useAuth';
import styles from './Login.module.scss';

interface LoginFormValues {
  email: string;
  password: string;
};

interface Props {
  t: {
    email: string;
    emailRequired: string;
    password: string;
    passwordRequired: string;
    button: string;
    success: string;
    error: string;
    error401: string;
    error500: string;
  }
}

const LoginForm = ({ t }: Props): ReactNode => {
  const router = useRouter();
  const { setUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: 'admin@example.com',
      password: 'admin123',
    },
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = async (values: LoginFormValues): Promise<void> => {
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      setUser(data.user);
      
      if (response.ok) {
        router.push('/about');
      } else {
        throw new Error(response.status.toString());
      }

      window.localStorage.setItem('accessToken', data.token);
      setSuccess(t.success);
    }
    catch (err: unknown) {
      setError(err instanceof Error && err.message === '401' ? t['error401'] : t['error500']);  
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <label htmlFor='email'>
          {t.email}
        </label>
        <input
          id='email'
          type='email'
          placeholder='admin@example.com'
          {...register('email', { required: t.emailRequired })}
        />
        {errors.email?.message && (
          <span className={styles.error}>{errors.email.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor='password'>
          {t.password}
        </label>
        <input
          id='password'
          type='password'
          placeholder='••••••••'
          {...register('password', { required: t.passwordRequired })}
        />
        {errors.password?.message && (
          <span className={styles.error}>{errors.password.message}</span>
        )}
      </div>

      <div className={styles.actions}>
        <button
          className={styles.button}
          type='submit'
          disabled={isSubmitting}
        >
          {t.button}
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
    </form>
  );
};

export default LoginForm;
