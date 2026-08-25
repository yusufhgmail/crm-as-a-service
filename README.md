# Company Native

**Created:** 2026-08-22 by Yusuf Young
**Status:** `companynative.com` was registered and launched on 2026-08-24. The buyer-reviewed website is live in English at <https://companynative.com/en> and Swedish at <https://companynative.com/se>. The conversational assessment runs on Cloudflare Workers AI and qualified leads are stored in Cloudflare D1.

**Brand architecture:** Company Native is the company and the larger category. CRM is the first offering on the main Company Native website; no second domain or product subdomain is needed.

**Social:** The Company Native LinkedIn page is live at <https://www.linkedin.com/company/companynative/>. The X account is awaiting the platform's required new-account verification.

**Brand:** The Company Native identity was frozen on 2026-08-24 after six buyer-perspective rounds. The Coremark expresses a structured system adapting around one distinct company core. The complete editable kit is in `brand/`; the shareable guide is `output/pdf/company-native-brand-guide.pdf`.

## The Problem

Mid-market companies are trapped between expensive, generic SaaS (HubSpot, Salesforce, Pipedrive) and the impossibility of building custom software themselves. They pay $50K-$200K/year for CRMs that sort-of fit, customize them into fragile messes, and still can't do what they actually need.

## The Offering

Not software you buy. A **service** that builds and maintains custom software for your business.

"We build and maintain a custom CRM that replaces HubSpot, Salesforce, and Pipedrive. Cheaper, better, and yours."

## The Moat: Observe-Learn-Spec-Build

This is not Claude Code or "AI builds your app." It's a proprietary internal system that:

1. **Observes** how you use your current software (what features you touch, what workflows you follow, where you hit friction)
2. **Learns** what you actually use, what you need, what you should have but don't
3. **Auto-generates specs** based on observed usage patterns, not interviews or assumptions
4. **Plans** development in optimal stages (what to build first for maximum value)
5. **Builds** the custom software (delivered as a service by us)
6. **Deploys** and maintains it ongoing

The observation/learning/spec engine is the moat. No customer can replicate it. A competitor would need to build the entire pipeline from scratch.

## Why This Is Different From "AI Code Generation"

Claude Code, Cursor, Devin: they take a spec and write code. They don't know what to build.

CRM As A Service knows what to build *before* it builds. It watches how you work, understands your actual needs, and generates the spec itself. The code generation is the easy part. Understanding the need is the hard part, and that's what we own.

## Roadmap (Redesigned Aug 25, 2026)

### Step 1: Build CRMs manually for reference customers
Find SMEs that need a CRM (don't have one yet). Build their CRM by hand. This gives us code, patterns, and real customer satisfaction data to learn from. Revenue from day one.

### Step 2: Build the self-improving system
Take what we learned from manual builds and build a system that learns and self-improves those CRM systems. Measure customer happiness. The system gets better with each deployment.

### Step 3: Build the "Build your new CRM" button
A website with a button that says "Build your new CRM." Click it, connect Gmail/Office, system builds the CRM on the fly. Still paired with services for the hard parts. This is "Lovable for CRM."

### Step 4: Automate more and more
Reduce the service layer over time. Fewer and fewer manual interventions needed. The product approaches full self-service.

### Key Decision: New CRM, Not Migration (Innovator's Dilemma)
Start with SMEs that need a NEW CRM, not ones migrating from an existing one. This is the innovator's dilemma play: attack from the bottom where incumbents can't or won't compete.

Go after customers who have nothing today - small companies that just want something simple that works. Deliver extremely cheaply with LESS risk because:
- No data to lose, no migration liability
- No expectations of enterprise-grade features
- "Something from nothing" = even a basic CRM is a massive improvement over spreadsheets + memory
- No field mapping, no user retraining, no "why doesn't it do X that Salesforce did?"

Incumbents (HubSpot, Salesforce) can't go downmarket - their cost structure, sales process, and feature complexity are built for companies with CRM budgets and admins. They literally can't serve a 5-person company. By the time the flywheel makes this profitable at scale, they can't catch up.

Migration becomes a feature later, once the engine is proven. Beachhead = greenfield SMEs.



## Vision Websites

Two websites needed:
1. **Current vision website** - The service offering (CRM As A Service). What we do today: "We build and maintain a custom CRM for your business."
2. **Final vision website** - The product endgame: "Click this button. Get your new CRM." A landing page where the entire product is a button. This is the dream.

**Note (Aug 25): "Replace any software" is a DIFFERENT idea, not an expansion of this one.** Auto-CRM reads customer communications and builds a CRM. Replace-any-software reads how you use existing software and migrates you. Different input, different engine, different problem. CRM is not a wedge to something bigger. It is the complete vision.

## Target Customer

Mid-market companies ($1M-$50M revenue) with:
- 6-figure SaaS budgets
- No internal engineering team
- Painful, expensive, generic software
- Need for customization that SaaS can't provide

## Business Model

Service-based: monthly retainer + build fee. The customer pays less than their current SaaS bill and gets custom software that fits their exact needs.

## Connection to Other Ventures

- **Aether:** The agent runtime that powers the observation/learning/spec engine. Aether agents observe customer workflows, learn from them, and generate specs.
- **Enterprise LLM:** The ultimate evolution. Same philosophy: sovereign, custom, owned by the company.
- **Holdflight JV (if it proceeds):** Magnus's dev team + AI platform could build the observation/learning system. Yusuf brings domain expertise, market entry (US), and product vision.

## Origin

Validated through Elvy (a potential customer who confirmed the pain points but passed on the project). Yusuf owns the idea. Vision doc created Aug 11, 2026.

## The Endgame: Auto-CRM from Email (Aug 25, 2026)

CRM As A Service is the service layer. The endgame is a **product**: Auto-CRM from Email.

**The product:** One click. Connect Gmail/Office. The system reads your email, builds a new CRM from scratch, populates all your customer data, then keeps learning and improving. You talk to it conversationally to fix things, reorganize, ask questions about your whole org.

**Target audience:** SMEs that don't have a CRM yet. "Lovable for CRM" positioning.

**How we get there:** See the redesigned Roadmap above (4 steps: manual builds -> self-improving system -> the button -> full automation).

**Why service-first:** You earn revenue from day one while building the training data. You learn what SMEs actually need by doing it manually. Then you productize what you've validated. Same destination, but sequenced so you earn while you learn.

**Why this is better than building the product from scratch:** You'd be guessing what SMEs need in a CRM, building email-parsing infrastructure, and hoping auto-generation works. That's years of R&D before revenue. The service path gives you paid validation for every pattern you later automate.

**The moat compounds:** The observation/learning engine from CRMaaS still applies, arguably stronger. Instead of learning from dozens of custom builds, you're learning across thousands of email-to-CRM mappings. Every new user makes the auto-generation better.

**This doesn't replace CRMaaS. It IS CRMaaS, evolved.** The service becomes the manual version of what the product does automatically.

## Three Core Principles (from Magnus correspondence, Aug 25)

1. **Team-level reading, not just individual.** The system reads the whole team's communications - not just one person's inbox. It builds a CRM that reflects how the team actually works together.

2. **Cross-customer satisfaction learning.** The system understands which customers are satisfied and which aren't, and learns from that for future implementations. Every deployment makes the next one better. This is the flywheel: the system gets smarter about what makes a CRM work for SMEs with every new customer.

3. **Emergent structure, not pre-designed.** The CRM shape is discovered from the data, not decided in advance. No templates, no pre-built schemas. The system reads your communications and figures out what YOUR CRM needs to look like. Every CRM is unique because every business is unique.

## What Happens Next

1. Use the frozen website, social assets and one-pagers to bring the first relevant visitors into the assessment.
2. Use the acquisition funnel and first customer conversations to improve qualification and the V0 offer.
3. Replace generic explanations with approved customer evidence as the first implementations create proof.

## Customer acquisition tracking

The private dashboard at `https://companynative.com/internal/funnel` follows anonymous visits through the assessment or direct-contact path and then through personal follow-up, a pilot proposal and a won customer. It does not use analytics cookies or retain a cross-visit visitor identity. Completed assessments and contact requests inherit the source, campaign, message and language from the link that brought the visitor.

Use the dashboard's campaign-link builder for every post, ad, partner link and outreach message that should be compared. Update each lead's outcome after follow-up; that is what connects marketing activity to the goal of 10 customers. If a buyer returns later without the tagged link, correct the source and campaign from what the buyer tells you. Cloudflare Web Analytics remains the broader aggregate traffic check, while this dashboard answers which sources and messages produce useful leads and customers.
