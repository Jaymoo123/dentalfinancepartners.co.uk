---
slug: for-amazon-sellers
tier: money
route: /for/amazon-sellers
intent: HIRE. Premium-intent seller-owners (highest CPC in the HIRE set) choosing an FBA/FBM specialist; low volume, high value. Long game per LAUNCH_CORE.
---
# Audience page: accountants for Amazon FBA and FBM sellers (BRAND_TBD)

> Seed brief (Stage 1). Brand is BRAND_TBD; all copy references "the site". CTA and brand copy flow from site config at write time. No em-dashes anywhere.

## FENCE contract (DEDUP_AUDIT.md, MANDATORY)

Verdict: **FENCE** vs generalist `/blog/accountant-for-amazon-fba-sellers-uk` ("How to Choose an Accountant for Amazon FBA Sellers in the UK"). Owner migrate-vs-fence ruling DEFERRED to deploy gate; do NOT 301/migrate at build.

**The wedge:** the generalist page is a single "how to choose" blog post. This hub wins on OPERATIONAL DEPTH the blog does not carry:
- FBA/FBM settlement reconciliation (settlement report to books; why "profit does not match the bank").
- Fee VAT (VAT on Amazon fees, reverse charge; the 2024 Amazon UK-billing switch).
- Pan-EU / cross-border depth (stock in EU fulfilment centres, IOSS/OSS, PVA on stock imports, establishment status).
Seller lead-form optional fields (BUSINESS-audience rule): platforms sold on, monthly revenue band, VAT registration status, stock location (UK / EU / China), fulfilment model (FBA / FBM / 3PL).

## Target queries (evidence: LAUNCH_CORE.md measured re-score, DataForSEO UK loc 2826, joined 2026-07-12)

- Primary: "amazon fba accountant(s)" 110/mo, KD 0, CPC £37.56 (highest CPC in the HIRE set)
- Secondary: "amazon accountants" 210/mo (a rival ranks #5)
- Note: "amazon seller vat" measured only ~10/mo; the VAT demand lives in long-tail variants routed to /vat/*, not this hub head.

## Search-intent class + play

HIRE, premium/low-volume. KD 0 and £37.56 CPC mean this is a winnable, high-value lead page. Establish FBA/FBM specialist depth (settlement reconciliation + fee VAT + pan-EU) fast, then route VAT specifics to /vat/* and reconciliation to the settlement service page. Do not chase the head SERP with volume plays; win on depth + tooling + the data asset.

## Competitors to beat (COMPETITORS.md; domains only at seed stage, live-URL check is Stage 2)

- **ecommerceaccountants.co.uk / yourecommerceaccountant.co.uk** (dedicated firms with Amazon pages in sitemap). Beat on reconciliation + fee-VAT + pan-EU depth vs their brochure Amazon page.
- **A2X / Link My Books** (own the informational Amazon-settlement SERP via software content). Position SaaS-neutral ("with or without A2X/Link My Books", LAUNCH_CORE) so the site owns the tax position, not the software.
- **generalist `accountant-for-amazon-fba-sellers-uk`**: the FENCE wall (how-to-choose blog). Differentiate on operational depth, do not cannibalise.

## Required structure

H2 skeleton:
1. Hero: accountants for Amazon FBA and FBM sellers (value prop + CTA + seller lead-form entry)
2. FBA vs FBM: what changes for your accounts (stock ownership, fulfilment, VAT touchpoints)
3. Settlement and payout reconciliation (why the deposit is not your revenue; route to settlement service page)
4. VAT on Amazon fees (reverse charge on overseas-billed fees; the fee value counts toward the £90k threshold; route to /vat/vat-on-marketplace-fees)
5. Selling pan-EU: stock in EU fulfilment, IOSS/OSS, PVA on stock imports, establishment status (route to /vat/* and selling-into-the-eu)
6. VAT threshold: gross sales, not your Amazon payout (route to VAT threshold tracker + ecommerce-vat-compliance)
7. Sole trader or limited company as an Amazon seller (seller-scoped; route to seller ST-vs-Ltd blog + calculator; generic incorporation stays generalist)
8. How engagement works / next step CTA

FAQ candidates (questions only):
- Do Amazon FBA sellers need a specialist accountant?
- Why does my Amazon settlement not match my bank balance?
- Do I pay VAT on my Amazon fees?
- Is my VAT threshold based on gross sales or my Amazon payout?
- Do I need to register for VAT in the EU if my stock is in an EU fulfilment centre?
- Can I use postponed VAT accounting on stock I import for FBA?
- Can HMRC see my Amazon sales?
- Should I be a sole trader or a limited company?

Table/chart opportunities: FBA-seller VAT-touchpoint table (import stage / marketplace-collected VS seller-liable / fee reverse charge), each figure linking gov.uk per HP consistency rule.

Calculator embeds: none inline; link seller take-home / true-margin (fees + COGS + VAT joined) and VAT threshold tracker landing pages.

Internal links (launch core only): services (settlement-payout-reconciliation, ecommerce-vat-compliance, selling-into-the-eu, hmrc-letter-online-sales); /vat/* (vat-on-marketplace-fees, deemed-supplier-establishment, postponed-vat-margin-scheme, ioss-vs-oss, 135-import-rule); calculators (seller-take-home, vat-threshold-tracker, sole-trader-vs-ltd-sellers); /research/online-seller-index; blogs (vat-threshold-gross-vs-payout, platform-reporting-rules, sole-trader-vs-ltd-online-sellers). Link OUT to hollowaydavies.co.uk for generic incorporation, generic salary/dividend, generic MTD ITSA mechanics.

## House positions touched (quoted HP text + citation URL)

- HP 1: "VAT registration is compulsory once taxable turnover exceeds £90,000 in any rolling 12-month period; for marketplace sellers 'turnover' is gross sales, not the platform payout." https://www.gov.uk/vat-registration
- HP 2: overseas-established sellers have no threshold, marketplace is deemed supplier; UK-established sellers remain liable. https://www.gov.uk/guidance/vat-and-overseas-goods-sold-to-customers-in-the-uk-using-online-marketplaces
- HP 4: "Postponed import VAT accounting lets VAT-registered importers declare and recover import VAT on the same return." https://www.gov.uk/guidance/check-when-you-can-account-for-import-vat-on-your-vat-return
- HP 6: "Marketplace and software fees billed from abroad are reverse-charge services; the seller self-accounts for UK VAT and that reverse-charge value counts toward the £90,000 registration threshold." https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a
- HP 12: platform reporting from 1 January 2024, first reports January 2025. https://www.gov.uk/guidance/reporting-rules-for-digital-platforms

Consistency rules: VAT threshold gross not payout (HP 1); never blur UK vs overseas establishment (HP 2); remind sub-threshold sellers that overseas fee value counts toward the £90k threshold (HP 6); no named-expert authority; no em-dashes.

## Hallucination danger zones

- Amazon 2024 Luxembourg-to-UK fee billing switch (VAT now on UK sellers' Amazon fees): HP open flag 4, authority is Amazon seller docs not gov.uk. Frame the reverse-charge PRINCIPLE from HP 6 (gov.uk-citable); do NOT assert the Amazon-specific billing-entity switch on-site without a careful build-time citation.
- Do NOT state the €150 IOSS ceiling or £8,818/€10,000 OSS threshold here (HP open flags 1/2); route pan-EU specifics to /vat/* which will carry the build-time second citation.
- Do NOT re-explain generic incorporation / salary-dividend / MTD ITSA mechanics; link OUT to generalist.
- Do NOT 301/migrate the generalist FBA blog; FENCE only.

## Stage 2 TODO

- Live-URL verify generalist `accountant-for-amazon-fba-sellers-uk` and dedicated-rival Amazon pages.
- Decide on-site treatment of the Amazon 2024 fee-billing switch (cite Amazon docs or keep to the HP 6 principle only).
- Confirm seller lead-form field set with config.
