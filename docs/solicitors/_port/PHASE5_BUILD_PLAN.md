# SOLICITORS PHASE 5 BUILD PLAN — homepage, services pillar, locations

Planner output, 2026-09-11. READ-ONLY plan; no code was changed writing it.
Binding inputs: playbook §§3-6, 10, 12, 14; `PORT_FIELD_NOTES.md`; `DESIGN_SYSTEM.md`
§§0/4a/4b/4c/5/7/9; rollout appendix F.2 + H; `docs/solicitors/DESIGN_DELTA.md` (APPROVED);
`DISPOSITION_SLICE2.md` §§6-9 (hypothesis only); `STATE.md`.

**The dominant constraint is the owner's hard rule of 2026-09-11: no copy changes and no SEO
changes.** Everything below is planned around it. Where the standard cannot be met without new
prose, the standard is not met and the gap is listed in §7 as an OWNER ITEM, with evidence.
The one carve-out is the removal of our own published pricing, which is a locked content rule
the owner approved before the hard rule landed.

---

## 0. FALSE PREMISES FOUND (brief, STATE.md and DISPOSITION_SLICE2)

Every one was verified against disk today. Correct these before sequencing.

1. **`StatsCounter` / trap T15 is not live on this site and needs no fix.** The homepage renders
   the kit `StatsBar` (`app/page.tsx:9,197`), a pure server component printing literal strings.
   The kit `StatsCounter` has ALSO already been fixed upstream: `packages/web-shared/design/
   marketing/StatsCounter.tsx:35` seeds state with the true `target` and computes the 60% start
   frame inside the animation. Both halves of the premise are stale. Same shape as the Trade
   finding in the field notes.
2. **`TestimonialsSection` is a THIRD kit component that hardcodes Property's copy, and the
   field notes do not record it.** `packages/web-shared/design/marketing/TestimonialsSection.tsx:8-30`
   is a module-level `testimonials` const with no prop; the props are only `eyebrow`, `title`,
   `description`, `backdrop`. Adopting it publishes "7-property portfolio, London" and a
   hardcoded five-star `aria-label="Rated 5 out of 5"` on the Solicitors homepage. Add it to the
   known-gaps list beside `ProblemStatement` and `ComparisonTable`.
3. **STATE.md's "CLOSED in phase 2: all eleven turnaround promises" is wrong.** Four survive, all
   inside this phase's file set:
   `app/services/page.tsx:150` "Same-day response on regulatory or SRA-deadline questions";
   `app/services/page.tsx:167` "aim to issue clean reports 4-6 weeks ahead";
   `app/services/[slug]/data.ts:100` and `:205`, same 4-6 week promise;
   plus `config/service-tiers.ts:15` `{ value: "Same-day", label: "Response on regulatory
   questions" }`, which renders in the HOMEPAGE stats strip. Post-hard-rule these are OWNER
   ITEMS, not work (§7).
4. **`/contact`'s price is at `:54`, not `:50,106`, and it is a different figure.**
   `app/contact/page.tsx:54` publishes "£49 a month". Phase 6 route, recorded so the phase-6
   planner does not chase the recorded line numbers.
5. **DISPOSITION_SLICE2 §8's "`/locations` will report a false dash regression" is wrong, and it
   is a metric confusion.** The em-dash at `app/locations/page.tsx:11` is in `metadata.description`.
   `docs/_engines/instruments/sweep.mjs:106-111` strips every `<tag>` before matching `DASH`, so a
   `<meta content>` value never reaches the counted text. The recorded ceiling of 0 is correct.
   Slice 2 derived its "1" from `curl | grep -c`, which is the raw-byte metric, not the sweep
   metric (field notes §5). **Do not "fix" that em-dash: editing a `metaDescription` is exactly
   the SEO change the hard rule forbids.**
6. **DISPOSITION_SLICE2 §7's "42 em-dashes across five unprotected pages, they must all go" is
   CANCELLED by the hard rule.** They are in published body copy on `/services/[slug]`. Owner item.
7. **The card recipe on the homepage and locations is ALREADY on the contract.**
   `globals.css:186-212` restyled `.card-premium` and `.card-flat` in phase 1 to `--radius-xl`
   (4px) plus a `--card-ring` ring and `border: 0`. The 4 `card-premium` and 3 `card-flat`
   consumers in `app/page.tsx`, and the 2 in `app/locations/[slug]/page.tsx`, already render the
   standard recipe. **Do not convert them to inline Tailwind.** The `rounded-2xl` + `border`
   instances that DO breach are the ones written inline (counts in §3).
8. **`StickyCTA` is already mounted on every route**, including the homepage, from
   `components/layout/PageShell.tsx`. F.2 §1 is satisfied; do not add a second mount.
9. **The `SolicitorsBackdrop` ledger motif already exists and has 28 consumers.**
   `components/layout/SolicitorsBackdrop.tsx`, two tones, approved in the delta. The owner's
   "replace the Unsplash hero image with the ledger motif" is a two-line swap, not a build.
10. **Confirmed TRUE, re-verified:** the five `/services/[slug]` routes are absent from
    `app/sitemap.ts` (only `"/services"` at `:13`); `app/page.tsx:488` says "6 calculators" against
    13 (and `:495` says "6 pillar guides" against 10 on disk — a second stale claim the brief did
    not name, same class, same treatment); the homepage closing branch at `:557-579` renders a
    heading and a `LeadForm` and no button, because the button lives in the `packagesMode` branch
    and `niche.config.json` `cta.variant` is `leadgen`; the unsourced lock-up figure is at `:45`;
    the 26.2% claim is at `:211` and `:595`; phases 3 and 4 restated exactly 7 routes.

### 0b. NEW BLOCKER FOUND, and it gates every other package in this phase

**`Solicitors/web/src/app/globals.css` contains ZERO `@layer` blocks.** All ~45 element and class
rules from `:151` to the end are UNLAYERED, and Tailwind v4 emits every utility into a layer, so
an unlayered rule beats a layered one whatever the specificity. This is playbook T30 / field-notes
§4, third and fourth instances in the estate (Medical, Trade), unfound here across four phases.

The load-bearing one for this phase:

    globals.css:173
    a { color: inherit; text-decoration: none; }

That defeats **every colour utility and every underline utility on every `<a>` on the site**. Live
consequences inside this phase's file set: `app/services/page.tsx:343` (`text-[var(--primary)]
group-hover:underline` on the "Learn more" affordance), `:331`, `app/services/[slug]/page.tsx:161`
and `:179`, `app/page.tsx:269,292,307`, `app/locations/page.tsx` card links. Every one reads as
correct in source and renders the inherited colour with no underline.

A builder told to "give the link the brand colour" in WP2-WP4 will produce a diff that changes
nothing on screen and will then chase the wrong cause. This must be fixed first.

Deriving command (run it, do not trust this paragraph):
`grep -nE "^[a-zA-Z.][^{]*\{" Solicitors/web/src/app/globals.css` and
`grep -c "@layer" Solicitors/web/src/app/globals.css` -> 0.

Medical's second lesson applies in full: **fixing the layer bug uncovers defects it was hiding**,
so WP1 re-measures every surface that was inheriting a colour, and does it before WP2-WP4 open a
page file.

---

## 1. REALITY CHECK: F.2 running order against what renders today

`/` — `src/app/page.tsx`, 605 lines, entirely pre-port. 13 sections.

| F.2 band | today | verdict |
|---|---|---|
| 1 StickyCTA | mounted site-wide in `PageShell` | **ALREADY DONE** |
| 2 JSON-LD set | Organization + WebSite only, site-wide from the root layout (`:152`) | **OWNER ITEM.** Adding WebPage / AccountingService / Service / BreadcrumbList / FAQPage is new structured data on the site's front door = an SEO change. Do not add. |
| 3 navy motif hero | crimson gradient over an external Unsplash JPEG, `:157` | **BUILD.** `bg-slate-900` + `<SolicitorsBackdrop tone="navy" />`, host `relative overflow-hidden`, content `relative z-10`. Owner-decided. |
| 3b live-pulse badge, 5 trust badges | absent | **OWNER ITEM.** Six new strings. Out of bounds. |
| 4 white stats strip `py-5 sm:py-7 border-b` | `<section className="bg-white">` + `StatsBar`, no padding, no rule (`:195-199`) | **BUILD (classes only).** Keep `StatsBar`; see §0.1 and §7-R3. |
| 5 ProblemStatement + PromptMarquee | "What generalist accountants miss", 4 cards (`:318-341`) | **RESTYLE IN PLACE.** Do not adopt the kit (T12) and do not mirror it locally: a third copy of Property's landlord prose is the wrong answer and the manager owns the kit question. |
| 6 WhoWeAre | "Who we work with" (`:343-364`) | **RESTYLE.** |
| 7 WhyChooseUs | "Why choose us" (`:432-452`) | **RESTYLE.** |
| 8 services grid, tinted ground, 4 glow cards | "How we work" 6 cards (`:366-390`) + `ServiceTiers` band (`:454-466`) | **RESTYLE + `ScrollGlowGroup`.** Six cards stay six; the count is in no visible string here. |
| 9 WhatWeCover | navy "Free resources" band (`:468-510`) | **RESTYLE.** Already carries the literal `<a href="/calculators">`. |
| 10 `#calculators` + `CalculatorTabs` + "See all N calculators" | absent | **DO NOT BUILD.** Needs a new band heading and standfirst, and it republishes a tool's intro and result copy on the front door (phase 4's `/calculators` 0->6 dash restatement and the duplicate-content finding). The literal `/calculators` link the contract demands is already present at `:487`. Record as a deliberate departure + owner item. |
| 11 TestimonialsSection (navy) | local `TestimonialSlider`, four anonymised situation summaries (`:227-241`) | **RESTYLE LOCAL to the navy band recipe.** Do not adopt the kit: §0.2. |
| 12 latest insights, slate-50 `divide-y` row list | 3 cards (`:243-316`) | **RESTYLE.** Card-grid to row-list is layout, not copy. |
| 13 `#book` navy closing, `lg:grid-cols-[1fr_2fr]`, proof rows + white card + LeadForm | light section, heading + bare `LeadForm`, no `id`, no button (`:557-579`) | **BUILD.** `LeadCTAPanel` with `title={activeCta.home_cta.heading}` and `description={activeCta.home_cta.body}` — byte-identical to the hardcoded strings at `:566` and `:569` — `proofPoints={LEAD_PROOF_POINTS}` (existing site copy, already live on `/blog`, the 17 hubs and 13 calculator routes), `backdrop={<SolicitorsBackdrop tone="navy" />}`, wrapped in `<div id="book" className="scroll-mt-24">`. Property's three "24-hour response time" check rows are NOT ported: a turnaround promise and new copy. |
| 14 FAQ white | one `<details>` (`:582-601`) | **RESTYLE** to the phase-4 `<dl>` + `rounded-xl ring-1` pattern. NOT the kit `FaqSection` — the phase-4 manager override stands for the whole port. No FAQPage JSON-LD (band 2). |

**Hero CTA hrefs stay as they are.** `activeCta.hero_primary.href` is `/contact`
(`niche.config.json`, `cta.variants.leadgen`). F.2 wants `#book`. Changing it is an internal-link
href change, forbidden. Keep `/contact`, keep the `hero_primary` / `hero_secondary` triples byte
for byte, record the departure.

`/services` (422 lines), `/services/[slug]` (239 + 522 lines of data), `/locations` (89),
`/locations/[slug]` (295): all four are entirely pre-port. None carries a single `data-cta`, an
`id="book"`, a `scroll-mt-24`, a hero motif or a kit component. `/services/[slug]` is the closest
to the standard already: its closing band at `:213-236` is a navy two-column with a white form
card, which is F.1 §3 in all but the component.

---

## 2. LINK FLOORS AND DASH CEILINGS (per route, from `link_baseline.json`, SHA `18b4f25f`)

Floors are minima on unique internal links, ceilings are maxima on sweep-metric dashes (em AND en,
body text only). `data-cta` counts are per-route floors AND the total must be diffed (phase 4).

| route | link floor | `data-cta` | dash ceiling | owner WP |
|---|---:|---:|---:|---|
| `/` | 15 | 4 | 0 | WP2 |
| `/services` | 16 | 2 | 3 | WP3 |
| `/locations` | 16 | 4 | 0 | WP4 |
| `/locations/london` | 12 | 4 | 1 | WP4 |
| `/locations/manchester` | 12 | 4 | 0 | WP4 |
| `/locations/birmingham` | 12 | 4 | 0 | WP4 |
| `/locations/leeds` | 12 | 4 | 0 | WP4 |
| `/locations/bristol` | 12 | 4 | 0 | WP4 |
| `/specialist-vs-generalist-accountant` | 11 | 2 | 3 | WP5 |
| `/services/solicitor-accountants` | **NOT IN BASELINE** | — | — | WP3 |
| `/services/sra-accounts-rules` | **NOT IN BASELINE** | — | — | WP3 |
| `/services/llp-accounts` | **NOT IN BASELINE** | — | — | WP3 |
| `/services/practice-valuation` | **NOT IN BASELINE** | — | — | WP3 |
| `/services/cofa-compliance-support` | **NOT IN BASELINE** | — | — | WP3 |

Totals to hold: 5,343 unique internal links / 774 `data-cta` / 447 dashes are the baseline file's
current figures; the last measured post-build figures (phase 4 close) were 10,692 / 1,505 / 444.
STATE.md's PICKUP table still quotes 330 dashes: that is stale against `link_baseline.json`'s
`totalDashes` of 447, which has moved with the restatements. Quote the file, not the table.

**`restatements` currently holds 7 routes across phases 3 and 4** (6 from phase 3, `/calculators`
from phase 4). Read the array before adding to it; the reason field is the artefact, not the number.

**The five `/services/[slug]` routes have NO floor and NO ceiling**, because they are absent from
`sitemap.xml` and the sweep crawls the sitemap. WP3 is therefore ungated by the normal safety net.
DISPOSITION_SLICE2 §7 measured them live at the pre-port SHA as 18/18/19/18/18 links and 4/6/10/8/14
dashes; **those figures are slice-2's, not re-derived by this plan, and WP3 must re-derive them by
direct `curl` against a pre-port server before and after, and record the pair in the phase report.**

---

## 3. THE SMALLEST EDIT POINT PER CHANGE

| change | smallest edit point | blast radius |
|---|---|---|
| CSS layering | wrap `globals.css:151-180` in `@layer base { }` and `:186-531` in `@layer components { }` | site-wide, 294 pages |
| Unsplash hero -> ledger motif | `app/page.tsx:154-160` | 1 route |
| card recipe on `/` and `/locations/*` | **no edit** — `globals.css:186-212` already does it | 0 |
| inline `rounded-2xl` | `page.tsx` x4, `services/page.tsx` x3, `services/[slug]/page.tsx` x6, `locations/page.tsx` x1, `locations/[slug]/page.tsx` x2 = **16 instances** | 16 |
| `font-serif` retirement | `page.tsx` 17, `services/page.tsx` 10, `services/[slug]/page.tsx` 10, `locations/page.tsx` 3, `locations/[slug]/page.tsx` 6 = **46 of the 199** | 5 files |
| closing ask on all four families | `LeadCTAPanel` + `id="book" scroll-mt-24` wrapper | 13 routes gain a form (disclose) |
| our own pricing on the homepage | `config/service-tiers.ts:47` (invisible in `page.tsx`) | `/` and `/services` |
| US spelling in locations | `locations/[slug]/page.tsx:62,85,100,138` | **DO NOT EDIT** — copy. Owner item. |

---

## 4. WORK PACKAGES

Five packages. **None is manager-direct: no `packages/web-shared/` edit is planned or needed this
phase.** Every kit component this phase uses (`LeadCTAPanel`, `ScrollGlowGroup`,
`ExampleFigureNote`, `page-blocks`) already ships the props required. The three kit copy gaps
(`ProblemStatement`, `ComparisonTable`, `TestimonialsSection`) are deliberately NOT closed here;
see §7-R1.

Every package's acceptance tests begin with:

    python scripts/check_dependency_closure.py
    cd Solicitors/web && npx tsc --noEmit && npm test

and **any new import gets its declaration added to `Solicitors/web/package.json` in the same
change** (T24). No new dependency is expected: `@accounting-network/web-shared`, `lucide-react`
and `tw-animate-css` are all already declared there.

---

### WP1 — CSS layering and the link-colour repair (SEQUENCE FIRST, BLOCKS WP2-WP4)

**Files (exclusive):** `Solicitors/web/src/app/globals.css`.
Optionally one new guard test at `Solicitors/web/src/tests/globals-layering.test.ts`.

**OFF LIMITS:** `src/app/page.tsx`, `src/app/services/**`, `src/app/locations/**`, `src/config/**`,
`packages/web-shared/**`.

**Port from:** Medical's fix, recorded in `PORT_FIELD_NOTES.md` §4 (2026-09-11, two entries) and
playbook T30 (`DESIGN_PORT_PLAYBOOK.md:823`) and T31 (`:843`). Property carries no bare `a` rule
at all, which is why the kit chrome assumes the utility wins.

**Work:**
1. Wrap the element rules (`html`, `body`, `a`, `button`, `select`, `details summary`, the `*`
   box-sizing reset) in a `@layer base` block.
2. Wrap the class recipes (`.card-premium`, `.card-flat`, `.hero-glass`, `.prose*`,
   `.article-body.prose-blog*`) in a `@layer components` block.
3. **Then re-measure what the bug was hiding.** Enumerate every anchor whose colour was being
   forced: shared kit components first (`MiniCapture`, `SiteFooter`, the `LeadCTAPanel` footnote,
   `BlogCategoryHub`), then the five phase-5 page files. Any anchor that now renders a brand or
   white colour on a ground it did not before gets its ratio hand-computed against
   `DESIGN_DELTA.md` section 2, and where it fails it gets its own per-variant colour class **at
   the component** (T31: layering makes utilities win, it does not make inheritance win).
4. T30's corollary: list what ended up inside each layer afterwards, with an awk range over the
   `@layer components` block filtered to class selectors.

**Acceptance:** the two standard commands; a grep proving at least two `@layer` blocks exist;
`rm -rf .next && npx next build` at exit 0 and **294 prerendered HTML files**;
`browser_check.mjs` under `MSYS_NO_PATHCONV=1` over the five routes `"//"`, `"//services"`,
`"//locations"`, `"//blog"`, `"//contact"` with its own `--out` and `--baseline`, reading the
self-test line and the unparseable-colour count before quoting any ratio (T25 is conditional on how
a site is themed; this site uses `text-[var(--x)]` arbitrary values, so expect trouble and
hand-compute the load-bearing rows as the agreeing second method);
full sweep (`--sample=9999`, `--sha=18b4f25f39cd0c4aa084e582d69a87c8a10710ac`, own `--out`) showing
0 link-floor breaches, 0 `data-cta` regressions **including the total**, 0 dash regressions.

---

### WP2 — Homepage to the F.2 anatomy

**Files (exclusive):** `Solicitors/web/src/app/page.tsx`. May add
`Solicitors/web/src/components/marketing/HomeSections.tsx` if the page file exceeds ~650 lines.

**OFF LIMITS:** `src/config/service-tiers.ts` (WP3 owns it), `src/app/services/**`,
`src/app/locations/**`, `src/app/globals.css`, `src/app/sitemap.ts`, `packages/web-shared/**`,
`src/components/layout/SolicitorsBackdrop.tsx` (consume it, do not edit it).

**Port from:**
- `generalist/web/src/app/page.tsx:255-312` (navy motif hero, backdrop slot, CTA row), `:313-318`
  (stats strip `border-b bg-white py-5 sm:py-7`), `:406-453` (latest-insights list), `:454-465`
  (the `#book` wrapper). `generalist/web/src/components/marketing/HomeSections.tsx:1-25` is the
  model for lifting bands out of the page file, and its docstring is the recorded reason for NOT
  calling the kit `ProblemStatement`.
- `Property/web/src/app/page.tsx:415-424` and `:498-513` for the closing-band geometry
  (`lg:grid-cols-[1fr_2fr]`, white card, `id="book" scroll-mt-24`). **Do not port `:474-497`**,
  Property's three check rows: "24-hour response time" is a banned turnaround promise here.
- `Property/web/src/app/page.tsx:328` for the `id="calculators"` band — reference only, NOT built
  (section 1 band 10).

**In-repo consumption pattern to copy:** `Solicitors/web/src/app/calculators/[slug]/page.tsx:73`
(backdrop mount) and `:134-155` (`<div id="book">` plus `LeadCTAPanel` with `proofPoints`,
`backdrop`, and a `footnote` preserving an existing live `data-cta` verbatim).
`src/app/blog/page.tsx:144` is the `id="book"` wrapper phases 2-3 ported.

**Work, in F.2 order:** hero to `bg-slate-900` plus `SolicitorsBackdrop tone="navy"`; stats-strip
classes; grounds set explicitly per section and oscillated white / slate-50 with card grounds
opposing (retire every inline `style={{background:"var(--surface-elevated)"}}`); `ScrollGlowGroup`
on the "How we work" grid; `TestimonialSlider` band to navy plus motif; insights to a slate-50
`divide-y` row list; closing branch to `LeadCTAPanel`; FAQ `<details>` to the `<dl>` recipe; 17
`font-serif` and 4 inline `rounded-2xl` retired; `scroll-mt-24` on `#book`.

**Copy invariant, the acceptance test that actually matters:** the rendered page's visible word
multiset must be IDENTICAL before and after, except the single `LeadCTAPanel` default `formTitle`
and `eyebrow` chrome. Prove it the way phase 3 proved the hub prose survived. In particular "6
calculators" (`:488`), "6 pillar guides" (`:495`), the 26.2% sentences (`:211`, `:595`) and the
128-139 day lock-up sentence (`:45`) all move verbatim and none is corrected.

**Acceptance:** the two standard commands; `/` at 15 or more unique internal links, exactly 4
`data-cta` with the `hero_primary` and `hero_secondary` triples (id, placement, goal, href)
byte-identical to the pre-port render, dashes still 0; the before/after word-multiset diff
attached; the rendered `#book` target's computed `scroll-margin-top` read from the DOM, not from
the class.

---

### WP3 — `/services`, `/services/[slug]`, and the pricing removal

**Files (exclusive):** `src/app/services/page.tsx`, `src/app/services/[slug]/page.tsx`,
`src/app/services/[slug]/data.ts`, `src/config/service-tiers.ts`.

**OFF LIMITS:** `src/app/page.tsx` (WP2 owns it, though this package's edit to `service-tiers.ts`
changes what `/` renders, so WP2 re-verifies after WP3 lands), `src/app/locations/**`,
`src/app/sitemap.ts`, `src/app/globals.css`, `packages/web-shared/**`.

**Port from:** `generalist/web/src/app/services/page.tsx` as restructured in `f96f9d9a8` (the
pillar-page anatomy) and the pricing-removal pass in `c0fb02d86`, which touched
`services/page.tsx` and `config/service-tiers.ts`, the same two-file shape as here.
`Property/web/src/app/services/page.tsx` for the F.1 skeleton.

**In-repo consumption pattern to copy:** `src/app/solicitor-guides/[slug]/page.tsx` (phase 3, this
site's standard pillar anatomy) and `src/app/calculators/[slug]/page.tsx:134-180` (closing panel
then a light FAQ band, so navy never touches the navy footer).

**Work:**
1. **Pricing removal, the carve-out. In scope. List every instance.** Derive by RULE, never by the
   pound sign (T6): patterns are `£N/mo`, `£N/month`, `From £`, `Fixed monthly fee`,
   `hourly billing`, `priced separately`, `what the fee would be`. The instances THIS package owns:
   - `services/page.tsx:110` "From £180/mo", `:122` "From £450/mo", `:136` "Bespoke". Delete the
     `monthly` FIELD from `PRICING_TIERS` and its render at `:294`; do not blank it. Deleting a
     field removes a price without adding a sentence, so it is inside the rule. **Do NOT write the
     scope-line replacements DISPOSITION_SLICE2 section 6.3 proposes: that is new prose.**
   - `services/page.tsx:197`, the "How are your fees structured?" answer. ALSO in `FAQPage`
     structured data via `buildFaqPage(FAQS)` at `:228`. Read section 7 R2 first.
   - `services/[slug]/data.ts:93` "Fixed monthly fee around £1,800-£2,200" and `:113-115`
     "Essentials tier from £180/month ... £4,000-£12,000", the latter also in `FAQPage` via `:55`.
     Both render on `/services/solicitor-accountants`.
   - `config/service-tiers.ts:47` "Fixed monthly fee from £180/mo", the invisible one, inside the
     shared `ServiceTiers` data, rendering on the HOMEPAGE. Remove the bullet.
   Statutory figures are NOT ours and stay: `data.ts:382`, `lib/health-check/rules.ts:110`, every
   `lib/tools/configs/*` figure, and the ~686 pound figures protected by `house_positions.md`.
   Split by rule and prove zero hits per rule.
2. `/services`: cream `TopicHero` plus `SolicitorsBackdrop tone="cream"`; explicit oscillating
   grounds replacing the `--surface` / `--background` alternation; `rounded-2xl` x3 to `rounded-xl
   ring-1 ring-slate-200/70`; `font-serif` x10 retired; the FAQ list restyled in place, NOT the kit
   `FaqSection` (manager override); closing crimson band to a `#book` `LeadCTAPanel` carrying the
   EXISTING `:403` heading and `:406` description verbatim, `proofPoints={LEAD_PROOF_POINTS}`, and
   a `footnote` holding the two existing links so no href moves.
3. `/services/[slug]`: same treatment. The `lg:grid-cols-[1fr_320px]` sticky aside is KEPT, being
   the sanctioned useful-thing-beside-it answer and not a clamp; read field-notes section 4 on two
   clamps in one column before nesting anything sticky. `workedExample` at `:119-133` keeps its
   `border-l-4` and **gains `ExampleFigureNote`**. `rounded-2xl` x6 retired. `redirectOnSuccess`
   stays `false`: flipping it is a behaviour change nothing in the brief sanctions. Raise it.
4. **New `data-cta` instrumentation.** Both templates carry ZERO ids today and the owner has
   approved instrumenting the never-fired set. Add `services_hero_book`, `services_book`,
   `services_sub_hero_book`, `services_sub_book`, all with `data-cta-placement="services"` and
   `data-cta-goal="form"` only where the destination is a form. Net-new ids need a deploy-watch
   baseline restatement in the same change. Rename nothing.
5. **DO NOT** add `ProcessTimeline` (slice 2 section 6.6, new authored copy), rewrite any FAQ
   answer, change the "Six service areas" h2 at `:318`, touch the turnaround promises at `:150`,
   `:167`, `data.ts:100` and `:205`, or remove the `/services/[slug]` em-dashes.

**Acceptance:** the two standard commands; `/services` at 16 or more links, 2 or more `data-cta`
(expect 4 or more, all net-new, none lost), dashes 3 or fewer; the five `/services/[slug]` routes
re-measured with `curl -L` against both a pre-port server and the post-build server, links at or
above the pre-port figure and dashes unchanged, both pairs recorded in the phase report; a grep
proving zero hits per pricing rule; `/` re-checked because `service-tiers.ts` feeds it.

---

### WP4 — `/locations` and `/locations/[slug]`

**Files (exclusive):** `src/app/locations/page.tsx`, `src/app/locations/[slug]/page.tsx`.

**OFF LIMITS:** `src/app/page.tsx`, `src/app/services/**`, `src/config/**`, `src/app/globals.css`,
`src/components/ui/CTASection.tsx` (other routes still consume it), `packages/web-shared/**`,
`Solicitors/niche.config.json` (never round-trip a hand-authored JSON: field-notes section 5).

**Port from:** `generalist/web/src/app/locations/[slug]/page.tsx` and `locations/page.tsx` as
rebuilt in `f96f9d9a8`, and the data-only correction pass in `c0fb02d86`
(`generalist/web/src/app/locations/[slug]/data.ts`, +366 lines, where generalist's banned claims
were removed: read it for the CLASS, not to copy the fixes, which are copy changes we may not
make). `Property/web/src/app/locations/[slug]/page.tsx` records that the inner `max-w-4xl` clamp
was DELIBERATELY removed and `contained` used because the section above is light. Mirror both.

**In-repo consumption pattern to copy:** `src/app/blog/page.tsx:60-70` (cream hero, backdrop, kit
Breadcrumb) and `:144-155` (`id="book"` plus `LeadCTAPanel`).

**Work:**
1. Remove the `contentNarrow` body clamp on both files (`locations/page.tsx` and
   `locations/[slug]/page.tsx:195`). `siteContainerLg` IS the measure. Narrow measure is permitted
   only on the hero standfirst.
2. Both pages gain a navy motif hero, which neither has today: kit Breadcrumb, `Eyebrow onDark`, h1
   from `loc.title` or the existing h1 string, standfirst from `content.intro` or the existing
   paragraph. **No new hero CTA and no new eyebrow string.** Use the county from
   `siteConfig.locations[].county`, which is existing data, as the eyebrow.
3. Grounds oscillate white and slate-50, set per section, card grounds opposing. `.card-premium`
   and `.card-flat` stay (section 0.7). The inline `rounded-2xl border` boxes (`locations/page.tsx`
   x1, `[slug]` x2) become `rounded-xl ring-1 ring-slate-200/70`. `font-serif` x9 retired.
4. Every section carries a visual and every figure re-presents that section's own copy. Areas-we-
   cover becomes a chip row parsed from `content.areas`: same words, same order, a different
   presentation, so it is not a copy change. The London em-dash at `:53` lives in that prose; if
   the chip parse drops it, the route CEILING of 1 is not breached, but say so in the report.
5. The `localPosts` filter at `:164-166` returns ZERO posts for all five cities on this corpus, so
   the section is dead code on all five pages. **Leave it.** Slice 2 section 9.6 proposes picking a
   fallback hub, which adds links and a heading that do not exist today: new copy and new internal
   links. Owner item.
6. Closing: the bare `btnPrimary` to `/contact` at `:280-284` AND the `CTASection` at `:286-291`
   are two stacked asks. Fold into ONE `#book` `LeadCTAPanel contained` carrying the `CTASection`
   `title` and `description` verbatim, `proofPoints={LEAD_PROOF_POINTS}`, and a `footnote` holding
   the two existing `CTASection` links so `cta-section-primary` and `cta-section-secondary` survive
   with their ids, placements and hrefs intact. Same on `/locations`.
7. The raw `ld+json` script blocks (`locations/page.tsx:33-37`, `[slug]:191-194`) become the kit
   `JsonLd` component. **Same node, same content.** Do NOT add BreadcrumbList, WebPage or FAQPage as
   slice 2 sections 8.6 and 9.9 propose: new structured data is an SEO change.
8. **DO NOT** fix `optimization` to `optimisation` at `:62`, `:85`, `:100`, `:138`; do not touch
   `:276` and its many-city-based-solicitors claim; do not touch the `/locations` metaDescription
   em-dash. All copy or SEO. Owner items.
9. New ids: `location_hero_book` and `location_book`, both `data-cta-placement="location"`. One id
   per surface, never a per-city suffix, which would fork the view.

**Acceptance:** the two standard commands; all six routes at or above their floors (16, then 12
five times); `data-cta` at 4 or more on every one of the six with `cta-section-primary` and
`cta-section-secondary` still present BY ID; dashes at most 1 on London and 0 on the other four;
the `#book` target computed `scroll-margin-top` read from the DOM; the six routes rendered
visible-word multisets diffed before and after.

---

### WP5 — `/specialist-vs-generalist-accountant`, pricing removal only

**Files (exclusive):** `src/app/specialist-vs-generalist-accountant/page.tsx`.

**OFF LIMITS:** everything else. This package does NOT restyle the page.

**Why it is its own package:** two of the sixteen pricing instances sit here, no disposition slice
lists this route, and one of the two is inside `FAQPage` structured data as well as the visible
copy. It is a two-line change with a structured-data consequence and it must not be buried inside a
400-line restyle diff.

**Work:** `:57` "Specialist fees are typically £180-£1,800/month" — remove the price clause from
the answer, which changes both the rendered text and the `FAQPage` node built from the same array.
`:49` "Fixed monthly fee, scoped to firm size" is a fee-MODEL statement with no figure: leave it
and flag it (R2). Nothing else on the page is touched.

**Acceptance:** the two standard commands; the route at 11 or more links, 2 or more `data-cta`, 3
or fewer dashes; the rendered `FAQPage` JSON-LD diffed before and after with the single changed
answer shown; a T17 check that the visible answer and the schema answer are still the same string.

---

## 5. INTER-PACKAGE DEPENDENCIES (sequencing for the manager)

    WP1  globals.css layering        -> BLOCKS WP2, WP3, WP4. Land and verify alone.
      |
      +-- WP3  services + service-tiers.ts + pricing   -> lands before WP2 final verify
      |         |
      |         +-- WP2  homepage     -> reads service-tiers.ts; re-verify / after WP3
      |
      +-- WP4  locations              -> independent of WP2/WP3 once WP1 has landed
      |
      +-- WP5  specialist-vs-generalist -> independent of everything, can run beside WP1

- **WP1 first, alone, verified.** It is the only package whose blast radius is all 294 pages, and
  Medical's lesson is that it uncovers defects rather than only fixing one.
- **WP3 before WP2 acceptance.** `config/service-tiers.ts` feeds both `ServiceTiers` and `StatsBar`
  on the homepage, so WP2 cannot prove the homepage word multiset until WP3's deletion has landed.
  The file sets are disjoint, so the two can be BUILT in parallel; only verification is ordered.
- **WP4 and WP5 are fully parallel** with WP2 and WP3 once WP1 has landed.
- Serialise every `next build` (T1). One agent builds at a time.
- Every commit stages explicit paths and stages-and-commits as ONE command (field-notes section 8);
  after each, verify what YOU committed with
  `git show --name-only --format="" HEAD | grep -c "^Solicitors/"`.

---

## 6. PHASE-CLOSE GATES (in addition to each package's)

- From-scratch build: `rm -rf .next && npx next build`, exit 0, **294 prerendered HTML files**.
- Prove the artefact contains a string you changed in THIS build (field-notes section 3; T2's mtime
  check is necessary and not sufficient).
- Full sweep, `--sample=9999`, `--sha=18b4f25f39cd0c4aa084e582d69a87c8a10710ac`, own `--out`: 0
  link-floor breaches, 0 dash regressions, 0 `data-cta` regressions **and the TOTAL diffed**, since
  phase 4's route collision was invisible to every per-route gate.
- `node docs/_engines/instruments/cta_snapshot.mjs` before the first commit of the phase and after
  the last, diffing the id, placement, goal and href quadruple, not counts (T22).
- `python scripts/check_dependency_closure.py` OK across 19 sites.
- `cd Solicitors/web && npm test` at 17 files / 214 tests or better; `packages/web-shared`
  untouched, so 19 files / 406 tests must be unchanged.
- Assert the served page title and read the bound port out of the server log before trusting any
  crawl. Three wrong-site measurements happened in one session on this port.
- Any baseline restatement is written into `link_baseline.json` `restatements` with the route set,
  before, after, the reason and the deriving command, in the SAME commit.

---

## 7. RISKS AND AMBIGUITIES, WITH MY RECOMMENDED RESOLUTION

**R1. Three kit components hardcode Property's copy, and the third is new.** `ProblemStatement`,
`ComparisonTable` and now `TestimonialsSection` (section 0.2). A third local mirror is the wrong
answer and the brief says so.
*Recommendation:* **restyle the existing local sections in place, adopt none of the three, and
bundle ONE owner item asking for copy props on all three at once**: `ProblemStatement` copy props,
`ComparisonTable` copy props plus pill suppression, and `TestimonialsSection.testimonials` as a
prop defaulting to the current const. That keeps `packages/web-shared/` out of this phase entirely,
which is why no package here is manager-direct. If the owner grants the props mid-phase, WP2 swaps
three local sections for three kit calls in a follow-up commit and nothing else changes. Restyling
in place is cheaper and is wasted in neither outcome, because the copy stays put either way.

**R2. The pricing carve-out collides with the hard rule on structured data.** Two of the pricing
instances (`services/page.tsx:197`, `services/[slug]/data.ts:113-115`) and the one in WP5 are FAQ
answers that feed `FAQPage` JSON-LD. Removing the price changes the visible text AND the structured
data, which the hard rule otherwise forbids.
*Recommendation:* **the pricing rule wins.** It is a locked content rule, the owner approved
removal explicitly, and the brief carves it in. Do it as a MINIMAL clause excision, deleting the
sentence carrying the figure and leaving the rest of the answer byte-identical; disclose each of
the three schema-visible edits BY NAME in the phase report; and do NOT touch the figure-free
fee-model sentences at `services/page.tsx:151`, the non-price clauses of `:197`,
`specialist-vs-generalist-accountant:49`, and `data.ts:126`, `:221`, `:306`. Those are
pricing-ADJACENT, not published prices, and removing them is a copy change with no rule behind it.
Put them to the owner as one list.

**R3. The stats strip, StatsBar or StatsCounter.** F.2 names `StatsCounter`; this site renders
`StatsBar`. Two of the four `siteStats` values are not numeric, so `StatsCounter` cannot carry them
without new copy, and `StatsBar` is a pure server component with no T15 surface at all.
*Recommendation:* **keep `StatsBar`, add only the strip chrome** (`py-5 sm:py-7 border-b bg-white`).
Record as a deliberate departure with the reason. This is the Trade precedent verbatim. Note
separately that `siteStats[3]` is a turnaround promise (section 0.3) and is an owner item.

**R4. `/services/[slug]` is ungated.** No sitemap entry means no baseline, which means no link
floor, no dash ceiling and no CTA floor on five commercial pages that WP3 rewrites.
*Recommendation:* WP3 re-derives all five with `curl -L` against a pre-port server BEFORE opening a
file, records the pair in the phase report, and the manager treats the recorded pair as the floor
for this phase. **Adding them to the sitemap is an SEO change: plan it as an OWNER ITEM with the
evidence, not as work.** Evidence: `app/sitemap.ts:13` holds only `/services`; all five return 200;
all five are linked from `/services`; all five self-canonicalise and carry no noindex. Third phase
running that this has been recorded.

**R5. Thirteen routes gain a lead form.** `/services`, `/locations` and the five city pages gain a
`LeadCTAPanel` with an embedded `LeadForm` where they had a link or a bare button; the five
`/services/[slug]` pages already have one. Appendix K makes capture-surface scope a BLOCKER gate
and the delta's approved posture is restyle-only with one named addition.
*Recommendation:* **take it as a manager decision and disclose it**, following the phase-2
precedent that an in-flow panel at the end of a page is not interruptive (playbook section 1) and
the phase-4 precedent (13 calculator routes disclosed, not blocked). Preserve `cta-section-primary`
and `cta-section-secondary` as the panel footnote so no live series forks. One-line revert if the
owner disagrees.

**R6. The homepage closing band has no button, and adding one would use an existing config label.**
`activeCta.home_cta.primary` exists in the leadgen variant, "Book your free consultation" to
`/contact`, and is simply never rendered.
*Recommendation:* **do not render it.** A new visible button is new visible text, and the brief
already classes it as an owner item. Note in the disclosure that the label and href already exist
in config, so the owner's yes is a three-line change, not a copy exercise.

**R7. The `#calculators` band and CalculatorTabs on the homepage.** F.2 requires it; building it
needs a band heading and a standfirst that do not exist, and it republishes tool copy on the front
door.
*Recommendation:* **do not build it.** The rule that any page rendering a calculator owes one
literal `/calculators/...` anchor is vacuously satisfied because nothing renders, and the existing
literal `/calculators` link at `page.tsx:487` stays and keeps the link floor. Record as a
deliberate departure and put the band to the owner as a costed copy job.

**R8. Homepage JSON-LD.** F.2 wants seven node types; the homepage emits two, site-wide.
*Recommendation:* **add nothing.** Owner item, with the note that `buildService`,
`buildBreadcrumbJsonLd` and `buildFaqPage` are already imported and used on `/services`, so the
owner's yes is a small change.

**R9. The word-multiset test is the only thing that will actually catch a copy change.** A diff
review will not: phase 3 found that re-ordering a paragraph after a list is a copy change invisible
in a diff review.
*Recommendation:* make the before-and-after visible-word-multiset comparison a hard acceptance
criterion on all 13 routes in WP2, WP3 and WP4, with the pre-port server stood up at `18b4f25f` —
and **prove that server's age first** with a string whose commit date you know. Field-notes section
5: a stale `C:/port-base` produced a confident wrong diff on this exact port.

**R10. The `Solicitors/.git` husk.** T3. Run every git command from the monorepo ROOT; the husk
swallows operations silently.

---

## 8. WHAT THIS PHASE DELIBERATELY DOES NOT DO (the owner bundle, one turn)

1. The homepage JSON-LD set (R8).
2. The `#calculators` band and CalculatorTabs on the homepage (R7).
3. The hero live-pulse badge and five trust badges: six new strings.
4. A closing-band CTA button on the homepage (R6).
5. "6 calculators" against 13 and "6 pillar guides" against 10, `page.tsx:488` and `:495`.
6. The unsourced "average lock-up of 128-139 days", `page.tsx:45`.
7. The 26.2% SRA closure figure published without its denominator, `page.tsx:211` and `:595`.
   Verified: 11 of 42 firms in the SRA year to 30 September 2025, against 11 of 59 the year before.
   The count did not rise; the share rose because total closures fell.
8. The four surviving turnaround promises (section 0.3) plus `siteStats[3]` "Same-day".
9. US spelling in the locations data, `locations/[slug]/page.tsx:62,85,100,138`.
10. The client-count claim at `locations/[slug]/page.tsx:276`.
11. The 42 em-dashes on `/services/[slug]` and the one in the `/locations` metaDescription.
12. The five `/services/[slug]` sitemap entries (R4).
13. Copy props on `ProblemStatement`, `ComparisonTable` and `TestimonialsSection` (R1).
14. Fallback content for the five dead `localPosts` sections (WP4 item 5).
15. The fee-model vocabulary that carries no figure (R2).
