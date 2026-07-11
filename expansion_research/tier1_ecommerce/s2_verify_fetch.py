"""R3 tier1 ecommerce — Stage 2: fetch-verify every surviving candidate domain.

Adapted from tier1_care/s2_verify_fetch.py. Script gathers evidence; Claude judges.
Writes raw/verify_evidence.json. Resumable: pass domains as args to re-run a subset.
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

ECOM_LINK_RE = re.compile(
    r"e-?commerce|amazon|\bfba\b|shopify|etsy|ebay|online-?seller|online-?retail|"
    r"marketplace|dropship|online-?store|digital-?seller|multi-?channel|"
    r"\ba2x\b|link-?my-?books|\boss\b|\bioss\b|seller-?central", re.I)
ECOM_TEXT_RE = re.compile(
    r"e-?commerce|amazon (?:seller|fba|store|business)|\bFBA\b|shopify|etsy|ebay seller|"
    r"online seller|online retail|marketplace seller|dropship|online store|"
    r"multi-?channel|settlement report|A2X|Link My Books|seller central|"
    r"\bIOSS\b|\bOSS\b|pan-?eu", re.I)
UK_RE = re.compile(r"\bUK\b|United Kingdom|HMRC|Companies House|ICAEW|ACCA|\bVAT\b|£|"
                   r"England|Scotland|Wales|London|Manchester|Birmingham", re.I)


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
    m = ECOM_TEXT_RE.search(text)
    if m:
        excerpt = text[max(0, m.start() - 150): m.start() + 350]
    links = []
    for a in soup.find_all("a", href=True):
        href = a["href"]
        full = urljoin(url, href)
        if urlparse(full).netloc.replace("www.", "") == urlparse(url).netloc.replace("www.", "") \
                and ECOM_LINK_RE.search(href):
            links.append(full)
    return {"url": url, "title": title, "meta": meta, "h1": h1, "h2": h2,
            "ecom_excerpt": excerpt,
            "ecom_mentions": len(ECOM_TEXT_RE.findall(text)),
            "uk_signals": sorted(set(x.group(0) for x in UK_RE.finditer(text)))[:10],
            "ecom_links": list(dict.fromkeys(links))[:8],
            "word_count": len(text.split())}


def main() -> None:
    cands = json.loads((HERE / "candidates.json").read_text(encoding="utf-8"))["survivors"]
    only = set(sys.argv[1:])
    out_path = HERE / "raw" / "verify_evidence.json"
    out = json.loads(out_path.read_text(encoding="utf-8")) if out_path.exists() else {}
    for dom in cands:
        if only and dom not in only:
            continue
        if not only and dom in out:
            continue  # resume support
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
        for link in rec["homepage"]["ecom_links"]:
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
        print(f"{dom}: OK mentions={rec['homepage']['ecom_mentions']} "
              f"svc={'service_page' in rec}")
        out_path.write_text(json.dumps(out, indent=1), encoding="utf-8")
    out_path.write_text(json.dumps(out, indent=1), encoding="utf-8")
    print(f"done: {len(out)} domains")


if __name__ == "__main__":
    main()
