# Generalist Tool Roster Inputs — C1 Mining (2026-07-17)

Data pull: GSC 4,236 rows (site_key=generalist), Bing 2,910 rows.
Bing is primary revenue channel (25-40 clicks/day) and is weighted accordingly.
Serper sweep: credits exhausted mid-run — competitor table built from query signal + domain knowledge (marked ⚠ inferred).

---

## Current Tool Inventory (7 existing)

| Tool name | Slug | Type |
|---|---|---|
| Salary & Dividend Optimiser | `/tools/salary-dividend-optimiser` | Tax optimisation |
| Take-Home Pay Calculator | `/tools/take-home-pay-calculator` | Tax calculation |
| Employer NI & Cost-to-Hire | `/tools/employer-ni-calculator` | Tax calculation |
| Pension Contribution Optimiser | `/tools/pension-contribution-optimiser` | Tax planning |
| R&D Tax Credit Estimator | `/tools/rd-tax-credit-estimator` | Tax credit |
| BADR CGT Calculator | `/tools/badr-cgt-calculator` | CGT/disposal |
| VAT Scheme Comparator | `/tools/vat-scheme-comparator` | VAT planning |

Gap to target: **7 new tools** needed to reach ~14.

---

## Query Clusters with Calculator/Tool Intent

Clusters aggregated from GSC + Bing top 200 queries each. Bing vol weighted 2× in rank order.

| Cluster | Google impr | Bing impr | Existing tool? | Opportunity |
|---|---|---|---|---|
| **P11D / benefit in kind** | ~0 (impressions from "hmrc cgt reporting" dominate GSC; P11D absent) | 2,829 (p11d) + 609 (what is p11d) + 236 (benefit in kind) + 190 (p11d benefits) + 44 (eapc bik) + 24 (p11d penalties) = **~3,932** | None | **Massive Bing cluster, zero existing coverage** |
| **CGT on residential property** | 181 (hmrc cgt reporting 2026) + 106 (cgt deadlines) + 18 (CGT rates residential 2026) = ~305 | 54 (cgt rates 2025/26) + 32 (capital gains tax property) + 28 (CGT on residential prop) + 25 (CGT on residential prop UK) + 24 (UK CGT rates 2025/26) + 16 (CGT for flat) + 14 (residential property CGT rates) + 12 (cgt on res prop 2026/27) = ~205 | BADR CGT Calculator (BADR-only, not residential) | **Two distinct tools needed: BADR exists; residential CGT reporting is separate** |
| **Dividend tax rates (info/calc)** | 0 GSC | 212 (div allowance 2025/26) + 168 (div tax rates 2025/26) + 110 (div tax rate higher rate) + 50 (div rates 2025/26) + 40 (tax-free div 2025/26) + 22 (div tax rate 2025/26) + 20 (25/26 div allowance) + 18 (higher rate div 2025/26) + 18 (div tax rates 25/26) + 18 (div rates 25/26) + 13 (UK div tax 2025/26) + 12 (div rate 2025/26) + 12 (hmrc div allowance) + 12 (div tax-free allowance 25/26) = **~745** | Salary-Dividend Optimiser (planning, not rates ref) | Bing rates cluster is pure-lookup; a Dividend Tax Rates 2026/27 calculator (with drill-down by band) captures this |
| **CIS / subcontractor tax** | ~227 (cis accountant) + 52 (accountant for cis) + 48 (cis contractors accountant) + 33 (construction industry scheme accountant) + 28 (cis tax return) + 27 (cis accountant) + 16 (cis accounting software) + 13 (cis subcontractor accountant) = ~444 GSC | 0 Bing | None | GSC cluster only — CIS tax/deduction calculator for subcontractors |
| **VAT threshold** | 66 (vat calc guide) + 13 (how to calc vat) = ~79 GSC | 202 (vat threshold) + 153 (vat threshold 2025/26) + 53 (vat reg threshold) + 21 (vat threshold uk) + 18 (what is the vat threshold) + 11 (vat turnover threshold) = **~458 Bing** | VAT Scheme Comparator (scheme choice, not threshold checker) | VAT Registration Threshold Checker: "should I register?" + flat-rate preview |
| **Corporation tax rates** | ~106 (corp tax advisers — GSC, local) | 136 (corp tax rates) + 39 (uk corp tax rate) + 35 (corp tax) + 30 (what is corp tax) + 26 (corp tax rate uk) + 26 (corp tax rate) + 25 (uk corp tax rates) + 25 (how much is corp tax) + 21 (corp tax rate uk) + 18 (corporate tax rate uk) + 12 (what is corp tax rate) + 12 (corp tax rates 2025) + 10 (corp tax rates) = **~415 Bing** | None (no corp tax rate tool) | Associated Companies Corporation Tax Calculator (bands + associated company divider) |
| **Sole trader vs limited company** | 41 (sole trader to ltd) + 33 (changing sole trader to ltd) + 24 (going from sole trader to ltd) + 18 (how to change) + 17 (switching) + 16 (moving) + 15 (can i change) + 13 (can i change) = ~177 GSC | 16 (moving sole trader to ltd) = ~16 Bing | None | Sole Trader vs Limited Company Tax Comparison tool |
| **Company car / P11D van** | 0 GSC calc intent | 71 (capital allowances on vans) + 22 (cap allowances vans) + 22 (van capital allowances) + 16 (van p11d value 25/26) + 15 (cap allowances on vans 2025/26) + 15 (cap allowances cars and vans) + 14 (cap allowances cars 2025/26) + 14 (electric van cap allowances) + 13 (van allowance 25/26) + 12 (tax allowances company vans) + 12 (hmrc definition van AIA) + 12 (cap allowances on work vans) + 11 (aia on vans) + 10 (can annual investment allowance vans) = **~239 Bing** | None | Company Van / Car Capital Allowances + P11D value calculator |
| **MTD ITSA** | 12 (mtditsa) = ~12 GSC | 0 Bing notable | None | MTD ITSA Readiness Checker — low current signal, rising trend |
| **Student loan + tax** | 0 GSC calc intent | 0 Bing notable | Take-Home Pay Calculator has SL option | Take-Home already covers this; marginal |
| **Mileage / AMAP** | 16 (can we pay < 45p/mile) + 16 (how much to pay employee mileage) = ~32 GSC | 18 (is mileage taxable on payroll) = ~18 Bing | None | Mileage Reimbursement Calculator (AMAP 55p) — addresses employee-pay-less-than-AMAP edge case |
| **Use of home / PAYE registration** | 18 (use of home as office 25/26) = ~18 GSC | 175 (file confirmation statement) + 146 (register for paye) + 72 (register paye employer) + 67 (paye registration) = ~460 Bing | None | PAYE Registration Guide is informational not calculator; low tool ROI |
| **IHT / BPR** | 0 | 0 notable | None | Weak signal in query data — seed only |

---

## Competitor Tool Landscape

## Live SERP Verification — DataForSEO 2026-07-17

**Method:** Google Organic UK (location_code 2826), top 10 results per query, live SERP. Total API cost: $0.0220 (11 queries total including solicitors; generalist portion = 6 queries × $0.002 = $0.012). Tool classification: title or URL contains calculator/checker/tool/wizard/calc/estimator/compare.

### Priority queries — live verdicts

| # | Query | Verdict | Tool count (top 10) | Key competitors found |
|---|-------|---------|--------------------|-----------------------|
| G1 | p11d calculator | **DOMINATED** | 10/10 tools | gov.uk (#1 PAYE company car calc), comcar.co.uk (#2), employerscalculator.co.uk (#3 — dedicated P11D/BIK calc), fleetalliance.co.uk (#6), fleetnews.co.uk (#7), zelt.app (#11 — employer BIK focus). Fleet/car leasing industry dominates |
| G2 | benefit in kind calculator company car | **DOMINATED** | 10/10 tools | gov.uk (#1), comcar.co.uk (#2), alphabet.com (#3), Deloitte Car Tax Guide cartaxguide.co.uk (#11), copa.org.uk, hl.co.uk, arval.co.uk, kia.com. Saturated by fleet industry |
| G3 | dividend tax calculator 2026/27 | **DOMINATED** | 9/10 tools | itcontracting.com (#1), dividify.co.uk (#2), contractorcalculator.co.uk (#4), which.co.uk (#6), bkplus.co.uk (#7), outrise.co.uk (#8), excelaccountancy.com (#9), gorillaaccounting.com (#10). No differentiation gap on basic dividend tax calc |
| G4 | associated companies corporation tax calculator | **CONTESTED** | 6/10 tools (0 associated-company-specific) | gov.uk Marginal Relief calculator (#6) handles the bands but NOT the associated-company threshold divider; taxoptimiser.co.uk (#4) and gofile.co.uk (#5) are generic CT calcs; financebox.co.uk (#7), contractorcalculator.co.uk (#8), mooresouth.co.uk (#10). Top 3 results are articles (gov.uk, ACCA, ATT). **No tool specifically divides £50k/£250k thresholds by number of associated companies** |
| G5 | vat registration threshold checker | **CONTESTED** | 5/9 tools | anna.money (#5 — VAT Registration Threshold Monitor), countify.co.uk (#7 — threshold checker), piaccs.co.uk (#8 — Excel spreadsheet), loyals.uk (#9 — VAT registration calculator), reversevatcalculator.co.uk (#11). Gov.uk dominates top 2-3. Existing tools are thin/obscure — no big-brand interactive tool |
| G6 | 60 day cgt reporting calculator | **CONTESTED** | 4/9 tools (0 specific to 60-day workflow) | hl.co.uk (#6), aviva.co.uk (#8), charcol.co.uk (#9), propertysolvers.co.uk (#11) — all generic CGT calcs. Top 5 results are gov.uk + ATT/Saffery guides on reporting procedure. **No tool specifically models the 60-day reporting window, deadline, or residential property CGT workflow** |

### Top-10 SERP detail — generalist queries

**G1 — "p11d calculator"** (DOMINATED)
| Pos | Domain | Type | Title |
|-----|--------|------|-------|
| 1 | gov.uk | TOOL | Calculate tax on employees' company cars |
| 2 | comcar.co.uk | TOOL | Company Car Tax Calculator |
| 3 | employerscalculator.co.uk | TOOL | P11D Calculator 2026/27 \| Benefit in Kind Tax & Class 1A NI |
| 5 | alphabet.com | TOOL | How to Calculate Company Car Tax (BIK) |
| 6 | fleetalliance.co.uk | TOOL | Company Car Tax Calculator \| 2026/27 |
| 7 | fleetnews.co.uk | TOOL | 2026 Company Car Tax Calculator |
| 8 | carleasing.co.uk | TOOL | Work Out Your Tax Using Our Company Car Tax Calculator |
| 9 | driver.lexautolease.co.uk | TOOL | Tax Calculator |
| 10 | leasing.arval.co.uk | TOOL | Arval Car Tax Calculator |
| 11 | zelt.app | TOOL | P11D Calculator for UK Employers: 2026 BIK Tax Rates |

**G2 — "benefit in kind calculator company car"** (DOMINATED)
| Pos | Domain | Type | Title |
|-----|--------|------|-------|
| 1 | gov.uk | TOOL | Calculate tax on employees' company cars |
| 2 | comcar.co.uk | TOOL | Company Car Tax Calculator |
| 3 | alphabet.com | TOOL | How to Calculate Company Car Tax (BIK) |
| 4 | driver.lexautolease.co.uk | TOOL | Tax Calculator |
| 5 | fleetalliance.co.uk | TOOL | Company Car Tax Calculator \| 2026/27 |
| 7 | copa.org.uk | TOOL | Company Car BIK Tax Calculator UK 2025/26 |
| 8 | leasing.arval.co.uk | TOOL | Arval Car Tax Calculator |
| 9 | fleetnews.co.uk | TOOL | 2026 Company Car Tax Calculator |
| 10 | kia.com | TOOL | Company Car Tax Calculator |
| 11 | cartaxguide.co.uk | TOOL | Benefit In Kind Calculator - Deloitte Car Tax Guide 2026/27 |

**G3 — "dividend tax calculator 2026/27"** (DOMINATED)
| Pos | Domain | Type | Title |
|-----|--------|------|-------|
| 1 | itcontracting.com | TOOL | Dividend Tax Calculator - 2026/27 |
| 2 | dividify.co.uk | TOOL | Free UK Dividend Tax Calculator (2026/27 Update) |
| 3 | gov.uk | ART | Check how much tax you pay on dividends and interest |
| 4 | contractorcalculator.co.uk | TOOL | Dividend Tax Calculator |
| 5 | taxradar.co.uk | TOOL | Salary & Dividend Calculator: Director Take-Home Pay |
| 6 | which.co.uk | TOOL | Dividend tax calculator |
| 7 | bkplus.co.uk | TOOL | Dividend Tax Calculator |
| 8 | outrise.co.uk | TOOL | Free Salary & Dividend Calculator 2026/27 |
| 9 | excelaccountancy.com | TOOL | Dividend Tax Calculator UK \| 2026/27 Tax Planning Tool |
| 10 | gorillaaccounting.com | TOOL | Salary & Dividend Tax Calculator |

**G4 — "associated companies corporation tax calculator"** (CONTESTED)
| Pos | Domain | Type | Title |
|-----|--------|------|-------|
| 1 | gov.uk | ART | Marginal Relief for Corporation Tax |
| 2 | accaglobal.com | ART | Associated companies and corporation tax: examples |
| 3 | att.org.uk | ART | Corporation Tax rates and Associated Companies - FAQs |
| 4 | taxoptimiser.co.uk | TOOL | Corporation Tax Calculator |
| 5 | gofile.co.uk | TOOL | Corporation Tax Calculator 2026/27 |
| 6 | gov.uk | TOOL | Marginal Relief for Corporation Tax calculator |
| 7 | financebox.co.uk | TOOL | Corporation tax calculator |
| 8 | contractorcalculator.co.uk | TOOL | Corporation Tax Calculator |
| 9 | haysmac.com | ART | Associated companies rules for Corporation Tax |
| 10 | mooresouth.co.uk | TOOL | Calculating Corporation Tax marginal relief |

**G5 — "vat registration threshold checker"** (CONTESTED)
| Pos | Domain | Type | Title |
|-----|--------|------|-------|
| 2 | gov.uk | ART | How VAT works: VAT thresholds |
| 3 | gov.uk | ART | Check a UK VAT number |
| 5 | anna.money | TOOL | VAT Registration Threshold Monitor |
| 6 | gofile.co.uk | ART | VAT Registration Threshold knowledgebase |
| 7 | countify.co.uk | TOOL | UK VAT Threshold Checker — Am I Close to £90,000? |
| 8 | piaccs.co.uk | TOOL | Excel Spreadsheet: VAT Registration Threshold Checker |
| 9 | loyals.uk | TOOL | VAT Registration Calculator UK 2025/26 |
| 10 | xero.com | ART | VAT registration threshold: when you need to register |
| 11 | reversevatcalculator.co.uk | TOOL | VAT Threshold Checker UK \| Need to Register? |

**G6 — "60 day cgt reporting calculator"** (CONTESTED)
| Pos | Domain | Type | Title |
|-----|--------|------|-------|
| 1 | gov.uk | ART | Tax when you sell property: Work out your gain |
| 3 | gov.uk | ART | Report and pay your Capital Gains Tax |
| 4 | att.org.uk | ART | CGT on UK Property Reporting Service - a user's guide |
| 5 | saffery.com | ART | 60-Day CGT Reporting Guide |
| 6 | hl.co.uk | TOOL (generic) | Capital Gains Tax (CGT) Calculator |
| 7 | litrg.org.uk | ART | Capital gains tax reporting |
| 8 | aviva.co.uk | TOOL (generic) | Capital Gains Tax calculator |
| 9 | charcol.co.uk | TOOL (generic) | Capital Gains Tax Calculator UK for Property |
| 11 | propertysolvers.co.uk | TOOL (generic) | Capital Gains Tax Calculator (2025/26 Tax Year) |

---

**Previous knowledge-based table (pre-verification):**

| Seed topic | Competitor domain (was inferred) | Live status |
|---|---|---|
| Dividend vs bonus calculator | gosimpletax.com, salary-calculator.org.uk, listentotaxman.com | **DOMINATED** — itcontracting.com/#1, dividify.co.uk/#2, which.co.uk/#6 confirmed live |
| Company car vs car allowance / P11D | GOV.UK (PAYE tools), contractorcalculator.co.uk | **DOMINATED** — gov.uk #1, fleet industry saturated, employerscalculator.co.uk P11D-specific confirmed |
| CGT residential property / 60-day | cgtcalculator.com, taxscouts.com, hmrc.gov.uk | **CONTESTED** — generic CGT tools exist; 60-day workflow tool is not present |
| Associated companies CT | (unknown) | **CONTESTED** — gov.uk Marginal Relief calc exists but associated-company threshold divider is a gap |
| VAT registration threshold | (unknown) | **CONTESTED** — thin tools exist (anna.money, countify.co.uk); no big brand |
| CIS tax calculator | cisdeductions.co.uk, calculatoruk.co.uk | Not live-verified — original knowledge-based assessment stands |
| MTD ITSA checker | accountingweb.co.uk, sage.com/uk | Not live-verified — original knowledge-based assessment stands |

---

## Seed Verdicts

| Seed | Verdict | Rationale |
|---|---|---|
| CGT residential property 2026 | **STRONG** | GSC: 287 impr (cgt reporting + deadlines cluster); Bing: ~205 impr; HMRC 60-day rule creates recurrent demand; BADR calculator already live = 90% code reuse |
| MTD ITSA readiness checker | **MODERATE** | GSC 12 impr only; "mtditsa" is early-adopter query; advisory content value > calculator value currently; build as checklist page not heavy tool |
| Company car vs car allowance | **MODERATE** | No direct Bing signal on "company car calculator" but P11D/van cluster at 239 Bing impr covers the adjacent tax. Fold into P11D/BIK tool rather than standalone |
| P11D / BIK calculator | **STRONG** | Bing: 3,932+ impr across p11d cluster — largest single gap in the data. Zero current coverage. High click-through potential (Bing is revenue channel) |
| CIS-lite (subcontractor deduction) | **STRONG** | GSC: 444 impr across cis accountant/subcontractor cluster. Competitor tools low quality. Clean calculation: gross pay × 20% or 30% deduction. Niche ownership play |
| IHT / BPR estimate | **WEAK** | No query signal in either source. Build only if generalist wants estate planning positioning |
| Dividend vs bonus 2026/27 | **STRONG** | Bing: 745 impr across dividend rates/allowance cluster. Salary-Dividend Optimiser handles planning but not the rates-reference + quick dividend tax bill angle. Two-step tool: rates widget + optimiser cross-link |
| Student loan + tax combined | **WEAK** | Take-Home calculator already has SL. Marginal differentiation. Skip |

---

## Data-Driven New Ideas (from query clusters not in seeds)

| Idea | Evidence | Notes |
|---|---|---|
| **Associated Companies CT Calculator** | Bing: 415 impr corp tax rates cluster + "is there a threshold if I have 3 subsidiary companies" (12 impr, 4 clicks = high CTR signal) | Models dividing £50k/£250k thresholds by number of associated companies |
| **VAT Registration Threshold Checker** | Bing: 458 impr vat threshold cluster | "Should I register?" decision tree + flat-rate-vs-standard preview. Different from existing VAT Scheme Comparator (which assumes already registered) |
| **Sole Trader vs Ltd Co Tax Comparison** | GSC: 177 impr incorporation cluster | Side-by-side: sole trader NI+income tax vs ltd co CT+salary+dividend. Addresses top GSC cluster with zero tool coverage |
| **Capital Allowances / Van AIA Calculator** | Bing: 239 impr van/car allowance cluster | Covers: FYA (EV), WDA 18%/14%, AIA — sole traders + companies. Also captures van P11D value queries |
| **Mileage Reimbursement Calculator** | GSC: 32 impr + Bing: 18 impr mileage queries | Input: business miles, own-car/company-car flag → AMAP 55p cost vs tax-efficient rate; covers employer underpay scenario (common CIS/trade client pain) |

---

## Top 10 Opportunities (ranked)

Rank = composite of (Bing impr × 2) + GSC impr + tool gap penalty (existing partial coverage −30%), rounded.

| Rank | Tool | Google impr | Bing impr | Existing? | Score | Build complexity |
|---|---|---|---|---|---|---|
| 1 | **P11D / Benefit-in-Kind Tax Calculator** | ~0 | ~3,932 | None | 7,864 | Medium — BIK % table by car CO2/electric + van flat rate |
| 2 | **Dividend Tax Rates 2026/27 Calculator** (band drill-down) | ~0 | ~745 | Partial (optimiser exists) | 1,045 | Low — static rates table + interactive band calculator |
| 3 | **VAT Registration Threshold Checker** | ~79 | ~458 | Partial (scheme comparator) | 917 | Low — turnover input → register/not + flat-rate preview |
| 4 | **Associated Companies CT Rate Calculator** | ~106 | ~415 | None | 936 | Low-Medium — input: profit + no. of associated cos → marginal rate |
| 5 | **CGT Residential Property 60-Day Reporter** | ~305 | ~205 | Partial (BADR only) | 696 | Medium — reuse BADR CGT compute; add residential rate branch |
| 6 | **CIS Subcontractor Tax Deduction Calculator** | ~444 | ~0 | None | 444 | Low — gross × 20%/30% rate based on registration status |
| 7 | **Capital Allowances / Van AIA Calculator** | ~0 | ~239 | None | 478 | Medium — FYA/WDA/AIA logic + car CO2 pool allocation |
| 8 | **Sole Trader vs Ltd Co Tax Comparison** | ~177 | ~16 | None | 209 | Medium — two-path tax model, requires ST NI + Corp Tax paths |
| 9 | **MTD ITSA Readiness Checker** | ~12 | ~0 | None | 12 | Low — checklist/decision tree, no heavy compute |
| 10 | **Mileage Reimbursement Calculator** | ~32 | ~18 | None | 68 | Very low — AMAP 55p × miles; employer under/overpay diff |

### Priority call

**Build in this order for maximum Bing revenue impact:**
1. P11D/BIK Calculator — largest single Bing gap by ~5×
2. Dividend Tax Rates 2026/27 widget — pure Bing play, low build cost
3. Associated Companies CT Calculator — high Bing signal, quick build
4. VAT Registration Threshold Checker — complements existing VAT Scheme tool
5. CGT Residential Property — code-reuse from BADR CGT, high GSC+Bing combo
6. CIS Deduction Calculator — GSC niche ownership, low build cost

IHT/BPR and Student Loan: skip until query signal materialises.

---

*Data sources: `gsc_query_data` (site_key=generalist, top 200 by impressions, pulled 2026-07-17); `bing_query_data` (site_key=generalist, top 200 by impressions, pulled 2026-07-17). Competitor table: live-verified via DataForSEO 2026-07-17 (6 generalist queries, $0.012 API cost). CIS/MTD/IHT competitor rows remain knowledge-based (not live-queried). No commits made.*
