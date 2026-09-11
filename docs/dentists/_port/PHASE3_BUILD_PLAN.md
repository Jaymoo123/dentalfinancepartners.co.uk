# DENTISTS PORT — PHASE 3 BUILD PLAN: BLOG SUBSYSTEM, ARTICLE TEMPLATE, HUBS, INDEXES

Planned 2026-09-11. READ-ONLY plan. Nothing in this file was built.
Site: `Dentists/web`. Reference: `Property/web` (local components, not the kit).
Kit: `packages/web-shared/design/`.

Builds on `DISPOSITION_SLICE1.md` §F, `DISPOSITION_SLICE2.md` §B/§C, `FUNNEL_BASELINE.md`,
`docs/dentists/DESIGN_DELTA.md`. Every claim below was re-derived; corrections are in §10.

**The one-line summary.** This site's articles produce every form start and no completions
because the only ask that converts sits at the bottom of the page with nothing pointing at
it, and the asks that people DO start are gated behind a message-length floor this site
raised above the estate default. Both are fixable in two files. Everything else in this
phase is restyling.

---

## 0. REALITY CHECK — what phase 1 already did, and what is NOT work

Verified by reading the files at HEAD (`f1197d7a feat(dentists): phase 1 brand layer …`).

| Claimed as phase-3 work somewhere | Actual state at HEAD | Verdict |
|---|---|---|
| Closing CTA `<h2>` is `text-[var(--gold)]`, 2.78:1 on 223 posts | `BlogPostRenderer.tsx:326` is `text-primary-700` | **DONE in phase 1. Do not re-open.** |
| Author-aside eyebrow is gold | `:314` is `text-primary-700`; the `/about` link at `:317` likewise | **DONE in phase 1.** |
| `.article-body.prose-blog a` is gold text | `globals.css:375-386` already navy word + gold underline, with a comment naming the 3.76 figure it replaced | **DONE in phase 1.** |
| Desktop sidebar is "unclamped" (SLICE1 §F.6 row 6) | The renderer's wrapper at `:360` is `sticky top-24` with no clamp, but the component it holds, `web-shared/content/TableOfContents.tsx:98`, already carries `sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto` | **PARTLY FALSE.** The TOC clamps itself. The only real change is adding a second child above it, which needs the wrapper to clamp. |
| Blog category filter uses raw-label equality (the Solicitors bug) | `[category]/page.tsx:79` is `slugifyCategory(p.category) === category` | **Correct already. Do not "fix".** |
| Post FAQs are rendered as escaped text | `:300` renders `dangerouslySetInnerHTML` | Correct already; see §8. |
| 223 posts render through one file | `BlogPostRenderer.tsx`, 369 lines, single consumer `app/blog/[category]/[slug]/page.tsx` (77 lines, data-only) | Confirmed |

Still live and owned by this phase: the photo hero, the missing `#enquiry-form` anchor, the
TOC-only sidebar, the two `{...p}` payload defects, the derived-hub sibling-strip link loss,
the two dead prose classes on guides and resources, the `NextStepOffer` gold button
(`NextStepOffer.tsx:41`, navy label on gold = 6.19, passes; its EYEBROW at `:31` is
`text-[var(--gold-strong)]` on `--surface-elevated` = 3.76 and fails).

---

## 1. THE CONVERSION QUESTION

**Premise re-verified and TRUE:** 374 of 450 sessions land on blog articles; articles produced
24 of 30 form starts and 0 completions; both completions came from `/contact`.

`FUNNEL_BASELINE.md` listed the per-`form_id` breakdown as NOT PULLED. It is pulled here.

```sql
select coalesce(props->>'form_id','(none)') form_id,
 count(*) filter (where event_name='form_start') starts,
 count(*) filter (where event_name='form_submit') submits,
 count(*) filter (where event_name='lead_submitted') leads,
 count(*) filter (where event_name='form_error') errs,
 count(*) filter (where event_name='form_field_abandon') abandons
from web_events where site_key='dentists' and is_bot=false
 and event_name in ('form_start','form_submit','lead_submitted','form_error','form_field_abandon')
group by 1 order by starts desc;
```

**Dentists, full 92-day event record (`min(ts)` = 2026-06-11):**

| form_id | where it renders | starts | submits | leads | form_errors | abandons |
|---|---|---:|---:|---:|---:|---:|
| `calc_result_gate` | `tools/premium/ResultGateModal.tsx`, modal over the in-article premium calculator | 23 | **0** | 0 | **49** | 27 |
| `mobile_tool` | `tools/premium/MobileToolSlot.tsx`, in-article mobile replacement for that calculator | 23 | 1 | 1 | 5 | 8 |
| `lead_form` | `forms/LeadForm.tsx` — the article CLOSING panel and `/contact` | **8** | 4 | **4** | 1 | 17 |
| `resource_block` | `resources/GateOrForm.tsx`, mid-article split | 7 | 0 | 0 | 0 | 3 |
| `calc_result` | `calculators/CalcResultCta.tsx`, public calculator routes | 4 | 0 | 0 | 1 | 2 |
| `inline_mini` | `blog/InlineMiniLeadForm.tsx`, mid-scroll fallback | **0** | 0 | 0 | 0 | 0 |

Same query on Property, 2026-08-23 onward: `lead_form` 52 starts → **30 submits (58%)**;
`calc_result_gate` 146 → 10; `resource_block` 29 → 0; `inline_mini` 2 → 0.

### 1.1 Where is the ask on a Dentists article, and what does it ask for

Reading `BlogPostRenderer.tsx` top to bottom, an article carries up to four asks:

1. **`PremiumUpgrade` island** (`:236`) after the first h2. Interacting with its calculator
   raises the `ResultGateModal`, `formId="calc_result_gate"`. On mobile it is replaced by
   `MobileToolSlot`, `formId="mobile_tool"`.
2. **`GateOrForm`** (`:252` or `:265`), `formId="resource_block"`, at the ~50% split. Only
   when `hasEnabledResource(topic)`.
3. **`InlineMiniLeadForm`** (`:283`), `formId="inline_mini"` — renders ONLY on the
   else-branch, i.e. topics with no premium mapping. Zero events in 92 days.
4. **The closing panel** (`:325-335`): heading, body, `<LeadForm redirectOnSuccess={false}>`,
   `formId="lead_form"`. Seven fields. This is the ask that produces this site's leads.

All four ask for the same thing: name, email, phone, role, and a free-text message. All are
in-flow, none is interruptive except the result-gate modal, which pre-dates the port.

### 1.2 Failure one: the ask people reach is gated behind a wall this site built itself

`packages/web-shared/leads/capture-steps.ts:15-17`:

```ts
/** Default message floors. Lowered from Property's original 40/8 — 96% of errors hit the floor. */
export const MINI_MESSAGE_MIN_CHARS = 20;
export const MINI_MESSAGE_MIN_WORDS = 4;
```

`Dentists/web/src/components/tools/premium/ResultGateModal.tsx:135-136` overrides it back:

```tsx
messageMinLength={40}
messageMinWords={8}
```

The shared `packages/web-shared/leads/ResultGateModal.tsx:77-88` passes **no override**, so
every other site on the estate runs 20/4. Dentists is the only consumer of the local fork.

Every single `form_error` on this site, on every form, is `field: "message"`, `flow: "multi"`
(the `NEXT_PUBLIC_MINIFORMS_MULTISTEP` flag is on). 49 of the 55 are `calc_result_gate`, and
13 of those came off one article, `/blog/associate-tax/maternity-paternity-leave-associate-dentists-uk`.
**23 starts, 49 message rejections, 0 submits.** More than two rejections per person who
started. Property, on the shared 20/4, converts 10 of 146 on the same component.

This is not a design defect and it is not the template. It is one two-line override.

### 1.3 Failure two: the ask that converts has nothing pointing at it

`lead_form` converts **4 of 8 starts** on this site and produced **4 of its 5 KPI-clean
leads**. In the 19-day window it was started twice, both on `/contact`, **zero times on an
article** — despite rendering at the bottom of all 223 of them.

Element by element against `Property/web/src/components/blog/BlogPostRenderer.tsx`:

| Property has | line | Dentists has | Consequence |
|---|---|---|---|
| `id="enquiry-form"` + `scroll-mt-24` + `aria-labelledby` on the closing panel | `:306-315` | **none** (`BlogPostRenderer.tsx:325`) | nothing on the page can link to it |
| Header skip link `href="#enquiry-form" data-cta="blog_skip_to_form" data-cta-placement="article_header" data-cta-goal="form"` | `:237-240` | **none** | no path from the top of a 2,000-word article to the ask |
| An in-content aside injected mid-body carrying `<a class="aside-cta" href="#enquiry-form">Talk to a specialist →</a>` | `:105` | **none** | no mid-read path either |
| `BlogSidebarCta` above the TOC, per-category copy, anchors `#enquiry-form` | `:407` | sidebar holds the TOC and nothing else (`:359-363`) | the whole desktop sidebar is navigational, never persuasive |
| Per-category CTA copy (`ctaCopy`) driving panel, sidebar card and button label | `:315-325` | one global string, `activeCta.blog.*` from `niche.config.json`, identical on all 223 posts across 12 unrelated intents | the ask never matches what the reader came for |

The baseline crawl agrees from the other side: an article page carries **3 `data-cta`
attributes** in total (`sweep_baseline.json`, `ctas`). Property's carries the skip link, the
sidebar card and the panel on top of chrome.

So the picture is consistent and has no gap in it: readers meet the mid-article gate, hit a
message wall, and give up; the form that actually works is 2,000 words below them with no
anchor, no link and no mention.

### 1.4 The minimum change that would plausibly move start-to-complete

Ranked by expected effect per line changed. Nothing here is a new interruptive surface.

| # | Change | Files | Design or capture? |
|---|---|---|---|
| **A** | Delete `messageMinLength={40}` / `messageMinWords={8}` from `ResultGateModal.tsx:135-136` so the gate inherits the shared 20/4 | 1 file, 2 lines | **Capture-surface tuning → owner-notify.** Not a new surface, not consent wording. It reverts a local fork to the estate default whose own comment says 96% of errors hit the higher floor. Revert = re-add two lines. **Recommend: do it.** |
| **B** | Give the closing panel `id="enquiry-form" scroll-mt-24 aria-labelledby`, and add the article-header skip link | `BlogPostRenderer.tsx` | **Design.** No gate. |
| **C** | Add `BlogSidebarCta` above the TOC in the desktop sidebar, anchored to `#enquiry-form` | `BlogPostRenderer.tsx` + kit component | **Design** (it is an anchor, not a form). No gate. |
| **D** | Per-category CTA copy map, 12 keys, feeding panel + sidebar + button label from one binding | new local map file | **Design / copy.** No gate. |
| **E** | Retire `InlineMiniLeadForm` (0 starts in 92 days) or leave it; it costs nothing either way | — | Leave it. Absence of data is a question, not a finding; it only renders on unmapped topics. **Do not delete in this phase.** |

**A is the single highest-value line in this plan and it is not design work.** B+C+D are the
design work, and they are what gives `lead_form` a chance to be started on an article at all.

**What is explicitly NOT proposed:** no modal, no popup, no banner, no exit-intent, no
sticky form, no change to `leadConsentText`, no change to the number of fields, no change to
the 3-moment split logic (`splitContentEarly` / `splitRemainderForGate` /
`splitContentAtMidScroll`), and no new form on any surface that does not have one today.

### 1.5 How to read the result, and do not read it off leads

At 2 leads per 19 days a single lead moves leads-per-1k by 2.2. Read this off:
`calc_result_gate` message-error rate per start (49/23 today), `calc_result_gate` submits per
start (0/23 today), and `lead_form` starts on `page_path like '/blog/%'` (0 today). All three
are countable within a fortnight of deploy. Bing is 15x Google's clicks on this site, so any
search-side read must include Bing.

---

## 2. THE SMALLEST EDIT POINT

- **223 article pages = 1 file.** `Dentists/web/src/components/blog/BlogPostRenderer.tsx`
  (369 lines). Its only consumer is `app/blog/[category]/[slug]/page.tsx` (77 lines,
  data-only, **LEAVE**). Nobody opens 223 markdown files in this phase.
- **12 category hubs = 2 files today** (`[category]/page.tsx` renders 7; five hand-written
  files render the other 5), converging to 1 component.
- **6 pillar guides = 1 file.** 6 resource topics = 1 file.
- Total surface of this phase: **10 application files + 1 new copy map + 1 new local
  component**, rendering 248 pages.

The only content-file work in the whole phase is the 7 missing hub briefings (WP5), and that
is 7 new prose blocks, not 223 edits.

---

## 3. WORK PACKAGES

Five packages. Each brief must carry: "correct this brief if its premise is false" (T11),
"every git command from the monorepo root, never from `Dentists/`" (T3), "builders never
build; the manager builds serially" (T1), and `python scripts/check_dependency_closure.py`
in acceptance (T24).

### WP1 — The article ask (THE PHASE)
**Files (exclusive):**
- `Dentists/web/src/components/blog/BlogPostRenderer.tsx`
- `Dentists/web/src/components/tools/premium/ResultGateModal.tsx` (lines 135-136 only)
- NEW `Dentists/web/src/lib/blog/cta-copy.ts` (per-category map)
- NEW `Dentists/web/src/lib/blog/cta-copy.test.ts`

**Reference, with line anchors:** `Property/web/src/components/blog/BlogPostRenderer.tsx`
— skip link `:237-240`, in-content aside CTA `:105`, closing panel `:306-325`,
`BlogSidebarCta` mount `:407`. Kit: `packages/web-shared/design/blog/BlogSidebarCta.tsx`
(anchors `#enquiry-form`, takes `copy` + `buttonClassName`; pass the Dentists button recipe
or the card shows a different brand colour from every other button on the page).

**Do:**
1. Remove the two `messageMin*` lines from `ResultGateModal.tsx`. Change nothing else in
   that file — it is a modal, it is pre-existing, it is not being redesigned here.
2. Closing panel: `id="enquiry-form"`, `scroll-mt-24`, `aria-labelledby="enquiry-form-heading"`,
   and `id="enquiry-form-heading"` on its `<h2>`.
3. Article-header skip link: `href="#enquiry-form"`, `data-cta="blog_skip_to_form"`,
   `data-cta-placement="article_header"`, `data-cta-goal="form"`. New id, new placement value
   — both are ADDITIONS to the vocabulary, not rewrites of an existing id (T22 is about
   changing live values; adding a new one is safe and starts its own baseline).
4. Sidebar: one wrapper `sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto` holding
   `BlogSidebarCta` then `TableOfContents`. The TOC's own clamp at
   `web-shared/content/TableOfContents.tsx:98` then becomes redundant; leave it, it is
   harmless and the file is not in this package.
5. Per-category copy map, exactly 12 keys matching `slugifyCategory` output. ONE binding
   feeds the panel heading, the panel body, the submit label and the sidebar card. A test
   asserts every category slug produced by `getAllCategories()` has a key.
6. Photo hero → header card (`rounded-xl bg-slate-50 p-8`: eyebrow, h1, meta pills, summary);
   `post.image` becomes an in-body `<figure>`; photo credit moves with it. **Check first:**
   unlike Solicitors, Dentists posts DO carry real `image` and `imageCredit` values (verified
   on `uda-value-explained-for-uk-dentists.md`), so the credit must survive somewhere or the
   Pexels attribution is lost.
7. Related list → kit `RelatedArticles`. `NextStepOffer` eyebrow (`NextStepOffer.tsx:31`,
   `text-[var(--gold-strong)]` = 3.76 on `--surface-elevated`) is **OFF LIMITS here** — it is
   WP4's file.

**Do NOT touch:** the 3-moment split logic, `keyTakeaways`, `LeadForm`, `MiniCapture`,
`leadConsentText`, `activeCta` in `niche.config.json`, the FAQ `<dl>` (see §8), any existing
`data-cta` id, goal or placement value.

**Acceptance:**
- `npx tsc --noEmit`, `npm test` green.
- Rendered article contains exactly one `id="enquiry-form"` and at least two in-page links
  to it (skip link, sidebar card).
- `grep -c 'messageMinLength' Dentists/web/src` returns 0.
- FAQ answer count in the DOM equals `post.faqs.length` (see §8 test).
- `data-cta` id/goal/placement set on a rendered article is a strict SUPERSET of the pre-port
  set, with no value changed (T22). Diff against `sweep_baseline.json`.
- Unique internal links on every article route ≥ its floor (§7).

### WP2 — `/blog` index
**Files (exclusive):** `Dentists/web/src/app/blog/page.tsx`.
**Reference:** kit `design/blog/BlogListWithSearch.tsx`, `HubArticleList.tsx`,
`primitives/NumberedPagination.tsx`; `Property/web/src/app/blog/page.tsx` for anatomy.
**Do:** fix the payload defect at `:30-33` (`posts.map(p => ({...p, categorySlug}))` ships all
223 `contentHtml` bodies into a `"use client"` bundle) by projecting to
`{slug,title,summary,category,categorySlug,date,readTime}`; swap `contentNarrow` for
`siteContainerLg`; navy motif hero; add `CollectionPage` + `BreadcrumbList` JSON-LD; add a
closing `LeadCTAPanel` with `id="book"` (this route has **zero** capture surface today and is
the site's second-highest-traffic family — an in-flow closing panel, not interruptive, no
gate).
**OFF LIMITS:** `[category]/page.tsx`, the five static hub files, `BlogPostRenderer.tsx`,
`BlogListWithSearch.tsx` (WP3 owns the component swap).

### WP3 — The 12 category hubs, converged
**Files (exclusive):**
- `Dentists/web/src/app/blog/[category]/page.tsx`
- `Dentists/web/src/app/blog/{associate-tax,buying-a-practice,practice-accounting,practice-finance,vat-and-compliance}/page.tsx`
- `Dentists/web/src/components/blog/BlogListWithSearch.tsx` (retire in favour of the kit)

**Reference:** kit `design/blog/BlogCategoryHub.tsx` — **pass every copy prop explicitly**, it
defaults Property's `proofPoints` and standfirst (field notes §2). Verify no Property string
survives in the rendered DOM.
**Do:** converge all 12 onto `BlogCategoryHub` with a briefing slot; fix the sibling strip at
`:88` (`categories.filter(c => !STATIC_HUB_SLUGS.has(c.slug))` — the 7 derived hubs link to
each other and never to the 5 static ones, costing 7 × 5 links); same payload projection as
WP2 at `:78-80`; add `#enquiry-form` `LeadCTAPanel` using WP1's copy map so hub and article
never disagree; drop the page-level `BreadcrumbList` JSON-LD if the kit `Breadcrumb` emits it
(check, do not assume — double emission is the failure mode).
**Do NOT** delete the five static route files. That is a routing change and an open owner gate
(SLICE1 §I.5). Lift their prose into the briefing slot and leave the routes standing.
**Acceptance:** `/blog/practice-finance` ≥ 50 unique internal links, `/blog/associate-tax` ≥ 45,
`/blog/practice-accounting` ≥ 39, and each derived hub ≥ its floor (§7) — the sibling fix
should push all seven derived hubs UP, not merely hold. Every post lands in exactly one hub
(guard test; `content/blog` carries case variants of 6 labels that only merge correctly
because `slugifyCategory` lowercases — assert that, do not assume it).

### WP4 — Pillar guides and resource topics
**Files (exclusive):**
- `Dentists/web/src/app/dental-guides/[slug]/page.tsx` (6 pages)
- `Dentists/web/src/app/dental-guides/page.tsx`
- `Dentists/web/src/app/resources/[topic]/page.tsx` (6 pages)
- `Dentists/web/src/components/intent/NextStepOffer.tsx` (eyebrow only)

**Do:**
1. **Two dead stylesheets, both live defects.** `dental-guides/[slug]/page.tsx:97` uses
   `prose-dental`, which is defined nowhere (`grep -rn "prose-dental" Dentists/web/src` hits
   only the attribute). `resources/[topic]/page.tsx:117` uses `prose prose-slate prose-*`,
   and `@tailwindcss/typography` is not installed anywhere in the monorepo. Both bodies
   render with no heading hierarchy and no list markers. Fix both by reusing
   `.article-body.prose-blog` from `globals.css:309-440`. **Do not add the typography plugin**
   (T24: a new dependency for something the site already has a stylesheet for).
2. `resources/[topic]/page.tsx:144-146` has `scroll-mt-24` on a panel with no `id`. Give it one.
3. `resources/[topic]/page.tsx:58` `style={{ color: "var(--gold)" }}` — inline style bypassing
   the token layer, 2.78 on white. Replace with a ramp class.
4. `"We will be in touch within 24 hours."` at `dental-guides/[slug]/page.tsx:177` — banned
   turnaround promise on 6 pages. Rewrite. (The `/services/[slug]:244` twin is NOT this
   phase's file.)
5. `NextStepOffer.tsx:31` eyebrow `text-[var(--gold-strong)]` on `--surface-elevated` = 3.76.
   To the ramp. Leave the BUTTON at `:41` alone: navy label on gold = 6.19, it passes, and the
   DESIGN_DELTA explicitly says existing navy-on-gold buttons stay.
6. Guides get the blog sidebar anatomy (TOC + `BlogSidebarCta`); guides are the longest pages
   on the site and have neither.
7. **Keep the gate/download logic exactly** (`isXlsxEnabled`, `resourceForTopic`). Restyle only.

**OFF LIMITS:** `services/[slug]`, calculators, `BlogPostRenderer.tsx`, hub files.

### WP5 — Seven hub briefings (content, Opus-only)
**Files (exclusive):** the briefing content consumed by WP3's 7 derived hubs.
7 hubs × 3-4 ruled sections, FT-plain, second person, every figure re-derivable from
`docs/dentists/house_positions.md`. No em-dashes. No pricing, no turnaround promises.
**OFF LIMITS:** every `.tsx` file in WP1-WP4.

---

## 4. DEPENDENCIES AND SERIALISATION

```
WP1 (copy map) ──┬──> WP3 (hubs consume the same map)
                 └──> WP4 (guides consume BlogSidebarCta the same way)
WP3 ──> WP5 (briefing slot must exist before briefings are written into it)
WP2 ── independent of WP1/WP3/WP4 apart from the shared kit imports
```

- **Serial:** WP1's `cta-copy.ts` lands before WP3 and WP4 start. Everything else is parallel.
- **Serial, absolute:** the manager builds. One `next build` at a time, never two agents
  (T1). No builder runs any git command.
- WP2 and WP3 both retire the local `BlogListWithSearch`; **WP3 owns that file**, WP2 only
  changes its call site. If they run concurrently, WP2 waits for WP3's component swap.
- WP5 is last and touches no code.

---

## 5. LINK FLOORS (T14)

Baseline `docs/dentists/_port/sweep_baseline.json`, production SHA
`18b4f25f39cd0c4aa084e582d69a87c8a10710ac`: **5,537 unique internal links across 283 URLs,
808 `data-cta` attributes, 1,186 dashes.** Any decrease in links or CTAs is a blocker.

Floors this phase must hold or beat:

| Route | Unique internal links floor | `data-cta` floor |
|---|---:|---:|
| `/blog` | **35** | 2 |
| `/blog/practice-finance` | **50** | 2 |
| `/blog/associate-tax` | **45** | 2 |
| `/blog/practice-accounting` | **39** | 2 |
| `/blog/buying-a-practice` | 30 | 2 |
| `/blog/capital-allowances-and-equipment` | 30 | 2 |
| `/blog/goodwill-and-practice-sale` | 30 | 2 |
| `/blog/nhs-contracts` | 30 | 2 |
| `/blog/nhs-pension` | 30 | 2 |
| `/blog/locum-tax` | 29 | 2 |
| `/blog/vat-and-compliance` | 27 | 2 |
| `/blog/general` | 25 | 2 |
| `/blog/specialist-services` | 20 | 2 |
| Article template (223 routes) | **min 17, median 20, max 35 — assert per route, never against the median** | 3 |
| `/dental-guides` | 17 | — |
| `/dental-guides/*` (6) | 14 each | — |

**T14 applies directly to three of this phase's changes:**
- The skip link and the sidebar card both point at `#enquiry-form`, a same-page fragment.
  **They add ZERO unique internal links.** Do not report them as a link gain.
- `BlogSidebarCta`'s button is also `#enquiry-form`. Same, zero.
- The derived-hub sibling fix (WP3) DOES add links: 5 new destinations × 7 hubs = up to 35
  unique-link gains, subject to whether those 5 hubs are already linked from the page's
  category rail. Verify per route; do not claim 35.
- Retiring the photo hero removes the photographer/source outbound links on posts that have
  them. Those are `rel="noopener nofollow"` EXTERNAL links and do not count against an
  internal-link floor, but they are an attribution obligation. Keep them on the in-body figure.

---

## 6. STRUCTURED DATA (T17)

**Re-derived, and the brief's numbers are wrong.** Command:

```python
# per post: parse frontmatter, count faqs[], and count FAQPage docs inside `schema`
```

| Metric | Brief said | Actually | How |
|---|---:|---:|---|
| Posts carrying `faqs` | — | **223 of 223** | yaml parse of every `content/blog/*.md` |
| FAQ answers | 1,367 | **1,469** | sum of `len(faqs)` |
| Posts with verbatim `schema` frontmatter | — | **48** | non-empty `schema` key |
| FAQPage docs rendered | 203 | **223** | 48 from verbatim `schema` (all 48 contain a FAQPage node, 248 questions) + 175 from `buildBlogPostingJsonLd`, which emits FAQPage whenever `post.faqs.length > 0` (`lib/schema.ts:33-47`) |

**The single binding already exists and must stay.** `post.faqs` is the one array.
`BlogPostRenderer.tsx:297` maps it to the DOM; `lib/schema.ts:38` maps the SAME array to the
schema, stripping tags with `.replace(/<[^>]+>/g, "")`. Two `.map()` calls over ONE binding is
the correct shape; T17 forbids two SOURCES, not two consumers of one source.

**Acceptance test (new, in WP1):**
```
for a sample of posts across all 12 categories, and for every post in CI:
  count of <dt> (or FAQ question nodes) in the rendered DOM === post.faqs.length
  count of mainEntity in the emitted FAQPage === post.faqs.length
  every rendered answer's text, tags stripped, === its schema acceptedAnswer.text
```
This is exactly the check that currently returns 0 mismatches. It must still return 0.

---

## 7. THE KIT `FaqSection` — VERDICT: DO NOT ADOPT ON DENTISTS

`packages/web-shared/design/primitives/FaqSection.tsx:34-43` renders
`<Accordion type="single" collapsible>` with `<AccordionContent><p>{faq.answer}</p></AccordionContent>`.
`primitives/accordion.tsx` wraps `@radix-ui/react-accordion` with **no `forceMount`**, so a
closed item's content is not in the server HTML at all.

Evidence measured on this site, not inherited:

1. **1,469 answers on 223 posts would leave the server HTML.** Today all 1,469 are
   server-rendered inside `<dd>` (`BlogPostRenderer.tsx:300`). The JSON-LD would still carry
   them, so crawlers survive — but the visible-DOM / JSON-LD parity that currently measures 0
   mismatches would become 1,469 vs 0, and this site's answer-box surface (`keyTakeaways` plus
   the FAQ block) is explicitly its GEO asset.
2. **Exactly 1 of 1,469 answers contains real HTML**, and it is an internal link:
   `content/blog/wealth-management-for-dentists-uk.md:51` carries
   `<a href="/blog/goodwill-and-practice-sale/dental-practice-succession-planning-family-transfer">`.
   The kit would render that as literal visible markup and cost that route one unique
   internal link (T14).
3. T8 is the trap waiting on the other side: "fix" it with `forceMount` and every answer on
   223 pages renders permanently expanded, because `forceMount` pins `present` and `hidden` is
   never set.

**Recommendation: keep the existing hand-rolled `<dl>` and restyle it in place.** It is
server-rendered, it is already `dangerouslySetInnerHTML`, it is already the single binding,
and it is 12 lines. This is the laziest option and it is also the correct one. Log the kit
gap; do not edit the kit to fix it (T12 — that would change Property and 18 other sites).

Solicitors reached the same verdict on the same component for the same reason at a different
scale (7 of 1,245 answers). Dentists' ratio is lower, the consequence is identical.

---

## 8. ACCESSIBILITY — WHO OWNS WHAT

| Item | Measured | Owner |
|---|---|---|
| **In-page anchor targets have `scroll-margin-top: 0` under a sticky header** | `grep -rn "scroll-margin\|scroll-mt" Dentists/web/src/app/globals.css` returns **nothing**. Every `<h2 id>`/`<h3 id>` the TOC links to lands under the sticky header. | **THIS PHASE (WP1).** The TOC is this phase's component and it is the thing doing the linking. One rule, `.article-body.prose-blog :is(h2,h3)[id] { scroll-margin-top: 6rem }`, fixes all 223 posts, all 6 guides and all 6 resource topics at once, because all three use the same stylesheet after WP4. |
| **`globals.css` has NO `@layer` anywhere** — every rule in it, including the whole `.article-body.prose-blog` block, is unlayered and beats every Tailwind utility (the Medical incident, field notes §4) | `grep -n "@layer" Dentists/web/src/app/globals.css` → 0 hits | **Flag now, fix in a token/chrome phase, NOT here.** There is no bare `a {}` rule (the link rules are scoped to `.article-body.prose-blog a`), so the Medical failure mode is not live. But any builder who styles an article-body link with a utility class will find it silently ignored. Put that sentence in WP1's and WP4's briefs. |
| **~350 duplicate `id` attributes across 32 content files** | Re-derived: **348 duplicate occurrences across 32 files**, all in `content/**/*.md` bodies; worst is `can-you-claim-aia-on-second-hand-assets.md` at 24 | **NOT this phase.** These are content-body ids, not template ids. `addHeadingIds` (`lib/markdown-utils.ts:1-17`) only matches bare `<h2>`/`<h3>`, so it neither creates nor repairs them. A content phase owns it. Fixing 32 markdown files inside a template port is exactly the "touching 223 files" mistake this plan exists to avoid. |
| Author aside broken class stack | `BlogPostRenderer.tsx:308` is `hidden sm:block shrink-0 … flex items-center justify-center` — `block` wins, `flex` is dead, the icon is not centred | **THIS PHASE (WP1).** One class. |

---

## 9. RISKS AND AMBIGUITIES, WITH MY RESOLUTION

| # | Risk | My resolution |
|---|---|---|
| 1 | The 23/0 result-gate figure could be "unlucky" rather than "broken" | 49 message rejections against 23 starts is not luck. Property on the shared floor gets 10/146. **Ship the override removal, read the error-per-start rate at 14 days.** |
| 2 | Removing the message floor lowers lead QUALITY; the 40/8 override may have been deliberate | It is undocumented and unique to this site. The shared comment says the estate lowered it BECAUSE 96% of errors hit it. **Recommend removal, tell the owner it happened, watch lead `message` length for a fortnight.** Revert is two lines. |
| 3 | Retiring the photo hero loses Pexels attribution | Dentists posts really do carry `image` + `imageCredit` (unlike Solicitors, where all 196 were empty). **The credit moves to the in-body figure. Do not delete the branch.** |
| 4 | Converging the 5 static hubs could delete 5 routes | **Do not.** Lift the prose into the briefing slot, leave the routes. Deletion is an open owner gate. |
| 5 | Cutover re-baselines 18 armed `monitored_pages` rows, 16 of them blog articles, last expiry 2026-10-07 | Owner already took this decision on 2026-09-11: proceed now, accept the re-baseline; deploy is separately gated. **No action.** |
| 6 | `inline_mini` has 0 events in 92 days — broken, or just never rendered? | It renders only on the else-branch (topics with no premium mapping). Absence of data is a question. **Do not delete, do not "fix". Note it and move on.** |
| 7 | New `data-cta` ids (`blog_skip_to_form`, `blog_sidebar_book`) and a new placement (`article_header`) | These are ADDITIONS. T22 is about silently CHANGING live values. Additions start their own baseline and split nothing. **Safe. But the 808-attribute baseline must go UP, never down.** |
| 8 | `resource_block` is 7/0 here and 29/0 on Property — a second, estate-wide zero | Out of this phase's scope to diagnose, but worth naming: the Property consent incident's residual was also `resource_block` at 0 leads. **Flag to the owner as an estate question, do not touch the component here.** |
| 9 | The kit `BlogCategoryHub` ships Property's `proofPoints` and standfirst by default | Pass every copy prop explicitly and grep the rendered DOM for "landlord" and "property" before sign-off. |

---

## 10. WHAT I RE-VERIFIED, AND WHAT WAS FALSE

**TRUE:** 223 posts (`ls content/blog/*.md | wc -l`); 12 slugified categories, 5 static hub
files + 7 rendered by `[category]`; 6 dental-guides; 6 resource topics;
`BlogPostRenderer.tsx` = 369 lines and is the sole renderer of all 223; all six template
paths in the brief exist at the stated line counts (92 / 181 / 77 / 187 / 166 / 205); blog
bodies ARE raw HTML in frontmatter, split by `splitContent*` and injected with
`dangerouslySetInnerHTML` — **no renderer change treats them as markdown**; 83% blog-article
sessions, 24 starts, 0 completions; ~350 duplicate ids = 348 across 32 files;
`scroll-margin-top` is genuinely absent site-wide.

**FALSE or imprecise:**
1. **"203 FAQPage documents and 1,367 answers."** It is **223 documents and 1,469 answers**.
2. **"The sidebar is unclamped."** The renderer's wrapper is; the TOC component clamps itself
   at `TableOfContents.tsx:98`.
3. **The closing-CTA heading and author eyebrow were already fixed in phase 1** — the brief
   says so and it is correct; SLICE1 §F.1 rows 4 and the §B.2 "2.78 on 223 pages" line are now
   stale and should not be re-worked.
4. **`FUNNEL_BASELINE.md` listed the per-`form_id` vocabulary as NOT PULLED.** It is pulled in
   §1 above. Six form ids exist on this site: `calc_result_gate`, `mobile_tool`, `lead_form`,
   `resource_block`, `calc_result`, `inline_mini`.
5. Playbook **T8, T15, T16, T19, T22, T26, T27 exist; "T17" is trap 17 in §6 and is the FAQ
   one** — the brief's list is right, but T15 (animated counters) and T16 (`role="img"`) have
   **no surface in this phase**: there is no counter and no chart on any blog, hub or guide
   template. Do not budget work for them here.

---

## 11. OWNER QUESTIONS, PLAIN ENGLISH

1. **The pop-up that asks for your details before showing a calculator result currently makes
   people write at least 40 characters and 8 words before it will accept them.** Every other
   site we run asks for 20 and 4. In three months, 23 people started that form here, 49 times
   it told them to write more, and nobody ever finished. Can we drop it to the normal amount?
   (Recommend yes. It takes two lines to undo.)
2. **Right now, nothing on an article points at the form at the bottom of it.** No link, no
   button, no mention. We want to add a small card in the sidebar and a "talk to a specialist"
   link near the top, both of which just jump down the same page. Nothing pops up and nothing
   interrupts. OK to proceed? (Recommend yes.)
3. **Five of the twelve blog section pages were hand-written and the other seven were not.**
   We want to give all twelve the same look and write the missing seven introductions. Nothing
   gets deleted and no web address changes. OK? (Recommend yes.)
4. **The blog front page currently has no way to get in touch at all**, and it is our
   second-busiest page. We want to add the normal enquiry panel at the bottom. OK?
   (Recommend yes.)

---

## 12. WHAT I COULD NOT VERIFY

- **Whether the message floor is the actual cause or merely correlated.** 49 rejections on 23
  starts with zero completions is as strong as observational evidence gets, but it is not a
  test. The only proof is the change plus a 14-day read.
- **Whether the ported build's rendered `data-cta` set really is a superset.** That needs a
  crawl of a built site, and this plan is read-only. It is written as an acceptance test.
- **Whether the 5 static hubs' briefings will fit the kit `BlogCategoryHub` slot.** I did not
  read the kit component's body, only its known defaults. WP3's builder checks first.
- **Per-route GSC for any route this phase might touch.** No route retirement is proposed, so
  no read was needed.
