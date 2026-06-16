-- ============================================================================
-- Migration: 20260616000002_estate_kpis_country.sql
-- Date: 2026-06-16
-- Purpose: estate_kpis() gains p_country (DEFAULT 'GB') so the estate
--   dashboard's AUDIENCE metrics (sessions / humans / new_humans /
--   converted_humans) reflect the real UK audience, not non-GB bot/crawler
--   noise. Diagnosed 2026-06-16: a UK niche site showed 52 "humans" where only
--   3 were GB — the other 49 were one-session-per-visitor_id non-GB crawlers
--   that slip past is_bot. The per-site dashboard already defaults to GB; this
--   brings the estate view into line.
--
--   LEADS stay split and are INDEPENDENT of p_country: leads_all = every
--   country, leads_uk = GB only (so both leads cards keep working at any scope).
--   p_country = 'ALL' or NULL => no country filter (all countries).
--
-- Return-type/arg change => DROP the 3-arg version, CREATE the 4-arg. Additive
-- to callers: the home page's 2-named-arg PostgREST call binds and defaults to GB.
-- ============================================================================
DROP FUNCTION IF EXISTS public.estate_kpis(timestamptz, timestamptz, text);

CREATE OR REPLACE FUNCTION public.estate_kpis(
  p_from timestamptz,
  p_to timestamptz,
  p_site_key text DEFAULT null,
  p_country text DEFAULT 'GB'   -- 'GB' (default) | ISO code | 'ALL'/NULL = all
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
    SELECT s.site_key, s.visitor_id, s.session_id, (s.lead_id IS NOT NULL) AS session_converted
    FROM public.web_sessions s
    WHERE s.is_bot = false
      AND s.started_at >= p_from AND s.started_at < p_to
      AND (p_site_key IS NULL OR s.site_key = p_site_key)
      AND (p_country IS NULL OR p_country = 'ALL' OR s.country = p_country)
  ),
  firsts AS (
    SELECT s.site_key, s.visitor_id, MIN(s.started_at) AS first_ever
    FROM public.web_sessions s
    WHERE s.is_bot = false
      AND (p_site_key IS NULL OR s.site_key = p_site_key)
      AND (p_country IS NULL OR p_country = 'ALL' OR s.country = p_country)
    GROUP BY s.site_key, s.visitor_id
  ),
  per_visitor AS (
    SELECT w.site_key, w.visitor_id,
           bool_or(w.session_converted) AS converted,
           MAX(f.first_ever)            AS first_ever
    FROM win w
    LEFT JOIN firsts f USING (site_key, visitor_id)
    GROUP BY w.site_key, w.visitor_id
  ),
  sess AS (
    SELECT site_key, COUNT(DISTINCT session_id) AS sessions FROM win GROUP BY site_key
  ),
  vis AS (
    SELECT site_key,
           COUNT(*)                                    AS humans,
           COUNT(*) FILTER (WHERE first_ever >= p_from) AS new_humans,
           COUNT(*) FILTER (WHERE converted)            AS converted_humans
    FROM per_visitor GROUP BY site_key
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
  sites_u AS (SELECT site_key FROM sess UNION SELECT site_key FROM ld)
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

COMMENT ON FUNCTION public.estate_kpis(timestamptz, timestamptz, text, text) IS
  'Per-site visitor-first KPIs over [p_from,p_to). Audience metrics (sessions/humans/new_humans/converted_humans) scoped to p_country (default GB; ALL or NULL = all countries) to exclude non-GB bot noise. leads_all = all countries, leads_uk = GB, both independent of p_country. p_site_key NULL = all sites.';

GRANT EXECUTE ON FUNCTION public.estate_kpis(timestamptz, timestamptz, text, text) TO authenticated, service_role;

NOTIFY pgrst, 'reload schema';
