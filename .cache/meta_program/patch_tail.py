import json

path = r".cache\meta_program\generalist\proposals_tail.json"
p = json.load(open(path, encoding="utf-8"))

rd = next(e for e in p if e["slug"] == "r-and-d-tax-claim-software-companies")
print("RD old title:", rd["metaTitle"])
new_t = "R&D Tax Claim Software vs Accountant: UK Comparison"
assert 50 <= len(new_t) <= 60, len(new_t)
rd["metaTitle"] = new_t
rd["primary_query"] = "r&d tax claim software"
rd["rationale"] += " (title audience corrected per QA verdict)"

dd = next(e for e in p if e["slug"] == "accountant-for-delivery-drivers-uk")
print("DD old desc:", dd["metaDescription"])
new_d = dd["metaDescription"].replace("45p a mile", "55p a mile").replace("45p per mile", "55p per mile")
assert "55p" in new_d and "45p" not in new_d
assert 120 <= len(new_d) <= 155, len(new_d)
dd["metaDescription"] = new_d
dd["rationale"] += " (rate corrected to 55p per FA 2026 AMAP change; page body back-patched same day)"
print("DD new desc:", len(new_d), new_d)

json.dump(p, open(path, "w", encoding="utf-8"), indent=1, ensure_ascii=False)
print("tail patched:", len(p), "proposals")
