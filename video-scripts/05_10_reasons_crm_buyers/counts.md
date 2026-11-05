# Video 5: survey counts (computed 27 Oct 2026)

Database: `survey/survey.sqlite`, table `records`, `speaker_role='buyer'` only (sellers, agencies, consultants and vendors are tagged `seller_*` and excluded). One person = distinct lower-cased `author`; anonymous placeholders (empty, "Verified Reviewer", "Verified User…", "Anonymous…") count once per `rec_id`. Pains come from the JSON array `pain_tags`.

## SQL 1: totals, pains, segments

```sql
-- person key: author where present and not an anonymous placeholder, else rec_id
WITH b AS (
  SELECT r.*,
    CASE WHEN author IS NULL OR trim(author)='' OR author LIKE 'Verified %' OR author='Verified User'
              OR author LIKE 'Anonymous%' OR author='Verified Reviewer'
         THEN 'rec:'||rec_id ELSE 'a:'||lower(trim(author)) END AS person
  FROM records r WHERE speaker_role='buyer'
)
SELECT 'ALL_BUYERS', count(*), count(DISTINCT person) FROM b
UNION ALL
SELECT 'PAIN:'||j.value, count(*), count(DISTINCT person) FROM b, json_each(b.pain_tags) j GROUP BY j.value
UNION ALL
SELECT 'SEG:'||segment, count(*), count(DISTINCT person) FROM b GROUP BY segment
UNION ALL
SELECT 'ANY_PAIN', count(*), count(DISTINCT person) FROM b WHERE json_array_length(pain_tags)>0
ORDER BY 3 DESC;
```

Output (label | posts | unique people):

```
ALL_BUYERS|7175|6014
ANY_PAIN|6484|5492
PAIN:price|3209|2853
SEG:A|2919|2538
PAIN:rigidity_fit|2031|1866
PAIN:complexity|1309|1243
SEG:G|1340|1191
SEG:C|1245|1144
PAIN:support|1123|1058
PAIN:integration|1080|1007
PAIN:contract_renewal|760|680
PAIN:tier_jump|688|631
SEG:D|574|552
SEG:E|632|527
PAIN:migration_risk|469|432
PAIN:adoption|426|404
PAIN:consultant_dependency|421|398
PAIN:seat_growth|420|391
PAIN:maintenance_burden|416|378
SEG:B|304|272
PAIN:data_ownership|207|195
PAIN:ai_features|215|194
SEG:A2|74|53
SEG:H|44|43
SEG:F|40|35
SEG:X|3|3
PAIN:add-on price|1|1
```

## SQL 2: stuck, CRM split, price overlap

```sql
WITH b AS (
  SELECT r.*,
    CASE WHEN author IS NULL OR trim(author)='' OR author LIKE 'Verified %' OR author='Verified User'
              OR author LIKE 'Anonymous%' OR author='Verified Reviewer'
         THEN 'rec:'||rec_id ELSE 'a:'||lower(trim(author)) END AS person
  FROM records r WHERE speaker_role='buyer'
)
SELECT 'STUCK_A_or_G', count(DISTINCT person) FROM b WHERE segment IN ('A','G')
UNION ALL SELECT 'CRM_hubspot', count(DISTINCT person) FROM b WHERE crm_from LIKE '%hubspot%'
UNION ALL SELECT 'CRM_salesforce', count(DISTINCT person) FROM b WHERE crm_from LIKE '%salesforce%'
UNION ALL SELECT 'CRM_other_named', count(DISTINCT person) FROM b WHERE crm_from<>'' AND crm_from NOT LIKE '%hubspot%' AND crm_from NOT LIKE '%salesforce%'
UNION ALL SELECT 'PRICE_with_control_tag', count(DISTINCT person) FROM b WHERE pain_tags LIKE '%"price"%' AND (pain_tags LIKE '%contract_renewal%' OR pain_tags LIKE '%tier_jump%' OR pain_tags LIKE '%seat_growth%')
UNION ALL SELECT 'PRICE_only_tag', count(DISTINCT person) FROM b WHERE pain_tags='["price"]'
UNION ALL SELECT 'SOURCES', count(DISTINCT source) FROM b
UNION ALL SELECT 'DATE_MIN_'||min(date), 0 FROM b WHERE date<>''
UNION ALL SELECT 'DATE_2026', count(DISTINCT person) FROM b WHERE date>='2026';
```

```
STUCK_A_or_G|3655
CRM_hubspot|1344
CRM_salesforce|856
CRM_other_named|2886
PRICE_with_control_tag|1134
PRICE_only_tag|603
SOURCES|22
DATE_MIN_2008-02-27|0
DATE_2026|1726
```

Segments: A = thinking about leaving, still on it; G = staying, defending or negotiating; C = switched to another SaaS CRM, happy; D = switched, regret; B = scared or held back.

## Used in the video (exact → said on camera)

| Reason | Tag | Unique buyers | Said |
|---|---|---|---|
| 10 Seats | seat_growth | 391 | around 400 |
| 9 Paying for every change | consultant_dependency | 398 | around 400 |
| 8 Team won't use it | adoption | 404 | around 400 |
| 7 Tier jumps & limits | tier_jump | 631 | 600+ |
| 6 Renewals & contracts | contract_renewal | 680 | around 700 |
| 5 Integrations | integration | 1,007 | 1,000+ |
| 4 Support | support | 1,058 | 1,000+ |
| 3 Too complicated | complexity | 1,243 | 1,200+ |
| 2 Doesn't fit how we work | rigidity_fit | 1,866 | around 1,900 |
| 1 Price | price | 2,853 | almost 3,000 |

- All buyers: 6,014 unique (7,175 posts), said "more than 5,000" (REPORT.md's 5,643 uses a different anonymous rule; both are above 5,000).
- Price + (contract_renewal or tier_jump or seat_growth): 1,134 → "1,100+". Price as the only tag: 603 → "around 600".
- Still on their CRM (segment A or G): 3,655 of 6,014 = 61% → "about six in ten", chart "~3,700".
- Switched, happy (C): 1,144 → "~1,100". Switched, regret (D): 552 → "500+", "about half as many as are happy".
- Left out of the ten: migration_risk 432 (a reason people stay, used as context for "stuck"), maintenance_burden 378 (11th), data_ownership 195, ai_features 194.
