# BRIEF SCAFFOLD — optimise the medical homepage for its head-keyword family

You are an Opus 4.8 subagent. Using the analysis pack and rules below, write a self-contained implementation brief to `index.md` in this folder. Reason about the cannibalisation diagnosis; do not just restate the data. Produce: a title/meta formula, 3 H1 options, the recommended on-page sections + entity coverage, the schema additions, the internal-linking / cannibalisation actions (naming the exact catcher pages), the geo angle, trust additions, and risks.

- **Page:** https://www.medicalaccounts.co.uk/
- **Source file (hand-edit this):** `Medical/web/src/app/page.tsx`

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

# Core-page analysis pack — medical / homepage

- **Page:** https://www.medicalaccounts.co.uk/
- **Source (hand-edit this):** `Medical/web/src/app/page.tsx`

## Cannibalisation diagnosis
- Head-family queries tracked: **94** (3785 impressions, 90d).
- Queries the core page already owns: **84**.
- National head queries: **16**; national impressions NOT on the core page: **3**.

### Top catcher pages (which of OUR pages soaks up head-family impressions)
| catcher url | type | head queries | impr |
| --- | --- | --- | --- |
| https://www.medicalaccounts.co.uk/ | homepage | 84 | 3691 |
| https://www.medicalaccounts.co.uk/blog/gp-accounting-guide | blog | 4 | 22 |
| https://www.medicalaccounts.co.uk/blog/gp-accountant-services-complete-guide | blog | 5 | 8 |
| https://www.medicalaccounts.co.uk/blog/locum-tax | blog | 1 | 2 |

### Per-query cannibalisation map (top 30 by impressions)
| query | tot impr | nat | geo | catcher | catcher type | catcher pos | core-page pos | verdict |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| gp accountants | 1299 | Y |  | medicalaccounts.co.uk/ | homepage | 52.7 | 52.7 | homepage_already_owns |
| medical accountants | 355 | Y |  | medicalaccounts.co.uk/ | homepage | 55.9 | 55.9 | homepage_already_owns |
| gp practice accountants | 277 |  |  | medicalaccounts.co.uk/ | homepage | 72.3 | 72.3 | homepage_already_owns |
| specialist medical accountants | 274 | Y |  | medicalaccounts.co.uk/ | homepage | 64.8 | 64.8 | homepage_already_owns |
| medical accountants uk | 219 | Y |  | medicalaccounts.co.uk/ | homepage | 58.2 | 58.2 | homepage_already_owns |
| medical accounting | 127 |  |  | medicalaccounts.co.uk/ | homepage | 80.5 | 80.5 | homepage_already_owns |
| accounting specialists for medical professionals | 120 |  |  | medicalaccounts.co.uk/ | homepage | 51.3 | 51.3 | homepage_already_owns |
| accountants for locum doctors | 106 |  |  | medicalaccounts.co.uk/ | homepage | 60.5 | 60.5 | homepage_already_owns |
| gp accountant | 88 | Y |  | medicalaccounts.co.uk/ | homepage | 52.6 | 52.6 | homepage_already_owns |
| accountants for doctors | 81 | Y |  | medicalaccounts.co.uk/ | homepage | 66.2 | 66.2 | homepage_already_owns |
| accountants for gp practices | 78 |  |  | medicalaccounts.co.uk/ | homepage | 65.7 | 65.7 | homepage_already_owns |
| medical accountant | 68 | Y |  | medicalaccounts.co.uk/ | homepage | 70.1 | 70.1 | homepage_already_owns |
| medical accountants birmingham | 53 |  | Y | medicalaccounts.co.uk/ | homepage | 39.9 | 39.9 | homepage_already_owns |
| accounting for doctors | 46 |  |  | medicalaccounts.co.uk/ | homepage | 78.1 | 78.1 | homepage_already_owns |
| accounting for gp partners | 38 |  |  | medicalaccounts.co.uk/blog/gp-accounting-guide | blog | 42.1 | 91.7 | caught_by_blog_consolidate |
| accountants for nhs doctors | 36 |  |  | medicalaccounts.co.uk/ | homepage | 59.2 | 59.2 | homepage_already_owns |
| accountant for medical professionals | 35 | Y |  | medicalaccounts.co.uk/ | homepage | 62.9 | 62.9 | homepage_already_owns |
| accountant for doctors | 31 |  |  | medicalaccounts.co.uk/ | homepage | 53.8 | 53.8 | homepage_already_owns |
| doctor accountants | 31 |  |  | medicalaccounts.co.uk/ | homepage | 63.7 | 63.7 | homepage_already_owns |
| accountants for physicians | 29 |  |  | medicalaccounts.co.uk/ | homepage | 70.2 | 70.2 | homepage_already_owns |
| accountant for physicians | 25 |  |  | medicalaccounts.co.uk/ | homepage | 54.8 | 54.8 | homepage_already_owns |
| medical accountants london | 24 |  | Y | medicalaccounts.co.uk/ | homepage | 48.3 | 48.3 | homepage_already_owns |
| medical accountant birmingham | 21 |  | Y | medicalaccounts.co.uk/ | homepage | 31.9 | 31.9 | homepage_already_owns |
| doctors accountant | 21 |  |  | medicalaccounts.co.uk/ | homepage | 58.1 | 58.1 | homepage_already_owns |
| locum doctor accountant | 20 |  |  | medicalaccounts.co.uk/ | homepage | 72.8 | 72.8 | homepage_already_owns |
| accountants for medical professionals | 17 |  |  | medicalaccounts.co.uk/ | homepage | 47.5 | 47.5 | homepage_already_owns |
| accountant for medical doctors | 15 |  |  | medicalaccounts.co.uk/ | homepage | 54.2 | 54.2 | homepage_already_owns |
| doctor accountant | 14 |  |  | medicalaccounts.co.uk/ | homepage | 60.6 | 60.6 | homepage_already_owns |
| personal tax accountants for medical | 12 |  |  | medicalaccounts.co.uk/ | homepage | 53.6 | 53.6 | homepage_already_owns |
| tax accountants for doctors | 12 | Y |  | medicalaccounts.co.uk/ | homepage | 61.4 | 61.4 | homepage_already_owns |

## Our core page vs page-1 competitors
| metric | ours | competitor median | competitor max |
| --- | --- | --- | --- |
| word count | 34 | 435 | 1479 |
| H2 sections | 0 | 1 | - |
| FAQs | 3 | 0 | - |

### Headline keyword coverage (the #1 gap)
- Title: `GP Accountants UK | Tax Specialists for Doctors` — contains head token: **gp accountants**
- H1: `Specialist Accountants for GPs & Medical Professionals` — contains head token: **NO**
- **FLAG: the H1 has no head keyword (it's a slogan).** Highest-leverage single fix.

### Schema
- Ours: ['FAQPage', 'Organization', 'WebSite']
- Competitor frequency: {'Organization': 5, 'WebPage': 5, 'WebSite': 5, 'BreadcrumbList': 4, 'ImageObject': 3, 'Article': 2, 'FinancialService': 1, 'AccountingService': 1, 'Place': 1, 'LocalBusiness': 1, 'FAQPage': 1, 'Question': 1, 'Person': 1}
- Missing vs competitors (>=2 have it): ['Article', 'BreadcrumbList', 'ImageObject', 'WebPage']
- Commercial checklist: {'LocalBusiness': 'MISSING', 'AccountingService': 'MISSING', 'Service': 'MISSING', 'BreadcrumbList': 'MISSING', 'AggregateRating': 'MISSING', 'Review': 'MISSING', 'Organization': 'present', 'FAQPage': 'present'}

### Component / trust patterns missing vs competitors
- ['decision_matrix', 'step_list']

## Page-1 competitors extracted
| domain | type | best pos | title | words | H2 | FAQ | schema |
| --- | --- | --- | --- | --- | --- | --- | --- |
| www.bw-medical.co.uk | homepage | 1 | Specialist Medical Accountants, Accountants for Medical Prof | 435 | 0 | 0 | FinancialService |
| sial-accountants.co.uk | homepage | 5 | Specialist Accountants for Doctors | SIAL Accountants | 7 | 0 | 0 | AccountingService,ImageObject,Organization,Place,WebPage,WebSite |
| www.sandisoneasson.co.uk | homepage | 1 | Specialist Medical Accountants | Sandison Easson & Co. Accou | 253 | 6 | 0 | LocalBusiness |
| www.forvismazars.com | deep | 3 | Specialist Medical Accountants for Healthcare Professionals | 589 | 1 | 8 | Article |
| nicholsmedical.co.uk | homepage | 4 | Nichols & Co - Leading Medical Accountants in the UK | 10 | 0 | 0 | BreadcrumbList,FAQPage,ImageObject,Organization,Question,WebPage,WebSite |
| r-m-t.co.uk | deep | 1 | GP Practice Accountants | RMT Accountants | 1479 | 10 | 0 | Article,BreadcrumbList,Organization,Person,WebPage,WebSite |
| practiceindex.co.uk | deep | 2 | Medical Practice Accountants - Rated and Reviewed   | Practi | 734 | 4 | 0 |  |
| www.tc-group.com | deep | 4 | AISMA Medical Accountants for GPs & Practices | TC Group | 804 | 4 | 5 | BreadcrumbList,ImageObject,Organization,WebPage,WebSite |
| www.mmba.co.uk | deep | 5 | Medical Accountants for Doctors & Healthcare in UK – MMBA | 10 | 0 | 9 | BreadcrumbList,Organization,WebPage,WebSite |

_Could not fetch: ['medicsmoney.co.uk', 'aisma.org.uk', 'medicalaccountantslondon.co.uk']_