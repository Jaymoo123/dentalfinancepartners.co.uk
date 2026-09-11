# TRADE (construction-cis) DESIGN DELTA
Standard: docs/_engines/PROPERTY_STANDARD_ROLLOUT.md appendix + docs/property/DESIGN_SYSTEM.md §0.
An empty section means: Property standard, no exception.

Status 2026-09-11: **PROPOSED.** Owner decisions taken this session: the brand stays orange, and
the estate's warning/penalty semantics move off orange. Every BLOCKER row in §4 is otherwise
awaiting a yes. Full working, with the derivation of every number below, is in
`_port/BRAND_LAYER.md`; this file is the contract, that file is the evidence.

## 1. Brand tokens (the seven swap points)

```
primary ramp:        orange - Tailwind 4 oklch verbatim from node_modules/tailwindcss/theme.css.
                     #f97316 IS orange-500 exactly, it is niche.config brand.primary_color, and
                     no snapping is needed.
                       --color-primary-50:  oklch(98% 0.016 73.684)    /* #fff7ed */
                       --color-primary-100: oklch(95.4% 0.038 75.164)  /* #ffedd5 */
                       --color-primary-200: oklch(90.1% 0.076 70.697)  /* #fed7aa */
                       --color-primary-300: oklch(83.7% 0.128 66.29)   /* #fdba74 */
                       --color-primary-400: oklch(75% 0.183 55.934)    /* #fb923c */
                       --color-primary-500: oklch(70.5% 0.213 47.604)  /* #f97316 = brand */
                       --color-primary-600: oklch(64.6% 0.222 41.116)  /* #ea580c */
                       --color-primary-700: oklch(55.3% 0.195 38.402)  /* #c2410c */
                       --color-primary-800: oklch(47% 0.157 37.304)    /* #9a3412 */
                       --color-primary-900: oklch(40.8% 0.123 38.172)  /* #7c2d12 */
                       --color-primary-950: oklch(26.6% 0.079 36.259)  /* #431407 */

neutral ramp:        KEEP WARM NEUTRAL for text and hairlines. neutral-500 4.74 against
                     slate-500 4.76 is parity, and warm is chromatically correct under orange,
                     so a swap buys nothing. The kit ships slate; the mix is accepted and
                     recorded in §3.
                     --ink-whisper #a3a3a3 (2.42, a live FAIL in the footer) -> #737373.

dark ground:         slate-900 #0f172a. Today --dark is #1e293b, which is slate-800 and is
                     MISLABELLED "slate-900" in the file. The ground is also written as a
                     literal bg-[#1e293b] in 37 places (corrected from 55) with 22 more bg-neutral-900 bands, so
                     the site has two untokenised dark grounds. 59-usage sweep, owned by the
                     phases that own those files. Kit navy components are unparameterised.

warning ramp:        OFF orange AND off amber. The brand IS orange-500, and amber-800 sits 8 RGB
                     units from orange-800, so amber would hide the collision rather than
                     resolve it. Ladder T-W1, four steps plus on-dark twins, generic token
                     names so a future re-hue needs no rename:
                       --warn-1  red-600    #dc2626   a duty bites, a deadline
                       --warn-2  pink-700   #be185d   a charge arises
                       --warn-3  blue-700   #1d4ed8   penalty, status at risk
                       --warn-4  indigo-900 #312e81   deliberate or criminal track
                       --warn-1-on-dark red-400    #f87171
                       --warn-2-on-dark pink-400   #f472b6
                       --warn-3-on-dark blue-400   #60a5fa
                       --warn-4-on-dark indigo-300 #a5b4fc
                     Plus --form-error red-700 #b91c1c, moved off red-600 because red-600 is
                     now step 1.
                     This is a NET-NEW system, not a sweep: the site has 6 live amber usages,
                     5 of them decorative. See §3 for why red leads and what that costs.

semantic overrides:  --accent stays #f97316, DEMOTED to GROUNDS AND DECORATIVE MOTIF STROKES
                     ONLY. Corrected 2026-09-11 after the phase 1 review: the earlier wording
                     said "non-text use", which read as licensing it for icons, and #f97316
                     measures 2.80 on white. That is below the 3:1 GRAPHICS floor this document
                     sets in section 2, so the contract was sanctioning the very failures the
                     review then found: 24 tick glyphs at 2.80 across / and /services, the
                     process numerals 01/02/03 at 2.76, and a 4px heading border on every
                     article. A decorative motif stroke carries no information and no floor
                     applies; a tick, a numeral or a meaning-bearing border does.
                     **Any icon, glyph, numeral or meaning-bearing border uses --accent-strong
                     or --btn-ground, never --accent.**
                     --accent-strong #ea6c07 -> #c2410c (orange-700). The shipped value is NOT
                     orange-600 as its own comment claims, and it measures 3.16 on white: a
                     live failure on every article and legal link.
                     .eyebrow moved into @layer components so a consumer utility wins, and its
                     DEFAULT is --accent-strong. Corrected 2026-09-11: the first attempt simply
                     recoloured the unlayered rule, which was a REGRESSION, because both live
                     consumers sit on bg-neutral-900 and already carried an explicit
                     text-orange-400 that the unlayered class was silently overriding. Layered:
                     /about and /contact get their authored orange-400 at 6.69, /not-found gets
                     the default at 5.18 on white. Both pass; unlayered, the dark pair measured
                     2.92.
                     .section-label ground -> --btn-ground (2.80 today, FAIL, 38 usages).
                     --success #10b981 is Property's brand hue and 2.07 as text: retire, in
                     favour of an ink-plus-tick treatment or emerald-700 #047857 (4.99).
                     ADD: --btn-ground, --btn-ground-hover, --btn-ground-active, --hero-cream,
                     the four --brand-glow channels, --warn-1..4, --warn-n-on-dark, --form-error.

font:                Geist Sans + Geist Mono KEPT (appendix K default, no change proposed).
                     @theme inline wiring is already correct. Changes: body line-height
                     1.7 -> 1.6; headings 600 -> 700; heading line-height 1.1-inside-@layer-base
                     -> 1.2 UNLAYERED per A.3, because the layered rule silently loses to every
                     Tailwind text utility. Both the value and the layer are wrong today.

button constants:    A.5 box model, colour tokens only.
                     Local btnPrimary hard-codes bg-orange-500, giving a white label at 2.80:
                     a LIVE WCAG FAILURE on every page, below even the 3:1 graphics floor.
                     Ground -> primary-700 #c2410c (5.18) via --btn-ground; hover #9a3412
                     (7.31); active #7c2d12 (9.37). The large-text exemption was measured and
                     rejected: the button label is 14px/500.
                     focusRing is already outline-orange-600 (3.56, passes the graphics floor):
                     keep.
                     btnOnDark is an alias of btnSecondary and renders ink-on-navy, a live
                     defect: replace with the real A.5 recipe.
                     btnOnTeal is a dead-brand fossil whose ground is neutral-900: rename.

wordmark:            icon = HardHat (fallback Hammer); line1 "TRADE TAX SPECIALISTS";
                     line2 "CIS ACCOUNTANTS". Icon primary-600 on light, primary-300 on navy.
                     The text is never orange. Owner picks the descriptor.

backdrop motif:      setting-out / scaffold grid. Vertical standards about 28px, ledger transoms
                     about 44px, two or three diagonal braces, dimension ticks. Navy ground
                     stroke-primary-300 at 0.18 opacity; cream ground stroke-primary-600 at
                     0.10. Property's appendix E geometry. New file
                     src/components/layout/TradeBackdrop.tsx. The site has no SVG backdrop today.

cream surface:       #fafaf7, Trade's own incumbent, 7 usages. Deliberately NOT synced to
                     Property's #fbfaf7. Tokenise as --hero-cream.

radius:              --radius: 0rem already matches Property. --radius-xl and --btn-radius are
                     ABSENT, so rounded-xl renders Tailwind's 12px default today. This is NOT
                     Medical's 0px defect; the site is inconsistent, not broken. Importing
                     globals-standard.css supplies --radius-xl: calc(var(--radius) + 4px) = 4px
                     and --btn-radius.

plumbing:            ADD @import "@accounting-network/web-shared/design/globals-standard.css"
                     after tw-animate-css and before :root. A grep for "web-shared/design" in
                     src returns 0 today. Strip the BOM at globals.css:1 and the mojibake at
                     :7-8. Correct the wrong comments at :23 and :31. Re-derive --chart-1..5,
                     which are currently four near-identical oranges plus one slate.
```

## 2. Measured contrast table (every brand colour on white, the site surface, and navy)

Grounds: white `#ffffff`; the site surface `#fafaf9` (`--surface`, which `--background` aliases,
so this and not white is the real page ground); the current dark ground `#1e293b`; and slate-900
`#0f172a` where the §1 dark-ground recommendation changes the answer. Floors: **4.5:1 text**,
**3:1 graphics**.

**Read this before using a number below.** A Tailwind ramp UTILITY and a CSS custom property do
NOT render the same colour on this site, and the difference is not a rounding error. Tailwind v4
emits its ramps as `oklch()`, which resolves to materially different sRGB than the v3 hex table:
`orange-400` renders `#ff8904`, not `#fb923c`, a drift of 69 summed RGB units; 500 and 600 each
drift 38. A custom property renders whatever literal hex was written into it, so `--accent` really
is `#f97316` and `--btn-ground` really is `#c2410c`.

So every row below is labelled by SOURCE. This is what reconciled an apparent disagreement between
two instruments during phase 1: the pre-port button used the utility `bg-orange-500` and measured
**2.89**, while a hand computation of the token `#f97316` gave **2.80**. Both were correct about
different subjects. Re-derived 2026-09-11 with an `oklch` to sRGB converter self-tested against two
canvas-measured values out of the running build (`orange-400` to `#ff8904`, `neutral-900` to
`#171717`) and the two WCAG pairs every instrument here self-tests on. **Ten of seventeen bound rows
drifted, by at most 0.38, and NO verdict changed:** every pass stayed a pass and every fail stayed a
fail. The numbers are corrected anyway, because this table is what five later phases measure
against.

Method: hand-computed WCAG relative luminance. `browser_check.mjs` DOES resolve colours correctly on
this site (0 unparseable, self-test passes), so it is the better instrument here and trap 25 does not
reproduce; it is used as the corroborating measurement rather than the primary one. The calculator self-tested against slate-500-on-white 4.76 and
slate-400-on-white 2.56 before any value below was trusted, and it reproduced nine independently
published estate figures unadjusted. Independently corroborated on 2026-09-11 by
`browser_check.mjs` against the running production build, which resolved every colour on this
site (0 unparseable) and returned 2.89 for the rendered button, 2.80 for the orange tick, 3.58
and 3.43 for article links and 2.47 for the footer fine print. Two methods, same verdicts.

### 2.1 Brand ramp

| token | usage | ground | ratio | verdict |
|---|---|---|---|---|
| primary-500 as UTILITY `bg-orange-500` (renders `#ff6900`) | the PRE-PORT `btnPrimary` ground, white label | - | **2.89** | **FAIL** (was live on every page; fixed in phase 1) |
| `--accent` TOKEN `#f97316` | `.section-label` ground, white label | - | **2.80** | **FAIL** (live, 38 usages) |
| `--accent` TOKEN `#f97316` | `.eyebrow` default, had it stayed on `--accent` | `#fafaf9` | **2.68** | **FAIL**, which is why the default is `--accent-strong` |
| primary-500 as UTILITY `text-orange-500` (renders `#ff6900`) | text | white | **2.89** | **FAIL** (live, 11 usages) |
| primary-600 as UTILITY (renders `#f54900`) | the PRE-PORT `btnPrimary` hover ground, white label | - | **3.60** | **FAIL** (fixed in phase 1) |
| primary-600 UTILITY `outline-orange-600` | focus ring (graphic) | white | 3.60 | PASS graphics |
| primary-600 UTILITY | tick colour (`tickClassName`) | white | 3.60 | PASS graphics |
| primary-600 UTILITY `text-orange-600` | text / link | white / `#fafaf9` | **3.60 / 3.45** | **FAIL** as text |
| `#ea6c07` (`--accent-strong` as shipped) | `.prose-blog a`, every article link | white / `#fafaf9` | **3.16 / 3.03** | **FAIL** (live, site-wide) |
| `--btn-ground` TOKEN `#c2410c` | button ground, white label | - | **5.18** | PASS (shipped phase 1; measured 5.18 as a token, 5.22 had it been the utility) |
| `--accent-strong` TOKEN `#c2410c` | links, eyebrow default | white / `#fafaf9` / cream | 5.18 / 4.96 / 4.96 | PASS (shipped phase 1) |
| `--btn-ground-hover` TOKEN `#9a3412` | button hover ground, white label | - | 7.31 | PASS |
| primary-800 | stat figures on light | `#fafaf9` / slate-50 | 7.00 / 6.98 | PASS |
| `--btn-ground-active` TOKEN `#7c2d12` | button active ground, white label | - | 9.37 | PASS |
| primary-400 UTILITY `text-orange-400` (renders `#ff8904`) | accent / eyebrow on dark | `#1e293b` / slate-900 / neutral-900 | 6.15 / 7.51 / **7.54** | PASS (the neutral-900 figure is the shipped `.eyebrow` case) |
| primary-300 UTILITY (renders `#ffb86a`) | accent on dark, motif stroke | `#1e293b` / slate-900 | 8.58 / 10.47 | PASS |
| primary-500 UTILITY | accent text on dark | `#1e293b` / slate-900 | 5.07 / 6.18 | PASS |
| primary-200 `#fed7aa` | hairline / border on dark | `#1e293b` | 10.81 | PASS graphics |
| primary-50 `#fff7ed` | tint ground | - | ground only | n/a |

### 2.2 Warning ladder T-W1

| token | usage | ground | ratio | verdict |
|---|---|---|---|---|
| `--warn-1` red-600 `#dc2626` | a duty bites | white / `#fafaf9` / cream | 4.83 / 4.62 / 4.63 | PASS |
| `--warn-1-on-dark` red-400 `#f87171` | on dark | `#1e293b` / slate-900 | 5.29 / 6.45 | PASS |
| `--warn-2` pink-700 `#be185d` | a charge arises | white / `#fafaf9` / cream | 6.04 / 5.78 / 5.78 | PASS |
| `--warn-2-on-dark` pink-400 `#f472b6` | on dark | `#1e293b` / slate-900 | 5.52 / 6.74 | PASS |
| `--warn-3` blue-700 `#1d4ed8` | penalty, status at risk | white / `#fafaf9` / cream | 6.70 / 6.42 / 6.42 | PASS |
| `--warn-3-on-dark` blue-400 `#60a5fa` | on dark | `#1e293b` / slate-900 | 5.75 / 7.02 | PASS |
| `--warn-4` indigo-900 `#312e81` | deliberate / criminal track | white / `#fafaf9` / cream | 11.42 / 10.94 / 10.94 | PASS |
| `--warn-4-on-dark` indigo-300 `#a5b4fc` | on dark | `#1e293b` / slate-900 | 7.34 / 8.96 | PASS |
| indigo-400 `#818cf8` | step-4 on-dark alternative | `#1e293b` | 4.90 | PASS, **REJECTED**: 41.4 RGB from blue-400 |

### 2.3 Neutrals, fine print, form error, button grounds

| token | usage | ground | ratio | verdict |
|---|---|---|---|---|
| `--ink` `#0a0a0a` | body and heading ink | `#fafaf9` | 18.96 | PASS |
| `--ink-soft` `#525252` | body copy, `.prose-blog p` | white / `#fafaf9` | 7.81 / 7.48 | PASS |
| neutral-500 `#737373` | fine print 11px (recommended) | white / `#fafaf9` | 4.74 / 4.54 | PASS |
| `--ink-whisper` `#a3a3a3` **as shipped** | footer fine print `SiteFooter.tsx:81-82` | white / `#fafaf9` | **2.52 / 2.42** | **FAIL** (live), retire |
| `--form-error` red-700 `#b91c1c` | validation message | white / `#fafaf9` | 6.47 / 6.19 | PASS |
| red-600 `#dc2626` (current form error) | validation message | white | 4.83 | PASS, move anyway: collides with `--warn-1` |
| white | on `--btn-ground` TOKEN `#c2410c` | - | **5.18** | PASS |
| white | on `bg-orange-500` UTILITY, the PRE-PORT button | - | **2.89** | **FAIL** (fixed phase 1) |
| white | on `--dark` `#1e293b` | - | 14.63 | PASS |
| white | on slate-900 `#0f172a` | - | 17.85 | PASS |
| `--success` `#10b981` | success state as text | white | **2.07** | **FAIL**, and it is Property's brand hue: retire |

## 3. Sanctioned deviations

| deviation | owner decision + date |
|---|---|
| Primary ramp family IDENTICAL to generalist's (both `#f97316`) | Unavoidable: both are incumbent live brands under the keep-default. Recorded so it never becomes precedent. Separation carried by the warning ladder, the motif and the wordmark. PROPOSED 2026-09-11 |
| Warm neutral text and hairlines retained while kit components ship slate | Parity contrast, chromatically correct under orange, a swap buys nothing. PROPOSED 2026-09-11 |
| Dark ground adopts slate-900 while text neutrals stay warm | Kit navy components are unparameterised. PROPOSED 2026-09-11 |
| `btnPrimary` ground shifts to primary-700 | White-on-orange fails 4.5:1 at every step below 700. This is L.2's own prescribed remedy. PROPOSED 2026-09-11 |
| Duty and penalty ladder = red-600 / pink-700 / blue-700 / indigo-900 | The brand IS orange-500, so amber and orange are both unavailable, and the ladder must also differ from generalist's, which shares this brand hue. PROPOSED 2026-09-11 |
| Step 4's on-dark twin is the 300 step, not the 400 | indigo-400 is only 41.4 RGB units from blue-400; indigo-300 restores 70.6 at 7.34:1. PROPOSED 2026-09-11 |
| Ladder escalates by lightness, not by hue temperature | Forced by the owner's decision to put red first. Same basis as Medical's approved M-W1, with every step directly labelled per DESIGN_SYSTEM §0.3. PROPOSED 2026-09-11 |
| Cream surface `#fafaf7` rather than Property's `#fbfaf7` | Trade's incumbent, 7 live usages. PROPOSED 2026-09-11 |
| `--accent` retained at orange-500, demoted to GROUNDS AND DECORATIVE MOTIF STROKES ONLY; icons, glyphs, numerals and meaning-bearing borders use `--accent-strong` or `--btn-ground` | Owner keeps the brand hue; 2.80 as a token and 2.89 as a utility make it unusable as text or as a glyph. TAKEN 2026-09-11, wording CORRECTED 2026-09-11 after the phase 1 re-review found this row still said "non-text use", which is the phrasing section 1 identifies as having licensed the icon failures. See section 1. |
| No designer credit in the footer, although section C's legal row lists one | Playbook trap T27 (`docs/_engines/DESIGN_PORT_PLAYBOOK.md:720`; the re-review looked for it in the rollout doc, which stops at 13, and wrongly reported it as nonexistent). Mechanism: `packages/web-shared/design/chrome/SiteFooter.tsx:132` defaults `showBuilderCredit` to TRUE, so the kit footer ships the studio's credit as a FOLLOWED outbound link, and two sites shipped it unintentionally. Trade's footer is LOCAL, so the absence is structural rather than a prop: there is simply no credit block. The rule for kit consumers is `showBuilderCredit={false}` unless the studio designed that site. Property carries one because the studio built Property. Trade was not designed by them, so the credit is correctly absent and section C's row is Property-specific. TAKEN 2026-09-11 |
| `/admin/analytics/**` exempt from the port and from the ramp sweep | Login-gated internal console with no Property equivalent. Precedent: Medical M-L11. TAKEN 2026-09-11 |

### 3a. Open breach created by this port, tracked and must close before deploy

**Navy touches navy on 79 of 246 routes (32%).** Phase 1 flipped the footer ground from light to
slate-900 per section C. On those routes the last opaque section is already `#1e293b`, so the page
now ends with two dark bands and no light break, which DESIGN_SYSTEM section 9 forbids
("navy must never touch navy"). Families: `/glossary` **50**, `/locations` **25**, plus
`/cis-refund`, `/gross-payment-status`, `/cis-invoice-template` and
`/cis-payment-deduction-statement-template`.

**Corrected 2026-09-11.** The first count was 102 and named `/blog` 18 and `/resources` 3 as well.
Both were FALSE POSITIVES, and glossary and locations were each one too high. The reviewer's first
scan used a colour parser that failed silently on `oklch()` and scored every unresolved ground as
light. `/blog` and `/resources` are NOT in breach and are removed from the closure plan below. The
old number is recorded here so nobody re-derives 79 against a remembered 102 and concludes the
breach grew.

This is an intermediate state in an UNDEPLOYED port, and it is recorded here rather than patched
across 102 routes because every one of those closing blocks is rebuilt by a later phase that will
give it the correct light tail: glossary and locations in phase 3, the two pillars in phase 5, and
the two template pages in phase 6. Patching them now would be written twice and thrown away once.

**It is therefore a blocking item on the port's definition of done, not a deferral.** If any family
has not closed by the owner walk, the footer flip is held back rather than shipped in breach.

The check is now a committed instrument, because the re-review correctly pointed out that this gate
named a verification nobody could perform: the scan that produced both counts was a throwaway
script that no longer exists, which is the TD-07 shape of a rule everyone believes is enforced and
nothing enforces. Run:

```
node docs/_engines/instruments/browser_check.mjs --site=construction-cis --base=http://localhost:PORT --grounds
```

It must resolve colours through the browser, not parse them: `oklch()` is exactly what defeated the
first count.

## 4. Owner-input state (appendix K rows)

| Input | Class | State 2026-09-11 |
|---|---|---|
| Brand stays orange, warnings move off orange | BLOCKER | **TAKEN** this session |
| All six phases run, deploy stays gated | BLOCKER | **TAKEN** this session |
| `btnPrimary` ground -> primary-700 | BLOCKER | PROPOSED. Fixes a live WCAG failure on every page. Recommend approving independently of the rest of the port |
| `--accent-strong` -> orange-700 | BLOCKER | PROPOSED. Fixes a live failure on every article and legal link |
| Warning ladder T-W1 sign-off | BLOCKER | PROPOSED |
| Step count 4, not 3 | BLOCKER | PROPOSED, evidenced from the site's own penalty content |
| Brand ramp sign-off with the generalist collision acknowledged | BLOCKER | PROPOSED |
| Dark ground -> slate-900 (77-usage sweep) | BLOCKER | PROPOSED |
| Wordmark icon (`HardHat`) | BLOCKER | PROPOSED |
| Wordmark descriptor ("CIS ACCOUNTANTS") | BLOCKER | PROPOSED |
| Backdrop motif (scaffold grid) | BLOCKER | PROPOSED |
| Footer ground light -> navy | BLOCKER | PROPOSED (ground-oscillation pass) |
| Font change | BLOCKER | **NOT proposed.** Geist retained |
| Favicon set | COSMETIC | Keep existing, never generate |
| Hero imagery | COSMETIC | Pexels images retired; attribution follows |
| Deploy approval | BLOCKER | Owner-triggered, every time |

## 5. L.3 ramp registry

| Site | Primary ramp | Approved |
|---|---|---|
| Property | emerald | live |
| generalist | orange | APPROVED 2026-09-09 |
| Solicitors | rose | PROPOSED 2026-09-10 |
| Medical | amber | PROPOSED 2026-09-10 |
| **Trade (construction-cis)** | **orange** | **PROPOSED 2026-09-11 (this delta)** |

**Collision, stated plainly.** Trade and generalist share the primary ramp family and the brand
hex: both are `#f97316`, 0 RGB units apart, including their glow channels. This is not a choice
and not a precedent. Both are incumbent live brands under the keep-the-brand default, the
collision predates the programme, and Medical's delta already recorded it as carried forward.
The two sites never appear together.

Separation is therefore carried elsewhere, strongest first:
1. **The warning ladder.** Three of four steps differ, and the one shared hue, red-600, sits at
   step 1 here against step 3 there.
2. **The backdrop motif.** A scaffold grid with diagonal braces, against generalist's purely
   rectilinear ledger grid.
3. **The wordmark.** `HardHat` / "TRADE TAX SPECIALISTS" against `Briefcase` / "HOLLOWAY DAVIES".

The neutral ramp and the dark ground give zero separation. Recorded honestly rather than
papered over: forcing either one to differ would fight the kit for no reader benefit.

**Warning-ladder differentiation across the estate.**

| Site | Ladder |
|---|---|
| Property | amber-700 / orange-700 / red-600 / red-800 |
| generalist | violet-700 / fuchsia-700 / red-600 / red-800 |
| Solicitors | amber / orange / fuchsia / violet |
| Medical M-W1 | red-600 / purple-700 / indigo-700 |
| **Trade T-W1** | **red-600 / pink-700 / blue-700 / indigo-900** |

Trade shares red-600 with Property, generalist and Medical, but it is the only site that puts it
at step 1 alongside a pink, a blue and an indigo. Pink-700 and blue-700 are used by no other
site's ladder.

**Correction to the estate record.** Medical's DESIGN_DELTA §5 asserts that "no site puts red at
the top of its ladder". That does not hold as written, under either reading: Property and
generalist both END on red-800, and Medical's own M-W1 STARTS on red-600 in the same document
that states the rule. The defensible claim, which T-W1 satisfies, is that no site lets red carry
the escalation alone. Medical's §5 should be corrected rather than inherited.
