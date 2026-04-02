"""
Detailed RLS Test with Full Response Logging
"""

from dotenv import load_dotenv
import httpx
import os
import json

load_dotenv()

url_base = os.getenv('SUPABASE_URL')
anon_key = os.getenv('NEXT_PUBLIC_SUPABASE_ANON_KEY')
service_key = os.getenv('SUPABASE_KEY')

anon_headers = {
    'apikey': anon_key,
    'Authorization': f'Bearer {anon_key}',
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
}

service_headers = {
    'apikey': service_key,
    'Authorization': f'Bearer {service_key}',
    'Content-Type': 'application/json',
}

print("\n" + "="*80)
print("DETAILED RLS POLICY TEST")
print("="*80)

# First insert a test lead with service key
print("\n[SETUP] Inserting test lead with service key...")
test_lead = {
    'full_name': 'RLS Detailed Test',
    'email': 'rls-detailed-test@example.com',
    'phone': '07700 900999',
    'role': 'Test',
    'source': 'medical',
}

response = httpx.post(
    f"{url_base}/rest/v1/leads",
    headers=service_headers,
    json=test_lead,
    timeout=30
)
print(f"  Status: {response.status_code}")

# Test UPDATE with anon key
print("\n[TEST] UPDATE with anon key...")
print("  Attempting to update full_name...")

response = httpx.patch(
    f"{url_base}/rest/v1/leads?email=eq.rls-detailed-test@example.com",
    headers=anon_headers,
    json={'full_name': 'Hacked Name'},
    timeout=30
)

print(f"  Status Code: {response.status_code}")
print(f"  Response Headers: {dict(response.headers)}")
print(f"  Response Body: {response.text}")

try:
    data = response.json()
    print(f"  JSON Data: {json.dumps(data, indent=2)}")
except:
    pass

if response.status_code in [200, 204]:
    print("\n  RESULT: FAILED - Anon can UPDATE")
elif response.status_code in [401, 403]:
    print("\n  RESULT: PASS - Update blocked by auth")
elif response.status_code == 400:
    print("\n  RESULT: PASS - Update blocked by RLS")
else:
    print(f"\n  RESULT: UNKNOWN - Status {response.status_code}")

# Test DELETE with anon key
print("\n[TEST] DELETE with anon key...")
print("  Attempting to delete lead...")

response = httpx.delete(
    f"{url_base}/rest/v1/leads?email=eq.rls-detailed-test@example.com",
    headers=anon_headers,
    timeout=30
)

print(f"  Status Code: {response.status_code}")
print(f"  Response Body: {response.text}")

if response.status_code in [200, 204]:
    print("\n  RESULT: FAILED - Anon can DELETE")
elif response.status_code in [401, 403]:
    print("\n  RESULT: PASS - Delete blocked by auth")
elif response.status_code == 400:
    print("\n  RESULT: PASS - Delete blocked by RLS")
else:
    print(f"\n  RESULT: UNKNOWN - Status {response.status_code}")

# Cleanup
print("\n[CLEANUP] Removing test lead with service key...")
response = httpx.delete(
    f"{url_base}/rest/v1/leads?email=eq.rls-detailed-test@example.com",
    headers=service_headers,
    timeout=30
)
print(f"  Status: {response.status_code}")

print("\n" + "="*80)
print("\n")
