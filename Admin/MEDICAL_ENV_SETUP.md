# Medical Site Environment Variables Setup

**Date:** 31 March 2026  
**Status:** ⚠️ ACTION REQUIRED

---

## Issue Found

The Medical contact form shows "This form is not connected yet" because the production deployment is missing Supabase environment variables.

---

## Local Development - FIXED ✅

Created `Medical/web/.env.local` with:

```env
NEXT_PUBLIC_SITE_URL=https://www.medicalaccounts.co.uk
NEXT_PUBLIC_SUPABASE_URL=https://dhlxwmvmkrfnmcgjbntk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRobHh3bXZta3Jmbm1jZ2pibnRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0ODM0NjMsImV4cCI6MjA3NDA1OTQ2M30.hwUgd2x91wFqX8HKENztrXtGkabR21LPKhC-oxzuOA8
```

**Local dev server will now accept form submissions.**

---

## Production Deployment - NEEDS SETUP ⚠️

### Add Environment Variables to Vercel

**Project:** `medical-accounts-uk` (or whatever you named it)

**Steps:**

1. Go to Vercel Dashboard: https://vercel.com/dashboard
2. Select the Medical project
3. Go to **Settings** → **Environment Variables**
4. Add these 3 variables:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `NEXT_PUBLIC_SITE_URL` | `https://www.medicalaccounts.co.uk` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://dhlxwmvmkrfnmcgjbntk.supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRobHh3bXZta3Jmbm1jZ2pibnRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0ODM0NjMsImV4cCI6MjA3NDA1OTQ2M30.hwUgd2x91wFqX8HKENztrXtGkabR21LPKhC-oxzuOA8` | Production, Preview, Development |

5. **Redeploy** the site (Vercel → Deployments → Click "..." → Redeploy)

---

## Why This Happened

When we deployed Medical, we didn't copy the `.env.local` file (which is correct - it's gitignored). But we also didn't add the environment variables to Vercel's project settings.

Property and Dentists work because their Vercel projects already have these variables configured.

---

## Verification

After adding the variables and redeploying:

1. Visit https://www.medicalaccounts.co.uk/contact
2. Fill out the form
3. Submit
4. Should redirect to `/thank-you` page
5. Check Supabase: `SELECT * FROM leads WHERE source = 'medical' ORDER BY created_at DESC;`

---

## Quick Reference

**Supabase Project:** `dhlxwmvmkrfnmcgjbntk`  
**Anon Key:** Safe to expose (RLS-protected, read-only for public)  
**Service Role Key:** In root `.env` file (never expose to frontend)

---

## Next Steps

1. Add environment variables to Vercel (see steps above)
2. Redeploy Medical site
3. Test form submission
4. Verify lead appears in Supabase with `source='medical'`
