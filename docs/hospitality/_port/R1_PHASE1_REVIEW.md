# R1 - adversarial review, hospitality design port, phase 1 (tokens + chrome + U4)

Reviewed 2026-09-29 against the running phase-1 production build on
`http://localhost:3202` (identity asserted: `<title>Specialist Hospitality
Accountants UK</title>`; the sweep also confirms "Hospitality Tax" present), the
single served stylesheet `/_next/static/css/b64fc55ba43d4ceb.css` (97,149 bytes),
the shipped client chunk
`hospitality/web/.next/static/chunks/app/layout-0aef2141ed42ec54.js`, and the
working tree. Edge headless via `puppeteer-core`, `--force-color-profile=srgb`.

Spec: `docs/hospitality/_port/PHASE1_PACKAGES.md`. Baseline tag
`port-hospitality-phase0` (`36d2b4fe`); repo HEAD `e0562d30`.

## A) VERDICT: FAIL

Two blockers, seven gaps, six nits, five false premises in the plan, and the
working tree moved by 25 files and roughly 1,900 insertions while this review
was running, so nothing here can be pinned to a SHA.

Most of the package is right and measured: the ramp, the radius, the four glow
channels, the motion layer, the footer ring rebind, the header CTA hide, the
landmarks, the link floors, the CTA census and the contrast sweep (235 failures
to 0) all check out against the rendered DOM. What phase 1 did not measure is
the two things a visitor meets first on every page: the typeface, and the one
control in the footer that is not a link.

---

## B) GAPS, most severe first

### BLOCKER

**B1. The site renders in the system font. Plus Jakarta Sans never loads, on
every page.**
`hospitality/web/src/app/layout.tsx:101` with `globals.css:94-98`.
Spec §0 reality check: "Webfont: Plus Jakarta Sans genuinely loaded via
`next/font/google`, `--font-sans` bound in `globals.css:26`. Gate row 3
non-empty. **NONE. Do not re-do.**"
Measured on `/` at 1280:

```
getComputedStyle(document.body).fontFamily
  -> "ui-sans-serif, system-ui, sans-serif, \"Apple Color Emoji\", ..."
getComputedStyle(document.documentElement).getPropertyValue("--font-sans")  -> ""
getComputedStyle(document.body).getPropertyValue("--font-sans")             -> ""
getComputedStyle(document.body).getPropertyValue("--font-plus-jakarta")
  -> "\"Plus Jakarta Sans\",\"Plus Jakarta Sans Fallback\""
[...document.fonts].map(f => f.family + ":" + f.status)
  -> 21 x "Plus Jakarta Sans:unloaded"
```

`browser_check` agrees independently: **758 of 758 sampled headings across 152
page-loads report `family: "ui-sans-serif"`.**

Cause. `--font-sans` is declared in `@theme inline`, which emits it on `:root`
(the `<html>` element), as `var(--font-plus-jakarta), ui-sans-serif, ...`.
`next/font` declares `--font-plus-jakarta` on `.__variable_a11773`, and
`layout.tsx:101` puts that class on `<body>`, not `<html>`. A custom property
whose value contains `var()` resolves at **computed-value time on the element
that declares it** - `:root` - where `--font-plus-jakarta` does not exist, so
`--font-sans` computes to the guaranteed-invalid value, `body { font-family:
var(--font-sans) }` is invalid at computed-value time, and the body falls back
to Tailwind's stock stack. This is the exact rule the same file spells out, in
full, at `globals.css:176-180` for `--kit-focus-ring`. It was applied to the
focus ring and not to the font.

Pre-existing from the 2026-09-28 font port (the same shape is at
`git show port-hospitality-phase0:hospitality/web/src/app/globals.css:23-24`),
but P1-A owned `globals.css` and `layout.tsx`'s font block, and certified the
font as done without once measuring it in the rendered DOM. Gate row 3 reads
`next/font/google` because it is a source grep; it cannot see this.

Severity **blocker**: the playbook calls a missing webfont "the loudest
'unfinished template' signal a non-technical eye reads".
Fix, one line: move the variable class onto the element that declares
`--font-sans`. `layout.tsx:76` becomes
`<html lang="en-GB" className={plusJakarta.variable}>`, and `:101` becomes
`<body className="antialiased">`. Verify with `document.fonts`, not the class
list.

---

**B2. The footer consent button rings at 1.07:1. Floor is 3:1. It is the site's
only opt-out control, and phase 1 made it worse.**
`hospitality/web/src/components/layout/PageShell.tsx:126-128`.
Spec mandatory check 7: "every button in the rendered header/footer/error page
carries a `focus-visible:outline` class". Spec P1-C: the consent toggle is
"restyled for the footer ground".
Measured on `/about` at 1280 by tab-walking the real `:focus-visible` state with
a 340 ms settle (the `transition-colors` trap) and compositing through a 1x1
canvas: **14 focusable stops in the footer; 13 ring white `rgb(255,255,255)`,
`outline-style: solid`, `2px`, on `oklch(0.208 0.042 265.755)` = `#0f172a` =
17.83.** The 14th, `button "Do not track me"`:

```
outline-style: auto   outline-color: rgb(16, 16, 16)   outline-width: 1px
ground: oklch(0.208 0.042 265.755)   ratio: 1.07
```

`ConsentToggle.tsx:21` applies only the className it is given, and PageShell
passes `"inline-block shrink-0 py-1 text-xs text-slate-400 underline
hover:text-white hover:no-underline"` - no ring recipe. The
`footer { --focus-ring: ... }` rebind cannot help a control that paints no
outline of its own.

This is a **regression, not an inheritance**: pre-port the same UA ring sat on
the light `bg-[#fafaf9]` footer
(`git show port-hospitality-phase0:.../SiteFooter.tsx:16,78`), roughly 19:1.
Phase 1 moved the ground to slate-900, restyled the label for it, and left the
ring alone. Same shape as R1 blocker B1 on startups-tech, one element instead of
thirty-one.
Fix: import `focusRing` in `PageShell.tsx` and append it to that className.

---

### GAP

**G1. Three `neutral-*` classes render inside `<footer>`.**
`PageShell.tsx:66,70`. Spec P1-D acceptance:
`grep -rn "neutral-" ... hospitality/web/src/components/layout/` "expect: no
hits". Actual: `border-neutral-200`, `bg-neutral-50`, `text-neutral-500`.
Rendered fragment counts on `/`: header `neutral-*` 0 / `slate-*` 29 (pass);
footer `neutral-*` **3** / `slate-*` 16 (fail). They are the Union Jack strip,
moved verbatim into the kit footer. Verbatim was the instruction for the markup;
it was not an exemption from the grey ramp the same phase owns.
Fix: pairs with G2 - re-ground the strip and the three classes go with it.

**G2. The Union Jack strip reads as a defect on the new footer.**
`PageShell.tsx:64-77`, rendered as the first child of `<footer>`.
Measured on `/about` at 1280: the strip is `1280 x 41` at the very top of a
546-tall footer. The pair is band `oklch(0.985 0 0)` = `#fafafa` on footer
`#0f172a`. Its text is `oklch(0.556 0 0)` (neutral-500) on the band = **4.54**,
clearing the 4.5 floor for 12px text by 0.04. Its `border-b border-neutral-200`
has nothing below it but slate-900 and is invisible.
Judged as a designer would: this was the top edge of a light cream footer, and
it is now a bright white plate dropped onto a near-black one. It does not read
as a flag rule introducing the footer; it reads as an unstyled leftover, and it
is the first thing the eye lands on at the bottom of all 59 pages. Owner ruling
Q6 was "keep it", and keeping it is fine - but that ruling was about the strip,
not about painting it white on black.
Fix: re-ground it for slate-900 (`bg-slate-900` / `border-slate-800`,
`text-slate-300`, flag artwork unchanged), which also closes G1.

**G3. `/research/hospitality-openings-closures-index/embed` renders full site
chrome.**
Spec §C1: this route and `/embed/[slug]` "both of which must stay chrome-free".
Measured:

```
/research/hospitality-openings-closures-index/embed  200  main=1 skip=1 header=1 footer=1
/embed/food-drink-vat-rate-checker                   200  main=0 skip=0 header=0 footer=0
```

The kit bypass is `pathname?.startsWith("/embed/")`
(`packages/web-shared/design/chrome/PageShell.tsx:29`) and this path does not
match. A partner iframing that chart gets our header, our footer, our skip link
and our Union Jack strip inside their page. Not a regression - it had chrome at
the tag too, see F5 - but the spec named it as a phase-1 requirement and it is
unmet.
Fix: add a chrome-free prefix prop, or move the route under `/embed/`. Do not
edit `packages/**` without the owner.

**G4. `globals.css:26-30` states two numbers and both are wrong.**
The comment says `grep -c "16 185 129"
packages/web-shared/design/globals-standard.css` = "3 occurrences", and promises
"Proof after the build: `grep -o "16 185 129" <built css> | wc -l` = 0".
Measured: the kit sheet has **7**; the built CSS has **8**.
The substance is sound and I verified it separately: all four channels are
declared on `:root` (`--brand-glow:201 105 69`, `-deep:176 83 47`,
`-edge:229 135 100`, `-faint:255 227 212`), every occurrence is a
`rgb(var(--brand-glow*, 16 185 129))` fallback argument, and no emerald renders
anywhere (`outline-emerald-500` compiles from
`packages/web-shared/console/components/VisitorsTable.tsx:146` and appears **0**
times in the DOM). But the acceptance test as written can never pass - a CSS
minifier does not delete a `var()` fallback - and a receipt reporting "0" for it
is reporting something it did not run. Playbook §6: a comment is a claim.
Fix: correct both numbers and restate the proof as "all four channels declared
on `:root`", which is the thing that is both true and checkable.

**G5. Two comments fifteen lines apart contradict each other about the footer
ground, and plan risk R4 asked for exactly this to be stated correctly.**
`globals.css:157-159`: "every ground phase 1 itself paints (header white,
**footer `#fafaf9`/`neutral-50`**, page body white) is light."
`globals.css:205-207`: "`.ground-dark` ... **Not mounted anywhere in phase 1 -
no surface phase 1 paints is dark** - so there is nothing to measure yet."
`globals.css:225`: `footer { --focus-ring: var(--focus-ring-on-brand); ... }`,
whose own comment at :216-224 explains that the footer is `bg-slate-900` and
needs the dark rebind.
Measured: `getComputedStyle(document.querySelector('footer')).backgroundColor`
= `oklch(0.208 0.042 265.755)` = slate-900. Phase 1 paints a dark ground on all
59 pages; `#fafaf9` was the ground of the footer phase 1 **deleted**.
The mechanism works (B2 aside, 13/13 footer links measured 17.83), so this is
not a rendering defect - it is the receipt misdescribing what phase 1 painted,
in the one file phases 2 to 6 will read for the rule.
Fix: rewrite both comments to say the footer is slate-900 and is bound by the
element rule, and move the measured 17.83 row into the file.

**G6. `HospitalityBackdrop` measures one ground and mounts on two.**
`HospitalityBackdrop.tsx:29-38`: "One row per ground this component mounts on
across this port; phase 1 mounts it on the footer only, so phase 1 writes
exactly one row."
Measured on `/about` at 1280: footer box `y 2001.19 -> 2547.19`; backdrop box
`x 576 -> 1280, y 2001.19 -> 2547.19` (`absolute inset-y-0 right-0 w-[55%]`);
Union Jack strip box `y 2001.19 -> 2042.19`, full width. The backdrop overlaps
the right 55% of the strip and, being later in DOM order with no `z-index` on
the strip, paints over it: 0.10 of `#e58764` composited on `#fafafa`, a second
ground with no row.
Fix: measure that pair, or give the strip `relative z-10` (which G2's fix wants
anyway) so the claim becomes true.

**G7. Gate row 7 gained a file and nobody wrote the reason at that line.**
Baseline row 7 listed `app/page.tsx` only. Now:

```
7  gradient grounds to measure stop by stop:
     app/page.tsx
     components/layout/HospitalityBackdrop.tsx
```

The new line is the `linear-gradient` in the backdrop's `maskImage`
(`HospitalityBackdrop.tsx:77`) - a mask, not a painted ground, and it needs no
stop-by-stop measurement. Row 7 is a blocker row and the playbook's rule for it
is "every line printed has a reason written at that line".
Fix: one sentence in the file saying the gradient is a mask.

---

### NIT

1. **Scope creep past P1-G.** The plan defers `components/forms/*` and
   `MiniCapture` to phase 6 ("putting them in phase 1 would give phase 1 a lease
   on files every other phase renders"). Phase 1 edited all four, converting
   `focus-visible:outline-[var(--brand-primary)]` to `focusRing` - the right
   change, and it closes the startups-tech S3 hole - and also changed
   `text-neutral-500` to `text-neutral-600` twice in `LeadForm.tsx:203,238`,
   a visible colour change on a phase-6 file. Declare it or revert it.
2. **`focusRing` reads a bare `var(--focus-ring)` with no fallback**
   (`layout-utils.ts:42`), where the kit's own is
   `var(--kit-focus-ring,var(--color-primary-600))`. If the token were ever
   dropped, the `outline-color` declaration is invalid and every ring on the
   site silently becomes the UA one - which is precisely B2's failure mode,
   already live on one control.
3. **Ring-guard coverage.** `focus-ring.test.ts:37` excludes **any** directory
   named `admin` at any depth, not just `src/app/admin`; the corpus is `.tsx`
   only, so `layout-utils.ts` is covered solely by the pinned four-name list at
   `:11` and a fifth export would be ungated. 10/10 tests pass, the walk is real
   (`corpus.length > 25`), `guards the guard` is present, and the bracket-value
   ban R1-S3 asked for is implemented at `:62-71`.
4. **Gate row 2a still reads 0.** P1-B says the decline comments were written so
   row 2a counts them ("row 2a counts the FILE PATH, not the component name").
   Row 2a's regex is `web-shared/design/(marketing|primitives)/...`; the decline
   comments name `web-shared/design/layout-utils.ts`, which it cannot match. The
   comments are correct and useful; the claim about the row is not.
5. **One orphan utility in the shipped CSS.**
   `.text-\[var\(--gold-strong\)\]{color:var(--gold-strong)}` compiles, and
   `--gold-strong` is declared nowhere in the served CSS and appears in no file
   under `hospitality/web/src` or `packages/` - it is a Dentists token
   (`Dentists/web/src/app/globals.css`). Zero occurrences in any hospitality
   DOM. Stale scan artefact; harmless, but it is the only bare `var()` read in
   the whole sheet with neither a declaration nor a fallback.
6. **One page-load returned status 0** in `browser_check` (`/terms`, laptop
   width). Every curl of `/terms` returns 200 and the sweep marks it clean.
   Transient; recorded so the next run does not read it as new.

---

### PROCESS, and it blocks the tag

**P1. The working tree moved under the review, and phase 1 cannot be isolated
from it.**
At the start of this review:
`git diff --stat port-hospitality-phase0 -- hospitality/` = **12 files changed,
350 insertions**; `git status --short hospitality` = 12 modified/deleted plus 3
untracked.
Forty minutes later, the same two commands: **37 files changed, 2,253
insertions, 962 deletions**; 37 modified/deleted plus 3 untracked - now
including `app/about/page.tsx` mounting `HospitalityBackdrop`, the kit
`Breadcrumb`, `FaqSection` and `ReadingProgress` on the blog templates,
`lib/blog.ts`, `data/hospitality-services.ts` and W5 receipt comments. Phases 2
to 6 builders are writing into the same tree.

Consequences: phase 1 has no commit and no tag; three of its files
(`PageShell.tsx`, `HospitalityBackdrop.tsx`, `focus-ring.test.ts`) are untracked
and appear in no diff; there is no command that shows phase 1 and only phase 1;
and nothing pins this review to a SHA. The phase-1 files themselves did not
change during the review (md5: `globals.css` c28572d1, `layout-utils.ts`
bcd20d50, `PageShell.tsx` 926a88ab, `HospitalityBackdrop.tsx` 81eb6bf6,
`layout.tsx` dea7e6f2) and the served CSS and rendered DOM match them, so every
measurement above stands - but it stands against a tree, not a commit.
Same shape as R1 S4 on startups-tech, worse in degree.
Fix: commit and tag `port-hospitality-phase1` before the gap-fix pass, and stop
running phases 2 to 6 in the tree the phase-1 review is measuring (playbook §13,
"ONE SITE AT A TIME"; the same reasoning applies one phase at a time inside a
site).

---

## C) CLEARED - every row with the command and the decisive line

| # | check | command | decisive output |
|---|---|---|---|
| 0 | identity | `curl -s :3202/ \| grep -o "<title>.*</title>"` | `<title>Specialist Hospitality Accountants UK</title>`, 200 |
| 1 | brand ramp | `grep -o -- '--color-primary-[0-9]*:[^;]*' <css>` | `--color-primary-600:#b0532f`; 50/100/200/400/500/600/700/800/900/950 emitted (300 declared at `globals.css:75`, tree-shaken as unused) |
| 1 | ramp utilities | `grep -o 'bg-primary-50\|text-primary-600\|ring-primary-100' <css> \| sort \| uniq -c` | `7 bg-primary-50`, `1 text-primary-600`, `1 ring-primary-100` (baseline 0/0/0) |
| 1 | `--radius` | `grep -o -- '--radius[a-z-]*:[^;]*' <css>` | `--radius:0rem`, `--radius-xl:calc(var(--radius) + 4px)`, `--btn-radius:var(--radius-xl)` - the calcs resolve |
| 1 | no pill buttons | `grep -o "9999px" <css> \| wc -l` | 8, every one inside `rounded-[var(--btn-radius,9999px)]` in the legacy `packages/web-shared/components/ui` recipes this site does not import; the rendered header CTA computes `rounded-xl` = 4px |
| 1 | glow channels | `grep -o -- '--brand-glow[a-z-]*:[^;]*' <css>` | all four at the brand hue: `201 105 69` / `176 83 47` / `229 135 100` / `255 227 212` |
| 1 | emerald | `grep -o "16 185 129" <css> \| wc -l` | **8** - see G4. No emerald renders: `outline-emerald-500` = 0 in the DOM |
| 1 | keyframes | `grep -o '@keyframes [a-zA-Z-]*' <css> \| sort -u` | `fadeInUp, marquee-y, num-glow, card-glow` (all four the kit ships) plus `accordion-down/-up, enter, ping` from `tw-animate-css` |
| 1 | motion classes | `grep -c` each in the served CSS | `eyebrow-rule` 3, `tick-draw` 2, `num-glow` 3, `card-glow` 2, `marquee-y` 2 - all defined |
| 1 | every `var()` the kit reads | CSS parse, reads minus declarations | 257 reads / 257 declarations; 23 read-but-undeclared, 22 of them only through `var(--x, <fallback>)`; the single bare read is `--gold-strong` (nit 5) |
| 2 | chrome grey ramp | fragment counts on the rendered `/` | header `neutral-*` **0** / `slate-*` 29; footer `neutral-*` **3** / `slate-*` 16 - **G1** |
| 3 | kit `SiteHeader` | rendered `<header>` fragment | one `<header>`; wordmark `HOSPITALITY` / `TAX`, accent `color:#b0532f` (= the declared 600 step) |
| 3 | nav labels | rendered text vs `niche.config.json navigation` | `Services\|For\|Calculators\|Research\|Blog\|About\|Contact` - all 7, verbatim, in order |
| 3 | CTA triple | rendered `<a data-cta>` in the header | `data-cta="header_book" data-cta-placement="header" data-cta-goal="form" href="/contact"` - matches `cta_baseline.json` |
| 3 | CTA hidden below 1024 | `page.setViewport` + `getComputedStyle` at 390/768/1023/1024/1280 | `display:none` w=0 at 390/768/1023; `display:flex` w=129 at 1024/1280. Burger the inverse (flex 48 / none) |
| 3 | cascade race closed | byte offsets in the served CSS | `.hidden{display:none}` @ 24885; `.lg\:inline-flex{display:inline-flex}` @ 85364 inside `@media (min-width:64rem)` - later, so it wins only at >= 1024. `btnPrimaryBase` opens with no display utility |
| 3 | drawer placement | `grep -o "mobile_menu" .next/static/chunks/app/layout-*.js \| wc -l` | **2**; `header_book_mobile` 1 |
| 3 | drawer live | click the burger at 390, read the dialog | `role="dialog"` present, 9 links, CTA `header_book_mobile\|mobile_menu\|form\|/contact`, `data-cta-variant` null (no `cta.variant` in config) |
| 3 | focus trap | kit source `SiteHeader.tsx:405-444` plus marker strings in the shipped chunk | `[tabindex]:not([tabindex="-1"])` 1 hit, `aria-modal` 1, `Tab` 1 in `layout-0aef2141ed42ec54.js`; on open `document.activeElement` is the panel's first button, not the burger - the 2026-09-29 kit trap is live |
| 3 | no phone | `grep -o 'tel:' header.html` | 0 |
| 4 | kit `SiteFooter` | rendered `<footer>` | one `<footer>`; wordmark, description, Calculators column ("All calculators" fallback), Company column (5), legal links, builder credit, disclosure, copyright, consent toggle |
| 4 | consent toggle ratio | canvas composite on slate-900 | `text-slate-400` 12px = **6.78** (the baseline row `button "Do not track me" ratio=2.47 floor=4.5` appeared on 145 page-loads and is gone) |
| 4 | footer ring rebind | tab-walk with 340 ms settle | `.ground-dark,footer{--focus-ring:var(--focus-ring-on-brand);--kit-focus-ring:var(--focus-ring-on-brand)}` in the served CSS; 13/14 stops ring white **17.83** on `#0f172a`. The 14th is **B2** |
| 4 | `companyItems` hrefs | route probe | `/about /contact /privacy-policy /terms /cookie-policy` all 200; every footer href 200 (`/`, `/blog`, `/calculators`, the DWC external) |
| 4 | Resources column | rendered footer | absent, as planned: `resourcesHref="/research"` is passed but `niche.navigation` declares no children, so `buildFooterColumns` drops the column. Services likewise |
| 4 | builder credit | rendered footer | "Built by Double Wired Creative" -> `https://www.doublewiredcreative.com/` |
| 4 | legal lines byte-identical | vs `git show port-hospitality-phase0:.../SiteFooter.tsx:66-72` | both render `siteConfig.company.legalDisclosure` and `(c) {year} {legalName} t/a {tradingName}.` unchanged |
| 4 | Union Jack strip | rendered box plus computed colours | see **G2** |
| 4 | dropped sentence | rendered footer text | "Specialist hospitality accountants. Editorial content only..." absent - **owner-visible deletion, recorded, not a defect** |
| 5 | landmarks | 11 routes probed | exactly `main=1 skip=1 header=1 footer=1` on `/ /about /contact /services /for /calculators /research /blog` and the three `/research/*`; `<main id="main" class="flex-1 scroll-mt-24">`; the skip link is the first focusable node in `<body>` |
| 5 | `/embed/*` | route probe | `/embed/food-drink-vat-rate-checker` 200 with `main=0 skip=0 header=0 footer=0`. `/research/.../embed` - **G3**. (The `/embed` gallery is 404 on this site, pre-existing) |
| 6 | tests | `cd hospitality/web && npm test` | **7 test files, 53 tests, all passed** (850 ms); `focus-ring.test.ts` 10/10 |
| 6 | `outline-` resolution | CSS parse of every `outline-color` declaration | 7 distinct: `var(--focus-ring)`, `var(--kit-focus-ring,var(--color-primary-600))`, `var(--color-primary-600)` x2, `var(--color-primary-400)`, `var(--brand-primary)`, `var(--color-emerald-500)`. The last two compile from `packages/web-shared/components/ui` and `.../console` (pulled in by `@source`) and are carried by **no** hospitality element |
| 6 | `outline-none` | `grep -rn "outline-none" hospitality/web/src --include=*.tsx` | **1** hit: `LeadForm.tsx:323`, the `tabIndex={-1}` programmatic-focus heading that P1-G names as a non-defect. `error.tsx:47`'s `focus:outline-none` is gone, replaced by `focusRing` |
| 6 | ring on the brand ground | computed | the header CTA rings `outline-primary-600` `#b0532f` on the header's white = **5.09**. It carries the kit literal rather than `--focus-ring`; correct outcome on a light ground |
| 7 | layout-utils | `grep -c 'web-shared/design/layout-utils' .../layout-utils.ts` | **7** (gate row 1, baseline 0). `grep -coE '#[0-9a-fA-F]{3,8}'` on it and on `PageShell.tsx` = **0**. `grep -c 'outline-\[var(--focus-ring)\]'` = **4** |
| 7 | `btnOnDark` | source vs the kit | the kit recipe character-for-character except the ring (`border-white/40 bg-white/5 ... backdrop-blur-sm`), **not** the old `btnSecondary` alias. `btnPrimary` and `btnSecondary` likewise |
| 7 | deleted exports | `grep -rn 'btnOnTeal\|linkArrow' hospitality/web/src` | 2 hits, both inside the decline comment at `layout-utils.ts:10-11`. `SiteHeaderWrap` / `components/layout/SiteFooter`: 6 hits, all comment lines in `PageShell.tsx`. Zero live consumers |
| 7 | buttons carry a ring | rendered header / footer / error page | header CTA yes (kit literal), 13 footer links yes (`focusRing` through the kit), both error-page buttons yes. The footer consent button **no** - B2 |
| 8 | contrast | `browser_check.mjs --out=bc_r1.json` vs `browser_baseline.json` | baseline **235** contrast failures (145 `button "Do not track me"`, 74 `a "Get in touch"`, 8 + 8 form strings) -> **0**. No remaining sub-floor rows |
| 8 | overflow | same run | **0** at 390/768/1024/1440 across 152 page-loads; independently `scrollWidth - clientWidth = 0` at 390/768/1023/1024/1280 |
| 8 | console by class | same run | baseline 164 console rows (AdSense CSP `frame-src` plus three `/calculators/*` 404s). After: the 404 class is gone, AdSense CSP remains (known and accepted), plus one `[noise]` "Ad was removed... peak CPU" on two blog posts. **No new error class** |
| 8 | link floor | `sweep.mjs` vs `sweep_baseline.json` | 59/59 URLs clean, **0 link-floor breaches**, 942 links. **0 routes dropped**; per-route delta **+3 to +5**. `/` 21->26, `/about` 6->11, `/contact` 6->11, `/blog` 37->42 |
| 8 | CTA census | `cta_snapshot.mjs` | 59 routes, 59 tags, **1 distinct triple** `header_book\|header\|form` - unchanged from `cta_baseline.json` |
| 8 | dead links / dashes | sweep | 0/3 internal links dead; **0 dash regressions**. Chrome fragments: 0 em-dashes, 0 en-dashes |
| 9 | gate §9.1 | the playbook block, run on the current tree | below |
| 10 | prose freeze | `git diff port-hospitality-phase0 --` the phase-1 files | the only changed lines carrying visible words are **comment** lines (`layout.tsx:21,27`). No JSX text node and no markdown changed; `git diff --stat ... hospitality/web/content` is empty. The two prose deltas are structural, both owner-visible and both recorded: the dropped "Editorial content only" sentence, and the footer's brand column losing its legal-name eyebrow, site-name heading and "Contact us" link to the kit's wordmark plus description |
| 10 | deps | `git diff .../package.json`; `python scripts/check_dependency_closure.py` | `+ "tw-animate-css": "^1.4.0"`; **"dependency closure OK across 19 sites"** |
| 10 | types | `cd hospitality/web && npx tsc --noEmit` | no output, exit 0 |
| 11 | `@layer components` | served CSS | the only site rule in that layer is `.ground-dark,footer{--focus-ring...;--kit-focus-ring...}`. No Tailwind utility sets either property, so nothing can outrank it - verified by the 17.83 measurement, not by reading |
| 11 | unlayered rules | served CSS | one site-authored unlayered rule, `.prose table:not(.not-prose *)` at byte 19644, deliberate and dated; plus the kit's deliberate `h1..h6` line-height |
| 11 | `data-cta` on a wrapper | rendered DOM | the attribute sits on the `<a>` itself on all 59 routes; no wrapper carries it |
| 11 | comments vs code | spot-checks | 3 in `globals.css` -> 2 false (**G4**, **G5**), 1 true (the `--kit-focus-ring` computed-value note at :176-180, which the CSS confirms). 3 in `PageShell.tsx` -> all true (embed bypass, Union Jack verbatim against `git show`, `companyItems` hrefs). 1 in `HospitalityBackdrop.tsx` -> **G6** |
| 12 | known and accepted | not reported as gaps | AdSense CSP `frame-src`; the dropped footer sentence; `neutral-*` in page templates (246 hits, phases 2-6 by file); the four-marker row `ping=0 stats=0 rounded-full=0`; `.ground-dark` bound by the element rule instead |

### Gate §9.1, current tree

```
1  layout-utils  : 7                          (baseline 0  - PASSES)
2  kit adopted   : 6 distinct / 12 call sites  (baseline 2 / 5)
2a kit declined  : 0 comment references naming a kit path  (baseline 0 - nit 4)
2b homepage mktg : adopted=0 declined=0        (baseline 0/0 - phase 5)
3  webfont       : next/font/google            (source TRUE; RENDERED FALSE - B1)
4  backdrop      : 1                           (baseline 0  - PASSES)
5  eyebrow ratio : Eyebrow=0 section-label=8    (baseline 0/8 - phase 5)
6  rings not the token: (empty)
     empty because every site ring is now outline-[var(--focus-ring)]; the
     bracketed-literal blind spot the plan flagged is closed by the guard at
     focus-ring.test.ts:62-71, so this empty is a real pass, not the old one.
7  gradient grounds to measure stop by stop:
     app/page.tsx
     components/layout/HospitalityBackdrop.tsx   (NEW - G7)
8  ring guard    : walks=1 guards-the-guard=1   (baseline 0/0 - PASSES)
markers: ping=0 stats=0 backdrop=7 rounded-full=0
```

Rows 1, 4 and 8 were the three blocker rows and all three now pass. Row 3 passes
the grep and fails the browser; that is B1, and it is the reason the row exists.

---

## D) FALSE PREMISES IN THE PLAN

1. **§C4: "3 nested `<main>` remain" in the research pages**, with
   `curl -s :3202/research/uk-hospitality-insolvency-index | grep -o "<main" |
   wc -l` = 2 offered as proof.
   `git grep -c "<main" port-hospitality-phase0 -- hospitality/web/src` returns
   exactly one line, `layout.tsx:1`; the same at HEAD. Phase 0 had already
   removed all three. No swaps were needed, none were made, and
   `git diff port-hospitality-phase0 -- hospitality/web/src/app/research`
   correctly shows nothing from phase 1. Sequencing risk R8 evaporates with it.
2. **§0: "Webfont ... genuinely loaded ... NONE. Do not re-do."** See B1. The
   row was derived from source and a gate grep; the rendered DOM disagrees on
   every page of the site.
3. **§A4 and §0: the footer is a light `#fafaf9`/`neutral-50` ground.** Phase 1
   deletes that footer and ships `bg-slate-900`. See G5.
4. **§A6: the emerald counts (3 in the kit sheet, 0 in the built CSS).** Actual
   7 and 8. See G4.
5. **§C1: `/embed/[slug]` and `/research/.../embed` "both of which must **stay**
   chrome-free".** The second never was: at the tag, `layout.tsx` rendered the
   header and footer unconditionally on every route. Meeting the requirement is
   new work, not preservation. See G3.

Worth recording, and not a premise: plan risk R7 (the kit drawer does not trap
focus) is genuinely closed - the trap is in the kit at `SiteHeader.tsx:405-444`,
its marker string is in the shipped chunk, and on open the active element is the
panel's first button.

---

## E) OPEN QUESTIONS FOR THE OWNER, in plain English

1. **The site is not showing its own typeface.** Every page currently renders in
   whatever default font the visitor's computer happens to use, not the Plus
   Jakarta Sans that was set up for this site in September. It is a one-line
   fix. Do you want it done inside this phase, or logged for later?
2. **The footer is now dark.** It used to be a light cream panel; it is now the
   near-black footer every other ported site has. That is the shared design and
   it is deliberate, but it is the single most visible change across all 59
   pages. Happy with it?
3. **The British-flag strip has been kept, as you asked, but it is now a white
   band sitting on top of the dark footer.** It reads as a leftover rather than
   as part of the footer. Three options: leave it, re-draw it in the footer's
   dark colours so it belongs, or drop it. We recommend re-drawing it.
4. **The line "Specialist hospitality accountants. Editorial content only.
   Contact us for advice specific to your business." is now gone from the bottom
   of every page**, as the plan recommended. Confirming it, not asking again.
5. **One of our chart pages that partners can embed on their own websites still
   shows our header and footer inside their page.** It always has; the plan
   assumed it did not. Should we make it chrome-free like the calculators?
6. **Buttons across the site have gained a very slight rounding at the corners**
   where they used to be perfectly square. This came with the shared button
   recipe. It is a one-line setting either way. Keep or revert?
7. **Vertical spacing in about ten sections is now slightly tighter**, again
   from the shared standard. Confirm.
8. **Work on the later phases is happening in the same folder at the same time
   as this review.** That makes it impossible to say exactly which change
   belongs to which phase, or to return to this exact state later. We recommend
   finishing and saving one phase before the next one starts.
