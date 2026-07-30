"""Dental-finance vertical — Stage 1: harvest competitor sitemaps.

Free HTTP only. Discovers the full rankable topic universe by URL, beyond the
hand-researched seed set. Writes raw/rival_sitemaps.json.

Usage: python s1_sitemaps.py   (domains hard-coded below from the research pass)
"""
from __future__ import annotations

import json
import re
import sys
import time
from pathlib import Path

import httpx

HERE = Path(__file__).parent
UA = "Mozilla/5.0 (compatible; SEOResearchBot/1.0; +https://emplifex.com)"
LOC_RE = re.compile(r"<loc>\s*(.*?)\s*</loc>", re.I | re.S)

# Competitor set from the adjacent-vertical research (dental practice finance,
# mortgages, protection + generalist commercial-finance brokers with dental hubs).
DOMAINS = [
    "rangewell.com",
    "samera.co.uk",
    "dentalelite.co.uk",
    "pfmdental.co.uk",
    "fiftyninefinancial.co.uk",
    "foxdavidson.co.uk",
    "fdcommercial.co.uk",
    "braemarfinance.co.uk",
    "alphacapitaluk.com",
    "cliftonpf.co.uk",
    "ukbusiness.finance",
    "wesleyan.co.uk",
    "practicecover.co.uk",
    "lilyheaddentalpracticesales.co.uk",
]


def get(client: httpx.Client, url: str) -> tuple[int, str]:
    try:
        r = client.get(url)
        return r.status_code, r.text
    except Exception as e:  # noqa: BLE001
        return -1, str(e)


def crawl_domain(client: httpx.Client, domain: str) -> dict:
    base = f"https://{domain}"
    tried: list[str] = []
    candidates: list[str] = []
    st, txt = get(client, f"{base}/robots.txt")
    if st == 200:
        candidates += re.findall(r"(?im)^sitemap:\s*(\S+)", txt)
    candidates += [f"{base}/sitemap.xml", f"{base}/sitemap_index.xml",
                   f"{base}/wp-sitemap.xml", f"{base}/sitemap-index.xml",
                   f"{base}/page-sitemap.xml"]
    urls: list[str] = []
    used = None
    for sm in dict.fromkeys(candidates):
        tried.append(sm)
        st, txt = get(client, sm)
        if st != 200 or "<loc" not in txt.lower():
            continue
        locs = LOC_RE.findall(txt)
        # sitemap index -> recurse one level (grab child sitemaps)
        if "<sitemapindex" in txt.lower():
            for child in locs[:40]:
                st2, txt2 = get(client, child.strip())
                if st2 == 200:
                    urls += LOC_RE.findall(txt2)
                time.sleep(0.3)
        else:
            urls += locs
        used = sm
        if urls:
            break
    urls = [u.strip() for u in urls]
    return {"sitemap_url": used, "tried": tried, "url_count": len(urls),
            "urls": list(dict.fromkeys(urls))}


def main() -> None:
    domains = sys.argv[1:] or DOMAINS
    out = {}
    (HERE / "raw").mkdir(parents=True, exist_ok=True)
    with httpx.Client(headers={"User-Agent": UA}, follow_redirects=True, timeout=30.0) as c:
        for d in domains:
            out[d] = crawl_domain(c, d)
            print(f"{d}: {out[d]['url_count']} urls via {out[d]['sitemap_url']}")
            time.sleep(0.8)
    (HERE / "raw" / "rival_sitemaps.json").write_text(json.dumps(out, indent=1), encoding="utf-8")
    total = sum(v["url_count"] for v in out.values())
    print(f"\nTOTAL urls harvested: {total}")


if __name__ == "__main__":
    main()
