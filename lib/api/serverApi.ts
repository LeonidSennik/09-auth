import type { User } from '../../types/user';

export const getSession = async (cookieHeader: string): Promise<User | null> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/session`, {
    method: 'GET',
    headers: {
      Cookie: cookieHeader,
    },
    credentials: 'include',
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data || null;
};
