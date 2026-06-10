-- ============================================================================
-- Migration: 20260608000003_dashboard_trackers.sql
-- Date: 2026-06-08
-- Purpose: Back the glance-first dashboard redesign —
--   * web_event_daily   : generic per-event daily rollup (drives sparklines)
--   * vw_client_errors  : JS errors grouped by message (actionable, not a URL dump)
--   * vw_section_action : per article section, did reading it lead to an action
-- All country-aware (GB-default slicer). ADDITIVE / prod-safe; nothing existing
-- is touched.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. web_event_daily — daily count + distinct sessions for ONE event_name over a
--    window, optionally scoped to a country. One RPC powers every per-event
--    sparkline (errors/day today; CTA/day, section/day later). Days with no
--    events are simply absent — the caller densifies into a continuous series.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.web_event_daily(
  p_site_key text,
  p_event_name text,
  p_from timestamptz,
  p_to timestamptz,
  p_country text DEFAULT null
)
returns table(bucket date, count bigint, sessions bigint)
language sql
stable
security definer
set search_path = public
as $$
  select
    e.ts::date                       as bucket,
    count(*)                         as count,
    count(distinct e.session_id)     as sessions
  from public.web_events e
  join public.web_sessions ws on ws.session_id = e.session_id
  where e.site_key = p_site_key
    and e.is_bot = false
    and e.event_name = p_event_name
    and e.ts >= p_from and e.ts < p_to
    and (p_country is null or ws.country = p_country)
  group by e.ts::date
  order by bucket;
$$;

grant execute on function public.web_event_daily(text, text, timestamptz, timestamptz, text) to authenticated;

-- ----------------------------------------------------------------------------
-- 2. vw_client_errors — JS errors grouped by message/source/line/kind so they
--    are debuggable, not just a per-page count. props.message/source/line/kind
--    are stamped by autoCapture (window.onerror / unhandledrejection).
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW public.vw_client_errors AS
SELECT
  e.site_key,
  COALESCE(s.country, 'XX')                        AS country,
  COALESCE(NULLIF(e.props->>'message', ''), '(no message)') AS message,
  e.props->>'source'                               AS source,
  e.props->>'line'                                 AS line,
  COALESCE(e.props->>'kind', 'error')              AS kind,
  COUNT(*)                                         AS count,
  COUNT(DISTINCT e.session_id)                     AS sessions,
  MAX(e.page_path)                                 AS example_page,
  MAX(e.ts)                                        AS last_seen
FROM public.web_events e
JOIN public.web_sessions s ON s.session_id = e.session_id
WHERE e.is_bot = false AND e.event_name = 'client_error'
GROUP BY e.site_key, COALESCE(s.country, 'XX'),
         COALESCE(NULLIF(e.props->>'message', ''), '(no message)'),
         e.props->>'source', e.props->>'line', COALESCE(e.props->>'kind', 'error');

COMMENT ON VIEW public.vw_client_errors IS
  'Per (site_key, country, message, source, line, kind) JS-error rollup: count, distinct sessions, an example page, last seen. Actionable error list for the dashboard (replaces the per-page URL dump).';

-- ----------------------------------------------------------------------------
-- 3. vw_section_action — per article section: how many sessions READ it, and of
--    those how many then took an action (clicked a CTA / started a form) AFTER
--    reading, and how many converted. Correlational (reading a section then
--    acting is not proof the section caused it) — the dashboard labels it so.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW public.vw_section_action AS
WITH reads AS (
  -- one row per (session, page, section): when they first saw it + whether the
  -- session converted overall.
  SELECT
    e.site_key,
    COALESCE(s.country, 'XX')        AS country,
    e.page_path,
    e.props->>'section_id'           AS section_id,
    e.session_id,
    MIN(e.ts)                        AS first_seen,
    MAX(e.props->>'section_text')    AS section_text,
    bool_or(s.lead_id IS NOT NULL)   AS converted
  FROM public.web_events e
  JOIN public.web_sessions s ON s.session_id = e.session_id
  WHERE e.is_bot = false AND e.event_name = 'section_view' AND e.props ? 'section_id'
  GROUP BY e.site_key, COALESCE(s.country, 'XX'), e.page_path, e.props->>'section_id', e.session_id
)
SELECT
  r.site_key,
  r.country,
  r.page_path,
  r.section_id,
  MAX(r.section_text)                              AS section_text,
  COUNT(*)                                         AS read_sessions,
  COUNT(*) FILTER (WHERE EXISTS (
    SELECT 1 FROM public.web_events a
    WHERE a.session_id = r.session_id
      AND a.is_bot = false
      AND a.event_name IN ('cta_click', 'form_start')
      AND a.ts >= r.first_seen
  ))                                               AS acted_sessions,
  COUNT(*) FILTER (WHERE r.converted)              AS converted_sessions
FROM reads r
GROUP BY r.site_key, r.country, r.page_path, r.section_id;

COMMENT ON VIEW public.vw_section_action IS
  'Per (site_key, country, page_path, section_id): read_sessions, acted_sessions (read then clicked a CTA / started a form), converted_sessions. Correlational — surfaces which sections precede action.';

NOTIFY pgrst, 'reload schema';
