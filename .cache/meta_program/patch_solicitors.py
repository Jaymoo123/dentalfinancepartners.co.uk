import json

path = r".cache\meta_program\solicitors\proposals.json"
p = json.load(open(path, encoding="utf-8"))
before = len(p)

# Fix the Rule 8.3 fabrication
for e in p:
    if e["slug"] == "solicitor-client-account-reconciliation" and "Rule 8.3" in e["metaDescription"]:
        d = ("Reconcile a solicitor client account: the three-way match of bank, ledger and "
             "cash book at least every 5 weeks under the SRA Accounts Rules 2019.")
        print("fixed desc:", len(d), d)
        e["metaDescription"] = d
        e["rationale"] += " (rule citation corrected per QA verdict)"

# Dedupe by file, keep first occurrence (worklist is score-ordered)
seen = set()
deduped = []
for e in p:
    if e["file"] in seen:
        print("dropping dup row:", e["slug"], "|", e["metaTitle"])
        continue
    seen.add(e["file"])
    deduped.append(e)

for e in deduped:
    assert 120 <= len(e["metaDescription"]) <= 155, (e["slug"], len(e["metaDescription"]))
    assert 50 <= len(e["metaTitle"]) <= 60, (e["slug"], len(e["metaTitle"]))

json.dump(deduped, open(path, "w", encoding="utf-8"), indent=1, ensure_ascii=False)
print(f"{before} -> {len(deduped)} proposals after dedupe")
