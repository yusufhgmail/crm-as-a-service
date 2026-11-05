#!/usr/bin/env python3
"""Track two things for each video's current spoken lines: has the humanize script prompt been run, and has a human read and approved them.

Run from anywhere:
  python3 video-scripts/humanize.py status          show every script
  python3 video-scripts/humanize.py tick NAME 6,7,8,8 [FILE]   record a finished loop and its scores (FILE: a draft's yusuf_lines.md)
  python3 video-scripts/humanize.py read NAME PERSON    record that PERSON read and approved the script (only when they say so)
  python3 video-scripts/humanize.py sync            untick edited scripts and update the README columns
  python3 video-scripts/humanize.py check           fail if any script hasn't had the humanize prompt
  python3 video-scripts/humanize.py nag [--hook]    print the loud warning, if there is anything to warn about

Both ticks hold a fingerprint of yusuf_lines.md, so any edit to the spoken lines clears both.
"""
import datetime
import hashlib
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DB = ROOT / "humanize_status.json"
README = ROOT / "README.md"
HEADER = "| # | Video | Recording copy | Humanized | Read by human |"
DIVIDER = "|---|---|---|---|---|"


def load():
    return json.loads(DB.read_text())


def save(db):
    DB.write_text(json.dumps(db, indent=2, ensure_ascii=False) + "\n")


def videos():
    return sorted(p.name for p in ROOT.iterdir() if p.is_dir() and re.match(r"\d\d_", p.name) and (p / "yusuf_lines.md").exists())


def spoken(name):
    return ROOT / name / "yusuf_lines.md"


def fingerprint(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()[:16]


def state(db, name):
    """Return 'ticked', 'exempt' or 'not ticked'."""
    if name in db["exempt"]:
        return "exempt"
    tick = db["ticked"].get(name)
    return "ticked" if tick and tick["sha"] == fingerprint(spoken(name)) else "not ticked"


def read_state(db, name):
    """Return 'read', 'exempt' or 'not read'."""
    if name in db["read_exempt"]:
        return "exempt"
    tick = db["read_by_human"].get(name)
    return "read" if tick and tick["sha"] == fingerprint(spoken(name)) else "not read"


def unticked(db):
    return [name for name in videos() if state(db, name) == "not ticked"]


def unread(db):
    return [name for name in videos() if read_state(db, name) == "not read"]


def sync():
    db = load()
    for ticks in (db["ticked"], db["read_by_human"]):
        for name in list(ticks):
            if name in videos() and ticks[name]["sha"] != fingerprint(spoken(name)):
                del ticks[name]
    save(db)
    lines = README.read_text().split("\n")
    for i, line in enumerate(lines):
        if line.startswith("| # | Video |"):
            lines[i] = HEADER
            lines[i + 1] = DIVIDER
        else:
            row = re.match(r"\| (\d+) \|", line)
            if not row:
                continue
            name = next((v for v in videos() if v.startswith(f"{int(row.group(1)):02d}_")), None)
            if not name:
                continue
            cells = line.strip().strip("|").split(" | ")
            mark = {"ticked": "✅", "exempt": "n/a", "not ticked": "❌"}[state(db, name)]
            reader = {"read": db["read_by_human"].get(name, {}).get("by"), "exempt": "n/a", "not read": "❌"}[read_state(db, name)]
            lines[i] = "| " + " | ".join([c.strip() for c in cells[:3]] + [mark, reader]) + " |"
    README.write_text("\n".join(lines))


def main():
    command = sys.argv[1] if len(sys.argv) > 1 else "status"
    db = load()
    if command == "status":
        for name in videos():
            current = state(db, name)
            scores = db["ticked"].get(name, {}).get("scores", "") if current == "ticked" else db["exempt"].get(name, "")
            print(f"{current:11} {read_state(db, name):9} {name}  {scores}")
    elif command == "tick":
        path = Path(sys.argv[4]) if len(sys.argv) > 4 else None
        name = path.parent.name if path else next(v for v in videos() if v.startswith(sys.argv[2]))
        scores = [float(s) for s in sys.argv[3].split(",")]
        if len(scores) < 2 or scores[-1] != scores[-2]:
            sys.exit("Not ticked: the loop only stops when the last two scores match.")
        db["ticked"][name] = {"sha": fingerprint(path or spoken(name)), "scores": scores, "date": datetime.date.today().isoformat()}
        save(db)
        sync()
        print("ticked", name)
    elif command == "read":
        name = next(v for v in videos() if v.startswith(sys.argv[2]))
        if state(db, name) == "not ticked":
            sys.exit("Not marked: run the humanize script prompt first, because it changes the words.")
        db["read_by_human"][name] = {"sha": fingerprint(spoken(name)), "by": sys.argv[3], "date": datetime.date.today().isoformat()}
        save(db)
        sync()
        print("read and approved:", name, "by", sys.argv[3])
    elif command == "sync":
        sync()
    elif command == "check":
        missing = unticked(db)
        if missing:
            print("Humanize script prompt not run on: " + ", ".join(missing))
            sys.exit(1)
        print("Every script has had the humanize prompt.")
    elif command == "nag":
        event = json.load(sys.stdin)["hook_event_name"] if "--hook" in sys.argv else None
        warnings, asks = [], []
        missing = unticked(db)
        if missing:
            warnings.append("STOP. THE HUMANIZE SCRIPT PROMPT HAS NOT BEEN RUN ON: " + ", ".join(missing) + ". These scripts are NOT ready to record.")
            asks.append(
                "Open your reply by telling the user this, forcefully and in plain words. "
                "Ask them to approve running the humanize script prompt now. The prompt is in video-scripts/CLAUDE.md."
            )
        waiting = unread(db)
        if waiting and event != "UserPromptSubmit":
            warnings.append("NOT READ AND APPROVED BY A HUMAN YET: video " + ", ".join(name[:2] for name in waiting) + ".")
            asks.append(
                "Tell the user David or Yusuf still has to read these before they're recorded. "
                "Mark a script only when that person says they've read and approved it: python3 video-scripts/humanize.py read 09 David."
            )
        if warnings:
            if event:
                print(json.dumps({"systemMessage": " ".join(warnings), "hookSpecificOutput": {"hookEventName": event, "additionalContext": " ".join(warnings + asks)}}))
            else:
                print(" ".join(warnings + asks))
    else:
        sys.exit(__doc__)


if __name__ == "__main__":
    main()
