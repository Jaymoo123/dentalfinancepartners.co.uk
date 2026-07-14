---
slug: crypto-mining-tax-1000-allowance
tier: blog
category: Staking Mining & Airdrops
route: /blog/staking-mining-airdrops/crypto-mining-tax-1000-allowance
intent: DIY-INFORMATIONAL + capture. UK crypto miners working out whether mining rewards are taxed, whether the £1,000 allowance covers them, and what happens when they later sell the mined coins; LAUNCH_CORE names "Mining £1,000 allowance boundary" in the 12 launch blogs.
---
# Crypto Mining Tax in the UK: When Rewards Are Taxed, the £1,000 Allowance, and the Second Tax You Did Not See Coming

## Body format (LOCKED)

- The blog body ships as **RAW HTML** (`<p>`, `<h2>`, `<h3>`, `<table>`, `<ul>`). The loader does NO markdown conversion, so markdown syntax (`##`, `**`, `-`) will render as literal characters. Author the body in HTML tags only.
- No em-dashes anywhere in the body. Use commas, parentheses, full stops or middle dots.

## Target queries (evidence: LAUNCH_CORE.md, this run 2026-07-11)

- **Primary:** "crypto mining tax uk" 10/mo, KD 36 (measured DFS 2026-07-11, `raw/dfs_*.json`). Low volume, DIY-informational; judge on GEO/AI-answer citation presence and calculator-funnel capture, not raw sessions.
- **Secondary (autocomplete/long-tail, no measured volume in dossier):** "is crypto mining taxable uk", "how is bitcoin mining taxed", "mining rewards income tax", "£1000 trading allowance crypto". Do not attach volume figures.
- DIY-INFORMATIONAL, assist + capture into the mining/staking service and the staking & mining income estimator tool.

## Search-intent class + play

DIY-INFORMATIONAL, assist + capture. Reader is a hobby or semi-serious miner who has heard "the first £1,000 is tax free" and wants to know if that is the whole story. Play: BLUF that mining rewards are taxable income at receipt (misc income for most, trading income if it amounts to a trade), the £1,000 allowance can shelter small receipts from income tax but does NOT remove the later CGT, then the two-step (receipt value becomes CGT base cost), then capture. The "second tax" (CGT on the later disposal) is the wedge every "£1,000 is tax free" DIY post misses.

## Competitors to beat (COMPETITORS.md; domains only at seed stage, live-URL check is Stage 2)

- **gov.uk (CRYPTO21150, trading allowance guidance)** owns the definitional SERP: beat on the joined-up two-step (income now, CGT later) and the misc-vs-trading boundary, not on restating the manual.
- **Koinly-class software blogs** own the DIY head: beat with the accountant-only angle (misc vs trading judgment, base-cost tracking across the pool) that a software post cannot resolve for the reader.
- **Dedicated crypto-accountant blogs** (per COMPETITORS.md): service framing; beat on a concrete worked two-step example a miner sees themselves in.

## Required structure

- H2 skeleton:
  1. The short answer: mining rewards are taxable income when you receive them, and there is a second tax when you sell (BLUF box)
  2. Income at receipt: sterling value on the day the reward lands (miscellaneous income for most miners)
  3. Hobby mining vs a mining trade (the misc-vs-trading-income boundary and why it changes the tax)
  4. The £1,000 trading and miscellaneous income allowance: what it does and what it does NOT do
  5. The second leg: the receipt value becomes your CGT base cost (worked two-step example)
  6. Why the £1,000 allowance does not make mining "tax free"
  7. Keeping the records HMRC and CARF will expect (receipt dates, sterling values, disposals)
  8. Getting the two-step right (capture section)
- FAQ candidates (no answers at seed stage):
  1. Is crypto mining taxable in the UK?
  2. Does the £1,000 allowance cover my mining rewards?
  3. Is mining income or capital gains?
  4. When am I taxed on mined coins?
  5. Do I pay tax twice on mined crypto?
  6. Is hobby mining treated differently from a mining business?
  7. What value do I use for a mining reward?
- Table/chart opportunities: a "two-step" table showing receipt (income, sterling value on day) then disposal (CGT on gain above base cost); a misc-income-vs-trading-income comparison table (what triggers each, how it is taxed).
- Calculator embed: **staking & mining income estimator** (launch tier per CALCULATORS.md). Frame as a scenario estimator, not a filing-ready figure, ending at "your situation has complexity, speak to us". Internal-link the mining/staking service.
- Internal links within launch core: /for/miners hub (capture), /for/defi-and-staking (adjacent receipt-then-CGT lane), staking rewards two-step blog, the staking & mining income estimator.

## House positions touched

- **HP 9 (mining rewards taxable on receipt), the spine:** mining rewards are taxable on receipt as miscellaneous income, or as trading income if the activity amounts to a trade, valued in sterling at receipt; that receipt value becomes the CGT base cost for the later disposal (the two-step). Cite https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto21150 (verified 2026-07-11).
- **HP 12 (£1,000 allowance), the boundary:** the £1,000 trading and miscellaneous income allowance can shelter small mining or staking receipts from income tax, but it does NOT remove CGT on the later disposal of those tokens. Cite https://www.gov.uk/guidance/tax-free-allowances-on-property-and-trading-income and https://www.gov.uk/guidance/check-if-you-need-to-pay-tax-when-you-receive-cryptoassets (verified 2026-07-11).
- **HP 2 (CGT rates), for the second-leg figures:** CGT is 18% within the remaining basic-rate band and 24% above; higher and additional-rate taxpayers pay 24% on the whole gain. Cite https://www.gov.uk/capital-gains-tax/rates (re-verified at source 2026-07-14). Basic-rate band ceiling £37,700 for 2026/27.
- **HP 3 (AEA), for the second-leg figures:** the CGT annual exempt amount is £3,000 (frozen). Cite https://www.gov.uk/capital-gains-tax/allowances (re-verified at source 2026-07-14).

## Hallucination danger zones (SHARED + post-specific)

- **CGT is NEVER a flat 18%.** State 18% only within the remaining basic-rate band, then 24% above; higher and additional-rate taxpayers pay 24% on the whole gain. This is the single most common presentation error (HP 2). Do not present "18% basic rate" without the band-boundary split.
- **AEA is £3,000, frozen** (HP 3). Do not state £6,000, £12,300 or any prior figure.
- **The £1,000 allowance shelters income tax ONLY, not CGT.** Do not imply mining is "tax free under £1,000". The second leg (CGT on disposal) still applies. This is the whole point of the post; do not undercut it.
- **Misc vs trading income is a judgment, not a bright line.** Describe the badges-of-trade principle and route the decision to "speak to us"; do not assert a frequency or hardware threshold that flips a miner into a trade. Trader/trading treatment is usually a WORSE outcome (income tax up to 45% plus NIC vs CGT), so do not frame it as a prize.
- The receipt value is the sterling market value on the day of receipt; do not use the value on the day of later sale for the income leg.
- CARF: if referenced, state exact dates only (collection from 1 January 2026; first report between 1 January 2027 and 31 May 2027). Never exaggerate. Keep CARF to a light record-keeping nudge here; the disclosure lane owns the detail.
- No credential claims, no named expert. Authority comes from cited HMRC sources and the calculator (faceless).
- No em-dashes in user-facing copy.

## Stage 2 TODO

- Copy HP 2, 3, 9, 12 figures exactly (18%/24% band split, £3,000 AEA, £1,000 allowance, receipt-value base cost). Re-verify the CGT rates and AEA at source at write time (rates pages change without notice).
- Build the two-step worked example (receipt income + later CGT) and verify the arithmetic; label as illustrative, not a filing figure.
- Confirm the misc-vs-trading wording against CRYPTO21150 before writing that section.
- WebFetch one rival mining-tax post to confirm it stops at "income on receipt" and misses the second-leg CGT (the coverage gap to exploit).

## FLAGGED open items

- No house position covers a specific mining-cost deduction position (electricity, hardware) for either the misc-income or trading-income route. Do NOT assert deductibility rules from memory. Either omit the expenses question or route it to "speak to us"; flag for the orchestrator if a costs section is wanted at Stage 2.
