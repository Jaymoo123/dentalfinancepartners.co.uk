# Post-ledger next steps — safe subset only

**Written: 2026-07-17. Status: PARTIALLY EXECUTED 2026-07-20 — item 1 (stale tax figures) DONE via the estate stale-figure sweep (commit 60a54e22) + residue re-grep (clean); item 3 (djh noise filter) DONE. Item 2 (dentists flat-URL 301s) found ALREADY IMPLEMENTED in Dentists middleware — pending live verification. Parked Property/corepage/meta/consolidation actions remain parked per watch windows.**

**Staleness check before executing** — this plan is stale if any of these has changed:
- Ledger data is from GSC through 2026-07-15. If more than ~2 weeks old at execution, re-run `python -m optimisation_engine.analysis.query_ledger --site <key>` (with a fresh `scripts/_ledger_pull.py`-style pull) before acting on any per-page call.
- Watch windows assumed open: agency until 2026-07-22, SERP-meta batch-2 until ~2026-08-05, property miniform until ~2026-08-06. After those dates the "parked" table loosens.
- Growth Program 2026-07 assumed ACTIVE on generalist/dentists/solicitors. If wave 1 has shipped and settled, the corepage/meta actions un-park.
- Stale-figure hit-lists (generalist 22 NIC files, dentists £9,100, solicitors AMAP ~5) — re-grep before editing; another session may have fixed some.

## Context

Today produced: (1) full estate audit (`docs/_engines/ESTATE_AUDIT_2026-07-17.md`), (2) per-query/page/site ledgers for all 7 older sites (`docs/_engines/query_ledgers/`, roll-up in `ESTATE_QUERY_LEDGER_2026-07-17.md`). Meanwhile the Growth Program 2026-07 (conversion parity + tools) is ACTIVELY executing on generalist/dentists/solicitors.

Owner constraints: **no Property changes at all**, **no deploys** (source-only edits ride along with future growth-program deploys), and don't stack SEO interventions on sites mid-growth-program (isolate-variables rule).

What the ledgers indicate, in one line each:
- The big SEO wins (corepage runs, meta passes, expands) exist and are documented — but they are optimisations, and stacking them now would muddy both the growth program's and the watch windows' attribution. **They wait.**
- What cannot wait are **factual errors live on sites**: wrong tax figures are an accuracy/credibility risk, not an optimisation, and fixing them is always allowed under house rules (manager-direct, minimal intervention).

## What we execute now (source-only, no deploys, no Property)

### 1. Stale tax-figure fixes (manager-direct, exact-figure edits only)
- **Generalist**: 22 files with employer NIC 13.8%/£9,100 → 15%/£5,000 (hit-list = grep `13.8%|£9,100|9,100` in generalist content; includes the top-Bing P11D cluster). Plus `badr-after-leaving-role` 14% → 18% (from 6 Apr 2026, date-banded).
- **Dentists**: `/dental-guides/practice-profit-extraction-partnership-vs-ltd` — £9,100 ×4 → £5,000 (includes an FAQ answer, check JSON-LD too).
- **Solicitors**: ~5 files with AMAP 45p → 55p first 10k miles from 6 Apr 2026 (`locum-solicitor-expenses-allowable-uk-2025`, `sole-practitioner-solicitor-tax-guide`, `solicitor-cpd-tax-deductible`, `newly-qualified-solicitor-salary` + grep for stragglers).
- Ground truths: memory files `employer_nic_15pc_2025_ground_truth`, `badr_18pc_2026_ground_truth`, `amap_mileage_55p_2026_ground_truth`.
- Method: one Sonnet sub-agent per site (3 parallel), figure-swap only, no rewrites, no meta changes; recompute any worked examples that use the figure. Skip any file in a HOLD list (SERP-meta batch-2 pages: check `docs/_engines/query_ledgers/<site>_ledger.json` hold flags first — held pages get fixed too ONLY if the change is a pure figure correction, which is permitted, but log it in the ledger md as a note).
- Agency AIA/WDA stale figures: **deferred to after 07-22** (signal window).

### 2. Dentists legacy flat-URL 301 batch (routing config, not content)
5 legacy `/blog/{slug}` URLs 404 live (~200 impressions) after the move to `/blog/[category]/[slug]`. Add 301s in the dentists next.config/middleware redirect pattern (mirror how Solicitors does it — its middleware handles the same migration correctly; see solicitors_ledger.md "redirect shadows" finding). Slug list in `docs/_engines/query_ledgers/dentists_ledger.md`.

### 3. Noise-filter addition (analysis hygiene, no site impact)
Add junk branded queries to `optimisation_engine/analysis/noise_filter.py` (pattern group): "djh business advisers" variants — they alone drove 3 false property consolidation flags.

## Explicitly parked (do NOT execute)

| Item | Why parked | Revisit |
|---|---|---|
| ALL Property actions (CGT meta pass, expands, consolidations, optimisation run) | owner not comfortable; monetised site | owner word |
| Corepage runs (solicitors /services, dentists homepage) | growth program active on those sites; isolate variables | after growth wave-1 ships + windows close (~08-05) |
| All meta_fix/expand/refresh ledger actions | same | ~08-05 ledger re-run |
| Consolidation candidates (7 clusters) | per-cluster owner approval + data refresh required | owner review of roll-up |
| Deploys of the 39-page backlog | owner: "no need to deploy yet" | owner word |
| Agency anything | signal window | 2026-07-22 |
| gsc_page_performance CHECK constraint ALTER | prod DDL, needs owner approval | owner word |
| Monitoring restoration (workflows, tripwire, deploy_watch rows) | separate work package; medical/agency verdicts due 07-20/07-22 — flag to owner | owner word (time-sensitive) |

## Verification
- Stale-figure agents return per-file diff summaries; I spot-check each site's highest-traffic fixed page against the ground-truth memory files; grep after = zero remaining hits of old figures (excluding date-banded historical mentions like "was 13.8% before April 2025", which must carry a date to survive).
- 301 batch: `npm run build` green in Dentists/web + a route-level check that each legacy slug maps to its categorised canonical.
- Everything committed on the current branch; nothing deployed.
