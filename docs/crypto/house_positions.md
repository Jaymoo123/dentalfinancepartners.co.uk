# Crypto traders and investors, house positions (locked figures and framings)

Locked at pre-launch build (2026-07-14), produced from
`expansion_research/tier1_crypto/HOUSE_POSITIONS_OUTLINE.md` (30 positions, all
30 citation URLs fetched live and phrase-checked 2026-07-11,
`raw/citation_checks.json`). The three load-bearing figures (CGT non-residential
rates, CGT annual exempt amount, CARF reporting dates) were re-verified at source
on **2026-07-14** during this producer pass. Rates quoted are 2026/27 unless
stated. FA 2026 ground-truth memory entries were honoured.

These are the positions every page, calculator and blog on the crypto site must
be internally consistent on. Do not change a figure without updating every
location it appears (pages, calculator logic, blog copy, rates ledger).

**Default jurisdiction: United Kingdom (HMRC, England and Wales law where
relevant).** The cryptoasset tax rules are UK-wide; where Scottish income tax
bands change a marginal-rate outcome, flag it explicitly rather than silently
assume rUK bands.

**Regulated-advice boundary:** this site gives tax-compliance guidance only. It
never gives investment advice, price views, or financial promotions. Every page
frames outputs as general guidance, not personal advice, and routes complex
facts to "speak to us".

If a page hits a factual conflict with a competitor source, flag it for the
orchestrator; do not unilaterally re-frame a locked position.

---

## A. Core CGT framework

**1. Disposals of cryptoassets are CGT events for almost all individuals.**
Selling crypto for fiat, swapping one token for another, spending crypto on goods
or services, and gifting crypto (except to a spouse or civil partner) are all
disposals for Capital Gains Tax. HMRC treats the great majority of individual
holders as investors, so gains fall under CGT rather than income tax.
Source: https://www.gov.uk/guidance/check-if-you-need-to-pay-tax-when-you-sell-cryptoassets
(verified 2026-07-11).

**2. CGT on cryptoassets is charged at 18% within the basic-rate band and 24%
above it; higher and additional-rate taxpayers pay 24% on the whole gain.**
Crypto is a non-residential asset. A basic-rate taxpayer pays 18% only on the
part of the gain that fits inside their remaining basic-rate income tax band, and
24% on any gain above that boundary; higher and additional-rate taxpayers pay a
flat 24%. These rates apply for 2026/27 (the 18%/24% structure has applied since
30 October 2024; gov.uk states the 24% higher-rate charge applies from 6 April
2026). Crypto never qualified for the old lower CGT investment-rate carve-outs.
Do NOT state a flat "18% basic rate" without the band-boundary split, this is the
single most common presentation error.
Source: https://www.gov.uk/capital-gains-tax/rates
(re-verified at source 2026-07-14: 18% within basic band, 24% above; higher and
additional rate 24% from 6 April 2026; basic-rate band ceiling £37,700 for
2026/27).

**3. The Capital Gains Tax annual exempt amount is £3,000 (frozen).** Most active
traders exhaust it in one or two disposals; the DIY "I am under the allowance"
assumption is usually wrong once every crypto-to-crypto swap is counted as a
separate disposal.
Source: https://www.gov.uk/capital-gains-tax/allowances
(re-verified at source 2026-07-14: tax-free allowance £3,000).

**4. Section 104 pooling applies per token, at average cost.** Each cryptoasset
has one pool holding the aggregate cost; the allowable cost on a disposal is the
average cost of the pool. FIFO, LIFO and specific-identification (US software
defaults) are WRONG for UK individuals.
Source: https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22200
(verified 2026-07-11).

**5. The same-day rule and the 30-day (bed-and-breakfast) rule override the
pool.** Disposals match against same-day acquisitions first, then acquisitions in
the following 30 days, then the s104 pool. This ordering is the single biggest
source of DIY-calculation error for active traders and is out of scope of any
stateless web calculator (state this openly on the tools).
Source: https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22250
(verified 2026-07-11).

**6. Crypto-to-crypto swaps are taxable disposals** at the sterling market value
at the moment of the swap. "I never cashed out to pounds" is not a defence.
Source: https://www.gov.uk/guidance/check-if-you-need-to-pay-tax-when-you-sell-cryptoassets
(verified 2026-07-11).

**7. Transfers between spouses and civil partners are no-gain/no-loss.** This is a
legitimate planning lever to use both annual exempt amounts and both basic-rate
bands. It is a transfer of the asset, not a sale; the receiving spouse inherits
the base cost.
Source: https://www.gov.uk/capital-gains-tax/gifts
(verified 2026-07-11).

## B. Income tax side (receipt of tokens)

**8. Employment income paid in cryptoassets is taxable as earnings.** Where the
tokens are readily convertible assets, PAYE and National Insurance apply. Employer
Class 1 NIC is charged at 15% above the £5,000 secondary threshold (from 6 April
2025), which the "paying staff in crypto" content must use, not the old
13.8%/£9,100.
Source: https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto42000
(verified 2026-07-11); NIC rate per FA-2026 ground truth.

**9. Mining rewards are taxable on receipt** as miscellaneous income (or as
trading income if the activity amounts to a trade), valued in sterling at receipt.
That receipt value becomes the CGT base cost for the later disposal (the two-step).
Source: https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto21150
(verified 2026-07-11).

**10. Staking rewards follow the same receipt-then-CGT two-step as mining.**
Whether the receipt is miscellaneous income or trading income depends on the
degree of activity and organisation.
Source: https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto21200
(verified 2026-07-11).

**11. Airdrops are taxable as income only if received in return for something**
(a service, or an expectation of doing something). Genuinely unsolicited airdrops
received for nothing are not income; they enter CGT at their acquisition value.
Source: https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto21250
(verified 2026-07-11).

**12. The £1,000 trading and miscellaneous income allowance can shelter small
mining or staking receipts** from income tax, but it does NOT remove CGT on the
later disposal of those tokens.
Sources: https://www.gov.uk/guidance/tax-free-allowances-on-property-and-trading-income
and https://www.gov.uk/guidance/check-if-you-need-to-pay-tax-when-you-receive-cryptoassets
(verified 2026-07-11).

## C. DeFi, the honest-uncertainty position

**13. DeFi lending and staking guidance is manual-only and transaction-specific.**
Whether a return is income or capital, and whether depositing tokens into a
protocol is itself a disposal, depends on the protocol mechanics (in particular
whether beneficial ownership is transferred). We state HMRC's published analysis,
flag that the legislative fix consulted on in 2023 has not been enacted, and never
pretend there is a clean, settled rule.
Source: https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto61000
(verified 2026-07-11).

**14. Many DeFi deposits and liquidity-pool entries are disposals under current
HMRC analysis.** This is the most under-reported event class in DIY returns and is
the flagship accountant-seeking wedge for this site. Always framed as "HMRC's
current view, not settled law".
Source: https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto61000
(verified 2026-07-11).

## D. Trader status (the "am I a trader?" axis)

**15. Almost all individuals are investors, not financial traders, for tax.** HMRC
expects trading treatment "only in exceptional circumstances"; the badges of trade
apply as they do for shares, and high frequency alone does not make a trade.
Sources: https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto20250
and https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim20205
(verified 2026-07-11).

**16. Trader status is usually a BAD outcome to chase.** Trading profits are
income taxed at up to 45% plus Class 4 NIC, versus 24% CGT. The honest advice
inverts the common Reddit framing that "trader status" is a prize; it mainly
matters for loss-relief edge cases.
Sources: https://www.gov.uk/income-tax-rates and
https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto20250
(verified 2026-07-11).

**17. Day-trading in shares, forex and CFDs uses the same badges-of-trade
analysis.** Spread-betting winnings are generally outside tax (gambling, not a
trade), and spread-betting losses are equally unrelievable.
Source: https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim22015
(verified 2026-07-11).

**18. Personal foreign-exchange gains can be chargeable gains.** Currency other
than sterling is an asset for CGT; the exemption for foreign currency acquired for
personal spending abroad is narrow.
Source: https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg78300
(verified 2026-07-11).

## E. Losses, lost keys, worthless tokens

**19. Capital losses must be CLAIMED to be usable, normally within four years** of
the end of the tax year in which they arose. Unreported loss years are recoverable
value an accountant finds and carries forward.
Source: https://www.gov.uk/capital-gains-tax/losses
(verified 2026-07-11).

**20. Losing private keys is NOT itself a disposal.** A negligible value claim may
work only if the asset itself has become worthless, not merely inaccessible; DIY
guides routinely blur this distinction.
Source: https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22400
(verified 2026-07-11).

**21. Negligible value claims are available for genuinely worthless tokens** (rug
pulls, dead chains), crystallising an allowable loss without a sale.
Source: https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22500
(verified 2026-07-11).

**22. Exchange collapse (FTX-class) is fact-specific.** The outcome may be a
negligible value claim, a capital loss on the claim against the exchange, or
nothing yet, depending on the facts. We never promise a deduction.
Sources: https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22400
and https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22500
(verified 2026-07-11).

**23. Blockchain forks split the base cost between the old and new tokens; they
are not free income at the point of the fork.** The allowable cost is
apportioned on a just and reasonable basis.
Source: https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22300
(verified 2026-07-11).

## F. Compliance, disclosure and CARF (the urgency engine)

**24. From 1 January 2026 UK cryptoasset platforms must collect user and
transaction data under the Cryptoasset Reporting Framework (CARF); the first
report to HMRC is due between 1 January 2027 and 31 May 2027, covering the 2026
calendar year.** The "HMRC cannot see my exchange" era is formally over. This is
the site's central urgency narrative and it is TRUE, not scare copy; state the
dates precisely and never exaggerate them.
Sources: https://www.gov.uk/guidance/collecting-cryptoasset-user-and-transaction-data
(collection from 1 January 2026) and
https://www.gov.uk/guidance/reporting-cryptoasset-user-and-transaction-data
(re-verified at source 2026-07-14: collect for 1 January 2026 to 31 December 2026;
first report submitted between 1 January 2027 and 31 May 2027; annual thereafter).

**25. HMRC runs a dedicated cryptoasset disclosure service** for unpaid tax on
crypto. The number of years assessed depends on behaviour (reasonable care,
careless, or deliberate). Nudge-letter recipients should respond, not ignore the
letter.
Source: https://www.gov.uk/guidance/tell-hmrc-about-unpaid-tax-on-cryptoassets
(verified 2026-07-11).

**26. The Self Assessment registration deadline is 5 October** following the tax
year in which the first reportable gains or income arose. The SA108 capital gains
pages now include dedicated cryptoasset entries.
Sources: https://www.gov.uk/register-for-self-assessment and
https://www.gov.uk/self-assessment-tax-returns/who-must-send-a-tax-return
(verified 2026-07-11).

**27. Gains can be reportable even when no tax is due.** Where disposal proceeds
exceed the reporting threshold, the disposals must be reported inside Self
Assessment even if the annual exempt amount covers the gain.
Source: https://www.gov.uk/capital-gains-tax/reporting-and-paying-capital-gains-tax
(verified 2026-07-11).

## G. Other taxes and scope walls

**28. Cryptoassets are property for Inheritance Tax** and are treated as UK-situs
for UK-resident holders under HMRC's location analysis. This is an estate-planning
content lane, always flagged as an evolving HMRC view rather than settled law.
Source: https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto25000
(verified 2026-07-11).

**29. Exchanging exchange tokens is not itself a VATable supply of the tokens.**
VAT bites on goods and services paid for in crypto, at their sterling value at the
time of the transaction, not on the token exchange itself.
Source: https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto45000
(verified 2026-07-11).

**30. Scope wall versus the rest of the estate.** Property CGT belongs to the
property site; company share-scheme, EMI and SEIS content belongs to the startups
site (when built); generic sole-trader Self Assessment belongs to the generalist
site. This site owns crypto, day-trading and forex tax ONLY. No cross-linking
between estate sites, ever. (Internal position, no citation.)

## H. Build-time additions (verified at source 2026-07-14)

These positions were added during the launch-core build to close gaps the brief
writers flagged (disclosure economics, the trader-status comparison, and the
company lane).

**31. Voluntary disclosure covers a number of past years that depends on
behaviour: 4 years (reasonable care), 6 years (careless), 20 years
(deliberate).** Penalties are charged as a percentage of the tax due and vary by
behaviour and by whether the disclosure is unprompted or prompted; an unprompted
disclosure secures the lowest penalty. State the year counts precisely; present
the penalty percentages as ranges with a link to HMRC's penalty guidance, and do
NOT assert an exact penalty percentage without re-verifying it at build time.
Source: https://www.gov.uk/guidance/tell-hmrc-about-unpaid-tax-on-cryptoassets
(re-verified at source 2026-07-14: 4 / 6 / 20 years by behaviour).

**32. Class 4 National Insurance (self-employed) 2026/27 is 6% on profits between
£12,570 and £50,270 and 2% on profits above £50,270.** This is the extra cost
that makes a trading-income outcome worse than CGT for most people (used in the
investor-vs-trader comparison alongside income tax to 45%).
Source: https://www.gov.uk/self-employed-national-insurance-rates
(re-verified at source 2026-07-14).

**33. Corporation Tax: main rate 25% on profits over £250,000, small profits rate
19% on profits up to £50,000, with Marginal Relief between the two thresholds
(reduced proportionately by the number of associated companies).** A company has
no CGT annual exempt amount; a company's disposal of cryptoassets falls within
Corporation Tax, not CGT. The accounting measurement of company crypto holdings
(cost vs fair value under the applicable standard) is fact-specific, describe the
principle and route specifics to "speak to us"; do not assert one measurement
basis as universal.
Source: https://www.gov.uk/corporation-tax-rates
(re-verified at source 2026-07-14: 25% / 19% / Marginal Relief).

## Presentation rules

- Every rate or figure above must be re-verified against the cited page at build
  time if a page restates it (rates pages change without notice).
- The DeFi positions (13, 14) and the IHT-situs position (28) carry explicit
  "HMRC's current view, not settled law" wording every time they appear.
- No em-dashes in user-facing copy (estate rule); use commas, parentheses, full
  stops or middle dots. This document is internal and may use them.
- No credential claims and no named individuals. The firm is faceless; authority
  comes from cited HMRC sources, the calculators, and the data asset, never from
  claimed qualifications or a named expert (owner is not an accountant).
- Calculators are scenario and estimate tools that end at "your situation has X
  complexity, speak to us". They never claim to produce a filing-ready tax figure
  and always state their simplifications (see CALCULATORS.md).
