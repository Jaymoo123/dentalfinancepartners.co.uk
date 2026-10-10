"""Protect list for ONE page: every query it earns on Google or Bing, mapped to the section that answers it.

Build:   python protect_list.py --site property --run 2026-10-10 --page /blog/<cat>/<slug>
         writes docs/<site>/rewrites/<run>/<slug>.protect.md and .protect.json
Verify:  python protect_list.py --site property --run 2026-10-10 --page <route> --verify --file <edited .md/.tsx>
         re-maps every protected query onto the edited file; exit 1 if any protected query lost its answering section.
Cost: free (Bing page data comes from the protect_register cache/store, pulled only if absent; GSC from stage 03b).

A query is on the list if it has any Bing click, Bing impressions >= list_bing_impr, any GSC click, or GSC
impressions >= list_gsc_impr (sites/<site>.json link_engine.protect_thresholds). Sections are the page's H2/H3
(plus the H1/title block and each FAQ entry). Matching is token overlap (stopwords dropped, plural-stripped):
score = 0.4 * share of query tokens in the heading + 0.6 * share in heading + parent heading + section body.
A query is answered when its best score >= answer_min (0.5). Sections within 0.03 of the best are reported as ties.
Verify fails a query when its new best score < min(answer_min, 0.8 * its baseline score).
"""
from __future__ import annotations

import argparse
import html
import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from common import REPO, load_site, norm_query, read_csv, run_dir  # noqa: E402
from protect_register import bing_by_query, fetch_bing, load_google, path_key  # noqa: E402

STOP = set("a an and are as at be by can do does for from has have how i if in is it its my of on or our should so "
           "that the their there this to uk was we what when where which who why will with you your me about into "
           "than then them they".split())
QUESTION_START = ("what", "how", "can", "do", "does", "is", "are", "when", "should", "who", "why", "which", "will", "must")


def tokens(s: str) -> set[str]:
    out = set()
    for w in re.findall(r"[a-z0-9]+", norm_query(s)):
        if w in STOP:
            continue
        if len(w) > 3 and w.endswith("s") and not w.endswith("ss"):
            w = w[:-1]
        out.add(w)
    return out


def _clean(s: str) -> str:
    s = re.sub(r"<[^>]+>", " ", s)
    s = re.sub(r"\{[^{}]*\}", " ", s)
    return re.sub(r"\s+", " ", html.unescape(s)).strip()


def source_path(route: str) -> Path:
    web = REPO / "Property" / "web"
    m = re.match(r"^/blog/[^/]+/([^/]+)$", route)
    if m:
        return web / "content" / "blog" / f"{m.group(1)}.md"
    return web / "src" / "app" / route.strip("/") / "page.tsx" if route != "/" else web / "src" / "app" / "page.tsx"


def _frontmatter(text: str):
    m = re.match(r"^---\n(.*?)\n---\n?", text, re.S)
    return (m.group(1), text[m.end():]) if m else ("", text)


def _fm_val(fm: str, key: str) -> str:
    m = re.search(rf"^{key}:\s*\"?(.*?)\"?\s*$", fm, re.M)
    return m.group(1) if m else ""


def _faqs(fm: str) -> list[dict]:
    out = []
    for m in re.finditer(r"-\s*question:\s*\"(.*?)\"\s*\n\s*answer:\s*\"(.*?)\"\s*(?=\n\s*-\s*question:|\n[A-Za-z]|\Z)", fm, re.S):
        out.append({"q": m.group(1), "a": m.group(2)})
    return out


def parse_sections(path: Path) -> dict:
    """Sections [{kind, level, heading, body, has_table, line}] for a blog .md or a page.tsx."""
    text = path.read_text(encoding="utf-8")
    secs = []
    if path.suffix == ".md":
        fm, body = _frontmatter(text)
        offset = text[: len(text) - len(body)].count("\n")
        h1 = _fm_val(fm, "h1") or _fm_val(fm, "title")
        secs.append({"kind": "title", "level": 1, "heading": h1,
                     "body": " ".join([_fm_val(fm, "metaTitle"), _fm_val(fm, "metaDescription"), _fm_val(fm, "summary")]),
                     "has_table": False, "line": 1})
        pat = re.compile(r"<h([23])[^>]*>(.*?)</h\1>|^(#{2,3})\s+(.+)$", re.S | re.M)
        for q in _faqs(fm):
            secs.append({"kind": "faq", "level": 3, "heading": q["q"], "body": q["a"], "has_table": False, "line": 0})
    else:
        body, offset = text, 0
        pat = re.compile(r"<h([23])\b[^>]*>(.*?)</h\1>", re.S)
        m1 = re.search(r"<h1\b[^>]*>(.*?)</h1>", text, re.S)
        secs.append({"kind": "title", "level": 1, "heading": _clean(m1.group(1)) if m1 else "", "body": "",
                     "has_table": False, "line": 1})
    hits = []
    for m in pat.finditer(body):
        if m.group(1):
            lvl, head = int(m.group(1)), m.group(2)
        else:
            lvl, head = len(m.group(3)), m.group(4)
        hits.append((m.start(), m.end(), lvl, _clean(head)))
    parent = ""
    for i, (s, e, lvl, head) in enumerate(hits):
        end = hits[i + 1][0] if i + 1 < len(hits) else len(body)
        chunk = body[e:end]
        if lvl == 2:
            parent = head
        secs.append({"kind": "heading", "level": lvl, "heading": head, "parent": parent if lvl == 3 else "",
                     "body": _clean(chunk) if path.suffix == ".md" else _clean(re.sub(r"\b[a-zA-Z]+=(\"[^\"]*\"|\{[^{}]*\})", " ", chunk)),
                     "has_table": bool(re.search(r"<table|^\s*\|.+\|\s*$", chunk, re.M)),
                     "line": offset + body[:s].count("\n") + 1})
    # for tsx, drop headings that are empty after cleaning (variable headings)
    return {"sections": [s for s in secs if s["heading"]]}


def score_query(q: str, secs: list[dict]) -> dict:
    qt = tokens(q)
    if not qt:
        return {"best": None, "score": 0.0, "ties": []}
    scored = []
    for s in secs:
        ht = tokens(s["heading"])
        bt = ht | tokens(s.get("parent", "")) | tokens(s["body"])
        sc = 0.4 * len(qt & ht) / len(qt) + 0.6 * len(qt & bt) / len(qt)
        scored.append((round(sc, 3), s))
    scored.sort(key=lambda x: (-x[0], x[1]["line"]))
    if not scored or scored[0][0] == 0:
        return {"best": None, "score": 0.0, "ties": []}
    top = scored[0][0]
    ties = [x[1] for x in scored[1:] if top - x[0] <= 0.03 and x[0] > 0]
    return {"best": scored[0][1], "score": top, "ties": ties}


def label(s: dict | None) -> str:
    if not s:
        return "(none)"
    pre = {"title": "H1/title", "faq": "FAQ", "heading": f"H{s['level']}"}[s["kind"]]
    return f"{pre}: {s['heading']}"


def is_question_heading(s: dict) -> bool:
    h = s["heading"].lower()
    return s["kind"] == "heading" and (h.endswith("?") or h.startswith(QUESTION_START))


def collect_queries(le: dict, stages: Path, route: str, th: dict, refresh: bool) -> tuple[list[dict], dict]:
    braw, src = fetch_bing(le, route, 30, refresh)
    bq = bing_by_query(braw)
    _, gqp = load_google(stages)
    gq = gqp.get(route, {})
    out = []
    for q in set(bq) | set(gq):
        b, g = bq.get(q), gq.get(q)
        keep = ((b and (b["clicks"] > 0 or b["impr"] >= th["list_bing_impr"]))
                or (g and (g["clicks"] > 0 or g["impr"] >= th["list_gsc_impr"])))
        if not keep:
            continue
        engines = [e for e, v in (("bing", b), ("google", g)) if v and (v["clicks"] > 0 or v["impr"] > 0)]
        out.append({"query": q, "engine": "+".join(engines),
                    "bing_clicks": b["clicks"] if b else 0, "bing_impr": b["impr"] if b else 0,
                    "bing_pos": b["pos"] if b else None,
                    "gsc_clicks": g["clicks"] if g else 0, "gsc_impr": g["impr"] if g else 0,
                    "gsc_pos": round(g["pos"], 2) if g else None})
    out.sort(key=lambda r: (-(r["bing_clicks"] + r["gsc_clicks"]), -(r["bing_impr"] + r["gsc_impr"]), r["query"]))
    return out, {"bing_source": src, "bing_rows": len(braw), "bing_queries_total": len(bq), "google_queries_total": len(gq)}


def map_queries(queries: list[dict], secs: list[dict]) -> list[dict]:
    res = []
    for r in queries:
        m = score_query(r["query"], secs)
        res.append({**r, "score": m["score"], "section": label(m["best"]), "section_line": m["best"]["line"] if m["best"] else None,
                    "ties": [label(t) for t in m["ties"]]})
    return res


def structures(secs: list[dict], mapped: list[dict], answer_min: float) -> dict:
    used = {m["section"] for m in mapped if m["score"] >= answer_min}
    return {"question_headings": [s["heading"] for s in secs if is_question_heading(s)],
            "tables": [s["heading"] for s in secs if s["has_table"]],
            "faq_entries_matching_queries": [s["heading"] for s in secs if s["kind"] == "faq" and label(s) in used],
            "faq_entries_all": [s["heading"] for s in secs if s["kind"] == "faq"]}


def build(a, cfg) -> None:
    le, th = cfg["link_engine"], cfg["link_engine"]["protect_thresholds"]
    stages = run_dir(a.site, a.run) / "stages"
    src = source_path(a.page)
    if not src.exists():
        sys.exit(f"source not found for {a.page}: {src}")
    queries, info = collect_queries(le, stages, a.page, th, a.refresh)
    secs = parse_sections(src)["sections"]
    mapped = map_queries(queries, secs)
    st = structures(secs, mapped, th["answer_min"])
    slug = a.page.rstrip("/").split("/")[-1]
    outd = REPO / "docs" / a.site / "rewrites" / a.run
    outd.mkdir(parents=True, exist_ok=True)
    unans = [m for m in mapped if m["score"] < th["answer_min"]]
    data = {"page": a.page, "slug": slug, "source": str(src.relative_to(REPO)).replace("\\", "/"), "run": a.run,
            "answer_min": th["answer_min"], "gsc_window": json.loads((stages / "03b_gsc_page_fresh.csv.meta.json").read_text(encoding="utf-8")).get("window"),
            **info, "n_queries": len(mapped), "n_unanswered_at_baseline": len(unans), "queries": mapped, "structures": st,
            "sections": [{k: s[k] for k in ("kind", "level", "heading", "line", "has_table")} for s in secs]}
    (outd / f"{slug}.protect.json").write_text(json.dumps(data, indent=2), encoding="utf-8")
    L = [f"# Protect list: {a.page}", "",
         f"Source: `{data['source']}`. Bing: {info['bing_rows']} weekly rows, {info['bing_queries_total']} queries (full range Bing returns). "
         f"Google: {info['google_queries_total']} queries, window {data['gsc_window']}.", "",
         f"{len(mapped)} protected queries (any Bing click, Bing impr >= {th['list_bing_impr']}, any GSC click, GSC impr >= {th['list_gsc_impr']}). "
         f"{len(unans)} have no answering section today (score < {th['answer_min']}): gaps to fill, not to lose.", "",
         "Rule: after editing, every row below must still have an answering H2/H3/FAQ. Check with "
         f"`protect_list.py --verify --page {a.page} --file <edited file>`.", "",
         "| Query | Engine | Bing clk | Bing impr | Bing pos | GSC clk | GSC impr | GSC pos | Answering section (score) | Ties |",
         "|---|---|---|---|---|---|---|---|---|---|"]
    for m in mapped:
        sec = f"{m['section']} (L{m['section_line']}, {m['score']})" if m["score"] else "(none)"
        L.append(f"| {m['query']} | {m['engine']} | {m['bing_clicks']} | {m['bing_impr']} | {m['bing_pos'] or ''} | {m['gsc_clicks']} | "
                 f"{m['gsc_impr']} | {m['gsc_pos'] or ''} | {sec} | {'; '.join(m['ties'])} |")
    L += ["", "## Bing-friendly structures to keep", ""]
    for title, key in (("Question headings", "question_headings"), ("Tables (under heading)", "tables"),
                       ("FAQ entries that answer a protected query", "faq_entries_matching_queries")):
        L.append(f"**{title}** ({len(st[key])})")
        L += [f"- {x}" for x in st[key]] or ["- none"]
        L.append("")
    other = len(st["faq_entries_all"]) - len(st["faq_entries_matching_queries"])
    L.append(f"Other FAQ entries (no protected query maps to them): {other}.")
    (outd / f"{slug}.protect.md").write_text("\n".join(L) + "\n", encoding="utf-8")
    print(f"{a.page}: {len(mapped)} protected queries, {len(unans)} unanswered at baseline -> {outd / (slug + '.protect.md')}")


def verify(a, cfg) -> int:
    th = cfg["link_engine"]["protect_thresholds"]
    slug = a.page.rstrip("/").split("/")[-1]
    pj = REPO / "docs" / a.site / "rewrites" / a.run / f"{slug}.protect.json"
    if not pj.exists():
        sys.exit(f"no baseline protect list: {pj} (run build first)")
    base = json.loads(pj.read_text(encoding="utf-8"))
    secs = parse_sections(Path(a.file))["sections"]
    lost, kept = [], 0
    for q in base["queries"]:
        m = score_query(q["query"], secs)
        need = min(th["answer_min"], 0.8 * q["score"])
        if m["score"] < need or (q["score"] >= th["answer_min"] and m["score"] < th["answer_min"]):
            lost.append({"query": q["query"], "was": f"{q['section']} ({q['score']})", "now": f"{label(m['best'])} ({m['score']})",
                         "bing_clicks": q["bing_clicks"], "gsc_clicks": q["gsc_clicks"]})
        else:
            kept += 1
    now_st = structures(secs, [], th["answer_min"])
    gone = {k: [x for x in base["structures"][k] if x not in now_st[k]] for k in ("question_headings", "tables")}
    print(f"verify {a.page} vs {a.file}: {kept}/{len(base['queries'])} protected queries still answered, {len(lost)} lost")
    for l in lost:
        print(f"  LOST  {l['query']!r} (bing clk {l['bing_clicks']}, gsc clk {l['gsc_clicks']}): was {l['was']}; now {l['now']}")
    for k, v in gone.items():
        for x in v:
            print(f"  WARN  {k} no longer present: {x}")
    return 1 if lost else 0


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--site", required=True)
    ap.add_argument("--run", required=True)
    ap.add_argument("--page", required=True, help="route, e.g. /blog/capital-gains-tax/<slug>")
    ap.add_argument("--verify", action="store_true")
    ap.add_argument("--file", help="edited .md/.tsx (verify mode)")
    ap.add_argument("--refresh", action="store_true", help="re-pull Bing for this page")
    a = ap.parse_args()
    cfg = load_site(a.site)
    if a.verify:
        if not a.file:
            sys.exit("--verify needs --file")
        sys.exit(verify(a, cfg))
    build(a, cfg)


if __name__ == "__main__":
    main()
