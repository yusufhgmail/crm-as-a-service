'use client';

import { useEffect } from 'react';
import { trackFunnelEvent } from './funnel';

export const ANALYTICS_EXCLUSION_KEY = 'company-native-internal-browser';

const CLOUDFLARE_ANALYTICS_TOKEN = 'ddf8ea50c71e42b2b3d6c3f0051e6f90';

export function Analytics() {
  useEffect(() => {
    if (window.location.pathname.startsWith('/internal/')) return;
    if (window.localStorage.getItem(ANALYTICS_EXCLUSION_KEY) === '1') return;
    if (!document.querySelector('script[data-company-native-analytics]')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
      script.setAttribute('data-cf-beacon', JSON.stringify({ token: CLOUDFLARE_ANALYTICS_TOKEN }));
      script.setAttribute('data-company-native-analytics', 'true');
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
  }, []);

  return null;
}
