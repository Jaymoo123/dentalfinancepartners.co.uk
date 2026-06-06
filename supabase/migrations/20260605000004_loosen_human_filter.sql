-- ============================================================================
-- Migration: 20260605000004_loosen_human_filter.sql
-- Date: 2026-06-05
-- Purpose: Count real human bounces in the analytics, not just interactors.
--
-- The original rollups required is_bot=false AND human_confirmed=true. That
-- excludes real visitors who land and leave without interacting -- which makes
-- conversion RATES look artificially high (the denominator drops). Standard
-- analytics (e.g. GA) counts those sessions too.
--
-- This loosens the "is this a human" filter to just is_bot=false (known bots are
-- still tagged + excluded; the daily reclassifier catches stealth ones). The
-- engagement signal lives on separately as engaged_sessions / engaged_ms, so we
-- lose no insight, we just stop under-counting the top of the funnel.
--
-- Only the two human_confirmed-gated views change; the event-based views already
-- filtered on is_bot=false only. Reversible: re-add "AND human_confirmed = true".
-- ============================================================================

CREATE OR REPLACE VIEW public.vw_web_funnel_daily AS
WITH sess AS (
  SELECT
    site_key,
    started_at::date                                              AS date,
    COUNT(*)                                                      AS sessions,
    COUNT(*) FILTER (WHERE engaged_ms >= 10000)                  AS engaged_sessions,
    COUNT(*) FILTER (WHERE lead_id IS NOT NULL)                  AS converted_sessions
  FROM public.web_sessions
  WHERE is_bot = false           -- include real bounces; only exclude tagged bots
  GROUP BY site_key, started_at::date
),
ev AS (
  SELECT
    site_key,
    ts::date                                                            AS date,
    COUNT(*) FILTER (WHERE event_name = 'page_view')                    AS page_views,
    COUNT(DISTINCT session_id) FILTER (WHERE event_name = 'calc_computed')  AS calc_sessions,
    COUNT(DISTINCT session_id) FILTER (WHERE event_name = 'cta_click')      AS cta_sessions,
    COUNT(DISTINCT session_id) FILTER (WHERE event_name = 'form_start')     AS form_start_sessions,
    COUNT(DISTINCT session_id) FILTER (WHERE event_name = 'lead_submitted') AS lead_events
  FROM public.web_events
  WHERE is_bot = false
  GROUP BY site_key, ts::date
)
SELECT
  COALESCE(sess.site_key, ev.site_key)        AS site_key,
  COALESCE(sess.date, ev.date)                AS date,
  COALESCE(sess.sessions, 0)                  AS sessions,
  COALESCE(sess.engaged_sessions, 0)          AS engaged_sessions,
  COALESCE(ev.page_views, 0)                  AS page_views,
  COALESCE(ev.calc_sessions, 0)               AS calc_sessions,
  COALESCE(ev.cta_sessions, 0)                AS cta_sessions,
  COALESCE(ev.form_start_sessions, 0)         AS form_start_sessions,
  COALESCE(sess.converted_sessions, 0)        AS converted_sessions
FROM sess
FULL OUTER JOIN ev ON sess.site_key = ev.site_key AND sess.date = ev.date;

CREATE OR REPLACE VIEW public.vw_visitor_journey AS
SELECT
  s.site_key,
  s.visitor_id,
  MIN(s.started_at)                                       AS first_seen,
  MAX(s.last_seen_at)                                     AS last_seen,
  COUNT(DISTINCT s.session_id)                            AS total_sessions,
  SUM(s.event_count)                                      AS total_events,
  SUM(s.engaged_ms)                                       AS total_engaged_ms,
  MAX(s.max_scroll_pct)                                   AS max_scroll_pct,
  bool_or(s.lead_id IS NOT NULL)                          AS converted,
  MAX(s.lead_id::text)                                    AS lead_id,
  (ARRAY_AGG(DISTINCT s.entry_path))                      AS entry_paths,
  (ARRAY_AGG(DISTINCT s.utm_source) FILTER (WHERE s.utm_source IS NOT NULL)) AS utm_sources
FROM public.web_sessions s
WHERE s.is_bot = false           -- include all real visitors, interacting or not
GROUP BY s.site_key, s.visitor_id;

NOTIFY pgrst, 'reload schema';
