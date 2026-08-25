'use client';

import { useEffect } from 'react';

export const ANALYTICS_EXCLUSION_KEY = 'company-native-internal-browser';

const CLOUDFLARE_ANALYTICS_TOKEN = 'ddf8ea50c71e42b2b3d6c3f0051e6f90';

export function Analytics() {
  useEffect(() => {
    if (window.location.pathname.startsWith('/internal/')) return;
    if (window.localStorage.getItem(ANALYTICS_EXCLUSION_KEY) === '1') return;
    if (document.querySelector('script[data-company-native-analytics]')) return;

    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    script.setAttribute('data-cf-beacon', JSON.stringify({ token: CLOUDFLARE_ANALYTICS_TOKEN }));
    script.setAttribute('data-company-native-analytics', 'true');
    document.body.appendChild(script);
  }, []);

  return null;
}
