# Home-move / property-transaction as a standalone niche

Date: 2026-08-08. Nothing to do with accounting. Question: is the estate-agency / house-sale space
worth entering on its own terms?

Data: DataForSEO Google Ads + Labs difficulty + live SERPs, UK (2826). `seeds4.json`, ~6,200 keywords.
Raw in `raw/` (`difficulty.json`, `serp_*.json`).

## Answer: yes, and the target is distressed/fast property sale — not comparison, not valuation.

## Demand by sub-niche

| Sub-niche | Total vol | Keywords | Monthly click value | Note |
|---|---|---|---|---|
| Mortgage / mover | 344,950 | 967 | £3.06m | FCA-regulated |
| **Sell fast / cash buyers** | 77,290 | 1,059 | **£3.06m** | Unregulated, highest CPC |
| Compare agents / valuation | 511,360 | 1,928 | £1.72m | Portal-locked |
| Landlord services | 44,970 | 347 | £1.10m | FCA-regulated (insurance) |
| Conveyancing quotes | 76,460 | 468 | £0.94m | Aggregator-locked |
| Auction / alternatives | 339,610 | 1,181 | £0.52m | Open |
| Move services (EPC, survey, removals) | 75,490 | 255 | £0.44m | Low value per lead |

`sell_fast_cash` does the same monthly click value as the whole mortgage corpus off **a quarter of
the volume**, because the CPCs are extraordinary: `sell my house fast` £52.41, `quick house sale`
£55.05, `sell house fast` £42.83, `cash house buyers` £40.19, `we buy any house` £38.96.
A £50 CPC in a market where a conversion is one property transaction implies a lead worth
low hundreds of pounds. That is 10-20x what an accounting lead fetches.

## Difficulty — the surprise

Keyword difficulty across the whole space is **low**, not high:

| KD | Vol | CPC | Keyword |
|---|---|---|---|
| **3** | 5,400 | £38.96 | we buy any house |
| 8 | 880 | £14.56 | sell house at auction |
| 8 | 1,000 | £10.69 | rics level 2 survey |
| 10 | 480 | £3.95 | probate house sale |
| 12 | 5,400 | £12.30 | conveyancing solicitors near me |
| 13 | 2,900 | £4.12 | part exchange house |
| 15 | 1,000 | £24.67 | online conveyancing |
| 22 | 320 | £40.19 | cash house buyers |
| 25 | 2,400 | £42.83 | sell house fast |
| 26 | 1,300 | £52.41 | sell my house fast |
| 28 | 720 | £55.05 | quick house sale |
| 1 | 14,800 | £3.88 | epc booking |

For comparison, the terms we should *not* chase: `how much is my house worth` KD 37,
`landlord insurance quotes` KD 36, `cheap landlord insurance` KD 44.

## SERPs — who actually holds the ground

**`sell my house fast`** — operators and independent advice, no aggregator moat:
Property Solvers, National Homebuyers, HomeOwners Alliance, Bettermove, WeBuyAnyHome,
MoneySavingExpert forum, sellhousefast.uk, **TheAdvisory**, MoneyHelper.
Note positions 3, 8 and 9: HOA, TheAdvisory and MoneyHelper are *not* buyers. They rank by being
the honest broker warning people about the buyers. That slot is reproducible.

**`compare conveyancing quotes`** — MoneySupermarket, USwitch, Co-op Legal, reallymoving,
conveyancingcalculator, GoCompare. Aggregator-dominated, big-budget. Avoid as a head play.

**`how much is my house worth`** — Zoopla, Nationwide, Rightmove, propertychecker, GetAgent.
Portal-locked by proprietary sold-price data we do not have. Do not attack.

**`landlord insurance quotes`** — GoCompare, Direct Line, AXA, CompareTheMarket, Aviva, HomeLet.
Aggregator-locked *and* FCA-regulated introduction. Do not attack.

## Why "sell fast" specifically

1. **Highest lead value in the whole property space.** £40-55 CPC.
2. **Winnable.** KD 3-28, and the incumbents are thin operator sites, not portals or price-comparison
   giants with eight-figure budgets.
3. **Unregulated.** Cash-buying is covered by NAPB / The Property Ombudsman voluntary codes, but a
   comparison or advice site introducing vendors needs no FCA authorisation. Insurance and mortgage
   introductions do. This is the only high-value corner of the space we can enter without permissions.
4. **Faceless-compatible.** The winning editorial position is watchdog, not practitioner —
   consistent with the estate-wide constraint that we cannot front a named professional.
5. **Genuinely underserved.** The audience is distressed sellers (repossession, divorce, probate,
   chain collapse, emigration) being offered 75-80% of market value by companies whose incentive is
   to obscure that. A site that shows the real discount, names the codes of practice, and routes to
   vetted buyers is a real public good and an obvious authority magnet.
6. **Existing adjacency.** `probate house sale` (480, KD 10) sits directly on the wills-probate build.
   `part exchange house` (2,900, KD 13) and `sell house at auction` (880, KD 8) are the honest
   alternatives the same audience needs, and both are open ground.

## Monetisation

Vendor lead sells more than once: cash-buying company or auction house (primary, highest value),
conveyancer, removals, EPC. Plus the distressed-seller segment overlaps probate and divorce, which
are already built brands in this estate.

## Recommended build

**Enter at "sell fast / distressed sale" as an independent watchdog brand.**

1. Core cluster: `sell my house fast`, `sell house fast`, `quick house sale`, `we buy any house`,
   `cash house buyers`, `house buying companies uk` — but written as *how much you actually lose*,
   not as a buying service.
2. Calculator-shaped hook: a genuine-offer calculator (market value in, realistic cash-buyer offer
   out, with the discount and timeline shown against the open-market alternative). This is the
   `sell fast` analogue of the fee calculator, and it is the qualifier.
3. Alternatives cluster as the honest counterweight: auction (KD 8), modern method of auction,
   part exchange (KD 13), probate sale (KD 10), assisted sale.
4. Situational entry pages: repossession, divorce, probate, emigration, chain collapse, inherited
   property. These are the segments, and each maps to a different lead buyer.

**Do not build:** house valuation (portal-locked), conveyancing comparison (aggregator-locked),
landlord or any insurance (aggregator-locked plus FCA), mortgage comparison (FCA).
**Note but deprioritise:** `epc booking` KD 1 at 14,800/mo is the easiest traffic in the entire
dataset, but £3.88 CPC makes it a fulfilment business, not a lead-gen one. Useful as a
supporting/top-of-funnel asset only.

## Open questions before committing

- Lead price evidence: need actual quotes from cash-buying firms / auction houses. `R2B_LEAD_VALUE.md`
  has the method for this; the numbers here are CPC-inferred, not confirmed.
- Editorial risk: a watchdog position invites complaints from the firms we would then sell leads to.
  The monetisation and the editorial line have to be reconcilable, or the brand dies.
- Domain and brand: new standalone property, not a bolt-on to an accounting brand.
