"""Regression guard: a locked fixture of known answers, asserted against a run's files.

Inputs: scripts/link_engine/sites/<site>_selftest.json (expected values per run date) and the run dir
  (stages/05_clusters, 06_families, 08_edges_html, 08_pages, 09_compare_summary.json, 10_assignments, inputs/leads_by_entry_page.csv,
  DEMAND_MAP.md, GAP_LIST.md) plus docs/_engines/link_engine_store/serp_index.csv.
Outputs: accuracy/F_selftest.json (+ .meta.json): one line per check, pass/fail, expected and actual.
Exit code: 0 when every check passes, 1 otherwise. Cost: free. A new run supplies its own expected values by adding a key to the JSON.

Checks
  1 dedupe    the head's close-variant group counted once; demand_volume equals the fixture and 06_families.csv
  2 owners    the named families are owned by the named pages
  3 baseline  body links (region body, status ok|redirect, self-links ignored) and distinct source pages per target
  4 gate      09_compare_summary.json gate
  5 store     every serp_index.csv row points to an existing file
  6 leads     total leads and est_value_gbp in inputs/leads_by_entry_page.csv
  7 routes    every owner_page and primary_dest is a built route (08_pages.csv) or a sentinel (none, GAP...)
  8 dash      no em-dash in the named docs
  9 variants  no (stemmed token set, volume, cpc) group appears in more than one family
"""
from __future__ import annotations

import argparse
import json
import sys
from collections import Counter, defaultdict

from cluster import lex_key
from common import REPO, load_site, read_csv, run_dir, script_meta, now_utc

EM = "—"


def check_dedupe(d, exp, le):
    fam = next(r for r in read_csv(d / "stages/06_families.csv") if r["family_id"] == exp["family_id"])
    ks = [k for k in read_csv(d / "stages/05_clusters.csv") if k["family_id"] == exp["family_id"]]
    groups = {}
    for k in ks:
        groups[(lex_key(k["keyword"], le["cities"]), k["volume"], k["cpc"])] = float(k["volume"] or 0)
    deduped = int(sum(groups.values()))
    n_big = sum(1 for (_, v, _) in groups if v and float(v) == exp["group_volume"])
    ok = deduped == exp["demand_volume"] == int(float(fam["demand_volume"])) and n_big == exp["group_count"]
    return ok, {"expected": exp, "recomputed_demand": deduped, "families_csv": fam["demand_volume"], f"groups_of_{exp['group_volume']}": n_big}


def check_owners(d, exp, le):
    fam = {r["family_id"]: r["owner_page"] for r in read_csv(d / "stages/06_families.csv")}
    act = {k: fam.get(k) for k in exp}
    return act == exp, {"expected": exp, "actual": act}


def check_baseline(d, exp, le):
    links, srcs = Counter(), defaultdict(set)
    for r in read_csv(d / "stages/08_edges_html.csv"):
        if r["region"] == "body" and r["status"] in ("ok", "redirect") and r["source"] != r["target_final"]:
            links[r["target_final"]] += 1
            srcs[r["target_final"]].add(r["source"])
    al = {t: links[t] for t in exp["body_links"]}
    asrc = {t: len(srcs[t]) for t in exp["source_pages"]}
    return al == exp["body_links"] and asrc == exp["source_pages"], {"expected_links": exp["body_links"], "actual_links": al,
                                                                       "expected_sources": exp["source_pages"], "actual_sources": asrc}


def check_gate(d, exp, le):
    g = json.loads((d / "stages/09_compare_summary.json").read_text(encoding="utf-8")).get("gate")
    return g == exp, {"expected": exp, "actual": g}


def check_store(d, exp, le):
    idx = REPO / "docs/_engines/link_engine_store/serp_index.csv"
    rows = read_csv(idx)
    missing = [r["path"] for r in rows if not (REPO / r["path"]).is_file()]
    return len(rows) >= exp and not missing, {"rows": len(rows), "min_rows": exp, "missing": missing[:10], "n_missing": len(missing)}


def check_leads(d, exp, le):
    rows = read_csv(d / "inputs/leads_by_entry_page.csv")
    tot, val = sum(int(r["leads"]) for r in rows), sum(float(r["est_value_gbp"] or 0) for r in rows)
    return tot == exp["total"] and round(val) == exp["value_gbp"], {"expected": exp, "actual": {"total": tot, "value_gbp": round(val)}}


def check_routes(d, exp, le):
    routes = {r["route"] for r in read_csv(d / "stages/08_pages.csv")}
    ok = lambda v: v in routes or any(v.startswith(s) for s in exp)
    bad = [("06_families.owner_page", r["owner_page"]) for r in read_csv(d / "stages/06_families.csv") if r["owner_page"] and not ok(r["owner_page"])]
    bad += [("10_assignments.primary_dest", r["primary_dest"]) for r in read_csv(d / "stages/10_assignments.csv") if r["primary_dest"] and not ok(r["primary_dest"])]
    return not bad, {"sentinels": exp, "unbuilt": sorted(set(bad))[:10], "n_unbuilt": len(bad)}


def check_dash(d, exp, le):
    hits = {f: (d / f).read_text(encoding="utf-8").count(EM) for f in exp}
    return not any(hits.values()), {"em_dash_counts": hits}


def check_variants(d, exp, le):
    """9: no (stemmed token set, volume, cpc) Google Ads group sits in more than one family (non-geo keywords with volume)."""
    fam = defaultdict(set)
    for k in read_csv(d / "stages/05_clusters.csv"):
        if not k["geo"] and float(k["volume"] or 0) > 0:
            fam[(lex_key(k["keyword"], le["cities"]), k["volume"], k["cpc"])].add(k["family_id"])
    bad = {" | ".join(map(str, g)): sorted(f) for g, f in fam.items() if len(f) > exp["max_families_per_group"]}
    return not bad, {"max_families_per_group": exp["max_families_per_group"], "n_groups": len(fam), "violations": dict(list(bad.items())[:10])}


CHECKS = [("1 close-variant dedupe", "dedupe", check_dedupe), ("2 WP1 owners", "wp1_owners", check_owners),
          ("3 link baseline", "link_baseline", check_baseline), ("4 graph gate", "graph_gate", check_gate),
          ("5 store integrity", "serp_index_rows_min", check_store), ("6 leads", "leads", check_leads),
          ("7 built routes", "route_sentinels", check_routes), ("8 no em-dash", "no_dash_files", check_dash),
          ("9 close variants in one family", "variant_groups", check_variants)]


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--site", required=True)
    ap.add_argument("--run", help="run date; default: the latest key in <site>_selftest.json")
    a = ap.parse_args()
    from pathlib import Path
    fx = json.loads((Path(__file__).parent / "sites" / f"{a.site}_selftest.json").read_text(encoding="utf-8"))["runs"]
    run = a.run or max(fx)
    if run not in fx:
        print(f"selftest: no fixture for run {run} in {a.site}_selftest.json")
        return 1
    d = run_dir(a.site, run)
    le = load_site(a.site)["link_engine"]
    results = []
    for name, key, fn in CHECKS:
        try:
            ok, detail = fn(d, fx[run][key], le)
        except Exception as e:  # a crashed check is a failed check
            ok, detail = False, {"error": f"{type(e).__name__}: {e}"}
        results.append({"check": name, "pass": bool(ok), **detail})
        print(f"{'PASS' if ok else 'FAIL'}  {name}")
    passed = all(r["pass"] for r in results)
    rep = {"site": a.site, "run": run, "ran_at": now_utc(), "result": "PASS" if passed else "FAIL",
           "passed": sum(r["pass"] for r in results), "total": len(results), "checks": results}
    out = d / "accuracy" / "F_selftest.json"
    out.parent.mkdir(exist_ok=True)
    out.write_text(json.dumps(rep, indent=2), encoding="utf-8")
    Path(str(out) + ".meta.json").write_text(json.dumps({"source": f"sites/{a.site}_selftest.json + run files", "site": a.site, "data_through": run,
                                                       "pulled_at": now_utc(), **script_meta()}, indent=2), encoding="utf-8")
    print(f"selftest {rep['result']}: {rep['passed']}/{rep['total']}")
    return 0 if passed else 1


if __name__ == "__main__":
    sys.exit(main())
