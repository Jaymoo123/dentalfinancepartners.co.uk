# BRIEF SCAFFOLD — optimise the medical for_locum_doctors for its head-keyword family

You are an Opus 4.8 subagent. Using the analysis pack and rules below, write a self-contained implementation brief to `index.md` in this folder. Reason about the cannibalisation diagnosis; do not just restate the data. Produce: a title/meta formula, 3 H1 options, the recommended on-page sections + entity coverage, the schema additions, the internal-linking / cannibalisation actions (naming the exact catcher pages), the geo angle, trust additions, and risks.

- **Page:** https://www.medicalaccounts.co.uk/for-locum-doctors
- **Source file (hand-edit this):** `Medical/web/src/app/for-locum-doctors/page.tsx`

## Site rules (from SITE_RULES)
- **Domain:** https://www.medicalaccounts.co.uk
- **Web root (build here):** `Medical/web`
- **Audience:** UK GPs (salaried + partner), hospital consultants, locum doctors, private practice owners
- **Lead-form segments:** ['GP (salaried)', 'GP (partner)', 'Locum doctor', 'Hospital consultant', 'Private practice owner']
- **Pillar pages to link to:**
  - NHS pension annual allowance: `/blog/nhs-pension-annual-allowance-complete-guide`
  - Locum doctor tax (complete): `/blog/locum-doctor-tax-complete-guide`
  - Locum doctor IR35: `/blog/locum-doctor-ir35-what-you-need-to-know`
  - GP partnership tax (complete): `/blog/gp-partnership-tax-complete-guide`
  - GP limited company: `/blog/gp-limited-company-tax-benefits-drawbacks`
  - Medical practice incorporation: `/blog/medical-practice-incorporation-step-by-step`
  - GP tax deductions: `/blog/gp-tax-deductions-complete-list-2026`
  - GP accountant services (complete): `/blog/gp-accountant-services-complete-guide`
- **Authority links to favour:**
  - [HMRC EIM (Employment Income Manual)](https://www.gov.uk/hmrc-internal-manuals/employment-income-manual)
  - [HMRC ESM (Employment Status Manual, IR35)](https://www.gov.uk/hmrc-internal-manuals/employment-status-manual)
  - [HMRC BIM (Business Income Manual)](https://www.gov.uk/hmrc-internal-manuals/business-income-manual)
  - [NHS Business Services Authority — NHS Pensions](https://www.nhsbsa.nhs.uk/member-hub)
  - [NHS Pensions annual allowance pension savings statement guidance](https://www.nhsbsa.nhs.uk/member-hub/annual-allowance)
  - [GMC — Good Medical Practice](https://www.gmc-uk.org/professional-standards/professional-standards-for-doctors/good-medical-practice)
  - [BMA — tax and finance for doctors](https://www.bma.org.uk/pay-and-contracts)
  - [gov.uk MTD for ITSA sign-up checker](https://www.gov.uk/guidance/check-when-to-sign-up-for-making-tax-digital-for-income-tax)
  - [HMRC IR35 / off-payroll working — guidance](https://www.gov.uk/guidance/understanding-off-payroll-working-ir35)


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

# Core-page analysis pack — medical / for_locum_doctors

- **Page:** https://www.medicalaccounts.co.uk/for-locum-doctors
- **Source (hand-edit this):** `Medical/web/src/app/for-locum-doctors/page.tsx`

## Cannibalisation diagnosis
- Head-family queries tracked: **10** (151 impressions, 90d).
- Queries the core page already owns: **7**.
- National head queries: **6**; national impressions NOT on the core page: **4**.

### Top catcher pages (which of OUR pages soaks up head-family impressions)
| catcher url | type | head queries | impr |
| --- | --- | --- | --- |
| https://www.medicalaccounts.co.uk/ | homepage | 7 | 138 |
| https://www.medicalaccounts.co.uk/blog/locum-tax | blog | 2 | 4 |
| https://www.medicalaccounts.co.uk/resources/locum | core_other | 1 | 2 |

### Per-query cannibalisation map (top 30 by impressions)
| query | tot impr | nat | geo | catcher | catcher type | catcher pos | core-page pos | verdict |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| accountants for locum doctors | 106 | Y |  | medicalaccounts.co.uk/ | homepage | 60.5 | 60.5 | homepage_already_owns |
| locum doctor accountant | 20 | Y |  | medicalaccounts.co.uk/ | homepage | 72.8 | 72.8 | homepage_already_owns |
| accounting services for locum gps | 6 |  |  | medicalaccounts.co.uk/ | homepage | 59.8 | 59.8 | homepage_already_owns |
| accountant for locum doctor | 4 |  |  | medicalaccounts.co.uk/ | homepage | 70.0 | 70.0 | homepage_already_owns |
| locum doctor accountant hertfordshire | 4 | Y |  | medicalaccounts.co.uk/ | homepage | 84.8 | 84.8 | homepage_already_owns |
| accounts for and locum gps | 3 |  |  | medicalaccounts.co.uk/resources/locum | core_other | 42.0 | 61.0 | caught_by_core_other |
| locum accountants | 3 | Y |  | medicalaccounts.co.uk/ | homepage | 67.5 | 67.5 | homepage_already_owns |
| locum doctor tax deductions | 2 | Y |  | medicalaccounts.co.uk/blog/locum-tax | blog | 21.5 | - | caught_by_blog_consolidate |
| locum accountant | 2 | Y |  | medicalaccounts.co.uk/blog/locum-tax | blog | 32.5 | - | caught_by_blog_consolidate |
| accounts for locum doctors | 1 |  |  | medicalaccounts.co.uk/ | homepage | 72.0 | 72.0 | homepage_already_owns |

## Our core page vs page-1 competitors
| metric | ours | competitor median | competitor max |
| --- | --- | --- | --- |
| word count | 1287 | 719.0 | 2507 |
| H2 sections | 5 | 5.5 | - |
| FAQs | 12 | 2.0 | - |

### Headline keyword coverage (the #1 gap)
- Title: `Locum Accountant | IR35, Ltd Company & Tax Returns for Locum Doctors | Medical Accountants UK` — contains head token: **locum accountant**
- H1: `Locum accountant and tax specialists for UK locum doctors` — contains head token: **locum accountant**

### Schema
- Ours: ['BreadcrumbList', 'FAQPage', 'Organization', 'Service', 'WebSite']
- Competitor frequency: {'BreadcrumbList': 6, 'Organization': 4, 'WebPage': 4, 'WebSite': 4, 'ImageObject': 3, 'FAQPage': 2, 'AccountingService': 1, 'Place': 1, 'Service': 1, 'FinancialService': 1, 'LocalBusiness': 1}
- Missing vs competitors (>=2 have it): ['ImageObject', 'WebPage']
- Commercial checklist: {'LocalBusiness': 'MISSING', 'AccountingService': 'MISSING', 'Service': 'present', 'BreadcrumbList': 'present', 'AggregateRating': 'MISSING', 'Review': 'MISSING', 'Organization': 'present', 'FAQPage': 'present'}

### Component / trust patterns missing vs competitors
- []

## Page-1 competitors extracted
| domain | type | best pos | title | words | H2 | FAQ | schema |
| --- | --- | --- | --- | --- | --- | --- | --- |
| www.acctek.co.uk | deep | 2 | Limited Company Accountants UK | Fixed-Fee Support | 1285 | 9 | 21 | AccountingService,BreadcrumbList,FAQPage,ImageObject,Organization,Place,Service,WebPage,WebSite |
| warr.co.uk | deep | 2 | Accounting for Locum Professionals - Warr & Co Chartered Acc | 2507 | 8 | 2 | BreadcrumbList,Organization,WebPage,WebSite |
| sial-accountants.co.uk | deep | 3 | Specialist Accounting Services for Salaried GPs and Locum Do | 9 | 0 | 2 | BreadcrumbList |
| www.bw-medical.co.uk | deep | 3 | Medical Accountants for Locum Doctors, Locum Doctor Accounta | 13 | 0 | 0 | FinancialService |
| locumstory.com | deep | 3 | Locum tenens out of residency: 5 ways to prepare as a reside | 1539 | 7 | 1 |  |
| www.freestyleaccounting.com | landing | 4 | Accountants for Locum Doctors & Pharmacists | Freestyle Acco | 0 | 0 | 5 | BreadcrumbList,ImageObject,WebPage,WebSite |
| bhp.co.uk | deep | 5 | Locum GPs - BHP, Chartered Accountants | 774 | 4 | 1 | BreadcrumbList,ImageObject,Organization,WebPage,WebSite |
| www.coreadviz.co.uk | deep | 1 | Accountant for Locum Doctor | Locum Doctor Accounting & Tax  | 664 | 8 | 5 | BreadcrumbList,FAQPage,LocalBusiness,Organization |

_Could not fetch: ['gorillaaccounting.com', 'bing.com', 'wisaccountancy.co.uk', 'medicsmoney.co.uk']_