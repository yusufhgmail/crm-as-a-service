import { ArticleLayout, articleMetadata, DataTable } from '../../article';
import { articleBySlug } from '../../articles';

const article = articleBySlug('method-crm-alternative')!;

export const metadata = articleMetadata(article);

const pricing = <a href="https://www.method.me/crm-quickbooks/pricing/" rel="noopener">Method’s pricing page</a>;

export default function MethodCrmAlternativePage() {
  return (
    <ArticleLayout article={article}>
      <section>
        <h2>Why a CRM agency is reviewing a product it does not sell</h2>
        <p>Because Method is the first thing we tell QuickBooks companies to look at, and we would rather they hear the full picture from us than a sales page from anyone. We build CRMs that companies own. Method rents one. For some companies Method is the better answer, and this review says where that line is.</p>
      </section>

      <section>
        <h2>What Method does well</h2>
        <ul>
          <li><strong>The QuickBooks sync is the real thing.</strong> Two-way, near real time, covering customers, estimates, invoices and payments, with QuickBooks Online and Desktop and with Xero. Most “integrations” on other CRMs sync a few fields one way; this one treats QuickBooks as a peer.</li>
          <li><strong>Its records match QuickBooks’ records.</strong> A customer, an estimate and an invoice in Method look and behave like the ones in QuickBooks, which saves the usual translation layer and most of the duplicates.</li>
          <li><strong>Screens can be customised.</strong> Fields, layouts and simple automations can be changed, by you or by Method’s services team, without code.</li>
          <li><strong>It is priced for small companies</strong>, with a free trial and no separate fee for the sync.</li>
        </ul>
      </section>

      <section>
        <h2>What it costs</h2>
        <DataTable
          caption="Method CRM per user per month, from method.me, 5 November 2026"
          head={['Plan', 'List price', 'Billed annually', '10 users, annual']}
          rows={[
            ['Contact Management', '$35', '$27', '$270 a month'],
            ['CRM Pro', '$59', '$45', '$450 a month'],
            ['CRM Enterprise', '$97', '$73', '$730 a month'],
          ]}
          source={<>Source: {pricing}. Method also advertises a 25% discount for three months with three or more users. Prices change; check the page before budgeting.</>}
        />
        <p>For a 10-person company that is $3,200 to $8,800 a year, which is reasonable for what the sync does. The number to watch is not the price but the plan: the features a growing team needs push it towards Pro and Enterprise, and every new person who touches a customer adds a seat.</p>
      </section>

      <section>
        <h2>Where it stops fitting</h2>
        <ol>
          <li><strong>When the process is not a pipeline.</strong> Method models a sale as a lead that becomes a customer with estimates and invoices. A distributor whose accounts reorder every month, a contractor whose job has eight stages after the estimate, or a company whose customer is a parent with a dozen sites, ends up bending the screens to the work. It can be done. Someone has to do it, and keep doing it.</li>
          <li><strong>When customisation becomes a job.</strong> The screen builder is the strength and the trap. Six months in, a Method account at a growing company has custom screens nobody fully understands and an owner who is also the admin. The <a href="/en/why-crm-projects-fail">adoption guide</a> describes what happens next.</li>
          <li><strong>When the company outgrows QuickBooks.</strong> Method is built for QuickBooks and Xero. A move to another accounting system, or a second system for a second business line, takes away the reason it was chosen.</li>
          <li><strong>When the work happens outside the records.</strong> Leads from the phone, quotes discussed in email, the rep’s route, the reorder that did not come: Method holds what you type into it. The data entry is still yours.</li>
        </ol>
      </section>

      <section>
        <h2>Who should pick Method anyway</h2>
        <p>A company of up to about 15 people, with a sales process that is a plain pipeline, QuickBooks at the centre of the business, and one person who likes the screen builder. If that is you, Method is a good buy and you do not need us. We say this in the first conversation when it applies.</p>
      </section>

      <section>
        <h2>The alternative: a CRM built around the company that reads QuickBooks</h2>
        <p>CRM From Within builds the CRM from the company’s own sources, with QuickBooks staying the system of record for customers, estimates and invoices, as it already is. The difference from Method is in the three places Method stops fitting: the CRM is shaped to the process rather than to a pipeline template, nobody on the team customises anything because the system proposes changes and the company approves them, and the records are filled from email, calls and QuickBooks rather than typed. The company owns the code, so there is no per-user fee and no renewal.</p>
        <DataTable
          caption="Method CRM versus a CRM built and kept by CRM From Within"
          head={['', 'Method CRM', 'CRM From Within']}
          rows={[
            ['Shape', 'Pipeline template, customisable screens', 'Built from your process'],
            ['QuickBooks', 'Two-way sync, included', 'Read directly; QuickBooks stays the record'],
            ['Who customises it', 'You, or Method’s services team', 'The service; you approve'],
            ['Data entry', 'Yours', 'From the sources; you confirm'],
            ['Price', '$27–97 per user per month', '$1,000–2,000 a month, no per-user fee'],
            ['Ownership', 'Rented', 'You own the code and data'],
          ]}
        />
        <p>How a build runs is on the <a href="/en/custom-crm-development">service page</a>; the <a href="/en/crm-for-quickbooks">QuickBooks guide</a> compares all three options for a QuickBooks company, and the <a href="/en/crm-for-distributors">distributor guide</a> is the most common case where a pipeline template fails.</p>
        <p className="guide-note">[Example to add: one company that moved from Method or chose against it, what did not fit, and what the first version replaced.]</p>
      </section>

      <section>
        <h2>Moving off Method, if you do</h2>
        <p>The data is the easy part: QuickBooks already holds the customers, estimates and invoices, so nothing financial moves. What moves is the CRM layer: contacts that are not yet customers, notes, activities and the pipeline. Method exports these to CSV. The build reads the export alongside the inboxes and QuickBooks, and the first version runs beside Method until the team stops opening it. Cancel at the end of the billing period; annual plans renew.</p>
      </section>
    </ArticleLayout>
  );
}
