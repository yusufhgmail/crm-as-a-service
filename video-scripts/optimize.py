#!/usr/bin/env python3
"""Track two things for each video's current spoken lines: has the Optimized process been run, and has a human read and approved them.

Run from anywhere:
  python3 video-scripts/optimize.py status          show every script
  python3 video-scripts/optimize.py tick NAME "7,6,7,5 8,7,8,7 8,7,8,6" [FILE]
                                                    record the finished rounds: one human,interest,value,belief group per round (FILE: a draft's yusuf_lines.md)
  python3 video-scripts/optimize.py read NAME PERSON    record that PERSON read and approved the script (only when they say so)
  python3 video-scripts/optimize.py sync            clear marks on edited scripts and update the README columns
  python3 video-scripts/optimize.py check           fail if any script has had neither the Optimized process nor the old human check
  python3 video-scripts/optimize.py nag [--hook]    print the loud warning, if there is anything to warn about

The total is 2 x human + interest + value + belief, out of 50. Every mark holds a fingerprint of yusuf_lines.md, so any edit to the spoken lines clears it.
"""
import datetime
import hashlib
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DB = ROOT / "optimize_status.json"
README = ROOT / "README.md"
HEADER = "| # | Video | Recording copy | Optimized | Read by human |"
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
    """Return 'optimized', 'old check', 'exempt' or 'not run'."""
    if name in db["exempt"]:
        return "exempt"
    sha = fingerprint(spoken(name))
    if db["optimized"].get(name, {}).get("sha") == sha:
        return "optimized"
    return "old check" if db["humanized"].get(name, {}).get("sha") == sha else "not run"


def total(scores):
    human, interest, value, belief = scores
    return 2 * human + interest + value + belief


def read_state(db, name):
    """Return 'read', 'exempt' or 'not read'."""
    if name in db["read_exempt"]:
        return "exempt"
    tick = db["read_by_human"].get(name)
    return "read" if tick and tick["sha"] == fingerprint(spoken(name)) else "not read"


def missing(db):
    return [name for name in videos() if state(db, name) == "not run"]


def unread(db):
    return [name for name in videos() if read_state(db, name) == "not read"]


def sync():
    db = load()
    for ticks in (db["optimized"], db["humanized"], db["read_by_human"]):
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
            current = state(db, name)
            mark = {"optimized": f"✅ {db['optimized'].get(name, {}).get('best')}/50", "old check": "old check", "exempt": "n/a", "not run": "❌"}[current]
            reader = {"read": db["read_by_human"].get(name, {}).get("by"), "exempt": "n/a", "not read": "❌"}[read_state(db, name)]
            lines[i] = "| " + " | ".join([c.strip() for c in cells[:3]] + [mark, reader]) + " |"
    README.write_text("\n".join(lines))


def main():
    command = sys.argv[1] if len(sys.argv) > 1 else "status"
    db = load()
    if command == "status":
        for name in videos():
            current = state(db, name)
            scores = db["optimized"][name]["best"] if current == "optimized" else db["exempt"].get(name, "")
            print(f"{current:10} {read_state(db, name):9} {name}  {scores}")
    elif command == "tick":
        path = Path(sys.argv[4]) if len(sys.argv) > 4 else None
        name = path.parent.name if path else next(v for v in videos() if v.startswith(sys.argv[2]))
        rounds = [[float(s) for s in group.split(",")] for group in sys.argv[3].split()]
        totals = [total(r) for r in rounds]
        if len(totals) < 2 or totals[-1] > totals[-2]:
            sys.exit("Not marked: the rounds only stop when the total doesn't go up.")
        db["optimized"][name] = {"sha": fingerprint(path or spoken(name)), "rounds": rounds, "totals": totals, "best": max(totals), "date": datetime.date.today().isoformat()}
        save(db)
        sync()
        print("optimized", name, totals)
    elif command == "read":
        name = next(v for v in videos() if v.startswith(sys.argv[2]))
        if state(db, name) == "not run":
            sys.exit("Not marked: run the Optimized process first, because it changes the words.")
        db["read_by_human"][name] = {"sha": fingerprint(spoken(name)), "by": sys.argv[3], "date": datetime.date.today().isoformat()}
        save(db)
        sync()
        print("read and approved:", name, "by", sys.argv[3])
    elif command == "sync":
        sync()
    elif command == "check":
        waiting = missing(db)
        if waiting:
            print("Optimized process not run on: " + ", ".join(waiting))
            sys.exit(1)
        print("Every script has been through the Optimized process or the old human check.")
    elif command == "nag":
        event = json.load(sys.stdin)["hook_event_name"] if "--hook" in sys.argv else None
        warnings, asks = [], []
        edited = missing(db)
        if edited:
            warnings.append("STOP. THE OPTIMIZED PROCESS HAS NOT BEEN RUN ON: " + ", ".join(edited) + ". These scripts are NOT ready to record.")
            asks.append(
                "Open your reply by telling the user this, forcefully and in plain words. "
                "Ask them to approve running the Optimized process now. It is in video-scripts/CLAUDE.md."
            )
        waiting = unread(db)
        if waiting and event != "UserPromptSubmit":
            warnings.append("NOT READ AND APPROVED BY A HUMAN YET: video " + ", ".join(name[:2] for name in waiting) + ".")
            asks.append(
                "Tell the user David or Yusuf still has to read these before they're recorded. "
                "Mark a script only when that person says they've read and approved it: python3 video-scripts/optimize.py read 09 David."
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
