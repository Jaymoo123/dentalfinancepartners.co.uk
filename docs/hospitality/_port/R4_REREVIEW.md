# R4 — independent re-review after the gap-fix and the help widget mount

Reviewer: R4, independent. Built none of it. Date 2026-09-29.
Under test: `next start` on `http://localhost:3202`, built from `a6cb6630`.
Identity asserted before any measurement:
`curl -s localhost:3202 | grep -o "<title>...</title>"` -> `<title>Specialist Hospitality Accountants UK</title>`.
Port 3203 was probed once for identity only (`Ecommerce and marketplace seller accountants UK`) and never touched again.

Read-only: no edits to site code, no commits, tags, builds, servers started or stopped, no
subagents. Scratch under `scratchpad/r4/`, deleted after writing. Kit read at `f17702ff`.
Instruments run once each, never with `--save-baseline`. Every `/api/leads/*` POST was
intercepted; one was stubbed with a local 200 to exercise the success path. No lead reached
the database.

---

## A) VERDICT

**WAVE: PASS-WITH-GAPS.** All eleven expected closures verified CLOSED against the rendered
site. All four manager rulings verified TRUE on evidence. Two new findings, neither a
blocker: a dark closing panel that merges with the dark footer on 17 routes, and six
sub-floor text pairs on the brand heroes that `browser_check.mjs` structurally cannot see.

**WIDGET: FAIL — 2 blockers, 4 gaps, 2 nits.** The kit module is the GF7-fixed one and every
one of R7's five original blockers is closed here on first measurement. It fails on two
things this site introduced or inherited un-checked: the auto-opened dialog **captures
forward Tab** and the launcher is unreachable in 420 presses, and the widget **renders inside
the chrome-bypassed partner embed** at `/research/<slug>/embed`.

**Residual contrast count: 0 by the instrument, 6 by canvas compositing.** See F3.

---

## B) OPEN GAPS, most severe first

### BLOCKERS (widget)

**W-B1 | `packages/web-shared/support/SpecialistWidget.tsx:467` (`handleDialogFocusCapture`)
+ `:566` | the unprompted auto-open captures forward Tab; the launcher is never reachable**
- Spec (R7 B1 / GF7 NB-1, NB-3): focus enters the dialog only on a user-initiated open; the
  launcher is reachable by Tab (R7 measured 103 presses on `/`, 67 on a calculator).
- Measured, real `page.keyboard.press("Tab")` from `document.body`, 1280, no programmatic focus:
  - `/`: forward Tab lands **inside the auto-opened dialog at press 80** (`Close`), and
    `aria-modal` flips to `"true"` **at the same press**. The trap then cycles
    `Close -> Get in touch -> Ask an accountant -> Close` forever:
    `tabReach(launcher) = -1` in **420 presses**.
  - `/calculators/tronc-tips-paye-nic-calculator`: capture at press **40**, `tabReach = -1`.
  - Escape does release it: `{open:false, active:"specialist_widget"}`, and the launcher is
    then reached on the next press (81 and 41). Nothing on the panel says so.
- Mechanism: the dialog is earlier in the DOM than the launcher. `onFocusCapture` upgrades a
  panel the visitor never opened to modal the instant forward tabbing touches it, and the
  trap at `:245-285` then prevents leaving. GF7 fixed focus being *stolen* at t+600ms; it did
  not stop focus being *captured* on arrival.
- Severity: BLOCKER. WCAG 2.1.2 and 2.4.3 on every route, from a surface the visitor did not
  ask for. R7 GF7 measured 103/67 on startups-tech from the same kit code, so either that
  measurement was taken with the panel already closed or the two sites diverge; on hospitality
  it is -1 on both routes measured.
- Minimal fix (kit): gate `handleDialogFocusCapture` on `event.relatedTarget` being null or
  already inside the dialog, so tabbing *through* the page does not arm the trap; or render
  the dialog after the launcher in the DOM.

**W-B2 | `hospitality/web/src/lib/intent/widget-config.ts:142`
(`hiddenOnPaths: ["/embed", "/admin"]`) | the widget ships inside the partner embed**
- Spec: hidden on `/embed/*`, `/admin/*` **and the research embed route**.
- Measured:
  - `/embed/food-drink-vat-rate-checker` -> `data-cta="specialist_widget"` **0** (correct).
  - `/admin/analytics` -> **0** (correct).
  - `/research/hospitality-openings-closures-index/embed` -> **1**, and
    `grep -o '<header\|<footer\|<nav'` on that route returns **nothing**: chrome is bypassed,
    the widget is not.
- Mechanism: `IntentProvider.tsx:48` is `config.hiddenOnPaths.some(p => path.startsWith(p))`.
  The research embed is a **suffix** route, so no prefix match exists. `PageShell` suppresses
  chrome there through a separate `bypassWhen` predicate the widget never sees.
- Severity: BLOCKER. A floating "Ask an accountant" launcher and an auto-opening dialog
  render inside a third party's iframe, on the one surface the estate deliberately strips.
- Minimal fix: add `"/research"` + an `/embed` suffix test to the site's suppression, or give
  the kit a `hiddenWhen?: (path: string) => boolean` and pass the same predicate `PageShell`
  already gets.

### GAPS

**W-G1 | `hospitality/web/src/lib/assistant/opener.ts:39-100` | 16 of 27 authored hook lines
break the file's own LOCKED voice rule, and the shipped test cannot catch it**
- Rule, stated at `:22`: *"One sentence per hook line, under 20 words."*
- Measured (sentence-terminator count over the 27 authored strings): **16 are two sentences.**
  Examples: `"Looking at tronc and tips? I can pull up the tool that runs the PAYE and NIC."`
  (17 words, 2 sentences), `"Want a hand with the hot food tests or an eat-in line? Happy to help."`,
  `"Not sure what you are looking for? I can point you to the right tool."`
- `exitOpener` with the longest noun renders **21 words**:
  `"Before you go: send a question about your licensed trade numbers and one of our accountants will come back to you."`
- `src/tests/assistant-opener.test.ts` asserts only `"hook lines stay under 20 words"`. The
  sentence half of the rule is untested, which is why 16 breaches shipped green.
- This is R7's G6 in the same place, eight times larger. R7 closed G6 by rewriting the copy.
- Severity: gap. No claim breach (see cleared row 12). Every line is authored; nothing is a
  kit default leak.
- Minimal fix: owner call on the copy (question D6), then either rewrite to one sentence or
  amend the stated rule, and add the sentence assertion to the test either way.

**W-G2 | `hospitality/web/src/app/layout.tsx:165` | the widget renders on the 404 page**
- `curl -s :3202/no-such-page | grep -c 'data-cta="specialist_widget"'` = **1**.
- Severity: gap. Not a claim or a11y defect; an auto-opening enquiry dialog on a
  not-found page is a judgement call the owner has not made. Same fix surface as W-B2.

**D-G3 | 17 routes | the dark closing panel and the dark footer are the same colour and merge**
- Measured, canvas composite of every `<main>` band plus the footer, 1280:
  `/services`, `/for`, `/blog`, `/calculators`, `/research`, `/about`, the 8 blog category
  hubs, 2 research details and 2 posts all end on
  `section.relative.overflow-hidden.bg-slate-900` = **rgb(15,23,43)**, and
  `footer` = **rgb(15,23,43)**. Zero separation: one continuous dark block, no rule, no
  eyebrow, no colour step.
- `browser_check.mjs --grounds` reports it as `darkOnDark: true` on **17 routes**
  (stdout: `dark band touching the footer: 17`) and 11 further `adjacent bands sharing a
  ground`, including two adjacent `rgb(15,23,43)` bands on `/` itself.
- Severity: gap, design not accessibility. It falsifies R2's own screenshot note
  ("never repeats a ground twice without an eyebrow between") and V1's V5 row
  ("grounds breaches=0, darkOnDark false everywhere").
- Minimal fix: a one-step colour change on the closing panel (the homepage already paints
  `#3a1a0d` there via the backdrop) or a hairline top border on the footer.

**D-G4 | `/research/uk-hospitality-insolvency-index:207-232` | four hero stat labels measure
3.29 against a 4.5 floor**
- Measured, 1x1-canvas composite, text alpha included: `div` 14px `text-white/80`
  = `rgb(241,224,218)` on `rgb(184,101,68)` (white/10 over `#b0532f`) = **3.29**. Four
  instances: the `3,523`, `209`, `117.6%` and `408` captions. The figures themselves are
  4.21 (36px, large-text floor 3, passes).
- This is **not** the owner's pending standfirst decision: it is a different element, a
  different opacity stack and a different band, and it is 14px, where even the instrument's
  own rule demands 4.5.
- Severity: gap. Smallest text on the page, under the floor, unrecorded anywhere.
- Minimal fix: `text-white/80` -> `text-white` on those four captions, or drop the white/10
  overlay so the ground returns to `#b0532f` (white/80 there is 3.87, still short).

### NITS

**D-N5 | five `<Eyebrow onDark className="text-white">` call sites ship a dead class.**
Rendered class string ends `... text-slate-300 text-white`: the `onDark` branch's
`text-slate-300` is overridden by the appended `className` on every one of the five.
Measured white on `rgb(176,83,47)` = **5.09**, so the outcome is right; the class is noise.
Cheapest fix is kit-side (`onDark` should not emit a colour when `className` sets one).

**W-N6 | the widget is the site's only surface with no `data-cta-placement`/`-goal`.**
`specialist_widget|null|null` on all 59 routes, against 11 populated triples everywhere else.
R7 C19 records this as deliberate and byte-identical to Property and generalist
(`autoCapture` resolves placement from `nearestSection()`), so it is recorded, not filed.

---

## C1) PART 1 — gap closure table

| gap | command | decisive line | verdict |
|---|---|---|---|
| R2 B1 nested scroll containers on 23 posts (manager: measurement artefact) | `getComputedStyle` walk over `aside, aside *` at 1440x900 on `/blog/hospitality-vat/vat-on-takeaway-food`, recording each element's `display:none` ancestor | two scroll containers exist, on **different mounts**: `ASIDE.hidden lg:order-2 lg:block lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto` -> `overflow-y=auto max-height=772px position=sticky`, **`hiddenAncestor: null`**; `UL.mt-3 space-y-1 max-h-[60vh] overflow-y-auto` -> `overflow-y=auto max-height=540px`, **`hiddenAncestor: DIV.lg:hidden z-30 mb-6 -mx-4 sm:-mx-6`**. The clamped `<ul>` belongs to the MOBILE mount, which is `display:none` at 1440. **Exactly one scroll container in the visible lg branch.** | **REJECTED-WITH-REASON — ruling CONFIRMED.** R2 measured across two mounts and read it as nesting. The corrected call-site comment is TRUE. |
| R3 blocker 1, tronc FAQ sentence "rewritten" (manager: pre-phase-0 original) | `git show port-hospitality-phase0^:hospitality/web/src/data/hospitality-services.ts \| sed -n 77p` vs phase 0 vs HEAD | pre-phase-0 `:77` = `... See also <a href="/services/hospitality-payroll">hospitality payroll</a> for how tronc payments sit inside your overall pay run.` — **byte-identical to HEAD**. `port-hospitality-phase0:77` is the one that says `See also our hospitality payroll service` (phase 0 stripped the anchor). R3 used phase 0 as BEFORE and inverted the direction of the change. | **REJECTED-WITH-REASON — ruling CONFIRMED.** The wave restored the original; phase 0 was the regression. |
| R2 G1, `SlimHero` declined on a stale reason | `git show f17702ff:packages/web-shared/design/primitives/SlimHero.tsx` | `:29` `eyebrow: string` — **required, no `?`**; props are `eyebrow, title, standfirst, children?, backdrop?, sectionClassName?` — **no breadcrumb slot**, only `children` inside the copy column. The 11 brand heroes all carry a `Breadcrumb tone="onBrand"` above the H1. | **CLOSED.** The re-derived reasons (no breadcrumb slot, required eyebrow) are TRUE at `f17702ff`. The old `bg-slate-900`-with-no-prop reason is gone. |
| R2 G3, `CoverageCards` declined on a stale reason | `git show f17702ff:packages/web-shared/design/marketing/CoverageCards.tsx \| sed -n 1,35p` | `:8` `body: string` — **required**; `href?` at `:31` and `icon?` at `:27` are now optional, which is exactly what the call-site comments say is stale. The six homepage cells publish a label + href and no body. | **CLOSED.** Re-derived reason TRUE; adopting would mean authoring six sentences or shipping six empty `<p>`. |
| `StatsCounter tone="dark" columns={3}` on 11 routes, T15 pre-hydration figures | `grep -rn 'tone="dark"' src/app`; then canvas composite of the band on `/for/restaurants` and `/services/tronc-scheme-setup`; `curl \| grep -o` for the figures | source: `for/[slug]/page.tsx:156` and `services/[slug]/page.tsx:191` = the 6 sector + 5 service routes. Rendered: `gridTemplateColumns: 341.328px 341.328px 341.344px`, **3 cells, no hole**; ground `rgb(29,41,61)`; figures 36px `ui-monospace, SFMono-Regular` white = **14.62**; labels 14px slate-300 = **9.83**. `md:grid-cols-3` present on all 11. T15: `£12.71`, `15%`, `12.5%` / `0%`, `15%`, `Oct 2024` all in the served pre-hydration HTML. | **CLOSED** |
| white eyebrows on 5 brand heroes (5.09) | canvas composite of the hero `<p>` with `text-transform:uppercase` on the 4 research routes + 2 calculators | `"Research"` / `"Tronc, Tips and Payroll"` / `"Food and Drink VAT"` 12px, composited colour `rgb(255,255,255)` on `rgb(176,83,47)` = **5.09** on all 6 measured (5 call sites: `research/page.tsx:85`, 3 research details, `calculators/[slug]:102`). Was 3.43. | **CLOSED** (see D-N5 for the dead `text-slate-300`) |
| the sidebar footnote gone on 23 posts | `grep -c -F "Free, no obligation"` over all 59 saved sitemap pages | **0 files** (was 23) | **CLOSED** |
| HowTo steps rendered on 3 posts, count = schema count | per post, parse every `ld+json`, strip tags, entity-decode, test each `step.name` and `step.text` against the visible text | `machine-games-duty`: schema **6**, visible **6/6** names and 6/6 texts. `small-business-rates-relief-cafes`: schema **5**, visible **5**. `awrs-checks`: schema **5**, visible **5**. Heading `"Step by step"` present on all three (`niche.config.json:141 howto_heading`). | **CLOSED.** Note: R3 recorded awrs-checks as 6 steps; the schema publishes 5. R3's count was wrong, not the fix. |
| `data-cta` triples complete on the homepage | `curl -s :3202/ \| grep -o 'data-cta="..."\|data-cta-placement="..."\|data-cta-goal="..."' \| sort \| uniq -c` | ids 7 (`header_book` 1, `hero_primary` 1, `hero_secondary` 1, `home_calculator` 3, `home_research` 1) / placements 7 (`header` 1, `hero` 2, `tools_band` 4) / goals **7** (`form` 2, `service` 1, `tool` 3, `research` 1). Was 10/10/**6**. `non_interactive_ctas: []` in `cta_r4.json`. | **CLOSED** |
| `#fafaf9`/`#fafaf7` literals gone from six templates + the homepage | `grep -rn 'bg-\[#fafaf' src/app --include=*.tsx`; then `grep -c 'bg-\[#fafaf'` over all 59 served pages, and the rendered paints | source **0** live hits; served **0 of 59 files**; `--surface-warm*` present in **14** served files (home + services hub + 5 service slugs + for hub + 6 sector slugs). Paints unchanged: `rgb(250,250,249)` on `/` bands and `rgb(250,250,247)` on `/for`, both still distinct from `bg-white` and `slate-50` `rgb(248,250,252)`. R2 G7's dead token pair now has 11 consumers. | **CLOSED** |
| `ExampleFigureNote` gone from the calculators | `grep -c -F "Example figures displayed"` over all 59 served pages | **0 files** (was 3) | **CLOSED** |
| pattern ids all prefixed and unique per page | `[...document.querySelectorAll("pattern,linearGradient,radialGradient,mask,filter,clipPath")].map(e=>e.id)` on 12 routes | **0 duplicate ids and 0 unprefixed ids on all 12 routes.** `/services` and `/for/restaurants` now emit `hospitality-*` (were `services-hero`/`sector-hero`). Counts 1-4 per route. | **CLOSED** |
| `stickyMobile={false}` on the post | source grep + every `position:sticky` element at real 390 emulation | source `:252` and `:355` both pass it. At 390 the only sticky element on the post is `HEADER.sticky top-0 z-40 ... bg-white shadow-sm`, height **73**. No sticky TOC. | **CLOSED** |
| V1's 26 contrast failures | `browser_check.mjs --site=hospitality --base=:3202 --grounds` (once) | `152 page-loads, 1 with NEW problems`; total contrast failures across all 152 rows = **0** (V1 26, P0G 219, P0D 235). Self-test OK (slate-500/white 4.76, slate-400/white 2.56), 0 unparseable colours, overflow 0, anchorGaps 0. The "1 with NEW problems" row carries no contrast, overflow or anchor entry — it is the coverage note (99 subtrees unrendered at every width, all `div.overflow-hidden.text-sm...` accordion bodies). | **CLOSED against the instrument.** NOT clean by canvas compositing: see F3 and D-G4. |
| `RelatedArticles` link ring visible (kit fix) | focus the first `.related-card a` at 1440, 750ms settle, read the anchor and the card | the anchor now paints its own ring: `outline: rgb(176,83,47) 2px solid`, `:focus-visible true` = **5.09 on white**. The card glow is unchanged (`border-color rgb(229,135,100)` = **2.63**, `box-shadow rgba(201,105,69,0.22) 0 0 0 3px`), but it is no longer the only indicator. R2 G6's measured pair, restated: 2.63 glow / **5.09 outline**. | **CLOSED** |

## C2) PART 2 — widget check table (the R7 checks)

| check | command | decisive line | verdict |
|---|---|---|---|
| launcher reachable by Tab, press count on `/` and on a calculator | real `page.keyboard.press("Tab")` x420 from `document.body`, 1280 | `/`: **-1** (captured at press 80). calculator: **-1** (captured at press 40). After `Escape`, reachable at 81 and 41. | **FAIL — W-B1** |
| focus enters the dialog on a user open; Tab and Shift+Tab cycle inside | Escape the auto-open, `page.click('[data-cta="specialist_widget"]')` | `{open:true, aria-modal:"true", aria-label:"Ask an accountant", active:"Close", inside:true}`. 8 forward Tabs: `Get in touch[in] Ask an accountant[in] Close[in]` repeating, all `[in]`. 5 Shift+Tabs reverse, all `[in]`. | PASS |
| Escape closes and returns focus | `page.keyboard.press("Escape")` after a user open | `{open:false, active:"specialist_widget"}`. From an auto-opened (non-modal) panel: `{open:false, active:"BODY"}` — correctly not yanked, since focus was never inside. | PASS |
| the auto-open is non-modal until first focus | 2.6s after load, no user action, 11 routes | `aria-modal: null` and `document.activeElement = BODY` on all 11. At 390: `dialog:false`, `peek:true` (peek path, not the panel). | PASS |
| launcher lifts above the footer; never covers the consent toggle or the cookie link, 1280 and 390, 4 scroll states | `/contact`, states top/mid/footerHalf/bottom, `getBoundingClientRect` intersection + `elementFromPoint` hit-test at each control's centre | **0 overlap rectangles in all 8 states** (`ovLauncher: null, ovDialog: null` everywhere). Lift is transform-only: `matrix(1,0,0,1,0,-104)` -> `-541` at 1280, `null` -> `-687` at 390. Every control on screen hit-tests to itself: "Do not track me" -> `BUTTON.inline-block shrink-0 py-1 text-xs`, both "Cookie Policy" -> their own `A`. `visibility: visible` in all 8 states (the GF6 hide-on-footer shape is not present). | PASS |
| CLS from the launcher | Layout Instability API, `hadRecentInput` excluded, `/`, 6s | 1280 **0.00046**, sources `NAV.hidden min-w-0 items-center...` + `A.inline-flex min-h-12...` + `DIV.flex shrink-0...` at t=221ms (the header) and an `svg` at t=870ms. 390 **0.00000, no shifts**. **No shift names the widget wrapper or the launcher.** | PASS (~0) |
| close button ring and header ring on `primary-950` | focus every dialog control, 430ms settle, canvas composite | close button: `2px solid rgb(255,255,255)` on header ground `rgb(52,19,6)` (`.ground-dark flex ... bg-primary-950`) = **16.91**. Email 5.09, question 5.09, submit 5.09, Privacy Policy 5.09, all on `rgb(255,255,255)`, all `:focus-visible true`. | PASS |
| submit payload: `form_id`, lead `source`, `captureMode` | `setRequestInterception(true)`, POST captured then stubbed 200 | `POST http://localhost:3202/api/leads/submit` -> `"source":"hospitality"`, `"captureMode":"email_only"`, `"extras":{"capture_channel":"assistant","trigger":"auto","form_id":"specialist_widget"}`, `"role":"Other"`, `visitor_id`/`session_id` present, `message":"[Specialist question (tronc)] ..."`. Success copy rendered on the stub. | PASS |
| `data-cta="specialist_widget"` once | `cta_snapshot.mjs`; per-route DOM count | `specialist_widget\|null\|null\|data-cta -> 59` across 59 routes, and `ctaCount: 1` on every one of 11 routes measured in the DOM. | PASS |
| hidden on `/embed/*`, `/admin/*`, the research embed route | `curl \| grep -c 'data-cta="specialist_widget"'` | `/embed/food-drink-vat-rate-checker` **0**; `/admin/analytics` **0**; `/research/hospitality-openings-closures-index/embed` **1** (and `<header\|<footer\|<nav` = 0 there). | **FAIL — W-B2** |
| print hidden | `emulateMediaType("print")` on `/` with the panel open | `launcherH: 0, dialogH: 0`. | PASS |
| calculator chip suppressed on its own calculator page | dialog link list per route | `/calculators/tronc-tips-paye-nic-calculator` -> `["Get in touch -> /contact"]` only, chip **absent**. Present and correct elsewhere: `/blog/tips-and-tronc/tronc-scheme` -> `tronc-tips-paye-nic-calculator`; `/blog/hospitality-vat` -> `food-drink-vat-rate-checker`; `/services/hospitality-vat` -> `food-drink-vat-rate-checker`; `/for/restaurants` -> `food-drink-vat-rate-checker`; `/blog/payroll-and-employment/...` -> `staff-cost-rota-margin-calculator`. Absent on `/`, `/about`, `/services`, `/contact`, `/thank-you`, `/book`, `/research/*`, `/for/pubs-and-bars` (topics with no `primaryCalculator`). | PASS |
| openers per route family, every line authored in `opener.ts` | fresh browser context per route, read the dialog text 2.6s after load, 14 routes across 7 families | `/` -> `GENERIC[0]`; `/about`, `/services` -> `GENERIC[1]`; `/contact`, `/thank-you`, `/book` -> `GENERIC[2]`; blog post `tronc-scheme` + `/calculators/tronc-...` -> `tronc[0]`; `/blog/hospitality-vat` + `/for/restaurants` -> `vat[0]`; `/services/hospitality-vat` -> `vat[1]`; `/blog/business-rates/...` -> `business-rates[0]`; `/for/pubs-and-bars` -> `licensed-trade[0]`; `/blog/payroll-and-employment/...` -> `staff-costs[0]`; `/research/uk-hospitality-insolvency-index` -> `compliance[0]`. **Every line matches an authored string in `opener.ts` byte for byte. Zero kit-default English.** | PASS |
| no "free", no fee, no turnaround claim beyond 24 hours | regex screen of `opener.ts`, `widget-config.ts`, `labels.ts`, `taxonomy.ts` + the rendered dialog text | visitor-facing: `\bfree\b` **0**, `\bfee\b` **0**, `£` **0**, price/pricing **0**, chartered/qualified/regulated/certified **0**, em/en-dash **0**. The 5 turnaround strings are all `"within 24 hours"`, the site's own line. (The 1 "free", 1 "pricing" and 3 credential words in those files are inside the LOCKED voice-rule docstring.) | PASS |
| consent sentence = shared `leadConsentText` + "See our Privacy Policy." | read the last `<p>` in the composer; compare with `src/config/site.ts:12` | `"To answer your enquiry, your details may be shared with a firm from our specialist partner network who will contact you. If that firm is unable to help, your details may be passed to another firm in the network for the same purpose. By submitting this enquiry you confirm you understand this. See our Privacy Policy."` — byte-identical in the DOM and in `consent_text` on the wire. | PASS |
| no console errors from the widget | console + pageerror listeners on 12 routes | 2 errors per route, identical on every one: `Framing 'https://pagead2.googlesyndication.com/' violates ... frame-src ...` (known AdSense CSP refusal, H14). **0 page errors, 0 hydration errors, 0 widget-sourced errors.** | PASS |
| honeypot is not a keyboard stop | computed style + `tabIndex` on `input[name="enquiry_ref"]` | `{tabIndex:-1, ariaHidden:"true", rect:"1x1", cls:"absolute left-[-9999px] top-[-9999px] h-px w-px opacity-0"}`; it never appears in the trap cycle. | PASS |
| real 390 emulation proven before use | `page.emulate({isMobile:true, hasTouch:true, deviceScaleFactor:3})` | `{iw:390, dpr:3, touch:true, coarse:true}` — `(pointer: coarse)` matched. | PASS |

## C3) PART 3 — regressions

| check | command | decisive line | verdict |
|---|---|---|---|
| prose freeze, source strings, `a045e4a3^..a6cb6630` | `git diff -U0 ... -- hospitality/web/src hospitality/niche.config.json`, removed lines filtered to non-comment prose; then every non-class quoted string in the diff | **every removed prose-looking line is a comment.** The only config delta is `+ "howto_heading": "Step by step"`. Non-class string additions are entirely inside the 6 new widget files and their 3 test files. **No published site sentence changed.** | PASS |
| prose freeze, rendered, 8 routes | visible text of `/`, `/services`, `/services/tronc-scheme-setup`, `/for`, `/for/restaurants`, `/blog`, the takeaway post, `/calculators` against the R2/R3 recorded strings | no sentence lost; the restored tronc anchor renders; `"Step by step"` is the only new visible heading, on 3 posts. | PASS |
| link floors per route vs `sweep_baseline.json` | `sweep.mjs --site=hospitality --base=:3202 --out=...` (once) | `59/59 URLs clean, 0/3 internal links dead, 0 LINK-FLOOR breaches (978 links total), 0 data-cta regressions (183 total), 0 dash regressions (0 total)`. Per-route diff against the baseline: **0 of 59 routes below baseline**; 978 vs 667. Identical to V1's totals. | PASS |
| CTA census vs `cta_baseline.json` | `cta_snapshot.mjs` | header triple **`header_book\|header\|form\|data-cta` = 59, unchanged**; `non_interactive_ctas: []`. 183 tags, **12** distinct triples (baseline 1, V1 11). New since V1: **`specialist_widget\|null\|null` x59**, and three V1 nulls now populated (`home_calculator\|tools_band\|tool`, `hero_secondary\|hero\|service`, `home_research\|tools_band\|research`). Full list: `header_book` 59, `specialist_widget` 59, `blog_skip_to_form` 23, `blog_sidebar_book` 23, `sector_hero_contact` 6, `service_hero_contact` 5, `home_calculator` 3, `hero_primary` 1, `hero_secondary` 1, `home_research` 1, `for_mid_contact` 1, `services_mid_contact` 1. | PASS |
| every `ld+json` parses | `json.loads` every `<script type="application/ld+json">` on all 59 sitemap URLs | **202 blocks, 0 parse failures.** | PASS |
| one `BreadcrumbList` per route | parse by script tag, not raw grep | **exactly 1 on 58 of 59**; 0 on `/`, which is correct (the homepage shows no trail). **0 routes with more than one.** | PASS |
| no em-dashes, no pipeline artefacts, all sitemap URLs | byte scan of the visible text of all 59 saved pages | U+2014 **0 files**, U+2013 **0 files**, `[object Object]` 0, `(HP` 0, `verify at build` 0, `&lt;a href` 0, `NaN` 0. | PASS |
| `npm test` and `tsc` | `cd hospitality/web && npx tsc --noEmit; npm test` | `tsc` no output, exit 0. `Test Files 10 passed (10) / Tests 135 passed (135)`. | PASS |
| overflow at 390 | `browser_check.mjs` element sweep | `overflow=0`, `anchorGaps=0` on all 152 page-loads. | PASS |

---

## D) OPEN QUESTIONS FOR THE OWNER

1. **The faint line under the big headings on coloured pages.** White at 80 strength on the
   brown measures 3.87 against a 4.5 target for normal text; on the three research pages it is
   85 strength and measures 4.14. Still soft, still legible. Brighten to full white, or keep
   the soft look? (Same question you already had; the numbers are now on all 11 pages.)

2. **The small orange highlights on the sector and service cards.** Unchanged by this round.
   They are a stock orange rather than a shade of the brand brown, and they are the one place
   the colours look borrowed. Pull them onto the brand, or leave?

3. **The stats strip on white.** The three-figure strips on the sector and service pages are
   now built the shared way on a dark slate band, and the four-figure strip on the front page
   is on white. Both read clearly (measured 14.6 and 17.9). Do you want the two to match?

4. **The four small captions under the big numbers on the insolvency page** are fainter than
   the rules allow (3.29 against 4.5). One-line fix. Do it, or leave with the rest of the
   white-on-brown question above?

5. **Still not done, all recorded and unchanged:** the footer sentence dropped in phase 1
   ("Specialist hospitality accountants. Editorial content only...") and the footer brand
   column's lost heading and "Contact us" link; the three blog labels ("Topics", "The library",
   "Keep exploring"); the new heading "Step by step" now printed above the how-to steps on
   three posts; the breadcrumb on `/for` reading "For"; the data-sharing notice appearing at
   step 2 of the main form rather than step 1. Each is a wording call only you can make.

6. **The help widget's own lines.** All 27 are ours, none came from the shared kit, and none
   breaks a ruling: no price, no free call, and the only promise is your own "within 24 hours".
   Sixteen of them are two short sentences where the file's own rule says one, for example
   *"Working out food and drink VAT? I can open the rate checker for your menu."* They read
   fine. Keep them and relax the rule, or have them shortened to one sentence each?

7. **Two things about the widget I would not put live yet.** It appears inside the chart page
   you let partners embed on their own sites, where every other bit of our branding is
   deliberately stripped, and it also appears on error pages. And a visitor using only the
   keyboard gets pulled into the help panel partway down every page and has to press Escape to
   get out. Both are small fixes. Do you want them fixed before this site goes out, or is the
   widget parked until the same fixes land on the other sites?

---

## FALSE PREMISES found in the reports and the receipts

**F1 — R2 B1 (blocker) is a measurement artefact, as the manager ruled.** The two scroll
containers live on two different mounts and one is inside `display:none` at the lg width.
Proven with `getComputedStyle` plus a `display:none` ancestor walk, lg branch only.

**F2 — R3 blocker 1 inverted the direction of the change.** R3 took `port-hospitality-phase0`
as BEFORE. `port-hospitality-phase0^:77` is byte-identical to HEAD; phase 0 is what dropped
the anchor. The wave restored the original wording.

**F3 — `browser_check.mjs` reporting 0 contrast failures is not proof the site clears 4.5.**
`browser_check.mjs:252-257` holds anything at or above 15px to a **3:1** floor, and
`:249` computes the ratio from the **uncomposited** `cs.color`, so text alpha is ignored. On
this site that hides six real pairs, all on brand grounds, all found by canvas compositing:
the 18px `text-white/80` standfirst at **3.87** (5 routes), the 18px `text-white/85`
standfirst at **4.14** (4 routes), and the 14px `text-white/80` stat captions at **3.29**
(D-G4). The instrument's 0 and this review's 6 are not in conflict; the 0 is narrower than it
reads.

**F4 — V1 V5's "grounds breaches=0, darkOnDark false everywhere" is false.** The same
instrument run reports `darkOnDark: true` on **17 routes** and 11 adjacent-same-ground pairs
(D-G3). It is an observation row rather than a graded failure, which is presumably how V1
read past it.

**F5 — R3 GAP 5 records `awrs-checks` as publishing 6 HowTo steps.** The schema publishes
**5**, and 5 render. The gap-fix's "count = schema count" holds; R3's number did not.

**F6 — the gap-fix receipt says "white eyebrows on the five brand-ground heroes".** True and
measured (5.09 x5), but the mechanism leaves `text-slate-300` in the rendered class string on
all five, overridden by the appended `className` (D-N5). The class is dead, not wrong.

**F7 — R7 GF7 recorded the launcher as keyboard-reachable at 103 and 67 presses from the same
kit code.** On hospitality it is **-1 in 420 presses** on both routes measured, because the
auto-opened dialog arms its own trap the moment forward Tab touches it (W-B1). Either the
startups-tech walk was taken with the panel closed, or that site needs re-measuring; the kit
code path is shared.

**F8 — `src/tests/assistant-opener.test.ts` asserts "hook lines stay under 20 words" and
passes, which reads as the voice rule being enforced.** The rule has two halves and only the
word count is tested; 16 of 27 lines break the sentence half (W-G1).

---

Scratch directory `scratchpad/r4/` deleted after this file was written.
