'use client';

import { useState } from 'react';

const answers = [
  ['Reserve delivery capacity', 'Add a reviewable “reserve capacity” step before an agreement is signed.'],
  ['Start collecting site details', 'Ask for site details when a project becomes likely, without marking it won.'],
  ['Keep the customer moving', 'Create a lightweight pre-agreement handoff so delivery can prepare without taking ownership.'],
] as const;

export function PowerUserMoment() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="power-user-window">
      <div className="power-user-topbar"><div><span className="mini-coremark" aria-hidden="true"><i /></span><strong>Company Native</strong></div><small>Question for Maya · Power user</small></div>
      <div className="power-user-thread" aria-live="polite">
        <div className="ai-message"><span>CN</span><p>I noticed that you moved Northstar into onboarding before the agreement was signed. What were you trying to accomplish?</p></div>
        {selected === null ? (
          <div className="power-user-answers">
            {answers.map(([label], index) => <button type="button" key={label} onClick={() => setSelected(index)}>{label}<span aria-hidden="true">→</span></button>)}
            <button className="dismiss-answer" type="button" onClick={() => setSelected(3)}>Dismiss this question</button>
          </div>
        ) : selected < answers.length ? (
          <>
            <div className="user-message"><p>{answers[selected][0]}</p><span>M</span></div>
            <div className="captured-idea"><span>IMPROVEMENT CAPTURED</span><strong>{answers[selected][1]}</strong><p>Company Native will suggest the change for review. It will not alter the workflow silently.</p><button type="button" onClick={() => setSelected(null)}>Try another answer</button></div>
          </>
        ) : (
          <div className="captured-idea dismissed"><span>QUESTION DISMISSED</span><strong>Maya can keep working.</strong><p>Power users can dismiss, pause or disable proactive questions.</p><button type="button" onClick={() => setSelected(null)}>Reset example</button></div>
        )}
      </div>
    </div>
  );
}
