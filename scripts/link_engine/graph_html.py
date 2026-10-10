"""Stage 08: parse every built HTML page into an internal-link graph (source of the Half B link counts).

Inputs: <buildDir>/.next/server/app/**/*.html (stage 07 must have run), <buildDir>/src/middleware.ts (redirect maps),
        <buildDir>/next.config.ts (permanent redirects), <buildDir>/src/app/**/page.tsx (to name the card modules).
Outputs: stages/08_edges_html.csv  one row per internal <a href>: source, target_raw, target_final, status, region,
                                   anchor_text, rel, position_in_body, para_index (+ para_total, card_module, redirect_reason)
         stages/08_pages.csv       one row per built page (route, canonical, title, h1, in/out counts, click depth, orphan flag)
         stages/08_summary.json    totals, money-page body in-links vs the 2026-10-09 baseline, hire-wording anchors, examples
Cost: free (no API calls, no network). Deterministic.

Route = path under the app dir minus .html (index.html is /). Skipped as sources (listed in the summary): _not-found,
api, embed (and /embed/*), feed, sitemap, robots, llms, opengraph/icon artefacts, and .rsc/.meta/.body files.

Region, first match wins:
  1 nav         inside <header> (site header, i.e. not inside <main>), covers nav[aria-label=Primary|Mobile]
  2 footer      inside <footer> (site footer, not inside <main>)
  3 breadcrumb  nav whose aria-label contains "readcrumb";  toc: nav whose aria-label contains "contents"
  4 related     section whose aria-labelledby contains "related";  form: contains "form" (or inside a <form> element);
                faq: contains "faq"
  5 related_cards  link inside a RelatedArticles card (.related-card), not already matched by 4
  5b listing    link inside an <article> card that is not the page's own main > article (HubArticleList, BlogListWithSearch:
                the /blog index and category hubs list every post; these are navigation lists, not prose, so they are not body)
  4b faq        link inside a Radix accordion panel (role=region + data-orientation: FaqSection on service and /for pages; the
                blog FAQ is the labelled section above). Stage 09 files the same links under field faq
  5c listing    card, chip and map modules that carry no label of their own, found by shape (CARD_SHAPE below): the UK
                LocationMap (svg aria-label "Map of ..."); anchors that are one of >= 3 identical siblings, or whose wrapper card
                is, and sit outside any text block (WhatWeCoverSection, calculator and guide tiles, LocationChips, hub category
                chips, service cards). CardCarousel slides (aria-roledescription=slide) -> related_cards. Stage 09 excludes
                the same modules by name. Prose links sit inside p/li/td, so they never match
  6 body        a bare <aside> (no class/role/aria-label) inside <article>;  any other aside -> aside
  7 body        anything else inside <main>;  other: outside <main> and not matched
Class names live in the built HTML, so the card test is `.related-card`, the class RelatedArticles.tsx puts on every card.
Card modules (what renders RelatedArticles): see CARD_MODULES; the summary names them and counts links per module.

Redirects: SLUG_TO_CATEGORY_MAP, DUPLICATE_REDIRECTS (incl. the BLOG_TO_LOCATION spread) are read from middleware.ts with
the same regex idea as scripts/track2_link_audit.py extract_map_keys (copied, not imported: that file runs on import), and
the middleware order is replayed: apex host -> www (308), flat /blog/<slug> (duplicate first, then category map),
/blog/category/<x> -> /blog/<x>, nested /blog/<cat>/<slug> (duplicate, then wrong category). Hops are followed to a fixed point.
status: ok | redirect (resolves to a built route) | broken | external_asset.
"""
from __future__ import annotations

import argparse
import json
import re
from collections import Counter, defaultdict, deque
from urllib.parse import urlsplit

from lxml import html as LH

from common import REPO, load_site, script_meta, write_csv

HOSTS = {"propertytaxpartners.co.uk", "www.propertytaxpartners.co.uk"}
ASSET_EXT = {"pdf", "png", "jpg", "jpeg", "gif", "webp", "avif", "svg", "ico", "xml", "txt", "csv", "xlsx", "xls", "docx",
             "doc", "zip", "json", "mp4", "woff", "woff2", "css", "js", "map", "webmanifest", "rss", "atom"}
SKIP_SEG = {"_not-found", "api", "embed", "feed", "sitemap", "robots", "llms", "opengraph-image", "twitter-image", "icon", "apple-icon"}
BLOCKS = {"p", "li", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "td", "th", "dd", "dt", "figcaption", "pre"}
BASELINE = {"/services/property-accountant": 38, "/services/landlord-accountant": 35, "/services/property-tax-advice": 36}
EXPLAINER = "/blog/property-accountant-services/what-does-a-property-accountant-do"
EDGE_FIELDS = ["source", "target_raw", "target_final", "status", "region", "anchor_text", "rel", "position_in_body",
               "para_index", "para_total", "card_module", "redirect_reason"]
PAGE_FIELDS = ["route", "html_file", "indexable", "canonical", "title", "h1", "word_count_main", "n_out_body", "n_out_total",
               "n_in_body", "n_in_body_links", "n_in_nav", "n_in_footer", "n_in_related", "click_depth", "click_depth_body",
               "is_orphan_body"]


def ws(s: str) -> str:
    return re.sub(r"\s+", " ", s or "").strip()


# ----- middleware (copied parsing logic, see track2_link_audit.extract_map_keys) --------------------------------------

def extract_map_keys(mw: str, name: str) -> dict:
    m = re.search(r"const " + name + r":[^=]*=\s*\{(.*?)\n\};", mw, re.S)
    return dict(re.findall(r'"([^"]+)"\s*:\s*"([^"]+)"', m.group(1))) if m else {}


def load_redirects(build_dir):
    mw = (build_dir / "src" / "middleware.ts").read_text(encoding="utf-8")
    slug_cat = extract_map_keys(mw, "SLUG_TO_CATEGORY_MAP")
    dup = extract_map_keys(mw, "DUPLICATE_REDIRECTS")
    if "...BLOG_TO_LOCATION" in mw:                    # spread into DUPLICATE_REDIRECTS
        dup.update(extract_map_keys(mw, "BLOG_TO_LOCATION"))
    cfg = (build_dir / "next.config.ts").read_text(encoding="utf-8")
    conf = dict(re.findall(r'source:\s*"([^"]+)"\s*,\s*destination:\s*"([^"]+)"', cfg))
    return slug_cat, dup, conf


def mw_step(path: str, slug_cat: dict, dup: dict, conf: dict):
    """One middleware/next.config hop for a path. Returns (new_path, reason) or None."""
    if path in conf:
        return conf[path], "next_config"
    m = re.match(r"^/blog/([^/]+)$", path)
    if m:
        s = m.group(1)
        if s in dup:
            return dup[s], "duplicate"
        if s in slug_cat:
            return f"/blog/{slug_cat[s]}/{s}", "flat_to_canonical"
    m = re.match(r"^/blog/category/([^/]+)$", path)
    if m:
        return f"/blog/{m.group(1)}", "category_prefix"
    m = re.match(r"^/blog/[^/]+/([^/]+)$", path)
    if m:
        s = m.group(1)
        if s in dup:
            return dup[s], "duplicate"
        if s in slug_cat and path != f"/blog/{slug_cat[s]}/{s}":
            return f"/blog/{slug_cat[s]}/{s}", "wrong_category"
    return None


def norm_href(href: str):
    """-> (kind, path, apex). kind None = not an internal page link."""
    h = (href or "").strip()
    if not h or h.startswith(("#", "mailto:", "tel:", "javascript:", "data:", "//")) and not h.startswith("//propertytax"):
        return None, None, False
    u = urlsplit(h)
    apex = False
    if u.scheme or u.netloc:
        host = u.netloc.lower()
        if host not in HOSTS:
            return None, None, False
        apex = host == "propertytaxpartners.co.uk"
    path = u.path or "/"
    if not path.startswith("/"):
        return None, None, False                       # relative path without slash: none expected in built HTML
    if len(path) > 1:
        path = path.rstrip("/") or "/"
    return "internal", path, apex


# ----- page walking ------------------------------------------------------------------------------------------------------

def ancestors(el):
    p = el.getparent()
    while p is not None:
        yield p
        p = p.getparent()


def _sig(e):
    return (e.tag, e.get("class") or "")


# Hand-authored index grids that stage 09 reads as body (literal page.tsx data, one JSX Link per card) and the 2026-10-09
# baseline counts as body: the /services grid and the /locations city cards. Their anchors hold a heading; the calculator
# preview tiles further down /services do not. Data-driven grids (essential guides, calculators, blog index) stay listing.
AUTHORED_CARD_GRIDS = {"/services": True, "/locations": False}   # route -> the card anchor must hold a heading


def card_shaped(a, anc, route="", main_el_tags=BLOCKS) -> bool:
    """CARD_SHAPE: a link outside every text block that is one of >= 3 identical siblings, or inside a wrapper (its parent) that is.
    Two levels only (the anchor, then its card div), so repeated page sections never match."""
    for e in anc:
        if e.tag == "main":
            break
        if e.tag in main_el_tags:
            return False
    if route in AUTHORED_CARD_GRIDS and (not AUTHORED_CARD_GRIDS[route] or a.find(".//h2") is not None or a.find(".//h3") is not None):
        return False
    par = a.getparent()
    if par is not None and par.tag == "div":            # chip row: a div whose children are all links (>= 3), incl. the odd "All ..." chip
        kids = [c for c in par if isinstance(c.tag, str)]
        if sum(c.tag == "a" for c in kids) >= 3 and all(c.tag == "a" or (c.tag == "span" and c.find(".//a") is None) for c in kids):
            return True
        if "grid" in (par.get("class") or "").split() and a.getparent() is par and a.find(".//h2") is None and a.find(".//h3") is None:
            return True                                 # a tile that is a direct child of a grid, however few siblings it has
    x = a
    for _ in range(2):
        par = x.getparent()
        if par is None or par.tag == "main":
            return False
        if x.tag in ("a", "div") and sum(1 for c in par if isinstance(c.tag, str) and _sig(c) == _sig(x)) >= 3:
            return True
        x = par
    return False


def classify(a, route=""):
    """-> (region, is_card). Landmark rules, first match wins."""
    anc = list(ancestors(a))
    tags = [e.tag for e in anc]
    in_main = "main" in tags
    is_card = any("related-card" in (e.get("class") or "").split() for e in anc)
    if "header" in tags and not in_main:
        return "nav", is_card
    if "footer" in tags and not in_main:
        return "footer", is_card
    for e in anc:
        if e.tag == "nav":
            lab = (e.get("aria-label") or "").lower()
            if "readcrumb" in lab:
                return "breadcrumb", is_card
            if "contents" in lab:
                return "toc", is_card
    for e in anc:
        if e.tag == "section":
            lab = (e.get("aria-labelledby") or "").lower()
            if "related" in lab:
                return "related", is_card
            if "form" in lab:
                return "form", is_card
            if "faq" in lab:
                return "faq", is_card
    if "form" in tags:
        return "form", is_card
    for e in anc:                                       # FaqSection accordion panel (Radix): the answer is FAQ copy, not page prose
        if e.tag == "div" and e.get("role") == "region" and e.get("data-orientation"):
            return "faq", is_card
    if is_card:
        return "related_cards", True
    for e in anc:                                       # hub/index listing card: <article> that is not the page's own main > article
        if e.tag == "article" and e.getparent() is not None and e.getparent().tag != "main":
            return "listing", is_card
    if in_main:
        for e in anc:
            if e.get("aria-roledescription") == "slide" or re.fullmatch(r"\d+ of \d+", e.get("aria-label") or ""):
                return "related_cards", True            # CardCarousel slide
            if any(c.tag == "svg" and (c.get("aria-label") or "").startswith("Map of") for c in e):
                return "listing", is_card               # LocationMap pins and city list
        if card_shaped(a, anc, route):
            return "listing", is_card
    for e in anc:
        if e.tag == "aside":
            bare = not (e.get("class") or e.get("role") or e.get("aria-label") or e.get("aria-labelledby"))
            return ("body" if (bare and "article" in tags) else "aside"), is_card
    return ("body" if in_main else "other"), is_card


def anchor_text(a) -> str:
    t = ws(a.text_content())
    if not t:
        img = a.find(".//img")
        t = ws((img.get("alt") if img is not None else "") or a.get("aria-label") or a.get("title") or "")
    return t


def card_module_map(build_dir) -> dict:
    """route -> module name, from which page.tsx files render RelatedArticles directly or via TopicSection."""
    out = {}
    app = build_dir / "src" / "app"
    for f in sorted(app.rglob("page.tsx")):
        s = f.read_text(encoding="utf-8", errors="replace")
        rel = "/" + "/".join(f.relative_to(app).parts[:-1])
        if "<TopicSection" in s:
            out[rel] = "TopicSection (topic pillar pages)"
        elif "<RelatedArticles" in s:
            out[rel] = "RelatedArticles in page (services, locations, calculators, thank-you)"
    return out


def module_for(route: str, modmap: dict) -> str:
    if route in modmap:
        return modmap[route]
    for pat, name in modmap.items():                   # dynamic segments: /locations/[slug] etc.
        if "[" in pat and re.fullmatch(re.sub(r"\[[^/]+\]", "[^/]+", pat), route):
            return name
    return "unmapped"


def route_handlers(build_dir) -> set:
    """Routes served by route.ts (downloads, data): assets, not pages."""
    app = build_dir / "src" / "app"
    return {"/" + "/".join(f.relative_to(app).parts[:-1]) for f in app.rglob("route.ts")}


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--site", required=True)
    ap.add_argument("--run", required=True)
    a = ap.parse_args()
    cfg = load_site(a.site)
    build_dir = REPO / cfg["paths"]["buildDir"]
    appdir = build_dir / ".next" / "server" / "app"
    st = REPO / "docs" / a.site / "link_engine" / a.run / "stages"
    slug_cat, dup, conf = load_redirects(build_dir)
    modmap = card_module_map(build_dir)
    handlers = route_handlers(build_dir)

    # routes
    all_routes, skipped = {}, []
    for f in sorted(appdir.rglob("*.html")):
        rel = f.relative_to(appdir).as_posix()[:-5]
        route = "/" if rel == "index" else "/" + rel
        all_routes[route] = f
        segs = route.strip("/").split("/")
        if any(s in SKIP_SEG for s in segs):
            skipped.append(route)
    pages = {r: f for r, f in all_routes.items() if r not in set(skipped)}

    edges, page_info = [], {}
    for route, f in pages.items():
        root = LH.parse(str(f)).getroot()
        head = root.find("head")
        robots = " ".join((m.get("content") or "").lower() for m in root.iter("meta") if (m.get("name") or "").lower() == "robots")
        canon = next((l.get("href") for l in root.iter("link") if l.get("rel") == "canonical"), "")
        title = ws(root.findtext(".//title") or "")
        h1 = next((ws(h.text_content()) for h in root.iter("h1")), "")
        main_el = next(root.iter("main"), None)
        words = len(ws(main_el.text_content()).split()) if main_el is not None else 0
        blocks = {}
        if main_el is not None:
            blocks = {id(e): i for i, e in enumerate(e for e in main_el.iter() if e.tag in BLOCKS)}
        page_info[route] = {"html_file": f.relative_to(REPO).as_posix(), "indexable": "noindex" not in robots, "canonical": canon,
                            "title": title, "h1": h1, "words": words}
        pos = 0
        for el in root.iter("a"):
            kind, path, apex = norm_href(el.get("href"))
            if kind is None:
                continue
            region, is_card = classify(el, route)
            pidx = ""
            if main_el is not None and region in ("body", "related_cards", "related", "faq"):
                for e in [el, *ancestors(el)]:
                    if e is main_el:
                        break
                    if id(e) in blocks:
                        pidx = blocks[id(e)]
                        break
            if region == "body":
                pos += 1
            module = ""
            if is_card:
                module = ("BlogPostRenderer foot (section related-heading, blog posts)"
                          if route.startswith("/blog/") and region == "related" else module_for(route, modmap))
            edges.append({"source": route, "target_raw": el.get("href").strip(), "_path": path, "_apex": apex, "region": region,
                          "anchor_text": anchor_text(el), "rel": el.get("rel") or "", "position_in_body": pos if region == "body" else "",
                          "para_index": pidx, "para_total": len(blocks), "card_module": module})

    # resolve
    ext_re = re.compile(r"\.([A-Za-z0-9]+)$")
    for e in edges:
        path, reason = e["_path"], []
        if e["_apex"]:
            reason.append("apex_to_www")
        cur, hops = path, 0
        while hops < 6:
            s = mw_step(cur, slug_cat, dup, conf)
            if not s:
                break
            nxt, why = s
            u = urlsplit(nxt)
            if u.netloc and u.netloc.lower() not in HOSTS:
                cur = nxt
                reason.append(why)
                break
            cur = (u.path or "/").rstrip("/") or "/"
            reason.append(why)
            hops += 1
        m = ext_re.search(cur.rsplit("/", 1)[-1])
        segs = cur.strip("/").split("/")
        if cur.startswith(("http://", "https://")):
            e["target_final"], status = cur, "external_asset"
        elif (m and m.group(1).lower() in ASSET_EXT) or segs[0] in ("_next", "api", "feed", "sitemap", "robots", "llms") or cur in handlers:
            e["target_final"], status = cur, "external_asset"
        elif cur in all_routes:
            e["target_final"] = cur
            status = "redirect" if reason else "ok"
        else:
            e["target_final"], status = cur, "broken"
        e["status"], e["redirect_reason"] = status, "+".join(reason)
    # drop self links from graph counts only (kept in csv)
    good = [e for e in edges if e["status"] in ("ok", "redirect") and e["target_final"] in pages]

    # page metrics
    in_body_src, in_body_links, n_nav, n_foot, n_rel = defaultdict(set), Counter(), Counter(), Counter(), Counter()
    out_body, out_tot = Counter(), Counter()
    for e in edges:
        out_tot[e["source"]] += 1
        if e["region"] == "body":
            out_body[e["source"]] += 1
    for e in good:
        s, t = e["source"], e["target_final"]
        if s == t:
            continue
        if e["region"] == "body":
            in_body_src[t].add(s)
            in_body_links[t] += 1
        elif e["region"] == "nav":
            n_nav[t] += 1
        elif e["region"] == "footer":
            n_foot[t] += 1
        elif e["region"] in ("related", "related_cards"):
            n_rel[t] += 1

    def bfs(only_body: bool) -> dict:
        adj = defaultdict(set)
        for e in good:
            if (not only_body or e["region"] == "body") and e["source"] != e["target_final"]:
                adj[e["source"]].add(e["target_final"])
        d, q = {"/": 0}, deque(["/"])
        while q:
            u = q.popleft()
            for v in adj[u]:
                if v not in d:
                    d[v] = d[u] + 1
                    q.append(v)
        return d
    d_all, d_body = bfs(False), bfs(True)

    page_rows = []
    for r, i in sorted(page_info.items()):
        nb = len(in_body_src[r])
        page_rows.append({"route": r, "html_file": i["html_file"], "indexable": str(i["indexable"]).lower(), "canonical": i["canonical"],
                          "title": i["title"], "h1": i["h1"], "word_count_main": i["words"], "n_out_body": out_body[r],
                          "n_out_total": out_tot[r], "n_in_body": nb, "n_in_body_links": in_body_links[r], "n_in_nav": n_nav[r],
                          "n_in_footer": n_foot[r], "n_in_related": n_rel[r], "click_depth": d_all.get(r, ""),
                          "click_depth_body": d_body.get(r, ""), "is_orphan_body": str(nb == 0 and i["indexable"]).lower()})

    # summary
    reg_status = Counter((e["region"], e["status"]) for e in edges)
    regions = Counter(e["region"] for e in edges)
    statuses = Counter(e["status"] for e in edges)
    body_good = [e for e in good if e["region"] == "body" and e["source"] != e["target_final"]]

    def inbound(target):
        es = [e for e in body_good if e["target_final"] == target]
        return {"distinct_sources": len({e["source"] for e in es}), "links": len(es)}
    money = cfg["link_engine"]["money_pages"]
    money_in = {t: {**inbound(t), "baseline_links": BASELINE.get(t)} for t in money}
    exp_es = [e for e in body_good if e["target_final"] == EXPLAINER]
    # hire wording = anchor has "accountant" and any of property/landlord/specialist/hire/tax. Split: role = the anchor names the
    # role ("specialist property accountant"); descriptive = it describes what the accountant does ("what a property accountant does").
    desc_re = re.compile(r"\b(what|does|do|handles|actually|guide|overview|see|find|how|review|can|min read)\b|\?")
    hire_clear, hire_border = Counter(), Counter()
    for e in exp_es:
        t = e["anchor_text"].lower()
        if "accountant" in t and re.search(r"property|landlord|specialist|hire|tax", t):
            (hire_border if desc_re.search(t) else hire_clear)[e["anchor_text"][:90]] += 1

    def examples(status):
        c = Counter((e["source"], e["target_raw"], e["target_final"], e["redirect_reason"]) for e in edges if e["status"] == status)
        return [{"source": s, "target_raw": r, "target_final": f, "reason": why, "n": n} for (s, r, f, why), n in c.most_common(12)]
    broken_by_target = Counter(e["target_final"] for e in edges if e["status"] == "broken")
    redirect_by_reason = Counter(e["redirect_reason"] for e in edges if e["status"] == "redirect")

    def body_to_money(pred):
        out = {}
        for r in sorted(pages):
            if pred(r):
                out[r] = sorted({e["target_final"] for e in body_good if e["source"] == r and e["target_final"] in money[:3]})
        return out
    module_counts = Counter(e["card_module"] for e in edges if e["card_module"])
    mod_region = defaultdict(Counter)
    for e in edges:
        if e["card_module"]:
            mod_region[e["card_module"]][e["region"]] += 1
    summary = {
        "run": a.run, "site": a.site, "pages_parsed": len(pages), "html_files": len(all_routes), "edges_total": len(edges),
        "edges_by_region": dict(regions), "edges_by_status": dict(statuses),
        "edges_by_region_status": {f"{r}|{s}": n for (r, s), n in sorted(reg_status.items())},
        "money_pages_body_inlinks": money_in,
        "baseline_2026_10_09": {"service_pages_body_links": BASELINE, "explainer": {"links": 90, "distinct_sources": 85},
                                "hire_anchors": {"clear": 28, "borderline": 6}},
        "explainer": {"route": EXPLAINER, **inbound(EXPLAINER),
                      "hire_wording_role_noun": {"total": sum(hire_clear.values()), "anchors": dict(hire_clear.most_common())},
                      "hire_wording_descriptive": {"total": sum(hire_border.values()), "anchors": dict(hire_border.most_common())},
                      "hire_definition": "anchor has 'accountant' and any of property/landlord/specialist/hire/tax; role_noun = names the role (e.g. 'specialist property accountant'), descriptive = what/does/handles/guide/see phrasing"},
        "broken": {"count": statuses["broken"], "distinct_targets": len(broken_by_target),
                   "top_targets": broken_by_target.most_common(12), "examples": examples("broken")},
        "redirect": {"count": statuses["redirect"], "by_reason": dict(redirect_by_reason), "examples": examples("redirect")},
        "pages_to_service_pages_in_body": {
            "/locations/bristol": body_to_money(lambda r: r == "/locations/bristol"),
            "belfast_posts": body_to_money(lambda r: "belfast" in r),
            "/for/landlord-retirement-and-succession": body_to_money(lambda r: r == "/for/landlord-retirement-and-succession"),
            "note": "service pages = first three money pages; /services/non-resident-landlord excluded from this check"},
        "card_modules": {"definition": "links inside .related-card (RelatedArticles.tsx); module by renderer",
                         "links_per_module": dict(module_counts), "region_per_module": {k: dict(v) for k, v in mod_region.items()},
                         "modules": ["RelatedArticles at the blog post foot (BlogPostRenderer, section aria-labelledby=related-heading)",
                                     "RelatedArticles in page-authored sections (service pages, /locations/[slug], /calculators/[slug], /thank-you)",
                                     "TopicSection cards (RelatedArticles via relatedItemsFromLinks, on the topic pillar pages)"]},
        "orphans_body_indexable": sum(1 for r in page_rows if r["is_orphan_body"] == "true"),
        "unreachable_from_home": sum(1 for r in page_rows if r["click_depth"] == ""),
        "self_links_ignored_in_counts": sum(1 for e in edges if e["source"] == e["target_final"] and e["status"] in ("ok", "redirect")),
        "skipped_routes": {"count": len(skipped), "rule": f"any path segment in {sorted(SKIP_SEG)}", "routes": sorted(skipped)},
        "redirect_maps": {"SLUG_TO_CATEGORY_MAP": len(slug_cat), "DUPLICATE_REDIRECTS": len(dup), "next_config": conf},
        "deviations": ["<header>/<footer> count as nav/footer only outside <main>",
                       "a link inside a <form> element is region form even without a labelled section",
                       "related_cards = .related-card links not in a section labelled related; n_in_related counts both",
                       "apex-host absolute links are status redirect (reason apex_to_www)",
                       "self-links are kept in the edges csv and ignored in page in-counts and BFS"],
    }
    meta = {"source": f"{appdir.relative_to(REPO).as_posix()} + middleware.ts maps", "site": a.site, "data_through": a.run,
            "n_pages": len(pages), "skipped_routes": sorted(skipped), "card_modules": summary["card_modules"]["modules"], **script_meta()}
    write_csv(st / "08_edges_html.csv", edges, EDGE_FIELDS, meta)
    write_csv(st / "08_pages.csv", page_rows, PAGE_FIELDS, meta)
    (st / "08_summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
    print(json.dumps({k: summary[k] for k in ("pages_parsed", "edges_total", "edges_by_region", "edges_by_status",
                                                "money_pages_body_inlinks", "orphans_body_indexable")}, indent=2))


if __name__ == "__main__":
    main()
