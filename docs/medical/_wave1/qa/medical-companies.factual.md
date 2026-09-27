# Factual QA (Track A): `medical-companies`

Page: `docs/medical/_wave1/medical-companies.json`
Tie-breaker: `docs/medical/house_positions.md` (§1.A, §2.B, §2.C, §4, §5, §15, §16, §19, §20, §21); primary law where silent.
Reviewed 2026-09-27.

## Assertions

| # | Where | Assertion | Source | Verdict |
|---|---|---|---|---|
| 1 | intro | Dividend rates and the s.455 loan charge both moved on 6 April 2026 | HP §5 (FA 2026 s.4; s.455 35.75% on loans made on/after 6 Apr 2026) | CORRECT |
| 2 | intro | Extraction, IR35, NHS pension, CT due date, closure = the recurring decisions | HP §5, §1.A, §2.C, §20, §16 | CORRECT |
| 3 | stats | CT 19% to 25%, marginal relief between £50,000 and £250,000 | HP §5 (19% ≤ £50k, 25% > £250k, fraction 3/200) | CORRECT |
| 4 | stats | 35.75% = dividend upper rate 2026/27 and the s.455 rate | HP §5 | CORRECT (date band added, edit 1) |
| 5 | stats | CT payable 9 months and 1 day after period end | HP §20 (gov.uk/pay-corporation-tax) | CORRECT |
| 6 | stats | First late-filing penalty £200 | HP §20 correction | CORRECT |
| 7 | challenge 1 | Dividend 10.75% / 35.75% / 39.35%, £500 allowance, 2026/27 | HP §5 | CORRECT |
| 8 | challenge 1 | CT 19% / 25% / effective 26.5% in the band | HP §5 ("~26.5%") | CORRECT |
| 9 | challenge 1 | Employer NIC 15% above a £5,000 secondary threshold | HP §5 | CORRECT |
| 10 | challenge 1 | Employment Allowance £10,500, not available to a single-director company | HP §5 | CORRECT |
| 11 | challenge 2 | Public bodies determine status from 6 April 2017 | HP §1.A (ITEPA 2003 Pt 2 Ch 10) | CORRECT |
| 12 | challenge 2 | Medium and large private hirers from 6 April 2021, SDS, fee-payer operates PAYE | HP §1.A | CORRECT |
| 13 | challenge 2 | Small private client leaves the decision with the PSC | HP §1.A (Ch 8 survives) | CORRECT |
| 14 | challenge 2 | A locum can hold inside and outside determinations at once | HP §1.A | CORRECT |
| 15 | challenge 3 | Dividends are not NHS-pensionable, whatever the company | HP §2.C (pension limb unaffected by the s.86 correction) | CORRECT |
| 16 | challenge 3 | GMS can sit with a company limited by shares whose shareholders all qualify under NHS Act 2006, one a medical practitioner; an ordinary PSC does not | HP §2.C correction 2026-08-26 (s.86(1)(c), s.86(3)) | CORRECT (GMS only, not pinned to PMS) |
| 17 | challenge 3 | For a consultant only the substantive NHS post is pensionable | HP §2.C | CORRECT |
| 18 | challenge 4 | Medical company is a close company; s.455 on a DLA outstanding 9 months and 1 day after period end | HP §5 (CTA 2010 s.455) | CORRECT |
| 19 | challenge 4 | 35.75% on loans made on/after 6 Apr 2026; 33.75% for 2025/26 or earlier; band by date made | HP §5 | CORRECT |
| 20 | challenge 4 | s.458 relief deferred by another 9 months and 1 day | HP §5 | CORRECT |
| 21 | challenge 5 | Pay at 9m+1d, file at 12m, payment first | HP §20 | CORRECT |
| 22 | challenge 5 | £200, "not the £100 Self Assessment figure" | HP §20 ruling 2026-09-01: naming £100 to dispel it is COMPLIANT | CORRECT |
| 23 | challenge 5 | Dividends a UK company receives normally exempt under CTA 2009 Part 9A | HP §19 (s.931A; general position only, no class enumerated) | CORRECT |
| 24 | challenge 5 | Holding investments loses business relief | HP §15 (IHTA 1984 s.105(3)) | CORRECT |
| 25 | howWeHelp 2 | Payment figure before the 9 month and 1 day deadline; CT600 | HP §20 | CORRECT |
| 26 | howWeHelp 3 | Status factors: personal service, control, mutuality, integration; client-led disagreement process | HP §1, §1.A | CORRECT |
| 27 | howWeHelp 4 | Winding-up rule; the condition that bites is similar work within two years | HP §16 Condition C | CORRECT |
| 28 | faq 1 | Saving modest at 2026/27 rates, narrowed by the 6 Apr 2026 rise; drivers are taper, retention, family shareholding | HP §5 headline point | CORRECT |
| 29 | faq 2 | 15% above £5,000; no Employment Allowance for a single director; spouse at market rate | HP §5 (BIM37700+) | CORRECT |
| 30 | faq 3 | Repay-and-redraw fails under the 30-day and arrangements rules | HP §16 part 2 (CTA 2010 s.464ZA; repealed s.464C/D NOT cited) | CORRECT |
| 31 | faq 4 | Four conditions; condition C = same or similar trade within two years of the distribution; income at dividend rates; BADR at 18% lost | HP §16, §4 (BADR 18% from 6 Apr 2026) | CORRECT |
| 32 | faq 5 | Employer pension contribution: no NIC either side; salary carries 15% employer plus employee NIC; deductible unless a non-trade purpose | HP §21 (NIM02716, ITEPA 2003 s.308, BIM46035) | CORRECT |
| 33 | faq 5 | Annual allowance may already be used by the NHS DB input amount; excess charged at marginal rate | HP §21, §2.B (mechanics not re-derived, as required) | CORRECT |

No salary-multiple cap asserted, no £100 CT penalty asserted, no "a limited company cannot hold a GMS contract" flat statement, no s.464C/s.464D citation, no dividend rate untagged. All checked prohibitions clear.

**Sources array.** Covers every figure and rule above: §5, §1.A, §2.C, §20, §19, §15, §16, §4, §21 plus the map row. No assertion on the page is left without a source entry. UNSOURCED count: 0.

**Internal links, all present on disk.**

| Link | Target | Exists |
|---|---|---|
| `/blog/salary-vs-dividend-medical-limited-company-2026` | `Medical/web/content/blog/salary-vs-dividend-medical-limited-company-2026.md` | yes |
| `/blog/consultant-directors-loan-account-s455-medical-company` | `Medical/web/content/blog/consultant-directors-loan-account-s455-medical-company.md` | yes |
| `/blog/surplus-cash-medical-limited-company-options` | `Medical/web/content/blog/surplus-cash-medical-limited-company-options.md` | yes |
| `/calculators/private-practice-incorporation` | `Medical/web/src/lib/tools/configs/incorporation-calculator.ts` (`slug: "private-practice-incorporation"`) | yes |

**Mechanical.** JSON parses. Word count over intro, challenges, howWeHelp and faqs including titles and questions: 1,200, at the top of the 800 to 1,200 band. metaTitle 46 chars, metaDescription 155 chars. No em-dash.

## Edit log

1. `stats[1].label` — added the date band the §5 writing rule requires ("State the s.455 rate with its date band"). Was "Dividend upper rate 2026/27, and the s.455 loan charge rate"; now "... and the s.455 loan charge rate on loans made from 6 April 2026". Stat labels sit outside the counted word band, so the count is unchanged at 1,200.

Total edits: 1. No removals, no prose rewrites.

VERDICT: PASS
