import { ArticleLayout, articleMetadata, DataTable } from '../../article';
import { articleBySlug } from '../../articles';

const article = articleBySlug('crm-agency')!;

export const metadata = articleMetadata(article);

export default function CrmAgencyPage() {
  return (
    <ArticleLayout article={article}>
      <section>
        <h2>The three names for the same help</h2>
        <p>Companies that search for a <strong>CRM agency</strong>, a <strong>CRM consultant</strong> or <strong>CRM implementation services</strong> usually want the same thing: someone else to make the CRM work, because the last attempt stalled. The titles differ mostly in how long the help lasts.</p>
        <ul>
          <li>A <strong>consultant</strong> advises on which CRM to use and how to set it up, and often does the setup. The engagement ends when the system is live.</li>
          <li>An <strong>implementation service</strong> is that setup as a fixed project: pipeline stages, imports, email and website connections, training.</li>
          <li>An <strong>agency</strong> does the setup and stays on, usually on a retainer, to keep the system running and build what the team asks for next.</li>
        </ul>
        <p>Almost all of them are partners of HubSpot, Salesforce, Zoho or Microsoft. That partnership shapes everything about how they work and charge.</p>
      </section>

      <section>
        <h2>How a partner agency charges</h2>
        <p>A partner agency earns in two ways: a fee for the setup, and a share of the licence the client pays the vendor. HubSpot’s own onboarding fee is $1,500 for Sales Hub Professional and $3,500 for Enterprise (<a href="https://legal.hubspot.com/hubspot-product-and-services-catalog" rel="noopener">HubSpot product catalog</a>); a partner replaces that with its own package, from a few thousand dollars for a small setup to tens of thousands for a large one, and may add a monthly retainer. The licence, $90 to $150 per seat per month for Professional and Enterprise, is paid to the vendor on top, for as long as the company uses the system.</p>
        <p>None of this is hidden, but it has a consequence: the agency’s interest is in the client staying on the platform and buying more of it. That is fine when the platform fits. When it does not, the agency’s answer is more configuration, because configuration is what it sells.</p>
      </section>

      <section>
        <h2>The other kind of CRM agency</h2>
        <p>CRM From Within is a CRM agency with a different model. Instead of configuring software the client rents, it builds software the client owns, around how the company already works, and then keeps adapting it for a monthly fee. There is no licence, so there is no incentive to add seats or tiers. The fee pays for the CRM to keep fitting.</p>
        <DataTable
          caption="Two kinds of CRM agency"
          head={['', 'Partner agency', 'CRM From Within']}
          rows={[
            ['What you get', 'A configured HubSpot or Salesforce account', 'A CRM built around your process'],
            ['Who owns it', 'The vendor; you rent', 'You own the code and the data'],
            ['Setup cost', 'A few thousand dollars and up, plus the vendor onboarding fee', 'About $3,000 paid proof, or no build fee as a design partner'],
            ['Ongoing cost', 'Licences per seat, plus any retainer', '$1,000 to $2,000 a month, changes included'],
            ['Who changes it later', 'Your admin, or the agency on request, billed', 'The service, approved by you, included'],
            ['Agency is paid for', 'The setup and the licence', 'The CRM staying useful'],
          ]}
        />
      </section>

      <section>
        <h2>How to choose a CRM agency</h2>
        <p>Whichever kind you choose, the same questions sort the good ones from the rest.</p>
        <ol>
          <li><strong>Ask who will use the CRM in six months, and how they will know.</strong> Adoption is where CRM projects fail. An agency that measures weekly use per person after launch is accountable for the result, not just the go-live.</li>
          <li><strong>Ask what happens when the work changes.</strong> A new service line, a new rep, a new lead source. Is that a change request with a quote, or part of the deal?</li>
          <li><strong>Ask what you keep if you stop.</strong> With a partner, you keep an export and a licence you can cancel. With an owned CRM, you keep the system.</li>
          <li><strong>Ask them to show you the process they would build, before you pay.</strong> After a first conversation, we build a demo of the company’s own process. An agency that can only show a generic demo has not understood the work yet.</li>
          <li><strong>Be suspicious of a long requirements phase.</strong> Requirements written before anyone uses the system describe the company on the day they were written. The work will have moved by launch.</li>
        </ol>
      </section>

      <section>
        <h2>When you do not need an agency at all</h2>
        <p>A company of five with a plain pipeline does not need any of this. HubSpot Free, set up in an afternoon by the person who cares most, is the right answer, and it is the answer we give when it applies. The agency conversation starts at roughly 10 to 50 people, when the process stops being plain and nobody has the time to be the CRM admin. The <a href="/en/custom-crm-development">service page</a> describes what we build in that case, and the <a href="/en/custom-crm-cost">cost guide</a> puts the numbers side by side.</p>
      </section>
    </ArticleLayout>
  );
}
