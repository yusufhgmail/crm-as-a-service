# Video 19 evidence rows (to merge into survey/evidence/README.md)

All saved 27 Oct 2026. Live pages were checked with WebFetch (the browser was not used), so live proof is saved as page-check JSON in `saved_copies/` instead of screenshots. HubSpot Community returned 403 to WebFetch tonight, so no Community thread is used.

## Live pages (checked live 27 Oct 2026, page-check JSON)

| File | Used in | Source |
|---|---|---|
| saved_copies/2026-01_hackernews_hubspot-switched-away-twice-came-back.json | Video 19: hook and step 5 | https://news.ycombinator.com/item?id=46619640 |
| saved_copies/2026-02_trustpilot_hubspot-notes-only-json.json | Video 19: step 2 (history format) | https://www.trustpilot.com/reviews/699d0c3f8e86a6bb04ec0adc |
| saved_copies/2026-04_linkedin_10m-arr-one-week-out-of-hubspot.json | Video 19: step 4 (side by side) | https://www.linkedin.com/feed/update/urn:li:activity:7448029479022735361?commentUrn=urn%3Ali%3Acomment%3A%28activity%3A7448029479022735361%2C7448108038504288256%29 |

## Saved copies (2026 survey records; Reddit blocks automated reading)

| File | Used in | Source |
|---|---|---|
| saved_copies/2026-03_reddit_hubspot-10k-month-fully-in.json | Video 19: promise (stakes) | https://www.reddit.com/r/SaaS/comments/1s0px2h/are_crm_tools_like_zohosalesforce_actually_worth/oc4oicq/ |
| saved_copies/2026-10_reddit_hubspot-to-twenty-forms-sequences-gone.json | Video 19: step 1 (things that run) | https://www.reddit.com/r/hubspot/comments/1x32oct/anyone_actually_switched_from_hubspot_to_twenty/ |
| saved_copies/2026-07_reddit_hubspot-cancel-autorenew-needed-more-time-salesforce.json | Video 19: step 3 (timing) | https://www.reddit.com/r/hubspot/comments/1ukoasy/stay_away_from_hubspot_contracts/ouxs8bc/ |

## Vendor pages (checked 27 Oct 2026 with WebFetch, quoted word for word in the script's Sources)

| Page | Used in |
|---|---|
| https://knowledge.hubspot.com/import-and-export/export-records | step 2: associations option, CSV-only "All associated records", 30-day links, three ways to export activities |
| https://knowledge.hubspot.com/account-management/export-your-content-and-data | step 2: sales activity via reports or Engagements API, chat transcripts via Conversations API, property history, workflows export without history, reports export |
| https://knowledge.hubspot.com/files/organize-your-files-with-folders | step 2: Export (ZIP), Super Admin only |
| https://developers.hubspot.com/docs/api-reference/crm-notes-v3/guide | step 2: hs_attachment_ids |
| https://developers.hubspot.com/docs/api-reference/latest/crm/exports/guide | step 3: 30 exports per rolling 24 hours, one at a time |

## Survey counts (27 Oct 2026, buyers only, unique people; person key as in VIDEO_05_counts.md)

```sql
WITH b AS (SELECT r.*, CASE WHEN author IS NULL OR trim(author)='' OR author LIKE 'Verified %' OR author='Verified User'
  OR author LIKE 'Anonymous%' OR author='Verified Reviewer' THEN 'rec:'||rec_id ELSE 'a:'||lower(trim(author)) END AS person
  FROM records r WHERE speaker_role='buyer')
SELECT segment, count(*), count(DISTINCT person) FROM b WHERE crm_from LIKE '%HubSpot%' GROUP BY segment;
-- C (switched, happy) 223 posts / 207 people; D (switched, regret) 119 / 116; B (scared, held back) 78 / 73
SELECT count(*), count(DISTINCT person) FROM b WHERE pain_tags LIKE '%migration%' AND crm_from LIKE '%HubSpot%';
-- 69 posts / 63 people (22 people in 2026); all buyers with migration_risk: 430 people
```

Said in the video: "just over two hundred" happy (207), "more than a hundred" regret (116), "more than one in three" (116/323 = 36%).

## Candidates rejected
- Medium "I switched our CRM from HubSpot to Attio" (Apr 2026, segment D): 403 to WebFetch, could not verify; also a SaaS-tools blog.
- Reddit comments in threads 1r7g40q and 1v3io34 (phone number "held hostage", "using HubSpot since 2021"): threads already used by videos 1–3.
- 2023–2025 Reddit/G2 migration posts (1,000 attachments, $35k renewal, dreading the migration): not 2026 and can't be checked live.
- Trustpilot Kelly Cross (Jul 2026, "block your data exports"): an unverifiable claim about exports; not used.
