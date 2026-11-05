# Video 17 evidence rows (to merge into survey/evidence/README.md)

All saved 1 Nov 2026. Live pages were checked with WebFetch (the browser was not used), so live proof is saved as page-check JSON in `saved_copies/` instead of screenshots. Take a highlighted screenshot of each live page before filming. Every buyer below is `speaker_role='buyer'` in `survey.sqlite`; none shows a partner badge or sells CRM or integration services.

## Live pages (checked live 1 Nov 2026, page-check JSON)

| File | Used in | Source |
|---|---|---|
| saved_copies/2026-07_trustpilot_odoo-thousands-amazon-integration-never-worked.json | Video 17: promise (hook, replaces the Pipedrive story after the judge round) | https://www.trustpilot.com/reviews/6a4c8528acd05249460c0623 |
| saved_copies/2026-07_trustpilot_pipedrive-8000-quotewerks-v17-check.json | Video 17: integration 2, one clause calling back to video 5, with Pipedrive's reply "As this integration was not developed or maintained by Pipedrive" | https://www.trustpilot.com/reviews/6a54ca3777ef6cfb1a59ba27 |
| saved_copies/2026-06_linkedin_recruitment-frankenstack-five-places-zapier.json | Video 17: promise, integration 5 | https://www.linkedin.com/posts/byronvangisborne_we-were-running-a-frankenstack-at-career-activity-7470255850050330624-q0rZ |
| saved_copies/2026-08_hubspot-community_credit-memos-wrong-qbo-account.json | Video 17: integration 1 | https://community.hubspot.com/t/allow-for-negative-priced-line-items-in-deal/24897/44 |
| saved_copies/2026-08_hubspot-community_services-pandadoc-credits-drop-out.json | Video 17: integration 2 | https://community.hubspot.com/t/allow-for-negative-priced-line-items-in-deal/24897/42 |
| saved_copies/2026-07_trustpilot_zoho-outlook-contacts-6-tickets.json | Video 17: integration 4 | https://www.trustpilot.com/reviews/6a4e3597d70e8bb30b94b306 |

## Vendor pages (checked live 1 Nov 2026, WebFetch, quoted word for word in the script's Sources)

| Page | Used in | What was confirmed |
|---|---|---|
| https://knowledge.hubspot.com/integrations/connect-hubspot-and-quickbooks-online | Integration 1 | "Last updated: July 21, 2026"; "All products and plans"; sync table contacts/customers, products, invoices, credit memos; "When setting up a sync, recommended filters will automatically be set for you, based on the date you're setting up the sync."; "This filter sets up a one-way sync from QuickBooks Online to HubSpot" (with "Created time is after [today's date at 12:00 AM]"); "Invoices: without a filter being set, all invoices will sync between QuickBooks Online and HubSpot will sync."; "Sync filters (except outbound invoice sync), can be edited."; "Edits that can't be made include: adding or removing line items, updating pricing, removing a payment,"; "If the edit isn’t made within HubSpot, the invoice will fail to sync."; "Payments associated with multiple invoices don't sync to HubSpot."; "Users in an Data Hub Starter, Professional, or Enterprise account can add more fields by clicking Add a mapping below the pre-defined fields." Also on the page, not spoken: "Changes from QuickBooks to HubSpot are detected every 30 minutes."; "HubSpot invoices can’t be created with tax"; "Edits that can’t be made include: adding or removing line items, updating pricing" |
| https://knowledge.hubspot.com/quotes/use-e-signatures-with-quotes | Integration 2 | Last updated September 24, 2026; available with Sales Hub Starter, Professional, Enterprise and Revenue Hub Professional, Enterprise; "A Revenue Hub seat is required to enable e-signatures on a quote."; "Your HubSpot account has a pooled monthly e-signature limit based on your subscription and the number of users"; table row "Sales Hub Starter" · "10" per user · "2" users · "20" total; "Sales Hub Professional" · "10, with the option to purchase additional signatures" |
| https://help.getjobber.com/hc/en-us/articles/12642621815831-QuickBooks-Integration-FAQs-NEW-QuickBooks-Integration | Integration 3 | "Updated October 29, 2026"; "The sync is now one way, from Jobber to QuickBooks."; "Jobber is the source of truth for clients and products and services."; "“Paid” status on invoices no longer sync back to Jobber." (The page does not say which Jobber plans include the sync; nothing is said about plans.) |
| https://knowledge.hubspot.com/integrations/use-hubspots-integration-with-google-calendar-or-outlook-calendar | Integration 4 | "Last updated: October 9, 2026"; all products and plans; "Calendar sync will only sync with a user's primary calendar."; "You can't use both at the same time."; "Events created before you connect your calendar won't sync to HubSpot."; "HubSpot won't automatically create contact records if the guests don't already exist in your HubSpot account." |
| https://help.zapier.com/hc/en-us/articles/8496037690637-How-to-troubleshoot-errors-in-Zap-workflows | Integration 5 | "Updated October 15, 2026 13:08"; "Your Zap will automatically turn off if 95% of its runs result in errors in the last 7 days." |

## Saved copies (Capterra blocks automated reading)

| File | Used in |
|---|---|
| 2026-03_capterra_construction-salesforce-no-accounting-integration.json (existing) | Video 17: integration 1 |
| 2026-01_capterra_construction-service-fusion-two-years-syncing.json (new) | Video 17: integration 3 |

## Survey counts (re-run 1 Nov 2026)

`survey/survey.sqlite`, table `records`, `speaker_role='buyer'`, video 5's person key.

```sql
WITH b AS (
  SELECT r.*,
    CASE WHEN author IS NULL OR trim(author)='' OR author LIKE 'Verified %' OR author='Verified User'
              OR author LIKE 'Anonymous%' OR author='Verified Reviewer'
         THEN 'rec:'||rec_id ELSE 'a:'||lower(trim(author)) END AS person
  FROM records r WHERE speaker_role='buyer'
)
SELECT 'ALL_BUYERS', count(*), count(DISTINCT person) FROM b
UNION ALL SELECT 'INTEGRATION', count(*), count(DISTINCT person) FROM b WHERE pain_tags LIKE '%"integration"%'
UNION ALL SELECT 'QB_MENTION', count(*), count(DISTINCT person) FROM b
  WHERE lower(coalesce(quote,'')||' '||coalesce(summary_en,'')) LIKE '%quickbooks%'
UNION ALL SELECT 'QB_AND_INTEGRATION', count(*), count(DISTINCT person) FROM b
  WHERE pain_tags LIKE '%"integration"%' AND lower(coalesce(quote,'')||' '||coalesce(summary_en,'')) LIKE '%quickbooks%'
UNION ALL SELECT 'INTEGRATION_2026', count(*), count(DISTINCT person) FROM b WHERE pain_tags LIKE '%"integration"%' AND date>='2026';
-- pains tagged alongside integration
SELECT j.value, count(*), count(DISTINCT person) FROM b, json_each(b.pain_tags) j
WHERE b.pain_tags LIKE '%"integration"%' AND j.value<>'integration' GROUP BY j.value ORDER BY 3 DESC;
```

| Count | Posts | Unique buyers | Said |
|---|---|---|---|
| All buyers | 7,165 | 6,007 | "more than five thousand" |
| Tagged integration | 1,078 | 1,005 | "more than a thousand" |
| Buyer's own quote names QuickBooks (`lower(coalesce(quote,'')) LIKE '%quickbooks%'`) | 36 | 36 | "more than thirty" (judge round: the earlier "more than a hundred" counted our summaries) |
| Own quote names QuickBooks and tagged integration | 27 | 27 | not said |
| Own quote or translation names QuickBooks, QBO or QB | 48 | 48 | not said |
| Quote or summary names QuickBooks | 116 | 113 | not said |
| Quote or summary names QuickBooks and tagged integration | 81 | 79 | not said |
| Integration, 2026 posts | 252 | 240 | not said |
| Alongside integration: price | 336 | 327 | not said |
| Alongside integration: poor fit (rigidity_fit) | 336 | 322 | "more than three hundred" |
| Alongside integration: support | 177 | 174 | not said |
| Alongside integration: complexity | 158 | 154 | not said |

Adding `translation_en` to the quote-or-summary match gives the same 113.

## Not used

| Source | Why |
|---|---|
| HubSpot Community 44726/11 (calendar sync through undocumented API calls, Jan 2026) | the idea is now marked "Delivered" (8 Oct 2026), so it no longer proves a gap |
| Trustpilot 6a5975d113fe6e4d88114c50 (ActiveCampaign, Airtable + Zapier, checked live; JSON saved) | cut for length; its key line uses a word the writing rules ban |
| Capterra 7132117 (AR rep, "Jobs and pymts do not sync to qb right away.", saved copy) | cut for length; also used in video 26 |
| Capterra 7123155 (FieldEdge owner, two-year contract) | the QuickBooks part is only in our summary, not in the quoted text |
| Trustpilot 6a31401cd1527f13e6533afe (Jobber, QuickBooks) | already used in video 6 |
| Trustpilot 6a67e1fcb89a2d721d756675 ($20k integrator) | already used in video 3 |
| Pipedrive $8,000 QuoteWerks story as the hook | judge round: it is video 5's reason-5 story; kept as one clause in integration 2 with "As I showed in video five" |

> **4 Nov 2026 rewrite:** the script no longer uses any customer review, forum or LinkedIn quote below; only the vendor and help pages remain (see Sources in script.md).
