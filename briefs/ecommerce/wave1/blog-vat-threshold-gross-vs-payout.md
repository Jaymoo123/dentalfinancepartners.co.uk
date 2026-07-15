---
slug: vat-threshold-gross-vs-payout
tier: blog
route: /blog/vat-threshold-gross-vs-payout
category: "VAT and Cross-Border Selling"
intent: SELLER-PROBLEM. Marketplace sellers who track their bank deposits and under-count turnover, registering late. The gross-sales-vs-payout trap. Links to vat-threshold-tracker.
---
# The VAT Threshold Trap for Marketplace Sellers: It Is Your Gross Sales, Not Your Payout

> RAW HTML AT WRITE TIME. Blog body must be raw HTML (`<p>`, `<h2>`, `<ul>`, `<table>`), never markdown syntax. No em-dashes anywhere in user-facing copy.

## Target queries (evidence: LAUNCH_CORE.md / TOPICS.md, DataForSEO UK loc 2826, joined 2026-07-12)

- **Primary:** VAT-threshold-confusion family (gross vs payout) is named as a core SELLER-PROBLEM winnable class in LAUNCH_CORE; "amazon seller vat" measured 10/mo at the head (demand lives in long-tail variants). No single high-volume head; this is a long-tail-and-conversion page, not a traffic head.
- **Secondary:** "vat threshold marketplace", "do amazon fees count towards vat threshold", "shopify payments vat" (pool + autocomplete, no discrete measured volume).
- The generic "£90k VAT registration" mechanics are OWNED BY GENERALIST (`vat-threshold-2025-26`) and must LINK OUT to hollowaydavies.co.uk, not be re-explained here.

## Search-intent class + play

SELLER-PROBLEM (assist + capture). The trap is that sellers watch Amazon/eBay/Etsy bank deposits (net of fees) and think that is their turnover, so they under-count and register late. Play: name the trap in the BLUF, prove it with the reverse-charge twist (overseas fees ALSO count toward the threshold), then hand the reader the vat-threshold-tracker calculator to actually track gross. Capture edge: seller approaching or over £90k → ecommerce-vat-compliance service page.

## Competitors to beat (COMPETITORS.md; domains only at seed, live-URL check is Stage 2)

- **gov.uk vat-registration**: owns the £90k definitional head; we LINK to it and to the generalist generic page, and win on the seller-specific "gross not payout" and "overseas fees count too" angles the generic pages omit.
- **SaaS content arms (A2X / Link My Books)**: broad but shallow UK footprint (LAUNCH_CORE: 1,157 UK keywords, only 15 in top 10); beat on the tax POSITION they cannot credibly own (they sell software, not registration advice).

## Required structure

- H2 skeleton:
  1. The short answer: the £90,000 test is on gross sales, not the money that lands in your bank (BLUF box)
  2. Why the payout is not your turnover (fees, refunds, and marketplace-collected VAT are deducted before payout)
  3. The rolling 12-month test and the 30-day forward-look test
  4. The overseas-fees twist: reverse-charge value on Amazon/ad/software fees ALSO counts toward £90,000 (the surprise trigger)
  5. Worked example: a seller under threshold on payouts but over it on gross plus reverse-charge fees
  6. How to actually track it (embed the vat-threshold-tracker)
  7. Generic £90k registration mechanics: what to do once you cross (link OUT to generalist)
  8. Common failure modes (tracking deposits; ignoring reverse-charge fees; missing the 30-day test)
- FAQ candidates (no answers at seed stage):
  1. Is the VAT threshold based on my Amazon payout or my gross sales?
  2. Do marketplace fees count towards the VAT threshold?
  3. Does the marketplace-collected VAT count as my turnover?
  4. What is the 30-day forward-look VAT test?
  5. Do overseas advertising fees push me over the VAT threshold?
  6. When exactly do I have to register for VAT as a seller?
  7. What counts as taxable turnover for an online seller?
- Table/chart opportunities: payout-vs-gross reconciliation table (gross sale → minus fees/refunds/collected-VAT → payout, showing which figure the threshold uses); threshold-trigger table (rolling 12-month vs 30-day forward-look).
- Calculator embed: /embed/vat-threshold-tracker (PRIMARY placement after the tracking section). This is the page's conversion surface.
- Internal links within launch core: vat-threshold-tracker (the tool), ecommerce-vat-compliance (the service), vat-on-marketplace-fees (the reverse-charge depth), deemed-supplier-establishment (marketplace-collected VAT context), /for/amazon-sellers and /for/marketplace-sellers (hubs). Generic £90k registration → LINK OUT to hollowaydavies.co.uk (generalist `vat-threshold-2025-26`).

## House positions touched

- **HP 1 (registration threshold, gross not payout), copied exactly:** "The £90,000 test bites on gross taxable sales, not on the net amount deposited by Amazon, eBay or Etsy after their fees. Sellers who watch their bank deposits systematically under-count and register late. There is also a forward-look test: registration is required if taxable turnover is expected to exceed £90,000 in the next 30 days alone." Citation: https://www.gov.uk/vat-registration (verified 2026-07-15). Rates ledger: `vat_registration_threshold` = £90,000, applies_from 2024-04-01.
- **HP 6 (reverse-charge value counts toward threshold), copied exactly:** "the value of reverse-charge services counts toward the £90,000 VAT registration threshold, which is the classic surprise registration trigger for an otherwise sub-threshold seller buying large volumes of overseas platform and ad services." Citation: https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a (verified 2026-07-15).
- **HP 2 (deemed supplier context, for the collected-VAT point):** marketplace-collected VAT on overseas-established sellers is the marketplace's liability; do not blur with UK-established sellers. Citation: https://www.gov.uk/guidance/vat-and-overseas-goods-sold-to-customers-in-the-uk-using-online-marketplaces (verified 2026-07-15).
- Consistency rules that bind this page: "VAT registration turnover (position 1): always gross taxable sales, never the platform payout net of fees." and "Reverse-charge services (position 6): remind sub-threshold sellers that overseas platform and ad fees count toward the £90,000 threshold."

## Hallucination danger zones

- The £90,000 figure and the 30-day forward-look are locked (HP 1); do not state a different threshold or a "12-month lookback only" simplification.
- Do NOT re-explain generic registration process (how to register, effective date mechanics) on-site; LINK OUT to generalist per the adjacency rule. This page owns the seller-specific gross-vs-payout trap only.
- Reverse-charge-value-counts is a genuine and under-known point (HP 6); state it, but do not overreach into computing a specific seller's reverse-charge liability (that is advisory / the service page).
- Establishment status (HP 2): only UK-established sellers count their own marketplace sales toward the threshold in the ordinary way; do not blur GB and overseas establishment.
- No em-dashes.

## Stage 2 TODO

- WebFetch gov.uk vat-registration; confirm £90,000, rolling 12-month and 30-day forward-look.
- Confirm the generalist `vat-threshold-2025-26` live URL for the link-out target.
- Confirm vat-threshold-tracker embed slug exists at build.
