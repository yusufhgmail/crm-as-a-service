import { faq } from '../faq';
import { SITE } from '../seo';

// A plain-text summary for AI assistants (https://llmstxt.org). Every fact
// here is also on the pages it links to; keep the two in step.
const body = `# CRM From Within

> CRM From Within builds a small or mid-sized company's CRM around how that company already handles leads and customers, then keeps adapting it as the work changes. The team does not have to configure or administer the CRM. It is operated by Yusuf Young AB in Sweden.

## What it is

- A production-ready CRM shaped around the company's real process (inboxes, spreadsheets, calls, handoffs), not a generic sales pipeline.
- The CRM observes the work in the sources the company approves, asks focused questions when the intent is unclear, and is changed by the system and CRM From Within's experts. Every material change is tested, approved by the company and reversible.
- Core features: managing incoming leads, opportunities that update themselves, dashboards built on the numbers the company uses, lead outreach, website lead capture, and logged calls and meetings.
- Security, customer data and access are fixed, tested parts. The workflow is what gets adapted.
- Best fit: a company that needs a CRM that fits but does not want a CRM project. If a generic pipeline is enough and the team is happy to configure it, a standard CRM such as HubSpot Free is the better choice.
- Status: selected design partners can test the first useful version without a build fee.

## Who is behind it

- Yusuf Young, founder. He founded FunnelBud in 2015, which helped more than 450 Swedish businesses with CRM, sales and marketing automation before he exited it.

## Questions

${faq.en.map(({ question, answer }) => `- **${question}** ${answer}`).join('\n')}

## Pages

- [CRM From Within (English)](${SITE}/en): what the CRM does, how it adapts, the comparison with a standard CRM, and a short chat to see if it fits.
- [CRM From Within (Svenska)](${SITE}/se): the same page in Swedish.
- [Privacy](${SITE}/en/privacy): what is stored from the CRM plan and contact requests, why, and your rights.
- [Integritet](${SITE}/se/privacy): the privacy page in Swedish.
`;

export function GET() {
  return new Response(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
}
