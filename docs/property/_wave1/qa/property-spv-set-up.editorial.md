# Track B editorial and claims QA: property-spv-set-up

Reviewed 2026-09-27 against `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` §13 S4a ("Writers", "QA"),
with the sameness check run over the other 14 `docs/property/_wave1/*.json`. Track A
(`property-spv-set-up.factual.md`) PASSED with 3 edits; all 3 are intact, including the
CIHC letting carve-out in `challenges[3].body`. No figure, rate, date or rule was touched.

## Checks

| # | Check | Result |
|---|---|---|
| 1 | Situation answered inside the first 150 words of `intro` | PASS. Answered in sentence 1; whole intro is 129 words. |
| 2 | 800 to 1,200 words across intro, challenges, howWeHelp, faqs | PASS. 1,196 (was 1,200, the ceiling). |
| 3 | AI tells and sameness across the 14 siblings | 4 defects found, all fixed (edits 1 to 4). |
| 4 | Thin or padded sections, FAQ answers restating the question, 40 to 120 words | PASS. FAQ answers 85, 77, 70, 65, 66. No answer restates its question. No section thin or padded. |
| 5 | Banned claims, case-insensitive | PASS. No chartered, ICAEW, ACCA, CIOT, "our accountants", "we are accountants", "our team", award, regulated, personal name, price or fee, "advice"/"advise", turnaround promise. One "guarantees" hit is "personal guarantees", a lender requirement described of third parties, not a promise by the firm. Kept. |
| 6 | No em-dashes, British English, 2026/27 leads | PASS. 0 em-dashes and 0 en-dashes. No US spellings. The only tax year named is 2026/27. |
| 7 | `metaTitle` <= 60, `metaDescription` <= 160 | PASS. 42 and 160. |
| 8 | Internal links: <= 5, relative, exist on disk, written as anchors | 5 links, all relative, all verified on disk by Track A. All 5 were markdown; converted to anchors (edit 5). |
| 9 | Pipeline leakage | PASS. No wave, map, agent, house-positions or prompt references in rendered fields. `sources` is not rendered by the template. |

## Sameness findings (the sibling evidence)

- **"This page is for"** opened or sat in `couples-splitting-rental-income`, `holiday-let-and-serviced-accommodation`,
  `landlord-retirement-and-succession`, `portfolio-landlords-incorporating-a-partnership` and this page. This page was the
  only one to open on it, and in the third person ("an investor who"), against the direct address the other 14 use.
- **"reviews / looks at / starts with N things first"** ran in `first-time-and-accidental-landlords` (four),
  `gifting-property-to-family` (three), `landlord-self-assessment-and-mtd` (three), `holiday-let-and-serviced-accommodation`
  (three) and this page (four). A template, not a sentence.
- **"from our partner network" / "from the partner network"** ran in `holiday-let-and-serviced-accommodation`,
  `landlord-self-assessment-and-mtd`, `moving-property-into-a-limited-company`, `selling-a-buy-to-let` and this page.
- **"You get A, B, C and D" closing the intro** ran in `gifting-property-to-family`, `moving-property-into-a-limited-company`,
  `rental-income-disclosure`, `selling-a-buy-to-let` and this page.
- **"Your accountant prepares"** opened two of this page's four `howWeHelp` bodies, and also opens a sentence in
  `rental-income-disclosure`. Repeated template inside one page.
- "Four questions come first" was rejected as an intro replacement because `hmo-and-multi-let-landlords` already uses it verbatim.

## Edit log

1. `intro`, sentence 1. "This page is for an investor who has decided to buy the next property through a company and now has
   to get the company right before completion" to "You have decided the next property goes into a company, and now the company
   itself has to be right before completion". Reason: stock opener shared with four siblings, and third person where the wave
   uses direct address. Same situation, stated the same way the reader would.
2. `intro`, sentence 3. "A specialist from the partner network reviews four things first:" to "Four decisions sit ahead of
   formation:". Reason: retires both the "reviews N things first" template and the repeated "from the partner network".
   Content of the four unchanged; "the SIC code the company is registered under" became "which SIC code the company registers
   under" to carry the new stem.
3. `intro`, closing sentence. "You get a structure review before formation, a formation record a lender and HMRC can follow, a
   2026/27 extraction model, and a first-year filing calendar." to "A specialist works through those, then leaves you with a
   formation record a lender and HMRC can follow, an extraction model for 2026/27, and a dated first-year filing calendar."
   Reason: retires the "You get A, B, C and D" triad closing four siblings, and puts the specialist back in the intro that
   edit 2 removed them from. "Structure review before formation" was dropped as a list item because the four decisions above it
   now are the structure review. Deliverables otherwise unchanged.
4. `howWeHelp[3].body`, opening clause. "Your accountant prepares a dated list of every first-year obligation and sets up
   bookkeeping so" to "The first-year calendar is dated obligation by obligation, and bookkeeping is set up so". Reason: second
   "Your accountant prepares" opener in the same four-item section.
5. All 5 internal links, in `challenges[0]`, `challenges[1]`, `challenges[3]`, `howWeHelp[3]`. Markdown `[text](/path)`
   converted to `<a href="/path">text</a>`. Reason: spec item 8; the template renders body as HTML, so markdown would have
   shipped as literal brackets. Targets and anchor text unchanged.

No figure, rate, date, statute reference or rule changed. No Track A edit reversed. No suspected factual errors found.

## Final measures

- Words across intro, challenges, howWeHelp and faqs: **1,196** (band 800 to 1,200), tags excluded.
- Intro: 129 words, situation answered in the first sentence.
- `metaTitle` 42 characters. `metaDescription` 160 characters.
- Internal links: 5, all relative anchors, all verified on disk.
- JSON re-parsed clean after the edits.

VERDICT: PASS
