import { cookies } from 'next/headers';
import { getSession } from '../../../lib/getSession';
import { redirect } from 'next/navigation';

export default async function PrivateLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  const session = await getSession(token);

  if (!session?.email) {
    redirect('/sign-in');
  }

  return <>{children}</>; 
}
