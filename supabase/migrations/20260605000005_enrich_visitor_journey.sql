-- ============================================================================
-- Migration: 20260605000005_enrich_visitor_journey.sql
-- Date: 2026-06-05
-- Purpose: Richer per-visitor rollup for the admin console.
--
-- Adds representative device/os/country/referrer/utm + page-view and cta counts
-- to vw_visitor_journey so the visitor LIST can show them without N extra
-- queries. mode() picks the most common value across the visitor's sessions.
-- Human-only (is_bot=false); reversible CREATE OR REPLACE.
-- ============================================================================

-- DROP first: the column set/order changes, which CREATE OR REPLACE forbids.
-- Only the admin dashboard reads this view, so the atomic drop+create is safe.
DROP VIEW IF EXISTS public.vw_visitor_journey;

CREATE VIEW public.vw_visitor_journey AS
WITH ev AS (
  SELECT
    site_key,
    visitor_id,
    COUNT(*) FILTER (WHERE event_name = 'page_view')  AS page_views,
    COUNT(*) FILTER (WHERE event_name = 'cta_click')  AS cta_clicks
  FROM public.web_events
  WHERE is_bot = false
  GROUP BY site_key, visitor_id
)
SELECT
  s.site_key,
  s.visitor_id,
  MIN(s.started_at)                                          AS first_seen,
  MAX(s.last_seen_at)                                        AS last_seen,
  COUNT(DISTINCT s.session_id)                               AS total_sessions,
  SUM(s.event_count)                                         AS total_events,
  SUM(s.engaged_ms)                                          AS total_engaged_ms,
  MAX(s.max_scroll_pct)                                      AS max_scroll_pct,
  bool_or(s.lead_id IS NOT NULL)                             AS converted,
  MAX(s.lead_id::text)                                       AS lead_id,
  mode() WITHIN GROUP (ORDER BY s.device_type)               AS device_type,
  mode() WITHIN GROUP (ORDER BY s.os_family)                 AS os_family,
  mode() WITHIN GROUP (ORDER BY s.country)                   AS country,
  MAX(s.referrer_host)                                       AS referrer_host,
  MAX(s.utm_source)                                          AS utm_source,
  COALESCE(MAX(ev.page_views), 0)                            AS page_views,
  COALESCE(MAX(ev.cta_clicks), 0)                            AS cta_clicks,
  (ARRAY_AGG(DISTINCT s.entry_path) FILTER (WHERE s.entry_path IS NOT NULL)) AS entry_paths
FROM public.web_sessions s
LEFT JOIN ev ON ev.site_key = s.site_key AND ev.visitor_id = s.visitor_id
WHERE s.is_bot = false
GROUP BY s.site_key, s.visitor_id;

NOTIFY pgrst, 'reload schema';
