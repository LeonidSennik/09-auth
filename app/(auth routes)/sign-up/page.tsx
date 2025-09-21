'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '../../../lib/api/clientApi';
import { useAuthStore } from '../../../lib/store/authStore';
import { AxiosError } from 'axios';
import type { User } from '../../../types/user';
import css from './SignUp.module.css';

export default function SignUpPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const user: User = await registerUser(email, password);
      setUser(user);
      router.push('/profile');
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message?: string }>;
      setError(axiosError.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" className={css.input} required />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" className={css.input} required />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
