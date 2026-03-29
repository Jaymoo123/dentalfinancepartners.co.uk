# Property Niche - Setup Guide for User

**Date:** March 28, 2026  
**Status:** 🟡 AWAITING USER INPUT

---

## WHAT'S BEEN BUILT

The Property niche is **architecturally complete** and ready for deployment. Here's what's live:

### ✅ Complete Website
- **Homepage** optimized for "landlord accountant UK"
- **Services** page with 6 property-specific offerings
- **Incorporation** page (dedicated landing page)
- **Calculators** page with 4 interactive tools:
  1. Section 24 Tax Calculator
  2. Incorporation Cost Calculator
  3. MTD Checker
  4. Portfolio Profitability Calculator
- **About** page
- **Contact** page
- **Blog** infrastructure (no posts yet)
- **Location** pages (London, Manchester, Birmingham, Leeds, Bristol)

### ✅ Content Strategy
- **60 topics** seeded in Supabase (`blog_topics_property` table)
- **5 content branches:** Section 24, Incorporation, MTD, CGT, Portfolio
- **Primary keyword:** "landlord accountant UK"
- **Content tree** documented with keyword mapping
- **Agents configured** and ready to generate content

### ✅ Technical Infrastructure
- Shared components synced
- Metadata 100% isolated from Dentists
- Build successful (23 routes)
- Dev servers running:
  - **Dentists:** http://localhost:3000
  - **Property:** http://localhost:3001

---

## WHAT YOU NEED TO DO

### 1. Domain Registration

**Recommended:** `propertyaccountants.co.uk`  
**Alternatives:** `landlordaccountants.co.uk`, `propertyaccountantsuk.com`

**Steps:**
1. Register domain (Namecheap, GoDaddy, etc.)
2. Point DNS to Vercel (instructions below)
3. Update `Property/niche.config.json`:
   ```json
   "domain": "propertyaccountants.co.uk"
   ```

---

### 2. Google Analytics 4 Setup

**Steps:**
1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Admin" → "Create Property"
3. Property name: "Property Accountants UK"
4. Industry: "Finance & Insurance"
5. Business size: "Small"
6. Create **Web data stream**
7. Website URL: `https://propertyaccountants.co.uk` (use your domain)
8. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)
9. Update `Property/niche.config.json`:
   ```json
   "google_analytics_id": "G-XXXXXXXXXX"
   ```

---

### 3. Google Search Console Setup

**Steps:**
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Add Property" → "URL prefix"
3. Enter: `https://propertyaccountants.co.uk`
4. Choose verification method: **HTML tag**
5. Copy the `content` value from the meta tag (format: `abc123xyz...`)
6. Update `Property/niche.config.json`:
   ```json
   "google_site_verification": "abc123xyz..."
   ```
7. Return to GSC and click "Verify"
8. Submit sitemap: `https://propertyaccountants.co.uk/sitemap.xml`

---

### 4. Contact Details

**Email Setup:**
1. Set up email: `hello@propertyaccountants.co.uk`
   - Use Google Workspace, Microsoft 365, or domain email forwarding
2. Update `Property/niche.config.json`:
   ```json
   "email": "hello@propertyaccountants.co.uk"
   ```

**Phone Setup:**
- **Option A:** Use shared Dentists number (if appropriate)
- **Option B:** Get dedicated number via VoIP provider
- Update `Property/niche.config.json`:
  ```json
  "phone": "+44 20 XXXX XXXX"
  ```

---

### 5. Vercel Project Setup

**Steps:**

1. **Create Project**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import: `Jaymoo123/dentalfinancepartners.co.uk` (same repo as Dentists)
   - Project name: `property-accountants-uk`

2. **Configure Root Directory**
   - Framework Preset: **Next.js**
   - Root Directory: `Property/web` ⚠️ CRITICAL
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

3. **Configure Ignored Build Step**
   - Go to Project Settings → Git
   - Ignored Build Step: **Custom**
   - Command:
     ```bash
     bash -c 'git diff HEAD^ HEAD --quiet . ../niche.config.json ../shared || exit 1'
     ```
   - This ensures Property only rebuilds when Property files change (not when Dentists changes)

4. **Add Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add the following (same values as Dentists):
     - `SUPABASE_URL` = `https://YOUR_PROJECT.supabase.co`
     - `SUPABASE_KEY` = `[Your Supabase anon key from dashboard]`
     - `NEXT_PUBLIC_SITE_URL` = `https://propertyaccountants.co.uk` (optional)

5. **Connect Domain**
   - Go to Project Settings → Domains
   - Add domain: `propertyaccountants.co.uk`
   - Add `www.propertyaccountants.co.uk` (redirect to apex)
   - Follow Vercel's DNS instructions

6. **Deploy**
   - Click "Deploy" or push to GitHub
   - Vercel will build from `Property/web` directory
   - Verify live site loads correctly

---

## 6. Update Configuration Files

After you have all the above information, update the config:

```bash
# 1. Open Property/niche.config.json
# 2. Update these fields:
#    - domain: "propertyaccountants.co.uk"
#    - contact.email: "hello@propertyaccountants.co.uk"
#    - contact.phone: "+44 20 XXXX XXXX"
#    - seo.google_analytics_id: "G-XXXXXXXXXX"
#    - seo.google_site_verification: "abc123xyz..."

# 3. Sync shared components
python scripts/sync_shared_components.py --niche Property

# 4. Commit and push
git add Property/
git commit -m "Configure Property niche with live domain and GA4"
git push

# Vercel will auto-deploy
```

---

## 7. Verify Live Deployment

Once deployed, check:

- [ ] Homepage loads at `https://propertyaccountants.co.uk`
- [ ] Navigation works (all 6 links)
- [ ] Calculators are interactive
- [ ] Lead form submits to Supabase `leads` table with `source = 'property'`
- [ ] GA4 tracking fires (check Real-Time report)
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt accessible at `/robots.txt`
- [ ] OpenGraph images load
- [ ] Mobile responsive

---

## 8. Content Generation Timeline

### Week 1 (First 3 Posts)
- Day 1: "Should I incorporate my buy-to-let portfolio in 2026?"
- Day 2: "Section 24 mortgage interest restriction explained"
- Day 3: "Making Tax Digital for landlords: April 2026 deadline"

### Week 2-4 (21 Posts)
- Week 2: Section 24 cluster (7 posts)
- Week 3: Incorporation cluster (7 posts)
- Week 4: MTD cluster (7 posts)

### Month 2 (30 Posts)
- CGT branch (8 posts)
- Portfolio management branch (5 posts)
- Long-tail topics (17 posts)

**Total:** 54 posts over 2 months (6 topics held in reserve)

---

## 9. Monitoring & Maintenance

### Daily (Automated)
- Content generation (1 post/day max)
- Deployment to GitHub
- Risk checks (topic inventory, deployment success rate)
- Vercel auto-build on push

### Weekly (Manual)
- Check GA4 traffic
- Review lead submissions
- Monitor topic usage
- Check for deployment failures

### Monthly (Manual)
- Content clustering analysis
- Keyword performance review
- Portfolio profitability check (both niches)
- Agent cost analysis

---

## 10. Quick Reference

### Dev Servers
- Dentists: `cd Dentists/web && npm run dev` (port 3000)
- Property: `cd Property/web && npm run dev` (port 3001)

### Build
- Dentists: `cd Dentists/web && npm run build`
- Property: `cd Property/web && npm run build`

### Sync Shared Components
```bash
python scripts/sync_shared_components.py --niche Dentists
python scripts/sync_shared_components.py --niche Property
```

### Agent Test (Local)
```bash
# Research topics
python agents/content_research_agent.py --niche Property --max-topics 5

# Generate blog
python agents/blog_generation_agent.py --niche Property --max-posts 1

# Deploy content
python agents/deployment_agent.py --niche Property --max-deployments 1
```

### Database Queries
```sql
-- Check Property topics
SELECT COUNT(*), category FROM blog_topics_property WHERE used = FALSE GROUP BY category;

-- Check Property leads
SELECT COUNT(*), role FROM leads WHERE source = 'property' GROUP BY role;

-- Check Property published content
SELECT COUNT(*), deployment_status FROM published_content WHERE niche = 'property' GROUP BY deployment_status;
```

---

## SUPPORT

If you encounter issues:

1. **Build errors:** Check `Property/web/.next/` for detailed logs
2. **Dev server issues:** Kill node processes and restart
3. **Config issues:** Verify `niche.config.json` is valid JSON
4. **Supabase issues:** Check environment variables in `.env`
5. **Vercel issues:** Check build logs in Vercel dashboard

**All systems are GO. Just need your domain, GA4, and contact details to launch!** 🚀
