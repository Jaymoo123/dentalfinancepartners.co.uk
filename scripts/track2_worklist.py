"""Build the comprehensive Track 2 legacy-rewrite worklist.

Takes the 234-slug residual universe, removes everything already handled
(Track 2 Phase 3 + anything registered in monitored_pages), attaches GSC ROI
(impressions / weighted position / clicks from the fresh 90d pull), assigns a
topic cluster, and emits a ROI-ranked, clustered worklist (md + json).

Read-only. Usage: python scripts/track2_worklist.py
"""
import os
import re
import json
import pathlib
import collections
import httpx
from dotenv import load_dotenv

load_dotenv()
PROJECT_REF = "dhlxwmvmkrfnmcgjbntk"
TOKEN = os.environ["SUPABASE_ACCESS_TOKEN"]
URL = f"https://api.supabase.com/v1/projects/{PROJECT_REF}/database/query"
UNIVERSE = pathlib.Path("docs/property/track2_universe_2026-05-23.md")
BLOG_DIR = pathlib.Path("Property/web/content/blog")


def sql(q):
    r = httpx.post(URL, headers={"Authorization": f"Bearer {TOKEN}",
                                 "Content-Type": "application/json"},
                   json={"query": q}, timeout=120)
    r.raise_for_status()
    return r.json()


# Track 2 Phase 3 slugs already executed (16 rewrites + 6 redirects)
HANDLED_PHASE3 = {
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
CLUSTER_RULES = [
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


def cluster_of(slug):
    for rx, name in CLUSTER_RULES:
        if re.search(rx, slug):
            return name
    return "GeneralGuides"


def load_residual():
    text = UNIVERSE.read_text(encoding="utf-8")
    block = text.split("```")[1]
    return [s.strip() for s in block.splitlines() if s.strip()]


def main():
    residual = load_residual()
    # page-level GSC aggregates (one query)
    rows = sql("""
        SELECT page_url, SUM(impressions) AS impr, SUM(clicks) AS clk,
               ROUND((SUM(position*impressions)/NULLIF(SUM(impressions),0))::numeric,1) AS wpos
        FROM gsc_query_data WHERE site_key='property' GROUP BY page_url;
    """)
    gsc = {}
    for r in rows:
        slug = r["page_url"].rstrip("/").split("/")[-1]
        # keep the strongest record if a slug appears under multiple paths
        prev = gsc.get(slug)
        if not prev or (r["impr"] or 0) > prev["impr"]:
            gsc[slug] = {"impr": r["impr"] or 0, "clk": r["clk"] or 0, "wpos": r["wpos"],
                         "url": r["page_url"]}
    monitored = {r["slug"] for r in sql("SELECT slug FROM monitored_pages WHERE site_key='property';")}
    live_files = {p.stem for p in BLOG_DIR.glob("*.md")}

    work = []
    for slug in residual:
        handled = slug in HANDLED_PHASE3 or slug in monitored
        g = gsc.get(slug, {})
        work.append({
            "slug": slug, "cluster": cluster_of(slug),
            "impr": g.get("impr", 0), "clk": g.get("clk", 0), "wpos": g.get("wpos"),
            "handled": handled,
            "on_disk": slug in live_files,  # False => already redirected/removed
        })

    todo = [w for w in work if not w["handled"]]
    todo.sort(key=lambda w: (-w["impr"], w["slug"]))

    by_cluster = collections.Counter(w["cluster"] for w in todo)
    impr_by_cluster = collections.Counter()
    for w in todo:
        impr_by_cluster[w["cluster"]] += w["impr"]

    out = pathlib.Path("docs/property/track2_worklist_2026-05-29.md")
    L = ["# Track 2 legacy-rewrite worklist (2026-05-29)", "",
         f"Residual universe: {len(residual)} | already handled: {len(work)-len(todo)} "
         f"| **remaining to process: {len(todo)}**", "",
         "GSC = 90d (2026-02-28..2026-05-29) page-level aggregate. Pages with impr>0 but "
         "weak position are highest rewrite ROI; impr=0 pages are INVISIBLE (rewrite-or-collapse).", "",
         "## Clusters (remaining), by total impressions", "",
         "| Cluster | Pages | Total impr | Avg pos (impr-wtd top) |", "|---|---:|---:|---|"]
    for cl, _ in impr_by_cluster.most_common():
        pages = by_cluster[cl]
        L.append(f"| {cl} | {pages} | {impr_by_cluster[cl]} | |")
    L += ["", "## Top 40 by rewrite ROI (impressions, mediocre position)", "",
          "| Impr | Clk | Pos | Cluster | Slug | on_disk |", "|---:|---:|---:|---|---|---|"]
    for w in todo[:40]:
        L.append(f"| {w['impr']} | {w['clk']} | {w['wpos'] if w['wpos'] is not None else '-'} "
                 f"| {w['cluster']} | {w['slug']} | {'y' if w['on_disk'] else 'n'} |")
    out.write_text("\n".join(L), encoding="utf-8")

    pathlib.Path("docs/property/track2_worklist_2026-05-29.json").write_text(
        json.dumps(todo, indent=2), encoding="utf-8")

    print(f"residual={len(residual)} handled={len(work)-len(todo)} remaining={len(todo)}")
    print("\nClusters (remaining) by total GSC impressions:")
    for cl, _ in impr_by_cluster.most_common():
        print(f"  {cl:<26} {by_cluster[cl]:>3} pages   {impr_by_cluster[cl]:>5} impr")
    print("\nTop 15 rewrite-ROI residual pages:")
    for w in todo[:15]:
        print(f"  {w['impr']:>4} imp  pos{str(w['wpos']):>5}  {w['cluster']:<22} {w['slug']}")
    print(f"\nWrote {out}")


if __name__ == "__main__":
    main()
