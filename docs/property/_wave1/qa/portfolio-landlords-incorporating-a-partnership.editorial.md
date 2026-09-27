# Track B editorial and claims QA: portfolio-landlords-incorporating-a-partnership

File: `docs/property/_wave1/portfolio-landlords-incorporating-a-partnership.json`
Reviewed 2026-09-27, after Track A PASS (5 edits, all retained unchanged, including the para 17A
narrowing at `stats[1]` and `howWeHelp[3]`, and the six-dwellings qualification at `challenges[1]`
and `faqs[2]`). Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 13, S4a.
Sameness baseline: the other 14 `docs/property/_wave1/*.json`.

No figure, rate, date or rule was changed.

## Findings against the checklist

| # | Check | Result |
|---|---|---|
| 1 | Situation answered inside the first 150 words of `intro` | PASS. The whole intro is 113 words; the audience (10 to 40 properties, family partners, years of filed partnership returns, weighing a company) lands in sentence 1 and the exclusion in sentence 2. |
| 2 | 800 to 1,200 words across intro, challenges, howWeHelp, faqs | PASS at 1,200 after edits. Was 1,195 on arrival; edits 3 and 4 added, edits 1, 2, 5, 6 and 7 trimmed. |
| 3 | AI tells and sameness across the 14 siblings | Two hits, both fixed (edits 1 and 2). No sentence of this page now appears verbatim in any parseable sibling (checked mechanically, sentence set intersection). |
| 4 | Thin or padded sections, FAQ answers restating the question, answers under 40 or over 120 words | One hit, fixed (edit 3). No FAQ answer restates its question; all five open with the answer ("Not on its own", "There is no statutory period", "It depends on", "It can", "They do not move"). |
| 5 | Banned claims, case-insensitive | PASS. Zero hits for chartered, ICAEW, ACCA, CIOT, "our accountants", "we are accountants", "our team", award, regulated, advice, advise, turnaround. No personal names. No price or fee of ours. |
| 6 | No em-dashes, British English, 2026/27 leads | PASS. Zero em-dashes and zero en-dashes. British spelling throughout (modelled, diarised, licensing). The only live-rate passage leads 2026/27 and names the prior year second. |
| 7 | `metaTitle` <= 60, `metaDescription` <= 160 | PASS. 55 and 147. |
| 8 | At most five internal links, relative, on disk, written as anchors | PASS. Exactly five, all relative, all `<a href="...">text</a>`, no markdown links and no bare paths. All five verified on disk. |
| 9 | Pipeline leakage | PASS. No wave, map, agent, QA or prompt references in any rendered field. `sources` carries the map row reference, which is correct: the template does not render `sources`. |

### 3, in detail

- **"This page is for ..."** opened sentence 2 of the intro. Four siblings use the same construction
  (`couples-splitting-rental-income`, `holiday-let-and-serviced-accommodation`,
  `landlord-retirement-and-succession`, `property-spv-set-up`). Rewritten (edit 1).
- **"A specialist reviews ... first"** opened sentence 3. Eleven of the fourteen siblings open their
  orientation sentence with "A specialist reviews/starts with/looks at ... first". Rewritten (edit 2)
  so this page states the question rather than the reviewer.
- **The "You get A, B and C" triad**: this page does not use it. Its closing line is a three-part
  forward pointer, which shares the rhythm; edit 2 reshaped it into a plain contents line.
- **"from our partner network"**: one occurrence, in `howWeHelp[4]`, which is the consent-derived
  wording the programme wants on the page. Three siblings carry it once each. Left as is.
- **Listicle rhythm and repeated sentence templates**: challenge and howWeHelp bodies vary in length
  and opening; no template repeats within the page.

### 4, in detail

- `challenges[3]` ("Lenders, consents and the refinancing cost") was 37 words against 68 to 101 for
  its four neighbours, and read as a stub. Track A had removed its closing sentence because it
  duplicated `faqs[4]` almost verbatim, so it was not restored. One new sentence was written instead
  (edit 3), non-numeric, making a different point from `faqs[4]`: consent is per charge, not
  portfolio-wide. Section is now 55 words.
- No section is padded. Word counts after edits: challenges 81 / 101 / 82 / 55 / 68, howWeHelp
  48 / 52 / 52 / 50 / 46, FAQ answers 63 / 65 / 76 / 66 / 52. Every FAQ answer sits inside 40 to 120.

## Edit log

1. `intro`: "This page is for that situation, not for a landlord moving one or two personally held
   flats." to "That is a different problem from moving one or two personally held flats." Reason:
   stock phrase shared with four siblings; the exclusion is kept, the template is dropped.
2. `intro`: "A specialist reviews first whether a partnership genuinely exists in law and how long it
   has run, because both reliefs turn on the answer: ... Below is what a specialist looks at in each,
   what your lender has to support, and what the company then costs to run." to "Everything rests on
   a prior question: whether a partnership genuinely exists in law, and how long it has run. Both
   reliefs depend on the answer, ... Below, each of those in turn, then the lender problem and the
   cost of running the company." Reason: sibling-wide opening template, plus the triad rhythm at the
   close. Both reliefs and both statutory references are unchanged.
3. `challenges[3].body`: added "Consent is given charge by charge, not across the portfolio, so
   refinancing is worked out property by property." Reason: thin section (37 words). Non-numeric,
   no legal rule asserted, and distinct from `faqs[4]`.
4. `faqs[4].answer`: "arrangement fees and legal costs, and expect the lending timetable to drive the
   completion date." to "arrangement fees and legal costs, with the lending timetable driving the
   completion date." Reason: "expect ... and expect" repetition; also bought words for edit 3.
5. `howWeHelp[0].body`: "how decisions have actually been taken" to "how decisions have been taken".
   Reason: filler adverb.
6. `howWeHelp[1].body`: "gives you a first pass on the whole cost" to "gives a first pass on the whole
   cost". Reason: filler.

6 edits. No figure, rate, date, statutory reference, link or stat touched.

## Suspected errors noted, not changed

- None. Track A's five corrections were checked and are intact in the file as shipped.
- Housekeeping outside this page, for the manager: `docs/property/_wave1/non-resident-landlords.json`
  does not parse (JSON error at line 26), and a stray
  `landlord-retirement-and-succession.json.tmp.44220.135375d74d26` sits in the wave directory. Neither
  affects this page; the sameness check ran against the 13 parseable siblings plus a raw-text probe of
  the unparseable one, which found no shared sentence.

## Final measurements

- Body word count (intro + challenges + howWeHelp + faqs, tags stripped): **1,200** (band 800 to 1,200)
- `metaTitle`: 55 characters (limit 60)
- `metaDescription`: 147 characters (limit 160)
- Em-dashes: 0. Internal links: 5, all resolving on disk. JSON re-parsed clean after the final edit.

VERDICT: PASS
