# Medical R2 premium in-blog tools + result gates — build brief

Wave 3 (Medical) release R2 of the estate CRO parity program. Instantiates
`docs/_engines/CRO_PARITY_TEMPLATE.md` §R2 (WS4) for `Medical/web`
(Medical Accountants UK, medicalaccounts.co.uk). Reference implementation:
the SHIPPED Dentists R2 (`Dentists/web/src/lib/tools/premium/**` +
`Dentists/web/src/components/tools/premium/**`). This brief is the ARCHITECT's
contract for the Sonnet build workers and the embedded Opus adversarial QA. Do
NOT redesign — instantiate the Dentists shape with Medical inputs swapped in.

Ground truth sources: `docs/medical/house_positions.md` (LOCKED, cited `§N`),
the three EXISTING compute libs in `Medical/web/src/lib/tools/compute/**`
(dividends already 2026/27-correct; goldens exist), and
`Medical/web/src/lib/intent/taxonomy.ts` (5 topics from M-1).

## Standing rules (apply throughout — QA blocking)

- **Wrap existing compute libs. Fork ZERO maths.** Every premium `compute()`
  imports the exported pure functions (`calcNHSPension`, `calcLocumTax`,
  `calcIncorporation`) and only shapes their output into the premium result.
- **Token rule (HARD).** Navy `#001b3d` + copper `#b87333` ONLY. Use the
  defined tokens `var(--navy)`, `var(--copper)`, `var(--copper-strong)`,
  `var(--gold)` / `var(--gold-strong)` (aliases → copper, line 48-49 of
  globals.css), `var(--accent)` / `var(--accent-strong)` (→ copper),
  `var(--surface)`, `var(--surface-elevated)`, `var(--ink)`, `var(--ink-soft)`,
  `var(--muted)`, `var(--border)`. **NEVER `var(--primary)`.** Medical's
  globals.css DOES define `--primary: var(--navy)` (line 35), but the estate
  discipline forbids relying on it (it is undefined on sibling sites, so any
  ported component that uses it is non-portable). The Dentists components use
  `var(--gold)`/`var(--navy)`/`var(--accent)` throughout — those all resolve
  correctly on Medical unchanged. Teal/coral names are also aliases onto
  navy/copper; do not introduce them.
- **UK English. No em-dashes anywhere** in any user-facing string (commas,
  parentheses, full stops, middle dots). No `" -- "` em-dash substitute either.
- **No DJH.** The string "DJH" appears nowhere on Medical (visible copy,
  JSON-LD, notes, gate copy).
- **Dependency-free.** Native range inputs, native `<select>`, `<details>`
  collapsibles, inline SVG bar chart. No recharts, no radix in the premium
  surface (Medical carries radix/lucide/clsx/tw-merge for other surfaces; the
  premium tier must not add to that or import them).
- **Storage prefix `ma` FROZEN.** Any storage/session key is `ma_…`; grid keys
  (none used in R2) would be `ma:grid:*`, never `ptp:` or `dfp:`.
- **Events: allowlist ONLY.** `calc_view`, `calc_input_change`, `calc_computed`,
  `calc_result_viewed`, `cta_click`, `gate_view`, `resource_unlocked`,
  `lead_submitted`, `form_start`, `form_submit`, `form_error` (all present in
  `packages/web-shared/analytics/types.ts`). Add NO new event names.
  `result_gate_skip` is a `cta_id` VALUE on `cta_click`, not a new event.
- **FLAT routing (`/blog/[slug]`).** The premium island receives its topic AS A
  PROP resolved from the `categorySlug` the page already passes to
  `BlogPostRenderer` (M-1 `TopicOverrideProvider` design). It is NEVER derived
  from `window.location` / URL parsing inside the island or the gate.
- **Premium tier is blog-island-only.** No per-calculator-page surface, no
  gallery/sitemap/registry change to the fleet registry
  (`src/lib/tools/registry.ts` untouched). The premium registry is separate and
  additive. (Dentists R2 shipped exactly this way; the `full` chart variant
  exists in the type but is not mounted on any page.)

---

## Section 1 — Tool set (inputs / outputs / compute reuse)

Medical has **3 compute libs**, mapping to **5 intent topics** (M-1 taxonomy).
The fleet is **3 premium tools**. There is NO forced fourth lib: `gp-tax`'s
`primaryCalculator` in the taxonomy is already `locum-tax-calculator`, so the
salaried/self-employed doctor take-home planner (Tool 2) serves `gp-tax` too.
Do NOT invent a thin gp-tax helper — the specialist fallback via Tool 2 is the
correct, non-forced choice and matches the taxonomy.

Topic → tool spine (this is the `resources.ts` map, Section 3):

| TopicKey (M-1) | Premium toolId | Compute lib reused | Notes |
|---|---|---|---|
| `nhs-pension` | `nhs-pension-premium` | `calcNHSPension` | flagship, pairs with the 19%-of-traffic NHS content |
| `locum` | `locum-take-home-premium` | `calcLocumTax` | locum sole-trader take-home |
| `gp-tax` | `locum-take-home-premium` | `calcLocumTax` | SAME tool, gp-tax framing (salaried + self-employed doctor tax) |
| `incorporation-private` | `incorporation-premium` | `calcIncorporation` | private-practice sole trader vs Ltd |
| `gp-practice` | `""` (no tool) | — | specialist-contact topic; PremiumUpgrade renders nothing |

`gp-practice` maps to an empty `toolId` (like Dentists `compliance`), so those
posts remain untouched and the island renders nothing.

### Tool 1 — NHS Pension annual-allowance and taper planner (FLAGSHIP)

- **id**: `nhs-pension-premium` · **topic**: `nhs-pension`
- **title**: "NHS Pension annual allowance and taper planner"
- **intro** (one line, no em-dash): "See whether your NHS Pension growth breaches
  the annual allowance once the taper is applied, and estimate the tax charge
  before you decide on Scheme Pays."
- **compute reuse**: `calcNHSPension({ thresholdIncome, pensionGrowth, taxBand })`
  from `compute/nhs-pension.ts`. Zero maths added.
- **fields** (all reuse the shared `CalcField` vocabulary):
  - `thresholdIncome` currency, default 150000, min 0, max 400000, step 5000,
    label "Threshold income", help "Broadly your taxable income minus your own
    pension contributions (HP §2.B)."
  - `pensionGrowth` currency, default 40000, min 0, max 200000, step 1000,
    label "NHS pension input amount (growth this year)", help "The capitalised
    growth in your NHS benefits, not the contributions you paid (HP §2.B)."
  - `taxBand` select {basic "Basic rate (20%)", higher "Higher rate (40%)",
    additional "Additional rate (45%)"}, default "higher", label "Your marginal
    income tax rate".
- **outputs** (from the lib): `annualAllowance`, `isTapered`, `excess`,
  `taxCharge`, `effectiveCost`, plus derived `adjustedIncome`.
  - **headline**: label "Estimated annual allowance charge", value
    `gbp(taxCharge)`, tone `warn` when `taxCharge > 0` else `good`, sub =
    `isTapered ? "Tapered allowance £{annualAllowance}" : "Standard allowance £60,000"`.
  - **breakdown rows**: Annual allowance (tapered or standard), Adjusted income,
    Excess over allowance, Estimated tax charge (strong), Effective cost of the
    breach (`effectiveCost.toFixed(1) + "%"`) shown only when `taxCharge > 0`.
  - **note** (must state, no em-dash): 2025/26 basis; the annual allowance is
    £60,000 tapering where threshold income exceeds £200,000 AND adjusted income
    exceeds £260,000, down to a £10,000 floor (HP §2.B); this measures pension
    growth (input amount), not contributions; carry-forward of unused allowance
    from the previous three tax years can remove or reduce a charge and is not
    modelled here; where the charge exceeds £2,000 and scheme growth exceeds
    £60,000, mandatory Scheme Pays can settle it (election deadline 31 July in
    the year after the charge, HP §2.D); estimates, not advice.
- **explainer**: 2 to 3 paragraphs on the £60k allowance, the taper mechanics,
  input-amount-not-contributions, carry-forward, and Scheme Pays (HP §2.B/§2.D).
  No named adviser (user is not an accountant; faceless).
- **NO chart** (single-charge output, not a comparison). `chart` omitted.

### Tool 2 — Doctor take-home planner (locum + salaried/self-employed)

- **id**: `locum-take-home-premium` · **topic**: `locum` (and `gp-tax` via spine)
- **title**: "Doctor take-home pay planner"
- **intro**: "Estimate your take-home pay as a locum or self-employed doctor
  after income tax, Class 4 National Insurance and any student loan, on the
  2025/26 basis."
- **compute reuse**: `calcLocumTax({ grossIncome, expenses, pensionContributions,
  studentLoanPlan })` from `compute/locum-tax.ts`. Zero maths added.
- **fields**:
  - `grossIncome` currency, default 80000, min 0, max 400000, step 1000, label
    "Gross fees / income for the year".
  - `expenses` currency, default 5000, min 0, max 100000, step 500, label
    "Allowable business expenses", help "Indemnity, GMC fee, professional
    subscriptions, equipment, mileage and so on (HP §8)."
  - `pensionContributions` currency, default 10000, min 0, max 60000, step 1000,
    label "Personal pension contributions", advanced true, help "Deducted before
    tax in this model."
  - `studentLoanPlan` select {none "No student loan", plan1 "Plan 1",
    plan2 "Plan 2", plan4 "Plan 4 (Scotland)"}, default "none", label "Student
    loan plan".
- **outputs**: `netTakeHome` (headline, tone good), `incomeTax`,
  `nationalInsurance`, `studentLoanRepayment` (shown only when > 0),
  `totalDeductions`, `effectiveTaxRate`.
  - **headline**: label "Estimated take-home", value `gbp(netTakeHome)`, sub
    `"effective deduction rate {effectiveTaxRate.toFixed(1)}%"`.
  - **breakdown rows**: Net income after expenses and pension, Income tax,
    Class 4 National Insurance, Student loan (conditional), Total deductions
    (strong), Take-home (strong).
  - **note**: 2025/26 basis; Class 4 NIC is 6% between £12,570 and £50,270 then
    2% (HP §8); Class 2 is no longer a required payment from 6 April 2024 (HP §8);
    student loan thresholds are the 2025/26 values; excludes payments on account
    timing; a salaried GP is taxed under PAYE with Class 1 NIC, so this planner
    fits self-employed and locum income (HP §1); estimates, not advice.
- **explainer**: 2 to 3 paragraphs. For the `gp-tax` framing, the explainer must
  make clear a salaried GP is a PAYE employee (Class 1), so this tool models the
  self-employed / locum / private-session income a doctor holds alongside any
  salaried post (HP §1, §1.A). Do not imply a salaried GP files Class 4 on salary.
- **NO chart** (single take-home output). `chart` omitted.

### Tool 3 — Private-practice incorporation comparison

- **id**: `incorporation-premium` · **topic**: `incorporation-private`
- **title**: "Private practice incorporation comparison"
- **intro**: "Compare taking your private practice profit as a sole trader
  against extracting it through a limited company, on the 2026/27 dividend basis,
  with the NHS Pension trade-off made explicit."
- **compute reuse**: `calcIncorporation({ privateIncome, expenses, desiredSalary,
  nhsIncome })` from `compute/incorporation.ts`. Dividends are already
  2026/27-correct (10.75% / 35.75% / 39.35%, CT 25%). Zero maths added.
- **fields**:
  - `privateIncome` currency, default 100000, min 0, max 1000000, step 5000,
    label "Private practice income for the year".
  - `expenses` currency, default 15000, min 0, max 300000, step 1000, label
    "Practice expenses".
  - `nhsIncome` currency, default 50000, min 0, max 300000, step 5000, label
    "Your NHS (PAYE) income", help "Your salaried NHS pay. It uses your personal
    allowance and basic-rate band first (HP §2.C)."
  - `desiredSalary` currency, default 12570, min 0, max 50000, step 500,
    advanced true, label "Director salary from the company", help "Often set near
    the £5,000 secondary threshold for a single-director company (HP §5)."
- **outputs**: `soleTraderTotalTax`, `soleTraderNetIncome`, `corporationTax`,
  `dividendTax`, `limitedCompanyTotalTax`, `limitedCompanyNetIncome`,
  `taxSavings`, `savingsPerMonth`. Because the lib's `taxSavings` compares TAX
  (not net take-home) and the sole-trader taxable base includes NHS income while
  the Ltd base does not, the premium tool must present **total tax under each
  route** as the primary comparison (that is what `taxSavings` reconciles), and
  MUST NOT headline "you keep £X more" from mismatched net figures. See the
  conservation caveat in Section 2.
  - **headline**: label = `taxSavings >= 0 ? "Estimated tax saving from
    incorporating" : "Incorporating costs more here"`, value
    `gbp(Math.abs(taxSavings))`, tone `taxSavings > 0 ? "good" : "warn"`, sub
    `"£{|savingsPerMonth|} a month"`.
  - **scenarioResults** (two tiles, mirror Dentists principal-extraction):
    - "Sole trader": headline value `gbp(soleTraderTotalTax)` labelled "Total
      tax and NIC", best = `taxSavings <= 0`; rows: Total tax and NIC (strong),
      Net income after tax.
    - "Limited company": headline value `gbp(limitedCompanyTotalTax)` labelled
      "Total tax", best = `taxSavings > 0`; rows: Corporation tax, Dividend tax,
      Total tax (strong), Note "£{desiredSalary} salary plus dividends, no
      Employment Allowance for a single-director company".
  - **breakdown rows**: Tax difference (strong), Sole trader total tax, Limited
    company total tax, and (always, this is the compliance centrepiece) an
    "NHS Pension impact" row: "Company dividends are not NHS pensionable, so
    incorporated private income loses NHS accrual (HP §2.C)."
  - **note** (must state, no em-dash): 2026/27 dividend basis (10.75% / 35.75% /
    39.35%, FA 2026 s.4); CT 19% to £50,000, 25% above £250,000, marginal relief
    between (HP §5); a limited company CANNOT hold a GMS/PMS contract and company
    income is not NHS pensionable, so this decision applies to PRIVATE work only
    (HP §2.C, §5); dividends are taxed again on extraction and that is already in
    the Ltd figure; a director's loan taken ahead of dividends triggers a s.455
    charge at 35.75% on post-6-April-2026 loans (HP §5); the headline tax gap is
    modest at typical private-income levels and the real drivers are the annual
    allowance taper, retained earnings and family planning (HP §5); this model
    does not value the NHS pension accrual lost, which can outweigh the tax saving
    (HP §2.C); estimates, not advice.
  - **compliance non-negotiable (HP §2.C, §5, mirrors the Dentists principal
    tool)**: the tool must NOT present incorporation as a clear win. The NHS
    Pension impact row is ALWAYS shown, and the note must always pair any saving
    with the pension-accrual loss. QA blocks if the pension line is conditional
    or missing.
  - **groupedBar chart** (optional, blog variant does not render it since the
    island uses `full={false}`; include the `chart` spec + data for type parity
    with Dentists): series `soleTrader` colour `var(--gold)`, `ltd` colour
    `var(--navy)`; data groups "Total tax" and "Net after tax".

---

## Section 2 — Goldens (derived by EXECUTING the libs)

All figures below were produced by EXECUTING the three compute libs in Node on
2026-07-06 (not hand-traced), with conservation checks. The premium test file
`Medical/web/src/lib/tools/premium/premium-tools.test.ts` pins each to the penny.
No `typeof`-only assertions. Golden tests must pass BEFORE a tool's registry line
is added.

### Tool 1 — `calcNHSPension` (2025/26 constants: £60k / £200k / £260k / £10k floor)

| Case | Inputs | annualAllowance | isTapered | excess | taxCharge | effectiveCost |
|---|---|---|---|---|---|---|
| NHS-A (tapered) | th=210000, growth=70000, higher | 50000 | true | 20000 | 8000 | 11.4286% |
| NHS-B (untapered) | th=150000, growth=40000, higher | 60000 | false | 0 | 0 | 0 |
| NHS-C (floor) | th=300000, growth=200000, basic | 10000 | true | 190000 | 38000 | 19% |
| NHS-D (min floor, add) | th=250000, growth=100000, additional | 15000 | true | 85000 | 38250 | 38.25% |

- Conservation NHS-A: reduction = (280000 − 260000)/2 = 10000 → AA = 60000 −
  10000 = 50000; excess = 70000 − 50000 = 20000; charge = 20000 × 0.40 = 8000. ✓
- Conservation NHS-C: reduction = (500000 − 260000)/2 = 120000 → AA floored at
  10000; excess = 200000 − 10000 = 190000; charge = 190000 × 0.20 = 38000. ✓
- These four already exist as compute-lib goldens
  (`medical-tools.test.ts`); the premium test asserts the config `compute()`
  wraps them: NHS-A headline value = "£8,000", tone = "warn"; NHS-B headline =
  "£0", tone = "good".

### Tool 2 — `calcLocumTax` (2025/26: PA £12,570, Class 4 6%/2%, SL 2025/26)

| Case | Inputs | netIncome | incomeTax | Class 4 NI | studentLoan | take-home |
|---|---|---|---|---|---|---|
| LOC-A | gross=80000, exp=5000, pen=10000, none | 65000 | 13432 | 2556.60 | 0 | 49011.40 |
| LOC-B | gross=80000, exp=5000, pen=10000, plan2 | 65000 | 13432 | 2556.60 | 3287.70 | 45723.70 |
| LOC-C | gross=200000, exp=10000, pen=0, none | 190000 | 66675 | 5056.60 | 0 | 118268.40 |

- Conservation LOC-A: take-home + totalDeductions = 49011.40 + 15988.60 =
  65000 = netIncome. ✓ (income tax 13432 + NI 2556.60 = 15988.60)
- Conservation LOC-B: SL = (65000 − 28470) × 0.09 = 3287.70; take-home =
  65000 − 13432 − 2556.60 − 3287.70 = 45723.70. ✓
- Premium config `compute()` assertions: LOC-A headline value contains "49,011",
  tone "good"; the Student loan row is ABSENT for LOC-A (0) and PRESENT for LOC-B.

### Tool 3 — `calcIncorporation` (2026/27 dividends 10.75/35.75/39.35, CT 25%)

| Case | Inputs (private, exp, salary, nhs) | soleTraderTotalTax | corporationTax | dividendTax | ltdTotalTax | taxSavings |
|---|---|---|---|---|---|---|
| INC-A | 100000, 15000, 12570, 50000 | 46012.60 | 21250 | 18118.10 | 46854.10 | −841.50 |
| INC-B | 300000, 20000, 12570, 0 | 115162.60 | 70000 | 64014.435 | 134014.435 | −18851.835 |
| INC-C | 150000, 20000, 12570, 0 | 44662.60 | 32500 | 20758.725 | 53258.725 | −8596.125 |

- Conservation INC-A: taxSavings = soleTraderTotalTax − ltdTotalTax = 46012.60 −
  46854.10 = −841.50; savingsPerMonth = −70.125. ✓ (sole trader is cheaper here)
- Conservation INC-C: taxSavings = 44662.60 − 53258.725 = −8596.125. ✓
- **All three default/representative cases show incorporation costing MORE tax**
  at typical private-income levels, which is exactly HP §5's locked position. The
  premium tool's warn-tone headline and always-on NHS-pension-loss note are
  therefore reinforced by the arithmetic. QA must confirm the headline reads
  "Incorporating costs more here" for INC-A (taxSavings < 0), not a false saving.

### CRITICAL FLAG for the manager (NOT for the worker to fix in R2)

`compute/incorporation.ts` line 81 computes sole-trader **Class 4 NI at 9%**
(`soleTraderNI += niableBand1 * 0.09`), while `compute/locum-tax.ts` uses **6%**
(the correct 2025/26 main rate). HP §5 and §8 lock Class 4 at **6% / 2%** (the
9% rate was abolished from 6 April 2024). This is an internal inconsistency and a
stale rate that INFLATES the sole-trader tax in Tool 3, making incorporation look
relatively better than it should. The goldens above are pinned to the lib's
CURRENT behaviour (9%), so they pass and R2 does not fork maths. But the brief
flags this as a manager-ordered rate-refresh candidate (precedent: the Dentists
NIC and Solicitors R2 corrections), to be done with regenerated goldens as a
SEPARATE front-loaded change if the manager confirms — NOT silently inside R2.
See the R2 QA additions and Section 5 regression note.

(Also doc-only rot, no code impact: `docs/medical/TOOLS.md` documents 8.75/33.75
dividends beside "15% from Apr 2025" and is internally inconsistent — do NOT seed
any tool copy from TOOLS.md; the compute libs are the source of truth.)

---

## Section 3 — Blog island placement map (topic-as-prop, FLAT routing)

The premium island is injected inside `BlogPostRenderer.tsx` at the mid-split,
ALONGSIDE the existing R1 `InlineMiniLeadForm`, exactly as Dentists ships it. The
Medical renderer already computes `topicFromCategory(post.category)` for the R1
intent surfaces; the premium island MUST resolve its topic from the **category
slug**, matching the categorySlug-resolved design (never `window.location`).

### The topic resolution (hardening invariant)

The page passes `categorySlug` (= `slugifyCategory(post.category)`) to
`BlogPostRenderer` as a prop. Add ONE line in the renderer:

```
const premiumTopic = topicForBlogSlug(categorySlug);
```

`topicForBlogSlug` (from `lib/intent/taxonomy.ts`) maps a category slug →
`TopicKey | null`. This is the SAME resolution Dentists uses. Do NOT reuse the
R1 `topic = topicFromCategory(post.category)` variable for the island — use the
slug-derived `premiumTopic` so the island honours the categorySlug-as-prop rule
byte-for-byte (both paths resolve to the same TopicKey, but the slug path is the
contract). `topicFromCategory` internally slugifies then calls `topicForBlogSlug`,
so if the page does not already pass a clean `categorySlug`, resolve it once at
the top of the renderer from `post.category` via the same slugify and feed BOTH.

### Injection points (coordinated edit to `BlogPostRenderer.tsx`)

Mirror the Dentists renderer exactly:

1. **Mid-split path** (`midSplit.after !== null`, posts with >= 4 h2s): inject
   `<PremiumUpgrade topic={premiumTopic} placement="blog" category={categorySlug} />`
   IMMEDIATELY BEFORE the existing `<InlineMiniLeadForm topic={post.category} />`,
   inside the `midSplit.after` branch, then the second-half HTML.
2. **Short-post fallback** (`midSplit.after === null`, fewer than 4 h2s): inject
   the SAME `<PremiumUpgrade ... />` after the article body (in the `else`
   branch), so mapped categories still get the tool on short posts.

`PremiumUpgrade` returns `null` for any topic with no premium tool (the empty
`toolId` in `resources.ts` for `gp-practice`, and `null` topic), so the injection
is unconditional and lights up only for the 4 mapped topics
(`nhs-pension`, `locum`, `gp-tax`, `incorporation-private`).

### PremiumUpgrade internal layout (ported from Dentists, re-skinned)

- **Eyebrow chip**: `bg-[var(--navy)]` fill, white text, "Free interactive tool".
  (Navy chip, not `--primary`.)
- **`sm:hidden` → `MobileToolSlot topic={topic}`**: the chart/slider tool is
  desktop-only; mobile gets a topic-aware `MiniCapture` so mobile intent converts.
- **`hidden sm:block` → `PremiumCalculator`** loaded via
  `dynamic(() => import(...), { ssr: false, loading: <ToolLoading /> })` with a
  sized skeleton (min-height 480) to prevent CLS. The skeleton accent bar is
  `bg-[var(--gold)]` (→ copper), pulses `var(--border)`. No `--primary`.
- **`topicKey={topic}` threaded** into `PremiumCalculator` → `ResultGateModal`
  as a PROP. Never re-derived from the URL.

### Coverage by topic (post counts from M-1 audit, 73 posts)

| Topic | Category slugs | Posts | Tool surfaced |
|---|---|---|---|
| `nhs-pension` | nhs-pension-planning | 8 | Tool 1 (flagship) |
| `locum` | locum-tax | 6 | Tool 2 |
| `gp-tax` | gp-tax-and-accounts, medical-expenses | 17 | Tool 2 (gp-tax framing) |
| `incorporation-private` | incorporation-and-company-structures, private-practice | 6 | Tool 3 |
| `gp-practice` | gp-practice-management, gp-accountant-services | 36 | none (empty toolId) |

37 of 73 posts get a premium island; the 36 `gp-practice` posts render nothing
(deliberate — no calculator fits generic practice-management content).

---

## Section 4 — ResultGateModal wiring (three non-negotiables + topicKey prop)

Port `Dentists/web/src/components/tools/premium/ResultGateModal.tsx` verbatim,
re-skinned to Medical tokens (navy scrim, copper/gold accent). It wraps the
existing Medical `MiniCapture` (already chokepoint-wired via `submitMedicalLead`,
honeypot `enquiry_ref` pass-through, consent from `siteConfig.leadConsentText`).

### The three non-negotiables (QA blocking)

1. **Escape hatch ALWAYS reveals.** X button, backdrop click, Esc key, and the
   "No thanks, just show my result" link all call `skip()`, which fires exactly
   ONE `cta_click { cta_id: "result_gate_skip", placement: "result_gate" }` per
   dismiss and then reveals the figure. The result is NEVER walled off.
2. **`isConverted()` visitors are NEVER gated.** `PremiumCalculator` computes
   `gated = placement === "blog" && !isConverted()`. Only in-blog placements gate;
   pages/embeds/mobile-slot never gate (mobile is a `MiniCapture`, not the
   calculator). A converted visitor sees the result instantly with a
   `CalcResultCta` beneath it.
3. **Once per session.** Module-scoped `let gateModalShownThisSession = false`
   in `PremiumCalculator`. First "See your result" opens the gate; thereafter it
   reveals directly.

### topicKey as a prop (hardening invariant)

`topicKey` flows `PremiumUpgrade` (`topic`) → `PremiumCalculator`
(`topicKey={topic}`) → `ResultGateModal` (`topicKey`). Inside the modal,
`const topic = topicKey ? getTopic(topicKey) : null;` selects the intent CTA copy
(`topic?.ctaCopy` from the M-1 taxonomy — e.g. nhs-pension → "Check your NHS
pension annual allowance and taper"). It is NEVER re-derived from the URL.

### MiniCapture props for the gate (Medical copy, no DJH, no em-dash)

- `formId="calc_result_gate"`
- `messagePrefix={`[Result gate: ${campaign}]`}` (campaign = toolId)
- `heading={topic?.ctaCopy || "Want a specialist to check your figure?"}`
- `blurb`: medical-specific, e.g. "A calculator gives the shape of the answer.
  NHS pensions, the annual allowance taper and private-practice incorporation are
  unforgiving in the detail. Tell us your situation and a specialist medical
  accountant will confirm your exact figure and the sensible next step, with no
  obligation." (No em-dash, no DJH.)
- `submitLabel="Get my figure confirmed"`,
  `successText="Thanks, we will be in touch within one working day. Your result
  is below."`
- `messageMinLength={40}`, `messageMinWords={8}` (matches Dentists gate rigour).
- `onSuccess={onReveal}` (submit reveals AND marks converted via the shared
  `ft.onLead` → visitMemory path).

### MobileToolSlot props (per topic)

Port `Dentists/.../MobileToolSlot.tsx`: `formId="mobile_tool"`,
`messagePrefix={`[Mobile tool: ${topic}]`}`, `role="Other"`,
`heading={t?.ctaCopy || "Get your figure from a specialist"}`, medical desktop-
only blurb, `submitLabel="Send me my figure"`, className left copper/gold border
+ `var(--surface-elevated)` background.

### Events emitted (all allowlisted)

`calc_view` (island in view), `calc_input_change` (per field), `calc_computed`
(debounced 800ms), `calc_result_viewed` (first interaction), `cta_click`
(`see_result`, `result_gate_skip`), plus `form_start`/`form_submit`/
`lead_submitted`/`form_error` via `MiniCapture`. No `gate_view` is required by
the Dentists pattern (the gate open is a UI state, not tracked as a new event);
if added, it must be the allowlisted `gate_view` name, nothing new.

---

## Section 5 — File manifest, build order, regression invariants

### File manifest (Medical/web ONLY — no web-shared, no Property, no fleet registry)

New files (port from the Dentists siblings, re-skinned):

```
Medical/web/src/lib/tools/premium/
  types.ts                         # port Dentists types.ts verbatim (imports @/lib/intent/taxonomy TopicKey)
  resources.ts                     # topic -> toolId spine (5 TopicKeys; gp-practice -> "")
  registry.ts                      # PREMIUM_TOOLS map + getPremiumTool/hasPremiumTool (3 tools)
  configs/
    nhs-pension-premium.ts         # Tool 1 config, wraps calcNHSPension
    locum-take-home-premium.ts     # Tool 2 config, wraps calcLocumTax
    incorporation-premium.ts       # Tool 3 config, wraps calcIncorporation
  premium-tools.test.ts            # goldens (Section 2) + no-em-dash + no-DJH + registry + resources spine + conservation

Medical/web/src/components/tools/premium/
  PremiumCalculator.tsx            # port; native inputs, gate wiring, once-per-session flag
  PremiumUpgrade.tsx               # port; sm:hidden MobileToolSlot / sm:block PremiumCalculator; topicKey thread
  MobileToolSlot.tsx               # port; topic-aware MiniCapture
  ResultGateModal.tsx              # port; three non-negotiables; topicKey prop; Medical MiniCapture
  PremiumBarChart.tsx              # port; dependency-free inline SVG (used only by full variant, kept for type parity)
```

Coordinated shared edit (append-only, one worker owns it):

```
Medical/web/src/components/blog/BlogPostRenderer.tsx
  + import { topicForBlogSlug } from "@/lib/intent/taxonomy";
  + import { PremiumUpgrade } from "@/components/tools/premium/PremiumUpgrade";
  + const premiumTopic = topicForBlogSlug(categorySlug);   // slug-derived
  + <PremiumUpgrade topic={premiumTopic} placement="blog" category={categorySlug} />
      in BOTH the mid-split branch (before InlineMiniLeadForm) and the short-post fallback
```

Confirm the page that renders `BlogPostRenderer` already passes a clean
`categorySlug` prop (M-1 shipped this). If it passes only `post.category`,
resolve the slug once at the top of the renderer with the same slugify used by
`topicFromCategory` and feed `topicForBlogSlug`.

Untouched (guardrail): `src/lib/tools/registry.ts` (fleet), `compute/**`
(all three libs, unless the manager separately orders the Class 4 9%→6% fix),
`medical-tools.test.ts`, everything under `Property/**`, all of
`packages/web-shared/**`.

### Build order

1. `types.ts` (no deps beyond taxonomy + shared tool types) → `resources.ts`
   (needs TopicKey) → the three `configs/*.ts` (each wraps one compute lib) →
   `registry.ts` (imports the three configs) → `premium-tools.test.ts`.
2. `PremiumBarChart.tsx` → `MobileToolSlot.tsx` → `ResultGateModal.tsx` →
   `PremiumCalculator.tsx` (imports the chart + gate) → `PremiumUpgrade.tsx`
   (imports calculator + mobile slot).
3. Coordinated `BlogPostRenderer.tsx` edit LAST (imports PremiumUpgrade +
   topicForBlogSlug).
4. Registry lines for each tool are added ONLY after that tool's goldens pass.

### Regression invariants (QA + manager battery)

- **Token rule**: grep the premium tree for `var(--primary)` → must be ZERO
  matches. Every colour is navy/copper or a defined alias
  (`--gold`/`--gold-strong`/`--accent`/`--accent-strong`/`--surface`/
  `--surface-elevated`/`--ink`/`--ink-soft`/`--muted`/`--border`/`--copper`/
  `--copper-strong`).
- **No em-dashes / no `" -- "`** in any authored string (config titles, intros,
  explainers, field labels/help, notes, gate/mobile copy). The premium test file
  asserts this per config.
- **No "DJH"** anywhere in the premium tree (test asserts).
- **Events allowlist**: grep for `track("` in the premium tree → every event name
  is on the `packages/web-shared/analytics/types.ts` allowlist. No new names.
  `result_gate_skip` is a `cta_id` value, not an event.
- **Grid/storage keys**: none in R2; if any appear they are `ma:*`, never `ptp:`
  or `dfp:`.
- **`isConverted()` never gated · escape always reveals · once per session** —
  the three gate non-negotiables (Section 4) verified by reading the ported
  source at HEAD (client-only surface; a curl/chunk-grep miss is INCONCLUSIVE,
  not FAIL — evidence is source + green goldens + deploy provenance).
- **Zero maths forked**: each config `compute()` imports the exported lib fn and
  contains no arithmetic beyond formatting (`gbp`, `pct`) and output shaping.
  QA recomputes every golden by tracing the lib branch-for-branch to the penny
  with a conservation check.
- **`git diff baseline -- Property/` empty** and `packages/web-shared` unchanged
  (a wave needs zero web-shared edits; the factory already exists).
- **Class 4 flag surfaced**: QA must RE-STATE the incorporation-lib 9% Class 4
  finding (Section 2) so the manager decides whether to front-load the 9%→6% fix
  with regenerated goldens BEFORE or separately from R2. R2 itself does not fork
  the maths.

### Gate pipeline (per CRO_PARITY_TEMPLATE §3, unchanged for Medical)

`npm test --workspace Medical/web` (assert the new premium suite pass count) →
`npm run build --workspace Medical/web` (MANDATORY; tsc + vitest do NOT catch
prerender failures) → `python scripts/predeploy_gate.py --site medical` →
`python scripts/spinup_site_check.py medical` → owner sign-off → deploy with the
`VERCEL_ORG_ID` / `VERCEL_PROJECT_ID=prj_50vByZ3rqXQQwCUeENUTBbNBB41n` override
(`.vercel` lives at `Medical/.vercel`, NOT `Medical/web/`) → post-deploy battery
(exercise a mapped blog post per topic, confirm the island renders, gate opens
once, escape reveals, events flow in `web_events`). Medical FLAT routing: use
`scripts/medical_flat_link_audit.py`, never the nested link tooling.
