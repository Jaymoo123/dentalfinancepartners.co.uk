# Track B editorial and claims QA: `landlord-retirement-and-succession` (Property, Wave 1)

QA date 2026-09-27. Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 13, S4a
("QA" and "Writers"). Track A passed the page the same day with one edit
(`landlord-retirement-and-succession.factual.md`, the RNRB "gone by £2.35m" wording); that edit
survives this pass untouched. No figure, rate, date, statutory reference or rule was changed here.

## Checks

| # | Check | Result |
|---|---|---|
| 1 | Situation answered inside the first 150 words of `intro` | PASS. Sentence 1 (20 words) names the person and the moment: decades of portfolio built, now deciding what happens to it. Sentence 2 gives the answer that organises the page: sell down, gift, or restructure are three different tax problems and the order changes the bill. The whole intro is 136 words, so all of it sits inside the 150. |
| 2 | 800 to 1,200 words across intro, challenges, howWeHelp, faqs | PASS. 1,192 counting section titles and FAQ questions, 1,060 bodies only. Was 1,198 / 1,066 on arrival, i.e. six words under the ceiling on the inclusive count. Net minus 6. Nothing was padded to make a section longer. |
| 3 | AI tells and sameness across the 14 siblings | PASS after four edits. Detail below. |
| 4 | Thin or padded sections | PASS with one note (N1). Challenge bodies 36 to 71 words, howWeHelp 47 to 61, each carrying distinct substance: the multi-year disposal spread, the PET and its CGT trap, FIC growth shares, the CLT entry and ten-year charges, incorporation against the death uplift, income versus capital. No section restates another. |
| 5 | FAQ answers: not restating the question, 40 to 120 words | PASS. Five answers, 59 to 79 words. Each answers first ("It depends which tax you are trying to reduce", "Almost certainly not", "No, not without losing the benefit of the gift", "The nil-rate band is £325,000 per person"). None restates its question. |
| 6 | Banned claims, case-insensitive | PASS. No hit for chartered, ICAEW, ACCA, CIOT, "our accountants", "we are accountants", "our team", award, regulated, advice, advise, advis-, a personal name, or a turnaround promise. The only "price" match is "the incorporation cost calculator prices the route", which describes a calculator, not a fee for our work. The page says "a specialist" and "your accountant" throughout, never a first-person practitioner claim. |
| 7 | No em-dashes, British English, 2026/27 leads | PASS. Zero em-dashes and zero en-dashes. British spelling and idiom throughout ("crystallises", "modelled"). The only tax year named is 2026/27, in `stats`; every other date is statutory (5 April 2031, 6 April 2026, 6 April 2027, April 2025, s.102 FA 1986). |
| 8 | Meta lengths | PASS. `metaTitle` 44 characters (cap 60). `metaDescription` 154 characters (cap 160). |
| 9 | Internal links | PASS. Four links, under the maximum of five. All relative, all written as `<a href="...">text</a>`, no markdown link and no bare path anywhere in the file. All four verified on disk by Track A: three calculators (`capital-gains-tax-calculator`, `incorporation-cost-calculator`, `bpr-apr-allowance-calculator`, each in `Property/web/src/lib/calculators/` and imported in `registry.ts`) and one blog post (`iht-7-year-clock-property-gifting-mid-life-landlord-strategy`, category and canonical both matching the linked path). |
| 10 | Pipeline leakage | PASS. No house-positions anchor, map row, wave number, agent instruction, TODO or placeholder in any rendered field. That material appears only in `sources`, which S4a states the template does not render. |

## Sameness across the wave

This page arrived carrying four of the wave's known tells at once, three of them in the intro,
and two of them tells that sibling reviewers had already broken against this page:

- **"This page is for ..."**, shared with `landlord-self-assessment-and-mtd`. Removed (E1).
- **"A specialist reviews ..." as a sentence template.** Fourteen of the fifteen pages use it
  somewhere; this page used it in the intro and again, in its fuller form "A specialist from the
  partner network reviews", in `howWeHelp[0]`. Sibling reviewers on `gifting-property-to-family`
  and `inherited-property` both broke that fuller template. Both instances here are now broken
  (E1, E4), leaving one partner-network mention on the page, which matches the sibling calls.
- **"What you get is ..." closing the intro on an A, B and C triad.** The wave-wide closer, broken
  on `inherited-property` and `gifting-property-to-family`. Split into two sentences with the
  stem dropped (E2).
- **"a written picture of where the estate stands".** The `gifting-property-to-family` review
  rewrote its own line specifically because it duplicated this clause on this page, and this page
  kept it. Now rewritten (E2), so the duplicate is gone from both sides.
- **"written down"** in `howWeHelp[0].title` appears in five of the fifteen files. Rewritten (E3).

Checked and clean: no "This page is for you", no listicle rhythm (challenge and howWeHelp bodies
run 36 to 71 words and none is a bare list), no two consecutive sections opening on the same stem
after E4, and no verbatim sentence shared with any sibling. Statutory phrasing that overlaps with
siblings (the 60-day return, the £3,000 annual exempt amount, the taper wording) was left alone:
rewording it for variety would put correct statements at risk.

## Edit log

Four edits, all editorial. No figure, rate, date or rule touched. JSON re-parses clean.

- **E1. `intro`, two stock phrases in one sentence pair.** "This page is for landlords who want the
  routes set out in numbers before anything is signed. A specialist reviews the shape of the estate
  first:" becomes "The routes need setting out in numbers before anything is signed. The shape of
  the estate comes first:". Kills the "This page is for" opener and the intro's "A specialist
  reviews" template. Minus 8 words.
- **E2. `intro`, the triad closer and the clause a sibling already de-duplicated against.** "What
  you get is a written picture of where the estate stands, the tax on each route, and the documents
  your accountant prepares for your solicitor." becomes "That leaves a clear view of where the
  estate stands and the tax on each route. The documents your accountant prepares for your
  solicitor follow from it." Two sentences instead of a three-item list, "You get" stem gone,
  "a written picture" gone. Plus 1 word.
- **E3. `howWeHelp[0].title`, phrase shared with four siblings.** "An estate and portfolio position,
  written down" becomes "An estate and portfolio position on paper". Minus 1 word.
- **E4. `howWeHelp[0].body`, the partner-network sentence template.** "A specialist from the partner
  network reviews ownership of every property," becomes "A specialist in the partner network works
  through ownership of every property,". Breaks the template shared verbatim with four siblings
  while keeping the partner-network framing, which is the page's only statement of who acts. Plus
  2 words.

## Notes, not defects

- **N1.** `challenges[5]` ("Keeping income in retirement versus passing on capital") is 36 words
  against 61 to 71 for the other five challenges. It is short rather than thin: it states the
  conflict and what a workable plan names, and duplicates nothing the other five cover. It was not
  expanded because the page sits six words under the 1,200 ceiling and expansion would be padding
  to hit a shape, not to add substance. If the integrator wants the six challenges even, the honest
  fix is to trim one of the longer bodies rather than inflate this one.
- **N2.** `howWeHelp[0]` is now the only place the partner network is named. If the shared
  `EntityBlock` (S4a, T2) does not render on the `/for/[slug]` route, the page carries a single
  statement of who acts. Integrator check, not a page defect.
- **N3.** No suspected factual errors for the manager. Track A's RNRB correction is the only figure
  change on this page and it is already applied.

Final word count: **1,192** including section titles and FAQ questions, 1,060 bodies only.
`metaTitle` 44 characters. `metaDescription` 154 characters.
Internal links: 4, all relative `<a href>` anchors, all existing on disk.
JSON re-validated after all four edits, parses clean.

VERDICT: PASS
