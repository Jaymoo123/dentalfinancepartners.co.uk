"""
Automated blog generation with SQL-based topic marking.
Generates all unused topics and marks them as used via MCP/SQL.
"""
import os
import sys
import subprocess
import time
import re
import httpx

# Import shared config
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from shared_supabase_config import SUPABASE_URL, SUPABASE_KEY

ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")

def get_unused_count():
    """Get count of unused topics."""
    url = f"{SUPABASE_URL}/rest/v1/blog_topics_dentists"
    headers = {"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"}
    params = {"used": "eq.false", "select": "id"}
    response = httpx.get(url, headers=headers, params=params)
    response.raise_for_status()
    return len(response.json())

def get_next_topic():
    """Fetch the next unused topic."""
    url = f"{SUPABASE_URL}/rest/v1/blog_topics_dentists"
    headers = {"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"}
    params = {
        "used": "eq.false",
        "order": "priority.desc,created_at.asc",
        "limit": "1"
    }
    response = httpx.get(url, headers=headers, params=params)
    response.raise_for_status()
    topics = response.json()
    return topics[0] if topics else None

def mark_used_via_file(topic_id, slug):
    """
    Mark topic as used by writing SQL to a temp file for manual execution.
    This is a workaround since anon key doesn't have UPDATE permissions.
    """
    sql = f"UPDATE blog_topics_dentists SET used = true, generated_slug = '{slug}', generated_at = NOW() WHERE id = '{topic_id}';\n"
    with open("mark_used.sql", "a", encoding="utf-8") as f:
        f.write(sql)

def main():
    # Clear previous SQL file
    if os.path.exists("mark_used.sql"):
        os.remove("mark_used.sql")
    
    total = get_unused_count()
    print("=" * 60)
    print(f"Found {total} unused topics")
    print("=" * 60)
    
    generated = 0
    errors = 0
    
    # Generate up to 20 posts (to avoid hitting rate limits)
    max_posts = min(total, 20)
    
    for i in range(1, max_posts + 1):
        print(f"\n[{i}/{max_posts}] Fetching next topic...")
        
        topic = get_next_topic()
        if not topic:
            print("[DONE] No more unused topics")
            break
        
        print(f"    Topic: {topic['topic']}")
        print(f"    ID: {topic['id']}")
        
        try:
            # Run generation script
            env = os.environ.copy()
            env["ANTHROPIC_API_KEY"] = ANTHROPIC_API_KEY
            
            result = subprocess.run(
                ["python", "generate_blog_supabase.py"],
                capture_output=True,
                text=True,
                env=env,
                timeout=120
            )
            
            if result.returncode == 0:
                # Extract slug from output
                slug_match = re.search(r'\[COMPLETE\] (.+?)\.md', result.stdout)
                if slug_match:
                    slug = slug_match.group(1)
                    print(f"[OK] Generated: {slug}")
                    mark_used_via_file(topic['id'], slug)
                    generated += 1
                else:
                    print("[WARN] Could not extract slug from output")
                    mark_used_via_file(topic['id'], 'unknown')
                    generated += 1
            else:
                print(f"[ERROR] Generation failed:")
                print(result.stderr[:500])
                errors += 1
                
        except subprocess.TimeoutExpired:
            print(f"[ERROR] Timeout after 120s")
            errors += 1
        except Exception as e:
            print(f"[ERROR] Exception: {e}")
            errors += 1
        
        # Delay between generations
        if i < max_posts:
            time.sleep(2)
    
    print("\n" + "=" * 60)
    print(f"Batch complete!")
    print(f"Generated: {generated}")
    print(f"Errors: {errors}")
    print("=" * 60)
    
    if os.path.exists("mark_used.sql"):
        print("\n[ACTION REQUIRED]")
        print("Run the SQL in 'mark_used.sql' via Supabase dashboard or MCP tool")
        print("to mark all generated topics as used.")

if __name__ == "__main__":
    main()
