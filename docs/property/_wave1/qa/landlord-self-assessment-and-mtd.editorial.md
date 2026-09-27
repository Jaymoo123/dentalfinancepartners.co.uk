# Editorial and claims QA (Track B) - landlord-self-assessment-and-mtd

Reviewed 2026-09-27 against `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` §13 S4a
("Row shape", "QA", "Writers"). Track A (`.factual.md`) PASSED with 3 edits; all three are
intact here, including the §19.7(a) first-year 30-day concession clause in `challenges[3]`.

## Findings

| # | Check | Result |
|---|---|---|
| 1 | Situation answered in first 150 words of `intro` | PASS. Answered in sentence 1; intro is 139 words. |
| 2 | 800-1,200 words across intro, challenges, howWeHelp, faqs | WAS 1,332, now 1,200 (1,138 excluding section headings). Fixed, see edit log. |
| 3 | AI tells and sameness across the 14 siblings | No sibling shares a challenge, howWeHelp or FAQ heading. Shared house idioms only ("This page is for", "A specialist from our partner network"), which is the voice sample, not sameness. One unsourced superlative removed (edit 7). |
| 4 | Thin or padded sections, FAQ answers restating the question, 40-120 word answers | Five duplications between challenges and FAQs trimmed. All FAQ answers now 51-67 words, all in band; none restates its question. No section thin (shortest is howWeHelp 3 at 47 words). |
| 5 | Banned claims (case-insensitive) | PASS. No chartered / ICAEW / ACCA / CIOT / "our accountants" / "we are accountants" / "our team" / award / regulated / personal names / prices / "advice" / "advise" / turnaround promise. "fees" appears only as expense categories ("agent commission and management fees"), not pricing. |
| 6 | No em-dashes, British English, 2026/27 leads | PASS. No em-dash. British spellings (categorised, recognised). The page leads on 6 April 2026 and bounds the penalty percentages to 2026/27. |
| 7 | Meta lengths | `metaTitle` 45 / 60, `metaDescription` 157 / 160. PASS. |
| 8 | Internal links: max five, relative, exist, consistent syntax | Three links, all relative, all exist on disk: `/calculators/mtd-checker` (`Property/web/src/app/calculators/mtd-checker/page.tsx`), `/calculators/rental-income-tax-calculator` (`src/lib/calculators/registry.ts`, served by `calculators/[slug]`), and the blog URL (canonical in `Property/web/content/blog/mtd-itsa-joint-property-owners-quarterly-filing-mechanics-each-spouse.md`). Syntax was inconsistent, fixed (edit 8). |
| 9 | Pipeline leakage | PASS. No wave, brief, prompt, house-positions or QA references in rendered fields; `sources` is not rendered by the template. |

### Note - the "5 filings" stat

Track A note A flagged that house positions is ambiguous on whether the end-of-period statement
and the final declaration are one annual obligation or two. The number is unchanged, as
instructed. The stat label and the FAQ 1 sentence that leaned on the count were reworded to a
form that is true on either reading: the label now reads "Four quarterly updates plus the
year-end steps each tax year", and FAQ 1 says "you file every quarter instead of once a year"
rather than "five times a year". No figure, rate, date or rule was changed anywhere on the page.

### Suspected errors passed on, not edited

None. No figure, rate, date or statutory rule looked wrong on an editorial read.

## Edit log

Twenty-one edits, all editorial. Every figure, rate, date and rule that appeared before the pass
still appears after it.

1. `stats[2].label` - reworded to "Four quarterly updates plus the year-end steps each tax year"
   (the ambiguity above). Number untouched.
2. `challenges[0].body` - dropped the £52,000 / £40,000 / £12,000 worked example, which FAQ 2
   carries in full with the same figures. Replaced with "so high rents with high costs still
   bring you in."
3. `challenges[1].body` - dropped "and that is where reliefs, adjustments and other income come
   in", restated in howWeHelp 4.
4. `challenges[3].body` - "if you are filing for the first time" to "if it is your first return".
5. `challenges[4].body` - dropped the £100,000 / 50/50 worked example, carried in full by FAQ 3.
6. `faqs[0].answer` - "You are filing five times a year instead of once" to "so you file every
   quarter instead of once a year" (the count ambiguity).
7. `faqs[1].answer` - removed the unsourced superlative "the largest population HMRC's outreach
   targets"; kept "the most common reason a landlord is surprised to be in scope".
8. `faqs[2].answer` - blog link was a bare path mid-sentence while the other two links used
   "name (path)". Converted to "the joint-owner filing guide (/blog/...)" for one syntax.
9. `faqs[4].answer` - dropped the 3% / 3% / 10% late-payment schedule, stated verbatim in
   `challenges[3]` with its 2026/27 bound and the first-year concession.
10. `intro` - "because the threshold is tested on that and not on profit" to "which is what the
    threshold is tested on, not profit".
11. `challenges[2].body` - removed the "Two entries catch landlords out." signpost and reworded
    "For the same reason a profit-based estimate misleads, so..." to a direct sentence.
12. `challenges[3].body` - the non-MTD deadline list rewritten as dates first, same four dates.
13. `howWeHelp[1].body` - "against HMRC's recognised list for what you actually need, including
    foreign property fields" to "against HMRC's recognised list, including foreign property
    fields".
14. `faqs[0].answer` - "The four quarterly updates" to "The quarterly updates".
15. `faqs[2].answer` - dropped the Form 17 75/25 sentence, stated in `challenges[4]`.
16. `challenges[0].body` - merged the two opening sentences, which said the same thing twice.
17. `howWeHelp[0].body` - "your current gross rents across every property" to "your gross rents".
18. `howWeHelp[1].body` - "prepares the bookkeeping side: categories that match" to "sets up the
    bookkeeping: categories matching".
19. `howWeHelp[3].body` - "are completed from the same records" to "come from the same records".
20. `challenges[3].body` - penalty-points sentence shortened; the £200-at-four-points figure is
    retained here, in stat 4 and in FAQ 5, and FAQ 5 keeps the reset test.
21. `challenges[0].body` - "whether the letter arrives or not" to "either way".

Also folded into the passes above: `challenges[1]` "nothing falls due" to "no tax falls due",
`challenges[2]` "not an expense at all ... the separate basic-rate reducer" to "not an expense
... the basic-rate reducer", `challenges[4]` managed-portfolio clause tightened.

## Final numbers

- Body words (intro + challenges + howWeHelp + faqs, including section headings): **1,200**
  (1,138 excluding headings). Band 800-1,200. In band.
- `intro`: 139 words, situation answered in sentence 1.
- `metaTitle`: 45 characters (limit 60).
- `metaDescription`: 157 characters (limit 160).
- FAQ answers: 61, 65, 64, 67, 51 words. All within 40-120.
- Internal links: 3 (limit 5), all relative, all verified on disk.
- JSON re-validated after the final edit: parses.

VERDICT: PASS
