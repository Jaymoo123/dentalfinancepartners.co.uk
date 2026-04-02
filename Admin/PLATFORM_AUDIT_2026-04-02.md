# Platform Audit -- April 2, 2026

All findings verified directly against the codebase. No reliance on prior documentation.

---

## Executive Dashboard

| Site | Domain | Posts | Canonical | robots.txt | Sitemap | GSC Verification | GA4 | Schema | E-E-A-T |
|------|--------|-------|-----------|------------|---------|------------------|-----|--------|---------|
| Property | propertytaxpartners.co.uk | 85 | CLEAN | CLEAN | CLEAN | PLACEHOLDER | Unverified | Partial | Weak |
| Dentists | dentalfinancepartners.co.uk | 55 | 1 empty | CLEAN | CLEAN | Real | Live | Partial | Weak |
| Medical | medicalaccountantsuk.co.uk | 46 | ALL EMPTY | CLEAN | Missing categories | PLACEHOLDER | Live | Partial | Weak |
| Solicitors | accountsforlawyers.co.uk | 50 | CLEAN | CLEAN | CLEAN | PLACEHOLDER | Live | Partial | Weak |

---

## 1. Canonical URLs

189 of 236 posts have correct canonicals. 47 need fixing.

### Property (85 posts) -- CLEAN
All 85 posts use `https://www.propertytaxpartners.co.uk/blog/{category}/{slug}`.

### Dentists (55 posts) -- 1 issue
54 correct. 1 empty canonical:
- `Dentists/web/content/blog/dentist-student-loan-repayment-tax-planning-guide.md`

### Medical (46 posts) -- ALL EMPTY
Every post has `canonical: ""`. The runtime code (`post.canonical || siteConfig.url/blog/slug`) generates a fallback, but the front matter should be populated for consistency and to avoid edge cases.

### Solicitors (50 posts) -- CLEAN
All 50 posts use `https://www.accountsforlawyers.co.uk/blog/{category}/{slug}`.

---

## 2. robots.txt

All 4 sites use identical dynamic `robots.ts`:
- Allow: `/`
- Disallow: `/thank-you`
- Sitemap: `{siteUrl}/sitemap.xml`

No static `public/robots.txt` files exist on any site (previously conflicting files were deleted in a prior session). Clean across the board.

**Open item:** Dentists had a line-break issue in the live sitemap URL caused by a Vercel environment variable. This requires live site verification to confirm resolution.

---

## 3. Sitemap Comparison

### Static routes included

| Route | Property | Dentists | Medical | Solicitors |
|-------|----------|----------|---------|------------|
| `/` | Y | Y | Y | Y |
| `/services` | Y | Y | Y | Y |
| `/about` | Y | Y | Y | Y |
| `/contact` | Y | Y | Y | Y |
| `/blog` | Y | Y | Y | Y |
| `/locations` | Y | Y | Y | Y |
| `/privacy-policy` | Y | Y | Y | Y |
| `/terms` | Y | Y | Y | Y |
| `/cookie-policy` | Y | Y | Y | Y |
| `/incorporation` | Y | -- | -- | -- |
| `/calculators` | Y | -- | Y | -- |
| `/nhs-pension` | -- | -- | Y | -- |
| `/sra-compliance` | -- | -- | -- | Y |

### Dynamic routes

| Type | Property | Dentists | Medical | Solicitors |
|------|----------|----------|---------|------------|
| Location pages | 5 cities | 2 cities | 5 cities | 5 cities |
| Blog category pages | Y | Y | **NO** | Y |
| Blog post URLs | `/blog/{cat}/{slug}` | `/blog/{cat}/{slug}` | `/blog/{slug}` (flat) | `/blog/{cat}/{slug}` |

**Issue:** Medical does not include category pages in sitemap. This is consistent with its routing (no `blog/[category]/page.tsx` exists), but means Medical lacks category-level URL signals. Medical uses flat blog URLs while the other 3 sites use category-nested URLs.

**Issue:** Dentists only has 2 location pages (London, Manchester) vs 5 for all other sites, despite `seo.service_areas` listing 5 cities.

---

## 4. Google Verification & Analytics

| Site | google_site_verification | GA4 ID | Status |
|------|--------------------------|--------|--------|
| Property | `PROPERTY-VERIFICATION-PLACEHOLDER` | `G-B5MCP5NGMY` | **Verification placeholder. GA4 ID unverified.** |
| Dentists | `6Yl4g8aauEScoYRA4pqJ-d-l_CeAhKUPV1dHvOirf1E` | `G-273RJY0LZQ` | Both real and functional |
| Medical | `MEDICAL-VERIFICATION-PLACEHOLDER` | `G-CQF7KFZ1P6` | **Verification placeholder.** GA4 is live. |
| Solicitors | `SOLICITORS-VERIFICATION-PLACEHOLDER` | `G-N6ZPRB3DSQ` | **Verification placeholder.** GA4 is live. |

3 of 4 sites cannot verify in Google Search Console until real tokens are added to `niche.config.json`.

---

## 5. Contact Information

| Site | Phone | Email | Assessment |
|------|-------|-------|------------|
| Property | +44 20 3026 1111 | hello@propertytaxpartners.co.uk | Phone may be real (different block from others). Needs verification. |
| Dentists | +44 20 7946 0321 | hello@dentalfinancepartners.co.uk | **7946 range is Ofcom-reserved for fiction. Placeholder.** |
| Medical | +44 20 7946 0482 | hello@medicalaccountantsuk.co.uk | **Same 7946 range. Placeholder.** |
| Solicitors | +44 20 7946 0157 | hello@accountsforlawyers.co.uk | **Same 7946 range. Placeholder.** |

---

## 6. Page-Level Metadata Quality

### Common issues across all sites

- **OG images**: Every site uses `/og-placeholder.svg` as the publisher logo and fallback OG image. No real branded social images exist.
- **Thank-you pages**: All 4 sites have no canonical, very short description (~31 chars), and no OG/Twitter metadata on the page itself.
- **Legal pages** (cookie, terms, privacy): Titles under 30 chars ("Cookie policy", "Terms of use", "Privacy policy"). Privacy policy descriptions are borderline or under 100 chars.
- **Brand duplication**: `layout.tsx` uses `title.template: "%s | {brand}"`. Pages whose titles already end with `| {brand}` get the brand appended twice in the rendered `<title>` tag.

### Site-specific metadata issues

**Property:**
- Homepage title ~69 chars (over 65 recommended max); with template suffix becomes ~94 chars
- Category hub page titles all over 65 chars and include brand (double-brand with template)
- Calculators page title over 65 chars
- `thank-you` page uses "Property Accountants UK" instead of the actual brand name "Property Tax Partners"

**Dentists:**
- Homepage description ~178 chars (over 170 limit)
- Blog index title is just "Blog" (4 chars -- extremely generic)
- Contact page title is just "Contact" (7 chars)
- About page title is just "About us" (8 chars)
- Locations page title is just "Locations" (9 chars)
- 5 category hub pages have descriptions over 170 chars
- Multiple category hub titles over 65 chars with brand duplication

**Medical:**
- **No `twitter` card metadata on ANY page** except blog posts and location pages
- Homepage, blog index, calculators, about, NHS pension, services, contact, locations -- all missing page-level Twitter metadata
- About page title 81 chars (extreme length)
- About page description 275 chars (way over limit)
- Services page description 265 chars
- Calculators page description 195 chars

**Solicitors:**
- Homepage has no page-level `twitter` metadata
- Blog index, category hubs, contact, locations -- no Twitter metadata
- Multiple category hub titles over 65 chars
- "About" and "Services" page titles are generic single-word patterns

---

## 7. Blog Front Matter Quality

### Platform-wide (all 236 posts)

| Field | Status |
|-------|--------|
| `title` | Present on all 236 posts |
| `slug` | Present on all 236 posts |
| `date` | All use 2026 dates |
| `author` | Always an Organization name, never a Person |
| `category` | Present on all posts |
| `metaTitle` | Present on all posts |
| `metaDescription` | Present on all posts |
| `faqs` | Present on all posts (2-8 questions each, avg ~4.5) |
| `h1` | Present on all posts |
| `summary` | Present on all posts |
| `image` | **EMPTY on all 236 posts** |
| `schema` | **EMPTY on all 236 posts** |

### metaTitle length

| Site | Min | Max | Avg | Over 60 chars | Under 30 chars |
|------|-----|-----|-----|---------------|----------------|
| Property | 47 | 70 | 57.4 | 14 | 0 |
| Dentists | 49 | 73 | 58.0 | 16 | 0 |
| Medical | 48 | 68 | 57.5 | 12 | 0 |
| Solicitors | 48 | 66 | 56.6 | 9 | 0 |

### metaDescription length

| Site | Min | Max | Avg | Over 160 chars | Under 100 chars |
|------|-----|-----|-----|----------------|-----------------|
| Property | 133 | 168 | 152.3 | 12 | 0 |
| Dentists | 123 | 167 | 150.7 | 10 | 0 |
| Medical | 140 | 172 | 155.4 | 9 | 0 |
| Solicitors | 142 | 162 | 153.4 | 5 | 0 |

### Category distribution

**Property (85 posts):**

| Category | Count |
|----------|-------|
| Portfolio Management | 37 |
| Incorporation & Company Structures | 19 |
| Section 24 & Tax Relief | 16 |
| Capital Gains Tax | 8 |
| Making Tax Digital (MTD) | 5 |

"Portfolio Management" is being used as a catch-all for location pages, salary pages, generic service pages, and actual portfolio management content. 37 posts (44%) in one category is severe overloading.

**Dentists (55 posts):**

| Category | Count |
|----------|-------|
| Practice accounting | 17 |
| Practice finance | 14 |
| Associate tax | 13 |
| VAT & compliance | 6 |
| Buying a practice | 5 |

Well-balanced. No dead or overloaded categories.

**Medical (46 posts):**

| Category | Count |
|----------|-------|
| GP Tax & Accounts | 30 |
| Locum Tax | 6 |
| NHS Pension Planning | 5 |
| Incorporation & Company Structures | 3 |
| Private Practice | 1 |
| Medical Expenses | 1 |

"GP Tax & Accounts" has 65% of all posts -- severely overloaded. "Consultant Tax" (defined in config) has 0 posts. "Medical Expenses" and "Private Practice" are dangerously underweight.

**Solicitors (50 posts):**

| Category | Count |
|----------|-------|
| Practice Finance & Cash Flow | 18 |
| Partnership & LLP Accounting | 11 |
| SRA Compliance & Trust Accounting | 6 |
| Practice Succession & Sale | 5 |
| VAT & Compliance | 5 |
| Sole Practitioner Tax | 4 |
| Structure & Incorporation | 1 |

"Practice Finance & Cash Flow" is slightly heavy at 36%. "Structure & Incorporation" has only 1 post despite being a full category.

### Posts with stale years in metaTitle (20 total)

**Property (6):**
- `cgt-property-transfer-spouse.md` -- "2025"
- `landlord-capital-allowances-tax-relief.md` -- "2025/26"
- `rental-income-tax-calculator.md` -- "2025/26"
- `rental-income-tax-uk-complete-guide-landlords.md` -- "2025"
- `stamp-duty-buy-to-let-surcharge.md` -- "2025"
- `what-does-a-property-accountant-do.md` -- "2024"

**Dentists (8):**
- `capital-gains-tax-selling-dental-practice-uk.md` -- "2024"
- `cost-setting-up-dental-practice-uk.md` -- "2024"
- `dental-practice-profit-margin-benchmarking-optimization-uk.md` -- "2024"
- `dental-practice-valuation-methods-uk.md` -- "2024"
- `facial-aesthetics-vat-uk-dental-practices.md` -- "2024"
- `nhs-superannuation-pension-annual-allowance-uk-dentists.md` -- "2024"
- `payment-on-account-uk-dentists-guide.md` -- "2024"
- `private-dental-practice-tax-complete-financial-guide.md` -- "2024"

**Medical (2):**
- `gp-limited-company-tax-benefits-drawbacks.md` -- "2025"
- `gp-partner-vs-salaried-gp-tax-comparison.md` -- "2025/26"

**Solicitors (4):**
- `basis-period-reform-law-firms.md` -- "2024"
- `law-firm-accounting-software-guide-uk-solicitors.md` -- "2025"
- `llp-member-taxation-guide-uk-law-firms.md` -- "2025"
- `making-tax-digital-solicitors.md` -- "2025"

---

## 8. Intra-Site Cannibalization

### Property -- 11 clusters identified

| ID | Theme | Posts | Severity |
|----|-------|-------|----------|
| P1 | Section 24 guide vs restriction | 2 | High |
| P2 | Section 24 ecosystem (7 facets) | 7 | Medium |
| P3 | "Property accountant" hub (7 variants) | 7 | High |
| P4 | London property accountant | 2 | Medium |
| P5 | MTD for landlords | 3 | Medium |
| P6 | Rental income tax (guide vs calculator) | 2 | Medium |
| P7 | Landlord tax return (guide vs deadline) | 2 | Medium |
| P8 | CGT on property (7 entry points) | 7 | Medium |
| P9 | Incorporation / limited company (14 posts) | 14 | High |
| P10 | City location pages (9 posts) | 9 | Medium |
| P11 | Generic "accountant + service" grid (10 posts) | 10 | High |

### Dentists -- 7 clusters identified

| ID | Theme | Posts | Severity |
|----|-------|-------|----------|
| D1 | Dental VAT (4 angles) | 4 | High |
| D2 | Corporation tax (guide vs rates) | 2 | Medium |
| D3 | Self Assessment (registration vs filing vs guide) | 3 | Medium |
| D4 | Choose dental accountant (UK vs London) | 2 | Medium |
| D5 | Sole trader vs limited company | 2 | Medium |
| D6 | Student loans (mechanics vs planning) | 2 | Low |
| D7 | Associate tax (guide vs calculator) | 2 | Medium |

### Medical -- 9 clusters identified

| ID | Theme | Posts | Severity |
|----|-------|-------|----------|
| M1 | GP accountant pillar trio | 3 | High |
| M2 | GP accounting stack (guide/software/bookkeeping) | 3 | Medium |
| M3 | GP tax advice vs tax return | 2 | Medium |
| M4 | Deductions/expenses (GP vs medical vs locum) | 3 | Medium |
| M5 | NHS pension / annual allowance | 4 | High |
| M6 | Locum guide vs self assessment | 2 | Medium |
| M7 | City location pages (11 posts) | 11 | Medium |
| M8 | Incorporation (GP ltd vs practice) | 2 | Medium |
| M9 | Generic "accountant" service pages | 2 | Medium |

### Solicitors -- 8 clusters identified

| ID | Theme | Posts | Severity |
|----|-------|-------|----------|
| S1 | VAT for solicitors (5 angles) | 5 | High |
| S2 | Client money / SRA / trust accounting | 5 | High |
| S3 | Partnership / LLP accounting & tax | 4 | Medium |
| S4 | Sole practitioner tax vs self assessment | 2 | Medium |
| S5 | Solicitor accountant hub | 3 | Medium |
| S6 | Law firm software / integrations | 3 | Low-Medium |
| S7 | Exit / succession / sale / valuation | 5 | Medium |
| S8 | City location pages | 5 | Medium |

---

## 9. Cross-Site Cannibalization

These are **separate domains** so cross-site cannibalization is lower risk than intra-site. However, the cross-site footer links create a network signal, and AI-generated content from similar prompts may share structural similarity.

### Topic overlaps

| Topic | Property | Dentists | Medical | Solicitors |
|-------|----------|----------|---------|------------|
| MTD / Making Tax Digital | 3 posts | 1 post | Body mentions only | 1 post |
| Incorporation / company structure | 14 posts | 3 posts | 2 posts | 1 post |
| VAT | 1 post | 4 posts | 1 post | 5 posts |
| Self-assessment | 2 posts | 3 posts | 2 posts | 1 post |
| Location pages (same cities) | 9+ cities | 2 cities | 11 cities | 5 cities |

**Risk level:** Low for SEO (separate domains), Medium for brand/template duplication and editorial efficiency.

---

## 10. Structured Data / Schema

### Types implemented

| Schema Type | Property | Dentists | Medical | Solicitors |
|-------------|----------|----------|---------|------------|
| Organization | Homepage | Homepage | 6 pages | Homepage |
| BlogPosting | All posts | All posts | All posts | All posts |
| FAQPage | All posts | All posts | All posts | All posts |
| BreadcrumbList | All pages | All pages | All pages | All pages |
| LocalBusiness | Locations | Locations | Locations | Locations |
| CollectionPage | Category hubs | -- | -- | -- |

### Quality issues (all sites)

- **BlogPosting `image`**: Not populated. `post.image` exists in the type system but `buildBlogPostingJsonLd` never sets it. This blocks rich result eligibility.
- **`author`**: Always `Organization`, never `Person`. Weaker E-E-A-T signal.
- **`dateModified`**: Always equals `datePublished`. Google cannot detect content freshness.
- **`publisher.logo`**: Uses `/og-placeholder.svg` on all sites.
- **`schema: ""`** in all 236 posts means the fallback builder always runs; the frontmatter `schema` field is never used.

### Site-specific schema bugs

- **Solicitors `locations/[slug]/page.tsx`**: Calls `JSON.stringify()` on the output of `buildLocalBusinessJsonLd()`, which already returns a JSON string. This produces double-encoded (escaped) JSON-LD -- **invalid structured data** on all Solicitors location pages.
- **LocalBusiness `logo`**: Medical uses absolute URL (`${siteConfig.url}${publisherLogoUrl}`). Property, Dentists, Solicitors use relative URL (`/og-placeholder.svg`). Google requires absolute URLs in structured data.
- **LocalBusiness `@type`**: Property and Dentists use `AccountingService`. Medical and Solicitors use `ProfessionalService`. Inconsistent but not wrong.
- **Category hub pages** (Property): Use hardcoded absolute URLs in BreadcrumbList JSON-LD (correct domain but not using `siteConfig.url` dynamically).

### Missing schema types

| Type | Benefit | Priority |
|------|---------|----------|
| HowTo | Rich snippets for calculator/guide pages | High |
| Person | E-E-A-T author entities | High |
| ProfessionalService (site-wide) | Better SERP classification beyond location pages | Medium |
| Review / AggregateRating | Star ratings in SERPs (requires real reviews) | Medium |
| WebApplication | For calculator tools | Low |

---

## 11. Internal Linking

### Blog post body links

| Site | Posts with internal links | Posts without | Coverage |
|------|--------------------------|---------------|----------|
| Property | 83 | 2 | 98% |
| Solicitors | 50 | 0 | 100% |
| Medical | 40 | 6 | 87% |
| Dentists | 46 | 9 | 84% |

### Broken internal links found

- **Property**: `property-accountant-services.md` links to `/mtd` which does not exist as a route. MTD content lives under `/blog/making-tax-digital-mtd`. This is a 404.
- **Solicitors**: Blog index generates a card for category "Structure & Incorporation" pointing to `/blog/structure-incorporation`. There is no `blog/structure-incorporation/page.tsx` (only 6 static category pages exist, not 7). This category link is a 404 from the blog index.

### Orphan pages

- **Medical `/calculators`**: Exists as a route and is in the sitemap, but is NOT in the main navigation or footer. Only reachable via blog body links.

### Cross-site footer links

All 4 sites link to each other via footer cards using `https://www.{domain}`. If Medical and Solicitors are not yet deployed to those domains, these are dead links for visitors coming from Property/Dentists.

---

## 12. E-E-A-T & Trust Signals

### What exists

| Signal | Property | Dentists | Medical | Solicitors |
|--------|----------|----------|---------|------------|
| Testimonials | None found | Trust copy on homepage | TestimonialSlider component on homepage | TestimonialSlider component on homepage |
| Case studies | 2 blog posts (Section 24, Incorporation) | None | None | None |
| Author bios | "Learn more about our team" sidebar link | Shared BlogPostRenderer pattern | Specialist mentions in meta | "About the author" org block |
| Professional credentials | Educational mentions in blog (ACCA/ICAEW) | Same | Same | Same |
| Named individuals | None | None | None | None |
| Trust badges/logos | None | None | None | None |
| Star ratings | None | None | None | None |

### What is missing (all sites)

- No named individual author with verifiable credentials on any blog post
- No professional body logos (ACCA, ICAEW, CIMA) displayed as trust badges
- No third-party review integration (Trustpilot, Google Reviews)
- No `Person` schema for authors
- No `Review` or `AggregateRating` schema
- Placeholder phone numbers on 3 of 4 sites (7946 Ofcom-reserved range)
- Placeholder publisher logo (`/og-placeholder.svg`) on all sites
- No team photos or individual bios anywhere

For YMYL (Your Money, Your Life) financial advice content, this represents significant E-E-A-T weakness.

---

## 13. Config & System Integrity

### Config file status (all clean except noted)

| Check | Status |
|-------|--------|
| Duplicate `web/niche.config.json` files | None (previously cleaned up) |
| Static `public/robots.txt` conflicts | None (previously cleaned up) |
| `.docs/` folder | Deleted (previously cleaned up) |
| CI builds all 4 sites | Yes |
| `shared/web-core/lib/blog.ts` has all functions | Yes (getCategorySlug, getAllCategories, calculateReadTime) |

### Remaining config issues

- **Solicitors `last_sync`: null** -- shared components have never been synced via `sync_shared_components.py`
- **Property `niche.config.json`** missing `seo.homepage_title`, `homepage_h1`, `homepage_description` fields that Medical and Solicitors have
- **Dentists `niche.config.json`** also missing those homepage SEO fields
- **Property** uses hardcoded Tailwind classes (emerald-600, slate-900) instead of CSS variables like the other 3 sites

---

## Prioritized Fix List

### Critical (do first)

| # | Issue | Sites | Files affected |
|---|-------|-------|----------------|
| 1 | Populate Medical's 46 empty canonical URLs | Medical | 46 blog .md files |
| 2 | Fix 1 Dentists empty canonical | Dentists | `dentist-student-loan-repayment-tax-planning-guide.md` |
| 3 | Replace 3 placeholder Google verification tokens | Property, Medical, Solicitors | 3 `niche.config.json` files |
| 4 | Replace 3 placeholder phone numbers (7946 range) | Dentists, Medical, Solicitors | 3 `niche.config.json` files |
| 5 | Fix Solicitors double-JSON.stringify in location pages | Solicitors | `Solicitors/web/src/app/locations/[slug]/page.tsx` |

### High (do soon)

| # | Issue | Sites | Scope |
|---|-------|-------|-------|
| 6 | Add `image` field to BlogPosting schema builder | All | `*/web/src/lib/schema.ts` |
| 7 | Create real OG images to replace `/og-placeholder.svg` | All | Brand/design task |
| 8 | Add `Person` author to blog schema (E-E-A-T) | All | Schema + content decision |
| 9 | Fix Property broken `/mtd` link | Property | `property-accountant-services.md` |
| 10 | Add Solicitors `structure-incorporation` category page | Solicitors | New `page.tsx` or dynamic category route |
| 11 | Update 20 stale-year metaTitles | All | 20 blog .md files |
| 12 | Fix Medical missing Twitter metadata on all non-blog pages | Medical | ~10 page.tsx files |
| 13 | Recategorize Property "Portfolio Management" (37 posts in 1 category) | Property | Front matter edits |
| 14 | Recategorize Medical "GP Tax & Accounts" (30 posts in 1 category) | Medical | Front matter edits |

### Medium (plan for)

| # | Issue | Sites | Scope |
|---|-------|-------|-------|
| 15 | Fix brand duplication in title template (titles already ending with brand) | All | Category hubs, some static pages |
| 16 | Improve generic page titles ("Blog", "Contact", "About us", "Locations") | Dentists, Solicitors | page.tsx metadata |
| 17 | Trim descriptions over 170 chars | All | Multiple page.tsx files |
| 18 | Add `dateModified` tracking separate from `datePublished` | All | Schema + front matter |
| 19 | Use absolute URLs for LocalBusiness `logo` | Property, Dentists, Solicitors | `locations/[slug]/page.tsx` |
| 20 | Add Medical `/calculators` to navigation | Medical | `niche.config.json` |
| 21 | Add Dentists location pages for Birmingham, Leeds, Bristol | Dentists | Config + content |
| 22 | Populate dead categories (Medical "Consultant Tax", Solicitors "Structure & Incorporation") | Medical, Solicitors | Content generation |
| 23 | Add internal links to the 17 blog posts that have none | Medical (6), Dentists (9), Property (2) | Blog .md files |
| 24 | Address high-severity cannibalization clusters | All | Content consolidation |
| 25 | Sync Solicitors shared components (`last_sync: null`) | Solicitors | Run sync or manual update |

### Low (nice to have)

| # | Issue | Sites | Scope |
|---|-------|-------|-------|
| 26 | Add HowTo schema to calculator pages | Property, Medical | Schema enhancement |
| 27 | Add ProfessionalService schema site-wide | All | Schema enhancement |
| 28 | Add CollectionPage schema to category hubs | Dentists, Medical, Solicitors | Schema enhancement |
| 29 | Standardize Property to use CSS variables instead of hardcoded Tailwind | Property | Component refactor |
| 30 | Add `thank-you` page canonical and OG metadata | All | 4 page.tsx files |
| 31 | Add `keywords` field to blog front matter (optional, Google ignores) | -- | Skip |
| 32 | Verify Medical and Solicitors are live on their domains | Medical, Solicitors | External check |

---

*Audit conducted: April 2, 2026. All findings verified against codebase, not prior documentation.*
*Total issues: 32 prioritized items. Critical: 5, High: 9, Medium: 11, Low: 7.*
