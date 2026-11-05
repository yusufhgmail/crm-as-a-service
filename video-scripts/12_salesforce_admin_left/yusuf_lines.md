# What to Do When Your Salesforce Admin Leaves (MAYBE: Yusuf, keep or drop?)

*Video 12 · Yusuf's lines only*

## Proof

Here's an example from my old company. One customer went through a merger, and the person who built their whole CRM setup left. So two new people took it over. And two days later, one of them couldn't even find his login.

And the thing they used that CRM for most was webinars. After that, they couldn't run a single one without our help.

Over the years, I built a CRM SaaS company, and I sold it in 2025. Me and my team set up CRMs for hundreds of companies. And about one in ten of our cancellations came down to a key person changing.

So in this video I'll show you what to do when your Salesforce admin leaves. It's five steps, and you do them in order.

## Who it's for

If your Salesforce lived in one person's head, and that person's leaving or they've already gone, this video is for you. You'll get the keys back, and you'll stop paying for every small change.

## Promise

By the end you'll have admin access back, and you'll have moved what matters before the old login goes. Your whole Salesforce will be on one page. And you'll know how to brief a consultant, so you're never stuck like this again. You don't need to be technical for any of this.

## Plan

So those are the five steps. And step five isn't a setting. It's a question about how your company works, and it tells you if a new admin really solves this, or just resets the clock until the next one leaves.

## Step 1: Take back the keys

Step one, take back the keys. In Salesforce, anyone with the System Administrator profile can change everything. That's your users, your fields, your automations, and who sees what. So first, find out who has that profile right now.

Just go to your users page, the path's on screen, and look at who's an admin.

Salesforce's own help actually says to keep more than one admin. And when an admin leaves, you set up the new one first, and you log in as them. You don't switch off the old account until that's done.

But what if there's no admin left? If you still control the old admin's work email, you can just reset the password through it. If you don't, Salesforce Support can do it. But they want a letter signed in ink by your CEO, CFO or owner.

So start here. Get two admin logins, and make sure the company controls them, not one person.

If the admin's still around, just say this. "Before you go, please create a System Administrator login for me, and stay logged in while I test it."

## Step 2: Check before you deactivate

Step two, before you switch off the old login, check what runs under it. A lot of things in Salesforce run as a specific user. And when that user goes, some of them just quietly stop.

Here's a simple example. Say the admin who left set up your weekly data export. You deactivate them, and that export fails. And Salesforce's fix is to delete the job and set it up again as someone who's staying.

Some settings even have the person's name written into them. Take your website form. Every lead that comes in from it gets created in someone's name. And your rules and approvals can work the same way. The full list is on screen, so just move each one to someone who's staying.

Then open your scheduled jobs page, the path's on screen. And if a job has the old admin's name on it, move it.

And if the admin hasn't left yet, ask them this. "Can you list every job, rule and integration that runs under your login? We'll move each one before we switch it off."

## Free CRM fit check

If you'd rather your CRM didn't live in one person's head, there's a free twenty-minute fit check below.

## Step 3: Write down what you have

Step three, write down what you have. Whatever your admin knew usually wasn't written down anywhere. So every consultant you bring in is going to bill you to rediscover it.

So start in Object Manager. An object is just a kind of record, like Accounts, or something custom like "Site Inspections". Write down every custom one and what it's for. Then note which fields people actually fill in.

Next, look at your automations. Those are the things that happen on their own. Say a deal is won. A project gets created, and the site team gets an email. There are three places to look, and they're on screen. Salesforce stopped supporting two of them at the end of 2025. Yours may still run, but Salesforce wants them moved.

There's also a page that shows the last six months of changes, so you can see who did what, and when.

Then write down your integrations. That's everything that talks to Salesforce, like your email or your accounting. For each one, write down what it sends and whose login it runs on.

And don't forget the jobs someone does by hand every week, like copying records between two systems. Nobody remembers those until they stop, so write them down too.

And here's one thing I learned with that customer after the merger. When you sit down with the people who are left, ask what they need to get done. Don't get stuck in how the last admin used to do it.

So that's your map, one page with five boxes. And from now on, anyone who touches your Salesforce gets this page first.

Now your new admin's working, the jobs are moved and the map's written. That's when you freeze the old login, and not before. Freezing just stops anyone using it. Give it a week, and if nothing breaks, deactivate it. Salesforce won't let you delete a user, so their records stay put.

## Step 4: Split the changes

Step four, split every change into two piles. One pile is what your team can safely do, and the other is what needs an expert.

Salesforce actually has a built-in role for the safe pile, and it's called delegated administrator. One person you trust can create and edit users in their group, and reset most passwords. They can also hand out permission sets from a list you've approved. But they can't touch the role hierarchy or the relationships between objects.

The other pile has one rule. Nothing gets built in your live system. It goes into a sandbox first, and a sandbox is just a safe copy of your Salesforce. When I recorded this, in November 2026, a Developer Pro sandbox was an add-on. It cost five percent of net spend. Prices change, so take that as an example, and check which sandboxes you're already paying for.

So pick your delegated admin. Then take your last six months of consultant invoices, and put each line in one of the two piles.

And tell your delegated admin where the line is. Just say, "You own users, passwords and permission sets. Anything that changes objects, automations or integrations comes to me first, and goes to a sandbox."

## Step 5: Scope the consultant, and ask the fit question

Step five, when you need outside help, scope it so you don't end up dependent all over again. You don't want to pay someone by the hour to learn your system.

So send a short brief before any work starts. It's six lines, and they're on screen. The big one is a fixed price, so there's no hourly meter running. And admin access stays with you, every time.

You can send it as one email. "Here's the outcome we want and our one-page map. Please quote a fixed price for this list, and test it in our sandbox. Send written notes on what changed, and spend one hour showing our delegated admin. Admin access stays with us."

Now here's the bigger question. Was the problem really that the admin left? Or did your Salesforce get bent until only one person could follow it?

Here's a check you can do this week. Draw your process, from first contact to final invoice. Then circle every step where the team works around Salesforce.

So tell me in the comments who built your Salesforce, and which change you've been waiting longest for. I read every comment.

## Recap

OK, that's the five steps. You take back the keys, and you check what runs in their name. Then you write down what you have. You split the changes. And you scope the consultant.

## Is a new admin enough?

Now let's go back to that customer after the merger. Sure, a new admin fixes this week's problem. But they're just the next person who understands it, until they move on too.

So what should you do before anyone leaves? There has to be redundancy. That means more than one person on your team knows how your CRM works. And keep a good relationship with whoever set it up. If you lose both, a good consultant can audit your setup, but that can get very expensive.

And honestly, the system is secondary. The number one thing is, do you know your own sales process, your marketing, and how you onboard a new customer? If you do, the system can always be adapted around it. And moving to another rented CRM doesn't fix that, if it just gets customised the same way.

## What we do

That's why I started CRM From Within. We give you a CRM that doesn't belong to whoever set it up. We build it from scratch around how you sell and deliver, and AI is what makes that affordable now. We bring your Salesforce data across, and we keep it running. You own every line of the code, and you're not tied to a long contract. It's for teams of ten to fifty people where a standard CRM just doesn't fit.

## Close

So here's your list. Get your two admins first. Then move the jobs and settings, and write the one-page map. Only after that, switch off the old login. Pick a delegated admin and split the piles. And send the brief before the next invoice lands.

In the next video, I'll show you how to leave HubSpot without losing your data. So subscribe so you don't miss that.
