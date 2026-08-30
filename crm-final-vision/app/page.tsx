import Image from 'next/image';
import Link from 'next/link';
import { BuildDemo } from './_components/BuildDemo';
import { PowerUserMoment } from './_components/PowerUserMoment';

const benefits = [
  ['Starts populated', 'Customers, conversations and open work arrive organised.'],
  ['No template to choose', 'The structure comes from how your company already works.'],
  ['Understands why', 'Selected employees can explain the goal behind an action.'],
  ['Captures improvements', 'Friction and ideas become reviewable feature suggestions.'],
  ['Keeps adapting', 'The CRM changes as your team and customer journey change.'],
  ['Yours to keep', 'Your company owns the CRM, its code and its data.'],
];

const buildPath = [
  ['01', 'Connect approved team email', 'Choose which Gmail or Microsoft 365 accounts and history Company Native may read.'],
  ['02', 'Let the work reveal the structure', 'Company Native finds customers, relationships, stages, handoffs and the work people do outside a normal pipeline.'],
  ['03', 'Receive a CRM that is already useful', 'The system creates the records, views and workflows, then fills them with the customer history it found.'],
  ['04', 'Improve it through real use', 'It notices friction, asks selected employees why, and turns the answers into changes the company can review.'],
];

const comparisonRows = [
  ['Where the structure comes from', 'A standard template you configure', 'A shared product that fills itself', 'Your company’s work and stated goals'],
  ['What the team must do first', 'Import, configure and learn the system', 'Connect accounts and adjust the product', 'Approve access; the CRM is built and populated'],
  ['How far it can change', 'Fields, views and available add-ons', 'What the shared platform supports', 'The software itself can be rebuilt around the company'],
  ['Who owns the software', 'The CRM vendor', 'The CRM vendor', 'Your company'],
];

function Header() {
  return (
    <header className="site-header shell">
      <a className="brand" href="#top" aria-label="Company Native final vision home">
        <Image src="/company-native-mark.svg" width={38} height={38} alt="" priority />
        <span>Company Native</span>
      </a>
      <nav aria-label="Main navigation">
        <a href="#builds">How it builds</a>
        <a href="#learns">How it learns</a>
        <a href="#ownership">Your control</a>
        <Link href="/investors">Investor vision</Link>
      </nav>
      <a className="header-action" href="#concept">See the concept <span aria-hidden="true">↓</span></a>
    </header>
  );
}

export default function Home() {
  return (
    <main>
      <Header />

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="status-pill"><span /> Final product vision · In development</p>
          <h1>Your company already contains the CRM it needs.</h1>
          <p className="hero-lede">If your small company does not have a CRM, connect your team’s email. Company Native discovers how your customer relationships work, then builds and fills one around them.</p>
          <div className="hero-proofline"><span>No blank database</span><span>No template to bend</span><span>No CRM admin required</span></div>
          <a className="text-link" href="#builds">See how the company becomes the template <span aria-hidden="true">↓</span></a>
        </div>
        <div className="hero-action" id="concept">
          <div className="action-rings" aria-hidden="true"><i /><i /><i /></div>
          <p>One day, this is the whole setup.</p>
          <BuildDemo />
          <small>The demo uses fictional data. The product is not yet available.</small>
        </div>
      </section>

      <section className="benefit-band" aria-label="What the finished CRM gives you">
        <div className="shell benefit-grid">
          {benefits.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><strong>{title}</strong><p>{text}</p></article>)}
        </div>
      </section>

      <section className="section build-section shell" id="builds">
        <div className="section-heading split-heading">
          <div><p className="eyebrow">From conversations to working software</p><h2>You do not set up the CRM. Your company shows it what to build.</h2></div>
          <p>Most CRMs make you decide the fields, stages and workflows before they know anything about the business. Company Native begins with what the team already does.</p>
        </div>
        <div className="build-path">
          <div className="path-line" aria-hidden="true"><span /></div>
          {buildPath.map(([number, title, text]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}
        </div>
        <div className="build-output">
          <div className="output-inbox">
            <div className="output-label">APPROVED COMMUNICATIONS</div>
            <div className="mail-row"><span className="avatar mint">M</span><div><strong>Can we reserve Tuesday for the survey?</strong><small>Maya · Northstar Foods · 09:14</small></div><i>Site access</i></div>
            <div className="mail-row"><span className="avatar coral">J</span><div><strong>The revised scope is ready to send.</strong><small>Jon · Morrow Works · Yesterday</small></div><i>Proposal</i></div>
            <div className="mail-row"><span className="avatar cream">A</span><div><strong>We should check in after installation.</strong><small>Amir · Aster House · Monday</small></div><i>Follow-up</i></div>
          </div>
          <div className="output-arrow" aria-hidden="true"><span>Company Native discovers</span>→</div>
          <div className="output-structure">
            <div className="output-label">CRM BUILT FOR THIS COMPANY</div>
            <div className="structure-row"><span>01</span><strong>New enquiry</strong><i>3</i></div>
            <div className="structure-row active"><span>02</span><strong>Site access</strong><i>4</i></div>
            <div className="structure-row"><span>03</span><strong>Proposal ready</strong><i>2</i></div>
            <div className="structure-row"><span>04</span><strong>Delivery & follow-up</strong><i>7</i></div>
          </div>
        </div>
      </section>

      <section className="section why-section" id="learns">
        <div className="shell why-grid">
          <div className="why-copy">
            <p className="eyebrow light">The missing part of every activity log</p>
            <h2>The CRM sees what happened. Selected people explain why.</h2>
            <p>A click shows that something changed. It does not show the goal, the exception or the better process someone had in mind. Company Native can ask a short question at that moment and capture the answer without another requirements workshop.</p>
            <ul><li>Only employees the company assigns as power users</li><li>Short questions tied to the work happening now</li><li>Questions can be dismissed, paused or disabled</li><li>Important changes remain reviewable</li></ul>
          </div>
          <PowerUserMoment />
        </div>
      </section>

      <section className="section shared-learning shell">
        <div className="section-heading centered-heading">
          <p className="eyebrow">Your CRM learns locally. Company Native learns across every installation.</p>
          <h2>Each company stays private. Every useful lesson can make the next CRM better.</h2>
          <p>The shared system learns reusable patterns, better questions and proven components. It does not give one company another company’s messages, code or private memory.</p>
        </div>
        <div className="learning-map" aria-label="Private customer CRMs contribute approved reusable lessons to a shared learning system, which improves new and existing CRMs">
          <div className="local-cluster cluster-one"><span>CRM 01</span><strong>Private company context</strong><small>Messages · goals · local memory</small></div>
          <div className="local-cluster cluster-two"><span>CRM 02</span><strong>Private company context</strong><small>Messages · goals · local memory</small></div>
          <div className="local-cluster cluster-three"><span>CRM 03</span><strong>Private company context</strong><small>Messages · goals · local memory</small></div>
          <div className="learning-core"><span className="coremark-large" aria-hidden="true"><i /></span><small>COMPANY NATIVE LEARNS</small><strong>Patterns that worked.<br />Mistakes to avoid.<br />Better ways to build.</strong></div>
          <div className="learning-arrow arrow-one" aria-hidden="true">approved lessons ↗</div>
          <div className="learning-arrow arrow-two" aria-hidden="true">↖ relevant improvements</div>
          <div className="learning-arrow arrow-three" aria-hidden="true">validated patterns ↘</div>
        </div>
        <p className="learning-limit"><strong>This is the intended architecture, not a finished security claim.</strong> The technical and contractual boundary must be designed and proven before real customer communications are used.</p>
      </section>

      <section className="section comparison-section">
        <div className="shell">
          <div className="section-heading split-heading">
            <div><p className="eyebrow">Why build another kind of CRM?</p><h2>Automatic data entry is useful. Company Native changes the software itself.</h2></div>
            <p>AI-native CRMs already connect email and reduce manual logging. Company Native’s bet is that a small company should receive owned software whose structure and features are discovered from that company—not another shared product to configure.</p>
          </div>
          <div className="comparison-table" role="table" aria-label="Comparison of traditional CRM, AI-native CRM and Company Native vision">
            <div className="comparison-row comparison-head" role="row"><div role="columnheader">The difference</div><div role="columnheader">Traditional CRM</div><div role="columnheader">AI-native CRM</div><div className="company-column" role="columnheader">Company Native vision</div></div>
            {comparisonRows.map(([label, traditional, ai, native]) => <div className="comparison-row" role="row" key={label}><div role="rowheader">{label}</div><div role="cell">{traditional}</div><div role="cell">{ai}</div><div className="company-column" role="cell">{native}</div></div>)}
          </div>
        </div>
      </section>

      <section className="section ownership-section shell" id="ownership">
        <div className="ownership-copy"><p className="eyebrow">Built around your company. Controlled by your company.</p><h2>The CRM should learn without taking control away from the people using it.</h2><p>Company Native’s advantage cannot depend on trapping a customer. The customer owns the CRM, code and data. The service earns its place by continuing to improve them.</p></div>
        <div className="ownership-grid">
          <article><span>01</span><h3>Your data stays separate</h3><p>Raw communications, customer-specific memory and operating data remain inside that customer’s boundary.</p></article>
          <article><span>02</span><h3>You approve access and changes</h3><p>The company chooses the accounts, power users and permissions. Material workflow and security changes are reviewable and reversible.</p></article>
          <article><span>03</span><h3>You own what is built</h3><p>The CRM, code and data belong to the customer. Company Native keeps the reusable building method—not the customer’s private advantage.</p></article>
        </div>
      </section>

      <section className="section faq-section shell">
        <div className="section-heading split-heading"><div><p className="eyebrow">Before you press the button</p><h2>What this vision does—and does not—promise.</h2></div><p>The website shows the intended final experience. It does not claim that Company Native can already build a production CRM from your email.</p></div>
        <div className="faq-list">
          <details open><summary>Can I use Company Native today?</summary><p>Not as the one-click product shown here. Company Native is in development. The first stage is to build greenfield CRMs manually, learn from real use and turn the repeated parts into the product.</p></details>
          <details><summary>Does Company Native read every employee’s email?</summary><p>No. The company would choose which accounts, history and sources are approved. The exact permission, hosting, retention and contractual controls still need to be designed and proven before real use.</p></details>
          <details><summary>Will the CRM change important workflows automatically?</summary><p>It can notice friction and capture ideas automatically. Important workflow, permission, security and data changes remain explainable, reviewable and reversible.</p></details>
          <details><summary>How is this different from an AI CRM that connects to email?</summary><p>Existing AI CRMs already populate contacts, deals and activity from email and meetings. Company Native aims to go further: discover the company’s own structure, build owned software around it, ask why people work as they do and improve installations from measured lessons across customers.</p></details>
          <details><summary>Do all customers end up with the same CRM?</summary><p>No. Reusable lessons improve how Company Native recognises needs and builds reliable capabilities, but each company’s CRM structure, rules, code and private memory remain its own.</p></details>
          <details><summary>What would it cost?</summary><p>The final product does not have a settled public price. Pricing should follow real build time, ongoing operating cost and the value customers receive—not a number invented for this concept.</p></details>
        </div>
      </section>

      <section className="final-cta">
        <div className="shell final-cta-grid"><div><p className="eyebrow light">The finished experience</p><h2>Connect the work. Get the CRM. Keep making it yours.</h2><p>Run the sample-data concept, or see why the learning system could become a compounding business.</p></div><div><BuildDemo compact /><Link className="investor-link" href="/investors">See the investor vision <span aria-hidden="true">→</span></Link></div></div>
      </section>

      <footer className="site-footer shell">
        <a className="brand footer-brand" href="#top"><Image src="/company-native-mark.svg" width={34} height={34} alt="" /><span>Company Native</span></a>
        <p>Final product vision · In development · No customer data is collected by this concept.</p>
        <div><a href="#top">Back to top ↑</a><Link href="/investors">Investor vision</Link></div>
      </footer>
    </main>
  );
}
