"""High-street map, Leg 5: rival page inventory via sitemap crawl. FREE.

The same UK accountancy firms recur across the 352 SERPs from leg 4. Crawling their
sitemaps once gives their entire published page inventory, which answers the real
competition question for all 176 niches at once: does ANY established UK firm publish
a page for this trade, and if so how deep does it go?

A trade nobody publishes for is an open field. A trade three firms cover with one thin
page each is a quality win. A trade one firm covers with a nine-page cluster is a fight.

Stage 1 (default): rank rival domains by SERP frequency, write rivals.json.
Stage 2 (--crawl) : crawl the top N sitemaps, write raw/rival_sitemaps.json.
Stage 3 (--match) : per niche, count rival URLs naming that trade, write rivals_by_niche.json.

Adapted from tier2_retail/s4_sitemaps.py.
"""
from __future__ import annotations

import csv
import json
import re
import sys
import time
from collections import Counter, defaultdict
from pathlib import Path
from urllib.parse import urlparse

import httpx

HERE = Path(__file__).parent
SERP = HERE / "raw" / "serp"
UA = "Mozilla/5.0 (compatible; SEOResearchBot/1.0; +https://emplifex.com)"
LOC_RE = re.compile(r"<loc>\s*(.*?)\s*</loc>", re.I | re.S)
TOP_N = 40

# Not competitors: platforms, government, software, our own estate.
SKIP_RE = re.compile(
    r"reddit|youtube|facebook|linkedin|twitter|x\.com|instagram|tiktok|quora|"
    r"\.gov\.uk|gov\.uk$|service\.gov\.uk|wikipedia|amazon\.|ebay\.|"
    r"quickbooks|xero\.|sage\.|freeagent|freshbooks|clearbooks|zoho|"
    r"indeed|glassdoor|checkatrade|yell\.com|trustpilot|companiesnest|"
    r"\.au$|\.com\.au|\.nz$|\.ca$|\.in$|\.ie$", re.I)

OWN_RE = re.compile(
    r"hollowaydavies|dentalfinance|trusteetax|hospitalitytax|carehometax|"
    r"foundertaxpartners|cryptotaxpartners|pharmacytax|ecommercefinance|"
    r"emplifex|ashfield", re.I)

STOP = {"the", "a", "an", "for", "of", "to", "in", "on", "and", "or", "uk", "your",
        "tax", "accountant", "accountants", "accounting", "accounts", "business",
        "company", "vat", "hmrc", "self", "employed", "scheme"}


def toks(s: str) -> set[str]:
    return {t for t in re.findall(r"[a-z]+", s.lower()) if t not in STOP and len(t) > 1}


def singular(t: str) -> str:
    if t.endswith("ies") and len(t) > 4:
        return t[:-3] + "y"
    if t.endswith("s") and not t.endswith("ss"):
        return t[:-1]
    return t


def rank_rivals() -> list[tuple[str, int]]:
    freq: Counter[str] = Counter()
    for path in SERP.glob("*.json"):
        d = json.loads(path.read_text(encoding="utf-8"))
        res = d["body"]["tasks"][0].get("result") or [{}]
        for it in (res[0] or {}).get("items") or []:
            if it.get("type") != "organic":
                continue
            dom = (it.get("domain") or "").lower().lstrip("www.")
            if not dom or SKIP_RE.search(dom) or OWN_RE.search(dom):
                continue
            freq[dom] += 1
    return freq.most_common()


def get(client: httpx.Client, url: str) -> tuple[int, str]:
    try:
        r = client.get(url)
        return r.status_code, r.text
    except Exception as e:  # noqa: BLE001
        return -1, str(e)


def crawl_domain(client: httpx.Client, domain: str) -> dict:
    base = f"https://{domain}"
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
        st, txt = get(client, sm)
        if st != 200 or "<loc" not in txt.lower():
            continue
        locs = LOC_RE.findall(txt)
        if "<sitemapindex" in txt.lower():
            for child in locs[:25]:
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
    return {"sitemap_url": used, "url_count": len(urls),
            "urls": list(dict.fromkeys(urls))[:6000]}


def main() -> None:
    if "--match" in sys.argv:
        sitemaps = json.loads((HERE / "raw" / "rival_sitemaps.json").read_text(encoding="utf-8"))
        with (HERE / "niches.tsv").open(encoding="utf-8") as f:
            niches = list(csv.DictReader(f, delimiter="\t"))

        # slug tokens per rival URL, computed once
        page_index: list[tuple[str, str, set[str]]] = []
        for dom, d in sitemaps.items():
            for u in d.get("urls") or []:
                slug = urlparse(u).path.strip("/").replace("/", " ").replace("-", " ")
                if not slug:
                    continue
                page_index.append((dom, u, {singular(t) for t in toks(slug)}))

        out: dict[str, dict] = {}
        for n in niches:
            core = {singular(t) for t in toks(n["seed_core"])}
            if not core:
                continue
            hits = [(dom, u) for dom, u, tk in page_index if core and core <= tk]
            by_dom = Counter(d for d, _ in hits)
            out[n["id"]] = {
                "name": n["name"],
                "rival_pages": len(hits),
                "rival_domains": len(by_dom),
                "deepest_rival": by_dom.most_common(1)[0] if by_dom else None,
                "by_domain": dict(by_dom.most_common(10)),
                "examples": [u for _, u in hits[:12]],
            }
        (HERE / "rivals_by_niche.json").write_text(json.dumps(out, indent=1), encoding="utf-8")
        covered = sum(1 for v in out.values() if v["rival_pages"])
        print(f"indexed {len(page_index)} rival pages across {len(sitemaps)} domains")
        print(f"niches with at least one rival page: {covered} of {len(out)}")
        return

    ranked = rank_rivals()
    (HERE / "rivals.json").write_text(json.dumps(ranked, indent=1), encoding="utf-8")
    print(f"{len(ranked)} rival domains ranked by SERP frequency. Top 20:")
    for dom, c in ranked[:20]:
        print(f"  {c:4d}  {dom}")

    if "--crawl" not in sys.argv:
        print("\n(pass --crawl to fetch sitemaps for the top domains)")
        return

    out: dict[str, dict] = {}
    with httpx.Client(headers={"User-Agent": UA}, follow_redirects=True, timeout=30.0) as c:
        for dom, _ in ranked[:TOP_N]:
            out[dom] = crawl_domain(c, dom)
            print(f"{dom}: {out[dom]['url_count']} urls via {out[dom]['sitemap_url']}",
                  flush=True)
            time.sleep(0.8)
    (HERE / "raw" / "rival_sitemaps.json").write_text(json.dumps(out), encoding="utf-8")
    print(f"\nDONE. {sum(v['url_count'] for v in out.values())} rival URLs indexed.")


if __name__ == "__main__":
    main()
