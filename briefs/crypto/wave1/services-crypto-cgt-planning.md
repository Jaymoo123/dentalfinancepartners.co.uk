---
slug: services-crypto-cgt-planning
tier: money
route: /services/crypto-cgt-planning
intent: HIRE. The holder sitting on gains (or on losses they have never claimed, or on worthless tokens) who wants to reduce a crypto CGT bill legitimately before year-end, or recover value from past losses. Planning intent: spouse transfers, loss harvesting within the four-year claim window, negligible-value claims on dead tokens.
---
# Service page: crypto Capital Gains Tax planning

> Seed brief (Stage 1). Brand is BRAND_TBD; all copy references "the site" / "the firm". CTA and brand copy flow from site config at write time. No em-dashes anywhere.

## Target queries (evidence: LAUNCH_CORE.md, DataForSEO UK location 2826, 2026-07-11)

- Primary: crypto CGT planning service intent (LAUNCH_CORE: Lanop's blog cluster proves the demand surface; no single high-volume head, this is a planning conversion page)
- Secondary: "crypto capital gains tax uk" 110/mo, KD 11, CPC £5.47 (the /for/investors head; this page is the planning-action cut of it); "crypto loss tax uk", "negligible value claim crypto", "reduce crypto capital gains tax" (autocomplete / planning intent)
- Feeder (NOT chased here): "crypto tax calculator uk" 390/mo, KD 0 (DIY; the CGT estimator absorbs it and funnels the planning-ready segment here)

## Search-intent class + play

HIRE planning page for the holder who wants to legitimately reduce a crypto CGT bill, or recover value they did not know was claimable. Three levers carry the page, all locked in house positions: (1) spouse and civil-partner no-gain/no-loss transfers to use both annual exempt amounts and both basic-rate bands (HP 7); (2) loss harvesting and, crucially, the four-year claim window, because capital losses must be CLAIMED to be usable and unreported loss years are recoverable value an accountant finds (HP 19); (3) negligible-value claims on genuinely worthless tokens (rug pulls, dead chains) which crystallise an allowable loss without a sale, held sharply apart from the lost-keys case which is NOT a disposal (HP 20, HP 21). The rate framing must be exact: 18% only within the remaining basic-rate band, 24% above (never a flat 18%), against the frozen £3,000 annual exempt amount. The play is showing the levers concretely, then converting the "which of these applies to me" question into an engagement.

## Competitors to beat (COMPETITORS.md; domains only at seed stage, live-URL check is Stage 2)

- **lanop.co.uk** (blog cluster on crypto CGT planning, proves the demand surface per LAUNCH_CORE). Beat by: turning their blog-level treatment into a structured service page with the three levers, the exact band-split rate framing, and the CGT estimator, plus the negligible-value-versus-lost-keys distinction done rigorously.
- **General wealth/tax firms' CGT planning pages** (SECTION). Beat on crypto specificity: negligible value on dead chains, the swaps-are-disposals baseline, s104 pooling behind every figure, versus generic share-CGT planning.
- **DIY "how to reduce crypto tax" content** (DIY-INFORMATIONAL, often overclaiming). Beat by being the accurate, cited version that does NOT overpromise (spouse transfers and loss claims are real; "move to Portugal" style content is off-brand and out of scope).

## Required structure

H2 skeleton:
1. You can reduce a crypto CGT bill legitimately, and recover value from past losses (answer-first; then the service)
2. The rate you are actually planning against: 18% within your remaining basic-rate band, 24% above, £3,000 tax-free (get the framing right first; HP 2, HP 3)
3. Spouse and civil-partner transfers: using both annual exempt amounts and both basic-rate bands (no-gain/no-loss; HP 7)
4. Loss harvesting and the four-year claim window: losses only count if you claim them, and old loss years may still be recoverable (HP 19)
5. Worthless tokens: negligible-value claims on rug pulls and dead chains, and why lost keys are different (HP 20, HP 21)
6. What the site's CGT planning service covers (review the pooled position, model the levers, prepare spouse transfers correctly, file loss and negligible-value claims, carry forward)
7. Estimate your gain and the band split (embed the crypto CGT estimator)
8. Next step CTA (plan before the tax year ends)

FAQ candidates (questions only):
- What rate is crypto CGT in 2026/27? (answer: 18% within remaining basic-rate band, 24% above; HP 2)
- How much can I make tax-free? (answer: £3,000 annual exempt amount; HP 3)
- Can I transfer crypto to my spouse to save tax? (answer: yes, no-gain/no-loss; HP 7)
- Do I have to sell to use a loss?
- I made losses years ago and never told HMRC, is it too late? (answer: normally four years to claim; HP 19)
- My tokens are worthless from a rug pull, can I claim the loss? (answer: negligible value claim; HP 21)
- I lost my private keys, is that a tax loss? (answer: not itself a disposal; HP 20)
- What happened to my coins on a collapsed exchange like FTX? (answer: fact-specific; HP 22, route to us)
- Does gifting crypto to my children save tax? (careful: only spouse/CP is no-gain/no-loss; others are disposals at market value; HP 1, HP 7)
- Can loss harvesting and the same-day/30-day rules interact badly? (yes; route to us)

Table/chart opportunities: a "three levers" summary table (spouse transfer / loss harvesting + four-year claim / negligible value) with what each does and when it applies, mapped to HP 7, 19, 21; a small rate-framing box (18% within remaining basic band, 24% above, £3,000 AEA) mapped to HP 2 and HP 3, presented with the band-boundary split, never a flat 18%. No fee figures.

Calculator embed: /embed/crypto-cgt-estimator (mid-page, in the estimate section; the site's #1 tool per CALCULATORS.md; computes pooled gain, AEA offset and the 18%/24% split across the band boundary, and openly flags same-day/30-day out of scope). This tool is the perfect fit for this page because the band split is the exact thing DIY holders get wrong.

Internal links (launch core): homepage, /for/investors (primary audience), services-koinly-recap-reconciliation (the pooled position behind any planning figure), services-crypto-self-assessment (filing the loss and negligible-value claims), blog lost-records-and-exchange-collapse-negligible-value, blog swaps-are-disposals-explainer, calc-crypto-cgt-estimator (landing).

## House positions touched (docs/crypto/house_positions.md; every figure maps to a position + gov.uk URL)

- HP 2: CGT on cryptoassets is 18% within the basic-rate band and 24% above it; higher and additional-rate taxpayers pay 24% on the whole gain; crypto is a non-residential asset; 2026/27 basic-rate band ceiling £37,700; do NOT state a flat 18% without the band-boundary split. https://www.gov.uk/capital-gains-tax/rates
- HP 3: the CGT annual exempt amount is £3,000 (frozen). https://www.gov.uk/capital-gains-tax/allowances
- HP 7: transfers between spouses and civil partners are no-gain/no-loss; a legitimate lever to use both annual exempt amounts and both basic-rate bands; the receiving spouse inherits the base cost. https://www.gov.uk/capital-gains-tax/gifts
- HP 19: capital losses must be CLAIMED to be usable, normally within four years of the end of the tax year in which they arose; unreported loss years are recoverable value. https://www.gov.uk/capital-gains-tax/losses
- HP 20: losing private keys is NOT itself a disposal; a negligible value claim may work only if the asset itself has become worthless, not merely inaccessible. https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22400
- HP 21: negligible value claims are available for genuinely worthless tokens (rug pulls, dead chains), crystallising an allowable loss without a sale. https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22500
- HP 1 (support): gifting crypto to anyone except a spouse or civil partner is a disposal (why the child-gift FAQ is a trap). https://www.gov.uk/guidance/check-if-you-need-to-pay-tax-when-you-sell-cryptoassets
- HP 22 (support): exchange collapse (FTX-class) is fact-specific; may be a negligible value claim, a capital loss, or nothing yet; never promise a deduction. https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22400 and https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22500

Consistency rules: the CGT rate (HP 2) is ALWAYS presented with the basic-band split, never as flat 18%. Lost keys (HP 20) and worthless tokens (HP 21) are ALWAYS held distinct. Only spouse/civil-partner transfers are no-gain/no-loss (HP 7); every other gift is a disposal (HP 1).

## Hallucination danger zones

- NEVER state a flat 18% CGT rate. 18% applies only within the remaining basic-rate band; 24% above (HP 2). This is flagged as the single most common presentation error in house positions.
- Use £3,000 for the annual exempt amount (HP 3, 2026/27). Do not use £6,000 or £12,300 (both stale).
- Keep negligible-value (worthless token, HP 21) strictly separate from lost keys (not a disposal, HP 20). Do not blur them; DIY guides do.
- Do NOT promise a deduction on collapsed-exchange losses (HP 22); frame as fact-specific and route to us.
- Do NOT imply gifts to children/friends are no-gain/no-loss; only spouse/civil partner is (HP 7); other gifts are disposals at market value (HP 1).
- Do NOT stray into inheritance-tax planning here beyond a pointer; IHT-situs is HMRC's evolving view, not settled law (HP 28), and belongs on its own lane if covered at all.
- Do NOT give investment advice or suggest disposals for market reasons (regulated-advice boundary); frame purely as tax treatment of decisions the client has made or is considering.
- The CGT estimator is a scenario tool ending at "speak to us", never a filing-ready figure, and same-day/30-day matching is out of scope (CALCULATORS.md, HP 5).
- No credential claims, no named expert (faceless authority). No fee or pricing figures. No em-dashes.

## Stage 2 TODO

- Live-URL verify: lanop.co.uk crypto CGT blog cluster, one wealth-firm CGT planning page, a DIY "reduce crypto tax" page for the overclaim contrast.
- Confirm the crypto CGT estimator embed slug against the built config.
- Confirm the 2026/27 basic-rate band ceiling (£37,700) and the 18%/24% split at gov.uk at build time (HP 2); re-verify £3,000 AEA (HP 3).
- No HP gaps blocking this page; the four planning positions (HP 7, 19, 20, 21) plus the rate framing (HP 2, 3) are all locked.
