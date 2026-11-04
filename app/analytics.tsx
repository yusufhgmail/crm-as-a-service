'use client';

import { useEffect } from 'react';
import { trackFunnelEvent } from './funnel';

export const ANALYTICS_EXCLUSION_KEY = 'crm-from-within-internal-browser';

const CLOUDFLARE_ANALYTICS_TOKEN = 'ddf8ea50c71e42b2b3d6c3f0051e6f90';

// PostHog, EU cloud. Cookieless: memory persistence and no session recording,
// so the privacy page's "no analytics cookies, no persistent visitor identity"
// stays true. It adds what the Cloudflare beacon lacks: the referrer per
// session (to see visits from ChatGPT, Perplexity and Claude) and the landing page.
const POSTHOG_HOST = 'https://eu.i.posthog.com';

declare global {
  interface Window { posthog?: { init: (key: string, options: Record<string, unknown>) => void } }
}

function loadPostHog(key: string) {
  if (document.querySelector('script[data-crm-from-within-posthog]')) return;
  if (navigator.doNotTrack === '1') return;
  const script = document.createElement('script');
  script.src = `${POSTHOG_HOST.replace('//eu.i.', '//eu-assets.i.')}/static/array.js`;
  script.async = true;
  script.setAttribute('data-crm-from-within-posthog', 'true');
  script.onload = () => {
    window.posthog?.init(key, {
      api_host: POSTHOG_HOST,
      persistence: 'memory',
      disable_session_recording: true,
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: false,
    });
  };
  document.body.appendChild(script);
}

export function Analytics({ posthogKey = '' }: { posthogKey?: string }) {
  useEffect(() => {
    if (window.location.pathname.startsWith('/internal/')) return;
    if (window.localStorage.getItem(ANALYTICS_EXCLUSION_KEY) === '1') return;
    if (posthogKey) loadPostHog(posthogKey);
    if (!document.querySelector('script[data-crm-from-within-analytics]')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
      script.setAttribute('data-cf-beacon', JSON.stringify({ token: CLOUDFLARE_ANALYTICS_TOKEN }));
      script.setAttribute('data-crm-from-within-analytics', 'true');
      document.body.appendChild(script);
    }

    void trackFunnelEvent('page_view');

    function trackClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a');
      if (!link) return;

      const location = link.dataset.funnelLocation;
      if (location) {
        const eventName = link.dataset.funnelEvent === 'language_change' ? 'language_change' : 'cta_click';
        if (eventName === 'language_change' && window.location.search) {
          const destination = new URL(link.href);
          const currentParameters = new URLSearchParams(window.location.search);
          for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
            const value = currentParameters.get(key);
            if (value) destination.searchParams.set(key, value);
          }
          link.href = destination.toString();
        }
        void trackFunnelEvent(eventName, { location });
        return;
      }

      try {
        if (link.target === '_blank' && new URL(link.href).hostname !== window.location.hostname) {
          void trackFunnelEvent('outbound_click', { location: new URL(link.href).hostname.replace(/^www\./, '') });
        }
      } catch {
        // Ignore malformed links; navigation should remain unaffected.
      }
    }

    document.addEventListener('click', trackClick);

    const assessment = document.getElementById('assessment-chat');
    let observer: IntersectionObserver | null = null;
    if (assessment) {
      observer = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        void trackFunnelEvent('assessment_viewed');
        observer?.disconnect();
      }, { threshold: 0.45 });
      observer.observe(assessment);
    }

    return () => {
      document.removeEventListener('click', trackClick);
      observer?.disconnect();
    };
  }, [posthogKey]);

  return null;
}
