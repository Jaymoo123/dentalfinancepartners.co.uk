-- ============================================================================
-- Migration: 20260707000001_form_step_funnel.sql
-- Date: 2026-07-07
-- Purpose: Per-step conversion funnel for multi-step lead forms, so the
--          mini-form multi-step rollout can be watched step by step.
--
-- Context: the mini-form capture surfaces (exit intent, inline mini, result
-- gate, mobile tool, resource block, specialist widget) are moving from a single
-- submit to a short multi-step flow. Each step emits form_step_view /
-- form_step_complete / form_step_back and any validation problem emits form_error,
-- all carrying props.step (and props.flow = 'multi' | 'single', props.form_id).
-- This view rolls those raw events up per (site_key, form_id, flow, step) so the
-- post-deploy watch and dashboards can see where a step is bleeding people.
-- Human-only (is_bot = false). Additive / prod-safe (new view only).
-- ============================================================================
CREATE OR REPLACE VIEW public.vw_form_step_funnel AS
SELECT
  e.site_key,
  e.props->>'form_id'                                                             AS form_id,
  COALESCE(e.props->>'flow', 'single')                                            AS flow,
  (e.props->>'step')::int                                                         AS step,
  count(distinct e.session_id) FILTER (WHERE e.event_name = 'form_step_view')     AS view_sessions,
  count(distinct e.session_id) FILTER (WHERE e.event_name = 'form_step_complete') AS complete_sessions,
  count(distinct e.session_id) FILTER (WHERE e.event_name = 'form_step_back')     AS back_sessions,
  count(*)                     FILTER (WHERE e.event_name = 'form_error')         AS error_events
FROM public.web_events e
WHERE e.is_bot = false
  AND e.event_name IN ('form_step_view', 'form_step_complete', 'form_step_back', 'form_error')
  AND e.props ? 'step'
GROUP BY e.site_key, e.props->>'form_id', COALESCE(e.props->>'flow', 'single'), (e.props->>'step')::int;

COMMENT ON VIEW public.vw_form_step_funnel IS
  'Per (site_key, form_id, flow, step) multi-step form funnel from web_events: view_sessions / complete_sessions / back_sessions (distinct human sessions) plus error_events (raw form_error count). flow defaults to single when the event omits it. Feeds the mini-form multi-step post-deploy watch.';

NOTIFY pgrst, 'reload schema';

-- Rollback:
--   drop view if exists public.vw_form_step_funnel;
