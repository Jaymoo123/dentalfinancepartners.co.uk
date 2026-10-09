#!/usr/bin/env python3
"""
Deterministic verification of a Property service page, run on the RENDERED page.

Blueprint: docs/property/commercial_recovery_2026-10-07/SERVICE_PAGES_BLUEPRINT_2026-10-09.md
section 12.2. The twenty checks there are numbered the same here so a reviewer can
cite "check 11" and mean one thing.

Why the rendered page and not the .tsx source: the HTML in
Property/web/.next/server/app/services/<slug>.html is what a fetcher without
JavaScript receives (Bing, the AI crawlers, curl) and what Google renders from.
Checking the source would pass a page whose copy never reaches the HTML.

Stdlib only, plus the matcher from scripts/track2_query_coverage.py so the
coverage floor here and the blog floor agree on what "placed" means.

Usage (from the repo root):
    python scripts/service_page_verify.py --slug property-accountant
    python scripts/service_page_verify.py --slug landlord-accountant --html path/to/page.html
    python scripts/service_page_verify.py --selftest

Exit code 1 when any check is BLOCK, else 0. The report is Markdown, one row per
check, with every WARN/BLOCK quoting the offending text and the heading it sits
under.
"""
from __future__ import annotations

import argparse
import csv
import datetime as dt
import gzip
import html as htmllib
import json
import pathlib
import re
import sys
from collections import Counter, defaultdict
from html.parser import HTMLParser

ROOT = pathlib.Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from track2_query_coverage import classify_query, content_terms  # noqa: E402

DOCS = ROOT / "docs/property/commercial_recovery_2026-10-07"
BUILD_APP = ROOT / "Property/web/.next/server/app"
SITE = "https://www.propertytaxpartners.co.uk"
BRAND_SUFFIX = " | Property Tax Partners"
SERVICE_SLUGS = ("property-accountant", "landlord-accountant", "property-tax-advice")
CITY_PAGES = ("/locations/london", "/locations/manchester", "/locations/birmingham", "/locations/leeds", "/locations/bristol")
PILLAR_GUIDES = ("/landlord-tax", "/section-24", "/incorporation", "/making-tax-digital-landlords",
                 "/leasehold", "/landed-estates", "/landlord-compliance", "/cost-of-selling-a-property",
                 "/property-tax-rates")
# R27: the only contact facts a page may carry.
CONTACT_WHITELIST = ("+44 7723 568557", "umair@propertytaxpartners.co.uk")
# Sections rendered by shared components (testimonials, the lead panel, the
# calculator tabs): pre-existing firm claims and identical boilerplate on every
# page. Excluded from the deferred-facts scope (check 8) and the sameness scope
# (check 11); their headings are listed in the report so nothing is hidden.
SHARED_CLAIM_SECTIONS = re.compile(
    r"what landlords say|book your free consultation|talk to a|speak to an|get specialist|"
    r"put numbers on it|work out your own numbers|run the numbers|calculator", re.I)
# A pound figure is a deferred fact only when it is a FEE; tax thresholds and worked
# examples are house positions, not R7 facts.
FEE_CONTEXT = re.compile(r"\b(our fees?|fees? (?:of|from|start|are|is)|price[sd]?|pricing|we charge|charges? (?:from|start)|per month|a month|plans? (?:start|from)|from £|quoted? (?:at|of) £)\b", re.I)

AI_TELLS = [
    "delve", "navigate the complexities", "in today's", "it's important to note", "it is important to note",
    "look no further", "seamless", "tailored solutions", "unlock", "elevate", "robust", "leverage",
    "whether you're a", "whether you are a", "the answer is", "in conclusion", "game-changer", "cutting-edge",
    "holistic", "streamline", "synergy", "empower", "ever-evolving", "landscape of",
]
DEFERRED_PATTERNS = [
    (r"\b(?:\+?44\s?\d{2,4}|0\d{2,4})[\s-]?\d{3,4}[\s-]?\d{3,4}\b", "phone number"),
    (r"£\s?\d", "pound figure in a fee context"),
    (r"\b(?:mon|tue|wed|thu|fri|sat|sun)(?:day)?\b[^.]{0,40}\b\d{1,2}(?::\d{2})?\s?(?:am|pm)\b", "opening hours"),
    (r"\b\d{1,2}\s?(?:am|pm)\s?(?:to|-|–)\s?\d{1,2}\s?(?:am|pm)\b", "opening hours"),
    (r"\bguarantee[ds]?\b", "guarantee"),
    (r"\bwithin 24 hours\b|\b24-hour\b|\b24hr\b|\b24 hour\b", "response-time claim"),
    (r"\bevery client\b", "every-client claim"),
    (r"\bfixed annual fee\b", "fee wording outside the allowed form"),
    (r"\bin writing\b", "fee-in-writing claim"),
    (r"\blandlords only\b|\bentire practice\b|\bonly work with landlords\b", "landlords-only claim"),
    (r"(?-i:\b(?:ICAEW|ACCA|CIOT|ATT|AAT|STEP)\b)", "professional-body claim"),  # case-sensitive: "step by step" is not STEP
]
# "Section 24" is the name landlords use for the finance-cost restriction (the site's own guide is /section-24), so it is not a citation.
STATUTE_RE = re.compile(r"\b(?:s\.\s?\d+[A-Z]?|section\s+(?!24\b)\d+[A-Z]?|sch(?:edule)?\.?\s+\d+|FA\s?\d{4}|ITTOIA|TCGA|ITA\s?2007|IHTA|CTA\s?20\d\d|para(?:graph)?\s+\d+)\b", re.I)
JARGON = ("chargeable", "disposal", "reducer", "mandation", "apportion", "enveloped", "relievable", "quantum",
          "consideration", "notifiable", "allowable", "deductible", "domicile", "situs", "remittance")
SPEC_FILE = DOCS / "REGISTER_TARGETS_2026-10.json"  # measured targets (spec section 1); used when present
SPEC_DEFAULT = {  # interim targets, blueprint 12.1; the measured file above overrides them
    "words": [1300, 2400], "sentence_len": [14, 24], "flesch": [35, 60], "question_headings_pct": [20, 35],
    "you_per_1k": [25, 60], "we_per_1k": [8, 14], "statute_per_1k": [0, 2], "jargon_per_1k": [0, 2],
}


# --------------------------------------------------------------------------- #
# HTML extraction                                                               #
# --------------------------------------------------------------------------- #
class _Extract(HTMLParser):
    """Pull title, meta description, headings, paragraphs, links, JSON-LD and the
    text of <main> (scripts, styles, nav, header, footer stripped) from one page."""

    SKIP = {"script", "style", "noscript", "svg", "template"}

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title = ""
        self.meta_description = ""
        self.jsonld: list[str] = []
        self.headings: list[dict] = []   # {level, text, id, index}
        self.paragraphs: list[str] = []  # <p> texts inside main
        self.main_links: list[tuple[str, str]] = []  # (href, anchor text) inside main
        self.header_links: list[str] = []
        self.all_links: list[str] = []
        self.ids: set[str] = set()
        self.main_text_parts: list[str] = []
        self.hidden_text_parts: list[str] = []
        self._stack: list[str] = []
        self._in_title = False
        self._in_jsonld = False
        self._in_main = 0
        self._in_header = 0
        self._skip = 0
        self._heading: dict | None = None
        self._p: list[str] | None = None
        self._a: list[str] | None = None
        self._a_href = ""
        self._hidden_depth = 0
        self._tag_depth = 0
        self._hidden_until: int | None = None
        self.main_seen = False

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        self._tag_depth += 1
        if tag == "title":
            self._in_title = True
        elif tag == "meta" and a.get("name") == "description":
            self.meta_description = a.get("content", "")
        elif tag == "script" and a.get("type") == "application/ld+json":
            self._in_jsonld = True
            self.jsonld.append("")
        if tag in self.SKIP:
            self._skip += 1
        if tag == "main":
            self._in_main += 1
            self.main_seen = True
        if tag == "header":
            self._in_header += 1
        if "id" in a:
            self.ids.add(a["id"])
        if ("hidden" in a) and self._hidden_until is None:
            self._hidden_until = self._tag_depth
        if self._in_main and tag in ("h1", "h2", "h3", "h4") and not self._skip:
            self._heading = {"level": int(tag[1]), "text": "", "id": a.get("id", ""), "index": len(self.main_text_parts)}
        if self._in_main and tag == "p" and not self._skip:
            self._p = []
        if tag == "a":
            href = a.get("href", "")
            self.all_links.append(href)
            if self._in_header and not self._in_main:
                self.header_links.append(href)
            if self._in_main and not self._skip:
                self._a = []
                self._a_href = href

    def handle_endtag(self, tag):
        if tag == "title":
            self._in_title = False
        if tag == "script" and self._in_jsonld:
            self._in_jsonld = False
        if tag in self.SKIP and self._skip:
            self._skip -= 1
        if tag == "main" and self._in_main:
            self._in_main -= 1
        if tag == "header" and self._in_header:
            self._in_header -= 1
        if tag in ("h1", "h2", "h3", "h4") and self._heading is not None:
            self._heading["text"] = _ws(self._heading["text"])
            self.headings.append(self._heading)
            self._heading = None
        if tag == "p" and self._p is not None:
            self.paragraphs.append(_ws(" ".join(self._p)))
            self._p = None
        if tag == "a" and self._a is not None:
            self.main_links.append((self._a_href, _ws(" ".join(self._a))))
            self._a = None
        if self._hidden_until is not None and self._tag_depth == self._hidden_until:
            self._hidden_until = None
        self._tag_depth -= 1

    def handle_data(self, data):
        if self._in_title:
            self.title += data
        if self._in_jsonld:
            self.jsonld[-1] += data
            return
        if self._skip:
            return
        if self._heading is not None:
            self._heading["text"] += data
        if self._p is not None:
            self._p.append(data)
        if self._a is not None:
            self._a.append(data)
        if self._in_main:
            if self._hidden_until is not None:
                self.hidden_text_parts.append(data)
            self.main_text_parts.append(data)


def _ws(s: str) -> str:
    return re.sub(r"\s+", " ", htmllib.unescape(s or "")).strip()


def load_html(path: pathlib.Path) -> str:
    if str(path).endswith(".gz"):
        return gzip.open(path, "rt", encoding="utf-8", errors="replace").read()
    return path.read_text(encoding="utf-8", errors="replace")


class Page:
    def __init__(self, html: str, label: str):
        self.label = label
        self.raw = html
        p = _Extract()
        p.feed(html)
        self.x = p
        self.title = _ws(p.title)
        self.meta_description = _ws(p.meta_description)
        self.main_text = _ws(" ".join(p.main_text_parts))
        self.h1s = [h for h in p.headings if h["level"] == 1]
        self.h2s = [h for h in p.headings if h["level"] == 2]
        self.h3s = [h for h in p.headings if h["level"] == 3]
        self.jsonld = []
        for block in p.jsonld:
            try:
                self.jsonld.append(json.loads(block))
            except Exception as e:  # noqa: BLE001
                self.jsonld.append({"__parse_error__": str(e)})
        self.nodes = _flatten_nodes(self.jsonld)
        self.faq_schema = []
        for n in self.nodes:
            if n.get("@type") == "FAQPage":
                for q in n.get("mainEntity", []) or []:
                    self.faq_schema.append((_ws(q.get("name", "")), _ws((q.get("acceptedAnswer") or {}).get("text", ""))))
        self.sections = self._sections()

    def _sections(self) -> list[dict]:
        """Split the main text by H2: each section gets its heading, id, text and the
        paragraphs that fall between its heading and the next H2."""
        parts = self.x.main_text_parts
        marks = [(h["index"], h) for h in self.x.headings if h["level"] in (1, 2)]
        out = []
        for i, (idx, h) in enumerate(marks):
            end = marks[i + 1][0] if i + 1 < len(marks) else len(parts)
            text = _ws(" ".join(parts[idx:end]))
            # drop the heading text itself from the section body
            if text.startswith(h["text"]):
                text = text[len(h["text"]):].strip()
            h3s = [x["text"] for x in self.x.headings if x["level"] == 3 and idx < x["index"] < end]
            out.append({"heading": h["text"], "id": h["id"], "level": h["level"], "text": text, "h3s": h3s})
        return out

    @property
    def body_words(self) -> int:
        return len(self.main_text.split())

    def fields(self) -> dict[str, str]:
        return {
            "metaTitle": self.title,
            "metaDescription": self.meta_description,
            "h1": " ".join(h["text"] for h in self.h1s),
            "h2s": " \n ".join(h["text"] for h in self.h2s),
            "faqs": " \n ".join(f"{q} {a}" for q, a in self.faq_schema),
            "body": self.main_text,
        }

    def faq_section_text(self) -> str:
        return " ".join(f"{q} {a}" for q, a in self.faq_schema)

    def copy_scope_text(self, exclude_faq: bool = False) -> str:
        """Page copy for the deferred-facts check: main text minus the shared
        claim-carrying components (blueprint 12.2 check 8). With exclude_faq the
        FAQ section is dropped too (the register probe measures body copy)."""
        keep = [s["text"] for s in self.sections if not self.is_shared_section(s)
                and not (exclude_faq and re.search(r"\bquestions?\b|\bfaq\b", s["heading"], re.I))]
        return " ".join(keep)

    @staticmethod
    def is_shared_section(s: dict) -> bool:
        """A section rendered by a shared component: matched by heading, or by
        the lead form's own boilerplate inside it (the panel's heading is page
        copy and changes per page, the form under it does not)."""
        if SHARED_CLAIM_SECTIONS.search(s["heading"]):
            return True
        t = s["text"]
        return ("Full name" in t and "privacy policy" in t.lower()) or "Request callback" in t


def _flatten_nodes(blocks) -> list[dict]:
    out = []

    def walk(o):
        if isinstance(o, dict):
            if "@type" in o:
                out.append(o)
            for v in o.values():
                walk(v)
        elif isinstance(o, list):
            for v in o:
                walk(v)
    walk(blocks)
    return out


# --------------------------------------------------------------------------- #
# Helpers                                                                       #
# --------------------------------------------------------------------------- #
def norm(s: str) -> str:
    return " ".join(content_terms(s))


def literal_in(phrase: str, text: str) -> bool:
    """Case-insensitive literal (after whitespace/punctuation normalisation)."""
    a = re.sub(r"[^\w\s]", " ", phrase.lower())
    a = re.sub(r"\s+", " ", a).strip()
    b = re.sub(r"[^\w\s]", " ", text.lower())
    b = re.sub(r"\s+", " ", b)
    return f" {a} " in f" {b} "


def count_literal(phrase: str, text: str) -> int:
    a = re.sub(r"[^\w\s]", " ", phrase.lower()).strip()
    a = re.sub(r"\s+", " ", a)
    b = re.sub(r"[^\w\s]", " ", text.lower())
    b = re.sub(r"\s+", " ", b)
    return len(re.findall(rf"(?<!\w){re.escape(a)}(?!\w)", b))


def sentences(text: str) -> list[str]:
    return [s.strip() for s in re.split(r"(?<=[.!?])\s+", text) if s.strip()]


def syllables(word: str) -> int:
    w = re.sub(r"[^a-z]", "", word.lower())
    if not w:
        return 0
    groups = re.findall(r"[aeiouy]+", w)
    n = len(groups)
    if w.endswith("e") and not w.endswith(("le", "ee")) and n > 1:
        n -= 1
    return max(1, n)


def register_probe(text: str, headings: list[str]) -> dict:
    words = re.findall(r"[A-Za-z£0-9'’-]+", text)
    n = max(1, len(words))
    sents = sentences(text)
    syl = sum(syllables(w) for w in words)
    flesch = 206.835 - 1.015 * (n / max(1, len(sents))) - 84.6 * (syl / n)
    qh = sum(1 for h in headings if h.strip().endswith("?"))
    you = sum(1 for w in words if w.lower() in ("you", "your", "you're", "yours", "you’re"))
    we = sum(1 for w in words if w.lower() in ("we", "our", "us", "we're", "we’re"))
    statute = len(STATUTE_RE.findall(text))
    jargon = sum(1 for w in words if w.lower().rstrip("s") in JARGON)
    numbers = sum(1 for w in words if any(c.isdigit() for c in w))
    return {
        "words": n, "sentence_len": round(n / max(1, len(sents)), 1), "flesch": round(flesch, 1),
        "question_headings_pct": round(100 * qh / max(1, len(headings)), 1),
        "you_per_1k": round(1000 * you / n, 1), "we_per_1k": round(1000 * we / n, 1),
        "statute_per_1k": round(1000 * statute / n, 2), "jargon_per_1k": round(1000 * jargon / n, 2),
        "numbers_per_1k": round(1000 * numbers / n, 1),
    }


def ngrams(text: str, n: int = 8) -> set[tuple[str, ...]]:
    """8-word sequences, skipping number-dense ones (the shared stats strip is
    numbers; a sentence copied between pages is words)."""
    toks = re.sub(r"[^\w\s]", " ", text.lower()).split()
    out = set()
    for i in range(max(0, len(toks) - n + 1)):
        g = tuple(toks[i:i + n])
        if sum(1 for t in g if any(c.isdigit() for c in t)) >= 2:
            continue
        out.add(g)
    return out


def route_exists(href: str) -> bool:
    """Resolve an internal href against the built app (what dynamicParams=false ships)."""
    path = href.split("#")[0].split("?")[0]
    if path.startswith(SITE):
        path = path[len(SITE):]
    if not path.startswith("/"):
        return True  # external or mailto/tel: not this check's business
    if path in ("", "/"):
        return True
    p = path.strip("/")
    candidates = [BUILD_APP / f"{p}.html", BUILD_APP / p / "index.html", BUILD_APP / p / "page.js"]
    if any(c.exists() for c in candidates):
        return True
    # Blog posts: content file by slug (flat directory, category in frontmatter).
    m = re.match(r"blog/[^/]+/([^/]+)$", p)
    if m and (ROOT / "Property/web/content/blog" / f"{m.group(1)}.md").exists():
        return True
    return False


# --------------------------------------------------------------------------- #
# The checks                                                                    #
# --------------------------------------------------------------------------- #
class Report:
    def __init__(self):
        self.rows: list[dict] = []

    def add(self, num: int, name: str, verdict: str, detail: str = "", quotes: list[str] | None = None):
        self.rows.append({"num": num, "name": name, "verdict": verdict, "detail": detail, "quotes": quotes or []})

    @property
    def blocks(self) -> int:
        return sum(1 for r in self.rows if r["verdict"] == "BLOCK")

    @property
    def warns(self) -> int:
        return sum(1 for r in self.rows if r["verdict"] == "WARN")

    def markdown(self, page: Page, slug: str, source: str) -> str:
        lines = [f"# Verify `/services/{slug}`", "",
                 f"Source: `{source}`  ", f"Run: {dt.datetime.now(dt.timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}  ",
                 f"Result: **{self.blocks} BLOCK, {self.warns} WARN** over {len(self.rows)} checks", "",
                 "| # | Check | Verdict | Detail |", "|---|---|---|---|"]
        for r in self.rows:
            lines.append(f"| {r['num']} | {r['name']} | {r['verdict']} | {r['detail'].replace('|', '\\|')} |")
        quoted = [r for r in self.rows if r["quotes"]]
        if quoted:
            lines += ["", "## Quotes (what to fix, where)"]
            for r in quoted:
                lines.append(f"\n**{r['num']}. {r['name']} ({r['verdict']})**")
                for q in r["quotes"][:40]:
                    lines.append(f"- {q}")
                if len(r["quotes"]) > 40:
                    lines.append(f"- ... {len(r['quotes']) - 40} more")
        return "\n".join(lines) + "\n"


def load_assignment(path: pathlib.Path, owner: str) -> dict[str, list[dict]]:
    by = defaultdict(list)
    others = []
    with open(path, encoding="utf-8", newline="") as f:
        for r in csv.DictReader(f):
            if r["owner_page"] == owner:
                by[r["placement"]].append(r)
            elif r["placement"] in ("exclude", "city_page") or r["owner_page"].startswith("/locations/"):
                others.append(r)
    by["__others__"] = others
    return by


def load_gsc_queries(path: pathlib.Path, slug: str) -> list[dict]:
    out = []
    with open(path, encoding="utf-8", newline="") as f:
        for r in csv.DictReader(f):
            if r["page"].rstrip("/").endswith(f"/services/{slug}") and float(r.get("impressions") or 0) > 0:
                out.append(r)
    return out


def section_of(page: Page, needle: str) -> str:
    for s in page.sections:
        if needle and needle in s["text"]:
            return s["heading"]
    return "(not in a section)"


def run_checks(page: Page, slug: str, *, assignment: dict, gsc_rows: list[dict], snapshot: Page | None,
               siblings: dict[str, Page], other_pages: dict[str, Page], spec: dict, veto: set[str],
               cited_facts: list[str] | None, dropped_ok: set[str] | None, llms_txt: str | None) -> Report:
    rep = Report()
    fields = page.fields()
    page_title_part = page.title[:-len(BRAND_SUFFIX)] if page.title.endswith(BRAND_SUFFIX) else page.title

    # 1 Title
    q = []
    L = len(page_title_part)
    if not (40 <= L <= 55):
        q.append(f"page part is {L} characters: \"{page_title_part}\"")
    for r in assignment.get("title", []):
        if classify_query(r["query"], {"metaTitle": page.title})["status"] != "covered":
            q.append(f"title row not matched in the title: \"{r['query']}\"")
    if page.title.count("|") > 1:
        q.append("more than one pipe in the rendered title")
    if page_title_part.strip().lower() in veto:
        q.append("title string is on the Bing veto list")
    rep.add(1, "Title", "BLOCK" if q else "PASS", f"\"{page.title}\" ({L} chars page part)", q)

    # 2 H1
    q = []
    if len(page.h1s) != 1:
        q.append(f"{len(page.h1s)} H1 elements found")
    h1 = page.h1s[0]["text"] if page.h1s else ""
    if "|" in h1:
        q.append("pipe in H1")
    for r in assignment.get("h1", []):
        if classify_query(r["query"], {"h1": h1})["status"] != "covered":
            q.append(f"h1 row not matched: \"{r['query']}\"")
    rep.add(2, "H1", "BLOCK" if q else "PASS", f"\"{h1}\"", q)

    # 3 Heading hierarchy and ids
    q = []
    last = 1
    for h in page.x.headings:
        if h["level"] > last + 1:
            q.append(f"H{h['level']} \"{h['text']}\" follows H{last} (skipped level)")
        last = h["level"]
    no_id = [h["text"] for h in page.h2s if not h["id"]]
    detail = f"{len(page.h2s)} H2, {len(page.h3s)} H3; {len(no_id)} H2 without an id"
    verdict = "BLOCK" if q else ("WARN" if no_id else "PASS")
    rep.add(3, "Heading hierarchy", verdict, detail, q + [f"H2 without id: \"{t}\"" for t in no_id])

    # 4 FAQ parity
    q = []
    visible = page.main_text
    n = len(page.faq_schema)
    if not (8 <= n <= 12):
        q.append(f"{n} FAQ items in schema (8 to 12 required)")
    missing_q = [qq for qq, _ in page.faq_schema if qq not in visible]
    missing_a = [qq for qq, aa in page.faq_schema if aa[:60] not in visible]
    q += [f"question not visible in HTML: \"{x}\"" for x in missing_q]
    q += [f"answer not visible in HTML (schema only): \"{x}\"" for x in missing_a]
    long_short = [f"answer {len(aa.split())} words: \"{qq}\"" for qq, aa in page.faq_schema if not (40 <= len(aa.split()) <= 90)]
    verdict = "BLOCK" if q else ("WARN" if long_short else "PASS")
    rep.add(4, "FAQ parity (visible == schema)", verdict, f"{n} items, {len(missing_a)} answers absent from HTML", q + long_short)

    # 5 Offer parity
    q = []
    offers = []
    priced = False
    for nnode in page.nodes:
        if nnode.get("@type") == "Service":
            cat = nnode.get("hasOfferCatalog") or {}
            for it in cat.get("itemListElement", []) or []:
                item = it.get("itemOffered", it) if isinstance(it, dict) else {}
                nm = _ws(item.get("name", "") or it.get("name", ""))
                if nm:
                    offers.append(nm)
                if "price" in it or "price" in item or "priceSpecification" in it:
                    priced = True
    h3_texts = [h["text"] for h in page.h3s]
    if not offers:
        q.append("no hasOfferCatalog on the Service node")
    for o in offers:
        if o not in h3_texts:
            q.append(f"offer with no identical H3: \"{o}\"")
    if priced:
        q.append("an offer carries a price (R7: none until F3)")
    rep.add(5, "Offer parity (H3 == hasOfferCatalog)", "BLOCK" if q else "PASS", f"{len(offers)} offers, {len(h3_texts)} H3", q)

    # 6 Coverage floor (placement-aware)
    q = []
    fee_sections = " ".join(s["text"] for s in page.sections if re.search(r"\bfee|\bcost", s["heading"], re.I))
    # The coverage sentence: national reach plus the remote channels. The five city
    # links are check 13's job (they live in "Where we work", not here; owner 2026-10-09).
    cov_sentence = next((s for s in sentences(page.main_text)
                         if re.search(r"\b(UK|United Kingdom)\b", s) and re.search(r"video call|phone|email|remote|wherever|anywhere", s, re.I)), "")
    placed, total = 0, 0
    for pl, field in (("title", "metaTitle"), ("h1", "h1"), ("h2", "h2s"), ("faq", "faqs")):
        for r in assignment.get(pl, []):
            total += 1
            st = classify_query(r["query"], {field: fields[field]})["status"]
            if st == "covered":
                placed += 1
            else:
                q.append(f"`{pl}` row not placed in {field}: \"{r['query']}\" ({r['gsc_impressions_90d'] or 0} impr)")
    for r in assignment.get("fees_section", []):
        total += 1
        if classify_query(r["query"], {"fees": fee_sections})["status"] == "covered":
            placed += 1
        else:
            q.append(f"`fees_section` row not placed in a fee/cost section: \"{r['query']}\"")
    for r in assignment.get("body", []):
        total += 1
        if classify_query(r["query"], fields)["status"] == "covered":
            placed += 1
        else:
            q.append(f"`body` row not matched anywhere: \"{r['query']}\" ({r['gsc_impressions_90d'] or 0} impr)")
    cs_rows = assignment.get("coverage_statement", [])
    total += len(cs_rows)
    if cov_sentence:
        placed += len(cs_rows)
    elif cs_rows:
        q.append(f"no coverage sentence found (a sentence naming the UK and the remote channels); {len(cs_rows)} coverage_statement rows unserved")
    leaks = []
    for r in assignment["__others__"]:
        if r.get("phrase_family") == "brand":
            continue  # the brand name is on every page by design
        if literal_in(r["query"], page.main_text) or literal_in(r["query"], page.title):
            leaks.append(f"string owned by {r['owner_page']} ({r['placement']}) appears on this page: \"{r['query']}\"")
    q += leaks
    rep.add(6, "Coverage floor (assignment placements, R5)", "BLOCK" if q else "PASS",
            f"{placed}/{total} rows placed; coverage sentence {'found' if cov_sentence else 'missing'}; {len(leaks)} leaks", q)

    # 7 Equity preservation
    q = []
    for r in gsc_rows:
        if classify_query(r["query"], fields)["status"] == "missing":
            q.append(f"query with {r['impressions']} impressions no longer matches: \"{r['query']}\"")
    rep.add(7, "Equity preservation (pre-rewrite GSC queries still match)", "BLOCK" if q else "PASS",
            f"{len(gsc_rows)} queries had impressions; {len(q)} lost", q)

    # 8 Deferred facts (R7) in the page's own copy
    q = []
    scope = page.copy_scope_text()
    scope_wl = scope
    for w in CONTACT_WHITELIST:
        scope_wl = scope_wl.replace(w, " ")
    for pat, label in DEFERRED_PATTERNS:
        for m in re.finditer(pat, scope_wl, re.I):
            ctx = scope_wl[max(0, m.start() - 60): m.end() + 60]
            if label.startswith("pound figure") and not FEE_CONTEXT.search(ctx):
                continue
            q.append(f"{label}: \"...{_ws(ctx)}...\" (under: {section_of(page, _ws(ctx)[:30])})")
    excluded = [s["heading"] for s in page.sections if page.is_shared_section(s)]
    rep.add(8, "Deferred facts (R7) in page copy", "BLOCK" if q else "PASS",
            f"{len(q)} hits; sections excluded as shared components: {', '.join(excluded) or 'none'}", q)

    # 9 Stuffing
    q = []
    words = max(1, page.body_words)
    fam = [r["query"] for pl in ("title", "h1", "h2") for r in assignment.get(pl, [])]
    for ph in sorted(set(fam)):
        c = count_literal(ph, page.main_text)
        if 1000 * c / words > 6:
            q.append(f"\"{ph}\" appears {c} times ({1000 * c / words:.1f} per 1,000 words)")
    all_phr = sorted({r["query"] for pl, rows in assignment.items() if pl not in ("__others__", "exclude") for r in rows})
    for para in page.x.paragraphs:
        for ph in all_phr:
            if len(ph.split()) >= 2 and count_literal(ph, para) > 2:
                q.append(f"\"{ph}\" {count_literal(ph, para)} times in one paragraph: \"{para[:90]}...\"")
    nm = count_literal("near me", page.main_text)
    if nm > 1:
        q.append(f"\"near me\" appears {nm} times in the body")
    uk = len(re.findall(r"\bUK\b", page.main_text))
    warn = []
    if 1000 * uk / words > 8:
        warn.append(f"\"UK\" appears {uk} times ({1000 * uk / words:.1f} per 1,000 words)")
    verdict = "BLOCK" if q else ("WARN" if warn else "PASS")
    rep.add(9, "Stuffing", verdict, f"{len(q)} blocks, {len(warn)} warnings", q + warn)

    # 10 AI tells and house style
    block, warn = [], []
    for m in re.finditer("—", page.main_text):
        block.append(f"em-dash: \"...{page.main_text[max(0, m.start() - 50): m.end() + 50]}...\"")
    low = page.main_text.lower()
    for t in AI_TELLS:
        c = low.count(t)
        if c:
            i = low.find(t)
            warn.append(f"\"{t}\" x{c}: \"...{page.main_text[max(0, i - 50): i + 60]}...\"")
    for para in page.x.paragraphs:
        if re.search(r"\?\s+[^.]{0,80}\bthe answer is\b", para, re.I):
            warn.append(f"rhetorical question answered with 'the answer is': \"{para[:90]}...\"")
    verdict = "BLOCK" if block else ("WARN" if warn else "PASS")
    rep.add(10, "AI tells and house style", verdict, f"{len(block)} em-dashes, {len(warn)} lexicon hits", block + warn)

    # 11 Cross-page sameness
    q = []
    # Related-guide lists repeat the guides' real titles on every page that links
    # them; that is a list of names, not copied prose, so it is left out here.
    def sameness_text(pg: Page) -> str:
        return " ".join(s["text"] for s in pg.sections if not pg.is_shared_section(s)
                        and not re.search(r"related guides|background reading", s["heading"], re.I))
    mine = ngrams(sameness_text(page))
    for label, other in {**siblings, **other_pages}.items():
        shared = mine & ngrams(sameness_text(other))
        if shared:
            ex = "; ".join(" ".join(g) for g in list(shared)[:3])
            q.append(f"{len(shared)} shared 8-word sequences with {label}: {ex}")
    too_many = [x for x in q if int(x.split(" ")[0]) > 3]
    verdict = "BLOCK" if too_many else ("WARN" if q else "PASS")
    rep.add(11, "Cross-page sameness (8-grams)", verdict, f"against {len(siblings) + len(other_pages)} pages", q)

    # 12 Cross-surface consistency
    q = []
    for o in offers:
        for label, other in other_pages.items():
            if label in ("/services", "/"):
                if o.lower() not in other.main_text.lower():
                    q.append(f"offer \"{o}\" not named on {label}")
    rep.add(12, "Cross-surface consistency (offer names)", "WARN" if q else "PASS", f"{len(q)} mismatches", q)

    # 13 Links
    q = []
    hrefs = [h for h, _ in page.x.main_links]
    unresolved = sorted({h for h in hrefs if not route_exists(h)})
    q += [f"internal href does not resolve: {h}" for h in unresolved]
    for h in hrefs:
        if "#" in h and h.startswith("#"):
            if h[1:] not in page.x.ids:
                q.append(f"anchor target missing: {h}")
    paths = [h.split("#")[0].split("?")[0].replace(SITE, "") for h in hrefs]
    sib = [s for s in SERVICE_SLUGS if s != slug]
    for s in sib:
        c = paths.count(f"/services/{s}")
        if c != 1:
            q.append(f"sibling /services/{s} linked {c} times (expected once)")
    for c in CITY_PAGES:
        if paths.count(c) != 1:
            q.append(f"city page {c} linked {paths.count(c)} times (expected once)")
    guides = sum(1 for p in set(paths) if p in PILLAR_GUIDES)
    if guides < 4:
        q.append(f"only {guides} pillar guides linked (at least 4)")
    opening = next((s for s in page.sections if s["level"] == 1), None)
    if opening:
        first_para = next((p for p in page.x.paragraphs if p and p in opening["text"]), "")
        for href, text in page.x.main_links:
            if text and first_para and text in first_para and href.startswith("/"):
                q.append(f"link in the opening paragraph: [{text}]({href})")
                break
    rep.add(13, "Links", "BLOCK" if q else "PASS", f"{len(hrefs)} body links, {len(unresolved)} unresolved", q)

    # 14 Register probe
    probe = register_probe(page.copy_scope_text(exclude_faq=True), [h["text"] for h in page.h2s + page.h3s])
    q = []
    for k, (lo, hi) in spec.items():
        v = probe.get(k)
        if v is not None and not (lo <= v <= hi):
            q.append(f"{k} = {v} (target {lo} to {hi})")
    rep.add(14, "Register probe", "WARN" if q else "PASS", "; ".join(f"{k} {v}" for k, v in probe.items()), q)

    # 15 Section weight
    q = []
    for s in page.sections:
        if s["level"] != 2:
            continue
        w = len(s["text"].split())
        if w < 60 or w > 350:
            q.append(f"section \"{s['heading']}\" has {w} words")
        first = sentences(s["text"])[:1]
        if first:
            ht = set(content_terms(s["heading"]))
            ft = set(content_terms(first[0]))
            if ht and not (ht & ft):
                q.append(f"first sentence shares no term with its heading \"{s['heading']}\": \"{first[0][:90]}\"")
    for para in page.x.paragraphs:
        if len(para.split()) > 80:
            q.append(f"paragraph of {len(para.split())} words: \"{para[:80]}...\"")
    rep.add(15, "Section weight", "WARN" if q else "PASS", f"{len(q)} notes", q)

    # 16 No-JS render
    q = []
    if not page.x.main_seen:
        q.append("no <main> element")
    if not page.h1s:
        q.append("H1 absent")
    for qq, aa in page.faq_schema:
        if aa[:60] not in page.main_text:
            q.append(f"FAQ answer absent from static HTML: \"{qq}\"")
            break
    for s in SERVICE_SLUGS:
        if not any(h.rstrip("/").endswith(f"/services/{s}") for h in page.x.header_links):
            q.append(f"header carries no link to /services/{s}")
    if not page.h3s:
        q.append("no H3 (services list) in the HTML")
    rep.add(16, "No-JS render", "BLOCK" if q else "PASS", f"{len(page.x.header_links)} header links in HTML", q)

    # 17 JSON-LD
    q = []
    for b in page.jsonld:
        if isinstance(b, dict) and "__parse_error__" in b:
            q.append(f"JSON-LD parse error: {b['__parse_error__']}")
    types = Counter(n.get("@type") for n in page.nodes)
    if "LocalBusiness" in types:
        q.append("LocalBusiness on a service page")
    if any("aggregateRating" in n for n in page.nodes):
        q.append("aggregateRating present (no reviews back it)")
    nested = set()
    for n in page.nodes:
        cat = n.get("hasOfferCatalog") if isinstance(n, dict) else None
        for it in (cat or {}).get("itemListElement", []) or []:
            io = it.get("itemOffered") if isinstance(it, dict) else None
            if isinstance(io, dict):
                nested.add(id(io))
    svc = [n for n in page.nodes if n.get("@type") == "Service" and id(n) not in nested]
    if not svc:
        q.append("no Service node")
    for n in svc:
        if not n.get("@id"):
            q.append("Service node has no @id")
        prov = n.get("provider") or {}
        if not (isinstance(prov, dict) and prov.get("@id")):
            q.append("Service.provider has no @id")
        area = n.get("areaServed")
        if not (isinstance(area, dict) and area.get("name") == "United Kingdom"):
            q.append(f"areaServed is {json.dumps(area)} (expected Country United Kingdom)")
    if snapshot is not None:
        old_bc = [n for n in snapshot.nodes if n.get("@type") == "BreadcrumbList"]
        new_bc = [n for n in page.nodes if n.get("@type") == "BreadcrumbList"]
        if old_bc and old_bc != new_bc:
            q.append("BreadcrumbList differs from the snapshot")
    rep.add(17, "JSON-LD", "BLOCK" if q else "PASS", ", ".join(f"{k} x{v}" for k, v in types.items()), q)

    # 18 Cited sentences (tax-advice)
    if slug == "property-tax-advice":
        if cited_facts is None:
            rep.add(18, "Cited sentences (ChatGPT)", "WARN", "no fact map supplied (--cited-facts); BING_G holds entry paths only, the sentence list is written at step 4", [])
        else:
            q = [f"cited fact absent: \"{f}\"" for f in cited_facts if f and f not in page.main_text]
            rep.add(18, "Cited sentences (ChatGPT)", "BLOCK" if q else "PASS", f"{len(cited_facts)} facts checked", q)
    else:
        rep.add(18, "Cited sentences (ChatGPT)", "PASS", "not applicable to this page", [])

    # 19 Length
    faq_words = len(page.faq_section_text().split())
    body = page.body_words - faq_words
    rep.add(19, "Length (body words excluding FAQ)", "PASS" if 1600 <= body <= 2400 else "WARN", f"{body} words ({page.body_words} incl. FAQ)", [])

    # 20 Diff against snapshot
    if snapshot is None:
        rep.add(20, "Diff against snapshot", "WARN", "no snapshot supplied", [])
    else:
        q = []
        old_nums = set(re.findall(r"£?\d[\d,.]*%?", snapshot.main_text)) - set(re.findall(r"£?\d[\d,.]*%?", page.main_text))
        old_h3 = {h["text"] for h in snapshot.h3s} - {h["text"] for h in page.h3s}
        old_h2 = {h["text"] for h in snapshot.h2s} - {h["text"] for h in page.h2s}
        old_links = {h.split("#")[0] for h, _ in snapshot.x.main_links} - {h.split("#")[0] for h, _ in page.x.main_links}
        drops = [f"number: {x}" for x in sorted(old_nums)] + [f"H3: {x}" for x in sorted(old_h3)] + \
                [f"H2: {x}" for x in sorted(old_h2)] + [f"link: {x}" for x in sorted(old_links) if x.startswith("/")]
        unmarked = [d for d in drops if dropped_ok is not None and d not in dropped_ok]
        verdict = "PASS" if not drops else ("BLOCK" if (dropped_ok is not None and unmarked) else "WARN")
        rep.add(20, "Diff against snapshot (facts dropped)", verdict,
                f"{len(drops)} items in the snapshot and not here" + (f", {len(unmarked)} unmarked" if dropped_ok is not None else " (no --dropped file: WARN only)"),
                [("UNMARKED " if d in unmarked else "") + d for d in drops])
    return rep


# --------------------------------------------------------------------------- #
# Wiring                                                                        #
# --------------------------------------------------------------------------- #
def built_html(slug_or_path: str) -> pathlib.Path:
    p = slug_or_path.strip("/")
    return BUILD_APP / f"{p}.html"


def load_optional_page(path: pathlib.Path, label: str) -> Page | None:
    if path.exists():
        return Page(load_html(path), label)
    return None


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--slug", choices=SERVICE_SLUGS)
    ap.add_argument("--html", help="rendered HTML file (default: the built page under .next/server/app)")
    ap.add_argument("--assignment", default=str(DOCS / "QUERY_ASSIGNMENT_2026-10-09.csv"))
    ap.add_argument("--gsc", default=str(DOCS / "GSC_FRESH_2026-10-09_hire_intent_90d.csv"))
    ap.add_argument("--snapshot", help="pre-rewrite rendered HTML (.html or .html.gz); default: snapshots_2026-10-09/services_<slug>.html.gz")
    ap.add_argument("--spec", help="JSON of measured register ranges (blueprint 12.1); default: interim targets")
    ap.add_argument("--veto", help="file of vetoed title strings, one per line")
    ap.add_argument("--cited-facts", help="file of sentences/facts that must survive (tax-advice page)")
    ap.add_argument("--dropped", help="file of accepted drops for check 20, one per line, same wording as the report")
    ap.add_argument("--out", help="write the Markdown report here (default: print)")
    ap.add_argument("--selftest", action="store_true", help="run against the 9 Oct snapshots and assert the known state")
    a = ap.parse_args()

    if a.selftest:
        return selftest()
    if not a.slug:
        ap.error("--slug is required")

    src = pathlib.Path(a.html) if a.html else built_html(f"services/{a.slug}")
    if not src.exists():
        print(f"page not found: {src} (run `npm run build` in Property/web or pass --html)", file=sys.stderr)
        return 2
    page = Page(load_html(src), a.slug)
    snap_path = pathlib.Path(a.snapshot) if a.snapshot else DOCS / "snapshots_2026-10-09" / f"services_{a.slug}.html.gz"
    snapshot = load_optional_page(snap_path, "snapshot")
    assignment = load_assignment(pathlib.Path(a.assignment), f"/services/{a.slug}")
    gsc_rows = load_gsc_queries(pathlib.Path(a.gsc), a.slug)
    spec_path = pathlib.Path(a.spec) if a.spec else SPEC_FILE
    spec = {k: v for k, v in json.loads(spec_path.read_text()).items() if not k.startswith("_")} if spec_path.exists() else SPEC_DEFAULT
    veto = {l.strip().lower() for l in pathlib.Path(a.veto).read_text().splitlines() if l.strip()} if a.veto else set()
    cited = [l.strip() for l in pathlib.Path(a.cited_facts).read_text().splitlines() if l.strip()] if a.cited_facts else None
    dropped = {l.strip() for l in pathlib.Path(a.dropped).read_text().splitlines() if l.strip()} if a.dropped else None
    siblings = {}
    for s in SERVICE_SLUGS:
        if s != a.slug:
            pg = load_optional_page(built_html(f"services/{s}"), f"/services/{s}")
            if pg:
                siblings[f"/services/{s}"] = pg
    others = {}
    for path in list(CITY_PAGES) + ["/services", "/"]:
        pg = load_optional_page(built_html(path) if path != "/" else BUILD_APP / "index.html", path)
        if pg:
            others[path] = pg
    llms = (ROOT / "Property/web/public/llms.txt")
    rep = run_checks(page, a.slug, assignment=assignment, gsc_rows=gsc_rows, snapshot=snapshot, siblings=siblings,
                     other_pages=others, spec=spec, veto=veto, cited_facts=cited, dropped_ok=dropped,
                     llms_txt=llms.read_text() if llms.exists() else None)
    md = rep.markdown(page, a.slug, str(src))
    if a.out:
        pathlib.Path(a.out).write_text(md, encoding="utf-8")
        print(f"wrote {a.out}: {rep.blocks} BLOCK, {rep.warns} WARN")
    else:
        print(md)
    return 1 if rep.blocks else 0


def selftest() -> int:
    """The known state of the 9 Oct snapshots. A check that cannot tell the old
    page from the new one is not a check, so these assertions are what the
    script must find on the pre-rewrite pages."""
    failures = []
    for slug in SERVICE_SLUGS:
        snap = DOCS / "snapshots_2026-10-09" / f"services_{slug}.html.gz"
        page = Page(load_html(snap), slug)
        assignment = load_assignment(DOCS / "QUERY_ASSIGNMENT_2026-10-09.csv", f"/services/{slug}")
        gsc_rows = load_gsc_queries(DOCS / "GSC_FRESH_2026-10-09_hire_intent_90d.csv", slug)
        rep = run_checks(page, slug, assignment=assignment, gsc_rows=gsc_rows, snapshot=page, siblings={}, other_pages={},
                         spec=SPEC_DEFAULT, veto=set(), cited_facts=None, dropped_ok=None, llms_txt=None)
        by = {r["num"]: r for r in rep.rows}
        expect = {
            4: ("BLOCK", "answers were schema-only on 9 Oct"),
            16: ("BLOCK", "header carried no service links on 9 Oct"),
            6: ("BLOCK", "the assignment rows were not placed on 9 Oct"),
            20: ("PASS", "a page diffed against itself drops nothing"),
            17: ("BLOCK", "areaServed was the code GB, not Country United Kingdom, on all three on 9 Oct; two also lacked @id"),
        }
        for num, (verdict, why) in expect.items():
            got = by[num]["verdict"]
            ok = got == verdict
            print(f"{'ok ' if ok else 'FAIL'} {slug} check {num}: expected {verdict} ({why}), got {got}: {by[num]['detail'][:100]}")
            if not ok:
                failures.append((slug, num))
        n_faq = len(page.faq_schema)
        print(f"     {slug}: {n_faq} FAQ in schema, {len(page.h2s)} H2, {page.body_words} words, {len(page.x.header_links)} header links")
    print("SELFTEST", "PASS" if not failures else f"FAIL {failures}")
    return 0 if not failures else 1


if __name__ == "__main__":
    sys.exit(main())
