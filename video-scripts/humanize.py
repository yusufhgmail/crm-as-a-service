#!/usr/bin/env python3
"""Track whether the humanize script prompt has been run on each video's current spoken lines.

Run from anywhere:
  python3 video-scripts/humanize.py status          show every script
  python3 video-scripts/humanize.py tick NAME 6,7,8,8   record a finished loop and its scores
  python3 video-scripts/humanize.py sync            untick edited scripts and update the README column
  python3 video-scripts/humanize.py check           fail if any script is still unticked
  python3 video-scripts/humanize.py nag             print the loud warning, if there is anything to warn about

A tick holds a fingerprint of yusuf_lines.md, so any edit to the spoken lines unticks it.
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
HEADER = "| # | Video | Recording copy | Humanized |"
DIVIDER = "|---|---|---|---|"


def load():
    return json.loads(DB.read_text())


def save(db):
    DB.write_text(json.dumps(db, indent=2, ensure_ascii=False) + "\n")


def videos():
    return sorted(p.name for p in ROOT.iterdir() if p.is_dir() and re.match(r"\d\d_", p.name) and (p / "yusuf_lines.md").exists())


def fingerprint(name):
    return hashlib.sha256((ROOT / name / "yusuf_lines.md").read_bytes()).hexdigest()[:16]


def state(db, name):
    """Return 'ticked', 'exempt' or 'not ticked'."""
    if name in db["exempt"]:
        return "exempt"
    tick = db["ticked"].get(name)
    return "ticked" if tick and tick["sha"] == fingerprint(name) else "not ticked"


def unticked(db):
    return [name for name in videos() if state(db, name) == "not ticked"]


def sync():
    db = load()
    for name in list(db["ticked"]):
        if name not in videos() or db["ticked"][name]["sha"] != fingerprint(name):
            del db["ticked"][name]
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
            lines[i] = "| " + " | ".join([c.strip() for c in cells[:3]] + [mark]) + " |"
    README.write_text("\n".join(lines))


def main():
    command = sys.argv[1] if len(sys.argv) > 1 else "status"
    db = load()
    if command == "status":
        for name in videos():
            current = state(db, name)
            scores = db["ticked"].get(name, {}).get("scores", "") if current == "ticked" else db["exempt"].get(name, "")
            print(f"{current:11} {name}  {scores}")
    elif command == "tick":
        name = next(v for v in videos() if v.startswith(sys.argv[2]))
        scores = [float(s) for s in sys.argv[3].split(",")]
        if len(scores) < 2 or scores[-1] != scores[-2]:
            sys.exit("Not ticked: the loop only stops when the last two scores match.")
        db["ticked"][name] = {"sha": fingerprint(name), "scores": scores, "date": datetime.date.today().isoformat()}
        save(db)
        sync()
        print("ticked", name)
    elif command == "sync":
        sync()
    elif command == "check":
        missing = unticked(db)
        if missing:
            print("Humanize script prompt not run on: " + ", ".join(missing))
            sys.exit(1)
        print("Every script has had the humanize prompt.")
    elif command == "nag":
        missing = unticked(db)
        if missing:
            print(
                "STOP. THE HUMANIZE SCRIPT PROMPT HAS NOT BEEN RUN ON: " + ", ".join(missing) + ". "
                "Open your reply by telling the user this, forcefully and in plain words. Say these scripts are NOT ready to record. "
                "Ask them to approve running the humanize script prompt now. The prompt is in video-scripts/CLAUDE.md."
            )
    else:
        sys.exit(__doc__)


if __name__ == "__main__":
    main()
