from dotenv import load_dotenv
import httpx
import os

load_dotenv()

# Phase 2 specialized topics
specialized_topics = [
    # NHS Pension Planning (Critical Pain Point)
    {'keyword': 'nhs pension annual allowance complete guide', 'category': 'NHS Pension Planning', 'search_volume': 800, 'difficulty': 45, 'intent': 'informational', 'priority': 4, 'notes': 'Core NHS pension content'},
    {'keyword': 'nhs pension tapered annual allowance calculator', 'category': 'NHS Pension Planning', 'search_volume': 600, 'difficulty': 42, 'intent': 'transactional', 'priority': 4, 'notes': 'High-value calculator guide'},
    {'keyword': 'nhs pension tax charges how to minimize', 'category': 'NHS Pension Planning', 'search_volume': 500, 'difficulty': 40, 'intent': 'transactional', 'priority': 4, 'notes': 'Tax planning content'},
    {'keyword': 'gp pension contributions tax relief', 'category': 'NHS Pension Planning', 'search_volume': 450, 'difficulty': 38, 'intent': 'informational', 'priority': 4, 'notes': 'Pension optimization'},
    {'keyword': 'nhs pension for locums form a form b', 'category': 'NHS Pension Planning', 'search_volume': 400, 'difficulty': 35, 'intent': 'informational', 'priority': 4, 'notes': 'Locum-specific pension'},
    
    # Locum Doctor Taxation (High Search Volume)
    {'keyword': 'locum doctor tax complete guide', 'category': 'Locum Tax', 'search_volume': 900, 'difficulty': 48, 'intent': 'informational', 'priority': 4, 'notes': 'Pillar locum content'},
    {'keyword': 'locum doctor self assessment filing guide', 'category': 'Locum Tax', 'search_volume': 700, 'difficulty': 42, 'intent': 'transactional', 'priority': 4, 'notes': 'Tax filing guide'},
    {'keyword': 'locum doctor ir35 what you need to know', 'category': 'Locum Tax', 'search_volume': 650, 'difficulty': 45, 'intent': 'informational', 'priority': 4, 'notes': 'IR35 critical topic'},
    {'keyword': 'locum doctor limited company pros and cons', 'category': 'Locum Tax', 'search_volume': 550, 'difficulty': 40, 'intent': 'informational', 'priority': 4, 'notes': 'Structure decision'},
    {'keyword': 'locum doctor expenses what you can claim', 'category': 'Locum Tax', 'search_volume': 500, 'difficulty': 38, 'intent': 'informational', 'priority': 4, 'notes': 'Expense guide'},
    {'keyword': 'locum doctor umbrella company 2026 reforms', 'category': 'Locum Tax', 'search_volume': 450, 'difficulty': 42, 'intent': 'informational', 'priority': 4, 'notes': 'New regulations'},
    
    # GP Partnership Taxation
    {'keyword': 'gp partnership tax complete guide', 'category': 'GP Tax & Accounts', 'search_volume': 600, 'difficulty': 45, 'intent': 'informational', 'priority': 5, 'notes': 'Partnership pillar'},
    {'keyword': 'gp partner vs salaried gp tax comparison', 'category': 'GP Tax & Accounts', 'search_volume': 500, 'difficulty': 40, 'intent': 'informational', 'priority': 5, 'notes': 'Career decision'},
    {'keyword': 'becoming a gp partner financial implications', 'category': 'GP Tax & Accounts', 'search_volume': 450, 'difficulty': 38, 'intent': 'informational', 'priority': 5, 'notes': 'Partnership buy-in'},
    {'keyword': 'gp partnership profit sharing tax planning', 'category': 'GP Tax & Accounts', 'search_volume': 400, 'difficulty': 42, 'intent': 'transactional', 'priority': 5, 'notes': 'Profit allocation'},
    
    # Private Practice and Incorporation
    {'keyword': 'private practice incorporation complete guide', 'category': 'Private Practice', 'search_volume': 700, 'difficulty': 45, 'intent': 'informational', 'priority': 5, 'notes': 'Incorporation pillar'},
    {'keyword': 'gp limited company tax benefits drawbacks', 'category': 'Private Practice', 'search_volume': 550, 'difficulty': 42, 'intent': 'informational', 'priority': 5, 'notes': 'Structure decision'},
    {'keyword': 'private practice tax nhs and private income', 'category': 'Private Practice', 'search_volume': 500, 'difficulty': 40, 'intent': 'informational', 'priority': 5, 'notes': 'Mixed income'},
    {'keyword': 'medical practice incorporation step by step', 'category': 'Private Practice', 'search_volume': 450, 'difficulty': 38, 'intent': 'transactional', 'priority': 5, 'notes': 'Process guide'},
    
    # Expenses and Deductions
    {'keyword': 'gp tax deductions complete list 2026', 'category': 'Medical Expenses', 'search_volume': 600, 'difficulty': 40, 'intent': 'informational', 'priority': 5, 'notes': 'Expense pillar'},
    {'keyword': 'medical professional expenses what is claimable', 'category': 'Medical Expenses', 'search_volume': 500, 'difficulty': 38, 'intent': 'informational', 'priority': 5, 'notes': 'GMC, BMA, indemnity'},
    {'keyword': 'gp home office expenses tax relief', 'category': 'Medical Expenses', 'search_volume': 400, 'difficulty': 35, 'intent': 'transactional', 'priority': 5, 'notes': 'Home working'},
]

url = f'{os.getenv('SUPABASE_URL')}/rest/v1/blog_topics_medical'
headers = {
    'apikey': os.getenv('SUPABASE_KEY'),
    'Authorization': f'Bearer {os.getenv('SUPABASE_KEY')}',
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal'
}

print(f'Adding {len(specialized_topics)} specialized topics...')
response = httpx.post(url, headers=headers, json=specialized_topics, timeout=30)

if response.status_code in [200, 201]:
    print(f'SUCCESS: Added {len(specialized_topics)} specialized topics')
else:
    print(f'ERROR: {response.status_code}')
    print(response.text)

# Verify total count
params = {'select': 'count'}
verify_response = httpx.get(url, headers=headers, params=params, timeout=30)
if verify_response.status_code == 200:
    count = verify_response.json()[0]['count']
    print(f'Total topics in database: {count}')
    
# Check pending count
params = {'select': 'count', 'status': 'eq.pending'}
pending_response = httpx.get(url, headers=headers, params=params, timeout=30)
if pending_response.status_code == 200:
    pending = pending_response.json()[0]['count']
    print(f'Pending topics: {pending}')
