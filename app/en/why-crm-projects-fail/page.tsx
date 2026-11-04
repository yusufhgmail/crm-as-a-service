import { ArticleLayout, articleMetadata, DataTable } from '../../article';
import { articleBySlug } from '../../articles';

const article = articleBySlug('why-crm-projects-fail')!;

export const metadata = articleMetadata(article);

export default function WhyCrmProjectsFailPage() {
  return (
    <ArticleLayout article={article}>
      <section>
        <h2>Where this comes from</h2>
        <p>Yusuf Young founded FunnelBud in 2015 and, before exiting it, helped more than 450 Swedish businesses with CRM, sales and marketing automation. That is a lot of CRM launches, most of them at companies with 10 to 50 people, and enough failures to see the pattern. This guide is that pattern. It is not a survey; it is what we saw, written down so you can check your own project against it.</p>
      </section>

      <section>
        <h2>The one cause and its five disguises</h2>
        <p>Every failure we saw ended the same way: the team stopped using the CRM. The reasons it stopped fall into five groups, and a project usually has two or three of them at once.</p>
        <DataTable
          caption="How CRM projects fail"
          head={['Disguise', 'What it looks like', 'What was actually wrong']}
          rows={[
            ['The spreadsheet beside it', 'A rep keeps a “temporary” sheet that becomes the real system', 'The CRM did not model the work; the sheet did'],
            ['Nobody owns it', 'Fields nobody understands, a pipeline nobody updates, an admin who left', 'The CRM needs an owner and the company could not afford one'],
            ['Data entry', 'Records are weeks behind; the CRM is updated before the sales meeting', 'The CRM asked people to type what the inbox already knew'],
            ['Designed in a workshop', 'Twelve stages, forty fields, three of each used', 'The pipeline described the company on the day of the workshop, not the work'],
            ['Nobody measured', 'The failure is discovered when the licence renews', 'Use per person was never counted, so the decline was invisible'],
          ]}
        />
      </section>

      <section>
        <h2>The spreadsheet is the diagnosis</h2>
        <p>When a CRM project is failing, there is almost always a spreadsheet, and the spreadsheet is more accurate than the CRM. Do not treat it as a discipline problem. Treat it as the requirements document you did not have: it shows exactly which objects, columns and views the work needs, because someone built it under pressure with nothing to spare. The fix for the CRM is to make it do what the spreadsheet does, and then to stop asking for anything else.</p>
      </section>

      <section>
        <h2>The number that predicts failure</h2>
        <p>Weekly active use, per person. Not logins in total, not records created, not a dashboard of activity. For each person who is supposed to use the CRM: did they update a record or complete a next step this week, yes or no.</p>
        <p>The reason it has to be per person is that teams fail one person at a time. A rep who stops updating in week three is invisible in a team total, and by week eight two more have followed and the spreadsheet is back. Per-person use shows the first drop, and the first drop is almost always a fit problem: that person’s part of the work does not match the CRM. Fix the CRM for that person that week.</p>
        <p>We measure this from the first week of every build, and we treat a drop as a defect in the CRM.</p>
      </section>

      <section>
        <h2>What to do differently</h2>
        <ol>
          <li><strong>Build from the sources, not a workshop.</strong> The inbox, the spreadsheet and the invoicing system already describe the process. Start there.</li>
          <li><strong>Make the first version smaller than feels right.</strong> One pipeline, one dashboard, the records the team already has. Widen when use proves it.</li>
          <li><strong>Remove data entry wherever the information already exists.</strong> If the quote went out by email, the CRM should know. Every field a person has to type is a reason to stop.</li>
          <li><strong>Decide who changes the CRM when the work changes</strong>, before launch. If the answer is “someone will get to it”, the project has already failed; it just has not stopped yet.</li>
          <li><strong>Count use per person weekly</strong> and act on the first drop within days.</li>
        </ol>
        <p>These five are the design of CRM From Within. The service exists because at a company of 10 to 50 people the fourth point has no good answer: there is nobody to own the CRM, and the system has to own itself, with experts behind it. The <a href="/en/custom-crm-development">service page</a> shows how, and the <a href="/en/ai-native-crm">AI-native CRM guide</a> explains what “own itself” means.</p>
      </section>

      <section>
        <h2>If you are mid-failure now</h2>
        <p>Find the spreadsheet. Ask the person who keeps it to walk you through it. List what the CRM would have to do to make the sheet unnecessary, and compare that list with what the CRM does. The gap is the project. If closing it needs an owner you do not have, the honest choices are a simpler tool the team will actually use, or a service that owns the gap for you. Renewing the licence and hoping is the one option that has never worked.</p>
      </section>
    </ArticleLayout>
  );
}
