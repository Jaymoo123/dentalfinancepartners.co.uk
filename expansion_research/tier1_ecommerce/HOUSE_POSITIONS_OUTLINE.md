# House positions outline — Ecommerce / Amazon sellers (R3)

Date: 2026-07-12. Every citation URL below was fetched live this run and returned 200 with
the expected anchor phrases (`s6_citation_check.py` → `raw/citation_checks.json`;
**32/32 pass, all anchor phrases found**). Estate ground-truth memory docs referenced where
they bind. No em dashes in user-facing copy at build time; this outline is internal.

## A. VAT — registration, schemes, and the marketplace layer (the differentiation cluster)

1. **VAT registration is compulsory past £90,000 taxable turnover in any rolling 12
   months** — for marketplace sellers "turnover" is gross sales, not Amazon payouts; sellers
   watching their bank deposits systematically under-count.
   [Register for VAT](https://www.gov.uk/vat-registration)
2. **Overseas-established sellers have NO threshold: an online marketplace becomes the
   deemed supplier and collects UK VAT on their sales; UK-established sellers on the same
   marketplace remain liable themselves.** Establishment status is therefore the single
   most consequential VAT fact for a marketplace seller, and HMRC challenges "UK shell"
   establishment claims.
   [VAT and overseas goods sold via online marketplaces](https://www.gov.uk/guidance/vat-and-overseas-goods-sold-to-customers-in-the-uk-using-online-marketplaces)
3. **Imports ≤£135 sold directly to UK consumers: supply VAT is due at the point of sale
   (seller registers for UK VAT), not import VAT at the border** — the rule that catches
   dropshippers shipping from China.
   [VAT and overseas goods sold directly to UK customers](https://www.gov.uk/guidance/vat-and-overseas-goods-sold-directly-to-customers-in-the-uk)
4. **Postponed import VAT accounting lets VAT-registered importers declare and recover
   import VAT on the same return** — cash-flow default for any FBA seller importing stock.
   [Account for import VAT on your VAT return](https://www.gov.uk/guidance/check-when-you-can-account-for-import-vat-on-your-vat-return)
5. **Exports of goods from the UK are zero-rated with evidence requirements** (Notice 703) —
   zero-rated ≠ exempt; exports still count as taxable turnover and preserve input recovery.
   [VAT on goods exported from the UK](https://www.gov.uk/guidance/vat-on-goods-exported-from-the-uk-notice-703)
6. **Marketplace/software fees billed from abroad are reverse-charge services**: the seller
   self-accounts for UK VAT, and reverse-charge turnover counts toward the £90k registration
   threshold — the classic surprise registration trigger for sub-threshold sellers.
   [Place of supply of services, Notice 741A](https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a)
7. **Flat Rate Scheme is usually wrong for goods sellers**: the limited-cost-trader 16.5%
   rate and the loss of input VAT on stock purchases typically make FRS a false economy for
   ecommerce; model before electing.
   [VAT Flat Rate Scheme](https://www.gov.uk/vat-flat-rate-scheme)
8. **Second-hand margin scheme**: resellers (refurb, vintage, used goods) can pay VAT on the
   margin, not the sale price, with record-keeping conditions.
   [VAT margin schemes](https://www.gov.uk/vat-margin-schemes)

## B. Selling into the EU post-Brexit (the cross-border cluster)

9. **IOSS: consignments ≤€150 into the EU can be handled through a single Import One Stop
   Shop registration; UK businesses generally need an EU intermediary.** Cite HMRC's IOSS
   registration guidance as the UK-side anchor.
   [Check if you can register for IOSS](https://www.gov.uk/guidance/check-if-you-can-register-for-the-vat-import-one-stop-shop-scheme)
10. **OSS Union scheme applies to Northern Ireland→EU distance sales above the £8,818
    (€10,000) threshold** — GB sellers do not distance-sell under OSS; NI's dual status is
    the exception, and getting GB/NI treatment mixed up is a standing error in rival content.
    [Register for OSS Union scheme (NI→EU distance sales)](https://www.gov.uk/guidance/register-to-report-and-pay-vat-on-distance-sales-of-goods-from-northern-ireland-to-the-eu)
    *Checker flag 2026-07-12: the cited page passes both anchor phrases but does NOT carry
    the £8,818/€10,000 figure — add a second citation for the threshold at build time.*
11. **An EORI number is required to import or export goods** (GB EORI; XI EORI for NI
    movements). [Get an EORI number](https://www.gov.uk/eori)

## C. HMRC visibility — platform reporting + side hustles (the timely cluster)

12. **Digital platforms (Amazon, eBay, Etsy, Vinted, Airbnb...) must report seller income
    to HMRC under the OECD model rules** — first reports January 2025 covering 2024; "HMRC
    can't see my marketplace sales" is dead.
    [Reporting rules for digital platforms](https://www.gov.uk/guidance/reporting-rules-for-digital-platforms)
13. **The reporting threshold (30 sales / €2,000) is NOT a tax threshold** — tax liability
    follows trading status, not the platform-report trigger; both directions of confusion
    (panic and complacency) are addressable.
    [Check if you need to tell HMRC about income from online platforms](https://www.gov.uk/guidance/check-if-you-need-to-tell-hmrc-about-your-income-from-online-platforms)
14. **£1,000 trading allowance**: gross trading income ≤£1,000 needs no return; above it,
    the allowance can replace actual expenses — usually a bad swap for goods sellers with
    real COGS. [Trading and property allowances](https://www.gov.uk/guidance/tax-free-allowances-on-property-and-trading-income)

## D. Structure, income tax and MTD

15. **MTD for Income Tax starts April 2026 for sole traders with qualifying income over
    £50,000** (then £30,000 April 2027) — quarterly digital records hit the sole-trader
    seller cohort first.
    [Check if MTD for Income Tax applies](https://www.gov.uk/guidance/find-out-if-and-when-you-need-to-use-making-tax-digital-for-income-tax)
16. **Cash basis is the default for unincorporated businesses** — but stock-heavy sellers
    often get better decision data (and smoother taxable profits) from accruals + proper
    inventory accounting; choosing is an active decision.
    [Cash basis](https://www.gov.uk/simpler-income-tax-cash-basis)
17. **Stock must be valued at the lower of cost and net realisable value at year end**
    (accruals) — the COGS/inventory position underpinning every "why is my taxable profit
    higher than my bank balance" page.
    [BIM33115 — stock valuation](https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim33115)
18. **Corporation tax: 25% main rate, 19% small profits rate with marginal relief between
    £50k and £250k** — the sole-trader-vs-company crossover maths for sellers.
    [Corporation Tax rates](https://www.gov.uk/corporation-tax-rates)
19. **Dividend rates for 2026/27 are 10.75% / 35.75% / 39.35%** (FA 2026 s.4; estate ground
    truth [[dividend_rates_2026_ground_truth]]) — all extraction comparisons must use the
    new ordinary/upper rates, not the 8.75%/33.75% figures still common in rival content.
    [FA 2026 s.4](https://www.legislation.gov.uk/ukpga/2026/11/section/4/enacted),
    [Tax on dividends](https://www.gov.uk/tax-on-dividends)

## E. Capital allowances & employer costs (FA 2026 ground truth)

20. **AIA £1m** covers almost all seller capex (racking, packing lines, hardware).
    [Annual Investment Allowance](https://www.gov.uk/capital-allowances/annual-investment-allowance)
21. **FA 2026: main-rate WDA falls 18%→14% (s.28) and a new 40% first-year allowance
    arrives (s.29); special rate stays 6%** (estate ground truth
    [[property_capital_allowances_2026_ground_truth]]).
    [FA 2026 s.28](https://www.legislation.gov.uk/ukpga/2026/11/section/28/enacted),
    [FA 2026 s.29](https://www.legislation.gov.uk/ukpga/2026/11/section/29/enacted),
    [Rates and pools](https://www.gov.uk/work-out-capital-allowances/rates-and-pools)
22. **Employer NIC is 15% above a £5,000 secondary threshold** (estate ground truth
    [[employer_nic_15pc_2025_ground_truth]]) — relevant the moment a seller hires a VA,
    picker or first employee.
    [Rates and thresholds 2026-27](https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027)
23. **Employment Allowance £10,500** offsets employer NIC for eligible employers.
    [Claim Employment Allowance](https://www.gov.uk/claim-employment-allowance)
24. **Mileage: AMAP 45p/25p now; rises to 55p for the first 10k miles from 6 April 2026**
    (estate ground truth [[amap_mileage_55p_2026_ground_truth]]) — car-boot sourcing runs,
    post-office trips.
    [Business travel mileage](https://www.gov.uk/expenses-and-benefits-business-travel-mileage)

## F. Exit

25. **Business Asset Disposal Relief (lifetime £1m) on selling a trading company** — FBA
    business sales via aggregators/brokers are share or asset deals with very different tax
    outcomes. [BADR](https://www.gov.uk/business-asset-disposal-relief)

## Positions needing their own s6 pass at build time (not yet cited — flagged, not asserted)

- Amazon's 2024 Luxembourg→UK billing entity switch (VAT now charged on UK sellers' Amazon
  fees; reverse-charge treatment changed): major practical topic, but the authority is
  Amazon seller documentation, not gov.uk — needs a careful citation strategy.
- EU establishment/fiscal-representative requirements per member state (DE/FR packaging
  laws, EPR): EU-side sources, out of gov.uk scope; partner with the cross-border VAT
  layer's public docs or cite EU official sources at build.
- Vinted/Depop-style "is my decluttering trading?" badge-of-trade analysis: cite HMRC BIM
  badges-of-trade manual pages at build.
