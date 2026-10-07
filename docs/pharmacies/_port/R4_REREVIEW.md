# R4 — independent re-review of the FINAL pharmacies build

Read-only on the site. This file is the only thing written. No git command, no
build, no server start/stop, no subagent.

**Build under test.** `curl -s http://localhost:3111/` returns 200 with
`<title>Pharmacy Tax | Specialist Accountants for UK Pharmacy Owners</title>`;
`.next/BUILD_ID` = `A9XVrahy_0P4p7Nbmwlod`, as briefed.

**Instruments.** `probe.mjs` (bands, grounds, full text-contrast sweep, overflow,
JSON-LD, counts), `probe2.mjs` (45-press tab ring walk, numerals with JS on and
off, surface census, 5-post breadcrumbs), `probe3.mjs` (390 sticky geometry,
modal suppression, ring scan across 12 routes), `opener.mjs`, `shot.mjs` — all in
`…/scratchpad/r4/`, with `probe.json`, `probe2.json`, `probe3.json` and 32
full-page screenshots at 390 and 1440.

**Instrument incident, declared.** My first colour parser read every Tailwind v4
`oklch()` / `oklab()` computed value as unparseable, so every kit-painted dark
ground resolved to white and the footer measured `255,255,255`. That is the same
family of bug the reference instrument's comments record three times. It was
caught by the implausibility of "slate-900 footer = white", replaced with a
canvas resolver (`clearRect`, **no opaque base fill**, un-premultiplied
`getImageData`, alpha folded by an explicit `over()`), and the self-test extended
to a **third and fourth pair** so the same class of failure cannot pass again:

```
slate-500/white 4.76   slate-400/white 2.56   (the two reference pairs)
oklch(0.208 0.042 265.755) -> [15,23,43]      white on it 17.83   (the oklch guard)
```

`17.83` is correct for `rgb(15,23,43)`; appendix N's `#0f172a` is `b=42` and gives
17.24, a 0.59 difference that is the ramp, not the maths. **Every ratio below
comes from the fixed resolver. Nothing from the first pass is quoted.**

---

## 1. FINDINGS, ranked

| # | sev | route(s) | measured evidence | minimal fix |
|---|---|---|---|---|
| **N1** | **BLOCKER** | all 58 | The specialist widget **panel auto-opens with no interaction**, 368×544, `0.80–1.09s` after load, on every route sampled (`opener.mjs`: `/for` 936ms, `/blog` 822ms, `/` 1091ms, `/contact` 800ms, `/services/pharmacy-sale-cgt-badr` 807ms). At 1440 it covers real content: the third service tier card on `/services`, the second audience card on `/for`, the third article card and the fifth category chip on `/blog` (`services-1440.png`, `for-1440.png`, `blog-1440.png`). The sticky bar paints at the same instant, so **two capture surfaces publish unprompted on first load**. W7B's B2 fix gates the modal against the panel; nothing gates the panel against the visitor. The owner's standing rule is that nothing which interrupts him or a visitor gets created without asking first. | Gate the opener behind a visitor action (scroll depth or a launcher click) at the mount in `layout.tsx` — the same place W7B already added `capture-widget`. **Or** one owner line accepting an auto-opening panel. Do not ship it unasked. |
| **N2** | **serious** | `/` ×2, 8 `/services/*`, 5 `/for/*` — **15 rings, 14 routes** | **G4 regression.** Four focus rings measured at **ratio 1.00**: `/` "Speak to a pharmacy accountant" and "FP34 reconciliation service", `/services/pharmacy-sale-cgt-badr` and `/for/buying-a-pharmacy` "Get in touch" — each `--focus-ring: #0f3a4a` painted on a `[15,58,74]` `primary-950` parent (`probe3.json` ringScan; tab walk confirms `ow 2px solid oc rgb(15,58,74)`). Cause: G4's light-card reset `.bg-primary-950 .bg-white { --focus-ring: on-light }` matches the **button itself**, not a card around it, and the outline paints outside the button on the navy ground. G4's receipt reasoned the nested-card case and missed the case where the white element *is* the focusable. This is **worse than the 1.56 UA outline** it was added to beat, and V31's baseline is 0. | `globals.css`, one line: narrow the reset to containers — `.ground-dark .bg-white:not(a):not(button):not(input), .bg-slate-900 .bg-white:not(a):not(button):not(input), …`. White buttons then keep the on-brand ring, which is what paints on the dark ground. |
| **S1** (R2) | **serious** | `/` ×3, both research pages ×7 | **STILL OPEN.** 10 links fall back to the UA outline: `ow 1px`, `outline-style: auto`, `outline-color rgb(16,16,16)`, **ratio 1.56** on `primary-950`. `/`: "reimbursement and remuneration…", "FP34 submission cycle", "Drug Tariff and Category M clawbacks". research-density: NHSBSA Contractor Details, NHSBSA dispensing data, OGL v3.0, Download CSV. research-openings: NHSBSA's Pharmacy Openings…, OGL v3.0, Download CSV. The parent's `--focus-ring` resolves to `#fff` — **G4 worked**; the element simply carries no ring recipe. | Append `${focusRing}` to the five `className` strings R2 named (`page.tsx:482,493,503`, `research/*/page.tsx`). Unchanged since R2. |
| **S7** (R2) | **serious** | both research pages | **STILL OPEN.** `text-white/50` captions measure **4.29** against the composited `[15,58,74]` hero at 14px, floor 4.5, at **both** 390 and 1440. 5 nodes on the density page ("Data pulled", the date, ". Published under", "Open Government Licence v3.0", "Download CSV"), 3 on the openings page. | `text-white/50` → `text-white/70` on `research/pharmacy-density-and-workload-index/page.tsx:184` and `research/pharmacy-openings-closures-index/page.tsx:189`. Unchanged since R2. |
| **S2** (R2) | **serious** | site-wide | **STILL OPEN.** Four darks measured: `primary-950 [15,58,74]` (every hero), `primary-800 [24,93,118]` (homepage band 2), `slate-800 [29,41,61]` (band 2 of all 13 detail routes), `slate-900 [15,23,43]` (homepage bands 11 and 13, and the footer on all 58). Property paints one. | Kit ask: `sectionClassName?` on `TestimonialsSection` and `LeadCTAPanel`. Owner question, not a tag gate. |
| **m1** (R3) | minor | both research pages | **STILL OPEN.** `grep -c '>FAQ<'` = **1** on each, `Frequently asked questions` renders on each. The same wave writes at `calculators/[slug]/page.tsx` that "FAQ" is a label this site does not publish. | `eyebrow=""` on both `FaqSection` call sites (`:414-419`). |
| **m4** (R3) | minor | 35 routes | **STILL OPEN.** Served HTML carries `confirm where you stand</p>` — no terminal stop (`.next/server/app/blog/selling-a-pharmacy/pharmacy-exit-planning-timeline.html`; `widget-config.ts:106`). | Add `.` |
| **N3** | minor | 8 `/services/*` + 5 `/for/*` | New `adjacentSame=1`. Band 5 (FAQ, white, h≈563) is followed by band 6, a **bare `mx-auto w-full max-w-6xl px-4 … min-w-0` div** with no `<section>` and no ground, also white, h=217 — the `NextStepOffer` mount. R2 measured `adjSame=0` on 16 routes. | Wrap the mount in `<section className="bg-slate-50 py-12">`, an already-measured ground. |
| **M-d** (R2) | minor | `/book`, `/thank-you` | **STILL OPEN**, as logged: 0 `nav[aria-label="Breadcrumb"]`, 0 `BreadcrumbList` on both, against 1 on all 14 other templates. `/thank-you` is noindex; `/book` is a real page. | Owner question, unchanged. |
| **N4** | minor | receipts | STATE.md's "kit components adopted" list and W5/W3 claim `DrawnTickList`, `WhatToExpectCard` and `CardStack` are adopted. `grep -rhoE '<(DrawnTickList\|WhatToExpectCard\|CardStack)' pharmacies/web/src --include=*.tsx` = **0** for all three. The adopted set is 4 distinct illustrative components across 7 call sites, not 12. | Correct the STATE.md line before tagging; it overstates the port. |
| **N5** | minor | `/services`, `/research/pharmacy-openings-closures-index` | Intermittently never reach network idle (3 timeouts across the run); the blocked `pagead2.googlesyndication.com` frame is the only outstanding request. Known-and-accepted F3 (estate-wide CSP decision), recorded so the next reviewer does not file it as a page defect. | none |

**BLOCKER 1 · serious 4 · minor 5.**

---

## 2. CLOSURE TABLE — every R2 and R3 finding re-checked on the DOM

| finding | verdict | measured evidence |
|---|---|---|
| **R2 B1** sticky bar 188px + launcher overlap at 390 | **CLOSED** | Post at 390×900, scrolled 30% and 45%: bar `h=72` (was 188), `y=828..900`, carrying the generic `Speak to a pharmacy finance specialist / Free, no-obligation reply within 24 hours`; launcher `y=752..804`, `x=174..374`. Launcher bottom 804 vs bar top 828 = **24px clearance, zero overlap** at both depths. `probe3.json` `sticky390_0.3`, `sticky390_0.45`; `sticky390-03.png`. |
| **R2 B2** three surfaces, one offer | **CLOSED (mechanism verified)** | Post at 390, 65% scroll: painted fixed overlays = **1** (the `z-[60]` modal), `data-surface-open` **true**, `.capture-sticky` and `.capture-widget` both `display: none`. `probe2.json` `sticky390`; `surf-390.png`. **Caveat:** I could not re-trigger the modal at 1440 in four scroll steps to 90%, so the 1440 repro is unconfirmed; and when the modal is *not* up, bar + auto-opened panel still publish together — that is **N1**, not B2. |
| **R2 S1** 11 unringed dark links at 1.56 | **STILL OPEN** | 10 of 11 reproduce exactly (§1). |
| **R2 S2** two brand darks + a borrowed dark | **STILL OPEN** | Four grounds measured (§1). |
| **R2 S3** `.ground-dark` missing on kit-painted darks | **CLOSED** | Post template "Get in touch" ring now **17.83, `ow 2px solid`, `oc rgb(255,255,255)`** on `[15,23,43]` (was 1.46/2px in the light colour). All 19 footer links ring at 17.83 on both research pages. G4's utility-keyed rebind works. |
| **R2 S4** numerals/rules dead with JS off | **CLOSED** | `setJavaScriptEnabled(false)` on `/`: all six `.story-numeral` compute `rgb(23,115,146)` = **5.14** on `slate-50` (was `slate-200`, 1.18); all six `.story-numeral-rule` compute `transform: none` (was `scaleX(0)`); eyebrow rules also released. `nojs-numerals-1440.png`. With JS **on** the same six read 5.14 after the band enters view. |
| **R2 S5** three hubs with no hero, two with a 267px strip | **CLOSED on the three, residual on the two** | `/calculators` 1→**3** sections, dark hero **h=353**; `/blog` 1→**4**, hero **h=309**; `/blog/[category]` 1→**3**, hero **h=309** — each `bg-primary-950` with backdrop, `onBrand` breadcrumb and an eyebrow. h1 30px→**60px** on all three. `/services` and `/for` heroes went 267→**281** only. Residual is parity, §3. |
| **R2 S6** 6 blog URLs end navy-on-navy | **CLOSED** | Last main band on every one of the 13 routes measured is light (`248,250,252` or `255,255,255`) against the `[15,23,43]` footer. `darkOnDark = 0`. |
| **R2 S7** `white/50` captions at 4.29 | **STILL OPEN** | §1. |
| **R2 M-a** `#fafaf9` → `slate-50` | logged, not reopened | Band 3 of `/` is `248,250,252`. Owner's line. |
| **R2 M-b** `error.tsx:64` raw hex, no ring | **CLOSED** | `grep -rnoE 'text-\[#\|bg-\[#\|border-\[#' src --include=*.tsx` = **0**. `error.tsx:64` is now `text-primary-700 … ${focusRing}`. |
| **R2 M-c** footer gradient credit | not a finding | Re-measured, still `color: rgba(0,0,0,0)` under background-clip. Recorded so it is not re-filed. |
| **R2 M-d** no breadcrumb on `/book`, `/thank-you` | **STILL OPEN** | §1. |
| **R2 M-e** disabled pagination at 2.53 | log only | Outside WCAG 1.4.3. |
| **R2 M-f** launcher clickable-looking with JS off | log only | Confirmed: `launcher = 1` with JS disabled. Kit behaviour. |
| **R3 S1** homepage sr-only caption | **CLOSED** | `.sr-only` containing "handles common pharmacy finance areas" = **1** on `/`, 0 elsewhere. |
| **R3 S2** post breadcrumb carries the full title | **CLOSED** | §2a below. |
| **R3 m1** kit FAQ eyebrow on the research pages | **STILL OPEN** | §1. |
| **R3 m2** `tool.intro` rendered twice | pre-existing, unchanged | Not reopened. |
| **R3 m3** `pound-sterling` in `llms.txt` | pre-existing, unchanged | Static file untouched. |
| **R3 m4** missing full stop | **STILL OPEN** | §1. |

### 2a. Breadcrumb final crumb — judged on 5 sampled posts

Visible `<li>` trail and `BreadcrumbList.name` are **identical on all five**, which
is the thing that matters most (one binding in the kit component).

| h1 (chars) | final crumb (chars) | reads well? |
|---|---|---|
| Share Purchase vs Asset Purchase for a Pharmacy: the Tax and Structuring Trade-Off (83) | Share Purchase vs Asset Purchase (32) | **yes** |
| The Cost of Buying a Pharmacy, and Whether It Is a Good Investment (66) | The Cost of Buying a Pharmacy (29) | **yes** |
| UK Pharmacy Closures: Independents vs Multiples, By the Numbers (62) | UK Pharmacy Closures (20) | **yes** |
| Limited Company vs Umbrella for Locum Pharmacists (49) | Limited Company vs Umbrella for Locum Pharmacists (49) | passable — no punctuation to split on, so nothing was trimmed |
| VAT on Pharmacy Private Services and Pharmacy First Income: Exempt, Standard-Rated, and the Partial-Exemption Trap (113) | VAT on Pharmacy Private Services and Pharmacy First Income (58) | **no** — 58 chars is a sentence, not a crumb |

**Verdict: the fix works on 3 of 5, is inert on 1, and under-trims 1.** The
smaller alternative, if the owner wants it tighter: keep the existing split but
add `" and "`, `" for "` and `" vs "` to the delimiter set and drop the cap to 42.
That yields "VAT on Pharmacy Private Services" (31) and "Limited Company" (15) —
the second is too short, so the honest cheap fix is instead **one
`breadcrumbLabel` line in the frontmatter of the two posts over 45 chars**. Either
is one change; neither is a tag gate.

---

## 3. PART B — parity judgement against the owner's bar

**The reference servers are not running and I did not start one**, so this
compares pharmacies' measured DOM against Property's and generalist's **source**
for the same templates. Stated plainly because it is weaker than a side-by-side.

| | pharmacies (measured) | Property (source) | generalist (source) |
|---|---|---|---|
| `/blog` hero | 309px, 1 eyebrow, 4 sections | `min-h-[350px]`, 5 eyebrow, 5 sections | `min-h-[300/350]`, 6 eyebrow, 5 sections |
| `/services` hero | **281px**, 1 eyebrow, 4 sections | `min-h-[300/350]`, 6 eyebrow, 6 sections | `min-h-[360/420]`, 6 eyebrow, 7 sections |
| `/calculators` hero | 353px, 1 eyebrow, 3 sections | `min-h-[300/350]`, 4 eyebrow, 3 sections | `min-h-[300/350]`, 4 eyebrow, 3 sections |
| h1 ramp | `lg:text-6xl` on all five hubs (60px measured) | `lg:text-6xl` | `lg:text-6xl` | 
| illustrative kit components | **4 distinct / 7 call sites** (`StatsCounter` 3, `CoverageCards` 2, `TestimonialsSection` 1, `NumberedReasons` 1) | **12 distinct / 128 call sites** (`TopicSection` 57, `CoverageCards` 15, `TestimonialsSection` 13, `StatsCounter` 13, `BlogCategoryHub` 10, `PromptMarquee` 8, `ProcessTimeline` 8, …) | — |

**Plainly: pharmacies is not at Property parity, but it is no longer "basic".**
The uplift did the one thing that was unarguable — the three bare hubs now have
real dark heroes, a band rhythm, an eyebrow and a glow group each, every route
ends light into the dark footer, and the type ramp reaches the third step
everywhere. The homepage was already there (14 bands, 11 eyebrows, 3 glow groups,
`DDLLDLLLLLDLDL`, 72px h1) and the post template remains the best thing on the
site. Three gaps are what an owner walking it at 1440 will actually see:

1. **The hub card walls are still paragraph boxes.** `/for` is five 100-word
   prose boxes with no icon, no arrow, no hover affordance, and a dead white
   half-row to the right of the fifth (`for-1440.png`). `/services`'s "All
   services" band is eight of the same (`services-1440.png`). This is R2 §5 item
   4 verbatim and the uplift did not touch it. **Cheapest fix:** one icon and one
   `card-glow` per card in the two local grids — no copy, no new link.
   → **next uplift round.**
2. **Eyebrow density is 1 per hub against the reference's 4–6.** Each hub has one
   eyebrow and then two or three bands with a bare h2. UA declined the rest in
   writing, correctly, because minting one authors copy. **Cheapest fix:** the
   owner supplies four short band labels (one per unlabelled band on `/blog`,
   `/calculators`, `/services`). → **owner question.**
3. **`/services` and `/for` heroes are 281px**, the thinnest on the site, against
   300–420 at the reference. UB raised the type step but not the box.
   **Cheapest fix:** `py-16 sm:py-20` → `py-20 sm:py-28` on those two heroes, one
   class each, no copy. → **fix before tag is optional; I would take it, it is
   two tokens.**

Not a parity gap but worth the owner's eye: the two capture surfaces that paint
over the hub content before he has scrolled (N1) will dominate his impression of
every one of these pages. Fix that first or the walk is about the panel, not the
design.

---

## 4. PART C — new regressions

1. **N2**, the G4 ring collapse to 1.00 on 15 white CTAs — the only one I would
   call a real regression. A fix landed after R2 and made one measured class of
   ring worse than R2 found it.
2. **N3**, `adjacentSame=1` on 13 detail routes from the un-grounded
   `NextStepOffer` mount.
3. **N1** is not strictly introduced by the uplift — the opener is W7's and R2
   saw the panel open inside B2 — but B2's fix did not cover it and no review has
   ruled on an unprompted panel.

**Checked and clean** (each a command, each passing): em-dash 0 on 15 routes
whole-file including JSON-LD · `neutral-*` 0 · `section-label` 0 · CTA triple
`header_contact`/`sticky_cta`/`sticky_cta_close` = 1/1/1 plus
`specialist_widget` = 1 on all 13 measured routes · footer consent control
"Do not track me" present on all 13 · every `ld+json` block parses on all 13,
with `BreadcrumbList` exactly once per URL on the 11 that carry one and absent on
`/`, `/book`, `/thank-you` as before · `scrollWidth == clientWidth` at **390 on
all 16 routes** (the `min-w-[24rem]` tables on `/` and the post sit inside their
own scroll container and do not move the document) · link counts above every
floor UA named (`/blog` 68 ≥ 37, `/services` 52 ≥ 18, `/for` 46 ≥ 15,
`/calculators` 45 ≥ 13) · embed chrome untouched · raw hex utilities in `tsx` = 0.

---

## 5. TAG NOW?

**No.** Four lines, then tag. Everything else is an owner question or a next
round.

1. `pharmacies/web/src/app/layout.tsx` — gate the widget opener behind a visitor
   action, or get the owner's word that an auto-opening panel is wanted. **(N1,
   blocker.)**
2. `pharmacies/web/src/app/globals.css` — add `:not(a):not(button):not(input)` to
   the four `.bg-white` selectors in G4's light-card reset. **(N2.)**
3. `pharmacies/web/src/app/page.tsx:482,493,503` and
   `research/pharmacy-density-and-workload-index/page.tsx:166,168`,
   `research/pharmacy-openings-closures-index/page.tsx:173` — append
   `${focusRing}`. **(S1.)**
4. `research/pharmacy-density-and-workload-index/page.tsx:184` and
   `research/pharmacy-openings-closures-index/page.tsx:189` — `text-white/50` →
   `text-white/70`. **(S7.)**

Take these three while the files are open, they are one token each and close a
stated gate row: `eyebrow=""` on both research `FaqSection` call sites (m1), a
`.` on `widget-config.ts:106` (m4), and the STATE.md adopted-components line
corrected to the 4 components that actually render (N4).

**Owner questions, not tag gates:** S2 (one dark, needs a kit prop), M-d (`/book`
breadcrumb), M-a (`slate-50` normalisation), the hub eyebrow labels, and whether
the auto-opening panel stays if he likes it.

**Next uplift round:** icons and glow on the `/for` and `/services` card walls,
`ProcessTimeline` / `TopicSection` / `BlogCategoryHub`, the 281px hub heroes, the
empty right rail on the post template, and N3's un-grounded `NextStepOffer` band.
