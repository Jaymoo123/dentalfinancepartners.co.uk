-- ============================================================================
-- Migration: 20260617000003_vw_probable_ai_direct.sql
-- Date: 2026-06-17
-- Purpose: GEO Measurement layer (Track B) -- probable AI-direct heuristic.
--
-- vw_probable_ai_direct
--   Flags channel='direct' sessions that are plausibly AI-answer-engine-driven
--   ("dark AI traffic") rather than true direct/bookmark arrivals.
--
-- The idea: when a Bing query for a given page spikes (relative to its own
-- rolling median), AI answer engines citing that page see higher usage, and
-- some of those users then navigate directly to the site without a referrer.
-- We surface sessions that:
--   a) have no referrer (channel='direct') and landed on a page with
--   b) a recent Bing impression spike for that page URL within a short window
--      before the session.
--
-- DATA SHAPE NOTE (limitation flagged explicitly):
--   bing_query_data stores trailing-window aggregates (one snapshot per day,
--   per site_key / page_url / query) -- NOT per-day impressions. There is no
--   per-day impression series to compute a genuine day-over-day delta from
--   within a single snapshot. What we DO have is multiple snapshots over time
--   (date column = fetch date). We use:
--     * The MOST RECENT snapshot impression count for a page URL as the
--       "current" signal.
--     * The second-most-recent snapshot as the "baseline".
--     * delta_pct = (recent - baseline) / NULLIF(baseline, 0).
--   A session is flagged probable_ai_direct=true if:
--     * its channel is 'direct'
--     * its entry_path matches a page_url with delta_pct >= 0.20 (20% uplift)
--       in the most recent Bing snapshot vs the prior snapshot, and
--     * the most recent snapshot date is within 14 days of the session.
--
--   This is a BEST-EFFORT HEURISTIC only. Known limitations:
--     1. Bing trailing-window aggregates mean we detect inter-snapshot changes,
--        not intra-week spikes. If BWT is ingested weekly the signal lags 7d.
--     2. page_url in bing_query_data is a full URL; entry_path is a path. We
--        strip the host with a regexp to match. URLs with query strings or
--        fragment identifiers will not match entry_path.
--     3. A Bing impression spike may be caused by organic ranking improvement
--        unrelated to AI citation. The flag is correlative, not causal.
--     4. Sites with sparse bing_query_data (< 2 snapshots per page) yield no
--        flagged rows (the baseline is NULL -> delta_pct is NULL -> no flag).
--   Use as an investigation lens, not a definitive AI-attribution signal.
-- ============================================================================

CREATE OR REPLACE VIEW public.vw_probable_ai_direct AS
WITH page_snapshots AS (
  -- Summarise bing_query_data at the (site_key, page_url, date) level.
  -- bing_query_data has one row per (site_key, page_url, query, date);
  -- we aggregate queries into a per-page impression total per snapshot date.
  SELECT
    site_key,
    page_url,
    date                           AS snap_date,
    SUM(impressions)               AS total_impressions,
    SUM(clicks)                    AS total_clicks
  FROM public.bing_query_data
  GROUP BY site_key, page_url, date
),
ranked_snaps AS (
  -- For each (site_key, page_url) rank snapshot dates newest-first.
  SELECT
    site_key,
    page_url,
    snap_date,
    total_impressions,
    total_clicks,
    ROW_NUMBER() OVER (
      PARTITION BY site_key, page_url
      ORDER BY snap_date DESC
    ) AS rn
  FROM page_snapshots
),
spike_pages AS (
  -- Pages where the most recent snapshot shows >= 20% impression uplift vs the
  -- prior snapshot. Both snapshots must exist (rn=1 and rn=2).
  SELECT
    r1.site_key,
    -- Normalise the full URL to a path for joining with web_sessions.entry_path.
    -- regexp_replace strips 'https://hostname' and any query string / fragment.
    regexp_replace(
      regexp_replace(r1.page_url, '^https?://[^/]+', ''),
      '[?#].*$', ''
    )                              AS entry_path,
    r1.page_url,
    r1.snap_date                   AS recent_snap_date,
    r1.total_impressions           AS recent_impressions,
    r2.total_impressions           AS prior_impressions,
    CASE
      WHEN COALESCE(r2.total_impressions, 0) > 0
      THEN (r1.total_impressions - r2.total_impressions)::numeric
           / r2.total_impressions::numeric
      ELSE NULL
    END                            AS impression_delta_pct
  FROM ranked_snaps r1
  LEFT JOIN ranked_snaps r2
    ON  r2.site_key = r1.site_key
    AND r2.page_url = r1.page_url
    AND r2.rn       = 2
  WHERE r1.rn = 1
    AND CASE
          WHEN COALESCE(r2.total_impressions, 0) > 0
          THEN (r1.total_impressions - r2.total_impressions)::numeric
               / r2.total_impressions::numeric
          ELSE NULL
        END >= 0.20
)
SELECT
  ws.site_key,
  ws.session_id,
  ws.visitor_id,
  ws.started_at,
  ws.entry_path,
  ws.country,
  ws.device_type,
  ws.lead_id,
  sp.page_url                      AS bing_page_url,
  sp.recent_snap_date              AS bing_snap_date,
  sp.recent_impressions            AS bing_recent_impressions,
  sp.prior_impressions             AS bing_prior_impressions,
  round(sp.impression_delta_pct * 100, 1) AS bing_impression_uplift_pct,
  true                             AS probable_ai_direct
FROM public.web_sessions ws
JOIN spike_pages sp
  ON  sp.site_key   = ws.site_key
  -- Path match: both sides normalised (trim trailing slash from entry_path)
  AND sp.entry_path = rtrim(COALESCE(ws.entry_path, ''), '/')
  -- Session must fall within 14 days after the snapshot (correlation window)
  AND ws.started_at >= (sp.recent_snap_date::timestamptz)
  AND ws.started_at <  (sp.recent_snap_date::timestamptz + INTERVAL '14 days')
WHERE ws.is_bot      = false
  AND (ws.referrer_host IS NULL OR ws.referrer_host = '');

COMMENT ON VIEW public.vw_probable_ai_direct IS
  'HEURISTIC only. Flags channel=direct sessions whose landing page had a >= 20% '
  'Bing impression uplift (most recent vs prior bing_query_data snapshot) within 14 days '
  'before the session. Intended as an investigation lens for "dark AI traffic", not a '
  'definitive AI-attribution signal. Limitations: (1) BWT trailing-window aggregates mean '
  'only inter-snapshot deltas are available, not intra-week spikes; (2) URL->path stripping '
  'may miss pages with query strings; (3) Bing uplifts can reflect organic ranking gains '
  'unrelated to AI citation. Sites with < 2 snapshots per page yield no rows.';

GRANT SELECT ON public.vw_probable_ai_direct TO authenticated;

NOTIFY pgrst, 'reload schema';
