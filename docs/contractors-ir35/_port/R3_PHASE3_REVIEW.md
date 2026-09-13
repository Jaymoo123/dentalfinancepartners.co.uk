# R3: independent adversarial fidelity review, PHASE 3

Reviewer: R3. Date: 2026-09-13. Site: `contractors-ir35`.
Scope: GLOSSARY (index + 38 entries), LOCATIONS (index + 10 cities), RESEARCH
(index + 3 data-asset articles), RESOURCES (3 gated topic pages). Nothing else.
Standard: `docs/property/DESIGN_SYSTEM.md` §0 + `docs/contractors-ir35/DESIGN_DELTA.md`.
Receipts under falsification: `_port/P3-1_GLOSSARY_LOCATIONS.md`, `_port/P3-2_RESEARCH_RESOURCES.md`.

**I built none of this. Nothing was changed. No git state-changing command was run.
No server was started, restarted or killed. `next build` was not run. One file
written: this one.**

---

## VERDICT: FAITHFUL-WITH-GAPS

The phase-3 work is genuine adoption, not silent substitution. Every one of the
ten claims put to me was tested against the rendered build, and nine hold in
full. The single substitution the brief was hunting for was already found and
self-reported by the P3-2 builder (`packages/web-shared` "empty", four
hand-built closing asks) and is **confirmed corrected in the rendered output**:
`LeadCTAPanel` is imported from `design/marketing/` at 8 of 8 closing asks in
scope, and no fifth hand-rolled panel exists anywhere in the route families.

Gaps: **2 medium, 3 low. 0 high.**
All five sit on the RESOURCES family or on shared constants the phase-3 leases
explicitly did not hold, and four of the five were disclosed by the builders
themselves rather than hidden.

---

## 1. Instrument identity, asserted before any number below

```
curl -s http://localhost:3651/ | grep -o "<title>[^<]*"   -> Specialist Contractor Accountants | IR35 Advice UK
curl -s http://localhost:3611/ | grep -o "<title>[^<]*"   -> Specialist Contractor Accountants | IR35 Advice UK
curl -s http://localhost:3651/ | grep -o -i "fixed[- ]fee" | wc -l   -> 0    (current build)
curl -s http://localhost:3611/ | grep -o -i "fixed[- ]fee" | wc -l   -> 17   (pre-port 18b4f25f)
```

Both re-asserted by me. The brief's hyphen-tolerant probe is correct as written.
Contrast method self-tested before any ratio was trusted:
`slate-500 #64748b on white = 4.76`, `slate-400 #94a3b8 on white = 2.56`,
both reproduced exactly; the script asserts and exits on mismatch.

---

## 2. The ten claims, tested

### Claim 1 -- corpus reachability in SERVER HTML. **TRUE, and now measured rather than argued.**

| Family | On disk | Unique entry hrefs in 3651 server HTML |
|---|---|---|
| `/glossary` -> `/glossary/<slug>` | 38 | **38** |
| `/locations` -> `/locations/<slug>` | 10 | **10** |

The builder proved this structurally and labelled the after-state "static proof".
It is now a served measurement. No slice, no client-side reveal, no pagination.

### Claim 2 -- the 8 chart data tables. **TRUE on all three legs.**

- `grep -rn 'role="img"' src` -> **0** site-wide. Pre-port (3611) the same three
  routes served **3 / 3 / 2 = 8** `role="img"` instances and **zero `<td>`**.
- `<div class="sr-only">` per route on 3651: **3 / 3 / 2 = 8**, each with a
  `<caption>`, `<th scope="col">`, `<th scope="row">`.
- The values reach the real accessibility tree, not just the HTML. Chromium
  accessibility snapshot, `interestingOnly:false`:
  `uk-contractor-index` 5 tables / **346 cells**, `uk-contractor-survival-index`
  4 / **64**, `uk-contractor-insolvency-index` 4 / **562**.
- `sr-only` is on the **wrapper `<div>`**, never the `<table>`:
  `grep -o '<table class="sr-only"'` -> **0** on all three;
  `grep -o '<div class="sr-only"><table>'` matches. `ChartDataTable.tsx:32` is
  `<div className="sr-only">` with a bare `<table>` inside, and the mechanism is
  recorded in the file's own comment.
- The 9th instance is `calculators/premium/PremiumBarChart.tsx`, phase 4, out of
  scope, untouched.

### Claim 3 -- zero horizontal overflow at 390px. **TRUE, and wider than claimed.**

Headless Edge via the repo's existing `puppeteer-core`, viewport 390x800,
offenders enumerated when `documentElement.scrollWidth > clientWidth + 1`.
**All eleven scope routes: scrollWidth 390, clientWidth 390, 0 offenders.**
(`/glossary`, `/glossary/ir35`, `/locations`, `/locations/london`, `/research`,
the three research articles, and all three `/resources/*`.)
This closes P3-2 §7's item-1 UNVERIFIED, which was the package's own largest
open risk.

### Claim 4 -- 16 chart colour constants read from tokens. **TRUE, and the tokens resolve.**

`grep -rn '#[0-9a-fA-F]\{6\}' src/components/research/*.tsx` returns **16 lines,
every one of them a `var(--token, #fallback)` second argument or an explanatory
comment. Zero free-standing hexes.** Count by file: ContractorIndex 6,
ContractorInsolvency 6, Survival 4 = 16.

Resolution verified by `getComputedStyle` on painted SVG geometry, so this is
not a source read:

| Token | Computed fill/stroke | Expected |
|---|---|---|
| `--chart-1` | `rgb(14, 116, 144)` | cyan-700 |
| `--chart-3` | `rgb(8, 145, 178)` | cyan-600 |
| `--chart-5` | `rgb(71, 85, 105)` | slate-600 |
| `--highlight` | `rgb(180, 83, 9)` | amber-700 |
| `--hairline` | `rgb(229, 229, 229)` | neutral-200 |

**Nothing fell back to black.** The one `fill=rgb(0,0,0)` reading is on `<line>`
elements, which have no fill geometry, so it paints nothing.
`--chart-3` is confirmed NOT the natural ramp step: cyan-400 `#22d3ee` measures
**1.81** on white (I measured it), cyan-600 `#0891b2` measures **3.68** and is
used for fills only, whose values are direct-labelled and carried in the data
tables. `--chart-5` (slate-600, 7.58) is what holds every chart text label,
including the "All industries" comparator that was the 2.52 failure.

### Claim 5 -- resources `noindex, follow` and absent from the sitemap. **TRUE, with canonicals.**

All three serve `<meta name="robots" content="noindex, follow"/>`.
`curl -s /sitemap.xml | grep -c "resources/"` -> **0**.
Canonical self-references present and correct on all three:
`https://www.contractortaxaccountants.co.uk/resources/{ir35,structure,pay-planning}`.
The fix holds. This is not a defect.

### Claim 6 -- `LeadCTAPanel` the single closing-ask convention. **TRUE.**

- `proofPoints={[]}` at **8 of 8 scope call sites** (`glossary/page.tsx:159`,
  `glossary/[slug]/page.tsx:191`, `locations/page.tsx:222`,
  `locations/[slug]/page.tsx:349`, `research/page.tsx:112`, and the three
  articles at `:504`, `:423`, `:412`). Estate-wide the count is 17 of 17
  `LeadCTAPanel` call sites, all empty.
- Property's two banned strings reached **no user-facing surface**:
  `grep -rniE "fixed fees, quoted upfront|24-hour response|usually the same working day" src`
  returns 2 hits, **both code comments** in `calculators/` naming the ban.
  Served check on scope routes for `fixed[- ]fee|24[- ]hour|chartered|same working day`:
  **no output on any route.**
- **Every `footnote` is inline, no `<div>` anywhere.** Three research articles
  pass `<span className="flex flex-wrap ...">`; the four glossary/locations
  footnotes pass a bare fragment containing `<Link>` only. No block element
  enters `PanelBody`'s `<p>`. The hydration-mismatch trap is closed.
- `/resources/[topic]` deliberately does not adopt the panel (capture-surface
  count, DESIGN_DELTA §5a). See gap M1 for the part of that decision that does
  not follow.

### Claim 7 -- `FaqSection` not adopted. **TRUE substantively; the receipt's evidence line is wrong.**

Zero imports and zero references to `FaqSection` anywhere in the phase-3 lease.
Zero `@radix-ui` imports in scope. The correctness that matters:
**every answer the JSON-LD asserts is unconditionally present in server HTML.**
Parsed all `application/ld+json` blocks on five routes; every block parses, and
every `acceptedAnswer.text` was located in the served markup:

| Route | JSON-LD blocks | Answers asserted | Found in HTML |
|---|---|---|---|
| `/research/uk-contractor-index` | 6 | 5 | **5** |
| `/research/uk-contractor-insolvency-index` | 6 | 5 | **5** |
| `/research/uk-contractor-survival-index` | 6 | 5 | **5** |
| `/locations/london` | 6 | 6 | **6** |
| `/glossary/ir35` | 5 | 0 (no FAQ) | n/a |

### Claim 8 -- `data-cta` triples, diffed rather than counted. **TRUE. Nothing lost, three names added.**

Rendered triples, 3611 vs 3651, every scope route:

| Route family | 3611 (pre-port) | 3651 (now) |
|---|---|---|
| glossary x2, locations x2, research x4 | `data-cta="specialist_widget"` | `specialist_widget` + `header_book`/`header`/`contact` + **`hero_book`/`hero`/`form`** |
| resources x3 | `data-cta="specialist_widget"` | `specialist_widget` + `header_book`/`header`/`contact` |

Attribute **names** are `data-cta`, `data-cta-placement`, `data-cta-goal` on both
builds. `specialist_widget` survives everywhere with its live shape (no placement,
no goal) unchanged. Nothing was renamed, reordered, re-placed or re-goaled; no
`vw_cta_performance` row can go quietly missing. The resources rows are gap M1.

### Claim 9 -- contrast, re-measured by hand against painted pixels. **TRUE. Zero text failures in scope.**

Method: enumerate every element owning a visible text node on all eleven routes,
read computed `color`, composite the real ground by walking ancestors, and
convert through a canvas so Tailwind v4's `oklch()` values resolve to painted
sRGB rather than being skipped. **My first pass reported 100 failures and was
wrong**: a naive `rgba()` regex silently dropped every `oklch()` background and
scored white-on-navy heroes as 1.00. Recorded because that is exactly the
automated-tool failure DESIGN_DELTA §6 H2 warns about, and it fires on far more
than the 13 `var()` files.

Corrected run, 1280x1000, 11 routes, **1,326 text elements measured, 0 below 4.5**.
The one flagged item is an instrument artefact, not a defect: the footer credit
"Built by Double Wired Creative" uses `bg-clip-text`, so its computed `color` is
transparent. Hand-measured against its actual gradient stops on slate-900:
`#818cf8` = **5.98**, `#fb923c` = **7.89**. Both pass. Footer chrome, phase 1.

The two recorded fixes are confirmed at the pixel:

| Defect | Pre-port evidence | Now |
|---|---|---|
| `bg-cyan-600` pill under a white label, both glossary heroes | `grep -o "bg-cyan-600"` on 3611 `/glossary` -> **2** | **0** on all nine non-resource scope routes. Replaced by a hand-rolled mono eyebrow in `text-primary-400` = cyan-400, measured **10.96** on `#0a0a0a` |
| chart text label at 2.52 (neutral-400) | `SurvivalIndexCharts` "All industries" | computed `text:fill=rgb(71,85,105)` = slate-600, **7.58** |

The `.eyebrow` avoidance is real and correct: `globals.css:211` is unlayered and
pins `color: var(--accent)` (3.69 on the hero ground), which no Tailwind utility
can beat. The builder hand-rolled the utilities instead. Verified in source at
`glossary/[slug]/page.tsx:104` and in the rendered colour.

Footnote links resolve `text-primary-600` to cyan-700 `#0e7490` on the panel's
slate-100 card = **4.89**, above the floor. `primary-600` is correctly bound one
step darker per DESIGN_DELTA §1; true cyan-600 (3.68) is nowhere in a text or
ground role in this scope.

### Claim 10 -- one radius. **MOSTLY TRUE. One real violation, on all three resources pages.**

`grep -rn "rounded-2xl"` over the whole phase-3 source lease: **zero.**
Served `rounded-2xl` count:

```
/glossary 0   /glossary/ir35 0   /locations 0   /locations/london 0
/research 0   /research/uk-contractor-index 0   /research/uk-contractor-insolvency-index 0
/research/uk-contractor-survival-index 0
/resources/ir35 1   /resources/structure 1   /resources/pay-planning 1
```

See gap M2.

---

## 3. Gaps, by severity

### MEDIUM

**M1. The three `/resources/*` pages have no hero primary CTA, and their only
capture surface emits no `data-cta` triple.**
File: `src/app/resources/[topic]/page.tsx` (hero band) and
`src/components/resources/ResourceGate.tsx`.
Standard: §0.5 -- "The hero carries a primary CTA to the on-page form. A page a
reader can scroll to the bottom of without meeting an ask is not finished.
Research and reference surfaces are the ones this keeps happening to."
Renders instead: `curl -s /resources/ir35 | grep -o 'href="#book"' | wc -l` -> **0**,
on all three. The anchor target already exists and is correctly built
(`<section id="book" class="scroll-mt-24 bg-slate-50 ...">`), so the only missing
piece is the hero link. Served `data-cta` on these routes is chrome only
(`header_book`, `specialist_widget`); the page's own ask is unmeasured, which is
the §0.5 "a funnel row goes quietly missing" failure applied to the one surface
with a standing zero-lead watch (`formId="resource_block"`).
P3-2 §5c justifies not adding `LeadCTAPanel` here, and that reasoning is sound
(it would make an eleventh capture surface, §4.6.6 owner gate). **That argument
does not reach the hero anchor**: an `href="#book"` to the capture surface the
page already has adds no surface at all. The gap is the anchor, not the panel.
Fix: one `<Link href="#book" className={btnPrimary} data-cta="hero_book"
data-cta-placement="hero" data-cta-goal="form">` in the navy hero, matching the
eight sibling routes.

**M2. `rounded-2xl border-l-4` renders on all three `/resources/*` pages.**
File: `src/components/resources/ResourceGate.tsx` (the `MiniCapture` frame),
served as `class="not-prose my-10 rounded-2xl border-l-4 border-cyan-700 bg-neutral-50 p-6 sm:p-8"`.
Standard: §0.1 -- "Radii and edges are `rounded-xl` with `ring-1 ring-slate-200/70`.
`rounded-2xl` and `border border-slate-200` are the pre-redesign recipe."
Renders instead: the pre-redesign recipe, and it is the **last band before the
footer** on all three routes, so it is also the most visible element on the page.
P3-2 §9 disclosed this honestly as outside its lease (it lives under
`components/resources/`, not `components/research/`, and is shared with
`CalculatorPageResources.tsx`). It is still an unmet §0.1 in a phase-3 route
family, and no other phase-3 package owns it. Fix belongs with the capture-surface
restyle (DESIGN_DELTA §5a lists `ResourceGate` as one of the ten RESTYLE surfaces),
but it should not close phase 3 unlisted.

### LOW

**L1. Two button dialects inside one phase.**
File: `src/components/ui/layout-utils.ts:17` (`btnPrimary`), consumed by
`glossary/page.tsx`, `glossary/[slug]/page.tsx:99`, `locations/page.tsx`,
`locations/[slug]/page.tsx`.
Standard box (DESIGN_DELTA §1): `min-h-12 min-w-[10rem] px-8 py-3.5 text-base
font-bold rounded-xl`. Rendered on the four glossary/locations heroes:
`inline-flex min-h-12 ... bg-cyan-700 px-7 py-3.5 text-sm font-medium` with a
locally appended `rounded-xl`. The four research heroes render the full standard
box (`min-w-[10rem] ... text-base font-bold`, confirmed in served HTML). Same
phase, same convention, two visibly different buttons.
Disclosed in P3-1 §6. Closes when the button constants are ported; the four local
`rounded-xl` suffixes then become redundant and should be removed in the same edit.

**L2. `ExampleFigureNote` is absent from all 8 charts, both key-facts panels and
every data table in scope.**
Standard: §0.3 -- "`ExampleFigureNote` goes on every visual carrying figures,
including statutory ones. Owner decision, do not re-split it into
illustrative-only." `grep -rn "ExampleFigureNote"` over the phase-3 lease -> 0.
P3-2 §9 raises the genuine conflict: these figures are sourced Companies House /
ONS / Insolvency Service counts, and captioning sourced open data "Example
figures displayed" would be a false statement. I agree this is not a builder's
call and it was correctly escalated rather than guessed. Recording it so the
owner walk sees an open §0.3 non-conformance rather than a silent omission.

**L3. The insolvency page plots its rising insolvency series in `--chart-1`, the
brand cyan.** `ContractorInsolvencyCharts.tsx`. §0.3 -- "Colour is meaning, never
decoration. Amber where a duty bites." Painting a rising harm in the firm's own
brand colour is at best neutral-coded. Flagged by P3-2 §9 and not changed, on the
correct ground that re-assigning series colours changes what the chart asserts
editorially. Confirmed in the computed fills: `path:fill=rgb(14,116,144)` carries
the insolvency series, `rgb(180,83,9)` and `rgb(71,85,105)` carry the secondaries.

---

## 4. What I checked and found nothing

Stated separately from "not checked", per the brief.

- **No hand-rolled fifth closing-ask panel anywhere in scope.** All 8 scope asks
  import `LeadCTAPanel` from `@accounting-network/web-shared/design/marketing/`.
  The silent substitution the brief was hunting for is confirmed corrected, not
  merely claimed corrected.
- **No link deleted for layout.** Unique internal `href="/..."` per route,
  3611 -> 3651: `/glossary` 50->53, `/glossary/ir35` 25->28, `/locations` 22->25,
  `/locations/london` 19->25, `/research` 15->18, each research article 16->19,
  `/resources/ir35` 13->16. Every route is up. Carve-out 5 holds.
- **No published figure changed.** Rendered numeric-token multiset, 3611 vs 3651,
  with the new `sr-only` tables stripped so they do not mask a change: the only
  differences on each research article are `24` (pre-port only, from the removed
  "24-hour" promise copy) and `35` x3 (new, from "IR35" in the new ask copy).
  **Zero figures moved.**
- **No em-dash** in served copy on any of the eleven routes (0 on all).
- **No fee, turnaround, qualification or regulator claim** in served copy on the
  probed routes.
- **Grounds oscillate and navy never touches navy.** Last band before the footer,
  all eleven routes: `bg-slate-50` or `bg-white`, never dark. Research articles
  walk navy -> white -> slate-50 -> white -> slate-50 -> white -> slate-50 ->
  ask(white) -> FAQ(slate-50) -> footer, which is the canonical panel/FAQ/footer
  tail. No two touching bands share a ground.
- **`id="book"` present exactly once** on all eleven routes, each with
  `scroll-mt-24`.
- **No Radix, no interruptive surface added.** Zero `@radix-ui` imports in scope;
  no modal, banner, toast or popup in the served markup of any scope route.

## 5. What I did NOT check

- **Keyboard focus rings by actually tabbing.** P3-1 rows 21 and P3-2 §10.12(c)
  remain open. I read the classes (explicit `focus-visible:outline-2
  focus-visible:outline-cyan-700` on the footnote links, real rings on the
  location cards) and confirmed this site does not import `globals-standard.css`,
  so the delegated-ring trap could still fire on anything that relies on it. I
  did not drive a keyboard.
- **Hydration warnings in a live console.** The structural cause is closed (no
  block element inside `PanelBody`'s `<p>` at any of the 8 call sites), but I did
  not read a browser console on a hydrated page.
- **Scroll behaviour of `#book`** under the sticky header. `scroll-mt-24` is
  present on every anchor; I did not click one.
- **768 / 1024 / 1440 widths.** I measured 390 (the regression width the brief
  named) and 1280. The other three §0.8 widths are unmeasured.
- **`/resources/*` prose-body internal links against a baseline.** These routes
  are out of the swept set now that they are `noindex`; I confirmed the count
  rose 13->16 against 3611, which is a stronger check than the stale baseline,
  but I did not enumerate the ToC by hand.

---

## 6. Builder claims that were false

Only one, and it is evidential rather than substantive.

1. **P3-2 §5d and §6: "`grep -rn "FaqSection" <lease>` returns 3 hits, all of them
   the comment naming the ban, zero imports."** The lease returns **0 hits**. The
   three comments naming the ban live in `src/app/calculators/[slug]/page.tsx:41`,
   `src/app/for/[slug]/page.tsx:189` and `src/app/page.tsx:469`, plus a fourth in
   `BlogPostRenderer.tsx:384` -- all **outside** the phase-3 lease. The claim the
   evidence was offered for ("`FaqSection` not adopted, zero imports") is **true**;
   the grep quoted to support it was run over a wider path than the stated lease.

Everything else in both receipts that fell in my scope reproduced. Specifically
confirmed true rather than taken on trust: the 38/10 corpus counts, the 8 data
tables and the `sr-only`-on-wrapper rule, `role="img"` at 0, the 16 tokenised
chart constants and their runtime resolution, the `noindex`/sitemap state, the
`proofPoints={[]}` count, the `data-cta` triple preservation, both contrast fixes,
and the zero-`rounded-2xl` result everywhere except the disclosed `ResourceGate`.

P3-2's own withdrawn §8.3 -- the `packages/web-shared` "empty" conclusion and the
four hand-built closing asks -- is confirmed genuinely corrected in the rendered
build, not just retracted in prose.

## 7. What was wrong in this brief

1. **"Nine chart instances had `role="img"`."** In phase-3 scope there were
   **eight** (3 + 3 + 2, measured on 3611). The ninth is
   `calculators/premium/PremiumBarChart.tsx`, which is phase 4 and outside this
   review. The brief's own "8 chart data tables" figure is the correct one; the
   nine-instance number silently includes a route family it then excludes.
2. **"Phase 3."** `PHASE_PLAN.md` §C.1 places `/locations` and `/locations/[slug]`
   in **phase 5** (packages P5-6 and P5-8), and `P3_ROUTE_ANATOMIES.md` places the
   research hub, the three articles and `/resources/[topic]` in **phase 6**
   (P6-4, P6-5). Both builders flagged this independently. Same routes, same
   contract, so no work changed, but the phase ledger is out by more than one
   family and P5-8 (authoring the 10 location copy blocks) remains untouched.
3. **The `fixed[- ]fee` probe is correct as given** (0 vs 17) and the hyphen
   warning is well placed. Earlier receipts quoting "1 on 3611" were wrong, not
   this brief.
4. Nothing else in the brief was contradicted by measurement. Claim 9's anchor
   values, the `--chart-3` 1.81 note, the `primary-600`/cyan-700 5.36 binding and
   the `display:table` overflow mechanism all reproduced exactly.

---

## 8. Receipt

- **Verdict: FAITHFUL-WITH-GAPS.**
- **Gaps: 0 high, 2 medium (M1 resources hero CTA + unmeasured funnel, M2
  `rounded-2xl` on all three resources pages), 3 low (L1 two button dialects,
  L2 `ExampleFigureNote` absent, L3 brand-coloured insolvency series).**
- **Builder claims falsified: 1** (P3-2's `FaqSection` grep evidence; the
  substantive claim holds).
- **Brief errors: 2** (nine vs eight `role="img"` instances; the phase number for
  both route families).
- **Previously UNVERIFIED, now verified by me:** 390px overflow on all eleven
  routes (0 offenders), the 38/10 served corpus counts, chart-token runtime
  resolution, accessibility-tree cell counts, JSON-LD answer presence, the
  rendered `data-cta` diff against pre-port, and a full painted-pixel contrast
  sweep of 1,326 text elements.
- Read-only. Nothing changed. One file written.
