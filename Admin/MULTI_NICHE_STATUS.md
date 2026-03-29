# Multi-Niche Platform Status

**Date:** March 28, 2026  
**Active Niches:** 2 (Dentists, Property)  
**Status:** 🟢 OPERATIONAL

---

## PLATFORM OVERVIEW

### Architecture
- **Shared components:** `/shared/web-core/` (12 files)
- **Sync mechanism:** `scripts/sync_shared_components.py`
- **Configuration:** `niche.config.json` per niche
- **Database:** Shared Supabase instance
- **Deployment:** Separate Vercel projects per niche
- **Automation:** Single GitHub Actions workflow (matrix strategy)

### Active Niches

| Niche | Status | Domain | Dev Server | Build | Topics | Posts |
|-------|--------|--------|------------|-------|--------|-------|
| **Dentists** | 🟢 LIVE | dentalfinancepartners.co.uk | :3000 | ✅ 67 routes | 50 | 58 |
| **Property** | 🟡 READY | propertyaccountants.co.uk (pending) | :3001 | ✅ 23 routes | 60 | 0 |

---

## DENTISTS NICHE

### Status: 🟢 LIVE & OPERATIONAL

**Domain:** https://dentalfinancepartners.co.uk  
**GA4:** G-273RJY0LZQ  
**Vercel:** Deployed and auto-building  
**Content:** 58 blog posts published  

**Brand Identity:**
- Color: Navy blue (#001B3D)
- Tagline: "Accounting for UK dentists — nothing else"
- Audience: Associates, practice owners, multi-practice groups

**Key Pages:**
- Homepage: "Specialist dental accountants for UK dentists"
- Services: 4 service categories
- About: Practice-focused positioning
- Blog: 58 published posts
- Contact: Lead form with dental-specific roles

**Topics:**
- Total: 50
- Used: ~40
- Unused: ~10
- Categories: NHS/Private, Incorporation, Associates, Practice Ownership

**Performance:**
- Build: ✅ Successful (67 routes)
- Dev server: ✅ Running on port 3000
- Deployment: ✅ Auto-deploying via Vercel
- Agents: ✅ Generating 1 post/day

---

## PROPERTY NICHE

### Status: 🟡 READY FOR DEPLOYMENT

**Domain:** propertyaccountants.co.uk (NOT YET REGISTERED)  
**GA4:** G-PROPERTY-PLACEHOLDER (NOT YET CREATED)  
**Vercel:** NOT YET CONFIGURED  
**Content:** 0 blog posts (60 topics ready)  

**Brand Identity:**
- Color: Emerald green (#047857)
- Tagline: "Accounting for UK landlords — nothing else"
- Audience: Individual landlords, portfolio owners, developers

**Key Pages:**
- Homepage: "Specialist landlord accountants for UK property investors"
- Services: 6 property-specific services
- Incorporation: Dedicated landing page with decision framework
- Calculators: 4 interactive tools (Section 24, Incorporation, MTD, Portfolio)
- About: Property-only positioning
- Contact: Lead form with landlord-specific roles

**Topics:**
- Total: 60
- Used: 0
- Unused: 60
- Categories: Section 24, Incorporation, MTD, CGT, Portfolio

**Performance:**
- Build: ✅ Successful (23 routes)
- Dev server: ✅ Running on port 3001
- Deployment: ⏳ Pending Vercel setup
- Agents: ✅ Configured and ready

---

## SHARED INFRASTRUCTURE

### Supabase Tables

| Table | Dentists | Property | Shared |
|-------|----------|----------|--------|
| `blog_topics` | ✅ 50 topics | - | No |
| `blog_topics_property` | - | ✅ 60 topics | No |
| `published_content` | ✅ 58 posts | ✅ 0 posts | Yes (filtered by `niche`) |
| `leads` | ✅ Active | ⏳ Ready | Yes (filtered by `source`) |
| `agent_logs` | ✅ Active | ⏳ Ready | Yes (filtered by `niche`) |
| `agent_metrics` | ✅ Active | ⏳ Ready | Yes (filtered by `niche`) |

### GitHub Actions

**Workflow:** `daily-content-pipeline.yml`  
**Schedule:** Daily at 09:00 UTC  
**Strategy:** Matrix (sequential execution)

```yaml
matrix:
  niche: [Dentists, Property]
  max-parallel: 1
```

**Jobs:**
1. Research topics (shared)
2. Generate blog (per niche, max 1 post/day)
3. Sync shared components (per niche)
4. Deploy content (per niche)
5. Commit and push (triggers Vercel)
6. Risk checks (shared)

**Status:** ✅ Configured and running for Dentists, ready for Property

---

## ISOLATION VERIFICATION

### ✅ Metadata
- Site names: Different
- Taglines: Different
- Domains: Different
- GA4 IDs: Different
- Theme colors: Different
- All loaded from `niche.config.json`

### ✅ UI Text
- Lead form roles: Different per niche
- CTA copy: Different per niche
- Blog CTA: Different per niche
- All loaded from `niche.config.json`

### ✅ Data Flows
- Lead source: `dentists` vs. `property`
- Topics tables: Separate
- Published content: Filtered by `niche` column
- Agent logs: Filtered by `niche` column

### ✅ Content
- Blog topics: 100% unique per niche
- Categories: 100% unique per niche
- Keywords: 100% unique per niche
- No overlap or cross-contamination

---

## DEPLOYMENT STRATEGY

### Vercel Configuration

**Dentists Project:**
- Name: `dental-finance-partners`
- Root Directory: `Dentists/web`
- Domain: `dentalfinancepartners.co.uk`
- Ignored Build Step: `bash -c 'git diff HEAD^ HEAD --quiet . ../niche.config.json ../shared || exit 1'`
- Status: ✅ LIVE

**Property Project (TO BE CREATED):**
- Name: `property-accountants-uk`
- Root Directory: `Property/web`
- Domain: `propertyaccountants.co.uk`
- Ignored Build Step: `bash -c 'git diff HEAD^ HEAD --quiet . ../niche.config.json ../shared || exit 1'`
- Status: ⏳ PENDING USER SETUP

### Build Triggers

**Dentists rebuilds when:**
- Files in `Dentists/` change
- `Dentists/niche.config.json` changes
- Files in `shared/` change

**Property rebuilds when:**
- Files in `Property/` change
- `Property/niche.config.json` changes
- Files in `shared/` change

**Neither rebuilds when:**
- Other niche's files change
- Root-level files change (e.g., `Admin/`, `agents/`)
- Unrelated commits

---

## COST ANALYSIS

### Current Costs (Dentists Only)

**Anthropic API:**
- ~£2-3 per blog post (Claude 3.5 Sonnet)
- 1 post/day = £60-90/month
- Current usage: Within limits

**Vercel:**
- Free tier (likely sufficient)
- Bandwidth: ~10GB/month (estimated)

**Supabase:**
- Free tier
- Database: ~50MB
- API calls: ~1,000/day

**Total:** ~£60-90/month for Dentists

### Projected Costs (Both Niches)

**Anthropic API:**
- 2 posts/day (1 per niche) = £120-180/month
- Still well within budget

**Vercel:**
- 2 projects (free tier each)
- Combined bandwidth: ~20GB/month

**Supabase:**
- Still free tier
- Database: ~100MB (estimated)
- API calls: ~2,000/day

**Total:** ~£120-180/month for both niches

**Cost per lead:** ~£10-15 (estimated, based on Dentists performance)

---

## AGENT STATUS

### Content Research Agent
- **Dentists:** ✅ Active (researching topics)
- **Property:** ✅ Ready (60 topics pre-seeded)

### Blog Generation Agent
- **Dentists:** ✅ Active (1 post/day)
- **Property:** ✅ Ready (will start after first workflow run)

### Deployment Agent
- **Dentists:** ✅ Active (deploying from Supabase)
- **Property:** ✅ Ready (will deploy when content is generated)

### Risk Manager Agent
- **Dentists:** ✅ Monitoring
- **Property:** ✅ Will monitor after first content generation

### Analytics Optimization Agent
- **Dentists:** ⏳ Not yet active (needs GA4 data)
- **Property:** ⏳ Not yet active (needs GA4 setup + data)

---

## SCALABILITY

### Adding Future Niches

**Effort:** ~2-3 hours per niche  
**Process:**
1. Copy existing niche folder
2. Create `niche.config.json` with new branding
3. Update `BrandWordmarkHomeLink.tsx`
4. Create niche-specific pages (homepage, services, etc.)
5. Create Supabase `blog_topics_{niche}` table
6. Seed topics
7. Update `agents/config/agent_config.py`
8. Create Vercel project
9. Deploy

**Shared components automatically work** — no modification needed.

### Potential Future Niches
- Solicitors / Legal
- Medical (GPs, consultants)
- Pharmacies
- Hospitality (restaurants, hotels)
- Construction contractors
- E-commerce businesses

---

## CURRENT TASKS

### ✅ COMPLETED
- [x] Dentists niche live and operational
- [x] Property niche architecturally complete
- [x] Shared components architecture implemented
- [x] Metadata isolation verified (100%)
- [x] Content tree built (60 topics)
- [x] Calculators built (4 interactive tools)
- [x] All pages created (homepage, services, incorporation, calculators, about, contact)
- [x] Agents configured for Property
- [x] Build successful
- [x] Dev servers running

### ⏳ PENDING USER INPUT
- [ ] Register domain: `propertyaccountants.co.uk`
- [ ] Create GA4 property
- [ ] Set up Google Search Console
- [ ] Configure email: `hello@propertyaccountants.co.uk`
- [ ] Get phone number (or use shared)
- [ ] Create Vercel project
- [ ] Deploy to production

### 🔄 NEXT (After User Setup)
- [ ] Update `Property/niche.config.json` with real values
- [ ] Sync shared components
- [ ] Commit and push
- [ ] Verify live deployment
- [ ] Submit sitemap to GSC
- [ ] Monitor first content generation
- [ ] Verify lead form submissions

---

## HEALTH CHECK

### Dentists
- ✅ Build: Passing
- ✅ Dev server: Running
- ✅ Production: Live
- ✅ Content: 58 posts
- ✅ Agents: Active
- ✅ Leads: Capturing

### Property
- ✅ Build: Passing
- ✅ Dev server: Running
- ⏳ Production: Pending setup
- ⏳ Content: 0 posts (60 ready)
- ✅ Agents: Ready
- ⏳ Leads: Ready

### Shared Infrastructure
- ✅ Components: 12 files synced
- ✅ Database: All tables created
- ✅ Agents: Configured for both niches
- ✅ GitHub Actions: Configured
- ✅ Documentation: Complete

---

## SUMMARY

**The Property niche is production-ready.**

All code is written, tested, and verified. The only blockers are external dependencies (domain, GA4, contact details) that require your action.

**Both dev servers are running:**
- **Dentists:** http://localhost:3000
- **Property:** http://localhost:3001

**Next step:** Register domain and follow `PROPERTY_SETUP_GUIDE.md` to go live.

---

**Platform Status:** 🟢 HEALTHY  
**Dentists:** 🟢 LIVE  
**Property:** 🟡 READY FOR LAUNCH
