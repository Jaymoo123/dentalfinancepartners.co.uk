# House positions outline — Care homes + domiciliary care (R3)

Date: 2026-07-11. Every citation URL below was fetched live this run and returned 200 with
the expected anchor phrases (`s6_citation_check.py` → `raw/citation_checks.json`;
**34/34 pass**). Estate ground-truth memory docs referenced where they bind. No em dashes
in user-facing copy at build time; this outline is internal.

## A. VAT — the welfare exemption trap (the differentiation cluster)

1. **Welfare services supplied by a state-regulated provider (CQC-registered) are VAT
   exempt** — which means care businesses usually cannot recover input VAT; exemption is a
   cost, not a perk. [VAT Notice 701/2](https://www.gov.uk/guidance/welfare-services-and-goods-notice-7012)
2. **HMRC's RCB 2/2025 position: VAT-grouping structures designed to convert exempt welfare
   supplies into taxable ones for input-recovery are under active challenge** — any
   care-group VAT planning must be built on this brief, not on pre-2025 scheme marketing.
   [RCB 2/2025](https://www.gov.uk/government/publications/revenue-and-customs-brief-2-2025-the-use-of-vat-grouping-within-the-care-industry/use-of-vat-grouping-within-the-care-industry)
3. **VAT registration is only compulsory past £90,000 of TAXABLE turnover** — exempt care
   fees don't count toward the threshold, so many providers with mixed income are
   registerable later than they think (or not at all). [Register for VAT](https://www.gov.uk/vat-registration)
4. **Mixed taxable/exempt providers must run partial exemption** (de minimis limits decide
   whether any input VAT comes back). [VAT Notice 706](https://www.gov.uk/guidance/partial-exemption-vat-notice-706)

## B. Workforce pay — sleep-ins, travel time, NMW (the domiciliary moat)

5. **Sleep-in shifts: only time awake for the purposes of working counts for NMW** — settled
   by the Supreme Court in Royal Mencap Society v Tomlinson-Blake.
   [UKSC 2018/0160](https://www.supremecourt.uk/cases/uksc-2018-0160),
   [Calculating the minimum wage: working hours](https://www.gov.uk/guidance/calculating-the-minimum-wage/working-hours-for-which-the-minimum-wage-must-be-paid)
6. **Travel time between care calls is working time for NMW** — the classic domiciliary
   underpayment; rota + mileage systems must price it in.
   [Calculating the minimum wage: working hours](https://www.gov.uk/guidance/calculating-the-minimum-wage/working-hours-for-which-the-minimum-wage-must-be-paid)
7. **Current NMW/NLW bands (21+ NLW headline) are the pay floor for the sector's dominant
   cost line**; every fee negotiation starts from them.
   [NMW rates](https://www.gov.uk/national-minimum-wage-rates)
8. **Mileage: AMAP 45p/25p now; rises to 55p for the first 10k miles from 6 April 2026**
   (estate ground truth [[amap_mileage_55p_2026_ground_truth]]).
   [Business travel mileage](https://www.gov.uk/expenses-and-benefits-business-travel-mileage)
9. **Carers engaged as "self-employed" are almost always employees/workers in substance** —
   status misclassification is the sector's standing PAYE/NMW audit risk (pool cluster
   "self employed vs employed carers status risk"). Anchor to the working-hours guidance
   plus employment-status pages at write time.

## C. Employer costs & payroll

10. **Employer NIC is 15% above a £5,000 secondary threshold** (estate ground truth
    [[employer_nic_15pc_2025_ground_truth]]; confirmed on both years' pages).
    [Rates and thresholds 2026-27](https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027),
    [2025-26](https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2025-to-2026)
11. **Employment Allowance (£10,500) offsets employer NIC** — material for small agencies
    and single-home operators. [Claim Employment Allowance](https://www.gov.uk/claim-employment-allowance)

## D. Sponsored workforce (post-2025 compliance cluster)

12. **The Health and Care Worker visa defines who can be sponsored for care roles** — route
    eligibility, salary floors and the care-worker-specific rules move often; pages must be
    dated. [Health and Care Worker visa eligibility](https://www.gov.uk/health-care-worker-visa/eligibility)
13. **Sponsoring carers requires a sponsor licence, with real ongoing HR/record duties and
    fees** — a cost-per-sponsored-worker line providers routinely underestimate.
    [UK visa sponsorship for employers](https://www.gov.uk/uk-visa-sponsorship-employers)

## E. Buying, building and selling care businesses

14. **Annual Investment Allowance: £1m, permanent** — most care-home fit-out plant is fully
    relievable in year one. [AIA](https://www.gov.uk/capital-allowances/annual-investment-allowance)
15. **Beyond AIA: main-rate writing-down allowances apply** (18%→14% + new 40% FYA from FA
    2026, estate ground truth [[property_capital_allowances_2026_ground_truth]]).
    [Rates and pools](https://www.gov.uk/work-out-capital-allowances/rates-and-pools)
16. **Structures & Buildings Allowance: 3% straight-line on qualifying construction** — new
    builds and extensions of homes qualify. [SBA](https://www.gov.uk/guidance/claiming-capital-allowances-for-structures-and-buildings)
17. **Corporation tax: 25% main rate / small profits rate 19% with marginal relief between**
    — group structures (propco/opco) change the arithmetic.
    [CT rates](https://www.gov.uk/corporation-tax-rates)
18. **Selling: Business Asset Disposal Relief on the first £1m of qualifying lifetime gains**
    — conditions bite on propco/opco splits. [BADR](https://www.gov.uk/business-asset-disposal-relief)
19. **CGT headline rate 24% for higher-rate payers** — the BADR-vs-not delta is the sale
    conversation. [CGT rates](https://www.gov.uk/capital-gains-tax/rates)
20. **Care homes pay business rates; small business rate relief only below £15,000 RV
    (full below £12,000)** — most homes are above it, domiciliary offices often below.
    [SBRR](https://www.gov.uk/apply-for-business-rate-relief/small-business-rate-relief),
    [Introduction to business rates](https://www.gov.uk/introduction-to-business-rates)

## F. CQC — the regulator's money paperwork

21. **CQC registration is mandatory before providing regulated activities** — and the
    application has a financial leg. [CQC registration](https://www.cqc.org.uk/guidance-providers/registration)
22. **New providers must submit a financial viability statement (CQC's own template),
    normally signed by an accountant** — a productised service opportunity (a rival sells
    it; see CALCULATORS.md). [FVS template](https://www.cqc.org.uk/guidance-regulation/registration/supporting-documents-provider/document/financial-viability-template)
23. **Large corporate providers sit in CQC market oversight** — financial distress
    monitoring is a regulatory reality the content can cite for the sector-risk narrative.
    [Market oversight](https://www.cqc.org.uk/guidance-providers/market-oversight-corporate-providers/market-oversight-adult-social-care)
24. **CQC publishes reusable provider data** — basis of the data asset.
    [Using CQC data](https://www.cqc.org.uk/about-us/transparency/using-cqc-data)

## G. Funding mix (who actually pays the fees)

25. **NHS-funded nursing care is a flat weekly NHS payment to nursing homes (£267.68
    standard rate announced for 2025-26)** — providers must account for it separately from
    LA and self-funder income. [FNC rate announcement](https://www.gov.uk/government/news/better-community-care-thanks-to-nursing-funding-boost)
26. **NHS continuing healthcare follows the national framework** — CHC-funded residents
    change the VAT/fee analysis entirely.
    [CHC national framework](https://www.gov.uk/government/publications/national-framework-for-nhs-continuing-healthcare-and-nhs-funded-nursing-care)
27. **Local-authority fee setting sits inside the Care Act statutory guidance and the
    market sustainability regime** — the "fair cost of care" paper trail is the provider's
    negotiation ammunition.
    [Care Act statutory guidance](https://www.gov.uk/government/publications/care-act-statutory-guidance/care-and-support-statutory-guidance),
    [Market Sustainability and Improvement Fund](https://www.gov.uk/government/publications/market-sustainability-and-improvement-fund-2024-to-2025)

## H. Admin regimes

28. **MTD for Income Tax starts at £50,000 of sole-trader/landlord income (April 2026),
    £30,000 April 2027** — catches owner-operated agencies and single homes held
    personally. [MTD for IT](https://www.gov.uk/guidance/find-out-if-and-when-you-need-to-use-making-tax-digital-for-income-tax)

## Data-asset source citations (verified, listed in DATA_ASSET.md)

29. CH bulk snapshot [download.companieshouse.gov.uk](https://download.companieshouse.gov.uk/en_output.html);
    SIC table incl. 87xxx [resources.companieshouse.gov.uk/sic](https://resources.companieshouse.gov.uk/sic/);
    Insolvency Service monthly stats [collection](https://www.gov.uk/government/collections/monthly-insolvency-statistics);
    Skills for Care state-of-the-sector [report page](https://www.skillsforcare.org.uk/Adult-Social-Care-Workforce-Data/Workforce-intelligence/publications/national-information/The-state-of-the-adult-social-care-sector-and-workforce-in-England.aspx).
