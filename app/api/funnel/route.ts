import { env } from 'cloudflare:workers';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

type Locale = 'en' | 'se';
type FunnelEventName =
  | 'page_view'
  | 'cta_click'
  | 'outbound_click'
  | 'language_change'
  | 'assessment_viewed'
  | 'assessment_started'
  | 'assessment_answered'
  | 'assessment_email_requested'
  | 'assessment_error'
  | 'contact_opened'
  | 'contact_submitted'
  | 'contact_error';

type WorkerBindings = {
  LEADS_DB: D1Database;
  FUNNEL_LIMITER: RateLimit;
};

const eventNames = new Set<FunnelEventName>([
  'page_view',
  'cta_click',
  'outbound_click',
  'language_change',
  'assessment_viewed',
  'assessment_started',
  'assessment_answered',
  'assessment_email_requested',
  'assessment_error',
  'contact_opened',
  'contact_submitted',
  'contact_error',
]);

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const BOT = /bot|crawler|spider|slurp|headless|lighthouse|pagespeed|monitoring/i;

function clean(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function deviceFromUserAgent(userAgent: string) {
  if (/ipad|tablet|kindle/i.test(userAgent)) return 'tablet';
  if (/mobile|iphone|android/i.test(userAgent)) return 'mobile';
  if (userAgent) return 'desktop';
  return 'unknown';
}

function attribution(body: Record<string, unknown>) {
  const raw = body.attribution && typeof body.attribution === 'object'
    ? body.attribution as Record<string, unknown>
    : {};
  const referrerHost = clean(body.referrerHost, 160).replace(/^www\./, '');
  const taggedSource = clean(raw.source, 120);
  const taggedMedium = clean(raw.medium, 120);
  return {
    referrerHost: referrerHost || null,
    source: taggedSource || referrerHost || 'direct',
    medium: taggedMedium || (referrerHost ? 'referral' : 'none'),
    campaign: clean(raw.campaign, 120) || null,
    content: clean(raw.content, 120) || null,
    term: clean(raw.term, 120) || null,
  };
}

export async function POST(request: Request) {
  const userAgent = request.headers.get('user-agent') || '';
  if (BOT.test(userAgent)) return new Response(null, { status: 204 });

  let body: Record<string, unknown>;
  try {
    body = await request.json() as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const eventId = clean(body.eventId, 36);
  const sessionId = clean(body.sessionId, 36);
  const name = clean(body.name, 40) as FunnelEventName;
  const locale: Locale = body.locale === 'se' ? 'se' : 'en';
  const path = clean(body.path, 200);
  const landingPath = clean(body.landingPath, 200);
  const location = clean(body.location, 80) || null;
  const step = typeof body.step === 'number' && Number.isInteger(body.step) && body.step >= 0 && body.step <= 20
    ? body.step
    : null;

  if (!UUID.test(eventId) || !UUID.test(sessionId) || !eventNames.has(name) || !path.startsWith('/') || !landingPath.startsWith('/')) {
    return NextResponse.json({ error: 'Invalid event.' }, { status: 400 });
  }

  try {
    const bindings = env as unknown as WorkerBindings;
    const rateKey = request.headers.get('CF-Connecting-IP')
      || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || sessionId;
    const rateLimit = await bindings.FUNNEL_LIMITER.limit({ key: rateKey });
    if (!rateLimit.success) return new Response(null, { status: 204 });

    const source = attribution(body);
    const cf = (request as Request & { cf?: { country?: string } }).cf;
    await bindings.LEADS_DB.batch([
      bindings.LEADS_DB.prepare(`
        INSERT INTO funnel_sessions (
          id, locale, landing_path, referrer_host, source, medium,
          campaign, content, term, country, device
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET last_seen_at = datetime('now')
      `).bind(
        sessionId,
        locale,
        landingPath,
        source.referrerHost,
        source.source,
        source.medium,
        source.campaign,
        source.content,
        source.term,
        clean(cf?.country, 2) || null,
        deviceFromUserAgent(userAgent),
      ),
      bindings.LEADS_DB.prepare(`
        INSERT OR IGNORE INTO funnel_events (id, session_id, name, path, location, step)
        VALUES (?, ?, ?, ?, ?, ?)
      `).bind(eventId, sessionId, name, path, location, step),
    ]);
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Funnel event failed', error);
    return NextResponse.json({ error: 'Event unavailable.' }, { status: 503 });
  }
}
