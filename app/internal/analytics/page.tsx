'use client';

import { useEffect, useState } from 'react';
import { ANALYTICS_EXCLUSION_KEY } from '../../analytics';

export default function InternalAnalyticsPage() {
  const [excluded, setExcluded] = useState(true);

  useEffect(() => {
    window.localStorage.setItem(ANALYTICS_EXCLUSION_KEY, '1');
  }, []);

  function includeBrowser() {
    window.localStorage.removeItem(ANALYTICS_EXCLUSION_KEY);
    setExcluded(false);
  }

  return (
    <main className="legal-page">
      <article className="legal-content shell">
        <p className="section-kicker">INTERNAL ANALYTICS SETTING</p>
        <h1>{excluded ? 'This browser is excluded.' : 'This browser will be counted.'}</h1>
        <p className="legal-lead">{excluded
          ? 'Visits from this browser will not be sent to Company Native visitor analytics. Open this page once on every team browser you want to exclude.'
          : 'Future visits from this browser will be included in Company Native visitor analytics.'}</p>
        {excluded
          ? <button className="button button-small button-dark" type="button" onClick={includeBrowser}>Count this browser again</button>
          : <a className="button button-small button-dark" href="/internal/analytics">Exclude this browser again</a>}
      </article>
    </main>
  );
}
