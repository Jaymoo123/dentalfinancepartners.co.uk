---
slug: staking-rewards-tax-two-step
tier: blog
route: /blog/staking-mining-airdrops/staking-rewards-tax-two-step
category: Staking Mining & Airdrops
intent: DIY-informational, technical. The two-step: income tax on the sterling value at receipt (miscellaneous vs trading income), then CGT on the later disposal with base cost equal to that receipt value. The £1,000 trading/miscellaneous allowance shelters the income leg, NOT the CGT leg. Capture into /for/defi-and-staking and the staking/mining income estimator.
---
# Staking Rewards Tax UK: The Two-Step (Income on Receipt, Then CGT)

## Target queries (evidence: LAUNCH_CORE.md, DataForSEO UK measured 2026-07-11)

- **Primary:** "staking rewards tax uk" 10/mo (measured, below volume threshold; the /for/defi-and-staking hub stands on SERP evidence and long-tail intent, not volume, per LAUNCH_CORE, flagged honestly not falsified).
- This is an authority/GEO and calculator-funnel page more than a traffic page; judged on assist + leads, not head volume.

## Search-intent class + play

DIY-informational, technical, with a calculator-funnel capture. Stakers routinely account for the income leg and forget the second CGT leg, or wrongly assume the £1,000 allowance clears everything. Play: BLUF answer box stating the two-step cleanly (income on receipt at sterling value, then CGT on disposal with base cost = receipt value), then step one (income: miscellaneous vs trading, valued at receipt), then step two (CGT base cost is that receipt value, so you are not taxed twice on the same value), then the £1,000 allowance boundary (shelters income, not CGT), then a short worked illustration, then capture. The "£1,000 does not clear your CGT" correction is the differentiator.

**Cannibalisation split (locked at seed):** this blog owns the staking two-step mechanics. The /for/defi-and-staking hub owns hire intent. The staking/mining income estimator owns the rough income-value number. The DeFi-disposals blog owns the honest-uncertainty LP/deposit question (link across; keep DeFi-protocol nuance out of this page).

## Competitors to beat (COMPETITORS.md; domains only at seed, live-URL check is Stage 2)

- **gov.uk** (CRYPTO21200 staking, CRYPTO21150 mining, tax-free-allowances guidance): authoritative, split across pages, no single two-step walk-through. Beat by consolidating income-then-CGT into one clear sequence with the base-cost carry-through.
- **Crypto-tax software blogs**: cover staking income but often skip the base-cost second leg or muddle the £1,000 allowance. Beat on the two-step clarity and the allowance boundary.
- **Generalist posts**: usually treat staking as simple income; beat on the CGT second leg and the misc-vs-trading distinction.

## Required structure (bodies are RAW HTML: loader does NO markdown conversion; write <h2>/<p>/<ul>/<table>, not markdown syntax)

H2 skeleton:
1. The short answer: staking is taxed twice, in two steps (BLUF box, cited)
2. Step one, income on receipt: sterling value when the reward lands (miscellaneous vs trading income)
3. Step two, CGT on disposal: base cost equals the receipt value (why you are not double-taxed on the same value)
4. The £1,000 allowance: it shelters the income leg, NOT the CGT leg
5. Worked illustration: reward received, income recorded, later sold, CGT computed (with numbers)
6. Miscellaneous vs trading: when the activity tips into a trade
7. A note on DeFi staking (the honest-uncertainty wedge; link to the DeFi-disposals blog)
8. Getting your staking records right (capture)

FAQ candidates (no answers at seed):
- Is staking taxable in the UK?
- Is staking income or capital gains?
- Do I pay tax twice on staking rewards?
- Does the £1,000 allowance cover staking?
- What value do I use for staking rewards?
- Is DeFi staking treated the same?
- When is staking a trade?

Table/chart opportunities:
- The two-step table: event (receipt / later disposal) × tax type (income / CGT) × value used (sterling at receipt / proceeds minus receipt-value base cost).
- Worked illustration ledger with the base-cost carry-through shown explicitly.

Calculator/tool embed: staking & mining income estimator after step two. Scenario tool: it estimates the income leg only, states it does not compute the later CGT leg, and ends at "speak to us".

Internal links (launch core): /for/defi-and-staking (capture), /calculators/staking-mining-income-estimator (tool), the DeFi lending/LP disposals blog (sibling, honest-uncertainty), the same-day/30-day worked-example blog (for the CGT-leg mechanics).

## House positions touched (docs/crypto/house_positions.md, ONLY figures source)

- **HP 10 (staking two-step):** staking rewards follow the same receipt-then-CGT two-step as mining; whether the receipt is miscellaneous income or trading income depends on the degree of activity and organisation. Citation: https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto21200
- **HP 9 (mining receipt sets base cost):** rewards taxable on receipt (misc, or trading income if a trade), valued in sterling at receipt; that receipt value becomes the CGT base cost for the later disposal. Citation: https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto21150
- **HP 12 (£1,000 allowance boundary):** the £1,000 trading and miscellaneous income allowance can shelter small mining/staking receipts from income tax, but it does NOT remove CGT on the later disposal. Citations: https://www.gov.uk/guidance/tax-free-allowances-on-property-and-trading-income and https://www.gov.uk/guidance/check-if-you-need-to-pay-tax-when-you-receive-cryptoassets
- **HP 2 (CGT rates, for the CGT leg):** 18% within remaining basic band, 24% above; higher/additional-rate 24% whole gain; never flat 18%. Citation: https://www.gov.uk/capital-gains-tax/rates
- **HP 3 (AEA £3,000, for the CGT leg):** Citation: https://www.gov.uk/capital-gains-tax/allowances
- **HP 13/14 (DeFi honest-uncertainty, for the DeFi note ONLY):** DeFi lending/staking is manual-only and transaction-specific; many DeFi deposits/LP entries are disposals under HMRC's CURRENT VIEW, NOT settled law. Citation: https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto61000

## Hallucination danger zones (enforce)

- The two-step must be exact: income on receipt at sterling value (HP 10/9), THEN CGT on disposal with base cost = receipt value (HP 9). Do not present staking as income-only or CGT-only.
- The £1,000 allowance shelters the INCOME leg only, NEVER the CGT leg (HP 12). This is the core correction; do not blur it.
- Do not double-count: the receipt value taxed as income becomes the CGT base cost, so only the growth after receipt is the gain. State this explicitly.
- CGT leg rate presentation: 18% within remaining basic band, 24% above; higher/additional-rate 24% whole gain (HP 2). NEVER flat 18%. AEA £3,000 (HP 3).
- DeFi note: any DeFi framing carries "HMRC's current view, not settled law" wording every time (HP 13/14). Keep the DeFi note SHORT and link out; do not resolve DeFi mechanics here.
- The estimator computes the income leg only; never claim it covers the CGT leg or produces a filing-ready figure.
- No credential claims, no named individuals. No em-dashes.
- Body is raw HTML (loader does no markdown conversion): write tags directly.

## Stage 2 TODO

- WebFetch CRYPTO21200 and CRYPTO21150; confirm the receipt-then-CGT two-step and the misc-vs-trading distinction are unchanged.
- WebFetch the tax-free-allowances guidance and confirm the £1,000 trading/miscellaneous allowance and its income-only scope; re-verify it does not extend to CGT.
- Re-verify AEA £3,000 and the 18%/24% split; re-check the worked-illustration arithmetic (base-cost carry-through) before publish.
- Confirm the DeFi note's "current view, not settled law" framing against CRYPTO61000.

## FLAGGED open items

- No factual gaps; all figures map to HP 2/3/9/10/12 (and HP 13/14 for the short DeFi note). Build-time risks: worked-illustration arithmetic and the £1,000-allowance-scope wording, both gated by Stage 2 TODOs.
