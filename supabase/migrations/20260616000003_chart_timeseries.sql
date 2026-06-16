-- ============================================================================
-- Migration: 20260616000003_chart_timeseries.sql
-- Date: 2026-06-16
-- Purpose: power the new chart work.
--   1. web_timeseries  — LEADS are now counted straight from the leads table,
--      ALL countries, with NO session/stitch requirement (so historical and
--      unstitched leads show). Sessions/humans stay country-scoped. Fixes the
--      leads line under-counting (Property 30d showed ~10 of 25 real leads).
--   2. estate_timeseries — NEW: estate-wide (all sites) bucketed series for the
--      home page, which currently has no charts. Visitors/sessions scoped to
--      p_country (default GB, matching the cards); leads all-countries.
-- Both read-only (STABLE, SECURITY DEFINER), additive / reversible.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. web_timeseries — leads decoupled from p_country (all-countries, unstitched
--    included). Return-type unchanged; DROP+CREATE to swap the body cleanly.
-- ----------------------------------------------------------------------------
DROP FUNCTION IF EXISTS public.web_timeseries(text, text, timestamptz, timestamptz, text);

CREATE OR REPLACE FUNCTION public.web_timeseries(
  p_site_key text,
  p_bucket text,         -- '15 minutes' | '1 hour' | '1 day'
  p_from timestamptz,
  p_to timestamptz,
  p_country text DEFAULT null
)
RETURNS TABLE(bucket timestamptz, sessions bigint, humans bigint, events bigint, leads bigint)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
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
           count(*)                   AS events,
           count(DISTINCT session_id) AS sessions,
           count(DISTINCT visitor_id) AS humans
    FROM evt GROUP BY b
  ),
  lead_agg AS (
    -- ALL countries, counted from the leads table directly (no session/stitch
    -- requirement). Independent of p_country by design.
    SELECT
      to_timestamp(floor(extract(epoch FROM l.created_at) / (SELECT s FROM secs)) * (SELECT s FROM secs)) AS b,
      count(*) AS leads
    FROM public.leads l
    WHERE l.source = p_site_key
      AND l.created_at >= p_from AND l.created_at < p_to
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

-- ----------------------------------------------------------------------------
-- 2. estate_timeseries — all-sites bucketed series for the estate home page.
--    sessions = distinct human sessions; humans = distinct (site,visitor) pairs
--    (per-site visitor ids summed); both scoped to p_country (default GB).
--    leads = all sites, all countries, straight from the leads table.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.estate_timeseries(
  p_bucket text,
  p_from timestamptz,
  p_to timestamptz,
  p_country text DEFAULT 'GB'   -- 'GB' default | ISO code | 'ALL'/NULL = all
)
RETURNS TABLE(bucket timestamptz, sessions bigint, humans bigint, leads bigint)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  WITH secs AS (SELECT greatest(extract(epoch FROM p_bucket::interval), 1) AS s),
  evt AS (
    SELECT
      to_timestamp(floor(extract(epoch FROM e.ts) / (SELECT s FROM secs)) * (SELECT s FROM secs)) AS b,
      e.site_key, e.session_id, e.visitor_id
    FROM public.web_events e
    JOIN public.web_sessions ws ON ws.session_id = e.session_id
    WHERE e.is_bot = false
      AND e.ts >= p_from AND e.ts < p_to
      AND (p_country IS NULL OR p_country = 'ALL' OR ws.country = p_country)
  ),
  ev_agg AS (
    SELECT b,
           count(DISTINCT session_id)            AS sessions,
           count(DISTINCT (site_key, visitor_id)) AS humans
    FROM evt GROUP BY b
  ),
  lead_agg AS (
    SELECT
      to_timestamp(floor(extract(epoch FROM l.created_at) / (SELECT s FROM secs)) * (SELECT s FROM secs)) AS b,
      count(*) AS leads
    FROM public.leads l
    WHERE l.created_at >= p_from AND l.created_at < p_to
    GROUP BY b
  )
  SELECT
    coalesce(ea.b, la.b)        AS bucket,
    coalesce(ea.sessions, 0)    AS sessions,
    coalesce(ea.humans, 0)      AS humans,
    coalesce(la.leads, 0)       AS leads
  FROM ev_agg ea
  FULL OUTER JOIN lead_agg la ON ea.b = la.b
  ORDER BY bucket;
$$;

COMMENT ON FUNCTION public.estate_timeseries(text, timestamptz, timestamptz, text) IS
  'Estate-wide (all sites) bucketed series for the home page. sessions/humans scoped to p_country (default GB); leads all-countries from the leads table.';

GRANT EXECUTE ON FUNCTION public.estate_timeseries(text, timestamptz, timestamptz, text) TO authenticated, service_role;

NOTIFY pgrst, 'reload schema';
