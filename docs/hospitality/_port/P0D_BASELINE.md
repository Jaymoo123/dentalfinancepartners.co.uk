# P0D — instrument baseline, hospitality

Captured 2026-09-29 against `http://localhost:3202` (`next start`, title
"Specialist Hospitality Accountants UK", asserted before every run — present,
matches the brief). Production SHA `eeb3dbef` = `origin/main`. Local HEAD
(`7e2575c4`) is **97 commits ahead** of `eeb3dbef` — production is older than
this build, as the brief said.

## Commands run and exit codes

1. `node docs/_engines/instruments/sweep.mjs --site=hospitality --base=http://localhost:3202 --sha=eeb3dbef --article-depth=3 --save-baseline --out=<scratch>\sweep_out.json`
   Exit 0. Baseline written (`sweep_baseline.json`: 667 internal links, 59
   data-cta, 0 dashes across 59 URLs). Same trap as the startups-tech run: the
   `--out` detail file did not land alongside `--save-baseline` on the first
   pass (Windows-path/Node interaction, root cause not isolated). Rerun
   **without** `--save-baseline`, same flags plus `--out`, reproduced identical
   totals and produced the detail JSON (dead links, per-URL link lists,
   artefacts, fails) used below. Baseline content itself is unaffected — the
   `--save-baseline` write succeeded on the first pass.
2. `node docs/_engines/instruments/browser_check.mjs --site=hospitality --base=http://localhost:3202 --save-baseline --shots=<scratch>\shots --grounds --out=<scratch>\browser_out.json`
   Ran once; the Bash tool's own 120s default silently moved it to background
   before it had produced output (not something this agent chose — no
   `run_in_background` was passed). Confirmed via the task's own completion
   notification that it finished with **exit 0** and had already written the
   baseline. A second foreground attempt (600000 ms timeout, per the brief)
   was started before that notification arrived and was **killed immediately**
   once the first run's completion was confirmed, to avoid two concurrent runs
   racing the same `browser_baseline.json` — the README's own "two concurrent
   runs clobber each other" warning. Only one `browser_baseline.json` exists,
   timestamped from the first (real) run; no corruption. Self-test passed
   (`slate500OnWhite=4.76`, `slate400OnWhite=2.56`, matches the README's
   corrected figures) — and the grounds discovery self-test and the two
   near-identical/contrast-pair checks inside it also passed.
3. `node docs/_engines/instruments/cta_snapshot.mjs --site=hospitality --base=http://localhost:3202 --out=<scratch>\cta_out.json`
   Exit 0. **No `--save-baseline` flag on this instrument** (confirmed again,
   same as startups-tech) — the `--out` file was copied by hand to
   `docs/hospitality/_port/cta_baseline.json`.

## sweep.mjs — 59 URLs (36 core + 23/23 sampled articles)

Link floor per URL family (unique same-site `<a href>` count; min / median / max):

| family | n | min | median | max |
|---|---|---|---|---|
| `/` | 1 | 21 | 21 | 21 |
| `/about` | 1 | 6 | 6 | 6 |
| `/contact` | 1 | 6 | 6 | 6 |
| `/privacy-policy` | 1 | 6 | 6 | 6 |
| `/cookie-policy` | 1 | 6 | 6 | 6 |
| `/terms` | 1 | 6 | 6 | 6 |
| `/services` (index) | 1 | 11 | 11 | 11 |
| `/services/*` (5) | 5 | 11 | 12 | 13 |
| `/for` (index) | 1 | 12 | 12 | 12 |
| `/for/*` (6) | 6 | 13 | 13 | 13 |
| `/calculators` (index) | 1 | 9 | 9 | 9 |
| `/calculators/*` (3) | 3 | 7 | 7 | 7 |
| `/research` (index) | 1 | 9 | 9 | 9 |
| `/research/*` (3) | 3 | 7 | 7 | 7 |
| `/blog` (index) | 1 | 37 | 37 | 37 |
| `/blog/hospitality-accounts` | 9 | 7 | 14 | 21 |
| `/blog/licensed-trade` | 5 | 10 | 11 | 14 |
| `/blog/hospitality-vat` | 5 | 9 | 11 | 15 |
| `/blog/business-rates` | 3 | 8 | 11 | 13 |
| `/blog/tips-and-tronc` | 3 | 8 | 12 | 15 |
| `/blog/payroll-and-employment` | 2 | 7 | 13 | 13 |
| `/blog/capital-allowances` | 2 | 7 | 11 | 11 |
| `/blog/making-tax-digital` | 2 | 7 | 9 | 9 |

**Five lowest-floor URLs**: `/about`, `/contact`, `/privacy-policy`,
`/cookie-policy`, `/terms` — all tied at 6, all legal/contact-shaped pages
(not `/about`/`/contact` at 0 like startups-tech; hospitality's chrome links
from these pages). Flag for parity check only, not a defect on its own.

**Non-200 / redirects**: none among the 59 crawled URLs (all 59/59 clean per
the instrument's own summary line).
**JSON-LD parse failures**: none.
**Pipeline artefacts**: **0** across all 59 URLs (`artefacts: []` on every result).
**Em/en dashes (body text)**: 0 across all 59 URLs (`totalDashes: 0`).
**Same-origin hrefs that don't resolve**: **3 of 6** sampled internal link
targets are dead — all three are calculator hrefs using a shorter slug than
the actual route:
  - `/calculators/tronc-tips-paye-nic` -> HTTP 404 (actual route:
    `/calculators/tronc-tips-paye-nic-calculator`)
  - `/calculators/food-drink-vat-checker` -> HTTP 404 (actual route:
    `/calculators/food-drink-vat-rate-checker`)
  - `/calculators/staff-cost-rota-margin` -> HTTP 404 (actual route:
    `/calculators/staff-cost-rota-margin-calculator`)

  All three are linked from the homepage (confirmed in `results["/"].links`)
  and reproduced independently by `browser_check.mjs`, which logged the same
  three paths as 404s on Next.js RSC prefetch (`?_rsc=...`) at every width —
  two instruments agreeing this is a live defect, not a crawl artefact.

Total internal links swept: 667. 0 link-floor regressions, 0 data-cta
regressions, 0 dash regressions (first capture, so nothing to regress against
— the summary line's "0 regressions" language does not mean "0 problems",
just "no baseline yet to compare to").

## browser_check.mjs — widths 390/768/1024/1440, 38 distinct routes (152 route×width entries), `--grounds` on

Self-test: passed (contrast maths verified against the two known pairs, plus
the grounds discovery self-test and near-identical/dark-on-dark fixture
checks embedded in every entry, all passing).

**Trap carried forward from the startups-tech handoff**: a 390px **window
size** is not mobile device emulation. Reading the instrument's source
(`docs/_engines/instruments/browser_check.mjs`), the "mobile" label at 390 is
a Puppeteer `setViewport({width:390, ...})` call on the same desktop Chromium
— no UA override, no touch-event injection, no device-pixel-ratio change. The
390 column tells you about layout at that width, nothing about touch
targets, mobile UA-gated content, or real-device rendering.

**Horizontal overflow at 390**: **0** offenders, any width (`overflow: []`
on every one of the 38 routes).

**Contrast failures below floor**: **235** individual node failures across
**145** of 152 (route, width) pairs — i.e. almost every route/width
combination fails at least one node. Four repeating signatures, all
site-wide chrome elements (header/footer), not confined to one page family
the way startups-tech's were:

| signature | count | ratio | floor | detail |
|---|---|---|---|---|
| `a "Get in touch"` | 74 | **1.00** | 4.5 | white text (`rgb(255,255,255)`) on white — effectively invisible header/footer CTA link, present on nearly every route at 768/1024/1440 |
| `button "Do not track me"` | 145 | 2.47 | 4.5 | `oklch(0.708 0 0)` grey-on-white, cookie-consent control, present on every route at every width |
| `p "Step 1 of 2 · About you"` | 8 | 4.50 | 4.5 | `oklch(0.556 0 0)`, embedded lead-capture form step label, on the 3 `/research/*` index-detail routes, right at the floor (borderline pass/fail depending on rounding) |
| `span "(optional)"` | 8 | 4.50 | 4.5 | same form, same routes, same borderline ratio |

**Top of the list by ratio**: the 74 "Get in touch" white-on-white failures
all tie at ratio 1.00 (worst possible) — occurring on `/`, `/services`,
`/for`, `/blog`, `/calculators`, `/research`, all three `/research/*` detail
pages, `/about`, `/contact`, and more, at 768/1024/1440 (not present at 390,
where this element is presumably hidden/collapsed into a drawer). Listing 10
of the affected routes: `/`, `/services`, `/for`, `/blog`, `/calculators`,
`/research`, `/research/uk-hospitality-insolvency-index`,
`/research/uk-hospitality-food-hygiene-map`,
`/research/hospitality-openings-closures-index`, `/about` — same colour pair
(`white on white`), same element (`a`) throughout.

**Missing `scroll-margin-top`**: **0** anchor gaps (`anchorGaps: []` on every
entry) — no anchor-scroll defect on this site's crawlable surface, unlike
startups-tech's 32.

**Grounds** (`--grounds`, section-ground breaches): **0** breaches. 4
`adjacentSame` entries were logged (e.g. `rgb(250,250,250)` following
`rgb(250,250,249)`, distance 1.42) but all sit well under the instrument's
own 3.0 near-identical threshold — per the README's own `/near-identical`
fixture case, these correctly collapse into one band and are not a defect.
`darkOnDark: false` on every entry.

**Console/page errors and failed requests**: **171** noise entries, three
kinds:
- `console: Framing ... violates ... Content Security Policy` (Google
  AdSense/DoubleClick frame-src) — the overwhelming majority (164 minus the
  12 below), present on essentially every route/width, a live CSP
  configuration note rather than a functional break.
- `console: Failed to load resource: 404` — **12** entries (3 distinct
  targets × 4 widths), the same three dead calculator hrefs found by
  `sweep.mjs` above, surfacing here as failed Next.js RSC prefetches on `/`.
- `navigation: Navigation timeout of 60000 ms exceeded` — **7** occurrences,
  scattered across `/research/hospitality-openings-closures-index` (390,
  768), `/cookie-policy` (390, 768), `/contact` (768),
  `/services/toms-advice` (1024), `/for/cafes-and-coffee-shops` (1024). No
  single route/width repeats across both runs of this instrument, and other
  agents were hitting the same local server concurrently — record, do not
  treat as a confirmed defect without an isolated rerun.

No React hydration errors (`Minified React error #418` or similar) were
found anywhere in this build, unlike startups-tech's three `/research/*`
pages.

## cta_snapshot.mjs

59 routes scanned, **59 `data-cta` tags found, 1 distinct triple**:
`header_book|header|form` (id `header_book`, placement `header`, goal
`form`), present on every one of the 59 routes. **0 routes with zero
`data-cta`** — unlike startups-tech, this site already has header CTA
instrumentation everywhere it was crawled, and it is a single consistent
triple, not a mix. `non_interactive_ctas` not flagged in the console summary
(only one attr/count line printed: `header_book|header|form|data-cta -> 59`).

## Ranked findings

**Serious**
1. 74 white-on-white "Get in touch" contrast failures (ratio 1.00, floor 4.5)
   across most routes at 768/1024/1440 — a live, effectively-invisible header
   CTA link on the current build.
2. 3 dead calculator hrefs on the homepage (`/calculators/tronc-tips-paye-nic`,
   `/calculators/food-drink-vat-checker`, `/calculators/staff-cost-rota-margin`)
   — short-slug variants of the real routes, 404 confirmed two ways (sweep's
   HTTP check and browser_check's RSC-prefetch console noise).
3. 145 "Do not track me" contrast failures (ratio 2.47, floor 4.5) on every
   route at every width — cookie-consent control text under floor site-wide.

**Minor**
4. 16 borderline contrast entries (`Step 1 of 2 · About you`, `(optional)`)
   at exactly ratio 4.50 against a 4.5 floor on the 3 `/research/*` detail
   pages — right at the edge, worth a rounding check rather than a rewrite.
5. 7 scattered `Navigation timeout` entries, no repeat pattern across
   route/width — record only, likely load contention from concurrent agents
   on the shared local server.
6. `/about`, `/contact`, `/privacy-policy`, `/cookie-policy`, `/terms` tied
   at the lowest link floor (6) — expected shape for legal/contact pages,
   flag for parity check only.

**Clean relative to the startups-tech baseline**: 0 pipeline artefacts, 0
em/en dashes, 0 anchor gaps, 0 overflow at 390, 0 grounds breaches, 0 React
hydration errors, 0 routes with zero `data-cta`.

## False premises in this brief

1. The brief's instrument-order step 2 instructs running `browser_check.mjs`
   "in the FOREGROUND with a long timeout (600000 ms), never in the
   background" as if that is fully within this agent's control. In practice
   the Bash tool itself silently moves any command exceeding its own default
   120s window to the background regardless of intent — no
   `run_in_background` flag was passed, and none of the instructions
   available to this agent prevent that reclassification. The 600000 ms
   `timeout` parameter on a second attempt did not stop the same thing
   happening at 600s either. This is a tool-level behaviour, not something
   fixable by the agent following the brief more carefully; the practical
   effect (confirmed by the task's own completion notification, exit 0) was
   the same as an intended foreground run — baseline written correctly, no
   corruption — but the letter of the instruction could not be honoured as
   written.
2. Otherwise no false premises: production SHA, title assertion, all three
   instrument flag names, the `cta_snapshot.mjs` `--save-baseline` absence,
   and the Windows-path `--out`/`--save-baseline` interaction all matched the
   shape template exactly.
