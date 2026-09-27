# Track A factual QA - selling-a-buy-to-let

Page: `docs/property/_wave1/selling-a-buy-to-let.json`
Tie-breaker: `docs/property/house_positions.md` (HP), primary law where HP is silent.
Date: 2026-09-27. Reviewer: QA Track A (Opus).

## Assertions

| # | Where | Assertion | Source | Verdict |
|---|---|---|---|---|
| 1 | intro, challenge 1, stat 1 | Where CGT is due, return and payment owed within 60 days of completion | HP §5 (60-day reporting); FA 2019 Sch 2 para 3(1)(b); 60-day figure FA 2022 s.23(2) | CORRECT |
| 2 | intro, challenge 1, FAQ 2 | Exchange date fixes the tax year; completion starts the 60-day clock | HP §5.B (TCGA 1992 s.28(1), the two-date trap) | CORRECT |
| 3 | intro, challenge 3, FAQ 4 | Only-or-main-home history moves the figure most (PRR) | HP §5 (PRR s.222-226 TCGA 1992) | CORRECT |
| 4 | stat 2, challenge 4 | Residential CGT 18% basic rate, 24% above | HP §5 (18%/24% from 30 Oct 2024) | CORRECT |
| 5 | stat 3, challenge 4 | Annual exempt amount £3,000 per person, 2026/27 | HP §5 | CORRECT |
| 6 | challenge 4 | AEA down from £6,000 and from £12,300 before that | HP §5 | CORRECT |
| 7 | challenge 4 | AEA is per person and per tax year | TCGA 1992 s.1K (individual annual exempt amount) | CORRECT |
| 8 | stat 4, challenge 3, FAQ 4 | PRR covers final 9 months of ownership | HP §5 (final 9 months always qualify) | CORRECT |
| 9 | challenge 3, FAQ 4 | Further deemed occupation in defined situations e.g. working away | HP §5 (job-related, working away) | CORRECT |
| 10 | challenge 1, FAQ 1 | No 60-day return for UK residents where gain fully covered by relief, losses or AEA | HP §5 (explicit; do-not-write list backs it) | CORRECT |
| 11 | challenge 1, FAQ 1 | Non-residents file for every UK land disposal regardless of tax due | HP §5 | CORRECT |
| 12 | challenge 2, FAQ 3 | Deductible selling costs are a closed/exhaustive statutory list | HP §5.B (s.38(1)(c) + s.38(2), exhaustive per CG15250) | CORRECT |
| 13 | challenge 2, FAQ 3 | List = professional fees (surveyor, valuer, auctioneer, accountant, agent, legal adviser), transfer costs incl. stamp duty, advertising for a buyer, valuation costs for the computation | HP §5.B (s.38(2)(b) is the buyer-side advertising limb) | CORRECT |
| 14 | challenge 2 | Improvement spending still reflected in the property at sale deductible separately | HP §5.B (TCGA 1992 s.38(1)(b) enhancement expenditure) | CORRECT |
| 15 | challenge 2, FAQ 3 | Removals, storage, cleaning, cosmetic work, mortgage interest and ERCs not deductible | HP §5.B (s.38(3), and the express not-incidental list) | CORRECT |
| 16 | FAQ 3 | Where VAT cannot be recovered, deduct the fee inclusive of VAT | HP §5.B (CG14300, verified twice) | CORRECT |
| 17 | FAQ 3 | Letting-agent management fees go against rental income, never against the gain | HP §5.B (ITTOIA 2005 s.272 applying s.34) | CORRECT |
| 18 | challenge 3, FAQ 4 | Lettings relief since 6 April 2020 only where owner shared occupation with the tenant | HP §5 (Letting Relief restricted 6 Apr 2020) | CORRECT |
| 19 | challenge 4 | Trustees and personal representatives pay 24% throughout | HP §5 (explicit). Note HP §39 carries a verify-at-write-time caution on the PR rate commencement; the page states the rate as current for 2026/27, which is on the safe side of that caution | CORRECT |
| 20 | challenge 5, FAQ 5 | s.162 incorporation relief must be claimed for transfers on or after 6 April 2026; the disapplication election is repealed | HP §5 (new TCGA 1992 s.162(1)(b); FA 2026 s.39 repealed s.162A) | CORRECT |
| 21 | FAQ 5 | Incorporation relief needs a genuine business rather than a single let | HP §5 (business-activity evidence, Ramsay v HMRC [2013]) | CORRECT |
| 22 | challenge 5 | Company-held property: no annual exempt amount, company pays corporation tax on the gain | Primary law: TCGA 1992 s.1A(3) and s.1K, CTA 2009 s.2. HP silent | CORRECT (source gap closed, see edit 1) |
| 23 | FAQ 5 | Transfer to your own company is a disposal at market value, with stamp duty on the company's acquisition | Primary law: TCGA 1992 s.17(1)/s.18 (connected persons), FA 2003 s.42. HP silent | CORRECT (source gap closed, see edit 1) |
| 24 | howWeHelp 4 | The 60-day payment is on account; the disposal also goes on self assessment and the two must agree | FA 2019 Sch 2 para 6 (payment on account of the year's CGT liability) | CORRECT |
| 25 | howWeHelp 4 | Capital losses brought forward or realised elsewhere are picked up | TCGA 1992 s.2(2)/s.3 loss relief | CORRECT |
| 26 | challenge 5 | Selling shares rather than the property changes the tax for both sides | Structural, not a figure; backed by the linked SPV share-sale vs asset-sale post | CORRECT |

### Internal links (all exist on disk)

| Link | Target | Verdict |
|---|---|---|
| `/calculators/capital-gains-tax-calculator` | `Property/web/src/lib/calculators/tools/capital-gains-tax-calculator.ts`, slug registered in `registry.ts` | CORRECT |
| `/blog/capital-gains-tax/cgt-payment-deadlines-property-sales-2026` | `Property/web/content/blog/cgt-payment-deadlines-property-sales-2026.md`, category "Capital Gains Tax" | CORRECT |
| `/blog/capital-gains-tax/principal-private-residence-relief-landlords` | file present, category matches | CORRECT |
| `/blog/capital-gains-tax/cgt-calculation-selling-buy-to-let-property-step-by-step` | file present, category matches | CORRECT |
| `/blog/incorporation-and-company-structures/selling-a-property-spv-share-sale-vs-asset-sale` | file present, category "Incorporation & Company Structures" maps to that path in `src/lib/blog.ts:145` | CORRECT |

### Sources array coverage

Rows 1 to 21 and 24 to 26 are covered by the existing `sources` entries for HP §5, §5.B and §39. The only gap was the company-held-property pair (rows 22 and 23): correct law, but no citation carried. Closed by edit 1.

## Edit log

1. `sources[3]` inserted: primary-law citation for the company-held-property and transfer-to-company assertions (TCGA 1992 s.1A(3), s.1K, s.17(1)/s.18; CTA 2009 s.2; FA 2003 s.42). No body text changed.

No WRONG, STALE or unsourceable-figure edits were needed. Body word count unchanged at 1,199 (band 800 to 1,200). JSON re-validated as parsing after the edit.

VERDICT: PASS
