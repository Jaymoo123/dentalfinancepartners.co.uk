"""Comprehensive page map for the 4 finance/tax clusters.

Architecture-driven: each page defines an include (and optional exclude) regex that
pulls its long-tail from the cluster keyword universe (<cluster>_universe.csv). This
filters intent-noise (CGT vs capital allowances, business-rates vs business-sale) and
keeps pages substantial. Segment factories fan out sector pages. A leftover report lists
high-volume universe keywords NOT captured by any page, so nothing slips through.

Emits <cluster>_pages.csv per cluster + PAGE_PLAN_V2.md + console counts. No content generated.
"""
from __future__ import annotations

import csv
import re
from pathlib import Path

HERE = Path(__file__).parent


def load_universe(cluster):
    p = HERE / f"{cluster}_universe.csv"
    out = {}
    for r in csv.DictReader(p.open(encoding="utf-8")):
        sv = r["search_volume"]
        out[r["keyword"].lower().strip()] = int(sv) if sv not in ("", "None") else 0
    return out


# page tuple: (slug, type, tier, primary_kw, include_regex, exclude_regex_or_None, note)
# reg + guardrail are per-cluster defaults unless a page overrides via note prefix.

def P(slug, typ, tier, primary, incl, excl, note):
    return dict(slug=slug, type=typ, tier=tier, primary=primary,
                incl=re.compile(incl, re.I), excl=re.compile(excl, re.I) if excl else None, note=note)


CLUSTERS = {
 "specialist_tax": dict(reg="UNREG", site="property/generalist (already pos-1) + specialist-tax hub",
   guardrail="Fully unregulated tax service (no s21/IAR). Route leads to SPECIALIST capital-allowances/R&D firms, not general accountants. EXCLUDE fee-protection/tax-investigation INSURANCE (IDD).",
   pages=[
    P("capital-allowances-guide","pillar","pillar","capital allowances", r"\bcapital allowance", r"gain|gains|cgt", "EXTEND property pos-1 page. Plant & machinery, integral features, pooling."),
    P("rd-tax-credits-guide","pillar","pillar","r&d tax credit", r"r&d|research and development", r"grant only", "EXTEND property/generalist pos-1 R&D pages. Merged scheme 2024+."),
    P("land-remediation-relief-guide","pillar","pillar","land remediation relief", r"land remediation|contaminated land", None, "150%/50% relief; brownfield developers."),
    P("embedded-capital-allowances-commercial-property","cluster","cluster","embedded capital allowances", r"embedded|fixtures|integral feature|commercial property capital", None, "Fixtures claims on commercial property purchase. High value."),
    P("capital-allowances-on-cars-and-vehicles","cluster","cluster","capital allowances cars", r"capital allowance.*(car|vehicle|van)|(car|vehicle|van).*capital allowance", r"gain", "1,600/mo. CO2 bands, FYA electric."),
    P("annual-investment-allowance-aia","cluster","cluster","annual investment allowance", r"annual investment allowance|\baia\b", None, "AIA £1m limit."),
    P("full-expensing-and-first-year-allowances","cluster","cluster","full expensing", r"full expensing|first year allowance|\bfya\b|super deduction|writing down allowance|\bwda\b", None, "Full expensing (perm. from 2023), WDA rates."),
    P("structures-and-buildings-allowance-sba","cluster","cluster","structures and buildings allowance", r"structures and buildings|\bsba\b", None, "3% SBA."),
    P("capital-allowances-furnished-holiday-lets","cluster","cluster","capital allowances furnished holiday lets", r"holiday let|\bfhl\b", None, "Note FHL regime abolished Apr 2026 — historic claims + transition."),
    P("how-to-claim-rd-tax-credits","cluster","cluster","how to claim r&d tax credits", r"claim r&d|r&d.*claim|r&d.*(how|process|apply)", None, "Claim process, additional info form, CT600."),
    P("rd-tax-credit-rates","cluster","cluster","r&d tax credit rates", r"r&d.*(rate|percentage|how much)|rate.*r&d", None, "Merged scheme 20% / ERIS. Refresh yearly."),
    P("capital-allowances-calculator","calculator","cluster","capital allowances calculator", r"capital allowance.*calculat|calculat.*capital allowance", r"gain", "Tool. Estimate claim on a commercial property."),
    P("rd-tax-credit-calculator","calculator","cluster","r&d tax credit calculator", r"r&d.*calculat|calculat.*r&d", None, "Tool. Estimate benefit from qualifying spend."),
    P("HOLD-tax-investigation-fee-protection-insurance","cluster","supporting","tax investigation insurance", r"fee protection|tax investigation insurance|tax enquiry insurance", None, "REG-HOLD: IDD insurance. Map only; route to authorised broker."),
   ],
   segments=dict(template="capital-allowances-for-{s}", typ="segment", primary="capital allowances {s}",
     base=r"capital allowance", items=["dental-practices","hotels","care-homes","offices","industrial-units","gp-surgeries","hospitality","pubs-and-restaurants","student-accommodation"],
     note="Sector capital-allowances page; maps to estate audience. Route to specialist.")),

 "business_finance": dict(reg="UNREG-COMPANY", site="new business-finance hub / generalist",
   guardrail="UNREGULATED for LIMITED-COMPANY borrowers (RAO Art 36A). COMPANY-GATE every form ('is your business a limited company?'). Fence off sole traders/<£25k. Multi-buyer panel OK. No IAR.",
   pages=[
    P("business-loans-guide","pillar","pillar","business loan", r"business loan|loan for.*business|loan.*business|business.*lending", r"personal|student|car loan|mortgage|small business", "Company borrowers. Secured vs unsecured, terms."),
    P("small-business-loans","cluster","cluster","small business loan", r"small business.*(loan|financ|lending)|loan.*small business", r"personal|grant only", "5,400/mo. Company-gated small-business lending."),
    P("invoice-finance-guide","pillar","pillar","invoice finance", r"invoice financ", None, "Factoring vs discounting overview pillar."),
    P("asset-finance-guide","pillar","pillar","asset finance", r"asset finance|asset-based lending|corporate and asset finance", None, "HP, lease, refinance. Highest-intent."),
    P("invoice-factoring","cluster","cluster","invoice factoring", r"factoring", r"account", "Factoring specifics + trailing commission."),
    P("invoice-discounting","cluster","cluster","invoice discounting", r"invoice discount|confidential invoice", None, "CID."),
    P("unsecured-business-loans","cluster","cluster","unsecured business loan", r"unsecured", None, "£1.6k/mo KD0. Company-gated."),
    P("secured-business-loans","cluster","cluster","secured business loan", r"secured business|secured.*loan.*business", None, ""),
    P("vat-loans","cluster","cluster","vat loan", r"vat loan|vat funding|vat finance", None, "£82 CPC. Seasonal (quarter ends)."),
    P("corporation-tax-loans","cluster","cluster","corporation tax loan", r"corporation tax loan|tax loan|tax funding", None, "Spread CT/tax bills."),
    P("merchant-cash-advance","cluster","cluster","merchant cash advance", r"merchant cash|cash advance|revenue based", None, "Company-only (sole-trader MCA can be regulated)."),
    P("working-capital-finance","cluster","cluster","working capital finance", r"working capital|cash flow finance|cashflow finance", None, ""),
    P("equipment-and-machinery-finance","cluster","cluster","equipment finance", r"equipment finance|machinery finance|plant.*finance|hire purchase|finance lease", None, "Overlaps trade/dental equipment finance."),
    P("startup-business-loans","cluster","cluster","start up business loan", r"start.?up.*loan|new business loan", None, "6,600/mo. Company-gate (SUL scheme is personal — route accordingly)."),
    P("recovery-and-growth-guarantee-scheme","cluster","supporting","growth guarantee scheme", r"growth guarantee|recovery loan scheme", None, "Govt-backed schemes."),
    P("revolving-credit-facility","cluster","supporting","revolving credit facility", r"revolving credit|business overdraft|flexible credit", None, ""),
    P("business-loan-calculator","calculator","cluster","business loan calculator", r"business loan.*calculat|calculat.*business loan|loan repayment calculator", None, "Tool."),
    P("asset-finance-calculator","calculator","cluster","asset finance calculator", r"asset finance.*calculat|hire purchase calculat|lease calculat", None, "Tool."),
   ],
   segments=dict(template="invoice-finance-for-{s}", typ="segment", primary="invoice finance for {s}",
     base=r"invoice financ|factoring|asset finance", items=["recruitment-agencies","construction","manufacturing","wholesale","haulage-and-transport","ecommerce","dentists","hospitality","cleaning-companies","security-firms"],
     note="Sector finance page; leverages existing estate segment audiences. Company-gated.")),

 "exit_eot": dict(reg="UNREG", site="new exit/EOT hub / generalist",
   guardrail="Unregulated advisory (Art 70 RAO sale-of-company). FENCE OFF 'MBO finance / raising investment' (credit broking / arranging investments) — content+route only. Multi-buyer (accountants/EOT specialists/brokers/CF). EXCLUDE business-rates/VOA noise.",
   pages=[
    P("sell-my-business-guide","pillar","pillar","sell my business", r"sell.*business|selling.*business|business for sale", r"rates|rateable|valuation office|insurance", "Buyer-journey pillar. Trade sale vs EOT vs MBO."),
    P("business-valuation-guide","pillar","pillar","business valuation", r"business valuation|valuation of.*business|value.*business|company valuation", r"rates|rateable|valuation office|voa", "Methods pillar."),
    P("employee-ownership-trust-guide","pillar","pillar","employee ownership trust", r"employee.ownership|employee.owned|\beot\b", None, "EOT WEDGE. Refresh for 26-Nov-2025 CGT 100%->50%."),
    P("how-to-value-a-business","cluster","cluster","how to value a business", r"how to value|valuation method|multiple.*earnings|ebitda multiple|times profit", None, "Methods explainer."),
    P("eot-tax-relief-and-cgt","cluster","cluster","eot tax relief", r"eot.*(tax|cgt|relief)|employee ownership.*(tax|cgt|relief)", None, "26-Nov-2025 CGT cut 100%->50%. Owner-verify vs HMRC. Refresh."),
    P("how-to-set-up-an-eot","cluster","cluster","how to set up an eot", r"set up.*eot|setting up.*employee ownership|eot.*(process|structure|steps)", None, "Qualifying conditions, trustee, timeline."),
    P("eot-pros-and-cons","cluster","cluster","eot advantages and disadvantages", r"eot.*(pros|cons|advantage|disadvantage|benefit|drawback)|employee ownership.*(pros|cons|advantage)", None, "Decision content."),
    P("management-buyout-guide","cluster","cluster","management buyout", r"management buyout|\bmbo\b", r"finance|funding|loan|raising", "STRUCTURE/explainer only. Fence off MBO finance."),
    P("business-exit-planning","cluster","cluster","business exit planning", r"exit plan|exit strategy|succession plan", None, "Exit/succession planning."),
    P("selling-a-business-tax-cgt-badr","cluster","cluster","selling a business tax", r"selling.*business.*tax|business.*(cgt|capital gains)|business asset disposal|\bbadr\b|entrepreneurs relief", None, "CGT/BADR on exit. Accountant cross-sell."),
    P("preparing-a-business-for-sale","cluster","supporting","preparing a business for sale", r"prepare.*business.*sale|ready.*sell|grooming.*sale|due diligence.*sell", None, ""),
    P("business-valuation-calculator","calculator","cluster","business valuation calculator", r"valuation calculator|business.*calculat", r"rates|voa", "Tool."),
    P("eot-tax-saving-calculator","calculator","cluster","eot tax calculator", r"eot.*calculat|employee ownership.*calculat", None, "Tool."),
    P("ROUTE-mbo-and-acquisition-finance","cluster","supporting","mbo finance", r"mbo finance|buyout finance|acquisition finance|raising investment", None, "REG-CARE: credit broking / arranging investments. Content + route to authorised partner only."),
   ],
   segments=dict(template="how-to-sell-a-{s}-business", typ="segment", primary="sell a {s} business",
     base=r"sell.*business|business valuation", items=["dental-practice","accountancy","recruitment","construction","ecommerce","care-home","law-firm","manufacturing"],
     note="Sector exit page; maps to estate audiences. Accountant cross-sell.")),

 "landlord_commercial_finance": dict(reg="IAR-GATED", site="propertytaxpartners (rides authority)",
   guardrail="Unregulated LENDING but s21 QUALIFYING-CREDIT trap: educational/tax-intersection content = build-now (no promotion); rates/lenders/quote/calculator-to-capture = IAR-gated (one broker principal, shareable with SPV-BTL). EXCLUDE regulated bridging (own home) + residential 2nd charge.",
   pages=[
    P("bridging-loans-guide","pillar","pillar","bridging loan", r"bridging", r"institution|association|residential.*own home", "Pillar. Investment/business bridging."),
    P("development-finance-guide","pillar","pillar","development finance", r"development finance|development loan|property development finance", r"institution|initiative|company share|infrastructure|international", "Property dev finance (exclude DFI noise)."),
    P("commercial-mortgages-guide","pillar","pillar","commercial mortgage", r"commercial mortgage", r"association", "Owner-occupier + investment commercial mortgages."),
    P("auction-finance","cluster","cluster","auction finance", r"auction finance|auction property finance", None, "Fast bridging for auction buys."),
    P("refurbishment-and-brrr-finance","cluster","cluster","refurbishment finance", r"refurbishment finance|refurb finance|brrr|heavy refurb|light refurb", None, "BRRR investors."),
    P("development-exit-finance","cluster","cluster","development exit finance", r"development exit|exit finance", None, ""),
    P("bridging-loan-rates","cluster","cluster","bridging loan rates", r"bridging.*(rate|cost|fee|interest)", None, "IAR-GATED conversion. Refresh burden — ranges not live table."),
    P("bridging-loan-lenders","cluster","cluster","bridging loan lenders", r"bridging.*lender|lender.*bridging", None, "IAR-GATED. Factual lender education."),
    P("commercial-mortgage-rates","cluster","cluster","commercial mortgage rates", r"commercial mortgage.*(rate|interest|cost)", None, "IAR-GATED. Refresh."),
    P("semi-commercial-mortgages","cluster","cluster","semi commercial mortgage", r"semi.commercial|mixed use mortgage|mixed-use", None, ""),
    P("mezzanine-and-jv-finance","cluster","supporting","mezzanine finance", r"mezzanine|joint venture finance|jv finance|equity finance property", None, ""),
    P("bridging-loan-calculator","calculator","cluster","bridging loan calculator", r"bridging.*calculat|calculat.*bridging", None, "4,400/mo KD0. Tool — build now (not a promotion)."),
    P("commercial-mortgage-calculator","calculator","cluster","commercial mortgage calculator", r"commercial mortgage.*(calculat|estimator)", None, "3,600/mo. Tool."),
    P("development-finance-calculator","calculator","cluster","development finance calculator", r"development finance.*calculat|gdv calculat", None, "Tool."),
    P("is-bridging-loan-interest-tax-deductible","cluster","cluster","is bridging loan interest tax deductible", r"bridging.*(tax|deductible)|tax.*bridging", None, "TAX-INTERSECTION wedge = BUILD NOW (no promotion). Property's authority."),
    P("financing-a-property-development-tax","cluster","supporting","property development finance tax", r"development.*(tax|sdlt|vat)|tax.*development", None, "TAX-INTERSECTION. Build now."),
   ],
   segments=dict(template="bridging-finance-for-{s}", typ="segment", primary="bridging loan for {s}",
     base=r"bridging", items=["auction-purchases","chain-breaks","refurbishment","buy-to-let","hmo-conversions","commercial-property","land-purchase","below-market-value"],
     note="Use-case bridging page. IAR-gated conversion, educational build-now.")),
}


def assign(universe, pages, seg):
    """Assign each universe kw to the most-specific matching page (longest incl pattern)."""
    # build full page list incl segment pages
    full = list(pages)
    if seg:
        for it in seg["items"]:
            label = it.replace("-", " ")
            incl = re.compile(seg["base"] + r".*" + re.escape(label.split()[0]) + r"|" +
                              re.escape(label.split()[0]) + r".*" + seg["base"], re.I)
            full.append(dict(slug=seg["template"].format(s=it), type=seg["typ"], tier="segment",
                             primary=seg["primary"].format(s=label), incl=incl, excl=None,
                             note=seg["note"], _seg=True))
    assigned = {id(p): [] for p in full}
    leftover = []
    for kw, vol in universe.items():
        best, best_len = None, -1
        for p in full:
            if p["incl"].search(kw) and not (p["excl"] and p["excl"].search(kw)):
                plen = len(p["incl"].pattern)
                if plen > best_len:
                    best, best_len = p, plen
        if best is None:
            leftover.append((kw, vol))
        else:
            assigned[id(best)].append((kw, vol))
    return full, assigned, sorted(leftover, key=lambda t: -t[1])


def main():
    plan = ["# Comprehensive page map v2 — 4 finance/tax clusters",
            "_Data-populated from cluster keyword universes. NOT generated content. Feed <cluster>_pages.csv to the brief generator._\n"]
    grand_pages = grand_build = 0
    for cluster, cfg in CLUSTERS.items():
        uni = load_universe(cluster)
        full, assigned, leftover = assign(uni, cfg["pages"], cfg.get("segments"))
        rows = []
        for p in full:
            kws = sorted(assigned[id(p)], key=lambda t: -t[1])
            pv = uni.get(p["primary"].lower(), 0)
            clv = sum(v for _, v in kws)
            sec = "; ".join(k for k, _ in kws[:12] if k != p["primary"].lower())
            reg = "REG-HOLD" if p["slug"].startswith("HOLD") else ("REG-CARE" if p["slug"].startswith("ROUTE") else cfg["reg"])
            rows.append(dict(cluster=cluster, site=cfg["site"], page_type=p["type"], tier=p["tier"],
                             topic=p["slug"], primary_keyword=p["primary"], primary_volume=pv,
                             cluster_volume=clv, n_keywords=len(kws), secondary_keywords=sec,
                             reg_flag=reg, guardrail=cfg["guardrail"], notes=p["note"]))
        rows.sort(key=lambda r: (-{"pillar":3,"calculator":2,"cluster":1,"segment":0,"supporting":0}.get(r["tier"],0), -r["cluster_volume"]))
        with (HERE / f"{cluster}_pages.csv").open("w", newline="", encoding="utf-8") as f:
            w = csv.DictWriter(f, fieldnames=list(rows[0].keys())); w.writeheader(); w.writerows(rows)

        build = [r for r in rows if r["reg_flag"] not in ("REG-HOLD",)]
        grand_pages += len(rows); grand_build += len(build)
        from collections import Counter
        tc = Counter(r["page_type"] for r in rows)
        print(f"\n=== {cluster} ({cfg['reg']}) : {len(rows)} pages ===")
        print(f"  types: {dict(tc)}  | captured vol: {sum(r['cluster_volume'] for r in rows)}/mo")
        print(f"  leftover high-vol unassigned (add pages?): " +
              ", ".join(f"{k}({v})" for k, v in leftover[:8] if v >= 200))

        plan.append(f"## {cluster}  ({cfg['reg']}) — {len(rows)} pages\n_Site: {cfg['site']}_\n")
        plan.append(f"> Guardrail: {cfg['guardrail']}\n")
        plan.append("| type | topic | primary kw | prim vol | cluster vol | reg |")
        plan.append("|---|---|---|---|---|---|")
        for r in rows:
            plan.append(f"| {r['page_type']} | {r['topic']} | {r['primary_keyword']} | {r['primary_volume']} | {r['cluster_volume']} | {r['reg_flag']} |")
        lo = [f"{k} ({v})" for k, v in leftover[:15] if v >= 200]
        plan.append(f"\n_Leftover high-volume keywords not yet mapped (candidate extra pages): {', '.join(lo) or 'none ≥200'}_\n")

    (HERE / "PAGE_PLAN_V2.md").write_text("\n".join(plan), encoding="utf-8")
    print(f"\nTOTAL: {grand_pages} pages mapped across 4 clusters ({grand_build} build, rest REG-HOLD)")
    print("-> <cluster>_pages.csv x4, PAGE_PLAN_V2.md")


if __name__ == "__main__":
    main()
