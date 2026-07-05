-- Property HONEST rewrite scorecard (Google/GSC). READ-only.
-- Run:  python scripts/_q.py scripts/property_honest_scorecard.sql
--
-- Fixes the inflation in the old scorecard:
--  1. SURVIVORSHIP: a page counts in the pre/post comparison ONLY if it has GSC
--     impressions in BOTH its own pre and post window (others reported separately).
--  2. COMPOSITION: net-new pages are tagged OUT of the "rewrite" cohort.
--  3. EQUAL WINDOWS: per-page symmetric 14-day pre/post anchored to each page's
--     own rewrite_date (pre=[rd-14,rd-1], post=[rd+1,rd+14]).
--  4. HEADLINE METRIC: MEDIAN per-page position delta (robust); weighted/mean
--     reported alongside but NOT headline (a few big movers over-credit them).
WITH genuine AS (
  SELECT slug, rewrite_date::date rd
  FROM monitored_pages
  WHERE site_key='property' AND rewrite_type='rewrite'
    AND NOT (notes ILIKE '%net-new%' OR notes ILIKE 'NETNEW%' OR notes ILIKE '%ABSORB-WATCH%')
),
pre AS (
  SELECT g.slug, SUM(d.impressions) impr, SUM(d.clicks) clk,
         SUM(d.position*d.impressions)/NULLIF(SUM(d.impressions),0) wpos
  FROM genuine g JOIN gsc_query_data d ON d.site_key='property'
    AND d.page_url LIKE '%/'||g.slug AND d.date BETWEEN g.rd-14 AND g.rd-1
  GROUP BY g.slug
),
post AS (
  SELECT g.slug, SUM(d.impressions) impr, SUM(d.clicks) clk,
         SUM(d.position*d.impressions)/NULLIF(SUM(d.impressions),0) wpos
  FROM genuine g JOIN gsc_query_data d ON d.site_key='property'
    AND d.page_url LIKE '%/'||g.slug AND d.date BETWEEN g.rd+1 AND g.rd+14
  GROUP BY g.slug
),
paired AS (
  SELECT pre.slug, pre.wpos pre_wpos, post.wpos post_wpos,
         pre.impr pre_impr, post.impr post_impr, pre.clk pre_clk, post.clk post_clk
  FROM pre JOIN post ON pre.slug=post.slug
)
SELECT
 (SELECT count(*) FROM genuine) AS genuine_rewrites,
 (SELECT count(*) FROM paired)  AS paired_both_windows,
 (SELECT count(*) FROM pre WHERE slug NOT IN (SELECT slug FROM post)) AS pre_only_survivorship,
 (SELECT count(*) FROM post WHERE slug NOT IN (SELECT slug FROM pre)) AS post_only,
 round(percentile_cont(0.5) WITHIN GROUP (ORDER BY post_wpos-pre_wpos)::numeric,2) AS median_pos_delta_HEADLINE,
 round((SUM(post_wpos*post_impr)/NULLIF(SUM(post_impr),0) - SUM(pre_wpos*pre_impr)/NULLIF(SUM(pre_impr),0))::numeric,2) AS weighted_pos_delta,
 round(AVG(post_wpos-pre_wpos)::numeric,2) AS mean_pos_delta_inflated,
 count(*) FILTER (WHERE post_wpos < pre_wpos) AS pages_improved,
 count(*) FILTER (WHERE post_wpos > pre_wpos) AS pages_worsened,
 count(*) FILTER (WHERE pre_wpos<=10)  AS pre_in_top10,
 count(*) FILTER (WHERE post_wpos<=10) AS post_in_top10,
 SUM(pre_impr) AS pre_impr, SUM(post_impr) AS post_impr,
 SUM(pre_clk)  AS pre_clk,  SUM(post_clk)  AS post_clk
FROM paired;
