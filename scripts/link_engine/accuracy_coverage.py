"""Accuracy pass: C1 coverage (did the engine miss commercial searches?) and C2 second-source volume.

Usage: python scripts/link_engine/accuracy_coverage.py --site property --run 2026-10-10 [--dry-run] [--skip-c2]
Outputs (under <run>/accuracy/, each with .meta.json): C1_coverage_missing.csv, C1_summary.json,
C1_targeted_not_commercial.csv, C2_volume_check.csv, C2_summary.json.

Cost: C1(d) is two DataForSEO Labs ranked_keywords calls (limit 500 each, about $0.06 each) through
common.dfs_post (store first, ledger, $5 cap); a rerun is free (store hit). --dry-run prints the estimate
and makes no paid call (source d is then read from the store if present, else skipped). Bing GetKeywordStats
(C2) is free. Reads only: never edits stages or Property/.
"""
from __future__ import annotations

import argparse
import json
import re
import statistics
import sys
from collections import defaultdict
from datetime import date, timedelta
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import common as C  # noqa: E402
import universe as U  # noqa: E402

PROVIDER_RE = re.compile(r"\b(accountants?|accountancy|accounting|advis[eo]rs?|advice|specialists?|consultants?|experts?|planners?|firms?)\b")
DECISION_RE = re.compile(r"incorporat|limited company|\bltd\b|\bspv\b|\bsell|\bgift|\binherit|\biht\b|non[ -]resident|\bnrl\b|\bsdlt\b|"
                         r"stamp duty|restructur|\btrusts?\b|partnership")
PROP_LOOSE = re.compile(U.CONTEXT + "|" + U.DECISION_CONTEXT)       # provider rule (as universe CONTEXT + DECISION_CONTEXT)
PROP_STRICT = re.compile(U.DECISION_CONTEXT)
SOURCES = {"a_gsc": "GSC query-page", "b_assignment": "QUERY_ASSIGNMENT", "c_bing": "Bing query stats",
           "d_djh": "ranked djh.co.uk /specialisms/property", "d_ukpa": "ranked ukpropertyaccountants.co.uk"}


def word_hit(q: str) -> bool:
    return bool(PROVIDER_RE.search(q) or DECISION_RE.search(q))


def looks_commercial(q: str) -> bool:
    return bool((PROVIDER_RE.search(q) and PROP_LOOSE.search(q)) or (DECISION_RE.search(q) and PROP_STRICT.search(q)))


def fnum(v):
    try:
        return float(v) if v not in ("", None) else None
    except ValueError:
        return None


def ranked(site, run, target, filters, dry):
    task = {"target": target, "location_code": C.UK_LOCATION, "language_code": C.LANG, "limit": 500,
            "order_by": ["keyword_data.keyword_info.search_volume,desc"]}
    if filters:
        task["filters"] = filters
    body = C.ranked_store_lookup(task)
    if body is None:
        est = C.estimate_cost(C.RANKED, [task])
        if dry:
            print(f"DRY RUN: {target} would cost ~${est:.3f} (not in store); skipped")
            return None, est
        body = C.dfs_post(C.RANKED, [task], site, run)
        if body.get("status_code") != 20000:
            raise RuntimeError(f"ranked_keywords {target}: {body.get('status_message')}")
    out = []
    for t in body.get("tasks") or []:
        for res in t.get("result") or []:
            for it in res.get("items") or []:
                kd = it.get("keyword_data") or {}
                out.append({"q": C.norm_query(kd.get("keyword", "")),
                            "vol": (kd.get("keyword_info") or {}).get("search_volume"),
                            "url": ((it.get("ranked_serp_element") or {}).get("serp_item") or {}).get("url", "")})
    return out, 0.0


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--site", required=True)
    ap.add_argument("--run", required=True)
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--skip-c2", action="store_true")
    a = ap.parse_args()
    cfg = C.load_site(a.site)["link_engine"]
    R = C.run_dir(a.site, a.run)
    S, OUT = R / "stages", R / "accuracy"
    meta = {"site": a.site, **C.script_meta()}

    universe = {r["query"]: r for r in C.read_csv(S / "01_universe.csv")}
    metrics = {r["query"]: r for r in C.read_csv(S / "02_metrics.csv")}
    store_vol = {}
    for r in C._csv_rows(C.STORE / "keyword_metrics.csv"):
        if r["endpoint"] == C.SV and r["search_volume"] != "":
            store_vol[r["keyword"]] = float(r["search_volume"])

    def known_volume(q):
        for src, v in ((metrics.get(q, {}).get("volume"), "metrics"), (store_vol.get(q), "store"),
                       (universe.get(q, {}).get("cached_volume"), "universe_cache")):
            if fnum(src) is not None:
                return fnum(src), v
        return None, ""

    # cand[source][query] = {"vol": source volume or None, "imp": monthly-ised impressions or None}
    cand = {k: defaultdict(lambda: {"vol": None, "imp": 0.0}) for k in SOURCES}
    # (a) GSC
    gsc_meta = json.loads((S / "03_gsc_query_page.csv.meta.json").read_text())
    for r in C.read_csv(S / "03_gsc_query_page.csv"):
        q = C.norm_query(r["query"])
        if word_hit(q):
            cand["a_gsc"][q]["imp"] += float(r["impressions"] or 0) / 3        # 90 days -> monthly
    # (b) assignment
    for r in C.read_csv(C.REPO / cfg["prior_assignment"]):
        if r["owner_page"].strip().lower() != "exclude":
            q = C.norm_query(r["query"])
            cand["b_assignment"][q]["vol"] = fnum(r["monthly_volume"])
            cand["b_assignment"][q]["imp"] += float(r["gsc_impressions_90d"] or 0) / 3
    # (c) Bing (weekly rows over ~19 weeks -> monthly)
    bing = defaultdict(float)
    for r in C.read_csv(S / "03_bing_query.csv"):
        bing[C.norm_query(r["query"])] += float(r["impressions"] or 0)
    for q, imp in bing.items():
        if word_hit(q):
            cand["c_bing"][q]["imp"] = imp / 19 * 4.35
    # (d) competitor ranked keywords
    est_total, d_notes = 0.0, {}
    for key, tgt, flt in (("d_djh", "djh.co.uk", [["ranked_serp_element.serp_item.url", "like", "%/specialisms/property%"]]),
                          ("d_ukpa", "ukpropertyaccountants.co.uk", None)):
        items, est = ranked(a.site, a.run, tgt, flt, a.dry_run)
        est_total += est
        d_notes[key] = "skipped (dry run, not in store)" if items is None else f"{len(items)} items"
        for it in items or []:
            if it["q"]:
                cand[key][it["q"]]["vol"] = fnum(it["vol"])
    if a.dry_run:
        print(f"DRY RUN total estimated spend ${est_total:.3f}; ledger run spend ${C.run_spend(a.site, a.run):.3f}")

    # status + rows
    def status(q):
        u = universe.get(q)
        if not u:
            return "absent"
        return f"included:{u['intent_class']}" if u["intent_class"] in ("hire", "decision") else f"excluded:{u['excluded_reason']}"

    rows_by_q: dict[str, dict] = {}
    summary = {}
    for src, qs in cand.items():
        st = {"n_candidates": len(qs), "n_in_universe_included": 0, "n_excluded": 0, "n_absent": 0,
              "n_looks_commercial": 0, "commercial_included": 0, "commercial_excluded": 0, "commercial_absent": 0}
        w_in = w_all = 0.0
        for q, d in qs.items():
            s = status(q)
            lc = looks_commercial(q)
            kv, kvsrc = known_volume(q)
            vol, vbasis = (d["vol"], "source") if d["vol"] is not None else (kv, kvsrc)
            if vol is None:
                vol, vbasis = (round(d["imp"], 1), "impressions_monthly_proxy") if d["imp"] else (None, "")
            st["n_in_universe_included" if s.startswith("included") else "n_absent" if s == "absent" else "n_excluded"] += 1
            if lc:
                st["n_looks_commercial"] += 1
                st["commercial_" + ("included" if s.startswith("included") else "absent" if s == "absent" else "excluded")] += 1
                w = vol or 0.0
                w_all += w
                w_in += w if s.startswith("included") else 0.0
            if not s.startswith("included"):
                r = rows_by_q.setdefault(q, {"query": q, "sources": [], "volume": None, "volume_basis": "", "our_status": s,
                                             "looks_commercial": lc})
                r["sources"].append(src)
                if vol is not None and (r["volume"] is None or vbasis == "source" or r["volume_basis"] != "source"
                                        and vol > r["volume"]):
                    r["volume"], r["volume_basis"] = vol, vbasis
        st["volume_weighted_capture_share"] = round(w_in / w_all, 4) if w_all else None
        st["commercial_volume_total"] = round(w_all, 1)
        st["count_capture_share"] = round(st["commercial_included"] / st["n_looks_commercial"], 4) if st["n_looks_commercial"] else None
        summary[src] = st
    out = sorted(rows_by_q.values(), key=lambda r: (not r["looks_commercial"], -(r["volume"] or 0), r["query"]))
    for r in out:
        r["sources"] = "|".join(r["sources"])
    C.write_csv(OUT / "C1_coverage_missing.csv", out,
                ["query", "sources", "volume", "volume_basis", "our_status", "looks_commercial"],
                {**meta, "source": "GSC/assignment/Bing/DFS ranked_keywords vs 01_universe", "data_through": gsc_meta.get("data_through"),
                 "note": "rows not included in universe; volume = source volume, else 02_metrics/store/universe cache, else monthly-ised impressions (volume_basis)"})

    # targeted check
    tgt = []
    for q, u in universe.items():
        if u["excluded_reason"] == "not_commercial_intent" and PROVIDER_RE.search(q) and PROP_LOOSE.search(q):
            v, _ = known_volume(q)
            tgt.append({"query": q, "source_flags": u["source_flags"], "cached_volume": u["cached_volume"], "volume": v})
    tgt.sort(key=lambda r: -(r["volume"] or 0))
    C.write_csv(OUT / "C1_targeted_not_commercial.csv", tgt, ["query", "source_flags", "cached_volume", "volume"],
                {**meta, "source": "01_universe not_commercial_intent with provider word AND property word"})
    summary_out = {"sources": summary, "ranked_notes": d_notes, "dry_run": a.dry_run,
                   "targeted_not_commercial_with_provider_and_property": len(tgt),
                   "n_missing_rows": len(out), "n_missing_looks_commercial": sum(1 for r in out if r["looks_commercial"]),
                   "run_spend_usd": C.run_spend(a.site, a.run),
                   "weights": "volume = source volume, else google ads (metrics/store/cache), else monthly-ised impressions proxy"}
    (OUT / "C1_summary.json").write_text(json.dumps(summary_out, indent=2), encoding="utf-8")
    (OUT / "C1_summary.json.meta.json").write_text(json.dumps({**meta, "pulled_at": C.now_utc()}, indent=2), encoding="utf-8")

    if not a.skip_c2:
        c2(S, OUT, meta, metrics)


def c2(S, OUT, meta, metrics):
    top = sorted(metrics.values(), key=lambda r: -(fnum(r["volume"]) or 0))[:40]
    rows = []
    for r in top:
        d = C.bing_get("GetKeywordStats", q=r["query"], country="gb", language="en-GB")
        wk = {C.bing_date(x["Date"]): x.get("Impressions") or 0 for x in d or []}
        wkb = {C.bing_date(x["Date"]): x.get("BroadImpressions") or 0 for x in d or []}
        last = max(wk) if wk else None
        cut = (date.fromisoformat(last) - timedelta(days=91)).isoformat() if last else None
        s13 = sum(v for k, v in wk.items() if k > cut) if last else 0
        g = fnum(r["volume"])
        bm = round(s13 / 3, 1)
        bb = round(sum(v for k, v in wkb.items() if last and k > cut) / 3, 1)
        rows.append({"keyword": r["query"], "intent_class": r["intent_class"], "google_ads_volume": g, "bing_monthly": bm, "bing_broad_monthly": bb,
                     "bing_weeks_with_data_13w": sum(1 for k in wk if last and k > cut), "bing_last_week": last,
                     "ratio": round(bm / g, 4) if g else None})
    med = statistics.median(r["ratio"] for r in rows if r["ratio"])       # median over keywords where Bing has exact impressions
    for r in rows:
        rel = r["ratio"] / med if med and r["ratio"] else None
        r["ratio_vs_median"] = round(rel, 2) if rel is not None else None
        r["flag"] = "bing_no_data" if rel is None else "bing_high" if rel > 2 else "bing_low" if rel < 0.5 else ""
    C.write_csv(OUT / "C2_volume_check.csv", rows,
                ["keyword", "intent_class", "google_ads_volume", "bing_monthly", "bing_broad_monthly", "bing_weeks_with_data_13w", "bing_last_week", "ratio",
                 "ratio_vs_median", "flag"],
                {**meta, "source": "Bing Webmaster GetKeywordStats gb/en-GB, sum of weekly Impressions in the 91 days to the last data week / 3",
                 "note": "flag = ratio more than 2x or less than 0.5x the median ratio of the 40; DFS clickstream not bought"})
    sm = {"n": len(rows), "median_ratio": round(med, 4), "n_with_bing_data": sum(1 for r in rows if r["ratio"]),
          "n_bing_no_data": sum(1 for r in rows if r["flag"] == "bing_no_data"),
          "n_outliers": sum(1 for r in rows if r["flag"] in ("bing_high", "bing_low")),
          "flagged": [(r["keyword"], r["google_ads_volume"], r["bing_monthly"], r["ratio_vs_median"], r["flag"]) for r in rows if r["flag"] in ("bing_high", "bing_low")],
          "median_basis": "keywords with nonzero exact Bing impressions; others flagged bing_no_data (Bing stats sparse)",
          "second_provider": "Bing only (free); DFS clickstream/bulk volume not bought"}
    (OUT / "C2_summary.json").write_text(json.dumps(sm, indent=2), encoding="utf-8")
    (OUT / "C2_summary.json.meta.json").write_text(json.dumps({**meta, "pulled_at": C.now_utc()}, indent=2), encoding="utf-8")


if __name__ == "__main__":
    main()
