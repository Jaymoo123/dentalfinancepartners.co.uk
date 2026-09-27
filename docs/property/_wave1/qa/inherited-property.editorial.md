# Track B editorial and claims QA: `inherited-property` (Property, Wave 1)

QA date 2026-09-27. Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 13, S4a
("QA" and "Writers"). Track A passed the page on the same date with three edits
(`inherited-property.factual.md`, E1 to E3); all three survive this pass untouched.
No figure, rate, date or rule was changed here.

## Checks

| # | Check | Result |
|---|---|---|
| 1 | Situation answered inside the first 150 words of `intro` | PASS. The intro is 126 words in total and the situation ("You have inherited a property, or you are the executor holding one, and you need to decide whether to keep it, let it or sell it") lands in the first sentence, 30 words in. |
| 2 | 800 to 1,200 words across intro, challenges, howWeHelp, faqs | PASS. 1,198 counting section titles and FAQ questions, 1,081 counting bodies only. Was 1,203 / 1,086 on arrival, i.e. at or just over the ceiling on the stricter count. Net minus 5. Nothing was padded. |
| 3 | AI tells and sameness across the 14 siblings | PASS after three edits. See below. |
| 4 | Thin or padded sections, FAQ answers | PASS. No FAQ answer restates its question. Answers run 69, 80, 69, 78 and 83 words, all inside 40 to 120. Section bodies run 39 to 102 words; the shortest, howWeHelp 3, carries three distinct deliverables and is not thin. |
| 5 | Banned claims, case-insensitive | PASS. No hit for chartered, ICAEW, ACCA, CIOT, "our accountants", "we are accountants", "our team", award, regulated, advice, advise, advis-, a personal name, a price or a fee, or a turnaround promise. The page says "a specialist" and "your accountant", never a first-person practitioner claim, and never "we advise". |
| 6 | No em-dashes, British English, 2026/27 leads | PASS. Zero em-dashes. Spelling and idiom are British throughout. The only tax year named is 2026/27, in the stats. |
| 7 | `metaTitle` 48 characters, `metaDescription` 132 characters | PASS, against caps of 60 and 160. |
| 8 | Internal links | PASS. Five links, the maximum. All relative, all `<a href="...">` with link text, one syntax throughout the file. All five verified on disk by Track A and re-confirmed here. |
| 9 | Pipeline leakage | PASS. No house-positions reference, map row, anchor id, wave number, agent instruction or placeholder in any rendered field. `sources` carries that material, and S4a states the template does not render it. |

## Sameness across the wave

No sentence in this page is a verbatim duplicate of any sentence in the other fourteen
`docs/property/_wave1/*.json` pages. A six-word-window sweep across all fifteen files returned
only three kinds of overlap:

- **House voice.** "a specialist from the partner network", in seven siblings. Kept in substance,
  but the fuller template "a specialist from the partner network reviews", which this page shared
  verbatim with four siblings, is broken at E3.
- **Statute, which cannot be reworded away.** "tax is due, the return and the payment" and "the
  gain is fully covered by" with `selling-a-buy-to-let`, and "due within 60 days of completion"
  with `moving-property-into-a-limited-company`. These are the 60-day rule and the covered-gain
  carve-out. Rewriting them for variety would put a correct statement at risk. Left alone.
- **One incidental template**, "is the most common reason a", shared with
  `landlord-self-assessment-and-mtd`. Broken at E2.

Four wave-wide tells were checked by name:

- **"This page is for you" and its variants.** Not present. Five siblings use it. Nothing to fix.
- **The "You get A, B and C" triad closing the intro.** Present on arrival and used by nine of the
  fifteen pages. Broken at E1 by splitting the closer into two sentences and dropping the "You get"
  stem, at no cost in words.
- **Identical openings.** This page opens on the reader's own position in the second person, as the
  wave does, but shares no opening clause with a sibling. No fix needed.
- **Listicle rhythm.** The four challenges and four howWeHelp entries vary in shape and length,
  39 to 102 words, and none is a bare list. No fix needed.

## Edit log

Seven edits, all editorial. No figure, rate, date, statutory reference or rule changed. The file
re-parses as JSON.

- **E1. `intro`, AI tell, the wave's triad closer.** "You get a written position on the fork in
  front of you, the deadlines fixed by law rather than by you, and the figures your accountant
  prepares the returns from." becomes "That leaves a written position on the fork in front of you,
  and the figures your accountant prepares the returns from. The deadlines in it are law's, not
  yours." Two sentences instead of a three-item list, and the "You get" stem removed. Same length.
- **E2. `challenges[3]`, repeated sentence template.** "Disagreement is the most common reason a
  probate sale collapses late." becomes "Disagreement is what most often collapses a probate sale
  late on." Breaks the overlap with `landlord-self-assessment-and-mtd`. Same length, same meaning.
  See N1 on this sentence.
- **E3. `howWeHelp[0]`, repeated sentence template.** "A specialist from the partner network
  reviews the date of death valuation," becomes "A specialist in the partner network re-reads the
  date of death valuation,". Breaks the template shared verbatim with four siblings while keeping
  the partner-network framing. Same length.
- **E4. `howWeHelp[0]`, garbled clause.** "they check whether substituting the sale price beats the
  base cost it costs you" becomes "they check whether substituting the sale price is worth the base
  cost it costs you". "beats the base cost it costs you" does not parse. The trade it describes, an
  IHTA 1984 s.191 claim bought at the price of a lower TCGA 1992 s.274 base cost, is unchanged.
  Plus one word.
- **E5. `intro`, trim.** "and who has to register for self assessment" becomes "and who registers
  for self assessment". Minus two words, no change of meaning.
- **E6. `challenges[0]`, run-on split.** "is what a specialist reviews first, and the <a ...>"
  becomes "is what a specialist reviews first; the <a ...>". Minus one word.
- **E7. `howWeHelp[1]`, trim.** "You can sanity check the disposal side with the <a ...>" becomes
  "Sanity check the disposal side with the <a ...>". Minus two words.

E5 to E7 exist to fund E4 and to hold the page under the 1,200 ceiling on the stricter count.
Nothing was added to a section to make it longer.

## Notes, not defects

- **N1.** `challenges[3]` asserts that disagreement between personal representatives is the most
  common reason a probate sale collapses late. That is a frequency claim with no entry in `sources`
  and no house position behind it. E2 changed only its wording, not its force. If the integrator
  wants the page free of unsourced assertions, the safe version is "Disagreement between them
  collapses probate sales late on", which drops the frequency claim. Flagged rather than changed,
  because removing it is the writer's call.
- **N2.** `howWeHelp` is now the only place the partner network is named. If the shared
  `EntityBlock` (S4a, T2) does not render above the FAQ on this route, the page loses its only
  statement of who acts. Integrator check, not a page defect.
- **N3.** Link syntax across the wave is inconsistent between files: this page and most siblings use
  `<a href="...">`, while `landlord-self-assessment-and-mtd` and `non-resident-landlords` use bare
  parentheses and markdown. S4a asks for consistency, and this file is internally consistent, so it
  passes. The wave-level mismatch belongs to the integrator.

Final word count: **1,198** including section titles and FAQ questions, 1,081 bodies only.
`metaTitle` 48 characters. `metaDescription` 132 characters. JSON re-validated, parses clean.

VERDICT: PASS
