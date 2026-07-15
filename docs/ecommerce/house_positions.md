# Ecommerce sellers, house positions (locked figures and framings)

Locked at pre-launch build (2026-07-15), produced from `expansion_research/tier1_ecommerce/HOUSE_POSITIONS_OUTLINE.md`. Every load-bearing figure, date and threshold below was re-verified against its live source on **2026-07-15** during this producer pass. Positions that could NOT be fully verified are flagged inline rather than asserted. A separate checker pass will re-verify all citation URLs.

These are the positions every page, calculator and blog on the ecommerce site must be internally consistent on. Do not change a figure without updating every location it appears.

**Default jurisdiction: UK-wide tax, England examples.** Great Britain and Northern Ireland diverge sharply on VAT for goods movements (NI's dual EU/UK status); these are flagged explicitly, never silently mixed. Scotland and Wales follow UK-wide tax on the matters covered here.

If a page hits a factual conflict with a competitor source, flag it for the orchestrator; do not unilaterally re-frame.

---

## A. VAT: registration, schemes and the marketplace layer (the differentiation cluster)

**1. VAT registration is compulsory once taxable turnover exceeds £90,000 in any rolling 12-month period; for marketplace sellers "turnover" is gross sales, not the platform payout.**
The £90,000 test bites on gross taxable sales, not on the net amount deposited by Amazon, eBay or Etsy after their fees. Sellers who watch their bank deposits systematically under-count and register late. There is also a forward-look test: registration is required if taxable turnover is expected to exceed £90,000 in the next 30 days alone.
,  https://www.gov.uk/vat-registration (verified 2026-07-15: £90,000 rolling 12-month threshold confirmed; gross taxable turnover basis confirmed)

**2. Overseas-established sellers have no registration threshold: on an online marketplace the marketplace is the deemed supplier and collects UK VAT; UK-established sellers on the same marketplace remain liable themselves.**
Where a seller is not established in the UK and sells through an online marketplace to UK customers, the marketplace is liable to account for the UK VAT on those sales. UK-established sellers are outside this deemed-supply mechanism and remain responsible for their own VAT. Establishment status is therefore the single most consequential VAT fact for a marketplace seller, and HMRC actively challenges "UK shell" establishment claims by overseas businesses.
,  https://www.gov.uk/guidance/vat-and-overseas-goods-sold-to-customers-in-the-uk-using-online-marketplaces (verified 2026-07-15: marketplace as deemed supplier for non-UK-established sellers confirmed; no mandatory threshold for overseas sellers confirmed; UK-established sellers remain liable confirmed)

**3. Imports of £135 or less sold directly to UK consumers: supply VAT is due at the point of sale, not import VAT at the border.**
For consignments of goods with a value of £135 or less that are outside the UK and sold directly to UK customers (not through an online marketplace), the seller must register for UK VAT and charge and account for supply VAT at the point of sale, rather than import VAT arising at the border. This is the rule that catches dropshippers shipping low-value goods direct from overseas. Where the same sale goes through an online marketplace, the marketplace accounts for the VAT instead (see position 2).
,  https://www.gov.uk/guidance/vat-and-overseas-goods-sold-directly-to-customers-in-the-uk (verified 2026-07-15: £135 threshold confirmed; supply VAT at point of sale rather than import VAT at border confirmed)

**4. Postponed import VAT accounting lets VAT-registered importers declare and recover import VAT on the same return.**
Postponed VAT accounting (PVA) allows a VAT-registered importer to account for import VAT on the VAT return rather than paying it at the border and reclaiming later. For an FBA seller importing stock this is the cash-flow default and removes a border VAT cash outflow.
,  https://www.gov.uk/guidance/check-when-you-can-account-for-import-vat-on-your-vat-return (verified 2026-07-15: postponed import VAT accounting on the VAT return confirmed for VAT-registered importers)

**5. Exports of goods from the UK are zero-rated with evidence requirements (Notice 703); zero-rated is not the same as exempt.**
Exports of goods out of the UK can be zero-rated where the seller holds valid evidence of export within the required time limits. Zero-rated supplies still count as taxable turnover and preserve the right to recover input VAT, unlike exempt supplies which do not. Pages must never conflate zero-rated exports with VAT exemption.
,  https://www.gov.uk/guidance/vat-on-goods-exported-from-the-uk-notice-703 (verified 2026-07-15: zero-rating of exports with evidence requirements confirmed under Notice 703)

**6. Marketplace and software fees billed from abroad are reverse-charge services; the seller self-accounts for UK VAT and that reverse-charge value counts toward the £90,000 registration threshold.**
Where a UK business buys marketplace, advertising or software services from a supplier established abroad, the place of supply is the UK and the customer self-accounts for the VAT under the reverse charge (Notice 741A). Crucially, the value of reverse-charge services counts toward the £90,000 VAT registration threshold, which is the classic surprise registration trigger for an otherwise sub-threshold seller buying large volumes of overseas platform and ad services.
,  https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a (verified 2026-07-15: reverse charge on services from overseas suppliers confirmed; reverse-charge value counts toward registration threshold confirmed)

**7. The Flat Rate Scheme is usually the wrong choice for goods sellers: the limited cost business rate is 16.5%, and FRS forfeits input VAT recovery on stock.**
A business is a "limited cost business" if its spend on relevant goods is less than 2% of turnover, or less than £1,000 a year, and must then use the 16.5% flat rate. For a stock-based ecommerce seller, the combination of the 16.5% rate and the loss of input VAT recovery on stock purchases typically makes FRS a false economy. Model the outcome before electing.
,  https://www.gov.uk/vat-flat-rate-scheme/how-much-you-pay (verified 2026-07-15: limited cost business rate of 16.5% confirmed; less-than-2%-of-turnover or less-than-£1,000-a-year conditions confirmed)

**8. The second-hand margin scheme lets resellers pay VAT on the margin, not the full sale price, with record-keeping conditions.**
Resellers of eligible used, refurbished, antique or vintage goods can use a VAT margin scheme to pay VAT on the difference between what they paid and what they sold the item for, rather than on the full selling price, subject to strict record-keeping and eligibility conditions. Not all goods qualify.
,  https://www.gov.uk/vat-margin-schemes (verified 2026-07-15: margin scheme charges VAT on the margin rather than full sale price confirmed; record-keeping and eligibility conditions confirmed)

---

## B. Selling into the EU post-Brexit (the cross-border cluster)

**9. IOSS handles low-value consignments into the EU through a single registration; UK businesses generally need an EU-based intermediary.**
The Import One Stop Shop (IOSS) lets a business account for the import VAT on low-value B2C consignments into the EU through one registration rather than registering in each member state. A business established outside the EU (including in Great Britain) must appoint an intermediary to register and act on its behalf.
FLAG CLEARED 2026-07-15: €150 verified at EU official source. The EU Commission One Stop Shop page states the import scheme "only covers low value goods, i.e. goods in consignments of an intrinsic value not exceeding EUR 150". Cite https://vat-one-stop-shop.ec.europa.eu/one-stop-shop_en for the €150 EU ceiling (never the gov.uk IOSS page, which carries the different UK/NI £135 figure).
,  https://www.gov.uk/guidance/check-if-you-can-register-for-the-vat-import-one-stop-shop-scheme (verified 2026-07-15: single-registration IOSS mechanism confirmed; intermediary requirement for non-EU/GB businesses confirmed; page states UK £135 low-value figure, NOT the €150 EU consignment ceiling)

**10. The OSS Union scheme applies to Northern Ireland to EU distance sales above the £8,818 (€10,000) threshold; GB sellers do not distance-sell under OSS.**
Northern Ireland's dual status means NI-to-EU distance sales of goods can be reported through the OSS Union scheme once they exceed the distance-selling threshold. Great Britain sellers do not distance-sell into the EU under OSS at all; mixing up GB and NI treatment is a standing error in rival content.
FLAG CLEARED 2026-07-15: second gov.uk citation found. https://www.gov.uk/guidance/check-how-to-report-and-pay-vat-on-distance-sales-of-goods-from-northern-ireland-to-the-eu states "sell goods worth more than £8,818 (10,000 euros) a year to consumers in the EU". Cite that page for the threshold figure.
,  https://www.gov.uk/guidance/register-to-report-and-pay-vat-on-distance-sales-of-goods-from-northern-ireland-to-the-eu (verified 2026-07-15: NI-to-EU OSS Union scheme mechanism confirmed; page does NOT carry the £8,818/€10,000 threshold, flagged for second citation)

**11. An EORI number is required to import or export goods; GB EORI for GB movements, XI EORI for Northern Ireland movements.**
Any business moving goods into or out of the UK needs an Economic Operators Registration and Identification (EORI) number. A GB EORI covers GB movements; an XI EORI is needed for movements involving Northern Ireland.
,  https://www.gov.uk/eori (verified 2026-07-15: EORI requirement to import/export goods confirmed; GB and XI EORI distinction confirmed)

---

## C. HMRC visibility: platform reporting and side hustles (the timely cluster)

**12. Digital platforms must report seller income to HMRC under the OECD model rules; the rules came into force on 1 January 2024, with first reports due in January 2025.**
Under the reporting rules for digital platforms, platforms such as Amazon, eBay, Etsy, Vinted and Airbnb must report seller income to HMRC. The rules apply from 1 January 2024, with the first reports due in January 2025 covering the 2024 reportable period (the statutory annual deadline is 31 January). The "HMRC cannot see my marketplace sales" assumption is dead.
,  https://www.gov.uk/guidance/reporting-rules-for-digital-platforms (verified 2026-07-15: platform reporting obligation confirmed)
,  https://www.gov.uk/government/publications/reporting-rules-for-digital-platforms/reporting-rules-for-digital-platforms (verified 2026-07-15: rules apply from 1 January 2024, reporting due from January 2025 confirmed)

**13. The platform reporting threshold (fewer than 30 sales and €2,000 or less) is a report-exclusion trigger, not a tax threshold.**
Platforms do not have to report a seller who received €2,000 (about £1,700) or less for fewer than 30 sales of goods in the year. This is a reporting exclusion, not a tax-free allowance: tax liability follows trading status, not whether the platform reported you. Both directions of confusion (panic below the trigger, complacency above it) are addressable content.
,  https://www.gov.uk/guidance/reporting-rules-for-digital-platforms (verified 2026-07-15: fewer than 30 sales and €2,000/approx £1,700 exclusion confirmed; applies to goods sellers)

**14. The £1,000 trading allowance: gross trading income of £1,000 or less needs no return; above it, the allowance can replace actual expenses.**
If annual gross trading income is £1,000 or less, a return may not be required. Above £1,000, a seller can either deduct the £1,000 allowance instead of actual expenses, or deduct actual expenses, but not both. For goods sellers with real cost of goods sold, using the allowance instead of actual COGS is usually the worse choice.
,  https://www.gov.uk/guidance/tax-free-allowances-on-property-and-trading-income (verified 2026-07-15: £1,000 trading allowance confirmed; £1,000-or-less no-return position confirmed; allowance-instead-of-expenses confirmed)

**15. Whether decluttering or a side hustle is "trading" is a badges-of-trade question, not a threshold question.**
Selling personal possessions you no longer want (Vinted, eBay, Depop declutter) is generally not trading; buying or making goods to sell at a profit generally is. The distinction turns on HMRC's badges of trade (profit motive, frequency of transactions, nature of the asset, how goods were acquired), not on any sales count or platform-report trigger.
FLAGGED: cite the HMRC Business Income Manual badges-of-trade pages (BIM20205 onward) at build time; the outline did not fix a specific citation URL for this position.

---

## D. Structure, income tax and MTD

**16. Making Tax Digital for Income Tax: £50,000 threshold from 6 April 2026; £30,000 from 6 April 2027; £20,000 from 6 April 2028.**
Sole-trader sellers with qualifying self-employment and property income above £50,000 must keep digital records and file quarterly updates from 6 April 2026. The threshold drops to £30,000 from 6 April 2027 and to £20,000 from 6 April 2028. The sole-trader seller cohort is hit first.
,  https://www.gov.uk/guidance/check-if-youre-eligible-for-making-tax-digital-for-income-tax (verified 2026-07-15: £50,000 from 6 April 2026, £30,000 from 6 April 2027, £20,000 from 6 April 2028 confirmed)

**17. Cash basis is the default for unincorporated businesses, but stock-heavy sellers usually get better data from accruals plus proper inventory accounting.**
Cash basis is the default for unincorporated businesses; accruals must be actively elected. For a stock-based ecommerce seller, accruals accounting with proper inventory tracking generally gives better decision data and smoother taxable profits. Choosing the basis is an active decision, not a default to accept blindly.
,  https://www.gov.uk/simpler-income-tax-cash-basis (verified 2026-07-15: cash basis as default for unincorporated businesses confirmed)

**18. Stock is valued at the lower of cost and net realisable value at year end (accruals).**
Under accruals accounting, closing stock is valued at the lower of cost and net realisable value. This is the cost of goods sold and inventory position that underpins every "why is my taxable profit higher than my bank balance" page for a growing seller reinvesting cash into stock.
,  https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim33115 (verified 2026-07-15: lower of cost and net realisable value stock valuation confirmed in BIM33115)

**19. Corporation tax: 19% small profits rate up to £50,000; 25% main rate above £250,000; marginal relief between.**
These rates have applied from 1 April 2023. The sole-trader-versus-company crossover maths for sellers turns on these rates plus the dividend position (position 20). Associated company rules reduce the £50,000 and £250,000 thresholds proportionately.
,  https://www.gov.uk/corporation-tax-rates (verified 2026-07-15: 19% small profits rate, 25% main rate, £50,000/£250,000 thresholds and marginal relief confirmed)

**20. Dividends: 10.75% (basic rate), 35.75% (higher rate), 39.35% (additional rate) from 6 April 2026, above a £500 allowance.**
Owner-directors of incorporated seller businesses on the standard salary-plus-dividends model pay dividend tax at these rates on amounts above the £500 annual dividend allowance, from 6 April 2026 (Finance Act 2026 s.4). All extraction comparisons must use these rates, not the 8.75%/33.75% figures still common in rival content.
,  https://www.legislation.gov.uk/ukpga/2026/11/section/4 (verified 2026-07-15: FA 2026 s.4 dividend rates)
,  https://www.gov.uk/tax-on-dividends (verified 2026-07-15: 10.75% basic, 35.75% higher, 39.35% additional rates confirmed; £500 dividend allowance confirmed)

**21. Self Assessment registration deadline: 5 October following the end of the tax year in which the income arose.**
A new sole-trader seller who becomes chargeable to tax must tell HMRC by 5 October following the end of the relevant tax year (so 5 October 2026 for income in the year to 5 April 2026). Missing this deadline can trigger a failure-to-notify penalty.
,  https://www.gov.uk/register-for-self-assessment (verified 2026-07-15: 5 October notification deadline confirmed)

---

## E. Capital allowances and employer costs (FA 2026 ground truth)

**22. Annual Investment Allowance covers up to £1,000,000 of qualifying plant and machinery spend per year.**
Racking, packing lines, label printers, computers and similar seller capex are qualifying plant and machinery. AIA at £1m has applied from 1 January 2019 and absorbs almost all seller capex at a 100% first-year deduction.
,  https://www.gov.uk/capital-allowances/annual-investment-allowance (verified 2026-07-15: £1,000,000 AIA limit confirmed; from 1 January 2019 confirmed)

**23. Beyond AIA: the main-rate writing-down allowance is 14% from April 2026, a new 40% first-year allowance applies to qualifying main-pool additions, and the special rate stays 6%.**
Finance Act 2026 (c. 11) s.28 substitutes 14% for 18% as the main-rate writing-down allowance in CAA 2001 s.56, effective 1 April 2026 (corporation tax) and 6 April 2026 (income tax), with a blended rate for straddling periods. Section 29 introduces a new 40% first-year allowance for new, unused main-pool plant and machinery. The special rate pool stays at 6%. Sequencing: AIA first, then the 40% FYA on residual main-pool additions, then WDA at 14% on the remaining pool.
,  https://www.legislation.gov.uk/ukpga/2026/11/section/28 (verified 2026-07-15: 18% to 14% substitution in CAA 2001 s.56 confirmed; effective dates confirmed)
,  https://www.legislation.gov.uk/ukpga/2026/11/section/29 (verified 2026-07-15: 40% first-year allowance for new, unused main-pool plant confirmed)

**24. Employer NIC is 15% above the secondary threshold of £5,000 per year (£96 per week, £417 per month) from April 2025.**
The moment a seller hires a virtual assistant, picker or first employee, employer NIC applies at 15% on earnings above the £5,000 annual secondary threshold. The secondary threshold has been £5,000 since April 2025 and the same figure applies in 2026-27.
,  https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027 (verified 2026-07-15: 15% rate confirmed; £5,000 annual secondary threshold confirmed)

**25. Employment Allowance of £10,500 per year offsets employer NIC for eligible employers.**
Most small seller businesses are eligible for the Employment Allowance, which reduces the employer NIC bill by up to £10,500 per tax year. A single-employee or few-employee seller whose total employer NIC is below £10,500 pays no employer NIC at all.
,  https://www.gov.uk/claim-employment-allowance (verified 2026-07-15: £10,500 confirmed)

**26. Mileage: AMAP rises to 55p per mile for the first 10,000 miles (then 25p) from 6 April 2026.**
For sourcing runs, car-boot buying trips and post-office drop-offs in a personal vehicle, the AMAP rate is 55p per mile for the first 10,000 business miles (up from 45p) and 25p thereafter, from 6 April 2026. Reimbursement above AMAP is taxable; below it, the worker can claim a mileage deduction.
,  https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027 (verified 2026-07-15: 55p first 10,000 miles / 25p thereafter for 2026-27 confirmed)

---

## F. Exit

**27. Business Asset Disposal Relief: the rate is 18% for disposals from 6 April 2026 (not 10%), on a £1m lifetime limit.**
BADR reduces the CGT rate on qualifying disposals of a trading business or company. The rate was 10% up to 5 April 2025, 14% from 6 April 2025 to 5 April 2026, and is 18% for disposals from 6 April 2026. The standard higher-rate CGT rate on non-BADR gains is 24% from 6 April 2026, so the BADR saving is now 6 percentage points. FBA business sales via aggregators or brokers can be share deals or asset deals with very different tax outcomes, and BADR requires 2 years of qualifying trading ownership.
,  https://www.gov.uk/business-asset-disposal-relief (verified 2026-07-15: 18% rate from 6 April 2026 confirmed; prior 10% and 14% rates confirmed; £1m lifetime limit confirmed)
,  https://www.gov.uk/capital-gains-tax/rates (verified 2026-07-15: 24% standard higher-rate CGT from 6 April 2026 confirmed; annual exempt amount £3,000 confirmed)

---

## Consistency rules for writers

- VAT registration turnover (position 1): always gross taxable sales, never the platform payout net of fees.
- Establishment status (position 2): the whole marketplace-VAT analysis turns on UK vs overseas establishment; never blur the two.
- £135 rule (position 3) is direct-to-consumer only; if the sale goes through a marketplace the marketplace accounts for VAT (position 2).
- Zero-rated exports (position 5): never conflate zero-rated with exempt; zero-rated preserves input recovery.
- Reverse-charge services (position 6): remind sub-threshold sellers that overseas platform and ad fees count toward the £90,000 threshold.
- Flat Rate Scheme (position 7): default position is "usually wrong for goods sellers"; the limited cost rate is 16.5%.
- IOSS €150 (position 9) and OSS £8,818/€10,000 (position 10): flags CLEARED 2026-07-15 with pinned citations (EU Commission OSS page; gov.uk NI distance-sales page). Use those exact sources when stating the figures.
- GB vs NI (positions 9, 10, 11): never mix GB and NI VAT treatment for cross-border goods.
- Platform reporting (positions 12, 13): the 30-sales/€2,000 trigger is a reporting exclusion, not a tax threshold; tax follows trading status.
- Badges of trade (position 15): "is my decluttering trading?" is a badges-of-trade question; cite BIM at build, never a sales count.
- Dividend rates (position 20): 10.75%/35.75%/39.35% from 6 April 2026; never the old 8.75%/33.75%.
- BADR rate (position 27): 18% for disposals from 6 April 2026, not 10%.
- No em-dashes in user-facing copy (estate rule).

## Open flags (producer pass 2026-07-15)

1. **Position 9 (IOSS €150 ceiling)**: CLEARED 2026-07-15. EU Commission source verified: https://vat-one-stop-shop.ec.europa.eu/one-stop-shop_en ("goods in consignments of an intrinsic value not exceeding EUR 150").
2. **Position 10 (OSS £8,818/€10,000 threshold)**: CLEARED 2026-07-15. gov.uk source verified: https://www.gov.uk/guidance/check-how-to-report-and-pay-vat-on-distance-sales-of-goods-from-northern-ireland-to-the-eu ("sell goods worth more than £8,818 (10,000 euros) a year to consumers in the EU").
3. **Position 15 (badges of trade)**: FLAGGED. No specific citation URL fixed; cite HMRC BIM badges-of-trade pages (BIM20205 onward) at build time.
4. **Amazon 2024 Luxembourg-to-UK billing entity switch** (VAT now charged on UK sellers' Amazon fees): real practical topic but the authority is Amazon seller documentation, not gov.uk. Out of scope for this ledger; needs a careful citation strategy at build.
5. **EU per-member-state establishment / fiscal-representative / EPR packaging requirements** (DE, FR): EU-side sources, out of gov.uk scope; cite EU official sources at build.
