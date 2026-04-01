from dotenv import load_dotenv
import httpx
import os

load_dotenv()

url = f'{os.getenv('SUPABASE_URL')}/rest/v1/blog_topics_medical'
headers = {
    'apikey': os.getenv('SUPABASE_KEY'),
    'Authorization': f'Bearer {os.getenv('SUPABASE_KEY')}'
}
params = {'select': 'count', 'status': 'eq.pending'}
r = httpx.get(url, headers=headers, params=params, timeout=30)
print(f'Remaining pending topics: {r.json()[0]['count']}')
