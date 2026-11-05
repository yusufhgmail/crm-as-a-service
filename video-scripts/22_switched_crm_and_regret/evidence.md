# Video 22 evidence rows (to merge into survey/evidence/README.md)

Script: `videos/finished/22_switched_crm_and_regret/script.md`. All saved 1 Nov 2026. Live pages were checked with WebFetch (the browser was not used), so live proof is saved as page-check JSON in `saved_copies/` instead of screenshots. Take a highlighted screenshot of each live-checked page before filming.

## Live pages (checked live 1 Nov 2026, page-check JSON)

| File | Used in | Source |
|---|---|---|
| saved_copies/2026-07_trustpilot_zoho-to-salesforce-16000-emails-upgrade_2026-11-01.json | Video 22: hook, second story (also in video 5's body) | https://www.trustpilot.com/reviews/6a66c979ddd22a6a6b93bcec |
| saved_copies/2026-02_hubspot-community_zoho-to-hubspot-enterprise-forced-back.json | Video 22: opening story, lesson 4 callback | https://community.hubspot.com/t/sequences-causing-microsoft-to-block-inbox-enterprise-plan/145844 |
| saved_copies/2026-06_trustpilot_workiz-to-jobber-only-solution-upgrade.json | Video 22: lesson 1 | https://www.trustpilot.com/reviews/6a1ef647d2088df4e9b5ce64 |
| saved_copies/2026-11_jobber_pricing_check.json (vendor page) | Video 22: lesson 1 (Core $29, Connect $99, Grow $149, 1 user, billed annually) | https://www.getjobber.com/pricing/ |
| saved_copies/2026-11_hubspot_terms_2-5_3-2_4-1_check.json (vendor page) | Video 22: lesson 5 (§2.5 no downgrade during the term, §4.1 auto-renewal, §3.2 list price at renewal) | https://legal.hubspot.com/terms-of-service |

## Saved copies (G2, Capterra, Reddit)

| File | Used in |
|---|---|
| 2026-05_g2_freshsales-cheaper-than-hubspot-team-back-to-excel.json (new; G2 invited this review with a reward) | Video 22: lesson 2 |
| 2026-07_capterra_left-salesforce-unable-to-get-changes-done.json (existing, video 12) | Video 22: lesson 2 |
| 2026-09_reddit_crm_salesforce-to-zoho-campaigns-3-account-managers.json (new) | Video 22: lesson 3 |
| 2026-01_g2_zoho-to-hubspot-fields-not-translating.json (new; G2 invited this review with a reward) | Video 22: lesson 4 |
| 2026-08_capterra_hubspot-ceo-paying-out-11-months.json (existing) | Video 22: lesson 5 |

## Survey counts (rerun 1 Nov 2026)

Person key from video 5 (`videos/finished/05_10_reasons_crm_buyers/counts.md`), buyers only:

```sql
CREATE TEMP VIEW b AS SELECT r.*,
  CASE WHEN author IS NULL OR trim(author)='' OR author LIKE 'Verified %' OR author='Verified User'
            OR author LIKE 'Anonymous%' OR author='Verified Reviewer'
       THEN 'rec:'||rec_id ELSE 'a:'||lower(trim(author)) END AS person
FROM records r WHERE speaker_role='buyer';

SELECT 'ALL', count(*), count(DISTINCT person) FROM b;                                   -- 7165 | 6007
SELECT segment, count(*), count(DISTINCT person) FROM b WHERE segment IN ('C','D') GROUP BY 1;  -- C 1244 | 1144 ; D 572 | 551
SELECT count(DISTINCT person) FROM b WHERE segment IN ('C','D');                          -- 1672
SELECT j.value, count(DISTINCT person) FROM b, json_each(b.pain_tags) j
 WHERE segment='D' GROUP BY 1 ORDER BY 2 DESC;   -- and the same with segment='C'
```

| Count | Exact | Said |
|---|---|---|
| All buyers | 6,007 | more than five thousand |
| Switched (C or D) | 1,672 | nearly seventeen hundred |
| Switched, regretted (D) | 551 (572 posts) | more than five hundred; 33% = about one in three |
| Switched, happy (C) | 1,144 | 1,100+ |
| D: price | 235 (43%) vs C 489 (42.7%) | more than two hundred and thirty, more than four in ten; happy switchers the same share |
| D: poor fit (rigidity_fit) | 192 (35%) vs C 336 (29%) | almost two hundred, about one in three |
| D: support | 182 (33%) vs C 129 (11%) | more than a hundred and eighty; one in three vs one in ten |
| D: migration_risk | 77 (14%) vs C 78 (7%) | almost eighty "wrote about trouble with the move or the setup" (about half of sampled records are setup or fit, not the move) |
| D: contract_renewal | 113 (21%) vs C 59 (5%) | more than a hundred and ten; one in five vs one in twenty; widest D/C ratio of any tag (~4×) |
| D, other tags (not said) | complexity 112, integration 110, tier_jump 54, consultant_dependency 51, adoption 37, data_ownership 20, seat_growth 19, maintenance_burden 18 | |
| D: tier, seat or renewal tag (not said) | 169 (31%) vs C 127 (11%) | |
| All buyers, top four pains | price 2,848, rigidity_fit 1,860, complexity 1,239, support 1,056 | price is the number one complaint |
| D moves between HubSpot, Salesforce and Zoho (both CRMs named; 255 regretters name both) | 29 people; Salesforce→Zoho 7, HubSpot→Salesforce 7, Salesforce→HubSpot 6, HubSpot→Zoho 6, Zoho→Salesforce 3, Zoho→HubSpot 2 (direction as recorded; a few records list the regretted CRM first) | in every direction |
| D who named a lower-priced CRM they moved to (Zoho/Bigin, Pipedrive, Freshsales, monday, Bitrix24, Apptivo, Insightly, EngageBay, Close, Attio, Agile, Nutshell, Capsule, Copper, Zendesk Sell, LACRM, Odoo) | 102; 41 tagged price/tier/seat/renewal (some about the CRM they left) | not said |
| D who said they moved to save money (text search of quote and summary, hand-checked) | 23; 7 of them hit an upgrade, usage cap or contract on the new CRM; most of the rest wrote about support or fit | not said |

## Regretted (D) vs happy (C), per pain (fix round, 1 Nov 2026)

```sql
SELECT j.value, segment, count(DISTINCT person) FROM b, json_each(b.pain_tags) j
 WHERE segment IN ('C','D') GROUP BY 1,2 ORDER BY 1,2;
```

Shares of 551 (D) and 1,144 (C): price 43% vs 43%; poor fit 35% vs 29%; support 33% vs 11% (about 3x); contracts and renewals 21% vs 5% (about 4x, widest); tier jump 10% vs 4%; migration risk 14% vs 7%; consultant dependency 9% vs 4%. Price and fit do not separate the groups; support and contracts do. The script says so in lesson 1 and in "Is switching again enough?".

## Not used

- Trustpilot, David Shelton, Salesforce Enterprise, $10k portal, no downgrade (https://www.trustpilot.com/reviews/6a444da03bbe8f2c5cc5eb7f): checked live 1 Nov 2026, dropped in the fix round because video 5 already uses it.

- Zoho Community comment, Mark Woodruff, 20 Feb 2026 ("I spend more on Zoho plus consultants trying to fix Zoho than I spent on Salesforce. Returning to Salesforce."), https://help.zoho.com/portal/en/community/topic/our-review-of-zoho-crm-after-60-days#comment-205219032469648994: first choice for the hook, but WebFetch does not load the comments (they load by JavaScript), so it could not be checked live. Swapped for the Trustpilot Zoho-to-Salesforce review and the HubSpot Community post.
- Medium post "I Switched Our CRM From HubSpot to Attio" (saas-tools.medium.com, Apr 2026, 8-person team, $1,920 to $11,100, went back): the author runs a SaaS-tools blog, so not clearly a buyer.
- Reused stories from other videos, avoided as hooks: Zoho One +48% renewal and the $500k Salesforce founder (video 9), the Swiss retailer (video 11).
