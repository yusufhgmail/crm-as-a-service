import type { Metadata } from 'next';
import { articles } from '../../articles';
import { JsonLd, jsonLd, pageMetadata } from '../../seo';

const copy = {
  title: 'Guides to custom CRMs, costs and alternatives',
  description: 'Plain guides on what a custom CRM costs, choosing a CRM agency, HubSpot and Salesforce alternatives, and CRMs for QuickBooks, distributors and contractors.',
};

export const metadata: Metadata = pageMetadata('en', '/guides', copy, ['en']);

export default function GuidesPage() {
  const byDate = [...articles].sort((a, b) => (a.published < b.published ? 1 : -1));
  return (
    <main className="legal-page guide-page" lang="en">
      <JsonLd data={jsonLd('en', '/guides', copy)} />
      <nav className="nav shell" aria-label="Main navigation">
        <a className="brand" href="/en"><span className="brand-mark" aria-hidden="true" /><span>CRM From Within</span></a>
        <a className="button button-small button-dark" href="/en#assessment-chat" data-funnel-location="guides_navigation">See if it fits <span aria-hidden="true">→</span></a>
      </nav>
      <article className="legal-content guide-content shell">
        <p className="section-kicker">GUIDES</p>
        <h1>Guides to custom CRMs, what they cost, and the alternatives</h1>
        <p className="legal-lead guide-answer">Written for owners of companies with 10 to 50 people who need a CRM that fits and do not want a CRM project. Each guide answers one question, with the numbers and where they came from.</p>
        <ul className="guide-index">
          {byDate.map((article) => (
            <li key={article.slug}>
              <p className="section-kicker">{article.kicker}</p>
              <h2><a href={`/en/${article.slug}`}>{article.heading}</a></h2>
              <p>{article.description}</p>
            </li>
          ))}
        </ul>
      </article>
      <footer>
        <div className="shell footer-bottom"><span>© 2026 CRM From Within · A Yusuf Young AB company</span><span><a href="/en">Home</a> · <a href="/en/privacy">Privacy</a></span></div>
      </footer>
    </main>
  );
}
