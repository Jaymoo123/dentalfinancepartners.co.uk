# House positions outline — Hospitality (R3)

Date: 2026-07-11. Every citation URL below was fetched live this run and returned 200 with the
expected anchor phrases (`s6_citation_check.py` → `raw/citation_checks.json`; 30/30 pass).
Estate ground-truth memory docs referenced where they bind. No em dashes in user-facing copy
at build time; this outline is internal.

## A. Food & drink VAT (the traffic cluster)

1. **Hot takeaway food is standard-rated (20%); most cold takeaway food is zero-rated**, with
   the "hot" tests (heated for consumption, kept hot, hot packaging, etc.) deciding edge cases.
   [VAT Notice 709/1](https://www.gov.uk/guidance/catering-takeaway-food-and-vat-notice-7091)
2. **Anything consumed on the premises is catering and standard-rated**, including food courts
   and designated seating. [VAT Notice 709/1](https://www.gov.uk/guidance/catering-takeaway-food-and-vat-notice-7091)
3. **Zero-rating for food has carve-outs** (confectionery, crisps/savoury snacks, soft drinks,
   alcohol always 20%). [VAT Notice 701/14](https://www.gov.uk/guidance/food-products-and-vat-notice-70114)
4. **VAT registration is compulsory past £90,000 rolling 12-month taxable turnover**; monitor
   monthly, not at year-end. [Register for VAT](https://www.gov.uk/vat-registration)
5. **Flat Rate Scheme sector rates differ by hospitality trade** (catering incl. restaurants and
   takeaways 12.5%; pubs and hotels have their own categories) and the limited-cost-trader trap
   catches wet-led businesses. [VAT FRS manual FRS7300](https://www.gov.uk/hmrc-internal-manuals/vat-flat-rate-scheme/frs7300),
   [Flat Rate Scheme](https://www.gov.uk/vat-flat-rate-scheme)

## B. Tips, tronc and payroll (the differentiation cluster)

6. **Tips paid through an independent tronc are free of employer AND employee NIC** (income tax
   still due via PAYE); the troncmaster must genuinely control allocation.
   [HMRC E24](https://www.gov.uk/government/publications/e24-tips-gratuities-service-charges-and-troncs)
7. **Since the Employment (Allocation of Tips) Act 2023, 100% of qualifying tips must reach
   workers**, allocated fairly per the statutory Code of Practice, with a written policy and
   records. [Statutory Code of Practice](https://www.gov.uk/government/publications/distributing-tips-fairly-statutory-code-of-practice)
8. **Cash tips kept by staff are the employee's own tax responsibility; employer-distributed
   tips must go through payroll.** [Tips at work](https://www.gov.uk/tips-at-work)
9. **NMW/NLW from 1 April 2026: £12.71 (21+), £10.85 (18-20), £8.00 (under-18/apprentice)** —
   tips can NEVER count toward minimum wage. [NMW rates](https://www.gov.uk/national-minimum-wage-rates)
10. **Employer NIC is 15% above a £5,000 secondary threshold** (estate ground truth
    [[employer_nic_15pc_2025_ground_truth]]; confirmed on both years' pages).
    [Rates and thresholds 2026-27](https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027),
    [2025-26](https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2025-to-2026)
11. **Employment Allowance (£10,500) offsets employer NIC** — material for small kitchens/front
    of house teams. [Claim Employment Allowance](https://www.gov.uk/claim-employment-allowance)
12. **Casual and zero-hours staff are almost always employees for PAYE**, not self-employed;
    misclassification is a hospitality audit staple.
    [Employment status](https://www.gov.uk/employment-status/employee)

## C. Alcohol, licensing and duties (pubs/bars moat)

13. **Buying stock only from AWRS-approved wholesalers is a legal duty** — check the URN;
    buying from unapproved sellers risks penalties and stock seizure.
    [AWRS](https://www.gov.uk/guidance/the-alcohol-wholesaler-registration-scheme-awrs)
14. **Draught relief gives lower duty rates on draught products** — pricing and GP% maths
    should use the current duty table. [Alcohol duty rates](https://www.gov.uk/guidance/alcohol-duty-rates)
15. **A premises licence plus a personal licence/DPS are baseline**; licensing costs are
    deductible trading expenses. [Alcohol licensing](https://www.gov.uk/guidance/alcohol-licensing)
16. **Gaming machines require Machine Games Duty registration before they take a penny.**
    [Machine Games Duty](https://www.gov.uk/guidance/machine-games-duty)

## D. Property costs & rates

17. **Retail, Hospitality and Leisure business rates relief must be actively claimed from the
    council**; the % and cash cap change by year — check the current scheme, never assume
    last year's. [RHL relief](https://www.gov.uk/apply-for-business-rate-relief/retail-hospitality-and-leisure-relief)
18. **Small Business Rate Relief: 100% at RV ≤ £12,000, tapering to £15,000** — many cafes and
    takeaways qualify and don't claim.
    [SBRR](https://www.gov.uk/apply-for-business-rate-relief/small-business-rate-relief)
19. **B&B/guest-house owners letting rooms in their own home may use Rent-a-Room (£7,500)**
    only where it's genuinely their residence; trading as a guest house is a trade, not
    property income. [Rent a Room](https://www.gov.uk/rent-room-in-your-home/the-rent-a-room-scheme)

## E. Structure, tax and compliance

20. **AIA covers up to £1m of kitchen/fit-out plant per year**; post-FA 2026, main-pool WDA is
    14% with a 40% FYA available — capital-allowance sequencing matters for refits (estate
    ground truth [[property_capital_allowances_2026_ground_truth]]).
    [AIA](https://www.gov.uk/capital-allowances/annual-investment-allowance)
21. **Corporation tax: 19% small profits rate to £50k, 25% main rate above £250k, marginal
    relief between.** [CT rates](https://www.gov.uk/corporation-tax-rates)
22. **MTD for Income Tax applies to sole-trader operators from April 2026 (income over £50k)**;
    quarterly digital records are now the floor for unincorporated cafes/takeaways.
    [MTD for Income Tax](https://www.gov.uk/guidance/use-making-tax-digital-for-income-tax)
23. **Cash basis is the default for unincorporated businesses** but accruals usually serves
    stock-heavy hospitality better — an active choice, not a default.
    [Cash basis](https://www.gov.uk/simpler-income-tax-cash-basis)
24. **TOMS applies when a hotel/operator packages bought-in travel elements** (tours, transport
    with rooms): VAT on the margin only, no input VAT recovery on the bought-in elements.
    [VAT Notice 709/5](https://www.gov.uk/guidance/tour-operators-margin-scheme-for-vat-notice-7095)
25. **Register the food business with the local authority at least 28 days before opening
    (free, and unregistered trading is an offence).**
    [Food business registration](https://www.gov.uk/food-business-registration)

## F. Data/asset methodology positions

26. **Hospitality company counts derive from Companies House SIC 55/56 registrations**; the
    index states the self-reported-SIC caveat openly.
    [CH bulk data](https://download.companieshouse.gov.uk/en_output.html),
    [SIC codes](https://resources.companieshouse.gov.uk/sic/),
    [Advanced search API](https://developer-specs.company-information.service.gov.uk/companies-house-public-data-api/reference/search/advanced-company-search)
27. **Dissolution counts are cross-checked against Insolvency Service monthly statistics**
    before any "closures" headline ships.
    [Monthly insolvency statistics](https://www.gov.uk/government/collections/monthly-insolvency-statistics)

Build note: positions 9, 10, 17, 20 carry year-sensitive figures — re-verify at content-write
time per the fresh-data locked rule.
