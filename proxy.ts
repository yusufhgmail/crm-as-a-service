import { type NextRequest, NextResponse } from 'next/server';

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

  if (!REDIRECT_HOSTS.has(requestHost)) {
    return NextResponse.next();
  }

  const destination = request.nextUrl.clone();
  destination.protocol = 'https:';
  destination.hostname = CANONICAL_HOST;
  destination.port = '';

  return NextResponse.redirect(destination, 301);
}

export const config = {
  matcher: '/:path*',
};
