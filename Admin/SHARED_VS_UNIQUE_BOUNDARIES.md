# Shared vs Unique: Clear Boundaries

## The Line: What Should Be Shared vs Unique

### ✅ SAFE TO SHARE (Identical functionality, different data)

#### 1. Layout Components
- `SiteHeader.tsx` - Reads niche config for logo/colors/nav
- `SiteFooter.tsx` - Reads niche config for links/text
- `PageShell.tsx` - Generic page wrapper
- `Breadcrumb.tsx` - Generic breadcrumb logic

**Why safe:** Structure is identical, only data changes (logo, colors, text)

#### 2. UI Components
- `CTASection.tsx` - Generic CTA, text from config
- `StickyCTA.tsx` - Generic sticky bar
- `BlogPostRenderer.tsx` - Markdown rendering (content is different, renderer is same)

**Why safe:** Pure UI logic, no niche-specific business rules

#### 3. Form Components
- `LeadForm.tsx` - Generic form, fields from config
- Submits to same Supabase `leads` table with `source` field

**Why safe:** Same form logic, different source identifier

#### 4. Utility Functions
- `blog.ts` - Load markdown files (same logic, different content)
- `schema.ts` - Generate SEO schema (same logic, different org data)
- `organization-schema.ts` - Organization structured data

**Why safe:** Pure functions, data comes from config

#### 5. Python Scripts
- `generate_blog_supabase.py` - Same generation logic
- `content_parser.py` - Same parsing
- `image_generator.py` - Same image generation
- `schema_builder.py` - Same schema building

**Why safe:** Logic is identical, only config differs

---

### ❌ MUST STAY UNIQUE (Niche-specific content/branding)

#### 1. Content
- `/content/blog/*.md` - Completely different articles
- Blog topics in Supabase - Different audiences

**Why unique:** This IS the differentiation

#### 2. Branding Assets
- `/public/brand/logo.png` - Different logos
- `/public/favicon.ico` - Different favicons
- Brand colors, fonts, imagery

**Why unique:** Visual identity must be distinct

#### 3. Site Configuration
- `niche.config.json` - All niche-specific settings
- Domain, organization name, service areas
- Target audience, categories

**Why unique:** Each niche targets different audience

#### 4. Page Content
- Homepage copy (`/src/app/page.tsx` content)
- About page text
- Services descriptions
- Location-specific pages

**Why unique:** Marketing message is different

#### 5. SEO Metadata
- Organization name
- Service descriptions
- Local SEO (different cities/areas)

**Why unique:** Different businesses, different SEO

---

## Git & Vercel Strategy

### Option A: Single Git Repo, Multiple Vercel Projects (RECOMMENDED)

**Git Structure:**
```
github.com/Jaymoo123/dentalfinancepartners.co.uk (one repo)
  /Accounting/
    /shared/
    /Dentists/
    /Property/
```

**Vercel Projects:**
```
Project 1: dentalfinancepartners-co-uk
  - Root Directory: Dentists/web
  - Domain: dentalfinancepartners.co.uk
  - Deploys on: push to main (if Dentists/ changes)

Project 2: propertyfinancepartners-co-uk (new)
  - Root Directory: Property/web
  - Domain: propertyfinancepartners.co.uk
  - Deploys on: push to main (if Property/ changes)
```

**How Vercel Knows What to Deploy:**
- Vercel's "Ignored Build Step" setting
- Only rebuild if specific directory changed
- Example: `git diff HEAD^ HEAD --quiet Dentists/web/ || exit 0`

**Benefits:**
- ✅ Single repo = easier to manage shared code
- ✅ Atomic commits across niches
- ✅ Shared components in same repo
- ✅ Each niche has own domain/project
- ✅ Independent deployments

### Option B: Separate Git Repos (NOT RECOMMENDED)

**Problems:**
- Can't share code easily between repos
- Need git submodules (complex)
- Harder to sync shared components
- More repos to manage

---

## Proposed Implementation

### 1. Shared Components (Generic, Config-Driven)

**Example: SiteHeader.tsx**
```typescript
// /shared/web-core/components/layout/SiteHeader.tsx
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header style={{ backgroundColor: siteConfig.brand.primaryColor }}>
      <img src={siteConfig.brand.logoPath} alt={siteConfig.displayName} />
      <nav>
        {siteConfig.navigation.map(item => (
          <Link href={item.href}>{item.label}</Link>
        ))}
      </nav>
    </header>
  );
}
```

**Dentists uses it:**
```typescript
// /Dentists/web/src/config/site.ts
export const siteConfig = {
  displayName: "Dental Finance Partners",
  brand: {
    primaryColor: "#2563eb",
    logoPath: "/brand/logo.png"
  },
  navigation: [
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" }
  ]
};
```

**Property uses it:**
```typescript
// /Property/web/src/config/site.ts
export const siteConfig = {
  displayName: "Property Finance Partners",
  brand: {
    primaryColor: "#16a34a",  // Different color
    logoPath: "/brand/logo.png"  // Different logo file
  },
  navigation: [
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" }
  ]
};
```

**Result:** Same component, different appearance/content

---

### 2. How Shared Code Gets Into Niches

**Option A: Symlinks (Simple but fragile)**
```bash
cd Dentists/web/src/components
mklink /D shared ..\..\..\shared\web-core\components
```

**Option B: Build-time Copy (RECOMMENDED)**
```bash
# Before building each niche
python scripts/sync-shared.py --niche Dentists
# Copies /shared/web-core/ into Dentists/web/src/shared/
```

**Option C: npm Workspace (Most robust)**
```json
// /Accounting/package.json
{
  "workspaces": ["shared/web-core", "Dentists/web", "Property/web"]
}
```

**Recommendation: Option B** (build-time copy)
- Simple to understand
- Works with Vercel
- No symlink issues
- Easy to version control

---

### 3. Vercel Configuration Per Niche

**Dentists Vercel Project:**
```
Settings → Build & Development Settings:
  Root Directory: Dentists/web
  Build Command: npm run build
  Install Command: npm install
  
Settings → Git:
  Ignored Build Step: 
    bash -c '[[ $(git diff HEAD^ HEAD --name-only | grep ^Dentists/) ]] || exit 0'
```

**Property Vercel Project:**
```
Settings → Build & Development Settings:
  Root Directory: Property/web
  Build Command: npm run build
  Install Command: npm install
  
Settings → Git:
  Ignored Build Step:
    bash -c '[[ $(git diff HEAD^ HEAD --name-only | grep ^Property/) ]] || exit 0'
```

**Result:** 
- Push to main branch
- Vercel checks what changed
- Only rebuilds affected niche
- Other niches stay untouched

---

## What We'll Share (Final List)

### Shared Components (90% identical):
1. `SiteHeader` - Logo/nav from config
2. `SiteFooter` - Links/text from config  
3. `PageShell` - Generic wrapper
4. `Breadcrumb` - Generic breadcrumb
5. `CTASection` - Generic CTA
6. `StickyCTA` - Generic sticky bar
7. `BlogPostRenderer` - Markdown rendering
8. `LeadForm` - Form logic (fields from config)

### Shared Utilities (100% identical):
1. `blog.ts` - File system blog loading
2. `schema.ts` - SEO schema generation
3. `organization-schema.ts` - Org structured data

### Shared Python (100% identical):
1. Blog generation logic
2. Content parsing
3. Image generation
4. Schema building

### What Stays Unique:
1. All `/content/blog/*.md` files
2. All branding assets (`/public/brand/`)
3. `site.ts` config file (niche-specific settings)
4. Homepage/About/Services page CONTENT (not structure)
5. Domain names and SEO metadata

---

## Answer to Your Questions

### Q: One Git or Multiple?
**A: One Git repo** (current setup is correct)
- Easier to manage shared code
- Atomic commits
- Simpler CI/CD

### Q: How does Vercel know what to build?
**A: Multiple Vercel projects, same repo**
- Dentists project → watches `Dentists/` folder
- Property project → watches `Property/` folder
- Each has own domain
- Independent deployments

### Q: Will Property become Dentists?
**A: No, because:**
- Content is completely different (blog articles)
- Branding is different (logo, colors, imagery)
- Config is different (audience, messaging, domains)
- Only the STRUCTURE is shared (header layout, form logic, etc.)

**Think of it like:** WordPress theme (shared) with different content/branding per site.

---

## Recommendation

**Proceed with centralization:**
1. Create `/shared/web-core/` structure
2. Extract 8 components + 3 utilities
3. Make Dentists import from `/shared/`
4. Test thoroughly
5. Property becomes easy (just config + content)

**This is the right move before adding Property content.** Otherwise you'll duplicate everything and regret it later.

**Ready to proceed?**