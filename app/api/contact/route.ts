import { env } from 'cloudflare:workers';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

type Locale = 'en' | 'se';

type WorkerBindings = {
  LEADS_DB: D1Database;
  ASSESSMENT_LIMITER: RateLimit;
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isEmail(value: unknown): value is string {
  if (typeof value !== 'string' || value.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function cleanMessage(value: unknown) {
  if (value === undefined || value === null || value === '') return '';
  if (typeof value !== 'string' || value.length > 1_200) return null;
  return value.trim();
}

export async function POST(request: Request) {
  let body: { locale?: unknown; email?: unknown; message?: unknown; sessionId?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const locale: Locale = body.locale === 'se' ? 'se' : 'en';
  const message = cleanMessage(body.message);
  const sessionId = typeof body.sessionId === 'string' && UUID.test(body.sessionId) ? body.sessionId : null;
  if (!isEmail(body.email) || message === null) {
    return NextResponse.json({
      error: locale === 'se' ? 'Ange en giltig jobbmejl.' : 'Please enter a valid work email.',
    }, { status: 400 });
  }

  try {
    const bindings = env as unknown as WorkerBindings;
    const rateKey = request.headers.get('CF-Connecting-IP')
      || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || 'local-development';
    const rateLimit = await bindings.ASSESSMENT_LIMITER.limit({ key: `contact:${rateKey}` });
    if (!rateLimit.success) {
      return NextResponse.json({
        error: locale === 'se'
          ? 'För många försök på kort tid. Vänta en minut och försök igen.'
          : 'Too many attempts in a short time. Wait a minute and try again.',
      }, { status: 429 });
    }

    await bindings.LEADS_DB.prepare(`
      INSERT INTO contact_requests (id, locale, email, message, session_id)
      VALUES (?, ?, ?, ?, ?)
    `).bind(
      crypto.randomUUID(),
      locale,
      body.email.trim().toLowerCase(),
      message || null,
      sessionId,
    ).run();

    return NextResponse.json({ ok: true }, {
      status: 201,
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    console.error('Contact request failed', error);
    return NextResponse.json({
      error: locale === 'se'
        ? 'Ditt meddelande kunde inte sparas just nu. Försök igen om en stund.'
        : 'Your message could not be saved just now. Please try again shortly.',
    }, { status: 503 });
  }
}
