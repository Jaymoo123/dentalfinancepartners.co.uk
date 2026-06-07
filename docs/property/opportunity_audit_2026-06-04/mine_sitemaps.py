"""Interim sitemap-mine of harvest-discovered competitor domains (parallel).

Reads an IMMUTABLE frozen domain snapshot (default _interim01_frozen_domains.json),
crawls each genuine competitor's sitemap, extracts property-topical URLs, and
Jaccard-diffs every slug against our 686 live pages to flag net-new candidates.

HYGIENE / PROVENANCE (so 'how many did we do?' is always answerable, never recalled):
  - Input is a FROZEN snapshot, never the live (moving) _serp_domains.json.
  - _sitemap_manifest.json is the LEDGER: one terminal row per domain
    (crawled | no_sitemap | failed | dropped+reason), counts, snapshot, time.
  - _sitemap_cache/<domain>.json holds each domain's topical-URL result.
  - Resumable: a domain with a terminal manifest status is skipped. The later FULL
    pass reuses this same manifest+cache, so it only mines the DELTA; the ledger
    stays cumulative and true.

Read-only against our repo + external sitemaps. Writes ONLY inside this audit folder.
"""
from __future__ import annotations
import os, sys, json, re, time, argparse, threading
from pathlib import Path
from urllib.parse import urlparse
from xml.etree import ElementTree as ET
from concurrent.futures import ThreadPoolExecutor

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
import httpx

CACHE = HERE / "_sitemap_cache"; CACHE.mkdir(exist_ok=True)
MANIFEST = HERE / "_sitemap_manifest.json"
PROGRESS = HERE / "_sitemap_progress.txt"
HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; property-opportunity-audit/1.0)"}
WORKERS = 12
_lock = threading.Lock()

# ---- domain gate: DROP clear non-competitors, KEEP everything plausibly a competitor ----
DROP_EXACT = {
    "rightmove.co.uk","zoopla.co.uk","onthemarket.com","primelocation.com","numbeo.com","globalpropertyguide.com",
    "moneysavingexpert.com","forums.moneysavingexpert.com","which.co.uk","unbiased.co.uk","money.co.uk","uswitch.com",
    "comparethemarket.com","moneyfacts.co.uk","thisismoney.co.uk","wise.com","monzo.com",
    "ii.co.uk","hl.co.uk","fidelity.co.uk","personalinvesting.jpmorgan.com","jpmorgan.com","vanguardinvestor.co.uk",
    "evelyn.com","saltus.co.uk","sortyourmoneyout.co.uk",
    "facebook.com","linkedin.com","youtube.com","twitter.com","x.com","instagram.com","tiktok.com","pinterest.com",
    "reddit.com","quora.com","mumsnet.com","en.wikipedia.org","wikipedia.org","grokipedia.com",
    "google.com","bing.com","duckduckgo.com","yahoo.com","amazon.co.uk","apple.com","medium.com","substack.com",
    "indeed.com","reed.co.uk","totaljobs.com","talent.com","uk.talent.com","loopnet.co.uk","zillow.com","airbnb.co.uk",
    "news.airbnb.com","rentalsource.com","financial-ombudsman.org.uk","businessnewstoday.co.uk","mindmeister.com",
    "scenelinklist.com","cleartax.in","forbes.com","statcan.gc.ca",
}
DROP_PATTERNS = [
    re.compile(r"\.gov(\.uk)?$", re.I), re.compile(r"\.gov\.[a-z]{2,3}$", re.I),
    re.compile(r"\.(cn|ru|in|au|nz|ie|es|it|fr|de|us|cy|ca)$", re.I),
    re.compile(r"^(bbc|ft|theguardian|telegraph|thetimes|mirror|dailymail|express|thesun|independent|metro|standard|reuters|bloomberg|cnbc)\.", re.I),
    re.compile(r"\.nhs\.uk$", re.I),
]
def domain_gate(dom: str):
    d = dom.lower()
    if d in DROP_EXACT:
        return False, "non-competitor"
    for p in DROP_PATTERNS:
        if p.search(d):
            return False, "foreign/gov/news/platform"
    return True, ""

# ---- sitemap crawl (bounded + blog-prioritised) ----
SITEMAP_PATHS = ["/sitemap.xml","/sitemap_index.xml","/sitemap-index.xml","/wp-sitemap.xml","/post-sitemap.xml","/sitemap1.xml","/sitemaps.xml"]
BLOG_HINT = re.compile(r"(post|blog|article|news|guide|insight|page)", re.I)
SKIP_SM = re.compile(r"(product|image|img|category|tag|author|attachment|wp-content|media)", re.I)
def fetch(url, timeout=12.0):
    try:
        with httpx.Client(follow_redirects=True, timeout=timeout, headers=HEADERS) as c:
            r = c.get(url); return r.status_code, r.text
    except Exception:
        return 0, ""
def crawl_domain(dom, max_subsitemaps=12, delay=0.3):
    base = "https://" + dom
    root_body = None
    for p in SITEMAP_PATHS:
        st, body = fetch(base + p)
        if st == 200 and ("<urlset" in body or "<sitemapindex" in body):
            root_body = body; break
    if root_body is None:
        st, body = fetch(base + "/robots.txt")
        if st == 200:
            for line in body.splitlines():
                if line.lower().startswith("sitemap:"):
                    s2, b2 = fetch(line.split(":", 1)[1].strip())
                    if s2 == 200 and ("<urlset" in b2 or "<sitemapindex" in b2):
                        root_body = b2
                    break
    if root_body is None:
        return [], False
    ns = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
    try:
        rx = ET.fromstring(root_body)
    except ET.ParseError:
        return [], False
    urls = []
    if rx.tag.endswith("sitemapindex"):
        sublocs = [sm.find(ns + "loc").text.strip() for sm in rx.findall(ns + "sitemap")
                   if sm.find(ns + "loc") is not None and sm.find(ns + "loc").text]
        sublocs = [s for s in sublocs if not SKIP_SM.search(s)]
        sublocs.sort(key=lambda s: (0 if BLOG_HINT.search(s) else 1))
        capped = len(sublocs) > max_subsitemaps
        for loc in sublocs[:max_subsitemaps]:
            st, b = fetch(loc)
            if st == 200:
                try:
                    sx = ET.fromstring(b)
                    for u in sx.findall(ns + "url"):
                        l = u.find(ns + "loc")
                        if l is not None and l.text: urls.append(l.text.strip())
                except ET.ParseError:
                    pass
            time.sleep(delay)
        return sorted(set(urls)), capped
    for u in rx.findall(ns + "url"):
        l = u.find(ns + "loc")
        if l is not None and l.text: urls.append(l.text.strip())
    return sorted(set(urls)), False

# ---- property-topical filter (ported from property_sitemap_sweep_v2.py) ----
TOPIC_TOKENS = {"landlord","landlords","rental","rentals","tenant","tenants","tenancy","rent","property","properties","btl","buytolet",
 "sdlt","stamp","duty","cgt","vat","mtd","ir35","iht","inheritance","ated","s24","incorporation","incorporate","ltd","spv","fic",
 "nrl","expat","ppr","lbtt","ltt","ads","renters","rra","fhl","hmo","trust","trusts","llp","mortgage","mortgages","remortgage",
 "refinance","tax","taxes","taxation","accountant","accounting","bookkeeping","lease","leasehold","freehold","ground","deposit",
 "eviction","transfer","disposal","relief","reliefs","allowance","allowances","deduction","deductions","expense","expenses","yield",
 "capital","gains","gain","company","companies","corporate","corporation","letting","let","lets","holiday","furnished","overseas",
 "estate","estates","welsh","scottish","income","profit","profits","hmrc","purchase","sale","selling","buying","sell","interest"}
DATE_RE = re.compile(r"^\d{4,}-\d|\b(20[01]\d|202\d)\b")
NEWS_VERB = re.compile(r"\b(rises?|reveals?|warns?|launches?|announces?|criticis|defends?|reports?|says?|claims?|targets?|fights?|wins?|loses?|raids?|seized?|jailed|calls?|urges?|sets?|backs?|opposes?|condemns?|slams?)\b", re.I)
PERSON = re.compile(r"\b(rachel-reeves|reeves|jeremy-hunt|angela-rayner|rayner|keir-starmer|starmer|sunak|truss|hammond|osborne)\b", re.I)
SKIP = [re.compile(p, re.I) for p in [r"^(meet|our|about|hello|welcome)-",r"^(careers?|jobs?)-",r"-(joins|appointed|promoted|welcomes?|named)(-|$)",
 r"^(staff|team|partner|director|senior)-",r"^(case-study|testimonial|review)-",r"-(christmas|easter|halloween)",r"-(quiz|crossword|puzzle)",
 r"-(podcast|webinar|video|seminar|event)",r"^cookies?-",r"^privacy-"]]
def slug_of(url):
    p = urlparse(url).path.rstrip("/"); return p.rsplit("/", 1)[-1] if "/" in p else p
def toks(slug): return set(re.split(r"[^a-z0-9]+", slug.lower())) - {""}
def is_topical(url):
    slug = slug_of(url)
    if not slug or len(slug) < 8: return False
    if DATE_RE.search(slug) or NEWS_VERB.search(slug) or PERSON.search(slug): return False
    for s in SKIP:
        if s.search(slug): return False
    t = toks(slug)
    if not (3 <= len(t) <= 25): return False
    return len(t & TOPIC_TOKENS) >= 2
def jaccard(a, b):
    if not a or not b: return 0.0
    return len(a & b) / len(a | b)

def load_manifest(): return json.loads(MANIFEST.read_text()) if MANIFEST.exists() else {}
def save_manifest(m): MANIFEST.write_text(json.dumps(m, indent=2))

def process_domain(dom, snap_id, our_tok):
    keep, reason = domain_gate(dom)
    if not keep:
        return dom, {"status": "dropped", "reason": reason, "snapshot": snap_id}
    try:
        urls, capped = crawl_domain(dom)
    except Exception as exc:
        return dom, {"status": "failed", "error": str(exc)[:120], "snapshot": snap_id}
    if not urls:
        return dom, {"status": "no_sitemap", "snapshot": snap_id}
    topical = []
    for u in urls:
        if not is_topical(u): continue
        tk = toks(slug_of(u))
        bj = max((jaccard(tk, ot) for ot in our_tok), default=0.0)
        topical.append({"url": u, "slug": slug_of(u), "best_jaccard": round(bj, 2)})
    cand = [t for t in topical if t["best_jaccard"] < 0.30]
    (CACHE / f"{dom}.json").write_text(json.dumps(
        {"domain": dom, "snapshot": snap_id, "n_all_urls": len(urls),
         "n_topical": len(topical), "n_candidates": len(cand), "topical": topical}, indent=2))
    return dom, {"status": "crawled", "snapshot": snap_id, "capped": capped,
                 "n_all_urls": len(urls), "n_topical": len(topical), "n_candidates": len(cand),
                 "crawled_at": time.strftime("%Y-%m-%d %H:%M:%S")}

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--snapshot", default=str(HERE / "_interim01_frozen_domains.json"))
    args = ap.parse_args()
    snap = json.loads(Path(args.snapshot).read_text())
    snap_id = snap.get("snapshot_id", "?")
    domains = list(snap["domains"].keys())

    our_slugs = [p.stem for p in (ROOT / "Property/web/content/blog").glob("*.md")]
    our_tok = [toks(s) for s in our_slugs]

    manifest = load_manifest()
    terminal = ("crawled", "no_sitemap", "failed", "dropped")
    todo = [d for d in domains if manifest.get(d, {}).get("status") not in terminal]
    t0 = time.time(); counter = [0]

    def worker(dom):
        dd, rec = process_domain(dom, snap_id, our_tok)
        with _lock:
            manifest[dd] = rec
            counter[0] += 1
            if counter[0] % 15 == 0 or counter[0] == len(todo):
                save_manifest(manifest)
                by = {}
                for m in manifest.values(): by[m["status"]] = by.get(m["status"], 0) + 1
                crawled = [m for m in manifest.values() if m["status"] == "crawled"]
                tot_cand = sum(m.get("n_candidates", 0) for m in crawled)
                PROGRESS.write_text(
                    f"snapshot: {snap_id} ({snap.get('new_domain_count')} domains, frozen {snap.get('captured_at')})\n"
                    f"processed this run: {counter[0]}/{len(todo)}  (manifest total {sum(by.values())})  elapsed {int(time.time()-t0)//60} min\n"
                    f"status tally: {by}\n"
                    f"crawled with sitemap: {len(crawled)} | total topical candidate URLs (<0.30 Jaccard): {tot_cand}\n")

    with ThreadPoolExecutor(max_workers=WORKERS) as ex:
        list(ex.map(worker, todo))
    with _lock:
        save_manifest(manifest)
        PROGRESS.write_text(PROGRESS.read_text() + "\nDONE\n")

if __name__ == "__main__":
    main()
