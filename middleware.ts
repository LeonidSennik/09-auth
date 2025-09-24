import { NextRequest, NextResponse } from 'next/server';
import { checkSession, refreshSession } from './lib/api/serverApi';

export async function middleware(request: NextRequest) {
  const cookieStore = request.cookies;
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isAuthPage =
    request.nextUrl.pathname.startsWith('/sign-in') ||
    request.nextUrl.pathname.startsWith('/sign-up');

  const isPrivatePage =
    request.nextUrl.pathname.startsWith('/profile') ||
    request.nextUrl.pathname.startsWith('/notes');

  let session = null;

  
  if (accessToken) {
    const res = await checkSession(accessToken);
    session = res?.data ?? null;
  }

  
  if (!session && refreshToken) {
    const refreshed = await refreshSession(refreshToken);

    if (refreshed?.data?.user && refreshed.data.accessToken) {
      session = refreshed.data.user;

      const response = NextResponse.next();

      response.cookies.set('accessToken', refreshed.data.accessToken, {
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });

      
      if (
        typeof refreshed.data === 'object' &&
        'refreshToken' in refreshed.data &&
        typeof refreshed.data.refreshToken === 'string'
      ) {
        response.cookies.set('refreshToken', refreshed.data.refreshToken, {
          httpOnly: true,
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        });
      }

      return response;
    }
  }

  
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  
  if (!session && isPrivatePage) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/sign-in', '/sign-up', '/profile/:path*', '/notes/:path*'],
};
