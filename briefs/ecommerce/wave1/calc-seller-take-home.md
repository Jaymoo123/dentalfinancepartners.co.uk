---
slug: seller-take-home
tier: calculator
route: /calculators/seller-take-home
intent: SELLER-PROBLEM / gap-play. Marketplace sellers who watch bank deposits and cannot see their true margin or take-home. No measured "take home"/"margin" query volume; demand proxied by the eBay/Etsy/Amazon fee-calc families (eBay 5,400 head) + HIRE CPCs (LAUNCH_CORE, CALCULATORS.md). This is the flagship tool: it joins marketplace fees + COGS + VAT + income tax, which no rival does interactively.
---
# Seller take-home / true-margin calculator: landing copy brief

## The wedge (why this tool exists — DEDUP_AUDIT T1 = DIFFERENTIATE)

Verified vacuum (LAUNCH_CORE, CALCULATORS.md): fee-only calculators are saturated (ecomcalctools 1,375 URLs, marginwise, ukcalculator, Amazon's own Seller Central calculator). None of them join marketplace fees to UK TAX; the dedicated firms cover the tax in prose but never interactively. This tool is the join: revenue → marketplace fees → COGS → VAT treatment → income tax (sole trader IT/NIC vs Ltd CT + dividend) → per-unit and monthly take-home.

Adjacency wall (DEDUP_AUDIT T1, LAUNCH_CORE adjacency rule): generalist (Holloway Davies) owns the generic `/calculators/salary-dividend` and `/calculators/incorporation` calcs. Those STAY generalist and get linked out, never re-explained. This tool is differentiated by seller-specific inputs (marketplace referral + fulfilment fees, COGS, VAT-on-fees reverse charge) that the generic salary/dividend calc has no concept of. Do NOT rebuild a generic salary-dividend optimiser here; the join to fees + COGS is the entire point.

## Target queries (evidence: LAUNCH_CORE.md / CALCULATORS.md, DataForSEO UK loc 2826, fetched 2026-07-12)

- No direct "take home" / "true margin" calculator query returned measured volume — this is a GAP-PLAY, not a query-play. Say so; do not invent volume.
- Demand proxied by the fee-calc families the tool sits adjacent to: "ebay price calculator" 5,400 / KD 19, "ebay uk fee calculator" family (~2,900 + 2,900 + 720), "etsy fee calculator" 720 / KD 0, "amazon fee calculator" 390 / KD 21.
- Lead value proxied by HIRE CPCs: "amazon fba accountant" CPC £37.56.
- Build platform-parameterised: Amazon-first for lead value, eBay/Etsy skins in the same config file (CALCULATORS.md ordering).

## Search-intent class + play

SELLER-PROBLEM (assist + capture). The searcher believes their business is profitable because money lands in the bank, then discovers taxable profit exceeds the bank balance (stock reinvestment) and that VAT/tax was never modelled. Play: tool leads the page (above the fold), landing copy explains the four-stage join, cites gov.uk / legislation per house positions, and captures the "my accountant never modelled fees + VAT together" edge into the settlement/payout reconciliation service and the ecommerce VAT compliance service.

## Competitors to beat (COMPETITORS.md / CALCULATORS.md; live-URL check is Stage 2)

- ecomcalctools.com, marginwise.co.uk, ukcalculator.com — stop at fees, no tax. Beat by carrying the calculation through VAT and income tax to actual take-home.
- The dedicated firms (socialcommerceaccountants.com etc. with "Free Tools" nav) — cover tax in prose, not interactively. Beat with the live join.

## Required structure (landing copy AROUND the tool)

H2 skeleton:
1. Calculator embed block (tool leads the page): /embed/seller-take-home
2. What this calculator works out (true margin per unit + monthly take-home after fees, COGS, VAT and income tax — BLUF)
3. The four stages explained (revenue → marketplace fees → COGS → VAT treatment → income tax), each in one paragraph
4. The inputs explained (see input spec below)
5. Worked example (see below)
6. How the maths works (methodology; every rate cited to gov.uk / legislation.gov.uk per HP)
7. Why your bank balance is not your profit (stock reinvestment; link to COGS/inventory blog)
8. What the calculator does not cover (exact live fee schedules — link to Amazon/eBay/Etsy; margin scheme; multi-currency; MTD filing)
9. When to get help (capture edge → settlement-payout-reconciliation, ecommerce-vat-compliance)
10. FAQ

## Input spec (engine inputs; landing copy must match the engine exactly)

- Platform (Amazon / eBay / Etsy / Shopify) — drives the fee model
- Sale price per unit (gross, inc VAT if registered)
- Units per month
- Marketplace referral fee (% or £ — user enters from their own platform statement; tool does NOT hardcode live fee schedules, see danger zones)
- Fulfilment fee per unit (FBA / postage / pick-pack)
- COGS per unit (landed cost of the item)
- Other monthly costs (ad spend, software, packaging)
- VAT status toggle: not registered / registered (standard) — if registered, output VAT due on sales and reclaimable input VAT
- Reverse-charge-on-fees toggle: marketplace/ad fees billed from abroad (Notice 741A) — self-account for VAT on fees, and note that value counts toward the £90,000 threshold (HP 6)
- Structure toggle: sole trader (income tax + Class 4 NIC) vs limited company (corporation tax + dividend extraction)

## Outputs

- Per-unit: gross → fees → COGS → contribution margin → VAT → per-unit profit
- Monthly: total revenue, total fees, total COGS, VAT position, taxable profit, tax, take-home
- Effective margin % and effective tax rate

## Rates (EVERY figure from rates_ledger.json — ledger key named; golden-figure vitest at build)

- VAT registration threshold context: `vat_registration_threshold` = £90,000 (gross taxable sales, not payout — HP 1)
- Reverse charge on overseas fees counts toward threshold: `vat_registration_threshold` + HP 6 (Notice 741A)
- Corporation tax small profits rate: `corporation_tax_small_profits_rate` = 19% (up to £50,000)
- Corporation tax main rate: `corporation_tax_main_rate` = 25% (above £250,000; marginal relief between)
- Dividend rates (Ltd extraction): `dividend_rate_basic` = 10.75%, `dividend_rate_higher` = 35.75%, `dividend_rate_additional` = 39.35% (FA 2026 s.4, from 6 Apr 2026)
- Dividend allowance: `dividend_allowance` = £500
- (Income tax / Class 4 NIC bands for sole traders: these are NOT in the ecommerce rates ledger — see HP gap flag below. Do not hardcode; pull from the shared estate tax-band source at build and flag if absent.)

## Worked example (placeholder figures; final example must recompute from the engine)

Amazon FBA seller, VAT-registered, sole trader. Sale price £30 inc VAT; referral fee 15% (£4.50); FBA fee £3.20; COGS £9; ad spend £2/unit. VAT on sale £5 (£30 gross → £25 net). Per-unit contribution after fees, COGS, ad = £25 − 4.50 − 3.20 − 9 − 2 = £6.30 net-of-VAT margin. At 400 units/month → ~£2,520 taxable contribution before overheads and income tax. Show the same seller as a limited company using `dividend_rate_basic` 10.75% on extraction. (Figures illustrative; the shipped worked example must be regenerated from the engine so copy never diverges.)

## House positions touched

- HP 1 (`vat_registration_threshold` £90,000): turnover is gross taxable sales, never the platform payout net of fees.
- HP 6 (`vat_registration_threshold`, Notice 741A): overseas marketplace/ad fees are reverse-charge services; the seller self-accounts and the value counts toward the £90,000 threshold.
- HP 17/18 (cash basis default; stock at lower of cost and NRV, BIM33115): the "bank balance is not profit" section — link to COGS/inventory blog, do not re-derive stock valuation here.
- HP 19 (CT 19%/25%, £50k/£250k): the Ltd branch.
- HP 20 (dividends 10.75%/35.75%/39.35% from 6 Apr 2026): Ltd extraction; never the old 8.75%/33.75%.

## Internal links (real launch-core slugs only)

- /services/settlement-payout-reconciliation (bookkeeping wedge — capture)
- /services/ecommerce-vat-compliance (VAT capture)
- /vat/vat-on-marketplace-fees (reverse charge explainer)
- /calculators/sole-trader-vs-ltd-sellers (the structure decision, deeper)
- /calculators/vat-threshold-tracker (the threshold this tool references)
- /for/amazon-sellers (Amazon variant hub)
- /blog/... COGS/inventory "why is my profit higher than my bank balance" post (link when slug fixed)
- Link OUT to generalist for generic salary/dividend optimisation, do not rebuild it.

## Hallucination / danger zones

- Do NOT hardcode live Amazon/eBay/Etsy fee schedules. They are ToS-scraping maintenance debt (CALCULATORS.md "rejected"); the user enters their own fee % from their statement. Copy must say the tool uses the seller's own fee figures.
- Never state turnover as the platform payout (HP 1 consistency rule).
- Dividend rates: 10.75%/35.75%/39.35% only (HP 20); the golden-figure vitest will fail on 8.75%/33.75%.
- Do not conflate zero-rated with exempt if exports come up (HP 5).
- No em-dashes.

## Stage 2 TODO

- Confirm engine input set matches the input spec above.
- Confirm the shared income-tax/Class-4-NIC band source used, and whether ecommerce ledger needs those keys added (HP gap below).
- Live-check the fee-calc SERP occupants and regenerate the worked example from the engine.
- Answer-box blocks 40-60 words.
