import { env } from 'cloudflare:workers';

// IndexNow key verification. Set INDEXNOW_KEY as a Worker var or secret;
// scripts/indexnow.mjs points Bing at this URL as keyLocation.
export function GET() {
  const key = (env as { INDEXNOW_KEY?: string }).INDEXNOW_KEY || '';
  if (!key) return new Response('Not found', { status: 404 });
  return new Response(key, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
