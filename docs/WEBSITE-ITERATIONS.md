# Company Native website iterations

## What the website must make a B2B SME understand

Company Native builds an SME's first CRM around how that company already works. The primary visitor has no CRM and keeps leads, customer history and follow-up in spreadsheets, inboxes, chat or memory. The secondary visitor already has a CRM but wants out; that visitor can start with the replacement and add paid migration and customization. The current offer is a paid, hands-on build for approximately five reference customers. The free self-builder is the later product, not a capability available today.

## Website direction reset — 2026-08-30

### Objective and critical action

The main site must help a suitable SME understand what its first CRM would change and begin a short conversational first-CRM plan. The separate `crm-final-vision/` site remains outside this update.

### Truth inventory

**Verified:** Yusuf founded FunnelBud in 2015; FunnelBud served more than 450 Swedish companies; Company Native is in development; the current roadmap begins with approximately five paid manual CRM builds; the primary audience has no CRM; CRM migration is a secondary paid service; the future self-builder is intended to provide a free CRM; the website assistant and D1 lead storage already work.

**Reasonable inference:** founders, CEOs, sales leaders and service-delivery leaders at small B2B companies are likely to choose or approve the first CRM; the most familiar symptoms are leads and customer history split across spreadsheets, inboxes, chat and memory.

**Untested:** the first-customer offer will convert; customers will prefer a custom first CRM to free standard tools; lessons and satisfaction signals will transfer across companies; the future self-builder and migration automation will work as intended.

### Relevant visitor roles

- The primary owner or leader needs to see what the first CRM will make easier, why a tailored build is worth considering when free standard CRMs exist, and what happens after starting the conversation.
- The person who will use the CRM needs a simple first system that reflects real work and does not add administration.
- The secondary migration buyer needs to know that an existing CRM does not exclude them, while understanding that migration is not the main pitch.
- A trust reviewer needs honest current-versus-future capability, clear ownership and careful treatment of customer data.

### Three directions considered

1. **Your first CRM, built around how you work.** Lead with the desired outcome, show the spreadsheet/inbox problem, explain the hands-on service, then place migration and the self-builder in their proper secondary and future roles.
2. **Stop losing leads in spreadsheets.** Lead with urgent pain and follow-up failure. This is vivid but too narrow for companies whose larger problem is delivery, customer history or cross-team handoffs.
3. **Build your first CRM.** Lead with the future self-builder and free product. This is the long-term product direction but would make the current manual service look available as software before it exists.

Direction 1 is selected. It covers the whole first-CRM job, remains honest about the current service and supports the future product without turning the main site into the separate vision site. Direction 2 supplies the early recognition section. Direction 3 remains the roadmap, not the current call to action.

### Current largest risk

The visitor can choose a free standard CRM today. The page must explain plainly that a free generic system may be right for a standard pipeline, while Company Native is for a company whose first CRM needs to fit the way it sells, delivers and serves customers. Unsupported cost parity, guarantees and finished-system claims must be removed.

### Verification record

Completed on 2026-08-30.

- **First rendered cycle:** English desktop at 1440 × 900 and Swedish mobile at 390 × 844 preserved the established design, had no horizontal overflow and kept the first-CRM story coherent. The contact alternative now asks what the visitor wants to say and then asks for a reply address in the same conversation instead of revealing a separate form.
- **Largest issue found and fixed:** the Swedish AI response sometimes used `ni/er`, CRM jargon and more than one question. The prompt now requires ordinary `du/ditt` language, the route cleans the small set of recurring formal terms and only shows the first question when a model returns several.
- **Fresh cold review:** the exact limited first-customer offer appeared three times. The final page now states “about five paid, hands-on builds” once near the opening; later sections explain the learning roadmap and the paid next step without repeating the scarcity.
- **Challenge pass:** the page openly says a free standard CRM may be right for a standard pipeline. Company Native is positioned for a first CRM that must fit sales, delivery or service. Existing-CRM customers receive one secondary migration route and one FAQ answer without taking over the main story. No unsupported price, guarantee or completed-self-builder claim remains.
- **Automated and structural checks:** full ESLint, TypeScript, production build and `git diff --check` passed. Both languages have one H1, labeled visible controls, image alternatives, no duplicate IDs and the correct page language. English and Swedish privacy routes use the first-CRM terminology and have no overflow.
- **Behavior checks:** the main button lands on the planner; adaptive questions reach a structured plan and then request a work email; the personal-contact branch asks one useful question at a time and returns to the preserved CRM-plan state. A local completed plan was saved to D1 and its exact synthetic row was removed.
- **Live check:** Cloudflare Worker version `d8edbed8-8dc9-40fa-9108-a96134db2988` is live on `companynative.com`. The first live transcript exposed one final blocker: both AI models could return invalid output and strand a visitor. A structured answer-based fallback was added and redeployed. The repeated live test then returned a complete plan, saved the assessment to the production D1 database and the exact synthetic record was removed. English desktop and Swedish mobile routes, metadata, privacy pages and primary/secondary messages were checked on the public domain with no material issue remaining.

## Historical records below

The remaining entries preserve decisions and audits from earlier migration-first versions. They are history, not the current Company Native strategy; the 2026-08-30 reset and `docs/STRATEGY.md` govern the current site.

## Final naming decision — Company Native

Yusuf replaced the descriptive working name `CRM That Fits` with **Company Native** on 2026-08-24. The new name supports the venture-scale thesis beyond CRM: the future is company-native software, and CRM is the first customer-facing system we migrate. `companynative.com` was registered through Cloudflare for $10.46 for the first year, renewing at $10.46 per year. Yusuf later confirmed that keeping the registration and hosting on Cloudflare is fine.

The renamed site is live at <https://companynative.com>, with English at `/en` and Swedish at `/se`. CRM is the first offer on the main website; Yusuf decided that a separate CRM subdomain is unnecessary. Every public route returned 200, the live Company Native assessment produced and saved a complete result, and the synthetic verification row was removed afterward.

The Company Native LinkedIn company page was created at <https://www.linkedin.com/company/companynative/> on 2026-08-24. X requires a distinct phone number, Google account, Apple account, or email address before its Company Native account can be completed.

The main action is now a short conversational first-CRM plan that learns how the prospect currently tracks leads and customers, what work is being lost or repeated, who needs the system and what the first useful CRM should do. An existing CRM remains one possible starting answer rather than the assumed starting state.

## Brand and domain

The current name is **CRM That Fits** and the intended domain is **crmthatfits.com**. Both `crmthatfits.com` and `crmthatfits.se` were unregistered when checked on 2026-08-24, but the current plan needs only the `.com`, with English at `/en` and Swedish at `/se`. The name states the core benefit without requiring the visitor to understand an invented category. Immediately before purchase, `crmthatfits.com` was checked again and remained available. Cloudflare showed a price of **$10.46 USD for the first year and $10.46 USD per year at renewal**.

## Internal first version — 2026-08-24

The first English version was built and privately deployed at <https://crm-that-fits.yusufyoung.chatgpt.site>. It includes the customer-facing vision, four concrete examples, the V0-to-north-star migration path, the observe-design-build-improve system, time/migration/ownership/security objections, Yusuf's FunnelBud history, the larger software vision and a conversational assessment prototype.

## Buyer review round 1

### Paper cycle 1: the opening

A HubSpot, Salesforce or Pipedrive customer understands the promise immediately and the safe migration diagram reduces some fear. The first unconscious objection is still cost and project size: “Custom software sounds expensive, slow and disruptive.” The money-back first pilot is the strongest answer, but it appears near the bottom. Put the small first step and guarantee beside the first assessment button.

### Paper cycle 2: credibility

“A decade inside CRM” is useful but soft. The site has stronger public evidence: Yusuf founded FunnelBud in 2015 and FunnelBud says it served more than 450 Swedish companies. State that relationship plainly near the first screen so the visitor does not need to read the founder section before trusting the offer.

### Paper cycle 3: personal relevance

The examples help a visitor see that this is more than a custom sales pipeline. After recognizing their situation, the next question is “What is the first improvement in my company?” Add a direct assessment invitation immediately after the examples instead of waiting until the end.

### Paper cycle 4: why this team can win

The site explains that the system learns one customer's workflow, but not the strongest new reason it can become better and faster than an agency: our private system can find proven patterns across every implementation and apply the useful learning to future work. Explain the benefit without implying that customer data or code is exposed to other customers or frontier AI providers.

### Paper cycle 5: assessment trust

The assessment looks easy, but “AI” and “private conversation” are not enough. A serious buyer will wonder what happens to the answers and whether entering an email triggers an immediate sales chase. Say what the conversation produces, why contact details are requested and that it is not a booking form. The finished implementation must actually use AI and retain qualified leads securely; the internal draft is currently only the interaction prototype.

### Best paper version after round 1

Keep the name and visual direction. Bring the no-risk pilot and FunnelBud proof into the first screen, add an assessment invitation after the examples, explain the cross-customer learning advantage with clear privacy boundaries, and make the assessment's output and data use more concrete.

## Buyer review round 2

### Paper cycle 1: what category is this?

The improved opening makes the cost and migration risk feel smaller. A new question now becomes more visible: “Is this a software product, a development agency, or a CRM consultancy?” The answer is a service with a proprietary system behind it. Add a compact comparison showing why it is different from generic CRM and a conventional custom build.

### Paper cycle 2: can the price promise be real?

“Start at what your current CRM costs” is powerful but may sound impossible beside a custom build. Connect the commercial promise directly to the reason it can work: AI-assisted development and reuse of proven components and engineering patterns instead of starting from zero.

### Paper cycle 3: is this meant for my company?

The use cases show range, but the site never says who gets the most value. State that the service is for B2B SMEs whose CRM has become central to sales, delivery or customer service and whose important work no longer fits a generic tool. This helps suitable prospects lean in and unsuitable ones self-select out.

### Paper cycle 4: can I act after a long read?

The page is intentionally a full vision and risk explanation, so it is long. The mid-page and footer invitations help, but the main navigation disappears while scrolling. Keep the assessment action available through a restrained sticky navigation bar.

### Paper cycle 5: does the brand still fit?

`CRM That Fits` remains stronger than a technical or invented name because every section reinforces the same contrast: adapt the CRM to the company, not the company to the CRM. No better available name creates enough benefit to justify switching.

### Best paper version after round 2

Keep the content and visual direction, add the category comparison and best-fit customer, explain why price parity is possible, and keep the assessment button available while the visitor reads.

## Buyer review round 3

### Paper cycle 1: what do I receive?

The assessment is the only action we ask a visitor to take, but “an initial view” is too vague to justify sharing a work email. Promise a concrete short assessment: the strongest small improvement, who it would help, why it is suitable before migration and whether CRM That Fits appears to be a sensible fit.

### Paper cycle 2: is this secretly a sales-call form?

The site now says the visitor is not booking a call, which removes much of the friction. Reinforce that the email is requested to deliver the assessment and that a human conversation comes only when both sides see a useful opportunity.

### Paper cycle 3: what data is safe to share?

A CRM discussion can quickly involve customer and employee information. The assessment should tell visitors not to enter sensitive customer data, link to a plain privacy explanation and store only what is needed to prepare and follow up on the assessment. This is both a trust requirement and a launch requirement.

### Paper cycle 4: is anything important still buried?

The main objections—cost, disruption, time, lock-in, security and credibility—now appear either in the first screen or in clearly scannable headings. The larger vision differentiates the company without replacing the practical offer. No further section needs to move or be added.

### Paper cycle 5: does the domain still fit?

The brand now appears repeatedly beside “fit your business,” “adapt the system to you” and concrete custom processes. The name has become more coherent as the site improved. Keep `crmthatfits.com`.

### Best paper version after round 3

Make the assessment deliverable specific, add the necessary privacy boundary and then stop changing the main story unless implementation or Swedish-language review exposes a new material problem.

## Publishing choice

Yusuf chose the easiest familiar platform and preferred Cloudflare. The public website now runs at <https://crm-that-fits.yusufh.workers.dev> until the custom domain is purchased and connected. The same Cloudflare deployment serves the website, the AI assessment endpoint, rate limiting and secure D1 lead storage. The Sites deployment remains the archived internal preview of the first English draft.

## Buyer review round 4

### Paper cycle 1: does the Swedish version sound written for a Swedish buyer?

The Swedish version keeps the direct promise and the safe migration logic without reading like a literal translation. The most important terms—migrering, arbetsflöden, superanvändare, ägande and säkerhet—are familiar to a Swedish B2B decision-maker. Keep English and Swedish as equal full versions, with a small language switch rather than a separate Swedish campaign page.

### Paper cycle 2: does the assessment now earn the work email?

The real assistant adapts its next question, returns a named first opportunity, says who benefits, explains why it can be tested before migration and gives a plain fit judgment. Label those pieces in the result so the output reads as a small assessment rather than four unconnected paragraphs.

### Paper cycle 3: what happens after the email is entered?

Do not promise an automatic email that the current launch does not send. Show the completed assessment on the page and save the qualified lead securely. Make clear that the email saves the result and enables useful human follow-up; it does not book a call.

### Paper cycle 4: is the AI dependable enough for a first public version?

Use Cloudflare's strongest general-purpose model in the account as the primary assessment model. Its capacity can occasionally be busy, so fall back to Cloudflare's fast multilingual model instead of making the visitor restart. Limit answer length, conversation length and requests per minute before exposing the endpoint publicly.

### Paper cycle 5: is the privacy promise specific enough?

The assistant warns visitors not to enter sensitive customer or personal data. A bilingual privacy page now states what is stored, why it is used, where AI and storage run, how it is shared and retained, and what a visitor can ask us to change or delete.

### Best paper version after round 4

Keep the main story unchanged. Label the assessment result, show it immediately after qualification, avoid promising automatic email delivery, add model fallback and rate limiting, and publish the full privacy explanation in both languages.

## Buyer review round 5 — completion audit

### Paper cycle 1: can a cold buyer explain the offer after the opening?

Yes: CRM That Fits learns how the company works, builds a CRM around it and handles the move. The small no-migration pilot and money-back promise answer the first risk objection before the buyer has to scroll.

### Paper cycle 2: do the examples and process make the vision credible?

Yes: the four business examples show concrete work beyond a sales pipeline, and the V0, V1, V2 and north-star sequence explains how a large ambition becomes a safe project. The FunnelBud record supplies relevant CRM credibility rather than generic founder biography.

### Paper cycle 3: is another copy or structure change likely to improve conversion materially?

No material blocker remains in the main message. Cost, time, disruption, ownership, security, credibility, ideal customer, the first action and the long-term difference are all visible and connected. Further copy changes now risk adding weight without answering a new buying question. Stop the message iteration and move to final deployment, domain purchase and live-flow verification.

## Live-flow completion audit

The first full public assessment exposed two implementation-level conversion problems that the paper reviews could not reveal. The model could repeat the email request, claim it would send an email or return an empty completion message. The consent and completion messages are now fixed bilingual product copy; AI still controls the adaptive questions, qualification and assessment itself. The live English and Swedish flow was then tested through final qualification and D1 storage, and the synthetic audit records were removed.

The mobile check found no horizontal overflow, but an assessment button originally landed at the top of the explanatory section, leaving the chat below the first screen. Every assessment button now lands directly on the assistant while the supporting explanation remains visible during normal reading. No further material problem appeared in the desktop, mobile, English, Swedish, privacy, AI or storage checks.

## Frozen Company Native identity - 2026-08-24

The old CN monogram felt credible but generic. Six buyer-perspective rounds converged on the Coremark: an open, engineered frame adapting around one warm company core. The established evergreen, warm paper, mint and coral palette remains, now with explicit accessibility rules and a Geist/Georgia typography system. The complete brand guide, logo masters, social profile assets, English and Swedish launch posts and one-pagers, assessment and proposal covers, presentation cover and email signature live in `brand/`. The website now uses the Coremark and Native Ink on coral actions so button text meets contrast requirements.

## Immediate human contact — 2026-08-24

The assessment window now lets a visitor ask for a personal reply before answering the assistant's first question. The assessment remains open by default, the human-contact form does not erase any assessment progress, and a visitor can return to the assistant after sending a message. Direct contact requests store only the work email and optional note in a separate Cloudflare D1 table; the bilingual privacy page now explains that use.

## Customer acquisition feedback loop — 2026-08-25

The site now records anonymous, first-party steps from the landing page through either the CRM assessment or direct human contact. Each visit keeps its source, campaign, message, language, approximate country and device type without analytics cookies, raw IP storage or a persistent identity across later visits. Completed leads retain that visit attribution.

The password-protected dashboard shows where visits stop, which sources and messages produce leads, which assessment leads appear qualified, and which leads reach a conversation, pilot proposal or customer. Its campaign-link builder creates consistent tagged links, and each lead can be updated through the customer outcome so marketing can be judged against the goal of 10 customers rather than clicks alone.

## Marina feedback pass without a strategy change — 2026-08-26

Yusuf explicitly kept the current website strategy: Company Native is for founders, CEOs and sales leaders at B2B SMEs whose established CRM has become central but no longer fits important work. The page still leads to a small no-migration pilot, then a safe replacement of the current CRM. This pass does not retarget the site toward companies without a CRM.

Marina's clear copy improvements were applied within that strategy. The Swedish page now addresses the decision-maker as `du/ditt` instead of `ni/ert`, and both languages lead more often with the buyer's situation instead of Company Native's actions. A new early section creates recognition through Excel beside the CRM, accumulated custom fields, special reports and manual handoffs between teams. The best-fit line now names founders, CEOs and sales leaders directly.

The ownership and learning advantage is also clearer: the customer owns the CRM, code and data, while reusable engineering patterns can improve later implementations without customer data or code being shared with AI labs or other customers. The assessment now listens for the same concrete signs but may use only problems the visitor actually confirms. These changes remain a stronger pre-customer hypothesis, not proof that the market will convert.

A follow-up Swedish-language review replaced literal translations and unnecessary business jargon without changing the message. Examples include `CRM-förflyttning` to `CRM-migrering`, `Passform` to `Hur väl det passar`, `leadformulär` to `kontaktformulär`, `enterprisearbete` to `särskilt känsliga miljöer`, and several passive or English-influenced sentences with ordinary Swedish.
