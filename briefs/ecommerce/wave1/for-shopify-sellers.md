---
slug: for-shopify-sellers
tier: money
route: /for/shopify-sellers
intent: HIRE. Seller-owners of DTC Shopify stores choosing a specialist accountant. Long game per LAUNCH_CORE.
---
# Audience page: accountants for Shopify store owners (BRAND_TBD)

> Seed brief (Stage 1). Brand is BRAND_TBD; all copy references "the site". CTA and brand copy flow from site config at write time. No em-dashes anywhere.

## FENCE contract (DEDUP_AUDIT.md, MANDATORY)

Verdict: **FENCE** vs generalist `/blog/accountant-for-shopify-stores` ("What Does a Shopify Store Owner Need From an Accountant in 2025/26?"). Owner migrate-vs-fence ruling DEFERRED to deploy gate; do NOT 301/migrate at build.

**The wedge:** the generalist page is a single generic blog post. This hub wins on DTC-specific operational depth:
- DTC payout reconciliation (Shopify Payments payout to books; gateway fees, refunds, chargebacks; the deposit is not your revenue).
- Multi-gateway VAT (Shopify Payments + PayPal + Stripe + Klarna/Clearpay; VAT on gateway/app fees, some billed from abroad = reverse charge).
- Unlike marketplace hubs, DTC sellers are NOT under the deemed-supplier mechanism for their own-store sales: the seller accounts for their own VAT (contrast with /for/marketplace-sellers). Make this distinction explicit.
Seller lead-form optional fields (BUSINESS-audience rule): platforms sold on, monthly revenue band, VAT registration status, stock location (UK / EU / China), fulfilment model (FBA / FBM / 3PL).

## Target queries (evidence: LAUNCH_CORE.md measured re-score, DataForSEO UK loc 2826, joined 2026-07-12)

- Primary: "shopify accountant(s)" 210/mo, KD 55 / 0 (variant split), CPC £30.98

## Search-intent class + play

HIRE. Establish DTC-specialist depth (payout reconciliation + multi-gateway VAT) fast; route VAT specifics to /vat/* and reconciliation to the settlement/payout service page. Long-game head; win on depth + tooling + data asset, not on contesting the incumbent head SERP at launch.

## Competitors to beat (COMPETITORS.md; domains only at seed stage, live-URL check is Stage 2)

- **ecommerceaccountants.co.uk / yourecommerceaccountant.co.uk** (dedicated firms with Shopify pages). Beat on payout-reconciliation + multi-gateway VAT depth vs their brochure Shopify page.
- **A2X / Link My Books** (own Shopify-payout informational SERP via software content). Position SaaS-neutral so the site owns the tax position, not the connector.
- **generalist `accountant-for-shopify-stores`**: the FENCE wall. Differentiate on DTC depth, do not cannibalise.

## Required structure

H2 skeleton:
1. Hero: accountants for Shopify store owners (value prop + CTA + seller lead-form entry)
2. Your Shopify payout is not your revenue (payout reconciliation: gateway fees, refunds, chargebacks; route to settlement-payout-reconciliation)
3. Multi-gateway VAT (Shopify Payments / PayPal / Stripe / Klarna; VAT on gateway and app fees; overseas-billed fees are reverse charge; route to /vat/vat-on-marketplace-fees)
4. VAT threshold: gross sales, not your net payout (route to VAT threshold tracker + ecommerce-vat-compliance)
5. DTC vs marketplace: on your own store YOU account for VAT (contrast the deemed-supplier rule; route to /vat/deemed-supplier-establishment and /for/marketplace-sellers)
6. Selling into the EU from your Shopify store (IOSS/OSS, £135 rule for low-value direct sales; route to selling-into-the-eu and /vat/*)
7. Sole trader or limited company as a Shopify seller (seller-scoped; route to seller ST-vs-Ltd blog + calculator; generic incorporation stays generalist)
8. How engagement works / next step CTA

FAQ candidates (questions only):
- Do Shopify store owners need a specialist accountant?
- Why does my Shopify payout not match my sales?
- Do I pay VAT on Shopify, PayPal and Stripe fees?
- Is my VAT threshold based on gross sales or my payout?
- Do I account for my own VAT on my Shopify store, or does Shopify?
- Do I need to charge EU VAT when I sell into the EU from Shopify?
- Can HMRC see my Shopify sales?
- Should I be a sole trader or a limited company?

Table/chart opportunities: gateway-fee VAT table (gateway / UK-billed vs overseas-billed / reverse charge yes/no), figures linking gov.uk per HP consistency rule.

Calculator embeds: none inline; link seller take-home / true-margin and VAT threshold tracker landing pages.

Internal links (launch core only): services (settlement-payout-reconciliation, ecommerce-vat-compliance, selling-into-the-eu, hmrc-letter-online-sales); /vat/* (vat-on-marketplace-fees, deemed-supplier-establishment, 135-import-rule, ioss-vs-oss, postponed-vat-margin-scheme); calculators (seller-take-home, vat-threshold-tracker, sole-trader-vs-ltd-sellers); /research/online-seller-index; blogs (vat-threshold-gross-vs-payout, platform-reporting-rules, sole-trader-vs-ltd-online-sellers). Link OUT to hollowaydavies.co.uk for generic incorporation, generic salary/dividend, generic MTD ITSA mechanics.

## House positions touched (quoted HP text + citation URL)

- HP 1: "VAT registration is compulsory once taxable turnover exceeds £90,000 in any rolling 12-month period; for marketplace sellers 'turnover' is gross sales, not the platform payout." https://www.gov.uk/vat-registration
- HP 2 (contrast use): overseas-established marketplace sellers sit under the deemed-supplier mechanism; on a DTC own-store the seller accounts for their own VAT. https://www.gov.uk/guidance/vat-and-overseas-goods-sold-to-customers-in-the-uk-using-online-marketplaces
- HP 6: "Marketplace and software fees billed from abroad are reverse-charge services; the seller self-accounts for UK VAT and that reverse-charge value counts toward the £90,000 registration threshold." https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a
- HP 3 (for EU-direct low-value): £135-or-less direct-to-consumer imports = supply VAT at point of sale, not import VAT at border. https://www.gov.uk/guidance/vat-and-overseas-goods-sold-directly-to-customers-in-the-uk
- HP 12: platform reporting from 1 January 2024 (Shopify Payments is a reportable platform where applicable). https://www.gov.uk/guidance/reporting-rules-for-digital-platforms

Consistency rules: VAT threshold gross not payout (HP 1); on own-store DTC the seller accounts for VAT, marketplace deemed-supply is the contrast not the rule (HP 2); overseas gateway/app fee value counts toward the £90k threshold (HP 6); £135 rule is direct-to-consumer only (HP 3); no named-expert authority; no em-dashes.

## Hallucination danger zones

- Do NOT imply Shopify is a deemed supplier for a seller's own-store sales; the deemed-supplier rule (HP 2) is a marketplace mechanism. Shopify own-store = seller accounts for own VAT. This is a live confusion point; get it right.
- Do NOT state the €150 IOSS ceiling or £8,818/€10,000 OSS threshold here (HP open flags 1/2); route EU specifics to /vat/*.
- Do NOT re-explain generic incorporation / salary-dividend / MTD ITSA mechanics; link OUT to generalist.
- Do NOT 301/migrate the generalist Shopify blog; FENCE only.

## Stage 2 TODO

- Live-URL verify generalist `accountant-for-shopify-stores` and dedicated-rival Shopify pages.
- Confirm whether/how Shopify Payments falls under platform-reporting (HP 12) for the FAQ answer; keep to gov.uk-citable framing.
- Confirm seller lead-form field set with config.
