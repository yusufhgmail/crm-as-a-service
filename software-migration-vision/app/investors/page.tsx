import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Investor Pitch — Software Migration as a Service',
  description: 'Why companies will move from renting generic software to owning proprietary operating capabilities—and the company we are building to make that transition practical.',
  openGraph: {
    title: 'Investor Pitch — Software Migration as a Service',
    description: 'The migration layer between rented software and the proprietary enterprise.',
    type: 'website',
    images: [],
  },
  twitter: {
    card: 'summary',
    title: 'Investor Pitch — Software Migration as a Service',
    description: 'The migration layer between rented software and the proprietary enterprise.',
    images: [],
  },
};

const partnerTypes = [
  ['Product & AI builders', 'Build the system that understands work, turns it into safe specifications and manages continuous improvement.'],
  ['Migration operators', 'Bring the deep craft of data mapping, integrations, rollout, governance and change without disruption.'],
  ['Design partners', 'Open one important workflow, prove the path in reality and shape a system the customer will own.'],
  ['Long-term capital', 'Fund the reusable engine and migration library that turn one successful service into a category-defining platform.'],
];

export default function InvestorsPage() {
  return (
    <main className="investor-page">
      <nav className="nav shell" aria-label="Investor pitch navigation">
        <Link className="wordmark" href="/" aria-label="Software Migration as a Service customer website">
          <span className="wordmark-mark">SM</span>
          <span>Software Migration<br />as a Service</span>
        </Link>
        <div className="nav-links">
          <a href="#why-now">Why now</a>
          <a href="#flywheel">The flywheel</a>
          <a href="#model">Business model</a>
          <a href="#roadmap">The path</a>
        </div>
        <Link className="nav-cta" href="/">Customer website <span aria-hidden="true">↑</span></Link>
      </nav>

      <section className="investor-page-hero section" id="why-now">
        <div className="shell investor-intro-grid">
          <div>
            <p className="section-kicker light">INVESTOR PITCH · THE COMPANY BEHIND THE VISION</p>
            <h1>Generic SaaS is not the end state. <em>It is the bridge.</em></h1>
          </div>
          <div className="investor-lead">
            <p>Companies do not want software. They want their own best way of working, made fast, reliable and repeatable.</p>
            <p>AI is collapsing the cost of creating software. As that cost falls, paying forever for rigid, generic tools becomes less rational. The bottleneck moves from writing code to understanding the company, migrating it safely and operating what comes next. That is the company we are building.</p>
          </div>
        </div>
        <div className="shell future-case-grid">
          {[
            ['01', 'Creation becomes abundant', 'AI turns more software from a scarce product into a capability that can be created for one company.'],
            ['02', 'Migration becomes the bottleneck', 'The valuable system is the one that can recover real needs, move live work and earn adoption.'],
            ['03', 'Unique processes deserve unique systems', 'If every competitor can buy the same workflow, the software cannot be the source of advantage.'],
            ['04', 'Ownership compounds', 'Once identity, data and operating rules are owned, every later migration becomes cheaper and more valuable.'],
          ].map(([number, title, text]) => (
            <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
        <div className="shell investor-bet">
          <span>THE SIMPLE BET</span>
          <strong>Companies will move from renting generic applications to owning proprietary operating capabilities. We become the migration and improvement layer that makes the transition practical.</strong>
        </div>
      </section>

      <section className="flywheel-section section" id="flywheel">
        <div className="shell flywheel-heading">
          <div><p className="section-kicker light">WHY THIS COMPOUNDS</p><h2>Every migration makes <em>two systems</em> stronger.</h2></div>
          <p>The customer&apos;s owned system grows more connected. Our migration engine gains reusable knowledge. The next move becomes faster and safer for both.</p>
        </div>
        <div className="shell flywheel-grid">
          <article className="flywheel customer-wheel">
            <div className="flywheel-title"><span>01</span><div><small>INSIDE ONE CUSTOMER</small><h3>The ownership flywheel</h3></div></div>
            <div className="wheel-loop">
              {['One workflow owned', 'Shared data & identity', 'Next system cheaper', 'Processes connect', 'More value to improve'].map((item, index) => (
                <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong>{index < 4 && <i aria-hidden="true">→</i>}</div>
              ))}
            </div>
            <p>Each capability joins the same foundation. The customer stops collecting tools and starts extending one proprietary way of working.</p>
          </article>
          <article className="flywheel company-wheel">
            <div className="flywheel-title"><span>02</span><div><small>ACROSS EVERY CUSTOMER</small><h3>The migration flywheel</h3></div></div>
            <div className="asset-grid">{['Workflow patterns', 'Connectors', 'Data mappings', 'Evaluation suites', 'Secure components', 'Rollout playbooks'].map((item) => <span key={item}>{item}</span>)}</div>
            <div className="flywheel-result"><strong>More migrations</strong><i>→</i><strong>Better assets</strong><i>→</i><strong>Lower risk</strong><i>→</i><strong>More categories</strong></div>
            <p>The method standardizes while the customer system stays unique. That is how a service becomes a platform without becoming another generic SaaS product.</p>
          </article>
        </div>
      </section>

      <section className="model-section section paper" id="model">
        <div className="shell model-grid">
          <div className="model-copy">
            <p className="section-kicker">THE BUSINESS MODEL</p>
            <h2>Land with one painful system. <em>Earn the next migration.</em></h2>
            <p>The customer pays for a safer, better system—not for seats in another generic tool. Revenue grows as we replace more of the stack and operate the owned software continuously.</p>
            <div className="ownership-promise"><span>THE TRUST PRINCIPLE</span><strong>Customers own their code and data.</strong><p>They stay because we make the system better, not because leaving would destroy the business.</p></div>
          </div>
          <div className="revenue-ladder">
            {[
              ['01', 'Understand', 'Paid process and migration design', 'One bounded opportunity'],
              ['02', 'Build & move', 'Fixed build or milestone fees', 'One production system'],
              ['03', 'Operate & improve', 'Recurring managed service', 'Security, reliability and progress'],
              ['04', 'Expand', 'More systems on the same foundation', 'A larger share of software spend'],
            ].map(([number, title, money, scope]) => (
              <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{money}</p></div><small>{scope}</small></article>
            ))}
          </div>
        </div>
      </section>

      <section className="roadmap-section section" id="roadmap">
        <div className="shell roadmap-heading">
          <p className="section-kicker light">THE WEDGE TO THE END STATE</p>
          <h2>CRM proves the method. <em>It does not define the market.</em></h2>
          <p>We begin where we have credibility, a clear pain and a system that touches the full customer journey. Then we follow the connected work outward.</p>
        </div>
        <div className="shell roadmap-track">
          {[
            ['NOW', 'Custom CRM migration', 'Replace the system at the heart of customer acquisition, delivery and growth.', 'Founder-market fit · first repeatable method'],
            ['NEXT', 'Adjacent customer operations', 'Connect onboarding, service, projects, billing and the workflows CRM already touches.', 'Expansion inside the same customer'],
            ['THEN', 'Any software category', 'Apply the engine to finance, people, operations and specialized industry work.', 'Cross-category repeatability'],
            ['NORTH STAR', 'The proprietary company', 'One owned operating layer that evolves as fast as the company can imagine a better way.', 'Software becomes strategic infrastructure'],
          ].map(([time, title, text, proof], index) => (
            <article className={index === 0 ? 'current' : index === 3 ? 'north' : ''} key={time}>
              <div className="roadmap-dot"><span>{index + 1}</span></div><small>{time}</small><h3>{title}</h3><p>{text}</p><strong>{proof}</strong>
            </article>
          ))}
        </div>
        <div className="shell founder-proof">
          <div className="founder-monogram">YY</div>
          <div><span>WHY CRM FIRST</span><h3>Ten years inside the problem.</h3></div>
          <p>Yusuf Young founded FunnelBud in 2015 and helped more than 450 Swedish companies with CRM, sales and marketing automation before exiting. That provides the first domain, network and conviction that generic software can never fully fit a unique business.</p>
        </div>
      </section>

      <section className="truth-section section paper">
        <div className="shell truth-heading"><p className="section-kicker">WHAT MUST BECOME TRUE</p><h2>The proof has to <em>compound with the vision.</em></h2></div>
        <div className="shell proof-grid">
          {[
            ['01', 'A company pays us to understand one live workflow.', 'Proves the pain is valuable enough to act on.'],
            ['02', 'We ship useful value before asking for a migration.', 'Proves we can earn behavioral trust.'],
            ['03', 'We replace one CRM without interrupting the business.', 'Proves the full method, not only development.'],
            ['04', 'The second migration reuses assets and takes less effort.', 'Proves the engine compounds inside one customer.'],
            ['05', 'Another category uses the same core.', 'Proves this can become a platform rather than a CRM agency.'],
          ].map(([number, title, meaning]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{meaning}</p></article>)}
        </div>
      </section>

      <section className="partner-section section" id="partner">
        <div className="shell partner-intro">
          <div><p className="section-kicker light">BUILD THE CATEGORY WITH US</p><h2>This needs more than a software team.</h2></div>
          <p>It needs people who understand products, AI, real migrations, enterprise trust and patient company-building—and who want custom software to become the default rather than the exception.</p>
        </div>
        <div className="shell partner-grid">
          {partnerTypes.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
        <div className="shell final-statement">
          <span className="final-orbit">∞</span>
          <div><p className="section-kicker light">THE NORTH STAR</p><h2>Become the migration layer between rented software and <em>the proprietary enterprise.</em></h2><p>Not another software vendor. The company that helps every business build and own the systems that make it unique.</p></div>
        </div>
      </section>

      <footer>
        <div className="shell footer-top">
          <Link className="wordmark" href="/"><span className="wordmark-mark">SM</span><span>Software Migration<br />as a Service</span></Link>
          <p>The migration layer to the proprietary enterprise.</p>
          <div className="footer-links"><Link href="/">Customer website</Link><a href="#why-now">Investor pitch ↑</a></div>
        </div>
        <div className="shell footer-bottom"><span>Investor pitch · August 2026</span><span>Prepared for private conversations with partners and investors</span></div>
      </footer>
    </main>
  );
}
