# startups-tech design port, phases 2 to 6: build plan and package list

Written 2026-09-29 by a read-only planner, BEFORE launch (playbook T39: a package is not
complete because you remember launching it). Tick each row off at close with a receipt.

**State this plan was written against, derived not read.**
`git tag -l 'port-startups-tech*'` = `port-startups-tech-phase0`, `port-startups-tech-phase1`.
Phase 1 is commit `6e02711e` ("port(startups-tech): phase 1 tokens and chrome, review gap-fix
applied"), and `git status --porcelain` shows **no uncommitted files under `startups-tech/`**.
`docs/startups-tech/STATE.md`'s phase-1 block still says "BUILT, UNCOMMITTED, no commit, no tag"
and is therefore stale (playbook T38); correcting it is a manager edit, not a package.

Shape: ONE wave of six concurrent builder packages on strictly disjoint file sets, then ONE
serialised build by the manager, every package's written verification list executed against it,
then two independent adversarial reviews (design, content) and a gap-fix round with a named
mop-up package. This is the charities/crypto shape (`docs/crypto/_port/PHASE0_PACKAGES.md`
lines 26-44), not ecommerce's serial one.

**Owner rulings that bind every package, paste verbatim into every brief:**

1. Existing prose is NOT rewritten. No sentence on any existing page changes. Structure,
   components, classes, markup and ordering may.
2. No phone number anywhere in the chrome or in any new surface.
3. Deploy is parked. No builder runs a build, a dev server or any git write command.
4. No new interruptive surface: no modal, banner, popup, toast, exit intent or sticky CTA.
   The site has zero today (`P0E_STRUCTURAL_INVENTORY.md` section 6) and must still have zero.
5. No new lead-capture surface without an owner gate. A page that already has a form keeps
   exactly that form, in that position. A calculator keeps exactly one form under its result.
6. The brand ramp is LOCKED at `#4f46e5` (the 600 step, 6.29:1 on white, clears the 3:1
   graphic, 4.5:1 text and 4.5:1 ground-under-white-text floors at once). Buttons ground on
   the 700 step `#4338ca`. No contrast-driven hue shift, on any package.

---

## A. Reality check per surface

Read as: what phase 1 already gives this surface, what the kit offers, what Property/ecommerce
does, and the SMALLEST edit point. Every path below was `ls`-ed or read.

Counting method for every number in this section: file reads and `grep -o ... | wc -l` over
source. Nothing here is counted from built CSS or from rendered HTML.

### A0. What phase 1 gave EVERY surface, so no package re-does it

`src/components/layout/PageShell.tsx` + `src/app/layout.tsx` (commit `6e02711e`) give all 25
public routes, for the first time in the site's life: a `<header>` with a 7-item nav and four
desktop dropdowns, a mobile drawer, a `<footer>` with derived columns, a single `<main id="main">`,
a skip link, Geist via `next/font`, `StartupsBackdrop`, a `ConsentToggle`, and the `/embed/*`
chrome bypass. `globals.css` mints the full `--color-primary-50..950` indigo ramp, the
`--btn-ground` trio, the two-valued `--focus-ring` with a `.ground-dark` rebind, and a `footer {}`
rebind. `src/components/ui/layout-utils.ts` re-exports `siteContainerLg`, `contentNarrow`,
`sectionY`, `sectionYLoose` from the kit and keeps `focusRing` + `btnPrimary` local with the
decline reason written above each, naming `packages/web-shared/design/layout-utils.ts`.

**Therefore no package adds chrome, a landmark, a skip link, a font, a ramp or a ring token.**
Those files are OFF LIMITS to every package (section B, OFF LIMITS block).

What phase 1 did NOT do, and so is real work below: it touched no page body. Every one of the
25 public pages still carries its pre-port body markup, its hardcoded brand hexes, and its
hand-rolled section furniture.

### A1. Blog index, `/blog` - `src/app/blog/page.tsx` (37 lines)

- **Phase 1 satisfies:** chrome, `<main>`, skip link, Geist, ring token available.
- **Today:** a bare `max-w-3xl` column. `<h1>` + a category chip row + a flat `<ul>` of ALL 32
  posts. No breadcrumb, no eyebrow, no search, no kit import. Hardcoded `neutral-*` only, no
  brand hex. Serves 37 unique internal links.
- **Kit offers:** `packages/web-shared/design/blog/BlogListWithSearch.tsx`,
  `packages/web-shared/design/primitives/NumberedPagination.tsx`,
  `packages/web-shared/design/primitives/Breadcrumb.tsx`,
  `packages/web-shared/design/primitives/page-blocks.tsx` (`Eyebrow`).
- **Property/ecommerce:** ecommerce `app/blog/page.tsx:12-27` DECLINES `BlogListWithSearch` in a
  comment naming the kit file path, because it hardcodes `postsPerPage = 12` behind
  `useState(1)` and Next SSRs a client component with its initial state, so only 12 posts reach
  the server HTML. It adopts `focusRing` and restyles the local list.
- **SMALLEST edit point:** one file. **This site has 32 posts and a link floor of 37 on this
  exact route**, so adopting `BlogListWithSearch` would cut the server HTML to roughly 12 post
  links + 12 category links and breach the floor. Memory `kit_blog_list_12_post_cap` records
  this cap live on six sibling sites. DECLINE, with the floor number as the measured reason.
  Adopt `Breadcrumb` and `Eyebrow`; route the links through `focusRing`.

### A2. Blog category hub, `/blog/[category]` - `src/app/blog/[category]/page.tsx` (64 lines)

- **Today:** one template renders **5 category routes** (`getAllCategories()`,
  `dynamicParams = false`). Hand-rolled "Blog / Name" text breadcrumb, `<h1>`, flat `<ul>`.
- **Kit offers:** `HubArticleList` (takes `posts`, `categorySlug`, `postsPerPage`),
  `BlogCategoryHub` (whole-hub component with `heading` and `bullets` props), `Breadcrumb`,
  `Eyebrow`.
- **ecommerce:** `app/blog/[category]/page.tsx:6-9` adopts `Breadcrumb`, `Eyebrow`,
  `HubArticleList` and the kit `siteContainerLg`/`focusRing`. That is the exact shape to copy.
- **SMALLEST edit point:** ONE file renders all 5 hubs. Floors are 13/8/7/5/4 and `HubArticleList`
  takes an explicit `postsPerPage`, so pass a value at or above the largest category (11 posts in
  `share-schemes-and-emi`) or the floor breaks. Do not adopt `BlogCategoryHub`: it owns the whole
  page including copy blocks this site does not author.

### A3. Blog post, `/blog/[category]/[slug]` - `src/app/blog/[category]/[slug]/page.tsx` (130 lines)

- **Today:** one template renders **30 sampled / 32 on disk** post routes. Text breadcrumb, h1,
  date + read time, a `keyTakeaways` aside, `<article class="prose prose-neutral">` with the body
  as `dangerouslySetInnerHTML` split at the second `<h2>` for `InlineMiniLeadForm`, then a
  bordered end-of-article `LeadForm` box. Three JSON-LD blocks (post `schema`, FAQ, HowTo).
- **Not present, and all three helpers already exist unused in this repo:** no table of contents
  (`src/lib/markdown-utils.ts` exports `addHeadingIds` and `extractHeadings`, **zero consumers**,
  verified by grep), no related articles (`src/lib/blog.ts:65` exports `getRelatedPosts`, **zero
  consumers**), no reading progress, no sidebar CTA.
- **Kit offers:** `design/blog/TableOfContents.tsx`, `design/blog/ReadingProgress.tsx`,
  `design/blog/RelatedArticles.tsx`, `design/blog/BlogSidebarCta.tsx`, `Breadcrumb`, `Eyebrow`.
  Note there are TWO copies of `ReadingProgress` and `TableOfContents` (`design/blog/` and
  `content/`); the `design/blog/` family has NO `stickyDesktop` prop and expects the HOST to own
  the sticky and the clamp (field notes section 12, playbook T32).
- **ecommerce:** `app/blog/[category]/[slug]/page.tsx:6-8` + `:137-150` is the finished pattern,
  including the ONE-clamp sticky aside and the comment explaining which `TableOfContents` copy it
  is and why the clamp lives in the host.
- **SMALLEST edit point:** ONE template for 32 posts, plus wiring two already-written lib
  functions. No content file is touched. The post body stays `dangerouslySetInnerHTML` (T12
  decline, `P0E` section 2: the body is authored HTML and any kit component taking it as a text
  child would print escaped markup).
- **Keep exactly as-is:** the mini-form split position and the end-of-article `LeadForm`. That is
  two capture surfaces and it is what ships today; owner ruling 5 forbids adding a third.

### A4. Services hub + service pages - `src/app/services/page.tsx` (62), `src/app/services/[slug]/page.tsx` (117)

- **BRIEF IS WRONG: there are SIX service slugs, not 8** (`core-compliance`,
  `emi-scheme-setup`, `fractional-cfo`, `rd-tax-claims`, `seis-eis-advance-assurance`,
  `share-schemes`; `sweep_baseline.json` carries exactly these six plus `/services`).
- **Today, hub:** indigo `bg-[#4f46e5]` hero, kit `ServiceTiers` (already adopted, with
  `featuredBadge="Most popular"`), a 6-card grid, and a kit `LeadCTAPanel` with
  `proofPoints={[]}`. **Today, slug template:** Service + BreadcrumbList JSON-LD, indigo hero with
  an "All services" back link and a hand-rolled white CTA button, a `bg-neutral-800` stats band,
  a challenges grid, a "How we help" grid, a native `<details>` FAQ accordion with FAQPage JSON-LD,
  and a `LeadCTAPanel`.
- **Hardcoded hexes:** 4 in the hub, 7 in the slug template. All are `#4f46e5`, and the ramp now
  exists, so these are a mechanical swap to `primary-600`/`primary-700` utilities.
- **Kit offers:** `Breadcrumb`, `Eyebrow`, `FaqSection`, `CardStack`, `CoverageCards`,
  `SlimHero`, `NoticeCard`.
- **ecommerce:** `app/services/page.tsx:4-12` and `app/services/[slug]/page.tsx:4-6` adopt
  `Eyebrow`, `Breadcrumb`, `LeadCTAPanel` and `ServiceTiers`.
- **DECLINE and write the reason at the call site naming the file path:**
  `packages/web-shared/design/primitives/FaqSection.tsx` is a Radix accordion with no
  `forceMount` (`:34-43`), so closed answers are absent from the server HTML while the FAQPage
  JSON-LD keeps asserting them. The site's existing native `<details>` renders every answer in
  the server HTML today and is strictly better; swapping it in would be a crawlability
  regression on 6 service pages + 5 audience pages (playbook T12, counter-rule).
  `packages/web-shared/design/marketing/CoverageCards.tsx` and
  `packages/web-shared/design/primitives/page-blocks.tsx` `CardStack` render authored bodies as
  text children; `service.challenges[].body`, `howWeHelp[].body` and `faq.answer` are authored
  HTML with anchors (that is why they are already `dangerouslySetInnerHTML`), so both would print
  escaped markup and kill the links. `CardStack` does expose `html?: boolean` at `:99` - check it
  before declining, and if it renders HTML correctly, adopt it and say so.
- **SMALLEST edit point:** two files cover 7 routes (1 hub + 6 slugs).

### A5. Audience hub + pages - `src/app/for/page.tsx` (40), `src/app/for/[slug]/page.tsx` (117)

- **BRIEF IS WRONG: there are FIVE audience slugs, not 7** (`pre-seed-founders`,
  `funded-startups`, `saas-companies`, `software-development-companies`, `fintech-startups`).
- **Today:** structurally a clone of A4's slug template (same hero shape, same stats band, same
  challenges/howWeHelp grids, same `<details>` FAQ, same `LeadCTAPanel`). 4 + 7 hardcoded hexes.
- **SMALLEST edit point:** two files cover 6 routes. Because A4 and A5 are the same shape they
  belong in ONE package; splitting them would produce two divergent answers to one question.

### A6. Calculators index + tool pages + embed

- `src/app/calculators/page.tsx` (39), `src/app/calculators/[slug]/page.tsx` (87),
  `src/app/embed/[slug]/page.tsx` (49), `src/components/calculators/CalculatorClient.tsx` (18),
  `CalcResultCta.tsx` (18), `MiniCapture.tsx` (187).
- **BRIEF IS WRONG: there is no `/embed` index route.** `ls src/app/embed/` returns `[slug]`
  only. `R1_PHASE1_REVIEW.md`'s "`/embed` gallery keeps full chrome" describes a route that 404s.
  Do not build one: that would be a new route, an owner gate.
- **Today:** 4 tools (`rd-relief-estimator`, `seis-eis-relief-calculator`,
  `founder-dividend-vs-salary-calculator`, `emi-vs-unapproved-calculator`). The index is a bare
  `max-w-4xl` column of 4 cards themed entirely through `var(--ink)`/`var(--border)`/
  `var(--brand-primary)` custom properties, NOT ramp utilities. The tool page has an indigo
  `bg-[var(--brand-primary)]` hero with a hand-rolled text breadcrumb, the calculator, an
  explainer, a plain-`<h3>` FAQ list, and ONE `MiniCapture` at `#get-expert-help` with
  `scroll-mt-24` (the site's only anchor target). No result gate anywhere, on any tool
  (`P0E` section 5) - do not add one, that is a capture-surface change.
- **Kit offers:** `Breadcrumb`, `Eyebrow`, `LeadCTAPanel`, `NoticeCard`.
- **ecommerce:** `app/calculators/page.tsx:4-5` and `app/calculators/[slug]/page.tsx:4-13` adopt
  `Eyebrow`, `Breadcrumb` and `LeadCTAPanel`; `components/calculators/CalculatorClient.tsx:4`
  adopts `Eyebrow` inside the tool itself.
- **`/embed/[slug]` is DELIBERATELY chrome-free** and phase 1 already bypasses the shell for it.
  It stays a bare white tool with the "Powered by" attribution link. Restyle its tokens only;
  add no header, no footer, no form, no breadcrumb.
- **SMALLEST edit point:** three route files + three components, covering 9 routes.

### A7. Homepage - `src/app/page.tsx` (815 lines)

- **Today:** 12 sections. Three JSON-LD blocks (Organization, WebSite, FAQPage). Dark
  `bg-[#1e1b4b]` hero at `:404` with two CTAs; `bg-[#312e81]` key-figures band at `:445` carrying
  **four gov.uk stat links**; a `#fafaf9` strip; audience cards; services grid; "moments" grid;
  free-tools + research split; a hand-rolled comparison `<table>` with a `bg-[#1e1b4b]` header
  row; a testimonials section; an FAQ section; a dark `#1e1b4b` closing panel with a `LeadForm`;
  and a blog teaser. **30 hardcoded hexes, the most of any file on the site.**
- **Kit adoption today: ZERO on this file.** `Eyebrow = 0`, `section-label = 9` (gate row 5 is
  inverted and FAILS). Gate row 2b reads `adopted=0 declined=0` and FAILS outright, because
  `src/components/marketing/` does not exist.
- **Kit offers, and the verdicts:**
  - `design/primitives/page-blocks.tsx` `Eyebrow` - **ADOPT** on all 9 `section-label` call
    sites. This single change flips gate row 5 from 0/9 to 9/0.
  - `design/marketing/ComparisonTable.tsx` - takes `rows`, `generalLabel`, `generalCaption`,
    `ourCaption`, `tradingName`, optional `cta`. The homepage table is exactly this shape.
    **ADOPT if and only if** the rendered cell text is byte-identical to today's (owner ruling 1);
    the component forces a "Most recommended" pill (T12) so check what it emits before adopting.
    If the pill or any caption authors a sentence the page does not have today, DECLINE and say so.
  - `design/marketing/StatsCounter.tsx` - **DECLINE.** It renders `label` + one animated number
    and **no links**. The key-figures band at `:445` carries four gov.uk source links, which the
    component has no slot for, and it animates (T15: an animated counter SSRs its start frame).
    Same measured reason crypto recorded at `crypto/web/src/app/page.tsx:345`.
  - `design/marketing/TestimonialsSection.tsx` - **DECLINE.** It hardcodes Property's three
    landlord quotes at `:8-28` and its props are `eyebrow`/`title`/`description`/`backdrop` only,
    with no `items`. Adopting it would publish Property's landlord testimonials on a startup site.
  - `design/marketing/StickyCTA.tsx` - **DECLINE**, interruptive, banned.
  - `design/marketing/ProcessTimeline.tsx`, `ProblemStatement.tsx` - **DECLINE**, both need
    content this site does not publish and `ProblemStatement` carries Property's landlord copy
    with no copy props (T12).
  - `design/marketing/LeadCTAPanel.tsx` - the closing panel at `:743` is already this shape
    hand-rolled. **ADOPT** it there if and only if every rendered sentence survives unchanged.
- **PHASE 1 REVIEW ITEM S2 LANDS HERE, and it is the single highest-value fix in the wave:**
  the hero CTA rings at **1.89:1** on the composited hero ground and the four gov.uk stat links
  in the key-figures band carry **no ring recipe at all** and fall back to the UA ring at
  **1.67:1**. `.ground-dark` is declared in `globals.css:153` inside `@layer components` and has
  **zero consumers**. The fix is: `.ground-dark` on the `:404` hero section and the `:445`
  key-figures section, and the four stat links routed through the local `focusRing` export.
  Read the class's own comment first: it must NOT be applied to a dark section that contains a
  light-ground card with focusable children, because custom properties inherit.
- **SMALLEST edit point:** ONE file, plus a new `src/components/marketing/` directory if the
  closing panel moves into a site-local wrapper (gate row 2b counts that directory).

### A8. Research hub + 5 index pages

- `src/app/research/page.tsx` (134) and five pages: `rd-tax-relief-index` (392),
  `startup-formation-survival-index` (900), `tech-startup-survival-index` (415),
  `uk-tech-formations-index` (454), `uk-tech-funding-reliefs-index` (445). Plus
  `src/components/research/TechFundingReliefsCharts.tsx` and three `data/route.ts` handlers.
- **Today:** the hub has a `bg-[#1e1b4b]` hero and 5 cards with `#4f46e5` stat numbers. The five
  pages are long hand-built data reports with their own heroes, tables, charts and methodology
  blocks. Four of the five embed a `LeadForm`. 20 + 7 + 7 + 6 + 6 + 4 hardcoded hexes.
- **PHASE 0 LEFT EXACTLY ONE THING HERE, and it is this package's headline item:**
  `browser_check.mjs` went from **200 contrast failures to 16** in the phase-0 fix wave, and all
  16 survivors are on `/research/startup-formation-survival-index` - **12px footnote markers at
  3.09** (floor 4.5) **and one 12px `<td>` at 4.24** (floor 4.5). Phase 0 explicitly deferred
  them "for the research template phase". This is that phase.
- **Kit offers:** `Breadcrumb`, `Eyebrow`, `NoticeCard` (for methodology/source callouts),
  `ExampleFigureNote`. ecommerce's `app/research/page.tsx:3-4` and its two study pages adopt
  `Eyebrow` + `Breadcrumb` and nothing else, which is the right amount for a data report.
- **Charts:** `TechFundingReliefsCharts.tsx` had a React-19 hydration defect fixed in phase 0 by
  moving SVG `<title>` children to `title` attributes on the rects. Do not reintroduce
  `<title>` children. T16 also applies: never mark a chart `role="img"`, keep values as text.
- **SMALLEST edit point:** 6 route files + 1 chart component. These pages are 2,606 lines of
  authored report and the prose is frozen, so the work is furniture, tokens and the contrast fix,
  not a rebuild.

### A9. Contact, about, funnel, legal, error - and the forms

- `src/app/about/page.tsx` (40), `src/app/contact/page.tsx` (20),
  `src/app/thank-you/page.tsx` (117), `src/app/book/page.tsx` (57),
  `src/app/complete/page.tsx` (127), `src/app/privacy-policy/page.tsx` (247),
  `src/app/terms/page.tsx` (136), `src/app/cookie-policy/page.tsx` (148),
  `src/app/error.tsx` (69), `src/app/not-found.tsx` (18).
  Forms: `src/components/forms/LeadForm.tsx` (445), `DetailsForm.tsx` (218),
  `BookingPicker.tsx` (173).
- **Today:** `/about` has an indigo hero, four prose paragraphs, a company-details footnote and a
  `LeadCTAPanel`. `/contact` is 20 lines: an h1, one paragraph and a bare `LeadForm`, with a
  link floor of **0** - the lowest on the site alongside `/about`, both of which phase 1's footer
  has already lifted in the rendered page. The funnel pages are plain white columns. The three
  legal pages are `contentNarrow` prose. `error.tsx` hand-rolls a `focus:ring-[#4f46e5]` that
  bypasses the ring token (line 53) and a `text-[#4f46e5]` link (line 61).
- **Kit offers:** `SlimHero` (`eyebrow`, `title`, `children`, `backdrop`) and `NoticeCard`
  (`tone`, `ground`, `title`) - ecommerce uses exactly this pair on `book`, `complete` and
  `thank-you` (`app/book/page.tsx:4-5`, `app/complete/page.tsx:4-5`,
  `app/thank-you/page.tsx:4`). `Breadcrumb` on `/contact` (ecommerce `app/contact/page.tsx:2`).
- **The forms are the ONE place where "no new capture surface" and "restyle" collide.** Restyle
  the fields; do not add, remove, reorder or relabel a field, do not change a `formId`, do not
  touch any consent string (T19: `leadConsentText` is gate-load-bearing and has a measured
  conversion incident behind it).
- **SMALLEST edit point:** 10 route files + 3 form components. None of them share a template.

### A10. The "partner network" sentences: OWNER ITEM, NOT ASSIGNED

The brief names `/thank-you:52`. **Swept by rule rather than by the list, it is four
occurrences across three files** (T6, and this is the fourth consecutive port where the handed
list under-counted):

| file:line | sentence |
|---|---|
| `src/app/contact/page.tsx:12-14` | "A specialist firm from our partner network may contact you directly" |
| `src/app/complete/page.tsx:94` | "A specialist firm from our partner network may contact you" |
| `src/app/complete/page.tsx:119` | "a specialist firm from our partner network will be in touch" |
| `src/app/thank-you/page.tsx:54` | "A specialist firm from our partner network will contact you" |

All four contradict the 2026-09-28 estate-claims reversal (memory `estate_claims_integrity`:
the brand IS the firm on every surface). `docs/startups-tech/STATE.md`'s 2026-09-28 block claims
these were already "removed from `/contact`, `/complete`, `/thank-you`" - that claim is FALSE and
is false premise 6 in section E.

**These are PROSE. They are OUT OF SCOPE for every package in this wave.** No builder edits
them. They go to the owner as one item, alongside the fact that the estate-wide rule already
answers them. Put them in the brief's KNOWN AND ACCEPTED list so no reviewer re-litigates them
and no builder "helpfully" fixes them.

### A11. The `proofPoints={[]}` question, decided

`LeadCTAPanel` renders its whole left column (badge, proof-point list) inside the
`proofPoints.length > 0` branch. All **five** call sites pass `[]`
(`about`, `for`, `for/[slug]`, `services`, `services/[slug]`), so the one adopted kit marketing
component renders hollow and gate row 2 reads 1 distinct / 5 call sites.

**DECISION: leave all five at `[]`.** The rule is owner ruling 1 plus playbook section 7: a proof
point is a `{title, detail}` pair, and every candidate on this site is either an already-graded
claim or new copy. Specifically:

- The obvious candidates are the "24-hour response / Usually the same working day" pair from
  `page.tsx:759` and the fixed-fee sentence from `about/page.tsx`. Both are **already in the
  claims ledger** (C1, C2, C3, D1) as turnaround promises the owner chose to leave exactly where
  Property has them. Copying them onto five more pages would multiply a graded claim by five.
- Nothing else on those five pages exists as a `{title, detail}` pair in already-published
  sentences. Manufacturing one is authoring new copy, which is banned.

**Record it at the call site, in the file**, so the next reviewer does not reopen it:
`proofPoints={[] /* deliberate: every candidate proof point on this page is a ledger row
(C1-C3, D1) or new copy; see docs/startups-tech/_port/PHASE2-6_PACKAGES.md A11 */}`.
This is a decline of a kit SLOT, not of a kit component, so it does not move gate row 2a.

### A12. Minor 6 from the phase-1 review (button shape), decided

`btnPrimary` gained `rounded-xl min-w-[10rem] px-8 text-base font-bold` in phase 1 and it lands
on every button on the site. That IS the Property standard shape (the kit recipe it was declined
from carries the same), the ring guard now pins it (`focus-ring.test.ts`, "btnPrimary is the kit
shape, not a square local one"), and reverting it would reintroduce the drift the gate exists to
stop. **No package changes it. Record it in STATE.md as a deliberate phase-1 visual change**, so
the owner walk is not surprised by it.

---

## B. The six work packages

Every path below was verified with `ls` / `find` from the monorepo root on 2026-09-29. A path
that does not exist is a defect in this plan; none of the paths below is in that state, and the
two the brief named that DO NOT exist (`/embed` index route; `src/components/marketing/`) are
called out as such.

**OFF LIMITS to EVERY package, without exception** (phase 1 owns these; if a package genuinely
needs a token, a recipe or a chrome prop changed, it REPORTS it to the manager and does not edit):

```
packages/web-shared/**                                 (manager carve-out, 19 sites, trap 12)
startups-tech/web/src/app/globals.css                  (phase 1: ramp, ring tokens, .ground-dark, footer rebind)
startups-tech/web/src/components/ui/layout-utils.ts    (phase 1: kit re-export + two declines)
startups-tech/web/src/app/layout.tsx                   (phase 1: nav data, providers, metadata, JSON-LD)
startups-tech/web/src/components/layout/PageShell.tsx  (phase 1: the six kit-chrome props)
startups-tech/web/src/components/layout/StartupsBackdrop.tsx
startups-tech/web/src/app/admin/**                     (staff-only, not in the port's lease)
startups-tech/web/src/app/api/**                       (lead plumbing; W6 may READ, never write)
startups-tech/web/content/**                           (owner ruling 1: no prose changes, anywhere)
docs/startups-tech/_port/*.json                        (baselines; read them, never rewrite them)
Property/**                                            (trap 12: nothing in this wave changes Property)
```

Plus, for each package, **every other package's owned files**, listed verbatim in its brief.

Shared acceptance tests, in EVERY package's brief:

```
cd startups-tech/web && npx tsc --noEmit                  # clean
cd startups-tech/web && npm test                          # GREEN, counts verbatim (baseline 80/80 at 6e02711e)
python scripts/check_dependency_closure.py                # OK (T24: a new import declares itself in the same edit)
grep -rn '[em-dash]' <owned files>                        # 0 em-dashes in user-facing strings
grep -rnoE '#[0-9a-fA-F]{6}' <owned .tsx files>           # 0 hardcoded hex in markup
grep -rnoE 'focus-visible:outline-\[[^]]*\]' <owned files># every value is exactly var(--focus-ring)
grep -rn 'section-label' <owned files>                    # 0 after this package
```

and, for any file emitting JSON-LD, the per-URL parse assertion from playbook section 5
(`json.loads` every `ld+json` block; a tag-presence check passes the `[object Object]` defect).

**Every package's brief also carries, verbatim:** the playbook section 10.1 preamble; "Do NOT run
`next build` or `next dev`"; "Do NOT run any git write command, and read-only git from the
monorepo ROOT only"; "Do NOT launch subagents"; the VERIFY AGAINST SOURCE pushback clause; and
this, which the crypto field notes make a deliverable rather than an act of initiative:
**"Report every defect you can SEE but cannot REACH, with file:line. That list is the input to
the mop-up package. A defect you saw and did not write down is the most expensive defect in the
port."**

---

### W2 - Blog subsystem (phase 2)

**Model: Opus.** It composes markup on 38 routes a prospect reads.

**Files owned (verified):**

```
startups-tech/web/src/app/blog/page.tsx
startups-tech/web/src/app/blog/[category]/page.tsx
startups-tech/web/src/app/blog/[category]/[slug]/page.tsx
startups-tech/web/src/lib/blog.ts
startups-tech/web/src/lib/markdown-utils.ts
startups-tech/web/src/components/blog/InlineMiniLeadForm.tsx
```

**Port FROM (Property / in-repo consumption pattern):**

- `ecommerce/web/src/app/blog/[category]/[slug]/page.tsx:6-8` (the three kit blog imports),
  `:137-150` (the ONE-clamp sticky `<aside>` and the comment saying which `TableOfContents`
  copy it is), `:99-118` (the `<details>` FAQ kept, with the kit `FaqSection` decline written
  above it), `:121-131` (the end-of-article capture, unchanged in position).
- `ecommerce/web/src/app/blog/[category]/page.tsx:6-9` (`Breadcrumb`, `Eyebrow`,
  `HubArticleList`, kit `siteContainerLg`/`focusRing`).
- `ecommerce/web/src/app/blog/page.tsx:12-27` (the `BlogListWithSearch` decline, written the
  countable way).
- Property reference: `Property/web/src/app/blog/page.tsx` and `Property/web/src/components/blog/`
  for the Property answer on card recipe and rail ordering.

**ADOPT:** `packages/web-shared/design/primitives/Breadcrumb.tsx` (all 3 routes; it takes
`items`, `siteUrl`, `onDark`), `packages/web-shared/design/primitives/page-blocks.tsx` `Eyebrow`,
`packages/web-shared/design/blog/HubArticleList.tsx` (category hub only, with an explicit
`postsPerPage >= 11`), `packages/web-shared/design/blog/TableOfContents.tsx`,
`packages/web-shared/design/blog/ReadingProgress.tsx`,
`packages/web-shared/design/blog/RelatedArticles.tsx` (fed by the already-written
`getRelatedPosts`), and the local `focusRing` from `components/ui/layout-utils.ts`.

**DECLINE, reason written at the call site naming the kit FILE PATH:**

- `packages/web-shared/design/blog/BlogListWithSearch.tsx` - hardcodes `postsPerPage = 12` with
  no prop and slices behind `useState(1)`, so with 32 posts only ~12 reach the server HTML.
  `/blog`'s link floor is **37**. Measured, not stylistic. Same cap is live on six sibling sites
  (memory `kit_blog_list_12_post_cap`).
- `packages/web-shared/design/primitives/NumberedPagination.tsx` - only reachable through that
  same slice; declining the list declines this.
- `packages/web-shared/design/primitives/FaqSection.tsx` - Radix accordion with no `forceMount`
  (`:34-43`): closed answers leave the server HTML while the JSON-LD keeps asserting them. The
  post page emits FAQPage JSON-LD today, so adopting it is a crawlability regression.
- `packages/web-shared/design/blog/BlogCategoryHub.tsx` - owns the whole hub page including copy
  blocks this site does not author; adopting it would author new copy.
- Any kit component taking the post body as a text child - the body is authored HTML
  (`P0E` section 2, memory `blog_page_rendering_html_in_frontmatter`).

**Link floors (from `sweep_baseline.json`, 38 routes):**
`/blog` **37**, `/blog/share-schemes-and-emi` **13**, `/blog/research-and-development` **8**,
`/blog/seis-and-eis` **7**, `/blog/saas-and-tech-finance` **5**, `/blog/startup-compliance` **4**.
Posts, floor per route: `eris-rd-intensive-30-percent` 11, `merged-rd-scheme-explained` 10,
`rd-additional-information-form-guide` 8, `rd-claim-collapse-hmrc-clampdown` 13,
`rd-claim-notification-6-month-deadline` 8, `software-rd-eligibility-what-qualifies` 10,
`startup-grants-and-rd-interaction` 8, `founder-salary-vs-dividends-2026-27` 8,
`saas-revenue-recognition-uk-guide` 8, `startup-cfo-pay-and-fractional-cfo-cost` 12,
`vat-for-saas-place-of-supply` 5, `eis3-certificate-explained` 9,
`how-to-apply-for-seis-eis-advance-assurance` 10, `seis-company-checklist` 9,
`seis-vs-eis-explained` 9, `seis1-eis1-compliance-statements` 7,
`where-uk-startup-equity-money-goes` 13, `emi-annual-return-ers-walkthrough` 9,
`emi-disqualifying-events` 11, `emi-option-valuation` 9, `emi-qualifying-company-rules` 10,
`emi-vs-csop` 11, `growth-shares-explained` 10, `option-pool-basics-uk-founders` 12,
`section-431-elections` 9, `stock-vesting-explained` 13,
`val231-emi-valuation-form-walkthrough` 8, `uk-startup-grants-landscape` 10,
`uk-tech-company-formation-boom` 9, `uk-tech-startup-5-year-survival-rate` 12.
Adding `RelatedArticles` and a TOC should LIFT every post route; report the delta, and never pad.

**Package-specific acceptance tests:**

- `grep -c 'dangerouslySetInnerHTML' src/app/blog/[category]/[slug]/page.tsx` - the body, the
  keyTakeaways and every JSON-LD block still interpolate; no authored HTML became a text child.
- `grep -n 'BlogListWithSearch\|FaqSection\|BlogCategoryHub' src/app/blog` - every hit is a
  decline comment naming `packages/web-shared/design/...`, zero are `from "` imports.
- Exactly ONE scroll container in the article column: the `<aside>` carries `lg:sticky
  lg:top-24 lg:max-h-[...] lg:overflow-y-auto` and `TableOfContents` carries none (T32).
- `getRelatedPosts` and `extractHeadings` now have call sites (they had zero).
- Capture surfaces on a post page: exactly 2 (`InlineMiniLeadForm` after the second h2, and the
  end-of-article `LeadForm`). Not 1, not 3.
- Every post URL's `ld+json` blocks `json.loads` without raising.

**OFF LIMITS:** the shared block above, plus W3's, W4's, W5's, W5R's and W6's owned files, plus
`startups-tech/web/content/blog/*.md` (32 files: no frontmatter, no body, no `faqs`, no
`keyTakeaways` edits - owner ruling 1).

---

### W3 - Services and audience hubs (phase 3)

**Model: Opus.** Eleven prospect-facing template routes plus their data files.

**Files owned (verified):**

```
startups-tech/web/src/app/services/page.tsx
startups-tech/web/src/app/services/[slug]/page.tsx
startups-tech/web/src/app/for/page.tsx
startups-tech/web/src/app/for/[slug]/page.tsx
startups-tech/web/src/data/startups-services.ts
startups-tech/web/src/data/startups-hubs.ts
startups-tech/web/src/config/service-tiers.ts
```

`src/data/` also holds five research `.json`/`.csv` files; those belong to W5R and are OFF
LIMITS to W3. Name them individually in the brief.

**Port FROM:**

- `ecommerce/web/src/app/services/page.tsx:4-12` and
  `ecommerce/web/src/app/services/[slug]/page.tsx:4-6` (`Eyebrow`, `Breadcrumb`, `LeadCTAPanel`,
  `ServiceTiers`).
- `ecommerce/web/src/app/for/page.tsx:4-10` and `ecommerce/web/src/app/for/[slug]/page.tsx:4-6`.
- Property reference: `Property/web/src/app/services/page.tsx`, and Property's own topic pages
  (`Property/web/src/app/landlord-tax/page.tsx`, `section-24/page.tsx`) for the Property answer
  on hero, stats band and section rhythm on a hub.

**ADOPT:** `Breadcrumb` (all 11 routes; the hand-rolled "All services" / "All company types"
text back-link is replaced by it, which also raises the link floor rather than lowering it),
`Eyebrow`, the existing `LeadCTAPanel` and `ServiceTiers` (already adopted - keep both), the
local `focusRing`, and the kit `sectionY`/`sectionYLoose`/`siteContainerLg` already re-exported.

**DECLINE, at the call site, naming the file path:**

- `packages/web-shared/design/primitives/FaqSection.tsx` - as A4. The existing native
  `<details>` renders every answer into the server HTML; the pages emit FAQPage JSON-LD; the kit
  component would strip closed answers from the HTML and leave the schema asserting them, on 11
  pages at once. This is the exact defect class T8/T12 and two sibling sites have refused it in
  writing.
- `packages/web-shared/design/marketing/CoverageCards.tsx` - renders authored bodies as text
  children; `challenges[].body` / `howWeHelp[].body` / `faqs[].answer` are authored HTML with
  anchors, which is why they already go through `dangerouslySetInnerHTML`.
- `packages/web-shared/design/primitives/page-blocks.tsx` `CardStack` - **check `html?: boolean`
  at `:99` first.** If it renders HTML safely, ADOPT and say so; if not, decline for the same
  reason as `CoverageCards`. Do not decline it without opening it.
- `packages/web-shared/design/marketing/ProblemStatement.tsx` - carries Property's landlord copy
  with no copy props (T12).

**The hex swap is this package's bulk mechanical work:** 4 hexes in `services/page.tsx`, 7 in
`services/[slug]/page.tsx`, 4 in `for/page.tsx`, 7 in `for/[slug]/page.tsx` = **22**, all
`#4f46e5`. The ramp exists now, so each becomes the correct `primary-*` utility. **Do not assume
600 everywhere**: a ground under white text must sit at the 700 step (`--btn-ground`), matching
the locked decision; a graphic or a text-on-white can sit at 600.

**Link floors:** `/services` **7**, `/services/fractional-cfo` **7**, `/services/core-compliance`
**5**, `/services/share-schemes` **3**, `/services/emi-scheme-setup` **2**,
`/services/rd-tax-claims` **2**, `/services/seis-eis-advance-assurance` **2**, `/for` **5**,
`/for/fintech-startups` **2**, `/for/funded-startups` **2**, `/for/pre-seed-founders` **2**,
`/for/saas-companies` **2**, `/for/software-development-companies` **2**.
The floor-2 routes are the fragile ones: a hand-rolled back-link replaced by a `Breadcrumb` must
not net out lower. Count and report per route.

**Package-specific acceptance tests:**

- `grep -rc '#4f46e5' src/app/services src/app/for` = 0.
- Every `details`/`summary` FAQ still renders its answer in the source of the page file, and
  `buildFaqJsonLd` is still fed the SAME array the markup maps (T17: one binding, both consumers).
- 6 service slugs and 5 audience slugs still generate (`generateStaticParams` counts unchanged),
  and the exported shape of `startups-services.ts` / `startups-hubs.ts` (`slug`, `title`) is
  FROZEN, because `app/layout.tsx` builds the header dropdowns from both and is OFF LIMITS.
- `LeadCTAPanel` call sites: still exactly 5 site-wide, still `proofPoints={[]}` with the A11
  comment. No sixth panel added.
- Service + BreadcrumbList + FAQPage JSON-LD all still parse on all 11 URLs.

**OFF LIMITS:** the shared block, plus the other five packages' files, plus
`src/data/rd-tax-relief-index.json`, `src/data/startup-formation-survival-index.json`,
`src/data/tech-startup-survival-index.json`, `src/data/uk-tech-formations-index.json`,
`src/data/uk-tech-formations-index.csv`, `src/data/uk-tech-funding-reliefs-index.json` (W5R).

---

### W4 - Calculators and the embed surface (phase 4)

**Model: Opus.** It composes the tool pages, which are the site's highest-intent surfaces.

**Files owned (verified):**

```
startups-tech/web/src/app/calculators/page.tsx
startups-tech/web/src/app/calculators/[slug]/page.tsx
startups-tech/web/src/app/embed/[slug]/page.tsx
startups-tech/web/src/components/calculators/CalculatorClient.tsx
startups-tech/web/src/components/calculators/CalcResultCta.tsx
startups-tech/web/src/components/calculators/MiniCapture.tsx
startups-tech/web/src/lib/calculators/site.ts
```

`src/lib/calculators/registry.ts`, `schema.ts` and `tools/**` (4 tools + 4 tests) are
**READ ONLY for this package**: they are compute and tests, not design, and the phase-0 fix wave
already corrected the `(HP3)` artefact and its pinning test in `rd-relief-estimator`. The
exported shape of `registry.ts` is frozen: `app/layout.tsx` builds the Calculators dropdown from
`TOOLS` and is OFF LIMITS.

**Port FROM:**

- `ecommerce/web/src/app/calculators/page.tsx:4-5` and
  `ecommerce/web/src/app/calculators/[slug]/page.tsx:4-13` (`Eyebrow`, `Breadcrumb`,
  `LeadCTAPanel`).
- `ecommerce/web/src/components/calculators/CalculatorClient.tsx:4` (`Eyebrow` inside the tool).
- `ecommerce/web/src/app/embed/[slug]/page.tsx` for the bare-embed answer.
- Property reference: `Property/web/src/app/calculators/page.tsx` and
  `Property/web/src/components/calculators/`, and `Property/web/src/app/embed/page.tsx`.

**ADOPT:** `Breadcrumb` (replacing the hand-rolled text breadcrumb at
`calculators/[slug]/page.tsx:47-50`, which currently renders on a dark indigo ground - pass
`onDark`), `Eyebrow`, the local `focusRing`, the kit containers.

**DECLINE, at the call site, naming the file path:**

- `packages/web-shared/design/primitives/FaqSection.tsx` - the tool page's FAQ is plain
  `<h3>` + `<p>` today and already fully in the server HTML while emitting FAQPage JSON-LD.
- `packages/web-shared/design/marketing/StickyCTA.tsx` - interruptive, banned, and a calculator
  page is exactly where one gets proposed.
- Any kit result-gate or modal - **there is no result gate on any of the 4 tools today**
  (`P0E` section 5) and adding one is a capture-surface change requiring an owner gate.

**The `/embed/[slug]` contract, stated so it cannot drift:** it is `noindex, nofollow`, it
canonicals to the `/calculators/<slug>` page, phase 1 already bypasses the chrome for it, and it
carries exactly one outbound attribution link. It gets **no header, no footer, no breadcrumb, no
form and no `LeadCTAPanel`**. Token restyle only. There is **no `/embed` index route** and this
package does not create one.

**Capture surfaces on a tool page: exactly ONE**, the `MiniCapture` at `#get-expert-help`
(`formId="calc_page_footer"`), under the result. Keep the id, keep `scroll-mt-24` (it is the
site's only anchor target and phase 0 fixed 8 more like it), keep the position.

**Link floors:** `/calculators` **4**, each of the four tool routes **3**
(`rd-relief-estimator`, `seis-eis-relief-calculator`, `founder-dividend-vs-salary-calculator`,
`emi-vs-unapproved-calculator`). Adding a `Breadcrumb` lifts these; report the delta.
`/embed/[slug]` is not in the baseline and has no floor: do not invent one.

**Package-specific acceptance tests:**

- `npm test` still 80/80 including the four calculator maths suites - this package changes no
  compute, and a changed count is a defect in this package, not a new baseline.
- `grep -rn 'var(--brand-primary)\|var(--ink)\|var(--border)\|var(--muted)' src/app/calculators src/components/calculators`
  - every survivor is deliberate and commented; the ramp utilities are the default now.
- `curl -s localhost:3201/embed/rd-relief-estimator | grep -c '<header\|<footer\|<nav'` = 0
  (re-prove the phase-1 bypass survived; it is the easiest thing in this wave to break).
- Exactly one `MiniCapture` per tool page; `formId` strings unchanged
  (`grep -rn 'formId=' src/app/calculators src/components/calculators`).
- WebApplication + FAQPage JSON-LD parse on all four tool URLs.

**OFF LIMITS:** the shared block, the other five packages' files, and
`src/lib/calculators/registry.ts`, `schema.ts`, `tools/**` (read-only).

---

### W5 - Homepage (phase 5)

**Model: Opus.** 815 lines, 12 sections, the single page the owner walks first.

**Files owned (verified / to create):**

```
startups-tech/web/src/app/page.tsx                (exists, 815 lines)
startups-tech/web/src/components/marketing/       (DOES NOT EXIST - this package creates it,
                                                   and it is the only package permitted to)
```

**Port FROM:**

- `ecommerce/web/src/app/page.tsx:4-7` - the closest in-repo homepage: `Eyebrow`,
  `StatsCounter`, `LeadCTAPanel`, `NumberedReasons`, four kit marketing imports on one homepage.
  **Read its StatsCounter call site before copying it**: ecommerce's stats carry no links, this
  site's key-figures band carries four gov.uk links, so the two sites correctly reach opposite
  verdicts on the same component.
- `crypto/web/src/app/page.tsx:23-43` and `:345` - the WRITTEN DECLINE of `StatsCounter` for
  exactly this reason (it would have deleted four gov.uk source links). Copy the decline's shape.
- Property reference: `Property/web/src/app/page.tsx` for the 15-16 section homepage answer and
  `Property/web/src/components/property/` for its local marketing components.

**ADOPT:** `packages/web-shared/design/primitives/page-blocks.tsx` `Eyebrow` on **all 9**
`section-label` call sites (`:480, 511, 543, 572, 599, 634, 680, 748, 789`). This single swap
takes gate row 5 from `Eyebrow=0 section-label=9` to `9/0` and is the cheapest row on the gate.
Consider `packages/web-shared/design/marketing/LeadCTAPanel.tsx` for the `:743` closing panel and
`packages/web-shared/design/marketing/ComparisonTable.tsx` for the `:632-676` table -
**adopt EITHER ONE only if every rendered sentence is byte-identical to today's.** The panel or
table wrapper, if it needs site-local props, is what `src/components/marketing/` is for, and
gate row 2b counts that directory.

**DECLINE, at the call site, naming the file path** (this is the package that makes row 2b pass,
so at least one adoption or one written decline MUST land here):

- `packages/web-shared/design/marketing/StatsCounter.tsx` - renders `label` + one value and NO
  links; the `:445` key-figures band carries four gov.uk source links it has no slot for, and it
  animates (T15: a count-up SSRs its start frame, so a crawler reads the wrong number).
- `packages/web-shared/design/marketing/TestimonialsSection.tsx` - hardcodes Property's three
  landlord quotes at `:8-28` with no `items` prop; adopting it publishes Property's testimonials
  on a startup site.
- `packages/web-shared/design/marketing/StickyCTA.tsx` - interruptive, banned.
- `packages/web-shared/design/marketing/ProcessTimeline.tsx` - needs content this site does not
  publish.
- `packages/web-shared/design/marketing/ProblemStatement.tsx` - Property's landlord copy, no
  copy props (T12).
- `packages/web-shared/design/primitives/FaqSection.tsx` - the `:709` FAQ section feeds
  `buildFaqJsonLd(faqs)` at `:400` from the same array; the kit accordion would strip the closed
  answers out of the HTML while the schema kept asserting them.

**PHASE-1 REVIEW ITEM S2, OWNED HERE, and it is a BLOCKING acceptance test for this package:**

1. `.ground-dark` onto the hero `<section>` at `:404` and onto the key-figures `<section>` at
   `:445`. Read the class's own comment in `globals.css` first: it must not wrap a dark section
   that contains a light-ground card with focusable children, because custom properties inherit.
   Check both sections for light cards before applying, and report if either has one.
2. The **four gov.uk stat links** in the `:445` band routed through the local `focusRing` export
   from `components/ui/layout-utils.ts`. They carry no ring recipe at all today and fall back to
   the UA ring at **1.67:1**.
3. After both, the hero CTA ring must measure at or above **3.0** on the composited hero ground
   (it is **1.89** today), and the four stat links likewise (1.67 today).
   **Measure it the way R1 did or you will read a pass that is not there:** `transition-colors`
   animates `outline-color`, so a `getComputedStyle` read immediately after Tab returns a
   mid-transition value - settle ~320ms. `outline-offset-2` paints the ring on the PARENT's
   ground. Tailwind v4 returns `oklab()`, so composite through a 1x1 canvas, never a `rgba?\(`
   regex. This package cannot run a browser, so it writes the check as a verification-list row
   (URL, command, expected decisive line) and the MANAGER runs it at wave close.

**Claims rows the owner LEFT AS THEY ARE on this exact file - do NOT "fix" them:**
B1 (three first-person founder quotes, `:326-343`, rendered `:677-707`), B2 (the composite
standfirst, `:684-686`), C3 (the "24-hour response / Usually the same working day" proof point,
`:759`). All are in `P0A_CLAIMS_LEDGER.md` and the owner ruled on 2026-09-29. Put them in the
brief's KNOWN AND ACCEPTED list.

**Link floor:** `/` **18**. Dashes `0`. **30 hardcoded hexes** to retire:
`#1e1b4b` (hero, table header, closing panel) to `primary-950`; `#312e81` (key-figures band, step
numerals) to `primary-900`; `#fafaf9` (five section grounds) - keep as an arbitrary value, it is
NOT a ramp step and a grounds scan keyed to named scales is blind to it (crypto field note); do
not "fix" it into `neutral-50`, that is a visible colour change nobody asked for.

**Package-specific acceptance tests:**

- `grep -o 'section-label' src/app/page.tsx | wc -l` = 0 and `grep -o '<Eyebrow' | wc -l` = 9.
- `grep -c 'ground-dark' src/app/page.tsx` >= 2, on the `:404` and `:445` sections.
- `grep -rn 'StatsCounter\|TestimonialsSection\|StickyCTA\|FaqSection' src/app/page.tsx src/components/marketing`
  - every hit is a decline comment naming a `packages/web-shared/design/...` path; zero are
  `from "` imports.
- Gate row 2b, run comment-stripped exactly as playbook section 9.1 writes it: `adopted >= 1` OR
  `declined >= 1` over `app/page.tsx` + `components/marketing/*.tsx`. It must not stay `0/0`.
- Organization, WebSite and FAQPage JSON-LD all still parse, and the FAQ array feeding the
  markup is the SAME binding feeding `buildFaqJsonLd` (T17).
- Link count >= 18, derived and stated.

**OFF LIMITS:** the shared block, the other five packages' files.

---

### W5R - Research hub and the five index pages (phase 5)

**Model: Opus.** 2,740 lines of published data reporting; an error here publishes a wrong figure.

**Files owned (verified):**

```
startups-tech/web/src/app/research/page.tsx
startups-tech/web/src/app/research/rd-tax-relief-index/page.tsx
startups-tech/web/src/app/research/startup-formation-survival-index/page.tsx
startups-tech/web/src/app/research/tech-startup-survival-index/page.tsx
startups-tech/web/src/app/research/uk-tech-formations-index/page.tsx
startups-tech/web/src/app/research/uk-tech-funding-reliefs-index/page.tsx
startups-tech/web/src/components/research/TechFundingReliefsCharts.tsx
```

The three `research/*/data/route.ts` handlers and the five `src/data/*index*.json|csv` files are
**READ ONLY**: they are the published dataset and the JSON API partners consume.

**Port FROM:**

- `ecommerce/web/src/app/research/page.tsx:3-4` and
  `ecommerce/web/src/app/research/online-seller-index/page.tsx:3-4`,
  `online-seller-survival-index/page.tsx:3-4` - `Eyebrow` + `Breadcrumb` and nothing else. That
  restraint is the right amount for a data report, and it is the most recent in-repo answer.
- Property reference: `Property/web/src/app/research/page.tsx` and
  `Property/web/src/components/research/`.

**ADOPT:** `Breadcrumb` (all 6 routes; the hub's hand-rolled "Home" back-link at `:110-115`
becomes one, on a dark ground so pass `onDark`), `Eyebrow`, the local `focusRing`,
`packages/web-shared/design/primitives/NoticeCard.tsx` for the methodology and source callouts
if and only if the existing sentences survive unchanged, and
`packages/web-shared/design/primitives/ExampleFigureNote.tsx` if it fits a footnote block.

**THE HEADLINE ITEM, and it is a BLOCKING acceptance test:** phase 0 drove
`browser_check.mjs` from **200 contrast failures to 16**, and all 16 survivors are on
`/research/startup-formation-survival-index`: **12px footnote markers at 3.09** (floor 4.5) and
**one 12px `<td>` at 4.24** (floor 4.5). Phase 0 deferred them in writing "for the research
template phase". This package closes them to **0**. Fix by stepping the colour, never by
shifting the brand (ruling 6) and never by enlarging authored type without saying so.
Calibration, and get this right or the numbers will be wrong by a whole hex generation: this is
**Tailwind v4**, so `slate-500` is `#62748e` = **4.77** on white and `slate-400` is `#90a1b9` =
**2.63** - the familiar 4.76 / 2.56 are the v3 hexes (T25, v4 amendment).

**Also owned here:** the four research pages that embed a `LeadForm`. Phase 0 wrapped it in a
white card because it measured **1.12:1** on the dark band. Keep the card, keep the form, add no
second one.

**Charts:** `TechFundingReliefsCharts.tsx` - do not reintroduce SVG `<title>` CHILDREN; React 19
hoists them to `<head>` and that was the phase-0 hydration-#418 root cause. `title` attributes on
the rects is the fix that shipped. T16: never `role="img"` on a chart wrapper, keep every value
as a text node and mark only decorative bars `aria-hidden`.

**Hardcoded hexes:** 4 (hub) + 20 + 7 + 7 + 6 + 6 = **50**, the second largest block on the site.
`#1e1b4b` to `primary-950`, `#4f46e5` to `primary-600`.

**Link floors:** `/research` **6**, `/research/startup-formation-survival-index` **6**,
`/research/tech-startup-survival-index` **5**, `/research/uk-tech-formations-index` **5**,
`/research/rd-tax-relief-index` **4**, `/research/uk-tech-funding-reliefs-index` **4**.
A `Breadcrumb` lifts each by 1 to 2; report the delta per route.

**Package-specific acceptance tests:**

- `grep -rnoE '#[0-9a-fA-F]{6}' src/app/research src/components/research` = 0.
- `grep -rn '<title>' src/components/research/TechFundingReliefsCharts.tsx` = 0.
- `grep -rn 'role="img"' src/app/research src/components/research` = 0.
- Every published figure on the six pages still renders the value the `src/data/*.json` snapshot
  holds - this package changes markup, never a number. Spot-check three per page and name them.
- Dataset / Article JSON-LD parses on all 6 URLs.
- Verification-list row for the manager: `browser_check.mjs --site=startups-tech` reports
  **0** contrast failures on `/research/startup-formation-survival-index` at all four widths,
  against the 16 in the phase-0 close block.

**OFF LIMITS:** the shared block, the other five packages' files, the three
`research/*/data/route.ts` handlers and all five research data files (read-only).

---

### W6 - Contact, funnel, about, legal, error pages and the forms (phase 6)

**Model: Opus.** Every one of these is read by a prospect mid-funnel, and the forms are the
conversion surface.

**Files owned (verified):**

```
startups-tech/web/src/app/about/page.tsx
startups-tech/web/src/app/contact/page.tsx
startups-tech/web/src/app/thank-you/page.tsx
startups-tech/web/src/app/book/page.tsx
startups-tech/web/src/app/complete/page.tsx
startups-tech/web/src/app/privacy-policy/page.tsx
startups-tech/web/src/app/terms/page.tsx
startups-tech/web/src/app/cookie-policy/page.tsx
startups-tech/web/src/app/error.tsx
startups-tech/web/src/app/not-found.tsx
startups-tech/web/src/components/forms/LeadForm.tsx
startups-tech/web/src/components/forms/DetailsForm.tsx
startups-tech/web/src/components/forms/BookingPicker.tsx
startups-tech/web/src/components/analytics/ConsentToggle.tsx
startups-tech/web/src/tests/focus-ring.test.ts
```

**Port FROM:**

- `ecommerce/web/src/app/book/page.tsx:4-5`, `complete/page.tsx:4-5`, `thank-you/page.tsx:4` -
  `SlimHero` (`eyebrow`, `title`, `children`, `backdrop`) + `NoticeCard` (`tone`, `ground`,
  `title`). This is the finished answer for the three funnel pages.
- `ecommerce/web/src/app/contact/page.tsx:2` and `about/page.tsx:3-5` - `Breadcrumb`, `Eyebrow`,
  `LeadCTAPanel`.
- `ecommerce/web/src/components/ui/layout-utils.ts:63-79` - the `focusRingOnBrand` escape hatch
  and the comment explaining why a dark ISLAND inside a light section cannot use `.ground-dark`.
  **This site has exactly that shape** in `BookingPicker.tsx` (the selected slot) and in
  `thank-you/page.tsx`. This package **cannot add the export** (`layout-utils.ts` is phase 1's
  and OFF LIMITS): it REPORTS the need to the manager with the measured ratio, and the manager
  decides. That report is a deliverable, not optional.
- Property reference: `Property/web/src/app/contact/page.tsx`, `about/page.tsx`,
  `thank-you/page.tsx`, `privacy-policy/page.tsx`, `terms/page.tsx`, `cookie-policy/page.tsx`,
  and `Property/web/src/components/forms/`.

**ADOPT:** `SlimHero` and `NoticeCard` on `/book`, `/complete`, `/thank-you`; `Breadcrumb` on
`/contact` and `/about`; `Eyebrow`; the local `focusRing` (which retires the
`focus:ring-[#4f46e5]` bypass at `error.tsx:53` and the `text-[#4f46e5]` link at `:61`).

**DECLINE, at the call site, naming the file path:**

- `packages/web-shared/design/marketing/StickyCTA.tsx` and every modal/banner - no interruptive
  surface exists on this site today (`P0E` section 6: zero hits for `Modal|Banner|Popup|StickyBar|
  ExitIntent|ConsentBanner`) and none may be added. Write the decline once, in `contact/page.tsx`.
- `packages/web-shared/design/marketing/WhatToExpectCard.tsx` - its DEFAULT props publish a fee
  line no page authored (T12, a known Property defect that must not be copied). If it is used at
  all, every prop is passed explicitly; otherwise decline it here.
- `packages/web-shared/leads/MiniCapture.tsx` - this site runs a LOCAL
  `components/calculators/MiniCapture.tsx` (W4's file) and the two are not the same component.
  Do not "consolidate" them; that is a lead-plumbing change, not design.

**The forms contract, stated so a builder cannot drift it:** restyle fields, labels, spacing,
buttons and the ring. Do NOT add, remove, reorder or relabel a field. Do NOT change any
`formId`, `data-cta`, `name` or `redirectOnSuccess`/`submitLabel` value. Do NOT touch any
consent sentence anywhere (T19: `leadConsentText` is matched on by `consentAllowsSharing` and
pinned by `Property/web/src/tests/consent-anchor-drift.test.ts`, and a 2026-08-24 change to it
cut mini-form leads from ~10/wk to 3.9/wk and was reverted). If a consent string looks wrong,
REPORT it; do not edit it.

**`focus-ring.test.ts` is owned here, and may only be EXTENDED**, never weakened. Its five
current tests (recipe assertions, the `readdirSync` corpus walk, the guards-the-guard assertion,
the bracket-value ban, the button-shape pins) all stay green. If this package adds a new ring
shape, it adds the assertion in the same edit (T9: the test calls the real function; prove the
guard bites by reintroducing the regression and watching it fail).

**Claims rows the owner LEFT AS THEY ARE on these exact files - do NOT "fix" them:**
F1 (privacy policy section 6, the 24-month retention sentence), F2 and F3 (cookie policy: the
"does not use Google Analytics" statement and the GA opt-out block), F5 (privacy policy section
5, "published grading rubric"), C1/C2/D1 (the 24-hour response sentences on `/about`,
`/contact` and elsewhere). All in `P0A_CLAIMS_LEDGER.md`, all owner-decided 2026-09-29. Put them
in the brief's KNOWN AND ACCEPTED list.

**The four "partner network" sentences (A10) are OUT OF SCOPE.** They are prose, three of them
sit in this package's files, and this package does not touch them. Name them in the brief's
KNOWN AND ACCEPTED list with "owner item, do not edit".

**Link floors:** `/about` **0**, `/contact` **0**, `/cookie-policy` **1**, `/terms` **1**,
`/privacy-policy` **2**. Zero is the pre-chrome baseline and phase 1's footer has already lifted
all five well above it; the floors are a do-no-harm check, not a target, and this package must
not go below them. `/book`, `/complete`, `/thank-you`, `/error`, `/not-found` are not in the
baseline (correctly: the first three are `noindex` funnel pages) and have no floor.

**Package-specific acceptance tests:**

- `grep -rnoE 'focus-visible:outline-\[[^]]*\]|focus:ring-\[' src/app src/components` - every
  bracket value is exactly `var(--focus-ring)`; `error.tsx:53`'s bypass is gone.
- `npm test` 80/80 with `focus-ring.test.ts` at 5 tests or more, all green.
- `grep -rn 'formId=\|data-cta=\|redirectOnSuccess\|submitLabel' src/components/forms src/app/contact src/app/thank-you`
  - diff against `6e02711e`: zero changes.
- `git diff 6e02711e -- <the 4 partner-network lines>` is empty (prove the out-of-scope item was
  left alone).
- `grep -rn 'Modal\|Banner\|Popup\|StickyBar\|ExitIntent' src --include=*.tsx` - still zero.
- `/thank-you`'s three mutually exclusive branches still render exactly ONE `<main>` and ONE
  `<h1>` each (`P0E` section 0.2: a naive grep says 3 and that is not a defect).

**OFF LIMITS:** the shared block, the other five packages' files, and `src/app/api/**`,
`src/lib/leads/**`, `src/config/lead-nurture.ts` (read-only: lead plumbing).

---

### M1 - Mop-up (gap-fix round, NOT concurrent)

Budgeted from the start, per the crypto field note: disjoint file ownership stops agents
colliding and strands defects at the seams. **Its input is the "reported, could not reach" list
every one of W2 to W6 returns**, plus both reviews' gap tables. It is the only package permitted
to edit across package boundaries, and it runs alone after the reviews, not in the wave.

Known seam candidates before the wave even starts, so M1 is not discovered at the end:

- The `focusRingOnBrand` escape hatch: `components/ui/layout-utils.ts` is phase 1's, but the
  dark ISLANDS that need it sit in W6's `BookingPicker.tsx` and `thank-you/page.tsx`.
  **Manager-direct**, since it is a phase-1 file.
- Any `globals.css` token a package needs and cannot add.
- Files the wave CREATES: `src/components/marketing/*` (W5) and anything else. Derive at close
  with `git diff --stat --diff-filter=A port-startups-tech-phase1 HEAD -- startups-tech/web/src`
  and give every added file an owner in STATE.md (crypto's `_parts/PageHero.tsx` reached nine
  route families with no owner).

---

## C. Dependencies and launch order

**All six builder packages are CONCURRENT.** There is no blocking dependency between them,
because the one thing that would have created one - the `@theme` ramp and the ring tokens - was
already minted and committed in phase 1 (`6e02711e`). That is precisely why crypto ran its token
ramp alone and first, and why this site does not need to.

Derivation, not assertion, for each possible edge:

- **Ramp / tokens / recipes:** already in `globals.css` and `layout-utils.ts` at HEAD, both OFF
  LIMITS. No package waits on another for a colour or a ring. Proven by
  `grep -o "primary-600" startups-tech/web/.next/static/css/*.css | wc -l` being non-zero after
  phase 1 (run it with `-o ... | wc -l`, never `grep -c`: a built stylesheet is one line).
- **`src/lib/blog.ts` / `markdown-utils.ts`:** W2 owns both and no other package imports either
  (`grep -rn 'lib/blog\|markdown-utils' src` - hits are inside `app/blog/**` and the feed/llms
  routes only, and the latter two are untouched).
- **`src/data/startups-services.ts` / `startups-hubs.ts`:** W3 owns them; `layout.tsx` imports
  both to build the nav, and `layout.tsx` is OFF LIMITS to everyone, so the only contract is
  that W3 must not change either file's EXPORTED SHAPE (`slug`, `title`). Say that in W3's brief
  as a hard constraint, because a rename there silently breaks the header dropdowns.
- **`src/lib/calculators/registry.ts`:** W4 owns the pages, the registry is read-only to it, and
  `layout.tsx` imports `TOOLS` for the nav. Same constraint: the exported shape is frozen.
- **`components/ui/layout-utils.ts` and `globals.css`:** OFF LIMITS to all six. This is the one
  genuinely shared surface and fencing it is what keeps the six disjoint.
- **W5 and W5R are both "phase 5"** and are split because the homepage and the research reports
  share no file and no component; running them as one package would make it the largest in the
  wave by a factor of four.

**Launch order:** one message, six tool calls, all six at once. That is the cap (playbook: 6
concurrent agents, and every brief says "Do NOT launch subagents", or five become twenty).

**Then, strictly serial and manager-direct:**

1. ONE `next build` in `startups-tech/web`, nothing else building.
2. `next start -p 3201`, **assert the served `<title>` AND the server's age** before trusting a
   single number (field notes section 11; and run the preflight `netstat` orphan-server check
   first - the last server on 3201 was stopped on 2026-09-29, prove the port is free).
3. Execute EVERY package's written verification list against that one build (section F). On
   charities this pass is what caught the last two live defects; expect roughly 2 of every 30
   failures to be a wrong expected value in a brief rather than a site defect.
4. Only then tag. Do not tag six phase tags on one commit without also tagging
   `port-startups-tech-complete` at the end (STOP block: a checkout of `port-crypto-phase6`
   is missing every review fix).
5. Two independent adversarial reviewers, concurrently (design, content). Each gets the running
   server, the KNOWN AND ACCEPTED list, and "finding nothing is a failed review".
6. Gap-fix round: M1 plus up to three gap-fixers on disjoint files.
7. One re-review (T7: a fix pass introduced a blocker last time).

---

## D. The six kit-chrome props and the two CSS tokens (playbook section 8 item 11)

Read from `startups-tech/web/src/components/layout/PageShell.tsx` and
`startups-tech/web/src/app/layout.tsx` at `6e02711e`. **All eight rows are already correct.
No package in this wave owns any of them.**

| # | prop / token | kit default | this site | verdict | owner |
|---|---|---|---|---|---|
| 1 | `SiteHeader.ctaContactGoal` | `"form"` | `"form"`, passed explicitly with the reason written | CORRECT. There is no pre-port value to preserve: `grep -rn 'data-cta-goal=' src` had **zero** hits before phase 1. These are the site's first rows in `vw_cta_performance`, so there is no baseline to split. | none |
| 2 | `SiteHeader.ctaMobilePlacement` | `"mobile_menu"` | `"mobile_menu"`, passed explicitly | CORRECT, and **verified in the shipped client bundle**, the only place it is visible: R1 found `header_book_mobile` and `mobile_menu` in `app/layout-20d2f0863ecbd7a0.js` and measured the rendered drawer CTA at `goal=form placement=mobile_menu href=/contact`, white on `#4338ca` = 7.90. No SSR crawl can see this; do not re-verify it by curl. | none |
| 3 | `SiteFooter.resourcesHref` | `"/landlord-tax"` (Property's, 404s here) | `"/research/startup-formation-survival-index"` | CORRECT, and subtle: the kit derives the whole Resources column from the CHILDREN of the nav item whose `href` EQUALS this value. `"/research"` is not a nav href on this site (`niche.config.json` points the Research entry at the deep index page and the owner ruling keeps it), so passing `/research` would have derived an empty column. | none |
| 4 | `SiteFooter.companyItems` | Property's four, **including `/locations` which 404s here** (`locations: []`) | five site routes: `/about`, `/contact`, `/privacy-policy`, `/terms`, `/cookie-policy` | CORRECT. R1 probed all 31 chrome hrefs: all 200, trailing-slash variants all 308. | none |
| 5 | `SiteFooter.showBuilderCredit` | `true` | omitted, so `true` | CORRECT per the owner's 2026-09-11 estate-wide reversal. Do not reintroduce a `false` "fix". Note for STATE.md: it is a new visible line AND a new followed outbound link on every page of this site (T27). | none |
| 6 | `SiteHeader.wordmarkAccentColor` | undefined (keeps `primary-600`) | `"#4f46e5"`, passed explicitly | CORRECT and a deliberate no-op: `#4f46e5` IS this site's `--color-primary-600`, so the default would resolve to the same colour. Passed for explicitness, and because the header's button ground is the 700 step, so the wordmark and the CTA are two steps of one indigo by design rather than by accident. | none |
| 7 | `--brand-primary-text` | undefined, falls back to `--brand-primary` | **deliberately NOT declared** | CORRECT. The token exists for a mid-tone brand hex that clears 3:1 as a graphic and fails 4.5:1 as text. `#4f46e5` measures **6.29** on white and clears all three floors at once, so one value carries every role. Its only kit consumer is `packages/web-shared/leads/MiniCapture.tsx`, which **this site does not import** (it runs a local `components/calculators/MiniCapture.tsx`). | none |
| 8 | `--brand-primary-ground` | undefined, falls back to `--brand-primary` | **deliberately NOT declared** | CORRECT, and this one DOES have a live consumer: `packages/web-shared/components/ServiceTiers.tsx` is imported by `src/app/services/page.tsx` and paints the "Most popular" badge and featured CTA from it. The fallback resolves to `#4f46e5`; white label on `#4f46e5` = **6.29**, past the 4.5 floor. Verified at the consumer, not assumed. | none |

**Conclusion for the wave:** nothing in D is package work. W3 must simply not break row 8 by
removing `ServiceTiers`, and no package may edit `PageShell.tsx` or `layout.tsx` to "improve" any
of rows 1 to 6.

---

## E. Risks, ambiguities, and every FALSE PREMISE found

### E.1 False premises, numbered

1. **"services hub and 8 service pages" (the brief).** There are **6** service slugs.
   Deriving command: `sweep_baseline.json` carries `/services` plus exactly six
   `/services/<slug>` keys, and `src/data/startups-services.ts` generates them.
   A brief saying 8 would have had W3 hunting two routes that do not exist.
2. **"/for hub and 7 audience pages" (the brief).** There are **5** audience slugs
   (`pre-seed-founders`, `funded-startups`, `saas-companies`,
   `software-development-companies`, `fintech-startups`). Same deriving command.
3. **"/embed and /embed/[slug]" (the brief).** `ls startups-tech/web/src/app/embed/` returns
   `[slug]` only. **There is no `/embed` index route.** `R1_PHASE1_REVIEW.md` repeats the error
   ("`/embed` gallery keeps full chrome") - it describes a route that 404s. Building one would be
   a new route and an owner gate; do not.
4. **"phase 1 ... commit `6e02711e`" vs `docs/startups-tech/STATE.md`.** The brief is right and
   STATE.md is wrong. STATE.md's phase-1 block still reads "BUILT, UNCOMMITTED, review = PASS
   WITH GAP-FIX ... no commit, no tag". `git tag -l` shows `port-startups-tech-phase1` and
   `git status --porcelain` shows nothing uncommitted under `startups-tech/`. This is playbook
   T38, third occurrence on this programme. **Manager fixes STATE.md in the same commit as this
   plan**, before the wave launches, or the next session redoes phase 1.
5. **R1's blocker B1 and serious S3 are presented as open; both are CLOSED.**
   `globals.css:155-167` now carries a `footer { --focus-ring: var(--focus-ring-on-brand);
   --kit-focus-ring: ... }` rebind inside `@layer components`, and `src/tests/focus-ring.test.ts`
   now bans any `focus-visible:outline-[...]` bracket value other than `var(--focus-ring)`, with
   all four previously-bypassing form files (`BookingPicker.tsx:23`, `DetailsForm.tsx:19`,
   `LeadForm.tsx:14`, `MiniCapture.tsx:12`) now reading the token. S4 (uncommitted) is closed by
   the tag. **S2 is the only R1 item still open, and W5 owns it.** No package should re-fix B1 or
   S3; put both in every KNOWN AND ACCEPTED list.
6. **STATE.md's 2026-09-28 block claims the "partner network" caveats were removed from
   `/contact`, `/complete` and `/thank-you`.** They were not. Four occurrences are live across
   three files (A10). Swept by rule, not by the list the brief handed me, which named one.
   Fourth consecutive port where the handed list under-counted (T6).
7. **`P0E_STRUCTURAL_INVENTORY.md` section 2 lists `/for` with 5 slugs and `/services` with 6,
   while `PHASE0_PACKAGES.md` says "7 `/for` + 8 `/services` slugs".** The two phase-0 documents
   disagree with each other. The sweep baseline and the data files settle it at 5 and 6.
   `PHASE0_PACKAGES.md` is the wrong one, and it is where the brief's numbers came from.
8. **"30 page files" (the brief) counts admin.** `find src/app -name page.tsx | wc -l` = 30, of
   which **5 are `src/app/admin/**`** and out of the port's lease (`focus-ring.test.ts` already
   excludes them). The wave's real surface is **25 public routes** across 21 page files after
   templating.
9. **`P0E` section 10 says the site has 7 test files; `PHASE0_PACKAGES.md` says 8.** Today it is
   8: the seven `P0E` found plus `src/tests/focus-ring.test.ts`, added by phase 1. Both source
   documents were right when written. Current `npm test` baseline is **80/80** at `6e02711e`;
   use that number, not the 59 or 75 in older blocks.
10. **The brief says "`sweep_baseline.json`, not `link_baseline.json`" - correct, and worth
    keeping.** `docs/crypto/_port/` uses `link_baseline.json` and `docs/ecommerce/_port/` uses
    `sweep_baseline.json`. A verification script lifted from the crypto port will open the wrong
    filename and fail silently on this site.

### E.2 Risks, with my recommended resolution

**R1. The `<details>` FAQ is the single biggest chance to make this site worse.**
Eleven `/services` and `/for` pages, four calculators, the homepage and 32 blog posts emit FAQ
answers into the server HTML today AND assert them in FAQPage JSON-LD. The kit's `FaqSection`
would strip closed answers out of the HTML while leaving the schema asserting them, on every one
of those surfaces at once. It is the exact defect crypto's phase 0 spent a package closing on 222
answers, and two sites have refused the component in writing.
**Resolution: DECLINE it everywhere, in writing, at each call site, naming
`packages/web-shared/design/primitives/FaqSection.tsx`.** Put it in all six briefs as a locked
decision, not as a judgement call, so no builder reaches the opposite answer alone.

**R2. The blog index link floor is the tightest number in the wave.**
`/blog` must serve **37** unique internal links and the site has 32 posts. Any list component
with a page size, a slice or a client-side filter breaches it, and the floor was captured from a
working page so it will not forgive.
**Resolution:** decline `BlogListWithSearch` and `NumberedPagination` in W2's brief up front,
with the 37 as the stated reason, and make "count the unique `href="/...` in the server HTML and
state how you derived it" a blocking acceptance line.

**R3. The homepage ring fix (S2) cannot be verified by any builder.**
It needs a real `:focus-visible` tab-walk with a 320ms settle, ring composited against the
PARENT's ground through a 1x1 canvas because Tailwind v4 returns `oklab()`. W5 cannot run a
browser and must not.
**Resolution:** W5 applies `.ground-dark` and routes the four stat links, and writes the
measurement as a verification-list row. The MANAGER runs it at wave close with
`browser_check.mjs` against the single build. Treat a missing measurement as a FAIL, not as a
pass by omission.

**R4. A shared-shape divergence between W3's two templates.**
`/services/[slug]` and `/for/[slug]` are near-identical files owned by ONE package for exactly
this reason, but they are 117 lines each and an agent can still answer the same question twice.
**Resolution:** W3's brief says in one line: "these two templates are the same shape; whatever
you do to one, do to the other, and diff them at the end to prove it."

**R5. Files the wave creates have no owner.**
`src/components/marketing/` does not exist and W5 will create it. Crypto shipped five net-new
shared files that appeared in no package row and reached nine route families.
**Resolution:** at wave close, `git diff --stat --diff-filter=A port-startups-tech-phase1 HEAD --
startups-tech/web/src`, and every added file gets an owner named in STATE.md or is assigned to M1.

**R6. `#fafaf9` is an arbitrary-value ground and a grounds scan cannot see it.**
The homepage runs five `bg-[#fafaf9]` bands. A `--grounds` capture keyed to named Tailwind
scales reports zero and a builder reads "no rhythm to preserve" (crypto lost a whole section
rhythm to this).
**Resolution:** W5's brief states the five bands explicitly and forbids "normalising" them into
a named scale, which would be a visible colour change nobody asked for. Scan with
`grep -o 'bg-\[#[0-9a-fA-F]\{3,8\}\]'` alongside the named-scale scan, and say which you ran.

**R7. A `ComparisonTable` or `WhatToExpectCard` adoption could author copy.**
Both take caption and label props with defaults. `ComparisonTable` forces a "Most recommended"
pill (T12) and `WhatToExpectCard`'s defaults publish a fee line no page authored.
**Resolution:** locked rule in W5's and W6's briefs: read every default in a kit component's
signature BEFORE adopting it, and if adopting it would render one sentence the page does not
have today, decline it and write why (T13: removing a prop does not remove its default).

**R8. Ambiguity I am NOT resolving, because it is an owner gate.**
The four "partner network" sentences (A10). The estate rule already answers them (memory
`estate_claims_integrity`: the brand IS the firm on every surface, firm voice everywhere), so
the technically correct action is to rewrite them, but they are prose, and the owner ruled
prose is frozen for this port. **Recommendation: bundle them to the owner as ONE plain-English
question after the wave, not as a package.** Blast radius: four sentences on three pages, all
`noindex` except `/contact`. Revert path: a one-line git revert.

---

## F. Wave-close verification list (manager, against ONE `next start` build)

Preflight first, every time: `netstat -ano | grep ":32"` and kill any orphan, then assert the
served title AND the server's age before quoting a single number. The review server on 3201 was
stopped on 2026-09-29; prove the port is free rather than assuming it.

```bash
# 0. one build, nothing else building
cd startups-tech/web && npx next build          # exit 0, page count explained if it moved
cd startups-tech/web && npx next start -p 3201
curl -s localhost:3201 | grep -o '<title>[^<]*'  # must read "Founder Tax Partners | ..."
```

| # | package | URL | command | expected decisive line |
|---|---|---|---|---|
| F1 | all | - | `cd startups-tech/web && npx tsc --noEmit` | no output, exit 0 |
| F2 | all | - | `cd startups-tech/web && npm test` | `Tests 80 passed (80)` or higher, 0 failed |
| F3 | all | - | `python scripts/check_dependency_closure.py` | `OK` across all sites |
| F4 | all | 66 URLs | `node docs/_engines/instruments/sweep.mjs --site=startups-tech --base=http://localhost:3201` compared to `sweep_baseline.json` | `0 link-floor breaches`, `0 dead internal links`, `0 dash regressions`, `0 data-cta regressions` |
| F5 | all | 66 URLs | per-URL `json.loads` on every `ld+json` block (playbook section 5 snippet) | no exception on any URL; a tag-presence check is NOT sufficient |
| F6 | all | - | `grep -rnoE '#[0-9a-fA-F]{6}' startups-tech/web/src/app startups-tech/web/src/components --include=*.tsx` | only `PageShell.tsx`, `StartupsBackdrop.tsx`, `api/og/route.tsx` survive, each with a written reason |
| F7 | all | - | `grep -rnoE 'focus-visible:outline-\[[^]]*\]' startups-tech/web/src --include=*.tsx \| grep -v 'var(--focus-ring)'` | empty |
| F8 | W2 | `/blog` | `curl -s localhost:3201/blog \| grep -oE 'href="/[^"]*"' \| sort -u \| wc -l` | **>= 37** |
| F9 | W2 | 5 category URLs | same, per category | **>= 13, 8, 7, 5, 4** for share-schemes-and-emi, research-and-development, seis-and-eis, saas-and-tech-finance, startup-compliance |
| F10 | W2 | `/blog/seis-and-eis/eis3-certificate-explained` | `curl -s ... \| grep -c 'Related reading'` plus the unique-href count | related rail present; unique hrefs **>= 9** |
| F11 | W2 | any post | `curl -s ... \| grep -o 'class="[^"]*\bprose\b[^"]*"'` then `grep -o '\.prose[ {,:]' <served css> \| wc -l` | non-zero rule count (prose-standard.css is imported; a dead class renders nothing and errors nowhere) |
| F12 | W2 | any post | count capture surfaces in the served HTML | exactly **2** (inline mini + end-of-article), never 1 or 3 |
| F13 | W3 | 13 URLs | loop `/services`, the 6 service slugs, `/for`, the 5 audience slugs, counting unique internal hrefs | **7, 5, 2, 7, 2, 2, 3, 5, 2, 2, 2, 2, 2** or higher |
| F14 | W3 | 11 URLs | every FAQ answer string in the FAQPage JSON-LD is present in the served HTML, normalised to alphanumerics with entities decoded | **100% present**. Normalise properly: stripping `<strong>` inserts a space before a comma and produces false absences (crypto, 4 false positives) |
| F15 | W4 | 5 URLs | `/calculators` >= **4**; each of the four tool routes >= **3** unique internal links | at or above floor |
| F16 | W4 | `/embed/rd-relief-estimator` | `curl -s ... \| grep -c '<header\|<footer\|<nav'` | **0** (the phase-1 chrome bypass survived) |
| F17 | W4 | 4 tool URLs | count `<form` and `grep -o 'get-expert-help'` | exactly **one** capture form per tool page |
| F18 | W5 | `/` | `curl -s localhost:3201/ \| grep -oE 'href="/[^"]*"' \| sort -u \| wc -l` | **>= 18** |
| F19 | W5 | `/` | `node docs/_engines/instruments/browser_check.mjs --site=startups-tech --base=http://localhost:3201` at 1280, tab-walk with a 320ms settle | hero CTA ring **>= 3.0** (was 1.89) and the four gov.uk stat links **>= 3.0** (was 1.67). Composite through a 1x1 canvas; v4 returns `oklab()` |
| F20 | W5 | `/` | `perl -0pe 's{/\*.*?\*/}{}gs; s{//[^\n]*}{}g' src/app/page.tsx \| grep -o '<Eyebrow' \| wc -l` and the same for `section-label` | **9 and 0** (gate row 5, comment-stripped; the raw grep is wrong in both directions) |
| F21 | W5 | - | playbook section 9.1 row 2b, comment-stripped, over `app/page.tsx` + `components/marketing/*.tsx` | `adopted >= 1` OR `declined >= 1`; **`0/0` is a FAIL** |
| F22 | W5R | 6 URLs | unique internal hrefs per route | `/research` >= **6**, startup-formation-survival >= **6**, tech-startup-survival >= **5**, uk-tech-formations >= **5**, rd-tax-relief >= **4**, uk-tech-funding-reliefs >= **4** |
| F23 | W5R | `/research/startup-formation-survival-index` | `browser_check.mjs` contrast at 390/768/1024/1440 | **0** failures (was **16**: twelve 12px markers at 3.09, one 12px `td` at 4.24) |
| F24 | W5R | 6 URLs | `curl -s ... \| grep -c '<title></title>'` and console errors from `browser_check.mjs` | **0** and **0** - the React-19 SVG `<title>` hydration-#418 defect has not returned |
| F25 | W6 | 5 URLs | unique internal hrefs | `/about` >= **0**, `/contact` >= **0**, `/cookie-policy` >= **1**, `/terms` >= **1**, `/privacy-policy` >= **2**, and each well above it now the footer renders |
| F26 | W6 | - | `git diff 6e02711e -- startups-tech/web/src/components/forms startups-tech/web/src/app/api \| grep -E '^[-+].*(formId\|data-cta\|leadConsent\|redirectOnSuccess\|submitLabel)'` | empty |
| F27 | W6 | `/thank-you` | `curl -s ... \| grep -c '<main'` and `grep -c '<h1'` | **1 and 1** (three branches, one renders) |
| F28 | all | 30 routes | `node docs/_engines/instruments/cta_snapshot.mjs --site=startups-tech --base=http://localhost:3201` vs `cta_baseline.json` and vs the phase-1 snapshot | the `(id, placement, goal, href)` triples introduced by phase 1 are **unchanged**; the one authored pre-port id `thankyou-return-article` is byte-identical (T22; an id-only diff passes this defect straight through) |
| F29 | all | - | playbook section 9.1 gate, all 8 rows, comment-stripped, pasted into STATE.md | row 1 >= 1, row 2 reported with distinct/call-site counts, row 2b passes, row 3 non-empty, row 4 = 1, row 5 Eyebrow >= section-label, row 6 every line has a reason, row 7 every gradient file measured stop by stop, row 8 walks >= 1 and gtg = 1 |
| F30 | all | - | `git diff --stat --diff-filter=A port-startups-tech-phase1 HEAD -- startups-tech/web/src` | every ADDED file has a named owner in STATE.md or is assigned to M1 |

Expect roughly 2 in 30 of these to fail on a wrong expected value in a brief rather than a site
defect; that was the charities ratio. Settle each one at the element, not by argument.

---

## G. Model tiering and agent count

| package | model | why |
|---|---|---|
| W2 blog | **Opus** | composes markup on 38 prospect-facing routes |
| W3 services + audience | **Opus** | 11 prospect-facing routes, and claims-adjacent data files |
| W4 calculators + embed | **Opus** | the highest-intent surfaces, and a partner-facing embed |
| W5 homepage | **Opus** | the page the owner walks first, and the S2 ring fix |
| W5R research | **Opus** | 2,740 lines of published data; an error publishes a wrong figure |
| W6 flow + legal + forms | **Opus** | the conversion surface and the compliance pages |
| reviewer 1 (design, rendered DOM) | **Opus** | every review on this programme found real defects |
| reviewer 2 (content, rendered DOM) | **Opus** | content review is Opus by standing rule |
| M1 mop-up | **Opus** | cross-seam, by definition the defects nobody scoped |
| gap-fixers (up to 3) | **Sonnet** | bounded, named, file:line-specified fixes with no judgement |
| re-review | **Opus** | T7: a fix pass introduced a blocker last time |

**Sonnet is used for nothing that composes page markup a prospect sees.** There is no
registry-or-config-only package in this wave, which is why no builder row is Sonnet.

**Agent budget.** Owner priced the whole port at about **36**. Spent: **11** (9 in phase 0, 2 in
phase 1). Remaining: **25**.

| stage | agents |
|---|---|
| the wave (W2, W3, W4, W5, W5R, W6) | 6 |
| adversarial reviews (design + content, concurrent) | 2 |
| gap-fix round (M1 + up to 3 gap-fixers) | 4 |
| re-review | 1 |
| **total for phases 2 to 6** | **13** |
| **port total** | **24 of about 36** |

That leaves roughly **12 agents of headroom** for a second gap-fix round if a review fails hard,
or for a kit-adoption uplift package if the owner's walk reaches crypto's "not there" verdict.
Report agents used after the wave, as a number, alongside any CI or deploy noise caused.
