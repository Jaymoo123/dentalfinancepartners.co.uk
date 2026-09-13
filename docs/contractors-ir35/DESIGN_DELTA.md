# CONTRACTORS-IR35 DESIGN DELTA

Standard: `docs/_engines/PROPERTY_STANDARD_ROLLOUT.md` appendix A/D/E/K/L + `docs/property/DESIGN_SYSTEM.md` §0 (the ten-part page contract, estate-wide verbatim, never forked per site).
An empty section means: Property standard, no exception.

Status 2026-09-12: **PROPOSED. Nothing built, nothing deployed.** Production serves
`18b4f25f39cd0c4aa084e582d69a87c8a10710ac` and `git log 18b4f25f..HEAD --oneline -- contractors-ir35/`
returns nothing, so this site has a clean baseline: nothing of its own rides the cutover. 24 commits
under `packages/` from the five sibling ports do (`P0B_DEPLOY_BASELINE.md`).

**The single most important measurement in this file: cyan-600 `#0891b2` measures 3.68:1 both as
text on white and as a ground under white text.** The standard's recipes are written on
`primary-600`. This site's live brand hex is `#0e7490`, which is cyan-**700** exactly, and it
measures 5.36:1 in both roles. So the ramp is adopted whole but every `primary-600` recipe binds
one step darker here. Every recommendation in §1 and §2 follows from that number.

Derivation and evidence: `docs/contractors-ir35/_port/` (P0A inventory, P0B deploy baseline,
P0D CSS/a11y, P0E crawl integrity). This file is the contract; those are the evidence.

Structural note against appendix L.1: L.1 says this file carries four sections and nothing else.
Sections 5 to 8 below exist because the phase 1 brief (current owner instruction, which outranks
this doc per the confusion protocol) requires the capture-surface list, the Property defects not to
copy, the phase 0 hazard dispositions and the IA pricing to be settled before the first component
is written. They are recorded here rather than invented later.

---

## 1. Brand tokens (the seven swap points)

Ramp hexes are the Tailwind v4 palette. Source for the oklch definitions:
`grep -n "color-cyan-" node_modules/tailwindcss/theme.css` (lines 106-116).

```
primary ramp:        cyan. THE BRAND HEX IS A RAMP STEP: #0e7490 IS cyan-700 exactly,
                     so no snapping and no off-ramp hex is needed (contrast with Solicitors,
                     whose #c41e3a sits between rose-600 and rose-700).
                       cyan-50  #ecfeff   cyan-500 #06b6d4   cyan-900 #164e63
                       cyan-100 #cffafe   cyan-600 #0891b2   cyan-950 #083344
                       cyan-200 #a5f3fc   cyan-700 #0e7490  <- brand, and the site's live value
                       cyan-300 #67e8f9   cyan-800 #155e75
                       cyan-400 #22d3ee
                     BINDING STEP SHIFT (per L.2's "if the 600 step fails 4.5:1 for text use,
                     shift text usages to the 700 step and say so in the delta"): here the 600
                     step fails BOTH the text role and the ground role, so the shift is not
                     text-only. Bind:
                       --brand-primary        = cyan-700 #0e7490   (graphic + button ground)
                       --brand-primary-strong = cyan-800 #155e75   (hover/active)
                       --brand-primary-text   = cyan-800 #155e75   (text on light; the playbook
                                                §8 token, read by web-shared MiniCapture)
                       --brand-primary-ground = cyan-700 #0e7490   (ground under a white label;
                                                the playbook §8 token, read by ServiceTiers)
                       on-navy accent         = cyan-400 #22d3ee   (9.88 on #0f172a)
                     The site ALREADY encodes this two-token split by hand (`--accent` #0e7490
                     for grounds, `--accent-strong` #155e75 for text on light). The port keeps
                     the split and gives it the estate's token names.

neutral ramp:        DEVIATION, see §3 row N1. The site is `neutral` (Tailwind's true grey), not
                     slate. Measured: 556 `neutral-*` occurrences in 52 files vs 194 `slate-*`
                     (grep -roh over src, --include=*.tsx --include=*.ts). Recommendation: adopt
                     slate estate-wide, 556-occurrence sweep, priced in §8.

warning ramp:        amber, unchanged, and the site is ALREADY on the standard's first step:
                     globals.css:26 `--highlight: #b45309` IS amber-700 (5.02 on white), and
                     :27 `--highlight-on-dark: #fbbf24` IS amber-400 (10.69 on navy). The
                     estate penalty ladder amber-700 / orange-700 / red-600 / red-800 measures
                     5.02 / 5.18 / 4.83 / 8.31 on white, all passing. NO collision with the
                     primary: cyan is nowhere near amber or orange, so this site does not have
                     construction-cis's problem. Total amber+orange usage today: 15 occurrences.

semantic overrides:  (vars that differ from appendix A.1)
                     --surface        #fafaf7  warm off-white. Standard page ground is
                                               #ffffff with slate-50 #f8fafc as the alternate,
                                               and the cream #fbfaf7 is a HERO surface only.
                                               This site paints #fafaf7 on <body>. See §3 row N2.
                     --ink            #0a0a0a  near-black. Standard ink is slate-900 #0f172a.
                                               Falls out of the §3 N1 slate decision.
                     --ink-soft       #525252  = neutral-600. Standard is slate-700 #334155.
                     --ink-whisper    #a3a3a3  = neutral-400, 2.38 on #fafaf7. TEXT USE OF THIS
                                               TOKEN IS A CONTRAST FAILURE WHEREVER IT LANDS;
                                               the port must not carry it into text. Not yet
                                               audited per call site: UNVERIFIED.
                     --hairline       #e5e5e5  = neutral-200. Standard card edge is
                                               `ring-1 ring-slate-200/70` on #e2e8f0.
                     --radius         0rem     AGREES with the standard's token literally, but
                                               the standard then derives
                                               `--radius-xl: calc(var(--radius) + 4px)` and
                                               pins `--btn-radius: var(--radius-xl)`. Neither
                                               exists here, so every surface renders square and
                                               web-shared buttons render at their 9999px pill
                                               default. Adopting both is mechanical port work,
                                               not a deviation. Current radius census:
                                               rounded-xl 33, rounded-2xl 30, rounded-full 25,
                                               rounded-lg 24 (grep -roh "rounded-[a-z0-9]*").
                     chart tokens     ABSENT. No `--chart-1..5` in globals.css. The three
                                               research chart components hand-pick colours.
                                               §4.6.11 requires charts to re-ramp through
                                               `--chart-1..5`; defining them is port work.

font:                KEEP. Geist Sans + Geist Mono, imported from the `geist` package
                     (`geist@^1.7.0` in package.json), wired in `src/app/layout.tsx:2-3,71` as
                     `GeistSans.variable` + `GeistMono.variable`, and bound in globals.css
                     `@theme inline` as `--font-sans: var(--font-geist-sans)` and
                     `--font-mono: var(--font-geist-mono)`.
                     This is the §4.6.5 default and it is what this delta PROPOSES: the site
                     keeps its typeface. Switching to Plus Jakarta Sans is an appendix K owner
                     gate and is NOT assumed anywhere below. See owner question 3.
                     WHAT DEPENDS ON THE MONO FACE (so a font change is not a one-line edit):
                       - globals.css `.font-mono, .font-geist-mono` (lines 118-121)
                       - globals.css `.eyebrow` (lines 123-132) sets the mono family EXPLICITLY,
                         so every eyebrow on the site is set in Geist Mono, not just numerals.
                         The standard's eyebrow is sans. See §3 row N3.
                       - the standard's stat-value and calculator-result styles are
                         `font-mono tabular-nums`; they resolve through `--font-mono`.
                     Weights: Geist variable, so no weight list to pin. Body is 16px / 1.7
                     (standard is 16 / 1.6) with `font-feature-settings: "ss01" on, "cv11" on`.

button constants:    colour tokens only; box model moves TO the standard. Current
                     `src/components/ui/layout-utils.ts:17` btnPrimary is
                     `min-h-12 bg-cyan-700 px-7 py-3.5 text-sm font-medium`, square.
                     Standard box: `min-h-12 min-w-[10rem] px-8 py-3.5 text-base font-bold
                     rounded-xl`. Deltas to close: add `min-w-[10rem]`, px-7 -> px-8,
                     text-sm -> text-base, font-medium -> font-bold, add rounded-xl.
                     Colours already pass: white on cyan-700 = 5.36.
                     `btnOnTeal` (neutral-900 ground) and `btnSecondary`/`btnOnDark`
                     (btnOnDark is an ALIAS of btnSecondary, line 29, so this site has no true
                     on-dark recipe) are re-derived from A.5 as port work.

wordmark:            NEEDS AN OWNER PICK (appendix K BLOCKER). Today
                     `src/components/brand/BrandWordmarkHomeLink.tsx` is a single-line lockup:
                     a plain `h-7 w-7 rounded-sm bg-cyan-700` SQUARE (no icon at all) plus the
                     display name, with the tagline carried only in the aria-label. The
                     standard's is a two-line stacked lockup: niche icon + tracked-out name /
                     rule / descriptor.
                     PROPOSAL: icon = lucide `FileBadge` (a contract with a mark on it: IR35
                     status determination is literally the contract review this site sells).
                     FALLBACK: lucide `Briefcase` (the independent contractor).
                     line1 "CONTRACTOR TAX", line2 "ACCOUNTANTS · IR35 SPECIALISTS".
                     `lucide-react@^1.7.0` is already a dependency, so no new package.
                     The `max-w` cap behaviour interacts with the header contract (appendix B)
                     and is preserved exactly.
                     ALSO REQUIRED when the kit chrome lands (playbook §8): pass
                     `SiteHeader.wordmarkAccentColor="#0e7490"`. The kit default is
                     `primary-600`, which on this site is the 3.68:1 step, so leaving it
                     unset ships a wordmark that both fails contrast and visibly differs from
                     the CTA next to it. This is the exact defect Solicitors shipped first.

backdrop motif:      NEEDS AN OWNER PICK (appendix K BLOCKER), and it is entangled with the
                     photography decision in §3 row N4. The site has NO SVG motif. Its heroes
                     are hot-linked Pexels photographs behind a near-opaque gradient
                     (`src/app/page.tsx:161-168`, plus `locations/page.tsx` and
                     `locations/[slug]/page.tsx`). The standard ships zero photography.
                     PROPOSAL: a thin-stroke "timesheet grid" motif (regular vertical rules
                     with a broken diagonal, reading as a contract/timesheet ruled page) at the
                     standard's recipe: 55% width, hidden below sm, masked to transparent.
                     Strokes: light ground `rgba(14,116,144,0.14)` (cyan-700 at 14%),
                     navy ground `rgba(34,211,238,0.18)` (cyan-400 at 18%).

cream surface:       #fafaf7 (already the site's `--surface`). Standard cream is #fbfaf7.
                     The two differ by one unit of blue and are not distinguishable; keeping
                     #fafaf7 means the existing `bg-[#fafaf7]` literals in `page.tsx` do not
                     all have to be rewritten. RECOMMENDATION: keep #fafaf7 as the cream HERO
                     surface, and stop using it as the body ground (§3 row N2).
```

### 1a. Do the two brand-colour sources agree?

**Yes, all three of them, exactly.** No reconciliation work.

| Source | Key | Value | Command |
|---|---|---|---|
| `contractors-ir35/niche.config.json` | `brand.primary_color` | `#0e7490` | `cat contractors-ir35/niche.config.json` |
| `contractors-ir35/niche.config.json` | `seo.theme_color` | `#0e7490` | same |
| `contractors-ir35/web/src/app/globals.css:23` | `--accent` | `#0e7490` | `sed -n '23p' contractors-ir35/web/src/app/globals.css` |

`niche.config.json` lives at the SITE ROOT, not inside `web/`; `find contractors-ir35/web -iname niche.config.json` returns nothing. Nor is there a rival config to reconcile under §4.6.9: `src/config/site.ts` is a pass-through that reads every field off the niche loader with zero independent literals (verified by full read in `P0A_INVENTORY.md` §5). Two tests consume it and are gates on any change: `src/lib/niche-config.test.ts` and `src/lib/resources/resources.test.ts`.

---

## 2. Measured contrast table

Method: WCAG relative luminance, sRGB to linear per channel, `(L1+0.05)/(L2+0.05)`. Hand-computed, because `browser_check.mjs` cannot resolve `var()` chains and 13 files on this site theme through them (§6 row H2). Script: scratchpad `c.py`, which self-tests against the published anchors slate-500 on white = 4.76 and slate-400 on white = 2.56 and asserts on mismatch; both reproduced exactly before any row below was written.

Grounds: white `#ffffff`, site surface `#fafaf7`, navy `#0f172a`.

| Token | Role | Ground | Ratio | Floor | Verdict |
|---|---|---|---|---|---|
| cyan-600 `#0891b2` | text | white | **3.68** | 4.5 | **FAIL**, the standard's default text step is unusable here |
| cyan-600 `#0891b2` | ground under white label | n/a | **3.68** | 4.5 | **FAIL**, the standard's default button ground is unusable here |
| cyan-700 `#0e7490` | text | white | 5.36 | 4.5 | PASS |
| cyan-700 `#0e7490` | text | `#fafaf7` | 5.12 | 4.5 | PASS |
| cyan-700 `#0e7490` | ground under white label | n/a | 5.36 | 4.5 | PASS |
| cyan-700 `#0e7490` | tick colour | white | 5.36 | 4.5 | PASS (no `tickClassName` shift needed, unlike Property's emerald-400) |
| cyan-800 `#155e75` | text | white | 7.27 | 4.5 | PASS |
| cyan-800 `#155e75` | text | `#fafaf7` | 6.95 | 4.5 | PASS |
| cyan-600 `#0891b2` | text | navy | 4.85 | 4.5 | PASS |
| cyan-400 `#22d3ee` | text | navy | 9.88 | 4.5 | PASS |
| cyan-300 `#67e8f9` | text | navy | 12.32 | 4.5 | PASS |
| amber-700 `#b45309` | text (duty bites) | white | 5.02 | 4.5 | PASS |
| amber-700 `#b45309` | text | `#fafaf7` | 4.80 | 4.5 | PASS |
| amber-400 `#fbbf24` | text | navy | 10.69 | 4.5 | PASS |
| orange-700 `#c2410c` | penalty step 2 | white | 5.18 | 4.5 | PASS |
| red-600 `#dc2626` | penalty step 3 | white | 4.83 | 4.5 | PASS |
| red-800 `#991b1b` | penalty step 4 | white | 8.31 | 4.5 | PASS |
| neutral-500 `#737373` | fine print (live, footer) | `#fafaf7` | **4.53** | 4.5 | PASS with **zero headroom** |
| neutral-600 `#525252` | body (live) | `#fafaf7` | 7.47 | 4.5 | PASS |
| slate-500 `#64748b` | fine print, post-N1 | slate-50 `#f8fafc` | 4.55 | 4.5 | PASS |
| neutral-400 `#a3a3a3` (`--ink-whisper`) | text | `#fafaf7` | **2.38** | 4.5 | **FAIL** if used for text anywhere |

Two rows carry work. `--ink-whisper` is a defined token that cannot legally hold text; its call sites are UNVERIFIED and phase 1 must audit them. The footer fine print passes by 0.03, so any palette tweak that darkens the ground or lightens that text breaks it; the N1 slate move happens to improve it to 4.55.

---

## 3. Sanctioned deviations

Nothing in this section is decided. Every row is a PROPOSAL awaiting the owner decision named in §8. A row is only "sanctioned" once the decision and its date are written into the right-hand column.

| # | Deviation | Recommendation | Owner decision + date |
|---|---|---|---|
| N1 | Neutral ramp is Tailwind `neutral`, not the standard's `slate`. 556 occurrences in 52 files against 194 `slate-*` already present, so the site is today a visible MIX of two greys. | Adopt slate estate-wide. It removes the mix, it is a mechanical class sweep with no layout risk, and it moves the fine print from 4.53 to 4.55. Priced in §8. | PENDING (question 1) |
| N2 | `<body>` ground is warm off-white `#fafaf7`. The standard's page grounds are white and slate-50, oscillated explicitly per section, with cream reserved for hero surfaces. | Move body to `#ffffff`, keep `#fafaf7` as the cream hero surface. Retains the brand warmth where it reads as a choice and removes it where it fights the section-rhythm rule. | PENDING (question 1) |
| N3 | Eyebrows are set in Geist **Mono** (`globals.css .eyebrow`, lines 123-132). The standard's eyebrow is sans, 11/12px, uppercase, tracked, with a 24x2px primary rule. | Keep the mono eyebrow. It is this site's most distinctive typographic move, it costs nothing in contrast or layout, and the standard's eyebrow RULE is adopted either way. This is the one place the delta argues for the site over the standard. | PENDING (question 2) |
| N4 | Heroes on `/`, `/locations` and `/locations/[slug]` are hot-linked Pexels photographs under a gradient. The standard ships zero photography and uses an SVG motif. | Replace with the §1 motif. Three reasons beyond conformance: hot-linking a third-party CDN puts a render-blocking `priority` image outside our control on the LCP element; the photo is a stock desk that says nothing about IR35; and the standard's navy hero is the measured one. | PENDING (question 4) |
| N5 | `sectionY` is `py-16 sm:py-20 lg:py-28`, and `sectionYLoose` `py-20 sm:py-28 lg:py-36`. Standard rhythm is `py-12 sm:py-16 lg:py-20`. | Adopt the standard. Not really a deviation to sanction, listed so the visible density change is not a surprise at the owner walk: every section gets shorter. | PENDING (question 1, bundled) |
| P1 | Property's `WhatToExpectCard` default props publish a fee line no page authored. | DO NOT COPY. See §4. | n/a, recorded not asked |
| P2 | Property's `FaqSection` is a Radix accordion with no `forceMount`. | DO NOT COPY. See §4. | n/a, recorded not asked |
| P3 | Property's `NumberedReasons` animates off keyframe classes its siblings lack. | DO NOT COPY. See §4. | n/a, recorded not asked |

---

## 4. Known Property defects not to copy

Recorded as written deviations per the phase 1 brief. **None of these is fixed in Property to solve it here**; Property is the reference and a fix there is its own owner-approved item.

### P1. `WhatToExpectCard` default props publish an unauthored fee line

Verified: `Property/web/src/components/property/WhatToExpectCard.tsx:22-27` defines
`DEFAULT_ITEMS`, whose fourth item is the literal string `"Fixed fee quote if you decide to proceed"`, and line 31 binds `items = DEFAULT_ITEMS`. Any caller that omits `items` publishes a commercial statement about fees that no page author wrote. Playbook §7 forbids pricing claims for our services.

**What this site does instead:** nothing. `grep -rn "WhatToExpect" contractors-ir35/web/src` returns zero hits; the component does not exist here and the pattern has no local equivalent.

**Binding rule for the port:** if the kit's `WhatToExpectCard` is adopted on `/contact`, `items` is passed EXPLICITLY at every call site, authored against `docs/contractors-ir35/house_positions.md`, and no call site relies on the default. A defaulted call is a phase gate failure, and the fidelity reviewer checks for it by name.

### P2. `FaqSection` closed answers are absent from server HTML while the JSON-LD asserts them

Verified: `Property/web/src/components/ui/FaqSection.tsx:3,34-43` renders a Radix `Accordion type="single" collapsible`, and `grep -n forceMount Property/web/src/components/ui/accordion.tsx` returns nothing (exit 1). Radix unmounts closed `AccordionContent`, so the answers are not in server HTML, while `buildFaqPageJsonLd` on the same array asserts them to a crawler. That is structured data claiming content the page does not serve.

**What this site does instead, and it is better:** `contractors-ir35/web/src/components/blog/BlogPostRenderer.tsx:276-290` renders FAQs as a plain semantic `<dl>` / `<dt>` / `<dd>` with no disclosure state at all. Every answer is in server HTML unconditionally, and the JSON-LD built at line 60-61 from the same `post.faqs` array is therefore truthful.

**Binding rule for the port:** the FAQ surface KEEPS the always-open `<dl>`. If the accordion look is wanted, it is achieved with native `<details>`/`<summary>` (open content stays in the DOM) or with `forceMount` plus CSS hiding. Adopting the kit's accordion as-is is a REGRESSION on this site and the reviewer rejects it. This is §4.6.1 in its plainest form: take the standard's design, keep the sibling's payload.

### P3. `NumberedReasons` animates off keyframe classes its siblings lack

Verified: `Property/web/src/components/property/NumberedReasons.tsx:62,69` apply `story-numeral` and `story-numeral-rule`, whose keyframes live in Property's `globals.css` (its own header comment, line 10, says so). A sibling that ports the component without the CSS gets a component that silently renders unanimated, and nothing in a diff review shows it.

**What this site does instead:** nothing. `grep -rn "story-numeral" contractors-ir35/web/src` returns zero hits. This site's entire motion vocabulary is two classes, `hero-reveal` and `hero-reveal-delay`, both off one `fadeInUp` keyframe (globals.css:140-160).

**Binding rule for the port:** any animated component adopted from the kit lands together with its keyframes AND the `data-draw` / `prefers-reduced-motion` gating, verified by `getComputedStyle` on the rendered DOM, never by screenshot. This site currently has NO `data-draw` mechanism and no `<noscript>` release block, so adopting the standard's motion set means porting that machinery too. Priced in §8 as phase 1 work.

---

## 5. Capture surfaces

§4.6.6: porting Property's interruptive set to a site that lacks it is ADDING interruptive surfaces, which the standing rule forbids without asking. This section is the list the owner's swatch turn approves.

Independently re-derived for this doc, not taken from P0A on trust. Mount counts from
`grep -rl "<ComponentName" src --include=*.tsx | wc -l` run in `contractors-ir35/web`.

### 5a. Live today: ten. The port RESTYLES all ten and adds none.

| Surface | Mount point | Files mounting it | Port disposition |
|---|---|---|---|
| `StickyCTA` | `layout/PageShell.tsx` (global) | 1 | RESTYLE to the kit sticky recipe. Keeps `data-cta="sticky_cta"` + `data-cta-placement="sticky"` |
| `SpecialistWidget` | `layout/PageShell.tsx` (global) | 1 | RESTYLE. Site-specific, no appendix D row, explicit KEEP-AND-RESTYLE |
| `ReturningBar` | `app/layout.tsx` (root) | 1 | RESTYLE. Keeps `returning_bar` / `returning_bar_close` |
| `DeepScrollModal` | `app/layout.tsx` (root) | 1 | RESTYLE. Keeps `deep_scroll_modal` / `deep_scroll_close` |
| `InlineMiniLeadForm` | `blog/BlogPostRenderer.tsx`, 3 inline slots | 1 | RESTYLE to the tiered mid-article capture recipe |
| `NextStepOffer` | `blog/BlogPostRenderer.tsx`, end of post | 1 | RESTYLE. Site-specific intent-engine surface, explicit KEEP-AND-RESTYLE |
| `CalcResultCta` | calculator result flow | 2 | RESTYLE |
| `MobileToolSlot` | `calculators/premium/PremiumCalculator.tsx`, mobile only | 1 | RESTYLE |
| `ResultGateModal` | `calculators/premium/PremiumCalculator.tsx` | 1 | RESTYLE. Deliberately carries NO `data-cta` (comment at `ResultGateModal.tsx:53`); that stays deliberate |
| `ResourceGate` | `/resources/[topic]` page + `resources/CalculatorPageResources.tsx` | 2 | RESTYLE |

Six of the ten wrap the shared `MiniCapture`, which means the `--brand-primary-text` token in §1 is load-bearing on this site in a way it is not on Property: without it, the consent link and the "Step N of 2" eyebrows render at `--brand-primary`, and if `--brand-primary` were ever bound to cyan-600 they would fail. Bound to cyan-800 per §1 they measure 7.27.

### 5b. Would the port ADD any surface? No.

Nothing in the kit's interruptive set is absent here. The standard's `SpecialistWidget`, `DeepScrollModal`, `StickyCTA` and `ReturningBar` are all already live. **The port adds zero INTERRUPTIVE surfaces**, so the §4.6.6 owner gate on this site is a confirmation, not a request.

**OWNER RULING 2026-09-13, and this clause was previously wrong.** As first written the clause said
"zero capture surfaces", which the R56 fidelity review correctly read as violated: the port added a
static `LeadCTAPanel` enquiry form to four routes that had none (`/services`, `/ir35-status`, `/for`,
`/about`), while a builder quoted the same clause to refuse one on `/contact`. The owner has ruled:
**KEEP all four.** The reasoning recorded so no future port re-litigates it:
- The §0 funnel ENDS every page with the ask, and Property works this way, so a page with no closing
  ask is the deviation, not the other way round.
- Nothing about these interrupts the reader. They do not pop, gate, time, follow the scroll, or
  reappear. The interruptive set is genuinely unchanged at four, and that count is what §4.6.6 and the
  standing no-interruption rule exist to protect.
- The site takes about 3 enquiries a month, so four well-trafficked pages with no way to enquire is a
  real cost.
RULE GOING FORWARD, for this site and worth promoting estate-wide: distinguish an INTERRUPTIVE surface
(pop-up, modal, sticky bar, scroll trigger, timed widget, returning-visitor bar), which needs the
owner's yes every time, from a STATIC in-page ask, which is part of the page contract. Only the first
is gated.

### 5c. The dead one: `blog/ExitIntentModal.tsx`

Re-derived, not taken on trust. `grep -rn "ExitIntentModal" contractors-ir35/web/src` returns five hits and **all five are comments or prose**: `forms/MiniCapture.tsx:8` (a docstring listing callers), `intent/DeepScrollModal.tsx:44` ("shared per-session cap with ExitIntentModal"), and `support/SpecialistWidget.tsx:22,24,138` (a stand-down note claiming "ExitIntentModal ALREADY reads this key"). `grep -rn "import.*ExitIntentModal" src` returns zero. `grep -rl "<ExitIntentModal" src --include=*.tsx | wc -l` returns 0. **Zero importers, zero mounts: dead code.**

The comments are actively misleading, and this is §4.6.2's own worked example repeating itself on this site: three separate files describe a coordination protocol with a component that nothing mounts. A future reader greps the name, finds five hits, and concludes it is live.

**Disposition: DELETE, in phase 1, together with the three misleading comment blocks.** Justification for deleting rather than leaving it: it is the only dead component in the tree (all 34 other files under `src/components` have a real importer and a real JSX mount), so the delete is a one-file diff with no consumer graph to unwind, and leaving it means the port restyles a file no user can reach.

**And the load-bearing consequence: this site has NO live exit-intent surface.** Mounting one, including by "restoring" this file, is ADDING an interruptive surface and needs its own owner yes. It is not in §5a and the port will not create it.

---

## 6. Site-specific hazards from phase 0

Each labelled **phase 1 work**, **later phase**, or **not design work**. Evidence: `P0D_CSS_A11Y.md`, `P0E_CRAWL_INTEGRITY.md`, re-verified here where a command is quoted.

| # | Hazard | Label | Disposition |
|---|---|---|---|
| H1 | **The 640-767px window.** `SiteHeader.tsx:80` shows the primary CTA at `sm:inline-flex` (640px) while `:87` hides the burger only at `md:hidden` (768px), so for ~128px both render. Re-verified by grep this session. Note the burger and drawer DO agree at `md` (both `md:hidden`), so this is a design inconsistency, not the sibling ports' broken-nav dead zone. | **phase 1 work** | Fixed by adopting the §0.8 responsive contract wholesale, which is phase 2 chrome anyway: burger owns below `lg:`, CTA lives in the drawer foot. The fix is "adopt the contract", not a one-off breakpoint patch. Also raise the burger from `h-11 w-11` (44px) to the contract's `h-12 w-12` (48px). |
| H2 | **Thirteen files themed through `var()` arbitrary values.** `text-[var(--x)]` / `bg-[var(--x)]` / `border-[var(--x)]`, heaviest `calculators/premium/PremiumCalculator.tsx` (~40 occurrences), then `PremiumUpgrade.tsx`, `MobileToolSlot.tsx`, `ResultGateModal.tsx`, `support/SpecialistWidget.tsx`, `resources/CalculatorPageResources.tsx`, `app/resources/[topic]/page.tsx`. `browser_check.mjs` cannot resolve `var()` chains and **falls back to white, i.e. it reports a PASS it did not measure**. | **phase 1 work** (the rule), later phases (the files) | STANDING RULE FOR THIS PORT, written here because it must be true before the first component: **no contrast claim about those 13 files may cite instrument output.** They are hand-computed against the resolved hex in `:root`, with the calculator self-test in §2 run first. Every other surface (header, footer, forms, blog, homepage) uses named utilities and the instrument CAN be trusted there. A phase log that quotes the instrument for a var()-themed file is rejected. |
| H3 | **Nine chart instances hide their values behind `role="img"`**, across four local files: `research/SurvivalIndexCharts.tsx` (2), `research/ContractorIndexCharts.tsx` (3), `research/ContractorInsolvencyCharts.tsx` (3), `calculators/premium/PremiumBarChart.tsx` (1). The last is worse: `PremiumBarChart.tsx:89` wraps the svg in `aria-hidden="true"` and `:96` then sets `role="img"`, so even the accessible NAME is unreachable. All four are local, none in `packages/web-shared`. | **later phase**, but see the note below: a parallel phase 0 package is fixing this NOW | The standard's answer is not an aria patch: §0 requires every value direct-labelled in the DOM, which is precisely what lets a bar be `aria-hidden`. So these are fixed by labelling values, not by adding `aria-label` strings to svgs. Charts also re-ramp via `--chart-1..5` (§1), never by hand-recolouring SVGs (§4.6.11). **As this doc was written, `docs/contractors-ir35/_port/F6_CHART_A11Y_FIX.md` and an untracked `src/components/research/ChartDataTable.tsx` were in the working tree, unstaged**, adding `sr-only` data tables. The port INHERITS that fix rather than redoing it, and phase 1 re-derives the state of these four files rather than trusting this row. |
| H4 | **`/blog` serves 12 of 62 articles.** `BlogListWithSearch` takes the full corpus as a prop then slices client-side; pagination controls are `<button onClick>` at `BlogListWithSearch.tsx:176-192`, not links, so there is no `?page=2` URL to discover. 12/62 = 19.4%. Category pages: only IR35 Status (17) and Umbrella vs Limited Company (13) exceed 12; worst is 12/17 = 70.6%. | **phase 1 work** (as a constraint), later phase (the fix) | The standard's rule is absolute and it lands in phase 1 as a floor on every page written afterwards: **paginate by HIDING, never by slicing**, and never delete a crawlable link for layout. The kit's `NumberedPagination` + `HubArticleList` implement hide-not-slice. Until that lands, the link floor in `sweep_baseline.json` (157 URLs, 2755 internal links) is measured against a `/blog` that already only emits 12, so the floor cannot regress but also cannot detect this: the fix must be tracked as its own item, not assumed caught by the gate. |
| H5 | **Three `content/resources/` pages carry `noindex: true` frontmatter that emits NO robots meta tag, and all three are in the sitemap.** Verified live this session against the read-only server on 3611 (title asserted first, see below): `curl -s http://localhost:3611/resources/ir35 \| grep -i 'name="robots"'` returns nothing, and `curl -s http://localhost:3611/sitemap.xml \| grep -o "resources/[a-z-]*"` returns all three. `grep -rn noindex src` shows the only robots metas on the site are in three `api/leads/*` token routes; `app/resources/[topic]/page.tsx` has a `generateMetadata` at line 32 that never sets `robots`. `sitemap.ts:80` even carries the comment "email gate retired 2026-07-18, now indexable", so the sitemap is DELIBERATE and the frontmatter is the stale side. | **not design work** | Two mutually exclusive truths are published about the same three URLs and a design port cannot adjudicate which one the owner wants. It is a content and indexing decision, it touches files this package is forbidden to edit, and a phase 0 agent is in them right now. **As this doc was written, `docs/contractors-ir35/_port/F5_INDEXING_CRAWL_FIX.md` and unstaged edits to `src/lib/resources/content.ts` and `src/app/sitemap.ts` were in the working tree, implementing option B**: the `noindex` flag is now modelled and honoured, and the sitemap drops from 157 to 154 `<loc>` entries. That is a decision taken by a parallel package, so owner question 6 is now a CONFIRMATION of the direction already built, not an open fork. The port must not "tidy" the frontmatter as a side effect either way. |

Server-identity assertion for H5, per the standing instrument rule: before trusting anything from port 3611, `curl -s http://localhost:3611/ | grep -o "<title>[^<]*</title>"` returned `<title>Specialist Contractor Accountants | IR35 Advice UK</title>`, which is this site and not a sibling. No server was started by this package and nothing was written to it.

---

## 7. Navigation and IA

§4.6.10 requires a flat-nav site's port to include authoring grouped `navigation[]` and wiring the nav builder, as planned work. **Read the actual config and price it**, and the answer here is not the one the rule anticipates.

Source: `cat contractors-ir35/niche.config.json` (site root).

```
navigation[]   5 items, FLAT, zero children:
                 Services /services · IR35 Status /ir35-status · Who we help /for
                 Blog /blog · Contact /contact
footer_links[] 9 items, FLAT, a separate hand-authored list:
                 the 5 above minus Contact-duplication, plus About, Privacy policy,
                 Terms, Cookie policy
```

Live routes that exist and appear in NEITHER list: `/calculators` (10 tools),
`/glossary` (38 entries), `/locations` (10 cities), `/research` (3 data-asset index pages),
`/resources/[topic]` (3 guides, and `P0E` §3 confirms there is no `/resources` hub page at all).

So the IA work is real but it is **coverage, not regrouping**. Five items do not need groups; the standard's grouped-nav contract exists to tame a long list, and a five-item bar is already inside the header's measure. What is actually wrong is that roughly 61 crawlable destinations across four route families are reachable from no navigation surface.

**Recommendation, priced:**

| Item | Work | Estimate |
|---|---|---|
| Author `navigation[]` as grouped: keep Services / IR35 Status / Who we help / Blog / Contact, and add a **Tools** group with children Calculators, Glossary, Research, Resources | config edit + nav builder wiring in phase 2 chrome | 0.25 day |
| Build the calculators group from the tool registry rather than hand-listing (the B/C contract's registry-built group; `src/lib/calculators/tools/*.ts` already declares slugs, so the data exists) | phase 2 | 0.25 day |
| Derive footer columns FROM the nav data rather than the hand-authored `footer_links[]` (§4.2 item 8: "footer columns derived from nav data, never hand-listed"), keeping the four legal links as their own column | phase 2 | 0.25 day |
| Add the missing `/resources` hub page so those three URLs stop depending solely on the sitemap | later phase, and gated on owner question 6 (a hub for pages marked noindex is a contradiction) | 0.25 day, GATED |

**Total IA work: 0.75 agent-days in phase 2, plus 0.25 gated.** This corrects P0A §6, which concluded "no IA authoring work is needed for a design port". That is right about grouping and wrong about coverage, and coverage is the part §4.6.10 is protecting: a flat nav that hides four route families is the case the rule was written for.

---

## 8. Owner-input state (appendix K rows) and port sizing

| Appendix K input | Class | State |
|---|---|---|
| Brand colour ramp sign-off | BLOCKER | PROPOSED, §1 + §2. Cyan, brand hex is a ramp step, one-step shift to cyan-700 for every `primary-600` recipe. Awaiting yes. Blocks phase 1. |
| Wordmark icon | BLOCKER | PROPOSED, §1: lucide `FileBadge`, fallback `Briefcase`. Awaiting pick. |
| Backdrop motif | BLOCKER | PROPOSED, §1: timesheet-grid motif, entangled with the photography decision N4. |
| Font change on a live site | BLOCKER | This delta PROPOSES KEEPING Geist Sans + Geist Mono, which is the §4.6.5 default. A switch to Plus Jakarta Sans is NOT assumed anywhere. Mono dependencies listed in §1. |
| Capture-surface scope | BLOCKER | §5: ten live, ten restyled, **zero added**, one dead file deleted. Confirmation, not a request. |
| Favicon set | COSMETIC | Keep the site's existing favicon. Never generated. |
| Hero imagery beyond the SVG motif | COSMETIC, but see N4 | The site HAS photography today and the standard ships none. This is the one cosmetic row that is a real decision here. |
| Phone number | BLOCKER for schema/copy | **PLACEHOLDER.** `niche.config.json` carries `"+44 20 0000 0000"`. Kept as-is and flagged, never invented. Every schema and copy surface the port touches will publish it. |
| GA4 id | INFO gap | `seo.google_analytics_id` is `""`. Flagged, not a blocker. |
| Search Console verification | INFO gap | All five verification strings empty in `niche.config.json`. Separately, `sites.bing_property_url` IS NULL in the DB (`P0B`), so Bing pulls for this site do not resolve from the registry. Not a port defect; it means any post-cutover conversion read here is GSC-only. |
| Deploy approval | BLOCKER, every time | Not sought. Nothing in this package deploys. |

### Port sizing, from this delta

Mid family-B is 2-4 agent-days per §4.6.11, and this site sits at the top of that band because of three site-specific loads, each priced from a measured count rather than a category:

| Load | Measure | Estimate |
|---|---|---|
| Neutral-to-slate sweep (if N1 approved) | 556 occurrences, 52 files | 0.5 day |
| `var()`-themed surfaces needing hand-verified contrast | 13 files, ~40 occurrences in `PremiumCalculator.tsx` alone | 0.5 day |
| Motion machinery this site does not have (`data-draw`, the `<noscript>` release block, the keyframe set behind `prefers-reduced-motion`) | 2 existing animation classes vs the standard's ~12 named effects | 0.5 day |
| IA coverage (§7) | 4 route families, ~61 destinations | 0.75 day |
| Everything else (tokens, chrome, blog, calculators, pillars, post-submit, research) | 31-ish public route files | 2 days |

**Total 4.25 agent-days**, and per the playbook a third of any port goes to live defects that are not design work, so the §6 hazards are inside that number, not on top of it.

---

## 9. Owner decisions

Six questions. Answer in one line each.

1. **The site is painted in two different greys and a warm off-white background.** Right now some of it uses one grey and some uses another, which reads as slightly inconsistent, and the page background is a warm cream rather than white. Option A: put the whole site on one grey and a white background, matching the rest of the estate, keeping the cream for the big banner at the top of pages. Option B: leave it as it is. Option A costs about half a day and makes the small print slightly easier to read. **Recommendation: A**, because the inconsistency is visible today and the fix is mechanical.

2. **The small capitalised labels above headings are set in a typewriter-style font.** The estate standard sets them in the normal font. Option A: keep the typewriter labels, which are this site's most distinctive touch and cost nothing. Option B: match the estate. **Recommendation: A**, keep them.

3. **The site's typeface.** It currently uses Geist, and the estate standard uses Plus Jakarta Sans. The default is to keep what a live site already has. Option A: keep Geist. Option B: switch to Plus Jakarta Sans, which makes it look more like the other redesigned sites but changes the feel of every page. **Recommendation: A**, keep Geist. Nothing has been built either way.

4. **The big banner at the top of the home page and the city pages uses a stock photograph of a desk.** It is loaded from someone else's website, which means it is the slowest thing on the page and we do not control it. The estate standard uses a drawn background pattern instead and no photography at all. Option A: replace the photos with a drawn pattern. Option B: keep the photos. **Recommendation: A**, because it is faster, it is ours, and the photo does not say anything about what the site sells.

5. **The pop-ups and prompts that ask visitors for their details.** There are ten of them live today. The redesign restyles all ten and adds none, and one leftover file that never actually appears to anyone gets deleted. Please confirm nothing new is being added. **Recommendation: confirm as listed.**

6. **Three guide pages said two contradictory things about themselves, and that has just been fixed one way.** Their source files are marked "keep out of search results", but nothing on the page told search engines that, and all three were listed in the file that invites search engines in. While this document was being written, another piece of today's work resolved it by honouring the marker: the three pages are now hidden from search and removed from that list. The alternative would have been to clear the marker and leave them visible. Please confirm hidden is what you want, because a note in the code suggests someone opened them up deliberately in July. **Recommendation: confirm hidden**, and if you want them visible instead it is a small reversal.

Also flagged, no decision needed now: the phone number on the site is still a placeholder (`+44 20 0000 0000`), and the analytics and search-verification IDs are empty.

---

## Appendix: what this package verified itself

Every number above carries its command inline. The ones that came from phase 0 and were RE-DERIVED here rather than taken on trust: the ten live capture surfaces and their mount counts, the dead `ExitIntentModal` (five hits, all comments, zero imports, zero mounts), the header CTA and burger breakpoints, the brand hex in all three of its homes, the missing robots meta and the sitemap entries for the three resource pages, and the three Property defects, each read in Property's own source. The contrast table was computed fresh with a calculator that asserts against the two published anchors before it runs.

UNVERIFIED, and named so a later phase picks them up: the call sites of `--ink-whisper` (whether the 2.38:1 token ever holds text); whether the site's header is `sticky` or `fixed`, which decides whether the uniform absence of `scroll-mt-*` across all 6 anchor targets is a live defect or moot; and whether anything consumes the `primaryKeyword` frontmatter field present on 13 of 62 posts.
