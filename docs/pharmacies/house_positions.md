# Pharmacy business owners, house positions (locked figures and framings)

Locked at pre-launch build (2026-07-14), produced from
`expansion_research/tier1_pharmacies/HOUSE_POSITIONS_OUTLINE.md` (27 positions,
all 31 citation URLs fetched live and phrase-checked 2026-07-11,
`raw/citation_checks.json`). The load-bearing tax figures (BADR rate, CGT rates
and annual exempt amount, employer NIC, Employment Allowance, FA 2026 capital
allowances, corporation tax, dividend rates) were reconciled against estate
ground-truth memory and re-verified at source on **2026-07-14** during this
producer pass. Rates quoted are 2026/27 unless stated (this site launches in tax
year 2026/27, so 2026/27 figures are "current"). FA 2026 ground-truth memory
entries were honoured.

These are the positions every page, calculator and blog on this site must be
internally consistent on. Do not change a figure without updating every location
it appears (pages, calculator logic, blog copy, rates ledger).

**Default jurisdiction: England (and Wales where relevant), HMRC tax law
UK-wide.** The NHS contract citations (CPCF, Drug Tariff, Pharmacy First, the
2013 Regulations) are England. Scotland, Wales and Northern Ireland contract
variants are a post-launch content lane, flagged explicitly, never silently
assumed to match England.

**Scope and regulated-advice boundary:** this site serves pharmacy BUSINESS
owners and NHS contract economics. It gives tax and accounting guidance only,
never clinical, prescribing, or patient-safety content (that is the medical
site's adjacency zone and a regulated-profession credibility trap). Locum
pharmacists are a content-only audience at launch (no locum lead forms). Every
page frames outputs as general guidance, not personal advice, and routes complex
facts to "speak to us".

If a page hits a factual conflict with a competitor source, flag it for the
orchestrator; do not unilaterally re-frame a locked position.

---

## A. VAT, the pharmacy signature topic

**1. NHS-dispensed prescription drugs are zero-rated; most OTC retail sales are
standard-rated.** A community pharmacy is structurally a VAT-mixed business and
almost always reclaims more input VAT than a pure retailer expects. This is the
strongest differentiation wedge in the niche and no generalist can fake it.
Source: https://www.gov.uk/guidance/health-professionals-pharmaceutical-products-and-vat-notice-70157 (verified 2026-07-14).

**2. Zero-rating applies to dispensing by a registered pharmacist against a
prescription.** Services supplied by pharmacists (private services, some Pharmacy
First-adjacent private clinics) can be exempt or standard-rated instead; the mix
must be mapped SKU by SKU and service line by service line, not assumed.
Source: https://www.gov.uk/guidance/health-professionals-pharmaceutical-products-and-vat-notice-70157 (verified 2026-07-14).

**3. Partial exemption rarely bites but must be checked** where exempt supplies
(certain medical services) exist; the de minimis limits apply. We check it rather
than assume it away.
Source: https://www.gov.uk/guidance/partial-exemption-vat-notice-706 (verified 2026-07-14).

**4. Retail schemes are the practical mechanic** for splitting zero-rated and
standard-rated takings in a shop that cannot itemise every sale. Choosing the
wrong scheme systematically overpays VAT.
Source: https://www.gov.uk/hmrc-internal-manuals/vat-retail-schemes (verified 2026-07-14).

**5. The £90,000 VAT registration threshold is irrelevant to almost every
pharmacy.** NHS turnover forces registration economics early, and voluntary
registration is normally advantageous because of the zero-rated outputs (input
VAT is reclaimable against zero-rated dispensing).
Source: https://www.gov.uk/vat-registration (verified 2026-07-14).

## B. NHS contract economics

**6. Pharmacy income is contract-driven, not till-driven.** It is reimbursement
(Drug Tariff prices) plus remuneration (fees and service payments) under the
Community Pharmacy Contractual Framework, not shop takings.
Sources: https://www.england.nhs.uk/community-pharmacy-contractual-framework/ and https://www.nhsbsa.nhs.uk/pharmacies-gp-practices-and-appliance-contractors/drug-tariff (verified 2026-07-14).

**7. The FP34 submission cycle drives cash flow.** Prescriptions are submitted
monthly and payment arrives roughly two months later, with an advance on account.
Working-capital planning must model the NHSBSA payment lag.
Source: https://www.nhsbsa.nhs.uk/pharmacies-gp-practices-and-appliance-contractors/submitting-prescriptions (verified 2026-07-14).

**8. Drug Tariff and Category M clawbacks and price volatility mean gross margin
is set centrally and retrospectively adjusted.** Margin variance analysis, not
just bookkeeping, is the core monthly job.
Source: https://www.nhsbsa.nhs.uk/pharmacies-gp-practices-and-appliance-contractors/drug-tariff (verified 2026-07-14).

**9. Service income (Pharmacy First and similar) is a growing, separately
accounted revenue line** with its own fee structure and thresholds.
Source: https://www.england.nhs.uk/primary-care/pharmacy/pharmacy-services/pharmacy-first/ (verified 2026-07-14).

**10. Market entry is regulated.** Opening, relocating or buying a pharmacy
engages the NHS (Pharmaceutical and Local Pharmaceutical Services) Regulations
2013. The NHS contract, not the shop, is the asset.
Source: https://www.legislation.gov.uk/uksi/2013/349/contents (verified 2026-07-14).

**11. Premises must be GPhC-registered and ownership changes have regulatory
steps,** including superintendent pharmacist requirements for companies. We cover
the ownership and registration mechanics only, never clinical professional
matters.
Source: https://www.pharmacyregulation.org/pharmacies (verified 2026-07-14).

## C. Buying and selling a pharmacy

**12. Share purchase versus asset purchase is the first structuring decision.**
Asset deals attract SDLT on any property at non-residential and mixed-use rates
(up to 5%); share deals attract 0.5% stamp duty on shares but inherit the
company's history.
Sources: https://www.gov.uk/stamp-duty-land-tax/nonresidential-and-mixed-use-rates and https://www.gov.uk/tax-buy-shares (verified 2026-07-14).

**13. Goodwill dominates pharmacy pricing** (driven by the NHS contract and item
volume). On a company purchase, corporation tax relief on goodwill is restricted
and only available in limited cases at fixed rates.
Source: https://www.gov.uk/guidance/corporation-tax-relief-on-goodwill-and-relevant-assets (verified 2026-07-14).

**14. On sale, Business Asset Disposal Relief charges CGT at 18% for 2026/27 on
qualifying disposals up to the £1m lifetime limit.** The BADR rate was 14% in
2025/26 and 10% before that; it rose to 18% from 6 April 2026. Timing a pharmacy
sale around BADR rate steps is real money. The £1m lifetime limit is per person.
Source: https://www.gov.uk/business-asset-disposal-relief (verified 2026-07-14).

**15. Standard CGT rates apply beyond BADR: 18% on gains within the basic-rate
band and 24% above it,** with the annual exempt amount frozen at £3,000. Deal
structuring (earn-outs, deferred consideration) changes when the tax falls due.
A pharmacy is a non-residential asset for the rate split.
Source: https://www.gov.uk/capital-gains-tax/rates (verified 2026-07-14).

**16. Valuation stays method-level.** Pharmacies price on a multiple of adjusted
EBITDA and on pence-per-item benchmarks; the purchase-affordability calculator
encodes the arithmetic, but the house positions never assert a specific multiple
without a cited broker source captured at build time. Do NOT invent multiples.
Source: internal position (calculator method documented in CALCULATORS.md), no external rate cited.

## D. Capital allowances and premises

**17. Pharmacy fit-outs (shelving, dispensary robots, refrigeration, security)
are plant and machinery.** The Annual Investment Allowance covers qualifying
expenditure up to £1,000,000 at 100% in the year of spend.
Source: https://www.gov.uk/capital-allowances/annual-investment-allowance (verified 2026-07-14).

**18. FA 2026 changed the writing-down landscape.** The main-rate writing-down
allowance falls from 18% to 14%, with a new 40% first-year allowance for
main-rate qualifying expenditure; the special-rate pool stays at 6%. Where AIA is
exhausted, this determines the residual relief profile on a large fit-out.
Source: https://www.gov.uk/work-out-capital-allowances/rates-and-pools (verified 2026-07-14).

**19. The Structures and Buildings Allowance is 3% straight line** on qualifying
works to the building itself, distinct from fit-out plant.
Source: https://www.gov.uk/guidance/claiming-capital-allowances-for-structures-and-buildings (verified 2026-07-14).

## E. Locum pharmacists (content-only audience)

**20. HMRC's Employment Status Manual has a locum-pharmacist-specific page
(ESM4270).** Status is fact-based, and HMRC's stated position on locum
pharmacists is restrictive. "Everyone does it self-employed" is not a defence.
Source: https://www.gov.uk/hmrc-internal-manuals/employment-status-manual/esm4270 (verified 2026-07-14).

**21. Off-payroll working (IR35) applies where a locum works through their own
company** and the client is in scope; CEST is the check tool of record.
Sources: https://www.gov.uk/guidance/understanding-off-payroll-working-ir35 and https://www.gov.uk/guidance/check-employment-status-for-tax (verified 2026-07-14).

**22. Self-employed status tests** (control, substitution, financial risk) decide
the sole-trader locum question.
Source: https://www.gov.uk/employment-status/selfemployed-contractor (verified 2026-07-14).

**23. MTD for Income Tax hits sole-trader locums from April 2026 at £50,000+
qualifying income** (then £30,000 from April 2027).
Source: https://www.gov.uk/guidance/check-if-youre-eligible-for-making-tax-digital-for-income-tax (verified 2026-07-14).

**24. Cash basis is the default for unincorporated businesses,** relevant to
locums and small owner books.
Source: https://www.gov.uk/simpler-income-tax-cash-basis (verified 2026-07-14).

## F. Payroll, company tax, profit extraction

**25. Employer (Class 1 secondary) NIC is 15% above a £5,000 secondary
threshold** from 6 April 2025 (not the old 13.8% and £9,100). This is material
for a pharmacy's dispenser and counter-staff payroll.
Source: https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027 (verified 2026-07-14).

**26. The Employment Allowance is £10,500** from 6 April 2025, offsetting
employer secondary NIC for eligible employers. The former £5,000 cap and the
restaurant/hospitality-style exclusions were removed. Eligibility conditions
still apply (for example the single-director-only bar).
Source: https://www.gov.uk/claim-employment-allowance (verified 2026-07-14).

**27. Corporation tax is 25% main rate on profits over £250,000 and a 19% small
profits rate on profits up to £50,000, with Marginal Relief between the two
thresholds.** The £50,000 and £250,000 limits are divided by the number of
associated companies, so a multi-store owner with separate companies loses the
lower-rate headroom. Most single-store pharmacies sit in the marginal band.
Source: https://www.gov.uk/corporation-tax-rates (verified 2026-07-14).

**28. Pharmacy owners typically extract profit as a salary/dividend mix, and
dividends are taxed at 10.75% (basic), 35.75% (higher) and 39.35% (additional)
for 2026/27, with a £500 dividend allowance.** These are the FA 2026 rates and
are load-bearing for the incorporation and profit-extraction pages, which must
model dividend tax alongside the corporation tax already paid by the company
(dividends are paid from post-tax profit, so extraction planning is a two-layer
calculation).
Source: https://www.gov.uk/tax-on-dividends (verified 2026-07-14).

## Deliberately out of scope (positioning wall)

- Anything clinical, prescribing, or patient-safety (GPhC professional matters
  beyond ownership and registration mechanics). That is the medical site's
  adjacency zone and a regulated-profession credibility trap.
- Scotland, Wales and Northern Ireland contract variants at v1. The CPCF, Drug
  Tariff, Pharmacy First and 2013 Regulations citations above are England;
  devolved contract content is queued post-launch (mirrors the charities pilot's
  England-and-Wales-first call).

## Presentation rules

- Every rate or figure above must be re-verified against the cited page at build
  time if a page restates it (rates pages change without notice).
- No em-dashes in user-facing copy (estate rule); use commas, parentheses, full
  stops or middle dots. This document is internal.
- No credential claims and no named individuals. The firm is faceless; authority
  comes from cited HMRC and NHS sources, the calculators, and the data asset,
  never from claimed qualifications or a named expert (owner is not an
  accountant).
- Calculators are scenario and estimate tools that end at "your situation has X
  complexity, speak to us". They never claim to produce a filing-ready tax figure
  and always state their simplifications (see CALCULATORS.md).
