'use client';

export type FunnelEventName =
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

type FunnelContext = {
  sessionId: string;
  locale: 'en' | 'se';
  landingPath: string;
  referrerHost: string;
  attribution: {
    source: string;
    medium: string;
    campaign: string;
    content: string;
    term: string;
  };
};

type TrackOptions = {
  location?: string;
  step?: number;
};

let context: FunnelContext | null = null;

function cleanParameter(value: string | null) {
  return (value || '').trim().slice(0, 120);
}

function getReferrerHost() {
  if (!document.referrer) return '';
  try {
    const host = new URL(document.referrer).hostname.replace(/^www\./, '');
    return host === window.location.hostname.replace(/^www\./, '') ? '' : host;
  } catch {
    return '';
  }
}

export function getFunnelContext(): FunnelContext | null {
  if (typeof window === 'undefined') return null;
  if (context) return context;

  const params = new URLSearchParams(window.location.search);
  context = {
    sessionId: crypto.randomUUID(),
    locale: window.location.pathname.startsWith('/se') ? 'se' : 'en',
    landingPath: window.location.pathname,
    referrerHost: getReferrerHost(),
    attribution: {
      source: cleanParameter(params.get('utm_source')),
      medium: cleanParameter(params.get('utm_medium')),
      campaign: cleanParameter(params.get('utm_campaign')),
      content: cleanParameter(params.get('utm_content')),
      term: cleanParameter(params.get('utm_term')),
    },
  };
  return context;
}

export function getFunnelSessionId() {
  return getFunnelContext()?.sessionId || null;
}

export async function trackFunnelEvent(name: FunnelEventName, options: TrackOptions = {}) {
  if (typeof window === 'undefined') return false;
  if (window.location.pathname.startsWith('/internal/')) return false;
  if (window.localStorage.getItem('company-native-internal-browser') === '1') return false;
  if (navigator.doNotTrack === '1') return false;

  const current = getFunnelContext();
  if (!current) return false;

  try {
    const response = await fetch('/api/funnel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventId: crypto.randomUUID(),
        ...current,
        name,
        path: window.location.pathname,
        location: options.location?.slice(0, 80),
        step: options.step,
      }),
      cache: 'no-store',
      keepalive: true,
    });
    return response.ok;
  } catch {
    return false;
  }
}
