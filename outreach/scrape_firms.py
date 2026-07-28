"""Scrape UK accounting firms (Companies House) + find their websites (Serper).

Usage:
  python outreach/scrape_firms.py pull [--years 2000-2026] [--out outreach/firms.csv]
  python outreach/scrape_firms.py enrich [--limit 200] [--csv outreach/firms.csv]

pull   = Companies House advanced search, SIC 69201/69202/69203, active companies.
         Sliced by incorporation year (API caps ~10k rows per query).
enrich = fills the `website` column via Serper, skipping rows already done.
         Resumable; writes back after every 25 lookups.
"""
import argparse
import csv
import os
import re
import sys
import time

import requests

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def load_env():
    env = {}
    with open(os.path.join(ROOT, ".env"), encoding="utf-8") as f:
        for line in f:
            m = re.match(r"^([A-Z0-9_]+)=(.*)$", line.strip())
            if m:
                env[m.group(1)] = m.group(2).strip()
    return env

ENV = load_env()
CH_KEY = ENV["COMPANIES_HOUSE_API_KEY"]
SERPER_KEY = ENV["SERPER_API_KEY"]

SIC_CODES = ["69201", "69202", "69203"]  # accounting/auditing, bookkeeping, tax consultancy
CH_URL = "https://api.company-information.service.gov.uk/advanced-search/companies"

FIELDS = ["company_number", "name", "sic", "incorporated", "locality", "postcode", "address", "website", "website_source"]

# domains that are never the firm's own site
BLOCKED_DOMAINS = {
    "companieshouse.gov.uk", "find-and-update.company-information.service.gov.uk",
    "endole.co.uk", "companycheck.co.uk", "bizdb.co.uk", "checkcompany.co.uk",
    "linkedin.com", "facebook.com", "instagram.com", "x.com", "twitter.com",
    "yell.com", "192.com", "cylex-uk.co.uk", "thomsonlocal.com", "freeindex.co.uk",
    "trustpilot.com", "uk.trustpilot.com", "google.com", "opencorporates.com",
    "dnb.com", "globaldatabase.com", "companiesintheuk.co.uk", "bark.com",
    "icaew.com", "accaglobal.com", "unbiased.co.uk", "gov.uk", "indeed.com",
    "glassdoor.co.uk", "reed.co.uk", "yelp.com", "yelp.co.uk",
    "hugedomains.com", "sedo.com", "dan.com", "afternic.com", "godaddy.com",
    "domainmarket.com", "undeveloped.com", "parkingcrew.net",
}


def ch_pull(years, out_path):
    session = requests.Session()
    session.auth = (CH_KEY, "")
    seen = set()
    rows = []
    if os.path.exists(out_path):
        with open(out_path, newline="", encoding="utf-8") as f:
            rows = list(csv.DictReader(f))
            seen = {r["company_number"] for r in rows}
        print(f"resuming: {len(rows)} rows already in {out_path}")

    y0, y1 = years
    for year in range(y0, y1 + 1):
        start_index = 0
        size = 500
        while True:
            params = {
                "sic_codes": ",".join(SIC_CODES),
                "company_status": "active",
                "incorporated_from": f"{year}-01-01",
                "incorporated_to": f"{year}-12-31",
                "size": size,
                "start_index": start_index,
            }
            r = session.get(CH_URL, params=params, timeout=30)
            if r.status_code == 429:
                print("  rate limited, sleeping 60s")
                time.sleep(60)
                continue
            if r.status_code == 404:  # CH returns 404 for zero-hit slices
                break
            r.raise_for_status()
            data = r.json()
            items = data.get("items", [])
            total = data.get("hits", 0)
            if start_index == 0:
                print(f"{year}: {total} firms")
                if total > 10000:
                    print(f"  WARNING {year} exceeds 10k API window; some rows unreachable this slice")
            for it in items:
                num = it.get("company_number")
                if not num or num in seen:
                    continue
                seen.add(num)
                addr = it.get("registered_office_address") or {}
                rows.append({
                    "company_number": num,
                    "name": it.get("company_name", ""),
                    "sic": ";".join(it.get("sic_codes") or []),
                    "incorporated": it.get("date_of_creation", ""),
                    "locality": addr.get("locality", ""),
                    "postcode": addr.get("postal_code", ""),
                    "address": ", ".join(filter(None, [addr.get("address_line_1"), addr.get("locality"), addr.get("postal_code")])),
                    "website": "",
                    "website_source": "",
                })
            start_index += size
            if not items or start_index >= min(total, 10000):
                break
            time.sleep(0.5)  # CH allows 600 req / 5 min
        write_csv(out_path, rows)
    print(f"done: {len(rows)} firms -> {out_path}")


def write_csv(path, rows):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=FIELDS)
        w.writeheader()
        w.writerows(rows)


def domain_of(url):
    m = re.match(r"https?://(?:www\.)?([^/]+)", url or "")
    return m.group(1).lower() if m else ""


def clean_name(name):
    return re.sub(r"\b(LTD|LIMITED|LLP|PLC)\.?$", "", name.strip(), flags=re.I).strip()


def serper_website(name, locality):
    q = f'"{clean_name(name)}" accountants {locality or "UK"}'
    r = requests.post(
        "https://google.serper.dev/search",
        headers={"X-API-KEY": SERPER_KEY},
        json={"q": q, "gl": "gb", "num": 10},
        timeout=30,
    )
    r.raise_for_status()
    firm_tokens = [t for t in re.findall(r"[a-z]{4,}", clean_name(name).lower()) if t not in ("and", "the")]
    for item in r.json().get("organic", []):
        link = item.get("link", "")
        dom = domain_of(link)
        if not dom or any(dom == b or dom.endswith("." + b) for b in BLOCKED_DOMAINS):
            continue
        # accept only if a firm-name token appears in domain or result title
        title = (item.get("title") or "").lower()
        if any(t in dom.replace("-", "") or t in title for t in firm_tokens):
            return f"https://{dom}", q
    return "", q


def guess_website(name):
    """Free fallback: try obvious domains built from the firm name, verify name on page."""
    base = clean_name(name).lower()
    slug = re.sub(r"[^a-z0-9]", "", base)
    slug_dash = re.sub(r"[^a-z0-9]+", "-", base).strip("-")
    candidates = []
    for s in dict.fromkeys([slug, slug_dash]):
        if not (3 <= len(s) <= 40):
            continue
        for tld in (".co.uk", ".com", ".uk"):
            candidates.append(f"https://www.{s}{tld}")
    tokens = [t for t in re.findall(r"[a-z]{4,}", base) if t not in ("and", "the")]
    for url in candidates:
        try:
            r = requests.get(url, timeout=8, headers={"User-Agent": "Mozilla/5.0"}, allow_redirects=True)
            if r.status_code != 200:
                continue
            final_dom = domain_of(r.url) or domain_of(url)
            # redirect must land on a firm-named, non-blocked domain (kills parking resellers + unrelated redirects)
            if any(final_dom == b or final_dom.endswith("." + b) for b in BLOCKED_DOMAINS):
                continue
            if not any(t in final_dom.replace("-", "") for t in tokens):
                continue
            page = r.text[:20000].lower()
            # ponytail: parked-domain pages often 200; require a firm-name token AND an accountancy word
            if any(t in page for t in tokens) and re.search(r"account|bookkeep|tax", page):
                return f"https://{final_dom}"
        except requests.RequestException:
            continue
    return ""


def enrich_guess(csv_path, limit):
    from concurrent.futures import ThreadPoolExecutor
    with open(csv_path, newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))
    todo = [r for r in rows if not r["website"] and r["website_source"] not in ("none_found", "guess_none")]
    todo = todo[:limit]
    print(f"guessing {len(todo)} rows, 16 threads")
    done = 0
    with ThreadPoolExecutor(max_workers=16) as ex:
        for r, site in zip(todo, ex.map(lambda r: guess_website(r["name"]), todo)):
            r["website"] = site
            r["website_source"] = "guess" if site else "guess_none"
            done += 1
            if done % 200 == 0:
                write_csv(csv_path, rows)
                found = sum(1 for x in rows if x["website"])
                print(f"  {done}/{len(todo)} done, {found} sites total")
    write_csv(csv_path, rows)
    found = sum(1 for r in rows if r["website"])
    print(f"guessed {done}; total with website: {found}/{len(rows)}")


def ddg_website(name, locality):
    """Free: DuckDuckGo HTML endpoint, same filtering as Serper path."""
    q = f'"{clean_name(name)}" accountants {locality or "UK"}'
    r = requests.post(
        "https://html.duckduckgo.com/html/",
        data={"q": q},
        headers={"User-Agent": "Mozilla/5.0"},
        timeout=20,
    )
    r.raise_for_status()
    firm_tokens = [t for t in re.findall(r"[a-z]{4,}", clean_name(name).lower()) if t not in ("and", "the")]
    # result links + titles from the HTML
    for m in re.finditer(r'<a[^>]+class="result__a"[^>]+href="([^"]+)"[^>]*>(.*?)</a>', r.text, re.S):
        link, title = m.group(1), re.sub(r"<[^>]+>", "", m.group(2)).lower()
        # ddg wraps links: //duckduckgo.com/l/?uddg=<urlencoded>
        um = re.search(r"uddg=([^&]+)", link)
        if um:
            from urllib.parse import unquote
            link = unquote(um.group(1))
        dom = domain_of(link)
        if not dom or any(dom == b or dom.endswith("." + b) for b in BLOCKED_DOMAINS):
            continue
        # ponytail: domain-only match — title match lets registry aggregators through
        if any(t in dom.replace("-", "") for t in firm_tokens):
            return f"https://{dom}"
    return ""


def enrich_ddg(csv_path, limit):
    with open(csv_path, newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))
    todo = [r for r in rows if not r["website"] and r["website_source"] not in ("none_found", "ddg_none")]
    print(f"{len(todo)} rows for ddg; doing up to {limit}")
    done = 0
    for r in todo[:limit]:
        try:
            site = ddg_website(r["name"], r["locality"])
        except requests.RequestException as e:
            print(f"  ddg error on {r['name']}: {e}; sleeping 60s")
            time.sleep(60)
            continue
        r["website"] = site
        r["website_source"] = "ddg" if site else "ddg_none"
        done += 1
        if done % 25 == 0:
            write_csv(csv_path, rows)
            print(f"  {done} done, last: {r['name']} -> {site or 'none'}")
        time.sleep(2)  # ponytail: polite pace, ddg blocks aggressive scrapers
    write_csv(csv_path, rows)
    found = sum(1 for r in rows if r["website"])
    print(f"ddg enriched {done}; total with website: {found}/{len(rows)}")


def enrich(csv_path, limit):
    with open(csv_path, newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))
    todo = [r for r in rows if not r["website"] and r["website_source"] != "none_found"]
    print(f"{len(todo)} rows need enrichment; doing up to {limit}")
    done = 0
    for r in todo[:limit]:
        try:
            site, q = serper_website(r["name"], r["locality"])
        except requests.RequestException as e:
            print(f"  serper error on {r['name']}: {e}; stopping")
            break
        r["website"] = site
        r["website_source"] = "serper" if site else "none_found"
        done += 1
        if done % 25 == 0:
            write_csv(csv_path, rows)
            print(f"  {done} done, last: {r['name']} -> {site or 'none'}")
        time.sleep(0.3)
    write_csv(csv_path, rows)
    found = sum(1 for r in rows if r["website"])
    print(f"enriched {done}; total with website: {found}/{len(rows)}")


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)
    p1 = sub.add_parser("pull")
    p1.add_argument("--years", default="1990-2026")
    p1.add_argument("--out", default=os.path.join(ROOT, "outreach", "firms.csv"))
    for cmd in ("enrich", "guess", "ddg"):
        p2 = sub.add_parser(cmd)
        p2.add_argument("--limit", type=int, default=200)
        p2.add_argument("--csv", default=os.path.join(ROOT, "outreach", "firms.csv"))
    a = ap.parse_args()
    if a.cmd == "pull":
        y0, y1 = a.years.split("-")
        ch_pull((int(y0), int(y1)), a.out)
    elif a.cmd == "enrich":
        enrich(a.csv, a.limit)
    elif a.cmd == "ddg":
        enrich_ddg(a.csv, a.limit)
    else:
        enrich_guess(a.csv, a.limit)
