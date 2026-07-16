"""Seed blog_topics for an expansion site from its topic_pool_final.json clusters.

Usage: python scripts/_seed_expansion_topics.py <site_key> <pool_json_path> <keyword_source_tag> [--append]
Pattern: scripts/_seed_charities_topics.py (idempotence guard mandatory).
--append: top-up an existing pool — skips clusters whose head/members already exist as a
primary_keyword instead of aborting on any existing rows.
"""
import json, sys, requests
from pathlib import Path
REPO = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPO))
from shared_supabase_config import SUPABASE_URL, SUPABASE_KEY

site_key, pool_path, source_tag = sys.argv[1], sys.argv[2], sys.argv[3]
append = "--append" in sys.argv[4:]
pool = json.load(open(REPO / pool_path, encoding="utf-8"))
clusters = pool["clusters"]

headers = {"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}",
           "Content-Type": "application/json", "Prefer": "return=minimal"}

r = requests.get(f"{SUPABASE_URL}/rest/v1/blog_topics?site_key=eq.{site_key}&select=primary_keyword,topic&limit=5000", headers=headers)
r.raise_for_status()
existing = {(row.get("primary_keyword") or row.get("topic") or "").lower().strip() for row in r.json()}
if existing and not append:
    print(f"{site_key} rows already present; aborting (no dupes; use --append to top up)"); sys.exit(1)
if append:
    before = len(clusters)
    clusters = [c for c in clusters
                if c["head"].lower().strip() not in existing
                and not any(m.lower().strip() in existing for m in c.get("members", []))]
    print(f"append mode: {before - len(clusters)} clusters already in pool, seeding {len(clusters)}")

ranked = sorted(clusters, key=lambda c: -(c.get("volume") or 0))
n = len(ranked)
rows = []
for i, c in enumerate(ranked):
    rows.append({
        "site_key": site_key,
        "topic": c["head"],
        "primary_keyword": c["head"],
        "category": c.get("category"),
        "secondary_keywords": [m for m in c.get("members", []) if m != c["head"]],
        "search_volume": c.get("volume"),
        "keyword_difficulty": c.get("kd"),
        "priority": min(10, i * 10 // n + 1),
        "used": bool(c.get("covered")),
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
