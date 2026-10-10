"""Stage 09 gate: reconcile the built-HTML link count (stage 08) with the source-level link count (stage 09).

Inputs: stages/08_edges_html.csv, 08_pages.csv, 09_edges_source.csv, 09_edges_source_excluded.csv, 06_owner_rollup.csv
Outputs: stages/09_compare.csv          one row per (source, target_final) pair whose editorial link count differs between methods:
                                        source, target_final, n_html, n_source, html_regions, source_fields, cause, resolution
         stages/09_compare_summary.json agreement on blog posts and on money-page targets, differences by cause, gate PASS/FAIL,
                                        and the 2026-10-09 baseline read from the same two files
Cost: free (local csv only, no network, no build). Deterministic. Exit code is 0 either way; the verdict is in the summary.

Editorial body, the one definition both stages implement:
  html    region == body, status ok|redirect                       (08_edges_html.csv)
  source  field in {body, template}, status ok|redirect            (09_edges_source.csv)
Self links are ignored on both sides. Anything else is navigation, a card/chip/map module, FAQ copy, a sidebar CTA or form chrome.

A difference is explained only when its cause is in ALLOWED_CAUSES. The gate is PASS only if (a) every differing pair has an
allowed cause, (b) blog posts (/blog/<category>/<slug>) agree exactly, and (c) no differing pair that points at a money page (an
owner_page in 06_owner_rollup.csv) is unexplained. Run order: graph_html.py, graph_source.py, then this.

Usage: python scripts/link_engine/graph_compare.py --site property --run 2026-10-10
"""
from __future__ import annotations

import argparse
import json
from collections import Counter, defaultdict

from common import load_site, now_utc, read_csv, run_dir, script_meta, write_csv

FIELDS = ["source", "target_final", "n_html", "n_source", "html_regions", "source_fields", "cause", "resolution"]
OK = ("ok", "redirect")
HTML_BODY = "body"
SRC_BODY = ("body", "template")
BASELINE = {"/services/property-accountant": 38, "/services/landlord-accountant": 35, "/services/property-tax-advice": 36}
EXPLAINER = "/blog/property-accountant-services/what-does-a-property-accountant-do"
EXPLAINER_BASELINE = {"links": 90, "sources": 85}

# cause -> why the difference is legitimate. A cause outside this table is "unexplained" and fails the gate.
ALLOWED_CAUSES = {
    "no_built_html": "source page is dynamic/client-rendered and has no prerendered HTML, so stage 08 cannot see its links",
    "route_handler_asset": "target is a route handler or static asset (CSV, feed, robots), not a page; one method calls it external_asset",
    "faq_classification": "one method files the link under FAQ, the other under body",
    "card_component": "link sits in a card, chip, map, carousel or index-tile module that one method counts as body",
    "hub_category_chips": "blog hub category chips counted as body in one method, navigation in nature",
    "sidebar_cta_aside": "sidebar CTA (aside) counted as body by one method",
}
RESOLUTION = {
    "no_built_html": "none needed: not comparable. Page has no static HTML in .next/server/app (client route, noindex).",
    "route_handler_asset": "fix the method that calls it a page: both must mark route handlers external_asset.",
    "faq_classification": "fix the method that files FAQ answers as body: stage 08 region faq == stage 09 field faq.",
    "card_component": "classify the module as navigation in both: stage 08 listing/related_cards, stage 09 excluded module.",
    "hub_category_chips": "classify the chips as listing in stage 08 and exclude the module in stage 09.",
    "sidebar_cta_aside": "classify as aside in stage 08 and exclude in stage 09.",
    "unexplained": "INVESTIGATE: open the built HTML and the component source, decide editorial vs navigation, fix the wrong method.",
}
CARD_REGIONS = {"listing", "related_cards", "related"}


def is_post(route: str) -> bool:
    p = route.strip("/").split("/")
    return len(p) == 3 and p[0] == "blog"


def fmt(c: Counter) -> str:
    return ";".join(f"{k}:{v}" for k, v in sorted(c.items()))


def cause_of(src, tgt, nh, ns, regions, fields, has_html, statuses) -> str:
    if not has_html:
        return "no_built_html"
    if "external_asset" in statuses:
        return "route_handler_asset"
    excl = [f for f in fields if f.startswith("excluded:")]
    if "faq" in regions and ns > nh or "faq" in fields and nh > ns:
        return "faq_classification"
    if "aside" in regions and ns > nh or any("sidebar" in f for f in excl):
        return "sidebar_cta_aside"
    hub = src.startswith("/blog") and not is_post(src) and tgt.startswith("/blog")
    if hub and (nh > ns or "listing" in regions):
        return "hub_category_chips"
    if excl or (CARD_REGIONS & set(regions) and ns > nh):
        return "card_component"
    return "unexplained"


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--site", required=True)
    ap.add_argument("--run", required=True)
    a = ap.parse_args()
    load_site(a.site)                                    # fail early on an unknown site
    st = run_dir(a.site, a.run) / "stages"

    html_all = read_csv(st / "08_edges_html.csv")
    src_all = read_csv(st / "09_edges_source.csv")
    excl_all = read_csv(st / "09_edges_source_excluded.csv")
    pages = {r["route"] for r in read_csv(st / "08_pages.csv")}
    money = [r["owner_page"] for r in read_csv(st / "06_owner_rollup.csv") if r["owner_page"].startswith("/")]

    n_html, n_src = Counter(), Counter()
    regions, fields, statuses = defaultdict(Counter), defaultdict(Counter), defaultdict(set)
    for r in html_all:
        k = (r["source"], r["target_final"])
        if r["source"] == r["target_final"]:
            continue
        statuses[k].add(r["status"])
        if r["status"] in OK:
            regions[k][r["region"]] += 1
            if r["region"] == HTML_BODY:
                n_html[k] += 1
    for r in src_all:
        k = (r["source_route"], r["target_final"])
        if k[0] == k[1]:
            continue
        statuses[k].add(r["status"])
        if r["status"] in OK:
            fields[k][r["field"]] += 1
            if r["field"] in SRC_BODY:
                n_src[k] += 1
    for r in excl_all:
        k = (r["source_route"], r["target_final"])
        if k[0] != k[1] and r["status"] in OK:
            fields[k]["excluded:" + r["module"]] += 1

    rows, cause_pairs, cause_links = [], Counter(), Counter()
    for k in sorted(set(n_html) | set(n_src)):
        nh, ns = n_html[k], n_src[k]
        if nh == ns:
            continue
        c = cause_of(k[0], k[1], nh, ns, regions[k], fields[k], k[0] in pages, statuses[k])
        rows.append({"source": k[0], "target_final": k[1], "n_html": nh, "n_source": ns, "html_regions": fmt(regions[k]),
                     "source_fields": fmt(fields[k]), "cause": c, "resolution": RESOLUTION[c]})
        cause_pairs[c] += 1
        cause_links[c] += abs(nh - ns)

    # posts: every pair whose source is a blog post, plus the totals
    post_keys = [k for k in set(n_html) | set(n_src) if is_post(k[0])]
    post_diff = [r for r in rows if is_post(r["source"])]
    posts = {"pairs": len(post_keys), "html_links": sum(n_html[k] for k in post_keys), "source_links": sum(n_src[k] for k in post_keys),
             "differing_pairs": len(post_diff), "exact": not post_diff and
             sum(n_html[k] for k in post_keys) == sum(n_src[k] for k in post_keys)}

    # money pages: per target, links and distinct sources on each side; differing pairs into it with their causes
    money_rows, unexplained_money = {}, []
    for t in money:
        h = {k[0]: n for k, n in n_html.items() if k[1] == t}
        s = {k[0]: n for k, n in n_src.items() if k[1] == t}
        d = [r for r in rows if r["target_final"] == t]
        bad = [r for r in d if r["cause"] not in ALLOWED_CAUSES]
        unexplained_money += [(r["source"], r["target_final"]) for r in bad]
        money_rows[t] = {"html_links": sum(h.values()), "source_links": sum(s.values()), "html_sources": len(h), "source_sources": len(s),
                         "differing_pairs": len(d), "unexplained_pairs": len(bad), "exact": not d,
                         "differing_causes": dict(Counter(r["cause"] for r in d))}
    money_summary = {"targets": len(money), "exact_targets": sum(v["exact"] for v in money_rows.values()),
                     "all_exact": all(v["exact"] for v in money_rows.values()),
                     "unexplained_differing_pairs": len(unexplained_money), "by_target": money_rows}

    unexplained = [r for r in rows if r["cause"] not in ALLOWED_CAUSES]
    gate = "PASS" if not unexplained and posts["exact"] and not unexplained_money else "FAIL"

    base = {t: {"html_body_links": sum(n for k, n in n_html.items() if k[1] == t), "baseline": b,
                "source_body_links": sum(n for k, n in n_src.items() if k[1] == t)} for t, b in BASELINE.items()}
    exp_h = {k[0]: n for k, n in n_html.items() if k[1] == EXPLAINER}
    base[EXPLAINER] = {"html_body_links": sum(exp_h.values()), "html_sources": len(exp_h), "baseline": EXPLAINER_BASELINE,
                       "source_body_links": sum(n for k, n in n_src.items() if k[1] == EXPLAINER)}
    baseline_ok = (all(base[t]["html_body_links"] == b for t, b in BASELINE.items())
                   and base[EXPLAINER]["html_body_links"] == EXPLAINER_BASELINE["links"]
                   and base[EXPLAINER]["html_sources"] == EXPLAINER_BASELINE["sources"])

    summary = {
        "site": a.site, "run": a.run, "generated": now_utc(), "gate": gate,
        "definition": {"html": "region=body, status ok|redirect", "source": "field in body|template, status ok|redirect",
                       "key": "(source, target_final)", "self_links": "ignored on both sides"},
        "pairs_compared": len(set(n_html) | set(n_src)), "differing_pairs": len(rows),
        "total_body_links": {"html": sum(n_html.values()), "source": sum(n_src.values())},
        "posts": posts, "money_pages": money_summary,
        "by_cause": {c: {"pairs": cause_pairs[c], "links": cause_links[c],
                         "allowed": c in ALLOWED_CAUSES, "why": ALLOWED_CAUSES.get(c, "")} for c in sorted(cause_pairs)},
        "allowed_causes": ALLOWED_CAUSES, "unexplained_pairs": len(unexplained),
        "baseline_2026_10_09": {"holds": baseline_ok, **base},
    }
    meta = {"source": "stages/08_edges_html.csv vs stages/09_edges_source.csv", "site": a.site, "data_through": a.run, **script_meta()}
    write_csv(st / "09_compare.csv", rows, FIELDS, meta)
    (st / "09_compare_summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
    print(json.dumps({k: summary[k] for k in ("gate", "pairs_compared", "differing_pairs", "total_body_links", "by_cause")}, indent=2))
    print(f"posts exact={posts['exact']} ({posts['pairs']} pairs) | money exact={money_summary['all_exact']} "
          f"({money_summary['exact_targets']}/{money_summary['targets']}) | baseline holds={baseline_ok}")


if __name__ == "__main__":
    main()
