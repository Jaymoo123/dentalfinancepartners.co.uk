-- ============================================================================
-- Migration: 20260630000001_console_perf_section_action_and_workmem.sql
-- Date: 2026-06-30
-- Purpose: Estate-console performance. Two output-preserving, read-path changes
--          that address the diagnosis of 2026-06-30 (console slow/sluggish ~1mo
--          in as web_events crossed ~100k rows in a single monthly partition).
--
--          (1) Rewrite vw_section_action to drop the correlated-EXISTS re-probe
--              of web_events (it re-scanned the event table once per read-group,
--              ~7,566x, ~86k shared-buffer hits) in favour of an output-IDENTICAL
--              pre-aggregated "latest action ts per session" hash join.
--              EXISTS(action.ts >= first_seen)  ==  max(action.ts) >= first_seen.
--              Verified on prod across ALL sites: (old EXCEPT new) = 0 rows AND
--              (new EXCEPT old) = 0 rows. No column/type/semantic change, so the
--              optimisation_engine detectors that read this view are unaffected.
--
--          (2) Raise work_mem for service_role (the role the console + Python
--              detectors execute as via PostgREST). At the instance default of
--              2184 kB nearly every heavy analytics aggregation spills its
--              count(DISTINCT ...) sort to an external-merge temp file (observed
--              spills: experiment_results 13.8MB, estate_timeseries 10.5MB,
--              web_timeseries 6.8MB, funnel_v2 5.6MB, section 3.5MB, calc 1.9MB).
--              On a shared-CPU instance that temp-file IO is the proximate cause
--              of the 4-5s tail spikes. 16MB keeps the largest observed sort
--              (~14MB) in memory and is conservative on the current ~1GB instance
--              (shared_buffers 224MB, max_connections 60, single-operator load).
--
-- SAFETY / ROLLBACK:
--   - View change is CREATE OR REPLACE with identical output columns; revert by
--     restoring the prior definition (kept in migration 20260606000003).
--   - work_mem is a per-sort budget, not a reservation. Revert with:
--       ALTER ROLE service_role RESET work_mem;
--   - No data is modified. No DDL on tables. No grants/RLS changes.
-- ============================================================================

-- (1) ── vw_section_action: correlated-EXISTS re-probe -> pre-aggregated join ──
CREATE OR REPLACE VIEW public.vw_section_action AS
WITH reads AS (
  SELECT
    e.site_key,
    COALESCE(s.country, 'XX'::text)            AS country,
    e.page_path,
    e.props ->> 'section_id'::text             AS section_id,
    e.session_id,
    min(e.ts)                                  AS first_seen,
    max(e.props ->> 'section_text'::text)      AS section_text,
    bool_or(s.lead_id IS NOT NULL)             AS converted
  FROM public.web_events e
  JOIN public.web_sessions s ON s.session_id = e.session_id
  WHERE e.is_bot = false
    AND e.event_name = 'section_view'::text
    AND e.props ? 'section_id'::text
  GROUP BY e.site_key, COALESCE(s.country, 'XX'::text), e.page_path,
           e.props ->> 'section_id'::text, e.session_id
),
actions AS (
  -- One row per session: the latest cta_click / form_start timestamp. The outer
  -- "acted" test (last_action_ts >= first_seen) is exactly equivalent to the old
  -- EXISTS(any action at ts >= first_seen), but computed once instead of per row.
  SELECT
    a.session_id,
    max(a.ts) AS last_action_ts
  FROM public.web_events a
  WHERE a.is_bot = false
    AND a.event_name = ANY (ARRAY['cta_click'::text, 'form_start'::text])
  GROUP BY a.session_id
)
SELECT
  r.site_key,
  r.country,
  r.page_path,
  r.section_id,
  max(r.section_text)                                                       AS section_text,
  count(*)                                                                  AS read_sessions,
  count(*) FILTER (
    WHERE ac.last_action_ts IS NOT NULL AND ac.last_action_ts >= r.first_seen
  )                                                                         AS acted_sessions,
  count(*) FILTER (WHERE r.converted)                                       AS converted_sessions
FROM reads r
LEFT JOIN actions ac ON ac.session_id = r.session_id
GROUP BY r.site_key, r.country, r.page_path, r.section_id;

COMMENT ON VIEW public.vw_section_action IS
  'Per (site_key, country, page_path, section_id): read_sessions, acted_sessions (session took a cta_click/form_start at or after first seeing the section), converted_sessions. Rewritten 2026-06-30 to a pre-aggregated latest-action join (output-identical to the prior correlated-EXISTS form).';

-- (2) ── work_mem for the console / detector query role ──────────────────────
ALTER ROLE service_role SET work_mem = '16MB';

-- Make the replaced view visible to PostgREST immediately.
NOTIFY pgrst, 'reload schema';

-- ============================================================================
-- VERIFICATION (run after apply):
--   -- equivalence already proven pre-apply; spot-check a heavy read is in-memory:
--   EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM vw_section_action WHERE site_key='property';
--   -- confirm the setting took (new connections):
--   SELECT rolname, rolconfig FROM pg_roles WHERE rolname='service_role';
-- ============================================================================
