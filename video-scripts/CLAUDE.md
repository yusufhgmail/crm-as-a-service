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

1. Score the script 1-10 on all five criteria:
   - **Human, counts double:** it sounds like a human talking from the heart, with no scripted teleprompter. Note every place where it sounds contrived, scripted, or like AI wrote it. [SOUNDS_HUMAN.md](SOUNDS_HUMAN.md) is the test for that, and `ai_tells.py` counts the patterns a tool can find.
   - **Interest:** captures and holds our buyer's interest: a sales manager or a CEO of a 10-50 person company paying real money for its CRM.
   - **Usable value:** can the viewer act on it today without us? Entertainment viewers don't turn into education viewers, so go all in on teaching.
   - **Belief:** makes that CEO or sales manager believe that a custom-built CRM can lift their business to new heights. Not just saving some money, but actually making their business able to solve some bottleneck or do something valuable that has material impact.
   - **Value per word:** maximize the value created, divided by the number of words used. For each line, ask if it can be said in fewer words, and what the viewer would lose if it went. Value is anything that teaches, proves a point or holds the viewer's attention, so a story or a hook can earn its words.
2. Add it up: 2 x Human + Interest + Usable value + Belief + Value per word, out of 60. If this is round 2 or later and the total didn't go up, stop.
3. Rewrite it to raise the total, without losing any informational value or making it less exciting to listen to.
4. Repeat from step 1. When it stops, use the highest-scoring version as the main script.

Have a fresh agent score each round, one that hasn't seen the earlier scores, so nobody grades their own rewrite. Save every round in the private repo at `videos/optimized/`, then record it: `python3 video-scripts/optimize.py tick 10 "7,6,7,5,6 8,7,8,7,7 8,7,8,6,7"`, with one human,interest,value,belief,value-per-word group per round.

# Read and approved by a human

A human reads every script before Yusuf records it. It's the last column of [README.md](README.md). When David or Yusuf says they've read and approved a script, mark it: `python3 video-scripts/optimize.py read 09 David`. Then commit and push.

Mark a script only when that person says so. Never mark one yourself. Any edit to the spoken lines clears the mark, so tell them it needs reading again.
