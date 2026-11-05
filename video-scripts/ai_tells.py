#!/usr/bin/env python3
"""Count the AI tells a tool can find in a script's spoken lines. See SOUNDS_HUMAN.md for the full list.

  python3 video-scripts/ai_tells.py <script.md or yusuf_lines.md> [--quiet]

It finds patterns, not proof: read the script aloud for the rest.
"""
import re
import statistics
import sys
from pathlib import Path

TELLS = {
    "false suspense": r"\bhere's the (part|thing|catch|kicker|twist|trick|problem|bad news|good news|real|honest|big|bigger|hard|funny)\b|\bnow here's\b|\bbut here's\b|\bthat's where\b|\bthe part (that|nobody|people)\b|\bhere's what (nobody|most|people)\b",
    "telling how to feel": r"\bstings?\b|\bgets interesting\b|\bscary part\b|\bwild\b|\bthe surprising\b|\bcrazy part\b",
    "not X, it's Y": r"\b(isn't|aren't|wasn't|not) (just |only |really |actually |about |the )[^.?!]*[,.] (it's|it is|that's|they're|but|the)\b|\bthe real (cost|question|problem|issue|price|reason|point|win)\b|\brather than\b|\bnot just\b|\bnot only\b",
    "answered own question": r"\b(so |but |and )?(why|what|how|who)\b[^.?!]{0,60}\? (because|it's|that's|the answer|well|here's|simple)",
    "announcing": r"\bthere are (two|three|four|five|six|seven) (\w+ )?(parts|steps|things|reasons|points|checks|costs|questions)\b|\blet's (break|look|go through|talk about|get into|dive)\b|\bhere's (what|how|why) (that|this|it)\b|\bin this video\b|\bthat's what\b",
    "saying it again": r"\bso that's\b|\bthose are the\b|\bso basically\b|\bin other words\b|\bto recap\b",
    "polished confession": r"\bi'll admit\b|\bto be upfront\b|\bhonestly\b|\bto be honest\b|\bthe honest\b",
    "big stakes": r"\btransform\w*|\bgame[- ]chang\w+|\bfundamentally\b|\bcompletely new\b|\brevolution\w*|\bnew heights\b",
    "stock words": r"\bdelve|\bleverage\b|\brobust\b|\bseamless\w*|\bunlock\w*|\blandscape\b|\bcrucial\b|\bpivotal\b|\bworth noting\b|\bat the end of the day\b|\bthe reality is\b|\bgoing forward\b",
    "fake analogy": r"\bthink of it\b|\bit's like (a|an)\b",
}
TRIAD = r"\b[\w'-]+(?: [\w'-]+){0,3}, [\w'-]+(?: [\w'-]+){0,3},? (?:and|or) [\w'-]+"
OPENERS = ("So", "And", "But", "Now", "Here's", "That's")


def spoken(path):
    text = Path(path).read_text()
    if path.endswith("script.md"):
        text = text.split("**Description")[0]
        lines = [l[2:] for l in text.split("\n") if l.startswith("> ")]
    else:
        lines = [l for l in text.split("\n") if l and not l.startswith(("#", "*"))]
    return lines


def main():
    path = sys.argv[1]
    lines = spoken(path)
    text = " ".join(lines)
    sentences = [s.strip() for s in re.split(r'(?<=[.?!])["”]?\s+', text) if s.strip()]
    words = len(text.split())
    total = 0
    for name, pattern in TELLS.items():
        found = [m.group(0) for m in re.finditer(pattern, text, re.I)]
        total += len(found)
        if found:
            print(f"{name}: {len(found)}")
            if "--quiet" not in sys.argv:
                for s in sentences:
                    if re.search(pattern, s, re.I):
                        print(f"    {s[:110]}")
    triads = [s for s in sentences if re.search(TRIAD, s)]
    print(f"threes: {len(triads)}")
    lengths = [len(s.split()) for s in sentences]
    short_ends = sum(1 for line in lines for s in [re.split(r'(?<=[.?!])\s+', line)[-1]] if len(s.split()) <= 7)
    openers = sum(1 for s in sentences if s.split()[0].strip(",") in OPENERS)
    runs = sum(1 for a, b, c in zip(sentences, sentences[1:], sentences[2:]) if a.split()[0] == b.split()[0] == c.split()[0])
    print(f"sentences {len(sentences)}, words {words}, length mean {statistics.mean(lengths):.1f}, spread {statistics.pstdev(lengths):.1f} (people run higher)")
    print(f"opener share {100 * openers / len(sentences):.0f}% ({', '.join(OPENERS)}), three in a row {runs}, paragraphs ending on a short line {short_ends} of {len(lines)}")
    print(f"tells {total + len(triads)}, per 1,000 words {1000 * (total + len(triads)) / words:.1f}")


if __name__ == "__main__":
    main()
