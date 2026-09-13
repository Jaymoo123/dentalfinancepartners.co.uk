# P3-2: research and resources, contractors-ir35/web

Package: P3-2. Date: 2026-09-13. Site: `contractors-ir35`.

**File lease held, and nothing outside it was written:**
`src/app/research/page.tsx`, `src/app/research/uk-contractor-index/page.tsx`,
`src/app/research/uk-contractor-insolvency-index/page.tsx`,
`src/app/research/uk-contractor-survival-index/page.tsx`,
`src/app/resources/[topic]/page.tsx`, `src/components/research/*.tsx`.
`src/app/resources/page.tsx` does not exist and was NOT created (the hub is gated
on owner question 6; a hub pointing at `noindex` pages is the contradiction the
delta names). `packages/web-shared/` untouched. No `Property/` or sibling-site
file touched. No git state-changing command run.

`git status --porcelain` at hand-off lists exactly the 9 files above plus four
`glossary`/`locations` files belonging to the parallel agent. `ChartDataTable.tsx`
shows **no diff at all**.

---

## §1. Instrument identity, asserted before any served claim

Both servers were title-asserted AND age-asserted before either was quoted. No
server was started and nothing was written to either.

```
curl -s http://localhost:3641/ | grep -o "<title>[^<]*</title>"
  -> <title>Specialist Contractor Accountants | IR35 Advice UK</title>
curl -s http://localhost:3611/ | grep -o "<title>[^<]*</title>"
  -> <title>Specialist Contractor Accountants | IR35 Advice UK</title>

age probe, "fixed fee" on /:
  3641 -> 0      (current build, F8 fee-promise resweep landed)
  3611 -> 17     (pre-port)
```

**The brief is wrong on one number.** It says the age probe returns "0 on 3641,
1 on 3611". The measured pre-port count is **17**, not 1. The DIRECTION the probe
is for is intact and the two servers are correctly identified: 3641 is post-fix,
3611 is pre-port. Recorded rather than silently rounded, because a builder who
saw 17 and expected 1 could conclude the instrument was the wrong site.

Port **3621**, which `P3_ROUTE_ANATOMIES.md` and `DESIGN_DELTA.md` quote
throughout, is **down** (empty response). Nothing in this package cites it.

---

## §2. Charts re-ramped through tokens

No SVG was hand-recoloured. Every literal hex in the three chart components was
replaced by a `var()` read of a token that already exists in `globals.css`
(READ only; that file was not edited). Each carries the literal as a `var(x, fallback)`
second argument so a token failure degrades to today's colour rather than to black.

| File | Constant | Was | Now | Why |
|---|---|---|---|---|
| `ContractorIndexCharts.tsx` | `CYAN` | `#0e7490` cyan-700 | `var(--chart-1, #0e7490)` | same hex, now tokenised |
| `ContractorIndexCharts.tsx` | `CYAN_FILL` | `#0e7490` cyan-700 | `var(--chart-1, #0e7490)` | same hex, now tokenised |
| `ContractorIndexCharts.tsx` | `CYAN_PROV` | `#67e8f9` cyan-300 | `var(--chart-3, #0891b2)` cyan-600 | **colour change, and it is a fix**: cyan-300 measures **1.45** on white, below even the 3.0 non-text graphics floor |
| `ContractorIndexCharts.tsx` | `AMBER` | `#b45309` amber-700 | `var(--highlight, #b45309)` | same hex. Semantic (reform reference line), NOT a ramp step, so it binds to `--highlight`, not to a `--chart-n` |
| `ContractorIndexCharts.tsx` | `GRID` | `#e5e7eb` neutral-200 | `var(--hairline, #e5e5e5)` | decorative rules bind to the hairline token |
| `ContractorIndexCharts.tsx` | `AXIS_TEXT` | `#737373` neutral-500 | `var(--chart-5, #475569)` slate-600 | axis text 4.74 -> 7.58 |
| `ContractorInsolvencyCharts.tsx` | `CYAN` | `#0e7490` | `var(--chart-1, #0e7490)` | same hex |
| `ContractorInsolvencyCharts.tsx` | `CYAN_LIGHT` | `#67e8f9` cyan-300 | `var(--chart-3, #0891b2)` | 1.45 -> 3.68, clears the graphics floor |
| `ContractorInsolvencyCharts.tsx` | `AMBER` | `#b45309` | `var(--highlight, #b45309)` | same hex, semantic |
| `ContractorInsolvencyCharts.tsx` | `NEUTRAL` | `#a3a3a3` neutral-400 | `var(--chart-5, #475569)` | 2.52 -> 7.58 |
| `ContractorInsolvencyCharts.tsx` | `GRID` | `#e5e7eb` | `var(--hairline, #e5e5e5)` | |
| `ContractorInsolvencyCharts.tsx` | `AXIS_TEXT` | `#737373` | `var(--chart-5, #475569)` | 4.74 -> 7.58 |
| `SurvivalIndexCharts.tsx` | `CYAN` | `#0e7490` | `var(--chart-1, #0e7490)` | same hex |
| `SurvivalIndexCharts.tsx` | `NEUTRAL` | `#a3a3a3` neutral-400 | `var(--chart-5, #475569)` | **2.52 -> 7.58, and this one held TEXT**: the "All industries" series label is drawn in it (`SurvivalIndexCharts.tsx:114`), so it was a live 2.52:1 text failure, not only a line colour |
| `SurvivalIndexCharts.tsx` | `GRID` | `#e5e7eb` | `var(--hairline, #e5e5e5)` | |
| `SurvivalIndexCharts.tsx` | `AXIS_TEXT` | `#737373` | `var(--chart-5, #475569)` | 4.74 -> 7.58 |

`grep -rn '#[0-9a-fA-F]\{6\}' src/components/research/*.tsx` now returns only the
`var()` fallbacks and the explanatory comments. Zero free-standing hexes remain.

`--chart-2` (cyan-800) and `--chart-4` (cyan-900) are defined and unused: no chart
on this site plots four or five categorical series. Defining more series than a
chart has is not a defect; inventing a fourth series to consume a token would be.

**P1-1's chart-3 warning was read before assuming a value.** `--chart-3` is
cyan-600 `#0891b2` (3.68), deliberately NOT the natural ramp step cyan-400
(1.81). Its two uses here are both graphical fills whose values are carried in
the `ChartDataTable` and, on the captured-share chart, direct-labelled, so the
3.0 non-text floor is the correct one and it passes. `--chart-3` holds no text
on any of these three components.

---

## §3. Contrast, hand-measured, before and after

Method: WCAG relative luminance, sRGB to linear per channel, `(L1+0.05)/(L2+0.05)`.
**Self-test run first and asserted before any row below was trusted**:
slate-500 `#64748b` on white = **4.7588** (4.76), slate-400 `#94a3b8` on white =
**2.5640** (2.56). Both reproduced exactly, matching the published anchors.

### 3a. The recorded defect in the lease

| Site | Role | Ground | Before | After | Floor | Verdict |
|---|---|---|---|---|---|---|
| `src/app/research/page.tsx:83` "Updated {month}" | body fine print | white `#ffffff` | `text-neutral-400` `#a3a3a3` = **2.52** | `text-slate-500` `#64748b` = **4.76** | 4.5 | FAIL -> **PASS** |

**Correction to the brief and to the anatomy.** Both quote this defect at
**2.38**. 2.38 is the ratio of `#a3a3a3` against the site surface `#fafaf7`
(DESIGN_DELTA §2's row). The ground at this call site is `bg-white`, not
`#fafaf7` (the enclosing section is `bg-white`), so the true measured ratio is
**2.52**. It fails either way and the fix is the same; the number in the brief is
measured against the wrong ground. The replacement is slate-500, the estate
answer per §0.7, never slate-400.

### 3b. Every other ratio this package measured

| Colour | Role | Ground | Ratio | Floor | Verdict |
|---|---|---|---|---|---|
| slate-600 `#475569` (`--chart-5`) | axis text, comparator label | white | 7.58 | 4.5 | PASS (was neutral-500 4.74 / neutral-400 2.52) |
| cyan-600 `#0891b2` (`--chart-3`) | fill only | white | 3.68 | 3.0 | PASS graphics floor (was cyan-300 **1.45**, FAIL) |
| cyan-700 `#0e7490` (`--chart-1`) | fill and series label | white | 5.36 | 4.5 | PASS |
| amber-700 `#b45309` (`--highlight`) | reform reference line | white | 5.02 | 4.5 | PASS |
| white | hero CTA label | cyan-700 `#0e7490` ground | 5.36 | 4.5 | PASS |
| cyan-300 `#67e8f9` | hero eyebrow, CTA focus ring | neutral-900 `#171717` | 12.37 | 4.5 | PASS |
| white | hero h1 | neutral-900 `#171717` | 17.93 | 4.5 | PASS |
| neutral-300 `#d4d4d4` | hero standfirst, currency stamp | neutral-900 `#171717` | 11.55 | 4.5 | PASS |
| neutral-700 `#404040` | body copy on the new slate bands | slate-50 `#f8fafc` | 9.91 | 4.5 | PASS |
| cyan-900 `#164e63` | "Key facts" heading | cyan-50/60 over white, resolved ~`#f4feff` | 8.88 | 4.5 | PASS |
| neutral-800 `#262626` | key-facts list | ~`#f4feff` | 14.75 | 4.5 | PASS |

### 3c. `/resources/[topic]`, hand-computed, no instrument cited

This route is one of DESIGN_DELTA §6 H2's thirteen `var()`-themed files, where
`browser_check.mjs` falls back to white and reports a pass it did not measure.
**No instrument output is cited for this route anywhere in this document or in
the file's comments.** Tokens resolved by reading `:root` in `globals.css`:

| Token | Resolves to | Role after the port | Ground | Ratio | Verdict |
|---|---|---|---|---|---|
| `--accent` | cyan-700 `#0e7490` | ToC link, prose links | slate-50 `#f8fafc` / white | 5.12 / 5.36 | PASS |
| `--accent` | cyan-700 `#0e7490` | xlsx button ground under a white label | n/a | 5.36 | PASS |
| `--ink` | `#0a0a0a` | prose headings and strong | white | 19.80 | PASS |
| `--ink-soft` | `#525252` neutral-600 | (no longer used on this route; the summary moved to the navy hero) | white | 7.81 | PASS |
| `--muted` | **`var(--ink-soft)` = `#525252`** | ToC eyebrow | slate-50 `#f8fafc` | **7.47** | PASS |
| `--border` | `#e5e5e5` | (replaced by `ring-1 ring-slate-200/70`) | n/a | n/a | n/a |
| `--surface-elevated` | `#ffffff` | ToC card ground | n/a | n/a | n/a |

**This closes the anatomy's B11 UNVERIFIED.** B11 recorded `text-[var(--muted)]`
on the currency stamp as a suspected failure "adjacent to `--ink-whisper`
(2.38:1)". It is not. `--muted` is defined at `globals.css:63` as
`var(--ink-soft)`, i.e. neutral-600 `#525252`, which measures **7.47 on slate-50
and 7.81 on white**. It was never near the whisper step. The currency stamp has
in any case moved to the navy hero at neutral-300 (11.55).

---

## §4. What was already done here, verified independently rather than trusted

All four claims in the brief were checked against source and against the served
build on 3641 before any edit. All four hold.

1. **Eight visually hidden chart data tables exist and survive.**
   `grep -c "<ChartDataTable"` -> ContractorIndex 3, ContractorInsolvency 3,
   Survival 2 = **8**, unchanged by this package. `grep -rn 'role="img"' src`
   returns **0** site-wide. Served proof, `class="sr-only"` occurrences:
   `/research/uk-contractor-index` **3**, `/research/uk-contractor-insolvency-index`
   **3**, `/research/uk-contractor-survival-index` **2**. No chart was re-wrapped,
   no `aria-hidden` moved, no data table's contents changed: the only edits to the
   three chart files are the colour constants in §2, each verified by diff.
   The ninth chart of DESIGN_DELTA §6 H3 is `calculators/premium/PremiumBarChart.tsx`,
   phase 4's, and was not touched.
2. **`sr-only` is on the wrapper `<div>`, not the `<table>`, and stays there.**
   `ChartDataTable.tsx:32` is `<div className="sr-only">` with a bare `<table>`
   inside, and the file carries `git diff` of **zero lines** from this package.
   No visually hidden table was added anywhere by this package, so F9's rule had
   nothing new to bind. The mechanism, re-derived rather than restated: a
   `<table>` is `display: table`, where used width is `max(specified, min-content)`,
   so `width:1px` is ignored; `overflow:hidden` cannot clip the element's own box;
   and `clip` affects painting, not the scrollable overflow region.
3. **The three `resources/[topic]` pages are `noindex, follow` and out of the
   sitemap, and this was left alone.** Served on 3641:
   `/resources/ir35`, `/resources/structure`, `/resources/pay-planning` each
   return `<meta name="robots" content="noindex, follow"/>`, and
   `curl -s .../sitemap.xml | grep -c "resources/"` returns **0**.
   `generateMetadata` line 44 is untouched. Nothing was re-added to the sitemap.
   The file's header comment DID still claim "Pages are indexable", which was
   false since F5 landed; the comment is corrected and now says the opposite
   explicitly, with "do not tidy this in either direction". Comment only, no
   behaviour change.
4. **The corrected resources tax figures and the corrected statement of law were
   not touched.** They live in `content/resources/{ir35,structure,pay-planning}.md`,
   which is outside the lease and shows no diff. The route renders that content
   through `dangerouslySetInnerHTML`, and the injected markup is passed through
   byte-identically: the only change around it is the `prose` block's enclosing
   band, and the `prose` className string itself is character-for-character the
   same.

---

## §5. The restyle, per §0

### 5a. `/research` (hub)

- Card surfaces `rounded-2xl border border-neutral-200` -> `rounded-xl ring-1
  ring-slate-200/70`. Hover `border-cyan-600` -> `ring-cyan-700` (cyan-600 is the
  3.68 step this site does not bind, DESIGN_DELTA §1).
- Section rhythm `py-10 sm:py-14` -> `py-12 sm:py-16 lg:py-20`.
- Contrast fix per §3a.
- **Hero primary CTA added**, `href="#book"`, carrying the full
  `data-cta="hero_book"` / `data-cta-placement="hero"` / `data-cta-goal="form"`
  triple, which is the convention already used on the glossary and locations
  routes. §0.5's "a reader can scroll the whole hub without meeting an ask" is
  closed.
- **Closing ask: the kit's `LeadCTAPanel`**, `contained ground="slate"`, wrapped
  in `<div id="book" className="scroll-mt-24">`, `proofPoints={[]}`. Tail is now
  panel -> footer, and navy never touches navy. **Corrected after the first pass
  hand-built this panel inline on a false premise: see §8.3 and §5d.**
- Grounds: navy hero -> white cards -> slate-50 ask -> dark footer. No two
  touching bands share a ground.
- Preserved: all three derived card stats, all three derived "Updated" stamps,
  the three internal links to the children, and "Free to read and cite with
  attribution". Zero figures typed.

### 5b. The three research articles, ported as one family

Applied identically to all three so no divergence exists between them:

- **Body clamp removed.** `<div className="max-w-4xl">` round the whole article
  is gone (§A rule 2). The page measure is now `siteContainerLg` throughout. The
  only surviving `max-w-4xl` on each page is on the hero `h1`, which is the
  sanctioned narrow hero measure.
- **Section grounds oscillate.** `Section` was a hairline-ruled block inside one
  unbroken white band; it is now a full-bleed band that carries its own ground
  and its own container, alternating white / slate-50. The order is declared once
  per file in `SECTION_ORDER` and read by `groundFor(id)`, rather than hand-set
  per call site, **because `/research/uk-contractor-index` has a conditional
  section** (`reform_overlay`): hand-set grounds would silently produce two
  touching slate bands the day that section is absent. Verified both ways by
  reading the order: with the conditional section present and absent, no two
  adjacent bands share a ground, and the last band before the dark footer is
  never dark.
- **Rhythm** `py-10` -> `py-12 sm:py-16 lg:py-20` on every band.
- **Radius.** Key facts / key findings panel `rounded-2xl border border-cyan-500/20`
  -> `rounded-xl ring-1 ring-cyan-700/20`. All eight chart frames
  `rounded-2xl border border-neutral-200` -> `rounded-xl bg-white ring-1
  ring-slate-200/70` (3 + 3 + 2). Placeholder warning band `rounded-lg` ->
  `rounded-xl`. `grep rounded-2xl` over the three files now returns zero.
- **The bare `LeadForm` in a coloured card is gone**, on all three. The gradient
  card `rounded-2xl border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 to-white`
  is replaced by the kit's **`LeadCTAPanel`** (§5d), whose own right column is a
  white `rounded-xl` card holding the form. §0.5's "LeadForm on a white or light
  surface, every time" now holds on all three. The authored copy moved into the
  panel's props **word for word**: the heading to `title`, the paragraph to
  `description`, the two calculator links to `footnote`. The only changes are
  mechanical: JSX line wrapping collapses into a single prop string, and
  `&apos;` becomes the literal apostrophe it already rendered as. No word added,
  removed or reordered on any of the three.
- **Hero primary CTA added** on each, `href="#book"`, with the full
  `data-cta="hero_book"` triple, matching the glossary and locations convention.
  Placed after the derived stat strip.
- **FAQ kept always-open** and moved into its own band. No Radix accordion was
  introduced: the answers stay unconditionally in server HTML, which is what
  makes `buildFaqJsonLd` over the same array truthful (DESIGN_DELTA §4 P2).
- **Funnel order** now reads hook (hero + derived stat strip) -> problem/proof
  (key facts, charts, tables, sources) -> scope (the ask's own paragraph) -> ask
  -> FAQ -> footer.
- Preserved and re-checked by diff: all three JSON-LD blocks and the arrays that
  feed them; the `/data` CSV link; `rel="nofollow"` on every outbound source; the
  citation-licence line; the "does not constitute tax advice" line; the
  `isPlaceholder` warning condition; the captured-share framing sentence
  (insolvency); the birth-cohort wording (survival); the comparison shape of the
  survival curve, which was NOT flattened into a card grid.

### 5c. `/resources/[topic]`

- `<article className="bg-white py-12 sm:py-16">` with a `mx-auto max-w-3xl`
  clamp becomes four bands: **navy hero** (eyebrow, title, summary, currency
  stamp, xlsx button) -> **slate-50 contents** -> **white guide body** ->
  **slate-50 closing ask**. The body clamp is gone; the measure is
  `siteContainerLg`.
- ToC `rounded-lg border border-[var(--border)]` -> `rounded-xl ring-1
  ring-slate-200/70`, keeping `bg-[var(--surface-elevated)]`.
- xlsx download: `rounded-full px-5 py-2.5 text-sm` -> the standard button box,
  `rounded-xl min-h-12 px-8 py-3.5 text-base font-bold`, plus a visible focus
  ring. **`download` attribute kept, `isXlsxEnabled` gate kept, no re-gating.**
- **`LeadCTAPanel` was NOT adopted here**, deliberately. `ResourceGate` /
  `MiniCapture` is one of DESIGN_DELTA §5a's ten live capture surfaces, marked
  RESTYLE. Adding the kit panel beside it would make eleven, and §4.6.6 forbids
  adding an interruptive surface without an owner yes. The port adds zero.
- `ResourceGate` now sits on the slate-50 band, a light ground.
  `formId="resource_block"` and the `[Resource block: <topic>]` prefix are
  untouched (the standing zero-lead watch on `resource_block` makes renaming it
  exactly the wrong move during a restyle).
- `dynamicParams = false`, `publishedGuideTopicsWithFile()`, the derived ToC and
  the version / last-reviewed stamp all preserved.

### 5d. The kit adoption, and its audit

**What was adopted:** `LeadCTAPanel` from
`packages/web-shared/design/marketing/LeadCTAPanel.tsx`, on `/research` and all
three research articles. Four call sites, one convention, copied from the
working call site at `src/app/locations/page.tsx:216-237` rather than invented:

```
<div id="book" className="scroll-mt-24">
  <LeadCTAPanel
    contained                       // no dark band touching the dark footer
    ground={...}                    // "slate" on the hub; on the articles it
                                    //   follows that page's own groundFor("book")
    eyebrow="Free call"
    title={the page's existing heading, word for word}
    description={the page's existing paragraph, word for word}
    proofPoints={[]}                // EMPTY, see below
    formTitle="Book your free call"
    form={<LeadForm redirectOnSuccess={false} submitLabel="Get a free IR35 review" />}
    footnote={the two calculator links, articles only}
  />
</div>
```

**`proofPoints` is EMPTY at all four call sites**, and that is load-bearing, not
laziness. Property's own call site passes "Fixed fees, quoted upfront" and
"24-hour response": a **fee claim** and a **turnaround promise**, both banned
here (§A rules 4 and 5, and a fee claim was found rendering site-wide from a
config file earlier today). The prop is required and non-defaulting, so it cannot
be inherited by omission, and `PanelBody` guards with `proofPoints.length ? ... :
null`, so an empty array renders nothing at all rather than an empty `<ul>`.
Verified by reading `LeadCTAPanel.tsx:162` and `:183`.
`grep -rn "proofPoints" <lease>` shows `proofPoints={[]}` at 4 of 4 call sites.

**The focus-ring trap was checked, and it does not fire here.** The rule: a kit
component that delegates its focus ring to `globals-standard.css` renders an
invisible ring on this site, which does not import that file. It already bit
`RelatedArticles`. Checked on what was actually adopted:

- `grep -nE "focus-visible|focus:" LeadCTAPanel.tsx` -> **zero hits**, because
  the panel renders **no interactive element of its own**. Its only interactive
  children are `form` and `footnote`, both supplied by the caller.
- Its two kit dependencies, `Eyebrow` and `EyebrowRule` from
  `design/primitives/page-blocks.tsx`, render a `<p>` and a rule. Neither is
  focusable and neither carries a bespoke class name: a sweep of both files for
  non-Tailwind classes (`story-*`, `draw-*`, `reveal*`, `kit-*`, `eyebrow*`)
  returns nothing, so there is no class whose definition lives only in
  `globals-standard.css`.
- **The interactive children are mine, so they carry their own ring
  explicitly:** `LeadForm` already does, and the two footnote links were given
  `focus-visible:outline-2 focus-visible:outline-cyan-700` rather than relying on
  anything the kit might have supplied.

**The panel's own surfaces, hand-measured** (its contained card is
`bg-slate-100 #f1f5f9`, which is neither of the grounds measured elsewhere in
§3, so none of those rows covered it):

| Element | Colour | Ground | Ratio | Floor | Verdict |
|---|---|---|---|---|---|
| panel `h2` (`title`) | slate-900 `#0f172a` | slate-100 `#f1f5f9` | 16.30 | 4.5 | PASS |
| panel `description` | slate-600 `#475569` | slate-100 | 6.92 | 4.5 | PASS |
| `Eyebrow` ("Free call") | slate-600 `#475569` | slate-100 | 6.92 | 4.5 | PASS |
| `footnote` paragraph | slate-600 `#475569` | slate-100 | 6.92 | 4.5 | PASS |
| calculator links in the footnote | cyan-800 `#155e75` | slate-100 | 6.63 | 4.5 | PASS |
| `formTitle` | slate-900 `#0f172a` | white (form card) | 17.85 | 4.5 | PASS |

The kit's `primary-*` utilities resolve correctly on this site: `globals.css`
`@theme` binds `--color-primary-600` to cyan-700 `#0e7490` (4.89 on slate-100)
and `--color-primary-700` to cyan-800, which is the shift DESIGN_DELTA §1
requires. No kit recipe lands on the unusable cyan-600 step.

**A real defect in my own first adoption, found and fixed before hand-off.**
`PanelBody` renders `footnote` **inside a `<p>`** (`LeadCTAPanel.tsx:185-189`).
My first pass passed the calculator links still wrapped in their original
`<div className="mt-6 flex ...">`, which is a block element inside a paragraph:
the HTML parser auto-closes the `<p>`, the DOM does not match what React
rendered, and it is a hydration mismatch waiting to happen. The wrapper is now a
`<span className="flex flex-wrap gap-x-6 gap-y-2 font-semibold">`, and the
`mt-6` / `text-sm` were dropped because the enclosing `<p>` already sets both.
Same two links, same hrefs, same text. **This is the concrete cost of the wrong
premise in §8.3: adopting the component means inheriting its internal markup
contract, which hand-building had hidden.**

**`FaqSection` was NOT adopted, deliberately**, even though it does exist at
`packages/web-shared/design/primitives/FaqSection.tsx`. It is the Radix
accordion with no `forceMount` that DESIGN_DELTA §4 P2 bans by written decision:
closed answers leave the server HTML while `buildFaqJsonLd` keeps asserting them
to crawlers. The always-open markup stays on all three articles.
`grep -rn "FaqSection" <lease>` returns 3 hits, **all of them the comment naming
the ban**, zero imports.

**One `data-cta` convention on the site, not two.** The kit panel emits no
`data-cta` of its own (`grep` over `LeadCTAPanel.tsx` -> zero), so the hero CTAs
are the only ones these routes add. The parallel agent's four glossary and
locations routes all use `data-cta="hero_book"` + `placement="hero"` +
`goal="form"`. My first pass had invented `data-cta="research_hero"`; it is
**renamed to `hero_book`** on all four routes so `vw_cta_performance` sees one
name for one thing rather than two rival ones.

---

## §6. Binding constraints, checked

| Constraint | Check | Result |
|---|---|---|
| `data-cta` triples preserved, attribute NAMES included | `grep -rno 'data-cta="[a-z_]*"'` over the lease | 4 complete triples, all **added** by this package (hub + 3 articles), all named **`hero_book`**, matching the glossary and locations routes. **Zero existed in these files before**, per anatomy §A.8, so none could be lost. The adopted `LeadCTAPanel` emits none of its own. Chrome's `header_book` and `specialist_widget` are emitted by `PageShell`/`SiteHeader`, outside the lease, untouched |
| No em-dash in user-facing copy | `grep -rn "—\|&mdash;\|&#8212;"` over the lease | **0** |
| No published price for our services, no fee claim | `grep -rniE "fixed fee\|our fee\|£[0-9]+ ?(per\|/)"` over the lease | **0 hits** |
| No turnaround or response-time promise | `grep -rniE "within [0-9]+ (hour\|day)\|same.day\|24 hours"` | **0 hits** |
| No claim to a qualification, regulator, PI insurance or regulated work | `grep -rniE "chartered\|regulated by\|professional indemnity\|qualified accountant"` | **0 hits** |
| First-person "we do the work" voice stays | new hub copy reads "We do the work on contractor tax positions every day" | held, not rewritten into introducer voice |
| "free call" stays | present in the new hub ask; the three articles' asks keep their original wording verbatim | held |
| Reassurance copy beside the capture field matches the privacy policy | `LeadForm` and `MiniCapture` both render `siteConfig.leadConsentText` plus a link to `/privacy-policy`. That text says details may be shared with a firm from the specialist partner network and passed on to another firm in the network for the same purpose. Privacy policy §5 (`src/app/privacy-policy/page.tsx:121-132`) says exactly that. | **consistent**. Neither form's copy was edited |
| Published figures unchanged | `git diff` filtered to numeric non-class lines shows **only whitespace re-indentation** of moved copy | **no figure changed anywhere**, and none looked wrong enough to report to the figures ledger |
| Property defects not inherited | `WhatToExpectCard`, `NumberedReasons`: zero hits, not adopted. `FaqSection` exists in the kit and was **deliberately not adopted** (§5d); its 3 grep hits are the comment naming the ban, zero imports. No Radix, no keyframe class. | held |
| Kit components delegating focus rings to `globals-standard.css` | **`LeadCTAPanel` WAS adopted**, so the trap could fire and was checked properly. `grep -nE "focus-visible\|focus:"` over `LeadCTAPanel.tsx` and its `page-blocks.tsx` dependencies -> **zero**: the panel renders no interactive element of its own, and neither dependency carries a bespoke class defined only in `globals-standard.css`. Its interactive children are caller-supplied and carry explicit rings. §5d | checked, does not fire |
| `proofPoints` left empty rather than invented | `proofPoints={[]}` at **4 of 4** call sites. The prop is required and non-defaulting so nothing can be inherited by omission, and `PanelBody` renders nothing for an empty array. Property's own call site passes a fee claim and a turnaround promise; neither reaches this site. §5d | held |
| `packages/web-shared/` not edited | `git status` | clean |

### The link floor

`sweep_baseline.json` (157 URLs, 2755 links, sha `18b4f25f`) records:
`/research` **13**, each research article **14**, each resource guide **11**.

Measured against **source**, since the sweep runs on a build this package cannot
produce: the diff removes **6** internal `href="/..."` and adds back **6**, and
they are the same six links (the two calculator links per article, moved inside
the rebuilt ask). Net change **zero**. No crawlable internal link was deleted for
layout anywhere. The new hero CTAs are `href="#book"`, in-page anchors, which add
no crawlable link and so cannot mask a loss.

**The resources pages are outside the swept set now.** They are `noindex` and out
of the sitemap the sweep walks (verified in §4.3), so their baseline `11` is a
stale measurement against a URL the sweep no longer reaches. What is asserted
about them is therefore the source-level statement above, not a baseline
comparison: the ToC (the page's only in-body link cluster), the xlsx `download`
anchor and the prose body's own links are all preserved untouched.

---

## §7. 390px overflow

Measured with headless Edge via the repo's existing `puppeteer-core` (no new
dependency), viewport 390x800, offenders enumerated only when
`documentElement.scrollWidth > clientWidth + 1`. Same rule as F9's gate.

Against **3641, the current build (WITHOUT this package's edits)**:

| Route | scrollWidth | clientWidth | Offenders |
|---|---|---|---|
| `/research` | 390 | 390 | 0 |
| `/research/uk-contractor-index` | 390 | 390 | 0 |
| `/research/uk-contractor-insolvency-index` | 390 | 390 | 0 |
| `/research/uk-contractor-survival-index` | 390 | 390 | 0 |
| `/resources/ir35` | 390 | 390 | 0 |

F9's fix holds: the three routes that measured 617 / 603 / 681 before it are at
390 with zero offenders.

**UNVERIFIED: the same measurement against a build carrying this package's
edits.** Agents share this tree's `.next` and the brief forbids `next build` /
`next start`, so it cannot be run here. It is item 1 of the verification list.
What can be asserted statically in the meantime: `ChartDataTable.tsx` has zero
diff, so the class that caused the original overflow has not moved; no new
visually hidden table was added; every wide element in the rebuilt markup is
either inside the existing `overflow-x-auto` wrappers (the SIC / cohort /
procedure tables, all preserved) or inside `siteContainerLg`, which is
`max-w-6xl` with horizontal padding and `min-w-0`; and removing the `max-w-4xl`
clamp can only ever reduce content width pressure at 390px, where neither clamp
nor container is the binding constraint.

---

## §8. Where the brief and the anatomies were wrong

1. **"fixed fee returns 0 on 3641, 1 on 3611."** It returns **17** on 3611. §1.
2. **The contrast defect is 2.52, not 2.38.** 2.38 is that hex on `#fafaf7`; the
   call site's ground is white. §3a. It fails either way.
3. ~~"The kit components the anatomies assume do not exist on this site."~~
   **WITHDRAWN. This claim was WRONG, it was mine, and it changed what I built.
   The anatomies were right and `LeadCTAPanel` exists.**

   What I did: I ran `ls packages/web-shared/components/ui/`, got a single
   `layout-utils.ts`, and concluded the shared package had nothing else. The kit
   does not live under `components/`. It lives under **`design/`**, which has
   eight entries (`blog`, `chrome`, `cn.ts`, `globals-standard.css`, `guards`,
   `layout-utils.ts`, `marketing`, `primitives`), and the two components in
   question are `packages/web-shared/design/marketing/LeadCTAPanel.tsx` and
   `packages/web-shared/design/primitives/FaqSection.tsx`. I had already imported
   `Breadcrumb` from `@accounting-network/web-shared/design/primitives/` in the
   very files I was editing, which should have told me the path I was listing was
   the wrong one. The parallel agent adopted `LeadCTAPanel` from there on four
   glossary and locations routes in this same wave.

   Why it mattered, beyond being a wrong file listing: **on that false premise I
   hand-built the closing asks inline and hand-authored the `data-cta` triples.
   That is exactly the silent substitution the fidelity review exists to catch,
   and it does not show up in a diff** - a hand-rolled panel and an adopted one
   both just look like new markup. The correction is recorded here rather than
   quietly fixed so the next reader inherits the lesson and not the premise.

   **Corrected and rebuilt:** all four research routes now adopt `LeadCTAPanel`
   from the kit, matching the `src/app/locations/page.tsx` call site rather than
   inventing a second convention. See §5a, §5b and §5d.

   Two parts of the original note do still stand: `buildFaqPageJsonLd` genuinely
   does not exist (the export is `buildFaqJsonLd`, which is what these pages
   already call), and `FaqSection` was deliberately NOT adopted, per §5d.
4. **B11's `--muted` UNVERIFIED is resolved and the suspicion was wrong.**
   `--muted` is `var(--ink-soft)` = `#525252`, 7.47 on slate-50. §3c.
5. **Port 3621, which both reference documents quote throughout, is down.** Any
   future package citing a 3621 measurement is citing a server that is not
   answering. Nothing here relies on one.
6. **The brief calls this "phase 3"; the anatomies place these routes in phase 6**
   (packages P6-4 and P6-5). Same routes, same contract, so no work changed. Noted
   so the phase log is not filed under the wrong number.
7. **The anatomy's B8 line reference for the coloured-card `LeadForm` ("line 489")
   was stale** by the time this package ran; the card was at 466 on
   `uk-contractor-index`. Found by shape, not by line number, on all three files.

---

## §9. Reported, not fixed (outside the lease)

- **`src/components/resources/ResourceGate.tsx`** still styles `MiniCapture` with
  `rounded-2xl border-l-4 border-cyan-700 bg-neutral-50`, which is the old radius
  recipe (§A rule 1) and the only remaining `rounded-2xl` on the resources route.
  It is `src/components/resources/`, not `src/components/research/`, so it is
  outside this lease. It is also mounted by
  `resources/CalculatorPageResources.tsx`, so a fix there changes two surfaces at
  once and belongs with whoever holds the capture-surface restyle (DESIGN_DELTA
  §5a lists `ResourceGate` as one of the ten RESTYLE surfaces).
- **`src/components/ui/layout-utils.ts`** still declares `sectionY` =
  `py-16 sm:py-20 lg:py-28`, the pre-standard rhythm (DESIGN_DELTA §3 N5, still
  PENDING owner question 1). The bands in this package use the standard
  `py-12 sm:py-16 lg:py-20` literally. When N5 lands, `sectionY` should be
  changed centrally and these literals collapsed into it.
- **The neutral-vs-slate mix (N1) is now visible inside these files**: the
  contrast fix and every new ring/ground use `slate-*`, because the estate answer
  for fine print is slate-500 and the standard's card edge is `ring-slate-200/70`,
  while the surrounding body copy is still `neutral-*`. That is the N1 decision
  surfacing, not a new inconsistency introduced here, and it resolves the moment
  N1 is answered.
- **`ExampleFigureNote` is still absent from all eight charts and the tables.**
  §0.3 requires it on every visual carrying figures; these figures are sourced
  Companies House / ONS / Insolvency Service counts, and captioning sourced open
  data as "example figures displayed" would be false. This is the §D owner
  conflict the anatomy raised, it is not a builder's call, and it was not
  resolved here.
- **The insolvency page plots its main insolvency series in `--chart-1`, the
  brand cyan.** B9 warns against painting rising insolvencies in the brand
  colour. Changing which series is which colour changes what the chart asserts
  editorially, which is beyond a token re-ramp; the amber and slate bands already
  carry the §0.3 semantics for the secondary series. Flagged for the owner walk,
  not changed.
- **`/resources` (the hub) still 404s** and `/research` still appears in neither
  `navigation[]` nor `footer_links[]`. Both are DESIGN_DELTA §7 IA coverage work,
  and the hub is gated on owner question 6.

---

## §10. Verification list for the serialised build

Run in order. Assert the served title AND the age probe on any server first.

1. **390px overflow, the one thing this package could not measure.**
   Viewport 390x800, enumerate offenders when
   `documentElement.scrollWidth > clientWidth + 1`, over `/research`,
   `/research/uk-contractor-index`, `/research/uk-contractor-insolvency-index`,
   `/research/uk-contractor-survival-index`, `/resources/ir35`,
   `/resources/structure`, `/resources/pay-planning`.
   **Expect scrollWidth 390 and zero offenders on all seven.**
2. **The eight data tables still serve their values.**
   `curl -s <base>/research/uk-contractor-index | grep -o 'class="sr-only"' | wc -l` -> **3**
   `.../uk-contractor-insolvency-index` -> **3**, `.../uk-contractor-survival-index` -> **2**.
   And `grep -o '<td>' | wc -l` on each should be non-zero and equal to the
   pre-edit count, since no row expression changed.
3. **`role="img"` has not come back.** `grep -rn 'role="img"' src` -> **0**.
4. **Charts resolve their tokens rather than falling back.** On a rendered page,
   `getComputedStyle` on a plotted `rect`/`path` fill: expect `rgb(14, 116, 144)`
   for `--chart-1` and `rgb(71, 85, 105)` for `--chart-5`. **If a fill comes back
   as the literal fallback hex that is still correct visually, but if any comes
   back black the `var()` chain did not resolve and that is a real defect.**
5. **`noindex` and the sitemap are unchanged.** Each of the three resource URLs
   serves `<meta name="robots" content="noindex, follow"/>`, and
   `curl -s <base>/sitemap.xml | grep -c "resources/"` -> **0**.
6. **The link floor.** Sweep against `sweep_baseline.json`: `/research` >= 13,
   each research article >= 14. The three resource URLs are out of the swept set;
   check them by hand instead (ToC entries + xlsx anchor + prose links present).
7. **`data-cta` triples.** Each of the four pages serves exactly one
   `data-cta="hero_book"` with its `data-cta-placement="hero"` and
   `data-cta-goal="form"`, **in addition to** the chrome's `header_book` and
   `specialist_widget`, which must both still be present on all seven routes.
8. **Anchors work.** `#book` scrolls to the closing ask on all four research
   routes and on the three resource routes, with the `scroll-mt-24` offset
   clearing the header.
9. **Grounds oscillate.** Walk each research article top to bottom: navy, then
   alternating white / slate-50, with the last band before the footer never dark.
   On `/research/uk-contractor-index` specifically, check it still holds if
   `reform_overlay` is absent from the snapshot.
10. **Figures.** Diff the rendered figure text of all four research routes
    against 3641. **Expect zero differences.** Any difference is a claims defect,
    not a design defect, and goes to the figures ledger rather than being edited.
11. `npx tsc --noEmit` and `npx eslint src/app/research src/app/resources
    src/components/research` -> both clean. **Both already run clean in this
    working tree**, so a failure means someone else's edit collided.
12. **The adopted `LeadCTAPanel` renders correctly on all four research routes.**
    Check three things specifically, because all three were wrong or absent in
    the first pass: (a) **no hydration warning in the console** on any of the
    four, which is what a block element inside the panel's `<p>` footnote would
    produce; (b) `grep` the served HTML for the kit's proof-point markup
    (`class="flex h-12 w-12 ...` with a `Check` icon) -> **zero**, confirming
    `proofPoints={[]}` renders nothing rather than an empty list; (c) the
    footnote's two calculator links show a **visible** focus ring on keyboard
    tab, since this site does not import `globals-standard.css`.

---

## §11. Receipt

- Charts re-ramped: **16 constants across 3 files**, every free-standing hex gone,
  zero SVGs hand-recoloured. Two of the replacements are also contrast fixes
  (cyan-300 1.45 -> cyan-600 3.68; neutral-400 2.52 -> slate-600 7.58, the latter
  holding a text label).
- Contrast fixed: the recorded defect at `research/page.tsx:83`, **2.52 -> 4.76**,
  hand-measured with the slate-500 / slate-400 anchors asserted first. Three
  further failures found and fixed inside the chart components. 11 further ratios
  measured, all passing. `/resources/[topic]` hand-computed, no instrument cited.
- Data tables intact: **8 of 8**, `ChartDataTable.tsx` has zero diff, `sr-only`
  still on the wrapper `<div>`, `role="img"` still zero site-wide, all verified
  against the served build.
- 390px overflow: **zero on all five probed routes on the current build**;
  the post-edit measurement is **UNVERIFIED** and is item 1 of the verification
  list.
- **Wrong in MY first pass, corrected here: I claimed `LeadCTAPanel` did not
  exist and hand-built the closing asks on that premise.** It does exist, at
  `packages/web-shared/design/marketing/LeadCTAPanel.tsx`; I listed
  `components/ui/` instead of `design/`. All four research routes now adopt it,
  matching the locations call site, with `proofPoints` empty, the focus-ring trap
  checked, and the `data-cta` name aligned to the site's one convention. §8.3.
- Wrong in the brief: the age-probe count (17, not 1) and the contrast ratio
  (2.52 on the real ground, not 2.38). Wrong in the anatomies: `--muted` is not a
  whisper-step failure (7.47), the B8 line reference was stale, and port 3621 is
  down. The anatomies were **right** about `LeadCTAPanel`, and I was wrong to
  contradict them.
- Nothing deployed, nothing committed, no git state changed. Scratch files were
  written to the session scratchpad and the one temporary probe copied into the
  repo root was deleted.
