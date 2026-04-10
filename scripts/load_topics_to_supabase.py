"""
Load topics from property_content_matrix.json into blog_topics_property Supabase table.
Only inserts substantive and expense_spoke topics (not tools).
"""
import json
import os
import sys
import requests
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPO_ROOT))
from shared_supabase_config import SUPABASE_URL, SUPABASE_KEY

MATRIX_PATH = REPO_ROOT / "Admin" / "property_content_matrix.json"
TABLE = "blog_topics_property"


def load_matrix():
    with open(MATRIX_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def insert_topics(topics: list[dict]):
    url = f"{SUPABASE_URL}/rest/v1/{TABLE}"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal",
    }

    rows = []
    for t in topics:
        rows.append({
            "topic": t["title"],
            "category": t.get("category_name", "Unknown"),
            "priority": str(t.get("priority", 3)),
            "primary_keyword": t.get("primary_keyword", ""),
            "secondary_keywords": t.get("secondary_keywords", []),
            "used": False,
            "content_tier": t.get("content_tier", "cluster"),
            "user_intent": t.get("search_intent", "informational"),
            "publish_priority": t.get("priority", 3),
            "slug": t.get("slug", ""),
            "keyword_source": "content_matrix_2026_04",
        })

    batch_size = 50
    inserted = 0
    for i in range(0, len(rows), batch_size):
        batch = rows[i:i + batch_size]
        resp = requests.post(url, headers=headers, json=batch)
        if resp.status_code in (200, 201):
            inserted += len(batch)
            print(f"  Inserted batch {i // batch_size + 1}: {len(batch)} topics")
        else:
            print(f"  ERROR batch {i // batch_size + 1}: {resp.status_code} - {resp.text[:200]}")
    return inserted


def main():
    matrix = load_matrix()

    all_topics = []

    for pillar in matrix["pillars"]:
        cat_name = pillar["name"]
        for t in pillar["topics"]:
            t["category_name"] = cat_name
            all_topics.append(t)

    for t in matrix.get("expense_spoke_topics", []):
        t["category_name"] = "Landlord Tax Essentials"
        all_topics.append(t)

    print(f"Total topics to insert: {len(all_topics)}")
    inserted = insert_topics(all_topics)
    print(f"\nDone. Inserted {inserted} topics into {TABLE}.")


if __name__ == "__main__":
    main()
