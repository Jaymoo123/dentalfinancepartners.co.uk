# Phase 5 adversarial fidelity review (independent)

Reviewer: independent agent, not the builder, not the manager.
Date: 2026-09-11. Method: rendered DOM on the running production server
`http://localhost:3167` (`next start`), plus the committed instruments at
`docs/_engines/instruments/` run with private `--out` files. Read-only: nothing
edited, built, committed or deployed.

Served-title assertion first, before anything else was trusted:

```
$ curl -s http://localhost:3167/ | grep -o '<title>[^<]*</title>'
<title>CIS Accountants &amp; Construction Tax Specialists | UK</title>
```

Correct site, correct server.

---

## A) VERDICT

**PASS-WITH-GAPS.**

0 blockers, 4 gaps, 3 nits. Every mandatory check ran against the rendered DOM
or the computed style, and the two things the phase was most likely to get
wrong (the 45-anchor link floor and CTA continuity) are both clean. The gaps
are all in the seams the committed instruments cannot see: two of the four are
invisible to `browser_check.mjs` as written, which is why they survived to this
review.

---

## B) GAPS, most severe first

### G1 — `/cis-refund` closes on two adjacent bands that render as one ground

`construction-cis/web/src/app/cis-refund/page.tsx` (last `<section>`) +
`src/components/marketing/LeadCTAPanel.tsx:49`

- **Spec:** DESIGN_DELTA / rollout §9 — no two adjacent bands share a ground.
  PHASE5_BUILD_SPEC:278 deletes the `border-b border-neutral-200` dividers and
  lets "the grounds oscillate".
- **Renders:** the band before `#book` is `--surface` `#fafaf9`
  (painted `rgb(250, 250, 249)`, luminance 0.9553) and the `#book`
  `LeadCTAPanel` band is `--hero-cream` `#fafaf7` (painted `rgb(250, 250, 247)`,
  luminance 0.9541). A 2/255 delta on one channel, ΔL 0.0012. With the divider
  now deleted there is nothing at all separating them: the closing capture band
  reads as a continuation of the rate band above it. `/services` and
  `/gross-payment-status` both happen to land white-then-cream and are fine.
- **Why no instrument caught it:** `browser_check.mjs --grounds` compares band
  colours by string equality, so `rgb(250,250,249)` ≠ `rgb(250,250,247)` scores
  as an oscillation. It also walks `main > section` only, and all three new
  `#book` bands are wrapped in a `<div id="book" class="scroll-mt-24">`, so on
  every one of the three routes the instrument never measured the new band at
  all. Both counts it printed (`adjacent bands sharing a ground: 0`,
  `lastBand`) are therefore blind to the entire Phase 5 closing band.
- **Severity:** gap.
- **Fix:** oscillate the band immediately above `#book` on `/cis-refund` from
  `bg-[var(--surface)]` to `bg-[var(--surface-elevated)]`. One class. Separately
  worth a follow-up: make the grounds comparison a luminance-delta test
  (ΔL < 0.01 = same ground) and descend one level into non-section band
  wrappers, or this whole class of defect stays invisible on every future port.

### G2 — `/cis-refund` contradicts its own HowTo schema and the house position on refund timing

`construction-cis/web/src/app/cis-refund/page.tsx` (FAQ "How long does it
take?" `<p>`) vs the same file's `buildHowToJsonLd`

- **Spec:** trap T17 — every assertion in the JSON-LD matches what renders.
  `docs/construction-cis/house_positions.md:187` — "**SA online repayment:**
  typically 5-10 working days".
- **Renders, on one page, under the same question:**
  - body: "For a correctly filed sole-trader Self Assessment return, HMRC
    typically processes and issues the refund within **8 to 12 weeks**."
  - `HowTo` step 3 "How long it takes": "HMRC typically processes Self
    Assessment repayments within **5 to 10 working days** of filing."
  - A visitor and a crawler reading the same page get figures that differ by
    roughly a factor of six, and the body figure appears nowhere in house
    positions.
- **Confirmed and characterised as briefed, NOT fixed.** The schema and the
  house position agree with each other; the body is the outlier. This is a
  factual/claims decision, not a design one, so it is escalated in §D rather
  than patched.
- **Severity:** gap (would be a blocker if the two figures disagreed in the
  *other* direction, i.e. schema overpromising against a slower body claim).
- **Fix, once the owner rules:** change the body sentence to the house figure,
  or change house positions and the HowTo. Do not leave two numbers.

### G3 — the homepage ships a BreadcrumbList for a breadcrumb it does not render, with one item

`construction-cis/web/src/app/page.tsx` (JSON-LD set, `:202` region)

- **Spec:** T17 — schema must describe what renders. PHASE5_BUILD_SPEC adds
  BreadcrumbList to the homepage alongside Service and WebPage.
- **Renders:** the homepage `BreadcrumbList` has exactly one `ListItem`,
  `position 1 / "Home"`, and the homepage has **no** visible breadcrumb
  (`grep -o 'aria-label="Breadcrumb"' home.html | wc -l` = 0, against 1 on each
  of `/services`, `/cis-refund`, `/gross-payment-status`). A single-item
  BreadcrumbList is not eligible for the breadcrumb rich result and describes a
  UI element that is not on the page.
- **Severity:** gap.
- **Fix:** delete the BreadcrumbList block from `/` and leave the other three.
  The other three are correct (2 items, matching the rendered trail).

### G4 — the `#book` capture band on both pillars is untracked and unreachable from the page

`construction-cis/web/src/app/cis-refund/page.tsx:233`,
`construction-cis/web/src/app/gross-payment-status/page.tsx:241`

- **Spec:** PHASE5_BUILD_SPEC:278 — the `#book` `LeadCTAPanel` is "this
  package's headline" and is the conversion surface the pillars previously
  lacked. The additive-id precedent set this phase (`home_hero_book`,
  `services_hero_book`, and the estate's `for_hero_book` on 45 routes) is that
  a new capture anchor gets a `data-cta`.
- **Renders:** on both pillars, `id="book"` exists with
  `scroll-margin-top: 96px`, but there is **no `data-cta` anywhere on the
  panel** and **no `<a href="#book">` anywhere on the page** — the only in-page
  anchor on either pillar is the `#main` skip link. So the band converts
  silently (no funnel row distinguishes it from any other `LeadForm`) and no
  visitor is ever sent to it except by scrolling to the bottom.
- **Severity:** gap. Not a regression — nothing was lost — but the phase's
  stated headline lands without the instrumentation or the on-page path the
  same phase gave `/` and `/services`.
- **Fix:** add `pillar_hero_book｜hero｜form｜#book` (new id, additive, never a
  Property id) to each pillar hero's existing CTA button, matching
  `for_hero_book` exactly in shape. Pin both in
  `src/tests/design/cta-attribute-diff.test.ts`.

### N1 (nit) — `home_hero_book` carries `data-cta-variant`, its siblings do not

`construction-cis/web/src/app/page.tsx` (hero) vs `/services` hero and
`/for/<slug>` hero

Rendered: `home_hero_book` emits `data-cta-variant="leadgen"`;
`services_hero_book` and the 45-route `for_hero_book` do not. Harmless for
capture (the id/placement/goal triple is what matters and all three are right),
but it makes the three siblings non-identical for no reason. Fix: drop the
attribute from `home_hero_book`, or add it to the other two. One line either way.

### N2 (nit) — `/services` has seven anchor targets and nothing that links to them

`construction-cis/web/src/app/services/page.tsx`

All seven service ids exist and all seven compute `scroll-margin-top: 96px`
(`cis-refund`, `gross-payment-status`, `sole-trader-sa`, `limited-company`,
`cis300-returns`, `vat-mtd`, `expenses`), which is what the spec's exit
criterion §383 asks for, and the page's own `OfferCatalog` JSON-LD points at all
seven. But no element on the page links to any of them — the only real in-page
anchors are `#book` and `#main`. Inbound and schema links resolve, so this is
not a breach; it is worth knowing that the "7 in-page anchors" phrasing in the
review brief describes targets, not navigation. Fix, if wanted: a jump-nav row
under the hero. Not required by the spec.

### N3 (nit) — the homepage renders the same `<h3>` twice

`construction-cis/web/src/app/page.tsx` — section 2 (problem cards) and
section 5 (service cards) both render `<h3>Gross payment status</h3>`.

Two genuinely different cards with different bodies, so this is not the
"heading rendered twice" defect from the sibling port. It is still a duplicated
heading string on one document. Fix, if wanted: make the problem card's heading
"Stuck on the 20% deduction" or similar. Cosmetic.

---

## C) CLEARED — every mandatory check, with the command and the decisive line

**1. The 45 `/for/<slug>` anchors on `/`. CLEAR.**
```
$ curl -s http://localhost:3167/ | grep -o 'href="/for/[a-z0-9-]*"' | wc -l
45
$ ... | sort -u | wc -l
45
```
45 total, 45 unique, all in the server HTML (this is `curl`, no JS ran).
Cross-checked by the sweep: `0 LINK-FLOOR breaches (5247 links total)`.

**2. CTA continuity, trap T22. CLEAR.**
Full attribute sets extracted from the rendered HTML (id + placement + goal +
href + variant), not ids alone, and diffed against
`docs/construction-cis/_port/cta_baseline.json.per_route`:

| route | rendered | baseline |
|---|---|---|
| `/` | `hero_primary｜hero｜lead｜/contact` | **identical** |
| `/` | `header_nav_primary｜header｜contact｜/contact` | identical |
| `/` | `specialist_widget｜-｜-｜-` | identical |
| `/` | `home_hero_book｜hero｜form｜#book` | **new, additive** |
| `/services` | `services_hero_book｜hero｜form｜#book` | **new, additive** |

`hero_primary` is byte-identical including href — Property's
`header_book｜header｜form` id/goal was **not** adopted anywhere; Trade keeps
`header_nav_primary｜header｜contact`. Both new ids sit on buttons that carried
no `data-cta` in the baseline (baseline `/` count 3, `/services` count 2).
Drawer CTA assessed from source and the shipped client chunks: the drawer emits
Trade's own `header_mobile_primary｜header_mobile`, and the only CTA id in the
static chunks is `see_result`; no Property id is present in any bundle.
Sweep: `0 data-cta regressions (604 total)`.

**3. `featuredBadge=""`. CLEAR.**
```
$ grep -o 'Most Popular' home.html services.html | wc -l   ->  0 and 0
```
Mechanism confirmed, not assumed: `packages/web-shared/components/ServiceTiers.tsx:49`
guards with `tier.featured && featuredBadge &&`, so the empty string is falsy
and **no element is emitted at all** — not an empty badge, not a zero-height
span. Both `page.tsx:394` and `services/page.tsx:242` pass `featuredBadge=""`.

**4. Structured data against the page, trap T17. CLEAR except G2 and G3.**
Every JSON-LD block on all four routes parses (`sweep.mjs`: `194/194 URLs
clean`). Blocks rendered: `/` = ProfessionalService+AccountingService, WebSite,
FAQPage, BreadcrumbList, Service, WebPage+AccountingService; `/services` =
Service with `hasOfferCatalog` (all seven Offer `url` fragments resolve to real
ids on the page, verified id by id); both pillars = HowTo + BreadcrumbList.
- FAQ from ONE binding: `page.tsx:156` `const faqs = [...]` feeds both
  `buildFaqJsonLd(faqs)` at `:202` and the rendered `<details>` at `:721`.
  All four schema `name` strings appear in the rendered body.
- `"recoup our fees many times over"`: **0 occurrences** in body or schema on
  all four routes.
- The 8-to-12-weeks vs 5-to-10-working-days contradiction: confirmed and
  characterised at **G2**, deliberately not fixed.
- Single-item homepage BreadcrumbList with no rendered breadcrumb: **G3**.

**5. Anchors and scroll offsets. CLEAR.**
Computed `scrollMarginTop` read from the live DOM at 1440px for every anchor
target on all four routes:
```
/                       book 96px
/services               book 96px, cis-refund 96px, gross-payment-status 96px,
                        sole-trader-sa 96px, limited-company 96px,
                        cis300-returns 96px, vat-mtd 96px, expenses 96px
/cis-refund             book 96px
/gross-payment-status   book 96px
```
All ≥ 96px. `#main` at `0px` on all four — the known estate-wide item, not
reported. **Measured by hand on purpose:** `browser_check.mjs:283` only raises a
gap when `sm < 24` while printing "want >= 96px", so anything between 24px and
95px passes its gate silently. Everything here is 96px, so the instrument and
the direct measurement agree today, but the gate is looser than the rule.

**6. Grounds. CLEAR except G1.**
Measured by painting each band's resolved background into a 1×1 canvas and
reading the pixel back — never by parsing class names. Grounds self-test passed
on all four reference values including both `oklch()` forms.
- `/` = 14 bands, `[navy, white, n50, white, n50, cream/60, white, n50, navy,
  white, n50, white, navy(#book), white]`. No adjacent pair shares a ground, no
  dark touches dark, last band light (white) before the navy footer
  (`oklch(0.208 0.042 265.755)`). 14 sections confirms the spec's 14, not 13.
- `/services` = cream, white, surface, white, cream(#book). Clean.
- `/gross-payment-status` = cream, white, surface, white, cream(#book). Clean.
- `/cis-refund` = cream, white, surface, white, **surface, cream(#book)** →
  **G1**.
- Dark band touching the footer: 0 on all four. Last band light on all four.

**7. Contrast on Phase 5 surfaces. 4 of the 5 baseline findings survive, 1 fixed, 0 new.**

| route | element | ratio | floor | **source** | colour | status |
|---|---|---|---|---|---|---|
| `/` | `span "✓"` 16px (mobile) | 2.80 | 3 | **TOKEN** `--brand-primary` → `--accent` | `#f97316` painted `rgb(249,115,22)` | **survives** |
| `/` | `span "✓"` 18px (≥768) | 2.80 | 3 | **TOKEN**, same | `#f97316` | **survives** |
| `/services` | `span "✓"` 16px (mobile) | 2.80 | 3 | **TOKEN**, same | `#f97316` | **survives** |
| `/services` | `span "✓"` 18px (≥768) | 2.80 | 3 | **TOKEN**, same | `#f97316` | **survives** |
| `/gross-payment-status` | `span "01"/"02"/"03"` 14px | 2.89 | 4.5 | **UTILITY** `oklch(0.705 0.213 47.604)` | orange-500 ramp | **FIXED** |

- The GPS step numerals now render `text-[var(--accent-strong)]` (`#c2410c`,
  5.18 on white per `globals.css:45`) and produce no finding at any of the four
  widths. Real fix, verified in the DOM, not a disappearance: the `01/02/03`
  spans are still present.
- The surviving ticks render
  `class="text-[var(--brand-primary)] font-bold ..."`, 19 per page on both `/`
  and `/services`. `--brand-primary` resolves through `--accent` = `#f97316`,
  and `globals.css:43-44` states in its own comment that this token "must never
  carry text on a light ground. Use `--accent-strong`." So this is the site's
  own documented contract being broken **from a token, not a utility** — the
  distinction matters because a source-only grep for the orange-500 ramp class
  finds nothing here.
- No alpha on any of these: all measured as composited pixels, all opaque.
- **Zero new contrast findings introduced by Phase 5** across all four routes ×
  four widths, including every new band (calculators, latest-insights, the
  three `#book` panels, the `/services` form).
- Coverage caveat, stated rather than hidden: `0 subtree(s) unrendered at every
  width` apart from the desktop nav (`nav.hidden.min-w-0...`), which is the
  drawer and is expected.

**8. Copy freeze, including through default props. CLEAR.**
- `LeadCTAPanel` defaults (`:21` `eyebrow = "Free consultation"`, `:25`
  `formTitle = "Book your free call"`, `:26` `submitLabel`) — **every one of
  the three call sites passes all three explicitly**; no default copy leaked
  onto any route.
- The homepage `#book` band is hand-rolled (`page.tsx:625`), not the panel, and
  its `"Find out what you are owed"` / `"Book your free call"` strings are
  byte-identical to `9c353e1f` (`git show 9c353e1f:...page.tsx` lines 521/556).
- H1 and standfirst on `/` byte-identical to `9c353e1f`.
- `"Fixed fees, quoted before we start"` on both pillars is **pre-existing**
  (present at `9c353e1f` in both files); the phase moved it into the panel, it
  did not author a new fee promise. Checked precisely because check 8 warns
  about exactly this.
- Glyph/ordinal check: the GPS three qualifying tests still render as
  **numbered** `01 / 02 / 03` spans, not ticks. No numbered sequence anywhere
  in scope was converted to identical glyphs.
- Sweep: `0 dash regressions (2 total)` — the two accepted en-dashes in
  protected numeric money ranges.

**9. Consent wording untouched. CLEAR.**
`git diff 9c353e1f..aab3886b -- construction-cis/web/src | grep -i consent`
returns **nothing**. The new `/services` form renders
`siteConfig.leadConsentText` through the same `LeadForm.tsx:479` path as every
other form, and the rendered tail is byte-identical on `/services`,
`/cis-refund` and `/contact`: *"By submitting this enquiry you confirm you
understand this."* The 2026-08-24 string is not present.

**10. Accessibility. CLEAR.**
Live DOM, 1440px, all four routes: exactly one `<h1>` per page; the only
`role="img"` is the Union Jack SVG and it carries `aria-label="Union Jack
flag"`, so no data is swallowed; the only `aria-hidden` elements carrying text
are the honeypot label ("Company website (leave blank)") and a decorative
emoji — no content, no figures, no headings hidden. `StatsBar` count-up **not**
reported, as instructed: confirmed server component printing a literal.
`sweep.mjs`: 0 console errors, 0 failed requests, 0 dead internal links
(`0/70`).

**Instruments run (private outputs, no baseline touched):**
```
node docs/_engines/instruments/browser_check.mjs --site=construction-cis \
  --base=http://localhost:3167 --grounds --out=tmp/bc_p5review_indep.json \
  / /services /cis-refund /gross-payment-status
  -> self-test OK (slate-500/white 4.76, slate-400/white 2.56)
  -> 16 page-loads, 0 with NEW problems
node docs/_engines/instruments/sweep.mjs --site=construction-cis \
  --base=http://localhost:3167 --out=tmp/sweep_p5review_indep.json
  -> 194/194 URLs clean, 0/70 internal links dead, 0 LINK-FLOOR breaches
     (5247 links), 0 data-cta regressions (604), 0 dash regressions (2)
```

---

## D) OPEN QUESTIONS FOR THE OWNER

1. **How long does a CIS refund actually take?** The refund page tells a
   visitor "8 to 12 weeks". The machine-readable version of the same page, and
   our own house figures, say "5 to 10 working days". Those cannot both be
   right and a visitor can see one while Google reads the other. Which number
   do we stand behind?

2. **The orange tick marks on the homepage and services page are too pale to
   read for anyone with weaker sight** — they sit at about half the legibility
   we require, and our own house note says this exact orange must never be used
   for anything a person has to read. Do we darken them (same orange, one shade
   down, nothing else changes), or leave them and accept the accessibility
   complaint?

3. **The booking form at the bottom of the two main service pages has no way to
   reach it from the top of the page and no tracking on it.** Do you want a
   "Book a call" button in the page header that jumps to it, so we can see how
   many people use it? It is a small change and it would tell us whether that
   form is earning its place.

---

## E) THINGS IN THE REVIEW BRIEF THAT ARE NOT TRUE

1. **"Read `git log -1 --format=%B HEAD` ... for what Phase 5 did."** `HEAD` is
   `3ab06a64`, a **Dentists** phase 6 commit. Trade's Phase 5 is `da7ec668`
   (build) and `aab3886b` (gap-fix), several commits back. The running server
   does include Phase 5, so the review stands, but the named command shows the
   wrong site's work.
2. **"`/services` has 7 in-page anchors."** Seven anchor *targets* exist. Zero
   links on the page point at them. See N2.
3. **"`#main` ... on all 166 routes."** The sweep covers 194 URLs (164 core +
   30 sampled articles). The finding is right; the route count is not.

## F) THINGS I COULD NOT DO

- I could not diff Phase 5 against a **post-Phase-5** committed browser
  baseline, because none exists: `_port/browser_baseline.json` is the
  pre-Phase-5 re-capture. All "survives / fixed / new" statements above are my
  own fresh measurement against that pre-Phase-5 baseline, which is the correct
  comparison, but no one has yet recorded the new state.
- I did not exercise the drawer CTA in a real open-menu render (the brief
  permits reading the shipped bundle instead, which is what I did).
- I did not assess `/admin/analytics/**` (exempt) or any route outside the four
  in scope.

---

# RE-REVIEW (independent, post gap-fix) — 2026-09-11

Reviewer: second independent agent. Not the builder, not the manager, not the
first reviewer. Decides whether Phase 5 is tagged.

Method: rendered DOM and computed style on the running production server
`http://localhost:3167` (`next start`), built from HEAD `8ea5aea9` (the
gap-fix). Committed instruments run with private `--out`; no baseline file
written; `--save-baseline` never passed. Read-only: nothing edited, built,
committed, tagged or deployed. Working tree for `construction-cis/web` is clean.

Served-title assertion first, on `/` not `/blog`:

```
$ curl -s http://localhost:3167/ | grep -o "<title>[^<]*</title>"
<title>CIS Accountants &amp; Construction Tax Specialists | UK</title>
```

Instrument self-test lines, quoted verbatim before any figure is quoted:

```
self-test OK (slate-500/white 4.76, slate-400/white 2.56)
grounds self-test OK: rgb(15, 23, 42) lum=0.0088 dark; rgb(255, 255, 255) lum=1 light;
oklch(0.208 0.042 265.755) lum=0.0089 dark; oklch(0.985 0.001 106.423) lum=0.9553 light;
same-ground threshold 3 -> rgb(250, 250, 247) vs rgb(250, 250, 249) d=2.84 SAME;
rgb(255, 255, 255) vs rgb(250, 250, 249) d=15.72 DIFFERENT
coverage: 0 unparseable colour(s)
```

---

## A) VERDICT

**PASS-WITH-GAPS. DO NOT TAG YET.**

0 blockers, 3 gaps, 3 corrections to the brief. Four of the fix pass's five
claims are verified true in the rendered DOM. The fifth, claim 1, is true on the
part it names (the four ids render, additively, and nothing existing moved) and
**wrong in a way it did not consider**: two of the four ids were put on a
non-interactive `<div>` that wraps a live form, which changes the analytics
behaviour of eleven form controls and three pre-existing links per route.

Tag after G1 is settled. It is a two-line deletion.

---

## B) GAPS, most severe first

### G1 — the two `*_book_panel` ids sit on a wrapper `<div>` around a live form, so every form-field click and three existing link clicks now emit `cta_click`

`construction-cis/web/src/app/cis-refund/page.tsx:266-271`,
`construction-cis/web/src/app/gross-payment-status/page.tsx:262-267`

- **Spec / stated intent** (commit `8ea5aea9`): "each panel wrapper gains a
  data-cta so the band attributes its own form through autoCapture's
  `closest("[data-cta]")`".
- **What actually renders and what it does.** `packages/web-shared/analytics/autoCapture.ts:99-110`
  resolves EVERY click through `target.closest("[data-cta]")`, emits `cta_click`
  and then `return`s, so the `data-track` and `a[href]` branches below it never
  run. The wrapper is an ancestor of the whole `LeadCTAPanel`. Measured live at
  1440:

  ```
  /cis-refund             form controls inside a data-cta wrapper: 11  [cis_refund_book_panel]
  /gross-payment-status   form controls inside a data-cta wrapper: 11  [gps_book_panel]
  /gross-payment-status   links inside #book: ["/cis-refund","/for","/privacy-policy"]  wrapped: true
  ```

  Three consequences, none of them intended:
  1. Clicking any of the 11 inputs, selects, checkboxes or the submit button
     fires `cta_click{cta_id: *_book_panel, goal: form}`. One completed lead
     emits a handful of "CTA clicks". `vw_cta_performance` for these two routes
     becomes uninterpretable, and the panel will read as the best converting
     surface on the site by construction.
  2. On `/gross-payment-status`, three links that existed before this phase
     (`/cis-refund`, `/for`, `/privacy-policy`) stop emitting their previous
     link event and emit `cta_click` as `gps_book_panel` instead. That is a
     **silent substitution of an existing event**, not an addition, and no CTA
     instrument can see it because no `data-cta` id changed.
  3. The homepage runs the same closing form with **no** wrapper id
     (`form controls inside a data-cta wrapper: 0` on `/`). The same form is now
     instrumented three different ways on three routes.
- **It is also outside trap-22 surveillance.** `docs/_engines/instruments/cta_snapshot.mjs:40`
  is `TAG = /<(?:a|button)\b[^>]*\bdata-cta.../`, anchors and buttons only. The
  two div-level ids are invisible to it: `sweep.mjs` counts **816** tags,
  `cta_snapshot.mjs` counts **814** and lists 14 triples summing to exactly 814.
  A future edit could flip either wrapper's `goal` or `placement` and the
  estate's T22 instrument would never report it.
- **The stated need is already met without them.** `src/components/forms/LeadForm.tsx:83-84`
  already emits its own lifecycle events (`onFieldFocus`, `onFieldBlur`,
  `onError`, `onSubmit`, `onLead`), so the band's conversions were never
  indistinguishable. The real half of the fix, the hero link that gives the panel
  an inbound path, is `cis_refund_hero_book` / `gps_hero_book`, and those are
  correct.
- **Severity:** gap (high). No lead capture is lost and no live id moved, so not
  a blocker, but it corrupts the one table trap 22 exists to protect.
- **Exact minimal fix:** delete the three attribute lines from each wrapper,
  leaving `<div id="book" className="scroll-mt-24">` as it was, and drop the two
  `*_book_panel` lines from `src/tests/design/cta-attribute-diff.test.ts`. Keep
  both hero links. If panel-level attribution is wanted later it belongs on the
  submit button as an `<a>`/`<button>`-level id, which is what every other id in
  this estate is.

### G2 — `browser_check.mjs --grounds` is still wrong below 1440, and now invents breaches rather than under-reporting

`docs/_engines/instruments/browser_check.mjs:385-389`

- **Spec** (the repair commit's own words at `:374`): the containment filter
  keeps "the conservative direction of the old rule (a ground arriving by some
  route other than a bg- utility is still missed, which **under-reports rather
  than inventing a breach**)".
- **What it does:** `cand.filter((el) => !cand.some((o) => o !== el && el.contains(o)))`
  drops the OUTER candidate and keeps its descendants. Any real band containing a
  full-width `bg-` child — a stacked card at 390, a white table wrapper, the
  white form card inside `LeadCTAPanel` — is deleted from the band list and
  replaced by its children, which then read as a run of identical grounds. It
  invents breaches, which is exactly what the comment promises it does not.
- **Renders (my run, 10 routes, 4 widths):** headline
  `adjacent bands sharing a ground: 8 [/locations 2, / 1, /services 1, /cis-refund 1,
  /gross-payment-status 1, /blog 1, /calculators 1]` and
  `dark band touching the footer: 1 [/calculators 1]`. Every one of those pairs
  is `rgb(255,255,255) / rgb(255,255,255) (distance 0)` or navy/navy, and every
  one occurs only at 390/768/1024. At 1440 the same run reports **0 and 0**.
- **Settled by direct measurement, not by the instrument.** Walking the true
  bands (children of `<main>`, descending only through transparent wrappers) at
  all four widths returns an identical sequence at every width:

  ```
  /cis-refund             cream | white | #fafaf9 | white | oklch(0.97 0.001 106.424) [stone-100] | cream(panel)
  /gross-payment-status   cream | white | #fafaf9 | white | cream(panel)
  /calculators            navy(hero) | white                      footer navy
  ```

  So `/calculators` does **not** have a dark band on the footer, and no Phase 5
  route has a real adjacent-same pair at any width.
- **Severity:** gap (instrument, not the site). It matters because this is the
  estate's shared grounds instrument and further ports are queued behind it.
- **Exact minimal fix:** invert the filter to keep the outermost candidate,
  `cand.filter((el) => !cand.some((o) => o !== el && o.contains(el)))`, and add a
  third self-test pair: a band containing a full-width child must yield one band,
  not two.

### G3 — `cta_snapshot.mjs` cannot see a div-level `data-cta`

`docs/_engines/instruments/cta_snapshot.mjs:40`

`TAG` matches `<a>` and `<button>` only. Live: sweep **816**, snapshot **814**.
Severity: nit while G1 stands, because fixing G1 removes both invisible tags. If
wrapper-level ids are ever kept anywhere in the estate, this regex has to widen
first or trap 22 has a permanent blind spot.

---

## C) CLEARED — every check, with the command and the decisive line

**1. The four new ids render, additively, with the right placement, goal and href. CLEAR on placement/goal/href; see G1 for the element two of them sit on.**
Read from the live DOM at 1440, full attribute set:
```
/cis-refund             a   cis_refund_hero_book  | hero    | form | href=#book | variant=null
/cis-refund             div cis_refund_book_panel | closing | form | href=null
/gross-payment-status   a   gps_hero_book         | hero    | form | href=#book | variant=null
/gross-payment-status   div gps_book_panel        | closing | form | href=null
```
Both hero links are `<a href="#book">`, an on-page anchor, which is `goal="form"`
under this site's taxonomy. Correct. `href="#book"` count is now **1** on each of
`/`, `/services`, `/cis-refund`, `/gross-payment-status`; it was 0 on the two
pillars before the fix, which is the orphaned-ask defect closed.

**2. No existing id, placement, goal or href changed anywhere (trap T22). CLEAR, the strongest single result in this review.**
Full attribute-set diff (`id|attrName|placement|goal|href`) of the live
`cta_snapshot` against `_port/cta_baseline.json.per_route`, **all 246 routes, not
ids alone**:
```
baseline routes 246 live routes 246
MISSING(any attr changed or lost): 0 ADDED: 194
```
Zero baseline tuples missing on any route. 194 additions, every one exactly `+1`
on its route, no route decreased, no route collision.
The 5 locked triples, byte-identical at their locked counts:
```
header_nav_primary|header|contact|data-cta -> 246
specialist_widget|null|null|data-cta       -> 246
next_step|null|null|data-cta               -> 109
next_step|null|form|data-cta               ->  18
hero_primary|hero|lead|data-cta            ->   1
```
Sweep total **812 -> 816, delta +4**, decomposing as the 2 hero links plus the 2
wrapper divs; per route `/cis-refund +1` and `/gross-payment-status +1` in the
snapshot, which cannot see the divs (G3).

**3. `data-cta-variant` dropped from `home_hero_book`, and nothing else lost an attribute. CLEAR; the reasoning holds.**
Live `/` at 1440: `home_hero_book | hero | form | #book | variant=null`, and the
four sibling `*_book` ids (`services_hero_book`, `cis_refund_hero_book`,
`gps_hero_book`, `for_hero_book`) carry `variant=null` too. The two ids that
still carry `variant="leadgen"`, `header_nav_primary` and `hero_primary`, are
untouched and are the two that have shipped. `git show 8ea5aea9` removes exactly
one line, `data-cta-variant={niche.cta.variant}`, and the 246-route diff above
shows 0 missing tuples, so no other attribute was lost in the same edit.

**4. The invisible band on `/cis-refund` is fixed, by painted colour. CLEAR.**
Painted through `getComputedStyle`, never read from classes. The rates band now
paints `oklch(0.97 0.001 106.424)` (stone-100, which the instrument converts to
`rgb(245,245,244)`) against the `#book` panel's `rgb(250,250,247)`. The
instrument's own redmean puts white vs `#fafaf9` at 15.72 and the two OLD grounds
at 2.84 (SAME); the new pair is comfortably distinct, and the run now reports
**0 adjacent-same on `/cis-refund` at 1440** where the same measurement before
the fix named bands 4 and 5 at distance 2.84. The sequence is identical at
390/768/1024 (G2 explains why the instrument says otherwise).
- **No new contrast finding arrived with the new ground:** `/cis-refund` reports
  `contrast=0` at **all four widths**. The caption renders
  `class="mt-6 text-sm text-neutral-600 max-w-2xl"` as claimed.
- **The last band before the navy footer is still LIGHT on both pillars:**
  `lastBand rgb(250,250,247)` against `footerGround rgb(15,23,43)`, and
  `dark band touching the footer: 0` across the four Phase 5 routes.
- Whole-run result with the correct route key: `16 page-loads, 0 with NEW problems`.

**5. The fix went at the CALL SITE, not in `LeadCTAPanel`. CLEAR.**
`git diff da7ec668..8ea5aea9 --stat` touches 5 files: the two pillar pages, the
homepage, `/services` (1 line, from the earlier gap-fix) and the design test.
`LeadCTAPanel.tsx` is **not among them**. Seven untouched consumers spot-checked
in the rendered HTML; `book_panel` appears **0** times on every one:
```
/blog             header_nav_primary blog_index_primary specialist_widget  | book_panel=0
/glossary         header_nav_primary specialist_widget                     | book_panel=0
/glossary/cis     header_nav_primary glossary_entry_book specialist_widget | book_panel=0
/locations        header_nav_primary specialist_widget                     | book_panel=0
/locations/london header_nav_primary specialist_widget                     | book_panel=0
/services         header_nav_primary services_hero_book specialist_widget  | book_panel=0
```

**6. Homepage BreadcrumbList deleted, schema still sound, the other three still render breadcrumbs. CLEAR.**
Homepage JSON-LD parsed block by block: `blocks: 5`,
`types: [[ProfessionalService, AccountingService], WebSite, FAQPage, Service, [WebPage, AccountingService]]`
— no `BreadcrumbList`, every block parses, `aria-label="Breadcrumb"` count 0.
`FAQPage blocks: 1`, and all four questions **and** all four answers appear in the
rendered body, so it remains ONE binding and not two copies.
`buildBreadcrumbJsonLd` is still imported and called at
`src/components/ui/Breadcrumb.tsx:3,21`. The other three routes each render one
visible breadcrumb and a 2-item BreadcrumbList (`"position":` count = 2 on each).

**7. Full sweep. CLEAR.**
```
node docs/_engines/instruments/sweep.mjs --site=construction-cis --base=http://localhost:3167 \
  --sample=9999 --sha=18b4f25f39cd0c4aa084e582d69a87c8a10710ac --out=<private>
246/246 URLs clean, 0/18 internal links dead, 0 LINK-FLOOR breaches (6750 links total),
0 data-cta regressions (816 total), 0 dash regressions (2 total)
```
Routes clean, dead links 0, link floor unchanged at 6,750, dashes **2** (the
accepted protected ranges), total `data-cta` 812 -> 816 diffed both per route and
in total: no route decreased, so no route collision.

**8. 45 `/for/<slug>` hrefs in the server HTML on `/`. CLEAR.**
```
$ curl -s http://localhost:3167/ | grep -o 'href="/for/[a-z0-9-]*"' | wc -l   -> 45
$ ... | sort -u | wc -l                                                        -> 45
```

**9. No new interruptive surface. CLEAR.**
`git diff da7ec668..8ea5aea9 --name-only` touches no modal, banner, popup, sticky
or exit-intent file, and `role="dialog"` is 0 in the served HTML of all four
Phase 5 routes.

**10. Consent wording untouched. CLEAR.**
`git diff da7ec668..8ea5aea9 -- construction-cis/web/src | grep -i consent` returns
0 lines. The rendered tail on `/cis-refund` is still
"By submitting this enquiry you confirm you understand this."

**11. Anchor rule at its repaired >= 96px threshold. CLEAR, no new findings.**
The only anchor gap on any of the four routes at any width is the known
estate-wide `#main scroll-margin-top=0px (want >= 96px / scroll-mt-24)`. The
`#book` targets pass. Judged on the rule and not on novelty: no target on these
routes sits in the newly-enforced 24-95px window.

---

## D) OPEN QUESTIONS FOR THE OWNER

1. **The booking form at the bottom of the two main service pages is now tagged
   in a way that counts every click on a form box as a button click.** Left as it
   is, the report that tells you which buttons earn their place will show that
   form as the best performing button on the site, which is not true. I want to
   remove those two tags. The useful half of the change, a "Book a free call"
   button at the top of each page that jumps down to the form, stays either way.
   Remove them?

2. **How long does a CIS refund actually take?** Still open from the first
   review, still unanswered. The page tells a visitor "8 to 12 weeks" while the
   machine-readable copy of the same page, and our own house figures, say "5 to
   10 working days". A visitor sees one and Google reads the other.

3. **The orange tick marks on the homepage and services page are still too pale
   to read comfortably**, about half the legibility we require, and our own house
   note says this orange must never carry text a person has to read. Darken them
   one shade, or accept it?

## E) THINGS IN THE RE-REVIEW BRIEF THAT ARE NOT TRUE

1. **Quoting a bare route as `"//"` silently breaks the baseline comparison.**
   The route is recorded verbatim and `browser_baseline.json` is keyed
   `/|mobile`, so `//` matches nothing and every homepage finding is reported as
   NEW. My first run said `40 page-loads, 4 with NEW problems`; the identical run
   with a plain `/` (under `MSYS_NO_PATHCONV=1`, which is sufficient on its own)
   said `16 page-loads, 0 with NEW problems`. The four "NEW" loads were the four
   homepage widths and nothing about them was new.
2. **"Last reading was ... total 812".** It is now **816**, which is correct and
   expected: +2 hero links and +2 wrapper divs.
3. The grounds repair commit's claim that the mode "under-reports rather than
   inventing a breach" is false. See G2: it invented one dark-on-footer breach on
   `/calculators` and eight adjacency breaches across seven routes.

## F) THINGS I COULD NOT DO

- I ran no build and did not re-run `npm test` or the design suite: the brief
  forbids a build, and the suites' pass is taken from the commit account rather
  than verified here. The four pinned lines are present in
  `src/tests/design/cta-attribute-diff.test.ts`; that the pin bites was not
  re-proved by mutation.
- I did not exercise a real click through `autoCapture` in a live analytics
  session. G1 is established from the rendered DOM (`closest("[data-cta]")`
  resolved live for all 11 form controls and 3 links per route) and from reading
  `autoCapture.ts:99-110`, which is decisive for what the handler will do.
- No post-Phase-5 browser baseline exists, so "new vs survives" is still measured
  against the pre-Phase-5 re-capture, as in the first review.
