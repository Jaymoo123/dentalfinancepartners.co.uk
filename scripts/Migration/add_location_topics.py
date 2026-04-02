from dotenv import load_dotenv
import httpx
import os

load_dotenv()

# Phase 3 location topics for top UK cities
location_topics = [
    {'keyword': 'gp accountant london', 'category': 'Location-Based', 'search_volume': 280, 'difficulty': 25, 'intent': 'transactional', 'priority': 6, 'notes': 'London market'},
    {'keyword': 'gp accountant manchester', 'category': 'Location-Based', 'search_volume': 392, 'difficulty': 30, 'intent': 'transactional', 'priority': 6, 'notes': 'Manchester market'},
    {'keyword': 'gp accountant birmingham', 'category': 'Location-Based', 'search_volume': 140, 'difficulty': 25, 'intent': 'transactional', 'priority': 6, 'notes': 'Birmingham market'},
    {'keyword': 'gp accountant leeds', 'category': 'Location-Based', 'search_volume': 392, 'difficulty': 30, 'intent': 'transactional', 'priority': 6, 'notes': 'Leeds market'},
    {'keyword': 'gp accountant bristol', 'category': 'Location-Based', 'search_volume': 392, 'difficulty': 30, 'intent': 'transactional', 'priority': 6, 'notes': 'Bristol market'},
    {'keyword': 'gp accountant edinburgh', 'category': 'Location-Based', 'search_volume': 392, 'difficulty': 30, 'intent': 'transactional', 'priority': 6, 'notes': 'Edinburgh market'},
    {'keyword': 'gp accountant glasgow', 'category': 'Location-Based', 'search_volume': 140, 'difficulty': 25, 'intent': 'transactional', 'priority': 6, 'notes': 'Glasgow market'},
    {'keyword': 'gp accountant newcastle', 'category': 'Location-Based', 'search_volume': 140, 'difficulty': 25, 'intent': 'transactional', 'priority': 6, 'notes': 'Newcastle market'},
    {'keyword': 'gp accountant sheffield', 'category': 'Location-Based', 'search_volume': 392, 'difficulty': 30, 'intent': 'transactional', 'priority': 6, 'notes': 'Sheffield market'},
    {'keyword': 'gp accountant liverpool', 'category': 'Location-Based', 'search_volume': 140, 'difficulty': 25, 'intent': 'transactional', 'priority': 6, 'notes': 'Liverpool market'},
]

url = f'{os.getenv('SUPABASE_URL')}/rest/v1/blog_topics_medical'
headers = {
    'apikey': os.getenv('SUPABASE_KEY'),
    'Authorization': f'Bearer {os.getenv('SUPABASE_KEY')}',
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal'
}

print(f'Adding {len(location_topics)} location topics...')
response = httpx.post(url, headers=headers, json=location_topics, timeout=30)

if response.status_code in [200, 201]:
    print(f'SUCCESS: Added {len(location_topics)} location topics')
else:
    print(f'ERROR: {response.status_code}')
    print(response.text)

# Check total pending count
params = {'select': 'count', 'status': 'eq.pending'}
pending_response = httpx.get(url, headers=headers, params=params, timeout=30)
if pending_response.status_code == 200:
    pending = pending_response.json()[0]['count']
    print(f'Total pending topics now: {pending}')
