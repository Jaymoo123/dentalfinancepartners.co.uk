---
slug: preparing-a-pharmacy-for-sale
tier: blog
route: /blog/buying-and-selling/preparing-a-pharmacy-for-sale
category: buying-and-selling
intent: EVENT-PROBLEM (assist + capture). A pharmacy owner planning an exit wants to know how to prepare: clean accounts, a defensible margin story, Business Asset Disposal Relief eligibility prep, and timing around the BADR rate steps. Funnels to /for/selling-a-pharmacy and the CGT/BADR sale service.
---
# Preparing a Pharmacy for Sale

## Target queries (evidence: LAUNCH_CORE.md, TOPICS.md, DataForSEO UK measured 2026-07-11)

- **Primary:** "selling a pharmacy" 30/mo CPC £9.32 KD 7 (high-value, low-competition wedge).
- **Prep intent cluster:** "how to sell a pharmacy", "preparing a pharmacy for sale", "pharmacy exit planning" (autocomplete-real, at/below DFS floor).
- Adjacent capture: BADR/CGT and valuation intent served by the sibling goodwill blog and the sale service page.

## Search-intent class + play

EVENT-PROBLEM. The searcher is 12-36 months from an exit and wants to maximise price and minimise tax, from a specialist who understands pharmacy accounts. Play: BLUF box naming the two levers (a clean, defensible margin story raises the price; BADR eligibility and timing lower the tax), then the accounts-cleanup checklist, then the margin-story section, then BADR eligibility prep and the timing point around the rate steps, then capture. The combination of the pharmacy-specific margin story and the BADR-timing arithmetic is the win.

**Cannibalisation split (locked at seed):** this blog owns sale preparation and BADR/timing prep. The goodwill blog (sibling) owns valuation method. /for/selling-a-pharmacy owns hire intent. /services/pharmacy-sale-cgt-badr owns the tax-computation service. Keep valuation multiples out of this post (they live method-level in the goodwill blog).

## Competitors to beat (COMPETITORS.md; domains only at seed, live-URL check is Stage 2)

- **Pharmacy brokers:** own listing/sale-process content but treat the tax (BADR, CGT rate steps, timing) and the accounts-cleanup work thinly. Beat on the accounting/tax prep depth.
- **Generalist accountancy "selling your business" posts:** generic BADR/CGT with no pharmacy margin-story or NHS-contract specificity. Beat on pharmacy specificity.
- **gov.uk (BADR, CGT rates):** authoritative but not a prep playbook. Beat by turning the rules into a timed preparation plan.

## Required structure (bodies are RAW HTML: loader does NO markdown conversion; write <h2>/<p>/<ul>/<table>, not markdown syntax)

H2 skeleton:
1. The short answer: the two levers, clean margin story (price) and BADR eligibility/timing (tax) (BLUF box, cited HP 8, HP 14)
2. Clean, reconciled accounts a buyer's due diligence will trust (HP 8, HP 7 FP34 history, HP 1 VAT mix)
3. The margin story: evidencing Drug Tariff/Category M margin, not just showing a P&L (HP 8)
4. Business Asset Disposal Relief: what qualifies and preparing for it in advance (HP 14)
5. Timing around the BADR rate steps: 18% for 2026/27 (was 14% in 2025/26, 10% before), and the £1m lifetime limit per person (HP 14)
6. Beyond BADR: standard CGT if the gain exceeds the limit (18% within basic band, 24% above; AEA £3,000) (HP 15)
7. Building the timeline: what to fix now versus at deal time (capture)

FAQ candidates (no answers at seed):
- How do I prepare my pharmacy for sale?
- What is Business Asset Disposal Relief and do I qualify?
- What CGT rate will I pay when I sell my pharmacy?
- How much is the BADR lifetime limit?
- Does the timing of my pharmacy sale change the tax?
- What accounts do buyers want to see?

Table/chart opportunities:
- A BADR-timing illustration table: disposal in 2025/26 (14%) vs 2026/27 (18%) on an illustrative qualifying gain up to the £1m limit, showing the tax difference. Numbers illustrative, labelled, internally consistent; anchored on the HP 14 rates only.
- A "sale-readiness checklist" table: accounts item, why a buyer/adviser wants it, fix-now vs deal-time.

Calculator/tool embed: none is the centrepiece here; optionally link the sale/CGT-BADR service and, if a BADR/CGT estimator exists in the fleet at build time, embed it with the standard scenario/estimate note. Do NOT invent a tool that is not in CALCULATORS.md.

Internal links (launch core): /for/selling-a-pharmacy (hub, capture), /services/pharmacy-sale-cgt-badr (service, capture), the pharmacy-goodwill blog (sibling, valuation), the preparing/buying siblings where relevant.

## House positions touched (docs/pharmacies/house_positions.md, ONLY figures source)

- **HP 14 (BADR 18% for 2026/27; was 14% in 2025/26, 10% before; £1m lifetime limit per person):** timing a sale around the rate steps is real money; the lifetime limit is per person. The load-bearing figures. Citation: https://www.gov.uk/business-asset-disposal-relief
- **HP 15 (standard CGT beyond BADR):** 18% within the basic-rate band, 24% above; AEA frozen at £3,000; a pharmacy is a non-residential asset for the rate split; earn-outs/deferred consideration change timing. Citation: https://www.gov.uk/capital-gains-tax/rates
- **HP 8 (Drug Tariff / Category M margin story):** the defensible margin story is what raises the price and survives due diligence. Citation: https://www.nhsbsa.nhs.uk/pharmacies-gp-practices-and-appliance-contractors/drug-tariff
- **HP 7 (FP34 payment history):** a clean NHSBSA payment history is part of buyer-ready accounts. Citation: https://www.nhsbsa.nhs.uk/pharmacies-gp-practices-and-appliance-contractors/submitting-prescriptions
- **HP 1 (VAT-mixed business):** the VAT mix must be right in the accounts a buyer reviews. Citation: https://www.gov.uk/guidance/health-professionals-pharmaceutical-products-and-vat-notice-70157

## Hallucination danger zones (enforce)

- BADR rate is 18% for 2026/27, was 14% in 2025/26, 10% before that (HP 14). This site launches in 2026/27, so 18% is "current". Do NOT state 10% or 14% as current, and do NOT invent a future rate. The £1m lifetime limit is per person (HP 14), not per company or per disposal.
- Standard CGT is 18% only within the remaining basic-rate band, 24% above (HP 15). NEVER state a flat "18% CGT". AEA is £3,000 (HP 15), not any older figure. A pharmacy is non-residential for the split.
- The BADR-timing table is ILLUSTRATIVE (labelled), internally arithmetic-consistent, anchored on the HP 14 rates only. Double-check the tax-difference maths.
- Do NOT quote valuation multiples or a headline sale price here (that is the goodwill blog, and even there only method-level; HP 16 no-invent rule).
- No credential claims, no named individuals. No em-dashes.
- Body is raw HTML (loader does no markdown conversion): write tags directly.

## Stage 2 TODO

- Re-verify the BADR 18% (2026/27) rate, the 14%/10% history and the £1m per-person lifetime limit at the BADR gov.uk page before restating (HP 14).
- Re-verify the 18%/24% CGT split and the £3,000 AEA at the CGT rates page (HP 15).
- Sanity-check the illustrative BADR-timing table arithmetic end to end.

## FLAGGED open items

- No figure gaps: all figures map to HP 14/15/8/7/1. Valuation/price is deliberately excluded (routes to the goodwill blog, method-level). Confirm at build time whether a BADR/CGT estimator exists in CALCULATORS.md to embed; if not, no tool embed.
