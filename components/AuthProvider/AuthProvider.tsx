'use client';

import { useEffect, useState } from 'react';
import { checkSession, getCurrentUser } from '../../lib/api/clientApi';
import { useAuthStore } from '../../lib/store/authStore';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const { setUser, clearAuth } = useAuthStore();

  useEffect(() => {
    const hydrateAuth = async () => {
      try {
        const session = await checkSession();
        if (session?.email) {
          const user = await getCurrentUser();
          setUser(user);
        } else {
          clearAuth();
        }
      } catch {
        clearAuth();
      } finally {
        setLoading(false);
      }
    };

    hydrateAuth();
  }, [setUser, clearAuth]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}
