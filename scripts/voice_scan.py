#!/usr/bin/env python3
"""Deterministic "humanness" scanner for the blog corpus (Humanise Engine, C1).

WHAT THIS IS
------------
A READ-ONLY triage + scoring detector. For a blog page it scores how robotic the
reader-facing prose reads, on six deterministic signals, into a single
`robot_score` (0-100) and a band (clean / minor / robotic / severe). It NEVER
edits a file. Python detects and ranks; Opus (scripts/voice_rewrite.wf.js)
reasons and rewrites; scripts/voice_safety_diff.py guarantees no fact/query
changed. See docs/_engines/VOICE_STANDARD.md for the methodology this enforces.

THE SIX SIGNALS (reader-facing prose only - <table> cells and <aside> CTA chrome
are stripped, and <a> is reduced to anchor text so hrefs/slugs never count):
  S1  abstract-noun voice   "the landlord/taxpayer/investor" instead of "you",
                            context-aware: skips named personas (Mr/Ltd...),
                            statutory definitions, and genuine industry terms in
                            context (a serviced-accommodation "operator", an IHT
                            "donor", a transaction "buyer/seller"). Per 1k words.
  S2  meta-commentary       "this guide covers", "this page walks", "we cover",
                            "the page's first concrete artefact". Any is a defect.
  S3  structural/SEO talk   "pillar", "cluster", "child/parent guide",
                            "forward-link", "see our pillar".
  S4  em-dashes             U+2014 (house style bans them; they read as AI).
  S5  signposting           "Moreover/Furthermore/It is worth noting/Notably...".
  S6  over-length           padding penalty: 0 unless above a sane ideal length.

All knobs (noun list, allowlist, weights, saturation, bands, ideal lengths) live
in sites/<site>.json "voice"; defaults are baked in here so it runs out of the
box. The phrase lists (what counts as a tell) are methodology and live below.

CLI
---
  python scripts/voice_scan.py --slug <slug> [--site property] [--json]
  python scripts/voice_scan.py --all  [--site property] [--csv out.csv] [--limit N]
  python scripts/voice_scan.py --worst N [--site property]
  python scripts/voice_scan.py --all --compare --baseline <voice_scan_*.json>
  python scripts/voice_scan.py --slug <slug> --gate --gate-band robotic   # exit 2
  python scripts/voice_scan.py --selftest

--all writes a ranked manifest to optimisation_engine/.cache/voice_scan_<site>.json
(per-slug sha256, like the qa/coverage caches) so the deploy gate and before/after
comparisons can sha-match each page.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import pathlib
import re
import sys
import time

import yaml

ROOT = pathlib.Path(__file__).resolve().parents[1]
CACHE = ROOT / "optimisation_engine" / ".cache"


def _blog_dir(site: str = "property") -> pathlib.Path:
    """Resolve the site's blog content dir from sites/<site>.json (mirrors
    track2_query_coverage.py / predeploy_gate.py)."""
    p = ROOT / "sites" / f"{site}.json"
    if p.exists():
        cfg = json.loads(p.read_text(encoding="utf-8"))
        return ROOT / cfg["paths"]["blogContentDir"]
    return ROOT / "Property" / "web" / "content" / "blog"


# --------------------------------------------------------------------------- #
# Config (defaults baked in; sites/<site>.json "voice" overrides per key)      #
# --------------------------------------------------------------------------- #
DEFAULTS = {
    # Reader-referent nouns where "you" (or a concrete role) usually belongs.
    # Singular only - bare plurals ("landlords must register") are general and
    # correct, so they are intentionally not matched (the article pattern needs
    # the/a/an + singular).
    "abstractNouns": [
        "landlord", "taxpayer", "investor", "owner", "individual", "recipient",
        "claimant", "host", "developer", "operator", "donor", "donee", "buyer",
        "seller", "vendor", "purchaser", "borrower",
    ],
    # Per-noun context tokens that make the noun a LEGITIMATE professional term
    # (not a robotic stand-in for "you"). If any token appears in the same
    # sentence, the hit is not counted.
    "industryAllowlist": {
        "operator": ["serviced accommodation", "fhl", "furnished holiday", "holiday let",
                     "aparthotel", "short-term let", "short term let", "management company",
                     "platform", "booking"],
        "donor": ["gift", "gifted", "iht", "inheritance", "potentially exempt", "pet",
                  "clt", "donee", "trust", "estate", "seven-year", "7-year", "taper",
                  "nil-rate", "nil rate"],
        "donee": ["gift", "donor", "iht", "inheritance", "trust"],
        "buyer": ["sdlt", "ltt", "lbtt", "completion", "exchange", "conveyanc",
                  "stamp duty", "first-time", "first time", "purchase", "acquisition"],
        "seller": ["cgt", "disposal", "completion", "exchange", "conveyanc",
                   "capital gains", "sale", "vendor"],
        "vendor": ["completion", "exchange", "conveyanc", "sale", "disposal"],
        "purchaser": ["sdlt", "completion", "conveyanc", "purchase", "acquisition"],
        "borrower": ["mortgage", "loan", "lender", "interest cover", "ltv", "remortgage"],
    },
    "lengthIdeal": {"nonPillar": 2200, "pillar": 3000},
    "pillarSlugs": [],
    "weights": {"s1": 0.20, "s2": 0.25, "s3": 0.20, "s4": 0.10, "s5": 0.15, "s6": 0.10},
    # Counts (or per-1k for s1/s5) at which a signal saturates to 1.0.
    "saturation": {"s1": 8.0, "s2": 3.0, "s3": 3.0, "s4": 3.0, "s5": 6.0},
    "bands": {"minor": 15, "robotic": 35, "severe": 60, "metaFloorRobotic": 4},
}

BAND_ORDER = ["clean", "minor", "robotic", "severe"]


def load_voice_config(site: str = "property") -> dict:
    """DEFAULTS deep-merged with sites/<site>.json "voice" (shallow per top key,
    dict values merged one level so partial overrides work)."""
    cfg = json.loads(json.dumps(DEFAULTS))  # deep copy
    p = ROOT / "sites" / f"{site}.json"
    if p.exists():
        site_cfg = (json.loads(p.read_text(encoding="utf-8")) or {}).get("voice") or {}
        for k, v in site_cfg.items():
            if isinstance(v, dict) and isinstance(cfg.get(k), dict):
                cfg[k].update(v)
            else:
                cfg[k] = v
    return cfg


# --------------------------------------------------------------------------- #
# Phrase lists (methodology: what counts as a tell)                            #
# --------------------------------------------------------------------------- #
META_PATTERNS = [
    r"\bthis (?:guide|page|article|handbook|post|piece|section) (?:covers|walks|sets out|"
    r"explains|shows|is|provides|breaks down|looks at|takes you|maps|synthesis\w*)\b",
    r"\bin this (?:guide|article|page|post|section)\b",
    r"\bwe(?:'ll| will)? (?:cover|explain|walk|set out|look at|break down|explore|unpack)\b",
    r"\b(?:in |across )?the (?:sections?|paragraphs?) (?:that follow|below|above)\b",
    r"\bbelow,? we\b",
    r"\bas we (?:will see|saw|noted|mentioned|discussed|explained)\b",
    r"\bas (?:noted|mentioned|discussed|explained|set out|covered) (?:above|below|earlier|later)\b",
    r"\bread on\b",
    r"\bthe (?:page|article|guide)'?s? (?:first|next|final|second|third) "
    r"(?:concrete )?(?:artefact|artifact)\b",
    r"\bself[- ]identify against\b",
    r"\bthe thing readers can\b",
    r"\bthis (?:is|page is|guide is|article is) the .{0,24}?"
    r"(?:playbook|map|walkthrough|deep[- ]dive|primer|explainer|one[- ]page)\b",
    r"\bwalks the .{0,30}?(?:table|architecture|framework|mechanic)\b",
]
STRUCTURAL_PATTERNS = [
    r"\bpillar\b",
    r"\bcluster\b",
    r"\b(?:child|parent|sibling|companion|hub|cornerstone|anchor) "
    r"(?:guide|guides|page|pages)\b",
    r"\bforward[- ]link\w*\b",
    r"\bhub[- ]and[- ]spoke\b",
    r"\bspoke page\b",
    r"\btopic cluster\b",
    r"\bsee our pillar\b",
]
SIGNPOST_PATTERNS = [
    r"\bmoreover\b", r"\bfurthermore\b", r"\bin addition\b", r"\badditionally\b",
    r"\bit is worth noting\b", r"\bit'?s worth noting\b", r"\bit is important to note\b",
    r"\bit should be noted\b", r"\bit is worth (?:bearing in mind|remembering)\b",
    r"\bnotably\b", r"\bimportantly\b", r"\bcrucially\b", r"\bin conclusion\b",
    r"\bto summari[sz]e\b", r"\bin summary\b", r"\bnavigating the complexit\w+\b",
    r"\bwhen it comes to\b", r"\bneedless to say\b", r"\blast but not least\b",
    r"\bfirst and foremost\b", r"\bdelve into\b", r"\bthat being said\b",
    r"\bat the end of the day\b", r"\bin today'?s\b",
]

_META_RE = re.compile("|".join(META_PATTERNS), re.I)
_STRUCT_RE = re.compile("|".join(STRUCTURAL_PATTERNS), re.I)
_SIGN_RE = re.compile("|".join(SIGNPOST_PATTERNS), re.I)
_EMDASH_RE = re.compile("—")

# S1 guards.
_HONORIFIC_RE = re.compile(r"\b(?:Mr|Mrs|Ms|Miss|Dr|Sir|Dame|Lord|Lady)\b\.?")
_COMPANY_RE = re.compile(r"\b(?:Ltd|Limited|LLP|PLC|plc|Co)\b")
_DEFN_STARTS = ("is ", "are ", "means ", "refers to", "for the purposes",
                "describes", "denotes")


# --------------------------------------------------------------------------- #
# Page parsing (mirrors track2_query_coverage.py helpers)                      #
# --------------------------------------------------------------------------- #
def _split_frontmatter(text: str):
    if not text.startswith("---"):
        return None, text
    end = text.find("\n---", 3)
    if end == -1:
        return None, text
    fm = text[3:end]
    rest = text[end:]
    nl = rest.find("\n", 1)
    body = rest[nl + 1:] if nl != -1 else ""
    return fm, body


def _html_to_text(html: str) -> str:
    html = re.sub(r"<(script|style)\b[^>]*>.*?</\1>", " ", html, flags=re.I | re.S)
    text = re.sub(r"<[^>]+>", " ", html)
    text = (text.replace("&amp;", "&").replace("&lt;", "<").replace("&gt;", ">")
            .replace("&nbsp;", " ").replace("&pound;", "£").replace("&#163;", "£"))
    return re.sub(r"\s+", " ", text).strip()


def _render_prose(body: str) -> str:
    """Reader-facing prose only: drop <table> cells and <aside> CTA chrome, then
    strip remaining tags (keeping <a> anchor text; hrefs live inside the tag and
    are removed)."""
    b = re.sub(r"<table\b[^>]*>.*?</table>", " ", body, flags=re.I | re.S)
    b = re.sub(r"<aside\b[^>]*>.*?</aside>", " ", b, flags=re.I | re.S)
    return _html_to_text(b)


def _sentences(text: str):
    return re.split(r"(?<=[.!?;:])\s+", text)


def _snippets(regex: re.Pattern, text: str, limit: int = 6, ctx: int = 34):
    out = []
    seen = set()
    for m in regex.finditer(text):
        s = max(0, m.start() - ctx)
        e = min(len(text), m.end() + ctx)
        frag = (("…" if s > 0 else "") + text[s:e].strip()
                + ("…" if e < len(text) else ""))
        key = frag.lower()
        if key in seen:
            continue
        seen.add(key)
        out.append(frag)
        if len(out) >= limit:
            break
    return out


# --------------------------------------------------------------------------- #
# S1 - abstract-noun voice (context-aware)                                     #
# --------------------------------------------------------------------------- #
def _score_abstract(prose: str, cfg: dict):
    nouns = cfg["abstractNouns"]
    allow = cfg["industryAllowlist"]
    alt = "|".join(re.escape(n) for n in nouns)
    rx = re.compile(r"\b(the|a|an)\s+(" + alt + r")\b", re.I)
    hits = []
    examples = []
    for sent in _sentences(prose):
        if not sent:
            continue
        low = sent.lower()
        persona = bool(_HONORIFIC_RE.search(sent) or _COMPANY_RE.search(sent))
        for m in rx.finditer(sent):
            noun = m.group(2).lower()
            # Definition guard: "a landlord is/means ..." is a definition, not voice.
            tail = sent[m.end():].lstrip().lower()
            if tail.startswith(_DEFN_STARTS):
                continue
            # Industry-term guard: legit professional term in context.
            if any(tok in low for tok in allow.get(noun, [])):
                continue
            # Persona guard: a named person/company in the sentence.
            if persona:
                continue
            hits.append(noun)
            if len(examples) < 6:
                s = max(0, m.start() - 8)
                e = min(len(sent), m.end() + 40)
                examples.append(sent[s:e].strip())
    return hits, examples


# --------------------------------------------------------------------------- #
# Core scan                                                                    #
# --------------------------------------------------------------------------- #
def _is_pillar(slug: str, fm: dict, cfg: dict) -> bool:
    if isinstance(fm.get("pillar"), bool) and fm.get("pillar"):
        return True
    if slug in (cfg.get("pillarSlugs") or []):
        return True
    return bool(re.search(r"pillar", slug, re.I))


def scan_page(slug: str, site: str = "property", cfg: dict | None = None,
              raw: str | None = None) -> dict:
    cfg = cfg or load_voice_config(site)
    if raw is None:
        path = _blog_dir(site) / f"{slug}.md"
        if not path.exists():
            raise FileNotFoundError(f"blog page not found: {path}")
        raw = path.read_text(encoding="utf-8")

    fm_text, body = _split_frontmatter(raw)
    try:
        fm = yaml.safe_load(fm_text) if fm_text else {}
    except Exception:
        fm = {}
    if not isinstance(fm, dict):
        fm = {}

    body_prose = _render_prose(body)
    summary = str(fm.get("summary") or "")
    h1 = str(fm.get("h1") or "")
    meta_title = str(fm.get("metaTitle") or "")
    meta_desc = str(fm.get("metaDescription") or "")
    faqs = fm.get("faqs") or []
    faq_text = ""
    if isinstance(faqs, list):
        faq_text = " ".join(
            f"{f.get('question', '')} {f.get('answer', '')}"
            for f in faqs if isinstance(f, dict))

    # Prose stream for the text signals (reader-facing narrative).
    prose = " ".join([summary, body_prose, faq_text]).strip()
    prose_words = max(1, len(prose.split()))
    body_words = len(body_prose.split())
    # Em-dashes counted across every reader-facing field.
    emdash_text = " ".join([meta_title, meta_desc, h1, summary, body_prose, faq_text])

    # S1
    s1_hits, s1_examples = _score_abstract(prose, cfg)
    s1_count = len(s1_hits)
    s1_per_1k = round(s1_count / prose_words * 1000, 2)
    # S2
    s2_count = len(_META_RE.findall(prose))
    # S3
    s3_count = len(_STRUCT_RE.findall(prose))
    # S4
    s4_count = len(_EMDASH_RE.findall(emdash_text))
    # S5
    s5_count = len(_SIGN_RE.findall(prose))
    s5_per_1k = round(s5_count / prose_words * 1000, 2)
    # S6
    is_pillar = _is_pillar(slug, fm, cfg)
    ideal = cfg["lengthIdeal"]["pillar"] if is_pillar else cfg["lengthIdeal"]["nonPillar"]
    over = max(0.0, (body_words - ideal) / ideal) if ideal else 0.0

    sat = cfg["saturation"]
    w = cfg["weights"]
    sat1 = min(1.0, s1_per_1k / sat["s1"]) if sat["s1"] else 0.0
    sat2 = min(1.0, s2_count / sat["s2"]) if sat["s2"] else 0.0
    sat3 = min(1.0, s3_count / sat["s3"]) if sat["s3"] else 0.0
    sat4 = min(1.0, s4_count / sat["s4"]) if sat["s4"] else 0.0
    sat5 = min(1.0, s5_per_1k / sat["s5"]) if sat["s5"] else 0.0
    sat6 = min(1.0, over)

    robot = 100.0 * (w["s1"] * sat1 + w["s2"] * sat2 + w["s3"] * sat3
                     + w["s4"] * sat4 + w["s5"] * sat5 + w["s6"] * sat6)
    robot = round(robot, 1)
    b = cfg["bands"]
    if robot >= b["severe"]:
        band = "severe"
    elif robot >= b["robotic"]:
        band = "robotic"
    elif robot >= b["minor"]:
        band = "minor"
    else:
        band = "clean"

    # Floor rules: meta-commentary (S2), structural/SEO talk (S3) and em-dashes
    # (S4) are zero-false-positive defects and the user's explicit complaint, so
    # their presence escalates the band regardless of the density score - a page
    # that says "this guide covers" or leaks "bucket sibling page C5" is never
    # "clean", and a meta/structural-heavy page is at least "robotic".
    def _raise(cur: str, floor: str) -> str:
        return cur if BAND_ORDER.index(cur) >= BAND_ORDER.index(floor) else floor

    if (s2_count + s3_count) >= b.get("metaFloorRobotic", 4):
        band = _raise(band, "robotic")
    elif (s2_count + s3_count + s4_count) >= 1:
        band = _raise(band, "minor")

    return {
        "slug": slug,
        "robot_score": robot,
        "band": band,
        "s1_abstract_nouns": {"count": s1_count, "per_1k": s1_per_1k,
                              "nouns": sorted(set(s1_hits)), "examples": s1_examples},
        "s2_meta_commentary": {"count": s2_count,
                               "examples": _snippets(_META_RE, prose)},
        "s3_structural_talk": {"count": s3_count,
                               "examples": _snippets(_STRUCT_RE, prose)},
        "s4_em_dashes": {"count": s4_count,
                         "examples": _snippets(_EMDASH_RE, emdash_text, limit=4)},
        "s5_signposting": {"count": s5_count, "per_1k": s5_per_1k,
                           "examples": _snippets(_SIGN_RE, prose)},
        "s6_length": {"body_words": body_words, "is_pillar": is_pillar,
                      "ideal": ideal, "over_ideal_pct": round(over, 3)},
        "subscores": {"s1": round(sat1, 3), "s2": round(sat2, 3), "s3": round(sat3, 3),
                      "s4": round(sat4, 3), "s5": round(sat5, 3), "s6": round(sat6, 3)},
    }


# --------------------------------------------------------------------------- #
# Output helpers                                                               #
# --------------------------------------------------------------------------- #
def _sha(path: pathlib.Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def _print_human(res: dict) -> None:
    print(f"\nVoice scan: {res['slug']}")
    print("=" * 70)
    print(f"  robot_score : {res['robot_score']}   band: {res['band'].upper()}")
    s1 = res["s1_abstract_nouns"]
    print(f"  S1 abstract-noun voice : {s1['count']} ({s1['per_1k']}/1k)  {s1['nouns']}")
    for ex in s1["examples"][:4]:
        print(f"         | {ex}")
    s2 = res["s2_meta_commentary"]
    print(f"  S2 meta-commentary     : {s2['count']}")
    for ex in s2["examples"][:4]:
        print(f"         | {ex}")
    s3 = res["s3_structural_talk"]
    print(f"  S3 structural/SEO talk : {s3['count']}")
    for ex in s3["examples"][:4]:
        print(f"         | {ex}")
    s4 = res["s4_em_dashes"]
    print(f"  S4 em-dashes           : {s4['count']}")
    s5 = res["s5_signposting"]
    print(f"  S5 signposting         : {s5['count']} ({s5['per_1k']}/1k)")
    for ex in s5["examples"][:4]:
        print(f"         | {ex}")
    s6 = res["s6_length"]
    print(f"  S6 length              : {s6['body_words']} body words "
          f"(ideal {s6['ideal']}, pillar={s6['is_pillar']}, "
          f"over={int(s6['over_ideal_pct'] * 100)}%)")


def _scan_all(site: str, cfg: dict, limit: int | None = None) -> list[dict]:
    blog = _blog_dir(site)
    files = sorted(blog.glob("*.md"))
    if limit:
        files = files[:limit]
    rows = []
    for f in files:
        slug = f.stem
        try:
            raw = f.read_text(encoding="utf-8")
            res = scan_page(slug, site, cfg, raw=raw)
        except Exception as e:  # never let one bad file abort the sweep
            print(f"  WARN: {slug}: {e}", file=sys.stderr)
            continue
        res["sha256"] = _sha(f)
        rows.append(res)
    rows.sort(key=lambda r: -r["robot_score"])
    return rows


def _flat(res: dict) -> dict:
    """Compact per-slug record for the manifest/CSV."""
    return {
        "slug": res["slug"],
        "sha256": res.get("sha256"),
        "robot_score": res["robot_score"],
        "band": res["band"],
        "s1_count": res["s1_abstract_nouns"]["count"],
        "s1_per_1k": res["s1_abstract_nouns"]["per_1k"],
        "s2_count": res["s2_meta_commentary"]["count"],
        "s3_count": res["s3_structural_talk"]["count"],
        "s4_count": res["s4_em_dashes"]["count"],
        "s5_count": res["s5_signposting"]["count"],
        "s5_per_1k": res["s5_signposting"]["per_1k"],
        "body_words": res["s6_length"]["body_words"],
        "over_ideal_pct": res["s6_length"]["over_ideal_pct"],
    }


def _write_manifest(site: str, cfg: dict, rows: list[dict]) -> pathlib.Path:
    CACHE.mkdir(parents=True, exist_ok=True)
    out = CACHE / f"voice_scan_{site}.json"
    payload = {
        "site": site,
        "ts": time.time(),
        "config": {"weights": cfg["weights"], "saturation": cfg["saturation"],
                   "bands": cfg["bands"], "lengthIdeal": cfg["lengthIdeal"]},
        "pages": [dict(_flat(r),
                       examples={
                           "s1": r["s1_abstract_nouns"]["examples"],
                           "s2": r["s2_meta_commentary"]["examples"],
                           "s3": r["s3_structural_talk"]["examples"],
                           "s5": r["s5_signposting"]["examples"]})
                  for r in rows],
    }
    out.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")
    return out


def _band_dist(rows: list[dict]) -> dict:
    d = {b: 0 for b in BAND_ORDER}
    for r in rows:
        d[r["band"]] = d.get(r["band"], 0) + 1
    return d


# --------------------------------------------------------------------------- #
# Self-test                                                                    #
# --------------------------------------------------------------------------- #
def _selftest() -> int:
    cfg = load_voice_config("property")

    def mk(body, **fm):
        front = {"title": "t", "slug": "s"}
        front.update(fm)
        fmt = "\n".join(f"{k}: \"{v}\"" if isinstance(v, str) else f"{k}: {v}"
                        for k, v in front.items())
        return f"---\n{fmt}\n---\n{body}"

    cases = [
        ("S1 hit: 'the landlord must file'",
         mk("<p>The landlord must file a return by 31 January each year.</p>"),
         lambda r: r["s1_abstract_nouns"]["count"] >= 1),
        ("S1 no-hit (persona): 'Mr Quayle, the landlord'",
         mk("<p>Mr Quayle, the landlord, must file a return by 31 January.</p>"),
         lambda r: r["s1_abstract_nouns"]["count"] == 0),
        ("S1 no-hit (industry term): 'the operator of serviced accommodation'",
         mk("<p>The operator of serviced accommodation charges VAT on the supply.</p>"),
         lambda r: r["s1_abstract_nouns"]["count"] == 0),
        ("S1 no-hit (IHT donor): 'the donor makes a gift'",
         mk("<p>The donor makes a gift and survives seven years for IHT relief.</p>"),
         lambda r: r["s1_abstract_nouns"]["count"] == 0),
        ("S1 no-hit (definition): 'a donor is a person who...'",
         mk("<p>A donor is a person who makes a transfer of value.</p>"),
         lambda r: r["s1_abstract_nouns"]["count"] == 0),
        ("S2 hit: 'This guide covers'",
         mk("<p>This guide covers everything about capital allowances.</p>"),
         lambda r: r["s2_meta_commentary"]["count"] >= 1),
        ("S2 hit: 'the page's first concrete artefact'",
         mk("<p>The table is the page's first concrete artefact for readers.</p>"),
         lambda r: r["s2_meta_commentary"]["count"] >= 1),
        ("S3 hit: 'see our pillar page'",
         mk("<p>For the framing see our pillar page on property tax rates.</p>"),
         lambda r: r["s3_structural_talk"]["count"] >= 1),
        ("S3 no-hit (normal cross-ref): 'see our NRL scheme guide'",
         mk("<p>For withholding see our NRL scheme guide for the detail.</p>"),
         lambda r: r["s3_structural_talk"]["count"] == 0),
        ("S5 hit: 'Moreover'",
         mk("<p>Moreover, the relief tapers after the first year of ownership.</p>"),
         lambda r: r["s5_signposting"]["count"] >= 1),
        ("S4 hit: em-dash present",
         mk("<p>The rate is 20 percent — the basic rate — on the rent.</p>"),
         lambda r: r["s4_em_dashes"]["count"] >= 1),
        ("table cells excluded from S1",
         mk("<table><tr><td>The landlord</td><td>The taxpayer</td></tr></table>"
            "<p>You report the rent on a Self Assessment return.</p>"),
         lambda r: r["s1_abstract_nouns"]["count"] == 0),
    ]

    all_ok = True
    for label, raw, check in cases:
        res = scan_page("selftest", "property", cfg, raw=raw)
        ok = check(res)
        all_ok = all_ok and ok
        flag = "PASS" if ok else "FAIL"
        print(f"  [{flag}] {label}")
        if not ok:
            print(f"         got: score={res['robot_score']} "
                  f"s1={res['s1_abstract_nouns']['count']} "
                  f"s2={res['s2_meta_commentary']['count']} "
                  f"s3={res['s3_structural_talk']['count']} "
                  f"s4={res['s4_em_dashes']['count']} "
                  f"s5={res['s5_signposting']['count']}")
    print("\nSELFTEST:", "PASS" if all_ok else "FAIL")
    return 0 if all_ok else 1


# --------------------------------------------------------------------------- #
# CLI                                                                          #
# --------------------------------------------------------------------------- #
def main() -> int:
    ap = argparse.ArgumentParser(description="Deterministic humanness scanner (Humanise Engine).")
    ap.add_argument("--slug", help="Page slug (filename without .md)")
    ap.add_argument("--site", default="property",
                    help="site key (resolves blog dir from sites/<site>.json; default property)")
    ap.add_argument("--json", action="store_true", help="Emit JSON for the single page.")
    ap.add_argument("--all", action="store_true",
                    help="Scan the whole corpus, write the ranked manifest, print a summary.")
    ap.add_argument("--worst", type=int, metavar="N",
                    help="Scan all and print the worst N slugs.")
    ap.add_argument("--limit", type=int, help="(with --all) only scan the first N files.")
    ap.add_argument("--csv", help="(with --all) also write a flat CSV to this path.")
    ap.add_argument("--compare", action="store_true",
                    help="(with --all/--worst) print robot_score deltas vs --baseline.")
    ap.add_argument("--baseline", help="path to a prior voice_scan_<site>.json for --compare.")
    ap.add_argument("--gate", action="store_true",
                    help="(with --slug) exit 2 if band >= --gate-band.")
    ap.add_argument("--gate-band", default="robotic", choices=BAND_ORDER,
                    help="band threshold for --gate (default robotic).")
    ap.add_argument("--selftest", action="store_true", help="Run fixtures (no files) and exit.")
    args = ap.parse_args()

    if args.selftest:
        return _selftest()

    cfg = load_voice_config(args.site)

    if args.all or args.worst is not None:
        rows = _scan_all(args.site, cfg, limit=args.limit)
        baseline = {}
        if args.compare and args.baseline:
            try:
                bl = json.loads(pathlib.Path(args.baseline).read_text(encoding="utf-8"))
                baseline = {p["slug"]: p["robot_score"] for p in bl.get("pages", [])}
            except Exception as e:
                print(f"  WARN: could not read baseline: {e}", file=sys.stderr)

        if args.all:
            out = _write_manifest(args.site, cfg, rows)
            dist = _band_dist(rows)
            print(f"\nVoice scan ({args.site}): {len(rows)} pages -> {out}")
            print(f"  bands: clean={dist['clean']}  minor={dist['minor']}  "
                  f"robotic={dist['robotic']}  severe={dist['severe']}")
            actionable = [r for r in rows if r["band"] in ("robotic", "severe")]
            print(f"  actionable (robotic+severe): {len(actionable)}")

        topn = args.worst if args.worst is not None else 20
        print(f"\n  Worst {min(topn, len(rows))}:")
        for r in rows[:topn]:
            line = (f"    {r['robot_score']:>5}  {r['band']:<7} {r['slug']}"
                    f"  [s1={r['s1_abstract_nouns']['count']} "
                    f"s2={r['s2_meta_commentary']['count']} "
                    f"s3={r['s3_structural_talk']['count']} "
                    f"s4={r['s4_em_dashes']['count']} "
                    f"s5={r['s5_signposting']['count']} "
                    f"w={r['s6_length']['body_words']}]")
            if baseline and r["slug"] in baseline:
                delta = round(r["robot_score"] - baseline[r["slug"]], 1)
                line += f"  (was {baseline[r['slug']]}, {'+' if delta >= 0 else ''}{delta})"
            print(line)

        if args.csv and args.all:
            import csv
            with open(args.csv, "w", newline="", encoding="utf-8") as fh:
                wr = csv.writer(fh)
                wr.writerow(["slug", "robot_score", "band", "s1_count", "s1_per_1k",
                             "s2_count", "s3_count", "s4_count", "s5_count", "s5_per_1k",
                             "body_words", "over_ideal_pct"])
                for r in rows:
                    fr = _flat(r)
                    wr.writerow([fr[k] for k in ("slug", "robot_score", "band",
                                 "s1_count", "s1_per_1k", "s2_count", "s3_count",
                                 "s4_count", "s5_count", "s5_per_1k", "body_words",
                                 "over_ideal_pct")])
            print(f"  CSV -> {args.csv}")
        return 0

    if not args.slug:
        ap.error("one of --slug / --all / --worst / --selftest is required")

    res = scan_page(args.slug, args.site, cfg)
    if args.json:
        print(json.dumps(res, indent=2, ensure_ascii=False))
    else:
        _print_human(res)

    if args.gate:
        if BAND_ORDER.index(res["band"]) >= BAND_ORDER.index(args.gate_band):
            return 2
    return 0


if __name__ == "__main__":
    sys.exit(main())
