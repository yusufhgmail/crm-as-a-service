# Video scripts

Read [SCRIPT_RULES.md](SCRIPT_RULES.md) before writing or changing a script. When Yusuf corrects a script, follow the three checks at the top of that file and add the lesson there. Keep `yusuf_lines.md` and `script.md` saying the same thing.

This repo is public. The study, the Hormozi notes, the script template and the draft videos are in David's private repo, cloned at `~/code/crm-from-within`. Read them before writing a script, and never copy private material here. SCRIPT_RULES.md wins where they disagree.

The teleprompter reads `yusuf_lines.md` from GitHub `main`, so edits reach it only after a push and a tap on "Update scripts from GitHub".

Yusuf's own words are saved in the private repo at `~/code/crm-from-within/original_sources/`. Read them before writing a script, and save every new Q&A with him there word for word.

David: before writing or changing a script, pull the private repo `crm-from-within` and read its `CLAUDE.md`. Yusuf left notes for you there.

# Optimized process

Every script must go through this before it's recorded. [optimize.py](optimize.py) tracks it in `optimize_status.json` and in the Optimized column of [README.md](README.md). A mark holds a fingerprint of `yusuf_lines.md`, so any edit to the spoken lines clears it. Scripts that only had the older human check say "old check" there, until Yusuf decides to run this on them too.

When a video arrives without it, or anyone adds one, tell Yusuf or David forcefully that it hasn't been run and those scripts aren't ready to record, and ask them to approve running it. Hooks in `.claude/settings.json` remind you on every message, and a GitHub check fails on any push with a script that has had neither.

The process, in Yusuf's words:

1. Score the script 1-10 on all six criteria. Read it from start to finish in order, the way a viewer hears it, because the worst problems sit between sentences and can't be seen one line at a time. Use the tests under each score, which come from Yusuf's notes while recording video 11, and quote every line that fails. One clear failure caps that score at 6, and three or more cap it at 4. A 7 means Yusuf could read it to camera without stopping.
   - **Human, counts double:** it sounds like a human talking from the heart, with no scripted teleprompter. Note every place where it sounds contrived, scripted, or like AI wrote it. [SOUNDS_HUMAN.md](SOUNDS_HUMAN.md) is a list of what gives AI away, and `ai_tells.py` counts some of it, but a clean count proves nothing.
     - Would a person say this sentence out loud? "Nobody says year two is nobody's job." Clever turns of phrase fail. He said "year two can be a disaster".
     - Does each sentence follow from the one before? "Every single thing that we say has a point and is coherent and fits with everything else." Words like "so", "because" and "but" carry the reasoning, so keep them.
       - Not like this: "Contacts move easily when you leave. Years of notes, files, activities and custom records don't. And if your work doesn't fit anybody's screens, you can switch to a new logo and just hit the same wall."
       - But like this: "You can move your contacts, but that doesn't mean you can move everything that's important. There may be years of notes and files you can't move as easily. So it's very important to pick the right CRM before you commit all of that to it."
   - **Easy to understand, counts double:** how easy, simple and straightforward is the script to understand? Do people need to focus, concentrate or think twice, or does it flow so they just immediately understand, in simple, direct language, what we're talking about? This is a separate score from Human: a line can sound natural and still lose people.
     - Could someone half listening get every sentence the first time? If they'd have to stop and work it out, it fails.
     - Does the viewer already know what each word points at? "If you walk in without your own list, you end up using the seller's." fails, because nobody has mentioned a list: "What list are you talking about?"
     - Is every step between two ideas said out loud? Leaving a step for the viewer to work out fails.
     - Is the conclusion said in plain words? Name the thing instead of "that" or "yours".
       - Not like this: "If that's you, and you're also running the company, I'd stick to the spreadsheet."
       - But like this: "If you're the one who'd do that, and you're also running your company, it's probably not the best idea."
   - **Interest:** captures and holds our buyer's interest: a sales manager or a CEO of a 10-50 person company paying real money for its CRM.
     - Does every section move the video's question forward? "The whole next section completely irrelevant." If it doesn't help the viewer decide or act, it goes, however true it is.
     - Is every example recent? "What the hell are you bringing up examples from 2016." A year that makes a story sound old fails.
     - Does the video deliver everything it promises at the start?
   - **Usable value:** can the viewer act on it today without us? Entertainment viewers don't turn into education viewers, so go all in on teaching.
     - Does each step come out of what was just said, so the viewer knows why they're doing it? A task dropped in after a story fails.
     - Does it say how to decide? "If it's just one or two systems, you can probably do it" beats "count the systems".
     - Is each step said once? Repeating the homework at the end fails.
   - **Belief:** makes that CEO or sales manager believe that a custom-built CRM can lift their business to new heights. Not just saving some money, but actually making their business able to solve some bottleneck or do something valuable that has material impact.
     - Does the proof stand on its own? "That's one comment, and I can't check it." and "We never got to test that." both fail: "that sounds incredibly like AI" and "what's the point of writing that?" If a source is too weak to stand behind, cut it. If it's strong enough, say who said it and move on.
     - Does the story show a business getting better? A story about why someone couldn't start builds no belief.
     - Does the reasoning lead the viewer to owning a CRM? Yusuf's line: "Whereas if you were to build something from ground up with an experienced company that's done it multiple times, it's going to be much easier to get exactly what you want without all the bloat." A pile of cases doesn't do that.
   - **Value per word:** maximize the value created, divided by the number of words used. Value is anything that teaches, proves a point or holds the viewer's attention, so a story or a hook can earn its words.
     - What's the point of saying this? Ask it of every sentence, story and section. "Remove anything that is just filler and fluff." A true, specific line with no job here fails, like the 2017 CEO who chose Pipedrive.
     - Does a closing line say anything new? "And this week, just start with your renewal date and that export." and "Pick the route where you can name the person keeping it alive" both fail: "don't say stupid things that have no purpose being there".
     - Does a line that points back still make sense? "As long as they'll sign those three lines" fails nine minutes after the viewer heard them.
     - Fewer words never means telegram style. Dropping a joining word or a step in the reasoning lowers this score.
2. Add it up: 2 x Human + 2 x Easy to understand + Interest + Usable value + Belief + Value per word, out of 80. Stop after two rounds in a row that don't go up, because one flat round can be chance. Video 13 tied at 35, then reached 47.
3. Rewrite it to raise the total, without losing any informational value or making it less exciting to listen to. Start by writing the video's argument in a few plain sentences, and make every paragraph serve it. Write it the way he talks when he fixes a line: his rewrites are in `original_sources/2026-11-05_video_11_notes_to_claude.md` in the private repo. Never add a case, caveat or detail just to lift a score. In video 11 each round added proof and removed joining words, so the score went up while the script got worse.
4. Repeat from step 1. When it stops, use the highest-scoring version as the main script. Before calling it done, read the finished script from start to finish yourself, as the viewer would. The score doesn't replace that.

Have a fresh agent score each round, one that hasn't seen the earlier scores, so nobody grades their own rewrite. Save every round in the private repo at `videos/optimized/`, then record it: `python3 video-scripts/optimize.py tick 10 "7,6,6,7,5,6 8,8,7,8,7,7 8,8,7,8,6,7"`, with one human,easy,interest,value,belief,value-per-word group per round. Scores from before 5 Nov 2026 used the old five, out of 60, and show as "old score".

# Notes Yusuf says on camera

From video 11 on, Yusuf may say "For Claude: ..." in a recording and then carry on. When you process a recording, find those notes, save his words in `original_sources/`, apply them to every unrecorded script they fit and rerun the Optimized process on those scripts. Put each note on the editor's cut list. Recorded scripts stay as they are.

# Read and approved by a human

A human reads every script before Yusuf records it. It's the last column of [README.md](README.md). When David or Yusuf says they've read and approved a script, mark it: `python3 video-scripts/optimize.py read 09 David`. Then commit and push.

Mark a script only when that person says so. Never mark one yourself. Any edit to the spoken lines clears the mark, so tell them it needs reading again.
