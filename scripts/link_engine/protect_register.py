"""Protected-page register: which indexable pages earn traffic on Google OR Bing, so no rewrite throws it away.

Inputs: stages/08_pages.csv (indexable routes), 03b_gsc_page_fresh.csv, 03b_gsc_query_page_fresh.csv,
        03c_url_inspection.csv (optional), inputs/leads_by_entry_page.csv, Bing GetPageQueryStats per page.
Output: stages/13_protect_register.csv (+ .meta.json), stages/13_protect_summary.json.
Cost: free (Bing Webmaster API; GSC data comes from the stage-03b files, no GSC calls here).

Bing raw responses are cached at .cache/link_engine/bing/<sha1(url)>.json and stored (append-only, committed)
at docs/_engines/link_engine_store/bing/<yyyy-mm>/<sha1(url)>.json.gz with a row in bing_index.csv, so a page is
never re-pulled while a copy younger than --max-age-days (default 7) exists. --refresh forces a re-pull.
Bing returns weekly rows over its own trailing window (about 12 weeks to a few months); we sum every row it gives.
www and apex page forms return identical data (checked 2026-10-10); apex is only tried when www is empty.

Thresholds live in sites/<site>.json link_engine.protect_thresholds (tunable):
  protected = yes if ANY of: bing_clicks >= 10, bing_top3_queries >= 5, gsc_clicks_90d >= 5,
              gsc_impr_90d >= 500, leads_90d >= 1.
  bing_top3_queries = Bing queries with impression-weighted avg position <= 3 and >= 3 impressions.
  leverage_flag = bing_clicks >= 10 and (Google not indexed, per 03c, or gsc_impr_90d < 100).
Usage: python protect_register.py --site property --run 2026-10-10 [--refresh] [--limit N]
"""
from __future__ import annotations

import argparse
import collections
import gzip
import hashlib
import json
import sys
import time
from datetime import date
from pathlib import Path
from urllib.parse import urlsplit

sys.path.insert(0, str(Path(__file__).parent))
import httpx  # noqa: E402
from common import (REPO, STORE, _csv_append, _csv_rows, bing_date, bing_get, load_site, norm_query,  # noqa: E402
                    read_csv, run_dir, script_meta, write_csv)

BING_CACHE = REPO / ".cache" / "link_engine" / "bing"
BING_STORE = STORE / "bing"
BING_INDEX = STORE / "bing_index.csv"
BING_INDEX_FIELDS = ["url", "bing_site", "fetched_on", "path", "n_rows"]
FIELDS = ["route", "bing_impr", "bing_clicks", "bing_queries", "bing_top3_queries", "gsc_impr_90d", "gsc_clicks_90d",
          "google_index_state", "leads_90d", "protected", "protect_reason", "leverage_flag"]


def canon_url(le: dict, route: str) -> str:
    base = "https://www." + le["domain"]
    return base if route == "/" else base + route


def _sha1(u: str) -> str:
    return hashlib.sha1(u.encode()).hexdigest()


def _fresh(fetched_on: str, max_age: int) -> bool:
    try:
        return (date.today() - date.fromisoformat(fetched_on[:10])).days <= max_age
    except ValueError:
        return False


def load_bing_raw(url: str, max_age: int = 7):
    """Latest stored/cached raw Bing rows for url if younger than max_age days, else None."""
    cp = BING_CACHE / f"{_sha1(url)}.json"
    if cp.exists() and (time.time() - cp.stat().st_mtime) / 86400 <= max_age:
        return json.loads(cp.read_text(encoding="utf-8"))["rows"]
    best = None
    for r in _csv_rows(BING_INDEX):
        if r["url"] == url and _fresh(r["fetched_on"], max_age) and (best is None or r["fetched_on"] >= best["fetched_on"]):
            best = r
    if best and (REPO / best["path"]).exists():
        with gzip.open(REPO / best["path"], "rt", encoding="utf-8") as f:
            return json.load(f)["rows"]
    return None


def fetch_bing(le: dict, route: str, max_age: int = 7, refresh: bool = False, throttle: float = 0.4):
    """Raw GetPageQueryStats rows for a route (cache -> store -> API). Returns (rows, source)."""
    url = canon_url(le, route)
    if not refresh:
        rows = load_bing_raw(url, max_age)
        if rows is not None:
            return rows, "cache"
    rows, used = [], url
    for form in (url, url.replace("://www.", "://", 1)):
        for attempt in range(4):
            try:
                rows = bing_get("GetPageQueryStats", siteUrl=le["bing_site"], page=form) or []
                break
            except httpx.HTTPError as e:
                time.sleep(2 * (attempt + 1))
                if attempt == 3:
                    print(f"  bing error {route}: {e}", file=sys.stderr)
                    rows = []
        time.sleep(throttle)
        used = form
        if rows:
            break
    today = date.today().isoformat()
    body = {"url": url, "queried_form": used, "bing_site": le["bing_site"], "fetched_on": today, "rows": rows}
    BING_CACHE.mkdir(parents=True, exist_ok=True)
    (BING_CACHE / f"{_sha1(url)}.json").write_text(json.dumps(body), encoding="utf-8")
    sp = BING_STORE / today[:7] / f"{_sha1(url)}.json.gz"
    sp.parent.mkdir(parents=True, exist_ok=True)
    with gzip.open(sp, "wt", encoding="utf-8") as f:
        json.dump(body, f)
    _csv_append(BING_INDEX, BING_INDEX_FIELDS, [{"url": url, "bing_site": le["bing_site"], "fetched_on": today,
                                                 "path": str(sp.relative_to(REPO)).replace("\\", "/"), "n_rows": len(rows)}])
    return rows, "api"


def bing_by_query(rows: list[dict]) -> dict:
    """Sum weekly rows per normalised query: impressions, clicks, impression-weighted avg position."""
    agg: dict[str, dict] = {}
    for r in rows:
        q = norm_query(r.get("Query"))
        if not q:
            continue
        a = agg.setdefault(q, {"query": q, "impr": 0, "clicks": 0, "pos_w": 0.0, "click_pos_w": 0.0, "weeks": 0})
        i, c = int(r.get("Impressions") or 0), int(r.get("Clicks") or 0)
        a["impr"] += i
        a["clicks"] += c
        a["pos_w"] += float(r.get("AvgImpressionPosition") or 0) * i
        if (r.get("AvgClickPosition") or -1) > 0:
            a["click_pos_w"] += float(r["AvgClickPosition"]) * c
        a["weeks"] += 1
    for a in agg.values():
        a["pos"] = round(a["pos_w"] / a["impr"], 2) if a["impr"] else None
        a["click_pos"] = round(a["click_pos_w"] / a["clicks"], 2) if a["clicks"] and a["click_pos_w"] else None
    return agg


def path_key(u: str) -> str:
    p = urlsplit(u)
    return (p.path.rstrip("/") or "/")


def _keep(store: dict, key, row: dict, url: str):
    # GSC reports jump-link URLs (#section) as separate rows that share the page's path. The canonical (no-fragment)
    # row always wins; a fragment row only fills a gap, highest impressions first. Before 2026-10-10 the last row read
    # won, so a page could be recorded with one fragment's 45 impressions instead of its 4,053.
    v = {"clicks": int(float(row["clicks"])), "impr": int(float(row["impressions"])), "pos": float(row["position"]),
         "canon": not urlsplit(url).fragment}
    cur = store.get(key)
    if cur is None or (v["canon"] and not cur["canon"]) or (v["canon"] == cur["canon"] and v["impr"] > cur["impr"]):
        store[key] = v


def load_google(stages: Path):
    page, qp = {}, collections.defaultdict(dict)
    for r in read_csv(stages / "03b_gsc_page_fresh.csv"):
        _keep(page, path_key(r["page"]), r, r["page"])
    for r in read_csv(stages / "03b_gsc_query_page_fresh.csv"):
        _keep(qp[path_key(r["page"])], norm_query(r["query"]), r, r["page"])
    return page, qp


def load_index_state(stages: Path) -> dict:
    p = stages / "03c_url_inspection.csv"
    return {path_key(r["url"]): r["coverageState"] for r in read_csv(p)} if p.exists() else {}


def is_indexed(state: str) -> bool:
    return state.lower().startswith(("submitted and indexed", "indexed"))


def row_for(route: str, bing_rows: list[dict], g: dict, state: str, leads: int, th: dict) -> dict:
    bq = bing_by_query(bing_rows)
    b_impr = sum(a["impr"] for a in bq.values())
    b_clicks = sum(a["clicks"] for a in bq.values())
    top3 = sum(1 for a in bq.values() if a["pos"] is not None and a["pos"] <= th["top3_max_position"]
               and a["impr"] >= th["top3_min_impr"])
    gi, gc = g.get("impr", 0), g.get("clicks", 0)
    reasons = []
    if b_clicks >= th["bing_clicks"]:
        reasons.append(f"bing_clicks={b_clicks}")
    if top3 >= th["bing_top3_queries"]:
        reasons.append(f"bing_top3_queries={top3}")
    if gc >= th["gsc_clicks_90d"]:
        reasons.append(f"gsc_clicks_90d={gc}")
    if gi >= th["gsc_impr_90d"]:
        reasons.append(f"gsc_impr_90d={gi}")
    if leads >= th["leads_90d"]:
        reasons.append(f"leads_90d={leads}")
    not_indexed = bool(state) and not is_indexed(state)
    lev = b_clicks >= th["leverage_bing_clicks"] and (not_indexed or gi < th["leverage_gsc_impr_below"])
    return {"route": route, "bing_impr": b_impr, "bing_clicks": b_clicks, "bing_queries": len(bq),
            "bing_top3_queries": top3, "gsc_impr_90d": gi, "gsc_clicks_90d": gc, "google_index_state": state,
            "leads_90d": leads, "protected": "yes" if reasons else "no", "protect_reason": "; ".join(reasons),
            "leverage_flag": "yes" if lev else "no"}


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--site", required=True)
    ap.add_argument("--run", required=True)
    ap.add_argument("--refresh", action="store_true", help="ignore cached/stored Bing responses")
    ap.add_argument("--max-age-days", type=int, default=7)
    ap.add_argument("--limit", type=int, default=0, help="first N routes only (testing)")
    a = ap.parse_args()
    cfg = load_site(a.site)
    le = cfg["link_engine"]
    th = le["protect_thresholds"]
    stages = run_dir(a.site, a.run) / "stages"
    routes = [r["route"] for r in read_csv(stages / "08_pages.csv") if r["indexable"] == "true"]
    if a.limit:
        routes = routes[: a.limit]
    gpage, _ = load_google(stages)
    state = load_index_state(stages)
    leads_p = run_dir(a.site, a.run) / "inputs" / "leads_by_entry_page.csv"
    leads = {path_key(r["entry_path"]): int(r["leads"]) for r in read_csv(leads_p)} if leads_p.exists() else {}
    rows, src, dts = [], collections.Counter(), set()
    for i, route in enumerate(routes, 1):
        braw, s = fetch_bing(le, route, a.max_age_days, a.refresh)
        src[s] += 1
        dts.update(bing_date(x.get("Date")) for x in braw)
        rows.append(row_for(route, braw, gpage.get(route, {}), state.get(route, ""), leads.get(route, 0), th))
        if i % 50 == 0:
            print(f"{i}/{len(routes)} (api {src['api']}, cache {src['cache']})", flush=True)
    bing_range = f"{min(dts)}..{max(dts)}" if dts else ""
    meta = {"source": "Bing GetPageQueryStats (weekly rows summed, Bing's full returned range) + stage 03b GSC 90d + 03c + leads",
            "site": a.site, "thresholds": th, "bing_fetch_sources": dict(src), "bing_date_range": bing_range,
            "gsc_window": json.loads((stages / "03b_gsc_page_fresh.csv.meta.json").read_text(encoding="utf-8")).get("window"),
            "data_through": a.run, **script_meta()}
    write_csv(stages / "13_protect_register.csv", rows, FIELDS, meta)
    prot = [r for r in rows if r["protected"] == "yes"]
    lev = sorted((r for r in rows if r["leverage_flag"] == "yes"), key=lambda r: -r["bing_clicks"])
    summary = {"pages_scanned": len(rows), "protected": len(prot), "not_protected": len(rows) - len(prot),
               "protected_by_reason": {k: sum(1 for r in prot if k in r["protect_reason"]) for k in
                                       ("bing_clicks", "bing_top3_queries", "gsc_clicks_90d", "gsc_impr_90d", "leads_90d")},
               "protected_bing_only": sum(1 for r in prot if r["gsc_clicks_90d"] == 0 and r["bing_clicks"] >= th["bing_clicks"]),
               "leverage_count": len(lev), "bing_fetch_sources": dict(src), "thresholds": th,
               "leverage": [{k: r[k] for k in ("route", "bing_clicks", "bing_impr", "gsc_impr_90d", "gsc_clicks_90d",
                                               "google_index_state")} for r in lev]}
    (stages / "13_protect_summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
    print(json.dumps({k: v for k, v in summary.items() if k not in ("leverage", "thresholds")}, indent=2))


if __name__ == "__main__":
    main()
