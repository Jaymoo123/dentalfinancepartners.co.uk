# MEDICAL DESIGN DELTA

Standard: `docs/_engines/PROPERTY_STANDARD_ROLLOUT.md` appendix A/D/E/K/L + `docs/property/DESIGN_SYSTEM.md` §0.
An empty section means: Property standard, no exception.
Derivation, evidence and per-file dispositions: `docs/medical/_port/DISPOSITION_SLICE3.md`.

Status 2026-09-10: PROPOSED. Owner decisions 1-4 of the slice-3 brief are taken and recorded.
Three appendix-K blockers below are NOT yet approved (brand/warning swatch, wordmark, backdrop motif).
Nothing in this file has been built or deployed.

**The single most important measurement in this file: copper `#b87333` on white = 3.79.**
The live brand colour fails the 4.5:1 text floor. It is the button ground today
(`layout-utils.ts:20-21`) with a white label, and it is the text colour on 40 usages across 18 files.
Every recommendation below follows from that number.

---

## 1. Brand tokens (the seven swap points)

```
primary ramp:        amber (Tailwind). Rationale: the live brand copper #b87333 sits BETWEEN
                     amber-600 #d97706 (55.9 RGB units) and amber-700 #b45309 (53.0). No other
                     Tailwind family lands nearer. Amber supplies the 50-950 steps a single
                     bronze hex cannot, so the kit's `primary-*` classes resolve.
                     50 #fffbeb, 100 #fef3c7, 200 #fde68a, 300 #fcd34d, 400 #fbbf24,
                     500 #f59e0b, 600 #d97706, 700 #b45309, 800 #92400e, 900 #78350f,
                     950 #451a03.
                     THE BRAND HEX IS NOT A RAMP STEP. `--brand-primary` STAYS #b87333
                     (owner decision 1, 2026-09-10), but it is DEMOTED to a graphics-only
                     token: 3.79 on white clears the 3:1 graphics floor and fails the 4.5:1
                     text floor. See §2.

neutral ramp:        NOT slate today, and it must become slate. The site ships a bespoke
                     blue-grey neutral set in `globals.css:27-33`: `--background #f4f6f9`,
                     `--surface-elevated #eef1f6`, `--ink-soft #2d3f5c`, `--muted #5c6b80`.
                     Only `--border #e2e8f0` (slate-200) already matches. Move to the standard:
                     `--background` -> slate-50 #f8fafc, `--muted` -> slate-500 #64748b
                     (4.76 on white vs the incumbent 5.43 on white / 5.01 on #f4f6f9),
                     `--ink-soft` -> slate-700 #334155. `--ink` STAYS #001b3d (navy), which is
                     the brand's second hue, not a neutral.

dark ground:         navy #001b3d, unchanged. This is the site's own `--navy` and it is a
                     stronger dark ground than Property's slate-900 (white on it = 17.15 vs
                     Property's 17.85; both far past floor). KEEP IT. It is the one place
                     Medical deviates from Property's literal token and should: navy IS the
                     Medical brand's primary identity colour, copper is the accent.
                     Retires: the CSS-only `.hero-brand` gradient
                     (`globals.css:106-112`, `#000d1f -> --navy -> --navy-soft`) in favour of a
                     flat navy ground plus the backdrop motif below.

warning ramp:        OFF copper AND off amber and orange entirely (owner decision 1,
                     2026-09-10). The brand IS the amber family, so an amber or orange penalty
                     chip would read as brand furniture, and amber-800 #92400e vs orange-800
                     #9a3412 are 8 RGB units apart, which hides a collision rather than
                     resolving it.
                     RECOMMENDED LADDER M-W1 (3 steps + on-dark twins, Property's own shape):
                       1. a duty bites / deadline    red-600    #dc2626   on-dark red-400    #f87171
                       2. escalation, charge arises  purple-700 #7e22ce   on-dark purple-400 #c084fc
                       3. penalty / regulatory       indigo-700 #4338ca   on-dark indigo-400 #818cf8
                     Distances from the brand #b87333: 86.0 / 184.3 / 199.9. The weakest link
                     is step 1 at 86.0, comfortably past the 57.8 that Solicitors accepted as
                     its weakest link. Step separations: red-600 to purple-700 = 192.6,
                     purple-700 to indigo-700 = 63.1 (hue-distinct, and every step is directly
                     labelled per DS §0.3, never colour alone).
                     Rejected alternatives:
                       M-W2 (amber-700 / orange-700 / red-700): Property's literal ramp.
                       REJECTED, steps 1 and 2 are the brand family.
                       M-W3 (red-600 / fuchsia-700 / violet-700): passes every floor, but it
                       is generalist's warning set minus one step (generalist = violet /
                       fuchsia / red-600 / red-800). Two ported siblings sharing three of
                       three steps is not differentiation.
                       M-W4 (sky-700 / teal-700 / indigo-700): maximum distance from copper,
                       REJECTED. Teal is the site's RETIRED legacy brand (`--medical-teal`
                       alias, `globals.css:45`); reusing it as a semantic resurrects a dead
                       brand. Sky-700 reads as a link.
                     Medical carries essentially no warning colour today: 57 total
                     amber/orange/red/rose usages in `src`, of which the live-surface ones are
                     form-error red (`LeadForm.tsx:216,241,264,296,319,394`,
                     `error.tsx:24-25`, `SpecialistWidget`, `DetailsForm`, `BookingPicker`,
                     `MedicalHealthCheckWizard`, `PremiumCalculator`) and the /admin console.
                     So M-W1 is a NET-NEW system, not a sweep. The sweep cost is near zero.
                     The one red that stays is the form-error red (`text-red-700` = 6.47 on
                     white), paired with `role="alert"` and `aria-invalid`, never colour alone.

semantic overrides:  Genuine two-hue brand (L.2): NAVY = ink, ground and authority;
                     COPPER = accent, action and marks. Both stay.
                     `--primary` currently aliases NAVY (`globals.css:36`) while
                     `--brand-primary` aliases COPPER (`globals.css:54`). That inversion is the
                     source of the "TOKEN HARDENING: no var(--primary)" comments scattered
                     through `SpecialistWidget.tsx:11` and `resources/[topic]/page.tsx:12`.
                     Resolve it: delete `--primary`/`--primary-soft`/`--primary-light` and the
                     legacy aliases `--medical-teal`, `--medical-teal-dark`, `--coral`,
                     `--coral-strong`, `--gold`, `--gold-strong`, `--gold-soft`
                     (`globals.css:36-51`) once their consumers are ported. `--coral` is still
                     LIVE on `/contact:89,93,97`.
                     ADD to `:root`:
                       --btn-ground:        #a0622b;  /* white label 4.91 */
                       --btn-ground-hover:  #8a5425;  /* white label 6.22 */
                       --btn-ground-active: #78350f;  /* amber-900, white label 9.07 */

font:                Plus Jakarta Sans ONLY (owner decision 2, 2026-09-10). Cormorant Garamond
                     is DROPPED: `layout.tsx:2` (import), `:23-27` (loader), `:80`
                     (`${cormorant.variable}`), `globals.css:70`
                     (`--font-serif: var(--font-cormorant)`) and `globals.css:159-163`
                     (`.display-serif`) all removed. Wiring stays
                     `@theme inline { --font-sans: var(--font-plus-jakarta) }` with the
                     `--font-serif` line deleted.
                     COUNT, grep-verified 2026-09-10, and it is TWO numbers not one, which is
                     the trap the Solicitors brief fell into:
                       `font-serif`    = 116 occurrences across 28 files
                       `.display-serif`= 15 occurrences across 3 files
                       TOTAL           = 131 occurrences across 29 distinct files
                     (`display-serif` does not contain the substring `font-serif`, so a single
                     combined grep undercounts by 15 and a line-count grep undercounts both.)
                     Worst files: `page.tsx` 16, `terms/page.tsx` 14, `privacy-policy/page.tsx`
                     12, `AudienceStageLayout.tsx` 10, `free-practice-health-check/page.tsx` 9.
                     In slice 3's own scope: 39 (`terms` 14, `privacy-policy` 12, `cookie-policy`
                     6, `contact` 5, `not-found` 1, `error` 1, `CTASection` 1 [display-serif],
                     `ResourceGate` 1). `/about` has 6 more.
                     The site already loads and renders Plus Jakarta as `--font-sans`
                     (`layout.tsx:80`), so this is the REMOVAL of a second face, not a switch of
                     the primary face. Body copy does not change.
                     Weights 400,500,600,700. Body line-height 1.5 -> 1.6
                     (`globals.css:97`). Headings inside `@layer base`: weight 700,
                     letter-spacing -0.02em; `line-height: 1.2` UNLAYERED on purpose
                     (A.3 / trap 7.1).

button constants:    Box model per A.5 (`min-h-12`, `min-w-[10rem]`, `px-8 py-3.5`,
                     `text-base font-bold`, `rounded-xl`); colour tokens only.
                     `layout-utils.ts:20-21` today is `px-6 py-3 text-sm font-semibold
                     rounded-full` — every one of those four changes.
                     GROUND: **the 700 step, NOT the live brand hex.** Property's rule is that
                     a brand whose 600 step fails 4.5:1 shifts to the 700 step. Medical's
                     600 step amber-600 #d97706 measures 3.19 (FAIL) and the live brand hex
                     #b87333 measures 3.79 (FAIL), so unlike Solicitors the brand hex CANNOT be
                     the ground. Recommendation: `--btn-ground: #a0622b`, the site's OWN
                     `--copper-strong` (`globals.css:22`), white label 4.91 PASS. It is 42.2 RGB
                     units from amber-700 #b45309 (5.02), sits in the same ramp position, is
                     already live as the button hover, and is the smallest visible change that
                     clears the floor. Sanctioned alternative if the owner prefers a literal
                     ramp step: amber-700 #b45309 (5.02).
                     hover #8a5425 (6.22), active amber-900 #78350f (9.07).
                     focusRing -> keep `outline-[var(--brand-primary)]` = copper on white 3.79,
                     past the 3:1 graphics floor. This is the ONE place copper survives at full
                     strength and it is correct there.

wordmark:            icon = `Stethoscope` (lucide), fallback `HeartPulse`;
                     line1 "MEDICAL ACCOUNTANTS UK"; line2 "SPECIALIST ACCOUNTANTS".
                     Icon `text-[var(--brand-primary)]` on BOTH grounds: copper is 3.79 on white
                     and 4.52 on navy, so a single icon colour clears the 3:1 graphics floor on
                     the light AND the dark header. That is a property Solicitors did not have
                     (its brand measured 3.06 on navy and needed a second on-dark colour).
                     Copper must never carry the wordmark TEXT: use `--ink` (navy, 17.15) on
                     light and white (17.15) on navy.
                     Rejected: a medical cross or `Plus` (Red Cross emblem, protected under the
                     Geneva Conventions Act 1957 in the UK; also reads as pharmacy);
                     `Activity` / ECG line (generic dashboard iconography);
                     `Calculator` (every accountancy brand uses it);
                     caduceus or rod of Asclepius (clinical-credential iconography a lead-gen
                     brand has no standing to wear).
                     `aria-label` built from the visible strings (WCAG 2.5.3). Today
                     `BrandWordmarkHomeLink.tsx` is the incumbent; diff before replacing.

backdrop motif:      Property uses `HeroBrickBackdrop.tsx`: SVG etch, `absolute inset-y-0
                     right-0 w-[55%] hidden sm:block`, host `relative overflow-hidden`, content
                     `relative z-10`, masked to transparent.
                     Medical has NO SVG backdrop. It has a CSS-only stack at
                     `globals.css:105-136`: a 135deg navy gradient, two radial copper glows at
                     rgba(184,115,51,.10) and .08, and a 60x60 white gridline data-URI at
                     opacity 0.3. All three retire.
                     PROPOSAL: **ECG rhythm strip on chart paper.** Faint vertical rules at
                     ~34px pitch (the ECG paper grid) with every fifth rule at 1.5x stroke, a
                     single horizontal baseline, and 3 QRS complexes at irregular pitch so it
                     reads as a trace and not as a pattern. ~26 SVG paths, `aria-hidden`.
                     Geometry is Property's EXACTLY (appendix E), including the 55% width and
                     the `hidden sm:block`.
                     Two tones: on navy `stroke-[var(--copper-light)]` #cd8e5a at .18, mask
                     `to left, black 35% -> transparent 92%` (6.22 on navy as a graphic);
                     on cream `stroke-[var(--brand-primary)]` at .10, mask 45%/97%.
                     File: `src/components/layout/MedicalBackdrop.tsx`.
                     Rejected: stethoscope repeat (the wordmark already carries it);
                     pill/capsule tiling (says pharmacy, and this brand sells accounting);
                     ledger rules (Solicitors took that motif);
                     abstract blobs (say nothing).

cream surface:       #fbfaf7 (Property's value; the site has no incumbent cream).

radius:              Medical has NO `--radius` token of any kind. `grep -c radius
                     src/app/globals.css` = 8, and all eight are literal `border-radius`
                     declarations, not tokens: `.card` 12px (`:214`), inputs 8px (`:246`),
                     `.medical-badge` 9999px (`:455`), `.medical-highlight` 4px (`:463`),
                     `.prose-blog aside` `0 4px 4px 0` (`:473`), `.prose-blog img/pre/code`
                     0.5/0.5/0.25rem (`:414, :432, :422`).
                     ADD: `--radius: 0rem`; `--radius-xl: calc(var(--radius) + 4px)` = 4px;
                     `--btn-radius: var(--radius-xl)`.
                     WHAT CHANGES, grep-verified: **65 `rounded-full`** and **64 `rounded-2xl`**
                     usages in `src`. Every `rounded-full` on a BUTTON or CARD becomes
                     `rounded-xl` (`layout-utils.ts:20,24,28`, `NextStepOffer.tsx:41`,
                     `thank-you/page.tsx:84,186,192,201` and the `/complete`, `/book`,
                     `resources/[topic]:156` CTAs). `rounded-full` on a genuine circle (the
                     `/thank-you` step bullets, the `/contact:89,93,97` numbered discs,
                     `SpecialistWidget:372,395,407` avatars, `BlogPostRenderer:199` list
                     bullets, `MedicalHealthCheckWizard:152,178` progress bar and radio) STAYS
                     — a circle is a shape, not a corner. Cards on `rounded-2xl` move to
                     `rounded-xl` + `ring-1 ring-slate-200/70`.

shadcn token layer:  **ABSENT, and it is a prerequisite.** `src/app/globals.css` has ZERO of
                     `--card`, `--popover`, `--muted-surface`, `--destructive`, `--input`,
                     `--ring` (grep count = 0), and `Medical/web/components.json` does not
                     exist. Property has both (`Property/web/components.json` present).
                     `src/components/ui/chart.tsx` and `accordion.tsx` are already shadcn-shaped
                     and are running WITHOUT the token layer they were written against.
                     This layer must land in Phase 1, before any `ui/` primitive is ported.
                     Medical DOES already have the chart tokens `--chart-1..5`
                     (`globals.css:59-63`) wired through `@theme inline` (`:66-75`).

plumbing:            `globals.css` gains, in this order: `@import "tw-animate-css";` (already
                     present at `:4`, and `package.json:26` already declares
                     `"tw-animate-css": "^1.4.0"` — Medical does NOT have the Solicitors
                     phantom-dependency defect) then
                     `@import "@accounting-network/web-shared/design/globals-standard.css";`
                     then `:root`. `grep -rn "web-shared/design" src` = **0**, so the site
                     imports nothing from the shared design kit today.
                     STRIP the UTF-8 BOM at `globals.css:1` (`efbbbf`, verified with `head -c3 | xxd`)
                     and the mojibake at `:7`, `:9`, `:105` and `:138`. Also correct the file's own header comment, which says
                     "Teal + coral brand" for a navy + copper site.
```

---

## 2. Measured contrast table

4.5:1 text floor, 3:1 graphics/large floor. WARNING = fails today on a live surface.
Grounds: white #ffffff, cream #fbfaf7, slate-50 #f8fafc (the standard's `--background`),
`--background` #f4f6f9 (the site's CURRENT background), `--surface-elevated` #eef1f6,
navy #001b3d, `--navy-soft` #0d2d52.

| token | usage | ground | ratio | verdict |
|---|---|---|---|---|
| **copper #b87333** | **button ground, white label** (`layout-utils.ts:21`) | (label on brand) | **3.79** | **WARNING LIVE FAIL. This is the single most consequential cell. Every primary button on the site fails the text floor today.** Shift to the 700 step: `--btn-ground #a0622b` (4.91) |
| copper #b87333 | body / link / eyebrow TEXT | white | 3.79 | WARNING LIVE FAIL x40 across 18 files. Worst: `LeadForm.tsx:386` (the Privacy Policy link inside the consent notice, 12px), `research/page.tsx:70,81`, `resources/[topic]:71`, `Breadcrumb.tsx`, `accordion.tsx`. Fix: `--btn-ground #a0622b` (4.91) or navy (17.15) |
| copper #b87333 | text | cream / slate-50 | 3.63 / 3.62 | WARNING FAIL |
| copper #b87333 | text | site `--background` #f4f6f9 | 3.50 | WARNING FAIL |
| copper #b87333 | text | `--surface-elevated` #eef1f6 | 3.35 | WARNING FAIL |
| copper #b87333 | **focus ring, icons, motif stroke (GRAPHICS)** | white | 3.79 | **PASS** at the 3:1 graphics floor. Keep copper here and only here on light |
| copper #b87333 | eyebrow / accent TEXT | navy #001b3d | **4.52** | **PASS.** Copper is legal as text on navy and illegal as text on white. That inversion is the whole shape of this delta |
| copper-strong #a0622b (`--btn-ground`) | button ground, white label | (label on ground) | **4.91** | **PASS, the chosen ground** |
| copper-strong #a0622b | text | white / cream / slate-50 | 4.91 / 4.70 / 4.69 | PASS on all three |
| copper-strong #a0622b | text | site `--background` #f4f6f9 | 4.54 | PASS, only just — one more reason `--background` moves to slate-50 |
| copper-strong #a0622b | text | navy | 3.49 | FAIL for text on dark, graphics only |
| #8a5425 (`--btn-ground-hover`) | button hover, white label | (label on ground) | 6.22 | PASS |
| amber-900 #78350f (`--btn-ground-active`) | button active, white label | (label on ground) | 9.07 | PASS |
| amber-700 #b45309 | sanctioned alternative ground, white label | (label on ground) | 5.02 | PASS (available, deliberately NOT the recommendation) |
| amber-600 #d97706 | the ramp's 600 step | white | 3.19 | FAIL — this is what triggers Property's shift-to-700 rule |
| copper-light #cd8e5a | text on dark | navy / `--navy-soft` | 6.22 / 5.03 | PASS, the on-navy accent and the backdrop stroke |
| copper-light #cd8e5a | text | white | 2.76 | WARNING FAIL. LIVE on light? No — all 16 usages are on navy grounds (`medical-guides:45`, `AudienceStageLayout:55`, `free-practice-health-check:131`, `medical-guides/[slug]:122`). Correct as shipped; hold that invariant through the port |
| navy #001b3d (`--ink`) | body / heading text | white / cream / slate-50 | 17.15 / 16.44 / 16.40 | PASS |
| white | body text | navy | 17.15 | PASS |
| white | body text | `--navy-soft` #0d2d52 | 13.87 | PASS |
| navy-light #2d4a6f | text | white | 9.05 | PASS |
| ink-soft #2d3f5c (current) | body text | white / #f4f6f9 | 10.62 / 9.81 | PASS |
| muted #5c6b80 (current) | fine print | white / #f4f6f9 / #eef1f6 | 5.43 / 5.01 / 4.79 | PASS |
| slate-500 #64748b (the standard's `--muted`) | fine print | white / cream / slate-50 | 4.76 / 4.56 / 4.55 | PASS |
| slate-400 #94a3b8 | text | white | **2.56** | FAIL, graphic fills only. **Appendix N's own spec value for this pair says 2.51 and is WRONG**; the instrument below recomputes 2.5640 |
| slate-400 #94a3b8 | footer "Do not track me" link (`SiteFooter.tsx:65`) | navy footer | (see note) | CHECK IN SLICE 1 — the footer ground is slice 1's call; `text-slate-400` on navy = 6.69, PASS, but on a lighter footer it would not be |
| red-700 #b91c1c | form-error text (the one retained red) | white | 6.47 | PASS, kept with `role="alert"` + `aria-invalid`, never colour alone |
| red-600 #dc2626 | M-W1 step 1, error icon (`error.tsx:25`) | white / cream / slate-50 | 4.83 / 4.63 / 4.62 | PASS |
| red-600 #dc2626 | M-W1 step 1 | site `--background` #f4f6f9 | **4.46** | FAIL by 0.04 on the CURRENT background. Resolved by the neutral swap to slate-50 (4.62). Do not ship M-W1 before `--background` moves |
| purple-700 #7e22ce | M-W1 step 2 | white / cream / slate-50 | 6.98 / 6.69 / 6.67 | PASS |
| indigo-700 #4338ca | M-W1 step 3 | white / cream / slate-50 | 7.90 / 7.57 / 7.55 | PASS |
| red-400 #f87171 | M-W1 step 1 on dark | navy | 6.20 | PASS |
| purple-400 #c084fc | M-W1 step 2 on dark | navy | 6.49 | PASS |
| indigo-400 #818cf8 | M-W1 step 3 on dark | navy | 5.75 | PASS |
| emerald-200/50/900 | `LeadForm.tsx:169-176` inline success card | emerald-50 | (kit default) | RESTYLE: emerald is Property's brand ramp and has no business on Medical. Move to `--btn-ground` ground or navy. Not a contrast failure, a brand-collision failure |
| kit `DrawnTickList` default tick emerald-400 #34d399 | tick colour | white | 1.92 | Below the 3:1 graphics floor. When the kit lands, pass `tickClassName="text-[var(--btn-ground)]"` (4.91) |
| `.medical-badge` copper-strong on `--copper-soft` | badge text (`globals.css:448-459`) | rgba(184,115,51,.14) over white ≈ #f5ebe2 | **4.18** | WARNING FAIL. Ground the badge on `--surface-elevated` or darken the label to #8a5425 |
| copper #b87333 on `--copper-soft` | badge text if copper is used | ≈ #f5ebe2 | 3.23 | WARNING FAIL |

### Method and instrument self-test

ratio = `(L1 + 0.05) / (L2 + 0.05)` on WCAG 2.x sRGB relative luminance
(`L = 0.2126R + 0.7152G + 0.0722B`, each channel linearised as
`c/12.92` where `c <= 0.03928` else `((c+0.055)/1.055)^2.4`).
`scripts/validate_palette.js` does not exist (A.8); every figure above was computed for this
file by a throwaway instrument in the session scratchpad, then the scratchpad was deleted.

**No documented ratio was trusted.** The instrument was self-tested against two reference pairs
before any figure in the table was accepted:

- slate-500 `#64748b` on white returned **4.7588** (spec: 4.76) — PASS
- slate-400 `#94a3b8` on white returned **2.5640**, against appendix N's spec value of **2.51**.
  Appendix N is wrong; 2.56 is correct. This is the exact failure that was caught on Solicitors
  and it reproduces here, which is why the self-test runs first every time.

Worked derivation of the load-bearing cell, copper `#b87333` on white:

```
R = 0xb8/255 = 0.721569  -> ((0.721569+0.055)/1.055)^2.4 = 0.480932
G = 0x73/255 = 0.450980  -> ((0.450980+0.055)/1.055)^2.4 = 0.170138
B = 0x33/255 = 0.200000  -> ((0.200000+0.055)/1.055)^2.4 = 0.033105
L(copper) = 0.2126(0.480932) + 0.7152(0.170138) + 0.0722(0.033105) = 0.226908
L(white)  = 1.000000
ratio = (1.000000 + 0.05) / (0.226908 + 0.05) = 1.05 / 0.276908 = 3.7919  -> 3.79
```

Worked derivation of the chosen button ground, copper-strong `#a0622b` on white:

```
R = 0xa0/255 = 0.627451  -> 0.353741
G = 0x62/255 = 0.384314  -> 0.122139
B = 0x2b/255 = 0.168627  -> 0.023153
L(#a0622b) = 0.2126(0.353741) + 0.7152(0.122139) + 0.0722(0.023153) = 0.163834
ratio = 1.05 / (0.163834 + 0.05) = 1.05 / 0.213834 = 4.9103  -> 4.91
```

---

## 3. Sanctioned deviations

| deviation | owner decision + date |
|---|---|
| `--brand-primary` stays copper `#b87333` and navy `#001b3d` stays the ink and dark ground: a genuine two-hue brand (L.2). Copper is DEMOTED to a graphics-only token on light grounds because it measures 3.79 | TAKEN 2026-09-10 (owner decision 1) |
| Button ground moves to the ramp's 700 step (`#a0622b`, 4.91) rather than the live brand hex, because the brand hex measures 3.79 and the 600 step measures 3.19. This is Property's own shift-to-700 rule, applied | PROPOSED (this delta), gate M-L1 |
| Dark ground stays navy `#001b3d` rather than Property's slate-900 `#0f172a`. Navy is the brand's primary identity colour, not a neutral, and it out-contrasts slate-900 in every pairing measured | PROPOSED (this delta), gate M-L2 |
| Warning / duty / deadline / penalty semantics assigned to M-W1 (red-600 / purple-700 / indigo-700; on-dark 400 steps), off copper and off amber and orange, because the brand is the amber family | TAKEN 2026-09-10 (owner decision 1), swatch PENDING |
| Second typeface removed: Cormorant Garamond dropped, Plus Jakarta Sans only, 131 serif usages across 29 files retired | TAKEN 2026-09-10 (owner decision 2) |
| Footer sister-site block removed | TAKEN 2026-09-10 (owner decision 3, slice 1 owns the edit) |
| Skippable calculator ResultGate ships | TAKEN 2026-09-10 (owner decision 4, slice 2 owns the edit) |
| `rounded-full` retained on genuine circles (step bullets, avatars, radio marks, progress bars) while every button and card moves to `rounded-xl` | (pending) |
| Form-error red retained (`text-red-700`, 6.47), paired with `role="alert"` and `aria-invalid`, never colour alone | (pending) |
| StickyCTA timing (`SCROLL_THRESHOLD 500`, `min(500, 25% of scrollHeight)`) is FROZEN and NOT aligned to Property's 30% | (pending) |
| `data-cta` ids: ZERO renames proposed. Live `vw_cta_performance` continuity beats spelling conformity, and Medical mixes `snake_case` and `kebab-case` | (pending) |
| Research routes keep their one in-flow `LeadForm` (`research/…/page.tsx:1382`) and gain no interruptive surface | (pending) |
| `/admin/analytics` keeps its own palette after the ramp swap (login-gated console, not a brand surface) | (pending) |

---

## 4. Owner-input state (appendix K rows)

| Input | Class | State 2026-09-10 |
|---|---|---|
| Brand colour ramp sign-off (incl. the M-W1 warning ladder) | BLOCKER, blocks Phase 1 | PENDING. Recommendation: amber 50-950 steps; `--brand-primary` stays `#b87333` as a graphics-only token; `--btn-ground #a0622b`; warning ladder M-W1 |
| Button ground = 700 step, not the brand hex | BLOCKER, blocks Phase 1 | PENDING (gate M-L1). Forced by measurement: 3.79 and 3.19 both fail 4.5:1 |
| Dark ground stays navy, not slate-900 | BLOCKER, blocks Phase 1 | PENDING (gate M-L2) |
| Wordmark icon | BLOCKER, blocks Phase 1 | PENDING. Recommendation: `Stethoscope`, fallback `HeartPulse` |
| Wordmark line2 descriptor | BLOCKER, blocks Phase 1 | PENDING. Recommendation: "SPECIALIST ACCOUNTANTS" |
| Backdrop motif | BLOCKER, blocks Phase 1 | PENDING. Recommendation: ECG rhythm strip on chart paper, at Property's exact appendix-E geometry, two tones |
| Favicon set | COSMETIC | Keep whatever `src/app/icon.*` ships; never generate |
| Hero imagery | COSMETIC | None needed; the ECG motif only. The `.hero-brand` gradient + radial glows + gridline data-URI retire |
| Phone number | BLOCKER for schema/copy | `niche.contact.phone` "+44 20 7946 0482" is internal-routing only, NOT displayed publicly and never emitted in JSON-LD (`site.ts:32-35`). Keep that posture |
| GA4 id | INFO | `G-CQF7KFZ1P6`, live and consent-gated via `ConsentedScripts` (`layout.tsx:114`), opt-out posture, storage prefix `ma` FROZEN. Unchanged by this port |
| `niche.config.json` brand reconciliation | BLOCKER for config hygiene | `brand.primary_color` and `seo.theme_color` both say `#0891b2` (cyan). STALE. Reconcile the config TO the CSS (`#b87333`), never the reverse (owner decision 1). `theme_color` is rendered live at `layout.tsx:35`, so a cyan browser chrome ships today against a navy/copper site |
| Font change | BLOCKER by the letter of K; read as NOT triggered | TAKEN 2026-09-10. This is a REMOVAL of a second face. The site already loads and renders Plus Jakarta as `--font-sans`; the reader sees 131 serif headings become the face the rest of the page already uses. Recorded so the owner can veto in one line if he reads it the other way |
| Capture-surface scope | BLOCKER, blocks Phase 1 | PENDING. Proposal: NO new interruptive surfaces and NO cadence change anywhere in slice 3. Restyle only. The one net-new page is `/resources` (index, currently a live 404) |
| Deploy approval | BLOCKER, blocks ship | Owner-triggered in that turn, every time. Nothing here is deployed |

---

## 5. L.3 ramp registry

| Site | Primary ramp | Approved |
|---|---|---|
| Property | emerald | live |
| generalist | orange | APPROVED 2026-09-09 |
| Solicitors | rose | PROPOSED 2026-09-10 |
| Medical | **amber** | PROPOSED 2026-09-10 (this delta) |

Collision check: emerald, orange, rose, amber are four distinct Tailwind families, so no two
ported sites share a primary ramp. Result: **PASS, with one noted adjacency.** Amber and orange
are neighbouring families: amber-700 `#b45309` and orange-700 `#c2410c` are 23 RGB units apart.
The live BRAND hexes are not: Medical `#b87333` and generalist `#f97316` are 71.2 apart, and the
two sites never appear together. Recommendation: proceed. Recorded so it is a decision, not an
oversight.

Carried forward, not precedent: construction-cis (unported) has the live brand `#f97316`, the
same orange as generalist; that collision predates the programme.

Warning-ramp differentiation:
Property = amber / orange / red;
generalist = violet / fuchsia / red-600 / red-800;
Solicitors = amber / orange / fuchsia / violet;
Medical M-W1 = **red-600 / purple-700 / indigo-700**.
Medical shares only red-600 with generalist, in a different position (step 1 here, step 3 there),
and shares nothing with Property or Solicitors. Purple and indigo are used by no other site's
ladder. Medical is the only site whose ladder contains no amber and no orange, which is forced:
its brand IS that family. No site puts red at the top of its ladder.
