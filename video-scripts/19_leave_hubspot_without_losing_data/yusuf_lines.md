# How to Leave HubSpot Without Losing Your Data: 5 Steps

*Video 19 · Yusuf's lines only*

## Proof

Here's a public example. One company tried to leave HubSpot a couple of times, and each time they came back. They called the migration brutal. Their data stopped matching, and their sales team sold less.

I built a CRM SaaS company and sold it. Me and my team set up CRMs for hundreds of companies, and I can tell you, that kind of pain starts with the move itself. So here's how to leave HubSpot without losing your data, in five steps.

## Who it's for

Maybe you want out of HubSpot, but you're scared of losing ten years of notes, calls and files, so you keep renewing. This video shows you how to get out with all of it.

## Promise

That company wants to try again, and they're scared. You can read their post yourself. The link's in the description with all the other sources.

So in this video you'll see where every piece of your data lives. You'll see how to get all of it out, and how to move without switching anything off early. Then you'll prove it worked before you let go of HubSpot. And at the end, I'll give you the six tests that company never ran.

## Plan

There are five steps, and you do them in order. Step five is the one that decides if the whole thing worked.

## Step 1: Map what lives where

Step one. Before you export anything, map what you have. HubSpot holds five kinds of things, and each one comes out in a different way.

So number one is your records. That's your contacts, companies and deals, and all their fields. HubSpot calls fields "properties", so that's things like "lead source" or "industry". And it also keeps the links between records, which it calls "associations".

Secondly, you've got your history, so every note, call, email and meeting on the timeline. HubSpot calls those "activities".

Number three is files, like that quote PDF someone attached to a note in 2019.

Number four is what I call the things that run. That's your workflows, the automations, like "when a deal is won, create a task for the installer". But it's also your forms, your email templates and your sequences. None of that is really data, it's instructions. And number five is your numbers, so your reports and your dashboards.

Take this one, from October. At one company with twenty-five people, the person who uses HubSpot every day wrote, forms, newsletter builder, sequences, all of it, gone. And they're right. The things that run don't move, so you have to rebuild them.

So take one sheet and write one line per thing. Start with every kind of record, and how many you have. Then add every workflow, form and report your team actually opens. Next to each one, write who uses it. And write if it comes out as data, or if you have to rebuild it.

## Step 2: Export more than records

Step two. Export more than records. In video two I showed you that the basic export leaves your history out, so now let's get every box on the map out.

Let's start with records. Export every kind of record with all its fields and links. The setting to pick is on screen. By default, each record only lists up to a thousand linked records. A big customer can have more than that, so there's a second setting for that, also on screen. And download the file right away. HubSpot says the link expires after thirty days.

Then export the properties. That's every field with its dropdown options, and your new system needs that list first.

Next is history, and HubSpot gives you three ways to get your notes and calls out. You can do it one contact at a time, which is fine for ten customers, but useless for ten thousand. You can use certain activity reports. Or you can use the engagements API, which is basically a door for software instead of people. A developer or a migration tool asks for every note and call, and gets each one back with its record.

The format matters too. For example, one customer needed their client notes unedited, each one with its date and time. The only way out they found was a JSON file.

So say this to whoever does the move. "Every note and call has to arrive with its date, time, author and customer, and every file on its record. Show me one customer done that way before you move the rest."

## Free CRM fit check

And if you'd like someone to plan this move with you, that's what our free twenty-minute CRM fit check is for. The link's below. OK, back to files.

## Step 2, continued: Files and things that run

In the Files tool, a super admin can export folders as a ZIP. But there's a catch. A note only points to its attachment, with a file ID. So if you lose those IDs, you've got a folder full of PDFs and no idea whose they are. And HubSpot's Files page doesn't say the ZIP includes them, so keep them from your notes export.

Then there's the things that run. Workflows export as a spreadsheet, or as a picture of one workflow, but without their history. So think of that as a blueprint for the rebuild. For reports, HubSpot's page only describes an export file, and it says nothing about rebuilding them. Form submissions do export. But email templates and sequences aren't on the export page, so you'll have to copy those by hand.

Now take your biggest, oldest customer and get every piece out. That's the record, every deal, every note and call with its date, and every file. If you can do it for one, you can plan it for all of them.

## Step 3: Time it against your renewal

Step three. Time the move against your renewal. I covered the renewal in video two, so I'll just say one thing here. Switch off auto-renew first. And for a migration, you're going to need more time than you think.

And I've got one more example for you. One company cancelled auto-renew, and then the migration ran late, so HubSpot sold them a short extension. But that's money for a system you're leaving, and it only works if HubSpot agrees.

So ask before you need it. Email your rep and say, "We've turned off auto-renew. If our move runs past the renewal date, what would a short extension cost? Could you send it over?"

Then plan backwards from the renewal date, and put a date on every step. Leave a buffer, because something will go wrong. Before the buffer, you run both systems for a few weeks. Before that, a test move. And before that, the map and the exports. If it doesn't all fit before this renewal, at least you know now, and not in the last week.

Here's one detail people miss. Through the API, HubSpot caps how many exports you can run in a day. The exact limit is on screen. So if you've got a lot of record types, that can stretch over days.

## Step 4: Run old and new side by side

Step four. Run old and new side by side. Honestly, the riskiest move is the big-bang switch. You're on HubSpot on Friday, you're on the new system on Monday, and whatever didn't move just isn't there.

And even when it goes well, bugs show up in the weeks after. You want to find them while HubSpot is still there to fall back on.

Here's how you do it. First, move one team, say the installers.

Second, keep HubSpot open so people can look things up. But after a set date, nobody edits a record there. That's your freeze date. Why do you need it? Because otherwise you get two versions of the truth.

And third, only switch HubSpot off when step five passes.

After the freeze date, run one last export of what changed, so the final week comes across too. And as each rebuilt automation goes live, switch off its HubSpot version, so no customer gets the same email twice.

So decide who moves first and when your freeze date is, and write both down.

Then tell your team, "From Monday, HubSpot is read-only. Look things up there if you need to, but every new note, deal and change goes into the new system."

## Step 5: Test before you switch

Step five. Remember the company that tried to leave more than once? Their data stopped matching, and their sales team sold less. Well, you can actually test for both of those.

There are six tests. Number one, check the counts. The totals in the old and the new system should match.

Number two, check the links. Take ten big customers. Every deal and contact should still be attached.

Number three, check the history. Take twenty random customers, and put the two timelines side by side.

Number four, check the files. Do they open, and are they on the right record?

Number five, run every rebuilt automation once, with a test record.

And number six, every salesperson works one real day in the new system before you switch. So they find what's missing, not your customers.

Remember that company from the start? They went back to HubSpot twice. These six tests are how you don't.

And do one full practice run first, into a test copy of the new system. That first run finds the problems, and the second one is the real move.

Write the six tests down, with a name on each one. When they've all passed, that's when you switch HubSpot off, and not before.

Let me know in the comments what in your HubSpot you're most afraid to lose.

## Recap

So that's the five steps. Map what lives where. Export more than records. Time it against your renewal. Run old and new side by side. And test before you switch.

## Is a safe move enough?

Now, those five steps get your data out safely. But if you move safely into the wrong system, you're still in the wrong system. Another rented CRM just gives you the same per-seat pricing, the same yearly renewal, and a new list of things it can't do.

## What we do

At CRM From Within, we build a CRM around how your team sells and delivers, right next to HubSpot. And nothing gets switched off until it passes those six tests. We move every note, call and file over, and we look after it. You own the code, there's no long contract, and if you leave, you take everything with you. It's made for companies of ten to fifty people where HubSpot's standard setup keeps getting in the way.

## Close

So do this. This week, write your data map. Export your biggest customer, every piece of it. Then plan backwards from your renewal. Pick the first team and the freeze date. And write down your six tests. If you skip this, the fear wins, and you'll just renew again.

Next up is how to choose between building, buying or owning your CRM, for a thirty-person company.
