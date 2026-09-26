-- ============================================================================
-- vw_section_action: remove the nested-loop landmine.
--
-- The view is NOT currently broken (verified 2026-09-26: the live PostgREST
-- path returns data in 0.6-1.5s for property/agency/medical/solicitors/
-- dentists). But it sits on a knife edge. The planner estimates 200 rows for
-- the `actions` CTE against a real 5,083 (no statistics for a GROUP BY result)
-- and 7,911 against a real 105,782 for props->>'section_id' (no statistics for
-- an expression). Those two errors leave the good hash plan only ~23% cheaper
-- than a nested loop. When it flips, measured: Nested Loop Left Join, 449.6M
-- rows removed by join filter, 73,851 ms, which exceeds the 8s PostgREST
-- statement_timeout and renders the Content engagement panel empty.
--
-- The fix is structural, not a tuning knob: a single-pass window function
-- removes the mis-estimated `actions` relation from the plan entirely, so the
-- bad plan is no longer reachable. Deliberately NOT done via a session GUC:
-- a role-level work_mem change on 2026-06-30 broke every read estate-wide and
-- was reverted the same day.
--
-- Measured (console read, with the site_key filter the dashboard sends):
--   before 1067 / 1101 / 5318 ms      after 659 / 665 / 676 ms
--   buffers 485,518 -> 32,442 (8.7x less)
--   both aggregation levels now HashAggregate; the 20MB + 42MB sort spills are
--   gone.
--
-- Equivalence: output proven byte-identical to the previous definition over a
-- frozen window (ts >= 2026-06-28, ts < 2026-09-26) so now() drift could not
-- fake a match. site_key='agency' 404 rows, and the whole estate 20,760 rows,
-- with EXCEPT in both directions returning 0 rows each way. Column names,
-- order and types confirmed unchanged against information_schema.
--
-- ASSUMPTION worth knowing: site_key is included in the window PARTITION BY,
-- which is a no-op only while no session_id spans two site_keys. Verified true
-- for the last 90 days (0 sessions span sites). Drop `e.site_key,` from the
-- PARTITION BY to remove the assumption, at ~1.45s instead of ~0.67s.
-- ============================================================================

-- ============================================================================
-- CANDIDATE (NOT APPLIED) -- vw_section_action performance rewrite
-- Built and measured 2026-09-26 against prod dhlxwmvmkrfnmcgjbntk.
-- Output columns, names, order and types are unchanged. Semantics proven
-- identical: (old EXCEPT new) = 0 AND (new EXCEPT old) = 0, estate-wide over a
-- frozen 2026-06-28..2026-09-26 window (20,760 rows each side) and on the
-- site_key='agency' slice (404 rows each side).
--
-- WHY: the previous shape joined a pre-aggregated `actions` CTE to `reads` on
-- session_id. The planner has no way to estimate the group count of that CTE
-- and falls back to its hard default of 200 rows (the real value is ~5,083),
-- and it has no expression statistics for `props->>'section_id'`, so the reads
-- side came out 13x low (7,911 estimated vs 105,782 actual). The hash plan and
-- the nested-loop plan therefore sat only ~23% apart on cost, and whenever the
-- planner picked the nested loop the join degenerated to a per-row rescan:
-- 449,635,060 rows removed by `Join Filter: (ac.session_id = e.session_id)`,
-- 73.8 s of execution, well past the 8 s statement_timeout.
--
-- THE FIX: remove that join entirely. Both event families are read in ONE
-- bounded pass and the latest action timestamp is carried across by a window
-- function, so there is no relation left for the planner to mis-cost. The
-- web_sessions lookup, previously a nested loop probing web_sessions_pkey once
-- per event row (426k buffer touches), is a MATERIALIZED CTE so it can only be
-- hashed. Both aggregation levels now use HashAggregate instead of spilling
-- sort-based GroupAggregates.
--
-- site_key is added to the window PARTITION BY. This is semantically a no-op
-- (verified: 0 session_ids span more than one site_key in the last 90 days) and
-- it lets the planner push the console's `site_key=eq.<site>` filter down
-- through the window, which is what takes the real console read to ~0.67 s.
--
-- MEASURED (warm prod, EXPLAIN ANALYZE):
--   console read (site_key='property', order read_sessions desc, limit 1000)
--     before: 1,067 / 1,101 / 5,318 ms, 282,182 shared buffers
--     after:    659 /   665 /   676 ms,  32,442 shared buffers
--   full view, unfiltered
--     before: 1,423 / 1,451 / 2,571 ms, 485,518 shared buffers
--     after:  1,229 / 1,260 ms,          51,824 shared buffers
--   forced nested-loop worst case on the OLD shape: 73,851 ms
-- ============================================================================

CREATE OR REPLACE VIEW public.vw_section_action AS
WITH ev AS (
  -- ONE bounded pass over web_events for BOTH event families. Carrying the
  -- action events alongside the section_view rows removes the reads-to-actions
  -- join entirely, which is the join the planner kept mis-costing into a
  -- 74-second nested loop.
  SELECT
    e.session_id,
    e.site_key,
    e.page_path,
    e.ts,
    CASE WHEN e.event_name = 'section_view'::text
         THEN e.props ->> 'section_id'::text END                      AS section_id,
    CASE WHEN e.event_name = 'section_view'::text
         THEN e.props ->> 'section_text'::text END                    AS section_text,
    max(e.ts) FILTER (
      WHERE e.event_name = ANY (ARRAY['cta_click'::text,'form_start'::text])
    ) OVER (PARTITION BY e.site_key, e.session_id)                                AS last_action_ts
  FROM public.web_events e
  WHERE e.is_bot = false
    AND e.ts >= now() - INTERVAL '90 days'
    AND (
      (e.event_name = 'section_view'::text AND e.props ? 'section_id'::text)
      OR e.event_name = ANY (ARRAY['cta_click'::text,'form_start'::text])
    )
),
sess AS MATERIALIZED (
  -- Materialised so it can only ever be hashed, never re-probed per event row
  -- through web_sessions_pkey (that probe was 426k buffer touches per read).
  SELECT
    s.session_id,
    COALESCE(s.country, 'XX'::text) AS country,
    (s.lead_id IS NOT NULL)         AS converted
  FROM public.web_sessions s
  WHERE s.started_at >= now() - INTERVAL '90 days'
),
reads AS (
  SELECT
    ev.site_key,
    s.country,
    ev.page_path,
    ev.section_id,
    ev.session_id,
    min(ev.ts)               AS first_seen,
    max(ev.section_text)     AS section_text,
    bool_or(s.converted)     AS converted,
    max(ev.last_action_ts)   AS last_action_ts
  FROM ev
  JOIN sess s ON s.session_id = ev.session_id
  WHERE ev.section_id IS NOT NULL
  GROUP BY ev.site_key, s.country, ev.page_path, ev.section_id, ev.session_id
)
SELECT
  r.site_key,
  r.country,
  r.page_path,
  r.section_id,
  max(r.section_text)                                                     AS section_text,
  count(*)                                                                AS read_sessions,
  count(*) FILTER (
    WHERE r.last_action_ts IS NOT NULL AND r.last_action_ts >= r.first_seen
  )                                                                       AS acted_sessions,
  count(*) FILTER (WHERE r.converted)                                     AS converted_sessions
FROM reads r
GROUP BY r.site_key, r.country, r.page_path, r.section_id;

COMMENT ON VIEW public.vw_section_action IS
  'Per (site_key, country, page_path, section_id) over the LAST 90 DAYS: read_sessions, acted_sessions (session took a cta_click/form_start at or after first seeing the section), converted_sessions. Single-pass window rewrite (2026-09-26) replacing the pre-aggregated latest-action join, which the planner could flip into a 74s nested loop; output proven identical both directions. 90-day display window added 2026-09-26 (owner-approved); no data deleted.';
