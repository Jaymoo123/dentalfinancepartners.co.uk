# Portfolio lead audit — why property wins (2026-07-10)

Evidence: fresh GSC pull 2026-07-10 (`.cache/audit_gsc_fresh_2026-07-10.json`, 6-month monthly series + 90d queries, all 8 sites), Supabase `leads` full ledger, 2026-07-08 estate opportunity readout (GSC+Bing), phase9 DataForSEO niche scores, repo/site inventory.

## Headline numbers

| Site | Live since | Blog pages | Google clicks Jun | 90d impressions | Leads total (Apr–Jul) | Lead/click Apr–Jun |
|---|---|---|---|---|---|---|
| property | 2026-03-29 | 697 | 318 | 7,239+ | **56** | **10.9%** |
| dentists | 2026-03-28 | 209 | 62 | 6,222 | 5 | 5.2% |
| solicitors | ~2026-04 | 190 | 76 | 2,476 | 2 | 1.2% |
| generalist | 2026-05-01 | 378 | 50 | 9,604 | 6 | 7.0% |
| medical | relaunch 05-20 | (flat routing) | 16 | 2,175 | 7 | 4.5% |
| agency | 2026-04-15 | 306 | ~1 | 1,277 | 0 | — |
| contractors-ir35 | NOT DEPLOYED | 50 | 1 | 412 | 0 | — |
| construction-cis | NOT DEPLOYED | 57 | 8 | 841 | 0 | — |

Property leads by month: 2 → 8 → 34 → 12 (July partial). Everything else is flat single digits.

## The controlled experiment the portfolio already ran

Property and dentists launched **one day apart** (03-29 vs 03-28) on the same infrastructure, same content engine, same Supabase backend. Same clock, wildly different outcomes: 5× the clicks, 2× the click→lead conversion, 11× the leads. **Maturity (A) alone cannot explain property's outperformance.** But maturity/technical failure does explain several of the individual laggards (below).

## Factors, tagged A (maturity) vs B (structural)

1. **B — Niche query structure (HIGH confidence, the dominant factor).** Property's traffic is NOT head-term commercial. Its top-25 queries are ~0% "hire an accountant" and ~100% DIY tax questions ("property landlord companies house reform" 724 imp @ pos 6.3, CGT rates, SDLT costs) at **weighted position 6.2 — page 1 within 3 months**. 2.3M UK landlords self-manage their tax and search their own questions; phase9 SERP data shows **0 specialist competitors** in the buy-to-let top-10. Dentists is the mirror image: demand is real but concentrated in head commercial terms ("accountants for dentists" 1,081 imp) sitting at **position 44–62**, owned by decades-old specialist firms (homepage: 4,825 imp / 1 click). A 3-month-old domain cannot win a head-term authority contest; it CAN win an uncontested informational long-tail. Property picked (or lucked into) the only niche where the winnable queries and the lead-producing queries are the same queries.

2. **B — Convertibility of informational traffic (HIGH).** Informational visitors only become leads if something on the page converts them. Property has the machine: 9-tool calculator fleet, Landlord Tax Index research asset, multi-step mini-forms (deployed 07-09), CRO waves off first-party behaviour analytics, lead nurture. Result: **10.9% click→lead**. Solicitors converts **1.2%** despite having position-1 pages ("do uk solicitors charge vat" pos 1, 517 imp) and 76 June clicks. Solicitors/dentists don't primarily have a ranking problem anymore — they have a conversion problem. This is structural-but-fixable: it's property's playbook not applied, not property's niche magic.

3. **A — Content mass (MEDIUM).** 697 property posts vs 190–378 elsewhere. More shots on goal in a long-tail game compounds impressions. This is investment maturity, not calendar maturity — the others are behind because fewer waves were run, not because their clocks run slower.

4. **Neither A nor B — broken clocks (HIGH, for medical + agency specifically).** Medical: 92% of pages never crawled by Google (discovery failure, fix shipped 07-06). Agency: crawl-budget/authority failure (fix deployed 07-08). Their low output to date is diagnostic noise, not niche verdict. Watch windows close ~07-20/08-05.

5. **Neither — two sites are switched off (CERTAIN).** contractors-ir35 and construction-cis were never deployed to production domains. They are not underperformers; they haven't been turned on.

6. **B — Lead value asymmetry (MEDIUM, data-limited).** Property leads scored/valued in `docs/property/LEAD_QUALITY_REPORT_2026-07.md`; no equivalent for others (too few leads to score). IR35 CPC £28 says contractor leads are valuable *if* winnable — but 9/10 top-10 slots are entrenched specialists.

**Overall split: ~60% B (niche query structure + conversion asset gap), ~25% A (content-mass and ranking maturation on younger sites), ~15% technical failures now fixed and in watch windows.**

## Per-site verdicts

- **dentists** — *fixable-on-page + structural ceiling.* Same age as property, so "wait" is disproven. Demand exists but lives in head terms it can't win yet. Do: conversion parity (calculators/multi-step forms for practice valuation, UDA checker traffic it already ranks for at pos 9), corepage + faceless authority for head terms. Expect improvement, not property-scale volume.
- **solicitors** — *fixable-on-page-problem, clearest fix on the estate.* Ranks position 1–2 on real queries, 76 clicks/June, 1.2% conversion, and 45 rewritten pages sitting undeployed. Conversion machinery + deploy the backlog.
- **medical** — *unripe-and-worth-waiting (broken clock, now repaired).* No verdict legitimate before the 07-20/08-03 checkpoints. Bing already responding (276→625 imp).
- **agency** — *unripe-and-worth-waiting (same).* Re-judge after ~08-05. If head terms are still pos 40+ after indexing normalises, it inherits the dentists problem in a smaller niche (150k agencies vs 2.3M landlords) — then it's a cut-losses candidate.
- **generalist** — *unripe + fixable, with a competition caveat.* Youngest live site with the most impressions (9.6k/90d) and zero clicks — deep positions plus zero-click-SERP capture at pos 1–4. Expansion plays identified (construction-software cluster ~1,800 imp). Broadest niche = heaviest competition; watch whether impressions convert to position by September.
- **contractors-ir35** — *not a clock; and the hardest niche on paper.* Deploy is pending by choice. Phase9: 9/10 specialists in top-10, competition 0.60. If deployed, expect the dentists dynamic. Lowest priority.
- **construction-cis** — *unripe-and-promising; deploy it.* "accountant for roofers" 84 imp @ pos 19 on a 3-week-old undeployed site is the best early signal outside property. Trade audience (600k–3.1M) skews DIY-searchable like landlords.

## Niche-selection scorecard (score site 9 before building)

Weighted /100; property scores ~90, contractors-ir35 ~35.

| Variable | Weight | What to measure | Property | Why it matters |
|---|---|---|---|---|
| DIY-searchable pain | 25 | Does the audience search its own tax questions (informational long-tail volume), or delegate to a buyer who searches "accountant for X" once? | Landlords self-serve heavily | This decides whether winnable queries = lead-producing queries |
| Long-tail winnability | 20 | Specialist density in SERPs for 20 sampled long-tail queries (not the head term) | ~0 specialists | A new domain lives or dies here for 12 months |
| Head-term SERP composition | 15 | Specialists in top-10 for "accountant for X"; their domain ages | Weak/absent | Entrenched specialists = multi-year authority war |
| Audience size | 15 | Individuals/businesses in segment | 2.3M | Long-tail volume scales with population |
| Tool-ability | 15 | Can 5+ calculators/checkers be built that answer money questions? | 9 built | Converts informational traffic; property's 10.9% vs solicitors' 1.2% |
| Lead value (CPC proxy) | 10 | Google Ads CPC on head terms | moderate | Only matters after the above; IR35's £28 CPC is worthless at pos 79 |

## Single highest-leverage action

**Run the conversion-parity wave on solicitors and dentists now.** They already have ~140 combined June clicks converting at 1.2–5% vs property's 10.9%. Port the property conversion stack (segment-specific multi-step mini-forms, 2–3 niche calculators each, CRO surface pass) and deploy solicitors' 45 finished rewrites. At property's conversion rate that's roughly 10–15 extra leads/month — it would ~triple non-property lead output, costs no new content, no authority, no waiting, and doesn't touch the medical/agency watch windows.

## Missing data and how it limits conclusions

- **Backlinks/DR (no Ahrefs/SEMrush/Moz here).** Authority gaps are inferred from head-term positions, not measured. If you can export referring-domain counts per site, factor 1's confidence rises and the dentists/agency "authority war" sizing gets concrete. This is the one export worth buying/sending.
- **Keyword volumes are patchy** — DataForSEO returned 0 volume for several head terms in phase9; niche-demand comparisons lean on GSC impressions (real but supply-side-biased).
- **Engagement analytics (GA4)** exist for only 4 sites and first-party behaviour analytics only for property — bounce/dwell comparisons across all 8 aren't possible; the conversion diagnosis instead rests on the harder metric (leads/clicks), which is sufficient.
- **Lead value per lead** is quantified for property only; per-site lead-value weighting in the scorecard uses CPC as proxy.
- **July is 10 days old** — treat July figures as partial everywhere.
