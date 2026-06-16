-- ============================================================================
-- Migration: 20260616000001_dashboard_humans_kpis.sql
-- Date: 2026-06-16
-- Purpose: Humans-first KPIs for the estate console.
--   1. estate_kpis()    — per (site_key) distinct-HUMAN counts + leads (UK / all)
--                         over an exact [p_from, p_to) window. Powers both the
--                         home KPI strip (all sites) and the per-site cards
--                         (p_site_key). Sessions inflate per returning human;
--                         this surfaces real people, new people, and human
--                         conversion instead.
--   2. web_timeseries() — gains a `humans` column (distinct visitor_id per
--                         bucket) so the Trends page can chart real visitors,
--                         not just sessions.
--
-- Both are READ-ONLY (SECURITY DEFINER, STABLE) and ADDITIVE / reversible.
-- Human filter matches the rest of the dashboard: is_bot = false.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. estate_kpis(p_from, p_to, p_site_key default null)
--
--    sessions          = distinct human sessions started in the window
--    humans            = distinct human visitors with a session in the window
--    new_humans        = of those, visitors whose FIRST-EVER session (any time)
--                        falls in the window  (so "new" = genuinely first-time)
--    converted_humans  = distinct in-window visitors whose in-window session
--                        carries a lead (lead_id IS NOT NULL)
--    leads_all         = leads created in the window for the site
--    leads_uk          = leads_all scoped to a GB session via session_id or
--                        visitor_id. Unstitched leads (no GB session match)
--                        count in leads_all only.
--
--    p_site_key NULL => every site (home strip). Else a single site.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.estate_kpis(
  p_from timestamptz,
  p_to timestamptz,
  p_site_key text DEFAULT null
)
RETURNS TABLE(
  site_key text,
  sessions bigint,
  humans bigint,
  new_humans bigint,
  converted_humans bigint,
  leads_all bigint,
  leads_uk bigint
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH win AS (
    -- human sessions started inside the window (one row per session)
    SELECT
      s.site_key,
      s.visitor_id,
      s.session_id,
      (s.lead_id IS NOT NULL) AS session_converted
    FROM public.web_sessions s
    WHERE s.is_bot = false
      AND s.started_at >= p_from AND s.started_at < p_to
      AND (p_site_key IS NULL OR s.site_key = p_site_key)
  ),
  firsts AS (
    -- first-ever session per (site, visitor), across ALL time (drives "new")
    SELECT s.site_key, s.visitor_id, MIN(s.started_at) AS first_ever
    FROM public.web_sessions s
    WHERE s.is_bot = false
      AND (p_site_key IS NULL OR s.site_key = p_site_key)
    GROUP BY s.site_key, s.visitor_id
  ),
  per_visitor AS (
    SELECT
      w.site_key,
      w.visitor_id,
      bool_or(w.session_converted) AS converted,
      MAX(f.first_ever)            AS first_ever
    FROM win w
    LEFT JOIN firsts f USING (site_key, visitor_id)
    GROUP BY w.site_key, w.visitor_id
  ),
  sess AS (
    SELECT site_key, COUNT(DISTINCT session_id) AS sessions
    FROM win
    GROUP BY site_key
  ),
  vis AS (
    SELECT
      site_key,
      COUNT(*)                                          AS humans,
      COUNT(*) FILTER (WHERE first_ever >= p_from)       AS new_humans,
      COUNT(*) FILTER (WHERE converted)                  AS converted_humans
    FROM per_visitor
    GROUP BY site_key
  ),
  ld AS (
    SELECT
      l.source AS site_key,
      COUNT(*) AS leads_all,
      COUNT(*) FILTER (
        WHERE EXISTS (
          SELECT 1 FROM public.web_sessions ws
          WHERE (ws.session_id = l.session_id OR ws.visitor_id = l.visitor_id)
            AND ws.country = 'GB'
        )
      ) AS leads_uk
    FROM public.leads l
    WHERE l.created_at >= p_from AND l.created_at < p_to
      AND (p_site_key IS NULL OR l.source = p_site_key)
    GROUP BY l.source
  ),
  sites_u AS (
    SELECT site_key FROM sess
    UNION
    SELECT site_key FROM ld
  )
  SELECT
    su.site_key,
    COALESCE(sess.sessions, 0)          AS sessions,
    COALESCE(vis.humans, 0)             AS humans,
    COALESCE(vis.new_humans, 0)         AS new_humans,
    COALESCE(vis.converted_humans, 0)   AS converted_humans,
    COALESCE(ld.leads_all, 0)           AS leads_all,
    COALESCE(ld.leads_uk, 0)            AS leads_uk
  FROM sites_u su
  LEFT JOIN sess ON sess.site_key = su.site_key
  LEFT JOIN vis  ON vis.site_key  = su.site_key
  LEFT JOIN ld   ON ld.site_key   = su.site_key;
$$;

COMMENT ON FUNCTION public.estate_kpis(timestamptz, timestamptz, text) IS
  'Per-site humans-first KPIs over [p_from,p_to): distinct human sessions, distinct visitors, new (first-ever-in-window) visitors, converted visitors, and leads (all vs GB-scoped). p_site_key NULL = all sites. Powers the estate KPI strip and the per-site cards.';

GRANT EXECUTE ON FUNCTION public.estate_kpis(timestamptz, timestamptz, text) TO authenticated, service_role;

-- ----------------------------------------------------------------------------
-- 2. web_timeseries — add `humans` (distinct visitor_id per bucket).
--    Return-type change => DROP + CREATE. Signature, country logic and lead
--    scoping are otherwise byte-for-byte the prior 5-arg version.
-- ----------------------------------------------------------------------------
DROP FUNCTION IF EXISTS public.web_timeseries(text, text, timestamptz, timestamptz, text);

CREATE OR REPLACE FUNCTION public.web_timeseries(
  p_site_key text,
  p_bucket text,         -- '15 minutes' | '1 hour' | '1 day'
  p_from timestamptz,
  p_to timestamptz,
  p_country text DEFAULT null   -- null = all countries; else ISO code (GB)
)
RETURNS TABLE(bucket timestamptz, sessions bigint, humans bigint, events bigint, leads bigint)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH secs AS (SELECT greatest(extract(epoch FROM p_bucket::interval), 1) AS s),
  evt AS (
    SELECT
      to_timestamp(floor(extract(epoch FROM e.ts) / (SELECT s FROM secs)) * (SELECT s FROM secs)) AS b,
      e.session_id,
      e.visitor_id
    FROM public.web_events e
    JOIN public.web_sessions ws ON ws.session_id = e.session_id
    WHERE e.site_key = p_site_key
      AND e.is_bot = false
      AND e.ts >= p_from AND e.ts < p_to
      AND (p_country IS NULL OR ws.country = p_country)
  ),
  ev_agg AS (
    SELECT b,
           count(*)                    AS events,
           count(DISTINCT session_id)  AS sessions,
           count(DISTINCT visitor_id)  AS humans
    FROM evt GROUP BY b
  ),
  lead_agg AS (
    SELECT
      to_timestamp(floor(extract(epoch FROM l.created_at) / (SELECT s FROM secs)) * (SELECT s FROM secs)) AS b,
      count(*) AS leads
    FROM public.leads l
    WHERE l.source = p_site_key
      AND l.created_at >= p_from AND l.created_at < p_to
      AND (
        p_country IS NULL
        OR EXISTS (
          SELECT 1 FROM public.web_sessions ws2
          WHERE ws2.lead_id = l.id AND ws2.country = p_country
        )
      )
    GROUP BY b
  )
  SELECT
    coalesce(ea.b, la.b)        AS bucket,
    coalesce(ea.sessions, 0)    AS sessions,
    coalesce(ea.humans, 0)      AS humans,
    coalesce(ea.events, 0)      AS events,
    coalesce(la.leads, 0)       AS leads
  FROM ev_agg ea
  FULL OUTER JOIN lead_agg la ON ea.b = la.b
  ORDER BY bucket;
$$;

GRANT EXECUTE ON FUNCTION public.web_timeseries(text, text, timestamptz, timestamptz, text) TO authenticated, service_role;

NOTIFY pgrst, 'reload schema';
