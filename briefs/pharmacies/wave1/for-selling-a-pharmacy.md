---
slug: for-selling-a-pharmacy
tier: money
route: /for/selling-a-pharmacy
intent: HIRE / EVENT-PROBLEM. The exit moment: an owner selling a community pharmacy selecting a specialist for CGT/BADR planning, valuation, and deal structuring. Owner/seller frame throughout.
---
# Segment hub: accountants for selling a pharmacy (the site)

> Seed brief (Stage 1). Working brand agnostic; all copy references "the site" / "the firm". CTA and brand copy flow from site config at write time. No em-dashes anywhere. Faceless authority only (no named experts, no credential claims; owner is not an accountant, authority via cited HMRC and NHS sources).

## Target queries (evidence: LAUNCH_CORE.md, DataForSEO UK 2026-07-11, gl=GB)

- Primary: "selling a pharmacy" 30/mo, KD 7, CPC £9.32 (high CPC, low volume, the high-value/low-competition wedge)
- Supporting: "pharmacy valuation" 20/mo, CPC £7.90-15.33; "pharmacy goodwill" (no measured volume, autocomplete-real)
- Adjacent: "preparing a pharmacy for sale" (autocomplete family, no measured volume)

## Search-intent class + play

High-value exit event (intent class 2, event-problem, plus the class-1 hire head). The seller is realising a lifetime of goodwill and the tax on it is the whole game: BADR timing, CGT beyond the BADR band, and how deal structure changes when the tax falls due. The wedge: BADR is 18% for 2026/27 up to the £1m lifetime limit (HP 14) and the rate stepped up from 14% in 2025/26, so timing a sale around BADR rate steps is real money. Answer-first, then convert to exit-planning engagement. Seller/owner frame; this is a business disposal.

## Competitors to beat (COMPETITORS.md per LAUNCH_CORE; live-URL check is Stage 2)

- Pharmacy brokers. They market the sale and find the buyer but do not do the CGT/BADR/structuring work. Beat by owning the tax-and-structuring layer.
- Generalist exit accountants. Beat by pharmacy-specific goodwill/valuation literacy (the NHS contract drives the price, HP 16 method-level) and BADR-timing precision.

## Required structure

H2 skeleton:
1. Hero: accountants for selling a pharmacy (exit-tax value prop + CTA)
2. What your pharmacy is worth (valuation stays method-level: multiple of adjusted EBITDA and pence-per-item benchmarks, driven by the NHS contract and item volume; HP 16, HP 13; route to /services/pharmacy-valuation-goodwill; assert no multiple)
3. Business Asset Disposal Relief (18% for 2026/27 on qualifying disposals up to the £1m lifetime limit per person; the rate was 14% in 2025/26 and 10% before, so timing matters; HP 14)
4. CGT beyond BADR (standard rates: 18% within the basic-rate band and 24% above, annual exempt amount frozen at £3,000; a pharmacy is a non-residential asset for the rate split; HP 15)
5. Share sale vs asset sale for the seller (the mirror of the buyer decision; what each does to your tax; HP 12)
6. Deal structure and when tax falls due (earn-outs and deferred consideration change the timing; HP 15)
7. Preparing the accounts for sale (clean, finance-ready books a buyer's diligence will accept; ties to HP 6, HP 7, HP 8)
8. Free tools (link the purchase-affordability calculator as buyer-side context; note no dedicated sale-tax calculator at launch, see gap flag)
9. How the site supports an exit (process; fees from config)
10. Anonymised social proof + next step CTA

FAQ candidates (questions only):
- How much CGT will I pay when I sell my pharmacy? (HP 14, HP 15; band-split, BADR at 18% up to £1m)
- What is BADR and has the rate changed? (HP 14; 18% for 2026/27, was 14%)
- Is my whole gain taxed at the BADR rate? (HP 14, HP 15; only up to the £1m lifetime limit, then standard CGT)
- How is a pharmacy valued? (HP 16; method-level, no fixed multiple)
- Should I sell shares or assets? (HP 12)
- Can I spread the tax with an earn-out? (HP 15)

Table/chart opportunities: a BADR-timing strip (10% pre-2025/26, 14% 2025/26, 18% 2026/27, up to £1m lifetime limit per person; HP 14); a "beyond BADR" CGT line (18% basic-rate band / 24% above, AEA £3,000, non-residential asset; HP 15). Every figure links its source. No valuation multiple asserted (HP 16).

Calculator embeds: none dedicated at launch (see gap flag). Do not fabricate a sale-tax figure inline; route the number to "speak to us".

Internal links (launch core): homepage, /for/pharmacy-owners, /for/buying-a-pharmacy (mirror decision), /for/pharmacy-groups, /services/pharmacy-sale-cgt-badr, /services/pharmacy-valuation-goodwill, /services/pharmacy-incorporation-structure, the data asset (/research/pharmacy-openings-closures-index).

Lead form: seller intake (owner-side). Segment-specific optional fields: buying or selling (dropdown, set to selling), number of stores, approximate items per month, target exit timeframe, has a broker been appointed (y/n).

## House positions touched (docs/pharmacies/house_positions.md; gov.uk URLs below)

- HP 12: share vs asset sale (SDLT / stamp duty implications for the deal, mirror of the buy side). https://www.gov.uk/stamp-duty-land-tax/nonresidential-and-mixed-use-rates and https://www.gov.uk/tax-buy-shares
- HP 13: goodwill dominates pharmacy pricing; CT relief on goodwill restricted (relevant to buyer's structuring, seller context). https://www.gov.uk/guidance/corporation-tax-relief-on-goodwill-and-relevant-assets
- HP 14: BADR charges CGT at 18% for 2026/27 up to the £1m lifetime limit per person; was 14% in 2025/26, 10% before; rose 6 April 2026. https://www.gov.uk/business-asset-disposal-relief
- HP 15: standard CGT 18% within the basic-rate band and 24% above; AEA frozen at £3,000; earn-outs/deferred consideration change when tax falls due; pharmacy is a non-residential asset. https://www.gov.uk/capital-gains-tax/rates
- HP 16: valuation method-level (adjusted EBITDA multiple, pence-per-item); no asserted multiple. Internal position, no external rate cited.

Consistency rules: UK default. Every figure links its source. BADR rate always 18% for 2026/27, never a stale 10%/14%. CGT beyond BADR always band-split. Seller/owner frame only.

## Hallucination danger zones

- BADR is 18% for 2026/27 up to the £1m lifetime limit per person (HP 14). Do not use 10% or 14% as current; do not imply the whole gain gets the BADR rate above £1m.
- Standard CGT is band-split 18%/24% with AEA £3,000 (HP 15); never present a flat rate.
- Do not assert a valuation multiple or pence-per-item figure (HP 16).
- CT relief on goodwill is restricted (HP 13); do not imply the buyer gets full relief (and this is buyer-side detail anyway).
- Nothing clinical; disposal and tax mechanics only (positioning wall).
- No credential claims, no named expert. No em-dashes.

## Gap flag (house_positions / calculator)

- No dedicated pharmacy sale-tax (BADR/CGT) calculator in the launch tier (CALCULATORS.md launch tools are purchase affordability, FP34 cash-flow, locum take-home). This page routes the sale-tax number to "speak to us" rather than embedding a tool. Flagging for a possible Wave-2 sale-tax estimator; not inventing one now.
- All figures on this page map to existing house positions (HP 12-16); no missing-figure gap.

## Stage 2 TODO

- Re-verify BADR rate/limit and standard CGT rates + AEA at source at write time (rates pages change without notice).
- Confirm whether /services/pharmacy-sale-cgt-badr carries any calculator; if a Wave-2 sale-tax estimator is approved, wire it here.
- Live-URL verify broker exit pages to confirm the tax/structuring gap.
