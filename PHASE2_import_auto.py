"""
PHASE 2: Import comprehensive topics (AUTO MODE - no user input)
130 Property + 12 Dentists = 142 topics
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
        'WARN': '[WARN]'
    }.get(level, '[INFO]')
    print(f"{timestamp} {prefix} {message}")

def import_topics(csv_path, table_name, site_name, priority=9):
    """Import topics with progress updates"""
    print_header(f"IMPORTING {site_name.upper()} - PHASE 2 COMPREHENSIVE")
    
    # Use full path
    full_path = os.path.join(r'c:\Users\user\Documents\Accounting', csv_path)
    with open(full_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        topics = list(reader)
    
    print_status(f"Loaded {len(topics)} topics from {os.path.basename(csv_path)}", 'INFO')
    print()
    
    url = f"{url_base}/rest/v1/{table_name}"
    
    imported = 0
    skipped = 0
    errors = []
    
    # Show progress every 10 topics
    for i, topic in enumerate(topics, 1):
        if table_name == 'blog_topics_property':
            data = {
                'topic': topic['title'],
                'category': topic['category'],
                'publish_priority': priority,  # Set to 9 for Phase 2
                'primary_keyword': topic['keyword'],
                'search_volume': int(topic['search_volume']) if topic['search_volume'].isdigit() else None,
                'competition': int(topic['difficulty']) if topic['difficulty'].isdigit() else None,
                'slug': topic['slug'],
                'used': False
            }
        else:
            data = {
                'topic': topic['title'],
                'category': topic['category'],
                'priority': priority,  # Set to 9 for Phase 2
                'slug': topic['slug'],
                'used': False
            }
        
        try:
            response = httpx.post(url, headers=headers, json=data, timeout=30)
            if response.status_code in [200, 201]:
                imported += 1
                if i % 10 == 0 or i == len(topics):
                    print_status(f"Progress: {i}/{len(topics)} ({i/len(topics)*100:.0f}%) - Last: {topic['title'][:50]}", 'OK')
            elif 'duplicate' in response.text.lower() or 'unique' in response.text.lower():
                skipped += 1
            else:
                errors.append((topic['title'], response.text))
                print_status(f"[{i:3}/{len(topics)}] Failed: {topic['title'][:60]}", 'ERROR')
        except Exception as e:
            errors.append((topic['title'], str(e)))
            print_status(f"[{i:3}/{len(topics)}] Failed: {topic['title'][:60]}", 'ERROR')
        
        time.sleep(0.05)
    
    print()
    print("-"*100)
    print_status(f"{site_name} import complete: {imported} imported, {skipped} skipped, {len(errors)} errors", 'INFO')
    print()
    
    return imported, skipped, errors

# Main
print_header("PHASE 2: COMPREHENSIVE TOPICS IMPORT (AUTO)")

print(f"\nStarted at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")

print("PHASE 2 OVERVIEW:")
print("  Property: 130 comprehensive topics")
print("  Dentists: 12 comprehensive topics")
print("  Total: 142 topics")
print("  Priority: 9 (generates after Phase 1, before pre-existing)")

print("\nStarting import in 2 seconds...")
time.sleep(2)

print_header("STARTING PHASE 2 IMPORT")

# Import Property comprehensive
p_imported, p_skipped, p_errors = import_topics(
    'PHASE2_COMPREHENSIVE_property.csv',
    'blog_topics_property',
    'Property',
    priority=9
)

# Import Dentists comprehensive
d_imported, d_skipped, d_errors = import_topics(
    'PHASE2_COMPREHENSIVE_dentists.csv',
    'blog_topics',
    'Dentists',
    priority=9
)

# Final summary
print_header("PHASE 2 IMPORT COMPLETE")

print(f"\nCompleted at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")

print("IMPORT RESULTS:")
print(f"  Property:  {p_imported:3}/130 imported, {p_skipped} skipped, {len(p_errors)} errors")
print(f"  Dentists:  {d_imported:3}/12 imported, {d_skipped} skipped, {len(d_errors)} errors")
print(f"  TOTAL:     {p_imported + d_imported:3}/142 imported")

if not (p_errors or d_errors):
    print_status("All Phase 2 topics imported successfully!", 'OK')

print_header("NEXT STEPS - GENERATE PHASE 2 POSTS")

print("\n1. Generate Property posts (130 posts, 7 runs):")
print("   cd Property")
print("   for i in {1..7}; do python generate_all_automated.py; done")
print("   Expected: ~10 hours")

print("\n2. Generate Dentists posts (12 posts, 1 run):")
print("   cd Dentists")
print("   python generate_all_automated.py")
print("   Expected: ~1 hour")

print("\n3. Deploy both sites")
print("\n4. Verify 100% coverage")
