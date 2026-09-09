# PORT BLUEPRINT — SLICE 3: CONTACT/POST-SUBMIT, ABOUT/TEAM, RESEARCH, MAGNETS/RESOURCES, NEWSLETTER, LEGAL, INTERRUPTIVE STACK, BRAND LAYER, INSTRUMENTATION + GUARDS

Sources read in full 2026-09-09: rollout 693-1131 + 1157-1185, DESIGN_SYSTEM §0, Property and generalist source for every route below, `packages/web-shared/design/**`, `node_modules/tailwindcss/theme.css`.

## 0. Standing facts

- Generalist owns almost no Property primitives (`ui/` = accordion, Breadcrumb, CTASection, layout-utils, PrintButton, StickyCTA). The kit carries all of them; this slice is CONSUME-THE-KIT, zero new local primitives.
- Backdrop motif is a per-site slot (`SlimHero`/`LeadCTAPanel` take `backdrop?: ReactNode`); generalist authors ONE `GeneralistBackdrop` component.
- `sectionY` wrong (py-16/20/28 vs canonical); `--radius-xl` computes 0px; dark ground today is `neutral-900 #171717` vs kit `slate-900 #0f172a`; light-alt ground today is cream `#fafaf7`.
- Aswatax note (`thank-you:66-70`) = byte-intact carve-out. `leadConsentText` untouched anywhere (only LeadForm renders it; diff at QA).

## 1. Contact + post-submit

**/contact**: navy motif hero net-new (no hero, no breadcrumb today; h1 "Start with a short call." kept) · `#book` slate-50 band `grid lg:grid-cols-[1fr_1.5fr]`: left = white "Speak to us" card (full standfirst + packages-mode pricing link, generalist's £24 kept, `contact_pricing_link` + ADD missing `data-cta-goal="pricing"`) + kit WhatToExpectCard (the four "what happens next" strings become items: "Reply within one working day, usually same day" / "A short call to understand your situation and what you need" / "Plain-English recommendations, with or without us" / "Fixed-fee quote in writing if we are a fit"); right = white `border-2 border-slate-200` card, LeadForm props byte-unchanged (`redirectOnSuccess submitLabel="Send enquiry"`) · RETIRE the "Or directly" dl (its one row points at the form beside it) and the mono numerals device (payload kept in the card) · then WhoWeAre / WhyChooseUs / Testimonials (navy, third-from-last) / WhatWeCover (tone="white") — CONSUMED from the MarketingSections module Slice 1 authors (lifted, never copied) · grounds: navy / slate-50 / white / slate-50 / navy / white / navy footer.

**/thank-you**: SlimHero (eyebrow "Enquiry received", title "Thank you", backdrop) — the four departures honoured (no LeadCTAPanel, no breadcrumb, shallow CTA-less hero, no tick) · Aswatax paragraph moves BYTE-INTACT into the hero standfirst (gate: confirm the carve-out is about words not placement; generalist's variant string kept, never synced to Property's) · white body, clamp removed (`max-w-2xl` today) · endowed-progress 3 steps KEPT, restyled to the standard `ol grid sm:grid-cols-3` (`rounded-xl` items, done `bg-primary-600` check badges, `aria-current="step"` added — currently absent; fixes 390px squash; dead identical-branch ternary at :48-52 deleted; labels kept incl. generalist's "Details received") · two-column ask grid `lg:grid-cols-[1.6fr_1fr]`: BookingPicker (token) in a slate-50 card or `NoticeCard tone="primary"` "That is everything we need"; right = WhatToExpectCard ("About twenty minutes, by phone, at the time you pick" / "Your accountant has read your enquiry before they ring" / "Where you stand on your structure, pay, VAT or year-end" / "A fixed fee quote only if you want to go further" / "If your position is already right, we will say so") · RETIRE the duplicated calculator links (same link twice, 12px apart) · NET-NEW "While you wait" slate-50 band: RelatedArticles x3 (WHILE_YOU_WAIT destinations = gate; no calculator cards, §0.4) + /blog button + the `?rt=` return link — REVIVES the dead `returnPath` (currently `void returnPath;`) with Property's exact `thankyou-return-article` id · F.6 cache headers ADDED (`private, no-cache, no-store`; behaviour change, flagged). GATE: branch set — does generalist's nurture emit `?confirmed=1`/`?optout=1`? Port those branches only if something links them.

**/book** (58 lines): SlimHero (left-aligned; centred text goes) with generalist wording ("An accountant will call you then") · white section, clamp removed · `[1.6fr_1fr]` grid: BookingPicker unchanged, or NoticeCard fallback (copy verbatim) · right WhatToExpectCard + "plans changed?" /contact paragraph · dead `siteConfig` import deleted.

**/complete** (132 lines): SlimHero "Complete your details"; standfirst KEEPS "a specialist firm from our partner network" (generalist wording) · three hand-rolled cards -> NoticeCard (the drift the component exists to stop); the orange "all set" card -> `tone="primary"` (good-outcome = brand is CORRECT; what must not stay orange is the DUTY family) · DetailsForm + the entire token logic byte-untouched · right column net-new WhatToExpectCard "Why we are asking" — items DRAFTED AGAINST GENERALIST'S OWN PRIVACY POLICY before ship (Property precedent: a draft promised "no marketing list" while policy §5 disclosed six recipient firms). GATE.

## 2. About + team

**/about** (209 lines): navy motif hero + net-new `#book` CTA (`about_hero_book`; today the page's first ask is at the very bottom and both closing buttons leave the page) · h1 orange span: currently `text-orange-500` on cream = **2.68:1 LIVE FAIL**; becomes `text-primary-400` on navy (7.92:1) · four principles -> kit NumberedReasons (copy verbatim; `dangerouslySetInnerHTML`-for-&rsquo; retired) · `bg-neutral-900` quick-facts 4-up -> light-ground icon cards (`rounded-xl bg-white ring-1 ring-slate-200` + `h-12 w-12 rounded-xl bg-primary-50` badges; the dark band is decoration and breaks oscillation) · editorial-standards prose block -> ruled statement list (3 claims as `border-t` rows with check badges; /contact link kept) · TestimonialsSection third-from-last (gate: source array) · `#book` LeadCTAPanel replacing the two-button off-page band; proofPoints re-derived from the principles ("One named accountant" / "Fixed fees agreed up front" / "Technical answers traceable to source"), footnote "No obligation and no hard sell. If your position is already right, we will say so." · stats strip ONLY if evidenced numbers exist (gate; never invented) · LINK-FLOOR BINDING CHECK: two outbound links removed on this page; compensate with an InlineLink in the cards body, never by keeping the retired button.

**/team/[slug]** (123 lines): GATE FIRST — route names an individual on a faceless-authority estate; orphaned (no /team index); options (a) retire route + Person schema, (b) keep restyled as E-E-A-T surface + add index, (c) keep data, render bylines inline only. If kept: real site container (currently bare `max-w-3xl` main, nested second `<main>`), kit Breadcrumb (hand-rolled slash trail retired), Monogram kept but `fontFamily="Inter"` fixed to Geist var + per-member `monogramColor` contrast measured; amber editorial-disclosure card -> NoticeCard slate (the single clearest brand-collision instance: a notice in amber on an orange-brand site).

## 3. Research (hub + 4 data pages)

**Hub**: near-conforming; `rounded-2xl` cards -> `rounded-xl`; stat `text-orange-600` (3.56 FAIL) -> `text-primary-700` (5.18); "Updated" `text-neutral-400` (2.52 FAIL) -> neutral-500 (4.74). All four report entries + derived stats kept (computed from JSON snapshots). Gate: hub closing ask = new capture surface (Property's hub has none either).

**Four data pages** (via shared ResearchLayout.tsx + Charts.tsx, one edit inherits x4):
- Derived-HEADLINE_SENTENCE h1 pattern KEPT (the GEO asset; never retype a number).
- NET-NEW hero CTA row (`research_<slug>_hero_book` / `_hero_data` — slug-suffixed so four routes do not merge into one analytics row).
- Stat tiles move OFF the dark hero into body slate-50 tiles (`rounded-xl bg-slate-50 p-5 ring-1`, value `text-primary-800 tabular-nums` 6.99:1) per the Property owner ruling; one ResearchLayout edit.
- `Section` gains standard rhythm + caller-set `tone` (the `border-t first:border-t-0` auto-device retired; grounds set explicitly, ~6-8 sections per page written out).
- Net-new `FigureCard` wrapper (`rounded-xl p-4 ring-1`, tone opposing the section) — charts sit bare today.
- Charts recolour: bars `bg-primary-600`, comparison series stays NEUTRAL (never red); dependency-free CSS/SVG approach KEPT; visible value labels added then bars `aria-hidden` (values currently only in `title=` attributes — not accessible, invisible on touch).
- FaqSection renders the 6 FAQs that today exist as schema-for-invisible-content (FAQPage emitted, nothing rendered — SEO risk fixed).
- KEEP: Dataset JSON-LD, /data CSV routes, OGL licence, temporalCoverage, variableMeasured.
- GATES: ExampleFigureNote's literal string "Example figures displayed" would be FALSE on official statistics — component gains a `label` prop ("Source: Companies House, Insolvency Service, ONS") or a sanctioned deviation; adding capture to the 3 zero-capture research routes.

## 4. Lead magnets + resources

**/guides + /guides/[slug]**: orange pill badges -> Eyebrow; redundant clamps removed; gradient icon tiles -> `bg-primary-50` badges; category label -> primary-700 (600 fails); tick list -> DrawnTickList (`tickClassName="text-primary-600"`); the sticky orange-50/border-orange-600 capture card -> white/slate standard card (LeadForm never in a coloured card; D.1 ground re-verified), `successRedirect` + `submitLabel="Get the guide"` BYTE-KEPT; consent-adjacent microcopy KEPT unworded, restyled to fine-print scale, checked against the privacy policy (gate).
**/guides/[slug]/download**: stray `bg-emerald-500` pill (a Property brand leak on a generalist page — exactly what the emerald->primary rename catches) -> primary; body two-column with BlogSidebarCta + TOC sidebar (guide bodies have headings); orange print-tip bar -> slate NoticeCard (PrintButton kept, `print:hidden` kept); closing navy bare-button band -> LeadCTAPanel (also fixes navy-touching-footer); robots noindex,follow kept.
**/resources/[topic]**: net-new hero + Breadcrumb (indexable route with neither today); body two-column, TOC -> kit component in the sidebar; `prose prose-slate` -> `.prose-blog` (currently renders at a different type scale from every article); xlsx DIRECT-download affordance kept as `btnSecondary` + lucide Download (`resource.xlsx` mechanics byte-kept); `GateOrForm` close KEPT — QA verifies no email-gated arm remains in the component (carve-out 2, "never resurrect"); JSON-LD added.
**/templates**: standard hero + card grid (all template entries verbatim; statutory figures flagged to the facts pass, each must trace to house_positions); **SignupForm UNMOUNTED (newsletter demotion)**, swapped for a closing `LeadCTAPanel contained` — a capture SWAP, gated.
**/uk-tax-rates**: standard hero + sections with explicit grounds (page is one flat surface today); self-anchor h2 links kept, recoloured; rate tables into FigureCards with `overflow-x-auto` + `tabular-nums` (mono kept); ExampleFigureNote applies WITHOUT a gate here (§0.3 names statutory rates directly); duty/deadline colours move to the warning ramp; net-new closing ask (gated); `UK_TAX_RATES` single-source module + every anchor id KEPT.

## 5. Newsletter + legal

**/newsletter**: survives as the dedicated surface; conforms (navy hero + Breadcrumb + `[1.6fr_1fr]` body with SignupForm in a slate-50 card; `source="newsletter-page"` byte-kept; "Never: retargeting pixels..." copy kept; orange-600 links -> primary-700, currently 3.56 FAIL).
**/newsletter/confirmed + /unsubscribed**: post-submit template (SlimHero + one light section + NoticeCard branches); the non-btnPrimary `rounded-md bg-orange-600 px-4 py-2` buttons (under 44px) -> btnPrimary; /unsubscribed ships with NO reading grid (the one sanctioned visual-free surface).
**InlinePrompt**: 1 importer (BlogPostRenderer) — Slice 1 unmounts, THEN delete. Footer SignupForm = the surviving mount.
**Legal x3**: frame already byte-matches Property (`contentNarrow` is the SANCTIONED legal measure — keep). Fixes: `font-serif` h1 dropped (no serif face wired; resolves to browser default serif today); `--accent-strong` 600->700 takes every legal link 3.56 FAIL -> 5.18; content untouched (carve-out). GATE: does generalist's privacy policy carry the partner-network disclosure that /complete and /thank-you copy assert? Check before shipping §1.

## 6. Interruptive / intent stack (restyle-only; thresholds untouched)

| Surface | Verdict |
|---|---|
| IntentProvider | byte-identical to Property's; NO CHANGE |
| StickyCTA | mount PageShell -> homepage (locked). Threshold KEPT at generalist's tuned min(500px, 25%) vs Property's 30% — recorded deviation, gate confirm. Restyle `border-t-4 border-primary-600 bg-slate-900`, button >=44px. ADD missing `sticky_cta_close` id (dismiss rate of the most-shown surface is unmeasurable today) |
| SpecialistWidget | thresholds already estate-parity (30/70/120/180s cadence, 10s/8s arm, exit-intent, form-friction). Restyle chips/submit to primary + btnPrimary box; launcher stays a pill (FAB, not a card). Auto-open stays a NON-human signal (bot-gate incident) — never wired into conversion metrics |
| DeepScrollModal | 70% + once-per-pageload + 30-day per-topic suppress KEPT. Sheet stays rounded-2xl (sanctioned overlay exception). Primary action `bg-orange-500` -> btnPrimary (white-on-orange-500 fails even the 3:1 graphics floor). Close id `deep_scroll_close` vs canonical `deep_scroll_modal_close` = analytics-continuity gate |
| ReturningBar | triggers kept. BRAND-COLLISION restyle: `bg-orange-900` bottom bar -> `bg-slate-900 + border-t-4 border-primary-600` (same system as StickyCTA, never two different bar languages). Inner max-w-5xl -> siteContainerLg. Ids already canonical |
| NextStepOffer | not in the estate capture inventory; NOT interruptive (in-flow, renders null without an offer). RECOMMEND KEEP-RESTYLE (`rounded-xl`, slate card, btnPrimary); gate confirms |
| ExitIntentModal x2 | DELETE both files (zero importers; deleted role, 162 shows / 0 leads, "do not rebuild") |
| New surfaces | NONE. Every "missing capture" row is gated because capture scope is a per-port blocker |

## 7. Retirement list (importer counts grep-verified 2026-09-09)

DELETE (0 importers): blog/ExitIntentModal, newsletter/ExitIntentModal, newsletter/StickyCard, ui/CTASection (its 2 dead data-cta ids deleted WITH a deploy-watch baseline restatement in the same commit), brand/BrandLogoHero.
UNMOUNT then delete: newsletter/InlinePrompt (1 importer, Slice 1's file; sequence matters).
UNMOUNT only: SignupForm on /templates (component survives at /newsletter + footer).
REPLACE: the `btnOnDark = btnSecondary` alias — renders ink-on-navy, effectively invisible; a live defect wherever used. Real A.5 btnOnDark lands.
RETIRE: hand-rolled team breadcrumb; 4 hand-rolled notice cards (book:43, complete:25/55/96); `dangerouslySetInnerHTML`-for-&rsquo; x4; dead `siteConfig` imports (book:4, complete:4); `void returnPath;`.
GATE: /team route (Property never had one to retire; the rule does not settle it).

## 8. Brand layer — DESIGN_DELTA inputs (all measured; method: WCAG relative luminance, hand-computed, validate_palette.js does not exist)

**Primary ramp**: Tailwind 4 orange oklch 50-950 verbatim from theme.css (hex refs: 50 #fff7ed, 100 #ffedd5, 200 #fed7aa, 300 #fdba74, 400 #fb923c, 500 #f97316, 600 #ea580c, 700 #c2410c, 800 #9a3412, 900 #7c2d12, 950 #431407). O.0b mechanism; coexists with the existing `--color-primary` alias.

**HEADLINE FINDING — white-on-orange fails at every step below 700**: orange-500 2.80, orange-600 3.56, orange-700 5.18, orange-800 7.31. Generalist's current btnPrimary (`bg-orange-500 text-white`) FAILS WCAG AA today, before any port. Resolutions: B1 (RECOMMENDED) shift the button ground to primary-700 (`bg-primary-700 hover:bg-primary-800 active:bg-primary-900`; L.2's prescribed remedy); B2 dark label on orange-500 (`#431407` ~6.3:1; different button language from the estate); B3 large-text exemption MEASURED AND REJECTED (16px bold is not WCAG large text).

**Token audit (live defects the port fixes)**: `--radius-xl` computes 0px (rounded-xl renders square site-wide) -> `calc(var(--radius) + 4px)`; `--btn-radius` MISSING (kit buttons render as 9999px pills on generalist today) -> `var(--radius-xl)`; `--accent-strong` orange-600 = every article + legal link 3.56 FAIL -> orange-700; `--ink-whisper` #a3a3a3 2.52 FAIL -> retire or #737373; body line-height 1.7 -> 1.6; headings 600 -> 700 with the layered/unlayered split (currently 1.1 INSIDE the layer — value and layer both wrong); `globals-standard.css` import MISSING (generalist gets none of the shared motion/glow/heading rules); the four `--radius-sm/md/lg` lines deleted (kit owns them); `@source` line kept.

**Neutral ramp**: RECOMMEND keep warm neutral for text/hairlines (neutral-500 4.74 vs slate-500 4.76 — parity; warm neutral is chromatically correct under orange; a swap is a full-repo sweep for nothing). Honest cost: kit components hard-code slate — A1 accept the mix (invisible on hairlines) / A2 tokenise kit neutrals (programme-level) / A3 adopt slate. **Dark ground: RECOMMEND slate-900 even under warm neutrals** — the kit's navy components (SlimHero, LeadCTAPanel, TestimonialsSection, SiteFooter) are unparameterised; a neutral-900 band touching a kit slate-900 band on the same page is the one visibly wrong mix. Recorded as sanctioned deviations.

**Warning/duty ramp — three candidates measured on white / cream #fafaf7 / slate-900 / neutral-900**:
- C1 (RECOMMENDED): violet-700 #6d28d9 (7.10/6.79 light) -> fuchsia-700 #a21caf (6.32/6.05) -> red-600 #dc2626 (4.83/4.62) -> red-800 #991b1b (8.31/7.95); on-dark variants violet-400/fuchsia-400/red-400 all >=6.4 on both darks. Only candidate unambiguously distinct from orange at every step; red keeps the top of the ladder reading as danger; "purple isn't a warning colour" is answered by the direct-labelling rule (nothing rests on hue).
- C2: sky-700 -> indigo-700 -> rose-600 -> rose-900. NOTE rose-600 on cream = 4.49, misses 4.5 by 0.01 (use rose-700 6.01 on cream, or forbid step 3 on cream). Sky reads regulatory but collides with link-blue affordance.
- C3: amber-800 + reds (cheapest sweep) REJECTED as hiding the collision: amber-800 #92400e is 8 RGB units from orange-800 #9a3412 — step 1 would be visually identical to the brand's dark step. Shown to the owner only as the counter-example.
Sweep priced before commit: `grep -rn "amber-\|orange-[3-9]00" generalist/web/src | wc -l` recorded in the delta (construction-cis precedent: 128 usages / 46 files).

**Buttons (A.5 box fixed, colour tokens only)**: btnPrimary `bg-primary-700/800/900` per B1 (current ships `px-7 py-3.5 text-sm font-medium`, no min-w, no radius — box also fixed) · btnSecondary `border-2 border-primary-700 bg-white text-primary-700` (current ink-outline variant RENAMED btnOnCream, its correct role) · btnOnDark = the real A.5 recipe (replaces the invisible alias) · focusRing `outline-primary-600` (current orange-500 = 2.80 fails even the 3:1 graphics floor).

**Glow recomputed for orange** (same ramp steps, alphas unchanged): rest `0_6px_20px_-8px_rgba(234,88,12,0.28)`, hover `0_16px_32px_-12px_rgba(234,88,12,0.4)`, peak `0 0 0 3px rgba(249,115,22,0.22), 0 18px 40px -10px rgba(234,88,12,0.6)` + `border-color rgb(251 146 60)`; slate shadows unchanged. Channel tokens: `--brand-glow 249 115 22`, `--brand-glow-deep 234 88 12`, `--brand-glow-edge 251 146 60`, `--brand-glow-faint 255 237 213`. Warning: orange glow reads hotter than emerald at equal alpha; if it reads hot at 390/768/1440, drop 0.28/0.4 -> 0.22/0.32 as a RECORDED deviation.

**Wordmark**: propose lucide `Briefcase` (universal "a business" across every trading structure; reads at 16px), fallback `Building2` (skews Ltd-director); `Calculator` rejected (every accountancy brand uses it + the site's calculators mean something specific), `TrendingUp` rejected (implies a growth claim). line1 HOLLOWAY DAVIES; line2 = owner picks (never "generalist"). Icon `text-primary-600` on light (graphic, 3.56 clears 3:1), `text-primary-400` on the navy footer.

**Motif**: ruled LEDGER GRID — thin horizontal rules ~28px pitch, sparse vertical column rules stopping short of the edges, 2-3 irregular tick-mark entries at 1.5x stroke. The one visual every trading structure shares; degrades gracefully under the 35%->92% mask (a pictorial mark would half-truncate); ~24 SVG lines, aria-hidden. Navy tone `stroke-primary-400` at .18; cream tone `stroke-primary-600` at .10. Rejected: receipt/invoice (collides with templates/guides), coin/pound (money-as-decoration), abstract blobs (says nothing). File: `components/layout/GeneralistBackdrop.tsx`, one component, 4+ consumers.

**Cream**: keep generalist's #fafaf7 (Property's hero cream is #fbfaf7; recorded, not synced).

**L.3 registry note**: generalist AND construction-cis are both orange — unavoidable (both incumbent live brands under the keep-default). Record the reason so it never becomes precedent for free ramp collisions, and ensure the two sites' WARNING ramps differ (check construction-cis's delta before locking).

**Measured contrast table** (paste into DESIGN_DELTA §2; ⚠ = fails today): primary-500 white-label 2.80 ⚠ · primary-600 white-label 3.56 ⚠ · primary-700 white-label 5.18 ok · primary-700 text on white/cream 5.18/4.95 ok · primary-600 `.prose-blog a` 3.56 ⚠ (site-wide) · primary-600 focus ring 3.56 ok-graphics; primary-500 ring 2.80 ⚠ · primary-400 on slate-900/neutral-900 7.89/7.92 ok · primary-500 accent text on cream 2.68 ⚠ (live on 3 pages) · primary-800 stat on slate-50/cream 6.98/6.99 ok · neutral-500 fine print 4.74/4.53 ok · neutral-400 2.52 ⚠ · neutral-600 body 7.81 ok · warning C1 rows all ok as above · team monogram colours UNMEASURED (measure every value in data.ts).

## 9. Instrumentation + guard tests

**data-cta census**: 20 attributes in 11 files (2 dead in CTASection) vs Property's 567. RECOMMENDATION: KEEP generalist's existing ids (they carry the history; D.3's binding rule is continuity + never-reuse-across-routes, not renaming) and record the canonical mapping in the delta — gate. ADD: `sticky_cta_close`, `blog_skip_to_form`, `blog_sidebar_book`, `home_calculators_all`, `calc_result_<slug>` campaign ids, `data-cta-goal="pricing"` on contact_pricing_link, and ~20 route-unique slug-suffixed ids across contact/post-submit/about/research/guides/resources/templates/tax-rates/newsletter (full table in the session plan). Pin one spelling for the thank-you return id. Pair every deletion with a deploy-watch baseline restatement.

**Guards**: generalist has 7 tests incl. `lead-payload.test.ts` (one of the estate's 7 consent-wording pins — the TRIPWIRE; run every commit; NEVER modify) and `intent-engine.test.ts` (pins interruptive thresholds; a restyle tripping it means a trigger was changed).
- CONSUME from kit `design/guards/`: calculator-tabs-crawl-path, hub-article-crawl-path, nav-active-state, first-sentence — each site-parameterised with a generalist `.test.ts`.
- `first-sentence` requires `lib/page-summaries.ts` (~15 non-article routes) — DOES NOT EXIST; real authoring task and the LONG POLE (relatedItemsFromLinks + the thank-you reading row depend on it). Author FIRST.
- PORT from Property: `consent-anchor-drift.test.ts` (four surfaces in this slice sit beside capture fields), `niche-config` (pins `source_identifier == site_key` + `brand.primary_color` <-> `--brand-primary` sync — the brand work changes one of the pair).
- AUTHOR: em-dash grep gate (one line); link-floor — NO test exists anywhere: a ~20-line script parsing built HTML, unique internal hrefs per route, run pre/post, baseline into `_port/link_baseline.json` + STATE.md.

## 10. Slice 3 execution order (guards green at every step)

1 tokens+plumbing (globals.css) · 2 layout-utils (buttons + rhythm; makes every later restyle a one-liner) · 3 page-summaries + guard wiring + link-floor baseline · 4 GeneralistBackdrop · 5 post-submit set (proves kit consumption on the smallest surfaces; lead-payload green throughout) · 6 contact · 7 about · 8 research (shared layout files first) · 9 magnets/resources per family · 10 newsletter + legal · 11 interruptive restyle (intent-engine green = proof) · 12 retirement LAST (bisectable tree, baselines restated).
