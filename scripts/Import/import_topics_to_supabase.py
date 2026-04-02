"""
Import missing topics to Supabase
Reads CSV files and inserts to appropriate blog_topics_* tables
"""

from dotenv import load_dotenv
import httpx
import os
import csv

load_dotenv()

url_base = os.getenv('SUPABASE_URL')
key = os.getenv('SUPABASE_KEY')
headers = {
    'apikey': key,
    'Authorization': f'Bearer {key}',
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
}

def import_property_topics():
    """Import Property topics from CSV"""
    print("\n" + "="*100)
    print("IMPORTING PROPERTY TOPICS")
    print("="*100)
    
    with open('missing_topics_property.csv', 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        topics = list(reader)
    
    print(f"\nFound {len(topics)} topics to import")
    
    url = f"{url_base}/rest/v1/blog_topics_property"
    
    imported = 0
    errors = []
    
    for i, topic in enumerate(topics, 1):
        # Map CSV columns to database columns
        data = {
            'topic': topic['title'],
            'category': topic['category'],
            'priority': topic['priority'],
            'primary_keyword': topic['keyword'],
            'search_volume': topic['search_volume'] if topic['search_volume'] != 'N/A' else None,
            'competition': topic['difficulty'] if topic['difficulty'] != 'N/A' else None,
            'slug': topic['slug'],
            'used': False
        }
        
        try:
            response = httpx.post(url, headers=headers, json=data, timeout=30)
            if response.status_code in [200, 201]:
                imported += 1
                print(f"  [{i:2}/{len(topics)}] OK: {topic['title'][:60]}")
            else:
                errors.append((topic['title'], response.text))
                print(f"  [{i:2}/{len(topics)}] ERROR: {topic['title'][:60]}")
                print(f"           {response.text[:100]}")
        except Exception as e:
            errors.append((topic['title'], str(e)))
            print(f"  [{i:2}/{len(topics)}] ERROR: {topic['title'][:60]}")
            print(f"           {str(e)[:100]}")
    
    print(f"\n[RESULT] Imported {imported}/{len(topics)} topics")
    if errors:
        print(f"[ERRORS] {len(errors)} topics failed to import")
    
    return imported, errors

def import_dentists_topics():
    """Import Dentists topics from CSV"""
    print("\n" + "="*100)
    print("IMPORTING DENTISTS TOPICS")
    print("="*100)
    
    with open('missing_topics_dentists.csv', 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        topics = list(reader)
    
    print(f"\nFound {len(topics)} topics to import")
    
    url = f"{url_base}/rest/v1/blog_topics_dentists"
    
    imported = 0
    errors = []
    
    for i, topic in enumerate(topics, 1):
        # Map CSV columns to database columns (blog_topics_dentists has different schema)
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
                print(f"  [{i:2}/{len(topics)}] OK: {topic['title'][:60]}")
            else:
                errors.append((topic['title'], response.text))
                print(f"  [{i:2}/{len(topics)}] ERROR: {topic['title'][:60]}")
                print(f"           {response.text[:100]}")
        except Exception as e:
            errors.append((topic['title'], str(e)))
            print(f"  [{i:2}/{len(topics)}] ERROR: {topic['title'][:60]}")
            print(f"           {str(e)[:100]}")
    
    print(f"\n[RESULT] Imported {imported}/{len(topics)} topics")
    if errors:
        print(f"[ERRORS] {len(errors)} topics failed to import")
    
    return imported, errors

def import_medical_topics():
    """Import Medical topics from CSV"""
    print("\n" + "="*100)
    print("IMPORTING MEDICAL TOPICS")
    print("="*100)
    
    # First check if table exists
    url = f"{url_base}/rest/v1/blog_topics_medical"
    try:
        test_response = httpx.get(url, headers=headers, params={'limit': '1'}, timeout=30)
        if test_response.status_code == 404:
            print("\n[ERROR] blog_topics_medical table does not exist!")
            print("Action needed: Run migration first")
            print("  File: supabase/migrations/20260330184532_create_blog_topics_medical.sql")
            return 0, []
    except Exception as e:
        print(f"\n[ERROR] Cannot connect to blog_topics_medical: {e}")
        return 0, []
    
    with open('missing_topics_medical.csv', 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        topics = list(reader)
    
    print(f"\nFound {len(topics)} topics to import")
    
    imported = 0
    errors = []
    
    for i, topic in enumerate(topics, 1):
        # Map CSV columns to database columns
        data = {
            'keyword': topic['keyword'],
            'category': topic['category'],
            'priority': int(topic['priority']) if topic['priority'].isdigit() else 5,
            'search_volume': int(topic['search_volume']) if topic['search_volume'].isdigit() else None,
            'difficulty': int(topic['difficulty']) if topic['difficulty'].isdigit() else None,
            'intent': topic['intent'],
            'slug': topic['slug'],
            'status': 'pending'
        }
        
        try:
            response = httpx.post(url, headers=headers, json=data, timeout=30)
            if response.status_code in [200, 201]:
                imported += 1
                print(f"  [{i:2}/{len(topics)}] OK: {topic['title'][:60]}")
            else:
                errors.append((topic['title'], response.text))
                print(f"  [{i:2}/{len(topics)}] ERROR: {topic['title'][:60]}")
                print(f"           {response.text[:100]}")
        except Exception as e:
            errors.append((topic['title'], str(e)))
            print(f"  [{i:2}/{len(topics)}] ERROR: {topic['title'][:60]}")
            print(f"           {str(e)[:100]}")
    
    print(f"\n[RESULT] Imported {imported}/{len(topics)} topics")
    if errors:
        print(f"[ERRORS] {len(errors)} topics failed to import")
    
    return imported, errors

# Main execution
print("\n" + "="*100)
print("SUPABASE TOPIC IMPORT TOOL")
print("="*100)

print("\nThis script will import missing topics to Supabase.")
print("Make sure you've reviewed the CSV files first!")

print("\n[OPTIONS]")
print("1. Import Property topics (14 topics)")
print("2. Import Dentists topics (12 topics)")
print("3. Import Medical topics (30 topics)")
print("4. Import ALL (56 topics)")
print("5. Exit")

choice = input("\nEnter choice (1-5): ").strip()

if choice == '1':
    import_property_topics()
elif choice == '2':
    import_dentists_topics()
elif choice == '3':
    import_medical_topics()
elif choice == '4':
    print("\nImporting all topics...")
    p_count, p_errors = import_property_topics()
    d_count, d_errors = import_dentists_topics()
    m_count, m_errors = import_medical_topics()
    
    print("\n" + "="*100)
    print("IMPORT COMPLETE")
    print("="*100)
    print(f"\nProperty:  {p_count}/14 imported")
    print(f"Dentists:  {d_count}/12 imported")
    print(f"Medical:   {m_count}/30 imported")
    print(f"TOTAL:     {p_count + d_count + m_count}/56 imported")
    
    if p_errors or d_errors or m_errors:
        print(f"\n[ERRORS] {len(p_errors) + len(d_errors) + len(m_errors)} total errors")
        print("Review errors above for details")
    else:
        print("\n[SUCCESS] All topics imported successfully!")
        print("\nNext steps:")
        print("1. Run: python Property/generate_blog_supabase.py")
        print("2. Run: python Dentists/generate_blog_supabase.py")
        print("3. Run: python Medical/generate_blog_supabase.py")
        print("4. Deploy each site to Vercel")
elif choice == '5':
    print("\nExiting...")
else:
    print("\nInvalid choice. Exiting...")
