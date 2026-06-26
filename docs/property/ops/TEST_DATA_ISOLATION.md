# Test-data isolation (the verification-suite unlock)

*Created 2026-06-24 (Wave 1). Lets us run synthetic checks against PRODUCTION (the only place a post-deploy "does it work?" check is meaningful) without (a) any test data reaching a vendor, or (b) any test data polluting the analytics dashboard, experiment metrics, detectors, or billing. Design goal: lowest possible surface on shared infra - reuse the existing exclusion paths instead of adding new columns and rewriting ~13 views.*

## Two markers, two paths

**1. Leads -> reserved `source='test'`**
- Migration `supabase/migrations/20260624000001_test_data_isolation.sql` adds `'test'` to the `leads_source_valid` CHECK (strictly additive).
- `Property/web/src/lib/lead-routing.ts`:
  - `DEFAULT_CC_EXCLUDED_SOURCES = "property,test"` -> a test lead is **never** copied to a vendor (DJH or Reflex).
  - `resolveLeadTo("test")` -> the operator only (`LEADS_NOTIFY_TO_TEST` || `LEADS_NOTIFY_TO` || default internal inbox).
- `Property/web/src/app/api/leads/enrich/route.ts` skips `source='test'` -> no paid Opus call, no `lead_enrichment` row.
- Billing/reconciliation (the Delivery Log + Tide breakdown) excludes `source='test'`.
- The synthetic smoke check inserts one `source='test'` row, asserts it landed, then **deletes it**.

**2. Analytics -> reserved `synthetic_` visitor-id prefix**
- Synthetic browser traffic (the post-deploy probes) mints its visitor id with the `synthetic_` prefix (real ids are always `v_<hex>`, so no collision).
- `packages/web-shared/analytics/server/createTrackHandler.ts` flags any session/events from a `synthetic_` visitor as `is_bot=true` (reason `synthetic-test`).
- Every human-only rollup view, every CRO detector, and `vw_experiment_results` already filter `is_bot=false`, so synthetic traffic is **automatically excluded from every metric and decision** with no view changes.
- Physically the rows still exist in `web_sessions`/`web_events` (flagged); a dedicated staging DB (Wave 2) removes them physically for day-to-day dev. For decisions, the `is_bot` flag is sufficient.

**3. Environment -> only `VERCEL_ENV==='production'` ingests** *(added 2026-06-25)*
- The `synthetic_` path above isolates the post-deploy probes, which run against the PROD url. It does **not** cover a human developer browsing `http://localhost:3000` (or a Vercel **preview**) with analytics consent on: that session mints a normal `v_<hex>` id, passes the UA bot heuristic, and would be stored `is_bot=false` -> counted as a real visitor. dev/preview also point at PROD Supabase via `.env.local`. That was the gap.
- `packages/web-shared/analytics/server/createTrackHandler.ts` now returns `204` **without ingesting** unless `process.env.VERCEL_ENV === 'production'`. So localhost dev and Vercel preview never write to the live analytics store, regardless of consent. (The client-side in-app event bus still fires, so proactive UI like the on-site assistant works in dev; nothing is persisted.)
- The post-deploy probes are unaffected: they target the deployed PROD url where `VERCEL_ENV==='production'`, then stay isolated via the `synthetic_` prefix (path 2).
- Escape hatch: set `ANALYTICS_ALLOW_NONPROD_INGEST=1` to validate ingest from a preview.

## Prod steps required to make this live (GATED - need sign-off)
1. Apply the migration to prod Supabase (Management API). Re-read the live constraint first per the migration header.
2. Deploy `Property/web` (carries the lead-routing + enrich + track-handler changes) via the manual Vercel CLI flow.
3. (Optional) set `LEADS_NOTIFY_TO_TEST` in Vercel env to a dedicated inbox/folder for probe notifications.

## Verification
- Unit: `resolveLeadCc('test') === []`, `resolveLeadTo('test')` -> operator (see `lead-routing.test.ts`).
- Live (after deploy): the synthetic smoke check inserts a `source='test'` lead, confirms the row, confirms no vendor was emailed, deletes it; a `synthetic_`-prefixed browser session does not appear in any console metric.
