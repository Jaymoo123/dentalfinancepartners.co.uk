---
slug: pharmacy-exit-planning-timeline
tier: blog
route: /blog/selling-a-pharmacy/pharmacy-exit-planning-timeline
category: "Selling a Pharmacy"
intent: EVENT-PROBLEM (assist + capture), seller side. A pharmacy owner planning to sell wants a timeline: what to do and when across the years before exit to maximise value and minimise tax (BADR/CGT timing, clean accounts, margin story). Funnels to /services/pharmacy-sale-cgt-badr and /for/selling-a-pharmacy. Deduped against generalist BADR/earn-out posts.
---
# Pharmacy Exit Planning: A Timeline for Selling

## Target queries (evidence: LAUNCH_CORE.md sell cluster, TOPICS.md, DataForSEO UK 2026-07-11)

- **Primary cluster:** "pharmacy exit planning", "when to sell a pharmacy", "planning to sell a pharmacy", "pharmacy exit strategy" (autocomplete-real, under "selling a pharmacy" 30/mo CPC £9.32 KD 7). EVENT-PROBLEM, high lead value, low competition, high CPC.
- Adjacent seller intent already served: preparing-a-pharmacy-for-sale (readiness), pharmacy-goodwill-what-its-worth (valuation), /services/pharmacy-sale-cgt-badr (the tax service). This post owns the TIMELINE/sequencing.

## Search-intent class + play

EVENT-PROBLEM, seller. The owner knows they will exit in a few years and wants to know what to do now, versus in the final year, versus at completion. Play: BLUF box (start 2-3 years out; the biggest levers are a clean, reconciled margin story, the deal structure, and timing the sale around the BADR rate and your CGT position), then a phased timeline (early / mid / final year / at completion), then the tax-timing lever (BADR at 18% for 2026/27, the £1m lifetime limit, standard CGT beyond it, earn-out/deferred-consideration timing), then the value levers (margin story, VAT mix clean, contract-transfer readiness), then capture. The phased, pharmacy-specific timeline that ties value levers to tax timing is the win.

**Cannibalisation split (locked at seed):** this post owns the TIMELINE/sequencing. The preparing-for-sale blog owns the readiness checklist. The goodwill blog owns valuation. /services/pharmacy-sale-cgt-badr owns the hire intent and the deep tax mechanics. This post references the tax figures but sequences them across time; it does not become a second CGT/BADR explainer.

## Dedup gate (generalist scan, wave-2)

- **generalist/web/content/blog/badr-cash-reserves-company-sale.md** (MATCH): generic BADR + cash-distribution + 12-month pre-sale planning. Do NOT reproduce the generic BADR-planning content.
- **generalist/web/content/blog/earn-out-payments-tax-treatment-selling-limited-company.md** (MATCH): generic earn-out/deferred-consideration tax. Do NOT restate the generic earn-out mechanics.
- Pharmacy-specificity is the wedge: the timeline is anchored on the pharmacy value levers (Category M margin story, FP34/NHS income cleanliness, VAT mix, GPhC/contract-transfer readiness, goodwill) that a generalist BADR/earn-out post does not have. Every phase reads pharmacy-specific. Reference BADR/CGT/earn-out timing at the level needed to sequence them; send the deep mechanics to /services/pharmacy-sale-cgt-badr.

## Required structure (RAW HTML body: no markdown conversion)

H2 skeleton:
1. When to start planning a pharmacy exit (BLUF box, 40-60w: start 2-3 years out; the biggest levers are a clean margin story, the deal structure, and timing the sale around the BADR rate and your CGT position, all of which take time to put in place)
2. The exit timeline, phase by phase (early years / mid / final 12 months / at completion) — a table sequencing value levers and tax actions
3. The tax-timing lever (HP 14 BADR 18% 2026/27, £1m lifetime limit; HP 15 standard CGT 18%/24%, £3,000 AEA) — why timing around the BADR rate step and your CGT band matters; earn-out/deferred consideration changes WHEN tax falls due
4. The value levers, pharmacy-specific (HP 8 Category M margin story, HP 1 VAT mix clean, HP 6/HP 7 NHS income cleanliness, HP 13 goodwill) — what to fix early so the accounts tell the right story
5. Structure and the contract-transfer reality (HP 12 share vs asset, HP 10 contract does not transfer automatically, HP 11 GPhC) — decisions that shape the sale and the buyer's DD
6. What a specialist does across the timeline (capture)

FAQ candidates (no answers at seed):
- How far ahead should I plan a pharmacy sale?
- What is the BADR rate when I sell my pharmacy?
- How do I time a pharmacy sale around Business Asset Disposal Relief?
- What increases a pharmacy's sale value?
- Does an earn-out change when I pay tax?
- Should I sell shares or assets when I exit?

Table/chart opportunities:
- The exit-timeline table: phase (early / mid / final year / completion), value action, tax action, why it matters. This is the sequencing centrepiece and the dedup wedge.
- A tax-timing mini-table: BADR 18% up to £1m lifetime limit (HP 14) vs standard CGT 18% within basic-rate band / 24% above, £3,000 AEA (HP 15) — figures HP/ledger-locked.

Internal links: /services/pharmacy-sale-cgt-badr (capture, deep tax), /for/selling-a-pharmacy (hub), the preparing-a-pharmacy-for-sale blog (readiness), the pharmacy-goodwill-what-its-worth blog (valuation), the share-vs-asset-purchase blog (structure), /services/pharmacy-valuation-goodwill. Do NOT link a non-existent sale-CGT calculator; route tax-number intent to /contact via the service page.

## House positions touched (ONLY figures source; all figures HP/ledger-locked)

- **HP 14 (BADR 18% for 2026/27, £1m lifetime limit per person; rose from 14% in 2025/26):** the central timing lever. Ledger `badr_rate` (18%), `badr_lifetime_limit` (£1,000,000). NEVER quote 10% or 14% as current. Citation: https://www.gov.uk/business-asset-disposal-relief
- **HP 15 (standard CGT beyond BADR: 18% within basic-rate band, 24% above; AEA £3,000 frozen; pharmacy is non-residential):** the CGT-band lever. Ledger `cgt_rate_basic_within_band` (18%), `cgt_rate_above_basic_band` (24%), `cgt_annual_exempt_amount` (£3,000), `basic_rate_band_ceiling` (£37,700). Never a flat 18%. Citation: https://www.gov.uk/capital-gains-tax/rates
- **HP 12 (share vs asset; 0.5% shares vs SDLT non-residential up to 5%):** structure decision affecting the sale. Citations: https://www.gov.uk/tax-buy-shares and https://www.gov.uk/stamp-duty-land-tax/nonresidential-and-mixed-use-rates
- **HP 13 (goodwill dominates pricing; CT relief restricted on company purchase):** the value the buyer is paying for. Citation: https://www.gov.uk/guidance/corporation-tax-relief-on-goodwill-and-relevant-assets
- **HP 8 (Category M margin story), HP 1 (VAT mix), HP 6/HP 7 (NHS income/FP34):** the value levers to fix early. Citations: https://www.nhsbsa.nhs.uk/pharmacies-gp-practices-and-appliance-contractors/drug-tariff , https://www.gov.uk/guidance/health-professionals-pharmaceutical-products-and-vat-notice-70157 , https://www.nhsbsa.nhs.uk/pharmacies-gp-practices-and-appliance-contractors/submitting-prescriptions
- **HP 10 + HP 11 (contract does not transfer automatically; GPhC):** the transfer reality shaping the sale. Citations: https://www.legislation.gov.uk/uksi/2013/349/contents and https://www.pharmacyregulation.org/pharmacies

## Hallucination danger zones (enforce)

- **BADR is 18% for 2026/27 (HP 14). Never quote 10% or 14% as current.** £1m lifetime limit per person.
- Standard CGT is 18% within the remaining basic-rate band and 24% above (HP 15), AEA £3,000; never write a flat 18%.
- NO invented valuation multiple, pence-per-item benchmark or margin percentage (HP 16). Value levers described qualitatively.
- Earn-out/deferred-consideration content is TIMING-of-tax at sequencing level only; do NOT reproduce the generalist earn-out mechanics post. Send deep mechanics to the service page.
- Do not promise a specific tax saving from timing; frame as "timing around the rate step and your band can be material, subject to your facts".
- Contract does not transfer automatically (HP 10). Nothing clinical; no cross-links to estate sites. No credential claims, no named individuals, no pricing. No em-dashes.
- Body is raw HTML: write tags directly.

## Stage 2 TODO

- Re-verify BADR 18%/£1m and CGT 18%/24%/£3,000 at source before restating (rates pages change; HP 14, HP 15).
- **Mandatory page-level dedup** against generalist badr-cash-reserves-company-sale.md and earn-out-payments-tax-treatment-selling-limited-company.md; confirm pharmacy-specific framing throughout and no generic-BADR/earn-out sentence overlap.
- Confirm the timeline does not restate the preparing-for-sale readiness checklist (sibling).

## FLAGGED open items

- Deliberate gaps: no valuation multiple, no margin percentage, no promised tax saving (HP 16; method-level, facts-dependent). Correct handling. Dedup gate is the load-bearing risk, discharged by pharmacy-specific value levers + Stage 2 dedup check.
