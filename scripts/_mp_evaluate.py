"""Monitored-pages outcome evaluation for Property (READ-only).

For each monitored page, compares a matched pre/post GSC window of equal length:
  post_days = min(28, (max_gsc_date - 2) - rewrite_date)   # -2 guards GSC lag
  pre  = [rd - post_days, rd - 1]
  post = [rd + 1, rd + post_days]
Position is impression-weighted. CTR = clicks/impressions.

Outputs cohort rollups, position-bucket migration, page-level winners/losers,
redirect leakage, and a current CTR-shortfall opportunity list.
"""
import json, os, sys
import httpx
from dotenv import load_dotenv

load_dotenv()
PROJECT_REF = "dhlxwmvmkrfnmcgjbntk"
TOKEN = os.environ["SUPABASE_ACCESS_TOKEN"]
URL = f"https://api.supabase.com/v1/projects/{PROJECT_REF}/database/query"


def sql(query: str):
    r = httpx.post(URL, headers={"Authorization": f"Bearer {TOKEN}",
                                 "Content-Type": "application/json"},
                   json={"query": query}, timeout=120)
    if r.status_code not in (200, 201):
        print("SQL ERROR", r.status_code, r.text[:500]); raise SystemExit(1)
    return r.json()


# Common CTEs: page-day GSC rollup + monitored pages with matched window length.
BASE = """
WITH maxd AS (SELECT MAX(date) - 2 AS md FROM gsc_query_data WHERE site_key='property'),
mp AS (
  SELECT slug, page_url, rewrite_date::date AS rd, rewrite_type, redirect_target,
         baseline_impressions, baseline_clicks, baseline_position,
         GREATEST(0, LEAST(28, (SELECT md FROM maxd) - rewrite_date::date)) AS pd
  FROM monitored_pages WHERE site_key='property'
),
g AS (
  SELECT page_url, date, SUM(clicks) clk, SUM(impressions) impr,
         SUM(position*impressions) posw
  FROM gsc_query_data WHERE site_key='property'
  GROUP BY page_url, date
),
j AS (
  SELECT mp.slug, mp.rewrite_type, mp.rd, mp.pd,
         CASE WHEN g.date BETWEEN mp.rd - mp.pd AND mp.rd - 1 THEN 'pre'
              WHEN g.date BETWEEN mp.rd + 1 AND mp.rd + mp.pd THEN 'post' END AS win,
         g.clk, g.impr, g.posw
  FROM mp JOIN g
    ON (g.page_url LIKE '%/' || mp.slug OR g.page_url LIKE '%/' || mp.slug || '/')
  WHERE mp.pd > 0
),
pg AS (  -- per page, pre/post pivoted
  SELECT slug, rewrite_type, rd, pd,
    SUM(impr) FILTER (WHERE win='pre')  AS pre_impr,
    SUM(clk)  FILTER (WHERE win='pre')  AS pre_clk,
    SUM(posw) FILTER (WHERE win='pre')  AS pre_posw,
    SUM(impr) FILTER (WHERE win='post') AS post_impr,
    SUM(clk)  FILTER (WHERE win='post') AS post_clk,
    SUM(posw) FILTER (WHERE win='post') AS post_posw
  FROM j WHERE win IS NOT NULL
  GROUP BY slug, rewrite_type, rd, pd
)
"""


def q_cohort():
    return BASE + """
    SELECT
      CASE WHEN rd <= '2026-05-25' THEN 'A: 21-25 May (cleanup+early)'
           WHEN rd <= '2026-05-30' THEN 'B: 29-30 May (netnew+redir)'
           ELSE 'C: 01-03 Jun (track2 final)' END AS cohort,
      rewrite_type,
      COUNT(*) pages,
      COUNT(*) FILTER (WHERE COALESCE(pre_impr,0)+COALESCE(post_impr,0) > 0) pages_w_data,
      MAX(pd) win_days,
      COALESCE(SUM(pre_impr),0)  pre_impr,  COALESCE(SUM(post_impr),0)  post_impr,
      COALESCE(SUM(pre_clk),0)   pre_clk,   COALESCE(SUM(post_clk),0)   post_clk,
      ROUND( (SUM(pre_posw) /NULLIF(SUM(pre_impr),0))::numeric ,2) pre_pos,
      ROUND( (SUM(post_posw)/NULLIF(SUM(post_impr),0))::numeric ,2) post_pos
    FROM pg
    GROUP BY cohort, rewrite_type ORDER BY cohort, rewrite_type;
    """


def q_overall_rewrites():
    return BASE + """
    SELECT 'ALL rewrites (matched window)' label,
      COUNT(*) pages,
      COUNT(*) FILTER (WHERE COALESCE(pre_impr,0)+COALESCE(post_impr,0)>0) pages_w_data,
      COALESCE(SUM(pre_impr),0) pre_impr, COALESCE(SUM(post_impr),0) post_impr,
      COALESCE(SUM(pre_clk),0)  pre_clk,  COALESCE(SUM(post_clk),0)  post_clk,
      ROUND((SUM(pre_posw)/NULLIF(SUM(pre_impr),0))::numeric,2) pre_pos,
      ROUND((SUM(post_posw)/NULLIF(SUM(post_impr),0))::numeric,2) post_pos
    FROM pg WHERE rewrite_type='rewrite';
    """


def q_position_buckets():
    # only pages with >=20 impressions both windows so position is meaningful
    return BASE + """
    , p2 AS (
      SELECT slug,
        pre_posw/NULLIF(pre_impr,0) pre_pos, post_posw/NULLIF(post_impr,0) post_pos,
        pre_impr, post_impr, pre_clk, post_clk
      FROM pg WHERE rewrite_type='rewrite' AND pre_impr >= 20 AND post_impr >= 20
    )
    SELECT
      COUNT(*) pages_compared,
      COUNT(*) FILTER (WHERE post_pos < pre_pos - 0.5) improved_pos,
      COUNT(*) FILTER (WHERE post_pos BETWEEN pre_pos - 0.5 AND pre_pos + 0.5) held_pos,
      COUNT(*) FILTER (WHERE post_pos > pre_pos + 0.5) worsened_pos,
      COUNT(*) FILTER (WHERE post_clk > pre_clk) more_clicks,
      COUNT(*) FILTER (WHERE post_clk = pre_clk) same_clicks,
      COUNT(*) FILTER (WHERE post_clk < pre_clk) fewer_clicks,
      COUNT(*) FILTER (WHERE post_impr > pre_impr*1.1) more_impr,
      COUNT(*) FILTER (WHERE post_impr < pre_impr*0.9) fewer_impr
    FROM p2;
    """


def q_winners(direction):
    op = "ASC" if direction == "improve" else "DESC"
    # rank by position delta (post-pre); negative delta = improved rank
    return BASE + """
    SELECT slug, pd win_days,
      pre_impr, post_impr, pre_clk, post_clk,
      ROUND((pre_posw/NULLIF(pre_impr,0))::numeric,1) pre_pos,
      ROUND((post_posw/NULLIF(post_impr,0))::numeric,1) post_pos,
      ROUND(((post_posw/NULLIF(post_impr,0)) - (pre_posw/NULLIF(pre_impr,0)))::numeric,1) pos_delta
    FROM pg
    WHERE rewrite_type='rewrite' AND pre_impr >= 30 AND post_impr >= 10
    ORDER BY pos_delta """ + op + """ LIMIT 15;
    """


def q_redirect_leak():
    # residual Google activity on redirected (old) slugs in the post window
    return BASE + """
    SELECT slug, rd, pd win_days,
      COALESCE(post_impr,0) post_impr, COALESCE(post_clk,0) post_clk,
      ROUND((post_posw/NULLIF(post_impr,0))::numeric,1) post_pos
    FROM pg WHERE rewrite_type='redirect'
    ORDER BY post_impr DESC NULLS LAST;
    """


def q_ctr_opportunity():
    # CURRENT-state opportunity: trailing 28d GSC, pages with high impressions but
    # CTR far below the position-expected curve. Includes ALL property pages (not
    # just monitored) so we catch net-new + homepage.
    return """
    WITH maxd AS (SELECT MAX(date) md FROM gsc_query_data WHERE site_key='property'),
    g AS (
      SELECT page_url, SUM(clicks) clk, SUM(impressions) impr,
             SUM(position*impressions)/NULLIF(SUM(impressions),0) pos
      FROM gsc_query_data
      WHERE site_key='property' AND date > (SELECT md - 28 FROM maxd)
      GROUP BY page_url
    )
    SELECT regexp_replace(page_url,'^https?://[^/]+','') path,
      impr, clk, ROUND((clk::numeric/NULLIF(impr,0)*100),2) ctr_pct,
      ROUND(pos::numeric,1) pos,
      -- crude expected CTR by position band
      CASE WHEN pos<=3 THEN 12 WHEN pos<=5 THEN 6 WHEN pos<=10 THEN 2.5
           WHEN pos<=20 THEN 0.8 ELSE 0.2 END exp_ctr_pct
    FROM g
    WHERE impr >= 80 AND pos <= 20
      AND (clk::numeric/NULLIF(impr,0)*100) <
          (CASE WHEN pos<=3 THEN 12 WHEN pos<=5 THEN 6 WHEN pos<=10 THEN 2.5
                WHEN pos<=20 THEN 0.8 ELSE 0.2 END) * 0.5
    ORDER BY impr DESC LIMIT 30;
    """


def q_sitewide_trend():
    # context: is any 'post' lift just sitewide growth? compare whole-site GSC by week
    return """
    SELECT date_trunc('week', date)::date wk,
      SUM(clicks) clk, SUM(impressions) impr,
      ROUND((SUM(clicks)::numeric/NULLIF(SUM(impressions),0)*100),2) ctr_pct,
      ROUND((SUM(position*impressions)/NULLIF(SUM(impressions),0))::numeric,2) pos
    FROM gsc_query_data WHERE site_key='property'
    GROUP BY wk ORDER BY wk;
    """


def q_bing_site():
    # Bing snapshots are trailing windows; compare earliest vs latest at site level
    return """
    SELECT date, COUNT(DISTINCT page_url) pages, SUM(impressions) impr, SUM(clicks) clk,
      ROUND((SUM(clicks)::numeric/NULLIF(SUM(impressions),0)*100),2) ctr_pct,
      ROUND((SUM(position*impressions)/NULLIF(SUM(impressions),0))::numeric,1) pos
    FROM bing_query_data WHERE site_key='property'
    GROUP BY date ORDER BY date;
    """


def q_bing_monitored():
    # monitored rewrites: baseline Bing (at registration) vs latest snapshot
    return """
    WITH latest AS (SELECT MAX(date) d FROM bing_query_data WHERE site_key='property'),
    cur AS (
      SELECT page_url, SUM(clicks) clk, SUM(impressions) impr,
             SUM(position*impressions)/NULLIF(SUM(impressions),0) pos
      FROM bing_query_data
      WHERE site_key='property' AND date=(SELECT d FROM latest)
      GROUP BY page_url
    ),
    mp AS (
      SELECT slug, page_url, rewrite_type,
             baseline_bing_clicks bc, baseline_bing_impressions bi, baseline_bing_position bp
      FROM monitored_pages WHERE site_key='property' AND rewrite_type='rewrite'
    )
    SELECT
      COUNT(*) pages,
      COUNT(*) FILTER (WHERE c.impr IS NOT NULL) pages_in_latest,
      COALESCE(SUM(mp.bi),0) base_impr, COALESCE(SUM(c.impr),0) cur_impr,
      COALESCE(SUM(mp.bc),0) base_clk,  COALESCE(SUM(c.clk),0)  cur_clk,
      ROUND(AVG(mp.bp) FILTER (WHERE mp.bp IS NOT NULL),1) base_pos_avg,
      ROUND(AVG(c.pos) FILTER (WHERE c.pos IS NOT NULL)::numeric,1) cur_pos_avg
    FROM mp LEFT JOIN cur c
      ON (c.page_url LIKE '%/' || mp.slug OR c.page_url LIKE '%/' || mp.slug || '/');
    """


def q_bing_top_pages():
    # where Property actually earns Bing clicks now (latest snapshot)
    return """
    WITH latest AS (SELECT MAX(date) d FROM bing_query_data WHERE site_key='property')
    SELECT regexp_replace(page_url,'^https?://[^/]+','') path,
      SUM(impressions) impr, SUM(clicks) clk,
      ROUND((SUM(clicks)::numeric/NULLIF(SUM(impressions),0)*100),1) ctr_pct,
      ROUND((SUM(position*impressions)/NULLIF(SUM(impressions),0))::numeric,1) pos
    FROM bing_query_data
    WHERE site_key='property' AND date=(SELECT d FROM latest)
    GROUP BY page_url HAVING SUM(impressions) >= 20
    ORDER BY clk DESC, impr DESC LIMIT 25;
    """


RUN = {
 "cohort": q_cohort, "overall": q_overall_rewrites, "buckets": q_position_buckets,
 "improvers": lambda: q_winners("improve"), "regressions": lambda: q_winners("worsen"),
 "redirect": q_redirect_leak, "ctr_opp": q_ctr_opportunity, "sitewide": q_sitewide_trend,
 "bing_site": q_bing_site, "bing_monitored": q_bing_monitored, "bing_top": q_bing_top_pages,
}

if __name__ == "__main__":
    which = sys.argv[1] if len(sys.argv) > 1 else "all"
    for name, fn in RUN.items():
        if which != "all" and name != which:
            continue
        print(f"\n===== {name} =====")
        try:
            print(json.dumps(sql(fn()), indent=2, default=str))
        except SystemExit:
            raise
        except Exception as e:
            print(f"ERROR: {e}")
