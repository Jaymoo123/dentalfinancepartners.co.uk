# House positions outline — Crypto traders & investors site (R3, 2026-07-11)

Every citation URL below was fetched live 2026-07-11 and phrase-checked
(`s6_citation_check.py` → `raw/citation_checks.json`, 30/30 passing, 0 failing).
Positions follow the estate house_positions pattern: one defensible, cited stance per row.
Rates quoted are 2026/27 unless stated. FA 2026 ground-truth memory entries were honoured.

## A. Core CGT framework

1. **Disposals of cryptoassets are CGT events for almost all individuals.** Selling for fiat,
   swapping crypto-to-crypto, spending crypto and gifting (except to spouse/civil partner) are
   all disposals. — [gov.uk: check if you need to pay tax when you sell cryptoassets](https://www.gov.uk/guidance/check-if-you-need-to-pay-tax-when-you-sell-cryptoassets)
2. **CGT rates on crypto are 18% (basic) / 24% (higher/additional)** — the post-Oct-2024
   unified rates; crypto never qualified for the old lower investment rates carve-outs.
   — [gov.uk CGT rates](https://www.gov.uk/capital-gains-tax/rates)
3. **Annual exempt amount is £3,000** (frozen). Most active traders blow through it in one
   or two disposals; the "I'm under the allowance" self-serve assumption is usually wrong once
   swaps are counted. — [gov.uk CGT allowances](https://www.gov.uk/capital-gains-tax/allowances)
4. **Section 104 pooling applies per-token.** Each cryptoasset has one pool with average
   cost; FIFO/LIFO/spec-ID (US methods baked into some software defaults) are WRONG for UK.
   — [CRYPTO22200](https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22200)
5. **Same-day and 30-day (bed-and-breakfast) rules override the pool.** Same-day acquisitions
   match first, then acquisitions within the following 30 days, then the s104 pool. This is
   the single biggest source of DIY-calculation error for active traders. — [CRYPTO22250 pooling examples](https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22250)
6. **Crypto-to-crypto swaps are taxable disposals** at sterling market value — "I never cashed
   out" is not a defence. — [gov.uk sell cryptoassets guidance](https://www.gov.uk/guidance/check-if-you-need-to-pay-tax-when-you-sell-cryptoassets)
7. **Spouse/civil partner transfers are no-gain/no-loss** — a legitimate planning lever to use
   both AEAs and both basic-rate bands. — [gov.uk CGT gifts](https://www.gov.uk/capital-gains-tax/gifts)

## B. Income-tax side (receipt of tokens)

8. **Employment income paid in crypto is taxable as earnings** (PAYE/NIC where readily
   convertible assets). — [CRYPTO42000](https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto42000)
9. **Mining rewards are taxable on receipt** — miscellaneous income (or trading income if the
   activity amounts to a trade), with a CGT base cost established at receipt value.
   — [CRYPTO21150](https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto21150)
10. **Staking rewards follow the same receipt-then-CGT two-step** as mining; nature (misc vs
    trading) depends on degree of activity/organisation. — [CRYPTO21200](https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto21200)
11. **Airdrops: taxable as income only if received in return for something** (service,
    expectation); unsolicited airdrops enter CGT at acquisition value instead.
    — [CRYPTO21250](https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto21250)
12. **The £1,000 trading/miscellaneous income allowance can shelter small mining/staking
    receipts** — but not CGT on later disposal. — [gov.uk trading allowance](https://www.gov.uk/guidance/tax-free-allowances-on-property-and-trading-income),
    [gov.uk receive cryptoassets](https://www.gov.uk/guidance/check-if-you-need-to-pay-tax-when-you-receive-cryptoassets)

## C. DeFi — honest uncertainty position

13. **DeFi lending/staking guidance is manual-only and transaction-specific**: whether return
    is income or capital, and whether depositing tokens is itself a disposal, depends on the
    protocol mechanics (transfer of beneficial ownership). We state HMRC's published analysis,
    flag that a legislative fix consulted on in 2023 has not been enacted, and never pretend
    there is a clean rule. — [CRYPTO61000](https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto61000)
14. **Many DeFi deposits/liquidity-pool entries are disposals under current HMRC analysis** —
    the most under-reported event class in DIY returns; this is the flagship
    accountant-seeking wedge. — [CRYPTO61000](https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto61000)

## D. Trader-status (the "am I a trader?" axis)

15. **Almost all individuals are investors, not financial traders, for tax.** HMRC expects
    trading treatment "only in exceptional circumstances"; badges of trade apply as for shares.
    High frequency alone does not make a trade. — [CRYPTO20250](https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto20250), [BIM20205 badges of trade](https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim20205)
16. **Trader status is usually a BAD outcome to chase** (income tax up to 45% + Class 4 NIC vs
    24% CGT) — the honest advice inverts the common Reddit framing that "trader status" is a
    prize; it matters mainly for loss-relief edge cases. — [gov.uk income tax rates](https://www.gov.uk/income-tax-rates), [CRYPTO20250](https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto20250)
17. **Day-trading content lane (shares/forex/CFDs): same badges-of-trade analysis;** spread
    betting winnings are generally outside tax (gambling, no trade) — and losses equally
    unrelievable. — [BIM22015](https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim22015)
18. **Personal forex gains can be chargeable gains** (currency other than sterling is an
    asset; foreign-currency-for-personal-spending exemption is narrow). — [CG78300](https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg78300)

## E. Losses, lost keys, worthless tokens

19. **Capital losses must be CLAIMED (normally within 4 years) to be usable**; unreported loss
    years are recoverable value an accountant finds. — [gov.uk CGT losses](https://www.gov.uk/capital-gains-tax/losses)
20. **Losing private keys is NOT a disposal**; a negligible value claim may work only if the
    asset itself becomes worthless — the key distinction DIY guides blur.
    — [CRYPTO22400](https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22400)
21. **Negligible value claims are available for genuinely worthless tokens** (rug pulls, dead
    chains), crystallising a loss without a sale. — [CRYPTO22500](https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22500)
22. **Exchange collapse (FTX-class) is fact-specific**: negligible value vs capital loss on
    claims vs nothing-yet; we do not promise a deduction. — [CRYPTO22400](https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22400), [CRYPTO22500](https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22500)
23. **Blockchain forks split base cost, they are not free income** at the point of fork.
    — [CRYPTO22300](https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22300)

## F. Compliance, disclosure, CARF (the urgency engine)

24. **From 1 January 2026 UK crypto platforms must collect user data under CARF and report to
    HMRC (first reports due 31 May 2027)** — the "HMRC can't see my exchange" era is formally
    over; this is the site's central urgency narrative and it is TRUE, not scare copy.
    — [gov.uk: collecting cryptoasset user and transaction data](https://www.gov.uk/guidance/collecting-cryptoasset-user-and-transaction-data) (1 Jan 2026 collection start);
    [gov.uk: reporting cryptoasset user and transaction data](https://www.gov.uk/guidance/reporting-cryptoasset-user-and-transaction-data) ("submit your first report between 1 January 2027 and 31 May 2027"; fetch-verified 2026-07-11)
25. **HMRC runs a dedicated cryptoasset disclosure service** for unpaid tax on crypto; number
    of years assessed depends on behaviour (careless vs deliberate). Nudge-letter recipients
    should respond, not ignore. — [gov.uk: tell HMRC about unpaid tax on cryptoassets](https://www.gov.uk/guidance/tell-hmrc-about-unpaid-tax-on-cryptoassets)
26. **Self Assessment registration deadline is 5 October** after the tax year of first
    reportable gains/income; SA108 now has dedicated cryptoasset boxes.
    — [gov.uk register for SA](https://www.gov.uk/register-for-self-assessment), [who must send a return](https://www.gov.uk/self-assessment-tax-returns/who-must-send-a-tax-return)
27. **Gains can be reportable even when no tax is due** (proceeds-threshold reporting inside
    SA). — [gov.uk CGT reporting](https://www.gov.uk/capital-gains-tax/reporting-and-paying-capital-gains-tax)

## G. Other taxes + scope walls

28. **Cryptoassets are property for IHT** and are UK-situs for UK-resident holders per HMRC's
    location analysis — estate-planning content lane, always flagged as evolving.
    — [CRYPTO25000](https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto25000)
29. **Exchanging crypto is not itself a VATable supply of the tokens** (exchange tokens:
    VAT treatment follows the Kittel/CJEU currency line); VAT bites on goods/services paid for
    in crypto at their sterling value. — [CRYPTO45000](https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto45000)
30. **Scope wall vs the estate:** property CGT belongs to the property site; company
    share-scheme/SEIS content belongs to the startups site (when built); generic sole-trader
    SA belongs to the generalist. This site owns crypto/day-trading/forex tax ONLY.
    (Internal position, no citation — see TOPICS.md dedup gate.)

## Presentation rules

- Every rate/figure above re-verified at build time against the cited page (rates pages change).
- DeFi and IHT-situs positions carry explicit "HMRC view, not settled law" wording.
- No em-dashes in user-facing copy (estate rule); this outline is internal.
- No credential claims (user is not an accountant — faceless authority via citations/tools).
