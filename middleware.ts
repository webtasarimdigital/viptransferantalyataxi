import createMiddleware from 'next-intl/middleware';
import {routing} from './src/i18n/routing';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Skip i18n middleware for admin and api routes
  if (
    request.nextUrl.pathname.startsWith('/admin') ||
    request.nextUrl.pathname.startsWith('/api')
  ) {
    return;
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/',
    '/(tr|en|de|ru)/:path*',
    '/((?!_next|_vercel|admin|api|.*\\..*).*)'
  ]
};
