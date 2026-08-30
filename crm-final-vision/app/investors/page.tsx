import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Investor vision',
  description: 'How Company Native aims to make every CRM installation improve the next one—and the installations already running.',
};

const learningAssets = [
  ['01', 'Intent linked to behavior', 'What happened, why a power user did it, what the person wanted and which change followed.'],
  ['02', 'Outcomes linked to builds', 'Which generated structures and features people kept, corrected, ignored or removed.'],
  ['03', 'Reusable CRM patterns', 'Better ways to recognise relationships, infer work, ask clarifying questions and sequence a build.'],
  ['04', 'Proven components', 'Reliable records, workflows, permissions and interfaces that can be adapted without starting from zero.'],
  ['05', 'Evaluation and release methods', 'Ways to prove that a lesson transfers and improve existing CRMs without importing the wrong assumptions.'],
];

const roadmap = [
  ['NOW', 'Build the first CRMs by hand', 'Create useful greenfield CRMs and record why each important choice was made.', 'Proof: customers use them and the learning record is complete.'],
  ['NEXT', 'Put the local learning AI inside', 'Observe approved work, ask power users why and capture improvements during real use.', 'Proof: the questions lead to changes customers keep.'],
  ['THEN', 'Connect installations through the umbrella AI', 'Turn approved outcomes into reusable patterns and controlled improvements.', 'Proof: later builds need fewer corrections and existing CRMs get better.'],
  ['PRODUCT', 'Make “Build my CRM” the interface', 'Connect email, generate the structure, fill the history and keep adapting.', 'Proof: a new customer reaches a useful CRM with little manual help.'],
];

const proofMilestones = [
  ['01', 'One manual CRM is used', 'The service solves a real greenfield problem.'],
  ['02', 'Three to five builds reveal repeated patterns', 'The first learning assets exist beyond one anecdote.'],
  ['03', 'Power-user questions improve a live CRM', 'The system learns intent that activity data alone cannot reveal.'],
  ['04', 'A later build needs less correction', 'Cross-customer learning improves the next installation.'],
  ['05', 'An existing CRM improves from an outside lesson', 'The umbrella AI strengthens the installed base, not only onboarding.'],
  ['06', 'Build time and service effort fall', 'The business begins to gain software economics.'],
];

export default function InvestorPage() {
  return (
    <main className="investor-page">
      <header className="investor-header shell">
        <Link className="brand brand-reverse" href="/" aria-label="Company Native customer vision">
          <Image src="/company-native-mark-reverse.svg" width={38} height={38} alt="" priority />
          <span>Company Native</span>
        </Link>
        <nav aria-label="Investor navigation"><a href="#system">The system</a><a href="#flywheel">The flywheel</a><a href="#roadmap">Roadmap</a><a href="#proof">What must be proven</a></nav>
        <Link className="investor-customer-link" href="/">Customer vision <span aria-hidden="true">↗</span></Link>
      </header>

      <section className="investor-hero shell" id="top">
        <div className="investor-hero-copy">
          <p className="status-pill dark"><span /> Investor vision · Pre-customer thesis</p>
          <h1>Every CRM should teach Company Native how to build the next one.</h1>
          <p>And how to improve the ones already running. The product is one-click CRM. The business advantage is an installed learning system that connects observed work, stated intent, what was built and whether it helped.</p>
          <div className="investor-hero-actions"><a className="button button-mint" href="#flywheel">See how it compounds <span aria-hidden="true">↓</span></a><Link href="/">Run the customer concept <span aria-hidden="true">↗</span></Link></div>
        </div>
        <div className="investor-system-preview" aria-label="Three private CRM installations send approved lessons to Company Native's shared learning system and receive relevant improvements">
          <div className="preview-title"><span>THE INSTALLED LEARNING SYSTEM</span><small>Intended architecture</small></div>
          <div className="preview-nodes"><div><span>CRM 01</span><small>Private</small></div><div><span>CRM 02</span><small>Private</small></div><div><span>CRM 03</span><small>Private</small></div></div>
          <div className="preview-flow"><span>approved outcomes</span><i>↓</i></div>
          <div className="preview-core"><span className="coremark-large" aria-hidden="true"><i /></span><div><small>UMBRELLA AI</small><strong>Learns how to infer, build and improve CRM</strong></div></div>
          <div className="preview-return"><i>↙</i><span>validated improvements return to new and existing CRMs</span><i>↘</i></div>
        </div>
      </section>

      <section className="investor-thesis">
        <div className="shell thesis-grid"><span>THE SIMPLE BET</span><strong>As AI makes software cheaper to create, the scarce capability becomes knowing what one company needs—and getting better at that decision with every installation.</strong></div>
      </section>

      <section className="section two-system-section shell" id="system">
        <div className="section-heading split-heading"><div><p className="eyebrow">Two systems create one advantage</p><h2>Local understanding protects the fit. Shared learning compounds the method.</h2></div><p>A single global model would flatten customers into one template. Fully isolated systems would never compound. Company Native needs both layers and a strict boundary between them.</p></div>
        <div className="two-system-grid">
          <article><div className="system-number">01</div><p className="eyebrow">Inside one customer</p><h3>The local CRM AI learns this company.</h3><ul><li>Approved messages and CRM activity</li><li>Customer-specific goals, people and memory</li><li>Questions to assigned power users</li><li>Local suggestions, permissions and outcomes</li></ul><strong>What stays local</strong><p>Raw communications, code, private memory and company-specific rules.</p></article>
          <article className="umbrella-card"><div className="system-number">02</div><p className="eyebrow">Across every customer</p><h3>The umbrella AI learns how to build better CRMs.</h3><ul><li>Approved, derived patterns and evaluation results</li><li>Questions that produced useful explanations</li><li>Components that worked across more than one company</li><li>Mistakes and assumptions that should not repeat</li></ul><strong>What compounds</strong><p>The method for deciding what to build, reusable building assets, the evaluation system and the operating economics.</p></article>
        </div>
      </section>

      <section className="section asset-section">
        <div className="shell">
          <div className="section-heading split-heading"><div><p className="eyebrow light">What accumulates</p><h2>More customers matter only if every installation creates a better decision system.</h2></div><p>Customer count is not the moat. The proprietary asset is the structured link from activity and intent to a CRM choice and a measured result.</p></div>
          <div className="asset-grid">{learningAssets.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        </div>
      </section>

      <section className="section flywheel-section shell" id="flywheel">
        <div className="section-heading centered-heading"><p className="eyebrow">Why this can compound</p><h2>Every useful CRM strengthens two flywheels.</h2><p>The customer receives software that becomes more fitted over time. Company Native improves the method and lowers the effort required for the next build.</p></div>
        <div className="flywheel-grid">
          <article className="flywheel customer-flywheel"><div className="flywheel-title"><span>01</span><div><small>INSIDE ONE CUSTOMER</small><h3>The improvement flywheel</h3></div></div><div className="wheel-list">{['CRM observes real use', 'Power user explains why', 'Improvement is suggested', 'Team reviews the change', 'Usage shows if it helped'].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong>{index < 4 && <i aria-hidden="true">↓</i>}</div>)}</div><p>The CRM becomes more useful without forcing the company through repeated requirements projects.</p></article>
          <article className="flywheel company-flywheel"><div className="flywheel-title"><span>02</span><div><small>ACROSS EVERY CUSTOMER</small><h3>The installed-base flywheel</h3></div></div><div className="wheel-loop-visual"><strong>More installations</strong><i>→</i><strong>More measured lessons</strong><i>→</i><strong>Better builds</strong><i>→</i><strong>Less manual effort</strong><i>→</i><strong>Better value</strong></div><p>New customers start from better assumptions. Existing customers receive relevant improvements first discovered elsewhere.</p></article>
        </div>
        <div className="flywheel-guardrail"><strong>What moves between installations is a proven lesson—not a customer’s private data.</strong><p>If that boundary cannot be made technically, contractually and visibly trustworthy, the compounding strategy does not work.</p></div>
      </section>

      <section className="section economics-section">
        <div className="shell economics-grid">
          <div><p className="eyebrow light">How service work becomes product advantage</p><h2>Earn while learning. Automate only what repeated evidence supports.</h2><p>The first customers pay for CRM building and maintenance. That work creates the patterns, components and outcome records the one-click product needs. The final product’s pricing is not yet settled.</p><div className="economics-rule"><span>THE ECONOMIC TEST</span><strong>Later installations must become faster to build, need fewer corrections and cost less to support.</strong></div></div>
          <div className="economics-steps"><article><span>01</span><div><strong>Human-led builds</strong><p>Revenue plus complete learning records.</p></div></article><article><span>02</span><div><strong>AI-assisted improvement</strong><p>Less interviewing and faster refinement.</p></div></article><article><span>03</span><div><strong>One-click generation</strong><p>Far less manual setup for each new CRM.</p></div></article><article><span>04</span><div><strong>Managed, improving software</strong><p>Recurring value without customer lock-in.</p></div></article></div>
        </div>
      </section>

      <section className="section roadmap-section shell" id="roadmap">
        <div className="section-heading split-heading"><div><p className="eyebrow">The roadmap is the data strategy</p><h2>The manual work is not a detour. It creates what cannot be bought.</h2></div><p>Generic app builders can already generate CRM code. The early installations must create the missing evidence: which CRM should be built and how to know whether it worked.</p></div>
        <div className="roadmap-track">{roadmap.map(([time, title, text, proof], index) => <article className={index === 0 ? 'current' : index === roadmap.length - 1 ? 'product' : ''} key={time}><div className="roadmap-marker"><span>{index + 1}</span></div><small>{time}</small><h3>{title}</h3><p>{text}</p><strong>{proof}</strong></article>)}</div>
      </section>

      <section className="section market-section">
        <div className="shell">
          <div className="section-heading split-heading"><div><p className="eyebrow light">The market has already removed one technical doubt</p><h2>Email can populate and maintain a CRM. That is no longer the whole opportunity.</h2></div><p>Current products already reduce logging and infer records from conversations. Company Native must prove the harder step: custom software the customer owns, intent captured in the moment and learning that improves every installation.</p></div>
          <div className="market-evidence">
            <a href="https://day.ai/crmx" target="_blank" rel="noreferrer"><span>DAY AI</span><strong>Customer memory built from team email, calls and threads.</strong><small>Official product page ↗</small></a>
            <a href="https://docs.clarify.ai/en/articles/11702613-what-is-clarify" target="_blank" rel="noreferrer"><span>CLARIFY</span><strong>Email, calendar and meetings build and maintain the CRM automatically.</strong><small>Official help center ↗</small></a>
            <a href="https://www.hubspot.com/products/crm/ai-crm" target="_blank" rel="noreferrer"><span>HUBSPOT</span><strong>AI analyzes CRM conversations and suggests what needs attention.</strong><small>Official product page ↗</small></a>
          </div>
          <div className="market-position"><span>COMPANY NATIVE’S NARROWER BET</span><strong>The company should not only receive an automatically populated CRM. It should receive owned software whose structure and abilities keep being rebuilt around what that company is trying to accomplish.</strong></div>
        </div>
      </section>

      <section className="section founder-section shell">
        <div className="founder-mark">YY</div><div><p className="eyebrow">Why start with CRM</p><h2>The domain knowledge comes before the automation.</h2></div><p>Yusuf Young founded FunnelBud in 2015 after implementing HubSpot and Salesforce systems. FunnelBud says it has helped more than 450 Swedish companies. That supports the choice of CRM as the first repeatable process; it does not prove the Company Native product or flywheel.</p><a href="https://www.funnelbud.com/en/om-oss/" target="_blank" rel="noreferrer">See the public FunnelBud record ↗</a>
      </section>

      <section className="section proof-section" id="proof">
        <div className="shell">
          <div className="section-heading split-heading"><div><p className="eyebrow">What must become true</p><h2>The thesis is only real when later customers—and earlier customers—get better results.</h2></div><p>These milestones separate customer growth from a compounding advantage. Missing one is evidence to change the product or the roadmap.</p></div>
          <div className="proof-grid">{proofMilestones.map(([number, title, meaning]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{meaning}</p></article>)}</div>
          <div className="failure-test"><span>THE FAILURE TEST</span><strong>If customer count rises but build time, correction rate, customer usefulness and existing-installation improvement do not get better, Company Native is growing a service—not building a moat.</strong></div>
        </div>
      </section>

      <section className="investor-final">
        <div className="shell investor-final-grid"><div><p className="eyebrow light">The north star</p><h2>Make “Build my CRM” simple because thousands of difficult lessons sit behind the button.</h2><p>That is the business Company Native is trying to build. The first installations determine whether it deserves to exist.</p></div><div><Link className="button button-coral" href="/">See the customer experience <span aria-hidden="true">↗</span></Link><a className="plain-link" href="#proof">Review the proof milestones ↑</a></div></div>
      </section>

      <footer className="investor-footer shell"><Link className="brand brand-reverse" href="/"><Image src="/company-native-mark-reverse.svg" width={34} height={34} alt="" /><span>Company Native</span></Link><p>Investor vision · August 2026 · Pre-customer thesis, not market validation.</p><div><Link href="/">Customer vision</Link><a href="#top">Back to top ↑</a></div></footer>
    </main>
  );
}
