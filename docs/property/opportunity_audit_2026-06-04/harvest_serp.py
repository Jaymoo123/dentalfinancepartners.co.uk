"""Comprehensive, multi-engine competitor discovery for property.

Sweeps the GSC+Bing query union across MULTIPLE search engines (DuckDuckGo, Bing,
Startpage, Mojeek, Yahoo) via the `ddgs` library. Each engine = one gentle,
self-paced worker thread (~1 request / 3-6s, jittered). The per-query competitor
set is the UNION across engines, so we capture domains any single engine misses.

Bot-resilience:
  - garble guard: non-ASCII-heavy titles => treat as block, DON'T cache, retry
  - all-same-domain guard: suspicious => DON'T cache, retry
  - genuine "No results" => cache empty (valid), so we don't retry forever
  - per-engine cool-off then auto-pause on sustained failure (resumable)

Read-only against Supabase/engines. Writes ONLY into this audit folder:
  _serp_cache/<engine>/<hash>.json   per (engine, query); resumable
  _serp_domains.json                 merged {domain: {count, engines, queries, urls}}
  _serp_progress.txt                 heartbeat
"""
from __future__ import annotations
import os, sys, json, hashlib, time, random, threading
from pathlib import Path
from collections import defaultdict
from concurrent.futures import ThreadPoolExecutor

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]  # opportunity_audit -> property -> docs -> Accounting
sys.path.insert(0, str(ROOT))
from dotenv import load_dotenv
load_dotenv(ROOT / ".env")
import httpx
from ddgs import DDGS

TOKEN = os.getenv("SUPABASE_ACCESS_TOKEN"); REF = "dhlxwmvmkrfnmcgjbntk"
MGMT = f"https://api.supabase.com/v1/projects/{REF}/database/query"

CACHE = HERE / "_serp_cache"; CACHE.mkdir(exist_ok=True)
DOMAINS_OUT = HERE / "_serp_domains.json"
PROGRESS = HERE / "_serp_progress.txt"

ENGINES = ["duckduckgo", "bing", "startpage", "mojeek", "yahoo"]
SLEEP_MIN, SLEEP_MAX = 3.0, 6.0   # gentle per-engine pacing

EXCL = {"gov.uk","legislation.gov.uk","reddit.com","quora.com","en.wikipedia.org","wikipedia.org",
        "linkedin.com","youtube.com","facebook.com","google.com","google.co.uk","bing.com","duckduckgo.com",
        "mumsnet.com","moneysavingexpert.com","which.co.uk","instagram.com","twitter.com","x.com","tiktok.com",
        "pinterest.com","yell.com","trustpilot.com","indeed.com","glassdoor.co.uk","apple.com","amazon.co.uk"}

def mgmt(sql):
    r = httpx.post(MGMT, headers={"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"},
                   json={"query": sql}, timeout=90); r.raise_for_status(); return r.json()

def regdom(h):
    h = (h or "").lower().strip()
    if "://" in h: h = h.split("/")[2]
    if h.startswith("www."): h = h[4:]
    return h.split(":")[0]

def qhash(q): return hashlib.sha1(q.encode("utf-8")).hexdigest()[:16]

def nonascii_ratio(s):
    return sum(1 for c in (s or "") if ord(c) > 0x7E) / max(len(s or ""), 1)

def fetch(engine, query):
    """Return list[{domain,link,title}] (possibly empty=valid), or None on suspected block (=> retry)."""
    try:
        with DDGS() as d:
            raw = list(d.text(query, region="uk-en", backend=engine, max_results=10))
    except Exception as e:
        return [] if "No results" in str(e) else None
    if not raw:
        return []
    titles = " ".join(r.get("title", "") for r in raw)
    if nonascii_ratio(titles) > 0.20:
        return None  # garbled => suspected bot redirect; retry later
    out = []
    for r in raw:
        link = r.get("href") or r.get("url") or ""
        out.append({"domain": regdom(link), "link": link, "title": r.get("title", "")})
    doms = {o["domain"] for o in out if o["domain"]}
    if len(out) > 1 and len(doms) == 1:
        return None  # all-same-domain => suspicious; retry
    return out

def sweep_engine(engine, queries):
    ecache = CACHE / engine; ecache.mkdir(parents=True, exist_ok=True)
    consec_bad = 0
    for q in queries:
        cf = ecache / f"{qhash(q)}.json"
        if cf.exists():
            try:
                json.loads(cf.read_text()); continue
            except Exception:
                pass
        res = fetch(engine, q)
        time.sleep(random.uniform(SLEEP_MIN, SLEEP_MAX))
        if res is None:
            consec_bad += 1
            if consec_bad in (6, 12, 18):
                time.sleep(180)  # cool-off
            if consec_bad >= 24:
                (HERE / f"_paused_{engine}.flag").write_text(f"paused: {consec_bad} consec failures")
                return  # auto-pause this engine; resumable on re-run
            continue
        cf.write_text(json.dumps({"query": q, "engine": engine, "results": res}))
        consec_bad = 0

def aggregate(known):
    agg = defaultdict(lambda: {"count": 0, "engines": set(), "queries": [], "urls": []})
    done_by_engine = {}
    for ecache in CACHE.iterdir():
        if not ecache.is_dir():
            continue
        eng = ecache.name; cnt = 0
        for cf in ecache.glob("*.json"):
            cnt += 1
            try: d = json.loads(cf.read_text())
            except Exception: continue
            seen = set()
            for r in d["results"]:
                dom = r["domain"]
                if not dom or dom in EXCL or dom.endswith(".gov.uk") or "propertytaxpartners" in dom: continue
                if dom in seen: continue
                seen.add(dom)
                a = agg[dom]; a["count"] += 1; a["engines"].add(eng)
                if len(a["queries"]) < 8: a["queries"].append(d["query"])
                if r.get("link") and len(a["urls"]) < 8: a["urls"].append(r["link"])
        done_by_engine[eng] = cnt
    ser = {d: {"count": v["count"], "engines": sorted(v["engines"]), "queries": v["queries"], "urls": v["urls"]}
           for d, v in agg.items()}
    new = {d: v for d, v in ser.items() if d not in known}
    DOMAINS_OUT.write_text(json.dumps(
        {"all": ser, "new_vs_known": sorted(new, key=lambda d: -new[d]["count"])}, indent=2))
    return ser, new, done_by_engine

def main():
    queries = [r["query"] for r in mgmt(
        "SELECT DISTINCT query FROM ("
        "  SELECT query FROM gsc_query_data WHERE site_key='property' AND query IS NOT NULL "
        "  UNION "
        "  SELECT query FROM bing_query_data WHERE site_key='property' AND query IS NOT NULL"
        ") t ORDER BY query") if r.get("query")]
    known = set(regdom(r["domain"]) for r in mgmt(
        "SELECT DISTINCT cp.domain FROM competitor_serps cs JOIN competitor_pages cp ON cp.serp_id=cs.id WHERE cs.site_key='property'"))
    total = len(queries)
    PROGRESS.write_text(f"starting: {total} queries x {len(ENGINES)} engines; {len(known)} domains already known\n")

    with ThreadPoolExecutor(max_workers=len(ENGINES)) as ex:
        futs = {ex.submit(sweep_engine, e, queries): e for e in ENGINES}
        while not all(f.done() for f in futs):
            time.sleep(60)
            ser, new, done = aggregate(known)
            paused = [f.name[8:-5] for f in HERE.glob("_paused_*.flag")]
            PROGRESS.write_text(
                f"per-engine done (of {total}): {done}\n"
                f"paused engines: {paused}\n"
                f"distinct competitor domains: {len(ser)}\n"
                f"NEW domains (not in prior {len(known)}-domain universe): {len(new)}\n"
                f"top new: {sorted(new, key=lambda d: -new[d]['count'])[:30]}\n")
    ser, new, done = aggregate(known)
    PROGRESS.write_text(PROGRESS.read_text() + f"\nDONE. distinct={len(ser)} new={len(new)}\n")

if __name__ == "__main__":
    main()
