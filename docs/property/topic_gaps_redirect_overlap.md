# Property — proposed net-new pages vs existing redirect map

For each net-new page in `docs/property/topic_gaps_final.md`, this report flags any redirected old slug (from `Property/web/src/middleware.ts`) that overlaps on tokens (≥ 0.30 Jaccard).

**Why this matters:** when a new page launches, an overlapping redirected old slug may want its redirect target repointed at the new page (so any residual GSC equity on the old slug flows to the new content rather than the broader keeper it's currently aliased to).

**How to read:** under each net-new proposal, the overlap entries show `old_slug → current_redirect_target (source_table, score)`. If the score is high (≥ 0.55) and the new page is a more specific fit than the current redirect target, **repoint the redirect when the page launches**.

Proposals reviewed: 415 · with overlaps: 24 · without overlaps: 391

---

## Limited company / BTL company operation (4 proposals with redirect overlap)

- **`transferring-money-out-of-a-limited-company`** (proposed new page)
  - source: ukpropertyaccountants.co.uk — https://www.ukpropertyaccountants.co.uk/transferring-money-out-of-a-limited-company/
  - overlap `buy-to-let-limited-company-complete-guide-uk` → `/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk` (SLUG_TO_CATEGORY_MAP, score 0.33)
  - overlap `how-to-transfer-property-into-limited-company-uk` → `/blog/incorporation-and-company-structures/how-to-transfer-property-into-limited-company-uk` (SLUG_TO_CATEGORY_MAP, score 0.33)
- **`advantages-of-a-limited-company.htm`** (proposed new page)
  - source: alexander-ene.co.uk — https://www.alexander-ene.co.uk/advantages-of-a-limited-company.htm
  - overlap `buy-to-let-limited-company-complete-guide-uk` → `/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk` (SLUG_TO_CATEGORY_MAP, score 0.33)
  - overlap `how-to-transfer-property-into-limited-company-uk` → `/blog/incorporation-and-company-structures/how-to-transfer-property-into-limited-company-uk` (SLUG_TO_CATEGORY_MAP, score 0.33)
- **`advantages-of-limited-company.htm`** (proposed new page)
  - source: alexander-ene.co.uk — https://www.alexander-ene.co.uk/advantages-of-limited-company.htm
  - overlap `buy-to-let-limited-company-complete-guide-uk` → `/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk` (SLUG_TO_CATEGORY_MAP, score 0.33)
  - overlap `how-to-transfer-property-into-limited-company-uk` → `/blog/incorporation-and-company-structures/how-to-transfer-property-into-limited-company-uk` (SLUG_TO_CATEGORY_MAP, score 0.33)
- **`closing-a-limited-company.htm`** (proposed new page)
  - source: alexander-ene.co.uk — https://www.alexander-ene.co.uk/closing-a-limited-company.htm
  - overlap `buy-to-let-limited-company-complete-guide-uk` → `/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk` (SLUG_TO_CATEGORY_MAP, score 0.33)
  - overlap `how-to-transfer-property-into-limited-company-uk` → `/blog/incorporation-and-company-structures/how-to-transfer-property-into-limited-company-uk` (SLUG_TO_CATEGORY_MAP, score 0.33)

## Tenancies and Renters' Rights Act (4 proposals with redirect overlap)

- **`documents-needed-for-renters-rights-act-possession-claim`** (proposed new page)
  - source: ukpropertyaccountants.co.uk — https://www.ukpropertyaccountants.co.uk/documents-needed-for-renters-rights-act-possession-claim/
  - overlap `renters-rights-act-2026-tax-implications-landlords` → `/blog/landlord-tax-essentials/renters-rights-act-2026-tax-implications-landlords` (SLUG_TO_CATEGORY_MAP, score 0.33)
- **`new-rent-increase-rules-under-the-renters-rights-act`** (proposed new page)
  - source: ukpropertyaccountants.co.uk — https://www.ukpropertyaccountants.co.uk/new-rent-increase-rules-under-the-renters-rights-act/
  - overlap `renters-rights-act-2026-tax-implications-landlords` → `/blog/landlord-tax-essentials/renters-rights-act-2026-tax-implications-landlords` (SLUG_TO_CATEGORY_MAP, score 0.33)
- **`renters-rights-bill-impact-landlords-consider-selling-properties`** (proposed new page)
  - source: ukpropertyaccountants.co.uk — https://www.ukpropertyaccountants.co.uk/renters-rights-bill-impact-landlords-consider-selling-properties/
  - overlap `renters-rights-act-2026-tax-implications-landlords` → `/blog/landlord-tax-essentials/renters-rights-act-2026-tax-implications-landlords` (SLUG_TO_CATEGORY_MAP, score 0.3)
- **`renters-rights-bill-key-impact-on-tenants-landlords`** (proposed new page)
  - source: ukpropertyaccountants.co.uk — https://www.ukpropertyaccountants.co.uk/renters-rights-bill-key-impact-on-tenants-landlords/
  - overlap `renters-rights-act-2026-tax-implications-landlords` → `/blog/landlord-tax-essentials/renters-rights-act-2026-tax-implications-landlords` (SLUG_TO_CATEGORY_MAP, score 0.33)

## MTD for ITSA (2 proposals with redirect overlap)

- **`mtd-explained-for-residential-landlords-what-changes-and-when`** (proposed new page)
  - source: ukpropertyaccountants.co.uk — https://www.ukpropertyaccountants.co.uk/mtd-explained-for-residential-landlords-what-changes-and-when/
  - overlap `best-mtd-software-landlords-2026` → `/blog/making-tax-digital-mtd/best-mtd-software-landlords-2026` (SLUG_TO_CATEGORY_MAP, score 0.33)
- **`what-is-qualifying-income-for-mtd`** (proposed new page)
  - source: ukpropertyaccountants.co.uk — https://www.ukpropertyaccountants.co.uk/what-is-qualifying-income-for-mtd/
  - overlap `mtd-rental-income-threshold-exemptions` → `/blog/making-tax-digital-mtd/mtd-rental-income-threshold-exemptions` (SLUG_TO_CATEGORY_MAP, score 0.33)

## Non-resident landlords / NRL (2 proposals with redirect overlap)

- **`tax-rules-for-non-resident-landlords`** (proposed new page)
  - source: ukpropertyaccountants.co.uk — https://www.ukpropertyaccountants.co.uk/tax-rules-for-non-resident-landlords/
  - overlap `non-resident-landlord-scheme-uk-complete-guide` → `/blog/non-resident-landlord-tax/non-resident-landlord-scheme-uk-complete-guide` (SLUG_TO_CATEGORY_MAP, score 0.4)
- **`taxation-for-non-resident-landlords`** (proposed new page)
  - source: ukpropertyaccountants.co.uk — https://www.ukpropertyaccountants.co.uk/taxation-for-non-resident-landlords/
  - overlap `non-resident-landlord-scheme-uk-complete-guide` → `/blog/non-resident-landlord-tax/non-resident-landlord-scheme-uk-complete-guide` (SLUG_TO_CATEGORY_MAP, score 0.33)

## CGT — disposal & specific scenarios (2 proposals with redirect overlap)

- **`possible-cgt-rate-increase-might-cost-landlords-10000`** (proposed new page)
  - source: ukpropertyaccountants.co.uk — https://www.ukpropertyaccountants.co.uk/possible-cgt-rate-increase-might-cost-landlords-10000/
  - overlap `cgt-property-2027-rate-changes-uk-landlords` → `/blog/capital-gains-tax/cgt-property-2027-rate-changes-uk-landlords` (SLUG_TO_CATEGORY_MAP, score 0.3)
- **`the-capital-gains-trap-for-non-residents`** (proposed new page)
  - source: landlordstax.co.uk — https://www.landlordstax.co.uk/the-capital-gains-trap-for-non-residents/
  - overlap `capital-gains-tax-property-complete-guide-uk` → `/blog/capital-gains-tax/capital-gains-tax-property-complete-guide-uk` (SLUG_TO_CATEGORY_MAP, score 0.33)

## SDLT — surcharges and reliefs (1 proposals with redirect overlap)

- **`a-complete-guide-to-stamp-duty-refund`** (proposed new page)
  - source: ukpropertyaccountants.co.uk — https://www.ukpropertyaccountants.co.uk/a-complete-guide-to-stamp-duty-refund/
  - overlap `sdlt-incorporation-stamp-duty-twice` → `/blog/incorporation-and-company-structures/sdlt-incorporation-stamp-duty-twice` (SLUG_TO_CATEGORY_MAP, score 0.33)
  - overlap `stamp-duty-buy-to-let-surcharge` → `/blog/landlord-tax-essentials/stamp-duty-buy-to-let-surcharge` (SLUG_TO_CATEGORY_MAP, score 0.33)
  - overlap `stamp-duty-buy-to-let-surcharge-explained` → `/blog/portfolio-management/stamp-duty-buy-to-let-surcharge-explained` (SLUG_TO_CATEGORY_MAP, score 0.33)
  - overlap `stamp-duty-buy-to-let-surcharge-explained` → `/blog/landlord-tax-essentials/stamp-duty-buy-to-let-surcharge` (DUPLICATE_REDIRECTS, score 0.33)

## VAT for landlords (1 proposals with redirect overlap)

- **`vat-return`** (proposed new page)
  - source: ukpropertyaccountants.co.uk — https://www.ukpropertyaccountants.co.uk/vat-return/
  - overlap `landlord-tax-return-complete-guide-2026` → `/blog/landlord-tax-essentials/landlord-tax-return-complete-guide-2026` (SLUG_TO_CATEGORY_MAP, score 0.33)

## Family Investment Companies & FICs (1 proposals with redirect overlap)

- **`why-family-offices-need-specialist-uk-tax-advisers`** (proposed new page)
  - source: ukpropertyaccountants.co.uk — https://www.ukpropertyaccountants.co.uk/why-family-offices-need-specialist-uk-tax-advisers/
  - overlap `why-luton-landlords-need-specialist-property-accountant-2026` → `/blog/property-accountant-services/why-luton-landlords-need-specialist-property-accountant-2026` (SLUG_TO_CATEGORY_MAP, score 0.3)
  - overlap `why-cardiff-landlords-need-specialist-property-accountant-2026` → `/blog/property-accountant-services/why-cardiff-landlords-need-specialist-property-accountant-2026` (SLUG_TO_CATEGORY_MAP, score 0.3)

## Property accountant for cities / regions (1 proposals with redirect overlap)

- **`self-assessment-for-overseas-landlords`** (proposed new page)
  - source: uklandlordtax.co.uk — https://uklandlordtax.co.uk/tax-guide/self-assessment-for-overseas-landlords/
  - overlap `accountant-self-assessment` → `/blog/property-accountant-services/what-does-a-property-accountant-do` (DUPLICATE_REDIRECTS, score 0.4)
  - overlap `landlord-tax-return-self-assessment` → `/blog/section-24-and-tax-relief/landlord-tax-return-self-assessment` (SLUG_TO_CATEGORY_MAP, score 0.33)
  - overlap `how-to-complete-landlord-self-assessment-filing-step-by-step-guide` → `/blog/landlord-tax-essentials/how-to-complete-landlord-self-assessment-filing-step-by-step-guide` (SLUG_TO_CATEGORY_MAP, score 0.33)
  - overlap `landlord-tax-return-self-assessment` → `/blog/landlord-tax-essentials/landlord-tax-return-complete-guide-2026` (DUPLICATE_REDIRECTS, score 0.33)

## Leaving the UK / expat landlord tax (1 proposals with redirect overlap)

- **`non-resident-directors-in-a-uk-company`** (proposed new page)
  - source: ukpropertyaccountants.co.uk — https://www.ukpropertyaccountants.co.uk/non-resident-directors-in-a-uk-company/
  - overlap `non-resident-landlord-scheme-uk-complete-guide` → `/blog/non-resident-landlord-tax/non-resident-landlord-scheme-uk-complete-guide` (SLUG_TO_CATEGORY_MAP, score 0.33)

## HMOs (multi-occupancy, licensing) (1 proposals with redirect overlap)

- **`what-is-the-landlord-licensing-scheme`** (proposed new page)
  - source: uklandlordtax.co.uk — https://uklandlordtax.co.uk/advice/legal/what-is-the-landlord-licensing-scheme/
  - overlap `non-resident-landlord-scheme-uk-complete-guide` → `/blog/non-resident-landlord-tax/non-resident-landlord-scheme-uk-complete-guide` (SLUG_TO_CATEGORY_MAP, score 0.4)

## Trusts and beneficial ownership (1 proposals with redirect overlap)

- **`putting-a-rental-property-into-a-trust`** (proposed new page)
  - source: ukpropertyaccountants.co.uk — https://www.ukpropertyaccountants.co.uk/putting-a-rental-property-into-a-trust/
  - overlap `rental-property-accountant-near-me` → `/blog/portfolio-management/rental-property-accountant-near-me` (SLUG_TO_CATEGORY_MAP, score 0.4)
  - overlap `tax-sell-rental-property-uk` → `/blog/capital-gains-tax/tax-sell-rental-property-uk` (SLUG_TO_CATEGORY_MAP, score 0.4)
  - overlap `inheritance-tax-rental-property-uk-guide` → `/blog/landlord-tax-essentials/inheritance-tax-rental-property-uk-guide` (SLUG_TO_CATEGORY_MAP, score 0.4)
  - overlap `rental-property-accountant-near-me` → `/blog/property-accountant-services/property-accountant-near-me` (DUPLICATE_REDIRECTS, score 0.4)

## Bookkeeping & accounting practices (1 proposals with redirect overlap)

- **`wave-accounting-and-bookkeeping-software.htm`** (proposed new page)
  - source: alexander-ene.co.uk — https://www.alexander-ene.co.uk/wave-accounting-and-bookkeeping-software.htm
  - overlap `landlord-accounting-software-uk-2026` → `/blog/portfolio-management/landlord-accounting-software-uk-2026` (SLUG_TO_CATEGORY_MAP, score 0.33)
  - overlap `landlord-accounting-software-uk-2026` → `/blog/making-tax-digital-mtd/landlord-accounting-software-uk-best-options-2026` (DUPLICATE_REDIRECTS, score 0.33)
  - overlap `property-accounting-software-uk` → `/blog/portfolio-management/property-accounting-software-uk-2026` (DUPLICATE_REDIRECTS, score 0.33)

## Property development tax (trading vs investment) (1 proposals with redirect overlap)

- **`are-you-a-property-investor-or-developer`** (proposed new page)
  - source: uklandlordtax.co.uk — https://uklandlordtax.co.uk/tax-guide/are-you-a-property-investor-or-developer/
  - overlap `residential-property-developer-tax-uk` → `/blog/incorporation-and-company-structures/residential-property-developer-tax-uk` (SLUG_TO_CATEGORY_MAP, score 0.5)

## Self-assessment mechanics (1 proposals with redirect overlap)

- **`comparing-online-and-paper-self-assessment-tax-returns`** (proposed new page)
  - source: ukpropertyaccountants.co.uk — https://www.ukpropertyaccountants.co.uk/comparing-online-and-paper-self-assessment-tax-returns/
  - overlap `accountant-self-assessment` → `/blog/property-accountant-services/what-does-a-property-accountant-do` (DUPLICATE_REDIRECTS, score 0.33)
