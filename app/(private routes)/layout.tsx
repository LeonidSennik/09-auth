import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';


export default async function PrivateLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  const res = await fetch('https://notehub-api.goit.study/auth/session', {
    method: 'GET',
    credentials: 'include',
    headers: { Cookie: `accessToken=${token}` },
  });

  const session = await res.json();

  if (!session?.email) {
    redirect('/sign-in');
  }

  return <>{children}</>;
}
