# R3 deep-research dossier — Pharmacies (Tier-1 site)

Date: 2026-07-11. Branch: expansion/phase-0. Read-first inputs honoured:
`R2_NICHE_SCORES_FINAL.md` (pharmacies row + FINAL caveat: **pharmacy BUSINESS owners + NHS
contract accounting; locum pharmacists are content only**) and the medical-site adjacency
guard. **HARD CONSTRAINT this run: ZERO DataForSEO calls** (daily guard exhausted; NOT
raised) — all paid enrichment deferred to the TODO section below.

## Index

| File | Contents |
|---|---|
| [COMPETITORS.md](COMPETITORS.md) + [competitors.json](competitors.json) | 43 verified rivals (7 DEDICATED + 33 SECTION + 3 ADJACENT_BROKER), evidence quotes, drop log |
| [TOPICS.md](TOPICS.md) + [topic_pool.json](topic_pool.json) / [topic_pool_final.json](topic_pool_final.json) | 2,058 raw → 1,961 post-estate-dedup → 1,782 judged keywords → 1,214 page-level clusters; no volumes (zero-DFS run) |
| [LAUNCH_CORE.md](LAUNCH_CORE.md) | owner/locum intent split, /for/* architecture, 26 pages + 3 tools + 1 asset |
| [CALCULATORS.md](CALCULATORS.md) | 7 candidates, 3 launch-tier (purchase affordability, FP34 cash-flow, locum take-home) |
| [DATA_ASSET.md](DATA_ASSET.md) | UK Community Pharmacy Openings & Closures Index (NHSBSA contractor data + CH SIC 47730) — sources fetched live |
| [HOUSE_POSITIONS_OUTLINE.md](HOUSE_POSITIONS_OUTLINE.md) | 27 positions, 31/31 citations fetched live (`raw/citation_checks.json`) |
| [r3_call_plan.md](r3_call_plan.md) | Paid-call plan + actuals ($0 DataForSEO; ~$0.035 Serper) |
| s1-s7 scripts + raw/ | Re-runnable pipeline (adapted from tier1_hospitality) + all raw evidence |

## Summary

- **Field verdict: shallow-to-moderate specialist field, beatable.** Only 7 dedicated
  pharmacy-accountancy brands verified live, several of them tiny (a 2-page brochure site, an
  8-URL site, a microsite); one programmatic-SEO play (Stetson, ~2,000 location pages). The
  real head-term fight is 33 SECTION firms — mostly generic healthcare pages incl.
  heavyweights (Hazlewoods, Hawsons, Larking Gowen, Lovewell Blake, Xeinadin). Pharmacy-
  specific depth (FP34, Category M, retail-scheme VAT) is the wedge no SECTION page has.
- **Demand shape (R2D, 2026-07)**: owner head cluster ~600/mo ("pharmacy/pharmacist
  accountant" 210+210 CPC ~£11.50, "accountants for pharmacies/pharmacists" 90+90); locum
  measured tiny (10/mo) but a real autocomplete question cluster. Buying/selling volumes
  unmeasured this run (TODO below); SERP evidence (dedicated rival pages + a broker field)
  says the demand is real.
- **Sharpest wedges**: pharmacy VAT mix (zero-rated NHS vs standard OTC — autocomplete's
  biggest DIY cluster, house positions A1-A5), NHS payment economics (FP34/Category M/
  clawback — deep unowned topic tail), the purchase/sale event (brokers own listings, nobody
  owns the tax side, no rival calculator), and the Openings & Closures Index — pharmacy is
  the only Tier-1 niche with a public per-business monthly activity dataset (NHSBSA), and
  "pharmacy closures" is a running national news story.
- **Estate adjacency is the main internal risk**: medicalaccounts.co.uk ranks in these SERPs
  and owns generic locum ground; everything locum on this site must be pharmacist-specific
  and page-level deduped (TOPICS.md medical adjacency gate).

## Spend record (this run)

| Item | Cost |
|---|---|
| DataForSEO | **$0 (0 calls — guard honoured)** |
| Serper 35 queries (gl=gb) | ~$0.035 |
| DDG (35), autocomplete (945), 129 domain fetches, 15 sitemap crawls, 31 citation checks, 3 verification web searches | $0 |

## Open questions (for owner / R4 gate)

1. **Locum lead funnel**: LAUNCH_CORE ships locum as content-only. Revisit only if the paid
   pull shows unexpected locum-hire volume.
2. **Programmatic location pages**: Stetson proves the pattern exists in-niche (~2,000
   pages) but it strains the gold-standard A* bar — in or out? (Same question as hospitality
   /savure.)
3. **Index v1 scope**: England-first (NHSBSA) with CH corporate layer; Scotland/Wales v2.
   Confirm before build: dispensing-contractors CSV schema has a stable contractor ID
   (free download, minutes).
4. **Brand shortlist (R4)** not started — next stage per the factory line.

## TODO — paid pulls (run when the DataForSEO daily guard resets; do NOT raise the guard)

Adapt `tier1_hospitality/s4b_dataforseo.py` (same task shapes, budget ~$0.20-0.40 total):

1. **keyword_suggestions (Labs, gl=GB)** for 8 seeds: `pharmacy accountant`,
   `accountants for pharmacists`, `buying a pharmacy`, `selling a pharmacy`,
   `pharmacy valuation`, `locum pharmacist tax`, `pharmacy vat`, `pharmacy payroll`.
   → write `raw/dfs_keyword_suggestions.json` (s5 already consumes it — rerun
   `s5_pool_build.py` then `s5b_finalise.py` to enrich volumes/KD).
2. **ranked_keywords (Labs)** for 3 rivals: `rxvirtualfinance.co.uk`, `pharmatax.co.uk`,
   `lanop.co.uk` (bot-blocked to us; this is the only way to see its pharmacy footprint).
   → write `raw/dfs_ranked_keywords.json`, rerun s5/s5b as above.
3. **search_volume** for the launch-core page targets with no measured volume: buying/selling
   heads (`buying a pharmacy uk`, `pharmacy for sale`, `selling a pharmacy`, `pharmacy
   valuation`, `pharmacy goodwill`), NHS economics heads (`fp34`, `drug tariff`, `category m
   clawback`, `pharmacy first payment`), VAT heads (`do pharmacies pay vat`, `are pharmacies
   vat exempt`) — feeds per-page volume lines in LAUNCH_CORE.md and CALCULATORS.md.
4. After enrichment: re-derive TOPICS.md counts (volumes change cluster ordering, not
   membership) and update the demand-shape bullets here.
