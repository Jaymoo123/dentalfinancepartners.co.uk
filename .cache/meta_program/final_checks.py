import json
import re
import urllib.request

def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    return urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "replace")

checks = [
    ("https://www.hollowaydavies.co.uk/blog/payroll-and-paye/employee-mileage-45p-tax-free-rules", "55p"),
    ("https://www.hollowaydavies.co.uk/blog/limited-company-tax/can-i-claim-mileage-limited-company-director", "55p"),
    ("https://www.hollowaydavies.co.uk/blog/bookkeeping-and-compliance/confirmation-statement-late-penalty-companies-house", "no automatic"),
]
for url, needle in checks:
    html = fetch(url)
    t = re.search(r"<title>([^<]+)</title>", html)
    d = re.search(r'name="description" content="([^"]+)"', html)
    ok = needle.lower() in (d.group(1).lower() if d else "") or needle.lower() in (t.group(1).lower() if t else "")
    print(("OK  " if ok else "MISS"), url.rsplit("/", 1)[-1])
    print("     title:", t.group(1)[:80] if t else "(none)")
    print("     desc :", (d.group(1)[:110] if d else "(none)"))

# one tail page
w = json.load(open(r".cache\meta_program\generalist\proposals_tail.json", encoding="utf-8"))
e = w[0]
wl = {x["slug"]: x["page_url"] for x in json.load(open(r".cache\meta_program\generalist\worklist_tail.json", encoding="utf-8"))}
html = fetch(wl[e["slug"]])
t = re.search(r"<title>([^<]+)</title>", html)
print(("OK  " if t and t.group(1).startswith(e["metaTitle"][:40]) else "MISS"), "tail:", e["slug"])

# IndexNow URL list for this deploy
urls = [wl[x["slug"]] for x in w if x["slug"] in wl]
urls += [u for u, _ in checks]
with open(r".cache\meta_program\generalist\changed_urls_tail.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(dict.fromkeys(urls)))
print("indexnow list:", len(set(urls)), "urls")
