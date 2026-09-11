# SOLICITORS DESIGN PORT - PHASE 2 BUILD PLAN (blog subsystem)

Written 2026-09-11, read-only planning pass. Authority for this phase.
Scope as approved: the post renderer (196 pages), the /blog index and its list projection,
and a content data sweep. Category hubs (the 10 derived + the 7 hand-built) are PHASE 3 and
are OUT OF SCOPE here. That split is correct: the hubs move to kit `BlogCategoryHub` and
carry their own briefing prose, which is a different job from the renderer, and the two
touch disjoint files.

Every number below was re-derived against disk on 2026-09-11 with the command shown.
Where this contradicts `DISPOSITION_SLICE1.md` or the phase-2 brief, this file is right and
the deriving command is given so the builder can re-check rather than trust it.

---

## 0. CORRECTIONS TO THE BRIEF (verified, act on these)

**0.1 The `schema:` bypass fires on ZERO pages. There is no T17 defect to fix.**
181 of 196 posts carry both a `schema:` key and `faqs:`, but every one of those 181
`schema:` values is the EMPTY STRING, so `post.schema?.trim() || buildBlogPostingJsonLd(...)`
at `BlogPostRenderer.tsx:50-52` always falls through to the builder. The nested `FAQPage`
(`src/lib/schema.ts:66-81`) is LIVE on all 196 posts, not dead code.
Deriving command: `grep -h "^schema:" Solicitors/web/content/blog/*.md | sort | uniq -c`
gives `127 schema: ""` and `54 schema: ''`, nothing else.
CONSEQUENCE: do NOT "always append the FAQ schema". That would emit a second FAQPage next to
the one already inside the builder's array on every post. The correct action is the cheap
guard the brief called unshippable: assert no post ships a NON-EMPTY `schema` alongside
`faqs`. It passes today (0 offenders) and it bites the day someone pastes a custom schema in.

**0.2 `/blog` does NOT render the 17 categories twice.**
`src/components/blog/BlogListWithSearch.tsx` destructures `categories` and `activeCategory`
at `:19,21` and never reads either (`grep -n "categories\|activeCategory"` returns only the
type and the destructure). It is the same dead-prop shape as the kit component. The category
card grid at `app/blog/page.tsx:51-74` is the only category list on the page, it carries 17
unique internal links, and it must NOT be deleted: the /blog floor is 40.

**0.3 The dead links are NOT all in `content/blog/*.md`.**
Nine unique dead URLs, ten occurrences, across TWO files. Six of the seven two-segment links
live in `content/solicitor-guides/legal-aid-billing-laa-ccms.md`. Full table in WP-C.

**0.4 FAQ answers containing HTML: 4 of 1,242, not 7 of 1,245.**
Deriving method: parse each post's frontmatter, count `faqs[].answer` matching `<[a-zA-Z/]`.
The FAQ decision is unchanged and stands: keep the local `<dl>` at
`BlogPostRenderer.tsx:254-268`. The kit `primitives/FaqSection.tsx` escapes answers (`:38`)
and its Radix collapsible keeps closed answers out of the server HTML.

**0.5 Tailwind `@source` friction does not exist.** Phase 1 already wired
`@source "../../../../packages/web-shared";` at `src/app/globals.css:3`, and
`tw-animate-css` + `lucide-react` are already declared in `Solicitors/web/package.json`.
Phase 2 introduces NO new third-party import. The closure check still runs in every package.

**0.6 A live locked-rule breach sits inside this phase's files.**
`src/components/blog/InlineMiniLeadForm.tsx:20` promises "will reply within one working day".
That is a TURNAROUND PROMISE on every post that takes the moment-3 fallback. WP-A fixes it.
A second instance at `src/components/forms/LeadForm.tsx:185` ("We will come back within one
working day") is site-wide and shared with phases 4, 5 and 6: MANAGER-DIRECT one-line fix,
not in any package here, or it collides.

**0.7 `getRelatedPosts` is latent, confirmed.** `src/lib/blog.ts:95` compares the RAW
`category` label and its only caller passes the raw label
(`src/app/blog/[category]/[slug]/page.tsx:67`). There are exactly 17 distinct raw labels for
17 slugs (`grep -h "^category:" content/blog/*.md | sort | uniq -c` returns 17 rows), so it
cannot misfire today. Guard test, not a fix.

---

## 1. REALITY CHECK PER SURFACE

| Surface | Files | Pages | Already satisfies the standard | Needs work |
|---|---|---|---|---|
| Blog post | `src/components/blog/BlogPostRenderer.tsx` (332 lines) + `src/app/blog/[category]/[slug]/page.tsx` (76, data only) | 196 | Grid skeleton `max-w-4xl mx-auto lg:max-w-7xl lg:grid lg:grid-cols-[1fr_250px] lg:gap-12` (`:152`) is already Property's F.3 shape. The 3-moment injection at `:207-252` is AHEAD of Property. `post.faqs` already feeds both the `<dl>` and the schema from one array (T17 satisfied). The breadcrumb trail and its category href are already keyed on `categorySlug` (`:97-105`). | 420-520px blurred-image hero replaced by the F.3 header card; no `#enquiry-form` anchor and nothing can scroll to the ask; one generic CTA for 17 categories; no sidebar CTA; no height clamp on the sticky TOC; no `data-cta` anywhere; `rounded-2xl` / `border-2` / `--primary` var-theming instead of ramp classes; no aside CTA rewriting; a turnaround promise |
| /blog index | `src/app/blog/page.tsx` (83) + `src/components/blog/BlogListWithSearch.tsx` (205) | 1 | Search, sort and 12-per-page paging all work. The category card grid carries all 17 hubs. | `contentNarrow` clamp instead of `siteContainerLg`; no hero, no motif, no CTA, no closing ask (DS 0.5); `font-serif` on the h1 and every card title; `{...p}` spread puts 196 `contentHtml` bodies across the client boundary (`:25-28`) |
| Category hubs | `src/app/blog/[category]/page.tsx` + 7 hand-built | 17 | n/a | PHASE 3. The ONLY thing phase 2 touches in `[category]/page.tsx` is the same payload projection (3 lines), because WP-B narrows the shared prop type |
| Content data | `content/blog/*.md` (196), `content/solicitor-guides/*.md` (10) | n/a | 17 categories map one-to-one to 17 slugs; every post has a `summary` | 9 dead internal links; 4 em-dashes in frontmatter fields that reach users |

**Smallest edit points.** One renderer file serves all 196 post pages: 1 edit, not 196.
One page file plus one list component serves /blog: 2 edits. The 17 category CTA variants
are 1 new data file, not 17. The only genuinely per-file work in this phase is the data
sweep, and that is 2 files for the links and 4 for the em-dashes.

---

## 2. LINK AND DASH FLOORS

Authority: `docs/solicitors/_port/link_baseline.json`, sha
`18b4f25f39cd0c4aa084e582d69a87c8a10710ac`, captured 2026-09-10T18:57:53Z at `--sample=9999`.

| Route set | Link floor | Dash ceiling |
|---|---|---|
| `/blog` | **40** unique internal links | recorded **0**, not trustworthy on this route, see R3 |
| 196 post routes | per route: **min 16**, median 20, **max 27**. The min is `/blog/trainee-paralegal-tax/how-much-do-trainee-solicitors-earn-uk-2025-26` | 22 of 196 non-zero; max 24 at `/blog/partnership-llp-structure/how-much-does-it-cost-to-buy-into-uk-law-firm-partnership` |
| `/blog/practice-finance-cash-flow/law-firm-survival-rates-uk-ons-data` (WP-C) | 24 | 0 |
| `/blog/structure-incorporation/uk-law-firm-structure-shift-partnership-to-incorporated-2011-2026` (WP-C) | 23 | 0 |
| `/solicitor-guides/legal-aid-billing-laa-ccms` (WP-C) | 20 | 0 |
| 17 hub routes (context only, PHASE 3) | 15 to 37 | - |

Read your own route's floor with:

```
python -c "import json;b=json.load(open('docs/solicitors/_port/link_baseline.json'));print(b['links']['<ROUTE>'], b['dashes'].get('<ROUTE>',0))"
```

`data-cta` baseline on blog routes is 2 or 3 per page, all from the chrome plus `next_step`.
Every id this phase adds is NET-NEW (`blog_skip_to_form`, `blog_sidebar_book`,
`blog_hero_book`, `blog_calculators_all`), so nothing in `vw_cta_performance` can be split.
Existing ids `next_step`, `header-book-call`, `mobile-menu-book-call`,
`header_nav_secondary` and the StickyCTA ids are FROZEN: same id, same
`data-cta-placement`, same `data-cta-goal`, or the series splits (playbook T22).

---

## 3. WORK PACKAGES

Three packages, disjoint file sets, all three run in PARALLEL. One manager-direct pre-req
(3.0) that blocks nothing.

### 3.0 MANAGER-DIRECT, NOT A PACKAGE

`packages/web-shared/design/blog/BlogSidebarCta.tsx:29` hardcodes `bg-primary-600` /
`hover:bg-primary-700` / `active:bg-primary-800`. On Solicitors that renders rose-600
`#e11d48`, a visibly different red from the brand crimson `#c41e3a` every other button uses,
which is the exact "two reds" the owner ruled on for the header on 2026-09-11.
Fix, additive and Property-preserving, one line, the same idiom the kit already uses at
`packages/web-shared/design/layout-utils.ts:31`:
`bg-[var(--btn-ground,var(--color-primary-600))]`,
`hover:bg-[var(--btn-ground-hover,var(--color-primary-700))]`,
`active:bg-[var(--btn-ground-active,var(--color-primary-800))]`.
Property declares none of the three tokens, so it falls back to today behaviour exactly.
Record it in playbook section 8 item 11 in the same commit. If the manager declines, WP-A
ships the kit component as-is and the deviation goes in `DESIGN_DELTA.md` section 3.

---

### WP-A: the post renderer (196 pages)

**Files you own, and nothing else:**

- `Solicitors/web/src/components/blog/BlogPostRenderer.tsx` (rewrite in place)
- `Solicitors/web/src/lib/blog-category-copy.ts` (NEW)
- `Solicitors/web/src/components/blog/InlineMiniLeadForm.tsx` (copy fix only)
- `Solicitors/web/src/components/blog/AuthorByline.tsx` (DELETE; zero importers once the
  renderer stops importing it, verified by grep)
- `Solicitors/web/src/tests/blog-post-binding.test.ts` (NEW guard)
- `Solicitors/web/src/app/globals.css`, for the two `.aside-cta` selectors ONLY (item 10)

**OFF LIMITS** (other packages and later phases): `src/app/blog/page.tsx`,
`src/components/blog/BlogListWithSearch.tsx`, `src/app/blog/[category]/page.tsx` (WP-B);
everything under `content/` and `src/tests/no-em-dash.test.ts` (WP-C);
`src/components/forms/LeadForm.tsx` (manager-direct); `packages/web-shared/**` (manager
carve-out); the seven hand-built hub pages under `src/app/blog/<slug>/page.tsx` (phase 3);
`src/components/ui/StickyCTA.tsx`; `src/components/blog/ExitIntentModal.tsx` (phase 6).

**Port from `Property/web/src/components/blog/BlogPostRenderer.tsx`:**

- `:43-92` `CTA_BY_CATEGORY`, keyed on the category SLUG. The comment there records the
  57-posts-wrong-CTA incident that raw-label keying caused. Ours moves to its own file.
- `:101-107` `decorateAsides`, verbatim.
- `:147-160` the `isPackagesMode` bypass and the `getActiveCta(niche).blog.*` fallback.
- `:175-245` breadcrumb, header card, meta pills, summary, skip link.
- `:246-260` mobile TOC, then the optional image as a plain `<img>` inside the column.
- `:261-300` body and tiered injection. OUR control flow at `BlogPostRenderer.tsx:207-252`
  is ahead of Property. Port the STYLING, keep our flow and our `ResourceGate` call.
- `:302-327` the `#enquiry-form` navy section with `scroll-mt-24`, the backdrop, and the
  white card holding `LeadForm redirectOnSuccess={false}`.
- `:348-376` the author / reviewer aside.
- `:378-394` `RelatedArticles`.
- `:404-410` the single sticky sidebar wrapper holding `BlogSidebarCta` then
  `TableOfContents`.

**In-repo consumption pattern to copy:**
`generalist/web/src/components/blog/BlogPostRenderer.tsx:1-40` for the kit import block (it
is the finished port of this exact file), and
`Solicitors/web/src/components/layout/PageShell.tsx` (phase 1) for how this site wires kit
props and comments a preserved analytics value.

**Spec:** `PROPERTY_STANDARD_ROLLOUT.md` F.3; `docs/property/DESIGN_SYSTEM.md` 0.1, 0.5,
0.6, 0.8, 2, 4b, 7; `DISPOSITION_SLICE1.md` C.1 items 1-15 (hypothesis, corrected above).

**Do exactly this:**

1. Delete the 420-520px blurred-image hero (`:79-149`). It is not in F.3 and it is the
   only photographic header on the site. Where a post has an image it becomes the in-column
   `<img className="mt-10 w-full rounded-xl ..." width={1200} height={630}>` per Property
   `:250-259`. The photographer credit at `:126-148` MOVES with it as a
   `<p className="mt-2 text-xs text-slate-500">` under the image: those are followed
   `rel="noopener nofollow"` outbound links that must not be silently dropped, and
   `text-slate-400/80` fails contrast anyway (slate-400 on white = 2.56).
2. Header card per F.3: `rounded-xl bg-slate-50 p-8 mt-6`, kit `Eyebrow` carrying the
   category, h1, meta pills, `summary` at `text-base leading-7 text-slate-600`. OUR field is
   `post.updatedDate`, NOT Property `post.dateModified`, so the Updated pill condition is
   `post.updatedDate && post.updatedDate !== post.date`. Pills use `lucide-react`
   `CalendarDays / History / UserRound / Clock`, already a declared dependency. The tinted
   Updated pill takes the brand, not emerald: `bg-rose-50 text-rose-700 ring-1 ring-rose-100`
   (rose-700 on white = 6.29, DESIGN_DELTA section 2).
3. Skip link inside the header card, attributes verbatim: `href="#enquiry-form"`,
   `data-cta="blog_skip_to_form"`, `data-cta-placement="article_header"`,
   `data-cta-goal="form"`, label "Skip to enquiry form" with a trailing down-arrow glyph.
   Net-new id, no live series. Do NOT keep the `:162-170` "book a call" sentence that leaves
   the page for `/contact`: DS 0.5 says only the header CTA and the sticky banner leave.
4. Keep the TL;DR / key-takeaways block (`:172-198`), restyled off `--primary` var-theming to
   `rounded-xl bg-slate-50 ring-1 ring-slate-200/70` with a brand left rule.
5. Keep the local `<dl>` FAQ (`:254-268`) including the `dangerouslySetInnerHTML` answer. Do
   NOT import kit `FaqSection`. Restyle each item to
   `rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70`. One array, two consumers, unchanged.
6. `#enquiry-form`: new
   `<section id="enquiry-form" className="relative mt-16 overflow-hidden rounded-xl bg-slate-900 p-8 sm:p-10 text-white scroll-mt-24" aria-labelledby="enquiry-form-heading">`
   with `<SolicitorsBackdrop tone="navy" />`
   (`src/components/layout/SolicitorsBackdrop.tsx`, built in phase 1) and the LeadForm in a
   white `rounded-xl bg-white p-6 sm:p-8` card. This REPLACES the gradient card at `:288-298`,
   which has no id, no `scroll-mt-24` and no `aria-labelledby`, so nothing on the page can
   link or scroll to the ask today.
7. `src/lib/blog-category-copy.ts` exports
   `BLOG_CATEGORY_COPY: Record<string, { heading: string; body: string; button: string }>`
   with EXACTLY 17 keys, the output of `slugifyCategory`. THE FILENAME AND EXPORT NAME ARE
   FIXED: `src/tests/blog-category-copy.test.ts:38-48` already imports
   `../lib/blog-category-copy` and reads `BLOG_CATEGORY_COPY`, and arms itself the moment the
   module lands. The disposition names (`blog-cta.ts` / `CTA_BY_CATEGORY`) would leave that
   guard dormant for ever. The 17 keys are: `practice-finance-cash-flow`, `vat-compliance`,
   `sra-compliance-trust-accounting`, `partnership-llp-structure`, `practice-succession-sale`,
   `partnership-llp-accounting`, `sra-accounts-rules`, `conveyancing-compliance`,
   `compliance-risk-colp-cofa`, `practice-accounting`, `structure-incorporation`,
   `fee-earner-tax-compensation`, `professional-indemnity`, `firm-acquisition-merger`,
   `locum-solicitor-tax`, `sole-practitioner-tax`, `trainee-paralegal-tax`.
   Resolution order per Property `:147-160`: packages mode gives `getActiveCta(niche).blog.*`;
   otherwise `BLOG_CATEGORY_COPY[categorySlug]` with the same `getActiveCta` fallback.
   COPY RULES BIND HERE: no fee for our services and no comparative fee claim, no turnaround
   promise, no client-count or aggregate-performance claim, no "most firms qualify", British
   English, NO EM-DASHES, every figure re-derivable from `docs/solicitors/house_positions.md`.
   Return all 17 entries in full in your receipt for manager fact-QA.
8. Feed `BlogSidebarCta copy={ctaCopy}` from the SAME object as the `#enquiry-form` heading,
   inside one `sticky top-24 max-h-[calc(100vh-7rem)] space-y-5 overflow-y-auto` wrapper.
   Today `:322-326` is `sticky top-24` with no clamp, so a long TOC scrolls off the bottom of
   the viewport with no way back. Repoint `TableOfContents` and `ReadingProgress` from
   `@accounting-network/web-shared/content/*` to
   `@accounting-network/web-shared/design/blog/*` (the kit-themed copies).
9. Related articles: kit `RelatedArticles`, items
   `{ href: "/blog/" + r.categorySlug + "/" + r.slug, title: r.title, excerpt: r.summary }`.
   `excerpt` is the frontmatter `summary`: this site has NO `firstSentence` helper and must
   not grow one (`src/tests/summary-quality.test.ts:1-18` records why). Keep three cards, so
   the three links are unchanged.
10. Run `decorateAsides` on `post.contentHtml` before every split, per Property `:101-107`
    and `:115`. `.aside-cta` / `.aside-cta-row` do not exist in `src/app/globals.css` today;
    add exactly those two selectors beside the existing `.article-body.prose-blog` rules at
    `:313-380`, using ramp classes and the `--btn-ground` trio, no hardcoded hex.
11. `InlineMiniLeadForm.tsx:20`: delete "will reply within one working day". The replacement
    makes no timing claim at all.
12. `NextStepOffer` at `:286` renders a second closing ask immediately before the enquiry
    form: two consecutive asks. It carries the LIVE `next_step` id. DO NOT DELETE IT and do
    not change its id, placement or goal. MOVE it above the FAQ section (playbook open item
    11, the cheaper of the two owner options) and report the move.
13. Every `font-serif` class in the files you own goes (DESIGN_DELTA font row, trap T26). No
    hardcoded hex. Colour comes from `rose-*` / `slate-*` ramp classes and the `--btn-ground`
    trio, never `text-[var(--primary)]` arbitrary values: those defeat the contrast
    instrument (field notes 5, trap T25).

**Acceptance tests. Run each, report the command and its decisive output line:**

- `python scripts/check_dependency_closure.py` returns OK across 19 sites. This package adds
  NO new third-party import; if you find you need one, it is declared in
  `Solicitors/web/package.json` in the SAME change (trap T24).
- `cd Solicitors/web && npx tsc --noEmit` clean.
- `cd Solicitors/web && npm test` GREEN, counts verbatim, and `blog category copy coverage`
  now reports the ARMED path (17 of 17 keys, zero orphans), not the dormant one.
- New `src/tests/blog-post-binding.test.ts`, calling the REAL functions and never a local
  copy (trap T9), asserts against the live corpus via `getAllPosts()`:
  (a) no post has a non-empty `schema` AND a non-empty `faqs` (0 offenders today, see 0.1);
  (b) `buildBlogPostingJsonLd` emits exactly ONE `FAQPage` object for a post with faqs and
  its `mainEntity` length equals `post.faqs.length` (one binding, two consumers, T17);
  (c) `slugifyCategory` is injective over `getAllCategories()` (17 labels to 17 slugs), with
  `src/lib/blog.ts:95` named in the failure message, so the latent raw-label comparison in
  `getRelatedPosts` fails loudly the day a second spelling of a category lands.
- `grep -n "data-cta" src/components/blog/BlogPostRenderer.tsx` shows `blog_skip_to_form`
  with `article_header` and `form`; `grep -n "data-cta" src/components/intent/NextStepOffer.tsx`
  shows `next_step` with its id, placement and goal unchanged.
- `grep -nE "font-serif|rounded-2xl|border-2|#[0-9a-fA-F]{6}" src/components/blog/BlogPostRenderer.tsx`
  returns nothing.
- `grep -rniE "within [a-z0-9]+ (hour|working day)|same.day" src/components/blog/` returns
  nothing.
- LINK FLOOR: post routes are per route, min 16, median 20, max 27. You remove the in-body
  `/contact` sentence and add no page link, so state the delta by counting the unique
  `href="/..."` set the renderer emits, before and after, on the MIN route
  `/blog/trainee-paralegal-tax/how-much-do-trainee-solicitors-earn-uk-2025-26` (floor 16).
  `/contact` and `/about` are both already in the chrome, so removing an in-body link to
  either costs ZERO unique links (trap T14). If any count is short, add genuinely useful
  links; never pad with duplicates.

---

### WP-B: /blog index, the list projection, and the hub payload

**Files you own, and nothing else:**

- `Solicitors/web/src/app/blog/page.tsx` (rewrite)
- `Solicitors/web/src/components/blog/BlogListWithSearch.tsx` (becomes a thin projected
  wrapper over the kit list, or is deleted and the kit list imported directly)
- `Solicitors/web/src/app/blog/[category]/page.tsx`, PROJECTION LINES ONLY (`:71-74` plus the
  `readTimes` loop). Nothing else in that file: phase 3 owns it.

**OFF LIMITS:** `src/components/blog/BlogPostRenderer.tsx`, `src/lib/blog-category-copy.ts`,
`src/components/blog/InlineMiniLeadForm.tsx`, `src/components/blog/AuthorByline.tsx`,
`src/tests/blog-post-binding.test.ts`, `src/app/globals.css` (WP-A); everything under
`content/` and `src/tests/no-em-dash.test.ts` (WP-C); the seven hand-built hubs;
`packages/web-shared/**`; `src/components/forms/LeadForm.tsx` (manager-direct).

**Port from `Property/web/src/app/blog/page.tsx`:**

- `:88-104` the PROJECTION, with the comment recording the FALLBACK_BODY_TOO_LARGE incident.
  This is the load-bearing part of the package.
- `:112-142` the cream hero: `heroCreamSurface`, backdrop (ours is
  `<SolicitorsBackdrop tone="cream" />`), breadcrumb, h1, standfirst in `max-w-3xl`, CTA row.
- `:190-225` the Browse-by-topic category card grid: `rounded-xl border border-slate-200
  bg-white p-6` on a `bg-slate-50` section (card ground opposite the section ground, DS 0.1).
- `:228-238` the archive section wrapping `BlogListWithSearch`.
- `:245-262` the closing `<div id="book" className="scroll-mt-24">` plus `LeadCTAPanel`.
- `:264-292` the calculator bridge, as the LIGHT band between the navy panel and the navy
  footer (DS 0.1: navy never touches navy).

**In-repo consumption pattern to copy:** `generalist/web/src/app/blog/page.tsx:41-60` (the
projection and the `readTimes` map, the finished port of this exact page) and its kit import
block at `:12-22`.

**Spec:** `PROPERTY_STANDARD_ROLLOUT.md` appendix E (BlogListWithSearch, HubArticleList) and
F.4; `docs/property/DESIGN_SYSTEM.md` 0.1, 0.5, 0.6, 4e, 9.

**Do exactly this:**

1. PROJECT before the client boundary. Today `:25-28` spreads `{...p, categorySlug}` for 196
   posts, so every `contentHtml` body is serialised into the RSC flight payload. Project to
   exactly `{ slug, title, summary, category, categorySlug, date }` and pass read times
   separately as the precomputed `Map` the list already takes. The kit `BlogListItem` type
   (`packages/web-shared/design/blog/BlogListWithSearch.tsx:16-23`) is that shape exactly.
2. Adopt the kit `BlogListWithSearch`. It ignores `categories` and `activeCategory`
   (`:36,38`), exactly as the local one does today (see correction 0.2), so nothing is lost.
   Prefer importing the kit component directly and DELETING the local 205-line file; keep a
   local wrapper only if the `[category]` page needs a different prop shape. The kit list
   slices (`:91`). KEEP THE SLICE on this route: Property own `/blog` slices
   (`Property/web/src/components/blog/BlogListWithSearch.tsx:84`), and the hide-never-slice
   rule (DS 0.6, `HubArticleList`) is aimed at the HUBS, which are the crawl path to the
   corpus and are phase 3. Do not fork the kit list.
3. Do NOT delete the 17 category cards. They are 17 of the 40 unique links on this route.
   Restyle only: `min-h-[120px] rounded-xl border-2` becomes the card recipe above, with the
   card ground opposite its section.
4. Replace `contentNarrow` with `siteContainerLg` per section (DS 0.1: the container IS the
   measure; the only narrow measure is hero copy at `max-w-3xl`).
5. Grounds oscillate and are set explicitly per section: cream hero, then slate-50 topic
   cards, then white archive, then the navy `LeadCTAPanel`, then the slate-50 calculator
   bridge, then the navy footer. Two touching sections never share a ground.
6. Add the closing ask. `/blog` today ends on pagination with no ask at all, which DS 0.5
   calls half-built. Use kit `marketing/LeadCTAPanel` with
   `backdrop={<SolicitorsBackdrop tone="navy" />}`,
   `form={<LeadForm redirectOnSuccess={false} />}` and SOLICITORS `proofPoints`: the kit
   defaults are Property (`BlogCategoryHub.tsx:20-24` is the same trap), so pass ours.
   PROOF-POINT COPY RULES: no fee, no turnaround, no client count, no aggregate-performance
   claim, British English, no em-dashes. Return the copy in full for fact-QA. See risk R1.
7. Net-new `data-cta` ids only: `blog_hero_book` (`#book`, placement `hero`, goal `form`) and
   `blog_calculators_all` (`/calculators`, placement `calculator_bridge`). Optionally
   `blog_hero_guides` to `/solicitor-guides`. No existing id, placement or goal changes
   anywhere (trap T22).
8. `[category]/page.tsx`: apply the SAME projection to `enriched` at `:71-74`, because the
   shared prop type narrows AND because that spread is the identical payload defect on 10
   more live routes. Change nothing else in that file.
9. All `font-serif` in these files goes. No hardcoded hex, no `--primary` arbitrary values.

**Acceptance tests:**

- `python scripts/check_dependency_closure.py` returns OK. No new third-party import is
  expected; if one appears it is declared in `Solicitors/web/package.json` in the same change.
- `npx tsc --noEmit` clean; `npm test` GREEN, counts verbatim.
- `grep -n "contentHtml" src/app/blog/page.tsx "src/app/blog/[category]/page.tsx"` shows
  `contentHtml` only inside `calculateReadTime(...)` on the server, never inside an object
  handed to a `"use client"` component.
- `grep -nE "font-serif|contentNarrow" src/app/blog/page.tsx` returns nothing.
- LINK FLOOR `/blog` = 40. Derive the count, do not estimate: count the unique `href="/..."`
  literals the page can emit (17 category cards, 12 visible article cards, hero and bridge
  links, chrome) and show your working. Expect a large increase, never a decrease.
- DASH: the recorded ceiling for `/blog` is 0 and the live pre-port page returns 149, because
  the client payload inlines 196 summaries. Your projection removes the bodies and keeps the
  summaries, and exactly ONE summary in the corpus contains an em-dash
  (`content/blog/how-much-do-uk-solicitors-charge-per-hour.md:13`, removed by WP-C). State
  your post-change count and flag it to the manager rather than reporting 0 as met.

---

### WP-C: the content data sweep

**Files you own, and nothing else:** the two content files named in C1, the four named in
C2, and `Solicitors/web/src/tests/no-em-dash.test.ts` (ratchet numbers only).

**OFF LIMITS:** every `.ts` and `.tsx` file in `src/` except that one test. All post BODIES
beyond the two link fixes named below: the 150 body em-dashes are PHASE 6.

**Spec:** playbook section 7 (locked content rules), field notes section 6 (dead links: fix
at the link or the target, never by deleting the link), DS 0.6.

**C1. Nine dead internal links, ten occurrences, two files.** Derivation: resolve every
`/blog/...` URL in `content/` against the `{slug -> slugifyCategory(category)}` map built
from all 196 posts; a one-segment URL is valid only if it is one of the 17 category slugs.

`content/solicitor-guides/legal-aid-billing-laa-ccms.md` (route floor 20), six unique URLs,
seven occurrences:

| line(s) | current href | correct href |
|---|---|---|
| 33, 166 | `/blog/legal-aid-laa-work-vat-and-cash-flow` | `/blog/vat-compliance/legal-aid-laa-work-vat-and-cash-flow` |
| 140 | `/blog/client-money-accounting-solicitors` | `/blog/sra-compliance-trust-accounting/client-money-accounting-solicitors` |
| 140 | `/blog/cofa-monthly-checklist-uk-law-firms` | `/blog/compliance-risk-colp-cofa/cofa-monthly-checklist-uk-law-firms` |
| 140 | `/blog/billing-discipline-end-of-quarter-uk-law-firms` | `/blog/practice-accounting/billing-discipline-end-of-quarter-uk-law-firms` |
| 140 | `/blog/client-account-handling-residential-conveyancing` | `/blog/sra-accounts-rules/client-account-handling-residential-conveyancing` |
| 140 | `/blog/common-sra-accounts-rules-breaches-and-how-to-fix` | `/blog/sra-accounts-rules/common-sra-accounts-rules-breaches-and-how-to-fix` |

`content/blog/law-firm-survival-rates-uk-ons-data.md:134` (route floor 24):
`/blog/law-firm-lock-up-reduction` becomes
`/blog/practice-finance-cash-flow/law-firm-lock-up-reduction`.

`content/blog/uk-law-firm-structure-shift-partnership-to-incorporated-2011-2026.md`
(route floor 23), two wrong category segments, `structure-incorporation` becomes
`partnership-llp-structure`:
`:179` `salaried-member-rules-uk-llps-explained`,
`:229` `llp-vs-traditional-partnership-uk-law-firms`.
The third link on `:229` (`service-company-structure-for-law-firms-tax-vat`) is CORRECT under
`structure-incorporation`. Do not touch it.

Anchor text stays exactly as written: curated anchor text carries topical equity (carve-out
5). Unique-link counts are unchanged by all ten edits, so no floor moves.

NOT a dead link, do not fix and do not delete: `src/lib/leads/dossier.ts` and
`src/tests/lead-dossier.test.ts` mention `/blog/cgt-on-selling-rental-property`, a Property
slug used as fixture data in a lead-routing test. It renders nowhere.

**C2. Four em-dashes in frontmatter fields that reach users.** `metaTitle` count is 0,
verified. The four are:

- `content/blog/how-much-do-uk-solicitors-charge-per-hour.md:13` `summary:`. This one RENDERS,
  on `/blog` and on every card that quotes it, and it is the single dash WP-B would otherwise
  add to the /blog page.
- `content/blog/law-firm-accounting-services.md:10` `metaDescription:`
- `content/blog/solicitor-practice-finance-options.md:9` `metaDescription:`
- `content/solicitor-guides/fee-share-vs-equity-partner.md:5` `metaDescription:`

Replace with a comma, a colon, a full stop or a restructured clause, whichever reads best;
never with an en-dash or a spaced hyphen. British English. The meaning must not change:
these are search snippets. Report each before and after line in full.

**C3. Ratchet the guard down in the same change** (`src/tests/no-em-dash.test.ts:33-35`):
`MAX_FRONTMATTER` 3 to **0**, `MAX_CONTENT` 247 to **246**. `MAX_SRC` is not yours. These
numbers only ever move down. Re-derive both before setting them:
`cd Solicitors/web && npx vitest run src/tests/no-em-dash.test.ts`.

**Acceptance tests:**

- `python scripts/check_dependency_closure.py` returns OK (no import changes; run it anyway).
- `cd Solicitors/web && npm test` GREEN with the lowered ratchets, counts verbatim.
- Re-run the link resolver and show zero unresolved: every `/blog/<a>/<b>` in `content/`
  resolves to a real post whose `slugifyCategory(category)` equals `<a>`, and every
  `/blog/<a>` is one of the 17 category slugs.
- `npx tsc --noEmit` clean. Frontmatter is parsed at build time and a broken YAML quote here
  fails the whole site through `assertFrontmatter` (`src/lib/blog.ts:14`).
- LINK FLOORS, all three unchanged by design, state the unique-href count per file:
  `/solicitor-guides/legal-aid-billing-laa-ccms` = 20,
  `/blog/practice-finance-cash-flow/law-firm-survival-rates-uk-ons-data` = 24,
  `/blog/structure-incorporation/uk-law-firm-structure-shift-partnership-to-incorporated-2011-2026` = 23.

---

## 4. SEQUENCING AND DEPENDENCIES

- **WP-A, WP-B and WP-C are mutually disjoint and run in PARALLEL**: one message, three tool
  calls. No package imports a file another package creates.
- **3.0 (kit `BlogSidebarCta`) is manager-direct and blocks nothing.** If it lands first WP-A
  gets the brand button for free; if it lands later it changes no Solicitors file.
- **WP-B touches `[category]/page.tsx` for the projection only.** Phase 3 rewrites that file
  onto `BlogCategoryHub`, so those three lines are throwaway. They are still worth it: they
  take the same multi-megabyte payload defect off 10 live hub routes now rather than at the
  end of phase 3, and without them the narrowed prop type fails `tsc`.
- **WP-C before the manager build**, because WP-B dash report is only meaningful once the one
  rendering summary em-dash is gone. If all three land in one build, order does not matter.
- **Manager, after all three:** the single serialised `next build`, then `next start`, then
  the crawl against `link_baseline.json`, then the sweep at `--sample=9999`. Read the bound
  port out of the server log and assert the served page title before trusting any crawl
  (field notes section 5: three wrong-site measurements in one session).
- **Then an INDEPENDENT adversarial review against the rendered DOM**, not the source. Name
  these suspicions: FAQ answers still present in the pre-hydration HTML on a sampled post; a
  single `FAQPage` object per post, not two; `scroll-mt-24` actually computed on
  `#enquiry-form`; the FULL `data-cta` attribute set diffed against the pre-port page, id AND
  placement AND goal (trap T22); the `/blog` payload size; and no `contentHtml` anywhere in
  the flight payload.

---

## 5. RISKS AND AMBIGUITIES, each with a recommended resolution

**R1. `LeadCTAPanel` on `/blog` is a NEW capture surface.** Appendix K approved "no new
interruptive surfaces, restyle only", with one named in-flow addition (the `/resources`
index). A closing panel on `/blog` is in-flow, not interruptive; DS 0.5 says a page a reader
can scroll to the bottom of without meeting an ask is not finished; and Property ships
exactly this on the same route.
RECOMMENDED: ship it, and name it in the phase-2 receipt to the owner as an IN-FLOW addition,
not an interruptive one. If he objects, removing the panel is a one-line revert and the route
keeps its hero CTA.

**R2. Authored copy is where the locked rules get broken.** Seventeen CTA variants plus a
panel, all written fresh. Property own `/blog` panel copy says "within 24 hours" and "fixed
fee in writing": BOTH are banned here, and the phase-0 sweep found four turnaround promises
already live on `/contact`.
RECOMMENDED: lift none of Property copy. Every string authored fresh against
`house_positions.md`, returned in full in the builder receipt, fact-QA'd by the manager
before the build. Opus only.

**R3. The `/blog` recorded dash ceiling of 0 is not a real floor.** The pre-port live page
returns 149 because the client payload inlines 196 summaries and the sweeper recorded 0.
After WP-B the number moves a long way DOWN for reasons unrelated to copy, which would mask a
real regression underneath it.
RECOMMENDED: the manager re-derives `/blog` (and `/about`, recorded 1 against a live 2)
against the phase-2 build and restates those two entries in `link_baseline.json` with a note,
rather than exempting the route from the gate.

**R4. Deleting the photographic hero changes what every post looks like above the fold**, on
196 pages, and the images are real assets carrying attribution.
RECOMMENDED: delete the hero and keep the image in-column with its credit (WP-A item 1). F.3
is explicit and the standard ships no photography in heroes. If the owner wants the
photography back, that is an in-column decision, not a hero one.

**R5. Two consecutive asks on every post** (`NextStepOffer`, then the enquiry form). The id is
LIVE, so deleting it needs a deploy-watch baseline restatement.
RECOMMENDED: move it above the FAQ (WP-A item 12) and leave the id alone. No analytics
consequence, and the owner can still retire it in phase 6 with a series read in hand.

**R6. The kit `BlogListWithSearch` slices, and DS 0.6 says paginate by hiding.** Property own
`/blog` slices too, and the hide rule exists for the HUBS, which are the crawl path to the
corpus.
RECOMMENDED: keep the slice on `/blog` (WP-B item 2) and hold the hide-never-slice rule for
phase 3 hubs, where `src/tests/hub-article-crawl-path.test.ts` already guards it, pointed at
the kit components. Do not fork the kit list for this.

**R7. `LeadForm.tsx:185` carries a turnaround promise and is shared with phases 4, 5 and 6.**
RECOMMENDED: manager-direct one-line fix outside all three packages. Do not let a builder
open that file in this phase.

**R8. `getActiveCta(niche)` is read at MODULE SCOPE** in the current renderer
(`BlogPostRenderer.tsx:11`) and in `PageShell.tsx:17`. Packages mode is not the active
variant, and its blog copy publishes our own prices ("Plans start at GBP49 a month").
RECOMMENDED: preserve the `isPackagesMode` bypass exactly as Property has it, change no
config, and record in the receipt that the packages variant would publish pricing if it were
ever switched on, as an owner item for the phase-6 pricing sweep.

**R9. `ExitIntentModal.tsx` has zero importers and is dead.** It belongs to the phase-6
interruptive stack, and appendix D.2 says never rebuild it.
RECOMMENDED: leave it alone in phase 2. It is not in any package file list.

**R10. The `font-serif` classes outside this phase (193 across 39 files at the phase-1 close).** The transitional
`font-serif` to sans mapping in `globals.css` stays until the count reaches zero (trap T26).
RECOMMENDED: each package deletes only the classes in its own files and nobody touches the
mapping line in phase 2. Report your post-change count so the manager can track it down.
