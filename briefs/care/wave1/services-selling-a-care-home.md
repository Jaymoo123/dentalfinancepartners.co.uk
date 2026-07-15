---
slug: selling-a-care-home
tier: money
route: /services/selling-a-care-home
intent: HIRE. Owners planning an exit who need CGT/BADR planning, structure clean-up (propco/opco) and disposal advice; the exit mirror of the buy-side page, write after it. No measured volume, kept as low-marginal-cost mirror.
---
# Service: Selling a care home (BRAND_TBD)

> Seed brief (Stage 1). Brand is BRAND_TBD; all copy references "the site". CTA and brand copy flow from site config at write time. No em-dashes anywhere. Ships downstream as a TS service-data entry ({slug,title,headline,metaTitle,metaDescription,intro,stats[3],challenges[4],howWeHelp[3],faqs[2+]}). WRITE AFTER buying-a-care-home; mirror its structure.

## Target queries (evidence: LAUNCH_CORE.md, DataForSEO UK 2826, fetched 2026-07-11)

- No measured volume on any "selling a care home" variant (DFS null = <10/mo)
- Kept as the exit-side mirror of the buy page at near-zero marginal cost; demand evidence rests on the buy-side family + rival precedent (Florence Legacy "Sell Your Care Home")
- Cluster context: buy/sell/finance family; brokers own valuation, we own CGT/structure

## Search-intent class + play

OPERATOR-PROBLEM into HIRE. Same gap as the buy side, on exit: brokers and M&A firms sell the disposal, nobody owns the accountant's tax slice. The exit story is CGT and Business Asset Disposal Relief at the current 18% rate (HP19, a live correction: the rate is not 10%), plus the propco/opco structure question, which can break BADR eligibility. Play: get the structure right two years before exit, because BADR needs 2 years of trading ownership (HP19). Lead with the CGT number and the eligibility traps. BLUF on every money H2.

## Competitors to beat (COMPETITORS.md; live-URL check is Stage 2)

- **Brokers/M&A** (Florence Legacy "Sell Your Care Home", Rangewell, Carterwood, Christie) — own the sale process and valuation. Do not fight valuation; own the CGT/BADR/structure slice and position as the seller's independent tax adviser.
- **Capital-allowances houses** — care about the buyer's allowances, not the seller's exit tax; clear lane for us.
- SECTION firms (Hawsons, MMBA) mention buy/sell but not the BADR-18%/propco-opco depth; own it, with the current rate correct.

## Required structure

H2 skeleton (each money H2 opens with a citable 40-60 word BLUF answer):
1. Hero: selling a care home, keeping more of the proceeds (value prop + primary CTA)
2. Capital gains tax and Business Asset Disposal Relief on the sale (HP19, 18% from 6 April 2026)
3. The BADR eligibility conditions and how propco/opco can break them (HP19)
4. Asset sale vs share sale: the tax consequence for you (HP18 context)
5. Timing and pre-sale structuring (the 2-year trading-ownership condition)
6. What financial information a buyer's due diligence will want (mirror of the buy page)
7. How we work alongside your broker and solicitor on exit + next-step CTA

### Concrete TS-field candidates

- **stats[3]** (HP-verifiable only): (a) Business Asset Disposal Relief cuts the CGT rate to 18% for qualifying disposals from 6 April 2026, on up to £1m of lifetime gains (HP19); (b) the standard higher-rate CGT rate on non-BADR gains is 24% from 6 April 2026, so BADR now saves 6 percentage points (HP19); (c) BADR requires 2 years of trading ownership before disposal, and the annual CGT exempt amount is £3,000 (HP19, and AEA per rules ledger).
- **challenges[4]**: (1) assuming BADR is still 10% when the rate is 18% from 6 April 2026 (HP19); (2) a propco/opco structure that unintentionally breaks BADR eligibility (HP19); (3) not meeting the 2-year trading-ownership condition because the structure was set up too late (HP19); (4) treating an asset sale and a share sale as tax-equivalent when they are not (HP18 context).
- **howWeHelp[3]**: (1) model the CGT and BADR position on your disposal at the current 18% rate; (2) review propco/opco and ownership structure well before exit so BADR is not lost; (3) prepare the financial information a buyer's due diligence will demand so the sale does not stall.
- **faqs[2+]**: below.

FAQ candidates (questions only):
- How much capital gains tax will I pay when I sell my care home?
- Can I claim Business Asset Disposal Relief on the sale of my care home?
- What is the BADR rate now?
- Will my propco/opco structure affect the tax on sale?
- Should I sell the shares or the assets of my care business?
- How far in advance should I plan the tax on selling my care home?

Table opportunity: BADR-vs-standard CGT comparison (18% vs 24% from 6 April 2026), each rate linking gov.uk.

Internal links (launch core): /services/buying-a-care-home (mirror, primary), /for/care-homes, /services/care-vat-review; blog (capital allowances / FA 2026 for context).

## House positions touched

- HP 19: BADR 18% from 6 April 2026 (not 10%); prior 10%/14%; standard CGT 24%; 2-year condition; propco/opco can break eligibility; £1m lifetime limit. https://www.gov.uk/business-asset-disposal-relief + https://www.gov.uk/capital-gains-tax/rates
- HP 18: CT rates, propco/opco, associated companies (structure context). https://www.gov.uk/corporation-tax-rates
- (AEA £3,000: per rates ledger / CGT rates page; confirm at write time.)

## Hallucination danger zones

- BADR is 18% for disposals from 6 April 2026, not 10% (HP19 consistency rule); the 10% rate ended April 2025. This is the single most likely stale-figure error, guard it.
- No pricing/valuation figures (config decides; broker territory).
- The £1m BADR lifetime limit is a lifetime figure across all qualifying disposals, not per-sale; state it correctly.
- AEA £3,000: confirm the current figure against the CGT rates page at write time before stating it.
- Do not state SDLT/LBTT effects for the buyer as if they are the seller's cost; keep to the seller's CGT slice or FLAG.
- Default England; devolved land taxes differ, flag if raised.

## Stage 2 TODO

- Live-URL verify Florence Legacy and broker exit pages for the complementary-positioning angle.
- Confirm AEA £3,000 and the £1m BADR lifetime limit against live gov.uk at write time.
- Confirm whether any earn-out / deferred-consideration CGT treatment needs its own HP before it is asserted (currently none; FLAG).
