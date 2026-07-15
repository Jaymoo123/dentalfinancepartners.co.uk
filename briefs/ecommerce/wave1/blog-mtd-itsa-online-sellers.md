---
slug: mtd-itsa-online-sellers
tier: blog
route: /blog/mtd-itsa-online-sellers
category: "Making Tax Digital and Self Assessment"
intent: SELLER-PROBLEM. Sole-trader sellers hit by MTD ITSA from April 2026; seller-scoped (platform records, multi-platform income). Generalist owns the generic MTD cluster; this brief is strictly seller-scoped and links out for mechanics.
---
# Making Tax Digital for Income Tax, April 2026: What Online Sellers Actually Need to Do

> RAW HTML AT WRITE TIME. Blog body must be raw HTML (`<p>`, `<h2>`, `<ul>`, `<table>`), never markdown syntax. No em-dashes anywhere in user-facing copy.

## Target queries (evidence: LAUNCH_CORE.md / TOPICS.md, DataForSEO UK loc 2826, joined 2026-07-12)

- **Primary:** MTD-ITSA-for-sellers is a named launch blog. TOPICS.md: MTD ITSA is a LARGE generalist-owned cluster; the SELLER-SCOPED slice (platform records, multi-platform income) is the net-new wedge. No single high-volume measured head owned here; the head is generalist's.
- **Secondary:** "mtd for amazon sellers", "mtd for ebay sellers", "making tax digital ecommerce" (pool + autocomplete, seller-scoped, generic head owned by generalist).
- STRICT ADJACENCY RULE: generic MTD ITSA mechanics (quarterly-update process, digital-record software, sign-up steps) are GENERALIST-OWNED (large cluster: `making-tax-digital-accountant`, `-checklist-april-2026`, `mtd-itsa-april-2026-deadline`, `mtd-software-for-sole-traders`, `fundamentals/making-tax-digital-for-income-tax-guide`) and MUST LINK OUT to hollowaydavies.co.uk, never be re-explained.

## Search-intent class + play

SELLER-PROBLEM (assist + capture). Reader is a sole-trader seller who has heard MTD ITSA starts April 2026 and wants to know if it hits them and what is different for a MULTI-PLATFORM seller. Play: BLUF answers "does it apply to me" (the £50,000 threshold), then the SELLER-SPECIFIC content only (aggregating income across Amazon/eBay/Etsy/Shopify, digital records from platform reports, the reporting-rules overlap), then link OUT for generic mechanics. Capture edge: seller needing digital-record bookkeeping set up → settlement-payout-reconciliation / bookkeeping service.

## Competitors to beat (COMPETITORS.md; domains only at seed, live-URL check is Stage 2)

- **gov.uk MTD ITSA guidance + generalist estate cluster**: own the generic head; we do NOT contest it, we LINK to it and win the seller-specific slice (multi-platform income aggregation, platform-report digital records) they do not cover.
- **SaaS content (MTD software vendors)**: own the "best MTD software" listicle; beat on the tax-position seller angle, not the software comparison (LAUNCH_CORE: do not contest software listicles).

## Required structure

- H2 skeleton:
  1. The short answer: does MTD ITSA apply to you? (the £50,000 threshold, from 6 April 2026) (BLUF box)
  2. The threshold timeline for sellers (£50k from Apr 2026, £30k from Apr 2027, £20k from Apr 2028)
  3. How the threshold is measured for a multi-platform seller (combined self-employment + property income; aggregate ALL platforms, not per-platform)
  4. What is genuinely different for a seller (digital records built from multiple platform reports; the settlement/payout data problem)
  5. The platform-reporting overlap (HMRC already gets your data; MTD is your side of the same record; link platform-reporting-rules)
  6. Getting seller records MTD-ready (reconcile platform reports into digital records; link settlement-payout-reconciliation)
  7. The generic mechanics (quarterly updates, software, sign-up): link OUT to generalist, do not duplicate
  8. Common failure modes (measuring per-platform instead of aggregate; leaving reconciliation until the first quarterly update)
- FAQ candidates (no answers at seed stage):
  1. Does MTD for Income Tax apply to Amazon/eBay sellers?
  2. What is the MTD ITSA threshold for online sellers?
  3. Do I add up income across all my selling platforms for the threshold?
  4. When does MTD ITSA start?
  5. What digital records does a seller need?
  6. Is MTD the same as the platform reporting rules?
- Table/chart opportunities: MTD ITSA threshold-timeline table (£50k Apr 2026 / £30k Apr 2027 / £20k Apr 2028); multi-platform income-aggregation worked example (income summed across platforms vs the threshold).
- Calculator embed: none native fits. No embed (this is a rules/scoping page).
- Internal links within launch core: /blog/platform-reporting-rules (HMRC's side of the same data), settlement-payout-reconciliation (getting records MTD-ready), /blog/cash-vs-accruals-stock (the basis choice), /for/marketplace-sellers and /for/amazon-sellers (hubs). Generic MTD mechanics (quarterly updates, software, sign-up) → LINK OUT to generalist (`fundamentals/making-tax-digital-for-income-tax-guide`, `mtd-itsa-april-2026-deadline`).

## House positions touched

- **HP 16 (MTD ITSA thresholds), copied exactly:** "Sole-trader sellers with qualifying self-employment and property income above £50,000 must keep digital records and file quarterly updates from 6 April 2026. The threshold drops to £30,000 from 6 April 2027 and to £20,000 from 6 April 2028. The sole-trader seller cohort is hit first." Citation: https://www.gov.uk/guidance/check-if-youre-eligible-for-making-tax-digital-for-income-tax (verified 2026-07-15). Rates ledger: `mtd_itsa_threshold_from_apr_2026` 50000, `_2027` 30000, `_2028` 20000 — MATCH.
- **HP 12 (platform reporting, for the overlap section), copied exactly:** platforms report seller income to HMRC from 1 January 2024, first reports January 2025. Citations: https://www.gov.uk/guidance/reporting-rules-for-digital-platforms and https://www.gov.uk/government/publications/reporting-rules-for-digital-platforms/reporting-rules-for-digital-platforms (both verified 2026-07-15). Full treatment owned by platform-reporting-rules; reference only.
- Consistency rule that binds this page: threshold is COMBINED self-employment + property income (position 16); the seller aggregates across platforms, not per-platform.

## Hallucination danger zones

- THRESHOLD IS COMBINED self-employment + property income above £50,000 (HP 16); a multi-platform seller aggregates ALL platform income (and any property income), never measures per-platform. This is the core seller-specific correction; state it exactly.
- The timeline (£50k Apr 2026 / £30k Apr 2027 / £20k Apr 2028) is locked; do not misstate a threshold or date.
- Do NOT re-explain generic MTD mechanics (how quarterly updates work, which software, how to sign up) on-site; LINK OUT to generalist (strict adjacency rule for this brief). This page owns ONLY the seller-scoped slice.
- MTD ITSA (digital records) is DISTINCT from the platform reporting rules (HMRC receiving platform data); relate them, do not conflate. Reference platform-reporting-rules, do not duplicate it.
- MTD ITSA applies to unincorporated sole-trader sellers; do not imply it covers limited companies (that is MTD for CT, out of scope).
- No em-dashes.

## Stage 2 TODO

- WebFetch gov.uk MTD-ITSA eligibility page; confirm £50k/£30k/£20k thresholds and 6 April 2026/2027/2028 dates.
- Confirm generalist MTD cluster link-out URLs live (the generic-mechanics targets).
- Confirm platform-reporting-rules, settlement-payout-reconciliation, cash-vs-accruals-stock slugs exist.
