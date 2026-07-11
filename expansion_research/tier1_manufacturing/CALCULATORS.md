# Calculator candidates — Manufacturing & engineering (R3)

Date: 2026-07-12. Pattern: property calculator fleet (config-driven, 1 file + 1 import per
tool). **No volumes/KD this run (zero DataForSEO)** — launch-tier ordering is precedent-
and gap-based and must be re-scored with the paid pulls (DOSSIER.md TODO). All cited rates
verified live via `s6_citation_check.py` (34/34 pass).

## Rival tool precedent (verified this run)

- **depreciationscalculator.co.uk** — standalone "HMRC Capital Allowances Calculator" tool
  site that ranked in our capital-allowances sweep queries (fetched 200, 29 mfg-family
  mentions). Direct proof of calculator-shaped demand on the plant & machinery family with
  no accountancy-firm owner.
- **R&D boutiques run calculators as their primary lead magnet**: tbat.co.uk
  (/rd-tax-credit-calculator/, fetched), randduk.com (/r-and-d-tax-credit-calculator/,
  fetched), momentumtaxgroup.com (/rd-tax-credit, fetched). The R&D calculator space is
  CROWDED — an accountancy site should not lead with it.
- **No rival tool exists anywhere in the verified set** for: product costing / job costing,
  true machine-hour rate, WIP/stock valuation, CBAM exposure, or make-vs-buy — the
  dedicated rival (skynetaccounting) sells "Product Costing Accountant" as a service in
  prose only.
- Autocomplete surfaced live calculator-shaped strings (`raw/autocomplete_raw.json`,
  quoted verbatim): "annual investment allowance calculator", "cbam calculator",
  "manufacturing overhead rate calculator", "stock valuation calculator",
  "patent box deduction calculation", "how to calculate work in progress accounting",
  "production payroll calculator", "manufacturing business valuation calculator".

## Launch tier (build with the site)

1. **Plant & machinery capital allowances planner** — spend, asset class, company/
   unincorporated → optimal split across AIA £1m (verified), full expensing 100%
   (gov.uk/capital-allowances/full-expensing, verified), 40% FYA + WDA 18%→14% from
   FA 2026 s.28/s.29 (legislation.gov.uk fetched live, estate ground truth), special rate
   6%, SBA 3% (verified) → first-year and 5-year tax-relief profile. The only rival tool
   (depreciationscalculator.co.uk) is a thin standalone; no accountancy firm owns this.
2. **True machine-hour / product costing calculator** — machine cost, useful life, energy,
   labour (NLW £12.71 21+ verified; employer NIC 15% above £5,000 verified; pension),
   overheads, utilisation → machine-hour rate and per-unit cost vs quoted price. Zero
   rival tools; this is the dedicated rival's flagship SERVICE, made interactive.
3. **Factory payroll cost calculator** — headcount by role, shift premiums, employer NIC
   15%/£5,000 + Employment Allowance £10,500 (verified), apprenticeship levy 0.5% above
   £3m paybill (verified), pension → true employment cost per head and per production hour.

## Queue tier

4. **R&D relief estimator (merged scheme)** — qualifying spend → expenditure credit value,
   with the claim-notification 6-month deadline flag (all three gov.uk R&D pages verified).
   Queue not launch: the boutiques own this SERP with dedicated tools; ship only with the
   content moat around it.
5. **Patent Box benefit estimator** — IP-attributable profits → 10% rate saving vs 25%/
   small-profits CT (both verified). No SME-facing rival tool seen; small head demand.
6. **WIP & stock valuation helper (FRS 102)** — raw materials, labour, overhead absorption
   → period-end stock/WIP value and margin effect (FRC FRS 102 page verified). Educational
   pull; converts the standard-costing/overhead query family the software sites own.
7. **CBAM exposure checker** — imported inputs (iron/steel, aluminium, cement, fertiliser,
   hydrogen), volumes → in/out of scope from 1 Jan 2027 + registration flag (gov.uk CBAM
   factsheet verified). First-mover: only carbon-software firms (CarbonChain) own it.
8. **Selling a manufacturing business: CGT & BADR estimator** — proceeds, base cost, BADR
   eligibility → tax at 24% vs BADR rate on the first £1m (both pages verified).
9. **VAT registration threshold tracker** — rolling 12-month taxable turnover vs £90,000
   (verified); cheap port of estate logic.

## Rejected

- **R&D calculator as launch-tier** — contradicts the verified field: ForrestBrown,
  EmpowerRD, randd, TBAT, Momentum all lead with one; a new site cannot win that SERP
  at launch and the adjacency wall with contractors-ir35 R&D content needs policing first.
- **Machinery/asset valuation calculator** — valuer/broker territory (Eton Venture
  Services seen in sweep); take the tax side (tools 1, 8), not the valuation.
- **Business loan / asset-finance repayment calculator** — lender territory (Tide,
  Swoop own it), off the accountancy funnel.
- **Import duty calculator** — needs the full tariff schedule (10,000+ commodity codes);
  gov.uk's own trade-tariff tool is canonical. CBAM checker (7) takes the winnable slice.
