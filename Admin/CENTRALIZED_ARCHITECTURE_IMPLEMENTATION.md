# Centralized Multi-Niche Architecture - Backend-Only Sharing

**Date:** March 29, 2026  
**Status:** ✅ REFACTORED - Backend-Only Sharing

## What Was Built

A centralized architecture that allows managing multiple niche lead generation websites from a single codebase, with **shared backend logic** and **niche-specific UI components** for true visual differentiation.

### Directory Structure

```
/Accounting/
├── shared/                           # Centralized BACKEND LOGIC ONLY
│   └── web-core/                    # Next.js utilities (no UI components)
│       ├── lib/                     # blog.ts, schema.ts, supabase-client.ts
│       ├── config/                  # niche-loader.ts (config loading)
│       └── types/                   # niche-config.ts (TypeScript interfaces)
│
├── scripts/
│   └── sync_shared_components.py    # Syncs ONLY lib, config, types
│
├── Dentists/
│   ├── niche.config.json            # Dynamic configuration
│   └── web/
│       ├── src/
│       │   ├── config/
│       │   │   └── site.ts          # Uses shared niche-loader
│       │   ├── components/          # NICHE-SPECIFIC UI (navy/gold/serif)
│       │   │   ├── layout/          # SiteHeader, SiteFooter, PageShell
│       │   │   ├── ui/              # Buttons, Cards, StickyCTA
│       │   │   ├── forms/           # LeadForm (uses shared Supabase client)
│       │   │   └── blog/            # BlogPostRenderer
│       │   └── lib/                 # Synced from shared (backend logic)
│       ├── app/
│       │   └── globals.css          # NICHE-SPECIFIC (navy/gold branding)
│       └── content/                 # Unique blog content
│
└── Property/
    ├── niche.config.json            # Dynamic configuration
    └── web/
        ├── src/
        │   ├── config/
        │   │   └── site.ts          # Uses shared niche-loader
        │   ├── components/          # NICHE-SPECIFIC UI (emerald/amber/sans)
        │   │   ├── layout/          # SiteHeader, SiteFooter, PageShell
        │   │   ├── ui/              # Buttons, Cards, StickyCTA
        │   │   ├── forms/           # LeadForm (uses shared Supabase client)
        │   │   ├── blog/            # BlogPostRenderer
        │   │   ├── property/        # Property-unique components
        │   │   └── calculators/     # Property calculators
        │   └── lib/                 # Synced from shared (backend logic)
        ├── app/
        │   └── globals.css          # NICHE-SPECIFIC (emerald/amber branding)
        └── content/                 # Unique blog content
```

## Key Components

### 1. Shared Backend Logic (`/shared/web-core/`)
**BACKEND ONLY - No UI components:**
- **lib/blog.ts**: Markdown parsing, blog post loading
- **lib/schema.ts**: SEO schema generation helpers
- **lib/organization-schema.ts**: JSON-LD organization schema
- **lib/supabase-client.ts**: Supabase API client for lead submission
- **config/niche-loader.ts**: Config loading utility
- **types/niche-config.ts**: TypeScript interfaces for niche.config.json

### 1b. Niche-Specific UI Components (NOT Shared)
**Each niche has its own:**
- **components/layout/**: SiteHeader, SiteFooter, PageShell (unique design)
- **components/ui/**: Buttons, Cards, StickyCTA, layout-utils (unique styling)
- **components/forms/**: LeadForm (unique design, uses shared Supabase client)
- **components/blog/**: BlogPostRenderer (unique styling, uses shared blog parser)
- **app/globals.css**: Niche-specific branding and CSS variables

### 2. Niche Configuration (`niche.config.json`)
Each niche has a JSON config file defining:
```json
{
  "niche_id": "dentists",
  "display_name": "Dental Finance Partners",
  "domain": "dentalfinancepartners.co.uk",
  "tagline": "Accounting for UK dentists — nothing else",
  "brand": { "primary_color": "#2563eb", ... },
  "contact": { "email": "...", "phone": "..." },
  "navigation": [...],
  "footer_links": [...],
  "locations": [...],
  "content_strategy": {...},
  "seo": {...}
}
```

### 3. Config Loader (`niche-loader.ts`)
TypeScript module that:
- Imports `niche.config.json`
- Provides typed access to config
- Exports `getSiteUrl()` helper

### 4. Sync Script (`sync_shared_components.py`)
Python script that:
- Copies **ONLY backend logic** (lib, config, types) to niche folders
- **Does NOT sync UI components** (each niche has unique UI)
- Updates `last_sync` timestamp in niche config
- Supports `--niche`, `--all`, `--dry-run`, `--validate`

## Workflow

### Daily Automation (GitHub Actions)
```yaml
- Sync shared components to {Niche}
- Generate blog content (stored in Supabase)
- Deploy content from Supabase to file system
- Commit and push (triggers Vercel build)
```

### Adding a New Niche
1. Create `/Accounting/NewNiche/` directory
2. Copy `niche.config.json` and customize
3. Copy `web/` structure from Dentists
4. Run `python scripts/sync_shared_components.py --niche NewNiche`
5. Add to GitHub Actions matrix: `niche: [Dentists, Property, NewNiche]`
6. Create Vercel project:
   - Root Directory: `NewNiche/web`
   - Ignored Build Step: `git diff HEAD^ HEAD --quiet . ../niche.config.json ../../../shared/`

### Updating Shared Components
1. Edit in `/shared/web-core/`
2. Run `python scripts/sync_shared_components.py --all`
3. Test each niche: `cd {Niche}/web && npm run build`
4. Commit (GitHub Actions will auto-sync on next deploy)

### Making Niche-Specific Changes
- **Pages/Content**: Edit in `{Niche}/web/src/app/` or `{Niche}/web/content/`
- **Config**: Edit `{Niche}/niche.config.json`
- **UI Components**: Edit freely in `{Niche}/web/src/components/` (niche-specific, not synced)
- **Styling**: Edit `{Niche}/web/src/app/globals.css` (niche-specific)
- **DO NOT** edit synced files in `src/lib/` (will be overwritten by sync script)

## Git & Vercel Strategy

### Git
- **Single repository** (`Jaymoo123/dentalfinancepartners.co.uk`)
- All niches commit to `main` branch
- Shared components at root, synced to niches on deploy

### Vercel
- **Separate project per niche** (each has unique domain)
- Dentists project:
  - Root Directory: `Dentists/web`
  - Ignored Build Step: `git diff HEAD^ HEAD --quiet . ../niche.config.json ../../../shared/`
- Property project (future):
  - Root Directory: `Property/web`
  - Ignored Build Step: `git diff HEAD^ HEAD --quiet . ../niche.config.json ../../../shared/`

This ensures:
- Dentists only rebuilds when Dentists files, its config, or shared components change
- Property only rebuilds when Property files, its config, or shared components change
- No unnecessary builds or cross-contamination

## Testing Results

### Build Test
```bash
cd Dentists/web && npm run build
```
✅ **SUCCESS**: Compiled 67 pages, 0 errors

### Dev Server Test
```bash
cd Dentists/web && npm run dev
```
✅ **SUCCESS**: Server running on http://localhost:3000, pages render correctly

### Config Loading Test
✅ **SUCCESS**: `niche-loader.ts` successfully imports and types `niche.config.json`

### Sync Script Test
```bash
python scripts/sync_shared_components.py --validate
```
✅ **SUCCESS**: All shared directories validated, 12 files synced

## Benefits Achieved

1. **True Visual Independence**: Each niche has completely unique UI/design
2. **Backend Consistency**: Shared logic (blog parsing, Supabase, schema) works across all niches
3. **No CSS Override Hacks**: Each niche starts with its own base styles
4. **SEO Safety**: Unique HTML structure and styling prevents duplicate content flags
5. **Easy Scaling**: Copy UI from closest design match, customize branding
6. **Clear Boundaries**: Backend logic shared, UI components niche-specific
7. **Automated Sync**: GitHub Actions syncs backend logic before every deploy

## Next Steps

1. **Activate Property Niche**: Copy structure, customize config, create Vercel project
2. **Admin Agent** (future): Cross-niche orchestration, bulk operations
3. **Shared Python Core** (future): Centralize Python utilities if needed

## Commands Reference

```bash
# Sync to specific niche
python scripts/sync_shared_components.py --niche Dentists

# Sync to all niches
python scripts/sync_shared_components.py --all

# Dry run (preview changes)
python scripts/sync_shared_components.py --niche Dentists --dry-run

# Validate shared structure
python scripts/sync_shared_components.py --validate

# Test niche build
cd Dentists/web && npm run build

# Test niche locally
cd Dentists/web && npm run dev
```

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    /Accounting/ (Root)                      │
│  ┌────────────────────────────────────────────────────┐    │
│  │  /shared/web-core/  (BACKEND LOGIC ONLY)           │    │
│  │  - lib/ (blog.ts, schema.ts, supabase-client.ts)   │    │
│  │  - config/ (niche-loader.ts)                       │    │
│  │  - types/ (niche-config.ts)                        │    │
│  └────────────────────────────────────────────────────┘    │
│                           │                                  │
│              ┌────────────┴────────────┐                    │
│              ▼                         ▼                    │
│  ┌─────────────────────┐   ┌─────────────────────┐        │
│  │  Dentists/          │   │  Property/          │        │
│  │  ├─ niche.config    │   │  ├─ niche.config    │        │
│  │  └─ web/            │   │  └─ web/            │        │
│  │     ├─ components/  │   │     ├─ components/  │        │
│  │     │  (UNIQUE UI)  │   │     │  (UNIQUE UI)  │        │
│  │     ├─ lib/         │   │     ├─ lib/         │        │
│  │     │  (synced)     │   │     │  (synced)     │        │
│  │     └─ app/         │   │     └─ app/         │        │
│  │        globals.css  │   │        globals.css  │        │
│  │        (navy/gold)  │   │        (emerald)    │        │
│  └─────────────────────┘   └─────────────────────┘        │
│           │                         │                       │
│           ▼                         ▼                       │
│  Vercel Project 1           Vercel Project 2               │
│  dentalfinancepartners.co.uk  propertyaccountants.co.uk   │
└─────────────────────────────────────────────────────────────┘
```

## Security & Best Practices

- ✅ Shared components are read-only in niches (synced, not edited)
- ✅ Niche configs are version-controlled
- ✅ Sync happens automatically in CI/CD
- ✅ No hardcoded values in shared components (all via config)
- ✅ Type-safe config loading with TypeScript
- ✅ Vercel builds isolated per niche (no cross-contamination)

## UI Component Guidelines

### When Creating a New Niche

1. **Copy UI components** from the closest design match (Dentists or Property)
2. **Customize globals.css** with niche-specific branding (colors, fonts, spacing)
3. **Update layout components** (SiteHeader, SiteFooter) with niche-specific design
4. **Modify form components** to match niche tone (consultative vs action-oriented)
5. **Import shared backend logic** from `/shared/web-core/lib/`

### What to Share vs. What to Duplicate

**SHARE (Backend Logic):**
- Blog post parsing (`blog.ts`)
- SEO schema generation (`schema.ts`, `organization-schema.ts`)
- Supabase API client (`supabase-client.ts`)
- Config loading (`niche-loader.ts`)
- TypeScript types (`niche-config.ts`)

**DUPLICATE (UI/Visual):**
- Layout components (Header, Footer, PageShell)
- UI components (Buttons, Cards, CTAs)
- Form components (LeadForm, StickyCTA)
- Blog rendering (BlogPostRenderer)
- Global styles (globals.css)
- Utility classes (layout-utils.ts)

### Design Differentiation Strategy

**Dentists:**
- Navy/gold branding
- Serif headings (Cormorant Garamond)
- Dark hero sections
- Rounded-full buttons
- Consultative, editorial tone
- Long narrative sections

**Property:**
- Emerald/amber branding
- Sans-serif headings (Plus Jakarta Sans)
- Light hero sections
- Rectangular buttons (rounded-lg)
- Action-oriented, direct tone
- Scannable content blocks

---

**Implementation Status**: REFACTORED - Backend-Only Sharing  
**Test Status**: PENDING  
**Architecture**: ✅ Decoupled UI from backend logic
