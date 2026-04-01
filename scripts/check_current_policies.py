"""
Check Current RLS Policies on Leads Table
Shows what policies are currently active
"""

from dotenv import load_dotenv
import httpx
import os

load_dotenv()

url_base = os.getenv('SUPABASE_URL')
service_key = os.getenv('SUPABASE_KEY')

service_headers = {
    'apikey': service_key,
    'Authorization': f'Bearer {service_key}',
    'Content-Type': 'application/json',
}

print("\n" + "="*80)
print("CURRENT RLS POLICIES ON LEADS TABLE")
print("="*80)

# Query pg_policies to see current policies
query = """
SELECT 
  policyname,
  cmd,
  roles::text[],
  CASE 
    WHEN qual IS NOT NULL THEN pg_get_expr(qual, 'leads'::regclass)
    ELSE 'NULL'
  END as using_clause,
  CASE 
    WHEN with_check IS NOT NULL THEN pg_get_expr(with_check, 'leads'::regclass)
    ELSE 'NULL'
  END as with_check_clause
FROM pg_policies 
WHERE tablename = 'leads'
ORDER BY policyname;
"""

try:
    # Try to query via PostgREST
    # Note: This requires a custom RPC function or direct postgres connection
    print("\n[METHOD 1] Attempting to query pg_policies...")
    print("  (This may not work via REST API)")
    
    # Alternative: Check if RLS is enabled
    response = httpx.get(
        f"{url_base}/rest/v1/leads?select=id&limit=0",
        headers=service_headers,
        timeout=30
    )
    
    print(f"\n[METHOD 2] Testing RLS status...")
    print(f"  Service key can query leads: {response.status_code == 200}")
    
except Exception as e:
    print(f"  Error: {e}")

print("\n" + "="*80)
print("MANUAL CHECK REQUIRED")
print("="*80)
print("\nTo see current policies, run this in Supabase SQL Editor:")
print("\nSELECT policyname, cmd, roles")
print("FROM pg_policies")
print("WHERE tablename = 'leads'")
print("ORDER BY policyname;")
print("\n")
print("Expected policies after fix:")
print("  - anon_can_only_insert_leads (INSERT, anon)")
print("  - anon_cannot_select_leads (SELECT, anon)")
print("  - anon_cannot_update_leads (UPDATE, anon)")
print("  - anon_cannot_delete_leads (DELETE, anon)")
print("  - authenticated_can_read_leads (SELECT, authenticated)")
print("  - authenticated_can_update_leads (UPDATE, authenticated)")
print("  - authenticated_can_delete_leads (DELETE, authenticated)")
print("\n")
