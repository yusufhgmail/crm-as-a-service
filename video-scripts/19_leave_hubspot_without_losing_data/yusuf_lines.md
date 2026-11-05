# How to Leave HubSpot Without Losing Your Data: 5 Steps

*Video 19 · Yusuf's lines only*

## Proof

We found a post on Hacker News from one company that tried to leave HubSpot a couple of times, and they ended up coming back. They called the migration brutal. Their data stopped matching, and it noticeably hurt their sales team. Now they're thinking of trying again, and they're worried it'll go the same way.

I built a CRM SaaS company, and I sold it. Me and my team set up CRMs for hundreds of companies, and I've worked with HubSpot since 2011. So I'll show you how I'd leave it without losing your data.

## Who it's for

Maybe you want out too, but you've got ten years of notes, calls and files in there, so you just keep renewing. I don't think anyone should stay on a CRM because they're scared of an export.

## Promise

By the end you'll have all of it out, plus six tests to run before you switch HubSpot off, and one of them is for what happened to that sales team. Every source is linked below.

## Plan

It's five steps, in order, and step five is the one that decides.

## Step 1: Map what lives where

Before you export anything, map what you've got, because HubSpot holds five kinds of things, and each one comes out a different way.

Number one is your records. That's your contacts, companies and deals, with their fields, and HubSpot calls fields "properties". The links between records, it calls "associations".

Secondly, your history. That's every note, call, email and meeting on the timeline, and HubSpot calls those "activities".

Number three is your files, like a quote PDF someone attached to a note in 2019.

Number four is what I call the things that run. That's your workflows, like "when a deal is won, create a task for the installer", plus your forms, email templates and sequences. And number five is your numbers, so your reports and dashboards.

I'd look hardest at number four, because none of it moves. You have to rebuild it. In October, the person who uses HubSpot every day at a company of twenty-five posted about this on Reddit, when her CMO wanted to leave. Forms, newsletter builder, sequences, all of it, gone. And she says what he hadn't counted was the development time.

So take one sheet, and write one line per thing, with how many you have and who uses it. Then write if it comes out as data or you have to rebuild it. If nobody uses it, cross it out.

## Step 2: Export more than records

Step two is the export, and it has to cover more than records. The basic export leaves your history out, I showed you that in video two.

For each kind of record, go to Export and pick "All properties and associations on records". By default, each record only lists up to a thousand linked records, and a big customer can have more. So under Associations, pick "All associated records", which only works with CSV files. Then download the file right away, because HubSpot says the link expires after thirty days.

Then export the properties, in Settings. That's every field with its dropdown options, and your new system needs that list first.

History is the hard one. A guy called Paul moved an eight-person sales team from HubSpot to Attio with a migration tool, and he wrote up what happened. Their contacts and companies came over fine. But with call notes, emails and meetings, some came over and some didn't. He spent the better part of two days cleaning up, and weeks later a rep would open an account and find nothing there.

You can get your notes and calls out one contact at a time, which is fine for ten customers, but useless for ten thousand. You can build a report with activities as the data source, and export that.

Or you can use the engagements API, where a developer or a migration tool asks HubSpot for every note and call, and gets each one back with its record. If you've got years of notes, I'd use that one.

Watch the format too. One customer on Trustpilot says the only way out for their notes was a JSON file, which is a file made for software.

I've been on the other side of this. When a customer left my old company, we helped with the export, and their sent emails came out as PDFs. So ask for something a person can open.

Then say this to whoever does the move. "Every note and call has to arrive with its date, time, author and customer, and every file on its record. Show me one customer done that way before you move the rest."

## Free CRM fit check

If you'd like someone to plan this move with you, that's what our free twenty-minute CRM fit check is for. The link's below. OK, back to files.

## Step 2, continued: Files and things that run

You can end up with a folder full of PDFs and no idea whose they are. A super admin can export folders from the Files tool as a ZIP, but a note only points to its attachment with a file ID. So if you lose those IDs, that's what you've got. HubSpot's Files page doesn't say the ZIP includes them, so save them from your notes export.

The things that run, you only export as a plan for the rebuild. Workflows come out as a spreadsheet, or as a picture of one workflow, without their history. For reports, I'd screenshot every dashboard your team uses, with its filters. Form submissions do export, but I'd copy email templates and sequences by hand, because they aren't on HubSpot's export page.

Now take your biggest, oldest customer, and get every piece out. That's the record, every deal, every note and call with its date, and every file. If that works, you can plan the rest.

## Step 3: Time it against your renewal

Now the timing. Switch off auto-renew first, I covered that in video two. Then be realistic, because Paul planned for a weekend, and it took closer to three weeks before his team was fully working.

One company on Reddit switched off auto-renew, then their move to Salesforce ran late, so HubSpot sold them a short extension. That's money for a system you're leaving, and it only works if HubSpot agrees.

So ask before you need it. Just email your rep and say, "We've turned off auto-renew. If our move runs past the renewal date, what would a short extension cost? Could you send it over?"

Then plan backwards from the renewal date. I'd leave thirty days at the end, because something will go wrong. Before that you run both systems for a few weeks, before that you do a test move, and before that, the map and the exports. If it doesn't all fit before this renewal, at least you know now.

## Step 4: Run old and new side by side

Step four, run old and new side by side. I think the riskiest way to do this is all at once. You're on HubSpot on Friday, you're on the new system on Monday, and whatever didn't move just isn't there.

One company with ten million dollars in yearly recurring revenue says on LinkedIn that they got out of HubSpot in one solid week. It went very smoothly, and they were still working through bugs. I'd want to find those while HubSpot's running.

So move one team first, say the installers. Keep HubSpot open so people can look things up, but after a set date, nobody edits a record there. That's your freeze date, because otherwise you've got two versions of every customer.

After that date, run one last export of what changed, so the final week comes across too. And as each rebuilt automation goes live, switch off its HubSpot version, so no customer gets the same email twice.

Pick who moves first and your freeze date, and write both down. Then tell your team, "From Monday, HubSpot is read-only. Look things up there if you need to, but every new note, deal and change goes into the new system."

## Step 5: Test before you switch

Step five decides it. That company from the start said their data stopped matching, and it hurt their sales team. You can test for both while you've still got HubSpot. Do one full practice run into a test copy of the new system, and run these six tests on it. The next run is the real move.

Number one, check the counts. The totals in the old system and the new one should match.

Number two, check the links. Take ten big customers, and every deal and contact should still be attached.

Number three, check the history. Take twenty customers at random, and put the two timelines side by side. If you pick them yourself, you'll pick the clean ones.

Number four, check the files. Do they open, and are they on the right record?

Number five, run every rebuilt automation once with a test record, and check it did the right thing and no real customer got anything.

And number six is for that sales team. Every salesperson works one real day in the new system before you switch. If they can't do their job in it, you'll hear on day one, while HubSpot's still there.

Write the six tests down, and put a name on each one. When they've all passed, you can switch HubSpot off.

What in your HubSpot are you most afraid to lose? Let me know in the comments. I read every comment.

## Is a safe move enough?

That's how you get out. I'd think just as hard about where you're going. Paul's team made it across, and by month three he was building workarounds in spreadsheets for things HubSpot did out of the box, and they ended up going back. Another rented CRM usually means the same per-seat pricing and the same yearly renewal. And at my old company, recruiters and construction firms very often told us there's no good CRM for them.

One company in Australia went another way. Fason Group supply and service aluminium and PVC machinery. Their sales ran on HubSpot, and their service work ran largely on email and paper. So they had a system built around both, and they replaced HubSpot outright. Their contacts, deals and notes moved across, and now the reps and the technicians work from the same client record.

Say a technician sees a machine's getting old, and that goes on the record. Now the rep can call about the next one.

The firm that built it wrote that up, and it gives no numbers, so I can't tell you what it did for revenue. The co-founder says, "It's tailor-made for what we actually do."

And one guy on Facebook cancelled a HubSpot account that cost him five thousand dollars a month, for a system he built himself. He says adoption by him and his sales team has gone through the roof, and the only thing he got wrong was not doing it sooner.

## What we do

At my company, CRM From Within, we build a CRM from scratch around how your team sells and delivers, right next to HubSpot. AI has made that far cheaper than it used to be. We move every note, call and file over, nothing gets switched off until it passes those six tests, and then we look after it. You own the code, there's no long contract, and if you leave, you take everything with you. It's made for companies of ten to fifty people where HubSpot's standard setup keeps getting in the way.

## Close

So this week, write your data map and export your biggest customer. If you want us to look at it with you, the fit check's below.

Next up, I'll show you how to choose between building, buying or owning your CRM, for a thirty-person company. So subscribe so you don't miss that.
