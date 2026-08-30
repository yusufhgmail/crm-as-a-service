# Company Native strategy

**Updated:** 2026-08-30

This is the current strategy for Company Native. It governs the product vision, the source of competitive advantage and how that advantage must compound. Historical website records may describe CRM migration; migration is now a separate business.

## The business

Company Native begins by building and maintaining custom CRMs for small companies that do not have a CRM. These are greenfield builds, not migrations from HubSpot, Salesforce, Pipedrive or other software.

The end product is much simpler to buy and use: connect the team's Gmail or Microsoft 365 accounts, click **Build my CRM**, and receive a populated CRM built around how that company actually works. CRM is the complete focus of this business, not a wedge into migrating every kind of software.

## The final product vision

The finished Company Native system has two connected kinds of intelligence:

1. **An AI present inside each customer's CRM.** It understands that company's people, customers, work and goals. It observes approved activity, notices friction and stays available as the CRM changes.
2. **An umbrella AI that learns across installations.** It turns approved lessons from many customers into better ways to infer, build and improve CRMs. Those lessons should improve both new CRMs and existing installations without mixing customers' private data, code or local memory.

The system reads approved communications across the whole team, not only one person's inbox. It discovers the CRM's structure from the company's work instead of asking the customer to select a template or pre-built schema.

The local AI must learn why work happens, not only what people click. Each customer can assign trusted employees as power users. When the system encounters an unclear action, workaround or possible improvement, it can ask the relevant power user a short question at that moment: why they did it, what they were trying to accomplish or what a better result would look like. It then captures the answer as context, an improvement idea or a feature suggestion without making the employee write a separate requirements document.

The result is a CRM that keeps improving as the company uses it. Meaningful changes remain reviewable and controlled; "automatic learning" does not mean silently changing important workflows, permissions or customer data.

## The competitive advantages

### Company Native learns what to build

General AI coding tools can implement a prompt or specification. Company Native's advantage is producing the right CRM before code generation begins: discovering the company's real entities, relationships, workflows, exceptions and goals from how the team works.

### It captures intent while the work is happening

Interviews and requirements workshops depend on what people remember afterward. The local AI can connect an observed action with a power user's explanation at the relevant moment. Over time, Company Native builds a proprietary record linking what happened, why it happened, what was built and whether the result helped.

### It learns from outcomes, not feature requests alone

Every proposed structure or feature creates evidence: whether people used it, changed it, ignored it, removed it or said it improved their work. Customer satisfaction and real usage close the learning loop. This lets the system distinguish a plausible idea from something that actually works.

### Every installation can improve every other installation

Each CRM remains unique, but recurring lessons can transfer: ways to recognize a customer relationship, infer a workflow, ask a better clarification question, sequence a build, avoid a common mistake or implement a proven capability. New customers receive a better starting point, while existing customers can receive relevant improvements discovered elsewhere.

### The installed base improves quality and economics together

More customers create more observed situations, explanations, CRM structures, corrections and outcomes. That should make future builds faster and more accurate, reduce manual intervention, improve reusable components and lower the cost of serving each customer. Better and cheaper results can attract more customers, which creates more learning.

### CRM focus makes the learning reusable

Company Native compounds one repeatable process: building CRMs for companies that do not have one. Combining CRM building with general software migration or company-model fine-tuning would dilute the learning. Those are separate businesses because their inputs, risks, technical systems and repeatable methods differ.

### Ownership creates trust without depending on lock-in

The customer owns its CRM, code and data. Company Native must retain customers because it keeps producing useful improvements, not because leaving makes the software unusable. The defensible advantage is the learning and operating system behind the service, not control over a customer's assets.

## How compounding is built into every installation

Customer count alone is not a moat. Every installation must run the same learning loop:

1. **Observe with permission.** Understand approved team communications and CRM activity while keeping raw customer information inside that customer's boundary.
2. **Ask at the useful moment.** Let assigned power users explain an unclear action, exception, workaround or goal without creating a separate software project.
3. **Capture the intent.** Record what the person was trying to accomplish and turn useful answers into structured improvement ideas.
4. **Build or suggest the smallest useful change.** Connect the observed need to a CRM structure, workflow, feature or clarification question.
5. **Measure what happened.** Record adoption, corrections, rejection, repeated use, saved work and customer satisfaction.
6. **Separate the reusable lesson from the customer's private context.** Keep raw communications, local memory, code and customer-specific rules separate. Share only approved patterns, reusable components, evaluation methods and outcome signals.
7. **Test the lesson elsewhere.** A pattern becomes part of the umbrella system only when it helps beyond one anecdote and does not import the first customer's assumptions into another company.
8. **Improve new and existing CRMs.** Use validated lessons in future CRM generation and offer relevant improvements to current installations through controlled, reviewable updates.

This creates the intended flywheel:

**More installations → more observed needs and measured outcomes → better CRM inference and components → faster, better and cheaper CRMs → more satisfied customers → more installations.**

## How the roadmap creates the moat

### 1. Manually build the first greenfield CRMs

The first builds create the reference material that generic AI builders lack. They must be instrumented from the beginning. For every important design choice, record the evidence that prompted it, the customer's explanation, what was built, what changed after use and whether the result helped.

Three to five installations can reveal the first patterns and decide what to automate next. They are a starting sample, not proof that the system can generalize.

### 2. Put the local learning AI inside the CRMs

Build the observation and power-user question loop before trying to automate the entire CRM. The immediate goal is to capture improvement ideas and connect them to measured results with less manual interviewing.

### 3. Build the umbrella learning system

Create the shared pattern library, reusable components, evaluation records and release process that allow one installation to improve another safely. The umbrella system must know which lessons are broadly useful, which apply only to a type of company and which must stay local.

### 4. Build the one-click CRM product

Once the system can infer useful CRM structures and improve them from real evidence, turn the service into the **Build my CRM** experience. Connect Gmail or Microsoft 365, generate and populate the CRM, then use conversation and observed outcomes to refine it.

### 5. Reduce manual work as the evidence permits

Automate repeated, well-understood decisions first. Keep people involved where the system lacks evidence, where a change affects permissions or important workflows, or where the customer wants direct judgment. Full self-service is the direction, not an assumption that every decision can already be automated.

## What the system must measure

The strategy is compounding only if later customers and existing installations become observably better. Track:

- Time from connection or discovery to the first useful CRM.
- How much of the generated structure customers keep after real use.
- Manual corrections required per installation.
- Adoption, repeated use, work removed and customer satisfaction.
- Improvement ideas found by the system, accepted by power users and proven useful.
- Reusable patterns and components that help more than one customer.
- Whether each new group of installations is faster to build and needs fewer corrections than the previous group.
- Whether existing installations improve because of lessons first discovered elsewhere.
- Privacy, permission or cross-customer leakage incidents, with a required target of zero.

Do not set impressive-looking performance claims before the first installations establish honest baselines.

## Privacy and control boundaries

- Raw communications, customer-specific memory, code and operational data stay separate for each customer.
- Cross-customer learning uses approved derived patterns, reusable engineering components and measured outcomes, not another customer's messages or secrets.
- Each customer chooses its power users and what the system may observe. Power users can dismiss, pause or disable proactive questions.
- Questions should be short, relevant to the work happening at that moment and limited enough that the AI does not become an interruption system.
- Material workflow, permission, security and data changes must be explainable, reversible and approved before release.
- The customer must be able to see what the local AI learned and which proposed improvement came from it.

The exact technical and contractual implementation still needs to be designed and validated. The public website must describe the intended protection honestly rather than imply that it already exists.

## What customers and investors should each see

The public customer website should lead with the experience and benefit:

- Connect the team's email and receive a CRM built around the company.
- The CRM understands what the team is doing and asks selected people why when useful.
- Ideas and improvements are captured without a requirements project.
- The CRM keeps improving and benefits from lessons learned across many installations.
- The customer's private data, CRM and code remain its own.

The investor version should explain the business engine behind that experience:

- The proprietary link from team activity and stated intent to CRM structure and measured satisfaction.
- The installed-base learning flywheel and why both new and existing installations improve.
- Reusable inference methods, evaluation records, components and operating systems.
- Falling build time and manual effort as the system learns.
- Why focusing only on greenfield CRM makes the learning more repeatable.
- The privacy architecture that permits shared learning without pooling customer secrets.

As on the Runs Like Us vision concept, the customer story and investor story should be separate routes. The customer should not have to read a platform or moat pitch to understand why the product helps. Investors should be able to inspect the compounding mechanism, its economics and the evidence still required.

## What must be proven

The strategy remains a hypothesis until real installations show that:

- Team communications contain enough information to create a useful first CRM.
- Power users answer contextual questions and those answers improve the product.
- Useful CRM patterns transfer across different companies without forcing them into the same template.
- Usage and satisfaction can be measured well enough to guide learning.
- Existing installations benefit from cross-customer lessons, not only new customers.
- Build time and manual work fall as the number of installations grows.
- The privacy boundary works technically, contractually and in customer perception.

If those effects do not appear, customer count is growth but not a compounding moat. The roadmap must then change based on what the installations actually teach us.
