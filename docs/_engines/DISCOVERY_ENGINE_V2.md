# Discovery Engine v2 — Reusable Engine

**Type:** Site-agnostic engine doc. Reuse for any niche site with a `sites/<site>.discovery.json` config. Property is the only site wired up as of 2026-08-15 (`optimisation_engine/discovery/lane_map.py` and `optimisation_engine/discovery/competitor_watch.py` both hardcode a property fallback for the blog content dir when a site's config is missing it).

**Companion:** Per-site facts (competitor lists, lane taxonomy, universe history, latest report dates) live in `docs/<site>/STATE.md` and the dated reports each module writes to `docs/<site>/`. This file is the HOW; it holds no site-specific numbers.

---

## 1. Purpose

Discovery v1 was a set of one-off scripts (sitemap sweeps, ad hoc DataForSEO pulls) with no shared scoring, no lane taxonomy, and no continuous competitor watch — gap discovery only happened when someone remembered to run it before a wave. Discovery v2 replaces that with:

- one **unified candidate pool** merging six ingest sources into a single scored, deduplicated table (`candidate_pool.py`),
- a **specialism lane taxonomy** that classifies both our coverage and competitors' coverage into the same buckets, so gaps and competitor ownership are directly comparable (`lane_map.py`),
- a **continuous competitor monitor** that diffs competitor sitemaps weekly and classifies new URLs as either a lane we already defend or a genuine net-new candidate (`competitor_watch.py`),
- a **dual-source SERP layer** (DataForSEO + DuckDuckGo) with an instant rollback switch, used by all of the above (`serp_provider.py`),
- a **hard budget ceiling** shared with every other DataForSEO caller in the estate, so discovery work cannot blow the daily spend on its own.

Everything here is free-first: every module runs a useful dry-run pass with zero DataForSEO spend, and paid enrichment is opt-in per run (`--spend`) rather than default.

---

## 2. Architecture

```
SIX INGEST SOURCES  ->  candidate_pool.py (merge/score)  ->  discovery_candidates
        |                        |
        |                   lane_map.py (lane taxonomy)
        |                        |
COMPETITOR SITEMAPS  ->  competitor_watch.py (weekly diff)  ->  competitor_urls_seen + discovery_log
                                 |
                    scripts/competitor_watch_email.py (dedup digest)
```

### 2.1 SERP layer: `optimisation_engine/clients/serp_provider.py`

Every SERP call discovery v2 makes (winnability checks, universe probing, competitor-URL SERP-entry checks) goes through `fetch_serp(query, *, site_key, num=10, mode=None)`, not DuckDuckGo or DataForSEO directly. Three modes, controlled by env var `SERP_PROVIDER_MODE` (default `dual`):

- **`dual`** — calls both. DataForSEO is authoritative for `organic`/`paa`/`features`; DuckDuckGo results are folded in as `ddg_organic` for corroboration only. If the DFS call fails for any reason, the function silently falls back to DDG-only and reports `provider_used="ddg_fallback"` — a paid-provider outage never breaks a caller that only needed organic URLs. If DDG fails, it's ignored (`provider_used` stays `"dual"`).
- **`ddg_only`** — DDG passthrough only, no DFS call, no cost. This was the whole system's behaviour before v2 and is the instant rollback: set `SERP_PROVIDER_MODE=ddg_only` and every discovery module reverts to free-only SERP checks with no code change.
- **`dfs_only`** — DataForSEO only; raises on failure instead of falling back (if you asked for paid data you want to know it broke).

Result shape is always `{organic, paa, features, ddg_organic, divergence, provider_used}`. `organic` uses the same 5-key shape (`position, title, link, snippet, domain`) regardless of provider, so callers are drop-in compatible. `divergence` is `1 - |domain intersection| / min(|A|,|B|)` over top-10 domain sets (a simple overlap ratio, not Jaccard — documented in the module because more than one definition is reasonable); it's `None` whenever only one provider actually ran.

### 2.2 Candidate pool: `optimisation_engine/discovery/candidate_pool.py`

Six ingest sources, cheapest-first (`INGEST_ORDER`):

| # | Source | Cost | What it reads |
|---|---|---|---|
| 1 | `sitemap` | free | `briefs/<site>/_competitor_urls.json` (Track A sitemap scrape); slug floor-filtered to >=3 tokens |
| 2 | `dfs_ranked` | paid (`--spend`) / free read | `DataForSEOClient.ranked_keywords` per competitor domain; dry-run reads persisted `dataforseo_competitor_data` rows instead |
| 3 | `dfs_intersection` | paid only | `DataForSEOClient.domain_intersection(own, competitor)`; **0 results in dry-run** — the persisted table has no endpoint column to distinguish these rows from `dfs_ranked`, so this source only ever has data after a `--spend` run |
| 4 | `gsc` | free | `query_triage.triage()` WRONG_PAGE + UNSERVED classes, with a 60-day maturation window on the serving page (best-effort — only checked when the page's slug matches a local `.md` file) |
| 5 | `autocomplete` | free | `seo-research/autocomplete-candidates.csv` if present for the site; skipped silently otherwise |
| 6 | `bing_kw` | free | `bing_query_client.get_related_keywords()`, seeded with the site's top ~10 GSC head queries |

All six merge into one row per normalised candidate text (casefold + strip + collapse whitespace). The primary `source` is whichever ingest step found it first in the order above; every contributing source is tracked in `raw['sources']`, and a later source's real value fills a still-`None` field (never overwrites a populated one).

**Topical lane gate.** If the site's `discovery.json` has a `lanes` key, every candidate is run through `assign_lane()`. Candidates from `bing_kw`/`autocomplete`/`dfs_ranked`/`dfs_intersection` that match no lane token are dropped (raw third-party keyword noise like "companies house" or "hmrc login" would otherwise dominate the score ranking on volume alone). `gsc` and `sitemap` candidates are exempt (`UNGATED_SOURCES`) — they're already ours or already content-filtered — but still get a lane assigned when one matches.

**Scoring.**

```
score = demand x winnability x novelty x intent_weight
```

- `demand` — known search volume, else GSC impressions for GSC-sourced rows with no volume, else a conservative default (`DEFAULT_DEMAND = 10`).
- `winnability` — 1.0 (winnable-likely) or 0.5 (review), from a DDG-only SERP check (dry-run forces `SERP_PROVIDER_MODE=ddg_only` for the duration of the check) reusing `serp_verify`'s verdict function, applied to the top `SERP_VERIFY_TOPN=40` candidates by a provisional score computed with a neutral placeholder. Everyone outside that top-40 keeps `NEUTRAL_WINNABILITY = 0.75`. `--spend` switches the check to `serp_provider`'s default dual mode instead of forcing DDG-only.
- `novelty` — `1 - max Jaccard overlap` against the site's own inventory (live blog slugs, `blog_topics`, pillar pages, uncommitted wave drafts — reused verbatim from `batch_builder`'s loaders). Pillar overlap >= `PILLAR_REJECT_THRESHOLD` (0.30, same constant `batch_builder` uses) is a hard reject, not a low score.
- `intent_weight` — 1.0 informational / 1.3 commercial / 1.5 transactional, from a keyword-hint heuristic only (no LLM): transactional hints = accountant/services/hire/fees/cost/near me/calculator; commercial hints = vs/best/top/review/company/incorporat.

KD enrichment (`bulk_keyword_difficulty`) only runs for survivors still missing KD, and only under `--spend`.

**Output:** `docs/<site_key>/candidate_pool_<date>.md` — top 150 by score, per-source raw counts, every cap/drop applied (nothing is silently capped), pillar-rejected list. `--commit` upserts into Supabase `discovery_candidates` (`UNIQUE(site_key, candidate)`, merge-on-conflict); if the table doesn't exist it prints a migration hint and returns without raising — dry-run never touches the table at all.

CLI:
```
python -m optimisation_engine.discovery.candidate_pool property
python -m optimisation_engine.discovery.candidate_pool property --spend
python -m optimisation_engine.discovery.candidate_pool property --commit
python -m optimisation_engine.discovery.candidate_pool property --skip-paid --limit-competitors 5
```
`--skip-paid` force-skips paid calls even if `--spend` is also set. `--limit-competitors N` caps the competitor list used across the sitemap/DFS sources (also restricts the sitemap ingest to just those N domains).

### 2.3 Lane map: `optimisation_engine/discovery/lane_map.py`

Cross-references three inputs against the site's lane taxonomy (`sites/<site>.discovery.json["lanes"]`):

1. `briefs/<site>/_competitor_urls.json` — per-competitor sitemap slugs.
2. `dataforseo_competitor_data` — ranked keywords per competitor domain, if any rows exist for a domain other than our own (own-domain rows in that table are our own rankings, not competitor data).
3. Our own blog directory slugs.

`assign_lane(text_or_slug, lanes, negative_tokens)` is the shared lane-assignment primitive both this module and `candidate_pool.py` use: normalise to hyphens, pad both the text and each lane token with hyphens, first lane (in list order) whose token appears as a hyphen-bounded substring wins. Negative tokens veto before any lane match (listing/navigational phrases like "for sale" or "login" share single words with real lane tokens like "commercial" or "scotland" and would otherwise false-match). This is the same marker-substring approach `assign_cluster()` in `scripts/property_sitemap_sweep_v2.py` uses, reimplemented here because that function is hardcoded to its own `CLUSTERS` constant rather than parameterised by an arbitrary lane list.

Findings, per lane (only lanes with >= `MIN_LANE_URLS = 3` summed sitemap URLs are scored, to avoid one stray URL reading as a "40% share"):

- **Lanes they own** — one competitor holds > `DOMINANT_SHARE = 0.40` share of that lane's sitemap URLs.
- **Lanes ownable** — real volume in the lane but no competitor dominant.
- **Holes we plug** — our page count is bottom-quartile relative to competitor max, among lanes where at least one competitor has real coverage.

Output: `docs/<site_key>/lane_map_<date>.md` (competitor x lane matrix + the three finding lists). `--apply` also writes the `lane` column onto every `discovery_candidates` row for the site (skips cleanly with a message if that table doesn't exist yet).

CLI:
```
python -m optimisation_engine.discovery.lane_map property
python -m optimisation_engine.discovery.lane_map property --apply
```

### 2.4 Continuous monitor: `optimisation_engine/discovery/competitor_watch.py`

Weekly (or on-demand) diff of each configured competitor's sitemap against `competitor_urls_seen`. **Dry-run by default** — prints/writes the report only; `--commit` is required to actually write to Supabase.

**Fetch mechanics.** Sitemap fetch (robots.txt + index recursion, UA) is reused verbatim from `scripts/topic_gap_finder.py`'s `fetch_sitemap_for_domain` — it fetches live every call, unlike the wave-sweep script's on-disk `briefs/<site>/_sitemap_cache_v2/`. If the sitemap is unreachable or empty, the module falls back to probing `/feed`, `/rss`, `/atom.xml` and any `<link type="application/rss+xml">` tag on the homepage; if none of those work either the domain is logged as **unmonitorable** (no sitemap, robots-blocked, no RSS/Atom feed) and skipped, not treated as an error.

**Enrichment per new URL:** slug tokenisation, `mapped_query` (slug with hyphens replaced by spaces), `our_coverage` (max Jaccard vs. our own live blog inventory), `lane` (via `sweep_v2.assign_cluster`, pointed at this site's `topic_buckets` for the call — a module-level global, reset per `run()` call, safe only because runs are sequential, not threaded), and `score = novelty x velocity_factor` where `novelty = 1 - our_coverage` and `velocity_factor = 1 + min(same domain+lane URLs in the trailing 28 days, 5) / 5`. Title is fetched (one HTTP call per URL) capped at `ENRICH_CAP = 30` per run. `--serp-check` additionally SERP-verifies the top-3 scorers only (bounded, paid-adjacent).

**Classification.** `our_coverage >= DEFEND_THRESHOLD (0.30)` → `defend_lane` (a competitor published into a lane we already cover — read this as "watch, maybe reinforce"); below that → `netnew_candidate` (a gap). Both are logged as typed rows in `discovery_log`.

**Own-estate exclusion.** Every domain the estate itself owns (`ESTATE_SITE_URL` from `bing_query_client`) is hard-excluded from the monitored set even if it's listed in `competitors` or `competitors_auto` — sibling sites must never watch each other as competitors. Excluded domains are reported, not silently dropped.

**Dynamic universe probe (`--probe-universe`, auto-on with `--commit`).** Before deciding who to monitor, SERPs the site's top `UNIVERSE_PROBE_QUERY_N = 10` GSC head queries via `serp_provider` and looks for domains that appear in >= `UNIVERSE_PROBE_THRESHOLD = 3` of them but aren't already in the known universe (configured `competitors` + `competitors_auto` + `derive_competitor_universe.EXCLUDE_DOMAINS` + estate siblings + own domain). Qualifying domains are appended to `competitors_auto` in the site's `discovery.json` (each entry: `domain`, `first_detected`, `queries_seen`) and logged as `new_competitor`-typed `netnew_candidate` events — auto-add is reversible and every addition is surfaced in the report and the email digest, never silent. The monitored universe on every run is always static `competitors` + `competitors_auto` combined; auto-added domains are watched identically to hand-picked ones from the next run onward.

Output: `docs/<site_key>/competitor_watch_<date>.md` — defend/net-new grouped by domain then lane, unmonitorable list, universe-probe changes.

CLI:
```
python -m optimisation_engine.discovery.competitor_watch property
python -m optimisation_engine.discovery.competitor_watch property --commit
python -m optimisation_engine.discovery.competitor_watch property --commit --serp-check
python -m optimisation_engine.discovery.competitor_watch property --probe-universe
```

### 2.5 Weekly wiring: `optimisation_engine/weekly_run.py` Step 1.6

`step_competitor_watch()` runs after Step 1.5 (GA4) and before Step 2 (DataForSEO). It is free (sitemap/RSS fetches only; `serp_check` is not passed on this path, so no paid SERP calls happen from the cron). Per-site resilient: a site with no `discovery.json` or no `competitors` configured is skipped; a fetch/DB error (including migration `20260815000001` not yet applied) is logged and never breaks the rest of the weekly run. `--skip-competitor-watch` disables the step entirely.

### 2.6 Digest email: `scripts/competitor_watch_email.py`

Same dedup doctrine as `state_check_email.py` ([[caretaker_observability_program]]): a monitor that emails the same finding every day trains its one reader to ignore it. Emails only when the stable key (sha256 of this week's `discovery_log` site/kind/url fingerprints, order-independent) differs from the last-emailed key, or the last email was more than `REMIND_DAYS = 7` days ago (a standing finding-set still gets one weekly nudge). State lives in `out/last_emailed_competitor_watch.json`. Digest body: defend items first, then net-new, grouped by site/competitor/lane, plus today's DataForSEO spend from `api_cost_log`, plus a called-out section for any auto-detected new competitor domains. Missing `RESEND_API_KEY`/`TRIPWIRE_NOTIFY_TO`/`RESEND_FROM_EMAIL` is logged loudly and the script exits 0 — it must never fail the caller.

---

## 3. Dual-source divergence

`serp_provider.fetch_serp()`'s `divergence` field exists because DataForSEO and DuckDuckGo do not always agree on a SERP — different crawl freshness, personalisation-free vs. not, different result-set sizes. A high divergence on a query that matters (e.g. a winnability check that will decide whether a page gets built) is a signal to look at the raw `organic` and `ddg_organic` lists side by side before trusting either, not just a QA metric. It's computed only when both providers actually returned results in `dual` mode; every other mode leaves it `None` rather than fabricating a comparison with nothing on the other side.

---

## 4. Budget model

DataForSEO spend across the whole estate (not just discovery) is gated by `optimisation_engine/cost_tracker.py`'s `CostTracker.guard()`, which every paid caller must go through:

- `DATAFORSEO_ABORT_AT` (env-overridable, default **$5.00/day**) — before any paid call, `guard()` sums today's `pending` + `success` rows in `api_cost_log` for `api_provider='dataforseo'` and raises `BudgetExceeded` if the running total plus this call's estimated cost would exceed it. Pending rows count toward the total at their estimated cost (errs safe).
- Idempotency: a stable key derived from `(provider, endpoint, site_key, payload, today's date)` blocks accidental double-billing for the identical call on the same day (a failed row is retryable — its id gets reused rather than inserting a duplicate).
- `BudgetExceeded`/`IdempotencyHit` are caught per-competitor/per-source inside `candidate_pool.py`'s ingest functions (never fatal to the whole run) and printed as a per-source stat/cap.

**Cost of a full `--spend` property run:** roughly **$2.30** for the property universe (16 competitors) — `dfs_ranked` + `dfs_intersection` per competitor, plus `bulk_keyword_difficulty` for KD-missing survivors, plus dual-mode SERP verification for the top-40 winnability checks. Well inside the $5/day ceiling with room for other DataForSEO work the same day. A dry-run pass (no `--spend`) costs nothing.

---

## 5. LLM triage: subscription-only file handshake

`scripts/property_wave_cannibalisation_check.py --llm-triage` adds a reasoning pass for Jaccard-borderline candidate/existing-page pairs (band 0.30-0.55, plus net-new pairs that still share at least one token with their closest existing page), without spending API credits — the estate's Claude access is subscription-only ([[claude_watermark_2026_08]], and the caretaker doc's secrets list notes `CLAUDE_CODE_OAUTH_TOKEN` specifically because "the Anthropic key is subscription-only, no API credits"). The handshake:

1. First run with `--llm-triage`: writes `_llm_triage_pending.json` next to `picks.yaml` (pairs needing a verdict + the triage instructions), falls back to pure-Jaccard classification for this run's report, and prints a message telling the operator to spawn a subagent.
2. A Claude Code subagent reads the pending pack, judges search-intent overlap per pair (`covered` / `partial` / `netnew` + a one-line reason), and writes `_llm_triage_verdicts.json` in the same directory, keyed by `pick_id`.
3. Re-running with `--llm-triage` finds the verdicts file fresh (postdates the pending pack, or its pick_id set matches the pending pack's pairs exactly — covers a re-run with no changes) and applies it: verdicts override the Jaccard band in the summary counts, with an audit-trail section listing every override plus the Jaccard band it replaced.

Malformed verdicts (bad JSON, missing pick_id, unrecognised verdict string) never raise — they're recorded as warnings and that pick falls back to its Jaccard classification. **Memory rule: this pattern (pending pack -> subagent -> verdicts file, never a direct API call) is the template for any future reasoning-triage step that needs LLM judgment without spending API credits.**

---

## 6. Database tables (migration `20260815000001_discovery_engine_v2.sql`)

- **`discovery_candidates`** — one row per candidate per site. `UNIQUE(site_key, candidate)`, so `--commit` re-runs are idempotent merges, not duplicate inserts. Columns: `source` (CHECK-constrained to the six ingest sources plus a reserved `bing`), `volume`/`kd`/`cpc`/`intent`/`winnability`/`novelty`/`score`/`lane`, `status` (`candidate`/`shortlisted`/`picked`/`rejected`/`covered`), `raw` JSONB (full source payload, for re-analysis without re-fetching). Indexed on `(site_key, score DESC)` and `(site_key, lane)`.
- **`competitor_urls_seen`** — first-seen inventory per competitor URL, `UNIQUE(site_key, url)` so weekly monitor re-runs are no-ops for URLs already seen. `first_seen` is the publish-date proxy that drives lane-velocity. Includes a `brand_category` CHECK column (`accountant`/`software`/`media`/`adjacent`) for future brand-breadth analysis ([[feedback_brand_breadth_lens]]), not yet populated by `competitor_watch.py`.
- **`discovery_log`** — typed events, `kind` CHECK-constrained to `netnew_candidate` / `defend_lane` / `serp_entry` (the third is reserved for a future AI-answer/SERP-entry watcher, not emitted by anything yet). `week` anchors the weekly digest query. No unique constraint — every run appends.
- **`competitor_serps`** gains two new columns (`paa` JSONB, `serp_features` JSONB) so DataForSEO's People-Also-Ask and non-organic SERP-feature data, previously discarded (only `organic` was ever parsed), land somewhere queryable.

No RLS policies — backend-only tables written via the service-role key, same posture as the rest of `optimisation_engine`'s tables.

---

## 7. Known limits

- **Bing `GetKeywordIdeas` is flaky.** Unlike `GetKeywordStats`/`GetRelatedKeywords`, it isn't confirmed present in the current BWT JSON API surface — may 404, may be slow. `bing_query_client.get_keyword_ideas()` wraps it in a 30s timeout and swallows every exception, returning `[]` and logging a warning. Treat it as always-best-effort; nothing downstream depends on it succeeding (`candidate_pool`'s `bing_kw` source uses `get_related_keywords`, not this one).
- **`dfs_intersection` is always 0 rows in dry-run.** The persisted `dataforseo_competitor_data` table has no column distinguishing intersection-sourced rows from `ranked_keywords`-sourced rows, so the dry-run read path (which already covers `dfs_ranked`) can't isolate intersection data. Real `dfs_intersection` candidates only appear after a `--spend` run.
- **Lane taxonomy precision is heuristic, not exhaustive.** `assign_lane`'s hyphen-bounded substring match plus negative-token veto handles the known false-positive traps (short tokens like "vat" false-matching inside "private"; navigational phrases sharing words with real lane tokens) but is not guaranteed complete — new competitor vocabulary can still land in the wrong lane or `unassigned` until someone extends the token list.
- **`GetQueryStats` top-N trap is untouched by v2.** [[bing_query_stats_topn_trap]] still applies estate-wide: only `GetRankAndTrafficStats` gives true site totals from Bing; `GetQueryStats`/`GetPageQueryStats` are top-N only. Discovery v2's `bing_kw` ingest uses `GetRelatedKeywords` (a different, non-top-N-limited endpoint), so this specific pipeline isn't affected, but any future discovery module that reaches for `GetQueryStats` for demand data needs to know the same trap applies.
- **Property is the only site with `lanes`/`topic_buckets` configured.** Every other site's `candidate_pool.py`/`lane_map.py`/`competitor_watch.py` run either skips the lane gate (`"lane gate: skipped, no 'lanes' key..."`) or falls back to the property blog-dir hardcode in `lane_map._blog_dir()` — a real bug if run against a non-property site without first adding its own `sites/<site>.discovery.json` lanes.
