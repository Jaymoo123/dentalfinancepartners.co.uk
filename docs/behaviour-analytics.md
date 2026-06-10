# First-party behaviour analytics + CRO pipeline

Every real-user action on the Property site is captured as a structured event in
**our own Supabase**, bot-filtered, and fed to conversion-rate (CRO) opportunity
detection through the existing `optimisation_opportunities` machinery. This is the
**system of record** for on-site behaviour. GA4 and Microsoft Clarity still run as
secondary/optional layers; we do not read from them.

Built and deployed live to `www.propertytaxpartners.co.uk` on 2026-06-05.

## How it works (data flow)

```
browser (our JS) ──batch──▶ POST /api/track ──service role──▶ Supabase
   capture SDK                bot-filter + geo                ingest_web_events()
                                                                   │
                          web_sessions + web_events (partitioned) ─┘
                                       │
                          human-only rollup views (is_bot = false)
                                       │
                    Python CRO detectors  +  /admin/analytics dashboard
                                       │
                          optimisation_opportunities (cro_*)
```

- The SDK runs in the visitor's browser, batches events, and `sendBeacon`s them to
  a **same-origin** endpoint (`/api/track`) — so it works inside embed iframes and
  dodges most ad-blocker lists. Capture is near-real-time (flush every ~4s / 12
  events / on tab close).
- `/api/track` validates against an event allowlist, tags bots, derives `country`
  from the Vercel edge header (**raw IP is never stored**), and writes via the
  **service role** through one atomic RPC.
- Rollup views and the dashboard are live SQL (always current). The CRO detectors
  run on the weekly `optimisation_engine` schedule.

## Pieces

**Client SDK** — `Property/web/src/lib/analytics/`
- `types.ts` — event-name allowlist + payload types (single source of truth).
- `ids.ts` — anonymous `visitor_id` (localStorage, persistent) + `session_id`
  (30-min idle). Per-origin, so embeds get their own id by design.
- `consent.ts` — track-by-default gate; opt-out = `"denied"` in localStorage.
- `track.ts` — queue, batch, `sendBeacon` flush, PII scrub.
- `autoCapture.ts` — one delegated click listener (classifies into cta/custom/
  outbound/contact/generic) + scroll depth + engagement time + rage clicks + JS
  errors.
- `server/bots.ts` — server-side bot heuristics + UA parse (Vercel BotID is a
  marked drop-in here).
- `server/adminData.ts` — service-role reads for the dashboard.

**Provider + instrumentation**
- `src/components/analytics/AnalyticsProvider.tsx` — boots capture, fires
  `page_view` on route change. No-ops inside `/embed/*`.
- `src/components/analytics/useFormTracking.ts` — form start/focus/abandon/submit/
  error/lead, wired into `LeadForm`, `InlineMiniLeadForm`, `ExitIntentModal`.
- `Calculator.tsx` fires `calc_*` events. `StickyCTA`, `SiteHeader`, homepage hero
  carry `data-cta="…"` so clicks log as clean `cta_click`. Any element can be
  tagged with `data-cta` / `data-track`.
- Lead forms pass `visitor_id`/`session_id` into the lead payload, stitching each
  lead to its journey (`leads.visitor_id` column).

**Endpoint** — `src/app/api/track/route.ts` (Node runtime). Validate → bot-filter →
aggregate per session → call `ingest_web_events` RPC. Always returns 204.

**Database** — `supabase/migrations/2026060500000{1..5}_*.sql`
- `web_sessions` (one row per visit, upserted) and `web_events` (insert-only,
  monthly `RANGE` partitions, 180-day retention). Anon is denied both; service
  role writes; authenticated can read.
- `ingest_web_events(p_session, p_events)` — atomic upsert that OR-merges sticky
  `is_bot`/`human_confirmed` and increments counters.
- Views (human-only, `is_bot = false`): `vw_web_funnel_daily`,
  `vw_page_engagement`, `vw_calculator_conversion`, `vw_form_field_dropoff`,
  `vw_visitor_journey` (enriched with device/country/source/page-views).

**Detectors** — `optimisation_engine/analysis/`
- `behaviour_detectors.py` — 5 detectors emitting `cro_funnel|cro_calculator|
  cro_cta|cro_form|cro_ux` opportunities. Run: `python -m
  optimisation_engine.analysis.behaviour_detectors property`.
- `bot_reclassifier.py` — daily backstop; flags impossible/flood sessions.
- Both wired into `weekly_run.step_detect_behaviour`.

**Dashboard** — `src/app/admin/analytics/`
- `page.tsx` — KPIs, funnel, source/device/country breakdowns, calculator
  conversion, rich visitor table.
- `visitor/[visitorId]/page.tsx` — per-visitor header, an "every measure" grid,
  pages/calculators/CTAs, and the full chronological timeline.

## Event taxonomy

Allowlisted in `lib/analytics/types.ts` (mirrored by `web_events.props`):
`page_view, scroll_depth, engagement_time, rage_click, dead_click, outbound_click,
contact_click, element_click, cta_click, custom_interaction, client_error,
form_start, form_field_focus, form_field_abandon, form_submit, form_error,
lead_submitted, calc_view, calc_input_change, calc_computed, calc_result_viewed,
calc_copy, calc_share, embed_cta_click, exit_intent_shown`.

## Consent (track-by-default)

No blocking banner. Analytics runs by default under a legitimate-interest posture;
visitors opt out via the **"Do not track me"** link in the footer
(`ConsentToggle`), which sets `"denied"` in localStorage and immediately stops the
first-party pipeline, GA4 and Clarity on that device. Disclosed in
`/cookie-policy`. To revert to opt-in: change `isTrackingAllowed()` in
`consent.ts` back to `read() === "granted"` and re-mount `<ConsentBanner/>` in
`ConsentProvider`.

## Bots vs crawlers (important)

Nothing here blocks any bot or crawler from the **page** — no robots/middleware/
firewall changes. Bot handling is a **label, not a gate**: events are tagged
`is_bot`, and the human-only rollup views exclude them. Most crawlers never run our
JS so they never enter the data at all. The UA list in `bots.ts` only affects what
counts as a human in the analytics, never page access (good for SEO/GEO).

## Setup (one-time)

Vercel env vars on the **property-tax-partners** project (Production):
- `SUPABASE_SERVICE_ROLE_KEY` — **required**. The Supabase `service_role` key
  (same value as the repo `.env` `SUPABASE_KEY`). Server-only; never `NEXT_PUBLIC_`.
  Without it, `/api/track` fails safe (returns 204, writes nothing).
- `ADMIN_DASHBOARD_KEY` — required to view the dashboard. Any secret string; visit
  `/admin/analytics?k=<that string>`. Wrong/missing key 404s.
- `NEXT_PUBLIC_CLARITY_ID` — optional; enables Microsoft Clarity session replays.

`NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` already exist (lead
forms) and are not used by the tracking endpoint.

## Deploying (gotcha)

The `property-tax-partners` Vercel project has **Root Directory = `Property/web`**,
so a CLI deploy from inside `Property/web` double-nests and fails. Deploy from the
**repo root**, targeting the project explicitly (the repo-root `.vercel` is linked
to a different project):

```
VERCEL_ORG_ID=team_XF9WAygZX7SGk9Fo4tOAnihH \
VERCEL_PROJECT_ID=prj_Di0U5vYZVPlkm7xcA3p9il9gyDzU \
vercel deploy --prod --yes
```

A failed build never affects production (Vercel only swaps on success).

## Maintenance

- **Migrations** are applied via the Management API with
  `python scripts/apply_web_analytics_migrations.py {staging|prod}` (needs a
  `User-Agent` header or Cloudflare returns 1010).
- **Partitions**: monthly partitions for `web_events` are pre-created a couple of
  months ahead in the schema migration; add a forward partition + drop the oldest
  (180-day retention) as part of routine ops.
- **Retention**: dropping the oldest `web_events` partition is the prune. Rollup
  aggregates persist regardless.
- **"No data" but deployed?** Check `SUPABASE_SERVICE_ROLE_KEY` is set, and that
  the visitor has not opted out. Verify end to end by POSTing a test batch to
  `/api/track` with a browser User-Agent, then querying `web_sessions`.
