# Track B editorial QA: charity-annual-return-related-party-transactions

Date: 2026-09-27. Verdict: **PASS** (after 6 in-place edits). Body 1,142 -> 1,113 words.

Read for comparison: the four sibling posts in `docs/charities/_wave1/posts/`
(`charity-income-from-charitable-activities-vs-donations`,
`charity-vat-reduced-rate-fuel-and-power-certificate`,
`cic-donations-accounting-and-gift-aid`, `registering-a-charity-late`) and the two
newest live posts, `charities/web/content/blog/who-can-do-an-independent-examination.md`
and `charity-trading-subsidiary-gift-aid.md`.

## Checks

| Check | Result |
|---|---|
| Verbatim or near-verbatim sentences shared with a sibling or live post | None. Token-overlap sweep at a 0.45 Jaccard floor over every sentence of 8+ words returned no cross-file match |
| AI tells | None found |
| Em-dashes and en-dashes | None |
| Markdown in the body | None. Body is HTML throughout |
| H2s answer-first | 4 of 5 passed. "Who is a related party?" opened on a process instruction, fixed |
| Intro answers with numbers | Yes, the 20% test is in the first paragraph |
| Thin or padded sections | Three padding sentences removed, see edits |
| Pipeline leakage | None |
| Banned claims (pricing, named people, chartered, ICAEW, our accountants, we advise, advice) | None. The two adviser references, "a specialist reviews the register of interests" and "your accountant prepares the same analysis", describe work rather than give advice or name anyone |
| Word count | 1,113, inside 800 to 1,200 |
| metaTitle | 54 |
| metaDescription | 153 |
| Internal links | 5, at the cap, all unchanged from Track A |
| YAML | Re-parsed clean after editing |

## Edits (6)

1. Intro, second paragraph: removed "This article sets out who is on the list, what each question actually wants, and how to assemble the answers before you open the form." Article-preamble padding that restates the H2s.
2. "Who is a related party?", first sentence: was "Start with the trustees themselves, then work outwards." Now leads with the answer, that the trustees are related parties themselves and so is anyone closely connected to them or to the charity, then keeps the work-outwards instruction.
3. Same section, third bullet: "a substantial interest or influence over" was ungrammatical, now "a substantial interest or influence".
4. Removed the filler lead-in "Substantial interest has a number attached to it." The sentence that follows carries the 20% definition on its own.
5. "How do you build the list before you file?": "The point of doing it in that order is that the questions ask for values..." tightened to "The order matters because the questions ask for values...".
6. Grant makers sentence tightened: "expect this one to be the question that takes the longest" to "expect this one to take the longest".

No figure, rate, date, section or rule was changed.

## Notes for the manager

- Track A's three instances of the £100,000 gate (body, FAQ 4, takeaway 3) were all kept, as Track A asked. It reads as reinforcement rather than repetition because each states it in a different frame.
- The FAQs restate the body closely by design in this wave: FAQ 1 tracks the intro, FAQ 3 tracks the connected-organisation paragraph. Not treated as a defect, but if the house line is that FAQs must add something the body does not, FAQs 1 and 3 are the two to rewrite and that is a manager call, not a Track B fix.
- `title` and `h1` are identical at 59 characters. Both under 60 and the brief sets no distinctness rule, so left alone. Track A flagged the same thing.
- Internal links are at the cap of five, so any later cross-link into this post from a sibling cannot be reciprocated without dropping one.
