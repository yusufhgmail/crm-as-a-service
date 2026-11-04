# Video 7 evidence rows (to merge into survey/evidence/README.md)

All saved 27 Oct 2026. Trustpilot pages were checked live with WebFetch (plain downloads hit a bot check, which we did not try to get around), so live proof is saved as page-check JSON in `saved_copies/`. Reddit quotes are saved copies matched word for word against the raw scrape. Vendor pages were downloaded and their text read word for word.

## Live pages (checked live 27 Oct 2026, page-check JSON)

| File | Used in | Source |
|---|---|---|
| saved_copies/2026-01_trustpilot_salesforce-small-team-consultants.json | Video 7: cost 3 (people) | https://www.trustpilot.com/reviews/6979a529f75580561e7f3034 |

## Saved copies (2026 Reddit, survey scrape)

| File | Used in | Source |
|---|---|---|
| saved_copies/2026-08_reddit_salesforce-12-people-35k-85k-quote.json | Video 7: hook, costs 1, 2, 5 | https://www.reddit.com/r/CRMSoftware/comments/1vmymee/7_years_on_salesforce_12_employees_upgrade_quote/ |
| saved_copies/2026-05_reddit_salesforce-premier-success-30k.json | Video 7: cost 2 (add-ons) | https://www.reddit.com/r/salesforce/comments/1t97jq2/salesforce_alternatives/ol052or/ |
| saved_copies/2026-09_reddit_salesforce-to-zoho-200-hour-consultant.json | Video 7: cost 3 and cost 5 | https://www.reddit.com/r/CRM/comments/1w6m23z/50person_construction_company_stay_with/p7o5f3i/ |
| saved_copies/2026-01_reddit_salesforce-halved-licences-list-price.json | Video 7: cost 4 (renewal) | https://www.reddit.com/r/salesforce/comments/1ql248u/despite_89_days_notice_salesforce_is_refusing_to/o1bj999/ |
| saved_copies/2026-01_reddit_salesforce-89-days-notice-auto-renew.json | Video 7: cost 4 (renewal) | https://www.reddit.com/r/salesforce/comments/1ql248u/despite_89_days_notice_salesforce_is_refusing_to/ |
| saved_copies/2026-08_reddit_salesforce-85-month-term.json | Video 7: cost 4 (renewal) | https://www.reddit.com/r/salesforce/comments/1vi4nl8/salesforce_rep_just_pitched_me_an_85_month/ |
| saved_copies/2026-08_reddit_salesforce-18-people-90k-to-25k.json | Video 7: cost 5 (another rented CRM) | https://www.reddit.com/r/CRM/comments/1vmybl6/small_business_outgrowing_salesforce_professional/p3dclo1/ |
| saved_copies/2026-09_reddit_salesforce-50-licences-custom-build.json | Video 7: cost 5 (own software) | https://www.reddit.com/r/CRMSoftware/comments/1wkpmnz/anyone_here_successfully_move_off_salesforce/pasfa5b/ |
| saved_copies/2026-08_reddit_salesforce-custom-key-person-risk.json | Video 7: cost 5 (the risk) | https://www.reddit.com/r/CRM/comments/1vmybl6/small_business_outgrowing_salesforce_professional/p3hbr7g/ |

## Vendor pages (checked 27 Oct 2026, word for word)

| File | Used in | Source |
|---|---|---|
| saved_copies/2026-10_salesforce_sales-cloud-pricing.json | Video 7: costs 1, 2 | https://www.salesforce.com/sales/pricing/ |
| saved_copies/2026-10_salesforce_main-services-agreement.json + 2026-10_salesforce_main-services-agreement.pdf | Video 7: cost 4, cost 5 (§2.2, §5.1, §11.2) | https://www.salesforce.com/content/dam/web/en_us/www/documents/legal/salesforce_MSA.pdf |
| saved_copies/2026-10_salesforce_your-account-page.json | Video 7: cost 4 screen path | https://www.salesforce.com/your-account/ |

Salesforce help pages (help.salesforce.com) load by script and could not be read with WebFetch; their titles and steps were confirmed in the search index only. The editor takes those screenshots.

## Considered and dropped
- Trustpilot 6a79e5540404f0c6ef538ad7 (17–27% renewal increase): the reviewer is also a Salesforce consultant, so a seller.
- Trustpilot 6acf8e75 ("an adder") and 6abc0be8 (auto-renewed, 4 days): checked live, cut for length.
- Reddit 1x1em06 (9% and 20% renewal increases): cut for length.

## Screenshots (checked live 4 Nov 2026)

Sharp PNGs in `proof/`, taken live in Chrome (pricing and help pages) or rendered from Salesforce's own contract PDF, with the script's words highlighted in yellow and numbers boxed in red.

| File | Used in | What it shows |
|---|---|---|
| 2026-11_salesforce-pricing_five-editions-per-user-month.png | Cost 1 | Starter $25, Pro Suite $100, Core $195, Advanced $395, Max $550 user/month (also: Premier Success is an add-on on Pro Suite) |
| 2026-11_salesforce-pricing_pro-suite-5-flows-no-approvals.png | Cost 1 | Pro Suite: Flow Builder "5 flows per org", no Approval Processes (Core and up have both) |
| 2026-11_salesforce-pricing_pro-suite-api-extra-25.png | Cost 1 | Pro Suite: Web Services API "Additional $25 USD/user/month" |
| 2026-11_salesforce-pricing_faq-add-ons-apps-additional-products.png | Cost 2 | FAQ "Are there upfront costs or additional fees?": "all kinds of add-ons, apps, and additional products" |
| 2026-11_salesforce-msa_last-updated-october-15-2026.png | Cost 4 | Main Services Agreement "last updated on October 15, 2026" |
| 2026-11_salesforce-msa_11-2-auto-renew-30-days-and-re-pricing.png | Cost 4, cost 5 | §11.2: auto-renews for one-year terms, written notice (email acceptable) 30 days before the end, re-pricing when volume or length decreases |
| 2026-11_salesforce-msa_5-1-licences-cannot-be-decreased.png | Cost 4 | §5.1 (iii): quantities can't be decreased during the term |
| 2026-11_salesforce-msa_data-export-within-30-days.png | Cost 5 check | Ask for your data within 30 days; after that, no obligation to keep it |
| 2026-11_salesforce_main-services-agreement_oct-15-2026.pdf | Cost 4, 5 | The current contract PDF, downloaded 4 Nov 2026 |
| 2026-11_help-center_view-licenses-company-information.png | Cost 1 check | Licences are on the Company Information page in Setup |
| 2026-11_help-center_manage-renewals-90-days.png | Cost 4 check | Renewal shows at 90 days; "We can't accommodate cancellation requests until it's time to renew" |
| 2026-11_help-center_contracts-subscription-days-left.png, 2026-11_help-center_contract-renewal-status-pane.png, 2026-11_help-center_manage-renewal-confirm-contact-dont-renew.png | Cost 4 check | Salesforce's own images of Your Account → Contracts → Manage Renewal, at full size |
| 2026-11_help-center_data-export-now.png | Cost 5 check | Setup → Data Export → Export Now |

Note: the help page says "Launch the Your Account app, click Go to Contracts". The script's path (Setup gear → Your Account → Contracts) matches the saved your-account page.

Reddit blocks automated browsers (Chrome's extension refuses the site), so the Reddit quotes rely on the saved copies in `survey/evidence/saved_copies/` (on GitHub: `proof/saved_copies/`), the same as videos 1 to 6.
