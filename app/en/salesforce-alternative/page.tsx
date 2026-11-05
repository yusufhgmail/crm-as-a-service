import { ArticleLayout, articleMetadata, DataTable } from '../../article';
import { articleBySlug } from '../../articles';

const article = articleBySlug('salesforce-alternative')!;

export const metadata = articleMetadata(article);

export default function SalesforceAlternativePage() {
  return (
    <ArticleLayout article={article}>
      <section>
        <h2>Salesforce at a company of twenty</h2>
        <p>Salesforce is a platform, and a very good one, for organisations that can staff it. A company of 10 to 50 people cannot. It bought Salesforce because a bigger customer or a new sales lead used it, and now has a system with a thousand settings, a partner on retainer for changes, and a pipeline configured during onboarding that the team has quietly stopped maintaining. The licence renews anyway.</p>
        <p>Salesforce’s own small-business pricing starts at $25 per user per month for the Starter Suite and $100 for the Pro Suite (<a href="https://www.salesforce.com/small-business/pricing/" rel="noopener">salesforce.com</a>, checked 4 November 2026); the editions above that cost more and are where most of the configuration lives. The money is rarely the main complaint. The dependence is.</p>
      </section>

      <section>
        <h2>What the leavers say</h2>
        <p>From 7,165 public reviews and posts by CRM buyers, tagged in October 2026. Unhappy customers write more reviews than happy ones, so these are counts of complaints, not shares of customers. Salesforce was the second most-left CRM in that set, with 969 posts, behind HubSpot. Complexity (1,305 complaints across all CRMs) and consultant dependency (420) are the two that show up most around Salesforce, which matches Yusuf Young’s experience of companies customising Salesforce or Dynamics: they underestimate what the build-on-top will cost by a large multiple, and often end with a worse result at a higher price.</p>
      </section>

      <section>
        <h2>The alternatives, and what each one changes</h2>
        <DataTable
          caption="Leaving Salesforce: the options"
          head={['Option', 'What changes', 'What stays the same']}
          rows={[
            ['A lighter rented CRM (HubSpot, Pipedrive, Zoho)', 'Lower seat price, simpler setup', 'You still rent, configure and administer; the fit is still approximate'],
            ['Open source, self-hosted', 'No licence, full control', 'Your team hosts, updates and configures it'],
            ['A custom CRM you own, built and kept as a service', 'No licence, no admin, built from your process', 'You still need to approve changes and name one contact person'],
          ]}
        />
        <p>The first option is the right one if the problem was price. The third is the right one if the problem was that nobody could keep the system matched to the work. Most companies that search for a Salesforce alternative have the second problem and buy the first solution, which is how they end up searching again two years later.</p>
      </section>

      <section>
        <h2>What a move to an owned CRM looks like</h2>
        <ol>
          <li><strong>Export everything.</strong> Salesforce exports all objects, including custom ones, to CSV, with attachments and history. Keep the export whatever you decide.</li>
          <li><strong>Find the real process.</strong> It is not the Salesforce pipeline; it is what the team does in email, calls and the invoicing system. The build reads those sources and the export, and asks when something is unclear.</li>
          <li><strong>Build the first version beside Salesforce.</strong> Narrow: the records, one pipeline, one dashboard. The team works in both for a few weeks. This is the paid proof.</li>
          <li><strong>Keep what Salesforce did well.</strong> Reports people rely on are rebuilt; integrations are listed and each one is rebuilt, replaced or dropped on purpose.</li>
          <li><strong>Cancel at renewal.</strong> Salesforce contracts are annual; plan the switch around the date.</li>
        </ol>
        <p>What gets built is on the <a href="/en/custom-crm-development">service page</a>, and the <a href="/en/custom-crm-cost">cost guide</a> compares it with licences. The <a href="/en/custom-crm-vs-hubspot">ownership comparison</a> uses HubSpot’s numbers, but the shape is the same for Salesforce.</p>
      </section>

      <section>
        <h2>What you give up by leaving</h2>
        <p>Be honest about this before deciding. Salesforce’s AppExchange is the largest integration marketplace in the category; if the team relies on apps from it, each one has to be rebuilt, replaced or kept through the API. Reports that someone spent weeks on are rebuilt from scratch, which is a chance to drop the ones nobody reads. And a Salesforce skill on a CV is easier to hire for than knowledge of a system built for one company, which is why the owned CRM comes with a service rather than a handover. If the integrations list is long and the reports are loved, the lighter rented CRM may be the better first step, with ownership later.</p>
      </section>

      <section>
        <h2>When to stay on Salesforce</h2>
        <ul>
          <li>You have, or are about to hire, a Salesforce admin, and the platform is part of how the company plans to run at 100 people.</li>
          <li>A key customer or channel requires it for integration.</li>
          <li>The team actually uses what was configured. Check per person, weekly, before deciding; the <a href="/en/why-crm-projects-fail">adoption guide</a> explains how.</li>
        </ul>
        <p>If none of those apply, the honest situation is that you are paying for a platform and using a CRM. Any of the three alternatives above will cost less. Only one of them removes the job of keeping it fitting.</p>
      </section>
    </ArticleLayout>
  );
}
