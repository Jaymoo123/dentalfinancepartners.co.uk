# GENERALIST DESIGN DELTA
Standard: docs/_engines/PROPERTY_STANDARD_ROLLOUT.md appendix + docs/property/DESIGN_SYSTEM.md §0.
An empty section means: Property standard, no exception.
Status 2026-09-09: APPROVED. Owner: "go with all recommendations" (same day). Every (pending) row below is TAKEN as recommended; dates in section 3/4.

## 1. Brand tokens (the seven swap points)

primary ramp:        orange — Tailwind 4 oklch, verbatim from node_modules/tailwindcss/theme.css
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

neutral ramp:        keep generalist warm neutral for text/hairlines (APPROVED 2026-09-09)
dark ground:         slate-900 #0f172a (recommended even under warm neutrals — the kit's navy
                     components are unparameterised; APPROVED 2026-09-09)
warning ramp:        off amber/orange. APPROVED 2026-09-09 = C1
                     violet-700 -> fuchsia-700 -> red-600 -> red-800 with on-dark variants
                     violet-400 / fuchsia-400 / red-400. Full measurements in
                     _port/DISPOSITION_SLICE3.md §8.
semantic overrides:  --accent-strong orange-600 -> orange-700 for TEXT use (L.2 600-step rule;
                     fixes a live 3.56:1 failure on every article and legal link);
                     --primary stays orange-500 for non-text brand surfaces
font:                Geist Sans + Geist Mono KEPT (K default). Wiring:
                     @theme { --font-sans: var(--font-geist-sans); --font-mono: var(--font-geist-mono); }
                     Changes: body line-height 1.7 -> 1.6; h1..h6 weight 600 -> 700; heading
                     line-height 1.2 UNLAYERED per A.3/trap 7.1 (currently 1.1 inside the layer).
                     RETIRE font-serif on the legal h1 (no serif face wired).
button constants:    box model per A.5, colour tokens only. btnPrimary ground = primary-700
                     (recommended B1: white-on-orange fails 4.5:1 at every step below 700;
                     current bg-orange-500 = 2.80:1, a live WCAG failure). focusRing =
                     outline-primary-600. Real btnOnDark lands; ink outline renamed btnOnCream.
wordmark:            icon = Briefcase; line1 = "HOLLOWAY DAVIES"; line2 = "ACCOUNTANTS"
                     (APPROVED 2026-09-09, all-recommendations grant)
backdrop motif:      ruled ledger grid (proposed): horizontal rules ~28px pitch + sparse column
                     rules + 2-3 tick-mark entries; navy tone stroke-primary-400 @ .18, cream
                     tone stroke-primary-600 @ .10; E geometry (right 55%, masked). APPROVED 2026-09-09
cream surface:       #fafaf7 (generalist's own; Property's hero cream #fbfaf7 NOT synced)
radius:              --radius: 0rem; --radius-xl: calc(var(--radius) + 4px) = 4px (fixes the
                     live 0px computation); --btn-radius: var(--radius-xl)
                     added (kit buttons currently render as 9999px pills here)
glow channel tokens: --brand-glow 249 115 22; --brand-glow-deep 234 88 12;
                     --brand-glow-edge 251 146 60; --brand-glow-faint 255 237 213
                     (orange glow reads hotter than emerald at equal alpha; if hot at render,
                     drop card-glow alphas 0.28/0.4 -> 0.22/0.32 as a recorded deviation)

## 2. Measured contrast table (4.5:1 floor; ⚠ fails today, fixed by this delta)

| token | usage | ground | ratio | verdict |
|---|---|---|---|---|
| primary-500 | button ground, white label | — | 2.80 | ⚠ FAIL (current btnPrimary) |
| primary-600 | button ground, white label | — | 3.56 | ⚠ FAIL |
| primary-700 | button ground, white label | — | 5.18 | PASS (recommended) |
| primary-700 | link/inline text | white / cream | 5.18 / 4.95 | PASS |
| primary-600 | .prose-blog a (current --accent-strong) | white | 3.56 | ⚠ FAIL site-wide |
| primary-600 | focus ring (graphic, 3:1) | white | 3.56 | PASS graphics |
| primary-500 | focus ring (current) | white | 2.80 | ⚠ FAIL even at 3:1 |
| primary-400 | accent/eyebrow on dark | slate-900 / neutral-900 | 7.89 / 7.92 | PASS |
| primary-500 | accent text | cream #fafaf7 | 2.68 | ⚠ FAIL (live on /about, /contact, /thank-you) |
| primary-600 | tick colour (tickClassName) | white | 3.56 | PASS graphics |
| primary-800 | research stat figures | slate-50 / cream | 6.98 / 6.99 | PASS |
| neutral-500 | fine print 11px | white / cream | 4.74 / 4.53 | PASS |
| neutral-400 (--ink-whisper) | text | white | 2.52 | ⚠ FAIL — retire |
| neutral-600 | body | white | 7.81 | PASS |
| warning C1 step 1 violet-700 | duty chip | white / cream | 7.10 / 6.79 | PASS |
| warning C1 step 1-dark violet-400 | duty chip | slate-900 / neutral-900 | 6.56 / 6.59 | PASS |
| warning C1 step 2 fuchsia-700 | escalation | white / cream | 6.32 / 6.05 | PASS |
| warning C1 step 3 red-600 | no relief | white / cream | 4.83 / 4.62 | PASS |
| warning C1 step 4 red-800 | criminal track | white / cream | 8.31 / 7.95 | PASS |
| white | on primary-700 button | — | 5.18 | PASS |
| team monogram white text | per-member monogramColor | — | UNMEASURED | measure each in team/[slug]/data.ts |

Method: ratio = (L1+0.05)/(L2+0.05), WCAG relative luminance, sRGB. `scripts/validate_palette.js`
does not exist (A.8); values hand-computed, re-derivable from the formula.

## 3. Sanctioned deviations

| deviation | owner decision + date |
|---|---|
| warm neutral text/hairlines retained while kit components ship slate | APPROVED 2026-09-09 |
| dark ground adopts slate-900 while text neutrals stay warm | APPROVED 2026-09-09 |
| btnPrimary ground shifts to primary-700 (white-label contrast) | APPROVED 2026-09-09 |
| duty/penalty ramp = violet-700 / fuchsia-700 / red-600 / red-800 (on-dark: violet-400 / fuchsia-400 / red-400) | APPROVED 2026-09-09 |
| StickyCTA keeps generalist's min(500px, 25%) threshold vs Property's 30% | APPROVED 2026-09-09 |
| ExampleFigureNote label prop on official-statistics research pages | APPROVED 2026-09-09 |
| cream surface #fafaf7 vs Property's #fbfaf7 | APPROVED 2026-09-09 |

## 4. Owner-input state (appendix K rows)

| Input | Class | State 2026-09-09 |
|---|---|---|
| Brand colour ramp sign-off | BLOCKER | APPROVED 2026-09-09 (all-recommendations grant) |
| Wordmark icon | BLOCKER | APPROVED 2026-09-09: Briefcase |
| Wordmark line2 descriptor | BLOCKER | APPROVED 2026-09-09: "ACCOUNTANTS" (recommendation default) |
| Favicon set | COSMETIC | keep existing, never generate |
| Hero imagery | COSMETIC | none needed; ledger-grid motif only (photo heroes retire) |
| Phone number | BLOCKER for schema/copy | use niche.config value; no public telephone in schema |
| GA4 id | INFO | unchanged |
| Font change | BLOCKER | NOT proposed: Geist retained |
| Capture-surface scope | BLOCKER | APPROVED 2026-09-09: ResultGate set (+index copy softened), ~30 closing panels, newsletter demotions, redirect flips, StickyCTA homepage-only, CalcPromoCard killed, NextStepOffer kept restyled |
| Deploy approval | BLOCKER | owner-triggered, every time |

## 4b. Bundle decisions taken with the same grant (2026-09-09)

- Hero live-pulse badge subject: MTD for sole traders (figures re-verified against house_positions at build).
- Testimonials: OMITTED until the owner supplies real anonymisable quotes; never invented.
- /team/[slug]: DELETE route + Person schema (faceless-authority rule; route was orphaned).
- Blog: CalcPromoCard killed (experiment closed); NextStepOffer kept, restyled.
- ResultGate ships estate-wide on calculator pages; /calculators standfirst softened to
  "no sign-up, and you can always skip straight to the number".
- data-cta ids: generalist's existing ids KEPT, canonical mapping recorded (no analytics forks).
- employer-NI: bespoke multi-employee page is canonical; the registry duplicate is resolved in
  Phase 4 without breaking the live /embed/employer-ni-calculator URL (usage checked first).

## 5. L.3 ramp registry

| Site | Primary ramp | Approved |
|---|---|---|
| Property | emerald | live |
| generalist | orange | APPROVED 2026-09-09 |

Collision note: construction-cis's brand is also #f97316. Unavoidable (both incumbent live brands
under the keep-default). Recorded so it never becomes precedent; the two sites' WARNING ramps must
differ — check construction-cis's delta before locking §1's warning row.
