# Factual QA (Track A): property-company-profit-extraction

File: `docs/property/_wave1/property-company-profit-extraction.json`
Reviewed: 2026-09-27. Tie-breaker: `docs/property/house_positions.md` (HP) sections 21.1, 21.2, 21.4, 21.9, 21.A; primary law where HP is silent.

## Assertions

| # | Where | Assertion | Source | Verdict |
|---|---|---|---|---|
| 1 | intro | Director's loan credit balance repaid with no personal tax | HP 21.1 (s.162 credit balance, tax-free repayment route) | CORRECT |
| 2 | intro | Dividends taxed at 2026/27 rates on top of CT already paid | HP 21.4 / 21.9 | CORRECT |
| 3 | intro | Salary carries employer NI the company funds | HP 21.4 | CORRECT |
| 4 | stats | Dividend rates from 6 April 2026: 10.75% / 35.75% / 39.35% | HP 21.9 (ITA 2007 s.8 as in force) | CORRECT |
| 5 | stats | Dividend allowance 2026/27 = GBP 500 | HP 21.4 | CORRECT |
| 6 | stats | s.455 charge 35.75% on a loan made on or after 6 April 2026 | HP 21.1 / 21.4 (FA 2026 s.4(1)(b) via ITA 2007 s.8(2)) | CORRECT |
| 7 | stats | 9 months after year end before an overdrawn loan is charged | HP 21.1; CTA 2010 s.455 | CORRECT |
| 8 | challenge 1 | Basic and higher rose two points from 8.75% / 33.75% | HP 21.4 (F-20), HP 21.9 (FA 2026 s.4 amended only ordinary and upper) | CORRECT |
| 9 | challenge 1 | Employer NI 15% above the GBP 5,000 secondary threshold | HP 21.4 (F-19 correction; 15% from 6 April 2025) | CORRECT |
| 10 | challenge 1 | Sole-director company cannot claim Employment Allowance | HP 21.4 (sole-director exclusion) | CORRECT |
| 11 | challenge 1 | Link `/calculators/property-company-extraction-calculator` | `registry.ts` GENERIC + `tools/property-company-extraction-calculator.ts` slug | CORRECT |
| 12 | challenge 2 | Credit balance from incorporation; exhaustion within four or five years | HP 21.1 DLA exhaustion trap (GBP 500k in 4-5 years) | CORRECT |
| 13 | challenge 3 | Overdrawn DLA = participator loan from a close company; s.455 CTA 2010 | HP 21.1; CTA 2010 s.455 | CORRECT |
| 14 | challenge 3 | 35.75% on or after 6 April 2026, 33.75% earlier; rate follows ITA 2007 s.8(2) | HP 21.1 (rate-by-reference) | CORRECT |
| 15 | challenge 3 | Refunded once repaid, but slowly | HP 21.1 (repayable on later repayment); CTA 2010 s.458 | CORRECT |
| 16 | challenge 4 | CT 19% to GBP 50,000, 25% above GBP 250,000, marginal band effective 26.5% | HP 21.4, HP 21.A (s.18A / s.3 / s.18B, 3/200) | CORRECT |
| 17 | challenge 4 | Thresholds divided between associated companies | HP 21.A (s.18D / s.18E, divide by 1+N) | CORRECT |
| 18 | challenge 4 | CIHC loses the small profits rate, pays 25% throughout | HP 21.5 / 21.A (s.18A(1)(b), s.18N) | CORRECT |
| 19 | challenge 4 | Commercial letting to unconnected tenants is a permitted purpose, s.18N; letting to a connected person falls outside | HP 21.9 and HP 21.A: the statutory exclusion is expansive (connected person, their spouse, a relative, a relative's spouse); HP 21.A flags the narrow framing as the §16.45 drift catch | WRONG (under-inclusive) — EDIT 1 |
| 20 | challenge 4 | Link `/calculators/corporation-tax-calculator` | registry + tool slug | CORRECT |
| 21 | howWeHelp 1 | Employer pension contribution as an extraction route to review | HP 21.1 repayment order, HP 21.4 | CORRECT |
| 22 | howWeHelp 3 | s.455 entries on the CT return, dividend pages of self assessment | Primary: CT600A; SA100 dividend pages | CORRECT |
| 23 | howWeHelp 3 | Link `/blog/incorporation-and-company-structures/extracting-cash-from-property-spv-extraction-sequence-pillar-2026-27` | File on disk, category "Incorporation & Company Structures", canonical matches | CORRECT |
| 24 | howWeHelp 4 | Partner network consent wording | `Property/web/src/config/site.ts` (verbatim, per S4a T2) | CORRECT |
| 25 | faq 1 | Salary deductible, employer NI 15% above GBP 5,000, no Employment Allowance for sole director; dividends out of profit taxed 19% to 25% then 10.75/35.75/39.35 above GBP 500 | HP 21.4, 21.9, 21.A | CORRECT |
| 26 | faq 2 | Only a repayment of a credit balance, and reimbursed expenses, are not income | HP 21.1; general principle (repayment of debt is not income) | CORRECT |
| 27 | faq 3 | Charge on balance outstanding nine months and one day after year end | CTA 2010 s.455 (due date 9 months and 1 day after end of AP); HP 21.1 | CORRECT |
| 28 | faq 3 | Repay-and-redraw around the deadline caught by anti-avoidance | CTA 2010 ss.464C-464D (30-day and arrangements rules). HP silent — source was missing from the `sources` array | CORRECT, source added — EDIT 2 |
| 29 | faq 4 | Employer contribution deductible on wholly and exclusively, no NI, not taxed on the director when paid | HP 21.4 (employer contributions deductible); FA 2004 s.188, CTA 2009 s.1290 backdrop | CORRECT |
| 30 | faq 4 | Annual allowance GBP 60,000, unused allowance sometimes carried forward | HP 21.4 (GBP 60k AA); FA 2004 s.228A carry forward | CORRECT |
| 31 | faq 5 | Outright gift of ordinary shares to a spouse effective, s.626 spouse exception; must be a real gift with full rights | HP 21.2 (ITTOIA 2005 s.624/s.626, Jones v Garnett [2007] UKHL 35) | CORRECT |
| 32 | faq 5 | Shares for a child under eighteen: income treated as the settlor's | HP 21.2 (minor-child shares settlor-attributed) | CORRECT |
| 33 | faq 6 | Band-by-band dividend rates above the GBP 500 allowance | HP 21.9 | CORRECT |
| 34 | faq 6 | Link `/calculators/dividend-tax-calculator` | registry + tool slug | CORRECT |

No UNSOURCED figure survived with no source available, so nothing was removed.

## Sources array

Covers HP 21.1, 21.2, 21.4, 21.9, the coverage-map row, the calculator registry and the consent wording. One gap: the s.455 repay-and-redraw anti-avoidance statement in FAQ 3 had no listed source. Added (EDIT 2). Associated companies and the CIHC framework are carried by the 21.4 and 21.9 entries; HP 21.A is the fuller anchor but the figures cited are identical, so no further entry is required.

## Edit log

1. `challenges[3].body`: "but letting to a connected person falls outside it" to "but letting to a connected person, or to their spouse or a relative, falls outside it". Reason: CTA 2010 s.18N(3) and HP 21.A state the exclusion reaches the connected person's spouse, relatives and relatives' spouses; the narrow form is the drift pattern HP 21.A explicitly catches. One-clause factual fix.
2. `sources`: inserted an entry for CTA 2010 ss.464C-464D as the source for the FAQ 3 anti-avoidance statement.

Word count: 1,210 before, **1,217 after** (band 800 to 1,200, so 17 over). Edit 1 added seven words for a factual reason. The trim is Track B's.

JSON re-validated: parses, 7 keys, indent 2, trailing newline.

VERDICT: PASS
