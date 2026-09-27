# Track B editorial and claims QA: hmo-and-multi-let-landlords

Reviewed 2026-09-27 against `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 13, S4a ("QA" and "Writers"). Siblings compared: the other 14 files in `docs/property/_wave1/`. Track A review: `qa/hmo-and-multi-let-landlords.factual.md` (PASS, 1 sources edit).

## Findings

| # | Check | Result |
|---|---|---|
| 1 | Situation answered inside first 150 words of `intro` | PASS. Intro is 135 words, so the whole of it sits inside the window. Sentences 1 and 2 name the situation (HMO, student let, small mixed-use building) and why it differs from a single buy to let. |
| 2 | 800 to 1,200 words across intro, challenges, howWeHelp, faqs | Was 1,202 (bodies plus FAQ questions). Now 1,194. PASS after edit 2. |
| 3 | AI tells and sameness across siblings | Two duplications found and fixed, see edits 2 and 3. No "This page is for you" (four siblings use it, this page does not). No listicle rhythm: challenge bodies are prose, not bullet runs. Headings are noun phrases and questions, varied. |
| 4 | Thin or padded sections, FAQ answers restating the question, 40 to 120 word answers | FAQ answers 62, 69, 73, 67, 62 words, all inside the band, none restates its question (each opens with the answer: "No.", "Yes.", "You do, as the owner.", "It depends on...", "It changes several things at once."). Challenge bodies 98 to 116, none padded. `howWeHelp` bodies 35 to 41 words are the shortest in the wave (siblings run 38 to 65). Noted, not fixed: the page is 6 words under the ceiling, so lengthening them would breach the band. They are dense, not padded. |
| 5 | Banned claims, case-insensitive | PASS. No hit for chartered, ICAEW, ACCA, CIOT, "our accountants", "we are accountants", "our team", award, regulated, advice, advise. No personal names, no prices or fees, no turnaround promise. The page says "a specialist reviews" and "your accountant prepares" throughout, never "we advise". |
| 6 | No em-dashes, British English, 2026/27 leads | PASS. No em-dash or en-dash. British spelling throughout. Current year leads: "20% for 2026/27 and rising to the new 22% property basic rate from 2027/28". |
| 7 | Meta lengths | PASS. `metaTitle` 48 of 60. `metaDescription` 159 of 160. |
| 8 | Internal links | 4 links, under the 5 cap, all relative, all confirmed on disk by Track A. All four were markdown, now anchors, see edit 4. |
| 9 | Pipeline leakage | PASS. No agent, wave, prompt, model or coverage-map wording in any rendered field. The coverage-map row appears only in `sources`, which the template does not render. |

No figure, rate, date or rule was changed. No suspected factual error found; Track A's verdict stands.

## Sameness detail

- "A specialist reviews four things first" is verbatim the construction in `property-spv-set-up.json` ("reviews four things first"), and the near-identical "looks at four things first" / "starts with three things" opens six more siblings. Fixed on this page.
- "a specialist from the partner network" appears in six siblings (holiday-let, landlord-self-assessment-and-mtd, moving-property-into-a-limited-company, non-resident-landlords, property-spv-set-up, selling-a-buy-to-let). It was the closing clause of this intro too. Fixed on this page.
- The "You get A, B and C" triad closes eight siblings. This intro closed with a two-part "You get..." variant; rewritten so the page does not add a ninth.

## Edit log

1. `stats[2].label`: "An HMO is a single council tax dwelling..." to "An HMO in England is a single council tax dwelling...". Label now carries the jurisdiction the body and FAQ 3 both carry. Label edit only, figure and date untouched.
2. `intro`, sentence 3 opener: "A specialist reviews four things first: which" to "Four questions come first: which". Removes the verbatim sibling construction and 2 words.
3. `intro`, closing sentence: "You get those four points written up against your own figures, and a specialist from the partner network to prepare the returns." to "Those four are written up against your own figures, and a specialist firm prepares the returns." Removes the repeated "from the partner network" and the "You get" closer, and 6 words. Net of edits 2 and 3: 8 words, taking the page from 1,202 to 1,194.
4. Four markdown links converted to anchors, in `challenges[1]`, `challenges[3]` (two) and `challenges[4]`: `[portfolio profitability calculator](/calculators/portfolio-profitability-calculator)`, `[capital allowances calculator](/calculators/capital-allowances-calculator)`, `[the s.35 common parts guide](/blog/property-types-and-specialist-tax/hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property)` and `[rental income tax calculator](/calculators/rental-income-tax-calculator)` now written as `<a href="...">text</a>`. Link text and targets unchanged. Three siblings (`non-resident-landlords`, `property-spv-set-up`, `rental-income-disclosure`) still carry markdown links and need the same conversion from their own Track B.

Total edits: 4 (one label, two prose, one markup conversion across 4 links).

## Final measures

- Words across intro, challenges, howWeHelp and faqs, markup stripped, FAQ questions included: **1,194** (section titles excluded; 1,259 if titles are counted).
- `metaTitle`: 48 characters.
- `metaDescription`: 159 characters.
- JSON re-parsed clean after the edits.

VERDICT: PASS
