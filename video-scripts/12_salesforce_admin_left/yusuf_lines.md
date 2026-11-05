# DROPPED: What to Do When Your Salesforce Admin Leaves

*Video 12 · Yusuf's lines only*

## Proof

At my old company, we had a telecom customer that got bought and merged, and the owner, who'd built their whole CRM setup, left. Two new people took it over, and two days after we all met, one of them couldn't find his login.

The main thing they used that CRM for was webinars. They told us, when we want a webinar, someone from your side has to help us. We lost that customer in the end, and the login had nothing to do with it.

I built a CRM SaaS company, and I sold it in 2025. Me and my team set up CRMs for hundreds of companies. And nine out of ninety-four cancellations in our notes came down to a key person changing.

## Who it's for

If your Salesforce lived in one person's head, and that person's leaving or they've already gone, this video is for you.

## Promise

By the end you'll have admin access back, and your whole Salesforce on one page. And you can stop paying a consultant for every small change.

## Plan

The order matters, so the steps are numbered on screen. The last one's a question about your company. It tells you if a new admin really fixes this, or if you'll be right back here when they leave.

## Step 1: Take back the keys

Step one, take back the keys. You want two admin logins that the company controls. Anyone with the System Administrator profile can change everything in your Salesforce. So go to your users page, the path's on screen, and see who's got it.

Salesforce's own help says to keep more than one. When an admin leaves, you set up the new one first, log in as them, and only then switch off the old account.

If the admin's still around, ask them for it. "Before you go, please create a System Administrator login for me. And stay logged in while I test it."

If nobody's left and you still control the old admin's work email, you can reset the password through it. If you don't, Salesforce Support can do it, but they want a signed letter from your CEO, CFO or owner. Their checklist actually says in ink.

## Step 2: Check before you deactivate

Step two, before you switch off the old login, check what runs under it. A lot of things in Salesforce run as a specific user, and when that user goes, some of them stop working.

Say the admin who left set up your weekly data export. Deactivate them and it fails, and Salesforce's fix is to delete the job and set it up again under someone who's staying.

Some settings even have the person's name written into them, and Salesforce won't let you deactivate that person until you've changed them. Every lead from your website form gets created in someone's name, for example, and your rules and approvals can work the same way. The full list is on screen.

Move each one to someone who's staying. Then open your scheduled jobs page, the path's on screen, and move any job with the old admin's name on it.

If the admin hasn't left yet, this gets a lot easier. "Can you list every job, rule and integration that runs under your login? We'll move each one before we switch it off."

## Free CRM fit check

If you want someone to look at this with you, we do a free twenty-minute CRM fit check. The link's below.

## Step 3: Write down what you have

Step three, write down what you have. I'd bet most of what your admin knew isn't written down anywhere, so every consultant you bring in bills you to rediscover it. Take one page and draw five boxes. That's who has access, objects and fields, automations, scheduled jobs and integrations. You've already filled in two of them.

An object is just a kind of record, like Accounts, or something custom, say "Site Inspections". Open Object Manager, and write down every custom one and what it's for, and which fields people actually fill in.

Automations are the things that happen on their own, say a won deal creates a project. Look in Flows, Workflow Rules and Process Builder. Salesforce stopped supporting the last two at the end of 2025. Yours may still run, but Salesforce wants them moved, so mark those.

If you can't tell why something's set up the way it is, Setup Audit Trail shows you who changed what over the last six months.

Integrations are everything that talks to Salesforce, like your email or your accounting. For each one, write down what it sends and whose login it runs on.

Then add the jobs someone does by hand every week, like copying records between two systems. Those are the ones people forget.

With that customer after the merger, I asked to meet the two new people, and we started a list of hot leads. I told them, you just need to pick who's going to do it. What I learned is, ask the people who are left what they need to get done. Don't get stuck in how the last admin used to do it.

Anyone who touches your Salesforce from now on gets this page first.

Now you know whose login everything runs on, so you can freeze the old one. That stops anyone using it. If nothing breaks for a week, deactivate it. Salesforce won't let you delete a user, so their records stay put.

## Step 4: Split the changes

Step four, split every change into two piles, what your team can safely do, and what needs an expert.

Salesforce actually has a built-in role for the safe pile, called delegated administrator. One person you trust can create and edit users in their group, reset most passwords, and hand out permission sets from a list you've approved. So you don't need a consultant to add a new hire.

Everything in the other pile goes into a sandbox first, never straight into your live system. A sandbox is just a safe copy of your Salesforce. Some of them cost extra, so check which ones you already pay for.

Then take your last six months of consultant invoices, and put each line in one of the two piles. Anything in the first pile, I wouldn't pay for again.

## Step 5: Scope the consultant, and ask the fit question

Step five, when you do need outside help, pick carefully. Salesforce and HubSpot partner agencies can be quite rigid, and some are actually just good at marketing and don't know the operational side of sales. So start with your needs and what's not working, and send a short brief before any work starts. It can just be this email.

"Here's the outcome we want and our one-page map. Please quote a fixed price for this list, and test it in our sandbox. Send written notes on what changed, and spend one hour showing our delegated admin. Admin access stays with us."

I'd also ask why one person leaving hurt this much. My guess is your Salesforce got changed and changed over the years, until only one person could follow it.

So draw your process this week, from first contact to final invoice, and circle every step where the team works around Salesforce. If it's one or two circles, I'd fix those with your new admin and move on. If it's most of the page, I don't think any admin fixes that.

## Is a new admin enough?

Before the next one leaves, there has to be redundancy, so more than one person on your team knows how your CRM works. And keep a good relationship with whoever set it up. If you lose both, a good consultant can audit your setup, but that can get very expensive.

To be honest, the system is secondary. The number one thing is, do you know your own sales process, your marketing, and how you onboard a new customer? If you do, the system can always be adapted around it.

We lost that customer after the merger because they needed their billing system connected, and product data on every customer. Our CRM couldn't hold that, so they moved to another rented CRM that could. And that's fine, when someone already sells what you need. But if most of your page is circled, I don't think another rented CRM gets you out of it.

In our research, we found someone writing on Hacker News in 2016. Their company's Salesforce worked OK for two or three years, and then it became a huge liability. So two engineers spent two months writing their own CRM to match their process. They say their sales team's production went up three to four times, basically right away. And they could build the same feature at least ten times faster than in Salesforce. I can't check those numbers, it's one person's comments. But even at half that, I'd take it.

In May 2026, one retailer wrote that Salesforce and Zoho didn't work for them, so they built their own CRM and inventory system with AI. Orders now go out to the loading docks. They called it a complete game changer.

## What we do

In SaaS, let's say you have to build a hundred features, but every single customer only uses three. With AI, I realized it's actually going to be cheaper to build something that really fits, from scratch. That's why I sold my old company, and that's why I started CRM From Within.

We build your CRM around how you sell and deliver, and we bring your Salesforce data across. We look after it, so nobody on your team has to be that one person. You own every line of the code, and you're not tied to a long contract. It's for teams of ten to fifty people where a standard CRM just doesn't fit.

## Close

So start with the two admin logins, this week if you can. That's it. If most of your page is circled, bring it to the free twenty-minute fit check below.

And tell me in the comments who built your Salesforce, and which change you've been waiting longest for. I read every comment.

In the next video, I'll show you how to leave HubSpot without losing your data. So subscribe so you don't miss that.
