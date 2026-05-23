"""Data-driven competitor discovery for the Property Net-New Program.

Replaces the hand-curated 13-domain list in property_topic_gap_finder.py with
a frequency-weighted, SERP-derived competitor universe built from Supabase
tables competitor_serps + competitor_pages (populated by the per-page
rewrite playbook).

Outputs:
  - briefs/property/_competitor_universe_v2.json (raw aggregation)
  - docs/property/competitor_universe_v2.md (manager-readable table)

Re-run quarterly. Charter: NETNEW_PROGRAM section 16.21.
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from optimisation_engine.competitor._db import _sql


AGGREGATOR_DOMAINS = {
    "rightmove.co.uk", "zoopla.co.uk", "onthemarket.com",
    "moneysavingexpert.com", "thisismoney.co.uk", "whichbuytolet.co.uk",
    "which.co.uk", "money.co.uk", "comparethemarket.com",
    "moneyfacts.co.uk", "uswitch.com", "monzo.com", "hl.co.uk",
    "investopedia.com", "smartasset.com", "fatfire.com",
    "primelocation.com", "homes.co.uk",
}

NEWS_DOMAINS = {
    "bbc.co.uk", "bbc.com", "ft.com", "theguardian.com", "guardian.co.uk",
    "telegraph.co.uk", "thetimes.co.uk", "thetimes.com", "mirror.co.uk",
    "dailymail.co.uk", "mail.co.uk", "express.co.uk", "thesun.co.uk",
    "independent.co.uk", "metro.co.uk", "standard.co.uk", "evening-standard.co.uk",
    "city-am.com", "reuters.com", "bloomberg.com", "cnbc.com",
}

GOV_DOMAINS_REGEX = re.compile(
    r"(^|\.)(gov\.uk|legislation\.gov\.uk|hmrc\.gov\.uk|hmrc\.gov|parliament\.uk|"
    r"democracy\.[a-z\-]+\.gov\.uk|nidirect\.gov\.uk|mygov\.scot)$",
    re.IGNORECASE,
)

QA_FORUM_DOMAINS = {
    "reddit.com", "old.reddit.com", "quora.com",
    "justanswer.co.uk", "justanswer.com", "answers.com",
    "property118.com", "landlordzone.co.uk", "propertychat.ai",
    "propertytribes.com", "mumsnet.com",
}

BIG_FIRMS_DOMAINS = {
    "kpmg.com", "kpmg.co.uk", "deloitte.com", "deloitte.co.uk",
    "pwc.com", "pwc.co.uk", "ey.com",
    "bdo.com", "bdo.co.uk", "bdo.global",
    "grantthornton.com", "grantthornton.co.uk",
    "rsm.global", "rsmuk.com",
    "mazars.com", "mazars.co.uk", "forvismazars.com",
    "crowe.com", "crowe.co.uk", "croweuk.com",
    "saffery.com", "safferychampness.com",
}

REFERENCE_DOMAINS = {
    "en.wikipedia.org", "wikipedia.org", "grokipedia.com", "britannica.com",
}

PLATFORM_NOISE = {
    "bing.com", "google.com", "google.co.uk", "duckduckgo.com",
    "yahoo.com", "youtube.com", "facebook.com", "linkedin.com",
    "twitter.com", "x.com", "instagram.com", "pinterest.com", "tiktok.com",
    "db-excel.com", "chaosads.co.uk", "london.chaosads.co.uk",
}

SOFTWARE_VENDOR_DOMAINS = {
    "xero.com", "sage.com", "quickbooks.intuit.com", "freeagent.com",
    "freshbooks.com", "gosimpletax.com", "mri-software.com", "mrisoftware.com",
    "mtd.digital", "hammock.com", "usehammock.com", "untied.io",
    "landlordstudio.com", "arthuronline.co.uk", "propertyhive.net", "fixflo.com",
}

FOREIGN_LOCALE_DOMAINS = {
    "lifetime.co.nz", "edmunds.com.au", "citizensinformation.ie",
    "simpsonaccountingllc.com", "andrewpasser.com", "hutzis.com", "evaccountants.com",
}


def is_excluded(domain):
    d = domain.lower().strip()
    if d in AGGREGATOR_DOMAINS:
        return True, "aggregator"
    if d in NEWS_DOMAINS:
        return True, "news"
    if GOV_DOMAINS_REGEX.search(d):
        return True, "gov"
    if d in QA_FORUM_DOMAINS:
        return True, "qa-forum"
    if d in BIG_FIRMS_DOMAINS:
        return True, "big-firm"
    if d in REFERENCE_DOMAINS:
        return True, "reference"
    if d in PLATFORM_NOISE:
        return True, "platform-noise"
    if d in FOREIGN_LOCALE_DOMAINS:
        return True, "foreign-locale"
    return False, ""


def is_software_vendor(domain):
    return domain.lower().strip() in SOFTWARE_VENDOR_DOMAINS


BORDERLINE_NOTES = {
    "charcol.co.uk": "John Charcol mortgage broker. Strong BTL mortgage content; tangential to tax but landlord-relevant.",
    "nrla.org.uk": "Landlord membership body. Authority-adjacent but publishes landlord-tax explainers.",
    "alanboswell.com": "Insurance broker with landlord-tax content. Cross-category.",
    "simplybusiness.co.uk": "Insurance broker with landlord guides. Cross-category.",
    "att.org.uk": "Association of Taxation Technicians. Authority body; keep for technical briefings.",
    "accountingweb.co.uk": "Trade publication. Authority-adjacent; publishes case-law analyses landlords search for.",
    "saltus.co.uk": "Wealth management; tangential.",
    "samconveyancing.co.uk": "Conveyancing firm; SDLT content overlap.",
    "everestandco.co.uk": "Specialist tax firm; borderline keep.",
    "boltburdon.co.uk": "Law firm; tangential conveyancing/landlord content.",
    "provestor.co.uk": "Specialist landlord accountant; direct competitor.",
    "smithbutler.co.uk": "Property accountant; direct competitor.",
    "property-tax-advice.co.uk": "Direct competitor (boutique).",
    "property-tax-partners.com": "Domain-name collision with our brand; investigate.",
    "rentalbux.com": "Affiliate-style landlord content; soft-keep.",
    "rentpost.com": "US property mgmt; borderline foreign.",
    "buytolettaxaccountants.co.uk": "Direct competitor.",
    "kenbellaccounting.co.uk": "Direct competitor.",
    "shipleystax.com": "Specialist tax firm; landlord/property content.",
    "qaccounting.com": "Contractor/SME accountant; landlord content overlap.",
    "perrysaccountants.co.uk": "General practice with landlord content.",
    "djh.co.uk": "Mid-market accountant.",
    "elsbyandco.co.uk": "Regional accountant.",
    "hwfisher.co.uk": "Mid-market accountant.",
    "atsonbuckle.co.uk": "Regional accountant.",
    "rpgcrouchchapman.co.uk": "London accountant.",
    "gwaccounting.co.uk": "Specialist accountant.",
    "business-accounting.co.uk": "Generalist with landlord guides.",
    "capitalgainstax.co.uk": "Single-topic affiliate site.",
}


def fetch_domain_aggregation():
    return _sql("""
        WITH base AS (
          SELECT cp.domain, cp.position, cs.query
          FROM competitor_pages cp
          JOIN competitor_serps cs ON cp.serp_id = cs.id
          WHERE cs.site_key = 'property'
        )
        SELECT
          domain,
          COUNT(*) AS total_appearances,
          COUNT(DISTINCT query) AS distinct_queries,
          ROUND(AVG(position)::numeric, 2) AS avg_position,
          MIN(position) AS best_position,
          (ARRAY_AGG(DISTINCT query ORDER BY query))[1:5] AS sample_queries
        FROM base
        GROUP BY domain
        ORDER BY total_appearances DESC, distinct_queries DESC
    """)


def main():
    print("[discovery v2] Aggregating competitor_pages for site_key=property...")
    rows = fetch_domain_aggregation()
    print(f"[discovery v2] Found {len(rows)} distinct domains")
    if not rows:
        print("[discovery v2] ERROR: no competitor_pages rows for property -- meta-blocker.")
        return 2

    kept, dropped, software = [], [], []
    for r in rows:
        excluded, reason = is_excluded(r["domain"])
        if excluded:
            dropped.append({**r, "reason": reason})
            continue
        annotation = BORDERLINE_NOTES.get(r["domain"], "")
        is_sw = is_software_vendor(r["domain"])
        if is_sw:
            annotation = (annotation + " | Software vendor, authority-adjacent, not a direct content competitor.").strip(" |")
        entry = {**r, "annotation": annotation, "software_vendor": is_sw}
        (software if is_sw else kept).append(entry)

    kept.sort(key=lambda r: (-r["total_appearances"], -r["distinct_queries"], r["domain"]))
    software.sort(key=lambda r: (-r["total_appearances"], -r["distinct_queries"], r["domain"]))

    out_json = ROOT / "briefs/property/_competitor_universe_v2.json"
    out_json.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "summary": {
            "total_distinct_domains_in_serp_data": len(rows),
            "kept_genuine_competitors": len(kept),
            "kept_software_vendors_annotated": len(software),
            "dropped": len(dropped),
        },
        "kept": kept,
        "software_vendors": software,
        "dropped": dropped,
    }
    out_json.write_text(json.dumps(payload, indent=2, default=str), encoding="utf-8")
    print(f"[discovery v2] Wrote {out_json}")

    out_md = ROOT / "docs/property/competitor_universe_v2.md"
    mdlines = []
    mdlines.append("# Property, competitor universe v2 (SERP-derived)")
    mdlines.append("")
    mdlines.append("Generated from Supabase `competitor_pages` JOIN `competitor_serps` filtered to `site_key = property`. Replaces the hand-curated 13-domain list in `scripts/property_topic_gap_finder.py`. Charter: section 16.21 of `docs/property/NETNEW_PROGRAM.md`.")
    mdlines.append("")
    mdlines.append(f"**Inputs:** {len(rows)} distinct domains across all property-site SERPs in `competitor_pages`.")
    mdlines.append("")
    mdlines.append(f"**After filters:** {len(kept)} genuine specialist competitors kept; {len(software)} software/platform vendors kept and annotated; {len(dropped)} excluded as aggregator / news / gov / Q&A / Big-firm / reference / platform-noise / foreign-locale.")
    mdlines.append("")
    mdlines.append("**Filter logic (see `scripts/property_competitor_discovery_v2.py`):**")
    mdlines.append("- Aggregators (Rightmove, Zoopla, MoneySavingExpert, Investopedia, etc.), DROP")
    mdlines.append("- News (BBC, FT, Guardian, Telegraph, Times, Mirror, Mail, etc.), DROP")
    mdlines.append("- Gov (gov.uk, legislation.gov.uk, HMRC, council democracy portals), DROP")
    mdlines.append("- Q&A / forums (Reddit, Quora, JustAnswer, Property118, LandlordZone), DROP")
    mdlines.append("- Big-4 / Big-10 (KPMG, Deloitte, PwC, EY, BDO, Grant Thornton, RSM, Mazars, Crowe, Saffery), DROP")
    mdlines.append("- Reference (Wikipedia, Grokipedia), DROP")
    mdlines.append("- Platform noise (Google/Bing/social), DROP")
    mdlines.append("- Foreign-locale (NZ, AU, US, IE), DROP")
    mdlines.append("- Software vendors (Xero, Sage, etc.), KEEP but annotated; not a direct content competitor")
    mdlines.append("")
    mdlines.append("**Note on data sparsity:** the SERP corpus to date covers 83 distinct queries on a single fetch date (2026-05-21). Re-run quarterly as the per-page rewrite playbook continues to populate `competitor_pages`.")
    mdlines.append("")
    mdlines.append("---")
    mdlines.append("")
    mdlines.append("## Kept, genuine specialist competitors")
    mdlines.append("")
    mdlines.append("Sort: total appearances desc.")
    mdlines.append("")
    mdlines.append("| Domain | Total appearances | Distinct queries | Avg position | Best position | Top sample queries | Notes |")
    mdlines.append("|---|---:|---:|---:|---:|---|---|")
    for k in kept:
        sample = "; ".join((k.get("sample_queries") or [])[:5])
        notes = (k.get("annotation") or "").replace("|", "/")
        mdlines.append(f"| {k['domain']} | {k['total_appearances']} | {k['distinct_queries']} | {k['avg_position']} | {k['best_position']} | {sample} | {notes} |")
    mdlines.append("")
    mdlines.append("## Software / platform vendors (kept, annotated)")
    mdlines.append("")
    mdlines.append("| Domain | Total appearances | Distinct queries | Avg position | Top sample queries | Notes |")
    mdlines.append("|---|---:|---:|---:|---|---|")
    for s in software:
        sample = "; ".join((s.get("sample_queries") or [])[:5])
        notes = (s.get("annotation") or "").replace("|", "/")
        mdlines.append(f"| {s['domain']} | {s['total_appearances']} | {s['distinct_queries']} | {s['avg_position']} | {sample} | {notes} |")
    mdlines.append("")
    mdlines.append("## Dropped (counts only; raw list in `_competitor_universe_v2.json`)")
    mdlines.append("")
    drop_counts = {}
    for d in dropped:
        drop_counts[d["reason"]] = drop_counts.get(d["reason"], 0) + 1
    mdlines.append("| Reason | Count |")
    mdlines.append("|---|---:|")
    for reason, cnt in sorted(drop_counts.items(), key=lambda kv: -kv[1]):
        mdlines.append(f"| {reason} | {cnt} |")
    mdlines.append("")
    mdlines.append("---")
    mdlines.append("")
    mdlines.append("## How to re-run")
    mdlines.append("")
    mdlines.append("    python scripts/property_competitor_discovery_v2.py")
    mdlines.append("")
    mdlines.append("The script is idempotent and quick (single Supabase aggregation). Re-run after each new SERP-fetch sweep.")
    out_md.write_text("\n".join(mdlines), encoding="utf-8")
    print(f"[discovery v2] Wrote {out_md}")
    print()
    print(f"  kept (genuine): {len(kept)}")
    print(f"  kept (software): {len(software)}")
    print(f"  dropped: {len(dropped)} -- counts by reason:")
    for reason, cnt in sorted(drop_counts.items(), key=lambda kv: -kv[1]):
        print(f"    {reason}: {cnt}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
