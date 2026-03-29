# Property Lead Form - Verification Complete

**Date**: 2026-03-29  
**Status**: ✅ DEPLOYED AND CONFIGURED

---

## What Was Fixed

### Issue #1: Wrong Vercel Project Linked ✅ FIXED
**Problem**: `Property/web/.vercel/project.json` was linked to `web` (Dentists project)  
**Fix**: 
- Removed `.vercel` folder
- Relinked to `property-tax-partners` project
- Verified: `projectName` now shows `"property-tax-partners"`

### Issue #2: Missing Environment Variables ✅ FIXED
**Problem**: No environment variables set on `property-tax-partners` Vercel project  
**Fix**: Added all 3 required variables to all 3 environments:
- `NEXT_PUBLIC_SUPABASE_URL` → Production, Preview, Development
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Production, Preview, Development  
- `NEXT_PUBLIC_SITE_URL` → Production, Preview, Development

**Verification**: `vercel env ls` confirms all 9 variables are set

---

## Deployment Status

**Latest Deployment**: ✅ Ready (deployed 1 minute ago, build time: 35s)  
**URL**: https://property-tax-partners-ioui1ynbd-sitenudge-projects.vercel.app  
**Production URL**: https://propertytaxpartners.co.uk

---

## Lead Form Configuration

### Frontend (Property/web/src/components/forms/LeadForm.tsx)
- ✅ Imports `submitLead` and `getSupabaseConfig` from `@/lib/supabase-client`
- ✅ Uses `niche.content_strategy.source_identifier` for source field
- ✅ Validates all required fields
- ✅ Submits to Supabase `leads` table

### Backend (Supabase)
- ✅ `leads` table has `source` column (TEXT, nullable)
- ✅ RLS policy "Allow anonymous inserts" permits anon key to INSERT
- ✅ All required columns present: `full_name`, `email`, `phone`, `role`, `practice_name`, `message`, `source`, `source_url`, `submitted_at`

### Configuration (Property/niche.config.json)
- ✅ `content_strategy.source_identifier` = `"property"`
- ✅ Lead form role options configured for landlords
- ✅ Placeholders customized for property audience

---

## How It Works

1. User fills out form on https://propertytaxpartners.co.uk/contact
2. Form validates client-side
3. `LeadForm.tsx` calls `getSupabaseConfig()` to get env vars:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Form calls `submitLead()` with payload including:
   - `source: 'property'` (from `niche.config.json`)
   - `source_url: window.location.href`
5. `submitLead()` POSTs to Supabase REST API
6. Lead is inserted into `leads` table with `source='property'`
7. User sees success message or redirects to `/thank-you`

---

## Testing Instructions

### Manual Test (Recommended)
1. Visit: https://propertytaxpartners.co.uk/contact
2. Fill out form with test data:
   - Name: Test Property Lead
   - Email: test@propertytaxpartners.co.uk
   - Phone: 07700 900123
   - Role: Individual landlord
   - Message: Test submission
3. Submit form
4. Verify:
   - Success message appears OR redirects to `/thank-you`
   - No console errors (open browser DevTools)
5. Check Supabase:
   ```sql
   SELECT * FROM leads WHERE email = 'test@propertytaxpartners.co.uk' ORDER BY created_at DESC LIMIT 1;
   ```
   - Verify `source = 'property'`
   - Verify `source_url` contains `propertytaxpartners.co.uk`

### Expected Result
- ✅ Form submits successfully
- ✅ Lead appears in database with correct `source` value
- ✅ Dentists leads remain separate (source='dentists')

---

## Verification Checklist

- [x] Supabase `leads` table has `source` column
- [x] RLS policies allow anonymous inserts
- [x] Property/web linked to correct Vercel project (`property-tax-partners`)
- [x] All environment variables set on property-tax-partners (9 total)
- [x] Latest deployment successful (Status: Ready)
- [ ] **MANUAL TEST REQUIRED**: Submit test lead on live site
- [ ] **MANUAL TEST REQUIRED**: Verify lead in Supabase with `source='property'`

---

## Next Steps

**User Action Required**: Please test the lead form on the live site and confirm it works.

If the form works:
- ✅ Property Tax Partners is fully operational
- ✅ Lead generation system is complete for both niches
- ✅ Leads are properly tagged by source

If the form doesn't work:
- Check browser console for errors
- Verify the error message shown
- Report back for further debugging
