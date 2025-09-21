import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const session = req.cookies.get('session');
  const isProtected = req.nextUrl.pathname.startsWith('/profile');
console.log('session:', session?.value)
  if (isProtected && !session) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: ['/profile/:path*'],
};
