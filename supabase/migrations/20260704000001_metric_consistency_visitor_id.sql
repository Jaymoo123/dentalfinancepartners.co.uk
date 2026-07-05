-- ============================================================================
-- Migration: 20260704000001_metric_consistency_visitor_id.sql
-- Date: 2026-07-04
-- Purpose: make the console's "Visitors" number CONSISTENT and ACCURATE across
--   every surface (estate cards, estate trends chart, site-comparison overlay,
--   per-site cards + trends).
--
-- ROOT CAUSE (diagnosed 2026-07-04 against live prod):
--   The KPI cards count distinct visitors via estate_kpis() over web_sessions
--   (one canonical visitor_id per session). The time-series CHARTS count
--   `count(DISTINCT visitor_id)` over web_events using the EVENT-level
--   visitor_id. A single misbehaving client (bot / privacy tool / broken tracker)
--   can rotate its localStorage visitor_id on almost every event, so ONE session
--   emits many distinct event-level visitor_ids. Example (property, 2026-07-04
--   07:15 UTC): 1 session fired 20 events carrying 20 different visitor_ids, so
--   the 15-min chart bucket read 24 "visitors" when there were 5 real people.
--   Whole day: 940 events -> 51 distinct EVENT visitor_ids but only 32 distinct
--   SESSION visitor_ids. The 19-visitor gap was entirely this churn (the 19
--   inflated ids never correspond to any real session).
--
-- FIX (measurement-side, lossless, reversible):
--   In web_timeseries() and estate_timeseries(), dedup visitors by the joined
--   SESSION's canonical visitor_id (ws.visitor_id) instead of the raw event
--   visitor_id, and gate on the session's is_bot (ws.is_bot, the reclassifier-
--   corrected flag) to match the cards exactly. Verified read-only: after this
--   change the charts equal the cards for property AND estate across today / 7d /
--   30d (e.g. property today 32 not 51; estate today 45 not 64).
--
--   estate_kpis() is UNCHANGED — the cards were already correct.
--   Session counts are unchanged (session_id is stable; only visitor_id churned).
--
-- Not addressed here (documented follow-ups): (a) hardening /api/track to stamp
--   web_events.visitor_id from the session's canonical id so the RAW data is
--   trustworthy too; (b) enforcing p_country default inside web_timeseries (all
--   current callers already pass 'GB'). Neither is needed to reconcile the UI.
--
-- Both functions are STABLE / SECURITY DEFINER, read-only. Reversible: re-running
-- the prior definition (20260616000003) restores the old behaviour.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. web_timeseries — per-site bucketed series. Only the `evt` CTE changes:
--    select ws.visitor_id (session-canonical, churn-proof) and gate ws.is_bot.
--    Return type + args identical to 20260616000003, so CREATE OR REPLACE swaps
--    the body with zero downtime (no DROP window where the function is missing).
-- ----------------------------------------------------------------------------
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
      ws.visitor_id                       -- CHANGED: session-canonical id (was e.visitor_id)
    FROM public.web_events e
    JOIN public.web_sessions ws ON ws.session_id = e.session_id
    WHERE e.site_key = p_site_key
      AND ws.is_bot = false               -- CHANGED: session-level bot gate (was e.is_bot)
      AND e.ts >= p_from AND e.ts < p_to
      AND (p_country IS NULL OR ws.country = p_country)
  ),
  ev_agg AS (
    SELECT b,
           count(*)                   AS events,
           count(DISTINCT session_id) AS sessions,
           count(DISTINCT visitor_id) AS humans   -- now distinct SESSION visitor_id
    FROM evt GROUP BY b
  ),
  lead_agg AS (
    -- ALL countries, counted from the leads table directly (no session/stitch
    -- requirement). Independent of p_country by design. (unchanged)
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
-- 2. estate_timeseries — all-sites bucketed series. Same `evt` CTE change:
--    ws.visitor_id + ws.is_bot gate. humans = distinct (site_key, visitor_id).
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
      e.site_key,
      e.session_id,
      ws.visitor_id                       -- CHANGED: session-canonical id (was e.visitor_id)
    FROM public.web_events e
    JOIN public.web_sessions ws ON ws.session_id = e.session_id
    WHERE ws.is_bot = false               -- CHANGED: session-level bot gate (was e.is_bot)
      AND e.ts >= p_from AND e.ts < p_to
      AND (p_country IS NULL OR p_country = 'ALL' OR ws.country = p_country)
  ),
  ev_agg AS (
    SELECT b,
           count(DISTINCT session_id)             AS sessions,
           count(DISTINCT (site_key, visitor_id)) AS humans   -- now session visitor_id
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
  'Estate-wide (all sites) bucketed series for the home page. Visitors deduped by the session-canonical visitor_id (churn-proof) and gated on ws.is_bot to match estate_kpis cards. sessions/humans scoped to p_country (default GB); leads all-countries from the leads table.';

GRANT EXECUTE ON FUNCTION public.estate_timeseries(text, timestamptz, timestamptz, text) TO authenticated, service_role;

NOTIFY pgrst, 'reload schema';
