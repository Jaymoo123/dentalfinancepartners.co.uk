"""Seed blog_topics for an expansion site from its topic_pool_final.json clusters.

Usage: python scripts/_seed_expansion_topics.py <site_key> <pool_json_path> <keyword_source_tag>
Pattern: scripts/_seed_charities_topics.py (idempotence guard mandatory).
"""
import json, sys, requests
from pathlib import Path
REPO = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPO))
from shared_supabase_config import SUPABASE_URL, SUPABASE_KEY

site_key, pool_path, source_tag = sys.argv[1], sys.argv[2], sys.argv[3]
pool = json.load(open(REPO / pool_path, encoding="utf-8"))
clusters = pool["clusters"]

headers = {"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}",
           "Content-Type": "application/json", "Prefer": "return=minimal"}

r = requests.get(f"{SUPABASE_URL}/rest/v1/blog_topics?site_key=eq.{site_key}&select=id&limit=1", headers=headers)
r.raise_for_status()
if r.json():
    print(f"{site_key} rows already present; aborting (no dupes)"); sys.exit(1)

ranked = sorted(clusters, key=lambda c: -(c.get("volume") or 0))
n = len(ranked)
rows = []
for i, c in enumerate(ranked):
    rows.append({
        "site_key": site_key,
        "topic": c["head"],
        "primary_keyword": c["head"],
        "secondary_keywords": [m for m in c.get("members", []) if m != c["head"]],
        "search_volume": c.get("volume"),
        "keyword_difficulty": c.get("kd"),
        "priority": min(10, i * 10 // n + 1),
        "used": False,
        "status": "queued",
        "keyword_source": source_tag,
        "notes": "sources: " + ",".join(sorted(set(c.get("sources", [])))),
    })

ins = 0
for i in range(0, len(rows), 200):
    resp = requests.post(f"{SUPABASE_URL}/rest/v1/blog_topics", headers=headers, json=rows[i:i+200])
    if resp.status_code in (200, 201):
        ins += len(rows[i:i+200])
    else:
        print("ERROR", resp.status_code, resp.text[:300]); sys.exit(1)
print(f"inserted {ins}/{n} {site_key} topics")
