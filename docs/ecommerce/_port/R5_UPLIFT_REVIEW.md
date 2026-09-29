# ecommerce DESIGN UPLIFT: R5 independent adversarial review

Reviewer: independent, did not build. Date 2026-09-29. Read-only: no edit, no
commit, no tag, no build, no server started or stopped, no subagent. Port 3202
was never touched.

Under review: `a5fff093` (U4) + `2f1a6168` (U1/U2/U3) against
`docs/ecommerce/_port/UPLIFT_PACKAGES.md`, `docs/_engines/DESIGN_PORT_PLAYBOOK.md`
§9.1, and manager decisions D1-D4.

Identity asserted before anything else:

```
curl -s http://localhost:3203/ | grep -o '<title>[^<]*</title>'
<title>Ecommerce and marketplace seller accountants UK</title>
```

Evidence base: all 51 sitemap routes fetched as served HTML; `browser_check.mjs
--grounds` at 390/768/1024/1440; `sweep.mjs --article-depth=3`;
`cta_snapshot.mjs`; a real keyboard Tab walk at 1280; a real 390 emulation
(`page.emulate`, `isMobile: true`) with full-page screenshots; the built CSS
served at `/_next/static/css/15b359714dd20a48.css`.

---

## A) VERDICT: **PASS-WITH-GAPS**

4 blockers, 12 gaps, 4 nits.

The content freeze holds cleanly and the foundations work (U4) is the best part
of the wave: the no-JS motion gate is measured rather than assumed, `--radius`
was left alone, the wrapper-`data-cta` guard held at zero, and no kit default
string leaked anywhere. What did not land is the half the owner actually asked
for. **D2 ("buttons we can measure") is delivered on the detail templates and
not on the hubs**: `/blog`, the six blog category hubs, `/calculators`, the four
calculator pages, `/services`, `/for` and `/vat` — 15 money routes — still emit
exactly one `data-cta`, `header_book`, the same state the plan called "the
biggest single finding". And one keyboard defect ships: the related-article
cards on all 14 posts have no visible focus indicator at all, against a comment
in `globals.css` that says that indicator is "the load-bearing one".

### The designer's verdict, two sentences

At 1280 the homepage now reads as the generalist/Property family: the navy hero
with the backdrop, the live-dot pill, the 4/5/7/4 stats strip, the comparison
table and a real three-post blog band are the right rhythm, and the closing
panel lands where it should. Where it still looks cheaper is density and motion:
the audiences band dropped from a four-up row to two fat half-width cards with
three words in each, the `/services`, `/for` and `/vat` hub grids now put three
cards in a row and orphan the fourth on a line of its own, nothing on the page
glows, draws or ticks because the motion sheet was ruled at option C, and on
every hub route the navy closing panel runs straight into the navy footer as one
undifferentiated slab.

---

## B) GAPS, most severe first

### BLOCKERS

**B1. `ecommerce/web/src/app/globals.css:226-234` — related-card focus indicator
does not paint. 14 post routes.**
Spec: the comment at `:224-225` says "The `:focus-within` half is the
load-bearing one: without it a keyboard user tabbing into a card gets no
indication of which card."
Renders: measured with a real `.focus()` on the card's anchor —
`a` computes `outline-style: none`; the card computes
`box-shadow: oklab(0 0 0 / 0) 0px 0px 0px 0px, oklab(0 0 0 / 0) 0px 0px 0px 0px`
before AND after focus. Both halves are absent. A Tab walk of
`/blog/business-structure-and-tax/online-seller-formation-trends` lands on
"How Long Do Online Retail Busine..." with no visible indicator.
Cause: the two rules sit inside `@layer components`, so a Tailwind utility on the
card wins the cascade — the same defect startups-tech fixed at `266be560`
("related-card rules unlayered so the focus indicator paints") and the Medical
trap ("an unlayered CSS rule beats every Tailwind v4 utility").
Severity: **blocker** (keyboard accessibility, and a comment asserting the
opposite).
Minimal fix: move `.related-card` and `.related-card:hover, .related-card:focus-within`
out of `@layer components` in `globals.css`, exactly as startups-tech did.

**B2. F5 link floors fail on 50 of 51 routes.**
Spec: `UPLIFT_PACKAGES.md` F5, "every route `>=` its `sweep_final.json` count".
Renders: `sweep.mjs` totalLinks **1196** against the baseline's **1244**. Every
route except `/` is short by exactly one unique internal href
(`/services` 19 vs 20, `/for` 23 vs 24, `/blog` 39 vs 40, `/about` 19 vs 20, and
so on for 50 routes).
Cause is NOT this wave: commit `09acd2af` (09-28 recheck) changed the footer's
"Book a consultation" from `href="/book"` to `href="/contact#form"`, which
collapses into `/contact`, already linked from the header. `deadLinks` is `[]`
and `dashes` is 0 everywhere.
Severity: **blocker on process, not on design** — the wave closed, was
committed, and handed to review with F5 failing on 98% of routes and nobody
reporting it. No post-uplift instrument artefact was committed at all (the
newest `sweep_*.json` / `cta_*.json` / `browser_*.json` in `_port/` are the
port's, not this wave's), so F1-F18 cannot be shown to have been run.
Minimal fix: state the cause in the wave record and re-baseline
`sweep_final.json` deliberately, or restore a second distinct footer
destination. Do not silently accept a floor breach.

**B3. D2 undelivered on 15 money routes.**
Spec: plan A.5 + U2 item 3 + U3 item 3 name `calc_index_help`, `calc_hero_help`,
`home_calculators_all`, `blog_index_book`, `blog_index_articles`, and
`services_hero_book` / `for_hero_book` / `vat_hero_book` on the hubs.
Renders (`cta_snapshot`, 51 routes): `/blog`, `/blog/<category>` x6,
`/calculators`, `/calculators/*` x4, `/services`, `/for`, `/vat` each emit
**exactly one** `data-cta`, `header_book`. None of the five named ids exists in
source or in the DOM. `services_hero_book` / `for_hero_book` / `vat_hero_book`
landed on the **detail** templates only (4/4/5 mounts), never on the hub the id
is named after.
Severity: **blocker** — this is the half of the owner's sentence the plan called
"the highest-value work in the wave, ahead of any visual change", and the routes
that now carry a brand-new enquiry panel (D3) are precisely the ones that still
cannot report a click.
Minimal fix: add the five named ids to the controls that already exist on those
routes.

**B4. `ecommerce/web/src/app/page.tsx:775` — one id for three different tools.**
Spec: U1 band 12, "per-tool ids matching generalist's naming".
Renders: `home_calculator|tools_band|null` appears 3 times on `/`, on
`/calculators/seller-take-home-calculator`, `/calculators/vat-threshold-tracker`
and `/calculators/sole-trader-vs-ltd-sellers`. `vw_cta_performance` cannot tell
the three apart.
Severity: **blocker** on the same ground as B3 — an id that cannot attribute is
not instrumentation.
Minimal fix: suffix the id with the tool slug.

Also unresolved and explicitly gated by the plan (E9, "resolve before any CTA
work; it is trap 22 territory"): `PageShell.tsx:83-85` leaves `ctaIds` at the kit
defaults, so `header_book_mobile` and `header_contact` should render, and the
post-wave snapshot still shows only `header_book` on all 51 routes. No answer is
recorded anywhere in the wave.

### GAPS

**G1. Navy closing panel runs into the navy footer on 32 routes, 11 of them new
this wave.** `browser_check --grounds` prints
`dark band touches dark footer: last=rgb(15, 23, 43) footer=rgb(15, 23, 43)` 123
times across 32 routes. Newly acquired this wave: `/blog`, the six
`/blog/<category>`, `/calculators`, `/research`, `/research/online-seller-index`,
`/research/online-seller-survival-index`. The kit's own prop docstring
(`LeadCTAPanel.tsx`, `contained`) describes this exact case: "Use it where a navy
panel would run into the navy footer... two dark fields with no light between
them read as one undifferentiated slab." It is visible in the 1280 `/services`
screenshot. Fix: pass `contained` (or a light band) on the routes where the panel
is the last section.

**G2. Two grey ramps still live on all 48 form-bearing routes** (known
spill-over, restated with the measurement). Source is clean except
`LeadForm.tsx` — every other `neutral-*` hit in `ecommerce/web/src` is inside a
comment. Rendered across the 51 fetched routes: `text-neutral-900` x248,
`border-neutral-300` x124, `text-neutral-100` x124, `text-neutral-300` x124,
`text-neutral-400` x124, `text-neutral-500` x124. Contrast is fine
(`neutral-100` #f5f5f5 on slate-900 = 16.35; `neutral-900` #171717 on slate-50 =
17.13) — the defect is hue, not legibility: warm #d4d4d4 input borders (relative
luminance 0.658) inside cards whose own borders are slate-200 #e2e8f0 (0.802),
on every enquiry panel on the site.

**G3. CoverageCards dropped homepage density and orphaned a card on three hubs.**
`page.tsx:563-570` passes `columns={2}`; pre-uplift
(`a5fff093^:page.tsx:497`) the audiences grid was
`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` with `next/link`. Measured
`grid-template-columns` at 1280 on `/` is `532px 532px`. On `/services`, `/for`
and `/vat` the kit grid renders `341px 341px 341px` for four items, so the fourth
sits alone on its own row (visible in the 1280 `/services` screenshot) — the
"grids follow their item count" rule the estate fixed elsewhere at `21bff5e8`.
Judgement asked for in the brief: **yes, this reads worse than before.** Fix:
keep the hand-rolled four-up grid on the homepage, or add `columns: 4` to
`CoverageCards` as an additive kit prop like the other eight that landed this
week.

**G4. Motion option C leaves every grid flat against generalist.** Built CSS
declares `@keyframes num-glow` and `@keyframes ping` and nothing else; no
`card-glow`, `eyebrow-rule`, `tick-draw` or `marquee-y` resolves; `16 185 129`
(Property's emerald fallback) count is 0. So the Eyebrow rules do not draw, the
service and audience cards do not glow on scroll, and `ScrollGlowGroup` is
correctly declined at `page.tsx:319-324`. The decision is written down properly
and the process was right. Stating it plainly as the brief asks: **this is the
single biggest remaining visual difference from generalist**, and it is a
deliberate, reversible owner call, not a builder miss.

**G5. Six comments assert what the code does not do.**
- `about/page.tsx:81-82` lists `LeadCTAPanel` among "ADOPTION DECLINED on this
  page" while `:5` imports it and `:107` mounts it.
- `layout-utils.ts:99` "Three sit on `bg-neutral-900`" and `:129` "neutral-800
  stats band" — no `bg-neutral-800` or `bg-neutral-900` exists in live code
  after the ramp sweep (`bg-slate-800` x3, `bg-slate-900` x5).
- `EcommerceBackdrop.tsx:41-43,60` measures against "neutral-800 #262626" and
  "neutral-900 #171717" grounds that no longer exist.
- `LeadForm.tsx:17-21` "renders it straight onto a `.ground-dark bg-neutral-900`
  section... On #171717: neutral-100 16.44" — the ground is now slate-900
  #0f172b.
- `for/[slug]/page.tsx:68`, `services/[slug]/page.tsx:66`, `vat/[slug]/page.tsx:71`
  each say the hero Breadcrumb "emits the route's ONLY BreadcrumbList JSON-LD";
  two identical `BreadcrumbList` nodes render on all 13 of those routes (see G6).
- `about/page.tsx:75-76` and `calculators/[slug]/page.tsx:171-172` still decline
  `TestimonialsSection` because it "hardcodes Property's quotes". The `items`
  prop landed at `4a267372`; only the second half of the reason ("this site has
  no authored social proof") survives. E8 of the plan asked for this to be
  rewritten, not appended to.

**G6. Duplicate identical `BreadcrumbList` on 24 routes.** `/for/*`,
`/services/*`, `/vat/*` each emit the node twice, byte-identical — once from
`buildSegmentPageSchema` and once from the kit `Breadcrumb`. **Pre-existing**
(both emitters are present at `a5fff093^`), so not this wave's defect; the
false comment about it (G5) is.

**G7. Blog post sidebar is now a nested scroll container.**
`blog/[category]/[slug]/page.tsx:183`: the `<aside>` is
`lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto`, and U3
added `BlogSidebarCta` inside it under the `TableOfContents`. On a long
article the new capture surface sits below the fold of an inner scroll box —
the nested-scroll class from the startups-tech review. Fix: move the sidebar CTA
outside the scrolled region, or drop the `max-h`/`overflow-y-auto` pair.

**G8. `/contact` was left on the wrapper hack.** `contact/page.tsx:21,52` still
declares `crumbOnBrand` and `:54` still passes the legacy `onDark` boolean. 12 of
the plan's 13 files were swept to `tone="onBrand"`; this one was not, and the
commit message says "twelve" without saying which one was skipped.

**G9. Eight of seventeen `data-cta` triples are incomplete.** `hero_secondary`,
`home_calculator`, `home_research`, `research_hub_seller_index`,
`research_hub_survival_index`, `research_seller_index_csv`,
`research_seller_index_tool`, `research_survival_index_csv` all render with
`data-cta-goal` unset. `research_survival_index_book` was never written, so the
survival index has one id where the seller index has three.

**G10. F14 not met: `page.tsx` still carries two arbitrary hexes.**
Comment-stripped, `#243550` and `#0f1c30` remain at `:407`
(`via-[#243550]/80 to-[#0f1c30]`). Down from 8; the acceptance test said 0.

**G11. Two off-whites on one site.** U4 declared `--ground-subtle: #fafaf9`
(`globals.css:191`) and the homepage now uses it, while `for/[slug]:204`,
`services/[slug]:199`, `vat/[slug]:156` and `calculators/[slug]:130` keep
`bg-[#fafaf7]`. Two near-identical warm off-whites that never line up across
routes — the same failure mode as the two grey ramps, one step up.

**G12. No wave-close instrument artefacts committed.** `_port/` holds
`sweep_uplift.json`, `cta_uplift.json`, `browser_uplift.json` — all from the
port, all identical to `browser_final.json`. There is no captured evidence that
F1-F18 was run on this build.

### NITS

**N1.** The footer "Built by Double Wired Creative" link renders a **3px solid
`rgba(0, 0, 0, 0)`** focus ring on every one of the 51 routes (kit
`SiteFooter.tsx:224`, `text-transparent` + the kit `focusRing`). Pre-existing,
estate-wide, not this wave's — worth one line to the owner because it is the
only genuinely invisible ring on the site outside B1.

**N2.** The footer is a `bg-slate-900` ground with no `.ground-dark`, so
`--focus-ring` never rebinds and two of its stops per route take the light
ring: #8a5e1a on #0f172b = **3.14**, which clears the 3:1 graphic floor by 0.14.
It passes. It passes by luck.

**N3.** 12 tab stops on `/` use the browser's default outline (`rgb(16, 16, 16)`)
rather than `var(--focus-ring)`. Visually fine (18.2 on #fafaf9), but gate row
6's claim that one grep finds every ring on this site is not strictly true.

**N4.** `browser_check` hit a 60s navigation timeout on 12 of the 15 blog posts
(39 of 51 routes captured, 156 of 204 entries). Production server, `next start`.
Worth knowing before anyone quotes a full-coverage instrument run.

---

## C) CLEARED

| # | check | command | decisive line |
|---|---|---|---|
| 1 | four-marker row | playbook block, comment-stripped, `P=ecommerce/web/src/app/page.tsx` | `ping=1 stats=2 backdrop=3 rounded-full=4` — the Property/generalist row, held |
| 1 | gate §9.1, all 8 rows AS WRITTEN | playbook `:813-833`, `DIR=ecommerce` | `1 layout-utils:6 / 2 kit adopted: 8 distinct / 56 call sites / 2a declined:152 / 2b adopted=4 declined=17 / 3 geist/font/sans / 4 backdrop:1 / 5 Eyebrow=7 section-label=0 / 6 (empty) / 7 page.tsx + EcommerceBackdrop.tsx / 8 walks=1 guards-the-guard=1` — **all 8 pass**; row 2a down 159→152; row 2 short of the plan's own F3 target of `>=10 / >=80` |
| 2 | contrast, overflow, anchor gaps, 4 widths | `browser_check.mjs --grounds` | `Counter({'grounds:bands': 617, 'grounds:adjacentSame': 16})`, contrast 0, overflow 0, anchorGaps 0. The 16 `adjacentSame` are white-on-white section joins on `/research/online-seller-index`, not new |
| 2 | focus ring per real Tab stop | 220 `keyboard.press("Tab")` on `/`, `/for/amazon-sellers`, one post | 84 / 69 / 94 stops; **one** ring-less stop per route (the DWC credit, N1) plus the related-card anchor (B1). Every other ring measured: white on #9e6615 = 4.81, #8a5e1a on white = 5.68, on #fafaf9 = 5.44, on #fafaf7 = 5.43, on slate-50 = 5.43, slate-200 on slate-900 = 5.46, white on #1a3a5c = 11.64 |
| 2 | composite gradient stops | `page.tsx:407` `from-[var(--ink-navy)] via-[#243550]/80 to-[#0f1c30]`, ring + CTA measured at each | `--ink-navy: #1a2942` white label 14.59; via stop composites to #22334d; darkest stop #0f1c30. Hero CTAs use `btnPrimary` (white on #9e6615 = 4.81) and `btnOnDark` (white ring on the navy) — no stop below the floor |
| 2 | `.ground-dark` census | `grep -o ground-dark html/*.html` | 4-10 per content route, 0 on the three legal routes (no dark band there, correct). No white form card inside a `.ground-dark` wrapper: the kit panel's form card is a light island by design and its labels measure 17.13 |
| 3 | grey ramps, rendered | `grep -o 'neutral-[0-9]\{2,3\}' html/*.html` | identical set on every route: `neutral-100 neutral-300 neutral-400 neutral-500 neutral-900`, all from `LeadForm.tsx` — see G2. Every other source hit is a comment |
| 4 | kit adoption vs plan | `grep -rhoE 'from "[^"]*web-shared/design/(marketing\|primitives)/[A-Za-z-]+"'` | `LeadCTAPanel 16, page-blocks 15, Breadcrumb 14, CoverageCards 4, SlimHero 3, NoticeCard 2, StatsCounter 1, NumberedReasons 1` + `design/blog/*` (ReadingProgress, TableOfContents, RelatedArticles, BlogSidebarCta). Declines checked against the kit at `1437cb9e`: `SlimHero.sectionClassName` decline **current and measured** (breadcrumb slot + required eyebrow, neither addressed by the prop); `FaqSection` decline **correctly rewritten** to name `alwaysRenderAnswers` as stale and hold on D1; `ScrollGlowGroup` decline **current** (option C, `.card-glow` resolves to nothing); `CoverageItem.href` decline **retired, adopted**; `StatsCounter.tone/columns/href` and `ProcessTimeline` declines stand on content grounds. Stale: `TestimonialsSection` (G5) |
| 5 | `--radius` | built CSS | `--radius:.75rem` present and unchanged; `--radius-sm/md/lg/xl` in the built sheet are Tailwind v4's own derivations, not siblings added to `globals.css` (source declares `--radius` and `--btn-radius` only). **R5 B1 was not "helpfully fixed"** |
| 5 | motion under option C | built CSS | `@keyframes num-glow`, `@keyframes ping`, nothing else; `16 185 129` count 0; `scripting:enabled` present, so U4's no-JS release shipped. See G4 |
| 6 | `data-cta` placement | `cta_snapshot.mjs` + `grep -rnoE '<(div\|section\|aside\|li\|figure\|ul\|ol\|form\|p\|span)[^>]*data-cta='` | `non_interactive_ctas: []`, zero wrapper hits in source. **R5 B2 guard held.** `header_book\|header\|contact` unchanged on all 51 routes. totalCtas 51 → 105, distinct triples 1 → 17. Shortfalls in B3/B4/G9 |
| 7 | one form per money page | `grep -c '<form'` over 51 fetched routes | 1 on every money route; 3 on each post (sidebar CTA, mid-article mini, end form) — the documented three surfaces; 0 on the three legal routes. `leadConsentText` renders on the post surfaces; on the panel routes the consent paragraph is behind step 2 of `LeadForm` (pre-existing, `LeadForm.tsx:464-468`, held whole in U4) |
| 8 | Breadcrumb tone | `grep -rln 'tone="onBrand"'` | 12 files. Hero ground measured: `#8a5e1a` (`vat/[slug]:57` and the 1280 `/services` screenshot). One file missed — G8 |
| 9 | CONTENT FREEZE | `git diff a5fff093^..2f1a6168 -- ecommerce/web/src ecommerce/niche.config.json`, comment-stripped string-literal and JSX-text multiset per changed file | **REMOVED 0. CHANGED 0. ADDED 6 sentence instances of 2 distinct strings**, both already published by 6 sibling routes before the wave: "Speak to an ecommerce tax specialist." (6 files → 9) and "Tell us about your situation and we will reply within 24 hours." — reproduced on `/calculators`, `/research` and `/research/online-seller-index`, which is what D3 authorises. Plus the 4 D4 hub labels, verified byte-identical against `a5fff093^` (`services:103` "What we do", `for:87` "Who we help", `vat:81` "VAT guides", `research:110` "Reports"). The 09-28 parity and 09-29 recheck commits were separated out by diffing from `a5fff093^` rather than from the tag |
| 10 | kit default strings | grep over all 51 served routes | "Free first call, then a fixed fee in writing" 0, "Book your free first call" 0, "We will be in touch." 0, Property landlord copy 0. `/blog` and `/blog/<category>` pass `eyebrow=""` and `formTitle=""` explicitly and feed `niche.blog.cta_*`. **Clean** |
| 11 | links | `sweep.mjs` vs `sweep_final.json` | `deadLinks: []`, `href="#"` count 0, blog band posts resolve. Floors — see B2 |
| 12 | schema vs page | ld+json parse over 51 routes | every block parses, 0 unparseable; `priceRange` 0; `Organization` once per route on the page's own node; `FAQPage` answer count matches the rendered `<summary>` count on every `<details>` route (native `<details>` keeps answers in the server HTML on all 21 FAQ surfaces, so D1 is safe); research FAQs render as visible prose. `BreadcrumbList` — see G6 |
| 13 | mobile at a real 390 | `page.emulate({isMobile:true})`, `deviceScaleFactor` 2-3 | `documentElement.scrollWidth == innerWidth == 390` on every route sampled; 0 horizontal page scroll; the wide research/comparison tables are inside `overflow-x-auto` wrappers; hero pill wraps to 2 lines at 351px wide and does not clip; CoverageCards stack to one column (`358px`); the kit drawer opens from a 48x48 toggle and 14 consecutive Tabs stay inside it (`outside: 0`) — the `6799f9289` focus trap holds. Small tap targets found are inline text links inside prose, not controls |
| 14 | comments as claims | five builder comments read against the DOM | `page.tsx` FAQ + ScrollGlowGroup + blog-band comments **true**; `services/[slug]` and `blog/[category]/[slug]` FaqSection declines **true and correctly updated**. Six others false — G5 |
| 15 | artefacts | grep over all 51 served routes | em-dash 0 (`sweep.totalDashes` 0 too), `[object Object]` 0, `undefined` as text 0, `NaN` 0, `{{` 0, `TODO` 0. **Clean** |

---

## D) OPEN QUESTIONS FOR THE OWNER

1. **The enquiry panel now sits directly on the dark footer on 32 pages.** The
   house component has a setting that puts it on a light band instead, made for
   exactly this. Do you want it switched on, or do you like the solid dark block
   at the bottom of those pages?

2. **The four "who we help" boxes on the home page went from a row of four to a
   stack of two wide ones**, because the house component only offers two or
   three across. Do you want the old row of four back, or is the bigger card
   fine?

3. **Nothing on this site moves.** The house animation sheet (cards lighting up
   as you scroll, the little rule under each section label drawing itself) was
   deliberately left out because turning it on risked dragging another site's
   colours across. Turning it on is a contained job now. Do you want it, given
   it is the clearest remaining difference from Holloway Davies?

4. **The footer's "Book a consultation" link was pointed at the contact form
   back on 28 September**, which quietly removed one link from every page on the
   site. That is why the link count is one short everywhere. Was that the
   intention, or should the booking page get its own link back?

5. **You have not been asked D1-D4 yet in this file's terms**, but the builders
   proceeded on the manager's reading of them. D3 (enquiry forms on the pages
   that had none) shipped; D2 (tagging the buttons) shipped on about half the
   site and needs a second short pass.

---

Scratch deleted.
