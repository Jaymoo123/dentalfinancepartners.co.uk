# Accounts for Lawyers (Solicitors Niche)

**Domain**: www.accountsforlawyers.co.uk  
**Brand**: Burgundy (#7c2d37) + Gold (#d4af37)  
**Target**: UK solicitors, law firm partners, sole practitioners, practice managers  
**Status**: Foundation complete, ready for deployment

---

## Quick Start

### Local Development
```bash
cd web
npm install
npm run dev  # Runs on http://localhost:3002
```

### Generate Blog Posts
```bash
# After Supabase migrations are applied and keywords imported:
python generate_blog_supabase.py  # Generates one post from highest priority topic
```

### Batch Generate
```bash
# Generate 15 posts at once:
python ../scripts/batch_generate_solicitors.py --count 15
```

---

## Architecture

### Pages
- **Homepage** (`/`) - Primary SEO landing page, "accountant for solicitors" keyword
- **Services** (`/services`) - 6 service categories (SRA compliance, partnership tax, etc.)
- **About** (`/about`) - Legal sector specialization positioning
- **SRA Compliance** (`/sra-compliance`) - Unique differentiator page (trust accounting, client money)
- **Contact** (`/contact`) - Lead capture form with Supabase integration
- **Locations** (`/locations/*`) - 5 city pages (London, Manchester, Birmingham, Leeds, Bristol)
- **Blog** (`/blog`, `/blog/[slug]`) - SEO content hub (empty until posts generated)

### Database
- **Table**: `blog_topics_solicitors` (60 keywords imported from CSV)
- **Leads**: `leads` table with `source='solicitors'`
- **RLS**: Read-only for anon, full access for authenticated

### Content Generation
- **Model**: Claude Sonnet 4 (via Anthropic API)
- **System prompt**: Legal sector specialist tone, SRA compliance focus
- **Categories**: 7 categories aligned with keyword research
- **Cost**: ~£0.15-0.20 per post

### Configuration Files
- `niche.config.json` - Brand, navigation, SEO, lead form config
- `config_supabase.py` - Blog generation config
- `web/.env.local` - Environment variables (Supabase, site URL)
- `web/package.json` - Dependencies, port 3002

---

## SEO Strategy

### Target Keywords (60 total)
- **Priority 1** (15 keywords): Core transactional (accountant for solicitors, law firm accountant, SRA compliance)
- **Priority 2** (20 keywords): High-value informational (LLP conversion, partnership tax, trust accounting)
- **Priority 3** (25 keywords): Long-tail and location-based

### Content Categories
1. **SRA Compliance & Trust Accounting** - Client money, reconciliations, Accountant's Reports
2. **Sole Practitioner Tax** - Self-assessment, MTD, allowable expenses
3. **Partnership & LLP Accounting** - Partnership tax, LLP conversion, profit allocation
4. **VAT & Compliance** - VAT on legal services, disbursements, counsel fees
5. **Practice Finance & Cash Flow** - Lock-up reduction, working capital, drawings
6. **Practice Succession & Sale** - Valuations, goodwill, partner retirement
7. **Structure & Incorporation** - Partnership vs LLP, MTD, basis period reform

### Internal Linking
- `/services` - Main service overview
- `/sra-compliance` - SRA-specific deep dive
- `/about` - Trust and credibility
- `/contact` - Lead capture

---

## Brand Identity

### Colors
- **Primary (Burgundy)**: #7c2d37 - Authority, tradition, legal professionalism
- **Accent (Gold)**: #d4af37 - Premium, established, trustworthy
- **Neutrals**: Professional grays, clean backgrounds

### Tone
- Direct, professional, no fluff
- Plain English (avoid jargon unless standard in legal sector)
- Practical and grounded (not promotional)
- Write as if explaining to a legal colleague who understands law but not accounting

### Key Differentiators
1. **100% legal sector focus** - Only work with solicitors and law firms
2. **SRA compliance expertise** - 100% pass rate on Accountant's Reports
3. **Partnership/LLP specialization** - Deep knowledge of legal practice structures
4. **Transparent pricing** - Fixed fees, no hidden charges

---

## Deployment Checklist

### Pre-Deployment
- ✅ Next.js build passes (21 routes)
- ✅ TypeScript compilation successful
- ✅ All pages have solicitor-specific content
- ✅ Supabase integration configured
- ✅ Lead form tested locally
- ✅ Git commits pushed to main

### Vercel Deployment
- [ ] Create new Vercel project
- [ ] Set root directory: `Solicitors/web`
- [ ] Add environment variables (NEXT_PUBLIC_SITE_URL, SUPABASE_URL, SUPABASE_ANON_KEY)
- [ ] Deploy and verify build
- [ ] Configure custom domain (accountsforlawyers.co.uk)
- [ ] Update DNS records
- [ ] Verify SSL certificate

### Post-Deployment
- [ ] Apply Supabase migrations (create blog_topics_solicitors, update leads constraint)
- [ ] Import 60 keywords to Supabase
- [ ] Generate 15-20 foundational blog posts
- [ ] Set up GA4 property and update config
- [ ] Verify in Google Search Console
- [ ] Submit sitemap to GSC
- [ ] Enable agent automation in agent_config.py

---

## File Structure

```
Solicitors/
├── README.md                          # This file
├── niche.config.json                  # Brand, SEO, navigation config
├── config_supabase.py                 # Blog generation config
├── generate_blog_supabase.py          # Blog generator (Claude Sonnet 4)
└── web/                               # Next.js 15 site
    ├── package.json                   # Dependencies (port 3002)
    ├── next.config.ts                 # Next.js config
    ├── .env.local                     # Environment variables (not committed)
    ├── content/blog/                  # Generated blog posts (markdown)
    ├── public/                        # Static assets
    └── src/
        ├── app/                       # Next.js App Router pages
        ├── components/                # React components
        ├── lib/                       # Utilities (blog, supabase, schema)
        ├── config/                    # Site configuration
        └── types/                     # TypeScript types
```

---

## Related Documentation

- **Deployment guide**: `Admin/SOLICITORS_DEPLOYMENT_READY.md`
- **Keyword research**: `Admin/Topics/solicitors_keywords.csv`
- **Template**: `templates/niches/solicitors/template.json`
- **Migrations**: `supabase/migrations/20260401000001_*.sql`
- **Agent config**: `agents/config/agent_config.py`
- **GSC config**: `agents/config/gsc_config.py`

---

## Support

For questions or issues, refer to:
- **Niche generator guide**: `Admin/NICHE_GENERATOR_GUIDE.md`
- **Project summary**: `Admin/PROJECT_SUMMARY.md`
- **Start here**: `Admin/START_HERE.md`
