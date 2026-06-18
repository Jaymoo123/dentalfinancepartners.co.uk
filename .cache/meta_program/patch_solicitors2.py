import json
import re

path = r".cache\meta_program\solicitors\proposals.json"
p = json.load(open(path, encoding="utf-8"))
for e in p:
    toks = [t for t in re.split(r"\s+", e["primary_query"].lower()) if len(t) > 3]
    title = e["metaTitle"].lower()
    if toks and not any(t in title for t in toks):
        print("REJ:", e["slug"])
        print("  pq:", e["primary_query"])
        print("  title:", e["metaTitle"])
