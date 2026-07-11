"""R3 pilot charities — Stage 2: fetch-verify every surviving candidate domain.

For each domain in candidates.json: fetch homepage; find and fetch ONE
charity/CIC service page (link containing charity|not-for-profit|cic|...).
Extract title, meta description, h1/h2s, UK signals, charity-signal excerpt.
Writes raw/verify_evidence.json. Verdicts are judged by Claude afterwards
from this evidence file (script gathers, does not judge).
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

CHARITY_LINK_RE = re.compile(
    r"charit|not-for-profit|not_for_profit|nonprofit|non-profit|cic\b|community-interest|"
    r"social-enterprise|independent-examin|church|academ|sorp|gift-aid", re.I)
CHARITY_TEXT_RE = re.compile(
    r"charit(?:y|ies)|not[- ]for[- ]profit|non[- ]profit|independent examination|SORP|"
    r"gift aid|community interest compan|CIC|social enterprise|trustee", re.I)
UK_RE = re.compile(r"\bUK\b|United Kingdom|HMRC|Charity Commission|OSCR|England and Wales|"
                   r"Companies House|ICAEW|ACCA|\bVAT\b|£", re.I)


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
    # first charity-signal sentence-ish excerpt
    excerpt = ""
    m = CHARITY_TEXT_RE.search(text)
    if m:
        excerpt = text[max(0, m.start() - 150): m.start() + 350]
    links = []
    for a in soup.find_all("a", href=True):
        href = a["href"]
        full = urljoin(url, href)
        if urlparse(full).netloc.replace("www.", "") == urlparse(url).netloc.replace("www.", "") \
                and CHARITY_LINK_RE.search(href):
            links.append(full)
    return {"url": url, "title": title, "meta": meta, "h1": h1, "h2": h2,
            "charity_excerpt": excerpt,
            "charity_mentions": len(CHARITY_TEXT_RE.findall(text)),
            "uk_signals": sorted(set(x.group(0) for x in UK_RE.finditer(text)))[:10],
            "charity_links": list(dict.fromkeys(links))[:8],
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
        # one charity service page
        for link in rec["homepage"]["charity_links"]:
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
        print(f"{dom}: OK mentions={rec['homepage']['charity_mentions']} "
              f"svc={'service_page' in rec}")
    (HERE / "raw" / "verify_evidence.json").write_text(json.dumps(out, indent=1), encoding="utf-8")
    print(f"done: {len(out)} domains")


if __name__ == "__main__":
    main()
