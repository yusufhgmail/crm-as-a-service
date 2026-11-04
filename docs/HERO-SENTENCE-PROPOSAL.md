# Proposal: one sentence in the hero (4 Nov 2026)

For Yusuf to accept, change or reject. Nothing on the page is changed until then.

## The problem

The `/en` title is "Custom CRM for small businesses | CRM From Within", chosen because "custom crm" is searched 1,000 times a month in the US. The page text never says "custom CRM" or "small business". Google and AI assistants weigh the page text more than the title, so a title the page does not support is a weak title.

The H1 stays as it is: "A production-ready CRM that shapes itself around your company." It is the brand line and it should not carry a keyword.

## The proposal

Change the paragraph under the H1 (`app/page.tsx`, the `hero-lead` paragraph) so its first sentence says what the title says. Current text (English):

> Keep working as you do now. CRM From Within learns from the customer work you approve, asks a power user what the activity cannot explain and safely adapts the CRM for your team.

Proposed:

> Keep working as you do now. CRM From Within builds a custom CRM for your small business from the customer work you approve, asks a power user what the activity cannot explain, safely adapts it for your team, and you own it.

Same opening, same voice, adds the two phrases the title promises plus "you own it", which is the offer the 25 Oct plan leads with.

Swedish equivalent, for `/se` (title there is "CRM-system byggt efter ditt företag"):

> Fortsätt arbeta som i dag. CRM From Within bygger ett CRM-system efter kundarbetet du godkänner, frågar en ansvarig person om det aktiviteten inte kan förklara, anpassar det tryggt för teamet, och ni äger det.

## Also worth one line each, lower on the page

- In the "Your company has its own way of working" section: one sentence that uses the words "custom CRM" once more.
- In the pricing section: "You own the code" as a bullet, since every guide now says it and the home page does not.

## How to apply

Edit the two strings in `app/page.tsx` and bump `PAGE_DATES['']` in `app/seo.tsx` to the day of the change, so the sitemap and the structured data carry the real date.
