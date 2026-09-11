# Phase 5 instrument verification (Trade / construction-cis)

Run 2026-09-11 against `next start` on `http://localhost:3167`, built from
`18b4f25f39cd0c4aa084e582d69a87c8a10710ac`. Measurement only; nothing under
`web/src` or `packages/` was edited, no git write ran.

**Server identity asserted first**, on `/` not `/blog`:
`<title>CIS Accountants &amp; Construction Tax Specialists | UK</title>`.
`cta_snapshot.mjs` re-asserted it independently ("title asserted: ...").

Instruments: the committed `docs/_engines/instruments/{sweep,browser_check,cta_snapshot}.mjs`,
each with its own `--out` (temporary JSONs, deleted after the numbers below were
extracted). No baseline file was overwritten; `--save-baseline` was never passed.

---

## 1. Sweep

```
node docs/_engines/instruments/sweep.mjs --site=construction-cis \
  --base=http://localhost:3167 --sample=9999 \
  --sha=18b4f25f39cd0c4aa084e582d69a87c8a10710ac --out=<tmp>
```

```
[construction-cis -> construction-cis] sweeping 246 URLs (164 core + 82/82 sampled articles)
246/246 URLs clean, 0/18 internal links dead, 0 LINK-FLOOR breaches (6750 links total),
0 data-cta regressions (812 total), 0 dash regressions (2 total)
```

| Figure | Value |
|---|---|
| Routes crawled / clean | 246 / 246 (whole corpus: all 82 articles, no sampling) |
| Dead internal links | 0 |
| Link-floor breaches vs `link_baseline.json` | 0 (no route missing, no route lower; 5301 -> 6750 links) |
| Dashes | **2**, exactly the two protected ranges: `/calculators/cis-self-assessment-calculator` 1, `/calculators/cis-vs-paye-comparison` 1 |
| TOTAL `data-cta` | 620 -> **812**, delta **+192**, and every one of the 192 changed routes moved **+1**. Zero routes decreased. No route collision. |

The +192 decomposes as: `/` +1 and `/services` +1 (Phase 5's two new ids), and
190 pre-Phase-5 additive ids from phases 2-4 already in the build (`/blog`,
45 `/for/*`, 82 articles, 50 glossary, 12 calculators).

## 2. CTA triples

`cta_snapshot.mjs http://localhost:3167 <route source> <out>` (note: arg 2 is a
positional routes source, any file with a `links` map, not a comparison target;
`--flag` style arguments make it throw). 246 routes, 812 tags, 12 distinct triples.

**The 5 LOCKED triples: PASS, byte-identical, counts unchanged, hrefs unchanged.**

| Triple | Baseline | Live |
|---|---|---|
| `header_nav_primary\|header\|contact\|data-cta` | 246 | 246 |
| `specialist_widget\|null\|null\|data-cta` | 246 | 246 |
| `next_step\|null\|null\|data-cta` | 109 | 109 |
| `next_step\|null\|form\|data-cta` | 18 | 18 |
| `hero_primary\|hero\|lead\|data-cta` | 1 | 1 |

No T22 flip: no baseline triple key is missing from the live set, so no button
kept a count while changing `goal` or `placement`.

**Phase 5's two new ids**

| id | route | placement\|goal | href | verdict |
|---|---|---|---|---|
| `home_hero_book` | `/` | `hero\|form` | `#book` | on-page anchor, matches `goal=form` |
| `services_hero_book` | `/services` | `hero\|form` | `#book` | on-page anchor, matches `goal=form` |

Both are **additions, not replacements**: `/` went 3 -> 4 tags and `/services`
2 -> 3, and every baseline triple on those routes survives at its baseline count.
Rendered DOM confirms `/` carries exactly `header_nav_primary`, `home_hero_book`,
`hero_primary`, `specialist_widget`, and `/services` carries `header_nav_primary`,
`services_hero_book`, `specialist_widget`.

**Observed, not fixed, taxonomy mismatch (pre-Phase-5):**
`blog_index_primary|hero|lead` on `/blog` has href `#enquiry-form`, an on-page
anchor carrying `goal=lead`. By this site's own taxonomy that should be `form`.
Phase 3/4 inventory, out of Phase 5's scope.

**StickyCTA, reported not fixed:** `src/components/ui/StickyCTA.tsx:147` emits
`data-cta-id="sticky_cis_refund"`, while `packages/web-shared/analytics/autoCapture.ts:100`
matches `closest("[data-cta]")` and reads `getAttribute("data-cta")`. The
attribute never matches, so the site's only persistent site-wide CTA has never
emitted a click. The snapshot found **no `data-cta-id` tag in the served HTML at
all** on any of 246 routes, because StickyCTA mounts client-side; the defect is
confirmed from source, unchanged by Phase 5.

## 3. Browser check (scoped, no `--save-baseline`)

Routes: `/`, `/services`, `/cis-refund`, `/gross-payment-status`, and three
`/locations/*` controls (london, manchester, birmingham), default widths
390/768/1024/1440. 28 page-loads.

```
self-test OK (slate-500/white 4.76, slate-400/white 2.56)
28 page-loads, 0 with NEW problems.
coverage: 0 subtree(s) unrendered at every width tested (390/768/1024/1440), so unchecked;
0 unparseable colour(s)
```

**NEW findings: none.** That is the product of this run and it is empty.

Disposition of the baseline's 5 Phase 5 contrast findings:

| Finding | Source | Baseline | Now |
|---|---|---|---|
| `/` tick glyphs `✓` 2.80 (floor 3) | **TOKEN** `--accent: #f97316`, served as `rgb(249,115,22)` | 12 per width | **SURVIVES**, 12 per width, all four widths |
| `/services` tick glyphs `✓` 2.80 (floor 3) | **TOKEN** `#f97316` | 12 per width | **SURVIVES**, 12 per width |
| `/gross-payment-status` step numerals `01`/`02`/`03` 2.89 (floor 4.5, 14px) | **UTILITY** Tailwind v4 `oklch(0.705 0.213 47.604)` = `#ff6900` | 3 per width | **FIXED**, 0 at every width |

So Phase 5 closed the utility-sourced 2.89 numerals and left the token-sourced
2.80 ticks untouched. No alpha suffix or `opacity` sat above any measured node;
the instrument measures the composited pixel regardless.

**Correction to the brief:** `/cis-refund` and the `/locations/*` routes were
**not** clean in the baseline. They were clean of *contrast* findings, but every
route in scope carries the baselined anchor finding
`#main scroll-margin-top=0px (want >= 96px / scroll-mt-24)` at all four widths.
It is unchanged by Phase 5 and pre-existing, not a regression.

### Section grounds (`--grounds`, same route set)

```
grounds self-test OK: rgb(15, 23, 42) lum=0.0088 dark; rgb(255, 255, 255) lum=1 light;
oklch(0.208 0.042 265.755) lum=0.0089 dark; oklch(0.985 0.001 106.423) lum=0.9553 light

SECTION GROUNDS, 7 route(s) measured
  dark band touching the footer: 0
  adjacent bands sharing a ground: 0
```

Tracked figures were dark-on-dark **4** and adjacent-same **2**, survivors being
exactly the Phase 5 and Phase 6 routes.

- Phase 5's share (`/cis-refund` + `/gross-payment-status` dark tails; `/` +
  `/services` adjacency) is **closed: 0 and 0**. The claim is verified, not accepted.
- The other 2 dark tails are Phase 6's and were probed separately to attribute
  them: `/cis-invoice-template` 1 and `/cis-payment-deduction-statement-template` 1,
  both still breaching (`last=rgb(30,41,59)` against `footer=rgb(15,23,43)`).
  So the estate figure now reads dark-on-dark **2**, adjacent-same **0**.
- Closing-band sequence measured directly at 1440: `/cis-refund` ends
  `... #fafaf9, #ffffff, #fafaf9` and `/gross-payment-status` ends
  `... #fafaf9, #ffffff` before the navy footer. Light closing band confirmed.

## 4. Claims only a rendered check can settle

| Claim | Verdict |
|---|---|
| `/services`: 7 in-page anchors, each `scroll-margin-top >= 96px` | **FALSE on the count.** The rendered DOM has **2** in-page anchors, `#main` and `#book`. `#book` computes `scroll-margin-top: 96px` (PASS); `#main` computes `0px` (the pre-existing baselined gap). There is no set of 7. |
| `/` and `/services`: `featuredBadge=""` emits no badge | **TRUE.** The string "Most Popular" appears 0 times in the served HTML and 0 times in the rendered DOM on both routes. |
| `/`: 45 `/for/<slug>` hrefs in server HTML | **TRUE**, re-derived independently: 45 matches, 45 unique, via `grep -o ... \| wc -l` semantics (259,130 bytes of HTML, so no empty-body artefact). |
| `/`: 0 adjacent same-ground pairs | **TRUE**, grounds run reports 0; the last band is white before the navy footer. |
| `/cis-refund`, `/gross-payment-status`: single `#book` target, offset, light closing band | **PARTLY FALSE.** `#book` exists exactly once on each and computes `scroll-margin-top: 96px`; the closing band is light. But **no element on either page links to it**: 0 `href="#book"` in the served HTML and 0 in the DOM. The anchor target is orphaned on both routes. |
| Homepage FAQ JSON-LD matches rendered answers, one binding | **TRUE.** 6 JSON-LD blocks, all parse, exactly **1** `FAQPage`. All 4 answers appear verbatim in the rendered body text after entity/whitespace normalisation. |
| "recoup our fees many times over" absent from body and JSON-LD | **TRUE.** 0 occurrences anywhere in the served homepage HTML, JSON-LD included. |
| No `role="img"` wrapper, no `aria-hidden` swallowing data on Phase 5 surfaces | **TRUE in substance.** Exactly one `role="img"` per page: the labelled Union Jack SVG (`aria-label="Union Jack flag"`) in the shared chrome, not a Phase 5 surface, and it is decorative with a label, not a swallowed wrapper. The only `aria-hidden="true"` node carrying more than 15 characters of text on any of the four routes is the form honeypot "Company website (leave blank)", which is correct. |

## Things in the brief that are false

1. `/services` has **2** in-page anchors, not 7.
2. `/cis-refund` and `/gross-payment-status` have a `#book` **target** but no
   `#book` **link**; nothing on those pages navigates to it.
3. `/cis-refund` and the 25 `/locations/*` were not "clean" in the baseline: they
   are clean of contrast findings but all carry the `#main` anchor finding.
4. `cta_snapshot.mjs` does not take `--site` / `--base` / `--out` flags; its
   arguments are positional (`base`, routes-source JSON, out), and its second
   argument is a routes source, not the comparison baseline. It cannot read
   `cta_baseline.json` (no `links` key); the triple comparison was done
   afterwards against `cta_baseline.json` by key.

## Not done

Nothing in the brief was skipped. The browser check was deliberately scoped as
instructed (28 loads + 8 attribution loads on the two Phase 6 routes), not the
full 664.

---

# FINAL VERIFICATION (2026-09-11, post both gap-fix rounds)

Server: `next start` on `http://localhost:3167`, built from HEAD. Served title
asserted before every measurement: `CIS Accountants &amp; Construction Tax
Specialists | UK`. All runs used the committed instruments in
`docs/_engines/instruments/`, each with its own `--out` in the session
scratchpad. No baseline file was written.

## A. Sweep

`sweep.mjs --site=construction-cis --base=http://localhost:3167 --sample=9999
--sha=18b4f25f39cd0c4aa084e582d69a87c8a10710ac
--baseline=docs/construction-cis/_port/link_baseline.json`

```
246/246 URLs clean, 0/18 internal links dead, 0 LINK-FLOOR breaches (6750 links
total), 0 data-cta regressions (814 total), 0 dash regressions (2 total)
```

| Figure | Value | Previous | Verdict |
|---|---|---|---|
| Routes clean | 246/246 | 246/246 | unchanged |
| Dead internal links | 0 | 0 | unchanged |
| Link-floor breaches | 0 at 6,750 links | 0 at 6,750 | unchanged |
| Dashes | 2 | 2 | at target, the 2 protected numeric ranges survive |
| Total `data-cta` | **814** | 816 | **-2, exactly as predicted** |

The -2 is attributed, not inferred. Each pillar now serves exactly three
`data-cta` nodes, all of them `<a>` or `<button>`:

- `/cis-refund`: `header_nav_primary`, `cis_refund_hero_book` (`hero|form`,
  `href="#book"`), `specialist_widget`.
- `/gross-payment-status`: `header_nav_primary`, `gps_hero_book` (`hero|form`,
  `href="#book"`), `specialist_widget`.

The `<div id="book" class="scroll-mt-24">` wrapper on both routes carries no
`data-cta` attribute at all. 4 to 3 on each route = -2 total. Route-collision
check: total and per-route move together. The per-route floor against the
pre-port baseline reports 0 regressions, and the CTA attribute diff below
reports MISSING 0 across all 246 routes, so no id was lost under cover of the
drop.

## B. CTA continuity

`cta_snapshot.mjs http://localhost:3167 link_baseline.json <out>`, then a full
`(id, placement, goal, href)` set diff per route against `cta_baseline.json`.
246 routes scanned, 814 cta tags, 14 distinct triples.

**MISSING: 0.** ADDED: 194 instances across 9 additive ids from phases 2 to 5
(`blog_sidebar_book` 82, `glossary_entry_book` 50, `for_hero_book` 45,
`calc_hero_help` 12, and `home_hero_book`, `services_hero_book`,
`cis_refund_hero_book`, `gps_hero_book`, `blog_index_primary` at 1 each).

The 5 LOCKED triples, byte-identical to baseline:

| Triple | Live | Baseline |
|---|---|---|
| `header_nav_primary\|header\|contact` | 246 | 246 |
| `specialist_widget\|null\|null` | 246 | 246 |
| `next_step\|null\|null` | 109 | 109 |
| `next_step\|null\|form` | 18 | 18 |
| `hero_primary\|hero\|lead` | 1 | 1 |

**PASS.** `cis_refund_book_panel` and `gps_book_panel` appear zero times in the
live snapshot. They were never in the pre-port baseline, having been added in
phase 5 and removed in the fix round, so their removal costs no recorded id, and
nothing else left with them: MISSING is 0.

## C. Section grounds, repaired instrument

`browser_check.mjs --grounds` over `/`, `/services`, `/cis-refund`,
`/gross-payment-status`, `/calculators`, `/contact`, `/blog`, `/about`,
`/for/electricians`, `/locations/manchester` at 390/768/1024/1440.

Self-test lines, verbatim:

```
self-test OK (slate-500/white 4.76, slate-400/white 2.56)
```

```
grounds self-test OK: rgb(15, 23, 42) lum=0.0088 dark; rgb(255, 255, 255) lum=1 light; oklch(0.208 0.042 265.755) lum=0.0089 dark; oklch(0.985 0.001 106.423) lum=0.9553 light; same-ground threshold 3 -> rgb(250, 250, 247) vs rgb(250, 250, 249) d=2.84 SAME; rgb(255, 255, 255) vs rgb(250, 250, 249) d=15.72 DIFFERENT; band discovery -> @390 [fx1,fx2,fx3] @1024 [fx1,fx2,fx3]
```

Unparseable colours: **0**. Coverage caveat carried by the run: 70 subtrees on
`/blog` were unrendered at every width and are therefore unchecked.

```
SECTION GROUNDS, 10 route(s) measured
  dark band touching the footer: 0
  adjacent bands sharing a ground: 0
```

Band counts per width:

| Route | 390 | 768 | 1024 | 1440 |
|---|---|---|---|---|
| `/` | 13 | 13 | 13 | 13 |
| `/services` | 5 | 5 | 5 | 5 |
| `/cis-refund` | 6 | 6 | 6 | 6 |
| `/gross-payment-status` | 5 | 5 | 5 | 5 |
| `/calculators` | 2 | 2 | 2 | 2 |
| `/contact` | 2 | 2 | 2 | 2 |
| `/blog` | 4 | 4 | 4 | 4 |
| `/about` | 2 | 2 | 2 | 2 |
| `/for/electricians` | 8 | 8 | 8 | **7** |
| `/locations/manchester` | 7 | 7 | 7 | 7 |

Nine of ten routes are stable across all four widths. `/for/electricians` loses
one band at 1440: the `rgb(255, 247, 237)` entry sitting between two light
bands. That is not classifier instability and not a design defect. The only
orange-50 node on the page is a single in-prose callout,
`class="my-10 rounded-2xl border border-orange-200 bg-orange-50 p-6 sm:p-8"`,
whose width tracks the prose column; it clears the full-width-candidate
threshold up to 1024 and stops clearing it at 1440. The band that disappears is
that callout, not a section. No figure here is compared with any pre-repair
number.

## D. Contrast

Same run, scoped to the Phase 5 routes plus six controls, against
`browser_baseline.json` re-captured today from the phase-4 build.

`self-test OK (slate-500/white 4.76, slate-400/white 2.56)`; **0 unparseable
colours**; 40 page-loads, **0 with NEW problems**; 0 horizontal overflow; 0
console errors, page errors or failed requests.

**NEW findings: none.** All 28 distinct contrast rows observed are already in
the baseline. For the record, labelled by source:

| Route | Node | Ratio | Source |
|---|---|---|---|
| `/`, `/services` | `span "tick"` | 2.80, floor 3 | **TOKEN** `rgb(249, 115, 22)` = `--accent: #f97316`. The 4 known tick-glyph survivors. |
| `/contact` | `span "01"/"02"/"03"` | 2.76, floor 3 | **UTILITY** `oklch(0.705 0.213 47.604)` = `text-orange-500` |
| `/calculators` | `a "Home"`, `span "Calculators"` | 3.76 / 1.72, floor 4.5 | **UTILITY**, neutral breadcrumb text |

No row carried an `/NN` alpha or an `opacity=`, so no swatch figure is invalid.

## E. Rendered spot-checks

| Check | Result |
|---|---|
| 45 `/for/<slug>` hrefs on `/` | **PASS.** 45 hrefs, 45 unique. |
| `href="#book"` on `/cis-refund` and `/gross-payment-status` | **PASS.** 1 each, was 0. `id="book"` also 1 each. |
| Nothing inside either `#book` band resolves to a `data-cta` ancestor | **PASS.** Each `#book` subtree contains 11 form controls and 0 `data-cta` occurrences; all three `data-cta` nodes on each route are `<a>`/`<button>`, so none can be an ancestor of a form control. |
| `/services` 7 section ids | **PASS.** `cis-refund`, `cis300-returns`, `expenses`, `gross-payment-status`, `limited-company`, `sole-trader-sa`, `vat-mtd`. |
| `/services` `featuredBadge` emits no badge | **PASS.** Passed as `""` at `services/page.tsx:242`; the `tier.featured && featuredBadge` guard short-circuits. 0 badge wrappers and 0 "Most Popular" in the served HTML. |
| Homepage JSON-LD | **PASS.** 5 blocks, all parse, 0 `BreadcrumbList`, exactly 1 `FAQPage` with 4 Question/Answer pairs. Every question and every answer is present in the body text, each question exactly once: one binding, not two copies. |
| Breadcrumbs on the other three Phase 5 routes | **PASS.** `/services`, `/cis-refund`, `/gross-payment-status` each render one `aria-label="Breadcrumb"` nav and one `BreadcrumbList` block. |
| Consent wording unchanged | **PASS.** "By submitting this enquiry you confirm you understand this." The only diff to `components/forms/` since `18b4f25f` is the privacy-policy link colour moving from `text-orange-600` to `var(--accent-strong)`. |
| No interruptive surface | **PASS.** No modal, banner, popup or exit-intent on `/`. The single `popup` string match is `aria-haspopup="true"` on the nav disclosure button. |

## Things in this brief that are false

1. The brief says to diff CTAs "against `_port/cta_baseline.json`" using
   `cta_snapshot.mjs`. The instrument's second positional argument is a routes
   source and must carry a `links` key, which `cta_baseline.json` does not have.
   `link_baseline.json` was used to enumerate the 246 routes and the triple diff
   was done afterwards against `cta_baseline.json` by key. Same finding as the
   previous reviewer's point 4; the brief still carries it.
2. Nothing else. The predicted -2, the locked triples, the `#book` link counts
   and the badge suppression all measured as stated.

## Not done

Nothing. No fix applied, no source file touched, no git write run.
