---
slug: nft-tax-income-vs-cgt
tier: blog
category: Crypto CGT & Disposals
route: /blog/crypto-cgt-disposals/nft-tax-income-vs-cgt
intent: DIY-INFORMATIONAL + capture. UK NFT creators and flippers working out whether their NFT activity is taxed as income or capital gains, and how royalties are treated; LAUNCH_CORE names "NFT income-vs-CGT" in the 12 launch blogs.
---
# NFT Tax in the UK: Are You a Creator (Income) or a Flipper (Capital Gains), and Why the Split Matters

## Body format (LOCKED)

- The blog body ships as **RAW HTML** (`<p>`, `<h2>`, `<h3>`, `<table>`, `<ul>`). The loader does NO markdown conversion, so markdown syntax (`##`, `**`, `-`) will render as literal characters. Author the body in HTML tags only.
- No em-dashes anywhere in the body. Use commas, parentheses, full stops or middle dots.

## Target queries (evidence: LAUNCH_CORE.md, this run 2026-07-11)

- **Primary:** "nft tax uk" 10/mo, KD 0 (measured DFS 2026-07-11, `raw/dfs_*.json`). Low volume, DIY-informational; judge on GEO/AI-answer citation presence and capture, not raw sessions.
- **Secondary (autocomplete/long-tail, no measured volume in dossier):** "how are nfts taxed uk", "nft creator tax", "selling nft tax uk", "nft royalties tax". Do not attach volume figures.
- DIY-INFORMATIONAL, assist + capture into the NFT creators/flippers service.

## Search-intent class + play

DIY-INFORMATIONAL, assist + capture. Reader is either a creator who minted and sold work (or earns ongoing royalties) or a flipper who buys and re-sells NFTs, and does not know which tax applies. Play: BLUF that the tax depends on your role: creators are usually taxed on income (plus income on royalties), flippers are usually taxed under CGT on disposals, and the same person can be both. Then the creator route (income, royalties), then the flipper route (CGT, disposal on every sale and every crypto-to-crypto purchase), then capture. The role-based income-vs-CGT split is the wedge; most DIY posts pick one and ignore the other.

## Competitors to beat (COMPETITORS.md; domains only at seed stage, live-URL check is Stage 2)

- **gov.uk (cryptoassets manual, check-if-you-need-to-pay-tax guidance)** owns the definitional SERP: beat on the concrete creator-vs-flipper split and royalties, not on restating disposal mechanics.
- **Dedicated crypto-accountant blogs** (yourcryptoaccountant.co.uk, cryptotaxaccountant.uk per LAUNCH_CORE segmentation): service framing; beat on a clear "which are you" decision path with worked examples for each.
- **Koinly-class software**: DIY head; beat with the creator/royalty income judgment a software tool cannot make.

## Required structure

- H2 skeleton:
  1. The short answer: creators are usually taxed on income, flippers under CGT, and you can be both (BLUF box)
  2. Which are you? Creator, flipper, or both (the role test that drives everything)
  3. The creator route: income tax on sales of work you made
  4. Royalties: ongoing income each time a secondary sale pays you
  5. The flipper route: CGT on disposal (buying an NFT with crypto is itself a disposal of that crypto)
  6. Crypto-to-crypto reminder: paying for an NFT in ETH disposes of the ETH too (two events)
  7. Worked contrast: same £5,000 profit, creator vs flipper, why the tax differs
  8. When a flipper's activity looks like a trade (the badges-of-trade risk, usually a worse outcome)
  9. Getting the classification right (capture section)
- FAQ candidates (no answers at seed stage):
  1. Are NFTs taxed as income or capital gains in the UK?
  2. How is selling an NFT I created taxed?
  3. How are NFT royalties taxed?
  4. Do I pay tax when I flip an NFT?
  5. Is buying an NFT with crypto a taxable event?
  6. Can I be both a creator and a flipper for tax?
  7. When does flipping NFTs become a trade?
- Table/chart opportunities: a creator-vs-flipper comparison table (what is taxed, which tax, what triggers it); a "two events" table for buying an NFT with crypto (disposal of the crypto + acquisition of the NFT).
- Calculator embed: none of the launch trio cleanly fits NFT-specific facts. No embed, or internal-link the crypto CGT estimator for the flipper side only with a clear caveat that NFT-specific facts need review. Internal-link the NFT service.
- Internal links within launch core: /for/nft-creators-and-flippers hub (capture), /for/investors (CGT/s104 mechanics for the flipper side), swaps-are-disposals blog (the crypto-to-crypto event), the investor-vs-trader status service.

## House positions touched

- **HP 1 (disposals are CGT events), for the flipper spine:** selling crypto or NFTs, swapping tokens, and spending crypto on goods (including buying an NFT) are disposals for CGT; most individual holders are investors, so gains fall under CGT. Cite https://www.gov.uk/guidance/check-if-you-need-to-pay-tax-when-you-sell-cryptoassets (verified 2026-07-11).
- **HP 6 (crypto-to-crypto swaps are disposals), for the "buying an NFT in ETH" point:** paying for an NFT with a token is a disposal of that token at its sterling market value at the moment of the transaction. Cite https://www.gov.uk/guidance/check-if-you-need-to-pay-tax-when-you-sell-cryptoassets (verified 2026-07-11).
- **HP 2 and HP 3 (CGT rates and AEA), for the flipper figures:** 18% within the remaining basic-rate band, 24% above, higher/additional-rate 24% on the whole gain; AEA £3,000. Cite https://www.gov.uk/capital-gains-tax/rates and https://www.gov.uk/capital-gains-tax/allowances (both re-verified at source 2026-07-14).
- **HP 15 and HP 16 (trader status), for the "flipping as a trade" risk:** almost all individuals are investors, not traders; trader status is usually a BAD outcome (income up to 45% plus Class 4 NIC vs 24% CGT); high frequency alone does not make a trade. Cite https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto20250 and https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim20205 (verified 2026-07-11).

## Hallucination danger zones (SHARED + post-specific)

- **CGT is NEVER a flat 18%.** State 18% within the remaining basic-rate band, then 24% above; higher/additional-rate 24% on the whole gain (HP 2). Do not present a flat 18% for the flipper.
- **AEA is £3,000, frozen** (HP 3). Do not state a prior figure.
- **The creator income route is NOT covered by a locked HP number with its own citation in house_positions.md.** The creator-side income treatment and royalties are a reasonable application of general income-tax principles, not a locked figure. Do NOT invent a specific rate, allowance or manual paragraph for creator income; describe the principle (proceeds from work you created are income) and route the detail to "speak to us". FLAG below.
- **Trader status is usually a WORSE outcome, not a prize** (HP 15, 16). Frame the flipping-as-a-trade risk as a downside; do not encourage chasing trader status. High frequency alone does not make a trade.
- Buying an NFT with crypto is TWO events (disposal of the crypto + acquisition of the NFT). Do not collapse them into one.
- No credential claims, no named expert (faceless authority).
- No em-dashes in user-facing copy.

## Stage 2 TODO

- Copy HP 1, 2, 3, 6, 15, 16 figures/framings exactly. Re-verify CGT rates and AEA at source at write time.
- Build the creator-vs-flipper worked contrast and verify the arithmetic; label as illustrative.
- For the creator/royalty income section, either cite gov.uk live for the income-tax treatment of self-created assets/royalties at write time, or keep it principle-level and route to "speak to us". Do NOT assert a manual paragraph from memory.
- WebFetch one rival NFT-tax post to confirm it covers only one role (creator OR flipper), the coverage gap.

## FLAGGED open items

- **No locked house position covers NFT-creator income or NFT royalties specifically** (house_positions.md income-side positions 8-12 cover employment, mining, staking, airdrops, the £1,000 allowance, not created-asset income or royalties). The creator/royalty income treatment must be handled principle-level or cited live at Stage 2, never asserted from memory. Flagged for the orchestrator: consider whether a creator-income HP should be added to house_positions.md before this post is written.
