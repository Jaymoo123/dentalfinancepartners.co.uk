-- ============================================================================
-- Migration: 20260707000002_web_timeseries_rollups.sql
-- Date: 2026-07-07
-- Purpose: Kill the timeseries slowness at its root.
--
--   web_timeseries() re-scanned raw web_events (monthly-partitioned, ~1M rows
--   all-time) with count(DISTINCT ...) on EVERY call. Measured: all-time daily
--   = 89s, 30d-hourly = 27s, 7d-hourly = HTTP 500 (count(DISTINCT) memory spill;
--   work_mem tuning is not possible on Supabase). No rollup existed.
--
--   Fix: a single pre-aggregated `web_rollup` table (one row per
--   site_key × grain × bucket × country). The expensive GROUP BY runs ONCE per
--   refresh and covers ALL sites; every chart then reads a tiny table.
--   web_timeseries / estate_timeseries are rewritten to read the rollup.
--   The old bodies are kept as *_raw() for verification diffs and rollback.
--
--   Populated by refresh_web_rollups() (incremental, cron every 2 min: only
--   today/yesterday recomputed; history never rescanned) and seeded once by
--   backfill_web_rollups() (chunked to dodge the memory spill).
--
-- Additive + reversible: web_rollup is a new table; the RPC rewrite is a single
-- CREATE OR REPLACE swap back to *_raw() if ever needed.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. The rollup table. grain values MATCH web_timeseries p_bucket strings so the
--    read path can pass p_bucket straight through. country holds the real
--    ws.country, plus a sentinel '__ALL__' row (all countries, incl. NULL geo).
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.web_rollup (
  site_key TEXT        NOT NULL,
  grain    TEXT        NOT NULL,          -- '15 minutes' | '1 hour' | '1 day'
  bucket   TIMESTAMPTZ NOT NULL,          -- floor(ts) to grain, UTC
  country  TEXT        NOT NULL,          -- ISO code | '__ALL__'
  sessions BIGINT      NOT NULL DEFAULT 0,
  humans   BIGINT      NOT NULL DEFAULT 0,
  events   BIGINT      NOT NULL DEFAULT 0,
  PRIMARY KEY (site_key, grain, bucket, country)
);

-- Read path: WHERE site_key = ? AND grain = ? AND country = ? AND bucket range.
CREATE INDEX IF NOT EXISTS web_rollup_read_idx
  ON public.web_rollup (site_key, grain, country, bucket);
-- Estate path: sum across sites for a grain/country over a bucket range.
CREATE INDEX IF NOT EXISTS web_rollup_estate_idx
  ON public.web_rollup (grain, country, bucket);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.web_rollup TO service_role;

COMMENT ON TABLE public.web_rollup IS
  'Pre-aggregated web_events summaries (session/human/event distinct counts) per site_key x grain x bucket x country. Read by web_timeseries/estate_timeseries; written by refresh_web_rollups/backfill_web_rollups. Daily grain kept forever; 1 hour 35d; 15 minutes 48h.';

-- ----------------------------------------------------------------------------
-- 2. Internal worker: (re)compute one grain for one [from,to) window.
--    DELETE then INSERT so it is idempotent and self-healing. Computes per-country
--    AND the '__ALL__' aggregate in a SINGLE scan via GROUPING SETS.
--    Matches web_timeseries_raw exactly: is_bot=false, JOIN web_sessions for
--    country, distinct e.session_id / e.visitor_id, count(*) events.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public._rollup_grain_window(
  p_grain text,
  p_from  timestamptz,
  p_to    timestamptz
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_secs double precision := greatest(extract(epoch FROM p_grain::interval), 1);
BEGIN
  DELETE FROM public.web_rollup
   WHERE grain = p_grain
     AND bucket >= p_from
     AND bucket <  p_to;

  INSERT INTO public.web_rollup (site_key, grain, bucket, country, sessions, humans, events)
  WITH evt AS (
    SELECT
      e.site_key AS site_key,
      to_timestamp(floor(extract(epoch FROM e.ts) / v_secs) * v_secs) AS bucket,
      ws.country AS country,
      e.session_id,
      e.visitor_id
    FROM public.web_events e
    JOIN public.web_sessions ws ON ws.session_id = e.session_id
    WHERE e.is_bot = false
      AND e.ts >= p_from
      AND e.ts <  p_to
  )
  SELECT
    site_key,
    p_grain,
    bucket,
    CASE WHEN grouping(country) = 1 THEN '__ALL__' ELSE country END AS country,
    count(DISTINCT session_id) AS sessions,
    count(DISTINCT visitor_id) AS humans,
    count(*)                   AS events
  FROM evt
  GROUP BY GROUPING SETS ((site_key, bucket, country), (site_key, bucket))
  -- Keep the __ALL__ aggregate (grouping=1) and real per-country rows; drop the
  -- NULL-country per-country row (those visitors are only counted under __ALL__).
  HAVING grouping(country) = 1 OR country IS NOT NULL;
END;
$$;

GRANT EXECUTE ON FUNCTION public._rollup_grain_window(text, timestamptz, timestamptz) TO service_role;

-- ----------------------------------------------------------------------------
-- 3. Incremental refresh — called by the cron every run. Recomputes only the
--    recent window (default 2 days) at all three grains, so "today" is always
--    fresh and history is never rescanned. Applies retention.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.refresh_web_rollups(p_lookback_days int DEFAULT 2)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_from timestamptz := date_trunc('day', now() - make_interval(days => p_lookback_days));
  v_to   timestamptz := now();
BEGIN
  PERFORM public._rollup_grain_window('1 day',      v_from, v_to);
  PERFORM public._rollup_grain_window('1 hour',     v_from, v_to);
  PERFORM public._rollup_grain_window('15 minutes', v_from, v_to);

  -- Retention: finer grains are short-lived; daily is kept forever.
  DELETE FROM public.web_rollup WHERE grain = '15 minutes' AND bucket < now() - interval '48 hours';
  DELETE FROM public.web_rollup WHERE grain = '1 hour'     AND bucket < now() - interval '35 days';
END;
$$;

GRANT EXECUTE ON FUNCTION public.refresh_web_rollups(int) TO service_role;

-- ----------------------------------------------------------------------------
-- 4. One-time backfill — chunked (daily month-by-month, hourly/15min day-by-day)
--    so each statement stays small and never hits the count(DISTINCT) spill that
--    500s the live all-history query. Idempotent (DELETE+INSERT per chunk).
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.backfill_web_rollups()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_min  timestamptz;
  v_cur  timestamptz;
  v_next timestamptz;
BEGIN
  SELECT min(ts) INTO v_min FROM public.web_events WHERE is_bot = false;
  IF v_min IS NULL THEN RETURN; END IF;

  -- DAILY: month by month over all history.
  v_cur := date_trunc('month', v_min);
  WHILE v_cur < now() LOOP
    v_next := v_cur + interval '1 month';
    PERFORM public._rollup_grain_window('1 day', v_cur, LEAST(v_next, now()));
    v_cur := v_next;
  END LOOP;

  -- HOURLY: day by day over the last 35 days.
  v_cur := date_trunc('day', now() - interval '35 days');
  WHILE v_cur < now() LOOP
    v_next := v_cur + interval '1 day';
    PERFORM public._rollup_grain_window('1 hour', v_cur, LEAST(v_next, now()));
    v_cur := v_next;
  END LOOP;

  -- 15-MIN: day by day over the last 2 days.
  v_cur := date_trunc('day', now() - interval '2 days');
  WHILE v_cur < now() LOOP
    v_next := v_cur + interval '1 day';
    PERFORM public._rollup_grain_window('15 minutes', v_cur, LEAST(v_next, now()));
    v_cur := v_next;
  END LOOP;
END;
$$;

GRANT EXECUTE ON FUNCTION public.backfill_web_rollups() TO service_role;

-- ----------------------------------------------------------------------------
-- 5. Preserve the current (raw-scan) bodies as *_raw() for verification + rollback.
--    Identical logic to 20260616000003_chart_timeseries.sql.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.web_timeseries_raw(
  p_site_key text,
  p_bucket text,
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
GRANT EXECUTE ON FUNCTION public.web_timeseries_raw(text, text, timestamptz, timestamptz, text) TO authenticated, service_role;

CREATE OR REPLACE FUNCTION public.estate_timeseries_raw(
  p_bucket text,
  p_from timestamptz,
  p_to timestamptz,
  p_country text DEFAULT 'GB'
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
           count(DISTINCT session_id)             AS sessions,
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
GRANT EXECUTE ON FUNCTION public.estate_timeseries_raw(text, timestamptz, timestamptz, text) TO authenticated, service_role;

-- ----------------------------------------------------------------------------
-- 6. Rewrite web_timeseries to read the rollup for sessions/humans/events.
--    Leads stay LIVE from the leads table (small; preserves all-country semantics
--    independent of p_country). Same signature + output — no caller changes.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.web_timeseries(
  p_site_key text,
  p_bucket text,
  p_from timestamptz,
  p_to timestamptz,
  p_country text DEFAULT null
)
RETURNS TABLE(bucket timestamptz, sessions bigint, humans bigint, events bigint, leads bigint)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  WITH secs AS (SELECT greatest(extract(epoch FROM p_bucket::interval), 1) AS s),
  ev_agg AS (
    -- Whole-bucket window: floor p_from to the grain so the left-edge bucket is
    -- included (matches the old raw's boundary bucket presence / chart bar count).
    SELECT bucket AS b, sessions, humans, events
    FROM public.web_rollup
    WHERE site_key = p_site_key
      AND grain    = p_bucket
      AND country  = CASE WHEN p_country IS NULL OR p_country = 'ALL' THEN '__ALL__' ELSE p_country END
      AND bucket >= to_timestamp(floor(extract(epoch FROM p_from) / (SELECT s FROM secs)) * (SELECT s FROM secs))
      AND bucket <  p_to
  ),
  lead_agg AS (
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
-- 7. Rewrite estate_timeseries — SUM the per-site rollup rows. humans =
--    count(DISTINCT (site_key, visitor_id)) is additive across sites (the tuple
--    includes site_key), so SUM of per-site distinct-visitor counts is exact.
--    sessions likewise (session_id unique per site). Leads live, all sites.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.estate_timeseries(
  p_bucket text,
  p_from timestamptz,
  p_to timestamptz,
  p_country text DEFAULT 'GB'
)
RETURNS TABLE(bucket timestamptz, sessions bigint, humans bigint, leads bigint)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  WITH secs AS (SELECT greatest(extract(epoch FROM p_bucket::interval), 1) AS s),
  ev_agg AS (
    SELECT bucket AS b, sum(sessions)::bigint AS sessions, sum(humans)::bigint AS humans
    FROM public.web_rollup
    WHERE grain   = p_bucket
      AND country = CASE WHEN p_country IS NULL OR p_country = 'ALL' THEN '__ALL__' ELSE p_country END
      AND bucket >= to_timestamp(floor(extract(epoch FROM p_from) / (SELECT s FROM secs)) * (SELECT s FROM secs))
      AND bucket <  p_to
    GROUP BY bucket
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
GRANT EXECUTE ON FUNCTION public.estate_timeseries(text, timestamptz, timestamptz, text) TO authenticated, service_role;

NOTIFY pgrst, 'reload schema';

-- ============================================================================
-- VERIFICATION (run after backfill_web_rollups()):
--   -- rollup vs raw must match row-for-row:
--   SELECT * FROM web_timeseries('property','1 day', now()-interval '30 days', now(),'GB')
--   EXCEPT SELECT * FROM web_timeseries_raw('property','1 day', now()-interval '30 days', now(),'GB');
--   -- (and the reverse EXCEPT) -> both empty = identical.
--   -- speed: \timing on; SELECT count(*) FROM web_timeseries('property','1 day','2000-01-01',now(),'GB');
-- ============================================================================
