"""Deep page extraction for the Opus-fuel competitor briefs.

The earlier `page_parser.py` had parser bugs (H1 missing, schema JSON-LD broken,
FAQ dl/dt/dd missed). This module fixes those and pulls a much richer
structured dump per page so Opus sessions can do their own gap analysis on
real data.

What we extract per page:
- Title tag + meta description
- H1 (raw text + presence)
- Full H2 list (with the H3s under each H2)
- Word count of the article body (header/nav/footer/aside stripped)
- FAQ list (covers <dl>/<dt>/<dd>, <details>/<summary>, FAQPage JSON-LD)
- Table count + table titles/headers
- Schema types present (Article/BlogPosting/FAQPage/HowTo/BreadcrumbList etc.)
- Component patterns we can borrow: callout / aside / table-of-contents / step
  list / pricing block / comparison table / pull-quote etc.
- External authority links cited (HMRC, NHS, gov.uk, legislation.gov.uk, GMC, BMA)
- Image / video count

Usage:
    from optimisation_engine.competitor.deep_extract import extract_page_signals
    signals = extract_page_signals(url)
"""
from __future__ import annotations

import json
import re
from typing import Any
from urllib.parse import urlparse

from bs4 import BeautifulSoup, Tag

from optimisation_engine.competitor._fetch import fetch_url


AUTHORITY_DOMAINS = {
    "gov.uk", "hmrc.gov.uk", "legislation.gov.uk",
    "nhsbsa.nhs.uk", "nhsemployers.org", "england.nhs.uk", "nhs.uk",
    "gmc-uk.org", "bma.org.uk", "rcgp.org.uk",
    "icaew.com", "accaglobal.com", "tax.org.uk", "att.org.uk",
    "fca.org.uk", "tpr.gov.uk",
}


def _strip_chrome(soup: BeautifulSoup) -> BeautifulSoup:
    """Remove site chrome (nav, footer, sidebars, scripts) so we measure
    the actual article body."""
    for selector in ["script", "style", "noscript", "nav", "header",
                     "footer", "aside", "[role='navigation']",
                     "[aria-label*='navigation' i]", "[class*='cookie' i]",
                     "[class*='consent' i]", "[class*='nav' i]",
                     "[class*='breadcrumb' i]", "[class*='sidebar' i]",
                     "[class*='footer' i]", "[class*='header' i]"]:
        for el in soup.select(selector):
            el.decompose()
    return soup


def _extract_main(soup: BeautifulSoup) -> Tag:
    """Find the best candidate for the article body."""
    for selector in ["main article", "article", "main", "[role='main']",
                     "[class*='article-body' i]", "[class*='post-content' i]",
                     "[class*='content' i]"]:
        el = soup.select_one(selector)
        if el and len(el.get_text(strip=True)) > 200:
            return el
    return soup.body or soup


def _h1_text(soup: BeautifulSoup) -> str:
    h1 = soup.find("h1")
    return h1.get_text(" ", strip=True) if h1 else ""


def _h2_tree(article: Tag) -> list[dict]:
    """Return ordered list of {h2_text, h3_list[], approx_words_under}.
    Counts text between this H2 and the next H2 (or end)."""
    headings: list[Tag] = list(article.find_all(["h2", "h3"]))
    result: list[dict] = []
    current_h2: dict | None = None

    def commit() -> None:
        if current_h2:
            result.append(current_h2)

    for el in article.find_all(["h2", "h3", "p", "li", "td", "th", "div"]):
        name = el.name
        if name == "h2":
            commit()
            current_h2 = {
                "h2_text": el.get_text(" ", strip=True),
                "h3_list": [],
                "approx_words_under": 0,
            }
        elif name == "h3" and current_h2 is not None:
            current_h2["h3_list"].append(el.get_text(" ", strip=True))
        elif current_h2 is not None and name in ("p", "li"):
            current_h2["approx_words_under"] += len(el.get_text(" ", strip=True).split())
    commit()
    return result


def _word_count(article: Tag) -> int:
    text = article.get_text(" ", strip=True)
    return len(text.split())


def _faqs(soup: BeautifulSoup) -> list[dict]:
    """Pull FAQs from JSON-LD, <details>/<summary>, and <dl>/<dt>/<dd>."""
    found: list[dict] = []

    # JSON-LD FAQPage
    for script in soup.find_all("script", type="application/ld+json"):
        try:
            data = json.loads(script.string or "{}")
        except (json.JSONDecodeError, TypeError):
            continue
        nodes = data if isinstance(data, list) else [data]
        # Some sites wrap in @graph
        flat = []
        for n in nodes:
            if isinstance(n, dict) and "@graph" in n:
                flat.extend(n["@graph"])
            else:
                flat.append(n)
        for n in flat:
            if isinstance(n, dict) and n.get("@type") in ("FAQPage", ["FAQPage"]):
                for q in n.get("mainEntity", []) or []:
                    if isinstance(q, dict):
                        name = q.get("name", "")
                        ans = q.get("acceptedAnswer", {})
                        if isinstance(ans, dict):
                            answer_text = ans.get("text", "")
                        else:
                            answer_text = ""
                        if name:
                            found.append({"question": name, "answer_preview": answer_text[:240]})

    # <details>/<summary>
    for det in soup.find_all("details"):
        summary = det.find("summary")
        if summary:
            q = summary.get_text(" ", strip=True)
            ans = ""
            # collect text after summary
            for sib in summary.next_siblings:
                if isinstance(sib, Tag):
                    ans += sib.get_text(" ", strip=True) + " "
                elif isinstance(sib, str):
                    ans += sib.strip() + " "
            if q:
                found.append({"question": q, "answer_preview": ans[:240]})

    # <dl><dt>/<dd>
    for dl in soup.find_all("dl"):
        dts = dl.find_all("dt")
        dds = dl.find_all("dd")
        for dt, dd in zip(dts, dds):
            q = dt.get_text(" ", strip=True)
            a = dd.get_text(" ", strip=True)
            if q:
                found.append({"question": q, "answer_preview": a[:240]})

    # Headings that look like questions (h2/h3 ending with ?)
    for h in soup.find_all(["h2", "h3"]):
        text = h.get_text(" ", strip=True)
        if text.endswith("?"):
            # capture next paragraph
            nxt = h.find_next("p")
            ans = nxt.get_text(" ", strip=True) if nxt else ""
            found.append({"question": text, "answer_preview": ans[:240]})

    # de-duplicate by question (case-insensitive)
    seen: set[str] = set()
    unique: list[dict] = []
    for f in found:
        key = f["question"].lower().strip()
        if key not in seen:
            seen.add(key)
            unique.append(f)
    return unique


def _tables(article: Tag) -> list[dict]:
    out: list[dict] = []
    for t in article.find_all("table"):
        caption_el = t.find("caption")
        caption = caption_el.get_text(" ", strip=True) if caption_el else None
        headers = [th.get_text(" ", strip=True) for th in t.find_all("th")][:8]
        rows = len(t.find_all("tr"))
        out.append({"caption": caption, "headers": headers, "rows": rows})
    return out


def _schema_types(soup: BeautifulSoup) -> list[str]:
    types: set[str] = set()
    for script in soup.find_all("script", type="application/ld+json"):
        try:
            data = json.loads(script.string or "{}")
        except (json.JSONDecodeError, TypeError):
            continue
        nodes = data if isinstance(data, list) else [data]
        flat = []
        for n in nodes:
            if isinstance(n, dict) and "@graph" in n:
                flat.extend(n["@graph"])
            else:
                flat.append(n)
        for n in flat:
            if isinstance(n, dict):
                t = n.get("@type")
                if isinstance(t, str):
                    types.add(t)
                elif isinstance(t, list):
                    for ti in t:
                        types.add(ti)
    return sorted(types)


COMPONENT_PATTERNS: list[tuple[str, list[str]]] = [
    ("table_of_contents", ["table of contents", "in this article", "on this page", "jump to"]),
    ("inline_callout_aside", ["aside", "callout", "pull-quote", "highlight-box"]),
    ("step_list", ["step 1", "step 2", "1.", "step-by-step"]),
    ("comparison_table", ["vs ", "compared", "comparison"]),
    ("worked_example", ["worked example", "example:", "case study", "scenario"]),
    ("decision_matrix", ["if you ", "depending on", "decision matrix"]),
    ("checklist", ["checklist", "✓", "✔"]),
    ("pricing_block", ["£", "from £", "fees", "pricing"]),
    ("calculator_link", ["calculator", "calculate your"]),
    ("video_embed", ["<iframe", "youtube.com/embed", "vimeo.com"]),
    ("download_form", ["download", "free guide", "free template"]),
    ("author_byline", ["written by", "by dr ", "authored by", "reviewed by"]),
    ("date_stamping", ["last updated", "updated on", "reviewed on"]),
]


def _component_patterns(article: Tag) -> list[str]:
    text_lower = article.get_text(" ", strip=True).lower()
    html_lower = str(article).lower()
    found: list[str] = []
    for name, markers in COMPONENT_PATTERNS:
        for m in markers:
            if m in text_lower or m in html_lower:
                found.append(name)
                break
    return found


def _external_authority_links(article: Tag) -> list[dict]:
    out: list[dict] = []
    seen: set[str] = set()
    for a in article.find_all("a", href=True):
        href = a["href"]
        if href.startswith("http"):
            host = urlparse(href).hostname or ""
            for auth in AUTHORITY_DOMAINS:
                if host.endswith(auth) and href not in seen:
                    seen.add(href)
                    out.append({"text": a.get_text(" ", strip=True)[:120], "url": href, "domain": host})
                    break
    return out


def _internal_link_count(article: Tag) -> int:
    return sum(
        1 for a in article.find_all("a", href=True)
        if a["href"].startswith("/") or not a["href"].startswith("http")
    )


def _meta(soup: BeautifulSoup) -> dict:
    title = soup.title.string.strip() if soup.title and soup.title.string else ""
    desc_el = soup.find("meta", attrs={"name": "description"})
    desc = desc_el.get("content", "").strip() if desc_el else ""
    canonical_el = soup.find("link", rel="canonical")
    canonical = canonical_el.get("href", "") if canonical_el else ""
    return {"title": title, "meta_description": desc, "canonical": canonical}


def extract_page_signals(url: str) -> dict[str, Any] | None:
    """Fetch and extract structured signals from a URL.

    Returns None on fetch failure. On parse failure returns a dict with the
    raw fetch metadata so the brief can still record that we tried.
    """
    status, html = fetch_url(url)
    if status != 200 or not html:
        return {"url": url, "status": status, "error": "fetch_failed"}

    # Build two soups: full (for schema, FAQs, metadata) and stripped (for body)
    soup_full = BeautifulSoup(html, "lxml")
    meta = _meta(soup_full)
    schema_types = _schema_types(soup_full)
    h1 = _h1_text(soup_full)
    faqs = _faqs(soup_full)

    soup_body = BeautifulSoup(html, "lxml")
    _strip_chrome(soup_body)
    article = _extract_main(soup_body)
    word_count = _word_count(article)
    h2_tree = _h2_tree(article)
    tables = _tables(article)
    components = _component_patterns(article)
    authority_links = _external_authority_links(article)
    internal_links = _internal_link_count(article)
    img_count = len(article.find_all("img"))
    video_count = sum(1 for el in article.find_all(["video", "iframe"])
                      if "video" in el.name or "youtube" in str(el.get("src", "")).lower()
                      or "vimeo" in str(el.get("src", "")).lower())

    return {
        "url": url,
        "status": status,
        "domain": urlparse(url).hostname,
        "title": meta["title"],
        "meta_description": meta["meta_description"],
        "canonical": meta["canonical"],
        "h1": h1,
        "h2_tree": h2_tree,
        "h2_count": len(h2_tree),
        "h3_count": sum(len(n["h3_list"]) for n in h2_tree),
        "word_count": word_count,
        "faq_count": len(faqs),
        "faqs": faqs,
        "table_count": len(tables),
        "tables": tables,
        "schema_types": schema_types,
        "component_patterns": components,
        "authority_links": authority_links,
        "internal_link_count": internal_links,
        "image_count": img_count,
        "video_count": video_count,
    }
