"""Page architecture map for the two build-now clusters.

Designed page inventory (NOT generated content). Joins measured DataForSEO volumes.
Emits btl_pages.csv + dental_pages.csv (brief-generator-feedable) and PAGE_PLAN.md.

Columns match the blog_topics seed schema (topic, category, primary_keyword,
user_intent, content_tier, publish_priority, keyword_source, notes) plus:
target_search_volume, page_type, reg_flag, action, existing_ref, secondary_keywords, guardrail.
"""
from __future__ import annotations

import csv
import json
import re
from pathlib import Path

HERE = Path(__file__).parent


# --- volume lookup from prior stages ---------------------------------------
def load_volumes() -> dict[str, int]:
    vol: dict[str, int] = {}
    for fn in ("volumes.csv", "btl_volumes.csv"):
        p = HERE / fn
        if p.exists():
            for r in csv.DictReader(p.open(encoding="utf-8")):
                sv = r.get("search_volume")
                if sv and sv not in ("None", ""):
                    vol[r["keyword"].lower().strip()] = int(sv)
    disc = json.loads((HERE / "discovered.json").read_text(encoding="utf-8"))
    for group in disc.values():
        for kws in group.values():
            for k in kws:
                kw = (k["keyword"] or "").lower().strip()
                if kw and k.get("search_volume"):
                    vol.setdefault(kw, k["search_volume"])
    return vol


VOL = load_volumes()


def v(kw: str):
    return VOL.get(kw.lower().strip())


# --- page specs -------------------------------------------------------------
# action: NEW | EXTEND. existing_ref = the existing ranking query/page for EXTEND.
# reg_flag: UNREG (build+capture now) | REG-HOLD (map only, needs IAR, do not build capture)
# page_type: pillar | cluster | calculator | supporting

BTL = [
    # ---- pillars ----
    dict(slug="limited-company-buy-to-let-mortgages-guide", page_type="pillar", content_tier="pillar",
         primary="limited company buy to let mortgage",
         secondary=["ltd company buy to let mortgage", "spv buy to let mortgage", "limited company buy to let mortgage rates"],
         intent="commercial", action="NEW", existing_ref="", priority=10,
         guardrail="Mortgage mechanics + eligibility only. Link to property's incorporation/tax pages for the tax decision; do NOT re-explain ltd-vs-personal tax here.",
         notes="Top-level SPV/ltd-co mortgage pillar. Cover: why lenders treat SPVs differently, SIC 68209, lender panel, rates, deposit/LTV, ICR stress test, day-one remortgage. Faceless; CTA = free landlord finance intro (accounting lead now, mortgage lead post-IAR)."),
    dict(slug="spv-mortgages-explained", page_type="pillar", content_tier="pillar",
         primary="spv mortgage",
         secondary=["spv company", "spv for property", "spv buy to let mortgage"],
         intent="commercial", action="NEW", existing_ref="", priority=8,
         guardrail="SPV *mortgage* angle. SPV *set-up/tax* cross-links to property; no duplicate SPV-tax page.",
         notes="What an SPV is for mortgage purposes, SIC codes lenders accept, newly-formed vs trading company lending, personal guarantees. Cross-link to ltd-co pillar + calculator."),
    dict(slug="portfolio-landlord-mortgages-guide", page_type="pillar", content_tier="pillar",
         primary="portfolio landlord mortgage",
         secondary=["portfolio landlord remortgage", "portfolio buy to let mortgage", "portfolio landlord stress test"],
         intent="commercial", action="NEW", existing_ref="weakly: 'portfolio landlord tax planning' (property, pos 39)",
         priority=8,
         guardrail="Portfolio *mortgage/remortgage + lender stress-test* angle. Portfolio *tax planning* stays on property (already ranks) — cross-link, don't duplicate.",
         notes="4+/10+/20+ property segments, portfolio ICR/stress testing, aggregation, refinancing a portfolio. High case value."),
    # ---- calculators (linkable anchor assets) ----
    dict(slug="buy-to-let-mortgage-calculator", page_type="calculator", content_tier="pillar",
         primary="buy to let mortgage calculator",
         secondary=["buy to let mortgage uk calculator", "mortgage calculator btl", "buy to let mortgage repayment calculator"],
         intent="transactional", action="NEW", existing_ref="", priority=10,
         guardrail="Pure calculator (borrowing/repayment) — not a promotion. Safe pre-IAR. Distinct from property's tax calculators.",
         notes="Interactive: loan amount, rate, term, interest-only vs repayment. Biggest single volume asset. Embeds estate-wide. Links to lenders + ltd-co pillar."),
    dict(slug="buy-to-let-rental-stress-test-calculator", page_type="calculator", content_tier="cluster",
         primary="buy to let stress test",
         secondary=["buy to let ICR calculator", "how much can i borrow buy to let", "rental income calculator buy to let"],
         intent="transactional", action="NEW", existing_ref="", priority=8,
         guardrail="Lender ICR stress-test tool. Not a promotion. Safe pre-IAR.",
         notes="ICR at 125%/145% x stress rate; ltd-co vs personal ICR difference. Strong link magnet + captures 'how much can I borrow'."),
    dict(slug="personal-vs-limited-company-btl-tax-calculator", page_type="calculator", content_tier="pillar",
         primary="limited company vs personal buy to let",
         secondary=["section 24 calculator", "should i buy property through a limited company"],
         intent="commercial", action="SHARED-ASSET", existing_ref="property owns incorporation/Section-24 turf",
         reg="UNREG", priority=7,
         guardrail="RESOLVED: build ONCE as a property TAX asset (property tax brand already ranks incorporation/S24). Mortgage cluster LINKS to it, does not host a copy. Not counted as a mortgage-cluster build page.",
         notes="Shared property-tax calculator. Feeds both the tax audience and the SPV mortgage decision journey via cross-link."),
    # ---- supporting / criteria + product-type long-tail ----
    dict(slug="buy-to-let-mortgage-lenders", page_type="supporting", content_tier="cluster",
         primary="buy to let mortgage lenders",
         secondary=["spv mortgage lenders", "limited company buy to let lenders", "portfolio mortgage lenders"],
         intent="commercial", action="NEW", existing_ref="", priority=9,
         guardrail="Lender directory/education, not a recommendation of a specific product (s21). Factual list. Safe pre-IAR as education; product CTA post-IAR.",
         notes="Highest-volume informational term (33k). Who lends to SPVs/portfolios, criteria table. Anchors the cluster internally."),
    dict(slug="buy-to-let-mortgage-rates", page_type="supporting", content_tier="cluster",
         primary="buy to let mortgage rates",
         secondary=["buy to let fixed mortgage rates", "buy to let mortgage interest rate", "best buy to let mortgages"],
         intent="commercial", action="NEW", existing_ref="", priority=6,
         guardrail="FRESHNESS BURDEN: rates page needs periodic refresh. Keep ranges/factors, not a live rate table, to limit maintenance. Education not promotion pre-IAR.",
         notes="9.9k volume. Explain rate drivers (LTV, product/company type). Flag maintenance cost."),
    dict(slug="let-to-buy-mortgages", page_type="supporting", content_tier="cluster",
         primary="let to buy mortgage",
         secondary=["let to buy", "let to buy vs buy to let"],
         intent="commercial", action="NEW", existing_ref="", priority=6,
         guardrail="", notes="1.9k volume, distinct product. Owner-occupier converting to landlord — natural incorporation lead too."),
    dict(slug="hmo-mortgages", page_type="supporting", content_tier="cluster",
         primary="hmo mortgage",
         secondary=["hmo buy to let mortgage", "hmo limited company mortgage"],
         intent="commercial", action="NEW", existing_ref="weakly: 'hmo landlord tax planning' (property)",
         priority=6, guardrail="HMO *mortgage* angle; HMO *tax* stays on property.",
         notes="880 volume. HMO lender criteria, article-4/licensing note, ltd-co HMO."),
    dict(slug="holiday-let-mortgages", page_type="supporting", content_tier="cluster",
         primary="holiday let mortgage",
         secondary=["fhl mortgage", "airbnb mortgage", "holiday let limited company mortgage"],
         intent="commercial", action="NEW", existing_ref="", priority=5,
         guardrail="Note FHL tax regime abolished Apr 2026 — cross-link property for tax; mortgage angle here.",
         notes="880 volume. Holiday-let lender criteria, income basis."),
    dict(slug="expat-non-resident-landlord-mortgages", page_type="supporting", content_tier="cluster",
         primary="expat buy to let mortgage",
         secondary=["non resident landlord mortgage", "british expat mortgage", "overseas landlord remortgage"],
         intent="commercial", action="NEW", existing_ref="", priority=5,
         guardrail="Investor/business framing (unregulated). Consumer/expat-residential = REG. Cross-border promo caution — education only pre-IAR.",
         notes="Small but premium. Country long-tail (Dubai/HK/Singapore). Overlaps property's NRL audience."),
    dict(slug="spv-mortgage-no-income-newly-formed", page_type="supporting", content_tier="supporting",
         primary="spv mortgage no income",
         secondary=["newly formed company btl mortgage", "spv mortgage first time landlord", "ltd company btl no minimum income"],
         intent="commercial", action="NEW", existing_ref="", priority=6,
         guardrail="", notes="High-intent criteria long-tail, near-zero competition. Answers a precise objection."),
    dict(slug="day-one-remortgage-limited-company", page_type="supporting", content_tier="supporting",
         primary="day one remortgage",
         secondary=["day 1 remortgage spv", "remortgage into a limited company"],
         intent="commercial", action="NEW", existing_ref="", priority=5,
         guardrail="Mortgage mechanics; incorporation-relief tax stays on property.", notes="Criteria long-tail."),
    dict(slug="[SECTION not page] financing incorporation / re-mortgaging into your SPV", page_type="section", content_tier="supporting",
         primary="transfer property to limited company",
         secondary=["moving buy to let into a company", "remortgage into a limited company"],
         intent="commercial", action="SECTION", existing_ref="property ranks: 'incorporating a property portfolio', 'sdlt transfer property to limited company'",
         priority=4,
         guardrail="RESOLVED: NO standalone page (would cannibalise property's ranking incorporation/SDLT pages). Add a 'financing the incorporation / re-mortgaging into your SPV' SECTION to property's existing incorporation page, and a short mortgage-mechanics blurb in the SPV pillar cross-linking to it.",
         notes="Not a build page. Content task on property's existing incorporation page + cross-link from the SPV mortgage pillar."),
    dict(slug="first-time-landlord-mortgage", page_type="supporting", content_tier="supporting",
         primary="first time landlord mortgage",
         secondary=["first time buyer buy to let", "buy to let mortgage first time landlord"],
         intent="commercial", action="NEW", existing_ref="", priority=5, guardrail="", notes="Criteria long-tail."),
    dict(slug="self-employed-buy-to-let-mortgage", page_type="supporting", content_tier="supporting",
         primary="buy to let mortgage self employed",
         secondary=["self employed landlord mortgage", "1 year accounts buy to let mortgage"],
         intent="commercial", action="NEW", existing_ref="", priority=5, guardrail="", notes="Self-employed = strong accounting cross-sell."),
    dict(slug="sic-code-for-an-spv-property-company", page_type="supporting", content_tier="supporting",
         primary="sic code for spv",
         secondary=["68209 sic code", "spv sic code mortgage", "sic code buy to let company"],
         intent="informational", action="NEW", existing_ref="", priority=5,
         guardrail="Accounting x mortgage seam — fits the brand. Cross-link Companies House + ltd-co pillar.",
         notes="Low volume, high relevance + authority. Which SIC codes lenders accept."),
    dict(slug="buy-to-let-mortgage-deposit-and-ltv", page_type="supporting", content_tier="supporting",
         primary="buy to let mortgage deposit",
         secondary=["85 ltv buy to let", "buy to let mortgage ltv", "how much deposit buy to let"],
         intent="commercial", action="NEW", existing_ref="", priority=5, guardrail="", notes="Criteria education."),
]

DENTAL = [
    # ---- EXTEND existing ranking pages (no new URL where a page already ranks) ----
    dict(slug="EXTEND: specialist-dental-finance (hub)", page_type="pillar", content_tier="pillar",
         primary="dental practice finance",
         secondary=["dental practice loan", "specialist dental finance", "dental practice funding"],
         intent="commercial", action="EXTEND", existing_ref="dentists ranks 'specialist dental finance' pos 20",
         reg="UNREG", priority=10,
         guardrail="Existing page already ranks — upgrade in place into the finance PILLAR/broker-intro hub. Do NOT mint a competing new URL.",
         notes="Central hub linking all practice-finance pages. Add commercial-finance-broker intro CTA (unregulated). Faceless."),
    dict(slug="EXTEND: dental-practice-valuation", page_type="cluster", content_tier="pillar",
         primary="dental practice valuation",
         secondary=["how much is my dental practice worth", "dental practice valuation calculator", "ebitda multiple dental"],
         intent="commercial", action="EXTEND", existing_ref="dentists ranks 'dental practice valuation uk' pos 27 + 'worth [city]' x5",
         reg="UNREG", priority=9,
         guardrail="Already ranking — extend with valuation-for-finance + optional valuation calculator. Keep the existing URL.",
         notes="Add finance angle (valuation drives loan sizing) + broker intro. Possible calculator sub-asset."),
    dict(slug="EXTEND: goodwill-funding-practice-purchase", page_type="cluster", content_tier="cluster",
         primary="goodwill loan dental practice",
         secondary=["goodwill funding practice purchase", "dental goodwill finance", "dental practice loan"],
         intent="commercial", action="EXTEND", existing_ref="dentists ranks 'goodwill funding practice purchase' pos 11",
         reg="UNREG", priority=9,
         guardrail="RESOLVED: this is the FINANCE money page (goodwill/loan intent). Keep its pos-11 URL. The 'how to buy a dental practice' pillar links DOWN to it. Distinct primary kw so no cannibalisation.",
         notes="Goodwill vs freehold, 100% lending, term, rate drivers. Cluster page under the buyer-journey pillar."),
    dict(slug="EXTEND: selling-a-dental-practice", page_type="cluster", content_tier="cluster",
         primary="selling a dental practice",
         secondary=["sell my dental practice", "best time to sell a dental practice", "dental practice sale process"],
         intent="commercial", action="EXTEND", existing_ref="dentists ranks 'selling a dental practice taxes [city]' nationwide",
         reg="UNREG", priority=7,
         guardrail="Already ranking on the tax angle — add exit + buyer-finance angle. Keep URL. Tax content stays canonical.",
         notes="Exit finance + how buyers fund the purchase (feeds purchase-finance leads)."),
    # ---- NEW pages (genuine gaps, unregulated commercial finance) ----
    dict(slug="dental-practice-commercial-mortgage", page_type="cluster", content_tier="cluster",
         primary="dental practice commercial mortgage",
         secondary=["commercial mortgage dental practice", "freehold dental practice mortgage", "dental surgery commercial mortgage"],
         intent="commercial", action="NEW", existing_ref="", reg="UNREG", priority=7,
         guardrail="Business/commercial borrower = outside FCA scope. Keep strictly business-purpose (never residential).",
         notes="Freehold premises finance. Distinct from goodwill. Rates/LTV/term for dental."),
    dict(slug="dental-equipment-and-chair-finance", page_type="cluster", content_tier="cluster",
         primary="dental equipment finance",
         secondary=["dental chair finance", "cbct scanner finance", "dental equipment leasing", "intraoral scanner finance"],
         intent="commercial", action="NEW", existing_ref="", reg="UNREG", priority=7,
         guardrail="Business asset finance = unregulated.", notes="HP vs lease vs finance-lease, tax treatment (AIA), equipment types."),
    dict(slug="squat-dental-practice-funding", page_type="cluster", content_tier="cluster",
         primary="squat dental practice finance",
         secondary=["start a dental practice", "how to open a dental practice", "dental practice startup loan", "setting up a dental practice cost"],
         intent="commercial", action="NEW", existing_ref="", reg="UNREG", priority=6,
         guardrail="", notes="Startup/squat funding, business plan, staged drawdown, CQC/NHS contract note."),
    dict(slug="refinancing-a-dental-practice-loan", page_type="cluster", content_tier="cluster",
         primary="dental practice refinance",
         secondary=["refinance dental practice loan", "dental practice loan interest rates", "release equity dental practice"],
         intent="commercial", action="NEW", existing_ref="", reg="UNREG", priority=6,
         guardrail="", notes="When/why to refinance, equity release for expansion, rate review."),
    dict(slug="second-dental-practice-expansion-finance", page_type="supporting", content_tier="supporting",
         primary="second dental practice finance",
         secondary=["dental practice expansion finance", "buying a second dental practice", "multi-site dental group finance"],
         intent="commercial", action="NEW", existing_ref="", reg="UNREG", priority=5,
         guardrail="", notes="Group/multi-site funding, cross-charge, higher case value."),
    dict(slug="dental-practice-working-capital-and-tax-loans", page_type="supporting", content_tier="supporting",
         primary="dental practice working capital",
         secondary=["cash flow finance dental practice", "vat loan dental practice", "dental practice tax loan"],
         intent="commercial", action="NEW", existing_ref="", reg="UNREG", priority=5,
         guardrail="", notes="Short-term/working-capital + tax/VAT funding. Cross-sell to dentist accounting lead."),
    dict(slug="100-percent-dental-practice-finance", page_type="supporting", content_tier="supporting",
         primary="100% dental practice finance",
         secondary=["no deposit dental practice loan", "how much can i borrow dental practice"],
         intent="commercial", action="NEW", existing_ref="", reg="UNREG", priority=6,
         guardrail="", notes="Why dentists get 100% lending (professional category), criteria. High-intent objection page."),
    dict(slug="how-to-buy-a-dental-practice", page_type="pillar", content_tier="pillar",
         primary="buy a dental practice",
         secondary=["buying a dental practice", "how to buy a dental practice", "cost of buying a dental practice"],
         intent="commercial", action="NEW", existing_ref="",
         reg="UNREG", priority=8,
         guardrail="RESOLVED: canonical buyer-JOURNEY pillar (valuation > offer > finance > completion), targets 'buy/buying a dental practice' (420/mo head). Links DOWN to the goodwill FINANCE page + valuation + commercial-mortgage. Distinct intent = no cannibalisation.",
         notes="Top buyer-journey pillar. Broad informational-commercial; each stage links to its money page."),
    # ---- REGULATED: map only, DO NOT build capture pre-IAR ----
    dict(slug="HOLD: dentist-residential-mortgages", page_type="cluster", content_tier="cluster",
         primary="dentist mortgage",
         secondary=["mortgages for dentists", "associate dentist mortgage", "self employed dentist mortgage"],
         intent="commercial", action="NEW", existing_ref="", reg="REG-HOLD", priority=3,
         guardrail="REGULATED (regulated mortgage contract). Do NOT build lead capture pre-IAR. Map only.",
         notes="110+110/mo. Hold until a mortgage-broker IAR is in place."),
    dict(slug="HOLD: dentist-income-protection-locum-insurance", page_type="cluster", content_tier="cluster",
         primary="dentist income protection",
         secondary=["associate dentist income protection", "dentist locum insurance", "dental locum insurance"],
         intent="commercial", action="NEW", existing_ref="", reg="REG-HOLD", priority=3,
         guardrail="REGULATED (IDD insurance distribution). Do NOT build capture pre-IAR. Map only.",
         notes="~130/mo. Hold until an insurance IAR is in place."),
]


def rows_for(pages, cluster, site, default_reg):
    out = []
    for p in pages:
        prim = p["primary"]
        sec = p.get("secondary", [])
        sec_vol = sum(v(s) or 0 for s in sec)
        out.append({
            "cluster": cluster,
            "site": site,
            "page_type": p["page_type"],
            "topic": p["slug"],
            "primary_keyword": prim,
            "target_search_volume": v(prim) or 0,
            "cluster_volume_est": (v(prim) or 0) + sec_vol,
            "secondary_keywords": "; ".join(sec),
            "user_intent": p["intent"],
            "content_tier": p["content_tier"],
            "reg_flag": p.get("reg", default_reg),
            "action": p["action"],
            "existing_ref": p.get("existing_ref", ""),
            "publish_priority": p["priority"],
            "keyword_source": "expansion-research-2026-07-30",
            "guardrail": p.get("guardrail", ""),
            "notes": p["notes"],
        })
    return out


def write_csv(path, rows):
    with path.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)


def summarise(name, rows):
    from collections import Counter
    build = [r for r in rows if r["action"] in ("NEW", "EXTEND")]
    non_build = [r for r in rows if r["action"] in ("SECTION", "SHARED-ASSET")]
    hold = [r for r in rows if r["reg_flag"] == "REG-HOLD"]
    build_now = [r for r in build if r["reg_flag"] == "UNREG"]
    print(f"\n=== {name}: {len(build)} build pages (+{len(non_build)} section/shared, {len(hold)} REG-HOLD) ===")
    print(f"  by type:   {dict(Counter(r['page_type'] for r in build))}")
    print(f"  by action: {dict(Counter(r['action'] for r in rows))}")
    print(f"  buildable-now pages (NEW/EXTEND & UNREG): {len(build_now)}")
    print(f"  addressable volume (sum primary, build pages): {sum(r['target_search_volume'] for r in build)}/mo")


def write_plan_md(btl, dental):
    def block(title, site, rows):
        L = [f"## {title}", f"_Site: {site}. {len(rows)} pages "
             f"({sum(1 for r in rows if r['reg_flag']=='UNREG')} buildable-now)._\n"]
        for pt in ("pillar", "calculator", "cluster", "supporting", "section"):
            grp = [r for r in rows if r["page_type"] == pt]
            if not grp:
                continue
            L.append(f"### {pt.title()} ({len(grp)})\n")
            L.append("| P | vol | topic / slug | primary kw | action | reg | guardrail |")
            L.append("|---|---|---|---|---|---|---|")
            for r in sorted(grp, key=lambda x: -x["publish_priority"]):
                g = (r["guardrail"][:90] + "…") if len(r["guardrail"]) > 90 else r["guardrail"]
                L.append(f"| {r['publish_priority']} | {r['target_search_volume']} | {r['topic']} "
                         f"| {r['primary_keyword']} | {r['action']} | {r['reg_flag']} | {g} |")
            L.append("")
        return "\n".join(L)

    doc = ["# Page architecture map — build-now finance clusters",
           "_Designed inventory. NOT generated content. Feed btl_pages.csv / dental_pages.csv to the brief generator._",
           f"\n**Total: {len(btl)+len(dental)} pages** "
           f"({sum(1 for r in btl+dental if r['reg_flag']=='UNREG')} buildable-now, "
           f"{sum(1 for r in btl+dental if r['action']=='EXTEND')} EXTEND existing, "
           f"{sum(1 for r in btl+dental if r['reg_flag']=='REG-HOLD')} REG-HOLD).\n",
           block("SPV / BTL mortgage cluster", "propertytaxpartners.co.uk", btl),
           block("Dental practice-finance cluster", "dentalfinancepartners.co.uk", dental),
           "## Feed to brief generator",
           "- CSV columns map to blog_topics seed schema: topic, primary_keyword, user_intent, content_tier, publish_priority, keyword_source, notes (+ target_search_volume, secondary_keywords, action, existing_ref, guardrail, reg_flag).",
           "- EXTEND rows → rewrite path (`brief_for_opus.py --site <site> --slug <existing>`), not new-page generation. Match to the existing ranking URL first.",
           "- REG-HOLD rows → do NOT seed/generate until an IAR principal is in place.",
           "- Calculators are build tasks (interactive components), not blog briefs — route separately.",
           "- `guardrail` must be pasted into each brief so the writer respects cannibalisation boundaries."]
    (HERE / "PAGE_PLAN.md").write_text("\n".join(doc), encoding="utf-8")


def main():
    btl = rows_for(BTL, "SPV/BTL mortgage", "property", "UNREG")
    dental = rows_for(DENTAL, "Dental practice finance", "dentists", "UNREG")
    write_csv(HERE / "btl_pages.csv", btl)
    write_csv(HERE / "dental_pages.csv", dental)
    write_plan_md(btl, dental)
    summarise("SPV/BTL cluster (property site)", btl)
    summarise("Dental practice-finance cluster (dentist site)", dental)
    allr = btl + dental
    build = [r for r in allr if r["action"] in ("NEW", "EXTEND")]
    print(f"\nTOTAL build pages: {len(build)}  "
          f"(buildable-now UNREG: {sum(1 for r in build if r['reg_flag']=='UNREG')}, "
          f"REG-HOLD: {sum(1 for r in allr if r['reg_flag']=='REG-HOLD')}, "
          f"section/shared tasks: {sum(1 for r in allr if r['action'] in ('SECTION','SHARED-ASSET'))})")
    print("-> btl_pages.csv, dental_pages.csv, PAGE_PLAN.md")


if __name__ == "__main__":
    main()
