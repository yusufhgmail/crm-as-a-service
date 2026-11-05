# What to Do When Your Salesforce Admin Leaves (MAYBE: Yusuf, keep or drop?)

*Video 12 · Yusuf's lines only*

## Proof

Here's an example from my old company. One customer went through a merger, and the person who built their whole CRM setup left. Two new people took it over. Two days later, one of them couldn't even find his login.

And the thing they used the CRM for most was webinars. After that, they couldn't run a single one without our help.

Over the years, I built a CRM SaaS company, and I sold it a few years ago. Me and my team set up CRMs for hundreds of companies. And about one in ten customers who left us did it right after a key person left.

So in this video I'll show you what to do when your Salesforce admin leaves. It's five steps, and you do them in order.

## Who it's for

If your Salesforce lived in one person's head, and that person is leaving or they've already gone, this video is for you. It gets you the keys back, and it stops you paying for every small change.

## Promise

By the end you'll have admin access back. You'll have moved what matters before the old login goes. You'll have your Salesforce on one page. And you'll know how to brief a consultant, so you're never stuck like this again. You don't need to be technical for any of this.

## Plan

So those are the five steps. And step five isn't a setting. It's a question about how your company works. It tells you if a new admin really solves this, or just resets the clock until the next one leaves.

## Step 1: Take back the keys

Step one. Take back the keys. In Salesforce, anyone with the System Administrator profile can change everything. That's users, fields, automations, and who sees what. So first, find out who has that profile right now.

So go to your users page. The path is on screen. Look at who's an admin.

Salesforce's own help says to keep more than one admin. And when an admin leaves, you set up the new one first, and you log in as them. Only then do you switch off the old account.

But what if there's no admin left? If you still control the old admin's work email, you can reset the password through it. If not, Salesforce Support can do it, but they want a letter signed in ink by your CEO, CFO or owner.

So start here. Get two admin logins that the company controls, not one person.

If the admin's still around, say this. "Before you go, please create a System Administrator login for me, and stay logged in while I test it."

## Step 2: Check before you deactivate

Step two. Before you switch off the old login, check what runs under it. A lot of things in Salesforce run as a specific user, and when that user goes, some of them just quietly stop.

Here's a simple example. Say the admin who left set up your weekly data export. You deactivate them, and that export fails. Salesforce's fix is to delete the job and set it up again as someone who's staying.

Some settings even have the person's name written into them. Take your website form. Every lead from it gets created in someone's name. Your rules and your approvals can work the same way. The full list is on screen. Move each one to someone who's staying.

Then open your scheduled jobs page. The path is on screen. If a job has the old admin's name on it, move it.

And if the admin hasn't left yet, ask them this. "Can you list every job, rule and integration that runs under your login? We'll move each one before we switch it off."

## Free CRM fit check

If you'd rather your CRM didn't live in one person's head, there's a free twenty-minute fit check below.

## Step 3: Write down what you have

Step three. Write down what you have. Whatever your admin knew usually wasn't written anywhere, and every consultant you bring in will bill you to rediscover it.

Start in Object Manager. An object is just a kind of record, like Accounts, or something custom like "Site Inspections". So write down every custom one and what it's for. Then note which fields people really fill in.

Next, your automations. Those are the things that happen on their own. A deal is won, so a project gets created, and the site team gets an email. The three places to look are on screen. Salesforce stopped supporting two of them at the end of 2025. When we checked, they still ran. But Salesforce wants them moved.

There's also a page that shows the last six months of changes. So you can see who did what, and when.

Then write down your integrations. That's everything that talks to Salesforce, like your email or your accounting. For each one, write what it sends. And write whose login it runs on.

And don't forget the jobs someone does by hand every week, like copying records between two systems. Nobody remembers those until they stop, so write them down too.

One lesson I learned with that customer after the merger. When you sit down with the people who are left, ask what they need to get done. Don't get stuck in how the last admin used to do it.

So that's one page with five boxes, and from now on, anyone who touches your Salesforce gets this page first.

And it's only now, with the new admin working, the jobs moved and the map written, that you freeze the old login. That stops anyone using it. Give it a week, and if nothing breaks, deactivate it. Salesforce won't let you delete a user, so their records stay put.

## Step 4: Split the changes

Step four. Split every change into two piles. One pile is what your team can safely do, and the other is what needs an expert.

Salesforce actually has a built-in role for the safe pile. It's called delegated administrator. One person you trust can create and edit users in their group, and reset most passwords. They can also hand out permission sets from a list you've approved. But they can't touch the role hierarchy or the relationships between objects.

The other pile has one rule. Nothing gets built in your live system. It goes into a sandbox first, and a sandbox is just a safe copy of your Salesforce. When I recorded this, in November 2026, a Developer Pro sandbox was an add-on at five percent of net spend. Prices change, so take that as an example, and check which sandboxes you're already paying for.

So choose your delegated admin. Then take your last six months of consultant invoices. Put each line in one of the two piles.

And tell your delegated admin where the line is. Just say, "You own users, passwords and permission sets. Anything that changes objects, automations or integrations comes to me first, and goes to a sandbox."

## Step 5: Scope the consultant, and ask the fit question

Step five. When you need outside help, scope it so you don't end up dependent all over again. You don't want to pay by the hour for someone to learn your system.

So send a short brief before any work starts. It's six lines, and they're on screen. The big one is a fixed price, not an hourly meter. And admin access stays with you, every time.

You can send it as one email. "Here's the outcome we want and our one-page map. Please quote a fixed price for this list, and test it in our sandbox. Send written notes on what changed, and spend one hour showing our delegated admin. Admin access stays with us."

Now here's the bigger question. Was the problem really that the admin left? Or did your Salesforce get bent until only one person could follow it?

Here's a check you can do this week. Draw your process, from first contact to final invoice. Then circle every step where the team works around Salesforce.

So tell me in the comments who built your Salesforce, and which change you've been waiting longest for.

## Recap

So that's the five steps. Take back the keys. Check what runs in their name. Write down what you have. Split the changes. And scope the consultant.

## Is a new admin enough?

So let's go back to that customer after the merger. Sure, a new admin fixes this week. But they're just the next person who understands it, until they move on too.

So what should you do before anyone leaves? There has to be redundancy. More than one person on your team must know how your CRM works. And keep a good relationship with whoever set it up. If you lose both, a good consultant can audit your setup, but that can get very expensive.

And honestly, the system is secondary. The number one thing is this. Do you know your own sales process, your marketing, and how you onboard a new customer? If you do, the system can always be adapted around it. Moving to another rented CRM doesn't fix that, if it gets customised the same way.

## What we do

That's why I started CRM From Within. We give you a CRM that doesn't belong to whoever set it up. We build it around how you sell and deliver, we bring your Salesforce data across, and we keep it running. You own every line of the code, and you're not tied to a long contract. It's for teams of ten to fifty that a standard CRM keeps bending out of shape.

## Close

So here's your list. Get your two admins first. Then move the jobs and settings. Write the one-page map. Only then switch off the old login. Pick a delegated admin and split the piles. And send the brief before the next invoice lands.

In the next video, I'll show you how to leave HubSpot without losing your data.
