'use client';

import { FormEvent, useState } from 'react';

const Arrow = () => <span aria-hidden="true">→</span>;

const useCases = [
  {
    number: '01',
    type: 'SERVICE & DELIVERY',
    title: 'Run delivery your way',
    text: 'Connect the sale to onboarding, delivery, billing and follow-up. Everyone sees what should happen next—without another spreadsheet.',
    tags: ['Handoffs', 'Delivery', 'Billing'],
  },
  {
    number: '02',
    type: 'RECRUITMENT',
    title: 'Match candidates to real opportunities',
    text: 'Track candidates and recruitment projects in one place. Let the system surface the strongest matches and keep every conversation moving.',
    tags: ['Candidates', 'Matching', 'Projects'],
  },
  {
    number: '03',
    type: 'CONSTRUCTION',
    title: 'Turn opportunities into projects',
    text: 'Track bids, documents, contractors and milestones. Prepare quotes automatically and carry the full history into delivery.',
    tags: ['Bids', 'Projects', 'Documents'],
  },
  {
    number: '04',
    type: 'INBOUND SALES',
    title: 'Never lose a good lead',
    text: 'Capture, enrich and distribute every lead. Give salespeople a calling queue, record the outcome and update the forecast automatically.',
    tags: ['Lead routing', 'Dialler', 'Forecasting'],
  },
];

const systemSteps = [
  ['Observe', 'Our software learns which parts of your current CRM people use, where work slows down and what happens outside the system.'],
  ['Ask', 'Approved power users can explain an action in the moment, so we learn why the work happens—not only where they clicked.'],
  ['Design', 'We turn real usage into requirements and working mockups for the safe first move, the better system and the long-term vision.'],
  ['Refine', 'Your leadership and users shape the mockups with our CRM specialists before development begins.'],
  ['Build & move', 'Our engineers build, integrate, import the data, train your team and move people across only when the new system is better.'],
  ['Keep improving', 'The system keeps spotting bugs, repeated work and improvement opportunities, then brings the useful ones to you.'],
];

const phases = [
  {
    version: 'V0',
    title: 'Value now. No migration.',
    text: 'We add one small, useful improvement to your existing setup. Your team gets an immediate benefit while our system learns how the work really happens.',
    highlight: 'If your team does not use it, you get your money back.',
  },
  {
    version: 'V1',
    title: 'Everything you rely on. Less work.',
    text: 'We recreate what already works, remove manual steps and keep the interface familiar. One or two people prove it first. Nobody moves until it is at least as good as today.',
    highlight: 'Migrate to something proven—not to hope.',
  },
  {
    version: 'V2',
    title: 'A better way to run the business.',
    text: 'Now we redesign the work itself. Sales, marketing, delivery and service become one streamlined customer journey, with more automated behind the scenes.',
    highlight: 'Change the process after the safe foundation works.',
  },
  {
    version: 'NORTH STAR',
    title: 'The company you want to become.',
    text: 'Your CRM grows into the customer-facing operating system of the business—shaped by your strategy, brand and values, and updated as your ambition changes.',
    highlight: 'Every improvement points in the same direction.',
  },
];

const prompts = [
  'Which CRM are you using or considering today?',
  'What is the biggest thing your current setup makes harder than it should be?',
  'Roughly how many people use or depend on the CRM?',
  'What work would you most like the system to remove from your team?',
  'Where should we send your initial assessment? Please enter your work email.',
];

type Message = { role: 'assistant' | 'user'; text: string };

function Assessment() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: prompts[0] },
  ]);
  const [answer, setAnswer] = useState('');
  const [step, setStep] = useState(0);
  const [finished, setFinished] = useState(false);

  function sendAnswer(value: string) {
    const clean = value.trim();
    if (!clean || finished) return;

    const nextStep = step + 1;
    const nextMessages: Message[] = [...messages, { role: 'user', text: clean }];

    if (nextStep < prompts.length) {
      nextMessages.push({ role: 'assistant', text: prompts[nextStep] });
      setStep(nextStep);
    } else {
      nextMessages.push({
        role: 'assistant',
        text: 'Thank you. We have enough to prepare a useful first view of where your CRM may be holding the business back. We will be in touch.',
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
    <div className="assessment-window">
      <div className="assessment-topbar">
        <div className="assistant-identity">
          <span className="assistant-orb">AI</span>
          <div><strong>CRM assessment</strong><small>Usually 4–6 minutes</small></div>
        </div>
        <span className="private-label">Private conversation</span>
      </div>
      <div className="messages" aria-live="polite">
        {messages.map((message, index) => (
          <div className={`message ${message.role}`} key={`${message.role}-${index}`}>
            {message.role === 'assistant' && <span className="tiny-orb">AI</span>}
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      {step === 0 && messages.length === 1 && (
        <div className="quick-answers" aria-label="Common CRM choices">
          {['HubSpot', 'Salesforce', 'Pipedrive', 'Something else'].map((choice) => (
            <button key={choice} type="button" onClick={() => sendAnswer(choice)}>{choice}</button>
          ))}
        </div>
      )}
      <form className="chat-input" onSubmit={submit}>
        <label className="sr-only" htmlFor="assessment-answer">Your answer</label>
        <input
          id="assessment-answer"
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          placeholder={finished ? 'Assessment complete' : 'Type your answer…'}
          disabled={finished}
        />
        <button type="submit" disabled={finished || !answer.trim()} aria-label="Send answer">↑</button>
      </form>
      <p className="assessment-note">The assessment adapts its questions to your answers. No generic form or sales script.</p>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <nav className="nav shell" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="CRM That Fits home">
          <span className="brand-mark" aria-hidden="true">CF</span>
          <span>CRM That Fits</span>
        </a>
        <div className="nav-links">
          <a href="#process">How it works</a>
          <a href="#possibilities">What you can build</a>
          <a href="#story">Why us</a>
        </div>
        <a className="button button-small button-dark" href="#assessment">Start assessment <Arrow /></a>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Custom CRM, handled end to end</p>
          <h1>Your CRM should fit your business. <em>Not the other way around.</em></h1>
          <p className="hero-lead">We learn how your company really works, design the CRM you actually need, build it, migrate your data and keep improving it—without disrupting your team.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#assessment">Start your CRM assessment <Arrow /></a>
            <a className="text-link" href="#process">See how we make migration safe <Arrow /></a>
          </div>
          <div className="proof-line">
            <span className="proof-avatars" aria-hidden="true"><i>YY</i><i>10+</i></span>
            <p><strong>A decade inside CRM.</strong><br />Built by the founder of FunnelBud.</p>
          </div>
        </div>

        <div className="journey-card" aria-label="The path from your current CRM to your ideal CRM">
          <div className="journey-head"><div><span className="status-dot" /> Your CRM transformation</div><span className="live-label">CONTINUOUS</span></div>
          <div className="journey-body">
            <p className="journey-label">A safe path forward</p>
            <div className="journey-step active"><span className="step-number">01</span><div><strong>Value before migration</strong><small>One useful pilot. No disruption.</small></div><span className="step-state">START</span></div>
            <div className="journey-line" />
            <div className="journey-step"><span className="step-number">02</span><div><strong>Everything you rely on</strong><small>Your current CRM, only easier.</small></div><span className="step-check">✓</span></div>
            <div className="journey-line" />
            <div className="journey-step"><span className="step-number">03</span><div><strong>A better way to work</strong><small>Remove work. Automate the rest.</small></div><span className="step-check">✓</span></div>
            <div className="journey-line accent" />
            <div className="journey-step north-star"><span className="step-number">∞</span><div><strong>Your full potential</strong><small>A system as unique as your company.</small></div><span className="spark" aria-hidden="true">✦</span></div>
          </div>
          <div className="journey-footer"><span>Built around your people</span><span>Owned by you</span><span>Improves continuously</span></div>
        </div>
      </section>

      <section className="credentials-strip" aria-label="FunnelBud experience">
        <div className="shell credential-grid">
          <div><strong>10+ years</strong><span>building CRM and automation</span></div>
          <div><strong>450+ companies</strong><span>served by FunnelBud</span></div>
          <div><strong>Built for SMEs</strong><span>not stripped-down enterprise</span></div>
          <div><strong>End to end</strong><span>design, build, move and improve</span></div>
        </div>
      </section>

      <section className="crm-heart section shell">
        <div className="section-kicker">THE SYSTEM BEHIND THE CUSTOMER EXPERIENCE</div>
        <div className="heart-grid">
          <h2>Your CRM is not a database. It is how your company <em>meets the world.</em></h2>
          <div className="heart-copy">
            <p>It controls how you find customers, respond to them, win their trust, deliver what you promised, keep them happy and earn the next referral.</p>
            <p>Generic software forces your company into somebody else&apos;s process. A CRM built around you makes your best way of working easier, faster and consistent.</p>
          </div>
        </div>
        <div className="customer-flow" aria-label="The customer journey controlled by your CRM">
          {['Attract', 'Qualify', 'Sell', 'Deliver', 'Support', 'Grow'].map((item, index) => (
            <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong>{index < 5 && <i aria-hidden="true">→</i>}</div>
          ))}
        </div>
      </section>

      <section className="possibilities section" id="possibilities">
        <div className="shell">
          <div className="section-heading split-heading">
            <div><p className="section-kicker">BUILT AROUND THE WORK THAT MAKES YOU DIFFERENT</p><h2>Stop asking, “Can our CRM do that?”</h2></div>
            <p>Your most important processes should become your advantage—not a collection of compromises, workarounds and tabs.</p>
          </div>
          <div className="use-case-grid">
            {useCases.map((useCase) => (
              <article className="use-case" key={useCase.number}>
                <div className="case-top"><span>{useCase.number}</span><small>{useCase.type}</small></div>
                <h3>{useCase.title}</h3>
                <p>{useCase.text}</p>
                <div className="case-tags">{useCase.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </article>
            ))}
          </div>
          <p className="possibility-foot">And one connected place for calling, queues, email, forecasting, outreach, replies, customer risk, management reporting and the other work your team currently holds together by hand.</p>
        </div>
      </section>

      <section className="process section shell" id="process">
        <div className="section-heading centered-heading">
          <p className="section-kicker">MOVE WITHOUT THE BIG-BANG MIGRATION</p>
          <h2>Get value first. Move only when it is better.</h2>
          <p>We keep today working while we build tomorrow. The long-term vision guides every decision, but your team changes one safe step at a time.</p>
        </div>
        <div className="phase-list">
          {phases.map((phase, index) => (
            <article className="phase" key={phase.version}>
              <div className="phase-rail"><span>{phase.version}</span>{index < phases.length - 1 && <i />}</div>
              <div className="phase-content"><h3>{phase.title}</h3><p>{phase.text}</p><strong>{phase.highlight}</strong></div>
            </article>
          ))}
        </div>
      </section>

      <section className="system-section section">
        <div className="shell">
          <div className="system-intro">
            <div><p className="section-kicker light">HOW OUR SYSTEM WORKS</p><h2>It learns what to build before we build it.</h2></div>
            <p>AI can make software quickly. The hard part is understanding what your people need, what the business could become and how to get there safely. That is what our system is built to do.</p>
          </div>
          <div className="system-grid">
            {systemSteps.map(([title, text], index) => (
              <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
          <div className="system-summary">
            <strong>Think Lovable for CRM—then add everything a real migration needs.</strong>
            <p>We handle the understanding, design, development, integrations, data, training, rollout and continuous improvement. You keep running the business.</p>
          </div>
        </div>
      </section>

      <section className="answers section shell">
        <div className="section-heading centered-heading narrow">
          <p className="section-kicker">THE QUESTIONS THAT SHOULD BE ASKED</p>
          <h2>A custom CRM should remove risk—not move it onto you.</h2>
        </div>
        <div className="answer-grid">
          <article><span>TIME</span><h3>“We do not have time for this.”</h3><p>You do not run the project. We observe, specify, build, migrate and train. Your people contribute where their knowledge matters, not as an unpaid software team.</p></article>
          <article><span>MIGRATION</span><h3>“What if the new system is worse?”</h3><p>One or two users test the new system alongside the old one. Everyone moves only after the important work is at least as good—and usually easier.</p></article>
          <article><span>OWNERSHIP</span><h3>“Will we be locked in?”</h3><p>No. The software is yours forever. If you leave, we stop supporting and improving it. You can run it yourself or take it to any vendor.</p></article>
          <article><span>SECURITY</span><h3>“Where does our sensitive data go?”</h3><p>You can use our hosting or yours, frontier AI or open models. For sensitive enterprise work, the entire system and custom AI can run on your premises.</p></article>
        </div>
      </section>

      <section className="story section" id="story">
        <div className="shell story-grid">
          <div className="story-photo"><img src="/yusuf-young.jpg" alt="Yusuf Young, founder of CRM That Fits and FunnelBud" /><span>YUSUF YOUNG · FOUNDER</span></div>
          <div className="story-copy">
            <p className="section-kicker">WHY WE ARE BUILDING THIS</p>
            <h2>We spent a decade watching companies bend around CRM software.</h2>
            <p>Yusuf Young founded FunnelBud in 2015. The company helped more than 450 Swedish businesses with CRM, sales and marketing automation before he exited it.</p>
            <p>That work exposed the same problem again and again: every CRM is generic by necessity. Customers pay for workarounds, abandon useful ideas and change good processes to fit the software.</p>
            <blockquote>“Now that AI has changed the cost of building software, there is no reason your business should keep adapting to a generic CRM. The CRM can finally adapt to you.”</blockquote>
            <a href="https://www.funnelbud.com/om-oss/" target="_blank" rel="noreferrer" className="text-link">See the FunnelBud story <Arrow /></a>
          </div>
        </div>
      </section>

      <section className="vision section">
        <div className="shell vision-grid">
          <div className="vision-number">2030<span>AND<br />BEYOND</span></div>
          <div className="vision-copy">
            <p className="section-kicker light">THE LARGER VISION</p>
            <h2>In the future, companies will not buy the same software.</h2>
            <p>Every company will have systems built around how it wants to compete, serve customers and grow. Your processes will no longer be limited by the software somebody else designed for an average business.</p>
            <p>CRM is where this future starts because it touches the heart of the company: every relationship with every customer. Your CRM should become an extension of your strategy, brand and values—not just a place where salespeople type notes.</p>
            <div className="vision-outcomes"><span>More speed</span><span>Fewer mistakes</span><span>Less manual work</span><span>A real competitive advantage</span></div>
          </div>
        </div>
      </section>

      <section className="assessment-section section" id="assessment">
        <div className="shell assessment-grid">
          <div className="assessment-copy">
            <p className="section-kicker">YOUR FIRST STEP</p>
            <h2>What would a CRM built around your company change?</h2>
            <p>Talk with our assessment assistant. It asks about your current system, where work gets stuck and which improvement could give your team value without a migration.</p>
            <ul>
              <li><span>✓</span> A conversation, not a generic lead form</li>
              <li><span>✓</span> About five minutes</li>
              <li><span>✓</span> An initial view of your strongest opportunity</li>
            </ul>
            <div className="commercial-promise"><strong>Start without increasing your CRM cost.</strong><p>If your team does not use the first pilot, you get your money back. If it works, the starting service costs what your current CRM costs today.</p></div>
          </div>
          <Assessment />
        </div>
      </section>

      <footer>
        <div className="shell footer-top"><a className="brand" href="#top"><span className="brand-mark">CF</span><span>CRM That Fits</span></a><p>Your business, without software limits.</p><a href="#assessment" className="button button-small button-primary">Start assessment <Arrow /></a></div>
        <div className="shell footer-bottom"><span>© 2026 CRM That Fits · A Yusuf Young AB company</span><span>English · Svenska coming next</span></div>
      </footer>
    </main>
  );
}
