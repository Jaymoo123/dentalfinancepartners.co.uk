import json

path = r".cache\meta_program\dentists\proposals.json"
p = json.load(open(path, encoding="utf-8"))
desc_fixes = {
    "dental-practice-software-accounting-integration":
        "Connect Dentally, SOE or Exact to Xero or QuickBooks and cut roughly 2.5 hours of manual data entry a week. Integration routes and pitfalls.",
    "dental-practice-lease-vs-buy-decision-framework":
        "Lease or buy your dental practice premises in 2026/27: cash flow, SIPP or SSAS routes, fixtures allowances, CGT and the VAT trap on opted purchases.",
    "bda-model-associate-agreement-tax-status":
        "Does a BDA model associate agreement guarantee self-employment? No: HMRC judges the actual working practice, not the contract wording. Five key tests.",
}
pq_fixes = {
    "hiring-first-associate-costs-structure-uk-dental": "hiring first dental associate costs",
    "allowable-expenses-locum-dentists-uk-2025-26": "locum dentist expenses",
    "dental-practice-vat-registration-threshold-requirements": "dental practice vat registration",
    "dft-to-dct-specialty-training-pay-tax-progression": "dft to dct training pay",
    "cqc-inspection-costs-tax-deductible-expenses-uk-dentists": "cqc inspection costs tax deductible",
}
EM, EN = "—", "–"
for e in p:
    if e["slug"] in desc_fixes:
        d = desc_fixes[e["slug"]]
        assert 120 <= len(d) <= 155, (e["slug"], len(d))
        assert EM not in d and EN not in d, e["slug"]
        e["metaDescription"] = d
        e["rationale"] += " (description amended per QA verdict)"
    if e["slug"] in pq_fixes:
        e["primary_query"] = pq_fixes[e["slug"]]
        e["rationale"] += " (primary_query retargeted; page query data junk/minimal)"
files = [e["file"] for e in p]
assert len(files) == len(set(files))
json.dump(p, open(path, "w", encoding="utf-8"), indent=1, ensure_ascii=False)
print("patched ok:", len(desc_fixes), "descs,", len(pq_fixes), "pqs")
