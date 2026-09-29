# R2 — independent adversarial design fidelity review, hospitality phases 2 to 6

Wave commit `577e22e2` on `port-hospitality-phase1`. Reviewed 2026-09-29 against the
running production build on `http://localhost:3202` (`<title>` = "Specialist Hospitality
Accountants UK", identity asserted), the shipped CSS in
`hospitality/web/.next/static/css/77d45538004d5d96.css`, the rendered DOM, and full-page
screenshots at 1280 and 390 (real `page.emulate` with `isMobile: true`). Kit read at
`1437cb9e`, which `git merge-base --is-ancestor 1437cb9e 577e22e2` confirms is an
ancestor of the wave commit.

Reviewer edited nothing. All measurement scripts ran from a scratch directory, now deleted.

---

## A) VERDICT: **PASS-WITH-GAPS**

1 blocker, 9 gaps, 4 nits.

The wave is not plain jane. The four-marker row moved 0/0/0/0 to **2/1/5/22**, every gate
9.1 row passes, the kit is genuinely adopted (10 distinct primitives/marketing components
across 63 call sites, plus 5 `design/blog/*` components the gate's regex does not count),
motion fires, the backdrop is mounted on 11 route families, and no dark ground carries an
unmeasured control. What holds it back from a clean pass is a single real layout defect on
23 blog posts, and a set of declines that were correct when they were written and are false
against the tree the wave actually shipped on.

---

## B) GAPS, most severe first

### BLOCKER

**B1. `src/app/blog/[category]/[slug]/page.tsx:300-308` — two scroll containers in the
article column, and the comment at the call site claims the opposite.**

- **Spec:** T32, W2's brief: "ONE clamp, on the element that is a direct child of the tall
  column. The `<aside>` carries `lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)]
  lg:overflow-y-auto` and `TableOfContents` carries NONE of its own. Two clamps gives a
  scroll box inside a shorter scroll box." V14 is a blocking acceptance row.
- **Comment as shipped (`:300-307`):** *"T32, ONE clamp, and it is HERE ...
  `packages/web-shared/design/blog/TableOfContents.tsx:80-82` says so in its own docstring:
  this family expects the HOST to own `sticky` plus the viewport clamp, and it carries
  neither itself. ... Arrangement built: HOST-CLAMPED."*
- **What actually renders:** two nested scroll containers, measured at 1440x900:

  ```
  ASIDE  hidden lg:order-2 lg:block lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto
         overflow-y=auto  max-height=772px  position=sticky  top=96px
  UL     mt-3 space-y-1 max-h-[60vh] overflow-y-auto
         overflow-y=auto  max-height=540px
  ```

  `TableOfContents.tsx:74` is `<ul className="mt-3 space-y-1 max-h-[60vh] overflow-y-auto">`.
  The component does carry its own clamp and its own scroll container. `TableOfContents.tsx:80-82`
  is the `<a>` markup inside that `<ul>`, not a docstring, and says nothing of the kind.
  This is the exact broken arrangement T32 names, on all 23 post routes, under a comment
  asserting it was avoided.
- **Severity:** blocker. Both halves qualify on their own: the defect V14 exists to catch,
  and "a comment that claims what the code does not do".
- **Minimal fix:** drop the outer clamp OR the inner one, not both. Cheapest and inside the
  site's lease: keep the kit `<ul>`'s `max-h-[60vh] overflow-y-auto` as the single scroll
  container and remove `lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto` from the `<aside>`
  at `:308`, leaving `hidden lg:order-2 lg:block lg:sticky lg:top-24`. Then rewrite the
  comment to say which of the three arrangements was built and cite `TableOfContents.tsx:74`.
- **Command:**
  `getComputedStyle` walk over `aside, aside *` on `/blog/hospitality-vat/vat-on-takeaway-food`
  at 1440x900; decisive line: `containers: [{ASIDE overflow-y=auto max-height=772px}, {UL overflow-y=auto max-height=540px}]`.

### GAPS

**G1. Eleven brand-ground routes decline `SlimHero` on a reason that is false in this
commit's own tree.** `src/app/services/page.tsx:33-35`, `services/[slug]/page.tsx:94-96`,
`for/page.tsx:24-25`, `for/[slug]/page.tsx:88`, `research/page.tsx:60-61`,
`research/uk-hospitality-insolvency-index/page.tsx:178-179`,
`research/uk-hospitality-food-hygiene-map/page.tsx:166-167`,
`research/hospitality-openings-closures-index/page.tsx:100-101`.

- **Spec:** locked rule 3 — "A stale reason (one the kit has since fixed) is worse than no
  reason". K1 is listed as the single highest-value gap if the owner ever wants it.
- **Shipped reason:** "hardcoded `bg-slate-900` at `SlimHero.tsx:36` **with no prop to
  change it**, so adopting it would repaint [the hero] navy".
- **What is true at `1437cb9e`:** `SlimHero.tsx:27` `sectionClassName = "bg-slate-900"`,
  declared optional at `:47`, spliced into the section class at `:50`. Its own docstring at
  `:44` reads *"A brand 600 step usually does"* — it was written for exactly this case, in
  the commit titled `feat(web-shared): eight additive props from the hospitality wave`.
- **Severity:** gap. Nothing renders wrong; the kit-adoption ledger is wrong, and 11 heroes
  stay hand-rolled when the prop that unblocks them shipped with this wave.
- **Fix:** adopt `<SlimHero sectionClassName="bg-primary-600" ...>` on the 8 brand heroes
  that are a plain hero, or, if the manager prefers to hold the shape, replace every one of
  the eight decline comments with the re-derived reason measured against `:27/:47`. Do not
  leave the false one.
- **Command:** `grep -n 'sectionClassName' packages/web-shared/design/primitives/SlimHero.tsx`
  = `27,47,50`; `git log --oneline -1 -S sectionClassName -- .../SlimHero.tsx` = `1437cb9ea`.

**G2. `src/app/services/[slug]/page.tsx:157-175` and `src/app/for/[slug]/page.tsx:89` —
`StatsCounter` declined on two reasons, both false in this tree, in a comment that says it
was "measured on the working tree 2026-09-29".**

- **Shipped reason (verbatim):** *"the figure is `text-slate-900` and the label
  `text-slate-500`, hardcoded at `StatsCounter.tsx:119` and `:133` ... **with no tone prop
  and no className**"* and *"the layout is a fixed `grid-cols-2 md:grid-cols-4`
  (`StatsCounter.tsx:116`) and every record here publishes THREE stats, which leaves a hole
  in row one."*
- **What is true at `1437cb9e`:** `StatsCounter.tsx:106` `tone?: "light" | "dark"`, default
  `"light"` at `:91`; `:138-139` `figureTone = tone === "dark" ? "text-white" : "text-slate-900"`
  and `labelTone = tone === "dark" ? "text-slate-300" : "text-slate-500"`. `:138`
  `const mdCols = columns === 2 ? "md:grid-cols-2" : columns === 3 ? "md:grid-cols-3" : "md:grid-cols-4"`.
  Both stated reasons are answered by props that exist.
- **Severity:** gap. 11 routes keep a hand-rolled `bg-slate-800` stats band. The prompt
  authorises filing this now that `tone` exists.
- **Fix:** `<StatsCounter stats={...} tone="dark" columns={3} />` inside the existing
  `.ground-dark` band, and delete the two dead reasons.
- **Command:** `grep -n 'tone\|mdCols' packages/web-shared/design/marketing/StatsCounter.tsx`
  = `91,106,138,139`.

**G3. `CoverageCards` declined on "`CoverageItem` has no `href`" at four call sites; `href`
exists.** `src/app/page.tsx:73` and `:523`, `src/app/services/page.tsx:106-109`,
`src/app/for/page.tsx:54-56`.

- **Shipped reason:** *"`CoverageItem` (`CoverageCards.tsx:5-15`) has `title`, `body`,
  `outcome?`, `icon` and no `href` ... these six cards ARE this route's link floor."*
- **What is true at `1437cb9e`:** `CoverageCards.tsx:31` `href?: string`; `:103`
  `const Card: React.ElementType = item.href ? "a" : "div"`; `:108` `href={item.href}`;
  `:110` adds `focusRing` when it is set. The link-floor objection no longer holds.
- **Severity:** gap.
- **Fix:** adopt on the homepage 6-cell grid and the `/services` / `/for` card grids with
  `href` set per item, or re-derive the decline. `/services/[slug]:210-212` declines on a
  second reason (no record publishes an icon) which is NOT stale; leave that one.
- **Command:** `grep -n 'href' packages/web-shared/design/marketing/CoverageCards.tsx` =
  `31,103,108,110`.

**G4. `Eyebrow onDark` measures 3.43 on the brand ground, below the 4.5 text floor, on 7
routes.** `src/app/research/page.tsx:74`, `research/uk-hospitality-insolvency-index:190`,
`research/uk-hospitality-food-hygiene-map:178`,
`research/hospitality-openings-closures-index:112`, `calculators/[slug]/page.tsx:92` (3 tool
routes).

- **Spec:** every text colour on every brand ground measured and at or above its floor.
- **Measured, rendered, `/research` hero:** `P(12px)` colour `oklch(0.869 0.022 252.894)`
  (slate-300) on `rgb(176,83,47)` = **3.43**. 12px is not large text, so the floor is 4.5.
  `Eyebrow` hardcodes `onDark ? "text-slate-300"` at `page-blocks.tsx:45`, and the kit's own
  comment there says the `onDark` branch is tuned for navy and was deliberately left alone.
  On `#b0532f` it does not clear.
- **Severity:** gap. It is small uppercase label text, legible but under the floor, and it
  is the one colour on these heroes that is neither white nor measured in a comment.
- **Fix:** no kit prop exists. Either report it to the manager as a kit gap
  (`Eyebrow className?` or an `onBrand` branch), or stop passing `onDark` on `#b0532f` and
  wrap the label in the site's own white/90 recipe. Do not ship it unrecorded: every other
  colour on these heroes has a written ratio and this one does not.
- **Command:** 1x1-canvas composite of the hero eyebrow against `__ground()`, `/research`;
  decisive line: `P(12px) R=3.43 "Research" col=rgb(202,213,226) on rgb(176,83,47)`.

**G5. `src/app/page.tsx:472`, `:780`, `:805` — three of the four new homepage `data-cta`
ids ship a split triple.**

- **Spec:** locked item 14 and R8/T22 — diff id AND placement AND goal; the site convention
  in `cta_baseline.json` is `header_book|header|form`, id|placement|goal.
- **Measured:** `grep -rno` over `src`: `data-cta=` 10, `data-cta-placement` 10,
  `data-cta-goal` **6**. Per element: `hero_primary` (`:463-465`) carries all three;
  `hero_secondary` (`:472-473`), `home_calculator` (`:780-781`) and `home_research`
  (`:805-806`) carry id + placement and **no goal**. `thankyou-return-article` also has no
  goal and is correctly frozen (pre-existing, must stay byte-identical).
- **Severity:** gap. Three new live series land in `vw_cta_performance` with a null goal
  next to a sibling on the same band that has one.
- **Fix:** add `data-cta-goal="form"` to `:472`, and `data-cta-goal="tool"` /
  `"research"` (or whatever the manager sets) to `:780` and `:805`.
- **Command:** `for a in data-cta= data-cta-placement data-cta-goal; do grep -rno "$a" src --include=*.tsx | wc -l; done` = `10 / 10 / 6`.
- **Cleared alongside it:** zero `data-cta` on a wrapper `<div>` anywhere
  (`grep -rn 'data-cta' src --include=*.tsx | grep -v '<a\|<button\|<Link'` returns only
  comments), and the header triple is unchanged at `header_book|header|form` on every route.

**G6. The related-article rail's focus indicator measures 2.63 against a 3.0 non-text
floor, on 23 post routes.** `packages/web-shared/design/blog/RelatedArticles.tsx:106`,
mounted at `src/app/blog/[category]/[slug]/page.tsx:295`.

- **Spec:** R2's BLOCKER 2 on startups-tech was related-article links with no indicator;
  the brief says "This site adds a related rail on 23 posts. Check it."
- **Measured (with a 700ms transition settle, which matters — read immediately after
  `focus()` the card still shows its resting state and reads as no indicator at all):**
  the anchor carries `focus-visible:outline-none` and computes `outline-style: none`.
  `.related-card:focus-within` does fire and supplies: `border-color: rgb(229,135,100)`
  (`#e58764`, primary-400) and `box-shadow: rgba(201,105,69,0.22) 0 0 0 3px, rgba(176,83,47,0.6) 0 18px 40px -10px`.
  `#e58764` on the card's white ground = **2.63**; the 3px glow composites to
  `rgb(243,222,214)` on white = **1.19**; against the resting slate-200 border it is 2.13.
  So there is an indicator, and it is under the floor.
- **Severity:** gap, not blocker: something visible does happen. It would be a blocker if
  the glow were absent.
- **Fix:** kit-side, and therefore a manager report, not a site edit: either raise
  `--brand-glow-edge` for the focus state or restore an outline on the anchor. The site
  cannot reach either from the call site. **W2 did not report it** — the ledger at
  `:284-291` records the heading decision and says nothing about the ring.
- **Command:** focus the first `.related-card a`, wait 700ms, read
  `getComputedStyle(card).borderColor/.boxShadow`; decisive line:
  `{"fw":true,"bc":"rgb(229, 135, 100)","bs":"rgba(201, 105, 69, 0.22) 0px 0px 0px 3px, ..."}`.

**G7. `--surface-warm` and `--surface-warm-alt` are declared and have zero consumers, and
two call-site comments say they are not declared.** `globals.css:212-213`;
`src/app/services/page.tsx:78-82`, `src/app/for/page.tsx:71-75`.

- **Shipped comment (`for/page.tsx:74`):** *"It stays a literal until the manager declares a
  `--surface-warm` token in `globals.css`, a P1-A file this package may not edit. Requested
  in the receipt."*
- **What is true:** `globals.css:209-213` already declares both, with a comment naming the
  intended consumers (`bg-[var(--surface-warm)] / -alt`). `grep -rn 'surface-warm' src --include=*.tsx`
  returns the two decline comments and **zero uses**.
- **Severity:** gap. Not a rendering defect — the literals are the correct colour and
  locked rule 13 permits them — but it is another comment that claims what the tree does
  not say, and the token pair is dead.
- **Fix:** swap the six `bg-[#fafaf7]` / five `bg-[#fafaf9]` literals to
  `bg-[var(--surface-warm)]` / `-alt` (identical paint, verified: `#fafaf7` / `#fafaf9`
  are the declared values), and delete the two comments. Or delete the tokens. Do not keep
  both.
- **Command:** `grep -n 'surface-warm' hospitality/web/src/app/globals.css` = `209,212,213`;
  `grep -rn 'surface-warm' hospitality/web/src --include=*.tsx` = 2 hits, both comments.

**G8. Footer link tap targets are 15px tall at 390, on all 59 routes.**
Kit `SiteFooter` via `PageShell` (chrome, P1-C; outside the six packages' lease, reported
because check 11 asks for it).

- **Measured at a real 390 emulation:** `A "Contact" 48x15`, `A "Blog" 27x15`,
  `A "Privacy Policy" 80x15`, `A "Cookie Policy" 79x15`, `A "Terms" 34x15`,
  `A "Built by Double Wired Creative" 176x15`. WCAG 2.5.8 floor is 24x24 for a standalone
  control; these are standalone nav links, not inline prose links, so the inline exemption
  does not apply.
- **Severity:** gap, and not this wave's to fix.
- **Fix:** manager item on the kit footer: `py-1` on the link recipe, or `min-h-6`.
- **Command:** element-level `getBoundingClientRect()` sweep over `a, button, input, select`
  at 390; decisive line above.
- **Not reported:** the in-prose anchors at 21-22px on `/` and the post (inline text links,
  exempt) and the 1x1 `Skip to content` (sr-only until focused).

**G9. Homepage `<Eyebrow>` = 6 against W5's acceptance line of ">= 8".**

- **Measured, comment-stripped:** `<Eyebrow` **6**, `section-label` **0**
  (gate row 5 therefore PASSES: 6 >= 0).
- **Why it is 6 and not 8:** the 8 original `.section-label` divs were at `page.tsx:369,
  483, 591, 615, 643, 715, 749, 824`. Six became `<Eyebrow>` (`:527, 647, 765, 791, 823,
  982`). The seventh (`:715`, social proof) is now `TestimonialsSection eyebrow="Real
  outcomes"` at `:907`, which renders a kit `Eyebrow` the raw grep cannot see. The eighth
  (`:749`, contact CTA) is `LeadCTAPanel eyebrow="Get started"` at `:919`.
- **Severity:** gap on the acceptance line only, not on the design. Effective total is 8.
  Recorded so the next reader does not chase a phantom.
- **Fix:** none in code. Correct the acceptance line in the plan to ">= 6 in
  `app/page.tsx` plus 2 passed as kit props", or leave it and record this paragraph.

### NITS

**N1. Backdrop pattern ids on the services and sector families do not carry the site
prefix.** `/services` emits `services-hero` / `services-cta`, `/for/restaurants` emits
`sector-hero` / `sector-cta`, while every other family emits
`hospitality-table-setting-*`. The check the brief names
(`grep -o 'id="hospitality-table-setting[^"]*"'`) silently misses 13 routes. **Ids are
unique per page on every route measured** (12 routes, no duplicate), so there is no defect
to fix, only a naming inconsistency that defeats the audit grep.

**N2. `ReadingProgress` ships two `top` utilities.** Rendered class:
`fixed top-0 left-0 right-0 h-1 bg-[var(--border)] z-50 top-16`. `top-16` (the site's
`className` override, using the prop that landed at `1437cb9e`) wins and resolves correctly
to `top: 64px` against a 65px `header` at `z-index: 40` — **no collision, R2 NIT 7 on
startups-tech does not recur here.** `top-0` is dead and should come out of the kit default
or the override.

**N3. Second `TableOfContents` mount at `blog/[category]/[slug]/page.tsx:308` does not pass
`stickyMobile={false}`.** Harmless today because its parent `<aside>` is `hidden lg:block`,
so the mobile branch never paints. The `:248` mount does pass it and the sticky mobile TOC
is correctly OFF at 390 (measured: the `sticky top-16` element present at 390 has
`height: 0` and belongs to the hidden aside). Pass it on both so the next edit to the
aside's visibility cannot reintroduce the sticky bar.

**N4. Four kit components have zero mounts and no ledger line on the routes that could
carry them.** `DrawnTickList`, `WhatToExpectCard`, `ProcessTimeline`, `CardStack`: 0 imports
site-wide. `ProcessTimeline` and `WhatToExpectCard` have written declines; `CardStack` is
named only inside a combined decline at `for/[slug]/page.tsx:91` and `DrawnTickList` has no
decline anywhere despite being in W3's ADOPT table. Row 2a is 36, which is healthy, but
`DrawnTickList` is a hole in it.

---

## C) CLEARED — one line per mandatory check

| # | check | command | decisive line |
|---|---|---|---|
| 1 | four-marker row, rendered | `curl -s :3202/ > home.html`; count `animate-ping`/`rounded-full` in it; `perl -0pe 's{/\*.*?\*/}{}gs; s{//[^\n]*}{}g' src/app/page.tsx` for `StatsCounter`/`Backdrop` | **ping=2 (one pill dot) stats=1 backdrop=5 rounded-full=22.** Was 0/0/0/0. Property 1/2/3/4, generalist 1/2/3/4, startups-tech 1/3/3/4. |
| 1 | gate 9.1, all 8 rows, comment-stripped | playbook §9.1 block, `DIR=hospitality` | `1 layout-utils: 6` · `2 kit adopted: 10 distinct / 63 call sites` · `2a declined: 36` · `2b homepage mktg: adopted=4 declined=4` · `3 webfont: next/font next/font/google` · `4 backdrop: 1` · `5 Eyebrow=6 section-label=0` · `6 rings not the token: (empty)` · `7 gradients: app/page.tsx, HospitalityBackdrop.tsx` · `8 walks=1 gtg=1`. **All eight pass.** Row 2a 36 against row 2 at 10/63 is not the plain-jane shape; it is a site that adopted broadly and wrote its declines the countable way. |
| 2 | dark/brand grounds, every text and control, composited | 1x1-canvas `getComputedStyle` sweep over every block with relative luminance <= 140, plus a 440ms-settle `keyboard.press("Tab")` walk on `/`, `/for/restaurants`, `/book`, one post | Dark/brand grounds found: hero `#3a1a0d` (`.ground-dark` ✓), key-figures band `#3a1a0d` (✓), brand heroes `#b0532f` on `/services`, `/services/[slug]`, `/for`, `/for/[slug]`, `/about`, `/calculators/[slug]`, `/research` ×4 (✓ on all), `SlimHero` slate-900 on `/book`/`/complete`/`/thank-you` (✓), footer slate-900. **Rings, worst-case per stop:** header nav/CTA primary-600 at offset-2 on white **5.09**; hero primary CTA white on `#b0532f` **5.09**; hero secondary white on `#3a1a0d` **15.75**; brand-hero breadcrumb links white on `#b0532f` **5.09**; key-figures GOV.UK links white on `#3a1a0d` **15.75**; testimonials/closing-panel form controls primary-600 on the white form card **5.09**; footer links `#fff` on slate-900 **15.75**. **Every ring >= 3.0 except the related rail (G6).** |
| 2 | `.ground-dark` mechanism | `grep -rn 'ground-dark' src`; rendered `el.closest('.ground-dark')` per dark block | Mounted on every section painted dark, 6 hits on `/` alone. **No white form card sits inside a `.ground-dark` wrapper** — `LeadCTAPanel` deliberately does NOT carry it (`page.tsx:929-932` writes the reason: the panel holds a white form card and inheritance would put a white ring on white) and the measured form-control ring there is primary-600 at 5.09, which proves the call. The footer is not `.ground-dark` either but `globals.css:250-254` rebinds both ring tokens for it; measured `--focus-ring: #fff` on the footer, ring 15.75. Correct. |
| 3 | two grey ramps | `grep -rno 'neutral-[0-9]\{2,3\}' hospitality/web/src --include=*.tsx \| wc -l` | **0** site-wide (was 235 across the wave's files). One ramp, `slate-*`. |
| 3 | warm off-whites | `grep -o 'bg-\[#[0-9a-fA-F]\{3,8\}\]'` alongside the named-scale scan | `bg-[#fafaf9]` survives on 5 homepage bands, `bg-[#fafaf7]` on the services/sector templates, both rendered (`rgb(250,250,249)` / `rgb(250,250,247)` measured). **Not normalised into slate-50 — R6 avoided.** They sit next to `bg-white` and `bg-slate-50` sections on the same screen; at 250,250,249 vs 248,250,252 the difference is under one step and reads as one warm ground, not two ramps. No defect. See G7 for the dead token. |
| 4 | kit adoption table | `grep -rhoE 'from "[^"]*web-shared/design/[^"]*"' src \| sort \| uniq -c` | ADOPTED and rendered on the routes named: `Breadcrumb` 18, `LeadCTAPanel` 11, `page-blocks` (Eyebrow/CardStack) 10, `FaqSection` 7, `ScrollGlowGroup` 6, `ExampleFigureNote` 4 (calculators + 3 research + homepage), `SlimHero` 3 (`/book`, `/complete`, `/thank-you` — exactly the three its docstring names), `NoticeCard` 2, `TestimonialsSection` 1, `StatsCounter` 1, plus `TableOfContents`/`RelatedArticles`/`ReadingProgress`/`BlogSidebarCta`/`HubArticleList` and `ServiceTiers`. **Stale declines: G1 (SlimHero ×8 comments/11 routes), G2 (StatsCounter ×2/11 routes), G3 (CoverageCards ×4).** Declines still true at `1437cb9e`: `BlogListWithSearch`/`NumberedPagination` (the 12-post slice vs a floor of 37), `BlogCategoryHub`, `ProblemStatement` (K6, no copy props), `ComparisonTable` ("Most recommended"), any prose component over `contentHtml`, `CoverageCards` on `/services/[slug]` (no icon published). |
| 5 | radii | `getComputedStyle(document.documentElement).getPropertyValue('--radius')` and a `rounded-xl` card | `--radius: 0rem`; card `border-radius: 4px` on every route measured. **No collapse to 0px and no pill. R5 B1 does not recur.** |
| 5 | motion | scroll the full page, then read `[data-glow]` and `.eyebrow-rule` | after scroll: `eyebrowAttrs: ["on:none" ×8]` (all 8 rules drawn, `transform: none`), `glow: ["on","on"]` (both `ScrollGlowGroup` grids fired, 6 and 5 children). Before scroll both are `off` — the observers are live, not stuck. `animate-ping` is one dot on the hero pill, `absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75`. |
| 5 | `StatsCounter` T15 pre-hydration | `grep -c` on the server HTML | `£90,000` 1, `12.71` 1, `15%` 1, `£10,500` 1. **True figures in the SSR frame.** Mono confirmed: `ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace` on `£90,000`. |
| 5 | `text-balance` on the H1 | computed `text-wrap` | `balance` on `/`, `wrap` elsewhere (correct: only the homepage H1 was specified). Homepage H1 = **72px**, the `lg:text-7xl` target. |
| 6 | backdrop pattern ids | `Array.from(document.querySelectorAll('pattern,linearGradient,radialGradient,mask,filter')).map(e=>e.id)` per route | **no duplicate id on any of 12 routes.** Ids are unique per page. The mask/fade sits in a `pointer-events-none absolute` layer behind `relative z-10` content on every mount; no copy sits under it. Footer mount present (`hospitality-table-setting` appears once on all 59 routes). See N1 for naming. |
| 7 | `data-cta` on controls | `grep -rn 'data-cta' src --include=*.tsx \| grep -v '<a\|<button\|<Link'` | every non-comment hit is on an `<a>` or `<button>`. **Zero wrappers.** Header triple unchanged. Triples split: see G5. |
| 8 | forms | `grep -o '<form' <served HTML> \| wc -l` per route | `/` 1, `/services` 1, `/services/[slug]` 1, `/for` 1 (was 0), `/for/[slug]` 1, `/blog` 1 (was 0), post **2** (`InlineMiniLeadForm` + closing panel; `BlogSidebarCta` is an anchor, exactly the 3-surface / 2-form spec), `/calculators` 1 (was 0), tool 1, `/research` 1 (was 0), research detail 1, `/contact` 1, `/about` 1. **One per money page, none doubled.** `#enquiry-form` exists exactly once on the post with two `href="#enquiry-form"` pointing at it. Form field rings measured 5.09 to 11.00 on their white card; labels lifted to `text-neutral-600`-equivalent slate in phase 1 and no label failed. |
| 9 | `Breadcrumb tone="onBrand"` | 1x1-canvas composite on the brand heroes | links **white on `rgb(176,83,47)` = 5.09**, chevron `rgb(239,221,213)` (white/80) = **3.87** (>= 3.0 graphic floor). `tone="default"` on the white grounds of `/blog`, `/contact`, legal. **`grep -rn 'crumbOnBrand' src` = 0 hits.** |
| 10 | typography | computed `font-family` | body and `<h1>`: `"Plus Jakarta Sans", "Plus Jakarta Sans Fallback", ui-sans-serif, ...` on all 12 routes. Webfont applied, gate row 3 non-empty. H1 scale 72 / 48 / 36 / 30px by route family, which is generalist's shape. |
| 11 | mobile 390 (real emulation) | `document.documentElement.scrollWidth` vs `window.innerWidth`, element sweep, tap targets | `scrollWidth 390 = innerWidth 390` on all 12 routes: **zero horizontal page overflow**. The only elements extending past 390 are `<table>` descendants inside their `overflow-x-auto` wrappers (homepage key-figures to 528px, post tables to 457px) — permitted by spec. Sticky mobile TOC **off**. Hero pill wraps cleanly. Stats grid **2-up**. Drawer: the mobile menu CTA is client-only, so no SSR crawl sees it — read from the shipped bundle, unchanged. Tap targets: see G8. |
| 12 | comments as claims, five spot-checks | read against the rendered DOM | `page.tsx:489-498` (StatsCounter band moved to white, 3.44/1.06 on brand vs 17.85/4.76 on white) — **TRUE**, band renders `bg-white`, figures slate-900. `page.tsx:918-932` (LeadCTAPanel, no `.ground-dark`, backdrop repaints `#3a1a0d` over slate-900) — **TRUE**, measured. `page.tsx:667-671` (key-figures band, white 15.78 / orange-100 13.77 / orange-300 9.36 on `#3a1a0d`) — **TRUE**. `blog/[slug]:300-307` (T32 one clamp) — **FALSE**, see B1. `services/[slug]:157-175` (StatsCounter "no tone prop", "fixed grid-cols-2 md:grid-cols-4") — **FALSE**, see G2. Also false: `for/page.tsx:74` / `services/page.tsx:81` (`--surface-warm` not declared), see G7. |
| — | JS disabled (K4) | `page.setJavaScriptEnabled(false)`, count visible `[data-state="closed"]` regions | `/` 32/32 visible, `/services/tronc-scheme-setup` 16/16, one post 56/56. **Every FAQ answer visible with JS off.** The `<noscript>` rule at `layout.tsx` (`[data-state="closed"][role="region"]{display:block!important}`) works. R5 B3 does not recur. Eyebrow rules also release (`transform: none`). |
| — | JSON-LD | `json.loads` every `ld+json` block on 17 routes | zero parse failures. **Exactly one `BreadcrumbList` per URL** on all 13 indexed routes (`grep -c 'BreadcrumbList'` returns 2 because the string appears twice inside one block; parsing the blocks gives 1). Homepage correctly emits none. |
| — | link floors | `curl -s :3202/<route> \| grep -oE 'href="/[^"]*"' \| sort -u \| wc -l` | `/` **32** (floor 21), `/services` **19** (11), `/services/tronc-scheme-setup` **18** (11), `/for` **20** (12), `/for/restaurants` **19** (13), `/blog` **45** (37), `/calculators` **17** (9), `/research` **17** (9), `/contact` **14** (6), `/about` **14** (6). **Every floor cleared, every route rose.** |
| — | hex survivors | `grep -rnoE '#[0-9a-fA-F]{3,8}' src/app src/components --include=*.tsx` | 78 hits across 11 files. Of those, every hit in `page.tsx`, `services/*`, `for/*` and `about` is **inside a comment carrying the measured reason**; the only hex in live code is the permitted `bg-[#fafaf9]` / `bg-[#3a1a0d]` / `from-[#3a1a0d] via-primary-600/70 to-[#2a1208]` / `bg-[#fafaf7]` set that locked rule 13 and R6 explicitly protect, plus the four permitted files. **R2 GAP 6 (survivors with no reason) does not recur.** |
| — | `outline-none` | `grep -rn 'outline-none' src` | 2, both pre-existing and both correct per the KNOWN list. The kit `RelatedArticles` one is G6. |

## Screenshots, described

Saved at 1280 and 390 for `/`, `/services`, `/services/tronc-scheme-setup`, `/for/restaurants`,
`/blog`, one post, `/calculators`, one tool, `/research`, `/contact`, `/about`, `/book`.

**`/` at 1280 (10,992px tall).** Reads top to bottom as: a full-bleed dark brown hero with
the table-setting motif visible behind the copy, a small rounded pill with a live dot, a
72px balanced headline, a filled brand button beside an outlined one; a white four-figure
stats strip in mono with gov.uk links; a warm off-white intro paragraph; an eyebrow-led
six-cell "who we work with" grid; a warm-ground six-card sector grid with brand-tinted card
heads; a white five-card services grid; a warm-ground four-card compliance band; a dark
`#3a1a0d` key-figures table with orange source links; a white free-tools and data-asset
pair; a warm-ground comparison table; a **dark testimonials band with the motif and three
quotes, no stars**; a dark closing panel with a white form card on the right; a white
accordion FAQ; a warm-ground three-post blog band; a dark footer. Band rhythm alternates
white / warm / dark and never repeats a ground twice without an eyebrow between.

**Where it still reads cheaper than generalist:** the run from the intro strip to the
key-figures table is five consecutive light card-or-table bands at nearly identical visual
weight with no dark interruption, so the upper-middle third reads as one long uniform list
before the first dark band arrives. generalist breaks that stretch earlier. Second, the
hero standfirst at white/80 on brand (**3.87**, measured; owner colour decision pending per
the KNOWN list) is the faintest thing on the most-looked-at screen. Third, the stock
`orange-*` accents on the sector and services cards (owner decision pending) sit a little
warm and a little bright against `#b0532f` and are the one place the palette reads borrowed.

**`/` at 390 (46,230px tall).** No horizontal scroll, stats strip 2-up, hero pill on one
line, every grid collapsed to one column, tables scrolling inside their own wrappers. The
page is very long, which is the sum of the bands, not a defect.

**`/for/restaurants` and `/services/tronc-scheme-setup` at 1280.** Brand `#b0532f` hero with
the motif, an `onBrand` breadcrumb, the standfirst, then a dark `bg-slate-800` hand-rolled
three-stat band (G2), authored-HTML card grids, a kit accordion FAQ, the closing panel, an
"other services" rail on the warm ground. These two are the routes most visibly still
carrying a hand-rolled component where a kit one now fits.

**`/research`, `/calculators`, `/book`, `/contact`, `/about`.** All now open on a hero with
the motif (brand ground on the first three, slate-900 `SlimHero` on `/book`), all carry a
form, `/book` and `/thank-you` carry `NoticeCard` in place of the old square `border-2`
boxes.

---

## D) OPEN QUESTIONS FOR THE OWNER

1. **The faint line under the big headline on the front page.** It is white text at 80
   strength on the brown, which is legible but soft. Do you want it brightened to full
   white, or is the soft look deliberate? (This is already on your list; I measured it so
   you have the number: 3.87 against a 4.5 target for normal text.)

2. **The small orange highlights on the sector and service cards.** They are a stock orange
   rather than a shade of the brand brown, and they are the one place the colours look
   borrowed from somewhere else. Do you want them pulled onto the brand?

3. **Eight page headers still use a hand-built version of a component the shared kit now
   supports.** Building them the shared way costs about an hour and means every site fixes
   together in future. It changes nothing a visitor sees. Do you want that tidy-up now, or
   parked until after you have walked the site?

4. **The small "Research" and category labels on the coloured page headers are slightly too
   faint** (3.43 against a 4.5 target). Fixing it needs a small change to the shared kit
   that touches other sites. Do you want it fixed now, or recorded and left?

5. **The footer links are 15 pixels tall on a phone,** below the 24-pixel size guidelines
   ask for. That is in the shared footer used by every site, not this one. Fix estate-wide,
   or leave?

6. Not a question, a note you asked for earlier: **the "partner network" sentence on the
   thank-you page is still there and was not touched by this wave**, as planned.
