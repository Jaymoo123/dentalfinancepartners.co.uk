"""Stage 12: the list of internal links to add or fix, one row per proposed link, ranked, with waves.

Inputs (run dir): stages/10_assignments.csv, 11_budget.csv, 11_secondary_plan.csv (stages 10 and 11 must be current),
  08_edges_html.csv + 08_pages.csv (the link graph; "body" region and "faq" region are editorial links),
  03_gsc_query_page.csv + 03_gsc_page.csv, 05_clusters.csv, 06_families.csv + 06_owner_rollup.csv,
  inputs/leads_by_entry_page.csv, docs/_engines/property_frozen_pages.md, config give_up_pages.
Outputs: stages/12_gaps.csv  stages/12_gaps_summary.json
Cost: free. Deterministic; reads every input fresh (re-run after stage 08/09 files are regenerated).

Kinds (one row per source/dest pair; when a pair qualifies twice the first kind below wins and the other is kept in also_kinds)
  repoint_hire_anchor  an existing BODY link whose anchor is hire wording (accountant, accountancy, adviser/advisor, specialist,
                       consultant, tax advice) in a property/landlord/buy-to-let context, pointing at a page that is not a
                       destination (nor a sitewide page): proposed dest = the owner of the hire family the anchor names (city form ->
                       city page, non-resident -> non-resident page, landlord forms -> landlord-accountant, advice/adviser forms ->
                       property-tax-advice, audience words -> that /for/ page, else property-accountant). Anchors in question form
                       ("what does ... do", "how much ... cost") are explainer wording and left alone. A repoint is a rework of an
                       existing sentence, not a new one.
  broken               a BODY or FAQ link whose target is not a built page; dest = the closest built page by slug tokens (blank if
                       none is close: then the link should go).
  competing_page       a page that outranks the family owner in GSC for that family's queries (impression-weighted position over the
                       family's queries better than the owner's, and >= 20 impressions) and does not link to the owner in the body.
                       The page must link to the owner and must not use the family head as its anchor; never retitle it (blueprint R6).
  missing_primary      a source with no BODY link to its assigned primary destination (stage 10).
  missing_secondary    a source with no BODY link to its secondary: assigned by stage 10 or planned by the budget (stage 11).
  orphan_needs_inlink  an indexable page with no body in-link (n_in_body == 0, not home/sitewide/legal), with the most topically
                       similar eligible source as the suggested linking page. Emitted only when no other row already links to it.
  (none)               sources judged primary_dest 'none' get no row; their count is none_no_natural_link in the summary.
  pending_assignment   a source still in the Opus queue (stage 10): dest is the provisional S2 top, not a proposal.
wave  never = the source is on the frozen list (signoff none) or a give-up page: listed, marked NEEDS OWNER SIGN-OFF, never edited.
      1 = the source has >= 20 GSC impressions or any lead, or is a destination, pillar guide, /for/, /locations/ or /services/ page.
      2 = every other indexable source.
source_value  S2 fit of the source to dest * log1p(clicks*10 + impressions) + log1p(leads)*2 (page-to-page cosine when dest is not a
              money page). priority_order = source_value * the destination's share_of_priority (0 for non-money destinations).
Wave-1 sentence estimate: new sentences (missing_*, competing_page, orphan) and reworks (repoint, broken) counted separately.
"""
from __future__ import annotations

import argparse
import json
import math
import re
from collections import Counter, defaultdict

from assign import category_of, compute_signals, cos, fnum, load_ctx, path_of, s2_score, tokens
from common import norm_query, read_csv, script_meta, write_csv

FIELDS = ["source", "dest", "kind", "also_kinds", "current_state", "note", "wave", "source_value", "dest_share", "priority_order",
          "needs_owner_signoff", "anchor", "family"]
HIRE_RE = re.compile(r"\b(accountants?|accountancy|advis[eo]rs?|specialists?|consultants?|tax advice)\b")
CONTEXT_RE = re.compile(r"\b(propert\w*|landlords?|buy[- ]to[- ]let|btl|rental|hmo|holiday let|investors?|portfolio|spv|letting)\b")
EXPLAINER_RE = re.compile(r"^(what|how|why|when|which|do|does|is|are|can|should)\b|\bwhat\b.*\b(do|does|is)\b|"
                          r"\b(cost|costs|fees?|salary|jobs?|career|become|vs|versus|compare|checklist|choose|choosing|questions|"
                          r"qualifications?|software|guide|overview|explained|conversation)\b")
AUDIENCE = [  # (pattern, destination): checked before the generic service forms
    (r"non[- ]resident|expat|overseas landlord|abroad", "/services/non-resident-landlord"),
    (r"\bhmo\b|multi[- ]let", "/for/hmo-and-multi-let-landlords"),
    (r"holiday let|serviced accommodation|\bfhl\b", "/for/holiday-let-and-serviced-accommodation"),
    (r"\bspv\b|limited company|incorporat", "/for/moving-property-into-a-limited-company"),
    (r"letting agent", "/for-letting-agents"),
    (r"landlord accountant|accountants? for landlords?|accountancy for landlords?|buy[- ]to[- ]let accountant|rental accountant|"
     r"landlord tax accountant|accountants? for buy[- ]to[- ]let|rental property accountant", "/services/landlord-accountant"),
    (r"tax advice|tax advis[eo]rs?\b|tax specialists?\b|tax consultants?\b|tax planning|\badvis[eo]rs?\b|\bconsultants?\b", "/services/property-tax-advice"),
]


def edges_body(st) -> tuple[list, dict]:
    """(all edges, {(source, target_final): set(regions)})."""
    edges = read_csv(st / "08_edges_html.csv")
    regions = defaultdict(set)
    for e in edges:
        regions[(e["source"], e["target_final"])].add(e["region"])
    return edges, regions


def existing_body_linkers(edges: list) -> dict:
    """{dest: set(distinct sources with a body-region link to it)}."""
    out = defaultdict(set)
    for e in edges:
        if e["region"] == "body" and e["status"] in ("ok", "redirect") and e["source"] != e["target_final"]:
            out[e["target_final"]].add(e["source"])
    return out


def classify_hire(anchor: str, dests: dict, pages: dict) -> str:
    """Family owner a hire-wording anchor should point to ('' if the anchor is not hire wording or is explainer wording)."""
    a = norm_query(anchor)
    if not a or not HIRE_RE.search(a) or not CONTEXT_RE.search(a) or EXPLAINER_RE.search(a):
        return ""
    for city in ("london", "manchester", "birmingham", "leeds", "bristol"):
        if re.search(rf"\b{city}\b", a) and f"/locations/{city}" in dests:
            return f"/locations/{city}"
    for pat, d in AUDIENCE:
        if re.search(pat, a) and d in dests:
            return d
    return "/services/property-accountant"


def hire_repoints(edges: list, ctx: dict) -> list[dict]:
    """Body links with hire wording at a non-destination page, as dicts (source, anchor, target, dest)."""
    dests, pages, sitewide = ctx["dests"], ctx["pages"], ctx["sitewide"]
    out = []
    for e in edges:
        t = e["target_final"]
        if (e["region"] != "body" or e["status"] not in ("ok", "redirect") or t in dests or t in sitewide
                or t not in pages or t.startswith("/calculators") or e["source"] == t):
            continue
        if e["source"] not in pages or pages[e["source"]]["indexable"] != "true":
            continue
        d = classify_hire(e["anchor_text"], dests, pages)
        if d and d != e["source"]:
            out.append({"source": e["source"], "anchor": e["anchor_text"], "target": t, "dest": d})
    return out


def page_stats(ctx: dict, route: str) -> dict:
    g = ctx["gsc_page"].get(route, [0.0, 0.0])
    return {"clicks": g[0], "impr": g[1], "leads": ctx["leads"].get(route, 0)}


def value(ctx: dict, source: str, dest: str) -> float:
    """source_value of source for dest (see the module docstring)."""
    st = page_stats(ctx, source)
    if dest in ctx["dests"]:
        fit = s2_score(ctx, source, dest)
    elif ("p", dest) in ctx["vec"] and ("p", source) in ctx["vec"]:
        fit = cos(ctx["vec"][("p", source)], ctx["vec"][("p", dest)])
    else:
        fit = 0.0
    return fit * math.log1p(st["clicks"] * 10 + st["impr"]) + math.log1p(st["leads"]) * 2


def wave_of(ctx: dict, route: str) -> str:
    if route in ctx["frozen"] or route in ctx["give_up"]:
        return "never"
    st = page_stats(ctx, route)
    segs = route.strip("/").split("/")
    structural = (route in ctx["dests"] or route.startswith(("/for/", "/locations/", "/services/"))
                  or (len(segs) == 1 and not route.startswith("/blog") and route not in ctx["sitewide"]))
    return "1" if st["impr"] >= 20 or st["leads"] > 0 or structural else "2"


def state_for(regions: dict, source: str, dest: str) -> str:
    r = regions.get((source, dest), set())
    if "body" in r:
        return "body link exists"
    return ("linked only from " + ", ".join(sorted(r)) + " (not body)") if r else "no link"


def close_page(target: str, pages: dict, broken_cat: str) -> tuple[str, float]:
    """Closest built indexable page to a broken target by slug tokens, preferring the same blog category."""
    tt = set(tokens(target.rsplit("/", 1)[-1].replace("-", " ")))
    best = ("", 0.0)
    for r, p in pages.items():
        if p["indexable"] != "true" or not r.startswith("/blog/"):
            continue
        rt = set(tokens(r.rsplit("/", 1)[-1].replace("-", " ")))
        if not tt or not rt:
            continue
        sc = len(tt & rt) / len(tt | rt) + (0.02 if category_of(r) == broken_cat else 0)
        if sc > best[1]:
            best = (r, sc)
    return best


def competing(ctx: dict, linkers: dict) -> tuple[list[dict], int]:
    """Pages outranking a family's owner for that family's queries. Returns (rows, count skipped because they already link)."""
    st = ctx["st"]
    fams = [f for f in read_csv(st / "06_families.csv") if f["rank"] and f["owner_page"] in ctx["dests"]]
    kw_by_fam = defaultdict(set)
    for c in read_csv(st / "05_clusters.csv"):
        kw_by_fam[c["family_id"]].add(norm_query(c["keyword"]))
    qrows = defaultdict(list)                              # norm query -> [(page, impr, pos)]
    for r in read_csv(st / "03_gsc_query_page.csv"):
        qrows[norm_query(r["query"])].append((path_of(r["page"]), fnum(r["impressions"]), fnum(r["position"])))
    found = defaultdict(list)                              # (page, owner) -> notes
    skipped = set()
    for f in fams:
        owner = f["owner_page"]
        agg = defaultdict(lambda: [0.0, 0.0])
        for kw in kw_by_fam[f["family_id"]]:
            for p, im, pos in qrows.get(kw, []):
                agg[p][0] += im
                agg[p][1] += im * pos
        pos_of = {p: v[1] / v[0] for p, v in agg.items() if v[0] > 0}
        o_pos = pos_of.get(owner, 99.0)
        for p, v in agg.items():
            if p == owner or v[0] < 20 or pos_of[p] >= o_pos or p not in ctx["pages"] or ctx["pages"][p]["indexable"] != "true":
                continue
            if p in linkers.get(owner, ()):
                skipped.add((p, owner))
                continue
            found[(p, owner)].append((v[0], f"{f['head']}: position {pos_of[p]:.1f} on {int(v[0])} impressions vs owner "
                                                   + ("not ranking" if owner not in pos_of else f"{o_pos:.1f}"), f["head"]))
    rows = []
    for (p, owner), notes in found.items():
        notes.sort(key=lambda x: -x[0])
        rows.append({"source": p, "dest": owner, "note": "; ".join(n[1] for n in notes[:3]) + (f" (+{len(notes) - 3} more families)" if len(notes) > 3 else "")
                     + ". Must link to the owner; must not use the family head as anchor; never retitle (R6).", "family": notes[0][2]})
    return rows, len(skipped)


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--site", required=True)
    ap.add_argument("--run", required=True)
    a = ap.parse_args()
    ctx = load_ctx(a.site, a.run)
    st, pages, dests = ctx["st"], ctx["pages"], ctx["dests"]
    compute_signals(ctx)                                    # fills ctx["vec"] / ctx["text"]
    assigns = {r["source"]: r for r in read_csv(st / "10_assignments.csv")}
    plan = read_csv(st / "11_secondary_plan.csv")
    edges, regions = edges_body(st)
    linkers = existing_body_linkers(edges)
    cand: dict[tuple, dict] = {}

    def add(kind, source, dest, state, note="", anchor="", family=""):
        k = (source, dest)
        if k in cand:
            cand[k]["also_kinds"] = ";".join(filter(None, [cand[k]["also_kinds"], kind]))
            return
        cand[k] = {"source": source, "dest": dest, "kind": kind, "also_kinds": "", "current_state": state, "note": note,
                   "anchor": anchor, "family": family}

    # (c) hire anchors at the wrong page
    rep = hire_repoints(edges, ctx)
    for r in rep:
        have = "source also has a body link to the proposed dest" if r["source"] in linkers.get(r["dest"], ()) else "source has no body link to the proposed dest"
        add("repoint_hire_anchor", r["source"], r["dest"], f"body link '{r['anchor']}' -> {r['target']}; {have}",
            "retarget the existing hire-wording link to the owner of the hire family (rework, not a new sentence)", r["anchor"])
    # (e) broken editorial links
    nb = 0
    for e in edges:
        if e["status"] == "broken" and e["region"] in ("body", "faq") and e["source"] in pages and pages[e["source"]]["indexable"] == "true":
            best, sc = close_page(e["target_final"], pages, category_of(e["source"]))
            nb += 1
            add("broken", e["source"], best if sc >= 0.5 else "", f"{e['region']} link '{e['anchor_text']}' -> {e['target_final']} (not a built page)",
                f"closest built page by slug tokens (score {sc:.2f}); verify before use" if sc >= 0.5 else
                f"no close built page (best {sc:.2f}); remove the link or the owner picks a target", e["anchor_text"])
    # (d) pages that outrank the owner
    comp, comp_linked = competing(ctx, linkers)
    for c in comp:
        add("competing_page", c["source"], c["dest"], state_for(regions, c["source"], c["dest"]), c["note"], family=c["family"])
    # (a) primary, (b) secondary, pending
    pend = []
    n_none = sum(1 for r in assigns.values() if r["primary_dest"] == "none")      # none_no_natural_link: counted, no row
    for s, r in assigns.items():
        if r["primary_dest"] == "none":
            continue
        if r["primary_dest"]:
            if s not in linkers.get(r["primary_dest"], ()):
                add("missing_primary", s, r["primary_dest"], state_for(regions, s, r["primary_dest"]), f"basis {r['basis']}")
            if r["secondary_dest"] and s not in linkers.get(r["secondary_dest"], ()):
                add("missing_secondary", s, r["secondary_dest"], state_for(regions, s, r["secondary_dest"]), f"assigned secondary ({r['basis']})")
        else:
            pend.append(r)
    for p in plan:
        if p["source"] not in linkers.get(p["dest"], ()):
            add("missing_secondary", p["source"], p["dest"], state_for(regions, p["source"], p["dest"]),
                f"budget secondary: S2 fit {p['s2']} to dest, rank {p['rank']} by source value")
    for r in pend:
        s, d = r["source"], r["s2_top"]
        add("pending_assignment", s, d, state_for(regions, s, d), f"provisional dest = S2 top ({r['s2_score']}); awaiting Opus judgment (10_assign_queue)")
    # (f) orphans
    planned_in = Counter(c["dest"] for c in cand.values() if c["kind"] != "pending_assignment" and wave_of(ctx, c["source"]) != "never")
    elig = [s for s in ctx["sources"] if s not in ctx["frozen"] and s not in ctx["give_up"]]
    n_orphan = 0
    for route, p in sorted(pages.items()):
        if (p["indexable"] != "true" or fnum(p["n_in_body"]) > 0 or route in ctx["sitewide"] or route in ctx["le"].get("assign_excluded_sources", [])
                or re.fullmatch(r"/blog/[^/]+", route) or route == "/"):
            continue
        n_orphan += 1
        if planned_in[route]:
            continue
        best = max(((cos(ctx["vec"][("p", route)], ctx["vec"][("p", s)]), s) for s in elig if s != route), default=(0.0, ""))
        add("orphan_needs_inlink", best[1], route, f"orphan: {route} has 0 body in-links",
            f"suggested linking page by topical similarity {best[0]:.2f}" + (" (same category)" if category_of(best[1]) == category_of(route) and category_of(route) else ""))

    # score + waves
    rows = []
    for c in cand.values():
        s, d = c["source"], c["dest"]
        w = wave_of(ctx, s) if s else "2"
        v = value(ctx, s, d) if s and d else 0.0
        share = dests[d]["share"] if d in dests else 0.0
        c.update({"wave": w, "source_value": round(v, 3), "dest_share": share, "priority_order": round(v * share, 4),
                  "needs_owner_signoff": "NEEDS OWNER SIGN-OFF" if w == "never" else ""})
        if not d:
            c["dest"] = ""
        rows.append(c)
    order = {"1": 0, "2": 1, "never": 2}
    rows.sort(key=lambda c: (c["kind"] == "pending_assignment", order[c["wave"]], -c["priority_order"], -c["source_value"], c["source"], c["dest"]))

    meta = {"source": "10_assignments + 11_budget + 08_edges_html + 08_pages + 03_gsc_* + 06_families", "site": a.site, "data_through": a.run,
            **script_meta()}
    write_csv(st / "12_gaps.csv", rows, FIELDS, meta)

    # summary
    kinds = Counter(r["kind"] for r in rows)
    by_kw = defaultdict(Counter)
    for r in rows:
        by_kw[r["kind"]][r["wave"]] += 1
    new_kinds = ("missing_primary", "missing_secondary", "competing_page", "orphan_needs_inlink")
    rework_kinds = ("repoint_hire_anchor", "broken")
    w1 = [r for r in rows if r["wave"] == "1"]
    per = {}
    for d in dests:
        before = len(linkers.get(d, ()))
        add1 = {r["source"] for r in rows if r["dest"] == d and r["wave"] == "1" and r["kind"] != "pending_assignment" and r["source"] not in linkers.get(d, ())}
        add2 = {r["source"] for r in rows if r["dest"] == d and r["wave"] in ("1", "2") and r["kind"] != "pending_assignment" and r["source"] not in linkers.get(d, ())}
        pend_d = {r["source"] for r in rows if r["dest"] == d and r["kind"] == "pending_assignment"}
        per[d] = {"share": dests[d]["share"], "before_body_in": before, "after_wave1": before + len(add1), "after_all_waves": before + len(add2),
                  "pending_candidates": len(pend_d), "never_listed": sum(1 for r in rows if r["dest"] == d and r["wave"] == "never")}
    summ = {"run": a.run, "site": a.site, "rows": len(rows), "by_kind": dict(kinds), "by_kind_wave": {k: dict(v) for k, v in by_kw.items()},
            "by_wave": dict(Counter(r["wave"] for r in rows)),
            "wave1_expected_new_sentences": sum(1 for r in w1 if r["kind"] in new_kinds),
            "wave1_expected_reworks": sum(1 for r in w1 if r["kind"] in rework_kinds),
            "wave1_pending_assignment_rows": sum(1 for r in w1 if r["kind"] == "pending_assignment"),
            "competing_skipped_already_linking": comp_linked, "none_no_natural_link": n_none, "orphans_total": n_orphan,
            "also_kinds": dict(Counter(k for r in rows for k in filter(None, r["also_kinds"].split(";")))),
            "hire_repoint_targets": dict(Counter(r["target"] for r in rep).most_common(10)),
            "per_destination_body_inlinks": per,
            "provisional": bool(kinds.get("pending_assignment"))}
    (st / "12_gaps_summary.json").write_text(json.dumps(summ, indent=2), encoding="utf-8")
    print(f"{len(rows)} gap rows; kinds {dict(kinds)}; waves {summ['by_wave']}; wave-1 new sentences "
          f"{summ['wave1_expected_new_sentences']}, reworks {summ['wave1_expected_reworks']}, pending w1 {summ['wave1_pending_assignment_rows']}")


if __name__ == "__main__":
    main()
