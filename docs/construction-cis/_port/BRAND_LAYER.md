# TRADE (construction-cis) — BRAND LAYER, full working

Phase 0 derivation for the Trade Tax Specialists design port. This file is the working; the
orchestrator condenses it into `docs/construction-cis/DESIGN_DELTA.md`.

Format precedent: `docs/generalist/_port/DISPOSITION_SLICE3.md` §8.
Standard: `docs/_engines/PROPERTY_STANDARD_ROLLOUT.md` §A (A.1 colour semantics, A.8 floors) and
§L (L.1 template, L.2 derivation, L.3 registry).

Sources read in full 2026-09-11: rollout §A + §L, `docs/generalist/DESIGN_DELTA.md`,
`docs/generalist/_port/DISPOSITION_SLICE3.md`, `docs/medical/DESIGN_DELTA.md` §1 + §5,
`construction-cis/web/src/app/globals.css` (305 lines),
`construction-cis/web/src/components/ui/layout-utils.ts`,
`packages/web-shared/design/layout-utils.ts`, `packages/web-shared/design/globals-standard.css`,
`node_modules/tailwindcss/theme.css`, `construction-cis/niche.config.json`,
`src/lib/calculators/tools/cis-penalty-calculator.ts`, `content/resources/gross-payment-status.md`,
`src/app/cis-refund/page.tsx`, `src/app/gross-payment-status/page.tsx`,
`src/components/layout/{SiteHeader,SiteFooter}.tsx`, `src/components/brand/BrandWordmarkHomeLink.tsx`.

Owner decisions carried in, NOT revisited here (2026-09-11): the brand stays orange,
`--accent: #f97316` unchanged as the live brand hue; the estate's warning/penalty semantics move
OFF orange.

---

## 0. Method, and the self-test the numbers rest on

Contrast was computed by hand, WCAG 2.x sRGB relative luminance,
`ratio = (L_lighter + 0.05) / (L_darker + 0.05)`, in a throwaway scratchpad module
(`wcag.mjs`, deleted on completion). `scripts/validate_palette.js` does not exist (A.8).

`docs/_engines/instruments/browser_check.mjs` was NOT used for contrast and must not be: it
cannot resolve `var()` colours, falls back to white, and on a variable-themed site produced
1,644 false findings including ratio 1.00 for pairs that measure 5.84:1.

**Self-test, run against the exported function the tables below actually call (not a local copy
of the rule — trap T9):**

| case | computed | expected | verdict |
|---|---|---|---|
| slate-500 `#64748b` on white | 4.76 | 4.76 | PASS |
| slate-400 `#94a3b8` on white | 2.56 | 2.56 | PASS |

The calculator then reproduced nine independently published estate values without adjustment:
orange-500 2.80, orange-600 3.56, orange-700 5.18, orange-800 7.31, red-600 4.83, red-800 8.31,
violet-700 7.10, fuchsia-700 6.32, purple-700 6.98 — all matching `docs/generalist/DESIGN_DELTA.md`
§2 and `docs/medical/DESIGN_DELTA.md`. Treat that as a second, external self-test.

**Hex-provenance note (minor, recorded so nobody "fixes" it later).** The estate's reference
hexes are the classic (v3) sRGB set. Tailwind v4 ships oklch, and the oklch→sRGB conversion is
not byte-identical: v4's slate-400 `oklch(70.4% 0.04 256.788)` renders `#90a1b9`, which measures
**2.63** on white, not the 2.5640 A.8 asserts for `#94a3b8`. Both are far under 4.5 so no rule
changes, and every table below uses the classic hexes so the numbers reconcile with the three
deltas already approved. The oklch strings are carried verbatim in §1 because those are what
actually ship.

---

## 1. The primary ramp

`#f97316` **IS** Tailwind orange-500 exactly. No snapping required, no distance to report: the
live brand hex is a ramp step, which is the easy case (Medical's copper was not, and Medical had
to demote its brand hex to graphics-only as a result). Trade has no such problem.

`niche.config.json → brand.primary_color` is `"#f97316"` = **the 500 step**. The
`niche-config` guard that pins `brand.primary_color` ↔ `--brand-primary` stays green:
`--brand-primary: var(--accent)` = `#f97316` today and after the port.

oklch verbatim from `node_modules/tailwindcss/theme.css`, hex beside each step:

```
--color-primary-50:  oklch(98% 0.016 73.684)      /* #fff7ed */
--color-primary-100: oklch(95.4% 0.038 75.164)    /* #ffedd5 */
--color-primary-200: oklch(90.1% 0.076 70.697)    /* #fed7aa */
--color-primary-300: oklch(83.7% 0.128 66.29)     /* #fdba74 */
--color-primary-400: oklch(75% 0.183 55.934)      /* #fb923c */
--color-primary-500: oklch(70.5% 0.213 47.604)    /* #f97316 = niche.config brand.primary_color */
--color-primary-600: oklch(64.6% 0.222 41.116)    /* #ea580c */
--color-primary-700: oklch(55.3% 0.195 38.402)    /* #c2410c */
--color-primary-800: oklch(47% 0.157 37.304)      /* #9a3412 */
--color-primary-900: oklch(40.8% 0.123 38.172)    /* #7c2d12 */
--color-primary-950: oklch(26.6% 0.079 36.259)    /* #431407 */
```

These are byte-identical to generalist's approved block, necessarily: same family, same source
file. The ramp lands via the O.0b mechanism (a `@theme` block declaring
`--color-primary-50..950`), and coexists with the existing `--color-primary` alias in
`@theme inline` (`globals.css:68`), which today resolves to `var(--primary)` = `var(--accent)` =
orange-500. That alias is a SINGULAR token in a namespace the kit expects to be a ramp; it stays
for back-compatibility but every new usage goes through the numbered steps.

---

## 2. The button ground — a LIVE WCAG FAILURE on every page

### 2.1 What Trade actually renders today

Trade does **not** consume the kit's token-driven button. It has its own
`src/components/ui/layout-utils.ts`, and its `btnPrimary` hard-codes the ground:

```
bg-orange-500 ... text-white ... hover:bg-orange-600 active:bg-orange-700
```

(`construction-cis/web/src/components/ui/layout-utils.ts`, `btnPrimary`.)

So the `--btn-ground` / `--btn-ground-hover` / `--btn-ground-active` escape hatch that
`packages/web-shared/design/layout-utils.ts` provides — and whose own docstring names orange-600's
3.56 as the reason it exists — is **not reachable from this site's button at all**. There is no
`--btn-ground` in `globals.css` (grep: 0), no `--btn-radius` (grep: 0), and no
`web-shared/design` import anywhere in `src` (grep: 0). The ground is a literal utility class.

### 2.2 The measurement

| ground | hex | white label | verdict |
|---|---|---|---|
| orange-500 (**live `btnPrimary`**) | `#f97316` | **2.80** | **FAIL** — 62% of the 4.5:1 floor, and below the 3:1 graphics floor too |
| orange-600 (live `hover:`) | `#ea580c` | 3.56 | FAIL |
| orange-700 (live `active:`) | `#c2410c` | 5.18 | PASS |
| orange-800 | `#9a3412` | 7.31 | PASS |

The live resting state fails. The live hover state fails. Only the pressed state passes — which
is the worst possible arrangement, because the resting state is the one every visitor sees and
the pressed state is the one nobody reads.

### 2.3 Blast radius: every page

`btnPrimary` is imported by 25 files. One of them is `src/components/layout/SiteHeader.tsx`
(lines 95 and 174 — the desktop header CTA and the mobile drawer CTA), and `SiteHeader` is
rendered by `PageShell`, which `src/app/layout.tsx:99` wraps around `{children}`. **Every route
on the site renders a failing primary button in its header.** The last local build emitted
**260 prerendered HTML pages** (`.next/server/app/**/*.html`), which is the order of magnitude:
38 static `page.tsx` routes plus the `[category]`/`[slug]`/`[topic]` fan-out over 82 blog posts,
the calculator roster, `CITIES`, `GLOSSARY`, `tradeTypes` and the published guide topics.

Separately, `bg-orange-500` appears as a literal in 24 places across 19 files, and the
`.section-label` utility (`globals.css:175-184`) is `background: var(--accent)` + `color: white`
— the same 2.80 — used **38 times**.

**This is a live defect, not a port decision. It is shipping now, on every page, on the site's
primary conversion affordance.**

### 2.4 Recommendation

**B1 (RECOMMENDED): move the button ground to the 700 step, and route it through the token.**

```
--btn-ground:        #c2410c;  /* orange-700, white label 5.18 PASS */
--btn-ground-hover:  #9a3412;  /* orange-800, white label 7.31 PASS */
--btn-ground-active: #7c2d12;  /* orange-900, white label 9.37 PASS */
```

This is L.2's prescribed remedy verbatim ("if the 600 step fails 4.5:1 for text use, shift text
usages to the 700 step"), it is what generalist took on the identical ramp (APPROVED 2026-09-09),
and declaring the three tokens in `:root` is exactly the shift the kit's docstring describes. The
token that carries it is `--btn-ground`; the local `btnPrimary` is rewritten to
`bg-[var(--btn-ground,var(--color-primary-700))]` so the site and the kit agree, and so a future
re-hue is one `:root` edit rather than 19 files.

`.section-label` takes the same ground (`background: var(--btn-ground)`), which fixes all 38
usages in one line.

Rejected:
- **B2, dark label on orange-500** (`#431407` on `#f97316` = 6.3:1). Clears the floor, keeps the
  brighter brand orange, but gives Trade a different button language from every other site in the
  estate. Rejected on consistency, not on contrast.
- **B3, the WCAG large-text exemption** (3:1 at ≥18.66px bold / ≥24px regular). MEASURED AND
  REJECTED: the live button is `text-sm font-medium` = 14px at weight 500. Not large text, and
  2.80 misses even the 3:1 graphics floor.

---

## 3. Text usages and the 600-step rule

### 3.1 `--accent-strong` is not what its comment says

`globals.css:23` reads:

```css
--accent-strong: #ea6c07;   /* orange-600 */
```

**The comment is wrong.** Tailwind orange-600 is `#ea580c`. `#ea6c07` is a bespoke hex 20.6 RGB
units away, in no ramp, and it measures **worse** than the step it claims to be:

| token | hex | white | surface `#fafaf9` | cream `#fafaf7` | dark `#1e293b` | verdict |
|---|---|---|---|---|---|---|
| `--accent-strong` **as shipped** | `#ea6c07` | **3.16** | **3.03** | **3.03** | 4.63 | **FAIL on every light ground** |
| orange-600 (what the comment claims) | `#ea580c` | 3.56 | 3.41 | 3.41 | 4.11 | FAIL on light |
| orange-700 (**recommended**) | `#c2410c` | **5.18** | **4.96** | **4.96** | 2.82 | PASS on light |

Consumers: `.prose-blog a` (`globals.css:224`) and `--brand-primary-strong` (`:61`). So **every
inline link in every one of the 82 blog posts, plus the resource bodies, renders at 3.16:1** —
a worse live failure than generalist's 3.56, which was itself logged as a site-wide defect.

**Recommendation: `--accent-strong: #c2410c` (orange-700).** 5.18 on white, 4.96 on the site's
own `#fafaf9` surface and on the `#fafaf7` cream. This is the L.2 600-step rule applied, and it
also retires an off-ramp hex that nothing justifies.

`--accent` stays `#f97316` (owner decision) but is **demoted to non-text brand use**: grounds,
rules, borders, icons, motif strokes. It must not carry text on a light ground.

### 3.2 The other live text failures in the same family

| usage | file | colour | ground | ratio | verdict |
|---|---|---|---|---|---|
| `.eyebrow` | `globals.css:141` | `var(--accent)` orange-500 | `#fafaf9` | **2.68** | **FAIL** (12px mono uppercase — the hardest case) |
| `text-orange-500` as text | 11 usages in `src` | `#f97316` | white / `#fafaf9` | **2.80 / 2.68** | **FAIL** |
| `.prose-blog a:hover` | `globals.css:234` | `var(--accent)` | white | **2.80** | **FAIL** (hover is still text) |
| footer inline link | `SiteFooter.tsx:44` | `text-orange-600` | `#fafaf9` | **3.41** | **FAIL** |
| GPS rate cell | `gross-payment-status/page.tsx:130` | `text-orange-600` | white | **3.56** | **FAIL** |
| CIS deduction-rate cell | `cis-refund/page.tsx:198` | `text-orange-600` | white | **3.56** | **FAIL** |
| footer legal line | `SiteFooter.tsx:81` | `text-neutral-400` | `#fafaf9` | **2.42** | **FAIL** |
| `--ink-whisper` | `globals.css:18` | `#a3a3a3` | `#fafaf9` | **2.42** | **FAIL** — retire or move to `#737373` (4.54) |

Fixes: `.eyebrow` colour → `var(--accent-strong)` (orange-700) on light grounds and
`orange-300 #fdba74` on dark (8.67); every `text-orange-500`/`text-orange-600` **text** usage →
`text-primary-700`; `.prose-blog a:hover` → orange-800 `#9a3412` (7.31); `--ink-whisper` →
`#737373` (neutral-500, 4.74/4.54).

Graphics-floor usages that are FINE and must not be "fixed": the focus ring at orange-600 (3.56
clears 3:1 — note the site currently rings at **orange-600 already** in its local `focusRing`,
which is correct, unlike generalist's orange-500 2.80), tick marks at orange-600 (3.56), motif
strokes, and `--highlight: #f97316` on the dark ground (5.22, passes as text too).

---

## 4. The warning ladder

### 4.1 The constraint set

1. **Orange is the brand** (owner, unchanged). Orange is unavailable.
2. **Amber is unavailable too.** Medical's finding transfers exactly: amber-800 `#92400e` and
   orange-800 `#9a3412` are **8 RGB units apart**, and amber-700 `#b45309` is **48.1** from
   orange-700 `#c2410c`. An amber step on an orange-brand site hides the collision rather than
   resolving it. Amber is also Medical's primary ramp.
3. **Must differ from generalist's ladder** (violet-700 / fuchsia-700 / red-600 / red-800;
   on-dark violet-400 / fuchsia-400 / red-400), because the two sites share the brand hue — this
   is the only place they can be told apart at the semantic layer.
4. **Owner wants red**, preferably as step one (orchestrator's carried recommendation).
5. Estate contract (§L.2): escalating severity, distinguishable steps, every step ≥4.5:1 on its
   ground, first step fully saturated.

### 4.2 How many steps: FOUR, and the site's own content is the evidence

Read directly, not inferred:

| tier the content expresses | source | what it is |
|---|---|---|
| a filing duty bites | `cis-penalty-calculator.ts` explainer ¶1: CIS300 due by the 19th, **"you must still file a nil return by that date"**; FAQ 1 | a deadline exists; nothing has been charged yet |
| a charge arises | `cis-refund/page.tsx:198` deduction-rate table (20% verified → **30% unverified**); `gross-payment-status/page.tsx:130`; the **5% tax-geared** element `PENALTY_PCT = 0.05` | money is being taken, not as a punishment |
| a penalty / status at risk | `PENALTY_INITIAL 100`, `PENALTY_2M 200`, `PENALTY_FIXED_6M/12M 300`; FAQ 8 "Will the penalty show on a compliance record?" → **GPS review, TTQT**; `NEW_CONTRACTOR_FIXED_CAP 3000` | a punitive charge, and the commercial consequence of losing Gross Payment Status |
| the deliberate / criminal track | explainer ¶5 + FAQ 7: **"deliberate and concealed withholding: the greater of 100% of the CIS deductions due or £3,000"**; `content/resources/gross-payment-status.md:42`: **"obtained or used fraudulently, or ... a criminal conviction for a relevant offence ... a five-year GPS disqualification"** | culpability, not lateness |

Tiers 2 and 3 are genuinely different in kind on this site in a way they are not on Property: the
30% unverified-subcontractor deduction and the 5% tax-geared element are *charges on the money*,
while the £100/£200/£300 ladder and GPS withdrawal are *sanctions on the contractor*. Collapsing
them would make the deduction-rate tables and the penalty tables the same colour, and those two
tables sit on adjacent pages (`/cis-refund`, `/gross-payment-status`) in the same nav cluster.

**Four steps. Not three.** Trade is the estate's most penalty-dense site; it is the only one with
a dedicated penalty calculator, a statutory ladder with four statutory tiers, and a separate
deliberate-conduct band on top.

### 4.3 RECOMMENDED LADDER — T-W1

| step | semantic name (what it MEANS) | token | on-dark token | Tailwind step | hex |
|---|---|---|---|---|---|
| 1 | **a duty bites** — a deadline exists (the 19th; nil returns still due) | `--warn-1` | `--warn-1-on-dark` | red-600 / red-400 | `#dc2626` / `#f87171` |
| 2 | **a charge arises** — money is deducted or geared (30% unverified, 5% element) | `--warn-2` | `--warn-2-on-dark` | pink-700 / pink-400 | `#be185d` / `#f472b6` |
| 3 | **a penalty, and status at risk** — the fixed ladder, GPS withdrawal, TTQT failure | `--warn-3` | `--warn-3-on-dark` | blue-700 / blue-400 | `#1d4ed8` / `#60a5fa` |
| 4 | **the deliberate and criminal track** — 100% or £3,000, five-year disqualification | `--warn-4` | `--warn-4-on-dark` | indigo-900 / indigo-300 | `#312e81` / `#a5b4fc` |

Token names are **generic on purpose** (`--warn-1`…`--warn-4`, `--warn-n-on-dark`): a future
re-hue is a value change, never a rename, and no consumer learns the hue. Do not name them
`--warn-red` or `--duty-amber`; that mistake is what makes a ramp unswappable.

Plus, separately and deliberately NOT a ladder step:

```
--form-error: #b91c1c;   /* red-700, 6.47 on white, 6.19 on #fafaf9 */
```

Because red-600 becomes ladder step 1, the form-error red must move off it or a validation
message and a filing-deadline chip become the same colour. Today `LeadForm.tsx:18`
(`errorClass`), `DetailsForm.tsx:156,177` and `SpecialistWidget.tsx:501` use `text-red-600`
(4.83 — passing, but now ambiguous); `BookingPicker.tsx:153`, `DetailsForm.tsx:186` and
`LeadForm.tsx:488` already use red-700/red-800. Standardise all of them on `--form-error`
red-700, paired with `role="alert"` + `aria-invalid`, never colour alone. This matches Medical.

### 4.4 How T-W1 escalates, and the honest cost of putting red first

Hue cannot carry monotonic escalation here, and that is **forced by the owner's instruction**:
red is the hottest warning hue available, so anything after it is necessarily cooler, and
red → pink → blue → indigo is not monotonic in perceived heat. Say so plainly rather than
pretending otherwise.

What does carry the escalation is **lightness, monotonically, on both grounds**:

| step | on white | on `#fafaf9` | on `#1e293b` (on-dark twin) | on slate-900 |
|---|---|---|---|---|
| 1 red-600 / red-400 | 4.83 | 4.62 | 5.29 | 6.45 |
| 2 pink-700 / pink-400 | 6.04 | 5.78 | 5.52 | 6.74 |
| 3 blue-700 / blue-400 | 6.70 | 6.42 | 5.75 | 7.02 |
| 4 indigo-900 / indigo-300 | 11.42 | 10.94 | 7.34 | 8.96 |

Each step is strictly darker than the last on light grounds and strictly lighter on dark grounds,
so the ladder reads as deepening in both directions. Every step clears 4.5:1 on all four grounds,
with the weakest value in the whole table at 4.62 (step 1 on the site's own surface).

This is the same defence Medical made and the owner accepted: every step is **directly labelled**
per DS §0.3, nothing rests on hue alone, and bars/chips carrying these colours are `aria-hidden`
with the value written out. Medical's own ladder (red → purple → indigo) is non-monotonic in heat
for the identical reason, and was approved on the identical grounds.

**Step separation, RGB units:**

| pair | distance | note |
|---|---|---|
| step 1 → 2 (red-600 → pink-700) | **64.2** | the weakest link in the ladder |
| step 2 → 3 (pink-700 → blue-700) | 209.7 | |
| step 3 → 4 (blue-700 → indigo-900) | 94.8 | |
| step 1 → brand orange-500 | 83.8 | |
| step 1 → brand orange-600 | 58.1 | the brand's closest approach to the ladder |
| step 2 → brand orange-500 | 129.6 | |
| step 3 → brand orange-500 | 295.6 | |
| step 4 → brand orange-500 | 237.1 | |

64.2 as a weakest link is within accepted precedent: Medical shipped 63.1 between its steps 2
and 3, and Solicitors accepted 57.8 as its weakest brand-to-ladder distance. The brand's closest
approach to the ladder is 58.1 (orange-600 → red-600), and orange-600 is being **removed from
text use** by §3 anyway, so in practice the closest shipping adjacency is orange-700 → red-600 at
a larger distance, never side by side in the same component.

**On-dark twin separations:** red-400 → pink-400 = 69.1; pink-400 → blue-400 = 170.7;
blue-400 → indigo-300 = 70.6.

**Why step 4's on-dark twin is the 300 step, not the 400.** indigo-400 `#818cf8` measures 4.90 on
`#1e293b` (it passes) but sits only **41.4** RGB units from blue-400, which would make steps 3
and 4 indistinguishable on the dark grounds — the exact failure the ladder exists to prevent.
indigo-300 `#a5b4fc` restores the separation to 70.6 at 7.34:1. Recorded as a deliberate,
measured deviation from the 400-step pattern, not an oversight.

**One adjacency to record:** indigo-900 `#312e81` is 72.7 RGB units from the current dark ground
`#1e293b` and 96.2 from slate-900 `#0f172a`. It is never used ON those grounds (the on-dark twin
is), so this is a note, not a defect — but a step-4 chip must never be placed on a navy band.

### 4.5 Hues REJECTED, and why (the required audit trail)

| candidate ladder | verdict | reason |
|---|---|---|
| **amber-700 / orange-700 / red-600 / red-800** (Property's literal ramp, A.8) | **REJECTED** | steps 1 and 2 ARE the brand family. amber-800 is 8 RGB units from orange-800, amber-700 is 48.1 from orange-700. Hides the collision rather than resolving it (Medical's commit wording, and it applies here more strongly because Trade's brand is orange itself, not a neighbour of it). This is also the ramp L.2 explicitly names as re-derivable exactly when the brand collides. |
| **amber / orange / fuchsia / violet** (Solicitors') | **REJECTED** | same amber/orange problem in steps 1-2, and it is another site's ladder. |
| **violet-700 / fuchsia-700 / red-600 / red-800** (generalist's) | **REJECTED, hard** | this is the one ladder Trade is forbidden to reuse. generalist's §5 collision note names Trade directly: the two sites share `#f97316`, so the warning ramp is the only layer that can distinguish them. Copying it would erase the last difference. Also puts red at step 3, not step 1, against the owner's stated preference. |
| **red-600 / purple-700 / indigo-700** (Medical's M-W1) | **REJECTED** | three steps where Trade needs four, and purple-700 / indigo-700 are Medical's. Trade's step 4 does touch the indigo family at the 900 step — see the honest note in §7. |
| **rose** in any position (rose-700 `#be123c`, 6.29 — contrast is fine) | **REJECTED** | rose is Solicitors' **primary ramp**. A Trade warning chip in Solicitors' brand colour is the kind of cross-site leak the emerald→primary rename exists to catch. It is also only 42.2 RGB units from red-600, so it would not separate from step 1 anyway. |
| **teal** in any position (teal-700 `#0f766e`, 5.47) | **REJECTED** | two reasons. Teal reads as success/calm, the opposite of a duty. And Trade carries a dead teal brand in its own code: `layout-utils.ts` still exports `btnOnTeal` (whose ground is now `neutral-900` — the name is a fossil). Reusing teal as a semantic resurrects a retired brand, which is the same reason Medical killed its M-W4. |
| **green / emerald** | **REJECTED** | Property's primary ramp, and in A.1's money semantics green means relief/money kept. A green penalty chip inverts the estate's colour semantics. |
| **sky-700** `#0369a1` (5.93) | **REJECTED as a step** | reads as regulatory/informational, and collides with the link-blue affordance (Medical rejected it on the same ground). Note blue-700 survives this objection on THIS site specifically — see below. |
| **cyan-700 / cyan-900** | **REJECTED** | cold and informational; "criminal track" in cyan is semantically wrong, and cyan-600 is already in use in the admin console (`admin/analytics/page.tsx:422`). |
| **blue-900 `#1e3a8a` as step 4** | **REJECTED** | only 80.5 RGB units from blue-700 (step 3) and it reads as navy, i.e. as the site's dark ground. indigo-900 gives 94.8 separation and does not read as furniture. |
| **pink-900 `#831843` as step 4** | **REJECTED** | same family as step 2; the ladder would have two magentas and read as three steps, not four. |
| **red-800 / red-900 as step 4** | **REJECTED** | it is Property's and generalist's terminal step, and it puts the ladder's start and end in the same family, which wastes the differentiation red-600-at-step-1 buys. |
| **purple-800/900 as step 4** | **REJECTED** | purple is Medical's step 2 family; indigo-900 is the same lightness class with one fewer collision. |

**Why blue-700 survives the "reads as a link" objection here, when sky-700 did not on Medical.**
Measured, not assumed: `grep` for every cool-hue utility (`blue-|teal-|cyan-|sky-|indigo-|violet-|purple-|fuchsia-|pink-`) across `construction-cis/web/src` returns **23 hits, of which every
single one outside `/admin` is `bg-blue-50` on one cell in `ExcelPreview.tsx:55`.** Trade's links
are orange (`--accent-strong`), underlined, on every surface. There is no blue link affordance on
this site for blue-700 to collide with, and blue and pink are the two genuinely unclaimed hue
families left in the estate. That is what makes T-W1 available to Trade and to no one else.

### 4.6 Sweep cost: near zero, because the ladder is NET-NEW

This is the one number in the brief that does not survive contact with the tree, so it is set out
in full.

`docs/_engines/PROPERTY_STANDARD_ROLLOUT.md` §L.2 warns: *"construction-cis has 128 amber/orange-6xx/7xx usages across 46 files; a reassignment is a sweep, price it."* Re-measured
2026-09-11 (`construction-cis/web/src`):

| pattern | usages | files |
|---|---|---|
| `amber-\|orange-[67]00` (L.2's pattern) | **138** | 48 |
| `amber-\|orange-[3-9]00` | 265 | 58 |
| `amber-` alone | **11** | 8 |
| `amber-` alone, outside `/admin` | **6** | 6 |

**The 138 are overwhelmingly BRAND usages, not warning usages.** orange-600/700 on this site is
the link colour, the eyebrow, the stat figure, the rule under a heading — and under the owner's
decision those **stay orange**. They are fixed by §3 (a 600→700 text shift), not by §4.

The actual warning-semantic surface today is:

- `amber`, 6 live usages: four decorative `from-orange-50 to-amber-50` gradient CTA panels on the
  research pages, one identical panel in `calculators/[slug]/page.tsx:151`, and one real state
  colour at `PremiumCalculator.tsx:324` (`bg-amber-50 border-amber-200`). The five gradients are
  brand decoration being retired by the port anyway; one genuine usage remains.
- `red`/`rose` outside `/admin`, 9 usages: form-error (7), one negative-number cell
  (`research/uk-construction-index/page.tsx:439`), one notification badge
  (`SpecialistWidget.tsx:567`).

So: **Trade has no warning ladder today.** T-W1 is a net-new system, exactly as Medical's was,
and the reassignment cost is one `PremiumCalculator` state colour plus standardising seven
form-error reds. The 128/46 figure in §L.2 priced the brand, not the semantics, and should be
corrected there — it is the kind of number that talks an owner out of the right decision.

---

## 5. The measured contrast table

Grounds: white `#ffffff`; the site's surface `#fafaf9` (`--surface`, and `--background` aliases
it, so this is the real page ground, not white); the site's dark ground `#1e293b` (`--dark`).
slate-900 `#0f172a` is shown where the port's dark-ground recommendation (§6.2) changes the
answer. Floors: **4.5:1 text**, **3:1 graphics**.

### 5.1 Brand ramp

| token | usage | ground | ratio | verdict |
|---|---|---|---|---|
| primary-500 `#f97316` | `btnPrimary` ground, white label | — | **2.80** | **FAIL** (live, every page) |
| primary-500 | `.section-label` ground, white label | — | **2.80** | **FAIL** (live, 38 usages) |
| primary-500 | `.eyebrow` text | `#fafaf9` | **2.68** | **FAIL** (live) |
| primary-500 | `text-orange-500` as text | white | **2.80** | **FAIL** (live, 11 usages) |
| primary-600 `#ea580c` | `btnPrimary` hover ground, white label | — | **3.56** | **FAIL** (live) |
| primary-600 | focus ring (graphic) | white | 3.56 | PASS graphics |
| primary-600 | tick colour (`tickClassName`) | white | 3.56 | PASS graphics |
| primary-600 | text / link | white / `#fafaf9` | **3.56 / 3.41** | **FAIL** as text |
| `#ea6c07` (`--accent-strong` as shipped) | `.prose-blog a`, every article link | white / `#fafaf9` | **3.16 / 3.03** | **FAIL** (live, site-wide) |
| primary-700 `#c2410c` | `--btn-ground`, white label | — | **5.18** | PASS (recommended) |
| primary-700 | `--accent-strong`, links + eyebrow | white / `#fafaf9` / cream `#fafaf7` | 5.18 / 4.96 / 4.96 | PASS (recommended) |
| primary-800 `#9a3412` | `--btn-ground-hover`, white label | — | 7.31 | PASS |
| primary-800 | stat figures on light | `#fafaf9` / slate-50 | 7.00 / 6.98 | PASS |
| primary-900 `#7c2d12` | `--btn-ground-active`, white label | — | 9.37 | PASS |
| primary-400 `#fb923c` | accent / eyebrow on dark | `#1e293b` / slate-900 | 6.46 / 7.89 | PASS |
| primary-300 `#fdba74` (`--highlight-on-dark`) | accent on dark, motif stroke | `#1e293b` / slate-900 | 8.67 / 10.59 | PASS |
| primary-500 (`--highlight`) | accent text on dark | `#1e293b` / slate-900 | 5.22 / 6.37 | PASS |
| primary-200 `#fed7aa` | hairline / border on dark | `#1e293b` | 10.81 | PASS graphics |
| primary-50 `#fff7ed` (`--accent-whisper`) | tint ground | — | ground only | n/a |

### 5.2 Warning ladder T-W1

| token | usage | ground | ratio | verdict |
|---|---|---|---|---|
| `--warn-1` red-600 `#dc2626` | a duty bites | white / `#fafaf9` / cream | 4.83 / 4.62 / 4.63 | PASS |
| `--warn-1-on-dark` red-400 `#f87171` | a duty bites, on dark | `#1e293b` / slate-900 | 5.29 / 6.45 | PASS |
| `--warn-2` pink-700 `#be185d` | a charge arises | white / `#fafaf9` / cream | 6.04 / 5.78 / 5.78 | PASS |
| `--warn-2-on-dark` pink-400 `#f472b6` | a charge arises, on dark | `#1e293b` / slate-900 | 5.52 / 6.74 | PASS |
| `--warn-3` blue-700 `#1d4ed8` | penalty, status at risk | white / `#fafaf9` / cream | 6.70 / 6.42 / 6.42 | PASS |
| `--warn-3-on-dark` blue-400 `#60a5fa` | penalty, on dark | `#1e293b` / slate-900 | 5.75 / 7.02 | PASS |
| `--warn-4` indigo-900 `#312e81` | deliberate / criminal track | white / `#fafaf9` / cream | 11.42 / 10.94 / 10.94 | PASS |
| `--warn-4-on-dark` indigo-300 `#a5b4fc` | criminal track, on dark | `#1e293b` / slate-900 | 7.34 / 8.96 | PASS |
| indigo-400 `#818cf8` | step-4 on-dark, 400-step alternative | `#1e293b` | 4.90 | PASS contrast, **REJECTED** — 41.4 RGB from blue-400 |

### 5.3 Neutrals, fine print, form error, button grounds

| token | usage | ground | ratio | verdict |
|---|---|---|---|---|
| `--ink` `#0a0a0a` | body / heading ink | `#fafaf9` | 18.96 | PASS |
| `--ink-soft` `#525252` (`--muted`) | body copy, `.prose-blog p` | white / `#fafaf9` | 7.81 / 7.48 | PASS |
| neutral-500 `#737373` | fine print 11px (recommended `--ink-whisper`) | white / `#fafaf9` | 4.74 / 4.54 | PASS |
| `--ink-whisper` `#a3a3a3` **as shipped** | fine print, `SiteFooter.tsx:81-82` | white / `#fafaf9` | **2.52 / 2.42** | **FAIL** (live) — retire |
| `--form-error` red-700 `#b91c1c` (recommended) | validation message | white / `#fafaf9` | 6.47 / 6.19 | PASS |
| red-600 `#dc2626` (current form error) | validation message | white | 4.83 | PASS contrast, **move anyway** — collides with `--warn-1` |
| white | on `--btn-ground` primary-700 | — | **5.18** | PASS |
| white | on `bg-orange-500` (**live button**) | — | **2.80** | **FAIL** |
| white | on `--dark` `#1e293b` | — | 14.63 | PASS |
| white | on slate-900 `#0f172a` | — | 17.85 | PASS |
| slate-500 `#64748b` | kit fine print (if slate adopted) | white / `#fafaf9` | 4.76 / 4.56 | PASS |
| `--destructive` `#dc2626` | shadcn destructive | white | 4.83 | PASS (becomes `--warn-1`'s twin; see §4.3) |
| `--success` `#10b981` (emerald-500) | success state | white | **2.07** | **FAIL as text** — and it is Property's brand hue. Retire in favour of an ink + tick treatment, or emerald-700 `#047857` (4.99). |

---

## 6. The other swap points (§L.1 template)

### 6.1 Neutral ramp — RECOMMEND KEEP WARM

Trade ships a warm neutral set: `--surface #fafaf9` (stone-50-ish), `--ink #0a0a0a`
(neutral-950), `--ink-soft #525252` (neutral-600), `--hairline #e5e5e5` (neutral-200), and the
utility classes in `src` are `neutral-*` throughout.

**Keep it.** neutral-500 4.74 vs slate-500 4.76 on white is parity; warm neutral is
chromatically correct under orange; and a swap is a full-repo sweep of `neutral-*` → `slate-*`
that buys nothing visible. This is the same call generalist took (APPROVED 2026-09-09) on the
same ramp, which also keeps the two orange siblings internally consistent.

Honest cost, identical to generalist's: the kit's components hard-code `slate-*`. Options are
A1 accept the mix (invisible on hairlines and body copy at these deltas), A2 tokenise the kit's
neutrals (programme-level work), A3 adopt slate. **Recommend A1**, recorded as a sanctioned
deviation.

One real defect to fix regardless: `--ink-whisper #a3a3a3` at 2.42 on the site's own surface
(§5.3). Move to `#737373` or retire the token.

### 6.2 Dark ground — the comment is wrong, and there are TWO dark grounds

`globals.css:31`:

```css
--dark: #1e293b;              /* slate-900 */
```

`#1e293b` is **slate-800**, not slate-900 (`#0f172a`). The site's own `--chart-4: #1e293b` at
`:56` labels the identical hex "slate-800" correctly, eleven lines apart. So the file contradicts
itself and the brief's suspicion is confirmed.

Worse: **`--dark` is barely used.** The dark ground is written as the literal `bg-[#1e293b]` in
**55 places** across the page tree (`cis-refund`, `gross-payment-status`,
`cis-invoice-template`, `cis-payment-deduction-statement-template`, `api/og/route.tsx` and
others), and there are a further **22 `bg-neutral-900`** bands (`#171717`). Trade is running two
different dark grounds, neither of them tokenised, and `bg-neutral-900` touching a kit
`slate-900` band on the same page is precisely the "one visibly wrong mix" generalist's slice 3
identified.

**RECOMMEND: adopt slate-900 `#0f172a` as the single dark ground**, for generalist's reason,
which applies here verbatim: the kit's navy components (`SlimHero`, `LeadCTAPanel`,
`TestimonialsSection`, `SiteFooter`) are **unparameterised** — they hard-code slate-900 and there
is no token to point at Trade's value. Keeping `#1e293b` guarantees a slate-800 band abutting a
kit slate-900 band.

Price it honestly: this is a **77-usage sweep** (55 literal `#1e293b` + 22 `bg-neutral-900`), all
of it mechanical, and it must land as `bg-slate-900` or `bg-[var(--dark)]` with
`--dark: #0f172a`. Recommend the token form so the next re-ground is one line. White on slate-900
measures 17.85 vs 14.63 on `#1e293b`; both pass, so this is consistency, not a contrast fix.

Related, and for the orchestrator's ground-oscillation pass (DESIGN_SYSTEM §9): **Trade's footer
is LIGHT** (`SiteFooter.tsx:17`, `bg-[#fafaf9]`), where Property's is navy. The port changes the
footer ground, which changes which section may precede it. Flagged, not decided here.

### 6.3 Font — KEEP Geist (K default)

Geist Sans + Geist Mono, loaded via the `geist` package in `src/app/layout.tsx:2-3`, variables
applied on `<html>` at `:71`, and already wired:

```css
@theme inline {
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}
```

That wiring is correct as shipped and needs no change. `body` additionally sets
`font-family: var(--font-geist-sans), system-ui, ...` at `:106`, which is redundant with
`font-sans` on the body element but harmless; leave it.

**Recommend KEEP.** A real typeface choice exists and is live, so §4.6.5's keep-current default
applies; no font is proposed, and the K row is "NOT proposed".

Changes required:

| change | from | to | where |
|---|---|---|---|
| body line-height | `1.7` | `1.6` | `globals.css:108` (A.3) |
| heading weight | `600` | `700` | `globals.css:118`, inside `@layer base` |
| heading line-height | `1.1` **inside `@layer base`** | `1.2` **UNLAYERED** | split out of the `@layer base` block at `:117-122` |

The third row is the A.3 / trap 7.1 split and it is **both** wrong today: wrong value (1.1) and
wrong layer (inside `@layer base`, where Tailwind's per-size bundled line-heights beat it).
`font-weight` and `letter-spacing` stay INSIDE `@layer base` so `font-*`/`tracking-*` utilities
win; `line-height: 1.2` goes OUTSIDE so it beats the `text-*` size defaults. Importing
`globals-standard.css` (§6.8) supplies the correct split already — so the fix is mostly to stop
the local block from fighting it, and `.prose-blog` h2/h3 at weight 600 (`:203`, `:212`) should
be reviewed against the 700 default in the same pass.

`letter-spacing: -0.02em` (`:120`) and the h1 `-0.03em` (`:125`) already match A.3.

### 6.4 Radius — `--radius-xl` computes to **12px**, not 0px and not 4px

Measured, because Medical's 0px was a live defect and the brief asked:

- `globals.css:47` declares `--radius: 0rem` in `:root`. This matches Property's value.
- There is **no** `--radius-xl` and **no** `--btn-radius` anywhere in the file (grep: 0 each).
- `--radius` is not a Tailwind v4 theme namespace key (the scale is
  `--radius-xs/sm/md/lg/xl/2xl/3xl/4xl`), so declaring it alone changes nothing Tailwind reads.
- Tailwind's own `theme.css:401` ships `--radius-xl: 0.75rem`.

**So `rounded-xl` renders 12px on Trade today.** Not 0px (Medical's defect) and not the house
4px. In practice it is rarely visible because the local `btnPrimary`/`btnSecondary` carry no
rounding class at all — Trade's buttons are hard square corners — while `rounded-2xl` (16px) is
used on the research and calculator CTA panels. The site is visually inconsistent rather than
broken.

**Recommend:** import `globals-standard.css`, which already carries the correct `@theme` block:

```css
@theme {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);   /* = 4px with --radius: 0rem */
  --btn-radius: var(--radius-xl);
}
```

With `--radius: 0rem` in the site's own `:root` (declared after the import, so it wins),
`--radius-xl` computes to **4px** — the house radius — and `--btn-radius` resolves with it.
`rounded-xl` becomes the only card/button radius; `rounded-2xl` is retired except the two
sanctioned overlay exceptions (DeepScrollModal sheet, HeldResult prompt).

`--btn-radius` matters the moment any kit component lands: `web-shared`'s `btnPrimary` reads
`rounded-[var(--btn-radius,9999px)]`, so without the token the first ported kit button renders as
a 9999px pill next to Trade's square local ones. Today that is latent, not live, because
`grep -rn "web-shared/design" src` = **0**.

### 6.5 Wordmark

Incumbent (`src/components/brand/BrandWordmarkHomeLink.tsx`): a bare `h-7 w-7` orange-500 square
plus one line of text (`siteConfig.name` = "Trade Tax Specialists") in `text-neutral-900`, with
`aria-label` built from name + tagline. No icon, no second line. Mounted twice, both in
`SiteHeader.tsx` (`:63` desktop, `:151` mobile drawer) — **not** in the footer, which renders the
name as plain text at `SiteFooter.tsx:35`.

**PROPOSAL:** icon = lucide **`HardHat`**; fallback **`Hammer`**.
line1 = `"TRADE TAX SPECIALISTS"`; line2 = `"CIS ACCOUNTANTS"` (owner picks; the
recommendation default, drawn from `niche.config.json → tagline`, "Specialist CIS accountants for
UK construction trades").

`HardHat` is the one mark every trade under CIS shares regardless of trade — groundworker,
sparks, chippy, plant operator — it is unambiguous at 16px, and it says "site" without naming a
trade. Icon colour `text-primary-600` on light grounds (3.56, clears the 3:1 graphics floor) and
`text-primary-300` on the navy footer (8.67). The wordmark **text** uses `--ink` on light (18.96)
and white on navy (17.85); it must never be orange, per §3.
`aria-label` built from the visible strings (WCAG 2.5.3), which the incumbent already does
correctly — keep that behaviour, diff before replacing.

Rejected:
- **`Calculator`** — every accountancy brand uses it, and on this site the calculators are a named
  product surface, so the mark would point at one route.
- **`Wrench`** / **`Drill`** — read "mechanic", and the estate has a separate high-street mechanic
  programme; the collision is avoidable.
- **`Building2`** / **`Warehouse`** — read commercial property, which is the Property site's
  territory, and skew Ltd-developer rather than trade.
- **`Truck`** — reads logistics/haulage, a different niche.
- **`TrendingUp`** — implies a growth claim this brand does not make.
- **Brick motifs** — Property owns brick (`HeroBrickBackdrop.tsx`).

### 6.6 Backdrop motif

Trade has **no** SVG backdrop. It has two CSS keyframes (`fadeInUp` → `.hero-reveal`,
`.hero-reveal-delay`, `globals.css:152-169`) and nothing else; heroes are flat grounds.

**PROPOSAL: a setting-out / scaffold grid.** Thin vertical standards at ~28px pitch, horizontal
ledger transoms at ~44px, two or three diagonal braces crossing at irregular intervals, and one
or two short dimension ticks with witness marks. ~26 SVG lines, `aria-hidden`.

It is the one visual shared by every trade on the site and by the act of setting out itself; it is
pure line work, so it degrades gracefully under the 35%→92% mask where a pictorial mark would
half-truncate; and it is geometrically distinct from the three motifs already claimed (Property's
brick etch, generalist's ruled ledger grid, Medical's ECG strip) — a diagonal brace over a
rectilinear grid is recognisable at a glance and is what separates it from generalist's purely
rectilinear ledger, which matters because the two sites share the brand hue.

Geometry is Property's exactly (appendix E): `absolute inset-y-0 right-0 w-[55%] hidden sm:block`,
host `relative overflow-hidden`, content `relative z-10`.

Stroke colours per ground:

| ground | stroke | opacity | mask | measured |
|---|---|---|---|---|
| navy (`slate-900` per §6.2) | `stroke-primary-300` `#fdba74` | .18 | `to left, black 35% → transparent 92%` | 10.59 as a graphic |
| cream `#fafaf7` | `stroke-primary-600` `#ea580c` | .10 | 45% / 97% | 3.41 as a graphic |

File: `src/components/layout/TradeBackdrop.tsx`, one component, 4+ consumers (`SlimHero`,
`LeadCTAPanel`, the homepage hero, the topic/service heroes).

Rejected: brick (Property's); ledger rules (generalist's and Solicitors'); ECG (Medical's);
a spirit-level bubble or plumb line (too literal, and illegible at the mask's thin end);
hi-vis chevron hazard stripes (reads "warning", which is the one semantic the motif must not
carry on a site whose whole §4 is about warnings); abstract blobs (say nothing).

### 6.7 Cream surface — KEEP `#fafaf7`

Trade has an incumbent cream and the brief's template did not assume one: `bg-[#fafaf7]` appears
**7 times** (`blog/page.tsx:62`, `contact/page.tsx:45`, `for/page.tsx:93`,
`for/[slug]/page.tsx:113,244`, `BlogListWithSearch.tsx:126,140`).

**Keep `#fafaf7`.** It is byte-identical to generalist's cream and one unit off Property's
`#fbfaf7`; Property's value is NOT synced in, same as generalist. Tokenise it as
`--hero-cream: #fafaf7` so `heroCreamSurface` (`bg-[var(--hero-cream,#fbfaf7)]`) resolves
correctly when the kit's heroes land — without the token the kit would silently paint Property's
cream next to Trade's in seven places.

### 6.8 Glow channel tokens — needed, and identical to generalist's by force

`globals-standard.css` is **not imported** (`grep -rn "web-shared/design" src` = 0), so Trade
gets none of the shared motion, heading-rhythm or glow rules. It should be, in the documented
order:

```
@import "tailwindcss" source("..");
@source "../../../../packages/web-shared";          /* already present at :3 — load-bearing */
@import "tw-animate-css";                           /* already present at :4 */
@import "@accounting-network/web-shared/design/globals-standard.css";   /* ADD */
:root { ... }
```

The glow rules key off four channel tokens whose CSS fallbacks are Property's emerald. Trade needs
all four declared, recomputed for orange:

```
--brand-glow:       249 115 22;    /* primary-500 */
--brand-glow-deep:  234 88 12;     /* primary-600 */
--brand-glow-edge:  251 146 60;    /* primary-400 */
--brand-glow-faint: 255 237 213;   /* primary-100 */
```

Derived shadows (same ramp positions, alphas unchanged from A.6):

```
rest:   0_6px_20px_-8px_rgba(234,88,12,0.28)
hover:  0_16px_32px_-12px_rgba(234,88,12,0.4)
peak:   0 0 0 3px rgba(249,115,22,0.22), 0 18px 40px -10px rgba(234,88,12,0.6)
        + border-color rgb(251 146 60)
```

These are necessarily byte-identical to generalist's (same ramp, same alphas). Carry generalist's
warning with them: **orange glow reads hotter than emerald at equal alpha**; if it reads hot at
390 / 768 / 1440, drop the card-glow alphas 0.28 / 0.4 → 0.22 / 0.32 as a recorded deviation.

Also note `tw-animate-css` is already a real dependency here, so Trade does not have the
Solicitors phantom-dependency defect — verify `package.json` lists it at QA.

### 6.9 File hygiene in `globals.css` (found while reading, all one-line fixes)

| line | problem |
|---|---|
| 1 | UTF-8 BOM (`efbbbf`) before the first comment |
| 7, 8 | mojibake em-dashes (`â€”`) in the header comment |
| 23 | `--accent-strong: #ea6c07; /* orange-600 */` — comment wrong, value off-ramp and failing (§3.1) |
| 31 | `--dark: #1e293b; /* slate-900 */` — comment wrong, value is slate-800 (§6.2) |
| 53-57 | `--chart-1..5` are four oranges plus one slate; a chart series of four near-identical oranges is not distinguishable. `:55` labels orange-300 "provisional tail", so one of them is carrying a semantic. Re-derive against the dataviz rules and the new `--warn-*` set in the research-pages pass. `:56` correctly calls `#1e293b` slate-800, which is the line that proves `:31` wrong. |
| 49 | `--muted: var(--ink-soft)` — a TEXT colour named like a surface (legacy, same as Property). Leave, but never use it as a ground. |
| — | `--success: #10b981` is emerald-500, i.e. Property's brand hue, and measures 2.07 as text on white. Retire or move to emerald-700 `#047857` (4.99). |

---

## 7. L.3 registry row and collision analysis

### 7.1 The row

| Site | Primary ramp | Approved |
|---|---|---|
| Property | emerald | live |
| generalist | orange | APPROVED 2026-09-09 |
| Solicitors | rose | PROPOSED 2026-09-10 |
| Medical | amber | PROPOSED 2026-09-10 |
| **construction-cis (Trade)** | **orange** | **PROPOSED 2026-09-11 (this file)** |

### 7.2 The primary-ramp collision, stated plainly

**Trade and generalist share the primary ramp family exactly, and not approximately:** both live
brands are `#f97316`, orange-500, so the two ramps are byte-identical from 50 to 950, as are the
four glow channel tokens and the `--btn-ground` trio.

This is **unavoidable** under the keep-default: both are incumbent live brands, both owners'
customers know that orange, and the owner's 2026-09-11 decision keeps Trade's. It is **not
precedent** for any future free ramp collision — the differentiation rule in §L.2 is "no two
ported sites share a primary ramp family *where avoidable*", and here it is not avoidable.

Compare the adjacency the estate has already accepted elsewhere: Medical's amber-700 `#b45309`
and generalist's orange-700 `#c2410c` are 23 RGB units apart and that was recorded as a noted
adjacency. Trade and generalist are **0 units apart**. There is no contrast argument that makes
that smaller; the separation has to come from somewhere else.

**How the two sites stay distinguishable.** Four layers, in descending strength:

| layer | generalist | Trade | separation |
|---|---|---|---|
| **warning ladder** | violet-700 / fuchsia-700 / red-600 / red-800 | **red-600 / pink-700 / blue-700 / indigo-900** | **3 of 4 steps differ; the shared step sits at a different position (1 vs 3)** |
| backdrop motif | ruled ledger grid (rectilinear only) | setting-out / scaffold grid (rectilinear + diagonal braces + dimension ticks) | different silhouette at a glance |
| wordmark | `Briefcase` + "HOLLOWAY DAVIES" / "ACCOUNTANTS" | `HardHat` + "TRADE TAX SPECIALISTS" / "CIS ACCOUNTANTS" | different mark, different name |
| neutral + dark ground | warm neutral, slate-900 | warm neutral, slate-900 | **no separation** — identical by recommendation |

The warning ladder is therefore doing most of the work, which is exactly why generalist's §5
instructed that it must differ, and why §4.5 rejects generalist's ladder outright rather than
trimming it. The neutral/dark row is honest: there is none, and that is the right trade (both
sites are orange over warm neutral; forcing one to slate would be differentiation for its own
sake and would fight the kit). **The two sites never appear together**, which is what makes the
whole arrangement tolerable — record it as a decision, not an oversight.

### 7.3 Warning-ladder differentiation across the estate

| site | ladder | shares with Trade |
|---|---|---|
| Property | amber-700 / orange-700 / red-600 / red-800 | red-600, at step 3 vs Trade's step 1 |
| generalist | violet-700 / fuchsia-700 / red-600 / red-800 | red-600, at step 3 vs Trade's step 1 |
| Solicitors | amber / orange / fuchsia / violet | nothing |
| Medical | red-600 / purple-700 / indigo-700 | red-600 at the same position (step 1), and the indigo FAMILY at a different step and step-number (Medical indigo-700 at step 3; Trade indigo-900 at step 4, 75.8 RGB units apart) |
| **Trade T-W1** | **red-600 / pink-700 / blue-700 / indigo-900** | — |

Trade is the only site whose ladder contains **pink** or **blue**, and those two steps are what
make it unmistakably Trade's. The shared red-600 is deliberate: it is the owner's instruction, it
is the only fully-saturated red in the ramp, and three sites using red for "a duty bites / no
relief" is consistency rather than collision.

Two honest adjacencies, quantified:

- **red-600 with Medical's step 1** — same hue, same position. Justified: the owner asked for red
  as the first step, and A.1's money semantics already put red at the sharp end estate-wide.
  Steps 2-4 then diverge completely (pink/blue/indigo-900 vs purple/indigo-700).
- **the indigo family with Medical** — Medical indigo-700 `#4338ca`, Trade indigo-900 `#312e81`,
  **75.8 RGB units**, different step numbers (3 vs 4) and different severity meanings
  (regulatory penalty vs criminal track). Larger than the 23-unit amber/orange adjacency the
  estate has already accepted, and larger than Medical's own 63.1-unit internal step separation.
  If the owner wants it gone, the alternative is purple-900 `#581c87` (10.88 on white), which
  trades an indigo adjacency for a purple one — no improvement. Recommend proceeding.

### 7.4 The estate-wide "red at the top" observation — it does not hold as written

The brief carries it as constraint 5: *"no site puts red at the top of its ladder."* Checked
against the three recorded ladders, **the sentence is not true of the estate under either reading
of "top"**:

- If "top" means the **most severe / last** step: Property ends at **red-800** and generalist ends
  at **red-800**. Two of four sites break it.
- If "top" means the **first / least severe** step (the top of the list as written): Medical's own
  M-W1 starts at **red-600**, in the same document that states the rule.

So it is self-contradicting as a description and cannot be satisfied as a rule. The defensible
reading — and the only one consistent with all four ladders — is the weaker claim it was probably
reaching for: **no site lets red carry the escalation on its own**; red occupies one step and the
escalation is carried by other hues and by direct labelling.

**T-W1 satisfies the defensible reading and the owner's stated intent together**: red occupies
exactly one step, it is the first step, the ladder does **not** end on red (unlike Property's and
generalist's), and the escalation past red is carried by pink, blue and indigo plus monotonic
darkening. Recommend the sentence be corrected in `docs/medical/DESIGN_DELTA.md` §5 to the
weaker claim rather than propagated further.

---

## 8. What the DESIGN_DELTA §1 block should say (condensed, for the orchestrator)

```
primary ramp:        orange — Tailwind 4 oklch verbatim (§1). #f97316 IS orange-500; it is
                     niche.config brand.primary_color; no snapping needed.
neutral ramp:        keep warm neutral (neutral-500 4.74 vs slate-500 4.76 = parity; warm is
                     chromatically correct under orange). Kit ships slate: accept the mix.
                     --ink-whisper #a3a3a3 (2.42, live FAIL) -> #737373.
dark ground:         slate-900 #0f172a. Today --dark: #1e293b is slate-800 and MISLABELLED
                     "slate-900"; the ground is written as a literal bg-[#1e293b] in 55 places
                     with 22 more bg-neutral-900 bands = two dark grounds, neither tokenised.
                     77-usage sweep. Kit navy components are unparameterised.
warning ramp:        OFF orange AND off amber (the brand IS orange-500; amber-800 is 8 RGB units
                     from orange-800). T-W1, 4 steps + on-dark twins:
                       1. a duty bites                 red-600    #dc2626 / red-400    #f87171
                       2. a charge arises              pink-700   #be185d / pink-400   #f472b6
                       3. penalty, status at risk      blue-700   #1d4ed8 / blue-400   #60a5fa
                       4. deliberate / criminal track  indigo-900 #312e81 / indigo-300 #a5b4fc
                     Generic tokens --warn-1..4 / --warn-n-on-dark. Plus --form-error red-700
                     #b91c1c (moved off red-600, which is now step 1).
                     Net-new system, near-zero sweep: 6 live amber usages, 5 of them decorative.
semantic overrides:  --accent stays #f97316, DEMOTED to non-text use.
                     --accent-strong #ea6c07 -> #c2410c (orange-700). The shipped value is NOT
                     orange-600 as its comment claims and measures 3.16 on white — a live
                     site-wide failure on every article link.
                     ADD --btn-ground #c2410c / --btn-ground-hover #9a3412 /
                     --btn-ground-active #7c2d12; --hero-cream #fafaf7; the four --brand-glow*
                     channels; --warn-* and --form-error.
                     .eyebrow colour -> --accent-strong (2.68 today, FAIL).
                     .section-label ground -> --btn-ground (2.80 today, FAIL, 38 usages).
                     --success #10b981 is Property's brand hue and 2.07 as text: retire.
font:                Geist Sans + Geist Mono KEPT (K default). @theme inline wiring already
                     correct. Changes: body line-height 1.7 -> 1.6; headings 600 -> 700;
                     heading line-height 1.1-inside-@layer-base -> 1.2 UNLAYERED (both value
                     and layer wrong today).
button constants:    A.5 box; colour tokens only. Local btnPrimary hard-codes bg-orange-500 =
                     white label 2.80 = LIVE WCAG FAILURE on every page (SiteHeader -> PageShell
                     -> layout.tsx). Ground -> primary-700 (5.18) via --btn-ground.
                     focusRing already outline-orange-600 (3.56, passes graphics) — keep.
                     btnOnDark = btnSecondary alias renders ink-on-navy: a live defect, replace
                     with the real A.5 recipe. btnOnTeal is a dead-brand fossil (ground is
                     neutral-900): rename.
radius:              --radius: 0rem already matches Property. --radius-xl and --btn-radius are
                     ABSENT, so rounded-xl renders Tailwind's 12px default today (NOT Medical's
                     0px defect). Importing globals-standard.css supplies
                     --radius-xl: calc(var(--radius) + 4px) = 4px and --btn-radius.
wordmark:            icon = HardHat (fallback Hammer); line1 "TRADE TAX SPECIALISTS";
                     line2 "CIS ACCOUNTANTS" (owner picks). Icon primary-600 on light /
                     primary-300 on navy; TEXT never orange.
backdrop motif:      setting-out / scaffold grid — vertical standards ~28px, ledger transoms
                     ~44px, 2-3 diagonal braces, dimension ticks. Navy stroke-primary-300 @ .18;
                     cream stroke-primary-600 @ .10. Property's E geometry. File
                     components/layout/TradeBackdrop.tsx. Site has no SVG backdrop today.
cream surface:       #fafaf7 (Trade's own, 7 usages; identical to generalist's; Property's
                     #fbfaf7 NOT synced). Tokenise as --hero-cream.
plumbing:            ADD @import "@accounting-network/web-shared/design/globals-standard.css"
                     after tw-animate-css, before :root. grep "web-shared/design" in src = 0
                     today. Strip the BOM at :1 and the mojibake at :7-8. Correct the wrong
                     comments at :23 and :31. Re-derive --chart-1..5 (four near-identical
                     oranges).
```

## 9. Sanctioned-deviation rows this working produces

| deviation | why |
|---|---|
| primary ramp family IDENTICAL to generalist's (both `#f97316`) | both incumbent live brands under the keep-default; unavoidable, not precedent; separation carried by the warning ladder, motif and wordmark |
| warm neutral text/hairlines retained while kit components ship slate | parity contrast, chromatically correct under orange, swap buys nothing |
| dark ground adopts slate-900 while text neutrals stay warm | kit navy components are unparameterised |
| `btnPrimary` ground shifts to primary-700 | white-on-orange fails 4.5:1 below the 700 step; L.2's prescribed remedy |
| duty/penalty ladder = red-600 / pink-700 / blue-700 / indigo-900 (on-dark red-400 / pink-400 / blue-400 / indigo-300) | brand is orange-500, so amber and orange are both unavailable; must differ from generalist's |
| step 4's on-dark twin is the **300** step, not the 400 | indigo-400 is only 41.4 RGB units from blue-400; indigo-300 restores 70.6 at 7.34:1 |
| ladder escalates by lightness, not by hue temperature | forced by putting red first (owner); same basis as Medical's approved M-W1, with direct labelling per DS §0.3 |
| cream surface `#fafaf7` vs Property's `#fbfaf7` | Trade's incumbent, 7 live usages |
| `--accent` retained at orange-500 but demoted to non-text use | owner keeps the brand hue; 2.80/2.68 makes it unusable as text |

## 10. Owner-input rows (appendix K) this working opens

| Input | Class | State 2026-09-11 |
|---|---|---|
| Brand colour ramp sign-off (orange, identical to generalist's) | BLOCKER | PROPOSED — needs the collision acknowledged explicitly, §7.2 |
| Warning ladder T-W1 sign-off | BLOCKER | PROPOSED |
| Step count (4, not 3) | BLOCKER | PROPOSED, evidenced from the site's own penalty content, §4.2 |
| `btnPrimary` ground → primary-700 | BLOCKER | PROPOSED — **fixes a live WCAG failure on every page**; recommend approving independently of the rest of the port |
| `--accent-strong` → orange-700 | BLOCKER | PROPOSED — **fixes a live site-wide failure on every article link** |
| Dark ground → slate-900 (77-usage sweep) | BLOCKER | PROPOSED |
| Wordmark icon (`HardHat`) | BLOCKER | PROPOSED |
| Wordmark line2 descriptor ("CIS ACCOUNTANTS") | BLOCKER | PROPOSED |
| Backdrop motif (scaffold grid) | BLOCKER | PROPOSED |
| Font change | BLOCKER | **NOT proposed** — Geist retained |
| Footer ground light → navy | BLOCKER | FLAGGED for the orchestrator's ground-oscillation pass, not decided here |
| Favicon set | COSMETIC | keep existing, never generate |
| Deploy approval | BLOCKER | owner-triggered, every time |

## 11. Open items this working could not settle

1. **`--chart-1..5`** are four near-identical oranges plus one slate, with `--chart-3` carrying a
   "provisional tail" semantic in its comment. A correct re-derivation needs the actual research
   chart series (how many categories, which ones are semantic) — that belongs with the agent doing
   the research pages, and should consult the `dataviz` rules.
2. **Usage counts per token** are deliberately out of scope here; the usages agent reports
   separately. The counts quoted above are only the ones load-bearing for a brand decision
   (button ground blast radius, sweep pricing, dark-ground sweep) and each carries its grep.
3. **Tick colour** is quoted at the kit's `tickClassName` contract (primary-600, 3.56, graphics
   floor). Trade has no `DrawnTickList` today, so there is no incumbent value to diff.
