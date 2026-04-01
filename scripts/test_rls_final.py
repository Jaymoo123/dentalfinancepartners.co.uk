"""
Final RLS Test - Check if Data Actually Changes
"""

from dotenv import load_dotenv
import httpx
import os

load_dotenv()

url_base = os.getenv('SUPABASE_URL')
anon_key = os.getenv('NEXT_PUBLIC_SUPABASE_ANON_KEY')
service_key = os.getenv('SUPABASE_KEY')

anon_headers = {
    'apikey': anon_key,
    'Authorization': f'Bearer {anon_key}',
    'Content-Type': 'application/json',
}

service_headers = {
    'apikey': service_key,
    'Authorization': f'Bearer {service_key}',
    'Content-Type': 'application/json',
}

print("\n" + "="*80)
print("FINAL RLS VERIFICATION - DATA INTEGRITY TEST")
print("="*80)

# Insert test lead
print("\n[1] Insert test lead with service key...")
test_lead = {
    'full_name': 'Original Name',
    'email': 'rls-final-test@example.com',
    'phone': '07700 900888',
    'role': 'Test',
    'source': 'medical',
}

response = httpx.post(
    f"{url_base}/rest/v1/leads",
    headers=service_headers,
    json=test_lead,
    timeout=30
)
print(f"  Created: {response.status_code}")

# Read with service key to get original value
print("\n[2] Read original value with service key...")
response = httpx.get(
    f"{url_base}/rest/v1/leads?email=eq.rls-final-test@example.com&select=full_name",
    headers=service_headers,
    timeout=30
)
original_data = response.json()
print(f"  Original full_name: {original_data[0]['full_name']}")

# Try to UPDATE with anon key
print("\n[3] Attempt UPDATE with anon key...")
response = httpx.patch(
    f"{url_base}/rest/v1/leads?email=eq.rls-final-test@example.com",
    headers=anon_headers,
    json={'full_name': 'HACKED NAME'},
    timeout=30
)
print(f"  Response: {response.status_code} - {response.text}")

# Read again with service key to check if it changed
print("\n[4] Read value after UPDATE attempt...")
response = httpx.get(
    f"{url_base}/rest/v1/leads?email=eq.rls-final-test@example.com&select=full_name",
    headers=service_headers,
    timeout=30
)
after_update = response.json()
print(f"  Current full_name: {after_update[0]['full_name']}")

if after_update[0]['full_name'] == 'Original Name':
    print("  PASS - Data was NOT modified (RLS blocked it)")
else:
    print("  FAIL - Data WAS modified (RLS not working!)")

# Try to DELETE with anon key
print("\n[5] Attempt DELETE with anon key...")
response = httpx.delete(
    f"{url_base}/rest/v1/leads?email=eq.rls-final-test@example.com",
    headers=anon_headers,
    timeout=30
)
print(f"  Response: {response.status_code} - {response.text}")

# Check if record still exists
print("\n[6] Check if record still exists...")
response = httpx.get(
    f"{url_base}/rest/v1/leads?email=eq.rls-final-test@example.com&select=id",
    headers=service_headers,
    timeout=30
)
after_delete = response.json()

if len(after_delete) > 0:
    print("  PASS - Record still exists (RLS blocked DELETE)")
else:
    print("  FAIL - Record was deleted (RLS not working!)")

# Cleanup
print("\n[7] Cleanup with service key...")
response = httpx.delete(
    f"{url_base}/rest/v1/leads?email=eq.rls-final-test@example.com",
    headers=service_headers,
    timeout=30
)
print(f"  Removed: {response.status_code}")

print("\n" + "="*80)
print("FINAL VERDICT")
print("="*80)
print("\nIf both tests show PASS, then RLS is working correctly.")
print("The 200 status codes are normal - PostgREST returns 200 even when")
print("RLS blocks the operation (it just returns an empty result set).")
print("\n")
