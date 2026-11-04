# Video 6 evidence rows (to merge into survey/evidence/README.md)

All saved 27 Oct 2026. Live pages were checked with WebFetch (the browser was not used), so live proof is saved as page-check JSON in `saved_copies/` instead of screenshots.

## Live pages (checked live 27 Oct 2026, page-check JSON)

| File | Used in | Source |
|---|---|---|
| saved_copies/2026-05_trustpilot_pipedrive-proposals-in-word.json | Video 6: step 3 (where each step lives) | https://www.trustpilot.com/reviews/6a0f7a312c0d32c96933773a |
| saved_copies/2026-03_linkedin_coconut-16k-hubspot-didnt-fit-workflow.json | Video 6: step 5 (fit). Post checked live; the author's reply is a saved copy (not shown to logged-out readers) | https://www.linkedin.com/posts/donalacdao_we-spent-over-16000-on-hubspot-it-didnt-activity-7442208668944769024-yW4S |
| (vendor page) HubSpot pipelines help page, last updated 29 Sep 2026 | Video 6: step 5 (setting and tier) | https://knowledge.hubspot.com/object-settings/set-up-and-customize-pipelines |

## Saved copies (Reddit)

| File | Used in |
|---|---|
| 2021-05_reddit_startups_custom-crm-38-percent.json | Video 6: hook |
| 2024-02_capterra_activecampaign-broken-automation-6-months.json | Video 6: step 4 (from the study's Capterra scrape) |
| 2026-03_reddit_revops_27-people-pipedrive-all-manual.json | Video 6: step 1 |
| 2026-08_reddit_crm_equipment-sales-workflow-different.json | Video 6: step 2 |
| 2026-03_reddit_hubspot_5000-a-year-third-pipeline.json | Video 6: step 5 (tier) |
| 2026-06_reddit_salesforce_million-customizing-locked-in.json | Video 6: is a map enough? |

## Left out

- r/CRMSoftware "7 years on Salesforce, 12 employees, $70–100k a year" and r/CRM "50-person construction company, Salesforce consultant for every change": strong, but they belong to videos 7 and 8.
- HubSpot Community threads: community.hubspot.com returns 403 to WebFetch, so they couldn't be checked live without the browser.

## Screenshots (checked live 3 Nov 2026)

Sharp PNGs in `proof/`, taken live in Chrome with the quoted words highlighted in yellow: every Trustpilot, HubSpot Community and LinkedIn quote, plus HubSpot help-center screens (`2026-11_help-center_…`, HubSpot's own images at full size or highlighted captures) for paid-plan screens the free demo portal can't show, and the public pricing and catalog pages (`2026-11_hubspot-pricing_…`, `2026-11_hubspot-catalog_…`) with the numbers the script uses boxed in red. Reddit, X and G2 block automated checks, so those quotes rely on the saved copies in `survey/evidence/saved_copies/` (on GitHub: `proof/saved_copies/`).

- `2026-03_linkedin_coconut-16k-hubspot-didnt-fit.png`
- `2026-05_trustpilot_pipedrive-proposals-ms-word.png`
- `2026-06_trustpilot_jobber-invoices-quickbooks.png`
- `2026-11_help-center_add-deal-stage.gif`
- `2026-11_help-center_pipeline-limits-per-plan.png`

Notes from the 3 Nov 2026 check:
- The LinkedIn author reply ("after over a year of trying… it just didn't") doesn't load on the page without expanding replies; it is backed by `saved_copies/2026-03_linkedin_coconut-16k-hubspot-didnt-fit-workflow.json`. The screenshot shows the post's opening line.
- HubSpot's pipeline page now lists two pricing models. Seat-based portals: Free 0 · Starter 15 · Professional 100 · Enterprise 350 (what the script shows). Flexible Seats & Credits portals: Professional 350. The screenshot shows the seat-based list.
