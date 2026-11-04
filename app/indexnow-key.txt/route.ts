// IndexNow key verification. Set INDEXNOW_KEY as a Worker var or secret;
// scripts/indexnow.mjs points Bing at this URL as keyLocation. Worker vars
// reach process.env through nodejs_compat.
export function GET() {
  const key = process.env.INDEXNOW_KEY || '';
  if (!key) return new Response('Not found', { status: 404 });
  return new Response(key, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
