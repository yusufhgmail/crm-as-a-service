import { env } from 'cloudflare:workers';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

type SalesStatus = 'new' | 'contacted' | 'conversation' | 'pilot_proposed' | 'won' | 'lost';

type WorkerBindings = {
  LEADS_DB: D1Database;
  FUNNEL_DASHBOARD_PASSWORD?: string;
};

const salesStatuses = new Set<SalesStatus>(['new', 'contacted', 'conversation', 'pilot_proposed', 'won', 'lost']);

async function digest(value: string) {
  return new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)));
}

async function authorised(request: Request, expected?: string) {
  if (!expected) return false;
  const header = request.headers.get('authorization') || '';
  const supplied = header.startsWith('Bearer ') ? header.slice(7) : '';
  const [actualHash, expectedHash] = await Promise.all([digest(supplied), digest(expected)]);
  let difference = 0;
  for (let index = 0; index < actualHash.length; index += 1) {
    difference |= actualHash[index] ^ expectedHash[index];
  }
  return difference === 0;
}

function noStore<T>(body: T, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { 'Cache-Control': 'private, no-store, max-age=0' },
  });
}

function cutoffFromRequest(request: Request) {
  const value = new URL(request.url).searchParams.get('days');
  const days = value === '7' || value === '90' || value === 'all' ? value : '30';
  if (days === 'all') return { days, cutoff: '1970-01-01 00:00:00' };
  const date = new Date(Date.now() - Number(days) * 86_400_000);
  return { days, cutoff: date.toISOString().slice(0, 19).replace('T', ' ') };
}

export async function GET(request: Request) {
  const bindings = env as unknown as WorkerBindings;
  if (!await authorised(request, bindings.FUNNEL_DASHBOARD_PASSWORD)) {
    return noStore({ error: 'Incorrect dashboard password.' }, 401);
  }

  const { days, cutoff } = cutoffFromRequest(request);
  try {
    const [funnelResult, leadResult, sourcesResult, leadsResult] = await Promise.all([
      bindings.LEADS_DB.prepare(`
        WITH event_flags AS (
          SELECT
            session_id,
            MAX(CASE WHEN name = 'cta_click' THEN 1 ELSE 0 END) AS clicked_cta,
            MAX(CASE WHEN name = 'assessment_viewed' THEN 1 ELSE 0 END) AS viewed_assessment,
            MAX(CASE WHEN name = 'assessment_started' THEN 1 ELSE 0 END) AS started_assessment,
            MAX(CASE WHEN name = 'assessment_email_requested' THEN 1 ELSE 0 END) AS reached_email,
            MAX(CASE WHEN name = 'contact_opened' THEN 1 ELSE 0 END) AS opened_contact,
            MAX(CASE WHEN name = 'assessment_answered' THEN step ELSE 0 END) AS furthest_answer
          FROM funnel_events
          WHERE created_at >= ?
          GROUP BY session_id
        )
        SELECT
          COUNT(DISTINCT sessions.id) AS visits,
          COUNT(DISTINCT CASE WHEN flags.clicked_cta = 1 THEN sessions.id END) AS cta_visits,
          COUNT(DISTINCT CASE WHEN flags.viewed_assessment = 1 THEN sessions.id END) AS assessment_views,
          COUNT(DISTINCT CASE WHEN flags.started_assessment = 1 THEN sessions.id END) AS assessment_starts,
          COUNT(DISTINCT CASE WHEN flags.furthest_answer >= 3 THEN sessions.id END) AS three_answers,
          COUNT(DISTINCT CASE WHEN flags.reached_email = 1 THEN sessions.id END) AS email_reached,
          COUNT(DISTINCT CASE WHEN flags.opened_contact = 1 THEN sessions.id END) AS contact_opens
        FROM funnel_sessions AS sessions
        LEFT JOIN event_flags AS flags ON flags.session_id = sessions.id
        WHERE sessions.first_seen_at >= ?
      `).bind(cutoff, cutoff).first<Record<string, number>>(),
      bindings.LEADS_DB.prepare(`
        WITH lead_rows AS (
          SELECT 'assessment' AS lead_type, qualification, sales_status, created_at FROM assessments
          UNION ALL
          SELECT 'contact' AS lead_type, NULL AS qualification, sales_status, created_at FROM contact_requests
        )
        SELECT
          COUNT(*) AS leads,
          SUM(CASE WHEN lead_type = 'assessment' THEN 1 ELSE 0 END) AS assessment_leads,
          SUM(CASE WHEN lead_type = 'contact' THEN 1 ELSE 0 END) AS contact_leads,
          SUM(CASE WHEN qualification IN ('strong', 'possible') THEN 1 ELSE 0 END) AS qualified,
          SUM(CASE WHEN sales_status IN ('conversation', 'pilot_proposed', 'won') THEN 1 ELSE 0 END) AS conversations,
          SUM(CASE WHEN sales_status IN ('pilot_proposed', 'won') THEN 1 ELSE 0 END) AS proposals,
          SUM(CASE WHEN sales_status = 'won' THEN 1 ELSE 0 END) AS customers,
          SUM(CASE WHEN sales_status = 'lost' THEN 1 ELSE 0 END) AS lost
        FROM lead_rows
        WHERE created_at >= ?
      `).bind(cutoff).first<Record<string, number>>(),
      bindings.LEADS_DB.prepare(`
        WITH event_flags AS (
          SELECT
            session_id,
            MAX(CASE WHEN name = 'assessment_started' THEN 1 ELSE 0 END) AS started
          FROM funnel_events
          WHERE created_at >= ?
          GROUP BY session_id
        ), lead_rows AS (
          SELECT 'assessment:' || id AS lead_key, session_id, qualification, sales_status FROM assessments
          UNION ALL
          SELECT 'contact:' || id AS lead_key, session_id, NULL AS qualification, sales_status FROM contact_requests
        )
        SELECT
          sessions.source,
          sessions.medium,
          sessions.locale,
          COALESCE(sessions.campaign, '') AS campaign,
          COALESCE(sessions.content, '') AS content,
          COUNT(DISTINCT sessions.id) AS visits,
          COUNT(DISTINCT CASE WHEN flags.started = 1 THEN sessions.id END) AS starts,
          COUNT(DISTINCT lead_rows.lead_key) AS leads,
          COUNT(DISTINCT CASE WHEN lead_rows.qualification IN ('strong', 'possible') THEN lead_rows.lead_key END) AS qualified,
          COUNT(DISTINCT CASE WHEN lead_rows.sales_status = 'won' THEN lead_rows.lead_key END) AS customers
        FROM funnel_sessions AS sessions
        LEFT JOIN event_flags AS flags ON flags.session_id = sessions.id
        LEFT JOIN lead_rows ON lead_rows.session_id = sessions.id
        WHERE sessions.first_seen_at >= ?
        GROUP BY sessions.source, sessions.medium, sessions.locale, COALESCE(sessions.campaign, ''), COALESCE(sessions.content, '')
        ORDER BY customers DESC, qualified DESC, leads DESC, visits DESC
        LIMIT 50
      `).bind(cutoff, cutoff).all(),
      bindings.LEADS_DB.prepare(`
        WITH lead_rows AS (
          SELECT
            id, 'assessment' AS lead_type, created_at, email, company, current_crm,
            team_size, primary_pain, qualification, sales_status, outcome_note, session_id
          FROM assessments
          UNION ALL
          SELECT
            id, 'contact' AS lead_type, created_at, email, NULL AS company, NULL AS current_crm,
            NULL AS team_size, message AS primary_pain, 'not_scored' AS qualification,
            sales_status, outcome_note, session_id
          FROM contact_requests
        )
        SELECT
          lead_rows.id,
          lead_rows.lead_type,
          lead_rows.created_at,
          lead_rows.email,
          lead_rows.company,
          lead_rows.current_crm,
          lead_rows.team_size,
          lead_rows.primary_pain,
          lead_rows.qualification,
          lead_rows.sales_status,
          lead_rows.outcome_note,
          sessions.source,
          sessions.medium,
          sessions.campaign
        FROM lead_rows
        LEFT JOIN funnel_sessions AS sessions ON sessions.id = lead_rows.session_id
        WHERE lead_rows.created_at >= ?
        ORDER BY lead_rows.created_at DESC
        LIMIT 50
      `).bind(cutoff).all(),
    ]);

    return noStore({
      days,
      funnel: funnelResult || {},
      leads: leadResult || {},
      sources: sourcesResult.results,
      recentLeads: leadsResult.results,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Funnel dashboard failed', error);
    return noStore({ error: 'The dashboard data could not be loaded.' }, 503);
  }
}

export async function POST(request: Request) {
  const bindings = env as unknown as WorkerBindings;
  if (!await authorised(request, bindings.FUNNEL_DASHBOARD_PASSWORD)) {
    return noStore({ error: 'Incorrect dashboard password.' }, 401);
  }

  let body: { leadId?: unknown; leadType?: unknown; status?: unknown; note?: unknown };
  try {
    body = await request.json();
  } catch {
    return noStore({ error: 'Invalid request.' }, 400);
  }

  const leadId = typeof body.leadId === 'string' ? body.leadId : '';
  const leadType = body.leadType === 'contact' ? 'contact' : body.leadType === 'assessment' ? 'assessment' : '';
  const status = typeof body.status === 'string' ? body.status as SalesStatus : '';
  const note = typeof body.note === 'string' ? body.note.trim().slice(0, 2_000) : '';
  if (!leadId || !leadType || !salesStatuses.has(status as SalesStatus)) {
    return noStore({ error: 'Invalid lead update.' }, 400);
  }

  try {
    const table = leadType === 'contact' ? 'contact_requests' : 'assessments';
    const result = await bindings.LEADS_DB.prepare(`
      UPDATE ${table}
      SET sales_status = ?, outcome_note = ?, status_updated_at = datetime('now')
      WHERE id = ?
    `).bind(status, note || null, leadId).run();
    if (result.meta.changes !== 1) return noStore({ error: 'Lead not found.' }, 404);
    return noStore({ ok: true });
  } catch (error) {
    console.error('Lead status update failed', error);
    return noStore({ error: 'The lead could not be updated.' }, 503);
  }
}
