import os, sys, pathlib
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from optimisation_engine.competitor._db import _sql

SITE = "dentists"
BLOG = pathlib.Path("Dentists/web/content/blog")
live = {p.stem for p in BLOG.glob("*.md")}

g = {}
for r in _sql(f"""SELECT page_url, SUM(impressions) impr, SUM(clicks) clk,
        ROUND((SUM(position*impressions)/NULLIF(SUM(impressions),0))::numeric,1) wpos
        FROM gsc_query_data WHERE site_key='{SITE}' GROUP BY page_url;"""):
    s = (r["page_url"] or "").rstrip("/").split("/")[-1]
    if not s: continue
    p = g.get(s)
    if not p or (r["impr"] or 0) > p["impr"]:
        g[s] = {"impr": r["impr"] or 0, "clk": r["clk"] or 0, "wpos": r["wpos"]}

b = {}
for r in _sql(f"""SELECT page_url, SUM(impressions) impr, SUM(clicks) clk,
        ROUND((SUM(position*impressions)/NULLIF(SUM(impressions),0))::numeric,1) wpos
        FROM bing_query_data WHERE site_key='{SITE}'
          AND date=(SELECT MAX(date) FROM bing_query_data WHERE site_key='{SITE}')
        GROUP BY page_url;"""):
    s = (r["page_url"] or "").rstrip("/").split("/")[-1]
    if not s: continue
    p = b.get(s)
    if not p or (r["impr"] or 0) > p["impr"]:
        b[s] = {"impr": r["impr"] or 0, "clk": r["clk"] or 0, "wpos": r["wpos"]}

mon = {r["slug"] for r in _sql(f"SELECT slug FROM monitored_pages WHERE site_key='{SITE}';")}
slugs = set(g) | set(b)
rows = []
for s in slugs:
    gi = g.get(s, {}); bi = b.get(s, {})
    rows.append((s, gi.get("impr", 0), gi.get("wpos"), bi.get("impr", 0), bi.get("wpos"),
                 gi.get("clk", 0) + bi.get("clk", 0), (gi.get("impr", 0) + bi.get("impr", 0)),
                 s in live, s in mon))
rows.sort(key=lambda r: (-r[6], -r[1]))
print(f"dentists: GSC slugs={len(g)} Bing slugs={len(b)} monitored={len(mon)} live_md={len(live)}")
print(f"{'Gimpr':>6} {'Gpos':>5} {'Bimpr':>6} {'Bpos':>5} {'clk':>4} {'comb':>5} disk slug")
for s, gi, gp, bisum, bp, clk, comb, disk, m in rows[:30]:
    tag = "" if not m else " [monitored]"
    print(f"{gi:>6} {str(gp):>5} {bisum:>6} {str(bp):>5} {clk:>4} {comb:>5} {'y' if disk else 'n':>4} {s}{tag}")
