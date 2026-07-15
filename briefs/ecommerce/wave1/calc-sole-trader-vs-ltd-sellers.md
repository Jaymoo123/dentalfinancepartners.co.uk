---
slug: sole-trader-vs-ltd-sellers
tier: calculator
route: /calculators/sole-trader-vs-ltd-sellers
intent: SELLER-PROBLEM / structure decision. Online sellers deciding whether to incorporate, with seller-specific economics (stock/COGS, marketplace fees) the generic incorporation calc ignores. "ltd company tax calculator" 1,600 / KD 0 / CPC £4.53 is the strongest measured tool term in the set, but it is a GENERIC term so the generalist adjacency wall applies at metadata level too.
---
# Sole trader vs limited company for online sellers: landing copy brief

## The wedge (why this tool exists — DEDUP_AUDIT T3 = DIFFERENTIATE)

The crossover maths (HP 19/20): sellers reinvest cash into stock, so their "profit" and their available cash diverge, and the FA 2026 dividend rates (10.75%/35.75%/39.35%) change the extraction calculus. This tool runs the sole-trader vs Ltd crossover on 2026/27 figures with SELLER-SCOPED inputs: stock/COGS, marketplace fees, and the £1,000 trading allowance handling at the bottom end.

Adjacency wall (DEDUP_AUDIT T3, LAUNCH_CORE adjacency rule — Med confidence, police hard): generalist owns `/calculators/incorporation` and the `limited-company-vs-sole-trader-side-hustle` post. Those STAY generalist and get linked out. The wall is policed by making seller-specific inputs MANDATORY: COGS/inventory and platform-fee lines are what differentiate this from the generic incorporation calc. Because "ltd company tax calculator" is a generic term, differentiate at the metadata level too (seller framing in title/description), do not compete for the bare generic term.

## Target queries (evidence: LAUNCH_CORE.md / CALCULATORS.md, DataForSEO UK loc 2826, fetched 2026-07-12)

- Strongest measured tool term in the set: "ltd company tax calculator" / "calculate limited company tax" 1,600 / KD 0 / CPC £4.53 (CALCULATORS.md) — but GENERIC; adjacency wall applies at metadata level.
- Seller framing carries the differentiation; do not claim seller-specific volume that was not measured.

## Search-intent class + play

SELLER-PROBLEM (structure decision). Searcher wants a number: "would I keep more as a Ltd?" Play: tool leads (crossover output with the take-home delta at the seller's profit level), landing copy explains the seller economics (stock reinvestment, dividend rates, trading allowance floor), and captures the "which structure, and when to switch" case into the VAT compliance / reconciliation services.

## Competitors to beat (COMPETITORS.md; live-URL check Stage 2)

- Generic Ltd/incorporation calculators (including our own generalist one) stop at salary/dividend. Beat by joining stock/COGS and marketplace fees so the taxable-profit figure reflects a real seller, and by handling the £1,000 trading-allowance floor.

## Required structure (landing copy AROUND the tool)

H2 skeleton:
1. Calculator embed block (tool leads): /embed/sole-trader-vs-ltd-sellers
2. What this works out (take-home as a sole trader vs a limited company at your profit level — BLUF)
3. The inputs explained (see input spec — stock/COGS and fees are what make this seller-specific)
4. Why sellers are different (stock reinvestment: taxable profit exceeds cash; link to COGS blog)
5. The crossover explained (CT vs income tax + the FA 2026 dividend rates)
6. The bottom end: the £1,000 trading allowance (when income is tiny, incorporation rarely pays; HP 14)
7. Worked example (see below)
8. What this does not cover (IR35 is not relevant to sellers; exact salary optimisation; associated-company rules — link generalist for the generic version)
9. When to get help (capture → services)
10. FAQ

## Input spec (engine inputs; landing copy must match engine exactly)

- Annual revenue (gross)
- Marketplace fees (annual £ or % — seller-specific, MANDATORY for the wall)
- COGS / stock cost (annual — seller-specific, MANDATORY for the wall)
- Other allowable costs (ad spend, software, packaging, mileage)
- Desired drawings / how much you need to take out
- Salary level for the Ltd branch (default a sensible director salary; note this is not a full salary optimiser — link generalist)

## Outputs

- Sole trader: taxable profit → income tax + Class 4 NIC → take-home
- Limited company: taxable profit → corporation tax → dividend extraction (post-allowance) → take-home
- The delta (£ and %) and a plain-English "at this profit level, X keeps more"

## Rates (EVERY figure from rates_ledger.json — ledger key named; golden-figure vitest at build)

- Corporation tax small profits rate: `corporation_tax_small_profits_rate` = 19% (up to £50,000)
- Corporation tax main rate: `corporation_tax_main_rate` = 25% (above £250,000; marginal relief between — HP 19; associated-company rules reduce thresholds)
- Dividend basic: `dividend_rate_basic` = 10.75%
- Dividend higher: `dividend_rate_higher` = 35.75%
- Dividend additional: `dividend_rate_additional` = 39.35% (all FA 2026 s.4, from 6 Apr 2026 — HP 20)
- Dividend allowance: `dividend_allowance` = £500
- Trading allowance floor: `trading_allowance` = £1,000 (HP 14; allowance-instead-of-expenses is usually the worse choice for goods sellers with real COGS)
- (Income tax / Class 4 NIC bands: NOT in the ecommerce ledger — see HP gap flag. Pull from shared estate source at build; flag if absent.)

## Worked example (placeholder; final example recomputes from engine)

Seller with £120,000 revenue, £60,000 COGS, £15,000 other costs → £45,000 taxable profit, drawing it all. Sole trader: income tax + Class 4 NIC on £45,000. Limited company: `corporation_tax_small_profits_rate` 19% on £45,000 = £8,550 CT, then dividends at `dividend_rate_basic` 10.75% (and `dividend_rate_higher` 35.75% above the basic band) on the extracted profit above the £500 allowance. Show the take-home delta. (Illustrative; regenerate from engine.)

## House positions touched

- HP 14 (`trading_allowance` £1,000): the bottom-end floor; using the allowance instead of actual COGS is usually the worse choice for goods sellers.
- HP 17/18 (cash basis default; stock lower of cost and NRV): the "profit exceeds cash" section — link to COGS blog, do not re-derive.
- HP 19 (CT 19%/25%, £50k/£250k, associated-company rules): the Ltd branch.
- HP 20 (dividends 10.75%/35.75%/39.35% from 6 Apr 2026): extraction; never the old 8.75%/33.75%.

## Internal links (real launch-core slugs only)

- /services/ecommerce-vat-compliance, /services/settlement-payout-reconciliation (capture)
- /calculators/seller-take-home (the fuller fees+VAT+tax join)
- /calculators/vat-threshold-tracker (VAT decision alongside structure)
- /for/amazon-sellers, /for/shopify-sellers, /for/marketplace-sellers (hubs)
- /blog/... COGS/inventory + sole-trader-vs-Ltd-for-sellers posts (link when slugs fixed)
- Link OUT to generalist `/calculators/incorporation` and the side-hustle post for the generic version, do not rebuild.

## Hallucination / danger zones

- Dividend rates: 10.75%/35.75%/39.35% only (HP 20); golden-figure vitest fails on 8.75%/33.75%.
- Do NOT bring IR35 into a seller structure calc (LAUNCH_CORE: 3 IR35-adjacent terms flagged and dropped; goforma bleed is a rival, not our frame).
- Keep seller inputs (COGS, marketplace fees) mandatory — that is the adjacency wall; a version without them is the generalist calc and must not ship here.
- No em-dashes.

## Stage 2 TODO

- Confirm engine input set matches spec; confirm COGS + marketplace-fee lines are mandatory.
- Confirm shared income-tax / Class-4-NIC band source (HP gap below).
- Set seller-scoped metadata (title/description) so the generic "ltd company tax calculator" term does not cannibalise the generalist.
- Regenerate worked example from engine. Answer-box blocks 40-60 words.
