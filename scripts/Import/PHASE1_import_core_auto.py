"""
PHASE 1: Import core foundational topics (AUTO MODE)
With detailed status updates - no user input required
"""

from dotenv import load_dotenv
import httpx
import os
import csv
from datetime import datetime
import time

load_dotenv()

url_base = os.getenv('SUPABASE_URL')
key = os.getenv('SUPABASE_KEY')
headers = {
    'apikey': key,
    'Authorization': f'Bearer {key}',
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
}

def print_header(text):
    print("\n" + "="*100)
    print(text)
    print("="*100)

def print_status(message, level='INFO'):
    timestamp = datetime.now().strftime('%H:%M:%S')
    prefix = {
        'INFO': '[INFO]',
        'OK': '[OK]  ',
        'ERROR': '[ERR]',
        'WARN': '[WARN]',
        'NEXT': '[>>>]'
    }.get(level, '[INFO]')
    print(f"{timestamp} {prefix} {message}")

def import_topics(csv_path, table_name, site_name):
    """Import topics with detailed status"""
    print_header(f"IMPORTING {site_name.upper()} - PHASE 1 CORE TOPICS")
    
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        topics = list(reader)
    
    print_status(f"Loaded {len(topics)} topics from {os.path.basename(csv_path)}", 'INFO')
    print_status(f"Target table: {table_name}", 'INFO')
    print()
    
    url = f"{url_base}/rest/v1/{table_name}"
    
    imported = 0
    skipped = 0
    errors = []
    
    for i, topic in enumerate(topics, 1):
        # Map columns
        if table_name == 'blog_topics_property':
            data = {
                'topic': topic['title'],
                'category': topic['category'],
                'priority': int(topic['priority']) if topic['priority'].isdigit() else 5,
                'primary_keyword': topic['keyword'],
                'search_volume': int(topic['search_volume']) if topic['search_volume'].isdigit() else None,
                'competition': int(topic['difficulty']) if topic['difficulty'].isdigit() else None,
                'slug': topic['slug'],
                'used': False
            }
        else:  # blog_topics_dentists
            data = {
                'topic': topic['title'],
                'category': topic['category'],
                'priority': int(topic['priority']) if topic['priority'].isdigit() else 5,
                'slug': topic['slug'],
                'used': False
            }
        
        try:
            response = httpx.post(url, headers=headers, json=data, timeout=30)
            if response.status_code in [200, 201]:
                imported += 1
                print_status(f"[{i:2}/{len(topics)}] Imported: {topic['title'][:65]}", 'OK')
                print(f"         Keyword: {topic['keyword'][:70]}")
                print(f"         Slug: {topic['slug']}")
                print(f"         Volume: {topic['search_volume']:>5} | Difficulty: {topic['difficulty']:>3} | Priority: {topic['priority']}")
                print()
            elif 'duplicate' in response.text.lower() or 'unique' in response.text.lower():
                skipped += 1
                print_status(f"[{i:2}/{len(topics)}] Skipped (already exists): {topic['title'][:55]}", 'WARN')
                print()
            else:
                errors.append((topic['title'], response.text))
                print_status(f"[{i:2}/{len(topics)}] FAILED: {topic['title'][:60]}", 'ERROR')
                print(f"         Error: {response.text[:150]}")
                print()
        except Exception as e:
            errors.append((topic['title'], str(e)))
            print_status(f"[{i:2}/{len(topics)}] FAILED: {topic['title'][:60]}", 'ERROR')
            print(f"         Error: {str(e)[:150]}")
            print()
        
        time.sleep(0.1)
    
    print("-"*100)
    print_status(f"{site_name} import complete: {imported} imported, {skipped} skipped, {len(errors)} errors", 'INFO')
    print()
    
    return imported, skipped, errors

# Main execution
print_header("PHASE 1: CORE FOUNDATIONAL TOPICS IMPORT")

print(f"\nStarted at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")

print("PHASE 1 OVERVIEW:")
print("  Property: 12 core foundational topics")
print("  Dentists: 9 core topics")
print("  Total: 21 topics")
print("  Cost: $3.78")
print("  Time: ~1.8 hours generation")

print("\nThese are the CRITICAL foundational topics:")
print("  - What/how/where/when queries")
print("  - Cost/fees/pricing content")
print("  - Best/near me service discovery")
print("  - High-priority technical gaps")

print("\nAfter Phase 1:")
print("  Property: 45 -> 57 posts (6.6% -> 14.5% coverage)")
print("  Dentists: 48 -> 57 posts (60-70% -> 85-90% coverage)")

print_status("Starting import in 2 seconds...", 'INFO')
time.sleep(2)

# Import Property
p_imported, p_skipped, p_errors = import_topics(
    'PHASE1_CORE_property.csv',
    'blog_topics_property',
    'Property'
)

# Import Dentists
d_imported, d_skipped, d_errors = import_topics(
    'PHASE1_CORE_dentists.csv',
    'blog_topics_dentists',
    'Dentists'
)

# Final summary
print_header("PHASE 1 IMPORT COMPLETE")

print(f"\nCompleted at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")

print("IMPORT RESULTS:")
print(f"  Property:  {p_imported:2}/12 imported, {p_skipped} skipped, {len(p_errors)} errors")
print(f"  Dentists:  {d_imported:2}/9 imported, {d_skipped} skipped, {len(d_errors)} errors")
print(f"  TOTAL:     {p_imported + d_imported:2}/21 imported")

if p_errors or d_errors:
    print(f"\n[WARN] {len(p_errors) + len(d_errors)} errors occurred - review above")
else:
    print_status("All Phase 1 topics imported successfully!", 'OK')

print_header("NEXT STEPS - GENERATE PHASE 1 POSTS")

print("\n1. Generate Property posts (12 posts):")
print("   python Property/generate_blog_supabase.py")
print("   Expected: ~1 hour, 12 new blog posts")
print("   Watch for status updates per post")

print("\n2. Generate Dentists posts (9 posts):")
print("   python Dentists/generate_blog_supabase.py")
print("   Expected: ~45 minutes, 9 new blog posts")
print("   Watch for status updates per post")

print("\n3. Deploy both sites:")
print("   cd Property/web && vercel --prod && cd ../..")
print("   cd Dentists/web && vercel --prod && cd ../..")

print("\n4. REVIEW QUALITY (CRITICAL):")
print("   - Check blog post quality and accuracy")
print("   - Verify keyword coverage in content")
print("   - Ensure content meets your standards")
print("   - Check formatting and structure")

print("\n5. After review passes, run Phase 2:")
print("   python PHASE2_import_comprehensive.py")
print("   This will import 142 more topics")

print("\n" + "="*100)
print("PHASE 1 IMPORT STATUS")
print("="*100)

print(f"\nTopics imported to Supabase: {p_imported + d_imported}/21")
print(f"Ready to generate: YES")
print(f"\nNext command:")
print(f"  python Property/generate_blog_supabase.py")

print(f"\n[REMINDER]")
print(f"  Phase 1: 21 topics ($3.78)")
print(f"  Phase 2: 142 topics ($25.56) - after review")
print(f"  Total: 163 topics ($29.34)")
