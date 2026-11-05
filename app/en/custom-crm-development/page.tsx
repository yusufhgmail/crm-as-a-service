import { ArticleLayout, articleMetadata } from '../../article';
import { articleBySlug } from '../../articles';

const article = articleBySlug('custom-crm-development')!;

export const metadata = articleMetadata(article);

export default function CustomCrmDevelopmentPage() {
  return (
    <ArticleLayout article={article}>
      <section>
        <h2>What “custom CRM development” means here</h2>
        <p>Most custom CRM development is a software project: a development shop takes a requirements document, builds to it over several months, hands over the code and leaves. The company then owns a system that matches how it worked on the day the requirements were written, and nobody to change it.</p>
        <p>CRM From Within does it the other way round. There is no requirements document. The CRM is built from the places where customer work already happens, such as inboxes, spreadsheets, call logs and the handoffs between people, and it keeps being adapted after launch. The company owns the code at every stage. The adapting is the service.</p>
      </section>

      <section>
        <h2>What gets built</h2>
        <p>The first version is deliberately narrow. It covers the work the team already does, so there is nothing new to learn and nothing to fill in for the sake of the system:</p>
        <ul>
          <li><strong>Contacts, companies and history</strong> from the approved sources, deduplicated and linked.</li>
          <li><strong>Incoming leads</strong> from the website, email and the phone, landing in one place with an owner and a next step.</li>
          <li><strong>Opportunities that update themselves</strong> from what happens in email and calls, instead of waiting for someone to move a card.</li>
          <li><strong>One pipeline and one dashboard</strong> built on the numbers the company already uses, not the ones a CRM vendor thinks it should.</li>
          <li><strong>Logged calls and meetings</strong>, and outreach to leads, once the basics are trusted.</li>
        </ul>
        <p>Security, customer data and access are fixed, tested parts that do not change from company to company. The workflow around them is what gets adapted.</p>
      </section>

      <section>
        <h2>How a build runs</h2>
        <ol>
          <li><strong>Observe.</strong> The company approves the sources the system may read. The system looks at how leads and customers actually move through them, and asks a focused question whenever the intent is unclear. Nobody fills in a questionnaire.</li>
          <li><strong>Build the first useful version.</strong> Weeks, not months, because it is narrow. The team uses it for real work while it is still being shaped.</li>
          <li><strong>Review before the team relies on it.</strong> An expert checks what the system inferred. Anything wrong is corrected before real customer data drives decisions.</li>
          <li><strong>Keep adapting.</strong> When the work changes, the CRM changes. Every material change is tested, approved by the company and reversible. The team sees the change; it does not make it.</li>
        </ol>
      </section>

      <section>
        <h2>Who it is for, and who should use HubSpot Free</h2>
        <p>The fit is a company of roughly 10 to 50 people whose customer work does not match a generic sales pipeline, and where nobody wants to own a CRM project. Typical signs: the real process lives in a spreadsheet someone guards, the CRM that was bought is half-filled, or the team has outgrown HubSpot Free but dreads the setup that Professional needs.</p>
        <p>It is not for everyone. If a generic pipeline is enough and someone on the team is happy to configure it, <a href="https://www.hubspot.com/pricing/sales" rel="noopener">HubSpot Free</a> is the better choice, and we say so in the first conversation. The <a href="/en/hubspot-alternative">HubSpot alternative guide</a> covers where that line sits.</p>
      </section>

      <section>
        <h2>What it costs to start</h2>
        <p>Two ways in. Selected design partners get the first useful version without a build fee, in exchange for a real test and honest feedback. Everyone else starts with a paid proof of about $3,000 that rebuilds one painful workflow beside the current CRM or spreadsheet, with real data. After that, running and adapting the CRM is $1,000 to $2,000 a month, which includes the changes. The <a href="/en/custom-crm-cost">cost guide</a> puts that next to HubSpot, Salesforce and a conventional development quote.</p>
      </section>

      <section>
        <h2>Who builds it</h2>
        <p>CRM From Within is run by Yusuf Young, who founded a CRM company in 2015 and helped more than 450 businesses with CRM, sales and marketing automation before exiting it. The pattern behind this service comes from those years: the CRM projects that failed did not fail on features. They failed because the system did not match the work, and the people who were supposed to maintain it had other jobs.</p>
      </section>
    </ArticleLayout>
  );
}
