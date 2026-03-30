# Niche Generator Guide

## Overview

The Niche Generator is an automated system for creating complete niche accounting websites in 1-2 hours. It uses AI (Claude Sonnet 4) for keyword research, config generation, and page creation, with comprehensive verification at each step.

**Cost per niche**: ~$2-3 (one-time)
**Time**: 1-2 hours (mostly automated)
**Output**: Complete niche site ready for deployment

## Quick Start

### Generate a New Niche

```bash
# Basic generation
python agents/generate_niche.py \
  --niche-id medical \
  --display-name "Medical Accountants UK" \
  --target-keyword "gp accountant"

# With template and full verification
python agents/generate_niche.py \
  --niche-id pharmacy \
  --display-name "Pharmacy Accountants UK" \
  --target-keyword "pharmacy accountant" \
  --template templates/niches/pharmacy/template.json \
  --verify-build
```

### What Gets Generated

1. **Keywords** (`{niche_id}_keywords.csv`)
   - 50-150 researched keywords
   - Search volume, difficulty, intent, categories
   - Generated via Google Autocomplete + AI analysis

2. **Config** (`{Niche}/niche.config.json`)
   - Complete site configuration
   - Homepage SEO (title, H1, description)
   - Brand colors, navigation, CTAs
   - Lead form, locations, content strategy

3. **Pages** (`{Niche}/web/src/app/`)
   - Homepage (`page.tsx`)
   - Services page (`services/page.tsx`)
   - About page (`about/page.tsx`)

4. **Brand Components** (`{Niche}/web/src/components/brand/`)
   - `BrandWordmarkHomeLink.tsx`
   - `BrandLogoHero.tsx`

5. **Database** (`supabase/migrations/`)
   - Table creation migration
   - Topic tree seeding migration

6. **Report** (`{niche_id}_generation_report.json`)
   - Verification results
   - Cost breakdown
   - Files created

## Architecture

### Generation Pipeline

```
1. Keyword Research
   ├─ Google Autocomplete (FREE)
   ├─ Related searches (FREE)
   ├─ Competitor analysis (FREE)
   └─ AI scoring ($0.50-1.00)

2. Config Generation
   ├─ Load template (optional)
   ├─ AI config generation ($0.20-0.40)
   └─ Homepage SEO optimization

3. Page Generation
   ├─ Homepage ($0.30-0.40)
   ├─ Services page ($0.20-0.30)
   └─ About page ($0.10-0.20)

4. Brand Components
   └─ Pure templating (FREE)

5. Database Setup
   ├─ Migration generation (FREE)
   └─ Topic seeding (FREE)

6. Verification (8 Gates)
   ├─ Keywords ✓
   ├─ Config ✓
   ├─ Topics ✓
   ├─ Pages ✓
   ├─ Build ✓ (optional)
   ├─ Database ✓ (optional)
   ├─ Integration ✓
   └─ Final ✓
```

### Verification Gates

**Gate 1: Keywords**
- Minimum 20 keywords
- Target keyword included
- Required fields present
- 3+ categories

**Gate 2: Config**
- All required fields
- Homepage SEO fields (title, H1, description)
- SEO field lengths (title ≤60, desc ≤160)
- Supabase table name correct
- 3+ categories, 3+ role options

**Gate 3: Topics**
- Migration file exists
- SQL syntax valid
- RLS policies included
- 20+ topics seeded

**Gate 4: Pages**
- All 3 pages generated
- Files exist and not empty
- TSX syntax valid
- No unreplaced placeholders

**Gate 5: Build** (optional, slow)
- Next.js build succeeds
- No TypeScript errors
- No build warnings

**Gate 6: Database** (optional, requires credentials)
- Table accessible
- Can query table

**Gate 7: Integration**
- No changes to existing niches (Dentists, Property)
- Manual updates documented

**Gate 8: Final**
- All required files present
- No placeholder values
- Git status clean

## Templates

Templates provide pre-researched data to speed up generation. Create a template JSON with:

```json
{
  "niche_id": "medical",
  "display_name": "Medical Accountants UK",
  "tagline": "Specialist accounting for UK medical professionals",
  "description": "...",
  "brand": {
    "primary_color": "#0891b2"
  },
  "seo": {
    "homepage_title": "GP Accountants UK | Medical Tax Specialists",
    "homepage_h1": "Specialist Accountants for GPs & Medical Professionals",
    "homepage_description": "..."
  },
  "content_strategy": {
    "categories": [
      "GP Tax & Accounts",
      "NHS Pension Planning",
      "Locum Tax"
    ]
  },
  "lead_form": {
    "role_options": [
      {"value": "GP (salaried)", "label": "GP (salaried)"},
      {"value": "GP (partner)", "label": "GP (partner)"}
    ]
  }
}
```

Templates are stored in `templates/niches/{niche_id}/template.json`.

## Post-Generation Steps

After generation completes:

### 1. Review Generated Files

```bash
# Check the niche directory
ls -la Medical/

# Review config
cat Medical/niche.config.json

# Review pages
cat Medical/web/src/app/page.tsx
```

### 2. Update System Integration

**agents/config/agent_config.py**:
```python
NICHE_CONFIG = {
    "medical": {
        "enabled": True,
        "ga4_measurement_id": "G-MEDICAL-PLACEHOLDER",
        "ga4_property_id": "000000000",  # Add real ID later
    }
}
```

**GitHub Workflows** (`.github/workflows/*.yml`):
```yaml
strategy:
  matrix:
    niche: [Dentists, Property, Medical]  # Add Medical
```

### 3. Install Dependencies

```bash
cd Medical/web
npm install
```

### 4. Verify Build

```bash
npm run build
```

### 5. Apply Migrations

```bash
# From project root
supabase db push
```

### 6. Setup GA4

1. Create GA4 property in Google Analytics
2. Update `niche.config.json` with real GA4 ID
3. Update `agent_config.py` with property ID
4. Add site verification meta tag

### 7. Commit Changes

```bash
git add Medical/
git add templates/niches/medical/
git add agents/config/agent_config.py
git add .github/workflows/
git commit -m "Add Medical niche"
git push
```

## Cost Breakdown (with Prompt Caching)

| Operation | Cost | Notes |
|-----------|------|-------|
| Keyword Research | $0.50-1.00 | One AI call for scoring |
| Config Generation | $0.20-0.40 | One AI call with caching |
| Homepage | $0.30-0.40 | Large prompt with caching |
| Services Page | $0.20-0.30 | Medium prompt with caching |
| About Page | $0.10-0.20 | Small prompt with caching |
| Brand Components | $0.00 | Pure templating |
| Database Setup | $0.00 | SQL generation |
| **Total** | **$1.30-2.50** | **One-time per niche** |

**Monthly blog costs** (with caching): $0.06-0.07 per post = ~$3.75/month for 2 posts/week

## Troubleshooting

### Build Fails

```bash
# Check TypeScript errors
cd Medical/web
npm run build

# Common issues:
# - Missing imports
# - Unreplaced placeholders
# - Invalid TSX syntax
```

### Verification Fails

```bash
# Re-run verification
python agents/generate_niche.py --niche-id medical --display-name "Medical Accountants UK" --target-keyword "gp accountant" --verify-build

# Check specific gate
# - Keywords: Check {niche_id}_keywords.csv
# - Config: Check Medical/niche.config.json
# - Pages: Check Medical/web/src/app/*.tsx
```

### Database Migration Fails

```bash
# Check migration syntax
cat supabase/migrations/*_create_blog_topics_medical.sql

# Apply manually
supabase db push

# Or reset and retry
supabase db reset
supabase db push
```

## Future Niches

Planned niches (in priority order):

1. **Medical** (GPs, consultants) - READY
2. **Pharmacy** (pharmacists, pharmacy owners)
3. **Solicitors** (law firms, solicitors)
4. **Restaurants** (restaurant owners, chefs)
5. **Contractors** (IT contractors, freelancers)

Each niche should have:
- Pre-researched template
- 5-7 content categories
- 4-5 client types (role options)
- Niche-specific pain points
- Unique brand color

## Maintenance

### Update Templates

```bash
# Edit template
vim templates/niches/medical/template.json

# Regenerate with updated template
python agents/generate_niche.py --niche-id medical --display-name "Medical Accountants UK" --target-keyword "gp accountant" --template templates/niches/medical/template.json
```

### Update Generator Scripts

All generator utilities are in `agents/utils/`:
- `keyword_researcher.py` - Keyword research
- `config_generator.py` - Config generation
- `page_generator.py` - Page generation
- `brand_generator.py` - Brand components
- `database_setup.py` - Database migrations
- `verifiers.py` - Verification system

### Cost Tracking

Cost tracking is in `agents/config/cost_tracker.py`. Update costs in `cost_limits.py`:

```python
COST_PER_OPERATION = {
    "blog_generation": 0.06,  # With prompt caching
    "niche_generation": 2.00,  # One-time niche setup
}
```

## Support

For issues or questions:
1. Check verification report: `{niche_id}_generation_report.json`
2. Review Admin/NICHE_GENERATOR_GUIDE.md (this file)
3. Check plan: `c:\Users\user\.cursor\plans\niche_launch_automation_e1bd784c.plan.md`
