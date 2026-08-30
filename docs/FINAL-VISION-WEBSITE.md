# Company Native final vision website

**Updated:** 2026-08-30
**Project:** `crm-final-vision/`
**Scope:** A separate, English-language concept website for the final one-click CRM product. It does not replace or modify the current Company Native website.

## Objective and visitor action

The customer website must make the end product understandable: connect approved team email, let Company Native discover how the company works, and receive a populated, company-specific CRM that keeps improving. The primary action is to run a working sample-data concept demo. It does not collect personal data or pretend to connect a real account.

The investor route must explain why the system can compound across installations, how customer information stays separate, what the service-first roadmap creates and what remains unproven.

## Truth inventory

### Verified project facts

- Company Native is the brand and CRM is the complete focus of this business.
- The intended first customers are small companies that do not have a CRM; this is greenfield building, not migration.
- The end vision is one click, Gmail or Microsoft 365 connection, and a populated CRM built from team communications.
- The CRM structure should emerge from the company's work rather than a template.
- Selected customer employees can act as power users and explain why work happens at the relevant moment.
- The strategy calls for a local AI inside each CRM and an umbrella AI that learns approved lessons across installations.
- Customers own their CRM, code and data.
- Company Native is in development. There are no completed Company Native customer installations or measured product results in the project records.
- Yusuf founded FunnelBud in 2015. FunnelBud publicly says it has helped more than 450 Swedish companies.

### Current market facts used to avoid false novelty

- Day AI says it builds customer memory from team email, calls and threads and can generate contacts from email history: <https://day.ai/crmx>
- Clarify says it connects email, calendar and meetings, then builds and maintains a CRM automatically: <https://docs.clarify.ai/en/articles/11702613-what-is-clarify>
- HubSpot says Smart CRM analyzes calls, meetings and emails and suggests record updates and next actions: <https://www.hubspot.com/products/crm/ai-crm>
- Attio describes an AI-native CRM that ingests data, supports configurable systems and lets humans and agents work together: <https://attio.com/blog/attio-raises-52m-series-b>

These products show that automatic capture and AI-assisted CRM are already real. Company Native must therefore lead with the different bet: it builds owned, company-specific software; asks why work happens; and improves new and existing installations from measured lessons across customers.

### Untested hypotheses

- Team communications contain enough information to generate a useful first CRM.
- Power users will answer contextual questions and those answers will improve the CRM.
- Useful CRM patterns will transfer across customers without turning their CRMs into one generic template.
- The privacy architecture can share derived learning without pooling customer messages, code or local memory.
- Build time and manual corrections will fall as installations grow.
- Existing installations will improve from lessons first discovered elsewhere.

The website presents these as the product vision and the investor thesis, not as proven results.

## Relevant visitors

### Small-company founder or operating leader

They need customer information organized without becoming a CRM administrator. They must quickly understand that the system starts populated, fits their company and will not silently change important work. The smallest useful action is a sample-data demonstration.

### Employee or assigned power user

They want less admin, not an AI that interrupts or monitors them without control. They need to see why a contextual question is useful, that questions can be dismissed and that meaningful changes remain reviewable.

### Privacy or technical reviewer

They need the distinction between local customer data and cross-customer learning. They must see that the exact architecture and contract remain to be proven rather than being presented as finished security.

### Investor or strategic partner

They need to understand why this is more than another AI CRM, which proprietary assets accumulate, how service work becomes product advantage, how economics should improve and which milestones would disprove the thesis.

## Directions considered

### 1. The one-button product

Lead with “Connect email. Get your CRM.” Make the entire page feel like the product is one button. This is immediately clear and faithful to the desired experience, but automatic email-based CRM is already offered by current competitors. On its own, the direction makes Company Native look late rather than different.

### 2. Your company is the template — selected

Lead with “Your company already contains the CRM it needs.” The one-click action remains central, but the argument explains that Company Native discovers the structure, asks why work happens and builds owned software rather than filling a standard CRM. This combines immediate comprehension with the strongest defensible difference.

### 3. The CRM that keeps rebuilding itself

Lead with continuous improvement and the umbrella AI. This expresses the moat but asks a customer to understand the internal system before knowing what they receive. It is stronger for investors than for the customer homepage.

The selected customer journey uses direction 2 with the literal button experience from direction 1. Direction 3 becomes the investor route and a later customer section about continued improvement.

## Information architecture

### Customer route `/`

1. Product status, plain outcome and sample-data build button.
2. The complete benefit set together: populated, unique, understands why, captures ideas, keeps improving, customer-owned.
3. A visual path from approved communications to a working CRM.
4. A contextual power-user exchange that shows how intent becomes a reviewable improvement.
5. A simple explanation of local privacy and shared learning.
6. A comparison with template CRM and current AI CRM products.
7. Ownership and control boundaries.
8. Honest questions about availability, data access, changes and alternatives.
9. Repeat the working concept demo.

### Investor route `/investors`

1. The installed-base thesis.
2. The local CRM AI and umbrella AI as two connected systems.
3. The evidence loop and the proprietary assets it creates.
4. The customer and Company Native flywheels.
5. The service-to-product roadmap and business-model boundary.
6. Current alternatives and the narrower claim Company Native must prove.
7. Founder-market fit.
8. Explicit proof milestones and failure conditions.

## Current largest unresolved issue

No real customer has shown that the product's core inference and learning loop works. The concept therefore demonstrates the intended experience with clearly fictional data and keeps the unproven claims visible on the investor route. Real visitor and customer behavior must replace these internal reviews later.

## Review and iteration record

These are internal cold reviews, not customer feedback or conversion evidence.

1. **Cold customer comprehension:** The first version explained the product but did not say soon enough that it is for small companies without a CRM. The opening paragraph and page description now state that audience directly. The rejected alternative was a longer status pill, which overflowed on a 390-pixel screen.
2. **Action and accessibility:** The first finished-CRM mockup included controls that looked clickable but had no behavior, and the modal restored focus during phase changes. Decorative navigation and the suggestion label are now non-interactive. The modal traps keyboard focus, closes with Escape and returns focus to the button that opened it.
3. **Responsive trust copy:** Opening the demo from the lower call to action inherited a dark-section paragraph color, making the sample-data boundary too faint. The dark style is now scoped only to the call-to-action copy. Both demo entry points show the same readable disclosure.
4. **Fresh challenge pass:** The customer route now makes the audience, outcome, difference, ownership, unproven status and sample action clear. The investor route separates the thesis, proprietary learning assets, economics, roadmap and failure test. The remaining alternative changes are matters of visual or wording preference rather than a known material visitor problem.

## Verification record

- `npm run lint` passed.
- `npm run build` passed with all routes statically generated.
- The customer and investor routes were rendered at 1440×900, 1280×633 and 390×844. Neither route produced horizontal overflow, a framework error overlay or a browser error.
- The complete sample journey passed: open the demo, choose fictional Gmail or Microsoft 365 history, reach the populated fictional CRM, rebuild it, close with Escape and return focus to the launch button.
- The same demo passed from the hero and the lower call to action. Its reduced-motion path also reached the finished CRM.
- The power-user example produced a reviewable improvement and the dismissal path remained available.
- The concept remains local and unpublished. It collects no personal data and does not alter the current website.
