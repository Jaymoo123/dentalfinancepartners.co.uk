# TRADE DESIGN PORT, PHASE 4 PLAN: CALCULATORS, THE PREMIUM TIER AND `/embed`

Site: `construction-cis/web` (Trade Tax Specialists). Written 2026-09-11, planner pass, no code
written, no file edited outside this one. **Four work packages, all four concurrent** (disjoint
file sets, section 6), plus one three-line token block the manager applies before D4 starts.

**Scope, counted at source, not read off a prior doc.**

| Surface | Routes | Template | Data |
|---|---|---|---|
| `/calculators` gallery | 1 | `src/app/calculators/page.tsx` (128 lines) | registry |
| `/calculators/[slug]` | **12** | `src/app/calculators/[slug]/page.tsx` (170 lines), `dynamicParams = false` | `src/lib/calculators/tools/*.ts` (12 files, 2,777 lines) |
| `/embed` gallery | 1 | `src/app/embed/page.tsx` (152 lines) | registry |
| `/embed/[slug]` | **12** | `src/app/embed/[slug]/page.tsx` (52 lines), `dynamicParams = false`, `robots:{index:false}` | same 12 tool files |
| Premium tier (no routes of its own) | 0 | `src/components/calculators/premium/*` (5 files, 1,172 lines) | `src/lib/calculators/premium/configs/*` (3) |

**26 routes, 13 of which are in the 246-route baseline.** Derivations, all run today:
`grep -c '^  cis\|^  trade' src/lib/calculators/registry.ts` is unreliable; the sound form is
`ls src/lib/calculators/tools/*.ts | wc -l` = **12**, matching the 12 entries in `GENERIC[]` at
`registry.ts:34-47`. **`BESPOKE` is genuinely empty** (`registry.ts:32`, `const BESPOKE: Tool[] = []`),
so `allTools()` and `genericTools()` return the same 12 and there are no bespoke calculator routes
on this site. All 12 `/calculators/<slug>` and all 12 `/embed/<slug>` return **HTTP 200**. `/embed`
and `/embed/[slug]` are **absent from `sweep_baseline.json` and from `cta_baseline.json`**, so
13 of the 26 routes are outside every baseline this port measures against.

**Binding spec.** `docs/_engines/PROPERTY_STANDARD_ROLLOUT.md` §G, §A.1-A.8, §I; `docs/property/DESIGN_SYSTEM.md`
§0, §0.4, §5, §6, §6a, §7, §9; `DESIGN_DELTA.md` §1, §2 (**read the §2 preamble first**), §3, §3a;
`_port/DISPOSITION_SLICE2.md` §4-§6 (the starting spec, corrected in section 0); `_port/PHASE2_PLAN.md`
and `_port/PHASE3_PLAN.md` (artefact shape, the OFF LIMITS discipline, and the precedents this plan
inherits); `LIVE_DEFECTS.md` TD-05, TD-21, TD-22, TD-27, TD-28, TD-29, TD-32, TD-K2;
`house_positions.md` §1, §2, §3, §4, §11, §11a; `link_baseline.json`, `cta_baseline.json`,
`sweep_baseline.json`; playbook traps T4, T12, T14, T22, T23, T24, T26, T30.

**Method.** Every number below was measured against the running post-Phase-3 production server at
`http://localhost:3261`, with `<title>` on `/` asserted as
`CIS Accountants &amp; Construction Tax Specialists | UK` before anything was trusted (`/blog`'s
title differs and is not the assertion). Dash counts were re-derived with the sweep instrument's own
`bodyText()` (`sweep.mjs:106-111`: `<script>` and `<style>` stripped, then all tags stripped), not
with a raw-HTML grep, because a raw grep triple-counts every string that also appears in JSON-LD and
in the RSC flight payload. Link counts use the sweep's own metric
(`/<a\b[^>]*\shref="(\/[^"#?]*)/gi`, unique, `sweep.mjs:156`). CTA triples were read out of
`cta_baseline.json`'s `per_route` map and re-checked live against the server. Every file path named
was opened. No build, no dev server, no test run, no git write.

---

## 0. CORRECTIONS TO THE BRIEF AND TO `DISPOSITION_SLICE2`

Read these first. Six change what a builder is told to do, and correction 1 is the class of defect
the brief asked me to look for: it is sitting in the acceptance test of the plan immediately
upstream of this one.

| # | Claim | Status | Correction |
|---|---|---|---|
| 1 | `PHASE3_PLAN.md` section 2: every Phase 3 package's acceptance list ends with "`node docs/_engines/instruments/sweep.mjs` with `totalDashes == 2`" | **The gate is red on arrival by 34, and nothing in Phase 3 can turn it green** | `sweep_baseline.json` records `totalDashes` **36**, and all 36 sit on six `/calculators/*` routes, which Phase 3 explicitly lists as OFF LIMITS ("`src/lib/calculators/**` ... phase 5"). A Phase 3 builder who runs that command sees a red instrument, and the honest conclusions available are "I broke something" or "the gate is wrong". The gate is wrong: the correct Phase 3 assertion is **no dash REGRESSION**, which is what `sweep.mjs` enforces by default (`:257-259`, per-route `n > base.dashes[p]`), not `totalDashes == 2`. `totalDashes == 2` is **Phase 4's** exit condition and this plan adopts it. The Phase 3 manager should be told before he reads a red instrument as a Phase 3 defect. |
| 2 | Brief: "All 36 of the site's baseline rendered dashes sit on 6 calculator pages: `cis-back-years-calculator` 18, `cis-vs-paye-comparison` 9, `cis-invoice-splitter` 4, `cis-deduction-calculator` 3, `cis-self-assessment-calculator` 1, `cis-take-home-calculator` 1" | **TRUE, exactly, on the sweep metric** | Re-measured today against the post-Phase-3 build: 18 / 9 / 4 / 3 / 1 / 1, summing to 36, and every other swept route is 0. This is the one count in the brief that survives unchanged. The two en-dashes are `cis-self-assessment-calculator.ts:125` and `cis-vs-paye-comparison.ts:113`, both `£12,570–£50,270`, both TD-28-protected. Note `cis-vs-paye-comparison.ts:113` carries an em-dash **as well** in the same string ("through Self Assessment — annual take-home"), so that line is edited, not skipped. |
| 3 | Brief: "the kit `Calculator.tsx` already exposes `--calc-warn-bg/fg/accent` with amber fallbacks, and Trade defines none of them ... a previous agent reported the tone and verdict branches are UNREACHABLE: verify that" | **The previous agent is RIGHT about the kit path and WRONG if the claim is read as covering the premium tier** | `grep -rn "tone\|verdict" src/lib/calculators/tools/` returns **zero hits across all 12 files**, so `result.headline.tone` is always `undefined`, `tone` resolves to `"default"` (`Calculator.tsx:96`), `result.verdict` is always falsy, and **both amber fallbacks in the kit are unreachable on all 24 calculator and embed routes**. Confirmed rendered: `grep -c 'fbbf24'` on all 24 routes = 0. BUT `src/lib/calculators/premium/configs/cis-gps-readiness.ts:160` (`tone: allPass ? "good" : "warn"`) and `cis-refund-planner.ts:135` (`tone: isRefund ? "good" : "warn"`) **do** set `warn`, and that drives `PremiumCalculator.tsx:323-324` `bg-amber-50 border-amber-200`. **The reachable amber is the premium one; the unreachable amber is the kit one.** Both are fixed, by different means (section 3). |
| 4 | Brief: "A known shared-kit defect in your scope ... TD-K2 records `PremiumBarChart.tsx` ... byte-identical on Trade and Medical. **The kit is off limits**, so establish the options" | **FALSE on both halves. The file is NOT in the kit, and the two copies are NOT byte-identical** | `find . -name PremiumBarChart.tsx -not -path "*/node_modules/*"` returns **eight** per-site copies (Trade, Medical, Dentists, Solicitors, digital-agency, contractors-ir35, divorce-finances, wills-probate) and **zero** in `packages/web-shared`. Trade's copy is `src/components/calculators/premium/PremiumBarChart.tsx`, 192 lines, inside this site's `src/`. `diff` against Medical's 197-line copy is **non-empty**: the header comment and the token names differ (Trade `--accent`/`--dark`, Medical `--gold`/`--navy`). **T12 does not apply**: nothing here is kit code, and Trade's copy is ours to edit. What TD-K2 actually describes is a replicated per-site copy that *should* be in the kit, which is a promotion proposal, not an edit ban. Options and recommendation in section 3d. |
| 5 | Brief: "Property gates calculator results behind `ResultGate`; **Trade has no gate at all** and every tool shows an always-visible `MiniCapture`" | **Half FALSE. Trade ships a result gate today, on the premium tier** | `src/components/calculators/premium/ResultGateModal.tsx` (140 lines) is live, wired from `PremiumCalculator.tsx:535-547` behind a module-level `gateModalShownThisSession` flag and a `data-cta="see_result"` button at `:658`. It is true that **none of the 12 fleet tools is gated**: the kit `Calculator` accepts a `resultWrapper` prop (`Calculator.tsx:64-71`, identity by default) and Trade passes nothing. So the real question is not "adopt a gate" but "extend the gate Trade already has from the premium islands onto the fleet". That materially changes the argument, and section 4 puts it to the owner in those terms. |
| 6 | `DISPOSITION_SLICE2.md` §4/§5 fleet table and calculator disposition | **Stale in four specific ways, correct in the rest** | (a) It predates Phase 1's chrome growth: it reasons from a 14-destination chrome and the chrome is now 20, **and four of those 20 are calculator links**, which changes the `/calculators` link arithmetic (section 5, and it is not the +6 Phase 3 found everywhere else). (b) It predates Phase 2's `--brand-primary-ground` / `--brand-primary-text` definitions at `globals.css:117-119`, which have **already reached** every `MiniCapture` on every calculator page through the kit; the disposition's instruction to fix capture-surface button colours here is already done. (c) It does not carry `/embed` or `/embed/[slug]` at all, which is 13 of this phase's 26 routes. (d) Its §G-derived file-layout expectation includes `src/lib/calculators/nav.ts`; **that file does not exist on this site** and the four calculator links in the header come from elsewhere. Do not create it (T5). |

### What Phases 1 to 3 already did for Phase 4, so nobody builds it twice

- **The capture-surface colour fix is already live here.** `globals.css:117-119` defines
  `--brand-primary-text: var(--accent-strong)` and `--brand-primary-ground: var(--btn-ground)`
  (both `#c2410c`, 5.18). The kit `MiniCapture` (`packages/web-shared/leads/MiniCapture.tsx:430,440,483,555`)
  and the kit `btnPrimary` (`components/ui/layout-utils.ts:43`) read exactly those two hatches. So
  `CalcResultCta`, `MobileToolSlot` and `ResultGateModal`'s capture all inherit the correct button
  and link colours today. **Verified, not assumed.** Phase 4 adds nothing here.
- **The warning ladder tokens exist** (`globals.css:66-73`, `--warn-1..4` plus the four on-dark
  twins). Phase 1 landed them as tokens only. Phase 4 is their first consumer, and the consumer is
  in this phase's file set in exactly two places.
- **Grounds are clean in this phase.** `GROUNDS_BASELINE.md:254` states it directly: "Phase 4
  (calculators, `/embed`) owns none: no calculator route appears in either" list. Independently
  confirmed: the navy block at `calculators/page.tsx:109` and the orange/amber block at
  `calculators/[slug]/page.tsx:151` are both `<div>`s **inside** a `bg-white` `<section>`, so the
  last opaque band under `<main>` is white on all 13 in-baseline routes. **No package in this phase
  writes a §3a fix, and any package that changes a `<div>` band into a `<section>` has just made
  this family visible to the grounds instrument for the first time.**

---

## 1. REALITY CHECK PER SURFACE

### 1a. `/calculators/[slug]`, 12 routes: the whole em-dash debt, and the site's last body clamps

**What the disposition says.** §5: restyle to the standard calculator anatomy, adopt `Eyebrow`,
remove clamps, fix accent text.

**What is actually there, today.** The template is structurally sound and the RSC boundary is
already correct (`CalculatorClient.tsx` resolves the tool from the slug inside the client graph,
which is the T4 defence and must not be undone). What is wrong is narrower than the disposition
implies and worse in one place:

- **Two body clamps**, `max-w-5xl` at `:80` around the calculator itself and `max-w-3xl` at `:89`
  around the explainer, worked examples, FAQ and the closing capture block. DESIGN_SYSTEM §6a is a
  standing owner rule from 2026-08-23 and names this exact surface: "Every `/calculators/*` page
  uses `siteContainerLg` as the measure for its body ... No `max-w-3xl`, `max-w-4xl` or `max-w-5xl`
  wrapper around the explainer, the rate tables, the worked examples, the FAQ or the related
  links." The hero standfirst at `:74` (`max-w-2xl`) is the one narrow measure that stays.
- The closing capture block at `:148-166` is `border-2 border-orange-500/20 bg-gradient-to-br
  from-orange-50 to-amber-50`. The amber half is a decorative ground, not warning semantics, but it
  is one of the site's six live amber usages and it sits eight RGB units from the brand ramp, which
  is the collision `DESIGN_DELTA` §1 exists to prevent.
- `id="get-expert-help"` at `:149` already carries `scroll-mt-24` and already wraps a working
  `LeadForm`. **Nothing on the page points at it.** This is the `/for/[slug]` shape from Phase 3
  section 1a, at 12 routes instead of 45, and the fix is the same size: one `href` in the hero.
- The FAQ is rendered as `h3` + `p` pairs (`:139-146`), fed from the same `tool.faqs` array that
  `buildFaqPageJsonLd` reads at `:44`. `LIVE_DEFECTS.md:292` already confirms schema and render come
  from one array, so T17 is satisfied. **Do not import the kit `FaqSection`**: `PHASE2_PLAN.md` §1d
  established for this site that it wraps answers in Radix `AccordionContent` with no `forceMount`
  and would remove the answers from the server HTML.
- **All 36 sweep dashes are on this family** and 35 of the same strings render again on `/embed/*`
  where no baseline sees them.

### 1b. `/calculators`, 1 route: the tightest link floor in the port

Structurally fine: navy hero, white body, category grid, a `<div>` navy CTA card inside the white
section. Three real findings:

- `text-orange-600` as link text at `:88` and `:102`. `DESIGN_DELTA` §2.1: the **utility**
  `text-orange-600` renders `#f54900` and measures **3.60 on white**, a text failure. `:84` uses
  `text-orange-700` on hover and is fine. `:82`'s `hover:border-orange-500` is a decorative border
  and is permitted by the corrected §1 contract.
- The navy CTA card at `:108-124` has a `/contact` button carrying **no `data-cta` at all**. It is
  an unmeasured ask on the site's calculator hub. Adding one is a new id, so it is an owner gate,
  not a builder decision.
- **The floor is 27 and the page renders 29. The margin is 2, not 6.** See section 5; this is the
  single most fragile number in the phase and the disposition's arithmetic for it is stale.

### 1c. `/embed` and `/embed/[slug]`, 13 routes: outside every baseline, and that cuts both ways

Neither appears in `link_baseline.json`, `sweep_baseline.json` or `cta_baseline.json`. Measured
fresh today:

| | `/embed` | `/embed/[slug]` x12 |
|---|---|---|
| HTTP | 200 | 200, all 12 |
| unique internal links | 28 | **0** |
| `data-cta` attributes | 1 (`header_nav_primary`) | **0** |
| sweep dashes | 0 | 35 across 5 of the 12 |
| indexable | yes (in `sitemap.ts`? **no** — `grep -n embed src/app/sitemap.ts` = 0) | no (`robots:{index:false,follow:false}`) |

Two consequences a builder must be told. **First**, there is no floor to breach and no CTA count to
split, so `/embed/[slug]` is the freest surface in the whole port. **Second**, the moment anyone
adds these routes to the sweep target list, 35 dashes and 13 routes of new link counts appear out of
nowhere and read as a regression. Phase 4 fixes the dashes at source, so the safe order is: fix,
then (optionally, and only with the owner's word) baseline `/embed`.

`/embed` itself carries `text-orange-600` at `:113`, `/embed/[slug]` at `:43`. `/embed`'s inner navy
partnership card at `:131` has an unmeasured `/contact?utm_*` button, same shape as 1b.

### 1d. The premium tier: reachable, but narrower than the brief implies

The brief asks plainly what is reachable and what is dead code. Measured, not read:

| Component | Reachable? | Evidence |
|---|---|---|
| `PremiumUpgrade` | **YES**, blog article routes only | `grep -rn "premium/" src --include=*.tsx` outside the premium dir returns exactly one consumer: `BlogPostRenderer.tsx:20,274,281,294,300`. Nothing in `/calculators/*` imports it. |
| `MobileToolSlot` | **YES**, but only below the `sm` breakpoint | `PremiumUpgrade.tsx:112` `<div className="sm:hidden">`. Server-rendered, so it is in the HTML on every qualifying article. |
| `PremiumCalculator` | **YES**, desktop only, client only | `PremiumUpgrade.tsx:117` `<div className="hidden sm:block">`, and the component is `next/dynamic` with `ssr: false` (`:63-66`). **It is never in server HTML.** |
| `PremiumBarChart` | **YES**, but only when `full` is true AND the config has a chart | `PremiumCalculator.tsx:644`, `{full && config.chart && result.chart && ...}`. `BlogPostRenderer` does not pass `full`, which defaults to `false` (`PremiumUpgrade.tsx:70`). **So on the blog, which is the only consumer, the chart never renders.** |
| `ResultGateModal` | **YES**, desktop only, once per session | `PremiumCalculator.tsx:535-547`, `:678`. |

**Which articles.** `PremiumUpgrade` returns `null` unless the post's topic maps to a non-empty
`toolId` (`resources.ts:30-37`): `cis-refund`, `cis-deductions`, `gross-payment-status` and
`limited-company` map to a tool; `self-assessment` and `vat-reverse-charge` map to `""`. Spot-probed
live: `/blog/cis-refunds/cis-tax-refund-how-to-claim` and
`/blog/cis-refunds/how-much-cis-refund-will-i-get` both render the `premium-tool-*` section; the
category hub `/blog/cis-basics` does not.

**So the honest statement is:** nothing in the premium tier is dead code, but `PremiumBarChart` is
**unreachable at its only call site**, because the only consumer never passes `full`. TD-21 and
TD-K2 describe a real a11y defect in a component that no user currently reaches on this site. That
does not make it safe to leave (a `full` prop is one word away, and seven sibling sites ship the
same file), but it does change how much of the phase it deserves. Section 3d sizes it accordingly.

### 1e. The warning ladder's only real consumer, and what "only" means

Two distinct amber surfaces, one reachable and one not, and they need different fixes.

1. **`PremiumCalculator.tsx:322-325`, `tone === "warn" ? "bg-amber-50 border-amber-200" : ...`.
   REACHABLE.** `cis-gps-readiness.ts:160` and `cis-refund-planner.ts:135` both compute
   `tone: ... "warn"`, and both tools are mapped to live blog topics. A GPS scorecard that fails, or
   a refund calculation that comes out as a balance owed, renders amber today. That is the genuine
   warning semantics the ladder was built for, and `DESIGN_DELTA` §1 bans amber for it by name
   ("amber-800 sits 8 RGB units from orange-800, so amber would hide the collision"). **This is a
   sweep of one line, and it is the ladder's first and only real consumer.**
2. **The kit `Calculator.tsx:131,141` `--calc-warn-bg` / `--calc-warn-fg` / `--calc-warn-accent`,
   amber fallbacks. UNREACHABLE.** No generic tool sets `tone` or `verdict` (correction 3), so
   neither branch has ever rendered on this site. The kit is off limits under T12 and must not be
   edited to remove the fallbacks. **The fix is pre-emptive token definition, not a sweep**: define
   the three custom properties locally so that the day a tool author adds `tone: "warn"` or a
   `verdict`, the site renders the ladder instead of `#fbbf24`. Three lines, one block,
   `globals.css`, applied once by the manager (section 6).

Recommended values, derived from `DESIGN_DELTA` §2.2 and the ground each one actually lands on (the
kit's result panel is `bg-slate-900`, `Calculator.tsx:124`):

| property | value | ground | ratio | why |
|---|---|---|---|---|
| `--calc-warn-accent` | `var(--warn-1-on-dark)` `#f87171` | slate-900 | **6.45** | it is a text colour on the navy result panel, so it must be an on-dark twin, not `--warn-1` |
| `--calc-warn-bg` | `var(--warn-1)` `#dc2626` | - | - | a verdict chip ground |
| `--calc-warn-fg` | `#ffffff` | `#dc2626` | **4.83** | the label on that chip |

Step 1 (red-600, "a duty bites, a deadline exists") is the right rung: a calculator's warn tone is
"this outcome has a consequence", not "criminal track".

### 1f. Trap 22 on this phase's routes: nothing to split, and one invisible id

Read out of `cta_baseline.json`'s `per_route` map, and re-checked live today.

| Triple | Site total | On the 13 in-baseline Phase 4 routes | Notes |
|---|---|---|---|
| `header_nav_primary\|header\|contact` | 246 | **13** | chrome |
| `specialist_widget\|null\|null` | 246 | **13** | chrome |
| `next_step\|null\|null` | 109 | **0** | but its `hrefs` array points **into** `/calculators/*` (section 7 risk 3) |
| `next_step\|null\|form` | 18 | 0 | blog only |
| `hero_primary\|hero\|lead` | 1 | 0 | `/` only |
| `blog_sidebar_book\|sidebar\|form` 82, `glossary_entry_book\|article\|form` 50, `for_hero_book\|hero\|form` 45, `blog_index_primary\|hero\|lead` 1 | additive | **0** | none renders here |

**Every one of the 26 routes in this phase renders only chrome CTAs, and `/embed/[slug]` renders
none at all.** So there is no locked triple to split inside this file set, and the five locked
counts are preserved by leaving the chrome alone, which this phase does.

**The invisible id.** `ResultGateModal.tsx:51` fires
`track("cta_click", { cta_id: "result_gate_skip", placement: "result_gate" })` **from JavaScript,
with no `data-cta` attribute anywhere in the markup**. `PremiumCalculator.tsx:658` carries the
opposite shape: a real `data-cta="see_result"` attribute in a component that is `ssr: false` and
therefore never in server HTML. What this means for measurement, stated so nobody re-derives it:

- `cta_snapshot.mjs` and `cta_baseline.json` are **attribute scans of server HTML**. Neither
  `result_gate_skip` nor `see_result` can ever appear in them, on any route, before or after this
  phase. `see_result` is nonetheless pinned in `src/tests/design/cta-attribute-diff.test.ts:75`,
  which is a **source** scan and does see it.
- Therefore: **the CTA instrument cannot prove anything about the premium tier**, and a package that
  restyles it must not report "CTA counts unchanged" as evidence that it changed nothing there. The
  proof for the premium tier is `cta-attribute-diff.test.ts` passing unchanged plus a live DOM read.
- Conversely, a builder who "tidies" `result_gate_skip` into a `data-cta` attribute has **added a
  row to the pinned snapshot and a new id to the estate's CTA taxonomy**. Do not. Owner gate 5.

### 1g. TD-05 lives in this phase's directory and is NOT this phase's to fix

`src/lib/calculators/tools/cis-gps-eligibility-checker.ts:157` and `:169` both carry "personal
penalties of up to **30% of the tax** HMRC considers lost" — verified live today, both lines
present. `PHASE3_PLAN.md` section 5 assigns this to **Phase 5**, to be fixed in ONE commit (T23)
together with `gross-payment-status/page.tsx:49` and `services/page.tsx:46`, because a partial fix
leaves the same fabrication live on two other pages. **Phase 4 owns the file and must not touch
those two lines.** That is stated in WP-D1's OFF LIMITS and in section 6, because the file is one a
Phase 4 builder will have open for other reasons.

---

## 2. THE EM-DASH TARGET, STATED ONCE, WITH ITS METRIC

**Four metrics are in play and they disagree. Every figure below names which one it means.**

| metric | defined by | scope | today | after Phase 4 |
|---|---|---|---|---|
| **M1, sweep rendered body** | `sweep.mjs:106-111` + `:149`, regex `/[—–]\|&mdash;\|&ndash;/g` over tag-stripped, script-stripped HTML. **Counts em AND en.** | the 246 swept routes | **36** (all on 6 calculator routes) | **2** |
| **M2, guard source** | `src/tests/design/em-dash.test.ts`, `src/app\|components\|lib\|config`, `.ts`/`.tsx`, tests excluded, **comment bodies blanked**. Em and en counted separately. | source | **43 em**, 2 en | **0 em**, 2 en |
| **M3, raw source grep** | `grep -o '—' <file> \| wc -l`, no comment stripping | source | **85 em** site-wide; **39** across the 5 in-scope tool files | **0** in scope |
| **M4, `/embed` rendered** | M1's regex applied to the 13 unbaselined embed routes | `/embed/*` | **35** | **2** |

**THE TARGET IS 2, ON M1, AND IT IS NOT ZERO.**

The two survivors are en-dashes inside money ranges: `cis-self-assessment-calculator.ts:125` and
`cis-vs-paye-comparison.ts:113`, both rendering `£12,570–£50,270`. `LIVE_DEFECTS.md` TD-28 protects
them by name ("Do **not** touch en-dashes in numeric ranges") and the guard encodes the carve-out as
a predicate with its own guard-the-guard test (`em-dash.test.ts`, `enDashInNumericRange`, and the
fourth `it()` block which proves the predicate has not degenerated to `true`). A zero-dash target
would force a builder to corrupt two correct typographic figures.

**Note `cis-vs-paye-comparison.ts:113` contains one of each.** The en-dash in `£12,570–£50,270` is
protected; the em-dash later in the same string ("recovered through Self Assessment — annual
take-home figures assume") is not. That line is edited, not skipped, and it is the single most
likely place for a builder to either miss the em-dash or destroy the en-dash.

**Why all four metrics, and not just one.** They disagree in both directions and each disagreement
hides a different failure:

- `cis-deduction-calculator.ts` carries **5** em-dashes on M2/M3 but renders **3** on M1. Two sit in
  `select` option labels and a conditional `rows` entry that the default field values do not reach
  (`:44`, `:84`). **A builder who fixes only what renders leaves two live strings behind**, and they
  surface the first time a user picks "unregistered".
- `cis-back-years-calculator.ts` carries **21** on M3, **17** on M2 (four are `// YEAR N —` comment
  markers, which the house rule exempts and the guard blanks), and renders **18** on M1, because
  `:219`'s template literal `` `${y.label} — estimated ...` `` is one source line that renders once
  per year row. **No two metrics agree on this file and all three are correct.**
- `src/app/llms-full.txt/route.ts` carries **8** on M2 and M3, renders 8 to LLM scrapers, and is
  **invisible to M1** because `/llms-full.txt` is not an HTML route in the sweep's target list. It
  is in the guard's TD-28 budget table. **The ratchet's ceiling cannot become zero until it is
  fixed**, so this phase fixes it even though it is not a calculator page; its 8 em-dashes are the
  tool-listing lines `:50-71` and nothing else.

**The guard is a ratchet with per-file budgets and it must be edited as part of the work, not
after it.** `TD28_BUDGET` (`em-dash.test.ts:47-54`) currently holds six entries summing to 43. The
package closes all six to zero, **deletes the budget table entirely**, and lets the first `it()`
block's "no file that had none may gain one" become a flat site-wide zero, which is what the guard's
own doc comment says to do ("When TD-28 closes, delete the budget table and the ceiling becomes
zero"). Leaving the table in place with zeros in it is not the same thing: a file absent from the
map is held at zero by the first test, a file present with a budget of 0 is held at zero by the
second, and only the first will catch a **new** file.

---

## 3. WORK PACKAGES

Smallest edit point, stated once: **five source files carry 100% of the dash debt, two templates
render 24 of the 26 routes, and one line is the warning ladder's only real consumer.** No package
touches 12 files of anything.

Every package's acceptance list ends with these four, which are not repeated per package:

1. `python scripts/check_dependency_closure.py` (T24).
2. `npx vitest run src/tests/design/cta-attribute-diff.test.ts` passing **byte-unchanged**
   (trap 22; the PINNED array is not edited by any package in this phase).
3. `npx vitest run src/tests/intent-engine.test.ts` — **THIS FILE DOES NOT EXIST.** See
   section 7 risk 6; the substitute gate is named there and is binding.
4. The package's own routes at or above their `link_baseline.json` floor, asserted **per route**.

---

### WP-D1: TD-28, the whole dash debt, and the ratchet

**Owns:** `src/lib/calculators/tools/cis-back-years-calculator.ts`, `cis-vs-paye-comparison.ts`,
`cis-deduction-calculator.ts`, `cis-invoice-splitter.ts`, `cis-take-home-calculator.ts`;
`src/app/llms-full.txt/route.ts`; `src/tests/design/em-dash.test.ts`.

**Property source:** none. This is a copy rule, not a design port. The house rule is
`house_positions.md:9`, quoted in TD-28: "No em-dashes anywhere (commas, parentheses, full stops,
middle dots only)."

**Spec:** `house_positions.md:9`; rollout §I; `LIVE_DEFECTS.md` TD-28.

**TD ids fixed:** **TD-28** (all six files, closing the entry).

**Work.**
1. 39 em-dashes across the five tool files, by file and shape:
   - `cis-back-years-calculator.ts`: 16 field `label`s of the form `"2025/26 — Gross CIS income"`
     (`:23,31,39,46,61,68,75,82,96,103,110,117,131,138,145,152`), one result-row template at `:219`,
     and four `// YEAR N —` comments at `:20,58,93,128`. Replace the label separator with a colon
     (`"2025/26: Gross CIS income"`). **These are every input label on the four-year refund tool**,
     so the visual result is the most visible copy change in the phase: read them all in one pass.
   - `cis-vs-paye-comparison.ts`: 7 row labels (`:89,90,92,96,105,106,108`) of the form
     `"CIS path — income tax"` → `"CIS path: income tax"`, plus the prose em-dash inside `:113`'s
     `note`, which is rewritten as a full stop. **The en-dash in the same string is untouchable.**
   - `cis-deduction-calculator.ts`: 3 `select` option labels (`:42,43,44`), one conditional row
     value (`:84`), one prose instance (`:89`). Two of these do not render at default values
     (section 2) and must still be fixed.
   - `cis-invoice-splitter.ts`: 3 option labels (`:42,43,44`), one prose instance in `note` (`:96`).
   - `cis-take-home-calculator.ts`: one FAQ question (`:124`).
2. `src/app/llms-full.txt/route.ts:50-71`, 8 instances in the tool listing, `"Name — URL"` → a
   middle dot or a newline. Nothing else in that file is touched.
3. Delete `TD28_BUDGET` and the second `it()` block from `em-dash.test.ts`, per the file's own
   instruction. Keep the en-dash carve-out and its guard-the-guard test untouched.
4. **Prove the guard bites (T9)** before handing back: reintroduce one em-dash into one tool file,
   watch the first `it()` go red, revert.

**Do NOT:** touch `cis-gps-eligibility-checker.ts` at all (TD-05, Phase 5, correction 1g; it carries
zero dashes so there is no reason to open it); touch the two en-dashes; change any field `id`, any
`default`, any compute logic, or any `slug`; edit the tool `name` fields (they are the `/for/[slug]`
`next_step` link text and the sitemap entries).

**Acceptance.**
- `node docs/_engines/instruments/sweep.mjs --site=construction-cis --base=http://localhost:PORT --out=<scratch>/p4_d1.json`:
  `totalDashes` == **2**, and the per-route `dashes` map shows `cis-self-assessment-calculator` 1 and
  `cis-vs-paye-comparison` 1 and every other route 0. **No route's link count falls.**
- The same M1 regex applied to the 12 `/embed/<slug>` routes (not in the sweep's target list, so run
  it by hand) totals **2**.
- `npx vitest run src/tests/design/em-dash.test.ts` green with the budget table gone.
- `grep -rc '—' src/lib/calculators/tools/` == 0 on all 12 files (M3), and
  `grep -c '—' src/app/llms-full.txt/route.ts` == 0.
- `grep -c '–' src/lib/calculators/tools/cis-self-assessment-calculator.ts` == 1 and the same on
  `cis-vs-paye-comparison.ts` == 1. **This assertion is the one that catches the destructive fix.**
- `npx vitest run src/lib/calculators/tools.test.ts` green: labels changed, arithmetic did not.

---

### WP-D2: `/calculators/[slug]` x12 and `/calculators`, the standard pass and §6a

**Owns:** `src/app/calculators/[slug]/page.tsx`, `src/app/calculators/page.tsx`.

**Property source:** `Property/web/src/app/calculators/page.tsx` (the gallery: navy hero with
`Breadcrumb onDark`, `Eyebrow` + h2 + standfirst above a full-width grid, category sections) and
`Property/web/src/app/calculators/[slug]/page.tsx`. Property is the only standard here and its
`/calculators` index is explicitly exempted from §6a as an index rather than a body page.

**Spec:** rollout §G, §A.1-A.3, §A.8; DESIGN_SYSTEM §0.4, §5, §6, **§6a**, §7, §9;
`DISPOSITION_SLICE2.md` §5, minus its capture-colour rows (already done, correction 6b).

**TD ids:** TD-22 (anchor offsets; `:149` already has `scroll-mt-24`, confirm the rest),
TD-27 (leave all three FAQ builders alone; T17 is already satisfied here, `LIVE_DEFECTS.md:292`).

**Work.**
1. **§6a, the standing owner rule.** Delete `max-w-5xl` at `[slug]:80` and `max-w-3xl` at `[slug]:89`.
   The body runs `siteContainerLg`. Keep `max-w-2xl` on the hero standfirst at `:74`. This is the
   largest visual change in the phase and it lands on 12 routes from one edit.
2. **The capture fix, 12 routes, three edits.** Add a hero primary pointing at `#get-expert-help`
   (which already exists and already carries `scroll-mt-24`), carrying
   `data-cta="calc_hero_help" data-cta-placement="hero" data-cta-goal="form"`. **Owner gate 1: new
   id.** An in-page `#` anchor scores zero unique links, so this is free against the floor. Retire
   the `from-orange-50 to-amber-50` gradient on the block for a token ground; keep the `LeadForm` and
   **its consent wording byte-identical**.
3. Hero to the §A.3 scale; the black `Calculator` tag above the tool name comes from the kit
   (`Calculator.tsx:100-104`) and is replaced by passing an `Eyebrow` node through the existing
   `eyebrow` prop — **which means a local `Eyebrow` component must exist and this site has none**
   (`ls src/components/ui/` = `Breadcrumb, JsonLd, StickyCTA, chart, layout-utils`). Use the kit
   `Eyebrow` if the kit exports one, or the `.eyebrow` class Phase 1 moved into `@layer components`;
   **do not create a second eyebrow implementation** (T5/T26).
4. Gallery: `text-orange-600` at `:88` and `:102` to `--accent-strong`/orange-700 (3.60 → 5.18);
   category `h2`s to the §4b heading scale; the navy `<div>` CTA card at `:108` stays a `<div>` and
   stays inside the white section (section 0, grounds).
5. Worked-examples and FAQ blocks: heading scale and spacing only. The `<h3>`+`<p>` FAQ shape stays.

**Do NOT:** import the kit `FaqSection` or `accordion` (`PHASE2_PLAN.md` §1d); edit `globals.css`;
turn any `<div>` band into a `<section>`; remove the `/embed` link at `calculators/page.tsx:101`
(section 5, it is 1 of the 13 body links holding the floor of 27); add or remove a `data-cta` other
than the one gated above; touch `CalculatorClient.tsx` (T4: it is the RSC-boundary defence and a
"simplification" that passes `tool` from the server page fails the build at prerender).

**Acceptance.**
- `curl /calculators/cis-refund-estimator | grep -c 'max-w-3xl\|max-w-4xl\|max-w-5xl'` == **0**
  (the hero standfirst is `max-w-2xl` and is not matched by this grep).
- All 12 `/calculators/*` routes >= **14** unique internal links, asserted per slug; `/calculators`
  >= **27** with all 12 tool anchors AND `/embed` present.
- `curl /calculators/cis-refund-estimator | grep -c 'id="get-expert-help"'` == 1, the element carries
  `scroll-mt-24`, and the hero primary's `href` is `#get-expert-help`.
- `node docs/_engines/instruments/cta_snapshot.mjs`: `header_nav_primary|header|contact` still 246,
  `specialist_widget|null|null` still 246, `next_step|null|null` still **109**, and exactly ONE new
  triple, `calc_hero_help|hero|form`, at count **12**.
- `browser_check.mjs` over the 13 routes: no anchor text below 4.5, and the `ratio=3.60` findings on
  the two gallery links are gone.
- `--grounds` on `/calculators` and 2 slugs: `lastBand` is a white or slate-50 value, unchanged from
  today. **This phase closes no §3a breach and must not open one.**

---

### WP-D3: `/embed` x1, `/embed/[slug]` x12, and the two capture islands

**Owns:** `src/app/embed/page.tsx`, `src/app/embed/[slug]/page.tsx`,
`src/components/calculators/CalcResultCta.tsx`, `src/components/resources/CalculatorPageResources.tsx`.

**Property source:** `Property/web/src/app/embed/page.tsx` and `Property/web/src/app/embed/[slug]/`.
Property's `PageResultCta.tsx` (24 lines) is the sibling of `CalcResultCta.tsx`.

**Spec:** rollout §G (embeds are "chrome-free iframe variants, noindex, never IndexNow'd"),
§A.1-A.3; DESIGN_SYSTEM §0.5, §7; `DISPOSITION_SLICE2.md` carries nothing on this family
(correction 6c).

**TD ids:** none in the ledger. The inline `#1e293b` and the `text-orange-600` instances below are
raised here for the first time.

**Work.**
1. `text-orange-600` as link text: `embed/page.tsx:113`, `embed/[slug]/page.tsx:43`. Both to
   `--accent-strong`. `embed/[slug]:43` is the "Powered by" attribution link and is the only link on
   the whole route, so it also carries the standard's only obligation on that surface.
2. `embed/page.tsx`: `max-w-3xl` at `:80`, `:118`, `:131` read as body clamps on a page that is an
   index with real body prose. Apply §6a's own test: a `max-w-3xl` above a full-width grid is the
   standfirst pattern and stays (`:61`, `:64`, `:70`); one wrapping the "How to embed" ordered list
   and the partnership card is a body clamp and goes.
3. `CalculatorPageResources.tsx:44`: `style={{ background: "#1e293b" }}` is an inline literal of the
   site's mislabelled dark ground (`DESIGN_DELTA` §1: "`--dark` is `#1e293b`, which is slate-800 and
   is MISLABELLED `slate-900` in the file"). Replace with the token. `text-orange-300` on that ground
   is fine (`DESIGN_DELTA` §2.1 gives primary-300 on `#1e293b` at 8.58).
4. `CalcResultCta.tsx:22`: `border-l-4 border-orange-500` is a **decorative** left rule carrying no
   information, which the corrected §1 contract permits at `--accent`. Leave the colour; align the
   radius and padding to §A.3. **Do not change `formId`, `messagePrefix`, `heading`, `blurb` or
   `submitLabel`**: they are the lead-message payload and the funnel's own labels.
5. The `/embed` partnership card at `:129-147`: heading scale and the navy `<div>`-inside-white
   shape stay; its `/contact?utm_*` button stays without a `data-cta` unless owner gate 2 is taken.

**Do NOT:** add `/embed` or `/embed/[slug]` to `sitemap.ts`, to the sweep target list, or to
IndexNow; remove `robots:{index:false,follow:false}` from `embed/[slug]`; change `embedHeight` on
any tool (it is published in the iframe snippet third parties have already pasted into their pages);
change the "Powered by" line, which is the stated condition of the embed licence
(`embed/page.tsx:70-74`).

**Acceptance.**
- All 13 embed routes still HTTP 200; `/embed/<slug>` still returns exactly **1** `<a>` and **0**
  internal `href="/..."`; `/embed` still >= **28** unique internal links (no baseline floor exists,
  so this is a self-comparison against the number in section 5).
- `curl /embed/cis-refund-estimator | grep -c 'noindex'` >= 1.
- `grep -rn '#1e293b' src/components/resources/` == 0.
- `grep -rn 'text-orange-600' src/app/embed src/app/calculators` == 0.
- `grep -c 'formId="calc_result"' src/components/calculators/CalcResultCta.tsx` == 1, unchanged.

---

### WP-D4: the warning ladder's only consumer, the premium tier restyle, and TD-21

**Owns:** `src/components/calculators/premium/PremiumCalculator.tsx`, `PremiumUpgrade.tsx`,
`ResultGateModal.tsx`, `MobileToolSlot.tsx`, `PremiumBarChart.tsx`.

**Depends on:** the manager's `globals.css` token block (section 6). D4 must not start before it
lands, and must not apply it itself.

**Property source:** `Property/web/src/components/calculators/ResultGateModal.tsx` (49 lines) and
`ResultGate.tsx` (103 lines). Property's gate is smaller than Trade's and its doc comment is the
clearest statement of the gating rules in the estate; read it before touching Trade's.

**Spec:** `DESIGN_DELTA` §1 (warning ladder T-W1) and §2.2; DESIGN_SYSTEM §0.7, §9;
`BRAND_LAYER.md` §4.3.

**TD ids:** **TD-21** (the `aria-hidden` chart), TD-K2 (handed over, not fixed here, section 3d).

**Work.**
1. **`PremiumCalculator.tsx:322-325`. The ladder's only real consumer.** `bg-amber-50
   border-amber-200` → ground unchanged (`var(--surface-elevated)`) with
   `border-[var(--warn-1)]`. Recommended over tinting the ground because there is no
   `--warn-1-tint` token and inventing one is a token-layer change Phase 1 owns. Red-600 as a border
   against `--surface-elevated` is 4.62, comfortably over the 3:1 graphics floor.
2. **TD-21.** `PremiumBarChart.tsx:88-99`: drop the wrapper `aria-hidden="true"` at `:90`, keep the
   `role="img"` + `aria-label` on the `<svg>` at `:97-98`, `aria-hidden` the decorative `<rect>`s and
   grid `<line>`s, and render the series values as a visually-hidden `<table>` beneath the chart. The
   chart is currently unreachable at its only call site (section 1d), so this is **not** urgent on
   user impact; it is worth doing because the fix is 15 lines and because seven sibling sites carry
   the same file. **Fix Trade's copy only** and hand TD-K2 to the orchestrator (section 3d).
3. Token discipline sweep across the five files: the `--gold`/`--navy` re-token is already done
   (every file's doc comment says so and `grep -rn 'gold\|navy' src/components/calculators/` returns
   comments only). What remains is `PremiumUpgrade.tsx:47` `h-1 bg-[var(--accent)]` and
   `PremiumCalculator.tsx:~650` `h-1 bg-[var(--accent)]`: both are decorative accent bars on a
   ground, permitted at `--accent` under the corrected §1 contract. **Leave them.** Report that they
   were checked rather than silently leaving them.
4. `ResultGateModal.tsx` and `MobileToolSlot.tsx`: radius, spacing and heading scale to §A.3 only.

**Do NOT, and this is the sharpest boundary in the phase:**
- **Change any trigger, threshold or cadence.** `gateModalShownThisSession`
  (`PremiumCalculator.tsx:538`), the `isConverted()` bypass, the four escape hatches (X, backdrop,
  Escape, "No thanks"), and `DeepScrollModal`'s scroll threshold are all untouched. Restyle only.
- **Add a `data-cta` attribute to `ResultGateModal`'s skip control** (section 1f). It fires from JS
  by design and making it an attribute adds a row to the pinned snapshot.
- **Change any `track()` call, event name, `cta_id` or `placement` string** in any of the five files.
- Edit `packages/web-shared/**` (T12), including the kit `Calculator.tsx`'s amber fallbacks.
- Pass `full` to `PremiumUpgrade` "so the chart shows". That is a content decision with a real CLS
  and chunk-size cost, and it is owner gate 4.

**Acceptance.**
- `grep -rn 'amber' src/components/calculators/` == **0**.
- `grep -c 'aria-hidden="true"' src/components/calculators/premium/PremiumBarChart.tsx` — present
  only on decorative shapes; the wrapper `<div>` at `:89-93` no longer carries it.
- `npx vitest run src/lib/calculators/premium/premium-tools.test.ts` green (the golden tests behind
  the three configs; a token edit must not move a number).
- `npx vitest run src/tests/design/cta-attribute-diff.test.ts` green **and byte-unchanged**, which is
  the only instrument that can see `see_result`.
- A live DOM read on `/blog/cis-refunds/how-much-cis-refund-will-i-get` at a desktop width:
  the `premium-tool-*` section renders, the gate opens once, Escape reveals, and the reveal state
  persists exactly as it does today. **A screenshot pair, because no committed instrument covers
  this surface.**
- `grep -rn 'gateModalShownThisSession\|isConverted' src/components/calculators/premium/` unchanged
  line-for-line.

---

### 3d. TD-K2: the options, and the recommendation

The brief asked for options and a recommendation; the ban it cites does not apply (correction 4).

| # | Option | Cost | Verdict |
|---|---|---|---|
| 1 | Fix Trade's local copy only | 15 lines, one file, inside this phase's OWNS set | **RECOMMENDED as the Phase 4 action** |
| 2 | Promote `PremiumBarChart` into `packages/web-shared`, fix once, delete 8 per-site copies | Touches 8 sites with uncommitted work from 5 other agents in this checkout; 8 different token vocabularies (`--accent`/`--dark` vs `--gold`/`--navy`) must be parameterised first | Correct destination, **wrong actor and wrong week**. Hand to the orchestrator as a named estate item. |
| 3 | Leave it, because the chart is unreachable at its only call site | Free | **NO.** `full` is one prop away, and "unreachable today" is how TD-05 and TD-08 survived their corrections. |

**Recommendation: option 1 now, option 2 handed over explicitly in WP-D4's completion report, named
as TD-K2, in the same breath — a half fix reported as a whole one is the T23 shape.** Trade's fix
becomes the reference implementation the promotion copies, so option 1 is not wasted work.

---

## 4. THE RESULT GATE: THE DECISION, BOTH SIDES, AND A RECOMMENDATION

**The question is not whether to adopt a gate. Trade already has one** (correction 5): the premium
blog islands gate their result behind `ResultGateModal`, once per session, with four escape hatches.
The 12 fleet tools do not, and every one of them shows an always-visible `MiniCapture` at
`CalcResultCta.tsx`. The kit supports the change with a prop Trade already receives and ignores
(`Calculator.tsx:64-71`, `resultWrapper`), so the mechanism is not the obstacle.

**The case FOR gating the fleet (Property's answer).**
- Property's own reasoning, `ResultGate.tsx:1-31`: inputs stay live, skipping always reveals, the
  figure is never actually walled off, and the held state shows the real result behind frosted glass
  so the reader can see the shape of their answer. It is an ask at the moment of highest intent, not
  a paywall.
- A gate converts an impression into a decision. The always-visible `MiniCapture` is scrolled past;
  a held figure has to be answered one way or the other.
- Property is the standard, it is the site with the volume, and §G lists "results behind ResultGate
  on non-embed routes" as part of the calculator contract.

**The case AGAINST, on this site, now.**
- **Trade has 3 lifetime leads.** There is no measurable baseline to regress from and no traffic to
  learn from: `FUNNEL_BASELINE.md` has nothing to say about calculator result views on this site.
  Property's gate was tuned against a funnel that exists.
- It is a new interruptive surface on 12 routes. The standing rule is that a new interruption needs
  the owner's yes, every time, and "Property does it" is not that yes.
- **It would change what the funnel measures on the exact surface this phase is restyling.** A
  design port and a conversion-mechanism change landing in the same commit makes both unattributable
  — which is the mistake `PHASE3_PLAN.md` owner gate 8 already flagged for the booking picker.
- The premium tier is the cheaper experiment: it is already gated, it is already instrumented
  (`see_result`, `result_gate_skip`), and it costs nothing to read first.

**RECOMMENDATION: do not gate the fleet in Phase 4. Owner gate 3, recommend DEFER.** Ship the design
port, leave `resultWrapper` unpassed, and revisit once the premium gate has produced any data at all.
If the owner wants it anyway, it is one prop on `CalculatorClient.tsx` plus a local `ResultGate`
mirrored from Property (T12: mirror, never edit the kit), it is **not** part of any package above,
and it lands in its own commit with the baseline deliberately restated.

---

## 5. PER-ROUTE LINK FLOORS, VERIFIED

Chrome is **20** unique internal destinations after Phase 1 (was 14). **Four of those 20 are
calculator links** — `/calculators/cis-deduction-calculator`, `/cis-refund-estimator`,
`/cis-sole-trader-vs-limited`, `/cis-take-home-calculator` — which is why this phase does **not**
inherit Phase 3's "+6 everywhere" arithmetic.

| Route | Floor (`link_baseline.json`) | Measured today | Margin | Body-link budget, and what holds it |
|---|---|---|---|---|
| `/calculators` | **27** | **29** | **+2** | **13.** 12 tool cards + the `/embed` link at `page.tsx:101`. Baseline arithmetic: 14 chrome + 12 tools + `/embed` = 27. Today: 20 chrome (4 of which are tools) + 8 remaining tools + `/embed` = 29. **Dropping the `/embed` link, or any one tool card, breaks the floor.** |
| `/calculators/[slug]` x12 | **14** each | **20** each, all 12 identical | **+6** | **0.** Every link on the page is chrome; the breadcrumb's `/` and `/calculators` are already chrome destinations and the body contributes nothing unique. **The freest template in the port**: no body-link risk at all. |
| `/embed` | **none** (absent from baseline) | **28** | n/a | 8 tool previews not already in chrome; the other 4 previews are chrome. |
| `/embed/[slug]` x12 | **none** (absent from baseline, noindex) | **0** | n/a | The single `<a>` is absolute (`siteConfig.url` + utm), so the sweep's relative-href metric scores it 0. |

Any link to one of the 20 chrome destinations scores **zero** unique links, which is why the
`#get-expert-help` hero anchor in WP-D2 is free, and why an in-page `#` anchor never counts.

**The disposition's link arithmetic for `/calculators` is stale and would have read the margin as
6.** It is 2.

---

## 6. OFF LIMITS, PER PACKAGE

The manager runs all four concurrently. Touching a file on your OFF LIMITS list is a merge conflict
at best and a silently reverted fix at worst.

| Package | OWNS (only files it may edit) | OFF LIMITS |
|---|---|---|
| **D1** | the 5 dash-carrying tool files; `app/llms-full.txt/route.ts`; `tests/design/em-dash.test.ts` | **`lib/calculators/tools/cis-gps-eligibility-checker.ts` (TD-05 `:157`,`:169` is PHASE 5's, one commit with two other files, T23)**; the other 6 tool files; `lib/calculators/cis-tax.ts`; `lib/calculators/registry.ts`; everything in D2's, D3's and D4's OWNS columns |
| **D2** | `app/calculators/page.tsx`, `app/calculators/[slug]/page.tsx` | `components/calculators/CalculatorClient.tsx` (**read-only, T4**); `components/forms/LeadForm.tsx`; the 5 D1 tool files (read-only: D1 is rewriting their labels); everything in D1's, D3's and D4's OWNS columns |
| **D3** | `app/embed/page.tsx`, `app/embed/[slug]/page.tsx`, `components/calculators/CalcResultCta.tsx`, `components/resources/CalculatorPageResources.tsx` | `app/sitemap.ts`; `lib/resources/registry.ts` and `components/resources/ResourceGate.tsx` (read-only); `components/forms/MiniCapture.tsx`; everything in the other three OWNS columns |
| **D4** | the 5 files under `components/calculators/premium/` | `lib/calculators/premium/configs/*` and `registry.ts` (**read-only: they set the `tone` D4 is restyling, and a golden test guards them**); `components/intent/DeepScrollModal.tsx`; everything in the other three OWNS columns |

**Shared, read-only for all four, no exceptions:**
- `src/app/globals.css`. Phase 1 owns it. **One three-line addition is needed by D4 and the manager
  applies it once, before D4 starts:** `--calc-warn-accent: var(--warn-1-on-dark);`,
  `--calc-warn-bg: var(--warn-1);`, `--calc-warn-fg: #ffffff;` in the same `:root` block as
  `--warn-1..4` (`globals.css:66-73`). **T30 does not bite here**: these are custom-property
  declarations, not class rules, so there is no unlayered rule to beat a consumer's utility. No
  package adds a class to `globals.css`; a package that thinks it needs one escalates.
- `packages/web-shared/**` (T12). Read freely, mirror locally, never edit — including
  `tools/components/Calculator.tsx`, whose amber fallbacks are defeated by the token block above
  rather than removed.
- `src/components/forms/LeadForm.tsx`, `DetailsForm.tsx`, `MiniCapture.tsx`. The consent wording is
  the most expensive surface in the programme.
- `src/components/intent/**`. `DeepScrollModal` and `ResultGateModal` are existing interruptive
  surfaces: restyle is permitted inside D4's OWNS set, **no trigger, threshold or cadence moves**.
- `src/components/layout/**`, `src/components/blog/**`, `content/**`, `niche.config.json`.
- `src/app/services/page.tsx`, `src/app/gross-payment-status/page.tsx`, `src/config/service-tiers.ts`
  (Phase 5, and the other two thirds of TD-05).

**Repo-wide, all four:** other agents hold uncommitted work for Dentists, Medical, Solicitors,
generalist and hospitality in this checkout. **Never run a repository-wide git command.** Path-scope
every git invocation to `construction-cis/` and `docs/construction-cis/`, read-only, **and check
`pwd` first** — a path-scoped git command from the wrong directory returns empty, which looks
exactly like deleted work. Builders never commit and never build (T1); the manager builds, serially,
and checks `BUILD_ID` mtime against the newest source file before trusting a green run (T2).

---

## 7. OWNER GATES

1. **One new tracking label on the twelve calculator pages.** The calculator pages already carry a
   contact form near the foot that nothing on the page points at. Pointing the top button at it
   needs a new label (`calc_hero_help`) so the reporting can tell it apart from the header button.
   **Recommend approve**: it is the same fix that Phase 3 made on the trade pages, and without the
   label the change is invisible in the numbers.
2. **Two existing buttons that are not being counted at all.** The "Book free consultation" button
   on the calculator hub and the partnership button on the embed page both send people to the
   contact page and neither is tagged, so nobody knows if they work. Tagging them means two more new
   labels. **Recommend approve, or approve neither**: tagging one of a pair teaches nothing.
3. **Whether the free calculators should hold the answer back until the reader gives an email.**
   Property does this; Trade does it on the blog tools only. Section 4 puts both sides. **Recommend
   NOT NOW**: the site has three leads in its life, so there is nothing to measure the change
   against, and doing it in the same week as the redesign makes both unreadable.
4. **Whether the blog's interactive tool should show its chart.** It has one, built and tested, and
   the blog never asks for it. Turning it on makes the page heavier and slower to settle.
   **Recommend DEFER** to a content decision, separately from this phase.
5. **The dismiss button on the blog tool's pop-up is measured a different way from every other
   button on the site.** It reports itself in code rather than by a tag in the page, so the standard
   button report cannot see it. **Recommend LEAVE IT**: changing it would add a new row to a locked
   measurement snapshot for no gain, and the event itself is already recorded.
6. **The em-dash target is 2, not 0.** Two of the thirty-six are dashes inside money ranges
   (`£12,570–£50,270`) where that punctuation is correct. **Recommend approve 2** rather than a
   clean-looking zero that would require corrupting two correct figures.
7. **The four-year refund tool's input labels all change.** Sixteen visible labels go from
   `2025/26 — Gross CIS income` to `2025/26: Gross CIS income`. It is the most visible copy change
   in the phase and it is purely the house punctuation rule. **Recommend approve.**
8. **The chart on the blog tool cannot be read by screen-reader users**, here and on seven sister
   sites. **Recommend fixing ours now** and raising the shared version separately, rather than
   waiting for the shared fix that touches seven other sites mid-flight.

---

## 8. RISKS AND AMBIGUITIES

| # | Risk | Recommended resolution |
|---|---|---|
| 1 | **A builder destroys the two protected en-dashes** while closing 39 em-dashes, most cheaply by a bulk `sed 's/[—–]/:/g'`. The sweep then reports `totalDashes == 0`, which looks *better* than the target, and two correct money ranges have been corrupted in `note` strings nobody re-reads. | WP-D1's acceptance asserts `grep -c '–'` == **1** on each of the two files by name, and the target is stated as 2 in four places. **No bulk substitution: 39 instances, six shapes, edited by hand.** |
| 2 | **A builder fixes only what renders.** `cis-deduction-calculator.ts` shows 3 of its 5 em-dashes at default field values; the other 2 appear when a user picks "unregistered". A rendered-DOM check passes with two live strings left behind. | Assert the **source** metric (M3, `grep -rc '—' src/lib/calculators/tools/` == 0) as well as M1, and keep the ratchet deletion in the same package so the guard cannot be satisfied by a partial fix. |
| 3 | **A slug rename or a tool deletion breaks 109 CTAs and 45 link floors in another phase's scope.** `next_step\|null\|null`'s `hrefs` array in `cta_baseline.json` points into `/calculators/*`, and `NextStepOffer` is 1 of the 6 unique body links holding `/for/[slug]`'s floor of 20. | **No package in this phase may change a `slug`, a `name` or the composition of `GENERIC[]`.** Stated in WP-D1's Do NOT. `registry.ts` is off limits to all four. |
| 4 | **The `/calculators` floor has a margin of 2 and the disposition implies 6.** Retiring the `/embed` link or consolidating two tool cards during a "tidy" breaks a binding floor with no warning. | Section 5, and WP-D2's acceptance asserts the `/embed` anchor and all 12 tool anchors by name, not just the total. |
| 5 | **The warning ladder's real consumer is mistaken for its unreachable one.** An agent reads "tone is unreachable" and deletes the branch, or defines the `--calc-warn-*` tokens and reports the ladder as shipped while `bg-amber-50` still renders on the blog. | Section 1e separates them explicitly. Two different fixes, two different files, both required: the token block (manager) **and** `PremiumCalculator.tsx:322-325` (D4). `grep -rn 'amber' src/components/calculators/` == 0 is the proof of the second. |
| 6 | **The brief requires `src/tests/intent-engine.test.ts` to pass byte-unchanged as proof no cadence moved. THE FILE DOES NOT EXIST.** `find . -name "intent-engine*"` under `construction-cis/` returns nothing; `src/lib/intent/` holds `engine.ts` and four siblings but no test. A builder told to run it will either invent one or report a pass it never got. | **Substitute gate, binding:** `git diff --stat -- construction-cis/web/src/components/intent/` must be **empty**, and `grep -rn 'gateModalShownThisSession\|isConverted\|scroll' src/components/calculators/premium/PremiumCalculator.tsx` must be unchanged line-for-line, both asserted in WP-D4. Writing the missing test is worth doing; it is **not** Phase 4's, because a new test here would be authored by the same agent whose work it is meant to police. |
| 7 | **The premium tier has no committed instrument at all.** It is `ssr: false`, so it is invisible to the sweep, to `cta_snapshot.mjs` and to `browser_check.mjs`'s server-HTML paths. A package can restyle five files, report green on every gate in this plan, and have broken the gate modal. | WP-D4's acceptance requires a live desktop DOM read and a screenshot pair on a named article route. Say so in the completion report as a manual check, never as an instrument pass. |
| 8 | **`/embed`'s 35 dashes and 13 unbaselined routes appear as a regression** the first time anyone widens the sweep's target list, most likely during the owner walk. | D1 fixes them at source, so after this phase `/embed` reads 2. **Do not baseline `/embed` in this phase**; note in the completion report that it is now safe to. |
| 9 | **`PHASE3_PLAN`'s `totalDashes == 2` acceptance is red on arrival** (correction 1) and a Phase 3 manager may read it as damage, re-open a closed package, or re-baseline the sweep to make it green. **Re-baselining would erase the 36 that this phase exists to close.** | Tell the Phase 3 manager before he runs it. The correct Phase 3 assertion is no dash *regression*, which is `sweep.mjs`'s default behaviour. **Nobody re-baselines `sweep_baseline.json` in either phase.** |
| 10 | **`cis-back-years-calculator.ts` labels four historic years (2022/23 to 2025/26) while `cis-tax.ts` carries 2026/27 rates only** (`:28`, `:43`, `:54`, all commented "HP §11a, 2026/27"). If the tool applies current-year rates to four prior years, the four-year refund figure is wrong, and D1 is about to rewrite all sixteen of its labels. | **Out of scope and must not be fixed here**: it is an arithmetic question, not a design one, and `house_positions.md` has no position on back-year rate sets. **Raise it to the owner as a separate finding in the completion report.** D1 changes label punctuation and nothing else; `tools.test.ts` passing green proves the arithmetic did not move, not that it was right. |
| 11 | Four packages, 26 routes, one production server on port 3261 shared with other agents, and a dozen dev servers on nearby ports. Three baselines in this programme were written against the wrong site. | **Assert `<title>` on `/` contains `CIS Accountants` before trusting any measurement**, every run, every package. `/blog`'s title differs and is not the assertion. Builders do not build and do not restart the server (T1). |
