'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from '../../lib/api/clientApi';
import { useAuthStore } from '../../lib/store/authStore';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { setUser, clearAuth } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getSession();
        if (user?.email) {
          setUser(user);
        } else {
          clearAuth();
          router.push('/sign-in');
        }
      } catch {
        clearAuth();
        router.push('/sign-in');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [setUser, clearAuth, router]); 

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}