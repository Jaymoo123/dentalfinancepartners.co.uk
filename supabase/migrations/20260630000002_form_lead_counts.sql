-- ============================================================================
-- Migration: 20260630000002_form_lead_counts.sql
-- Date: 2026-06-30
-- Purpose: Per-form lead + form-start counts, so a capture surface can still be
--          tracked by its own formId after it stops being an A/B experiment.
--
-- Context: result_gate_capture was concluded to treatment 2026-06-30 and the
-- experiment instrumentation (props.exp / experiment_view|action) was removed, so
-- vw_experiment_results / vw_experiment_funnel no longer track the result gate.
-- But every lead_submitted / form_start web_event durably carries props.form_id
-- (from useFormTracking), so we can still count "leads captured through the
-- result-gate form" (form_id = 'calc_result_gate') and any other form, going
-- forward. Human-only (is_bot = false). Additive / prod-safe (new view only).
-- ============================================================================
CREATE OR REPLACE VIEW public.vw_form_lead_counts AS
SELECT
  e.site_key,
  e.props->>'form_id'                                                          AS form_id,
  count(distinct e.session_id) FILTER (WHERE e.event_name = 'lead_submitted')  AS lead_sessions,
  count(*)                     FILTER (WHERE e.event_name = 'lead_submitted')  AS lead_events,
  count(distinct e.session_id) FILTER (WHERE e.event_name = 'form_start')       AS form_start_sessions
FROM public.web_events e
WHERE e.is_bot = false
  AND e.props ? 'form_id'
  AND e.event_name IN ('lead_submitted', 'form_start')
GROUP BY e.site_key, e.props->>'form_id';

COMMENT ON VIEW public.vw_form_lead_counts IS
  'Per (site_key, form_id) capture counts from web_events: lead_sessions (distinct sessions that submitted a lead), lead_events, form_start_sessions. Human-only. Lets a shipped capture surface (e.g. the result gate, form_id=calc_result_gate) be tracked by its formId once it is no longer an A/B experiment.';

NOTIFY pgrst, 'reload schema';
