# Shared Architecture - Quick Start Guide

## Overview

The centralized architecture allows you to manage multiple niche websites from a single codebase. Changes to shared components automatically cascade to all niches.

## Key Concepts

### 1. Shared Components Live in `/shared/web-core/`
These are the "single source of truth" for UI components and utilities:
- Layout (Header, Footer, Navigation)
- UI (Button, Card, Badge, etc.)
- Forms (ContactForm, LeadCapture)
- Blog (BlogCard, BlogList)
- Lib (blog.ts, schema.ts)

### 2. Each Niche Has a `niche.config.json`
This JSON file defines everything unique about the niche:
- Brand (name, colors, logo)
- Domain & contact info
- Navigation structure
- Locations & service areas
- Content strategy

### 3. Sync Script Copies Shared → Niches
Before building or deploying, run:
```bash
python scripts/sync_shared_components.py --niche Dentists
```

This ensures the niche has the latest shared components.

## Common Tasks

### Update a Shared Component (e.g., Header)

1. Edit the component in `/shared/web-core/components/layout/Header.tsx`
2. Sync to all niches:
   ```bash
   python scripts/sync_shared_components.py --all
   ```
3. Test each niche:
   ```bash
   cd Dentists/web && npm run build
   cd ../../Property/web && npm run build
   ```
4. Commit and push (GitHub Actions will auto-sync on deploy)

### Update Niche-Specific Branding (e.g., Dentists)

1. Edit `/Accounting/Dentists/niche.config.json`
2. Change `display_name`, `tagline`, `brand.primary_color`, etc.
3. Test:
   ```bash
   cd Dentists/web && npm run dev
   ```
4. Commit and push

### Add a New Page to a Niche (e.g., Dentists)

1. Create the page in `/Accounting/Dentists/web/src/app/new-page/page.tsx`
2. Use shared components:
   ```tsx
   import { Header } from '@/components/layout/Header';
   import { Footer } from '@/components/layout/Footer';
   import { siteConfig } from '@/config/site';
   
   export default function NewPage() {
     return (
       <>
         <Header />
         <main>Your unique content here</main>
         <Footer />
       </>
     );
   }
   ```
3. Test and deploy

### Add a New Niche (e.g., Restaurants)

1. Create directory:
   ```bash
   mkdir Restaurants
   ```
2. Copy config from Dentists:
   ```bash
   copy Dentists\niche.config.json Restaurants\niche.config.json
   ```
3. Edit `Restaurants/niche.config.json` with new branding
4. Copy web structure:
   ```bash
   xcopy Dentists\web Restaurants\web /E /I
   ```
5. Sync shared components:
   ```bash
   python scripts/sync_shared_components.py --niche Restaurants
   ```
6. Update GitHub Actions (add Restaurants to matrix)
7. Create Vercel project with Root Directory: `Restaurants/web`

## What NOT to Do

❌ **Don't edit synced files in niche folders**
- Files in `{Niche}/web/src/components/` are synced from `/shared/`
- Files in `{Niche}/web/src/lib/` are synced from `/shared/`
- Edits will be overwritten on next sync

✅ **Instead, edit the source in `/shared/web-core/`**

❌ **Don't hardcode niche-specific values in shared components**
- No "Dental Finance Partners" text in shared components
- No hardcoded colors, emails, or domains

✅ **Instead, use props or config**
```tsx
// Good: Uses config
<Header siteConfig={siteConfig} />

// Bad: Hardcoded
<Header title="Dental Finance Partners" />
```

## Git & Vercel

### Git Strategy
- **One repository** for all niches
- All niches commit to `main` branch
- Shared components at root

### Vercel Strategy
- **Separate Vercel project** per niche
- Each project has unique domain
- Configured to only build when its files change

**Dentists Vercel Project:**
- Root Directory: `Dentists/web`
- Ignored Build Step: `git diff HEAD^ HEAD --quiet . ../niche.config.json ../../../shared/`

**Property Vercel Project:**
- Root Directory: `Property/web`
- Ignored Build Step: `git diff HEAD^ HEAD --quiet . ../niche.config.json ../../../shared/`

This ensures:
- Dentists only rebuilds when Dentists files or shared components change
- Property only rebuilds when Property files or shared components change

## Troubleshooting

### Build fails after sync
1. Check TypeScript errors: `cd {Niche}/web && npm run build`
2. Verify imports are correct in shared components
3. Check `niche.config.json` is valid JSON

### Niche shows wrong branding
1. Verify `niche.config.json` has correct values
2. Check `src/config/niche-loader.ts` is importing correctly
3. Clear Next.js cache: `rm -rf .next && npm run build`

### Sync script fails
1. Validate shared structure: `python scripts/sync_shared_components.py --validate`
2. Check file permissions
3. Verify niche directory exists

## File Locations

- **Shared Components**: `/Accounting/shared/web-core/`
- **Sync Script**: `/Accounting/scripts/sync_shared_components.py`
- **Niche Configs**: `/Accounting/{Niche}/niche.config.json`
- **Documentation**: `/Accounting/Admin/`

## Benefits

✅ **Scalability**: Add new niches in ~15 minutes  
✅ **Consistency**: All niches use same UI patterns  
✅ **Maintainability**: Fix bugs once, applies everywhere  
✅ **Differentiation**: Each niche has unique brand and content  
✅ **Cost Efficiency**: No code duplication  
✅ **Deployment Safety**: Changes to one niche don't affect others
