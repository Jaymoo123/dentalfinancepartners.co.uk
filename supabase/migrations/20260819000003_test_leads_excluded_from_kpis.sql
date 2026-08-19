-- Test leads excluded from every dashboard KPI count.
-- Real-shaped QA leads flagged is_test (2026-08-19 pilot walk) appeared in the
-- console "Leads (all)" tiles because the KPI functions counted public.leads
-- with no test filtering. Re-creates the CURRENT definitions
-- (web_timeseries_raw + web_timeseries + estate_timeseries from
-- 20260707000002, estate_kpis from 20260616000002) with
--   AND l.source <> 'test' AND coalesce(l.is_test, false) = false
-- on every lead count. Audience metrics (sessions/humans/events) unchanged;
-- web_rollup stores no lead counts so no backfill is needed.
--
-- Rollback: re-run the two source migrations named above.

-- leads.is_test predates the tracked migrations (added out-of-band in prod);
-- formalise it so staging and any fresh environment have the column the
-- predicates below reference.
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS is_test boolean;

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
      AND l.source <> 'test' AND coalesce(l.is_test, false) = false
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
      AND l.source <> 'test' AND coalesce(l.is_test, false) = false
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
      AND l.source <> 'test' AND coalesce(l.is_test, false) = false
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
      AND l.source <> 'test' AND coalesce(l.is_test, false) = false
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

GRANT EXECUTE ON FUNCTION public.estate_kpis(timestamptz, timestamptz, text, text) TO authenticated, service_role;

NOTIFY pgrst, 'reload schema';
