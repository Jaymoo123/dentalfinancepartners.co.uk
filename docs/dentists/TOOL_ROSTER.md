# Dentists — Tool Roster (C1 design, 2026-07-17)

From `TOOL_ROSTER_INPUTS.md` (fresh GSC + first Bing pull, DataForSEO live-verified). Current: 5 public gallery + 5 premium inline. Target: 14 public. FA 2026 ground truth applies (BADR 18%, employer NIC 15%/£5,000, FYA 40%, dividend 10.75/35.75/39.35); Opus factual QA before commit.

## Zero-build quick wins (registry promotion only)
1. **`practice-purchase`** — promote `practice-purchase-premium` compute to public gallery ("goodwill funding practice purchase" 44 impr; SERP CONTESTED — no accountant-grade EBITDA-cover + goodwill-loan tool).
2. **`practice-sale-cgt`** — promote `practice-sale-premium` to public gallery ★ CONFIRMED WHITESPACE (zero tools in SERP; ~330 GSC impr cluster "selling a dental practice taxes"). First-mover.

## Maintenance (fold into build wave)
3. **FA 2026 rate refresh** on existing tools: `associate-take-home`, `locum-structure`, `principal-extraction`, `uda-value` benchmarks state 2025/26 — recompute to 2026/27 where applicable.

## New tools (priority order)

### 4. `sdr-scotland` — Scotland SDR Remuneration Calculator ★ whitespace, top Bing cluster
- Item-of-service fees from the Statement of Dental Remuneration: treatment mix in → NHS Scotland gross fee estimate, vs England UDA equivalent.
- Evidence: "sdr dental scotland" 73 + "sdr scotland" 41 + "statement of dental remuneration" 29 Bing impr; SERP 0 tools (gov PDFs only). Premium: no.

### 5. `associate-incorporation` — Associate Ltd Incorporation Calculator ★ whitespace
- Sole trader vs Ltd for an associate INCLUDING the NHS Pension consequence (loss of access/type-1 vs type-2, employer-contribution cost inside a Ltd) — the angle no SERP tool has; our article already ranks #5.
- Evidence: "dentist self employed or limited company" 20 GSC pos 21.7; Bing 8 impr / 4 clicks. Premium: YES.

### 6. `nhs-pension-aa-taper` — NHS Pension Annual Allowance Taper (dental)
- Dental-specific adjusted-income build-up (practice profit share, superannuable earnings) → tapered AA, projected AA charge, scheme-pays option.
- Evidence: 25 GSC + 28 Bing impr, 3-8 click queries; SERP CONTESTED — only generic NHS tools (NHS Employers ready reckoner, BMA), none dental. Premium: YES.

### 7. `superannuation-contributions` — NHS Superannuation Earnings & Contribution Calculator
- Superannuable earnings from fee income (associate %, principal net pensionable earnings caps) → tier rate, employee+employer contributions, net cost after relief.
- Evidence: "dentist superannuation uk" 12 impr / 8 clicks (67% CTR); SERP CONTESTED (generic NHSBSA only). Premium: no.

### 8. `equipment-capital-allowance` — Equipment Capital Allowance (FA 2026)
- Chair/CBCT/surgery fit-out: 40% FYA vs AIA vs 14% WDA interaction, year-1 tax saving by structure.
- Evidence: low direct volume, no competitor, date-pegged FA 2026 advantage. Premium: no.

### 9. `practice-owner-income-benchmark` — Practice Owner Income Benchmark
- Practice profile in → owner income benchmark range (NHS/private mix, region, size); ties to queries already ranking.
- Evidence: "dental practice owner salary" 18 impr pos 6.3; "how much does a dental practice owner make uk" 12 impr pos 4.5. Premium: no.

### 10. `dental-tax-deductions` — Dental Tax Deduction Planner
- Checklist-calculator: CPD, indemnity, black book/equipment, courses, travel → estimated deductible total + tax saved at marginal rate.
- Evidence: "tax planning for dentists" 9, "cpd allowance" 7, Bing "black book tax deductible expenses" 6. Premium: no.

## Differentiation note
Associate take-home is DOMINATED (a2zaccounting #3, bonded-dental #6) — do not build a new one; existing tool competes on the NHS Pension layer + 2026/27 refresh (item 3). Practice valuation DOMINATED (samera #1) — existing tool differentiates on NHS/private mix + region, no new build.

## Build notes
Same as solicitors: `GenericTool` configs, builders don't touch registry (integrator wires after), SSR worked-example block on every tool page.
