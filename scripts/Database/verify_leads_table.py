"""
Verify Leads Table Configuration
Checks that Medical source is accepted and shows recent leads by source
"""

from dotenv import load_dotenv
import httpx
import os
from datetime import datetime

load_dotenv()

url_base = os.getenv('SUPABASE_URL')
key = os.getenv('SUPABASE_KEY')

headers = {
    'apikey': key,
    'Authorization': f'Bearer {key}',
    'Content-Type': 'application/json',
}

print("\n" + "="*80)
print("LEADS TABLE VERIFICATION")
print("="*80)

print("\n[1] Testing Medical lead submission...")

test_lead = {
    'full_name': 'Dr Test Medical',
    'email': 'test-medical@example.com',
    'phone': '07700 900001',
    'role': 'GP (partner)',
    'practice_name': '—',
    'message': 'Verification test for Medical site',
    'source': 'medical',
    'source_url': 'https://www.medicalaccounts.co.uk/contact',
    'submitted_at': datetime.utcnow().isoformat() + 'Z'
}

try:
    response = httpx.post(
        f"{url_base}/rest/v1/leads",
        headers=headers,
        json=test_lead,
        timeout=30
    )
    
    if response.status_code in [200, 201]:
        print("  SUCCESS - Medical source is accepted!")
    else:
        print(f"  FAILED: {response.status_code}")
        print(f"  Error: {response.text}")
        exit(1)
        
except Exception as e:
    print(f"  ERROR: {e}")
    exit(1)

print("\n[2] Fetching lead counts by source...")

try:
    # Get all leads grouped by source
    response = httpx.get(
        f"{url_base}/rest/v1/leads?select=source",
        headers=headers,
        timeout=30
    )
    
    if response.status_code == 200:
        leads = response.json()
        sources = {}
        for lead in leads:
            src = lead.get('source', 'unknown')
            sources[src] = sources.get(src, 0) + 1
        
        print("\n  Lead counts by source:")
        for src, count in sorted(sources.items()):
            print(f"    {src}: {count}")
    
except Exception as e:
    print(f"  Error fetching counts: {e}")

print("\n[3] Cleaning up test lead...")

try:
    delete_response = httpx.delete(
        f"{url_base}/rest/v1/leads?email=eq.test-medical@example.com",
        headers=headers,
        timeout=30
    )
    if delete_response.status_code in [200, 204]:
        print("  Test lead removed")
except Exception as e:
    print(f"  Warning: {e}")

print("\n" + "="*80)
print("VERIFICATION COMPLETE")
print("="*80)
print("\nMedical lead forms are ready to accept submissions!")
print("All leads will be stored in the 'leads' table with source='medical'")
print("\n")
