# P0-E: Crawl and Link Integrity — contractors-ir35/web (phase 0 baseline)

Derived from source only. No dev server started, no subagents used.
All internal hrefs pulled from `content/blog/**/*.md`, `src/app/glossary/[slug]/data.ts`,
`src/data/contractor-types.ts`, `src/lib/resources/*.ts`, `content/resources/*.md`,
and every `.tsx` under `src/`.

## 0. Brief mismatches (pushback)

- **Item 2 (redirect map) does not apply to this site.** There is no `middleware.ts`
  anywhere in `contractors-ir35/web` (`find . -iname "middleware*"` → no hits), no
  `next.config.ts` redirects block (`grep -i redirect next.config.ts` → no hits), and
  no `DUPLICATE_REDIRECTS`-style map anywhere in `src` (`grep -rln DUPLICATE_REDIRECTS src`
  → no hits) or in `vercel.json` (no `redirects` key). The only redirect in the whole
  app is a single in-page `permanentRedirect()` inside
  `src/app/blog/[category]/[slug]/page.tsx:68`, which self-corrects a wrong
  *category* segment to the post's real category (e.g. `/blog/wrong-cat/some-slug` →
  `/blog/right-cat/some-slug`). It is not a duplicate-content map, there is no
  slug that both 301s and still has a live `.md` on disk, and `getAllPosts()`
  (`src/lib/blog.ts:43`) reads every file in `content/blog/` unconditionally — so
  the "hub lists a redirected duplicate" failure mode this brief describes cannot
  occur here. Treat item 2 as N/A for this site; do not build a listing-surface
  filter for it, there is nothing to filter.
- Everything else in the brief checked out against source as written.

## 1. Dead internal links

Method: extracted every `href="..."` / `href={...}` occurrence from all 62
`content/blog/*.md` files, `src/app/glossary/[slug]/data.ts` (glossary bodies
contain HTML with internal `<a href>` links), `src/data/contractor-types.ts`,
`content/resources/*.md`, `src/lib/resources/*.ts`, and every `.tsx` under `src/`
(558 total href occurrences). Each href was resolved against:
- static routes = every non-dynamic `src/app/**/page.tsx` folder
- blog posts: `slug → categorySlug` map built the same way `src/lib/blog.ts`
  builds it (frontmatter `slug` + `slugifyCategory(category)`), so a `/blog/<cat>/<slug>`
  link is checked for both "does this post exist" AND "is it filed under this category"
- glossary slugs from `GLOSSARY_LIST` in `src/app/glossary/[slug]/data.ts`
- location slugs from `CITIES` in `src/app/locations/[slug]/data.ts`
- calculator slugs from the `slug:` field in each file under `src/lib/calculators/tools/*.ts`
  (the registry file itself doesn't declare slugs inline — they live in the tool
  modules it imports; a naive grep of `registry.ts` alone gives a false 0)
- `/for/<slug>` from `contractorTypes` in `src/data/contractor-types.ts`
- `/resources/<topic>` from the resource registry keys in `src/lib/resources/registry.ts`

**Command shape used:**
```
grep -noE 'href="(/[a-zA-Z0-9/_-]*)"' content/blog/*.md
grep -noE 'href="(/glossary/[a-z0-9-]+)"' "src/app/glossary/[slug]/data.ts"
grep -n "slug:" src/lib/calculators/tools/*.ts
```

### Result: exactly ONE dead link found, and it is not in the blog corpus

| File:line | href | Target status | Fix belongs at |
|---|---|---|---|
| `src/app/glossary/[slug]/data.ts:27` | `/blog/ir35-basics` | No blog post has slug `ir35-basics`, and no category slugifies to `ir35-basics`. Closest real target: `/blog/ir35-status/what-is-ir35`. | **The link** (in the glossary "ir35" entry body — `<a href="/blog/ir35-basics">IR35 basics</a>`). The target concept (a "what is IR35" primer) already exists at `/blog/ir35-status/what-is-ir35`; the glossary entry should point there. Do not delete the link — repoint it. |

This matches the brief's warning shape: the one dead link found is inside a
**glossary entry body**, not the blog directory itself — the brief's "check
outside the directory you expect" pattern held here too, just landing in
`glossary/[slug]/data.ts` rather than a guide.

Everything else checked out:
- All 200 internal `<a href="/glossary/...">` cross-links inside the 38 glossary
  entry bodies resolve to a real glossary slug — 0 missing.
- All `/calculators/<slug>` links (7 occurrences across 5 blog posts + 3 research
  pages) resolve to real tool slugs (`umbrella-take-home-calculator`,
  `outside-ir35-take-home-calculator`, `inside-ir35-take-home-calculator` all exist
  in `src/lib/calculators/tools/`).
- All `/admin/analytics/*` links are internal-auth-gated tooling, not
  customer-facing; each target route exists as a real `page.tsx`.
- No hardcoded `/locations/<slug>` or `/for/<slug>` links exist outside the
  data-driven index/detail pages themselves (those are always in sync with the
  data source by construction).
- 0 links from `content/blog/*.md` point at a wrong category segment for an
  otherwise-real post slug (the "6 of 7 two-segment links were actually in a
  guide" failure mode from the brief did not reproduce — `content/resources/*.md`
  has zero internal hrefs to check).

## 2. Redirect map vs corpus

**N/A — see pushback above.** No redirect/duplicate map exists in this codebase
to compare against the 62 files in `content/blog/`. The single in-app redirect
(`permanentRedirect` in `src/app/blog/[category]/[slug]/page.tsx:68`) redirects
wrong-category URLs to the same still-live post, and both `getAllPosts()` and
`getAllCategories()` (`src/lib/blog.ts`) read the full corpus directly from disk
with no exclusion list — so every listing surface and this redirect are
structurally incapable of drifting apart. Nothing to filter, nothing to list as
"unfiltered."

## 3. Index and hub crawlability

Method: read each index/hub component and its data source directly (no server
run). For a client component (`"use client"`), Next.js App Router still
server-renders it to HTML at build/request time with its initial state — so a
`useState` slice at its default value (e.g. `currentPage = 1`) IS what lands in
server HTML; only interaction past that point (a client `onClick`, not a
`<Link>`) is invisible to a crawler.

| Surface | Corpus count | Server-HTML count | Mechanism |
|---|---|---|---|
| `/blog` (`src/app/blog/page.tsx` → `BlogListWithSearch`) | 62 posts (`getAllPosts()`, all `.md` in `content/blog/`) | **12** | Full corpus passed as a client-component prop, then **sliced client-side** (`filteredAndSortedPosts.slice(startIndex, startIndex + 12)`) with `currentPage` state starting at 1. Pagination controls are `<button onClick={() => setCurrentPage(...)}>` (`BlogListWithSearch.tsx:176-192`), **not links** — a crawler landing on `/blog` sees only page 1, and there is no `?page=2`-style URL to discover the rest. Coverage ratio: **12/62 = 19.4%** — the worst on this site. |
| `/blog/[category]` (7 category pages, same `BlogListWithSearch`) | Per category: IR35 Status 17, Umbrella vs Limited Company 13, MTD and Compliance 9, Contractor Accounting Basics 7, Limited Company Tax 6, Pension and Dividends 5, Expenses and Deductions 5 | 12 for any category with >12 posts, else full | Same button-pagination mechanism as `/blog`. Only **IR35 Status** (17) and **Umbrella vs Limited Company** (13) exceed 12 and are therefore truncated in server HTML; the other 5 categories fully render. Worst per-category ratio: IR35 Status **12/17 = 70.6%**. |
| `/glossary` (`src/app/glossary/page.tsx`) | 38 entries (`GLOSSARY_LIST`) | 38 | Full render, grouped by category, no pagination at all. |
| `/locations` (`src/app/locations/page.tsx`) | 10 cities (`CITIES`) | 10 | Full render (10 "priority" cards + 0 "more" links since all 10 are in `PRIORITY_SLUGS`). |
| `/calculators` (`src/app/calculators/page.tsx`) | 10 tools (`allTools()`) | 10 | Full render, grouped by category, no pagination. |
| `/for` (`src/app/for/page.tsx`) | 10 contractor types (`contractorTypes`) | 10 | Full render, single grid, no pagination. |
| `/resources` | 3 guides on disk (`content/resources/ir35.md`, `pay-planning.md`, `structure.md`) | **no index page exists** (`src/app/resources/page.tsx` is absent — only `src/app/resources/[topic]/page.tsx`) | Not a slicing bug — there is genuinely no hub. The 3 topic pages are reachable only via `sitemap.ts` and contextual links from `CalculatorPageResources.tsx` / `ResourceGate.tsx`, never from an on-site index a crawler could discover by browsing. Flagging as informational: it means these 3 URLs depend entirely on the sitemap being crawled, not on internal link discovery. |

**Unfiltered vs filtered listing surfaces**, per item 2's method (moot here since
there is no redirect map, but confirmed by reading each surface's data source):
every one of the surfaces above reads directly from the raw source (`getAllPosts()`,
`GLOSSARY_LIST`, `CITIES`, `allTools()`, `contractorTypes`) with no exclusion
step, so none of them "filter a map" — there's nothing to filter, and nothing
here can list a redirected duplicate because none exist.

**Worst index coverage ratio: `/blog` at 12/62 = 19.4%** — same failure shape as
the cited prior-site defect (button pagination with no page-N links). This is a
phase-1+ candidate fix, not something to touch in phase 0.

## 4. `data-cta` inventory (pre-port baseline)

All 14 occurrences of `data-cta`, `data-cta-placement`, `data-cta-goal` in
`contractors-ir35/web` (`grep -rn 'data-cta' src`):

| File:line | data-cta | data-cta-placement | data-cta-goal |
|---|---|---|---|
| `src/components/calculators/premium/PremiumCalculator.tsx:658` | `"see_result"` | — | — |
| `src/components/intent/DeepScrollModal.tsx:101` | `"deep_scroll_close"` | — | — |
| `src/components/intent/DeepScrollModal.tsx:115-116` | `"deep_scroll_modal"` | — | `offer.href.startsWith("/contact") ? "form" : undefined` (computed) |
| `src/components/intent/NextStepOffer.tsx:41-42` | `"next_step"` | — | `offer.href.startsWith("/contact") ? "form" : undefined` (computed) |
| `src/components/intent/ReturningBar.tsx:51-52` | `"returning_bar"` | — | `offer.href.startsWith("/contact") ? "form" : undefined` (computed) |
| `src/components/intent/ReturningBar.tsx:61` | `"returning_bar_close"` | — | — |
| `src/components/support/SpecialistWidget.tsx:515` | `"specialist_widget"` | — | — |
| `src/components/ui/StickyCTA.tsx:159-161` | `"sticky_cta"` | `"sticky"` | `offer.href.startsWith("/contact") ? "form" : undefined` (computed) |

(`src/components/calculators/premium/ResultGateModal.tsx:53` is a code comment
noting its buttons deliberately carry **no** `data-cta` — included for
completeness, not a triple.)

### Spelling check against the correct set

The listener that actually reads these attributes is
`packages/web-shared/analytics/autoCapture.ts` (shared across the estate), which
does:
```
const cta = target.closest("[data-cta]");
const goal = cta.getAttribute("data-cta-goal");
... cta.getAttribute("data-cta") ...
... cta.getAttribute("data-cta-placement") ...
```
i.e. the correct attribute names are exactly `data-cta`, `data-cta-goal`,
`data-cta-placement`. All 14 occurrences in this site use one of these three
spellings verbatim — **no misspelled attribute found** (the sibling-site
zero-click incident cited in the brief does not reproduce here). `StickyCTA.tsx`
is the only component using `data-cta-placement` explicitly; every other
placement falls through to the listener's `nearestSection(cta)` fallback, which
is by design, not a spelling defect.

## 5. Route families carrying a redirect (curl without `-L` will look dead)

| Route family | Redirect | Trigger |
|---|---|---|
| `/blog/<any-category>/<real-slug>` where `<category>` doesn't match the post's real category | `permanentRedirect` (307→308, `next/navigation`) to `/blog/<real-category>/<slug>` | `src/app/blog/[category]/[slug]/page.tsx:68` — fires whenever `getPostByCategoryAndSlug` misses but `getPostBySlug` hits |
| `/admin/analytics`, `/admin/analytics/leads`, `/admin/analytics/trends`, `/admin/analytics/visitor/[visitorId]` | `redirect("/admin/analytics/login")` | Unauthenticated request (`checkAuth.ts` gate) — every page in this family redirects when not logged in, so a plain `curl` (no session cookie, no `-L`) will always return a tiny 307 body for all four, not just when "something is broken" |

No other route family in `src/app` calls `redirect()` or `permanentRedirect()`.

## NEEDS SERVER

These require a running instance / real HTTP responses and are handed to the
manager's server-side crawl, not verifiable from source:

1. Confirm the `/blog/<wrong-category>/<real-slug>` redirect actually fires and
   lands on a 200, for at least one case per category — e.g.
   `curl -I -L http://localhost:3000/blog/ir35-status/umbrella-company-explained`
   (real slug, wrong category — real category is "Umbrella vs Limited Company")
   should 308 to `/blog/umbrella-vs-limited-company/umbrella-company-explained`
   and that should 200.
2. Confirm `/admin/analytics*` returns 307 without a session cookie and 200 with
   one, matching the "route family carries a redirect" table above:
   `curl -I http://localhost:3000/admin/analytics` (expect tiny 307 body, not a
   broken-page false negative).
3. Runtime confirmation that `/blog` and the two over-12 category pages
   (`/blog/ir35-status`, `/blog/umbrella-vs-limited-company`) actually serve only
   12 `<article>` elements in the raw HTML response (source reading says so;
   worth a `curl http://localhost:3000/blog | grep -c '<article'` sanity check
   since this is the crawl-floor-defining number).
4. Confirm `/resources/[topic]` pages (3 of them) return 200 and are present in
   `sitemap.xml` output, since they have no on-site hub to click through from:
   `curl http://localhost:3000/sitemap.xml | grep resources`.
5. `data-cta` click-through: confirm `autoCapture.ts`'s delegated listener is
   actually attached on every page carrying these components (this is a runtime
   wiring question, not visible from source alone) — click each of the 7 tracked
   CTAs in a real browser and confirm an event fires.

---

## Receipt

- **Dead links: 1.** `src/app/glossary/[slug]/data.ts:27` — `/blog/ir35-basics`
  (inside a glossary entry body, not the blog directory). Fix belongs at the
  link — repoint to `/blog/ir35-status/what-is-ir35`.
- **Unfiltered listing surfaces: 0 / N-A.** No redirect map exists in this repo,
  so there is nothing for any listing surface to fail to filter. All 6 real
  index/hub surfaces read the raw source directly.
- **Worst index coverage ratio: `/blog` at 12/62 (19.4%)** — client-side button
  pagination, no page-N links, so a crawler starting from `/blog` reaches only
  19% of the corpus from that index. Runner-up: `/blog/ir35-status` category
  page at 12/17 (70.6%).
- **Misspelled `data-cta*` attributes: 0.** All 14 occurrences match the
  listener's expected `data-cta` / `data-cta-goal` / `data-cta-placement` set
  exactly.
- **What was wrong in the brief:** Item 2 (redirect map vs corpus) does not
  apply — this site has no `middleware.ts`, no `next.config.ts` redirects, and
  no `DUPLICATE_REDIRECTS`-style map anywhere. The only redirect is a
  self-correcting category-mismatch redirect inside the blog post page itself,
  which cannot produce a "301'd slug still has a live .md on disk" situation
  because `getAllPosts()` reads every file unconditionally with no exclusion
  list. Treated as N/A rather than skipped silently.
