# BRIEF SCAFFOLD — optimise the property homepage for its head-keyword family

You are an Opus 4.8 subagent. Using the analysis pack and rules below, write a self-contained implementation brief to `index.md` in this folder. Reason about the cannibalisation diagnosis; do not just restate the data. Produce: a title/meta formula, 3 H1 options, the recommended on-page sections + entity coverage, the schema additions, the internal-linking / cannibalisation actions (naming the exact catcher pages), the geo angle, trust additions, and risks.

- **Page:** https://www.propertytaxpartners.co.uk/
- **Source file (hand-edit this):** `Property/web/src/app/page.tsx`

## Site rules (from SITE_RULES)
- **Domain:** https://www.propertytaxpartners.co.uk
- **Web root (build here):** `Property/web`
- **Audience:** UK landlords, buy-to-let investors, property developers
- **Lead-form segments:** ['Individual landlord (1-3 properties)', 'Portfolio owner (4-10 properties)', 'Large portfolio (10+ properties)', 'Property developer']
- **Pillar pages to link to:**
  - Section 24: `/blog/section-24-and-tax-relief/section-24-tax-relief-complete-guide`
  - BTL limited company: `/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk`
  - MTD for landlords: `/blog/making-tax-digital-mtd/making-tax-digital-landlords-april-2026-deadline`
  - CGT on UK property: `/blog/capital-gains-tax/capital-gains-tax-property-complete-guide-uk`
- **Authority links to favour:**
  - [HMRC Property Income Manual](https://www.gov.uk/hmrc-internal-manuals/property-income-manual)
  - [gov.uk MTD for ITSA sign-up checker](https://www.gov.uk/guidance/check-when-to-sign-up-for-making-tax-digital-for-income-tax)
  - [legislation.gov.uk ITTOIA 2005](https://www.legislation.gov.uk/ukpga/2005/5)
  - [HMRC CGT on UK property service](https://www.gov.uk/report-and-pay-your-capital-gains-tax)
  - [HMRC Capital Gains Manual](https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual)
  - [HMRC Property Rental Toolkit](https://www.gov.uk/government/publications/hmrc-property-rental-toolkit)


## Universal site rules (do not skip)

### Voice
- **No em-dashes.** Em-dashes read as AI-generated. Use commas, parentheses, full stops, or middle dots.
- Brand voice: practical, specific, "no hard sell". Use exact figures and named legislation, not vague hedges.
- Anonymised social proof only. No real client names anywhere.

### Lead-gen architecture
- The blog template (`src/components/blog/BlogPostRenderer.tsx`) **automatically injects a `LeadForm` at the bottom** of every post. **Never duplicate this in body content.**
- Add 1-3 inline CTAs in the body at high-intent moments (after worked examples, after comparison tables, after the "what to expect" section). These should drive scroll-to-form, not embed a duplicate form.
- Content should pre-sell the form: worked examples, HMRC citations, local data, anonymised case studies.
- Match the form's role segments (1-3 props / 4-10 / 10+ / developer) by addressing each in the content where relevant.

### CSS / styling in markdown content
- **Tailwind utility classes do NOT work in markdown body content** because Tailwind v4 scans `src/**` only, not `content/**`.
- Use semantic HTML: `<aside>...</aside>`, `<table>...</table>`, `<ul>...</ul>`, `<strong>`.
- The `.prose-blog` CSS in `src/app/globals.css` styles all of these automatically with the property brand (emerald accent, slate text, hand-rolled table styling, callout asides).
- Inline CTA pattern:
```html
<aside>
<p>Headline that signals conversion moment</p>
<p>Body copy that prompts scroll-to-form below.</p>
</aside>
```
- Tables: just `<table><thead><tr><th>...</th></tr></thead><tbody><tr><td>...</td></tr></tbody></table>`. No classes needed.

### FAQs and schema
- FAQs live in frontmatter as `faqs:` array (`question` + `answer`).
- The template auto-emits FAQPage JSON-LD from the frontmatter via `buildBlogPostingJsonLd`. **Do NOT manually add FAQ schema to the body.**
- Article + BreadcrumbList + Organization schema also auto-emitted.
- Target 10-14 FAQs covering: DeepSeek-surfaced gaps + GSC query demand + competitor FAQ patterns + lead-form qualifier questions (segment-specific).

### Cannibalisation
- Pillar pages exist for the main concepts (Section 24, BTL limited company, MTD, CGT). When this page touches one of those topics, write the **applied / local / scenario-flavoured** version, not the comprehensive theoretical version. Link out to the pillar guide.
- Do not duplicate worked examples verbatim across pages. Differ figures, scenarios, or angles.

### Quality bar (acceptance criteria)
- Word count: roughly competitor average (typically 2,500-3,500)
- FAQs: 10-14
- New external authority links: 4-7 (HMRC manuals, legislation.gov.uk, gov.uk)
- 1-3 inline `<aside>` CTAs at conversion moments
- Build passes: `cd <web-root> && npm run build`
- FAQ schema count in built HTML matches frontmatter count (verify with grep)
- No em-dashes anywhere in body or FAQs
- No Tailwind classes anywhere in the markdown file
- Internal links to relevant pillar pages


## Core-page overrides (this is a COMMERCIAL LANDING PAGE in TSX, not a blog)

The UNIVERSAL_RULES above were written for markdown blog posts. For a core page,
these OVERRIDES apply:

- **The page is a TSX server component, not markdown.** Tailwind utility classes
  DO work here (Tailwind scans `src/**`). Ignore the "Tailwind doesn't work in
  markdown" rule for this file.
- **FAQs live in the `faqs` array inside the TSX** (not frontmatter). That array
  feeds `buildFaqPageJsonLd`, so editing it updates the FAQPage schema
  automatically. Do not hand-write FAQ JSON-LD.
- **Schema is added via the existing TS builders**, linked to the one
  `#organization` `@id` graph:
  - `buildOrganizationJsonLd` + `buildFaqPageJsonLd` (already present, keep).
  - `buildLocalBusinessJsonLd` from `@accounting-network/web-shared/lib/local-business-schema`
    (already used by `src/app/locations/[slug]/page.tsx`) — add a national
    `areaServed: GB` instance on the homepage.
  - `Service` schema with `provider` = the existing `#organization` node.
  - `buildBreadcrumbJsonLd` from `src/lib/schema.ts`.
  - `AggregateRating`/`Review` ONLY if there are genuine reviews — never fabricate.
- **Keep the existing visual design.** This pass is SEO content + structure +
  schema only. Do not redesign the hero or components.
- **This page targets the NATIONAL head family.** Local/geo intent funnels DOWN
  to `/locations/*` — do not duplicate `term + city` content here, and do not
  de-optimise the location pages (they already rank locally).
- **Cannibalisation fix:** the analysis pack names the blog/location pages that
  currently catch the head terms. From those catcher pages, add an exact-match
  internal link UP to the core page; soften their over-commercial titles toward
  their long-tail intent. Keep these edits conservative and reversible.


## TSX workflow (do in order)

1. **Read the source file** (`source_tsx` below) AND fetch the live URL to see
   the rendered HTML before editing.
2. **Rewrite the `metadata` object**: `title` leads with the head token
   (<=60 chars), `description` natural + keyword-bearing.
3. **Rewrite the `<h1>`**: keyword-bearing (use one of the H1 options you
   produce); demote the current slogan to a sub-headline `<p>`.
4. **Add a keyword-rich intro paragraph** under the hero, and an
   "Areas we serve" section linking to `/locations`.
5. **Grow the `faqs` array** to 8-10, targeting the zero-click head queries in
   the analysis pack.
6. **Add the schema `<script>` nodes** via the existing builders (LocalBusiness,
   Service, Breadcrumb), all on the `#organization` graph.
7. **Apply the conservative cannibalisation link-ups** on the catcher pages the
   pack names.
8. **Verify:** `cd <web_root> && npm run build`; re-extract the page and confirm
   schema set; no em-dashes; no fabricated ratings; FAQs count matches.

## Acceptance criteria
- Title leads with a head token; H1 contains a head keyword (no longer a slogan).
- FAQs grown to 8-10; FAQPage schema count matches the array.
- Schema set includes Organization, LocalBusiness/AccountingService, Service,
  FAQPage, BreadcrumbList — one `#organization` graph.
- No em-dashes; no fabricated reviews/ratings.
- `npm run build` passes; calculators stay lazy-loaded (no CWV regression).
- Conservative link-ups applied to the named catcher pages; location pages
  untouched.


---

# Core-page analysis pack — property / homepage

- **Page:** https://www.propertytaxpartners.co.uk/
- **Source (hand-edit this):** `Property/web/src/app/page.tsx`

## Cannibalisation diagnosis
- Head-family queries tracked: **149** (1578 impressions, 90d).
- Queries the core page already owns: **0**.
- National head queries: **43**; national impressions NOT on the core page: **587**.

### Top catcher pages (which of OUR pages soaks up head-family impressions)
| catcher url | type | head queries | impr |
| --- | --- | --- | --- |
| https://www.propertytaxpartners.co.uk/blog/property-accountant-services/property-specialist-accountant-london | blog | 25 | 303 |
| https://www.propertytaxpartners.co.uk/blog/london-property-accountant | blog | 22 | 158 |
| https://propertytaxpartners.co.uk/locations/london | location | 3 | 87 |
| https://www.propertytaxpartners.co.uk/blog/property-accountant-services/property-accountant-nottingham-landlords | blog | 19 | 80 |
| https://www.propertytaxpartners.co.uk/blog/property-accountant-services/peterborough-property-accountant-specialist-tax-services | blog | 2 | 59 |
| https://www.propertytaxpartners.co.uk/blog/portfolio-management/property-tax-accountant-birmingham | blog | 9 | 57 |
| https://propertytaxpartners.co.uk/locations/leeds | location | 5 | 44 |
| https://www.propertytaxpartners.co.uk/blog/property-accountant-services/what-services-buy-to-let-accountant | blog | 3 | 31 |
| https://www.propertytaxpartners.co.uk/blog/property-tax-accountant-london | blog | 5 | 29 |
| https://www.propertytaxpartners.co.uk/blog/property-accountant-job-description | blog | 1 | 23 |
| https://www.propertytaxpartners.co.uk/blog/property-accountant-services/london-property-accountant | blog | 3 | 15 |
| https://www.propertytaxpartners.co.uk/blog/property-accountant-services/property-accountant-leicester | blog | 1 | 15 |
| https://propertytaxpartners.co.uk/locations/manchester | location | 3 | 15 |
| https://www.propertytaxpartners.co.uk/blog/property-accountant-services/what-does-a-property-accountant-do | blog | 4 | 14 |
| https://www.propertytaxpartners.co.uk/blog/property-accountant-services/property-accountant-milton-keynes-landlord-guide | blog | 6 | 14 |

### Per-query cannibalisation map (top 30 by impressions)
| query | tot impr | nat | geo | catcher | catcher type | catcher pos | core-page pos | verdict |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| property accountant | 144 | Y |  | propertytaxpartners.co.uk/blog/property-accountant-services/property-specialist-accountant-london | blog | 28.0 | - | caught_by_blog_consolidate |
| property specialist accountant in london | 83 |  | Y | propertytaxpartners.co.uk/locations/london | location | 43.0 | - | geo_keep_local |
| property tax accountant | 68 | Y |  | propertytaxpartners.co.uk/blog/property-accountant-services/property-specialist-accountant-london | blog | 31.9 | - | caught_by_blog_consolidate |
| property tax accountant in london | 66 |  | Y | propertytaxpartners.co.uk/locations/london | location | 43.0 | - | geo_keep_local |
| property accountants | 62 | Y |  | propertytaxpartners.co.uk/blog/property-accountant-services/property-specialist-accountant-london | blog | 41.9 | - | caught_by_blog_consolidate |
| accountant property investment | 61 |  |  | propertytaxpartners.co.uk/blog/london-property-accountant | blog | 82.3 | - | caught_by_blog_consolidate |
| accountants peterborough btl landlords | 57 |  | Y | propertytaxpartners.co.uk/blog/property-accountant-services/peterborough-property-accountant-specialist-tax-services | blog | 14.6 | - | geo_caught_by_blog |
| property specialist accountant | 55 |  |  | propertytaxpartners.co.uk/blog/property-accountant-services/property-specialist-accountant-london | blog | 30.2 | - | caught_by_blog_consolidate |
| accountant for property in london | 42 |  | Y | propertytaxpartners.co.uk/blog/property-tax-accountant-london | blog | 37.6 | - | geo_caught_by_blog |
| property investment accountant | 33 | Y |  | propertytaxpartners.co.uk/blog/property-accountant-services/property-specialist-accountant-london | blog | 44.0 | - | caught_by_blog_consolidate |
| property accountants london | 31 |  | Y | propertytaxpartners.co.uk/blog/london-property-accountant | blog | 78.5 | - | geo_caught_by_blog |
| accountants for property investors | 30 |  |  | propertytaxpartners.co.uk/blog/london-property-accountant | blog | 85.1 | - | caught_by_blog_consolidate |
| best property accountants in london | 28 |  | Y | propertytaxpartners.co.uk/blog/london-property-accountant | blog | 62.5 | - | geo_caught_by_blog |
| buy to let accountants | 26 | Y |  | propertytaxpartners.co.uk/blog/property-accountant-services/what-services-buy-to-let-accountant | blog | 74.0 | - | caught_by_blog_consolidate |
| property accountant specialist | 26 | Y |  | propertytaxpartners.co.uk/blog/london-property-accountant | blog | 82.1 | - | caught_by_blog_consolidate |
| property tax accountant london | 25 |  | Y | propertytaxpartners.co.uk/blog/london-property-accountant | blog | 78.4 | - | geo_caught_by_blog |
| property investment accountant in london | 25 |  | Y | propertytaxpartners.co.uk/blog/property-accountant-services/london-property-accountant | blog | 31.3 | - | geo_caught_by_blog |
| what does a specialist property accountant do? | 23 | Y |  | propertytaxpartners.co.uk/blog/property-accountant-job-description | blog | 58.9 | - | caught_by_blog_consolidate |
| buy to let accountant in london | 22 |  | Y | propertytaxpartners.co.uk/blog/property-tax-accountant-london | blog | 31.9 | - | geo_caught_by_blog |
| buy to let accountant london | 22 |  | Y | propertytaxpartners.co.uk/blog/london-property-accountant | blog | 79.3 | - | geo_caught_by_blog |
| tax accountant property | 20 |  |  | propertytaxpartners.co.uk/blog/london-property-accountant | blog | 78.9 | - | caught_by_blog_consolidate |
| property tax accountants | 19 | Y |  | propertytaxpartners.co.uk/blog/property-accountant-services/property-specialist-accountant-london | blog | 39.0 | - | caught_by_blog_consolidate |
| property accountancy leeds | 16 |  | Y | propertytaxpartners.co.uk/locations/leeds | location | 16.1 | - | geo_keep_local |
| specialist property accountants | 16 | Y |  | propertytaxpartners.co.uk/blog/london-property-accountant | blog | 86.1 | - | caught_by_blog_consolidate |
| buy to let accountant leeds | 15 |  | Y | propertytaxpartners.co.uk/locations/leeds | location | 30.5 | - | geo_keep_local |
| accountant for letting agents leicester | 15 |  | Y | propertytaxpartners.co.uk/blog/property-accountant-services/property-accountant-leicester | blog | 7.1 | - | geo_caught_by_blog |
| investment property accountant | 15 | Y |  | propertytaxpartners.co.uk/blog/london-property-accountant | blog | 94.7 | - | caught_by_blog_consolidate |
| buy to let accountants near me | 14 |  | Y | propertytaxpartners.co.uk/blog/portfolio-management/property-tax-accountant-birmingham | blog | 37.4 | - | geo_caught_by_blog |
| accountant property | 14 |  |  | propertytaxpartners.co.uk/blog/property-accountant-services/property-specialist-accountant-london | blog | 43.2 | - | caught_by_blog_consolidate |
| real estate accountant | 13 |  |  | propertytaxpartners.co.uk/blog/property-accountant-services/property-specialist-accountant-london | blog | 50.8 | - | caught_by_blog_consolidate |

## Our core page vs page-1 competitors
| metric | ours | competitor median | competitor max |
| --- | --- | --- | --- |
| word count | 67 | 638.0 | 2337 |
| H2 sections | 0 | 1.5 | - |
| FAQs | 4 | 1.0 | - |

### Headline keyword coverage (the #1 gap)
- Title: `Landlord Accountant UK | Section 24, MTD & Incorporation Specialists` — contains head token: **landlord accountant**
- H1: `Property tax sorted. Your way.` — contains head token: **NO**
- **FLAG: the H1 has no head keyword (it's a slogan).** Highest-leverage single fix.

### Schema
- Ours: ['FAQPage', 'Organization']
- Competitor frequency: {'Organization': 6, 'WebSite': 6, 'BreadcrumbList': 5, 'WebPage': 5, 'ImageObject': 4, 'SiteNavigationElement': 2, 'Corporation': 1, 'ProfessionalService': 1, 'Service': 1, 'FAQPage': 1}
- Missing vs competitors (>=2 have it): ['BreadcrumbList', 'ImageObject', 'SiteNavigationElement', 'WebPage', 'WebSite']
- Commercial checklist: {'LocalBusiness': 'MISSING', 'AccountingService': 'MISSING', 'Service': 'MISSING', 'BreadcrumbList': 'MISSING', 'AggregateRating': 'MISSING', 'Review': 'MISSING', 'Organization': 'present', 'FAQPage': 'present'}

### Component / trust patterns missing vs competitors
- ['decision_matrix', 'pricing_block', 'step_list']

## Page-1 competitors extracted
| domain | type | best pos | title | words | H2 | FAQ | schema |
| --- | --- | --- | --- | --- | --- | --- | --- |
| uklandlordtax.co.uk | homepage | 1 | Property Tax Accountants For Landlords - UK Landlord Tax | 37 | 0 | 6 | Corporation,Organization,ProfessionalService,SiteNavigationElement,WebSite |
| www.propertyaccountant.co.uk | homepage | 1 | Property Tax Accountants & Specialists | Property Tax UK | 935 | 5 | 6 | BreadcrumbList,ImageObject,Organization,WebPage,WebSite |
| bhp.co.uk | deep | 1 | Property Accountants Leeds | Speak To A Specialist | BHP | 77 | 1 | 0 | BreadcrumbList,ImageObject,Organization,Service,WebPage,WebSite |
| perrysaccountants.co.uk | landing | 1 | Buy to Let Accountant and Tax Advice in London and Kent | 440 | 1 | 0 | BreadcrumbList,Organization,SiteNavigationElement,WebPage,WebSite |
| www.taxaccountant.co.uk | landing | 2 | Accountant London | Specialist Tax Accountants in London | 2337 | 2 | 9 | BreadcrumbList,FAQPage,ImageObject,Organization,WebPage,WebSite |
| www.djh.co.uk | deep | 3 | Property Accountants & Business Advisers | 0 | 0 | 1 | BreadcrumbList,ImageObject,Organization,WebPage,WebSite |
| www.nrla.org.uk | deep | 3 | Rita4Rental | Rental Property Tax Advisor | NRLA | 890 | 6 | 1 |  |
| www.provestor.co.uk | homepage | 4 | Property Tax Made Easy for Landlords | Provestor | 836 | 5 | 0 |  |

_Could not fetch: ['gorillaaccounting.com', 'ukpropertyaccountants.co.uk', 'leonandcompany.co.uk', 'taxassist.co.uk']_