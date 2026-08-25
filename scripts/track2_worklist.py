"""Build the comprehensive Track 2 legacy-rewrite worklist.

Takes the site's residual universe, removes everything already handled
(site DONE lists + anything registered in monitored_pages, which is a superset
of the armed windows and so keeps every frozen page out of the sweep),
attaches GSC ROI (impressions / weighted position / clicks from the fresh 90d
pull), assigns a topic cluster, and emits a ROI-ranked, clustered worklist
(md + json).

Read-only against the DB; writes docs/<site>/track2_worklist_<date>.{md,json}.
Usage: python scripts/track2_worklist.py [--site property|generalist]
"""
import os
import re
import sys
import json
import pathlib
import argparse
import collections
import httpx
from dotenv import load_dotenv

ROOT = pathlib.Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

load_dotenv()
PROJECT_REF = "dhlxwmvmkrfnmcgjbntk"
TOKEN = os.environ["SUPABASE_ACCESS_TOKEN"]
URL = f"https://api.supabase.com/v1/projects/{PROJECT_REF}/database/query"


def sql(q):
    r = httpx.post(URL, headers={"Authorization": f"Bearer {TOKEN}",
                                 "Content-Type": "application/json"},
                   json={"query": q}, timeout=120)
    r.raise_for_status()
    return r.json()


# ---------------------------------------------------------------- property
# Track 2 Phase 3 slugs already executed (16 rewrites + 6 redirects)
PROPERTY_HANDLED_PHASE3 = {
    "cgt-deferral-strategies-property-investors-uk", "reduce-cgt-property-disposal-uk",
    "cgt-property-sold-loss-claim-capital-losses", "principal-private-residence-relief-landlords",
    "rollover-relief-property-landlords", "letting-relief-landlords-2026-changes",
    "cgt-divorce-property-transfer-tax-implications", "cgt-inherited-rental-property-calculation-uk",
    "cgt-property-transfer-spouse", "non-resident-cgt-uk-property-rates-reporting",
    "cgt-main-residence-election-two-properties", "cgt-commercial-property-different-residential",
    "airbnb-tax-uk-short-term-rental-income-taxed", "birmingham-property-accountant",
    "2027-property-tax-rates-section-24-relief-uk-landlords", "cgt-rates-property-2026-27-current-rates-explained",
    "60-day-cgt-reporting-property-sales-complete-guide", "60-day-cgt-reporting-property-sales-rule",
    "cgt-reporting-deadlines-property-2026", "how-to-report-property-sale-hmrc-60-days",
    "report-property-sale-hmrc-60-days-guide", "capital-gains-tax-selling-rental-property-uk",
}

# Cluster rules: (regex, cluster). First match wins, most specific first.
PROPERTY_CLUSTER_RULES = [
    (r"section-?24|finance-costs-section|mortgage-interest-restriction|can-section-24", "Section24"),
    (r"\baia\b|annual-investment-allowance|capital-allowance|full-expensing|integral-features|writing-down-allowance|what-is-aia", "CapitalAllowances"),
    (r"incorporat|limited-company|property-company|section-162|transfer-propert|family-investment-company|^llp-|should-i-incorporate|types-of-property-company|holding-company|director-loan|retained-profits|sdlt-transfer-property-company|profit-extraction|dividend|corporation-tax", "Incorporation"),
    (r"making-tax-digital|^mtd-|switch-self-assessment-mtd|register-mtd", "MTD"),
    (r"holiday-let|fhl|serviced-accommodation", "FHL"),
    (r"cgt|capital-gains|principal-private-residence|letting-relief|rollover-relief|reduce-cgt|tax-sell-rental|property-improvements-reduce|incorporate-rental-property-without-cgt", "CGT"),
    (r"non-resident|expat|^nrl-|uk-property-income-expats", "NonResident"),
    (r"property-accountant|accountant-|why-.*landlords-need|specialist-accountant|how-to-choose|how-to-become-property|property-specialist|best-property-accountant|services-buy-to-let-accountant|property-investors-expect", "CityService"),
    (r"^vat-", "VATcalc"),
    (r"calculator|-calc$", "Calculators"),
    (r"mortgage|btl-mortgage|refinanc|deposit-buy-to-let|housing-development-finance", "FinanceMortgage"),
    (r"yield|roi|benchmark|void|budgeting|track-rental|portfolio-account|property-management-account|portfolio-review|profitability", "PortfolioOps"),
    (r"sa105|landlord-tax-return|self-assessment|landlord-tax-deduction|allowable|expenses|record-keeping|landlord-tax-calendar|end-tax-year|penalt|replacement-domestic|pre-letting|what-repairs|capital-vs-revenue|landlord-tax-changes|landlord-expenses", "SelfAssessmentDeductions"),
    (r"renters-rights|rra", "RRA"),
    (r"business-property-relief|iht", "IHT"),
    (r"stamp-duty|sdlt", "SDLT"),
]


def property_cluster_of(slug):
    for rx, name in PROPERTY_CLUSTER_RULES:
        if re.search(rx, slug):
            return name
    return "GeneralGuides"


def property_universe():
    # The universe doc was archived 2026-08 (docs reorg); check both homes.
    p = ROOT / "docs/property/track2_universe_2026-05-23.md"
    if not p.exists():
        p = ROOT / "docs/property/_archive/track2_universe_2026-05-23.md"
    text = p.read_text(encoding="utf-8")
    block = text.split("```")[1]
    return [s.strip() for s in block.splitlines() if s.strip()]


# ---------------------------------------------------------------- generalist
def lane_cluster_fn(site_key):
    """Cluster taxonomy = the v2 lane taxonomy in sites/<site>.discovery.json
    (single source of truth, stays in sync with the discovery lane gate)."""
    from optimisation_engine.discovery.lane_map import assign_lane
    disc = json.loads((ROOT / "sites" / f"{site_key}.discovery.json").read_text(encoding="utf-8"))
    lanes, negs = disc["lanes"], disc.get("lane_negative_tokens") or []
    # ponytail: negatives are query-intent vetoes, not slug vetoes; our own
    # slugs never carry portal/job phrases, so passing them is harmless.
    return lambda slug: assign_lane(slug, lanes, negs) or "GeneralGuides"


def blog_dir_universe(blog_dir):
    """No residual-universe doc exists for siblings; the on-disk corpus IS the
    legacy universe (everything already-handled is subtracted downstream)."""
    return sorted(p.stem for p in blog_dir.glob("*.md"))


# ---------------------------------------------------------------- site config
SITES = {
    "property": {
        "blog_dir": ROOT / "Property/web/content/blog",
        "universe": property_universe,
        "handled": PROPERTY_HANDLED_PHASE3,
        "cluster_of": lambda: property_cluster_of,
        "out_stem": "docs/property/track2_worklist_2026-05-29",  # keep historic path
        "universe_note": "Residual universe",
        "title": "# Track 2 legacy-rewrite worklist (2026-05-29)",
        "gsc_note": ("GSC = 90d (2026-02-28..2026-05-29) page-level aggregate. Pages with impr>0 but "
                     "weak position are highest rewrite ROI; impr=0 pages are INVISIBLE (rewrite-or-collapse)."),
    },
    "generalist": {
        "blog_dir": ROOT / "generalist/web/content/blog",
        "universe": None,  # -> blog_dir_universe
        "handled": set(),  # no prior Track 2 phase on this site
        "cluster_of": lambda: lane_cluster_fn("generalist"),
        "out_stem": "docs/generalist/track2_worklist_2026-08-25",
        "universe_note": "Universe = on-disk corpus",
        "title": "# Track 2 legacy-rewrite worklist (generalist, 2026-08-25)",
        "gsc_note": ("GSC = 90d page-level aggregate (fresh pull cadence; see STATE.md Stage 0 for the "
                     "data-through date). Pages with impr>0 but weak position are highest rewrite ROI; "
                     "impr=0 pages are INVISIBLE (rewrite-or-collapse)."),
    },
}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--site", default="property", choices=sorted(SITES))
    args = ap.parse_args()
    site = args.site
    cfg = SITES[site]

    residual = cfg["universe"]() if cfg["universe"] else blog_dir_universe(cfg["blog_dir"])
    cluster_of = cfg["cluster_of"]()
    # page-level GSC aggregates (one query)
    rows = sql(f"""
        SELECT page_url, SUM(impressions) AS impr, SUM(clicks) AS clk,
               ROUND((SUM(position*impressions)/NULLIF(SUM(impressions),0))::numeric,1) AS wpos
        FROM gsc_query_data WHERE site_key='{site}' GROUP BY page_url;
    """)
    gsc = {}
    for r in rows:
        slug = r["page_url"].rstrip("/").split("/")[-1]
        # keep the strongest record if a slug appears under multiple paths
        prev = gsc.get(slug)
        if not prev or (r["impr"] or 0) > prev["impr"]:
            gsc[slug] = {"impr": r["impr"] or 0, "clk": r["clk"] or 0, "wpos": r["wpos"],
                         "url": r["page_url"]}
    # Bing page-level aggregate (latest snapshot). Legacy pages routinely rank
    # page-1 on Bing while page 4-8 on Google, so a Google-only ROI buries the
    # best lift targets (a 0-Google / page-1-Bing page is a TOP rewrite target).
    brows = sql(f"""
        SELECT page_url, SUM(impressions) AS impr, SUM(clicks) AS clk,
               ROUND((SUM(position*impressions)/NULLIF(SUM(impressions),0))::numeric,1) AS wpos
        FROM bing_query_data WHERE site_key='{site}'
          AND date=(SELECT MAX(date) FROM bing_query_data WHERE site_key='{site}')
        GROUP BY page_url;
    """)
    bing = {}
    for r in brows:
        slug = r["page_url"].rstrip("/").split("/")[-1]
        prev = bing.get(slug)
        if not prev or (r["impr"] or 0) > prev["impr"]:
            bing[slug] = {"impr": r["impr"] or 0, "clk": r["clk"] or 0, "wpos": r["wpos"]}
    # Every monitored_pages row for the site is excluded (superset of the armed
    # windows, so frozen pages can never enter the sweep).
    monitored = {r["slug"] for r in sql(
        f"SELECT slug FROM monitored_pages WHERE site_key='{site}';")}
    live_files = {p.stem for p in cfg["blog_dir"].glob("*.md")}

    work = []
    for slug in residual:
        handled = slug in cfg["handled"] or slug in monitored
        g = gsc.get(slug, {})
        b = bing.get(slug, {})
        gi, bi = g.get("impr", 0), b.get("impr", 0)
        work.append({
            "slug": slug, "cluster": cluster_of(slug),
            "impr": gi, "clk": g.get("clk", 0), "wpos": g.get("wpos"),
            "bimpr": bi, "bclk": b.get("clk", 0), "bwpos": b.get("wpos"),
            "combined_impr": gi + bi,
            "handled": handled,
            "on_disk": slug in live_files,  # False => already redirected/removed
        })

    todo = [w for w in work if not w["handled"]]
    # ROI by combined (Google + Bing) demand; Google impr then slug as tiebreaks.
    todo.sort(key=lambda w: (-w["combined_impr"], -w["impr"], w["slug"]))

    by_cluster = collections.Counter(w["cluster"] for w in todo)
    impr_by_cluster = collections.Counter()
    for w in todo:
        impr_by_cluster[w["cluster"]] += w["combined_impr"]

    out = ROOT / f"{cfg['out_stem']}.md"
    L = [cfg["title"], "",
         f"{cfg['universe_note']}: {len(residual)} | already handled: {len(work)-len(todo)} "
         f"| **remaining to process: {len(todo)}**", "",
         cfg["gsc_note"], "",
         "## Clusters (remaining), by combined Google+Bing impressions", "",
         "| Cluster | Pages | Total impr (G+Bing) |", "|---|---:|---:|"]
    for cl, _ in impr_by_cluster.most_common():
        L.append(f"| {cl} | {by_cluster[cl]} | {impr_by_cluster[cl]} |")
    L += ["", "## Top 40 by rewrite ROI (combined Google+Bing demand)",
          "B-pos near page 1 with weak G-pos = proven content, just needs a Google lift.", "",
          "| G-impr | G-pos | B-impr | B-pos | Clk | Cluster | Slug | on_disk |",
          "|---:|---:|---:|---:|---:|---|---|---|"]
    for w in todo[:40]:
        L.append(f"| {w['impr']} | {w['wpos'] if w['wpos'] is not None else '-'} "
                 f"| {w['bimpr']} | {w['bwpos'] if w['bwpos'] is not None else '-'} "
                 f"| {w['clk']} | {w['cluster']} | {w['slug']} | {'y' if w['on_disk'] else 'n'} |")
    out.write_text("\n".join(L), encoding="utf-8")

    (ROOT / f"{cfg['out_stem']}.json").write_text(
        json.dumps(todo, indent=2), encoding="utf-8")

    print(f"residual={len(residual)} handled={len(work)-len(todo)} remaining={len(todo)}")
    print("\nClusters (remaining) by total GSC impressions:")
    for cl, _ in impr_by_cluster.most_common():
        print(f"  {cl:<26} {by_cluster[cl]:>3} pages   {impr_by_cluster[cl]:>5} impr")
    print("\nTop 15 rewrite-ROI residual pages (G impr/pos | B impr/pos):")
    for w in todo[:15]:
        print(f"  G {w['impr']:>4}/{str(w['wpos']):<5} B {w['bimpr']:>4}/{str(w['bwpos']):<5}  "
              f"{w['cluster']:<22} {w['slug']}")
    print(f"\nWrote {out}")


if __name__ == "__main__":
    main()
