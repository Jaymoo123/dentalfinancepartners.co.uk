# P0D — instrument baseline, pharmacies

Captured 2026-10-07 against `http://localhost:3111` (`next start`, title
"Pharmacy Tax | Specialist Accountants for UK Pharmacy Owners", asserted
before every run — present, matches the brief). Production SHA `981a604e`
(deployed 2026-09-23). Local HEAD `110643de7` is **7 commits ahead** of
`981a604e` — production is older than this build.

## Commands run and exit codes

1. `node docs/_engines/instruments/sweep.mjs --site=pharmacies --base=http://localhost:3111 --sha=981a604e --article-depth=3 --save-baseline --out=<scratch>\sweep_out.json`
   Exit 0. Baseline written (`sweep_baseline.json`: 813 internal links, 165
   data-cta, 0 dashes across 55 URLs). Same documented trap: the `--out`
   detail file did not land alongside `--save-baseline` on the first pass.
   Rerun **without** `--save-baseline`, same flags plus `--out`, exit 0,
   identical totals, produced the detail JSON used below.
2. `node docs/_engines/instruments/browser_check.mjs --site=pharmacies --base=http://localhost:3111 --save-baseline --grounds --shots=<scratch>\shots --out=<scratch>\browser_out.json`
   Passed `timeout: 600000`, `run_in_background` not set. The Bash tool moved
   it to background anyway once it passed 600s — same tool-level behaviour
   the hospitality baseline recorded (not something this agent chose). Polled
   the background output until it finished: **exit 0**, baseline written. No
   second run was started, so there is no clobber risk this time. Self-test
   passed (`slate500OnWhite=4.76`, `slate400OnWhite=2.56`, matches the
   README's corrected figures), and the in-page grounds discovery self-test
   and the two near-identical/contrast-pair fixture checks also passed.
3. `node docs/_engines/instruments/cta_snapshot.mjs --site=pharmacies --base=http://localhost:3111 --out=<scratch>\cta_out.json`
   Exit 0. No `--save-baseline` flag on this instrument (confirmed again) —
   the `--out` file was copied by hand to
   `docs/pharmacies/_port/cta_baseline.json`.

## sweep.mjs — 55 URLs (33 core + 22/22 sampled articles)

Link floor per URL family (unique same-site `<a href>` count; min / median / max):

| family | n | min | median | max |
|---|---|---|---|---|
| `/` | 1 | 25 | 25 | 25 |
| `/about` | 1 | 10 | 10 | 10 |
| `/contact` | 1 | 10 | 10 | 10 |
| `/privacy-policy` | 1 | 10 | 10 | 10 |
| `/cookie-policy` | 1 | 10 | 10 | 10 |
| `/terms` | 1 | 10 | 10 | 10 |
| `/services` (index) | 1 | 18 | 18 | 18 |
| `/services/*` (8) | 8 | 10 | 10 | 10 |
| `/for` (index) | 1 | 15 | 15 | 15 |
| `/for/*` (5) | 5 | 13 | 15 | 17 |
| `/calculators` (index) | 1 | 13 | 13 | 13 |
| `/calculators/*` (3) | 3 | 11 | 11 | 11 |
| `/research/*` (2) | 2 | 14 | 16 | 18 |
| `/blog` (index) | 1 | 37 | 37 | 37 |
| `/blog/nhs-contract-and-income` | 1 | 17 | 17 | 17 |
| `/blog/buying-a-pharmacy` | 1 | 17 | 17 | 17 |
| `/blog/locum-pharmacists` | 1 | 13 | 13 | 13 |
| `/blog/selling-a-pharmacy` | 1 | 13 | 13 | 13 |
| `/blog/vat-and-retail-schemes` | 1 | 12 | 12 | 12 |
| `/blog/nhs-contract-and-income/*article*` | 7 | 14 | 14 | 23 |
| `/blog/buying-a-pharmacy/*article*` | 7 | 16 | 17 | 22 |
| `/blog/locum-pharmacists/*article*` | 3 | 14 | 14 | 15 |
| `/blog/selling-a-pharmacy/*article*` | 3 | 14 | 16 | 16 |
| `/blog/vat-and-retail-schemes/*article*` | 2 | 14 | 15 | 15 |

**Five lowest-floor URLs**: `/about`, `/contact`, `/privacy-policy`,
`/cookie-policy`, `/terms`, plus all 8 `/services/*` detail pages — all tied
at 10. Expected shape for legal/contact/service-detail pages on this site
(unlike hospitality's chrome-only tie); flag for parity check only, not a
defect.

**Non-200 / redirects**: none (55/55 clean, instrument's own summary line).
**Same-origin hrefs that don't resolve**: **0** (`deadLinks: []`). sweep's own
line: `0/2 internal links dead` (only 2 external-looking targets were
sampled for the dead-link check; both resolved).
**JSON-LD parse failures**: none observed (no `fails` entries on any result).
**Pipeline artefacts**: **0** across all 55 URLs.
**Em/en dashes (body text)**: 0 across all 55 URLs.
**`data-cta` count**: 165 total (3 per URL x 55 URLs, consistent).

Total internal links swept: 813. First capture (no prior baseline), so the
"0 regressions" in the instrument's summary line means nothing more than "no
baseline existed yet to regress against."

## browser_check.mjs — widths 390/768/1024/1440, 35 distinct routes (140 route×width entries), `--grounds` on

Self-test: passed (both known contrast pairs, plus the grounds discovery
self-test and near-identical/dark-on-dark fixture checks embedded in every
entry).

**Horizontal overflow at 390**: **0** offenders, any width (`overflow: []`
on all 140 entries).

**Contrast failures below floor**: **29** individual node failures, confined
to **7 of 140** (route, width) entries — all at widths 390/768/1024, **all on
exactly two routes**, both chart-caption footnotes on the `/research/*`
index-detail pages:

| route | nodes | ratio | floor |
|---|---|---|---|
| `/research/pharmacy-density-and-workload-index` | 5 distinct text nodes (source/methodology captions + an axis-index label) | 2.48 / 2.58 | 4.5 |
| `/research/pharmacy-openings-closures-index` | 3 distinct text nodes (source caption, a chart-source link, a methodology caption) | 2.48 / 2.58 | 4.5 |

No contrast failures on 1440, and none anywhere outside these two chart
footnote blocks (not header/footer chrome, not CTAs, not body copy) — a
narrow, contained defect rather than an estate-wide one like hospitality's
white-on-white "Get in touch" link.

**Missing `scroll-margin-top`**: **8** anchor gaps, all on one route —
`/blog/nhs-contract-and-income/pharmacy-closures-independents-vs-multiples`,
both `#ref-1` and `#ref-2` at all 4 widths (`scroll-margin-top=0px`, want
>= 96px / `scroll-mt-24`). No other route/width carries an anchor gap.

**Heading typography**: h1 across routes shows two weight/size families —
`700/36px/39.6px` and `700/48px/52.8px-60px` on most pages, but a handful of
entries log `600` weight at the same font-size/line-height pairs (`600/30px`,
`600/36px`, `600/48px`) rather than `700`. Noted as a pattern to watch during
phase 1 (is this a deliberate secondary heading style or drift), not asserted
as a defect — no prior baseline exists to diff against yet.

**Console/page errors and failed requests**: 152 noise entries, four kinds:
- `console: Framing ... violates ... Content Security Policy` (Google
  AdSense/DoubleClick frame-src) — **140** entries, present on essentially
  every route/width; a live CSP configuration note, not a functional break.
- `console: Error: <rect> attribute y/height: Expected length, "NaN"` — **8**
  entries (2 distinct SVG attribute errors x 4 widths), all on
  `/research/pharmacy-openings-closures-index` only — a live chart-rendering
  defect on that one page, reproducing at every width.
- `navigation: Navigation timeout of 60000 ms exceeded` — **3** occurrences,
  scattered: `/blog/vat-and-retail-schemes` (390), `/services/pharmacy-vat-retail-schemes`
  (1024), `/research/pharmacy-openings-closures-index` (1440). No route/width
  repeats; record only, not a confirmed defect without an isolated rerun.
- `console: Connecting to 'https://csi.gstatic.com/csi...'` — 1 entry, benign
  Google telemetry ping.

140 entries also carry a benign `unrendered` flag
(`nav.hidden.items-center.gap-6.lg:flex (+6)`) — the desktop nav collapsing
under its own `hidden`/`lg:flex` classes at non-desktop widths, which is
correct responsive behaviour, not a defect; listed here only so it is not
mistaken for a missed-render finding later.

**Grounds** (`--grounds`, section-ground breaches): **0** breaches on every
entry. `darkOnDark: false` throughout. No `adjacentSame` near-identical bands
were logged on this site's sampled routes.

**Non-200 statuses**: every entry besides the 3 timeout cases above reports
`304` (conditional-GET cache revalidation under repeated local crawling, not
an HTTP error) or `200`.

## cta_snapshot.mjs

55 routes scanned, **165 `data-cta` tags found, 3 distinct triples** (all
server-rendered, no `--save-baseline` on this instrument):

| id | placement | goal | href | count |
|---|---|---|---|---|
| `header_contact` | `header` | `null` | `/contact` | 55 |
| `sticky_cta` | `sticky` | `null` | `/contact` | 55 |
| `sticky_cta_close` | `sticky` | `null` | (none) | 55 |

`non_interactive_ctas`: **0** (empty array in the JSON).

## Funnel evidence (read-only grep, GA4/Supabase pulls out of scope)

`grep -o 'data-cta[^>]*' pharmacies/web/src` (source) surfaces **5** distinct
`data-cta`/`data-cta-placement` identifiers, two more than the two
instruments see server-side:

| identifier | source |
|---|---|
| `header_contact` | seen by both instruments, 55/55 routes |
| `sticky_cta` | seen by both instruments, 55/55 routes |
| `sticky_cta_close` | seen by both instruments, 55/55 routes |
| `header_contact_mobile` | **not** in sweep/cta_snapshot output — mobile drawer only |
| `thankyou-return-article` | thank-you page only, not crawled by either instrument's route set |

`grep -o 'data-cta[^"]*"[^"]*"' pharmacies/web/.next/static/chunks/*.js`
returned **nothing** — the brief's own suggested glob misses the mobile CTA.
Widening the search to the actual chunk that holds it
(`pharmacies/web/.next/static/chunks/app/layout-61f40e4e9e6c5974.js`, plus
server chunk `8715.js`) confirms `header_contact_mobile` (placement
`header_mobile_menu`) is real and compiled into the client bundle — it is a
mobile-drawer-only CTA, invisible to sweep.mjs and cta_snapshot.mjs because
both read the server-rendered DOM and the drawer only mounts its content on
client interaction. Form mounts: `MiniCapture.tsx` (calculator pages),
`DetailsForm.tsx`, `LeadForm.tsx` (contact/lead capture) — not separately
instrumented with `data-cta`.

GA4 and Supabase pulls are explicitly out of this package's scope.

## What phase 1 must reproduce byte-for-byte

The exact CTA triples phase 1's rebuild must not alter in id, placement, or
goal (trap 22):

1. `header_contact|header|null -> /contact` (55/55 routes)
2. `sticky_cta|sticky|null -> /contact` (55/55 routes)
3. `sticky_cta_close|sticky|null -> (no href)` (55/55 routes)
4. `header_contact_mobile|header_mobile_menu|null -> /contact` (client-only,
   mobile drawer; not visible to either instrument, confirmed by source +
   client-bundle grep — phase 1 must re-verify this one by hand, it will not
   show up in a byte-diff of either baseline JSON)
5. `thankyou-return-article` (thank-you page, outside the crawled route set)

## Ranked findings

**Serious**
1. 8 SVG `<rect>` render errors (`attribute y/height: Expected length, "NaN"`)
   on `/research/pharmacy-openings-closures-index`, every width — a live
   chart-rendering defect, not noise.
2. 29 contrast failures (ratio 2.48/2.58 vs floor 4.5) confined to chart
   source/methodology captions on the two `/research/*` index pages.

**Minor**
3. 8 missing-`scroll-margin-top` anchor gaps, both refs, all 4 widths, on one
   blog article only.
4. 3 scattered navigation timeouts, no repeat pattern — record only, likely
   load contention, not confirmed without an isolated rerun.
5. A client-only mobile-drawer CTA (`header_contact_mobile`) that neither
   instrument can see — must be checked by hand in phase 1, not just diffed.
6. h1 weight inconsistency (600 vs 700 at matching size/line-height) on some
   routes — flagged to watch, not asserted as a defect absent a prior
   baseline.

**Clean**: 0 pipeline artefacts, 0 em/en dashes, 0 dead links, 0 overflow at
any width, 0 grounds breaches, 0 non_interactive_ctas, 0 link-floor
ambiguity beyond the expected legal/service-detail tie.

## Instrument-failure honesty check

No instrument failed. Both documented quirks reproduced exactly as the
hospitality handoff predicted (`--out` vs `--save-baseline` ordering on
sweep; no `--save-baseline` on cta_snapshot). The Bash-tool
foreground/background behaviour on `browser_check.mjs` also reproduced
exactly as hospitality described, with no concurrent-run risk this time
because only one browser_check invocation was ever started.
