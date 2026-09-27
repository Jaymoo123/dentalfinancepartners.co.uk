# Factual QA (Track A): contractors-ir35 `/for/inside-ir35`

File: `docs/contractors-ir35/_wave1/inside-ir35.json`
Reviewed: 2026-09-27. Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` §13 S4a "QA".
Tie-breaker: `docs/contractors-ir35/house_positions.md` (locked 2026-06-12), then primary law.

## Assertions

| # | Section | Assertion | Source | Verdict |
|---|---|---|---|---|
| 1 | intro | Client determined inside, fee-payer runs PAYE and employee NIC before the money reaches the PSC | HP §4 (Chapter 10, ITEPA s.61N) | CORRECT |
| 2 | intro | Fee-payer pays employer NIC at 15% on top | HP §4, §6 (secondary Class 1 15% above £5,000, 2026/27) | CORRECT |
| 3 | intro | Income arrives already taxed | HP §4 | CORRECT |
| 4 | stats | "45 days" client deadline to answer a disagreement | HP §3 (ITEPA s.61T, ESM10015) | CORRECT |
| 5 | stats | "15%" employer NIC funded from the assignment rate | HP §12 (employer NIC, levy and margin come out of the assignment rate) | CORRECT |
| 6 | stats | "0%" expenses allowance under Chapter 10, the 5% is gone | HP §4 (5% retained Chapter 8, abolished Chapter 10) | CORRECT |
| 7 | stats | "18%" BADR rate on disposals from 6 April 2026 | HP §15 (14% to 5 Apr 2026, 18% from 6 Apr 2026) | CORRECT |
| 8 | challenges 1 | Blanket "inside" across a role category is probably a reasonable care failure | HP §3, §17.E | CORRECT |
| 9 | challenges 1 | No reasonable care makes the SDS invalid and the client the deemed employer | HP §3 | CORRECT |
| 10 | challenges 1 | Same follows where the SDS was never passed down the chain | HP §3 | CORRECT |
| 11 | challenges 2 | Medium and large clients sit under Chapter 10, fee-payer operates PAYE, no 5% allowance | HP §1, §4 | CORRECT |
| 12 | challenges 2 | Small client, or wholly overseas with no UK connection, keeps the PSC under Chapter 8 with the 5% | HP §1, §4 | CORRECT |
| 13 | challenges 3 | Inside-IR35 home to client travel generally not deductible, each engagement a separate employment, site a permanent workplace | HP §10 (ITEPA ss.338A/339A) | CORRECT |
| 14 | challenges 3 | Subsistence on the journey follows the travel | HP §10 | CORRECT |
| 15 | challenges 3 | Outside engagements keep temporary workplace relief subject to the 24 month and 40% expectation rule | HP §10 (ITEPA s.339(5)/(6)) | CORRECT |
| 16 | challenges 4 | MVL can distribute reserves as capital, potentially within BADR at 18% from 6 April 2026 | HP §14, §15 | CORRECT |
| 17 | challenges 4 | Winding-up TAAR recharacterises the distribution as an income dividend where a same or similar trade continues within two years | HP §14 (all four conditions A to D, including the main-purpose condition, must be met) | WRONG as written, FIXED (edit 1) |
| 18 | challenges 5 | Umbrella becomes the legal employer | HP §12 | CORRECT |
| 19 | challenges 5 | Employer NIC at 15%, the Apprenticeship Levy and the margin come out of the assignment rate | HP §12 (levy 0.5% of pay bill) | CORRECT |
| 20 | challenges 5 | From 6 April 2026 the agency contracting with the end client is jointly and severally liable for PAYE the umbrella fails to remit | HP §12 (FA 2026 s.24, ITEPA Chapter 11 ss.61Y to 61Z2) | CORRECT |
| 21 | howWeHelp 1 | Status read on control, substitution, mutuality | HP §2 (Ready Mixed Concrete, PGMOL) | CORRECT |
| 22 | howWeHelp 1 | Written representations tracked against the 45 day window | HP §3 | CORRECT |
| 23 | howWeHelp 2 | Link to `/calculators/inside-ir35-take-home-calculator` | `contractors-ir35/web/src/lib/calculators/tools/inside-ir35-take-home-calculator.ts` exists | CORRECT |
| 24 | howWeHelp 3 | Filings continue: accounts, CT600, confirmation statement, PAYE and VAT deregistration, self assessment | Companies Act 2006 filing duties; HP §9 (VAT dereg £88,000) | CORRECT |
| 25 | howWeHelp 3 | Inside-IR35 income tracked so it is not taxed twice when drawn | HP §4 | CORRECT |
| 26 | howWeHelp 4 | Director's loan cleared before the s.455 charge falls due | HP §14 (CTA 2010 s.455, 9 months and 1 day) | CORRECT |
| 27 | howWeHelp 4 | Four TAAR conditions tested; the two year same or similar trade condition is the trap | HP §14 (conditions A to D) | CORRECT |
| 28 | howWeHelp 5 | Employer pension contribution is the largest lever open to a contractor | HP §11 | CORRECT |
| 29 | faqs 1 | The determination attaches to one engagement, not permanently to the worker | HP §1, §3 (SDS per engagement) | CORRECT |
| 30 | faqs 1 | Continuing a same or similar trade within two years of the distribution can make capital taxed as an income dividend | HP §14 (hedged with "can", and the answer tells the reader to check the TAAR first) | CORRECT |
| 31 | faqs 2 | Inside engagement travel is ordinary commuting; outside engagement travel qualifies subject to 40% and 24 months | HP §10 | CORRECT |
| 32 | faqs 3 | Client must consider written representations and respond within 45 days, confirming with reasons or issuing a new determination; the client still decides | HP §3 (ITEPA s.61T) | CORRECT |
| 33 | faqs 3 | No reasonable care, or an SDS not passed down, puts the PAYE liability with the client rather than the fee-payer | HP §3 | CORRECT |
| 34 | faqs 4 | Umbrella: employer NIC, levy and margin come from the assignment rate, so compare net not headline | HP §12, §17.C | CORRECT |
| 35 | faqs 4 | Key Information Document before signing; an unusually high promised take-home is a warning sign | HP §12, §17.F | CORRECT |
| 36 | faqs 5 | Thresholds rose to turnover £15m, balance sheet total £7.5m and 50 employees for financial years beginning on or after 6 April 2025, two of three must be met | HP §1.A (CA 2006 s.382, ITEPA s.60A) | CORRECT |
| 37 | faqs 5 | The test looks back to the client's last financial year ending before the tax year, status normally changes only over two consecutive years, earliest exit 6 April 2027 | HP §1.A | CORRECT |
| 38 | faqs 6 | One determination has no automatic backward effect; HMRC can still enquire into earlier years | HP §3, §4.A | CORRECT |
| 39 | faqs 6 | Since 6 April 2024 HMRC can set off tax the worker and company already paid against a deemed employer's liability, reducing though not removing the cost | HP §4.A (the offset reduces, it does not eliminate) | CORRECT |

### Internal links

| Link | On disk | Category | Verdict |
|---|---|---|---|
| `/blog/ir35-status/sds-status-determination-statement` | yes | IR35 Status | CORRECT |
| `/blog/ir35-status/deemed-employment-payment-explained` | yes | IR35 Status | CORRECT |
| `/blog/ir35-status/challenge-ir35-determination-sds` | yes | IR35 Status | CORRECT |
| `/blog/limited-company-tax/closing-contractor-limited-company` | yes | Limited Company Tax | CORRECT |
| `/calculators/inside-ir35-take-home-calculator` | yes | tools/ | CORRECT |

### Sources array

Covers every figure and rule the page carries: §3 (SDS, reasonable care, 45 days), §4 and §4.A (Chapter 10 fee-payer PAYE, employer NIC 15%, no 5%, Chapter 8 5%, the 2024 offset), §1 and §1.A (client size, £15m/£7.5m/50, earliest exit 6 April 2027), §10 (inside travel, 24 month and 40%), §12 (umbrella, JSL from 6 April 2026), §14 (s.455, winding-up TAAR), §15 (BADR 18%), §11 (employer pension lever), plus the coverage map row. Nothing on the page is unsourced, and no cited section is unused. Sources: ADEQUATE.

## Edit log

1. `challenges[3].body` ("Deciding what the company does next"): "the winding-up TAAR recharacterises that as an income dividend where you carry on a same or similar trade within two years" changed to "the winding-up TAAR can recharacterise that as an income dividend where you carry on a same or similar trade within two years". Reason: house positions §14 requires all four TAAR conditions A to D, including the main-purpose condition D; the flat "recharacterises" presents Condition C as sufficient on its own. One word, no word-count movement (still 1,214), no other prose touched.

No UNSOURCED figures were removed. No STALE items found. The JSON was re-parsed clean after the edit.

VERDICT: PASS
