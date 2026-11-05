import { ArticleLayout, articleMetadata, DataTable } from '../../article';
import { articleBySlug } from '../../articles';

const article = articleBySlug('build-your-own-crm')!;

export const metadata = articleMetadata(article);

const prompt = `I run a [type of business] with [N] people. We handle leads and customers like this today:
- Leads come in by [phone / web form / email / referrals].
- We track them in [a spreadsheet / inboxes / nothing].
- A typical customer goes through these steps: [list the real steps, in your words].
- The numbers I actually look at are: [e.g. open quotes, jobs this week, who hasn't ordered].
- We invoice in [QuickBooks / other].

Build me the smallest CRM that fits this. Rules:
1. Start with exactly what we do now. Do not add a stage, field or feature we did not mention.
2. One screen that answers my top question above, one list of contacts/companies, one place for notes.
3. Tell me, before writing code, what you are unsure about and ask me. Do not guess our process.
4. Keep customer data in one place I control, with a backup and a way to export everything.
5. Explain what I will have to do each month to keep this running, honestly.`;

export default function BuildYourOwnCrmPage() {
  return (
    <ArticleLayout article={article}>
      <section>
        <h2>What you can build in a weekend</h2>
        <p>More than most people expect. Give Claude or ChatGPT a plain description of how your company handles customers and ask for the smallest CRM that fits, and you will get a working app: contacts, companies, a pipeline with your stages, notes, a dashboard. With a coding tool such as Claude Code, Cursor or Lovable it can be hosted by Sunday evening. No licence, no per-seat fee, and it matches your process because you described it.</p>
        <p>We mean this. CRM From Within is built on the same idea, and the prompt below is close to what we start from. The difference is in what happens after the weekend.</p>
      </section>

      <section>
        <h2>The prompt to start with</h2>
        <p>Replace the brackets with your own words. The rules at the end matter more than the description: they stop the model from building a generic CRM with your logo on it.</p>
        <pre className="guide-prompt">{prompt}</pre>
        <p>Rule 3 is the one most people skip. A model that is not told to ask will invent your process. The questions it asks back are the most useful output of the first session; answer them before any code is written.</p>
      </section>

      <section>
        <h2>Where it breaks: month three</h2>
        <p>The weekend build works. The problems arrive when the business changes and the build does not.</p>
        <DataTable
          caption="What a self-built CRM needs after launch"
          head={['Month', 'What happens', 'What it needs']}
          rows={[
            ['1', 'The team uses it. Someone asks for a field.', 'Someone who can change it without breaking it.'],
            ['2', 'A new lead source appears. Two records for the same customer.', 'Deduplication, and a rule for which system creates customers.'],
            ['3', 'The person who built it is busy. The spreadsheet quietly returns.', 'Adoption measured weekly, and changes made within days, not “when I get to it”.'],
            ['4', 'A library the app depends on has a security update.', 'Someone watching for it, and a test that the update broke nothing.'],
            ['6', 'A customer asks for their data to be deleted. A laptop with the only backup dies.', 'A real backup, an export, access control, and a written answer to “where is our data”.'],
          ]}
        />
        <p>How much work is that, in hours? At Yusuf’s old CRM company, checked against its records, the typical customer took about three hours of setup and support a month. A few took twenty-six to forty. Three hours a month is a bargain if someone has them; the problem is that at a company of 10 to 50 people those three hours belong to someone with another job, and the month they are skipped is the month the spreadsheet comes back.</p>
        <p>None of these is hard for a developer. All of them are a job, and the job is the reason companies pay for CRM software in the first place. A self-built CRM moves that job from the vendor to whoever on your team built it.</p>
      </section>

      <section>
        <h2>What people who tried it say</h2>
        <p>In October 2026 we tagged 7,165 public posts and reviews by people who pay for a CRM. The usual caveat applies: public posts lean negative, so the counts describe complaints, not the whole market. Among them, 631 said they built their own CRM and it worked, 40 said it failed, and 75 were building one as they wrote. That is a better record than most people expect, and it fits what we see: the build is not the hard part. Yusuf Young’s view of the rented alternative, from the years selling it: “What they’re actually buying is a standard process that they have to adapt to.”</p>
      </section>

      <section>
        <h2>Three honest paths</h2>
        <ol>
          <li><strong>Build it and own the job.</strong> Right if one person on the team wants it and will keep wanting it. Budget a few hours a month forever. Keep the prompt above; re-run it when the process changes.</li>
          <li><strong>Rent a CRM.</strong> HubSpot Free or a cheap seat elsewhere. Right if a generic pipeline fits and nobody wants to build anything. The <a href="/en/hubspot-alternative">HubSpot guide</a> covers where that stops.</li>
          <li><strong>Have it built and kept.</strong> What CRM From Within does: the CRM is built from your real sources the way the prompt describes, you own the code, and the month-three problems are our job for a monthly fee. What that includes is on the <a href="/en/custom-crm-development">service page</a>, and the <a href="/en/custom-crm-cost">cost guide</a> prices it.</li>
        </ol>
      </section>

      <section>
        <h2>If you do build it yourself: five rules from our builds</h2>
        <ul>
          <li><strong>Read the existing sources before designing anything.</strong> The spreadsheet and the inbox already contain the process. Import them first; design from what you find.</li>
          <li><strong>Make the first version smaller than feels right.</strong> One pipeline, one dashboard. Every extra field is a field someone has to fill in.</li>
          <li><strong>Separate what changes from what must not.</strong> Stages, fields and views change monthly. Access control, backups and the customer table should be boring and never touched casually.</li>
          <li><strong>Every change gets tested on a copy first</strong>, with real data, and can be undone. The model will happily rewrite your customer table; do not let it do so in production.</li>
          <li><strong>Count who used it this week.</strong> If the number drops, the CRM is wrong, not the team. Change the CRM.</li>
        </ul>
      </section>
    </ArticleLayout>
  );
}
