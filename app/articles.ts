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
];

export const articleBySlug = (slug: string) => articles.find((article) => article.slug === slug);
