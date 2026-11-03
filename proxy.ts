import { type NextRequest, NextResponse } from 'next/server';
import { LOCALE_HEADER } from './app/seo';

const CANONICAL_HOST = 'crmfromwithin.com';
const REDIRECT_HOSTS = new Set([
  'www.crmfromwithin.com',
  'crmfromwithin.ai',
  'www.crmfromwithin.ai',
]);

export function proxy(request: NextRequest) {
  const requestHost = (request.headers.get('host') ?? request.nextUrl.hostname)
    .split(':', 1)[0]
    .toLowerCase();

  if (REDIRECT_HOSTS.has(requestHost)) {
    const destination = request.nextUrl.clone();
    destination.protocol = 'https:';
    destination.hostname = CANONICAL_HOST;
    destination.port = '';
    return NextResponse.redirect(destination, 301);
  }

  // `/` is not a page of its own: send it, with any campaign tags, to the
  // English home so the site has one URL per page.
  if (request.nextUrl.pathname === '/') {
    const destination = request.nextUrl.clone();
    destination.pathname = '/en';
    return NextResponse.redirect(destination, 301);
  }

  const headers = new Headers(request.headers);
  const swedish = request.nextUrl.pathname === '/se' || request.nextUrl.pathname.startsWith('/se/');
  headers.set(LOCALE_HEADER, swedish ? 'se' : 'en');
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: '/:path*',
};
