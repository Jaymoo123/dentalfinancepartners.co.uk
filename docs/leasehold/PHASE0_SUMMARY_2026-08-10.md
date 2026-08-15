# Leasehold niche site: Phase 0 summary (2026-08-10)

Site key: `leasehold`. Vertical: leasehold enfranchisement, lease extension, right to manage, ground
rent, service charge disputes, freehold purchase. England and Wales only. Evidence base: leadgen
niche sweep Tier 1 #2 ("lease extension lawyers" 1,000/mo at £9.25 KD 0; "right to manage" 1,000/mo
at £7.55 KD 1; advice sites homehold.org #5 and hoa.org.uk #7 prove the independent-authority slot).
Screener: leasehold-rights run_20260724T145704Z_e4fbff, gates all PASS, score 59.17 (range to 64.17).

## Deliverable index

| # | Deliverable | Path |
|---|---|---|
| 0 | Ground truth (hallucination_zones source) | `docs/leasehold/GROUND_TRUTH_2026-08-10.md` |
| 1 | Regulatory position | `docs/leasehold/REGULATORY_POSITION_2026-08-10.md` |
| 2 | Research export | `optimisation_engine/niche_screener/out/leasehold_research_export/` |
| 3 | Topic pool (130 topics, waves 1 to 4) | `docs/leasehold/TOPIC_POOL_2026-08-10.{json,md}` |
| 3b | Competitor corpus (384 pages, 16 domains) | `docs/leasehold/COMPETITOR_CORPUS_2026-08-10.{md,json}` |
| 4 | Calculator fleet (6 build, 1 defer, 2 fold) | `docs/leasehold/PHASE0_CALCULATORS_2026-08-10.md` |
| 5 | Research data assets (verified live) | this document, below |

## Headline positions

- **Marriage value is NOT abolished.** LAFRA 2024 valuation reforms are uncommenced; the deferment
  and capitalisation rates consultation runs 15 July to 23 September 2026; freeholders' Court of
  Appeal challenge pending. Current law = LRA 1967 / LRHUDA 1993 as they stand. In force: two-year
  rule abolition (31 Jan 2025, SI 2025/57), RTM changes (3 Mar 2025, SI 2025/131), LAFRA building
  safety amendments (Jul and Oct 2024). Full per-provision table in GROUND_TRUTH.
- **Regulatory verdict: unregulated lead generation.** Not FCA/CMC scope (enfranchisement is a
  statutory property right, not a claim in any of the six CMC sectors), LASPO ban is PI-only,
  not estate agency work (introductions are to advisers, not counterparties). Guard rails: no
  compensation-claim touting, no brokering of land interests, no advice claims.

## Research data assets (verified live 2026-08-10)

1. **MHCLG leasehold dwellings estimates.** Collection:
   `https://www.gov.uk/government/collections/leasehold-dwellings` (live; latest release "Leasehold
   dwellings, 2024 to 2025" published 21 May 2026; plus "Leasehold term remaining, 2023 to 2024:
   Factsheet" published 19 June 2026, which directly feeds the 80-year-cliff narrative). Official
   Statistics, EHS x Land Registry matched estimates by type, tenure and region. Asset: "How many
   leasehold homes are below the 80-year cliff" data page with CSV route.
2. **MoJ Tribunal Statistics Quarterly (FTT Property Chamber).** Collection:
   `https://www.gov.uk/government/collections/tribunals-statistics` (live; latest "Tribunals
   statistics quarterly: January to March 2026" published 11 June 2026, Main Tables ODS + CSV zip;
   Property Chamber receipts/disposals sit in the all-tribunals main tables). Asset: leasehold
   dispute volumes tracker (service charge and enfranchisement caseloads over time).
   Verification note: the release page enumerates Main Tables/CSV but not chambers; confirm the
   Property Chamber tab column layout when building the asset (Phase 2), before any figure is quoted.

## Research export note

The export reuses the cached July screener run (run_20260724T145704Z_e4fbff): universe 284 queries
seeded from lease extension, enfranchisement, RTM, ground rent, service charge and freehold purchase
terms (spec `specs/leasehold-rights.json` covers every requested seed family), volumes (160 sampled,
71 nonzero), 50 fetched SERPs, domain classifications, gates, score, domain viability. Files copied
from cache; format matches the divorce-finances and wills_probate reference exports. Topic pool
scoring additionally merged the 389 leasehold rows from `expansion_research/buyer_demand/sweep5.csv`
(DataForSEO, 2026-08-08) which carry the delegation heads (solicitor/lawyer terms) and CPCs the
July universe undersampled.

## Open items for Phase 1+

- Owner decisions: none required at Phase 0 (brand deferred to G1 per playbook; never ask early).
- Re-verification triggers before wave launches: valuation rates consultation outcome (post 23 Sep
  2026), any Commencement No. 4+ regulations, CoA judgment, service charge SIs (late 2026).
- AIO exposure is high in this niche (screener aio_share 0.89): BLUF answer + reason-to-click tool
  embeds are mandatory in every wave brief (playbook AIO countermeasure).
- Scaffold per playbook Phase 1 (template construction-cis/web), site_key `leasehold`, new storage
  prefix, Ashfield entity block verbatim.
