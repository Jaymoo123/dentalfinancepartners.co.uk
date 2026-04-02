"""
Import Solicitors keywords from CSV to Supabase blog_topics_solicitors table.
"""
import csv
import os
import sys
from datetime import datetime
import httpx

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from shared_supabase_config import SUPABASE_URL, SUPABASE_KEY

CSV_PATH = "Admin/Topics/solicitors_keywords.csv"
TABLE_NAME = "blog_topics_solicitors"

def import_keywords():
    """Import keywords from CSV to Supabase."""
    
    if not os.path.exists(CSV_PATH):
        print(f"Error: CSV file not found at {CSV_PATH}")
        sys.exit(1)
    
    print("=" * 80)
    print("IMPORT SOLICITORS KEYWORDS TO SUPABASE")
    print("=" * 80)
    print(f"CSV: {CSV_PATH}")
    print(f"Table: {TABLE_NAME}")
    print(f"Supabase: {SUPABASE_URL}")
    print("=" * 80)
    
    keywords = []
    with open(CSV_PATH, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            keywords.append({
                "keyword": row["keyword"],
                "category": row["category"],
                "priority": int(row["priority"]) if row.get("priority") else 50,
                "difficulty": int(row["difficulty"]) if row.get("difficulty") else None,
                "search_volume": int(row["search_volume"]) if row.get("search_volume") else None,
                "intent": row.get("intent", "informational"),
                "notes": row.get("notes", ""),
                "status": "pending",
            })
    
    print(f"\nLoaded {len(keywords)} keywords from CSV")
    
    url = f"{SUPABASE_URL}/rest/v1/{TABLE_NAME}"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
    }
    
    print(f"\nInserting {len(keywords)} keywords into {TABLE_NAME}...")
    
    response = httpx.post(url, headers=headers, json=keywords, timeout=30.0)
    
    if response.status_code == 201:
        print(f"[OK] Successfully inserted {len(keywords)} keywords")
        print("\nVerify with:")
        print(f"  SELECT COUNT(*), status FROM {TABLE_NAME} GROUP BY status;")
    else:
        print(f"[ERROR] Insert failed: {response.status_code}")
        print(response.text)
        sys.exit(1)
    
    print("=" * 80)
    print("IMPORT COMPLETE")
    print("=" * 80)
    print(f"Total keywords: {len(keywords)}")
    print(f"Priority 1: {sum(1 for k in keywords if k['priority'] == 1)}")
    print(f"Priority 2: {sum(1 for k in keywords if k['priority'] == 2)}")
    print(f"Priority 3: {sum(1 for k in keywords if k['priority'] == 3)}")
    print("\nNext step: Generate blog posts with:")
    print("  cd Solicitors")
    print("  python generate_blog_supabase.py")

if __name__ == "__main__":
    import_keywords()
