# R2 — DESIGN FIDELITY REVIEW (pharmacies design port, phases 2-6)

Independent adversarial review. Opus. Read-only on the site; this file is the
only thing written. No git command, no build, no server start/stop, no subagent.

**Build under test:** `next start -p 3111`, served `<title>` asserted as
`Pharmacy Tax | Specialist Accountants for UK Pharmacy Owners`.
**Reference:** `Property/web` (source, read-only) and the generalist port.
**Screenshots:** `…/scratchpad/r2/` — `<route>-<width>.png` for the 16 routes at
390 and 1440, plus `surf2-390.png`, `surf2-1440.png`, `nojs-numerals.png`.
**Instruments:** `probe.mjs` (structure, markers, overflow, grounds, radii),
`probe2.mjs` (text contrast + 30-press tab walk, alpha-composited),
`grounds.mjs`, `surf2.mjs`, `nojs.mjs`, `drawer.mjs`, all in the same folder.

**Instrument incident, declared.** `probe.mjs`'s colour parse filled the 1×1
canvas with an opaque base before sampling, so every transparent background read
as opaque black and every ratio came back ≈1.18. That is the same
alpha-compositing bug `browser_check.mjs`'s comments record three times. It was
caught by the implausibility of "slate-900 h2 on white = 1.18", fixed in
`probe2.mjs` (clearRect, no base fill, explicit `over()` composite, `opacity`
folded into alpha), and the self-test prints `slate-500/white 4.76`,
`slate-400/white 2.63` against the TAILWIND V4 pair (4.77 / 2.63; the 0.01 is my
own luminance rounding, not a v3 ramp). **Every contrast and ring number below
comes from `probe2.mjs`. Nothing from `probe.mjs` is quoted as a ratio.**

---

## 1. FINDINGS

### BLOCKER

**B1 — At 390 the sticky bar and the help widget occupy the same pixels, and the
bar eats 21% of the viewport.**
Evidence: `scratchpad/r2/surf2-390.png`. Measured at 390×900 on a post at 65%
scroll: sticky bar `fixed bottom-0` at y=712, **h=188**; widget launcher
`fixed bottom-24 right-4 z-[55]` at y=752, h=52, x=174–374 — **inside the bar's
rectangle**, painted over the bar's "Speak to a pharmacy accountant" button and
half-covering the dismiss ×. The bar is 188px tall because the personalised
heading "Check what a pharmacy purchase looks like on your numbers" wraps to
**one word per line** in a column the layout never budgeted for.
Package: **W7** (`src/components/ui/StickyCTA.tsx`, intent offer swap) with
`SpecialistWidget`'s `bottom-24` offset.
Minimal fix: in `StickyCTA.tsx`, at `<lg` render the intent `offer.title` as a
single clamped line (`line-clamp-1` + `pr-14`) and give the bar's inner grid a
`min-w-0` text column so it cannot collapse; and raise the widget launcher to
`bottom-32` (or `bottom-[calc(var(--sticky-h,6rem)+1rem)]`) while the bar is
painted. Do not change any string.

**B2 — Three capture surfaces publish the same offer, in the same words, at the
same moment, and the widget panel stays live beside an open modal.**
Evidence: `scratchpad/r2/surf2-1440.png` at 80% scroll on one post. The
deep-scroll modal (`fixed inset-0 z-[60]`) is open with heading "Check what a
pharmacy purchase looks like on your numbers" and button "Speak to a pharmacy
accountant"; the sticky bar behind it carries the **identical** heading and the
**identical** button; the widget panel is open to the right, undimmed and
clickable, offering the same thing again. Measured fixed elements at that
instant: 3 (z-50, z-60, z-55).
Package: **W7** (suppression rules). W7's own receipt claims the surfaces are
mutually suppressed; the DOM shows the sticky bar is not suppressed while the
deep-scroll modal is open, and the widget is not suppressed by either.
Minimal fix: in `DeepScrollModal.tsx`, set a shared `data-surface-open` flag on
`<html>` while open; `StickyCTA` already computes `painted` — add
`&& !surfaceOpen`; `SpecialistWidget` is kit, so suppress it at the mount point
in `layout.tsx` rather than editing `web-shared`. This is also the only thing
standing between owner question G5 and a "yes".

### SERIOUS

**S1 — 11 links on dark grounds have no focus ring; they fall back to the 1px UA
outline, measured at 1.56 against the brand navy.**
Evidence (`probe2.mjs`, 30-press tab walk, 420ms settle, ring composited over the
PARENT's ground): `/` ×3 at **1.56, outline-width 1px**, parent ground
`[15,58,74]` (`primary-950`); `/research/pharmacy-density-and-workload-index` ×4
at 1.56; `/research/pharmacy-openings-closures-index` ×3 at 1.56.
Source: `src/app/page.tsx:482,493,503` —
`className="underline underline-offset-2 text-teal-200 hover:text-white"`, no
`focusRing`; `src/app/research/pharmacy-density-and-workload-index/page.tsx:166,168`
— `className="underline hover:text-white/70"`, no `focusRing`.
Gate row **V31 expects every ring ≥ 3.0 on light AND dark, baseline 0 failures.**
It is 11.
Package: **W5** (homepage band 5) and **W6** (both research pages).
Minimal fix: append `${focusRing}` to those five `className` strings. The band is
already inside `.ground-dark`, so the token resolves correctly once the class is
present.

**S2 — Two brand darks and one borrowed dark on the same page; the kit's
`slate-900` is never rebound to `primary-950`.**
Evidence (`grounds.mjs`, computed grounds): `/` bands 1 and 5 = `15,58,74`
(`primary-950 #0f3a4a`), band 2 = `24,93,118` (`primary-800`), **bands 11
(testimonials) and 13 (closing CTA) = `15,23,43` (`slate-900 #0f172a`)**;
`/services/[slug]` band 2 = `29,41,61` (`slate-800`). Visible in
`home-1440.png`: the teal hero and the blue-black testimonial band do not read as
the same brand. Property paints one dark.
Package: **W5** (homepage) / **W3** (detail templates) — both mount
`TestimonialsSection` and the non-contained `LeadCTAPanel` on kit defaults.
Minimal fix: pass the brand ground through the kit's section class where the prop
exists (`SlimHero.sectionClassName` is already shipped and already used on
`/about`); for `TestimonialsSection` / `LeadCTAPanel`, which expose no ground
prop, the one-line kit addition is a `sectionClassName?` spliced the same way —
additive, byte-identical for every site that does not pass it. Until then this is
the single biggest "it looks like a different site's component" cue.

**S3 — `.ground-dark` is missing from every dark band the kit paints: 6 routes,
and it costs a ring.**
Evidence (`probe.mjs` sections + `probe2.mjs` rings): dark sections with no
`.ground-dark` on `/` (×2), `/blog`, `/blog/[category]`, the post template,
`/book`, `/thank-you` — all `bg-slate-900`. Consequence measured on the post at
1440: `A "Get in touch"` ring **1.46, ow=2px**, parent ground `15,23,43` — a 2px
ring painted in the light-ground colour on a dark panel.
Gate row **V31: "Every section painted dark carries `.ground-dark`."** It does
not, on 6 route families (≈30 URLs).
Package: **W2** (blog templates), **W5** (homepage), **W6** (`/book`,
`/thank-you`). W2's inline reason ("nothing focusable renders on the dark
ground") is true for `/blog` but **false for the post template**, which renders a
focusable "Get in touch" on the dark ground. Settle it at the element.
Minimal fix: wrap those panels in `.ground-dark` where a focusable sits on the
dark ground (post template at minimum), leave the reasoned ones and move the
reason into the receipt.

**S4 — With JS off, the homepage's six numerals and six rules do not paint.**
Evidence: `nojs.mjs` with `setJavaScriptEnabled(false)` —
`.story-numeral` ×6 all compute `oklch(0.929 0.013 255.508)` = `slate-200
#e2e8f0` on the band's `slate-50` ground (**1.18**), `.story-numeral-rule` ×6 all
`matrix(0,0,0,1,0,0)` = `scaleX(0)`. Screenshot: `scratchpad/r2/nojs-numerals.png`
— 01…06 are ghosts and the rule bars are absent.
Cause: the `<noscript>` block in `layout.tsx` releases
`.eyebrow-rule[data-draw="off"]` and `[data-draw="off"] .tick-draw`, and the K4
accordion line, but **not** `.story-numeral` / `.story-numeral-rule`, which
landed later at `globals.css:303,308`.
This is brief item 7 exactly: "the failure mode must always be a finished mark,
never an empty box beside a promise."
Package: manager-direct (`layout.tsx` `<noscript>`), the same block as K4.
Minimal fix: two lines in the existing `<noscript>` style —
`[data-draw="off"] .story-numeral { color: var(--color-primary-700) !important; }`
and `[data-draw="off"] .story-numeral-rule { transform: none !important; }`.
Verified good in the same run: eyebrow rules release (`transform: none`), and all
6 FAQ answers compute `display: block` — **K4 works**.

**S5 — `/calculators`, `/blog` and `/blog/[category]` have no hero band at all;
`/services` and `/for` have a 267px strip.**
Evidence (`probe.mjs`, rendered `<section>` counts at 1440, grounds from
`grounds.mjs`): `/calculators` **1 section, ground sequence `[white]`** — the h1
sits in a bare `<div className="mx-auto max-w-4xl px-6 py-16">`
(`src/app/calculators/page.tsx:21-28`), no `<section>`, no eyebrow, no backdrop,
no dark ground, no kit marketing component imported at all. `/blog` and
`/blog/[category]`: **1 section each**, h1 `30px/36px/600` on white in a
container. `/services` and `/for` heroes measure **h=267** with nothing but a
breadcrumb and an h1 (`services-1440.png`, `for-1440.png`).
Property for comparison (source, read-only):
`Property/web/src/app/blog/page.tsx:112-122` is a `min-h-[350px]`
`HeroBrickBackdrop` hero with `h1 text-4xl sm:text-5xl lg:text-6xl`, followed by
four alternating bands at `:144,:191,:228,:257`.
`Property/web/src/app/calculators/page.tsx:82` runs
`text-2xl sm:text-4xl lg:text-6xl` inside a backdrop hero.
Package: **W4** (`/calculators`), **W2** (`/blog`, `/blog/[category]`),
**W3** (`/services`, `/for` hero depth).
Minimal fix: give the three bare routes the band this site already has four
working copies of — `ground-dark relative overflow-hidden bg-primary-950 py-16
sm:py-20` + `PharmaciesBackdrop` + kit `Breadcrumb tone="onBrand"` + `Eyebrow`
+ the existing h1 and the existing standfirst. No new copy; `/services` and
`/for` already publish exactly this shape.

**S6 — `/blog` and the five `/blog/[category]` routes end on a full-bleed
`slate-900` panel that meets the `slate-900` footer.**
Evidence (`grounds.mjs`): `/blog` → last main child `15,23,43`, footer
`15,23,43`. Same on `/blog/buying-a-pharmacy`. That is navy on navy on **6
URLs**.
Package: **G3** (the grounds fix). Its receipt says "Every route ends on a light
ground and no two adjacent bands share one." The second half holds — `adjSame=0`
on all 16 routes measured. The first half does not.
Minimal fix: the same `contained ground="white"` the same receipt applied to
`/services`.

**S7 — `text-white/50` captions on the research heroes measure 4.29 at 14px.**
Evidence (`probe2.mjs`, alpha folded into the composite — the T-H2 blind spot
handled): `/research/pharmacy-density-and-workload-index` "Data pulled 2026…"
and the source `<a>` at **4.29**; `/research/pharmacy-openings-closures-index`
"Last updated: 20…" same. Small text floor is 4.5. Stated baseline was 0.
Package: **W6**.
Minimal fix: `text-white/50` → `text-white/70` on those two captions (7.02 on the
composited `#15485c` ground by W6's own table at `contact/page.tsx:63-65`).

### MINOR

**M-a — The `#fafaf9` band was normalised to `slate-50` with nobody asking.**
`W5_RECEIPT.md` band 3 declares it. Rendered: no `#fafaf9` anywhere; band 3 is
`248,250,252`. Brief item 4 says a normalisation nobody asked for is a finding.
It is logged, declared, and I would leave it — but it should be the owner's line,
not a builder's. Package W5.

**M-b — Live hardcoded hex survives in two more files than V33 allows.**
V33 expects only `PharmaciesBackdrop.tsx`, `PageShell.tsx`, `api/og/route.tsx`.
Re-run (`grep -rnoE '#[0-9a-fA-F]{3,8}' src/app src/components --include=*.tsx`)
= **46 occurrences in 11 files**, of which 40 are inside comments documenting the
ratios. Live, in code: `PharmaciesBackdrop.tsx` (SVG motif),
`research/PharmacyIndexCharts.tsx` (`BRAND`/`ACCENT`/`MUTED`/`SERIES_B`, each
reasoned at the line, W6 — legitimate, SVG chart fills, but V33's expectation is
wrong, not the code), and **`src/app/error.tsx:64`:
`className="font-semibold text-[#0f3a4a] hover:opacity-70"` — a raw brand hex on
a `<Link>` with no focus ring and no reason at the line.** `error.tsx` has no
package owner. **M1.**

**M-c — Rendered class attributes carry `[#818cf8]` and `[#fb923c]` on all 16
routes.** Source: `packages/web-shared/design/chrome/SiteFooter.tsx:268`, the
"Built by Double Wired Creative" gradient credit. Shared with Property, inside
the `web-shared` carve-out. `probe2.mjs` scores it 1.00 on every route because
the computed `color` is `transparent` under a background-clip gradient — an
instrument blind spot, not a defect. Hand-computed: `#818cf8` on `#0f172a` ≈ 6.9,
`#fb923c` on `#0f172a` ≈ 8.5, both pass. **Not a finding; recorded so the next
reviewer does not file it.** `neutral-*` in rendered class attributes: **0 on all
16 routes.**

**M-d — `/book` and `/thank-you` carry no breadcrumb and no `BreadcrumbList`,
while all 14 other templates do.** `/thank-you` is noindex so it is moot;
`/book` is a real page. Package W6. One `Breadcrumb` line if the owner wants it.

**M-e — Blog pagination "First"/"Last" measure 2.53 in the disabled state.**
Disabled controls are outside WCAG 1.4.3; recorded, not a fix.

**M-f — The widget launcher renders and is clickable-looking with JS off**
(`nojs-numerals.png`, bottom right). Kit behaviour, shared. Log only.

---

## 2. CLAIMS THE DOM CONTRADICTS

| claim | where | what the DOM says |
|---|---|---|
| "Every route ends on a light ground" | `G3_GROUNDS_FIX_RECEIPT.md` §1 | `/blog` and 5 `/blog/[category]` end on `slate-900` against a `slate-900` footer (S6). The companion claim, `adjSame=0`, **holds on all 16 routes**. |
| "Every section painted dark carries `.ground-dark`" | V31 | 6 route families do not (S3), and it costs a 1.46 ring on the post template. |
| "every ring ≥ 3.0 on light AND dark" | V31 | 11 rings at 1.56 (1px UA outline) on `primary-950`, plus one at 1.46 on `slate-900` (S1, S3). |
| "only `PharmaciesBackdrop.tsx`, `PageShell.tsx`, `api/og/route.tsx` survive" | V33 | 11 files carry hex; 40 of 46 are comments, but `error.tsx:64` is live and unreasoned and `PharmacyIndexCharts.tsx` carries 4 live constants (M-b). |
| four-marker row `1/2/4/3` | `W5_RECEIPT.md` §1 | Re-derived independently on the comment-stripped source: **`animate-ping`=1, `StatsCounter`=3, `Backdrop`=5, `rounded-full`=3**. Higher than claimed, not lower. Rendered HTML: 2 `animate-ping`, 29 `rounded-full`, 16 `data-draw`. Property reads 1/2/3/4. **Row passes.** |
| homepage "15 to 16 bands" | brief §A4 | **14**, and W5's correction to 14 is right: `probe.mjs` counts 14 `<section>` with heights 840/208/292/1742/810/646/818/989/861/1160/752/728/889/782 and a `DDLLDLLLLLDLDL` ground sequence. Dense, well alternated. **W5's correction stands; the brief was wrong.** |
| W7 "the SSR HTML always carries the generic offer" | `W7_RECEIPT.md` | Holds. `curl /` shows no `pfp_*` key and the generic bar copy; the personalised offer only appears after a client scroll (`surf2.mjs`). |
| G1 "4 columns, 27 links" | `G1_R1_GAPFIX_RECEIPT.md` | Footer renders SERVICES / RESOURCES / CALCULATORS / COMPANY and 30 `<a>` including the legal row. **Holds.** |
| W6 "4 hex, each reasoned at the line" | `W6_RECEIPT.md` | Holds exactly — `#0f3a4a`, `#177392`, `#acefff`, `#c2410c`, all with the ratio written beside them. |
| W3 "`data-cta` 0 in owned files" | `W3_RECEIPT.md` | Held at W3's commit; the live DOM now shows `next_step` on `/services/[slug]` and `/for/[slug]` from M1's mount. Not a W3 contradiction. |

**Stale declines re-checked at today's kit SHA (T-H6).** `SlimHero.sectionClassName`
— shipped, and **adopted** on `/about` and `/book`. `CoverageItem.href` and
`html` — shipped, and **adopted** on `/services` and homepage band 4. Neither was
declined on a stale reason. Every other decline in W5 §4 and W3/W2/W4 was re-read
against the component's current type: all nine rest on a required prop or a
link-count loss that is still true today. **No further stale declines found.**
Decline count (9) against adoption count (16 distinct kit components across the
wave) is **not** the plain-jane shape; the adoptions are on the bands that matter.

---

## 3. KNOWN AND ACCEPTED (§F) — verified, not re-reported

1. Nine P0-A rows as ruled; rows 8 and 9 left as is — untouched. ✔
2. P0-A "not serious" list — untouched. ✔
3. AdSense CSP `frame-src` noise — `packages/web-shared/lib/security-headers.ts`
   carries 2 `pagead2` refs; estate-wide owner decision. ✔
4. `brand.logo_path` with no file; header renders a text wordmark — confirmed in
   every screenshot. ✔
5. `content_strategy.categories` 7 vs 5 live slugs — not consumed by routing;
   `/blog` renders exactly 5 category chips. ✔
6. `admin/analytics/login/page.tsx:39` `focus:outline-none` — the one real ring
   defeat, out of lease. ✔
7. `--calc-result-accent: #88cde7` at `globals.css:143` with "KEEP, do not
   repoint" written at the line. ✔
8. The `--grounds` darkOnDark/adjacentSame baseline — I report delta only, and
   the delta is S6 (6 blog URLs). ✔
9. 60s navigation timeouts — I saw exactly one (`/calculators/[slug]` at 390 in
   `probe.mjs`); it passed on the re-run in `probe2.mjs`. ✔
10. `browser_check.mjs` backgrounding — I did not run it; my own probes were
    backgrounded and polled, never doubled. ✔
11. `cta_snapshot.mjs` cwd — not run. ✔
12. `/book` and `/complete` absent from `robots.txt` disallow while `/thank-you`
    is present — confirmed on the served `robots.txt`. ✔
13. `&lt;` literals on the density page — correctly-escaped comparisons. ✔
14. `og:image` on 11 pages, 8 long metas — not re-swept. ✔

---

## 4. VERDICT

**Not ready to tag.** The homepage is genuinely there: 14 dense bands, a clean
`DDLLDLLLLLDLDL` rhythm, a brand backdrop on five mounts, a real `StatsCounter`
band, `ScrollGlowGroup` on three card walls, drawn numerals, a four-marker row at
1/3/5/3 against Property's 1/2/3/4, zero horizontal overflow at 390 on all 16
routes, zero `neutral-*` in rendered class attributes, a working mobile drawer
(100dvh, 8 links, gradient backdrop, focus-trapped), and a post template — TOC,
reading progress at `top:0 z:50 h:4` under the `z:40` sticky header, sticky
sidebar CTA, mid-article capture, FAQ accordions that survive JS being off, and a
related rail — that is the best thing on the site. The gap-fix list is short and
every item is a named line: **B1** (390 sticky-bar/widget collision), **B2**
(three surfaces, one offer, live widget beside a modal), **S1** (11 unringed dark
links, five `className` strings), **S3** (`.ground-dark` on the post template's
panel), **S4** (two `<noscript>` lines), **S6** (`contained ground="white"` on two
blog templates), **S7** (`white/50` → `white/70` on two captions), **M-b**
(`error.tsx:64` raw hex, M1). Fix those nine lines and tag. **S2 and S5 are
real and they are what the owner will react to, but they are shape, not defect:
send them to the uplift, not to M1.**

---

## 5. WHAT THE UPLIFT SHOULD STILL ADD TO REACH PROPERTY

1. **One dark.** The site paints four: `primary-950`, `primary-800`, `slate-800`
   (`StatsCounter` on detail pages), `slate-900` (testimonials, every
   non-contained `LeadCTAPanel`, `/book`, `/thank-you`). Property paints one.
   The kit change is a `sectionClassName?` splice on `TestimonialsSection` and
   `LeadCTAPanel`, additive and inert for every other site.
2. **Give the five hubs a hero.** `/calculators`, `/blog`, `/blog/[category]`
   have none at all; `/services` and `/for` have a 267px strip with a breadcrumb
   and a word. Property's equivalents are 350px backdrop heroes with a three-step
   type ramp. Nothing new needs writing: the standfirsts already exist in
   `metadata.description`.
3. **A third typographic step.** Every h1 outside the homepage stops at `sm:`:
   `/services` `text-3xl sm:text-5xl`, `/blog` a flat `text-3xl`, `/calculators`
   `text-3xl sm:text-4xl`. Property runs `lg:text-6xl` on all three. The homepage
   already goes to 72px and reads right; the rest look like a different site.
4. **Depth on the card walls.** `/for`'s five cards and `/services`'s eight carry
   no icon, no arrow, no hover lift and no visible affordance — eight paragraphs
   of 100-word prose in boxes (`for-1440.png`, `services-1440.png`). Property
   uses an icon per card and a `card-glow`. `CoverageCards` already ships `glow`,
   but its shadow literal is Property's emerald
   (`CoverageCards.tsx:88` `rgba(5,150,105,0.28)`), so the uplift must land
   W5 D3's one-line swap to `rgb(var(--brand-glow-deep, 5 150 105) / 0.28)`
   first.
5. **Illustrative components the site has never mounted.** `ProcessTimeline`
   (Property ×9), `PromptMarquee` (×10), `TopicSection` (×10), `ComparisonTable`
   (×8), `DrawnTickList` (×7), `WhatToExpectCard` (×5), `WhyUsList`,
   `BlogCategoryHub` (×12). Every decline is individually sound; the aggregate is
   the plain-jane shape. The cheapest two: `DrawnTickList` on `/for`'s five
   audience cards (the data is already one claim per line), and `BlogCategoryHub`
   on `/blog/[category]`, which supplies the missing hero and band rhythm in one
   component.
6. **Retire the forked chrome.** `src/components/ui/StickyCTA.tsx` is 167 lines
   against the kit's 176 at
   `packages/web-shared/design/marketing/StickyCTA.tsx`. The fork exists for the
   intent swap, which is exactly the thing that broke at 390 (B1). Upstream the
   swap, delete the fork.
7. **Fill the right rail.** On the post template the sticky `<aside>` measures
   h=788 against a 12,757px article; below the TOC it is empty for most of the
   read. Property keeps a second card in the rail.
8. **Close the dead space on `/calculators`.** `calculators-1440.png` shows ~120px
   of empty white between the help link and the lead panel, on a page with one
   band. That is the single cheapest "looks unfinished" fix on the site.
