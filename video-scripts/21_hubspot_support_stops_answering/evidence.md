# Video 21 evidence rows (to merge into survey/evidence/README.md)

Script: `videos/finished/21_hubspot_support_stops_answering/script.md`. All saved 1 Nov 2026. Live pages were checked with WebFetch (the browser was not used), so live proof is saved as page-check JSON in `saved_copies/` instead of screenshots. Take a highlighted screenshot of each live page before filming.

## Live pages (checked live 1 Nov 2026, page-check JSON)

| File | Used in | Source |
|---|---|---|
| saved_copies/2026-10_trustpilot_hubspot-paid-year-suspended-no-escalation.json | Video 21: hook, step 2 | https://www.trustpilot.com/reviews/6ac4fdeacc1972832e179cae |
| saved_copies/2026-10_trustpilot_hubspot-passed-off-2000-refund-6000.json | Video 21: hook (second card, "keep passing you off") | https://www.trustpilot.com/reviews/6ae3a43fd7d37207c5d2e9e9 |
| saved_copies/2026-05_trustpilot_hubspot-emailed-a-month-no-response.json | Video 21: step 2 | https://www.trustpilot.com/reviews/6a0c9476f251d0ccb18d1bec |
| saved_copies/2025-11_hubspot-community_admin-left-270-month-cant-cancel.json | Video 21: step 2 | https://community.hubspot.com/t/cancel-service-and-review-bill-accuracy/142515 |
| saved_copies/2026-10_trustpilot_hubspot-2fa-locked-out-over-a-week.json | Video 21: step 4 | https://www.trustpilot.com/reviews/6ada1aae8c8a5b4b3cc284b5 |
| saved_copies/2026-07_linkedin_lev-ceo-two-weeks-to-stop-hubspot-auto-renew.json | Video 21: step 3 | https://www.linkedin.com/posts/yjzar_how-on-earth-is-this-possible-i-dont-like-activity-7479923698007846912-XrPd |
| saved_copies/2026-11_hubspot_support-tiers-terms-escalation.json | Video 21: steps 1 to 5 (vendor pages, exact sentences) | see the pages below |
| (vendor page) Get help with HubSpot, updated 15 Sep 2026 | Step 1 (channels by tier, paid seat on newer accounts, Hub ID), step 3 (chat closes to a ticket) | https://knowledge.hubspot.com/help-and-resources/get-help-with-hubspot |
| (vendor page) Product Specific Terms, modified 16 Sep 2026 | Step 1 (§10.1 phone hours, §10.2 no guaranteed response time), step 4 (§5.1.1 retrieve data before term ends) | https://legal.hubspot.com/product-specific-terms |
| (vendor page) Contact HubSpot about an account, updated 18 Feb 2026 | Step 2 (who handles what, billing@hubspot.com) | https://knowledge.hubspot.com/account-management/contact-hubspot-about-an-account |
| (vendor page) Terms of service, modified 16 Sep 2026 | Step 3 (§4.1, §4.2), step 4 (§4.4.2 suspension 10 days after notice) | https://legal.hubspot.com/terms-of-service |
| (vendor page) Cancel auto-renewal, updated 9 Jul 2026 | Step 3 | https://knowledge.hubspot.com/account/how-do-i-cancel-my-hubspot-account |
| (vendor page) Export records, updated 2 Apr 2026 | Step 4 | https://knowledge.hubspot.com/import-and-export/export-records |
| (vendor page) Premium Support help page, updated 2 Feb 2026 | Step 5 (Enterprise only, bought separately, 1-hour first response for Super Admins) | https://knowledge.hubspot.com/contact-hubspots-premium-support |
| (vendor page) Premium Support terms, modified 2 Feb 2026 | Step 5 (§1.4 60 minutes for Super Admin tickets via the in-app email form; resolution times not guaranteed) | https://legal.hubspot.com/premium-support |

Also checked live, in the JSON but not in the script: hubspot.com/pricing/sales FAQ ("With Sales Hub Starter, you'll have access to email support." / "With Sales Hub Professional and Enterprise, you'll gain access to email and phone support."), hubspot.com/services/premium-support (beta, case-by-case eligibility, no price shown) and status.hubspot.com. Cut for length.

## Survey counts (rerun 1 Nov 2026, video 5's person key)

```sql
WITH b AS (
  SELECT r.*,
    CASE WHEN author IS NULL OR trim(author)='' OR author LIKE 'Verified %' OR author='Verified User'
              OR author LIKE 'Anonymous%' OR author='Verified Reviewer'
         THEN 'rec:'||rec_id ELSE 'a:'||lower(trim(author)) END AS person
  FROM records r WHERE speaker_role='buyer'
)
SELECT 'ALL_BUYERS', count(*), count(DISTINCT person) FROM b
UNION ALL SELECT 'SUPPORT_ALL', count(*), count(DISTINCT person) FROM b WHERE pain_tags LIKE '%"support"%'
UNION ALL SELECT 'SUPPORT_2026', count(*), count(DISTINCT person) FROM b WHERE pain_tags LIKE '%"support"%' AND date>='2026'
UNION ALL SELECT 'HUBSPOT_ALL', count(*), count(DISTINCT person) FROM b WHERE crm_from LIKE '%hubspot%'
UNION ALL SELECT 'SUPPORT_HUBSPOT', count(*), count(DISTINCT person) FROM b WHERE pain_tags LIKE '%"support"%' AND crm_from LIKE '%hubspot%'
UNION ALL SELECT 'SUPPORT_HUBSPOT_2026', count(*), count(DISTINCT person) FROM b WHERE pain_tags LIKE '%"support"%' AND crm_from LIKE '%hubspot%' AND date>='2026'
UNION ALL SELECT 'SUPPORT_AND_PRICE', count(*), count(DISTINCT person) FROM b WHERE pain_tags LIKE '%"support"%' AND pain_tags LIKE '%"price"%'
UNION ALL SELECT 'SUPPORT_AND_RENEWAL', count(*), count(DISTINCT person) FROM b WHERE pain_tags LIKE '%"support"%' AND pain_tags LIKE '%"contract_renewal"%'
UNION ALL SELECT 'SUPPORT_AND_PRICE_OR_RENEWAL', count(*), count(DISTINCT person) FROM b WHERE pain_tags LIKE '%"support"%' AND (pain_tags LIKE '%"price"%' OR pain_tags LIKE '%"contract_renewal"%')
UNION ALL SELECT 'HS_SUPPORT_AND_PRICE', count(*), count(DISTINCT person) FROM b WHERE crm_from LIKE '%hubspot%' AND pain_tags LIKE '%"support"%' AND pain_tags LIKE '%"price"%'
UNION ALL SELECT 'HS_SUPPORT_AND_RENEWAL', count(*), count(DISTINCT person) FROM b WHERE crm_from LIKE '%hubspot%' AND pain_tags LIKE '%"support"%' AND pain_tags LIKE '%"contract_renewal"%'
UNION ALL SELECT 'HS_SUPPORT_AND_PRICE_OR_RENEWAL', count(*), count(DISTINCT person) FROM b WHERE crm_from LIKE '%hubspot%' AND pain_tags LIKE '%"support"%' AND (pain_tags LIKE '%"price"%' OR pain_tags LIKE '%"contract_renewal"%');
```

Output (label | posts | unique people):

```
ALL_BUYERS|7165|6007
SUPPORT_ALL|1121|1056
SUPPORT_2026|196|187
HUBSPOT_ALL|1601|1340
SUPPORT_HUBSPOT|194|175
SUPPORT_HUBSPOT_2026|58|50
SUPPORT_AND_PRICE|425|417
SUPPORT_AND_RENEWAL|197|184
SUPPORT_AND_PRICE_OR_RENEWAL|520|500
HS_SUPPORT_AND_PRICE|105|100
HS_SUPPORT_AND_RENEWAL|74|62
HS_SUPPORT_AND_PRICE_OR_RENEWAL|135|120
```

Pain ranking (same key): price 2,848 · rigidity_fit 1,860 · complexity 1,239 · **support 1,056 (fourth)** · integration 1,005 · contract_renewal 680.

| Said on camera | Exact |
|---|---|
| "more than five thousand CRM buyers" | 6,007 |
| "more than a thousand" complained about support | 1,056 |

Not said (cut in the fix round, keep out): support with price or contract_renewal is 500 of 1,056 (47%) against a base rate of 3,048 of 6,007 (51%) for all buyers; for HubSpot customers 120 of 175 (69%) against 844 of 1,340 (63%). Support complainers are not more tied to money moments than other buyers, so "bad support shows up when money is on the line" is not supported.

Base-rate SQL (same key): `SELECT count(DISTINCT person) FROM b WHERE pain_tags LIKE '%"price"%' OR pain_tags LIKE '%"contract_renewal"%'` → 3,048; with `crm_from LIKE '%hubspot%'` → 844.

## Not used

- Facebook comment by Nicholas Rhodes (Sep 2026), HubSpot "ran the clock down by taking forever to respond": WebFetch loaded the post but not the comment, so it could not be checked live.
- LinkedIn post by Cordell Smith (Mar 2026), upgrade that silently extended the contract: returns 404 (also 404 on 26 Oct).
- Trustpilot, Francisco Velasco E. (15 Oct 2026), "responses stretching into weeks even on billing issues": the reviewer is an agency that implements HubSpot for clients, so a seller.
- G2, "11 years, cut off over a disputed $2,000 balance" (saved copy): video 14's hook, swapped out of step 4 for the live 2FA lockout review.
- Trustpilot, "I only received AI support" (16 Aug 2026, /reviews/6a815ea43be1a9105ebf83b3): checked live and saved, cut from step 1 for length.
- G2, Andrey K. (31 Mar 2026), "ping-ponged between different reps and departments": saved-copy only; the live Trustpilot passing-off quote was preferred.
- David Norman (Trustpilot / G2, Sep 2026), £1,452 a month, "heard nothing for six months": already video 2's step 3 story.
