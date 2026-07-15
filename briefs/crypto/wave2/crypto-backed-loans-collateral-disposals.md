---
slug: crypto-backed-loans-collateral-disposals
tier: blog
category: DeFi & Complex Transactions
route (derived): /blog/defi-and-complex-transactions/crypto-backed-loans-collateral-disposals
intent: DIY-informational with a distress wedge. The holder who borrowed against their crypto (CeFi like Nexo/Ledn-style, or DeFi like Aave/Compound-style) and assumes "I only borrowed, I didn't sell, so there's no tax". The hard truth: whether posting crypto as collateral is a disposal depends on whether beneficial ownership passes, and this is HMRC's transaction-specific view, not settled law. Capture into /for/defi-and-staking and /services/hmrc-disclosure.
---
# Crypto-Backed Loans and Collateral: When Borrowing Triggers a Disposal

## Target queries (evidence: topic pool, DataForSEO UK measured 2026-07-11)

- **Primary:** "crypto backed loans tax uk" / "crypto loan tax uk" 390/mo, KD 18 (measured).
- Adjacent: "is a crypto loan taxable uk", "defi loan tax", "collateral crypto tax" (autocomplete / planning intent, long-tail).

## Search-intent class + play

DIY-informational, myth-correction with a distress wedge. The expensive belief is "a loan is not a sale, so borrowing against my crypto is tax-free". Sometimes true, sometimes very much not · the answer turns on whether posting the collateral transfers beneficial ownership of the tokens. Play: an honest BLUF that says "it depends, and here is the test", never a false blanket "loans are tax-free" NOR a false blanket "all crypto loans are taxed". Then the beneficial-ownership test, the CeFi-vs-DeFi split (custodial lender who can rehypothecate vs a smart contract), what happens on liquidation (a forced sale IS a disposal), interest paid in crypto, and the reconciliation/disclosure capture. The differentiator is the calm "HMRC's current view, not settled law" honesty on a topic where DIY content is confidently wrong in both directions.

**Cannibalisation split (locked):** this blog owns "does borrowing against crypto trigger tax". The wave-1 `defi-lending-liquidity-pool-disposals` blog owns LP/lending-deposit disposals (the lender side, supplying to a pool); this post is the BORROWER side (posting collateral to take a loan). Cross-link; do not overlap. `/for/defi-and-staking` owns hire intent. `/services/hmrc-disclosure` owns the "I already did this and never reported it" capture.

## Dedup evidence

- vs the 24 existing assets: `defi-lending-liquidity-pool-disposals` is the closest, but it is the supply/lend side under CRYPTO61000. This post is the borrow/collateral side plus liquidation. Distinct event, distinct search intent, explicit cross-link keeps them apart. No other asset touches loans/collateral.
- vs generalist: no generalist post covers crypto loans (only the single generic hire post on a different brand). No overlap, no cross-link (HP 30).

## Required structure (RAW HTML)

H2 skeleton:
1. The short answer: a crypto-backed loan may or may not be a taxable disposal (BLUF box, cited; it turns on beneficial ownership; HMRC's current view, not settled law)
2. The test that decides it: does posting the collateral transfer beneficial ownership of your tokens?
3. CeFi loans (custodial lender): where the lender can use/rehypothecate your coins, HMRC's view can be that a disposal has occurred
4. DeFi loans (smart-contract collateral): mechanics vary; framed as transaction-specific, HMRC's current view, not settled law
5. Liquidation is a disposal: if your collateral is sold to cover the loan, that forced sale is a CGT disposal at market value
6. Interest and rewards: interest you pay in crypto, and any tokens you receive, have their own tax treatment
7. Why this is under-reported and how we reconcile a loan history (capture)

FAQ candidates (no answers at seed):
- Is a crypto-backed loan taxable in the UK?
- Do I pay tax if I borrow against my Bitcoin?
- Is posting crypto as collateral a disposal?
- What happens tax-wise if my crypto collateral is liquidated?
- Is DeFi borrowing taxed differently from a CeFi loan?
- Do I pay tax on the crypto I receive as the loan?
- Is interest paid in crypto deductible or taxable?

Table/chart opportunities:
- A decision table: loan type (CeFi custodial · DeFi smart contract) × does beneficial ownership pass? × HMRC's current view (possible disposal / transaction-specific) with the "not settled law" caveat in the header.
- A liquidation worked illustration (labelled example numbers only, no real token prices): collateral market value at forced sale, pooled base cost, gain, CGT band-split.

Calculator/tool embed: crypto CGT estimator after the liquidation section (scenario tool; pool-simplified; same-day/30-day out of scope per HP 5; ends at "speak to us").

Internal links: /for/defi-and-staking (capture), the wave-1 `defi-lending-liquidity-pool-disposals` blog (sibling, lender side), /services/hmrc-disclosure (untidy loan history), /services/koinly-recap-reconciliation (loan transactions software mis-tags), /calculators/crypto-cgt-estimator.

## House positions touched

- **HP 13** (DeFi lending/staking guidance is manual-only and transaction-specific; whether a deposit is a disposal turns on beneficial ownership; the 2023 consultation was NOT enacted; state HMRC's analysis, never a clean settled rule). https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto61000
- **HP 14** (many DeFi deposits/entries are disposals under current HMRC analysis · always "HMRC's current view, not settled law"). crypto61000.
- **HP 1** (a disposal at market value · the liquidation forced-sale event). https://www.gov.uk/guidance/check-if-you-need-to-pay-tax-when-you-sell-cryptoassets
- **HP 2** (CGT band-split rate for the liquidation gain; never flat 18%). https://www.gov.uk/capital-gains-tax/rates
- **HP 4** (s104 pool supplies the base cost on any disposal). https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22200
- **HP 25** (disclosure route for an untidy history · behaviour decides years assessed; respond, do not ignore). https://www.gov.uk/guidance/tell-hmrc-about-unpaid-tax-on-cryptoassets

## Hallucination danger zones (enforce)

- Do NOT state a blanket "crypto loans are tax-free" NOR a blanket "all crypto loans are taxable". The answer is beneficial-ownership-dependent and is HMRC's current VIEW, not settled law (HP 13, 14). Carry that caveat in the BLUF and in section 2.
- The 2023 DeFi consultation was NOT enacted (HP 13); do not present a proposed treatment as current law.
- Liquidation IS a disposal at market value (HP 1); this part is firm, unlike the collateral-posting question.
- CGT rate band-split, never flat 18% (HP 2). Base cost from the s104 pool (HP 4).
- Do NOT give financial/investment advice about whether to take a crypto loan (regulated-advice boundary); tax treatment only.
- No credential claims, no named individuals, no pricing, no em-dashes, no real token prices. Raw HTML.

## Stage 2 TODO

- WebFetch CRYPTO61000 and re-confirm the beneficial-ownership framing and that the 2023 consultation remains unenacted; if HMRC has since published dedicated collateral/loan guidance, FLAG for an HP extension before writing (this is the single most likely place for the manual to have moved).
- Fetch one CeFi and one DeFi crypto-tax software explainer to set the depth bar and identify the confident-wrong claims to out-honest.

## FLAGGED open items

- HP gap (soft): house_positions has no position dedicated to loan collateral specifically; it is covered by the general DeFi transaction-specificity of HP 13/14. FLAGGED: if Stage 2 finds HMRC has published collateral-specific guidance, add an HP position rather than inferring one here. Until then, write strictly within HP 13/14's "transaction-specific, not settled law" framing and route specifics to us.
