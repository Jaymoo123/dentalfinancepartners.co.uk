# Generalist (Holloway Davies) — Tool Roster (C1 design, 2026-07-17)

From `TOOL_ROSTER_INPUTS.md` (fresh GSC 4,236 rows + first Bing pull 2,910 rows, DataForSEO live-verified). Current: 7 tools. Target: 17 (7 + 10 new). **Bing is the revenue channel** — Google-SERP saturation does NOT veto a tool if we already earn Bing impressions for the cluster; those tools are conversion assets for traffic we already have. FA 2026 ground truth applies; Opus factual QA before commit.

## New tools (priority order)

### 1. `p11d-bik-calculator` — P11D / Benefit-in-Kind Calculator (Bing play)
- All main BIK classes (company car incl. EV bands, fuel, vans, loans, medical) → taxable value, employee tax, employer Class 1A at 15%.
- Evidence: ~3,932 Bing impr ("p11d" 2,829 + variants) — largest single cluster on the revenue channel, zero on-site tool. Google SERP DOMINATED (gov.uk + fleet) — this is a Bing + on-site conversion play, not a Google ranking play. Premium: no.

### 2. `associated-companies-ct` — Associated Companies CT Rate Calculator ★ real gap
- Divides £50k/£250k thresholds by associated-company count → marginal relief, effective rate, quarterly-instalment trigger. gov.uk's calc doesn't do the division step.
- Evidence: ~415 Bing + ~106 GSC impr with clicks; SERP CONTESTED. Premium: no.

### 3. `vat-threshold-checker` — VAT Registration Threshold Checker ★ near-whitespace
- Rolling-12-month turnover test + 30-day forward test + registration-date logic; deregistration threshold.
- Evidence: ~458 Bing + ~79 GSC; SERP CONTESTED — only thin tools (anna.money), no big brand. Premium: no.

### 4. `cgt-60-day-reporter` — Residential CGT 60-Day Reporting Calculator ★ gap
- Gain computation (PRR, letting mix) + tax at 18/24%, 60-day deadline from completion date, payment-on-account amount.
- Evidence: ~205 Bing + ~287 GSC (GSC-led); SERP CONTESTED — generic CGT calcs, no 60-day workflow tool. Premium: no.

### 5. `cis-subcontractor-deduction` — CIS Deduction Calculator
- Gross/20%/30% status, materials split, monthly statement figure, year-end reclaim estimate.
- Evidence: ~444 GSC ("cis accountant" 227). Note: construction-cis site owns the deep CIS toolset — this is deliberately the LITE version, cross-linking to the CIS site is fine. Premium: no.

### 6. `capital-allowances-vehicle` — Van & Equipment Capital Allowance Calculator
- Van/car/equipment: AIA vs 40% FYA vs WDA 14%/6%, CO2-based car rules, year-1 saving.
- Evidence: ~239 Bing impr, 6 clicks, no on-site tool. Premium: no.

### 7. `sole-trader-vs-ltd` — Sole Trader vs Ltd Comparison
- Full-year comparison at 2026/27 rates (Class 4, dividend 10.75/35.75, employer NIC 15%/£5,000 with EA nuance) → crossover profit level.
- Evidence: ~177 GSC + 16 Bing incorporation-intent. Distinct from take-home calculator (decision tool, not payslip). Premium: no.

### 8. `dividend-tax-2026-27` — Dividend Tax Calculator 2026/27 (Bing play)
- Simple: dividends + other income → tax by band at new FA 2026 rates, allowance £500.
- Evidence: ~745 Bing impr cluster. Google DOMINATED — Bing play. Cheap build (subset of optimiser logic). Premium: no.

### 9. `mileage-claim` — Mileage Reimbursement Calculator (AMAP 55p hook)
- 55p/25p from 2026/27 (changed from 45p — timely), employee reclaim vs employer-paid comparison, NIC treatment.
- Evidence: ~18 Bing + 32 GSC; freshness angle on the rate change. Premium: no.

### 10. `mtd-itsa-readiness` — MTD ITSA Readiness Checker (strategic)
- Income streams + turnover → mandation date (Apr 2026 £50k / Apr 2027 £30k), quarterly-update obligations, software requirement checklist.
- Evidence: thin today (~12 GSC) but mandation wave is live 2026 — demand ramps. Premium: no.

## Skipped
- Standalone BIK company-car-only calculator: covered inside #1.

## Build notes
`GenericTool` configs on shared renderer; builders don't touch registry (per-site integrator wires after); SSR worked-example block on every tool page; no em-dashes in copy.
