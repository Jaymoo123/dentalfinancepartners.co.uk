# Trade (construction-cis) browser baseline re-capture

**Date:** 2026-09-11, 19:06-19:55 BST. Server: `next start` on `http://localhost:3167`, built from
HEAD = tag `port-construction-cis-phase4`, commit `72fe3261` ("design port phases 3 and 4").

**Command (from the monorepo root, git-bash):**

```
MSYS_NO_PATHCONV=1 node docs/_engines/instruments/browser_check.mjs \
  --site=construction-cis --base=http://localhost:3167 --save-baseline \
  --out=<scratchpad>/bc_recapture.json
```

Defaults reproduce the old capture exactly: 166 routes x 4 widths (390/768/1024/1440 =
mobile/tablet/laptop/desktop) = 664 page-loads, `--sample=2` blog articles, `--article-depth=3`.
Both files carry the identical 664 `route|width` key set, so the diff below is like for like.
Statuses: 166 x 200, 498 x 304 (304 is a normal warm-cache repeat load).

**Self-test:** `{"ok":true,"measured":{"slate500OnWhite":4.76,"slate400OnWhite":2.56}}` - both
known pairs hit on the nose (4.76 / 2.56), so the maths is trusted.

**Unparseable colours: 0** (summed over all 664 page-loads).

> Both figures are taken from `bc_recapture.json` rather than the console, because with
> `--save-baseline` the instrument writes the baseline and exits at line 565, *before* the
> `self-test OK ... / N unparseable colour(s)` summary lines are printed. The JSON carries the
> same `selfTest` object and the same per-page `unparsed` counters; nothing is inferred.

## Headline, OLD vs NEW

| Half | OLD (11:31, pre-phase-3/4) | NEW (19:55, phase 4 HEAD) | Change |
|---|---|---|---|
| Contrast findings | 5,466 | **352** | -5,114 (-94%) |
| Distinct contrast findings | 100 | **35** | -65 |
| Routes carrying contrast findings | 166 of 166 | **24 of 166** | -142 |
| Anchor-target gaps | 852 | **668** | -184 |
| Console/page/request noise | 1 | 1 | unchanged |
| Horizontal overflow | not baselined | **0** across 664 loads | n/a |
| Heading records captured | not baselined | 3,725 (data, not defects) | n/a |
| Unparseable colours | n/a | 0 | - |

## 1. THE BRIEF'S PREMISE IS FALSE: the old baseline's contrast half was never oklch-blind

The re-capture was commissioned on the basis that `browser_baseline.json` (11:31) was taken while
the instrument "was oklch-blind, so every `oklch()`-coloured element is simply ABSENT from it".
That is not what happened, and the old file itself disproves it:

- **2,586 of the old file's 5,466 contrast findings carry an `oklch(...)` colour.** Examples from
  the old baseline verbatim: `td "0%" ratio=3.58 floor=4.5 size=14px color=oklch(0.646 0.222
  41.116)`, `button "Do not track me" ratio=2.47 floor=4.5 size=12px color=oklch(0.708 0 0)`.
  Absent elements cannot produce 2,586 findings.
- **The contrast path has painted colour onto a 1x1 canvas since the instrument's first commit**
  `08cee664` (2026-08-25). `git log -S'willReadFrequently'` returns that commit and no other.
  Painting is exact for `oklch()` by construction.
- **`bf231f1a` (16:55) repaired the `--grounds` mode only.** Its own message says so: the
  section-grounds `isDark` helper ran `c.match(/\d+(\.\d+)?/g)` over the computed string and
  divided the captures by 255, which mis-scored every `oklch()` ground as dark. The diff touches
  `opaque()`, `lumOf`/`isDark`, `BAND_SEL` and `groundOf`. It does not touch the text-contrast
  code at all.

`GROUNDS_BASELINE.md`'s READ FIRST block generalised a grounds-mode defect to the contrast half.
The contrast half of the 11:31 capture was sound; it was simply taken against older code.

**Consequence for reading this diff:** the OLD and NEW captures were produced by *identical*
contrast logic, so the two are directly comparable - but they were taken against *different
source trees* (11:31 = pre-phase-3, 19:55 = post-phase-4, `72fe3261`). Every number below is a
measurement of what phases 3 and 4 changed on the pages, not of what the instrument changed.
None of the -94% is "newly visible" colour; **0 findings** in NEW exist because of the repair.

## 2. (a) Where the 5,114 findings went

Phases 3 and 4 introduced `--accent-strong: #c2410c` (orange-700, 5.18 on white) and demoted
`--accent: #f97316` to non-text use (`construction-cis/web/src/app/globals.css:41-46`). That one
move accounts for nearly all of it.

| Finding class (OLD) | OLD count | NEW count |
|---|---|---|
| White text on the orange button ground, `ratio=2.80-2.89`, `color=rgb(255, 255, 255)` | 2,477 | **0** |
| Orange text on light, `color=oklch(0.646 0.222 41.116)` (orange-600 utility), 3.43-3.58 | present throughout | **0** |
| Near-black `rgb(10, 10, 10)` fine print | 200 | **0** |
| Orange token text `rgb(249, 115, 22)` (`--accent` literal hex) | 185 | **96** |
| Everything else | 2,604 | 256 |

Findings by colour SOURCE (utility ramp vs token), per `DESIGN_DELTA.md` section 2:

| Source | OLD | NEW |
|---|---|---|
| Utility, emits `oklch(...)` | 2,586 | 248 |
| Token / literal, emits `rgb(...)` | 2,880 | 104 |

## 3. (b) The other three halves

- **Overflow: 0 offending nodes across all 664 page-loads, every width including 390.** Overflow is
  never baselined (the standard's floor is zero), so the old file holds nothing to compare against;
  the NEW run is clean, which is the only state that passes.
- **Anchor targets: changed, and for the better.** OLD held 852 gaps, NEW 668. The `#main`
  skip-link target is missing `scroll-mt-24` on **every route at every width in both captures**
  (664 = 166 x 4, unchanged - a chrome-level defect, one fix closes all of it). The remaining OLD
  184 were per-heading in-page anchors on the two sampled blog articles, `/cis-refund`,
  `/gross-payment-status` and the two template magnets; phases 3-4 closed all but one:
  **`/cis-invoice-template` `#downloads` (4 loads)**. No route gained an anchor gap.
- **Heading typography: no comparison is possible.** `--save-baseline` records only
  `contrast + anchorGaps + noise` (line 531); headings and overflow are written to the `--out`
  report, never to the baseline, and no `--out` report survives from the 11:31 run. NEW captured
  3,725 heading records (h1-h3 computed weight/line-height/letter-spacing); they are raw data, not
  findings, and the instrument raises no gate on them. Spot value from `/` desktop: `h1 weight=700
  lineHeight=43.2px letterSpacing=-0.9px fontSize=36px family=GeistSans`.
- **Noise: 1 entry in both.** No new console errors, page errors or failed requests.

## 4. (c) The 24 routes that still carry contrast findings, by family and phase

| Family | Routes | Findings per route (all 4 widths) | Phase |
|---|---|---|---|
| `/` | `/` | 48 (12 per width, 2 distinct strings) | **Phase 5** |
| `/services` | `/services` | 48 (12 per width, 2 distinct) | **Phase 5** (pillar) |
| `/gross-payment-status` | `/gross-payment-status` | 12 (3 per width) | **Phase 5** (pillar) |
| `/calculators` | `/calculators` + 12 calculator pages | 8 on the index, 12 on each leaf = 152 | outside 5/6 |
| `/research` | `/research` + 4 index pages | 24 on `/research`, 12 on each of the 4 = 72 | **Phase 6** |
| `/contact` | `/contact` | 12 (3 per width) | **Phase 6** |
| `/blog` | the 2 sampled articles | 4 each = 8 | outside 5/6 |

Zero findings on: `/cis-refund` (the third pillar), **every `/locations/*` route** (25 of them),
`/for/*` (46), `/glossary/*`, `/about`, all three legal pages, `/resources`, the two template
magnets, and the blog index/category pages. In the OLD capture every one of those carried findings
(`/for` 1,818, `/glossary` 1,216, `/locations` 716).

**Phase 5 scope (`/`, the three pillars, `/locations/*`): 3 routes affected, 5 distinct findings,
all of them orange-on-light.**
- `/` and `/services`: `span "✓" ratio=2.80 floor=3 size=16px|18px color=rgb(249, 115, 22)` -
  the tick glyph, painted from the **token** `--accent` literal `#f97316`, so 2.80. Below the 3:1
  floor for non-text-size elements.
- `/gross-payment-status`: `span "01|02|03" ratio=2.89 floor=4.5 size=14px
  color=oklch(0.705 0.213 47.604)` - the step numerals, painted from the **utility** ramp
  (`text-orange-500` = `#ff6900`), so 2.89, and at 14px they take the 4.5 floor.

**Phase 6 scope: `/contact` and the five `/research` routes.**
- `/contact`: `span "01|02|03" ratio=2.76 floor=3 size=24px color=oklch(0.705 0.213 47.604)` -
  same numerals, utility source, 24px so the 3:1 floor applies; 2.76 not 2.89 because the ground is
  the cream surface, not white.
- `/research/*`: breadcrumbs, `a "Home"/"Research" ratio=3.78` and `span "<current>" ratio=1.73`,
  plus on `/research` itself four `p "Updated ..." ratio=2.58 floor=4.5 size=12px
  color=oklch(0.708 0 0)` date stamps.
- `/about`, the legal pages and the magnets are **clean**, so Phase 6's contrast review reduces to
  `/contact` and `/research/*`.

The 13 `/calculators` routes (outside both phases) carry the same breadcrumb pattern as
`/research`: `a "Home"/"Calculators" ratio=3.76 floor=4.5` and `span "<page title>" ratio=1.72
floor=4.5 size=14px color=oklch(0.371 0 0)`. **Breadcrumbs are the single largest remaining
cluster: 18 of the 24 affected routes, and one shared component fixes all of them.**

The two sampled blog articles carry one finding each and it is a false alarm by design:
`label "Company website (leave blank)" ratio=1.00 floor=3 size=16px color=rgb(255, 255, 255)` -
the honeypot field's visually-hidden label, white on white on purpose.

## 5. (d) The port's recorded figures, checked against the NEW capture

| Recorded in the port | Status at `72fe3261` | Measured now |
|---|---|---|
| Every primary button white on orange at ~2.80-2.89 | **No longer true. 0 findings.** True of the OLD capture: 2,477 white-text findings at 2.80-2.89 (`a "Book a free call" ratio=2.89 floor=4.5 size=12px color=rgb(255, 255, 255)`). Phases 3-4 moved buttons onto `--accent-strong` `#c2410c`. Not an absence artefact: `/` reports `unrendered: []` at desktop and the button text is still in the served HTML. | 0 |
| Article links ~3.16-3.58 | **No longer present.** OLD carried 3.43/3.58 on `color=oklch(0.646 0.222 41.116)`; NEW has no finding in the 3.1-3.6 band at all. | 0 |
| Eyebrow ~2.68 | **Not reproduced in either capture.** No finding at 2.68 exists in OLD or NEW. The nearest live figures are the numerals at 2.76 (`/contact`) and 2.89 (`/gross-payment-status`). | 0 |
| Footer fine print ~2.42-2.47 | **No longer present.** OLD had `button "Do not track me" ratio=2.47 floor=4.5 size=12px color=oklch(0.708 0 0)`; NEW has nothing in 2.42-2.47. The surviving 12px grey is `p "Updated ..." 2.58` on `/research`. | 0 |

Complete NEW ratio census (352 findings, 9 distinct ratio values):
`3.76` x100, `2.80` x96, `1.72` x52, `3.78` x36, `1.73` x20, `2.58` x16, `2.89` x12, `2.76` x12,
`1.00` x8.

## 6. What the next phase must take from this

1. The contrast surface is now **35 distinct contrast findings on 24 routes**, not a site-wide condition.
   Phase 5's own scope is **5 distinct findings on 3 routes** (`/`, `/services`,
   `/gross-payment-status`), all orange-on-light, and **`/locations/*` is entirely clean**.
2. Two of the three remaining clusters are single-component fixes: the `#main` skip-link target
   (all 166 routes) and the breadcrumb trail (18 routes across `/calculators` and `/research`).
3. Label every future contrast row by SOURCE. Both orange figures are live in this capture and
   they are not the same subject: the **token** `--accent` `#f97316` measures **2.80**, the
   **utility** `text-orange-500` `oklch(0.705 0.213 47.604)` = `#ff6900` measures **2.89**.
4. `GROUNDS_BASELINE.md`'s READ FIRST block should be corrected: the 11:31 baseline's contrast half
   was never oklch-blind, only stale. The grounds-mode defect it describes was real and was fixed.

## Provenance

- Old baseline preserved at
  `<scratchpad>/browser_baseline_OLD.json` (574,582 bytes, mtime 2026-09-11 11:31).
- New baseline written in place: `docs/construction-cis/_port/browser_baseline.json`
  (100,771 bytes, 2026-09-11 19:55). No other site's artefact was touched.
- Full per-page report (overflow, headings, noise, per-page `unparsed`):
  `<scratchpad>/bc_recapture.json`, 2,171,884 bytes. Scratch only; not committed.
- No source file was edited and no git write command was run.
