-- ============================================================================
-- Migration: 20260805000001_package_funnel_view.sql
-- Date: 2026-08-05
-- Purpose: Per-site per-package funnel for the self-serve packages experiment
--          (pkg_pricing_v1): pricing page views -> package CTA clicks ->
--          signup form starts -> signups.
--
-- All events are existing allowlist names; packages are distinguished purely by
-- props (package_id on cta_click/lead_submitted, form_id='package_signup' on
-- form_start). Pricing views are page_view on /pricing, joined by site so the
-- per-package rows can be read against a shared denominator (package_id NULL
-- row = the page-level denominator). Human-only (is_bot = false). Additive /
-- prod-safe (new view only).
-- ============================================================================
CREATE OR REPLACE VIEW public.vw_package_funnel AS
SELECT
  e.site_key,
  e.props->>'package_id'                                                            AS package_id,
  count(distinct e.session_id) FILTER (
    WHERE e.event_name = 'page_view' AND e.page_path = '/pricing')                   AS pricing_view_sessions,
  count(distinct e.session_id) FILTER (
    WHERE e.event_name = 'cta_click' AND e.props->>'cta' = 'package_signup')         AS cta_click_sessions,
  count(distinct e.session_id) FILTER (
    WHERE e.event_name = 'form_start' AND e.props->>'form_id' = 'package_signup')    AS form_start_sessions,
  count(distinct e.session_id) FILTER (
    WHERE e.event_name = 'lead_submitted' AND e.props->>'form_id' = 'package_signup') AS signup_sessions,
  count(*) FILTER (
    WHERE e.event_name = 'lead_submitted' AND e.props->>'form_id' = 'package_signup') AS signup_events
FROM public.web_events e
WHERE e.is_bot = false
  AND (
    (e.event_name = 'page_view' AND e.page_path = '/pricing')
    OR (e.event_name = 'cta_click' AND e.props->>'cta' = 'package_signup')
    OR (e.props->>'form_id' = 'package_signup'
        AND e.event_name IN ('form_start', 'lead_submitted'))
  )
GROUP BY e.site_key, e.props->>'package_id';

COMMENT ON VIEW public.vw_package_funnel IS
  'Self-serve packages funnel (pkg_pricing_v1) per (site_key, package_id): pricing_view_sessions (page_view on /pricing; lands on the package_id=NULL row as the page-level denominator), cta_click_sessions (cta=package_signup), form_start_sessions and signup_sessions/events (form_id=package_signup). Human-only.';

NOTIFY pgrst, 'reload schema';
