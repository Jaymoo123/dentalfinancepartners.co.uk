---
slug: services-pharmacy-valuation-goodwill
tier: money
route: /services/pharmacy-valuation-goodwill
intent: EVENT-PROBLEM / HIRE. The owner (selling) or buyer (acquiring) who wants to understand how pharmacies are actually priced before they trust a broker's number. Method-level education plus a conversion to a valuation-support engagement. Sits between the purchase and sale pages. Captures "how is a pharmacy valued" and "what is pharmacy goodwill worth" and routes the price-first visitor into the deal-support funnel.
---
# Service page: pharmacy valuation and goodwill

> Seed brief (Stage 1). Brand is BRAND_TBD; all copy references "the site" / "the firm". CTA and brand copy flow from site config at write time. No em-dashes anywhere.

## Target queries (evidence: LAUNCH_CORE.md, DataForSEO gl=GB, 2026-07-11)

- Primary: "pharmacy valuation" 10-20/mo, CPC £7.90-15.33 (the price head; high CPC, tiny volume, the classic high-value/low-competition wedge)
- Primary: "pharmacy goodwill" (no measured Ads volume, GEO/answer-box surface; the concept every buyer and seller searches)
- Secondary: "how do pharmacies make money" 110/mo (the earnings-basis question underneath a valuation; supporting angle); "how is a pharmacy valued" (autocomplete-real)
- Note: brokers (Hutchings-tier) publish valuation prose and own the listing side; no rival interactive tool seen in this run's fetched evidence.

## Search-intent class + play

EVENT-PROBLEM / HIRE page that teaches the pricing method honestly, then converts. The single hard rule from house positions governs this whole page: valuation stays method-level (HP 16). Pharmacies price on a multiple of adjusted EBITDA and on pence-per-item benchmarks, but the house positions never assert a specific multiple without a cited broker source captured at build time, so this page explains the arithmetic and the drivers without inventing a number. The substance is goodwill dominance (HP 13): goodwill, driven by the NHS contract and item volume, is most of the price, which is why a pharmacy is not valued like a normal shop. The wedge against brokers is a faceless, cited, method-transparent explainer that does not need the visitor to hand over their details to see how the sausage is made, plus the purchase affordability calculator which encodes the arithmetic using the visitor's own inputs (not an asserted market multiple). The play: educate on method, convert the "so what is mine worth" question into a valuation-support engagement.

## Competitors to beat (COMPETITORS.md; domains only at seed stage, live-URL check is Stage 2)

- **Pharmacy brokers (Hutchings, pharmacysalesuk-tier)** publish valuation prose and own the listing side. Beat by: a transparent, cited, method-level explainer that does not gate the method behind a valuation request, plus the calculator that uses the visitor's own numbers.
- **Verified specialist pharmacy accountants (brochure-tier)**. Beat on depth: the adjusted-EBITDA and pence-per-item method explained properly, goodwill dominance and its tax consequences, not a one-line "we value pharmacies" claim.
- **Generalist "how to value a business" pages**. Beat on pharmacy specificity: goodwill driven by the NHS contract and item volume, the contract-as-asset framing, and the corporation-tax goodwill-relief restriction on a company purchase.

## Required structure

H2 skeleton (open each with a 40-60 word BLUF answer):
1. How pharmacies are actually priced (answer-first; adjusted EBITDA multiple and pence-per-item, method-level, no invented number; HP 16; then the service)
2. Why goodwill dominates the price (the NHS contract and item volume drive value, not the shop fittings; HP 13)
3. Adjusting EBITDA: what a real valuation normalises out (owner remuneration, one-offs, Category M margin volatility; HP 8 context)
4. Pence-per-item benchmarks: what they are and why they need a cited source, not a made-up multiple (HP 16, transparency as trust)
5. Goodwill and tax: the corporation-tax relief restriction on a company purchase, and the CGT/BADR consequence on a sale (HP 13; pointers to the sale and purchase pages)
6. Model a purchase or sale price against your own numbers (embed the purchase affordability calculator; the arithmetic, not an asserted market multiple)
7. Next step CTA (get a method-transparent view before you accept a broker's number)

FAQ candidates (questions only):
- How is a pharmacy valued? (answer: method-level, a multiple of adjusted EBITDA and pence-per-item benchmarks; HP 16)
- Why is goodwill such a big part of the price? (answer: the NHS contract and item volume drive value; HP 13)
- What does "adjusted EBITDA" mean for a pharmacy?
- What is a pence-per-item benchmark? (answer: a per-prescription-item pricing yardstick, needs a cited market source; HP 16)
- Do you give a specific valuation multiple? (answer: only with a cited broker source captured at the time; we never invent one; HP 16)
- Can I get tax relief on the goodwill I buy? (answer: restricted, limited cases only; HP 13)
- How does goodwill affect my CGT when I sell? (route to the sale page; HP 13)
- How do pharmacies make money, in valuation terms? (answer: contract-driven reimbursement plus remuneration, not till takings; HP 6, route to us)

Table/chart opportunities: a "value drivers" table (NHS contract / item volume / service income lines / adjusted profit) mapped to HP 13 and HP 8, describing what pushes value up or down WITHOUT asserting a multiple; a method box (adjusted-EBITDA multiple and pence-per-item, both labelled "method, not a rate we assert without a cited source") mapped to HP 16. NO multiple figures. No fee figures.

Calculator embed: /embed/pharmacy-purchase-affordability (mid-page, in the modelling section; the launch-tier tool per CALCULATORS.md; it encodes the pence-per-item / EBITDA-multiple arithmetic but takes the visitor's OWN inputs, it does not publish a market multiple; output is a range ending at "your situation has X complexity, speak to us"). This is the honest way to give a price feel without breaching HP 16.

Internal links (launch core): homepage, /for/selling-a-pharmacy and /for/buying-a-pharmacy (both hubs, valuation sits between them), services-pharmacy-purchase-accounting (buy-side deal support), services-pharmacy-sale-cgt-badr (the tax on the gain the valuation sets), services-nhs-payment-reconciliation-fp34 (the income that underpins EBITDA), /research/pharmacy-openings-closures-index (market context), /calculators/pharmacy-purchase-affordability (landing).

## House positions touched (docs/pharmacies/house_positions.md; every figure maps to a position + gov.uk URL or flagged gap)

- HP 16: valuation stays method-level; pharmacies price on a multiple of adjusted EBITDA and on pence-per-item benchmarks; the calculator encodes the arithmetic, but house positions never assert a specific multiple without a cited broker source captured at build time. Do NOT invent multiples. Internal position, no external rate cited (calculator method documented in CALCULATORS.md).
- HP 13: goodwill dominates pharmacy pricing (driven by the NHS contract and item volume); on a company purchase, corporation tax relief on goodwill is restricted and only available in limited cases at fixed rates. https://www.gov.uk/guidance/corporation-tax-relief-on-goodwill-and-relevant-assets
- HP 6 (support): pharmacy income is contract-driven, not till-driven (reimbursement plus remuneration under the CPCF); context for what EBITDA is built on. https://www.england.nhs.uk/community-pharmacy-contractual-framework/ and https://www.nhsbsa.nhs.uk/pharmacies-gp-practices-and-appliance-contractors/drug-tariff
- HP 8 (support): Drug Tariff and Category M clawbacks and price volatility set gross margin centrally and adjust it retrospectively; context for why EBITDA must be adjusted for margin variance. https://www.nhsbsa.nhs.uk/pharmacies-gp-practices-and-appliance-contractors/drug-tariff

Consistency rules: NEVER assert a specific valuation multiple or a specific pence-per-item figure without a cited broker source captured at build time (HP 16). Goodwill dominance (HP 13) is the spine. Goodwill relief on a company purchase is restricted, never stated as generally available (HP 13).

## Hallucination danger zones

- HP 16 IS the danger zone for this page. Do NOT invent, estimate, or "typically around" any EBITDA multiple or pence-per-item number. If the page needs an illustrative figure, either use a clearly labelled placeholder the visitor overrides in the calculator, or FLAG for a cited broker source at Stage 2. This is the single hardest rule on the page.
- Do NOT imply corporation tax relief on purchased goodwill is generally available; it is restricted to limited cases at fixed rates (HP 13).
- Do NOT drift into telling the visitor what their pharmacy is worth as a number; keep it method-level and route the specific-value question to "speak to us".
- Do NOT present the calculator output as a valuation; it is a scenario/affordability estimate ending at "speak to us" (CALCULATORS.md).
- Positioning wall: nothing clinical or patient-facing; pricing method and tax only.
- No credential claims, no named expert (faceless authority; owner is not an accountant). No fee or pricing figures. No em-dashes.

## Stage 2 TODO

- Live-URL verify: a Hutchings-tier broker valuation page, one specialist pharmacy-accountant valuation page, a generalist business-valuation page for the method contrast.
- HP GAP request: if the page is to state ANY specific EBITDA multiple range or pence-per-item benchmark, source it from a named broker publication captured at build time and add it as a new house position with the citation; until then the page stays strictly method-level (HP 16).
- Confirm the purchase affordability calculator embed slug against the built config.
- Confirm current wording of the goodwill relief restriction (HP 13) at gov.uk at build time.
