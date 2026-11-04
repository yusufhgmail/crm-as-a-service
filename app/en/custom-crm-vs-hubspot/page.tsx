import { ArticleLayout, articleMetadata, DataTable } from '../../article';
import { articleBySlug } from '../../articles';

const article = articleBySlug('custom-crm-vs-hubspot')!;

export const metadata = articleMetadata(article);

export default function CustomCrmVsHubspotPage() {
  return (
    <ArticleLayout article={article}>
      <section>
        <h2>The comparison most people make, and the one that matters</h2>
        <p>The usual comparison is features: does the custom CRM have sequences, does HubSpot have the stage we need. It is the wrong comparison, because both can have any feature given enough configuration or code. The comparison that matters at a company of 10 to 50 people is about three things: what you own, who changes the system when the work changes, and what the bill does as the team grows.</p>
      </section>

      <section>
        <h2>Side by side</h2>
        <DataTable
          caption="HubSpot versus a custom CRM built and kept as a service"
          head={['', 'HubSpot (Professional)', 'Custom CRM via CRM From Within']}
          rows={[
            ['What you own', 'An account and the right to export', 'The code, the data, the hosting'],
            ['Fit to your process', 'Configured to approximate it', 'Built from it'],
            ['Who changes it', 'Your admin or a partner, when they have time', 'The service, within days, approved by you'],
            ['Data entry', 'Mostly manual, with AI assists', 'Mostly from the sources; the team confirms'],
            ['Cost as the team grows', '$90 per new seat per month, forever', 'No per-seat fee'],
            ['Cost if you stop', 'Cancel at renewal; keep an export', 'Keep the system; pay only hosting'],
            ['Integrations', 'Large marketplace', 'Built for what you use; fewer, deeper'],
            ['Risk', 'Lock-in and configuration debt', 'Dependence on the service to keep adapting; mitigated by owning the code'],
            ['Three years, 20 people', '$66,300–111,500 incl. onboarding', '$39,000–75,000 incl. proof'],
          ]}
          source={<>HubSpot figures from <a href="https://www.hubspot.com/pricing/sales" rel="noopener">hubspot.com/pricing</a> (annual billing, sales seats, plus onboarding fees), checked 4 November 2026. The full working is in the <a href="/en/custom-crm-cost">cost guide</a>.</>}
        />
      </section>

      <section>
        <h2>Ownership: what you are holding in year four</h2>
        <p>With HubSpot, year four looks like year three: the same licence, plus the seats added since. If you leave, you take an export and leave the configuration, the automations, the reports and three years of muscle memory behind. That is not a complaint about HubSpot; it is what renting is.</p>
        <p>With a custom CRM you own, year four costs hosting plus whatever you pay to keep it adapting. If you stop paying the service, the system keeps running as it is. You could hand the code to a developer, or to another service. The money you spent produced an asset rather than a subscription.</p>
      </section>

      <section>
        <h2>Change: the real cost of configuration</h2>
        <p>HubSpot can be made to do most things. The question is who makes it do them. In a 20-person company that is a part-time admin, usually a salesperson or the office manager, or a partner agency on a retainer. Either way, a change takes a ticket, a wait, and a risk that the change breaks a report nobody remembered. Over three years the account accumulates configuration debt: fields nobody uses, workflows nobody dares to delete.</p>
        <p>A custom CRM as a service inverts this. The system notices the work has changed, proposes the change, an expert checks it, you approve it, and it is live within days and reversible. Nobody on your team touches configuration. The <a href="/en/ai-native-crm">AI-native CRM guide</a> explains how that works and where its limits are.</p>
      </section>

      <section>
        <h2>Growth: the seat count only goes up</h2>
        <p>Every new hire who touches a customer needs a HubSpot seat. At $90 a month for Professional, ten hires over three years add $32,400 to the bill, and nobody ever removes a seat. A custom CRM has no seat price; adding a person is adding a login. For a company that expects to grow from 15 to 40 people, this one line decides the comparison.</p>
      </section>

      <section>
        <h2>When HubSpot is still the right call</h2>
        <ul>
          <li><strong>You are small and the pipeline is plain.</strong> HubSpot Free, set up in an afternoon, wins. We say this in the first conversation.</li>
          <li><strong>Marketing is the main job.</strong> HubSpot’s Marketing Hub is a mature product. Many companies keep it and move only the CRM.</li>
          <li><strong>You rely on a dozen marketplace apps.</strong> List them. If most would need rebuilding, the migration cost is real and should be in the comparison.</li>
          <li><strong>Someone on the team loves being the admin.</strong> Then the configuration cost is near zero and the rented model works.</li>
        </ul>
        <p>Outside those cases, for a company that has outgrown Free and does not want a CRM project, the <a href="/en/hubspot-alternative">HubSpot alternative guide</a> covers what moving involves, and the <a href="/en/custom-crm-development">service page</a> describes what gets built.</p>
      </section>
    </ArticleLayout>
  );
}
