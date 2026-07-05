# SE Ranking 7-Day Trial — Property Extraction Kit

Local-only smash-and-grab: extract every permanent dataset Property has never had
(competitor keyword profiles, backlink prospects, AI-citation gaps, rank baseline,
keyword enrichment), bank it here on disk, decide convert-or-not at Day 7. No
Supabase, no migration, no deploy. All outputs live in this folder.

## STATUS / BLOCKER
- The May trial token (`37c7159d-…`) is **DEAD** — live probe returns `403 No access`.
- Everything is built and tested; the **only** thing missing is the current trial's API key.
- **To unblock:** get the key from the SE Ranking account → *Settings → API*, then add to
  the repo-root `.env`:
  ```
  SERANKING_API_TOKEN=<your-current-trial-key>
  ```
  (Adding it via the `! ` prompt prefix keeps it out of chat. Nothing else needs editing.)

## Components
| File | Role |
|---|---|
| `optimisation_engine/clients/seranking_client.py` | Data/Project API wrapper. `Authorization: Token`. Local JSON credit ledger (`_credit_ledger.json`) + idempotency cache (`_idem_cache.json`) + hard `SERANKING_CREDIT_CEILING`. Saves every raw response under `raw/`. |
| `scripts/seranking/run_extraction.py` | Orchestrator: `--phase {gate,tier1,tier2-setup,tier2-poll,tier2-export}`, `--dry-run` (default) / `--execute`. |
| `scripts/seranking/build_keyword_gap.py` | Deliverable 1 → `keyword_gap_<date>.csv` |
| `scripts/seranking/build_backlink_prospects.py` | Deliverable 2 → `backlink_prospects_<date>.csv` |
| `scripts/seranking/build_ai_citation_gap.py` | Deliverable 3 → `ai_citation_gap_<date>.csv` |
| `scripts/seranking/build_rank_baseline.py` | Deliverable 4a → `rank_baseline_<date>.csv` |
| `scripts/seranking/enrich_blog_topics.py` | Deliverable 4b → `blog_topics_property_enrichment_<date>.csv` |

Config block: `optimisation_engine/config.py` → `SERANKING_*` (cost table, ceiling, system=uk).

## Runbook (once the key is in `.env`)

**Day 0 — gate (do this first; ~free→few hundred cr):**
```
python -m scripts.seranking.run_extraction --phase gate
```
Validates the token, reads the credit balance, PROBES the live API to discover the
working endpoint shape (May trial used `/v1`; current docs say `/data` — the gate
settles which this trial exposes), dumps sample responses to `raw/`, and writes
`_api_profile.json` + `GATE_REPORT.md`. Three outcomes:
- **Data API unlocked** → lock the gate's `working_paths` into `ENDPOINTS` (in
  `seranking_client.py`), confirm the response field names against the dumped samples
  (the builders' `_extract()` try common names; tweak if a sample differs), then proceed.
- **Platform-only** (no Data API credits) → run the Project-API fallback: rank tracker
  + audit + manual competitor reads. Deliverable 4 + audit only.
- **Token rejected** → wrong/expired key.

**Days 1–6 — Tier-1 permanent snapshots:**
```
python -m scripts.seranking.run_extraction --phase tier1 --dry-run     # see the credit plan
python -m scripts.seranking.run_extraction --phase tier1 --execute     # spend (confirm fits balance)
```
Caps: `--comp-kw 20 --comp-overview 25 --comp-backlinks 10 --refdomain-limit 400 --kw-limit 1000`.
Record caps (not request count) are the spend lever. Idempotency means a same-day
re-run is free (skips completed calls).

**Days 1–7 — rank tracker (daily):** `--phase tier2-setup --execute` once, then
`--phase tier2-poll --execute` each day, then `--phase tier2-export` on Day 7.
(Project-API endpoint shapes are confirmed at the gate before wiring.)

**Build the reports (any time after pulls land):**
```
python -m scripts.seranking.build_keyword_gap
python -m scripts.seranking.build_backlink_prospects
python -m scripts.seranking.build_ai_citation_gap
python -m scripts.seranking.build_rank_baseline
python -m scripts.seranking.enrich_blog_topics
```

## Credit discipline
- Ceiling: `SERANKING_CREDIT_CEILING` (default 20000; tighten to the real trial allowance
  after the Day-0 balance read). A call whose estimate would breach it is refused.
- Ledger: `_credit_ledger.json` (every call: estimate, actual, status). `ledger_total()`
  = cumulative successful spend.
- Costs (per `SERANKING_COSTS`): `domain/*` 100 cr/request flat; `keywords/*` 10 cr/record
  (longtail 1); `backlinks/summary` 100/record, `backlinks/refdomains|all` 1/record.

## Permanent vs expires
Permanent (kept here forever): every `raw/*.json`, all 5 CSVs, the gate report.
Expires with the trial: live daily tracking past Day 7, recurring competitor/backlink/
AI-citation monitoring. Convert-or-not scorecard: see the approved plan
(`~/.claude/plans/we-now-have-a-clever-unicorn.md`).

## Notes
- Seeds come from live GSC (`gsc_query_data`, Property) — the legacy `blog_topics_property`
  table was dropped in the infra refactor, so `enrich_blog_topics --apply` is a no-op stub.
- The builders' `_extract()` functions try several field names so they survive whichever
  API generation the trial exposes; confirm against the gate's `raw/` samples on Day 0.
