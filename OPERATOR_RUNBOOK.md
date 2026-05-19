# Optimisation Engine — Operator Runbook

Single source of truth for every command in the optimisation pipeline.
Designed for an agent (Claude or otherwise) to read and execute on the
operator's behalf.

**Operator never types these directly. Operator says "run the standup" or "apply
the top 3 opportunities" — the agent reads this runbook and runs the right
command with the right flags.**

All commands assume CWD = repo root (`C:/Users/user/Documents/Accounting`).
All paid-API spend is logged to `api_cost_log` Supabase table.

---

## Daily / start-of-session

### `python -m optimisation_engine.standup`

**Purpose:** "Where do I start today" — single dashboard view.

**Flags:**
- `--site <agency|property|dentists|generalist>` — restrict to one site

**Output sections:**
1. GSC delta (last 7d vs prior 7d) per site
2. Shipped changes maturing — flagged at 7/14/28-day windows
3. Queue summary matrix: site x action_kind x high-confidence count
4. "Tackle first" — top 10 opportunities by score x confidence
5. Red flags — shipped changes trending negative, high-conf opps still queued, opps missing action_plan

**When to run:** Always, at start of session.

**Operator's typical response to output:**
- Section 4 shows what to apply next → walk via `review_and_apply`
- Section 5 red flags → either rollback, or run the suggested follow-up

---

## Ingestion (refresh the data)

### `python -m optimisation_engine.ingestion.ingest_gsc_queries --days 28`

**Purpose:** Pull last 28 days of page+query+date GSC data into `gsc_query_data`.

**Flags:**
- `<site_key>` positional — restrict to one site
- `--days N` — window length (default 28)

**Cost:** Free (GSC API).

**Idempotency:** Re-running same day merges duplicates via UNIQUE constraint.

**Run cadence:** Weekly minimum. Daily when actively shipping changes.

---

### `python -m optimisation_engine.ingestion.ingest_autocomplete --seeds 5`

**Purpose:** Free Google Autocomplete expansion. Persists to `dataforseo_keyword_data` with `endpoint='google_autocomplete'`.

**Flags:**
- `--sites <list>` — defaults to all active sites
- `--seeds N` — number of GSC seeds to expand per site (default 5)

**Cost:** Free.

**Run cadence:** Monthly. Faster if GSC pool changes substantially.

---

### `python -m optimisation_engine.ingestion.ingest_dataforseo --sites <list>`

**Purpose:** Paid keyword/competitor intelligence from DataForSEO Labs.

**Flags:**
- `--sites <list>` — default `agency property dentists`
- `--execute` — actually spend money (default: dry-run)

**Cost:** ~$0.20-0.50 per full run depending on which sites included.

**Run cadence:** Monthly, rotating which site gets the deep pull.

**Pre-flight check:** the dry-run shows estimated cost. Operator must
explicitly say "go" before adding `--execute`.

---

### `python -m optimisation_engine.ingestion.broaden_keyword_pool --execute`

**Purpose:** Add related_keywords + keywords_for_site (competitor keyword
universe) on top of the standard ingest. Used to expand a thin keyword pool.

**Cost:** ~$0.50 per full run.

**Run cadence:** Quarterly. Only when keyword pool feels thin or after adding
a new site.

---

### `python -m optimisation_engine.ingestion.rescore_cross_site_strict --batch-size 30`

**Purpose:** Re-run cross-site relevance v2 on the entire keyword pool.
Replaces any v1 scores. Pre-filters noise via `noise_filter` patterns
before paying DeepSeek.

**Cost:** ~$0.08 DeepSeek for full pool.

**Run cadence:** After any significant keyword ingestion. Quarterly otherwise.

---

### `python -m optimisation_engine.ingestion.score_cross_site_relevance --batch-size 30`

**Purpose:** Score ONLY rows where `cross_site_scored_at IS NULL`. Use after
incremental ingestion when you don't want to re-score existing rows.

**Cost:** ~$0.001 per 30 keywords.

---

## Detection (find opportunities)

### `python -m optimisation_engine.analysis.detectors_v2`

**Purpose:** Run all 5 detectors against fresh GSC + DataForSEO data.
Inserts new rows into `optimisation_opportunities` (status='proposed').

**Detectors:**
1. CTR problems (low CTR + good rank → meta rewrite)
2. Near-miss expansion (pos 8-20 with traffic → expand_page)
3. Content refresh (declining trajectory → refresh)
4. Cannibalisation (multiple pages for same query → intent_realignment)
5. DataForSEO keyword gap (we don't appear for it → new_page)

**Flags:**
- positional list of sites

**Cost:** Free.

**Idempotency:** UNIQUE index on (site_key, opportunity_type, target_url, primary_query) prevents duplicate inserts for non-terminal statuses.

**Run cadence:** After every ingestion refresh.

---

### `python -m optimisation_engine.analysis.cleanup_noisy_opportunities`

**Purpose:** Sweep through `proposed` opportunities; mark any whose `primary_query` matches noise patterns (vehicle tax, brand lookups, US-only, consumer-dental, generic calculators) as rejected.

**Flags:**
- `--dry-run` — show what would be rejected without applying

**Cost:** Free.

**Run cadence:** After any detector run. Idempotent — only touches 'proposed' rows.

---

### `python -m optimisation_engine.analysis.cleanup_via_cross_site`

**Purpose:** Propagate cross-site v2 rejections into the opportunities table. Any opportunity whose `primary_query` was rejected by v2 gets marked `rejected` on the opportunity side too.

**Cost:** Free.

**Run cadence:** After every cross-site rescore.

---

## Reasoning (turn opportunities into action plans)

### `python -m optimisation_engine.ingestion.run_action_specifier --limit 10 --min-score 60`

**Purpose:** For each top-N proposed opportunity, runs Action Specifier (DeepSeek) and persists the patch plan to `optimisation_opportunities.action_kind` + `action_plan`.

**Action kinds output:**
- `meta_only` — frontmatter rewrite
- `in_text_embedding` — weave query into intro
- `new_section` — add new H2 + body
- `faq_addition` — append to YAML faqs
- `new_page` — full new page
- `schema_only` — add JSON-LD
- `internal_links_only` — only suggest inbound links
- `skip` — opportunity not worth pursuing (e.g. page recently shipped)

**Flags:**
- `--site` — restrict
- `--limit N` — how many opportunities to process (default 10)
- `--min-score N` — only opps scoring >= N
- `--dry-run`

**Cost:** ~$0.0015 per opportunity.

**Run cadence:** After detector runs that produce new opportunities.

---

### `python -m optimisation_engine.ingestion.run_internal_link_suggester --since-days 7`

**Purpose:** For each recently shipped change, find sibling pages that
should link to it. Persists suggestions as `optimisation_changes` rows
with `change_type='internal_link'`, `auto_applied=false`.

**Flags:**
- `--site` — restrict
- `--since-days N` — look back window
- `--max-targets N` — per-run cap

**Cost:** ~$0.005 per target page.

**Run cadence:** After every batch of applies.

---

## Application (actually change files)

### `python -m optimisation_engine.apply.review_and_apply`

**Purpose:** Walk through queue interactively. For each opportunity, print
the full ChangeBrief (WHAT / OPPORTUNITY / CHANGE sections), then prompt:
- `a` — apply
- `r` — reject (with reason)
- `s` — skip (leave as proposed)
- `q` — quit

**Flags:**
- `--site <key>` — restrict to one site
- `--kind <action_kind>` — restrict to one kind
- `--min-confidence N` — only show ap_conf >= N
- `--limit N` — how many to walk through (default 50)
- `--auto-apply-high-confidence` — auto-apply meta_only + schema_only at ap_conf >= 85
- `--dry-run` — show briefs but never apply

**Operator workflow:**
1. Run standup to see queue
2. Run this CLI to walk through
3. For each brief, the operator reads it and decides
4. The agent presses the right key based on operator's instructions

---

### Rollback any shipped change

### `python -m optimisation_engine.apply.rollback --recent`

**Purpose:** List recent shipped changes with their commit SHAs and change_ids.

### `python -m optimisation_engine.apply.rollback <change_id> --reason "<reason>"`

**Purpose:** Roll back a specific shipped change.

**Strategy auto-picked:**
- `path_revert` for isolated changes (meta_only, internal_link, schema_only, faq_addition)
- `git_revert` for full-page additions (new_content)

**Result:** Creates a new revert commit; marks `optimisation_changes.rolled_back=true` + records `rollback_reason`.

---

## Validation (when something seems off)

### `python -m optimisation_engine.validation.test_cross_site_relevance`

Runs the 36-case validation suite against `cross_site_relevance_v2`.

### `python -m optimisation_engine.validation.test_semantic_page_match`

Runs the 21-case validation suite against `semantic_page_match`.

### `python -m optimisation_engine.validation.test_action_specifier`

Runs the 14-case validation suite against `action_specifier`. **Note:** uses real opportunities from Supabase, so output varies by current data state.

### `python -m optimisation_engine.validation.test_internal_link_suggester`

Runs the 8-case validation suite against `internal_link_suggester`.

### `python -m optimisation_engine.validation.test_content_gap_and_external_links`

Runs combined 12-case validation against content gap analyzer + external link suggester.

**Cost:** Each suite ~$0.05 DeepSeek; combined ~$0.20.

**When to run:** When a checkpoint's outputs seem to have drifted in quality. Not for routine use.

---

## Single-target deep dives (debugging)

### `python -m optimisation_engine.reasoning.action_specifier <opportunity_id>`

Run Action Specifier on ONE specific opportunity. Output the patch plan to stdout. Used when an opportunity's plan seems wrong.

### `python -m optimisation_engine.reasoning.content_gap_analyzer <site_key> <slug> "<query>"`

Run gap analysis on one specific page. Useful when planning a content refresh.

### `python -m optimisation_engine.reasoning.internal_link_suggester <site_key> <slug> "<query>"`

Run internal link suggestion on one specific target.

### `python -m optimisation_engine.reasoning.external_link_suggester <site_key> <slug> "<query>"`

Run external link suggestion on one specific target.

### `python -m optimisation_engine.reasoning.semantic_page_match <site_key> "<keyword>"`

Check whether any existing page on a site already covers a keyword.

### `python -m optimisation_engine.apply.fact_checker "<text>"`

Run the fact verifier on arbitrary text — outputs verified matches + wrong values.

---

## Bulk operations (run regularly)

### Standard refresh ("the weekly thing")

In order:
1. `python -m optimisation_engine.ingestion.ingest_gsc_queries --days 28`
2. (Optional, if quota healthy) `python -m optimisation_engine.ingestion.ingest_dataforseo --execute`
3. `python -m optimisation_engine.ingestion.score_cross_site_relevance` (only scores new rows)
4. `python -m optimisation_engine.analysis.detectors_v2`
5. `python -m optimisation_engine.analysis.cleanup_noisy_opportunities`
6. `python -m optimisation_engine.analysis.cleanup_via_cross_site`
7. `python -m optimisation_engine.ingestion.run_action_specifier --limit 20 --min-score 60`
8. `python -m optimisation_engine.standup`

After standup, operator walks the queue via `review_and_apply`.

---

## Files of note (NOT commands, but worth reading)

- `optimisation_engine/apply/facts_uk_2026.yaml` — curated UK tax facts catalogue. **Update this when tax year rolls or rates change.**
- `agents/config/gsc_config.py` — per-site GSC thresholds and content paths
- `optimisation_engine/config.py` — DataForSEO cost ceilings, site list, etc.

---

## Cost ceilings (enforced by code)

| Provider | Hard ceiling | Where enforced |
|---|---|---|
| DataForSEO | $0.85/day | `cost_tracker.py` |
| DeepSeek | unlimited but logged | `api_cost_log` table |
| Serper | unlimited but logged | `api_cost_log` table |
| Anthropic API | not currently called by automation | n/a |

---

## Supabase tables (read-only diagnostics — agent can query via httpx)

- `sites` — registry of 4 active sites
- `gsc_query_data` — daily page+query+date snapshots
- `gsc_page_performance` — daily page-level snapshots (existing pre-engine)
- `dataforseo_keyword_data` — paid keyword universe
- `dataforseo_competitor_data` — competitor intelligence
- `api_cost_log` — every paid call
- `optimisation_opportunities` — the queue
- `optimisation_changes` — audit log of every applied change
- `vw_change_performance` — view: per-change daily GSC performance (for outcome tracking)

---

## When the operator says...

| Operator request | Run this |
|---|---|
| "what's the state of things" / "where do I start" | `python -m optimisation_engine.standup` |
| "refresh the data" | the Standard Refresh sequence above |
| "let me walk through what to ship" | `python -m optimisation_engine.apply.review_and_apply` |
| "what would happen if I applied X" | `python -m optimisation_engine.apply.review_and_apply --dry-run` |
| "show me high-confidence Property opportunities" | `python -m optimisation_engine.apply.review_and_apply --site property --min-confidence 80` |
| "undo that change" | `python -m optimisation_engine.apply.rollback --recent` then `... <change_id> --reason "<why>"` |
| "what does this opportunity actually propose" | `python -m optimisation_engine.reasoning.action_specifier <opp_id>` |
| "are the detectors still accurate" | the `validation/test_*.py` suites |
| "research a specific page against SERP competitors" | `python -m optimisation_engine.reasoning.content_gap_analyzer <site> <slug> "<query>"` |

---

## Common gotchas

- **Stale action plans:** After a page is shipped, opportunities specified BEFORE the shipping event keep their old action_kind in the queue. Solution: re-run `run_action_specifier` on the same opp ID; the recency gate will now return `action_kind='skip'`.

- **"slug_exists_already" on new_page:** Means a markdown file already exists at the proposed slug. Either (a) it's an internal duplicate proposal (rare) or (b) we already have coverage and the proposal should be re-routed to expand_page.

- **DataForSEO 40104:** Account not verified. The operator must complete verification at https://app.dataforseo.com/. Auth + credentials remain valid.

- **Serper IdempotencyHit:** Same query was already run today. Either wait for tomorrow or pass a different query phrasing. The cost tracker prevents accidental double-billing.

- **Apply fails with "phrase_not_found_in_body":** The insertion hint references a phrase that's no longer in the page body (file may have changed since the brief was generated). Re-run the suggester for fresh suggestions.
