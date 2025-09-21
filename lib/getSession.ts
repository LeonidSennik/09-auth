import { cookies } from 'next/headers';

const BASE_URL = 'https://notehub-api.goit.study';

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  const res = await fetch(`${BASE_URL}/auth/session`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Cookie: `accessToken=${token}`,
    },
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data?.email ? data : null;
}