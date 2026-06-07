# Continuous, Non-Circular Opportunity Discovery — Plan

**Date:** 2026-06-04 · **Site:** property (template for all sites) · **Status:** draft for approval

## The trap we found (and must not repeat)

Our competitor/topic discovery had three compounding blind spots:

1. **Self-seeded / circular.** The competitor universe was built by SERPing our *own* GSC queries (83 of them). That only finds competitors who rank for queries we already appear on. Topics where we have zero footprint were invisible to both the GSC check *and* competitor discovery.
2. **Single search engine.** We used Google/GSC only. Bing surfaces a near-disjoint demand set — on 2026-06-04, of 1,371 Bing queries only **53 overlapped GSC**; **1,318 were Bing-only**. We were ignoring ~40% of our own demand signal.
3. **One-off, not continuous.** Discovery was a manual session run against a frozen 83-query / 55-domain slice. As we rank for new queries every week, the competitor set silently goes stale.

A fourth, separate lesson (see `feedback_gsc_freshness_gap_diagnosis`): never call a topic a gap from stale or immature ranking data — check the full live route inventory and when each page shipped first.

## The standing process

### Seed sources (two, deliberately complementary)
- **A. Demand-side, refreshed (circular-but-broad):** union of refreshed **GSC + Bing** distinct queries. Proven-relevant; Bing roughly doubles it.
- **B. Supply-side, non-circular:** a first-principles **property-tax topic taxonomy** (`_taxonomy.py`) — the full map of what a complete property-tax site *should* cover, independent of our footprint. Refreshed when tax law changes (Budgets/Finance Acts).

### Pipeline (each stage read-only against shared data; additive outputs only)
1. **Refresh** GSC (`gsc_query_client property --days 90`) + Bing (`bing_query_client property` — see bug note) → canonical tables.
2. **Discover** — SERP the GSC∪Bing union via the DDG client (`harvest_serp.py`, resumable per-query cache) → competitor domains, ranked by query-frequency. Diff against the known universe → **net-new competitors**.
3. **Mine breadth** — crawl the **full sitemap** of every genuine competitor (not just the query-overlap page). A competitor we share one query with still has a 15k-page sitemap full of topics we lack. (`property_sitemap_sweep_v2.py` pattern, new cache.)
4. **Triage** — strict property-relevance gate → content-grep dedup vs the **full live inventory** (686 blog + 9 hubs + 5 location pages + service pages, by search *intent* not tokens) → Opus adjudication (no DeepSeek) for genuine vs already-covered/off-mission/ephemeral.
5. **Register** — write the deduped opportunity list to a dated audit folder. **Never auto-merge into the canonical pool** (`topic_gaps_final.md`) without manager review.

### Two lenses — DO NOT narrow to technical gaps
Run the adjudication through **both**:
- **Brand-breadth (primary):** classify competitor content by category — customer/commercial (cost, choosing, switching), human/relatable (mistakes, myths, tips, stories), general-accounting (bookkeeping, software, records), authority/commentary (Budget explainers), getting-started, tools/templates. Compare category coverage to ours; seed where we're thin. (A property-tax site can be saturated on technical reliefs yet thin across the whole customer journey — that was the 2026-06-04 finding: technical 511 pages vs customer/commercial 22, human 7.)
- **Technical (secondary):** specific reliefs/rules we don't cover. On a deep corpus this yields little; do not mistake it for the whole opportunity.
Priority = commercial-intent × volume × brand-fit, not slug novelty.

### Cadence & ownership
- **Weekly:** GSC + Bing refresh (cheap; already the optimisation-engine cadence).
- **Monthly:** full discovery sweep (steps 2–5) — universe auto-grows from the week's new queries.
- **Quarterly / on Budget:** taxonomy (source B) review for new statutes, reliefs, thresholds.
- **Guardrail:** discovery surfaces candidates; a human approves before any writing. Optimisation of existing under-ranking pages (Track-2 / CTR) is a *separate* lever and usually higher-ROI on a deep corpus.

## Known bug to fix for the continuous process (BLOCKING for Bing)

`optimisation_engine/clients/bing_query_client.py` `fetch_and_store` builds a multi-row `INSERT ... ON CONFLICT` but the Bing API returns **duplicate (page, query) pairs** in one batch → Postgres error 21000 → **every chunk fails, 0 rows written** (silently, for *all* sites). Today's property Bing data was re-ingested via a deduped PostgREST upsert as a workaround. Permanent fix (one-line-ish, benefits every site): **dedupe records by (site_key, page_url, query, date) before upsert** (keep max impressions). Also harden `_esc` for backslashes. Recommend implementing as an explicit, reviewed change to the shared client.

## What this run (2026-06-04) is producing
- Refreshed GSC (→2026-06-04) + Bing (→2026-06-04, 1,371 distinct).
- Harvest seed: **3,183 queries** (1,318 Bing-only).
- Background harvest of all 3,183 → net-new competitor universe → (next) full-sitemap mine → opportunity register.
