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
