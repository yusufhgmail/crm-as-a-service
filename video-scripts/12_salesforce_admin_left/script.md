# Video 12: What to Do When Your Salesforce Admin Leaves (MAYBE: Yusuf, keep or drop?)

*Approved by David, 4 Nov 2026*

**Checked 27 Oct 2026:** Salesforce's help articles, Trailhead units and add-on pricing page, word for word. No study numbers and no Reddit or review quotes in this video: it is told from Yusuf's own experience.

**Yusuf's answers used** (`videos/YUSUF_ANSWERS_2026-11-04.md`, video 12, no names): Q1 and Q2 (a customer of his old company after a merger: the login, the webinars; one in ten cancellations came down to a key person changing) → 0:00 Proof, from his records, checked 5 Nov 2026, and Yusuf said to keep it if it helps · Q3 lesson ("don't get stuck in how they used to do it") → Step 3, from his records, checked the same day · Q4 (redundancy, the audit is expensive, know your own process) → 8:50, from his 4 Nov interview, confirmed. That customer's CRM was not Salesforce, so the script never says it was.

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

**ON SCREEN:** Yusuf on camera, tag: **Example from Yusuf's old company** (no name, no logo). Then, after the story, one tag: **Hundreds of CRM setups**. On the promise line: **Admin left? 5 steps, in order**

**YUSUF** (straight to camera):
> Here's an example from my old company. One customer went through a merger, and the person who built their whole CRM setup left. So two new people took it over. And two days later, one of them couldn't even find his login.
>
> And the thing they used that CRM for most was webinars. After that, they couldn't run a single one without our help.
>
> Over the years, I built a CRM SaaS company, and I sold it a few years ago. Me and my team set up CRMs for hundreds of companies. And about one in ten of our cancellations came down to a key person changing.
>
> So in this video I'll show you what to do when your Salesforce admin leaves. It's five steps, and you do them in order.

## 0:40 Who it's for

**ON SCREEN:** one tag: **One person knew it. Now they're gone.**

**YUSUF:**
> If your Salesforce lived in one person's head, and that person's leaving or they've already gone, this video is for you. You'll get the keys back, and you'll stop paying for every small change.

## 0:50 Promise

**ON SCREEN:** four tags appear beside Yusuf, one per phrase: ✓ **You hold the keys** · ✓ **Nothing breaks quietly** · ✓ **You know what you have** · ✓ **You stop paying per change**

**YUSUF:**
> By the end you'll have admin access back, and you'll have moved what matters before the old login goes. Your whole Salesforce will be on one page. And you'll know how to brief a consultant, so you're never stuck like this again. You don't need to be technical for any of this.

## 1:05 Plan

**ON SCREEN:** Yusuf writes the list on the whiteboard; a typed version sits beside it:
1. Take back the keys
2. Check before you deactivate
3. Write down what you have
4. Split the changes
5. Scope the consultant, and ask the fit question

Tag on item 5 when he says "isn't a setting": **Not a setting**

**YUSUF:**
> So those are the five steps. And step five isn't a setting. It's a question about how your company works, and it tells you if a new admin really solves this, or just resets the clock until the next one leaves.

---

## 1:35 Step 1: Take back the keys

**ON SCREEN:** step tracker: **Step 1 of 5: Take back the keys**. Tag when he says it: **System Administrator = can change everything**

**YUSUF:**
> Step one, take back the keys. In Salesforce, anyone with the System Administrator profile can change everything. That's your users, your fields, your automations, and who sees what. So first, find out who has that profile right now.

**ON SCREEN:** text card of the help article with the step **Setup → Users → Users**, the **Profile** field and **System Administrator** highlighted · source tag **Salesforce help**. Then a card titled **Salesforce's own advice**, two lines appearing one at a time:
- **Keep more than one System Administrator**
- **Create the new admin first, then freeze or deactivate the old one**

Link: https://help.salesforce.com/s/articleView?id=000385477&language=en_US&type=1

**YUSUF:**
> Just go to your users page, the path's on screen, and look at who's an admin.
>
> Salesforce's own help actually says to keep more than one admin. And when an admin leaves, you set up the new one first, and you log in as them. You don't switch off the old account until that's done.

**ON SCREEN:** card titled **No admin left? (Salesforce help)**, lines appearing one at a time:
- **Another admin changes the old admin's email** ✓
- **You can open the old admin's mailbox: reset the password** ✓
- **Neither: Support needs a letter signed in ink by a C-level executive** ✗

Link: https://help.salesforce.com/s/articleView?id=000385418&language=en_US&type=1

**YUSUF:**
> But what if there's no admin left? If you still control the old admin's work email, you can just reset the password through it. If you don't, Salesforce Support can do it. But they want a letter signed in ink by your CEO, CFO or owner.
>
> So start here. Get two admin logins, and make sure the company controls them, not one person.

**ON SCREEN:** card titled **SAY THIS** (to the admin who's leaving, or whoever still has admin access): **"Before you go, please create a System Administrator login for me, and stay logged in while I test it."**

**YUSUF:**
> If the admin's still around, just say this. "Before you go, please create a System Administrator login for me, and stay logged in while I test it."

**ON SCREEN:** the map fills its first box: **Who has access: 2 admins**. Then: **DO THIS FIRST: two admins you control**

## 2:45 Step 2: Check before you deactivate

**ON SCREEN:** step tracker: **Step 2 of 5: Before you deactivate**. Tag: **Things run as a person**

**YUSUF:**
> Step two, before you switch off the old login, check what runs under it. A lot of things in Salesforce run as a specific user. And when that user goes, some of them just quietly stop.

**ON SCREEN:** card titled **Salesforce help: a scheduled export run by a deactivated user**:
- **The Data Export will fail** ✗
- **Fix: delete the job and create a new one, as an active user** ✓

Link: https://help.salesforce.com/HTViewSolution?id=000004347

**YUSUF:**
> Here's a simple example. Say the admin who left set up your weekly data export. You deactivate them, and that export fails. And Salesforce's fix is to delete the job and set it up again as someone who's staying.

**ON SCREEN:** card titled **Salesforce help: settings that can block deactivation**, lines appearing one at a time:
- **Web-to-Lead default creator** (your website form)
- **Lead and case assignment rules**
- **Auto-response rules**
- **Approval processes: approver or delegated approver**
- **Default workflow user**

Link: https://help.salesforce.com/s/articleView?id=000384761&language=en_US&type=1

**YUSUF:**
> Some settings even have the person's name written into them. Take your website form. Every lead that comes in from it gets created in someone's name. And your rules and approvals can work the same way. The full list is on screen, so just move each one to someone who's staying.

**ON SCREEN:** text card from the help article, **Click Scheduled Jobs** highlighted, tag **Setup > Quick Find > Scheduled Jobs** · source tag **Salesforce help**. Then the map fills its box: **Scheduled jobs: who they run as**. Then: **DO THIS THIS WEEK: move every job and setting to someone who's staying**
Link: https://help.salesforce.com/HTViewSolution?id=000004347

**YUSUF:**
> Then open your scheduled jobs page, the path's on screen. And if a job has the old admin's name on it, move it.

**ON SCREEN:** card titled **SAY THIS** (to the admin, before their last day): **"Can you list every job, rule and integration that runs under your login? We'll move each one before we switch it off."**

**YUSUF:**
> And if the admin hasn't left yet, ask them this. "Can you list every job, rule and integration that runs under your login? We'll move each one before we switch it off."

**ON SCREEN:** the typed list, steps 1 and 2 ticked.

## 3:55 Free CRM fit check

**ON SCREEN:** lower-third tag: **Free 20-min CRM fit check · link in description**

**YUSUF:**
> If you'd rather your CRM didn't live in one person's head, there's a free twenty-minute fit check below.

## 4:10 Step 3: Write down what you have

**ON SCREEN:** step tracker: **Step 3 of 5: Write down what you have**. The map, three boxes still empty: **Objects & fields** · **Automations** · **Integrations**

**YUSUF:**
> Step three, write down what you have. Whatever your admin knew usually wasn't written down anywhere. So every consultant you bring in is going to bill you to rediscover it.

**ON SCREEN:** Trailhead screenshot "The standard view of Setup's homepage", arrow tags on the **Object Manager** tab and the Setup Menu · source tag **Salesforce Trailhead**
Link: https://trailhead.salesforce.com/content/learn/modules/starting_force_com/starting_tour

**YUSUF:**
> So start in Object Manager. An object is just a kind of record, like Accounts, or something custom like "Site Inspections". Write down every custom one and what it's for. Then note which fields people actually fill in.

**ON SCREEN:** the map fills its box: **Objects & fields: Accounts, Opportunities, Site Inspections, Projects…** (tag **example**). Then a card titled **Automations: where to look** (type each in Quick Find):
- **Flows**
- **Workflow Rules** · *no Salesforce support since 31 Dec 2025*
- **Process Builder** · *no Salesforce support since 31 Dec 2025*

Link: https://help.salesforce.com/s/articleView?id=001096524&language=en_US&type=1

**YUSUF:**
> Next, look at your automations. Those are the things that happen on their own. Say a deal is won. A project gets created, and the site team gets an email. There are three places to look, and they're on screen. Salesforce stopped supporting two of them at the end of 2025. Yours may still run, but Salesforce wants them moved.

**ON SCREEN:** text card from the same Trailhead page, **View Setup Audit Trail** highlighted: **Setup Audit Trail: 6 months of changes** · tag **Salesforce Trailhead**. Then the map fills: **Automations: 14 flows, 6 workflow rules** (tag **example**)
Link: https://trailhead.salesforce.com/content/learn/modules/starting_force_com/starting_tour

**YUSUF:**
> There's also a page that shows the last six months of changes, so you can see who did what, and when.
>
> Then write down your integrations. That's everything that talks to Salesforce, like your email or your accounting. For each one, write down what it sends and whose login it runs on.

**ON SCREEN:** tag: **Manual jobs count too**

**YUSUF:**
> And don't forget the jobs someone does by hand every week, like copying records between two systems. Nobody remembers those until they stop, so write them down too.
>
> And here's one thing I learned with that customer after the merger. When you sit down with the people who are left, ask what they need to get done. Don't get stuck in how the last admin used to do it.

**ON SCREEN:** the map, five boxes filled. Then: **DO THIS NEXT: one page, five boxes**

**YUSUF:**
> So that's your map, one page with five boxes. And from now on, anyone who touches your Salesforce gets this page first.

**ON SCREEN:** Trailhead screenshot of a user record with the **Freeze** button, red box on it · source tag **Salesforce Trailhead**. Tag: **New admin logged in ✓ · jobs moved ✓ · map done ✓**
Link: https://trailhead.salesforce.com/content/learn/modules/lex_implementation_user_setup_mgmt/lex_implementation_user_setup_mgmt_adding_users-hoc

**YUSUF:**
> Now your new admin's working, the jobs are moved and the map's written. That's when you freeze the old login, and not before. Freezing just stops anyone using it. Give it a week, and if nothing breaks, deactivate it. Salesforce won't let you delete a user, so their records stay put.

## 6:20 Step 4: Split the changes

**ON SCREEN:** step tracker: **Step 4 of 5: Split the changes**

**YUSUF:**
> Step four, split every change into two piles. One pile is what your team can safely do, and the other is what needs an expert.

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
> Salesforce actually has a built-in role for the safe pile, and it's called delegated administrator. One person you trust can create and edit users in their group, and reset most passwords. They can also hand out permission sets from a list you've approved. But they can't touch the role hierarchy or the relationships between objects.

**ON SCREEN:** card titled **Test first: sandboxes (Salesforce pricing page)**, small tag **Prices as of Nov 2026**:
- **Add-on: Developer Pro sandbox, 5% of net spend** · Professional, Enterprise
- **Add-on: Partial Copy 20%, Full Copy 30%** · Enterprise, Unlimited only

Link: https://www.salesforce.com/platform/pricing-add-ons/

**YUSUF:**
> The other pile has one rule. Nothing gets built in your live system. It goes into a sandbox first, and a sandbox is just a safe copy of your Salesforce. When I recorded this, in November 2026, a Developer Pro sandbox was an add-on. It cost five percent of net spend. Prices change, so take that as an example, and check which sandboxes you're already paying for.

**ON SCREEN:** text card of the help article, **They cannot modify the role hierarchy** highlighted, tag **Setup > Delegated Administration** · source tag **Salesforce help**. Then: **DO THIS THIS WEEK: pick one delegated admin, write your two piles**
Link: https://help.salesforce.com/s/articleView?id=000385384&language=en_US&type=1

**YUSUF:**
> So pick your delegated admin. Then take your last six months of consultant invoices, and put each line in one of the two piles.

**ON SCREEN:** card titled **SAY THIS** (to your new delegated admin): **"You own users, passwords and permission sets. Anything that changes objects, automations or integrations comes to me first, and goes to a sandbox."**

**YUSUF:**
> And tell your delegated admin where the line is. Just say, "You own users, passwords and permission sets. Anything that changes objects, automations or integrations comes to me first, and goes to a sandbox."

**ON SCREEN:** the typed list, steps 1 to 4 ticked.

## 7:50 Step 5: Scope the consultant, and ask the fit question

**ON SCREEN:** step tracker: **Step 5 of 5: Scope it, and the fit question**. Tag: **Not a setting**

**YUSUF:**
> Step five, when you need outside help, scope it so you don't end up dependent all over again. You don't want to pay someone by the hour to learn your system.

**ON SCREEN:** whiteboard: **The consultant brief**, written line by line:
1. **The outcome, in one sentence**
2. **Fixed price for this list**
3. **Tested in a sandbox**
4. **Written notes: what changed, where**
5. **Admin access stays with us**
6. **One hour showing our person how**

**YUSUF:**
> So send a short brief before any work starts. It's six lines, and they're on screen. The big one is a fixed price, so there's no hourly meter running. And admin access stays with you, every time.

**ON SCREEN:** card titled **SAY THIS** (email to the consultant, before any work): **"Here's the outcome we want and our one-page map. Please quote a fixed price for this list, and test it in our sandbox. Send written notes on what changed, and spend one hour showing our delegated admin. Admin access stays with us."**

**YUSUF:**
> You can send it as one email. "Here's the outcome we want and our one-page map. Please quote a fixed price for this list, and test it in our sandbox. Send written notes on what changed, and spend one hour showing our delegated admin. Admin access stays with us."

**ON SCREEN:** a process written across the whiteboard: **Lead → quote → order → delivery → invoice** (tag **example**). Then the question, written large: **"Which of these steps did we bend to fit Salesforce?"**

**YUSUF:**
> Now here's the bigger question. Was the problem really that the admin left? Or did your Salesforce get bent until only one person could follow it?
>
> Here's a check you can do this week. Draw your process, from first contact to final invoice. Then circle every step where the team works around Salesforce.

**ON SCREEN:** the map with a sixth box added: **Workarounds**. Then: **DO THIS BEFORE THE NEXT INVOICE: send the brief, mark your workarounds**

**ON SCREEN:** lower-third tag: **Comment: who built your Salesforce + 1 change you're waiting on**

**YUSUF:**
> So tell me in the comments who built your Salesforce, and which change you've been waiting longest for. I read every comment.

## 8:45 Recap

**ON SCREEN:** the typed list, all five ticked.

**YUSUF:**
> OK, that's the five steps. You take back the keys, and you check what runs in their name. Then you write down what you have. You split the changes. And you scope the consultant.

## 9:00 Is a new admin enough?

**ON SCREEN:** a chain of three boxes: **Admin who left** → **New admin** → **The next one who leaves**. Then three tags, one per point: **Two people who know it** · **Audit = expensive** · **Know your own process first**

**YUSUF:**
> Now let's go back to that customer after the merger. Sure, a new admin fixes this week's problem. But they're just the next person who understands it, until they move on too.
>
> So what should you do before anyone leaves? There has to be redundancy. That means more than one person on your team knows how your CRM works. And keep a good relationship with whoever set it up. If you lose both, a good consultant can audit your setup, but that can get very expensive.
>
> And honestly, the system is secondary. The number one thing is, do you know your own sales process, your marketing, and how you onboard a new customer? If you do, the system can always be adapted around it. And moving to another rented CRM doesn't fix that, if it just gets customised the same way.

## 9:55 What we do

**ON SCREEN:** tags, one per phrase: **Built around your process** · **We move your data** · **You own the code** · **We maintain it**. Then: **We help: 10–50 people** · smaller: **Not for: standard setups**

**YUSUF:**
> That's why I started CRM From Within. We give you a CRM that doesn't belong to whoever set it up. We build it from scratch around how you sell and deliver, and AI is what makes that affordable now. We bring your Salesforce data across, and we keep it running. You own every line of the code, and you're not tied to a long contract. It's for teams of ten to fifty people where a standard CRM just doesn't fit.

## 10:20 Close

**ON SCREEN:** checklist building line by line: **☐ First: two admins ☐ This week: move jobs and settings ☐ Next: the one-page map, then freeze and deactivate ☐ This week: one delegated admin, two piles ☐ Before the next invoice: the brief + your workarounds**. Then lower-third tag: **Free 20-min CRM fit check · link in description**

**YUSUF:**
> So here's your list. Get your two admins first. Then move the jobs and settings, and write the one-page map. Only after that, switch off the old login. Pick a delegated admin and split the piles. And send the brief before the next invoice lands.
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
> 0:00 After the merger · 1:05 The 5 steps · 1:35 Take back the keys · 2:45 Before you deactivate · 4:10 Write down what you have · 6:20 Split the changes · 7:50 Scope it, and the fit question · 9:00 Is a new admin enough? · 9:55 What we do · 10:20 Your list

---

## Ten shorts

Each short opens on its own claim, count or screen (the first spoken line below), with the proof as an on-screen tag only, **Hundreds of CRM setups · Built & sold a CRM SaaS**. No spoken proof and no spoken call to action: the full video is linked as the related video, and the end card shows its title.

| # | First line (spoken or on screen) |
|---|---|
| 1 | "After a merger, the one person who knew their CRM left." |
| 2 | "Salesforce says keep two System Administrators. Most companies have one." |
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
| 1 | 0:00–0:50 | 50s | "Two days after the handover, he couldn't find his login" |
| 2 | 1:35–2:10 | 35s | "Who holds the keys to your Salesforce?" |
| 3 | 2:10–2:45 | 35s | "Your only Salesforce admin left. Here's how you get back in." |
| 4 | 2:45–3:15 | 30s | "Don't deactivate your old admin until you've checked this" |
| 5 | 3:15–3:55 | 40s | "Move these settings before you switch off an old Salesforce login" |
| 6 | 4:45–5:20 | 35s | "Salesforce stopped supporting these automations. Check yours." |
| 7 | 5:35–6:20 | 45s | "One page that saves you a consultant's first week" |
| 8 | 6:20–7:05 | 45s | "The Salesforce role that stops you paying for small changes" |
| 9 | 7:50–8:30 | 40s | "Send this brief before any Salesforce consultant starts" |
| 10 | 9:10–9:55 | 45s | "The system is secondary. Know your own process." |

---

## Sources

- Salesforce help: new System Administrator first, then "deactivate or freeze" the old admin: https://help.salesforce.com/s/articleView?id=000385477&language=en_US&type=1 (checked 27 Oct 2026)
- Salesforce help: no admin left, letter from a C-level executive, "signature in ink"; keep more than one System Administrator: https://help.salesforce.com/s/articleView?id=000385418&language=en_US&type=1 (checked 27 Oct 2026)
- Salesforce Trailhead: "Click Freeze to prevent the user from logging in to the account."; "You can deactivate users, but you can't delete them.": https://trailhead.salesforce.com/content/learn/modules/lex_implementation_user_setup_mgmt/lex_implementation_user_setup_mgmt_adding_users-hoc (checked 27 Oct 2026)
- Salesforce help: deactivated running user, "the Data Export will fail"; "delete the existing scheduled Data Export job and create a new one": https://help.salesforce.com/HTViewSolution?id=000004347 (checked 27 Oct 2026)
- Salesforce help: deactivation blockers include "Web-to-Lead Default Creator", "Assignment Rules", "Auto-Response Rules", approval approvers, "Default Workflow User": https://help.salesforce.com/s/articleView?id=000384761&language=en_US&type=1 (checked 27 Oct 2026)
- Salesforce Trailhead: "Object Manager is where you can view and customize standard and custom objects"; Quick Find; Setup Audit Trail "See 6 months of change history": https://trailhead.salesforce.com/content/learn/modules/starting_force_com/starting_tour (checked 27 Oct 2026)
- Salesforce help: "Salesforce no longer supports Workflow Rules and Process Builder as of December 31, 2025"; recommends migrating to Flow Builder: https://help.salesforce.com/s/articleView?id=001096524&language=en_US&type=1 (checked 27 Oct 2026)
- Salesforce help: delegated admins "can create, edit, and log in as Users" in their group; resets need "Reset User Passwords and Unlock Users"; "They cannot modify the role hierarchy"; no custom object relationships: https://help.salesforce.com/s/articleView?id=000385384&language=en_US&type=1 (checked 27 Oct 2026)
- Salesforce pricing (add-ons): Developer Pro Sandbox "5% of net spend" (Pro Suite, Professional, Enterprise, Unlimited); Partial Copy "20% of net spend" and Full Copy "30% of net spend" (Enterprise, Unlimited): https://www.salesforce.com/platform/pricing-add-ons/ (checked 27 Oct 2026)
- The merger story (0:00, 3:50, 8:50) and "about one in ten of our cancellations" (checked against his records 5 Nov 2026: 9 of 94 cancellation notes name a key person changing, and the notes give no timing): a customer of Yusuf's old CRM SaaS company, from his records in `videos/YUSUF_ANSWERS_2026-11-04.md` (Q1, Q2, Q3), no name, CRM product or date said. Checked against his records 5 Nov 2026, and Yusuf said to keep it if it helps.
- 8:50 redundancy, the expensive audit, "the system and the process in the CRM are secondary": Yusuf's 4 Nov 2026 interview, `original_sources/2026-11-04_interview_experience_videos.md`.
- Proof line: "me and my team, hundreds of companies" (Yusuf, 4 Nov 2026).
