-- ============================================================================
-- Migration: 20260608000004_experiment_results_unnest.sql
-- Date: 2026-06-08
-- Purpose: Make vw_experiment_results handle MANY concurrent experiments.
--
-- track() stamps props.exp with ALL of a visitor's active assignments, comma-
-- separated ("personalization:treatment,calc_result_capture:control"). The old
-- view did `props->>'exp'` and GROUPed BY the whole string, so once a second
-- experiment runs every combination becomes its own meaningless row AND the
-- existing personalisation card stops matching "personalization:control".
--
-- Fix: UNNEST the comma-separated exp into one row per `key:variant`, so each
-- experiment aggregates independently. Same columns as before (CREATE OR REPLACE,
-- no column change). Additive / prod-safe.
-- ============================================================================
CREATE OR REPLACE VIEW public.vw_experiment_results AS
WITH ev AS (
  SELECT
    e.site_key,
    trim(tok)        AS exp,   -- one token per active experiment ("key:variant")
    e.session_id,
    e.event_name
  FROM public.web_events e
  CROSS JOIN LATERAL unnest(string_to_array(e.props->>'exp', ',')) AS tok
  WHERE e.is_bot = false
    AND e.props ? 'exp'
    AND coalesce(e.props->>'exp', '') <> ''
)
SELECT
  e.site_key,
  e.exp,
  count(distinct e.session_id)                                      AS sessions,
  count(*) filter (where e.event_name = 'cta_click')                AS cta_clicks,
  count(*) filter (where e.event_name = 'form_start')               AS form_starts,
  count(distinct e.session_id) filter (where s.lead_id is not null) AS converted_sessions,
  case when count(distinct e.session_id) > 0
       then round(
              count(distinct e.session_id) filter (where s.lead_id is not null)::numeric
              / count(distinct e.session_id), 4)
       end                                                          AS conversion_rate
FROM ev e
LEFT JOIN public.web_sessions s ON s.session_id = e.session_id
WHERE e.exp <> ''
GROUP BY e.site_key, e.exp;

COMMENT ON VIEW public.vw_experiment_results IS
  'Per (site_key, exp=key:variant) A/B results: sessions, cta_clicks, form_starts, converted_sessions, conversion_rate. props.exp is comma-separated (many concurrent experiments); this view unnests it so each experiment aggregates independently.';

NOTIFY pgrst, 'reload schema';
