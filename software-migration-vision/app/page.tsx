'use client';

import { FormEvent, useState } from 'react';

const Arrow = () => <span aria-hidden="true">↘</span>;

const softwareCategories = [
  {
    id: 'revenue',
    label: 'Revenue',
    number: '01',
    tools: 'CRM · marketing automation · dialler · proposals',
    title: 'One system that turns attention into lasting customer value.',
    after: 'Route demand, guide every sales conversation, launch delivery and learn why customers stay—all inside one customer journey.',
    advantage: 'Turn your best way of winning customers into software competitors cannot buy.',
  },
  {
    id: 'delivery',
    label: 'Delivery',
    number: '02',
    tools: 'Projects · SOPs · time tracking · client portals',
    title: 'Make the best way to deliver the easiest way to work.',
    after: 'Plan the job, coordinate people, surface risk, keep the customer informed and improve the playbook as work happens.',
    advantage: 'Deliver faster and more consistently without flattening the process into a generic template.',
  },
  {
    id: 'service',
    label: 'Service',
    number: '03',
    tools: 'Ticketing · help center · success tools · feedback',
    title: 'One continuous memory of the customer relationship.',
    after: 'Resolve requests, spot risk, trigger proactive help and connect every service insight back to sales, product and delivery.',
    advantage: 'Build retention and referrals into the way your company operates, not into another disconnected tool.',
  },
  {
    id: 'operations',
    label: 'Operations',
    number: '04',
    tools: 'ERP · approvals · procurement · invoicing · forecasts',
    title: 'Connect every commitment to the work and money behind it.',
    after: 'Turn an approved deal into capacity, purchasing, delivery, billing and a live view of what will happen next.',
    advantage: 'Move faster with fewer handoffs, fewer mistakes and far less reconciliation work.',
  },
  {
    id: 'people',
    label: 'People',
    number: '05',
    tools: 'ATS · onboarding · learning · performance systems',
    title: 'Build your talent model into the system itself.',
    after: 'Find the right people, match them to real needs, shorten onboarding and help every person follow your best practices.',
    advantage: 'Make institutional knowledge available in the moment instead of losing it in documents and turnover.',
  },
  {
    id: 'specialized',
    label: 'Specialized work',
    number: '06',
    tools: 'Quoting · underwriting · field work · compliance · planning',
    title: 'Productize the work that makes your company genuinely different.',
    after: 'Encode the expert decisions, checks, exceptions and customer experience that generic software treats as edge cases.',
    advantage: 'Your operating process becomes proprietary—and can keep changing as your strategy changes.',
  },
];

const engineSteps = [
  ['Observe', 'We learn what people really do across software, spreadsheets, messages and workarounds.'],
  ['Understand', 'We recover the reason behind each action, exception, handoff and decision.'],
  ['Design', 'We map today, the safest useful replacement and your company’s full potential.'],
  ['Prove', 'A small group tests working versions while your current system stays live.'],
  ['Build & move', 'We create the system, connect what remains, migrate the data and train the people.'],
  ['Govern', 'Ownership, permissions, auditability, security and human control are built in.'],
  ['Improve', 'We keep finding friction and opportunity, then ship the improvements that matter.'],
];

const migrationStages = [
  {
    stage: 'V0',
    label: 'VALUE FIRST',
    title: 'Improve something before replacing anything.',
    text: 'We add one useful workflow around your current stack. Your team gets immediate value while our system learns how the business really works.',
    state: 'No migration',
  },
  {
    stage: 'V1',
    label: 'SAFE REPLACEMENT',
    title: 'Rebuild everything people truly rely on.',
    text: 'We keep familiar work intact, remove repeated effort and move a small group first. The old system remains available until the new one wins.',
    state: 'One system owned',
  },
  {
    stage: 'V2',
    label: 'BETTER PROCESS',
    title: 'Redesign the work—not only the interface.',
    text: 'We connect teams, automate routine decisions and make your best operating model the default way to work.',
    state: 'One process transformed',
  },
  {
    stage: 'V3',
    label: 'CONNECTED COMPANY',
    title: 'Move the next system into the same foundation.',
    text: 'Identity, data, rules and components already exist. Each successful migration lowers the cost and risk of the next one.',
    state: 'One operating layer',
  },
  {
    stage: 'V∞',
    label: 'CONTINUOUS ADVANTAGE',
    title: 'Evolve without waiting for a vendor.',
    text: 'Your owned system changes with your strategy, preserves what the company learns and makes every future improvement easier.',
    state: 'A proprietary company',
  },
];

const plannerPrompts = [
  'Which part of your software stack creates the most friction today?',
  'What are people forced to do outside that system?',
  'If you could improve one part of the process tomorrow, what would it be?',
  'Where should we send your first migration map? Enter your work email.',
];

type PlannerMessage = { role: 'assistant' | 'user'; text: string };

function MigrationPlanner() {
  const [messages, setMessages] = useState<PlannerMessage[]>([
    { role: 'assistant', text: plannerPrompts[0] },
  ]);
  const [answer, setAnswer] = useState('');
  const [step, setStep] = useState(0);
  const [finished, setFinished] = useState(false);

  function sendAnswer(value: string) {
    const clean = value.trim();
    if (!clean || finished) return;

    const nextStep = step + 1;
    const nextMessages: PlannerMessage[] = [...messages, { role: 'user', text: clean }];

    if (nextStep < plannerPrompts.length) {
      nextMessages.push({ role: 'assistant', text: plannerPrompts[nextStep] });
      setStep(nextStep);
    } else {
      nextMessages.push({
        role: 'assistant',
        text: 'Thank you. We have enough to map the safest first move, what should stay in place and what an owned replacement could unlock.',
      });
      setFinished(true);
    }

    setMessages(nextMessages);
    setAnswer('');
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    sendAnswer(answer);
  }

  return (
    <div className="planner-window">
      <div className="planner-topbar">
        <div className="planner-identity"><span>SM</span><div><strong>Migration planner</strong><small>Usually 4–6 minutes</small></div></div>
        <small className="private-label">Private · No generic sales form</small>
      </div>
      <div className="planner-messages" aria-live="polite">
        {messages.map((message, index) => (
          <div className={`planner-message ${message.role}`} key={`${message.role}-${index}`}>
            {message.role === 'assistant' && <span className="tiny-mark">SM</span>}
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      {step === 0 && messages.length === 1 && (
        <div className="planner-choices" aria-label="Common software categories">
          {['CRM & revenue', 'Delivery & projects', 'Operations & ERP', 'Something else'].map((choice) => (
            <button type="button" key={choice} onClick={() => sendAnswer(choice)}>{choice}</button>
          ))}
        </div>
      )}
      <form className="planner-input" onSubmit={submit}>
        <label className="sr-only" htmlFor="planner-answer">Your answer</label>
        <input
          id="planner-answer"
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          placeholder={finished ? 'Migration map started' : 'Type your answer…'}
          disabled={finished}
        />
        <button type="submit" disabled={finished || !answer.trim()} aria-label="Send answer">↑</button>
      </form>
    </div>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(softwareCategories[0]);

  return (
    <main>
      <nav className="nav shell" aria-label="Main navigation">
        <a className="wordmark" href="#top" aria-label="Software Migration as a Service home">
          <span className="wordmark-mark">SM</span>
          <span>Software Migration<br />as a Service</span>
        </a>
        <div className="nav-links">
          <a href="#categories">What we replace</a>
          <a href="#engine">How it works</a>
          <a href="#ownership">Ownership</a>
          <a className="investor-nav" href="/investors">Investor pitch</a>
        </div>
        <a className="nav-cta" href="#assessment">Plan your migration <span aria-hidden="true">↘</span></a>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Custom software · migration handled end to end</p>
          <h1>Own the software that runs your company. <em>Built for the way you create value.</em></h1>
          <p className="hero-lead">We learn how your business works, design the system you actually need, build it, migrate your data, train your people and keep improving it—one safe system at a time.</p>
          <div className="hero-actions">
            <a className="button button-acid" href="#assessment">Plan your migration <Arrow /></a>
            <a className="text-link" href="#engine">See how we make it safe <span aria-hidden="true">↓</span></a>
          </div>
          <div className="hero-proof"><span>Your code. Your data. Your process.</span><i aria-hidden="true">→</i><span>Yours to keep.</span></div>
        </div>

        <div className="stack-window" aria-label="A generic software stack becoming a company-owned operating system">
          <div className="window-top"><span><i /> Your software transformation</span><b>MANAGED END TO END</b></div>
          <div className="stack-body">
            <div className="stack-column rented">
              <p>Rented stack</p>
              {['CRM', 'ERP', 'Projects', 'Support', 'HR'].map((item, index) => (
                <div className="stack-item" key={item}><span>{item}</span><small>Vendor {String(index + 1).padStart(2, '0')}</small></div>
              ))}
            </div>
            <div className="migration-core">
              <span className="core-ring">SM</span>
              <strong>Observe<br />Understand<br />Migrate</strong>
              <small>ONE SYSTEM AT A TIME</small>
            </div>
            <div className="stack-column owned">
              <p>Owned system</p>
              <div className="owned-panel">
                <span className="owned-kicker">OWNED BY YOU</span>
                <strong>Software built for<br />your company</strong>
                <div className="owned-flow">{['Attract', 'Sell', 'Deliver', 'Support', 'Grow'].map((item) => <span key={item}>{item}</span>)}</div>
              </div>
            </div>
          </div>
          <div className="window-foot"><span>YOURS TO KEEP</span><span>MIGRATE WITHOUT DISRUPTION</span><span>IMPROVES CONTINUOUSLY</span></div>
        </div>
      </section>

      <section className="customer-problem section paper">
        <div className="shell customer-problem-grid">
          <div><p className="section-kicker">YOUR COMPANY IS NOT GENERIC</p><h2>Stop running your best work through <em>someone else&apos;s system.</em></h2></div>
          <div className="customer-problem-copy">
            <p>Your software stack controls how you sell, deliver, decide, hire, support customers and get paid. When those systems do not fit, the company pays in repeated work, missed context and good ideas that never become possible.</p>
            <p>You should not have to choose between software that almost fits and a custom project your team has to manage. We give you the third option: custom software, delivered and operated as a complete service.</p>
          </div>
        </div>
        <div className="shell customer-contrast">
          <article><span>BEFORE</span><h3>A stack of tools</h3><p>Separate vendors hold different pieces of the business. People bridge the gaps by hand.</p></article>
          <i aria-hidden="true">→</i>
          <article><span>AFTER</span><h3>Your company&apos;s system</h3><p>One connected foundation reflects how you want to work and changes when you do.</p></article>
        </div>
      </section>

      <section className="outcome-strip" aria-label="Benefits of company-owned software">
        <div className="shell outcome-grid">
          {[
            ['01', 'Move faster', 'Change the system when the strategy changes.'],
            ['02', 'Make fewer mistakes', 'Build context and checks into every decision.'],
            ['03', 'Remove busywork', 'Connect handoffs and repeated work across tools.'],
            ['04', 'Work your way', 'Make your best operating process the default.'],
          ].map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="category-section section paper" id="categories">
        <div className="shell section-heading split-heading">
          <div><p className="section-kicker">ANY SOFTWARE. THE SAME PROMISE.</p><h2>Replace a tool. <em>Own the capability.</em></h2></div>
          <p>We keep what is valuable, remove what slows people down and turn the work that makes your company different into software you control.</p>
        </div>
        <div className="shell category-explorer">
          <div className="category-tabs" role="tablist" aria-label="Software categories">
            {softwareCategories.map((category) => (
              <button key={category.id} type="button" role="tab" aria-selected={activeCategory.id === category.id} className={activeCategory.id === category.id ? 'active' : ''} onClick={() => setActiveCategory(category)}>
                <span>{category.number}</span>{category.label}
              </button>
            ))}
          </div>
          <div className="category-panel" role="tabpanel" aria-live="polite">
            <div className="category-tool-line"><span>TODAY</span><p>{activeCategory.tools}</p></div>
            <div className="category-main"><span className="category-number">{activeCategory.number}</span><div><p className="mini-label">MIGRATE INTO</p><h3>{activeCategory.title}</h3><p>{activeCategory.after}</p></div></div>
            <div className="advantage-box"><span>WHAT THIS UNLOCKS</span><strong>{activeCategory.advantage}</strong></div>
          </div>
        </div>
      </section>

      <section className="engine-section section" id="engine">
        <div className="shell engine-heading">
          <div><p className="section-kicker light">WE HANDLE THE WHOLE MIGRATION</p><h2>First understand the work. <em>Then build the right system.</em></h2></div>
          <p>AI can write software quickly. A real migration still has to understand people, preserve data, prove the new system and move live operations safely. We take responsibility for all of it.</p>
        </div>
        <div className="shell engine-map" aria-label="The end-to-end software migration system">
          <div className="signals-panel">
            <p className="panel-label">WHAT WE LEARN</p>
            {['Actions & paths', 'Exports & workarounds', 'Rules & exceptions', 'Goals & constraints', 'Human explanations'].map((signal, index) => <div className="signal-row" key={signal}><span>{String(index + 1).padStart(2, '0')}</span><strong>{signal}</strong><i /></div>)}
          </div>
          <div className="engine-core-card">
            <span className="engine-orbit orbit-one" /><span className="engine-orbit orbit-two" />
            <div className="engine-core-inner"><small>YOUR LIVING BLUEPRINT</small><strong>How the company works—and how it could work</strong><p>TODAY · SAFE NEXT MOVE · FULL POTENTIAL</p></div>
          </div>
          <div className="outputs-panel">
            <p className="panel-label">WHAT WE DELIVER</p>
            {['Working prototype', 'Tested replacement', 'Mapped data', 'Trained people', 'Measured improvement'].map((signal, index) => <div className="signal-row output" key={signal}><i /><strong>{signal}</strong><span>{String(index + 1).padStart(2, '0')}</span></div>)}
          </div>
        </div>
        <div className="shell engine-steps">
          {engineSteps.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="path-section section paper" id="path">
        <div className="shell path-heading">
          <p className="section-kicker">A MIGRATION PATH YOUR TEAM CAN TRUST</p>
          <h2>No big-bang rewrite. <em>No leap of faith.</em></h2>
          <p>Your long-term freedom guides every decision, but people change one safe step at a time. You get value before disruption and move only when the replacement is better.</p>
        </div>
        <div className="shell stage-list">
          {migrationStages.map((stage, index) => (
            <article className="stage" key={stage.stage}>
              <div className="stage-rail"><span>{stage.stage}</span>{index < migrationStages.length - 1 && <i />}</div>
              <div className="stage-copy"><small>{stage.label}</small><h3>{stage.title}</h3><p>{stage.text}</p></div>
              <div className="stage-state"><span>{stage.state}</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="ownership-section section" id="ownership">
        <div className="shell ownership-heading">
          <div><p className="section-kicker light">THE RESULT IS YOURS</p><h2>Own the software. <em>Let us own the responsibility.</em></h2></div>
          <p>You should gain freedom without becoming a software company. We operate the system, improve it and keep it secure. You retain control of the code, data and future.</p>
        </div>
        <div className="shell ownership-grid">
          {[
            ['01', 'Code and data', 'The system and its history belong to you. Export them, host them or take them to another team.'],
            ['02', 'Operational continuity', 'We run, monitor, support and update the system so your people can keep running the business.'],
            ['03', 'Security on your terms', 'Use our infrastructure or yours, frontier AI or private models, with permissions and audit trails built in.'],
            ['04', 'Freedom to leave', 'You stay because the service keeps improving the system—not because switching it off would trap you.'],
          ].map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="assessment-section section paper" id="assessment">
        <div className="shell customer-proof-strip">
          <div><strong>10+ years</strong><span>inside CRM and automation</span></div>
          <div><strong>450+ companies</strong><span>served by FunnelBud</span></div>
          <div><strong>End to end</strong><span>design, build, move and improve</span></div>
          <div><strong>Yours to keep</strong><span>code, data and operating freedom</span></div>
        </div>
        <div className="shell assessment-grid">
          <div className="assessment-copy">
            <p className="section-kicker">START WITH THE SAFEST USEFUL MOVE</p>
            <h2>What should your company own first?</h2>
            <p>Tell our migration planner where your current systems get in the way. We will map what should stay, what should change and the first improvement worth proving before any migration.</p>
            <ul><li><span>✓</span> One bounded starting point</li><li><span>✓</span> No big-bang commitment</li><li><span>✓</span> A path from immediate value to full ownership</li></ul>
          </div>
          <MigrationPlanner />
        </div>
      </section>

      <footer>
        <div className="shell footer-top">
          <a className="wordmark" href="#top"><span className="wordmark-mark">SM</span><span>Software Migration<br />as a Service</span></a>
          <p>Own the software that runs your company.</p>
          <div className="footer-links"><a href="#assessment">Plan your migration</a><a href="/investors">Investor pitch</a></div>
        </div>
        <div className="shell footer-bottom"><span>© Software Migration as a Service</span><span>Your code · Your data · Your process</span></div>
      </footer>
    </main>
  );
}
