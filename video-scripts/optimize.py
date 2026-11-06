#!/usr/bin/env python3
"""Track two things for each video's current spoken lines: has the Optimized process been run, and has a human read and approved them.

Run from anywhere:
  python3 video-scripts/optimize.py status          show every script
  python3 video-scripts/optimize.py tick NAME "7,6,6,7,5,6 8,8,7,8,7,7 8,8,7,8,6,7" [FILE] [--approved]
                                                    record the finished rounds: one human,easy,interest,value,belief,shorten group per round (FILE: a draft's yusuf_lines.md)
  python3 video-scripts/optimize.py read NAME PERSON    record that PERSON read and approved the script (only when they say so)
  python3 video-scripts/optimize.py sync            clear marks on edited scripts and update the README columns
  python3 video-scripts/optimize.py check           fail if any script has had neither the Optimized process nor the old human check
  python3 video-scripts/optimize.py nag [--hook]    print the loud warning, if there is anything to warn about

The total is human + easy to understand + interest + value + belief + shorten, out of 60. The round to keep has the highest human + easy to understand, then the highest total, then comes latest. Marks from before 5 Nov 2026 used five scores with human doubled and show as "old score" until the script is rescored. Marks from before the shorten score had value per word in its place. Every mark holds a fingerprint of yusuf_lines.md, so any edit to the spoken lines clears it.
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
    if len(scores) == 5:  # before the easy-to-understand score, when human counted double
        human, interest, value, belief, per_word = scores
        return 2 * human + interest + value + belief + per_word
    return sum(scores)  # value per word sat in the last place before the shorten score


def kept(rounds):
    """Return the round to keep: highest Human + Easy to understand, then highest total, then latest."""
    return max(enumerate(rounds), key=lambda r: (r[1][0] + r[1][1], total(r[1]), r[0]))[1]


def optimized_mark(entry):
    if len(entry["rounds"][0]) == 5:
        return f"old score {entry['best']:g}/60"
    return f"✅ {entry['best']:g}/60"


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
            mark = {"optimized": optimized_mark(db["optimized"].get(name, {"rounds": [[0] * 6], "best": 0})), "old check": "old check", "exempt": "n/a", "not run": "❌"}[current]
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
        path = Path(sys.argv[4]) if len(sys.argv) > 4 and sys.argv[4] != "--approved" else None
        name = path.parent.name if path else next(v for v in videos() if v.startswith(sys.argv[2]))
        rounds = [[float(s) for s in group.split(",")] for group in sys.argv[3].split()]
        if any(len(r) != 6 for r in rounds):
            sys.exit("Not marked: every round needs six scores: human,easy,interest,value,belief,shorten.")
        totals = [total(r) for r in rounds]
        focus = [r[0] + r[1] + r[5] for r in rounds]  # Human, Easy to understand and Shorten drive the rewrite
        flat = len(focus) >= 3 and focus[-1] <= focus[-3] and focus[-2] <= focus[-3]
        good = min(kept(rounds)[:2]) >= 6  # video 13, which Yusuf approved, scored 6 on both
        if not (flat and good) and len(rounds) < 6 and "--approved" not in sys.argv:
            sys.exit("Not marked: the rounds only stop once Human and Easy are both at least 6 and two rounds in a row haven't raised Human, Easy and Shorten, after six rounds, or when Yusuf approves the script (--approved).")
        db["optimized"][name] = {"sha": fingerprint(path or spoken(name)), "rounds": rounds, "totals": totals, "best": total(kept(rounds)), "date": datetime.date.today().isoformat()}
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
