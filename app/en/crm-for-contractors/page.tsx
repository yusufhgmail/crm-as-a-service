import { ArticleLayout, articleMetadata, DataTable } from '../../article';
import { articleBySlug } from '../../articles';

const article = articleBySlug('crm-for-contractors')!;

export const metadata = articleMetadata(article);

export default function CrmForContractorsPage() {
  return (
    <ArticleLayout article={article}>
      <section>
        <h2>The job is the unit, and it has more stages than a deal</h2>
        <p>A sales CRM models a deal: lead, qualified, proposal, won. A contracting job has twice as many steps, and most of them happen after “won”: the site visit, the estimate, the approval and deposit, the scheduling, the materials, the work itself, the change order nobody wrote down, the final walkthrough, the invoice, the review request. A CRM that stops at “won” leaves the office tracking the second half in a calendar and a group chat.</p>
        <p>That is why contractors end up with two systems: something for leads and estimates, something for jobs and invoices, and a person in the office who copies between them. The copying is where things get lost.</p>
      </section>

      <section>
        <h2>What the CRM has to capture, and where each thing comes from</h2>
        <DataTable
          caption="A contracting job, stage by stage"
          head={['Stage', 'What happens', 'Where the information already is']}
          rows={[
            ['Lead', 'A call, a web form, a referral text', 'The phone log, the website, someone’s messages'],
            ['Site visit', 'Photos, measurements, what the customer said', 'A phone in a truck'],
            ['Estimate', 'Sent, opened, questioned, revised', 'Email, the estimating tool'],
            ['Approval', 'A yes, a signature, a deposit', 'Email, the payment processor'],
            ['Scheduling', 'Crew, dates, materials ordered', 'The calendar, the supplier’s order confirmation'],
            ['Work and change orders', 'What was actually done and what was added', 'The crew lead’s head, until it is written down'],
            ['Invoice and payment', 'Final amount, paid or chased', 'QuickBooks or the invoicing tool'],
            ['Follow-up', 'Review request, warranty, the next job', 'Usually nowhere'],
          ]}
        />
        <p>The useful observation is the third column. Almost every stage already leaves a trace somewhere. The CRM’s job is to read those traces and keep one record of the job, so that the office can see every job at a glance and the crew never has to type what the phone already knows.</p>
      </section>

      <section>
        <h2>Why the two usual choices each miss half</h2>
        <ul>
          <li><strong>Field service apps</strong> (Jobber, Housecall Pro, ServiceTitan and the like) are good at the second half: scheduling, dispatch, invoicing, payments. Leads and estimate follow-up are thin or absent, so the pipeline lives in the owner’s inbox. For a business that does mostly repeat service calls, that can be fine.</li>
          <li><strong>Generic CRMs</strong> (HubSpot, Pipedrive) are good at the first half and know nothing about a job. The deal is “won” and the record goes quiet while the real work, and the real problems, happen.</li>
          <li><strong>Both, connected by a person.</strong> This is what most contractors with 10 to 50 people actually run. It works until that person is on holiday.</li>
        </ul>
      </section>

      <section>
        <h2>A CRM built around the contractor’s own stages</h2>
        <p>CRM From Within builds the CRM from the sources the business already uses: the phone system, the inbox, the estimating tool, the calendar, QuickBooks. The system reads them, lays out the stages the business actually goes through (a roofer’s and a remodeler’s are not the same), and asks the office a focused question when something is unclear. The first version is narrow: every open job on one screen with its stage and next step, estimates that have not been answered flagged after three days, and the invoice attached to the job the day it is sent.</p>
        <p>For the crew, the test is simple: a site visit is logged by taking the photos and leaving a voice note, and the CRM does the rest. If the crew has to open a form, the CRM has already failed.</p>
        <p>What a build includes is on the <a href="/en/custom-crm-development">service page</a>. The <a href="/en/custom-crm-cost">cost guide</a> compares the monthly fee with per-seat licences, which matter for a business where every crew lead would need a seat.</p>
        <p className="guide-note">[Example to add: one contracting client, the trade, how many jobs open at once, and what the unanswered-estimate flag recovered.]</p>
      </section>

      <section>
        <h2>The numbers that tell you the CRM is working</h2>
        <ol>
          <li><strong>Estimate response time.</strong> Days from estimate sent to a yes, a no or a chase. Most lost jobs are estimates nobody followed up.</li>
          <li><strong>Lead to job rate</strong>, by source. Which of the phone, the website and referrals actually turns into work.</li>
          <li><strong>Change orders written down</strong> versus change orders argued about at invoice time.</li>
          <li><strong>Days from job complete to invoice sent.</strong> The cheapest cash-flow fix in the business.</li>
        </ol>
        <p>A CRM that cannot show these four numbers without a spreadsheet is not yet doing the job. That is also how we judge a build in its first month.</p>
      </section>
    </ArticleLayout>
  );
}
