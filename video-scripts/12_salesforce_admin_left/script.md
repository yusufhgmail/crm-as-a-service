# Video 12: What to Do When Your Salesforce Admin Leaves

*Approved by David, 4 Nov 2026*

**Checked 27 Oct 2026:** Salesforce's help articles, Trailhead units and add-on pricing page, word for word. The no-admin and deactivation articles were rechecked 5 Nov 2026. No study numbers in this video. It's told from Yusuf's own experience, plus two public posts from the study: a Hacker News comment pair from 2016, read in full 5 Nov 2026, and a retailer's X post from May 2026.

**Yusuf's answers used** (`videos/YUSUF_ANSWERS_2026-11-04.md`, video 12, no names): Q1 and Q2 (a customer of his old company after a merger: the login, the webinars; nine of 94 cancellations came down to a key person changing) → 0:00 Proof, from his records, checked 5 Nov 2026, and Yusuf said to keep it if it helps · Q3 (the hot-lead list, "you just need to pick who's going to do it", "don't get stuck in how they used to do it") → Step 3, from his records, checked the same day · Q4 (redundancy, the audit is expensive, know your own process) → 7:45, from his 4 Nov interview, confirmed · how that customer ended (billing system, product data) → 8:15, from his records, the same story as video 11. That customer's CRM was not Salesforce, so the script never says it was.

**Screens to record** (no Salesforce account needed):
- **Salesforce screens:** we have no Salesforce org, so every Salesforce screen is a screenshot from Salesforce's help pages or Trailhead, tagged **Salesforce help** or **Salesforce Trailhead**: a user record with **Freeze**; the Setup home page with Object Manager; text cards of the help articles for Users, Scheduled Jobs and delegated administration; the sandbox add-on table (public pricing page).
- **Whiteboard:** the "map" page from Step 3 and the consultant brief from Step 5, written out by Yusuf.

---

## Title and thumbnail

**Title:** What to Do When Your Salesforce Admin Leaves

**Title variations to test:**
1. Your Salesforce Admin Left? Do These 5 Things, in Order
2. Ex-SaaS Founder: What to Do When Your Salesforce Admin Leaves
3. How to Stop Paying a Consultant for Every Salesforce Change
4. Salesforce Admin Gone? How to Take Back Control

**Thumbnail variations** (an empty office chair or a locked Salesforce screen; Yusuf pointing at it; 2–4 words):
1. **YOUR ADMIN LEFT** over an empty desk chair with a Salesforce login screen behind it
2. **WHO HAS THE KEYS?** with a padlock over the Setup → Users screen
3. **ONLY ONE PERSON KNEW** with a Salesforce Setup screen and one name circled in red
4. **ADMIN GONE? DO THIS** with the five-step whiteboard list behind Yusuf
5. **STOP PAYING PER CHANGE** with a stack of consultant invoices crossed out

Pair title 1 with thumbnail 1 first; test 2 with 4, and 3 with 3.

---

## Visual style (for the editor)

- Tags and cards in the same style as videos 1 and 2. No B-roll at all, no effects, no transitions.
- **Salesforce screens:** Trailhead screenshots where the page has one, zoomed in on the exact part with an arrow tag and a red box; otherwise a text card of the help article with the key sentence highlighted. Source tag **Salesforce help** or **Salesforce Trailhead**.
- **Step tracker:** a small tag in the top-left corner the whole time ("Step 2 of 5: Before you deactivate").
- **The map** (built up step by step): a one-page sheet titled **Our Salesforce, on one page**, with five boxes: **Who has access** · **Objects & fields** · **Automations** · **Scheduled jobs** · **Integrations**. Each step fills in its box.
- **Whiteboard:** Yusuf writes the five steps. Typed tags sit on top of his handwriting.

---

## 0:00 Proof

**ON SCREEN:** Yusuf on camera, tag: **Example from Yusuf's old company** (no name, no logo). Then, after the story, two tags: **Hundreds of CRM setups** · **9 of 94 cancellations: a key person changed**

**YUSUF** (straight to camera):
> At my old company, we had a telecom customer that got bought and merged, and the owner, who'd built their whole CRM setup, left. Two new people took it over, and two days after we all met, one of them couldn't find his login.
>
> The main thing they used that CRM for was webinars. They told us, when we want a webinar, someone from your side has to help us. We lost that customer in the end, and the login had nothing to do with it.
>
> I built a CRM SaaS company, and I sold it in 2025. Me and my team set up CRMs for hundreds of companies. And nine out of ninety-four cancellations in our notes came down to a key person changing.

## 0:50 Who it's for

**ON SCREEN:** one tag: **One person knew it. Now they're gone.**

**YUSUF:**
> If your Salesforce lived in one person's head, and that person's leaving or they've already gone, this video is for you.

## 0:55 Promise

**ON SCREEN:** three tags appear beside Yusuf, one per sentence: ✓ **You hold the keys** · ✓ **You know what you have** · ✓ **You stop paying per change**

**YUSUF:**
> By the end you'll have admin access back, and your whole Salesforce on one page. And you can stop paying a consultant for every small change.

## 1:05 Plan

**ON SCREEN:** Yusuf writes the list on the whiteboard; a typed version sits beside it:
1. Take back the keys
2. Check before you deactivate
3. Write down what you have
4. Split the changes
5. Scope the consultant, and ask the fit question

Tag on item 5 when he says "a question about your company": **Does a new admin fix this?**

**YUSUF:**
> The order matters, so the steps are numbered on screen. The last one's a question about your company. It tells you if a new admin really fixes this, or if you'll be right back here when they leave.

---

## 1:20 Step 1: Take back the keys

**ON SCREEN:** step tracker: **Step 1 of 5: Take back the keys**. Tag when he says it: **System Administrator = can change everything**

**YUSUF:**
> Step one, take back the keys. You want two admin logins that the company controls. Anyone with the System Administrator profile can change everything in your Salesforce. So go to your users page, the path's on screen, and see who's got it.

**ON SCREEN:** text card of the help article with the step **Setup → Users → Users**, the **Profile** field and **System Administrator** highlighted · source tag **Salesforce help**. Then a card titled **Salesforce's own advice**, two lines appearing one at a time:
- **Keep more than one System Administrator**
- **Create the new admin first, then freeze or deactivate the old one**

Link: https://help.salesforce.com/s/articleView?id=000385477&language=en_US&type=1

**YUSUF:**
> Salesforce's own help says to keep more than one. When an admin leaves, you set up the new one first, log in as them, and only then switch off the old account.

**ON SCREEN:** card titled **SAY THIS** (to the admin who's leaving, or whoever still has admin access): **"Before you go, please create a System Administrator login for me. And stay logged in while I test it."**

**YUSUF:**
> If the admin's still around, ask them for it. "Before you go, please create a System Administrator login for me. And stay logged in while I test it."

**ON SCREEN:** card titled **No admin left? (Salesforce help)**, lines appearing one at a time:
- **Another admin changes the old admin's email** ✓
- **You can open the old admin's mailbox: reset the password** ✓
- **Neither: Support needs a signed letter from a C-level executive** ✗ (checklist line highlighted: **signature in ink**)

Link: https://help.salesforce.com/s/articleView?id=000385418&language=en_US&type=1

**YUSUF:**
> If nobody's left and you still control the old admin's work email, you can reset the password through it. If you don't, Salesforce Support can do it, but they want a signed letter from your CEO, CFO or owner. Their checklist actually says in ink.

**ON SCREEN:** the map fills its first box: **Who has access: 2 admins**. Then: **DO THIS FIRST: two admins you control**

## 2:15 Step 2: Check before you deactivate

**ON SCREEN:** step tracker: **Step 2 of 5: Before you deactivate**. Tag: **Things run as a person**

**YUSUF:**
> Step two, before you switch off the old login, check what runs under it. A lot of things in Salesforce run as a specific user, and when that user goes, some of them stop working.

**ON SCREEN:** tag **Example**, then a card titled **Salesforce help: a scheduled export run by a deactivated user**:
- **The Data Export will fail** ✗
- **Fix: delete the job and create a new one, as an active user** ✓

Link: https://help.salesforce.com/HTViewSolution?id=000004347

**YUSUF:**
> Say the admin who left set up your weekly data export. Deactivate them and it fails, and Salesforce's fix is to delete the job and set it up again under someone who's staying.

**ON SCREEN:** card titled **Salesforce help: settings that can block deactivation**, lines appearing one at a time:
- **Web-to-Lead default creator** (your website form)
- **Lead and case assignment rules**
- **Auto-response rules**
- **Approval processes: approver or delegated approver**
- **Default workflow user**

Link: https://help.salesforce.com/s/articleView?id=000384761&language=en_US&type=1

**YUSUF:**
> Some settings even have the person's name written into them, and Salesforce won't let you deactivate that person until you've changed them. Every lead from your website form gets created in someone's name, for example, and your rules and approvals can work the same way. The full list is on screen.

**ON SCREEN:** text card from the help article, **Click Scheduled Jobs** highlighted, tag **Setup > Quick Find > Scheduled Jobs** · source tag **Salesforce help**. Then the map fills its box: **Scheduled jobs: who they run as**. Then: **DO THIS THIS WEEK: move every job and setting to someone who's staying**
Link: https://help.salesforce.com/HTViewSolution?id=000004347

**YUSUF:**
> Move each one to someone who's staying. Then open your scheduled jobs page, the path's on screen, and move any job with the old admin's name on it.

**ON SCREEN:** card titled **SAY THIS** (to the admin, before their last day): **"Can you list every job, rule and integration that runs under your login? We'll move each one before we switch it off."**

**YUSUF:**
> If the admin hasn't left yet, this gets a lot easier. "Can you list every job, rule and integration that runs under your login? We'll move each one before we switch it off."

**ON SCREEN:** the typed list, steps 1 and 2 ticked.

## 3:25 Free CRM fit check

**ON SCREEN:** lower-third tag: **Free 20-min CRM fit check · link in description**

**YUSUF:**
> If you want someone to look at this with you, we do a free twenty-minute CRM fit check. The link's below.

## 3:35 Step 3: Write down what you have

**ON SCREEN:** step tracker: **Step 3 of 5: Write down what you have**. The map, all five boxes, two filled and three still empty: **Objects & fields** · **Automations** · **Integrations**

**YUSUF:**
> Step three, write down what you have. I'd bet most of what your admin knew isn't written down anywhere, so every consultant you bring in bills you to rediscover it. Take one page and draw five boxes. That's who has access, objects and fields, automations, scheduled jobs and integrations. You've already filled in two of them.

**ON SCREEN:** Trailhead screenshot "The standard view of Setup's homepage", arrow tags on the **Object Manager** tab and the Setup Menu · source tag **Salesforce Trailhead**
Link: https://trailhead.salesforce.com/content/learn/modules/starting_force_com/starting_tour

**YUSUF:**
> An object is just a kind of record, like Accounts, or something custom, say "Site Inspections". Open Object Manager, and write down every custom one and what it's for, and which fields people actually fill in.

**ON SCREEN:** the map fills its box: **Objects & fields: Accounts, Opportunities, Site Inspections, Projects…** (tag **Example**). Then, on the deal-won line, tag **Example**. Then a card titled **Automations: where to look** (type each in Quick Find):
- **Flows**
- **Workflow Rules** · *no Salesforce support since 31 Dec 2025*
- **Process Builder** · *no Salesforce support since 31 Dec 2025*

Link: https://help.salesforce.com/s/articleView?id=001096524&language=en_US&type=1

**YUSUF:**
> Automations are the things that happen on their own, say a won deal creates a project. Look in Flows, Workflow Rules and Process Builder. Salesforce stopped supporting the last two at the end of 2025. Yours may still run, but Salesforce wants them moved, so mark those.

**ON SCREEN:** text card from the same Trailhead page, **View Setup Audit Trail** highlighted: **Setup Audit Trail: 6 months of changes** · tag **Salesforce Trailhead**. Then the map fills: **Automations: 14 flows, 6 workflow rules** (tag **example**)
Link: https://trailhead.salesforce.com/content/learn/modules/starting_force_com/starting_tour

**YUSUF:**
> If you can't tell why something's set up the way it is, Setup Audit Trail shows you who changed what over the last six months.
>
> Integrations are everything that talks to Salesforce, like your email or your accounting. For each one, write down what it sends and whose login it runs on.

**ON SCREEN:** tag: **Manual jobs count too**. Then, on the customer story, tag: **Example from Yusuf's old company**

**YUSUF:**
> Then add the jobs someone does by hand every week, like copying records between two systems. Those are the ones people forget.
>
> With that customer after the merger, I asked to meet the two new people, and we started a list of hot leads. I told them, you just need to pick who's going to do it. What I learned is, ask the people who are left what they need to get done. Don't get stuck in how the last admin used to do it.

**ON SCREEN:** the map, five boxes filled. Then: **DO THIS NEXT: one page, five boxes**

**YUSUF:**
> Anyone who touches your Salesforce from now on gets this page first.

**ON SCREEN:** Trailhead screenshot of a user record with the **Freeze** button, red box on it · source tag **Salesforce Trailhead**. Tag: **Now: freeze, wait a week, deactivate**
Link: https://trailhead.salesforce.com/content/learn/modules/lex_implementation_user_setup_mgmt/lex_implementation_user_setup_mgmt_adding_users-hoc

**YUSUF:**
> Now you know whose login everything runs on, so you can freeze the old one. That stops anyone using it. If nothing breaks for a week, deactivate it. Salesforce won't let you delete a user, so their records stay put.

## 5:40 Step 4: Split the changes

**ON SCREEN:** step tracker: **Step 4 of 5: Split the changes**

**YUSUF:**
> Step four, split every change into two piles, what your team can safely do, and what needs an expert.

**ON SCREEN:** two columns on the whiteboard, filled in as he says each one:
**Your team (safe)** · adding and removing users · resetting passwords · assigning permission sets from an approved list
**Get help** · new objects or relationships · automations · integrations · who-sees-what (sharing)

**ON SCREEN:** card titled **Delegated administrator (Salesforce help)**:
- **Can create, edit and log in as users in their group** ✓
- **Can reset passwords, if the admin enables it** ✓
- **Cannot modify the role hierarchy** ✗
- **Cannot create or edit custom object relationships** ✗

Link: https://help.salesforce.com/s/articleView?id=000385384&language=en_US&type=1

**YUSUF:**
> Salesforce actually has a built-in role for the safe pile, called delegated administrator. One person you trust can create and edit users in their group, reset most passwords, and hand out permission sets from a list you've approved. So you don't need a consultant to add a new hire.

**ON SCREEN:** card titled **Test first: sandboxes (Salesforce pricing page)**, small tag **Prices as of Nov 2026**:
- **Add-on: Developer Pro sandbox, 5% of net spend** · Professional, Enterprise
- **Add-on: Partial Copy 20%, Full Copy 30%** · Enterprise, Unlimited only

Link: https://www.salesforce.com/platform/pricing-add-ons/

**YUSUF:**
> Everything in the other pile goes into a sandbox first, never straight into your live system. A sandbox is just a safe copy of your Salesforce. Some of them cost extra, so check which ones you already pay for.

**ON SCREEN:** tag **Setup > Delegated Administration** · source tag **Salesforce help**. Then: **DO THIS THIS WEEK: name one delegated admin, sort your invoices into two piles**

**YUSUF:**
> Then take your last six months of consultant invoices, and put each line in one of the two piles. Anything in the first pile, I wouldn't pay for again.

**ON SCREEN:** the typed list, steps 1 to 4 ticked.

## 6:35 Step 5: Scope the consultant, and ask the fit question

**ON SCREEN:** step tracker: **Step 5 of 5: Scope it, and the fit question**. Tag: **Pick carefully: some agencies only know marketing**

**YUSUF:**
> Step five, when you do need outside help, pick carefully. Salesforce and HubSpot partner agencies can be quite rigid, and some are actually just good at marketing and don't know the operational side of sales. So start with your needs and what's not working, and send a short brief before any work starts. It can just be this email.

**ON SCREEN:** whiteboard: **The consultant brief**, written line by line:
1. **The outcome, in one sentence**
2. **Fixed price for this list**
3. **Tested in a sandbox**
4. **Written notes: what changed, where**
5. **Admin access stays with us**
6. **One hour showing our person how**

**ON SCREEN:** card titled **SAY THIS** (email to the consultant, before any work): **"Here's the outcome we want and our one-page map. Please quote a fixed price for this list, and test it in our sandbox. Send written notes on what changed, and spend one hour showing our delegated admin. Admin access stays with us."**

**YUSUF:**
> "Here's the outcome we want and our one-page map. Please quote a fixed price for this list, and test it in our sandbox. Send written notes on what changed, and spend one hour showing our delegated admin. Admin access stays with us."

**ON SCREEN:** tag: **Does a new admin fix this?** Then a process written across the whiteboard: **Lead → quote → order → delivery → invoice** (tag **Example**). Then the question, written large: **"Which of these steps did we bend to fit Salesforce?"**

**YUSUF:**
> I'd also ask why one person leaving hurt this much. My guess is your Salesforce got changed and changed over the years, until only one person could follow it.
>
> So draw your process this week, from first contact to final invoice, and circle every step where the team works around Salesforce. If it's one or two circles, I'd fix those with your new admin and move on. If it's most of the page, I don't think any admin fixes that.

**ON SCREEN:** two tags, one per line: **1 or 2 circles: fix with your new admin** · **Most of the page: no admin fixes that**. Then the map with a sixth box added: **Workarounds**. Then: **DO THIS BEFORE THE NEXT INVOICE: send the brief, mark your workarounds**

## 7:45 Is a new admin enough?

**ON SCREEN:** the typed list, all five ticked. Then a chain of three boxes: **Admin who left** → **New admin** → **The next one who leaves**. Then three tags, one per point: **Two people who know it** · **Audit = expensive** · **Know your own process first**

**YUSUF:**
> Before the next one leaves, there has to be redundancy, so more than one person on your team knows how your CRM works. And keep a good relationship with whoever set it up. If you lose both, a good consultant can audit your setup, but that can get very expensive.
>
> To be honest, the system is secondary. The number one thing is, do you know your own sales process, your marketing, and how you onboard a new customer? If you do, the system can always be adapted around it.

**ON SCREEN:** tag: **Example from Yusuf's old company**. On "most of your page": the page with most steps circled.

**YUSUF:**
> We lost that customer after the merger because they needed their billing system connected, and product data on every customer. Our CRM couldn't hold that, so they moved to another rented CRM that could. And that's fine, when someone already sells what you need. But if most of your page is circled, I don't think another rented CRM gets you out of it.

**ON SCREEN:** card titled **Hacker News, 2016**, lines appearing one at a time: **"a huge liability"** · **2 engineers, 2 months** · **"a 3-4x increase in our sales teams production"** · **"at least 10x faster"**, small tag: **one person's comments, not checked**
Link: https://news.ycombinator.com/item?id=11192515

**YUSUF:**
> In our research, we found someone writing on Hacker News in 2016. Their company's Salesforce worked OK for two or three years, and then it became a huge liability. So two engineers spent two months writing their own CRM to match their process. They say their sales team's production went up three to four times, basically right away. And they could build the same feature at least ten times faster than in Salesforce. I can't check those numbers, it's one person's comments. But even at half that, I'd take it.

**ON SCREEN:** card titled **One retailer, May 2026** · **"Complete game changer"**, source tag **X**
Link: https://x.com/MikePrendamano/status/2051157330742440364

**YUSUF:**
> In May 2026, one retailer wrote that Salesforce and Zoho didn't work for them, so they built their own CRM and inventory system with AI. Orders now go out to the loading docks. They called it a complete game changer.

## 9:30 What we do

**ON SCREEN:** tag **Example**: **100 features, 3 used**. Then tags, one per phrase: **Built around your process** · **We move your data** · **We maintain it** · **You own the code**. Then: **We help: 10–50 people** · smaller: **Not for: standard setups**

**YUSUF:**
> In SaaS, let's say you have to build a hundred features, but every single customer only uses three. With AI, I realized it's actually going to be cheaper to build something that really fits, from scratch. That's why I sold my old company, and that's why I started CRM From Within.
>
> We build your CRM around how you sell and deliver, and we bring your Salesforce data across. We look after it, so nobody on your team has to be that one person. You own every line of the code, and you're not tied to a long contract. It's for teams of ten to fifty people where a standard CRM just doesn't fit.

## 10:15 Close

**ON SCREEN:** checklist: **☐ First: two admins ☐ This week: move jobs and settings ☐ Next: the one-page map, then freeze and deactivate ☐ This week: one delegated admin, two piles ☐ Before the next invoice: the brief + your workarounds**. Then lower-third tag: **Free 20-min CRM fit check · link in description**. Then lower-third tag: **Comment: who built your Salesforce + 1 change you're waiting on**

**YUSUF:**
> So start with the two admin logins, this week if you can. That's it. If most of your page is circled, bring it to the free twenty-minute fit check below.
>
> And tell me in the comments who built your Salesforce, and which change you've been waiting longest for. I read every comment.
>
> In the next video, I'll show you how to leave HubSpot without losing your data. So subscribe so you don't miss that.

**ON SCREEN:** end screen: next video (video 19, "How to Leave HubSpot Without Losing Your Data: 5 Steps") + video 7 + "Free CRM fit check" button.

**Description:**
> What to do when your Salesforce admin leaves. Take back the keys, move what runs in their name before you switch off their login, write down what you have, split the changes, and scope consultant work so you're never stuck again.
>
> Free 20-minute CRM fit check (show us how your team works, we show you what's possible) [link with utm_campaign=v13]
>
> CRM From Within builds CRMs around how your company works. We maintain it, you own the code, no long contract.
>
> Salesforce help pages used in the video
> - Change a System Administrator, https://help.salesforce.com/s/articleView?id=000385477&language=en_US&type=1
> - No admin left, https://help.salesforce.com/s/articleView?id=000385418&language=en_US&type=1
> - Freeze and deactivate users, https://trailhead.salesforce.com/content/learn/modules/lex_implementation_user_setup_mgmt/lex_implementation_user_setup_mgmt_adding_users-hoc
> - Scheduled export fails, https://help.salesforce.com/HTViewSolution?id=000004347
> - Deactivation blockers, https://help.salesforce.com/s/articleView?id=000384761&language=en_US&type=1
> - Setup and Audit Trail, https://trailhead.salesforce.com/content/learn/modules/starting_force_com/starting_tour
> - Workflow Rules end of support, https://help.salesforce.com/s/articleView?id=001096524&language=en_US&type=1
> - Delegated administrators, https://help.salesforce.com/s/articleView?id=000385384&language=en_US&type=1
> - Sandboxes by edition, https://www.salesforce.com/platform/pricing-add-ons/
>
> Stories used in the video
> - Own CRM in two months, sales production up 3-4x (Hacker News, 2016), https://news.ycombinator.com/item?id=11192515
> - Same features at least 10x faster (Hacker News, 2016), https://news.ycombinator.com/item?id=11192284
> - Retailer that built its own CRM and inventory system with AI (X, May 2026), https://x.com/MikePrendamano/status/2051157330742440364
>
> 0:00 After the merger · 1:05 The 5 steps · 1:20 Take back the keys · 2:15 Before you deactivate · 3:35 Write down what you have · 5:40 Split the changes · 6:35 Scope it, and the fit question · 7:45 Is a new admin enough? · 9:30 What we do · 10:15 Your list

---

## Ten shorts

Each short opens on its own claim, count or screen (the first spoken line below), with the proof as an on-screen tag only, **Hundreds of CRM setups · Built & sold a CRM SaaS**. No spoken proof and no spoken call to action: the full video is linked as the related video, and the end card shows its title.

| # | First line (spoken or on screen) |
|---|---|
| 1 | "After a merger, the one person who knew their CRM left." |
| 2 | "Salesforce says keep more than one System Administrator. How many do you have?" |
| 3 | "No admin left? Salesforce wants a letter signed in ink." |
| 4 | "Switch off the old admin's login and this export fails." |
| 5 | "Five Salesforce settings have a person's name written into them." |
| 6 | "Workflow Rules and Process Builder: no support since 31 Dec 2025." |
| 7 | "One page, five boxes: your whole Salesforce." |
| 8 | "One Salesforce role handles users and passwords without a consultant." |
| 9 | "Six lines to send before any Salesforce consultant starts." |
| 10 | "Before your admin leaves, you need two people who know it." |

| # | From | Length | Caption on screen |
|---|---|---|---|
| 1 | 0:00–0:35 | 35s | "Two days after the handover, he couldn't find his login" |
| 2 | 1:20–2:00 | 40s | "Who holds the keys to your Salesforce?" |
| 3 | 2:00–2:15 | 15s | "Your only Salesforce admin left. Here's how you get back in." |
| 4 | 2:15–2:45 | 30s | "Don't deactivate your old admin until you've checked this" |
| 5 | 2:45–3:15 | 30s | "Move these settings before you switch off an old Salesforce login" |
| 6 | 4:10–4:30 | 20s | "Salesforce stopped supporting these automations. Check yours." |
| 7 | 3:35–3:55 | 20s | "One page, so no consultant bills you to rediscover your Salesforce" |
| 8 | 5:40–6:05 | 25s | "The Salesforce role that stops you paying for small changes" |
| 9 | 6:35–7:10 | 35s | "Send this brief before any Salesforce consultant starts" |
| 10 | 7:45–8:15 | 30s | "The system is secondary. Know your own process." |

---

## Sources

- Salesforce help: new System Administrator first, then "deactivate or freeze" the old admin: https://help.salesforce.com/s/articleView?id=000385477&language=en_US&type=1 (checked 27 Oct 2026)
- Salesforce help: no admin left, letter signed by "a C-Level executive officer (for example, your CEO, CIO, CFO, or Business Owner)". The article's text says "handwritten or digital signature" and its checklist says "signature in ink", so the script says only that the checklist says in ink. Keep more than one System Administrator: https://help.salesforce.com/s/articleView?id=000385418&language=en_US&type=1 (checked 5 Nov 2026)
- Salesforce Trailhead: "Click Freeze to prevent the user from logging in to the account."; "You can deactivate users, but you can't delete them.": https://trailhead.salesforce.com/content/learn/modules/lex_implementation_user_setup_mgmt/lex_implementation_user_setup_mgmt_adding_users-hoc (checked 27 Oct 2026)
- Salesforce help: deactivated running user, "the Data Export will fail"; "delete the existing scheduled Data Export job and create a new one": https://help.salesforce.com/HTViewSolution?id=000004347 (checked 27 Oct 2026)
- Salesforce help: deactivation blockers include "Web-to-Lead Default Creator", "Assignment Rules", "Auto-Response Rules", approval approvers, "Default Workflow User"; a user named there cannot be deactivated until the setting is changed: https://help.salesforce.com/s/articleView?id=000384761&language=en_US&type=1 (checked 5 Nov 2026)
- Salesforce Trailhead: "Object Manager is where you can view and customize standard and custom objects"; Quick Find; Setup Audit Trail "See 6 months of change history": https://trailhead.salesforce.com/content/learn/modules/starting_force_com/starting_tour (checked 27 Oct 2026)
- Salesforce help: "Salesforce no longer supports Workflow Rules and Process Builder as of December 31, 2025"; recommends migrating to Flow Builder: https://help.salesforce.com/s/articleView?id=001096524&language=en_US&type=1 (checked 27 Oct 2026)
- Salesforce help: delegated admins "can create, edit, and log in as Users" in their group; resets need "Reset User Passwords and Unlock Users"; "They cannot modify the role hierarchy"; no custom object relationships: https://help.salesforce.com/s/articleView?id=000385384&language=en_US&type=1 (checked 27 Oct 2026)
- Salesforce pricing (add-ons): Developer Pro Sandbox "5% of net spend" (Pro Suite, Professional, Enterprise, Unlimited); Partial Copy "20% of net spend" and Full Copy "30% of net spend" (Enterprise, Unlimited): https://www.salesforce.com/platform/pricing-add-ons/ (checked 27 Oct 2026)
- The merger story (0:00, 4:55, 8:15) and "nine out of ninety-four cancellations" (checked against his records 5 Nov 2026: 9 of 94 cancellation notes name a key person changing, and the notes give no timing): a telecom customer of Yusuf's old CRM SaaS company, from his records in `videos/YUSUF_ANSWERS_2026-11-04.md` (video 8 Q1, Q2, Q3 and video 10 Q2 in that file's old numbering) and `original_sources/2026-11-05_story_check.md`, no name, CRM product or date said. "You just need to pick who's going to do it" is his own line to them, translated from Swedish. Yusuf said to keep the story if it helps.
- 7:45 redundancy, the expensive audit, "the system and the process in the CRM are secondary": Yusuf's 4 Nov 2026 interview, `original_sources/2026-11-04_interview_experience_videos.md`.
- 6:35 "consultancy agencies that are Salesforce or HubSpot partners, but they can be quite rigid"; "some HubSpot agencies are actually just good at marketing, and they don't know the operational side of sales": the same interview.
- 9:30 "let's say you have to build 100 features, but every single customer only uses 3 features"; "with AI, I realized that it's going to actually be cheaper to build something that really fits"; why he sold and started CRM From Within: the same interview.
- Hacker News, 28 Feb 2016, user malyk, the same company in both comments. "We chose Salesforce when we were tiny too, and it worked ok for 2-3 years and then it became a huge liability"; "by writing our own CRM to match our process ... we basically immediately got a 3-4x increase in our sales teams production"; "It took 2 engineers 2 months to build that": https://news.ycombinator.com/item?id=11192515. "I can develop the same features in our own rails app at least 10x faster than I can in Salesforce": https://news.ycombinator.com/item?id=11192284. Both read in full through Hacker News's public API, 5 Nov 2026. One person's comments, not independently checked, and the script says so aloud.
- A retailer on X, 3 May 2026: "Couldn't get Salesforce or Zoho to work properly for our business, so several months ago we built and deployed our own CRM and Inventory Management System with incoming & outgoing orders sent to the loading docks. Complete game changer all made possible because of AI.": https://x.com/MikePrendamano/status/2051157330742440364 (study record in `survey/all_relevant.csv`).
- Proof line: "me and my team, hundreds of companies" (Yusuf, 4 Nov 2026).
