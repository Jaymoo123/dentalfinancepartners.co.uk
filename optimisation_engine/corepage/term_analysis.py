"""Competitor on-page TERM + SECTION analysis for the core-page engine.

Deterministic (no LLM). Answers the "how are they actually winning on-page"
questions that the coarse signal-extract does not:
  - head-keyword frequency + density (the main term and the whole family)
  - the shared vocabulary (top bigrams/trigrams across page-1 competitors)
  - recurring section/heading patterns (what H2s keep appearing)
  - true content depth (full visible-text word count, not chrome-stripped)

It re-fetches the page-1 competitor URLs already discovered in
`briefs/<site>/<page>/_analysis_pack.json` and compares them against OUR page
(pass --our-url http://localhost:3000/ to measure the freshly-edited homepage).

    python -m optimisation_engine.corepage.term_analysis --site property --page homepage --our-url http://localhost:3000/
"""
from __future__ import annotations

import argparse
import json
import re
from collections import Counter
from pathlib import Path

import httpx
from bs4 import BeautifulSoup

from optimisation_engine.competitor._fetch import BOT_USER_AGENT, fetch_url
from .config import get_core_page

ROOT = Path(__file__).resolve().parents[2]

STOPWORDS = set("""
a an the and or but if then else for to of in on at by with from into over under
is are was were be been being am do does did have has had can could will would shall
should may might must this that these those it its as not no so such than too very
you your we our us they them their he she his her i my me will just about can also
more most other some any each which who whom what when where why how all both few
out up down off only own same s t re ve ll d m o re per via etc eg ie
""".split())

# Roots worth tracking individually (single tokens), beyond the head phrases.
ROOT_TOKENS = ["accountant", "accountants", "property", "landlord", "landlords",
               "tax", "buy-to-let", "investor", "investors"]


def _fetch_any(url: str) -> tuple[int, str]:
    """fetch_url for public sites; plain httpx for our own localhost (SSRF guard
    blocks loopback)."""
    if "localhost" in url or "127.0.0.1" in url:
        try:
            with httpx.Client(follow_redirects=True, timeout=30.0,
                              headers={"User-Agent": BOT_USER_AGENT}) as c:
                r = c.get(url)
                return r.status_code, r.text
        except Exception as exc:  # noqa: BLE001
            return 0, str(exc)[:200]
    return fetch_url(url)


def visible_text(html: str) -> str:
    soup = BeautifulSoup(html, "lxml")
    for sel in ["script", "style", "noscript", "svg", "template"]:
        for el in soup.select(sel):
            el.decompose()
    body = soup.body or soup
    text = body.get_text(" ", strip=True)
    return re.sub(r"\s+", " ", text)


def tokenize(text: str) -> list[str]:
    return re.findall(r"[a-z0-9]+(?:-[a-z0-9]+)*", text.lower())


def phrase_count(words: list[str], phrase: str) -> int:
    joined = " " + " ".join(words) + " "
    return joined.count(" " + phrase.lower().strip() + " ")


def keyword_stats(
    text: str,
    head_terms: list[str],
    *,
    main_terms: list[str] | None = None,
    root_tokens: list[str] | None = None,
) -> dict:
    """Site-agnostic on-page term stats.

    ``main_terms`` (the primary head phrase[s] rolled up as the "main keyword")
    and ``root_tokens`` (single tokens tracked individually) come from the
    CORE_PAGES entry. They default to sensible derivations so any site works
    without property-specific hardcoding.
    """
    words = tokenize(text)
    n = max(len(words), 1)
    terms = {}
    for t in head_terms:
        c = phrase_count(words, t)
        terms[t] = {"count": c, "per_1000": round(c / n * 1000, 2)}
    roots = {}
    wc = Counter(words)
    rtoks = root_tokens if root_tokens is not None else ROOT_TOKENS
    for r in rtoks:
        c = wc.get(r, 0)
        roots[r] = {"count": c, "per_1000": round(c / n * 1000, 2)}
    # "main keyword" rollup: sum of the primary head term(s). Defaults to the
    # first two head terms (for property that is the singular+plural pair).
    mterms = main_terms if main_terms is not None else head_terms[:2]
    main = sum(phrase_count(words, m) for m in mterms)
    main_words = max((len(m.split()) for m in mterms), default=2)
    return {
        "word_count": n,
        "main_keyword_count": main,
        "main_keyword_density_pct": round(main * main_words / n * 100, 2),
        "main_keyword_per_1000": round(main / n * 1000, 2),
        "main_terms": mterms,
        "head_terms": terms,
        "roots": roots,
    }


def top_ngrams(text: str, *, n: int, k: int) -> list[tuple[str, int]]:
    words = tokenize(text)
    grams = Counter()
    for i in range(len(words) - n + 1):
        gram = words[i:i + n]
        if gram[0] in STOPWORDS or gram[-1] in STOPWORDS:
            continue
        if all(len(w) <= 2 for w in gram):
            continue
        grams[" ".join(gram)] += 1
    return grams.most_common(k)


def headings(html: str) -> dict:
    soup = BeautifulSoup(html, "lxml")
    for sel in ["script", "style", "noscript"]:
        for el in soup.select(sel):
            el.decompose()
    return {
        "h1": [h.get_text(" ", strip=True) for h in soup.find_all("h1")],
        "h2": [h.get_text(" ", strip=True) for h in soup.find_all("h2") if h.get_text(strip=True)],
        "h3": [h.get_text(" ", strip=True) for h in soup.find_all("h3") if h.get_text(strip=True)],
    }


def analyse_page(
    url: str,
    head_terms: list[str],
    *,
    main_terms: list[str] | None = None,
    root_tokens: list[str] | None = None,
) -> dict:
    status, html = _fetch_any(url)
    if status != 200 or not html:
        return {"url": url, "status": status, "error": "fetch_failed"}
    text = visible_text(html)
    ks = keyword_stats(text, head_terms, main_terms=main_terms, root_tokens=root_tokens)
    hs = headings(html)
    return {
        "url": url,
        "status": status,
        **ks,
        "h1": hs["h1"],
        "h2": hs["h2"],
        "h2_count": len(hs["h2"]),
        "h3_count": len(hs["h3"]),
        "bigrams": top_ngrams(text, n=2, k=18),
        "trigrams": top_ngrams(text, n=3, k=12),
    }


def _median(xs: list[float]) -> float:
    xs = sorted(xs)
    if not xs:
        return 0.0
    m = len(xs) // 2
    return xs[m] if len(xs) % 2 else round((xs[m - 1] + xs[m]) / 2, 1)


def run_term_analysis(site_key: str, page_key: str, *, our_url: str | None = None) -> dict:
    cfg = get_core_page(site_key, page_key)
    head_terms = cfg["head_terms"]
    main_terms = cfg.get("main_keyword_terms")
    root_tokens = cfg.get("root_tokens")
    out_dir = ROOT / "briefs" / site_key / page_key
    pack_path = out_dir / "_analysis_pack.json"
    if not pack_path.exists():
        raise FileNotFoundError(f"Run the engine first to produce {pack_path}")
    pack = json.loads(pack_path.read_text(encoding="utf-8"))
    comp_urls = [c["url"] for c in pack.get("serp", {}).get("competitors", [])][:12]

    print(f"[term] analysing {len(comp_urls)} competitors + our page...")
    competitors = []
    for u in comp_urls:
        res = analyse_page(u, head_terms, main_terms=main_terms, root_tokens=root_tokens)
        competitors.append(res)
        tag = "OK" if not res.get("error") else res.get("error")
        print(f"  {tag:14} {u}")

    ours = None
    our_target = our_url or cfg["page_url"]
    print(f"[term] our page: {our_target}")
    ours = analyse_page(our_target, head_terms, main_terms=main_terms, root_tokens=root_tokens)

    ok = [c for c in competitors if not c.get("error")]
    # Aggregate the shared vocabulary across competitors.
    shared_bigrams = Counter()
    shared_trigrams = Counter()
    heading_topics = Counter()
    for c in ok:
        for g, n in c["bigrams"]:
            shared_bigrams[g] += n
        for g, n in c["trigrams"]:
            shared_trigrams[g] += n
        for h in c["h2"]:
            for tok in tokenize(h):
                if tok not in STOPWORDS and len(tok) > 2:
                    heading_topics[tok] += 1

    summary = {
        "n_competitors_ok": len(ok),
        "word_count": {
            "ours": ours.get("word_count") if not ours.get("error") else None,
            "competitor_median": _median([c["word_count"] for c in ok]),
            "competitor_min": min((c["word_count"] for c in ok), default=0),
            "competitor_max": max((c["word_count"] for c in ok), default=0),
        },
        "main_keyword_count": {
            "ours": ours.get("main_keyword_count") if not ours.get("error") else None,
            "competitor_median": _median([c["main_keyword_count"] for c in ok]),
            "competitor_max": max((c["main_keyword_count"] for c in ok), default=0),
        },
        "main_keyword_per_1000": {
            "ours": ours.get("main_keyword_per_1000") if not ours.get("error") else None,
            "competitor_median": _median([c["main_keyword_per_1000"] for c in ok]),
        },
        "h2_count": {
            "ours": ours.get("h2_count") if not ours.get("error") else None,
            "competitor_median": _median([c["h2_count"] for c in ok]),
        },
        "shared_bigrams": shared_bigrams.most_common(25),
        "shared_trigrams": shared_trigrams.most_common(20),
        "heading_topics": heading_topics.most_common(25),
    }

    report = {"site_key": site_key, "page_key": page_key, "head_terms": head_terms,
              "main_terms": (main_terms or head_terms[:2]),
              "summary": summary, "ours": ours, "competitors": competitors}
    report["readable_md"] = render_md(report)
    (out_dir / "_term_analysis.json").write_text(json.dumps(report, indent=2, default=str), encoding="utf-8")
    (out_dir / "_term_analysis.md").write_text(report["readable_md"], encoding="utf-8")
    print(f"[term] wrote {out_dir / '_term_analysis.md'}")
    return report


def render_md(r: dict) -> str:
    s = r["summary"]
    L = []
    L.append(f"# Competitor term + section analysis — {r['site_key']}/{r['page_key']}")
    L.append(f"\nPage-1 competitors analysed: {s['n_competitors_ok']}\n")

    L.append("## Content depth (full visible-text word count)")
    wc = s["word_count"]
    L.append(f"- Ours: **{wc['ours']}** | competitor median **{wc['competitor_median']}** "
             f"(range {wc['competitor_min']}-{wc['competitor_max']})\n")

    L.append(f"## Main keyword ('{' / '.join(r.get('main_terms') or [])}') usage")
    mk = s["main_keyword_count"]; md = s["main_keyword_per_1000"]
    L.append(f"- Count: ours **{mk['ours']}**, competitor median **{mk['competitor_median']}** (max {mk['competitor_max']}).")
    L.append(f"- Per 1,000 words: ours **{md['ours']}**, competitor median **{md['competitor_median']}**.\n")

    L.append("## Per-competitor breakdown")
    L.append("| domain | words | main-kw | /1k | H2 | top head-term hits |")
    L.append("| --- | --- | --- | --- | --- | --- |")
    def dom(u): return u.replace("https://", "").replace("http://", "").replace("www.", "").split("/")[0]
    rows = [r["ours"]] + r["competitors"]
    for c in rows:
        if c.get("error"):
            L.append(f"| {dom(c['url'])} (OURS) | fetch_failed | | | | |" if c is r["ours"] else f"| {dom(c['url'])} | fetch_failed | | | | |")
            continue
        label = dom(c["url"]) + (" (OURS)" if c is r["ours"] else "")
        hits = ", ".join(f"{t}:{d['count']}" for t, d in c["head_terms"].items() if d["count"] > 0) or "-"
        L.append(f"| {label} | {c['word_count']} | {c['main_keyword_count']} | {c['main_keyword_per_1000']} | {c['h2_count']} | {hits[:80]} |")
    L.append("")

    L.append("## Shared vocabulary across page-1 competitors (top bigrams)")
    L.append(", ".join(f"{g} ({n})" for g, n in s["shared_bigrams"]))
    L.append("\n## Shared trigrams")
    L.append(", ".join(f"{g} ({n})" for g, n in s["shared_trigrams"]))
    L.append("\n## Recurring section/heading topics (token freq across competitor H2s)")
    L.append(", ".join(f"{t} ({n})" for t, n in s["heading_topics"]))
    L.append("\n## Competitor H2 section lists")
    for c in r["competitors"]:
        if c.get("error"):
            continue
        L.append(f"\n### {dom(c['url'])} ({c['word_count']} words, {c['h2_count']} H2)")
        for h in c["h2"][:18]:
            L.append(f"- {h}")
    return "\n".join(L)


def main() -> None:
    ap = argparse.ArgumentParser(description="Competitor term + section analysis.")
    ap.add_argument("--site", default="property")
    ap.add_argument("--page", default="homepage")
    ap.add_argument("--our-url", default=None, help="override our page URL (e.g. http://localhost:3000/)")
    args = ap.parse_args()
    run_term_analysis(args.site, args.page, our_url=args.our_url)


if __name__ == "__main__":
    main()
