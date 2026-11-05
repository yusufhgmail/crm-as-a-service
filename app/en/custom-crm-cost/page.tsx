import { ArticleLayout, articleMetadata, DataTable } from '../../article';
import { articleBySlug } from '../../articles';

const article = articleBySlug('custom-crm-cost')!;

export const metadata = articleMetadata(article);

const hubspotPricing = <a href="https://www.hubspot.com/pricing/sales" rel="noopener">HubSpot’s pricing page</a>;
const hubspotCatalog = <a href="https://legal.hubspot.com/hubspot-product-and-services-catalog" rel="noopener">product catalog</a>;

export default function CustomCrmCostPage() {
  return (
    <ArticleLayout article={article}>
      <section>
        <h2>Three ways to get a custom CRM, and what each costs</h2>
        <p>“Custom CRM” covers three different purchases. The price depends on which one you mean.</p>
        <ol>
          <li><strong>A development shop builds it.</strong> You write requirements, they build to them. Quotes we have seen for a CRM of any substance start in the tens of thousands of dollars and run for months, and the price of changes after handover is the part nobody puts in the quote. You own the code and you own the maintenance.</li>
          <li><strong>A partner configures HubSpot or Salesforce.</strong> HubSpot itself charges a one-time onboarding fee of $1,500 for Sales Hub Professional and $3,500 for Enterprise, and partner agencies charge their own fee on top, from a few thousand dollars to tens of thousands for a large setup. Then the licences run forever. You own nothing; you rent.</li>
          <li><strong>A service builds and runs it.</strong> This is what CRM From Within does: one monthly fee per company, quoted after a free fit check, that includes the hosting and every change, with no per-seat charge. You own the code from day one.</li>
        </ol>
      </section>

      <section>
        <h2>What HubSpot costs a 20-person team</h2>
        <p>The numbers below are HubSpot’s own list prices for Sales Hub, billed annually, from {hubspotPricing} and its {hubspotCatalog}. Monthly billing is higher ($100 per Professional seat instead of $90).</p>
        <DataTable
          caption="HubSpot Sales Hub, 20 seats, list price, billed annually"
          head={['', 'Professional', 'Enterprise']}
          rows={[
            ['Per sales seat per month', '$90', '$150'],
            ['20 seats per month', '$1,800', '$3,000'],
            ['20 seats per year', '$21,600', '$36,000'],
            ['One-time onboarding fee', '$1,500', '$3,500'],
            ['Three years, 20 seats', '$66,300', '$111,500'],
          ]}
          source={<>Source: {hubspotPricing} and {hubspotCatalog}, checked 4 November 2026. Non-sales “core” seats are cheaper ($50 and $75), so a mixed team pays less than the table; a team that also needs Marketing Hub pays more.</>}
        />
        <p>Two things the table hides. The seat count only goes up, because every new hire who touches a customer needs one. And the features that make Professional necessary in the first place, such as sequences, custom reports and approvals, are also the ones that need someone to configure them, which is why the partner fee exists.</p>
      </section>

      <section>
        <h2>What the bill looks like with an owned CRM</h2>
        <DataTable
          caption="HubSpot Professional versus a CRM built and kept by CRM From Within, 20 people"
          head={['', 'HubSpot Professional', 'Owned CRM as a service']}
          rows={[
            ['Per seat', '$90 a month, every month, per person', 'Nothing; hiring does not change the bill'],
            ['Setup', '$1,500 onboarding plus a partner’s fee', 'Quoted per company after the free fit check'],
            ['Changes after launch', 'Your admin’s time, or a partner’s invoice', 'Included in the monthly fee'],
            ['Hosting and upkeep', 'Included in the licence', 'Included in the monthly fee'],
            ['Year four', 'The licence continues', 'Only hosting, if you stop the service'],
            ['Who owns the software', 'HubSpot; you rent', 'You'],
          ]}
          source="We quote one monthly fee per company rather than a list price, because the build depends on the process. Selected design partners start without a build fee."
        />
        <p>Line by line, the difference is not the size of the monthly number but what it does over time. The HubSpot bill grows with every hire and never ends; the owned CRM’s bill is flat and stops when you stop. Add the partner’s setup fee and the hours someone spends administering HubSpot, neither of which appears on the invoice, and the comparison tilts further. Ask us for the number for your company in the fit check; it is the same number we would put in the contract.</p>
        <p>What buyers say about the bill: The numbers here come from 7,165 public reviews and posts by CRM buyers that we read and tagged in October 2026. People post when they are annoyed, so these are complaint counts, not a share of all companies. Price was the top complaint, from 3,202 of them, and most tied it to something they could not control: a renewal (760), a tier jump (683) or seat growth (420). That is the pattern the table above is built to avoid.</p>
      </section>

      <section>
        <h2>The cost that is not on any invoice</h2>
        <p>Whichever route you take, the expensive failure is the same: the team stops using the system. A CRM that does not match the work gets a parallel spreadsheet within months, and then the licence or the build was wasted. At the CRM SaaS company Yusuf Young built and sold, where he and his team set up CRMs for hundreds of companies, that was the way CRM projects failed, far more often than on price or features. So the honest cost question is not “what does it cost to build” but “what does it cost to keep it fitting”, and that is the part the monthly service pays for.</p>
      </section>

      <section>
        <h2>When the cheapest answer is HubSpot Free</h2>
        <p>If your process is a plain pipeline, your team is small, and someone is happy to set it up and keep it tidy, HubSpot Free costs nothing and is a good CRM. The cost conversation starts when you outgrow it. The <a href="/en/hubspot-alternative">HubSpot alternative guide</a> covers where that line is, and the <a href="/en/custom-crm-development">service page</a> covers what the build includes.</p>
      </section>
    </ArticleLayout>
  );
}
