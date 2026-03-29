# Property Lead Form Fix - Comprehensive Diagnostic Plan

**Date**: 2026-03-29  
**Status**: DIAGNOSTIC PHASE - DO NOT IMPLEMENT YET

## Problem Statement

The Property Tax Partners lead form is not working after deployment to Vercel, despite appearing to be configured correctly. The user has requested a comprehensive plan to ensure 100% certainty before implementation.

---

## Root Cause Analysis

### Issue #1: CRITICAL - Wrong Vercel Project Linked
**Location**: `Property/web/.vercel/project.json`  
**Current State**:
```json
{"projectId":"prj_f3tGDR4zozATcYOSLMmCqO2ZInNV","orgId":"team_XF9WAygZX7SGk9Fo4tOAnihH","projectName":"web"}
```

**Problem**: The `.vercel` folder in `Property/web` is linked to the `web` project (Dentists), NOT the `property-tax-partners` project. This means:
- When we run `vercel` commands from `Property/web`, they operate on the wrong project
- The deployment is going to the wrong Vercel project
- Environment variables are being checked/set on the wrong project

**Evidence**:
- Running `vercel env ls` from `Property/web` shows variables for `sitenudge-projects/web` (Dentists)
- The `projectName` is `"web"` instead of `"property-tax-partners"`

### Issue #2: Missing Environment Variables in property-tax-partners Project
**Location**: Vercel Dashboard → property-tax-partners → Settings → Environment Variables  
**Expected Variables**:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL` (should be `https://propertytaxpartners.co.uk`)

**Current State**: UNKNOWN - we've been checking the wrong project's env vars

**Impact**: Without these variables, the Property site's lead form will fail at runtime with the error message:
> "Form not connected. Email us directly — we respond same day."

### Issue #3: Code Architecture Mismatch
**Location**: `Property/web/src/components/forms/LeadForm.tsx` vs `Dentists/web/src/components/forms/LeadForm.tsx`

**Property LeadForm** (lines 7, 43, 101):
- Imports: `import { submitLead, getSupabaseConfig } from "@/lib/supabase-client";`
- Uses: `const { supabaseUrl, supabaseKey } = getSupabaseConfig();`
- Submits: `const result = await submitLead(payload, supabaseUrl, supabaseKey);`

**Dentists LeadForm** (lines 44-45, 105-114):
- No imports from `@/lib/supabase-client`
- Inline: `const supabaseUrl = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_SUPABASE_URL : undefined;`
- Inline: `const supabaseKey = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY : undefined;`
- Inline fetch: Direct `fetch()` call with full implementation

**Problem**: The Property LeadForm relies on `Property/web/src/lib/supabase-client.ts`, which exists and looks correct, but this adds an extra layer of indirection that could fail if:
- The import path resolution fails during build
- The `getSupabaseConfig()` function doesn't correctly access `process.env` at runtime
- There's a build-time vs runtime environment variable access issue

### Issue #4: Supabase Table Schema Verification Needed
**Location**: Supabase `leads` table  
**Required Columns**:
- `full_name` (text)
- `email` (text)
- `phone` (text)
- `role` (text)
- `practice_name` (text)
- `message` (text)
- `source` (text) ← **Added recently, needs verification**
- `source_url` (text)
- `submitted_at` (timestamp)

**Status**: The `source` column was added in the previous session, but we need to verify:
- Column exists and accepts text values
- No constraints that would reject `source: 'property'`
- RLS (Row Level Security) policies allow inserts with `source: 'property'`

---

## Comprehensive Fix Plan

### Phase 1: Verify Current State (READ-ONLY)

#### 1.1 Verify Supabase Table Schema
**Action**: Query Supabase to confirm `leads` table structure
**Command**: Use Supabase MCP tool to describe the `leads` table schema
**Success Criteria**: 
- `source` column exists with type `TEXT`
- No NOT NULL constraints on optional fields
- All required columns present

#### 1.2 Check Supabase RLS Policies
**Action**: Query RLS policies on `leads` table
**Command**: Use Supabase MCP tool to list policies
**Success Criteria**: 
- INSERT policy allows anonymous inserts (anon key can write)
- No policies that filter by `source` column

#### 1.3 Verify property-tax-partners Vercel Environment Variables
**Action**: Check env vars in the CORRECT Vercel project
**Method**: 
- Option A: Use Vercel dashboard UI directly (manual verification)
- Option B: Link `Property/web` to correct project first, then run `vercel env ls`
**Success Criteria**: 
- `NEXT_PUBLIC_SUPABASE_URL` = `https://dhlxwmvmkrfnmcgjbntk.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (correct anon key)
- `NEXT_PUBLIC_SITE_URL` = `https://propertytaxpartners.co.uk`
- All set for Production, Preview, and Development environments

#### 1.4 Test Local Property Site
**Action**: Run Property site locally and test lead form submission
**Commands**:
```bash
cd Property/web
npm run dev
# Open http://localhost:3000/contact
# Submit test lead form
# Check Supabase leads table for new entry with source='property'
```
**Success Criteria**: 
- Form submits successfully
- Lead appears in Supabase `leads` table
- `source` field = `'property'`
- No console errors

### Phase 2: Fix Vercel Project Linking

#### 2.1 Unlink Property/web from Wrong Project
**Action**: Remove incorrect `.vercel` folder
**Command**: `Remove-Item -Recurse -Force Property/web/.vercel`
**Rationale**: This folder links to the `web` (Dentists) project, causing all confusion

#### 2.2 Link Property/web to Correct Project
**Action**: Link to `property-tax-partners` project
**Command**: `vercel link --project property-tax-partners --scope sitenudge-projects`
**Working Directory**: `Property/web`
**Success Criteria**: 
- New `.vercel/project.json` created
- `projectName` = `"property-tax-partners"`
- Correct `projectId` for property-tax-partners

### Phase 3: Configure Environment Variables

#### 3.1 Set Production Environment Variables
**Action**: Add env vars to property-tax-partners project
**Commands**:
```bash
cd Property/web
vercel env add NEXT_PUBLIC_SUPABASE_URL production
# Enter: https://dhlxwmvmkrfnmcgjbntk.supabase.co

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
# Enter: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRobHh3bXZta3Jmbm1jZ2pibnRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0ODM0NjMsImV4cCI6MjA3NDA1OTQ2M30.hwUgd2x91wFqX8HKENztrXtGkabR21LPKhC-oxzuOA8

vercel env add NEXT_PUBLIC_SITE_URL production
# Enter: https://propertytaxpartners.co.uk
```

#### 3.2 Set Preview Environment Variables
**Action**: Add same env vars for preview deployments
**Commands**: Same as 3.1, but replace `production` with `preview`

#### 3.3 Set Development Environment Variables
**Action**: Add same env vars for development
**Commands**: Same as 3.1, but replace `production` with `development`

**Note**: Vercel requires env vars to be set for each environment separately.

### Phase 4: Code Verification (Optional - Only if Phase 1.4 fails)

#### 4.1 Simplify Property LeadForm to Match Dentists
**Rationale**: The Dentists LeadForm uses inline env var access and inline fetch, which is proven to work. The Property LeadForm uses imported functions, which adds complexity.

**Action**: Replace Property LeadForm implementation to match Dentists approach
**File**: `Property/web/src/components/forms/LeadForm.tsx`
**Changes**:
- Remove imports: `import { submitLead, getSupabaseConfig } from "@/lib/supabase-client";`
- Replace `getSupabaseConfig()` with inline env var access (lines 44-45 from Dentists)
- Replace `submitLead()` call with inline fetch (lines 105-141 from Dentists)

**Trade-off**: This duplicates code but eliminates a potential failure point. The shared `supabase-client.ts` can remain for future use or other components.

### Phase 5: Deploy and Verify

#### 5.1 Trigger Redeployment
**Action**: Push to trigger new deployment
**Commands**:
```bash
git add -A
git commit --allow-empty -m "Fix Property lead form: correct Vercel project and env vars"
git push origin main
```

#### 5.2 Monitor Deployment
**Action**: Watch deployment logs in Vercel dashboard
**URL**: https://vercel.com/sitenudge-projects/property-tax-partners/deployments
**Success Criteria**: 
- Build completes without errors
- No missing env var warnings
- Deployment status = "Ready"

#### 5.3 Test Live Form
**Action**: Submit test lead on production site
**URL**: https://propertytaxpartners.co.uk/contact
**Test Data**:
- Name: Test Property Lead
- Email: test@propertytaxpartners.co.uk
- Phone: 07700 900123
- Role: Individual landlord
- Message: Test submission from Property site

**Verification**:
1. Form submits without errors
2. Success message appears or redirects to /thank-you
3. Check Supabase `leads` table:
   - New row exists
   - `source` = `'property'`
   - `source_url` contains `propertytaxpartners.co.uk`
   - All fields populated correctly

---

## Decision Tree

```
START
  |
  ├─> Phase 1.1: Check Supabase schema
  |     ├─> FAIL: source column missing → Add column → Retry
  |     └─> PASS: Continue
  |
  ├─> Phase 1.2: Check RLS policies
  |     ├─> FAIL: Policies block inserts → Fix policies → Retry
  |     └─> PASS: Continue
  |
  ├─> Phase 1.4: Test local form submission
  |     ├─> FAIL: Form doesn't work locally
  |     |     └─> Execute Phase 4.1 (simplify code) → Retry local test
  |     └─> PASS: Code is correct, issue is deployment config
  |
  ├─> Phase 2: Fix Vercel project linking
  |     └─> Unlink + Relink to property-tax-partners
  |
  ├─> Phase 3: Set environment variables
  |     └─> Add all env vars to all environments
  |
  ├─> Phase 5: Deploy and test
  |     ├─> FAIL: Build errors → Debug → Fix → Retry
  |     ├─> FAIL: Form doesn't work → Check browser console → Debug → Fix
  |     └─> PASS: Form works, lead in database
  |
END (SUCCESS)
```

---

## Risk Assessment

### High Risk
- **Vercel project linking**: If we link incorrectly, we could affect the Dentists deployment
  - **Mitigation**: Always verify `projectName` in `.vercel/project.json` after linking
  - **Rollback**: Delete `.vercel` folder and relink

### Medium Risk
- **Environment variables**: If we set them on the wrong project, they won't work
  - **Mitigation**: Always run `vercel env ls` after setting to confirm
  - **Rollback**: Remove incorrect env vars with `vercel env rm`

### Low Risk
- **Code changes**: The Property LeadForm code looks correct
  - **Mitigation**: Test locally first (Phase 1.4)
  - **Rollback**: Git revert if needed

---

## Pre-Implementation Checklist

Before executing this plan, confirm:

- [ ] User has reviewed and approved this plan
- [ ] We have access to Vercel CLI and it's authenticated
- [ ] We have access to Supabase (via MCP or direct)
- [ ] Local development environment works (`npm run dev` in Property/web)
- [ ] Git working directory is clean (or changes are committed)
- [ ] Dentists site is currently working (verify at dentalfinancepartners.co.uk/contact)

---

## Success Criteria

The fix is complete when ALL of the following are true:

1. ✅ Supabase `leads` table has `source` column (TEXT)
2. ✅ RLS policies allow anonymous inserts to `leads` table
3. ✅ `Property/web/.vercel/project.json` links to `property-tax-partners` project
4. ✅ property-tax-partners Vercel project has all 3 env vars set (Production, Preview, Development)
5. ✅ Property site deploys successfully on Vercel
6. ✅ Test lead submission on https://propertytaxpartners.co.uk/contact succeeds
7. ✅ Test lead appears in Supabase `leads` table with `source='property'`
8. ✅ Dentists site remains unaffected and functional

---

## Estimated Steps: 15-20 tool calls

**Phase 1**: 5-8 tool calls (Supabase checks, local test)  
**Phase 2**: 2 tool calls (unlink, relink)  
**Phase 3**: 9 tool calls (3 env vars × 3 environments)  
**Phase 5**: 3-5 tool calls (deploy, monitor, verify)

---

## Next Action

**AWAITING USER APPROVAL**

Once approved, we will:
1. Execute Phase 1 (verification) first
2. Report findings
3. Execute Phases 2-5 sequentially
4. Verify success with live test

**User**: Please review this plan. If you approve, I will execute it step-by-step with full verification at each stage.
