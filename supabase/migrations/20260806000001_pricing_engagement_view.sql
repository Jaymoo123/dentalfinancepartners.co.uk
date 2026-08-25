-- ============================================================================
-- Migration: 20260806000001_pricing_engagement_view.sql
-- Date: 2026-08-06
-- Purpose: Per-site engagement depth for sessions that viewed /pricing
--          (pkg_pricing_v1): how long visitors engaged and how far they
--          scrolled. Complements vw_package_funnel (counts) with dwell.
--          Human-only (event-level is_bot = false). Additive / prod-safe.
-- ============================================================================
CREATE OR REPLACE VIEW public.vw_pricing_engagement AS
SELECT
  s.site_key,
  count(*)                                        AS pricing_sessions,
  round(avg(s.engaged_ms) / 1000.0)               AS avg_engaged_s,
  round((percentile_cont(0.5) WITHIN GROUP (ORDER BY s.engaged_ms)) / 1000.0) AS median_engaged_s,
  round(avg(s.max_scroll_pct))                    AS avg_scroll_pct
FROM public.web_sessions s
WHERE EXISTS (
  SELECT 1
  FROM public.web_events e
  WHERE e.session_id = s.session_id
    AND e.event_name = 'page_view'
    AND e.page_path = '/pricing'
    AND e.is_bot = false
)
GROUP BY s.site_key;

COMMENT ON VIEW public.vw_pricing_engagement IS
  'Engagement depth per site for human sessions that viewed /pricing (pkg_pricing_v1): session count, avg/median engaged seconds (whole-session engaged_ms), avg max scroll pct.';

NOTIFY pgrst, 'reload schema';
