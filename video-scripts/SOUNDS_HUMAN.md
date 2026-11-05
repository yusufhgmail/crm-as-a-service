Title: What makes a script sound like AI

[All video scripts](README.md) · [Script rules](SCRIPT_RULES.md)

The Human score in the [Optimized process](CLAUDE.md) uses this list. Yusuf asked for it on 5 Nov 2026 after reading "And here's the part that stings." in video 10 and calling it a typical AI comment.

The standard is a human talking from the heart, with no scripted teleprompter. A script with none of the tells below can still sound prepared, so ask if he'd say this to a friend because he cares about it.

One of these proves nothing, and real people do most of them now and then. A pile of them is what gives a script away. Yusuf's own lines don't count against a script. Run `python3 video-scripts/ai_tells.py <script.md>` to count the patterns a tool can find, then read the script aloud for the rest.

**Why it happens:** AI picks the most likely next word. So it drifts to claims that fit any company, it keeps one comfortable rhythm, and every paragraph comes out equally polished. People are uneven: they say one odd specific thing, then one clumsy thing, then stop.

# The tells

**1. False suspense.** A line that promises a reveal, then delivers an ordinary fact. Say the fact.

- Not like this: "And here's the part that stings. HubSpot's own site calls its platform all-in-one."
- But like this: "HubSpot calls itself all-in-one on its own site. Its Professional plan comes with call recording and follow-up sequences. So if you're also paying for Gong and Outreach, you've paid for those two things twice."

**2. Telling the viewer how to feel.** "That stings", "this is where it gets interesting", "that's the scary part". Give the fact and let them react. Yusuf's own reactions on camera are fine, because they're real.

**3. "Not X, it's Y."** It knocks down something nobody said, in forms like "isn't X, it's Y", "rather than" and "the real X is Y".

- Not like this: "The bigger cost isn't on the invoices at all. It's the time."
- But like this: "You also pay in time. Somebody has to keep ten tools connected."

**4. A question nobody asked, answered straight away.** "So why do teams still do it?" Just give the reason. Questions the viewer can answer about their own company are fine.

**5. Punchlines.** A short, quotable line closing a paragraph. People mostly stop when they're done.

- Not like this: "So instead of a box of Lego, you get the ship."
- But like this: end on the last real thing the system does.

**6. Threes.** Three items again and again, because three sounds complete. Use the number the facts have. Two is fine.

**7. Even rhythm.** Sentences of the same length, paragraphs of the same shape. Let a long one run, and let a short one be short because the point is small.

**8. The same opener.** "Now" and "Here's" at the start of sentence after sentence. "So", "And", "But" and "because" are different: they're how people reason aloud, so never remove them to lower a count.

**9. Announcing instead of saying.** "There are four parts", "Let's break this down", "Here's what that looks like". Start with the thing itself.

**10. Saying it again.** "So that's what one bill looks like", and recaps of what the viewer heard a minute ago.

**11. Claims that fit any company.** If the sentence would be true in any video about any software, it needs a case, a number or a name, or it goes.

**12. Polished confessions.** "I'll admit something", "to be upfront", "honestly". An admission only sounds real if it cost something. Say what went wrong.

**13. Big stakes for small things.** "Transform", "game-changing", "fundamentally", "completely new".

**14. Stock AI words.** Delve, leverage, robust, seamless, unlock, landscape, crucial, pivotal, "it's worth noting", "at the end of the day", "the reality is".

**15. Fake analogies.** "Think of it as...". Keep an analogy only if Yusuf really uses it, like the Lego box from his old sales deck.

**16. Swapping words to avoid repeating one.** People say "the CRM" five times. AI says "the CRM", "the platform", "the system", "the tool".

**17. Clever phrasing.** A neat turn of phrase nobody would say aloud. "Year two is nobody's job." Yusuf said "year two can be a disaster".

**18. Undercutting the proof.** "That's one comment, and I can't check it." It sounds honest on paper and like AI out loud. Cut the source, or say who said it and move on.

**19. Facts with no thread.** Sentences that are each fine but don't lead to each other. People explain: this, so that, because of this other thing.

# What people do instead

- They say what they think: "I think", "in my experience". Studies of AI text keep finding fewer of these marks of opinion. Doubt only belongs where it's real and changes what the viewer should do.
- They reason aloud, with each sentence leading to the next.
- They give one odd, specific detail that couldn't appear in anyone else's video.
- They're uneven. A long sentence, then a short one, and one line that isn't perfect.
- They stop when the point is made.

# Sources

- [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing): the most complete list, including why AI drifts to the generic.
- [tropes.fyi](https://tropes.fyi/directory): named patterns, including false suspense ("Here's the kicker"), question-and-answer and quotable one-liners.
- [Signs of AI writing, Jet Wong](https://jetwong.neocities.org/ai/signs-of-ai-writing): even rhythm, even quality, generic claims, missing specifics.
- [Patterns that give away AI writing, Lilach Bullock](https://www.lilachbullock.com/patterns-that-give-away-ai-writing/): false contrast, threes, restating summaries.
- [Mo & Crosthwaite, as summarised in these slides](https://sites.edgehill.ac.uk/crg/files/2026/03/EHU-CRG.20.Crosthwaite.Slides.pdf): people use more stance and engagement than AI. Slides only, so check the paper before quoting a number.
