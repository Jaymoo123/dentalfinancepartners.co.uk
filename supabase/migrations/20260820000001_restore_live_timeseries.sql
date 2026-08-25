-- Restore LIVE-scan chart functions; charts lost all volume on 2026-08-19.
--
-- What happened: 20260819000003 (test-lead KPI filter) re-created
-- web_timeseries/estate_timeseries from the tracked 20260707000002 base, which
-- reads the web_rollup table. But prod was REVERTED out-of-band on 2026-07-08
-- (compute upgrade made raw scans cheap; rollup writer never scheduled) and
-- web_rollup has been dormant with last bucket 2026-07-07 21:15 UTC ever since
-- (documented in docs/_engines/ANALYTICS_HYGIENE_AUDIT_2026-07-20.md). Result:
-- every console chart read sessions/humans/events = 0 while leads (live from
-- public.leads) still appeared, so the charts went flat overnight.
--
-- Fix: re-create both functions as the live-scan bodies from 20260704000001
-- (session-canonical visitor_id + ws.is_bot gate, the definitions prod actually
-- ran 07-08 .. 08-19) PLUS the test-lead filter that 20260819000003 correctly
-- introduced. web_rollup stays dormant; revive-or-drop is a separate owner
-- decision per the hygiene audit.
--
-- Rollback: re-run 20260819000003 (rollup-reading versions, test filter kept).

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
      ws.visitor_id                       -- session-canonical id (churn-proof)
    FROM public.web_events e
    JOIN public.web_sessions ws ON ws.session_id = e.session_id
    WHERE e.site_key = p_site_key
      AND ws.is_bot = false               -- session-level bot gate
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
    -- ALL countries, live from the leads table; test leads excluded (20260819000003).
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

GRANT EXECUTE ON FUNCTION public.web_timeseries(text, text, timestamptz, timestamptz, text) TO authenticated, service_role;

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
      ws.visitor_id                       -- session-canonical id (churn-proof)
    FROM public.web_events e
    JOIN public.web_sessions ws ON ws.session_id = e.session_id
    WHERE ws.is_bot = false               -- session-level bot gate
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

COMMENT ON FUNCTION public.estate_timeseries(text, timestamptz, timestamptz, text) IS
  'Estate-wide (all sites) bucketed series for the home page. LIVE scan of web_events (web_rollup is dormant since 2026-07-08). Visitors deduped by the session-canonical visitor_id and gated on ws.is_bot to match estate_kpis cards. sessions/humans scoped to p_country (default GB); leads all-countries from the leads table, test leads excluded.';

GRANT EXECUTE ON FUNCTION public.estate_timeseries(text, timestamptz, timestamptz, text) TO authenticated, service_role;

NOTIFY pgrst, 'reload schema';
