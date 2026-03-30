# Property Tax Partners Deployment Guide

**Domain:** propertytaxpartners.co.uk  
**Status:** Ready for deployment (pending blog content)  
**Last Updated:** 29 March 2026

---

## ✅ CONFIGURATION UPDATED

### Domain & Branding
- ✅ Domain: `www.propertytaxpartners.co.uk` (UPDATED 2026-03-30 - includes www)
- ✅ Display name: `Property Tax Partners`
- ✅ Legal name: `Property Tax Partners Ltd`
- ✅ Email: `hello@propertytaxpartners.co.uk`
- ✅ Phone: `+44 20 3026 1111`
- ✅ Site URL: `https://www.propertytaxpartners.co.uk` (UPDATED 2026-03-30 - includes www)

---

## 🚀 VERCEL DEPLOYMENT STEPS

### 1. Connect Repository to Vercel

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Login to Vercel
vercel login

# Link project (run from Property/web directory)
cd Property/web
vercel link
```

**Project Settings:**
- Framework Preset: Next.js
- Root Directory: `Property/web`
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`
- Node Version: 20.x

### 2. Configure Environment Variables in Vercel

Go to Vercel Dashboard → Project Settings → Environment Variables

Add these variables for **Production**:

```
NEXT_PUBLIC_SITE_URL=https://www.propertytaxpartners.co.uk
NEXT_PUBLIC_SUPABASE_URL=https://dhlxwmvmkrfnmcgjbntk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...YOUR_ANON_KEY
```

**CRITICAL**: NEXT_PUBLIC_SITE_URL MUST include www subdomain to prevent robots.txt line breaks!

### 3. Configure Custom Domain

In Vercel Dashboard → Project Settings → Domains:

1. Add domain: `propertytaxpartners.co.uk`
2. Add www subdomain: `www.propertytaxpartners.co.uk`
3. Set `propertytaxpartners.co.uk` as primary (non-www)

**DNS Configuration (at your domain registrar):**

```
Type    Name    Value                           TTL
A       @       76.76.21.21                     Auto
CNAME   www     cname.vercel-dns.com            Auto
```

*Note: Vercel will provide the exact DNS values in the dashboard*

### 4. Deploy

```bash
# Deploy to production
cd Property/web
vercel --prod
```

Or push to main branch if auto-deploy is configured:
```bash
git add .
git commit -m "Configure Property Tax Partners domain"
git push origin main
```

---

## 📧 EMAIL SETUP

### Option 1: Email Forwarding (Quick)
Set up forwarding at your domain registrar:
- `hello@propertytaxpartners.co.uk` → your personal email

### Option 2: Google Workspace (Professional)
1. Sign up for Google Workspace
2. Verify domain ownership
3. Configure MX records
4. Create `hello@propertytaxpartners.co.uk` mailbox

**Recommended MX Records (Google Workspace):**
```
Priority    Host    Value
1           @       ASPMX.L.GOOGLE.COM
5           @       ALT1.ASPMX.L.GOOGLE.COM
5           @       ALT2.ASPMX.L.GOOGLE.COM
10          @       ALT3.ASPMX.L.GOOGLE.COM
10          @       ALT4.ASPMX.L.GOOGLE.COM
```

---

## 🔍 GOOGLE SEARCH CONSOLE SETUP

### 1. Add Property
1. Go to https://search.google.com/search-console
2. Click "Add Property"
3. Choose "URL prefix" method
4. Enter: `https://propertytaxpartners.co.uk`

### 2. Verify Ownership

**Method 1: HTML Tag (Recommended)**
1. Search Console will provide a meta tag like:
   ```html
   <meta name="google-site-verification" content="ABC123..." />
   ```
2. Copy the `content` value (e.g., `ABC123...`)
3. Update `Property/niche.config.json`:
   ```json
   "google_site_verification": "ABC123..."
   ```
4. Redeploy site
5. Click "Verify" in Search Console

**Method 2: DNS TXT Record**
Add TXT record to your domain:
```
Type    Name    Value
TXT     @       google-site-verification=ABC123...
```

### 3. Submit Sitemap
Once verified, submit sitemap:
```
https://propertytaxpartners.co.uk/sitemap.xml
```

---

## 📊 GOOGLE ANALYTICS 4 SETUP

### 1. Create GA4 Property
1. Go to https://analytics.google.com
2. Admin → Create Property
3. Property name: "Property Tax Partners"
4. Reporting time zone: United Kingdom
5. Currency: GBP (£)

### 2. Create Data Stream
1. Choose "Web"
2. Website URL: `https://propertytaxpartners.co.uk`
3. Stream name: "Property Tax Partners Website"
4. Copy the Measurement ID (format: `G-XXXXXXXXXX`)

### 3. Update Configuration
Update `Property/niche.config.json`:
```json
"google_analytics_id": "G-XXXXXXXXXX"
```

### 4. Configure Events (Optional)
In GA4, create custom events:
- `generate_lead` - When form is submitted
- `calculator_use` - When calculator is used
- `page_view` - Automatic

---

## 🧪 PRE-DEPLOYMENT TESTING CHECKLIST

### Local Testing (http://localhost:3001)
- [ ] Test lead form submission
- [ ] Verify all calculators work
- [ ] Check all internal links
- [ ] Test mobile menu
- [ ] Verify images load
- [ ] Check console for errors

### Production Build Test
```bash
cd Property/web
npm run build
npm run start
```
- [ ] Build completes without errors
- [ ] All pages render correctly
- [ ] No TypeScript errors
- [ ] No missing dependencies

### Post-Deployment Testing (on propertytaxpartners.co.uk)
- [ ] Homepage loads correctly
- [ ] All navigation works
- [ ] Lead form submits successfully
- [ ] Images load from Unsplash
- [ ] Sitemap accessible at /sitemap.xml
- [ ] Robots.txt accessible at /robots.txt
- [ ] Google Analytics tracking (check Real-Time)
- [ ] Mobile responsive (test on phone)
- [ ] SSL certificate active (https://)

---

## 📋 POST-DEPLOYMENT TASKS

### Immediate (Day 1)
1. Submit sitemap to Search Console
2. Test lead form from production site
3. Verify GA4 is receiving data (Real-Time report)
4. Check all pages load correctly
5. Test on mobile devices

### Week 1
1. Monitor Search Console for indexing
2. Check for any 404 errors
3. Monitor lead submissions
4. Set up email notifications for leads (if not configured)
5. Create Google Business Profile (if applicable)

### Month 1
1. Review GA4 data (traffic sources, popular pages)
2. Check Search Console (queries, impressions, clicks)
3. Optimise based on data
4. Add more blog content
5. Monitor conversion rate

---

## 🔐 SECURITY CHECKLIST

- ✅ Environment variables not committed to Git
- ✅ Supabase uses anon key (not service key)
- ✅ No sensitive data in client-side code
- ✅ CORS configured in Supabase (if needed)
- ✅ Rate limiting on form submission (Supabase default)
- ⚠️ Consider adding Cloudflare for DDoS protection
- ⚠️ Consider adding reCAPTCHA to contact form

---

## 📞 SUPPORT CONTACTS

### Vercel Support
- Dashboard: https://vercel.com/dashboard
- Docs: https://vercel.com/docs
- Status: https://vercel-status.com

### Domain Registrar
- Check where you bought propertytaxpartners.co.uk
- Access DNS settings to configure A/CNAME records

### Supabase
- Dashboard: https://supabase.com/dashboard
- Project: YOUR_PROJECT_ID
- Check `leads` table for submissions

---

## 🚨 ROLLBACK PLAN

If issues occur after deployment:

### Quick Rollback
```bash
# Revert to previous deployment in Vercel Dashboard
# Or redeploy previous commit
vercel --prod --force
```

### DNS Rollback
- Remove A/CNAME records
- Point domain to parking page
- Fix issues on staging
- Redeploy when ready

---

## 📈 SUCCESS METRICS

### Week 1 Targets
- Site accessible and loading fast
- Zero 404 errors
- At least 1 test lead submission working
- Google Analytics tracking active
- Search Console showing site in index

### Month 1 Targets
- 100+ organic impressions (Search Console)
- 5-10 organic clicks
- At least 1 real lead submission
- All pages indexed by Google
- Blog posts starting to rank

### Month 3 Targets
- 1,000+ organic impressions
- 50+ organic clicks
- 5-10 lead submissions
- Ranking for "property accountant [city]" keywords
- Ranking for "Section 24 calculator" type queries

---

## ⚡ QUICK DEPLOYMENT COMMAND

```bash
# From workspace root
cd Property/web

# Install dependencies (if needed)
npm install

# Build and test locally
npm run build
npm run start

# Deploy to Vercel production
vercel --prod

# Or let GitHub Actions handle it (if configured)
git push origin main
```

---

## 🎯 CURRENT STATUS

**Ready for deployment:** ✅ YES (with caveats)

**Caveats:**
1. No blog content yet (major SEO gap)
2. Lead form needs testing on production
3. Need to configure GA4 and Search Console after deployment

**Recommendation:** Deploy now to get domain live and indexed, add blog content progressively over next 2-4 weeks.

---

## 📝 NOTES

- Phone number added: `+44 20 3026 1111` (verify this is correct/monitored)
- Email updated to match new domain
- Legal name updated to `Property Tax Partners Ltd`
- All site references will automatically update via `siteConfig`
- Shared components synced successfully
