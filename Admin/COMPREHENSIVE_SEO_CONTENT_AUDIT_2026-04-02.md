# Comprehensive SEO & Content Audit — April 2, 2026

> Full platform audit across all 4 niche websites, content systems, folder structure, and infrastructure.

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [First Principles: What Makes Someone Click?](#first-principles)
3. [Site-by-Site Audit](#site-by-site-audit)
   - [Property Tax Partners](#property-tax-partners)
   - [Dental Finance Partners](#dental-finance-partners)
   - [Medical Accountants UK](#medical-accountants-uk)
   - [Accounts for Lawyers](#accounts-for-lawyers)
4. [Cross-Site Technical SEO Issues](#cross-site-technical-seo)
5. [Content Quality & Topical Authority Audit](#content-quality-audit)
6. [Structured Data & Schema Audit](#structured-data-audit)
7. [Folder Structure & System Efficiency Audit](#system-audit)
8. [Prioritized Action Plan](#action-plan)

---

## 1. Executive Summary <a name="executive-summary"></a>

### Platform Overview
- **4 niche websites** targeting UK specialist accounting verticals
- **369 total blog posts** across all sites
- **Shared codebase** via `shared/web-core/` synced by `sync_shared_components.py`
- **Python content pipeline** using Anthropic Claude for blog generation
- **Automated agents** for daily content, analytics, and risk management

### Critical Health Scores

| Site | Domain | Status | SEO Score | Content Score | Technical Score |
|------|--------|--------|-----------|---------------|-----------------|
| **Property** | propertytaxpartners.co.uk | LIVE | 3/10 | 5/10 | 6/10 |
| **Dentists** | dentalfinancepartners.co.uk | LIVE | 4/10 | 7/10 | 5/10 |
| **Medical** | medicalaccountantsuk.co.uk | NOT DEPLOYED | 2/10 | 4/10 | 5/10 |
| **Solicitors** | accountsforlawyers.co.uk | NOT DEPLOYED | 2/10 | 5/10 | 5/10 |

### Top 5 Critical Issues (Revenue-Blocking)

1. **ALL 167 Property blog posts have canonical URLs pointing to a DIFFERENT DOMAIN** (`accountsforproperty.co.uk` instead of `propertytaxpartners.co.uk`) — Google may be attributing all SEO value to a domain you don't own
2. **Dentists has ZERO search impressions** — likely caused by shared Google verification file and broken robots.txt sitemap URL
3. **ALL 369 blog posts across ALL sites have no images** — zero OG images means terrible social sharing, zero visual engagement, no image search traffic
4. **ALL 369 blog posts have empty schema fields** — relying on fallback JSON-LD that omits images, uses Organization (not Person) as author, and never tracks dateModified
5. **Medical and Solicitors are NOT deployed** — fully built sites sitting idle, generating zero traffic

---

## 2. First Principles: What Makes Someone Click? <a name="first-principles"></a>

Starting from the question: *"What would convince someone searching for specialist accounting services to click on THIS website?"*

### The Search Journey

A UK landlord searching "property tax accountant" sees 10 results. They click based on:

1. **Title tag** — Does it speak to their exact problem? ("Property Tax Specialists for UK Landlords" > "Accounting Services")
2. **Meta description** — Does it promise a specific outcome? ("Save £3,000-12,000 on Section 24 with specialist property tax advice" > "We offer accounting services")
3. **Rich snippets** — FAQ dropdowns, star ratings, breadcrumbs in SERPs create visual authority
4. **Brand recognition** — Consistent domain, professional name, niche specificity
5. **URL structure** — Clean, topical URLs signal relevance (`/blog/section-24-tax-relief/...` > `/blog/post-123`)

### Once They Land

They stay and convert based on:

1. **Immediate relevance** — H1 matches their search, hero section addresses their pain
2. **Trust signals** — Testimonials, case studies, professional credentials, team photos
3. **Visual quality** — Professional images, clean design, branded OG images
4. **Content depth** — Comprehensive answers, calculators, interactive tools
5. **Clear CTA** — What to do next is obvious and compelling
6. **Social proof** — "Helped 500+ landlords save on Section 24" > nothing

### Current Reality vs. Ideal

| Factor | Current State | Required State |
|--------|--------------|----------------|
| Title tags | Good — niche-specific, keyword-rich | ✅ Mostly fine |
| Meta descriptions | Present but generic | Need benefit-driven copy with numbers/outcomes |
| Rich snippets | FAQPage schema present | Need review schema, how-to schema, breadcrumbs visible in SERPs |
| OG images | **Placeholder SVG on ALL sites** | Need branded, per-post OG images |
| Trust signals | **ZERO** — no testimonials, case studies, team | Need social proof on every page |
| Blog images | **ZERO across 369 posts** | Every post needs a hero image minimum |
| Calculators | 5 on Property, 0 elsewhere | Interactive tools are conversion magnets |
| Phone numbers | **Placeholder on 3/4 sites** | Need real contact details |
| Author pages | None | Google E-E-A-T requires author entities |

---

## 3. Site-by-Site Audit <a name="site-by-site-audit"></a>

---

### 3A. Property Tax Partners <a name="property-tax-partners"></a>

**Domain:** `www.propertytaxpartners.co.uk`  
**Status:** LIVE on Vercel  
**Blog posts:** 167  
**Pages:** ~20 (home, services, about, contact, blog, calculators, incorporation, 5 locations, legal)

#### CRITICAL Issues

| # | Issue | Impact | Details |
|---|-------|--------|---------|
| P1 | **Wrong canonical domain on ALL 167 posts** | Google attributes SEO value to wrong domain | Every post has `canonical: "https://accountsforproperty.co.uk/..."` but site is `propertytaxpartners.co.uk`. This is the single biggest SEO problem on the platform. |
| P2 | **Placeholder GA ID** | Zero analytics tracking | `google_analytics_id: "G-B5MCP5NGMY"` — needs verification this is real and active |
| P3 | **Placeholder Google verification** | GSC may not be properly verified | `google_site_verification: "PROPERTY-VERIFICATION-PLACEHOLDER"` |
| P4 | **Placeholder phone number** | No direct contact possible | `+44 20 3026 1111` — needs verification this is real |

#### Content Issues

| # | Issue | Impact | Details |
|---|-------|--------|---------|
| P5 | **~19 duplicate content clusters (~40 posts)** | Keyword cannibalization, diluted authority | E.g., 5 variations of "best property accountant" competing with each other |
| P6 | **"Portfolio Management" category overloaded** | ~80 posts in one category, others have 5-30 | Location pages, salary pages, service pages all dumped into Portfolio Management |
| P7 | **Year mismatches in meta titles** | Outdated-looking content | Posts dated 2026 with "2025" in titles (e.g., "Rental Income Tax UK 2025") |
| P8 | **No images on any post** | Zero visual engagement, no image search traffic, poor social sharing | All 167 posts have `image: ""` |
| P9 | **Hardcoded category hub pages reference wrong domain** | Canonical signals split between brands | `section-24-and-tax-relief/page.tsx` hardcodes `accountsforproperty.co.uk` in metadata |
| P10 | **Category slug mismatch in section-24 hub** | Filter shows wrong posts, URLs disagree with sitemap | Hub uses `section-24-tax-relief` but `slugifyCategory()` produces `section-24-and-tax-relief` |

#### Technical Issues

| # | Issue | Impact | Details |
|---|-------|--------|---------|
| P11 | **Hardcoded Tailwind classes** | Can't retheme without editing every component | Uses `emerald-600`, `slate-900` instead of CSS variables like other sites |
| P12 | **`config.py` still references Dental pipeline** | Confusing for maintenance | Legacy file with dental paths, sheet names, categories |
| P13 | **Duplicate `niche.config.json`** | Root vs `web/` copies can drift | `web/niche.config.json` exists with older `last_sync` timestamp |

#### What's Working

- ✅ 5 interactive calculators (Section 24, Incorporation, MTD, Portfolio, Rental Yield)
- ✅ Proper sitemap.ts generating all routes including categories
- ✅ robots.ts correctly configured
- ✅ Security headers comprehensive (CSP, HSTS, etc.)
- ✅ Breadcrumb JSON-LD on all pages
- ✅ ReadingProgress + TableOfContents components
- ✅ FAQ schema on blog posts
- ✅ Category-based URL structure (`/blog/category/slug`)

---

### 3B. Dental Finance Partners <a name="dental-finance-partners"></a>

**Domain:** `www.dentalfinancepartners.co.uk`  
**Status:** LIVE on Vercel  
**Blog posts:** 70  
**Pages:** ~18 (home, services, about, contact, blog, 2 locations, legal)

#### CRITICAL Issues

| # | Issue | Impact | Details |
|---|-------|--------|---------|
| D1 | **ZERO Google Search impressions** | Site is effectively invisible to Google | Despite being live with 70 posts. Root causes identified below. |
| D2 | **Shared Google verification file with Property** | GSC can't verify both sites with same file | Both use `google9b5077d68a9d0d70.html` |
| D3 | **robots.txt line break in sitemap URL** | Googlebot can't find sitemap | Line break in Vercel env var breaks the sitemap URL |
| D4 | **UTF-8 encoding corruption in niche.config.json** | Mojibake characters on live site | `\u00e2\u20ac\u201d` instead of em dash, `\u00e2\u20ac\u00a6` instead of ellipsis |

#### Content Issues

| # | Issue | Impact | Details |
|---|-------|--------|---------|
| D5 | **~9 duplicate content clusters (~18 posts)** | 25% of content cannibalizes itself | E.g., 2 NHS pension posts, 2 MTD posts, 2 VAT threshold posts |
| D6 | **Year mismatch in meta titles** | Outdated appearance | "CGT Guide 2024" on a 2026-dated post |
| D7 | **No images on any post** | Same as Property | All 70 posts have `image: ""` |
| D8 | **No calculators** | Missing interactive conversion tools | Dentists have no calculator pages at all |
| D9 | **Missing ReadingProgress component** | Inconsistent UX vs Property/Solicitors | Only site without reading progress bar |

#### Technical Issues

| # | Issue | Impact | Details |
|---|-------|--------|---------|
| D10 | **No `remotePatterns` for Unsplash in next.config.ts** | Image optimization broken if Unsplash images are added | Property has this config, Dentists doesn't |
| D11 | **Supabase table name is `blog_topics`** | Collision risk with other niches | Should be `blog_topics_dentists` like the others |
| D12 | **Placeholder phone number** | No real contact | `+44 20 0000 0000` |

#### What's Working

- ✅ Canonical URLs are CORRECT (only site where this is true)
- ✅ GA4 is live and tracking (`G-273RJY0LZQ`)
- ✅ Google verification is real (not placeholder)
- ✅ Category-based URL structure
- ✅ TableOfContents component (dual render)
- ✅ CSS custom properties for theming
- ✅ 76% keyword coverage (38/50)
- ✅ Well-balanced categories

---

### 3C. Medical Accountants UK <a name="medical-accountants-uk"></a>

**Domain:** `www.medicalaccountantsuk.co.uk` (root config) / `www.medicalaccounts.co.uk` (web config)  
**Status:** NOT DEPLOYED  
**Blog posts:** 62  
**Pages:** ~14 (home, about, services, NHS pension, calculators, contact, blog, 5 locations, legal)

#### CRITICAL Issues

| # | Issue | Impact | Details |
|---|-------|--------|---------|
| M1 | **CONFLICTING domains in two config files** | Site would display wrong branding depending on which config loads | Root: `medicalaccountantsuk.co.uk`, web: `medicalaccounts.co.uk` — completely different brands |
| M2 | **ALL 62 posts have `canonical: ""`** | Empty canonical tag renders as `href=""` | `??` operator in generateMetadata doesn't catch empty string, only null/undefined |
| M3 | ~~**Placeholder GA ID**~~ ✅ FIXED | Now tracking | `G-CQF7KFZ1P6` |
| M4 | **Placeholder Google verification** | Can't verify GSC | `MEDICAL-VERIFICATION-PLACEHOLDER` |
| M5 | **`public/robots.txt` conflicts with `robots.ts` AND has wrong domain** | Confusing signals to crawlers | Static file points to `medicalaccounts.co.uk` but dynamic robots.ts exists |

#### Content Issues

| # | Issue | Impact | Details |
|---|-------|--------|---------|
| M6 | **Flat blog URL structure** (only site without category in URL) | Less topical signal in URLs | `/blog/slug` vs `/blog/category/slug` on other sites |
| M7 | **Generic slugs with no niche signal** | URLs don't indicate medical specialization | `/blog/accountant-tax-return`, `/blog/accountant-bookkeeping-medical-professionals` |
| M8 | **10+ near-identical location pages** | Thin content, potential Google penalty | `gp-accountant-manchester`, `gp-accountant-leeds`, etc. — likely template content |
| M9 | **"Consultant Tax" category: zero posts** | Dead category in config | Defined but never used |
| M10 | **"GP Tax & Accounts" overloaded** | ~35 of 62 posts in one category | Location pages, service pages, and tax content all in one bucket |
| M11 | **No images on any post** | Same as all sites | All 62 posts have `image: ""` |

#### Technical Issues

| # | Issue | Impact | Details |
|---|-------|--------|---------|
| M12 | **Sitemap doesn't include category pages** | Category hubs not being indexed | Missing `getAllCategories` and `getCategorySlug` in Medical's blog.ts |
| M13 | **No TableOfContents component** | Worst UX of all 4 sites | Only site missing TOC |
| M14 | **No ReadingProgress component** | Inconsistent UX | Missing |
| M15 | **No `calculateReadTime` function** | Missing engagement signal | |
| M16 | **No twitter metadata on homepage** | Bad social sharing previews on X | Missing `twitter` property in metadata |
| M17 | **Hardcoded `--medical-teal` CSS variables** | Non-standard, diverges from shared pattern | Should use `--primary`, `--accent` like others |
| M18 | **Database migration not applied** | Lead form rejects `source='medical'` | Migration exists but isn't applied |
| M19 | **blog.ts missing shared functions** | Out of sync with shared/web-core | Missing `getCategorySlug`, `getAllCategories`, `calculateReadTime` |

---

### 3D. Accounts for Lawyers <a name="accounts-for-lawyers"></a>

**Domain:** `www.accountsforlawyers.co.uk`  
**Status:** NOT DEPLOYED  
**Blog posts:** 70  
**Pages:** ~21 (home, services, about, SRA compliance, contact, blog, 5 locations, legal)

#### CRITICAL Issues

| # | Issue | Impact | Details |
|---|-------|--------|---------|
| S1 | **www/non-www canonical mismatch on ALL 70 posts** | Split SEO signals between www and non-www | Canonicals: `accountsforlawyers.co.uk` (no www), config: `www.accountsforlawyers.co.uk` |
| S2 | ~~**Placeholder GA ID**~~ ✅ FIXED | Now tracking | `G-N6ZPRB3DSQ` |
| S3 | ~~**Placeholder Google verification**~~ ✅ VERIFIED | GSC verified | Verified via Google Search Console |
| S4 | **`public/robots.txt` points to MEDICAL domain** | Completely wrong domain | Contains `Sitemap: https://www.medicalaccounts.co.uk/sitemap.xml` — copy-paste error |
| S5 | **Placeholder phone number** | No real contact | `+44 20 0000 0000` |

#### Content Issues

| # | Issue | Impact | Details |
|---|-------|--------|---------|
| S6 | **3 MTD posts cannibalizing each other** | Severe keyword cannibalization | `making-tax-digital-solicitors`, `mtd-for-income-tax-solicitors`, `mtd-income-tax-solicitors` |
| S7 | **~6 duplicate clusters (~14 posts)** | 20% of content self-cannibalizing | |
| S8 | **"Structure & Incorporation" category: zero posts** | Dead category | Defined but unused |
| S9 | **No images on any post** | Same as all sites | All 70 posts have `image: ""` |
| S10 | **`last_sync: null`** | Shared components never synced | May be running stale versions of shared code |

#### Technical Issues

| # | Issue | Impact | Details |
|---|-------|--------|---------|
| S11 | **StickyCTA at bottom instead of top** | May not appear on initial load | Other sites place it before the hero |
| S12 | **No twitter metadata on homepage** | Bad X sharing previews | Missing `twitter` property |
| S13 | **Database migration not applied** | Lead form rejects `source='solicitors'` | Migration exists but isn't applied |

#### What's Working

- ✅ Unique SRA Compliance page (differentiator)
- ✅ ReadingProgress + TableOfContents
- ✅ CSS custom properties
- ✅ Category-based URLs
- ✅ Legal sector branding (burgundy + gold)

---

## 4. Cross-Site Technical SEO Issues <a name="cross-site-technical-seo"></a>

### 4.1 Canonical URL Crisis

| Site | Canonical Domain | Config Domain | Match? | Severity |
|------|-----------------|---------------|--------|----------|
| Property | `accountsforproperty.co.uk` | `www.propertytaxpartners.co.uk` | **WRONG DOMAIN** | CRITICAL |
| Dentists | `www.dentalfinancepartners.co.uk` | `www.dentalfinancepartners.co.uk` | ✅ Match | — |
| Medical | `""` (empty) | `www.medicalaccountantsuk.co.uk` | **EMPTY** | CRITICAL |
| Solicitors | `accountsforlawyers.co.uk` | `www.accountsforlawyers.co.uk` | **MISSING www** | HIGH |

**This means 3 out of 4 sites have broken canonical URLs.** This is the single highest-priority SEO fix.

### 4.2 Google Verification Status

| Site | Status | Details |
|------|--------|---------|
| Dentists | ✅ Real | `6Yl4g8aauEScoYRA4pqJ...` |
| Property | ❌ Placeholder | `PROPERTY-VERIFICATION-PLACEHOLDER` |
| Medical | ❌ Placeholder | `MEDICAL-VERIFICATION-PLACEHOLDER` |
| Solicitors | ✅ Verified | GSC verified |

### 4.3 Google Analytics Status

| Site | Status | ID |
|------|--------|----|
| Dentists | ✅ Live | `G-273RJY0LZQ` |
| Property | ⚠️ Verify | `G-B5MCP5NGMY` (may be real) |
| Medical | ✅ Live | `G-CQF7KFZ1P6` |
| Solicitors | ✅ Live | `G-N6ZPRB3DSQ` |

### 4.4 robots.txt Conflicts

| Site | `public/robots.txt` | `robots.ts` | Conflict? |
|------|---------------------|-------------|-----------|
| Property | None | ✅ Present | No conflict |
| Dentists | None | ✅ Present | No conflict |
| Medical | ❌ Wrong domain | ✅ Present | **YES — delete static file** |
| Solicitors | ❌ Points to Medical domain | ✅ Present | **YES — delete static file** |

### 4.5 Missing or Placeholder Contact Details

| Site | Phone | Email | Address |
|------|-------|-------|---------|
| Property | ⚠️ Verify | ✅ Set | ✅ Set |
| Dentists | ❌ Placeholder | ✅ Set | ✅ Set |
| Medical | ❌ Placeholder | ✅ Set | ✅ Set |
| Solicitors | ❌ Placeholder | ✅ Set | ✅ Set |

### 4.6 Open Graph / Social Sharing

| Site | OG Image | Twitter Card | OG Fallback |
|------|----------|-------------|-------------|
| Property | ❌ None set | ✅ Present | ❌ No fallback |
| Dentists | ❌ Placeholder SVG | ✅ Present | ✅ Falls back to logo |
| Medical | ❌ Placeholder SVG | ❌ Missing on homepage | ✅ Falls back to logo |
| Solicitors | ❌ Placeholder SVG | ❌ Missing on homepage | ✅ Falls back to logo |

### 4.7 Security Header Contradiction (All Sites)

All 4 sites set `frame-src 'none'` in CSP AND `X-Frame-Options: SAMEORIGIN`. These contradict — CSP blocks all frames while XFO allows same-origin. CSP takes precedence in modern browsers.

---

## 5. Content Quality & Topical Authority Audit <a name="content-quality-audit"></a>

### 5.1 Duplicate Content — Platform-Wide Crisis

| Site | Duplicate Clusters | Posts Affected | % of Total | Worst Example |
|------|--------------------|----------------|------------|---------------|
| Property | ~19 clusters | ~40 posts | 24% | 5 "best property accountant" variants |
| Dentists | ~9 clusters | ~18 posts | 26% | 2 NHS pension posts |
| Medical | ~5 clusters + 10 location pages | ~25 posts | 40% | 10 `gp-accountant-{city}` pages |
| Solicitors | ~6 clusters | ~14 posts | 20% | 3 MTD posts |
| **Total** | **~39 clusters** | **~97 posts** | **26%** | — |

**Over a quarter of all content on the platform is self-cannibalizing.** Each duplicate cluster means multiple pages competing for the same keyword, diluting all of them.

### 5.2 Category Health

#### Property Categories

| Category | Posts | Health | Issue |
|----------|-------|--------|-------|
| Portfolio Management | ~80 | ❌ Overloaded | Catch-all for location, salary, service pages |
| Section 24 & Tax Relief | ~30 | ✅ Good | Core topic well-covered |
| Incorporation & Company Structures | ~20 | ✅ Good | |
| Capital Gains Tax | ~10 | ⚠️ Low | Needs more content |
| Making Tax Digital (MTD) | ~5 | ❌ Underweight | Needs 10+ more posts |

#### Dentists Categories

| Category | Posts | Health |
|----------|-------|--------|
| Practice accounting | ~20 | ✅ Good |
| Associate tax | ~18 | ✅ Good |
| Practice finance | ~16 | ✅ Good |
| VAT & compliance | ~8 | ✅ Adequate |
| Buying a practice | ~8 | ✅ Adequate |

#### Medical Categories

| Category | Posts | Health | Issue |
|----------|-------|--------|-------|
| GP Tax & Accounts | ~35 | ❌ Overloaded | Dumping ground |
| Locum Tax | ~7 | ✅ Adequate | |
| NHS Pension Planning | ~5 | ⚠️ Low | Core differentiator needs more |
| Incorporation & Company Structures | ~4 | ⚠️ Low | |
| Private Practice | ~2 | ❌ Underweight | |
| Medical Expenses | ~1 | ❌ Critical | Almost empty |
| Consultant Tax | 0 | ❌ Dead | Remove or populate |

#### Solicitors Categories

| Category | Posts | Health | Issue |
|----------|-------|--------|-------|
| Practice Finance & Cash Flow | ~16 | ✅ Good | |
| Partnership & LLP Accounting | ~14 | ✅ Good | |
| Sole Practitioner Tax | ~14 | ✅ Good | |
| SRA Compliance & Trust Accounting | ~10 | ✅ Good | |
| Practice Succession & Sale | ~8 | ✅ Adequate | |
| VAT & Compliance | ~6 | ⚠️ Low | |
| Structure & Incorporation | 0 | ❌ Dead | Remove or populate |

### 5.3 Content Quality Signals

| Signal | Property | Dentists | Medical | Solicitors |
|--------|----------|----------|---------|------------|
| Hero images | ❌ None | ❌ None | ❌ None | ❌ None |
| Internal links | ✅ Present | ✅ Present | ✅ Present | ✅ Present |
| FAQ sections | ✅ 3-4 per post | ✅ 3-4 per post | ✅ 3-4 per post | ✅ 3-4 per post |
| Word count | ~1000-2000 | ~800-1500 | ~800-1500 | ~800-1500 |
| HTML structure | ✅ h2/h3/p/ul | ✅ h2/h3/p/ul | ✅ h2/h3/p/ul | ✅ h2/h3/p/ul |
| Author entity | ❌ Org only | ❌ Org only | ❌ Org only | ❌ Org only |
| Date accuracy | ⚠️ Year mismatches | ⚠️ Year mismatches | ✅ OK | ✅ OK |
| Testimonials | ❌ None | ❌ None | ❌ None | ❌ None |
| Case studies | ❌ None | ❌ None | ❌ None | ❌ None |
| Trust signals | ❌ None | ❌ None | ❌ None | ❌ None |

### 5.4 E-E-A-T Assessment (Experience, Expertise, Authority, Trust)

Google's E-E-A-T signals for YMYL (Your Money, Your Life) content like financial advice are critical. Current state:

| Signal | Status | Issue |
|--------|--------|-------|
| **Experience** | ❌ Missing | No case studies, client stories, or first-person expertise |
| **Expertise** | ⚠️ Partial | Content is substantive but authors are brand names, not individuals |
| **Authority** | ❌ Missing | No author pages, no credentials displayed, no professional memberships shown |
| **Trust** | ❌ Missing | No testimonials, no reviews, no trust badges (ACCA, ICAEW, etc.), placeholder phone numbers |

**This is the most significant conversion issue.** Financial services are YMYL — Google demands strong E-E-A-T signals. Without them, ranking for competitive terms will be extremely difficult.

---

## 6. Structured Data & Schema Audit <a name="structured-data-audit"></a>

### 6.1 Schema Types Present

| Schema Type | Property | Dentists | Medical | Solicitors |
|-------------|----------|----------|---------|------------|
| Organization | ✅ Homepage | ✅ Homepage | ✅ 6 pages | ✅ Homepage |
| BlogPosting | ✅ All posts | ✅ All posts | ✅ All posts | ✅ All posts |
| FAQPage | ✅ All posts | ✅ All posts | ✅ All posts | ✅ All posts |
| BreadcrumbList | ✅ All pages | ✅ All pages | ✅ All pages | ✅ All pages |
| LocalBusiness | ✅ Locations | ✅ Locations | ✅ 5 locations | ✅ Locations |
| CollectionPage | ✅ Category hubs | — | — | — |

### 6.2 Schema Quality Issues

| Issue | Impact | Sites Affected |
|-------|--------|----------------|
| `schema: ""` in all 369 posts — always uses fallback | Fallback omits key fields | ALL |
| No `image` property in BlogPosting | Missing rich result eligibility | ALL |
| `dateModified === datePublished` | Google can't detect freshness | ALL |
| Author is Organization, not Person | Weaker E-E-A-T signal | ALL |
| `publisher.logo` is `/og-placeholder.svg` | Unprofessional in rich results | ALL |
| `@context` repeated per object instead of `@graph` | Technically works but not best practice | ALL |
| Property `mainEntityOfPage` URL domain differs from canonical | Conflicting signals | Property |

### 6.3 Missing Schema Types

| Schema | Benefit | Priority |
|--------|---------|----------|
| `HowTo` | Step-by-step guides get rich snippets | HIGH |
| `Review` / `AggregateRating` | Star ratings in SERPs | HIGH |
| `ProfessionalService` | Better local SEO classification | MEDIUM |
| `FinancialService` | Industry-specific classification | MEDIUM |
| `Person` (for authors) | E-E-A-T author entities | HIGH |
| `Article` with `speakable` | Voice search eligibility | LOW |

---

## 7. Folder Structure & System Efficiency Audit <a name="system-audit"></a>

### 7.1 Repository Structure Assessment

```
Accounting/                          # Monorepo root
├── .github/workflows/               # ✅ CI/CD pipelines
├── .docs/                           # ⚠️ 12 files, mostly superseded by Admin/
├── Admin/                           # ⚠️ 113 files — bloated, many redundant
│   └── archive/                     # ✅ Good — historical docs separated
├── agents/                          # ✅ Automation system
│   └── docs/                        # ✅ Architecture documentation
├── shared/
│   └── web-core/                    # ⚠️ Out of date — missing key functions
├── scripts/                         # ⚠️ 30+ scripts, some one-off, some critical
├── templates/niches/                # ✅ Niche generation templates
├── Dentists/                        # ✅ Niche folder (well-structured)
├── Property/                        # ⚠️ Has legacy dental config.py
├── Medical/                         # ⚠️ Config conflicts, missing shared functions
└── Solicitors/                      # ⚠️ Never synced (last_sync: null)
```

### 7.2 Specific Issues

#### Admin Folder Bloat (113 files)

The Admin folder contains **113 markdown files**, many of which are:
- Superseded by newer versions (e.g., `CURRENT_STATUS.md`, `CURRENT_STATUS_FINAL.md`, `COMPLETE_FINAL_STATUS.md`)
- Duplicative (e.g., `EXECUTIVE_SUMMARY.md` and `EXECUTIVE_SUMMARY_CONTENT_AUDIT.md`)
- Phase-specific status docs that are now historical (e.g., `PHASE1_COMPLETE_REPORT.md`, `PHASE2_STATUS.md`)

**Recommendation:** Archive ~60-70 files to `Admin/archive/`, keep only current runbooks and active docs.

#### `.docs/` Folder Redundancy

All 12 files in `.docs/` are from March 28 — the initial deployment. They've been superseded by Admin docs. **Recommendation:** Move all to `Admin/archive/` and delete `.docs/`.

#### `shared/web-core/` Is Stale

The shared `blog.ts` is missing:
- `getCategorySlug()` — needed by 3/4 sites
- `getAllCategories()` — needed by 3/4 sites
- `calculateReadTime()` — needed by some sites

Running `sync_shared_components.py` would OVERWRITE niche-specific extensions. **This is a critical system risk.**

#### `scripts/` Organization

30+ scripts with no clear categorization:
- Migration scripts (`apply_rls_fix.py`, `apply_medical_migration.py`)
- Canonical fix scripts (`fix_duplicate_canonical_property.py`, `update_canonicals_nested_*.py`)
- Content generation helpers (`batch_generate_medical.py`, etc.)
- Sync tools (`sync_shared_components.py`, `compare_sites.ps1`)

**Recommendation:** Organize into subfolders: `scripts/migrations/`, `scripts/content/`, `scripts/maintenance/`, `scripts/sync/`.

#### Niche Folder Inconsistencies

| Element | Property | Dentists | Medical | Solicitors |
|---------|----------|----------|---------|------------|
| `config.py` (legacy) | ✅ Present (dental refs!) | ✅ Present | ❌ Missing | ❌ Missing |
| `config_supabase.py` | ✅ Present | ✅ Present | ✅ Present | ✅ Present |
| `generate_all_automated.py` | ✅ Present | ✅ Present | ❌ Missing | ❌ Missing |
| `keyword_research_*.csv` | ✅ Present | ✅ Present | ❌ Missing | ❌ Missing |
| `blog_topics_bulk_insert.sql` | ✅ Present | ✅ Present | ❌ Missing | ❌ Missing |
| Numbered scripts (01-09) | ✅ Present | ✅ Present | ❌ Missing | ❌ Missing |
| `web/niche.config.json` (duplicate) | ⚠️ Present | ❌ None | ⚠️ Present (WRONG) | ❌ None |
| `last_sync` | 2026-04-01 | 2026-04-01 | 2026-03-29 | **null** |

#### CI/CD Coverage Gap

`ci-build-test.yml` only builds **Dentists** and **Property**. **Medical and Solicitors are NOT tested in CI.** This means breaking changes to shared code won't be caught for those sites.

### 7.3 System Redundancies

1. **Two config systems per niche**: `config.py` (legacy Sheets pipeline) + `config_supabase.py` (current). Remove legacy where not used.
2. **Two robots files on 2 sites**: `public/robots.txt` + `robots.ts`. Delete static files.
3. **Two niche.config.json files on 2 sites**: Root vs `web/` copies. Delete `web/` copies or create a single source of truth.
4. **Numbered scripts (01-09)**: Legacy pipeline for Sheets/Webflow/Sanity. If fully migrated to Supabase, archive these.
5. **Multiple generation scripts**: `generate_blog_supabase.py`, `generate_batch.py`, `generate_phase1.py`, `generate_phase2_all.py`, `generate_all_automated.py`. Need consolidation.

---

## 8. Prioritized Action Plan <a name="action-plan"></a>

### PHASE 1: Critical SEO Fixes (Estimated: 1-2 days)

These are revenue-blocking issues that should be fixed immediately.

| # | Action | Sites | Impact |
|---|--------|-------|--------|
| 1.1 | **Fix Property canonical URLs** — update all 167 post frontmatter to use `https://www.propertytaxpartners.co.uk/...` | Property | Stops sending SEO value to wrong domain |
| 1.2 | **Fix Solicitors canonical URLs** — add `www.` prefix to all 70 posts | Solicitors | Unifies canonical signals |
| 1.3 | **Fix Medical empty canonicals** — either populate with correct URLs or change `??` to `\|\|` in generateMetadata so empty string triggers fallback | Medical | Removes malformed canonical tags |
| 1.4 | **Fix Dentists Google verification** — generate unique verification file, replace shared one | Dentists | Unblocks GSC verification and indexing |
| 1.5 | **Fix Dentists robots.txt** — check Vercel env var for line break in sitemap URL | Dentists | Unblocks sitemap discovery |
| 1.6 | **Delete `public/robots.txt`** from Medical and Solicitors | Medical, Solicitors | Removes conflicting/wrong robots files |
| 1.7 | **Fix Medical niche.config.json conflict** — delete `web/niche.config.json` or sync to match root | Medical | Prevents wrong brand/domain loading |
| 1.8 | **Delete Property `web/niche.config.json`** duplicate | Property | Single source of truth |
| 1.9 | **Fix Dentists UTF-8 encoding** in niche.config.json | Dentists | Removes mojibake from live site |
| 1.10 | **Fix Property category hub hardcoded domains** — replace `accountsforproperty.co.uk` with dynamic URL | Property | Correct canonical signals on category pages |

### PHASE 2: Content Quality & Deduplication (Estimated: 3-5 days)

| # | Action | Sites | Impact |
|---|--------|-------|--------|
| 2.1 | **Merge duplicate content clusters** — for each cluster, keep the strongest post, merge unique content from others, set up 301 redirects in middleware | ALL | Eliminates cannibalization for ~97 posts |
| 2.2 | **Recategorize "Portfolio Management" dump** — move location pages, salary pages, service pages to appropriate categories or create new ones | Property | Fixes category overload |
| 2.3 | **Recategorize "GP Tax & Accounts" dump** — same treatment | Medical | Fixes category overload |
| 2.4 | **Populate or remove dead categories** — "Consultant Tax" (Medical), "Structure & Incorporation" (Solicitors) | Medical, Solicitors | Clean category architecture |
| 2.5 | **Fix year mismatches in meta titles** — update "2024"/"2025" to "2025/26" or "2026" | Property, Dentists | Content appears current |
| 2.6 | **Add benefit-driven meta descriptions** — rewrite generic descriptions with specific outcomes/numbers | ALL | Higher CTR from SERPs |

### PHASE 3: Visual & Trust Signals (Estimated: 1-2 weeks)

| # | Action | Sites | Impact |
|---|--------|-------|--------|
| 3.1 | **Generate branded OG images** — per-post or per-category template images | ALL | Social sharing looks professional |
| 3.2 | **Generate blog hero images** — branded illustrations or stock photos for each post | ALL | Visual engagement, image search traffic |
| 3.3 | **Add trust signals to all sites** — professional body logos (ACCA, ICAEW, etc.), placeholder for testimonials | ALL | E-E-A-T and conversion |
| 3.4 | **Create author entities** — at minimum one named author per site with credentials, bio, photo | ALL | Google E-E-A-T compliance |
| 3.5 | **Replace placeholder phone numbers** with real numbers or remove | Dentists, Medical, Solicitors | Trust and conversion |
| 3.6 | **Replace `/og-placeholder.svg`** with proper branded logos | ALL | Professional appearance |

### PHASE 4: Technical Alignment (Estimated: 2-3 days)

| # | Action | Sites | Impact |
|---|--------|-------|--------|
| 4.1 | **Update `shared/web-core/blog.ts`** to include `getCategorySlug`, `getAllCategories`, `calculateReadTime` | Shared | Safe to sync without breaking sites |
| 4.2 | **Bring Medical to feature parity** — add TableOfContents, ReadingProgress, calculateReadTime, category URLs | Medical | Consistent UX |
| 4.3 | **Add ReadingProgress to Dentists** | Dentists | Consistent UX |
| 4.4 | **Fix Medical sitemap** to include category pages | Medical | Full URL coverage |
| 4.5 | **Add twitter metadata** to Medical and Solicitors homepages | Medical, Solicitors | Social sharing |
| 4.6 | **Add Unsplash remotePatterns** to all next.config.ts | Dentists, Medical, Solicitors | Image optimization ready |
| 4.7 | **Fix CSP frame-src/XFO contradiction** | ALL | Clean security headers |
| 4.8 | **Update CI to build Medical and Solicitors** | CI/CD | Catch breaking changes |

### PHASE 5: Schema Enhancement (Estimated: 1-2 days)

| # | Action | Sites | Impact |
|---|--------|-------|--------|
| 5.1 | **Enhance BlogPosting fallback** — add image URL, separate dateModified tracking, use Person author | ALL | Richer structured data |
| 5.2 | **Add ProfessionalService schema** to service pages | ALL | Better SERP classification |
| 5.3 | **Add HowTo schema** to calculator/guide pages | Property | Rich snippets for guides |
| 5.4 | **Add Person schema** for author entities | ALL | E-E-A-T |
| 5.5 | **Fix Property JSON-LD domain mismatch** — mainEntityOfPage URL should match canonical | Property | Consistent signals |

### PHASE 6: System Cleanup & Optimization (Estimated: 1 day)

| # | Action | Sites | Impact |
|---|--------|-------|--------|
| 6.1 | **Archive 60-70 Admin docs** — move superseded files to `Admin/archive/` | Repo | Cleaner documentation |
| 6.2 | **Move `.docs/` to `Admin/archive/`** and delete `.docs/` | Repo | Remove redundancy |
| 6.3 | **Organize `scripts/`** into subfolders (migrations, content, maintenance, sync) | Repo | Better discoverability |
| 6.4 | **Delete legacy `config.py`** from Property (references dental pipeline) | Property | Remove confusion |
| 6.5 | **Rename Dentists Supabase table** to `blog_topics_dentists` | Dentists | Consistent naming |
| 6.6 | **Consolidate generation scripts** — document which are active vs legacy | ALL niches | Reduce confusion |
| 6.7 | **Sync shared components to Solicitors** (last_sync: null) | Solicitors | Ensure latest code |
| 6.8 | **Apply pending database migrations** | Medical, Solicitors | Lead forms work |

### PHASE 7: Deployment & Launch (Estimated: 1-2 days per site)

| # | Action | Sites | Impact |
|---|--------|-------|--------|
| 7.1 | **Deploy Medical** — Vercel project, domain, env vars, GA4, GSC | Medical | Launch new revenue channel |
| 7.2 | **Deploy Solicitors** — same as Medical | Solicitors | Launch new revenue channel |
| 7.3 | **Set up real GA4 properties** for Medical (Solicitors ✅ done: `G-N6ZPRB3DSQ`) | 1 site remaining | Analytics tracking |
| 7.4 | **Set up GSC verification** for Property, Medical, Solicitors | 3 sites | Search performance data |
| 7.5 | **Submit sitemaps** to GSC for all sites | ALL | Accelerate indexing |

---

## External Verification Checklist

After implementing fixes, verify with these external tools:

### Per-Site Checks

- [ ] **Google Search Console** — Submit sitemap, check coverage, verify no errors
- [ ] **Google Rich Results Test** — Test homepage, blog post, location page for each site
- [ ] **Schema.org Validator** — Validate all JSON-LD types
- [ ] **Google PageSpeed Insights** — Check Core Web Vitals (LCP, CLS, INP)
- [ ] **Mobile-Friendly Test** — All pages responsive
- [ ] **Ahrefs/SEMrush Site Audit** — Comprehensive crawl for broken links, missing meta, duplicate content
- [ ] **Screaming Frog** — Full crawl to verify canonicals, hreflang, redirects
- [ ] **Facebook Sharing Debugger** — OG tags rendering correctly
- [ ] **Twitter Card Validator** — Twitter cards rendering correctly
- [ ] **SSL Labs** — HTTPS configuration
- [ ] **SecurityHeaders.com** — Verify CSP, HSTS, etc.
- [ ] **Wave Accessibility Tool** — WCAG compliance

### Content Quality Checks

- [ ] **Copyscape** — Verify no external plagiarism
- [ ] **Grammarly/Hemingway** — Readability scores for sample posts
- [ ] **Siteliner** — Internal duplicate content detection
- [ ] **Content length analysis** — Verify 1000+ words for pillar content

---

*Audit conducted: April 2, 2026*  
*Total issues identified: 94*  
*Critical: 18 | High: 24 | Medium: 32 | Low: 20*
