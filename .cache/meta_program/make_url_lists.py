import json

for site in ("medical", "dentists", "generalist", "solicitors", "agency"):
    w = {e["slug"]: e["page_url"] for e in json.load(open(rf".cache\meta_program\{site}\worklist.json", encoding="utf-8"))}
    applied = [e["slug"] for e in json.load(open(rf".cache\meta_program\{site}\apply_results.json", encoding="utf-8"))["applied"]]
    urls = [w[s] for s in applied if s in w]
    if site == "generalist":
        urls.append("https://www.hollowaydavies.co.uk/blog/bookkeeping-and-compliance/confirmation-statement-late-penalty-companies-house")
    with open(rf".cache\meta_program\{site}\changed_urls.txt", "w", encoding="utf-8") as f:
        f.write("\n".join(dict.fromkeys(urls)))
    print(site, len(set(urls)))
