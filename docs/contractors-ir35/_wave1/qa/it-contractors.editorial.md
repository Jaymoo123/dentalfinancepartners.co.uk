# Editorial and claims QA (Track B): contractors-ir35 `/for/it-contractors`

File: `docs/contractors-ir35/_wave1/it-contractors.json`
Reviewed: 2026-09-27. Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` §13 S4a ("QA", "Writers").
Track A: PASS with 5 edits (four href corrections to the nested `/blog/<category>/<slug>` form, one added R&D source), `it-contractors.factual.md`. All five kept.
Sameness baseline: the four sibling `_wave1` JSON files and the live rows in `contractors-ir35/web/src/data/contractor-types.ts` (this page rewrites the first of those rows).

## Checks

| # | Check | Result |
|---|---|---|
| 1 | Situation answered inside the first 150 words of `intro` | PASS. Intro is 121 words after edits, so the whole of it sits inside the window. The reader's situation (day rate through a PSC, status flipping engagement to engagement, an agency in the chain, overseas clients, side income) lands in the first 60 words. |
| 2 | Word band 800 to 1,200, titles and questions included | PASS. Was 1,194 on my count (Track A read 1,198 on a slightly different tag-strip), now **1,187**. |
| 3 | AI tells and sameness | Three found and fixed. (a) The intro closed on "A specialist reads the contract and the working practices together" — the same stock closer the sibling `inside-ir35` review removed, and near-identical to the `ir35-contract-review` intro's "A specialist reads the contract, the upper-level agreement...". (b) "This page is for that situation:" collided with `first-contract-outside-ir35`'s "That is the situation this page is written for". Both replaced. (c) "Your accountant prepares the annual accounts..." opened howWeHelp 2 — the exact clause struck from the sibling page — and "A specialist reviews" opened howWeHelp 4, giving two "A specialist" openers in four sections. No "You get A, B and C" closer. No listicle rhythm in the bodies: challenge openers are all distinct ("Status is settled", "Under Chapter 10", "For a genuinely inside engagement", "Hardware, developer tooling", "Contracting directly", "Dividend rates"). Section and FAQ phrasing does not collide with any sibling page or any other live `contractor-types.ts` row. The headline drops the live rows' "Specialist accountants for" prefix, which reads as deliberate differentiation, not a defect. |
| 4 | Thin or padded sections; FAQ answers restating the question; answers 40 to 120 words | PASS. Challenge bodies 69 to 92 words, howWeHelp bodies 37 to 44, all substantive. FAQ answers 58 to 66 words, inside the band. No answer restates its question: each opens on the verdict ("No.", "It is possible, but", "Not automatically", "For services to a business customer", "Run through the same company"). Accepted overlap, not a defect: challenge 3 and FAQ 3 both cover umbrella versus keeping the company open. The challenge frames the arithmetic of the assignment rate, the FAQ answers the close-or-keep decision, and separating them further would mean inventing claims. Noted for the cross-page sweep. |
| 5 | Banned claims, case-insensitive | PASS. No "chartered", ICAEW, ACCA, CIOT, "our accountants", "we are accountants", "our team", "award", "regulated", personal names, or turnaround promise. No "advice" or "advise". "Accountancy fees" appears once as a deductible company cost with no amount attached, which is not a price for our work. The only currency figures are the £60,000 pension annual allowance and the £90,000 VAT threshold, both statutory. |
| 6 | No em-dashes, British English, 2026/27 leads | PASS. No em-dash or en-dash. British forms throughout ("licences", "optimisation" not used, no US spellings found). Every rate leads on its current footing: dividends 10.75/35.75/39.35% for 2026/27, employer NIC 15%, pension allowance 2026/27, VAT threshold frozen since 1 April 2024. |
| 7 | Meta lengths | PASS. `metaTitle` 49 characters (limit 60), `metaDescription` 151 (limit 160). |
| 8 | Internal links: at most five, relative, exist on disk, `<a href="...">text</a>` | PASS. Exactly five, all relative, all in the anchor form, no stray `<a` tags. Verified on disk: `contractors-ir35/web/content/blog/deemed-employment-payment-explained.md` (category "IR35 Status"), `contractor-vat-registration-guide.md` ("MTD and Compliance"), `contractor-pension-employer-contributions.md` ("Pension and Dividends"), `limited-company-vs-umbrella-contractor.md` ("Umbrella vs Limited Company"), and `src/lib/calculators/tools/umbrella-vs-limited-calculator.ts` for `/calculators/umbrella-vs-limited-calculator`. Each category front matter matches the path segment Track A corrected it to. |
| 9 | Pipeline leakage | PASS. No placeholders, TODOs, wave or agent references in any rendered field. `sources` is the spec-required non-rendered trailer. |

## Edit log

Four edits, all editorial. No figure, rate, date or rule touched. Track A's five edits left in place.

| # | Where | Before | After | Why |
|---|---|---|---|---|
| 1 | `intro`, middle | "This page is for that situation: who decides your status, what the deemed payment does to your take-home when an engagement is caught, ... which software and equipment costs the company can deduct, how VAT behaves ..." | "So the questions worth answering are practical ones: who decides your status, what a caught engagement does to your take-home, ... how VAT behaves ..." | Sibling-page collision on "this page is ... that situation", and the seven-item colon list was reading as a listicle. Dropped the deductible-costs item, which challenge 4 covers in full. Net -10 words across edits 1 and 2. |
| 2 | `intro`, final sentence | "A specialist reads the contract and the working practices together, because the two rarely describe the same job." | "Contract wording and the way a job actually runs rarely describe the same work, and status turns on the second." | Stock "A specialist reads/reviews" closer, already struck from two sibling pages. Same point, no formula. |
| 3 | `howWeHelp` 2 | "Your accountant prepares the annual accounts, CT600, Companies House filings and self assessment return, with ..." | "The annual accounts, CT600, Companies House filings and self assessment return are prepared together, with ..." | The exact clause removed from `inside-ir35` as an AI tell. |
| 4 | `howWeHelp` 4 | "A specialist reviews whether registration is required or worth taking voluntarily, whether ..." | "The registration question is worked through: whether it is required or worth taking voluntarily, whether ..." | Second "A specialist" opener in four sections. |

## Suspected errors passed to the manager

None. Nothing in the copy looked factually wrong on an editorial read, and Track A cleared every figure and rule.

## Final numbers

- Word count across intro, challenges, howWeHelp and faqs, titles and questions included: **1,187** (band 800 to 1,200).
- `intro`: 121 words, situation answered within the first 150.
- `metaTitle`: 49 characters. `metaDescription`: 151 characters.
- Internal links: 5, all resolving on disk.
- JSON re-parsed clean after the edits.

VERDICT: PASS
