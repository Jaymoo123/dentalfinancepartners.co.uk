---
slug: services-crypto-self-assessment
tier: money
route: /services/crypto-self-assessment
intent: HIRE. The holder who knows they need to file crypto on Self Assessment (or has just realised gains must be reported even with no tax due) wants it done correctly, on the SA108 crypto boxes, before the deadlines. A price-anchored conversion page; a productised-fee precedent exists in the market (do NOT state our price).
---
# Service page: crypto Self Assessment and SA108 filing

> Seed brief (Stage 1). Brand is BRAND_TBD; all copy references "the site" / "the firm". CTA and brand copy flow from site config at write time. No em-dashes anywhere.

## Target queries (evidence: LAUNCH_CORE.md, DataForSEO UK location 2826, 2026-07-11)

- Primary: "crypto self assessment" 10/mo (volume-thin, kept on SERP evidence: verified commercial SERP + productised-fee precedent per LAUNCH_CORE)
- Secondary: "crypto self assessment accountant", "sa108 crypto", "how to report crypto on tax return uk" (autocomplete / SERP intent)
- Feeder (NOT chased here): "when do i pay tax on crypto uk" 390/mo, KD 12 (DIY head; lives on the pillar/blog + CGT estimator, routes the "I need to actually file" segment here)

## Search-intent class + play

HIRE conversion page at the "I have to file crypto and I want it done right" moment. The volume is thin by design (LAUNCH_CORE), but a productised-fee precedent in the market (a rival's £350 crypto Self Assessment offer) proves a price-anchored page converts. The play is precision plus reassurance: name the exact SA108 capital gains pages that now carry cryptoasset entries, hard-date the 5 October registration deadline, and land the counter-intuitive point that gains can be reportable even when no tax is due (the single most common DIY miss once every crypto-to-crypto swap counts as a disposal). We do NOT state a price on this page (memory: price-anchored precedent exists, but do not state our price); the productised-fee precedent informs the framing, not our copy.

## Competitors to beat (COMPETITORS.md; domains only at seed stage, live-URL check is Stage 2)

- **bitcoinaccountant.co.uk** (productised £350 crypto Self Assessment). The price-anchor precedent. Beat by: the SA108-box specificity plus the "reportable even with no tax due" clarity plus the CGT estimator funnel, without leading on a headline price.
- **Koinly / Recap "how to file" help content** (DIY-INFORMATIONAL). Software owns the how-to head. Beat by owning the accountant-does-it-for-you conversion, not the DIY explainer, and by the s104-pooling reconciliation the software's own report cannot guarantee.
- **General-practice accountants adding a crypto line** (SECTION). Beat on genuine crypto depth (swaps-are-disposals, s104 pooling, the reporting-without-tax rule) versus a bolt-on mention.

## Required structure

H2 skeleton:
1. Do you have to file crypto on Self Assessment? (answer-first: yes if you disposed of crypto or received token income above the reporting points; then the service)
2. The deadlines that catch people: register by 5 October, file and pay by 31 January (hard dates)
3. Reporting even when no tax is due (proceeds over the reporting threshold means report the disposals, even if the £3,000 annual exempt amount covers the gain)
4. The SA108 capital gains pages and the cryptoasset entries (what actually goes in which box)
5. What the site's crypto Self Assessment service covers (reconstruct disposals, s104 pooling, income-side receipts, SA108 completion, submission)
6. Where it gets complicated (swaps, staking/mining income two-step, DeFi, prior years) and how we handle it
7. Estimate your gain first (embed the crypto CGT estimator)
8. Next step CTA

FAQ candidates (questions only):
- Do I need to do a Self Assessment for crypto?
- What is the 5 October deadline and does it apply to me?
- Do I have to report crypto if I made no profit / stayed under the allowance?
- Which SA108 boxes do crypto disposals go in?
- I only swapped one coin for another, do I report that? (answer: yes, swaps are disposals; HP 6)
- I received staking or mining rewards, where do those go?
- What if I should have filed in previous years? (route to /services/hmrc-disclosure)
- Can I just use my Koinly report to file? (route to reconciliation service)
- What is the annual exempt amount for 2026/27? (answer: £3,000; HP 3)
- What happens if I miss the registration deadline?

Table/chart opportunities: a "do you need to file" decision box (disposed of crypto / received token income / proceeds over the reporting threshold → file), mapped to HP 26, 27. A deadlines strip (register by 5 October following the tax year; file and pay by 31 January), mapped to HP 26. Keep the annual exempt amount (£3,000, HP 3) in a callout, not implied as a filing exemption. No fee figures.

Calculator embed: /embed/crypto-cgt-estimator (mid-page, in the "estimate your gain first" section; the site's #1 tool per CALCULATORS.md; feeds the complex-case funnel into this filing service).

Internal links (launch core): homepage, /for/investors (the core filer audience), services-koinly-recap-reconciliation ("can I just use my Koinly report"), services-hmrc-disclosure (prior-year miss), blog swaps-are-disposals-explainer, blog same-day-30-day-rules-worked-example, calc-crypto-cgt-estimator (landing).

## House positions touched (docs/crypto/house_positions.md; every figure maps to a position + gov.uk URL)

- HP 26: the Self Assessment registration deadline is 5 October following the tax year in which the first reportable gains or income arose; the SA108 capital gains pages now include dedicated cryptoasset entries. https://www.gov.uk/register-for-self-assessment and https://www.gov.uk/self-assessment-tax-returns/who-must-send-a-tax-return
- HP 27: gains can be reportable even when no tax is due; where disposal proceeds exceed the reporting threshold the disposals must be reported inside Self Assessment even if the annual exempt amount covers the gain. https://www.gov.uk/capital-gains-tax/reporting-and-paying-capital-gains-tax
- HP 3: the CGT annual exempt amount is £3,000 (frozen); most active traders exhaust it in one or two disposals once every crypto-to-crypto swap counts as a separate disposal. https://www.gov.uk/capital-gains-tax/allowances
- HP 6 (support): crypto-to-crypto swaps are taxable disposals; "I never cashed out to pounds" is not a defence. https://www.gov.uk/guidance/check-if-you-need-to-pay-tax-when-you-sell-cryptoassets
- HP 4 (support): s104 pooling per token at average cost (why correct SA108 figures need pooling, not raw exchange totals). https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22200

Consistency rules: separate the reporting obligation (HP 27) from the tax liability; a nil-tax position is not a nil-reporting position once proceeds exceed the threshold. The £3,000 (HP 3) is an exempt amount against gains, not a filing exemption.

## Hallucination danger zones

- Do NOT state or imply the site's fee, or any price figure, even though a rival's £350 precedent exists (memory: do not state our price). No fee or pricing figures anywhere.
- Do NOT conflate "no tax due" with "no need to report" (HP 27). This is the recurring error; keep the two separate.
- Use £3,000 for the annual exempt amount (HP 3), 2026/27; do not use an older figure.
- HP GAP: the specific SA108 box numbers and the exact CGT reporting proceeds threshold (commonly cited but change) are NOT locked in house positions. Describe the SA108 cryptoasset entries qualitatively and FLAG for Stage 2 before printing box numbers or the exact proceeds-reporting figure; verify at gov.uk at build time.
- Do NOT give the real-time CGT payment-window detail for property-style 60-day reporting; crypto reports through Self Assessment (HP 27). Keep property CGT off this site (HP 30 scope wall).
- The CGT estimator is a scenario tool ending at "speak to us", never a filing-ready SA108 figure (CALCULATORS.md).
- No credential claims, no named expert (faceless authority). No em-dashes.

## Stage 2 TODO

- Live-URL verify: bitcoinaccountant.co.uk productised page, a Koinly/Recap "how to file" help page, one general-practice crypto SA page.
- Confirm the crypto CGT estimator embed slug against the built config.
- HP GAP request: exact SA108 cryptoasset box references and the current CGT proceeds-reporting threshold, with gov.uk source, before the page prints either.
- Confirm 5 October and 31 January dates and the SA108 cryptoasset-entry wording at gov.uk at build time (HP 26).
