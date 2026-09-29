# PHASE 1 — tokens and chrome — hospitality design port (build plan)

Read-only planning pass, 2026-09-29. Site `hospitality/web`, brand "Hospitality Tax",
brand hex `#b0532f`, Plus Jakarta Sans. Reference `Property/web`, kit
`packages/web-shared/design/`. Worked example: startups-tech phase 1 `6e02711e` plus its
U4 uplift foundations `f2f1f1ad`, reviewed in `docs/startups-tech/_port/R1_PHASE1_REVIEW.md`.

**Owner ruling 5 of 2026-09-29 (`docs/_engines/ESTATE_PARITY_HANDOFF_2026-09-29.md:176`):
the uplift is part of the port and is budgeted from the start.** The U4 foundations
(`globals-standard.css` + motion layer, `--radius`, the four `--brand-glow*` channels,
kit re-exports with rings wrapped, backdrop, one grey ramp) are therefore IN PHASE 1 here,
not deferred.

Working tree note: a phase 0 fix wave has 18 uncommitted files in this site. None touch
`globals.css`, `layout-utils.ts`, `layout.tsx`, `SiteHeaderWrap.tsx` or `SiteFooter.tsx`.
One file it DOES hold, `app/admin/analytics/login/page.tsx`, is named in P0-C as a phase-1
fix; it is deferred here for that reason (see P1-G).

---

## 0. REALITY CHECK PER SURFACE — what already satisfies the spec

Verified against source and the running pre-fix build on `:3202`. Do not invent work here.

| surface | state today | verified by | phase-1 work |
|---|---|---|---|
| Webfont | Plus Jakarta Sans genuinely loaded via `next/font/google`, `--font-sans` bound in `globals.css:26`. Gate row 3 non-empty. | `layout.tsx:2,17`; `globals.css:26` | NONE. Do not re-do. |
| Kit `SiteHeader` | already mounted through `components/layout/SiteHeaderWrap.tsx` (client wrapper, 28 lines, dated 2026-09-28). | `layout.tsx:9,103` | restyle/props only, see P1-C |
| `wordmarkAccentColor` | already passed, `niche.brand.primary_color` = `#b0532f`. | `SiteHeaderWrap.tsx:25` | keep; it becomes the declared 600 step, so the wordmark and the CTA stop being two different browns |
| Header CTA goal/placement | rendered DOM already emits `data-cta=header_book`, `placement=header`, `goal=form` on **all 59 routes**, 1 per route, href `/contact`. | `docs/hospitality/_port/cta_baseline.json` (`distinct_triples`, single entry, count 59) | pass `ctaContactGoal="form"` explicitly; drawer placement is the kit default `mobile_menu` and must be **measured in the shipped bundle**, not assumed |
| Header phone | the kit `SiteHeader` has **no phone prop of any kind** (`SiteHeaderProps`, `SiteHeader.tsx:48-103`), and `src` has zero `tel:` hrefs. | grep | NONE. The "no phone" ruling is satisfied structurally. |
| Skip link | absent site-wide. Kit `SiteHeader` does NOT render one; the kit **`PageShell`** does (`PageShell.tsx:34-40`). | grep "skip" in `SiteHeader.tsx` = 0 | ship `PageShell`, see P1-C |
| `<main id="main">` | present once in `layout.tsx:104`. The phase-0 wave removed the nested `<main>` from `/contact`, `/calculators`, `/blog`, `/thank-you`. | `git status`, `git show HEAD:` comparison | **3 nested `<main>` remain**, see False premise 2 |
| Logo asset | `public/brand/` does not exist; `niche.config.json brand.logo_path` `/brand/logo.png` is stale. The header already renders the kit TEXT lockup (`UtensilsCrossed` + "HOSPITALITY"/"TAX"). | `ls`, `SiteHeaderWrap.tsx:22-24` | no asset needed; owner question Q3 on the stale key |
| `prose-standard.css` | imported, 35 `.prose` selectors in the built CSS. Not the charities dead-class defect. | `globals.css:6`; P0-E §4 | KEEP the import unchanged |
| `.prose table` override | one deliberate unlayered rule, dated and commented 2026-09-28. | `globals.css:33-42` | KEEP unchanged |
| `--calc-result-accent` | already declared `#e1a58e` (8.48 on slate-900). | `globals.css:22` | KEEP. Do not delete, do not repoint. |
| `@source` for the kit | already present. | `globals.css:4` | KEEP; `globals-standard.css` requires it |
| Kit `Calculator` | already adopted on all 3 tools. | P0-E §8 | out of phase 1 |
| Grey ramps | two on one screen: `neutral-*` 23 files, `slate-*` 6 files. | P0-C | P1-D, scoped |
| `layout-utils.ts` | 100% hand-rolled fork, three literal hexes, `btnOnDark` aliased to `btnSecondary`. Gate row 1 = **0**. | `components/ui/layout-utils.ts` | P1-B |
| `@theme` ramp | absent. `bg-primary-50`/`text-primary-600`/`ring-primary-100` compile to **0 rules**, so the `LeadCTAPanel` badge is uncoloured on 4 pages. | P0-C | P1-A |
| `globals-standard.css` | NOT imported today. | `globals.css:1-6` | P1-A (U4) |
| Backdrop | none. Gate row 4 = **0**. | `ls components/layout/` | P1-E |
| Ring guard test | none. Gate row 8 = `walks=0 gtg=0`. | `ls src/tests` | P1-F |

### Gate §9.1 baseline, run on the current working tree (2026-09-29)

```
1  layout-utils  : 0
2  kit adopted   : 2 distinct / 5 call sites
2a kit declined  : 0 comment references naming a kit path
2b homepage mktg : adopted=0 declined=0
3  webfont       : next/font/google
4  backdrop      : 0
5  eyebrow ratio : Eyebrow=0 section-label=8
6  rings not the token: (empty)
7  gradient grounds to measure stop by stop:
     app/page.tsx
8  ring guard    : walks=0 guards-the-guard=0
markers: ping=0 stats=0 backdrop=0 rounded-full=0
```

Rows 1, 4 and 8 are blockers today and are closed by P1-B, P1-E and P1-F.
Row 6 empty is a pass, but note it is empty because every ring is a bracketed literal
(`outline-[#b0532f]`), which the row's regex cannot see — the R1 reviewer's S3 finding on
startups-tech, same shape. P1-F's guard must ban any bracketed outline value that is not
`var(--focus-ring)`.
Rows 2, 2a, 2b and 5 are phase 2-6 and uplift work, recorded here as the baseline.

---

## P1-A. TOKENS — `globals.css` and `layout.tsx` font/noscript

**Files (sole owner):** `hospitality/web/src/app/globals.css`,
`hospitality/web/src/app/layout.tsx`, `hospitality/web/package.json`,
root `package-lock.json`.
**Depends on:** nothing. **Runs first, alone.** Everything else reads its tokens.

### A1. The `@theme` brand ramp, `primary-50..950`

**Method, stated so it is reproducible and not "eyeballed":** the brand hex is not a
Tailwind step, so the ramp is derived the way charities derived its green
(`charities/web/src/app/globals.css:218-247`): convert `#b0532f` to OKLCH, **hold the hue
fixed at 40.9 degrees**, and walk lightness down the Tailwind 50..950 shape with chroma
scaled to stay in gamut. `#b0532f` = `oklch(55.2% 0.1314 40.86)` and lands exactly on the
600 step, unchanged, per owner ruling 1 (never shift a designer-set colour).

**The 700 and 800 steps are NOT derived: they are the site's own existing hover and active
hexes**, `#8f421f` and `#6e3118` from `layout-utils.ts:17`. Measured, they already sit on
the hue line at L 0.473 and L 0.392, i.e. they ARE a 700 and an 800 step. Adopting them
means the ramp introduces no new colour anywhere a visitor currently sees one.

Write this block, hex literals only here (the token sheet is the one place they are allowed):

```css
@theme {
  --color-primary-50:  #fff2eb;
  --color-primary-100: #ffe3d4;
  --color-primary-200: #ffc8b2;
  --color-primary-300: #fbab8e;
  --color-primary-400: #e58764;
  --color-primary-500: #c96945;
  --color-primary-600: #b0532f; /* THE BRAND HEX, unchanged. 5.09 on white */
  --color-primary-700: #8f421f; /* the site's existing hover. white label 7.08 */
  --color-primary-800: #6e3118; /* the site's existing active. white label 9.93 */
  --color-primary-900: #562512;
  --color-primary-950: #341306;
}
```

Measured ratios, to be repeated in the file as a comment (sRGB, white `#ffffff`,
slate-900 `#0f172a`):

| step | hex | on white | on slate-900 |
|---|---|---|---|
| 300 | `#fbab8e` | 1.86 | 9.62 |
| 400 | `#e58764` | 2.63 | 6.78 |
| 500 | `#c96945` | 3.76 | 4.75 |
| 600 | `#b0532f` | 5.09 | 3.51 |
| 700 | `#8f421f` | 7.08 | 2.52 |
| 800 | `#6e3118` | 9.93 | 1.80 |

### A2. `--brand-primary`, and the item-11 contrast question answered

Playbook §8 item 11: **one ratio, three verdicts.** `#b0532f` measures **5.09:1** against
white. Verdicts:

- 3:1 graphic floor — **PASS** (5.09)
- 4.5:1 text-on-white floor — **PASS** (5.09)
- 4.5:1 ground-under-white-text floor — **PASS** (5.09; white on `#b0532f` is the same pair)

**Therefore `--brand-primary-text` and `--brand-primary-ground` are NOT declared.** One
brand value carries all three roles, same outcome as startups-tech's indigo and charities'
green, not the Medical copper case. Write that reasoning in the file so the next agent does
not add them.

The separate slate-900 figure is a different question and already answered:
`#b0532f` on slate-900 is **3.51**, which clears the 3:1 graphic floor and **FAILS** the
4.5 text floor. That is exactly the surface `--calc-result-accent` exists for and it is
already declared at `#e1a58e` (8.48). **Keep the line as it is.** The same fact governs any
brand-coloured TEXT a later phase puts on a dark ground: it must use the 300/400 step, not
the brand hex.

Keep unchanged: `--brand-primary: #b0532f`, `--brand-primary-strong: #b0532f`,
`--brand-on-primary: #ffffff`, `--font-sans`, `--background`, `--surface`,
`--surface-elevated`, `--ink`, `--ink-soft`, `--muted`, `--border`.

### A3. Button ground trio

```css
--btn-ground: #b0532f;        /* 600. white label 5.09, PASS */
--btn-ground-hover: #8f421f;  /* 700. 7.08 */
--btn-ground-active: #6e3118; /* 800. 9.93 */
```

**Buttons stay on the 600 step here**, unlike startups-tech (700) and Medical (shifted
because copper failed at 4.5). The shift-to-700 rule only bites when the 600 step fails the
white-label floor; `#b0532f` passes at 5.09, and shifting would change a colour the owner's
designer set on every button on the live site. State that reason in the file.

### A4. Focus ring

```css
--focus-ring: var(--color-primary-600);  /* 5.09 on white */
--kit-focus-ring: var(--color-primary-600);
```

Single-valued for now, and this is a **deliberate, measured** decision to be written in the
file: gate row 7 lists exactly one gradient file, `app/page.tsx`, and every ground phase 1
itself paints (header white, footer `#fafaf9`/`neutral-50`, page body white) is light.
`#b0532f` on `#fafaf9` measures 4.96, past the 3:1 graphic floor.

**Declare the two-valued mechanism anyway and wire nothing to it**, the shape the kit's own
comment asks for (`packages/web-shared/design/layout-utils.ts:20-48`):

```css
--focus-ring-on-light: var(--color-primary-600);
--focus-ring-on-brand: #ffffff;
```

and inside `@layer components` a `.ground-dark { --focus-ring: var(--focus-ring-on-brand);
--kit-focus-ring: var(--focus-ring-on-brand); }`.

**R1's blocker B1 and serious S2 both came from declaring this and never mounting it.** So
the rule for this port, written into the file as a comment addressed to phases 2-6: any
section that paints a dark ground carries `.ground-dark`, and **the phase that paints the
ground owns the class**. If P1-C's footer keeps a dark ground, P1-C mounts it and measures
it. `--kit-focus-ring` must NOT be written as `var(--focus-ring)`: a custom property whose
value is a var() reference resolves at computed-value time on the declaring element and
would freeze at the light value (startups-tech `globals.css`, same comment).

### A5. `globals-standard.css` import and the motion layer (U4 foundation)

Import order, exactly as `globals-standard.css:11-18` specifies:

```css
@import "tailwindcss" source("..");          /* keep */
@source "../../../../packages/web-shared";   /* keep, MANDATORY */
@import "tw-animate-css";                    /* NEW */
@import "@accounting-network/web-shared/design/globals-standard.css";  /* NEW */
@import "../../../../packages/site-styles/prose-standard.css";  /* keep */
```

`tw-animate-css` is a new dependency and is **not** bundled by the standard sheet
(`globals-standard.css:23`). Add it to `hospitality/web/package.json` and run
`python scripts/check_dependency_closure.py`. `@radix-ui/react-accordion` is NOT needed in
phase 1 (no `FaqSection` adoption here); leave it to the phase that adopts it.

**What the import pulls in**, read from the file, to be reproduced as a table at the top of
`globals.css` the way `f2f1f1ad` did:

| name | kind | line | purpose |
|---|---|---|---|
| `--radius-sm/md/lg/xl`, `--btn-radius` | `@theme` | :37-42 | derived by `calc()` from `--radius` |
| `h1..h6` weight + tracking | `@layer base` | :74-84 | house heading defaults |
| `h1..h6` line-height | **unlayered**, deliberate | :81 | the 1.2 house rhythm; do not layer it |
| `@keyframes fadeInUp`, `.hero-reveal`, `.hero-reveal-delay` | keyframe + classes | :85-109 | hero entrance |
| `@keyframes marquee-y`, `.marquee-track`, `.marquee-viewport` | keyframe + classes | :110-128 | vertical marquee |
| `@keyframes num-glow` | keyframe | :141-166 | stat figure light-up, reads `--brand-glow` |
| `@keyframes card-glow`, `[data-glow="on"] > *` + nth-child 2/3/4 | keyframe + attr rules | :168-225 | `ScrollGlowGroup` stagger, reads `--brand-glow*` |
| `.related-card`, `:hover`, `:focus-within` | classes | :227-255 | related-article glow |
| `.eyebrow-rule`, `[data-draw="off"]` | class | :265-280 | eyebrow mark draw-in |
| `.tick-draw`, `[data-draw="off"] .tick-draw` | class | :286-295 | deliverables tick draw-in |
| `prefers-reduced-motion` guards | media | :129-140, :185, :250, :269, :286 | every motion rule is gated |

### A6. `--radius` and the four glow channels (the trap that bit on 09-29)

`globals-standard.css` derives `--radius-sm/md/lg/xl` and `--btn-radius` from `--radius`
with `calc()`. **Undeclared, every one of those calcs is invalid and the kit buttons fall
back to a 9999px pill** (the generalist port shipped that defect; see
`Medical/web/src/app/globals.css:93-98`). Declare:

```css
--radius: 0rem;   /* same house value as generalist:71, Medical:98, startups-tech:111 */
```

`0rem` is correct for this site: its current buttons are square (`layout-utils.ts` carries
no `rounded-*` class at all), so `0rem` preserves the shipped shape exactly. Note that
adopting the kit `btnPrimary` in P1-B brings `rounded-xl` = `calc(0rem + 4px)` = 4px, which
is a small, deliberate shape change — declare it in the receipt rather than letting it ride
silently (R1 minor 6 on startups-tech).

The four glow channels, in the brand hue, as `R G B` triplets (the kit's
`rgb(var(--token) / alpha)` syntax cannot take a hex custom property), each a step already
declared in A1 so no new colour enters:

```css
--brand-glow:       201 105  69;  /* primary-500 #c96945 */
--brand-glow-deep:  176  83  47;  /* primary-600 #b0532f, the brand hex */
--brand-glow-edge:  229 135 100;  /* primary-400 #e58764 */
--brand-glow-faint: 255 227 212;  /* primary-100 #ffe3d4 */
```

**Acceptance for the "no Property emerald leaks" claim, and it must be run, not asserted:**
`grep -c "16 185 129" packages/web-shared/design/globals-standard.css` = 3, all three inside
`var(--brand-glow, 16 185 129)` fallback positions, unreachable once the token is declared.
Prove it in the built CSS after the build: `grep -o "16 185 129" <built css> | wc -l` = 0.

### A7. The `<noscript>` release

`.eyebrow-rule[data-draw="off"]` and `[data-draw="off"] .tick-draw` ship a COLLAPSED state
in the server HTML with no `(scripting: enabled)` guard. Without JS the observer never
flips the attribute and the marks stay invisible — the defect that left 64 pages on a
sibling site with invisible marks. Add to `layout.tsx`, **inside `<body>`** (React cannot
render `<noscript>` as a direct child of `<html>`), copying `f2f1f1ad`:

```jsx
<noscript>
  <style>{`.eyebrow-rule[data-draw="off"] { transform: none; }
    [data-draw="off"] .tick-draw { stroke-dashoffset: 0; }`}</style>
</noscript>
```

### A8. Mono face — MEASURE, then pick

`font-mono` is used **36 times** in `hospitality/web/src` (including
`components/layout/SiteFooter.tsx:32`, the footer legal-name eyebrow) and by four kit
components (`StatsCounter:119`, `Calculator:168`, `WhyUsList:56`, `ProcessTimeline:117`).
With no `--font-mono` alias it resolves to Tailwind's stock `ui-monospace`.

The site's face is Plus Jakarta Sans, not Geist, so **GeistMono is NOT automatically the
answer here** and importing it would add a second type family the designer did not pick.
Two options, both legitimate:
(a) alias `--font-mono` to an explicit stack in `@theme inline` and load nothing new;
(b) drop the `font-mono` class from the site's own 36 usages.
**Recommendation: (a), no new webfont.** Declare
`--font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace;` in `@theme inline`
so the stack is stated and stops being an accident, and raise the "should the estate mono
face be loaded here" question to the owner (Q5). Do not silently add GeistMono.

### A9. Warning ramp semantics

**Never amber or orange for warning / duty / deadline / penalty on this site.** The brand
family IS the orange-brown range (`#b0532f`, hue 41), so an amber or orange warning chip
reads as brand decoration, which is the exact reason Medical banned it
(`Medical/web/src/app/globals.css:121-125`). **Use the `rose`/`red` family for
warning-and-penalty and `sky` for informational notes**, and declare the semantic tokens
here so phases 2-6 have somewhere to point. Phase 1 declares them; it mounts none.

### A10. Keep untouched

`--calc-result-accent`, the `.prose table:not(.not-prose *)` rule, the `@source` line, the
`prose-standard.css` import, `--font-sans`, and every existing `:root` value above.

**Acceptance tests (P1-A):**
```bash
npx tsc --noEmit                       # expect: no output
grep -c "color-primary-600" hospitality/web/src/app/globals.css        # expect: 1
grep -n "radius: 0rem\|brand-glow" hospitality/web/src/app/globals.css # expect: 5 lines
grep -c "brand-primary-text\|brand-primary-ground" hospitality/web/src/app/globals.css  # expect: 0 declarations (comment-only mentions allowed)
python scripts/check_dependency_closure.py                             # expect: PASS
```
After the manager's single build:
```bash
grep -o "bg-primary-50\|text-primary-600\|ring-primary-100" hospitality/web/.next/static/css/*.css | wc -l   # expect: >0 (was 0/0/0)
grep -o "16 185 129" hospitality/web/.next/static/css/*.css | wc -l                                          # expect: 0
grep -o "9999px" hospitality/web/.next/static/css/*.css | wc -l                                              # record; must not be a button radius
```

---

## P1-B. LAYOUT-UTILS — re-point the fork to the kit

**File (sole owner):** `hospitality/web/src/components/ui/layout-utils.ts`.
**Depends on:** P1-A (the ramp and `--focus-ring` must exist first).

### What the site actually imports, measured

`grep -rn 'from "@/components/ui/layout-utils"' hospitality/web/src` returns **17 files**.
Symbol usage across `src` excluding the module itself:

| export | consumers | kit has it | disposition |
|---|---|---|---|
| `siteContainerLg` | 49 | yes | **re-export** |
| `btnPrimary` | 22 | yes (`btnPrimary`, from `btnPrimaryBase`) | **local, ring wrapped** |
| `focusRing` | 13 | yes | **local, points at `--focus-ring`** |
| `contentNarrow` | 8 | yes | **re-export** |
| `sectionY` | 8 | yes | **re-export** (see rhythm note) |
| `sectionYLoose` | 2 | yes | **re-export** (see rhythm note) |
| `btnSecondary` | 1 | yes | **local, ring wrapped** |
| `siteContainer` | 0 | yes | **re-export** (U4 restores it; the backdrop/hero work creates consumers) |
| `btnOnDark` | 0 | yes | **re-export wrapped**; today it is `= btnSecondary`, which is a real defect (P0-C): a `neutral-900` border and text on a dark ground |
| `btnOnTeal` | 0 | no kit equivalent | **DELETE**. Zero consumers and the name is from another site's palette. |
| `linkArrow` | 0 | no kit equivalent | **DELETE**. Zero consumers. |

Kit also offers `siteContainerXl`, `heroCreamSurface`, `btnOnCream`, `btnPrimaryBase` —
none needed in phase 1, do not re-export what has no consumer.

### The rhythm change, which must be declared not smuggled

Local `sectionY` is `py-16 sm:py-20 lg:py-28`; the kit's is `py-12 sm:py-16 md:py-20`.
Local `sectionYLoose` is `py-20 sm:py-28 lg:py-36`; the kit's is
`py-16 sm:py-20 md:py-24 lg:py-28`. Adopting the kit tightens vertical rhythm on 10 call
sites. **Adopt it** — the Property standard rhythm is the point of the port — and say so in
the receipt, with the same wording startups-tech used
(`startups-tech/web/src/components/ui/layout-utils.ts:26-33`).

### `focusRing` wrapping, so every button carries the ring

The kit's `focusRing` reads `var(--kit-focus-ring, var(--color-primary-600))`; the kit's
`btnPrimaryBase`, `btnSecondary` and `btnOnDark` each hardcode a literal
`focus-visible:outline-primary-600` / `-primary-400` that a call site cannot override.
Keep ONE mechanism and one grep: every recipe in this file ends in
`focus-visible:outline-[var(--focus-ring)]`.

- `focusRing` — local string, `...outline-[var(--focus-ring)]`. Write the decline comment
  naming `packages/web-shared/design/layout-utils.ts:50` (row 2a counts the FILE PATH, not
  the component name).
- `btnPrimary` — local, every character the kit's except the literal ring, which becomes
  `var(--focus-ring)`. Ground tokens come from A3.
- `btnSecondary`, `btnOnDark` — same treatment. Measure `btnOnDark`'s kit ring
  (`outline-primary-400` = `#e58764`) against whatever ground it is first mounted on and
  record the row; it is not mounted in phase 1, so the measurement belongs to the phase that
  mounts it, and the comment must say so rather than claim a figure nobody took.
- **No literal hex survives in this file.** `#b0532f`, `#8f421f`, `#6e3118` all go.

**Acceptance tests (P1-B):**
```bash
grep -c 'web-shared/design/layout-utils' hospitality/web/src/components/ui/layout-utils.ts   # gate row 1, expect >= 2
grep -coE '#[0-9a-fA-F]{3,8}' hospitality/web/src/components/ui/layout-utils.ts              # expect: 0
grep -c 'outline-\[var(--focus-ring)\]' hospitality/web/src/components/ui/layout-utils.ts    # expect: 4
grep -rn 'btnOnTeal\|linkArrow' hospitality/web/src                                          # expect: no hits
npx tsc --noEmit                                                                             # expect: no output
```

---

## P1-C. CHROME — `PageShell`, kit `SiteFooter`, landmarks

**Files (sole owner):** `hospitality/web/src/app/layout.tsx` (chrome region only; P1-A owns
the `<noscript>` and the font import — **serialise, P1-A first**), NEW
`hospitality/web/src/components/layout/PageShell.tsx`, DELETE
`hospitality/web/src/components/layout/SiteHeaderWrap.tsx` and
`hospitality/web/src/components/layout/SiteFooter.tsx`, and the three research page files
named in C4.
**Depends on:** P1-A, P1-B, P1-E (needs `HospitalityBackdrop` to pass into the footer slot).

### C1. Adopt the kit `PageShell`, retire the header wrapper

`packages/web-shared/design/chrome/PageShell.tsx` gives, in one component: the skip link
(`:34-40`, the site has none today), a single `<main id="main" className="flex-1
scroll-mt-24">`, the `/embed/` chrome bypass (`:28-30` — this site has `/embed/[slug]` and
`/research/hospitality-openings-closures-index/embed`, both of which must stay chrome-free),
and one `nav` list forwarded to both header and footer so they cannot drift.

`SiteHeaderWrap.tsx` is superseded: `PageShell.tsx` is the same client wrapper doing more.
Move its four wordmark values across verbatim and delete it. Shape the new file on
`startups-tech/web/src/components/layout/PageShell.tsx` (its header block is at :57-80).

**Header props to pass:**

| prop | value | source |
|---|---|---|
| `nav` | the 7 `niche.navigation` items, built **server-side in `layout.tsx`** and passed as plain data | `hospitality/niche.config.json navigation`; all 7 hrefs probed 200 (P0-E) |
| `ctaPrimary` | `{ label: "Get in touch", href: "/contact" }` | `niche.cta.sticky_button`, unchanged from `SiteHeaderWrap.tsx:21` |
| `ctaContactGoal` | `"form"` | `cta_baseline.json`: the single distinct triple on all 59 routes is `header_book\|header\|form`. Same as the kit default; **pass it explicitly** so the live series cannot be split silently (playbook §8 item 11). |
| `ctaMobilePlacement` | `"mobile_menu"` | kit default. The drawer renders only when open, so no SSR crawl sees it; **verify in the shipped client bundle**, per §8 item 11 and R1's method. |
| `ctaSecondary` | not passed | `niche.cta.sticky_primary` is a sentence, not a button label; no second header CTA exists today and adding one is a CTA change, not a port. |
| `ctaVariant` | not passed | `niche.config.json` declares no `cta.variant`. Record it (R1 minor 4). |
| phone | **no such prop exists** on `SiteHeaderProps` | ruling satisfied structurally; see False premise 4 |
| `wordmarkIcon` | `UtensilsCrossed` (lucide, `lucide-react ^1.17.0` is a declared dep) | `SiteHeaderWrap.tsx:3` |
| `wordmarkTop` / `wordmarkBottom` | `"HOSPITALITY"` / `"TAX"` | `SiteHeaderWrap.tsx:22-24`. Replace the `split(" ")` derivation with the two literals: it is the same output and it stops a display-name edit silently renaming the wordmark. |
| `wordmarkAccentColor` | `niche.brand.primary_color` `#b0532f` | keep. After P1-A it equals `--color-primary-600`, so the wordmark and the CTA finally read as the same brown. |

**Nav data note, verify before wiring:** `niche.navigation` labels are raw route names
("For", not "Who we help"). Wiring them changes what the header SAYS on every page. That is
a copy change, not a chrome change — **ship the labels as they are** and raise the wording
as owner question Q4. Do not author new nav labels in this phase.

### C2. Adopt the kit `SiteFooter`, delete the local one

`hospitality/web/src/components/layout/SiteFooter.tsx` (86 lines) hand-rolls everything and
imports nothing from the kit. All props resolve:

| prop | value | check |
|---|---|---|
| `nav` | forwarded by `PageShell` | — |
| `description` | `siteConfig.description` | — |
| `footerLinks` | `siteConfig.footer` (5 items) | all 5 probed 200 (P0-E) |
| `legalDisclosure` | `siteConfig.company.legalDisclosure` | built in `config/site.ts:37-41` |
| `legalName` / `tradingName` | `siteConfig.company.legalName` / `.tradingName` | — |
| `wordmarkIcon/Top/Bottom` | same three as the header | — |
| `resourcesHref` | **must be passed.** Kit default is `"/landlord-tax"`, which 404s here. | owner question Q1; recommendation below |
| `companyItems` | `[{About,/about},{Contact,/contact},{Privacy Policy,/privacy-policy},{Terms,/terms},{Cookie Policy,/cookie-policy}]` | kit default includes `/locations`, which 404s here (`niche.config.json locations: []`). **Probe every href you pass.** |
| `showBuilderCredit` | `true` (the default; pass nothing) | owner standing rule 2026-09-11, estate-wide |
| `backdrop` | `<HospitalityBackdrop />` from P1-E | kit slot, same contract as Property's `HeroBrickBackdrop` |
| `consentToggle` | the existing `<ConsentToggle />`, restyled for the footer ground | keep the component, it is site-local and works |
| `newsletterSlot` | not passed | owner ruling: no newsletter |

**`resourcesHref` recommendation: `/research`.** It is a real 200 route, it is the one hub
whose children are genuinely reference material, and `/blog` already has its own nav entry.
Owner confirms (Q1).

**The "Editorial content only" line.** Source truth: it is LIVE at
`components/layout/SiteFooter.tsx:74` ("Specialist hospitality accountants. Editorial
content only. Contact us for advice specific to your business."). Property's own footer has
no such line (`Property/web/src/components/layout/SiteFooter.tsx:143-152` is disclosure,
copyright, consent toggle and nothing else) and the kit `SiteFooter` has **no slot for it**,
so adopting the kit drops it mechanically. `docs/hospitality/PHASE0_2026-09-28.md:17` claims
it was already replaced; `P0A_CLAIMS_LEDGER.md:243-247` records that it was not, and
`PHASE0_RECHECK_2026-09-29.md:89` confirms it is back deliberately under the wording
reversal. **Recommendation: let it drop.** It is a disclaimer that the site does not advise,
sitting under a site that sells accountancy services, which is the same thing the
2026-09-28 estate-claims reversal removed everywhere else, and both Property and the kit
answer the question by not having the line. **Owner question Q2 all the same, because it is
a copy deletion on 59 pages and existing prose is not rewritten without a ruling.**

The `UnionJack` banner strip is site-authored and specific (a British-flag rule with its own
sentence). It is **not** a generic backdrop and it does not fit the kit's `backdrop` slot,
which paints behind the whole footer. **Keep it as a site-local strip rendered immediately
above `<PageShell>`'s footer**, or drop it — this is the one genuine "the site has something
Property does not" item; raise as owner question Q6 and default to KEEPING it.

### C3. `<main>` and the skip link

`PageShell` supplies both. Remove `<main id="main">` from `layout.tsx:104` in the same edit
that mounts `PageShell`, so there is never a moment with two.

### C4. The three nested `<main>` that are still live

`P0E_STRUCTURAL_INVENTORY.md` §2 reports research pages at `<main>` = 0 on all four. **That
is wrong.** Three of them carry their own `<main>` at HEAD and in the working tree:

- `app/research/hospitality-openings-closures-index/page.tsx:94`
- `app/research/uk-hospitality-food-hygiene-map/page.tsx:158`
- `app/research/uk-hospitality-insolvency-index/page.tsx:171`

Confirmed live: `curl -s :3202/research/uk-hospitality-insolvency-index | grep -o "<main" |
wc -l` = **2**. Swap each inner `<main>` to a `<div>`, byte-identical class and attribute
list, and prove it with `git diff -U0` the way R1 verified startups-tech's 15 swaps.
`/research` itself has none and needs no edit.

**Acceptance tests (P1-C):**
```bash
grep -rn "<main" hospitality/web/src --include=*.tsx        # expect: 0 hits (PageShell owns it)
grep -rn "SiteHeaderWrap\|components/layout/SiteFooter" hospitality/web/src   # expect: 0 hits
git diff -U0 -- hospitality/web/src/app/research | grep -E '^[+-].*<(main|div)'  # expect: only the tag changes
```
After the build, on the manager's `next start`:
```bash
for r in / /research /research/uk-hospitality-insolvency-index /contact /blog; do
  echo -n "$r main="; curl -s localhost:PORT$r | grep -o "<main" | wc -l; done   # expect: 1 each
curl -s localhost:PORT/ | grep -c 'href="#main"'                                  # expect: 1
curl -s localhost:PORT/embed/food-drink-vat-rate-checker | grep -c "<header\|<footer"  # expect: 0
```
Every chrome href probed for 200, and the header CTA's `data-cta`/`goal`/`placement` triple
re-read from the rendered DOM and diffed against `cta_baseline.json` (expect: unchanged,
`header_book|header|form`, 1 per route).

---

## P1-D. GREY RAMP — `neutral-*` to `slate-*`, scoped

**Depends on:** nothing; but each file is owned by exactly one phase, so there is no
concurrency risk if the split below is respected.

The kit paints `slate-*`. 23 files carry `neutral-*`, 6 carry `slate-*`. Mapping is
mechanical and one-to-one, **same numeric step**:

`neutral-50→slate-50`, `100→100`, `200→200`, `300→300`, `400→400`, `500→500`, `600→600`,
`700→700`, `800→800`, `900→900`.

**Exceptions to check before replacing, not after:** the only warm-neutral surfaces on this
site are `bg-[#fafaf9]` and `bg-neutral-50` in the footer strip. `#fafaf9` is a literal, not
a `neutral-*` class, so it is untouched by the sweep; if a builder wants the warm off-white
kept anywhere, it must be declared as a token in `globals.css`, never re-introduced as a
`neutral-*` class. No other semantic warmth was found: every remaining `neutral-*` is body
copy, a border or a heading.

### Ownership split. Phase 1 takes only what it already owns.

| phase | files | `neutral-*` hits |
|---|---|---|
| **P1 (here)** | `components/ui/layout-utils.ts` (3), `components/layout/SiteFooter.tsx` (13, deleted outright by P1-C), `app/error.tsx` (4), `app/not-found.tsx` (2) | 22 |
| **P2 blog** | `app/blog/page.tsx` (5), `app/blog/[category]/page.tsx` (4), `app/blog/[category]/[slug]/page.tsx` (10) | 19 |
| **P3 templates and hubs** | `app/services/page.tsx` (8), `app/services/[slug]/page.tsx` (18), `app/for/page.tsx` (5), `app/for/[slug]/page.tsx` (18) | 49 |
| **P4 calculators** | none | 0 |
| **P5 homepage** | `app/page.tsx` (55) | 55 |
| **P6 the rest** | `app/about` (3), `app/contact` (2), `app/cookie-policy` (12), `app/privacy-policy` (14), `app/terms` (16), `app/thank-you` (11), `app/book` (4), `app/complete` (9), `components/forms/LeadForm.tsx` (10), `components/forms/DetailsForm.tsx` (10), `components/forms/BookingPicker.tsx` (10) | 101 |

Total 246 hits across 23 files. `error.tsx` and `not-found.tsx` sit in phase 1 because no
later phase owns them. **The three `components/forms/*` files go to P6 with the surfaces
that mount them** — putting them in phase 1 would give phase 1 a lease on files every other
phase renders.

Each phase asserts `grep -c "neutral-" <its files>` = 0 at its own close, and phase 6
asserts it site-wide.

**Acceptance test (P1-D, phase-1 slice only):**
```bash
grep -rn "neutral-" hospitality/web/src/components/ui/layout-utils.ts \
  hospitality/web/src/app/error.tsx hospitality/web/src/app/not-found.tsx \
  hospitality/web/src/components/layout/   # expect: no hits
```

---

## P1-E. BACKDROP — `HospitalityBackdrop`

**File (sole owner):** NEW
`hospitality/web/src/components/layout/HospitalityBackdrop.tsx`.
**Depends on:** P1-A (for the ramp step it names in its comment). **Blocks P1-C** (the
footer `backdrop` slot).

Port `startups-tech/web/src/components/layout/StartupsBackdrop.tsx` (113 lines). Take its
MECHANISM verbatim, its subject not at all:

- `patternUnits="userSpaceOnUse"` painted into a `width="100%" height="100%"` rect, **no
  `viewBox`, no `preserveAspectRatio="slice"`**. The fixed-viewBox shape (generalist's) is
  what produces horizontal overflow and a phase-1 brief has recommended copying it before.
- `patternId` as a prop with a default, because a DOM id must be unique per document.
- `aria-hidden="true"`, `pointer-events-none`, `absolute inset-y-0 right-0 w-[55%]`,
  `hidden sm:block`, `opacity 0.1`, left-fading `maskImage`.
- No JS, no animation, no dependency, no data URI. Identical server and client.
- Host contract, stated in the file: the parent section must be `relative overflow-hidden`
  and its content `relative z-10`.

**Colour:** the `primary-400` step `#e58764`, written as a LITERAL, not
`var(--color-primary-400)` — an undefined custom property invalidates the whole declaration
and the element then paints nothing with every test still green, and the Tailwind v4 ramp
emits oklch rather than the sRGB the ratios were measured on. This introduces no new colour;
it is a declared step of A1. The brand hex `#b0532f` is NOT used: on a dark ground it reads
as dirt rather than motif.

**Subject:** hospitality's own. A repeating service-pass / table-and-cover rhythm, or a
simple bar-and-counter rule — a sober repeating structure, not glyphs. Chef hats, cocktail
glasses and cutlery clip-art are rejected for the same reason startups-tech rejected rockets.
The wordmark already carries `UtensilsCrossed`; the backdrop must not repeat it.

**Contrast rows, one per ground it is mounted on, written into the file.** Phase 1 mounts it
on the footer ground only, so phase 1 writes exactly one row and later phases add theirs.
Measure the bare ground and the ground composited with 0.10 of `#e58764`, against white and
against `text-slate-300` `#cbd5e1`.

**Acceptance tests (P1-E):**
```bash
ls hospitality/web/src/components/layout/ | grep -ci backdrop    # gate row 4, expect: 1
grep -c "viewBox" hospitality/web/src/components/layout/HospitalityBackdrop.tsx   # expect: 0
```
Rendered, at 390: `document.documentElement.scrollWidth === clientWidth`.

---

## P1-F. RING GUARD TEST

**File (sole owner):** NEW `hospitality/web/src/tests/focus-ring.test.ts`.
**Depends on:** P1-B.

Copy the SHAPE of `contractors-ir35/web/src/tests/focus-ring.test.ts` (named by the playbook
as the one to copy) with R1's S3 correction already applied:

- A `readdirSync` walk that enumerates every `.tsx` under `src` programmatically, excluding
  `src/app/admin`. Do not pin the five shared recipes; that is the defect that let 29
  hand-rolled rings through on contractors-ir35.
- An assertion that the walk found the corpus (`corpus.length > 25`), so the guard guards
  the guard. The assertion message must contain the literal string `guards the guard` (that
  is what gate row 8 greps for).
- **Ban any `focus-visible:outline-[` whose bracketed value is not `var(--focus-ring)`**,
  and any bare `focus-visible:outline-primary-`. A regex that only bans the latter is what
  let four startups-tech forms through.
- **Prove the guard bites**: reintroduce `outline-[#b0532f]` in a scratch string and watch
  it fail, then remove it. Report that you did.
- Write no sentence in the file that you have not measured. R1's S3 was a true-sounding
  comment that was false.

**Acceptance test (P1-F):**
```bash
npm test --workspace=hospitality/web     # expect: all pass, count reported
grep -rl 'readdirSync' hospitality/web/src/tests | wc -l          # expect: 1
grep -rl 'guards the guard' hospitality/web/src/tests | wc -l     # expect: 1
```

---

## P1-G. DEFERRED, on purpose — state it, do not do it

- **`app/admin/analytics/login/page.tsx:39`** (`focus:outline-none` with no compensating
  ring) is the one genuine ring-defeat P0-C found. It is **uncommitted in another agent's
  working tree right now**. Defer to the phase-0 wave's close or to phase 6; do not open the
  file. Record it so it is not lost.
- `app/error.tsx:47` and `components/forms/LeadForm.tsx:322` `outline-none` are NOT defects
  (compensating ring; `tabIndex={-1}` programmatic-focus heading). Do not "fix" them.
- The 8 `section-label` call sites on the homepage become `<Eyebrow>` in **phase 5**, which
  owns `app/page.tsx`. Gate row 5 stays 0/8 at phase-1 close and that is expected.
- `MiniCapture` fork-vs-shared, `BookingPicker`/`DetailsForm` vs kit `leads/capture-steps`:
  unresolved in P0-E, and they are form files, not chrome. Phase 6.
- The 3 dead calculator links on `app/page.tsx:235-237` and
  `data/hospitality-services.ts:224`: phase-0 defect, another agent's file.

---

## VERIFICATION LIST FOR THE PHASE-1 CLOSE

Run in this order. Every row needs a decisive output line in the receipt, not a verdict.

1. `npx tsc --noEmit` — expect no output.
2. `npm test --workspace=hospitality/web` — expect all pass; report N/N (baseline: 6 test
   files, `vitest run`).
3. **Kit-adoption gate §9.1, the block as written in the playbook**, re-run and diffed
   against the baseline printed in §0 above. Expected at close: row 1 `>= 2` (was 0),
   row 3 non-empty (unchanged), row 4 `1` (was 0), row 8 `walks=1 guards-the-guard=1`
   (was 0/0), row 6 empty or every printed line reasoned at that line, row 7 still
   `app/page.tsx` with each gradient stop measured. Rows 2, 2a, 2b, 5 are phase 2-6 work;
   report them, do not chase them.
4. Grep proofs:
   ```bash
   grep -rn "neutral-" hospitality/web/src/components/ hospitality/web/src/app/error.tsx \
     hospitality/web/src/app/not-found.tsx                       # expect: no hits
   grep -roE "#[0-9a-fA-F]{3,8}" hospitality/web/src/components/ui/layout-utils.ts \
     hospitality/web/src/components/layout/PageShell.tsx | wc -l  # expect: 0
   grep -rn "outline-none" hospitality/web/src --include=*.tsx    # expect: the 3 known, unchanged
   grep -c "radius: 0rem" hospitality/web/src/app/globals.css     # expect: 1
   ```
   **Scope note:** "no hex outside `globals.css`" cannot hold site-wide at phase-1 close.
   `app/page.tsx` carries 48 hex literals, `for/[slug]` 16, `services/[slug]` 14; those
   files belong to phases 3 and 5. The proof above is scoped to the files phase 1 owns,
   plus `HospitalityBackdrop.tsx`, whose single literal is deliberate and reasoned in-file.
5. Built-CSS proofs (after the manager's single serialised build):
   `bg-primary-50`/`text-primary-600`/`ring-primary-100` present (was 0/0/0);
   `16 185 129` count = 0; `--color-primary-600` resolves to `#b0532f`.
6. `browser_check` against `docs/hospitality/_port/browser_baseline.json`: report contrast
   and overflow **deltas only**. Pre-existing rows that must still be there and are not
   phase-1 defects: `button "Do not track me" ratio=2.47 floor=4.5` on every route (the
   consent toggle; the kit footer restyle should IMPROVE it — measure and report), and the
   AdSense CSP `frame-src` console line. The three `/calculators/*` 404 console lines are
   phase-0's and may already be gone. **New** sub-floor rows are blockers.
7. **Header CTA hidden below 1024, measured in the RENDERED DOM**, at 390 / 768 / 1023 /
   1024 / 1280. The correct claim is `display: none` at the first three, not "absent from
   the DOM" (R1 false premise 3). Burger the inverse. The cascade race that caused this
   estate-wide is closed in the kit (`btnPrimaryBase` no longer opens `inline-flex`); do not
   re-open it, just measure the outcome.
8. Drawer CTA read from the **shipped client bundle**, not the page source:
   `grep -o "header_book_mobile\|mobile_menu" hospitality/web/.next/static/chunks/app/layout-*.js`.
9. Link floor per route from `docs/hospitality/_port/sweep_baseline.json`. Chrome adds
   links, never removes. Assert `>=` the floor on every route and report the new number.
   Floors to check first, because they are the tightest: `/about` 6, `/contact` 6,
   `/privacy-policy` 6, `/cookie-policy` 6, `/terms` 6, the three `/research/*` 7, the three
   `/calculators/*` 7, `/blog/payroll-and-employment` 7, `/` 21, `/blog` 37.
10. CTA triple diff against `cta_baseline.json`: expect the same single distinct triple
    `header_book|header|form`, count 1 per route, 59 routes.
11. Ring walk on the real `:focus-visible` state with a **320ms settle** before reading
    `getComputedStyle`. `transition-colors` animates `outline-color` and an immediate read
    returns a mid-transition value; that is how R1's blocker nearly read as a pass.
    Composite through a 1x1 canvas — Tailwind v4 returns `oklab(...)`, and an `rgba?\(`
    regex silently yields the wrong ground. `outline-offset-2` paints on the PARENT's
    ground, so read the ancestor's fill, not the control's.
12. Landmarks on 10 sampled routes: exactly one `<main id="main">`, one skip link, one
    `<header>`, one `<footer>` each. `/embed/[slug]` and
    `/research/hospitality-openings-closures-index/embed`: header=0 footer=0 main=0 skip=0.
13. Em-dash sweep on the rendered chrome: 0.
14. The four-marker row, comment-stripped, pasted into `docs/hospitality/STATE.md`.
    Baseline `0/0/0/0`; expect `backdrop` to move only when a page phase mounts it.

---

## RISKS AND AMBIGUITIES, with the recommended resolution

| # | risk | resolution |
|---|---|---|
| R1 | Adopting the kit `btnPrimary` brings `rounded-xl` (= 4px at `--radius: 0rem`) to 22 call sites. The site's buttons are square today. | Ship it, but **declare it in the receipt as a visible shape change**. R1 minor 6 on startups-tech was exactly this, shipped silently inside a "tokens" phase. If the owner objects, `--radius` is the one-line undo. |
| R2 | The kit `sectionY` rhythm is tighter than the local one on 10 call sites. | Adopt, declare. The Property rhythm is the point of the port. |
| R3 | Adopting the kit footer replaces a hand-authored 4-column layout with the kit's nav-derived columns, and drops the "Editorial content only" line and the `UnionJack` strip unless deliberately re-mounted. Link count per route could FALL. | Assert the link floor per route BEFORE tagging (verification 9). Re-mount `UnionJack` above the footer. Owner questions Q2 and Q6. |
| R4 | `.ground-dark` declared and never mounted is dead code, and R1 made it a blocker on the sibling site. | Phase 1 declares the mechanism and mounts it on any dark ground phase 1 itself paints, and writes the rule into `globals.css` for phases 2-6. If phase 1 paints no dark ground, say so in the receipt in those words. |
| R5 | `tw-animate-css` is a new dependency and the workspace `npm install` crashed on Arborist in the dev tree during the startups-tech uplift. | `npm install --package-lock-only`, then `python scripts/check_dependency_closure.py`, and prove resolution with `node -e "require.resolve(...)"`. `npm ls --workspace` reporting "extraneous" is not evidence of a broken lockfile. Note for deploy day: run a clean `npm ci --workspace=hospitality/web --include-workspace-root` in the deploy worktree. |
| R6 | The mono face question (A8) could quietly add a second type family. | Alias the stack, load nothing. Owner question Q5. |
| R7 | The kit mobile drawer does not trap focus on any ported site. | **Already fixed in the kit** on 2026-09-29 (playbook §8 item 11, last entry): the drawer now moves focus in, cycles Tab inside the panel, and returns focus to the burger. Verify it is present at the kit SHA this port builds against; do not re-implement it, and do not edit `packages/**`. |
| R8 | Another agent holds 18 uncommitted files including the admin login. | P1 opens none of them. P1-C's three research `<main>` swaps touch files that ARE in that set (`research/*/page.tsx`) — **confirm with the manager that the phase-0 wave is committed before P1-C starts**, or P1-C will collide. This is the single sequencing risk in the plan. |
| R9 | Gate row 6 reads empty today only because the site's rings are bracketed literals the regex cannot see. | P1-F's guard covers the gap. Do not report row 6 empty as a pass without saying why. |

---

## OWNER QUESTIONS (bundled, plain English, one decision each)

1. **Footer "Resources" column.** The shared footer builds a Resources column from one hub
   page. We recommend `/research`. Blog already has its own link. Agree?
2. **The line "Editorial content only".** It sits at the bottom of every page and reads as a
   disclaimer that we do not give advice, under a site that sells accountancy. Property does
   not have it and the shared footer has no place to put it. We recommend letting it go.
   Agree, or keep it?
3. **The missing logo file.** The config says there is a logo at `/brand/logo.png`; no such
   file has ever existed and the site has always shown the text wordmark instead. We
   recommend deleting the stale line from the config. Do you want a logo designed, or is the
   text wordmark the answer?
4. **The seven nav labels.** They are currently the raw route names: Services, For,
   Calculators, Research, Blog, About, Contact. "For" is not a word a reader understands on
   its own. We are not rewording anything in this phase. Do you want a wording pass on the
   nav, separately?
5. **A second typeface for numbers.** Figures on this site are set in a "monospace" style
   that currently falls back to whatever the visitor's computer has, so they look different
   on different machines. We can either name a safe fallback list (free, no change to page
   weight) or load the estate's numeral font (one extra font download per visit). We
   recommend the fallback list.
6. **The Union Jack strip above the footer.** It is specific to this site and has no
   equivalent on Property. We recommend keeping it above the new footer. Agree?
7. **Button corners.** The shared button recipe gives buttons a very slight 4px rounding;
   this site's buttons are currently square. It is a one-line setting either way. We
   recommend adopting the shared one. Agree?

---

## BUILD ORDER AND CONCURRENCY

```
P1-A tokens            (alone, first; owns globals.css + layout.tsx font/noscript + package.json)
      |
      +-- P1-B layout-utils  ----+
      +-- P1-E backdrop     -----+---> P1-C chrome (PageShell, kit footer, <main> swaps)
                                 |
      +-- P1-D grey ramp (phase-1 slice only: layout-utils, error.tsx, not-found.tsx)
                                 |
                                 +---> P1-F ring guard (needs B's recipes)
```

- **P1-A runs alone and first.** Every other package reads its tokens.
- **P1-B and P1-E run concurrently** after A, on disjoint files.
- **P1-D's phase-1 slice** touches `error.tsx` and `not-found.tsx` only (its
  `layout-utils.ts` and `SiteFooter.tsx` hits are consumed by P1-B and P1-C respectively),
  so it can run concurrently with B and E.
- **P1-C runs after B and E**, needs `HospitalityBackdrop` for the footer slot and the
  wrapped recipes for its own rings, and must not start until the phase-0 wave's research
  files are committed (R8).
- **P1-F runs last**, after B's recipes exist.
- Manager runs the single serialised build. Builders never build (T1).
- Every git command from the monorepo ROOT (T3).
