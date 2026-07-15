---
slug: vat-threshold-tracker
tier: calculator
route: /calculators/vat-threshold-tracker
intent: SELLER-PROBLEM (assist + capture). Marketplace sellers who watch bank payouts and under-count gross turnover, then breach the £90k rolling-12-month threshold without noticing. Exact-error intent is measured: "i didn't realise i went over the vat threshold" 210 / KD 0 / CPC £3.36.
---
# VAT registration threshold tracker: landing copy brief

## The wedge (why this tool exists — DEDUP_AUDIT T2 = DIFFERENTIATE)

The core seller trap (HP 1): the £90,000 rolling-12-month test bites on GROSS taxable sales, not on the net payout Amazon/eBay/Etsy deposit after fees. Sellers watching bank deposits systematically under-count and register late. This tool tracks rolling 12-month gross sales (plus the reverse-charge-on-fees add-back, HP 6) against the threshold and shows how many months of headroom remain.

Adjacency wall (DEDUP_AUDIT T2, LAUNCH_CORE adjacency rule): generalist owns `/calculators/vat-scheme-comparator` (generic scheme comparison — FRS vs standard vs cash accounting). That STAYS generalist and gets linked out. This tool does something the comparator does not: it tracks the payout-vs-turnover gross-sales trap over a rolling window. Generic scheme comparison is NOT rebuilt here.

## Target queries (evidence: LAUNCH_CORE.md / CALCULATORS.md, DataForSEO UK loc 2826, fetched 2026-07-12)

- Primary (exact-error intent): "i didn't realise i went over the vat threshold" 210 / KD 0 / CPC £3.36 (CALCULATORS.md).
- Secondary: "ltd company vat threshold" 210-vol variants ×3.
- Context: "amazon seller vat" measured only ~10/mo (LAUNCH_CORE) — demand lives in long-tail error phrasings, not the head; this is a problem-capture tool, not a head-volume play. Say so, do not inflate.

## Search-intent class + play

SELLER-PROBLEM. Two searcher states: (a) approaching the threshold, unsure whether payout or gross counts; (b) already breached, panicking. Play: tool leads (rolling-12-month gross tracker with headroom + breach-date output), landing copy explains gross-vs-payout, the 30-day forward-look test, the reverse-charge-fee add-back, and the overseas-establishment/deemed-supplier branch. Capture the breach case into ecommerce VAT compliance and the HMRC-letter service.

## Competitors to beat (COMPETITORS.md; live-URL check Stage 2)

- No verified rival ships a rolling-gross marketplace threshold tracker (fee-calc sites stop at fees; firms cover it in prose). Beat by being the only interactive gross-turnover tracker that models the payout trap and the reverse-charge add-back.

## Required structure (landing copy AROUND the tool)

H2 skeleton:
1. Calculator embed block (tool leads): /embed/vat-threshold-tracker
2. What this tracks (rolling 12-month GROSS taxable sales vs £90,000, with headroom and projected breach month — BLUF)
3. Why your payout is not your turnover (the fee trap — HP 1)
4. The inputs explained (see input spec)
5. The 30-day forward-look test (registration also triggers if you expect to breach in the next 30 days alone — HP 1)
6. Overseas fees count too (reverse charge on marketplace/ad fees billed from abroad adds to the £90k count — HP 6)
7. If you are not UK-established (deemed-supplier branch: the marketplace accounts for your UK VAT, and overseas sellers have no threshold — HP 2)
8. Worked example (see below)
9. What to do when you breach (register within the deadline; capture)
10. What this does not cover (scheme choice → link generalist comparator; exact VAT return mechanics)
11. FAQ

## Input spec (engine inputs; landing copy must match engine exactly)

- Monthly gross sales, last 12 months (gross, before platform fees) — entered per month or as a running series
- Reverse-charge overseas fees per month (marketplace/ad/software fees billed from abroad) — added to the taxable count (HP 6)
- Establishment status toggle: UK-established / not UK-established (drives the deemed-supplier branch — HP 2)
- Optional: next-month projected sales (feeds the 30-day forward-look and the projected-breach-month output)

## Outputs

- Rolling 12-month taxable total vs £90,000
- Headroom remaining (£ and estimated months at current run-rate)
- Projected breach month
- Registration-deadline flag if breached or forward-look triggered
- Overseas-established branch: "the marketplace is your deemed supplier; you have no registration threshold" (HP 2)

## Rates (EVERY figure from rates_ledger.json — ledger key named; golden-figure vitest at build)

- Registration threshold: `vat_registration_threshold` = £90,000 (rolling 12-month, gross taxable turnover, 30-day forward-look — HP 1)
- Overseas seller: `overseas_seller_registration_threshold` = £0 / no threshold (marketplace deemed supplier — HP 2)
- Reverse-charge-fee add-back rationale: `vat_registration_threshold` + HP 6 (Notice 741A)

## Worked example (placeholder; final example recomputes from engine)

eBay seller, UK-established, not VAT-registered. Bank payouts total £78,000 over 12 months, so the seller thinks they are safe under £90,000. But payouts are net of ~13% eBay fees: gross taxable sales are ~£89,700. Add £1,200 of reverse-charge ad fees billed from abroad → ~£90,900 taxable → threshold breached. The tool shows the breach the payout view hid. (Illustrative; regenerate from engine.)

## House positions touched

- HP 1 (`vat_registration_threshold` £90,000): rolling 12-month, GROSS taxable sales not payout, plus 30-day forward-look.
- HP 2 (`overseas_seller_registration_threshold` £0): overseas-established sellers on a marketplace have no threshold; the marketplace is deemed supplier; UK-established sellers remain liable themselves. Never blur establishment status.
- HP 6 (Notice 741A): reverse-charge value on overseas marketplace/ad fees counts toward the £90,000 threshold.

## Internal links (real launch-core slugs only)

- /services/ecommerce-vat-compliance (registration + schemes — capture)
- /services/hmrc-letter-online-sales (breach / letter capture)
- /vat/deemed-supplier-establishment (establishment branch depth)
- /vat/vat-on-marketplace-fees (reverse-charge-fee add-back depth)
- /calculators/seller-take-home (once registered, model VAT into take-home)
- /for/marketplace-sellers, /for/amazon-sellers (hubs)
- Link OUT to generalist `/calculators/vat-scheme-comparator` for generic scheme choice, do not rebuild.

## Hallucination / danger zones

- Never state the threshold test on payout; always gross taxable sales (HP 1 consistency rule).
- Never mix GB and NI treatment (HP 9/10/11) — this tool is the GB/UK-establishment registration test; NI distance-selling/OSS is out of scope, link to /vat/ioss-vs-oss instead.
- Overseas-established branch: the marketplace accounts for VAT, the seller does not register on threshold — do not tell an overseas seller to track a £90k threshold (HP 2).
- No em-dashes.

## Stage 2 TODO

- Confirm engine input set matches the spec (especially the reverse-charge add-back and establishment toggle).
- Live-check whether any rival ships a comparable tracker.
- Regenerate the worked example from the engine.
- Answer-box blocks 40-60 words.
