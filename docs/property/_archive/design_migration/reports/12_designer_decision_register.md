# Report 12 — Designer decision and open-item register

**Scope:** all twelve designer handoff documents read end to end
(`CONTEXT_SUMMARY.md`, `CONTEXT_SUMMARY_SESSION2.md` … `SESSION11.md`,
`web/DESIGN_GUIDELINES.md`, `web/CLASS_NAMING_CONVENTIONS.md`), all under
`tmp/design_migration/Property_zip/`.

**Method:** verified = I read it in the designer's document. Every row cites the
source doc and section. I did **not** open the designer's source code for this
report, and I did **not** open our monorepo to check their claims; §6 is the
worklist for that. Where I say "conflicts with house rules" I mean
`tmp/design_migration/CONTEXT.md` §2 and
`.claude/skills/standard_terms/SKILL.md`, both of which I read in full.

**Headline for the reader in a hurry:** the designer was disciplined. They
added **no popup, modal, toast or banner**, they explicitly refused a sticky
bottom CTA on our own 586-shown/1-click data, and they refused a modal for the
blog sidebar CTA. The interruptive-surface risk in this port is not what they
added, it is three things they *inherited or gated*: `SpecialistWidget`'s
auto-open, the `ResultGate` soft gate on calculator results, and the blog
resource-gate island. All three are owner calls, and all three are pre-existing
on our side too.

---

## 1. Session-by-session timeline

### Session 1 — `CONTEXT_SUMMARY.md` (written 2026-08-16)
Orientation session plus first sweep. Added a sixth rotating card to the
homepage "Sound familiar?" marquee (closing the disposal/60-day-CGT gap and
making the count even). New `/services` hero subcopy and primary CTA. **Removed
every em dash from visible copy site-wide: 110 replacements across 32 files.**
Built the Calculators nav dropdown derived from the registry rather than
hand-listed, and fixed a real a11y bug (six calculator pages had
`text-slate-600` breadcrumbs on `bg-slate-900`, ~1.9:1). Normalised 29 card
headings onto a two-tier scale and wrote that into
`CLASS_NAMING_CONVENTIONS.md` §6.

### Session 2 — `SESSION2.md` (2026-08-16)
The conversion architecture session. Rebuilt `/services` "Who we work with" from
divs into a `clientTiers` array. Extracted `TestimonialsSection` and rebuilt the
footer to derive from the nav (trimming `footer_links` in `niche.config.json` to
three legal links). **Built `LeadCTAPanel`** — pitch left, the real `LeadForm`
right — replacing blocks that used to link to `/contact`; rolled onto seven
pages. Moved the form above the FAQ on four sub-service pages. Added the
"Built by Double Wired Creative" footer credit. Removed circular
`/locations/*` links from four blog articles after finding the
`LOCATION_TO_BLOG` 301 loop.

### Session 3 — `SESSION3.md` (2026-08-19)
Redesigned the eyebrow pre-header site-wide ("looks obvious that AI designed
it") and converted 37 hand-inlined copies into the shared `Eyebrow` component,
then gave the rule a scroll draw-in (`EyebrowRule`). **Redesigned the result
gate: the real result now renders behind frosted glass rather than being
replaced by a placeholder.** MTD checker panel forced navy in both states, with
the outcome signal moved into the badge. `CardStack columns={2}`. New
`CardCarousel`. Fixed a real overlap bug caused by `next/link` rendering an
inline `<a>`. Raised hero H1s to `lg:text-6xl` across 17 files.

### Session 4 — `SESSION4.md` (2026-08-19)
The bespoke-figure session, mostly on `/services/landlord-accountant` and
`/services/property-tax-advice`. Five new server figure components
(`Section24Wedge`, `PortfolioPooling`, `AgencyBooks`, `DecisionWindow`,
`LocationMap` — a hand-built UK map with no geo dependency). `ProcessTimeline`
replaced the `01/02/03` card grid on six pages. `ComparisonTable` generalised
from `PracticeComparison`. `PromptMarquee` and `DrawnTickList` extracted. Two
full page-flow reorders, both implemented. Copy trimmed on five sections, with
two named losses flagged.

### Session 5 — `SESSION5.md` (2026-08-19)
Rebuilt `/services/non-resident-landlord` and `/incorporation`; second flow pass
on `/services/property-tax-advice` and `/services/property-accountant`. Six more
figure components (`CoverageCards`, `SchemeFlow`, `FilingDates`,
`DisposalFigures`, `DepartureWindow`, `TaxYearGap`). **The conversion pattern
was established here:** trust badges, a `StatsCounter` strip under the hero,
`TestimonialsSection` on every service page, mid-page CTAs at intent peaks,
every primary CTA reading "Book a consultation" and scrolling to `#book`, and
`data-cta`/`data-cta-placement`/`data-cta-goal` on all of them. Extracted
`src/lib/site-stats.ts` because the stats array had been copy-pasted twice.
Fixed the carried-over `CalculatorTabs` ARIA and `WhyUsList` threshold bugs.

### Session 6 — `SESSION6.md` (2026-08-19)
**The visual-QA blackout ended.** Not by fixing the Chrome extension (still
unpaired) but by building a headless Playwright harness, `web/scripts/shots.mjs`,
that scrolls the page, waits 4s, then dismisses `SpecialistWidget`. Flow and
conversion pass on `/services/landlord-accountant`. **Cream heroes (`#fbfaf7`)
across 12 Services and Resources pages**, with `HeroBrickBackdrop tone="cream"`
carrying its own opacity, stroke and mask. Hero subheadings rewritten on all six
Services pages to a 35-38 word "Whether … a free consultation …" pattern from an
owner-supplied model line. Trust badges then removed from three heroes on
request.

### Session 7 — `SESSION7.md` (2026-08-20)
One page: `/landlord-tax`. Seven-item conversion pass authorised at once
(`id="book"`, mid-page CTA after the worked example, `CTASection` →
`LeadCTAPanel`, hero secondary → in-page `#free-tools`, five taxes →
`CoverageCards`, the 2027 section as the page's one navy band, stats strip).
Then a visual rework giving six consecutive sections six deliberately different
devices. New `RentalProfitStack`, palette-validated. Page went from a reference
document with one CTA after the FAQ to 16,019px with an ask.

### Session 8 — `SESSION8.md` (2026-08-20)
**Found and fixed a harness bug that had silently invalidated every section shot
below the fold in sessions 5 to 7** (`scroll-behavior: smooth` made the reveal
pass travel 218px of a 16,940px page). Finished `/landlord-tax` (sixth tax card
= ATED, testimonials, IHT figure) and rolled it out as the template to
`/section-24`, `/making-tax-digital-landlords`, `/property-tax-rates` and
`/research/landlord-tax-index`. Canonical tail order fixed: body → Testimonials
(navy) → Free tools → `#book` panel (navy) → FAQ. New `PenaltyLadder` and
`RateWedge`. Recorded three places the template was deliberately *not* applied.

### Session 9 — `SESSION9.md` (2026-08-20)
Almost entirely owner-directed, ~20 separate instructions. **Two standing rules
issued by the owner:** every visual carrying figures gets an
`ExampleFigureNote` asterisk (the designer's statutory-vs-illustrative split was
put to the owner and **overruled**), and **one form per page** (mid-page
`MiniCapture` blocks were built on three pages and then removed on
instruction). The designer also formally contradicted their own session 8
recommendation: **do not add `StickyCTA`**, citing our 586-shown/1-click
readout. Negation became rose site-wide. Full visual pass on
`/making-tax-digital-landlords` with a page-wide device budget planned in
advance. Hero jump-link pills removed by instruction, replaced by section
eyebrows that had to be built.

### Session 10 — `SESSION10.md` (2026-08-20)
Opens with the deploy blocker: nine `@accounting-network/web-shared` modules
missing, 22 entrypoints quarantined behind 503 stubs with `.disabled`
byte-for-byte originals preserved. Then: `/calculators` gallery rebuilt in two
tiers; **one template posture across all 16 calculator detail pages** (navy
`LeadCTAPanel`, `redirectOnSuccess={false}`, full-container body copy, one form
each — two hidden extra forms removed). `/embed` chrome fix. `/about` finally
got `id="book"` and a real form. **Site-wide responsive sweep, 46 routes × 6
viewports**, ending at zero horizontal overflow, zero JS errors, zero
sub-24×24 tap targets. Found the real broken control: shared toggle fields
rendering as bare 13px checkboxes on three calculators, fixed inside the
vendored `Field.tsx`.

### Session 11 — `SESSION11.md` (2026-08-20, updated 08-21)
The blog session, plus the typography discovery. Live-site comparison delivered.
`/blog` index rebuilt with conversion surfaces and canonical category display
names. **Blog article template overhauled — and the big find: `LeadForm` was
rendering bare on `bg-slate-900` with `text-slate-900` labels, so every
article's primary conversion point had invisible labels.** Nine topic hubs
rebuilt on one `BlogCategoryHub` template; middleware shadowing bug fixed.
Numbered pagination extracted. `font-serif` removed from the codebase.
**Discovered the unlayered `globals.css` `h1..h6` rule that silently beats every
Tailwind heading utility site-wide.** Wrote `web/DESIGN_GUIDELINES.md`.

---

## 2. The decision register

Legend for **Basis**: **E** = evidence-based (measured, screenshotted,
validated, or citing a data readout). **J** = judgment call. **O** = owner
instruction the designer executed. **E/J** = mixed.

Legend for **Sign-off**: **Y** = needs the owner. **N** = we can decide.
**⚠** = flagged hard, interruptive-surface or house-rule adjacent.

### 2.1 Conversion architecture

| # | Decision | Source | Rationale (designer's words where subtle) | Basis | House-rule conflict | Sign-off |
|---|---|---|---|---|---|---|
| C1 | `LeadCTAPanel`: embed the real `LeadForm` at the foot of every page instead of linking to `/contact` | S2 §1.6 | "The point is funnel depth, not looks: these blocks used to link to `/contact` so the reader started over. Now they convert where they finished reading." | J | none | N |
| C2 | Grey `contained` card, not navy, not emerald gradient, not white, for the panel variant | S2 §1.6 | Three variants rejected by the owner in sequence; navy rejected because "testimonials + CTA + footer made the bottom half of the page one undifferentiated navy slab". "**Grey card is the settled answer.**" | O | none | N (already settled) |
| C3 | Every primary CTA reads "Book a consultation" and anchors to `#book` on the page, not `/contact` | S5 §1.6.5, S6 §1.4 | "This was an explicit user instruction and applies to NRL and `/incorporation`." Later rolled site-wide. | O | none | N |
| C4 | `primaryHref` on `/services` points at `/book`, not `/contact` | S2 §1.6 | "booking is itself the contactability signal that promotes a lead for handoff. **Flagged to the user as a funnel decision; not objected to, but not explicitly confirmed either.**" | J | none | **Y** |
| C5 | Form moved **above** the FAQ on sub-service pages; later the canonical tail is body → Testimonials → Free tools → `#book` → FAQ | S2 §1.7, S8 §3 | "This was changed mid-session at the owner's request, having first been built the other way round." | O | none | N |
| C6 | Mid-page CTA strips at "intent peaks", one to two per long page | S5 §1.6.4, S7 §1.1.2, S9 §6 | On `/landlord-tax`: the strongest sentence is "£5,146 of tax is an effective rate of about 47% on money actually received" and "nothing followed it but another prose section". | J | none | N |
| C7 | Calculators embedded in-page (`#free-tools`) instead of linked away | S3 §1.7, S6 §1.1, S7 §1.1.4 | "the reader now runs a calculator in place, and each one carries its own `ResultGate`, so the new glass capture fires on that page too." | J | none | N |
| C8 | Hero secondary CTA must never point at `#faqs` | S5 §1.6, S6 §1.1 | "the anti-pattern session 5 called out." | J | none | N |
| C9 | `StatsCounter` strip directly under every service page hero, from shared `siteStats` | S5 §1.6.2, §1.6 | "**The £2.4M+ figure is real and lives here** — an earlier claim in this session that it was not in the codebase was wrong." | E | facts must match `house_positions.md` | **Y** (fact check) |
| C10 | `TestimonialsSection` on every service page, after the differentiation argument | S5 §1.6.3 | Social proof placed after the argument it proves. | J | anonymised-testimonial rule respected | N |
| C11 | Analytics contract: every CTA carries `data-cta`, `data-cta-placement`, `data-cta-goal="form"` | S5 §1.6.6, DG §4 | "New CTAs without these are invisible to the funnel readouts." | J | none | N (verify our pipeline reads them) |
| C12 | Soft-gated calculator results kept, and upgraded to show the real result behind frosted glass | S3 §1.3 | "the reader sees the true shape of their own answer, which is what makes the gate worth answering. A fabricated number is less persuasive and dishonest once revealed." | J | **gating is an interruptive conversion surface; CONTEXT §7 lists it as unvalidated** | **Y ⚠** |
| C13 | `redirectOnSuccess={false}` on calculator pages and blog articles; redirect kept everywhere else | S10 §3.2, DG §5 | "the reader keeps their result/context on screen instead of bouncing to /thank-you… **Do not "fix" this to match other pages.**" Note S4 §1.12 made the *opposite* change on `/research/landlord-tax-index` (old inline form was `false`, the panel redirects) — an unflagged behaviour change. | J | none | N (but see O-13) |
| C14 | Two hidden extra forms removed from calculator pages (`GateOrForm` under the calculator, `PremiumUpgrade`'s mobile `MiniCapture`) | S10 §3 | Enforcing the one-form rule. "The component itself still exists; **the blog still uses it**." | O | none | N |
| C15 | Blog sidebar CTA card is an anchor, **deliberately not a popup** | S11 §3.2 | "deliberately NOT a popup: a modal would put a second seven-field form in the DOM (one-form rule), and the anchor pattern already existed." | J | **actively complies** with the no-modal rule | N |
| C16 | Blog index and topic hubs got closing `LeadCTAPanel` + a light "calculator bridge" band between panel and footer | S11 §2.1, §4 | Adjacency rule: the light band keeps two navy fields apart. | J | none | N |
| C17 | Seven-field `LeadForm` left as is; staging it named the single biggest conversion lever left | S8 §8.1.1, S9 §8.2, S11 §8 | "**The fix is not to delete fields** — the model needs qualified, callable leads for the DJH handoff — but to stage them: contact details first, qualification second, so a step 2 abandon costs a detail rather than the whole lead." | E/J | none | **Y** |

### 2.2 Design-system decisions

| # | Decision | Source | Rationale | Basis | Conflict | Sign-off |
|---|---|---|---|---|---|---|
| D1 | Eyebrow redesign: short emerald rule + restrained caps, replacing bold/uppercase/max-tracking/saturated | S3 §1.1 | Owner brief: the old eyebrow "looks obvious that AI designed it". "The mark carries the brand colour so the words no longer have to." | O/J | none | N |
| D2 | Cream heroes `#fbfaf7` on 12 Services/Resources pages | S6 §1.3 | "went through four rounds… sampled from the hero of `sidekickaccounting.co.uk/accounting` at the user's instruction… `#f7f3ea` (too yellow) → `#f3f2ee` → `#fbfaf7`. **Do not "restore" a warmer cream.**" | O | none | N |
| D3 | Cream brick backdrop gets its own opacity/stroke/mask (0.10 @ stroke 1.15, fade at 45%), not the navy figure recoloured | S6 §1.3, §2.4 | "A dark-on-light figure is not the light-on-dark figure with the colours swapped." Went 0.10 → 0.22 ("too overpowering") → 0.13 → 0.10. | E/O | none | N |
| D4 | Negation is rose site-wide | S9 §4 | Four owner instructions converged. "**This overrides session 8 §4.2**", which had a deliberate slate/rose distinction. | O | none | N |
| D5 | Rose X on `/section-24` "Who is not affected?" kept despite the designer's objection | S8 §4.2, S9 §4 | "that section is arguably the *good* news… so red reads slightly against the meaning. **Both were kept as instructed.**" Re-raised in S9 and kept again. | O | none | N (recorded dissent) |
| D6 | Grey means "no longer applies" — but only on the `/section-24` before/after panel | S8 §4.1 vs S7 §2.3 | S7 found a grey penalty step read as "inactive" and was wrong; S8: "The *Before April 2017* column really is switched off, so the same treatment is correct. **Do not generalise either way.**" | E | none | N |
| D7 | Two-tier card heading scale only; never `text-xl` on a card heading | S1 §3.6, CNC §6 | "it outsizes the `h2` above it and breaks the page's type hierarchy." | J | none | N |
| D8 | `font-serif` banned; Plus Jakarta Sans is the only face | S11 §2.6, §7, DG §2 | Blog archive was the visible offender; swept `not-found` + three legal pages. | J | none | N |
| D9 | Article-title card treatment `font-bold! tracking-normal! leading-snug!` | S11 §6, DG §12 | "tuned over five rounds… **do not change without asking**." The `!` modifiers are required because of the globals.css override. | O/E | none | N (locked) |
| D10 | The `!` important modifiers are a **workaround**, not the fix | S11 §6, §8.0, DG §2 | "The real fix is wrapping the rule in `@layer base`, then visually QA-ing every route for heading shifts." | E | none | **Y** (scope) |
| D11 | Icon badges are tinted, never solid emerald; solid emerald is buttons only | S1 §2.4, S2 §4.4, DG §7 | "Tinted card surfaces compete with the button sitting on them — that is why the CTA card is grey and the emerald is spent on the eyebrow, ticks and button." | J | none | N |
| D12 | The middle "Portfolio Owners" client tier is deliberately NOT highlighted | S2 §1.1 | "The client wants to appeal to all three tiers equally… **Do not reintroduce a featured card.**" | O | none | N |
| D13 | `TestimonialsSection` is navy-only; the light variant was built and reverted | S2 §1.3 | "they want the navy brick / glass-card treatment everywhere. **Do not re-add a light variant without being asked.**" | O | none | N |
| D14 | `rounded-xl` everywhere; square surfaces swept out | DG §8 | Consistency sweep completed in S11. | J | none | N |
| D15 | Containers standardised; `contentNarrow` (`max-w-3xl`) **reserved for hero paragraphs only** | S10 §3.3, DG §8.1 | "session 10 removed the mid-page `max-w-3xl` boxes — do not reintroduce". | J | none | N |
| D16 | The Double Wired gradient (`#818cf8` → `#fb923c`) is reserved for the agency credit and is not a palette member | S2 §1.5, S11 §7, DG §1.1 | Deliberately lightened from Double Wired's own `#3e40d6`/`#f2772a` so `text-xs` clears contrast on navy. | E/J | see A2 below | **Y ⚠** |
| D17 | Homepage blue hero button is an A/B variant, not a palette member | DG §1 | "Do not copy it elsewhere; do not 'fix' it." | E | none | N (verify variant still live our side) |

### 2.3 Content and copy decisions

| # | Decision | Source | Rationale | Basis | Conflict | Sign-off |
|---|---|---|---|---|---|---|
| K1 | Every em dash removed from visible copy (110 in S1, 6 more in S6); en dashes too | S1 §3.3, S6 §1.6, DG §11 | "The project already enforced this independently: `src/lib/ai/qa-gate.ts:182` fails generated content on `/—\|–/`". | E | **matches** our rule exactly | N |
| K2 | Sixth tax card on `/landlord-tax` = ATED | S8 §2.1 | "**This is a tax claim on a client site and the owner has not explicitly signed it off.** It is the honest sixth, but if he would rather not raise ATED, it reverts cleanly." | J | A\* / `house_positions.md` | **Y** |
| K3 | Hero subheadings on all six Services pages rewritten to a 35-38 word owner-supplied pattern | S6 §1.5 | Two constraints stated: "**The 'whether' clause carries the page's SEO terms**" and "**Every payoff is a claim that page's own closing `LeadCTAPanel` already makes**… **Do not invent new ones.**" A draft saying "a free 30-minute consultation" was removed because that duration is nowhere in the codebase. | O/E | none | N |
| K4 | `/services/property-tax-advice` Triggers copy rewritten to first-person prompts, **losing** SDLT surcharges, multiple dwellings treatment and Let Property Campaign disclosures | S4 §1.5, §3.2.2 | "**This lost real detail**… Flagged to the user, no decision." | J | **A\* / SEO risk** | **Y** |
| K5 | "Furnished holiday lets no longer sit in their own regime" cut from Portfolios | S4 §1.11, §3.2.3 | "It is true and relevant but was a different subject riding along mid-argument. Flagged; not restored." | J | A\* | **Y** |
| K6 | NRL "Our clients" rewrite lost the £100/week tenant threshold, the 60-day penalty applying with no tax due, and the ATED return | S5 §4.2.6, S6 §3.3.7 | "All three still appear elsewhere on the page, but not in that section." | J | A\* | N (verify) |
| K7 | `/services/property-accountant` gave up the "twelve months, not just January" positioning line | S6 §1.5 | "**gave up the most**… If anything gets restored, that is the candidate." | J | none | **Y** |
| K8 | Prompt sets must be first-person, **unattributed**, and **even in length** | S1 §3.1, S4 §1.5, S8 §4.5 | Unattributed "because an attribution turns a self-identification cue into an invented client quote"; even "because the zigzag offset alternates on index and an odd set flips the pattern at the loop seam". | J | **matches** the anonymised-social-proof rule | N |
| K9 | Never invent a figure to square off a row | S7 §4.5 | Three live examples: Wales tile says "Higher rates", penalty steps 3 and 4 say "A further penalty". "All three look asymmetric next to their neighbours. **Leave them.**" | J | **matches** A\* | N |
| K10 | Canonical category display names via `categoryDisplayName()`; **frontmatter deliberately not touched** | S11 §2.2 | Post frontmatter "spells the same category up to four ways". "**Any surface that renders a category label must use `categoryDisplayName(slug, fallback)`, never raw `post.category`.**" | E | none | N |
| K11 | Boilerplate date row removed from archive cards | S11 §2.3 | "every imported post carries '9 July 2026'; `date` still drives the newest/oldest sort". | E | none | N |
| K12 | Four blog article bodies edited to remove circular `/locations/` links | S2 §1.9 | The links "bounced the reader back to the page they were already on". | E | **CONTEXT §4: "Their four content edits are one-liners on city posts we have since consolidated. Ignore theirs."** | N (discard, but re-check the loop exists our side) |
| K13 | Homepage hero closer left as the placeholder "Property tax sorted, your way, with ease." | S1 §4.1 and **every** session since | "Four drafted conversion-bridge options were rejected; the owner wants to write this himself at final review." | O | none | **Y** |

### 2.4 Architectural decisions

| # | Decision | Source | Rationale | Basis | Conflict | Sign-off |
|---|---|---|---|---|---|---|
| A1 | Footer derived from the nav object, `footer_links` in `niche.config.json` trimmed to three legal links | S2 §1.4 | "keeping both would recreate exactly the drift this fixed. **Nothing else in the codebase reads `footer_links`.**" | E | `niche.config.json` is a heavy-churn overlap file (CONTEXT §4) | N (verify claim) |
| A2 | "Built by Double Wired Creative" credit, hyperlinked `target="_blank"`, on every page, promoted into the style guide as a **spec requirement** | S2 §1.5, S11 §7, DG §1.1 | The designer's own agency backlink. DG §1.1 states the hyperlink "is part of the spec". | J | **A site-wide outbound link on a client site is an owner decision, already logged in CONTEXT §7** | **Y ⚠** |
| A3 | Calculator nav dropdown, footer calculator column, blog calculator bridge and all counts derive from `registry.ts` | S1 §3.5, S2 §1.4, S11 §2.1, DG §6 | "so a rename breaks the build instead of drifting. **Never hand-list tools or hand-type the count.**" | J | none | N |
| A4 | Prefer a prop on the shared component over a second component; every default preserves previous behaviour | S3 §4.5, S4 §2.2, S5 §1.3 | Applied to `CardStack columns`, `Eyebrow onDark`, `HeldResult ground`, `Prose onDark`, `InlineLink onDark`, `HeroBrickBackdrop tone`, `CoverageCards tone/columns/glow`, `CalculatorTabs tabs`, `DisposalFigures showRebasing`, `LeadCTAPanel redirectOnSuccess`, `CardCarousel numbered/href`. | J | none | N |
| A5 | Do not leave unexercised variants behind | S2 §4.2 | `CTASection`'s bold variant and `TestimonialsSection`'s light variant were both fully reverted once unused. | J | none | N |
| A6 | Nine `/blog/<category>` hubs collapsed onto one `BlogCategoryHub` template; pages own only metadata + copy data | S11 §4 | Hand-rolled pre-design-system layouts replaced. "`non-resident-landlord-tax` was the hand-converted exemplar; the other eight were agent-converted under strict copy-verbatim rules". | J | none | N |
| A7 | Hub pagination: posts cross to the client as `{slug, title, summary, readTime}` only | S11 §5 | "`contentHtml` must NEVER enter a client payload (FALLBACK_BODY_TOO_LARGE)." | E | **matches** our `vercel_blog_fallback_size_limit` memory | N |
| A8 | Middleware entries removed: `/blog/property-accountant-services` appeared in **both** `SLUG_TO_CATEGORY_MAP` and `DUPLICATE_REDIRECTS` | S11 §4 | "the hub 301'd to an article and the /blog topic card silently bounced readers. Both entries removed with dated comments; genuine legacy redirects verified intact." | E | our standing rule bans *adding* `DUPLICATE_REDIRECTS`; removing a shadowing bug is aligned | N (verify our side) |
| A9 | 22 backend entrypoints quarantined behind 503 stubs, originals kept as `*.disabled` | S10 §0.3 | Done "with the owner's sign-off" because compiling any of them "used to poison the whole dev server" and `next build` failed outright. | O/E | **CONTEXT §5: discard wholesale, we hold the real files** | N (discard) |
| A10 | The missing `lead-nurture/tokens` module was **not** rewritten | S10 §0.4 | "Reinventing it here would produce incompatible tokens and hand-rolled crypto where a real, tested implementation already exists." | J | correct call | N |
| A11 | Toggle-field rendering fixed inside the **vendored** `web-shared/tools/components/Field.tsx` | S10 §6.3, §0.6 step 2 | Toggles rendered as "a bare unstyled 13px browser checkbox under a full-width label". Fix gives them their own row, 24px min height, emerald accent. | E | **estate-wide file, touches 15 sites (CONTEXT §5) — gated item** | **Y** |
| A12 | Screenshot harness `shots.mjs` with three non-obvious behaviours that must not be removed | S6 §0.1, S8 §1 | Scroll-then-wait-4s-then-dismiss-widget, and the reveal-pass verification added in S8. "A reveal pass that silently fails is worse than no reveal pass, because every screenshot it produces looks plausible and is wrong." | E | none | N (worth porting) |

### 2.5 Motion and accessibility decisions

| # | Decision | Source | Rationale | Basis | Conflict | Sign-off |
|---|---|---|---|---|---|---|
| M1 | `CardCarousel` autoplay with **no play/pause button** | S4 §1.7, S8 §4.3 | "**The user explicitly asked for the play/pause button to be removed.**… This is a knowing departure from **WCAG 2.2.2**… **do not silently 'fix' it back.**" Guards kept: hover, focus, hidden tab, permanent stop on any interaction. | O | accessibility floor | **Y ⚠** |
| M2 | The MTD "live now" pulse loops forever — the site's one motion exception | S9 §3.3 | "a 'live now' dot that stops pulsing stops meaning live. That is the whole content of the mark. **Do not take it as licence for other loops.**" | J | none | N |
| M3 | Every animation's failure modes (reduced motion, no `IntersectionObserver`, no JS) land on the **settled** state | S4 §2.4, S8 §6 | "A reader must never be shown an empty rail where four penalties should be." Verified in a headless browser for `PenaltyLadder` and `RateWedge`. | E | none | N |
| M4 | `RentalProfitStack` delays pulled to 72% of true offset | S9 §3.1 | "the salary segment is visually done at ~500ms of its nominal 692ms, which left a ~200ms stall mid-bar… **Do not 'fix' the delays back to their true offsets.**" | E | none | N |
| M5 | Glow on exactly one block per page | S9 §5 | "a page that glows in four places is not punctuating anything." | J | none | N |
| M6 | Tap targets ≥ 24×24 everywhere; `CardCarousel` dots rebuilt as a 24px hit area with an inner visual `<span>` | S10 §6.1 | "the worst target on the site. **Do not merge them back.**" | E | **matches** our accessibility floor | N |

### 2.6 Data-visualisation decisions

| # | Decision | Source | Rationale | Basis | Conflict | Sign-off |
|---|---|---|---|---|---|---|
| V1 | Emerald `#059669` + orange `#ea580c` is the validated chart pair; emerald + rose **fails** CVD | S7 §2.4, S8 §4.4 | `node scripts/validate_palette.js "#059669,#e11d48" --mode light` → "FAILS CVD, ΔE 5.8 deutan… the classic red / green problem. **Do not 'fix' it to red and green.**" | E | none | N |
| V2 | `RentalProfitStack`'s slate deliberately fails the chroma floor | S7 §2.4 | "the salary block is the ground the profit stacks on, not a third identity competing with it… **Do not 'fix' the slate to a saturated hue.**" | E | none | N |
| V3 | `Section24Wedge` figures copied from `/section-24`'s worked example; ditto the S24 before/after panels and `FilingCadence` dates | S4 §1.1, S8 §4.1, S9 §5 | "**Change them in both places or not at all.**" | E | **matches** A\* | N |
| V4 | `PortfolioPooling`'s zero axis is deliberately off-centre at 33.8% | S4 §1.1 | "so a pound is the same width either side of zero. Centring it would plot the losses on their own scale. There is a comment; **do not 'fix' it**." | E | none | N |
| V5 | `PortfolioPooling`'s five properties are **invented**, captioned "example figures" | S4 §3.2.7 | "If real anonymised numbers exist they are a single array at the top of the file." | J | **A\* — published numbers must be re-derivable** | **Y** |
| V6 | A "measured" figure with no quantity gets no axis and no numbers (`TaxYearGap`, `DepartureWindow`) | S5 §2.5, S5 §1.9.4 | "putting a scale on it would imply a measurement that does not exist." | J | none | N |
| V7 | `FilingCadence`'s five blocks are equal width, not scaled to the periods | S9 §5 | "The claim is a count, not a duration, and scaling would make the final declaration look like a fifth quarter." | J | none | N |
| V8 | `LocationMap` hand-built from ~130 coastal points on one equirectangular projection | S4 §1.2 | "There is **no geo dependency in this repo and no network access**". Verified only by ASCII rasterisation. "**This is the single most likely thing to look wrong.**" | E/J | none | N (visual QA) |
| V9 | `ExampleFigureNote` asterisk on **every** visual carrying figures, statutory ones included | S9 §1.1 | The designer argued for a split (real HMRC rates are facts, not illustrations) and "**That argument was put to the owner directly and overruled**: he wants it everywhere. **Do not re-split it without asking him.**" | O | none | N (settled) |
| V10 | `StatsCounter` is the one deliberate exception, unresolved | S9 §1.1, §8.1.1 | "captioning them 'example figures displayed' would read as an admission that the proof points are invented, which is the opposite of what the note is for." | J | none | **Y** |

---

## 3. The standing rules we would inherit

Adopting the designer's system means adopting these. Grouped, each stated
precisely with its source. There are 60.

### 3.1 Forms and conversion

1. **`LeadForm` must always sit on a white or light surface.** Its labels are
   `text-slate-900`. On a navy panel that means a white `rounded-xl` card inside
   the panel. (S11 §3.1, §7; DG §5)
2. **One form per page.** Owner instruction: "we need only one form on page
   which is the only navy brick form at the end of the page". Mid-page asks are
   anchors to `#book`, never embedded forms. (S9 §1.2; DG §5)
3. **The blog article exception to rule 2:** the closing enquiry form plus, on
   enabled topics, the data-informed resource-gate island. "that pair is
   deliberate; do not add more capture points." (DG §5)
4. **No modals for forms.** A modal would duplicate the seven-field `LeadForm`
   in the DOM. Anchors to a `scroll-mt-24` target instead. (S11 §3.2; DG §4)
5. **No sticky bottom CTA.** Removed 2026-07-09 on 586-shown / 1-click data.
   "do not re-add". (S9 §2; DG §4)
6. **Adjacency rule: two navy fields must never touch.** Either use
   `contained`, or put a light section between panel and footer. (DG §5, §8.2)
7. **Consecutive sections never share a ground.** (S2 §4.3; DG §8.2) And "no
   more than one navy brick band should appear in a run" (S2 §4.3).
8. **Every CTA carries `data-cta` (unique snake_case), `data-cta-placement`,
   and `data-cta-goal="form"` when it leads to a form.** (DG §4)
9. **One primary action per surface.** Solid emerald means "the one action we
   want". (DG §4)
10. **Check the anchor exists before pointing a CTA at it.** (S6 §2.5)
11. **Every in-page anchor target carries `scroll-mt-24`** (96px, clears the
    sticky header). (DG §8.2)
12. **The blog sidebar CTA card and the article enquiry form render the same
    `CTA_BY_CATEGORY` copy object.** "Any shoutout that quotes a form must
    share the form's copy source, not paraphrase it." (S11 §3.2; DG §5)
13. **`ResultGate` rules are deliberate, do not simplify:** inputs always live,
    only the result is held, the held state shows the real figure, skipping
    always reveals, every calculator gates independently, converted visitors
    are exempt, reveals persist per calculator per session, embeds are never
    gated. (S1 §2; DG §6)
14. **A gate holds the real thing, not a placeholder.** (S3 §4.4)

### 3.2 Typography and naming

15. **`font-serif` is banned.** Plus Jakarta Sans is the only face. (S11 §7; DG §2)
16. **Card headings use two tiers only:** standard `text-base sm:text-lg
    font-bold`, compact `text-sm sm:text-base font-bold`. **Never `text-xl` on
    a card heading.** (CNC §6; DG §2)
17. **Standfirst is body size with looser leading, never `text-lg`.** "A
    standfirst that matches the heading weight reads as a second heading."
    (DG §2)
18. **Sentence case for headings.** Title Case only in proper nouns and article
    titles. (DG §2, §11)
19. **Heading `font-*` / `leading-*` / `tracking-*` utilities need the `!`
    important modifier** until the `globals.css` `h1..h6` rule is layered.
    (S11 §6, §7; DG §2)
20. **`Eyebrow` is the ONLY pre-header treatment.** Do not hand-roll uppercase
    labels. It carries `mb-3` so the heading below needs no top margin. (DG §3)
21. **Do not repeat the eyebrow's words in the heading directly beneath it.**
    (DG §3)
22. **Reusable class constants are camelCase, named by intent not appearance**
    (`btnPrimary`, not `greenButton`), and live in `layout-utils.ts`. Extract
    any pattern that repeats twice. (CNC §2, §7)
23. **`className` utility ordering:** layout → box model → typography → visual →
    effects → state variants → responsive variants. (CNC §3)
24. **One-off colour values get a token; standard scale classes do not.**
    `heroCreamSurface` exists because `#fbfaf7` would drift; `text-slate-900`
    does not need one "and giving it one is noise". (S6 §2.3)

### 3.3 Content and copy

25. **No em dashes and no en dashes in visible copy.** Rewrite with comma,
    colon, parentheses, or "to" for ranges. Enforced by
    `src/lib/ai/qa-gate.ts:182`. Verify the **rendered HTML**, and watch for
    `&mdash;` entities. (S1 §3.3; S6 §1.6; DG §11)
26. **Testimonials are anonymised by design** (role + portfolio shape, never
    names). (S1 §2.1; DG §11)
27. **Prompt marquee sets are first person, unattributed, and even in length.**
    (S4 §1.5; S8 §4.5; DG §11)
28. **Category labels render via `categoryDisplayName()` from `lib/blog.ts`,
    never raw frontmatter.** (S11 §2.2, §7; DG §11)
29. **Counts and calculator lists derive from the registry, never hand-typed.**
    `TOOLS.length` = 16. "so a rename breaks the build instead of drifting."
    (S11 §7; DG §6)
30. **Never invent a factual claim to make copy land better** — durations,
    prices, response times. "Grep the codebase; if it is not already claimed
    somewhere the client stands behind, it does not go in." (S6 §2.6)
31. **Never square off a row by inventing a figure.** (S7 §4.5)
32. **Every payoff in hero copy must be a claim that page's own closing
    `LeadCTAPanel` already makes.** (S6 §1.5)
33. **Example/illustrative figures on visuals carry the `ExampleFigureNote`
    asterisk — everywhere, statutory figures included.** (S9 §1.1; DG §11)
34. **A figure's numbers must match the page's own worked example. Change them
    in both places or not at all.** (S4 §1.1; S7 §2.4; S8 §4.1; S9 §5)
35. **Trim prose only where a figure has absorbed the fact**, and run a keyword
    sweep of the rendered HTML before and after. (S5 §2.1; S7 §4.7)

### 3.4 Layout and rhythm

36. **Containers come from `layout-utils.ts`**; the horizontal gutter is always
    `px-4 sm:px-6 lg:px-8 min-w-0`, never ad hoc. (DG §8.1)
37. **`contentNarrow` (`max-w-3xl`) is RESERVED for hero paragraphs.** Body copy
    runs the full container; do not reintroduce mid-page `max-w-3xl` boxes.
    (S10 §3.3; DG §8.1)
38. **`rounded-xl` on cards, buttons, inputs, images and panels.** (DG §8)
39. **`HeroBrickBackdrop` host section needs `relative overflow-hidden` and
    content needs `relative z-10`.** (DG §8)
40. **One sticky wrapper per column; never nest sticky/scroll areas.**
    (S11 §3.3; DG §8)
41. **Six sections in a row must not share the same device.** Plan the device
    budget across the whole page before building any of it. (S7 §4.1; S9 §5)
42. **A section is messy when text and figure alternate, not when it has
    figures. One idea per block.** (S7 §4.2)
43. **Neither column count is the rule. The rule is to look.** 3-up lost to 2-up
    with 40-60 word bodies (S6 §1.2.1); 2-up lost to 3-up with ~20 word bodies
    (S7 §2.1; S8 §4.1). The variable is body length.
44. **`line-clamp-*` and `flex-grow` must not share an element**; `flex-grow`
    goes on a wrapper. (S11 §6; DG §12)
45. **Card surface must contrast with its ground.** Reordering sections flips
    grounds and a card matching its ground vanishes. Check every card inside a
    section whose background you flip. (S4 §2.1; S5 §2.2)

### 3.5 Motion

46. **The posture:** a client component's IntersectionObserver flips a `data-`
    attribute on the root, children stay server-rendered, every keyframe lives
    in `globals.css` behind `@media (prefers-reduced-motion: no-preference)`,
    stagger is an inline `transition-delay` per item (counts are data), transform
    and opacity only. (S8 §6)
47. **Every new animation needs its own `<noscript>` release line in
    `layout.tsx`** — including colour releases. (S8 §6; S10 §5; DG §9)
48. **`<noscript>` must be inside `<body>`.** React cannot render it as a direct
    child of `<html>`. (S3 §4.3)
49. **Every failure mode lands fully drawn and still:** reduced motion, missing
    `IntersectionObserver`, no JS. (S8 §6; DG §9)
50. **The only permitted loops are the homepage marquee and the "live pulse"
    dot.** (S9 §3.3; DG §9)
51. **Programmatic scrolls are instant, not smooth**; anchor jumps ride the
    global CSS smooth scroll. (S11 §2.3; DG §9)
52. **Never observe an element you are also scaling to zero** — a `scaleX(0)`
    target has zero area and can never reach a threshold. Observe a
    stable-size wrapper. (S3 §4.2)
53. **Derive the intersection threshold from element height vs viewport
    height**, clamped, rather than using a flat high threshold. (S2 §1.2;
    S5 §1.1; S8 §6)
54. **Glow on exactly one block per page.** (S9 §5)

### 3.6 Accessibility

55. **Tap targets ≥ 24×24 (WCAG 2.5.8); interactive controls typically
    `min-h-12`.** Only exception: the offscreen honeypot input. (S10 §6; DG §10)
56. **Anything on `slate-900` uses the `onDark` variant** (`Eyebrow`, `Prose`,
    `InlineLink`, breadcrumb). "slate-600-on-navy has shipped twice as an
    invisible-text bug". (S7 §3; DG §10)
57. **`focusRing` on every interactive element; `aria-current="page"` on current
    nav/pagination items; icons `aria-hidden` with text or `aria-label`
    alongside.** (DG §10)
58. **Zero horizontal overflow at 320/390/768/1024/1280/1600.** Re-verify after
    layout work. (S10 §6; DG §10)
59. **Decoration is `aria-hidden`, and the content underneath must survive
    without it.** Figures are `aria-hidden`; the labelled rows beneath are the
    table view. (S5 §2.4; S7 §2.4; S8 §4.4)
60. **Anything positioned by percentage against a grid must mirror that grid**,
    not guess its geometry. (S5 §2.3)

### 3.7 Engineering hygiene the designer states as rules

- **`next/link` renders an inline `<a>`.** Card-shaped links need `flex` or
  `block` or they overlap in a `space-y-*` stack. (S3 §4.1)
- **A function prop cannot cross the server/client boundary.** Address icons by
  name through a registry. (S4 §2.3)
- **`contentHtml` must NEVER enter a client payload.** (S11 §5)
- **Tailwind scans for literal class names** — `lg:grid-cols-${n}` compiles to
  nothing; write maps like `TABLIST_COLUMNS` out in full. (S5 §1.3)
- **There is no prettier in this project. Do not run it.** (S4 §2.5)
- **Splice by regex or verified line spans, never two independent `str.index()`
  calls; count sections after a splice; typecheck after every write.**
  (S4 §2.6; S8 §7)
- **When sweeping a style, grep for variants, not just the canonical string.**
  (S3 §4.7)
- **Match a requested scope to the nav (`niche.config.json`), not to the URL.**
  (S6 §2.7)
- **Look at it before you believe it**, and **a capture artefact is not a bug** —
  probe the live DOM after a settle before filing a rendering fault. (S6 §2.1,
  §2.2)
- **Verify heading typography with `getComputedStyle`, not screenshots.**
  (S11 §6)
- **Load the `dataviz` skill and run `validate_palette.js` before shipping any
  chart. Do not reason about ΔE.** (S4 §2.7; S7 §4.6)

---

## 4. Open items, consolidated and deduplicated

"Still open" is my judgement given CONTEXT.md; where our monorepo may already
differ I say so. **Decider:** O = owner, U = us, D = designer (nothing genuinely
needs the designer, but it flags items only they hold context on).

### 4.1 Priority 1 — owner decisions blocking the port

| # | Item | Raised | Still open | Decider | Notes |
|---|---|---|---|---|---|
| O-1 | **Homepage hero closer is the designer's placeholder** ("Property tax sorted, your way, with ease."). Owner writes it himself at final review. | S1 §4.1, restated in **every** session through S11 §8 | Yes | **O** | Eleven separate reminders. Also: when settled, echo it in the `/services` hero closer (S1 §4.1). |
| O-2 | **`LeadForm` is seven required fields.** Staging it is "the single biggest conversion lever left". | S8 §8.1.1, S9 §8.2, S10 §8, S11 §8 | Yes | **O** | Designer's route: reuse `MiniCapture`'s `NEXT_PUBLIC_MINIFORMS_MULTISTEP` staging with its documented rollback. **We deleted 739 lines of `MiniCapture` (CONTEXT §4) — verify the flag still exists before quoting this plan.** |
| O-3 | **`StatsCounter` example-figures asterisk.** Should the firm's own proof strip (100+ landlords, 24hr, £2.4M+) carry "example figures displayed"? | S9 §1.1, §8.1.1; S10 §8; S11 §8 | Yes | **O** | Designer's view: no, it "would read as an admission that the proof points are invented". |
| O-4 | **Dead components pending deletion:** `CTASection`, `CardStack`, `ResourceGateLazy` (+ `ResourceGate`, `ExcelPreview`). Earlier list also named `ProblemSolutionSplit`, `CalculatorPreviewGrid`, `TestimonialSlider`, `ServiceTiers`. | S1 §4.3 → S5 §4.3.3 ("kept by explicit user decision… **do not delete without asking again**") → S10 §7 → S11 §8 | Yes, but **the reason has changed** | **U** with O sign-off | Their reason was "the repo is not under git; deletion is unrecoverable". **In our monorepo it is recoverable**, so this is a much cheaper decision for us. `CTASection` and `ResourceGate*` are in the 12 heavy-churn overlap files (CONTEXT §4). |
| O-5 | **"Built by Double Wired Creative" footer credit + hyperlink.** In the style guide as a spec requirement. | S2 §1.5; S11 §7; DG §1.1 | Yes | **O** | Site-wide dofollow outbound link to the designer's own agency. Already logged in CONTEXT §7. |
| O-6 | **Soft-gated calculator results.** A conversion decision the designer made and extended (frosted glass), never validated against our data. | S3 §1.3; S11 §1 (listed by the designer as one of their two honest caveats) | Yes | **O** ⚠ | Also the pre-existing `ResultGateModal` is a heavy-churn overlap file our side. |
| O-7 | **The eight forked pages: keep our wave content and re-skin, or take theirs and back-patch?** | CONTEXT §7 (not a designer item; the designer's own note is that they only re-skinned) | Yes | **O** | Standing recommendation in CONTEXT: keep ours, re-skin. |
| O-8 | **ATED as the sixth tax card on `/landlord-tax`.** "a tax claim on a client site and the owner has not explicitly signed it off… it reverts cleanly." | S8 §2.1 | Yes | **O** | |

### 4.2 Priority 2 — factual and content items needing a decision

| # | Item | Raised | Still open | Decider | Notes |
|---|---|---|---|---|---|
| O-9 | **`/services/property-accountant` quotes no fee figure.** "the single biggest conversion item left on that page." Needs an entry figure or a range from the client. | S5 §4.2.7; S6 §3.3.1; S7 §5.2; S8 §8.2; S9 §8.2; S10 §8; S11 (implicit) | Yes | **O** | Asked for across six sessions, never supplied. |
| O-10 | **`/incorporation` has no FAQ at all** — no `FaqSection`, no FAQ schema, unlike every other service page. "**The answers are tax positions the client must stand behind, do not invent them.**" Draft offered, no response. | S5 §4.2.1 → S11 | Yes | **O** | |
| O-11 | **`/landlord-tax` Wales SDLT/LTT tile is asymmetric** ("Higher rates" beside two percentages). "Only fixable with a Welsh figure the client stands behind." | S7 §5.1.2; S8 §2.4 | Yes | **O** | |
| O-12 | **Copy detail lost and never rehomed:** SDLT surcharges, multiple dwellings treatment, Let Property Campaign disclosures (advice page Triggers); "Furnished holiday lets no longer sit in their own regime" (Portfolios); the "twelve months, not just January" positioning line (property-accountant hero). | S4 §3.2.2, §3.2.3; S6 §1.5 | Yes | **U** then **O** | **SEO risk.** "If any of that was doing SEO work it needs a home." Check our GSC query set for these terms before accepting the trimmed copy. |
| O-13 | **`DecisionWindow` and the advice-page rate tables were written in session 4 and are NOT cross-checked against `/section-24`** the way `Section24Wedge` is. "Worth an accuracy pass by someone who knows the rules." | S4 §3.2.6 | Yes | **U** | Straight A\* / `house_positions.md` QA job. |
| O-14 | **`PortfolioPooling`'s five properties are invented** (captioned "example figures"). | S4 §3.2.7 | Yes | **O**/U | "If real anonymised numbers exist they are a single array at the top of the file." |
| O-15 | **NRL "Our clients" lost the £100/week threshold, the 60-day penalty with no tax due, and the ATED return** from that section. | S5 §4.2.6; S6 §3.3.7 | Yes | **U** | Designer says all three still appear elsewhere on the page. Verify. |

### 4.3 Priority 3 — technical items we decide

| # | Item | Raised | Still open | Decider | Notes |
|---|---|---|---|---|---|
| T-1 | **`globals.css` unlayered `h1..h6` override.** "Every `leading-*`/`tracking-*`/non-bold `font-*` utility ever written on a heading has never rendered." Fix = wrap in `@layer base` **plus a site-wide heading visual QA pass**, because layering it re-activates every previously dead utility at once. | S11 §6, §8.0; DG §2 | Yes | **U** | Marked HIGH value by the designer. Confirm the rule exists in our `globals.css` first (§6 V-1). |
| T-2 | **Mobile pagination wraps to two rows at 390px.** "if the owner wants one row, hide the First/Last text buttons below `sm` (arrows still cover the jumps)." | S11 §8.1 | Yes | **U**, cosmetic → **O** if he cares | |
| T-3 | **Archive cards use `h2` per article title.** Demote to `h3` for strict heading hierarchy under "All articles". "one-word change." | S11 §8.2 | Yes | **U** | Pre-existing, not designer-introduced. |
| T-4 | **Blog hero images still use `<img>`.** Migrating to `next/image` "needs a sizing/domain config pass". Deliberately deferred as a behaviour change. | S11 §3.8, §8.3 | Yes | **U** | |
| T-5 | **Hub heading-case judgment calls** from the agent conversion (e.g. "Holdover relief and stamp duty on transfer"). "one-line string edits in the nine hub page files if any read wrong to the owner." | S11 §8.4 | Yes | **U** → **O** eyeball | |
| T-6 | **Session 6 §3.1 visual QA leftovers, never worked:** `DepartureWindow` (boarding pass, "the most decorative thing on the site"), `SchemeFlow` connectors at `md`, `LocationMap`'s UK outline, `FilingDates` calendar tiles. | S4 §3.1 → S5 §4.1 → S6 §3.1 → S7 §5.2 → S8 §8.2 → S9 §8.2 → S10 §8 → S11 §8 | Yes | **U** | Carried unresolved through eight sessions. `LocationMap` is the highest risk: hand-built, verified only by ASCII rasterisation. |
| T-7 | **`vendor/web-shared/tools/components/Field.tsx` toggle fix.** Estate-wide file, 15 sites. | S10 §6.3, §0.6 step 2 | Yes | **U**, gated | CONTEXT §5 names this as the one exception worth recovering. |
| T-8 | **`SpecialistWidget` failure mode.** The designer's harness had to work around its auto-open (`AUTO_OPEN_DELAY_MS = 600`, ignores the once-per-session guard in dev, covers ~⅓ of a 1440px viewport). CONTEXT §6.4 records a separate claim that it "can take the site down". | S6 §0.1; CONTEXT §6.4 | Yes | **U** ⚠ | **This is an interruptive on-site surface, live today.** Not designer-introduced, but the port is when to raise it. |
| T-9 | **`/locations` city cards 301 through `LOCATION_TO_BLOG`** for four of five cities (london, manchester, birmingham, bristol). Only leeds is served by `[slug]`. Two options put to the owner in S2 and never chosen. | S2 §3.1 → S3 §3.7 → S4 §3.3.5 → S5 §4.3.6 → S6 §3.3.14 | **Probably moot** | **U** to check first | "**The oldest unanswered decision on the project.**" But `locations/[slug]/page.tsx` and `middleware.ts` are both heavy-churn on our side (CONTEXT §4) — re-derive the current state before re-asking. Note option (b) = retiring live 301s, which our standing rule discourages. |
| T-10 | **`/research/landlord-tax-index` hero half-matched + one legacy-styled eyebrow.** Owner asked whether to align the whole hero or just convert the eyebrow, never answered. | S3 §3.1 → S6 §3.3.12 | Partly closed | **U** | S6 §1.3 fixed the ground and stat tiles; S9 §7 rebuilt the page further. The eyebrow question technically survived. Low value now. |
| T-11 | **Session 5 §3 ambiguity: the green "Free tool" pill.** The owner asked for it removed; it was applied to NRL (stripping an emerald *rule* off a label) and only later did a literal pill turn up on `/incorporation`. "**The NRL change may therefore have been made on the wrong page.** The user was asked and did not answer." | S5 §3 → S6 §3.3.8 | Yes | **O** (one glance) | Fix if wrong: restore the shared `<Eyebrow>` on NRL's free-tools block. |
| T-12 | **`/incorporation` has no `BreadcrumbList` JSON-LD.** "Two-line fix with the existing helper. **Offered, not authorised.**" | S6 §3.2.1 → S11 | Yes | **U** | The other two pages in that group were fixed in S9 §7.5. |
| T-13 | **`/services` has no CGT card** among the six service cards, despite CGT being sold in the FAQ, testimonials and blog hubs. "Adding it makes seven, which needs a layout call on the three-column grid." | S1 §4.2 → S6 §3.3.15 | Yes | **U**/O | Dropped out of the lists after S6; never resolved. |
| T-14 | **`/services/landlord-accountant` is ~26,000px tall.** Three recommendations made and not taken: a figure in the hero's empty right 45%, colour the washed-out `ProcessTimeline` numerals, merge Investors + Letting agents into one "We also act for" block (~1,500px saving). | S6 §3.2.2 → S11 | Yes | **U** | |
| T-15 | **Is `/making-tax-digital-landlords` too visually busy?** "a calendar tile with a looping pulse, a filing figure, a specimen table, a points counter, an escalation bar set, a glowing card grid and a marquee… If it does, the glow and the marquee are the two to drop first." | S9 §8.1.3; S10 §8 | Yes | **O** (one glance) | Same question raised for `/section-24`'s four moving things (S8 §8.1.6). |
| T-16 | **The five bespoke calculator pages end navy-panel-on-navy-footer** (no FAQ between). "the owner saw this and accepted it… contained variant is a one-word change per page if it grates." | S10 §3, §8.3 | Accepted | — | Recorded so nobody "fixes" it. |
| T-17 | **`CardStack` has no remaining usages.** Subsumed into O-4. | S9 §8.1.2; S10 §7 | Yes | **U** | |
| T-18 | **`/property-tax-rates` and `/research/landlord-tax-index` have had the §7.5 mid-page-ask treatment; the other three resources pages have differing counts.** `/section-24` and `/making-tax-digital-landlords` have two mid-page asks; `/landlord-tax` has one. | S9 §8.1.4 | Yes | **U** | Low value. |
| T-19 | **Wide tables at 390 rely on `overflow-x-auto`, which gives no signal there is more to the right.** | S8 §8.1.5 | Partly | **U** | S9 §5 solved it for the MTD specialist comparison (stacks into labelled pairs). The band table and personal-vs-company table still rely on it. |
| T-20 | **`heroTitle` / `heroSubcopy` extraction into `layout-utils.ts`.** Hand-repeated across 17 files, edited three times in three directions. Surveyed in S5, **abandoned, nothing modified**. | S3 §3.5 → S4 §3.3.4 → S5 §4.3.2 | Yes | **U** | Designer's warning: "the near-miss variants must not be silently normalised, that is a visual change". |
| T-21 | **Icon-badge classes still inline in ~14 places**, not extracted to `layout-utils.ts`. "Left inline to avoid a half-adopted abstraction." | S1 §4.5 → S3 §3.13 | Yes | **U** | Low value. |
| T-22 | **`~190 em-dashes in code comments, 71 in `src/tests`.** "None reach a reader." Sweep offered, not authorised — and a blind sweep "would have rewritten test fixtures that assert on exact strings". | S6 §1.6, §3.2.5 → S11 | Yes | **U** — recommend: leave | |
| T-23 | **`CardCarousel` has no pause control** (WCAG 2.2.2 departure by explicit owner instruction). | S4 §1.7, §3.2.4 → S11 | Accepted by owner | **O** if revisited ⚠ | "do not silently 'fix' it back." Note the compound risk the designer flags: under Reduce Motion the carousel does not rotate **and there is now no control to start it**. |
| T-24 | **`ComparisonTable`'s CTA sits inside the horizontal scroller** on the desktop layout, by explicit owner request that it sit under our column. Exposure is the `md`-to-`lg` band on a narrow window. | S4 §3.2.5 | Accepted | — | |
| T-25 | **The `/services/landlord-accountant` "Our clients" `CardCarousel` vs `PromptMarquee` comparison** the designer asked for in S3 "has not happened yet"; left alone deliberately in S6. | S3 §1.6; S6 §3.2.4 | Yes | **U** | Low value. |
| T-26 | **`/section-24`'s Deliverables is still a navy card on white**, not a full-width band. "a bigger job there because the card sits mid-section after prose and the section would need splitting." | S5 §4.2.4 → S6 §3.3.5 | Yes | **U** | |
| T-27 | **`/landlord-tax` FAQ sits after the `#book` panel**, "so the last thing on the page is not the ask". Consistent with the template, flagged as a trade. | S7 §5.1.4 | Accepted | — | |
| T-28 | **Odd-row tails on 2x2 grids** (`The case for`, 5 items → 2+2+1). "Needs a content call, not a layout one." Partly resolved by accident when `The engagement` became a `ProcessTimeline`. | S3 §3.6; S4 §3.3 note | Yes, minor | **U** | |
| T-29 | **The test suite has never been run against any of this.** `vitest` not installed in the snapshot, and their tests import the §0 missing modules. | S1 §4.6, restated in **every** session | Yes | **U** | Trivially closed on our side — this is a snapshot-only constraint. |

### 4.4 Items that are snapshot-only and close on contact with the monorepo

Listed so nobody chases them: `vitest` not installed; ~325 pre-existing `tsc`
errors; the repo not being under git ("deletions are unrecoverable", which
shaped several designer decisions); the 22 quarantined entrypoints; the 31
vendored `web-shared` fakes; the 11 generic `/calculators/*` pages lacking the
glass gate because their `Calculator` is a 77-line stub (S3 §3.3 — **the fix is
to port `HeldResult` into our real `Calculator`, which the designer says is
"self-contained, no local imports beyond React"**); and the whole of SESSION10
§0 / SESSION11 §0 deploy blocker.

---

## 5. What they deliberately did NOT do, and why

A porting agent "finishing the job" would undo these. Each is a stated
decision, not an omission.

### 5.1 Conversion surfaces they refused

1. **No sticky bottom CTA.** S9 §2 explicitly retracts their own session 8
   recommendation: "Session 8 §8.1 item 2 calls `StickyCTA` 'the cheapest win
   available'. **That recommendation is wrong and should not be actioned.**"
   Citing `BlogPostRenderer.tsx:459`: "StickyCTA removed 2026-07-09: 586 shown
   / 1 click current-era (readout §4)."
2. **No mid-page inline capture.** Built on three pages, then removed on owner
   instruction. "**This closes session 8 §8.1 item 3 as 'will not do'. Do not
   re-propose inline capture at the worked-example moment.**" (S9 §1.2)
3. **No modal for the blog sidebar CTA.** (S11 §3.2)
4. **Left the in-article capture islands alone** (`GateOrForm` /
   `PremiumUpgrade`): "placement is data-informed, see session 10 §3".
   (S11 §3.8)
5. **Did not treat the second form some articles carry as a bug**: "the second
   form some articles carry is the pre-existing resource gate, not a
   regression." (S11 §3.8)
6. **No `StickyCTA` on any service page** — raised three times, never actioned.
   (S5 §4.2.2; S6 §3.3.4; S8 §8.1.2, then retracted in S9 §2)

### 5.2 Content they refused to touch

7. **Blog post frontmatter.** Category names were canonicalised at the display
   layer via `categoryDisplayName()`; "**The frontmatter itself was
   deliberately not touched.**" (S11 §2.2)
8. **Article `h1` on `/services/property-accountant`** left untouched when the
   hero became problem-led, "so the categorical search term survives."
   (S5 §1.9.2)
9. **Did not write the `/incorporation` FAQ.** "The answers are tax positions
   the client must stand behind, **do not invent them**." (S5 §4.2.1)
10. **Did not supply a fee figure.** "as far as it goes without inventing
    prices." (S5 §4.2.7)
11. **Did not put a figure on the Wales tile.** (S7 §4.5)
12. **Did not sweep em-dashes from code comments or `src/tests`**, because a
    blind sweep "would have rewritten test fixtures that assert on exact
    strings", and none reach a reader. (S6 §1.6)

### 5.3 Design moves they built and reverted, or refused

13. **`TestimonialsSection` light variant** — built, reverted, "do not re-add
    without being asked". (S2 §1.3)
14. **`CTASection` bold variant** — added then "**fully reverted**… byte-for-byte
    the original". (S2 §1.8)
15. **Featured/highlighted middle client tier card** — removed; "Do not
    reintroduce a featured card." (S2 §1.1)
16. **2x2 grid on the "Free tools" sections** — applied, "**reverted at the
    user's request**", twice. (S3 §1.7)
17. **NRL Filing section as cards** — converted, reverted, then the two election
    cards reverted too. "Its current state, four prose paragraphs plus the
    calendar figure, is what they settled on. **Do not 'improve' it back into
    cards.**" (S5 §1.5)
18. **Hero jump-link chip rows** on `/property-tax-rates` and
    `/research/landlord-tax-index` — added S8, "**removed by explicit
    instruction… Do not re-add them.**" Section ids and `scroll-mt-24` were
    kept so deep links still land. (S9 §7.1)
19. **Hero trust badges** removed from three pages on request; "**Nothing else
    on the site uses that pattern now.**" (S6 §1.7)
20. **Parallax** — proposed and declined on motion-policy grounds. (S2 §4.5)
21. **`CardCarousel` autoplay** was initially refused ("**No autoplay, on
    purpose.** Motion on this site is opt-in, and these cards are dense
    read-this copy rather than glanceable quotes"), then added for one usage
    with guards. (S3 §1.6 → S4 §1.7)
22. **A dark variant of `ComparisonTable`** and of the rate tables — not built.
    "it is a self-contained white card with its own ring and shadow, and it
    reads harder floating on navy than it did on white." (S6 §1.2.2; S7 §1.1.6)
23. **Tick-and-cross for the MTD specialist comparison** — refused: "the copy
    directly above it says 'any competent accountant can file a quarterly
    update', and a cross column would contradict it." (S9 §5)
24. **A red cross for the other side in `ComparisonTable`** — refused: "The
    other side gets a **neutral dash, never a red cross**. Both pages' copy
    explicitly says general firms are competent; the honest claim is about
    focus and timing, not ability." (S4 §1.4)
25. **`ProblemStatement` reuse for per-page marquees** — refused, "because it
    hard-codes the homepage set". Pages define their own `Prompt[]`. (S8 §4.5)
26. **Did not swap `/services/landlord-accountant`'s "Our clients" carousel to
    `PromptMarquee`.** "Left alone deliberately: it does the same job and
    swapping is a visual change." (S6 §3.2.4)
27. **Did not normalise the near-miss `heroTitle`/`heroSubcopy` variants.**
    Survey done, work abandoned, **nothing modified**: "that is a visual
    change, and there is no visual QA." (S5 §4.3.2)
28. **Did not use `FilingDates` on `/landlord-tax`** despite it existing: its
    closing line "Living abroad does not move any of these dates" is
    NRL-specific and it lacks the 5 October registration date. (S7 §5.2)
29. **Did not scale `FilingCadence` blocks to the periods they cover**, did not
    centre `PortfolioPooling`'s axis, did not put an axis on `TaxYearGap` or
    `DepartureWindow`, did not saturate `RentalProfitStack`'s slate. All four
    carry code comments saying so. (S9 §5; S4 §1.1; S5 §2.5; S7 §2.4)
30. **Did not apply the template to `/property-tax-rates` and
    `/research/landlord-tax-index` wholesale.** No stats strip on the index
    page ("Its hero already carries four live figures… A second stat row
    directly beneath would say less than the one above it"), no prompt marquee
    on either ("A reader arrives from a search like 'SDLT additional rate 2026'
    wanting a percentage; telling them they have a problem interrupts the task"
    / "part of its audience is journalists and researchers. A column of
    first-person worries beside Companies House figures undercuts exactly the
    credibility that makes the page citable"). **"Recorded because a future
    session will otherwise 'finish the job' and make both pages worse."**
    (S8 §3.1)
31. **Did not delete the four dead components** — "The user chose 'leave them
    for now'. Do not delete without asking again." (S5 §4.3.3)

### 5.4 Engineering they refused

32. **Did not rewrite the missing `lead-nurture/tokens`.** "Reinventing it here
    would produce incompatible tokens and hand-rolled crypto where a real,
    tested implementation already exists in the source monorepo." (S10 §0.4)
33. **Did not delete the quarantined originals** — preserved byte-for-byte as
    `*.disabled`. (S10 §0.3)
34. **Did not replace `vendor/web-shared/` wholesale**, and warn us not to:
    "**Copy in only the missing files**… this session fixed a real rendering
    bug in `vendor/web-shared/tools/components/Field.tsx` that a wholesale
    overwrite from the monorepo would silently revert." (S10 §0.6 step 2)
35. **Did not fix the `globals.css` heading override**, only worked around it
    with `!` modifiers, "because that re-activates every previously dead
    heading utility site-wide and needs its own visual QA pass first."
    (S11 §8.0; DG §2)
36. **Did not migrate `<img>` to `next/image`** — "behaviour change, deserves
    its own pass". (S11 §3.8)
37. **Did not deploy.** "Until §0.6 is done, treat every deploy request as
    blocked." (S10 §0.5; S11 §0)

---

## 6. Verification worklist — claims about our system to check, not trust

They worked from a July snapshot with nine shared modules missing and 31
vendored fakes. Every claim below is stated by them as a fact about "the site".
Cited so you can go straight to it.

### 6.1 Bugs they claim exist (highest value — these may be live today)

| # | Claim | Source | How to check |
|---|---|---|---|
| V-1 | `globals.css` carries an **unlayered** `h1..h6 { font-weight:700; line-height:1.2; letter-spacing:-0.02em }` that beats every Tailwind v4 heading utility site-wide | S11 §6, §8.0; DG §2 | Read our `Property/web/src/app/globals.css`; then `getComputedStyle` on a heading carrying a `leading-*` utility |
| V-2 | `BlogPostRenderer` renders `LeadForm` bare on `bg-slate-900` while labels are `text-slate-900` → **invisible labels on every article's primary conversion point** | S11 §3.1 | Load an article, inspect the enquiry form labels. **Fix independently of the port if true.** |
| V-3 | `/blog/property-accountant-services` never renders: the slug is a key in **both** `SLUG_TO_CATEGORY_MAP` and `DUPLICATE_REDIRECTS` in `src/middleware.ts` | S11 §4 | Grep both maps; curl the route |
| V-4 | `LOCATION_TO_BLOG` at `src/middleware.ts:469` 301s `/locations/{london,manchester,birmingham,bristol}` to blog articles; **only `leeds` is actually served by `[slug]`** | S2 §1.9, §3.1 | Grep the map; curl all five |
| V-5 | `WhyUsList` uses a flat `threshold: 0.99` and "probably never fires on mobile" | S2 §1.2; fixed by them in S5 §1.1 | Read our copy of the component |
| V-6 | Six calculator pages had `text-slate-600` breadcrumbs on `bg-slate-900` (~1.9:1) | S1 §3.5 | May already be fixed our side |
| V-7 | Toggle fields on `/calculators/{capital-gains-tax-calculator, lbtt-calculator-scotland, ltt-calculator-wales}` render as bare unstyled 13px browser checkboxes | S10 §6.3 | Load the three pages. **Estate-wide fix if true.** |
| V-8 | `SpecialistWidget` auto-opens on every page load (`AUTO_OPEN_DELAY_MS = 600`, ignores the once-per-session `sessionStorage` guard **in dev**) and covers ~⅓ of a 1440px viewport | S6 §0.1 | Read the component; check whether the guard holds in prod. CONTEXT §6.4 adds an undiagnosed "can take the site down" claim |
| V-9 | `first-time-buyer-stamp-duty-calculator.ts` contains a literal en-dash ("£300,001–£500,000") | S10 §3 | Grep. Cheap, and it is a live copy rule violation if true |
| V-10 | `CalculatorTabs` lacked arrow-key nav and roving `tabindex` (they fixed it) | S3 §3.4; S5 §1.1 | Read our copy |
| V-11 | `globals.css` sets `scroll-behavior: smooth` on `html`, which breaks programmatic `window.scrollTo` | S8 §1 | Grep. Relevant to any scroll-based tooling we run |

### 6.2 Structural claims about our codebase

| # | Claim | Source |
|---|---|---|
| V-12 | `src/lib/calculators/registry.ts` is the single source of truth, 5 bespoke + 11 generic, `TOOLS.length` = 16 | S1 §2; DG §6 — **we have shipped more calculators since; the count is almost certainly stale** |
| V-13 | `footer_links` in `niche.config.json` is read by nothing else in the codebase | S2 §1.4 |
| V-14 | `MiniCapture` already stages fields behind `NEXT_PUBLIC_MINIFORMS_MULTISTEP` with a documented rollback path | S8 §8.1.1 — **CONTEXT §4 says we deleted 739 lines of `MiniCapture`. Check before quoting the O-2 plan.** |
| V-15 | `src/lib/ai/qa-gate.ts:182` fails generated content on `/—\|–/` as rule 1, "em_dash", catching en-dashes too | S1 §3; S6 §1.6 |
| V-16 | `BlogPostRenderer.tsx:459` carries the comment "StickyCTA removed 2026-07-09: 586 shown / 1 click current-era (readout §4)" | S9 §2 — **the readout itself "is not in this repo"; find it before relying on the number** |
| V-17 | `StickyCTA` is live on `/` and nowhere else | S9 §2 |
| V-18 | The homepage hero primary is `bg-blue-600` with `data-cta="hero_book"` and is an **active A/B variant** | DG §1 — verify the experiment is still running before treating it as untouchable |
| V-19 | The stats array was copy-pasted between the homepage and `/about`, each with a comment asking the next person to sync by hand; the £2.4M+ figure is real | S5 §1.6 — check whether our monorepo has a `site-stats` equivalent or still carries the duplicates |
| V-20 | `[category]/[slug]` is the **only** article route, so `BlogPostRenderer` changes reach all ~800 articles | S11 §3 — we have 783 posts and a `/blog/property-finance` hub they never saw |
| V-21 | Post frontmatter spells the same category up to four ways; slugs already converged | S11 §2.2 |
| V-22 | `buildBreadcrumbJsonLd` exists in `lib/schema.ts` | S9 §7.5 |
| V-23 | `content/resources/` holds six gated guide bodies | S1 §2 |
| V-24 | GA4 is `G-B5MCP5NGMY`; Clarity is present | S1 §2 — **our `clarity_removed_pecr_decision` memory says Clarity was killed. Their snapshot is stale here.** |
| V-25 | `/locations/london` 301s to a blog page by design and resolves 200 | S10 §6.4 |
| V-26 | Only one duration claim exists on the site: a "20-minute call" in `BlogPostRenderer` | S6 §1.5 |
| V-27 | `HeldResult` is self-contained with no local imports beyond React, so it can be ported into the real `Calculator` | S3 §3.3 |
| V-28 | `ResultGate`'s rules are documented in its file header | S1 §2; DG §6 |

### 6.3 Claims about the live site (they measured a preview against production)

| # | Claim | Source | Note |
|---|---|---|---|
| V-29 | "the live homepage is 15.8k px with **four inline calculators each carrying a duplicate capture form**; the rebuild is 9.7k px with one form" | S11 §1 | If true this is four extra forms on our live homepage — a one-form-rule violation and a measurable page-weight problem. **Verify directly.** |
| V-30 | Positioning pillars: property-only focus, fixed fees, 24hr response, MTD ready, **100+ landlords, £2.4M+ tax savings identified** | S1 §1 | Must match `docs/Property/house_positions.md` |
| V-31 | "No public phone number is advertised; all enquiries route through on-site forms" and `/book` is the contactability signal that promotes a lead for handoff to DJH | S1 §1 | **`property_process_audit_state` memory says the DJH gate is OBSOLETE, purged 2026-08-14.** Their business model description may be a year stale. Check before accepting any argument built on it (notably C4 and O-2). |
| V-32 | `/section-24`'s facts are current: FA 2026, reducer 20% rising to 22% from April 2027, property income at 22/42/47 | CONTEXT §6.5 (spot-check already done) | Extend the spot-check per page |

---

## 7. Questions the designer asked that appear unanswered

Ordered by how much they block. "Unanswered" = the designer says so in their own
words, or the question survives unchanged into a later session's carried-forward
list.

| # | Question | Asked | Designer's own words | Status |
|---|---|---|---|---|
| Q1 | **Homepage hero closer** — will the owner write it? | S1 §4.1, repeated in all 11 | "Four drafted conversion-bridge options were rejected; the owner wants to write this himself at final review. **Remind him when he signals final-review mode.**" | Open, 11 sessions |
| Q2 | **`StatsCounter` and the example-figures asterisk** — does the firm's own proof strip carry it? | S9 §1.1 | "It was flagged to the owner and **is awaiting his answer.**" | Open |
| Q3 | **`/services/property-accountant` fee figure** — an entry figure or a range per end-panel? | S5 §4.2.7 | "**Asked for, not yet supplied.**" | Open, 6 sessions |
| Q4 | **`/incorporation` FAQ** — a draft was offered | S5 §4.2.1 | "The user was offered a draft and **has not responded.** The answers are tax positions the client must stand behind, do not invent them." | Open |
| Q5 | **`/locations` city cards** — option (a) point cards at the blog articles, or (b) retire `LOCATION_TO_BLOG` so `[slug]` serves again? | S2 §3.1 | "**neither has been chosen**… the oldest unanswered decision on the project." | Open (may be moot, see T-9) |
| Q6 | **The green "Free tool" pill** — was the NRL change made on the wrong page? | S5 §3 | "**The user was asked and did not answer.** If the intent was the pill, restore the shared `<Eyebrow>` on the NRL free-tools block." | Open |
| Q7 | **`/research/landlord-tax-index` hero** — align the whole hero or just convert the stray eyebrow? | S3 §3.1 | "The user was asked whether to align the whole hero or just convert the stray eyebrow, and **has not answered**"; restated S4 §3.3.1 as "**never answered**" | Mostly overtaken by S6/S9 work |
| Q8 | **Delete the dead components?** (`CardStack`, `CTASection`, `ResourceGateLazy`, `ResourceGate`, `ExcelPreview`) | S9 §8.1.2; S10 §7 | "Owner decision required." Earlier round: "The user chose 'leave them for now'." | Open |
| Q9 | **Does `/making-tax-digital-landlords` now read as too busy?** | S9 §8.1.3 | "Each is individually justified and the devices do not repeat. Together it may read as busy. If it does, the glow and the marquee are the two to drop first." | Open |
| Q10 | **Should `StickyCTA` be added to the long resources pages?** | S9 §2 | "**Settle this with the owner before anyone acts on the session 8 note.**" Designer's own recommendation: no. | Open |
| Q11 | **`/incorporation` `BreadcrumbList` JSON-LD** — two-line fix | S6 §3.2.1 | "**Offered, not authorised.**" | Open |
| Q12 | **Em-dash sweep of code comments and tests** | S6 §3.2.5 | "**Offered, not authorised.**" | Open |
| Q13 | **Wales SDLT/LTT figure** the client stands behind | S7 §5.1.2 | "Only fixable with a Welsh figure the client stands behind." | Open |
| Q14 | **`/services/landlord-accountant` at 26,000px** — take the three shortening recommendations? | S6 §3.2.2 | "Three further recommendations were made and **not taken**." | Open |
| Q15 | **Nine consecutive light sections on `/services/landlord-accountant`** — break them with a navy band? | S4 §3.2.1 | "Raised with the user, **no decision taken**." Partly addressed in S6 §1.2.2. | Mostly closed |
| Q16 | **The Triggers copy that lost SDLT surcharges / MDR / Let Property Campaign** — does any of it need a home? | S4 §3.2.2 | "Flagged to the user, **no decision**." | Open |
| Q17 | **Carousel vs grid comparison** on "see yourself in one of these" sections | S3 §1.6 | "**That comparison has not happened yet.**" | Open, low value |
| Q18 | **Is the `/services` `primaryHref` → `/book` funnel change correct?** | S2 §1.6 | "**not objected to, but not explicitly confirmed either.**" | Open |
| Q19 | **ATED as the sixth `/landlord-tax` tax card** | S8 §2.1 | "**the owner has not explicitly signed it off.**" | Open |
| Q20 | **`PortfolioPooling`'s invented figures** — are there real anonymised numbers? | S4 §3.2.7 | "If real anonymised numbers exist they are a single array at the top of the file." | Open |

---

## 8. Interruptive-surface audit (flagged hard, per the brief)

The owner must approve any popup, modal, banner, toast or sticky overlay
individually. Across eleven sessions the designer added **none**. What exists,
and who owns it:

| Surface | Status | Designer's position | Ours |
|---|---|---|---|
| Sticky bottom CTA | **Not added** | Explicitly refused twice, citing our own 586-shown/1-click readout (S9 §2) | Nothing to approve |
| Modal for the blog sidebar CTA | **Not added** | Refused: would duplicate the seven-field form (S11 §3.2) | Nothing to approve |
| Modal / popup anywhere for forms | **Not added** | "Anchors over popups… No modals for forms." (DG §4) | Nothing to approve |
| Mid-page inline capture | **Built then removed** | Owner instruction, closed "will not do" (S9 §1.2) | Nothing to approve |
| `ResultGate` soft gate on calculator results | **Pre-existing, extended** by the frosted-glass treatment | "the reader sees the true shape of their own answer" (S3 §1.3) | **⚠ Owner call.** An in-flow content gate. CONTEXT §7 already lists it as unvalidated |
| Blog resource-gate island (`GateOrForm`) | **Pre-existing, left alone** | "placement is data-informed" (S11 §3.8) | ⚠ Owner call, but only if he wants it revisited |
| `SpecialistWidget` auto-open | **Pre-existing**, worked around in the harness | Auto-opens after 600ms, covers ~⅓ of a 1440px viewport (S6 §0.1) | **⚠ This is the one true interruptive surface, and it is live today. Not part of the port, but the port is when to raise it.** |
| Consent banner | Pre-existing | Noted only (S1 §2) | Locked by `clarity_removed_pecr_decision`: do not add disclosures |
| `ResultGateModal` | Pre-existing, in our heavy-churn overlap list | Not discussed by the designer | ⚠ Ours to reconcile |
| Autoplaying carousel with no pause control | **Added**, one usage → two | Owner instruction; documented WCAG 2.2.2 departure (S4 §1.7) | ⚠ Motion, not interruption, but it is an accessibility exception the owner personally authorised |
| Looping marquee + live-pulse dot | Added | "The only permitted loops" (DG §9) | Fine |

---

## 9. What I did not do

- I did not open any designer source file. Every code-level statement here is
  the designer's, attributed.
- I did not open our monorepo. §6 is the worklist for that, and no item in it
  should be treated as settled.
- I did not verify any figure, rate or tax claim. §4.2 and §6.3 flag the ones
  that need it.
