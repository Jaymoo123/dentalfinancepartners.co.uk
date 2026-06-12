"""Register a Track 2 rewrite batch into monitored_pages for the 90-day
regression watch, driven off the QA-batch manifest (not a hardcoded list).

Red-team fix: registration was an opt-in hardcoded Phase-3 list decoupled from
deploy, so batches shipped UNMONITORED, and baselines were Google-only. This
script reads the same manifest the pre-deploy gate consumes
(optimisation_engine/.cache/qa_verdict_<batch>.json), registers every all_clear
slug, and captures BOTH a Google baseline (trailing 90d GSC) AND a Bing baseline
(latest bing_query_data snapshot) - because these pages rank far better on Bing
than Google, so Bing is the primary regression signal.

Usage:
  python scripts/register_monitored_batch.py --batch batch4              # dry-run (property)
  python scripts/register_monitored_batch.py --batch batch4 --commit
  python scripts/register_monitored_batch.py --batch batch4 --rewrite-date 2026-05-30 --commit
  python scripts/register_monitored_batch.py --site dentists --batch batch1 --commit
  python scripts/register_monitored_batch.py --site medical --slugs a b c --commit
  # or register explicit slugs without a manifest:
  python scripts/register_monitored_batch.py --slugs a b c --commit
Idempotent: skips slugs already present in monitored_pages for the site.
--site defaults to 'property' for back-compat.
"""
from __future__ import annotations

import argparse
import datetime
import json
import os
import pathlib
import re
import sys

import httpx
from dotenv import load_dotenv

load_dotenv()
PROJECT_REF = "dhlxwmvmkrfnmcgjbntk"
TOKEN = os.environ["SUPABASE_ACCESS_TOKEN"]
URL = f"https://api.supabase.com/v1/projects/{PROJECT_REF}/database/query"

# ---------------------------------------------------------------------------
# Per-site hardcoded fallback map.
# Used when sites/<site>.json does not exist (generalist, agency) or as a
# safety net. Sources of truth in priority order:
#   1. sites/<site>.json  (blogContentDir + productionDomain)
#   2. This map (derived from the Supabase `sites` table content_dir + domain)
# Domains verified against the Supabase sites table (field: domain).
# ---------------------------------------------------------------------------
_SITE_FALLBACK: dict[str, tuple[str, str]] = {
    "property":   ("Property/web/content/blog",        "https://www.propertytaxpartners.co.uk"),
    "dentists":   ("Dentists/web/content/blog",         "https://www.dentalfinancepartners.co.uk"),
    "medical":    ("Medical/web/content/blog",          "https://www.medicalaccounts.co.uk"),
    "solicitors": ("Solicitors/web/content/blog",       "https://www.accountsforlawyers.co.uk"),
    "generalist": ("generalist/web/content/blog",       "https://www.hollowaydavies.co.uk"),
    # NOTE: Supabase has 'Digital Agency/web/content/blog' but on-disk path is
    # 'digital-agency/web/content/blog' — we use the correct on-disk path here.
    "agency":     ("digital-agency/web/content/blog",   "https://www.agencyfounderfinance.co.uk"),
}


def _arg_site() -> str:
    """--site <key> selects the site_key + corpus + production domain (default
    property for back-compat). Resolved here so SITE/BLOG_DIR/PROD_DOMAIN stay
    module-level, matching scripts/track2_link_audit.py + predeploy_gate.py."""
    if "--site" in sys.argv:
        i = sys.argv.index("--site")
        if i + 1 < len(sys.argv):
            return sys.argv[i + 1]
    return "property"


def _resolve_site(site: str):
    """Return (site_key, blog_dir, prod_domain) for any registered site.

    Resolution order:
      1. sites/<site>.json  (paths.blogContentDir + vercel.productionDomain)
      2. _SITE_FALLBACK map (covers generalist + agency which have no sites json)
      3. Hard default: property (back-compat)

    Raises ValueError for unknown site keys so callers get a clear error
    rather than silently using property defaults.
    """
    # Try sites/<site>.json first (dentists, property, medical, solicitors).
    p = pathlib.Path("sites") / f"{site}.json"
    if p.exists():
        cfg = json.loads(p.read_text(encoding="utf-8"))
        blog_raw = cfg["paths"]["blogContentDir"]
        # Normalise path: 'Digital Agency/...' -> 'digital-agency/...'
        blog = pathlib.Path(_normalise_content_dir(blog_raw))
        dom = (cfg.get("vercel", {}).get("productionDomain") or "").strip().rstrip("/")
        prod = ("https://" + dom) if (dom and not dom.startswith("http")) else dom
        if prod:
            return site, blog, prod

    # Fallback map (generalist, agency, and any site whose json is missing).
    if site in _SITE_FALLBACK:
        blog_raw, prod = _SITE_FALLBACK[site]
        return site, pathlib.Path(blog_raw), prod

    # Unknown site — raise so the operator knows what happened.
    known = list(_SITE_FALLBACK.keys())
    raise ValueError(
        f"Unknown site_key {site!r}. Known sites: {known}. "
        f"Add a sites/{site}.json or extend _SITE_FALLBACK."
    )


def _normalise_content_dir(raw: str) -> str:
    """Normalise a content dir path string.

    Handles the known discrepancy where sites/agency.json (if it existed) might
    store 'Digital Agency/...' but the actual on-disk path is 'digital-agency/...'.
    """
    # Check as-is first.
    if pathlib.Path(raw).exists():
        return raw
    # Try lowercase + hyphenate first segment.
    parts = pathlib.Path(raw).parts
    if parts:
        normalised_first = parts[0].lower().replace(" ", "-")
        alt_parts = (normalised_first,) + parts[1:]
        alt = str(pathlib.Path(*alt_parts))
        if pathlib.Path(alt).exists():
            return alt
    return raw


SITE, BLOG_DIR, PROD_DOMAIN = _resolve_site(_arg_site())
CACHE = pathlib.Path("optimisation_engine/.cache")
MONITOR_DAYS = 90
BASELINE_WINDOW_DAYS = 90


def sql(query: str):
    r = httpx.post(URL, headers={"Authorization": f"Bearer {TOKEN}",
                                 "Content-Type": "application/json"},
                   json={"query": query}, timeout=90)
    r.raise_for_status()
    return r.json()


def esc(v):
    return "NULL" if v is None else "'" + str(v).replace("'", "''") + "'"


def num(v):
    return "NULL" if v is None else str(v)


def slugify_category(cat: str) -> str:
    s = cat.lower().replace("(", "").replace(")", "").replace("&", "and")
    s = re.sub(r"\s+", "-", s)
    return re.sub(r"-+", "-", s).strip("-")


def page_url_for(slug: str) -> str:
    f = BLOG_DIR / f"{slug}.md"
    cat = "uncategorised"
    if f.exists():
        m = re.search(r"^category:\s*[\"']?(.+?)[\"']?\s*$", f.read_text(encoding="utf-8"), re.MULTILINE)
        if m:
            cat = slugify_category(m.group(1))
    return f"/blog/{cat}/{slug}"


def gsc_baseline(slug: str, start: str, end: str):
    """Impression-weighted Google baseline over the trailing pre-rewrite window."""
    row = sql(f"""
        SELECT COALESCE(SUM(clicks),0) AS clicks, COALESCE(SUM(impressions),0) AS impressions,
               CASE WHEN SUM(impressions) > 0
                    THEN ROUND((SUM(position*impressions)/SUM(impressions))::numeric, 2)
                    ELSE NULL END AS position
        FROM gsc_query_data
        WHERE site_key='{SITE}' AND date BETWEEN '{start}' AND '{end}'
          AND (page_url LIKE '%/{slug}' OR page_url LIKE '%/{slug}/');
    """)[0]
    return int(row["clicks"]), int(row["impressions"]), row["position"]


def bing_baseline(slug: str):
    """Impression-weighted Bing baseline from the latest bing_query_data snapshot."""
    row = sql(f"""
        SELECT COALESCE(SUM(clicks),0) AS clicks, COALESCE(SUM(impressions),0) AS impressions,
               CASE WHEN SUM(impressions) > 0
                    THEN ROUND((SUM(position*impressions)/SUM(impressions))::numeric, 1)
                    ELSE NULL END AS position
        FROM bing_query_data
        WHERE site_key='{SITE}'
          AND (page_url LIKE '%/{slug}' OR page_url LIKE '%/{slug}/')
          AND date = (SELECT MAX(date) FROM bing_query_data WHERE site_key='{SITE}');
    """)[0]
    return int(row["clicks"]), int(row["impressions"]), row["position"]


def slugs_from_manifest(batch: str) -> list[str]:
    p = CACHE / f"qa_verdict_{batch}.json"
    if not p.exists():
        raise SystemExit(f"No QA manifest at {p}. Run qa_verdict.py record --batch {batch} first.")
    data = json.loads(p.read_text(encoding="utf-8"))
    slugs = [s for s, v in data.get("slugs", {}).items() if v.get("all_clear")]
    not_clear = [s for s, v in data.get("slugs", {}).items() if not v.get("all_clear")]
    if not_clear:
        raise SystemExit(f"Refusing to register: {len(not_clear)} slug(s) NOT all_clear in {batch}: {not_clear}")
    return slugs


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--site", default="property",
                    help="site_key + corpus + production domain (resolved at import via sites/<site>.json; default property)")
    ap.add_argument("--batch", help="QA batch name -> reads optimisation_engine/.cache/qa_verdict_<batch>.json")
    ap.add_argument("--slugs", nargs="+", help="explicit slugs (instead of --batch manifest)")
    ap.add_argument("--rewrite-date", default=datetime.date.today().isoformat(),
                    help="go-live date YYYY-MM-DD (default today)")
    ap.add_argument("--commit", action="store_true")
    ap.add_argument("--print-urls", action="store_true",
                    help="print the full canonical URL for each batch slug and exit (no DB writes); for IndexNow")
    a = ap.parse_args()

    if a.batch and not a.slugs:
        slugs = slugs_from_manifest(a.batch)
    elif a.slugs:
        slugs = a.slugs
    else:
        raise SystemExit("Pass --batch or --slugs.")

    if a.print_urls:
        for slug in slugs:
            print(PROD_DOMAIN + page_url_for(slug))
        return

    go_live = datetime.date.fromisoformat(a.rewrite_date)
    monitor_until = (go_live + datetime.timedelta(days=MONITOR_DAYS)).isoformat()
    base_start = (go_live - datetime.timedelta(days=BASELINE_WINDOW_DAYS)).isoformat()
    base_end = (go_live - datetime.timedelta(days=1)).isoformat()
    pulled_at = datetime.datetime.now(datetime.timezone.utc).isoformat()
    note = f"Track 2 {a.batch or 'manual'} REWRITE; registered {datetime.date.today().isoformat()} (G+Bing baseline)"

    existing = {r["slug"] for r in sql(
        f"SELECT slug FROM monitored_pages WHERE site_key='{SITE}' AND slug IN ("
        + ",".join(esc(s) for s in slugs) + ");")} if slugs else set()

    rows = []
    print(f"Batch={a.batch} rewrite_date={a.rewrite_date} baseline={base_start}..{base_end} monitor_until={monitor_until}\n")
    for slug in slugs:
        gc, gi, gp = gsc_baseline(slug, base_start, base_end)
        bc, bi, bp = bing_baseline(slug)
        rows.append(dict(slug=slug, page_url=page_url_for(slug), gc=gc, gi=gi, gp=gp, bc=bc, bi=bi, bp=bp))
        flag = "SKIP(exists)" if slug in existing else "INSERT"
        print(f"  [{flag}] {slug}")
        print(f"        Google base: clk={gc} impr={gi} pos={gp}")
        print(f"        Bing   base: clk={bc} impr={bi} pos={bp}")

    fresh = [r for r in rows if r["slug"] not in existing]
    if not fresh:
        print("\nNothing to insert (all present).")
        return
    if not a.commit:
        print(f"\nDRY RUN. {len(fresh)} to insert. Re-run with --commit.")
        return

    values = ",\n".join(
        f"({esc(SITE)},{esc(r['slug'])},{esc(r['page_url'])},{esc(a.rewrite_date)},"
        f"{esc(monitor_until)},'rewrite',NULL,"
        f"{r['gc']},{r['gi']},{num(r['gp'])},{BASELINE_WINDOW_DAYS},{esc(pulled_at)},'active',{esc(note)},"
        f"{r['bc']},{r['bi']},{num(r['bp'])},{esc(pulled_at)})"
        for r in fresh)
    sql(f"""
        INSERT INTO monitored_pages
            (site_key, slug, page_url, rewrite_date, monitor_until, rewrite_type,
             redirect_target, baseline_clicks, baseline_impressions, baseline_position,
             baseline_window_days, baseline_pulled_at, status, notes,
             baseline_bing_clicks, baseline_bing_impressions, baseline_bing_position, baseline_bing_pulled_at)
        VALUES
        {values};
    """)
    print(f"\nInserted {len(fresh)} monitored rows (Google + Bing baselines). monitor_until={monitor_until}")


if __name__ == "__main__":
    main()
