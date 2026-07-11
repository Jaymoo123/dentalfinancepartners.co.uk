"""R3 tier1 crypto — Stage 4a: sitemap-crawl verified rivals + own estate slug inventory.

Usage: python s4_sitemaps.py domain1 domain2 ...
Writes raw/rival_sitemaps.json: {domain: {sitemap_url, urls: [...], error}}.
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


def get(client: httpx.Client, url: str) -> tuple[int, str]:
    try:
        r = client.get(url)
        return r.status_code, r.text
    except Exception as e:
        return -1, str(e)


def crawl_domain(client: httpx.Client, domain: str) -> dict:
    base = f"https://{domain}"
    tried = []
    # discover via robots.txt first
    candidates = []
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
        # sitemap index? recurse one level
        if locs and all(l.rstrip("/").endswith((".xml",)) or "sitemap" in l.lower().rsplit("/", 1)[-1] for l in locs) and "<sitemapindex" in txt.lower():
            for child in locs[:20]:
                st2, txt2 = get(client, child.strip())
                if st2 == 200:
                    urls += LOC_RE.findall(txt2)
                time.sleep(0.5)
        else:
            urls += locs
        used = sm
        if urls:
            break
    urls = [u.strip() for u in urls]
    return {"sitemap_url": used, "tried": tried, "url_count": len(urls),
            "urls": list(dict.fromkeys(urls))}


def main() -> None:
    domains = sys.argv[1:]
    assert domains, "pass rival domains as args"
    out = {}
    with httpx.Client(headers={"User-Agent": UA}, follow_redirects=True, timeout=30.0) as c:
        for d in domains:
            out[d] = crawl_domain(c, d)
            print(f"{d}: {out[d]['url_count']} urls via {out[d]['sitemap_url']}")
            time.sleep(1.0)
    (HERE / "raw" / "rival_sitemaps.json").write_text(json.dumps(out, indent=1), encoding="utf-8")


if __name__ == "__main__":
    main()
