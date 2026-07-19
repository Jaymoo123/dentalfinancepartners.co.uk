"""Guide/hub consolidation + gap-fill DECISION audit (Phase 1, read-only).

Answers, with data, "what is the entire implication of consolidating this
cluster?" before anything is collapsed. For each fragmented cluster it picks the
data-strongest survivor, then for every satellite computes the LOSS SET (queries
the satellite owns that the survivor does not) with impressions-at-risk and a
page-1-Bing veto, and runs the existing collapse guard as an advisory pre-check.
For gap topics it measures demand + whether a current hub ranks (elevate vs new).

NO DeepSeek: this only GATHERS + STRUCTURES. An Opus 4.8 subagent reasons each
decision pack into a brief; the user approves before any execution.

Run from the repo root (the collapse guard uses a CWD-relative blog path):
    python -m optimisation_engine.corepage.guide_audit --all
    python -m optimisation_engine.corepage.guide_audit --cluster section_24
    python -m optimisation_engine.corepage.guide_audit --gap sdlt
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

from optimisation_engine.competitor._db import _sql, _esc
from optimisation_engine.track2.pull_page_data import (
    build_target_queries,
    _bing_query_rows,
)

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))
# The collapse guard is the deterministic equity floor; reuse its exact numbers
# so the pack and the binding gate can never disagree.
from scripts.track2_collapse_guard import enrich, evaluate  # noqa: E402

# Per-site blog content dirs; --site switches which corpus read_md() reads.
# NOTE: CLUSTERS/GAP_TOPICS below are still Property knowledge — add per-site
# cluster config before running this audit against another site's corpus.
SITE_BLOG_DIRS = {
    "property": ROOT / "Property" / "web" / "content" / "blog",
    "generalist": ROOT / "generalist" / "web" / "content" / "blog",
    "solicitors": ROOT / "Solicitors" / "web" / "content" / "blog",
    "dentists": ROOT / "Dentists" / "web" / "content" / "blog",
    "medical": ROOT / "Medical" / "web" / "content" / "blog",
}
BLOG = SITE_BLOG_DIRS["property"]
BING_PAGE1 = 10  # Bing position <= this in a satellite's loss set vetoes auto-collapse


# --------------------------------------------------------------------------- #
# Config: the fragmented clusters and the gap topics (the only knowledge here). #
# --------------------------------------------------------------------------- #

CLUSTERS: dict[str, dict] = {
    "landlord_tax_broad": {
        "intent": "broad landlord / rental-income tax overview",
        "pages": [
            "landlord-tax-changes-2026-complete-guide",
            "property-investment-tax-uk-complete-guide-2026",
            "rental-income-tax-uk-complete-guide-landlords",
            "how-much-tax-rental-income-uk-complete-guide",
            "income-tax-rates-landlords-2026-27-complete-guide",
        ],
        "proposed_survivor": None,  # let the data pick
    },
    "sa105_return": {
        "intent": "landlord Self Assessment / SA105 tax return",
        "pages": [
            "landlord-tax-return-complete-guide-2026",
            "sa105-property-income-form-2026-complete-guide",
        ],
        "proposed_survivor": None,
    },
    "mtd": {
        "intent": "Making Tax Digital for Income Tax (landlords)",
        "pages": [
            "making-tax-digital-property-income-2026-complete-guide",
            "making-tax-digital-landlords-april-2026-deadline",
        ],
        "proposed_survivor": "making-tax-digital-property-income-2026-complete-guide",
    },
    "section_24": {
        "intent": "Section 24 finance-cost restriction",
        "pages": [
            "section-24-tax-relief-complete-guide",          # main (residential)
            "finance-costs-section-24-complete-guide",       # finance-cost taxonomy
            "section-24-commercial-property-complete-guide",  # commercial (different scope)
        ],
        "proposed_survivor": "section-24-tax-relief-complete-guide",
        "note": "commercial + finance-cost pages may be distinct scopes -> likely KEEP+cross-link",
    },
    # Audited but keep-by-default (complementary / intentional duos):
    "ated": {
        "intent": "ATED (annual tax on enveloped dwellings)",
        "pages": ["ated-complete-guide-2026-27", "ated-relief-for-related-persons-and-market-rent-a-complete-guide"],
        "proposed_survivor": "ated-complete-guide-2026-27",
        "default": "KEEP",
    },
    "fic": {
        "intent": "family investment companies",
        "pages": ["fic-complete-guide-property-wealth-transfer", "a-complete-guide-to-family-investment-companies-fics"],
        "proposed_survivor": "fic-complete-guide-property-wealth-transfer",
        "default": "KEEP",
    },
}

GAP_TOPICS: dict[str, dict] = {
    "sdlt": {"like": ["%sdlt%", "%stamp duty%"], "current_best": "sdlt-buy-to-let-rates-surcharge-guide-2025"},
    "vat_property": {"like": ["%vat%"], "current_best": "landlord-vat-registration-when-required"},
    "capital_allowances": {"like": ["%capital allowance%"], "current_best": "capital-allowances-on-property"},
    "let_property_campaign": {"like": ["%let property campaign%"], "current_best": "let-property-campaign-disclosure-mechanics-undeclared-rental-income-2026"},
    "inheritance_tax": {"like": ["%inheritance tax%", "%iht%"], "current_best": "inheritance-tax-rental-property-uk-guide"},
    "property_accountant_service": {"like": ["%property accountant%", "%landlord accountant%", "%buy to let accountant%"], "current_best": None},
}


# --------------------------------------------------------------------------- #
# Local .md frontmatter / word-count (free, no API).                           #
# --------------------------------------------------------------------------- #

def read_md(slug: str) -> dict:
    f = BLOG / f"{slug}.md"
    if not f.exists():
        return {"exists": False, "title": None, "metaTitle": None, "category": None, "word_count": 0}
    text = f.read_text(encoding="utf-8")
    fm = {}
    m = re.match(r"^---\s*\n(.*?)\n---\s*\n(.*)$", text, re.DOTALL)
    body = text
    if m:
        for line in m.group(1).splitlines():
            km = re.match(r'^(\w+):\s*"?(.*?)"?\s*$', line)
            if km:
                fm[km.group(1)] = km.group(2)
        body = m.group(2)
    words = len(re.sub(r"<[^>]+>", " ", body).split())
    return {"exists": True, "title": fm.get("title"), "metaTitle": fm.get("metaTitle"),
            "category": fm.get("category"), "word_count": words}


def _category_slug(category: str | None) -> str | None:
    if not category:
        return None
    s = category.lower().replace("(", "").replace(")", "").replace("&", "and")
    s = re.sub(r"\s+", "-", s).strip("-")
    return re.sub(r"-+", "-", s)


# --------------------------------------------------------------------------- #
# Per-page gather.                                                              #
# --------------------------------------------------------------------------- #

def page_data(slug: str, days: int) -> dict:
    tq = build_target_queries(slug, days)                       # [{query, source, impr, pos}]
    bing_pos = {}
    for r in _bing_query_rows(slug):
        q = (r.get("query") or "").strip().lower()
        if q and r.get("avg_position") is not None:
            bing_pos[q] = float(r["avg_position"])
    metrics = enrich(slug)                                      # guard's exact equity numbers
    md = read_md(slug)
    owned = {t["query"].strip().lower(): t for t in tq if t.get("query")}
    return {
        "slug": slug,
        "exists": md["exists"],
        "title": md["title"],
        "metaTitle": md["metaTitle"],
        "category": md["category"],
        "category_slug": _category_slug(md["category"]),
        "word_count": md["word_count"],
        "metrics": metrics,
        "owned": owned,           # {query_lower: {query, source, impr, pos}}
        "bing_pos": bing_pos,     # {query_lower: bing avg_position}
        "n_owned": len(owned),
    }


def _rank_key(pd: dict):
    m = pd["metrics"]
    wpos = m["wpos"] if m["wpos"] is not None else 999.0
    # clicks, sustained, weeks, inbound desc; position asc.
    return (-int(m["clk"] or 0), -int(m["sustained"] or 0), -int(m["weeks_present"] or 0),
            -int(m["inbound"] or 0), wpos)


# --------------------------------------------------------------------------- #
# Cluster analysis.                                                            #
# --------------------------------------------------------------------------- #

def analyse_cluster(key: str, cfg: dict, days: int) -> dict:
    pages = {slug: page_data(slug, days) for slug in cfg["pages"]}
    ranked = sorted(pages.values(), key=_rank_key)
    data_survivor = ranked[0]["slug"] if ranked else None
    proposed = cfg.get("proposed_survivor")
    survivor = proposed or data_survivor
    s = pages[survivor]
    s_owned = set(s["owned"].keys())

    satellites = []
    for slug, pd in pages.items():
        if slug == survivor:
            continue
        loss_keys = [q for q in pd["owned"] if q not in s_owned]
        loss = []
        at_risk_impr = at_risk_bing_impr = 0
        page1_bing = []
        for q in loss_keys:
            t = pd["owned"][q]
            bpos = pd["bing_pos"].get(q)
            entry = {"query": t["query"], "impr": t["impr"], "source": t["source"],
                     "merged_pos": t["pos"], "bing_pos": bpos}
            loss.append(entry)
            at_risk_impr += int(t["impr"] or 0)
            if t["source"] in ("bing", "both"):
                at_risk_bing_impr += int(t["impr"] or 0)
            if bpos is not None and bpos <= BING_PAGE1:
                page1_bing.append(entry)
        loss.sort(key=lambda e: e["impr"], reverse=True)
        overlap = sorted(set(pd["owned"].keys()) & s_owned)
        verdict, reasons = evaluate(pd["metrics"], s["metrics"])
        s_total_impr = int(s["metrics"]["impr"] or 0)
        satellites.append({
            "slug": slug,
            "metrics": pd["metrics"],
            "word_count": pd["word_count"],
            "n_owned": pd["n_owned"],
            "loss_set": loss,
            "loss_count": len(loss),
            "impressions_at_risk": at_risk_impr,
            "at_risk_bing_impr": at_risk_bing_impr,
            "at_risk_pct_of_survivor": round(at_risk_impr / s_total_impr * 100, 1) if s_total_impr else None,
            "page1_bing_loss": page1_bing,
            "page1_bing_count": len(page1_bing),
            "overlap_count": len(overlap),
            "overlap_sample": overlap[:15],
            "guard_verdict": verdict,
            "guard_reasons": reasons,
            "auto_collapse_blocked_by_bing": len(page1_bing) > 0,
        })

    return {
        "key": key,
        "kind": "cluster",
        "intent": cfg.get("intent"),
        "note": cfg.get("note"),
        "default": cfg.get("default"),
        "survivor": survivor,
        "data_survivor": data_survivor,
        "proposed_survivor": proposed,
        "survivor_disagreement": bool(proposed and data_survivor and proposed != data_survivor),
        "ranked": [{"slug": p["slug"], "metrics": p["metrics"], "word_count": p["word_count"], "n_owned": p["n_owned"]} for p in ranked],
        "satellites": satellites,
    }


# --------------------------------------------------------------------------- #
# Gap-topic analysis (demand + catchers; cheaper aggregate SQL).               #
# --------------------------------------------------------------------------- #

def _topic_catchers(like: list[str], days: int) -> dict:
    like_clause = " OR ".join(f"query ILIKE {_esc(p)}" for p in like)
    gsc = _sql(
        "SELECT page_url, SUM(impressions) impr, SUM(clicks) clk, "
        "ROUND(AVG(position)::numeric,1) pos, COUNT(DISTINCT query) queries "
        "FROM gsc_query_data WHERE site_key='property' AND (" + like_clause + ") "
        f"AND date > now() - interval '{int(days)} days' GROUP BY page_url ORDER BY impr DESC LIMIT 15;"
    )
    bing = _sql(
        "SELECT page_url, SUM(impressions) impr, SUM(clicks) clk, "
        "ROUND(AVG(position)::numeric,1) pos FROM bing_query_data WHERE site_key='property' AND (" + like_clause + ") "
        "AND date = (SELECT MAX(date) FROM bing_query_data WHERE site_key='property') "
        "GROUP BY page_url ORDER BY impr DESC LIMIT 15;"
    )
    return {"gsc": gsc, "bing": bing}


def analyse_gap(key: str, cfg: dict, days: int) -> dict:
    catchers = _topic_catchers(cfg["like"], days)
    total_gsc_impr = sum(int(r["impr"] or 0) for r in catchers["gsc"])
    total_gsc_clk = sum(int(r["clk"] or 0) for r in catchers["gsc"])
    cb = cfg.get("current_best")
    cb_data = page_data(cb, days) if cb else None
    cb_rank_among = None
    if cb:
        for i, r in enumerate(catchers["gsc"]):
            if (r["page_url"] or "").rstrip("/").split("/")[-1] == cb:
                cb_rank_among = i + 1
                break
    return {
        "key": key,
        "kind": "gap",
        "current_best": cb,
        "current_best_metrics": cb_data["metrics"] if cb_data else None,
        "current_best_word_count": cb_data["word_count"] if cb_data else None,
        "current_best_rank_among_catchers": cb_rank_among,
        "total_topic_gsc_impr": total_gsc_impr,
        "total_topic_gsc_clk": total_gsc_clk,
        "catchers_gsc": catchers["gsc"],
        "catchers_bing": catchers["bing"],
    }


# --------------------------------------------------------------------------- #
# Rendering + output.                                                          #
# --------------------------------------------------------------------------- #

def _m(metrics: dict) -> str:
    return (f"impr={metrics['impr']} sustained={metrics['sustained']} weeks={metrics['weeks_present']} "
            f"clk={metrics['clk']} pos={metrics['wpos']} inbound={metrics['inbound']} "
            f"md={'Y' if metrics['exists'] else 'N'}")


def render_cluster_md(a: dict) -> str:
    L = [f"# Consolidation decision pack - cluster: {a['key']}", "",
         f"Intent: {a['intent']}", ""]
    if a.get("default") == "KEEP":
        L.append("**Default: KEEP (complementary/intentional duo) - audited for completeness.**\n")
    L.append(f"**Survivor (chosen): `{a['survivor']}`**  | data-pick: `{a['data_survivor']}`"
             + (f"  | config-pin: `{a['proposed_survivor']}`" if a['proposed_survivor'] else ""))
    if a["survivor_disagreement"]:
        L.append("\n> WARNING: data-strongest page differs from the config-pinned survivor. The subagent MUST resolve this.")
    L.append("\n## Ranked pages (guard equity model)")
    L.append("| rank | slug | clk | sustained | weeks | pos | inbound | words | owned-q |")
    L.append("| --- | --- | --- | --- | --- | --- | --- | --- | --- |")
    for i, p in enumerate(a["ranked"], 1):
        m = p["metrics"]
        L.append(f"| {i} | {p['slug']} | {m['clk']} | {m['sustained']} | {m['weeks_present']} | "
                 f"{m['wpos']} | {m['inbound']} | {p['word_count']} | {p['n_owned']} |")
    L.append("\n## Satellites (collapse implication vs survivor)")
    for sat in a["satellites"]:
        L.append(f"\n### `{sat['slug']}`  ->  survivor `{a['survivor']}`")
        L.append(f"- {_m(sat['metrics'])}, words={sat['word_count']}")
        L.append(f"- **guard pre-check: {sat['guard_verdict']}**" + (f" - {'; '.join(sat['guard_reasons'])}" if sat["guard_reasons"] else ""))
        L.append(f"- loss set: **{sat['loss_count']}** queries the satellite owns that the survivor does not; "
                 f"impressions at risk **{sat['impressions_at_risk']}** "
                 f"({sat['at_risk_pct_of_survivor']}% of survivor; Bing-sourced {sat['at_risk_bing_impr']})")
        L.append(f"- overlap (cannibalisation): {sat['overlap_count']} shared queries")
        if sat["auto_collapse_blocked_by_bing"]:
            L.append(f"- **PAGE-1-BING VETO: {sat['page1_bing_count']} loss-set quer(y/ies) rank <= {BING_PAGE1} on Bing -> auto-collapse blocked (fold-first or KEEP).**")
            for e in sat["page1_bing_loss"][:8]:
                L.append(f"    - \"{e['query']}\" (Bing pos {e['bing_pos']}, impr {e['impr']})")
        if sat["loss_set"]:
            L.append("- top loss queries:")
            for e in sat["loss_set"][:10]:
                L.append(f"    - \"{e['query']}\" impr {e['impr']} [{e['source']}] (Bing pos {e['bing_pos']})")
    return "\n".join(L)


def render_gap_md(a: dict) -> str:
    L = [f"# Gap-fill decision pack - topic: {a['key']}", ""]
    L.append(f"- current best hub: `{a['current_best']}`"
             + (f" (rank #{a['current_best_rank_among_catchers']} among catchers)" if a['current_best_rank_among_catchers'] else " (NOT among top catchers / none set)"))
    if a["current_best_metrics"]:
        L.append(f"- current best: {_m(a['current_best_metrics'])}, words={a['current_best_word_count']}")
    L.append(f"- total topic demand (GSC {a['total_topic_gsc_impr']} impr / {a['total_topic_gsc_clk']} clk)")
    L.append("\n## GSC catchers (which pages soak up this topic's queries)")
    L.append("| page | impr | clk | pos | queries |")
    L.append("| --- | --- | --- | --- | --- |")
    for r in a["catchers_gsc"]:
        L.append(f"| {(r['page_url'] or '').replace('https://www.','').replace('https://','')} | {r['impr']} | {r['clk']} | {r['pos']} | {r.get('queries','')} |")
    L.append("\n## Bing catchers (latest snapshot)")
    L.append("| page | impr | clk | pos |")
    L.append("| --- | --- | --- | --- |")
    for r in a["catchers_bing"]:
        L.append(f"| {(r['page_url'] or '').replace('https://www.','').replace('https://','')} | {r['impr']} | {r['clk']} | {r['pos']} |")
    return "\n".join(L)


def out_dir(key: str) -> Path:
    d = ROOT / "briefs" / "property" / "guide_audit" / key
    d.mkdir(parents=True, exist_ok=True)
    return d


def write_pack(a: dict) -> Path:
    d = out_dir(a["key"])
    (d / "_decision_pack.json").write_text(json.dumps(a, indent=2, default=str), encoding="utf-8")
    md = render_cluster_md(a) if a["kind"] == "cluster" else render_gap_md(a)
    (d / "_decision_pack.md").write_text(md, encoding="utf-8")
    return d


def main() -> None:
    ap = argparse.ArgumentParser(description="Guide/hub consolidation + gap-fill audit (read-only).")
    ap.add_argument("--cluster", help="single cluster key")
    ap.add_argument("--gap", help="single gap-topic key")
    ap.add_argument("--all", action="store_true")
    ap.add_argument("--days", type=int, default=90)
    ap.add_argument("--site", default="property", choices=sorted(SITE_BLOG_DIRS),
                    help="which site's blog corpus read_md() reads (default: property)")
    args = ap.parse_args()

    global BLOG
    BLOG = SITE_BLOG_DIRS[args.site]

    results = []
    if args.cluster:
        results.append(analyse_cluster(args.cluster, CLUSTERS[args.cluster], args.days))
    if args.gap:
        results.append(analyse_gap(args.gap, GAP_TOPICS[args.gap], args.days))
    if args.all:
        for k, cfg in CLUSTERS.items():
            print(f"[guide_audit] cluster {k} ...")
            results.append(analyse_cluster(k, cfg, args.days))
        for k, cfg in GAP_TOPICS.items():
            print(f"[guide_audit] gap {k} ...")
            results.append(analyse_gap(k, cfg, args.days))

    for a in results:
        d = write_pack(a)
        if a["kind"] == "cluster":
            print(f"  {a['key']}: survivor={a['survivor']} satellites={len(a['satellites'])} "
                  f"disagreement={a['survivor_disagreement']} -> {d}")
        else:
            print(f"  {a['key']}: demand={a['total_topic_gsc_impr']}impr current_best={a['current_best']} -> {d}")


if __name__ == "__main__":
    main()
