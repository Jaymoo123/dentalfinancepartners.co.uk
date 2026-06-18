import json, re, sys
from pathlib import Path
sys.path.insert(0, ".")
from optimisation_engine.blog_generator.post_processing import fetch_image_for_post

queries = {
    "cis-for-property-developers": ["property development crane site uk", "new build housing development aerial", "apartment construction crane city"],
    "freeagent-cis-guide": ["accounting software laptop invoices", "freelancer laptop bookkeeping desk", "small business owner laptop finances"],
    "quickbooks-cis-guide": ["bookkeeping software computer screen office", "accounts software desk calculator", "person using finance app computer"],
    "sage-cis-guide": ["payroll office paperwork computer", "office worker spreadsheet accounts", "business accounts desktop computer office"],
    "what-construction-work-is-not-cis": ["gardener landscaping lawn uk", "surveyor architect site plans", "delivery van building materials"],
    "xero-cis-guide": ["cloud accounting tablet invoice", "tradesman tablet invoice van", "builder checking phone invoice"],
}
cache_p = Path("optimisation_engine/.cache/pexels_used_construction-cis.json")
used = set(json.loads(cache_p.read_text(encoding="utf-8"))) if cache_p.exists() else set()
blog = Path("construction-cis/web/content/blog")


def yaml_q(s):
    s = str(s).replace("\\", "\\\\").replace('"', '\\"')
    return '"' + s + '"'


for slug, qs in queries.items():
    got = None
    for q in qs:
        img = fetch_image_for_post(q)
        if img and str(img.get("url", "")) and (str(img.get("pexels_url") or img.get("url")) not in used):
            got = (q, img)
            break
    if not got:
        print(f"FAIL {slug}: no unique photo across {len(qs)} queries")
        continue
    q, img = got
    used.add(str(img.get("pexels_url") or img.get("url")))
    p = blog / f"{slug}.md"
    t = p.read_text(encoding="utf-8")
    m = re.search(r"^author:.*$", t, re.M)
    block = (
        "\nimage: " + yaml_q(img["url"])
        + "\naltText: " + yaml_q(img.get("alt") or "UK construction industry scene")
        + "\nimageCredit:"
        + "\n  photographer: " + yaml_q(img.get("photographer", ""))
        + "\n  photographerUrl: " + yaml_q(img.get("photographer_url", ""))
        + '\n  source: "Pexels"'
        + "\n  sourceUrl: " + yaml_q(img.get("pexels_url", ""))
    )
    t = t[: m.end()] + block + t[m.end():]
    p.write_text(t, encoding="utf-8")
    print(f"OK {slug}  query='{q}'  photographer={img.get('photographer')}")
cache_p.write_text(json.dumps(sorted(used), indent=0), encoding="utf-8")
