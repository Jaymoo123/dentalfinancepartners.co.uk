---
slug: for-dropshippers
tier: money
route: /for/dropshippers
intent: HIRE. Seller-owners running supplier-direct/dropship models. Weakest measured hub (0/mo dropship rows across all 5 pulls); kept on pool/autocomplete evidence, first to fold if the core is trimmed. Fence lightly.
---
# Audience page: accountants for dropshipping businesses (BRAND_TBD)

> Seed brief (Stage 1). Brand is BRAND_TBD; all copy references "the site". CTA and brand copy flow from site config at write time. No em-dashes anywhere.

## FENCE contract (DEDUP_AUDIT.md, MANDATORY, LIGHT)

Verdict: **FENCE (light)** vs generalist `/blog/accountant-for-dropshippers-uk` ("What Dropshipping Businesses Need from an Accountant in 2025/26"). Owner migrate-vs-fence ruling DEFERRED to deploy gate; do NOT 301/migrate at build. LAUNCH_CORE flags this as the weakest hub (0/mo measured) and the first to fold if the owner trims the core: fence lightly, keep the build proportionate, do not over-invest depth here.

**The wedge:** the generalist page is a single blog post. This hub wins on the three dropship-specific tax mechanics it does not carry:
- The £135 import rule (supply VAT at point of sale on low-value direct-to-consumer imports, not import VAT at the border) and how it catches dropshippers shipping direct from overseas.
- Supplier-direct imports (goods shipped straight from the supplier, often China, to the UK customer; who is the importer; establishment status; marketplace-vs-direct treatment).
- Ad-spend VAT (Facebook/Google/TikTok ad fees billed from abroad are reverse-charge services; the value counts toward the £90k threshold, the classic surprise registration for a sub-threshold dropshipper).
Seller lead-form optional fields (BUSINESS-audience rule): platforms sold on, monthly revenue band, VAT registration status, stock location (UK / EU / China), fulfilment model (FBA / FBM / 3PL).

## Target queries (evidence: LAUNCH_CORE.md measured re-score, DataForSEO UK loc 2826, joined 2026-07-12)

- 0 "dropship*" rows returned across all 5 measured pulls. No measured head. Kept on pool/autocomplete evidence (the VAT-£135 pain family). Treat as a depth/authority page for the £135 + ad-spend-VAT + supplier-direct-import decision points, not a volume play.

## Search-intent class + play

HIRE, but volume-thin. Do not build for traffic. Build a proportionate, correct decision page for the three dropship tax traps (£135 rule, supplier-direct import, ad-spend VAT) that converts the sellers who arrive and routes VAT depth to /vat/*. Keep scope light per LAUNCH_CORE's fold-risk note.

## Competitors to beat (COMPETITORS.md; domains only at seed stage, live-URL check is Stage 2)

- **generalist `accountant-for-dropshippers-uk`**: the FENCE wall. Differentiate lightly on the £135 rule + supplier-direct imports + ad-spend VAT vs their single blog post.
- Dedicated ecommerce firms rarely run a distinct dropship page; no strong dedicated rival. This is a depth/authority play, not a competitive dogfight.

## Required structure

H2 skeleton (keep proportionate, do not over-build):
1. Hero: accountants for dropshipping businesses (value prop + CTA + seller lead-form entry)
2. The £135 rule: why you may owe UK VAT at the point of sale, not at the border (direct-to-consumer low-value imports; route to /vat/135-import-rule)
3. Supplier-direct imports and who the importer is (goods shipped straight from the supplier; establishment status; marketplace-vs-direct treatment; route to /vat/deemed-supplier-establishment)
4. Ad-spend VAT: your Facebook, Google and TikTok fees are reverse charge (value counts toward the £90k threshold; route to /vat/vat-on-marketplace-fees and ecommerce-vat-compliance)
5. VAT threshold: gross sales, not net after ad spend and fees (route to VAT threshold tracker)
6. Sole trader or limited company as a dropshipper (seller-scoped; route to seller ST-vs-Ltd blog + calculator; generic incorporation stays generalist)
7. How engagement works / next step CTA

FAQ candidates (questions only):
- Do dropshippers need a specialist accountant?
- Do I have to charge UK VAT if I dropship low-value goods from overseas?
- When does the £135 import rule apply to my sales?
- Who is the importer when my supplier ships direct to my customer?
- Do I pay VAT on my Facebook and Google ad spend?
- Do my overseas ad fees count toward the £90,000 VAT threshold?
- Is my VAT threshold based on gross sales or net profit?
- Should I be a sole trader or a limited company?

Table/chart opportunities: "£135 rule: direct-to-consumer vs through a marketplace" contrast strip (who accounts for VAT), each figure linking gov.uk per HP consistency rule. Keep to one table; do not over-build.

Calculator embeds: none inline; link VAT threshold tracker and seller take-home / true-margin landing pages.

Internal links (launch core only): services (ecommerce-vat-compliance, selling-into-the-eu, hmrc-letter-online-sales); /vat/* (135-import-rule, deemed-supplier-establishment, vat-on-marketplace-fees, ioss-vs-oss); calculators (vat-threshold-tracker, seller-take-home, sole-trader-vs-ltd-sellers); /research/online-seller-index; blogs (vat-threshold-gross-vs-payout, sole-trader-vs-ltd-online-sellers, platform-reporting-rules). Link OUT to hollowaydavies.co.uk for generic incorporation, generic salary/dividend, generic MTD ITSA mechanics.

## House positions touched (quoted HP text + citation URL)

- HP 3: "Imports of £135 or less sold directly to UK consumers: supply VAT is due at the point of sale, not import VAT at the border." https://www.gov.uk/guidance/vat-and-overseas-goods-sold-directly-to-customers-in-the-uk
- HP 2: overseas-established sellers, marketplace deemed supplier; where the same sale goes through a marketplace the marketplace accounts for VAT instead (contrast with HP 3 direct sales). https://www.gov.uk/guidance/vat-and-overseas-goods-sold-to-customers-in-the-uk-using-online-marketplaces
- HP 6: "Marketplace and software fees billed from abroad are reverse-charge services; the seller self-accounts for UK VAT and that reverse-charge value counts toward the £90,000 registration threshold." (covers overseas ad-platform fees) https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a
- HP 1: VAT threshold £90,000 gross taxable sales, not net after fees/ad spend. https://www.gov.uk/vat-registration

Consistency rules: the £135 rule is direct-to-consumer ONLY; if the sale goes through a marketplace the marketplace accounts for VAT (HP 3 vs HP 2, explicit writer rule); overseas ad/platform fee value counts toward the £90k threshold (HP 6); VAT threshold gross not net (HP 1); no named-expert authority; no em-dashes.

## Hallucination danger zones

- Do NOT blur the £135 direct-to-consumer rule (HP 3) with the marketplace deemed-supplier rule (HP 2); dropship sales split between the two depending on channel. This is the core distinction of the page, get it right.
- Do NOT state the €150 IOSS ceiling or £8,818/€10,000 OSS threshold here (HP open flags 1/2); route EU cross-border to /vat/*.
- EU per-member-state establishment / fiscal-representative / EPR packaging (DE, FR) is EU-side and out of gov.uk scope (HP open flag 5); do not assert on-site without an EU citation at build.
- Do NOT re-explain generic incorporation / salary-dividend / MTD ITSA mechanics; link OUT to generalist.
- Do NOT 301/migrate the generalist dropshipping blog; FENCE (light) only.
- Do NOT over-build: this hub may fold if the owner trims the core; keep depth proportionate.

## Stage 2 TODO

- Confirm with owner whether this hub survives the core-trim decision before investing further build effort.
- Live-URL verify generalist `accountant-for-dropshippers-uk`.
- Confirm seller lead-form field set with config.
