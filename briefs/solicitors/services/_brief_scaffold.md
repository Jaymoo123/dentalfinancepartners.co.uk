# BRIEF SCAFFOLD — optimise the solicitors services for its head-keyword family

You are an Opus 4.8 subagent. Using the analysis pack and rules below, write a self-contained implementation brief to `index.md` in this folder. Reason about the cannibalisation diagnosis; do not just restate the data. Produce: a title/meta formula, 3 H1 options, the recommended on-page sections + entity coverage, the schema additions, the internal-linking / cannibalisation actions (naming the exact catcher pages), the geo angle, trust additions, and risks.

- **Page:** https://www.accountsforlawyers.co.uk/services
- **Source file (hand-edit this):** `Solicitors/web/src/app/services/page.tsx`

## Site rules (from SITE_RULES)
- **Domain:** https://www.accountsforlawyers.co.uk
- **Web root (build here):** `Solicitors/web`
- **Audience:** UK sole practitioners, law firm partners, practice managers/COFAs, and multi-partner firms
- **Lead-form segments:** ['Sole practitioner', 'Law firm partner', 'Practice manager/COFA', 'Multi-partner firm']
- **Pillar pages to link to:**
  - Partnership vs LLP for solicitors: `/solicitor-guides/partnership-vs-llp-for-solicitors`
  - SRA Accounts Rules essentials: `/solicitor-guides/sra-accounts-rules-essentials`
  - COFA fundamentals: `/solicitor-guides/cofa-fundamentals`
  - Fee-share vs equity partner: `/solicitor-guides/fee-share-vs-equity-partner`
  - Post-merger integration: `/solicitor-guides/post-merger-integration`
  - Professional indemnity tax treatment: `/solicitor-guides/professional-indemnity-tax-treatment`
- **Authority links to favour:**
  - [SRA Accounts Rules 2019](https://www.sra.org.uk/solicitors/standards-regulations/accounts-rules/)
  - [SRA Standards and Regulations](https://www.sra.org.uk/solicitors/standards-regulations/)
  - [HMRC Business Income Manual (BIM)](https://www.gov.uk/hmrc-internal-manuals/business-income-manual)
  - [HMRC Partnership Tax Manual](https://www.gov.uk/hmrc-internal-manuals/partnership-manual)
  - [gov.uk MTD for ITSA sign-up checker](https://www.gov.uk/guidance/check-when-to-sign-up-for-making-tax-digital-for-income-tax)
  - [Solicitors Regulation Authority — compliance](https://www.sra.org.uk/solicitors/guidance/)


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

# Core-page analysis pack — solicitors / services

- **Page:** https://www.accountsforlawyers.co.uk/services
- **Source (hand-edit this):** `Solicitors/web/src/app/services/page.tsx`

## Cannibalisation diagnosis
- Head-family queries tracked: **46** (1576 impressions, 90d).
- Queries the core page already owns: **1**.
- National head queries: **6**; national impressions NOT on the core page: **1007**.

### Top catcher pages (which of OUR pages soaks up head-family impressions)
| catcher url | type | head queries | impr |
| --- | --- | --- | --- |
| https://www.accountsforlawyers.co.uk/contact | core_other | 13 | 471 |
| https://www.accountsforlawyers.co.uk/services | core_other | 9 | 432 |
| https://www.accountsforlawyers.co.uk/blog | blog | 8 | 111 |
| https://www.accountsforlawyers.co.uk/locations/manchester | location | 1 | 37 |
| https://www.accountsforlawyers.co.uk/blog/vat-compliance/solicitor-cyber-insurance-tax-treatment | blog | 1 | 14 |
| https://www.accountsforlawyers.co.uk/locations/leeds | location | 9 | 12 |
| https://www.accountsforlawyers.co.uk/blog/compliance-risk-colp-cofa/solicitors-aml-risk-assessment-template-guide | blog | 1 | 5 |
| https://www.accountsforlawyers.co.uk/ | homepage | 1 | 2 |
| https://www.accountsforlawyers.co.uk/blog/sra-accounts-rules/sra-accounts-rules-explained-for-uk-solicitors | blog | 1 | 2 |
| https://www.accountsforlawyers.co.uk/locations/london | location | 1 | 1 |
| https://www.accountsforlawyers.co.uk/blog/practice-finance-cash-flow/law-firm-accountant-leeds | blog | 1 | 1 |

### Per-query cannibalisation map (top 30 by impressions)
| query | tot impr | nat | geo | catcher | catcher type | catcher pos | core-page pos | verdict |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| accounting for solicitors | 617 | Y |  | accountsforlawyers.co.uk/services | core_other | 65.4 | 61.9 | caught_by_core_other |
| accountants for lawyers | 158 |  |  | accountsforlawyers.co.uk/contact | core_other | 21.5 | 2.0 | caught_by_core_other |
| accounting services for law firms | 117 | Y |  | accountsforlawyers.co.uk/contact | core_other | 60.3 | - | caught_by_core_other |
| accountant for lawyers | 107 | Y |  | accountsforlawyers.co.uk/contact | core_other | 18.5 | 16.7 | caught_by_core_other |
| accountants for legal firms | 87 |  |  | accountsforlawyers.co.uk/contact | core_other | 36.0 | - | caught_by_core_other |
| solicitor accountants | 73 | Y |  | accountsforlawyers.co.uk/blog | blog | 70.0 | - | caught_by_blog_consolidate |
| solicitor accountant | 66 |  |  | accountsforlawyers.co.uk/blog | blog | 80.1 | - | caught_by_blog_consolidate |
| accountants for solicitors | 58 | Y |  | accountsforlawyers.co.uk/services | core_other | 57.1 | - | caught_by_core_other |
| barrister accountants near me | 47 |  | Y | accountsforlawyers.co.uk/locations/manchester | location | 69.0 | - | geo_keep_local |
| accountants for law firms | 43 |  |  | accountsforlawyers.co.uk/contact | core_other | 28.2 | - | caught_by_core_other |
| law firm accounting services | 35 | Y |  | accountsforlawyers.co.uk/contact | core_other | 46.7 | - | caught_by_core_other |
| accountant for solicitors | 27 |  |  | accountsforlawyers.co.uk/services | core_other | 53.3 | - | caught_by_core_other |
| accountant legal advice | 19 |  |  | accountsforlawyers.co.uk/blog | blog | 61.4 | - | caught_by_blog_consolidate |
| accounting for legal practice | 18 |  |  | accountsforlawyers.co.uk/services | core_other | 65.9 | - | caught_by_core_other |
| cyber insurance for accountants | 14 |  |  | accountsforlawyers.co.uk/blog/vat-compliance/solicitor-cyber-insurance-tax-treatment | blog | 26.3 | - | caught_by_blog_consolidate |
| legal accounting | 13 |  |  | accountsforlawyers.co.uk/blog | blog | 78.1 | - | caught_by_blog_consolidate |
| accounting lawyer | 7 |  |  | accountsforlawyers.co.uk/blog | blog | 68.3 | - | caught_by_blog_consolidate |
| accountant for law firm | 7 |  |  | accountsforlawyers.co.uk/contact | core_other | 49.0 | - | caught_by_core_other |
| lawyers for accountants | 6 |  |  | accountsforlawyers.co.uk/contact | core_other | 40.8 | - | caught_by_core_other |
| legal sector accountants | 5 |  |  | accountsforlawyers.co.uk/services | core_other | 46.2 | - | caught_by_core_other |
| money laundering risk assessment for accountants | 5 |  |  | accountsforlawyers.co.uk/blog/compliance-risk-colp-cofa/solicitors-aml-risk-assessment-template-guide | blog | 64.4 | - | caught_by_blog_consolidate |
| solicitor accounting services | 4 |  |  | accountsforlawyers.co.uk/contact | core_other | 60.0 | - | caught_by_core_other |
| law firm accountants | 4 |  |  | accountsforlawyers.co.uk/ | homepage | 59.0 | 59.0 | homepage_already_owns |
| accountants for freelance solicitors | 3 |  |  | accountsforlawyers.co.uk/services | core_other | 73.0 | - | caught_by_core_other |
| accountancy services lawyers | 3 |  |  | accountsforlawyers.co.uk/contact | core_other | 31.3 | - | caught_by_core_other |
| leeds accountancy firms | 3 |  | Y | accountsforlawyers.co.uk/locations/leeds | location | 88.0 | - | geo_keep_local |
| law office accounting | 3 |  |  | accountsforlawyers.co.uk/blog | blog | 75.0 | - | caught_by_blog_consolidate |
| accounting services for lawyers | 2 |  |  | accountsforlawyers.co.uk/contact | core_other | 43.0 | - | caught_by_core_other |
| accountants for legal firm | 2 |  |  | accountsforlawyers.co.uk/contact | core_other | 29.5 | - | caught_by_core_other |
| solicitors accounting rules | 2 |  |  | accountsforlawyers.co.uk/blog/sra-accounts-rules/sra-accounts-rules-explained-for-uk-solicitors | blog | 24.5 | - | caught_by_blog_consolidate |

## Our core page vs page-1 competitors
| metric | ours | competitor median | competitor max |
| --- | --- | --- | --- |
| word count | 1085 | 167.0 | 4079 |
| H2 sections | 5 | 0.5 | - |
| FAQs | 5 | 1.0 | - |

### Headline keyword coverage (the #1 gap)
- Title: `Specialist Accountants for UK Solicitors and Law Firms | Accounts for Lawyers | Accounts for Lawyers` — contains head token: **NO**
- H1: `Accountants for UK solicitors and law firms` — contains head token: **NO**
- **FLAG: the H1 has no head keyword (it's a slogan).** Highest-leverage single fix.

### Schema
- Ours: ['BreadcrumbList', 'FAQPage', 'Organization', 'Service', 'WebSite']
- Competitor frequency: {'BreadcrumbList': 7, 'WebPage': 7, 'WebSite': 7, 'Organization': 6, 'ImageObject': 5, 'Article': 4, 'AccountingService': 3, 'Place': 3, 'FAQPage': 3, 'Person': 3, 'BlogPosting': 2, 'PostalAddress': 1, 'Question': 1, 'SiteNavigationElement': 1}
- Missing vs competitors (>=2 have it): ['AccountingService', 'Article', 'BlogPosting', 'ImageObject', 'Person', 'Place', 'WebPage']
- Commercial checklist: {'LocalBusiness': 'MISSING', 'AccountingService': 'MISSING', 'Service': 'present', 'BreadcrumbList': 'present', 'AggregateRating': 'MISSING', 'Review': 'MISSING', 'Organization': 'present', 'FAQPage': 'present'}

### Component / trust patterns missing vs competitors
- ['author_byline', 'download_form', 'video_embed']

## Page-1 competitors extracted
| domain | type | best pos | title | words | H2 | FAQ | schema |
| --- | --- | --- | --- | --- | --- | --- | --- |
| www.hawsons.co.uk | deep | 3 | Solicitor accountants | Hawsons Chartered Accountants | 6 | 0 | 3 | AccountingService,BreadcrumbList,ImageObject,Organization,Place,PostalAddress,WebPage,WebSite |
| wrpartners.co.uk | deep | 7 | Accountants For Solicitors, Lawyers, And Legal Professionals | 83 | 1 | 0 | BreadcrumbList,WebPage,WebSite |
| www.icaew.com | deep | 1 | Accounting for solicitors | ICAEW | 1370 | 7 | 1 |  |
| e2eaccounting.co.uk | deep | 1 | Expert Solicitor Accountants & Conveyancing Services | 1773 | 11 | 7 | AccountingService,Article,FAQPage,ImageObject,Organization,Person,Place,WebPage,WebSite |
| en.wikipedia.org | deep | 1 | Accounting for Lawyers - Wikipedia | 0 | 0 | 0 | Article |
| grokipedia.com | deep | 1 | 101 Marketing Strategies for Accounting, Law, Consulting, an | 2101 | 5 | 1 | Article,BreadcrumbList |
| www.lawyers-cpafirm.com | homepage | 1 | CPA Accounting for Law Firms and Attorneys | 251 | 0 | 0 |  |
| www.sra.org.uk | deep | 2 | SRA | Accounts Rules | Solicitors Regulation Authority | 4079 | 6 | 0 |  |
| nichols.co.uk | deep | 2 | Accountants for Solicitors & Law Firms | SRA Auditors | Nich | 13 | 0 | 0 | BreadcrumbList,FAQPage,ImageObject,Organization,Question,WebPage,WebSite |
| www.boldbeam.co.uk | landing | 2 | Why Solicitors Need Specialist Accountants for Solicitors fo | 14 | 0 | 6 | Article,BlogPosting,BreadcrumbList,ImageObject,Organization,Person,WebPage,WebSite |
| www.meruaccounting.com | landing | 2 | Accountants for Lawyers: Top Essential Guide | 6 | 0 | 6 | AccountingService,BlogPosting,BreadcrumbList,FAQPage,ImageObject,Organization,Person,Place,WebPage,WebSite |
| perrysaccountants.co.uk | landing | 2 | Legal Accountants - Law Specialists - Perrys Accountants | 412 | 2 | 1 | BreadcrumbList,Organization,SiteNavigationElement,WebPage,WebSite |