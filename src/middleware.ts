import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
export default createMiddleware(routing);
 
export const config = {
  matcher: [
    // Match all pathnames except for
    // - /api (API routes)
    // - /_next (Next.js internals)
    // - /auth/verify (Email verification handler)
    // - /icons, /favicon.ico, etc. (static files)
    '/((?!api|_next|auth/verify|icons|favicon.ico).*)',
    '/', 
    '/(en|de)/:path*'
  ]
};