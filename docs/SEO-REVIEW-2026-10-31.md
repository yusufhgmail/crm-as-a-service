# SEO review of crmfromwithin.com (31 Oct 2026)

Checked: the live site (curl of `/`, `/en`, `/se`, `/robots.txt`, `/sitemap.xml`, redirects), the code at `0a9fb73`, Ubersuggest (domain overview, backlinks, PageSpeed) and what Upbridge built for SEO (`~/code/Upbridge/docs/research/seo-*`, `landing/build.py`, `tests/test_landing_pages.py`).

## The short answer

The site that is live is not the site in this repo, and the live site tells Google that its real address is a page on companynative.com that returns 404. Until that is fixed, no other SEO work counts. Ubersuggest agrees: 0 ranking keywords and 0 search traffic every month for the past year, domain authority 6, and 37 backlinks from 17 domains.

## 1. Blockers (fix first)

| # | Finding | Evidence | Fix |
|---|---|---|---|
| 1.1 | **Live site is the old Company Native build.** Title "Company Native — Own and control your CRM replacement", H1 "Replace HubSpot or Salesforce…", favicon `company-native-logo.svg`, 18 mentions of "Company Native". | `curl https://crmfromwithin.com/en`. Repo HEAD says "CRM From Within — The CRM that adapts to your company". The live sitemap's lastmod is 2026-08-24, but the repo says 2026-08-30. So the live build predates the 30 Aug rebrand (`aa7615d`), or another project deployed to the same Worker. | Run `npm run deploy` from HEAD. Check `wrangler deployments list` first to see what is deployed and from where. |
| 1.2 | **Canonical and hreflang point to companynative.com, which returns 404.** `<link rel="canonical" href="https://companynative.com/en">`, and the same for `/se`, hreflang en/sv. | `curl -I https://companynative.com/en` returns 404. | Fixed by 1.1: the code already sets `metadataBase` to crmfromwithin.com. Add a test so it can't come back (see 3.1). |
| 1.3 | **robots.txt and sitemap send Google to companynative.com.** `Sitemap: https://companynative.com/sitemap.xml` (which returns 404). Every `<loc>` in `/sitemap.xml` is on companynative.com. | Live `/robots.txt` and `/sitemap.xml` | Fixed by 1.1. |
| 1.4 | **www, http and .ai don't redirect.** `www.crmfromwithin.com/en`, `http://crmfromwithin.com/en` and `crmfromwithin.ai/se` all return 200 with the full page, so there are four copies of the site. | curl status codes | `proxy.ts` in HEAD already does the 301. Fixed by 1.1. Then check the redirects live. |
| 1.5 | **OG image returns 404.** `/og-crm-from-within.png` is a 404 live. The live HTML points to `companynative.com/og-company-native.png`. | curl | Fixed by 1.1. The file is in `public/`. |
| 1.6 | **The Worker is still named `company-native`** (`wrangler.jsonc`). If the Company Native repo also deploys to a Worker with that name, each deploy overwrites the other, which may be how 1.1 happened. | `wrangler.jsonc` | Check the Cloudflare dashboard. If they share a name, rename this one. The README says the name was kept on purpose for the secret and history, so move the secret too. |

After deploying: in Google Search Console, add `crmfromwithin.com` as a Domain property, submit `/sitemap.xml`, and request indexing for `/en` and `/se`. Import it into Bing Webmaster Tools. Upbridge's first lesson was the same: on 17 Sep only its two home pages were indexed, and nothing else mattered until that changed.

## 2. On-page issues in the code at HEAD (after the deploy)

| # | Finding | Fix |
|---|---|---|
| 2.1 | **The page is about how the product works, not what people search for.** The title, H1 and description say "adapts to your company" or "production-ready CRM". Nobody searches for that. The buyer searches "CRM for small business", "simple CRM", "HubSpot alternative" or "CRM för småföretag". | Put one real query at the front of the title, as Upbridge locks with `test_home_title_is_a_search_query`. For example "CRM for small businesses, built around how you work | CRM From Within" (≤60 chars). |
| 2.2 | **Two pages target everything.** The whole site is `/en`, `/se` and two privacy pages. One page can't rank for "CRM for painters", "HubSpot alternative" and "spreadsheet to CRM" all at once. | See section 4. |
| 2.3 | **No structured data.** 0 `application/ld+json` blocks. | Add an Organization (one `@id`, `sameAs` with Yusuf's and the company's LinkedIn, the YouTube channel and FunnelBud), WebSite, WebPage with `dateModified` equal to the sitemap lastmod, a Person for Yusuf as founder, and FAQPage for the "answers" section, which is already a visible FAQ. Upbridge's `jsonld_blocks()` in `landing/build.py` builds all of these and is worth copying. |
| 2.4 | **`/se` has `<html lang="en">`.** The Swedish text sits inside `<div lang="sv">`, but the document says English. | Use a `[locale]` layout that sets `<html lang>`, or at least set it per route. |
| 2.5 | **No `x-default` hreflang.** And `/` serves the same page as `/en` with status 200, which makes a fifth copy. | Add `x-default: /en`. Make `/` 301 to `/en`, or make `/` the canonical home. |
| 2.6 | **The `/se` Open Graph and Twitter text is English.** It is inherited from the root layout. | Set `openGraph`/`twitter` in `app/se/page.tsx`. |
| 2.7 | **The headings are slogans.** H2s like "Do not choose between a quick start and a CRM that fits" contain no searchable words. | Keep the voice, but put the topic in each H2. Add one 40–60 word plain answer under each H2, the shape AI answers quote (Upbridge `seo-audit-ai-offsite.md`). |
| 2.8 | **No `llms.txt`.** | Generate `/llms.txt` (pages listed by kind, one line each) and `/llms-full.txt`, as Upbridge's build does. |
| 2.9 | **robots.txt blocks AI search, not only AI training.** Cloudflare's managed block disallows `GPTBot`, `ClaudeBot`, `Google-Extended`, `Applebot-Extended`, `CCBot`, `meta-externalagent` and others. Upbridge's research found these engines cite only pages they can crawl, and this business plans on being found in ChatGPT and Claude answers. | Decide on purpose. If AI answers are wanted, turn off "Block AI bots" in Cloudflare, and allow `OAI-SearchBot`, `ChatGPT-User`, `Claude-SearchBot`, `Claude-User` and `PerplexityBot` by name, as Upbridge does. |
| 2.10 | **The sitemap's lastmod is hard-coded** (`2026-08-30` for every URL). | Use each page's real last-change date. Google ignores lastmod it can't trust. |

Speed is not a problem. PageSpeed mobile: LCP 0.75 s, CLS 0, TBT 0. Desktop LCP 0.22 s.

## 3. What to copy from Upbridge

Upbridge went from "only two pages indexed" to 180 tested pages in about six weeks. What made it work:

1. **Tests lock the SEO.** `tests/test_landing_pages.py` has over 100 tests that fail the build on: canonical or hreflang not reciprocal, a sitemap URL that redirects, a page missing from the sitemap or llms.txt, more than one H1, a `noindex`, an undated WebPage, `dateModified` ≠ lastmod, two Organization entities, AI bots not named in robots. **3.1 for this site:** a small test that builds the site and asserts every canonical, hreflang, sitemap `<loc>` and `og:image` is on `crmfromwithin.com` and returns 200. That test would have caught 1.1–1.5.
2. **Measure before writing.** Search Console and Bing, a PostHog insight for AI referrers (chatgpt.com, perplexity.ai, claude.ai, gemini), and a fixed set of about 20 prompts run monthly in ChatGPT, Perplexity and Gemini to see whether the brand is named.
3. **Check volume before building pages.** Upbridge found its product searches were close to 0 a month, but competitor blogs got traffic from host questions (difficulty under 20). Its place pages were then picked by Ubersuggest volume (`seo-2026-10-25/place-keyword-volume.md`).
4. **No doorway pages.** Pages that differ only by city or niche are what Google's spam policy describes. Upbridge's `test_place_pages_are_not_city_swaps` fails any page whose text is just another page with the name swapped. Each page needs its own checked facts, sources and a date.
5. **Off-site is the bottleneck.** Upbridge's on-page work was solid, and it still didn't show up for its own brand name. The fixes: listings (Capterra/GetApp, G2, Product Hunt, AlternativeTo), a company LinkedIn page, `sameAs`, and the same name and description everywhere.
6. **IndexNow on each deploy** (`landing/indexnow.py`) so Bing and Copilot pick up changes within days.

## 4. Content plan (after section 1 is done and the pages are indexed)

`docs/LONGTAIL-KEYWORDS.md` already has the right idea: "CRM för {niche}", "{tool} alternativ", "spreadsheet to CRM". Two changes based on what Upbridge learned:

- **Check volumes first.** None of the seed keywords has a volume yet. Ubersuggest has a free project slot (6 of 7 used) and 300 searches a day. Run the EN and SE seed lists through it and keep what has volume and difficulty under about 30.
- **Static, linked pages, not LLM-generated ones.** The plan in `STRATEGY.md` writes the niche section on the fly. If that text changes on every visit, or the pages differ only by niche name, Google treats them as doorway pages. Build one fixed page per niche that has volume, with real details (the jobs, the quote-to-invoice flow, the tools that niche uses), link it from the home page, and put it in the sitemap.
- **Switcher pages** ("HubSpot alternative for small business", "Pipedrive vs …", "from Excel to CRM"). These match the 30 Oct video plan and the "own your code, no lock-in" pitch. Upbridge found comparison pages were what AI answers picked up.
- **The 23 YouTube videos are the content.** Each published video can become a page with its transcript cleaned up, a VideoObject, and a link from the description. That gives the YouTube channel and the site links to each other.

## Done locally (31 Oct, not deployed)

- `npm run check:seo [base-url]` (`scripts/check-seo.mjs`) checks each page's canonical, reciprocal hreflang with x-default, `<html lang>`, title ≤60 and description ≤160, one H1, og:url/og:image/og:locale, the JSON-LD, the sitemap, robots.txt, llms.txt and the `/` redirect. It also checks that nothing points at another brand's domain. Local dev and the production build pass. The live site fails 49 checks.
- `app/seo.tsx`: one place for canonical/hreflang/OG per page (`pageMetadata`), the JSON-LD graph (`jsonLd`: Organization, Person, WebSite, WebPage and FAQPage on the home pages), and `PAGE_DATES`, which feeds both the sitemap lastmod and `dateModified`.
- Titles aimed at a search query, checked in Ubersuggest on 31 Oct. EN: "Custom CRM for small businesses | CRM From Within" ("custom crm" is 1,000/mo in the US at difficulty 38; "crm for small business" is 4,400/mo at difficulty 65). SV: "CRM-system byggt efter ditt företag | CRM From Within" ("crm system" is 3,600/mo in Sweden at difficulty 19). The H1s haven't changed.
- `<html lang="sv">` on `/se` pages (via a header the proxy sets). `/` now does a 301 to `/en` and keeps query strings. The Swedish OG text is now in Swedish.
- Privacy pages: their own canonical, hreflang, title and description. Before, they inherited `/en` as their canonical. They are now static routes (`app/en/privacy`, `app/se/privacy`), because vinext puts async `generateMetadata` into `<body>`.
- `/llms.txt`, plus named AI search agents in robots.txt. The sitemap has hreflang alternates and no changefreq or priority.
- `CRM_LOCAL_ONLY=1 npm run dev` runs without a Cloudflare login. The assessment chat then has no AI.

Still open: the deploy (1.1), Search Console/Bing, Cloudflare's "Block AI bots" setting, `sameAs` (no company profile URLs yet), the H1 wording, and section 4.

## Order of work

1. Deploy HEAD, then check canonical, sitemap, robots, redirects and the OG image live (1.1–1.6).
2. Search Console + Bing + submit the sitemap. Decide on the AI-crawler block (2.9).
3. Title/H1 aimed at a query, JSON-LD, `lang`/x-default/`/` fixes, the Swedish OG text, llms.txt (2.1–2.8, 2.10), with the domain test from 3.1.
4. Ubersuggest project for crmfromwithin.com: volumes for the seed list, then the first 5 niche or switcher pages.
5. Listings and `sameAs` (off-site).

## Review of the fixes (3 Nov 2026, cloud session)

Checked on the branch `claude/crm-service-seo-audit-1wsa03`: a production build, `npm run check:seo` against it, `lint`, `tsc`, the rendered `<head>` and JSON-LD of all four pages, the sitemap, robots.txt, llms.txt, and the redirects (`/` with and without query string, trailing slashes, and the www / .ai hosts via a `Host` header, which the Mac session could not test). All pass. Every fact in llms.txt and the JSON-LD (Yusuf Young AB, FunnelBud 2015, 450 businesses, design partners without a build fee) also appears in the page copy.

Changed in this review:

- `LOCALE_HEADER` moved from `proxy.ts` to `app/seo.tsx`, so the root layout no longer imports the proxy module.
- `robots` meta on every page: `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1`.
- Organization markup gained `description` and `addressCountry: SE`.
- `npm run deploy` now runs `check:seo` against crmfromwithin.com afterwards (`postdeploy`), so a deploy that serves the wrong site fails loudly.

Found but left for a decision:

- **Outbound link to companynative.com.** The "Already stuck in HubSpot or Salesforce?" block links to the companynative.com root. The site exists (its `/en` path returned 404 on 31 Oct), but whether to keep sending visitors there is undecided. Parked by Ville on 3 Nov; the link stays for now. (`app/page.tsx`, the `migration` section.)
- **Title and page text don't share words.** The title says "custom CRM" and "small businesses"; the H1 and intro don't use either phrase. Google and AI assistants weigh page text more than the title. One sentence in the hero or the first H2 that says "a custom CRM for small businesses" would close the gap.
- **FAQ markup won't produce rich results.** Google limits FAQ rich results to government and health sites. The markup still helps AI assistants, so it stays.
- **`sameAs` is still empty.** Needs the company LinkedIn page and Yusuf's own LinkedIn URL.
