# SOLICITORS DESIGN DELTA
Standard: docs/_engines/PROPERTY_STANDARD_ROLLOUT.md appendix + docs/property/DESIGN_SYSTEM.md §0.
An empty section means: Property standard, no exception.
Status 2026-09-10: APPROVED. Owner: "approve all four" (warning ladder W1, wordmark Scale/SPECIALIST ACCOUNTANTS, backdrop motif, wider pricing removal). owner decisions 1-7 TAKEN this day and recorded below. Three rows remain
APPROVED 2026-09-10 (appendix K blockers): brand/warning swatch, wordmark icon + line2,
backdrop motif. Derivation: `docs/solicitors/_port/DISPOSITION_SLICE3.md` §8.

## 1. Brand tokens (the seven swap points)

primary ramp:        rose (Tailwind 4 oklch, verbatim from node_modules/tailwindcss/theme.css)
                     50 #fff1f2, 100 #ffe4e6, 200 #fecdd3, 300 #fda4af, 400 #fb7185,
                     500 #f43f5e, 600 #e11d48, 700 #be123c, 800 #9f1239, 900 #881337, 950 #4c0519
                     THE BRAND HEX IS NOT A RAMP STEP. `--brand-primary` stays #c41e3a
                     (owner decision 1, 2026-09-10). Rose supplies the 50-950 steps a single hex
                     cannot, so the kit's `primary-*` classes resolve; #c41e3a sits between
                     rose-600 (32.2 RGB units) and rose-700 (13.6).
neutral ramp:        slate, unchanged. The site is ALREADY slate (`--ink #0f172a`,
                     `--border #e2e8f0`, `--muted #64748b`), matching Property; nothing to swap.
                     The only exception is the four research routes, a `neutral-*` island that
                     moves TO slate (4 files), removing the one visibly wrong mix
                     (neutral-900 #171717 abutting kit slate-900 #0f172a).
dark ground:         slate-900 #0f172a. Retires `bg-neutral-900` (research) and the full-bleed
                     `bg-[var(--primary)]` heroes on the four pillar statics and
                     /resources/[topic]. Footer #1e293b is slice 1's call; note the brand hex on
                     #1e293b measures 2.50 and must never carry text or a wordmark there.
warning ramp:        OFF red entirely (owner decision 2, APPROVED 2026-09-10: ladder W1).
                     Recommended ladder W1: amber-700 #b45309 -> orange-700 #c2410c ->
                     fuchsia-700 #a21caf -> violet-700 #6d28d9; on-dark steps amber-400 /
                     orange-400 / fuchsia-400 / violet-400. Reason: the brand IS red-family, so a
                     penalty chip on red would read as brand furniture (the L.2 degenerate case).
                     Measured distances from #c41e3a: amber-700 73.9, orange-700 57.8,
                     fuchsia-700 121.9, violet-700 181.5. Weakest link is orange-700 at 57.8; it
                     never sits adjacent to a brand chip without its own label (DS §0.3 direct
                     labelling). Sweep cost priced: 50 amber/orange/red/rose usages in src.
                     Rejected alternatives:
                       W2 (amber-700 / orange-700 / fuchsia-700 / violet-900 #4c1d95): steps 3
                       and 4 differ by value, not hue, so at chip size they collapse into two
                       purples.
                       W3 (sky-700 #0369a1 / indigo-700 #4338ca / fuchsia-700 / violet-700):
                       maximum distance from the brand, but sky-700 is link-blue and collides
                       with the link affordance, and a cool-only ladder has no warm caution entry.
                       W4 (keep Property's red-topped ramp verbatim: amber-700 / orange-700 /
                       red-600 / red-800): cheapest, REJECTED. red-600 #dc2626 is 32.2 RGB units
                       from the brand and red-800 #991b1b is 53.1, so the top two severity steps
                       would be indistinguishable from a brand chip. A.8 locks the CONTRACT
                       (escalating, distinguishable, every step >=4.5:1, first step fully
                       saturated), not Property's specific hues; W1 honours the contract.
                     The one red that stays is the form-error red (`Wizard.tsx:356`,
                     `SpecialistWidget.tsx:460`), paired with `role="alert"` and an icon, never
                     resting on colour alone.
semantic overrides:  `--accent` / `--accent-strong` STAY slate blue (#475569 / #334155). This is a
                     genuine two-hue brand per L.2: crimson = action, slate blue = accent and
                     links (slate-700 links measure 10.35). Do not re-point `--accent-strong` at
                     the brand.
                     ADD to `:root`:
                       --btn-ground:        #c41e3a;  /* white label 5.84 */
                       --btn-ground-hover:  #a01829;  /* white label 7.90 */
                       --btn-ground-active: #881337;  /* rose-900, 9.57 */
font:                Plus Jakarta Sans ONLY (owner decision 3, 2026-09-10). Cormorant Garamond is
                     DROPPED: `layout.tsx:2` (import), `:22-26` (loader), `:82`
                     (`${cormorant.variable}`) and `globals.css:65`
                     (`--font-serif: var(--font-cormorant)`) all removed. Wiring stays
                     `@theme inline { --font-sans: var(--font-plus-jakarta) }` with the
                     `--font-serif` line deleted.
                     194 `font-serif` uses retire (80 of them in slice 3); the brief's "~193" is
                     one short of the grep, which returns 194 across 39 files. The site already
                     loads Plus Jakarta, so this is a REMOVAL of a second face, not a switch of
                     the primary face, and it matches Property (single sans, no serif).
                     Weights 400,500,600,700 (add 800 if an 800 usage lands). Body line-height
                     1.5 -> 1.6. Headings inside `@layer base`: weight 700, letter-spacing
                     -0.02em; `line-height: 1.2` UNLAYERED on purpose (A.3 / trap 7.1).
button constants:    box model per A.5 (`min-h-12`, `min-w-[10rem]`, `px-8 py-3.5`,
                     `text-base font-bold`, `rounded-xl`); colour tokens only.
                     Ground = the live brand hex, NOT the ramp's 600 or 700 step. White on
                     #c41e3a measures 5.84 and clears the 4.5:1 floor, so L.2's shift-to-700
                     remedy does not apply here. It applied to generalist only because
                     orange-600 measured 3.56 (verified). Shifting to rose-700 (6.29) would
                     change the visible colour of every button on the site for zero contrast
                     gain. CORRECTION: an earlier recommendation in this programme proposed
                     rose-700 as the button ground; that is superseded by owner decision 1 and
                     must not be re-applied.
                     focusRing -> `outline-primary-600` (rose-600 on white 4.70, past the 3:1
                     graphics floor). Real `btnOnDark` lands; the CSS `.btnOnDark` twin at
                     `globals.css:177-198` puts `color: var(--primary)` on
                     `background: var(--accent)` and is deleted with its zero-consumer siblings.
wordmark:            icon = `Scale` (lucide), fallback `Gavel`; line1 "ACCOUNTS FOR LAWYERS";
                     line2 "SPECIALIST ACCOUNTANTS". APPROVED 2026-09-10 (appendix K).
                     Rejected: `Landmark`/`Building2` (says court), `BookOpen` (says publisher),
                     `Calculator` (every accountancy brand uses it). Icon
                     `text-[var(--brand-primary)]` on light (graphic, 5.84 clears 3:1),
                     `text-rose-400` on dark (6.63); the brand hex is 3.06 on slate-900 and 2.50
                     on #1e293b, so it must never carry the dark wordmark. `aria-label` built
                     from the visible strings (WCAG 2.5.3).
backdrop motif:      APPROVED 2026-09-10. Proposal (slice 3): ruled COLUMN LEDGER, evenly
                     spaced vertical rules at ~34px pitch, two heavier rules marking a
                     debit/credit fold, sparse horizontal rules stopping short of the edges,
                     3-4 short tick entries at 1.5x stroke; ~26 SVG lines, `aria-hidden`.
                     Two tones: navy `stroke-rose-400` at .18, mask `to left, black 35% ->
                     transparent 92%`; cream `stroke-[var(--brand-primary)]` at .10, mask
                     45%/97%. Geometry is Property's exactly (appendix E):
                     `absolute inset-y-0 right-0 w-[55%] hidden sm:block`, host
                     `relative overflow-hidden`, content `relative z-10`.
                     File: `src/components/layout/SolicitorsBackdrop.tsx`.
                     Rejected: scales/gavel imagery (the wordmark already carries it, and a gavel
                     is American iconography for an English-law brand), columns/pediment (says
                     courthouse), abstract blobs (says nothing).
cream surface:       #fbfaf7 (Property's value; the site has no incumbent cream to preserve).
radius:              `--radius: 0rem`; `--radius-xl: calc(var(--radius) + 4px)` = 4px;
                     `--btn-radius: var(--radius-xl)`. None of the three exists today, which is
                     why every button renders as `border-radius: 9999px`
                     (`globals.css:137`, `layout-utils.ts:21`); the standard's square
                     `rounded-xl` replaces the pills. Cards move off the pre-redesign
                     `border` + 1rem recipe (`.card-premium`, `.card-flat`) to
                     `rounded-xl` + `ring-1 ring-slate-200/70`.
glow channel tokens: --brand-glow 225 29 72 (rose-500 adjacent); --brand-glow-deep 196 30 58
                     (the brand); --brand-glow-edge 251 113 133 (rose-400); --brand-glow-faint
                     255 228 230 (rose-100). A crimson glow reads hotter than emerald at equal
                     alpha; if it reads hot at 390/768/1440, drop card-glow alphas 0.28/0.4 to
                     0.22/0.32 as a recorded deviation.
plumbing:            `globals.css` gains, in this order: `@import "tw-animate-css";` then
                     `@import "@accounting-network/web-shared/design/globals-standard.css";`
                     then `:root`. `package.json` MUST gain `"tw-animate-css": "^1.4.0"` in the
                     SAME commit (it currently resolves from the hoisted root node_modules by
                     accident). Strip the UTF-8 BOM and the mojibake comments at
                     `globals.css:1,6,8`.

## 2. Measured contrast table

4.5:1 text floor, 3:1 graphics floor. WARNING = fails today on a live surface. Grounds:
white #ffffff, cream #fbfaf7, slate-50 #f8fafc (the site's `--background`), navy #0f172a,
footer #1e293b, research dark #171717.

| token | usage | ground | ratio | verdict |
|---|---|---|---|---|
| brand #c41e3a | button ground, white label | (label on brand) | 5.84 | PASS, no 700-step shift needed |
| brand #c41e3a | body / link text | white | 5.84 | PASS |
| brand #c41e3a | h2 / stat text | cream / slate-50 | 5.60 / 5.58 | PASS |
| brand #c41e3a | eyebrow / accent text | navy #0f172a | 3.06 | WARNING FAIL, never on navy |
| brand #c41e3a | research eyebrow, 14px semibold | research dark #171717 | 3.07 | WARNING LIVE FAIL x3: `research/uk-legal-incorporation-index/page.tsx:177`, `research/law-firm-survival-index/page.tsx:182`, `research/uk-solicitor-profession-structure/page.tsx:190`. Fix: `text-rose-300` (9.44) or `text-rose-400` (6.63) |
| brand #c41e3a | wordmark / text | footer #1e293b | 2.50 | WARNING FAIL, never on the footer |
| crimson-dark #a01829 | button hover, white label | (label on hover ground) | 7.90 | PASS |
| crimson-soft #d63851 | current `btnPrimary:hover`, white label | (label on hover ground) | 4.62 | PASS, but only just; #a01829 is the better hover |
| crimson-muted #e05268 | text | white | 3.77 | WARNING FAIL for text, graphics only |
| crimson-light #eb6c7f | text | white | 3.01 | WARNING FAIL |
| white | button label | brand #c41e3a | 5.84 | PASS |
| white | button label | hover #a01829 | 7.90 | PASS |
| white | button label | active rose-900 #881337 | 9.57 | PASS |
| white | body text | navy / footer #1e293b | 17.85 / 14.63 | PASS |
| rose-300 #fda4af | accent / eyebrow on dark | navy | 9.44 | PASS, the on-navy accent |
| rose-400 #fb7185 | accent / motif stroke on dark | navy / #1e293b | 6.63 / 5.44 | PASS |
| rose-600 #e11d48 | focus ring (graphic, 3:1) | white | 4.70 | PASS |
| rose-700 #be123c | text | white / cream | 6.29 / 6.02 | PASS (available, deliberately NOT adopted for the button) |
| rose-900 #881337 | button active ground, white label | (see white row) | 9.57 | PASS |
| slate-blue-strong #334155 (`--accent-strong`) | every legal and contact link | white | 10.35 | PASS, keep the second hue |
| slate-600 #475569 | body | white | 7.58 | PASS |
| slate-500 #64748b | fine print 11px | white / cream / slate-50 | 4.76 / 4.56 / 4.55 | PASS |
| slate-400 #94a3b8 | text | white | 2.56 | WARNING FAIL, graphic fills only |
| slate-300 #cbd5e1 | body text on dark | navy | 12.02 | PASS |
| neutral-400 #a3a3a3 | "Updated {date}" and table parentheticals | white | 2.52 | WARNING LIVE FAIL: `research/page.tsx:90`, and `research/uk-legal-incorporation-index/page.tsx:323,327,331,335`. Fix: `text-slate-500` (4.76) |
| neutral-500 #737373 | fine print | white | 4.74 | PASS (retires with the neutral island) |
| W1 step 1 amber-700 #b45309 | a duty bites | white / cream / slate-50 | 5.02 / 4.81 / 4.80 | PASS |
| W1 step 2 orange-700 #c2410c | escalation, deadline passed | white / cream / slate-50 | 5.18 / 4.96 / 4.95 | PASS |
| W1 step 3 fuchsia-700 #a21caf | no relief | white / cream / slate-50 | 6.32 / 6.06 / 6.04 | PASS |
| W1 step 4 violet-700 #6d28d9 | criminal / regulatory track | white / cream / slate-50 | 7.10 / 6.81 / 6.79 | PASS |
| W1 on-dark step 1 amber-400 #fbbf24 | duty chip on dark | navy | 10.69 | PASS |
| W1 on-dark step 2 orange-400 #fb923c | escalation on dark | navy | 7.89 | PASS |
| W1 on-dark step 3 fuchsia-400 #e879f9 | no relief on dark | navy | 7.25 | PASS |
| W1 on-dark step 4 violet-400 #a78bfa | criminal track on dark | navy | 6.56 | PASS |
| red-600 #dc2626 | form-error text (the one retained red) | white | 4.83 | PASS, kept with `role="alert"` and an icon, never colour alone |
| kit `DrawnTickList` default tick emerald-400 #34d399 | tick colour | white | 1.92 | WARNING below the 3:1 graphics floor, pass `tickClassName="text-[var(--btn-ground)]"` (brand tick on white = 5.84) |
| `.btnOnDark` CSS twin | `color: var(--primary)` on `background: var(--accent)` | #475569 | 1.30 | WARNING FAIL, dead class, delete (`globals.css:177-198`) |

Method: ratio = (L1+0.05)/(L2+0.05) on WCAG relative luminance, sRGB. `scripts/validate_palette.js`
does not exist (A.8); every figure above was hand-computed for this file. Instrument self-test
passed both reference pairs before any figure was trusted: slate-500 #64748b on white = 4.7588
(4.76) and slate-400 #94a3b8 on white = 2.5640 (2.56).

Two figures supplied to this file were WRONG and are corrected above:

1. `.btnOnDark` CSS twin. Slice 3 §8.3 records 1.85. The class sets `background: var(--accent)`
   (#475569) and `color: var(--primary)` (#c41e3a); that pair measures 1.30. The verdict (dead
   class, delete) is unchanged.
2. violet-700 RGB distance from the brand. Slice 3 §8.2 records 143.6. #6d28d9 against #c41e3a
   is 181.5. The direction of the finding (violet-700 is the FURTHEST step from the brand) is
   unchanged and in fact stronger.

One rounding note, not an error: slice 3 quotes the research eyebrow failure as "~3.05"; the exact
figure on #171717 is 3.07. Both are well under 4.5 and the disposition is unchanged.

## 3. Sanctioned deviations

| deviation | owner decision + date |
|---|---|
| Button ground pinned to the live brand hex #c41e3a rather than the ramp's 600 or 700 step (white label 5.84 already clears 4.5:1; a shift would recolour every button for zero gain). Supersedes the earlier rose-700 recommendation in this programme | TAKEN 2026-09-10 (owner decision 1) |
| Warning / duty / penalty semantics reassigned OFF red to W1 (amber-700 / orange-700 / fuchsia-700 / violet-700; on-dark 400 steps), because the brand is red-family | TAKEN 2026-09-10 (owner decision 2), swatch APPROVED 2026-09-10 |
| Second typeface removed: Cormorant Garamond dropped, Plus Jakarta Sans only, 194 `font-serif` uses retired | TAKEN 2026-09-10 (owner decision 3) |
| Footer sister-site cross-links to dentalfinancepartners.co.uk and medicalaccounts.co.uk REMOVED; footer takes the kit/Property shape (`SiteFooter.tsx:17-40`) | TAKEN 2026-09-10 (slice 1 owner decision 5) |
| Two-hue brand retained: crimson = action, slate blue = accent and links (10.35); `--accent-strong` is NOT re-pointed at the brand | TAKEN 2026-09-10 (owner decision 7 context) |
| /admin console keeps `rose-*` as its "weak metric" signal after the ramp swap (noindex, not a brand surface; 11 of the 12 rose usages) | (pending) |
| Form-error red retained, paired with `role="alert"` and an icon, never colour alone | (pending) |
| StickyCTA keeps min(500px, 25%) vs Property's 30%; timing is FROZEN | (pending) |
| `deep_scroll_close` kept over the canonical `deep_scroll_modal_close` (analytics continuity) | (pending) |
| `ExampleFigureNote` gains a source `label` on official-statistics research pages (its literal "Example figures displayed" is false over Companies House / SRA / ONS data) | (pending, estate-level) |
| Research routes have zero capture surfaces and gain none | (pending) |
| `data-cta` ids: zero renames proposed; live `vw_cta_performance` continuity beats spelling conformity | (pending) |

## 4. Owner-input state (appendix K rows)

| Input | Class | State 2026-09-10 |
|---|---|---|
| Brand colour ramp sign-off (incl. the W1 warning ladder) | BLOCKER, blocks Phase 1 | APPROVED 2026-09-10. Recommendation: rose 50-950 steps, brand hex #c41e3a retained as the button ground, warning ladder W1 |
| Wordmark icon | BLOCKER, blocks Phase 1 | APPROVED 2026-09-10. Recommendation: `Scale`, fallback `Gavel` |
| Wordmark line2 descriptor | BLOCKER, blocks Phase 1 | APPROVED 2026-09-10. Recommendation: "SPECIALIST ACCOUNTANTS" |
| Backdrop motif | BLOCKER, blocks Phase 1 | APPROVED 2026-09-10. Recommendation: ruled column ledger at Property's E geometry, two tones |
| Favicon set | COSMETIC | Keep `src/app/icon.svg`; never generate |
| Hero imagery | COSMETIC | None needed; ledger motif only. The full-bleed crimson heroes retire |
| Phone number | BLOCKER for schema/copy | `niche.contact.phone` "+44 20 7946 0157", NOT displayed publicly today (`site.ts:32-33`) and no public telephone in schema. Keep that posture |
| GA4 id | INFO | G-N6ZPRB3DSQ, live and consent-gated (`niche.config.json -> seo.google_analytics_id`, rendered at `layout.tsx:107`). Unchanged |
| Font change | BLOCKER by the letter of K; read as NOT triggered here | TAKEN 2026-09-10: Cormorant Garamond dropped, Plus Jakarta Sans only. This is a REMOVAL of a second face, not a switch of the primary face: the site already loads and renders Plus Jakarta as `--font-sans` and body copy does not change. K's gate exists to stop a live site's typeface changing under the reader; the reader sees only 194 serif headings become the face the rest of the page already uses. Recorded here for the record, and bundled into the same swatch turn so the owner can veto in one line if he reads it the other way |
| Capture-surface scope | BLOCKER, blocks Phase 1 | APPROVED 2026-09-10. Proposal: no new interruptive surfaces in slice 3; restyle only. The one addition is an in-flow `LeadCTAPanel` on the net-new /resources index. Research routes stay capture-free |
| Deploy approval | BLOCKER, blocks ship | Owner-triggered in that turn, every time. Nothing is deployed by this delta |

## 5. L.3 ramp registry

| Site | Primary ramp | Approved |
|---|---|---|
| Property | emerald | live |
| generalist | orange | APPROVED 2026-09-09 |
| Solicitors | rose | PROPOSED 2026-09-10 (this delta) |

Collision check: emerald, orange and rose are three distinct Tailwind families, so NO two ported
sites share a primary ramp. Result: PASS.

Carried forward, not precedent: construction-cis (unported) has the live brand #f97316, the same
orange as generalist; that collision predates the programme.

Warning-ramp differentiation: Property = amber / orange / red; generalist = violet / fuchsia /
red-600 / red-800; Solicitors = amber / orange / fuchsia / violet. Solicitors and generalist share
fuchsia-700 and violet-700 as steps, but in different positions and with different terminal steps.
Check generalist's delta before locking §1's warning row, and note that neither site may put red
at the top of its ladder.
