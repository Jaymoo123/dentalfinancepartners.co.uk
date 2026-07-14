# Existing-site content-gap enrichment (Thread B)

Companion to the expansion program. Where the expansion factory builds NEW niche sites,
this finds what our EXISTING sites are missing: it ranks each site's `blog_topics` backlog
by real DataForSEO demand, and for a live site with no pool it builds one from the site's own
GSC/Bing queries + DataForSEO expansion. Methodology in
[EXPANSION_HANDOFF_PARITY.md](EXPANSION_HANDOFF_PARITY.md) "Demand-vs-coverage parse".

Executed 2026-07-14 (commit 2aa8794c on `expansion/phase-0`). Spend ~$1.5, DataForSEO
balance ~$45.9 after.

## Two jobs, two tools

**1. Enrich an existing pool in place** — `scripts/enrich_blog_topics.py`
```
python scripts/enrich_blog_topics.py <site_key>            # dry run (free): counts only
DATAFORSEO_ABORT_AT=<usd> python scripts/enrich_blog_topics.py <site_key> --all --apply
```
- SELECTs rows (`--only-null` default, `--all` to redo), pulls google_ads search_volume +
  bulk keyword_difficulty, UPDATEs each row, then re-deciles `priority` 1-10 by volume.
- Guardrails learned the hard way (all fixed in the script):
  - `id` is text → must be quoted in the UPDATE (VALUES bulk update).
  - google_ads/search_volume rejects the WHOLE task on a large/odd batch — **chunk = 200**,
    and SV keywords are punctuation-guarded (`[a-z0-9 '-]`, ≤80 chars, ≤10 words). KD is
    tolerant, gets the full chunk.
  - The paid pull is **cached to disk** (`expansion_research/_enrich_cache_<site>.json`)
    BEFORE any DB write, so a write crash never re-costs the pull.
- Spend routes through `CostTracker.guard()` (per endpoint+site+payload+day idempotency).
  Manager lifts the daily guard via `DATAFORSEO_ABORT_AT`; sub-agents never touch it.

**2. Build a pool for a live site that has none** — `scripts/_trade_pool_pull.py` (manager,
paid) dumps a keyword universe from seed heads → `scripts/_seed_expansion_topics.py` seeds it.
Signal sources for a LIVE site: its own GSC queries (`ingest_gsc_queries.py <site>`) and Bing
queries (`bing_query_client.py <site>`) show real demand it already ranks for; DataForSEO
`keyword_suggestions` expands the universe with volume. A Sonnet worker then collapses
near-dupes, reconciles against the live sitemap, and clusters — see the trade run below.

## Results 2026-07-14

Numbers are measured (DataForSEO volume + counted dupes), not estimated. "Unwritten + demand"
= `used=false AND search_volume>0`.

| site | rows | distinct kw | exact dupe rows | with volume | unwritten + demand | verdict |
|---|---|---|---|---|---|---|
| contractors-ir35 | 644 | 623 | 21 | 377 | **242** | biggest real backlog |
| construction-cis (trade) | 299 | 299 | 0 | 207 | 129 net-new | pool built from scratch |
| agency | 314 | 299 | 15 | **5** | 1 | demand problem, not backlog |
| generalist | 303 | 285 | 18 | 144 | **0** | optimise/rewrite, all written |
| dentists | 139 | 58 | **81** | 22 | 1 | 58% dupes, tiny market |

**contractors-ir35** — 242 unwritten topics with demand. Heads: ir35 rules 3,600 (KD 3),
ir35 meaning 1,900, ir35 check 1,300, umbrella cluster (umbrella company 4,400). Skip
`outside ir35 jobs/roles` (job-board/recruiter intent, same estate rule as recruitment kill).
Caveat: `used` predates enrichment — coverage-verify high-volume "unused" heads before writing.

**generalist** — 100% written, but demand data now shows which live pages chase the big terms
(limited company vs sole trader 6,600, CGT on property 3,600, MTD ITSA 2,900, small business
accountant 2,900). This is a rewrite/optimise prioritisation signal, not a new-content list.

**agency** — only 5 of 314 topics have any UK search volume (top just 50). The pool targets
near-dead terms; corroborates the agency traffic diagnosis (demand, not only crawl/authority).

**dentists** — 58 distinct keywords across 139 rows (81 duplicate rows, 58%). Tiny market
(top: buying a dental practice 210, dental practice accountant 70). Needs a dedup pass before
the pool is trustworthy.

**trade (construction-cis)** — LIVE, previously 0 `blog_topics`. Built from GSC (554 rows) +
Bing (40) + DataForSEO expansion (638-kw universe, $0.20). Sonnet collapsed 337→299 clusters
(38 near-dup merges) and reconciled against the 208-page live sitemap:

| live pages | clusters | covered | net-new | net-new w/ volume | net-new null |
|---|---|---|---|---|---|
| 208 | 299 | 78 | **221** | 129 | 92 |

Net-new by category: CIS Compliance 93, CIS Basics 80, Locations 14, Trade-types 7,
CIS Advanced 7, VAT/MTD 7, CIS Refunds 5, Software/Tools 5, Expenses 3, Limited Company 1.
Top actionable gaps:
- **Location pages absent** getting GSC impressions: Cornwall (37), Cannock (25), Norfolk (13)
  — add /locations pages (config), not just posts. Stoke is in the 25-city set but underranks.
- **Trade-types**: /for/structural-engineers absent (genuine). Roofers page EXISTS but
  underranks (312 impr, pos 16-23) → optimise, don't create. Same plasterers/bricklayers/tilers.
- **Software**: "cis pay & bill software" (agency/umbrella audience) — genuine gap.
- **Compliance**: penalty/appeal long-tail ranks pos 3-9 on Bing — companion posts.
- **Expenses**: DFS pull light (3 clusters) — manual seed needed (van expenses, tools relief).

Covered clusters are seeded `used=true`, so the net-new backlog query stays honest.

## Open (not done)

1. Act on gaps: write contractors-ir35 backlog / add trade Cornwall+Cannock location pages +
   /for/structural-engineers / optimise the underranking roofers etc pages.
2. Dedup dentists pool (58% duplicate rows).
3. `category` is null on the 4 enriched EXISTING sites (only the trade re-seed carries it) —
   cheap SQL backfill, no spend.
4. Re-run cadence: existing pools enriched here are FLOORS; re-enrich after new topics land.
   GSC/Bing for trade is 28 days old (site launched 2026-06-16) — re-pull as it matures.
