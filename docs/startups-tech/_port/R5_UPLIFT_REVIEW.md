# R5: independent adversarial review of the startups-tech DESIGN UPLIFT

Read-only. No source edited, no commit, no tag, no build, no server started or
stopped, no subagent launched. Measured against the running production server at
`http://localhost:3201` (`next start` from HEAD `86997252`), asserted first:

```
$ curl -s localhost:3201 | grep -o '<title>[^<]*'
<title>Founder Tax Partners | Accountants for Funded and Scaling UK Startups
$ git rev-parse HEAD
869972526e48c95ad50337043faf3aed1ba59e26
```

Reviewer did not build this wave. Instruments, screenshots and raw JSON are in the
session scratchpad under `r5/`; the scratch scripts were deleted at close.

---

## A. VERDICT

**PASS-WITH-GAPS.** Two blockers, seven gaps, four nits. Neither blocker is a
copy, claims or contrast defect; both are mechanical and each has a one-line fix.

### The verdict question, in plain English

**No, he would not call this plain jane any more.** The homepage now opens on a
real designed hero: the stepped-ladder backdrop is visible across the full band, a
live pill with a pulsing dot sits above a 72px headline, and two proper buttons sit
on it instead of the old hand-rolled pair. Below it the four gov.uk figures count
up in a monospace face on a clean white strip, the service cards light up in
sequence as they come into view, the eyebrow marks draw themselves in, and the FAQ
is a real accordion. Those are the five things that separated Holloway Davies from
crypto-before-uplift, and they are all here and all working.

**The single biggest remaining difference is length.** The Holloway Davies homepage
is nine bands; this one is fourteen, and it renders 10,336px tall at 1280 and
14,796px tall at 390. The middle of the page is a long run of dense text bands plus
a full-width comparison table, where Holloway Davies keeps short punchy blocks and
gets to the close quickly. A non-technical eye reads that as "a lot of reading",
not as "cheap", so it is a different complaint from the one the owner made. It is
also a copy problem, not a design problem, and copy is frozen. (Generalist's
rendered height was NOT measured: no generalist server was reachable on 3000, 3100,
3200-3500, 3001 or 3002, so the comparison is against
`generalist/web/src/app/page.tsx` structure, 474 lines and 9 bands against this
site's 940 lines and 14 bands.)

Second difference, smaller: the proof band. Holloway Davies omits testimonials
entirely; this site publishes three real anonymised quotes but renders them as
plain text in a bare white band with no card, no rule and no visual treatment, so
the strongest content on the page is the weakest-looking thing on it. U1 declined
the kit `TestimonialsSection` on the five-star row; `4a267372` has since made the
rating opt-in. **OPEN, for the owner.**

---

## B. GAPS, most severe first

### B1. BLOCKER: `--radius` is never declared, so every `rounded-*` utility on the site paints 0px

`startups-tech/web/src/app/globals.css:30` | expected: the kit's radius scale
resolves, as it does on generalist | measured: every `--radius-*` custom property
resolves to the empty string and 31 of 31 homepage elements that ask for a radius
render `border-radius: 0px` | **BLOCKER** | fix: one line.

U4 added `@import "@accounting-network/web-shared/design/globals-standard.css"`.
That sheet defines the scale **relative to a base the site must declare**:

```
packages/web-shared/design/globals-standard.css:38-42
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --btn-radius: var(--radius-xl);
```

`startups-tech/web/src/app/globals.css` declares no `--radius` anywhere
(`grep -n radius` on that file returns nothing). Generalist declares it, at
`generalist/web/src/app/globals.css:71`, `--radius: 0rem`, with the comment at
`:114-116` stating that this is what makes `--radius-xl` = 4px, "THE house radius".

With `--radius` undeclared, `calc(var(--radius) + 4px)` is invalid, the whole scale
is empty, and Tailwind's `rounded-xl` / `rounded-lg` / `rounded-md` compile to
`border-radius: var(--radius-xl)` with nothing behind it. Measured in the browser:

```
--radius "" --radius-sm "" --radius-md "" --radius-lg "" --radius-xl "" --btn-radius ""
elements asking for a radius (rounded-full excluded): 31   of those square: 31
```

and the served stylesheet confirms the definitions are the broken calc form:

```
$ curl -s localhost:3201/_next/static/css/66ed324712a294eb.css | grep -o -- '--radius[a-z-]*:[^;]*'
--radius-lg:var(--radius)
--radius-md:calc(var(--radius) - 2px)
--radius-sm:calc(var(--radius) - 4px)
--radius-xl:calc(var(--radius) + 4px)
```

This is a **regression this wave introduced**. Before U4 the sheet was not imported,
so `rounded-xl` fell through to Tailwind v4's stock `0.75rem` and the buttons were
12px. Today both hero CTAs, every header button, every service card, every FAQ row
and the four StatsCounter source links (`rounded-md`) are hard-cornered. The FAQ
screenshot is the clearest read: eight square slate-50 bars with no radius and no
border. `rounded-full` is unaffected because it compiles to a literal, which is why
the hero pill still looks right and why the four-marker row still reports
`rounded-full=3`.

Two things this is NOT, so nobody chases the wrong thing: it is not the Medical
"unlayered CSS rule beats a utility" trap (there is no competing rule; the utility
resolves to nothing), and it is not a large visual delta against the standard on
its own (generalist sits at 4px, so the visible gap is 4px on buttons and cards).
The reason it is a blocker is that a declared design token resolves to nothing
site-wide, silently, and every future `rounded-*` on this site is dead until it is
fixed.

**Minimal fix:** add `--radius: 0rem;` to the `:root` block in
`startups-tech/web/src/app/globals.css`, alongside the existing `--brand-glow*`
declarations, with the same one-line reason generalist carries.

### B2. BLOCKER: two of the four new A.7 capture ids sit on a `<div>`, not on a control

`startups-tech/web/src/app/blog/page.tsx` and
`startups-tech/web/src/app/blog/[category]/page.tsx` | expected: `data-cta` on the
submit button, as every other id on this site is | measured: `blog_index_book` and
`blog_index_articles` are on a non-interactive `<div>` wrapping the panel, on 6
routes | **BLOCKER (analytics)** | fix: move the attribute to the `LeadForm` submit
button.

`cta_snapshot.mjs` raised it itself, and the warning is the fix:

```
6 data-cta on a NON-INTERACTIVE element, 2 distinct: div blog_index_book, div blog_index_articles
  autoCapture resolves every click through closest("[data-cta]"), so a wrapper around a form
  claims the click of every field inside it and SUBSTITUTES the events of any link inside it.
  /blog: <div> blog_index_book | panel | form
  /blog/share-schemes-and-emi, /blog/research-and-development, /blog/seis-and-eis,
  /blog/saas-and-tech-finance, /blog/startup-compliance: <div> blog_index_articles | panel | form
```

The consequence is not cosmetic: every field focus and every link click inside the
new blog panels will report as a `blog_index_book` / `blog_index_articles` CTA
event, so the two new surfaces the owner is being asked to judge will report
inflated conversion and will swallow the events of anything else in the panel.

### B3. GAP: with JavaScript off, every FAQ answer is hidden, on 14 pages

`packages/web-shared/design/primitives/accordion.tsx:58-63` (kit, this wave) and
`startups-tech/web/src/app/layout.tsx:110-113` | expected per the wave's own
`<noscript>` release: answers visible | measured: `display: none`, height 0, on all
eight homepage answers | **GAP, medium** | fix: two lines in the existing
`<noscript>` style block.

The `alwaysRenderAnswers` prop does what its comment claims — `forceMount` puts every
answer in the server HTML, so JSON-LD parity holds (check 8 below is clean). But the
same commit adds `data-[state=closed]:hidden`, and with JS off Radix never opens an
item, so the panel is mounted and invisible:

```
noJsFaqAnswers (JS disabled, /):
 DIV radix-_R_27qltqlb_ h=0 display:none "A generalist firm can file accounts and a Corporat..."
 DIV radix-_R_2bqltqlb_ h=0 display:none "Generalist firms and filing services cover annual ..."
 ... 8 of 8
```

The `<noscript>` block that U4 added at `layout.tsx:110-113` releases `.eyebrow-rule`
and `.tick-draw` only. A no-JS reader (and any renderer that does not execute
scripts) sees eight questions and zero answers on `/`, the six service slugs, the
five audience slugs, the four calculator slugs and two research pages.

**Minimal fix:** add to the existing `<noscript>` style
`[data-state="closed"].overflow-hidden { display: block !important; }` scoped to the
accordion content, or drop the `data-[state=closed]:hidden` half of the kit change
and let the kit's own `hidden` attribute be the no-JS state.

### B4. GAP: blog posts still hand-roll a `<details>` FAQ, on the stale belief that the kit prop had not landed

`startups-tech/web/src/app/blog/[category]/[slug]/page.tsx` (FAQ block) | expected:
`FaqSection ... alwaysRenderAnswers`, the same adoption U3 made everywhere else |
measured: hand-rolled `<summary class="... px-4 py-4 font-semibold text-slate-900">`
rows, 30 posts | **GAP, medium** | fix: swap for `<FaqSection html alwaysRenderAnswers>`.

This is the item the builders flagged. The prop DID land (`FaqSection.tsx:33-35`,
`accordion.tsx:52-63`, both in this wave's kit commits), and eleven other call sites
across `/services/[slug]`, `/for/[slug]`, `/calculators/[slug]`, `/` and two research
pages adopt it. The 30 posts are the largest single block of pages on the site and
they render a visibly different FAQ from every other page. Counts are otherwise
correct (post FAQ item counts match their FAQPage schema exactly, see C8), so this
is a consistency and kit-adoption gap, not a correctness one.

### B5. GAP: the "GAP 4" comment in `globals.css` is now false in both of its claims

`startups-tech/web/src/app/globals.css:299-309` | expected: a decline comment that
matches the file | measured: both premises reversed by U4, in the same file and its
sibling | **GAP, low** | fix: delete the block.

It reads `.eyebrow-rule` "is DELIBERATELY NOT DEFINED HERE ... that class lives only
in packages/web-shared/design/globals-standard.css, which this site does not import"
and "the kit's collapsed `scaleX(0)` start state is only released by a `<noscript>`
override this site's root layout does not carry". U4 added the import at the top of
the same file, and added the `<noscript>` override at `layout.tsx:110-113`. The
playbook's row 2a counts comments naming a kit path, and this site reports 123 of
them against 56 adoptions, so a decline comment that contradicts the file it sits in
is exactly the trap the corrected §9.1 block was written to catch.

### B6. GAP: two research pages render a flat FAQ while three siblings render the kit accordion

`startups-tech/web/src/app/research/tech-startup-survival-index/page.tsx:435-449`
and `.../uk-tech-formations-index/page.tsx:474-488` | expected: one FAQ treatment
across the research set | measured: 2 flat h3/p lists, 3 kit accordions | **GAP,
low** | fix: none until the kit `FaqEntry.answer` can carry a React node.

The decline is measured and the reason is written: the last entry on each page
renders an internal `<Link>` inside its answer, `FaqEntry.answer` is a string, and
adopting the kit would delete that link and take the route below its link floor.
Correct call, and the schema is honest (see C8). Recorded because it is a visible
inconsistency inside one section of the site, and because the fix is a kit change
someone will eventually want: a `ReactNode` answer, or an `answers` slot.

### B7. GAP: `TestimonialsSection` is still declined after the kit change that removed the reason

`startups-tech/web/src/app/page.tsx:41-51` (the decline) and
`packages/web-shared/design/marketing/TestimonialsSection.tsx` (`4a267372`) |
expected per the plan's A.1/13: the kit band | measured: hand-rolled `<figure>`
grid, 0 kit imports of `TestimonialsSection` site-wide | **OPEN, owner** | fix:
owner call, not a builder call.

U1's written reason was the kit's hardcoded five-star row on a site that publishes
no rating. `4a267372` made `showRating` opt-in and added `items`, `footnote` and
optional item fields, which removes that objection entirely. The decline comment in
`page.tsx` still names the old reason. Reported as OPEN, as instructed, not as a
defect: the owner may prefer the current plain treatment.

---

## C. CLEARED

**C1. The verdict question, screenshots and section-by-section.** Full-page shots at
1280x2400 and 390 taken with Edge via puppeteer-core after a full scroll and settle
(`r5/home_desktop.png`, `r5/home_mobile.png`, `r5/home_nojs.png`, plus `r5/hero.png`
and `r5/testimonials.png` at deviceScaleFactor 2). No generalist server answered on
3000 / 3100 / 3200-3500 / 3001 / 3002, so the generalist shots were skipped and the
comparison is structural, against `generalist/web/src/app/page.tsx`. Band by band:
hero backdrop **visible** (`StartupsBackdrop` mounted at `page.tsx:528`, the stepped
motif reads across the full band in `r5/hero.png`); live pill **present**
(`animate-ping` at `page.tsx:537`); type scale **matched**, h1 measures
`fontSize 72px` at 1440 against generalist's `lg:text-7xl`; stats strip **counts up**
(frames below), figures in **GeistMono**, all four **linked** to gov.uk through the
new `href` slot; service cards **glow**, scroll-triggered not hover (see D1); FAQ is
the **kit accordion** with answers in the server HTML; blog band carries **3 real
posts**; closing panel carries the **backdrop** (`patternId="startups-round-ladder-cta"`,
`page.tsx:911`). Testimonials band = B7.

**C2. Four-marker row and the §9.1 gate.** Run from the monorepo root with
`DIR=startups-tech`, comment-stripped, corrected block:

```
1  layout-utils  : 6                              PASS (>=1)
2  kit adopted   : 8 distinct / 56 call sites     PASS (generalist 15/140; pre-uplift 5/40)
2a kit declined  : 123 comment refs               report only
2b homepage mktg : adopted=3 declined=5           PASS
3  webfont       : geist/font/mono geist/font/sans  PASS
4  backdrop      : 1                              PASS
5  eyebrow ratio : Eyebrow=8 section-label=0      PASS
6  rings not token: (none)                        PASS
7  gradients     : app/page.tsx, components/layout/StartupsBackdrop.tsx
8  ring guard    : walks=1 guards-the-guard=1     PASS
MARKERS ping=1 stats=3 backdrop=3 rounded-full=3
```

All eight rows pass. Distinct adoptions: Breadcrumb 17, page-blocks 10, LeadCTAPanel 8,
ScrollGlowGroup 7, FaqSection 6, NoticeCard 4, SlimHero 3, StatsCounter 1. The
four-marker row moves 0/0/0/0 -> **1/3/3/3**, ahead of every post-uplift site in the
playbook (crypto 0/0/3/1, construction-cis 0/0/4/0). Row 2a at 123 against 56 is
still the highest decline count in the programme and is the one number to watch.

**C3. Motion.** Count-up plays: loaded at 1280x500 so the strip starts below the
fold, then scrolled into view and sampled every 90ms:

```
pre-scroll  20% £250k £250k 18%      (true values in the raw HTML, as the kit intends)
f1          14% £172k £172k 12%      (start frame, 60% of target)
f4          18% £222k £222k 16%
f10         20% £250k £250k 18%      (settled)
```

`.eyebrow-rule` draws: `data-draw` flips `off` -> `on` for **9 of 9** marks after a
full scroll. `[data-glow]` fires: the one homepage group flips to `on` and its
children carry `animation-name: card-glow` with a staggered
`rgba(79, 70, 229, ...)` shadow, which is this site's `--brand-glow-deep` (indigo
primary-600), so no Property emerald leaks through the imported sheet. `hero-reveal`
is present and settled at opacity 1. With JS disabled every eyebrow mark is visible
(`data-draw="off"`, opacity 1, width 24px, transform none, released by the
`<noscript>` rule at `layout.tsx:110-113`). FAQ answers with JS off = **B3**.

**C4. Contrast.** `node docs/_engines/instruments/browser_check.mjs
--site=startups-tech --base=http://localhost:3201 --grounds` run in the foreground,
152 page-loads at 390/768/1024/1440:

```
self-test OK (slate-500/white 4.76, slate-400/white 2.56)
grounds self-test OK: rgb(15,23,42) lum=0.0088 dark; oklch(0.208 0.042 265.755) lum=0.0089 dark
TOTAL problems now 0    baseline 245
```

Zero text nodes under 4.5, zero graphics under 3, zero overflow, zero anchor gaps,
composited, against 245 in `browser_baseline.json`. The backdrop grounds are clean at
each of the three tones: homepage bands read
`rgb(30,27,75)` (primary-950) then white/slate-50 alternating then `rgb(15,23,43)`,
and the written worst-stop composites in the source
(primary-950 -> `#28265c` white 13.80, primary-700 -> `#4940cf` white 7.20,
primary-600 -> `#544de7` white 5.85) all clear both floors. One caveat carried
forward: 95 subtrees were unrendered at every width and so unchecked, and they are
the collapsed accordion answers (`div.overflow-hidden.text-sm...`) — the same
elements as B3. `/for` timed out once during the sweep; re-run on its own it returns
200 at 390 and 304 at 768/1024/1440 with `scrollWidth == innerWidth` at all four, so
that was transient.

**C5. Rings, tab-walked with a 420ms settle.** Real `keyboard.press("Tab")`, outline
colour composited against the nearest opaque ancestor ground. Hero CTAs both
`rgb(255,255,255)` on `rgb(30,27,75)` = **15.99**. The four StatsCounter source
links, the new `href` wrap using the kit `focusRing`, `rgb(79,70,229)` on white =
**6.29**. The research `btnOnDark` CTAs on their brand ground: white on
`rgb(30,27,75)` = **15.99** (U4's wrap worked; the kit literal `outline-primary-400`
measured 2.11 to 2.65 on those grounds before). FaqSection triggers, all eight,
`rgb(79,70,229)` on the slate-50 item = **~6.0**. Blog index panel fields (select,
textarea) and the "Continue" button, indigo on white = **6.29**. Three footer links,
white on slate-900 = **~16**. `BlogSidebarCta` and the `blog_skip_to_form` anchor
were not reached inside the tab budget; both resolve to the same token in the served
markup (`focus-visible:outline-[var(--focus-ring)]` and
`var(--kit-focus-ring,var(--color-primary-600))`), which is the value measured at
6.29 everywhere else. Row 6 of the gate prints nothing, so no ring bypasses the token.

**C6. Overflow, link floor, dead links, dashes.** `node
docs/_engines/instruments/sweep.mjs --site=startups-tech
--base=http://localhost:3201 --article-depth=3` in the foreground:

```
66/66 URLs clean, 0/6 internal links dead, 0 LINK-FLOOR breaches (1806 links total),
0 data-cta regressions (149 total), 0 dash regressions (0 total)
```

`scrollWidth == viewport` at 390 and 1280 on every route, confirmed independently by
browser_check's own overflow array being empty at all four widths. Note the route
count: the sitemap carries 68 URLs and the sweep covers 66 (36 core + 30 of 32
sampled articles), not the 69 the brief assumed (D3). One em-dash exists anywhere
under `startups-tech/web/src`, in a code comment at
`app/admin/analytics/page.tsx:2`, which is exempt and pre-existing. Every hex added
by the wave sits inside a written contrast reason or a `--brand-glow*` declaration
with the step named; none is loose in markup. `--color-primary-600: #4f46e5` is
unchanged at `globals.css:72`.

**C7. Prose freeze.** Two independent passes. First, rendered: every text node of 25
characters or more on all 68 sitemap routes plus `/thank-you`, `/book`, `/complete`
and the two embeds, checked against a 3.6MB corpus of every string in
`git show 266be560:` for `startups-tech/web/src`, `startups-tech/web/content`,
`niche.config.json` and `packages/web-shared`. Second, and decisive, the diff itself:
every quoted literal and JSX text run of 20 characters or more on a `+` or `-` line,
comments excluded, differenced as multisets. **Result: not one user-facing sentence,
figure, FAQ or label is only-before or only-after.** The 52 residual entries are all
either comment continuation lines or Tailwind class strings carrying the
`neutral-*` -> `slate-*` ramp swap (`text-neutral-600` -> `text-slate-600` and so on).
`"Common questions"` moved from an `<h2>` to `FaqSection title=` on
`services/[slug]` and still serves, twice, on `/services/rd-tax-claims`.

Labels the builders used, and the source of each: `niche.blog.cta_heading`,
`niche.blog.cta_body` and `niche.blog.cta_button` from
`startups-tech/niche.config.json` (`"Need specialist startup tax advice?"`,
`"Speak to an accountant who works with funded and scaling UK startups..."`,
`"Get in touch"`) feeding the `/blog` panel, the `/blog/[category]` panel, the
`BlogSidebarCta` and the `blog_skip_to_form` anchor text; `eyebrow=""` on
`services/[slug]` and `research/uk-tech-funding-reliefs-index` (an empty string, so
no label at all, taking `FaqSection`'s own null branch); `title="Common questions"`,
pre-existing. **No new label was authored.**

**C8. JSON-LD on every sitemap URL.** All 68 parse, zero parse failures, one
`BreadcrumbList` per page, `Article` present on every post. FAQPage item count equals
rendered FAQ item count on every page carrying both: 5 of 5 on `/for/funded-startups`,
8 of 8 on `/` and the kit accordions, and every post matches exactly (for example
`founder-salary-vs-dividends-2026-27` 5 and 5,
`emi-qualifying-company-rules` 8 and 8). Every `acceptedAnswer.text` was found in the
server HTML with JS off, including on the two research pages that render a flat FAQ
(B6), where the answers sit in prose rather than an accordion:
`/research/tech-startup-survival-index` 6 schema entries and 9 rendered `h3`s,
`/research/uk-tech-formations-index` 5 and 5. `PROBLEMS 0` once the detector was
corrected to count kit accordion items and FAQ `<summary>` rows rather than every
`<summary>` on the page (D2).

**C9. Capture surfaces per route against `266be560`.** Source-level, since the
baseline artefact is empty (D4). Added: `<LeadCTAPanel>` 6 -> 8 and `<LeadForm>`
12 -> 14, both increments on `blog/page.tsx` and `blog/[category]/page.tsx`, plus one
`<BlogSidebarCta>` on the post template. Removed: nothing.
`<MiniCapture>` 3, `<InlineMiniLeadForm>` 1, `<DetailsForm>` 1, `<BookingPicker>` 2,
`<StickyCTA>` 0 all unchanged. That is **exactly the four A.7 additions and nothing
else**. `cta_snapshot.mjs` reports 149 tags over 66 routes in 12 distinct triples,
with `header_book|header|form` on all 66 and the four new ids where they belong
(`blog_index_book` 1, `blog_index_articles` 5, `blog_sidebar_book` 30,
`blog_skip_to_form` 30). Placement of two of them = B2.

**C10a. The `<details>` belief.** Confirmed and reported as B4.

**C10b. Routes with ZERO capture form today.** Counted on the rendered HTML
(`grep -o '<form' | wc -l`):

| route | forms today | what generalist does on the equivalent route |
|---|---|---|
| `/calculators` | **0** | `LeadCTAPanel` + `LeadForm` + `data-cta="calc_index_help"` |
| `/research` | **0** | `LeadForm` + `LeadCTAPanel` + 12 per-asset `data-cta` |
| `/research/startup-formation-survival-index` | **0** | (research detail) `FaqSection` + `LeadCTAPanel` + 3 `data-cta` each |
| `/research/rd-tax-relief-index` | 1 | as above |
| `/research/tech-startup-survival-index` | 1 | as above |
| `/research/uk-tech-formations-index` | 1 | as above |
| `/research/uk-tech-funding-reliefs-index` | 1 | as above |

Three routes have no way to enquire other than the header button. Four of the five
research details do have a `LeadForm`; the flagship survival index does not. This is
an **owner question**, not a gap: U2 declined `LeadCTAPanel` on these under the
frozen-surface rule, and adopting it would mean the owner accepting a new capture
surface on three routes (see E2).

---

## D. FALSE PREMISES IN THE BRIEF

**D1. "`[data-glow]` cards glow on hover."** They do not, and should not. The kit
component is `ScrollGlowGroup`
(`packages/web-shared/design/marketing/ScrollGlowGroup.tsx`): it fires **once**, on
first full sight, via an `IntersectionObserver` that then disconnects, and it carries
a written reason ("a punctuation mark on first sight, not an effect that should
re-trigger"). Measured hover on a card changes nothing (`boxShadow` none -> none).
The correct check is the scroll one, and it passes: `data-glow` flips to `on` and the
children animate `card-glow` staggered by `:nth-child`.

**D2. "FAQPage count = rendered FAQ item count" is not directly countable from the
markup.** The kit accordion emits no `data-slot="accordion-trigger"` and no stable
per-item marker in the server HTML; the only reliable per-item token is the
`animate-accordion-up` class on `AccordionContent`. A naive `<summary>` count is
wrong in the other direction on posts, where the template adds three non-FAQ
`<details>` (table of contents and two form disclosures). The first run of the
detector produced 41 false FAQPage mismatches for this reason. Anyone re-running
check 8 should count `accordion-up` for kit pages and
`<summary class="... px-4 py-4 font-semibold ...">` for the hand-rolled ones.

**D3. "69 routes."** The sitemap carries 68 URLs. `sweep.mjs` covers 66 (36 core plus
30 of 32 sampled articles at `--article-depth=3`), `browser_check.mjs` covers 38
routes at 4 widths for 152 page-loads, and `cta_snapshot.mjs` covers 66. The prose
freeze covered 73 (68 sitemap plus `/thank-you`, `/book`, `/complete` and the two
embeds). No check ran against 69.

**D4. `docs/startups-tech/_port/cta_baseline.json` is empty and cannot be diffed
against.** It records `routes: 66`, `served_title` correct, `ts 2026-09-28T23:03:25Z`
— and `distinct_triples: {}`, `non_interactive_ctas: []`, and `count: 0` with
`ctas: []` on all 66 routes, for a total of zero tags. It therefore asserts that
`header_book` was absent before the uplift, which contradicts A.7's own finding that
the header CTAs were already at parity. Check 9 was done against
`git show 266be560:` source instead. The baseline artefact should be regenerated or
deleted before anyone trusts it.

**D5. "`data-cta` tuples of phase 1 and the wave intact."** There were none to keep
intact inside `startups-tech/web/src/app`. At `266be560` only two files carried a
`data-cta` at all (`app/thank-you/page.tsx` and `components/layout/PageShell.tsx`);
every other id on the site today, `services_hero_book` on 11 routes, `hero_primary`,
`hero_secondary`, the four `research_*_csv` and `contact_pricing_link`, was added by
this wave. All of them are instrumentation on links that already existed, which the
plan classed "mechanical / instrumentation only", so none is an added capture
surface. Stated because the brief's wording implies a pre-existing set that does not
exist.

**D6. The kit `StatsCounter` count-up is invisible when the strip is above the fold.**
Its observer uses `threshold: 0.99`, so on a tall viewport the strip is already fully
visible at first paint and the animation completes inside the first frames. A check
that loads at 1280x900 and samples after 300ms will report "no count-up" and be
wrong. Load at a height that puts the strip below the fold.

---

## E. OWNER QUESTIONS

**E1. The proof band.** The site publishes three real anonymised founder quotes,
which Holloway Davies does not have at all, and today they are rendered as plain
paragraphs in a bare white band. The kit's proper testimonials band was turned down
during the build because it forced a five-star rating the site does not publish; that
restriction has since been removed, so the band can now be used without inventing a
rating. Do you want the three quotes moved into the designed band, or do you prefer
them plain?

**E2. Three pages have no enquiry form at all.** The calculators index, the research
hub, and the Startup Formation and Survival Index all offer no way to get in touch
except the button in the header. Holloway Davies puts a short form and a closing
panel on the equivalent pages. The builders left them alone because adding a form is
adding a new place to ask for a lead, and you had ruled that those are yours to
approve. Do you want the standard closing panel and short form added on those three,
using wording that already exists elsewhere on the site?

**E3. Page length.** This homepage is roughly half again as long as Holloway Davies's
and reads as a lot of material before a visitor reaches the enquiry panel. Nothing
can be cut without changing published copy, which is frozen. Do you want a pass that
proposes what to shorten or move to a second page, for your sign-off, or leave it?

---

*R5, 2026-09-29. Read-only adversarial review. Nothing in this repository was
changed by this pass except the creation of this file.*
