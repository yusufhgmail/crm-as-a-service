// The guides: one page per search query, English only (see
// docs/SEO-CONTENT-PLAN.md). The sitemap, llms.txt, the home-page links and
// the JSON-LD all read this list, so a guide exists everywhere or nowhere.

export type Faq = { question: string; answer: string };

export type Article = {
  /** URL is /en/<slug>. */
  slug: string;
  /** Browser tab and Google headline, 60 characters or fewer. */
  title: string;
  /** Meta description, 160 characters or fewer. */
  description: string;
  /** The H1: the query, as a reader would type it. */
  heading: string;
  /** Small label above the H1. */
  kicker: string;
  /** The 40–60 word direct answer under the H1. What AI assistants quote. */
  answer: string;
  /** One line for llms.txt. */
  summary: string;
  published: string;
  modified: string;
  faq: Faq[];
};

export const articles: Article[] = [
  {
    slug: 'custom-crm-development',
    title: 'Custom CRM development service | CRM From Within',
    description: 'A custom CRM built around how your company already works, migrated from HubSpot or spreadsheets, and kept fitting by us. You own the code.',
    heading: 'Custom CRM development, done as a service',
    kicker: 'SERVICE',
    answer: 'CRM From Within builds a custom CRM around the way a company already handles leads and customers, moves the data in, and keeps changing the CRM as the work changes. The company owns the software outright. The team never configures or administers it: the system observes the work, asks when something is unclear, and every change is tested and approved before it goes live.',
    summary: 'what the custom CRM service includes, how a build runs, what it costs to start, and who should use HubSpot Free instead.',
    published: '2026-11-04',
    modified: '2026-11-04',
    faq: [
      { question: 'How long does a custom CRM build take?', answer: 'The first useful version takes weeks, not months, because it starts narrow: one pipeline, the contacts and companies the team already has, and one dashboard. It widens from there as the work shows what is missing.' },
      { question: 'Do we need a developer or a CRM admin on our side?', answer: 'No. That is the point of the service. One person on your side approves changes and answers questions when the system asks them. Nobody has to configure fields, build automations or maintain anything.' },
      { question: 'What happens to our data if we stop?', answer: 'You own the code and the data, so you keep both. Export, deletion, hosting and access are agreed in writing before any real customer information is imported.' },
      { question: 'Is a custom CRM better than HubSpot?', answer: 'Not always. If a generic pipeline is enough and someone on the team is happy to set it up, HubSpot Free is the better choice. A custom CRM is for companies where the main problem is having to design, populate and adapt the CRM themselves.' },
    ],
  },
  {
    slug: 'custom-crm-cost',
    title: 'How much does a custom CRM cost? | CRM From Within',
    description: 'What a custom CRM costs from a development shop, from a HubSpot partner, and as a service, next to HubSpot and Salesforce licences for a 20-person team.',
    heading: 'How much does a custom CRM cost?',
    kicker: 'COST',
    answer: 'A custom CRM from a development shop is usually quoted in the tens of thousands of dollars and takes months. A HubSpot setup by a partner costs a few thousand dollars and then $90 to $150 per seat every month. CRM From Within starts with a paid proof of about $3,000 and then $1,000 to $2,000 a month, which includes the changes, and the client owns the result.',
    summary: 'the real cost of a custom CRM next to HubSpot and Salesforce licences and partner fees, for a 20-person team over three years.',
    published: '2026-11-04',
    modified: '2026-11-04',
    faq: [
      { question: 'Why is HubSpot cheap to start and expensive later?', answer: 'The free tier and Starter are priced to get a team in. The features a growing team needs, such as sequences, custom reporting and approvals, sit in Professional at $90 per seat per month and Enterprise at $150, and both carry an onboarding fee. The bill grows with every seat.' },
      { question: 'Does a custom CRM have ongoing costs?', answer: 'Yes: hosting, which is small for a company of 10 to 50 people, and whoever keeps it fitting the work. With CRM From Within the monthly fee covers both. Without it, the cost is the time of whoever maintains the system.' },
      { question: 'What does the $3,000 paid proof include?', answer: 'One painful workflow rebuilt beside your current CRM or spreadsheet, with your real data, so you can judge the fit before committing to the monthly service. Selected design partners get the first version without a build fee.' },
    ],
  },
  {
    slug: 'crm-agency',
    title: 'What a CRM agency does, and what it should cost',
    description: 'What CRM agencies, consultants and implementation services do, how they charge, how to choose one, and the difference between renting a CRM and owning one.',
    heading: 'What a CRM agency does, and what it should cost',
    kicker: 'CHOOSING HELP',
    answer: 'A CRM agency sets up and runs a company\'s CRM so the company does not have to. Most agencies are partners of HubSpot or Salesforce: they configure software the client rents, charge a setup fee and sometimes a retainer, and the client keeps paying licences. CRM From Within is a CRM agency that builds software the client owns instead, and keeps adapting it for a monthly fee.',
    summary: 'what CRM agencies, consultants and implementation services do, how they charge, and how to choose one.',
    published: '2026-11-04',
    modified: '2026-11-04',
    faq: [
      { question: 'What is the difference between a CRM consultant and a CRM agency?', answer: 'A consultant advises and often configures; an agency also runs the system afterwards. The titles overlap. What matters is who maintains the CRM once the project ends and what you keep paying for it.' },
      { question: 'What is a CRM implementation service?', answer: 'The project of setting up a CRM: choosing the pipeline stages, importing contacts and deals, connecting email and the website, and training the team. Partners charge a fixed fee for it, from a few thousand dollars upwards, on top of the software licence.' },
      { question: 'How do I know if an agency is any good?', answer: 'Ask who will use the CRM in six months and how they will know. Adoption is where CRM projects fail. An agency that measures weekly use per person after launch is accountable for the result, not just the setup.' },
    ],
  },
  {
    slug: 'hubspot-alternative',
    title: 'HubSpot alternative for small business: own your CRM',
    description: 'When HubSpot is still the right choice, when it gets expensive, and what moving to a custom CRM you own involves, including the migration.',
    heading: 'A HubSpot alternative for small business: own the CRM instead of renting it',
    kicker: 'HUBSPOT ALTERNATIVE',
    answer: 'For many small businesses HubSpot Free is the right CRM and there is no reason to leave. It becomes expensive when a team of ten or more needs Professional or Enterprise features and pays $90 to $150 per seat every month. The alternative is a custom CRM the company owns: one build, a migration, no licences, and changes made by an agency instead of the team.',
    summary: 'when to stay on HubSpot, when it gets expensive for a 10–50 person team, and what a migration to an owned CRM involves.',
    published: '2026-11-04',
    modified: '2026-11-04',
    faq: [
      { question: 'Can we keep HubSpot for marketing and move only the CRM?', answer: 'Yes. Many companies keep Marketing Hub for email and forms and move contacts, companies, deals and the sales process to the owned CRM. The two stay connected through HubSpot\'s API.' },
      { question: 'How long does a HubSpot migration take?', answer: 'Exporting the data takes an afternoon; HubSpot lets you export contacts, companies, deals, notes and emails. Mapping it to a CRM that fits the work takes longer, and that mapping is the part worth getting right.' },
      { question: 'What do we lose by leaving HubSpot?', answer: 'The marketplace of integrations and the familiarity. If the team relies on a dozen HubSpot apps, list them before deciding; each one is either rebuilt, replaced or kept through the API.' },
    ],
  },
  {
    slug: 'crm-for-quickbooks',
    title: 'CRM for QuickBooks: the options that actually sync',
    description: 'The three ways to get a CRM that works with QuickBooks Online or Desktop: Method CRM, HubSpot with a connector, or a CRM built to read QuickBooks directly.',
    heading: 'CRM for QuickBooks: the options that actually sync',
    kicker: 'QUICKBOOKS',
    answer: 'A company that runs on QuickBooks has three real CRM options: Method CRM, which is built for QuickBooks and syncs customers, estimates and invoices both ways; HubSpot or another rented CRM with a QuickBooks connector, which syncs some objects one way; or a CRM built around the company that reads QuickBooks directly, so nothing has to be entered twice. The right one depends on how much of the sales process lives outside QuickBooks.',
    summary: 'the three CRM options for a company on QuickBooks Online or Desktop, what each syncs, and where sync breaks in practice.',
    published: '2026-11-04',
    modified: '2026-11-04',
    faq: [
      { question: 'Does QuickBooks have a built-in CRM?', answer: 'No. QuickBooks keeps customers, estimates, invoices and payments, which is the back half of a sale. It has no leads, no pipeline, no activity log and no follow-up. That is why every CRM for QuickBooks is a separate product that syncs with it.' },
      { question: 'Does HubSpot sync with QuickBooks?', answer: 'HubSpot has a QuickBooks Online integration that syncs invoices, contacts and products, with limits on direction and on which fields map. QuickBooks Desktop needs a third-party connector. Check which objects sync which way before relying on it.' },
      { question: 'What usually breaks in a QuickBooks sync?', answer: 'Duplicates, because the CRM and QuickBooks each create a customer record for the same company; customer-specific price lists that do not exist in the CRM; and estimates edited in one system after they were sent from the other. The fix is one system of record per object, agreed before the sync is switched on.' },
    ],
  },
  {
    slug: 'crm-for-distributors',
    title: 'CRM for distributors and wholesalers that fits the work',
    description: 'What a CRM for a B2B distributor or wholesaler has to handle: reorder cycles, customer price lists, rep routes, QuickBooks, and the spreadsheet it replaces.',
    heading: 'CRM for distributors and wholesalers: what it has to handle',
    kicker: 'DISTRIBUTORS',
    answer: 'A distributor\'s CRM is not a sales pipeline. Most revenue comes from existing accounts reordering, so the CRM has to track reorder cycles, customer-specific pricing, the rep\'s route and the parent-site structure of accounts, and read QuickBooks for what was actually invoiced. Generic CRMs model a deal that closes once. A distributor needs a CRM shaped around accounts that buy every few weeks.',
    summary: 'why a generic pipeline CRM fails a small B2B distributor or wholesaler, what the CRM has to model instead, and how the spreadsheet gets replaced.',
    published: '2026-11-04',
    modified: '2026-11-04',
    faq: [
      { question: 'Do distributors need a CRM or an ERP?', answer: 'Both do different jobs. The ERP or QuickBooks holds inventory, orders and invoices. The CRM holds the relationship: who to call, when they usually reorder, what was quoted, what the rep learned on the last visit. Small distributors often run the second job in a spreadsheet, which is what the CRM replaces.' },
      { question: 'What is the best CRM for a small wholesale business?', answer: 'The one that models accounts that reorder, not deals that close. That rules out most pipeline CRMs unless they are heavily customised. Options are an industry-specific distribution CRM, a general CRM bent to fit, or a CRM built around the company\'s own reorder and route logic.' },
      { question: 'Can the CRM read our price lists?', answer: 'It should. Customer-specific pricing usually lives in QuickBooks or the ERP. A CRM that cannot see it produces wrong quotes. A built CRM reads the price list from the system that owns it instead of copying it.' },
    ],
  },
  {
    slug: 'crm-for-contractors',
    title: 'CRM for contractors: from first call to final invoice',
    description: 'What a CRM for a contracting business has to cover: leads from the phone, estimates, the job stages between quote and invoice, crews in the field, follow-up.',
    heading: 'CRM for contractors: from the first call to the final invoice',
    kicker: 'CONTRACTORS',
    answer: 'A contractor\'s CRM has to follow a job, not a deal: the call or form that started it, the site visit, the estimate, the approval, the scheduling, the work, the change orders and the invoice. Most of that happens on a phone in a truck. The CRM that works is the one the office and the crew both touch without typing, built around the stages the business actually uses.',
    summary: 'what a contractor\'s CRM has to cover from lead to invoice, why field-service apps and generic CRMs each miss half of it, and what a built CRM looks like.',
    published: '2026-11-04',
    modified: '2026-11-04',
    faq: [
      { question: 'What is the difference between a CRM and field service software for contractors?', answer: 'Field service software (Jobber, Housecall Pro, ServiceTitan) runs the job: scheduling, dispatch, invoicing. A CRM runs the relationship before and after: the lead, the estimate follow-up, the repeat customer. Many contractors need both halves and end up with one tool plus a spreadsheet for the other.' },
      { question: 'Do small contractors need a CRM?', answer: 'A one-truck operation can run on a phone and a notebook. The CRM question starts when estimates go out and nobody follows up, when two people answer the phone, or when the owner cannot say which leads from last month turned into jobs.' },
      { question: 'Can a contractor CRM work from a phone?', answer: 'It has to. If logging a site visit takes more than a tap and a voice note, the crew will not do it. A CRM for contractors is judged on what it captures without typing: calls, photos, the estimate sent, the approval received.' },
    ],
  },
  {
    slug: 'build-your-own-crm',
    title: 'Can you build your own CRM with AI? What works',
    description: 'What happens when a small business builds its own CRM with Claude or ChatGPT: what works in a weekend, what breaks in month three, and a prompt to start with.',
    heading: 'Can you build your own CRM with AI?',
    kicker: 'BUILD YOUR OWN',
    answer: 'Yes. With Claude, ChatGPT or a coding tool, a non-developer can get a working CRM in a weekend: contacts, companies, a pipeline, notes. What is hard is not the build but the next six months: keeping it running, changing it as the work changes, and keeping customer data safe while doing so. This guide gives the prompt to start with and tells you where it stops.',
    summary: 'what a small business can build itself with AI, where a self-built CRM breaks after launch, and a copyable prompt to start from.',
    published: '2026-11-04',
    modified: '2026-11-04',
    faq: [
      { question: 'What is the cheapest way to build your own CRM?', answer: 'A spreadsheet or Airtable with a few views is the cheapest and takes an hour. The next step up is a small web app generated with an AI coding tool and hosted for a few dollars a month. Both are free of licences; both are owned by whoever built them, including the maintenance.' },
      { question: 'Is it safe to put customer data in a self-built CRM?', answer: 'Only if someone owns the security: access control, backups, updates to the libraries it depends on, and a plan for deleting data on request. Those are the parts a weekend build skips and the parts a company is liable for.' },
      { question: 'Build it ourselves or have it built?', answer: 'Build it yourself if one person enjoys the job and will keep doing it. Have it built, and kept, if the point is a CRM that fits without anyone on the team owning a software project. The cost guide puts the two side by side.' },
    ],
  },
  {
    slug: 'ai-native-crm',
    title: 'What is an AI-native CRM? A plain definition',
    description: 'An AI-native CRM is one where the AI does the data entry and the adapting, not a chatbot bolted on. The definition, a test, and what it means for small firms.',
    heading: 'What is an AI-native CRM?',
    kicker: 'DEFINITION',
    answer: 'An AI-native CRM is a CRM where the model does the work people used to do to keep the CRM true: reading email and calls to update records, noticing when the process has changed, and changing the CRM to match. A CRM with an AI assistant added to the same forms is AI-assisted, not AI-native. The test is whether the team still has to type and configure.',
    summary: 'a plain definition of AI-native CRM, the difference from an AI-assisted one, a test to tell them apart, and what it changes for a small business.',
    published: '2026-11-04',
    modified: '2026-11-04',
    faq: [
      { question: 'Is HubSpot an AI-native CRM?', answer: 'No, by this definition. HubSpot is a configured CRM with AI features (Breeze) added on top of the same objects and forms. Those features help, but the team still configures the system and still types most of what is in it.' },
      { question: 'Does an AI-native CRM need a chatbot?', answer: 'No. The chat is the least important part. What matters is what happens without anyone asking: records updated from the inbox, a deal moved because the invoice was sent, a question raised when a pattern changed.' },
      { question: 'Is an AI-native CRM safe with customer data?', answer: 'It is only as safe as the boundaries around the model. Security, access and the customer table should be fixed and tested, and the model should only be allowed to change workflow, with every change approved and reversible. A system that lets the model edit anything is not safe.' },
    ],
  },
  {
    slug: 'why-crm-projects-fail',
    title: 'Why CRM projects fail, and how to see it coming',
    description: 'Why CRM projects fail at small companies: adoption, not features. The five patterns from 450 FunnelBud customers and how to measure adoption weekly.',
    heading: 'Why CRM projects fail, and how to see it coming',
    kicker: 'ADOPTION',
    answer: 'CRM projects at small companies fail for one reason that wears five disguises: people stop using the system. The CRM did not match the work, so a spreadsheet grew beside it; nobody owned it; data entry was a chore; the pipeline was designed in a workshop, not from reality; and nobody measured use. The fix is to measure weekly use per person from launch and treat a drop as a defect in the CRM, not the team.',
    summary: 'the five ways CRM projects fail at 10–50 person companies, seen across 450 FunnelBud customers, and the one weekly number that predicts it.',
    published: '2026-11-04',
    modified: '2026-11-04',
    faq: [
      { question: 'What percentage of CRM projects fail?', answer: 'Published estimates over the past two decades range from a third to well over half, depending on how failure is defined. We do not rely on those figures. In the FunnelBud years, across more than 450 businesses, the failures we saw had a consistent shape, and that shape is what this guide describes.' },
      { question: 'How do you measure CRM adoption?', answer: 'Count, every week, how many of the people who should use the CRM actually did: logged in, updated a record, completed a next step. Per person, not in total. A single person dropping out is the early warning; a team-wide average hides it.' },
      { question: 'Can a failing CRM be rescued?', answer: 'Usually, if the cause is fit rather than the tool. Find the spreadsheet that replaced it, rebuild the CRM around what the spreadsheet does, and remove everything else. If nobody will own that rebuild, the honest options are a simpler tool or a service that owns it.' },
    ],
  },
  {
    slug: 'custom-crm-vs-hubspot',
    title: 'Custom CRM system vs HubSpot: a 3-year comparison',
    description: 'A custom CRM system versus HubSpot for a 10–50 person company: ownership, who changes it, the three-year cost, and when HubSpot is still the right call.',
    heading: 'Custom CRM system vs HubSpot: what you own after three years',
    kicker: 'COMPARISON',
    answer: 'After three years on HubSpot a 20-person company has paid $66,000 to $111,000 in licences and onboarding and owns an export. After three years with a custom CRM built and kept as a service it has paid $39,000 to $75,000 and owns the system. The money is close; the difference is what you are left holding, who could change it, and what the fourth year costs.',
    summary: 'custom CRM system versus HubSpot for a 10–50 person company: what you own, who makes changes, growth, lock-in, and the three-year numbers.',
    published: '2026-11-04',
    modified: '2026-11-04',
    faq: [
      { question: 'Is a custom CRM more expensive than HubSpot?', answer: 'Over three years for a 20-person team, a custom CRM as a service costs about the same or less than HubSpot Professional. Over five years it is clearly less, because the licence keeps running and the ownership does not. For a team of five on HubSpot Free, HubSpot is cheaper by any measure.' },
      { question: 'What does “custom CRM system” mean?', answer: 'A CRM whose objects, stages and views are built for one company\'s process, rather than a general product configured to approximate it. It can be built by a development shop, by the company itself, or built and run by a service that keeps adapting it.' },
      { question: 'Can we move from HubSpot to a custom CRM later?', answer: 'Yes. HubSpot exports contacts, companies, deals, notes and emails. The migration is mostly the work of mapping those to a process that fits, which is also the most useful part. The HubSpot alternative guide walks through it.' },
    ],
  },
  {
    slug: 'salesforce-alternative',
    title: 'Salesforce alternative for small business: own it',
    description: 'When Salesforce is too much for a 10–50 person company, what the usual alternatives change, and what a custom CRM you own involves instead.',
    heading: 'A Salesforce alternative for small business: own the CRM instead',
    kicker: 'SALESFORCE ALTERNATIVE',
    answer: 'Salesforce is built for companies with an admin, often several. A company of 10 to 50 people that bought it usually ends up paying per seat for a system it uses a tenth of and cannot change without help. The alternatives are a lighter rented CRM, which keeps the model and lowers the bill, or a custom CRM the company owns and a service keeps adapting, which removes both the licence and the admin.',
    summary: 'when Salesforce is too much for a small company, what the usual alternatives change, and what moving to an owned CRM involves.',
    published: '2026-11-04',
    modified: '2026-11-04',
    faq: [
      { question: 'Why do small companies leave Salesforce?', answer: 'Three reasons we hear most: the per-seat cost once Starter is outgrown, the dependence on an admin or partner for every change, and the gap between the configured pipeline and how the team actually works. The last one is the one that stops people using it.' },
      { question: 'Can we export our data from Salesforce?', answer: 'Yes. Salesforce exports every object to CSV, including custom ones, attachments and activity history. The export is the easy part. Mapping it to a CRM that fits the work is where the time goes, and where a migration earns its keep.' },
      { question: 'Is HubSpot a good Salesforce alternative?', answer: 'For many small companies, yes: HubSpot Free is simpler and Professional is competitive. It is still a rented, configured CRM. If the problem with Salesforce was cost alone, HubSpot helps. If it was fit and admin, the HubSpot guide explains where the same problem returns.' },
    ],
  },
];

export const articleBySlug = (slug: string) => articles.find((article) => article.slug === slug);
