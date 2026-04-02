# Medical Accounts - Vercel Setup Guide
**Domain:** medicalaccounts.co.uk
**Date:** 2026-04-01

---

## Step 1: Create Vercel Project

### Option A: Via Vercel Dashboard (Recommended)
1. Go to https://vercel.com/new
2. Import your Git repository
3. Configure project:
   - **Framework Preset:** Next.js
   - **Root Directory:** `Medical/web`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`
   - **Node Version:** 18.x or 20.x

### Option B: Via Vercel CLI
```bash
cd Medical/web
vercel
# Follow prompts:
# - Link to existing project? No
# - Project name: medical-accounts
# - Directory: ./
# - Override settings? No
```

---

## Step 2: Configure Environment Variables

In Vercel dashboard → Settings → Environment Variables, add:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

(Get these from your Supabase project settings)

---

## Step 3: DNS Configuration

### At Your Domain Registrar (where you bought medicalaccounts.co.uk)

**For root domain (medicalaccounts.co.uk):**
- Type: `A`
- Name: `@`
- Value: `76.76.21.21`
- TTL: 3600

**For www subdomain (www.medicalaccounts.co.uk):**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`
- TTL: 3600

### In Vercel Dashboard

1. Go to your Medical project → Settings → Domains
2. Add domain: `medicalaccounts.co.uk`
3. Add domain: `www.medicalaccounts.co.uk`
4. Vercel will verify DNS records
5. Wait for SSL certificate (automatic, ~5 minutes)

---

## Step 4: Verify Deployment

### Check Build
1. Go to Vercel dashboard → Deployments
2. Wait for build to complete (~2-3 minutes)
3. Check for any build errors

### Test Live Site
Once deployed, test:
- https://medicalaccounts.co.uk
- https://www.medicalaccounts.co.uk

**Pages to verify:**
- Homepage (hero CTA visible?)
- /about (content expanded?)
- /services (all 6 services?)
- /contact (form working?)
- /blog (empty state showing?)
- /locations (5 cities?)
- /locations/london (schema present?)

---

## Step 5: Configure Redirects (Optional)

If you want `www` to redirect to non-www (or vice versa), Vercel handles this automatically. By default:
- Both `medicalaccounts.co.uk` and `www.medicalaccounts.co.uk` will work
- You can set a preferred domain in Vercel settings

---

## Step 6: Post-Deployment Checklist

### Immediate
- ✓ Site loads without errors
- ✓ CTA buttons visible (copper color)
- ✓ All pages accessible
- ✓ Mobile responsive
- ✓ SSL certificate active (https)

### SEO Setup
1. **Google Search Console:**
   - Add property: https://medicalaccounts.co.uk
   - Verify ownership (HTML file method or DNS)
   - Submit sitemap: https://medicalaccounts.co.uk/sitemap.xml

2. **Google Analytics:**
   - Update `niche.config.json` with real GA4 ID
   - Replace `G-MEDICAL-PLACEHOLDER`
   - Redeploy

3. **Site Verification:**
   - Add Google verification file to `Medical/web/public/`
   - Or add verification meta tag

---

## Vercel Project Settings

### Recommended Settings

**General:**
- Framework: Next.js
- Node.js Version: 20.x
- Root Directory: `Medical/web`

**Build & Development:**
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`
- Development Command: `npm run dev`

**Git:**
- Production Branch: `main`
- Auto-deploy: Enabled
- Deploy Hooks: Optional (for manual triggers)

**Domains:**
- Primary: `medicalaccounts.co.uk`
- Alias: `www.medicalaccounts.co.uk`
- Redirect: www → non-www (or vice versa)

---

## Comparison: All Three Sites

| Site | Domain | Vercel Project | Status |
|------|--------|----------------|--------|
| Property | propertytaxpartners.co.uk | property-tax-partners | ✓ Live |
| Dentists | dentalfinancepartners.co.uk | dental-finance-partners | ✓ Live |
| Medical | medicalaccounts.co.uk | medical-accounts | 🔄 Setup now |

---

## Expected Build Time

**First deployment:**
- Install dependencies: ~60 seconds
- Build Next.js: ~90 seconds
- Deploy to edge: ~30 seconds
- **Total:** ~3 minutes

**Subsequent deployments:**
- Cached dependencies: ~10 seconds
- Build: ~60 seconds
- Deploy: ~20 seconds
- **Total:** ~90 seconds

---

## Troubleshooting

### Build Fails
- Check Node.js version (should be 18.x or 20.x)
- Verify `Medical/web` is set as root directory
- Check environment variables are set

### Domain Not Working
- Verify DNS records (can take up to 48 hours, usually 1-2 hours)
- Check SSL certificate status in Vercel
- Try clearing browser cache

### 404 Errors
- Ensure root directory is `Medical/web` not just `Medical`
- Check build output includes all pages
- Verify sitemap.xml is accessible

---

## Next Steps After Deployment

1. **Verify live site works**
2. **Add to Google Search Console**
3. **Update Google Analytics ID**
4. **Monitor initial indexing**
5. **Plan blog content generation** (Phase 2)

---

## DNS Propagation Check

After adding DNS records, check propagation:
- https://dnschecker.org/
- Enter: medicalaccounts.co.uk
- Check A record points to 76.76.21.21
- Check CNAME for www points to cname.vercel-dns.com

---

## Contact for Help

If you need help with:
- **Vercel setup:** Vercel support or documentation
- **DNS configuration:** Your domain registrar support
- **Build errors:** Check Vercel build logs

---

## Summary

**To deploy Medical:**
1. Create Vercel project (link to Git repo)
2. Set root directory: `Medical/web`
3. Add environment variables (Supabase)
4. Configure DNS at registrar
5. Add domains in Vercel
6. Wait for SSL certificate
7. Test live site

**Medical site is ready to deploy!**
