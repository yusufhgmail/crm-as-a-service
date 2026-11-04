import { ArticleLayout, articleMetadata, DataTable } from '../../article';
import { articleBySlug } from '../../articles';

const article = articleBySlug('crm-for-distributors')!;

export const metadata = articleMetadata(article);

export default function CrmForDistributorsPage() {
  return (
    <ArticleLayout article={article}>
      <section>
        <h2>Why the pipeline CRM never sticks at a distributor</h2>
        <p>A pipeline CRM is built for a deal that opens, moves through stages and closes. A distributor’s business is the opposite shape: a few hundred accounts, most of them won years ago, each buying every two, four or six weeks. The “deal” never closes. What matters is whether the account ordered this month, whether the order was smaller than usual, and whether anyone noticed.</p>
        <p>So the rep keeps the real list in a spreadsheet: account, last order, usual order, next visit, notes. The CRM the company bought holds a pipeline nobody updates. In our experience that spreadsheet is the most accurate system in the building, and the CRM’s job is to replace it without losing what makes it work.</p>
      </section>

      <section>
        <h2>What a distributor’s CRM has to model</h2>
        <DataTable
          caption="Generic CRM versus what a distributor needs"
          head={['', 'Generic pipeline CRM', 'Distributor CRM']}
          rows={[
            ['Unit of work', 'A deal with stages', 'An account with a reorder cycle'],
            ['The question it answers', 'Where is this deal?', 'Who is due, who is late, who is shrinking?'],
            ['Pricing', 'One price per product', 'A price list per customer, held in QuickBooks or the ERP'],
            ['Account structure', 'Company with contacts', 'Parent with sites, each with its own buyer and delivery days'],
            ['Rep’s day', 'Calls and emails', 'A route: which sites, in which order, on which day'],
            ['Source of truth for revenue', 'The deal amount someone typed', 'The invoice in QuickBooks'],
          ]}
        />
        <p>Five things in detail:</p>
        <ol>
          <li><strong>Reorder cycles.</strong> Each account has a rhythm. The CRM should learn it from the invoice history and flag the account that is a week past its usual interval, before the rep has to notice.</li>
          <li><strong>Customer-specific pricing.</strong> Distributors live on negotiated prices. Those prices belong in the system that invoices, and the CRM reads them from there. A CRM with its own copy of the price list is wrong within a month.</li>
          <li><strong>Parent and site accounts.</strong> One customer, twelve delivery addresses, three buyers, two credit terms. A flat “company” record cannot hold that. The structure has to exist in the CRM or every report lies.</li>
          <li><strong>The route.</strong> Outside reps plan by geography and day. The CRM’s view for a rep is “Tuesday’s sites in order”, with each site’s last order and open issues, not a list of contacts sorted by name.</li>
          <li><strong>Invoices as the truth.</strong> Revenue per account comes from QuickBooks or the ERP, not from a field someone filled in. The <a href="/en/crm-for-quickbooks">QuickBooks guide</a> covers how that sync is done without duplicates.</li>
        </ol>
      </section>

      <section>
        <h2>From the spreadsheet to a CRM, without a project</h2>
        <p>The usual way to replace the spreadsheet is a project: pick a CRM, configure it, import, train, hope. For a company of 10 to 50 people with one or two outside reps, that project competes with the actual work and usually loses.</p>
        <p>The way CRM From Within does it: the spreadsheet, the shared inbox and QuickBooks are the approved sources. The system reads them, works out the accounts, the cycles and the structure, and asks the rep a focused question when something is unclear (“Is Acme Northside the same customer as Acme?”). The first version is narrow: the account list with reorder status, the rep’s route view, and the invoices showing up on the account. It is in use within weeks, beside the spreadsheet, until the rep stops opening the spreadsheet. The <a href="/en/custom-crm-development">service page</a> describes the build, and the <a href="/en/custom-crm-cost">cost guide</a> compares it with licences.</p>
        <p className="guide-note">[Example to add: one distributor or wholesaler, what the spreadsheet held, how many accounts and sites, and what the reorder flag caught in the first month.]</p>
      </section>

      <section>
        <h2>The other options, honestly</h2>
        <ul>
          <li><strong>Industry distribution CRMs.</strong> Built for the job, often tied to a particular ERP, and priced for larger distributors. Worth a look if you already run that ERP.</li>
          <li><strong>A general CRM bent to fit.</strong> HubSpot, Zoho or Pipedrive with custom objects for sites and a recurring-deal workaround. It works if someone on the team enjoys maintaining it; the price lists and the route still live elsewhere.</li>
          <li><strong>The spreadsheet, kept.</strong> Not a joke. A one-rep distributor with 80 accounts may be fine. The spreadsheet fails when there are two reps, a second person answering the phone, or an owner who wants to see who is late without asking.</li>
        </ul>
      </section>

      <section>
        <h2>Signs it is time</h2>
        <p>An account went quiet for two months and nobody noticed until the competitor’s truck was seen. A rep left and the spreadsheet went with them. The owner cannot answer “which accounts are shrinking?” without a weekend. Each of those is the spreadsheet reaching its limit, and each is what the first version of a built CRM is designed to catch.</p>
      </section>
    </ArticleLayout>
  );
}
