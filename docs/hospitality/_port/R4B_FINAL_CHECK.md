# R4b — final check after the R4 gap-fix

Checker: R4b, independent. Built none of it. Date 2026-09-29.
Under test: `next start` on `http://localhost:3202`, built from `95ce72a4`.
Identity asserted before any measurement:
`curl -s localhost:3202 | grep -o "<title>[^<]*</title>"` -> `<title>Specialist Hospitality Accountants UK</title>`.
Port 3203 never touched.

Read-only: no edits to site code, no commits, tags, builds, servers started or stopped, no
subagents. Git read-only from the monorepo root. Scratch under `scratchpad/r4b/`, deleted
after writing. `browser_check.mjs` deliberately NOT run (another site's review may hold it);
`sweep.mjs` and `cta_snapshot.mjs` run once each, never with `--save-baseline`. Widget checks
used `puppeteer-core` + Edge with real `page.keyboard.press` from `document.body`.

Under test: kit `20f48e9d` (GF8 modal-upgrade re-cut), site `95ce72a4`.

---

## A) VERDICT

**WAVE: PASS-WITH-GAPS.** One item open: the four insolvency stat captions moved from 3.29
to **4.25**, not to the 5.09 the fix commit records, and 4.25 is still under the 4.5 floor
for 14px text. Everything else R4 raised is closed against the rendered site, and no
regression was found in 978 links, 183 CTA tags, 202 JSON-LD blocks, 59 rendered pages,
138 tests or the prose freeze.

**WIDGET: PASS.** Both R4 blockers are closed on first measurement. The launcher is now
reachable by Tab (**83 presses on `/`, 43 on the tronc calculator**, against R4's `-1` in
420), the auto-opened panel is tabbed **through** (presses 80-82 on `/`, 40-42 on the
calculator) with `aria-modal` **never** flipping to `"true"`, and a deliberate open still
traps correctly. The widget is gone from the research embed route.

Two items stay recorded-not-fixed by the fix commit's own comments, both owner calls, both
unchanged here: the widget on the 404 page (W-G2) and the dead `text-slate-300` class on
five `Eyebrow onDark` call sites (D-N5).

---

## B) OPEN ITEMS

**1 | `hospitality/web/src/app/research/uk-hospitality-insolvency-index/page.tsx:141` |
the four stat captions are still under the 4.5 floor**
- Spec (R4 D-G4): 14px normal text on that band clears 4.5.
- Renders: `color` is `rgb(255, 255, 255)` on all four (the class change landed), but the
  ground is the `bg-white/10` card **over** `#b0532f`, measured by canvas readback of a real
  screenshot as **`rgb(184,100,68)`** on three cards and `rgb(181,98,66)` on the fourth.
  White there = **4.25** and **4.38**. Was 3.29. Floor 4.5.
- Severity: gap. Smallest text on the page, still short, and now recorded in the repo as
  passing.
- Minimal fix: take R4's other named option — drop the `bg-white/10` overlay on the four
  stat cards so the ground returns to `#b0532f`, where white measures **5.09**.

**2 | same file, `:135-140` (the fix's own comment) | a false number in the record**
- The comment says `"so it moves to full white = 5.09"`. 5.09 is white on the bare
  `#b0532f`. The captions sit on the `white/10` card the same comment names two lines
  earlier, so the achieved figure is 4.25.
- Severity: nit, but it is the number a future reviewer will trust.
- Minimal fix: correct the comment to `3.29 -> 4.25, still short of 4.5` when item 1 is
  addressed.

**3 | `hospitality/web/src/app/layout.tsx:164-177` | W-G2, the widget renders on the 404 page**
`curl -s :3202/no-such-page` -> status **404**, `data-cta="specialist_widget"` = **1**.
Recorded, not fixed, with a proposed kit fix written at the mount. Owner call. Unchanged.

**4 | five `Eyebrow onDark className="text-white"` call sites | D-N5, dead class**
Recorded, not fixed, kit-side change proposed in the comment at
`research/uk-hospitality-insolvency-index/page.tsx:208-217`. Outcome still right. Unchanged.

---

## C) CHECK TABLE

| # | check | command | decisive line | verdict |
|---|---|---|---|---|
| 0 | identity | `curl -s :3202 \| grep -o "<title>[^<]*</title>"` | `<title>Specialist Hospitality Accountants UK</title>` | ASSERTED |
| 1 | launcher reachable by Tab, `/` | real `page.keyboard.press("Tab")` from `document.body`, 1280, no programmatic focus | launcher is `document.activeElement` at press **83**. Panel controls touched at 80 (`×`), 81 (`Get in touch`), 82 (`Ask an accountant`) and **left** at 83. `aria-modal` read after every press: **`null` throughout, never `"true"`**. Was `-1` in 420. | **CLOSED (W-B1)** |
| 1 | launcher reachable by Tab, tronc calculator | same, `/calculators/tronc-tips-paye-nic-calculator` | launcher at press **43**; panel passed through at 40, 41, 42; `aria-modal` **`null` throughout**. Was `-1` in 420. | **CLOSED (W-B1)** |
| 1 | deliberate open still traps, both routes | click the launcher to close the auto-open, click again to open | `{aria-modal:"true", active:"BUTTON \| ×", inDialog:true}`. 8 forward Tabs: `Get in touch -> Ask an accountant -> × ->` repeating, **all inside**. 5 Shift+Tabs reverse, **all inside**. | PASS |
| 1 | Escape closes and returns focus | `Escape` after a click-open and again after an Enter-open | both routes, both paths: `{dialogPresent:false, active:"BUTTON[LAUNCHER] \| Ask an accountant", isLauncher:true}` | PASS |
| 2 | hidden on the research embed | `curl \| grep -c 'data-cta="specialist_widget"'` | `/research/hospitality-openings-closures-index/embed` status 200, widget **0**, chrome (`<header\|<footer\|<nav`) 0 | **CLOSED (W-B2)** |
| 2 | hidden on `/embed/<slug>` | same | `/embed/food-drink-vat-rate-checker` status 200, widget **0**, chrome 0 | PASS |
| 2 | `/admin/analytics/login` | same | status **200**, widget **0**, chrome 4 (the login page renders site chrome; `/admin` prefix suppresses the widget) | PASS |
| 2 | present on the research index | same | `/research/hospitality-openings-closures-index` status 200, widget **1** | PASS |
| 3 | openers, one per topic, rendered | fresh browser context per route, read `[role="dialog"]` innerText 2.8s after load | tronc service -> `"Want a hand checking your tronc is independent enough for the NIC treatment?"`; VAT hub -> `"Want me to open the rate checker for the food and drink VAT on your menu?"`; payroll service -> `"Want a hand working out what the April cost rises do to your rotas?"`; business-rates service -> `"Want a hand seeing whether Small Business Rate Relief applies to your site?"`; `/for/pubs-and-bars` -> `"Running a licensed site, shall I point you to the wet and dry margin pages?"`; MTD post -> `"Anything I can help you find on your accounts or your filing deadlines?"`; `/` -> `"Not sure what you are looking for, shall I point you to the right tool?"`; tronc calculator -> `"Want me to pull up the tool that runs the PAYE and NIC on tronc and tips?"` | **CLOSED (W-G1)** |
| 3 | every line one sentence, verbatim, under 20 words | `grep -c -F` each rendered line in `opener.ts`; terminator and word count | **8 of 8 verbatim = 1 hit each. 8 of 8 exactly one terminator. Longest 17 words.** | PASS |
| 3 | no "free", no fee, no promise beyond 24 hours | `grep -n -iE '\bfree\b\|\bfee\b\|£\|pricing\|chartered\|qualified\|regulated' opener.ts` | 3 hits, **all three inside the LOCKED voice-rule docstring** (`:15`, `:17`, `:19`). Zero in any authored string. Panel header renders the site's own `"We reply within 24 hours"`. | PASS |
| 3 | used-calculator opener | synthetic input on 3 calculator fields, 4s settle | opener unchanged (`tronc[0]`). The used-calc ladder did not fire from synthetic input events; **not exercised**, not a defect found. | NOT EXERCISED |
| 4 | seam, 17 dark-closing routes | scroll to the footer, full screenshot, canvas `getImageData` at x=640, y-3..y+3 of `footer.getBoundingClientRect().top` | `/for`, `/services`, `/blog`, `/research`, `/about`, `/calculators`: closing `section.relative.overflow-hidden.bg-slate-900` = **rgb(15,23,43)**, then exactly **one row of rgb(29,41,61)** (slate-800, the new `span[aria-hidden].h-px`), then **rgb(15,23,43)** footer. Identical on all six. | **CLOSED (D-G3)** |
| 4 | seam, `/` and `/for/pubs-and-bars` | same | **Both close LIGHT, not dark.** `/` closing = `rgb(250,250,249)` (`--surface-warm-alt`), `/for/pubs-and-bars` = `rgb(250,250,247)` (`--surface-warm`). Pixels: light, light, light, **rgb(29,41,61)**, then rgb(15,23,43). The hairline is present on every route; on these two it reads as a normal light-to-dark edge. | PASS (see false premise FP1) |
| 4 | does it read as a seam | contrast of the hairline against the two grounds | On the dark routes slate-800 on slate-900 is **1.23:1**. It is a real, single, correctly placed 1px line, but at 1.23:1 it is a hint rather than a rule. It removes the "one continuous block" reading only just. Honest call: **closed as specified, visually marginal.** | NOTED |
| 5 | insolvency stat captions | computed `color` + canvas readback of the card ground on a real screenshot | four captions, all `mt-1 text-sm text-white`, computed `color` = **`rgb(255, 255, 255)`** (was `text-white/80`). Ground measured **`rgb(184,100,68)`** x3 and `rgb(181,98,66)` x1 -> **4.25 / 4.38**, not 5.09. Floor 4.5. | **PARTIAL — open item 1** |
| 6 | sweep dead links | `sweep.mjs --site=hospitality --base=:3202 --article-depth=3 --out=<scratch>` | `59/59 URLs clean, 0/3 internal links dead, 0 LINK-FLOOR breaches (978 links total), 0 data-cta regressions (183 total), 0 dash regressions (0 total)`. `deadLinks: []`. | PASS |
| 6 | link floor per route vs baseline | per-route diff of `sweep.json.links` against `sweep_baseline.json` (`sha eeb3dbef`) | 59 routes both sides, **0 routes below baseline**, 0 routes missing. Totals 978 vs 667. | PASS |
| 6 | CTA header triple | `cta_snapshot.mjs --site=hospitality --base=:3202 --out=<scratch>` | `header_book\|header\|form\|data-cta -> 59`. 59 routes, 183 tags, 12 distinct triples, identical to R4's census. | PASS |
| 6 | tests and types | `cd hospitality/web && npx tsc --noEmit; npm test` | `tsc` no output, **exit 0**. `Test Files 10 passed (10) / Tests 138 passed (138)`. Was 135; +2 opener sentence/word tests, +1 widget-config embed test. | PASS |
| 6 | em-dashes and pipeline artefacts | `curl` all 59 sitemap URLs, byte scan | U+2014 **0 files**, U+2013 **0 files**, `[object Object]` 0, `(HP` 0, `verify at build` 0, `&lt;a href` 0, `NaN` 0, `undefined<` 0, `TODO` 0. | PASS |
| 6 | JSON-LD parses | `json.loads` every `<script type="application/ld+json">` on 10 sampled routes | **31 blocks, 0 parse failures.** `BreadcrumbList` exactly 1 on 9 of 10, **0 on `/`** (correct, no trail on the homepage). | PASS |
| 6 | prose freeze, source, `95ce72a4^..95ce72a4` | `git diff -U0 ... -- hospitality/web/src hospitality/niche.config.json`, removed lines with comments filtered out | **21 removed non-comment lines: 16 widget opener strings, 2 `exitOpener` template returns, 1 `hiddenOnPaths` array, 2 test lines, and 1 JSX line whose only change is `text-white/80` -> `text-white`.** No published site sentence changed. `niche.config.json` untouched. | PASS |
| 6 | prose freeze, rendered | `grep -l -F` each of the 16 removed opener strings over all 59 saved pages | **0 files each.** The only visible delta on the corpus is the widget opener config, which is not page prose. | PASS |
| 6 | no new console errors | console + pageerror listeners on 5 routes, with a close, a re-open and an Escape on each | **2 errors per route, identical everywhere: the known AdSense `frame-src` CSP refusal (H14). 0 page errors. 0 widget-sourced errors.** Same as R4. | PASS |
| 7 | four-marker homepage row | R2's stated method: `animate-ping`/`rounded-full` on the rendered HTML, `StatsCounter`/`Backdrop` on the comment-stripped `src/app/page.tsx` | **ping=2 stats=3 backdrop=5 rounded-full=23** (217,194 bytes). R2 recorded `2/1/5/22`; `page.tsx` is byte-unchanged since `a045e4a3`, so R2's `stats=1` is not reproducible by its own command (see FP3). `rounded-full` 22 -> 23 is the widget launcher. Pre-port 0/0/0/0. Property 1/2/3/4, generalist 1/2/3/4, startups-tech 1/3/3/4. | RECORDED |

### Gate 9.1, rows as written (block run verbatim from the monorepo root, `DIR=hospitality`)

| # | row | number |
|---|---|---|
| 1 | `layout-utils` | **6** |
| 2 | kit adopted | **10 distinct / 64 call sites** (generalist 16/142, uplifted crypto 6/18) |
| 2a | kit declined | **36** comment references naming a kit path |
| 2b | homepage mktg | adopted=**4** declined=**4** |
| 3 | webfont | `next/font next/font/google` |
| 4 | backdrop | **1** |
| 5 | eyebrow ratio | `Eyebrow=6 section-label=0` |
| 6 | rings not the token | **none** (empty) |
| 7 | gradient grounds | `app/page.tsx`, `components/layout/HospitalityBackdrop.tsx` |
| 8 | ring guard | `walks=2 guards-the-guard=2` |

Every row passes. Rows 1, 2, 3, 4, 5, 6 and 8 are unchanged from R4; nothing in `20f48e9d`
or `95ce72a4` touches the adoption surface.

---

## FALSE PREMISES

**FP1 — "screenshot the closing panel to footer boundary on `/for/pubs-and-bars` and `/` and
expect the panel `#0f172b`".** Neither of those two routes closes dark. `/` closes on
`section.border-t.border-slate-200.bg-[var(--surface-warm-alt)]` = `rgb(250,250,249)` and
`/for/pubs-and-bars` on `bg-[var(--surface-warm)]` = `rgb(250,250,247)`. The dark-on-dark
seam D-G3 recorded is on the OTHER routes (`/services`, `/for`, `/blog`, `/calculators`,
`/research`, `/about`, the category hubs, two research details, two posts). I measured six of
those as well, and that is where the expected `#0f172b` / slate-800 / `#0f172b` triple is
confirmed.

**FP2 — "captions ... ratio on `#b0532f` 5.09".** The captions are not on `#b0532f`. They sit
inside `div.rounded-xl.border.border-white/15.bg-white/10.p-5`, whose composited ground
measures `rgb(184,100,68)`. Full white on that is **4.25**, not 5.09, and still under the 4.5
floor. 5.09 is the eyebrow figure (white on the bare `#b0532f`). The fix commit's own comment
repeats the same mistake. This is open item 1.

**FP3 — R2's four-marker `stats=1` is not reproducible.** `page.tsx` is byte-identical to
`a045e4a3` (no commit since has touched it), and its own stated command
(`perl -0pe 's{/\*.*?\*/}{}gs; s{//[^\n]*}{}g' src/app/page.tsx | grep -o 'StatsCounter'`)
returns **3** (import, open tag, close tag). The row is 2/3/5/23, not 2/1/5/23. Nothing
regressed; R2 undercounted.

**FP4 — "R4 measured -1 in 420" is TRUE and now closed.** Confirmed by re-measuring the same
way: 83 and 43, `aria-modal` never `"true"` during the pass-through.

**FP5 — "`npm test` 138/138" is TRUE**, up from R4's 135; the three new tests are the two
opener voice assertions and the widget-config embed-suppression assertion.
