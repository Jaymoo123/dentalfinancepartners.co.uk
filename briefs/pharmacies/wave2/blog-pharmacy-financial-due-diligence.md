---
slug: pharmacy-financial-due-diligence
tier: blog
route: /blog/buying-a-pharmacy/pharmacy-financial-due-diligence
category: "Buying a Pharmacy"
intent: EVENT-PROBLEM (assist + capture). A buyer under offer, or about to be, wants to know what financial due diligence on a pharmacy actually covers, why the NHS numbers differ from a normal retail P&L, and what a specialist checks before they commit. Funnels to /services/pharmacy-purchase-accounting and /for/buying-a-pharmacy. Method-level; no invented multiples, margins or lender rates.
---
# Financial Due Diligence When Buying a Pharmacy

## Target queries (evidence: LAUNCH_CORE.md, TOPICS.md, DataForSEO UK 2026-07-11)

- **Primary cluster:** "pharmacy due diligence", "buying a pharmacy due diligence", "pharmacy accounts due diligence" (autocomplete-real, long-tail under the "buying a pharmacy" 140/mo KD 59 + "buying a pharmacy uk" 70/mo KD 0 heads). EVENT-PROBLEM, high lead value.
- Adjacent buyer intent already served by siblings: the checklist blog (end-to-end process), the share-vs-asset blog (structure), the first-time-buyer-finance blog (affordability). This post owns the DUE-DILIGENCE workstream specifically.
- Do NOT chase "pharmacy for sale" (2,400/mo) here; that is broker-listing intent handled by the sale-listing blog (sibling wave-2).

## Search-intent class + play

EVENT-PROBLEM. The buyer has seen the seller's accounts and does not know which numbers to trust or what a pharmacy P&L hides. Play: BLUF box defining pharmacy financial DD (verifying the NHS income is real, the margin story is sustainable, and the accounts are clean, not just reading the profit line), then the NHSBSA/FP34 income verification, then the Category M margin story, then the VAT-mix check, then the balance-sheet and staff-cost checks, then what a specialist does before exchange (capture). The FP34/Category M/VAT-mix specificity no generalist DD checklist has is the win.

**Cannibalisation split (locked at seed):** this blog owns the DD workstream. The checklist blog owns the end-to-end buying process and links here for DD. /services/pharmacy-purchase-accounting owns the hire intent. The share-vs-asset blog owns structure. Keep valuation method out (that is the goodwill/valuation lane); reference it, do not restate multiples.

## Dedup gate

- **Generalist estate:** page-level dedup vs generalist/web/content/blog before writing (see wave-2 DEDUP notes). Generic "business due diligence" / "buying a business" content belongs to generalist; every section here must be pharmacy-specific (FP34 income, Category M margin, VAT mix, GPhC/contract transfer), not a generic DD checklist reskinned.
- **Own 27 assets:** deconflict from the buying-a-pharmacy-uk-checklist blog (process) and share-vs-asset blog (structure). This post is the DD deep-dive those two link to.

## Required structure (RAW HTML body: no markdown conversion; write <h2>/<p>/<ul>/<table>)

H2 skeleton:
1. What financial due diligence on a pharmacy actually means (BLUF box, 40-60w: it verifies the NHS income is real and recurring, the margin story is sustainable, and the accounts are clean, not just that the P&L shows a profit)
2. Verifying the income: FP34 history and the NHSBSA payment lag (HP 6, HP 7) — income is contract-driven not till-driven; check the FP34 submission history and the ~two-month payment lag, not the till
3. The margin story: Category M and Drug Tariff (HP 8) — gross margin is set centrally and retrospectively adjusted, so a single year's margin is not the trend; check margin variance over time
4. The VAT mix check (HP 1, HP 4) — a pharmacy is VAT-mixed (zero-rated NHS dispensing vs standard OTC); confirm the retail scheme is right and the VAT position is not overpaid or exposed
5. Balance sheet, stock and staff costs (HP 25 employer NIC 15%/£5,000; HP 27 corporation tax) — dispensing stock valuation, staff cost run-rate under 15% employer NIC, any associated-company entanglement
6. Regulatory and contract DD (HP 10, HP 11) — the NHS contract does not transfer automatically (2013 Regulations); GPhC premises registration and superintendent requirements; ownership-mechanics only, never clinical
7. What a specialist checks before you exchange (capture)

FAQ candidates (no answers at seed):
- What does financial due diligence on a pharmacy cover?
- How do I verify a pharmacy's NHS income is real?
- Why can't I trust a single year's gross margin?
- Does the NHS contract transfer automatically when I buy the pharmacy?
- What should I check about the VAT position before buying?
- How long does pharmacy due diligence take?

Table/chart opportunities:
- A DD checklist table: workstream (income / margin / VAT / balance sheet / staff / regulatory), what to request from the seller, why it matters, the pharmacy-specific red flag. This is the dedup centrepiece.
- An "income verification" mini-table: source document (FP34 schedules, NHSBSA remittances, VAT returns, payroll) vs what it proves.

Internal links (launch core): /services/pharmacy-purchase-accounting (service, capture), /for/buying-a-pharmacy (hub), the buying-a-pharmacy-uk-checklist blog, the share-vs-asset-purchase blog, /calculators/pharmacy-purchase-affordability (rough number), /calculators/pharmacy-fp34-cash-flow-estimator (income-timing). Route CGT/BADR intent to /services/pharmacy-sale-cgt-badr only if a seller angle arises.

## House positions touched (docs/pharmacies/house_positions.md, ONLY figures source)

- **HP 6 + HP 7 (income is contract-driven; FP34 monthly, ~two-month payment lag, advance on account):** the income-verification core. Citations: https://www.england.nhs.uk/community-pharmacy-contractual-framework/ and https://www.nhsbsa.nhs.uk/pharmacies-gp-practices-and-appliance-contractors/submitting-prescriptions
- **HP 8 (Category M / Drug Tariff margin set centrally and retrospectively adjusted):** why a single year's margin is not the trend. Citation: https://www.nhsbsa.nhs.uk/pharmacies-gp-practices-and-appliance-contractors/drug-tariff
- **HP 1 + HP 4 (VAT-mixed; retail schemes split takings):** the VAT-mix check. Citations: https://www.gov.uk/guidance/health-professionals-pharmaceutical-products-and-vat-notice-70157 and https://www.gov.uk/hmrc-internal-manuals/vat-retail-schemes
- **HP 25 (employer NIC 15% above £5,000 secondary threshold):** the staff cost run-rate check; NEVER use 13.8%/£9,100. Citation: https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027
- **HP 27 (corporation tax 25%/19% + marginal relief, limits divided by associated companies):** the associated-company entanglement flag. Citation: https://www.gov.uk/corporation-tax-rates
- **HP 10 + HP 11 (regulated market entry, 2013 Regulations; GPhC premises + superintendent; contract does not transfer automatically):** regulatory DD, ownership-mechanics only. Citations: https://www.legislation.gov.uk/uksi/2013/349/contents and https://www.pharmacyregulation.org/pharmacies

## Hallucination danger zones (enforce)

- NO invented valuation multiples, target margins, pence-per-item benchmarks or clawback percentages (HP 8, HP 16). Margin variance is described as a method; figures depend on the deal.
- NO invented lender rates, LTVs or "typical" DD timeframes as facts; keep timeframe qualitative.
- Employer NIC is 15% / £5,000 secondary threshold (HP 25). Corporation tax is 25%/19% with marginal relief in the £50,000 to £250,000 band, divided by associated companies (HP 27). Never quote stale figures.
- FP34 payment lag is ~two months (HP 7); do not invent an exact advance percentage or payment day.
- Regulatory content is ownership/registration mechanics ONLY (HP 11). Nothing clinical, prescribing or patient-safety. No cross-links to other estate sites.
- Any worked figures illustrative, labelled, arithmetic-consistent. No credential claims, no named individuals, no pricing. No em-dashes.
- Body is raw HTML: write tags directly.

## Stage 2 TODO

- Page-level SERP + generalist dedup at write time (mandatory, 47% dupe lesson): confirm no generic-DD-checklist sentence overlap.
- Confirm FP34 / NHSBSA framing at the submitting-prescriptions page before restating (HP 7).
- Sanity-check any illustrative staff-cost or CT figures end to end.

## FLAGGED open items

- Deliberate gaps: no DD timeframe, no valuation multiple, no margin/clawback percentage stated (no cited source; method-level by design). Correct handling, not a gap to fill.
