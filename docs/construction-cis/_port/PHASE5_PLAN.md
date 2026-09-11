# TRADE DESIGN PORT, PHASE 5 PLAN: HOMEPAGE AND THE THREE SERVICE PILLARS

Site: `construction-cis/web` (Trade Tax Specialists, Vercel project `trade-tax-specialists`).
Date: 2026-09-11. Planner artefact only: **no code was edited, no build was run, no git write was
issued.** Every git command was path-scoped to `construction-cis/` and `docs/construction-cis/`
from the repo root.

**Scope, verified at source.** `src/app/page.tsx` (627 lines), `src/app/services/page.tsx` (214),
`src/app/cis-refund/page.tsx` (256), `src/app/gross-payment-status/page.tsx` (273), plus
`src/config/service-tiers.ts` (the `serviceTiers` and `siteStats` arrays both routes render) and
one net-new local file. **The marketing-components half of the brief's scope is one file:**
`ls src/components/marketing/` returns exactly `LeadCTAPanel.tsx` and nothing else. There is no
`MarketingSections.tsx`, no local `ProblemStatement`, no local `TestimonialsSection`. Everything
else the homepage renders is either inline JSX in `page.tsx` or a kit import.

**Binding spec:** `docs/_engines/PROPERTY_STANDARD_ROLLOUT.md` §F.2 (homepage anatomy), §F.1
(pillar anatomy), §A.1-A.8, §D, §H, §I; `docs/property/DESIGN_SYSTEM.md` §0, §4, §5, §7, §9;
`docs/construction-cis/DESIGN_DELTA.md` §1, §2, §3, §3a; traps T1-T30
(`docs/_engines/DESIGN_PORT_PLAYBOOK.md` §6 + §14).
**Binding site inputs:** `LIVE_DEFECTS.md` (TD-01..TD-35), `FUNNEL_BASELINE.md`,
`cta_baseline.json`, `link_baseline.json`, `GROUNDS_BASELINE.md`, `house_positions.md`.
**Reference to port FROM:** `Property/web/src/app/page.tsx` (537 lines) and
`Property/web/src/components/property/MarketingSections.tsx`.

**Method.** Every file named below was opened on both sides. Every count was derived by command
against the running production server at **`http://localhost:3261`**, asserted first:

```
curl -s http://localhost:3261/ | grep -o '<title>[^<]*</title>'
<title>CIS Accountants &amp; Construction Tax Specialists | UK</title>   # PASS
```

---

## 0. CORRECTIONS TO THE BRIEF AND TO THE DISPOSITIONS

Eleven. Read these before anything else: seven of them change what a builder would otherwise be
told to do, and three of them would have caused the builder to write code that is already written,
delete a link floor that does not exist, or invent a duplicate that is not there.

| # | Claim | Status | Correction |
|---|---|---|---|
| 1 | Brief: "Phase 5 is the big one, a 15-to-16 section homepage rebuild" | **FALSE, and the source of the false sizing is a miscount of the standard itself** | **Property's own homepage renders 7 `<section>` elements** (`Property/web/src/app/page.tsx:239, 279, 295, 328, 364, 420, 517`). The other F.2 blocks are components that emit their own section: `ProblemStatement`, `WhoWeAreSection`, `WhyChooseUsSection`, `WhatWeCoverSection`, `TestimonialsSection`. F.2's real anatomy is **12 content blocks**, 5 of which are imports. Trade today has **15** `<section>`s. The port is therefore a net **reduction** of two sections and a relocation of four, not a 16-section build. See §3. |
| 2 | Brief: "the homepage stat row currently shows 45 trades in two different components" | **FALSE. It renders exactly once.** | `grep -n '45' src/app/page.tsx` returns **one hit, `:581`, and it is `rotate-45` on a FAQ toggle icon.** The only "45" stat is `src/config/service-tiers.ts:76` `{ icon: "🏗️", value: "45", label: "Construction trades covered" }`, rendered once via `<StatsBar stats={siteStats} />` at `page.tsx:247`. The duplicate the brief describes **existed and was already resolved**: TD-13's closure put "45 / Construction trades covered" into `keyStats`, and TD-11's later closure overwrote that tile (`LIVE_DEFECTS.md` TD-11 records the reasoning verbatim: *"12 and 45 were rejected as the replacement because `src/config/service-tiers.ts:69,76` already show both on the same homepage via `StatsBar`"*). Current `keyStats` (`page.tsx:42-47`) is `4 years / 1.4m+ / 20% / 55p`. **Nothing to resolve. Do not "fix" this.** |
| 3 | Brief: "the calculator file is Phase 4's, so say who fixes what" | **FALSE as stated; Phase 3 already assigned it, to Phase 5** | `PHASE3_PLAN.md` §5, "Shared, read-only for all four": *"`src/lib/calculators/**`, `src/app/services/page.tsx`, `src/app/gross-payment-status/page.tsx`, `src/config/service-tiers.ts` (**phase 5**). This is where the TD-05 '30% of the tax lost' fabrication lives and it is NOT Phase 3's ... all four phase 5's, all four to be fixed in ONE commit (T23)."* No `PHASE4_PLAN.md` exists yet (`ls docs/construction-cis/_port/` confirms). **Resolution in §2 WP-D0: Phase 5 owns the seven defective lines wherever they live, including inside the calculator tool file, and Phase 4 takes those two lines as read-only.** That is the only shape that satisfies T23's one-commit rule. |
| 4 | Brief + `DISPOSITION_SLICE2.md` 6b.7: a literal `<a href="/calculators/cis-refund-estimator">` "raises each pillar's floor from 14 to 15+" | **FALSE after Phase 1** | The chrome now emits **four calculator slugs**, measured on the live `/services`: `/calculators/cis-deduction-calculator`, `/calculators/cis-refund-estimator`, `/calculators/cis-sole-trader-vs-limited`, `/calculators/cis-take-home-calculator`, plus `/calculators`. A literal anchor to any of them adds **zero** unique destinations (T14 counts unique internal destinations, not anchors). The only link lift available to a pillar is a `/blog/*`, `/for/*`, `/glossary/*` or `/locations/*` destination. See §4. |
| 5 | Brief: "T14 link floor `/` 59, `/services` 14, `/cis-refund` 14, `/gross-payment-status` 14" | **Stale as a description, still valid as a floor** | Measured live on :3261 - `/` **65**, `/services` **20**, `/cis-refund` **20**, `/gross-payment-status` **20**. Chrome contributes **20** unique destinations to every route (Phase 1 grew it from 14; verified as the intersection of all four routes' destination sets). Every route sits exactly **+6** over its recorded floor and that +6 is the chrome delta and nothing else. **Body-unique links: `/` = 45 (the trade grid, all of it). The three pillars = 0.** |
| 6 | Brief: "tick glyphs and process numerals rendering `--accent` at **2.80** and **2.76**" | **Both figures are the wrong instrument for these instances**, exactly the error `DESIGN_DELTA` §2's preamble exists to prevent | Every one of these instances is a Tailwind **UTILITY** (`bg-orange-500`, `text-orange-500`), not the `--accent` custom property. Tailwind v4 emits `oklch()`, so the utility renders `#ff6900` and measures **2.89**, not 2.80/2.76. Same verdict (FAIL against the 3:1 graphics floor), different number, and the number is what a later phase measures against. Quote **2.89** for every utility instance in §1e. |
| 7 | Brief: "`hero_primary\|hero\|lead` 1 ... 798 across 9 triples ... Baseline `cta_baseline.json`" | **True, but the two numbers come from different artefacts and must never be diffed against each other** | `cta_baseline.json` holds **5 distinct triples totalling 620** over 246 routes (read directly: `header_nav_primary` 246, `specialist_widget` 246, `next_step\|null\|null` 109, `next_step\|null\|form` 18, `hero_primary\|hero\|lead` 1). The brief's 798/9 is **620 + the 178 additive ids Phases 2 and 3 introduced** (82 + 50 + 45 + 1 = 178). Correct arithmetic, but a builder who curls the site and diffs 798 against the committed baseline file will report a phantom regression. State both numbers or neither. |
| 8 | `DISPOSITION_SLICE1.md` §B row 5: "MANDATORY copy fixes before this renders: drop `24h / Response guarantee` (`:46`, TD-13) and `57+ CIS guides and articles` (`service-tiers.ts:64,70`, TD-29)" | **Both already done.** Stale. | `src/config/service-tiers.ts:72-77` now reads `12 / 7 / 80+ / 45` with a provenance comment deriving each. TD-13 is marked CLOSED (all six) and TD-29 is resolved to "80+". `grep -rn '24h\|57+' src/config/service-tiers.ts` = 0. **Do not re-fix; do not re-open.** |
| 9 | `DISPOSITION_SLICE1.md` §B rows 6, 12, 14: "mirror `ProblemStatement` / `ComparisonTable` / `TestimonialsSection` / `PromptMarquee` LOCALLY" | **Technically correct about T12, wrong about whether to do it at all** | T12 is real: the kit `ProblemStatement.tsx` and `ComparisonTable.tsx` hardcode Property's landlord copy with no copy props, so they cannot be consumed and must never be edited. But the conclusion "therefore mirror four kit components locally" imports four new files to render copy Trade **already has, already correct, already rendering**: the `painPoints` grid (`page.tsx:283-301`), the `comparisonRows` table (`:419-440`) and the `testimonials` array (`:49-65`). **Recommendation: restyle all three in place; mirror nothing.** See §5, gold-plating item 1. |
| 10 | `DISPOSITION_SLICE1.md` §B row 5: "the two duplicate proof bands ... `keyStats` grid (`:222`) and the shared `StatsBar` (`:245`)" | **True and still live** | Verified: `:222` is a navy `bg-[#1e293b]` hand-rolled 4-tile grid, `:245` is `bg-[#fafaf9]` holding `<StatsBar stats={siteStats} />`. Two proof strips, 23 lines apart, on a page F.2 gives one. The merge is real work and it is in WP-D1. |
| 11 | `house_positions.md` §3 contradicts itself, in the section this phase's biggest defect is governed by | **A live ground-truth contradiction, reported not fixed** | The locked position at `house_positions.md:61` states *"s.62A = 20% of the payment; s.62B = the full sum returned. **Never write '20%' for s.62B**"*, and records that the 20%-for-s.62B error was already caught and corrected once. The **"Practical writing rule for sessions"** bullet at `:64` of the same section then says *"Cite FA 2004 ss.62A/62B ... for the **20%-of-payment / 20%-of-sums-returned** knowledge-based penalties"*. A writer following the writing rule reintroduces TD-08. **This is a `house_positions.md` edit, which is outside this phase's scope and outside any design port's scope.** Owner gate 8. |

### What Phases 1 to 3 already did, so nobody builds it twice

- **The token layer is complete and Phase 5 adds nothing to it.** `--color-primary-50..950`,
  `--btn-ground{,-hover,-active}`, `--accent-strong` (now `#c2410c`, 5.18), `--hero-cream`,
  `--warn-1..4` + on-dark twins, `--form-error`, `globals-standard.css`. **No package in this
  phase edits `src/app/globals.css`.**
- **`.section-label` is already fixed.** `globals.css:279` now sets `background: var(--btn-ground)`
  (5.18 PASS) with the derivation in a comment. It is still **unlayered** (T30), and Phase 5 owns
  **21 of its 39 remaining consumers** (`page.tsx` 7, `cis-refund` 6, `gross-payment-status` 5,
  `services` 3). Recommendation in §7 risk 4: leave the rule alone.
- **Chrome is 20 destinations** and `PageShell` mounts `StickyCTA` site-wide (slice-1 gate 4
  resolved that way, on the grounds that a homepage-only bar on a page with 4 sessions in 19 days
  would effectively be deleted). Phase 5 inherits the mount and **must not move it.**
- **`/` is NOT in the §3a.1 dark-tail breach.** Its last band is `page.tsx:600`, `bg-[#fafaf9]`.
  `/services` is not either: its last band is `:184`, `bg-white`. Only the two pillars are.

---

## 1. REALITY CHECK PER SURFACE

### 1a. Sizing: this phase is the standard's front door, not the site's funnel

Post bot-gate, 19 days (`FUNNEL_BASELINE.md` §B, fresh Supabase pull, every figure re-derivable
from the SQL inline in that file):

| Surface | Sessions | CTA clicks | Form views | Form starts | Completes |
|---|---:|---:|---:|---:|---:|
| **homepage** | **4** | **0** | 0 | 0 | 0 |
| **services/pillar** (all three, combined) | **1** | 0 | 0 | 0 | 0 |
| blog article | 110 | 14 | 42 | 1 | 0 |
| *(whole site, all time)* | | | | | **3 leads, ever** |

Property, same window, as the benchmark for what F.2 is worth **when it has traffic**: homepage
128 sessions, 61 CTA clicks, 13 form starts, **10 completes** - a 10.2% start rate and Property's
most productive non-blog surface. **The anatomy is not the problem. Trade's homepage has four
sessions.**

So the honest statement, which belongs in the commit message as well as here: **this phase is
built to the standard because the standard is the contract and because the homepage is the brand's
front door, not because it will move a number this quarter.** Nothing in Phase 5 should be sized
as though it will. §5 says what the minimum is and what to cut.

### 1b. The fabricated penalty: seven defective lines, four files, and a concurrent agent took three of them mid-plan

**Live state changed while this plan was being written, so read the tree, not this table.** The
table below is the state at the start of this session. A **re-grep at the end of the session**
shows that a concurrent agent has since edited `gross-payment-status/page.tsx` (`:49` rewritten to
percentage-free s.62A/62B/s.72B framing, `:198` "Bill" to "Act") and `services/page.tsx:46`, and
those edits are **uncommitted in the working tree**. Verified remaining:

```
grep -rn '30% of the tax\|Finance Bill 2026' construction-cis/web/src
  src/lib/calculators/tools/cis-gps-eligibility-checker.ts:157   STILL LIVE
  src/lib/calculators/tools/cis-gps-eligibility-checker.ts:169   STILL LIVE
  src/tests/assistant-journey-opener.test.ts:706                 the TD-07 guard, STILL WRONG-SURFACE
```

**Consequence for WP-D0: its remaining surface is the two calculator lines and the guard.** The
T23 one-commit rule is now satisfied by the manager committing the concurrent agent's two page
files together with D0's two calculator lines and the repointed guard, in one commit. **D0 must
re-grep before it starts and must not re-fix what is already fixed.** If the manager cannot
establish who holds those two page files, that is a question for the owner before the commit, not
a merge to guess at.



`grep -rn '30% of the tax' src` and `grep -rn 'Finance Bill 2026' src`, run against the current
tree:

| TD | File:line | Live text |
|---|---|---|
| TD-05 | `src/app/gross-payment-status/page.tsx:49` | `"Finance Bill 2026 ss.62A/62B allow individual directors to face penalties of up to 30% of the tax HMRC considers lost due to fraudulent transactions..."` (also the card `title: "Director liability up to 30%"`) |
| TD-05 | `src/app/services/page.tsx:46` | `"...Director liability under Finance Bill 2026 ss.62A/62B reaches up to 30% of the tax lost. Keeping GPS now requires active due diligence."` |
| TD-05 | `src/lib/calculators/tools/cis-gps-eligibility-checker.ts:157` | `"...directors of limited companies can face personal penalties of up to 30% of the tax HMRC considers lost."` |
| TD-05 | `src/lib/calculators/tools/cis-gps-eligibility-checker.ts:169` | `"Directors of limited companies can face personal penalties of up to 30% of the tax HMRC considers lost..."` |
| TD-06 | `gross-payment-status/page.tsx:49` | `"Finance Bill 2026"` (same line as TD-05) |
| TD-06 | `gross-payment-status/page.tsx:198` | `"Finance Bill 2026"` - a second instance, **on the pillar page for that very statute** |
| TD-06 | `services/page.tsx:46` | `"Finance Bill 2026"` (same line as TD-05) |
| TD-07 | `src/tests/assistant-journey-opener.test.ts:706-711` | A guard titled *"gross-payment-status FAQ uses 'Finance Act 2026' (not 'Finance Bill 2026')"* that reads `faqForTopic("gross-payment-status")` - **the resources registry, not the page's own `faqs` array.** Green while the page is wrong. This is why TD-05 and TD-06 survived two correction passes. |

Ban, quoted verbatim from `house_positions.md:61`: *"**NEVER state a '30% of tax lost' director
penalty under ss.62A/62B** - no 30% figure appears in either section ... What remains banned is any
uncited or fabricated percentage (the old '30% of tax lost' claim) and attaching percentages to
ss.62A/62B, which contain none."* Recorded there as a CORRECTED error, caught by wave-2 Opus QA
against legislation.gov.uk on 2026-06-12.

**Note on scope discipline:** `grep -rn '30%' src` returns ~130 hits. All but these four are
legitimate CIS deduction-rate references (0% / 20% / 30% for unverified subcontractors). A blanket
sweep on the token `30%` would gut the site. **Sweep the claim, not the token.**

### 1c. TD-18 fixed-fee claims: the brief names three, there are six in or adjacent to scope

Owner-gated, enumerated for the gate, **not specced for fix** (per the brief). Full
case-insensitive grep, 11 hits, classified:

| # | File:line | Text | In Phase 5 scope? |
|---|---|---|---|
| 1 | `src/app/about/page.tsx:39` | `"We work on a fixed-fee basis. You know what you are paying before we start."` | No (Phase 6) |
| 2 | `src/config/service-tiers.ts:38` | `"Fixed fee, quoted before we start"` | **Yes** - renders on `/` and `/services` |
| 3 | `src/app/cis-refund/page.tsx:231` | `"Fixed fees, quoted before we start"` | **Yes** |
| 4 | `src/app/gross-payment-status/page.tsx:241` | `"Fixed fees, quoted before we start"` | **Yes** - the brief does not list this one |
| 5 | `src/app/page.tsx:214` | `"Fixed fees. Plain English. No hard sell."` | **Yes** - hero trust badge, the brief does not list it |
| 6 | `src/app/services/page.tsx:176` | fee-adjacent tier lead-in | **Yes** - the brief does not list it |
| 7-11 | `blog/page.tsx:158`, `glossary/page.tsx:149`, `glossary/[slug]/page.tsx:172`, `page.tsx:355`, `page.tsx:532` | `"Fixed fees, no surprises"` and siblings | 2 in scope (`page.tsx:355`, `:532`), 3 in other phases |

**So the in-scope TD-18 surface is 7 lines across 4 files, not 3.** The rule is the pool model:
the enquiry goes to up to six independent partner firms who set their own fees
(`privacy-policy/page.tsx:109-119`), so a fixed-fee promise is a commercial term we are not party
to. Owner gate 2 decides; if he says fix, it is a one-line-each reword inside packages that are
already open in those files, and costs nothing extra.

### 1d. Grounds: Phase 5 closes 2 of the 4 residual §3a.1 routes and both §3a.2 routes

`DESIGN_DELTA` §3a is the tracked blocking item. Authoritative count **29**, of which Phase 3
closes 25. Verified in the current tree:

| Row | Route | File:line | Today | Phase 5 fix |
|---|---|---|---|---|
| 3a.1 | `/cis-refund` | `cis-refund/page.tsx:216` | `<section className="bg-[#1e293b] py-12 sm:py-16 lg:py-20">` is the **last band**, running straight into `SiteFooter.tsx:86` `bg-slate-900` | `#book` navy, then a **light** FAQ band last |
| 3a.1 | `/gross-payment-status` | `gross-payment-status/page.tsx:226` | identical shape | identical fix |
| 3a.2 | `/` | `page.tsx:236` and `:245` | both `bg-[#fafaf9]`, back to back, no divider | the two bands merge into one (WP-D1 §3 row 4), so the adjacency disappears as a side effect |
| 3a.2 | `/services` | `services/page.tsx:168` and `:184` | both `bg-white`, both `border-t` | oscillate: `:184` → slate-50 |

Two further near-duplicates found while measuring, **not currently tracked and recommended NOT to
track**: `page.tsx:245` `#fafaf9` → `:252` `bg-neutral-50` (`#fafafa`) is a 1-RGB-unit difference,
i.e. visually the same ground under two tokens; and the pillars alternate `bg-white` / `bg-[#fafaf9]`
correctly throughout. The first resolves for free when `:245` merges away. Adding a third §3a row
for a 1-unit delta would be instrument noise.

**Expected instrument reading after Phase 5, and this is the phase's grounds acceptance test:**
`dark band touching the footer: 2` (down from 4; the residual two are Phase 6's template pages) and
`adjacent bands sharing a ground: 0` (down from 2).

### 1e. The `--accent` glyph and text exposure in Phase 5 scope

`DESIGN_DELTA` §1's corrected contract: `--accent` (orange-500) is permitted for **grounds and
decorative motif strokes ONLY**; any icon, glyph, numeral or meaning-bearing border takes
`--accent-strong` / `--btn-ground`. Every instance below is a **utility**, so it renders `#ff6900`
and measures **2.89** (correction 6), not the 2.80/2.76 token figures.

| File:line | Instance | Class | Verdict |
|---|---|---|---|
| `page.tsx:293` | 4 pain-point cards | `border-l-4 border-l-orange-500` | meaning-bearing border → `--btn-ground` |
| `page.tsx:323` | 6 service icon tiles, white glyph inside | `bg-orange-500` | ground legal; **white glyph on 2.89 is not** → tile ground `--btn-ground` |
| `page.tsx:330` | "Learn more" row | `text-orange-600` | **text, 3.60, fails 4.5** → `text-orange-700` |
| `page.tsx:366` | trade-verticals pill, white label | `bg-orange-500` | white text on 2.89 → `<Eyebrow onDark>` |
| `page.tsx:408` | heading span | `text-orange-600` | text, 3.60 → `text-orange-700` |
| `page.tsx:536` | 4 process numeral badges, white numeral | `bg-orange-500` | **the "process numerals"** → `--btn-ground` |
| `page.tsx:581` | FAQ `Plus` toggle | `text-orange-500` | meaning-bearing glyph, 2.89 → `--accent-strong` |
| `services/page.tsx:143` | 7 service icon tiles | `bg-orange-500` | as `page.tsx:323` |
| `services/page.tsx:140,198` | hover border, underline decoration | `hover:border-orange-500`, `decoration-orange-500` | decorative, **no floor applies**; leave |
| `cis-refund:113,138` | card top/left rules | `border-t-4 border-t-orange-500`, `border-l-4 border-l-orange-500` | meaning-bearing → `--btn-ground` |
| `cis-refund:161` | numbered step badges | `bg-orange-500` + white numeral | → `--btn-ground` |
| `cis-refund:198`, `gps:130` | rate-table figure cells | `text-orange-600` | **text, 3.60 on white** → `text-orange-700` (5.18). `BRAND_LAYER.md:211-212` names these two lines |
| `cis-refund:234`, `gps:244` | **the tick glyphs**, white `✓` on orange squares | `bg-orange-500 text-white` | → `--btn-ground` |
| `gps:155,156` | **the `01/02/03` process numerals**, left rule + label | `border-orange-500`, `text-orange-500` | → `--btn-ground` / `--accent-strong` |
| `gps:204` | card left rule | `border-l-4 border-l-orange-500` | → `--btn-ground` |
| `page.tsx:205,213,228,269,383,386,393,458` | on-navy accents | `text-orange-200/300/400` | 6.15-10.47 **PASS**, leave |
| `page.tsx:616` | blog band link | `text-orange-700` | 5.18 **PASS**, leave |

**Total: 16 distinct glyph/border/text instances to move, 8 instances correctly left alone.**
Entirely mechanical, no owner input needed beyond the standing Phase-1 contract.

### 1f. Trap 22: `hero_primary|hero|lead` is the single most exposed triple in the programme

Read off `cta_baseline.json` `distinct_triples` and re-measured live on :3261 today:

| Triple | Baseline count | Routes | In Phase 5 scope |
|---|---:|---|---|
| `header_nav_primary\|header\|contact` | 246 | chrome | 4 (read-only, Phase 1 owns) |
| `specialist_widget\|null\|null` | 246 | chrome | 4 (read-only) |
| `next_step\|null\|null` | 109 | `/for/*` | **0** |
| `next_step\|null\|form` | 18 | blog | **0** |
| **`hero_primary\|hero\|lead`** | **1** | **`/` only** | **1 - the whole series is one button on one page** |

Live `/` today emits exactly three `data-cta` attributes: `header_nav_primary`, `hero_primary`,
`specialist_widget`. Identical to the baseline's `per_route["/"]`.

**Why this is the most exposed triple on the site.** Every other locked series has 18 or more
routes carrying it, so a mistake on one route is a dent. `hero_primary` has **one**. A single
character changed in `page.tsx:206` - an id renamed to match Property's `hero_book`, a placement
moved, a goal derived instead of hardcoded - **deletes the series outright** and starts a new one
with no history. Property renders `hero_book|hero|form` for the same button (`Property/web/src/app/page.tsx:255`),
so the shape of the mistake is "copy the source file faithfully", which is what a builder porting
from Property is being asked to do.

**How it is protected, four layers, all cheap:**
1. **The three attributes at `page.tsx:206` are a frozen literal.** `data-cta="hero_primary"
   data-cta-placement="hero" data-cta-goal="lead"`. WP-D1's brief says so in those words.
2. **The href is free to move.** The goal is a hardcoded literal, not derived from the href
   (verified: `page.tsx:206-207`), so changing `activeCta.hero_primary.href` from `/contact` to
   `#book` does **not** move the goal. This was checked and is why the F.2 hero CTA can point at
   the on-page form.
3. **`src/tests/design/cta-attribute-diff.test.ts` already exists** and already pins the five
   baseline triples. WP-D1 extends it with an explicit `hero_primary|hero|lead` assertion and
   proves the guard bites by temporarily breaking it (T9).
4. **The acceptance test is a rendered diff, not a grep.** Curl `/` and assert the attribute set
   byte-identical to `cta_baseline.json.per_route["/"]`.

**`home_cta_primary` and `home_cta_secondary` (`page.tsx:501`, `:510`) are silent and must stay
silent.** Both sit inside `{packagesMode ? ... : ...}` opened at `:489`; `isPackagesMode(niche)` is
false because `niche.config.json:293` sets `"variant": "leadgen"`. They have never rendered and
have no rows in `web_events`. **If the rebuild makes either render, it invents CTA volume that
never existed and corrupts the `home_cta` series on its first day.** That is owner gate 5, not a
free improvement. The existing test at `cta-attribute-diff.test.ts:46` already documents the
branch; keep the branch structurally intact and restyle only what is outside it.

### 1g. The dormant pricing block: a dozen published fee breaches one config key away

`construction-cis/niche.config.json:295-326`, the `cta.variants.packages` block, read in full:

- `hero_primary.label` = `"Plans from £24/mo"`, `href` `/pricing`
- `header_primary.label` = `"See pricing"`, `href` `/pricing`
- `sticky.primary` = `"Fixed monthly plans from £24"`, `sticky.button` = `"See pricing"`
- `blog.cta_heading` = `"CIS accounting sorted for a fixed monthly fee."`; `cta_body` =
  `"Plans start at £24 a month for subbies, £49 for CIS contractors and £79 for trade limited
  companies..."` - **this one renders in the sidebar of every blog post**, the site's
  highest-traffic surface
- `home_cta.heading` = `"Pick a plan today. No fixed term."`; `primary` → `/pricing`

**Three findings, all verified:**
1. The live variant is `leadgen`, so **none of it renders today**. Confirmed at the config value
   and at both call sites.
2. **`/pricing` does not exist** (`ls src/app/pricing` → no such directory). Flipping the variant
   would publish own-fee pricing **and** point four CTAs at a 404.
3. **The pound signs are stored as the mojibake double-encoding `Â£`, not `£`.** A
   literal `grep '£'` over `niche.config.json` **misses every one of them.** This is the known
   estate trap (memory `generalist_design_port`: *"pound sign stored as a unicode escape in data
   files, literal grep misses it"*). Any future no-pricing sweep that greps for `£` will report
   this file clean.

**Action: flag for the gate register, delete nothing** (the brief's instruction, and the right
one - it is dormant, reversible, and deleting it is a separate decision). Owner gate 6. What Phase 5
**does** do, for free and in WP-D1, is add one line to `src/tests/design/` asserting
`niche.cta.variant === "leadgen"`, so flipping it becomes a deliberate act that fails a test rather
than a config edit nobody reviews.

### 1h. The three pillars: one session between them in 19 days

- **`/services`** (214 lines). The only pillar with **zero capture**: `:184-211` is two bare
  `Link`s to `/contact` and there is no form on the page. Both other pillars render a `LeadForm`.
  Hero is `bg-[#1e293b]` with no breadcrumb and no JSON-LD of any kind. `ServiceTiers` at `:179`
  passes `featuredBadge="Most Popular"`.
- **`/cis-refund`** (256) and **`/gross-payment-status`** (273). Both already have the right
  anatomy: cream/white/navy oscillation, a rate table each, a `LeadForm` at the foot
  (`cis-refund:249`, `gps:266`). Both ship the §3a.1 dark tail. Both heroes send the reader to
  `/contact`, i.e. away from the form already on the page.
- **`ServiceTiers` is LIVE, shared kit, and is NOT dead.** `grep -rl ServiceTiers src` →
  `app/page.tsx`, `app/services/page.tsx`, `config/service-tiers.ts`. The rollout doc's §4.2 "dead
  component" line refers to Property's unused **local** copy and the doc contradicts itself at
  `:302`. The shared component serves 16 sites: **never edit it** (T12).
- **T13 confirmed by reading the kit:** `packages/web-shared/components/ServiceTiers.tsx:37` is
  `function ServiceTiers({ tiers, featuredBadge = "Most Popular" })`. **The default IS the banned
  string**, so omitting the prop re-renders it. `featuredBadge=""` is required, and `:49`'s
  `tier.featured && featuredBadge` means the empty string suppresses the badge while
  `service-tiers.ts:39` `featured: true` keeps the tier's emphasis.
- **D.1 ground invariant, to be re-verified not assumed:** both pillar forms sit in white cards
  inside navy bands with `text-neutral-900` labels, which looks right. `DISPOSITION_SLICE1.md` D.1
  records the homepage instance as re-verified rendered. **Measure both pillars on the rendered
  page; do not assume either way.**

---

## 2. WORK PACKAGES

Four. One is copy-only and runs first and alone; three are design and run concurrently after it.

### WP-D0: the fabricated penalty, the wrong-surface guard, and nothing else

**Runs first, alone, and is committed on its own.** It is the only package that touches a file
another phase might claim, and T23 requires all seven lines in one commit.

| | |
|---|---|
| **OWNS** | `src/app/gross-payment-status/page.tsx` (lines 49, 198 only), `src/app/services/page.tsx` (line 46 only), `src/lib/calculators/tools/cis-gps-eligibility-checker.ts` (lines 157, 169 only), `src/tests/assistant-journey-opener.test.ts` (lines 706-711) |
| **Property source** | none. This is not design work. |
| **Spec** | `house_positions.md` §3 (locked position, **not** its self-contradicting writing-rule bullet - correction 11); `LIVE_DEFECTS.md` TD-05, TD-06, TD-07; rollout §I |
| **TD ids** | TD-05 (4 surfaces), TD-06 (3 surfaces), TD-07 (1 guard) |
| **Scope** | Delete the 30% director-penalty claim at all four sites. Replace with percentage-free officer-liability framing, or cite FA 2004 **s.72B** accurately (up to 100% of the company's s.72A penalty), which §3 expressly permits. Change all three "Finance Bill 2026" to "Finance Act 2026". Repoint the TD-07 guard at the page's own `faqs` array as well as the registry. |
| **Acceptance** | `grep -rn '30% of the tax' src` == **0**; `grep -rn 'Finance Bill 2026' src` == **0**; the repointed guard **FAILS** when the string is reintroduced (T9 - prove the guard bites, do not merely watch it pass); `npx vitest run src/tests/assistant-journey-opener.test.ts` green; `python scripts/check_dependency_closure.py` (T24) |
| **Depends on** | nothing |
| **Blocks** | WP-D2 and WP-D3 (shared files). WP-D1 may run concurrently with D0. |
| **Concurrency** | **Serial and alone.** |
| **Live amendment** | **Three of the seven lines were fixed by a concurrent agent during planning and sit uncommitted in the tree (§1b).** D0's remaining surface is `cis-gps-eligibility-checker.ts:157`, `:169` and the TD-07 guard. **Re-grep before starting.** |

**Ownership ruling, stated once so it is fixed once (correction 3):** Phase 5 owns
`cis-gps-eligibility-checker.ts:157` and `:169`. Phase 4, when its plan is written, takes those two
lines as **read-only and already corrected**, and owns the rest of that file. Phase 3's plan
already made this assignment; this records it in the phase that executes it.

### WP-D1: the homepage

| | |
|---|---|
| **OWNS** | `src/app/page.tsx`; NEW `src/components/marketing/MarketingSections.tsx`; `src/tests/design/cta-attribute-diff.test.ts` (extend only) |
| **OFF LIMITS** | `src/config/service-tiers.ts` (**read-only: WP-D2 owns it, and `/` renders both its arrays**), `src/lib/schema.ts` (uncommitted in Phase 3's hands), `src/lib/page-summaries.ts` (uncommitted), `src/components/layout/*`, `src/components/forms/*`, `packages/web-shared/**`, `src/app/globals.css`, `niche.config.json` |
| **Property source** | `Property/web/src/app/page.tsx` (537 lines, 7 sections), `Property/web/src/components/property/MarketingSections.tsx` (`WhoWeAreSection`, `WhyChooseUsSection`, `WhatWeCoverSection`) |
| **Spec** | rollout §F.2, §A.1-A.8, §D.3, §I; DESIGN_SYSTEM §4, §5, §7, §9; `DESIGN_DELTA` §1, §3a.2 |
| **TD ids** | TD-24 (keep the dormant branch silent), the §1e glyph list rows for `page.tsx`, the §1c TD-18 rows at `:214`, `:355`, `:532` **if gate 2 says fix** |
| **Section map** | §3 below, in full |
| **Acceptance** | 13 sections in F.2 order (§3); `/` renders **≥ 65** unique internal destinations with **all 45 `/for/*` anchors present** (assert the count, not a spot check); the rendered `data-cta` set on `/` **byte-identical** to `cta_baseline.json.per_route["/"]` - three attributes, `hero_primary\|hero\|lead` among them - while `hero_primary`'s href is `#book`; `home_cta_primary` and `home_cta_secondary` **absent from the rendered DOM** (they are today); `featuredBadge=""` renders **no badge**, verified in the rendered DOM not the prop (T13); both hotlinked Pexels `images.pexels.com` URLs **gone** (`grep -rn 'pexels' src/app/page.tsx` == 0); the `faqs` array feeds `buildFaqJsonLd` and the render **once** (T17); FAQ `<details>` retained and crawlable (**not** the kit `FaqSection`, see §7 risk 2); last band under `<main>` is light; **0** adjacent same-ground pairs; **0** em-dashes (`node docs/_engines/instruments/sweep.mjs`); `python scripts/check_dependency_closure.py` |
| **Depends on** | nothing (concurrent with D0) |
| **Concurrency** | **concurrent with D0, D2, D3** |

### WP-D2: `/services` and the shared tier data

| | |
|---|---|
| **OWNS** | `src/app/services/page.tsx`, `src/config/service-tiers.ts` |
| **OFF LIMITS** | `src/app/page.tsx` (D1 owns it and renders both `service-tiers.ts` arrays - **co-ordinate through the manager, never both edit**), `packages/web-shared/components/ServiceTiers.tsx` and `StatsBar.tsx` (**T12, 16 consumers, read freely, never edit**), everything in D1's and D3's OWNS columns, `globals.css` |
| **Property source** | `Property/web/src/app/services/page.tsx` + `Property/web/src/app/services/property-accountant/page.tsx` |
| **Spec** | rollout §F.1, §H, §I; DESIGN_SYSTEM §4b, §9 |
| **TD ids** | TD-18 rows 2 and 6 (gate 2), the §1e glyph rows for `services/page.tsx`, §3a.2's white-on-white pair |
| **Scope** | `TopicHero` cream + `Breadcrumb` + `Eyebrow`, replacing the navy `:111`; keep `StatsBar` (T15 does not reproduce - it is a 27-line pure server function printing literal strings, **verified, do not "fix" it**); the 7 service cards restyled with **all 7 `id=` + `scroll-mt-24` anchors preserved** (inbound links resolve to them); `featuredBadge=""` at `:179`; oscillate `:184` off white to close §3a.2; **a `#book` `scroll-mt-24` + `LeadCTAPanel` replacing the two bare `/contact` links** - this is the only pillar with no capture at all; `Service` + `OfferCatalog` (no pricing) + `BreadcrumbList` JSON-LD |
| **Acceptance** | `/services` renders **≥ 20** unique internal destinations; all 7 service anchors present with `scroll-mt-24`; `featuredBadge=""` renders no badge in the DOM; a `#book` form present and the D.1 ground invariant **measured on the rendered page**; last band light; 0 adjacent same-ground pairs; `grep -rn '57+\|24h' src/config/service-tiers.ts` == 0 (already true, assert it stays); 0 em-dashes; dependency closure |
| **Depends on** | **WP-D0** (shares `services/page.tsx`), gate 1 (FAQ commission), gate 2 (TD-18) |
| **Concurrency** | after D0; concurrent with D1 and D3 |

**Do not copy Property's `LeadCTAPanel` props.** Property's `proofPoints` are
`"Fixed fees, quoted upfront"` and `"24-hour response"` - **TD-18 and TD-13 verbatim**, and Phase 2
spent its larger half removing 23 instances of that family across 19 files. Trade has its own panel
at `src/components/marketing/LeadCTAPanel.tsx`. **Copy the component, never the props.**

### WP-D3: `/cis-refund` and `/gross-payment-status`, and the dark tail

| | |
|---|---|
| **OWNS** | `src/app/cis-refund/page.tsx`, `src/app/gross-payment-status/page.tsx` |
| **OFF LIMITS** | everything in D0's line-list, D1's and D2's OWNS columns; `src/components/forms/LeadForm.tsx` (**the consent wording is the most expensive surface in the programme - do not touch**); `globals.css` |
| **Property source** | `Property/web/src/app/section-24/page.tsx` (the topic-pillar anatomy; **Property has no `/cis-refund` sibling**) |
| **Spec** | rollout §F.1, §D.1, §D.3; DESIGN_SYSTEM §4a, §4b, §9; `DESIGN_DELTA` §3a.1 |
| **TD ids** | TD-11 (already CLOSED on both pages - **verify, do not re-fix**), TD-18 rows 3 and 4 (gate 2), the §1e glyph rows, §3a.1's two routes |
| **Scope** | cream `TopicHero` + `Breadcrumb` + `Eyebrow` replacing both `bg-[#1e293b]` heroes; hero primary → `#book` (the form is already on the page); **rate tables KEPT** - a reference page is citable because of its table and is never replaced by a figure (§4a) - cells re-hued `text-orange-600` → `text-orange-700`, header rows `bg-[#1e293b]` → `slate-900`; `border-b border-neutral-200` dividers deleted, grounds oscillate; `#book` `scroll-mt-24` + `LeadCTAPanel` replacing the bare `LeadForm`-in-a-coloured-card at `cis-refund:216` / `gps:226`; **a light band after `#book` on both** (that is the §3a.1 fix); keep `buildHowToJsonLd`, add `FaqSection`-equivalent + `buildFaqPageJsonLd` |
| **Acceptance** | **`dark band touching the footer` drops from 4 to 2** on the §3a.4 instrument run (the two survivors are Phase 6's template pages); both routes render **≥ 20** unique internal destinations; D.1 form-ground invariant **measured rendered on both**; `grep -rn '30% of the tax\|Finance Bill 2026' src/app/gross-payment-status/page.tsx` == 0 (D0's work, asserted here so a restyle cannot reintroduce it); 0 em-dashes; dependency closure |
| **Depends on** | **WP-D0** (shares `gross-payment-status/page.tsx`), gate 1 (FAQ commission) |
| **Concurrency** | after D0; concurrent with D1 and D2 |

### Sequencing

```
WP-D0 (alone, commit)  ──┬──> WP-D2 ──┐
                         └──> WP-D3 ──┼──> manager builds, serially (T1/T2)
WP-D1 (concurrent throughout) ────────┘
```

WP-D1 shares no file with D0, D2 or D3 and can start immediately. **Builders never build (T1); the
manager builds, serially, and checks `BUILD_ID` mtime against the newest source file before
trusting a green run (T2). Builders never commit.**

---

## 3. THE HOMEPAGE SECTION MAP

**Today: 15 sections. F.2: 12 blocks. After Phase 5: 13 sections** (12 + `ServiceTiers`, a
sanctioned addition recorded below).

| # | F.2 block | Trade today (file:line) | Verdict | Notes |
|---:|---|---|---|---|
| 1 | StickyCTA | mounted site-wide in `PageShell` (Phase 1) | **LEAVE** | slice-1 gate 4 chose site-wide over Property's homepage-only, because 4 sessions in 19 days would effectively delete a homepage-only bar. Do not move it. |
| 2 | JSON-LD set | `:162` `buildFaqJsonLd(faqs)` **only** | **NET-NEW (partial)** | add `WebPage`, `AccountingService`, `Service`, `BreadcrumbList`. Organization + WebSite are site-wide. T17 already satisfied: `faqs` feeds `:163` and `:571` from one array - **verified, keep it that way.** `lib/schema.ts` is uncommitted in Phase 3's hands, so emit through existing local builders or serialise through the manager. |
| 3 | navy motif hero | `:166-220` | **ADOPT-RESTYLE** | today: a **hotlinked `images.pexels.com` photo at `w=2000`** behind a `from-neutral-950/97` scrim - a third-party hotlink and the LCP image on the front door, reduced to ~3% visible by its own gradient. → `bg-slate-900` + `<TradeBackdrop/>` (Phase 1's component). h1 and standfirst copy KEEP. `.section-label` eyebrow `:178` → `<Eyebrow onDark>`. **`data-cta` at `:206` frozen (§1f).** href `/contact` → `#book`. Trust badges `:213` exclude any response-time claim (TD-13/TD-14, both closed, keep them closed). |
| 4 | white stats strip | **two bands**: `:222` navy `keyStats` grid, `:245` `#fafaf9` `<StatsBar stats={siteStats}/>` | **MERGE 2 → 1** | F.2 gives one strip. **Keep `StatsBar` + `siteStats`** (the derived, guarded, TD-13/TD-29-corrected array) on a white `py-5 sm:py-7 border-b` strip. **Retire the navy `keyStats` band**; relocate its four facts (`4 years`, `1.4m+`, `20%`, `55p`) into the §9 comparison band as editorial prose, where they read as mechanics rather than as a proof-count. **No fact is lost and no new data file is created.** This merge also dissolves the §3a.2 `#fafaf9`/`#fafaf9` adjacency at `:236`/`:245` for free. |
| - | *(intro strip)* | `:236-242` | **RETIRE** | one paragraph restating the hero standfirst. Not in F.2. |
| 5 | ProblemStatement (+ PromptMarquee) | `:283-301` `painPoints` card grid | **ADOPT-RESTYLE IN PLACE** | the four card bodies **are** the argument F.2 asks for, already written and already correct. Restyle to prose cards with a `--btn-ground` left rule on `#fafaf9`. **Do NOT mirror the kit `ProblemStatement`** (correction 9, §5 item 1): it hardcodes Property's landlord copy with no copy props (T12), so mirroring it means a new local file that renders copy this page already has. PromptMarquee: **skip** (§5 item 2). |
| 6 | WhoWeAre | **nothing** | **NET-NEW** | the only genuinely absent F.2 block. Source the copy from `/about`, do not author new claims. Lives in the new `MarketingSections.tsx` so `/contact` (Phase 6) shares it rather than copying it. |
| 7 | WhyChooseUs | `:403-417` "Why specialist matters" | **MERGE INTO `MarketingSections.tsx`** | the argument exists; it moves into the shared file and is re-set as Eyebrow + h2 + Prose + tick list (`tickClassName` **required** on light, or the ticks render at 2.89). **Copy gate 3:** `:411` "we deal with them every week **across a large CIS client base**". |
| 8 | services grid | `:304-344` | **ADOPT-RESTYLE** | ground → `bg-primary-50/60`, 6 cards `rounded-xl border border-primary-100 bg-white p-6`, icon tiles `bg-[var(--btn-ground)]` (§1e). **All 6 service hrefs and the "View all services" link KEPT.** |
| - | `ServiceTiers` | `:347-360` | **KEEP, `featuredBadge=""`** | **not an F.2 block; a sanctioned addition.** It is live shared kit on 16 sites (§1h). `"Most Popular"` is an aggregate claim about client behaviour, banned by §I; the kit default **is** that string (T13 verified at `ServiceTiers.tsx:37`), so the empty string must be passed, not the prop omitted. |
| 9 | WhatWeCover | `:419-440` `comparisonRows` table | **ADOPT-RESTYLE IN PLACE** | the table is what makes a reference surface citable (§4a). Header row `bg-[#1e293b]` → `slate-900`, our column primary-edged, `min-w-[36rem]` inside `overflow-x-auto`, stacked below `md`. **Do NOT mirror the kit `ComparisonTable`** (correction 9). No `ExampleFigureNote`: the table carries no example figures, and §E makes the note mandatory on figures, not on comparison tables. |
| - | *(trade verticals)* | `:363-400` | **ADOPT-RESTYLE, LINK FLOOR** | not an F.2 block, and **non-negotiable**: `:377-396` renders **45 `/for/*` anchors, which are 45 of the homepage's 45 unique body links** (measured live: chrome 20 + body 45 = 65). Navy → `bg-slate-900` + backdrop, cards `bg-white/5 ring-1 ring-white/15`, solid-orange pill `:366` → `<Eyebrow onDark>`. Keep the "See all trade types" link. **Losing one anchor here is a link-floor breach.** |
| 10 | `#calculators` + tabs + literal link | **nothing** | **NET-NEW, MINIMAL** | F.2 requires the block and the hero secondary needs an anchor target. **But `CalculatorTabs` does not exist on this site yet** (it is Phase 4's), and a literal calculator anchor adds **0** unique links because the chrome already emits four calculator slugs (correction 4). **Minimum that meets F.2: a white band with 4 literal `<a href="/calculators/…">` cards read from the existing registry. No tabs component, no client JS, ~15 lines.** Adopt `CalculatorTabs` later if and when Phase 4 ships it. |
| 11 | TestimonialsSection (navy) | `:252-281` on `bg-neutral-50`, positioned **second** | **ADOPT-RESTYLE + REPOSITION** | move to F.2's position (after `#calculators`), ground → navy. The three quotes at `:49-65` are **KEEP-PAYLOAD**: already anonymised trade + region, no names. **Copy gate 3:** `:255` "Real outcomes", `:257` "What we have done for CIS subcontractors", `:260` "Composite snapshots based on patterns **across our CIS clients**". |
| 12 | latest insights (slate-50 `divide-y`) | `:600-625` copy-only "Blog CTA" band | **NET-NEW - and this is where the value is** | 3 real `/blog/{category}/{slug}` row links + View-all. **+3 unique body links** and, more to the point, three crawl paths from the site's highest-authority page into the 82-post corpus that carries **54% of all sessions**. The existing `/blog` and `/cis-refund` links are preserved inside it. **The highest-value single item in the phase** (§5). |
| 13 | `#book` navy closing | `:483-563` | **ADOPT-RESTYLE IN PLACE** | already the right anatomy. Ground `#1e293b` → `slate-900`, add `scroll-mt-24`, `grid lg:grid-cols-[1fr_2fr]`, the 4 proof rows `:528-545` with `h-12 w-12 rounded-xl` badges (numerals off `--accent`, §1e), white card holding `<LeadForm submitLabel="Request a callback"/>`. **The `packagesMode` branch at `:489` stays structurally intact and silent (§1f).** D.1 re-verified: the form sits on a white card with `text-neutral-900` labels; the invisible-label bug does not reproduce. |
| 14 | FAQ white, last | `:566-597` hand-rolled `<details>` | **ADOPT-RESTYLE, KEEP `<details>`** | restyle only. **Do not adopt the kit `FaqSection`** - Phase 2 §1d established that the kit wraps answers in Radix `AccordionContent` with **no `forceMount`** (`grep -c forceMount` on `packages/web-shared/design/primitives/accordion.tsx` = **0**), so closed answers leave the server HTML. Same verdict Phase 3 reached, for the same reason. The `<details>` idiom is already crawlable. Keeps the light tail the footer needs (§9). |
| - | *(mid-page image break)* | `:445-463` | **RETIRE** | a **second** hotlinked Pexels photo carrying two sentences and no link. |
| - | *(Proudly British strip)* | `:466-479` | **RETIRE** | the identical asset renders in the footer on every page. This is the one of the pair to cut. |

**Verdict split: 4 ADOPT-RESTYLE in place, 3 ADOPT-RESTYLE with a move or a ground change, 2 MERGE
(two stats bands → one; WhyChooseUs into the shared file), 3 NET-NEW (WhoWeAre, `#calculators`,
latest insights), 3 RETIRE (intro strip, image break, Proudly British), 2 LEAVE (StickyCTA,
`ServiceTiers` payload).** 15 sections in, 13 out.

---

## 4. PER-ROUTE LINK FLOORS

Chrome contributes **20** unique internal destinations to every route in this phase, measured today
as the intersection of all four routes' destination sets: `/`, `/about`, `/blog`, `/book`,
`/calculators` **+ 4 calculator slugs**, `/cis-refund`, `/contact`, `/cookie-policy`, `/for`,
`/glossary`, `/gross-payment-status`, `/locations`, `/privacy-policy`, `/research`, `/services`,
`/terms`. **Any body link to any of those 20 scores ZERO (T14).**

| Route | Recorded floor | Live today | Chrome | **Body-unique** | What holds it | Headroom |
|---|---:|---:|---:|---:|---|---|
| `/` | 59 | **65** | 20 | **45** | **all 45 `/for/*` anchors, `page.tsx:377-396`.** Every other body link on the page (`/services` ×7, `/contact`, `/blog`, `/cis-refund`, `/calculators`) is a chrome destination and scores 0 | +3 from the latest-insights band (`/blog/{cat}/{slug}` ×3), which is new destination space |
| `/services` | 14 | **20** | 20 | **0** | nothing. Both `/contact` links and the `/for` link are chrome | 0 today. Only `/blog/*`, `/for/*`, `/glossary/*` or `/locations/*` can raise it |
| `/cis-refund` | 14 | **20** | 20 | **0** | nothing. `/gross-payment-status` and `/for` are chrome | as above |
| `/gross-payment-status` | 14 | **20** | 20 | **0** | nothing. `/cis-refund` and `/for` are chrome | as above |

**Binding consequences.**
1. **The homepage floor is the trade grid and nothing else.** A rebuild that restyles the grid into
   a carousel, a filtered view, or anything conditional sheds 45 links in one edit. Assert the
   count of `/for/` anchors in the served HTML, per build, not by eye.
2. **The three pillars cannot fall below 20 and cannot rise without new destination families.**
   `DISPOSITION_SLICE2.md` 6b.7's "raises the floor from 14 to 15+" is false post-Phase-1
   (correction 4). If the owner wants pillar floors to rise, the cheapest route is a
   `RelatedArticles` row of 3 `/blog/*` links per pillar - **not specced here**, because it is
   commissioned data, not design, and the traffic does not justify commissioning it (§5).
3. Recorded floors stay as floors (`>=`). Nobody should "correct" `link_baseline.json` to the live
   numbers: it is the **pre-port** snapshot and its whole value is that it predates the port.

---

## 5. SIZING: THE MINIMUM THAT MEETS F.2, AND WHAT IS GOLD-PLATING

**My view, stated plainly because the brief asked for it: the phase map is wrong about this phase.**
Phase 5 is not "the big one". It is roughly **the size of Phase 3's WP-C1 plus a copy fix**, and it
is the *last* phase by traffic value in a programme whose value is concentrated in the blog.

The evidence: 4 homepage sessions and 1 pillar session in 19 days, 0 CTA clicks on either, 3 leads
in the site's history. And the standard's own homepage is **12 blocks, not 16** (correction 1), 5 of
them imports. The 15-to-16 figure came from counting Trade's current 15 sections and assuming the
port preserved the count. It reduces it.

### The minimum that genuinely meets F.2

Everything in §3 marked ADOPT-RESTYLE, MERGE, RETIRE or LEAVE - **which is 12 of the 15 rows and
is mostly class changes on JSX that already exists** - plus exactly **three** net-new items:

1. **WhoWeAre** (F.2 requires it; Trade has no equivalent band; copy lifted from `/about`).
2. **`#calculators`**, in its minimal form: a white band of 4 literal registry anchors. No tabs
   component.
3. **Latest insights**, the slate-50 `divide-y` row list.

Plus the four compliance items that are not optional at any traffic level: **WP-D0's seven lines**,
the **§1e glyph sweep**, the **§3a grounds closure**, and the **T22 attribute freeze**.

That is the floor. Anything below it is not F.2.

### What is gold-plating on a page with 4 sessions in 19 days

1. **Mirroring four kit components locally** (`ProblemStatement`, `ComparisonTable`,
   `TestimonialsSection`, `PromptMarquee`), as `DISPOSITION_SLICE1.md` §B rows 6, 12 and 14
   instruct. Four new files to render copy that is already on the page, already correct, and
   already compliant. **Restyle in place. Saves four files and a T12 exposure surface.**
2. **`PromptMarquee`.** A decorative scrolling copy band. It carries no link, no fact and no ask.
   **Skip it entirely.**
3. **Porting `CalculatorTabs` into Phase 5** so the homepage can have the tabbed version of a band
   that four people will see. It is Phase 4's component, it is the heaviest client-side thing in
   the programme, and the crawlable-link requirement is met by four literal anchors. **Defer.**
4. **Commissioning FAQ sets for all three pillars** (`DISPOSITION_SLICE2.md` T-G9). Three
   authored FAQ sets, for one session. **Recommendation: commission for `/services` only** - it is
   the one with a real `OfferCatalog` and the one Phase 6's `/contact` links into - and let the
   two pillars keep `buildHowToJsonLd` and ship without `FAQPage`. Gate 1.
5. **Commissioning `related[]` arrays so the pillars can carry a `RelatedArticles` row** and lift
   their link floors off 0. Genuinely useful, genuinely not worth it at one session. **Defer to a
   content wave, not a design phase.**
6. **A third §3a row for the `#fafaf9` / `bg-neutral-50` near-adjacency.** A 1-RGB-unit delta.
   Tracking it is instrument noise and it resolves for free anyway (§1d).

### Where I would spend the review effort

Not evenly. In this order:

1. **The T22 attribute diff on `/`.** One rendered curl, three attributes. It is 30 seconds of
   review and it is the only thing in this phase that can destroy a data series that cannot be
   rebuilt. §1f.
2. **WP-D0's seven lines, reviewed against `house_positions.md` §3 by someone who reads the
   statute wording**, not against the site's own prior copy. This claim has now survived two
   correction passes and a guard test written specifically to catch it. It comes back because
   nobody re-reads the source. And note correction 11: the ground-truth file's own writing rule
   currently tells a writer to reintroduce TD-08.
3. **The 45 trade anchors, counted in the served HTML.** The homepage's entire link floor.
4. **The grounds instrument run** (§3a.4), because it is the port's tracked blocking item and
   Phase 5 owns half the residual.
5. **Everything else: normal review.** The glyph sweep is mechanical and its acceptance is a grep.
   The section restyles are visual and four people will see them.

---

## 6. OFF LIMITS, OWNERSHIP TABLE

The manager runs D1 concurrently with D0, then D2 and D3. Touching a file on your OFF LIMITS list
is a merge conflict at best and a silently reverted fix at worst.

| Package | OWNS (only files, or lines, it may edit) | OFF LIMITS |
|---|---|---|
| **D0** | `gross-payment-status/page.tsx` **:49, :198 only**; `services/page.tsx` **:46 only**; `cis-gps-eligibility-checker.ts` **:157, :169 only**; `tests/assistant-journey-opener.test.ts` **:706-711** | every other line of those files; everything in D1's, D2's and D3's OWNS columns |
| **D1** | `app/page.tsx`; NEW `components/marketing/MarketingSections.tsx`; `tests/design/cta-attribute-diff.test.ts` (extend) | `config/service-tiers.ts` (**D2 owns it; `/` renders both its arrays - read-only here**); `lib/schema.ts`; `lib/page-summaries.ts`; everything in D0's, D2's and D3's columns |
| **D2** | `app/services/page.tsx`; `config/service-tiers.ts` | `app/page.tsx`; D0's four lines; everything in D1's and D3's columns |
| **D3** | `app/cis-refund/page.tsx`; `app/gross-payment-status/page.tsx` | D0's two lines in `gross-payment-status`; everything in D1's and D2's columns |

**Shared, read-only for all four, no exceptions:**

- **`src/app/globals.css`.** Phase 1 owns it, Phase 2 amended one block. `.section-label` at `:279`
  is unlayered (**T30**) with **39** consumers, **21 of them in Phase 5's own files** and the rest
  in Phases 3 and 6. `.prose-blog` / `.article-body` is consumed by three families across two
  phases. **Any needed change goes to the manager.** See §7 risk 4.
- **`packages/web-shared/**`.** **T12.** Read freely, mirror locally, never edit. `ServiceTiers`
  and `StatsBar` are live kit on 16 sites. `FaqSection` and `accordion` are **not safe on this
  site** (§3 row 14) and must not be imported. `LeadCTAPanel` is copy-agnostic and safe to import - 
  **its Property props are not** (§2 WP-D2).
- **`src/components/forms/LeadForm.tsx` and `DetailsForm.tsx`.** The consent wording is the most
  expensive surface in the programme (`consent_wording_conversion_incident`). Do not touch.
- **`src/components/layout/*`** (Phase 1). `SiteFooter.tsx` is **uncommitted in another agent's
  hands right now.**
- **`src/lib/schema.ts` and `src/lib/page-summaries.ts`** - both **uncommitted in Phase 3's hands**
  (`git status --porcelain -- construction-cis/` confirms). The homepage's new JSON-LD must not
  reach for `schema.ts` until Phase 3 commits.
- **`niche.config.json`** (Phase 2 owns it; and see gate 6).
- **`src/components/blog/**`, `content/blog/**`, `src/app/for/**`, `src/app/locations/**`,
  `src/app/glossary/**`, `src/app/resources/**`** - Phases 2 and 3.
- **`src/lib/calculators/**` except D0's two lines** - Phase 4.

**Repo-wide:** other agents hold uncommitted work for Dentists, Medical, Solicitors, generalist and
hospitality in this checkout. **Never run a repository-wide git command.** Path-scope every git
invocation to `construction-cis/` and `docs/construction-cis/`, read-only, **from the repo root** - 
a path-scoped command run from the wrong directory returns EMPTY, which looks exactly like deleted
work.

---

## 7. OWNER GATES

Eight, in plain language. Each is one decision, with a recommendation and what it blocks.

1. **Do we write new questions and answers for the three service pages?**
   The standard wants a frequently-asked-questions block at the bottom of each. None of them has
   one. Writing them means commissioning three sets of five or six real questions.
   **Recommendation: do it for the main Services page only, and let the two others ship without.**
   Those two pages got one visit between them in nineteen days, and they already carry a
   step-by-step guide block that search engines read.
   *Blocks: the tail of `/services`, `/cis-refund` and `/gross-payment-status`.*

2. **Seven places on these pages promise "fixed fees, quoted before we start". Do we change them?**
   Under the way we actually work, the enquiry goes to up to six independent accountancy firms who
   set their own fees. We do not quote at all, so the promise is not ours to make. It is not a
   pricing breach (no number), it is a promise about someone else's terms.
   **Recommendation: reword all seven to describe what the partner firm does.** It is a one-line
   change each, inside work that is already open in those files, so it costs nothing extra now and
   is more expensive later.
   *Blocks: nothing. Cheap now, awkward later.*

3. **Three lines on the homepage claim results for "our clients". Do we rewrite them?**
   "What we have done for CIS subcontractors", "composite snapshots based on patterns across our
   CIS clients", and "we deal with them every week across a large CIS client base". We hold no
   client records anywhere in the estate, so we cannot support claims about clients served.
   **Recommendation: rewrite to describe the mechanics ("we see these every week"), and keep the
   three anonymised quotes, which are fine as they are.**
   *Blocks: two homepage sections.*

4. **The homepage hero and one mid-page block both use a photograph borrowed from another website.
   Do we remove them?**
   Both are hotlinked from a stock-photo site, so that site serves them, can change them, and can
   stop serving them. The hero one is the largest image on our front door and is then covered by a
   dark overlay that hides about 97% of it.
   **Recommendation: remove both and use the drawn scaffold-grid background built in phase 1.**
   Faster page, nothing borrowed, and it looks like us.
   *Blocks: the hero and one retired section.*

5. **There is a second homepage closing block in the code that has never appeared to anyone. Leave
   it switched off?**
   It belongs to a pricing-led version of the site that is not turned on. Two buttons inside it
   would start recording clicks the day they first appear, which would look like a sudden jump in
   a number we track.
   **Recommendation: leave it exactly as it is, switched off, and do not tidy it.** If you ever
   want it on, that is a deliberate decision with its own before-and-after.
   *Blocks: nothing, as long as nobody "cleans it up".*

6. **A dormant block in a settings file contains monthly prices. Flag it or delete it?**
   It carries "Plans from £24/mo", £49 and £79, and a dozen lines of fee copy. None of it is
   visible today because the site is set to the enquiry-led version. But one word changed in that
   file would publish all of it at once, on every blog post, and point four buttons at a pricing
   page that does not exist.
   **Recommendation: leave it, add a one-line automated check that fails if anyone flips the
   switch.** Deleting it is a separate decision; making the flip impossible to do by accident is
   not. Note that the pound signs in that file are stored in a form that ordinary searches miss, so
   a routine "do we publish prices anywhere" check currently reports it clean.
   *Blocks: nothing today. Everything, one word from now.*

7. **The homepage currently has two separate "proof" strips of numbers. Merge to one?**
   The standard has one. Ours has a dark band of four tax facts and, two sections later, a light
   band of four site facts.
   **Recommendation: merge to one, keep the site facts (they are checked and derived), and move
   the four tax facts into the comparison section as ordinary sentences.** Nothing is lost and the
   page reads better.
   *Blocks: two homepage sections; also fixes a layout rule breach for free.*

8. **Our own tax ground-truth file contradicts itself on the exact point this phase is fixing.**
   The locked position says one of the two penalty figures must never be written as a percentage.
   A summary bullet four paragraphs later tells writers to write it as that percentage. Someone
   following the summary reintroduces an error we have already corrected twice.
   **Recommendation: correct the summary bullet to match the locked position.** This is a one-line
   edit to `house_positions.md`, which no design phase is allowed to touch, so it needs your say-so
   and someone to own it.
   *Blocks: nothing in this phase, but it is why this error keeps coming back.*

---

## 8. RISKS AND AMBIGUITIES, WITH RECOMMENDED RESOLUTIONS

1. **The one-button data series.** `hero_primary|hero|lead` exists on one route, and the file a
   builder is told to port FROM renders a different id, placement and goal for the same button.
   **Resolution: the four layers in §1f, of which layer 3 (an explicit assertion in the existing
   `cta-attribute-diff.test.ts`, proven to fail when broken) is the one that survives a builder who
   never reads this document.**

2. **The kit FAQ component would delete answers from the server HTML.** Two prior phases reached
   this verdict independently and the dispositions still instruct otherwise in three places.
   **Resolution: keep the native `<details>` on all four routes, restyle only.** Recorded here so
   Phase 6 does not re-litigate it a fourth time.

3. **`service-tiers.ts` is rendered by two routes owned by two packages.** `/` renders
   `serviceTiers` and `siteStats`; `/services` renders both as well. **Resolution: D2 owns the
   file, D1 is read-only on it, and the manager serialises any change.** This is the same
   cross-package collision `DISPOSITION_SLICE2.md` §13 flagged between slices 1 and 2; it is now
   inside one phase, which makes it easier, not safe.

4. **T30 and `.section-label`.** The rule is unlayered, so a consumer's utility silently loses to
   it. It currently renders correctly (5.18, Phase 1's fix) on all 39 consumers.
   **Recommendation: do not re-layer it in this phase.** Phase 5 owns 21 of 39 consumers and the
   other 18 belong to Phases 3 and 6; moving the rule into `@layer components` mid-port changes
   rendering on files nobody in this phase can test. Phase 5 replaces its own 21 usages with
   `<Eyebrow>` where the ground calls for it and **leaves the class defined** for the other 18.
   The re-layering, if wanted, is a single manager-owned edit after Phase 6.

5. **Phase 3 is uncommitted right now.** `lib/schema.ts`, `lib/page-summaries.ts`, `SiteFooter.tsx`
   and two design tests are all modified in the working tree, and `PHASE3_PLAN.md` and
   `GROUNDS_BASELINE.md` are untracked. **Resolution: WP-D1's JSON-LD must not reach into
   `schema.ts` until Phase 3 commits; if it needs to, the manager serialises.** Do not read the
   modified state as a defect, and do not stash, reset or checkout anything.

6. **The grounds instrument was broken twice, both times by `oklch()`.** It is fixed and now
   self-tests on a known light and a known dark value in both `rgb()` and `oklch()` form.
   **Resolution: run it, read the summary line, and if the self-test does not pass, the run does
   not count.** Never hand the owner its raw output.

7. **A restyle can silently reintroduce WP-D0's fix.** D3 and D2 both edit files D0 corrected.
   **Resolution: D2's and D3's acceptance tests both assert `grep -rn '30% of the tax\|Finance Bill
   2026'` == 0 in their own files**, so a reintroduction fails the package that caused it, not a
   later sweep.

8. **The homepage is being rebuilt for four people.** Everything above is true and the work is
   still right, because the standard is the contract and this is Pilot B, whose whole purpose is to
   validate the port recipe on a full existing page set with a link floor.
   **Resolution: build the §5 minimum, skip the §5 gold-plating, and say so in the commit message
   so the next reader does not mistake restraint for an oversight.**
