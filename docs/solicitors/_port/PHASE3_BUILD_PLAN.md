# SOLICITORS PORT — PHASE 3 BUILD PLAN (article templates + category hubs)

Planner output, 2026-09-11. READ-ONLY derivation; nothing in this plan has been built.
Authority order: `docs/solicitors/DESIGN_DELTA.md` (brand, approved) > `docs/property/DESIGN_SYSTEM.md` §0
(page contract) > `PROPERTY_STANDARD_ROLLOUT.md` F.3/F.4 > `DISPOSITION_SLICE1.md` (hypothesis only).

**Binding owner rule, 2026-09-11: NO COPY CHANGES, NO SEO CHANGES.** No visible string rewritten,
no `metaTitle` / `metaDescription` / `canonical` / sitemap / route / redirect / internal link
repointed. Every existing visible string in scope is transcribed BYTE FOR BYTE into its new prop.
Cancelled and not in this plan: the 34 `-and-` canonicals, the ~150 body em-dashes.

---

## 0. REALITY CHECK PER SURFACE (what is already true; do not re-build it)

Derived by reading the files, 2026-09-11. Counts re-measured, not quoted.

| surface | files | renders today | standard wants | verdict |
|---|---|---|---|---|
| article route | `Solicitors/web/src/app/blog/[category]/[slug]/page.tsx` (76 lines) | data-only: `generateStaticParams`, `generateMetadata`, slug-fallback `permanentRedirect`, delegates to `BlogPostRenderer` | exactly that (F.3 puts all markup in the renderer) | **ALREADY CONFORMS. ZERO EDITS.** One template serves all 196 articles; there is no per-article work in phase 3. |
| article markup | `src/components/blog/BlogPostRenderer.tsx` (403 lines) | `ReadingProgress` :115, `article bg-white py-12 sm:py-16` :116, `siteContainerLg` :122, the `lg:grid-cols-[1fr_250px]` grid :123, header card `rounded-xl bg-slate-50 p-8 mt-6` :134, skip-to-form :180-186, mobile TOC :192, `.article-body.prose-blog mt-10` :269, plain `<dl>` FAQ :330 (ring recipe), navy `#enquiry-form ... scroll-mt-24` :344-345, reviewer aside :362, `RelatedArticles` :379, sticky sidebar `BlogSidebarCta` + `TableOfContents` :391-395 | F.3 | **REBUILT IN PHASE 2. OFF LIMITS this phase.** |
| 10 derived hubs | `src/app/blog/[category]/page.tsx` (185 lines) | `sectionY bg-[var(--surface)]` hero, `font-serif` h1, `var(--*)` tokens, square `border` chips, **`BlogListWithSearch` (client, SLICES)**, no capture surface at all, page-level `BreadcrumbList` + `CollectionPage` | F.4: cream motif hero → (briefing) → slate-50 `#articles` `HubArticleList` → navy `LeadCTAPanel` → slate-50 other-topics | **FULL REWRITE. WP2.** |
| 7 hand-built hubs | `src/app/blog/{partnership-llp-accounting,practice-finance-cash-flow,practice-succession-sale,sole-practitioner-tax,sra-compliance-trust-accounting,structure-incorporation,vat-compliance}/page.tsx` (174-196 lines each) | `contentNarrow` clamp, `font-serif`, `rounded-2xl border`, left-rule header card, 5-6 prose `<section>`s, bespoke article card list, **raw-label `p.category === "..."` filter at `:32` in all seven**, bare `<LeadForm>` in a gradient `rounded-2xl` card with no `id` and no `scroll-mt-24`, no sibling navigation | as above, plus their existing prose as `sections` | **FULL REWRITE. WP3.** Structurally identical seven, but the COPY differs per file: transcribe per file, never trust one line number across all seven. |
| 10 guides + index | `src/app/solicitor-guides/[slug]/page.tsx` (187), `src/app/solicitor-guides/page.tsx` (107) | full-bleed `bg-[var(--primary)]` heroes (retired by DESIGN_DELTA "dark ground"), `font-serif`, `rounded-2xl border`, `mx-auto max-w-3xl` / `max-w-5xl` body clamps, `sectionYLoose` (retired), no `ReadingProgress`, no TOC, hand-rolled FAQ `<dl>` (KEEP, see R5), bare `LeadForm` in a crimson band | F.3 skeleton (guides are 3,500-5,000 word long-form articles) | **FULL REWRITE. WP4 (template) + WP5 (index).** |

**What phase 3 is NOT.** It is not 196 article edits, not 17 hub copy jobs, not a canonical fix,
not an em-dash sweep, not a `FaqSection` adoption anywhere.

### Ground truth re-measured today

- 196 posts, 17 categories, sums to 196. 7 hand-built hubs, 10 derived.
- Categories exceeding the 12-per-page fold, i.e. where pagination is load-bearing:
  `practice-finance-cash-flow` 26, `vat-compliance` 22, `sra-compliance-trust-accounting` 17,
  `partnership-llp-structure` 17. The other 13 render one page and no pagination bar.
- `src/lib/blog-category-copy.ts` exists with all 17 slug keys and a `{heading, body, button}`
  triple each, guarded by `src/tests/blog-category-copy.test.ts`.
- `src/tests/hub-article-crawl-path.test.ts` exists and registers the estate guard against
  `packages/web-shared/design/blog/{HubArticleList,BlogCategoryHub}.tsx`. Live TODAY even though no
  Solicitors hub consumes those files yet.
- `src/lib/page-summaries.ts` DOES NOT EXIST on this site. Property's hub passes
  `PAGE_SUMMARIES["/blog/<slug>"]` as `intro`; **do not port that mechanism** — this site's hubs
  already own a standfirst string each.
- `src/components/ui/layout-utils.ts` is already a pure re-export of the kit, including
  `heroCreamSurface`, `btnPrimary`, `btnOnCream`, `focusRing`, `siteContainerLg`.
- `src/components/layout/SolicitorsBackdrop.tsx` exists and takes `tone="cream" | "navy"`.
- `Solicitors/web/package.json` already declares `lucide-react`, `tw-animate-css`,
  `@accounting-network/web-shared`, `gray-matter`. **Nothing here needs a new dependency.** If a
  builder adds one, it goes in `Solicitors/web/package.json` in the SAME change (T24).

---

## 1. LINK BASELINE FLOORS IN SCOPE

Authority: `docs/solicitors/_port/link_baseline.json` (sha `18b4f25f39cd0c4aa084e582d69a87c8a10710ac`,
captured 2026-09-10T18:57:53Z, 274 routes). A route must render **at least** this many UNIQUE
internal `href="/..."` links and **at most** this many em-dashes.

**Hubs (all 17): unique-link floor / em-dash ceiling / data-cta floor.**

| route | links | dashes | cta | hub type |
|---|---:|---:|---:|---|
| `/blog/practice-finance-cash-flow` | 37 | 0 | 2 | hand-built |
| `/blog/sra-accounts-rules` | 33 | 0 | 2 | derived |
| `/blog/partnership-llp-structure` | 33 | 0 | 2 | derived |
| `/blog/vat-compliance` | 33 | 0 | 2 | hand-built |
| `/blog/compliance-risk-colp-cofa` | 32 | 0 | 2 | derived |
| `/blog/conveyancing-compliance` | 32 | 0 | 2 | derived |
| `/blog/practice-accounting` | 31 | **1** | 2 | derived |
| `/blog/fee-earner-tax-compensation` | 29 | 0 | 2 | derived |
| `/blog/sra-compliance-trust-accounting` | 28 | 0 | 2 | hand-built |
| `/blog/firm-acquisition-merger` | 27 | 0 | 2 | derived |
| `/blog/professional-indemnity` | 27 | 0 | 2 | derived |
| `/blog/locum-solicitor-tax` | 26 | 0 | 2 | derived |
| `/blog/practice-succession-sale` | 26 | 0 | 2 | hand-built |
| `/blog/partnership-llp-accounting` | 25 | 0 | 2 | hand-built |
| `/blog/trainee-paralegal-tax` | 23 | 0 | 2 | derived |
| `/blog/structure-incorporation` | 20 | 0 | 2 | hand-built |
| `/blog/sole-practitioner-tax` | **15** | 0 | 2 | hand-built |

The hubs most at risk are the small ones: `sole-practitioner-tax` (4 posts, floor 15),
`structure-incorporation` (9 posts, floor 20) and `trainee-paralegal-tax` (2 posts, floor 23).
After the rewrite their links are the article cards + 16 other-topic chips + `/blog` + 2 breadcrumb
crumbs. **The 16-chip other-topics band is what keeps every small hub above its floor. It is not
decoration and it may not be trimmed.**

**Guides.** `/solicitor-guides` = 21 links / 0 dashes / 2 cta. Children, all cta 2:

| route | links | dashes |
|---|---:|---:|
| `/solicitor-guides/legal-aid-billing-laa-ccms` | 20 | 0 |
| `/solicitor-guides/law-firm-profitability-guide` | 16 | 0 |
| `/solicitor-guides/legal-cashier-complete-guide` | 16 | 0 |
| `/solicitor-guides/sra-principles-explained` | 15 | 0 |
| `/solicitor-guides/cofa-fundamentals` | 14 | **11** |
| `/solicitor-guides/fee-share-vs-equity-partner` | 14 | **19** |
| `/solicitor-guides/partnership-vs-llp-for-solicitors` | 14 | **26** |
| `/solicitor-guides/post-merger-integration` | 14 | **13** |
| `/solicitor-guides/professional-indemnity-tax-treatment` | 14 | **9** |
| `/solicitor-guides/sra-accounts-rules-essentials` | 14 | **21** |

Those guide em-dash ceilings are BODY copy, frozen by the hard rule. The ceiling is `<=`, so leaving
them exactly as they are passes. **Do not sweep them.**

**Articles.** All 196 routes are in the baseline; floors 16-27 (min
`/blog/trainee-paralegal-tax/how-much-do-trainee-solicitors-earn-uk-2025-26` = 16), max em-dash
ceiling 24, cta 2-3. No package in this phase edits an article surface, so the article floors are a
REGRESSION CHECK only, run by WP6.

---

## 2. KIT FACTS (verified today; do not rediscover)

- `packages/web-shared/design/blog/BlogCategoryHub.tsx:19-23` defaults Property's landlord
  `proofPoints`; `:229` defaults a Property `libraryNote` ("written by specialist property
  accountants"). Both ship silently if omitted. **Every Solicitors call site passes both.**
- `:194` is `{sections.length > 0 ? (...) : null}`. **The essentials briefing is ALREADY OPTIONAL.**
  `sections={[]}` renders nothing and is the supported path; generalist does exactly this for its
  unbriefed categories (`generalist/web/src/app/blog/[category]/page.tsx:84`).
- `:243` and `:274` use `rounded-xl border border-slate-200`; `HubArticleList.tsx:82` uses
  `rounded-xl border border-slate-200`. **The brief's claim that `HubArticleList.tsx` is "clean" is
  FALSE against the stated contract** (`ring-1 ring-slate-200/70`, never a border). See WP1.
- Kit `primitives/Breadcrumb.tsx:23-46` EMITS ITS OWN `BreadcrumbList` JSON-LD. `BlogCategoryHub`
  renders it and deliberately carries no `BreadcrumbList` in its own `@graph` (`:124-131`).
  **Every page adopting `BlogCategoryHub` must DELETE its page-level `BreadcrumbList` node**, or all
  17 hubs emit it twice (T17 class).
- Kit `HubArticleList` hides, never slices (`:81-82`).
- **Kit blog consumers are generalist and Solicitors ONLY.** Property keeps local copies under
  `Property/web/src/components/blog/`. Derived:
  `grep -rln "web-shared/design/blog/" --include=*.tsx --include=*.ts . | grep -v node_modules`
  → 16 generalist files, 4 Solicitors files, 1 guard. **A kit edit must be verified on generalist in
  the same change (T23).**
- `design/primitives/FaqSection.tsx` is FORBIDDEN on this site: it escapes HTML in answers and drops
  closed answers from the server HTML.

---

## 3. WORK PACKAGES

Five packages. WP1 is MANAGER-DIRECT (playbook §3: `packages/web-shared/` edits are never
delegated). WP2-WP5 are one builder each, disjoint file sets. WP6 is the manager's verification
pass, not a builder package.

Every package's acceptance list ends with the three estate gates:

```
python scripts/check_dependency_closure.py
cd Solicitors/web && npx tsc --noEmit
cd Solicitors/web && npm test
```

**Builders do not run `next build` or `next dev` (T1). Builders run no git write command.**
Any new import gets its declaration in `Solicitors/web/package.json` in the same change (T24).

---

### WP1 — KIT ENABLEMENT + SHARED CONSTANTS (MANAGER-DIRECT)

**Why it exists:** three things block WP2 and WP3, and all three are either kit files (manager
carve-out) or a file both packages would otherwise contend for.

**Files (owns exclusively):**

1. `packages/web-shared/design/blog/BlogCategoryHub.tsx`
2. `packages/web-shared/design/blog/HubArticleList.tsx`
3. `Solicitors/web/src/lib/blog-category-copy.ts` (append only)
4. `Solicitors/web/src/app/blog/page.tsx` (one import swap, lines 147-167 only)
5. `docs/_engines/DESIGN_PORT_PLAYBOOK.md` §8 item 11 (record the new props, SAME commit)

**Change 1 — additive prop `heading?: string` on `BlogCategoryHub`.** Defaults to `categoryName`,
used at `:166` (the h1) ONLY. `categoryName` keeps driving the breadcrumb `:159-164`, the essentials
Eyebrow `:197` and the library heading `:226`. Required because the 7 hand-built hubs have an h1
that is NOT the category name: `src/app/blog/vat-compliance/page.tsx:65-67` is "Complete VAT Guide
for UK Law Firms" while its breadcrumb `:59-63` and its CollectionPage are "VAT & Compliance".
Without the prop, adopting the kit either rewrites an h1 (copy change) or rewrites a breadcrumb
label and its JSON-LD (SEO change). Both are forbidden. Default undefined = Property and generalist
byte-identical.

**Change 2 — additive `bullets?: string[]` on `HubSection`.** Rendered after the section paragraphs
as a `list-disc` ul at `text-base leading-7 text-slate-600`. Required because 6 of the 7 hand-built
hubs carry `list-disc` blocks inside their prose sections (counted: partnership-llp-accounting 4,
practice-finance-cash-flow 3, practice-succession-sale 3, sole-practitioner-tax 4,
sra-compliance-trust-accounting 4, structure-incorporation 2, vat-compliance 3). Flattening a list
into paragraphs would silently restructure published copy and lose list semantics for screen
readers. Default undefined = Property and generalist byte-identical.

**Change 3 — contract card recipe.** Replace `border border-slate-200` with
`ring-1 ring-slate-200/70` (and `hover:border-primary-600` with `hover:ring-primary-600`) at
`HubArticleList.tsx:82`, `BlogCategoryHub.tsx:243` and `BlogCategoryHub.tsx:274`. Same correction
phase 2 applied to the kit archive card. Both consumers change, so generalist must pass
`npx tsc --noEmit` and `npm test` in this change (T23). Property is NOT a consumer and is unaffected.

**Change 4 — extract `LEAD_PROOF_POINTS`.** The three-item array inline at
`Solicitors/web/src/app/blog/page.tsx:147-167` (SRA Accounts Rules 2019 / Partnership, LLP and
incorporated / Same accountant every time) moves VERBATIM into `src/lib/blog-category-copy.ts` as
`export const LEAD_PROOF_POINTS`, and `/blog` imports it. Not one character of that copy changes.
WP2 and WP3 both import it; extracting it here is what keeps their file sets disjoint.

**In-repo precedent to copy:** the additive kit prop with a Property-preserving default is
`BlogSidebarCta.buttonClassName`, added in phase 2 and consumed at
`Solicitors/web/src/components/blog/BlogPostRenderer.tsx:394`.

**OFF LIMITS:** every other file in `packages/web-shared/`; every `src/app/blog/*/page.tsx`; the
`[category]` hub route; `src/app/solicitor-guides/**`; `BlogPostRenderer.tsx`;
`src/tests/hub-article-crawl-path.test.ts`.

**Acceptance:**

- `cd packages/web-shared && npm test` — 19 files / 406 tests, no drop.
- `cd generalist/web && npx tsc --noEmit && npm test` — clean (T23 proof).
- `cd Solicitors/web && npx tsc --noEmit && npm test` — 16 files / 208 tests, no drop.
- `grep -c "border border-slate-200" packages/web-shared/design/blog/HubArticleList.tsx` → `0`.
- `grep -n LEAD_PROOF_POINTS Solicitors/web/src/app/blog/page.tsx` → one import, one usage; the diff
  on that file shows no changed string literal.
- `python scripts/check_dependency_closure.py`.

---

### WP2 — THE 10 DERIVED HUBS (ONE FILE)

**File (owns exclusively):** `Solicitors/web/src/app/blog/[category]/page.tsx` — rewrite in place,
185 lines to roughly 110. **One file serves all 10 routes. Do not create per-category page files.**

Routes served (the 17 minus the 7 static): `sra-accounts-rules`, `partnership-llp-structure`,
`compliance-risk-colp-cofa`, `conveyancing-compliance`, `practice-accounting`,
`fee-earner-tax-compensation`, `firm-acquisition-merger`, `professional-indemnity`,
`locum-solicitor-tax`, `trainee-paralegal-tax`. Floors: the "derived" rows of §1.

**Port from:** `generalist/web/src/app/blog/[category]/page.tsx:39-100` — the ported, working,
in-repo consumption of `BlogCategoryHub`, and the same pattern phase 2 followed for `/blog`.
`Property/web/src/app/blog/landlord-tax-essentials/page.tsx:30-100` is the F.4 reference for prop
SHAPE only; it is a hand-built single-category page and uses `PAGE_SUMMARIES`, which this site lacks.

**Exact prop sourcing. Every value transcribed from what the route renders TODAY:**

| prop | value | source |
|---|---|---|
| `categoryName` | `matchedCategory.name` | existing `:66` |
| `heading` | omit; today's h1 already equals the category name (`:129-131`) | — |
| `categorySlug` | `category` | existing |
| `collectionName` | the existing template string at `:106` | byte-identical |
| `description` | the existing CollectionPage description at `:107` | byte-identical |
| `intro` | the existing "N articles on x for UK solicitors and law firms." standfirst at `:133-136` | byte-identical |
| `sections` | empty array | see R1; kit renders nothing (`:194`) |
| `cta` | heading/body/submitLabel from `BLOG_CATEGORY_COPY[category]`, falling back to the active niche CTA exactly as `BlogPostRenderer.tsx:99-108` does | existing site copy |
| `posts` | projection to slug, title, summary, date, readTime ONLY | keep the phase-2 discipline at `:73-81`; readTime precomputed server-side, contentHtml never crosses the client boundary |
| `categories` | ALL 17 (the kit filters self at `:135`) | crawl-path fix, below |
| `siteUrl` | `siteConfig.url` | existing |
| `proofPoints` | `LEAD_PROOF_POINTS` (WP1) | existing site copy |
| `libraryNote` | a formulaic "N guides for UK solicitors and law firms." count sentence | template chrome, R3 |
| `form` | the site LeadForm with `redirectOnSuccess={false}` and the CTA button label | matches `/blog` and the renderer |
| `heroBackdrop` | `SolicitorsBackdrop` tone cream | matches `/blog:64` |
| `ctaBackdrop` | `SolicitorsBackdrop` tone navy | matches `/blog:169` |

**Three load-bearing behaviours to KEEP:**

1. `STATIC_HUB_SLUGS` (`:17-25`), the `generateStaticParams` filter (`:28-33`), the
   `generateMetadata` early return (`:37-39`) and the `notFound()` guard (`:61-64`). Deleting any of
   them lets the dynamic route shadow the 7 static hubs. WP3 changes nothing here, so the set stays
   at 7 for the whole phase.
2. The slug-equality filter `slugifyCategory(p.category) === category` at `:72`. Never raw-label.
3. `generateMetadata` (`:35-56`) UNCHANGED. It is the SEO surface and the hard rule freezes it.

**The crawl-path defect to fix (DISPOSITION C.3 item 6, VERIFIED against the file):** `:82` filters
the sibling list down to the 10 derived categories and passes that array to both the chip nav and
the list, so on all 10 derived hubs **7 of 17 categories are unreachable, including the three
largest** (practice-finance-cash-flow 26, vat-compliance 22, sra-compliance-trust-accounting 17).
Pass the full `getAllCategories()` array. This ADDS links and repoints none, so it also cushions
every floor in §1.

**JSON-LD:** keep the CollectionPage node, DELETE the page-level BreadcrumbList (`:91-98`); the kit
`Breadcrumb` emits it (§2). Exactly one of each on the rendered page.

**OFF LIMITS:** `src/app/blog/page.tsx`, all 7 hand-built hub page files, the article route and its
`opengraph-image.tsx`, `src/components/blog/**`, `src/lib/blog.ts`, `src/lib/blog-category-copy.ts`,
`src/app/solicitor-guides/**`, everything in `packages/`.

**Acceptance:**

- `grep -c BlogListWithSearch` on the file returns `0`.
- `grep -n "font-serif|var(--primary)|var(--surface)|rounded-2xl"` on the file returns no hits.
- The diff shows zero changes inside `generateMetadata` and zero changed string literals in the
  collectionName, description and intro values.
- `npm test` — `hub-article-crawl-path.test.ts` and `blog-category-copy.test.ts` pass.
- Report the 10 routes changed with their floors from §1. Do not build.
- `python scripts/check_dependency_closure.py`; `npx tsc --noEmit`; `npm test`.

---

### WP3 — THE 7 HAND-BUILT HUBS

**Files (owns exclusively), all under `Solicitors/web/src/app/blog/`:**
`partnership-llp-accounting/page.tsx` (194) · `practice-finance-cash-flow/page.tsx` (192) ·
`practice-succession-sale/page.tsx` (192) · `sole-practitioner-tax/page.tsx` (196) ·
`sra-compliance-trust-accounting/page.tsx` (190) · `structure-incorporation/page.tsx` (174) ·
`vat-compliance/page.tsx` (192). Floors: the hand-built rows of §1.

Each becomes a roughly 90-line data-only file calling `BlogCategoryHub`. Target shape:
`Property/web/src/app/blog/landlord-tax-essentials/page.tsx:1-83` (metadata export, then one
component call with sections and cta as literals). The in-repo consumption pattern is the file WP2
produces and `generalist/web/src/app/blog/[category]/page.tsx:76-99`.

**THE SEVEN ARE NOT BYTE-IDENTICAL. Open each and transcribe from it.** Verified common shape, so
you know what to look for and not what to assume: `:32` raw-label filter, `:34-52` JSON-LD, `:59-63`
breadcrumb, `:65-72` header card with h1 and standfirst, `:74` onward 5-6 prose sections, a bespoke
In-Depth Articles card list, and a closing gradient card holding a bare LeadForm with a per-hub
submitLabel. Line numbers drift up to 22 lines across the seven, and structure-incorporation has
6 h2 where the others have 7.

**Prop sourcing, per file, all verbatim:**

| prop | source in that file |
|---|---|
| `categoryName` | the breadcrumb third crumb, e.g. VAT and Compliance as spelled in vat-compliance `:62` |
| `heading` | the existing h1 string, e.g. Complete VAT Guide for UK Law Firms at vat-compliance `:65-67`. This is why WP1 exists |
| `categorySlug` | the directory name |
| `collectionName` | the metadata title verbatim (the JSON-LD already uses it, `:47`) |
| `description` | the metadata description verbatim (`:48`) |
| `intro` | the existing standfirst paragraph (vat-compliance `:68-70`) |
| `essentialsTitle` | OMIT. The kit default is template chrome; the file own section headings survive as HubSection headings |
| `sections` | one HubSection per existing prose section, EXCLUDING the In-Depth Articles section (that becomes the kit library) and EXCLUDING the closing CTA card. heading = the h2 text, paragraphs = the p texts in order, bullets = the li texts in order (WP1 change 2) |
| `cta` | heading = the closing card h2, body = its paragraph, submitLabel = the existing LeadForm submitLabel. **Do NOT substitute BLOG_CATEGORY_COPY here; these seven already have published CTA copy of their own and replacing it is a copy change** |
| `posts` | the category posts selected by slug equality, replacing the raw-label `:32` filter in all seven, projected to slug/title/summary/date/readTime |
| `categories` | all 17 from `getAllCategories()` (the kit drops self). Net-new sibling navigation, and the thing that lifts sole-practitioner-tax (4 posts) clear of its floor of 15 |
| `siteUrl`, `proofPoints`, `libraryNote`, `form`, `heroBackdrop`, `ctaBackdrop` | same as WP2 |

**The metadata export is UNCHANGED in all seven.** Title, description, canonical, OG and Twitter
blocks are the SEO surface. Copy the export across untouched.

**JSON-LD:** keep CollectionPage (`:45-51`), delete the page-level BreadcrumbList (`:37-44`).

**Escaping note:** these strings contain the pound sign, ampersands, apostrophes and percent signs,
all stored as LITERAL UTF-8 in this repo (field notes §4). Moving a paragraph into a TS string
literal needs escaping only for backticks and template-literal openers. Diff the words, not the
bytes, after you move them.

**OFF LIMITS:** the `[category]` hub route and everything under it, `src/app/blog/page.tsx`,
`src/components/blog/**`, `src/lib/**`, `src/app/solicitor-guides/**`, everything in `packages/`.

**Acceptance:**

- A grep for raw-label category equality across the seven files returns 0 hits. The defect is gone.
- A grep for font-serif, rounded-2xl, contentNarrow and var(--ink) across the seven returns empty.
- A grep for BreadcrumbList in each of the seven returns 0.
- For each of the seven, paste the diff of the metadata export. It must be empty.
- For each of the seven, report: number of HubSections produced vs number of prose sections in the
  original, and the count of list items transcribed. A mismatch means copy was lost.
- `python scripts/check_dependency_closure.py`; `npx tsc --noEmit`; `npm test`.

---

### WP4 — THE GUIDE ARTICLE TEMPLATE (10 GUIDES, ONE FILE)

**File (owns exclusively):** `Solicitors/web/src/app/solicitor-guides/[slug]/page.tsx` (187 lines).
**One template serves all 10 guides. Do not open a single markdown file in content/solicitor-guides.**
Floors: the guide rows of §1, including the em-dash ceilings, which are body copy and frozen.

**Port from:** `Property/web/src/components/blog/BlogPostRenderer.tsx:171-408` for the F.3 skeleton.
The in-repo consumption pattern to copy line for line is this site's own phase-2
`Solicitors/web/src/components/blog/BlogPostRenderer.tsx:115-400`, already audited, brand-correct
and contrast-checked.

**Target structure (F.3, adapted; a guide has no category):**

1. ReadingProgress (kit) — renderer `:115`.
2. The white article wrapper at `py-12 sm:py-16`, then `siteContainerLg`, then the
   `max-w-4xl mx-auto lg:max-w-7xl lg:grid lg:grid-cols-[1fr_250px] lg:gap-12` two-column grid
   (renderer `:116-123`). **This retires the `mx-auto max-w-3xl` body clamp at `:101` and the
   `mx-auto max-w-5xl` clamps at `:139` and `:171`: DS §0.1, siteContainerLg IS the measure.**
3. The LOCAL Breadcrumb from `@/components/ui/Breadcrumb`, which emits no JSON-LD, plus the existing
   page-level `buildBreadcrumbJsonLd` node. **Do not swap in the kit Breadcrumb here**; it would
   double the BreadcrumbList (DISPOSITION C.1 item 3, still true).
4. Header card `rounded-xl bg-slate-50 p-8 mt-6` (renderer `:134`) carrying, verbatim from the guide
   record: the eyebrow, the h1 title, meta pills built from the existing read-time, word-count and
   Updated-date strings using the renderer metaPill recipe at `:50-51`, the hero-or-summary
   standfirst, and a Skip to enquiry form link (renderer `:180-186`).
   **The full-bleed crimson hero at `:67-97` retires** (DESIGN_DELTA dark-ground row).
5. Mobile TableOfContents, then the sticky sidebar TOC, from `extractHeadings(guide.contentHtml)`.
   The guide loader already injects heading ids. **VERIFY on one guide that extractHeadings returns
   a non-empty array before wiring the TOC. If it returns empty, the sidebar renders blank and the
   change is a regression. Report the count. See R7.**
6. Body: the `article-body prose-blog mt-10` wrapper with the existing dangerouslySetInnerHTML.
   That CSS block already exists at `src/app/globals.css:313` onward. This retires the
   `prose-solicitor` class ON THIS ROUTE. Do not delete the prose-solicitor CSS: grep for other
   consumers first and report. An orphan belongs to phase 6.
7. The `#enquiry-form` navy panel at
   `relative mt-16 overflow-hidden rounded-xl bg-slate-900 p-8 sm:p-10 text-white scroll-mt-24`
   (renderer `:344-345`) with aria-labelledby, the existing ctaTitle as the h2, the existing ctaBody
   as the body, and the existing LeadForm with redirectOnSuccess false and its existing submitLabel.
   All four strings are published on the route today (`[slug]/page.tsx:167-197`).
8. FAQ: keep the plain dl, restyled to `rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70` exactly
   as renderer `:330-343`. **Do NOT adopt FaqSection.** Keep `buildFaqPage`.
9. More pillar guides tail: RelatedArticles is keyed on blog category hrefs and is NOT reusable here.
   Keep the existing 3-card grid, restyled to `rounded-xl bg-slate-50 ring-1 ring-slate-200/70` on a
   white section (DS §4a: a card ground opposes its section ground). Keep the slice of 3; it is a
   related-reading rail, not a crawl path.
10. Grounds oscillate and navy never touches navy (DS §0.1, §9). The file today ends on a full-bleed
    crimson band directly above the slate-900 footer. Canonical tail here: article white, navy
    enquiry panel INSIDE the article column rather than full-bleed, FAQ slate-50, more-guides white.
    The last full-bleed band before the footer must be light.

**Every anchor target gets `scroll-mt-24`** (the enquiry form, and each heading id the TOC points at;
the prose-blog CSS block may already set it, so grep scroll-mt in globals.css and report).

**`generateMetadata` (`:27-44`) UNCHANGED. `generateStaticParams` (`:21-23`) UNCHANGED.**

**Data available, so no new copy is needed:** title, metaTitle, metaDescription, date, eyebrow,
summary, hero, faqs, ctaTitle, ctaBody, contentHtml, wordCount (`src/lib/solicitor-guides.ts:13-58`).
ctaTitle and ctaBody have loader defaults at `:54-55`; those defaults are ALREADY the published
fallback copy. Carry them, do not rewrite them.

**OFF LIMITS:** `src/app/solicitor-guides/page.tsx` (WP5), `content/solicitor-guides/**`,
`src/lib/solicitor-guides.ts`, `src/app/blog/**`, `src/components/blog/**`, everything in
`packages/`. Do not edit `globals.css` except to ADD a rule; if prose-blog needs a guide-specific
tweak, say so and STOP. That file is shared with 196 article routes and the manager sequences it.

**Acceptance:**

- A grep for max-w-3xl, max-w-5xl, sectionYLoose, font-serif, rounded-2xl and the crimson
  full-bleed hero class on the file returns no hits.
- A grep for FaqSection on the file returns 0.
- The diff shows generateMetadata and generateStaticParams unchanged.
- Report the extractHeadings length for sra-accounts-rules-essentials and for
  law-firm-profitability-guide. That is the TOC proof.
- State the 10 guide floors from §1 and confirm you removed no href. **The body is passed through
  untouched; you may not delete a single body link.**
- `python scripts/check_dependency_closure.py`; `npx tsc --noEmit`; `npm test`.

---

### WP5 — THE GUIDES INDEX

**File (owns exclusively):** `Solicitors/web/src/app/solicitor-guides/page.tsx` (107 lines).
Floor: 21 unique internal links, 0 em-dashes, 2 data-cta.

**Port from:** `Solicitors/web/src/app/blog/page.tsx:59-175` — phase 2, this site, reviewed twice:
cream `heroCreamSurface` hero with SolicitorsBackdrop cream, `min-h-[350px]`, breadcrumb, h1,
standfirst, CTA row; a card band; then the in-flow closing LeadCTAPanel with LEAD_PROOF_POINTS and
SolicitorsBackdrop navy; then a light tail so navy never touches navy. F.4 is the standard reference
for hub shape, but this is an index, not a category hub, so it does NOT adopt BlogCategoryHub.

**Changes:**

1. Hero: the full-bleed crimson section at `:48` becomes `heroCreamSurface` plus the backdrop. The
   light breadcrumb variant becomes the default. The font-serif h1 becomes
   `text-3xl font-bold ... sm:text-5xl lg:text-6xl`. **The eyebrow, the h1 and the standfirst at
   `:59-64` are transcribed verbatim.**
2. Card grid: drop `mx-auto max-w-5xl` (`:74`), keep siteContainerLg. Cards move from the
   `rounded-2xl border` recipe to `rounded-xl bg-white ring-1 ring-slate-200/70` on a `bg-slate-50`
   section (card ground opposes section ground, DS §4a). font-serif becomes font-bold. Every card
   string (eyebrow, title, summary, the read-time line, the Read guide affordance) is kept.
3. **NET-NEW: an in-flow LeadCTAPanel.** The index has no ask at all today (DS §0.5). Same
   manager-level call phase 2 recorded for `/blog` and for articles: in-flow, not interruptive
   (playbook §1). Copy is the `/blog` panel title and description plus LEAD_PROOF_POINTS. See R4.
4. A light band after the panel, so navy never touches navy.
5. The `metadata` export (`:9-28`) and the JsonLd payload (`:36-42`) are UNCHANGED.

**OFF LIMITS:** the guide `[slug]` template (WP4), `src/lib/solicitor-guides.ts`, `content/**`,
`src/app/blog/**`, everything in `packages/`.

**Acceptance:**

- A grep for the crimson full-bleed class, font-serif, rounded-2xl, max-w-5xl and sectionYLoose on
  the file returns no hits.
- The diff shows the metadata export unchanged.
- Count the internal hrefs in the source and state the number against the floor of 21.
- Report any new data-cta by id, placement and goal. They are additive; nothing existing may change.
- `python scripts/check_dependency_closure.py`; `npx tsc --noEmit`; `npm test`.

---

### WP6 — MANAGER VERIFICATION (not a builder package)

Serialised, after WP1 to WP5 land. Nothing else builds while this runs (T1).

```
python scripts/check_dependency_closure.py
cd Solicitors/web && npx tsc --noEmit && npm test
cd generalist/web && npx tsc --noEmit && npm test        # WP1 touched the kit
cd packages/web-shared && npm test
cd Solicitors/web && npx next build                      # expect 294 prerendered pages
cd Solicitors/web && npx next start -p <port>
```

Then, and only after reading the bound port out of the server log AND asserting the served page
title (field notes §5: three wrong-site measurements in one session):

- Crawl all 274 baseline routes. Assert every route at or above its link floor and at or below its
  em-dash ceiling. Special attention: the 17 hub routes and the 11 guide routes in §1.
- Use curl -L on any route family that redirects. A bare `/blog/<slug>` 301s and returns 62 bytes,
  which reads as a component that never renders.
- **CTA triple diff (T22).** `link_baseline.json` stores COUNTS only and cannot catch a flipped
  placement or goal. Stand up the production SHA `18b4f25f` on a second port and diff the rendered
  data-cta / data-cta-placement / data-cta-goal triples. **Prove the pre-port server age first**
  with a string whose commit date you know, then compare. The phase-2 rig at `C:/port-base` was
  killed for serving a stale .next; rebuild rather than resurrect it.
  Expected: zero lost, zero changed, plus additive ids `blog_hub_<slug>_book` and
  `blog_hub_<slug>_articles` on all 17 hubs, `blog_hub_topic_<slug>`, `blog_hub_all_articles`, and
  whatever WP5 adds on `/solicitor-guides`. Record the full set in STATE.md.
- `node docs/_engines/instruments/sweep.mjs --site=Solicitors --base=http://localhost:<port>
  --sample=9999 --sha=18b4f25f... --out=<path>`. A baseline without `--sha` is refused with a
  warning and still written; pass it.
- **Hide-never-slice, verified live on the one hub where it is visible:** `practice-finance-cash-flow`
  should show 26 article hrefs in the server HTML, 12 visible, 14 carrying `hidden`, and a
  "Page 1 of 3" bar. Only 4 of 17 hubs exceed 12 posts, so a slicing regression would be invisible
  on the other 13. See R10.
- One hub's rendered JSON-LD diffed before and after: exactly one BreadcrumbList and one
  CollectionPage must survive, with the same content (R9).
- Then an INDEPENDENT adversarial review against the rendered DOM, gap-fix, re-review, tag, commit.
  A review that finds nothing has failed.

**Numbers to hold or beat** (phase 2 close): build exit 0 and 294 prerendered pages; 0 link-floor
breaches across 274 routes; at least 10,511 unique internal links; at least 1,170 data-cta; at most
329 visible em-dashes; Solicitors at least 16 files / 208 tests; web-shared 19 files / 406 tests;
dependency closure OK across 19 sites.

---

## 4. INTER-PACKAGE DEPENDENCIES (sequencing for the manager)

```
WP1 (manager: kit props + card recipe + shared const)
 |--> WP2 (10 derived hubs)     --+
 |--> WP3 (7 hand-built hubs)   --+
                                  +--> WP6 (manager verify, serialised)
      WP4 (guide template)      --+
      WP5 (guides index)        --+
```

- **WP1 blocks WP2 and WP3.** WP2 needs LEAD_PROOF_POINTS; WP3 needs the `heading` prop and
  `HubSection.bullets` or it cannot transcribe its copy without changing it. Run WP1 first, alone.
- **WP4 and WP5 do not depend on WP1** and can start immediately, in parallel with it. They touch
  neither the kit nor blog-category-copy.ts.
- **WP2 and WP3 are parallel to each other** once WP1 lands: disjoint files, and neither changes
  STATIC_HUB_SLUGS, so the static/dynamic routing contract is stable throughout the phase.
- **WP4 and WP5 are parallel to each other** (two files, no shared symbol).
- Nothing builds except WP6. Concurrent builds corrupt `.next` (T1).
- Recommended wall clock: launch WP4 + WP5 + WP1 together; when WP1 lands, launch WP2 + WP3; then
  WP6.
- Concurrency hygiene: other agents are in this checkout. Stage explicit paths and commit as ONE
  command, from the monorepo root only. After committing, verify with
  `git show --name-only --format="" HEAD | grep -c "^Solicitors/"`. Never delete `.git/index.lock`.
  A stale `Solicitors/.git` husk silently swallows git operations run from inside the site
  directory: root only, always.

---

## 5. RISKS AND AMBIGUITIES, EACH WITH MY RECOMMENDED RESOLUTION

**R1 — The hubs ship with NO essentials briefing, and that is the biggest visible gap against
Property and generalist. CERTAIN, owner-caused, already priced.**
F.4 wants a white essentials briefing between the hero and the library. Property hand-wrote one per
hub; generalist authored 11 in `generalist/web/src/lib/blog-hub-briefings.ts` (+411 lines).
Authoring 17 is new prose and the hard rule forbids it.
*What the 10 DERIVED hubs lose: everything.* Their body becomes hero, library, panel, other topics.
They gain a capture surface and 7 previously unreachable sibling categories, so they remain a large
net improvement on today, but they carry no unique indexable prose, which is what makes a hub rank
as more than a list page. Their description and intro also still print the category name three times
in a row (today `:121-136`), and the hard rule freezes that too.
*What the 7 HAND-BUILT hubs lose: nothing.* Their existing prose becomes the briefing verbatim.
**RECOMMENDATION: ship as planned with an empty sections array on the 10 derived hubs, and put the
briefings to the owner as a costed content job (17 hubs, 3-4 sections each, Opus-only, against
house_positions.md). It is already open owner question 2 in STATE.md. Do not let a builder improvise
even one sentence of it.**

**R2 — "No copy changes" versus adopting a template that carries its own chrome strings. AMBIGUOUS,
and it needs the owner's line before WP2 starts.**
The kit hub prints strings this site has never published: Book free consultation, Browse N articles,
The essentials, The library, Every X article, Keep exploring, Browse other topics, All articles and
guides, and the LeadCTAPanel footnote. Read absolutely literally, adopting the standard is impossible.
**RECOMMENDATION: draw the line where phase 2 already drew it and the owner accepted. An EXISTING
visible string is never rewritten, re-cased, or moved from one surface to another; NEW template
chrome arriving with a standard component is design, not copy.** Phase 2 shipped exactly this on
/blog (blog_hero_book "Book a free consultation", "Browse by topic", "The archive") and it survived
two adversarial reviews. State the line explicitly in every builder brief so nobody splits the
difference. If the owner reads it the other way, the phase cannot proceed and he needs to say so.

**R3 — libraryNote, and the hub CTA on the derived hubs, are net-new strings on those routes. REAL,
small.**
libraryNote defaults to Property's landlord copy and MUST be overridden on every call site. The 10
derived hubs have no CTA copy of their own, so WP2 sources it from BLOG_CATEGORY_COPY, which is
already published on this site (on every article in that category) but not on that route.
**RECOMMENDATION: accept both. libraryNote is a formulaic count sentence with no claim in it, and
the CTA copy is the site's own, already reviewed; reusing it is what makes hub and article agree,
which was the point of keying on the slug. Disclose both in the phase 3 STATE.md entry as "copy
added to a surface that had none", explicitly distinct from "copy rewritten", which is zero.**

**R4 — WP5 adds an ask to /solicitor-guides, which has none. REAL, needs one title string.**
Same class as R3, and the same class as phase 2's in-flow LeadCTAPanel on /blog.
**RECOMMENDATION: reuse the /blog panel's exact title and description (`src/app/blog/page.tsx:145-146`)
rather than writing a second one. It is already published, it is the same offer to the same reader
one click away, and it keeps the new-string count for that package at zero. If the manager prefers a
guides-specific line, that is an owner question, not a builder decision.**

**R5 — The guide FAQ and the kit FaqSection. SETTLED, restated so nobody re-litigates it.**
`design/primitives/FaqSection.tsx` escapes HTML in answers and keeps closed answers out of the server
HTML. Solicitors guides carry a faqs array rendered as a plain dl that IS in the server HTML.
**RECOMMENDATION: keep the dl, restyle only, exactly as the phase-2 renderer does at
BlogPostRenderer.tsx:326-343. Put this in the reviewer KNOWN AND ACCEPTED list.**

**R6 — The kit card-recipe change reaches generalist. REAL, cross-site.**
WP1 change 3 alters `HubArticleList.tsx:82` and `BlogCategoryHub.tsx:243,274`, which generalist
renders across 16 files. generalist is a finished port.
**RECOMMENDATION: make the change anyway. `ring-1 ring-slate-200/70` IS the estate contract and
generalist is on the same standard, so this closes a defect there rather than opening one. The
alternative, a cardClassName prop, is a rival spelling for a contract that should not be optional.
Verify generalist tsc and npm test in the same commit (T23) and note it in generalist STATE.md.
Property is NOT a consumer of these files and cannot be affected: derived by grep, not assumed.**

**R7 — extractHeadings on guide HTML is UNPROVEN. UNKNOWN, cheap to settle.**
WP4 wires a TOC from `extractHeadings(guide.contentHtml)`. The loader claims to inject heading ids,
but no guide route has ever rendered a TOC, so those ids have never been exercised.
**RECOMMENDATION: WP4 first action is to print the heading count for two guides and report it. If it
returns empty, STOP and report. Do not fix the markdown pipeline inside a design package; that is a
lib change with 10 routes behind it and the manager sequences it.**

**R8 — dynamicParams on the article route. TRAP. Do not copy Property.**
`Property/web/src/app/blog/[category]/[slug]/page.tsx:20` sets dynamicParams to false. Solicitors
deliberately does not: its permanentRedirect fallback at `:59-62` catches a request for the right
slug under the wrong category and sends it to the canonical URL. Setting dynamicParams to false
turns those into 404s.
**RECOMMENDATION: leave it absent. Named here because a builder told to port "from Property, always"
will otherwise add it. It is also a route and redirect change, and therefore forbidden outright.**

**R9 — Removing the page-level BreadcrumbList on 17 hubs looks like an SEO change. LOW.**
It is duplicate removal: the kit Breadcrumb emits an identical BreadcrumbList with the same labels
and the same absolute URLs. Not doing it emits the node twice on every hub (T17 class).
**RECOMMENDATION: do it, and have WP6 diff one hub rendered JSON-LD before and after to prove one
BreadcrumbList and one CollectionPage survive with the same content.**

**R10 — Pagination is only visible on 4 of the 17 hubs. INFORMATIONAL, but it shapes the review.**
Only practice-finance-cash-flow (26), vat-compliance (22), sra-compliance-trust-accounting (17) and
partnership-llp-structure (17) exceed 12 posts. On the other 13 the pagination bar never renders, so
a slicing regression would be invisible on 13 of 17 routes.
**RECOMMENDATION: WP6 verifies hide-never-slice on practice-finance-cash-flow specifically. The
source-scan guard covers the kit component; this covers the consumption, which is the half no test
sees.**

**R11 — The 7 hand-built hubs select their articles by RAW LABEL today. LOW, but measure it.**
Each builds hrefs from a `p.category === "<literal>"` filter at `:32`. If any post in that category
ever carried a variant label, it has been missing from its own hub, silently. After WP3 the filter
is slug-based, so the set can only grow.
**RECOMMENDATION: WP3 reports, per hub, the post count before and after the filter change. A
difference is a pre-existing live defect to record in STATE.md, not a regression, and it also moves
that hub further clear of its link floor.**

---

## 6. FALSE PREMISES FOUND IN THE BRIEF

1. **"design/blog/HubArticleList.tsx is clean" is FALSE against the design contract the same brief
   states.** `HubArticleList.tsx:82` is `rounded-xl border border-slate-200 ...
   hover:border-primary-600`, i.e. the border recipe the contract forbids. `BlogCategoryHub.tsx:243`
   (the empty-library card) and `:274` (the other-topics chips) carry it too. Handled as WP1 change 3.

2. **"(3a) the article template route" implies work on it. There is none.**
   `src/app/blog/[category]/[slug]/page.tsx` is already a 76-line data-only delegate, and
   `BlogPostRenderer.tsx` was rebuilt to F.3 in phase 2 (verified line by line against F.3 in §0).
   Phase 3's 3a work is entirely the ten solicitor-guides and their index. **Zero edits are planned
   to any article surface, and the 196 article link floors are a regression check only.**

3. **The brief's design contract says "no body clamps, siteContainerLg IS the measure", but F.3
   itself mandates `max-w-4xl mx-auto lg:max-w-7xl` on the article body**, and the phase-2 renderer
   ships exactly that (`BlogPostRenderer.tsx:123`). These are not in conflict: the F.3 grid is the
   standard's own exception for a two-column article. Stated here because WP4 is told to copy that
   renderer, and a reviewer reading the rule literally will flag it. It belongs in the KNOWN AND
   ACCEPTED list.

4. **Not false, but corrected for the record.** DISPOSITION_SLICE1 `:242` calls
   `src/app/blog/[category]/page.tsx` "174 lines" and `:164` calls `BlogPostRenderer.tsx`
   "332 lines". Measured today: 185 and 403. `src/lib/page-summaries.ts`, which slice 1 lists as a
   local build, still does not exist and is not needed by this phase. Re-measure every number you
   use; the disposition is a hypothesis.

5. **Confirmed TRUE, so nobody re-derives them:** `src/tests/hub-article-crawl-path.test.ts` exists
   on this site and already points at the two kit files (it was written in anticipation, before any
   Solicitors hub consumed them); `src/lib/blog-category-copy.ts` carries all 17 slug keys;
   `BlogCategoryHub.tsx:19-23` and `:229` do ship Property's proofPoints and libraryNote silently;
   generalist passes both explicitly at `generalist/web/src/app/blog/[category]/page.tsx:90-91`;
   FaqSection is unusable here. All four checked against the files today.
