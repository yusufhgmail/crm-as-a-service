import { ArticleLayout, articleMetadata, DataTable } from '../../article';
import { articleBySlug } from '../../articles';

const article = articleBySlug('crm-for-quickbooks')!;

export const metadata = articleMetadata(article);

export default function CrmForQuickbooksPage() {
  return (
    <ArticleLayout article={article}>
      <section>
        <h2>Why QuickBooks companies end up searching for a CRM</h2>
        <p>QuickBooks is where the money is: customers, estimates, invoices, payments. It is not where the sale happens. The lead came in by phone or email, the quote was discussed in three messages, the follow-up lives in someone’s head, and the first time the deal touches QuickBooks is when the estimate is typed in. Everything before that is in inboxes and a spreadsheet.</p>
        <p>So the question is not “which CRM has a QuickBooks logo on its integrations page”. It is: which objects should live where, and which system is the source of truth for each. Get that wrong and every option below produces duplicates.</p>
      </section>

      <section>
        <h2>The three options</h2>
        <DataTable
          caption="CRM options for a company on QuickBooks"
          head={['', 'Method CRM', 'Rented CRM + connector', 'Built around the company']}
          rows={[
            ['What it is', 'A CRM made for QuickBooks', 'HubSpot, Zoho, Pipedrive with a QuickBooks integration', 'A CRM built from your process that reads QuickBooks directly'],
            ['Sync', 'Two-way: customers, estimates, invoices, payments', 'Usually one-way or limited to a few objects; Desktop needs a third-party tool', 'Whatever the process needs, in the direction agreed'],
            ['Who configures it', 'Your team, with Method’s help', 'Your team or a partner agency', 'The service; you approve'],
            ['Cost', 'About $27–35 per user per month, more for higher tiers', 'Licence per seat (HubSpot Professional $90), plus the connector', '$1,000–2,000 a month, no per-seat fee'],
            ['Best for', 'A plain pipeline where QuickBooks is already the centre', 'A team that wants a known brand and accepts the sync limits', 'A process that does not fit a standard pipeline, such as a distributor'],
          ]}
          source={<>Method pricing from <a href="https://www.method.me/pricing/" rel="noopener">method.me</a>, which lists monthly and annual rates; review sites quote both. HubSpot from <a href="https://www.hubspot.com/pricing/sales" rel="noopener">hubspot.com/pricing</a>. Checked 4 November 2026.</>}
        />
      </section>

      <section>
        <h2>Option 1: Method CRM</h2>
        <p>Method is the honest first thing to look at, and we will say so even though we do not sell it. It was built for QuickBooks, it syncs both ways with Online and Desktop, and its customer, estimate and invoice records match QuickBooks’ own. If your sales process is a plain pipeline and QuickBooks is already the centre of the business, Method with a few customised screens may be all you need.</p>
        <p>Where it stops fitting: when the process is not a pipeline. A distributor whose reps work a route and reorder cycles, a contractor whose job has six stages between quote and invoice, or a company whose “customer” in QuickBooks is a parent with twelve sites, will spend its time bending Method’s screens to the work, and someone has to own that.</p>
      </section>

      <section>
        <h2>Option 2: a rented CRM with a QuickBooks connector</h2>
        <p>HubSpot has a native QuickBooks Online integration; Zoho, Pipedrive and the others have theirs or rely on Zapier-style connectors. Read the integration page for three things before committing: which objects sync (contacts and invoices, usually; estimates and products, sometimes; custom fields, rarely), which direction, and what happens to QuickBooks Desktop, which almost always needs a separate paid tool.</p>
        <p>This option works when the team wants a known brand and the sync only has to do one job, such as showing invoice status on the contact. It costs a licence per seat on top of QuickBooks, and the CRM still has to be configured by someone.</p>
      </section>

      <section>
        <h2>Option 3: a CRM built around the company that reads QuickBooks</h2>
        <p>This is what CRM From Within builds. QuickBooks stays the system of record for customers, estimates and invoices, because it already is. The CRM is built around the part of the work that QuickBooks does not see: where leads come from, who owns them, what was quoted and why, the reorder cycle, the rep’s route, the follow-up. It reads QuickBooks directly, so a customer exists once, an invoice shows up on the deal the day it is sent, and nobody types anything twice.</p>
        <p>The build starts from the approved sources, which for a QuickBooks company usually means QuickBooks itself, the shared inboxes and the spreadsheet that currently holds the pipeline. The first version is narrow and in use within weeks. The <a href="/en/custom-crm-development">service page</a> describes the process, and the <a href="/en/custom-crm-cost">cost guide</a> compares it with licences.</p>
        <p className="guide-note">[Example to add: one QuickBooks-based client, what lived in the spreadsheet before, and what the first version replaced.]</p>
      </section>

      <section>
        <h2>Where QuickBooks syncs break, whichever option you pick</h2>
        <ul>
          <li><strong>Duplicates.</strong> The CRM creates “Acme Inc” and QuickBooks has “ACME Inc.”. Decide which system creates customers, and make the other one read-only for that object.</li>
          <li><strong>Price lists.</strong> QuickBooks holds customer-specific pricing; most CRMs do not. If reps quote from the CRM, the quote is wrong until someone checks QuickBooks.</li>
          <li><strong>Estimates edited in both places.</strong> An estimate sent from the CRM and then changed in QuickBooks, or the reverse, leaves two versions. Pick one place to edit.</li>
          <li><strong>Desktop.</strong> QuickBooks Desktop syncs through a connector that runs on a Windows machine that someone forgets to leave on. If you are on Desktop, test the sync on a Friday afternoon before trusting it.</li>
          <li><strong>Deleted or merged records.</strong> Merges in QuickBooks do not always propagate. Check what the integration does with them before the first import.</li>
        </ul>
      </section>

      <section>
        <h2>How to choose</h2>
        <p>Write down the five things a rep does between “new lead” and “estimate in QuickBooks”. If they fit in a pipeline with stages, Method or a rented CRM will do, and the cheaper one wins. If they do not, because the work has routes, reorders, sites or approvals, the CRM has to be shaped to the work, and that is the third option. The <a href="/en/crm-for-distributors">distributor guide</a> walks through the most common version of that case.</p>
      </section>
    </ArticleLayout>
  );
}
