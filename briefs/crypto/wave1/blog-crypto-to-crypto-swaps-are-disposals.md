---
slug: crypto-to-crypto-swaps-are-disposals
tier: blog
route: /blog/crypto-cgt/crypto-to-crypto-swaps-are-disposals
category: Crypto CGT & Disposals
intent: DIY-informational, myth-correction. "I never cashed out to pounds" is not a defence; a crypto-to-crypto swap is a taxable disposal at sterling market value at the moment of the swap. Capture into /for/investors and the CGT estimator.
---
# "I Never Cashed Out": Why Crypto-to-Crypto Swaps Are Taxable Disposals

## Target queries (evidence: LAUNCH_CORE.md, DataForSEO UK measured 2026-07-11)

- **Primary:** no direct measured volume for the swaps phrasing; adjacent "when do i pay tax on crypto uk" 390/mo, KD 12 (measured) carries the intent and is the head this page rides.
- Do NOT target the /for/investors hub head; this blog is the myth-correction explainer that funnels into it and into the CGT estimator.

## Search-intent class + play

DIY-informational with a myth-correction wedge. A very common and expensive DIY belief is that tax is only due when crypto is converted to pounds. Play: BLUF answer box stating plainly that swapping one token for another is a disposal, taxed on the sterling market value at the moment of the swap, and "I never cashed out" is not a defence, then why (each swap is a disposal of the token you gave up), then the sterling-valuation mechanic, then a short worked illustration, then how swaps compound across a year (each one uses AEA and feeds the pool), then the CGT rate reality, then capture. Killing the "only fiat is taxable" myth is the differentiator.

**Cannibalisation split (locked at seed):** this blog owns the "swaps are disposals" myth-correction. The /for/investors hub owns hire intent. The same-day/30-day worked-example blog owns the matching mechanics (link across; each swap is a pool event there). The CGT estimator owns rough scenario numbers.

## Competitors to beat (COMPETITORS.md; domains only at seed, live-URL check is Stage 2)

- **gov.uk** (Check if you need to pay tax when you sell cryptoassets): authoritative, states swaps are disposals but tersely. Beat with the plain "I never cashed out is not a defence" framing plus the sterling-valuation walk-through.
- **Crypto-tax software blogs**: cover this but often bury it; beat on the direct myth-busting headline and the compounding-across-a-year point that drives the accountant need.
- **Forum/Reddit-style content ranking on the myth**: beat by being the cited, calm, correct source that funnels to help.

## Required structure (bodies are RAW HTML: loader does NO markdown conversion; write <h2>/<p>/<ul>/<table>, not markdown syntax)

H2 skeleton:
1. The short answer: yes, swapping crypto is a taxable disposal (BLUF box, cited)
2. Why "I never cashed out to pounds" is not a defence
3. How the gain is measured: sterling market value at the moment of the swap
4. A worked illustration: swapping token A for token B (with the numbers)
5. Why this compounds: every swap in a year is a separate disposal (AEA £3,000 goes fast)
6. What you actually pay: CGT at 18% within the remaining basic band, 24% above
7. Reporting even when no tax is due (proceeds over the reporting threshold)
8. Getting your swap history reconciled (capture)

FAQ candidates (no answers at seed):
- Do I pay tax if I swap one crypto for another?
- Is a crypto-to-crypto trade taxable if I never sold to GBP?
- How is a crypto swap valued for tax?
- Do stablecoin swaps count as disposals?
- How many disposals is a year of trading?
- Do I have to report crypto if no tax is due?
- What price do I use for a token swap?

Table/chart opportunities:
- A short worked-swap table: token given up, sterling value at swap, allowable cost (from pool), gain, running AEA used.
- "Taxable event" checklist (sell to fiat, swap token-for-token, spend crypto, gift except to spouse) sourced to HP 1.

Calculator/tool embed: crypto CGT estimator after the compounding section. Note it is a scenario tool (pool-simplified, does not model same-day/30-day per HP 5) and ends at "speak to us".

Internal links (launch core): /for/investors (capture), /calculators/crypto-cgt-estimator (tool), the same-day/30-day worked-example blog (sibling, matching mechanics), the reconciliation service.

## House positions touched (docs/crypto/house_positions.md, ONLY figures source)

- **HP 6 (swaps are disposals):** crypto-to-crypto swaps are taxable disposals at the sterling market value at the moment of the swap; "I never cashed out to pounds" is not a defence. Citation: https://www.gov.uk/guidance/check-if-you-need-to-pay-tax-when-you-sell-cryptoassets
- **HP 1 (what is a disposal):** selling for fiat, swapping token for token, spending crypto, and gifting (except to a spouse/civil partner) are all CGT disposals; most individual holders are investors. Citation: https://www.gov.uk/guidance/check-if-you-need-to-pay-tax-when-you-sell-cryptoassets
- **HP 3 (AEA £3,000):** for the compounding section. Citation: https://www.gov.uk/capital-gains-tax/allowances
- **HP 2 (CGT rates):** 18% within remaining basic band, 24% above; higher/additional-rate 24% whole gain; never flat 18%. Citation: https://www.gov.uk/capital-gains-tax/rates
- **HP 27 (report even when no tax due):** where disposal proceeds exceed the reporting threshold, disposals must be reported in Self Assessment even if the AEA covers the gain. Citation: https://www.gov.uk/capital-gains-tax/reporting-and-paying-capital-gains-tax

## Hallucination danger zones (enforce)

- The core rule: a token-for-token swap IS a disposal, valued at sterling market value at the moment of the swap (HP 6). Do not soften this or imply only fiat conversions are taxable.
- CGT rate presentation: 18% ONLY within the remaining basic band, 24% above; higher/additional-rate 24% whole gain (HP 2). NEVER flat 18%. AEA £3,000 (HP 3).
- The estimator note: pool-simplified, does not model same-day/30-day (HP 5); scenario tool only.
- Reporting: state HP 27 (may be reportable even with no tax due) but do NOT invent a specific reporting-threshold figure; describe it and route to us / link the SA money page (the exact threshold is not a locked figure in house_positions).
- Do not quote specific token prices as fact; the worked illustration uses labelled example numbers.
- No credential claims, no named individuals. No em-dashes.
- Body is raw HTML (loader does no markdown conversion): write tags directly.

## Stage 2 TODO

- WebFetch the "Check if you need to pay tax when you sell cryptoassets" gov.uk page; confirm swaps-are-disposals and the sterling-at-time-of-swap valuation are unchanged.
- Re-verify AEA £3,000 and the 18%/24% split at the rates/allowances pages.
- Confirm the current CGT reporting threshold wording at the reporting-and-paying page (HP 27) so the "report even when no tax due" section is accurate; flag if a specific threshold figure should be added to house_positions.

## FLAGGED open items

- house_positions HP 27 states the report-even-when-no-tax rule but does NOT lock the numeric reporting threshold; brief instructs describing it qualitatively and routing to the SA page. FLAGGED: add a threshold figure to house_positions if a hard number is wanted (Stage 2 fetch can surface it).
