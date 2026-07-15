"""R3 tier2 travel — Stage 2: fetch-verify surviving candidate domains.

Fetches homepage + best travel-service page per domain; records evidence
(title/meta/h1/h2/travel-term excerpt + travel-service link paths).
Claude judges DEDICATED vs SECTION vs OTHER. Writes raw/verify_evidence.json.
"""
from __future__ import annotations

import json
import re
from pathlib import Path
from urllib.parse import urljoin

import httpx
from bs4 import BeautifulSoup

HERE = Path(__file__).parent
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"}

TRAVEL_LINK_RE = re.compile(r"travel|tour-?operator|toms|atol|abta|tour-?ism", re.I)
TRAVEL_TEXT_RE = re.compile(
    r"travel agen|tour operator|TOMS|tour operators.? margin scheme|ATOL|ABTA|"
    r"travel industry|travel compan|travel business|pipeline monies|travel trust", re.I)

SKIP = {"bing.com", "uk.linkedin.com", "jobs.accaglobal.com", "michaelpage.co.uk",
        "my.careerdp.com", "jehlum.in", "bongthom.com", "fiverr.com", "library.croneri.co.uk",
        "lexisnexis.co.uk", "doittravel.net"}


def summarise(html: str) -> dict:
    soup = BeautifulSoup(html, "html.parser")
    for t in soup(["script", "style", "noscript"]):
        t.decompose()
    title = soup.title.get_text(strip=True) if soup.title else ""
    md = soup.find("meta", attrs={"name": "description"})
    meta = md.get("content", "")[:300] if md else ""
    h1 = [h.get_text(" ", strip=True)[:120] for h in soup.find_all("h1")][:3]
    h2 = [h.get_text(" ", strip=True)[:120] for h in soup.find_all("h2")][:12]
    text = re.sub(r"\s+", " ", soup.get_text(" ", strip=True))
    excerpt = ""
    m = TRAVEL_TEXT_RE.search(text)
    if m:
        excerpt = text[max(0, m.start() - 150):m.start() + 350]
    links = sorted({a.get("href", "") for a in soup.find_all("a", href=True)
                    if TRAVEL_LINK_RE.search(a.get("href", ""))})[:15]
    return {"title": title, "meta": meta, "h1": h1, "h2": h2,
            "travel_hits": len(TRAVEL_TEXT_RE.findall(text)),
            "excerpt": excerpt, "travel_links": links}


def main() -> None:
    cands = json.loads((HERE / "candidates.json").read_text(encoding="utf-8"))["survivors"]
    out_path = HERE / "raw" / "verify_evidence.json"
    out = json.loads(out_path.read_text(encoding="utf-8")) if out_path.exists() else {}

    with httpx.Client(headers=UA, timeout=15.0, follow_redirects=True) as c:
        for dom in cands:
            if dom in SKIP or dom in out:
                continue
            rec: dict = {"domain": dom}
            try:
                r = c.get(f"https://{dom}/")
                rec["home_status"] = r.status_code
                rec["home"] = summarise(r.text) if r.status_code == 200 else {}
            except Exception as e:
                rec["home_status"] = -1
                rec["error"] = str(e)[:200]
            # follow the best travel link if homepage found one
            links = (rec.get("home") or {}).get("travel_links") or []
            if links:
                url = urljoin(f"https://{dom}/", links[0])
                try:
                    r2 = c.get(url)
                    if r2.status_code == 200:
                        rec["travel_page"] = {"url": url, **summarise(r2.text)}
                except Exception as e:
                    rec["travel_page"] = {"url": url, "error": str(e)[:200]}
            out[dom] = rec
            out_path.write_text(json.dumps(out, indent=1), encoding="utf-8")
            print(dom, rec.get("home_status"), (rec.get("home") or {}).get("travel_hits"))

    print(f"done, verified={len(out)}")


if __name__ == "__main__":
    main()
