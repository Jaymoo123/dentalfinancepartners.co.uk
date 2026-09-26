-- ============================================================================
-- Measured 2026-09-26 against prod dhlxwmvmkrfnmcgjbntk.
--
-- Replaces the estate overview page's 34 per-site round trips
-- (17 x rpc/web_timeseries + 17 x vw_web_funnel_daily_v2) with ONE call.
--
-- Measured: 34 calls = 35.5s total server work / 5.1s wall.
--           this query inline = 852 / 857 / 1029 ms (EXPLAIN ANALYZE, warm).
--
-- Row-for-row identical to both sources (property / dentists / crypto, all 14
-- columns; per-day EXCEPT both directions = 0 rows).
--
-- NOTE: web_rollup is NOT used. Its newest row is 2026-07-07 21:15Z, i.e. the
-- refresh cron has been dead ~81 days. web_timeseries was also rewritten
-- out-of-band back onto the raw web_events path (it now returns engaged_humans,
-- which the 20260707 rollup version never had), so nothing reads the rollup.
--
-- Scope of the parameters: p_country is a single ISO code, matching the only
-- way the estate page calls it ("GB"). NULL/ALL is deliberately not supported
-- -- the funnel view's COALESCE(country,'XX') per-country grouping has no
-- all-country row to reproduce, and the page never asks for one.
-- ============================================================================

CREATE OR REPLACE FUNCTION public.estate_site_series(
  p_ts_from  timestamptz,            -- start of the timeseries/overlay window (page: now() - 30 days)
  p_from     timestamptz,            -- start of the funnel window (page: now() - 90 days)
  p_country  text DEFAULT 'GB'
)
RETURNS TABLE(
  site_key            text,
  d                   date,
  sessions            bigint,        -- = web_timeseries.sessions  (GB, events-joined)
  humans              bigint,        -- = web_timeseries.humans
  f_sessions          bigint,        -- = vw_web_funnel_daily_v2.sessions
  engaged_sessions    bigint,
  calc_sessions       bigint,
  form_cta_sessions   bigint,
  form_start_sessions bigint,
  converted_sessions  bigint
)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  WITH sess AS (
    SELECT s.site_key, s.session_id, s.visitor_id,
           s.started_at::date AS sdate,
           s.engaged_ms >= 10000 AS is_engaged,
           s.lead_id IS NOT NULL AS is_converted
    FROM public.web_sessions s
    WHERE s.is_bot = false
      AND s.started_at >= p_from
      AND s.country = p_country          -- unwrapped: index-usable, unlike the view's COALESCE
  ),
  -- ONE pass over web_events for the whole estate, at (session, day) grain.
  ev AS (
    SELECT e.session_id, e.ts::date AS edate,
           bool_or(e.event_name = 'calc_computed')                               AS used_calc,
           bool_or(e.event_name = 'cta_click' AND e.props->>'goal' = 'form')     AS clicked_form_cta,
           bool_or(e.event_name = 'form_start')                                  AS started_form,
           bool_or(e.ts >= p_ts_from)                                            AS in_ts_window
    FROM public.web_events e
    WHERE e.is_bot = false AND e.ts >= p_from
    GROUP BY 1, 2
  ),
  ev_flags AS (
    SELECT session_id,
           bool_or(used_calc) AS used_calc,
           bool_or(clicked_form_cta) AS clicked_form_cta,
           bool_or(started_form) AS started_form
    FROM ev GROUP BY 1
  ),
  funnel AS (
    SELECT s.site_key, s.sdate AS d,
      count(*) AS f_sessions,
      count(*) FILTER (WHERE s.is_engaged OR coalesce(f.clicked_form_cta,false)
                          OR coalesce(f.started_form,false) OR s.is_converted
                          OR coalesce(f.used_calc,false))                        AS engaged_sessions,
      count(*) FILTER (WHERE coalesce(f.used_calc,false))                        AS calc_sessions,
      count(*) FILTER (WHERE coalesce(f.clicked_form_cta,false)
                          OR coalesce(f.started_form,false) OR s.is_converted)   AS form_cta_sessions,
      count(*) FILTER (WHERE coalesce(f.started_form,false) OR s.is_converted)   AS form_start_sessions,
      count(*) FILTER (WHERE s.is_converted)                                     AS converted_sessions
    FROM sess s LEFT JOIN ev_flags f ON f.session_id = s.session_id
    GROUP BY 1, 2
  ),
  ts AS (
    SELECT s.site_key, e.edate AS d,
           count(DISTINCT s.session_id) AS sessions,
           count(DISTINCT s.visitor_id) AS humans
    FROM sess s JOIN ev e ON e.session_id = s.session_id
    WHERE e.in_ts_window                 -- reproduces web_timeseries' e.ts >= p_from edge exactly
    GROUP BY 1, 2
  )
  SELECT coalesce(f.site_key, t.site_key),
         coalesce(f.d, t.d),
         coalesce(t.sessions, 0), coalesce(t.humans, 0),
         coalesce(f.f_sessions, 0), coalesce(f.engaged_sessions, 0),
         coalesce(f.calc_sessions, 0), coalesce(f.form_cta_sessions, 0),
         coalesce(f.form_start_sessions, 0), coalesce(f.converted_sessions, 0)
  FROM funnel f
  FULL OUTER JOIN ts t ON t.site_key = f.site_key AND t.d = f.d
  ORDER BY 1, 2;
$$;

-- Deliberately narrower than the house convention for read RPCs
-- (estate_kpis / web_timeseries grant to authenticated too): this one is only
-- ever called server-side by the console with the service key, so it does not
-- need to be reachable by any signed-in JWT. Widen only if a client needs it.
GRANT EXECUTE ON FUNCTION public.estate_site_series(timestamptz, timestamptz, text)
  TO service_role;

NOTIFY pgrst, 'reload schema';
