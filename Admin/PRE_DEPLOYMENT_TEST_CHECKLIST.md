# Pre-Deployment Test Checklist

**Purpose:** Verify complete niche isolation before activating Property niche  
**Date:** March 28, 2026  
**Status:** 🟡 PENDING FIXES

---

## Phase 1: Fix Critical Issues

### Issue #2: LeadForm Role Options
- [ ] Add `lead_form` section to `Dentists/niche.config.json`
- [ ] Update `NicheConfig` interface in `niche-loader.ts`
- [ ] Update `LeadForm.tsx` to load options from config
- [ ] Update placeholders to load from config
- [ ] Test: Form renders with dental-specific options

### Issue #4: StickyCTA Text
- [ ] Add `cta` section to `Dentists/niche.config.json`
- [ ] Update `NicheConfig` interface in `niche-loader.ts`
- [ ] Update `StickyCTA.tsx` to load text from config
- [ ] Test: Sticky CTA shows dental-specific text

### Issue #5: BlogPostRenderer CTA
- [ ] Add `blog` section to `Dentists/niche.config.json`
- [ ] Update `NicheConfig` interface in `niche-loader.ts`
- [ ] Update `BlogPostRenderer.tsx` to load text from config
- [ ] Test: Blog post CTA shows dental-specific text

### Issue #6: Lead Source Tracking
- [ ] Update `LeadForm.tsx` to include `source` field in payload
- [ ] Load source from `niche.content_strategy.source_identifier`
- [ ] Test: Lead submission includes `source = 'dentists'`

---

## Phase 2: Build & Compilation Tests

### Dentists Build
- [ ] Run `cd Dentists/web && npm run build`
- [ ] Verify: 0 TypeScript errors
- [ ] Verify: 0 linter errors
- [ ] Verify: All pages compile successfully
- [ ] Check output: 67 pages generated

### Dentists Dev Server
- [ ] Run `cd Dentists/web && npm run dev`
- [ ] Verify: Server starts on port 3000
- [ ] Verify: No console errors
- [ ] Visit `http://localhost:3000`
- [ ] Verify: Page loads correctly

---

## Phase 3: Metadata Verification (Dentists)

### Browser DevTools Inspection

#### Page Title
- [ ] Open homepage in browser
- [ ] Check `<title>` tag
- [ ] Verify: Shows "Dental Finance Partners | Accounting for UK dentists — nothing else"
- [ ] NOT: Any Property-related text

#### Meta Tags
- [ ] Check `<meta name="description">`
- [ ] Verify: Shows Dentists description
- [ ] Check `<meta property="og:site_name">`
- [ ] Verify: Shows "Dental Finance Partners"
- [ ] Check `<meta name="google-site-verification">`
- [ ] Verify: Shows `6Yl4g8aauEScoYRA4pqJ-d-l_CeAhKUPV1dHvOirf1E`
- [ ] Check `<meta name="theme-color">`
- [ ] Verify: Shows `#001B3D` (navy)

#### Google Analytics
- [ ] Check `<script>` tags for gtag
- [ ] Verify: Contains `gtag('config', 'G-273RJY0LZQ')`
- [ ] NOT: Any other GA4 property ID

#### JSON-LD Schema
- [ ] Find `<script type="application/ld+json">`
- [ ] Check Organization schema
- [ ] Verify: `"name": "Dental Finance Partners"`
- [ ] Verify: `"url": "https://dentalfinancepartners.co.uk"`
- [ ] Verify: `"contactPoint": { "telephone": "+44 20 0000 0000" }`
- [ ] NOT: Any Property-related data

---

## Phase 4: Component Rendering Tests (Dentists)

### Header
- [ ] Visit homepage
- [ ] Verify: Logo/wordmark shows "Dental Finance Partners"
- [ ] Verify: Navigation shows Services, About, Blog, Contact
- [ ] Verify: "Book a call" button present
- [ ] NOT: Any Property-related text

### Footer
- [ ] Scroll to bottom
- [ ] Verify: Logo shows "Dental Finance Partners"
- [ ] Verify: Description shows dental-specific text
- [ ] Verify: Copyright shows "Dental Finance Partners Ltd"
- [ ] Verify: Domain shows "dentalfinancepartners.co.uk"
- [ ] Verify: Footer links match config
- [ ] NOT: Any Property-related text

### StickyCTA (After Fix)
- [ ] Scroll down 30% on homepage
- [ ] Verify: Sticky CTA appears
- [ ] Verify: Shows "Ready to work with a specialist dental accountant?"
- [ ] Verify: Button says "Get started"
- [ ] NOT: Generic or Property-related text

### LeadForm (After Fix)
- [ ] Visit `/contact` page
- [ ] Verify: Role dropdown shows dental options
  - [ ] "Associate dentist"
  - [ ] "Practice owner"
  - [ ] "Multi-practice group"
  - [ ] "Other"
- [ ] Verify: Placeholder shows "Dr Sarah Patel"
- [ ] Verify: Message placeholder shows dental example
- [ ] NOT: Property-related options or examples

### BlogPostRenderer (After Fix)
- [ ] Visit any blog post (e.g., `/blog/associate-dentist-tax-self-assessment-uk`)
- [ ] Scroll to lead capture section
- [ ] Verify: Heading shows "Get specialist advice for your situation"
- [ ] Verify: Body shows "Every dental practice is different..."
- [ ] Verify: Button shows "Request a callback"
- [ ] NOT: Generic or Property-related text

---

## Phase 5: Form Submission Tests (Dentists)

### Test Lead Submission
- [ ] Visit `/contact` page
- [ ] Fill out form:
  - Name: "Test User"
  - Email: "test@example.com"
  - Phone: "07700 900123"
  - Role: "Associate dentist"
  - Message: "Test submission"
- [ ] Submit form
- [ ] Verify: Success message appears
- [ ] Check Supabase `leads` table
- [ ] Verify: New row exists with:
  - [ ] `full_name = 'Test User'`
  - [ ] `email = 'test@example.com'`
  - [ ] `source = 'dentists'` ← CRITICAL
  - [ ] `source_url` contains dentalfinancepartners.co.uk
  - [ ] `submitted_at` is recent timestamp
- [ ] Check Google Analytics Real-Time
- [ ] Verify: `generate_lead` event appears
- [ ] Verify: Event label includes role

---

## Phase 6: Sitemap & Robots Tests (Dentists)

### Sitemap
- [ ] Visit `/sitemap.xml`
- [ ] Verify: All URLs start with `https://dentalfinancepartners.co.uk`
- [ ] Verify: Includes homepage, services, about, contact, locations
- [ ] Verify: Includes all blog posts
- [ ] Verify: Includes location pages (London, Manchester)
- [ ] NOT: Any Property URLs

### Robots.txt
- [ ] Visit `/robots.txt`
- [ ] Verify: Sitemap URL is `https://dentalfinancepartners.co.uk/sitemap.xml`
- [ ] Verify: User-agent: *
- [ ] Verify: Allow: /
- [ ] Verify: Disallow: /thank-you

---

## Phase 7: Sync Script Tests

### Validate Structure
- [ ] Run `python scripts/sync_shared_components.py --validate`
- [ ] Verify: All directories show "OK"
- [ ] Verify: File counts are correct

### Dry Run
- [ ] Run `python scripts/sync_shared_components.py --niche Dentists --dry-run`
- [ ] Verify: Shows what would be synced
- [ ] Verify: No errors

### Actual Sync
- [ ] Run `python scripts/sync_shared_components.py --niche Dentists`
- [ ] Verify: Files copied successfully
- [ ] Verify: `niche.config.json` updated with `last_sync` timestamp
- [ ] Verify: Build still works after sync

---

## Phase 8: Property Niche Setup (After Fixes)

### Create Property Structure
- [ ] Copy `Dentists/niche.config.json` to `Property/niche.config.json`
- [ ] Update Property config with:
  - [ ] `niche_id: "property"`
  - [ ] `display_name: "Property Accountants UK"`
  - [ ] `domain: "propertyaccountants.co.uk"`
  - [ ] `contact.email: "hello@propertyaccountants.co.uk"`
  - [ ] `seo.google_analytics_id: "G-XXXXXXXXX"` (new GA4 property)
  - [ ] `lead_form.role_options`: Property-specific (Landlord, Portfolio owner, etc.)
  - [ ] `cta.sticky_primary`: "Ready to work with a specialist property accountant?"
  - [ ] `blog.cta_body`: "Every property portfolio is different..."
- [ ] Copy `Dentists/web/` to `Property/web/`
- [ ] Run `python scripts/sync_shared_components.py --niche Property`

### Property Build Test
- [ ] Run `cd Property/web && npm run build`
- [ ] Verify: 0 errors
- [ ] Verify: Pages compile successfully

### Property Metadata Verification
- [ ] Run `cd Property/web && npm run dev`
- [ ] Open `http://localhost:3000` in browser
- [ ] Check `<title>` tag
- [ ] Verify: Shows "Property Accountants UK" (NOT "Dental Finance Partners")
- [ ] Check meta tags
- [ ] Verify: All show Property data (NOT Dental data)
- [ ] Check JSON-LD schema
- [ ] Verify: Organization name is "Property Accountants UK"
- [ ] Check Google Analytics
- [ ] Verify: Uses Property GA4 ID (NOT `G-273RJY0LZQ`)

### Property Form Test
- [ ] Visit `/contact` on Property site
- [ ] Verify: Role options are property-specific (NOT dental)
- [ ] Submit test lead
- [ ] Check Supabase
- [ ] Verify: `source = 'property'` (NOT 'dentists')

---

## Phase 9: Cross-Contamination Tests

### Simultaneous Dev Servers
- [ ] Run Dentists dev server on port 3000
- [ ] Run Property dev server on port 3001
- [ ] Visit both in separate browser tabs
- [ ] Verify: Each shows its own branding
- [ ] Verify: No mixing of content

### Supabase Lead Tracking
- [ ] Submit lead from Dentists site
- [ ] Submit lead from Property site
- [ ] Query Supabase: `SELECT * FROM leads WHERE source = 'dentists'`
- [ ] Verify: Only Dentists leads
- [ ] Query Supabase: `SELECT * FROM leads WHERE source = 'property'`
- [ ] Verify: Only Property leads
- [ ] Verify: No cross-contamination

### Google Analytics Tracking
- [ ] Visit Dentists site, trigger events
- [ ] Check GA4 property `G-273RJY0LZQ`
- [ ] Verify: Events appear
- [ ] Visit Property site, trigger events
- [ ] Check Property GA4 property
- [ ] Verify: Events appear in Property property only
- [ ] Verify: No Dentists events in Property GA4
- [ ] Verify: No Property events in Dentists GA4

---

## Phase 10: GitHub Actions Integration Test

### Workflow Validation
- [ ] Check `.github/workflows/daily-content-pipeline.yml`
- [ ] Verify: Includes sync step before deployment
- [ ] Verify: Matrix includes both Dentists and Property
- [ ] Verify: Commits synced components

### Manual Workflow Trigger
- [ ] Go to GitHub Actions
- [ ] Trigger "Daily Content Pipeline" manually
- [ ] Watch workflow execution
- [ ] Verify: Sync step runs successfully
- [ ] Verify: Content generation runs for both niches
- [ ] Verify: Deployment runs for both niches
- [ ] Verify: Commits pushed successfully
- [ ] Check Vercel
- [ ] Verify: Only changed niches rebuild

---

## Phase 11: Vercel Deployment Tests

### Dentists Vercel Project
- [ ] Verify settings:
  - [ ] Root Directory: `Dentists/web`
  - [ ] Ignored Build Step: `git diff HEAD^ HEAD --quiet . ../niche.config.json ../../../shared/`
- [ ] Trigger deployment
- [ ] Verify: Build succeeds
- [ ] Visit live site
- [ ] Verify: All metadata is Dentists-specific
- [ ] Verify: Forms work correctly
- [ ] Verify: GA tracking works

### Property Vercel Project (After Setup)
- [ ] Create new Vercel project
- [ ] Configure settings:
  - [ ] Root Directory: `Property/web`
  - [ ] Ignored Build Step: `git diff HEAD^ HEAD --quiet . ../niche.config.json ../../../shared/`
- [ ] Connect to same GitHub repo
- [ ] Trigger deployment
- [ ] Verify: Build succeeds
- [ ] Visit live site
- [ ] Verify: All metadata is Property-specific (NOT Dentists)
- [ ] Verify: Forms work correctly
- [ ] Verify: GA tracking uses Property ID

---

## Phase 12: End-to-End Integration Test

### Full Daily Pipeline (Manual)
- [ ] Run `python agents/coordinator.py daily-pipeline`
- [ ] Verify: Content research runs
- [ ] Verify: Blog generation runs for Dentists
- [ ] Verify: Content stored in Supabase with `niche = 'dentists'`
- [ ] Verify: Deployment agent deploys content
- [ ] Verify: File written to `Dentists/web/content/blog/`
- [ ] Verify: Topic marked as used in `blog_topics`
- [ ] NOT: Any Property content generated (Property not active yet)

### Repeat for Property (After Activation)
- [ ] Run `python agents/blog_generation_agent.py --niche Property --max-posts 1`
- [ ] Verify: Content stored with `niche = 'property'`
- [ ] Verify: Uses `blog_topics_property` table
- [ ] Verify: File written to `Property/web/content/blog/`
- [ ] NOT: Any Dentists content affected

---

## Phase 13: Data Isolation Verification

### Supabase Queries

#### Leads Table
```sql
-- Should return only Dentists leads
SELECT * FROM leads WHERE source = 'dentists';

-- Should return only Property leads (after Property launch)
SELECT * FROM leads WHERE source = 'property';

-- Should return 0 (no leads without source)
SELECT * FROM leads WHERE source IS NULL;
```

#### Published Content Table
```sql
-- Should return only Dentists content
SELECT * FROM published_content WHERE niche = 'dentists';

-- Should return only Property content (after Property launch)
SELECT * FROM published_content WHERE niche = 'property';

-- Should return 0 (no content without niche)
SELECT * FROM published_content WHERE niche IS NULL;
```

#### Blog Topics Tables
```sql
-- Dentists topics
SELECT COUNT(*) FROM blog_topics WHERE used = false;

-- Property topics (after Property launch)
SELECT COUNT(*) FROM blog_topics_property WHERE used = false;
```

---

## Phase 14: Security & Environment Tests

### Environment Variables
- [ ] Verify `.env` is in `.gitignore`
- [ ] Verify no secrets in `niche.config.json`
- [ ] Verify GitHub Actions secrets are set:
  - [ ] `ANTHROPIC_API_KEY`
  - [ ] `SUPABASE_URL`
  - [ ] `SUPABASE_KEY`
  - [ ] `GITHUB_TOKEN`
- [ ] Verify Vercel environment variables:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `NEXT_PUBLIC_SITE_URL`

### API Key Security
- [ ] Verify Anthropic API key not committed
- [ ] Verify Supabase service key not committed
- [ ] Verify GA credentials not committed

---

## Phase 15: Performance & Monitoring

### Build Performance
- [ ] Time Dentists build
- [ ] Expected: < 30 seconds
- [ ] Time Property build (after setup)
- [ ] Expected: < 30 seconds

### Agent System
- [ ] Run `python agents/monitoring_dashboard.py status`
- [ ] Verify: Shows current system status
- [ ] Verify: Cost tracking working
- [ ] Verify: No errors in recent executions

### Cost Tracking
- [ ] Check `agent_costs` table in Supabase
- [ ] Verify: Costs tracked per niche
- [ ] Verify: Daily/monthly limits respected
- [ ] Verify: No cost overruns

---

## Phase 16: Documentation Verification

### README Files
- [ ] Read `shared/README.md`
- [ ] Verify: Accurately describes architecture
- [ ] Read `Admin/SHARED_ARCHITECTURE_QUICK_START.md`
- [ ] Verify: Commands are correct
- [ ] Read `Admin/COMPREHENSIVE_AUDIT_FINDINGS.md`
- [ ] Verify: All issues documented

### .cursorrules
- [ ] Read `.cursorrules`
- [ ] Verify: Reflects new architecture
- [ ] Verify: Commands are up to date

---

## SIGN-OFF CRITERIA

### Before Property Launch

All of the following must be TRUE:

- ✅ All Priority 1 fixes implemented
- ✅ Dentists builds successfully (0 errors)
- ✅ Dentists metadata is 100% dental-specific
- ✅ LeadForm shows dental role options
- ✅ StickyCTA shows dental text
- ✅ BlogPostRenderer shows dental CTA
- ✅ Lead submissions include `source = 'dentists'`
- ✅ No hardcoded values in shared components
- ✅ Sync script works correctly
- ✅ GitHub Actions workflow updated

### Before Production Deployment

All of the following must be TRUE:

- ✅ All above criteria met
- ✅ Property niche fully configured
- ✅ Property builds successfully (0 errors)
- ✅ Property metadata is 100% property-specific
- ✅ No cross-contamination between niches
- ✅ Both Vercel projects configured correctly
- ✅ Test leads submitted from both sites
- ✅ Supabase data properly isolated
- ✅ GA tracking isolated per niche
- ✅ Full daily pipeline tested

---

## ROLLBACK PLAN

If issues are found in production:

### Immediate Actions
1. Check Vercel deployment logs
2. Check Supabase for data corruption
3. Check GA for tracking issues

### Rollback Steps
1. Revert Git commit: `git revert HEAD`
2. Push to trigger Vercel rebuild
3. Verify: Previous version restored
4. Fix issues locally
5. Re-test before redeploying

### Emergency Contacts
- Vercel: Check deployment dashboard
- Supabase: Check database logs
- GitHub: Check Actions logs

---

## ESTIMATED TEST TIME

- Phase 1 (Fixes): 45 minutes
- Phase 2-6 (Dentists Tests): 30 minutes
- Phase 7-9 (Property Setup & Tests): 45 minutes
- Phase 10-11 (Deployment Tests): 30 minutes
- Phase 12-14 (Integration & Monitoring): 20 minutes
- **Total: ~2.5 hours**

---

**Checklist Status:** READY FOR EXECUTION  
**Next Step:** Implement Priority 1 fixes from audit findings
