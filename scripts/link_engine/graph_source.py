#!/usr/bin/env python3
"""Link engine Half B, stage 09: independent SOURCE-level internal-link count.

Purpose: count editorial (body) internal links straight from the repo source, with no build
and no HTML parsing, so the number can cross-check the built-HTML count (stage 08). Reads
blog markdown, src/data/audiences.ts, the location and static page templates, one level of
imported components, and the middleware redirect maps. Resolves every target to
ok | redirect | broken.
Cost: free, local files only, no network, no build. Does not import stage 08 or any other
link_engine stage; only common.py for run_dir / write_csv.

Writes <run>/stages/09_edges_source.csv (+ .meta.json), 09_edges_source_excluded.csv (links
seen in modules deliberately left out, with the module name, for method diffs) and
09_summary.json.

What counts as BODY: editorial links in page content. Left out: header, footer, breadcrumb,
TOC, sidebar CTA, related-article cards (RelatedArticles, TopicSection `links`, tool.related),
tool nav (CalculatorTabs), floating UI, form chrome, hash/tel/mailto links, and any <a> in a
string that no HTML-rendering sink would turn into a link. See MODULES below.

Usage: python scripts/link_engine/graph_source.py --site property --run 2026-10-10
"""
from __future__ import annotations

import argparse
import html as htmllib
import json
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path
from urllib.parse import urlsplit

import yaml

sys.path.insert(0, str(Path(__file__).parent))
from common import REPO, now_utc, run_dir, script_meta, write_csv  # noqa: E402

FIELDS = ["source_route", "source_file", "field", "target_raw", "target_final", "status", "anchor_text",
          "source_indexable", "line"]
EXCL_FIELDS = ["source_route", "source_file", "module", "target_raw", "target_final", "status", "anchor_text", "line"]

# Components inside <main>, how this stage treats them (also written to the summary).
EXCLUDE_TAGS = {  # links inside these are NOT body
    "Breadcrumb": "breadcrumb", "RelatedArticles": "related-article cards", "CalculatorTabs": "calculator tool nav",
    "StickyCTA": "floating CTA", "LeadCTAPanel": "lead panel (tel/mailto only)", "LeadForm": "form chrome",
    "TableOfContents": "toc", "SiteHeader": "header", "SiteFooter": "footer",
}
# Hand-authored link modules, classified by what the reader sees (the same call stage 08 makes from the built HTML):
# card grids, chip rows, maps, carousels and form chrome are navigation, not body; prose blocks and CTAs are body.
CARD_TAGS = {  # links inside these are NOT body; written to the excluded csv with the label as module
    "CardCarousel": "card component (CardCarousel)", "LocationMap": "card component (LocationMap)",
    "LocationChips": "chip row (LocationChips)", "ServiceTiers": "card component (ServiceTiers)",
    "ServiceIconGrid": "card component (ServiceIconGrid)", "CalculatorPreviewGrid": "card component (CalculatorPreviewGrid)",
    "CalculatorLinkCards": "card component (CalculatorLinkCards)",
}
CARD_IMPORTS = {  # imported components (one level deep) whose links are not body
    "BookingPicker": "form chrome (BookingPicker)",
    "DetailsForm": "form chrome (DetailsForm)", "LocationMap": "card component (LocationMap)",
    "LocationChips": "chip row (LocationChips)", "WhatWeCoverSection": "card component (WhatWeCoverSection)",
}
# BlogCategoryHub is not listed: its category chips are dynamic (no literal href) and its one literal link, the "All articles
# and guides" text link under the chips, is a body link exactly like the "View all calculators" link on /blog.
PROSE_TAGS = {"ComparisonTable", "ProblemStatement"}  # table cells and the intro CTA: body
COMPONENT_TAGS = set(CARD_TAGS) | PROSE_TAGS
BODY_HTML_TAGS = {"FaqSection", "CardStack"}
LINK_TAGS = ("InlineLink", "Link", "a")
KEY_TARGETS = ["/services/property-accountant", "/services/landlord-accountant", "/services/property-tax-advice",
               "/services/non-resident-landlord"]
EXPLAINER = "/blog/property-accountant-services/what-does-a-property-accountant-do"
HOSTS = {"propertytaxpartners.co.uk", "www.propertytaxpartners.co.uk"}


def rel(p: Path) -> str:
    return str(p.relative_to(REPO)).replace("\\", "/")


# ----- middleware + routes -------------------------------------------------

def extract_map(mw: str, name: str) -> dict:
    """Copied from scripts/track2_link_audit.py extract_map_keys."""
    m = re.search(r"const " + name + r":[^=]*=\s*\{(.*?)\n\};", mw, re.S)
    return dict(re.findall(r'"([^"]+)"\s*:\s*"([^"]+)"', m.group(1))) if m else {}


def slugify_category(c: str) -> str:
    """Mirror Property/web/src/lib/blog.ts slugifyCategory (the live route), not the track2 variant."""
    c = c.lower()
    c = re.sub(r"[()]", "", c)
    c = c.replace("&", "and")
    c = re.sub(r"\s+", "-", c)
    c = re.sub(r"--+", "-", c)
    return c.strip()


class Site:
    def __init__(self, cfg_paths: dict):
        self.web = REPO / cfg_paths["buildDir"]
        self.src = self.web / "src"
        self.app = self.src / "app"
        mw = (self.src / "middleware.ts").read_text(encoding="utf-8")
        self.slug_to_cat = extract_map(mw, "SLUG_TO_CATEGORY_MAP")
        self.dup = extract_map(mw, "DUPLICATE_REDIRECTS")
        self.blog_to_loc = extract_map(mw, "BLOG_TO_LOCATION")
        self.dup = {**self.blog_to_loc, **self.dup}  # DUPLICATE_REDIRECTS spreads BLOG_TO_LOCATION
        self.cfg_redirects: dict[str, str] = {}
        nc = self.web / "next.config.ts"
        if nc.exists():
            for s, d in re.findall(r'source:\s*"([^"]+)"\s*,\s*destination:\s*"([^"]+)"', nc.read_text(encoding="utf-8")):
                self.cfg_redirects[s] = d
        niche = json.loads((REPO / cfg_paths["siteConfigJson"]).read_text(encoding="utf-8"))
        self.niche = niche
        self.cities = [l["slug"] for l in niche.get("locations", [])]
        self.cta = niche["cta"]["variants"][niche["cta"]["variant"]]
        self.packages = niche["cta"].get("variant") == "packages" and niche["cta"].get("variants") is not None  # isPackagesMode()
        # posts
        self.posts: dict[str, dict] = {}  # stem -> info
        for f in sorted((self.web / "content" / "blog").glob("*.md")):
            fm, body = split_frontmatter(f.read_text(encoding="utf-8"))
            self.posts[f.stem] = {"file": f, "fm": fm, "body": body, "slug": str(fm.get("slug") or ""),
                                  "cat": slugify_category(str(fm.get("category") or "General"))}
        # generateStaticParams emits (cat, fm.slug); getPostBySlug reads <slug>.md, so a page needs both to agree
        self.pairs = {(p["cat"], p["slug"]) for st, p in self.posts.items() if p["slug"] == st}
        self.slug_cat = {p["slug"]: p["cat"] for st, p in self.posts.items() if p["slug"] == st}
        self.slug_mismatch = [st for st, p in self.posts.items() if p["slug"] != st]
        # routes
        self.static_routes = set()
        for pg in self.app.rglob("page.tsx"):
            r = "/" + "/".join(pg.parent.relative_to(self.app).parts)
            if "[" not in r:
                self.static_routes.add(r.rstrip("/") or "/")
        self.handlers = set()  # route handlers (CSV download, feed.xml, ...) answer 200 but are assets, not pages: stage 08 agrees
        for rt in self.app.rglob("route.ts"):
            r = "/" + "/".join(rt.parent.relative_to(self.app).parts)
            if "[" not in r and not r.startswith("/api"):
                self.handlers.add(r)
        self.handlers |= {"/sitemap.xml", "/robots.txt"}
        self.audiences = parse_audiences(self.src / "data" / "audiences.ts")
        self.aud_slugs = {a["slug"] for a in self.audiences}
        reg = (self.src / "lib" / "resources" / "registry.ts").read_text(encoding="utf-8")
        self.guide_topics = set()
        for m in re.finditer(r'guide:\s*\{\s*slug:\s*"([^"]+)"[^}]*?enabled:\s*(true|false)', reg, re.S):
            if m.group(2) == "true" and (self.web / "content" / "resources" / f"{m.group(1)}.md").exists():
                self.guide_topics.add(m.group(1))
        self.calc_slugs = set(re.findall(r'slug:\s*"([a-z0-9-]+)"', "".join(
            p.read_text(encoding="utf-8") for p in (self.src / "lib" / "calculators" / "tools").glob("*.ts"))))
        pub = self.web / "public"
        self.public = {"/" + str(p.relative_to(pub)).replace("\\", "/") for p in pub.rglob("*") if p.is_file()}

    # --- middleware (copied behaviour of Property/web/src/middleware.ts) ---
    def middleware(self, path: str) -> str | None:
        m = re.match(r"^/blog/([^/]+)$", path)
        if m:
            slug = m.group(1)
            if slug in self.dup:
                return self.dup[slug]
            if slug in self.slug_to_cat:
                return f"/blog/{self.slug_to_cat[slug]}/{slug}"
        m = re.match(r"^/blog/category/([^/]+)$", path)
        if m:
            return f"/blog/{m.group(1)}"
        m = re.match(r"^/blog/[^/]+/([^/]+)$", path)
        if m:
            slug = m.group(1)
            if slug in self.dup:
                return self.dup[slug]
            cc = self.slug_to_cat.get(slug)
            if cc and path != f"/blog/{cc}/{slug}":
                return f"/blog/{cc}/{slug}"
        return None

    def renders(self, path: str) -> bool:
        if path in self.static_routes:
            return True
        parts = path.strip("/").split("/")
        if parts[0] == "blog" and len(parts) == 3:
            return (parts[1], parts[2]) in self.pairs
        if parts[0] == "locations" and len(parts) == 2:
            return parts[1] in self.cities
        if parts[0] == "for" and len(parts) == 2:
            return parts[1] in self.aud_slugs
        if parts[0] == "resources" and len(parts) == 2:
            return parts[1] in self.guide_topics
        if parts[0] == "calculators" and len(parts) == 2:
            return parts[1] in self.calc_slugs
        return False

    def resolve(self, path: str) -> tuple[str, str, str]:
        """-> (status ok|redirect|broken, target_final, note)."""
        cur, hops, note = path, 0, ""
        while hops < 6:
            nxt = self.middleware(cur) or self.cfg_redirects.get(cur)
            if nxt is None:
                break
            nxt = re.sub(r"[?#].*$", "", nxt).rstrip("/") or "/"
            cur, hops = nxt, hops + 1
        if cur in self.handlers or cur in self.public:
            return "external_asset", cur, note
        if self.renders(cur):
            return ("ok" if hops == 0 else "redirect"), cur, note
        parts = cur.strip("/").split("/")
        if parts[0] == "blog" and len(parts) == 3 and parts[2] in self.slug_cat:
            note = f"wrong-category (file cat={self.slug_cat[parts[2]]})"
        return "broken", cur, note


def split_frontmatter(txt: str) -> tuple[dict, str]:
    parts = txt.split("---", 2)
    if len(parts) < 3:
        return {}, txt
    try:
        fm = yaml.safe_load(parts[1]) or {}
    except yaml.YAMLError:
        fm = {}
        for k in ("slug", "category", "title", "noindex"):
            m = re.search(rf"(?m)^{k}:\s*[\"']?([^\"'\n]+?)[\"']?\s*$", parts[1])
            if m:
                fm[k] = m.group(1)
    return (fm if isinstance(fm, dict) else {}), parts[2].strip()


def parse_audiences(p: Path) -> list[dict]:
    t = p.read_text(encoding="utf-8")
    i = t.index("export const audiences")
    j = t.index("[", t.index("=", i))
    depth, k, instr, esc = 0, j, False, False
    for k in range(j, len(t)):
        c = t[k]
        if instr:
            if esc:
                esc = False
            elif c == "\\":
                esc = True
            elif c == '"':
                instr = False
        elif c == '"':
            instr = True
        elif c == "[":
            depth += 1
        elif c == "]":
            depth -= 1
            if depth == 0:
                break
    raw = re.sub(r",(\s*[\]}])", r"\1", t[j:k + 1])
    return json.loads(raw)


# ----- target normalisation ------------------------------------------------

def normalise(raw: str) -> tuple[str | None, str]:
    """-> (internal path or None, skip_reason)."""
    h = htmllib.unescape(str(raw)).strip()
    if not h:
        return None, "empty"
    if h.startswith("#"):
        return None, "fragment-only"
    if re.match(r"^(mailto|tel|javascript|data|sms):", h, re.I):
        return None, "scheme"
    if h.startswith("//"):
        h = "https:" + h
    if re.match(r"^https?://", h, re.I):
        u = urlsplit(h)
        if (u.hostname or "").lower() not in HOSTS:
            return None, "external"
        h = u.path or "/"
    if not h.startswith("/"):
        return None, "relative"
    h = re.sub(r"[?#].*$", "", h)
    return (h.rstrip("/") or "/"), ""


# ----- TSX scanning helpers -------------------------------------------------

def match_close(t: str, i: int) -> int:
    """t[i] is an opening bracket; return index of its matching close (string/template aware, JSX text tolerant)."""
    pairs = {"{": "}", "(": ")", "[": "]"}
    stack, n, q = [], len(t), None
    k = i
    while k < n:
        c = t[k]
        if q:
            if c == "\\":
                k += 2
                continue
            if c == q:
                q = None
            elif q == "`" and c == "$" and t[k + 1:k + 2] == "{":
                e = match_close(t, k + 1)
                k = e + 1
                continue
        elif c in "\"'`":
            if c == "'" and k > 0 and t[k - 1].isalpha():  # apostrophe in JSX text, not a quote
                k += 1
                continue
            q = c
        elif c in pairs:
            stack.append(pairs[c])
        elif stack and c == stack[-1]:
            stack.pop()
            if not stack:
                return k
        k += 1
    return n - 1


def tag_open_end(t: str, i: int) -> int:
    """Index of '>' closing the opening tag starting at t[i]=='<' (brace and quote aware)."""
    n, k, q = len(t), i + 1, None
    while k < n:
        c = t[k]
        if q:
            if c == "\\":
                k += 2
                continue
            if c == q:
                q = None
        elif c in "\"'":
            q = c
        elif c == "{":
            k = match_close(t, k)
        elif c == ">":
            return k
        k += 1
    return n - 1


def find_close_tag(t: str, name: str, start: int) -> int:
    depth, pat = 1, re.compile(rf"<(/?){name}\b")
    for m in pat.finditer(t, start):
        if m.group(1):
            depth -= 1
            if depth == 0:
                return m.start()
        else:
            e = tag_open_end(t, m.start())
            if t[e - 1] != "/":
                depth += 1
    return -1


def line_of(t: str, pos: int) -> int:
    return t.count("\n", 0, pos) + 1


def top_consts(t: str) -> dict[str, tuple[int, int]]:
    out = {}
    for m in re.finditer(r"(?m)^(?:export\s+)?const\s+([A-Za-z_]\w*)", t):
        k, depth, q = m.end(), 0, None
        while k < len(t):
            c = t[k]
            if q:
                if c == "\\":
                    k += 2
                    continue
                if c == q:
                    q = None
                elif q == "`" and c == "$" and t[k + 1:k + 2] == "{":
                    k = match_close(t, k + 1) + 1
                    continue
            elif c in "\"'`":
                if c == "'" and t[k - 1].isalpha():
                    k += 1
                    continue
                q = c
            elif c in "{[(":
                k = match_close(t, k)
            elif c == ";" and depth == 0:
                break
            k += 1
        out[m.group(1)] = (m.start(), k)
    return out


def string_consts(t: str) -> dict[str, str]:
    env: dict[str, str] = {}
    for m in re.finditer(r"(?m)^(?:export\s+)?const\s+([A-Za-z_]\w*)(?:\s*:\s*[^=\n]+)?\s*=\s*([\"'`])", t):
        q, s = m.group(2), m.end()
        e = s
        while e < len(t) and t[e] != q:
            e += 2 if t[e] == "\\" else 1
        val = t[s:e]
        if q == "`":
            val = re.sub(r"\$\{\s*([A-Za-z_]\w*)\s*\}", lambda x: env.get(x.group(1), x.group(0)), val)
        env[m.group(1)] = val
    return env


def resolve_value(expr: str, env: dict) -> str | None:
    """Resolve a JSX attr / property value expression to a literal string, else None."""
    e = expr.strip()
    m = re.fullmatch(r"\{\s*(.*?)\s*\}", e, re.S)
    if m:
        e = m.group(1)
    if re.fullmatch(r"[A-Za-z_]\w*", e):
        return env.get(e)
    m = re.fullmatch(r"(?s)([\"'`])(.*)\1", e)
    if not m:
        return None
    val = m.group(2)
    if m.group(1) == "`":
        def sub(x):
            return env.get(x.group(1), "\x00")
        val = re.sub(r"\$\{\s*([A-Za-z_]\w*)\s*\}", sub, val)
        if "$" in val and "{" in val or "\x00" in val:
            return None
    return val


def clean_anchor(s: str, env: dict) -> str:
    s = re.sub(r"\{\s*([\"'])\s*\1\s*\}", " ", s)
    s = re.sub(r"\{\s*[\"'`]([^\"'`]*)[\"'`]\s*\}", r"\1", s)
    s = re.sub(r"\$?\{\s*([A-Za-z_]\w*)\s*\}", lambda m: env.get(m.group(1), ""), s)
    s = re.sub(r"\{[^{}]*\}", " ", s)
    s = re.sub(r"<[^>]+>", " ", s)
    s = htmllib.unescape(s.replace("\\\"", '"'))
    return re.sub(r"\s+", " ", s).strip()


def attr_value(attrs: str, name: str) -> tuple[bool, str | None]:
    """Find `name=` in an attribute string; return (present, raw value expression)."""
    m = re.search(rf"(?<![\w-]){name}\s*=\s*", attrs)
    if not m:
        return False, None
    i = m.end()
    if attrs[i] == "{":
        return True, attrs[i:match_close(attrs, i) + 1]
    if attrs[i] == "\\" and attrs[i + 1:i + 2] == '"':
        e = attrs.index('\\"', i + 2)
        return True, '"' + attrs[i + 2:e] + '"'
    if attrs[i] in "\"'":
        e = attrs.index(attrs[i], i + 1)
        return True, attrs[i:e + 1]
    return True, None


class Scanner:
    """Finds every link occurrence in one TSX source string and classifies it by sink."""

    def __init__(self, text: str, cities: list[str], cta: dict, extra_env: dict | None = None, packages: bool = False):
        self.t, self.cities, self.cta, self.packages = text, cities, cta, packages
        self.env = {**(extra_env or {}), **string_consts(text)}
        self.consts = top_consts(text)
        self.spans: list[tuple[int, int, str, str]] = []  # (start, end, tag, openingtag text)
        self._spans()
        self.cache: dict[str, tuple] = {}
        self.comments = [(m.start(), m.end()) for m in re.finditer(r"/\*.*?\*/|(?m:^[ \t]*//[^\n]*)", text, re.S)]

    def in_comment(self, pos: int) -> bool:
        return any(s <= pos < e for s, e in self.comments)

    # --- spans of tags / props that decide a link's sink
    def _spans(self):
        t = self.t
        names = set(EXCLUDE_TAGS) | COMPONENT_TAGS | BODY_HTML_TAGS
        for m in re.finditer(r"<([A-Z]\w*)\b", t):
            name = m.group(1)
            if name not in names:
                continue
            e = tag_open_end(t, m.start())
            opening = t[m.start():e + 1]
            if t[e - 1] == "/":
                end = e + 1
            else:
                c = find_close_tag(t, name, e)
                end = (t.index(">", c) + 1) if c >= 0 else e + 1
            self.spans.append((m.start(), end, name, opening))
        for m in re.finditer(r"\blinks=\{", t):
            self.spans.append((m.start(), match_close(t, m.end() - 1) + 1, "TopicSection.links", ""))
        if not self.packages:  # `isPackagesMode(niche) ? (<...>) : ...` branch is not in the build when the site is not in packages mode
            for m in re.finditer(r"isPackagesMode\([^)]*\)\s*\?\s*\(", t):
                self.spans.append((m.start(), match_close(t, m.end() - 1) + 1, "packages-only", ""))
        for m in re.finditer(r"relatedItemsFromLinks\(", t):
            self.spans.append((m.start(), match_close(t, m.end() - 1) + 1, "RelatedArticles", ""))
        for m in re.finditer(r"(?:JSON\.stringify|buildFaqPageJsonLd|buildFaqPage|buildService)\(", t):
            self.spans.append((m.start(), match_close(t, m.end() - 1) + 1, "json-ld", ""))

    def sink_at(self, pos: int, skip_const: str | None = None) -> tuple:
        """-> (kind, detail): excl|comp|faq|ignore|body."""
        best = None
        for s, e, tag, opening in self.spans:
            if s <= pos < e and (best is None or s >= best[0]):
                best = (s, e, tag, opening)
        if best:
            _, _, tag, opening = best
            if tag in EXCLUDE_TAGS or tag == "TopicSection.links" or tag == "RelatedArticles":
                return ("excl", EXCLUDE_TAGS.get(tag, tag))
            if tag == "json-ld":
                return ("ignore", "json-ld")
            if tag == "packages-only":
                return ("ignore", "packages-only")
            if tag == "FaqSection":
                return ("faq", "html" if re.search(r"\bhtml\b(?!\w)", opening) else "text")
            if tag == "CardStack":
                return ("body", "html" if re.search(r"\bhtml\b", opening) else "text")
            return ("comp", tag)
        for name, (s, e) in self.consts.items():
            if s <= pos <= e and name != skip_const:
                return self.const_class(name)
        return ("body", "")

    def const_class(self, name: str, depth: int = 0) -> tuple:
        if name in self.cache:
            return self.cache[name]
        self.cache[name] = ("body", "cycle")
        s, e = self.consts[name]
        if re.search(r"(?i)(jsonld|schema)$", name):
            self.cache[name] = ("ignore", "json-ld")
            return self.cache[name]
        classes = []
        for m in re.finditer(rf"(?<![\w.]){re.escape(name)}\b(?!\s*[:=]\s*[\"'`{{\[])", self.t):
            if s <= m.start() <= e or self.in_comment(m.start()):  # a name mentioned in a comment is not a usage
                continue
            classes.append(self.sink_at(m.start(), skip_const=name))
        live = [c for c in classes if c[0] not in ("ignore", "excl")]
        if not classes:
            res = ("body", "no-usage-in-file")
        elif not live:
            ex = [c for c in classes if c[0] == "excl"]
            res = ex[0] if ex else ("ignore", "json-ld")
        else:
            order = {"body": 0, "comp": 1, "faq": 2}
            res = sorted(live, key=lambda c: order.get(c[0], 3))[0]
        self.cache[name] = res
        return res

    # --- occurrences
    def occurrences(self):
        t, env = self.t, self.env
        out = []  # (pos, kind, raw_expr, resolved or None, anchor)
        for m in re.finditer(r"<(InlineLink|Link|a)\b", t):
            name = m.group(1)
            e = tag_open_end(t, m.start())
            attrs = t[m.end():e]
            present, val = attr_value(attrs, "href")
            if not present:
                continue
            anchor = ""
            if t[e - 1] != "/":
                c = find_close_tag(t, name, e)
                if c < 0 and name == "a":
                    c = t.find("</a>", e)
                if c >= 0:
                    anchor = clean_anchor(t[e + 1:c], env)
            out.append((m.start(), "jsx", val, resolve_value(val, env) if val else None, anchor))
        for m in re.finditer(r"(?<![\w.])href\s*:\s*", t):
            i = m.end()
            if t[i] not in "\"'`" and not re.match(r"[A-Za-z_]", t[i]):
                continue
            if t[i] in "\"'`":
                q, e = t[i], i + 1
                while e < len(t) and t[e] != q:
                    if q == "`" and t[e] == "$" and t[e + 1] == "{":
                        e = match_close(t, e + 1)
                    e += 2 if t[e] == "\\" else 1
                val = t[i:e + 1]
            else:
                m2 = re.match(r"[A-Za-z_][\w.\[\]]*", t[i:])
                val = m2.group(0)
            # enclosing object for the label
            anchor = ""
            ob = self._enclosing_obj(m.start())
            if ob:
                seg = t[ob[0]:ob[1]]
                am = re.search(r"\b(?:label|anchor|linkLabel|title|text)\s*:\s*([\"'`])((?:\\.|(?!\1).)*)\1", seg, re.S)
                if am:
                    anchor = clean_anchor(am.group(2), env)
            out.append((m.start(), "prop", val, resolve_value(val, env), anchor))
        # <a href=\"..\"> inside strings is already caught by the jsx pass via attr_value's escaped form;
        for m in re.finditer(r"\]\((/[^)\s]+)\)", t):
            out.append((m.start(), "md", m.group(1), m.group(1), ""))
        return [o for o in out if not self.in_comment(o[0])]

    def _enclosing_obj(self, pos: int):
        t, depth, k = self.t, 0, pos
        while k > 0:
            k -= 1
            if t[k] == "}":
                depth += 1
            elif t[k] == "{":
                if depth == 0:
                    return (k, match_close(t, k) + 1)
                depth -= 1
        return None


def expand_dynamic(raw: str | None, cities: list[str], cta: dict) -> list[tuple[str, str]] | None:
    """Known dynamic hrefs -> [(path, anchor)]; None when unknown."""
    if not raw:
        return None
    if "/locations/${" in raw or "locationHref(" in raw:
        return [(f"/locations/{c}", c.capitalize()) for c in cities]
    m = re.fullmatch(r"\{?\s*activeCta\.([\w.]+)\s*\}?", raw.strip())
    if m:
        cur = cta
        for k in m.group(1).split("."):
            cur = cur.get(k) if isinstance(cur, dict) else None
        if isinstance(cur, str):
            return [(cur, "")]
    return None


# ----- edge assembly ------------------------------------------------------------

class Edges:
    def __init__(self, site: Site):
        self.site = site
        self.rows: list[dict] = []
        self.excluded: list[dict] = []
        self.diag = Counter()
        self.dynamic: list[dict] = []

    def add(self, route, file, field, raw_target, anchor, indexable, line, module=None):
        path, why = normalise(raw_target)
        if path is None:
            self.diag[f"skipped_{why}"] += 1
            return
        status, final, note = self.site.resolve(path)
        if module:
            self.excluded.append({"source_route": route, "source_file": file, "module": module, "target_raw": raw_target,
                                  "target_final": final, "status": status, "anchor_text": anchor, "line": line})
            return
        self.rows.append({"source_route": route, "source_file": file, "field": field, "target_raw": raw_target,
                          "target_final": final, "status": status, "anchor_text": anchor,
                          "source_indexable": indexable, "line": line, "_path": path, "_note": note})

    def html_links(self, route, file, field, html_text, indexable, line=0, module=None):
        for m in re.finditer(r"<a\s([^>]*?)>(.*?)</a>", html_text, re.S | re.I):
            hm = re.search(r"""href\s*=\s*(?:"([^"]*)"|'([^']*)')""", m.group(1), re.I)
            if not hm:
                continue
            href = hm.group(1) if hm.group(1) is not None else hm.group(2)
            anchor = re.sub(r"\s+", " ", htmllib.unescape(re.sub(r"<[^>]+>", " ", m.group(2)))).strip()
            self.add(route, file, field, href, anchor, indexable, line or html_text.count("\n", 0, m.start()) + 1, module)
        # markdown link syntax inside an HTML body prints as literal text, so it is not a link
        self.diag["markdown_syntax_in_html_not_rendered"] += len(re.findall(r"\[[^\]]*\]\(/[^)\s]+\)", html_text))


# ----- sources -------------------------------------------------------------------

def do_blog(site: Site, ed: Edges):
    for stem, p in site.posts.items():
        fm, body, f = p["fm"], p["body"], rel(p["file"])
        route = f"/blog/{p['cat']}/{p['slug']}"
        indexable = not bool(fm.get("noindex")) and str(fm.get("robots", "")).lower().find("noindex") < 0
        body_wo = body
        ed.html_links(route, f, "body", body_wo, indexable)
        for fq in (fm.get("faqs") or []):
            if isinstance(fq, dict) and fq.get("answer"):
                ed.html_links(route, f, "faq", str(fq["answer"]), indexable)
        # summary renders as a text <p>, howToSteps only feeds JSON-LD: nothing there is a rendered link
        if re.search(r"<a\s", str(fm.get("summary") or "")):
            ed.diag["blog_summary_links_not_rendered"] += 1
        for st in (fm.get("howToSteps") or []):
            if isinstance(st, dict) and re.search(r"<a\s", str(st.get("text") or "")):
                ed.diag["blog_howto_links_not_rendered"] += 1


def do_audiences(site: Site, ed: Edges):
    f = rel(site.src / "data" / "audiences.ts")
    for a in site.audiences:
        route = f"/for/{a['slug']}"
        ed.html_links(route, f, "body", a.get("intro", ""), True)  # standfirst via dangerouslySetInnerHTML
        for sec in ("challenges", "howWeHelp"):  # CardStack html
            for it in a.get(sec, []):
                ed.html_links(route, f, "body", it.get("body", ""), True)
        for fq in a.get("faqs", []):  # FaqSection html
            ed.html_links(route, f, "faq", fq.get("answer", ""), True)


def do_locations(site: Site, ed: Edges):
    p = site.app / "locations" / "[slug]" / "page.tsx"
    t = p.read_text(encoding="utf-8")
    f = rel(p)
    lines = {}
    blk = t[t.index("const cityServiceLine"):]
    blk = blk[:blk.index("\n};")]
    for m in re.finditer(r"(\w+):\s*\{\s*before:\s*\"([^\"]*)\",\s*anchor:\s*\"([^\"]*)\",\s*href:\s*\"([^\"]*)\"", blk):
        lines[m.group(1)] = (m.group(3), m.group(4), line_of(t, t.index(m.group(0))))
    cta = re.search(r'<Link href="(/[^"]+)"[^>]*>\s*([^<]+?)\s*</Link>', t)
    # cityContent strings render as text, so any <a> in them is not a link; count them to be sure
    ed.diag["location_cityContent_anchor_strings"] = len(re.findall(r"<a\s|\]\(/", t[:t.index("const cityServiceLine")]))
    for city in site.cities:
        route = f"/locations/{city}"
        if city in lines:
            anchor, href, ln = lines[city]
            ed.add(route, f, "template", href, anchor, True, ln)
        if cta:
            ed.add(route, f, "template", cta.group(1), cta.group(2), True, line_of(t, cta.start()))
        # RelatedArticles at the foot is dynamic (posts matched on the city) and is a card module: excluded


def do_calculator_tools(site: Site, ed: Edges):
    """Generic calculator pages render tool.related through RelatedArticles (cards): excluded, listed for diffs.
    Their explainer paragraphs and FAQ answers print as text, so they carry no links."""
    for p in sorted((site.src / "lib" / "calculators" / "tools").glob("*.ts")):
        t = p.read_text(encoding="utf-8")
        sm = re.search(r'\bslug:\s*"([a-z0-9-]+)"', t)
        if not sm:
            continue
        sc = Scanner(t, site.cities, site.cta)
        for pos, kind, raw, val, anchor in sc.occurrences():
            if val:
                ed.add(f"/calculators/{sm.group(1)}", rel(p), "", val, anchor, True, line_of(t, pos), module="related-article cards (tool.related)")


def do_resources(site: Site, ed: Edges):
    for topic in sorted(site.guide_topics):
        p = site.web / "content" / "resources" / f"{topic}.md"
        fm, body = split_frontmatter(p.read_text(encoding="utf-8"))
        ed.html_links(f"/resources/{topic}", rel(p), "body", body, False)
    pg = site.app / "resources" / "[topic]" / "page.tsx"
    for topic in sorted(site.guide_topics):  # the CTA to /contact in the aside: sidebar CTA, not body (stage 08 region aside)
        ed.add(f"/resources/{topic}", rel(pg), "template", "/contact", "Talk to a specialist", False, 0,
               module="sidebar CTA (aside)")


def import_map(t: str) -> dict[str, str]:
    out = {}
    for m in re.finditer(r"import\s+(?:type\s+)?([^;]*?)\s+from\s+[\"'](@/components/[^\"']+)[\"']", t, re.S):
        spec, path = m.group(1), m.group(2)
        for n in re.findall(r"[A-Za-z_]\w*", re.sub(r"\bas\b", " ", spec.replace("type ", ""))):
            out[n] = path
    return out


def export_body(t: str, name: str) -> str:
    m = re.search(rf"export\s+(?:default\s+)?function\s+{name}\b", t)
    if not m:
        return t
    po = t.index("(", m.end())
    pc = match_close(t, po)
    bo = t.index("{", pc)
    return t[m.start():match_close(t, bo) + 1]


def scan_tsx(site: Site, ed: Edges, text: str, route: str, file: str, indexable: bool, default_field: str,
             comps_used: dict | None = None, module: str | None = None):
    sc = Scanner(text, site.cities, site.cta, packages=site.packages)
    for pos, kind, raw, val, anchor in sc.occurrences():
        ln = line_of(text, pos)
        sink = sc.sink_at(pos)
        k, detail = sink
        targets: list[tuple[str, str]] = []
        if val is None:
            ex = expand_dynamic(raw, site.cities, site.cta)
            if ex:
                targets = ex
            elif raw and re.fullmatch(r"\{?\s*[A-Za-z_][\w.\[\]]*\s*\}?", raw.strip()):
                ed.diag["dynamic_member_ref_fed_by_data_arrays"] += 1
                continue
            else:
                ed.dynamic.append({"file": file, "line": ln, "expr": (raw or "")[:80]})
                continue
        else:
            targets = [(val, anchor)]
        for tgt, anc in targets:
            if k == "ignore":
                ed.diag["ignored_json_ld" if detail == "json-ld" else "ignored_" + detail.replace("-", "_")] += 1
                continue
            if module:  # whole imported component is a card/chip/form module
                ed.add(route, file, default_field, tgt, anc, indexable, ln, module=module)
                continue
            if "post.categorySlug" in (raw or ""):
                ed.add(route, file, default_field, tgt, anc, indexable, ln, module="latest-posts cards (dynamic)")
                continue
            if k == "excl":
                ed.add(route, file, default_field, tgt, anc, indexable, ln, module=detail)
            elif k == "faq":
                if detail == "text":  # FaqSection without `html` prints the string, so no link exists
                    ed.diag["links_in_text_only_faq_not_rendered"] += 1
                else:
                    ed.add(route, file, "faq", tgt, anc, indexable, ln)
            elif k == "comp":
                if detail in CARD_TAGS:
                    ed.add(route, file, default_field, tgt, anc, indexable, ln, module=CARD_TAGS[detail])
                else:
                    ed.add(route, file, default_field, tgt, anc, indexable, ln)
            else:
                ed.add(route, file, default_field, tgt, anc, indexable, ln)
    # html-string links inside FaqSection data: only real links when the sink has `html`
    # (handled above: jsx pass parses <a href=\"..\"> inside strings; text-only sinks are re-checked here)
    return sc


def do_static_pages(site: Site, ed: Edges):
    skip_prefix = ("api", "embed")
    comp_cache: dict[tuple[str, str], str] = {}
    for pg in sorted(site.app.rglob("page.tsx")):
        r = "/" + "/".join(pg.parent.relative_to(site.app).parts)
        r = r.rstrip("/") or "/"
        if "[" in r or r.split("/")[1:2] and r.split("/")[1] in skip_prefix:
            continue
        t = pg.read_text(encoding="utf-8")
        f = rel(pg)
        indexable = not re.search(r"index:\s*false|noindex", t)
        sc = scan_tsx(site, ed, t, r, f, indexable, "body")
        # one level into imported components that are actually rendered in the page, outside excluded spans
        imports = import_map(t)
        for name, imp in imports.items():
            if name in EXCLUDE_TAGS:
                continue
            for m in re.finditer(rf"<{name}\b", t):
                if sc.sink_at(m.start())[0] == "excl":
                    continue
                cp = site.src / (imp.replace("@/", "") + ".tsx")
                if not cp.exists():
                    continue
                ctext = cp.read_text(encoding="utf-8")
                if not re.search(r"href|<a\s|\]\(/", ctext):
                    break
                body = export_body(ctext, name)
                key = (f, name)
                if key in comp_cache:
                    break
                comp_cache[key] = rel(cp)
                if name in CARD_IMPORTS:
                    scan_tsx(site, ed, body, r, rel(cp), indexable, "body", module=CARD_IMPORTS[name])
                else:                                      # prose / CTA component: its links are body links of the page
                    scan_tsx(site, ed, body, r, rel(cp), indexable, "body")
                break


# ----- summary -------------------------------------------------------------------

def anchor_class(a: str) -> str:
    """Hire wording into the explainer. Needs "accountant" plus property/landlord/specialist/tax.
    clear = bare noun phrase that reads as a hire ("specialist property accountant");
    borderline = a verb lead-in ("see how a property accountant ...", "find out how ...", "conversation with ...");
    informational = names the explainer's own topic ("what a property accountant does", "guide", "overview")."""
    a = a.lower().strip()
    if "accountant" not in a or not re.search(r"property|landlord|specialist|tax", a):
        return ""
    if re.search(r"\bwhat\b|guide|overview|services?:|core services|responsibilities", a):
        return "informational"
    if re.match(r"(see|find out|read|learn|conversation|how)\b", a) or " how " in a:
        return "borderline"
    return "clear"


def inlinks(rows, target, pred):
    sel = [r for r in rows if r["target_final"] == target and pred(r) and r["source_route"] != target]
    return {"links": len(sel), "sources": len({r["source_route"] for r in sel}),
            "sources_indexable_only": len({r["source_route"] for r in sel if r["source_indexable"]})}


def build_summary(site: Site, ed: Edges, args) -> dict:
    rows = ed.rows
    by_field = Counter(r["field"] for r in rows)
    by_status = Counter(r["status"] for r in rows)
    by_fs: dict[str, dict] = defaultdict(dict)
    for (f, s), n in sorted(Counter((r["field"], r["status"]) for r in rows).items()):
        by_fs[f][s] = n
    body = lambda r: r["field"] == "body"  # noqa: E731
    body_faq = lambda r: r["field"] in ("body", "faq")  # noqa: E731
    body_tpl = lambda r: r["field"] in ("body", "template")  # noqa: E731
    body_comp = lambda r: r["field"] == "body" or r["field"].startswith(("component:", "template"))  # noqa: E731
    all_f = lambda r: True  # noqa: E731
    targets = KEY_TARGETS + [EXPLAINER]
    il = {t: {"body_excl_faq": inlinks(rows, t, body), "body_plus_faq": inlinks(rows, t, body_faq),
              "body_plus_template_excl_faq": inlinks(rows, t, body_tpl),
              "body_plus_faq_components_template": inlinks(rows, t, all_f),
              "body_plus_components_template_excl_faq": inlinks(rows, t, body_comp)} for t in targets}
    hire = {}
    for label, pred in (("body_excl_faq", body), ("body_plus_faq", body_faq)):
        sel = [r for r in rows if r["target_final"] == EXPLAINER and pred(r) and r["source_route"] != EXPLAINER]
        by = {c: [r for r in sel if anchor_class(r["anchor_text"]) == c] for c in ("clear", "borderline", "informational")}
        hire[label] = {"links_into_explainer": len(sel),
                       "any_accountant_plus_property_landlord_specialist_tax": sum(len(v) for v in by.values()),
                       **{c: len(v) for c, v in by.items()},
                       "clear_sources": len({r["source_route"] for r in by["clear"]}),
                       **{f"{c}_anchors": dict(Counter(r["anchor_text"].lower() for r in v).most_common()) for c, v in by.items()}}
    broken = [{"source_route": r["source_route"], "source_file": r["source_file"], "line": r["line"], "field": r["field"],
               "target_raw": r["target_raw"], "target_final": r["target_final"], "anchor_text": r["anchor_text"],
               "note": r["_note"]} for r in rows if r["status"] == "broken"]
    wrong = []
    for r in rows:
        parts = r["_path"].strip("/").split("/")
        if len(parts) == 3 and parts[0] == "blog" and parts[2] in site.slug_cat and parts[1] != site.slug_cat[parts[2]]:
            mw = site.middleware(r["_path"])
            wrong.append({"source_route": r["source_route"], "field": r["field"], "target_raw": r["target_raw"],
                          "correct_category": site.slug_cat[parts[2]], "middleware_covers": bool(mw),
                          "middleware_target": mw or "", "status": r["status"], "line": r["line"],
                          "source_file": r["source_file"]})
    mods = Counter(e["module"] for e in ed.excluded)
    return {
        "site": args.site, "run": args.run, "generated": now_utc(),
        "edges": len(rows), "excluded_edges": len(ed.excluded),
        "by_field": dict(by_field), "by_status": dict(by_status), "by_field_status": by_fs,
        "excluded_by_module": dict(mods),
        "inlinks_by_target_final": il,
        "explainer_hire_anchors": hire,
        "broken": broken,
        "wrong_category": {"total": len(wrong), "by_field": dict(Counter(w["field"] for w in wrong)),
                           "covered_by_middleware": sum(w["middleware_covers"] for w in wrong),
                           "links": wrong},
        "self_links": sum(1 for r in rows if r["source_route"] == r["target_final"]),
        "diagnostics": dict(ed.diag),
        "unresolved_dynamic_hrefs": ed.dynamic,
        "corpus": {"blog_posts": len(site.posts), "blog_slug_filename_mismatch": site.slug_mismatch,
                   "audiences": len(site.audiences), "cities": len(site.cities), "static_routes": len(site.static_routes),
                   "resource_guides": sorted(site.guide_topics),
                   "middleware_maps": {"SLUG_TO_CATEGORY_MAP": len(site.slug_to_cat),
                                       "DUPLICATE_REDIRECTS": len(site.dup), "BLOG_TO_LOCATION": len(site.blog_to_loc),
                                       "next_config_redirects": site.cfg_redirects}},
        "modules": {"counted_as_body": "page JSX and page-level data (InlineLink, Link, a, href: props), blog markdown body, "
                                       "audiences intro/challenges/howWeHelp, rendered resource guides",
                    "counted_as_faq": "blog frontmatter faqs[].answer, audiences faqs[].answer, FaqSection data (html sinks only)",
                    "counted_as_component": sorted(f.split(":", 1)[1] for f in by_field if f.startswith("component:")),
                    "component_tags_recognised_as_card_modules": sorted(COMPONENT_TAGS),
                    "counted_as_template": "location template (cityServiceLine, /contact CTA), resources aside CTA",
                    "excluded": EXCLUDE_TAGS | {"TopicSection.links": "related-article cards via RelatedArticles",
                                                "relatedItemsFromLinks": "related-article cards",
                                                "latest-posts cards": "home page dynamic post list"}},
    }


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--site", default="property")
    ap.add_argument("--run", required=True)
    args = ap.parse_args()
    cfg = json.loads((REPO / "sites" / f"{args.site}.json").read_text(encoding="utf-8-sig"))
    site = Site(cfg["paths"])
    ed = Edges(site)
    do_blog(site, ed)
    do_audiences(site, ed)
    do_locations(site, ed)
    do_resources(site, ed)
    do_calculator_tools(site, ed)
    do_static_pages(site, ed)

    stages = run_dir(args.site, args.run) / "stages"
    meta = {"source": "source-level scan: blog markdown, audiences.ts, TSX pages and one level of components, middleware.ts",
            "site": args.site, "data_through": args.run, **script_meta()}
    write_csv(stages / "09_edges_source.csv", ed.rows, FIELDS, meta)
    write_csv(stages / "09_edges_source_excluded.csv", ed.excluded, EXCL_FIELDS, {**meta, "note": "links in modules not counted as body"})
    summary = build_summary(site, ed, args)
    (stages / "09_summary.json").write_text(json.dumps(summary, indent=2, default=str), encoding="utf-8")
    print(f"edges {len(ed.rows)} (excluded {len(ed.excluded)}); by_field {summary['by_field']}; by_status {summary['by_status']}")
    for t, v in summary["inlinks_by_target_final"].items():
        print(f"  {t}: body {v['body_excl_faq']['links']}/{v['body_excl_faq']['sources']} | +template {v['body_plus_template_excl_faq']['links']}"
              f" | +faq {v['body_plus_faq']['links']}/{v['body_plus_faq']['sources']}")


if __name__ == "__main__":
    main()
