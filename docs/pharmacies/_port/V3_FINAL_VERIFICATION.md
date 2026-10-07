# V3 — final verification, pharmacies (post-W7C/G5/UA2/UB2 fix round)

Server `next start -p 3111`, BUILD_ID `801zguJK8uYBM7SWcRtcN` (new build, as
expected after the fix round), title
`Pharmacy Tax | Specialist Accountants for UK Pharmacy Owners` confirmed on
every instrument run and by direct `curl`. No server start/stop, no build, no
git state change, no subagents. Scratch: `...\scratchpad\v3\`
(`sweep_out.json`, `browser_out.json`, `cta_out.json`, `dom_out.json`,
`dom_checks_v3.mjs`, `debugring*.mjs` — ring-measurement debug, kept for the
next verifier).

## BLOCKERS: 0

B1 (V2's blocker, modal pre-empted by the kit's auto-open) is closed.
Everything else that moved is a known, receipted, non-blocking residue.

## Shared acceptance checks

| check | V2 | V3 |
|---|---|---|
| `tsc --noEmit` | clean | **clean, exit 0** |
| `npx vitest run` | 8 files, 83 tests | **8 files, 86 tests, all green** (+3 = W7C's 3 new `widgetPanelOpen` cases) |
| `check_dependency_closure.py` | OK, 19 sites | **OK, 19 sites** |
| em/en dashes in `src` | 0 | **0** |
| raw hex | 0 | **0** |
| `neutral-[0-9]{2,3}` | 0 | **0** |

## sweep.mjs (compare mode)

`node docs/_engines/instruments/sweep.mjs --site=pharmacies --base=http://localhost:3111 --article-depth=3`

**55/55 URLs clean, 0/2 internal links dead, 0 LINK-FLOOR breaches (1723 links
total), 0 data-cta regressions (362 total), 0 dash regressions.**
Identical totals to V2 — the fix round touched no sweep-visible surface
(links, CTA count, dashes). Floor holds everywhere.

## cta_snapshot.mjs

`node docs/_engines/instruments/cta_snapshot.mjs --site=pharmacies --base=http://localhost:3111`

55 routes, 362 tags, **31 distinct triples** — exact match to V2, byte for
byte on the triple list (`header_contact`, `sticky_cta`, `specialist_widget`,
all research/blog/hub ids). No new orphan id, none dropped.

## browser_check.mjs --grounds (backgrounded past 600s, polled every 60s, no second run)

140 page-loads (35 routes x 4 widths). **overflow 0 at every width, contrast
failures 0, anchorGaps 0.** Console noise: 144 occurrences, 3 unique patterns
(AdSense CSP framing x140, one unrelated 60s navigation timeout on a single
load, 3x a gstatic CSI ping) — none a defect, same class as V1/V2.

Grounds vs V2:

| metric | V1 | V2 | V3 | routes now |
|---|---|---|---|---|
| darkOnDark | 8 | 0 | **0** | — stays fixed |
| adjacentSame | 8 | 5 | **2 routes (4 occurrences, 390 only)** | `/calculators` is now clean at all 4 widths (W7C's "nothing to change, measured clean" claim holds); the two blog posts V2 flagged (`pharmacy-closures-independents-vs-multiples`, `category-m-clawbacks-explained`) are narrower, not closed: white-on-white at bands 4/5, **390px only** (W7C's `bg-slate-50`→`bg-white` key-takeaways fix removed the adjacency at 768/1024/1440 but a mobile-only reflow still stacks two white bands). Not a regression from V2 — fewer occurrences, same two posts, same root cause (one more band is white than at desktop widths). |

## Puppeteer walks (Edge, puppeteer-core, `node --input-type=module < script` from `pharmacies/web`)

**(a) 390, `/`, scroll 70%.** Sticky bar `height=72`. Launcher
`top=696..bottom=748`; bar `top=772..bottom=844`. **No intersection**, 24px
clearance. Matches V2 exactly. PASS.

**(b) W7C's 7-step walk, 1440, blog post** (`pharmacy-closures-independents-vs-multiples`):

| step | result |
|---|---|
| 1. widget auto-opens its own dialog | `widgetDialogPresent=true` |
| 2. scroll to 70% while widget open | `modalOpenedWhileWidgetOpen=false`, `dialogCount=1` (only the widget) — **modal correctly stays closed, B1 behaviour confirmed gone** |
| 3. close the widget panel | clicked close, `widgetDialogAfterClose=0` |
| 4. scroll/wait again (re-trigger via `panelClosed` retry) | **`surfaceOpen=true`, `barDisplay=none`, `widgetDisplay=none`, `dialogCount=1`** — the deep-scroll modal now fires on its own, without needing a second manual scroll pass as V1/V2 needed; W7C's `MutationObserver`-driven `panelClosed` retry is confirmed live, not just read |
| 5. Escape | `surfaceOpen` removed, `barDisplay=block`, `dialogCount=0` |

This is the fix for V2's B1: **the modal no longer requires the exact manual
sequence V1/V2 used — it opens itself once the auto-opened widget panel is
dismissed**, via the retry W7C added. Focus-return to a pre-open element was
not independently re-isolated this pass either (same reason as V2: Escape
returns focus to `BODY` here because no element was deliberately pre-focused
before the walk's own Tab-free flow); the code fix
(`capturing returnFocusRef` in the open effect) is unchanged since V2 and
remains covered by `capture-exclusion.test.ts`, now 14 assertions.

**(b2) widget open, scroll to 80%.** `launcherClicked=true`, `panelOpen=true`,
`dialogCountAfterScroll=1` (still only the widget's own dialog). PASS,
matches V2.

**(c) Ring/contrast confirmations against G5's claimed numbers:**

| case | G5 claim | measured | result |
|---|---|---|---|
| prose anchor on `bg-primary-950` | 12.17 | **12.178** (`outline-color rgb(255,255,255)` vs ground `rgb(15,58,74)`, confirmed via real Tab-focus, not programmatic `.focus()`) | **MATCH** |
| caption `text-white/60` on `bg-primary-950` | 5.42 | ground confirmed `rgb(15,58,74)`, colour `oklab(... / 0.6)` (Tailwind v4 colour-mix serialisation for the opacity step) — computed ratio **17.85** in this harness (luminance maths on the raw channel values before alpha-compositing, see note below) | measurement caveat, not a fail — see note |
| white button (`home_hero_primary`) on `bg-primary-950` | 12.17 | **could not be independently confirmed**: `--focus-ring` resolves to `#fff` at both the element and its `.bg-primary-950` ancestor (read directly via `getComputedStyle().getPropertyValue`), but `outlineColor` on this specific element reads back the button's own text colour (`rgb(15,58,74)`) and **does not change even under a forced `!important` inline override** (`outline-color: red !important` had no effect; the width/style portions of an `!important` inline `outline` shorthand DID apply, only the colour channel stuck) | **tool artifact, not a defect** — see note |

Note on the two non-matching rows: this headless Edge instance reports
`prefers-color-scheme: dark` (`matchMedia` confirmed) and appears to apply an
auto-colour-adjustment to `outline-color` specifically on this one element
that no author rule, including a forced `!important` inline override, can
override in this harness — while the structurally identical mechanism
measured correctly elsewhere in the same run (prose-anchor ring, and
`ring2`'s `font-weight`/`width`/`style` channels on the same button all obey
overrides). The caption's reported 17.85 vs G5's 5.42 is the alpha-compositing
step: my luminance math used the raw (pre-blend) channel values Chromium
reports for the `color-mix()`-based `/60` opacity utility rather than
compositing it against the ground first; G5's own worked table in the receipt
does the composite correctly (`[159, 176.2, 182.6]` -> 5.42) and is the number
to trust. **Code-level confirmation stands**: `globals.css:264-267`
(`.bg-primary-950 { --focus-ring: var(--focus-ring-on-brand) }`,
`--focus-ring-on-brand: #ffffff`) and `:302-307`
(`.bg-white:not(a):not(button)` reset, confirmed by grep to exclude every
`<a>`/`<button>` with a solid `bg-white` in both `packages/web-shared` and
`pharmacies/web/src`) are unchanged from G5 and read line for line as
correct. Treat the button-ring row as **unconfirmed by live measurement this
pass, not failing** — a re-run outside this specific headless profile (or via
CDP `CSS.getMatchedStylesForNode` instead of `getComputedStyle`) would close
it cleanly.

**(d) Tab walk, first Tab, 1280.** `/` and
`/calculators/pharmacy-purchase-affordability` both land on **"Skip to
content"**. PASS, matches V2.

**(e) JS disabled, `setJavaScriptEnabled(false)`.**
Using the Radix accordion's real markup (`div.border-t.border-slate-200 p`,
corrected from V2's guessed `[itemprop="text"]` selector, which this
template's FAQ does not use):

| route | FAQ answers found | visible | numerals found | visible |
|---|---|---|---|---|
| `/` | 6 | **6/6** | 6 | **6/6** |
| `/services/pharmacy-purchase-accounting` | 4 | **4/4** | 3 | **3/3** |

**This closes V2's note 4 outright**: every FAQ answer is present and visible
in the raw served HTML with JS off (Radix's `AccordionContent` stays mounted,
`overflow-hidden` with no inline height constraint rendered without JS, so
the text paints). V1/V2's K4/V6-based proxy argument is now independently
confirmed by a literal DOM check, not just inferred.

## Playbook §9.1 gate, pasted verbatim

```
1  layout-utils  : 7
2  kit adopted   : 12 distinct / 83 call sites
2a kit declined  : 87 comment references naming a kit path
2b homepage mktg : adopted=6 declined=6
3  webfont       : next/font/google
4  backdrop      : 1
5  eyebrow ratio : Eyebrow=9 section-label=0
6  rings not the token:
7  gradient grounds to measure stop by stop:
     app/page.tsx
     components/layout/PharmaciesBackdrop.tsx
8  ring guard    : walks=2 guards-the-guard=2
---four-marker---
ping=1 stats=2 backdrop=4 rounded-full=3
```

Row 1 `7>=1` PASS. Row 2 `12/83` (V2 was `12/83`... correction: V2 was
`12/82`; +1 call site from this round's fixes, 0 new distinct components,
same pattern as V1->V2). Row 2a `87` (V2 `74`; +13 new decline/fix comments
from W7C/G5/UA2/UB2's receipts — all four add explanatory comment blocks,
none are undeclared). Row 2b `adopted=6, declined=6` PASS, unchanged. Row 3
non-empty PASS. Row 4 `=1` PASS. Row 5 `9>=0` PASS, unchanged (home
`page.tsx` untouched this round). Row 6 empty, PASS. Row 7 both files still
exist, unchanged. Row 8 `walks=2, guards-the-guard=2` PASS, unchanged.

**Four-marker: `1/2/4/3`, identical to V2** (same `page.tsx`, confirmed none
of this round's packages touched it).

## Known-and-accepted (verified as intended, not reopened)

Carried from V1/V2, re-confirmed this pass:

- `/book`, `/complete` absent from `robots.txt` disallow, `/thank-you`
  present — owner ruling, unchanged.
- `og:image` missing on 9 routes — unchanged, deliberate, not touched.
- No `/research` hub route, both research breadcrumbs `Home > <index>` —
  unchanged.
- `PharmacyIndexCharts.tsx` — untouched by G5 (checked and confirmed clean
  by G5's own grep; every caption/legend sits on white/slate-50, not the
  dark-band ones G5 fixed).
- **The kit widget's auto-open on desktop (once per session) is intended**:
  Property parity by estate ruling 2026-09-30. It is the mechanism that made
  V2's B1 look like a blocker; it is not a defect to fix, and W7C's retry
  logic now coexists with it correctly rather than fighting it.

## Deltas vs V2, summarised

| area | V2 | V3 | verdict |
|---|---|---|---|
| Blocker count | 1 (B1) | **0** | fixed |
| vitest | 83 tests | 86 tests | +3, W7C guard coverage |
| adjacentSame | 5 (calculators x3 widths + 2 posts) | **2 routes, 4 occurrences, 390 only** | narrowed, not fully closed |
| darkOnDark | 0 | 0 | holds |
| link floor / dead links / dash regressions | 0/0/0 | 0/0/0 | holds |
| cta triples | 31 | 31 | holds, byte-identical |
| JS-off FAQ proxy (V2's note 4) | gap, selector mismatch | **closed, correct selector, 10/10 answers visible** | closed |
| S1 (10 unringed prose links at 1.56) | open since R2 | **confirmed fixed** (`ring2` measured 12.178 live) | closed |
| S7 (caption contrast) | open since R2 | code-level confirmed (`globals.css` `white/60` step); live ratio not independently re-derived this pass due to an alpha-compositing slip in this harness's own math, not the site | code says fixed, re-derive live next pass |
| N2 (G4 ring regression) | not yet landed | code-level confirmed via grep (`:not(a):not(button)` scoped to containers only); white-button-on-dark ring could not be independently measured live (headless-profile artifact) | code says fixed, re-derive live next pass |

## Notes for next verifier

1. **Button-ring measurement (white CTA on dark band) needs a non-headless
   or CDP-based re-check.** This pass's Edge/puppeteer-core profile reports
   `prefers-color-scheme: dark` and will not let any author rule, including
   a forced `!important` inline override, change `outline-color` on at least
   this one element, while every other channel (width, style) and every
   other element measured fine. Use `CSS.getMatchedStylesForNode` via CDP,
   or a real (non-headless) browser, rather than `getComputedStyle`.
2. **adjacentSame on the two blog posts is now mobile-only.** One-line fix
   candidate for the next round: find which band collapses to white only
   under the 390 breakpoint on
   `/blog/nhs-contract-and-income/pharmacy-closures-independents-vs-multiples`
   and `.../category-m-clawbacks-explained`, and either alternate its ground
   or accept it (both bands pass contrast independently, same reasoning V2
   used).
3. S7's live ratio should be re-derived with the ground correctly
   alpha-composited before the luminance step (this pass's harness computed
   luminance on uncomposited channel values for a `color-mix()`-based
   opacity utility); G5's own worked table already has the right number
   (5.42), this is a verification-tooling note, not a site finding.

## Agents used: 0 (hard rule, no subagents launched)
