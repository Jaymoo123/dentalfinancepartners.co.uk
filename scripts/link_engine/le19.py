"""Stage 06b: the LE-19 queue, families where a guide should own the search and a sales page should convert.

Ruling LE-19 (sites/<site>_rulings.md): where Google's top 10 for a search is mostly guides, a guide owns it and hands
ready-to-hire readers to the sales page. Judged with rubrics/guide_owner.md; verdicts go in judgments/le19_<reader>.jsonl
and are applied by apply_judgments.py (decisions guide_owner, keep_sales_page, gap_guide_needed).
Inputs (run dir): stages/06_families.csv, 05_clusters.csv, 03_gsc_query_page.csv, 08_pages.csv, accuracy/D_intent.csv,
  inputs/leads_by_entry_page.csv, stages/10_excerpts/ (assign.py's page excerpts; missing ones are created here).
Output: stages/06_le19_queue.csv  one row per family, columns
  family_id, head, keywords (top 8), demand_volume, value_usd_month, current_owner, share_service, share_guide, share_gov,
  queue_reason, cand1..cand8 (page, title, source gsc|similarity|both, impressions, position, leads_90d, similarity,
  excerpt_path) and input_sha256 (sha256 of the row content, the key a verdict must carry).
Cost: free.

Run it AFTER apply_judgments.py (it needs the judged owners); the sales owner is conversion_page, so the queue and its hashes
  stay the same once LE-19 verdicts are applied.
Queue = ranked families (a) owned by a sales page (/services/, /for/, /locations/, /landed-estates, /for-letting-agents) whose
  accuracy/D_intent.csv flag is "mismatch", plus (b) every ranked family owned by one of the four LE-19 pages (gifting, selling
  a buy-to-let, incorporation, SPV) whose Google top-10 dominant type is guide, gov or association. Families already
  guide-owned (LE-14, LE-12) are not sales-owned so never enter; the LE-20 families (landlord tax advice) are excluded because the
  manager rules them.
Candidates: the top 5 of OUR indexable non-sales pages by GSC impressions on the family's queries (impression-weighted position,
  leads) plus the top 5 by TF-IDF similarity (page title + h1 + first 300 words against the family's keywords), deduplicated, at
  most 8, never a noindexed or redirected page.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import re
from collections import Counter, defaultdict

from assign import cos, main_text_words, tfidf, tokens
from common import REPO, load_site, norm_query, read_csv, run_dir, script_meta, write_csv
from families import fnum, is_bad_page, path_of, routes

SALES_PREFIXES = ("/services/", "/for/", "/locations/", "/landed-estates", "/for-letting-agents")
LE19_PAGES = {"/for/gifting-property-to-family", "/for/selling-a-buy-to-let", "/for/moving-property-into-a-limited-company",
              "/for/property-spv-set-up"}
EXCLUDE_FAMILIES = {"landlord-tax-advice", "small-landlord-tax-advice"}       # LE-20, ruled by the manager
GUIDE_TYPES = {"guide", "gov", "association"}
N_CAND = 8


def cand_cols() -> list[str]:
    return [f"cand{i}_{k}" for i in range(1, N_CAND + 1)
            for k in ("page", "title", "source", "impressions", "position", "leads_90d", "similarity", "excerpt_path")]


QUEUE = (["family_id", "head", "keywords", "demand_volume", "value_usd_month", "current_owner", "share_service", "share_guide",
          "share_gov", "queue_reason"] + cand_cols() + ["input_sha256"])


def is_sales(p: str) -> bool:
    return p.startswith(SALES_PREFIXES) or p == "/"


def row_sha(row: dict) -> str:
    body = json.dumps({k: str(row.get(k, "")) for k in QUEUE if k != "input_sha256"}, sort_keys=True, ensure_ascii=False)
    return hashlib.sha256(body.encode("utf-8")).hexdigest()


def excerpt_for(route: str, page: dict, st) -> str:
    ex_dir = st / "10_excerpts"
    ex_dir.mkdir(exist_ok=True)
    ep = ex_dir / ((re.sub(r"[^a-z0-9]+", "_", route.strip("/").lower()) or "home") + ".txt")
    if not ep.exists():
        words = main_text_words(REPO / page["html_file"]) if page.get("html_file") else []
        ep.write_text(f"{page['title']}\n{page['h1']}\n\n{' '.join(words)}\n", encoding="utf-8")
    return ep.relative_to(REPO).as_posix()


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--site", required=True)
    ap.add_argument("--run", required=True)
    a = ap.parse_args()
    cfg = load_site(a.site)["link_engine"]
    rd = run_dir(a.site, a.run)
    st = rd / "stages"
    fams = [f for f in read_csv(st / "06_families.csv") if f["rank"]]
    dint = {r["family_id"]: r for r in read_csv(rd / "accuracy" / "D_intent.csv")}
    pages = {r["route"]: r for r in read_csv(st / "08_pages.csv")}
    _, bad = routes()
    sitewide = set(cfg.get("sitewide_pages", [])) | set(cfg.get("assign_excluded_sources", []))
    guides = [r for r, p in pages.items() if p["indexable"] == "true" and not is_sales(r) and r not in sitewide
              and not re.fullmatch(r"/blog/[^/]+", r) and not is_bad_page(r, bad)]
    guide_set = set(guides)
    kw_of = defaultdict(list)
    for c in read_csv(st / "05_clusters.csv"):
        kw_of[c["family_id"]].append(c)
    gq = defaultdict(list)                                  # norm query -> [(path, impressions, position)]
    for r in read_csv(st / "03_gsc_query_page.csv"):
        gq[norm_query(r["query"])].append((path_of(r["page"]), fnum(r["impressions"]), fnum(r["position"])))
    leads = {r["entry_path"]: int(fnum(r["leads"])) for r in read_csv(rd / "inputs" / "leads_by_entry_page.csv")}

    queue_fams = []
    for f in fams:
        o, d = f.get("conversion_page") or f["owner_page"], dint.get(f["family_id"], {})      # the sales owner, stable once LE-19 is applied
        if f["family_id"] in EXCLUDE_FAMILIES or not is_sales(o):
            continue
        if d.get("flag") == "mismatch":
            queue_fams.append((f, "google mismatch (D_intent flag)"))
        elif o in LE19_PAGES and d.get("dominant_type") in GUIDE_TYPES:
            queue_fams.append((f, f"LE-19 page, Google top 10 mostly {d['dominant_type']}"))

    docs = {}
    for r in guides:
        p = pages[r]
        ep = REPO / excerpt_for(r, p, st)
        docs[("p", r)] = ep.read_text(encoding="utf-8")
    for f, _ in queue_fams:
        ks = sorted(kw_of[f["family_id"]], key=lambda k: -fnum(k["volume"]))
        docs[("f", f["family_id"])] = " ".join([f["head"]] * 3 + [k["keyword"] for k in ks])
    vec = tfidf(docs)

    rows = []
    for f, why in queue_fams:
        fid = f["family_id"]
        ks = sorted(kw_of[fid], key=lambda k: (-fnum(k["volume"]), k["keyword"]))
        keys = {norm_query(k["keyword"]) for k in ks}
        agg = defaultdict(lambda: [0.0, 0.0])
        for q in keys:
            for pth, im, ps in gq.get(q, []):
                agg[pth][0] += im
                agg[pth][1] += im * ps
        gsc = sorted(((p, im, wp / im) for p, (im, wp) in agg.items() if p in guide_set and im > 0),
                     key=lambda x: (-x[1], x[0]))[:5]
        sims = sorted(((cos(vec[("f", fid)], vec[("p", r)]), r) for r in guides), key=lambda x: (-x[0], x[1]))[:5]
        sim_of = {r: s for s, r in sims}
        order, src = [], {}
        for p, _, _ in gsc:
            order.append(p)
            src[p] = "gsc"
        for s, r in sims:
            if r not in src:
                order.append(r)
                src[r] = "similarity"
            elif src[r] == "gsc":
                src[r] = "both"
        order = order[:N_CAND]
        g = {p: (im, pos) for p, im, pos in gsc}
        row = {"family_id": fid, "head": f["head"], "keywords": "; ".join(k["keyword"] for k in ks[:8]),
               "demand_volume": f["demand_volume"], "value_usd_month": f["value_usd_month"], "current_owner": f.get("conversion_page") or f["owner_page"],
               "share_service": dint.get(fid, {}).get("share_service", ""), "share_guide": dint.get(fid, {}).get("share_guide", ""),
               "share_gov": dint.get(fid, {}).get("share_gov", ""), "queue_reason": why}
        for i in range(1, N_CAND + 1):
            p = order[i - 1] if i <= len(order) else ""
            sim = cos(vec[("f", fid)], vec[("p", p)]) if p else ""
            row.update({f"cand{i}_page": p, f"cand{i}_title": pages[p]["title"] if p else "", f"cand{i}_source": src.get(p, ""),
                        f"cand{i}_impressions": int(g[p][0]) if p in g else (0 if p else ""),
                        f"cand{i}_position": round(g[p][1], 1) if p in g else "", f"cand{i}_leads_90d": leads.get(p, 0) if p else "",
                        f"cand{i}_similarity": round(sim, 3) if p else "",
                        f"cand{i}_excerpt_path": excerpt_for(p, pages[p], st) if p else ""})
        row["input_sha256"] = row_sha(row)
        rows.append(row)
    write_csv(st / "06_le19_queue.csv", rows, QUEUE,
              {"source": "06_families + D_intent flags + GSC + TF-IDF over indexable non-sales pages (ruling LE-19)",
               "site": a.site, "data_through": a.run, "n_guides_considered": len(guides), **script_meta()})
    print(f"LE-19 queue {len(rows)} families; by current owner {dict(Counter(r['current_owner'] for r in rows))}; "
          f"{dict(Counter(r['queue_reason'][:12] for r in rows))}")


if __name__ == "__main__":
    main()
