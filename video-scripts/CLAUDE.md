# Video scripts

Read [SCRIPT_RULES.md](SCRIPT_RULES.md), then [SOUNDS_HUMAN.md](SOUNDS_HUMAN.md), before writing or changing a script. SCRIPT_RULES says what a script says, SOUNDS_HUMAN says how it sounds, and this file says how we check it. Each idea goes in one of the three, once. When Yusuf corrects a script, follow the three checks at the end of SCRIPT_RULES and add the lesson to the file it belongs in. Keep `yusuf_lines.md` and `script.md` saying the same thing.

This repo is public. The study, the Hormozi notes, the script template and the draft videos are in David's private repo, cloned at `~/code/crm-from-within`. Read them before writing a script, and never copy private material here. SCRIPT_RULES and SOUNDS_HUMAN win where they disagree.

The teleprompter reads `yusuf_lines.md` from GitHub `main`, so edits reach it only after a push and a tap on "Update scripts from GitHub".

Yusuf's own words are saved in the private repo at `~/code/crm-from-within/original_sources/`. Read them before writing a script, and save every new Q&A with him there word for word.

David: before writing or changing a script, pull the private repo `crm-from-within` and read its `CLAUDE.md`. Yusuf left notes for you there.

# Optimized process

Every script must go through this before it's recorded. [optimize.py](optimize.py) tracks it in `optimize_status.json` and in the Optimized column of [README.md](README.md). Once a script has the mark it keeps it, so edits in human review don't need another run. Scripts that only had the older human check say "old check" there, until Yusuf decides to run this on them too.

When a video arrives without it, or anyone adds one, tell Yusuf or David forcefully that it hasn't been run and those scripts aren't ready to record, and ask them to approve running it. Hooks in `.claude/settings.json` remind you on every message, and a GitHub check fails on any push with a script that has had neither.

The process, in Yusuf's words:

1. Score the script 1-10 on all six criteria. Read it from start to finish in order, the way a viewer hears it, because the worst problems sit between sentences and can't be seen one line at a time. Use the tests under each score, which come from Yusuf's notes while recording video 11, his edits to videos 16 to 18 and what he changed on camera in video 16, and quote every line that fails. One clear failure caps that score at 6, and three or more cap it at 4. A clear failure is a line a half-listening viewer would trip on or Yusuf would stop at. List anything smaller as minor, and don't count it. A 7 means Yusuf could read it to camera without stopping.
   - **Human:** it sounds like a human talking from the heart, with no scripted teleprompter. Note every place where it sounds contrived, scripted, or like AI wrote it. [SOUNDS_HUMAN.md](SOUNDS_HUMAN.md) says how to write for the ear and lists what gives AI away. `ai_tells.py` counts some of it, but a clean count proves nothing.
     - Does the opening sound like him starting a real conversation? A staged scene or a made-up customer quote fails: "the hook sounds contrived."
     - Would a person say this sentence out loud? Clever turns of phrase fail. "Nobody says year two is nobody's job."
     - Does each sentence follow from the one before? "Every single thing that we say has a point and is coherent and fits with everything else." Words like "so", "because" and "but" carry the reasoning, so keep them.
     - Does it sound like someone advising the boss, or like a manual? A step that only says what to do fails where the viewer would ask "why should I?"
     - Does he say what he really thinks? Where the viewer is probably wrong, say why they think it, then say so. A section that stays neutral where he'd have an opinion fails.
   - **Easy to understand:** how easy, simple and straightforward is the script to understand? Do people need to focus, concentrate or think twice, or does it flow so they just immediately understand, in simple, direct language, what we're talking about? This is a separate score from Human: a line can sound natural and still lose people. The "Write for the ear" rules in SOUNDS_HUMAN.md apply here too.
     - After the first two sentences, could the viewer say what this video covers and why it's worth watching? A story, a scene, a question or a conclusion that comes before the topic fails: "I don't think it's clear what this video is about." He wants "something that makes them understand immediately the problem this video addresses".
     - Could someone half listening get every sentence the first time? If they'd have to stop and work it out, it fails.
     - Does the viewer already know what each word points at? "If you walk in without your own list, you end up using the seller's." fails, because nobody has mentioned a list: "What list are you talking about?"
     - Would someone who started listening at this sentence know what it's about? Don't count on a label set up minutes earlier. "The first moment is when you want your CRM to work a little differently." fails: "The first moment of what?"
     - Is every step between two ideas said out loud? Leaving a step for the viewer to work out fails.
     - Is the conclusion said in plain words? Name the thing instead of "that" or "yours".
     - Before an example starts, does the viewer hear that it's real and where it comes from? A story that starts with a name or a company and no such line fails, even if it names the topic.
     - Can the viewer picture each kind of tool? Naming only the kind of tool fails. The first time it comes up, give two popular tools a small company would use: "name 2 examples of the most popular SMB tools for that thing."
   - **Interest:** captures and holds our buyer's interest: a sales manager or a CEO of a company of at least ten people paying real money for its CRM.
     - Does it tell the viewer something has changed? Say what they've had to live with, and why that's no longer true: "in the past you had no choice ... but today, that's not the case at all." Useful tips that leave them where they started fail.
     - Does every section move the video's question forward? "The whole next section completely irrelevant." If it doesn't help the viewer decide or act, it goes, however true it is.
     - Is every example recent? "What the hell are you bringing up examples from 2016." A year that makes a story sound old fails.
     - Does the video deliver everything it promises at the start?
     - Does it say why the problem happens, from what each person wants? Saying only what goes wrong fails.
     - Does it say what really happens, step by step? Naming a risk fails. "If that went wrong, your salespeople couldn't sell" became "the old system, you had to cancel it so that it won't renew, and you had to migrate everything before the cancellation period, I mean, it's a huge headache."
     - Does the opening story carry through? It comes back in the teaching and shows the core point working: "this doesn't require them to replace anything at all. But what it does do is it starts getting their data into the new system." A story dropped after the opening fails. If the source doesn't say what happened next, ask Yusuf and never invent it.
     - Does it answer the viewer's "that's no big deal"?
   - **Usable value:** can the viewer act on it today without us? Entertainment viewers don't turn into education viewers, so go all in on teaching.
     - Does each step come out of what was just said, so the viewer knows why they're doing it? A task dropped in after a story fails.
     - Does it say how to decide? "If it's just one or two systems, you can probably do it" beats "count the systems".
     - Does every step serve the core point? Yusuf skipped the counting rules, the sixty-day check, who fixes it and when to shut off the old CRM, and he kept one thing to do. A useful step that doesn't serve the core point fails.
     - Does it show what to look for, or make the viewer do sums? He skipped the lost-deals sum and asked instead: "did you not follow up, did you not do the best possible call, did salespeople need more coaching?" A sum said aloud fails.
     - With a lot to do, does it say what comes first? "The biggest opportunity for the least cost and least risk first" beats a list.
     - Where a step works around a rented CRM or separate tools, does the viewer also hear the other option right there, which is having that built into a CRM they own? Keep the step and give both, so they can choose: "you can do all of those integrations, or you can build it into the crm itself". Saving it all for one section at the end fails. Do this where it helps them decide, not as a slot to fill.
   - **Belief:** makes that CEO or sales manager believe that a custom-built CRM can lift their business to new heights. Not just saving some money, but actually making their business able to solve some bottleneck or do something valuable that has material impact.
     - Does the core point lead to owning one system? Our USP is one system that runs a company's entire process, from finding customers to delivering the work, fully adapted to them, with no integrations, and they own it. Owning has to be the video's thread, reached from its own topic. In the first third he tells the viewer directly, saying "you", that they could have this in a system built around them that they own. Another company's story or a hint doesn't count. Then that option comes back beside most of the steps, so they leave seeing the choice between patching a rented CRM and owning one. A video with numbered steps can pass, because the practical steps stay. A video that only turns to owning near the end fails, however useful it is. That failure caps Belief at 4, and no line edit can fix it.
     - Does it take away what stops them owning a CRM? Name what makes it feel too risky or too big, from this video's topic, and show how that goes away, like building it "step by step while you keep working in the old system".
     - Can the viewer picture it? Before the pitch, walk through their own work running in that one system, saying "you", using what this video taught, so they think "how good and efficient that would be". Another company's story isn't that picture, and a pitch that only lists what we do fails.
     - Right after his credentials, does he say what he does now? Credentials that stop at his old company fail, even if the pitch names his company later: "Now, I run a company that builds custom CRMs for you."
     - Does it answer the money doubt with how we work? "You'll pay for both for a while" left alone fails. He said: "we don't actually charge monthly, we simply charge for projects during this transition phase, so you don't actually have two recurring bills."
     - Can the viewer do this without buying? Say they can do it on their own, with us advising or by themselves, or have us do it: "I'm telling you this not to try to sell our services." A close that only sells fails.
     - Does it tell them to keep their CRM? He stopped at "just keep it. but no." Invite them instead: "if you think this is interesting and you want to start by just researching what this could mean for you".
     - Does his old company look good? A line that suggests its product failed, or that it missed something, fails.
     - Does the proof stand on its own? "That's one comment, and I can't check it." and "We never got to test that." both fail: "that sounds incredibly like AI" and "what's the point of writing that?"
     - Does the story show a business getting better? A story about why someone couldn't start builds no belief, so carry it on to what's being done about it.
     - Does an outside case show this video's point? He cut a stranger's cheaper contract: "No, forget that."
     - Does the reasoning lead the viewer to owning a CRM? A pile of cases doesn't do that.
   - **Shorten:** is the script as short as it can be while making the same points? "Remove unnecessary paragraphs that don't add value. Reformulate sentences and paragraphs that can be refactored so that they're shorter and easier to understand while getting across the same value / point." (Yusuf, 5 Nov 2026)
     - Does each section have its own job? Name each in a few words. No job: cut it. A job or point said twice: merge them.
     - Can this sentence or paragraph say the same thing in fewer, simpler words? If a clearly shorter version works as well, it fails. Give that version.
     - Is the shorter version still the same point? A cut that loses a fact, a step in the reasoning or a joining word lowers this score too.
     - Would he read this or skip it? He talks about twice as long as the script on what he keeps, so a script over about 1,000 spoken words is too long. Fewer points, said simply, leave him room to explain. Keep the steps a title promises, each in a few lines.
     - Does the pitch repeat what the video already said? If the teaching showed how we work, the pitch needs a line or two.
     - A line that gives the reason, answers the viewer's doubt, says what he really thinks, shows the option of owning or paints the picture of it is the point, so don't fail it for length. The option of owning can come back after each step, as long as each time it says something new for that step.
2. Add it up: Human + Easy to understand + Interest + Usable value + Belief + Shorten, out of 60. Stop once the core point passes, Human and Easy to understand are both at least 6 and two rounds in a row haven't raised Human, Easy to understand and Shorten together, or after six rounds. Each scorer finds different faults, so one flat round can be chance.
3. Rewrite it to raise Human, Easy to understand and Shorten, without losing any informational value or making it less exciting to listen to. Those three drive the rewrite (Yusuf, 5 Nov 2026), once the core point is right.
   - Fix the core point first. If the scorer's core point check fails, line edits can't help, so this round is a new script. Write the new argument, keep every step that still serves it, add the option of owning and the picture of it, and cut what no longer fits. This is the one round that may add words. Yusuf had to do this himself for videos 16 and 17 on 6 Nov 2026, after the process had polished their old core points to 46 and 47 of 60. Never change a core point Yusuf set himself.
   - Human and Easy to understand come first: start with the lines that failed those two. If a change helps any other score but makes a line sound less human or harder to follow, don't make it, even if it's shorter.
   - The other three are checks. Fix a clear failure, but don't chase the number, because scores move by chance and fixing every note is how video 11 got patched into nonsense.
   - Start from the video's argument, and make every paragraph serve it. Write it the way he talks when he fixes a line: his rewrites are in `original_sources/2026-11-05_video_11_notes_to_claude.md` in the private repo.
   - Never add a case, caveat or detail just to lift a score, and cut as many words as each fix adds. In video 11 each round added proof and removed joining words, so the score went up while the script got worse.
   - A reason, an answer to the viewer's doubt, an honest opinion, the option of owning or the picture of it isn't a detail. Add them where a section reads like a manual or stops at a tip, and cut elsewhere to pay for the words.
4. Repeat from step 1. When it stops, use the round with the highest Human + Easy to understand as the main script, then the highest total, then the later one. Before calling it done, read the finished script from start to finish yourself, as the viewer would. The score doesn't replace that. Fixes after that change the words, so score the finished version as the last round. That's the score the mark shows.

Have a fresh agent score each round, one that hasn't seen the earlier scores, so nobody grades their own rewrite. Save every round in the private repo at `videos/optimized/`, then record it: `python3 video-scripts/optimize.py tick 10 "7,6,6,7,5,6 8,8,7,8,7,7 8,8,7,8,6,7"`, with one human,easy,interest,value,belief,shorten group per round. Scores from before 5 Nov 2026 used the old five with Human doubled and show as "old score", so don't compare them with today's totals. Marks made before Shorten counted Value per word in its place.

# Notes Yusuf says on camera

From video 11 on, Yusuf may say "For Claude: ..." in a recording and then carry on. When you process a recording, find those notes, save his words in `original_sources/`, apply them to every unrecorded script they fit and rerun the Optimized process on those scripts. Put each note on the editor's cut list. Recorded scripts stay as they are.

# Read and approved by a human

David or Yusuf reads every script before Yusuf records it, so obviously bad lines get fixed before filming. It's the last column of [README.md](README.md). Run the Optimized process first and read last. When David or Yusuf says they've read and approved a script, mark it: `python3 video-scripts/optimize.py read 09 David`. Then commit and push.

Mark a script only when that person says so. Never mark one yourself. Any edit to the spoken lines clears this mark, so tell them it needs reading again.
