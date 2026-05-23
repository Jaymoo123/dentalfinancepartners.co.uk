"""Sitemap re-sweep for Property Net-New Wave 4 prep (v2, tightened).

Reads competitor universe from briefs/property/_competitor_universe_v2.json,
fetches sitemaps for each domain (rate-limited polite crawl, 5-level recursion cap),
filters URLs by tightened property/landlord/tax slug heuristics, then compares
against existing Property pages + the candidate pool.

Caches sitemap data per domain in briefs/property/_sitemap_cache_v2/ so the
script is cheap to re-run after the first crawl. Delete the cache directory
to force a fresh crawl.

Outputs:
  - briefs/property/_topic_gaps_delta_<today>.json (full machine-readable list)
  - docs/property/topic_gaps_delta_<today>.md (manager-readable per-cluster)

Charter: NETNEW_PROGRAM section 16.21. DO NOT merge into topic_gaps_final.md
without manager review.
"""
from __future__ import annotations

import json
import re
import sys
import time
from collections import defaultdict
from pathlib import Path
from urllib.parse import urlparse
from xml.etree import ElementTree as ET

import httpx

ROOT = Path(__file__).resolve().parent
TODAY = "2026-05-23"

SITEMAP_PATHS = [
    "/sitemap.xml",
    "/sitemap_index.xml",
    "/sitemap-index.xml",
    "/wp-sitemap.xml",
    "/sitemap1.xml",
    "/sitemap-1.xml",
    "/blog-sitemap.xml",
    "/post-sitemap.xml",
    "/sitemaps.xml",
]

HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; property-net-new-discovery/2.0)"}

INCLUDE_HINTS = [
    "/blog/", "/guides/", "/insights/", "/news/", "/articles/",
    "/post/", "/resources/", "/knowledge/", "/journal/", "/article/",
    "/help-and-advice/", "/expertise/", "/our-thinking/", "/learn/",
    "/library/", "/publications/", "/case-studies/", "/services/",
    "/sectors/", "/calculators/", "/tools/", "/tax-tips/",
    "/uncategori",
]

# --- fetch helpers ---

def fetch_url(url, timeout=30.0):
    try:
        with httpx.Client(follow_redirects=True, timeout=timeout, headers=HEADERS) as c:
            r = c.get(url)
            return r.status_code, r.text, str(r.url)
    except Exception as exc:
        return 0, "error: " + str(exc), url


def parse_sitemap_xml(body):
    try:
        root = ET.fromstring(body)
    except ET.ParseError:
        return [], []
    ns = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
    indexes, urls = [], []
    if root.tag.endswith("sitemapindex"):
        for sm in root.findall(ns + "sitemap"):
            loc = sm.find(ns + "loc")
            if loc is not None and loc.text:
                indexes.append(loc.text.strip())
    else:
        for u in root.findall(ns + "url"):
            loc = u.find(ns + "loc")
            if loc is not None and loc.text:
                urls.append(loc.text.strip())
    return indexes, urls


def crawl_domain(domain, max_depth=5, per_request_delay=1.0):
    base = "https://" + domain
    urls = []
    seen_sitemaps = set()
    queue = []

    for path in SITEMAP_PATHS:
        u = base + path
        time.sleep(per_request_delay)
        status, body, _ = fetch_url(u)
        if status == 200 and ("<urlset" in body or "<sitemapindex" in body):
            queue.append((u, 0))
            break

    if not queue:
        time.sleep(per_request_delay)
        status, body, _ = fetch_url(base + "/robots.txt")
        if status == 200:
            for line in body.splitlines():
                if line.lower().startswith("sitemap:"):
                    sm = line.split(":", 1)[1].strip()
                    queue.append((sm, 0))

    while queue:
        sm_url, depth = queue.pop()
        if sm_url in seen_sitemaps:
            continue
        if depth > max_depth:
            continue
        seen_sitemaps.add(sm_url)
        time.sleep(per_request_delay)
        status, body, _ = fetch_url(sm_url)
        if status == 429:
            time.sleep(10)
            continue
        if status != 200:
            continue
        indexes, page_urls = parse_sitemap_xml(body)
        for ix in indexes:
            queue.append((ix, depth + 1))
        urls.extend(page_urls)

    deduped = sorted(set(urls))
    topical = [u for u in deduped if is_topic_match(u)]
    return deduped, topical


CLUSTERS = [
    ("SDLT", ["sdlt", "stamp", "duty", "surcharge", "first-time-buyer", "mdr", "multiple-dwellings", "additional-dwelling"]),
    ("LBTT_Scottish", ["lbtt", "ads", "scotland", "scottish"]),
    ("LTT_Welsh", ["ltt", "wales", "welsh"]),
    ("CGT", ["cgt", "capital-gains", "capital-gain", "ppr", "private-residence", "letting-relief", "rebasing"]),
    ("ATED", ["ated", "enveloped", "envelopment"]),
    ("MTD", ["mtd", "making-tax-digital", "quarterly-update", "itsa"]),
    ("IHT", ["iht", "inheritance", "grob", "gift-with-reservation", "trust"]),
    ("RRA_2025", ["renters", "rrb", "rra", "tenancy", "eviction", "section-21"]),
    ("LtdCo_Incorporation", ["incorporation", "incorporate", "limited-company", "ltd-co", "spv", "fic", "family-investment-company"]),
    ("S24_MortgageInterest", ["section-24", "s24", "mortgage-interest", "finance-cost"]),
    ("NonResident_Expat", ["non-resident", "nrl", "expat", "non-residents", "overseas"]),
    ("VAT", ["vat", "option-to-tax", "vat-registration"]),
    ("CompaniesHouse_ECCTA", ["companies-house", "eccta"]),
    ("IR35", ["ir35"]),
    ("FHL", ["fhl", "furnished-holiday", "holiday-let"]),
    ("HMO", ["hmo", "multi-occupancy"]),
    ("PropertyDev_Trading", ["development", "developer", "transactions-in-land", "trading"]),
    ("SelfAssessment", ["self-assessment", "sa100", "sa105", "sa108"]),
    ("CIS", ["cis"]),
    ("CapitalAllowances", ["capital-allowance", "annual-investment-allowance", "aia"]),
    ("RentARoom", ["rent-a-room"]),
    ("Lease_Freehold", ["lease", "leasehold", "freehold", "ground-rent", "service-charge"]),
    ("Mortgage_BTL", ["mortgage", "refinanc", "remortgag", "bridging", "let-to-buy"]),
    ("AccountantByCity", ["accountant", "accountants", "specialist"]),
]


# --- topical filter (tightened-v3) ---

TOPIC_TOKENS = {
    "landlord", "landlords", "rental", "rentals", "tenant", "tenants",
    "tenancy", "tenancies", "rent",
    "property", "properties",
    "btl", "buytolet",
    "sdlt", "stamp", "duty",
    "cgt",
    "vat",
    "mtd",
    "ir35",
    "iht", "inheritance",
    "ated",
    "s24",
    "incorporation", "incorporate", "incorporated",
    "ltd", "spv", "fic",
    "nrl", "expat",
    "ppr",
    "lbtt", "ltt", "ads",
    "renters", "rrb", "rra",
    "fhl",
    "hmo",
    "trust", "trusts",
    "llp",
    "mortgage", "mortgages", "remortgage", "refinance",
    "tax", "taxes", "taxation",
    "accountant", "accounting", "bookkeeping",
    "lease", "leasehold", "freehold",
    "ground",
    "deposit", "deposits",
    "eviction", "evictions", "evict",
    "transfer", "disposal",
    "relief", "reliefs", "allowance", "allowances",
    "deduction", "deductions",
    "expense", "expenses",
    "yield", "yields",
    "capital", "gains", "gain",
    "company", "companies", "corporate", "corporation",
    "letting", "let", "lets",
    "holiday", "furnished",
    "non-resident", "non-residents", "overseas",
    "estate", "estates",
    "welsh", "scottish",
    "income", "profit", "profits",
    "hmrc",
    "purchase", "sale", "selling", "buying", "sell",
    "interest",
}

DATE_PREFIX_RE = re.compile(r"^\d{4,}-\d|\b(20[01]\d|2020|2021|2022|2023|2024|2025|2026|2027)\b")

FOREIGN_PATH_RE = re.compile(r"/(es-es|de-de|fr-fr|pt-pt|it-it|nl-nl|pl-pl|sv-se|fi-fi|no-no|da-dk|cs-cz|ro-ro)/")

NEWS_VERB_RE = re.compile(r"\b(rises?|reveals?|warns?|launches?|announces?|criticis|defends?|reports?|says?|claims?|targets?|fights?|wins?|loses?|raids?|seized?|jailed|calls?|urges?|sets?|backs?|opposes?|condemns?|slams?)\b", re.IGNORECASE)

PERSON_NAME_RE = re.compile(r"\b(rachel-reeves|reeves|jeremy-hunt|angela-rayner|rayner|keir-starmer|starmer|boris|johnson|sunak|truss|cameron|hammond|osborne|khan|gove|raab)\b", re.IGNORECASE)

# News-style path indicators (broader than v2)
NEWS_PATH_RE = re.compile(r"/(news|press|press-release|press-releases|media|blog/category)/", re.IGNORECASE)

SKIP_SLUG_PATTERNS = [
    re.compile(p, re.IGNORECASE) for p in [
        r"^(meet|our|about|hello|welcome)-",
        r"^(careers?|jobs?)-",
        r"-(joins|appointed|promoted|welcomes?|named)$",
        r"-(joins|appointed|promoted|welcomes?|named)-",
        r"^(staff|team|partner|director|senior)-",
        r"^(case-study|testimonial|review)-",
        r"^(thank|thanks|congratulations)-",
        r"-(christmas|easter|halloween|valentine)",
        r"-(quiz|crossword|puzzle)",
        r"^(weekly|monthly|quarterly|annual)-",
        r"-(news|update|bulletin|newsletter)-",
        r"-(podcast|webinar|video|seminar|event)",
        r"^(spring|autumn|winter|summer|budget|statement)-",
        r"-(opinion|comment|editorial)$",
        r"^cookies?-",
        r"^privacy-",
        # Broader news-y starters
        r"^(generation-|deep-dive|rental-housing|housing-crisis|tax-change|hmrc-knows|nhs-)",
        r"^(its-|labour-|tory-|conservative-)",
        # Long marketing-y slugs (40+ tokens are nearly always content-spam)
    ]
]

NON_ENGLISH_SLUG_RE = re.compile(r"\b(declaracion|renta|impuesto|empresa|deklaration|steuer|impot|imposta|stagione|tassa|belasting|skatt|skat|vero|az-|el-|los-|las-|der-|die-|das-)\b", re.IGNORECASE)


def tokens_from_slug(slug):
    return set(re.split(r"[^a-z0-9]+", slug.lower())) - {""}


def slug_from_url(url):
    path = urlparse(url).path.rstrip("/")
    return path.rsplit("/", 1)[-1] if "/" in path else path


def is_property_topical(url):
    p = urlparse(url)
    if FOREIGN_PATH_RE.search(p.path):
        return False
    if NEWS_PATH_RE.search(p.path):
        return False
    slug = slug_from_url(url)
    if not slug or len(slug) < 8:
        return False
    if DATE_PREFIX_RE.search(slug):
        return False
    if NEWS_VERB_RE.search(slug):
        return False
    if PERSON_NAME_RE.search(slug):
        return False
    if NON_ENGLISH_SLUG_RE.search(slug):
        return False
    for pat in SKIP_SLUG_PATTERNS:
        if pat.search(slug):
            return False
    tokens = tokens_from_slug(slug)
    if len(tokens) < 3:
        return False
    if len(tokens) > 25:
        # Marketing-text-as-slug (boltburdon.co.uk had a 30+ token slug)
        return False
    matches = tokens & TOPIC_TOKENS
    if len(matches) >= 2:
        return True
    if len(matches) == 1:
        path_lower = p.path.lower()
        strong_paths = ["/sdlt-", "/cgt-", "/landlord", "/tenant", "/property", "/buy-to-let", "/btl-", "/rental", "/iht-", "/mtd-", "/ir35", "/ated", "/vat-", "/ltd-", "/spv-", "/fic-"]
        for sp in strong_paths:
            if sp in path_lower:
                return True
    return False


CLUSTERS = [
    ("SDLT", ["sdlt", "stamp-duty", "surcharge", "first-time-buyer", "mdr", "multiple-dwellings", "additional-dwelling"]),
    ("LBTT_Scottish", ["lbtt", "scotland", "scottish"]),
    ("LTT_Welsh", ["ltt-", "welsh", "wales"]),
    ("CGT", ["cgt-", "-cgt", "capital-gains", "ppr", "private-residence", "letting-relief"]),
    ("ATED", ["ated", "enveloped"]),
    ("MTD", ["mtd-", "-mtd", "making-tax-digital", "itsa", "quarterly-update"]),
    ("IHT", ["iht-", "-iht", "inheritance-tax", "grob", "gift-with-reservation"]),
    ("RRA_2025", ["renters-rights", "rra", "tenancy", "eviction", "section-21", "section-8"]),
    ("LtdCo_Incorporation", ["incorporation", "incorporate", "limited-company", "ltd-co", "spv", "fic", "family-investment-company"]),
    ("S24_MortgageInterest", ["section-24", "s24-", "mortgage-interest", "finance-cost"]),
    ("NonResident_Expat", ["non-resident", "nrl", "expat", "overseas"]),
    ("VAT", ["vat-", "-vat", "option-to-tax", "vat-registration"]),
    ("CompaniesHouse_ECCTA", ["companies-house", "eccta"]),
    ("IR35", ["ir35"]),
    ("FHL", ["fhl", "furnished-holiday", "holiday-let"]),
    ("HMO", ["hmo-", "-hmo", "multi-occupancy"]),
    ("PropertyDev_Trading", ["development", "developer", "transactions-in-land", "trading-property"]),
    ("SelfAssessment", ["self-assessment", "sa-100", "sa-105", "sa-108"]),
    ("CIS", ["cis-construction", "construction-industry-scheme"]),
    ("CapitalAllowances", ["capital-allowance", "annual-investment-allowance", "aia-"]),
    ("RentARoom", ["rent-a-room"]),
    ("Lease_Freehold", ["lease-extension", "leasehold-reform", "ground-rent", "service-charge", "freehold"]),
    ("Mortgage_BTL", ["mortgage", "refinanc", "remortgag", "bridging", "let-to-buy"]),
    ("Trusts_Estates", ["trust-", "discretionary", "settlor", "beneficial-owner", "estate-planning"]),
    ("Partnership_LLP", ["partnership", "llp-", "-llp"]),
    ("AccountantByCity", ["accountant-london", "accountant-leeds", "accountant-manchester", "accountant-bristol", "accountant-glasgow", "-property-accountant"]),
    ("Penalties_HMRC", ["penalty", "penalties", "discovery-assessment", "hmrc-enquiry"]),
]

# Display these clusters in the MD (skip "Other")
DISPLAY_CLUSTERS_ONLY = True


def assign_cluster(slug):
    s = slug.lower()
    for name, markers in CLUSTERS:
        for m in markers:
            if m in s:
                return name
    return "Other"


def jaccard(a, b):
    a, b = set(a), set(b)
    if not a or not b:
        return 0.0
    return len(a & b) / len(a | b)




def main():
    universe = json.loads(Path("briefs/property/_competitor_universe_v2.json").read_text(encoding="utf-8"))
    target_doms = [d["domain"] for d in universe["kept"] if d["total_appearances"] >= 2]
    hand = ["ukpropertyaccountants.co.uk","uklandlordtax.co.uk","landlordstax.co.uk",
            "rossmartin.co.uk","dnsassociates.co.uk","taxaccountant.co.uk",
            "alexander-ene.co.uk","gorillaaccounting.com","geraldedelman.com",
            "propertyaccountant.co.uk","mytaxaccountant.co.uk","jamestoddandco.co.uk",
            "thp.co.uk","hich.co.uk","bhp.co.uk"]
    drop_for_sweep = {
        "uk.indeed.com","taxscape.deloitte.com","realpeoplemedia.co.uk",
        "dentalandmedical.com","eaguaranteedrent.co.uk","mipadlettings.com",
        "reedsrains.co.uk","pettyson.co.uk","nockdeighton.co.uk",
        "piccoloproperty.co.uk","candmproperties.co.uk","godirect.co.uk",
        "ukcalculator.com","blog.finexer.com","totallandlordinsurance.co.uk",
        "your-move.co.uk","urban-base.com",
    }
    universe_set = sorted((set(target_doms) | set(hand)) - drop_for_sweep)

    our_slugs = [p.stem for p in Path("Property/web/content/blog").glob("*.md")]
    text = Path("docs/property/topic_gaps_final.md").read_text(encoding="utf-8")
    candidate_slugs = re.findall(r"^- `([a-z0-9-]+)`", text, re.MULTILINE)

    our_token_sets = [tokens_from_slug(s) for s in our_slugs]
    cand_token_sets = [tokens_from_slug(s) for s in candidate_slugs]

    cache_dir = Path("briefs/property/_sitemap_cache_v2")
    all_topical_urls = {}
    no_data = []
    for dom in universe_set:
        cache_file = cache_dir / (dom + ".json")
        if cache_file.exists():
            data = json.loads(cache_file.read_text(encoding="utf-8"))
            all_urls = data.get("all", [])
        else:
            print("  crawling " + dom + " ...", flush=True)
            try:
                all_urls, _ = crawl_domain(dom)
                cache_file.write_text(json.dumps({"all": all_urls, "topical": []}), encoding="utf-8")
            except Exception as exc:
                print("    ERROR:", exc)
                no_data.append(dom)
                all_topical_urls[dom] = []
                continue
        topical = [u for u in all_urls if is_property_topical(u)]
        all_topical_urls[dom] = topical
        if not topical:
            no_data.append(dom)

    total_topical = sum(len(v) for v in all_topical_urls.values())
    print("[sweep-v2] Target domains:", len(universe_set))
    print("[sweep-v2] Existing Property blog pages:", len(our_slugs))
    print("[sweep-v2] Existing candidate pool slugs:", len(candidate_slugs))
    print("[sweep-v2] Total topical URLs (tightened filter):", total_topical)
    print("[sweep-v2] Domains with no topical data:", len(no_data))

    net_new = []
    partial = []
    seen_slugs = set()
    for dom, urls in all_topical_urls.items():
        for url in urls:
            slug = slug_from_url(url)
            tokens = tokens_from_slug(slug)
            if len(tokens) < 3:
                continue
            if slug in seen_slugs:
                continue
            seen_slugs.add(slug)
            best_existing = max((jaccard(tokens, ot) for ot in our_token_sets), default=0.0)
            best_candidate = max((jaccard(tokens, ct) for ct in cand_token_sets), default=0.0)
            best = max(best_existing, best_candidate)
            if best >= 0.55:
                continue
            entry = {
                "slug": slug,
                "url": url,
                "domain": dom,
                "tokens": sorted(tokens),
                "best_existing": round(best_existing, 2),
                "best_candidate": round(best_candidate, 2),
                "cluster": assign_cluster(slug),
            }
            if best < 0.30:
                net_new.append(entry)
            else:
                partial.append(entry)

    print("[sweep-v2] Net-new (<0.30 Jaccard):", len(net_new))
    print("[sweep-v2] Partial overlap (0.30-0.55):", len(partial))

    by_cluster_new = defaultdict(list)
    by_cluster_partial = defaultdict(list)
    for e in net_new:
        by_cluster_new[e["cluster"]].append(e)
    for e in partial:
        by_cluster_partial[e["cluster"]].append(e)

    out_json = Path("briefs/property/_topic_gaps_delta_2026-05-23.json")
    payload = {
        "summary": {
            "domains_with_data": len(all_topical_urls),
            "domains_no_data": no_data,
            "total_topical_urls": total_topical,
            "net_new_candidates": len(net_new),
            "partial_overlap_candidates": len(partial),
            "filter_version": "tightened-v2",
        },
        "net_new": net_new,
        "partial": partial,
    }
    out_json.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print("[sweep-v2] Wrote", out_json)
    return (universe_set, all_topical_urls, no_data, total_topical, net_new, partial, by_cluster_new, by_cluster_partial)


def write_md(universe_set, all_topical_urls, no_data, total_topical, net_new, partial, by_cluster_new, by_cluster_partial):
    out_md = Path("docs/property/topic_gaps_delta_2026-05-23.md")
    lines = []
    lines.append("# Property -- topic gaps delta (Wave 4 prep, 2026-05-23)")
    lines.append("")
    lines.append("Sitemap re-sweep against the data-driven competitor universe v2 (see `competitor_universe_v2.md`). Compared the top competitor domains by SERP frequency against:")
    lines.append("- 376 existing Property pages (`Property/web/content/blog/*.md`)")
    lines.append("- 395 slugs in the user-narrowed candidate pool (`docs/property/topic_gaps_final.md`)")
    lines.append("")
    lines.append("**Domains crawled:** {} (of {} target).".format(len(all_topical_urls), len(universe_set)))
    lines.append("**Domains with no topical data after filter (Cloudflare-blocked or no property-content):** {}".format(len(no_data)))
    if no_data:
        lines.append("- " + ", ".join("`" + d + "`" for d in no_data))
    lines.append("")
    lines.append("**Topical URLs after tightened filter:** {}".format(total_topical))
    lines.append("**Net-new candidates (Jaccard < 0.30):** {} (excluding `Other` cluster, see JSON for full dump)".format(len(net_new)))
    lines.append("**Partial-overlap (Jaccard 0.30-0.55, flagged for manager review):** {} (excluding `Other`)".format(len(partial)))
    lines.append("")
    lines.append("Filter (`is_property_topical`): slug has 3-25 tokens AND 2+ property/tax topic tokens (or 1 token + strong URL-path indicator). Excludes `/news/` paths, foreign-language slugs, date-prefixed slugs, politician-name slugs, news-verb slugs (`rises|reveals|warns|...`), staff/event-marketing slugs, marketing-text-as-slug.")
    lines.append("")
    lines.append("Token-similarity threshold per NETNEW_PROGRAM section 11.1: Jaccard < 0.30 = net-new; 0.30-0.55 = partial overlap (manager review); >= 0.55 = covered (dropped).")
    lines.append("")
    lines.append("**Charter:** NETNEW_PROGRAM section 16.21. DO NOT merge into `topic_gaps_final.md` without manager review.")
    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("## Cluster summary (excluding `Other`)")
    lines.append("")
    lines.append("| Cluster | Net-new | Partial overlap |")
    lines.append("|---|---:|---:|")
    all_clusters = sorted(
        (set(by_cluster_new.keys()) | set(by_cluster_partial.keys())) - {"Other"},
        key=lambda c: -(len(by_cluster_new.get(c, [])) + len(by_cluster_partial.get(c, [])))
    )
    other_new = len(by_cluster_new.get("Other", []))
    other_partial = len(by_cluster_partial.get("Other", []))
    for c in all_clusters:
        lines.append("| {} | {} | {} |".format(c, len(by_cluster_new.get(c, [])), len(by_cluster_partial.get(c, []))))
    lines.append("| *(Other, JSON-only)* | {} | {} |".format(other_new, other_partial))
    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("## Net-new candidates by cluster (Jaccard < 0.30)")
    lines.append("")
    for c in all_clusters:
        items = by_cluster_new.get(c, [])
        if not items:
            continue
        # Sort: lower jaccard first (cleanest gaps), then by slug
        items.sort(key=lambda e: (max(e["best_existing"], e["best_candidate"]), e["slug"]))
        lines.append("### {} ({} candidates)".format(c, len(items)))
        lines.append("")
        lines.append("| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Quick rationale |")
        lines.append("|---|---|---:|---:|---|")
        for e in items[:30]:
            rationale = "tokens: " + ", ".join(e["tokens"][:6])
            url_short = e["url"]
            if len(url_short) > 90:
                url_short = url_short[:87] + "..."
            lines.append("| `{}` | {} | {} | {} | {} |".format(e["slug"], url_short, e["best_existing"], e["best_candidate"], rationale))
        if len(items) > 30:
            lines.append("| *(+{} more in this cluster, see `_topic_gaps_delta_2026-05-23.json`)* | | | | |".format(len(items)-30))
        lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("## Partial-overlap candidates (Jaccard 0.30-0.55, manager arbitration needed)")
    lines.append("")
    lines.append("These slugs partly overlap existing content or candidate-pool slugs. Manager review decides: expand existing page, redirect, or write new.")
    lines.append("")
    for c in all_clusters:
        items = by_cluster_partial.get(c, [])
        if not items:
            continue
        items.sort(key=lambda e: (-max(e["best_existing"], e["best_candidate"]), e["slug"]))
        lines.append("### {} ({} candidates)".format(c, len(items)))
        lines.append("")
        lines.append("| Candidate slug | Source competitor URL | Best Jaccard (existing) | Best Jaccard (candidate pool) | Tokens |")
        lines.append("|---|---|---:|---:|---|")
        for e in items[:30]:
            url_short = e["url"]
            if len(url_short) > 90:
                url_short = url_short[:87] + "..."
            lines.append("| `{}` | {} | {} | {} | {} |".format(e["slug"], url_short, e["best_existing"], e["best_candidate"], ", ".join(e["tokens"][:6])))
        if len(items) > 30:
            lines.append("| *(+{} more in this cluster, see `_topic_gaps_delta_2026-05-23.json`)* | | | | |".format(len(items)-30))
        lines.append("")
    out_md.write_text("\n".join(lines), encoding="utf-8")
    print("[sweep-v3] Wrote", out_md)


if __name__ == "__main__":
    universe_set, all_topical_urls, no_data, total_topical, net_new_all, partial_all, by_cluster_new, by_cluster_partial = main()
    # Filter out "Other" from MD-displayed counts
    net_new_display = [e for e in net_new_all if e["cluster"] != "Other"]
    partial_display = [e for e in partial_all if e["cluster"] != "Other"]
    write_md(universe_set, all_topical_urls, no_data, total_topical, net_new_display, partial_display, by_cluster_new, by_cluster_partial)
