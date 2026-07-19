# BRIEF SCAFFOLD — optimise the dentists homepage for its head-keyword family

You are an Opus 4.8 subagent. Using the analysis pack and rules below, write a self-contained implementation brief to `index.md` in this folder. Reason about the cannibalisation diagnosis; do not just restate the data. Produce: a title/meta formula, 3 H1 options, the recommended on-page sections + entity coverage, the schema additions, the internal-linking / cannibalisation actions (naming the exact catcher pages), the geo angle, trust additions, and risks.

- **Page:** https://www.dentalfinancepartners.co.uk/
- **Source file (hand-edit this):** `Dentists/web/src/app/page.tsx`

## Site rules (from SITE_RULES)
- **Domain:** https://www.dentalfinancepartners.co.uk
- **Web root (build here):** `Dentists/web`
- **Audience:** UK associate dentists, dental practice owners, and multi-site dental groups
- **Lead-form segments:** ['Associate dentist', 'Practice owner', 'Multi-practice group']
- **Pillar pages to link to:**
  - NHS contract essentials: `/dental-guides/nhs-contract-essentials-for-dentists`
  - Associate tax survival guide: `/dental-guides/associate-tax-survival-guide`
  - Practice purchase due diligence: `/dental-guides/practice-purchase-financial-due-diligence`
  - Practice profit extraction (partnership vs Ltd): `/dental-guides/practice-profit-extraction-partnership-vs-ltd`
  - NHS pension scheme essentials: `/dental-guides/nhs-pension-scheme-essentials-for-dentists`
  - Goodwill valuation and sale playbook: `/dental-guides/goodwill-valuation-and-sale-playbook`
- **Authority links to favour:**
  - [HMRC Business Income Manual (BIM)](https://www.gov.uk/hmrc-internal-manuals/business-income-manual)
  - [HMRC Capital Allowances Manual (CA)](https://www.gov.uk/hmrc-internal-manuals/capital-allowances-manual)
  - [NHS Business Services Authority — NHS Pensions](https://www.nhsbsa.nhs.uk/member-hub)
  - [CQC — dental practice registration](https://www.cqc.org.uk/guidance-providers/dentists)
  - [gov.uk MTD for ITSA sign-up checker](https://www.gov.uk/guidance/check-when-to-sign-up-for-making-tax-digital-for-income-tax)
  - [HMRC VAT notice 701/57 — Health](https://www.gov.uk/guidance/health-institutions-and-welfare-services-vat-notice-70157)


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

# Core-page analysis pack — dentists / homepage

- **Page:** https://www.dentalfinancepartners.co.uk/
- **Source (hand-edit this):** `Dentists/web/src/app/page.tsx`

## Cannibalisation diagnosis
- Head-family queries tracked: **75** (5145 impressions, 90d).
- Queries the core page already owns: **65**.
- National head queries: **20**; national impressions NOT on the core page: **0**.

### Top catcher pages (which of OUR pages soaks up head-family impressions)
| catcher url | type | head queries | impr |
| --- | --- | --- | --- |
| https://www.dentalfinancepartners.co.uk/ | homepage | 65 | 4676 |
| https://www.dentalfinancepartners.co.uk/blog/practice-accounting/dental-practice-software-accounting-integration | blog | 5 | 142 |
| https://www.dentalfinancepartners.co.uk/blog/practice-accounting/dental-accountant-london-how-to-choose-specialist | blog | 2 | 120 |
| https://www.dentalfinancepartners.co.uk/blog/associate-tax/dental-associate-vs-self-employed-tax-employment-status | blog | 1 | 4 |
| https://www.dentalfinancepartners.co.uk/blog | blog | 1 | 1 |
| https://www.dentalfinancepartners.co.uk/about | core_other | 1 | 1 |

### Per-query cannibalisation map (top 30 by impressions)
| query | tot impr | nat | geo | catcher | catcher type | catcher pos | core-page pos | verdict |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| accountants for dentists | 1168 | Y |  | dentalfinancepartners.co.uk/ | homepage | 53.3 | 53.3 | homepage_already_owns |
| dental accountants | 840 | Y |  | dentalfinancepartners.co.uk/ | homepage | 58.9 | 58.9 | homepage_already_owns |
| specialist dental accountants | 710 | Y |  | dentalfinancepartners.co.uk/ | homepage | 41.9 | 41.9 | homepage_already_owns |
| dental accounting | 295 |  |  | dentalfinancepartners.co.uk/ | homepage | 71.5 | 71.5 | homepage_already_owns |
| accountant for dentists | 245 |  |  | dentalfinancepartners.co.uk/ | homepage | 60.5 | 60.5 | homepage_already_owns |
| dentist accountants | 229 |  |  | dentalfinancepartners.co.uk/ | homepage | 68.2 | 68.2 | homepage_already_owns |
| accounting for dentists | 156 |  |  | dentalfinancepartners.co.uk/ | homepage | 56.0 | 56.0 | homepage_already_owns |
| dental accountant | 146 | Y |  | dentalfinancepartners.co.uk/ | homepage | 57.8 | 57.8 | homepage_already_owns |
| dentist accountants near me | 143 |  | Y | dentalfinancepartners.co.uk/ | homepage | 43.4 | 43.4 | homepage_already_owns |
| specialist dental accountants london | 132 |  | Y | dentalfinancepartners.co.uk/blog/practice-accounting/dental-accountant-london-how-to-choose-specialist | blog | 11.9 | 51.3 | geo_caught_by_blog |
| accounting software for dental clinics | 131 |  |  | dentalfinancepartners.co.uk/blog/practice-accounting/dental-practice-software-accounting-integration | blog | 10.1 | - | caught_by_blog_consolidate |
| specialist accountants for dentists | 125 | Y |  | dentalfinancepartners.co.uk/ | homepage | 53.9 | 53.9 | homepage_already_owns |
| dental practice accountant | 104 |  |  | dentalfinancepartners.co.uk/ | homepage | 48.8 | 48.8 | homepage_already_owns |
| dental accountants london | 66 |  | Y | dentalfinancepartners.co.uk/ | homepage | 43.2 | 43.2 | homepage_already_owns |
| dentist accountant | 43 |  |  | dentalfinancepartners.co.uk/ | homepage | 67.2 | 67.2 | homepage_already_owns |
| cloud accounting for dentists | 41 |  |  | dentalfinancepartners.co.uk/blog/practice-accounting/dental-practice-software-accounting-integration | blog | 9.0 | - | caught_by_blog_consolidate |
| specialist accountant for dentists | 39 |  |  | dentalfinancepartners.co.uk/ | homepage | 49.4 | 49.4 | homepage_already_owns |
| dental practice accounting | 37 |  |  | dentalfinancepartners.co.uk/ | homepage | 45.9 | 45.9 | homepage_already_owns |
| dental practice accountants | 31 | Y |  | dentalfinancepartners.co.uk/ | homepage | 32.5 | 32.5 | homepage_already_owns |
| dental accountant wales | 31 |  | Y | dentalfinancepartners.co.uk/ | homepage | 49.7 | 49.7 | homepage_already_owns |
| dental tax accountant london | 30 |  | Y | dentalfinancepartners.co.uk/blog/practice-accounting/dental-accountant-london-how-to-choose-specialist | blog | 14.8 | 40.0 | geo_caught_by_blog |
| doctors and dentists accountant | 29 |  |  | dentalfinancepartners.co.uk/ | homepage | 75.0 | 75.0 | homepage_already_owns |
| dental accountants manchester | 26 |  | Y | dentalfinancepartners.co.uk/ | homepage | 25.8 | 25.8 | homepage_already_owns |
| accounting for dentist | 26 |  |  | dentalfinancepartners.co.uk/ | homepage | 57.5 | 57.5 | homepage_already_owns |
| dental specialists accountants | 23 |  |  | dentalfinancepartners.co.uk/ | homepage | 27.1 | 27.1 | homepage_already_owns |
| locum dentist accountants | 22 |  |  | dentalfinancepartners.co.uk/ | homepage | 47.7 | 47.7 | homepage_already_owns |
| dental accountants uk | 20 | Y |  | dentalfinancepartners.co.uk/ | homepage | 38.9 | 38.9 | homepage_already_owns |
| specialist dental accountant | 19 | Y |  | dentalfinancepartners.co.uk/ | homepage | 33.1 | 33.1 | homepage_already_owns |
| accountants for associate dentists | 18 |  |  | dentalfinancepartners.co.uk/ | homepage | 48.8 | 48.8 | homepage_already_owns |
| accountants for dentists nottingham | 14 | Y |  | dentalfinancepartners.co.uk/ | homepage | 28.6 | 28.6 | homepage_already_owns |

## Our core page vs page-1 competitors
| metric | ours | competitor median | competitor max |
| --- | --- | --- | --- |
| word count | 34 | 67.5 | 4345 |
| H2 sections | 0 | 0.0 | - |
| FAQs | 3 | 1.0 | - |

### Headline keyword coverage (the #1 gap)
- Title: `Specialist Dental Accountants | Accountants for Dentists UK` — contains head token: **NO**
- H1: `Specialist dental accountants for UK practices.` — contains head token: **NO**
- **FLAG: the H1 has no head keyword (it's a slogan).** Highest-leverage single fix.

### Schema
- Ours: ['Organization', 'WebSite']
- Competitor frequency: {'WebSite': 9, 'Organization': 8, 'WebPage': 8, 'BreadcrumbList': 7, 'ImageObject': 4, 'Service': 3, 'AccountingService': 3, 'Person': 2, 'LocalBusiness': 2, 'FAQPage': 1, 'ProfessionalService': 1, 'Article': 1}
- Missing vs competitors (>=2 have it): ['AccountingService', 'BreadcrumbList', 'ImageObject', 'LocalBusiness', 'Person', 'Service', 'WebPage']
- Commercial checklist: {'LocalBusiness': 'MISSING', 'AccountingService': 'MISSING', 'Service': 'MISSING', 'BreadcrumbList': 'MISSING', 'AggregateRating': 'MISSING', 'Review': 'MISSING', 'Organization': 'present', 'FAQPage': 'MISSING'}

### Component / trust patterns missing vs competitors
- ['decision_matrix', 'pricing_block', 'step_list']

## Page-1 competitors extracted
| domain | type | best pos | title | words | H2 | FAQ | schema |
| --- | --- | --- | --- | --- | --- | --- | --- |
| pfmdental.co.uk | landing | 1 | Specialist Dental Accountants for Dentists Across the UK | 8 | 0 | 0 | ImageObject,Organization,Service,WebPage,WebSite |
| samera.co.uk | deep | 1 | Specialist Dental Accountants for UK Dentists | Samera | 4345 | 15 | 20 | AccountingService,BreadcrumbList,FAQPage,Organization,Person,ProfessionalService,Service,WebPage,WebSite |
| www.djh.co.uk | deep | 2 | Dental Accountants & Business Advisers | 0 | 0 | 1 | BreadcrumbList,ImageObject,Organization,WebPage,WebSite |
| www.yorkshiremedicalaccountants.co.uk | deep | 7 | Dental Accountants - Yorkshire Medical Accountants | 6 | 0 | 0 | BreadcrumbList,ImageObject,Organization,WebPage,WebSite |
| www.ross-brooke-dental.co.uk | homepage | 2 | Dedicated Accountants for Dentists - Ross Brooke Dental Acco | 0 | 0 | 4 | BreadcrumbList,Organization,WebPage,WebSite |
| www.professional-accountants.co.uk | deep | 2 | Specialist Dental Accountants | 936 | 8 | 0 |  |
| nasdal.org.uk | landing | 3 | Dental Accounting | nasdal.org.uk | 4 | 0 | 1 |  |
| www.sandisoneasson.co.uk | landing | 3 | Dental Practice Accountants | Accounting Services for Dentis | 127 | 0 | 0 | LocalBusiness |
| dentalaccountancy.co.uk | homepage | 3 | RR Dental Accountants | Save Tax, Keep More Money | 455 | 7 | 2 | AccountingService,LocalBusiness,Organization,Service,WebSite |
| bhp.co.uk | deep | 4 | Dental Practices - BHP, Chartered Accountants | 926 | 4 | 2 | BreadcrumbList,ImageObject,Organization,WebPage,WebSite |
| www.hazlewoods.co.uk | deep | 8 | Dental Accountants | Hazlewoods: Business Advisers and Accou | 8 | 0 | 1 | AccountingService,Article,BreadcrumbList,Organization,Person,WebPage,WebSite |
| dentalaccountantsscotland.co.uk | homepage | 8 | Home - Dental Accountants Scotland - Accountants in Scotland | 141 | 3 | 0 | BreadcrumbList,WebPage,WebSite |