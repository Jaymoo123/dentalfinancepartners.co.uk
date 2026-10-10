"""Stage 04: live Google UK top-10 organic SERP for chosen head terms.

Inputs: --min-volume N (with --from-metrics) keeps only keywords at or above N monthly searches.
        --keywords-file <csv> (column query, head_term or keyword, else first column)
        or --from-metrics --limit N (top N hire+decision rows of stages/02_metrics.csv by volume*cpc).
Outputs: stages/04_serp.csv (query, rank, domain, url, title, is_us, is_yardstick, is_hard)
         stages/04_serp_summary.csv (query, our_position, yardstick_position, hard_share_top10, n_results)
Cost: serp/google/organic/live/advanced at $0.002 per query (depth 10), via common.dfs_post
      (cached 90 days, ledgered, hard stop at $5.00/run). --dry-run prints the cost, no call.
"""
from __future__ import annotations

import argparse

from common import (UK_LOCATION, LANG, dfs_balance, dfs_post, estimate_cost, load_site, norm_query, serp_store_lookup,
                    read_csv, run_dir, run_spend, script_meta, write_csv)

ENDPOINT = "serp/google/organic/live/advanced"
F1 = ["query", "rank", "domain", "url", "title", "is_us", "is_yardstick", "is_hard"]
F2 = ["query", "our_position", "yardstick_position", "hard_share_top10", "n_results"]


def under(domain: str, base: str) -> bool:
    return domain == base or domain.endswith("." + base)


def pick_queries(a, rd) -> list[str]:
    if a.keywords_file:
        rows = read_csv(a.keywords_file)
        key = next((k for k in ("query", "head_term", "keyword") if rows and k in rows[0]), None) or list(rows[0])[0]
        qs = [norm_query(r[key]) for r in rows]
    else:
        m = [r for r in read_csv(rd / "stages" / "02_metrics.csv")
             if r["intent_class"] in ("hire", "decision") and float(r["volume"] or 0) >= a.min_volume]
        score = lambda r: float(r["volume"] or 0) * float(r["cpc"] or 0)
        qs = [r["query"] for r in sorted(m, key=score, reverse=True)]
    seen, out = set(), []
    for q in qs:
        if q and q not in seen:
            seen.add(q)
            out.append(q)
    return out[: a.limit]


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--site", required=True)
    ap.add_argument("--run", required=True)
    g = ap.add_mutually_exclusive_group(required=True)
    g.add_argument("--keywords-file")
    g.add_argument("--from-metrics", action="store_true")
    ap.add_argument("--limit", type=int, default=50)
    ap.add_argument("--min-volume", type=float, default=0, help="--from-metrics only: skip keywords below this volume")
    ap.add_argument("--max-estimate", type=float, default=1.00,
                    help="if the estimate is higher, keep the top N by volume*cpc that fit and log the rest")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--selftest", action="store_true",
                    help="dry-run proof: add one fake keyword and assert only that keyword would be pulled")
    a = ap.parse_args()
    le = load_site(a.site)["link_engine"]
    rd = run_dir(a.site, a.run)
    qs = pick_queries(a, rd)
    have, need = serp_store_lookup(qs)                   # the committed store: only `need` is ever pulled
    if a.selftest:
        fake = "zz selftest fake keyword xyz"
        h2, n2 = serp_store_lookup(qs + [fake])
        assert n2 == need + [fake], "selftest failed: more than the fake keyword would be pulled"
        print(f"selftest ok: {len(h2)} SERPs from the store, would pull only {len(n2)} ({n2[-1]!r} is the fake one)")
        return
    skipped = []
    fit = int(a.max_estimate / 0.002 + 1e-9)
    kept, budget = [], fit              # stored SERPs are free; only new pulls count against the budget
    for q in qs:                        # qs is ordered by volume*cpc for --from-metrics
        if q in have:
            kept.append(q)
        elif budget > 0:
            kept.append(q)
            budget -= 1
        else:
            skipped.append(q)
    if skipped:
        print(f"estimate over ${a.max_estimate:.2f}: skipping {len(skipped)} new pulls (logged to 04_serp_skipped.csv)")
    qs = kept
    est = 0.002 * len([q for q in qs if q not in have])
    print(f"{len(qs)} queries ({len(have)} in the store, {len(qs) - len([q for q in qs if q in have])} new); est ${est:.3f}; "
          f"run spend so far ${run_spend(a.site, a.run):.4f}")
    if a.dry_run:
        print("dry run, first 10:", qs[:10])
        return
    bal0 = dfs_balance()
    rows, summ = [], []
    for q in qs:
        body = dfs_post(ENDPOINT, [{"keyword": q, "location_code": UK_LOCATION, "language_code": LANG,
                                    "depth": 10, "device": "desktop"}], a.site, a.run)
        items = [i for t in body.get("tasks") or [] for res in t.get("result") or []
                 for i in res.get("items") or [] if i.get("type") == "organic"]
        qrows = []
        for i in items:
            d = (i.get("domain") or "").lower().removeprefix("www.")
            qrows.append({"query": q, "rank": i.get("rank_group"), "domain": d, "url": i.get("url"),
                          "title": i.get("title"), "is_us": under(d, le["domain"]),
                          "is_yardstick": under(d, le["yardstick_domain"]),
                          "is_hard": any(under(d, h) for h in le["hard_domains"])})
        rows += qrows
        pos = lambda k: min([r["rank"] for r in qrows if r[k]], default="")
        summ.append({"query": q, "our_position": pos("is_us"), "yardstick_position": pos("is_yardstick"),
                     "hard_share_top10": round(sum(r["is_hard"] for r in qrows) / len(qrows), 3) if qrows else "",
                     "n_results": len(qrows)})
    bal1 = dfs_balance()
    meta = {"source": f"DFS {ENDPOINT} depth=10 UK desktop", "site": a.site, "data_through": a.run,
            "dfs_balance_start": bal0, "dfs_balance_end": bal1, "run_spend_usd": run_spend(a.site, a.run), **script_meta()}
    write_csv(rd / "stages" / "04_serp.csv", rows, F1, meta)
    write_csv(rd / "stages" / "04_serp_summary.csv", summ, F2, meta)
    write_csv(rd / "stages" / "04_serp_skipped.csv", [{"query": q, "reason": "over_budget"} for q in skipped],
              ["query", "reason"], meta)
    print(f"wrote {len(rows)} serp rows, {len(summ)} summaries")


if __name__ == "__main__":
    main()
