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
- Head-family queries tracked: **440** (2503 impressions, 90d).
- Queries the core page already owns: **1**.
- National head queries: **38**; national impressions NOT on the core page: **176**.

### Top catcher pages (which of OUR pages soaks up head-family impressions)
| catcher url | type | head queries | impr |
| --- | --- | --- | --- |
| https://www.hollowaydavies.co.uk/blog/payroll-and-paye/accountant-for-construction-subcontractors-cis | blog | 14 | 344 |
| https://www.hollowaydavies.co.uk/blog/limited-company-tax/accountant-for-vets-uk | blog | 9 | 197 |
| https://www.hollowaydavies.co.uk/locations/putney | location | 40 | 183 |
| https://www.hollowaydavies.co.uk/locations/cannock | location | 13 | 153 |
| https://www.hollowaydavies.co.uk/locations/croydon | location | 5 | 86 |
| https://www.hollowaydavies.co.uk/locations/st-albans | location | 9 | 74 |
| https://www.hollowaydavies.co.uk/locations/bangor-wales | location | 7 | 70 |
| https://www.hollowaydavies.co.uk/blog/sole-trader-and-self-employment/accountant-for-plumbers-uk | blog | 1 | 68 |
| https://www.hollowaydavies.co.uk/locations/exeter | location | 13 | 66 |
| https://www.hollowaydavies.co.uk/locations/norwich | location | 19 | 66 |
| https://www.hollowaydavies.co.uk/blog/incorporation-and-structure/what-does-a-company-formation-accountant-do | blog | 3 | 57 |
| https://www.hollowaydavies.co.uk/locations/sutton | location | 12 | 52 |
| https://www.hollowaydavies.co.uk/locations/bromley | location | 9 | 52 |
| https://www.hollowaydavies.co.uk/locations/derby | location | 14 | 44 |
| https://www.hollowaydavies.co.uk/locations/salford | location | 6 | 42 |

### Per-query cannibalisation map (top 30 by impressions)
| query | tot impr | nat | geo | catcher | catcher type | catcher pos | core-page pos | verdict |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| cis accountant | 227 |  |  | hollowaydavies.co.uk/blog/payroll-and-paye/accountant-for-construction-subcontractors-cis | blog | 74.7 | - | caught_by_blog_consolidate |
| dentist accountants near me | 78 |  | Y | hollowaydavies.co.uk/locations/grimsby | location | 75.0 | - | geo_keep_local |
| plumbers accountant | 68 |  |  | hollowaydavies.co.uk/blog/sole-trader-and-self-employment/accountant-for-plumbers-uk | blog | 47.8 | - | caught_by_blog_consolidate |
| veterinary accountants | 54 |  |  | hollowaydavies.co.uk/blog/limited-company-tax/accountant-for-vets-uk | blog | 29.9 | - | caught_by_blog_consolidate |
| chartered accountants bangor | 53 |  |  | hollowaydavies.co.uk/locations/bangor-wales | location | 37.6 | - | national_caught_by_location_reassign |
| accountants for vets | 53 |  |  | hollowaydavies.co.uk/blog/limited-company-tax/accountant-for-vets-uk | blog | 34.2 | - | caught_by_blog_consolidate |
| vet accountant | 53 |  |  | hollowaydavies.co.uk/blog/limited-company-tax/accountant-for-vets-uk | blog | 26.8 | - | caught_by_blog_consolidate |
| audits accountants st albans | 38 |  | Y | hollowaydavies.co.uk/locations/st-albans | location | 66.4 | - | geo_keep_local |
| cis contractors accountant | 36 |  |  | hollowaydavies.co.uk/blog/payroll-and-paye/accountant-for-construction-subcontractors-cis | blog | 63.6 | - | caught_by_blog_consolidate |
| healthcare accountant sutton | 34 |  |  | hollowaydavies.co.uk/locations/sutton | location | 43.4 | - | national_caught_by_location_reassign |
| rural accountants exeter | 29 |  |  | hollowaydavies.co.uk/locations/exeter | location | 40.6 | - | national_caught_by_location_reassign |
| cis tax return accountants | 28 |  |  | hollowaydavies.co.uk/blog/payroll-and-paye/accountant-for-construction-subcontractors-cis | blog | 70.2 | - | caught_by_blog_consolidate |
| transport accountants croydon | 24 |  |  | hollowaydavies.co.uk/locations/croydon | location | 79.2 | - | national_caught_by_location_reassign |
| medical accountants croydon | 23 |  |  | hollowaydavies.co.uk/locations/croydon | location | 82.6 | - | national_caught_by_location_reassign |
| retail accountants croydon | 21 |  |  | hollowaydavies.co.uk/locations/croydon | location | 82.1 | - | national_caught_by_location_reassign |
| corporate accountants cardiff | 21 |  |  | hollowaydavies.co.uk/locations/cardiff | location | 75.9 | - | national_caught_by_location_reassign |
| company formation accountant | 21 |  |  | hollowaydavies.co.uk/blog/incorporation-and-structure/what-does-a-company-formation-accountant-do | blog | 15.2 | - | caught_by_blog_consolidate |
| company formation accountants | 20 |  |  | hollowaydavies.co.uk/blog/incorporation-and-structure/what-does-a-company-formation-accountant-do | blog | 20.6 | - | caught_by_blog_consolidate |
| chartered accountant service charges | 20 |  |  | hollowaydavies.co.uk/blog/bookkeeping-and-compliance/accounting-service-charges-2025-26-breakdown | blog | 20.4 | - | caught_by_blog_consolidate |
| self assessment accountant cannock | 19 |  |  | hollowaydavies.co.uk/locations/cannock | location | 57.0 | - | national_caught_by_location_reassign |
| accountant for builders cannock | 18 |  |  | hollowaydavies.co.uk/locations/cannock | location | 44.9 | - | national_caught_by_location_reassign |
| cis accountant peterborough | 18 |  |  | hollowaydavies.co.uk/locations/peterborough | location | 56.0 | - | national_caught_by_location_reassign |
| payroll accountant near bromley | 18 |  |  | hollowaydavies.co.uk/locations/bromley | location | 71.5 | - | national_caught_by_location_reassign |
| accountants for the photographic industry | 18 |  |  | hollowaydavies.co.uk/blog/sole-trader-and-self-employment/accountant-for-photographers-uk | blog | 12.9 | - | caught_by_blog_consolidate |
| construction accountant cannock | 18 |  |  | hollowaydavies.co.uk/locations/cannock | location | 41.2 | - | national_caught_by_location_reassign |
| small business accountant cannock | 18 | Y |  | hollowaydavies.co.uk/locations/cannock | location | 46.1 | - | national_caught_by_location_reassign |
| construction industry scheme accountant | 18 |  |  | hollowaydavies.co.uk/blog/payroll-and-paye/accountant-for-construction-subcontractors-cis | blog | 69.6 | - | caught_by_blog_consolidate |
| new business accountant croydon | 17 |  |  | hollowaydavies.co.uk/locations/croydon | location | 88.7 | - | national_caught_by_location_reassign |
| accountants for schools and academies | 17 |  |  | hollowaydavies.co.uk/blog/bookkeeping-and-compliance/accountant-for-schools-uk | blog | 77.1 | - | caught_by_blog_consolidate |
| self employed accountant cannock | 17 |  |  | hollowaydavies.co.uk/locations/cannock | location | 71.1 | - | national_caught_by_location_reassign |

## Our core page vs page-1 competitors
| metric | ours | competitor median | competitor max |
| --- | --- | --- | --- |
| word count | 482 | 1202.5 | 2675 |
| H2 sections | 4 | 6.5 | - |
| FAQs | 4 | 3.0 | - |

### Headline keyword coverage (the #1 gap)
- Title: `Holloway Davies | ICAEW chartered accountants for UK business` — contains head token: **NO**
- H1: `UK business accounting, done with conviction.` — contains head token: **NO**
- **FLAG: the H1 has no head keyword (it's a slogan).** Highest-leverage single fix.

### Schema
- Ours: ['FAQPage', 'ProfessionalService', 'WebSite']
- Competitor frequency: {'BreadcrumbList': 3, 'Article': 1, 'ImageObject': 1, 'Organization': 1, 'Person': 1, 'WebPage': 1, 'WebSite': 1, 'Product': 1, 'FAQPage': 1, 'LocalBusiness': 1, 'Service': 1}
- Missing vs competitors (>=2 have it): ['BreadcrumbList']
- Commercial checklist: {'LocalBusiness': 'MISSING', 'AccountingService': 'MISSING', 'Service': 'MISSING', 'BreadcrumbList': 'MISSING', 'AggregateRating': 'MISSING', 'Review': 'MISSING', 'Organization': 'MISSING', 'FAQPage': 'present'}

### Component / trust patterns missing vs competitors
- ['decision_matrix']

## Page-1 competitors extracted
| domain | type | best pos | title | words | H2 | FAQ | schema |
| --- | --- | --- | --- | --- | --- | --- | --- |
| www.itcontracting.com | landing | 1 | Contractor Accountants – compare fees and costs [2026] - IT  | 11 | 0 | 4 | Article,BreadcrumbList,ImageObject,Organization,Person,WebPage,WebSite |
| www.crunch.co.uk | deep | 2 | Online Accountants For Limited Companies | Unlimited Support | 2275 | 10 | 2 | Product |
| www.bark.com | deep | 6 | Accountants Near Me  | Tax Return Accountants  | Personal or | 2675 | 15 | 8 | BreadcrumbList,FAQPage,LocalBusiness,Service |
| www.gov.uk | landing | 6 | Set up as a sole trader: step by step - GOV.UK | 130 | 3 | 1 | BreadcrumbList |

_Could not fetch: ['theaccountancy.co.uk', 'gorillaaccounting.com', 'limitedcompanyhelp.com', 'taxassist.co.uk', 'a-wise.co.uk', 'research.com', 'e-accounts.co.uk', 'yorkshireaccountancy.co.uk']_