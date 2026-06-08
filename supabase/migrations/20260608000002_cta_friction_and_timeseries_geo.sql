-- ============================================================================
-- Migration: 20260608000002_cta_friction_and_timeseries_geo.sql
-- Date: 2026-06-08
-- Purpose: Light up captured-but-dark data on the admin dashboard —
--   * vw_cta_performance : which CTAs actually drive form starts vs dead-end
--   * vw_ux_friction     : rage/dead clicks, JS errors, exit-intent per page
--   * web_timeseries     : gains an optional p_country filter (trends sub-page)
-- All country-aware so the GB-default slicer reaches them. ADDITIVE / safe.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. vw_cta_performance — per (site_key, country, cta_id): clicks, distinct
--    clicking sessions, how many of those sessions went on to start a form, and
--    how many converted. Surfaces dead-end CTAs (e.g. baseline showed most
--    cta_click events are actually *_close dismiss buttons) and form-driving
--    ones. `goal` carries the form-bound tag (props.goal) once the site emits it.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW public.vw_cta_performance AS
WITH clicks AS (
  SELECT
    e.site_key,
    COALESCE(s.country, 'XX')        AS country,
    e.props->>'cta_id'               AS cta_id,
    MAX(e.props->>'goal')            AS goal,
    COUNT(*)                         AS clicks,
    COUNT(DISTINCT e.session_id)     AS click_sessions
  FROM public.web_events e
  JOIN public.web_sessions s ON s.session_id = e.session_id
  WHERE e.is_bot = false AND e.event_name = 'cta_click' AND e.props ? 'cta_id'
  GROUP BY e.site_key, COALESCE(s.country, 'XX'), e.props->>'cta_id'
),
to_form AS (
  SELECT
    e.site_key,
    COALESCE(s.country, 'XX')        AS country,
    e.props->>'cta_id'               AS cta_id,
    COUNT(DISTINCT e.session_id)     AS form_start_sessions
  FROM public.web_events e
  JOIN public.web_sessions s ON s.session_id = e.session_id
  WHERE e.is_bot = false AND e.event_name = 'cta_click' AND e.props ? 'cta_id'
    AND EXISTS (
      SELECT 1 FROM public.web_events f
      WHERE f.session_id = e.session_id AND f.is_bot = false AND f.event_name = 'form_start'
    )
  GROUP BY e.site_key, COALESCE(s.country, 'XX'), e.props->>'cta_id'
),
to_lead AS (
  SELECT
    e.site_key,
    COALESCE(s.country, 'XX')        AS country,
    e.props->>'cta_id'               AS cta_id,
    COUNT(DISTINCT e.session_id)     AS lead_sessions
  FROM public.web_events e
  JOIN public.web_sessions s ON s.session_id = e.session_id
  WHERE e.is_bot = false AND e.event_name = 'cta_click' AND e.props ? 'cta_id'
    AND s.lead_id IS NOT NULL
  GROUP BY e.site_key, COALESCE(s.country, 'XX'), e.props->>'cta_id'
)
SELECT
  c.site_key, c.country, c.cta_id, c.goal,
  c.clicks, c.click_sessions,
  COALESCE(f.form_start_sessions, 0)   AS form_start_sessions,
  COALESCE(l.lead_sessions, 0)         AS lead_sessions,
  CASE WHEN c.click_sessions > 0
       THEN COALESCE(f.form_start_sessions, 0)::numeric / c.click_sessions::numeric END AS click_to_form_rate
FROM clicks c
LEFT JOIN to_form f ON f.site_key = c.site_key AND f.country = c.country AND f.cta_id = c.cta_id
LEFT JOIN to_lead l ON l.site_key = c.site_key AND l.country = c.country AND l.cta_id = c.cta_id;

COMMENT ON VIEW public.vw_cta_performance IS
  'Per (site_key, country, cta_id) CTA effectiveness: clicks, distinct clicking sessions, sessions that later started a form (click_to_form_rate) and converted. goal=form marks form-bound CTAs. Exposes dead-end CTAs vs form-drivers.';

-- ----------------------------------------------------------------------------
-- 2. vw_ux_friction — per (site_key, country, page_path) friction signals that
--    silently hurt conversion: rage clicks, dead clicks, JS errors, plus
--    exit-intent impressions. Captured today, never surfaced.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW public.vw_ux_friction AS
SELECT
  e.site_key,
  COALESCE(s.country, 'XX')        AS country,
  e.page_path,
  COUNT(*) FILTER (WHERE e.event_name = 'rage_click')        AS rage_clicks,
  COUNT(*) FILTER (WHERE e.event_name = 'dead_click')        AS dead_clicks,
  COUNT(*) FILTER (WHERE e.event_name = 'client_error')      AS client_errors,
  COUNT(*) FILTER (WHERE e.event_name = 'exit_intent_shown') AS exit_intent_shown,
  COUNT(DISTINCT e.session_id) FILTER (
    WHERE e.event_name IN ('rage_click', 'dead_click', 'client_error')
  )                                                          AS friction_sessions
FROM public.web_events e
JOIN public.web_sessions s ON s.session_id = e.session_id
WHERE e.is_bot = false
  AND e.event_name IN ('rage_click', 'dead_click', 'client_error', 'exit_intent_shown')
GROUP BY e.site_key, COALESCE(s.country, 'XX'), e.page_path;

COMMENT ON VIEW public.vw_ux_friction IS
  'Per (site_key, country, page_path) UX friction: rage/dead clicks, client_error, exit_intent_shown, and distinct friction sessions. Surfaces broken/confusing spots.';

-- ----------------------------------------------------------------------------
-- 3. web_timeseries — add an optional p_country filter. The old 4-arg signature
--    is dropped and replaced with a 5-arg one whose p_country DEFAULTs to null
--    (= all countries), so existing 4-named-arg PostgREST calls keep binding.
-- ----------------------------------------------------------------------------
DROP FUNCTION IF EXISTS public.web_timeseries(text, text, timestamptz, timestamptz);

CREATE OR REPLACE FUNCTION public.web_timeseries(
  p_site_key text,
  p_bucket text,         -- '15 minutes' | '1 hour' | '1 day'
  p_from timestamptz,
  p_to timestamptz,
  p_country text DEFAULT null   -- null = all countries; else ISO code (GB)
)
returns table(bucket timestamptz, sessions bigint, events bigint, leads bigint)
language sql
stable
security definer
set search_path = public
as $$
  with secs as (select greatest(extract(epoch from p_bucket::interval), 1) as s),
  evt as (
    select
      to_timestamp(floor(extract(epoch from e.ts) / (select s from secs)) * (select s from secs)) as b,
      e.session_id
    from public.web_events e
    join public.web_sessions ws on ws.session_id = e.session_id
    where e.site_key = p_site_key
      and e.is_bot = false
      and e.ts >= p_from and e.ts < p_to
      and (p_country is null or ws.country = p_country)
  ),
  ev_agg as (
    select b, count(*) as events, count(distinct session_id) as sessions
    from evt group by b
  ),
  lead_agg as (
    select
      to_timestamp(floor(extract(epoch from l.created_at) / (select s from secs)) * (select s from secs)) as b,
      count(*) as leads
    from public.leads l
    where l.source = p_site_key
      and l.created_at >= p_from and l.created_at < p_to
      -- leads carry no country; when a country is selected, scope them via the
      -- converting session's geo so the trend matches the rest of the dashboard.
      and (
        p_country is null
        or exists (
          select 1 from public.web_sessions ws2
          where ws2.lead_id = l.id and ws2.country = p_country
        )
      )
    group by b
  )
  select
    coalesce(ea.b, la.b)        as bucket,
    coalesce(ea.sessions, 0)    as sessions,
    coalesce(ea.events, 0)      as events,
    coalesce(la.leads, 0)       as leads
  from ev_agg ea
  full outer join lead_agg la on ea.b = la.b
  order by bucket;
$$;

grant execute on function public.web_timeseries(text, text, timestamptz, timestamptz, text) to authenticated;

NOTIFY pgrst, 'reload schema';
