# Centralized Multi-Niche Architecture Proposal

**Goal:** Make changes once at `/Accounting/` level, cascade to all niches automatically.

---

## Current Problem

**Today's Structure:**
```
/Accounting/
  /Dentists/
    /web/ (complete Next.js site)
    config_supabase.py
    generate_blog_supabase.py
  /Property/
    /web/ (complete Next.js site - duplicate code)
    config_supabase.py (duplicate)
    generate_blog_supabase.py (duplicate)
```

**Issues:**
- Duplicate Next.js components in each niche
- Duplicate Python scripts
- Change header? Edit 2+ files
- Fix bug? Fix in multiple places
- Add niche #3? Copy everything again

---

## Proposed Architecture

### Layer 1: Shared Core (`/Accounting/shared/`)
**What lives here:** Code that's identical across ALL niches

```
/Accounting/
  /shared/
    /web-core/                    # Shared Next.js components
      /components/
        /layout/
          SiteHeader.tsx          # Uses niche config for branding
          SiteFooter.tsx
          PageShell.tsx
        /ui/
          Breadcrumb.tsx
          CTASection.tsx
          StickyCTA.tsx
        /forms/
          LeadForm.tsx            # Submits to unified leads table
        /blog/
          BlogPostRenderer.tsx
      /lib/
        blog.ts                   # Generic blog loading
        schema.ts                 # Generic schema generation
      /styles/
        globals.css               # Base styles
      /config/
        base-site-config.ts       # Default values
    
    /python-core/                 # Shared Python utilities
      blog_generator.py           # Generic blog generation
      content_parser.py
      image_generator.py
      schema_builder.py
    
    shared_supabase_config.py     # Already exists
```

### Layer 2: Niche Configuration (`/Accounting/{Niche}/`)
**What lives here:** Only niche-specific configuration and overrides

```
/Accounting/Dentists/
  niche.config.json               # Niche-specific settings
  /web/
    /content/                     # Only content is niche-specific
      /blog/
        *.md
    /public/                      # Only branding assets
      /brand/
        logo.png
    /src/
      /app/                       # Next.js app (imports from shared)
      /config/
        site.ts                   # Extends /shared/web-core/config/base-site-config.ts
    package.json                  # Standard Next.js deps
    next.config.ts                # Minimal, imports shared logic
```

**niche.config.json example:**
```json
{
  "niche_id": "dentists",
  "display_name": "Dental Finance Partners",
  "domain": "dentalfinancepartners.co.uk",
  "brand": {
    "primary_color": "#2563eb",
    "logo_path": "/brand/logo.png",
    "tagline": "Specialist accountants for UK dental practices"
  },
  "content": {
    "audience": "UK dental practice owners and associate dentists",
    "categories": ["Practice accounting", "Associate tax", "Buying a practice"],
    "supabase_table": "blog_topics"
  },
  "lead_form": {
    "source_identifier": "dentists",
    "success_redirect": "/thank-you",
    "fields": ["name", "email", "phone", "practice_name"]
  },
  "seo": {
    "organization_name": "Dental Finance Partners",
    "service_areas": ["London", "Manchester", "Birmingham"]
  }
}
```

### Layer 3: Build System (`/Accounting/scripts/`)
**What lives here:** Build scripts that work for ANY niche

```
/Accounting/scripts/
  build-niche.py                  # Builds any niche site
  deploy-niche.py                 # Deploys any niche
  sync-shared-components.py       # Copies shared code to niches
  validate-niche-config.py        # Validates niche.config.json
```

---

## How Changes Cascade

### Example 1: Update Header Component

**Before (Manual):**
```bash
# Edit Dentists header
vim Dentists/web/src/components/layout/SiteHeader.tsx

# Copy to Property
cp Dentists/web/src/components/layout/SiteHeader.tsx Property/web/src/components/layout/

# Repeat for future niches...
```

**After (Automatic):**
```bash
# Edit once in shared
vim shared/web-core/components/layout/SiteHeader.tsx

# Sync to all niches
python scripts/sync-shared-components.py --all

# Or let GitHub Actions do it automatically on push
```

### Example 2: Add New Form Field

**Edit:** `/shared/web-core/components/forms/LeadForm.tsx`

**Component reads:** `/{Niche}/niche.config.json` for field configuration

**Result:** All niches get the new field, but each controls which fields to show

---

## Implementation Strategy

### Phase 1: Extract Shared Components (Safe)
1. Create `/shared/web-core/` structure
2. Copy components from Dentists (the working one)
3. Make components config-driven (read from niche.config.json)
4. Test with Dentists first (no changes to Property yet)

### Phase 2: Niche Inheritance Pattern
1. Dentists imports from `/shared/web-core/`
2. Overrides only what's different (branding, content)
3. Verify Dentists still works identically

### Phase 3: Apply to Property
1. Property uses same shared components
2. Only customize via `niche.config.json`
3. Much smaller codebase per niche

### Phase 4: Automation
1. GitHub Actions: On push to `/shared/`, auto-sync to all niches
2. Build validation: Test all niches when shared code changes
3. Rollback capability if shared change breaks a niche

---

## Python Scripts Centralization

### Current Duplication:
- `generate_blog_supabase.py` exists in both Dentists/ and Property/
- Nearly identical except for config imports

### Proposed:
```python
# /Accounting/shared/python-core/blog_generator.py
class BlogGenerator:
    def __init__(self, niche_config_path: str):
        self.config = self._load_niche_config(niche_config_path)
        # ... rest is generic
    
    def generate(self, topic: str):
        # Generic generation logic
        # Uses self.config for niche-specific details
```

### Usage:
```python
# /Accounting/Dentists/generate_blog.py (tiny wrapper)
from shared.python_core.blog_generator import BlogGenerator

generator = BlogGenerator("./niche.config.json")
generator.generate(topic)
```

---

## Admin Agent Design

### Purpose:
Cross-niche orchestration and management

### Capabilities:

**1. Multi-Niche Content Strategy**
```python
# Analyze all niches together
python agents/admin_agent.py --analyze-all

# Output:
# - Topic overlap between niches
# - Cross-niche content opportunities
# - Budget allocation recommendations
```

**2. Bulk Operations**
```python
# Update all niches at once
python agents/admin_agent.py --update-component SiteHeader

# Deploy all niches
python agents/admin_agent.py --deploy-all

# Health check across all niches
python agents/admin_agent.py --health-check
```

**3. Niche Comparison Dashboard**
```
Niche Performance Comparison:
┌──────────┬───────┬────────┬───────┬─────────┐
│ Niche    │ Posts │ Leads  │ Cost  │ ROI     │
├──────────┼───────┼────────┼───────┼─────────┤
│ Dentists │ 46    │ 12     │ $2.10 │ High    │
│ Property │ 0     │ 0      │ $0.00 │ Pending │
└──────────┴───────┴────────┴───────┴─────────┘
```

**4. Content Strategy Coordination**
- Prevent topic overlap between niches
- Identify cross-niche opportunities
- Allocate budget based on performance

**5. Emergency Controls**
```python
# Pause all niches
python agents/admin_agent.py --pause-all

# Resume specific niche
python agents/admin_agent.py --resume Dentists

# Rollback shared component change
python agents/admin_agent.py --rollback-shared SiteHeader
```

---

## Safety Mechanisms

### 1. Niche Isolation
- Each niche can override shared components
- Breaking changes in shared code don't force-apply
- Opt-in upgrade system

### 2. Validation Pipeline
```python
# Before syncing shared changes
1. Run tests on Dentists
2. If pass, sync to Property
3. If pass, mark as stable
4. Future niches auto-get stable version
```

### 3. Version Tracking
```json
// niche.config.json
{
  "shared_version": "1.2.0",
  "overrides": ["SiteHeader", "LeadForm"],
  "last_sync": "2026-03-29T12:00:00Z"
}
```

### 4. Rollback Capability
- Git tracks all shared component changes
- Can rollback shared code without affecting niche-specific content
- Each niche can pin to specific shared version

---

## Migration Path (Safe & Incremental)

### Week 1: Setup Infrastructure
1. Create `/shared/` structure
2. Extract Dentists components to `/shared/web-core/`
3. Make components config-driven
4. Test Dentists with new structure (should be identical)

### Week 2: Apply to Property
1. Property imports from `/shared/`
2. Customize via `niche.config.json`
3. Much less code duplication

### Week 3: Automation
1. Add sync scripts
2. GitHub Actions for auto-sync
3. Admin agent for orchestration

---

## Benefits

### For You (Admin):
- Edit header once → All niches update
- Fix bug once → All niches fixed
- Add niche #3 → 90% less code to write
- Monitor all niches from one dashboard

### For System:
- Single source of truth
- Easier testing (test shared components once)
- Faster to add new niches
- Consistent UX across all niches

### For Costs:
- Less code to maintain = less time
- Shared components = easier to optimize
- Bulk operations = more efficient

---

## Recommendation

**Start with Phase 1 (Extract & Centralize):**
1. Create shared structure
2. Move components
3. Test thoroughly with Dentists
4. Once stable, apply to Property

**Then add Admin Agent for:**
- Cross-niche analytics
- Bulk operations
- Emergency controls

This gives you a scalable foundation for 5-10+ niches without exponential complexity.

**Should we proceed with Phase 1?**
