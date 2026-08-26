# BRIEF SCAFFOLD — optimise the medical for_gps for its head-keyword family

You are an Opus 4.8 subagent. Using the analysis pack and rules below, write a self-contained implementation brief to `index.md` in this folder. Reason about the cannibalisation diagnosis; do not just restate the data. Produce: a title/meta formula, 3 H1 options, the recommended on-page sections + entity coverage, the schema additions, the internal-linking / cannibalisation actions (naming the exact catcher pages), the geo angle, trust additions, and risks.

- **Page:** https://www.medicalaccounts.co.uk/for-gps
- **Source file (hand-edit this):** `Medical/web/src/app/for-gps/page.tsx`

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

# Core-page analysis pack — medical / for_gps

- **Page:** https://www.medicalaccounts.co.uk/for-gps
- **Source (hand-edit this):** `Medical/web/src/app/for-gps/page.tsx`

## Cannibalisation diagnosis
- Head-family queries tracked: **40** (625 impressions, 90d).
- Queries the core page already owns: **2**.
- National head queries: **3**; national impressions NOT on the core page: **38**.

### Top catcher pages (which of OUR pages soaks up head-family impressions)
| catcher url | type | head queries | impr |
| --- | --- | --- | --- |
| https://www.medicalaccounts.co.uk/ | homepage | 2 | 349 |
| https://www.medicalaccounts.co.uk/blog/becoming-gp-partner-financial-implications | blog | 26 | 145 |
| https://www.medicalaccounts.co.uk/blog/buying-into-gp-partnership-capital-parity-explained | blog | 4 | 48 |
| https://www.medicalaccounts.co.uk/blog/gp-accounting-guide | blog | 3 | 20 |
| https://www.medicalaccounts.co.uk/blog/gp-partner-vs-salaried-gp-tax-comparison | blog | 4 | 7 |
| https://www.medicalaccounts.co.uk/blog/gp-partnership-mutual-assessment-period-what-to-check | blog | 1 | 1 |

### Per-query cannibalisation map (top 30 by impressions)
| query | tot impr | nat | geo | catcher | catcher type | catcher pos | core-page pos | verdict |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| gp practice accountants | 277 | Y |  | medicalaccounts.co.uk/ | homepage | 72.3 | 72.3 | homepage_already_owns |
| accountants for gp practices | 78 | Y |  | medicalaccounts.co.uk/ | homepage | 65.7 | 65.7 | homepage_already_owns |
| gp partnership goodwill valuation | 39 |  |  | medicalaccounts.co.uk/blog/buying-into-gp-partnership-capital-parity-explained | blog | 9.0 | - | caught_by_blog_consolidate |
| accounting for gp partners | 38 | Y |  | medicalaccounts.co.uk/blog/gp-accounting-guide | blog | 42.1 | 91.7 | caught_by_blog_consolidate |
| what is a gp partner | 31 |  |  | medicalaccounts.co.uk/blog/becoming-gp-partner-financial-implications | blog | 67.9 | - | caught_by_blog_consolidate |
| gp partner expenses | 20 |  |  | medicalaccounts.co.uk/blog/becoming-gp-partner-financial-implications | blog | 26.9 | 62.5 | caught_by_blog_consolidate |
| how much does it cost to buy into a gp partnership | 18 |  |  | medicalaccounts.co.uk/blog/becoming-gp-partner-financial-implications | blog | 10.4 | - | caught_by_blog_consolidate |
| gp partner salary after tax | 10 |  |  | medicalaccounts.co.uk/blog/becoming-gp-partner-financial-implications | blog | 13.8 | - | caught_by_blog_consolidate |
| becoming a gp partner | 9 |  |  | medicalaccounts.co.uk/blog/becoming-gp-partner-financial-implications | blog | 40.9 | - | caught_by_blog_consolidate |
| new gp partner mortgage | 8 |  |  | medicalaccounts.co.uk/blog/becoming-gp-partner-financial-implications | blog | 49.4 | - | caught_by_blog_consolidate |
| how to become a gp partner | 7 |  |  | medicalaccounts.co.uk/blog/becoming-gp-partner-financial-implications | blog | 41.9 | - | caught_by_blog_consolidate |
| how much to buy into a gp partnership | 7 |  |  | medicalaccounts.co.uk/blog/becoming-gp-partner-financial-implications | blog | 35.8 | - | caught_by_blog_consolidate |
| gp partner vs salaried gp | 7 |  |  | medicalaccounts.co.uk/blog/becoming-gp-partner-financial-implications | blog | 16.4 | - | caught_by_blog_consolidate |
| cost of buying into a gp partnership | 7 |  |  | medicalaccounts.co.uk/blog/buying-into-gp-partnership-capital-parity-explained | blog | 19.5 | - | caught_by_blog_consolidate |
| how much does a gp partner earn uk | 6 |  |  | medicalaccounts.co.uk/blog/becoming-gp-partner-financial-implications | blog | 21.1 | - | caught_by_blog_consolidate |
| buying into a gp partnership | 6 |  |  | medicalaccounts.co.uk/blog/buying-into-gp-partnership-capital-parity-explained | blog | 21.8 | - | caught_by_blog_consolidate |
| gp practice accounting | 6 |  |  | medicalaccounts.co.uk/blog/gp-accounting-guide | blog | 33.2 | 88.0 | caught_by_blog_consolidate |
| gp partner vs salaried | 5 |  |  | medicalaccounts.co.uk/blog/becoming-gp-partner-financial-implications | blog | 24.1 | - | caught_by_blog_consolidate |
| salaried gp vs gp partner | 5 |  |  | medicalaccounts.co.uk/blog/becoming-gp-partner-financial-implications | blog | 11.7 | - | caught_by_blog_consolidate |
| gp partnership retirement clause | 4 |  |  | medicalaccounts.co.uk/blog/becoming-gp-partner-financial-implications | blog | 63.8 | - | caught_by_blog_consolidate |
| gp partner | 4 |  |  | medicalaccounts.co.uk/blog/becoming-gp-partner-financial-implications | blog | 44.3 | - | caught_by_blog_consolidate |
| difference between gp partner and salaried gp | 4 |  |  | medicalaccounts.co.uk/blog/gp-partner-vs-salaried-gp-tax-comparison | blog | 8.2 | - | caught_by_blog_consolidate |
| gp partner salary | 4 |  |  | medicalaccounts.co.uk/blog/becoming-gp-partner-financial-implications | blog | 38.0 | - | caught_by_blog_consolidate |
| broker for gp partnership buy in loan | 3 |  |  | medicalaccounts.co.uk/blog/buying-into-gp-partnership-capital-parity-explained | blog | 45.3 | - | caught_by_blog_consolidate |
| gp partner meaning | 2 |  |  | medicalaccounts.co.uk/blog/becoming-gp-partner-financial-implications | blog | 62.0 | - | caught_by_blog_consolidate |
| gp partnership | 2 |  |  | medicalaccounts.co.uk/blog/becoming-gp-partner-financial-implications | blog | 73.0 | - | caught_by_blog_consolidate |
| gp partnership salary | 2 |  |  | medicalaccounts.co.uk/blog/becoming-gp-partner-financial-implications | blog | 52.5 | - | caught_by_blog_consolidate |
| gp practice accountant | 2 |  |  | medicalaccounts.co.uk/blog/gp-accounting-guide | blog | 46.0 | - | caught_by_blog_consolidate |
| how much do gp partners earn | 2 |  |  | medicalaccounts.co.uk/blog/becoming-gp-partner-financial-implications | blog | 26.0 | - | caught_by_blog_consolidate |
| gp partner salary uk | 2 |  |  | medicalaccounts.co.uk/blog/gp-partner-vs-salaried-gp-tax-comparison | blog | 2.0 | - | caught_by_blog_consolidate |

## Our core page vs page-1 competitors
| metric | ours | competitor median | competitor max |
| --- | --- | --- | --- |
| word count | 1183 | 1002 | 63810 |
| H2 sections | 5 | 0 | - |
| FAQs | 12 | 0 | - |

### Headline keyword coverage (the #1 gap)
- Title: `GP Accountant | NHS Pension & Tax for GP Partners & Salaried GPs | Medical Accountants UK` — contains head token: **NO**
- H1: `GP accountant specialists for partners and salaried GPs` — contains head token: **NO**
- **FLAG: the H1 has no head keyword (it's a slogan).** Highest-leverage single fix.

### Schema
- Ours: ['BreadcrumbList', 'FAQPage', 'Organization', 'Service', 'WebSite']
- Competitor frequency: {'BreadcrumbList': 7, 'WebPage': 6, 'WebSite': 6, 'Organization': 5, 'ImageObject': 4, 'Person': 3, 'AccountingService': 2, 'Article': 2, 'FAQPage': 2, 'FinancialService': 1, 'BlogPosting': 1, 'Place': 1, 'NewsArticle': 1, 'Service': 1, 'SiteNavigationElement': 1}
- Missing vs competitors (>=2 have it): ['AccountingService', 'Article', 'ImageObject', 'Person', 'WebPage']
- Commercial checklist: {'LocalBusiness': 'MISSING', 'AccountingService': 'MISSING', 'Service': 'present', 'BreadcrumbList': 'present', 'AggregateRating': 'MISSING', 'Review': 'MISSING', 'Organization': 'present', 'FAQPage': 'present'}

### Component / trust patterns missing vs competitors
- ['comparison_table']

## Page-1 competitors extracted
| domain | type | best pos | title | words | H2 | FAQ | schema |
| --- | --- | --- | --- | --- | --- | --- | --- |
| practiceindex.co.uk | deep | 1 | Medical Practice Accountants - Rated and Reviewed   | Practi | 734 | 4 | 0 |  |
| www.bw-medical.co.uk | blog | 2 | GP Practice Accounts – A Basic Introduction - BW Medical Acc | 1132 | 0 | 2 | FinancialService |
| sial-accountants.co.uk | landing | 4 | GP Practice Accounts | SIAL Accountants | 6 | 0 | 1 | AccountingService,BlogPosting,BreadcrumbList,ImageObject,Organization,Person,Place,WebPage,WebSite |
| managementinpractice.com | deep | 1 | GP Partnerships - how to balance risk and reward - Managemen | 1002 | 0 | 0 | BreadcrumbList,ImageObject,NewsArticle,Organization,Person,WebPage,WebSite |
| r-m-t.co.uk | deep | 3 | GP Practice Accountants | RMT Accountants | 1479 | 10 | 0 | Article,BreadcrumbList,Organization,Person,WebPage,WebSite |
| www.accountancyally.co.uk | blog | 3 | Accountant for GP practice partners: records and questions | | 1168 | 14 | 7 | Article,BreadcrumbList,FAQPage |
| nicholsmedical.co.uk | deep | 7 | Financial Insights for GP Partnership - Nichols Medical Acco | 9 | 0 | 0 | BreadcrumbList,ImageObject,Organization,WebPage,WebSite |
| www.yorkshiremedicalaccountants.co.uk | deep | 8 | GP Practices - Yorkshire Medical Accountants | 6 | 0 | 0 | BreadcrumbList,ImageObject,Organization,WebPage,WebSite |
| www.larking-gowen.co.uk | deep | 8 | Accounting GP Partnerships and Partners | Larking Gowen Char | 18 | 0 | 1 |  |
| www.gondalaccountancy.co.uk | landing | 10 | GP Practice Accountants Birmingham | GP Surgery Accounts | 2127 | 15 | 10 | AccountingService,BreadcrumbList,FAQPage,Service,SiteNavigationElement,WebPage,WebSite |
| www.dains.com | deep | 1 |  | 63810 | 0 | 0 |  |

_Could not fetch: ['medicsmoney.co.uk']_