"""
Check RLS Policies on Leads Table
Verifies that the anon key can only INSERT, not read/update/delete
"""

from dotenv import load_dotenv
import httpx
import os

load_dotenv()

url_base = os.getenv('SUPABASE_URL')
service_key = os.getenv('SUPABASE_KEY')
anon_key = os.getenv('NEXT_PUBLIC_SUPABASE_ANON_KEY')

print("\n" + "="*80)
print("RLS POLICY VERIFICATION FOR LEADS TABLE")
print("="*80)

# Test 1: Try to INSERT with anon key (should work)
print("\n[TEST 1] INSERT with anon key (should SUCCEED)...")

test_lead = {
    'full_name': 'RLS Test',
    'email': 'rls-test@example.com',
    'phone': '07700 900002',
    'role': 'Test',
    'practice_name': '—',
    'message': 'RLS policy test',
    'source': 'medical',
    'source_url': 'https://test.com',
}

anon_headers = {
    'apikey': anon_key,
    'Authorization': f'Bearer {anon_key}',
    'Content-Type': 'application/json',
}

try:
    response = httpx.post(
        f"{url_base}/rest/v1/leads",
        headers=anon_headers,
        json=test_lead,
        timeout=30
    )
    
    if response.status_code in [200, 201]:
        print("  PASS - Anon key CAN insert leads (correct)")
    else:
        print(f"  FAIL - Insert rejected: {response.status_code}")
        print(f"  Response: {response.text}")
        
except Exception as e:
    print(f"  ERROR: {e}")

# Test 2: Try to READ with anon key (should fail)
print("\n[TEST 2] SELECT with anon key (should FAIL)...")

try:
    response = httpx.get(
        f"{url_base}/rest/v1/leads?select=*&limit=1",
        headers=anon_headers,
        timeout=30
    )
    
    if response.status_code == 200:
        data = response.json()
        if len(data) == 0:
            print("  PASS - Anon key CANNOT read leads (correct)")
        else:
            print(f"  SECURITY ISSUE - Anon key can read {len(data)} leads!")
            print("  RLS policy may be misconfigured!")
    else:
        print(f"  PASS - Read rejected with {response.status_code} (correct)")
        
except Exception as e:
    print(f"  ERROR: {e}")

# Test 3: Try to UPDATE with anon key (should fail)
print("\n[TEST 3] UPDATE with anon key (should FAIL)...")

try:
    response = httpx.patch(
        f"{url_base}/rest/v1/leads?email=eq.rls-test@example.com",
        headers=anon_headers,
        json={'full_name': 'Updated Name'},
        timeout=30
    )
    
    if response.status_code in [200, 204]:
        print("  SECURITY ISSUE - Anon key can UPDATE leads!")
        print("  RLS policy may be misconfigured!")
    else:
        print(f"  PASS - Update rejected with {response.status_code} (correct)")
        
except Exception as e:
    print(f"  ERROR: {e}")

# Test 4: Try to DELETE with anon key (should fail)
print("\n[TEST 4] DELETE with anon key (should FAIL)...")

try:
    response = httpx.delete(
        f"{url_base}/rest/v1/leads?email=eq.rls-test@example.com",
        headers=anon_headers,
        timeout=30
    )
    
    if response.status_code in [200, 204]:
        print("  SECURITY ISSUE - Anon key can DELETE leads!")
        print("  RLS policy may be misconfigured!")
    else:
        print(f"  PASS - Delete rejected with {response.status_code} (correct)")
        
except Exception as e:
    print(f"  ERROR: {e}")

# Cleanup with service key
print("\n[CLEANUP] Removing test lead with service key...")

service_headers = {
    'apikey': service_key,
    'Authorization': f'Bearer {service_key}',
    'Content-Type': 'application/json',
}

try:
    response = httpx.delete(
        f"{url_base}/rest/v1/leads?email=eq.rls-test@example.com",
        headers=service_headers,
        timeout=30
    )
    if response.status_code in [200, 204]:
        print("  Test lead removed")
except Exception as e:
    print(f"  Warning: {e}")

print("\n" + "="*80)
print("RLS POLICY SUMMARY")
print("="*80)
print("\nExpected behavior:")
print("  - Anon key CAN insert leads (for contact forms)")
print("  - Anon key CANNOT read leads (privacy)")
print("  - Anon key CANNOT update leads (security)")
print("  - Anon key CANNOT delete leads (security)")
print("\nIf all tests passed, your RLS policies are correctly configured.")
print("\n")
