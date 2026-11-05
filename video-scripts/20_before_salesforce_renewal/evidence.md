# Video 20 evidence rows (to merge into survey/evidence/README.md)

All checked 1 Nov 2026. Live pages were read with WebFetch (the browser was not used), so live proof is saved as page-check JSON in `saved_copies/` instead of screenshots. Reddit quotes are saved copies matched word for word against the raw scrape (`raw/reddit_threads.jsonl`, `raw/reddit_external.jsonl`, `stage/p1/records.jsonl`); every author is `speaker_role='buyer'` and was read for signs of selling services (none found).

## Live pages (checked live 1 Nov 2026, page-check JSON)

| File | Used in | Source |
|---|---|---|
| saved_copies/2026-05_linkedin_salesforce-cancel-two-months-no-response.json | Video 20: step 4 (keep it in writing) | https://www.linkedin.com/posts/ryan-hopple-global-operations-management_has-anyone-successfully-canceled-salesforce-activity-7459660836773707776-eZYf |
| saved_copies/2026-10_linkedin_salesforce-9pct-renewal-entrapped.json | Video 20: step 4 (9% chart) and step 5 (fit) | https://www.linkedin.com/posts/rhys-morgan-710b6b254_9-additional-renewal-fees-for-salesforce-activity-7512424454803877888-mp17 |

## Saved copies (2026 Reddit, survey scrape)

| File | Used in | Source |
|---|---|---|
| saved_copies/2026-01_reddit_salesforce-89-days-notice-auto-renew.json (existing, from video 7) | Video 20: hook | https://www.reddit.com/r/salesforce/comments/1ql248u/despite_89_days_notice_salesforce_is_refusing_to/ |
| saved_copies/2026-01_reddit_salesforce-halved-licences-list-price.json (existing, from video 7) | Video 20: step 3 (halved licences, list price; card added in the judge round) | https://www.reddit.com/r/salesforce/comments/1ql248u/despite_89_days_notice_salesforce_is_refusing_to/o1bj999/ |
| saved_copies/2026-02_reddit_salesforce-89-days-solved-legal-ethics.json | Video 20: hook (sorted via Salesforce's legal and ethics team) | https://www.reddit.com/r/salesforce/comments/1ql248u/despite_89_days_notice_salesforce_is_refusing_to/o3wzatb/ |
| saved_copies/2026-04_reddit_salesforce-cancelled-week-before-collections.json | Video 20: step 1 | https://www.reddit.com/r/salesforce/comments/1ql248u/despite_89_days_notice_salesforce_is_refusing_to/of6yx1q/ |
| saved_copies/2026-07_reddit_salesforce-30s-to-20s-terminated-competitor-quote.json | Video 20: steps 3 and 4, "Is a better renewal enough?" | https://www.reddit.com/r/salesforce/comments/1umexhc/salesforce_renewal_user_reduction/ and /oyu8rn7/ |
| saved_copies/2026-08_reddit_salesforce-100k-not-renewing-december.json | Video 20: step 5 | https://www.reddit.com/r/CRMSoftware/comments/1vbs4ze/has_anyone_here_actually_built_their_own_crm/p18pc0j/ |

## Vendor pages (checked live 1 Nov 2026, word for word)

| File | Used in | Source |
|---|---|---|
| saved_copies/2026-11_salesforce_msa-live-check.json (+ the existing saved PDF 2026-10_salesforce_MSA_2026-10-15.pdf, same SHA-1 as the live download) | Video 20: steps 1 to 4 (Order Form definition, §3.1, §5.1, §11.2, §12.3, §12.9 notice address, §12.10 manner of notice) | https://www.salesforce.com/content/dam/web/en_us/www/documents/legal/salesforce_MSA.pdf |
| saved_copies/2026-11_salesforce_renewal-faq.json | Video 20: steps 1, 2, 3, 4 (90-day window, last 30 days, billing contact, sign a new quote, 12-month term) | https://help.salesforce.com/s/articleView?id=005167138&language=en_US&type=1 |
| saved_copies/2026-11_salesforce_your-account-and-licences-pages.json | Video 20: step 1 (Your Account path), step 3 (Company Information) | https://www.salesforce.com/your-account/ · https://help.salesforce.com/apex/HTViewHelpDoc?id=users_license_types_view.htm |
| saved_copies/2026-11_salesforce_pricing-update-2025.json | Video 20: step 4 (6% list increase, Aug 2025) | https://www.salesforce.com/news/stories/pricing-update-2025/ |

Note: the help article "Manage Renewals" (Your Account → Contracts → Manage Renewal) loads by script and could not be read; the script cites the Renewal FAQ and the Your Account page instead, and the editor takes the Contracts screenshot from Salesforce's help pages.

## Survey counts (rerun 1 Nov 2026, video 5 person key)

```sql
WITH b AS (
  SELECT r.*,
    CASE WHEN author IS NULL OR trim(author)='' OR author LIKE 'Verified %' OR author='Verified User'
              OR author LIKE 'Anonymous%' OR author='Verified Reviewer'
         THEN 'rec:'||rec_id ELSE 'a:'||lower(trim(author)) END AS person
  FROM records r WHERE speaker_role='buyer'
)
SELECT 'ALL_BUYERS', count(*), count(DISTINCT person) FROM b
UNION ALL SELECT 'RENEWAL_ALL', count(*), count(DISTINCT person) FROM b WHERE pain_tags LIKE '%"contract_renewal"%'
UNION ALL SELECT 'SF_ALL', count(*), count(DISTINCT person) FROM b WHERE lower(crm_from) LIKE '%salesforce%'
UNION ALL SELECT 'SF_RENEWAL', count(*), count(DISTINCT person) FROM b WHERE lower(crm_from) LIKE '%salesforce%' AND pain_tags LIKE '%"contract_renewal"%'
UNION ALL SELECT 'SF_RENEWAL_2026', count(*), count(DISTINCT person) FROM b WHERE lower(crm_from) LIKE '%salesforce%' AND pain_tags LIKE '%"contract_renewal"%' AND date>='2026'
UNION ALL SELECT 'SF_FIT', count(*), count(DISTINCT person) FROM b WHERE lower(crm_from) LIKE '%salesforce%' AND pain_tags LIKE '%"rigidity_fit"%';
```

```
ALL_BUYERS|7165|6007
RENEWAL_ALL|760|680
SF_ALL|1029|855
SF_RENEWAL|189|153
SF_RENEWAL_2026|55|41
SF_FIT|219|204
```

Said on camera: Salesforce customers "more than 850" (855); renewal or contract "more than 150" (153); "doesn't fit how we work" "more than two hundred" (204). Not said: all buyers 6,007; contract_renewal across all CRMs 680; Salesforce renewal posters in 2026, 41.

## Considered and dropped

- Saved copies written but cut for length (files kept): 2026-05_reddit_salesforce-slack-renewed-despite-requests.json (Slack contract renewed despite requests), 2026-07_reddit_salesforce-same-contract-amount-fewer-licences.json (same contract amount with fewer licences), 2026-10_reddit_salesforce-renewal-increase-9pct-20pct.json (9% and 20% renewal increases; the 9% on screen now comes from the live-checked LinkedIn post).
- $30,000 Premier Success (video 7) and the 85-month term (video 7 evidence): cut for length.
- Trustpilot 6abc0be8 (auto-renewed, blocked from cancelling 4 days later) and 6acf8e75 ("pushing off our contract renewals"): checked live, small or no money detail, not used.
- LinkedIn Aaron Hatch ("up to 9%"): headline is about Salesforce leadership, possibly a seller; not used.
- Trustpilot 6a79e554 (17–27% increase): the reviewer is a Salesforce consultant (seller), as in video 7.

## Judge round (1 Nov 2026)

- Hook no longer gives a dollar figure (the ~$100k ACV comment is video 7's); $100k now belongs only to the step 5 company (p18pc0j). The hook ends with how it was sorted (o3wzatb, new saved copy).
- Notice: §11.2 "(email acceptable)" is quoted with §12.9 (notice address) and §12.10 (termination notices by email are not effective unless the agreement says otherwise); the script now says to get auto-renew confirmed off in writing, check Your Account, and post the notice too when the money is big.
- The FAQ line "those requests must be submitted before the 90-day deadline" supports "ninety is your real deadline" and thumbnail 1.
- The 25/18/7 licence icons are tagged **Example**.
