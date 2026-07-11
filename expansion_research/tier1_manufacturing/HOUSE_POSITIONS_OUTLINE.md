# House positions outline — Manufacturing & engineering accountancy (R3)

Date: 2026-07-12. Every citation URL below was fetched live this run and returned 200 with
the expected anchor phrases (`s6_citation_check.py` → `raw/citation_checks.json`;
**34/34 pass, 0 phrase misses**). Estate ground-truth memory docs referenced where they
bind. No em dashes in user-facing copy at build time; this outline is internal.

## A. Capital allowances — plant & machinery (the differentiation cluster)

1. **FA 2026 cut the main-rate writing-down allowance from 18% to 14%** (s.28) — every
   "18% WDA" page on the web is now stale; a launch site can be right where incumbents are
   wrong. [FA 2026 s.28 (enacted)](https://www.legislation.gov.uk/ukpga/2026/11/section/28/enacted)
   (estate ground truth [[property_capital_allowances_2026_ground_truth]])
2. **FA 2026 introduced a new 40% first-year allowance** (s.29) for expenditure not
   qualifying for full expensing. Scope asymmetry (checker-verified against s.45U /
   s.46(4B)): plant must be **unused and not second-hand**; qualifying **leased** plant
   IS permitted where the lessee uses it wholly/mainly to earn taxable income. State
   this asymmetry explicitly at write time — never imply second-hand may qualify.
   [FA 2026 s.29 (enacted)](https://www.legislation.gov.uk/ukpga/2026/11/section/29/enacted)
3. **Full expensing: companies deduct 100% of qualifying new main-rate plant & machinery
   in year one** — for most factory kit this beats everything else; ordering vs AIA
   matters for special-rate assets.
   [Full expensing](https://www.gov.uk/capital-allowances/full-expensing)
4. **AIA is £1 million** and remains the route for unincorporated manufacturers and
   special-rate spend. [Annual Investment Allowance](https://www.gov.uk/capital-allowances/annual-investment-allowance)
5. **Special rate pool stays 6%** (integral features, long-life assets — common in factory
   fit-outs); the main-rate/special-rate split on a fit-out invoice is where claims are
   won. [Rates and pools](https://www.gov.uk/work-out-capital-allowances/rates-and-pools)
6. **Structures and Buildings Allowance: 3% straight-line on the factory building itself**
   — the non-P&M remainder of a factory build/purchase is not relief-dead.
   [SBA](https://www.gov.uk/guidance/claiming-capital-allowances-for-structures-and-buildings)

## B. R&D relief + Patent Box (the innovation cluster — police the contractors-ir35 wall)

7. **R&D relief is now the merged expenditure-credit scheme** (accounting periods from
   1 Apr 2024) with an enhanced intensive-SME route; legacy SME-scheme content is stale.
   [Merged scheme / RDEC](https://www.gov.uk/guidance/corporation-tax-research-and-development-tax-relief-for-large-companies),
   [R&D relief overview](https://www.gov.uk/guidance/corporation-tax-research-and-development-rd-relief)
8. **Claim notification: first-time (or lapsed 3-year) claimants must notify HMRC within
   6 months of period end or the claim dies** — the single most missed deadline in
   manufacturing R&D. [Claim notification](https://www.gov.uk/guidance/tell-hmrc-that-youre-planning-to-claim-research-and-development-rd-tax-relief)
9. **Process/production-line improvement can qualify as R&D** (advance in science or
   technology, not just new products) — but HMRC compliance activity is high; claims need
   contemporaneous technical narratives, not boutique percentage promises. Anchor to the
   overview page (cited at 7).
10. **Patent Box taxes patent-attributable profits at an effective 10%** vs 25% main rate —
    chronically underclaimed by SMEs that hold even one qualifying patent.
    [Patent Box](https://www.gov.uk/guidance/corporation-tax-the-patent-box)
11. **Adjacency wall: generic R&D and IR35/contractor R&D content belongs to
    contractors-ir35** — this site writes R&D ONLY with a manufacturing/engineering
    qualifier (s5 pipeline flags unqualified R&D terms; enforced at topic selection).

## C. Corporation tax & profit extraction

12. **CT: 25% main rate, small profits rate 19% with marginal relief between £50k-£250k**
    — capital-allowance timing interacts with the marginal band for factory investment.
    [CT rates](https://www.gov.uk/corporation-tax-rates)
13. **Dividend rates 2026/27: 10.75% / 35.75% / 39.35% (FA 2026 s.4), allowance £500** —
    owner-manager extraction maths (estate ground truth [[dividend_rates_2026_ground_truth]]).
    [FA 2026 s.4 (enacted)](https://www.legislation.gov.uk/ukpga/2026/11/section/4/enacted),
    [Tax on dividends](https://www.gov.uk/tax-on-dividends)

## D. Factory payroll & workforce

14. **Employer NIC is 15% above a £5,000 secondary threshold** (estate ground truth
    [[employer_nic_15pc_2025_ground_truth]]; confirmed on both years' pages).
    [Rates and thresholds 2026-27](https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027),
    [2025-26](https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2025-to-2026)
15. **Employment Allowance (£10,500) offsets employer NIC** — material for small workshops.
    [Claim Employment Allowance](https://www.gov.uk/claim-employment-allowance)
16. **NMW/NLW bands (21+ NLW headline) floor the shop-floor pay line**; shift premiums and
    piece-rate rules sit on top. [NMW rates](https://www.gov.uk/national-minimum-wage-rates)
17. **Apprenticeship levy: 0.5% of paybill above £3m** — and levy-funded apprenticeships
    are the sector's standing skills subsidy below it.
    [Pay Apprenticeship Levy](https://www.gov.uk/guidance/pay-apprenticeship-levy)
18. **Mileage: AMAP 45p/25p now; rises to 55p for the first 10k miles from 6 April 2026**
    (estate ground truth [[amap_mileage_55p_2026_ground_truth]]) — service engineers on the
    road are the manufacturing angle.
    [Business travel mileage](https://www.gov.uk/expenses-and-benefits-business-travel-mileage)

## E. VAT, exports & customs (the exporter cluster)

19. **VAT registration is compulsory past £90,000 taxable turnover.**
    [Register for VAT](https://www.gov.uk/vat-registration)
20. **Exports of goods are zero-rated with evidence-of-export conditions** (VAT Notice 703)
    — zero-rated is not exempt: input VAT stays recoverable.
    [VAT Notice 703](https://www.gov.uk/guidance/vat-on-goods-exported-from-the-uk-notice-703)
21. **Postponed import VAT accounting: account for import VAT on the return instead of
    paying at the border** — cash-flow default for importing manufacturers.
    [Postponed VAT accounting](https://www.gov.uk/guidance/check-when-you-can-account-for-import-vat-on-your-vat-return)
22. **Inward processing relief suspends duty/VAT on goods imported for processing and
    re-export** — core relief for contract manufacturers; authorisation required.
    [Inward processing](https://www.gov.uk/guidance/using-inward-processing-to-process-or-repair-your-goods)
23. **UK CBAM starts 1 January 2027** on imported carbon-intensive goods (iron/steel,
    aluminium, cement, fertiliser, hydrogen) — importers of these inputs get a new tax
    with accounting obligations; first-mover content space (no accountant owns it yet).
    [CBAM factsheet](https://www.gov.uk/government/publications/factsheet-carbon-border-adjustment-mechanism-cbam/factsheet-carbon-border-adjustment-mechanism)

## F. Stock, WIP & accounts

24. **Stock and WIP are measured under FRS 102** (cost incl. attributable overheads vs
    estimated selling price less costs to complete/sell) — absorption choices move both
    the balance sheet and the tax line; year-end WIP judgment is a specialist wedge.
    [FRS 102 (FRC)](https://www.frc.org.uk/library/standards-codes-policy/accounting-and-reporting/uk-accounting-standards/frs-102/)

## G. Premises & energy costs

25. **Business rates are levied on the factory's rateable value**; plant in the hereditament
    can affect it — the rates/CA boundary is a manufacturing-specific trap.
    [Business rates](https://www.gov.uk/introduction-to-business-rates)
26. **Energy-intensive industries can claim compensation for indirect UK ETS/CPS carbon
    costs in electricity prices** — sub-sector-specific relief most eligible SMEs never
    claim. [UK ETS/CPS compensation guidance](https://www.gov.uk/government/publications/uk-emissions-trading-scheme-and-carbon-price-support-apply-for-compensation/compensation-for-the-indirect-costs-of-the-uk-ets-and-the-cps-mechanism-guidance-for-applicants)

## H. Selling / succession

27. **Business Asset Disposal Relief on the first £1m of qualifying gains** — check the
    current BADR rate at write time (rate has been stepping up).
    [BADR](https://www.gov.uk/business-asset-disposal-relief)
28. **CGT rates (24% higher-rate on most gains)** frame the exit maths beyond the BADR
    band. [CGT rates](https://www.gov.uk/capital-gains-tax/rates)

## I. Compliance calendar

29. **MTD for Income Tax applies from £50,000 (April 2026), then £30,000 (April 2027)** —
    relevant to unincorporated engineering sole traders.
    [MTD for Income Tax](https://www.gov.uk/guidance/find-out-if-and-when-you-need-to-use-making-tax-digital-for-income-tax)

## Data-asset feasibility citations (fetched live, see DATA_ASSET.md)

30. [CH bulk snapshot](https://download.companieshouse.gov.uk/en_output.html) (200)
31. [SIC code table — divisions 10-33 + 71121](https://resources.companieshouse.gov.uk/sic/) (200)
32. [Monthly insolvency statistics](https://www.gov.uk/government/collections/monthly-insolvency-statistics) (200)
33. [ONS manufacturing hub](https://www.ons.gov.uk/businessindustryandtrade/manufacturingandproductionindustry) (200)

(Citation count: 34 distinct URLs across positions + data-asset = the 34/34 checked set.)
