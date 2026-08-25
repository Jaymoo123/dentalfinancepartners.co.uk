# BRIEF SCAFFOLD — optimise the generalist homepage for its head-keyword family

You are an Opus 4.8 subagent. Using the analysis pack and rules below, write a self-contained implementation brief to `index.md` in this folder. Reason about the cannibalisation diagnosis; do not just restate the data. Produce: a title/meta formula, 3 H1 options, the recommended on-page sections + entity coverage, the schema additions, the internal-linking / cannibalisation actions (naming the exact catcher pages), the geo angle, trust additions, and risks.

- **Page:** https://www.hollowaydavies.co.uk/
- **Source file (hand-edit this):** `generalist/web/src/app/page.tsx`

## Site rules (from SITE_RULES)
- **Domain:** https://www.hollowaydavies.co.uk
- **Web root (build here):** `generalist/web`
- **Audience:** UK SME owners — limited company directors, contractors and freelancers, sole traders, and partnerships/LLPs
- **Lead-form segments:** ['Limited company', 'Sole trader', 'Contractor or freelancer', 'Partnership or LLP', 'Just starting out']
- **Pillar pages to link to:**
  - Limited company accountant (definitive): `/fundamentals/definitive-guide-limited-company-accountant`
  - Sole trader accountant (definitive): `/fundamentals/definitive-guide-sole-trader-accountant`
  - Contractor accountant (definitive): `/fundamentals/definitive-guide-choosing-contractor-accountant-uk`
  - Online accountant UK (definitive): `/fundamentals/definitive-guide-online-accountant-uk`
  - Small business accountant guide: `/fundamentals/small-business-accountant-guide`
  - How corporation tax works: `/fundamentals/how-does-corporation-tax-work`
  - Limited company vs sole trader: `/fundamentals/limited-company-vs-sole-trader`
  - VAT accountant / when to register: `/fundamentals/vat-accountant`
  - R&D tax credits explained: `/fundamentals/r-and-d-tax-credits-explained`
  - IR35 explained: `/fundamentals/ir35-explained`
  - MTD for Income Tax: `/fundamentals/making-tax-digital-for-income-tax-guide`
- **Authority links to favour:**
  - [HMRC Company Taxation Manual (CTM)](https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual)
  - [HMRC Business Income Manual (BIM)](https://www.gov.uk/hmrc-internal-manuals/business-income-manual)
  - [HMRC VAT registration](https://www.gov.uk/vat-registration)
  - [HMRC PAYE for employers](https://www.gov.uk/paye-for-employers)
  - [gov.uk MTD for ITSA sign-up checker](https://www.gov.uk/guidance/check-when-to-sign-up-for-making-tax-digital-for-income-tax)
  - [HMRC R&D tax relief (CIRD manual)](https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual)
  - [HMRC off-payroll working (IR35) guidance](https://www.gov.uk/guidance/understanding-off-payroll-working-ir35)
  - [Companies House — file your annual accounts](https://www.gov.uk/file-your-company-annual-accounts)
  - [HMRC Business Asset Disposal Relief](https://www.gov.uk/business-asset-disposal-relief)


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

# Core-page analysis pack — generalist / homepage

- **Page:** https://www.hollowaydavies.co.uk/
- **Source (hand-edit this):** `generalist/web/src/app/page.tsx`

## Cannibalisation diagnosis
- Head-family queries tracked: **450** (5840 impressions, 90d).
- Queries the core page already owns: **1**.
- National head queries: **43**; national impressions NOT on the core page: **522**.

### Top catcher pages (which of OUR pages soaks up head-family impressions)
| catcher url | type | head queries | impr |
| --- | --- | --- | --- |
| https://www.hollowaydavies.co.uk/locations/cannock | location | 13 | 478 |
| https://www.hollowaydavies.co.uk/locations/bury-st-edmunds | location | 20 | 462 |
| https://www.hollowaydavies.co.uk/locations/putney | location | 39 | 333 |
| https://www.hollowaydavies.co.uk/locations/exeter | location | 23 | 306 |
| https://www.hollowaydavies.co.uk/locations/bromsgrove | location | 6 | 260 |
| https://www.hollowaydavies.co.uk/blog/sole-trader-and-self-employment/accountant-for-plumbers-uk | blog | 3 | 257 |
| https://www.hollowaydavies.co.uk/blog/sole-trader-and-self-employment/accountant-for-forex-traders-uk | blog | 14 | 247 |
| https://www.hollowaydavies.co.uk/blog/payroll-and-paye/accountant-for-construction-subcontractors-cis | blog | 10 | 203 |
| https://www.hollowaydavies.co.uk/blog/limited-company-tax/accountant-for-vets-uk | blog | 9 | 197 |
| https://www.hollowaydavies.co.uk/locations/croydon | location | 6 | 194 |
| https://www.hollowaydavies.co.uk/locations/st-albans | location | 9 | 159 |
| https://www.hollowaydavies.co.uk/locations/sutton | location | 16 | 147 |
| https://www.hollowaydavies.co.uk/locations/salford | location | 6 | 126 |
| https://www.hollowaydavies.co.uk/locations/cardiff | location | 7 | 104 |
| https://www.hollowaydavies.co.uk/contact | core_other | 7 | 97 |

### Per-query cannibalisation map (top 30 by impressions)
| query | tot impr | nat | geo | catcher | catcher type | catcher pos | core-page pos | verdict |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| plumbers accountant | 250 |  |  | hollowaydavies.co.uk/blog/sole-trader-and-self-employment/accountant-for-plumbers-uk | blog | 32.8 | - | caught_by_blog_consolidate |
| bromsgrove accountants | 124 |  |  | hollowaydavies.co.uk/locations/bromsgrove | location | 36.8 | - | national_caught_by_location_reassign |
| accountant bromsgrove | 116 |  |  | hollowaydavies.co.uk/locations/bromsgrove | location | 32.9 | - | national_caught_by_location_reassign |
| accountants bury st edmunds | 103 |  |  | hollowaydavies.co.uk/locations/bury-st-edmunds | location | 38.3 | - | national_caught_by_location_reassign |
| accountant bury st edmunds | 94 |  |  | hollowaydavies.co.uk/locations/bury-st-edmunds | location | 35.9 | - | national_caught_by_location_reassign |
| healthcare accountant sutton | 86 |  |  | hollowaydavies.co.uk/locations/sutton | location | 46.4 | - | national_caught_by_location_reassign |
| audits accountants st albans | 83 |  | Y | hollowaydavies.co.uk/locations/st-albans | location | 63.4 | - | geo_keep_local |
| dentist accountants near me | 82 |  | Y | hollowaydavies.co.uk/locations/grimsby | location | 76.7 | - | geo_keep_local |
| accountants for forex traders uk | 81 |  |  | hollowaydavies.co.uk/blog/sole-trader-and-self-employment/accountant-for-forex-traders-uk | blog | 11.0 | - | caught_by_blog_consolidate |
| construction accountant cannock | 79 |  |  | hollowaydavies.co.uk/locations/cannock | location | 41.7 | - | national_caught_by_location_reassign |
| accountant fees 2025 | 79 |  |  | hollowaydavies.co.uk/blog/bookkeeping-and-compliance/accounting-fee-2025-26-uk-business-guide | blog | 15.0 | - | caught_by_blog_consolidate |
| accountant for builders cannock | 73 |  |  | hollowaydavies.co.uk/locations/cannock | location | 45.5 | - | national_caught_by_location_reassign |
| sole trader accountant cannock | 70 | Y |  | hollowaydavies.co.uk/locations/cannock | location | 66.3 | - | national_caught_by_location_reassign |
| transport accountants croydon | 70 |  |  | hollowaydavies.co.uk/locations/croydon | location | 79.0 | - | national_caught_by_location_reassign |
| accountancy exeter | 68 |  |  | hollowaydavies.co.uk/locations/exeter | location | 73.0 | - | national_caught_by_location_reassign |
| accountants in bury st edmunds | 63 |  |  | hollowaydavies.co.uk/locations/bury-st-edmunds | location | 35.9 | - | national_caught_by_location_reassign |
| chartered accountant service charges | 63 |  |  | hollowaydavies.co.uk/blog/bookkeeping-and-compliance/accounting-service-charges-2025-26-breakdown | blog | 21.4 | - | caught_by_blog_consolidate |
| doctors and dentists accountant | 63 |  |  | hollowaydavies.co.uk/blog/limited-company-tax/accountants-for-dentists | blog | 70.9 | - | caught_by_blog_consolidate |
| accountants for forex traders | 61 |  |  | hollowaydavies.co.uk/blog/sole-trader-and-self-employment/accountant-for-forex-traders-uk | blog | 11.4 | - | caught_by_blog_consolidate |
| corporate accountants cardiff | 60 |  |  | hollowaydavies.co.uk/locations/cardiff | location | 75.1 | - | national_caught_by_location_reassign |
| vat compliance accountant edinburgh | 56 |  | Y | hollowaydavies.co.uk/locations/edinburgh | location | 57.6 | - | geo_keep_local |
| accountant for cis contractors | 55 |  |  | hollowaydavies.co.uk/blog/payroll-and-paye/accountant-for-construction-subcontractors-cis | blog | 72.8 | - | caught_by_blog_consolidate |
| accountants for the photographic industry | 55 |  |  | hollowaydavies.co.uk/blog/sole-trader-and-self-employment/accountant-for-photographers-uk | blog | 13.8 | - | caught_by_blog_consolidate |
| veterinary accountants | 54 |  |  | hollowaydavies.co.uk/blog/limited-company-tax/accountant-for-vets-uk | blog | 29.9 | - | caught_by_blog_consolidate |
| accountants for vets | 53 |  |  | hollowaydavies.co.uk/blog/limited-company-tax/accountant-for-vets-uk | blog | 34.2 | - | caught_by_blog_consolidate |
| vet accountant | 53 |  |  | hollowaydavies.co.uk/blog/limited-company-tax/accountant-for-vets-uk | blog | 26.8 | - | caught_by_blog_consolidate |
| small business accountant cannock | 52 | Y |  | hollowaydavies.co.uk/locations/cannock | location | 44.1 | - | national_caught_by_location_reassign |
| rural accountants exeter | 52 |  |  | hollowaydavies.co.uk/locations/exeter | location | 30.6 | - | national_caught_by_location_reassign |
| self employed accountant cannock | 52 |  |  | hollowaydavies.co.uk/locations/cannock | location | 65.2 | - | national_caught_by_location_reassign |
| healthcare accountants barnet | 51 |  |  | hollowaydavies.co.uk/locations/barnet | location | 55.2 | - | national_caught_by_location_reassign |

## Our core page vs page-1 competitors
| metric | ours | competitor median | competitor max |
| --- | --- | --- | --- |
| word count | 1345 | 68.0 | 3299 |
| H2 sections | 8 | 0.0 | - |
| FAQs | 11 | 3.5 | - |

### Headline keyword coverage (the #1 gap)
- Title: `Small Business Accountants UK | Holloway Davies` — contains head token: **small business accountant**
- H1: `Small business accountants for UK limited companies, sole traders and contractors.` — contains head token: **small business accountant**

### Schema
- Ours: ['AccountingService', 'BreadcrumbList', 'FAQPage', 'ProfessionalService', 'Service', 'WebPage', 'WebSite']
- Competitor frequency: {'Organization': 4, 'WebPage': 4, 'WebSite': 3, 'BreadcrumbList': 2, 'FAQPage': 2, 'Article': 2, 'ImageObject': 1, 'LocalBusiness': 1, 'DefinedTermSet': 1, 'HowTo': 1, 'ProfessionalService': 1, 'Service': 1, 'ItemList': 1}
- Missing vs competitors (>=2 have it): ['Article', 'Organization']
- Commercial checklist: {'LocalBusiness': 'MISSING', 'AccountingService': 'present', 'Service': 'present', 'BreadcrumbList': 'present', 'AggregateRating': 'MISSING', 'Review': 'MISSING', 'Organization': 'MISSING', 'FAQPage': 'present'}

### Component / trust patterns missing vs competitors
- ['inline_callout_aside']

## Page-1 competitors extracted
| domain | type | best pos | title | words | H2 | FAQ | schema |
| --- | --- | --- | --- | --- | --- | --- | --- |
| a-wise.co.uk | homepage | 1 | Online Accountants | From £10pm | Small Businesses & Persona | 0 | 0 | 0 | BreadcrumbList,ImageObject,Organization,WebPage,WebSite |
| www.qaccounting.com | deep | 4 | Accountant for Limited Company, Ltd Accountants - QAccountin | 3299 | 17 | 6 | BreadcrumbList,LocalBusiness,Organization,WebPage,WebSite |
| www.goforma.com | deep | 6 | Accountant for Sole Traders from £22/mo | GoForma | 70 | 0 | 23 | DefinedTermSet,FAQPage,HowTo,Organization,ProfessionalService,Service,WebPage |
| www.xero.com | homepage | 1 | Software & Solutions for Small Businesses | Xero UK | 618 | 15 | 1 |  |
| en.wikipedia.org | deep | 1 | E-accounting - Wikipedia | 0 | 0 | 0 | Article |
| www.contractoruk.com | deep | 1 | Accountancy Services Providers For IT Contractors | 66 | 0 | 13 | Article,FAQPage,ItemList,Organization,WebPage,WebSite |

_Could not fetch: ['bing.com', 'theaccountancy.co.uk', 'linkedin.com', 'accountsandlegal.co.uk', 'sleek.com', 'limitedcompanyhelp.com']_