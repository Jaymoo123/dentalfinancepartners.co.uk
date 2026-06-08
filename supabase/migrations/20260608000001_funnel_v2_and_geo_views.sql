-- ============================================================================
-- Migration: 20260608000001_funnel_v2_and_geo_views.sql
-- Date: 2026-06-08
-- Purpose: Dashboard rebuild — a TRUE nested conversion funnel + country-aware
--          ("_geo") parallels of the tool/form/section rollups so the admin
--          dashboard can slice every metric by country (default GB).
--
-- ADDITIVE ONLY. The existing detector-backed views are left byte-for-byte
-- intact (the python CRO detectors read vw_web_funnel_daily / vw_calculator_
-- conversion / vw_form_field_dropoff with select=* and no country filter; adding
-- a country dimension in place would multiply their rows and break them). The
-- dashboard switches to the new views below; detectors keep their originals.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. vw_web_funnel_daily_v2 — TRUE nested funnel, per (site_key, date, country).
--
-- Unlike vw_web_funnel_daily (six INDEPENDENT counts, which is why "CTA" could
-- exceed "calculator"), every mainline stage here is a strict subset of the one
-- above. The mainline is:
--   Sessions -> Engaged -> Clicked a FORM-bound CTA -> Started form -> Submitted
-- "Used calculator" is a BRANCH off Engaged (not a mainline step).
--
-- A form-bound CTA = cta_click whose props.goal = 'form' (stamped by the site's
-- form-routing CTAs). Because real conversions / form-starts can skip an upstream
-- event (a lead may never fire form_start; a form_start may have no tracked CTA),
-- each stage uses "reached this stage OR anything downstream" so the funnel stays
-- monotonic without ever dropping a genuine conversion.
--
-- Session filter matches the live funnel (is_bot = false; loosened from
-- human_confirmed in 20260605000004). NULL country -> 'XX' so legacy rows stay
-- selectable and an "All countries" sum stays whole.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW public.vw_web_funnel_daily_v2 AS
WITH base AS (
  SELECT
    s.site_key,
    s.started_at::date                                                             AS date,
    COALESCE(s.country, 'XX')                                                       AS country,
    s.session_id,
    (s.engaged_ms >= 10000)                                                         AS is_engaged,
    (s.lead_id IS NOT NULL)                                                         AS is_converted,
    COALESCE(bool_or(e.event_name = 'calc_computed'), false)                        AS used_calc,
    COALESCE(bool_or(e.event_name = 'cta_click'
                     AND e.props->>'goal' = 'form'), false)                         AS clicked_form_cta,
    COALESCE(bool_or(e.event_name = 'form_start'), false)                           AS started_form
  FROM public.web_sessions s
  LEFT JOIN public.web_events e
    ON e.session_id = s.session_id AND e.is_bot = false
  WHERE s.is_bot = false
  GROUP BY s.site_key, s.started_at::date, COALESCE(s.country, 'XX'),
           s.session_id, s.engaged_ms, s.lead_id
),
flags AS (
  -- downstream implies upstream: define from the bottom up so each stage is a
  -- strict superset of the stage below it.
  SELECT
    site_key, date, country, session_id,
    is_converted                                                       AS f_converted,
    (started_form      OR is_converted)                                AS f_form_start,
    (clicked_form_cta  OR started_form OR is_converted)                AS f_form_cta,
    used_calc                                                          AS f_calc,        -- branch
    (is_engaged OR clicked_form_cta OR started_form
                OR is_converted OR used_calc)                          AS f_engaged
  FROM base
)
SELECT
  site_key, date, country,
  COUNT(*)                                  AS sessions,
  COUNT(*) FILTER (WHERE f_engaged)         AS engaged_sessions,
  COUNT(*) FILTER (WHERE f_calc)            AS calc_sessions,        -- BRANCH off engaged
  COUNT(*) FILTER (WHERE f_form_cta)        AS form_cta_sessions,    -- mainline
  COUNT(*) FILTER (WHERE f_form_start)      AS form_start_sessions,
  COUNT(*) FILTER (WHERE f_converted)       AS converted_sessions
FROM flags
GROUP BY site_key, date, country;

COMMENT ON VIEW public.vw_web_funnel_daily_v2 IS
  'Per (site_key, date, country) TRUE nested funnel: sessions >= engaged >= form_cta >= form_start >= converted, with calc_sessions as a branch off engaged (<= engaged). form_cta counts sessions clicking a form-bound CTA (props.goal=form) OR reaching any later stage. country=XX for legacy NULL-geo rows. Powers the dashboard funnel; the old vw_web_funnel_daily is kept for the python funnel detector.';

-- ----------------------------------------------------------------------------
-- 2. vw_calculator_conversion_geo — vw_calculator_conversion + a country dim.
--    country lives on the session, so we join web_sessions and group by it.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW public.vw_calculator_conversion_geo AS
WITH calc AS (
  SELECT
    e.site_key,
    COALESCE(s.country, 'XX')                                                       AS country,
    e.props->>'calculator_slug'                                                     AS calculator_slug,
    COUNT(DISTINCT e.session_id) FILTER (WHERE e.event_name = 'calc_view')          AS viewed,
    COUNT(DISTINCT e.session_id) FILTER (WHERE e.event_name = 'calc_computed')       AS computed,
    COUNT(DISTINCT e.session_id) FILTER (WHERE e.event_name = 'calc_result_viewed')  AS result_viewed,
    COUNT(DISTINCT e.session_id) FILTER (WHERE e.event_name = 'embed_cta_click')     AS embed_cta_clicks
  FROM public.web_events e
  JOIN public.web_sessions s ON s.session_id = e.session_id
  WHERE e.is_bot = false AND e.props ? 'calculator_slug'
  GROUP BY e.site_key, COALESCE(s.country, 'XX'), e.props->>'calculator_slug'
),
calc_leads AS (
  SELECT
    e.site_key,
    COALESCE(s.country, 'XX')      AS country,
    e.props->>'calculator_slug'    AS calculator_slug,
    COUNT(DISTINCT e.session_id)    AS lead_sessions
  FROM public.web_events e
  JOIN public.web_sessions s ON s.session_id = e.session_id
  WHERE e.is_bot = false AND e.props ? 'calculator_slug' AND s.lead_id IS NOT NULL
  GROUP BY e.site_key, COALESCE(s.country, 'XX'), e.props->>'calculator_slug'
)
SELECT
  calc.site_key, calc.country, calc.calculator_slug,
  calc.viewed, calc.computed, calc.result_viewed, calc.embed_cta_clicks,
  COALESCE(cl.lead_sessions, 0)                                                        AS lead_sessions,
  CASE WHEN calc.viewed   > 0 THEN calc.computed::numeric / calc.viewed::numeric END   AS compute_rate,
  CASE WHEN calc.computed > 0 THEN COALESCE(cl.lead_sessions,0)::numeric / calc.computed::numeric END AS computed_to_lead_rate
FROM calc
LEFT JOIN calc_leads cl
  ON cl.site_key = calc.site_key AND cl.country = calc.country AND cl.calculator_slug = calc.calculator_slug;

COMMENT ON VIEW public.vw_calculator_conversion_geo IS
  'Country-aware twin of vw_calculator_conversion (adds country dim via web_sessions join). Dashboard reads this; the python calculator-abandon detector keeps the original.';

-- ----------------------------------------------------------------------------
-- 3. vw_calculator_conversion_placement_geo — placement view + a country dim.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW public.vw_calculator_conversion_placement_geo AS
WITH calc AS (
  SELECT
    e.site_key,
    COALESCE(s.country, 'XX')                                                    AS country,
    e.props->>'calculator_slug'                                                  AS calculator_slug,
    COALESCE(e.props->>'placement', 'unknown')                                   AS placement,
    COALESCE(e.props->>'tool_kind', 'standard')                                  AS tool_kind,
    COUNT(DISTINCT e.session_id) FILTER (WHERE e.event_name = 'calc_view')          AS viewed,
    COUNT(DISTINCT e.session_id) FILTER (WHERE e.event_name = 'calc_computed')      AS computed,
    COUNT(DISTINCT e.session_id) FILTER (WHERE e.event_name = 'calc_result_viewed') AS result_viewed
  FROM public.web_events e
  JOIN public.web_sessions s ON s.session_id = e.session_id
  WHERE e.is_bot = false AND e.props ? 'calculator_slug'
  GROUP BY e.site_key, COALESCE(s.country, 'XX'), e.props->>'calculator_slug',
           COALESCE(e.props->>'placement', 'unknown'),
           COALESCE(e.props->>'tool_kind', 'standard')
),
calc_leads AS (
  SELECT
    e.site_key,
    COALESCE(s.country, 'XX')                   AS country,
    e.props->>'calculator_slug'                 AS calculator_slug,
    COALESCE(e.props->>'placement', 'unknown')  AS placement,
    COALESCE(e.props->>'tool_kind', 'standard') AS tool_kind,
    COUNT(DISTINCT e.session_id)                AS lead_sessions
  FROM public.web_events e
  JOIN public.web_sessions s ON s.session_id = e.session_id
  WHERE e.is_bot = false AND e.props ? 'calculator_slug' AND s.lead_id IS NOT NULL
  GROUP BY e.site_key, COALESCE(s.country, 'XX'), e.props->>'calculator_slug',
           COALESCE(e.props->>'placement', 'unknown'),
           COALESCE(e.props->>'tool_kind', 'standard')
)
SELECT
  calc.site_key, calc.country, calc.calculator_slug, calc.placement, calc.tool_kind,
  calc.viewed, calc.computed, calc.result_viewed,
  COALESCE(cl.lead_sessions, 0)                                                        AS lead_sessions,
  CASE WHEN calc.viewed   > 0 THEN calc.computed::numeric / calc.viewed::numeric END   AS compute_rate,
  CASE WHEN calc.computed > 0 THEN COALESCE(cl.lead_sessions,0)::numeric / calc.computed::numeric END AS computed_to_lead_rate
FROM calc
LEFT JOIN calc_leads cl
  ON  cl.site_key        = calc.site_key
  AND cl.country         = calc.country
  AND cl.calculator_slug = calc.calculator_slug
  AND cl.placement       = calc.placement
  AND cl.tool_kind       = calc.tool_kind;

COMMENT ON VIEW public.vw_calculator_conversion_placement_geo IS
  'Country-aware twin of vw_calculator_conversion_placement. Dashboard-only.';

-- ----------------------------------------------------------------------------
-- 4. vw_form_field_dropoff_geo — form-field focus/abandon/error + a country dim.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW public.vw_form_field_dropoff_geo AS
SELECT
  e.site_key,
  COALESCE(s.country, 'XX')                                                   AS country,
  e.props->>'form_id'                                                         AS form_id,
  e.props->>'field'                                                           AS field,
  COUNT(*) FILTER (WHERE e.event_name = 'form_field_focus')                   AS focuses,
  COUNT(*) FILTER (WHERE e.event_name = 'form_field_abandon')                 AS abandons,
  COUNT(*) FILTER (WHERE e.event_name = 'form_error')                         AS errors,
  CASE WHEN COUNT(*) FILTER (WHERE e.event_name = 'form_field_focus') > 0
    THEN COUNT(*) FILTER (WHERE e.event_name = 'form_field_abandon')::numeric
       / COUNT(*) FILTER (WHERE e.event_name = 'form_field_focus')::numeric
    ELSE NULL END                                                            AS abandon_rate
FROM public.web_events e
JOIN public.web_sessions s ON s.session_id = e.session_id
WHERE e.is_bot = false
  AND e.event_name IN ('form_field_focus', 'form_field_abandon', 'form_error')
  AND e.props ? 'field'
GROUP BY e.site_key, COALESCE(s.country, 'XX'), e.props->>'form_id', e.props->>'field';

COMMENT ON VIEW public.vw_form_field_dropoff_geo IS
  'Country-aware twin of vw_form_field_dropoff (where users abandon the lead form, field by field). Dashboard reads this; the python form-abandon detector keeps the original.';

-- ----------------------------------------------------------------------------
-- 5. vw_section_engagement_geo — which article sections get read + a country dim.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW public.vw_section_engagement_geo AS
SELECT
  e.site_key,
  COALESCE(s.country, 'XX')        AS country,
  e.page_path,
  e.props->>'section_id'           AS section_id,
  MAX(e.props->>'section_text')    AS section_text,
  COUNT(*)                         AS views,
  COUNT(DISTINCT e.session_id)     AS sessions
FROM public.web_events e
JOIN public.web_sessions s ON s.session_id = e.session_id
WHERE e.is_bot = false AND e.event_name = 'section_view'
GROUP BY e.site_key, COALESCE(s.country, 'XX'), e.page_path, e.props->>'section_id';

COMMENT ON VIEW public.vw_section_engagement_geo IS
  'Country-aware twin of vw_section_engagement. Dashboard-only (was previously unwired).';

-- ----------------------------------------------------------------------------
-- Grants + PostgREST reload
-- ----------------------------------------------------------------------------
GRANT SELECT ON public.vw_web_funnel_daily_v2                  TO authenticated;
GRANT SELECT ON public.vw_calculator_conversion_geo           TO authenticated;
GRANT SELECT ON public.vw_calculator_conversion_placement_geo TO authenticated;
GRANT SELECT ON public.vw_form_field_dropoff_geo              TO authenticated;
GRANT SELECT ON public.vw_section_engagement_geo              TO authenticated;

NOTIFY pgrst, 'reload schema';
