"""
HTML fetch + full text-level extraction -> page_content_map.

Philosophy: we read each page the same way a doctor reads an X-ray.
Not "heading present", but "this heading covers this topic with these
figures; the query term appears N times in this section." Every signal
is stored at the content grain, not the descriptor grain.

Security: delegates all HTTP fetching to _fetch.py (SSRF protection,
robots.txt compliance, rate limiting). HTML is discarded after extraction.
"""
from __future__ import annotations

import json
import re
from datetime import date
from typing import Any
from urllib.parse import urljoin, urlparse

from bs4 import BeautifulSoup, NavigableString, Tag

from optimisation_engine.competitor._db import _arr, _esc, _jsonb, _sql
from optimisation_engine.competitor._fetch import fetch_url

# ---------------------------------------------------------------------------
# Stop words for query tokenisation
# ---------------------------------------------------------------------------
_STOP_WORDS = frozenset(
    "a an the and or but in on at to for of is are was were be been "
    "have has had do does did will would could should may might shall "
    "it its this that these those with from by about into through over "
    "under after before between us our your their we they he she i me "
    "my you him her we them our".split()
)

# Common UK accounting/finance abbreviations to always include in query coverage
_FINANCE_ABBREVS = frozenset(
    "CGT SDLT IHT MTD IR35 CIS VAT NI PAYE ISA SIPP LLC LLP Ltd "
    "HMRC ICAEW ACCA CTA FCCA FCA AIA AIA RICS BES EIS SEIS R&D".split()
)

# Noise elements to strip before extraction
_STRIP_TAGS = {"script", "style", "nav", "header", "footer", "aside",
               "noscript", "iframe", "form", "button"}

# Class/id patterns for cookie banners, modals, ads
_NOISE_PATTERNS = re.compile(
    r"cookie|consent|gdpr|popup|modal|banner|overlay|newsletter|"
    r"subscribe|sidebar|widget|advertisement|ad-|ads-|social-share",
    re.IGNORECASE,
)

# Patterns for signal extraction
_FIGURE_RE = re.compile(
    r"£[\d,]+(?:\.\d+)?[kmb]?|\d+(?:\.\d+)?%|\d+\s*(?:days?|months?|years?|hours?|weeks?)"
    r"|\b\d{4}-\d{2}-\d{2}\b",
    re.IGNORECASE,
)
_LEGISLATION_RE = re.compile(
    r"(?:Finance(?:\s+Act)?|TCGA|SDLT|IHTA|ITTOIA|ITA|CTA|CAA|SI|S\.?I\.?|VATA)\s+\d{4}"
    r"(?:/\d+)?(?:\s+s\.\s*\d+)?",
    re.IGNORECASE,
)
_DEADLINE_RE = re.compile(
    r"\d{1,2}\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)"
    r"\s+\d{4}|\d+\s*(?:days?|months?|years?)\s+(?:after|from|of|following)",
    re.IGNORECASE,
)
_PHONE_RE = re.compile(r"(?:0\d{3,4}[\s-]?\d{3,4}[\s-]?\d{3,4}|0800\s*\d+|\+44\s*\d+)")
_CREDENTIAL_RE = re.compile(
    r"\b(?:ACA|FCA|FCCA|ACCA|CTA|ICAEW|CIMA|ATT|AAT|FRICS|RICS|CFA|CPA|MBA)\b"
)
_HMRC_DOMAIN_RE = re.compile(r"hmrc\.gov\.uk|legislation\.gov\.uk|gov\.uk/government|icaew\.com|acca\.global")

# Example indicators
_EXAMPLE_RE = re.compile(
    r"\bworked\s+example\b|\bexample\b|\bcase\s+study\b|\bscenario\b|\billustrat",
    re.IGNORECASE,
)

# Credentials patterns near author name
_AUTHOR_CRED_RE = re.compile(r"[A-Z]{2,6}(?:\s*,\s*[A-Z]{2,6})*")


# ---------------------------------------------------------------------------
# HTML normalisation
# ---------------------------------------------------------------------------

def _strip_noise(soup: BeautifulSoup) -> None:
    """Remove noise tags + elements with noise class/id patterns."""
    for tag in soup.find_all(_STRIP_TAGS):
        tag.decompose()
    for tag in soup.find_all(True):
        if not hasattr(tag, "attrs") or tag.attrs is None:
            continue
        classes = " ".join(tag.get("class") or [])
        id_val = tag.get("id") or ""
        if _NOISE_PATTERNS.search(classes + " " + id_val):
            tag.decompose()


def _find_main_zone(soup: BeautifulSoup) -> Tag:
    """Find the main content zone. Returns <body> as final fallback."""
    # Priority order per the spec
    for selector in [
        ("tag", "main"),
        ("tag", "article"),
    ]:
        el = soup.find(selector[1])
        if el:
            return el  # type: ignore[return-value]

    for cls_pattern in [
        "post-content", "entry-content", "article-content",
        "page-content", "blog-content", "content-body",
        "main-content", "the-content",
    ]:
        el = soup.find(class_=re.compile(cls_pattern, re.I))
        if el:
            return el  # type: ignore[return-value]

    for id_pattern in ["main-content", "content", "article", "post", "page"]:
        el = soup.find(id=re.compile(rf"^{id_pattern}$", re.I))
        if el:
            return el  # type: ignore[return-value]

    return soup.body or soup  # type: ignore[return-value]


# ---------------------------------------------------------------------------
# Signal extractors
# ---------------------------------------------------------------------------

def _text(el: Tag) -> str:
    return (el.get_text(separator=" ", strip=True) if el else "")


def _extract_figures(text: str) -> list[str]:
    return list(dict.fromkeys(_FIGURE_RE.findall(text)))[:20]


def _extract_legislation(text: str) -> list[str]:
    return list(dict.fromkeys(_LEGISLATION_RE.findall(text)))[:10]


def _extract_deadlines(text: str) -> list[str]:
    return list(dict.fromkeys(_DEADLINE_RE.findall(text)))[:10]


def _query_tokens(query: str) -> list[str]:
    """Tokenise a query into significant terms + finance abbreviations."""
    tokens: list[str] = []
    for word in query.split():
        clean = re.sub(r"[^\w£%]", "", word)
        if len(clean) >= 3 and clean.lower() not in _STOP_WORDS:
            tokens.append(clean)
    # Add any finance abbreviations that appear in the query verbatim
    for abbr in _FINANCE_ABBREVS:
        if abbr.lower() in query.lower() and abbr not in tokens:
            tokens.append(abbr)
    return list(dict.fromkeys(tokens))


def _count_query_variants(text: str, query: str) -> dict[str, int]:
    """Count occurrences of each query token in the full page text."""
    tokens = _query_tokens(query)
    coverage: dict[str, int] = {}
    text_lower = text.lower()
    for token in tokens:
        coverage[token] = text_lower.count(token.lower())
    return coverage


def _find_variants_in_section(section_text: str, query: str) -> list[str]:
    tokens = _query_tokens(query)
    sl = section_text.lower()
    return [t for t in tokens if t.lower() in sl]


# ---------------------------------------------------------------------------
# Section breakdown
# ---------------------------------------------------------------------------

def _extract_sections(zone: Tag, query: str | None) -> list[dict]:
    sections: list[dict] = []
    current: dict | None = None
    current_h2: dict | None = None

    for el in zone.find_all(["h2", "h3", "p", "ul", "ol", "table", "blockquote"]):
        level_name = el.name
        if level_name == "h2":
            if current_h2:
                sections.append(_finalise_section(current_h2, query))
            current_h2 = _new_section(2, _text(el))
            current = current_h2
        elif level_name == "h3":
            if current_h2 is None:
                # Orphan H3 before any H2 — treat as top-level
                current_h2 = _new_section(3, _text(el))
                current = current_h2
            else:
                sub = _new_section(3, _text(el))
                current_h2.setdefault("_subsections", []).append(sub)
                current = sub
        else:
            target = current or (current_h2 if current_h2 else None)
            if target is None:
                continue
            chunk = _text(el)
            target["_parts"].append(chunk)
            if level_name == "table":
                target["has_table"] = True
            if level_name in ("ul", "ol"):
                target["has_list"] = True

    if current_h2:
        sections.append(_finalise_section(current_h2, query))

    return sections


def _new_section(level: int, heading: str) -> dict:
    return {
        "level": level,
        "heading": heading,
        "has_table": False,
        "has_list": False,
        "_parts": [],
        "_subsections": [],
    }


def _finalise_section(s: dict, query: str | None) -> dict:
    full_text = " ".join(s.pop("_parts", []))
    raw_subs = s.pop("_subsections", [])

    out: dict[str, Any] = {
        "level": s["level"],
        "heading": s["heading"],
        "word_count": len(full_text.split()),
        "content_text": full_text[:400],
        "figures_in_section": _extract_figures(full_text),
        "legislation_in_section": _extract_legislation(full_text),
        "has_example": bool(_EXAMPLE_RE.search(s["heading"] + " " + full_text)),
        "has_table": s["has_table"],
        "has_list": s["has_list"],
    }
    if query:
        variants = _find_variants_in_section(full_text, query)
        out["query_variants_found"] = variants
        text_lower = full_text.lower()
        out["query_mentions"] = sum(text_lower.count(v.lower()) for v in variants)

    if raw_subs:
        out["subsections"] = [_finalise_section(sub, query) for sub in raw_subs]

    return out


# ---------------------------------------------------------------------------
# FAQ extraction
# ---------------------------------------------------------------------------

def _extract_faqs(soup: BeautifulSoup, zone: Tag) -> list[dict]:
    faqs: list[dict] = []

    # 1. JSON-LD FAQPage schema
    for script in soup.find_all("script", type="application/ld+json"):
        try:
            data = json.loads(script.string or "")
        except (json.JSONDecodeError, TypeError):
            continue
        nodes = data if isinstance(data, list) else [data]
        # ponytail: flatten @graph — same pattern as deep_extract._schema_types
        items = []
        for n in nodes:
            if isinstance(n, dict) and "@graph" in n:
                items.extend(n["@graph"])
            else:
                items.append(n)
        for item in items:
            _t = item.get("@type", "")
            if _t == "FAQPage" or (isinstance(_t, list) and "FAQPage" in _t):
                for qa in (item.get("mainEntity") or []):
                    q_text = qa.get("name") or ""
                    a_block = qa.get("acceptedAnswer") or {}
                    a_text = a_block.get("text") or ""
                    if q_text:
                        faqs.append({
                            "source": "schema",
                            "question": q_text,
                            "answer": a_text[:400],
                            "word_count": len(a_text.split()),
                        })

    # 2. HTML FAQ patterns (details/summary, dt/dd, question classes)
    # details/summary pattern
    for detail in zone.find_all("details"):
        q_el = detail.find("summary")
        if not q_el:
            continue
        q_text = _text(q_el)
        # Answer = everything except the summary
        q_el.decompose()
        a_text = _text(detail)
        faqs.append({
            "source": "html",
            "question": q_text,
            "answer": a_text[:400],
            "word_count": len(a_text.split()),
        })

    # Accordion: divs with "question" in class
    for faq_el in zone.find_all(class_=re.compile(r"faq|question|accordion", re.I)):
        q_el = faq_el.find(class_=re.compile(r"question|title|header", re.I))
        a_el = faq_el.find(class_=re.compile(r"answer|content|body|panel", re.I))
        if q_el and a_el:
            q_text = _text(q_el)
            a_text = _text(a_el)
            if q_text and len(q_text) > 10:
                faqs.append({
                    "source": "html",
                    "question": q_text,
                    "answer": a_text[:400],
                    "word_count": len(a_text.split()),
                })

    # dl/dt/dd — our own property template uses this pattern
    for dl in zone.find_all("dl"):
        dts = dl.find_all("dt")
        dds = dl.find_all("dd")
        for dt, dd in zip(dts, dds):
            q_text = _text(dt)
            a_text = _text(dd)
            if q_text:
                faqs.append({
                    "source": "html",
                    "question": q_text,
                    "answer": a_text[:400],
                    "word_count": len(a_text.split()),
                })

    # Deduplicate by question text
    seen: set[str] = set()
    unique: list[dict] = []
    for f in faqs:
        key = f["question"].strip().lower()[:80]
        if key not in seen:
            seen.add(key)
            unique.append(f)
    return unique


# ---------------------------------------------------------------------------
# Schema extraction
# ---------------------------------------------------------------------------

def _extract_schema(soup: BeautifulSoup) -> dict:
    schema_types: list[str] = []
    faq_pairs: list[dict] = []
    howto_steps: list[dict] | None = None
    article_meta: dict = {}

    for script in soup.find_all("script", type="application/ld+json"):
        try:
            data = json.loads(script.string or "")
        except (json.JSONDecodeError, TypeError):
            continue
        nodes = data if isinstance(data, list) else [data]
        # ponytail: flatten @graph — same pattern as deep_extract._schema_types
        items = []
        for n in nodes:
            if isinstance(n, dict) and "@graph" in n:
                items.extend(n["@graph"])
            else:
                items.append(n)
        for item in items:
            t = item.get("@type") or ""
            if isinstance(t, list):
                schema_types.extend(t)
            else:
                schema_types.append(t)

            if t == "FAQPage":
                for qa in (item.get("mainEntity") or []):
                    q = qa.get("name") or ""
                    a_block = qa.get("acceptedAnswer") or {}
                    a = a_block.get("text") or ""
                    if q:
                        faq_pairs.append({"question": q, "answer": a[:300]})

            if t == "HowTo":
                steps = item.get("step") or []
                howto_steps = [
                    {"name": s.get("name") or "", "text": (s.get("text") or "")[:200]}
                    for s in steps
                ]

            if t in ("Article", "BlogPosting", "NewsArticle"):
                author = item.get("author") or {}
                if isinstance(author, list):
                    author = author[0] if author else {}
                article_meta = {
                    "author": (author.get("name") if isinstance(author, dict) else ""),
                    "datePublished": item.get("datePublished"),
                    "dateModified": item.get("dateModified"),
                }

    return {
        "types": list(dict.fromkeys(t for t in schema_types if t)),
        "faq_pairs": faq_pairs,
        "howto_steps": howto_steps,
        "article_metadata": article_meta or None,
    }


# ---------------------------------------------------------------------------
# E-E-A-T signals
# ---------------------------------------------------------------------------

def _extract_eeat(soup: BeautifulSoup, page_url: str) -> dict:
    eeat: dict[str, Any] = {
        "author_name": None,
        "author_credentials": None,
        "author_bio_text": None,
        "reviewer_name": None,
        "last_updated_text": None,
        "last_updated_date": None,
        "organisation_credentials": [],
        "external_citations": [],
        "disclaimer_text": None,
        "social_proof_text": None,
    }

    # Author via rel="author"
    author_link = soup.find("a", rel=re.compile("author", re.I))
    if author_link:
        eeat["author_name"] = _text(author_link)

    # Author via class
    if not eeat["author_name"]:
        for el in soup.find_all(class_=re.compile(r"\bauthor\b", re.I)):
            name = _text(el)
            if 3 < len(name) < 60:
                eeat["author_name"] = name
                # Look for credentials nearby
                parent_text = _text(el.parent) if el.parent else ""
                creds = _CREDENTIAL_RE.findall(parent_text)
                if creds:
                    eeat["author_credentials"] = ", ".join(creds[:5])
                break

    # Author via schema
    for script in soup.find_all("script", type="application/ld+json"):
        try:
            data = json.loads(script.string or "")
        except (json.JSONDecodeError, TypeError):
            continue
        items = data if isinstance(data, list) else [data]
        for item in items:
            author = item.get("author")
            if author and not eeat["author_name"]:
                if isinstance(author, list):
                    author = author[0] if author else {}
                if isinstance(author, dict):
                    eeat["author_name"] = author.get("name")

    # Last updated
    time_el = soup.find("time")
    if time_el:
        eeat["last_updated_text"] = _text(time_el)
        eeat["last_updated_date"] = time_el.get("datetime")
    else:
        full_text = soup.get_text(" ", strip=True)
        updated_m = re.search(
            r"(?:last\s+(?:updated|reviewed|modified)|updated|published)[:\s]+([A-Za-z]+ \d{4}|\d{1,2} [A-Za-z]+ \d{4}|\d{4}-\d{2}-\d{2})",
            full_text, re.IGNORECASE,
        )
        if updated_m:
            eeat["last_updated_text"] = updated_m.group(0)[:80]

    # External citations (authoritative domains only)
    base_domain = (urlparse(page_url).netloc or "").lower()
    for link in soup.find_all("a", href=True):
        href = link["href"]
        if _HMRC_DOMAIN_RE.search(href) and base_domain not in href:
            eeat["external_citations"].append({
                "url": href[:200],
                "anchor_text": _text(link)[:100],
            })
    eeat["external_citations"] = eeat["external_citations"][:10]

    # Organisation credentials (ICAEW / FCA regulated etc.)
    body_text = soup.get_text(" ", strip=True)
    org_creds_pattern = re.compile(
        r"(?:ICAEW|FCA|regulated|Chartered|member\s+firm|authorised\s+by)[^\n.]{0,80}",
        re.IGNORECASE,
    )
    org_creds = org_creds_pattern.findall(body_text)
    eeat["organisation_credentials"] = list(dict.fromkeys(org_creds[:5]))

    # Disclaimer
    for el in soup.find_all(class_=re.compile(r"disclaimer|notice|legal", re.I)):
        eeat["disclaimer_text"] = _text(el)[:300]
        break

    # Social proof
    for el in soup.find_all(class_=re.compile(r"testimonial|review|trust|social-proof|stats", re.I)):
        t = _text(el)
        if len(t) > 20:
            eeat["social_proof_text"] = t[:200]
            break

    return eeat


# ---------------------------------------------------------------------------
# CTA inventory
# ---------------------------------------------------------------------------

def _position_ratio(el: Tag, soup: BeautifulSoup) -> float:
    """Approximate position through document as 0.0–1.0."""
    try:
        full = str(soup)
        el_str = str(el)
        pos = full.find(el_str)
        if pos < 0:
            return 0.5
        return round(pos / len(full), 2)
    except Exception:
        return 0.5


def _detect_cta_type(el: Tag) -> str:
    tag = el.name
    classes = " ".join(el.get("class") or []).lower()
    if tag == "button":
        return "button"
    if "btn" in classes or "button" in classes:
        return "button"
    href = (el.get("href") or "").lower()
    if "contact" in href or "enqui" in href or "get-in-touch" in href:
        return "inline_link"
    style = (el.get("style") or "").lower()
    if "fixed" in style or "sticky" in style:
        return "sticky"
    parent_classes = " ".join((el.parent.get("class") or []) if el.parent else []).lower()
    if "banner" in parent_classes or "hero" in parent_classes:
        return "banner"
    return "inline_link"


def _extract_ctas(zone: Tag, soup: BeautifulSoup) -> list[dict]:
    ctas: list[dict] = []
    seen_texts: set[str] = set()

    for el in zone.find_all(["button", "a"]):
        tag = el.name
        classes = " ".join(el.get("class") or []).lower()
        href = (el.get("href") or "").lower()

        is_cta = False
        if tag == "button":
            is_cta = True
        elif tag == "a" and any(k in classes for k in ("btn", "button", "cta", "call-to-action")):
            is_cta = True
        elif tag == "a" and any(k in href for k in ("contact", "enqui", "get-in-touch", "free", "book", "consult", "quote", "start")):
            is_cta = True

        if not is_cta:
            continue

        text = _text(el)[:80]
        if not text or len(text) < 3 or text.lower() in seen_texts:
            continue
        seen_texts.add(text.lower())

        ctas.append({
            "text": text,
            "type": _detect_cta_type(el),
            "position_ratio": _position_ratio(el, soup),
        })

    return ctas[:20]


# ---------------------------------------------------------------------------
# Downloads / assets
# ---------------------------------------------------------------------------

def _extract_downloads(zone: Tag) -> list[dict]:
    assets: list[dict] = []
    for link in zone.find_all("a", href=True):
        href = link["href"].lower()
        text = _text(link)
        is_download = (
            href.endswith(".pdf")
            or "download" in href
            or link.get("download") is not None
            or any(k in text.lower() for k in ("download", "template", "checklist", "guide", "pdf"))
        )
        if not is_download:
            continue
        asset_type = "pdf" if href.endswith(".pdf") else "template" if "template" in text.lower() else "guide"
        # Gated = if there's an email/form reference nearby
        parent_text = _text(link.parent) if link.parent else ""
        gated = any(k in parent_text.lower() for k in ("email", "sign up", "register", "free access"))
        assets.append({
            "text": text[:80],
            "type": asset_type,
            "gated": gated,
        })
    return assets[:10]


# ---------------------------------------------------------------------------
# Interactive features
# ---------------------------------------------------------------------------

def _detect_features(zone: Tag) -> list[str]:
    features: list[str] = []
    html = str(zone).lower()
    text = zone.get_text(" ", strip=True).lower()

    if re.search(r"<(iframe|video)\b", html):
        features.append("video")
    if "infographic" in text or re.search(r'class="[^"]*infograph', html):
        features.append("infographic")
    if zone.find(["details"]) or re.search(r'class="[^"]*accordion', html) or re.search(r'class="[^"]*collapse', html):
        features.append("accordion")
    if re.search(r'class="[^"]*comparison|compare', html):
        features.append("comparison_tool")
    if re.search(r'class="[^"]*quiz|quiz', html):
        features.append("quiz")
    if re.search(r'class="[^"]*glossary|<dl\b', html):
        features.append("glossary")
    if re.search(r'class="[^"]*calculator|calc\b', html) or "calculator" in text:
        features.append("calculator")
    return features


# ---------------------------------------------------------------------------
# Social proof
# ---------------------------------------------------------------------------

def _detect_social_proof(zone: Tag) -> dict:
    html = str(zone).lower()
    text = zone.get_text(" ", strip=True)

    has_testimonials = bool(re.search(r'testimonial|review-quote|blockquote', html))
    has_star_rating = bool(re.search(r'rating|stars?|trustpilot|google-review', html))
    has_case_study = bool(re.search(r'case\s+study|client\s+story|success\s+story', html, re.I))
    has_client_logos = bool(re.search(r'client-logo|partner-logo|logo-grid|logo-strip', html))
    has_stats_block = bool(re.search(r'\d+\+?\s+(?:clients?|years?|reviews?|cases?)', text, re.I))

    social_proof_text = None
    for el in zone.find_all(class_=re.compile(r"testimonial|review|trust|social-proof|stats-block", re.I)):
        t = _text(el)
        if len(t) > 20:
            social_proof_text = t[:200]
            break

    return {
        "has_testimonials": has_testimonials,
        "has_star_rating": has_star_rating,
        "has_case_study": has_case_study,
        "has_client_logos": has_client_logos,
        "has_stats_block": has_stats_block,
        "social_proof_text": social_proof_text,
    }


# ---------------------------------------------------------------------------
# Layout signals
# ---------------------------------------------------------------------------

def _detect_layout(soup: BeautifulSoup, zone: Tag) -> dict:
    html = str(soup).lower()
    has_sidebar = bool(re.search(r'<aside\b|class="[^"]*sidebar', html))
    has_sticky = bool(re.search(r'position\s*:\s*(?:sticky|fixed)', html))
    has_breadcrumbs = bool(
        soup.find("nav", attrs={"aria-label": re.compile(r"breadcrumb", re.I)})
        or re.search(r'class="[^"]*breadcrumb', html)
    )
    uses_card_layout = bool(re.search(r'class="[^"]*(?:card|grid|tile)', html))
    has_hero = bool(re.search(r'class="[^"]*(?:hero|banner|jumbotron)', html))

    # First 5 content element types
    above_fold: list[str] = []
    for el in zone.find_all(["h1", "h2", "h3", "p", "ul", "ol", "button", "a", "img", "div"]):
        tag = el.name
        if tag == "a":
            classes = " ".join(el.get("class") or []).lower()
            if not any(k in classes for k in ("btn", "button", "cta")):
                continue
            tag = "cta_link"
        if tag == "div":
            continue
        above_fold.append(tag)
        if len(above_fold) >= 5:
            break

    return {
        "has_sidebar": has_sidebar,
        "has_sticky_element": has_sticky,
        "has_breadcrumbs_html": has_breadcrumbs,
        "uses_card_layout": uses_card_layout,
        "has_hero_section": has_hero,
        "above_fold_elements": above_fold,
    }


# ---------------------------------------------------------------------------
# Body structure sequence
# ---------------------------------------------------------------------------

def _body_structure(zone: Tag) -> list[str]:
    structure: list[str] = []
    TRACKED = {"h1", "h2", "h3", "h4", "p", "ul", "ol", "table", "blockquote", "figure", "form"}
    for el in zone.find_all(TRACKED):
        if el.name == "p":
            # Skip empty or very short paras
            t = el.get_text(strip=True)
            if len(t) < 10:
                continue
        if el.name == "form":
            structure.append("form")
        else:
            classes = " ".join(el.get("class") or []).lower()
            if el.name == "a" and any(k in classes for k in ("btn", "button", "cta")):
                structure.append("cta")
            else:
                structure.append(el.name)
    return structure[:80]  # cap at 80 elements


# ---------------------------------------------------------------------------
# Opening type detection
# ---------------------------------------------------------------------------

def _detect_opening_type(zone: Tag) -> str:
    els = zone.find_all(["h1", "h2", "p", "ul", "ol", "table", "div"], limit=5)
    for el in els[:3]:
        tag = el.name
        classes = " ".join(el.get("class") or []).lower()
        if tag == "h1":
            continue
        if tag in ("p",):
            text = _text(el)
            # Does it answer directly?
            if len(text) > 40 and any(text.startswith(w) for w in ("The ", "A ", "An ", "In ", "You ", "Your ")):
                return "direct_answer"
            return "preamble"
        if tag == "ul":
            return "stat_block"
        if "hero" in classes or "banner" in classes:
            return "hero_image"
        if "toc" in classes or "table-of-contents" in classes or "contents" in classes:
            return "toc"
    return "preamble"


# ---------------------------------------------------------------------------
# On-page SEO
# ---------------------------------------------------------------------------

def _onpage_seo(soup: BeautifulSoup, zone: Tag, query: str | None) -> dict:
    title_tag = _text(soup.find("title")) if soup.find("title") else ""
    meta_el = soup.find("meta", attrs={"name": "description"})
    meta_desc = (meta_el.get("content") or "") if meta_el else ""
    h1_el = zone.find("h1") or soup.find("h1")
    h1_text = _text(h1_el) if h1_el else ""

    # First paragraph
    first_para = ""
    for el in zone.find_all("p"):
        t = _text(el)
        if len(t) > 30:
            first_para = t[:200]
            break

    full_text = zone.get_text(" ", strip=True)
    word_count = len(full_text.split())

    # Internal vs external links
    base_netloc = ""
    canonical_el = soup.find("link", rel="canonical")
    canonical_url = (canonical_el.get("href") or "") if canonical_el else ""
    if canonical_url:
        base_netloc = (urlparse(canonical_url).netloc or "").lower()

    internal_links = 0
    external_links = 0
    for a in zone.find_all("a", href=True):
        href = a["href"]
        if href.startswith("#") or href.startswith("javascript"):
            continue
        netloc = (urlparse(href).netloc or "").lower()
        if not netloc or (base_netloc and base_netloc in netloc):
            internal_links += 1
        else:
            external_links += 1

    result = {
        "title_tag": title_tag,
        "meta_description": meta_desc,
        "h1_text": h1_text,
        "canonical_url": canonical_url,
        "word_count": word_count,
        "first_paragraph_text": first_para,
        "internal_link_count": internal_links,
        "external_link_count": external_links,
    }

    if query:
        tokens = _query_tokens(query)
        title_lower = title_tag.lower()
        h1_lower = h1_text.lower()
        para_lower = first_para.lower()
        full_lower = full_text.lower()

        result["query_in_title"] = any(t.lower() in title_lower for t in tokens)
        result["query_in_h1"] = any(t.lower() in h1_lower for t in tokens)
        result["query_in_first_para"] = any(t.lower() in para_lower for t in tokens)

        # Query density: total token mentions / word count
        total_mentions = sum(full_lower.count(t.lower()) for t in tokens)
        result["query_density_pct"] = round(total_mentions / word_count * 100, 2) if word_count else 0.0

    return result


# ---------------------------------------------------------------------------
# Main extraction entry point
# ---------------------------------------------------------------------------

def parse_page(
    url: str,
    primary_query: str | None = None,
    *,
    is_our_page: bool = False,
    site_key: str | None = None,
    html: str | None = None,
    http_status: int | None = None,
) -> dict:
    """Fetch and extract all signals from a page.

    If `html` is provided, skip the fetch (used for our own pages where we
    can read from the file system). Otherwise fetches via _fetch.fetch_url().

    Returns a flat dict matching the page_content_map schema.
    """
    status = http_status or 0
    fetch_error: str | None = None

    if html is None:
        status, content = fetch_url(url)
        if status <= 0:
            fetch_error = content
            html = ""
        elif status >= 400:
            fetch_error = f"HTTP {status}"
            html = content
        else:
            html = content

    result: dict[str, Any] = {
        "page_url": url,
        "is_our_page": is_our_page,
        "site_key": site_key,
        "primary_query": primary_query,
        "http_status": status,
        "fetch_error": fetch_error,
        "js_rendered": False,
    }

    if not html or fetch_error:
        return result

    soup = BeautifulSoup(html, "lxml")
    _pre_strip_h1 = soup.find("h1")  # ponytail: capture before _strip_noise() removes header elements
    _pre_strip_schema = _extract_schema(soup)  # ponytail: capture before _strip_noise() removes <script> tags
    _strip_noise(soup)
    zone = _find_main_zone(soup)

    body_text = zone.get_text(" ", strip=True)
    word_count = len(body_text.split())

    # Detect JS-rendered / SPA
    if word_count < 200:
        result["js_rendered"] = True

    # On-page SEO + metadata
    seo = _onpage_seo(soup, zone, primary_query)
    if not seo.get("h1_text") and _pre_strip_h1:
        seo["h1_text"] = _pre_strip_h1.get_text(" ", strip=True)
    result.update(seo)

    # Sections
    sections = _extract_sections(zone, primary_query)
    result["sections"] = sections
    result["schema_types"] = []

    # FAQs — seed from pre-strip schema (JSON-LD scripts removed by _strip_noise)
    _schema_faq_pairs = _pre_strip_schema.get("faq_pairs") or []
    _schema_faqs = [
        {"source": "schema", "question": p["question"], "answer": p["answer"][:400],
         "word_count": len(p["answer"].split())}
        for p in _schema_faq_pairs
    ]
    faqs = _extract_faqs(soup, zone)  # HTML patterns on post-strip zone
    # Merge: schema FAQs first (authoritative), then HTML FAQs not already covered
    seen_q = {f["question"].strip().lower()[:80] for f in _schema_faqs}
    merged = _schema_faqs + [f for f in faqs if f["question"].strip().lower()[:80] not in seen_q]
    result["faqs"] = merged

    # Query coverage
    if primary_query:
        result["query_coverage"] = _count_query_variants(body_text, primary_query)

    # E-E-A-T
    result["eeat"] = _extract_eeat(soup, url)

    # Schema (pre-captured before _strip_noise removed <script> tags)
    result["schema_data"] = _pre_strip_schema
    result["schema_types"] = _pre_strip_schema.get("types") or []

    # Figures / legislation / deadlines across full page
    result["figures_mentioned"] = _extract_figures(body_text)
    result["legislation_refs"] = _extract_legislation(body_text)
    result["deadline_refs"] = _extract_deadlines(body_text)

    # Body structure
    result["body_structure"] = _body_structure(zone)
    result["opening_type"] = _detect_opening_type(zone)

    # CTAs
    ctas = _extract_ctas(zone, soup)
    result["cta_count"] = len(ctas)
    result["cta_inventory"] = ctas
    result["has_sticky_cta"] = any(c["type"] == "sticky" for c in ctas)
    result["has_cta_early"] = any(c["position_ratio"] < 0.2 for c in ctas)
    result["cta_primary_text"] = ctas[0]["text"] if ctas else None
    result["has_lead_form"] = bool(
        zone.find("form") or soup.find("form", class_=re.compile(r"contact|enquir|lead", re.I))
    )
    result["has_calculator"] = "calculator" in _detect_features(zone)
    result["has_phone_visible"] = bool(_PHONE_RE.search(body_text))

    # Downloads
    assets = _extract_downloads(zone)
    result["has_download"] = len(assets) > 0
    result["downloadable_assets"] = assets
    result["has_lead_magnet"] = any(a["gated"] for a in assets)
    result["pdf_link_count"] = sum(1 for a in assets if a["type"] == "pdf")

    # Interactive features
    features = _detect_features(zone)
    result["has_video"] = "video" in features
    result["has_accordion"] = "accordion" in features
    result["has_glossary"] = "glossary" in features
    result["features"] = features

    # Social proof
    social = _detect_social_proof(zone)
    result.update(social)

    # Layout
    layout = _detect_layout(soup, zone)
    result.update(layout)

    return result


# ---------------------------------------------------------------------------
# Database storage
# ---------------------------------------------------------------------------

def _upsert_page_content_map(row: dict) -> str | None:
    """Upsert a parsed page row into page_content_map. Returns the id."""
    today = date.today().isoformat()

    # JSONB columns
    sections_j = _jsonb(row.get("sections"))
    faqs_j = _jsonb(row.get("faqs"))
    coverage_j = _jsonb(row.get("query_coverage"))
    eeat_j = _jsonb(row.get("eeat"))
    schema_j = _jsonb(row.get("schema_data"))
    cta_inv_j = _jsonb(row.get("cta_inventory"))
    dl_assets_j = _jsonb(row.get("downloadable_assets"))

    sql = f"""
        INSERT INTO page_content_map (
            page_url, fetch_date, is_our_page, site_key, primary_query,
            title_tag, meta_description, h1_text, word_count,
            sections, faqs, query_coverage, eeat, schema_data,
            figures_mentioned, legislation_refs, deadline_refs, schema_types,
            query_in_title, query_in_h1, query_in_first_para,
            first_paragraph_text, query_density_pct,
            internal_link_count, external_link_count,
            body_structure, opening_type,
            cta_count, cta_inventory, has_sticky_cta, has_cta_early,
            cta_primary_text, has_lead_form, has_calculator, has_phone_visible,
            has_download, downloadable_assets, has_lead_magnet, pdf_link_count,
            has_video, has_accordion, has_glossary, features,
            has_testimonials, has_star_rating, has_case_study, has_client_logos,
            has_stats_block, social_proof_text,
            has_sidebar, has_sticky_element, uses_card_layout,
            has_hero_section, above_fold_elements,
            js_rendered, http_status, fetch_error
        )
        VALUES (
            {_esc(row.get('page_url'))}, '{today}',
            {_esc(row.get('is_our_page', False))},
            {_esc(row.get('site_key'))}, {_esc(row.get('primary_query'))},
            {_esc(row.get('title_tag'))}, {_esc(row.get('meta_description'))},
            {_esc(row.get('h1_text'))}, {_esc(row.get('word_count'))},
            {sections_j}, {faqs_j}, {coverage_j}, {eeat_j}, {schema_j},
            {_arr(row.get('figures_mentioned'))}, {_arr(row.get('legislation_refs'))},
            {_arr(row.get('deadline_refs'))}, {_arr(row.get('schema_types'))},
            {_esc(row.get('query_in_title'))}, {_esc(row.get('query_in_h1'))},
            {_esc(row.get('query_in_first_para'))},
            {_esc(row.get('first_paragraph_text'))}, {_esc(row.get('query_density_pct'))},
            {_esc(row.get('internal_link_count'))}, {_esc(row.get('external_link_count'))},
            {_arr(row.get('body_structure'))}, {_esc(row.get('opening_type'))},
            {_esc(row.get('cta_count'))}, {cta_inv_j},
            {_esc(row.get('has_sticky_cta'))}, {_esc(row.get('has_cta_early'))},
            {_esc(row.get('cta_primary_text'))}, {_esc(row.get('has_lead_form'))},
            {_esc(row.get('has_calculator'))}, {_esc(row.get('has_phone_visible'))},
            {_esc(row.get('has_download'))}, {dl_assets_j},
            {_esc(row.get('has_lead_magnet'))}, {_esc(row.get('pdf_link_count'))},
            {_esc(row.get('has_video'))}, {_esc(row.get('has_accordion'))},
            {_esc(row.get('has_glossary'))}, {_arr(row.get('features'))},
            {_esc(row.get('has_testimonials'))}, {_esc(row.get('has_star_rating'))},
            {_esc(row.get('has_case_study'))}, {_esc(row.get('has_client_logos'))},
            {_esc(row.get('has_stats_block'))}, {_esc(row.get('social_proof_text'))},
            {_esc(row.get('has_sidebar'))}, {_esc(row.get('has_sticky_element'))},
            {_esc(row.get('uses_card_layout'))}, {_esc(row.get('has_hero_section'))},
            {_arr(row.get('above_fold_elements'))},
            {_esc(row.get('js_rendered', False))},
            {_esc(row.get('http_status'))}, {_esc(row.get('fetch_error'))}
        )
        ON CONFLICT (page_url, fetch_date) DO UPDATE SET
            is_our_page         = EXCLUDED.is_our_page,
            site_key            = EXCLUDED.site_key,
            primary_query       = EXCLUDED.primary_query,
            title_tag           = EXCLUDED.title_tag,
            meta_description    = EXCLUDED.meta_description,
            h1_text             = EXCLUDED.h1_text,
            word_count          = EXCLUDED.word_count,
            sections            = EXCLUDED.sections,
            faqs                = EXCLUDED.faqs,
            query_coverage      = EXCLUDED.query_coverage,
            eeat                = EXCLUDED.eeat,
            schema_data         = EXCLUDED.schema_data,
            figures_mentioned   = EXCLUDED.figures_mentioned,
            legislation_refs    = EXCLUDED.legislation_refs,
            deadline_refs       = EXCLUDED.deadline_refs,
            schema_types        = EXCLUDED.schema_types,
            query_in_title      = EXCLUDED.query_in_title,
            query_in_h1         = EXCLUDED.query_in_h1,
            query_in_first_para = EXCLUDED.query_in_first_para,
            first_paragraph_text= EXCLUDED.first_paragraph_text,
            query_density_pct   = EXCLUDED.query_density_pct,
            internal_link_count = EXCLUDED.internal_link_count,
            external_link_count = EXCLUDED.external_link_count,
            body_structure      = EXCLUDED.body_structure,
            opening_type        = EXCLUDED.opening_type,
            cta_count           = EXCLUDED.cta_count,
            cta_inventory       = EXCLUDED.cta_inventory,
            has_sticky_cta      = EXCLUDED.has_sticky_cta,
            has_cta_early       = EXCLUDED.has_cta_early,
            cta_primary_text    = EXCLUDED.cta_primary_text,
            has_lead_form       = EXCLUDED.has_lead_form,
            has_calculator      = EXCLUDED.has_calculator,
            has_phone_visible   = EXCLUDED.has_phone_visible,
            has_download        = EXCLUDED.has_download,
            downloadable_assets = EXCLUDED.downloadable_assets,
            has_lead_magnet     = EXCLUDED.has_lead_magnet,
            pdf_link_count      = EXCLUDED.pdf_link_count,
            has_video           = EXCLUDED.has_video,
            has_accordion       = EXCLUDED.has_accordion,
            has_glossary        = EXCLUDED.has_glossary,
            features            = EXCLUDED.features,
            has_testimonials    = EXCLUDED.has_testimonials,
            has_star_rating     = EXCLUDED.has_star_rating,
            has_case_study      = EXCLUDED.has_case_study,
            has_client_logos    = EXCLUDED.has_client_logos,
            has_stats_block     = EXCLUDED.has_stats_block,
            social_proof_text   = EXCLUDED.social_proof_text,
            has_sidebar         = EXCLUDED.has_sidebar,
            has_sticky_element  = EXCLUDED.has_sticky_element,
            uses_card_layout    = EXCLUDED.uses_card_layout,
            has_hero_section    = EXCLUDED.has_hero_section,
            above_fold_elements = EXCLUDED.above_fold_elements,
            js_rendered         = EXCLUDED.js_rendered,
            http_status         = EXCLUDED.http_status,
            fetch_error         = EXCLUDED.fetch_error,
            fetched_at          = NOW()
        RETURNING id
    """
    try:
        rows = _sql(sql)
        return rows[0]["id"] if rows else None
    except Exception as exc:
        print(f"  [page_parser] DB upsert failed for {row.get('page_url')}: {exc}")
        return None


def _is_content_relevant(body_text: str, query: str) -> bool:
    """Return True if the page body is plausibly relevant to the query context.

    Filters out software directories, Q&A forums, PDF converters, and other
    noise pages that DDG sometimes surfaces. Uses the page's own text rather
    than its domain, so it works without a static blocklist.

    A page is considered relevant if it contains at least 2 of the query's
    significant tokens in its body text.
    """
    if not body_text or not query:
        return True  # can't judge — let it through

    tokens = _query_tokens(query)
    if not tokens:
        return True

    body_lower = body_text.lower()
    matches = sum(1 for t in tokens if t.lower() in body_lower)
    # Require at least 2 matching tokens, or 30% of tokens for short queries
    threshold = max(2, round(len(tokens) * 0.3))
    return matches >= threshold


def fetch_and_store(
    url: str,
    primary_query: str | None = None,
    *,
    is_our_page: bool = False,
    site_key: str | None = None,
    force: bool = False,
) -> str | None:
    """Fetch, parse, and store a page. Returns page_content_map.id.

    Skips pages already fetched today unless force=True.
    For competitor pages, skips if content is not relevant to the query.
    """
    today = date.today().isoformat()

    if not force:
        existing = _sql(
            f"SELECT id FROM page_content_map WHERE page_url = {_esc(url)} AND fetch_date = '{today}' LIMIT 1"
        )
        if existing:
            return existing[0]["id"]

    print(f"  [page_parser] parsing {url[:80]}")
    row = parse_page(url, primary_query, is_our_page=is_our_page, site_key=site_key)

    # Content relevance check for competitor pages — skip irrelevant results
    if not is_our_page and primary_query and not row.get("fetch_error"):
        body_text = row.get("first_paragraph_text") or ""
        # Use full section text if we have it
        sections = row.get("sections") or []
        if sections:
            body_text = " ".join(
                (s.get("content_text") or "") for s in sections[:5]
            )
        if body_text and not _is_content_relevant(body_text, primary_query):
            print(f"  [page_parser] skipping {url[:60]} — content not relevant to query")
            return None

    return _upsert_page_content_map(row)
