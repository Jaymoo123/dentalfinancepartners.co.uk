# Console analytics — metric consistency, Last-Seen freshness, and load

Status as of **2026-07-04**. Owner-reported: dashboard visitor/session numbers did not
reconcile across surfaces; the "Last seen" column felt laggy; the console is slow to load.

---

## 1. Metric consistency (SHIPPED + LIVE 2026-07-04)

### Symptom
The same day's "Visitors" differed by surface: estate cards 45, estate trends chart 64,
site-comparison 64; Property card 32, Property chart 51. Sessions mostly agreed; visitors did not.

### Root cause — `visitor_id` churn counted by the charts
Two metric families were mixed:
- **Cards** — `estate_kpis()` over `web_sessions`, deduped by the session's canonical
  `visitor_id` (one per session). **Correct.**
- **Charts** — `web_timeseries()` / `estate_timeseries()` over `web_events`, deduped by the raw
  **event-level** `visitor_id`.

A single misbehaving client (bot / privacy tool / broken tracker) can rotate its localStorage
`visitor_id` on almost every event. One `web_sessions` row therefore emits many distinct
event-level `visitor_id`s, inflating only the event-based charts. Diagnosed against live prod:

- 2026-07-04 **07:15 UTC**: one Property session fired 20 events carrying **20 different
  visitor_ids** (19 ≠ the session's own). The 15-min chart bucket read **24 "visitors" when there
  were 5 real people**. This was the "27 visitors in ~10 minutes" spike — not a real volume event.
- Whole day (Property): 940 events → **51 distinct event visitor_ids but only 32 distinct session
  visitor_ids**. The 19-visitor gap (= the estate 64-vs-45 gap) was **entirely** this one client's
  churn; the 19 inflated ids never correspond to any real session.

### Fix — dedup by the session's canonical `visitor_id`
Migration `supabase/migrations/20260704000001_metric_consistency_visitor_id.sql`
(`CREATE OR REPLACE`, zero-downtime, reversible). In `web_timeseries()` and `estate_timeseries()`
the `evt` CTE now selects `ws.visitor_id` (session-canonical) instead of `e.visitor_id`, and gates
on `ws.is_bot` (the reclassifier-corrected flag) instead of `e.is_bot`, to match the cards exactly.

- `estate_kpis()` (cards) **unchanged** — it was already correct.
- Session counts **unchanged** — `session_id` is stable; only `visitor_id` churned.
- Validated read-only that "started-in-window", "active-in-window (event)", and "active-in-window
  (session overlap)" all return the **same** number once deduped by session `visitor_id` — so the
  cards' session-started basis already equals the active-visitor basis for this traffic.

### Verification (live, post-apply)
Charts now equal the cards on every surface and window. Example 2026-07-04:
estate chart 49 = estate card 49; Property chart 36 = Property card 36; worst 15-min bucket 24 → 5.

Reusable diagnostics (read-only, Supabase Management API):
- `scripts/_visitor_consistency_eval.py` — reproduces every surface from the live RPCs, decomposes
  the event-vs-session gap, locates the finest-bucket spike. Run any time numbers look off.
- `scripts/_new_fn_validation.py` — runs the (new) function bodies inline to confirm reconciliation.

### Not done (optional follow-ups)
- Harden `/api/track` (`createTrackHandler.ts`) to stamp `web_events.visitor_id` from the session's
  canonical id, so the **raw** data is churn-proof too (not just the reporting). Not needed to fix
  the UI.
- Enforce `p_country` default inside `web_timeseries` (all current callers already pass `'GB'`).

---

## 2. "Last seen" freshness (SHIPPED + DEPLOYED 2026-07-04)

### Cause
`VisitorsTable` rendered `ago(last_seen)` once at mount with **no timer**, so the relative label
never advanced. On top of that, commit `0ef048be` (2026-06-30) added a 60s `unstable_cache` to the
visitor read (`getTopVisitors`) where before there was none — so even a refresh could be 60s stale.
That is why the lag appeared "since the big change we made and reverted" (the work_mem half was
reverted; the caching stayed).

### Fix
- `packages/web-shared/console/components/VisitorsTable.tsx` — a 30s client ticker re-renders so the
  relative times advance on their own (no re-fetch).
- `packages/web-shared/console/adminData.ts` — `getTopVisitors` now uses a dedicated `VISITORS_TTL`
  of 20s (was the shared 60s `DEFAULT_TTL`), so a navigation gets near-live data.

Deployed to `estate-console` (`dpl_CRVGEtoWBiit21UMUdUUaaE6zPFD`), typecheck + 380 tests green.

---

## 3. Load / timing (OPTIONS — build deferred, needs a separate approved pass)

Per-site page fires **17 parallel queries**; the All-Sites page ~27 (incl. per-active-site
fan-outs). The heavy reads are **plain (non-materialized) views** over the growing raw `web_events`
with **no date filter** and **no `props` GIN index**; `COUNT(DISTINCT)` spills `work_mem` to disk on
the small tier. No rollup/materialized layer exists. All options below are **lossless** (raw data
retained).

1. **Canonical rollup / materialized layer (durable fix; recommended centrepiece).** One shared
   aggregation — a daily rollup table (or materialized views) refreshed by `pg_cron` or a Vercel
   cron — that every card + chart + per-site view reads. This is also the single-source-of-truth
   that permanently prevents definition drift (§1). Worst offenders first: `vw_experiment_results`,
   `vw_web_funnel_daily_v2`, `vw_visitor_journey`.
2. **GIN index on `web_events.props`** (`jsonb_path_ops`) — cheap, high-leverage; makes the
   `props ? 'x'` / `props ->> 'x'` filters index-served instead of sequential-scanning.
3. **Push date windows into the heavy view reads** — e.g. `getFunnelDaily` pulls 2000 rows then
   windows in JS; add a DB-side date filter / parameterize as an RPC.
4. **Reduce per-load fan-out** — lazy-load per-tab data on the per-site page (query a tab's data
   only when opened) using the existing `DeferredMount`. Cuts the initial 17/27-query burst.
5. **Compute bump (2GB)** — quick relief, ongoing cost, does not fix the algorithm. Stopgap only.
6. **Confirm what is deployed** — the 2026-06-30 perf commits (`0ef048be` + `e07ef8c3`) live only on
   branch `property-onsite-assistant-mvp`, not `main`; the console is manually CLI-deployed.

Recommended sequence: (6) confirm deploy → (2) GIN index + (4) fan-out reduction (fast wins) →
(1) canonical rollup for the worst views (durable). (5) only if urgent.

### Deploy recipe (console)
The repo-root `.vercel` points at `property-tax-partners`; deploy the console with an env override
from the repo root:
```
VERCEL_ORG_ID=team_XF9WAygZX7SGk9Fo4tOAnihH \
VERCEL_PROJECT_ID=prj_6GGcP8azGfURciTo2YKr9XD3ft2U \
vercel deploy --prod --yes --scope team_XF9WAygZX7SGk9Fo4tOAnihH
```
Note: the Vercel CLI uploads the working tree, so it also ships any other uncommitted changes.
