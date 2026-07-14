---
slug: home
tier: money
route: /
intent: HIRE. Head-term searchers are people with a live cryptoasset tax problem (unreported gains, a nudge letter, a swap-heavy trading history, a company holding tokens) actively selecting a specialist crypto tax accountant; the homepage is the primary lead page.
---
# Homepage: specialist crypto tax accountants (the site)

> Seed brief (Stage 1). Working brand agnostic; all copy references "the site" / "the firm". CTA and brand copy flow from site config at write time. No em-dashes anywhere. Faceless authority only (no named experts, no credential claims, per estate rule; owner is not an accountant, authority comes from cited HMRC sources, the calculators and the data asset).

## Target queries (evidence: LAUNCH_CORE.md, DataForSEO UK 2026-07-11, location 2826)

- Primary: "crypto tax accountant uk" 110/mo, KD 0, CPC £11.61 (HIGH comp)
- Primary: "crypto accountant" 320/mo, KD 0
- Primary: "crypto tax accountant" 110/mo, CPC £10.47
- Secondary: "crypto tax uk" 880/mo, KD 33 (biggest head volume; software-shadowed but the hire intent sits behind it)
- Segment heads routed from here (they live on the /for/* hubs, not this page): "crypto capital gains tax uk" 110/mo, "day trader tax uk" 170/mo, "crypto mining tax uk" 10/mo, "nft tax uk" 10/mo, plus the disclosure family (routed to /services/hmrc-disclosure): "voluntary disclosure hmrc" 590/mo, "hmrc nudge letter(s)" 210/mo

## Search-intent class + play

Accountant-seeking lead page (HIRE). Head of the money funnel: the visitor is choosing a firm, not learning a rule. Establish specialist depth fast (s104 pooling vs US software defaults, swaps-are-disposals, disclosure and CARF urgency, the six segments) and route each segment and service intent to its own money page. Software (Koinly-class) owns the DIY-informational head terms; do NOT try to win those on the homepage. Win on service-architecture depth, the calculators, the data asset, and the honest-uncertainty framing rivals avoid. Frame outputs as general tax-compliance guidance, never investment advice or price views (regulated-advice boundary, house_positions preamble).

## The two things that make this a specialist page (the wedge)

1. The disclosure lane: HMRC runs a dedicated cryptoasset disclosure service (HP 25) and CARF ends the "HMRC cannot see my exchange" era (HP 24). This is the site's central, TRUE urgency narrative, never scare copy.
2. The correctness lane: US software defaults (FIFO/LIFO/specific-ID) are WRONG for UK individuals; UK uses s104 pooling with same-day and 30-day rules (HP 4, 5). This is the technical hook no software page can copy.

## Required structure

H2 skeleton:
1. Hero: specialist crypto tax accountants (value prop + primary CTA)
2. Who the site helps (six segments as a routing sentence: investors, day traders, DeFi and staking participants, NFT creators and flippers, miners, and businesses holding or accepting crypto)
3. Segments (card grid routing to the 6 /for/* hubs)
4. The flagship lane: HMRC disclosure and nudge letters (card routing to /services/hmrc-disclosure; the CARF urgency lives here)
5. Why CARF changes the maths now (1 January 2026 platforms start collecting, first report to HMRC due 1 January to 31 May 2027, HP 24; exact dates, never exaggerated)
6. What we actually fix (swaps you did not know were disposals, US-software pooling errors, unclaimed loss years, mis-reported staking and mining income)
7. Free tools (calculator fleet teaser: CGT estimator, staking and mining income estimator, disclosure and penalty estimator, investor vs trader status checker)
8. The data asset teaser (UK Crypto Tax Gap and Compliance Index)
9. Why a specialist, not a generalist or a software export
10. Anonymised social proof (estate rule: no client names, no pricing claims beyond config)
11. How engagement works / next step CTA

FAQ candidates (questions only):
- Do I need a crypto tax accountant or can software do it?
- Can HMRC see my exchange account? (answer: CARF, HP 24)
- I got a nudge letter about crypto, what should I do? (route to disclosure, HP 25)
- Do I pay tax if I only swapped one coin for another and never cashed out? (HP 6)
- Is my US crypto software calculating my UK tax correctly? (HP 4)
- I have not reported crypto for a few years, what happens now? (HP 25)
- Do you help companies that hold or accept crypto? (route to /for/businesses)
- How much does a crypto tax accountant cost? (answer from config at write time; no figures in brief)

Table/chart opportunities: a short figures strip only if every figure links its house-position gov.uk source (AEA £3,000 HP 3; CGT 18% within remaining basic-rate band then 24%, never a flat 18%, HP 2; CARF first report window 1 Jan to 31 May 2027 HP 24). Prefer routing over asserting figures on the homepage.

Calculator embeds: none inline; link the four calculator landing pages.

Internal links (launch core): all 6 /for/* hubs (investors, day-traders, defi-and-staking, nft-creators-and-flippers, miners, businesses) + /services/hmrc-disclosure + the data asset page (/research/crypto-tax-gap-index) + the 4 calculator landings.

Lead form: general crypto intake. Optional segment fields visible on homepage form: segment (dropdown of the 6), exchanges used, approximate transaction count, reconciliation software used (Koinly/Recap/CTC/other/none), nudge-letter received (y/n).

## House positions touched (docs/crypto/house_positions.md; gov.uk URLs below)

- HP 2: CGT on crypto is 18% within the remaining basic-rate band then 24% above; higher and additional rate 24% (from 6 April 2026). NEVER a flat 18% basic rate. Basic-rate band ceiling £37,700 (2026/27). https://www.gov.uk/capital-gains-tax/rates
- HP 3: CGT annual exempt amount £3,000 (frozen). https://www.gov.uk/capital-gains-tax/allowances
- HP 4: s104 pooling per token at average cost; FIFO/LIFO/specific-ID are WRONG for UK individuals. https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22200
- HP 6: crypto-to-crypto swaps are taxable disposals at sterling value at the swap. https://www.gov.uk/guidance/check-if-you-need-to-pay-tax-when-you-sell-cryptoassets
- HP 24: CARF collection from 1 January 2026; first report to HMRC 1 January to 31 May 2027, covering calendar 2026. https://www.gov.uk/guidance/collecting-cryptoasset-user-and-transaction-data and https://www.gov.uk/guidance/reporting-cryptoasset-user-and-transaction-data
- HP 25: dedicated HMRC cryptoasset disclosure service; years assessed depend on behaviour; respond to nudge letters. https://www.gov.uk/guidance/tell-hmrc-about-unpaid-tax-on-cryptoassets

Consistency rules: UK default (HMRC). Every asserted figure links its gov.uk page. CGT rate always band-split, never flat. CARF dates exact. No investment or price views anywhere.

## Hallucination danger zones

- No fee figures anywhere (config decides).
- CGT is 18% ONLY within the remaining basic-rate band then 24% above; never present a flat "18% basic rate" (HP 2, the single most common presentation error).
- AEA is £3,000, not £6,000 or £12,300 (HP 3).
- CARF: collection from 1 Jan 2026, first report 1 Jan to 31 May 2027. Do not say HMRC "already receives" full data, do not invent earlier dates, do not exaggerate (HP 24).
- Employer NIC (if referenced re: paying staff in crypto) is 15% above £5,000, not 13.8%/£9,100 (HP 8). Route detail to /for/businesses.
- No credential claims, no named expert (owner is not an accountant).
- No em-dashes.
- Calculators are scenario/estimate tools that end at "speak to us", never a filing-ready figure.

## Stage 2 TODO

- Live-URL verify the dedicated rivals (yourcryptoaccountant.co.uk, cryptotaxaccountant.uk, bitcoinaccountant.co.uk, drpaccountants, Lanop, Menzies) per COMPETITORS evidence in LAUNCH_CORE.
- Re-verify the three load-bearing figures (CGT rates, AEA, CARF dates) at source at write time (HP preamble: re-verified 2026-07-14, but rates pages change without notice).
- Confirm calculator landing slugs against built config.
- Data asset scope: v1 may ship as CARF countdown + headline model (DATA_ASSET.md); keep homepage teaser honest to what v1 actually renders.
