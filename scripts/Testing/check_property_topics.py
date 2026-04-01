"""Quick check for Property topics in database."""
import sys
import asyncio
sys.path.insert(0, 'agents')

from utils.supabase_client import SupabaseClient
from shared_supabase_config import SUPABASE_URL, SUPABASE_KEY

async def check():
    client = SupabaseClient(SUPABASE_URL, SUPABASE_KEY)
    
    # Check unused topics
    topics = await client.select('blog_topics_property', filters={'used': False})
    print(f'\n[OK] Unused Property topics: {len(topics)}')
    
    if topics:
        print('\nFirst 5 topics:')
        for i, t in enumerate(topics[:5]):
            print(f'  {i+1}. {t["topic"]} (priority: {t.get("priority", "N/A")})')
    else:
        print('\n[WARNING] No topics found. Need to run content_research_agent first.')
    
    # Check published content
    content = await client.select('published_content', filters={'niche': 'property'})
    print(f'\n[OK] Published Property articles: {len(content)}')
    
    if content:
        print('\nRecent articles:')
        for i, c in enumerate(content[:5]):
            status = c.get('deployment_status', 'unknown')
            print(f'  {i+1}. {c["slug"]} ({status})')

asyncio.run(check())
