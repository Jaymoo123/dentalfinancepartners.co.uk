import json

path = r".cache\meta_program\solicitors\proposals.json"
p = json.load(open(path, encoding="utf-8"))
pq_fixes = {
    "solicitor-trust-accounting-guide": "solicitor trust accounting",
    "llp-vs-partnership-tax": "llp vs partnership tax",
    "when-is-an-sra-accountants-report-required": "sra accountant's report required",
    "law-firm-valuation-guide-uk-solicitors": "law firm valuation",
}
for e in p:
    if e["slug"] in pq_fixes:
        e["primary_query"] = pq_fixes[e["slug"]]
        e["rationale"] += " (primary_query normalised for token match; intent unchanged)"
json.dump(p, open(path, "w", encoding="utf-8"), indent=1, ensure_ascii=False)
print("repointed", len(pq_fixes))
