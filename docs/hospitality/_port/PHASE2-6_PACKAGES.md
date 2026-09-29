# hospitality design port, phases 2 to 6: build plan and package list

Read-only planning pass, 2026-09-29. Site `hospitality/web`, brand "Hospitality Tax",
brand hex `#b0532f` on the 600 step, Plus Jakarta Sans. Reference `Property/web`; the two
finished worked examples are `startups-tech/web` (tag `port-startups-tech-complete`,
`docs/startups-tech/_port/PHASE2-6_PACKAGES.md` + `UPLIFT_PACKAGES.md`) and
`generalist/web`. Shared kit `packages/web-shared/design/` at `70047cb6`.

**ONE WAVE, SIX DISJOINT PACKAGES, UPLIFT BUILT IN.** There is no separate uplift round on
this site. startups-tech ran the port and then an uplift because the port had already
declined almost everything; the kit edits that removed those declines (`FaqSection
alwaysRenderAnswers` + `html`, `StatsCounter href`, `TestimonialsSection items/showRating/
footnote`, `Breadcrumb tone`, `CardStack html`, `ProcessTimeline html`, `CoverageCards html`)
are all shipped at `70047cb6` and verified in this pass. So the reasons are gone before the
first builder starts, and the uplift is simply part of each package.

Every path below was verified with `ls` / `find` / `cat` from the monorepo root on
2026-09-29. Every count below was re-derived on the working tree, not copied from a
phase-0 or phase-1 document. Where a phase-0/1 document disagrees with the source, the
source wins and the disagreement is listed in section E.1.

---

## THE LOCKED BLOCK — paste this verbatim into every builder brief

These are owner rulings of 2026-09-29. They are not judgement calls and no builder may
reach the opposite answer alone.

1. **The uplift is part of the port.** "Same thing as other sites, make sure the advanced
   designer kit is ported as well as the lead stuff." A package that ships a correct port
   with nothing adopted has failed.
2. **The judge is the four-marker homepage row**, measured on the RENDERED HTML:
   `animate-ping`, `StatsCounter`, `Backdrop`, `rounded-full`.
   Property 1/2/3/4. generalist 1/2/3/4. startups-tech post-uplift 1/3/3/4.
   **hospitality today 0/0/0/0.** W5 owns moving it.
3. **Gate 9.1 (`DESIGN_PORT_PLAYBOOK.md:738`) is the adoption gate: ADOPT over DECLINE.**
   A decline needs a reason the reviewer can TEST, written at the call site, naming the
   kit FILE PATH. "It did not feel right" is not a reason. A stale reason (one the kit
   has since fixed) is worse than no reason: startups-tech shipped four of those and R5
   caught them.
4. **ADOPT THE KIT BY FEEDING IT THE EXISTING COPY.** Existing prose is NEVER rewritten.
   Every kit component gets the sentences the page already has. Every NEW label is a
   config string (`hospitality/niche.config.json`, read via `@/config/niche-loader` or
   `@/config/site`). **Never invent a quote, a figure or a client.** If a kit component
   cannot be fed without authoring a sentence, DECLINE it and say which sentence.
5. **No sticky bottom bar. No deep-scroll panel. No returning-visitor bar. No next-step
   offer. No newsletter.** Nothing interruptive, anywhere, on any surface. The site has
   zero such components today (`grep -rln 'Modal\|Banner\|Popup\|StickyBar\|ExitIntent'
   hospitality/web/src --include=*.tsx` = 0) and it keeps zero.
6. **An enquiry form on every money page, non-interruptive**, using the kit
   `LeadCTAPanel` with this site's `LeadForm` in its `form` slot. That explicitly
   includes the calculators index and the research index, which have none today.
7. **Never change a designer-set colour.** `#b0532f` is the 600 step. **Buttons stay on
   600 on this site** (`--btn-ground` in `globals.css:149`); the shift-to-700 rule that
   applied on startups-tech does not apply here because 600 already passes the
   white-label floor at 5.09.
8. **`FaqSection alwaysRenderAnswers` everywhere**, on every page that emits FAQPage
   JSON-LD. Add `html` wherever an answer carries authored markup.
9. **`--calc-result-accent` is already declared** (`globals.css:129`, `#e1a58e`, 8.48 on
   slate-900). Do not delete it, do not repoint it, do not "fix" the kit calculator
   headline contrast: it is already answered.
10. **`Breadcrumb` has a `tone` prop** (`Breadcrumb.tsx:29-36`, values `"default"`,
    `"onDark"`, `"onBrand"`). Use `tone="onBrand"` on this site's `bg-[#b0532f]` heroes.
    **No `crumbOnBrand` hack, no hand-rolled trail, no `onDark` on a mid-tone brand ground.**
11. **T12: a body rendered with `dangerouslySetInnerHTML` is a DECLINE site for any kit
    prose component that takes text children** — unless that component has an `html`
    prop, which four of them now do (`CardStack` `page-blocks.tsx:92`, `CoverageCards:35`,
    `ProcessTimeline:27`, `FaqSection:19`). **Open the component before declining it.**
12. **No em-dashes** in user-facing copy. Baseline is `totalDashes: 0` across all 59
    routes and it stays 0.
13. **No hex outside `globals.css`.** Every colour is a `primary-*` / `slate-*` ramp
    utility or a declared token. The only survivors permitted at wave close are
    `HospitalityBackdrop.tsx`, `UnionJack.tsx`, `PageShell.tsx` and `api/og/route.tsx`,
    each of which already carries a written reason and none of which any package owns.
14. **Every builder greps its own owned files for, and reports zero of:**
    - bare `outline-none` (any `focus:outline-none` / `focus-visible:outline-none` with
      no compensating ring on the same element),
    - `data-cta` on a wrapper `<div>` rather than on the control (R5 B2),
    - `@layer components` rules that lose to a utility, and any UNLAYERED rule
      (this site's `globals.css` has exactly one, deliberate, and no package owns it).
15. **The link floor per route from `docs/hospitality/_port/sweep_baseline.json` never
    drops.** Every package's floors are listed in its own section. Count unique
    `href="/..."` in the SERVER HTML and state how you derived it. Report the delta;
    never pad a page to hit a number.

**Locked additions specific to this site, same force:**

16. **`LeadCTAPanel`'s default `eyebrow` is a FEE CLAIM** — `"Free first call, then a
    fixed fee in writing"` (`LeadCTAPanel.tsx:18`). This site does not publish it. All
    four existing mounts pass `eyebrow=""`. **Every new mount passes `eyebrow=""` and
    `formTitle=""`.** R3 G6 on startups-tech was this exact default reaching 14 pages.
17. **`WhatToExpectCard`'s default `items` publish a fee line** (`"Fixed fee quote if you
    decide to proceed"`, `WhatToExpectCard.tsx:22-27`). **Always pass `items` explicitly,
    from the page's own published copy.** T13: removing a prop does not remove its default.
18. **`TestimonialsSection` must be passed `showRating={false}`.** The five-star row
    (`TestimonialsSection.tsx:93-99`) is a CLAIM, not decoration, and this site publishes
    no rating. Do not pass `initials` either: deriving them from the existing attribution
    would invent an identity.
19. **`src/config/site.ts` `leadConsentText` is FROZEN (T19).** Do not touch it, do not
    re-word it, do not pass a different consent string to any form. A change to it cut
    mini-form leads from ~10/wk to 3.9/wk on another site and was reverted.
20. **The `/embed/` surfaces stay chrome-free and form-free.** `PageShell` bypasses chrome
    for `/embed/*` (P1-C spec). `/research/hospitality-openings-closures-index/embed` is
    NOT under `/embed/` and must be checked separately.

---

## A. REALITY CHECK PER SURFACE — what already satisfies the spec

Verified against source on the working tree and, where it is a rendered question, against
the pre-phase-1 build on `:3202`. **Do not invent work here, and do not re-do any row
marked NONE.**

### A0. What phases 0 and 1 already gave EVERY surface

| thing | state | evidence | consequence for phases 2-6 |
|---|---|---|---|
| `@theme` `primary-50..950` ramp | DECLARED, `#b0532f` sits exactly on 600, 700/800 are the site's own existing hover/active hexes | `globals.css:71-92` | every `primary-*` utility compiles. The `LeadCTAPanel` badge defect is closed. Use ramp utilities, never hex. |
| `--btn-ground` trio | `#b0532f` / `#8f421f` / `#6e3118` | `globals.css:149-151` | buttons are 600 here. Locked. |
| `--focus-ring` / `--kit-focus-ring` / `.ground-dark` | declared; `.ground-dark` rebinds both to white | `globals.css:168-181`, `202-215` | **any section a package paints DARK carries `.ground-dark` and the package measures it.** This is R1's B1/S3 on startups-tech and it is the single most likely repeat. |
| `--calc-result-accent` | `#e1a58e`, 8.48 on slate-900 | `globals.css:129` | R2 BLOCKER 3 cannot recur. Do not touch. |
| `--radius: 0rem` | declared | `globals.css:91` | R5 B1 (every `rounded-*` painting 0px) cannot recur. Kit `rounded-xl` = `calc(0rem + 4px)` = 4px. Expect 4px corners, not pills. |
| motion layer | `globals-standard.css` imported, four `--brand-glow*` channels declared at this site's hue | `globals.css:19-31`, `137-140` | `ScrollGlowGroup`, `DrawnTickList`, `NumberedReasons`, `Eyebrow` rule and `card-glow` all animate. C6 on startups-tech needed no kit edit and needs none here either. |
| `<noscript>` motion release | present in `layout.tsx:110-113` for `.eyebrow-rule` and `.tick-draw` | `layout.tsx` | **it does NOT cover the FAQ accordion.** See K4 below: manager item, not a builder item. |
| `layout-utils.ts` | re-exports the kit; `focusRing`, `btnPrimary`, `btnSecondary`, `btnOnDark` kept local with the ring routed to `var(--focus-ring)`, each with a written decline | `components/ui/layout-utils.ts` | **import buttons and containers from `@/components/ui/layout-utils`, never from the kit directly, never hand-rolled.** `btnOnDark` exists and has ZERO consumers: the first package that puts a secondary button on a dark ground uses it and writes the contrast row. |
| kit `SiteHeader` + `SiteFooter` + skip link + single `<main>` + `/embed` bypass | via `PageShell`, in flight as P1-C | `layout.tsx:10,137`; `components/layout/PageShell.tsx` exists | **no package renders a `<main>`, a header, a footer or a skip link.** `grep -rn "<main" <owned files>` must be 0. |
| `HospitalityBackdrop` | BUILT, untracked, 123 lines, no `viewBox`, `patternUnits="userSpaceOnUse"`, primary-400 `#e58764` literal, contrast row written for `bg-slate-900` | `components/layout/HospitalityBackdrop.tsx` | **mount it; do not edit it.** Every package that mounts it on a NEW ground reports that ground's ratio to the manager so the manager adds the row. Host contract: parent section `relative overflow-hidden`, content `relative z-10`. |
| dead calculator links | FIXED in phase 0 | `app/page.tsx:235-237` now carry the full `-calculator` / `-rate-checker` slugs; `data/hospitality-services.ts:224` likewise | do not "fix" them again. |
| nested `<main>` | 4 stripped in phase 0, 3 research ones owned by P1-C | `P0E` §2 vs `PHASE1_PACKAGES.md` C4 | W6 must NOT touch the research `<main>` tags; P1-C owns that edit. If they are still `<main>` when W6 opens the file, W6 REPORTS it and leaves it. |
| blog post FAQ | already kit `FaqSection` with `html alwaysRenderAnswers` | `blog/[category]/[slug]/page.tsx:171-182` | W2 keeps it. First kit marketing/primitive adoption on this site after `LeadCTAPanel`/`ServiceTiers`/`Calculator`/`SiteHeader`. |
| `BlogPosting` + `BreadcrumbList` + `HowTo` JSON-LD on posts | present | `blog/[category]/[slug]/page.tsx:80-129` | W2 keeps all of it and must not let the visible `<h1>` drift from `BlogPosting.headline` (R3 G1). |
| `WebApplication` JSON-LD on calculators | present, `"@type": "WebApplication"` | `lib/calculators/schema.ts:14` | W4 keeps it byte-identical. |
| `Dataset` JSON-LD on all three research pages | present | `research/hospitality-openings-closures-index/page.tsx:36`, `uk-hospitality-food-hygiene-map/page.tsx:71`, `uk-hospitality-insolvency-index/page.tsx:90` | W6 keeps all three. **`P0E` §9 said this was "not independently verified" — it is verified now, present, three of three.** |
| enquiry form on the three research detail pages | present on ALL THREE | `LeadForm` imported and rendered at `:286`, `:330`, `:447` respectively | **the brief's "enquiry panel already on all four after phase 0" is HALF right: the three DETAIL pages have a `LeadForm`, `/research` (the index) has NONE.** See E.1.6. W6 adds the index panel. |
| `data-cta` census | 2 authored hits, both `thank-you/page.tsx:107-108`; the header triple `header_book\|header\|form` is emitted by the kit on all 59 routes and is invisible to `src` grep | `grep -rn 'data-cta' src`; `cta_baseline.json` | **every `data-cta` a package adds is NEW live segmentation.** Put it on the CONTROL (`<a>` / `<button>`), never on a wrapper `<div>` (R5 B2). Name every id in the receipt. |
| em-dashes | 0 across 59 routes | `sweep_baseline.json` `totalDashes: 0` | keep 0. |
| horizontal overflow at 390 | 0 offenders, all 4 widths | `P0D` | keep 0. `HospitalityBackdrop` has no `viewBox` precisely so this stays true. |
| anchor `scroll-margin-top` gaps | 0 | `P0D` (`anchorGaps: []` on every entry) | R2 GAP 5 (286 anchors at `scroll-margin-top: 0`) has no equivalent here **yet**. W2 introduces in-article anchors when it mounts a TOC; W2 therefore owns creating and proving that `scroll-mt-24`. |
| `outline-none` | 2 in `src`, neither a defect | `error.tsx:47` (compensating `focus:ring-2`), `LeadForm.tsx:322` (`tabIndex={-1}` programmatic-focus heading) | do not "fix" either. The one real ring-defeat, `admin/analytics/login/page.tsx:39`, is admin and out of the port's lease. |
| `.prose` | 35 selectors live in the built CSS; `prose-standard.css` imported | `globals.css:33`; `P0E` §4 | not the charities dead-class defect. W2 keeps `class="prose"` on the article body. |
| `.prose table` overflow fix | one deliberate unlayered rule | `globals.css:225-229` | do not touch, do not layer it. |

### A1. Blog index, `/blog` — `src/app/blog/page.tsx` (54 lines)

Renders a bare `div.mx-auto.max-w-3xl`, an `<h1>`, a flat row of 8 category pills and a
`<ul>` of all 23 posts as plain `<Link>`s. **No kit component, no `Breadcrumb`, no
`Eyebrow`, no `LeadCTAPanel`, no form, no backdrop, no hero.** 7 `neutral-*` hits.
Floor **37** (23 posts + 8 categories + chrome).

### A2. Blog category hub, `/blog/[category]` — `src/app/blog/[category]/page.tsx` (64 lines)

Same shape. A hand-rolled `Blog / {name}` trail at `:46-48` standing in for a breadcrumb,
an `<h1>`, a `<ul>` of that category's posts. No kit component. 4 `neutral-*`. Floors
14/10/10/8/8/7/7/7.

### A3. Blog post, `/blog/[category]/[slug]` (197 lines)

The strongest surface on the site already: four JSON-LD blocks, a key-takeaways aside, the
body via `dangerouslySetInnerHTML` split at the second `<h2>` with `InlineMiniLeadForm`
injected, kit `FaqSection html alwaysRenderAnswers`, and a closing `LeadForm` in a
hand-rolled bordered box.
**Missing:** `Breadcrumb` (hand-rolled at `:130-133`), `TableOfContents`, `ReadingProgress`,
`RelatedArticles`, `BlogSidebarCta`, a skip-to-form anchor, and a real `LeadCTAPanel`
closing band. 11 `neutral-*`.
**`src/lib/markdown-utils.ts` exports `addHeadingIds` and `extractHeadings` and has ZERO
consumers** (`grep -rn 'addHeadingIds\|extractHeadings' src` outside the file = 0 hits).
`src/lib/blog.ts:65` exports `getRelatedPosts(currentSlug, category, limit=3)` and it too
has zero consumers. The TOC and the related rail are therefore already half-built.
**T12 disposition for the post body: DECLINE any kit component that would take
`post.contentHtml` as a text child.** The body stays `dangerouslySetInnerHTML` inside
`<article className="prose prose-neutral">`. This is not a kit gap and never will be.

### A4. Services hub + 5 service pages (90 + 180 lines)

Hub: `bg-[#b0532f]` hero (hand-rolled), a `ServiceTiers` band (kit, adopted, wrapped in an
inline `style={{"--brand-primary": "#b0532f"}}`), a card grid, a "Not sure which service"
band, and a `LeadCTAPanel` + `LeadForm` (adopted in phase 0). 8 `neutral-*`, 6 hexes.
Detail: `Service` + `BreadcrumbList` JSON-LD, brand hero with a hand-rolled "All services"
back-link, a `bg-neutral-800` stats band, a `challenges` grid (bodies are authored HTML),
a `howWeHelp` grid (same), a **hand-rolled `<details>` FAQ rendering `{faq.answer}` as
TEXT**, `LeadCTAPanel` + `LeadForm`, and an "Other services" rail. 20 `neutral-*`, 14 hexes.
**No `SlimHero`, no `Breadcrumb`, no `Eyebrow`, no backdrop, no kit FAQ, no
`WhatToExpectCard` / `ProcessTimeline` / `DrawnTickList` / `NumberedReasons` /
`CoverageCards` anywhere.**

### A5. Audience hub + 6 `/for` pages (57 + 188 lines)

Byte-for-byte the same shape as A4 with different data (`hospitality-hubs.ts`, 481 lines).
The hub has **no form at all** (`P0E` §5). 6 and 20 `neutral-*`, 5 and 16 hexes.
`/for/[slug]` has the same text-rendered `<details>` FAQ.

### A6. Calculators index + 3 tools (41 + 126 lines)

Index: bare `div.max-w-4xl`, `<h1>`, three cards themed off `var(--brand-primary)` /
`var(--border)` / `var(--ink)` CSS variables rather than ramp utilities. **Zero forms, zero
kit components.** 0 `neutral-*`, 0 hex.
Tool: `WebApplication` + `FAQPage` JSON-LD, a `bg-[var(--brand-primary)]` hero with a
hand-rolled trail, `CalculatorClient` → kit `Calculator` (adopted) with `CalcResultCta`
(→ `MiniCapture`) as `resultCta`, an explainer, and a flat `<h3>`/`<p>` FAQ. Phase 0
deleted the duplicate footer capture. 0 `neutral-*`, 0 hex.
**The kit `Calculator` is already adopted on all three tools.** Phase 4 here is narrower
than on any previous site: it is `SlimHero` + `Breadcrumb tone` + `NoticeCard` +
`ExampleFigureNote` + the enquiry panel, not a first adoption.

### A7. Homepage — `src/app/page.tsx` (850 lines)

15 bands, all hand-rolled. **66 `neutral-*` hits and 48 hardcoded hexes — the brief's two
numbers are both exactly right, re-derived.** 8 `.section-label` divs (`:369, :483, :591,
:615, :643, :715, :749, :824`) and 0 `<Eyebrow>`.

| # | band | line | today | disposition |
|---|---|---|---|---|
| 1 | hero | 292-330 | `bg-[#3a1a0d]` + a bare `bg-gradient-to-br` div; a SQUARE `bg-[#b0532f]/30` chip with `UtensilsCrossed` + `siteConfig.name`; H1 at `lg:text-6xl`, no `text-balance`; two hand-rolled buttons; a `ShieldCheck` trust line | mount `HospitalityBackdrop`; chip becomes a `rounded-full` pill with an `animate-ping` live dot (shape only, the chip's text is `siteConfig.name`, unchanged); H1 to `lg:text-[72px]`/`lg:text-7xl` + `text-balance`; buttons to `btnPrimary` / `btnOnDark`; `.ground-dark` on the section. **Markers 1, 3 and 4 all land here.** |
| 2 | key figures bar | 333-351 | four `<a>` to gov.uk on `bg-[#b0532f]`, `font-mono` | **kit `StatsCounter`.** Marker 2. See W5 for the exact `StatItem` mapping. |
| 3 | intro strip | 354-364 | one `<p>` on `bg-[#fafaf9]` | keep the paragraph verbatim; **DECLINE `ProblemStatement`** (K6). |
| 4 | who we help | 367-400 | `.section-label` + h2 + p + a 6-cell link grid | `<Eyebrow>`; the grid cards ARE the link floor, so **DECLINE `CoverageCards`** (K2: still no per-card `href`). |
| 5 | sub-trade grid | 403-439 | 6 icon cards | `ScrollGlowGroup` wrapper (adds no copy). |
| 6 | services grid | 442-478 | 5 icon cards | **`ScrollGlowGroup` — the brief names this one explicitly.** |
| 7 | compliance moments | 481-499 | `.section-label` + 4 cards whose `body` is JSX with real `<a>`s | `<Eyebrow>`. **DECLINE `ProcessTimeline`** (bodies are JSX elements, not HTML strings, and they are not a numbered sequence). `NumberedReasons` takes `{title, body}` strings and would flatten the anchors: DECLINE, say so. |
| 8 | key-figures table | 502-584 | a 6-row sourced table on `bg-[#3a1a0d]`, already `overflow-x-auto` | keep; `.ground-dark`; `ExampleFigureNote` is NOT for this (its own docstring bans it on the firm's own proof strip, and these are statutory figures with sources — see K11). |
| 9 | free tools + data asset | 587-638 | two `.section-label` columns, three calculator links, one research link | two `<Eyebrow>`; `data-cta` on the four links. |
| 10 | why a specialist | 641-709 | `.section-label` + a 7-row comparison table | `<Eyebrow>`. **DECLINE `ComparisonTable`** (T12: forces a "Most recommended" pill the page does not publish). |
| 11 | social proof | 712-741 | three real composite quotes + the disclaimer at `:719-722` | **kit `TestimonialsSection items={...} showRating={false} footnote={<the existing disclaimer>} backdrop={<HospitalityBackdrop/>}`.** Owner ruled the disclaimer stays. |
| 12 | contact CTA | 744-784 | hand-rolled two-column dark band with `LeadForm` on the right and four tick rows | **kit `LeadCTAPanel`** fed these exact strings, `backdrop={<HospitalityBackdrop/>}`, `eyebrow=""`, `formTitle="Get in touch"` (the page's own `<h3>` at `:777-779`). The four tick rows map to `proofPoints` `{title, detail}` one-for-one. |
| 13 | FAQ | 787-818 | hand-rolled `<details>` over the 8 `faqs` that also feed `buildFaqJsonLd` at `:288` | **kit `FaqSection alwaysRenderAnswers`** on the SAME binding (T17). Answers are plain text: no `html` prop needed. |
| 14 | blog strip | 821-847 | `.section-label` + heading + two buttons, **no posts** | **a real three-post band** from `getAllPosts()`. This is diagnosis §c2 verbatim. It also RAISES the homepage floor by 3; report the delta. |
| 15 | closing | — | band 14 is the last thing on the page | after the blog band, the `LeadCTAPanel` of band 12 is the closing panel; do not add a second one. |

Homepage floor **21**.

### A8. `/about` (57 lines)

Brand hero, four paragraphs, an entity line, and a `LeadCTAPanel` + `LeadForm` (phase 0).
4 `neutral-*`, 1 hex. Floor **6**. Pairs with W5 because it is the only other page whose
copy is first-person firm voice.

### A9. Research index + 3 index pages + 1 embed

`/research` (89 lines): brand hero, three cards themed off CSS variables. **No form.**
Floor **9**.
The three detail pages (295 / 351 / 468 lines): each has `Dataset` JSON-LD, a brand hero,
`scroll-mt-24` anchored sections, charts, authored-HTML sections, and a closing `LeadForm`
in a hand-rolled box. Floors **7** each.
`/research/hospitality-openings-closures-index/embed` (95 lines): bare by design.
**The brief's "12px footnote markers" do not exist on this site.** `grep -rno
'text-\[1[0-4]px\]'` over `src/app/research` = **0 hits**; the source notes are
`text-xs` (`:217` on the hygiene map, `:241` on the insolvency index) and the
`browser_check` baseline records **0 contrast failures on those routes below floor other
than the two site-wide chrome signatures**. R2's startups-tech finding (twelve 12px markers
at 3.09) has no analogue here. See E.1.7.

### A10. `/contact`, `/book`, `/complete`, `/thank-you`, legal

`/contact` (23 lines) is the thinnest page on the site: a `max-w-2xl` div, an `<h1>`, one
sentence, a `LeadForm`. `/book` and `/complete` are token-gated `noindex` pages with
hand-rolled "needs the personal link" / "link expired" cards. `/thank-you` has three
mutually exclusive branches. Legal: 253 / 160 / 145 lines of prose with 12 / 4 / 10 hexes.
Floors: `/contact` 6, `/privacy-policy` 6, `/cookie-policy` 6, `/terms` 6. `/book`,
`/complete`, `/thank-you` are not in the sweep baseline (noindex) and have no floor.

### A11. The forms

`LeadForm.tsx` (450 lines), `DetailsForm.tsx` (218), `BookingPicker.tsx` (173),
`MiniCapture.tsx` (178). `neutral-*` hits: **14 / 11 / 13 / 0**. Hardcoded hex: **2 / 0 /
0 / 0**.

**THE RING SWAP ON ALL FOUR IS ALREADY DONE — by phase 1, uncommitted, during this
planning pass. W6 must NOT redo it.** Re-derived from `git diff -- src/components/forms
src/components/calculators/MiniCapture.tsx`: all four now `import { focusRing } from
"@/components/ui/layout-utils"` and interpolate it into their field/chip recipes, replacing
four hand-rolled `focus-visible:outline-[var(--brand-primary)]` /
`outline-[var(--brand,#b0532f)]` strings. The same diff also lifted two `text-neutral-500`
labels in `LeadForm` to `text-neutral-600` (the two borderline 4.50 contrast entries `P0D`
recorded on the research routes). **What survives and is still W6's:** the
`focus:border-[var(--brand,#b0532f)]` BORDER colour on three of the four (`--brand` is
declared nowhere in `globals.css`, so it falls to the literal — it is a border, not a ring,
so it is a hex-survivor question, not a ring question), and the 38 `neutral-*` hits.
`LeadForm.tsx:322`'s `outline-none` is on a `tabIndex={-1}` programmatic-focus heading and
is **not** a defect: leave it, and say you left it and why.
**If W6 opens these files and the ring swap is NOT there, phase 1 was reverted — REPORT
that and stop, do not re-apply it.**

### A12. The "partner network" sentence — OWNER ITEM, NOT ASSIGNED

`thank-you/page.tsx:52-54` reads "A specialist firm from our partner network will contact
you directly." The estate rule (memory `estate_claims_integrity`, reversed 2026-09-28)
says the brand IS the firm on every surface and firm voice belongs everywhere, so the
technically correct action is to rewrite it. **It is prose, and prose is frozen for this
port.** Sweep by RULE, not by this one line: `grep -rn 'partner network' hospitality/web/src`
before reporting a count. **Bundle it to the owner as ONE plain-English question after the
wave. No package touches it.** Blast radius: one sentence on one `noindex` branch. Revert:
one-line git revert.

---

## B. THE SIX WORK PACKAGES

### OFF LIMITS TO EVERY PACKAGE, WITHOUT EXCEPTION

Paste verbatim in every brief. If a package genuinely needs a token, a recipe or a chrome
prop changed, it **REPORTS it to the manager and does not edit.**

```
packages/web-shared/**                                     manager carve-out, 19 sites, trap 12
Property/**                                                trap 12: nothing in this wave changes Property
hospitality/web/src/app/globals.css                        P1-A: ramp, tokens, rings, .ground-dark, motion
hospitality/web/src/components/ui/layout-utils.ts          P1-B: kit re-export + four declines
hospitality/web/src/app/layout.tsx                         P1-C: nav data, providers, metadata, JSON-LD, <noscript>
hospitality/web/src/components/layout/PageShell.tsx        P1-C: the kit-chrome props
hospitality/web/src/components/layout/SiteHeaderWrap.tsx   P1-C deletes it
hospitality/web/src/components/layout/SiteFooter.tsx       P1-C deletes it
hospitality/web/src/components/layout/HospitalityBackdrop.tsx  P1-E: mount it, never edit it
hospitality/web/src/components/brand/UnionJack.tsx         P1-C decides its fate (owner Q6)
hospitality/web/src/app/error.tsx                          P1-D
hospitality/web/src/app/not-found.tsx                      P1-D
hospitality/web/src/tests/focus-ring.test.ts               P1-F
hospitality/web/src/lib/schema.ts                          SHARED by W2/W3/W5/W6: manager-direct
hospitality/web/src/config/site.ts                         leadConsentText is FROZEN (T19)
hospitality/web/src/config/niche-loader.ts                 config plumbing
hospitality/niche.config.json                              builders READ it; the MANAGER writes it
hospitality/web/src/app/admin/**                           staff-only, not in the port's lease
hospitality/web/src/app/api/**                             lead plumbing; a package may READ, never write
hospitality/web/content/**                                 23 posts: no frontmatter, no body, no faqs, no
                                                           keyTakeaways edits. Prose is frozen.
hospitality/web/src/lib/calculators/tools/**               calculator MATHS + its 3 unit tests
docs/hospitality/_port/*.json                              baselines: read them, never rewrite them
```

Plus, for each package, **every other package's owned files, listed verbatim in its brief.**

### SHARED ACCEPTANCE TESTS, IN EVERY PACKAGE'S BRIEF

```bash
cd hospitality/web && npx tsc --noEmit                        # clean, no output (baseline: clean)
cd hospitality/web && npm test                                # GREEN, report N/N verbatim (baseline: 6 test files, vitest run)
python scripts/check_dependency_closure.py                    # OK  (T24: a new import declares itself in the same edit)
grep -rn $'—\|–' <owned files>                      # 0 em/en dashes in user-facing strings
grep -rnoE '#[0-9a-fA-F]{3,8}' <owned .tsx files>             # 0
grep -rno 'neutral-[0-9]\{2,3\}' <owned files>                # 0
grep -rn 'section-label' <owned files>                        # 0
grep -rn '<main\|<header\|<footer' <owned files>              # 0 (PageShell owns all three)
grep -rnoE 'focus-visible:outline-\[[^]]*\]' <owned files>    # every value is exactly var(--focus-ring)
grep -rn 'outline-none' <owned files>                         # 0, or a compensating ring on the SAME element
grep -rn 'data-cta' <owned files>                             # every hit is on an <a> or <button>, never a <div>
```

Plus, for any file emitting JSON-LD, the per-URL parse assertion from playbook §5:
`json.loads` EVERY `ld+json` block on every URL the file serves. A tag-presence check
passes the `[object Object]` defect straight through.

### EVERY BRIEF ALSO CARRIES, VERBATIM

- the playbook §10.1 preamble;
- the LOCKED BLOCK above, all 20 items;
- "Do NOT run `next build` or `next dev`. The manager builds, serially (T1).";
- "Do NOT run any git write command, and read-only git from the monorepo ROOT only (T3).";
- "Do NOT launch subagents (T39).";
- "**Correct the brief if its premise is false** (T11). Verify every path and every count
  against source before you use it. Reward yourself for the pushback: three of the ten
  false premises in section E were found by builders on previous ports, not by planners.";
- and this, which the crypto field notes make a deliverable rather than an act of
  initiative: **"Report every defect you can SEE but cannot REACH, with file:line. That
  list is the input to the mop-up package. A defect you saw and did not write down is the
  most expensive defect in the port."**

---

### W2 — BLOG SUBSYSTEM (phase 2)

**Model: Opus.** It composes markup on 32 routes a prospect reads.

**Files owned (all verified to exist):**

```
hospitality/web/src/app/blog/page.tsx                        (54 lines)
hospitality/web/src/app/blog/[category]/page.tsx             (64)
hospitality/web/src/app/blog/[category]/[slug]/page.tsx      (197)
hospitality/web/src/lib/blog.ts                              (143)
hospitality/web/src/lib/markdown-utils.ts                    (2 exports, 0 consumers)
hospitality/web/src/components/blog/InlineMiniLeadForm.tsx   (23)
```

**Port FROM (exact anchors):**

- `startups-tech/web/src/app/blog/[category]/[slug]/page.tsx` — the whole post template,
  including its `ReadingProgress` / `TableOfContents` / `RelatedArticles` trio (imports at
  `:22-24`) and its ONE-clamp sticky `<aside>`.
- `generalist/web/src/components/blog/BlogPostRenderer.tsx` — `:193` the skip-to-form
  anchor (`data-cta="blog_skip_to_form"`), `:308` the `BlogSidebarCta` mount.
- `ecommerce/web/src/app/blog/[category]/page.tsx:6-9` — `Breadcrumb`, `Eyebrow`,
  `HubArticleList` on a category hub.
- `Property/web/src/app/blog/page.tsx` and `Property/web/src/components/blog/` — the
  Property answer on card recipe and rail ordering.

**ADOPT (each one verified in the kit at `70047cb6`):**

| kit path | where | how it is fed |
|---|---|---|
| `design/primitives/Breadcrumb.tsx` | all 3 routes | `items` + `siteUrl={siteConfig.url}`; `tone="default"` on the light index/hub grounds. Replaces the hand-rolled trails at `blog/[category]/page.tsx:46-48` and `[slug]/page.tsx:130-133`. It also emits `BreadcrumbList` JSON-LD — **the post template already emits one at `:96-106`; keep exactly ONE, whichever binding you keep, and prove it (`grep -c BreadcrumbList` on the served URL = 1).** |
| `design/primitives/page-blocks.tsx` `Eyebrow` | all 3 | existing category/section labels only |
| `design/blog/HubArticleList.tsx` | index + hub | **SAFE for the floor: it does NOT slice.** Its own docstring (`:45-55`) says every card stays in the server HTML and off-page ones carry `hidden`. Feed the lightweight `HubArticle` projection (`slug`, `title`, `summary`, `readTime`, `date`, `categorySlug`) — never `contentHtml` (the `/blog` FALLBACK_BODY_TOO_LARGE lesson, memory `vercel_blog_fallback_size_limit`). |
| `design/blog/TableOfContents.tsx` | post | `headings={extractHeadings(post.contentHtml)}` — **the helper already exists and has zero consumers.** You must also run `addHeadingIds` over the body so the ids the TOC targets exist. |
| `design/blog/ReadingProgress.tsx` | post | no props |
| `design/blog/RelatedArticles.tsx` | post | `getRelatedPosts(post.slug, post.category, 3)` — **also already written, zero consumers.** |
| `design/blog/BlogSidebarCta.tsx` | post | `copy={{heading: niche.blog.cta_heading, body: niche.blog.cta_body}}`, `buttonLabel={niche.blog.cta_button}`, `buttonClassName` set to this site's brand ground. **All three strings already exist in `hospitality/niche.config.json` `blog` and are the SAME strings the post's closing form already renders at `:187-189`. Nothing is authored.** |
| `design/marketing/LeadCTAPanel.tsx` | post (closing), index, hub | `eyebrow=""`, `formTitle=""`, `proofPoints={[]}`, `form={<LeadForm .../>}`, and on the post `backdrop={<HospitalityBackdrop />}`. Title/description on the post = the two sentences already at `:187-189`. On the index and hub = the same `niche.blog` triple. |
| `design/primitives/FaqSection.tsx` | post | **already mounted with `html alwaysRenderAnswers` (phase 0). KEEP IT. Do not re-derive the decision.** |

**DECLINE, reason written at the call site naming the kit FILE PATH:**

- `packages/web-shared/design/blog/BlogListWithSearch.tsx` — hardcodes `postsPerPage = 12`
  at `:43` and **slices** at `:91` behind `useState(1)`. `/blog`'s floor is **37** and the
  site has 23 posts + 8 category links. Measured, not stylistic. The same cap is live on
  six sibling sites (memory `kit_blog_list_12_post_cap`).
- `packages/web-shared/design/primitives/NumberedPagination.tsx` — only reachable through
  that slice; declining the list declines this. (`HubArticleList` uses it too, but with
  every card in the HTML, which is the difference.)
- `packages/web-shared/design/blog/BlogCategoryHub.tsx` — owns the whole hub page including
  copy blocks this site does not author; adopting it would author new copy.
- **Anything that takes `post.contentHtml` as a text child** — the body is authored HTML
  (memory `blog_page_rendering_html_in_frontmatter`, locked rule 11).

**Sidebar arrangement (T32 — read this twice).** ONE clamp, on the element that is a direct
child of the tall column. The `<aside>` carries `lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)]
lg:overflow-y-auto` and `TableOfContents` carries NONE of its own. Two clamps gives a scroll
box inside a shorter scroll box; no clamp gives a sticky element that sticks for 200px and
scrolls away. **Reading the classes cannot tell the two broken arrangements from the correct
one** — state which of the three you built and why.

**`ReadingProgress` (R2 NIT 7):** it paints over the top of the sticky header on
startups-tech. Check its `z-index` and `top` against `PageShell`'s header before mounting;
if it collides, report it rather than editing the kit.

**Anchors (R2 GAP 5):** mounting a TOC creates in-article anchor targets where there were
none. `P0D` records **0 anchor gaps today**; if you introduce headings with ids you must
give them `scroll-mt-24` and the wave-close `browser_check` must still report
`anchorGaps: []`. Do not hand the reviewer 286 anchors at `scroll-margin-top: 0`.

**Link floors (from `sweep_baseline.json`) — never drop:**
`/blog` **37**.
Categories: `hospitality-accounts` **14**, `licensed-trade` **10**, `hospitality-vat` **10**,
`business-rates` **8**, `tips-and-tronc` **8**, `payroll-and-employment` **7**,
`capital-allowances` **7**, `making-tax-digital` **7**.
Posts: `hospitality-consultant-vs-accountant` 21, `hotel-finance-revenue-management` 16,
`tronc-scheme` 15, `uk-food-hygiene-ratings-by-region-and-business-type` 15,
`bookkeeper-for-restaurant` 15, `vat-on-takeaway-food` 15, `machine-games-duty` 14,
`retail-hospitality-and-leisure-relief-scheme` 13, `vat-rates-soft-drinks-and-food` 13,
`casual-staff-employment-status` 13, `gross-profit-menu-pricing` 12,
`tips-act-2023-compliance` 12, `alcohol-duty` 12, `is-there-vat-on-dog-food` 11,
`hospitality-hardest-sector-insolvency-survival` 11, `awrs-checks` 11,
`cash-basis-vs-accruals-stock` 11, `draught-relief-explained` 11,
`kitchen-fit-out-capital-allowances` 11, `small-business-rates-relief-cafes` 11,
`bnb-rent-a-room-boundary` 9, `mtd-itsa-hospitality-sole-traders` 9,
`epos-reconciliation-hospitality` 7.
**Adding `RelatedArticles`, a TOC and a `Breadcrumb` should LIFT every post route. Report
the delta per route, and never pad.**

**Package-specific acceptance tests:**

- `grep -c 'dangerouslySetInnerHTML' 'src/app/blog/[category]/[slug]/page.tsx'` — the body,
  the FAQ answers and every JSON-LD block still interpolate. **No authored HTML became a
  text child.**
- `grep -n 'BlogListWithSearch\|BlogCategoryHub\|NumberedPagination' src/app/blog` — every
  hit is a decline comment naming `packages/web-shared/design/...`; **zero are `from "`
  imports.**
- **Exactly ONE scroll container in the article column** and `TableOfContents` carries no
  clamp of its own (T32). State the arrangement.
- `extractHeadings`, `addHeadingIds` and `getRelatedPosts` now have call sites (all three
  had zero).
- **Exactly ONE `BreadcrumbList` block** per post URL, not two.
- **Capture surfaces on a post page: exactly 3** — `BlogSidebarCta` (an anchor to
  `#enquiry-form`, not a form), `InlineMiniLeadForm` after the second `<h2>`, and the
  closing `LeadCTAPanel` form. Count `<form` in the served HTML: **2**. Not 1, not 3.
- The skip-to-form anchor's `href` target `id` exists exactly once and carries `scroll-mt-24`.
- `curl -s :PORT/blog | grep -oE 'href="/[^"]*"' | sort -u | wc -l` **>= 37**.
- Every one of the 32 blog URLs' `ld+json` blocks `json.loads` without raising.
- **`BlogPosting.headline` equals the visible `<h1>` byte-for-byte on all 23 posts** (R3 G1:
  it drifted on 19 of 32 on startups-tech). `post.h1` feeds both; prove the binding is one.
- `FaqSection` still carries BOTH `html` and `alwaysRenderAnswers`.

**OFF LIMITS:** the shared block, plus W3's, W4's, W5's and W6's owned files, plus
`hospitality/web/content/blog/*.md` (23 files, prose frozen).

---

### W3 — TEMPLATES AND HUBS (phase 3)

**Model: Opus.** Thirteen prospect-facing template routes plus their two data files.

**Files owned (all verified):**

```
hospitality/web/src/app/services/page.tsx           (90 lines)
hospitality/web/src/app/services/[slug]/page.tsx    (180)
hospitality/web/src/app/for/page.tsx                (57)
hospitality/web/src/app/for/[slug]/page.tsx         (188)
hospitality/web/src/data/hospitality-services.ts    (424)
hospitality/web/src/data/hospitality-hubs.ts        (481)
hospitality/web/src/config/service-tiers.ts
```

**Port FROM:**

- `startups-tech/web/src/app/services/[slug]/page.tsx` and `for/[slug]/page.tsx` post-uplift
  — the `SlimHero` + backdrop + `Breadcrumb tone` + kit-FAQ shape on a brand-ground hero.
- `Property/web/src/app/for/[slug]/page.tsx` — `:4` kit `CardStack`, `:107`
  `FaqSection ... html`, `:110` `LeadCTAPanel`. **Property declines `StatsCounter` at `:81`
  because its values are strings like "18% / 24%".** That decline matches the standard; this
  site's `stats` are the same shape, and `StatItem.value` (`StatsCounter.tsx:15`) now
  answers it, so **re-derive rather than inherit**: if the three `stat.value` strings render
  correctly through `value`, ADOPT; if any is a compound, decline and say which.
- `ecommerce/web/src/app/services/page.tsx:4-12` — `Eyebrow`, `Breadcrumb`, `LeadCTAPanel`,
  `ServiceTiers` on a hub.

**ADOPT:**

| kit path | where | how it is fed |
|---|---|---|
| `design/primitives/SlimHero.tsx` | all 4 heroes | `eyebrow` (REQUIRED, `:28`) = the page's own existing label: "Services" / the service title on detail, "Who we help" / the sector title on `/for`. `title` = the existing `<h1>` text. `children` = the existing standfirst `<p>`, **and on the detail pages that standfirst is authored HTML rendered with `dangerouslySetInnerHTML` — pass the same `<p dangerouslySetInnerHTML>` node as a child; do not flatten it.** `backdrop={<HospitalityBackdrop />}`. **NOTE: `SlimHero` hardcodes `bg-slate-900` (`:36`). These four heroes are `bg-[#b0532f]` today. Adopting `SlimHero` therefore CHANGES the hero ground from brand to navy on 13 routes.** That is a visible colour change nobody asked for, and locked rule 7 forbids it. **Resolution: DECLINE `SlimHero` on these four heroes, in writing, naming `packages/web-shared/design/primitives/SlimHero.tsx:36`, and instead keep the existing brand-ground section, mount `HospitalityBackdrop` in it, add `.ground-dark`, and use kit `Eyebrow onDark` + `Breadcrumb tone="onBrand"`.** Record it as kit gap **K1** for the manager. Do not resolve this differently without the manager. |
| `design/primitives/Breadcrumb.tsx` | all 4 | `tone="onBrand"` — the prop exists for exactly this mid-tone brand ground (`Breadcrumb.tsx:29-33`, which names startups-tech's `bg-primary-600` and ecommerce's amber band). Replaces the hand-rolled "All services" / "All sectors" back-links at `services/[slug]:63-65` and `for/[slug]:63-65`. **A `Breadcrumb` adds Home + Services/For + current = 2 links where the back-link gave 1, so the floor RISES. Count it.** The detail pages already emit a `BreadcrumbList` via `JsonLd` at `:55-60`; `Breadcrumb` emits one too. **Keep exactly one.** |
| `design/primitives/page-blocks.tsx` `Eyebrow` | all 4 | existing labels only (`onDark` on the brand heroes) |
| `design/primitives/FaqSection.tsx` | `services/[slug]`, `for/[slug]` | **`alwaysRenderAnswers` + `html`, on the SAME array `buildFaqJsonLd` is fed (T17: one binding, two consumers).** Replaces the hand-rolled `<details>` at `services/[slug]:136-148` and `for/[slug]:139-150`. **`html` is what lets W3 restore the anchor F1 had to strip** — see the dedicated block below. |
| `design/marketing/LeadCTAPanel.tsx` | all 4 | three already mounted (phase 0): keep their existing strings byte-identical, add `backdrop={<HospitalityBackdrop />}`. **`/for` (the hub) has NO form today — add the fourth**, fed the same strings `/services` uses. `eyebrow=""`, `formTitle=""`, `proofPoints={[]}`. |
| `design/marketing/ScrollGlowGroup.tsx` | the `howWeHelp` grids and the service/sector card grids | a wrapper; changes no copy. The motion layer is live (`globals.css:19-31`). |
| `design/marketing/StatsCounter.tsx` | the `bg-neutral-800` stats bands on both detail templates | `{target, value?, prefix?, suffix?, label, href?}`. **Open each of the three `stat.value` strings in `hospitality-services.ts` / `hospitality-hubs.ts` first.** Anything with a thousands separator or a compound form goes through `value` (a literal); anything genuinely numeric may count up. **T15: the SSR frame must carry the TRUE value** — `StatValue` uses `useState(target)`, which satisfies this, but prove it with `curl \| grep`. The band is dark: `.ground-dark` + `slate-800`, not `neutral-800`. |
| `components/ServiceTiers` (kit) | `/services` | already adopted at `:43`. **KEEP IT. Do not remove `featuredBadge="Most popular"` and expect the badge to go (T13).** Replace the inline `style={{"--brand-primary": "#b0532f"}}` wrapper at `:42` with nothing: `--brand-primary` is already declared globally at `globals.css:126` to the same value. Prove the badge still paints. |
| `design/marketing/WhatToExpectCard.tsx` | **only if** a page already publishes a matching list | **pass `items` explicitly (locked rule 17).** `/services/[slug]`'s `howWeHelp` titles are the closest candidate. If feeding it would author a sentence, DECLINE and say which sentence. |
| `design/marketing/DrawnTickList.tsx` | where a page already renders a list of short claims | `tickClassName="text-primary-600"` on a LIGHT ground (the kit default `primary-400` measures ~1.9 on white and its own docstring says so, `DrawnTickList.tsx:38-47`); `text-primary-400` on a dark one. |
| `design/primitives/page-blocks.tsx` `CardStack` | the `challenges` / `howWeHelp` grids | **`html?: boolean` exists at `:92/:99` and renders the body safely.** The bodies ARE authored HTML with real anchors, which is exactly why they go through `dangerouslySetInnerHTML` today. **So the historical "would print escaped markup" decline is STALE. Adopt with `html`, or decline for a reason you measured today.** |

**DECLINE, at the call site, naming the file path:**

- `packages/web-shared/design/primitives/SlimHero.tsx` — see the row above (K1). Ground is
  hardcoded `bg-slate-900` at `:36` and these heroes are brand-ground by the designer's
  choice.
- `packages/web-shared/design/marketing/CoverageCards.tsx` — `CoverageItem`
  (`CoverageCards.tsx:5-15`) has `title`, `body`, `outcome?`, `icon` and **no `href`**. On
  `/services` and `/for` the cards ARE the routes' link floors (11 and 12). Wrapping them
  would lose every link. **Note the `html` prop DOES exist at `:35`, so the old "escaped
  markup" half of this decline is stale: say so, and decline on the `href` half only.**
  Kit gap **K2**.
- `packages/web-shared/design/marketing/ProcessTimeline.tsx` — takes
  `{n, title, body}[]`. Neither data file publishes numbered staged steps, and inventing
  the `n` labels would author copy. (`html` exists at `:27`, so the escaped-markup decline
  is stale here too.)
- `packages/web-shared/design/marketing/ProblemStatement.tsx` — hardcodes Property's
  landlord copy ("Your rent went up. Your profit didn't.", the Section 24 paragraph, a
  "Book your free first call" button) at `:33-56` with **no copy props** (T12). Kit gap **K6**.
- `packages/web-shared/design/marketing/ComparisonTable.tsx` — forces a "Most recommended"
  pill the page does not publish (T12).

**RESTORING THE F1 LINK — this is the specific thing the brief asks for, and here is
exactly what it is.** Phase 0's F1 stripped an anchor from ONE FAQ answer because
`services/[slug]/page.tsx:145` renders `{faq.answer}` as TEXT, so the markup showed as
literal `&lt;a href=...&gt;` on the page (`P0B` finding 4). Deriving command:
`git diff -U2 -- hospitality/web/src/data/hospitality-services.ts`. The answer is on
`/services/tronc-scheme-setup` ("What is a tronc and does my business need one?") and the
link it lost pointed to **`/services/hospitality-payroll`**, not to the tronc page.
Restore the exact original string and render it through `FaqSection html`:

```
... attract full NIC. See also <a href="/services/hospitality-payroll">hospitality payroll</a> for how tronc payments sit inside your overall pay run.
```

**Two things to prove, not assume:** (a) the restored `<a>` renders as a link and not as
escaped text; (b) `/services/tronc-scheme-setup`'s unique-href count does **not** change,
because `/services/hospitality-payroll` is already linked from that page's "Other services"
rail at `:170-174`. The floor of 11 was captured on the pre-F1 build, so it already
counted this link once. **Sweep by RULE:** `grep -n 'answer:' src/data/*.ts | grep '<a '`
returns **0** today — after your restore it must return exactly **1**, and you must confirm
that no OTHER authored anchor was stripped anywhere in either data file.

**The hex swap is this package's bulk mechanical work:** 6 in `services/page.tsx`, 14 in
`services/[slug]/page.tsx`, 5 in `for/page.tsx`, 16 in `for/[slug]/page.tsx` = **41**,
almost all `#b0532f` / `#8f421f` / `#fafaf7`. The ramp exists, so each becomes the correct
`primary-*` utility. **Buttons and grounds under white text stay at 600 on this site
(locked rule 7). `#fafaf7` is an arbitrary warm off-white with no `neutral-*` class to
swap; leave it or declare it as a token via the manager — do NOT "normalise" it into
`slate-50`, which is a visible colour change (R6 on startups-tech).**
`neutral-*` hits to swap: **54** (8 + 20 + 6 + 20).

**Link floors — never drop:**
`/services` **11**; `/services/tronc-scheme-setup` **11**, `/services/hospitality-payroll`
**11**, `/services/hospitality-vat` **12**, `/services/toms-advice` **12**,
`/services/business-rates-relief` **13**.
`/for` **12**; all six `/for/*` routes **13**.

**Package-specific acceptance tests:**

- `grep -rc '#b0532f\|#8f421f\|#6e3118' src/app/services src/app/for` = **0**.
- Every FAQ answer string in the FAQPage JSON-LD is present in the SERVED HTML on all 11
  detail URLs, **normalised to alphanumerics with entities decoded**. (Stripping `<strong>`
  inserts a space before a comma and produces false absences — that cost crypto four false
  positives.)
- `buildFaqJsonLd` is still fed the SAME array the markup maps (T17). One binding.
- **5 service slugs and 6 sector slugs still generate.** `generateStaticParams` counts
  unchanged, and the EXPORTED SHAPE of both data files (`slug`, `title`, `headline`,
  `intro`, `stats`, `challenges`, `howWeHelp`, `faqs`, `metaTitle`, `metaDescription`) is
  **FROZEN** — the homepage, the footer and `llms-full.txt` read them.
- `LeadCTAPanel` call sites site-wide after this package: **5** (was 4; `/for` gains one).
  Every one still passes `eyebrow=""` and `formTitle=""`.
- `Service` + `BreadcrumbList` + `FAQPage` JSON-LD all still parse on all 13 URLs, and
  there is **exactly one `BreadcrumbList` per URL**, not two.
- **These two templates are the same shape. Whatever you do to one, do to the other, and
  `diff` them at the end to prove it.**

**OFF LIMITS:** the shared block, plus the other five packages' files.

---

### W4 — CALCULATORS AND THE EMBED SURFACE (phase 4)

**Model: Opus.** The highest-intent surfaces, and a partner-facing embed.

**Files owned (all verified):**

```
hospitality/web/src/app/calculators/page.tsx            (41 lines)
hospitality/web/src/app/calculators/[slug]/page.tsx     (126)
hospitality/web/src/app/embed/[slug]/page.tsx           (50)   NO CHROME, NO PANEL
hospitality/web/src/components/calculators/CalculatorClient.tsx   (18)
hospitality/web/src/components/calculators/CalcResultCta.tsx      (18)
hospitality/web/src/lib/calculators/schema.ts
hospitality/web/src/lib/calculators/site.ts
```

`src/lib/calculators/registry.ts` and everything under `src/lib/calculators/tools/` are
**READ-ONLY to W4**: `layout.tsx` and the footer read `TOOLS`, and the three tool files
carry the maths plus their own unit tests.

**Port FROM:** `startups-tech/web/src/app/calculators/[slug]/page.tsx` post-uplift (backdrop
on the brand hero, `Breadcrumb tone`, the kit FAQ, the index panel) and
`generalist/web/src/app/calculators/page.tsx` (`LeadCTAPanel` + `data-cta="calc_index_help"`
on an index).

**ADOPT:**

- `design/primitives/Breadcrumb.tsx` with **`tone="onBrand"`** on the
  `bg-[var(--brand-primary)]` hero, replacing the hand-rolled trail at
  `calculators/[slug]/page.tsx:73-82`. The tool pages emit no `BreadcrumbList` today, so
  this one is a pure gain; `/calculators` (the index) gets one too.
- `design/primitives/page-blocks.tsx` `Eyebrow` — the index has no label today; the tool
  hero's `tool.category` string is the existing candidate. **Do not author a new label; if
  there is nothing to put in an `Eyebrow`, do not mount one.**
- `design/primitives/FaqSection.tsx` with **`alwaysRenderAnswers`** on all three tools,
  replacing the flat `<h3>`/`<p>` block at `:103-115`. The page already emits `FAQPage`
  JSON-LD at `:63-68` from the same `tool.faqs` binding: keep it ONE binding (T17).
  Answers are plain text — `html` not needed unless you find markup; check first.
- `design/primitives/NoticeCard.tsx` — for the "these are estimates / check your own
  figures" line each tool already publishes in `tool.intro` or `tool.explainer`.
  `tone="slate"` (there is no red tone by design), `ground` set to the section it sits on.
  **Feed it the page's existing sentence. If no such sentence exists on a tool, do not
  mount one on that tool.**
- `design/primitives/ExampleFigureNote.tsx` — under the calculator result, on each tool.
  **Read its docstring first (`ExampleFigureNote.tsx:1-22`): the owner's explicit decision
  is that it goes on EVERY visual carrying figures, statutory ones included, and the ONE
  place it is deliberately not used is `StatsCounter`.** Default `label` is "Example figures
  displayed"; pass a different one only if the page already publishes different words.
- `design/marketing/LeadCTAPanel.tsx` — **on `/calculators` (the index), which has NO form
  today.** Fed the index's own existing sentences (`:18-23`). `eyebrow=""`, `formTitle=""`,
  `proofPoints={[]}`, `form={<LeadForm submitLabel="Request callback" />}`,
  `backdrop={<HospitalityBackdrop />}`, `.ground-dark` implied by the panel's own
  `bg-slate-900`.
- **On each TOOL page**: the enquiry surface already exists as `CalcResultCta` →
  `MiniCapture` under the result (`:90`), and phase 0 deliberately DELETED the duplicate
  footer form (`:117-120`). **Locked rule 6 says an enquiry form on every money page; the
  tool pages already satisfy it.** Adding a `LeadCTAPanel` as well would restore the exact
  duplicate phase 0 removed. **Do not.** Say so in the receipt, with the `:117-120` comment
  as the reason.
- `design/marketing/ScrollGlowGroup.tsx` — the index's three-card grid.

**DECLINE:**

- `packages/web-shared/design/primitives/SlimHero.tsx` — same K1 reason as W3: `:36`
  hardcodes `bg-slate-900` and this hero is `var(--brand-primary)`. Keep the brand ground,
  mount `HospitalityBackdrop` + `.ground-dark` in it.
- Anything that would put a second capture form on a tool page (see above).

**The CSS-variable theming is this package's mechanical work.** `calculators/page.tsx` and
`calculators/[slug]/page.tsx` paint entirely through `var(--brand-primary)`,
`var(--border)`, `var(--ink)`, `var(--ink-soft)`, `var(--muted)`, `var(--surface)`. **T25
applies: `browser_check.mjs` cannot always resolve a `var()` chain and falls back to white,
which is how a site gets a 1.00 white-on-white report for a pair that actually passes.**
Convert these to the declared ramp/slate utilities so the contrast instrument can measure
what is really painted. `--brand-primary` and `--calc-result-accent` stay declared in
`globals.css` for the kit `Calculator`'s own internals — **do not remove either token, and
do not touch the kit `Calculator`.**
`neutral-*` hits to swap: **0**. Hardcoded hex: **0**. Both already clean.

**Link floors:** `/calculators` **9**; `/calculators/tronc-tips-paye-nic-calculator` **7**,
`/calculators/food-drink-vat-rate-checker` **7**,
`/calculators/staff-cost-rota-margin-calculator` **7**.

**Package-specific acceptance tests:**

- `curl -s :PORT/embed/food-drink-vat-rate-checker | grep -c '<header\|<footer\|<nav'` =
  **0** — the P1-C chrome bypass survived and no panel leaked in.
- Exactly **one** capture form per tool page (`grep -c '<form'` on the served HTML = 1) and
  exactly **one** on the index.
- `WebApplication` JSON-LD unchanged: `grep -o '"@type":"WebApplication"'` on all three tool
  URLs = 1 each, and the whole block `json.loads` clean. `lib/calculators/schema.ts:14`
  is the source; do not reshape it.
- `npm test` still green on `tronc.test.ts`, `vat-checker.test.ts`, `staff-cost.test.ts` —
  **you did not touch the maths.** `git diff --stat -- src/lib/calculators/tools/` is empty.
- Heading order: `P0B` finding 11 records an `h1 -> h3` jump on all three tool pages.
  **Fix it as part of this package** (the FAQ block's `<h3>`s now sit under the kit
  `FaqSection`'s own `<h2>`, which resolves it) and prove `h1 -> h2 -> h3` on all three.
- `og:image` is absent on all three tool pages (`P0B` finding 6) — **it is present in
  `generateMetadata` at `:28-34`.** Re-derive before "fixing": if the rendered page really
  lacks it, report it; do not add a second one.
- `--calc-result-accent` still declared and still consumed; the kit calculator result
  headline measures **>= 4.5** on its ground at wave close.

**OFF LIMITS:** the shared block, the other five packages' files, and
`src/lib/calculators/registry.ts` + `src/lib/calculators/tools/**` (read-only).

---

### W5 — HOMEPAGE AND `/about` (phase 5)

**Model: Opus.** The page the owner walks first, and the page the four-marker verdict is
measured on.

**Files owned (verified / to create):**

```
hospitality/web/src/app/page.tsx      (850 lines)
hospitality/web/src/app/about/page.tsx (57)
hospitality/web/src/components/marketing/**   NEW directory, W5 creates it
```

`src/components/marketing/` **does not exist today** (`ls hospitality/web/src/components`
confirms). Gate row 2b counts `app/page.tsx` PLUS `components/marketing/*.tsx`, which is
why the closing panel usually lives in a site-local wrapper there. **Every file W5 creates
gets a named owner in STATE.md at wave close** (R5 on startups-tech: crypto shipped five
net-new shared files that appeared in no package row and reached nine route families).

**Port FROM:** `generalist/web/src/app/page.tsx` bands 2-16 and
`generalist/web/src/components/home/HomeSections.tsx`; `Property/web/src/app/page.tsx` for
the hero pill and stats strip; `startups-tech/web/src/app/page.tsx` post-uplift for the
same bands done once already on a brand-ground site.

**THE FOUR-MARKER ROW IS THIS PACKAGE'S DELIVERABLE.** Today 0/0/0/0, measured on the
rendered HTML of `/`. Target, and every one of the four has a named home:

| marker | where it comes from | note |
|---|---|---|
| `animate-ping` | the hero status pill's live dot (band 1) | one dot. Not a decoration spree. |
| `StatsCounter` | band 2, the key-figures bar | see the mapping below |
| `Backdrop` | `HospitalityBackdrop` mounted on the hero (band 1), the testimonials band (11) and the closing panel (12) | three mounts, matching Property |
| `rounded-full` | the hero status pill + its ping dot | **do NOT get it from `TestimonialsSection`'s `initials` badge: deriving initials from "Owner, independent restaurant group, three sites, Midlands" would invent an identity (locked rule 4).** |

**The `StatsCounter` mapping — derive it, do not guess.** The four figures at
`page.tsx:40-61` already carry gov.uk `href`s, which is the whole reason `StatsCounter` was
declined estate-wide until `href` landed at `StatsCounter.tsx:24-26`. Map:

| existing value | `StatItem` | why |
|---|---|---|
| `"£90,000"` | `{target: 90000, value: "£90,000", label, href}` | `display.toFixed(0)` renders `90000` with no separator, which is NOT what the page publishes. `value` short-circuits at `:63-64`. |
| `"£12.71"` | `{target: 12.71, decimals: 2, prefix: "£", label, href}` | counts up correctly |
| `"15%"` | `{target: 15, suffix: "%", label, href}` | counts up correctly |
| `"£10,500"` | `{target: 10500, value: "£10,500", label, href}` | separator again |

**T15: the SSR frame must carry the TRUE figure.** `StatValue` initialises
`useState(target)`, so it does — **prove it with `curl -s :PORT/ | grep '12.71'` before you
claim it.** A count-up from 60% that server-renders the wrong number is a factual defect,
not an animation detail, and these are locked tax figures.
The `StatsCounter` grid paints `text-slate-900` on whatever is behind it
(`StatsCounter.tsx:114`): the band is `bg-[#b0532f]` today. **Either move the band to a
light ground (a visible change — ask the manager) or measure `slate-900` on `#b0532f`
before shipping it.** Do not ship an unmeasured pair.

**`TestimonialsSection` — the exact call:**

```
<TestimonialsSection
  eyebrow="Real outcomes"                      // the existing .section-label at :715
  title="What operators say"                   // the existing <h2> at :717
  description=""                               // the existing standfirst moves to footnote; see below
  items={/* the three existing quotes: quote -> quote, attribution -> who */}
  showRating={false}                           // LOCKED: the site publishes no rating
  footnote={/* the existing disclaimer at :719-722, verbatim, owner-ruled to stay */}
  backdrop={<HospitalityBackdrop />}
/>
```
`description` and `footnote` both render; **put the existing disclaimer in exactly ONE of
them and leave the other unset.** `footnote` is the better home (`text-slate-400`, under the
grid) and matches what it is. Do not pass `initials`, do not pass `highlight`, do not add a
fourth quote.

**`LeadCTAPanel` for band 12** — the four tick rows at `:758-762` are already
`{title, sub}` pairs and map one-for-one onto `proofPoints` `{title, detail}`. `title` and
`description` = the existing `<h2>` and `<p>` at `:750-756`. `formTitle` = the existing
`<h3>` "Get in touch" at `:777-779`. `eyebrow=""` (locked rule 16).
`backdrop={<HospitalityBackdrop />}`. This deletes the hand-rolled band and its
`bg-gradient-to-br` div — **gate row 7 names `app/page.tsx` as the one gradient file on this
site; removing that div may empty row 7 entirely. Report which gradients survive and
measure each surviving one stop by stop.**

**The three-post blog band (band 14).** `getAllPosts()` from `src/lib/blog.ts` (W2's file,
**read-only to W5, shape frozen**). Render the three most recent as real cards with real
`href`s. Keep the band's existing heading, standfirst and two buttons. This RAISES the
homepage floor from 21; report the new number.

**`<Eyebrow>` for all 8 `.section-label` divs.** Gate row 5 needs `<Eyebrow> >= section-label`
measured on COMMENT-STRIPPED source. Target after this package: `Eyebrow >= 8`,
`section-label = 0`. **Use the comment-stripped command from the gate block, not a raw
grep** — the raw grep is wrong in both directions (R2 NIT 10 on startups-tech was an
acceptance test made unreachable by exactly this).

**`/about`:** the brand hero gets `HospitalityBackdrop` + `.ground-dark` + `Eyebrow onDark`
+ `Breadcrumb tone="onBrand"`; the existing `LeadCTAPanel` gains `backdrop`. 4 `neutral-*`,
1 hex. Floor **6**.

**The bulk mechanical work: 66 `neutral-*` swaps and 48 hardcoded hexes on `page.tsx`.**
Same-numeric-step mapping (`neutral-N` -> `slate-N`). **Exception to check BEFORE replacing:
`bg-[#fafaf9]` is an arbitrary-value warm off-white used on five bands (`:354, :403, :481,
:641, :821`). It is a literal, not a `neutral-*` class, so the sweep does not touch it —
and you must not "normalise" it into `slate-50` either, which is a visible colour change
nobody asked for. Scan with `grep -o 'bg-\[#[0-9a-fA-F]\{3,8\}\]'` alongside the named-scale
scan and say which you ran.** The dark grounds `#3a1a0d` / `#2a1208` are the hero and table
bands: they become declared tokens or `primary-950`-adjacent steps only if the ratio is
unchanged; **if a swap moves a measured ratio, keep the literal and write the reason at
the line** (gate row 6 exists to be read, not to be empty).

**Link floor:** `/` **21**. It must RISE (three blog posts). Report the number.

**Package-specific acceptance tests:**

- Four-marker row on the RENDERED HTML of `/`:
  `for m in animate-ping StatsCounter- Backdrop rounded-full; do ...` — **state the method
  you used for each**, because `StatsCounter` and `Backdrop` are component names that do not
  appear in HTML: count them from comment-stripped SOURCE imports, and count `animate-ping`
  and `rounded-full` from the rendered HTML. Say which you counted where.
- Gate row 2b over `app/page.tsx` + `components/marketing/*.tsx`, comment-stripped:
  `adopted >= 1`. **`0/0` is a FAIL.**
- Gate row 5, comment-stripped: `<Eyebrow` **>= 8**, `section-label` **= 0**.
- `grep -o 'neutral-[0-9]\{2,3\}' src/app/page.tsx | wc -l` = **0** (was 66).
- `grep -oE '#[0-9a-fA-F]{3,8}' src/app/page.tsx | wc -l` = **0**, or every survivor has a
  written reason at its line (R2 GAP 6 was five survivors with no reason).
- `curl -s :PORT/ | grep -c '£90,000'` and `grep -c '12.71'` both **>= 1** — the true
  figures are in the pre-hydration HTML (T15).
- The 8 FAQ answers are in the server HTML AND in the `FAQPage` JSON-LD, from ONE binding
  (`faqs`), and `alwaysRenderAnswers` is set.
- Exactly **one** `<form>` on the homepage.
- `.ground-dark` is on every section this package paints dark, and each one's ring ratio is
  written into the receipt.
- No sticky bar, no modal, no banner: `grep -rn 'StickyCTA\|Modal\|Banner\|ReturningBar\|
  NextStepOffer\|SignupForm' src/app/page.tsx src/components/marketing` = **0**.

**OFF LIMITS:** the shared block, the other five packages' files, and `src/lib/blog.ts`
(read-only, W2 owns it).

---

### W6 — CONTACT, FUNNEL, LEGAL, FORMS AND RESEARCH (phase 6)

**Model: Opus.** The conversion surface, the compliance pages and 1,114 lines of published
research.

**This is the largest package in the wave.** It is one package because the brief fixes six,
and because its three clusters share the form components. **Risk R5 below names the split
the manager should make if the agent budget allows a seventh builder.**

**Files owned (all verified):**

```
hospitality/web/src/app/contact/page.tsx                                   (23 lines)
hospitality/web/src/app/book/page.tsx                                      (57)
hospitality/web/src/app/complete/page.tsx                                  (127)
hospitality/web/src/app/thank-you/page.tsx                                 (117)
hospitality/web/src/app/privacy-policy/page.tsx                            (253)
hospitality/web/src/app/terms/page.tsx                                     (160)
hospitality/web/src/app/cookie-policy/page.tsx                             (145)
hospitality/web/src/components/forms/LeadForm.tsx                          (450)
hospitality/web/src/components/forms/DetailsForm.tsx                       (218)
hospitality/web/src/components/forms/BookingPicker.tsx                     (173)
hospitality/web/src/components/calculators/MiniCapture.tsx                 (178)
hospitality/web/src/components/analytics/ConsentToggle.tsx                 (26)
hospitality/web/src/app/research/page.tsx                                  (89)
hospitality/web/src/app/research/uk-hospitality-insolvency-index/page.tsx  (468)
hospitality/web/src/app/research/uk-hospitality-food-hygiene-map/page.tsx  (351)
hospitality/web/src/app/research/hospitality-openings-closures-index/page.tsx (295)
hospitality/web/src/app/research/hospitality-openings-closures-index/embed/page.tsx (95)
hospitality/web/src/components/research/FsaHygieneCharts.tsx               (54)
hospitality/web/src/components/research/HospitalityInsolvencyCharts.tsx    (215)
hospitality/web/src/lib/research/**                                        formatters, read-only
hospitality/web/src/data/*.json                                            3 snapshots, READ-ONLY
```

**Port FROM:** `startups-tech/web/src/app/thank-you/page.tsx`, `complete/page.tsx`,
`book/page.tsx` post-uplift (the `SlimHero` + backdrop shape on `noindex` pages);
`generalist/web/src/app/research/` for the research hub panel and per-asset `data-cta`.

**ADOPT:**

- **`design/primitives/SlimHero.tsx` on `/book`, `/complete` and `/thank-you` — and ONLY
  there.** These three pages are exactly what `SlimHero` was written for (its own docstring,
  `:5-13`: "the shallow navy hero the three token-gated post-submit pages open on:
  /thank-you, /book and /complete"). Its hardcoded `bg-slate-900` is CORRECT here — these
  pages have no brand hero today, so K1 does not bite. `eyebrow` = each page's own existing
  label, `title` = its existing `<h1>`, `children` = its existing standfirst,
  `backdrop={<HospitalityBackdrop />}`, and `.ground-dark` on the section.
  **`/thank-you` has three mutually exclusive branches: one `<h1>` renders, so one
  `SlimHero` renders. Do not create three visible ones.**
- **`design/primitives/SlimHero.tsx` on the four research routes: DECLINE**, same K1 reason
  as W3/W4 (their heroes are `bg-[var(--brand-primary)]`). Keep the brand ground, mount
  `HospitalityBackdrop` + `.ground-dark` + `Eyebrow onDark` + `Breadcrumb tone="onBrand"`.
- `design/primitives/NoticeCard.tsx` — the four hand-rolled "needs the personal link" /
  "link expired" cards on `/book:42-51` and `/complete:24-36,53-61`. **This is the exact
  component: its docstring (`:1-18`) says there were eight near-copies of this card across
  `/book`, `/complete`, `BookingPicker` and `DetailsForm`, all `border-2` with square
  corners, already drifting. `tone="slate"` for the dead ends (nobody has done anything
  wrong), `tone="primary"` for a good outcome.** Feed the existing sentences verbatim.
- `design/marketing/WhatToExpectCard.tsx` — on `/contact` and `/thank-you`.
  **`items` MUST be passed (locked rule 17); the default publishes "Fixed fee quote if you
  decide to proceed", which `/contact` does not say.** The four `{title, sub}` rows at
  `page.tsx:758-762` are the homepage's, not this page's; if `/contact` has no such list
  today, **either feed it the site's existing `niche.cta` strings or do not mount it.**
- `design/primitives/Breadcrumb.tsx` with `tone="onBrand"` on the four research routes and
  `tone="default"` on `/contact` and the three legal pages. **NOT on `/book`, `/complete`
  or `/thank-you`**: all three are `noindex` and `SlimHero`'s docstring says a breadcrumb
  trail to them would be fiction.
- `design/primitives/page-blocks.tsx` `Eyebrow` — the research hero's existing "Research"
  label at `research/page.tsx:56` is a hand-rolled one; swap it.
- `design/primitives/FaqSection.tsx` with `alwaysRenderAnswers` — **two of the three
  research pages emit `FAQPage` JSON-LD** (`uk-hospitality-food-hygiene-map:156`,
  `uk-hospitality-insolvency-index:168`) and render their FAQs flat. R5 B6 on startups-tech
  was exactly this: two research pages flat while three siblings used the accordion.
  **Make all FAQ-bearing pages on this site consistent.** Check `html` per page.
- `design/marketing/LeadCTAPanel.tsx` — **on `/research` (the index), which has NO form
  today.** Fed the index's own sentences at `:60-64`. On the three research DETAIL pages the
  existing `LeadForm` stays where it is; wrap it in a `LeadCTAPanel` only if that does not
  create a second form. **Count forms before and after.**
- `design/marketing/StatsCounter.tsx` — the three `r.stat` figures on `/research`
  (`research/page.tsx:77`) are computed strings (`fmtNumber`, `fmtPct`). **They must go
  through `value`, never `target`** — a formatter output is not a number a counter can
  reach, and this is the exact shape `value` was added to fix. **These three carry no
  source `href`: do not invent one.** If feeding it is awkward, decline and say so.
- `design/primitives/ExampleFigureNote.tsx` — under each research chart/table carrying
  figures. **Read its docstring: the owner's explicit decision is "everywhere, statutory
  figures included", and the ONE exclusion is `StatsCounter`.**

**DECLINE:**

- `packages/web-shared/design/primitives/SlimHero.tsx` on the four research/brand-ground
  heroes (K1).
- **Any kit prose component over the research page bodies** — all three render authored
  HTML through `dangerouslySetInnerHTML` (T12, locked rule 11). The `html` props on
  `CardStack` / `CoverageCards` / `FaqSection` cover FAQ answers and card bodies, **not**
  whole report sections. Say which you checked.
- `packages/web-shared/leads/**` — this site runs local `LeadForm` / `MiniCapture` /
  `BookingPicker` / `DetailsForm`. `P0E` flagged `MiniCapture` fork-vs-shared and
  `BookingPicker`/`DetailsForm` vs `leads/capture-steps` as UNRESOLVED. **Resolve it: grep
  the kit for each, compare, and either adopt with a measured reason or decline with one.
  Do not leave it unresolved a third time.**

**The forms — the ramp swap only. THE RING SWAP IS ALREADY DONE (see A11): all four
already import and interpolate the local `focusRing`. Do not redo it; verify it is there
and report if it is not.** What is left for W6: 14 + 11 + 13 = **38 `neutral-*` hits**
across `LeadForm`, `DetailsForm`, `BookingPicker` (`MiniCapture` is already clean at 0),
plus 2 hardcoded hexes in `LeadForm` — both inside `focus:border-[var(--brand,#b0532f)]`
fallbacks, where `--brand` is declared nowhere. Either declare `--brand` through the
manager or point the border at `--brand-primary`, which IS declared (`globals.css:126`) to
the identical value; **do not leave an undeclared custom property with a literal fallback,
and do not silently change the colour.**
**FROZEN inside all four form files — a diff touching any of these fails the package:**
`formId`, `data-cta`, `leadConsentText` / the consent sentence, `redirectOnSuccess`,
`submitLabel` defaults, every `name=` attribute, `enquiry_ref`, and every `/api/leads/*`
call. T19: a consent-wording change cut mini-form leads by 60% on another site.

**Legal pages:** 16 + 14 + 12 = **42 `neutral-*`** and 4 + 12 + 10 = **26 hexes**. Ramp
swap and typography only. **Not one sentence of compliance copy changes** — T18 says every
compliance sentence is checked against code that actually runs, and this site's cookie
policy vs AdSense question is an OWNER-RULED row in `P0A_CLAIMS_LEDGER.md` that was left as
is. **Do not reopen it.**

**Link floors:** `/contact` **6**, `/privacy-policy` **6**, `/cookie-policy` **6**,
`/terms` **6**, `/research` **9**, `/research/uk-hospitality-insolvency-index` **7**,
`/research/uk-hospitality-food-hygiene-map` **7**,
`/research/hospitality-openings-closures-index` **7**.
`/book`, `/complete` and `/thank-you` are `noindex` and carry no baseline floor; **do not
invent one, and do not add links to them to hit a number.**

**Package-specific acceptance tests:**

- `git diff -- src/components/forms src/components/calculators/MiniCapture.tsx | grep -E
  '^[-+].*(formId|data-cta|leadConsent|redirectOnSuccess|submitLabel|name=|enquiry_ref)'`
  — **empty.**
- `curl -s :PORT/thank-you | grep -c '<main'` = **1** and `grep -c '<h1'` = **1** (three
  branches, one renders).
- `Dataset` JSON-LD present and parsing on all three research detail URLs. `grep -o
  '"@type":"Dataset"'` = 1 each.
- `/research` serves **>= 9** unique internal hrefs and now has exactly **one** `<form>`.
- Each research detail page still has exactly **one** `<form>` — you added a panel, not a
  second form.
- `curl -s :PORT/research/hospitality-openings-closures-index/embed | grep -c
  '<header\|<footer'` = **0**.
- The three research pages' `scroll-mt-24` anchors survive: `browser_check.mjs`
  `anchorGaps: []`.
- `grep -rn 'partner network' src` — report the count, change nothing (A12).
- Every `<table>` on a research page is still inside an `overflow-x-auto` wrapper
  (`P0E` §6 records all four table-bearing files as correctly wrapped today).
- `P0B` finding 5 (doubled `| Hospitality Tax | Hospitality Tax` in `<title>` on
  `/research` and two detail pages) and finding 7 (`hospitality.example.com` canonical on
  `/research/hospitality-openings-closures-index`): **re-derive both on the current build
  before acting.** If still live, fix them here — a wrong canonical is a correctness defect
  and T34 says a correctness sweep ignores phase boundaries.

**OFF LIMITS:** the shared block, the other five packages' files, and the three
`src/data/*.json` research snapshots (read-only: an edit there publishes a wrong figure).

---

### M1 — MOP-UP (gap-fix round, NOT concurrent)

Runs after the two reviews. Owns the cross-seam defects nobody scoped: files the wave
CREATED with no owner, the `git diff --diff-filter=A` list, and every "saw it but could not
reach it" item the six builders reported. **Opus.** Up to three Sonnet gap-fixers on
disjoint, file:line-specified fixes may run alongside it.

---

## C. KIT GAPS FOR THE MANAGER

Additive props only. Every one has a default that keeps every existing consumer
**byte-identical**, and every one carries the grep that proves it. **Trap 12 binds: none of
these may change Property, including indirectly.** The manager decides whether any of them
ships; **the wave is designed to complete with NONE of them**, by declining in writing.

| # | component | gap | proposed additive change | default keeping every consumer byte-identical | proof grep | required? |
|---|---|---|---|---|---|---|
| **K1** | `design/primitives/SlimHero.tsx:36` | ground is hardcoded `bg-slate-900`; `eyebrow` is required at `:28`. This site has **13 brand-ground heroes** (`/services`, 5 details, `/for`, 6 details) plus 4 research routes that would all flip from `#b0532f` to navy on adoption — a designer-set colour change, banned by locked rule 7. | `sectionClassName?: string` (default `"bg-slate-900"`, spliced into the existing `relative overflow-hidden ... py-8 sm:py-10 lg:py-12` string) and `eyebrow?: string` (render the `<Eyebrow>` only when truthy). | omitting both reproduces today's markup exactly | `grep -rn "design/primitives/SlimHero" --include=*.tsx . \| grep -v node_modules` then `grep -rn "sectionClassName" .` = 0 today | **NO.** W3/W4/W6 decline it in writing and keep the brand ground. This is the single highest-value gap if the owner ever wants it. |
| **K2** | `design/marketing/CoverageCards.tsx:5-15` | `CoverageItem` has no `href`. On `/services` (floor 11), `/for` (12) and the homepage's 6-cell grid, **the cards ARE the link floor**. C5 in the startups-tech uplift proposed this and it never shipped. | `href?: string` on `CoverageItem`; wrap the card in a `Link` only when set. | unset = today's plain card | `grep -rn "CoverageCards" --include=*.tsx . \| grep -v node_modules`; `grep -rn "CoverageItem" .` — no existing caller sets `href` | **NO.** W3 and W5 decline on the `href` half and state that the `html` half of the old decline is stale. |
| **K3** | `design/primitives/accordion.tsx:34` | `AccordionTrigger` hardcodes `focus-visible:outline-primary-600`, a literal utility a call site cannot override, so the kit FAQ's ring bypasses this site's `--focus-ring` / `.ground-dark` mechanism on every FAQ page. | change the literal to `focus-visible:outline-[var(--kit-focus-ring,var(--color-primary-600))]`. **Not a new prop: it resolves to the identical colour on every site that does not declare `--kit-focus-ring`.** | identical paint everywhere; only this site (which declares it, `globals.css:181`) changes, and changes to the value it already wants | `grep -rln "kit-focus-ring" --include=globals.css . ` — declares it: hospitality, startups-tech. Everyone else falls back. | **NO,** but recommended. Without it, gate row 6 will list the kit FAQ trigger on every FAQ page and the reviewer has to read a reason at each. |
| **K4** | `design/primitives/accordion.tsx:62` + `layout.tsx:110` | `alwaysRenderAnswers` sets `data-[state=closed]:hidden`. **With JavaScript OFF, Radix SSRs every item closed, so every FAQ answer is hidden.** R5 B3 on startups-tech, on 14 pages. Live here on 23 blog posts today and on ~17 more pages after this wave. | **NOT a kit change** (32 consumer files, trap 12). The fix is one line in the site's existing `<noscript>` block in `layout.tsx:110-113`, which already releases `.eyebrow-rule` and `.tick-draw`. Add: `[data-state="closed"]{display:block!important}` scoped to the accordion content class. | no consumer outside this site is touched at all | `grep -rn 'alwaysRenderAnswers' . \| grep -v node_modules` | **YES, and it is a MANAGER edit to `layout.tsx`, which is OFF LIMITS to all six builders.** Do it in the same commit as P1-C or immediately after. Verify by disabling JS in `browser_check.mjs` and counting visible answers. |
| **K5** | `design/blog/BlogSidebarCta.tsx:66-68` | hardcodes the line "Free, no obligation. The form is just below." — microcopy the host cannot suppress. | `note?: ReactNode` with the current string as the default. | default = today's string | `grep -rn "BlogSidebarCta" --include=*.tsx . \| grep -v node_modules` | **NO.** This site already publishes "no obligation" in four places (`/book:36`, `CalcResultCta.tsx:12`, and both `LeadCTAPanel` descriptions), so the sentence introduces no new claim here. Adopt as-is; log the gap. |
| **K6** | `design/marketing/ProblemStatement.tsx:33-56` | hardcodes Property's landlord copy AND a "Book your free first call" button, with no copy props. C4 in the startups-tech uplift proposed `eyebrow?/title?/body?` and it never shipped. | `eyebrow?`, `title?`, `body?`, `ctaLabel?`, `ctaHref?`, all defaulting to today's strings. | defaults = today | `grep -rn "ProblemStatement" --include=*.tsx . \| grep -v node_modules` | **NO.** W5 declines it: the site's intro strip is one paragraph and the kit component is a two-column layout needing a right-hand marquee this site does not publish. |
| **K7** | `design/marketing/WhatToExpectCard.tsx:22-27` | `DEFAULT_ITEMS` publish a FEE LINE. | none needed. | — | `grep -rn "WhatToExpectCard" --include=*.tsx .` | **NO.** It is a rule, not a gap: locked rule 17, always pass `items`. |
| **K8** | `design/marketing/LeadCTAPanel.tsx:18` | default `eyebrow` is a FEE CLAIM. | none needed. | — | `grep -rn "LeadCTAPanel" hospitality/web/src` — all 4 existing mounts already pass `eyebrow=""` | **NO.** Locked rule 16. |

**Nothing else in the kit blocks this wave.** Specifically verified present and usable at
`70047cb6`, so **no builder may decline any of these on a stale reason**:
`FaqSection` `html` (`:19`) + `alwaysRenderAnswers` (`:33`) + `tone` (`:24`);
`StatsCounter` `StatItem.value` (`:15`) + `href` (`:24`);
`TestimonialsSection` `items` (`:66`) + `showRating` (`:70`) + `footnote` (`:74`) +
`TestimonialItem.highlight` optional (`:11`);
`Breadcrumb` `tone` with `"onBrand"` (`:29-36`);
`CardStack` `html` (`page-blocks.tsx:92,99`);
`CoverageCards` `html` (`:35`) + `glow` (`:35`) + `columns` (`:34`);
`ProcessTimeline` `html` (`:27`);
`HubArticleList` does **not** slice (`:45-55`, off-page cards carry `hidden`);
`ScrollGlowGroup` `as` + `delay` (`:23-24`);
`DrawnTickList` `tickClassName` (`:35`).

---

## D. DEPENDENCIES, CONCURRENCY AND LAUNCH ORDER

**ALL SIX BUILDER PACKAGES ARE CONCURRENT. There is no blocking dependency between them.**

Derivation, not assertion, for every possible edge:

- **Ramp, tokens, ring recipes, motion layer, backdrop:** all already in `globals.css`,
  `layout-utils.ts` and `HospitalityBackdrop.tsx` on the working tree, all OFF LIMITS to
  all six. No package waits on another for a colour, a ring or a motif. Prove it after the
  build with `grep -o "primary-600" hospitality/web/.next/static/css/*.css | wc -l` being
  non-zero — **`-o ... | wc -l`, never `grep -c`: a built stylesheet is ONE line.**
- **Chrome (`PageShell`, header, footer, skip link, `<main>`, `/embed` bypass):** P1-C, in
  flight in another agent's tree right now. **Every package plans against the P1-C SPEC in
  `PHASE1_PACKAGES.md:389-511`, not against the files.** The only contract the six need is:
  the layout supplies exactly one `<main id="main">`, a skip link, and no chrome under
  `/embed/*`. Nothing in phases 2-6 renders any of those. **If P1-C is not committed when
  the wave launches, the wave still launches** — the six touch none of P1-C's files.
- **`src/lib/blog.ts` / `markdown-utils.ts`:** W2 owns both. W5 imports `getAllPosts` for
  the blog band. Contract: **W2 must not change either file's EXPORTED SHAPE.** State it as
  a hard constraint in W2's brief.
- **`src/data/hospitality-services.ts` / `hospitality-hubs.ts`:** W3 owns them;
  `app/page.tsx` (W5) does **not** import them (verified: the homepage hardcodes its own
  `services` and `subTrades` arrays at `:63-133`), but `llms-full.txt/route.ts` and the
  footer do. Contract: **exported shape frozen.**
- **`src/lib/calculators/registry.ts`:** W4 owns the pages; the registry is read-only to
  it, and `layout.tsx` reads `TOOLS` for the nav. Exported shape frozen.
- **`src/components/calculators/MiniCapture.tsx`:** W6 owns it; W2 (`InlineMiniLeadForm`)
  and W4 (`CalcResultCta`) both MOUNT it. Contract: **W6 must not change `MiniCapture`'s
  prop signature** (`formId`, `messagePrefix`, `heading`, `blurb`, `submitLabel`,
  `className`). Say it in all three briefs.
- **`src/lib/schema.ts`:** imported by W2, W3, W5 and W6. **Therefore OFF LIMITS to all six
  and manager-direct.** This is the one genuinely shared surface in the wave and fencing it
  is what keeps the six disjoint. If a package needs a schema builder changed (R3 G1/G2:
  `headline` drift, missing `datePublished`/`author`), it REPORTS the change with the exact
  diff and the manager applies it once.
- **`src/config/site.ts` and `niche.config.json`:** read by everything, written by the
  manager only. Any NEW label a package needs (locked rule 4) is requested from the manager
  as a config string, with the exact key and value.

**Launch: one message, six tool calls, all six at once.** That is the cap (playbook T39:
6 concurrent agents, and every brief says "Do NOT launch subagents", or five become twenty).

**Then, strictly serial and manager-direct:**

1. Preflight: `netstat -ano | grep ":32"` and kill every orphan. **A server has been
   running on :3202 from the pre-phase-1 build throughout this planning pass — kill it
   before the wave build, or every measurement is against the old bundle** (T37: nineteen
   orphaned servers were the direct cause of three wrong-site measurements).
2. ONE `next build` in `hospitality/web`, nothing else building (T1).
3. `next start -p 3202`; **assert the served `<title>` reads "Specialist Hospitality
   Accountants UK" AND assert the server's age** before trusting a single number (T2: a
   "verified green" build can predate the files it claims to cover).
4. The verification executor (section F) runs EVERY row against that ONE build. **Expect
   roughly 2 in 30 to fail on a wrong expected value in a brief rather than a site defect;
   that was the charities ratio. Settle each at the element, not by argument.**
5. Only then tag. **Tag `port-hospitality-phase2` .. `phase6` AND
   `port-hospitality-complete` at the end** — a checkout of a phase tag is missing every
   review fix (STOP block). `git tag -l 'port-hospitality*'` currently reads
   `port-hospitality-phase0` (commit `36d2b4fe`); the phase-1 tag is the in-flight wave's
   to add. See E.1.2.
6. Two independent adversarial reviewers, concurrently (design, content). Each gets the
   running server, the KNOWN AND ACCEPTED list, and **"finding nothing is a failed review"**.
7. Gap-fix round: M1 plus up to three gap-fixers on disjoint files.
8. ONE re-review (T7: a fix pass introduced a blocker last time).

---

## E. RISKS, AMBIGUITIES, AND EVERY FALSE PREMISE FOUND

### E.1 False premises, numbered. Source wins; here is what the source says.

1. **`P0E_STRUCTURAL_INVENTORY.md` §2: "30 `page.tsx` files total (25 public + 5 admin)".**
   It is **29** — 24 public + 5 admin. Deriving command:
   `find hospitality/web/src/app -name page.tsx | wc -l` = 29, and the same count holds at
   HEAD. `PHASE0_PACKAGES.md` repeats the 30/25. A brief saying 25 public would have a
   builder hunting a route that does not exist.

2. **PHASE 0 IS COMMITTED AND TAGGED — a mid-pass correction, recorded because it is the
   shape that has lied to three previous sessions.** When this plan's reading pass began,
   `PHASE0_PACKAGES.md` marked P0-F and P0-G DONE with "see close block", but the document
   had no close block, `git tag -l 'port-hospitality*'` was **EMPTY**, and
   `docs/hospitality/_port/P0G_RECHECK.md` **did not exist**. All three were true as read
   and would have been playbook **T38**, the fourth occurrence on this programme. The
   manager wrote the close block and committed during this pass. Current, re-derived
   state: commit **`36d2b4fe`** (`port(hospitality): phase 0, claims audit and serious-tier
   fixes, instrument baseline`), tag **`port-hospitality-phase0`**, close block at
   `PHASE0_PACKAGES.md:41-56` committed as `e0562d30`, and `P0G_RECHECK.md` present.
   **Use those, and re-derive rather than believing either version of this paragraph.**
   The re-check's own figures, which supersede several `P0D` numbers quoted elsewhere in
   this plan: sweep 59/59, dead links **3 → 0**, link floors held on every route, em-dashes
   0; contrast **235 → 219** (the 16 `LeadForm` failures are gone; the 219 remaining are
   the header CTA and the consent toggle, both replaced in phase 1); overflow 0; anchor
   gaps 0; dead-link 404s **12 → 0**; CTA triple unchanged at 59 × `header_book|header|form`.
   One curl proof FAILS and it is **not** a wave defect: the `h1 → h3` jump on the three
   calculator pages, filed by P0-E, predates the wave and is **W4's** to close. 9 agents
   in phase 0. **The pre-wave SHA for every "before" comparison in section F is the
   phase-1 close commit, NOT `36d2b4fe`.**

3. **`PHASE1_PACKAGES.md` P1-D's per-phase `neutral-*` totals are LINE counts, not hit
   counts, and every one of them understates.** Its table says P2 19, P3 49, P5 55, P6 101.
   Re-derived with `grep -o 'neutral-[0-9]\{2,3\}' <file> | wc -l`: **P2 22** (7+4+11),
   **P3 54** (8+20+6+20), **P5 66**, **P6 113** (4+2+5+11+11+16+14+12+14+11+13). The
   brief's own "66 neutral-* swaps" for the homepage is **correct** and is the hit count;
   P1-D's 55 for the same file is the line count. **Use the hit counts above.** Each
   package's acceptance test is `= 0` either way, so no package is blocked — but a builder
   who stops at 55 on the homepage leaves 11 live.

4. **The brief: "the one link F1 had to strip on `/services/tronc-scheme-setup`".**
   Correct that there is exactly one, and correct about the page. **The link pointed at
   `/services/hospitality-payroll`, not at the tronc page.** Deriving command:
   `git diff -U2 -- hospitality/web/src/data/hospitality-services.ts` (two hunks; the second
   is the unrelated calculator-slug fix). W3's brief carries the exact restored string.
   `grep -c 'answer:.*<a ' src/data/*.ts` = **0** today, **1** after the restore.

5. **The brief: "the 12px footnote markers" on the research pages.**
   **They do not exist on this site.** `grep -rno 'text-\[1[0-4]px\]\|text-\[0\.[0-9]*rem\]'
   hospitality/web/src/app/research` = **0 hits**. The research source notes are `text-xs`
   (`uk-hospitality-food-hygiene-map/page.tsx:217`,
   `uk-hospitality-insolvency-index/page.tsx:241`). R2's startups-tech finding (twelve 12px
   markers at 3.09, one 12px `td` at 4.24) was a startups-tech defect and has no analogue
   here. `P0D` records **0** contrast failures on those routes beyond the two site-wide
   chrome signatures. **W6 has nothing to fix here; it must still not INTRODUCE any.**

6. **The brief: "enquiry panel already on all four after phase 0" (research).**
   Half right. The three DETAIL pages each carry a `LeadForm` (`:286`, `:330`, `:447`).
   **`/research`, the index, has NONE** — confirmed by `grep -n 'LeadForm\|LeadCTAPanel'
   src/app/research/page.tsx` = 0 hits, and by `P0E` §5, which lists `/research` in its
   zero-form list. **Locked rule 6 names the research index explicitly, so W6 adds it.**

7. **`P0E_STRUCTURAL_INVENTORY.md` §9: "`Dataset` JSON-LD schema presence not independently
   verified."** Verified now: **present on all three** detail pages, at
   `hospitality-openings-closures-index/page.tsx:36`,
   `uk-hospitality-food-hygiene-map/page.tsx:71`,
   `uk-hospitality-insolvency-index/page.tsx:90`, two of the three also carrying
   `DataDownload`. Nothing to build; W6 keeps them.

8. **`P0B_RENDERED_SWEEP.md` per-family note: "`Article`/`BlogPosting` type not detected on
   any post... the site's blog posts do not emit `Article`/`BlogPosting` JSON-LD at all"
   and "no `BreadcrumbList` on any of the 23 posts checked".** Both were true when written
   and are **false now**: the post template emits `buildBlogPostingJsonLd` at `:80-95` and
   `buildPageBreadcrumbJsonLd` at `:96-106`, both added by the phase-0 F2 wave.
   `PHASE0_PACKAGES.md` separately records that P0-B's "no BreadcrumbList on services/for"
   was a check error. **W2 must not "add" schema that is already there — it must instead
   make sure `Breadcrumb` does not emit a SECOND `BreadcrumbList`.**

9. **`P0C_CSS_TOKEN_AUDIT.md` reports the homepage `section-label` ratio as 8 and the P1-A
   gate block reprints `section-label=8`.** Correct: **8**, at `page.tsx:369, 483, 591, 615,
   643, 715, 749, 824`. Noted only because `P0C` also lists the total for the whole `src`
   tree as 8, which is the same 8 — **there are no `section-label` uses outside
   `app/page.tsx`.** W5 therefore closes gate row 5 on its own; no other package has one to
   convert, and no other package should go looking.

10. **`P0D_BASELINE.md`'s 235 contrast failures are SUPERSEDED by `P0G_RECHECK.md`'s 219.**
    The 16 that went are the `LeadForm` entries (the two borderline 4.50 signatures,
    `"Step 1 of 2 · About you"` and `"(optional)"`, fixed by the same phase-1 diff that did
    the ring swap). The **219 that remain are the 74 white-on-white "Get in touch" and the
    145 "Do not track me at 2.47"**, both **chrome**, on the header CTA and the
    `ConsentToggle`, and the re-check says both are replaced in phase 1. **Compare against
    219, not 235.**
    The header is P1-C's and the toggle is W6's (`components/analytics/ConsentToggle.tsx`).
    **T25 also applies to the first of these**: a ratio of exactly 1.00 white-on-white is
    the instrument's signature for an UNRESOLVABLE colour chain, not necessarily a real
    defect. **Re-derive at wave close against the post-phase-1 build before reporting
    either to the owner.** Do not hand him the raw contrast output.

11. **`P0E` §2 reports the research pages at `<main>` = 0.** `PHASE1_PACKAGES.md` C4
    already caught this and names the three lines. Confirmed: the three research pages each
    render their own `<main>`, and P1-C owns swapping them to `<div>`. **W6 does not touch
    them.** Recorded here so W6's builder does not "fix" it and collide with P1-C.

### E.2 Risks, with my recommended resolution

**R1. The hero-ground question is the single biggest chance to make this site worse.**
`SlimHero` hardcodes `bg-slate-900`. Thirteen brand-ground heroes plus four research heroes
would flip from the designer's `#b0532f` to navy if a builder adopts it "because the kit
says so". That is a designer-set colour change on 17 routes, and locked rule 7 forbids it.
**Resolution: DECLINE `SlimHero` on every brand-ground hero, in writing, naming
`packages/web-shared/design/primitives/SlimHero.tsx:36`, and ADOPT it on exactly the three
pages it was written for (`/book`, `/complete`, `/thank-you`). Put this in ALL SIX briefs
as a locked decision, not a judgement call**, so no builder reaches the opposite answer
alone. Log it as kit gap K1.

**R2. The `/blog` link floor of 37 is the tightest number in the wave.**
The site has 23 posts and 8 categories. Any list component with a page size, a slice or a
client-side filter breaches it, and the floor was captured from a working page so it will
not forgive. **Resolution:** `BlogListWithSearch` and `NumberedPagination` are declined in
W2's brief UP FRONT with the 37 as the stated reason; `HubArticleList` is adopted with its
non-slicing behaviour named and its own docstring line quoted; and "count the unique
`href="/...` in the SERVER HTML and state how you derived it" is a **blocking** acceptance
line.

**R3. The FAQ accordion hides every answer with JavaScript off.**
`alwaysRenderAnswers` + `data-[state=closed]:hidden` + Radix SSR-closed = invisible answers
on 23 blog posts today and ~40 pages after this wave, while the `FAQPage` JSON-LD keeps
asserting them. This is R5 B3 on startups-tech, unfixed. **Resolution: K4 — a one-line
addition to the existing `<noscript>` block in `layout.tsx`, which is a MANAGER edit, not a
builder edit.** Do it in the same commit as P1-C or immediately after. **Verify by
disabling JS and counting visible answers, not by reading the class.** (T8: verify the
attribute that produces the behaviour, not a proxy for it.)

**R4. The `.ground-dark` class is declared and mounted NOWHERE.**
`globals.css:202-215` declares it and its own comment says "Not mounted anywhere in phase 1
— the phase that first paints a dark ground applies this class and writes the row." Five of
the six packages paint a dark ground (every `LeadCTAPanel`, every `TestimonialsSection`,
every `SlimHero`, the `StatsCounter` band, the research heroes). **A declared-and-never-
mounted ring token is exactly R1's blocker B1 on startups-tech.**
**Resolution:** every package's acceptance test carries "`.ground-dark` is on every section
this package paints dark, and each one's ring ratio is in the receipt", and F-row F13 of
the verification list tab-walks it with a real browser. **Treat a missing measurement as a
FAIL, not as a pass by omission.**

**R5. W6 is roughly twice the size of any other package.**
19 owned files, 1,114 lines of research alone, 113 `neutral-*` hits, 26 hexes, four form
components and three compliance pages. The brief fixes six packages and six builders, so
this plan ships six. **Resolution, for the manager only: if a seventh builder is affordable,
split W6 at the obvious seam — W6 keeps `/contact`, the three funnel pages, the three legal
pages and the four form components; a new W6R takes `/research` plus the three index pages,
the embed page and the two chart components. The two clusters share no file.** They are
written as one package here so the launch message can go out as six without an edit.

**R6. `#fafaf9` / `#fafaf7` are arbitrary-value grounds and a grounds scan cannot see them.**
The homepage runs five `bg-[#fafaf9]` bands and the service/sector templates run
`bg-[#fafaf7]`. A `--grounds` capture keyed to named Tailwind scales reports zero and a
builder reads "no rhythm to preserve" — crypto lost a whole section rhythm to exactly this.
**Resolution:** W5's and W3's briefs state the bands explicitly by line number and **forbid
"normalising" them into a named scale**, which would be a visible colour change nobody
asked for. Scan with `grep -o 'bg-\[#[0-9a-fA-F]\{3,8\}\]'` alongside the named-scale scan
and say which you ran.

**R7. A kit adoption can author a sentence through a default.**
`LeadCTAPanel.eyebrow`, `WhatToExpectCard.items`, `TestimonialsSection.showRating` and
`ServiceTiers.featuredBadge` all publish copy or a claim the page does not have, by
default, if the caller says nothing. T13: removing a prop does not remove its default.
**Resolution:** locked rules 16, 17 and 18, plus a blocking line in every brief: **"read
every default in a kit component's signature BEFORE adopting it. If adopting it would
render one sentence, one figure or one star the page does not have today, either feed it
the page's own copy or decline it and write which sentence."**

**R8. The wave adds live analytics segmentation that did not exist.**
The site has **2** authored `data-cta` attributes today (`thank-you:107-108`) plus the
kit header triple on all 59 routes. Every `data-cta` a package adds is a new series in
`vw_cta_performance`. **Resolution:** T22 — the `(id, placement, goal, href)` triples are
diffed at wave close against `cta_baseline.json`, and **the diff is expected to GROW, never
to CHANGE.** The one pre-existing authored id (`thankyou-return-article`) must be
byte-identical. Every new id is named in its package's receipt. **An id-only diff passes
the placement/goal flip straight through; diff all four fields.**

**R9. Ambiguity I am NOT resolving, because it is an owner gate.**
The "partner network" sentence on `/thank-you` (A12). The estate rule already answers it,
so the technically correct action is to rewrite it, but it is prose and prose is frozen.
**Recommendation: bundle it to the owner as ONE plain-English question after the wave, not
as a package.** Blast radius: one sentence on one `noindex` branch. Revert path: a one-line
git revert. Sweep by RULE before quoting a count.

---

## F. THE VERIFICATION EXECUTOR'S LIST (V1)

**One agent. Sonnet.** It runs commands and records decisive output lines; it exercises no
judgement and fixes nothing. It runs against the ONE `next start` build, after the
preflight in section D. **Every row needs a decisive output line in the receipt, not a
verdict.** Ten of these rows exist because a reviewer on a previous port caught something
that rows 1-10 could not see.

| # | pkg | command | expected decisive line |
|---|---|---|---|
| V1 | all | `cd hospitality/web && npx tsc --noEmit` | no output, exit 0 (baseline: clean) |
| V2 | all | `cd hospitality/web && npm test` | all pass, report N/N verbatim (baseline: 6 test files, `vitest run`) |
| V3 | all | `python scripts/check_dependency_closure.py` | `OK` across all sites (T24) |
| V4 | all | `node docs/_engines/instruments/sweep.mjs --site=hospitality --base=http://localhost:3202 --article-depth=3 --out=<scratch>/sweep_after.json` compared to `sweep_baseline.json` | **0 link-floor breaches, 0 dead internal links, 0 dash regressions, 0 data-cta regressions.** Report the per-route link DELTA, which should be positive nearly everywhere. Rerun **without** `--save-baseline` to get the `--out` detail file (the Windows-path interaction `P0D` documents). |
| V5 | all | `node docs/_engines/instruments/browser_check.mjs --site=hospitality --base=http://localhost:3202 --shots=<scratch>/shots --grounds --out=<scratch>/browser_after.json` compared to `browser_baseline.json` | overflow at 390 still **0**; `anchorGaps` still **[]**; grounds breaches still **0**; contrast failures **below the 219 recorded by `P0G_RECHECK.md`** (the 235 in `P0D_BASELINE.md` is superseded, see E.1.10). **Run `grounds_fixture_test.mjs` in preflight first (T29): an instrument with no test is not a gate.** Its own self-test line must print, and its unparseable-colour count must be reported next to any zero. |
| V6 | all | per-URL `json.loads` on EVERY `ld+json` block on all 59 sitemap URLs (playbook §5 snippet) | no exception on any URL. **A tag-presence check is NOT sufficient — it passes the `[object Object]` defect.** |
| V7 | all | `node docs/_engines/instruments/cta_snapshot.mjs --site=hospitality --base=http://localhost:3202` vs `cta_baseline.json` | the pre-port triple `header_book\|header\|form` is **unchanged on all 59 routes**, and `thankyou-return-article` is byte-identical. New ids are listed and each is named in a package receipt. **Diff id AND placement AND goal AND href (T22).** The drawer CTA renders only when open, so no SSR crawl sees it: **read the shipped client bundle** for `mobile_menu`. |
| V8 | all | **PROSE FREEZE.** Script: for each of the 59 baseline routes, fetch the served HTML, parse it, extract the text content of every `<p>` and `<li>` **that is not inside a `<script>`, `<style>`, `<nav>`, `<header>` or `<footer>`**, normalise whitespace, and write one sorted line per node. Do the same against the pre-wave build. `diff` the two files. | **The ONLY permitted differences are: (a) the 14 sentences listed in the phase-0 F1 receipt and reproduced in `docs/hospitality/STATE.md`; (b) the restored F1 anchor in the `/services/tronc-scheme-setup` FAQ answer, which changes the node's MARKUP but not its TEXT and must therefore show as NO diff at all; (c) text nodes NEWLY PRESENT because a kit component now renders copy the page already held elsewhere (every FAQ answer that `alwaysRenderAnswers` moved into the HTML, and every blog-post title in the new homepage band). Every line in the diff is classified into (a), (b) or (c) by hand, with the source line that produced it. An unclassified line is a FAILED prose freeze and a blocker.** Build the pre-wave side from a worktree at the pre-wave SHA, not from memory. |
| V9 | all | the playbook §9.1 gate block, all 8 rows, **comment-stripped**, pasted verbatim into `docs/hospitality/STATE.md` | row 1 **>= 1** (baseline 0 pre-P1-B, expect >= 1); row 2 reported as distinct/call-sites next to generalist's 15/140 and startups-tech's 5/40 pre-uplift (**no floor; report the number**); row 2a reported, never graded — **a high 2a with a low 2 is the "declined nearly everything" shape the owner called plain jane**; row 2b `adopted >= 1` (`0/0` is a FAIL); row 3 non-empty; row 4 **= 1**; row 5 `Eyebrow >= section-label`, expect **8/0**; row 6 every printed line has a reason written at that line; row 7 every gradient file measured stop by stop; row 8 `walks >= 1` and `gtg = 1`. |
| V10 | all | **THE FOUR-MARKER ROW, from the RENDERED HTML of `/`.** `curl -s localhost:3202/ > /tmp/home.html`, then count `animate-ping` and `rounded-full` in that file; count `StatsCounter` and `Backdrop` from COMMENT-STRIPPED source imports in `app/page.tsx` + `components/marketing/*.tsx` (they are component names and never appear in HTML). **State which you counted where.** | baseline **0/0/0/0**. Target: `animate-ping` **>= 1**, `StatsCounter` **>= 1**, `Backdrop` **>= 1** (expect 3 mounts), `rounded-full` **>= 1**. Print it beside Property 1/2/3/4, generalist 1/2/3/4, startups-tech 1/3/3/4. |
| V11 | W2 | `curl -s localhost:3202/blog \| grep -oE 'href="/[^"]*"' \| sort -u \| wc -l` | **>= 37** |
| V12 | W2 | same per category, 8 URLs | **>= 14, 10, 10, 8, 8, 7, 7, 7** |
| V13 | W2 | same per post, all 23 URLs | at or above the per-route floor in W2's table; report the delta |
| V14 | W2 | on one post: count scroll containers in the article column; `getBoundingClientRect()` of the sticky element after scrolling 3000px at 1440x900 | **exactly ONE** clamp, and the sticky element is still in the viewport (T32: reading the classes cannot distinguish the two broken arrangements from the correct one) |
| V15 | W2 | on one post: `grep -c '<form'`; `grep -c 'BreadcrumbList'` | **2** and **1** |
| V16 | W3 | 13 URLs, unique internal hrefs | **>= 11, 11, 11, 12, 12, 13, 12, 13, 13, 13, 13, 13, 13** |
| V17 | W3 | on all 11 FAQ-bearing detail URLs: every FAQ answer string in the `FAQPage` JSON-LD is present in the served HTML, **normalised to alphanumerics with entities decoded** | **100% present.** Normalise properly: stripping `<strong>` inserts a space before a comma and produces false absences (crypto: 4 false positives). |
| V18 | W3 | `curl -s localhost:3202/services/tronc-scheme-setup \| grep -c 'href="/services/hospitality-payroll"'` and the unique-href count | the restored anchor renders as a **link**, not as escaped text (`grep -c '&lt;a href'` = **0**), and the route's unique-href count is **>= 11** |
| V19 | W4 | 4 URLs, unique internal hrefs | **>= 9, 7, 7, 7** |
| V20 | W4 | `curl -s localhost:3202/embed/food-drink-vat-rate-checker \| grep -c '<header\|<footer\|<nav'` | **0** |
| V21 | W4 | on each of 3 tool URLs: `grep -c '<form'`; `grep -o '"@type":"WebApplication"' \| wc -l`; heading-order scan | **1**, **1**, and `h1 -> h2 -> h3` with no jump (`P0B` finding 11 recorded `h1 -> h3` on all three) |
| V22 | W5 | `curl -s localhost:3202/ \| grep -oE 'href="/[^"]*"' \| sort -u \| wc -l` | **>= 21**, and expected to RISE by ~3 |
| V23 | W5 | `curl -s localhost:3202/ \| grep -c '£90,000'` and `grep -c '12.71'` | **>= 1** each — the TRUE figures are in the pre-hydration HTML (T15) |
| V24 | W5 | `perl -0pe 's{/\*.*?\*/}{}gs; s{//[^\n]*}{}g' src/app/page.tsx \| grep -o '<Eyebrow' \| wc -l` and the same for `section-label` | **>= 8 and 0.** The raw grep is wrong in both directions. |
| V25 | W5 | contrast of the `StatsCounter` band: its `text-slate-900` figures against whatever ground the band ends on, composited through a 1x1 canvas | **>= 4.5**. Do not accept an unmeasured pair. |
| V26 | W6 | 8 URLs, unique internal hrefs | **>= 6, 6, 6, 6, 9, 7, 7, 7** |
| V27 | W6 | `curl -s localhost:3202/thank-you \| grep -c '<main'` and `grep -c '<h1'` | **1 and 1** (three branches, one renders) |
| V28 | W6 | `git diff <pre-wave SHA> -- hospitality/web/src/components/forms hospitality/web/src/components/calculators/MiniCapture.tsx \| grep -E '^[-+].*(formId\|data-cta\|leadConsent\|redirectOnSuccess\|submitLabel\|name=\|enquiry_ref)'` | **empty** (T19) |
| V29 | W6 | `grep -o '"@type":"Dataset"'` on the 3 research detail URLs; `grep -c '<form'` on each of the 4 research URLs | **1** each; **1** form each, including the index which had **0** |
| V30 | all | **JS DISABLED.** Load one blog post, one `/services/*` and `/` with JavaScript off; count visible FAQ answers | **every answer visible** (K4). If any is hidden, K4 was not applied and this is a blocker on ~40 pages. |
| V31 | all | tab-walk with a **420ms settle** at 1280, on `/`, one `/services/*`, one post, `/contact` and `/thank-you`: real `keyboard.press("Tab")`, read the composited outline colour against the **PARENT's** ground through a 1x1 canvas (Tailwind v4 returns `oklab()`) | every ring **>= 3.0**, on light AND dark grounds. **Every section painted dark carries `.ground-dark` (R4).** A missing measurement is a FAIL, not a pass. |
| V32 | all | `grep -rnoE '#[0-9a-fA-F]{3,8}' hospitality/web/src/app hospitality/web/src/components --include=*.tsx` | only `HospitalityBackdrop.tsx`, `UnionJack.tsx`, `PageShell.tsx` and `api/og/route.tsx` survive, **each with a written reason at the line** (R2 GAP 6 was five survivors with no reason) |
| V33 | all | `grep -rno 'neutral-[0-9]\{2,3\}' hospitality/web/src` | **0 site-wide** |
| V34 | all | `grep -rn 'data-cta' hospitality/web/src --include=*.tsx \| grep -B2 -A2 '<div'` inspected by hand | **0 `data-cta` on a wrapper `<div>`** (R5 B2) |
| V35 | all | `git diff --stat --diff-filter=A <pre-wave SHA> HEAD -- hospitality/web/src` | **every ADDED file has a named owner in STATE.md or is assigned to M1** (crypto shipped five unowned net-new files that reached nine route families) |
| V36 | all | full-page screenshots at 390 / 768 / 1440 of `/`, `/services`, `/services/tronc-scheme-setup`, `/for/restaurants`, `/blog`, one post, `/calculators`, one tool, `/research`, one research page, `/contact`, `/about` | saved to the scratchpad and handed to both reviewers. **The owner's verdict is visual; the reviewers need to see it, not read about it.** |

---

## G. THE TWO REVIEW BRIEFS

Both run **concurrently, after V1 completes and the wave is tagged**, both **Opus**, both
against the running server and the V36 screenshots. Both get the KNOWN AND ACCEPTED list
(section H). **"Finding nothing is a failed review."** Neither may edit a file; both return
`file:line` findings ranked BLOCKER / GAP / NIT, each with the command that proves it.

### R2 — DESIGN FIDELITY REVIEW

**The question:** would the owner, walking this site next to Property and generalist, say
it is there? Not "does it pass the gates" — startups-tech passed every gate and he said
plain jane.

Mandatory checks, each needing a decisive line:

1. **The four-marker row from the rendered HTML**, and the §9.1 gate all 8 rows,
   comment-stripped, re-run independently of V9/V10. **Row 2a against row 2: a high decline
   count against a low adoption count IS the plain-jane shape.** Name every decline and say
   whether its reason is still true at `70047cb6` — **four of startups-tech's were stale and
   R5 caught them.**
2. **Rings, tab-walked with a 420ms settle**, on light and dark grounds, composited against
   the parent's ground through a 1x1 canvas. R2's BLOCKER 1 and BLOCKER 2 on startups-tech
   were both rings: form fields with `outline-none`, and related-article links with no
   indicator at all on 30 posts. **This site adds a related rail on 23 posts. Check it.**
3. **Contrast**, `browser_check.mjs` at all four widths, against the **219**-failure figure in `P0G_RECHECK.md` (not `P0D`'s 235, superseded).
   **T25: on any surface still themed through `var()`, the contrast half is unusable —
   say which surfaces those are and take those decisions from a hand-computed table
   self-tested against the TAILWIND V4 values** (`slate-500 #62748e` on white = 4.77,
   `slate-400 #90a1b9` on white = 2.63; the 4.76/2.56 pair is v3).
4. **Grounds and section rhythm:** `--grounds`, plus the arbitrary-value scan
   (`bg-\[#...\]`) that `--grounds` cannot see (R6). **Did the five `#fafaf9` bands survive?**
5. **The sticky arrangement in the blog article column** (T32): count scroll containers,
   measure `getBoundingClientRect()` after scrolling. Reading classes is not enough.
6. **Overflow at 390 on every route** (baseline 0) and `anchorGaps` (baseline 0).
7. **Motion:** does the count-up play, does the eyebrow rule draw, does `ScrollGlowGroup`
   fire, do the ticks draw? **And does each of them render CORRECTLY with
   `prefers-reduced-motion: reduce` and with JS off?** (The failure mode must always be a
   finished mark, never an empty box beside a promise.)
8. **`rounded-*` actually paints 4px, not 0px and not a pill** — `--radius: 0rem` is
   declared here, which is the fix for R5 B1, but verify the paint.
9. **Hardcoded hex survivors, each with a reason at the line** (R2 GAP 6).
10. **`ReadingProgress` vs the sticky header** (R2 NIT 7).
11. **Screenshots, section by section, at 390 and 1440**, next to generalist's equivalents.
    Say in plain words where this site still looks cheaper and why.

### R3 — CONTENT AND CLAIMS REVIEW

**The question:** did the wave publish one sentence, one figure or one claim the site did
not publish before? **Sweep by RULE, never by the list this brief hands you (T6). Every
agent that swept by rule found more than its brief contained.**

Mandatory checks:

1. **The prose freeze, independently re-derived** (do not take V8's word). Every `<p>` and
   `<li>` text node on all 59 routes, before and after. Classify every diff line.
2. **Kit-default copy that reached a page.** Grep for each of these exact strings in the
   served HTML of all 59 routes and report the route count for each:
   `"Free first call, then a fixed fee in writing"` (LeadCTAPanel default eyebrow),
   `"Book your free first call"` (its default formTitle AND ProblemStatement's button),
   `"Fixed fee quote if you decide to proceed"` (WhatToExpectCard default),
   `"Most recommended"` (ComparisonTable), `"Example figures displayed"` (the intended
   default, report where it lands), `"What landlords say"` / `"Your rent went up"` /
   `"Section 24"` (Property's own copy leaking through a kit default).
   **R3 G6 on startups-tech was the LeadCTAPanel default reaching 14 pages, and it is a fee
   claim.** Expected here: **0** for every string except `"Example figures displayed"`.
3. **Star ratings.** `grep -c 'Rated 5 out of 5'` across all routes = **0**.
   `showRating={false}` must be passed (locked rule 18).
4. **Invented identity.** No `initials` badge on any testimonial; the three quotes and the
   composite disclaimer are byte-identical to `page.tsx:216-232` and `:719-722`; there is no
   fourth quote.
5. **Figures.** Every number on every changed surface re-derived against
   `docs/hospitality/house_positions.md` and `docs/hospitality/rates_ledger.json`. **T15:
   check the PRE-HYDRATION HTML of the `StatsCounter` band, not the settled page.**
   **T6: search the ARITHMETIC and the CONCEPT, not only the string** — a corrected sentence
   above an uncorrected worked example defeats a text search.
6. **Schema vs page (T17, T8).** For every FAQ-bearing URL: every `acceptedAnswer.text` is
   present in the HTML, from ONE binding. `BlogPosting.headline` equals the visible `<h1>`
   on all 23 posts (R3 G1: it drifted on 19 of 32). `datePublished` and `author` present
   and not confused with `dateModified` (R3 G2). **Exactly one `BreadcrumbList` per URL**,
   and its current crumb is a short label, not the page's full title sentence (R3 G3).
   **No raw HTML inside `acceptedAnswer.text`** (R3 G5).
7. **Compliance copy against the code that actually runs (T18).** The cookie policy vs what
   `ConsentedScripts` loads; the retention months vs `niche.config.json`; the consent
   sentence vs `site.ts:12`. **Report drift; change nothing — the cookie-policy-vs-AdSense
   row is owner-ruled LEFT AS IS in `P0A_CLAIMS_LEDGER.md`. Do not reopen it.**
8. **Em-dashes:** 0 across all 59 routes, body text AND `metaTitle` / `metaDescription` /
   `summary` / `keyTakeaways` / every JSON-LD string (T6's corollary).
9. **"partner network"** — sweep by rule, report the count and the file:line of each. Do not
   change any of them (A12).
10. **The `data-cta` inventory**: every new id, its placement, its goal, and whether it sits
    on a control or a `<div>` (R5 B2).

---

## H. KNOWN AND ACCEPTED (hand to both reviewers)

Do not report these as new findings. Each is already decided.

1. The seven estate-wide claims rows in `P0A_CLAIMS_LEDGER.md` (composite testimonial
   standfirst, retention sentence, cookie policy vs AdSense, the 24-hour promises, the
   rubric) are **LEFT AS IS** under the 2026-09-29 owner ruling.
2. The composite-testimonial disclaimer on the homepage **stays**, owner-ruled.
3. The "partner network" sentence on `/thank-you` **stays** this wave; it is an owner
   question (A12).
4. The Aswatax post-submit intro on `/thank-you` is **deliberate and verified live
   estate-wide** (memory `aswatax_referral_pack`); never pre-submit.
5. `--calc-result-accent` is the answer to brand-on-dark text; it is already declared.
6. `error.tsx:47` and `LeadForm.tsx:322` `outline-none` are **not defects**.
7. `admin/analytics/login/page.tsx:39` is the one real ring-defeat and is **out of the
   port's lease**.
8. `niche.config.json` `brand.logo_path` points at a file that does not exist; the header
   renders a text wordmark and does not consume it. Owner question, not a defect.
9. `content_strategy.categories` (6 names) does not match the 8 live blog category slugs.
   Config drift, not consumed by routing. Logged, not fixed.
10. `/book` and `/complete` are not in `robots.txt`'s disallow list while `/thank-you` is.
    Owner question (`P0B` finding 8).
11. `priceRange: "££"` on the Organization JSON-LD (`P0B` finding 1) and
    `areaServed: {"@type":"City","name":"United Kingdom"}` (finding 9) both live in
    `src/lib/schema.ts`, which is a **manager carve-out**. Report if still live; no package
    owns them.
12. `P0D`'s 74 white-on-white "Get in touch" failures and its 145 "Do not track me" are a
    **chrome** measurement subject to T25; both are replaced in phase 1 and the baseline to
    beat is `P0G_RECHECK.md`'s **219**, not `P0D`'s 235. Re-derive before reporting.
13. The `h1 → h3` heading jump on the three calculator pages is a **pre-wave** defect filed
    by P0-E and still open at the phase-0 close. It is **W4's** to close. Do not file it as
    a wave regression.
14. The AdSense CSP `frame-src` console noise (152-164 errors per run, from
    `pagead2.googlesyndication.com`, refused by `packages/web-shared/lib/security-headers.ts`)
    is **an open OWNER decision**, estate-wide, recorded at the phase-0 close. It is not a
    wave defect and no package touches it.

---

## I. MODEL TIERING AND AGENT BUDGET

| role | count | model | why |
|---|---|---|---|
| W2 blog | 1 | **Opus** | composes markup on 32 prospect-facing routes |
| W3 templates and hubs | 1 | **Opus** | 13 prospect-facing routes and two claims-adjacent data files |
| W4 calculators | 1 | **Opus** | the highest-intent surfaces and a partner-facing embed |
| W5 homepage + about | 1 | **Opus** | the page the owner walks first, and the four-marker verdict |
| W6 flow, legal, forms, research | 1 | **Opus** | the conversion surface, the compliance pages and 1,114 lines of published data |
| V1 verification executor | 1 | **Sonnet** | mechanical: runs commands, records output, exercises no judgement |
| R2 design reviewer | 1 | **Opus** | every review on this programme found real defects |
| R3 content reviewer | 1 | **Opus** | content review is Opus by standing rule |
| M1 mop-up / gap-fix | 1 | **Opus** | cross-seam, by definition the defects nobody scoped |
| re-review | 1 | **Opus** | T7: a fix pass introduced a blocker last time |

**WAVE TOTAL: 10 agents** — 6 builders + 1 verifier + 2 reviewers + 1 gap-fix, then 1
re-review = 10, plus **up to 3 optional Sonnet gap-fixers** on disjoint, file:line-specified
fixes if M1's finding count warrants them. Worst case **13**.

**Sonnet composes no page markup a prospect sees.** There is no registry-or-config-only
package in this wave, which is why no builder row is Sonnet.

**Concurrency: 6 at launch (the playbook cap), then 1, then 2, then 1, then 1.** Every brief
says "Do NOT launch subagents", or five become twenty (T39).

**Spend to date on this port:** phase 0 used **9** (5 audit + 3 fix + 1 re-check, stated
in `PHASE0_PACKAGES.md:56`). Phase 1's agent count is **not recorded in
`PHASE1_PACKAGES.md`** and is still in flight — the manager supplies it; its package list
is 6 buildable packages (A, B, C, D, E, F), so read it as 6 unless the manager says
otherwise. This plan is one more. **Running total before the wave: about 16.** The wave
takes it to about **26**, or **29** worst case with three optional gap-fixers.
**Report the ACTUAL count to the owner at wave close, and price the wave with him before
launching it** — standard terms, section 3: a multi-agent wave is priced in the
subscription window before it runs, not after.

---

## Wave close (2026-09-29, manager)

### Builds and commits

| commit | what |
|---|---|
| `577e22e2` | phases 2 to 6 as one wave of six disjoint packages, uplift built in. Tagged `port-hospitality-phase2` through `-phase6` (all six tags on this one commit; the tags are not the end of the port). |
| `1437cb9e` | kit: eight additive props out of this wave (`SlimHero.sectionClassName`, `CoverageItem.href` + optional icon, `StatsCounter.tone/columns`, `Calculator.headingLevel`, `ReadingProgress.className`, `TableOfContents.stickyMobile`, `TestimonialsSection.headingId`, `PageShell.bypassWhen`), plus the accordion focus ring reading `--kit-focus-ring`. Kit tests 439/439. |
| `f17702ff` | kit: `BlogSidebarCta` note, `Eyebrow className`, `RelatedArticles` stretched-link focus ring (was `outline-none` with a 2.63 indicator). |
| `a045e4a3` | gap-fix after R2, R3 and V1. |
| `a6cb6630` | the help widget from the kit, owner ruling 2026-09-29. tsc clean, 135/135. |
| `0b08df0a` | kit: `CoverageCards columns` accepts 4. |
| `20f48e9d` | kit: the widget upgrades to a modal only on a deliberate open (the GF8 re-cut that closed hospitality R4 W-B1; the same fix moved the startups-tech tags). Kit tests 444/444. |
| `95ce72a4` | gap-fix after R4: widget hidden on the research embed route, sixteen opener lines cut to one sentence each with a test enforcing it, a hairline seam between the closing panel and the footer, four research stat captions from white/80 to white. tsc clean, 138/138. |
| `ac897ad1` | the research stat cards lose the `bg-white/10` tint so those four 14px captions actually clear 4.5 (4.25 to 5.09). **Tagged `port-hospitality-complete` and `port-hospitality-uplift`.** |

One `next build` per checkpoint, served on `next start -p 3202`, identity asserted before
every measurement (`<title>Specialist Hospitality Accountants UK</title>`). Port 3203 belonged
to the ecommerce uplift and was never touched from this wave.

### Verdicts

| pass | verdict | headline |
|---|---|---|
| **V1** wave verification | 28 PASS, 2 FAIL, 3 NOTE, 2 not fully verified | FAILs were both literal-grep artefacts: unaccounted hex outside the four permitted files, and 2 `neutral-*` hits in manager-owned files. tsc clean, 61/61 tests, sweep 59/59 with 0 dead links and 978 links against a 667 baseline, 202 JSON-LD blocks parsing, gate 9.1 all graded rows clear, contrast 26 against the 219 carried out of phase 0. |
| **R2** design review | PASS-WITH-GAPS | 1 blocker, 9 gaps, 4 nits. Four-marker row recorded 2/1/5/22. The blocker (nested scroll containers on 23 posts) was **rejected**. |
| **R3** content review | FAIL | 1 blocker, 5 gaps, 3 nits. 290 of 290 FAQ questions and answers visible outside the script, no body link lost. The blocker was **rejected**. |
| **R4** re-review | WAVE PASS-WITH-GAPS; **WIDGET FAIL** | All eleven expected closures verified closed, all four manager rulings verified true. Two new wave findings (the dark panel meeting the dark footer on 17 routes, six sub-floor text pairs the instrument cannot see). Two widget blockers: the auto-opened panel captured forward Tab so the launcher was unreachable in 420 presses, and the widget rendered inside the chrome-free partner embed. |
| **R4b** final check | WAVE PASS-WITH-GAPS; **WIDGET PASS** | Both widget blockers closed on first measurement (launcher at Tab press 83 on `/` and 43 on a calculator, `aria-modal` never `"true"` during the pass-through, deliberate opens still trap, Escape returns focus). One item left open: four stat captions at 4.25, not the 5.09 the fix commit's own comment claimed. Closed by `ac897ad1`. |

### Rejected, with the reason

1. **R3 blocker 1, "a published FAQ answer was rewritten".** R3 took
   `port-hospitality-phase0` as the BEFORE. `port-hospitality-phase0^:hospitality/web/src/data/hospitality-services.ts:77`
   is byte-identical to HEAD; phase 0 is what stripped the anchor, and the wave restored the
   original. Direction inverted, not a defect.
2. **R2 blocker 1, "nested scroll containers on 23 blog posts".** The two scroll containers are
   on two different mounts. The clamped `<ul>` belongs to the mobile mount, whose ancestor is
   `display:none` at 1440, the width the reviewer measured at. Exactly one scroll container in
   the visible branch.
3. **R2 G1 and G3, `SlimHero` and `CoverageCards` "declined on a stale reason".** Re-derived
   against the kit at `f17702ff` and found **true**: `SlimHero` has a required `eyebrow` and no
   breadcrumb slot while all 11 brand heroes carry a breadcrumb above the H1; `CoverageCards`
   has a required `body` while the six homepage cells publish a label and an href only. The
   declines stand; only their written reasons were refreshed.
4. **R5-style "instrument says 0, therefore the site clears 4.5".** Rejected as a claim.
   `browser_check.mjs` holds anything at or above 15px to a 3:1 floor and computes from the
   uncomposited colour, so text alpha is invisible to it. Six real sub-floor pairs were found
   by canvas compositing behind an instrument reading of 0.

### Residuals at close

- **Owner calls, recorded not fixed:** the hero standfirst at white/80 on brand (3.87) on 13
  routes; the stock orange accents on the homepage; the dark closing panel meeting the dark
  footer (a hairline is in, at 1.23 to 1 it is a hint rather than a rule, and the shape is
  estate-wide); the widget on the 404 page (a kit limitation, an additive fix is proposed in a
  comment at the mount); the AdSense `frame-src` host missing from the kit CSP
  (`packages/web-shared/lib/security-headers.ts`, 164 console errors per load, estate-wide,
  the session classifier refused the edit as a security weakening).
- **Dead but harmless:** `text-slate-300` survives in the rendered class string on five
  `Eyebrow onDark` call sites, overridden by the appended `className`. The outcome is right;
  the class is dead. A kit-side change is proposed in a comment at the call site.
- **Not exercised:** the used-calculator opener ladder did not fire from synthetic input
  events in R4b. Not a defect found, just not proved.
- **Pre-existing and out of scope:** the h1-to-h3 heading jump on the three calculator pages
  (filed by P0-E, answered estate-wide by the kit `Calculator headingLevel` prop, which is
  still to be swept across 15 templates).

### Tags and agents

`port-hospitality-phase0` `36d2b4fe` / `-phase1` `56c3f468` / `-phase2` to `-phase6`
`577e22e2` / **`-complete` = `-uplift` = `ac897ad1`**.

Agents: about 40 on this site (9 in phase 0, then phase 1, the six wave packages, one
verification executor, R1, R2, R3, R4, R4b, three gap-fix rounds and the widget work). Nothing
pushed, nothing deployed, no CI run, no monitor or alert created.
