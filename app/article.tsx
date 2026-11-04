import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { type Article, articles } from './articles';
import { JsonLd, jsonLd, pageMetadata } from './seo';

// Shared layout for the guides in articles.ts. Each route under app/en/<slug>
// exports `metadata = articleMetadata(slug)` and renders <ArticleLayout slug>
// with its sections as children.

export function articleMetadata(article: Article): Metadata {
  return pageMetadata('en', `/${article.slug}`, { title: article.title, description: article.description }, ['en']);
}

const longDate = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export function ArticleLayout({ article, children }: { article: Article; children: ReactNode }) {
  const related = articles.filter((candidate) => candidate.slug !== article.slug);
  return (
    <main className="legal-page guide-page" lang="en">
      <JsonLd data={jsonLd('en', `/${article.slug}`, { title: article.title, description: article.description }, article.faq, { published: article.published, modified: article.modified, headline: article.heading })} />
      <nav className="nav shell" aria-label="Main navigation">
        <a className="brand" href="/en"><span className="brand-mark" aria-hidden="true" /><span>CRM From Within</span></a>
        <a className="button button-small button-dark" href="/en#assessment-chat" data-funnel-location="guide_navigation">See if it fits <span aria-hidden="true">→</span></a>
      </nav>
      <article className="legal-content guide-content shell">
        <p className="section-kicker">{article.kicker}</p>
        <h1>{article.heading}</h1>
        <p className="legal-lead guide-answer">{article.answer}</p>
        <p className="guide-byline">By <a href="/en#story">Yusuf Young</a>, founder of CRM From Within · {longDate(article.published)}{article.modified !== article.published ? `, updated ${longDate(article.modified)}` : ''}</p>

        {children}

        {article.faq.length > 0 && (
          <section className="guide-faq" aria-labelledby="faq-heading">
            <h2 id="faq-heading">Questions people ask</h2>
            {article.faq.map((item) => (
              <div key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </section>
        )}

        <section className="guide-cta">
          <h2>See whether a custom CRM fits your company</h2>
          <p>Answer a few questions about how leads and customers are handled today. You get a short first-CRM plan, and we tell you honestly if HubSpot Free would do.</p>
          <a className="button button-primary" href="/en#assessment-chat" data-funnel-location="guide_cta">Start the CRM plan <span aria-hidden="true">→</span></a>
        </section>

        {related.length > 0 && (
          <section className="guide-related">
            <h2><a href="/en/guides">More guides</a></h2>
            <ul>
              {related.map((item) => (
                <li key={item.slug}><a href={`/en/${item.slug}`}>{item.heading}</a></li>
              ))}
            </ul>
          </section>
        )}
      </article>
      <footer>
        <div className="shell footer-bottom"><span>© 2026 CRM From Within · A Yusuf Young AB company</span><span><a href="/en">Home</a> · <a href="/en/privacy">Privacy</a></span></div>
      </footer>
    </main>
  );
}

/** A small comparison table. Rows are arrays of cells; the first cell is the row label. */
export function DataTable({ caption, head, rows, source }: { caption: string; head: string[]; rows: ReactNode[][]; source?: ReactNode }) {
  return (
    <figure className="guide-table">
      <table>
        <caption>{caption}</caption>
        <thead><tr>{head.map((cell) => <th key={cell} scope="col">{cell}</th>)}</tr></thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>{row.map((cell, cellIndex) => cellIndex === 0 ? <th key={cellIndex} scope="row">{cell}</th> : <td key={cellIndex}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
      {source && <figcaption>{source}</figcaption>}
    </figure>
  );
}
