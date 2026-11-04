# SEO content plan (3 Nov 2026)

Built on `SEO-KEYWORDS-2026-11-03.md` and the 25 Oct plan. Goal: pages that rank on Google for what buyers type, and that ChatGPT, Claude and Perplexity quote when asked about custom CRMs, CRM agencies and HubSpot alternatives.

## Rules for every page

Learned from Upbridge; each one is checkable.

- **One query per page**, in the title, the H1 and the first sentence. No two pages for the same query.
- **A direct answer of 40–60 words straight under the H1.** This is what AI assistants quote.
- **Real numbers and sources.** HubSpot Professional ≈ $90/user/month, Enterprise ≈ $150; a 20-person team pays $1,800–3,000 a month; partner setups cost $3k–75k; about half of CRM projects miss their goals. Every number links to where it came from.
- **A build story or a real example** in each page. The pages must not be the same page with a niche name swapped; Google treats that as doorway pages.
- **Dated, with an author.** `dateModified` from `PAGE_DATES`, Yusuf as author, Article JSON-LD.
- **An FAQ of 3–5 questions** at the end, in the `faq.ts` pattern so the FAQPage markup reads the same text.
- **In the sitemap, in `llms.txt`, and in `check-seo.mjs` PAGES** before it goes live. `npm run check:seo` fails otherwise. The check also fails any guide under 700 words of body text and any pair of guides sharing more than 25% of their 5-word phrases (the doorway guard).
- **Internal links**: every article links to the home page and to the custom-CRM-development page; the home page links to the three Tier 1 pages.
- **Plain language.** The voice of the site, not agency copy.

## The pages

Order follows the 12-week plan: Tier 1 in weeks 1–2 (with the site rewrite), Tier 2 in weeks 3–4, Tier 3 during weeks 5–8 as the video topics are produced. Two pages a week is enough.

### Wave 1: service pages (weeks 1–2)

**Drafted 4 Nov 2026** on the branch, as `app/en/<slug>/page.tsx` with the shared layout in `app/article.tsx` and the metadata in `app/articles.ts`. All four pass `check:seo`. The text is a draft for Yusuf to read before deploy: the prices ($3,000 proof, $1,000–2,000 a month) follow the 25 Oct plan, and the HubSpot figures were checked against hubspot.com on 4 Nov.

| # | Page | Query it owns | What it says |
|---|---|---|---|
| 1 | `/custom-crm-development` | custom crm development service (320, SD 7) | The service page. What gets built, how (observe the work, ask, build, test, approve), what the client owns, what it costs to start (the ~$3,000 paid proof), who it is not for (HubSpot Free is fine if a generic pipeline is enough). One build story. |
| 2 | `/custom-crm-cost` | custom crm development cost (90, SD 30) | A costed answer: what a custom CRM costs from a dev shop, from a HubSpot partner, and from us; 3-year cost beside HubSpot and Salesforce for a 20-person team. A table with sources. |
| 3 | `/crm-agency` | crm consultant (590, SD 19), crm implementation services (260, SD 11), crm agency (1,000, SD 41) | What a CRM agency or consultant does, how they charge, how to choose one, and the difference between an agency that configures rented software and one that builds software you own. |
| 4 | `/hubspot-alternative` | hubspot alternative (170, SD 39), hubspot migration services (110, SD 33) | Honest comparison: when to stay on HubSpot, when it gets expensive (seat and tier maths), and what a migration to an owned CRM involves. This is the "Leave HubSpot" message in the words people search. |

### Wave 2: niche pages (weeks 3–4)

**Drafted 4 Nov 2026** (overnight run). Each niche page has a marked spot, `[Example to add: …]`, shown in orange on the page, for a real client story; the pages should not deploy with that note visible.

| # | Page | Query it owns | What it says |
|---|---|---|---|
| 5 | `/crm-for-quickbooks` | crm for quickbooks (880, SD 31) | The options for a company running on QuickBooks and spreadsheets: Method CRM (name it), HubSpot with a connector, a built CRM that reads QuickBooks directly. What sync breaks in practice. |
| 6 | `/crm-for-distributors` | crm for distributors (140, SD 18), crm for wholesalers (40, SD 15) | One page for small B2B distributors and wholesalers: reorder cycles, price lists per customer, the rep's route, QuickBooks. Includes the spreadsheet-to-CRM path. Needs one real distributor example. |
| 7 | `/crm-for-contractors` | crm for contractors (590, SD 36) | Quote → job → invoice, leads from the phone and the inbox, field staff on mobile. Must contain contractor-specific detail or it will read as a doorway page. |

### Wave 3: the video topics as pages (weeks 5–8)

**Drafted 4 Nov 2026** (overnight run). `/en/build-your-own-crm` contains the copyable prompt for the "Use this prompt" video. There is also an index at `/en/guides`, linked from every guide and the home-page footer.

Each matches a topic in the 25 Oct content plan, so the video and the page publish together and link to each other (VideoObject on the page, page URL in the video description).

| # | Page | Query it owns | Video topic it pairs with |
|---|---|---|---|
| 8 | `/build-your-own-crm` | build your own crm (170), build your own crm system (170, SD 19) | "Can you build your own CRM?", "Use this prompt to get the best CRM". The page includes the actual prompt. |
| 9 | `/ai-native-crm` | ai native crm (480, SD 20), ai native crm platform (170, SD 6) | "CRM Software is dead", "What the SaaSpocalypse means for CRM". A definition page: what AI-native means, what it does not. |
| 10 | `/why-crm-projects-fail` | crm adoption (40, SD 16), why crm fails (10) | "Why your AI CRM is failing". Adoption is what the agency is paid to solve; what 450 FunnelBud customers showed. |
| 11 | `/custom-crm-vs-hubspot` | custom crm system (1,600, SD 46) | "Why HubSpot overcharges for CRM", "Your CRM is your business". The 3-year ownership comparison with the licence maths. |
| 12 | `/salesforce-alternative` | salesforce alternative (140, SD 19) | Same shape as the HubSpot page; shorter. |

### Later, if the pages above get traction

- "A CRM prompt for [industry]" from the video list: one page per industry only where a real build exists, never generated per visit.
- Swedish versions of pages 1, 4 and 5 ("crm system" is 3,600/month in Sweden at SD 19).
- Comparison pages against the tools distributors and contractors already use (Method CRM, Jobber, Housecall Pro), each with its own checked facts.

## What to measure

- **Google Search Console**: impressions and clicks per page, weekly. The first signal is impressions, which arrive weeks before clicks.
- **Ubersuggest**: the 47 tracked keywords, updated weekly. The number to watch is how many are in the top 20.
- **PostHog**: visits from AI assistants (referrers chatgpt.com, perplexity.ai, claude.ai, gemini.google.com, copilot.microsoft.com) and which page they land on; the CRM-plan chat starts and contact requests per landing page.
- **Monthly prompt check**: the same 20 questions asked in ChatGPT, Perplexity and Gemini on the first of each month, noting whether CRM From Within is named and which page is cited. Ubersuggest's AI Search Visibility can track 15 of them automatically.

Judge on real leads, as the plan says: chats started and calls booked, per page.

## Action steps

Left as steps; each is a login or a decision someone has to make.

1. **Deploy** (Yusuf or whoever has Cloudflare access). First `wrangler deployments list` to see what overwrote the site. Then `npm run deploy`, which now runs `check:seo` against the live site afterwards.
2. **Cloudflare dashboard**: turn off "Block AI bots", otherwise ChatGPT, Claude and Perplexity are still blocked regardless of robots.txt.
3. **Google Search Console + Bing Webmaster**: add the domain, submit the sitemap, request indexing of `/en` and `/se`.
4. **Profiles**: company LinkedIn page, Yusuf's LinkedIn, Capterra/G2/Product Hunt. Then the URLs go into `sameAs` in `app/seo.tsx`.
5. **Content**: write the pages above, in order. Each needs a route, an entry in `PAGE_DATES`, and a line in `llms.txt` and `check-seo.mjs`.
6. **PostHog**: the code is in (`app/analytics.tsx`, 4 Nov). Create a project on PostHog's EU cloud, then set `POSTHOG_KEY` as a Worker var or secret (`wrangler secret put POSTHOG_KEY`; locally, `POSTHOG_KEY=... npm run dev`). Empty key means off. It runs cookieless (memory persistence, no session recording) so the privacy page stays true; if recording is ever wanted, the privacy page changes first. Then one insight: sessions by referrer, filtered to the AI assistant domains above. The existing D1 funnel stays.
7. **Ubersuggest AI Search Visibility**: set up the brand with 15 prompts (the questions a buyer would ask ChatGPT, such as "best custom CRM agency for a small business", "is HubSpot worth it for 20 people"). Costs one of the account's monthly brand credits, so the prompt list is reviewed first.
8. **IndexNow**: the code is in (`scripts/indexnow.mjs`, `app/indexnow-key.txt/route.ts`, 4 Nov). Generate a key (any 32 hex characters), set it as the `INDEXNOW_KEY` Worker var, deploy, then `INDEXNOW_KEY=... npm run indexnow` after each deploy that adds or changes pages.
