# W2 receipt, blog subsystem (phase 2), pharmacies design port

Date 2026-10-07. Agent W2. 28 routes: `/blog`, 5 category hubs, 22 posts.
No build, no server start, no git write, no subagents.

---

## 1. Files edited (only OWNS paths)

| file | change |
|---|---|
| `pharmacies/web/src/app/blog/page.tsx` | kit `Breadcrumb`, kit `HubArticleList`, closing kit `LeadCTAPanel` + `PharmaciesBackdrop`, focus ring on the category pills, container moved to `siteContainerLg`, 4 declines written at the call site |
| `pharmacies/web/src/app/blog/[category]/page.tsx` | same four adoptions, hand-rolled `Blog / <category>` trail retired for the kit `Breadcrumb`, 4 declines |
| `pharmacies/web/src/app/blog/[category]/[slug]/page.tsx` | kit `Breadcrumb`, `ReadingProgress`, `TableOfContents`, `BlogSidebarCta`, `FaqSection`, `RelatedArticles`, closing `LeadCTAPanel`; new skip-to-form anchor; `#enquiry-form` target; dead typography modifier class deleted; two-column grid with one sticky `<aside>` |
| `pharmacies/web/src/lib/blog.ts` | one behaviour fix in `getRelatedPosts` (limit was cut before the sort). **Exported shape unchanged** (W5's `getAllPosts` import untouched) |

Not edited: `src/lib/markdown-utils.ts` (nothing needed, see §5), `src/components/blog/InlineMiniLeadForm.tsx` (correct as-is; it mounts W6's `MiniCapture` with the frozen signature and was not touched).

---

## 2. Adoptions, and how each is fed

| kit path | route(s) | feed |
|---|---|---|
| `design/primitives/Breadcrumb.tsx` | all 3 | `items` + `siteUrl={siteConfig.url}` + `tone="default"` (light ground). Emits the only `BreadcrumbList` on these routes |
| `design/blog/HubArticleList.tsx` | index + 5 hubs | the lightweight `HubArticle` projection only: `slug`, `title`, `summary`, `readTime` (computed server-side), `date`, `categorySlug`. **`contentHtml` never crosses the boundary** |
| `design/blog/TableOfContents.tsx` | post | `headings={extractHeadings(post.contentHtml)}`, `stickyMobile={false}`. **ONE mount** |
| `design/blog/ReadingProgress.tsx` | post | no props. Collision reported, §6 |
| `design/blog/RelatedArticles.tsx` | post | `items` from `getRelatedPosts(post.slug, post.category, 3)`; `kind` left to the component's own `kindFromHref` so the pill cannot disagree with the href |
| `design/blog/BlogSidebarCta.tsx` | post, desktop column | `copy={{heading: niche.blog.cta_heading, body: niche.blog.cta_body}}`, `buttonLabel={niche.blog.cta_button}`. `note` default adopted as-is per K5 |
| `design/primitives/FaqSection.tsx` | post | `faqs={post.faqs}`, `html`, `alwaysRenderAnswers`, `eyebrow=""` |
| `design/marketing/LeadCTAPanel.tsx` | post + index + 5 hubs | `eyebrow=""`, `formTitle=""`, `proofPoints={[]}`, `title`/`description` = `niche.blog.cta_heading`/`cta_body`, `form={<LeadForm redirectOnSuccess={false} />}`, `backdrop={<PharmaciesBackdrop/>}` |

**Nothing authored.** Every string above is either a `niche.config.json` `blog` value the site already publishes (verified byte-identical to the two sentences the old bordered box rendered at the former `:137`/`:139`) or a kit-owned generic label.

### Deviation from the brief, declared

The brief's post-page `LeadCTAPanel` spec said "Title/description on the post = the two sentences already at `:134-140`". Those two sentences ARE `niche.blog.cta_heading` / `cta_body`, byte for byte. The config read is used so the three routes cannot drift from each other.

The brief also implied `submitLabel={niche.blog.cta_button}` was free (startups-tech does it). It is NOT free here: this site's closing blog form publishes `LeadForm`'s default **"Send enquiry"**, and `blog.cta_button` is **"Get in touch"**. Passing it would have rewritten published button copy on 22 posts. `submitLabel` is therefore NOT passed anywhere; `blog.cta_button` is used only for the skip-to-form anchor label and the sidebar card button, neither of which existed before, and it is a string the site already publishes on all 55 routes (header CTA + sticky bar).

---

## 3. Declines, each written AT the call site naming the kit file and line

| kit path:line | where written | reason (testable) |
|---|---|---|
| `packages/web-shared/design/blog/BlogListWithSearch.tsx:43,91` | `blog/page.tsx`, `blog/[category]/page.tsx` | `postsPerPage = 12` hardcoded with no prop at `:43`; `:91` **slices** before render. 22 posts, so posts 13..22 leave the server HTML. Test: `curl -s :3111/blog \| grep -oE 'href="/blog/[^"]+/[^"]+"' \| sort -u \| wc -l` must be 22 |
| `packages/web-shared/design/blog/BlogCategoryHub.tsx:75-152` | both list routes | requires `sections`, `intro`, `description`, `essentialsTitle`, `cta`, `libraryNote`. Six copy blocks no blog route on this site publishes. Adopting = authoring four new strings. Prose frozen |
| `packages/web-shared/design/primitives/NumberedPagination.tsx` | both list routes | not imported directly. **Brief premise corrected: it is NOT "only reachable through that slice"** - `HubArticleList.tsx:117-124` mounts it itself when `posts.length > postsPerPage`, with every off-page card still in the server HTML behind the `hidden` attribute. So it DOES ship on `/blog` (22 > 12) and that is correct, not a cap |
| `packages/web-shared/design/primitives/page-blocks.tsx` `Eyebrow` | all 3 routes | measured, not stylistic: the only uppercase labels these routes published were the breadcrumb trail (now the kit `Breadcrumb`) and the per-card meta line (now `HubArticleList`'s own card meta row). Nothing is left to convert; minting a new label would author copy |
| any kit prose component taking `post.contentHtml` as a text child | post template | authored raw HTML, so a text child renders escaped tags on 22 posts (memory `blog_page_rendering_html_in_frontmatter`). T12 disposition. Not a kit gap |

---

## 4. Sidebar arrangement (T32) - which of the three was built

**Arrangement (c): exactly one clamp, on the `<aside>`.**

```
<aside className="mb-8 lg:order-2 lg:mb-0 lg:sticky lg:top-24
                  lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
  <TableOfContents headings={headings} stickyMobile={false} />
  <div className="mt-6 hidden lg:block"><BlogSidebarCta ... /></div>
</aside>
```

Why, verified in source not assumed:
- `TableOfContents.tsx:97-120` (desktop branch) has no `sticky`, no `max-h`, no `overflow`, and its own docstring `:94-96` states the host owns them. So the component contributes no second clamp.
- Its mobile branch has an inner `max-h-[60vh] overflow-y-auto` on the `<details>` list at `:74`, but that branch is `lg:hidden` and the aside's clamp is `lg:`-prefixed. **At no width do two scroll containers coexist in this column.**
- (a) clamping both = scroll box inside a shorter scroll box. (b) clamping neither = sticks for ~200px. Both rejected.

Extra: the `<aside>` is **first in the DOM** and reordered with `lg:order-2`. One mount therefore serves both widths (mobile collapsible strip above the article, desktop card in the sticky column) and the page emits exactly **one** `<nav aria-label="Table of contents">`. startups-tech mounts the component twice and ships two.

`stickyMobile={false}`: the kit mobile strip pins at `top-16` (`TableOfContents.tsx:55`); this site's header is `sticky top-0` with a `min-h-[3.25rem]`/`sm:min-h-16` body (`SiteHeader.tsx:449,455`), so the two fight. Supported prop, not an override.

---

## 5. Brief premises checked against source - three were wrong

1. **`addHeadingIds` does NOT have zero consumers.** `src/lib/blog.ts:16` already calls it on every post body at parse time. The brief (A0) says "ZERO consumers". `extractHeadings` and `getRelatedPosts` did have zero; both now have one.
2. **`NumberedPagination` is not gated behind the slice.** See §3.
3. **The `tsc` baseline is now CLEAN**, not the one error the brief attributes to `research/.../page.tsx:69`. Either W6 closed it concurrently or it was already closed. `npx tsc --noEmit` is clean on the whole tree including W6's file; no action taken (not my file).

Also verified, not assumed:
- **Every post heading gets an id.** Measured with the real pipeline (`addHeadingIds` then `extractHeadings`) over all 22 bodies: **98 headings, 98 extracted, zero without an id, zero duplicate ids within any document, zero collisions against any other `id` in the body.** 10 of 22 posts author bare `<h2>` and `addHeadingIds` fills them; 12 author their own ids and the regex (which requires no attributes) correctly leaves them alone. Minimum headings on any post: 7, so the TOC renders on all 22.
- **Zero posts carry a `schema:` frontmatter field** (`grep -c '^schema:' content/blog/*.md` = 0 on all 22), so the `{post.schema && ...}` branch has never emitted anything. Kept as the documented opt-out, with that fact written at the line. **This is why K9 matters: posts today emit FAQPage (22) and HowTo (3) and NO `Article`/`BlogPosting` at all.**
- All 22 posts carry `faqs:` and `summary:`, so `FaqSection` and the `RelatedArticles` excerpts render on every post.
- Five live category slugs, counts: `buying-a-pharmacy` 7, `nhs-contract-and-income` 7, `locum-pharmacists` 3, `selling-a-pharmacy` 3, `vat-and-retail-schemes` 2.

### One behaviour fix inside an owned file

`src/lib/blog.ts` `getRelatedPosts`: the `limit` was applied **inside the collection loop, before the sort**, so "related" was the first N files in `readdir` (alphabetical) order and the trailing sort could only reorder those N. Zero consumers until this wave, so it never surfaced. Now: collect every sibling in the category, sort by date desc, then `.slice(0, limit)`. **Exported shape unchanged.**

---

## 6. Defects seen but NOT reachable - M1's input

| # | `file:line` | defect |
|---|---|---|
| D1 | `packages/web-shared/design/blog/ReadingProgress.tsx:36` vs `packages/web-shared/design/chrome/SiteHeader.tsx:449` | the bar is `fixed top-0 z-50`; the kit header is `sticky top-0 z-40`. The 4px bar paints OVER the header's top edge. The `className` prop is appended last but `z-50 ... z-30` in one class attribute are two same-specificity utilities whose winner is stylesheet source order, not attribute order, so the prop cannot reliably fix it. **Kit-owned, reported not edited.** Same nit accepted on startups-tech |
| D2 | `pharmacies/web/src/lib/schema.ts` | no `Article`/`BlogPosting` on any of 22 posts. Manager carve-out. Exact diff in §7 |
| D3 | `packages/web-shared/design/primitives/accordion.tsx` + `pharmacies/web/src/app/layout.tsx` `<noscript>` | **K4 now bites my 22 routes.** `alwaysRenderAnswers` sets `data-[state=closed]:hidden` and Radix SSRs closed, so with JS off every FAQ answer on all 22 posts is hidden while the FAQPage JSON-LD still asserts it. `layout.tsx` is a manager edit. **V30 is the proof row.** This package made the exposure larger, by design, and cannot close it |
| D4 | `pharmacies/web/src/app/blog/[category]/page.tsx:26` | the hub `description` is machine-built (`Practical guides on ${cat.name.toLowerCase()} for ...`), which yields "Practical guides on vat and retail schemes" - VAT lowercased in a meta description on 5 routes. Pre-existing, metadata not body prose; **not fixed, because fixing it means authoring five descriptions** |
| D5 | `packages/web-shared/design/blog/BlogSidebarCta.tsx:65` | `href="#enquiry-form"` is hardcoded in the kit. Satisfied here, but any future consumer that forgets the id ships a dead jump with no type error |
| D6 | `pharmacies/web/src/lib/markdown-utils.ts:1` | `addHeadingIds`' regex `/<(h[23])>/` matches only attribute-free headings. Correct today (it must not clobber an authored id) but silently skips a heading carrying any other attribute, e.g. `<h2 class="x">`. No such heading exists in the 22 posts. Left alone |

### Visible changes an owner/reviewer will notice (not defects, declared)

1. **New FAQ section on 22 posts.** These posts published their FAQs only as JSON-LD, never as markup. The questions and answers are the frontmatter's own words, unchanged; the section heading is the kit default **"Frequently asked questions"**, a generic section label rather than authored prose. **Owner-visible: say the word and it changes or goes.**
2. **`/blog` card meta changes** from `CATEGORY - N min read` to `N min read - <date>`: `HubArticleList` renders its own card meta row and shows the date (from frontmatter, newly surfaced) rather than the category. The category stays reachable from the pill row directly above.
3. **A form now exists on `/blog` and the 5 hubs**, which had none. Brief-directed; copy is the existing config triple.
4. **`.ground-dark` is deliberately NOT applied to any `LeadCTAPanel` wrapper**, and this is a measurement, not an omission. The panel's only focusable descendants are the `LeadForm` controls, which sit on the **white** form card (`LeadCTAPanel.tsx:191`). With `eyebrow`, `formTitle` and `proofPoints` all empty the navy region holds only an `h2` and a `<p>`, neither focusable. Rebinding `--focus-ring` to white on that wrapper would paint a white ring on a white card. Written at all three call sites.
5. The closing navy panel sits directly above the navy footer on 28 routes: the `adjacentSame` shape already in the baseline (brief §F item 8). **Delta only**, not a new class of finding.

---

## 7. K9: the exact `lib/schema.ts` diff, for the MANAGER

`pharmacies/web/src/lib/schema.ts` is off limits to builders. This is the diff W2 needs, to be applied manager-direct. Insert after `buildFaqJsonLd` (currently ends `:77`):

```diff
@@ src/lib/schema.ts  (after buildFaqJsonLd, line 77)
+/**
+ * BlogPosting for a blog article. No post in content/blog carries a `schema:`
+ * frontmatter field (verified 0 of 22), so before this every post shipped with
+ * no Article markup at all.
+ *
+ * `headline` takes the SAME field the visible <h1> renders (`post.h1`, which
+ * lib/blog.ts already defaults to `title`), so the two cannot disagree. R3 G1:
+ * headline drifted from the <h1> on 19 of 32 posts on startups-tech because the
+ * builder read `title` while the template rendered `h1`.
+ *
+ * `author` and `publisher` both point at the canonical Organization node rather
+ * than a bare name string: the site publishes no person author and inventing
+ * one is a claim.
+ */
+export function buildBlogPostingJsonLd(opts: {
+  headline: string;
+  description: string;
+  url: string;
+  datePublished: string;
+  dateModified: string;
+}) {
+  const org = { "@type": "Organization", "@id": `${siteConfig.url}#organization` };
+  return JSON.stringify({
+    "@context": "https://schema.org",
+    "@type": "BlogPosting",
+    headline: opts.headline,
+    description: opts.description,
+    url: opts.url,
+    datePublished: opts.datePublished,
+    dateModified: opts.dateModified,
+    author: org,
+    publisher: org,
+    mainEntityOfPage: { "@type": "WebPage", "@id": opts.url },
+  });
+}
```

And the matching call site, which W2 will add once the manager has applied the above (currently NOT present, so the post template emits no `BlogPosting`). Insert in `src/app/blog/[category]/[slug]/page.tsx` immediately after the `{post.schema && ...}` block:

```diff
+          {!post.schema && (
+            <script
+              type="application/ld+json"
+              dangerouslySetInnerHTML={{
+                __html: buildBlogPostingJsonLd({
+                  headline: post.h1,
+                  description: post.metaDescription,
+                  url: `${siteConfig.url}/blog/${category}/${post.slug}`,
+                  datePublished: post.date,
+                  dateModified: post.updatedDate || post.date,
+                }),
+              }}
+            />
+          )}
```

**Acceptance for the manager:** `headline` must equal the visible `<h1>` byte for byte on all 22 posts. The template renders `{post.h1}`; the builder above is passed `post.h1`. Same field, one expression apart, so a drift is impossible by construction rather than by checking.

No other schema change is requested. `buildFaqJsonLd` is **not** touched by W2: the post template already strips tags from the answers at the call site (now `:208`), which is the fix W3 needs for `/services` and `/for`.

---

## 8. `NextStepOffer` mount target for M1

W7 builds the component and mounts it nowhere. W2's single mount target, in the post template:

```
pharmacies/web/src/app/blog/[category]/[slug]/page.tsx:319
```

That is the line immediately after the `RelatedArticles` block's closing `)}` (at `:318`) and immediately before the in-article `scroll-margin-top` `<style>` element, inside the `lg:order-1` article column. Placing it there puts the offer after "Related reading" and before the full-bleed closing `LeadCTAPanel`, which is the only position on this route where a fourth surface does not land between the FAQ and the form it answers.

List routes get no `NextStepOffer` target: `/blog` and the hubs already close on a `LeadCTAPanel` and a second offer on an index page has nothing to offer the next step of.

---

## 9. Acceptance - run, with results

Run from `pharmacies/web` unless noted.

| check | result |
|---|---|
| `npx tsc --noEmit` | **clean, zero output** (pasted below) |
| `npx vitest run` | **6 passed (6) / 40 passed (40)** |
| `npx vitest run src/tests/focus-ring.test.ts` | **1 passed (1) / 3 passed (3)** - the guard stays green over my files |
| `python scripts/check_dependency_closure.py` (repo root) | `dependency closure OK across 19 sites` |
| em/en dash in owned files | **0** in all 6 |
| hex literals in owned `.tsx` | **0** (target was 0) |
| `neutral-[0-9]{2,3}` in owned files | **0** - P1-D held, no revert |
| legacy label class in owned files | **0** |
| `<main` / `<header` / `<footer` in owned files | **0** - `PageShell` owns all three |
| `focus-visible:outline-[...]` values in owned files | one distinct value, `var(--focus-ring)` |
| `outline-none` in owned files | **0** |
| `data-cta` in owned files | 1 new id, `blog_skip_to_form`, on an `<a>`. **No `data-cta` on a `<div>`** |
| `grep -rn 'prose-neutral' src` | **0** (dead class deleted; the comment recording it deliberately avoids the literal token so the gate grep stays honest) |
| `grep -n 'BlogListWithSearch\|BlogCategoryHub\|NumberedPagination' src/app/blog` | every hit is a decline comment naming `packages/web-shared/design/...`; **zero `from "` imports** |
| `extractHeadings`, `getRelatedPosts` call sites | 1 each, both in the post template (were 0). `addHeadingIds` already had 1, in `lib/blog.ts:16` |
| `dangerouslySetInnerHTML` on the post template | **8 raw grep hits, 5 real JSX sites** (`:192` post.schema, `:197` HowTo, `:213` FAQPage, `:273` body-before, `:277` body-after); the other 3 hits are the word inside comments at `:31`, `:102`, `:318`. The FAQ answers interpolate too, inside the kit `FaqSection html` branch. **No authored HTML became a text child** |
| capture surfaces on a post | **3**: `BlogSidebarCta` (an anchor, not a form), `InlineMiniLeadForm`, the closing `LeadCTAPanel` form. `<form>` element count = **2** (`MiniCapture.tsx` 1 + `LeadForm.tsx` 1, verified by grep) |
| `<nav aria-label="Table of contents">` per post | **1** (one mount) |
| `BreadcrumbList` per post | **1** - one `Breadcrumb` mount per route and no other file on these three routes builds one |
| `MiniCapture` prop signature | untouched. `InlineMiniLeadForm` still passes exactly `formId`, `messagePrefix`, `heading`, `blurb`, `submitLabel` |
| `lib/blog.ts` exported shape | unchanged - `getAllPosts`, `getPostBySlug`, `getRelatedPosts`, `slugifyCategory`, `getCategorySlug`, `getPostByCategoryAndSlug`, `getAllCategories`, `calculateReadTime`. W5's `getAllPosts` import is safe |

```
$ cd pharmacies/web && npx tsc --noEmit
$
```

```
$ cd pharmacies/web && npx vitest run
 Test Files  6 passed (6)
      Tests  40 passed (40)
   Duration  4.08s
```

### Link floors: measured BEFORE, derived AFTER

Measured on the **phase-1 build already running on :3111** (read-only `curl`; no server was started or stopped), method `curl -s <url> | grep -oE 'href="/[^"]*"' | sort -u | wc -l`. Every route is already **above** its `sweep_baseline.json` floor because phase 1's kit chrome lifted them.

| route | baseline floor | phase-1 build (measured) |
|---|---|---|
| `/blog` | 37 | **41** |
| `/blog/buying-a-pharmacy` | 17 | 21 |
| `/blog/nhs-contract-and-income` | 17 | 21 |
| `/blog/locum-pharmacists` | 13 | 17 |
| `/blog/selling-a-pharmacy` | 13 | 17 |
| `/blog/vat-and-retail-schemes` | 12 | 16 |

All 22 posts measured on the same build: 18, 20, 18, 26, 18, 18, 21, 27, 18, 19, 18, 21, 23, 19, 20, 26, 18, 20, 18, 26, 21, 19 (slug order as `ls content/blog`). Every one is at or above its baseline floor.

**Derived delta for the new build, with the derivation:**
- **Nothing is removed.** The breadcrumb publishes `/` and `/blog` and the category href, all three of which were already in the trail or the chrome, so no unique href is lost. `HubArticleList` keeps all 22 cards in the server HTML (it hides off-page cards with `hidden`, it does not slice), and the category pill row is kept intact on `/blog`.
- **Posts gain 0 to 3** unique `href="/blog/..."` from `RelatedArticles` (3 siblings where the category has 4+ posts, fewer in `vat-and-retail-schemes` which has 2). `#enquiry-form` is a fragment and is not counted by the `href="/` pattern.
- **`/blog` and the hubs: no change**, >= the numbers above.

**V1 must re-measure all 28 against the wave build**; these are the before-numbers to diff against.

---

## 10. Left for V1 (needs the build or the browser)

1. Re-measure all 28 link counts; confirm no route dropped and report the per-post delta.
2. `json.loads` every `ld+json` block on all 28 URLs. Post blocks are now up to 4: `BreadcrumbList` (new, from the kit `Breadcrumb`), `FAQPage`, `HowTo` (3 posts), and `post.schema` (never emits). `grep -c BreadcrumbList` on a served post URL must be **1, not 2**.
3. `grep -c '<form'` on a served post = **2**.
4. `browser_check` `anchorGaps` must still be **`[]`**. The TOC now links 7 to 16 anchors per post; they resolve through the `.prose [id] { scroll-margin-top: 6rem }` rule kept verbatim at the end of the article column.
5. Measure the `FaqSection` accordion trigger's focus ring on the post FAQ ground (K3: `accordion.tsx` may hardcode `outline-primary-600`, which a call site cannot override). 22 new pages now carry it.
6. Measure `BlogSidebarCta`'s `bg-slate-900` card and the `LeadCTAPanel` navy band for the `--grounds` darkOnDark delta on 28 routes (baseline 64, brief §F item 8: delta only).
7. V30: with JS off, confirm whether the FAQ answers are visible. **Expected FAIL until the manager applies K4's `<noscript>` line** (D3 above).
8. Confirm the `ReadingProgress` bar over the header at 390 and 1280 (D1) and that horizontal overflow stays 0 at all four widths with the new two-column grid.
9. Confirm the closing `LeadCTAPanel` goes full-bleed on all 28 routes: the panel is a sibling of the container `div`, not a child of it, which is what lets it bleed. A reviewer who expects it inside the article column will read the width as a defect.

---

## 11. Owner questions this package raises (one line each, nothing blocked)

1. **The new FAQ heading on 22 posts.** The FAQs existed only as invisible structured data; they are now a visible accordion headed "Frequently asked questions", the shared component's own label. Keep it, rename it, or drop the section? **We recommend keeping it:** it is the same answers the schema already claimed.
2. **Per-category blog CTA copy: not authored**, per your 2026-10-07 decision. All five categories share the one config triple. No five-key map was written, because five identical values is not a map; if you want per-category copy later it becomes a one-line lookup.
