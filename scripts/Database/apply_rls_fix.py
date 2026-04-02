"""
Apply RLS Policy Fix to Leads Table
Restricts anon key to INSERT only (no read/update/delete)
"""

from dotenv import load_dotenv
import httpx
import os

load_dotenv()

url_base = os.getenv('SUPABASE_URL')
service_key = os.getenv('SUPABASE_KEY')
anon_key = os.getenv('NEXT_PUBLIC_SUPABASE_ANON_KEY')

print("\n" + "="*80)
print("APPLYING RLS POLICY FIX TO LEADS TABLE")
print("="*80)

print("\n[CRITICAL] Security issue detected:")
print("  - Anon key can currently UPDATE and DELETE leads")
print("  - This needs to be fixed immediately")

print("\n[STEP 1] Reading migration file...")

with open('supabase/migrations/20260331000002_fix_leads_rls_policies.sql', 'r') as f:
    migration_sql = f.read()

print("  Migration loaded: 20260331000002_fix_leads_rls_policies.sql")

print("\n[STEP 2] This migration will:")
print("  - Drop all existing policies on leads table")
print("  - Create new policy: anon can ONLY INSERT")
print("  - Create new policy: anon CANNOT SELECT")
print("  - Create new policy: anon CANNOT UPDATE")
print("  - Create new policy: anon CANNOT DELETE")
print("  - Keep authenticated and service_role access intact")

print("\n[STEP 3] Apply this migration via Supabase Dashboard:")
print("\n  1. Go to: https://supabase.com/dashboard/project/dhlxwmvmkrfnmcgjbntk/sql")
print("  2. Copy the entire contents of:")
print("     supabase/migrations/20260331000002_fix_leads_rls_policies.sql")
print("  3. Paste into SQL Editor")
print("  4. Click 'Run'")

print("\n[STEP 4] After applying, run verification:")
print("  python Scripts/check_rls_policies.py")

print("\n" + "="*80)
print("IMPORTANT")
print("="*80)
print("\nThis is a CRITICAL security fix.")
print("Apply this migration NOW before the Medical site goes live.")
print("\nWithout this fix, anyone with the anon key could:")
print("  - Read all lead data (privacy breach)")
print("  - Modify lead data (data integrity issue)")
print("  - Delete leads (data loss)")
print("\n")
