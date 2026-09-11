# TRADE DESIGN PORT, PHASE 2 PLAN: THE BLOG SUBSYSTEM

Site: `construction-cis/web` (Trade Tax Specialists). Written 2026-09-11, planner pass, no code
written. Four work packages for parallel builders, B1/B2/B4 concurrent, B3 after B1.

**Binding spec.** `docs/_engines/PROPERTY_STANDARD_ROLLOUT.md` §A.1-A.8, §D.2/D.3, §F.3, §F.4, §I;
`docs/property/DESIGN_SYSTEM.md` §0, §2, §3, §4, §4e, §5, §7, §9; `docs/construction-cis/DESIGN_DELTA.md`
§1, §2, §3, §3a; `docs/construction-cis/_port/DISPOSITION_SLICE1.md` §C (the starting spec, WP-3 and
WP-4 there), `LIVE_DEFECTS.md`, `link_baseline.json`, `cta_baseline.json`, `sweep_baseline.json`;
playbook traps T4, T12, T14, T17, T22, T24, T26.

**Method.** Every number below was measured against the running post-phase-1 production server at
`http://localhost:3179`, title asserted `CIS Accountants &amp; Construction Tax Specialists | UK`
before anything was trusted. Corpus counted on disk. Every file path named was checked to exist.
Link arithmetic replicates the sweep instrument's own metric (`sweep.mjs:156`, unique `<a href="/..."`
with hash and query stripped, so in-page `#` anchors count for nothing). CTA triples re-derived with
`cta_snapshot.mjs` against the live build. Property and kit sources read with line anchors.

**Why this phase is sized above the pillars.** Strict post-bot-gate, 19 days (`FUNNEL_BASELINE.md` §B):
203 clean sessions, 3 leads in the site's entire history. Blog articles drew **110 of 203 sessions
(54%)**, produced 42 form views, **1 form start, 0 completions**. Homepage drew 4; the three service
pillars drew 1 between them. Property converts 10.80 per 1,000 against Trade's 4.93 and the leak is
sessions-to-form-start (0.99% against 6.16%), not start-to-complete. The blocks render and are seen.
Nothing on the page can *link* to them, and the ask is the refund pitch on all eight categories.

---

## 0. CORRECTIONS TO THE BRIEF AND THE DISPOSITION

Read these before anything else. Three of them change what a builder is told to do.

| # | Claim | Status | Correction |
|---|---|---|---|
| 1 | "Retire the local `BlogListWithSearch`, adopt the kit `BlogListWithSearch`" (`DISPOSITION_SLICE1.md` §C.2.3, §C.4, §E) | **FALSE, and it is the defect of the phase** | The kit version **slices too**: `packages/web-shared/design/blog/BlogListWithSearch.tsx:91` `const paginatedPosts = filteredAndSortedPosts.slice(startIndex, endIndex)`, mapped at `:166`, and it contains **no `hidden` mechanism at all**. Swapping local for kit leaves 70 of 82 articles out of the server HTML and hands the defect to a 1-consumer shared component. See WP-B2 for the remedy. |
| 2 | `Property/web/src/app/blog/[category]/page.tsx` is a reference to read | **FALSE: the file does not exist** | Property has no `[category]` route. Its ten hubs are ten static route dirs (e.g. `Property/web/src/app/blog/capital-gains-tax/page.tsx`, 81 lines) over Property's **own local** `BlogCategoryHub`, which takes no `posts`/`categories`/`siteUrl`/`form`/`proofPoints` and loads content itself. The **kit** `BlogCategoryHub` is a different component with a different contract. Trade keeps its one `[category]` route; the reference for prop shape is the static hub file, for structure the kit component. |
| 3 | "79 routes end on a dark band, of which 18 are blog routes falsely reported as in breach" | **FALSE as phrased** | `DESIGN_DELTA.md` §3a already **removed** `/blog` 18 and `/resources` 3 from the count. The 79 are glossary 50, locations 25, plus `/cis-refund`, `/gross-payment-status`, `/cis-invoice-template`, `/cis-payment-deduction-statement-template`. Blog routes are not among them, so phase 2 inherits **zero** §3a closure work. Independently confirmed here: the last opaque band in `<main>` is light on all three blog families (`/blog` and hubs end on `bg-[#fafaf7]` cards, articles end on the white `<article>`), footer is `bg-slate-900`. |
| 4 | "82 posts / 8 categories" | **TRUE** | 82 `.md` under `construction-cis/web/content/blog/`, 8 distinct `category:` values (26/21/10/8/8/5/2/2 = 82), and `link_baseline.json` carries exactly 82 `/blog/{cat}/{slug}` routes + 8 hubs + `/blog` = 91. **`DISPOSITION_SLICE1.md` says "83" throughout (§C.1, §C.4, §F, WP-3, WP-4). It is wrong by one. Use 82.** |
| 5 | "all 36 baseline dashes are on 6 CALCULATOR pages" | **Half false, harmless** | One of the six is `src/app/llms-full.txt/route.ts` (8), not a calculator. And the committed guard `src/tests/design/em-dash.test.ts` counts **43** em + 2 en on its own source-scope metric, deliberately different from the sweep's 36. The operative rule is unchanged and correct: **phase 2 introduces none**, and the 2 en-dashes in money ranges must not be touched. |
| 6 | "the kit `Calculator.tsx` exposes `--calc-warn-*`, tone branches unreachable" | **TRUE, with the path corrected** | It is `packages/web-shared/tools/components/Calculator.tsx:131,141`, not under `design/`. Unreachability confirmed: `headline.tone` and `verdict` are set only in `src/lib/calculators/premium/configs/*`, which feed `PremiumCalculator.tsx`, not this component; no file under `src/lib/calculators/tools/` sets either. **All of it is out of phase 2's scope** (calculators are phase 5/6). |
| 7 | `DISPOSITION_SLICE1.md:5` "WP-1/WP-2 (chrome) and WP-4/WP-5 (blog)… WP-3 (homepage) is last" | Internally inconsistent with its own §H | §H has WP-3 = blog article template, WP-4 = blog index+hubs, WP-5 = homepage. §H is the authoritative one and matches the brief. Line 5's parenthetical is stale. |
| 8 | Phase 1 "shipped" / "landed" | True in the working tree, **not committed** | `git log -- construction-cis/` ends at `80a35e16` (phase 0). Phase 1 is 7 modified + 4 untracked paths in this checkout. Builders must not assume a clean baseline to diff against, and must not commit anything outside their own file set. |

### What phase 1 already satisfied, so nobody builds it twice

- `.prose-blog a` (`globals.css:319`) already resolves to `var(--accent-strong)` = `#c2410c`, **5.18 PASS**. `DISPOSITION_SLICE1.md` §C.1 row 9's "3.16 → 5.18" link-colour fix is **DONE**. Do not re-do it, do not re-quote 3.16 as live.
- `--warn-1..4` + on-dark twins, `--btn-ground{,-hover,-active}`, `--hero-cream`, `--dark` at `#0f172a`, the `--color-primary-*` ramp, `globals-standard.css` import (hence `--radius-xl` = 4px) are all present in `globals.css`. Phase 2 consumes tokens only and **adds none**.
- Chrome contributes exactly **20** unique internal destinations to every blog route (measured). Post-phase-1 link counts are already above every phase-2 floor: `/blog` 40 vs 34, `/blog/cis-basics` 32 vs 26, `/blog/expenses` 22 vs 16, a 20-floor article 25 vs 20.
- CTA triples re-derived post-phase-1: **all five still byte-identical to `cta_baseline.json`** (246/246/109/18/1). Phase 1 did not move them. Phase 2 must not either.

### Still open in blog scope, contrary to the disposition's "restyle only"

- `.prose-blog h2` (`globals.css:296`) `border-left: 4px solid var(--accent)` = `#f97316`, **2.80**, on every h2 of every one of the 82 articles. `DESIGN_DELTA.md` §1 is explicit that a meaning-bearing border uses `--accent-strong` or `--btn-ground`, never `--accent`. Live graphics failure, blog-owned, open. WP-B1.
- `keyTakeaways` box `border-orange-500 bg-orange-50` and the FAQ rows' `border-l-4 border-orange-500` are decorative strokes on a tint, not meaning-bearing: radius and rule only, per the disposition's carve-out.

---

## 1. REALITY CHECK PER SURFACE

### 1a. `/blog` index (`src/app/blog/page.tsx`, 103 lines)

**Measured: server HTML carries 12 of 82 articles.**
```
curl -s http://localhost:3179/blog | grep -oE 'href="/blog/[a-z0-9-]+/[a-z0-9-]+"' | sort -u | wc -l
  -> 12
ls construction-cis/web/content/blog/*.md | wc -l
  -> 82
```
70 articles are uncrawlable from their own index, on the route family carrying 54% of the site's
traffic. Mechanism: `src/components/blog/BlogListWithSearch.tsx:68` slices, `:136` maps the slice,
page changes are two `<button>`s. `DESIGN_SYSTEM.md` §4e is the contract: **hide with the `hidden`
attribute, never `slice()`**, because `NumberedPagination` renders `<button>`, so page state is
client state and a sliced grid puts cards 13..N outside the HTML entirely.

**Second, larger-than-reported defect on the same page.** `page.tsx:31-34` spreads `{...p}` for all
82 posts into a `"use client"` component, so every post's full `contentHtml` ships in the flight
payload. Measured: **`/blog` serves 2,309,255 bytes** and `/blog/cis-basics` 792,499. Property fixed
exactly this (its `page.tsx:88-91` carries the comment about the 19 MB payload) by projecting to
`{title, summary, category, slug, date, categorySlug}` and precomputing read times server-side. The
two fixes pull in opposite directions on byte count and must land together: hiding 82 cards adds
markup, dropping `contentHtml` removes roughly 2.2 MB.

### 1b. 8 category hubs (`src/app/blog/[category]/page.tsx`, 99 lines)

Same sliced list (`:13` imports the same component). Measured `/blog/cis-basics` = 12 crawlable
article links against 26 posts in that category. The hub filter at `:50`
`slugifyCategory(p.category) === category` is **already correct**, Property's raw-frontmatter-equality
bug does not reproduce here, and the disposition says so. Keep it; add the guard that every post
lands in exactly one hub.

`DESIGN_SYSTEM.md` §4e names the hubs as the only full HTML crawl path to the corpus. On this site
that is sharper than on Property: `/blog` is the sliced one *and* the hubs are sliced, so for 70
posts there is **no** server-rendered path from any index.

### 1c. Article template (`src/components/blog/BlogPostRenderer.tsx`, 341 lines, 82 routes)

The disposition's §C.1 table of 16 rows is correct and is the spec. Reconciled against phase 1 and
against the Property source, the rows that actually move are: the 420-520px blurred photo hero
(`:81-163`) down to the F.3 header card; the skip link (absent today); `#enquiry-form` gaining
`id` + `scroll-mt-24` + `aria-labelledby` (`:297` has none of the three, which *is* the 42-views /
1-start mechanism); the per-category CTA map replacing one generic block; the sidebar gaining
`BlogSidebarCta`; `RelatedArticles` replacing the bespoke row list.

The 3-moment capture split (`:218-261`) is ahead of Property and **must not be flattened**.

### 1d. Kit `FaqSection`: NOT SAFE on this site

Verdict and evidence, because the brief asks plainly.

1. **It escapes HTML in answers.** `packages/web-shared/design/primitives/FaqSection.tsx` renders
   `<p>{faq.answer}</p>`. Trade carries **677 FAQ answers across the 82 posts**, of which **1 file
   contains real HTML in an answer** (`content/blog/cis-gross-payment-status-guide.md`). That post
   would render literal tags. Property's own renderer does *not* use this component; it hand-rolls
   the same accordion with `dangerouslySetInnerHTML` (`Property/.../BlogPostRenderer.tsx:338-345`)
   precisely because of this.
2. **Closed answers are not in the server HTML.** It wraps every answer in Radix
   `AccordionContent`; `packages/web-shared/design/primitives/accordion.tsx:49-63` passes no
   `forceMount`, and Radix Collapsible gates Content behind Presence (the `forceMount?: true` prop
   exists for exactly this). Trade renders all 677 answers today as plain `<dd>` (verified:
   `curl .../what-is-a-cis-accountant | grep '<dd'` returns them). Adopting it silently removes 677
   answer bodies from the server HTML of the 54%-traffic family.
3. T17 is **already satisfied** and is not the reason to change anything: `BlogPostRenderer.tsx:45-46`
   builds the schema from the same `post.faqs` array `:263-277` renders. `LIVE_DEFECTS.md` TD-27
   confirms no drift across the site's three FAQPage builders.

**Recommendation: keep Trade's plain `<dl>`, restyle only** (radius, rule colour, `rounded-xl`,
heading scale). It is the laziest option, it is the only one that keeps 677 answers crawlable, and
it needs no kit edit (T12). Owner gate 8 records the alternative.

### 1e. The warning ladder in blog scope: there is nothing to sweep

Measured across `src/components/blog/**` and `src/app/blog/**`: **zero amber usages, zero orange
usages carrying warning or penalty semantics.** Every orange hit is brand decoration or a button
ground. Site-wide amber lives in `app/research/*`, `app/calculators/[slug]`, `app/admin/analytics/*`,
`components/calculators/premium/PremiumCalculator.tsx`, `data/trade-types.ts`,
`lib/calculators/tools/cis-penalty-calculator.ts`, **none of them phase 2's files**.

So the brief's "the blog is the biggest consumer of the warning ladder" is true **prospectively, not
as a reassignment**. The ladder's first render on this site is the NET-NEW essentials briefings in
WP-B3, assigned per `BRAND_LAYER.md` §4.2: CIS300 deadlines `--warn-1`; the 30% unverified rate and
the 5% geared element `--warn-2`; the fixed penalty ladder and GPS withdrawal `--warn-3`; deliberate
withholding `--warn-4`. Every tier used on a light ground (cream hero, white essentials) so the
on-dark twins are not needed in phase 2.

### 1f. Content-layer rot in blog scope

- **Two dead hotlinked hero images, confirmed 404 live:** `content/blog/cis-end-of-year-return.md`
  → `pexels-photo-7821879` → **404**; `content/blog/how-long-large-construction-firms-take-to-pay-subcontractors.md`
  → `pexels-photo-8961042` → **404**. A third checked at random returns 200, so this is rot, not a
  blanket block. **All 82 posts hotlink a pexels hero**, so the exposure is 82 and the sample is 2.
- `LIVE_DEFECTS.md` TDs landing on blog-scope files: **TD-03, TD-04, TD-10, TD-11, TD-14, TD-22,
  TD-29, TD-30**. TD-11 is the expensive one: the uncaveated "£2,000" claim in
  `niche.config.json cta.variants.leadgen.blog.cta_body` renders in the CTA of **every** blog post
  via `BlogPostRenderer.tsx:299`, i.e. the site's single highest-traffic instance of a banned claim.

---

## 2. WORK PACKAGES

Smallest edit point, stated once: **one template renders 82 pages and one list component serves both
indexes.** No package touches 82 files. The only per-post edits in this phase are the two 404 image
lines in WP-B4.

---

### WP-B1: Article template, the ask, and the per-category CTA map

**Value: highest in the phase.** 110 of 203 sessions, 42 form views, 1 start.

**Files (all verified to exist unless marked NEW).**
```
src/components/blog/BlogPostRenderer.tsx        341  rewrite in place
src/components/blog/InlineMiniLeadForm.tsx      25   restyle + TD-14
src/components/blog/ToolIsland.tsx              32   restyle + data-cta
src/components/blog/ExitIntentModal.tsx         182  DELETE (0 importers)
src/lib/blog-cta-map.ts                         NEW  CTA_BY_CATEGORY, 8 keys
src/app/globals.css LINES 286-386 ONLY          the .prose-blog block
```
**Source to copy from.** `Property/web/src/components/blog/BlogPostRenderer.tsx` (418 lines):
header card `:189-246`, meta pills `:197-228`, skip link `:235-245`, mobile TOC `:248-250`, prose
body `:262-303`, `#enquiry-form` `:305-328`, author/reviewer aside `:349-381`, RelatedArticles
`:383-396`, sidebar `:402-410`. `CTA_BY_CATEGORY` shape at `:37,43-94`. Copy these two strings
verbatim:
- `#enquiry-form` section (`:307`): `relative mt-16 overflow-hidden rounded-xl bg-slate-900 p-8 sm:p-10 text-white scroll-mt-24`, with `aria-labelledby="enquiry-form-heading"`.
- sidebar wrapper (`:406`): `sticky top-24 max-h-[calc(100vh-7rem)] space-y-5 overflow-y-auto`, inside `<aside className="hidden lg:block">`.

Kit, consumed verbatim: `design/blog/RelatedArticles.tsx` (120, server, `items: {href,title,excerpt?,kind?}[]`,
`columns?`), `design/blog/BlogSidebarCta.tsx` (55, server, `copy: {heading,body}`),
`design/blog/TableOfContents.tsx` (114, client, `headings`, **carries no sticky of its own**, the
wrapper supplies it), `design/blog/ReadingProgress.tsx` (41, client, no props).

**Spec.** §F.3; §D.3 (the anchor + `scroll-mt-24`); `DESIGN_SYSTEM.md` §2 (RelatedArticles is the
only article-card grid on a conforming site, do not write a fifth), §9 (the tail runs navy
`#enquiry-form` → light FAQ/aside/related → navy footer, so the ground rule holds).

**Does and does not.**
- DOES: header card replacing the blurred photo hero; `post.image` becomes an in-body `rounded-xl`
  figure with the `:129-162` photo-credit block moved with it, `rel="noopener nofollow"` kept;
  skip link; `#enquiry-form` with id + `scroll-mt-24` + `aria-labelledby`; 8-key CTA map consumed by
  both the form block and the sidebar so they cannot drift; `RelatedArticles` (map Trade's
  `{slug,categorySlug,title,summary}` to `{href: /blog/${categorySlug}/${slug}, title, excerpt}`);
  `.prose-blog h2` border `var(--accent)` → `var(--accent-strong)`; `.prose-blog [id] { scroll-margin-top: 6rem }`
  (closes 30 of TD-22's 31 targets in one line).
- DOES NOT: touch the 3-moment split logic at `:218-261`; touch `.prose-blog a` (phase 1 fixed it);
  adopt kit `FaqSection` (§1d); change `NextStepOffer` (owner gate 1); touch consent wording
  anywhere; add any modal, banner, toast or exit-intent. `ExitIntentModal.tsx` is **deleted, not
  ported**, but its `bfp_assistant_active` stand-down key is read by live code
  (`SpecialistWidget.tsx`, `DeepScrollModal.tsx`), so the KEY stays.

**Fixes:** TD-14 (`InlineMiniLeadForm.tsx:20` turnaround promise), TD-22 (30 markdown anchor targets),
the live 2.80 h2 border. Carries TD-11 to owner gate 3.

**Acceptance.**
```
python scripts/check_dependency_closure.py                                   # T24
MSYS_NO_PATHCONV=1 node docs/_engines/instruments/cta_snapshot.mjs \
  http://localhost:3179 docs/construction-cis/_port/link_baseline.json <out> # T22
npx vitest run src/tests/design/em-dash.test.ts src/tests/design/page-summaries.test.ts
curl -s http://localhost:3179/blog/cis-basics/what-is-a-cis-accountant | grep -c 'id="enquiry-form"'
```
- CTA diff: the five triples byte-identical, `246 / 246 / 109 / 18 / 1`. New ids may appear (the
  baseline is a floor); no existing id may change placement or goal.
- `id="enquiry-form"` + `scroll-mt-24` + `aria-labelledby` present on all 82 article routes; the skip
  link resolves to it.
- 3-moment split still fires on a mapped tool category (`cis-refunds`) and on one without
  (`vat-and-mtd`).
- A guard asserting all 8 category slugs have a `CTA_BY_CATEGORY` key.
- Link floor: `/blog/cis-basics/what-is-a-cis-accountant` ≥ 20, `/blog/cis-refunds/how-long-does-cis-refund-take` ≥ 20, `/blog/cis-basics/cis-and-mortgages` ≥ 21.
- 0 new em dashes.
- **T4:** the renderer is a server component calling two client kit components. Props must stay
  serializable, no functions, no class instances across the boundary. `tsc` and vitest both pass
  this; only the manager's real build catches it.

**Depends on:** phase 1 (in the working tree). **Blocks:** WP-B3 (needs `src/lib/blog-cta-map.ts`).
WP-B3 may start as soon as that one file exists.

---

### WP-B2: `/blog` index: the crawl-path fix and the 2.3 MB payload

**The single highest-leverage defect in the port.** 70 of 82 articles uncrawlable from the index of
the family carrying 54% of sessions.

**Files.**
```
src/app/blog/page.tsx                           103
src/components/blog/BlogListWithSearch.tsx      201  patched, NOT retired
src/tests/design/hub-article-crawl-path.test.ts      delete the `.fails`
src/lib/page-summaries.ts                            only if /blog's metadata.description changes
```

**Recommended remedy, and why it differs from the disposition.** The disposition says retire the
local list for the kit `BlogListWithSearch` + `HubArticleList` + `NumberedPagination`. **Do not.**
The kit list slices at `:91` and maps the slice at `:166` with no `hidden` anywhere, so the swap
does not fix the defect, costs three new dependencies, and puts a Trade-shaped change on a shared
component mid-port (T12/T23, the Solicitors failure mode). The local file already has the search,
the sort and the pagination bar. **Patch it:**
1. map the full prop array, the literal `{posts.map(`, and hide off-page and filtered-out cards
   with `hidden={...}`, the `HubArticleList.tsx:81` mechanism:
   `hidden={Math.floor(visibleIndex / postsPerPage) + 1 !== currentPage}`, where `visibleIndex` is
   the card's index in the filtered+sorted order and a filtered-out card is hidden outright.
2. keep `postsPerPage = 12`, §4e's rule is that the page size caps what is **visible**, never what
   is rendered.
3. on `page.tsx:31-34`, replace `{...p}` with Property's projection
   (`Property/web/src/app/blog/page.tsx:92-104`): `{title, summary, category, slug, date, categorySlug}`,
   read times already precomputed at `:35`. **`contentHtml` must not cross the boundary.**

Then the rest of §C.2: navy motif hero replacing `:40` `bg-neutral-900`, `font-semibold`→`font-bold`
per §A.3, the 8 category cards `:61-87` merged into one 48px-chip filter band with the search/sort
row, `#book` `LeadCTAPanel` (this route is the highest-traffic non-article surface in the slice and
has **zero** capture today), `CollectionPage` JSON-LD (`BreadcrumbList` already comes from
`<Breadcrumb>`).

**The guard, explicitly.** `src/tests/design/hub-article-crawl-path.test.ts` asserts the correct rule
already, wrapped in `it.fails(` at **line 68** because the defect is live and owned by this phase.
When the list is fixed, that test begins reporting "expected test to fail". **Delete `.fails` at
line 68 (making it `it(`) and delete the `>>> WHEN YOU FIX` note at lines 25-26, in the same commit
as the list change.** Not a follow-up. The predicate it calls,
`checkHubArticleList` (`packages/web-shared/design/guards/hub-article-crawl-path.ts:61-67`), is a
source-text scan requiring the literal string `{posts.map(`, requiring no `posts.slice(`, and
requiring `hidden={`, so name the mapped variable `posts` or the guard fails on a correct fix.

**Spec.** `DESIGN_SYSTEM.md` §4e (verbatim contract), §C.2 of the disposition, §F.4 for the band
order. **Fixes:** the crawl-path defect, the flight-payload defect, TD-29/TD-30 if the `57+` figure
surfaces here (otherwise WP-B4).

**Acceptance.**
```
python scripts/check_dependency_closure.py
curl -s http://localhost:3179/blog | grep -oE 'href="/blog/[a-z0-9-]+/[a-z0-9-]+"' | sort -u | wc -l   # 82
curl -s http://localhost:3179/blog | grep -c 'hidden=""'                                                # >= 70
curl -s http://localhost:3179/blog | wc -c                                                              # well under 2,309,255
curl -s http://localhost:3179/blog | grep -c 'contentHtml'                                              # 0
npx vitest run src/tests/design/hub-article-crawl-path.test.ts src/tests/design/page-summaries.test.ts src/tests/design/em-dash.test.ts
MSYS_NO_PATHCONV=1 node docs/_engines/instruments/cta_snapshot.mjs http://localhost:3179 docs/construction-cis/_port/link_baseline.json <out>
```
- All 82 article anchors in `/blog` server HTML, 70 carrying `hidden`.
- `/blog` ≥ **34** (projection: 20 chrome + 82 articles + 8 hubs = **110**).
- `page-summaries.test.ts` pins `PAGE_SUMMARIES["/blog"]` (`src/lib/page-summaries.ts:41`) to
  `/blog`'s own `metadata.description`. If the hero rewrite changes that description, the registry
  must move in the same commit or the guard fails.
- Five CTA triples unchanged.

**Depends on:** phase 1 only. **Runs concurrently with B1 and B4.**

---

### WP-B3: 8 category hubs, the local hub mirror, and the essentials briefings

Largest content deliverable in the phase; the ladder's first render on this site.

**Files.**
```
src/app/blog/[category]/page.tsx                 99   becomes a data-only page
src/components/blog/TradeCategoryHub.tsx         NEW  local mirror of the kit hub (T12)
src/content/hub-essentials.ts (or per-hub data)  NEW  8 x 3-4 ruled sections
```

**Why a local mirror is mandatory, not a preference.** The kit
`packages/web-shared/design/blog/BlogCategoryHub.tsx` (326 lines) hardcodes Property copy that
**has no prop to override**:
- `:286` footnote, literal, no prop: "No obligation and no hard sell. If your position is already right, we will say so."
- `:201` / `:209` hero button copy, literal: "Book free consultation", "Browse N articles".
- `:30-34` `PROPERTY_PROOF_POINTS` ("Property tax only / Section 24, CGT and MTD every day", …) defaulted at `:63`, consumed at `:283`, overridable, but Property-shaped.
- `:258-259` library-note fallback, "written by specialist property accountants".

T12 is absolute: **never edit the kit to fix this site.** Mirror it locally and parameterise those
four. Keep consuming the kit's `HubArticleList` (128 lines, client, `postsPerPage = 12`, hides at
`:81`, already §4e-compliant, no change needed) and `NumberedPagination`
(`design/primitives/NumberedPagination.tsx`, 88, client, `<button>` only).

**Structure (§F.4, kit line anchors for order).** Cream `--hero-cream` motif hero replacing `:59`
`bg-neutral-900`, `{count} articles` eyebrow kept, CTA row `#enquiry-form` / `#articles`
(kit `:173-214`) → white essentials briefing, h2 + ruled h3 rows (kit `:216-249`) → `#articles scroll-mt-24`
library on `#fafaf9` via `HubArticleList` (kit `:251-277`) → navy `#enquiry-form` `LeadCTAPanel` with
**the same `CTA_BY_CATEGORY` entry as the articles in that hub** (kit `:279-288`) → slate-50
other-topics band of 48px chips, absorbing the bare "Back to all articles" link at `:90-94`
(kit `:290-323`). `CollectionPage` JSON-LD per kit `:154-164`.

**Essentials briefings.** 8 hubs x 3-4 ruled sections: the duty / when it bites / what a contractor
or a subbie gets wrong / what we would look at. FT-plain, second person, §I copy rules. **Figures
only if re-derivable from `house_positions.md` with a section reference.** Warning ladder per §1e
above. Two live-false-statement traps sit in exactly this content area and must not be reproduced:
the "30% of tax lost" director penalty (TD-05, banned by `house_positions.md` §3) and the CIS300
12-month tier, which is **£300 or 5%**, never 100% (TD-09, §4).

**Acceptance.**
```
python scripts/check_dependency_closure.py
for c in cis-basics cis-compliance cis-advanced cis-refunds limited-company expenses vat-and-mtd software-and-tools; do
  echo -n "$c "; curl -s "http://localhost:3179/blog/$c" | grep -oE 'href="/blog/[a-z0-9-]+/[a-z0-9-]+"' | sort -u | wc -l
done
npx vitest run src/tests/design/em-dash.test.ts
MSYS_NO_PATHCONV=1 node docs/_engines/instruments/cta_snapshot.mjs http://localhost:3179 docs/construction-cis/_port/link_baseline.json <out>
```
- Every hub's crawlable article count equals its category count (26/21/10/8/8/5/2/2), 12 visible,
  the rest `hidden`.
- Every hub at or above its floor (table in §3).
- A guard that every one of the 82 posts lands in exactly one hub.
- 8 hub CTA copies resolve from `CTA_BY_CATEGORY`, identical to what the articles in that hub show.
- `#articles` carries `scroll-mt-24`. 0 new em dashes. Five CTA triples unchanged.
- No figure in a briefing that is not in `house_positions.md` with its section cited in the commit.

**Depends on:** WP-B1's `src/lib/blog-cta-map.ts` (the file only, not the whole renderer rewrite).
Once it lands, B3 runs concurrently with B1's remaining work and with B2.

---

### WP-B4: Content-layer defects: dead images, banned claims, stale figures

Small, disjoint, unblocked, and the only package that touches `content/` or `niche.config.json`.

**Files.**
```
content/blog/cis-end-of-year-return.md                                          image: line
content/blog/how-long-large-construction-firms-take-to-pay-subcontractors.md    image: line
content/blog/cis-for-limited-companies-eps-reclaim.md:187                        TD-03
content/blog/allowable-expenses-cis-subcontractor.md:285                         TD-04
construction-cis/niche.config.json                                               TD-11, TD-30
src/lib/niche-config.test.ts:44-45                                               TD-30 repoint
src/config/service-tiers.ts:64,70                                                TD-29
```
- Two confirmed 404 heroes. Options, cheapest first: drop the `image:` line on those two posts (the
  template renders the figure conditionally, and §F.3 no longer uses the image above the fold);
  or substitute a live pexels id with its attribution block updated. Owner gate 5 covers the
  82-post hotlinking posture.
- TD-03: add the `house_positions.md` §13 caveat to the £150-£250 band, or drop it. The compliant
  template is already on site at `content/blog/bookkeeper-cost-self-employed-tradesperson.md:18`.
- TD-04: delete "For most clients the refund more than covers the cost of the accountant." Two
  banned claims in one sentence.
- TD-11: the uncaveated "£2,000" in `cta.variants.leadgen.blog.cta_body`, rendered in the CTA of all
  82 posts and all 8 hubs. Reattribute per §13. **Owner gate 3.**
- TD-30: delete the byte-identical top-level `blog` block duplicating `cta.variants.leadgen.blog`,
  and repoint `src/lib/niche-config.test.ts:44-45`. Without this, a TD-11 fix leaves an identical
  uncorrected string in the file and the test passes either way.
- TD-29: `service-tiers.ts:64` says `57+` guides; the corpus is **82**. Derive it from
  `getAllPosts().length` or set "80+".

**Acceptance.**
```
python scripts/check_dependency_closure.py
npx vitest run src/lib/niche-config.test.ts src/tests/design/em-dash.test.ts
for u in 7821879 8961042; do curl -s -o /dev/null -w "%{http_code}\n" "https://images.pexels.com/photos/$u/pexels-photo-$u.jpeg"; done
grep -rn '2,000\|£2,000' construction-cis/niche.config.json
```
- No blog route 404s an image (`browser_check.mjs` reports failed requests).
- `57+` gone. `grep` for the duplicate `blog` block returns one occurrence.
- 0 new em dashes; the 2 en-dashes in money ranges untouched.
- Link floors unchanged (this package adds and removes no anchors). CTA triples unchanged 
  `niche.config.json` here is copy only, never a CTA id, placement, goal or href.

**Depends on:** nothing. **Runs concurrently with everything.**

---

## 3. PER-ROUTE LINK FLOORS

Metric = `sweep.mjs:156`: unique `<a href="/…">`, hash and query stripped, so `#enquiry-form`,
`#articles`, `#book` and the skip link **count for nothing**. Chrome contributes exactly **20**
unique destinations to every blog route (measured on an article: `/`, `/about`, `/blog`, `/book`,
`/calculators`, 4 calculator slugs, `/cis-refund`, `/contact`, `/cookie-policy`, `/for`, `/glossary`,
`/gross-payment-status`, `/locations`, `/privacy-policy`, `/research`, `/services`, `/terms`).
A link to any of those 20 adds **zero** unique links.

| Route family | Floor (`link_baseline.json`) | Measured post-phase-1 | Arithmetic after phase 2 | Margin |
|---|---:|---:|---|---:|
| `/blog` | **34** | 40 | 20 chrome + **82** articles + 8 hubs = **110** | +76 |
| `/blog/cis-basics` | 26 | 32 | 20 + 26 + 7 other-topic chips = **53** | +27 |
| `/blog/cis-compliance` | 26 |, | 20 + 21 + 7 = **48** | +22 |
| `/blog/software-and-tools` | 24 |, | 20 + 10 + 7 = **37** | +13 |
| `/blog/vat-and-mtd` | 22 |, | 20 + 8 + 7 = **35** | +13 |
| `/blog/cis-advanced` | 22 |, | 20 + 8 + 7 = **35** | +13 |
| `/blog/cis-refunds` | 19 |, | 20 + 5 + 7 = **32** | +13 |
| `/blog/expenses` | 16 | 22 | 20 + 2 + 7 = **29** | +13 |
| `/blog/limited-company` | 16 |, | 20 + 2 + 7 = **29** | +13 |
| 82 x `/blog/{cat}/{slug}` | **min 20, median 24, max 33** | 25 on both 20-floor routes | 20 chrome + 1 hub + 3 `related` + in-body prose links | ≥ +5 on the floor routes |

**The only family with a thin margin is the articles, and the binding constraint is one template.**
On a 20-floor route there are 5 non-chrome destinations. `RelatedArticles` must carry the same 3-item
`related` array the bespoke list it replaces carried, drop to 2 and a 20-floor route lands on 19.
The three lowest are `what-is-a-cis-accountant` 20, `how-long-does-cis-refund-take` 20,
`cis-and-mortgages` 21. The 33-max articles are high because of in-body prose links authored in
markdown, which no package in this phase touches.

Whole-phase verification (92 routes): `node docs/_engines/instruments/sweep.mjs --site=construction-cis
--base=http://localhost:3179 --out=<out>`, asserting `links >= baseline`, `ctas >= baseline`,
`dashes` not risen. **Pass `--out` per run** or concurrent runs clobber each other.

---

## 4. OFF LIMITS, PER PACKAGE

The manager runs these concurrently. Touching a file on your OFF LIMITS list is a merge conflict at
best and a silently reverted fix at worst.

| Package | OWNS (only file it may edit) | OFF LIMITS |
|---|---|---|
| **B1** | `components/blog/BlogPostRenderer.tsx`, `components/blog/InlineMiniLeadForm.tsx`, `components/blog/ToolIsland.tsx`, `components/blog/ExitIntentModal.tsx` (delete), `lib/blog-cta-map.ts` (new), `app/globals.css` **lines 286-386 only** | `app/blog/page.tsx`, `components/blog/BlogListWithSearch.tsx`, `tests/design/hub-article-crawl-path.test.ts` (B2); `app/blog/[category]/page.tsx`, `components/blog/TradeCategoryHub.tsx`, the essentials data (B3); everything under `content/`, `niche.config.json`, `config/service-tiers.ts`, `lib/niche-config.test.ts` (B4); `globals.css` outside 286-386, and all of `components/layout/*`, `layout-utils.ts`, `brand/*`, `lib/nav.ts`, `lib/page-summaries.ts` (phase 1 / B2) |
| **B2** | `app/blog/page.tsx`, `components/blog/BlogListWithSearch.tsx`, `tests/design/hub-article-crawl-path.test.ts`, `lib/page-summaries.ts` (the `/blog` entry only) | everything in B1's OWNS column; everything in B3's; everything in B4's; all of `components/layout/*`, `globals.css` |
| **B3** | `app/blog/[category]/page.tsx`, `components/blog/TradeCategoryHub.tsx` (new), the essentials data file (new) | `lib/blog-cta-map.ts` (**read-only, B1 owns it, never edit, never extend the type**); everything in B1's, B2's and B4's OWNS columns; `globals.css` |
| **B4** | the 6 content/config files listed in WP-B4 | all of `src/components/`, all of `src/app/`, `globals.css`, all `tests/design/*` except `niche-config.test.ts` |

**Shared, read-only for all four:** `src/lib/blog.ts` (142 lines, 8 exports), `src/types/blog.ts`,
`packages/web-shared/**` (T12: read freely, never edit), `src/components/forms/LeadForm.tsx` (consent
wording, the most expensive surface in the programme, **do not touch**).

**Repo-wide, all four:** other agents have uncommitted work for Dentists, Medical, Solicitors,
generalist and hospitality in this checkout. **Never run a repository-wide git command.** A sibling
`generalist/.git` husk exists and swallows commits. Path-scope every git invocation to
`construction-cis/` and `docs/construction-cis/`.

---

## 5. OWNER GATES

1. **`NextStepOffer` on articles, keep or retire.** The disposition's GATE 7 recommends retire (1
   click ever, 2026-07-14, 0 in the window). **That recommendation breaks TRAP 22 and should be
   reversed.** Measured: `NextStepOffer` renders on **all 82** articles, 64 as `next_step|null|null`
   and 18 as `next_step|null|form`. Retiring it from the template **deletes the entire
   `next_step|null|form` 18-route triple and cuts `next_step|null|null` from 109 to 45**, two of the
   five locked triples, gone, in the phase whose own acceptance test forbids exactly that.
   **Recommend KEEP on articles, restyle only.** If the owner retires it anyway, it is a deliberate
   deletion of two triples and needs a `cta_baseline.json` restatement in the same commit.
2. **Three net-new `data-cta` ids in blog scope:** `blog_skip_to_form`, `blog_sidebar_book`,
   `blog_tool_island`. None collides with a recorded series. Recommend approve: `blog_tool_island` is
   the only way capture moment 1 ever appears in `vw_cta_performance`.
3. **TD-11, the "£2,000" claim** in the blog CTA copy that renders on all 82 posts and 8 hubs.
   Recommend reattribute per `house_positions.md` §13 ("third-party reported averages … illustrative,
   not guaranteed"), using the template already correct at
   `content/blog/how-long-does-cis-refund-take.md:38`.
4. **TD-14, the turnaround promise** at `InlineMiniLeadForm.tsx:20` ("We respond within one working
   day"). False under the pool model, which discloses up to six independent firms. Recommend delete.
   Eleven sibling instances are outside phase 2 and need their own pass.
5. **Hotlinked pexels heroes on all 82 posts, 2 confirmed dead.** Recommend: drop the two dead
   `image:` lines now, and decide separately whether 82 hotlinks to a third party stay the posture.
6. **Essentials-briefing copy, 8 hubs x 3-4 sections.** Net-new authored content on statutory duties
   and penalties. Needs an owner read before deploy; two estate-recorded false statements (TD-05's
   30% director penalty, TD-09's CIS300 12-month tier) live in exactly this subject area.
7. **Backdrop motif** (inherits slice gate 2, the scaffold grid). Blocks the article
   `#enquiry-form`, all 8 hub heroes, and the `/blog` `#book` panel. Still PROPOSED.
8. **FAQ treatment.** Recommend **keep Trade's plain `<dl>`, restyle only.** The alternative (kit
   `FaqSection` or Property's accordion) removes 677 answer bodies from the server HTML of the
   54%-traffic family and escapes the HTML in one post's answer. §1d carries the evidence.

---

## 6. RISKS AND AMBIGUITIES

| # | Risk | Recommended resolution |
|---|---|---|
| 1 | A builder follows the disposition and swaps the local list for the kit's. The defect survives, the guard's `.fails` stays green, and the phase reports a fix it did not make. | §0 row 1 and WP-B2 say patch, not retire. The acceptance command counts 82 article anchors in `/blog` HTML, a count, not a code read. |
| 2 | `checkHubArticleList` is a **source-text** scan requiring the literal `{posts.map(`. A correct fix that names the variable `visiblePosts` fails the guard; a wrong fix that happens to contain the string passes. | Name the mapped prop `posts`, and pair the guard with the HTTP count above. Never trust the guard alone. |
| 3 | `globals.css` is phase 1's file and B1 needs the `.prose-blog` block inside it. | B1's ownership is pinned to **lines 286-386** plus one new `.prose-blog [id]` rule appended adjacent to it. Anything else in that file is a conflict the manager resolves, not a builder. |
| 4 | `page-summaries.test.ts` pins `PAGE_SUMMARIES["/blog"]` to `/blog`'s `metadata.description`. B2's hero rewrite plausibly touches that description, and the guard lives in a file B1 might assume it owns. | `lib/page-summaries.ts` is B2's, for the `/blog` key only. Stated in §4. |
| 5 | T4: server/client boundary errors pass both `tsc` and vitest. B1 introduces two client kit components into a server renderer and B2 changes what crosses into a client list. | Serializable props only. The manager's real build is the only gate; run it after B1 and after B2 **separately**, so an error is attributable. |
| 6 | The article link margin is 5 on the 20-floor routes, and one template governs 82 pages. Losing the 3-item `related` array costs 3 at once. | `RelatedArticles` consumes the same `related` array `[slug]/page.tsx:72` already builds at 3 items. Do not reduce it; assert the three 20/21-floor routes by name. |
| 7 | Fixing the `contentHtml` spread and rendering 82 hidden cards move page weight in opposite directions. If only the hide lands, `/blog` grows past 2.3 MB. | Both are in WP-B2 and the acceptance test asserts the byte count fell **and** `contentHtml` is absent. They ship together. |
| 8 | Phase 1 is uncommitted. A builder running `git stash`, `git checkout .` or a repo-wide command destroys it, plus five other sites' in-flight work. | Path-scoped, read-only git only. No git write commands from builders; the manager commits. |
| 9 | Radix closed-content behaviour was verified from the `forceMount?: true` type signature and the kit's omission of it, not from a rendered page, no Trade route consumes the kit `FaqSection` today (0 importers), so there was nothing to curl. | The recommendation (keep the `<dl>`) is correct regardless of which way that resolves, because the HTML-escaping defect is independent and confirmed. If the owner ever wants the accordion, verify on a sibling that ships it first. |
| 10 | `DISPOSITION_SLICE1.md` says 83 articles in five places. A builder writes a guard asserting 83 and it fails forever. | Derive the number (`getAllPosts().length`), never type it. §0 row 4. |
