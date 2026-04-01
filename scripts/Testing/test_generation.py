"""Test generation script to identify hanging issue."""
import sys
sys.path.insert(0, 'Property')

print('Step 1: Testing imports...')
try:
    from config_supabase import ANTHROPIC_API_KEY, SUPABASE_URL, SUPABASE_KEY
    print(f'  ANTHROPIC_API_KEY: {"SET" if ANTHROPIC_API_KEY else "MISSING"}')
    print(f'  SUPABASE_URL: {"SET" if SUPABASE_URL else "MISSING"}')
    print(f'  SUPABASE_KEY: {"SET" if SUPABASE_KEY else "MISSING"}')
except Exception as e:
    print(f'  Import error: {e}')
    sys.exit(1)

print('\nStep 2: Testing Supabase connection...')
try:
    import httpx
    url = f'{SUPABASE_URL}/rest/v1/blog_topics_property'
    headers = {'apikey': SUPABASE_KEY, 'Authorization': f'Bearer {SUPABASE_KEY}'}
    params = {'used': 'eq.false', 'limit': '1', 'select': 'id,topic'}
    
    print('  Making request...')
    response = httpx.get(url, headers=headers, params=params, timeout=5)
    print(f'  Response status: {response.status_code}')
    
    topics = response.json()
    print(f'  Topics found: {len(topics)}')
    if topics:
        print(f'  Next topic: {topics[0].get("topic", "N/A")[:60]}')
except Exception as e:
    print(f'  Connection error: {e}')
    sys.exit(1)

print('\nStep 3: Testing Anthropic API...')
try:
    from anthropic import Anthropic
    client = Anthropic(api_key=ANTHROPIC_API_KEY)
    print('  Client created successfully')
    
    # Test simple call
    print('  Making test API call...')
    message = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=100,
        messages=[{"role": "user", "content": "Say 'test' and nothing else"}]
    )
    print(f'  Response: {message.content[0].text}')
except Exception as e:
    print(f'  API error: {e}')
    sys.exit(1)

print('\nAll tests passed!')
