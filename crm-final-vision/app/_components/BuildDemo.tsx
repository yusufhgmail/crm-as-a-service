'use client';

import { useEffect, useRef, useState } from 'react';

type DemoPhase = 'closed' | 'source' | 'building' | 'ready';

const buildSteps = [
  ['Finding the people and companies', 'Recognising relationships across approved conversations.'],
  ['Discovering how work moves', 'Following the path from first conversation to delivery and follow-up.'],
  ['Building your CRM structure', 'Creating the records, stages and views this company needs.'],
  ['Filling the history', 'Connecting the fictional contacts, work and next steps.'],
];

export function BuildDemo({ compact = false }: { compact?: boolean }) {
  const [phase, setPhase] = useState<DemoPhase>('closed');
  const [buildStep, setBuildStep] = useState(0);
  const closeButton = useRef<HTMLButtonElement>(null);
  const launchButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (phase === 'closed') return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setPhase('closed');
    }

    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
      launchButton.current?.focus();
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== 'building') return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const delay = reducedMotion ? 120 : 760;

    if (buildStep >= buildSteps.length - 1) {
      const finishTimer = window.setTimeout(() => setPhase('ready'), delay);
      return () => window.clearTimeout(finishTimer);
    }

    const stepTimer = window.setTimeout(() => setBuildStep((current) => current + 1), delay);
    return () => window.clearTimeout(stepTimer);
  }, [phase, buildStep]);

  function beginBuild() {
    setBuildStep(0);
    setPhase('building');
  }

  function closeDemo() {
    setPhase('closed');
    setBuildStep(0);
  }

  return (
    <>
      <button
        ref={launchButton}
        className={compact ? 'build-button compact' : 'build-button'}
        type="button"
        onClick={() => setPhase('source')}
      >
        <span className="build-button-icon" aria-hidden="true"><i /></span>
        <span><strong>Build my CRM</strong><small>Run the sample-data concept</small></span>
        <span className="build-button-arrow" aria-hidden="true">↗</span>
      </button>

      {phase !== 'closed' && (
        <div className="demo-overlay" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeDemo();
        }}>
          <section className="demo-dialog" role="dialog" aria-modal="true" aria-labelledby="demo-title" aria-describedby="demo-note">
            <header className="demo-topbar">
              <div className="demo-brand"><span className="mini-coremark" aria-hidden="true"><i /></span><div><strong>Company Native</strong><small>CRM builder concept</small></div></div>
              <p id="demo-note">Fictional sample data · nothing connects or uploads</p>
              <button ref={closeButton} className="demo-close" type="button" onClick={closeDemo} aria-label="Close concept demo">×</button>
            </header>

            {phase === 'source' && (
              <div className="demo-source">
                <p className="eyebrow">Step 1 of 1</p>
                <h2 id="demo-title">Show Company Native how your team works.</h2>
                <p>In the finished product, you would approve which team accounts and history Company Native may read. This concept uses one fictional company.</p>
                <div className="source-grid">
                  <button type="button" onClick={beginBuild}><span className="source-icon gmail" aria-hidden="true">M</span><span><strong>Use sample Gmail history</strong><small>Fictional email threads from a five-person team</small></span><span aria-hidden="true">→</span></button>
                  <button type="button" onClick={beginBuild}><span className="source-icon microsoft" aria-hidden="true"><i /><i /><i /><i /></span><span><strong>Use sample Microsoft 365 history</strong><small>The same fictional company in Outlook</small></span><span aria-hidden="true">→</span></button>
                </div>
                <p className="demo-boundary"><strong>No blank setup screen.</strong> The CRM is built from the work already present in the sample conversations.</p>
              </div>
            )}

            {phase === 'building' && (
              <div className="demo-building">
                <div className="builder-orbit" aria-hidden="true"><span className="builder-core" /><i /><i /><i /></div>
                <div className="builder-copy">
                  <p className="eyebrow">Building Lumen Field Services</p>
                  <h2 id="demo-title">The company becomes the template.</h2>
                  <div className="build-progress" aria-label={`Build progress: ${buildStep + 1} of ${buildSteps.length} steps`}><span style={{ width: `${((buildStep + 1) / buildSteps.length) * 100}%` }} /></div>
                  <ol className="build-step-list">
                    {buildSteps.map(([title, text], index) => (
                      <li className={index < buildStep ? 'complete' : index === buildStep ? 'active' : ''} key={title}>
                        <span>{index < buildStep ? '✓' : String(index + 1).padStart(2, '0')}</span>
                        <div><strong>{title}</strong><small>{text}</small></div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}

            {phase === 'ready' && (
              <div className="demo-ready">
                <aside className="crm-sidebar">
                  <div className="crm-workspace"><span>LF</span><div><strong>Lumen Field Services</strong><small>Fictional demo</small></div></div>
                  <nav aria-label="Demo CRM sections"><button className="active" type="button">Overview</button><button type="button">Customers <span>28</span></button><button type="button">Opportunities <span>7</span></button><button type="button">Site access <span>4</span></button><button type="button">Delivery</button></nav>
                  <div className="crm-ai-status"><span /><div><strong>Company Native is learning</strong><small>3 ideas ready for review</small></div></div>
                </aside>
                <div className="crm-main">
                  <div className="crm-heading"><div><p className="eyebrow">Your CRM is ready</p><h2 id="demo-title">Good morning, Lumen.</h2><p>Company Native found the customer journey your team already follows and built the CRM around it.</p></div><button type="button" onClick={() => setPhase('source')}>Build again</button></div>
                  <div className="crm-metrics"><article><span>Customers found</span><strong>28</strong><small>Across approved sample history</small></article><article><span>Open work</span><strong>11</strong><small>Sales and delivery connected</small></article><article><span>Needs attention</span><strong>3</strong><small>With the reason explained</small></article></div>
                  <div className="crm-content-grid">
                    <section className="crm-pipeline">
                      <div className="panel-title"><div><span>WORKFLOW DISCOVERED</span><h3>From first enquiry to site delivery</h3></div><small>Built from sample conversations</small></div>
                      <div className="pipeline-columns">
                        {[
                          ['New enquiry', '3', ['Aster House', 'Kite & Co']],
                          ['Site access', '4', ['Northstar Foods', 'Westline']],
                          ['Ready to schedule', '2', ['Morrow Works']],
                        ].map(([stage, count, companies]) => (
                          <div className="pipeline-column" key={stage as string}><div><strong>{stage}</strong><span>{count}</span></div>{(companies as string[]).map((company, index) => <article key={company}><span className={`company-dot dot-${index + 1}`} /> <strong>{company}</strong><small>{index === 0 ? 'Next step found' : 'Conversation current'}</small></article>)}</div>
                        ))}
                      </div>
                    </section>
                    <aside className="crm-insight">
                      <span className="insight-label">WHY THE WORK HAPPENS</span>
                      <h3>A step your old spreadsheet missed.</h3>
                      <p>Your sample team consistently confirms site access before scheduling. Company Native created that stage and connected it to delivery.</p>
                      <div><span>Suggested improvement</span><strong>Ask for access details automatically when an opportunity becomes likely.</strong><button type="button">Review suggestion <span aria-hidden="true">→</span></button></div>
                    </aside>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
}
