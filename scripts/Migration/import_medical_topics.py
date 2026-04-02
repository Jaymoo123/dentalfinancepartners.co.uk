import os
import csv
import httpx
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_KEY')

csv_path = 'Admin/Topics/missing_topics_medical.csv'
print(f'Reading topics from {csv_path}...')

topics = []
with open(csv_path, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        topic = {
            'keyword': row['keyword'],
            'category': row['category'],
            'search_volume': int(row['search_volume']) if row['search_volume'] else None,
            'difficulty': int(row['difficulty']) if row['difficulty'] else None,
            'intent': row['intent'],
            'status': 'pending',
            'priority': int(row['priority']) if row['priority'] else 50,
            'notes': row.get('notes', ''),
            'slug': row.get('slug', ''),
        }
        topics.append(topic)

print(f'Found {len(topics)} topics to import')

url = f'{SUPABASE_URL}/rest/v1/blog_topics_medical'
headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': f'Bearer {SUPABASE_KEY}',
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal'
}

print('Importing topics to Supabase...')
response = httpx.post(url, headers=headers, json=topics, timeout=30)

if response.status_code in [200, 201]:
    print(f'SUCCESS: Imported {len(topics)} topics')
else:
    print(f'ERROR: {response.status_code}')
    print(response.text)

verify_params = {'select': 'count'}
verify_response = httpx.get(url, headers=headers, params=verify_params, timeout=30)
if verify_response.status_code == 200:
    count = verify_response.json()[0]['count']
    print(f'VERIFIED: {count} topics in database')
