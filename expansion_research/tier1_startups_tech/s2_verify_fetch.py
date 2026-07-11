"""R3 tier1 startups/tech — Stage 2: fetch-verify every surviving candidate domain.

Cloned from pilot_charities/s2_verify_fetch.py; startup/SaaS/R&D/SEIS signal regexes.
Also captures commodity-pricing signals (monthly £ price points) and US-vs-UK signals
so Claude can tier commodity vs specialist and drop non-UK afterwards.
Writes raw/verify_evidence.json. Script gathers, does not judge.
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from urllib.parse import urljoin, urlparse

HERE = Path(__file__).parent
ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT))

from dotenv import load_dotenv

load_dotenv(ROOT / ".env")

from bs4 import BeautifulSoup

from optimisation_engine.competitor._fetch import fetch_url

TOPIC_LINK_RE = re.compile(
    r"startup|start-up|saas|software|tech|scale-?up|founder|r-?and-?d|rd-tax|research-and-development|"
    r"seis|\beis\b|emi|share-scheme|share-option|venture|vc-backed|fintech|cfo", re.I)
TOPIC_TEXT_RE = re.compile(
    r"start-?ups?|SaaS|software compan|tech compan|scale-?ups?|founders?|R&D tax|research and development|"
    r"SEIS|\bEIS\b|advance assurance|EMI (?:scheme|option|valuation)|share (?:scheme|option)|"
    r"venture capital|VC[- ]backed|fundrais|Series A|seed round|fintech|MRR|ARR\b|burn rate|runway", re.I)
UK_RE = re.compile(r"\bUK\b|United Kingdom|HMRC|England and Wales|Companies House|ICAEW|ACCA|\bVAT\b|£|"
                   r"London|Manchester|Bristol|Edinburgh", re.I)
US_RE = re.compile(r"\bIRS\b|Delaware C[- ]?Corp|\b401\(k\)|\bCPA firm\b|\bGAAP\b(?! UK)|\bUSD\b|\$\d", re.I)
PRICE_RE = re.compile(r"£\s?\d{1,3}(?:\.\d{2})?\s?(?:\+\s?VAT\s?)?(?:/|per\s?)m(?:onth|o)?", re.I)


def page_summary(html: str, url: str) -> dict:
    soup = BeautifulSoup(html, "html.parser")
    for t in soup(["script", "style", "noscript"]):
        t.decompose()
    title = (soup.title.get_text(strip=True) if soup.title else "")
    md = soup.find("meta", attrs={"name": "description"})
    meta = md.get("content", "")[:300] if md else ""
    h1 = [h.get_text(" ", strip=True)[:120] for h in soup.find_all("h1")][:3]
    h2 = [h.get_text(" ", strip=True)[:120] for h in soup.find_all("h2")][:12]
    text = re.sub(r"\s+", " ", soup.get_text(" ", strip=True))
    excerpt = ""
    m = TOPIC_TEXT_RE.search(text)
    if m:
        excerpt = text[max(0, m.start() - 150): m.start() + 350]
    links = []
    for a in soup.find_all("a", href=True):
        href = a["href"]
        full = urljoin(url, href)
        if urlparse(full).netloc.replace("www.", "") == urlparse(url).netloc.replace("www.", "") \
                and TOPIC_LINK_RE.search(href):
            links.append(full)
    return {"url": url, "title": title, "meta": meta, "h1": h1, "h2": h2,
            "topic_excerpt": excerpt,
            "topic_mentions": len(TOPIC_TEXT_RE.findall(text)),
            "uk_signals": sorted(set(x.group(0) for x in UK_RE.finditer(text)))[:10],
            "us_signals": sorted(set(x.group(0) for x in US_RE.finditer(text)))[:8],
            "monthly_prices": sorted(set(PRICE_RE.findall(text)))[:8],
            "topic_links": list(dict.fromkeys(links))[:8],
            "word_count": len(text.split())}


def main() -> None:
    cands = json.loads((HERE / "candidates.json").read_text(encoding="utf-8"))["survivors"]
    out = {}
    for dom in cands:
        rec: dict = {"domain": dom, "hit_count": cands[dom]["hit_count"],
                     "queries": cands[dom]["queries"]}
        home_url = f"https://{dom}/"
        try:
            status, html = fetch_url(home_url)
            if status != 200 or not html:
                rec["error"] = f"homepage status {status}"
                out[dom] = rec
                print(f"{dom}: FAIL {status}")
                continue
            rec["homepage"] = page_summary(html, home_url)
        except Exception as e:
            rec["error"] = f"homepage: {e}"
            out[dom] = rec
            print(f"{dom}: EXC {e}")
            continue
        for link in rec["homepage"]["topic_links"]:
            if link.rstrip("/") == home_url.rstrip("/"):
                continue
            try:
                status, html = fetch_url(link)
                if status == 200 and html:
                    rec["service_page"] = page_summary(html, link)
                    break
            except Exception:
                continue
        out[dom] = rec
        print(f"{dom}: OK mentions={rec['homepage']['topic_mentions']} "
              f"svc={'service_page' in rec}")
    (HERE / "raw" / "verify_evidence.json").write_text(json.dumps(out, indent=1), encoding="utf-8")
    print(f"done: {len(out)} domains")


if __name__ == "__main__":
    main()
