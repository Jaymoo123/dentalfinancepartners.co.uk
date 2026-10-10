"""Stage 11: how many body links each money page should receive, and which extra (secondary) links fill the gap.

Inputs (run dir): stages/10_assignments.csv (stage 10 must be current), stages/06_owner_rollup.csv (shares, after LE-15),
  08_edges_html.csv (current body links), 08_pages.csv, built HTML text (for topical fit), 03_gsc_page.csv, leads.
Outputs: stages/11_budget.csv          one row per destination
         stages/11_secondary_plan.csv  the secondary links planned (dest, source, s2, source_value, rank)
Cost: free. Deterministic; reads every input fresh.

Per destination
  share            share_of_priority from the owner rollup, then config destination_share_floor (LE-15: 5% on the non-resident page);
                   the other destinations are scaled down proportionally so the total is unchanged. share_raw is the rollup figure.
  T                sources that have a primary (basis not pending); each gives its primary link. Provisional while the Opus queue is open.
  n_primary        sources assigned this destination as primary
  current_body_in  distinct pages with a body-region link to it today (08)
  covered          distinct pages that link in the body today, plus primary sources, plus sources a hire-anchor repoint will send there
  cap              sources that could carry the link: primary or secondary here, or S2 fit >= 0.15 (the source itself excluded)
  target_in_body   max(n_primary, min(round(share * T), cap))
  deficit          max(0, target_in_body - covered)
  secondary        filled from assigned sources not yet covered, not frozen and not give-up, best first by fit * log1p(clicks*10 +
                   impressions) + lead bonus; n_secondary_planned = min(deficit, pool). Pool: S2 fit >= 0.15, except for the four /services/
                   pages, where it is sources whose primary is a /for/ page or a converting guide and whose S2 fit to the service is >= 0.08
                   or whose category prior is that service. A source never gets more than one secondary (primary + 1 = 2 sales links),
                   and "none" sources are never eligible. Destinations are processed by share, largest first.
A source is planned for at most the secondaries the deficit needs; a source with a body link already is never planned.
"""
from __future__ import annotations

import argparse
from collections import defaultdict

from assign import attention, compute_signals, fnum, load_ctx, s2_score
from common import read_csv, script_meta, write_csv
from gaps import existing_body_linkers, hire_repoints

FIELDS = ["dest", "share", "share_raw", "T", "current_body_in", "n_primary", "n_primary_missing_link", "n_repoint", "covered", "cap", "target_in_body",
          "deficit", "pool", "n_secondary_planned", "n_pending_unassigned", "note"]
PLAN = ["dest", "source", "rank", "s2", "source_value"]
FIT_MIN = 0.15
SERVICE_FIT_MIN = 0.08


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--site", required=True)
    ap.add_argument("--run", required=True)
    a = ap.parse_args()
    ctx = load_ctx(a.site, a.run)
    st, dests = ctx["st"], ctx["dests"]
    sig = compute_signals(ctx)
    assigns = {r["source"]: r for r in read_csv(st / "10_assignments.csv")}
    done = {s: r for s, r in assigns.items() if r["primary_dest"] not in ("", "none")}
    n_pend = sum(1 for r in assigns.values() if not r["primary_dest"])
    T = len(done)
    edges = read_csv(st / "08_edges_html.csv")
    linkers = existing_body_linkers(edges)
    repoint = defaultdict(set)
    for r in hire_repoints(edges, ctx):
        repoint[r["dest"]].add(r["source"])
    has_sec = {s for s, r in done.items() if r["secondary_dest"]}      # at most one secondary per source (primary + 1 = 2 sales links)
    out, plan = [], []
    for d, v in sorted(dests.items(), key=lambda kv: -kv[1]["share"]):
        prim = {s for s, r in done.items() if r["primary_dest"] == d}
        sec = {s for s, r in done.items() if r["secondary_dest"] == d}
        cur = linkers.get(d, set())
        covered = cur | prim | repoint[d]
        fit = {s: s2_score(ctx, s, d) for s in done if s != d}
        if d.startswith("/services/"):
            # widened pool for the four service pages: sources whose primary is a /for/ page or a converting guide ("none" and
            # service/city primaries are not eligible) that are hire-adjacent (S2 >= 0.08 to this service, or its category prior is this service)
            ok = lambda s: (done[s]["primary_dest"].startswith(("/for/", "/blog/")) and (fit[s] >= SERVICE_FIT_MIN or sig[s]["s3"] == d))
        else:
            ok = lambda s: fit[s] >= FIT_MIN
        cap = len(prim | sec | {s for s in fit if ok(s)})
        target = max(len(prim), min(round(v["share"] * T), cap))
        deficit = max(0, target - len(covered))
        pool = sorted(((attention(ctx, s, sig[s], d), s) for s in fit
                       if ok(s) and s not in covered and s not in ctx["frozen"] and s not in ctx["give_up"] and s not in has_sec),
                      key=lambda x: (-x[0], x[1]))
        take = pool[:deficit]
        has_sec.update(s for _, s in take)
        for i, (val, s) in enumerate(take, 1):
            plan.append({"dest": d, "source": s, "rank": i, "s2": round(fit[s], 3), "source_value": round(val, 3)})
        note = ""
        if len(take) < deficit:
            note = f"cap/pool short by {deficit - len(take)}: not enough sources with S2 fit >= {FIT_MIN}"
        if v["share"] != v["share_raw"]:
            note = (note + "; " if note else "") + f"share set by destination_share_floor/rescale (rollup {v['share_raw']})"
        if v["share"] == 0:
            note = (note + "; " if note else "") + "share 0: no ranked priority behind this page, target = primaries only"
        out.append({"dest": d, "share": round(v["share"], 4), "share_raw": v["share_raw"], "T": T, "current_body_in": len(cur), "n_primary": len(prim),
                    "n_primary_missing_link": len(prim - cur), "n_repoint": len(repoint[d] - cur - prim), "covered": len(covered), "cap": cap,
                    "target_in_body": target, "deficit": deficit, "pool": len(pool), "n_secondary_planned": len(take),
                    "n_pending_unassigned": n_pend, "note": note})
    meta = {"source": "10_assignments + 06_owner_rollup + 08_edges_html", "site": a.site, "data_through": a.run,
            "provisional": n_pend > 0, "n_pending_unassigned": n_pend, **script_meta()}
    write_csv(st / "11_budget.csv", out, FIELDS, meta)
    write_csv(st / "11_secondary_plan.csv", plan, PLAN, meta)
    print(f"T={T} assigned ({n_pend} pending, provisional={n_pend > 0}); {len(out)} destinations; secondary planned {len(plan)}")
    for r in out:
        print(f"  {r['dest']:<75} share {fnum(r['share']):.4f} cur {r['current_body_in']:>3} prim {r['n_primary']:>3} target {r['target_in_body']:>3} "
              f"deficit {r['deficit']:>3} sec {r['n_secondary_planned']:>3}")


if __name__ == "__main__":
    main()
