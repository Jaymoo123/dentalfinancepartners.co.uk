"""Stage 5: pull OUR existing ranked-query corpus from GSC (property + dentists).
This is the cannibalisation baseline — what we already get impressions/clicks for.
Also grabs our own sitemap slugs. Writes our_corpus.json.
"""
from __future__ import annotations

import json
import re
import sys
from datetime import date, timedelta
from pathlib import Path

import httpx

sys.path.insert(0, "C:/Users/user/Documents/Accounting")
from agents.utils.gsc_client_oauth import GSCClient  # noqa: E402

HERE = Path(__file__).parent
SITES = {
    "property": "sc-domain:propertytaxpartners.co.uk",
    "dentists": "sc-domain:dentalfinancepartners.co.uk",
}
SITEMAPS = {
    "property": "https://propertytaxpartners.co.uk/sitemap.xml",
    "dentists": "https://www.dentalfinancepartners.co.uk/sitemap.xml",
}
LOC_RE = re.compile(r"<loc>\s*(.*?)\s*</loc>", re.I | re.S)


def gsc_queries(client: GSCClient, site_url: str, days: int = 120) -> list[dict]:
    end = date.today()
    start = end - timedelta(days=days)
    body = {
        "startDate": start.isoformat(),
        "endDate": end.isoformat(),
        "dimensions": ["query"],
        "rowLimit": 25000,
    }
    resp = client.service.searchanalytics().query(siteUrl=site_url, body=body).execute()
    out = []
    for r in resp.get("rows", []):
        out.append({
            "query": r["keys"][0].lower().strip(),
            "impressions": r.get("impressions", 0),
            "clicks": r.get("clicks", 0),
            "position": round(r.get("position", 0), 1),
        })
    return out


def fetch_sitemap_slugs(url: str) -> list[str]:
    try:
        with httpx.Client(follow_redirects=True, timeout=30.0,
                          headers={"User-Agent": "Mozilla/5.0 SEOResearchBot"}) as c:
            r = c.get(url)
            if r.status_code != 200:
                return []
            urls = LOC_RE.findall(r.text)
            # one level of index recursion
            if "<sitemapindex" in r.text.lower():
                all_u = []
                for child in urls[:30]:
                    rc = c.get(child.strip())
                    if rc.status_code == 200:
                        all_u += LOC_RE.findall(rc.text)
                urls = all_u
            return [u.strip() for u in urls]
    except Exception as e:  # noqa: BLE001
        print(f"  sitemap error {url}: {e}")
        return []


def main() -> None:
    client = GSCClient()
    corpus = {}
    for site, url in SITES.items():
        try:
            q = gsc_queries(client, url)
        except Exception as e:  # noqa: BLE001
            print(f"{site}: GSC error {e}")
            q = []
        slugs = fetch_sitemap_slugs(SITEMAPS[site])
        corpus[site] = {"queries": q, "sitemap_urls": slugs}
        print(f"{site}: {len(q)} GSC queries, {len(slugs)} sitemap urls, "
              f"{sum(r['impressions'] for r in q)} total impressions")
    (HERE / "our_corpus.json").write_text(json.dumps(corpus, indent=1), encoding="utf-8")
    print("-> our_corpus.json")


if __name__ == "__main__":
    main()
