# Solicitors — Tool Roster (C1 design, 2026-07-17)

Designed from `TOOL_ROSTER_INPUTS.md` (fresh GSC + first Bing pull 2026-07-17, DataForSEO live-SERP verification). Existing 6 tools stay. Target: 15 (6 existing + 8 new + 1 extension). Builders produce detailed compute spec + worked examples per tool config (FA 2026 ground truth: BADR 18%, dividend 10.75/35.75/39.35, employer NIC 15%/£5,000, WDA 14%, FYA 40%, AMAP 55p); Opus factual QA against HMRC worked examples before commit.

Skipped deliberately: conveyancing fee calculator (SERP DOMINATED — 9/9 tools incl. conveyancingcalculator.co.uk; do not build).

## New tools (priority order)

### 1. `colp-cofa-checker` — COLP/COFA Obligations Checker ★ whitespace
- Purpose: interactive checker — firm details in, personalised COLP/COFA duty list + breach-reporting thresholds out.
- Evidence: ~380 Bing impr ("colp" 188, "cofa" 88); SERP 0/9 tools (CONFIRMED WHITESPACE).
- Fields: firm type, size, ABS y/n, existing appointments, areas of practice. Output: obligations matrix, "reportable vs recordable" guidance, key SRA rule refs.
- Premium: no (checker, lead magnet). Category: SRA Compliance.

### 2. `solicitor-hourly-rate-benchmark` — Hourly Rate & Salary Benchmarker ★ whitespace
- Purpose: benchmark charge-out rate + salary vs guideline hourly rates (gov.uk GHR bands) by grade/region; profitability implication.
- Evidence: ~141 Bing impr ("solicitor hourly rates" 70); SERP 0/9 tools — static tables only.
- Fields: grade (A-D), region/London band, current rate, salary, chargeable hours. Output: GHR comparison, implied recovery rate, salary benchmark range.
- Premium: no. Category: Practice Finance.

### 3. `law-firm-sale-cgt` — Practice Sale CGT / Net Proceeds ★ niche gap
- Purpose: net-of-tax proceeds on selling a firm/partnership interest: goodwill, BADR 18% (post 6 Apr 2026, £1m lifetime), partnership vs Ltd share sale.
- Evidence: "law firm valuation formula uk" 65 GSC; SERP CONTESTED — only generic CGT calcs, none handle goodwill/BADR on partnership interest.
- Fields: structure, sale price split (goodwill/WIP/tangibles), base cost, BADR eligibility+remaining allowance. Premium: YES (gated result detail).

### 4. `vat-disbursements-classifier` — VAT on Disbursements Classifier
- Purpose: agent vs principal classifier per cost line (search fees, counsel, medical records...) → VAT treatment + client-bill presentation.
- Evidence: ~114 Bing impr; SERP CONTESTED (alca.org.uk has a recharge calc; classifier angle open).
- Fields: cost type picker + custom cost questionnaire (who contracted, who used the service). Output: disbursement/recharge verdict + VAT treatment. Premium: no.

### 5. `client-account-interest` — Client Account Interest Estimator
- Purpose: fair-interest-policy estimator: balances/durations in, indicative interest due to clients + de minimis policy sense-check (complements existing `sra-client-account-reserve`).
- Evidence: ~126 combined impr. Fields: avg balance bands, durations, rate policy. Premium: no.

### 6. `partner-tax-reserve` — Partner Tax Reserve Calculator (vertical-essential)
- Purpose: monthly reserve % for a self-employed partner: payments-on-account, Class 4 NIC, pension AA charge risk; profit seasonality aware.
- Evidence: thin direct volume (~10) — build as vertical-essential + content pairing. Premium: no.

### 7. `equity-partner-buyin` — Equity Partner Buy-In Modeller (high intent)
- Purpose: capital contribution funding options (loan vs firm-financed), tax relief on interest, drawings impact, payback horizon.
- Evidence: 10 GSC impr, extremely high commercial intent. Premium: YES.

### 8. `practice-cashflow-runway` — Cashflow Runway Estimator
- Purpose: WIP lockup + debtor days + overheads → months of runway, lockup-reduction sensitivity.
- Evidence: 36 GSC ("law firm cashflow management"). Premium: no.

## Extension
- `solicitor-take-home` gains a **locum/consultant day-rate mode** (day rate × days, sole trader vs Ltd) — seed had weak standalone volume; cheaper as a mode than a tool.

## Build notes
- All tools: `GenericTool` config on shared renderer (`packages/web-shared/tools/`), one config file + page copy per tool; registry wiring done by per-site integrator agent AFTER builds (avoid concurrent registry edits).
- Every tool page: SSR worked-example block (C2 citability) from day one.
