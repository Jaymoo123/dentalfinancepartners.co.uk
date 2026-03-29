# Shared Components & Configuration

This directory contains all shared code and configuration used across multiple niche lead generation websites (Dentists, Property, etc.).

## Architecture

```
/Accounting/
├── shared/                    # Shared code (this directory)
│   ├── web-core/             # Next.js components & utilities
│   │   ├── components/       # React components
│   │   │   ├── layout/       # Header, Footer, Navigation
│   │   │   ├── ui/           # Button, Card, Badge, etc.
│   │   │   ├── forms/        # ContactForm, LeadCapture
│   │   │   └── blog/         # BlogCard, BlogList
│   │   └── lib/              # Utilities (blog.ts, schema.ts)
│   └── python-core/          # Python utilities (future)
│
├── Dentists/                  # Niche-specific implementation
│   ├── niche.config.json     # Niche configuration
│   └── web/                  # Next.js site
│       ├── src/
│       │   ├── components/   # Synced from shared/web-core
│       │   ├── lib/          # Synced from shared/web-core
│       │   ├── config/       # Loads niche.config.json
│       │   └── app/          # Niche-specific pages/content
│       └── content/          # Niche-specific blog posts
│
└── Property/                  # Another niche (same structure)
```

## What's Shared vs. What's Unique

### SHARED (Safe to centralize)
- **Layout Components**: Header, Footer, Navigation (styled via config)
- **UI Components**: Button, Card, Badge, etc. (generic, reusable)
- **Form Components**: ContactForm, LeadCapture (submit to same Supabase)
- **Blog Components**: BlogCard, BlogList (render any blog content)
- **Utilities**: blog.ts, schema.ts, organization-schema.ts
- **Python Scripts**: Blog generation, agents, utilities

### UNIQUE (Must remain per-niche)
- **Brand Identity**: Logo, colors, fonts (via niche.config.json)
- **Copy & Messaging**: Taglines, descriptions, hero text
- **Navigation Structure**: Menu items, footer links
- **Page Content**: Services, About, Locations (in /app directory)
- **Blog Content**: Posts in /content/blog/
- **Domain & SEO**: Domain name, contact info, service areas

## How It Works

### 1. Sync Process
Before building or deploying, run:
```bash
python scripts/sync_shared_components.py --niche Dentists
```

This copies latest shared components into the niche's `web/src/` directory.

### 2. Configuration Loading
Each niche has a `niche.config.json` that defines:
- Brand (name, colors, logo)
- Contact info
- Navigation structure
- Locations
- Content strategy

The Next.js app loads this via `src/config/niche-loader.ts` and uses it to populate `site.ts`.

### 3. Component Customization
Shared components accept props for customization:
```tsx
<Header siteConfig={siteConfig} />  // Uses niche config
<Footer links={siteConfig.footer} />
<ContactForm source={siteConfig.domain} />
```

## Workflow

### Adding a New Niche
1. Create `/Accounting/NewNiche/` directory
2. Copy `niche.config.json` from Dentists and customize
3. Copy `web/` structure from Dentists
4. Run `python scripts/sync_shared_components.py --niche NewNiche`
5. Update GitHub Actions matrix to include NewNiche
6. Create new Vercel project pointing to `NewNiche/web`

### Updating Shared Components
1. Edit files in `/shared/web-core/`
2. Run `python scripts/sync_shared_components.py --all`
3. Test each niche locally
4. Commit changes (GitHub Actions will auto-sync on deploy)

### Making Niche-Specific Changes
1. Edit files in `/Accounting/{Niche}/web/src/app/` (pages)
2. Edit files in `/Accounting/{Niche}/web/content/` (blog posts)
3. Edit `/Accounting/{Niche}/niche.config.json` (config)
4. Do NOT edit synced files in `src/components/` or `src/lib/` (they'll be overwritten)

## Git & Vercel Strategy

### Git
- **Single repository** for all niches
- Each niche commits to the same `main` branch
- Shared components live at root and sync to niches on deploy

### Vercel
- **Separate Vercel project** for each niche (each has its own domain)
- Each project configured with:
  - Root Directory: `{Niche}/web` (e.g., `Dentists/web`)
  - Ignored Build Step: `git diff HEAD^ HEAD --quiet . ../niche.config.json ../../../shared/`
  - This ensures builds only trigger when that niche's files change

## Benefits

1. **Scalability**: Add new niches in minutes, not hours
2. **Consistency**: All niches use same UI patterns and utilities
3. **Maintainability**: Fix a bug once, it applies everywhere
4. **Differentiation**: Each niche maintains unique brand and content
5. **Cost Efficiency**: No code duplication across niches
6. **Deployment Safety**: Changes to one niche don't rebuild others

## Version Control

The `niche.config.json` includes:
- `shared_components_version`: Tracks which version of shared components this niche uses
- `last_sync`: Timestamp of last sync operation

This helps debug version mismatches and ensures consistency.
