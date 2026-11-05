# Video scripts

Read [SCRIPT_RULES.md](SCRIPT_RULES.md) before writing or changing a script. When Yusuf corrects a script, follow the three checks at the top of that file and add the lesson there. Keep `yusuf_lines.md` and `script.md` saying the same thing.

This repo is public. The study, the Hormozi notes, the script template and the draft videos are in David's private repo, cloned at `~/code/crm-from-within`. Read them before writing a script, and never copy private material here. SCRIPT_RULES.md wins where they disagree.

The teleprompter reads `yusuf_lines.md` from GitHub `main`, so edits reach it only after a push and a tap on "Update scripts from GitHub".

Yusuf's own words are saved in the private repo at `~/code/crm-from-within/original_sources/`. Read them before writing a script, and save every new Q&A with him there word for word.

David: before writing or changing a script, pull the private repo `crm-from-within` and read its `CLAUDE.md`. Yusuf left notes for you there.

# Humanize script prompt

Every script must have had this prompt before it's recorded. [humanize.py](humanize.py) tracks it in `humanize_status.json` and in the last column of [README.md](README.md). A tick holds a fingerprint of `yusuf_lines.md`, so any edit to the spoken lines unticks the script.

When a video arrives unticked, or anyone adds one, tell Yusuf or David forcefully that the prompt hasn't been run and those scripts aren't ready to record, and ask them to approve running it. Hooks in `.claude/settings.json` remind you on every message, and a GitHub check fails on any push with an unticked script.

After a run, record it with its scores: `python3 video-scripts/humanize.py tick 08 6,7,8,8`.

The prompt, in Yusuf's words:

1. Score it based on how a real human actually speaks, 1-10. Note the specific places where it sounds contrived, scripted, or like AI wrote it. If this is pass 2 or more, if the score didn't change from the previous time you scored it, stop. Otherwise continue to step 2.
2. Rewrite it accordingly, trying to maximize that score, but without losing any informational value or making it less exciting / dopamine-inducing to listen to.
3. Repeat from step 1 until you reach the stop condition.

# Read and approved by a human

A human reads every script before Yusuf records it. It's the last column of [README.md](README.md). When David or Yusuf says they've read and approved a script, mark it: `python3 video-scripts/humanize.py read 09 David`. Then commit and push.

Mark a script only when that person says so. Never mark one yourself. Any edit to the spoken lines clears the mark, so tell them it needs reading again.
