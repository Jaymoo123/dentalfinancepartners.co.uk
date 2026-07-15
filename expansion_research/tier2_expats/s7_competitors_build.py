"""R3 tier2 expats — Stage 7: assemble judged competitors.json.

Claude's classifications (2026-07-15) applied over raw/verify_evidence.json fetch
evidence; bot-blocked domains classified from DDG SERP titles/snippets in
candidates.json (method="serp"). Direction labels: UK_OUTBOUND (Brits leaving/abroad),
FOREIGN_INBOUND (foreign nationals with UK exposure, esp US-in-UK), BOTH.
"""
from __future__ import annotations

import json
from pathlib import Path

HERE = Path(__file__).parent

# domain: (tier, direction, note)
JUDGED = {
    # DEDICATED — UK cross-border personal tax practices
    "globaltaxconsulting.co.uk": ("DEDICATED", "BOTH", "Whole brand is international/expat UK tax for individuals; top domain of the sweep (12 SERP hits)"),
    "expat-tax-advice.co.uk": ("DEDICATED", "BOTH", "Exact-match domain; 'Moving to or from the UK? Get your tax right before you move.'"),
    "expattaxes.co.uk": ("DEDICATED", "UK_OUTBOUND", "Online consultation model, 'stress-free tax advice for UK expats'"),
    "horizonukts.com": ("DEDICATED", "BOTH", "'UK Expat & Non-Resident Tax Advisers', single-CTA boutique"),
    "lsrpartners.com": ("DEDICATED", "BOTH", "'Expat and UK Tax Advice for Global Clients'"),
    "expattax.co.uk": ("DEDICATED", "UK_OUTBOUND", "'UK Expat Tax Advice for Britons Working Abroad'; tiny site (16 sitemap URLs)"),
    "expatuktax.com": ("DEDICATED", "UK_OUTBOUND", "'UK tax expertise for expatriates worldwide'"),
    "hodgensglobal.com": ("DEDICATED", "UK_OUTBOUND", "'Ex-pat self-assessment and annual tax returns'"),
    "uktaxadvisor.com": ("DEDICATED", "BOTH", "'UK Tax advice online for residents and expatriates' (weaker signal)"),
    "ukautax.com": ("DEDICATED", "UK_OUTBOUND", "UK-Australia corridor specialist (bot-blocked; SERP-classified)"),
    "taxadvisorypartnership.com": ("DEDICATED", "BOTH", "'Leading UK & US Tax Advisory Service'; heavy expat/non-res blog"),
    "smcotax.com": ("DEDICATED", "BOTH", "'Expat tax specialists' + property tax; chartered tax advisors"),
    "dual.tax": ("DEDICATED", "BOTH", "'Avoid Double Taxation When Moving Abroad' — cross-border movers niche"),
    "blevinsfranks.com": ("DEDICATED", "UK_OUTBOUND", "Institutional UK-to-Europe wealth+tax brand (bot-blocked; SERP-classified); wealth-led, not compliance-led"),
    "expertsforexpats.com": ("DEDICATED", "UK_OUTBOUND", "Introducer/marketplace network, not a firm; huge content moat (568 sitemap URLs)"),
    "taxback.co.uk": ("DEDICATED", "UK_OUTBOUND", "Expat UK tax refunds/returns service line"),
    # DEDICATED — US-expat-in-UK / US-firm layer (foreign-inbound)
    "xerxesllp.com": ("DEDICATED", "FOREIGN_INBOUND", "US & UK tax advisers in London for US expats (bot-blocked; SERP-classified)"),
    "usukexpattax.com": ("DEDICATED", "FOREIGN_INBOUND", "US-UK dual-filing advisory"),
    "jaffeandco.com": ("DEDICATED", "FOREIGN_INBOUND", "US & UK tax services in London for American expats"),
    "expatglobaltax.com": ("DEDICATED", "FOREIGN_INBOUND", "US expat taxes UK, 15+ years"),
    "expatustax.com": ("DEDICATED", "FOREIGN_INBOUND", "US expat tax, UAE/AU/UK offices"),
    "taxesforexpats.com": ("DEDICATED", "FOREIGN_INBOUND", "Large US-based US-expat tax preparer (US filings for Americans in UK)"),
    "protaxconsulting.com": ("DEDICATED", "FOREIGN_INBOUND", "US international individual tax CPAs"),
    "greenbacktaxservices.com": ("DEDICATED", "FOREIGN_INBOUND", "Major US expat tax preparer (bot-blocked; SERP-classified)"),
    "brighttax.com": ("DEDICATED", "FOREIGN_INBOUND", "Major US expat tax preparer (bot-blocked; SERP-classified)"),
    # SECTION — real multi-service firms with an expat/non-resident section
    "taxaccountant.co.uk": ("SECTION", "BOTH", "Generalist tax firm; expats/landlords named on homepage"),
    "ukpropertyaccountants.co.uk": ("SECTION", "FOREIGN_INBOUND", "Property specialist with strong NRL scheme service + guides (bot-blocked; SERP-classified)"),
    "blickrothenberg.com": ("SECTION", "BOTH", "Major mid-tier firm; dedicated non-resident tax practice (bot-blocked; SERP-classified)"),
    "tca.co.uk": ("SECTION", "BOTH", "Wellden Turnbull non-dom/expat advice pages (SERP-classified; homepage fetch empty)"),
    "alliotts.com": ("SECTION", "BOTH", "London chartered firm with expat pages"),
    "accusolveaccountants.com": ("SECTION", "FOREIGN_INBOUND", "Non-resident company formation + tax angle"),
    "cgincorporations.com": ("SECTION", "FOREIGN_INBOUND", "Non-resident UK company formation/nominee services"),
    "accotax.co.uk": ("SECTION", "BOTH", "London small-biz firm with non-resident landlord pages"),
    "alexander.co.uk": ("SECTION", "BOTH", "Manchester chartered firm, moving-abroad content"),
    "aab.uk": ("SECTION", "BOTH", "Large group; FIG-regime and NRCGT advisory content"),
    "bdo.co.uk": ("SECTION", "BOTH", "Big-6 layer; leaving-the-UK / split-year content"),
    "buzzacott.co.uk": ("SECTION", "FOREIGN_INBOUND", "Institutional US/UK expat practice (major London firm)"),
    "geraldedelman.com": ("SECTION", "BOTH", "London firm, international private client pages"),
    "mooreks.co.uk": ("SECTION", "BOTH", "Moore Kingston Smith, US/UK + double tax pages"),
    "uklandlordtax.co.uk": ("SECTION", "FOREIGN_INBOUND", "Landlord-only firm with non-resident landlord service"),
    "landlordstax.co.uk": ("SECTION", "FOREIGN_INBOUND", "Landlord tax returns incl. overseas landlords"),
    "ptireturns.com": ("SECTION", "FOREIGN_INBOUND", "International property tax returns (multi-country)"),
    "stampdutylandtaxexperts.co.uk": ("SECTION", "FOREIGN_INBOUND", "'UK Accountants For Non-Residents' page (bot-blocked; SERP-classified)"),
    "pearllemontax.co.uk": ("SECTION", "UK_OUTBOUND", "UK-to-Dubai HNW residency/treaty pages (bot-blocked; SERP-classified; agency-style pSEO)"),
    "uktaxreturns.co.uk": ("SECTION", "BOTH", "Online SA firm with non-resident pages"),
    "sizeraccountants.com": ("SECTION", "BOTH", "SA-led firm, non-resident filing content"),
    "taxd.co.uk": ("SECTION", "BOTH", "Online filing platform; non-resident/expat flows"),
    "petersonsims.com": ("SECTION", "UK_OUTBOUND", "'Tax Advisors | Accountants | Expat Consultants'"),
    "taxinnovations.com": ("SECTION", "BOTH", "Expatriate tax named as a service line"),
    "aswatax.co.uk": ("SECTION", "BOTH", "Boutique CTA, cross-border structuring for families/founders"),
    "rhjaccountants.com": ("SECTION", "UK_OUTBOUND", "Non-resident SA guide content (bot-blocked; SERP-classified)"),
    "sterlingandwells.com": ("SECTION", "FOREIGN_INBOUND", "Non-resident self assessment content (bot-blocked; SERP-classified)"),
    "gtn.uk": ("SECTION", "BOTH", "Global mobility tax (employer-side, corporate adjacent)"),
}

ADJACENT = {
    "expat wealth/IFA layer (not accountants, dominate 'expat financial advice' SERPs)": [
        "titanwealthinternational.com", "skyboundwealth.com", "hoxtonwealth.com",
        "harrisonbrook.com", "tailormadepensions.eu", "rossnaylor.com",
        "financewithjc.com", "holbornassets.com", "pccwealth.com",
        "globalinvestments.net", "adamfayed.com"],
    "expat mortgages/banking": ["expatmortgages-uk.com", "expat.hsbc.com"],
    "non-resident tax software": ["sprintax.com"],
    "content/affiliate": ["britishexpatmoney.com", "expertsforexpats.com (also introducer)"],
    "foreign-side advisers (home-country end of the corridor)": ["trustnri.in"],
}


def main() -> None:
    ev = json.loads((HERE / "raw" / "verify_evidence.json").read_text(encoding="utf-8"))
    cands = json.loads((HERE / "candidates.json").read_text(encoding="utf-8"))["survivors"]
    rivals = []
    for dom, (tier, direction, note) in JUDGED.items():
        rec = ev.get(dom, {})
        method = "fetch"
        evidence = {}
        if "homepage" in rec:
            hp = rec["homepage"]
            evidence = {"title": hp["title"], "h1": hp["h1"][:1],
                        "expat_mentions": hp["expat_mentions"],
                        "excerpt": hp["expat_excerpt"][:250]}
        else:
            method = "serp"
            samp = cands.get(dom, {}).get("sample", [])
            evidence = {"serp_titles": [s["title"][:100] for s in samp[:2]],
                        "serp_snippet": (samp[0]["snippet"][:250] if samp else "")}
        rivals.append({"domain": dom, "tier": tier, "direction": direction,
                       "verify_method": method, "note": note,
                       "serp_hit_count": cands.get(dom, {}).get("hit_count"),
                       "queries": cands.get(dom, {}).get("queries", [])[:6],
                       "evidence": evidence})
    ded = sum(1 for r in rivals if r["tier"] == "DEDICATED")
    sec = sum(1 for r in rivals if r["tier"] == "SECTION")
    out = {"generated": "2026-07-15", "niche": "expats + non-residents UK tax",
           "n_dedicated": ded, "n_section": sec, "rivals": rivals,
           "adjacent_players": ADJACENT}
    (HERE / "competitors.json").write_text(json.dumps(out, indent=1), encoding="utf-8")
    print(f"dedicated={ded} section={sec} total={len(rivals)}")


if __name__ == "__main__":
    main()
