import { ArticleLayout, articleMetadata, DataTable } from '../../article';
import { articleBySlug } from '../../articles';

const article = articleBySlug('ai-native-crm')!;

export const metadata = articleMetadata(article);

export default function AiNativeCrmPage() {
  return (
    <ArticleLayout article={article}>
      <section>
        <h2>Two things sold under the same name</h2>
        <p>“AI CRM” now appears on every vendor’s site, and it describes two different products. In the first, the CRM is the same as before, with a model added: it drafts emails, summarises calls, answers questions about the data. In the second, the model is doing the job the CRM used to need people for: keeping the records true and keeping the system matched to the work. Only the second is AI-native. The first is a good CRM with a helpful assistant.</p>
      </section>

      <section>
        <h2>The definition</h2>
        <p>A CRM is AI-native when the model, not the team, is responsible for three things:</p>
        <ol>
          <li><strong>Data entry.</strong> Contacts, companies, deals and activities are created and updated from where the work happens (email, calls, the invoicing system, the website), not typed in afterwards.</li>
          <li><strong>Noticing change.</strong> When the way the team works shifts (a new lead source, a stage that is always skipped, an account that has gone quiet), the system notices and says so.</li>
          <li><strong>Adapting.</strong> The system proposes and, once approved, makes the change to its own fields, stages and views. The team sees the change; it does not configure it.</li>
        </ol>
        <p>Everything else, including chat, is optional.</p>
      </section>

      <section>
        <h2>A test you can run in a demo</h2>
        <DataTable
          caption="AI-assisted versus AI-native"
          head={['Ask the vendor', 'AI-assisted answer', 'AI-native answer']}
          rows={[
            ['Who creates a deal?', 'A rep, from a form; AI can suggest fields', 'The system, from the quote email; the rep confirms'],
            ['We changed our process. What now?', 'Your admin edits the pipeline', 'The system noticed last week and proposed the change'],
            ['What happens to a call?', 'AI writes a summary into a notes field', 'The deal, the next step and the owner update; a question is asked if unclear'],
            ['Who configures it?', 'You, or a partner, billed', 'Nobody on your side; changes are approved, not made'],
            ['What can the AI not touch?', 'Anything, with permissions', 'Security, access and the customer table are fixed; only workflow adapts'],
          ]}
        />
        <p>The last row matters as much as the others. An AI that can change anything is a risk, not a feature. AI-native done properly means a small, fixed, tested core and a workflow layer the model is allowed to shape.</p>
      </section>

      <section>
        <h2>What it changes for a company of 10 to 50 people</h2>
        <p>The reason CRMs fail at small companies is not features. It is that someone has to design the system, fill it, and keep it matched to the work, and that someone has a real job. An AI-native CRM removes the role, not the tool. In practice:</p>
        <ul>
          <li>The CRM can be built from the existing sources (the spreadsheet, the inbox, QuickBooks) instead of from a requirements workshop, so it fits on day one.</li>
          <li>It can start narrow and widen, because widening does not need a project.</li>
          <li>It stays true, because the records update themselves; adoption stops depending on discipline.</li>
          <li>It can be owned rather than rented, because the thing you were paying the vendor for (keeping it working) is now done by the system and the people who run it.</li>
        </ul>
        <p>This is the model CRM From Within is built on: an AI-native CRM the client owns, built and kept by the service. How that works in a build is on the <a href="/en/custom-crm-development">service page</a>; the <a href="/en/build-your-own-crm">build-your-own guide</a> is for companies that want to try the idea themselves first.</p>
      </section>

      <section>
        <h2>What AI-native does not mean</h2>
        <ul>
          <li><strong>Not “no humans”.</strong> Every material change is reviewed by an expert and approved by the company. The model proposes; people decide.</li>
          <li><strong>Not “the model knows your business”.</strong> It knows your sources. When the intent is unclear it should ask, and a system that never asks is guessing.</li>
          <li><strong>Not a chatbot.</strong> Chat is a way to ask the CRM a question. It is not what makes the CRM native.</li>
          <li><strong>Not an excuse for loose data handling.</strong> Which sources the model may read, where data is stored, and how it is deleted are agreed before anything is imported. The <a href="/en/privacy">privacy page</a> shows how we handle that on this site’s own CRM-plan chat.</li>
        </ul>
      </section>
    </ArticleLayout>
  );
}
