-- =============================================================================
-- Medical: Google Search Console segmented read  (B1 battery step)
-- Doc: docs/medical/DIAGNOSIS_2026-07.md  §3 / docs/medical/google_read.md
-- Run: python scripts/medical/10_run_google_segments.py
--
-- DATA-TRUST HEADER (cite in every verdict):
--   GSC data exists ONLY 2026-04-01 to 2026-07-04.
--   API-confirmed EMPTY before April (site young, NOT an auth artifact).
--   Window definitions:
--     pre = 2026-04-01..2026-05-19  (49d, thin — treat as indicative only)
--     mig = 2026-05-20..2026-06-17  (29d, canonicals pointed at phantom domain)
--     post= 2026-06-18..2026-07-04  (17d, clean canonicals)
--   Bing: rolling trailing-window aggregates only; no pre-May Bing data.
--   Tables: gsc_query_data (site_key='medical') |
--           gsc_page_performance (niche='medical')
-- =============================================================================


-- ─────────────────────────────────────────────────────────────────────────────
-- SECTION 1a: per-window totals from gsc_page_performance
-- One row per window: impressions, clicks, CTR, impression-weighted position,
-- distinct pages, pages with page-level wt_pos <=10, pages wt_pos <=20.
-- ─────────────────────────────────────────────────────────────────────────────

WITH windowed AS (
  SELECT
    CASE
      WHEN date <= '2026-05-19' THEN 'pre'
      WHEN date <= '2026-06-17' THEN 'mig'
      ELSE 'post'
    END                                    AS win,
    page_url,
    SUM(impressions)::bigint               AS imp,
    SUM(clicks)::bigint                    AS clk,
    SUM(impressions::numeric * position)   AS imp_x_pos
  FROM gsc_page_performance
  WHERE niche = 'medical'
    AND date BETWEEN '2026-04-01' AND '2026-07-04'
  GROUP BY 1, 2
)
SELECT
  win,
  SUM(imp)                                                                        AS total_impressions,
  SUM(clk)                                                                        AS total_clicks,
  ROUND(SUM(clk)::numeric / NULLIF(SUM(imp), 0) * 100, 3)                        AS ctr_pct,
  ROUND(SUM(imp_x_pos) / NULLIF(SUM(imp), 0), 2)                                 AS imp_wt_position,
  COUNT(DISTINCT page_url)                                                         AS distinct_pages,
  COUNT(DISTINCT CASE WHEN imp_x_pos / NULLIF(imp, 0) <= 10 THEN page_url END)   AS pages_wt_pos_le10,
  COUNT(DISTINCT CASE WHEN imp_x_pos / NULLIF(imp, 0) <= 20 THEN page_url END)   AS pages_wt_pos_le20
FROM windowed
GROUP BY win
ORDER BY CASE win WHEN 'pre' THEN 1 WHEN 'mig' THEN 2 ELSE 3 END;


-- ─────────────────────────────────────────────────────────────────────────────
-- SECTION 1b: per-window totals from gsc_query_data
-- Includes distinct_queries; pages* derived from page-level aggregates.
-- ─────────────────────────────────────────────────────────────────────────────

WITH
raw AS (
  SELECT
    CASE
      WHEN date <= '2026-05-19' THEN 'pre'
      WHEN date <= '2026-06-17' THEN 'mig'
      ELSE 'post'
    END                                    AS win,
    query,
    page_url,
    SUM(impressions)::bigint               AS imp,
    SUM(clicks)::bigint                    AS clk,
    SUM(impressions::numeric * position)   AS imp_x_pos
  FROM gsc_query_data
  WHERE site_key = 'medical'
    AND date BETWEEN '2026-04-01' AND '2026-07-04'
  GROUP BY 1, 2, 3
),
page_lvl AS (
  SELECT win, page_url,
    SUM(imp)       AS p_imp,
    SUM(imp_x_pos) AS p_imp_x_pos
  FROM raw
  GROUP BY 1, 2
),
win_pages AS (
  SELECT win,
    COUNT(DISTINCT page_url)                                                                          AS d_pages,
    COUNT(DISTINCT CASE WHEN p_imp_x_pos / NULLIF(p_imp, 0) <= 10 THEN page_url END)                AS pages_le10,
    COUNT(DISTINCT CASE WHEN p_imp_x_pos / NULLIF(p_imp, 0) <= 20 THEN page_url END)                AS pages_le20
  FROM page_lvl
  GROUP BY 1
),
win_totals AS (
  SELECT win,
    SUM(imp)         AS t_imp,
    SUM(clk)         AS t_clk,
    SUM(imp_x_pos)   AS t_imp_x_pos,
    COUNT(DISTINCT query)    AS d_queries,
    COUNT(DISTINCT page_url) AS d_pages_raw
  FROM raw
  GROUP BY 1
)
SELECT
  t.win,
  t.t_imp                                                          AS total_impressions,
  t.t_clk                                                          AS total_clicks,
  ROUND(t.t_clk::numeric / NULLIF(t.t_imp, 0) * 100, 3)          AS ctr_pct,
  ROUND(t.t_imp_x_pos / NULLIF(t.t_imp, 0), 2)                    AS imp_wt_position,
  t.d_queries                                                       AS distinct_queries,
  p.d_pages                                                         AS distinct_pages,
  p.pages_le10                                                      AS pages_wt_pos_le10,
  p.pages_le20                                                      AS pages_wt_pos_le20
FROM win_totals t
JOIN win_pages p USING (win)
ORDER BY CASE t.win WHEN 'pre' THEN 1 WHEN 'mig' THEN 2 ELSE 3 END;


-- ─────────────────────────────────────────────────────────────────────────────
-- SECTION 2: head-family per window
-- Queries matching the 6 head-term families; position/impressions/clicks per
-- window per query.
-- ─────────────────────────────────────────────────────────────────────────────

SELECT
  CASE
    WHEN date <= '2026-05-19' THEN 'pre'
    WHEN date <= '2026-06-17' THEN 'mig'
    ELSE 'post'
  END                                            AS win,
  query,
  SUM(impressions)::bigint                       AS impressions,
  SUM(clicks)::bigint                            AS clicks,
  ROUND(SUM(impressions::numeric * position)
        / NULLIF(SUM(impressions), 0), 1)        AS wt_position
FROM gsc_query_data
WHERE site_key = 'medical'
  AND date BETWEEN '2026-04-01' AND '2026-07-04'
  AND (
    query ILIKE 'gp accountant%'
    OR query ILIKE 'medical accountant%'
    OR query ILIKE 'gp practice accountant%'
    OR query ILIKE 'specialist medical accountant%'
    OR query ILIKE 'accountants for doctors%'
    OR (query ILIKE 'locum%' AND query ILIKE '%accountant%')
  )
GROUP BY 1, 2
ORDER BY SUM(impressions) DESC, query,
         CASE WHEN date <= '2026-05-19' THEN 1 WHEN date <= '2026-06-17' THEN 2 ELSE 3 END;


-- ─────────────────────────────────────────────────────────────────────────────
-- SECTION 3a: paired mig↔post page delta summary
-- Pages present in BOTH mig and post windows (gsc_page_performance).
-- Positive delta = position got worse; negative = improved.
-- ─────────────────────────────────────────────────────────────────────────────

WITH
mig AS (
  SELECT page_url,
    SUM(impressions)::bigint               AS mig_imp,
    SUM(impressions::numeric * position)   AS mig_imp_x_pos
  FROM gsc_page_performance
  WHERE niche = 'medical'
    AND date BETWEEN '2026-05-20' AND '2026-06-17'
  GROUP BY page_url
),
post AS (
  SELECT page_url,
    SUM(impressions)::bigint               AS post_imp,
    SUM(impressions::numeric * position)   AS post_imp_x_pos
  FROM gsc_page_performance
  WHERE niche = 'medical'
    AND date BETWEEN '2026-06-18' AND '2026-07-04'
  GROUP BY page_url
),
paired AS (
  SELECT
    m.page_url,
    m.mig_imp,
    m.mig_imp_x_pos / NULLIF(m.mig_imp, 0)    AS mig_wt_pos,
    p.post_imp,
    p.post_imp_x_pos / NULLIF(p.post_imp, 0)   AS post_wt_pos,
    (p.post_imp_x_pos / NULLIF(p.post_imp, 0))
      - (m.mig_imp_x_pos / NULLIF(m.mig_imp, 0)) AS delta
  FROM mig m
  JOIN post p USING (page_url)
)
SELECT
  COUNT(*)                                                              AS n_pages,
  ROUND(PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY delta)::numeric, 2) AS median_delta,
  ROUND(SUM(post_imp::numeric * delta) / NULLIF(SUM(post_imp), 0), 2)  AS imp_wt_mean_delta,
  SUM(CASE WHEN delta < 0 THEN 1 ELSE 0 END)                           AS n_improved,
  SUM(CASE WHEN delta > 0 THEN 1 ELSE 0 END)                           AS n_worsened,
  SUM(CASE WHEN delta = 0 THEN 1 ELSE 0 END)                           AS n_unchanged
FROM paired;


-- ─────────────────────────────────────────────────────────────────────────────
-- SECTION 3b: paired mig↔post per-page detail
-- ─────────────────────────────────────────────────────────────────────────────

WITH
mig AS (
  SELECT page_url,
    SUM(impressions)::bigint               AS mig_imp,
    SUM(impressions::numeric * position)   AS mig_imp_x_pos
  FROM gsc_page_performance
  WHERE niche = 'medical'
    AND date BETWEEN '2026-05-20' AND '2026-06-17'
  GROUP BY page_url
),
post AS (
  SELECT page_url,
    SUM(impressions)::bigint               AS post_imp,
    SUM(impressions::numeric * position)   AS post_imp_x_pos
  FROM gsc_page_performance
  WHERE niche = 'medical'
    AND date BETWEEN '2026-06-18' AND '2026-07-04'
  GROUP BY page_url
)
SELECT
  m.page_url,
  m.mig_imp,
  ROUND(m.mig_imp_x_pos / NULLIF(m.mig_imp, 0), 1)       AS mig_wt_pos,
  p.post_imp,
  ROUND(p.post_imp_x_pos / NULLIF(p.post_imp, 0), 1)      AS post_wt_pos,
  ROUND((p.post_imp_x_pos / NULLIF(p.post_imp, 0))
        - (m.mig_imp_x_pos / NULLIF(m.mig_imp, 0)), 1)    AS delta
FROM mig m
JOIN post p USING (page_url)
ORDER BY ABS((p.post_imp_x_pos / NULLIF(p.post_imp, 0))
             - (m.mig_imp_x_pos / NULLIF(m.mig_imp, 0))) DESC;


-- ─────────────────────────────────────────────────────────────────────────────
-- SECTION 3c: survivorship dropouts
-- Pages with impressions in pre OR mig but zero impressions in post.
-- ─────────────────────────────────────────────────────────────────────────────

WITH
pre_mig AS (
  SELECT DISTINCT page_url
  FROM gsc_page_performance
  WHERE niche = 'medical'
    AND date BETWEEN '2026-04-01' AND '2026-06-17'
),
post_present AS (
  SELECT DISTINCT page_url
  FROM gsc_page_performance
  WHERE niche = 'medical'
    AND date BETWEEN '2026-06-18' AND '2026-07-04'
),
dropouts AS (
  SELECT pm.page_url
  FROM pre_mig pm
  WHERE pm.page_url NOT IN (SELECT page_url FROM post_present)
)
SELECT
  d.page_url,
  COALESCE(SUM(CASE WHEN p.date BETWEEN '2026-04-01' AND '2026-05-19'
                    THEN p.impressions END), 0)  AS pre_imp,
  COALESCE(SUM(CASE WHEN p.date BETWEEN '2026-05-20' AND '2026-06-17'
                    THEN p.impressions END), 0)  AS mig_imp,
  0                                               AS post_imp
FROM dropouts d
JOIN gsc_page_performance p USING (page_url)
WHERE p.niche = 'medical'
  AND p.date BETWEEN '2026-04-01' AND '2026-06-17'
GROUP BY d.page_url
ORDER BY mig_imp DESC;


-- ─────────────────────────────────────────────────────────────────────────────
-- SECTION 4a: top 20 queries by total impressions with per-window positions
-- ─────────────────────────────────────────────────────────────────────────────

SELECT
  query,
  SUM(impressions)::bigint                                                          AS total_impressions,
  SUM(clicks)::bigint                                                               AS total_clicks,
  ROUND(SUM(CASE WHEN date <= '2026-05-19'
                 THEN impressions::numeric * position END)
        / NULLIF(SUM(CASE WHEN date <= '2026-05-19'
                          THEN impressions END), 0), 1)                             AS pre_wt_pos,
  ROUND(SUM(CASE WHEN date BETWEEN '2026-05-20' AND '2026-06-17'
                 THEN impressions::numeric * position END)
        / NULLIF(SUM(CASE WHEN date BETWEEN '2026-05-20' AND '2026-06-17'
                          THEN impressions END), 0), 1)                             AS mig_wt_pos,
  ROUND(SUM(CASE WHEN date >= '2026-06-18'
                 THEN impressions::numeric * position END)
        / NULLIF(SUM(CASE WHEN date >= '2026-06-18'
                          THEN impressions END), 0), 1)                             AS post_wt_pos
FROM gsc_query_data
WHERE site_key = 'medical'
  AND date BETWEEN '2026-04-01' AND '2026-07-04'
GROUP BY query
ORDER BY total_impressions DESC
LIMIT 20;


-- ─────────────────────────────────────────────────────────────────────────────
-- SECTION 4b: top 15 pages by total impressions with per-window numbers
-- ─────────────────────────────────────────────────────────────────────────────

SELECT
  page_url,
  SUM(impressions)::bigint                                                          AS total_impressions,
  SUM(clicks)::bigint                                                               AS total_clicks,
  ROUND(SUM(CASE WHEN date <= '2026-05-19'
                 THEN impressions::numeric * position END)
        / NULLIF(SUM(CASE WHEN date <= '2026-05-19'
                          THEN impressions END), 0), 1)                             AS pre_wt_pos,
  ROUND(SUM(CASE WHEN date BETWEEN '2026-05-20' AND '2026-06-17'
                 THEN impressions::numeric * position END)
        / NULLIF(SUM(CASE WHEN date BETWEEN '2026-05-20' AND '2026-06-17'
                          THEN impressions END), 0), 1)                             AS mig_wt_pos,
  ROUND(SUM(CASE WHEN date >= '2026-06-18'
                 THEN impressions::numeric * position END)
        / NULLIF(SUM(CASE WHEN date >= '2026-06-18'
                          THEN impressions END), 0), 1)                             AS post_wt_pos
FROM gsc_page_performance
WHERE niche = 'medical'
  AND date BETWEEN '2026-04-01' AND '2026-07-04'
GROUP BY page_url
ORDER BY total_impressions DESC
LIMIT 15;


-- ─────────────────────────────────────────────────────────────────────────────
-- SECTION 5a: zero-click surface summary (queries with wt_pos <=20, 0 clicks)
-- ─────────────────────────────────────────────────────────────────────────────

WITH query_agg AS (
  SELECT
    query,
    SUM(impressions)::bigint                                   AS total_impressions,
    SUM(clicks)::bigint                                        AS total_clicks,
    SUM(impressions::numeric * position) / NULLIF(SUM(impressions), 0) AS wt_pos
  FROM gsc_query_data
  WHERE site_key = 'medical'
    AND date BETWEEN '2026-04-01' AND '2026-07-04'
  GROUP BY query
)
SELECT
  COUNT(*)                      AS zero_click_queries_le20,
  SUM(total_impressions)        AS zero_click_impressions_le20
FROM query_agg
WHERE wt_pos <= 20
  AND total_clicks = 0;


-- ─────────────────────────────────────────────────────────────────────────────
-- SECTION 5b: zero-click examples (top by impressions, wt_pos <=20)
-- ─────────────────────────────────────────────────────────────────────────────

WITH query_agg AS (
  SELECT
    query,
    SUM(impressions)::bigint                                        AS total_impressions,
    SUM(clicks)::bigint                                             AS total_clicks,
    ROUND(SUM(impressions::numeric * position)
          / NULLIF(SUM(impressions), 0), 1)                         AS wt_pos
  FROM gsc_query_data
  WHERE site_key = 'medical'
    AND date BETWEEN '2026-04-01' AND '2026-07-04'
  GROUP BY query
)
SELECT query, total_impressions, total_clicks, wt_pos
FROM query_agg
WHERE wt_pos <= 20
  AND total_clicks = 0
ORDER BY total_impressions DESC
LIMIT 15;
