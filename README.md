# CRM From Within

CRM From Within builds an SME's first CRM around how that company already works. Companies with an existing CRM are a secondary audience: they can start with the replacement and use paid services for data migration and deeper customization.

The current strategy and roadmap are in [`docs/STRATEGY.md`](docs/STRATEGY.md). The website decision and verification log is in [`docs/WEBSITE-ITERATIONS.md`](docs/WEBSITE-ITERATIONS.md).

## Current stage

CRM From Within is in development. The immediate business is a paid, hands-on service for approximately five reference customers. Each build must generate three things:

- a useful CRM for the customer;
- revenue and reusable implementation patterns;
- direct evidence about what the customer uses, changes and values.

The primary customer is an SME without a CRM, using spreadsheets, inboxes, chat or memory to track leads and customers. The secondary customer already has a CRM but wants a better fit.

## Confirmed roadmap — 30 August 2026

1. Manually build CRMs for approximately five reference customers. Earn service revenue and learn what makes a first CRM genuinely useful.
2. Build the AI learning system on top of those installations. Connect build decisions, real usage and customer satisfaction so the system learns what works.
3. Launch **Build your first CRM** for the lower end of the market. The self-builder provides a free CRM; paid services make it substantially better and handle migration for customers coming from another CRM.
4. Improve the self-builder continuously. Over time, automate more of both new CRM creation and migration from existing CRMs.

## Business boundaries

CRM migration is a secondary CRM From Within service because it helps customers move into a CRM built by CRM From Within. **Company Native** remains the separate business for replacing other kinds of generic software, in [`custom-software-migration`](https://github.com/yusufhgmail/custom-software-migration). Works Like Us remains the separate company-model business.

## Public website

The main customer website is live at `crmfromwithin.com`, with English at `/en` and Swedish at `/se`. Its main action is a short conversational first-CRM plan. `www.crmfromwithin.com` redirects to the canonical `.com`, while `crmfromwithin.ai` and `www.crmfromwithin.ai` redirect to the matching path on `.com`. The separate `crm-final-vision/` site remains the product-endgame presentation and is not the main website.

The conversational assistant runs on Cloudflare Workers AI. Qualified leads are stored in Cloudflare D1. The private funnel dashboard at `/internal/funnel` connects anonymous visits and completed conversations to later lead outcomes without analytics cookies or a persistent visitor identity.

## Brand and infrastructure

CRM From Within is the company and product brand; CRM is the complete focus of this business. The current editable brand kit is in `brand/`, the shareable guide is `output/pdf/crm-from-within-brand-guide.pdf`, and the website-ready mark and social card are in `public/`. Older Company Native source files remain in the brand folders as historical material.

The site uses Next.js through Vinext and deploys to Cloudflare Workers with `crmfromwithin.com` as the canonical domain. `crmfromwithin.ai` redirects to the `.com`. The Worker keeps its existing internal service name so its dashboard secret and production history remain intact.
