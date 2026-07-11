"""R3 tier1 care — build competitors.json from verify evidence + Claude tier judgments.

Tier judgments made 2026-07-11 from raw/verify_evidence.json (fetch) plus live web
search where our fetch was bot-blocked (verified_via: search).
"""
import json
from pathlib import Path

HERE = Path(__file__).parent
ev = json.loads((HERE / "raw" / "verify_evidence.json").read_text(encoding="utf-8"))

DEDICATED = {
    "costcare.co.uk": ("H1: 'Cost Care Tax - Care Home Tax and Capital Allowances Specialists'; 'Trusted... since 1995'; 'Over GBP900m in successful claims'; Kingscrest 2 historic-VAT reclaim service.", "fetch"),
    "mareleaccountancy.co.uk": ("Homepage: 'We work only with domiciliary care providers. We are care sector specialists.' Positions itself as 'The Care FD'.", "fetch"),
    "careaxisaccountancy.co.uk": ("Care-only firm: 'Where Care Meets Compliance'; service pages for domiciliary care agencies, supported living, residential care homes. Service H1: 'Accountants for Domiciliary Care Agencies'.", "fetch"),
    "supportedlivingfinancials.co.uk": ("RDA Accountants' supported-living-only brand. H1: 'The financial partner for supported living'; explicit anti-generalist pitch: 'Not a generic firm with a sector page'. Also runs a Substack (rdasupportedliving.substack.com).", "fetch"),
    "healthcareaccountant.uk": ("'The Healthcare Accountant' - homepage H2 segments are Domiciliary Care / Supported Living / Children's Homes (provider-side, not clinician-side).", "fetch"),
    "cqcfinancialviability.com": ("'CQC Qualified Accountants Ltd' - productised CQC Financial Viability Statement sold from an online shop. Owns the FVS query in our sweep.", "fetch"),
    "carebooks.co.uk": ("Title: 'CareBooks Payroll Services | Payroll for UK Care Providers' - care-only payroll bureau (JS-heavy page, thin extract).", "fetch"),
    "carepayrollgroup.co.uk": ("'Your caring payroll department'; sector nav: domiciliary care, nursing homes, residential care homes, respite homes, retirement homes. Dedicated domiciliary-care payroll service page.", "fetch"),
    "taxcare.org.uk": ("Own fetch 403. Live search 2026-07-11: Birmingham 'Tax Care Accountant', care-home + care-agency digital payroll/timesheet specialism, claims 40+ care recruiter clients.", "search"),
    "heightenaccountants.co.uk": ("Own fetch 403. Live search 2026-07-11: 'Heighten Care Homes Accountants' page + dedicated /carehome-insights/ blog hub (nursing-home accounting basics, tax-deductible expenses).", "search"),
    "carehomeaccountant.co.uk": ("Exact-match domain. Live search 2026-07-11: 'Care Home Accountant | UKcarehomes' - ACCA/AAT firm; VAT, payroll, management accounts, buy/sell support for care homes. Not in our SERP sweep top-10s but rank-relevant.", "search"),
    "carehome-accountants.co.uk": ("Exact-match domain. Live search 2026-07-11: 'Appleby Mall Carehome Accountants' - 'Accountants For Care Homes' page. Not in our SERP sweep top-10s but rank-relevant.", "search"),
}

SECTION = {
    "mmba.co.uk": "Chartered firm (London/Preston/Cambridge); /sectors/care-homes-accountants/ 'MMBA Specialist Care Home Accountants'. 7 queries hit in our sweep.",
    "accountaxzone.com": "Own fetch 403; live search 2026-07-11: /accountant-for-care-homes/ + residential-care-home client-type page + foster-carer page. 9 queries hit - heavy SEO player.",
    "morriscrocker.co.uk": "Own fetch blocked; live search 2026-07-11: Portsmouth chartered firm, /care-homes/ specialism page ('specialise in accountancy services for care homes'). 6 queries hit.",
    "auditox-accountancy.uk": "SEO-led online firm; /accountants-for-carehomes/ page. Also appeared in hospitality sweep - multi-niche programmatic player.",
    "clearcutaccounting.co.uk": "Manchester firm; 'Care Home Accountants UK | CQC-Compliant Finance' page under medical-accountants tree. 4 queries hit.",
    "account-ease.co.uk": "Online firm; '#1 Care Home Accountants in the UK' /care-homes/ page.",
    "loyals.uk": "London chartered firm; 'Care Home, Domiciliary & Live-in Care Accountants London' industry page + care-agency guide. Also seen in hospitality sweep.",
    "mitchellsaccountants.co.uk": "Essex firm; /care-home/ 'Care Home Accountancy Services' page.",
    "btbaccountants.co.uk": "Middlesbrough firm; /accountants-for-care-homes/ 'Nursing Home Accountancy' page. Also seen in hospitality sweep.",
    "sgaweb.co.uk": "Buckinghamshire firm; 'Care Home Accountants - Sterling Grove' page.",
    "sknservices.co.uk": "SKN Chartered Accountants; /sectors/residential-care-supported-living/ page.",
    "everestandco.co.uk": "Wolverhampton firm; /sectors/care-sector page.",
    "jamestoddandco.co.uk": "Chichester/Fareham chartered firm; 'Social Care & Healthcare Specialist Accountants' page + care-home advice content.",
    "forrester-boyd.co.uk": "Lincolnshire chartered firm; 'Health & Social Care Specialist Accounting Firm' page.",
    "ratiobox.co.uk": "Outsourcing firm; /sectors/accounting-for-care-providers/ page.",
    "hawsons.co.uk": "Sheffield chartered firm; healthcare sector page + dedicated /care-homes/ subpage (live search). Top hit-count in our sweep (12 queries).",
    "aab.uk": "AAB group; /sectors/health-and-social-care/ page. Also seen in hospitality sweep.",
    "amanahaccountants.co.uk": "Bradford firm; /healthcare page.",
    "elevateaccountancy.co.uk": "Wrexham firm; /care-businesses/ page (surfaced via live search; homepage fetch showed care mentions).",
    "accountingin.co.uk": "Online firm; 'Healthcare Accountants UK | GP, Dental, Pharmacy & Care Home' page - care homes bundled into healthcare page.",
    "raaccountants.com": "London firm; /sectors/healthcare/ with residential-care-homes subpage (live search).",
    "mcgintydemack.co.uk": "Live search 2026-07-11: /care-homes-accountant/ page. Not fetched (not in SERP sweep).",
    "gmprofessionalaccountants.co.uk": "Live search 2026-07-11: 'Accountants for Care Homes and Nursing Homes' page. Not fetched (not in SERP sweep).",
    "taxaccountant.co.uk": "Live search 2026-07-11: /care-home/ 'Care Home Accountants | Specialist Tax Accountants' page. Not fetched (not in SERP sweep).",
    "ryans-uk.com": "Own fetch status 0; live search 2026-07-11: /care-home-accountants/ page.",
    "dhpayroll.co.uk": "Payroll bureau; /care-homes 'Care Home Payroll Services' page.",
    "payrollhub.co.uk": "Payroll bureau; 'Payroll Services for Healthcare & Care Homes' page.",
    "excelpayrollsolutions.co.uk": "Payroll bureau; /home-care-care-home/ page.",
    "bpayroll.co.uk": "Payroll bureau; /payroll-services-for-healthcare/ page.",
}

out = []
for dom, (why, src) in DEDICATED.items():
    r = ev.get(dom, {})
    out.append({"domain": dom, "tier": "DEDICATED", "verified_via": src,
                "serp_hits": r.get("hit_count", 0), "queries": r.get("queries", []),
                "evidence": why,
                "homepage_title": (r.get("homepage") or {}).get("title"),
                "service_page": (r.get("service_page") or {}).get("url")})
for dom, why in SECTION.items():
    r = ev.get(dom, {})
    src = "search" if ("live search" in why or "Live search" in why) else "fetch"
    out.append({"domain": dom, "tier": "SECTION", "verified_via": src,
                "serp_hits": r.get("hit_count", 0), "queries": r.get("queries", []),
                "evidence": why,
                "homepage_title": (r.get("homepage") or {}).get("title"),
                "service_page": (r.get("service_page") or {}).get("url")})

(HERE / "competitors.json").write_text(
    json.dumps({"generated": "2026-07-11", "dedicated": len(DEDICATED),
                "section": len(SECTION), "rivals": out}, indent=1), encoding="utf-8")
print("dedicated", len(DEDICATED), "section", len(SECTION), "total", len(out))
