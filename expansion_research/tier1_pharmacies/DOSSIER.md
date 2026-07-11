# R3 deep-research dossier — Pharmacies (Tier-1 site)

Date: 2026-07-11. Branch: expansion/phase-0. Read-first inputs honoured:
`R2_NICHE_SCORES_FINAL.md` (pharmacies row + FINAL caveat: **pharmacy BUSINESS owners + NHS
contract accounting; locum pharmacists are content only**) and the medical-site adjacency
guard. Initial R3 run was ZERO-DataForSEO (daily guard exhausted; NOT raised); the deferred
paid enrichment batch ran same day, 2026-07-11 late evening — see "Paid pulls — DONE" below.

## Index

| File | Contents |
|---|---|
| [COMPETITORS.md](COMPETITORS.md) + [competitors.json](competitors.json) | 43 verified rivals (7 DEDICATED + 33 SECTION + 3 ADJACENT_BROKER), evidence quotes, drop log |
| [TOPICS.md](TOPICS.md) + [topic_pool.json](topic_pool.json) / [topic_pool_final.json](topic_pool_final.json) | 2,114 raw → 2,003 post-estate-dedup → 1,824 judged keywords → 1,227 page-level clusters; 79 keywords volume/KD-enriched, 37 clusters with measured volume |
| [LAUNCH_CORE.md](LAUNCH_CORE.md) | owner/locum intent split, /for/* architecture, 26 pages + 3 tools + 1 asset |
| [CALCULATORS.md](CALCULATORS.md) | 7 candidates, 3 launch-tier (purchase affordability, FP34 cash-flow, locum take-home) |
| [DATA_ASSET.md](DATA_ASSET.md) | UK Community Pharmacy Openings & Closures Index (NHSBSA contractor data + CH SIC 47730) — sources fetched live |
| [HOUSE_POSITIONS_OUTLINE.md](HOUSE_POSITIONS_OUTLINE.md) | 27 positions, 31/31 citations fetched live (`raw/citation_checks.json`) |
| [r3_call_plan.md](r3_call_plan.md) | Paid-call plan + actuals ($0.3169 DataForSEO enrichment batch; ~$0.035 Serper) |
| s1-s7 scripts + raw/ | Re-runnable pipeline (adapted from tier1_hospitality) + all raw evidence |

## Summary

- **Field verdict: shallow-to-moderate specialist field, beatable.** Only 7 dedicated
  pharmacy-accountancy brands verified live, several of them tiny (a 2-page brochure site, an
  8-URL site, a microsite); one programmatic-SEO play (Stetson, ~2,000 location pages). The
  real head-term fight is 33 SECTION firms — mostly generic healthcare pages incl.
  heavyweights (Hazlewoods, Hawsons, Larking Gowen, Lovewell Blake, Xeinadin). Pharmacy-
  specific depth (FP34, Category M, retail-scheme VAT) is the wedge no SECTION page has.
- **Demand shape (R2D 2026-07 + paid enrichment 2026-07-11)**: owner head cluster ~600/mo
  ("pharmacy/pharmacist accountant" 210+210 CPC ~£11.50, "accountants for
  pharmacies/pharmacists" 90+90). Buying/selling heads now MEASURED: "buying a pharmacy"
  140/mo (CPC £1.69, KD 59), "buying a pharmacy uk" 70/mo (KD 0), "selling a pharmacy" 30/mo
  (CPC £9.32, KD 7), "pharmacy valuation" 10-20/mo (CPC £7.90-15.33), "pharmacy goodwill" no
  measured volume; "pharmacy for sale" 2,400/mo is broker-listing intent (supporting angle
  only). NHS economics: "fp34" 140/mo KD 0, "drug tariff" 14,800/mo KD 37 (look-up intent);
  "category m clawback", "pharmacy first payment" and both VAT question heads ("do pharmacies
  pay vat", "are pharmacies vat exempt") below the Ads reporting floor — GEO/answer-box value,
  not tracked volume. Locum: "accountants for locum pharmacists" 30/mo (CPC £7.79, KD 5),
  "locum pharmacist tax ..." family 10/mo per variant — content-only stands.
- **lanop.co.uk pharmacy footprint (ranked_keywords, previously bot-blocked)**: effectively
  ZERO. Of its 2,386 ranked keywords, the top 500 by volume contain 0 pharmacy/chemist/locum/
  dispensing terms — it ranks as a generalist small-business firm (gov gateway 550,000, self
  assessment 90,500, IR35 18,100). Not a pharmacy-SERP threat. By contrast
  rxvirtualfinance.co.uk holds positions 7-21 across the whole owner head cluster (12
  pharmacy terms of 88 ranked) and pharmatax.co.uk positions 17-66 (8 of 10 ranked) — the
  dedicated field is exactly as thin as the COMPETITORS.md read said.
- **Sharpest wedges**: pharmacy VAT mix (zero-rated NHS vs standard OTC — autocomplete's
  biggest DIY cluster, house positions A1-A5), NHS payment economics (FP34/Category M/
  clawback — deep unowned topic tail), the purchase/sale event (brokers own listings, nobody
  owns the tax side, no rival calculator), and the Openings & Closures Index — pharmacy is
  the only Tier-1 niche with a public per-business monthly activity dataset (NHSBSA), and
  "pharmacy closures" is a running national news story.
- **Estate adjacency is the main internal risk**: medicalaccounts.co.uk ranks in these SERPs
  and owns generic locum ground; everything locum on this site must be pharmacist-specific
  and page-level deduped (TOPICS.md medical adjacency gate).

## Spend record

| Item | Cost |
|---|---|
| DataForSEO (initial R3 run) | $0 (0 calls — guard honoured) |
| DataForSEO enrichment batch, run 2026-07-11 late evening (guard lifted by owner ruling for interactive runs; DATAFORSEO_ABORT_AT untouched): 8-seed keyword_suggestions + 3-rival ranked_keywords + 11-head search_volume | **$0.3169** |
| Serper 35 queries (gl=gb) | ~$0.035 |
| DDG (35), autocomplete (945), 129 domain fetches, 15 sitemap crawls, 31 citation checks, 3 verification web searches | $0 |

## Open questions (for owner / R4 gate)

1. **Locum lead funnel**: RESOLVED 2026-07-11 — paid pull shows no unexpected locum-hire
   volume ("accountants for locum pharmacists" 30/mo is the whole hire signal; tax family
   10/mo per variant; zero locum terms in any rival's ranked set). Content-only stands.
2. **Programmatic location pages**: Stetson proves the pattern exists in-niche (~2,000
   pages) but it strains the gold-standard A* bar — in or out? (Same question as hospitality
   /savure.)
3. **Index v1 scope**: England-first (NHSBSA) with CH corporate layer; Scotland/Wales v2.
   Confirm before build: dispensing-contractors CSV schema has a stable contractor ID
   (free download, minutes).
4. **Brand shortlist (R4)** not started — next stage per the factory line.

## Paid pulls — DONE (2026-07-11 late evening)

All four TODO items executed same day (manager-direct, owner-authorised; guard lifted by
owner ruling for interactive runs, DATAFORSEO_ABORT_AT untouched). Batch cost **$0.3169**.
Raw evidence: `raw/dfs_keyword_suggestions.json` (82 rows, 8 seeds) + `dfs_suggest_raw.json`,
`raw/dfs_ranked_keywords.json` (598 rows, 3 rivals) + `dfs_ranked_raw.json`,
`raw/dfs_head_volumes.json` (11 launch-core heads) + `dfs_head_volumes_raw.json`.
s5_pool_build.py + s5b_finalise.py rerun: pool 2,114 raw → 2,003 kept → 1,824 final →
1,227 clusters, 79 keywords enriched, 37 clusters with measured volume. Demand-shape bullets
above, per-page volume lines in LAUNCH_CORE.md/CALCULATORS.md and TOPICS.md counts all
updated from this data. Open question 1 (locum funnel) resolved: content-only confirmed.
Remaining follow-up: 3esaccountants.co.uk (the other bot-blocked SECTION rival) was not in
the 3-rival ranked_keywords batch — its footprint rests on SERP hits + the live web-search
verification only; pull it only if it surfaces as a head-term threat at build time. No
Serper spend in the enrichment batch; write-time page-level SERP verify (gap-discovery
rule) stays mandatory and deferred to the build.
