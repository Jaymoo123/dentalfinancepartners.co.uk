-- ============================================================================
-- public.vw_visitor_journey
-- Rolling 90-day ACTIVITY window + LIFETIME conversion status.
-- Prepared 2026-09-26. Supersedes vw_visitor_journey_90d_candidate.sql (v1),
-- which is kept alongside for comparison.
--
-- MIXED SCOPE, ON PURPOSE -- read this before editing:
--   * ACTIVITY figures are 90-DAY: first_seen, last_seen, total_sessions,
--     total_events, total_engaged_ms, max_scroll_pct, page_views, cta_clicks,
--     entry_paths, device_type, os_family, country, referrer_host, utm_source.
--     These count ONLY activity inside the rolling window. They are 90-day
--     totals, NOT lifetime totals. Owner-approved 2026-09-26.
--   * CONVERSION is LIFETIME: converted and lead_id are computed over the
--     visitor's FULL history with no date bound. A visitor who became a lead
--     100 days ago and is still active must NOT render as "not converted" --
--     that would misreport who became a lead, and the owner's approval of the
--     90-day window did not extend to it. Hence the separate `conv` arm.
--   A visitor drops out of the view entirely only when their last_seen_at falls
--   outside 90 days; at that point their (true) conversion goes with them.
--   That is the window, not a flag flip.
--
-- No data is deleted and no retention setting is touched. All-time history
-- stays in web_events / web_sessions. This is a display-window change only.
-- Companion to 20260926000001_bound_dashboard_views_90d.sql, which bounded 9
-- other dashboard views and deliberately left this one alone.
--
-- WHAT CHANGED vs the live definition (verified byte-identical to
-- 20260617000002_geo_leads_weekly_and_journey_fix.sql -- no out-of-band drift):
--   1. ev CTE:          + ts >= now() - interval '90 days'
--   2. first_touch CTE: + started_at >= now() - interval '93 days'
--   3. outer arm:       + started_at   >= now() - interval '93 days'  (index driver)
--                       + last_seen_at >= now() - interval '90 days'  (the real window)
--   4. NEW conv CTE (unbounded) now supplies converted + lead_id, which the
--      outer aggregate used to compute itself from the (now bounded) s arm.
--
-- WHY 93 DAYS ON started_at AND 90 ON last_seen_at:
--   The window we want is "visitor active in the last 90 days", which is
--   last_seen_at. But the only usable index is web_sessions_site_started_idx on
--   (site_key, started_at DESC), so started_at has to carry the bound that
--   drives the scan. A session that ended inside the window may have started
--   before it: the widest observed session span is 1 day 11:32, so a bare
--   90-day started_at bound dropped exactly 1 visitor whose last_seen was still
--   inside the window (v_872b054f..., a 25-minute session straddling the
--   cutoff). The 3-day grace on started_at makes the scan a superset and the
--   last_seen_at predicate trims it exactly: verified 0 visitors dropped.
--   Columns are left unwrapped so both predicates stay index-usable.
--
-- WHY THE conv ARM IS CHEAP:
--   It reads only sessions that carry a lead (310 of 41,528 human sessions) via
--   the partial index web_sessions_lead_idx (lead_id) WHERE lead_id IS NOT NULL.
--   Measured: Bitmap Index Scan, 221 rows, 0.58 ms, ~315 extra buffers on the
--   property top-500 query. It does not erode the gain from the bound.
--
-- CREATE OR REPLACE is accepted: output column list, names, order and types are
-- identical to the live view (verified, all 18 columns).
-- ============================================================================

CREATE OR REPLACE VIEW public.vw_visitor_journey AS
WITH ev AS (
  SELECT site_key, visitor_id,
    COUNT(*) FILTER (WHERE event_name = 'page_view') AS page_views,
    COUNT(*) FILTER (WHERE event_name = 'cta_click') AS cta_clicks
  FROM public.web_events
  WHERE is_bot = false
    AND ts >= now() - interval '90 days'
  GROUP BY site_key, visitor_id
),
first_touch AS (
  SELECT DISTINCT ON (s.site_key, s.visitor_id)
    s.site_key, s.visitor_id,
    s.referrer_host AS first_referrer_host,
    s.utm_source    AS first_utm_source
  FROM public.web_sessions s
  WHERE s.is_bot = false
    AND s.started_at >= now() - interval '93 days'
  ORDER BY s.site_key, s.visitor_id, s.started_at ASC
),
conv AS (
  -- UNBOUNDED on purpose: conversion status is LIFETIME, not 90-day. Only rows
  -- that actually carry a lead are read, via the partial index
  -- web_sessions_lead_idx (lead_id) WHERE lead_id IS NOT NULL -- 310 of 41,528
  -- human sessions, so this arm is near-free. A visitor with no lead has no row
  -- here and falls to COALESCE(..., false) below.
  SELECT s.site_key, s.visitor_id,
    bool_or(s.lead_id IS NOT NULL) AS converted,
    MAX(s.lead_id::text)           AS lead_id
  FROM public.web_sessions s
  WHERE s.is_bot = false
    AND s.lead_id IS NOT NULL
  GROUP BY s.site_key, s.visitor_id
)
SELECT
  s.site_key,
  s.visitor_id,
  MIN(s.started_at)                            AS first_seen,
  MAX(s.last_seen_at)                          AS last_seen,
  COUNT(DISTINCT s.session_id)                 AS total_sessions,
  SUM(s.event_count)                           AS total_events,
  SUM(s.engaged_ms)                            AS total_engaged_ms,
  MAX(s.max_scroll_pct)                        AS max_scroll_pct,
  COALESCE(cv.converted, false)                AS converted,
  cv.lead_id                                   AS lead_id,
  mode() WITHIN GROUP (ORDER BY s.device_type) AS device_type,
  mode() WITHIN GROUP (ORDER BY s.os_family)   AS os_family,
  mode() WITHIN GROUP (ORDER BY s.country)     AS country,
  ft.first_referrer_host                       AS referrer_host,
  ft.first_utm_source                          AS utm_source,
  COALESCE(MAX(ev.page_views), 0)              AS page_views,
  COALESCE(MAX(ev.cta_clicks), 0)              AS cta_clicks,
  (ARRAY_AGG(DISTINCT s.entry_path) FILTER (WHERE s.entry_path IS NOT NULL)) AS entry_paths
FROM public.web_sessions s
LEFT JOIN ev         ON ev.site_key = s.site_key AND ev.visitor_id = s.visitor_id
LEFT JOIN first_touch ft ON ft.site_key = s.site_key AND ft.visitor_id = s.visitor_id
LEFT JOIN conv cv        ON cv.site_key = s.site_key AND cv.visitor_id = s.visitor_id
WHERE s.is_bot = false
  AND s.started_at  >= now() - interval '93 days'
  AND s.last_seen_at >= now() - interval '90 days'
GROUP BY s.site_key, s.visitor_id, ft.first_referrer_host, ft.first_utm_source,
         cv.converted, cv.lead_id
;

COMMENT ON VIEW public.vw_visitor_journey IS
  'One row per visitor. MIXED SCOPE, deliberately: ACTIVITY figures are ROLLING 90-DAY '
  '(owner-approved 2026-09-26) while CONVERSION STATUS is LIFETIME. A visitor appears only if '
  'last_seen_at falls in the last 90 days. 90-day scoped: first_seen, last_seen, total_sessions, '
  'total_events, total_engaged_ms, max_scroll_pct, page_views, cta_clicks, entry_paths, '
  'device_type (mode), os_family (mode), country (mode), referrer_host (FIRST-TOUCH within the '
  'window: earliest in-window session by started_at, not latest), utm_source (first-touch, same '
  'caveat) -- these are 90-day totals, NOT lifetime totals. LIFETIME scoped: converted and lead_id, '
  'computed unbounded over the visitor''s full history so a visitor who became a lead before the '
  'window still reports as converted. The 93-day bound on started_at is an index driver only '
  '(web_sessions_site_started_idx); the 90-day bound on last_seen_at defines the window. No data is '
  'deleted; all-time history remains in web_events / web_sessions.';

-- CREATE OR REPLACE preserves the existing GRANT; re-stated for idempotency.
GRANT SELECT ON public.vw_visitor_journey TO authenticated;

NOTIFY pgrst, 'reload schema';
