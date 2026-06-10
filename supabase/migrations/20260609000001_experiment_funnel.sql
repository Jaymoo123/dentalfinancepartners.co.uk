-- ============================================================================
-- Migration: 20260609000001_experiment_funnel.sql
-- Date: 2026-06-09
-- Purpose: Score A/B experiments on the proximal "building block" they actually
--          move, not on the distal/rare conversion outcome.
--
-- The existing vw_experiment_results scores every experiment on conversion
-- (leads / sessions), with sessions = "any event by an assigned visitor". At B2B
-- volume conversion is too rare to reach significance, and the denominator is
-- diluted by visitors who never saw the experiment surface (props.exp is stamped
-- on EVERY event for an assigned visitor).
--
-- This view reads the purpose-built experiment_view / experiment_action events
-- (each carrying props.experiment = the surface's key), so the funnel is scoped
-- to the people who actually saw the surface and took its building-block step:
--
--   exposed_sessions          -> distinct sessions that SAW the surface
--   acted_sessions            -> distinct sessions that took the building-block step
--   acted_with_phone_sessions -> guardrail (lead_form_length: callable leads)
--   converted_sessions        -> exposed sessions that became a lead (secondary)
--
-- props.exp may list several concurrent arms; we unnest it and keep ONLY the
-- token whose key matches props.experiment, so a generic event is credited to
-- the right experiment and not to the visitor's other concurrent tests.
--
-- Additive / prod-safe. vw_experiment_results is left intact (personalization,
-- a whole-experience test with no surface exposure, still uses it).
-- ============================================================================
CREATE OR REPLACE VIEW public.vw_experiment_funnel AS
WITH ev AS (
  SELECT
    e.site_key,
    e.session_id,
    e.event_name,
    e.props->>'experiment'                         AS exp_key,
    trim(tok)                                       AS token,
    coalesce(e.props->>'has_phone', '') = 'true'    AS has_phone
  FROM public.web_events e
  CROSS JOIN LATERAL unnest(string_to_array(e.props->>'exp', ',')) AS tok
  WHERE e.is_bot = false
    AND e.event_name IN ('experiment_view', 'experiment_action')
    AND e.props ? 'exp'
    AND e.props ? 'experiment'
    -- keep only the arm token for THIS surface's experiment
    AND split_part(trim(tok), ':', 1) = e.props->>'experiment'
)
SELECT
  ev.site_key,
  ev.token AS exp,
  count(distinct ev.session_id) FILTER (WHERE ev.event_name = 'experiment_view')   AS exposed_sessions,
  count(distinct ev.session_id) FILTER (WHERE ev.event_name = 'experiment_action') AS acted_sessions,
  count(distinct ev.session_id) FILTER (
    WHERE ev.event_name = 'experiment_action' AND ev.has_phone
  )                                                                                 AS acted_with_phone_sessions,
  count(distinct ev.session_id) FILTER (
    WHERE ev.event_name = 'experiment_view' AND s.lead_id IS NOT NULL
  )                                                                                 AS converted_sessions
FROM ev
LEFT JOIN public.web_sessions s ON s.session_id = ev.session_id
GROUP BY ev.site_key, ev.token;

COMMENT ON VIEW public.vw_experiment_funnel IS
  'Per (site_key, exp=key:variant) building-block funnel from experiment_view / experiment_action events: exposed_sessions (saw the surface), acted_sessions (took the building-block step), acted_with_phone_sessions (lead_form_length guardrail), converted_sessions (exposed sessions that became a lead). Surface-scoped via props.experiment; the conversion-only vw_experiment_results stays for personalization.';

NOTIFY pgrst, 'reload schema';
