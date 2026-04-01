# Solicitors Niche - Launch Checklist

**Quick reference for deploying www.accountsforlawyers.co.uk**

---

## Phase 1: Deployment (You - 15 minutes)

### Vercel
- [ ] Create new project in Vercel dashboard
- [ ] Import from GitHub: `Jaymoo123/dentalfinancepartners.co.uk`
- [ ] Set root directory: `Solicitors/web`
- [ ] Set framework: Next.js
- [ ] Add environment variables:
  ```
  NEXT_PUBLIC_SITE_URL=https://www.accountsforlawyers.co.uk
  NEXT_PUBLIC_SUPABASE_URL=https://dhlxwmvmkrfnmcgjbntk.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRobHh3bXZta3Jmbm1jZ2pibnRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0ODM0NjMsImV4cCI6MjA3NDA1OTQ2M30.hwUgd2x91wFqX8HKENztrXtGkabR21LPKhC-oxzuOA8
  ```
- [ ] Deploy and verify build passes
- [ ] Test site on Vercel preview URL

### Domain
- [ ] Add domain in Vercel: `www.accountsforlawyers.co.uk`
- [ ] Add redirect: `accountsforlawyers.co.uk` → `www.accountsforlawyers.co.uk`
- [ ] Copy DNS records from Vercel
- [ ] Update DNS with registrar (A + CNAME records)
- [ ] Wait for SSL certificate (1-5 minutes)
- [ ] Verify site loads on custom domain

---

## Phase 2: Database (You or Me - 5 minutes)

### Supabase SQL Editor
- [ ] Run migration: `supabase/migrations/20260401000001_create_blog_topics_solicitors.sql`
- [ ] Run migration: `supabase/migrations/20260401000002_add_solicitors_to_leads_source.sql`
- [ ] Verify table exists:
  ```sql
  SELECT COUNT(*) FROM blog_topics_solicitors;
  ```
- [ ] Verify leads constraint:
  ```sql
  SELECT conname, pg_get_constraintdef(oid) 
  FROM pg_constraint 
  WHERE conname = 'leads_source_valid';
  ```

---

## Phase 3: Content Generation (Me - 60 minutes)

### Import Keywords
```bash
python scripts/import_solicitors_topics.py
```
- [ ] Verify 60 keywords imported
- [ ] Check priority distribution (1: 15, 2: 20, 3: 25)

### Generate Foundational Posts
```bash
python scripts/batch_generate_solicitors.py --count 15
```
- [ ] 15 posts generated in `Solicitors/web/content/blog/`
- [ ] Posts cover priority 1-2 keywords
- [ ] Commit and push to trigger Vercel rebuild

---

## Phase 4: Analytics (You - 10 minutes)

### Google Analytics 4
- [ ] Create property: "Accounts for Lawyers"
- [ ] Create data stream: `www.accountsforlawyers.co.uk`
- [ ] Copy Measurement ID (G-XXXXXXXXXX)
- [ ] Copy Property ID (numeric from Property Settings)
- [ ] Update `Solicitors/niche.config.json`:
  ```json
  "google_analytics_id": "G-XXXXXXXXXX"
  ```
- [ ] Update `agents/config/agent_config.py`:
  ```python
  "ga4_measurement_id": "G-XXXXXXXXXX",
  "ga4_property_id": "NUMERIC_ID",
  "enabled": True,
  ```
- [ ] Commit and push changes

### Google Search Console
- [ ] Add property: `accountsforlawyers.co.uk` (domain property)
- [ ] Verify ownership (DNS TXT record)
- [ ] Copy verification code
- [ ] Update `Solicitors/niche.config.json`:
  ```json
  "google_site_verification": "VERIFICATION_CODE"
  ```
- [ ] Submit sitemap: `https://www.accountsforlawyers.co.uk/sitemap.xml`
- [ ] Update `agents/config/gsc_config.py`:
  ```python
  "enabled": True,
  "start_date": "2026-04-01",
  ```
- [ ] Commit and push changes

---

## Phase 5: Verification (Me - 10 minutes)

### Site Health Check
- [ ] All pages load without errors
- [ ] Lead form submits successfully
- [ ] Blog posts render correctly
- [ ] Location pages show proper content
- [ ] Mobile responsive verified
- [ ] Schema markup validates (Google Rich Results Test)

### Database Check
- [ ] Test lead submission appears in Supabase `leads` table with `source='solicitors'`
- [ ] Verify blog topics show correct status after generation
- [ ] Check RLS policies are working (anon can insert leads, can't read)

### SEO Check
- [ ] robots.txt accessible
- [ ] Sitemap.xml accessible and valid
- [ ] All pages have unique title tags
- [ ] All pages have meta descriptions
- [ ] Canonical URLs correct
- [ ] Open Graph tags present

---

## Phase 6: Ongoing (Automated)

### Content Pipeline
- [ ] Agent generates 2-3 posts per week (automated)
- [ ] GSC optimization identifies top opportunities
- [ ] Analytics tracks performance and adjusts strategy

### Monitoring
- [ ] Weekly GSC reports (automated)
- [ ] Monthly analytics review
- [ ] Lead tracking and response

---

## Quick Commands Reference

```bash
# Local development
cd Solicitors/web
npm run dev  # http://localhost:3002

# Generate one blog post
cd Solicitors
python generate_blog_supabase.py

# Generate 15 posts
python ../scripts/batch_generate_solicitors.py --count 15

# Import keywords
python scripts/import_solicitors_topics.py

# Check pending topics
# In Supabase SQL Editor:
SELECT keyword, priority, status FROM blog_topics_solicitors 
WHERE status = 'pending' 
ORDER BY priority ASC, difficulty ASC 
LIMIT 10;
```

---

## Support Files

- **Deployment guide**: `Admin/SOLICITORS_DEPLOYMENT_READY.md`
- **Status summary**: `Admin/SOLICITORS_STATUS.md`
- **README**: `Solicitors/README.md`
- **Keywords**: `Admin/Topics/solicitors_keywords.csv`
- **Template**: `templates/niches/solicitors/template.json`

---

**Current Status**: ✅ All code complete and pushed to main  
**Your Action**: Deploy to Vercel and configure domain  
**My Action**: Import keywords and generate content after deployment
