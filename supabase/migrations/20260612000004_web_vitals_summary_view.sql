-- Migration: 20260612000004_web_vitals_summary_view.sql
-- Phase E (unified console): vw_web_vitals_summary — per-event projection of
-- web_vital events (last 28 days, bots excluded) consumed by
-- web-shared/console/estateData.getEstateVitals, which aggregates by
-- site_key + metric client-side. Additive; no existing object touched.

CREATE OR REPLACE VIEW public.vw_web_vitals_summary AS
SELECT
  e.site_key,
  e.props->>'metric'            AS metric,
  (e.props->>'value')::numeric  AS value,
  e.props->>'rating'            AS rating,
  e.ts
FROM public.web_events e
WHERE e.event_name = 'web_vital'
  AND e.is_bot = false
  AND e.ts > now() - interval '28 days';

COMMENT ON VIEW public.vw_web_vitals_summary IS
  'web_vital events (28d, non-bot) per site: metric/value/rating. Consumers aggregate.';

GRANT SELECT ON public.vw_web_vitals_summary TO authenticated;

NOTIFY pgrst, 'reload schema';
