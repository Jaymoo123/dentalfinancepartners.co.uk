"""R3 tier1 crypto — Stage 2: fetch-verify every surviving candidate domain.

Cloned from tier1_startups_tech/s2_verify_fetch.py; crypto signal regexes.
Also captures SOFTWARE-vs-ACCOUNTANT signals (the critical distinction here:
Koinly/Recap/CoinTracker-class tools + directories vs real UK crypto-specialist firms)
and US-vs-UK signals. Script gathers, does not judge.
Writes raw/verify_evidence.json.
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
    r"crypto|bitcoin|btc|ethereum|defi|nft|staking|mining|airdrops?|web3|digital-asset|"
    r"day-trad|forex|cgt|capital-gains|hmrc|disclosure|nudge", re.I)
TOPIC_TEXT_RE = re.compile(
    r"crypto(?:currency|asset|-asset)?s?|bitcoin|ethereum|DeFi|NFTs?|staking|mining rewards?|"
    r"airdrops?|section 104|share pooling|bed and breakfast(?:ing)? rule|nudge letter|"
    r"exchange tokens|digital assets?|Koinly|Recap|CoinTracker|day trad(?:er|ing)|forex", re.I)
UK_RE = re.compile(r"\bUK\b|United Kingdom|HMRC|England and Wales|Companies House|ICAEW|ACCA|CIOT|"
                   r"\bATT\b|self assessment|\bVAT\b|£|London|Manchester|Birmingham|Edinburgh", re.I)
US_RE = re.compile(r"\bIRS\b|Form 8949|\b1099\b|\bCPA firm\b|\b401\(k\)|\bUSD\b|\$\d", re.I)
SOFTWARE_RE = re.compile(
    r"start (?:your )?free trial|free plan|sign ?up free|connect (?:your )?(?:wallet|exchange)s?|"
    r"API sync|import (?:your )?transactions|tax report in minutes|portfolio track(?:er|ing)|"
    r"pricing plans?|per tax year", re.I)
DIRECTORY_RE = re.compile(
    r"find (?:a|an) (?:crypto )?(?:tax )?(?:accountant|professional|advisor)|"
    r"accountant directory|browse (?:our )?directory|verified (?:crypto )?accountants", re.I)
PRICE_RE = re.compile(r"£\s?\d{2,4}(?:,\d{3})?(?:\.\d{2})?\s?(?:\+\s?VAT)?", re.I)


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
            "software_signals": sorted(set(x.group(0) for x in SOFTWARE_RE.finditer(text)))[:8],
            "directory_signals": sorted(set(x.group(0) for x in DIRECTORY_RE.finditer(text)))[:5],
            "prices": sorted(set(PRICE_RE.findall(text)))[:10],
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
