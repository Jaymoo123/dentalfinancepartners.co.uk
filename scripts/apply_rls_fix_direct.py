"""
Apply RLS Policy Fix Directly via Supabase API
Uses service role key to execute DDL commands
"""

from dotenv import load_dotenv
import httpx
import os

load_dotenv()

url_base = os.getenv('SUPABASE_URL')
service_key = os.getenv('SUPABASE_KEY')
anon_key = os.getenv('NEXT_PUBLIC_SUPABASE_ANON_KEY')

service_headers = {
    'apikey': service_key,
    'Authorization': f'Bearer {service_key}',
    'Content-Type': 'application/json',
}

print("\n" + "="*80)
print("APPLYING RLS POLICY FIX - DIRECT EXECUTION")
print("="*80)

# Read migration file
with open('supabase/migrations/20260331000002_fix_leads_rls_policies.sql', 'r') as f:
    migration_sql = f.read()

# Extract just the SQL commands (skip comments)
sql_lines = []
for line in migration_sql.split('\n'):
    line = line.strip()
    if line and not line.startswith('--'):
        sql_lines.append(line)

# Split into individual statements
statements = []
current = []
for line in sql_lines:
    current.append(line)
    if line.endswith(';'):
        statements.append(' '.join(current))
        current = []

print(f"\n[STEP 1] Parsed {len(statements)} SQL statements from migration")

print("\n[STEP 2] Executing statements via Supabase RPC...")

# Use Supabase's query endpoint
executed = 0
failed = 0

for i, stmt in enumerate(statements, 1):
    # Skip empty statements
    if not stmt.strip() or stmt.strip() == ';':
        continue
    
    print(f"\n  [{i}/{len(statements)}] Executing...")
    print(f"    {stmt[:80]}...")
    
    try:
        # Use PostgREST's rpc endpoint to execute raw SQL
        response = httpx.post(
            f"{url_base}/rest/v1/rpc/exec_sql",
            headers=service_headers,
            json={'query': stmt},
            timeout=30
        )
        
        if response.status_code in [200, 201, 204]:
            print(f"    SUCCESS")
            executed += 1
        else:
            print(f"    FAILED: {response.status_code}")
            print(f"    {response.text[:100]}")
            failed += 1
            
    except Exception as e:
        # RPC might not exist, try alternative approach
        print(f"    RPC not available, trying alternative method...")
        failed += 1

print("\n" + "="*80)
print("EXECUTION SUMMARY")
print("="*80)
print(f"\nExecuted: {executed}/{len(statements)}")
print(f"Failed: {failed}/{len(statements)}")

if failed > 0:
    print("\n[ALTERNATIVE] Manual application required:")
    print("\n  1. Go to: https://supabase.com/dashboard/project/dhlxwmvmkrfnmcgjbntk/sql")
    print("  2. Paste contents of: supabase/migrations/20260331000002_fix_leads_rls_policies.sql")
    print("  3. Click 'Run'")

print("\n[STEP 3] Testing policies after fix...")

# Test with anon key
anon_headers = {
    'apikey': anon_key,
    'Authorization': f'Bearer {anon_key}',
    'Content-Type': 'application/json',
}

# Test INSERT (should work)
print("\n  Test 1: INSERT with anon key...")
test_lead = {
    'full_name': 'Policy Test',
    'email': 'policy-test@example.com',
    'phone': '07700 900003',
    'role': 'Test',
    'source': 'medical',
}

try:
    response = httpx.post(
        f"{url_base}/rest/v1/leads",
        headers=anon_headers,
        json=test_lead,
        timeout=30
    )
    if response.status_code in [200, 201]:
        print("    PASS - Can insert")
    else:
        print(f"    FAIL - Cannot insert: {response.status_code}")
except Exception as e:
    print(f"    ERROR: {e}")

# Test SELECT (should fail)
print("\n  Test 2: SELECT with anon key...")
try:
    response = httpx.get(
        f"{url_base}/rest/v1/leads?select=*&limit=1",
        headers=anon_headers,
        timeout=30
    )
    data = response.json() if response.status_code == 200 else []
    if len(data) == 0:
        print("    PASS - Cannot read (correct)")
    else:
        print(f"    FAIL - Can read {len(data)} leads (SECURITY ISSUE)")
except Exception as e:
    print(f"    ERROR: {e}")

# Test UPDATE (should fail)
print("\n  Test 3: UPDATE with anon key...")
try:
    response = httpx.patch(
        f"{url_base}/rest/v1/leads?email=eq.policy-test@example.com",
        headers=anon_headers,
        json={'full_name': 'Hacked'},
        timeout=30
    )
    if response.status_code in [200, 204]:
        print("    FAIL - Can update (SECURITY ISSUE)")
    else:
        print(f"    PASS - Cannot update (correct)")
except Exception as e:
    print(f"    ERROR: {e}")

# Test DELETE (should fail)
print("\n  Test 4: DELETE with anon key...")
try:
    response = httpx.delete(
        f"{url_base}/rest/v1/leads?email=eq.policy-test@example.com",
        headers=anon_headers,
        timeout=30
    )
    if response.status_code in [200, 204]:
        print("    FAIL - Can delete (SECURITY ISSUE)")
    else:
        print(f"    PASS - Cannot delete (correct)")
except Exception as e:
    print(f"    ERROR: {e}")

# Cleanup with service key
print("\n[CLEANUP] Removing test lead...")
try:
    response = httpx.delete(
        f"{url_base}/rest/v1/leads?email=eq.policy-test@example.com",
        headers=service_headers,
        timeout=30
    )
    if response.status_code in [200, 204]:
        print("  Test lead removed")
except Exception as e:
    print(f"  Warning: {e}")

print("\n" + "="*80)
print("NEXT STEPS")
print("="*80)
print("\n1. Apply the migration manually (see instructions above)")
print("2. Run: python Scripts/check_rls_policies.py")
print("3. All 4 tests should PASS")
print("4. Then add environment variables to Vercel")
print("\n")
