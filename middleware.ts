// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const isAuthPage = request.nextUrl.pathname.startsWith('/sign-in') || request.nextUrl.pathname.startsWith('/sign-up');
  const isPrivatePage = request.nextUrl.pathname.startsWith('/profile') || request.nextUrl.pathname.startsWith('/notes');


  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  
  if (!token && isPrivatePage) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/sign-in', '/sign-up', '/profile/:path*', '/notes/:path*'],
};
