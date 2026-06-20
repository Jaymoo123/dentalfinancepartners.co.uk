# Estate console — dashboard punch-list & plan

> Recovered 2026-06-20 from session `b7afa432` (19 Jun), where this was diagnosed
> and designed but never written to a file. Verified against current code before
> writing. This is the **dashboard UX/data-clarity** plan — separate from the
> tax/correctness audit in `docs/property/AUDIT_2026-06-19.md`.
>
> Build status: in progress on branch `console-kpi-windows-carousel`. Local-first,
> **no deploy without explicit sign-off** + a dev-server walkthrough first.

## The problem the user flagged

On the estate home **Sites (last 7 days)** table, Property shows ~522 visitors;
clicking into the per-site page shows ~1020 visitors. Same metric, **different
unlabelled time windows** (7-day table vs 30-day card) — not a data bug.

Root cause (confirmed in `console/web/src/app/site/[siteKey]/page.tsx`): the per-site
**Overview** row shows 6 cards that are silently on ~4 different windows, so nothing
ties back to the home table:

| Card | Source | Real window today |
|---|---|---|
| Sessions / day | `getFunnelDaily` totals (no date arg) | **All time** |
| Visitors | `getSiteKpis(from30)` `.humans` | Last 30 days |
| Visitor conv. | `getSiteKpis(from30)` | Last 30 days |
| Leads | `getFunnelDaily` `converted_sessions` | **All time** |
| Conversion rate | `getFunnelDaily` | **All time** |
| Avg engaged | `getTopVisitors(500)` mean | **Last 500 visitors** (no date) |

Home **Sites** table = `getEstateKpis(now-7d, now)`. Hence the mismatch.

## The fix (user's mental model: granular first, widen the lens)

Replace the mixed-window row with a **swipeable window carousel**: the same 2×3 grid
of 6 metrics, repeated as 4 pages, **one explicit window per page**:

- **Page 1 — Today** (since 00:00 UTC)
- **Page 2 — Last 7 days**
- **Page 3 — Last 30 days**
- **Page 4 — All time**

Swipe left/right on mobile; segmented control + arrows + dots on desktop.

The 6 metrics per page (all from `estate_kpis` for one `[from, to)` window):

1. **Sessions** = `sessions`
2. **Visitors** = `humans` (sub: `{new_humans} new`)
3. **Leads** = `leads_all` (sub: `{leads_uk} UK`) — unifies with the home table source
4. **Visitor conv.** = `converted_humans / humans`
5. **Session conv.** = `leads / sessions`, country-consistent (GB→`leads_uk`, ALL→`leads_all`) — fixes the GB-numerator / all-country-leads mismatch
6. **Avg engaged** = mean engaged-time over visitors seen in the window

> ⚠️ Expected: unifying the windows makes some cards show **smaller** numbers than
> today (e.g. Sessions/day stops being an all-time total). This is the point, not a
> regression — flagged to and accepted by the user in the original session.

## Build approach (researched in the original session)

- **No carousel exists** anywhere in the estate. Stack: React 19 + Next 15 +
  **Tailwind v4** (native CSS scroll-snap utilities), **no animation libs**.
- Chosen path: **zero-dependency** — vanilla React + CSS `snap-x`/`snap-start` for the
  swipe, a little state for the active-page dots/arrows. No new package for an internal tool.
- New shared client component: `packages/web-shared/console/components/KpiWindowCarousel.tsx`,
  receiving fully server-rendered grid nodes (mirrors the `DashboardTabs` "server nodes
  in, client toggle" boundary, so no data/PII crosses into the client bundle).
- `SnapshotCard` already supports label/value/sub — reused as-is.

## Data availability (verified)

- `estate_kpis(p_from, p_to, p_site_key, p_country)` accepts **arbitrary UTC windows**;
  sessions/humans are country-scoped, `leads_all` all-country, `leads_uk` GB — all
  date-windowed. Migration `20260616000002_estate_kpis_country.sql`.
- Window boundaries are computed **start-of-UTC-day** (the old code passed client "now",
  not a day boundary — fixed here).
- **Engaged time per window** is the one metric not in the RPC. v1 derives it client-side
  from the already-fetched top-500 visitor set filtered by `last_seen` (exact for short
  windows; 500-capped for all-time, same as today). A small dedicated RPC would make it
  exact for all-time — deferred, needs sign-off (DB change).

## Labelling / ambiguity cleanups (the "poorly-labelled cards" ask)

1. Per-site cards had **no timeframe label** → the carousel makes each page one explicit window.
2. **GB-only sessions/visitors vs all-country leads** → single caption under the carousel:
   "GB visitors · all-country leads · windows in UTC".
3. Terminology: "Visitors" = distinct humans, "Sessions" = visits.
4. **Two conversion rates** → relabelled clearly: "Visitor conv." (per human) vs
   "Session conv." (per session), both country-consistent.
5. Per-site "Leads" now uses `leads_all` (same source as the home table) instead of the
   funnel's `converted_sessions`.

## Out of scope for v1 (follow-ups)

- Per-window sparklines/deltas on the cards (v1 drops them to avoid mixing a 14-day
  spark onto a "Today"/"All-time" card).
- Exact all-time engaged-time RPC.
- Applying the same carousel to the estate **home** KPI rows.
