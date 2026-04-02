"""
Apply Medical Migration to Supabase
Updates leads table constraint to accept 'medical' source
"""

from dotenv import load_dotenv
import httpx
import os

load_dotenv()

url_base = os.getenv('SUPABASE_URL')
key = os.getenv('SUPABASE_KEY')

if not url_base or not key:
    print("ERROR: SUPABASE_URL or SUPABASE_KEY not found in .env")
    exit(1)

headers = {
    'apikey': key,
    'Authorization': f'Bearer {key}',
    'Content-Type': 'application/json',
}

print("\n" + "="*80)
print("APPLYING MEDICAL MIGRATION TO SUPABASE")
print("="*80)

# Read the migration file
with open('supabase/migrations/20260331000001_add_medical_to_leads_source.sql', 'r') as f:
    migration_sql = f.read()

# Extract just the ALTER TABLE commands (skip comments and verification queries)
sql_commands = []
for line in migration_sql.split('\n'):
    line = line.strip()
    if line and not line.startswith('--') and not line.startswith('SELECT'):
        sql_commands.append(line)

# Combine into executable SQL
executable_sql = ' '.join(sql_commands)

print("\n[STEP 1] Checking current constraint...")

# Check current constraint
check_sql = """
SELECT conname, pg_get_constraintdef(oid) 
FROM pg_constraint 
WHERE conname = 'leads_source_valid';
"""

try:
    # Use Supabase REST API to execute SQL via rpc or direct query
    # Note: This requires a custom RPC function or using PostgREST's query parameter
    print("  Current constraint check requires manual verification")
    print("  Expected: CHECK (source IN ('dentists', 'property'))")
except Exception as e:
    print(f"  Warning: {e}")

print("\n[STEP 2] Applying migration...")
print("\n  SQL to execute:")
print("  " + "-"*76)
print("  ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_source_valid;")
print("  ALTER TABLE leads ADD CONSTRAINT leads_source_valid")
print("    CHECK (source IN ('dentists', 'property', 'medical') OR source IS NULL);")
print("  " + "-"*76)

# For PostgreSQL DDL, we need to use Supabase's SQL endpoint or CLI
# The REST API doesn't support DDL directly
print("\n  WARNING: DDL commands require Supabase Dashboard or CLI")
print("\n[OPTION 1] Via Supabase Dashboard:")
print("  1. Go to: https://supabase.com/dashboard/project/dhlxwmvmkrfnmcgjbntk/sql")
print("  2. Paste the SQL above")
print("  3. Click 'Run'")

print("\n[OPTION 2] Via Supabase CLI:")
print("  supabase db push")

print("\n[STEP 3] Testing with sample lead...")

# Test by attempting to insert a medical lead
test_lead = {
    'full_name': 'Test Doctor',
    'email': 'test@example.com',
    'phone': '07700 900000',
    'role': 'GP (partner)',
    'practice_name': '—',
    'message': 'Test submission from Medical site',
    'source': 'medical',
    'source_url': 'https://www.medicalaccounts.co.uk/contact',
    'submitted_at': '2026-03-31T12:00:00Z'
}

print("\n  Attempting to insert test lead with source='medical'...")

try:
    response = httpx.post(
        f"{url_base}/rest/v1/leads",
        headers=headers,
        json=test_lead,
        timeout=30
    )
    
    if response.status_code in [200, 201]:
        print("  SUCCESS! Medical leads are now accepted!")
        print("  Migration has been applied successfully.")
        
        # Clean up test lead
        print("\n  Cleaning up test lead...")
        delete_response = httpx.delete(
            f"{url_base}/rest/v1/leads?email=eq.test@example.com",
            headers=headers,
            timeout=30
        )
        if delete_response.status_code in [200, 204]:
            print("  Test lead removed")
    else:
        print(f"  FAILED: {response.status_code}")
        print(f"  Response: {response.text}")
        print("\n  This means the migration has NOT been applied yet.")
        print("  Please apply it manually using one of the options above.")
        
except Exception as e:
    print(f"  ERROR: {e}")
    print("\n  This likely means the migration has NOT been applied yet.")

print("\n" + "="*80)
print("MIGRATION STATUS")
print("="*80)
print("\nIf you see 'SUCCESS' above, the migration is complete.")
print("If you see 'FAILED', please apply the migration manually.")
print("\n")
