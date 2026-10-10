"""Stage 10: give every source page one primary money-page destination (and sometimes a secondary).

Inputs (run dir): stages/06_owner_rollup.csv + 06_families.csv (destinations, shares), 05_clusters.csv (keyword -> family),
  03_gsc_query_page.csv + 03_gsc_page.csv (fresh GSC 90d), 08_pages.csv (routes, titles, indexable, html_file),
  inputs/leads_by_entry_page.csv, docs/_engines/property_frozen_pages.md, the built HTML named in 08_pages (page text),
  the blog .md files / page sources (for the sha256 cache key), site config (sitewide_pages, category_destinations,
  give_up_pages, assign_excluded_sources), judgments/assign_*.jsonl (only with --apply-judgments).
Outputs: stages/10_assignments.csv  one row per source (queue rows are listed with basis "pending")
         stages/10_assign_queue.csv the rows the deterministic rules could not settle (for Opus, rubrics/page_family.md),
                                   plus stages/10_excerpts/<route>.txt (title, h1, first 300 words) for each
         with --apply-judgments also stages/10_assign_disagreements.csv and stages/10_assign_rejudge.csv
Cost: free (no API calls). Deterministic: it reads every input fresh, so re-run it after stage 08/09 files change.
      Running it WITHOUT --apply-judgments recomputes the deterministic result only; use --apply-judgments once verdicts exist.

Definitions
  DESTINATION  an owner_page of the owner rollup (ranked money families only) that is a real, indexable built route.
               GAP / EXCLUDE / "needs judgment" / "other" rows are not destinations.
  SOURCE       an indexable page of 08_pages.csv except: config sitewide_pages, config assign_excluded_sources (calculators
               index, research hub, legal pages), blog category hubs (/blog/<category>). A destination is a source for every
               other destination but never for itself.
  S1           the page's own GSC queries (03_gsc_query_page), each mapped to a ranked family through 05_clusters
               (exact normalised query = cluster keyword) and so to that family's owner page; impression-weighted share per
               destination. Queries that map to no ranked family are ignored (s1_cover = mapped impressions / all impressions).
  S2           TF-IDF cosine (plain python, sublinear tf, idf over all pages and destination documents) between the page document
               (title + h1 + slug words + first 300 words of its built main text) and each destination document (destination
               title + slug words + the heads and keywords of the families it owns). s2_margin = top score minus second.
  S3           category prior: config category_destinations for blog posts; in Property Accountant Services a post whose slug
               names a city that has a /locations/<city> page goes to that city page instead.
  Auto-assign  blog posts only, first match wins (see decide): s1_strong, s2_specific; config forced_assignments (manager rulings, basis forced (LE-n)) come first. The category prior S3 is a signal only, not an auto rule. Everything else, and every
               non-blog source, is queued. stages/10_auto_audit_sample.csv holds a seeded random sample (20261010) of 15 auto-assigned
               pages per rule; those pages are also written to the queue file with audit_sample=true (primary hidden) so the judges
               re-judge them blind; their verdicts never change the assignment, they measure auto accuracy.
  secondary    only evidence-based: the second S1 destination when its share >= 0.25 and it is in the S2 top 3.
  source_value S2 score to the primary destination * log1p(clicks*10 + impressions) + log1p(leads_90d)*2. Pending rows use
               their S2 top as a stand-in (source_value_basis "provisional").
  frozen       property_frozen_pages.md line with signoff: none (a line carrying a real sign-off is not frozen; the sign-off
               text is the owner's scope and the editor must respect it).
  give_up      config give_up_pages (blueprint section 4: pages that give up a phrase and wait on R6).
primary_dest 'none' (judged: no sales link fits this page) is accepted; it is assigned but gets no link and no budget.
Judgments (--apply-judgments), schema in rubrics/page_family.md: matched to the queue row by input_sha256 (the sha256 of the
  source file, see source_sha). Two readers agreeing on primary_dest apply at the lower confidence; disagreement leaves the row
  queued and lists it in 10_assign_disagreements.csv; a "manager" verdict is final but must match the sha; a stale sha is never
  silently dropped (carried over when two readers agree, otherwise listed in 10_assign_rejudge.csv); a lone low verdict aborts.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import math
import random
import re
from collections import Counter, defaultdict
from pathlib import Path
from urllib.parse import urlsplit

from lxml import html as LH

from common import REPO, load_site, norm_query, read_csv, run_dir, script_meta, write_csv

OUT = ["source", "primary_dest", "secondary_dest", "basis", "s1_top", "s1_share", "s1_impr", "s2_top", "s2_score", "s2_margin",
       "s3", "source_value", "frozen", "give_up", "source_value_basis", "s1_cover", "gsc_clicks", "gsc_impressions", "leads_90d",
       "category", "input_sha256"]
QUEUE = (["source", "group", "title", "h1", "category", "reason_queued", "excerpt_path", "gsc_impressions", "leads_90d"] +
         [f"s1_cand{i}_{k}" for i in (1, 2, 3) for k in ("dest", "share", "impr")] +
         [f"s2_cand{i}_{k}" for i in (1, 2, 3) for k in ("dest", "score")] + ["s3", "frozen", "give_up", "input_sha256", "input_basis", "audit_sample"])
DIS = ["source", "detail"] + [f"{r}_{k}" for r in ("reader1", "reader2") for k in ("primary_dest", "secondary_dest", "confidence", "reason")]
CONF_ORDER = {"low": 0, "medium": 1, "high": 2}
STOP = set("""a an and are as at be but by can do does for from has have how i if in into is it its me my new of on or our so than that
the their then there these they this to up us was we what when which who why will with you your not no yes all any more most
2025 2026 2027 uk guide complete full""".split())
WEB = REPO / "Property" / "web"
FROZEN_MD = REPO / "docs" / "_engines" / "property_frozen_pages.md"


# ----- small helpers ----------------------------------------------------------------------------------------------------

def fnum(v, d=0.0) -> float:
    try:
        return float(v)
    except (TypeError, ValueError):
        return d


def path_of(u: str) -> str:
    p = urlsplit(u).path.rstrip("/")
    return p or "/"


def ws(s: str) -> str:
    return re.sub(r"\s+", " ", s or "").strip()


def slugify_category(c: str) -> str:
    """Same as families.slugify_category (Property: '&' -> 'and')."""
    c = c.lower().replace("&", "and")
    c = re.sub(r"\s+", "-", c)
    c = re.sub(r"[^a-z0-9-]", "", c)
    return re.sub(r"-{2,}", "-", c).strip("-")


def tokens(text: str) -> list[str]:
    out = []
    for t in re.split(r"[^a-z0-9]+", text.lower()):
        if len(t) < 2 or t in STOP:
            continue
        out.append(t[:-1] if len(t) > 3 and t.endswith("s") and not t.endswith("ss") else t)
    return out


def sha_text(s: str) -> str:
    return hashlib.sha256(s.encode("utf-8")).hexdigest()


# ----- page text ---------------------------------------------------------------------------------------------------------

DROP_TAGS = ("header", "footer", "nav", "aside", "form", "script", "style", "noscript", "svg", "button")


def main_text_words(html_file: Path, n: int = 300) -> list[str]:
    """First n words of a built page's main text: paragraphs, list items and sub-headings of <main>, without the h1, the
    site chrome, forms, asides, FAQ, related and card modules."""
    try:
        root = LH.parse(str(html_file)).getroot()
    except (OSError, ValueError):
        return []
    main = next(root.iter("main"), None)
    if main is None:
        return []
    for el in list(main.iter()):
        if el.getparent() is None:
            continue
        lab = (el.get("aria-labelledby") or "").lower()
        cls = (el.get("class") or "").lower()
        if el.tag in DROP_TAGS or any(x in lab for x in ("related", "faq", "form")) or "related-card" in cls:
            el.getparent().remove(el)
    words, seen = [], set()
    for el in main.iter("p", "li", "h2", "h3", "h4", "blockquote"):
        if el.tag == "li" and el.find(".//p") is not None:
            continue
        t = ws(el.text_content())
        if len(t) < 3 or t in seen:
            continue
        seen.add(t)
        words += t.split()
        if len(words) >= n:
            break
    return words[:n]


# ----- context -------------------------------------------------------------------------------------------------------------

def parse_frozen() -> tuple[set, dict]:
    """(frozen paths = signoff none, {path: sign-off text} for lines that carry a real sign-off)."""
    frozen, signed = set(), {}
    for ln in FROZEN_MD.read_text(encoding="utf-8").splitlines():
        m = re.match(r"^- (https?://\S+)\s*\|(.*)\|\s*signoff:\s*(.*)$", ln)
        if not m:
            continue
        p = path_of(m.group(1))
        if m.group(3).strip().lower().startswith("none"):
            frozen.add(p)
        else:
            signed[p] = m.group(3).strip()
    return frozen, signed


def blog_index() -> dict:
    """{route: md path} for every blog post file (route from frontmatter slug + slugified category)."""
    out = {}
    for f in sorted((WEB / "content" / "blog").glob("*.md")):
        head = f.read_text(encoding="utf-8").split("\n---", 2)[0]
        g = lambda k: (re.search(rf'(?m)^{k}:\s*["\']?(.+?)["\']?\s*$', head) or [None, ""])[1].strip()
        if g("slug") and g("category"):
            out[f"/blog/{slugify_category(g('category'))}/{g('slug')}"] = f
    return out


def source_sha(route: str, html_file: str, blogs: dict, cache: dict) -> tuple[str, str]:
    """(sha256, basis) of the file the page is written in: blog .md; static page.tsx; the audiences.ts / niche.config.json
    entry for /for and /locations pages (a shared file, so only that entry is hashed); else the built HTML."""
    if route in blogs:
        return hashlib.sha256(blogs[route].read_bytes()).hexdigest(), blogs[route].relative_to(REPO).as_posix()
    m = re.match(r"^/for/([^/]+)$", route)
    if m:
        src = cache.setdefault("aud", (WEB / "src" / "data" / "audiences.ts").read_text(encoding="utf-8"))
        i = src.find(f'"slug": "{m.group(1)}"')
        if i >= 0:
            j = src.find('"slug": "', i + 10)
            return sha_text(src[i:j if j > 0 else len(src)]), f"Property/web/src/data/audiences.ts entry {m.group(1)}"
    m = re.match(r"^/locations/([^/]+)$", route)
    if m:
        locs = cache.setdefault("loc", json.loads((REPO / "Property" / "niche.config.json").read_text(encoding="utf-8"))["locations"])
        e = next((x for x in locs if x["slug"] == m.group(1)), None)
        if e:
            return sha_text(json.dumps(e, sort_keys=True, ensure_ascii=False)), f"Property/niche.config.json location {m.group(1)}"
    p = WEB / "src" / "app" / (route.strip("/") or "") / "page.tsx"
    if p.exists():
        return hashlib.sha256(p.read_bytes()).hexdigest(), p.relative_to(REPO).as_posix()
    p = REPO / html_file
    if p.exists():
        return hashlib.sha256(p.read_bytes()).hexdigest(), html_file + " (built HTML)"
    return "", ""


def tfidf(docs: dict) -> dict:
    """{key: {term: weight}} unit vectors; sublinear tf, smoothed idf over all docs."""
    df = Counter()
    toks = {k: Counter(tokens(v)) for k, v in docs.items()}
    for c in toks.values():
        df.update(c.keys())
    n = len(docs)
    vec = {}
    for k, c in toks.items():
        w = {t: (1 + math.log(f)) * (math.log((1 + n) / (1 + df[t])) + 1) for t, f in c.items()}
        norm = math.sqrt(sum(x * x for x in w.values())) or 1.0
        vec[k] = {t: x / norm for t, x in w.items()}
    return vec


def cos(a: dict, b: dict) -> float:
    if len(a) > len(b):
        a, b = b, a
    return sum(x * b.get(t, 0.0) for t, x in a.items())


def load_ctx(site: str, run: str) -> dict:
    """Everything stages 10 to 12 share, read fresh from the run directory."""
    cfg = load_site(site)
    le = cfg["link_engine"]
    rd = run_dir(site, run)
    st = rd / "stages"
    pages = {r["route"]: r for r in read_csv(st / "08_pages.csv")}
    fams = read_csv(st / "06_families.csv")
    ranked = [f for f in fams if f["rank"]]
    owner_of_fam = {f["family_id"]: f["owner_page"] for f in ranked}
    roll = read_csv(st / "06_owner_rollup.csv")
    dests = {}
    for r in roll:
        o = r["owner_page"]
        if o.startswith("/") and o in pages and pages[o]["indexable"] == "true" and r["share_of_priority"] != "":
            dests[o] = {"share": fnum(r["share_of_priority"]), "title": pages[o]["title"], "h1": pages[o]["h1"],
                        "n_families": int(fnum(r["n_families"])), "leads_90d": int(fnum(r["leads_90d"]))}
    clusters = read_csv(st / "05_clusters.csv")
    fam_kw = defaultdict(list)
    kw_fam = {}
    for c in clusters:
        fam_kw[c["family_id"]].append(c["keyword"])
        kw_fam[norm_query(c["keyword"])] = c["family_id"]
    for d in dests:
        fs = [f for f in ranked if f["owner_page"] == d]
        dests[d]["heads"] = [f["head"] for f in fs]
        dests[d]["keywords"] = [k for f in fs for k in fam_kw[f["family_id"]]]
    for v in dests.values():
        v["share_raw"] = v["share"]
    fl = {k: float(x) for k, x in le.get("destination_share_floor", {}).items() if k in dests}
    if fl:                                                  # floors, then the others scale down so the total is unchanged
        total = sum(v["share"] for v in dests.values())
        rest = sum(v["share"] for k, v in dests.items() if k not in fl)
        scale = (total - sum(fl.values())) / rest if rest else 1.0
        for k, v in dests.items():
            v["share"] = fl[k] if k in fl else v["share"] * scale
    sitewide = set(le.get("sitewide_pages", [])) | set(le.get("assign_excluded_sources", []))
    sources = [r for r, p in pages.items() if p["indexable"] == "true" and r not in sitewide
               and not re.fullmatch(r"/blog/[^/]+", r)]
    gp = defaultdict(lambda: [0.0, 0.0])
    for r in read_csv(st / "03_gsc_page.csv"):
        g = gp[path_of(r["page"])]
        g[0] += fnum(r["clicks"])
        g[1] += fnum(r["impressions"])
    qp = defaultdict(list)
    for r in read_csv(st / "03_gsc_query_page.csv"):
        qp[path_of(r["page"])].append((norm_query(r["query"]), fnum(r["impressions"])))
    leads = {r["entry_path"]: int(fnum(r["leads"])) for r in read_csv(rd / "inputs" / "leads_by_entry_page.csv")}
    frozen, signed = parse_frozen()
    return {"cfg": cfg, "le": le, "rd": rd, "st": st, "pages": pages, "dests": dests, "sources": sources, "kw_fam": kw_fam,
            "owner_of_fam": owner_of_fam, "gsc_page": gp, "gsc_qp": qp, "leads": leads, "frozen": frozen, "signed": signed,
            "give_up": set(le.get("give_up_pages", [])), "sitewide": set(le.get("sitewide_pages", [])),
            "cat_dest": {slugify_category(k): v for k, v in le.get("category_destinations", {}).items()}}


GROUPS = {"A": ["landlord-tax-essentials"], "B": ["incorporation-and-company-structures"],
          "C": ["property-types-and-specialist-tax"], "D": ["property-accountant-services", "capital-gains-tax"],
          "E": ["non-resident-landlord-tax", "section-24-and-tax-relief", "property-finance", "making-tax-digital-mtd", "portfolio-management"]}


def group_of(route: str) -> str:
    """Judging batch: A Landlord Tax Essentials; B Incorporation; C Property Types; D Property Accountant Services + CGT;
    E Non-Resident, Section 24, Property Finance, MTD, Portfolio; F every non-blog source."""
    cat = category_of(route)
    return next((g for g, cs in GROUPS.items() if cat in cs), "F")


def category_of(route: str) -> str:
    m = re.match(r"^/blog/([^/]+)/[^/]+$", route)
    return m.group(1) if m else ""


def s3_prior(route: str, ctx: dict) -> str:
    """Category prior for blog posts; city-named Property Accountant Services posts go to the city page when it exists."""
    cat = category_of(route)
    if not cat:
        return ""
    if cat == "property-accountant-services":
        slug_t = set(route.rsplit("/", 1)[-1].split("-"))
        for city in ctx["le"].get("cities", []):
            if " " not in city and city in slug_t and f"/locations/{city}" in ctx["pages"] and f"/locations/{city}" in ctx["dests"]:
                return f"/locations/{city}"
    return ctx["cat_dest"].get(cat, "")


def compute_signals(ctx: dict) -> dict:
    """Per source: S1, S2, S3 and page stats. Returns {route: dict} and stores vectors in ctx for stages 11/12."""
    pages, dests = ctx["pages"], ctx["dests"]
    text = {}
    for r in set(ctx["sources"]) | set(dests) | {r for r, p in pages.items() if p["indexable"] == "true"}:
        p = pages[r]
        text[r] = main_text_words(REPO / p["html_file"])
    docs = {}
    for r, p in pages.items():
        if p["indexable"] == "true":
            docs[("p", r)] = " ".join([p["title"], p["h1"], r.replace("-", " ").replace("/", " "), " ".join(text.get(r, []))])
    for d, v in dests.items():
        docs[("d", d)] = " ".join([v["title"], d.replace("-", " ").replace("/", " "), " ".join(v["heads"]) + " " + " ".join(v["heads"]),
                                   " ".join(v["keywords"])])
    vec = tfidf(docs)
    ctx["vec"], ctx["text"] = vec, text
    out = {}
    for s in ctx["sources"]:
        s2 = sorted(((cos(vec[("p", s)], vec[("d", d)]), d) for d in dests if d != s), key=lambda x: (-x[0], x[1]))
        mapped, total = Counter(), 0.0
        for q, im in ctx["gsc_qp"].get(s, []):
            total += im
            fam = ctx["kw_fam"].get(q)
            o = ctx["owner_of_fam"].get(fam) if fam else None
            if o in dests and o != s:
                mapped[o] += im
        m_impr = sum(mapped.values())
        s1 = [(d, im / m_impr, im) for d, im in sorted(mapped.items(), key=lambda x: (-x[1], x[0]))] if m_impr else []
        g = ctx["gsc_page"].get(s, [0.0, 0.0])
        out[s] = {"s1": s1, "s1_impr": m_impr, "s1_cover": (m_impr / total) if total else 0.0, "s2": s2,
                  "s3": s3_prior(s, ctx), "clicks": g[0], "impr": g[1], "leads": ctx["leads"].get(s, 0)}
    return out


def s2_score(ctx: dict, s: str, d: str) -> float:
    return cos(ctx["vec"][("p", s)], ctx["vec"][("d", d)])


def attention(ctx: dict, s: str, sig: dict, d: str) -> float:
    """fit(source, d) * log1p(clicks*10 + impressions) + log1p(leads)*2: the source_value formula for a given destination."""
    return (s2_score(ctx, s, d) * math.log1p(sig["clicks"] * 10 + sig["impr"]) + math.log1p(sig["leads"]) * 2) if d else 0.0


def decide(sig: dict, ctx: dict, route: str) -> tuple[str, str, str, str]:
    """(primary, secondary, basis, reason_queued). Blog posts only, first rule that matches wins:
      s1_strong     S1 top share >= 0.6 with >= 20 mapped impressions
      s2_specific   S2 top is not a /services/ page or a converting guide (/blog/), score >= 0.20 and margin over second >= 0.03; secondary = S3 if S3 differs and is a /services/ page
    Non-blog sources and everything else are queued."""
    s1, s2, s3 = sig["s1"], sig["s2"], sig["s3"]
    if not category_of(route):
        return "", "", "pending", "non-blog source: always judged"
    margin = (s2[0][0] - s2[1][0]) if len(s2) > 1 else (s2[0][0] if s2 else 0.0)
    if s1 and s1[0][1] >= 0.6 and sig["s1_impr"] >= 20:
        sec = s1[1][0] if len(s1) > 1 and s1[1][1] >= 0.25 else ""
        return s1[0][0], sec, "s1_strong", ""
    if s2 and not s2[0][1].startswith(("/services/", "/blog/")) and s2[0][0] >= 0.20 and margin >= 0.03:
        sec = s3 if s3 and s3 != s2[0][1] and s3.startswith("/services/") else ""
        return s2[0][1], sec, "s2_specific", ""
    why = []
    if not s2 or s2[0][0] < 0.20 or s2[0][1].startswith("/services/") or margin < 0.03:
        why.append(f"S2 not specific (top {s2[0][1] if s2 else ''} {s2[0][0]:.2f}, margin {margin:.3f})" if s2 else "no S2")
    why.append("category prior is not an auto rule")
    return "", "", "pending", "; ".join(why)


# ----- judgments ---------------------------------------------------------------------------------------------------------------

def read_verdicts(rd: Path) -> tuple[dict, list]:
    by, refused = defaultdict(list), []
    jdir = rd / "judgments"
    for f in sorted(jdir.glob("assign_*.jsonl")) if jdir.exists() else []:
        for n, line in enumerate(f.read_text(encoding="utf-8").splitlines(), 1):
            if not line.strip():
                continue
            v = json.loads(line)
            if v.get("confidence") not in CONF_ORDER or not v.get("source") or not v.get("primary_dest"):
                refused.append((f.name, n, v.get("source"), "bad schema or confidence"))
                continue
            v.setdefault("reader", f.stem.replace("assign_", ""))
            by[v["source"]].append(v)
    return by, refused


def apply_judgments(rows: dict, queue: dict, ctx: dict) -> tuple[list, list, list, Counter]:
    """Merge verdicts into rows (in place). Returns (disagreements, rejudge, refused, applied counts)."""
    verdicts, refused = read_verdicts(ctx["rd"])
    dests = ctx["dests"]
    dis, rejudge, applied, lone_low = [], [], Counter(), []
    for src, vs in sorted(verdicts.items()):
        if src in rows and rows[src]["primary_dest"] and rows[src]["basis"] != "pending":
            continue                                        # audit-sample verdict on an auto-assigned page: measured, not applied
        q = queue.get(src)
        if q is None:
            rejudge.append({"source": src, "action": "superseded", "reason": "no longer queued (auto-assigned or not a source)"})
            continue
        ok = []
        for v in vs:
            sec = v.get("secondary_dest") or ""
            if (v["primary_dest"] != "none" and v["primary_dest"] not in dests) or v["primary_dest"] == src or (sec and (sec not in dests or sec in (src, v["primary_dest"]))):
                refused.append(("verdict", 0, src, f"{v.get('reader')}: primary/secondary is not a valid destination"))
            else:
                ok.append(v)
        vs = ok
        mgr = [v for v in vs if v.get("reader") == "manager"]
        if mgr and mgr[-1].get("input_sha256") != q["input_sha256"]:
            refused.append(("manager", 0, src, "manager verdict input_sha256 does not match the current source file"))
            mgr = []
            vs = [v for v in vs if v.get("reader") != "manager"]
        match = [v for v in vs if v.get("input_sha256") == q["input_sha256"]]
        stale = [v for v in vs if v.get("input_sha256") != q["input_sha256"]]
        note = ""
        if not match and stale:
            if len(stale) > 1 and len({v["primary_dest"] for v in stale}) == 1:
                match, note = stale, " (carried over: source file changed, readers agree)"
            else:
                rejudge.append({"source": src, "action": "rejudge", "reason": f"source file changed (sha mismatch); {len(stale)} stale verdict(s)"})
                continue
        elif match and stale and not mgr:
            rejudge.append({"source": src, "action": "rejudge", "reason": f"{len(stale)} stale verdict(s) ignored; applied the matching one"})
        if not match and not mgr:
            continue
        if mgr:
            v, basis = mgr[-1], "manager override"
            prim, sec = v["primary_dest"], v.get("secondary_dest") or ""
        elif len(match) == 1:
            v = match[0]
            if v["confidence"] == "low":
                lone_low.append(src)
                continue
            basis, prim, sec = f"judgment ({v['confidence']})", v["primary_dest"], v.get("secondary_dest") or ""
        elif len({v["primary_dest"] for v in match}) > 1:
            a, b = sorted(match, key=lambda v: v.get("reader", ""))[:2]
            dis.append({"source": src, "detail": "readers disagree on primary_dest",
                        **{f"{t}_{k}": (v.get(k) or "") for t, v in (("reader1", a), ("reader2", b))
                           for k in ("primary_dest", "secondary_dest", "confidence", "reason")}})
            rows[src]["basis"] = "OWNER DECISION NEEDED"
            continue
        else:
            v = min(match, key=lambda v: CONF_ORDER[v["confidence"]])
            basis = f"judgment ({v['confidence']})" if v["confidence"] != "low" else "judgment (low, 2 readers agree)"
            prim = v["primary_dest"]
            secs = {x.get("secondary_dest") or "" for x in match}
            sec = secs.pop() if len(secs) == 1 else ""
        rows[src].update({"primary_dest": prim, "secondary_dest": "" if prim == "none" else sec, "basis": basis + note})
        applied[basis] += 1
    if lone_low:
        raise SystemExit(f"ABORT: {len(lone_low)} low-confidence verdicts have no second reader: {lone_low[:10]}")
    return dis, rejudge, refused, applied


# ----- main --------------------------------------------------------------------------------------------------------------------

def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--site", required=True)
    ap.add_argument("--run", required=True)
    ap.add_argument("--apply-judgments", action="store_true", help="merge judgments/assign_*.jsonl into the queued rows")
    a = ap.parse_args()
    ctx = load_ctx(a.site, a.run)
    st, pages, dests = ctx["st"], ctx["pages"], ctx["dests"]
    sig = compute_signals(ctx)
    blogs, cache = blog_index(), {}
    ex_dir = st / "10_excerpts"
    ex_dir.mkdir(exist_ok=True)
    for old in ex_dir.glob("*.txt"):
        old.unlink()

    rows, queue = {}, {}
    for s in ctx["sources"]:
        g = sig[s]
        prim, sec, basis, why = decide(g, ctx, s)
        fa = ctx["le"].get("forced_assignments", {}).get(s)
        if fa:
            prim, sec, basis, why = fa["primary"], fa.get("secondary", ""), f"forced ({fa['ruling']})", ""
        top = g["s2"][0] if g["s2"] else (0.0, "")
        margin = (g["s2"][0][0] - g["s2"][1][0]) if len(g["s2"]) > 1 else top[0]
        sha, sbasis = source_sha(s, pages[s]["html_file"], blogs, cache)
        rows[s] = {"source": s, "primary_dest": prim, "secondary_dest": sec, "basis": basis,
                   "s1_top": g["s1"][0][0] if g["s1"] else "", "s1_share": round(g["s1"][0][1], 3) if g["s1"] else "",
                   "s1_impr": int(g["s1_impr"]), "s2_top": top[1], "s2_score": round(top[0], 3), "s2_margin": round(margin, 3),
                   "s3": g["s3"], "frozen": s in ctx["frozen"], "give_up": s in ctx["give_up"], "s1_cover": round(g["s1_cover"], 3),
                   "gsc_clicks": int(g["clicks"]), "gsc_impressions": int(g["impr"]), "leads_90d": g["leads"],
                   "category": category_of(s), "input_sha256": sha}
        if True:
            ep = ex_dir / ((re.sub(r"[^a-z0-9]+", "_", s.strip("/").lower()) or "home") + ".txt")
            q = {"source": s, "group": group_of(s), "title": pages[s]["title"], "h1": pages[s]["h1"], "category": category_of(s), "reason_queued": why,
                 "excerpt_path": ep.relative_to(REPO).as_posix(), "gsc_impressions": int(g["impr"]), "leads_90d": g["leads"],
                 "s3": g["s3"], "frozen": s in ctx["frozen"], "give_up": s in ctx["give_up"], "input_sha256": sha, "input_basis": sbasis, "audit_sample": ""}
            for i in range(3):
                c1 = g["s1"][i] if i < len(g["s1"]) else ("", "", "")
                c2 = g["s2"][i] if i < len(g["s2"]) else ("", "")
                q.update({f"s1_cand{i + 1}_dest": c1[0], f"s1_cand{i + 1}_share": round(c1[1], 3) if c1[0] else "",
                          f"s1_cand{i + 1}_impr": int(c1[2]) if c1[0] else "",
                          f"s2_cand{i + 1}_dest": c2[1], f"s2_cand{i + 1}_score": round(c2[0], 3) if c2[1] else ""})
            queue[s] = q

    # blind audit sample of the auto-assigned pages: 15 per rule, seeded
    rng = random.Random(20261010)
    sample, audit_rows = set(), []
    for rule in ("s1_strong", "s2_specific"):
        pool = sorted(s for s, r in rows.items() if r["basis"] == rule)
        for s in sorted(rng.sample(pool, min(15, len(pool)))):
            sample.add(s)
            r = rows[s]
            audit_rows.append({"rule": rule, "source": s, "title": pages[s]["title"], "h1": pages[s]["h1"], "category": r["category"],
                               "primary_dest": r["primary_dest"], "secondary_dest": r["secondary_dest"], "s1_top": r["s1_top"],
                               "s1_share": r["s1_share"], "s1_impr": r["s1_impr"], "s2_top": r["s2_top"], "s2_score": r["s2_score"],
                               "s2_margin": r["s2_margin"], "s3": r["s3"]})
    for s, q in queue.items():
        if s in sample:
            q["audit_sample"] = "true"
            q["reason_queued"] = "audit sample (auto-assigned; judge blind)"
        if s in sample or rows[s]["basis"] == "pending":
            Path(REPO / q["excerpt_path"]).write_text(f"{pages[s]['title']}\n{pages[s]['h1']}\n\n{' '.join(ctx['text'].get(s, []))}\n", encoding="utf-8")
    queue_full = {s: q for s, q in queue.items() if s in sample or rows[s]["basis"] == "pending"}
    queue = {s: q for s, q in queue.items() if rows[s]["basis"] == "pending"}

    dis, rejudge, refused, applied = [], [], [], Counter()
    if a.apply_judgments:
        dis, rejudge, refused, applied = apply_judgments(rows, queue, ctx)
    for s, r in rows.items():
        g = sig[s]
        if r["primary_dest"] == "none":
            r["source_value"], r["source_value_basis"] = 0.0, "none"
        elif r["primary_dest"]:
            r["source_value"] = round(attention(ctx, s, g, r["primary_dest"]), 3)
            r["source_value_basis"] = "primary"
        else:
            r["source_value"] = round(attention(ctx, s, g, r["s2_top"]), 3)
            r["source_value_basis"] = "provisional"
    still = {s: q for s, q in queue.items() if not rows[s]["primary_dest"]}
    meta = {"source": "06_owner_rollup + 06_families + 05_clusters + 03_gsc_* + 08_pages + built HTML + leads + frozen list",
            "site": a.site, "data_through": a.run, "n_destinations": len(dests), "n_sources": len(rows),
            "judgments_applied": bool(a.apply_judgments), **script_meta()}
    out = sorted(rows.values(), key=lambda r: (r["basis"] == "pending", -fnum(r["source_value"]), r["source"]))
    write_csv(st / "10_assignments.csv", out, OUT, meta)
    qrows = [q for s_, q in queue_full.items() if s_ in sample or s_ in still]
    write_csv(st / "10_assign_queue.csv", sorted(qrows, key=lambda q: (q["group"], q["audit_sample"] == "true", -q["gsc_impressions"], q["source"])), QUEUE, meta)
    write_csv(st / "10_auto_audit_sample.csv", audit_rows, list(audit_rows[0]) if audit_rows else ["rule", "source"], meta)
    if a.apply_judgments:
        write_csv(st / "10_assign_disagreements.csv", dis, DIS, meta)
        write_csv(st / "10_assign_rejudge.csv", rejudge, ["source", "action", "reason"], meta)
    by_basis = Counter(r["basis"] for r in rows.values())
    print(f"{len(dests)} destinations; {len(rows)} sources; basis {dict(by_basis)}; queue {len(still)} (+{len(sample)} audit-sample rows in the file); "
          f"frozen {sum(r['frozen'] for r in rows.values())}; give_up {sum(r['give_up'] for r in rows.values())}"
          + (f"; judgments applied {dict(applied)}; refused {len(refused)}" if a.apply_judgments else ""))
    for x in refused:
        print("REFUSED", *x)


if __name__ == "__main__":
    main()
