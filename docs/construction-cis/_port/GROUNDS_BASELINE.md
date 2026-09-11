# TRADE (construction-cis) SECTION-GROUNDS BASELINE

Authoritative pre-Phase-3 measurement of DESIGN_SYSTEM section 9 ("consecutive bands must not
share a ground", "navy must never touch navy") across the whole site. Written to give Phase 3 a
closure gate it can actually pass or fail. Read-only exercise: no code was edited to produce it.

> **UPDATE 2026-09-11, later the same day. THE INSTRUMENT IS NOW FIXED, AND ITS OWN SUMMARY LINE
> IS THE GATE.** Both defects this file found (section 2) were confirmed against the source and
> repaired in `docs/_engines/instruments/browser_check.mjs`. The whole site was then re-crawled,
> 246 of 246 routes, with the fixed instrument. It reports:
>
> ```
> SECTION GROUNDS, 246 route(s) measured
>   dark band touching the footer: 29  [/locations 25, /cis-refund 1, /gross-payment-status 1,
>                                       /cis-invoice-template 1,
>                                       /cis-payment-deduction-statement-template 1]
>   adjacent bands sharing a ground: 48  [/for 46, / 1, /services 1]
> ```
>
> **29 and 48, route for route and family for family, identical to the manual recompute below.**
> Two independent methods, one written before the fix and one after, agree exactly, which is the
> strongest evidence either number has. Sections 3 to 6 stand unchanged and are now confirmed
> rather than merely computed.
>
> What changed in the instrument:
> - **D1 fixed.** `isDark` no longer parses colour at all. It paints the computed value onto the
>   1x1 canvas the contrast path already uses and reads the pixel back, so the browser does the
>   conversion and every CSS colour syntax resolves correctly, `oklch()` included.
> - **D2 fixed.** The band selector is now
>   `:scope > section, article, aside, header, footer, div[class*='bg-']` under `<main>`.
>   `<article>` is a band, so `/glossary/[slug]` reports two bands and a white tail.
> - **Alpha is now honest.** The old `opaque()` only string-matched the literal
>   `rgba(0, 0, 0, 0)`, so any other translucent ground passed as solid. The painted alpha is
>   checked against the same `>= 250` threshold the contrast paint stack uses.
> - **A grounds self-test was added**, in the shape of the existing contrast self-test: a known
>   light and a known dark value in BOTH `rgb()` and `oklch()` form, asserted in-page, and the
>   mode exits 2 and reports nothing if any of the four is misclassified. It prints on every
>   `--grounds` run:
>   `rgb(15, 23, 42) lum=0.0088 dark; rgb(255, 255, 255) lum=1 light;`
>   `oklch(0.208 0.042 265.755) lum=0.0089 dark; oklch(0.985 0.001 106.423) lum=0.9553 light`.
>   The 0.18 luminance threshold is unchanged in value and intent: this estate's dark grounds
>   measure 0.0072 to 0.0218 and its light ones 0.9541 to 1.0000, a gap of a factor of 44, so the
>   figure only has to fall between two well-separated clusters.
>
> **Section 7's manual recompute is no longer the gate and should not be run.** The rewritten
> gate below uses the instrument's own summary line. Section 2 is kept in full as the incident
> record: a quietly corrected number teaches nothing.
>
> **Two residual blind spots, neither affecting 29 or 48.**
> 1. **12 blog routes were served a broken build mid-crawl and are UNMEASURED in this run, not
>    proven clean.** Another agent replaced the build under the running server at route ~234 of
>    246; those 12 returned `ChunkLoadError` and a stylesheet served as `text/plain`, so they
>    rendered unstyled and reported zero bands. They are
>    `/blog/cis-basics/{how-to-register-for-cis, switching-cis-accountant-guide,
>    what-construction-work-is-not-cis, what-is-a-cis-accountant, what-is-cis}`,
>    `/blog/software-and-tools/{quickbooks-cis-guide, sage-cis-guide,
>    spreadsheets-vs-accounting-software-cis, xero-cis-guide}`,
>    `/blog/vat-and-mtd/{vat-reverse-charge-construction, vat-reverse-charge-for-cis-contractors,
>    vat-reverse-charge-for-cis-subcontractors}`. A re-run was attempted and the build was still
>    broken; the server was deliberately NOT restarted. The earlier crawl in section 1 measured
>    all 91 blog routes on a good build and found `/blog` in neither metric, so the combined
>    evidence covers them, but this run alone does not.
> 2. **`/resources/cis-refund`, `/resources/cis-vs-paye` and `/resources/gross-payment-status`
>    report ZERO bands on a GOOD build** (footer ground resolved correctly, no console noise), and
>    did so under the old instrument too. Their served HTML has `<main><section class="... bg-
>    neutral-900">` as a direct child, which the selector should match, so the cause is not the
>    selector as written and is not established. Zero bands means UNMEASURED, not clean. It cannot
>    put them into either metric, but the gate is blind on 3 of 246 routes until someone diagnoses
>    it. Owner: whoever owns `browser_check.mjs`, not Phase 3.

## 1. Provenance, so this can be reproduced rather than trusted

| | |
|---|---|
| Date | 2026-09-11 |
| Build under test | production server on `http://localhost:3257`, built from the post-Phase-2 tree |
| Commit | `6575bbb69855d5f1ec3f5a229cea1ec0c47b315f` (feat(trade): design port phase 2) |
| Working-tree delta not in the build | `construction-cis/web/src/components/layout/SiteFooter.tsx` (+15, uncommitted, another agent's live edit). Nothing else under `construction-cis/` is dirty. |
| Site assertion | `curl -s http://localhost:3257/ \| grep -o '<title>[^<]*</title>'` returned `CIS Accountants &amp; Construction Tax Specialists \| UK`. Asserted on `/` because `/blog` carries a different title. |
| Routes measured | **246 of 246** in the sitemap (`--sample=200` lifts the blog-article sampler so all 91 blog URLs are visited) |
| Widths | **1440 only** (`--widths=1440`). Deliberate: a ground is a background colour, it does not change with viewport, and the instrument itself keys grounds one-per-route. One width cut the crawl from four passes to one. |
| Footer ground measured | `oklch(0.208 0.042 265.755)` = `#0f172b` = slate-900, i.e. the Phase 1 flip is live in this build |

Command run:

```
MSYS_NO_PATHCONV=1 node docs/_engines/instruments/browser_check.mjs --site=construction-cis \
  --base=http://localhost:3257 --grounds --sample=200 --widths=1440 --out=<scratch>/grounds_cis.json
```

Exit 0. Instrument self-test passed (slate-500/white 4.76, slate-400/white 2.56), 0 unparseable
colours.

## 2. TWO DEFECTS IN THE INSTRUMENT, both found here, both affecting the tracked number

**BOTH FIXED 2026-09-11, see the update at the top. Kept verbatim as the incident record.**

The raw `--grounds` summary from this run is:

```
SECTION GROUNDS, 246 route(s) measured
  dark band touching the footer: 81  [/glossary 51, /locations 26, /cis-refund 1,
                                      /gross-payment-status 1, /cis-invoice-template 1,
                                      /cis-payment-deduction-statement-template 1]
  adjacent bands sharing a ground: 48  [/for 46, / 1, /services 1]
```

Neither line can be reported as-is.

**D1. `isDark` cannot read `oklch()`.** `browser_check.mjs:338-345` derives luminance with
`c.match(/\d+(\.\d+)?/g)` and divides the first three numbers by 255. `getComputedStyle` returns
Tailwind 4 grounds verbatim as `oklch(L C H)`, so `oklch(0.985 0.001 106.423)` (stone-50, `#fafaf9`,
luminance 0.956) is read as R=0.985/255 and scored luminance ~0.000: **every `oklch()` ground is
classified dark, whatever its lightness.** This is the same class of failure that produced the
discredited count of 102 (a parser that oklch defeated), surviving inside the committed instrument
that was written to replace it. It puts `/glossary` and `/locations` (the two index pages, whose
tails are stone-50) into the raw 81, which is why the raw number is 81 and not 79.

**D2. `bandsOf` does not see `<article>`.** `browser_check.mjs:325` selects
`:scope > section, :scope > div[class*='bg-']` under `<main>`. `/glossary/[slug]` renders
`<section class="bg-neutral-900">` then `<article class="bg-white py-12 sm:py-16">`, and the article
is the whole rest of the page. The selector matches only the hero, so `bands` for every glossary term
is a **single** entry, `lastBand` is the navy hero, and the route is scored dark-on-dark while the
actual band touching the footer is white. Verified on `/glossary/cis` and `/glossary/utr` by reading
the served HTML: `</section>...<article class="bg-white py-12 sm:py-16">...</article></main>`, and
confirmed uniform across the family, all 50 routes report `bands.length == 1`.

Both were corrected in post-processing, not in code (this task is read-only on code). The recompute
converts oklch to sRGB properly and is reproduced in section 7 so the gate does not depend on a
throwaway script again.

## 3. The authoritative counts

### 3.1 Dark band touching the footer: **29**, not 79

| Family | Routes in breach | Was recorded in DESIGN_DELTA section 3a |
|---|---|---|
| `/locations/[slug]` | **25** | 25, correct |
| `/cis-refund`, `/gross-payment-status`, `/cis-invoice-template`, `/cis-payment-deduction-statement-template` | **4** | 4, correct |
| `/glossary/[slug]` | **0** | 50, **WRONG** (defect D2) |
| `/glossary`, `/locations` index pages | 0 | not listed, and correctly so (they were in the raw 81 via defect D1) |
| **Total** | **29** | 79 |

**79 was not right.** 29 of it is real, 50 of it is `/glossary/[slug]` and is an artefact of the
instrument not treating `<article>` as a band. The family split was also wrong in the same place:
glossary 50 is zero, locations 25 stands, the four standalone routes stand.

`/blog` and `/resources` being absent, which the 2026-09-11 correction established, is confirmed
here: neither appears in either metric at any threshold.

**Per-route, `/locations` (25):**
`/locations/belfast` `/locations/birmingham` `/locations/bradford` `/locations/bristol`
`/locations/cardiff` `/locations/coventry` `/locations/derby` `/locations/edinburgh`
`/locations/glasgow` `/locations/hull` `/locations/leeds` `/locations/leicester`
`/locations/liverpool` `/locations/london` `/locations/manchester` `/locations/newcastle`
`/locations/nottingham` `/locations/plymouth` `/locations/portsmouth` `/locations/reading`
`/locations/sheffield` `/locations/southampton` `/locations/stoke-on-trent` `/locations/sunderland`
`/locations/wolverhampton`

**Per-route, standalone (4):**
`/cis-refund` `/gross-payment-status` `/cis-invoice-template`
`/cis-payment-deduction-statement-template`

### 3.2 Adjacent bands sharing a ground: **48**

| Family | Routes | Shared ground |
|---|---|---|
| `/for/[slug]` | 45 | `rgb(255,255,255)` white on white |
| `/for` (index) | 1 | `oklch(0.205 0 0)` = `#171717` neutral-900, **navy on navy inside the page** |
| `/` | 1 | `rgb(250,250,249)` `#fafaf9` on `#fafaf9` |
| `/services` | 1 | `rgb(255,255,255)` white on white |
| **Total** | **48** | |

**Per-route, `/for` (46):** `/for` `/for/plumbers` `/for/electricians` `/for/joiners`
`/for/groundworkers` `/for/roofers` `/for/builders` `/for/gas-engineers` `/for/painters-decorators`
`/for/scaffolders` `/for/civil-engineers` `/for/bricklayers` `/for/plasterers` `/for/labourers`
`/for/demolition-contractors` `/for/dryliners` `/for/carpenters` `/for/tilers` `/for/glaziers`
`/for/steel-fixers` `/for/ceiling-fixers` `/for/flooring-contractors` `/for/heating-engineers`
`/for/kitchen-fitters` `/for/bathroom-fitters` `/for/window-installers` `/for/insulation-installers`
`/for/steel-erectors` `/for/shopfitters` `/for/fencing-contractors` `/for/landscapers`
`/for/plant-operators` `/for/drainage-contractors` `/for/cladding-installers`
`/for/paving-contractors` `/for/welder-fabricators` `/for/main-contractors`
`/for/subcontracting-limited-companies` `/for/property-developers` `/for/housebuilders`
`/for/labour-agencies` `/for/civil-engineering-firms` `/for/mechanical-electrical-contractors`
`/for/maintenance-and-fm-companies` `/for/plant-hire-companies` `/for/multi-trade-building-firms`

**Per-route, remainder (2):** `/` `/services`

No route appears in both metrics.

## 4. Per-family diagnosis, and the fix

### `/locations/[slug]`, 25 routes, REAL
- Last band: `oklch(0.205 0 0)` = `#171717`, neutral-900. Band signature is identical on all 25
  routes (7 bands each), so the family is one shape.
- Rendered by: the closing contact CTA, `construction-cis/web/src/app/locations/[slug]/page.tsx:275`,
  `<section className="bg-neutral-900 py-12 sm:py-16 lg:py-20">`.
- Fix: give the page a light tail after that section, or move the CTA off a dark ground.
- **One template edit fixes all 25. Verified**: `locations/[slug]/` holds one `page.tsx` plus
  `data.ts`; the 25 cities are one dynamic route with no per-city branch on the closing section.

### `/glossary/[slug]`, 50 routes, NOT IN BREACH
- Last real band: `rgb(255,255,255)` white, the definition body,
  `construction-cis/web/src/app/glossary/[slug]/page.tsx:94`, `<article className="bg-white py-12 sm:py-16">`,
  which runs to the end of `<main>` and gives the footer the light break section 9 requires.
- The navy the instrument reported is the hero at line 71, three screens up the page.
- **No fix needed and none should be written.** If Phase 3 changes this family it should keep the
  light tail, and should note that turning the `<article>` into a `<section>` would make this family
  visible to the instrument for the first time.

### The four standalone routes, REAL, one edit each
| Route | File and line | Last band |
|---|---|---|
| `/cis-refund` | `construction-cis/web/src/app/cis-refund/page.tsx:216` | `bg-[#1e293b]` |
| `/gross-payment-status` | `construction-cis/web/src/app/gross-payment-status/page.tsx:226` | `bg-[#1e293b]` |
| `/cis-invoice-template` | `construction-cis/web/src/app/cis-invoice-template/page.tsx:239` | `bg-[#1e293b]` |
| `/cis-payment-deduction-statement-template` | `construction-cis/web/src/app/cis-payment-deduction-statement-template/page.tsx:220` | `bg-[#1e293b]` |

Four separate files, four separate edits. Note `#1e293b` is slate-800, the untokenised second dark
ground DESIGN_DELTA section 1 already tracks, not the slate-900 the footer now uses; they are
different navies and section 9 forbids the pairing anyway.

### `/for/[slug]`, 45 routes, adjacency
- Bands 5 and 6 are both `rgb(255,255,255)`: the FAQ section at
  `construction-cis/web/src/app/for/[slug]/page.tsx:169` (`bg-white py-12 sm:py-16 lg:py-20`)
  immediately followed by the NextStepOffer wrapper at line 204,
  `<div className="bg-white px-4 sm:px-6 lg:px-8">`.
- **One template edit fixes all 45. Verified**: `for/[slug]/` is a single `page.tsx`; the two bands
  are unconditional siblings, and the index shift between routes (bands 4/5 vs 5/6) is only the
  optional section above them rendering or not.

### `/for` index, 1 route, adjacency, and it is dark on dark
- Bands 0 and 1 are both `oklch(0.205 0 0)` neutral-900: `for/page.tsx:20` and `for/page.tsx:33`.
- This is the literal "navy must never touch navy" case, inside the page rather than at the footer,
  and section 3a does not track it. One edit.

### `/`, 1 route, adjacency
- Bands 1 and 2 both `#fafaf9`: `construction-cis/web/src/app/page.tsx:236` and `:245`. One edit.

### `/services`, 1 route, adjacency
- Bands 3 and 4 both white: `construction-cis/web/src/app/services/page.tsx:168` and `:184`. One edit.

## 5. Phase ownership of every breach

| Breach | Routes | Owner |
|---|---|---|
| Dark tail, `/locations/[slug]` | 25 | **Phase 3** |
| Dark tail, `/cis-refund`, `/gross-payment-status` | 2 | Phase 5 (pillars) |
| Dark tail, `/cis-invoice-template`, `/cis-payment-deduction-statement-template` | 2 | Phase 6 (template downloads) |
| Adjacency, `/for` index + `/for/[slug]` | 46 | **Phase 3** (STATE.md:62-66 puts `/for` and its 45 trade pages in Phase 3 scope; the brief's phase map omitted `/for` and `/resources`) |
| Adjacency, `/`, `/services` | 2 | Phase 5 |

Phase 3 therefore owns **25 of the 29** dark-tail breaches, not 75 of 79, and **46 of the 48**
adjacency breaches. Phase 4 (calculators, `/embed`) owns none: no calculator route appears in either
metric.

## 6. The adjacency metric, and whether section 3a should cover it

**It is pre-existing, not introduced by this port.**
- `/services/page.tsx` has not been touched since before Phase 0; the last commit to it predates the
  port entirely.
- Phase 2 (`6575bbb69`) did touch `page.tsx`, but `git show 6575bbb69 -- .../page.tsx | grep '^[-+].*bg-'`
  returns nothing: it changed no ground on the homepage.
- `for/[slug]/page.tsx` took a one-line change in Phase 2, likewise not a ground.
So the same shape on `/services`, an untouched file, is the evidence the brief predicted, and it
holds for all 48.

**Recommendation: widen section 3a to cover it, as a second tracked row, with the `/for` index's
navy-on-navy called out explicitly.** Reasons: section 9 forbids adjacency in the same breath as it
forbids navy on navy, so tracking one and not the other leaves the port shipping a known section-9
breach on 48 of 246 routes (20%); and one of the 48 is literally navy on navy, which is the clause
3a already quotes.

**Cost: four edits.** 46 of the 48 routes are two files, both already in Phase 3's scope
(`for/[slug]/page.tsx` one edit for 45 routes, `for/page.tsx` one edit for the index). The other two
are one line each in Phase 5 files that phase is rewriting anyway. There is no separate build, no new
instrument, and no route outside existing phase scope. It should be recorded as pre-existing and
inherited, NOT as damage created by the footer flip, so the port is not blamed for it.

## 7. Closure gate for the end of Phase 3

**REWRITTEN 2026-09-11. The instrument now performs this check itself, so its summary line IS the
gate.** The manual recompute this section used to carry existed only because of defects D1 and D2;
both are fixed, so the recompute is deleted rather than kept as a second opinion that could drift
out of step with the instrument. There is one check, in one committed place.

Paste verbatim, with the Phase 3 production server's port substituted for `3257` if it differs, and
with the title assertion kept. A dozen dev servers run on nearby ports and this programme has
written three baselines from the wrong site.

```bash
curl -s http://localhost:3257/ | grep -o '<title>[^<]*</title>'   # must contain: CIS Accountants

MSYS_NO_PATHCONV=1 node docs/_engines/instruments/browser_check.mjs --site=construction-cis   --base=http://localhost:3257 --grounds --sample=200 --widths=1440   --out=<scratch>/grounds_after_phase3.json
```

`MSYS_NO_PATHCONV=1` is required under Git Bash: without it a leading-slash route argument is
rewritten to a Windows path and every page fails to navigate. One width is deliberate: a ground is
a background colour and does not change with viewport, and the instrument keys grounds one per
route. `--sample=200` lifts the blog-article sampler so all 91 blog URLs are visited.

Read THREE lines of the output, in this order.

1. **The grounds self-test line.** It must appear and must read:
   `grounds self-test OK: rgb(15, 23, 42) lum=0.0088 dark; rgb(255, 255, 255) lum=1 light;`
   `oklch(0.208 0.042 265.755) lum=0.0089 dark; oklch(0.985 0.001 106.423) lum=0.9553 light`.
   If the classifier is wrong the mode exits 2 and prints nothing else; an instrument that has not
   proved itself does not get to fail, or pass, a phase.
2. **`SECTION GROUNDS, 246 route(s) measured`.** A lower number means routes were dropped and the
   run is not comparable. Also check the run for `ChunkLoadError` or a stylesheet served as
   `text/plain`: that means the build was replaced under the running server mid-crawl, those
   routes rendered unstyled, and they are unmeasured rather than clean.
3. **The two metric lines**, read directly. No post-processing.

**Expected result, Phase 3 closed:**

```
  dark band touching the footer: 4  [/cis-refund 1, /gross-payment-status 1,
                                     /cis-invoice-template 1,
                                     /cis-payment-deduction-statement-template 1]
  adjacent bands sharing a ground: 2  [/ 1, /services 1]
```

i.e. `/locations` gone (25 closed by one template edit), `/glossary` still absent because it was
never in breach, `/for` gone (46 closed by two template edits) if section 3a's adjacency row is
adopted, and only the Phase 5 and Phase 6 routes left in each metric.

If the adjacency widening is declined, expect `adjacent bands sharing a ground: 48` unchanged and
record that as accepted, in writing, with the `/for` index's navy-on-navy named explicitly.

**Pre-Phase-3 reference, measured by this same command on the post-Phase-2 build:**
`dark band touching the footer: 29`, `adjacent bands sharing a ground: 48`.

## 8. What DESIGN_DELTA section 3a should say (ALL FOUR APPLIED 2026-09-11)

1. Replace "79 of 246 routes (32%)" with **"29 of 246 routes (12%)"**, families `/locations` **25**
   plus the four standalone routes.
2. Strike `/glossary` **50** with the reason: not a breach, the family's tail is a white `<article>`;
   it entered the count because the instrument's band selector does not match `<article>`. Keep the
   struck number visible, as the 102 is kept, so nobody re-derives 79.
3. Add a second tracked row for adjacency, **48 routes**, pre-existing rather than introduced,
   families `/for` 46 (one of them navy on navy), `/` 1, `/services` 1, with the four-edit cost.
4. Note that Phase 3 closes 25 of the 29, not 75 of 79, so the blocking item survives Phase 3 by
   design and closes in Phases 5 and 6.

All four points were written into `docs/construction-cis/DESIGN_DELTA.md` section 3a on
2026-09-11, against the fixed instrument's own figures rather than the recompute. The struck 102
and the struck 79 are both kept visible there, each with the measurement defect that produced it.
