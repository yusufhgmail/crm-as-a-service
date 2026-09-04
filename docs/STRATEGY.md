# CRM From Within strategy

**Updated:** 2026-09-01
**Status:** Candidate product direction. The audience, importance of the problem, advantage over alternatives and ability to deliver at scale are the next questions to validate.

## The decision

CRM From Within is the managed adaptive-CRM path for established SMEs that do not have a useful CRM and do not want to become CRM designers, administrators or developers. Its finished experience is simple: show how customer work happens, receive a production-ready CRM shaped around the company, and keep using it while the system and CRM experts safely adapt it.

Company Native is the separate premium migration path for established companies leaving HubSpot, Salesforce or another rented system. It owns the discovery, replacement, migration and sovereignty promise. CRM From Within should not dilute its simple entry point with enterprise migration language.

The two businesses may share a tested CRM core, CRM patterns, integration adapters and learning methods. They have different customer jobs, value propositions, sales processes, ownership promises and economics.

The customer-facing distinction is:

- **CRM From Within:** the customer should not need to customize the CRM. The product learns, asks focused questions and is adapted for the customer as a managed service.
- **Company Native:** the customer owns the replacement and has the freedom to change it through Company Native, its own team or another qualified partner. Self-hosting, portability and AI sovereignty are part of the offer.

## The next thing to prove: is this the right strategy?

This is the highest-priority CRM From Within question. Pricing, architecture and automation choices remain provisional until there is stronger evidence that the complete market strategy works.

We need conviction in four connected claims:

1. **Audience:** There is a reachable group of companies that wants a CRM to work around its process but does not want to configure, customize or administer the system itself. The present hypothesis is established SMEs without a dedicated CRM administrator; that segment must be validated rather than assumed.
2. **Problem:** Their current compromise—spreadsheets, a rigid simple CRM or a flexible CRM that becomes a project—causes enough missed work, poor adoption, administration or process loss to justify switching and paying. The problem must be materially important compared with free CRM products, consultants and ordinary setup services.
3. **Solution advantage:** A managed CRM that learns, asks focused questions and is safely adapted for the customer produces a more useful outcome than installing an existing CRM, hiring a conventional consultant or building with a general-purpose coding tool. Customers must experience the difference rather than merely agree that the idea sounds better.
4. **Scalable delivery:** CRM From Within can deliver that better fit without expert time, support cost and customer-specific complexity rising roughly in proportion to the number of customers. Later builds must become faster, safer and less dependent on manual work while preserving the customized result.

These claims form one strategy. Finding a suitable audience is not enough if the pain is weak. Finding painful problems is not enough if standard CRM and consultants solve them almost as well. Producing a better CRM is not enough if every customer requires a new consulting project.

Conviction should come from real customer behavior: qualified companies giving access to the work, using the resulting CRM, preferring it to the available alternatives, keeping it, requesting valuable improvements and requiring progressively less expert work per successful installation. Website reactions and interviews can identify the strongest hypothesis, but continued use, willingness to pay and improving delivery economics are the decisive evidence.

## Who CRM From Within is for

The primary customer is an established SME whose customer work has become too important for spreadsheets, inboxes and memory, but whose team has no dedicated CRM administrator and does not want a software project. A useful starting hypothesis is roughly 5–30 customer-facing employees inside a larger small or mid-sized company; this range must be tested rather than treated as a fixed qualification rule.

CRM From Within creates the most value when:

- several people need the same customer picture;
- follow-up or handoffs are being missed;
- useful history is trapped in individual inboxes or notes;
- the company wants a CRM but does not want to design or administer one;
- a focused CRM can cover the important work without reproducing a large software suite.

Most companies have process differences. That fact alone does not make them customers. CRM From Within creates material value when those differences affect adoption, handoffs, reporting, repeated work or customer outcomes enough that a generic CRM is no longer the easiest answer.

A standard free CRM is the better choice when a generic contacts-and-deals pipeline is enough, the company is willing to configure it, and the team does not need a substantially different workflow. CRM From Within must not pretend that every company needs custom software.

## The customer promise

The finished promise is:

> A production-ready CRM that shapes itself around your company as you use it.

The customer should never need to become the product manager for its CRM. CRM From Within observes the approved work, proposes what should change, asks the power user only the questions that activity cannot answer, and makes approved changes safely.

The customer should receive:

- contacts and companies found from approved sources;
- customer history brought into one place;
- likely opportunities, owners and next steps suggested with evidence;
- a small pipeline, useful views and dashboards generated around the company;
- reliable synchronization without repeated manual logging;
- a clear way to correct the AI or ask an expert for a change;
- paid additions only when a special feature or integration creates enough value.

The product must begin useful. A blank database followed by a configuration wizard is not the intended experience.

## What is available now

The one-click builder is a product direction, not a completed public product. The current offer should be a small design-partner program:

1. A company applies for its first CRM.
2. CRM From Within qualifies whether a focused build can help.
3. Selected companies receive a first useful version without a build fee.
4. A human verifies the generated structure and important records before the company relies on it.
5. The company uses the CRM and shows what is right, wrong or missing.
6. Ongoing hosting, expert changes and integrations become paid only after the first version proves useful.

This is not yet a permanent free plan. A free plan would create uptime, support and long-term entitlement obligations before the automatic builder and economics are proven.

## The product architecture

CRM From Within can generate ordinary customer-specific code, but it should not let AI freely reinvent every safety-critical part of every CRM. Each customer may receive a separate repository, database and deployment. The reliable foundation should still come from tested, versioned components and contracts.

### The trusted core

These parts should be deterministic, shared and heavily tested:

- authentication and account recovery;
- users, roles and permissions;
- contact, company and identity matching;
- duplicate detection, merge rules and conflict handling;
- incremental email and calendar synchronization;
- record provenance and links back to supporting activity;
- audit history, undo and change approval;
- backups, exports, deletion and retention controls;
- deployment, monitoring and safe upgrades;
- migration accounting and reconciliation when data is imported;
- reusable tests for records, permissions, integrations and workflows.

These are shared because reliability matters more than uniqueness. Rebuilding them freely for each customer would multiply security failures, inconsistent behavior and maintenance work without giving the customer useful differentiation.

### What should be generated for each company

These parts should adapt to the customer:

- the objects and relationships the company needs;
- the company’s terminology;
- fields, stages, pipelines and handoffs;
- views, queues and dashboards;
- suggested next actions and opportunity rules;
- customer-specific workflows and automation;
- special interfaces for sales, delivery or service;
- integrations and extensions that create enough value to justify the work.

The long-term system may generate ordinary code in a separate repository and deployment for each customer. Fields, objects, workflows, screens, reports and customer-specific logic do not all need to exist as fixed product modules. The generator may write them directly from a specification, reuse a proven implementation pattern or install a reusable component when that is the safest route.

The important boundary is not “module or no module.” It is:

- shared, tested infrastructure where failure would affect security, data integrity or every customer;
- generated customer code where uniqueness creates value;
- stable interfaces between the two so generated changes can be tested, deployed and rolled back without corrupting the foundation.

### How prior customer code should be reused

The builder may learn from previous implementations, but it should not blindly read and copy every customer repository. Code alone does not reveal why a feature existed, whether it worked, whether users adopted it or whether it contains private rules and credentials.

The reusable learning record should connect:

1. The customer situation and desired outcome.
2. The observed work and the explanation from the power user.
3. The implementation or code pattern used.
4. The tests and acceptance criteria.
5. The corrections requested after use.
6. Whether the change was adopted and created the intended benefit.

With the appropriate ownership and privacy permission, AI can retrieve this evidence, inspect approved reusable code and adapt the pattern for another customer. Raw customer data, secrets and customer-specific business logic do not become a general code library by default.

### What AI should decide

AI is useful for ambiguous interpretation:

- finding likely customers and opportunities in conversations;
- extracting context, commitments and next steps;
- proposing a data model and workflow;
- recognizing work that happens outside a normal sales pipeline;
- mapping imported fields into the new structure;
- asking a person why an exception or handoff matters;
- generating company-specific views, workflows and code;
- suggesting improvements after observing use.

Every important AI conclusion should show the activity or explanation behind it. Low-confidence conclusions become questions or review items, not silent facts.

### What humans must still decide

People remain responsible for decisions where activity does not reveal intent or where an error could cause material harm:

- which accounts, history and sources the system may read;
- why the company follows a particular process;
- which exceptions are important rather than accidental;
- permissions, private-data boundaries and retention;
- important workflow and automation changes;
- migration cutover and reconciliation;
- whether a generated CRM is ready for the team;
- special features and integrations whose value and risk require judgment.

Expert involvement is not a failure of the product. Consultation is part of the product because observed behavior cannot reveal whether a process is intentional, obsolete or strategically important. The system should listen to the conversation, convert it into a proposed change and acceptance tests, then let the expert resolve the difficult decisions. The goal is to reduce a conventional multi-week consulting engagement to a small number of well-prepared expert hours.

Safe rollback is a core product promise. Every material change should be versioned, tested against customer-specific acceptance tests, shown in a staging environment when appropriate, approved and reversible.

## Hosting and instance model

The default CRM From Within offer should be managed cloud hosting. Smaller teams are buying a CRM that works without administration; self-hosting would give them another system to operate.

The leading architecture hypothesis is a separate customer deployment and database, operated through a shared Company Native control plane. A dedicated virtual machine for every customer is technically possible, but it is not automatically the best isolation or cost model. A separate application deployment, database, credentials and encryption boundary may provide the useful isolation with less operational work. Dedicated infrastructure remains available when regulation, scale or customer policy justifies it.

Central services may include provisioning, signed core updates, monitoring, billing, the approved pattern library and reusable integration adapters. Customer records and credentials stay within the customer boundary unless a narrowly defined service requires otherwise.

An integration with Gmail, Microsoft 365, HubSpot, telephony or another external system should normally be implemented once as a tested adapter. Each customer instance receives isolated credentials, configuration, queues and logs. Customer-specific behavior may be generated around the adapter without rebuilding the transport, authentication and retry logic.

## Twenty as a possible foundation

Twenty demonstrates that the technical foundation is realistic: it provides an extensible, self-hostable CRM core, code-based applications and normal web-development tooling. It also validates the distinction in this strategy: Twenty primarily gives technical teams the ability to shape the CRM, while CRM From Within would shape and operate it for non-technical teams.

Twenty is mostly licensed under AGPLv3. Its current licence adds an application exception allowing applications built through its published APIs, app formats, function runtime, component renderer and SDKs to use a separate licence, including a proprietary one. Modifying the Twenty core itself keeps the AGPL obligations, including offering the corresponding source to network users. Some SDK and application packages are MIT-licensed; some enterprise files use a commercial licence. Twenty trademarks are not included. [Twenty licence](https://github.com/twentyhq/twenty/blob/main/LICENSE)

This means CRM From Within could potentially use an unmodified or lightly modified Twenty core and keep customer-specific applications separate through the official application interfaces. It could also fork and rebrand the AGPL core if it follows the licence and trademark obligations and makes the covered source available as required. It should not copy arbitrary Twenty source into proprietary customer code. A commercial implementation requires a file-level licence audit and legal review before the architecture is committed.

### Learn from Twenty without copying it

Whether or not Twenty becomes part of the product, its public repository is a valuable research source. CRM From Within should study how Twenty models CRM records, custom objects, permissions, search, activities, integrations, application extensions, testing and deployment. Its issue history is equally useful because it shows where a flexible production CRM becomes difficult or unreliable.

The preferred independent-build method is:

1. Study Twenty and other relevant CRMs to identify requirements, architecture choices, recurring failures and observable behavior.
2. Turn those findings into our own plain product specifications, data contracts, threat model and behavioral tests without copying implementation code or distinctive internal structure.
3. Build a fresh implementation in our own repository from those specifications. The implementation process should not use the Twenty source as a code-generation prompt.
4. Keep source provenance and run similarity checks so generated code can be traced and suspiciously close implementations can be replaced.
5. Use the resulting tests to verify that the new system delivers the necessary CRM behavior while remaining designed for separate customer instances, generated customer workflows, safe updates and rollback.

This is a legitimate and valuable shortcut: software ideas, systems and methods can inform an independent implementation, while Twenty’s particular source code and expression remain subject to its licences. The differentiation is not inventing contacts, pipelines or permissions again. It is building the best system for creating and safely adapting a CRM around each company.

## The learning system

Each installation should create a structured record connecting:

1. What approved work the system observed.
2. What the customer said it was trying to accomplish.
3. What CRM structure or feature was proposed.
4. What was built and why.
5. What the customer corrected, removed or accepted.
6. What people actually used.
7. Whether the change removed work or improved the customer outcome.

Cross-customer learning should use approved derived patterns and evaluation results. Raw communications, private customer memory, credentials, customer-specific code and operational data stay separated.

More CRMs become an advantage only when later builds take less expert work, require fewer corrections and produce more useful first versions.

## Ownership and portability

CRM From Within’s free or low-cost product may run on a shared, reliable platform. Customers must control their data and have a clear export and deletion path. The exact licence for generated code, generic platform modules and separate deployments is not yet settled and must not be overstated publicly.

Full source-code ownership, self-hosting and freedom from continuing software licence fees are central to Company Native’s premium migration offer. CRM From Within may later offer an owned deployment as an upgrade, but it is not the reason the first-CRM product exists.

## Commercial model to test

Do not finalize pricing before observing what customers use and request.

The working model is:

- **First useful CRM:** free for a small number of qualified design partners while the builder is being proven.
- **Managed CRM:** recurring payment for hosting, synchronization, backups and support once the operating cost and value are understood.
- **Expert improvements:** scoped feature work or improvement credits for workflows, dashboards, automation and interfaces.
- **External integrations:** separately scoped because permissions, failure handling, supplier limits and end-to-end testing create more risk.
- **Migration or owned deployment:** routed to Company Native when the company is replacing an established system or requires full code and infrastructure ownership.

The free first version should create learning and demonstrate value. It must not become unlimited unpaid consultancy. The free product is a narrow acquisition route; the company-specific adaptation and expert responsibility are the paid value.

## Product roadmap

### 1. Prove five focused first CRMs

Build for qualified companies with no useful CRM. Record the inferred needs, human corrections, time spent, modules used and actual adoption. Do not automate before the repeated problem is understood.

### 2. Build the reliable CRM core

Standardize identity, permissions, records, synchronization, deduplication, provenance, audit, backups and deployment. These modules must become more reliable with every customer.

### 3. Automate the first useful output

Generate contacts, companies, activity history, likely opportunities, follow-ups, one focused pipeline and the first useful dashboard. Keep important inferences reviewable.

### 4. Turn expert changes into reusable patterns

Capture why a change was requested, how it was implemented, whether it worked and when it transfers to another company. Build a controlled library of components and tests.

### 5. Open the self-serve builder gradually

Broaden access only when a new company can reach a useful CRM without unsafe inference or disproportionate support. Keep people involved for sensitive access, important workflow changes and integrations.

## What must be measured

- How many qualified companies approve access or otherwise provide usable source material.
- Time from application to first useful CRM.
- How much of the generated structure survives real use.
- Human corrections and expert hours per first build.
- Duplicate, synchronization and inference errors.
- Weekly use by the people the CRM was built for.
- Work removed, missed follow-up reduced and customer satisfaction.
- Requests for paid improvements or integrations.
- Recurring operating and support cost per customer.
- Whether later builds become faster and need fewer corrections.

## The failure test

CRM From Within is not working as a scalable product if companies accept a free build but do not keep using it, if the AI repeatedly needs a human to reconstruct the CRM, if support cost grows with every customer, or if customers rarely request valuable paid improvements.

In that case, the business is either a manual CRM service or should be paused while Company Native pursues the higher-value migration market.

## Open questions to resolve through the first builds

- Do smaller teams request enough continued adaptation to support a managed improvement business, or do they mainly want a good initial setup that rarely changes?
- Is the strongest first segment defined by company size, the absence of a CRM administrator, one industry or the frequency of non-standard customer work?
- Should every managed customer receive a separate repository and deployment, or can the earliest version use a shared application with strong workspace isolation while preserving a later export path?
- Should the first technical version use Twenty as an unmodified core with separate applications, fork the AGPL core or build a narrower independent foundation?
- Which generated changes can be deployed automatically, and which always require expert review, customer approval or a staged release?
- Which code, design decisions and outcome signals may be learned across customers, under what consent, and how is customer-specific intellectual property excluded?
- What does the customer own in the managed CRM From Within offer: data and export only, its generated application code, or an optional owned deployment upgrade?
- Can expert time fall fast enough across the first five to ten builds to create attractive margins without weakening the promise that the CRM keeps adapting?
