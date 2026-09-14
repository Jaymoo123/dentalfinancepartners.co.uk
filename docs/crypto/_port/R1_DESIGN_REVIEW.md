# R1 — independent adversarial DESIGN review, crypto design port

Reviewer: R1 (did not build any of it). Date 2026-09-14.
Scope: rendered DOM at 390 / 768 / 1024 / 1440 across all 53 routes + `/book`, `/thank-you`.

---

## 0. Server identity and age — PROVEN, then the server DIED mid-review

Identity:

```
$ curl -s http://localhost:3174/ | grep -o '<title>[^<]*</title>'
<title>Crypto Tax Partners | Specialist UK Crypto Tax Accountants</title>
$ curl -s http://localhost:3174/ | grep -c '<header'
1
$ curl -s http://localhost:3174/blog/hmrc-disclosure-and-compliance/can-hmrc-track-crypto-wallets | grep -o 'prose-neutral' | wc -l
0
```

Age:

```
$ git log --oneline -1            -> 666ab0a2  (phase0..phase6 tags all present)
$ git status --porcelain          -> clean
$ ls --time-style=full-iso crypto/web/.next/BUILD_ID
   2026-09-14 10:52:19  fiLp818b59l6oL7ep7lGt
$ find crypto/web/src crypto/web/content packages/web-shared -type f -newer crypto/web/.next/BUILD_ID
   (empty — NO source file is newer than the build)
$ ls --time-style=full-iso crypto/web/.next/static/css/c1d34b43455d098e.css
   2026-09-14 10:52:03   81169 bytes, ONE line
```

The served page links exactly that stylesheet hash. Build is not older than the tree, tree is
clean, tree is at `666ab0a2`. **Server accepted.**

**However:** at roughly 60% through the review the server at 3174 stopped answering
(`curl -w '%{http_code}'` → `000`, `netstat` shows nothing on 3174). I did not start, stop or
kill any server. Everything below marked MEASURED was measured while it was up. Three checks
listed in §5 could not be completed and are marked NOT MEASURED.

Instrumentation: headless Edge via the repo's own `puppeteer-core`
(`scripts/btn_contrast_probe.mjs` pattern), scripts in the session scratchpad, deleted.

---

## 1. Findings by severity

### BLOCKING

None. No new interruption, modal, banner, toast, timed promise or extra capture surface was
found (see §3 for the positive proof).

### MAJOR

**D1 — Focus rings on every dark band are navy-on-navy, ratio 1.00. Keyboard focus is invisible.**
`crypto/web/src/components/ui/layout-utils.ts:15` hardcodes
`focusRing = "... focus-visible:outline-[#0e1a3a]"`, and `:18` (`btnPrimary`) repeats it.
`#0e1a3a` is also the brand dark band ground (`globals.css:35 --brand-primary: #0e1a3a`), so any
element carrying `focusRing` that sits on a navy section paints a navy ring on navy.
MEASURED, by screenshot of the focused element (computed style alone is not trustworthy here —
see F6): `/` hero primary "Speak to a crypto tax specialist" (`src/app/page.tsx:297`) and `/`
navy band "How we handle HMRC disclosure" (`src/app/page.tsx:425`) both show **no discernible
ring** against `#0e1a3a`. Same shape at `src/app/page.tsx:303, 329, 372`,
`src/app/blog/page.tsx`, `src/app/calculators/page.tsx`, `src/components/forms/LeadForm.tsx:18`
and `src/components/forms/BookingPicker.tsx`, all of which resolve to navy
(`outline-[var(--brand-primary)]` = the same hex).
Note this is the SAME defect class the port fixed once for text inside the calculator result
panel (navy on navy at 1.06). The fix did not extend to focus rings.

**D2 — `/research/crypto-tax-gap-index` has ZERO focus styling on any interactive element.**
`grep -c focus-visible crypto/web/src/app/research/crypto-tax-gap-index/page.tsx` → **0**.
Every link and both CTA buttons (`:63`, `:242`, `:248`, and the source links at `:33`, `:82`)
fall back to the UA ring, which is dark. MEASURED on the navy panels: the source link inside
`bg-[#0e1a3a] text-white rounded-lg` (`:24`) focuses with `outline auto 1px rgb(16,16,16)` over
`rgb(14,26,58)` → **ratio 1.11**. Pre-existing (phase0 also had 0), but the port rewrote this
exact file (`git diff --stat port-crypto-phase0 HEAD` → 35 insertions, 28 deletions) and left it.

**D3 — `.eyebrow-rule` is used 26 times in the served HTML and has no rule in any served
stylesheet.** `packages/web-shared/design/primitives/EyebrowRule.tsx:55` emits
`class="eyebrow-rule ..." data-draw="off"`; the only definition of `.eyebrow-rule`
(`transform-origin`, `transition`, `[data-draw="off"] { transform: scaleX(0) }`) lives in
`packages/web-shared/design/globals-standard.css:227-250`, which crypto does **not** import
(`crypto/web/src/app/globals.css` imports only `tailwindcss` and
`packages/site-styles/prose-standard.css`).
MEASURED: `grep -o 'eyebrow-rule' app.css | wc -l` → **0**; `grep -o 'eyebrow-rule' <served html> | wc -l` → **26**.
Consequence is cosmetic, not blank: with no rule the bar renders permanently drawn instead of
drawing on scroll, so the reveal the kit was designed around silently never happens on 26
surfaces. This is the same root cause the port documented and dodged once for `RelatedArticles`
(see V4) — it dodged one consumer of that stylesheet and shipped another.

**D4 — Three different off-white grounds do the same alternation job.**
MEASURED across `<section>` grounds inside `<main>`: `bg-slate-50` (#f8fafc) x26,
`bg-neutral-50` (#fafafa) x12, `bg-[#fafaf9]` x6. Property, the reference, uses exactly one
(`bg-slate-50` x109, zero others). Route families are split by ramp: home uses `#fafaf9`,
services/for/calculators use `slate-50`, about/contact/research use `neutral-50`. Perceptual
distance between them is ΔE 0.8-2.2 (indistinguishable), so this reads as drift rather than
intent. Files: `crypto/web/src/app/page.tsx`, `.../about/page.tsx`, `.../contact/page.tsx`,
`.../research/crypto-tax-gap-index/page.tsx`.

**D5 — `/services/*` and `/for/*` run a dark band straight into a dark band (12 pages).**
MEASURED band sequence on all twelve: `bg-[#0e1a3a]` (hero) → `bg-neutral-800` (#262626) →
`bg-slate-50` → ... CIE-Lab distance navy→neutral-800 is **ΔE 24.1** but the two have almost
identical luminance (L\* 10.3 vs 15.6 against a hue-only difference), so the seam reads as one
long dark slab with a hue shift, not two bands. Source: `PageHero` + the band that follows it in
`crypto/web/src/components/templates/TopicPageLayout.tsx`.
(For contrast: the §8 rule the port DID satisfy — no route's last band touches the footer; see V6.)

### MINOR

**D6 — Second live cascade race on the same element the port fixed for `display`, left unfixed.**
The kit's header CTA composes `${btnPrimary} hidden min-h-10 min-w-0 ... lg:inline-flex`.
`btnPrimary` opens `min-h-12 min-w-[10rem]`. MEASURED byte offsets in the served sheet:

```
$ grep -bo '\.min-h-10{' app.css  -> 17539
$ grep -bo '\.min-h-12{' app.css  -> 17586     <- later, same specificity, WINS
$ grep -bo '\.min-w-0{'  app.css  -> 19059
```

Rendered header CTA at 1024 and 1440: **w=160 h=48**, i.e. `min-h-12` / `min-w-[10rem]`, not the
`min-h-10 min-w-0` the header asked for. The port's site-local `@layer utilities` override in
`crypto/web/src/app/layout.tsx:38-45` handles `display` only. Purely cosmetic (the CTA is 8px
taller and 160px wide instead of shrink-to-fit), but it is the identical failure mode and it is
live on all 53 pages.

**D7 — Heading level skipped h1 → h3 on 11 pages.**
MEASURED (`<hN>` sequence from served HTML):
- `/blog` — `1,3,3,3,...` (20 headings). The card titles are `<h3>`
  (`crypto/web/src/components/blog/HubArticleList` card heading) with no `<h2>` above the list.
- `/blog/<category>` x6 — same shape, `1,3,3,...`.
- `/calculators/<slug>` x4 — `1,3,3,2,2,3`: the calculator card title
  (`<h3 class="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">Crypto CGT Estimator
  2026/27</h3>`) and the result panel `<h3 id="calc_result-heading">` both sit directly under the
  `<h1>` before the first `<h2>` appears later in the page.
No other route skips a level.

**D8 — `layout.tsx` scroll-offset rule is scoped to `#main` only and rests on a false premise.**
`crypto/web/src/app/layout.tsx:38` ships `#main { scroll-margin-top: 6rem; }` with the comment
"This site has zero in-page anchors today". MEASURED: 19 blog posts carry 3-9 in-page anchors
each (TOC → `<h2 id=...>`; 28-68 `href="#..."` occurrences per post), and `/about` carries
`href="#book"` → `id="book"`. All of them are in fact covered — by `scroll-mt-24` applied at
`crypto/web/src/app/blog/[category]/[slug]/page.tsx:153` and `.../about/page.tsx:119` — so there
is no live defect, but the premise in the comment is wrong and the next author adding an anchor
outside those two files gets no offset.

**D9 — Focus ring on the dark footer measures 2.52, under the 3.0 graphic floor.**
MEASURED + screenshot: the footer wordmark link focuses with `outline-primary-600` (#8f421f) over
the footer's `bg-slate-900` (#0f172b) → **2.52:1**. Visible but sub-threshold, on all 53 pages.
Source: the kit footer wordmark in `packages/web-shared/design/chrome/`. Same 2.52 applies to
prose links focused on navy bands (screenshot-confirmed orange ring on `/services/hmrc-disclosure`).

**D10 — The `layout.tsx` override comment quotes byte offsets that no longer match the sheet.**
It claims `.hidden` at 16145 and `.inline-flex` at 16224. MEASURED in the served sheet:
`.hidden{` at **16552**, `.inline-flex{` at **16631**. The 79-byte gap and the ordering are
unchanged, so the argument holds; the numbers are stale and will mislead the next reader.

---

## 2. Verified as genuinely fixed — do NOT churn these

**V1 — The header-CTA `display` override works.** MEASURED computed `display` on
`header a[data-cta="header_book"]`, all 53 routes:

| width | 390 | 768 | 1023 | 1024 | 1440 |
|---|---|---|---|---|---|
| display | none | none | none | flex | flex |
| box | 0x0 | 0x0 | 0x0 | 160x48 | 160x48 |

(`flex` not `inline-flex` is correct — the header is a flex container, so `inline-flex`
blockifies.) CDP `CSS.getMatchedStylesForNode` confirms the layered override outranks `.hidden`,
`.inline-flex` and `.lg\:inline-flex` on specificity inside `@layer utilities`, and the inline
`<style>` is emitted at byte 85078, i.e. AFTER the stylesheet link at byte 180, so the layer name
resolves to the existing Tailwind `utilities` layer rather than creating a new lowest one.

**V2 — The chrome contract holds at one breakpoint.** MEASURED burger / primary nav / header CTA
at 390, 768, 1024, 1440 on all 53 routes: burger `flex / flex / none / none`, nav
`none / none / flex / flex`, CTA `none / none / flex / flex`. Zero drift, no dead zone between
768 and 1023.

**V3 — Zero horizontal overflow.** MEASURED `documentElement.scrollWidth <= clientWidth + 1` at
all four widths on all 53 routes: **53/53 pass at every width**, scrollWidth == clientWidth
exactly. Includes the research table, the calculators and the booking route. Article tables are
all wrapped: across all 54 saved pages, **zero** `<table>` lacks an `overflow-x-auto` container
within 260 bytes before it. The overflow was contained, not moved.

**V4 — `RelatedArticles` correctly NOT used.** `crypto/web/src/app/blog/[category]/[slug]/page.tsx:213`
documents that the kit's `RelatedArticles` carries `focus-visible:outline-none`
(`packages/web-shared/design/blog/RelatedArticles.tsx:106`) whose replacement indicator
(`.related-card:focus-within`) lives in the unimported `globals-standard.css`, and substitutes
`HubArticleList`. Confirmed: `grep -rn RelatedArticles crypto/web/src` returns only that comment,
and `.related-card` appears 0 times in the served HTML. This one was caught. (D3 is its sibling
that was not.)

**V5 — Text contrast is clean.** MEASURED every text-bearing element on all 53 routes at BOTH
1440 and 390, with `oklch()` normalised through a canvas (a naive rgb-only parser produces 374
false failures here) and alpha composited against the real ancestor stack. Floors 4.5 / 3.0 by
size+weight. Result at both widths: **exactly one flagged row, 54x, and it is a gradient
artefact** — the footer "Built by Double Wired Creative" link, `bg-clip-text text-transparent`
with `from-[#818cf8] to-[#fb923c]`. Proof it is not a real failure: the two gradient stops on the
footer's `#0f172b` measure 6.0:1 and 8.0:1. The navy-on-navy 1.06 in the calculator result panel
is gone: `/calculators/*` produce zero rows.

**V6 — No dark band touches the footer.** MEASURED last `<section>` ground per route: `/` →
`bg-[#fafaf9]` (ΔE 91.6 from the footer), services/for → `bg-white`, contact → `bg-neutral-50`,
book/thank-you → `bg-white`, blog posts → default white article container. Zero routes end dark.

**V7 — Landmarks.** MEASURED on all 53 routes: `<main>` count = 1, `<h1>` count = 1, banner
`<header>` = 1, skip link present = 1, every route 200. Blog posts show `<header>` x2 because the
second is the `<article><header>` byline block, which is not a banner landmark. None of the eight
removed page-level `<main>` wrappers lost its gutters (the kit `PageShell` `<main id="main">`
carries them) and none is nested.

**V8 — FAQ accordions are not Property's.** MEASURED: for every page carrying `FAQPage` JSON-LD
(36 pages, 2-9 Q&A each), **0 of 236** `acceptedAnswer.text` fragments are absent from the server
HTML. No Radix closed-answer/JSON-LD divergence.

**V9 — No published fee line, no unauthored proofPoints.** `WhatToExpectCard`'s
`DEFAULT_ITEMS` ends on "Fixed fee quote if you decide to proceed"; `crypto/web/src/app/contact/page.tsx:59`
passes `items` explicitly. MEASURED: "fixed fee" appears in **0** of the 54 served pages.
`proofPoints` appears in crypto only inside two comments explaining why `LeadCTAPanel` was avoided.

**V10 — No dead keyframe classes.** The built sheet has zero `@keyframes` and exactly one
non-`none` `animation:` declaration (`num-glow`, from `packages/web-shared/design/marketing/WhyUsList.tsx:57`),
and `WhyUsList` is **not used anywhere in crypto**, so no element on the site carries it. Served
HTML contains zero `animate-*` classes.

**V11 — Custom properties: nothing renders blank.** Re-derived independently: 222 `var(--x)` names
used, 224 declared, **10 used-but-undeclared** — `--brand-primary-ground-hover`, `--btn-radius`,
`--calc-warn-accent`, `--calc-warn-bg`, `--calc-warn-fg`, `--hero-cream` and four
`--default-*font*`. Every one of the 10 is written with an inline fallback
(`var(--btn-radius,9999px)` etc.), so no declaration is invalidated. `--btn-ground`,
`--btn-ground-hover/active`, `--brand-primary`, `--accent-strong`, `--ink`, `--muted`, `--surface`
are all declared on bare `:root`. Checked at the elements, not just the sheet: the header CTA
resolves `--btn-ground` to `rgb(14,26,58)` and the contrast sweep (V5) would have caught any
button rendering with no ground as white-on-white — none did.

**V12 — Nothing that worked was broken.** MEASURED across all 54 served pages:
- `data-cta` inventory: exactly **one** `header_book` per page (162 raw hits = 54 real + 108
  occurrences of the selector inside the inline `<style>` text), placement `header`, goal `form`.
  The drawer CTA is a distinct id (`header_book_mobile`, placement `mobile_menu`, SiteHeader
  defaults at `:44` and `:349`) and renders client-side only.
- The one pre-port CTA is intact: `crypto/web/src/app/thank-you/page.tsx:132-133`
  `data-cta="thankyou-return-article"` / `placement="thank_you"`, no goal.
- Capture surfaces: 1 form on `/`, `/services`, `/contact`; 2 on each calculator
  (`CalcResultCta` → `MiniCapture`, plus the page-footer `MiniCapture`). `git show
  port-crypto-phase0:.../calculators/[slug]/page.tsx` shows **both** mounts already existed.
- Interruptions: the only timer in `crypto/web/src` is
  `crypto/web/src/components/forms/LeadForm.tsx:182` `setTimeout(() => router.push(dest), 800)`,
  a post-submit redirect delay that predates the port (`git log -S` → `3a52066da`, the P5 lead
  parity commit). No `role="dialog"`, no `aria-modal`, no exit-intent, no toast, no banner.
- In-page anchor offsets: `.scroll-mt-24` compiles to `scroll-margin-top: calc(var(--spacing)*24)`
  = 96px, and the arbitrary variants DID compile — `[&_h2]\:scroll-mt-24 h2` and
  `[&_h3]\:scroll-mt-24 h3` are both present in the sheet. `/about #book` carries `scroll-mt-24`
  directly.

---

## 3. Not measured (the server died first)

These three are open. They are the states that only exist after interaction, so nothing in this
report covers them:

- **The mobile drawer at 390 and 768** — open state: contrast inside the drawer, focus trap and
  tab order, `Escape`, body scroll lock, and whether the drawer's own CTA is visible. The drawer
  renders client-side only, so no server HTML covers it either. Static reading says the
  `layout.tsx` override cannot reach it (it is keyed on `placement="header"`, the drawer is
  `placement="mobile_menu"`), but that is INFERRED, not measured.
- **The calculator result panel after user input** — the default DOM already renders a populated
  result (`£1,260`) and that state is clean, but the warn/edge branches
  (`--calc-warn-bg/-fg/-accent`, fallback `#fbbf24` on `#451a03`) never rendered during the sweep.
- **The booking picker's day strip at 390** — `/book` shows zero overflow in its default state,
  but the strip is a client component and its populated width was not exercised.

---

## 4. False premises in the brief — numbered

**F1.** "The manager's check says zero undeclared names remain in the built CSS." **Wrong.**
Ten names are used with no declaration anywhere in the served CSS (listed in V11). The
*conclusion* is safe — all ten carry inline fallbacks — but the stated check is false as written,
and a gap-fix wave repeating "zero undeclared" will keep being wrong.

**F2.** "Settle every suspicion by byte offset in the served stylesheet: `grep -bo '<selector>'`."
**Insufficient on its own.** Tailwind escapes variant colons, so `grep -bo 'lg\:inline-flex'`
returns nothing while the rule plainly exists (`.lg\:inline-flex` appears via CDP
`getMatchedStylesForNode`). I nearly filed a false BLOCKING on that. Byte offsets settle *order*;
only the matched-rule list settles *existence*.

**F3.** "Measure from the RENDERED DOM." **Necessary but not sufficient — `getComputedStyle` lies
about outlines in this environment.** For the header CTA under real keyboard focus
(`el.matches(':focus-visible')` === true) computed style reports
`outline: rgb(255,255,255) solid 3px; outline-offset: 0px`, while the painted ring is burnt-orange
2px at offset 2 (screenshot attached in the session, `cta_focus.png`). It reports this under both
`prefers-color-scheme: light` and `dark`, and there is no 3px or white outline rule anywhere in
the served CSS. Every focus-ring number in this report that is not screenshot-backed is therefore
flagged as such. **A gap-fix wave that trusts computed `outlineColor` will chase ghosts.**

**F4.** "The port added a site-local layered override instead of touching the kit. Verify that
override actually works at 390 and 768." It does — V1. Not a false premise, recorded so the wave
does not re-litigate it.

**F5.** The brief frames the `#main` scroll-offset rule's context as settled. The rule's own
comment in `crypto/web/src/app/layout.tsx:18` asserts "This site has zero in-page anchors today",
which is **false**: 19 blog posts and `/about` carry in-page anchors today (D8). They happen to be
covered elsewhere.

**F6.** "Known live instance: ... the port added a site-local layered override." The brief implies
`display` was the whole race. It was not — `min-h-10`/`min-w-0` lose the same way on the same
element and are still live (D6).

**F7.** "A `ratio=1.00` row with white text is usually a gradient artefact." Confirmed here, once,
and proven rather than dismissed (V5). Recording it so the wave does not re-open it.

---

## 5. What a gap-fix wave should take

Ordered by cost-to-fix against risk:

1. **D1** — one line. `layout-utils.ts:15` needs a ring that is not the band colour. Everything
   else in D1 inherits from that one constant plus `--brand-primary` in `LeadForm`/`BookingPicker`.
2. **D2** — `/research/crypto-tax-gap-index` needs `focusRing` (post-D1) on its six interactive
   elements.
3. **D3** — either import the `.eyebrow-rule` block into `globals.css` or stop rendering
   `EyebrowRule`. Do not half-do it: D3 and V4 are the same root cause.
4. **D7** — heading levels on `/blog`, the six hubs and the four calculators.
5. **D4 / D5** — ground consistency. Owner-visible design decisions, not defects; flag, do not
   unilaterally restyle 12 pages.
6. **D6 / D8 / D10** — comment and cosmetic debt, cheap, no risk.
7. **§3** — re-run the drawer, calculator-warn and booking-strip checks once a server is up.
   Nothing in this report clears them.
