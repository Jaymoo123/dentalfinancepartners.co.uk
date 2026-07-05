# Dentists R2 premium in-blog calculator fleet · build brief

**Site:** Dental Finance Partners (Dentists) · www.dentalfinancepartners.co.uk · accountancy for UK dental practices (associates, principals, locums, practice buyers and sellers, NHS pensions and UDA contracts).
**Programme:** R2 (wave 2) of the estate CRO parity programme. R1 ships the server chokepoint, intent layer and in-blog mid-scroll capture (`InlineMiniLeadForm`). R2 adds premium interactive calculator islands, injected into the article's EARLY split, exactly as generalist and Solicitors do (wave 1, shipped live).
**Repo:** `C:\Users\user\Documents\Accounting`. Site root: `Dentists/web/`.
**Author:** Opus architect. **Workers:** Sonnet, following this brief verbatim. **Registry files and `BlogPostRenderer.tsx` are append-only shared-edit and must be coordinated (one entry per tool).**

This brief is the single source of truth for the Sonnet workers. Do NOT invent figures. Every number must trace either to an existing Dentists compute lib (`Dentists/web/src/lib/tools/compute/*`, executed in Node to derive the golden, never hand-traced) or to a `§N` position in `docs/dentists/house_positions.md` (HP). Where a number cannot be traced, it is flagged in Section 6 and must NOT ship until the orchestrator resolves it.

Copy discipline (LOCKED, applies to every authored string): UK English; no em-dashes (use commas, parentheses, full stops, middle dots · the middle dot `·` is fine for sub-labels); **no "DJH" anywhere** (visible copy, JSON-LD, gate, mobile slot); no pricing, no client names, anonymised social proof only; gold-standard A* bar (genuinely authoritative, never thin or scammy). The firm is NOT a named qualified expert: no "our chartered / ACA / CTA reviewer" claims anywhere. NHS-pension and incorporation copy must always pair the tax view with the pension-accrual loss (HP §2.C) so no tool reads as an incorporation sales pitch.

---

## 0. Architecture decision (read first · the Dentists site matches the Solicitors dependency-free tier)

Property's premium fleet leans on a shadcn / radix / recharts stack. The Dentists site does NOT have that stack, exactly like Solicitors. Verified 2026-07-06:

- Dentists calculators use the SHARED renderer `@accounting-network/web-shared/tools` (config-driven `GenericTool`), wired through `Dentists/web/src/components/tools/CalculatorClient.tsx`. Tools live in `src/lib/tools/{compute,configs}/` + `registry.ts`.
- Dentists has NO `src/lib/calculators/` dir and NO premium tier yet. `src/components/tools/premium/` does not exist.
- Dentists design system is CSS-variable tokens in `src/app/globals.css`: `--navy` (#001b3d), `--navy-soft`, `--navy-muted`, `--gold` (#b8975d), `--gold-strong`, `--gold-soft`, `--surface` (#fff), `--surface-elevated` (#eef1f6), `--ink` (#001b3d), `--ink-soft`, `--muted`, `--border`, and the semantic aliases `--accent` = `--gold`, `--accent-strong` = `--gold-strong`. Fonts: Plus Jakarta Sans (`--font-sans`) + Cormorant Garamond (`--font-serif`).

**TOKEN HARDENING (do not regress · Dentists-specific).** The wave-1 Solicitors premium components lean on `var(--primary)`, which Solicitors defines. **Dentists does NOT define `--primary`** (grep confirmed: `--primary:` appears in no Dentists CSS, yet a few existing shell components reference `var(--primary)`, so those refs currently resolve to nothing). During the port, every `var(--primary)` in the copied components MUST be re-skinned to a DEFINED Dentists token: use `var(--gold)` for the brand accent bar / active states / focus rings, `var(--accent)` (= gold) where a semantic accent is wanted, and `var(--navy)` for the dark brand fill (e.g. the "Free interactive tool" eyebrow chip background, on which the label text is white). Do NOT introduce `--primary` and do NOT leave any `var(--primary)` reference in a shipped premium component. Sub-labels and helper text use `var(--muted)` / `var(--ink-soft)`; surfaces use `var(--surface)` / `var(--surface-elevated)`; borders `var(--border)`. The result-gate accent border is `border-[var(--gold)]` (matches the existing Dentists `MiniCapture` default className).

**Decision: build a self-contained Dentists premium tier that mirrors the SHAPE and behaviour of the wave-1 tier but uses the Dentists navy/gold token system and adds NO new npm dependencies.** Concretely, port the Solicitors premium tier 1:1 and re-skin:

1. **Port the config vocabulary as-is** (pure TypeScript, no UI deps): `Dentists/web/src/lib/tools/premium/{types.ts,registry.ts}` modelled 1:1 on `Solicitors/web/src/lib/tools/premium/{types.ts,registry.ts}`. `PremiumToolConfig`, `PremiumResult`, `ScenarioResult`, `GridConfig`, `ChartSpec`, `ChartSeries`, `ChartResult`, `PremiumComputeContext`, `PremiumComputeFn` are copied verbatim (they import only `CalcField / CalcValues / CalcResult / CalcResultRow` from `@accounting-network/web-shared/tools/types`, plus `TopicKey` from `@/lib/intent/taxonomy`).
2. **Build a dependency-free `PremiumCalculator.tsx`** under `Dentists/web/src/components/tools/premium/` (port the Solicitors one): native `<input type="range">` sliders, native `<select>` / segmented `<button>` groups, native `<details>` / `<summary>` for "Advanced options" and "Show the workings" (no radix). Re-skin tokens per the hardening note above.
3. **`PremiumBarChart.tsx`**: port the Solicitors inline SVG / CSS grouped-bar chart (no recharts), fixed height (`h-[180px]`) so there is no CLS. Chart renders on the FULL (calculator-page) variant only, never in-blog · same as wave 1.
4. **Topic → tool bridge** `PremiumUpgrade.tsx` + `resources.ts` (the spine): `Record<TopicKey, { toolId }>` keyed by the 7 Dentists topics (`associate | principal | buying | selling | nhs | uda-calc | compliance`). `getPremiumTool(toolId)` / `hasPremiumTool(toolId)` live in `premium/registry.ts`. `PremiumUpgrade` resolves `topic → resources[topic].toolId → getPremiumTool()` and renders nothing when there is no config, so the injection wiring drops in unconditionally and lights up per authored tool.
5. **Port the result gate** `ResultGateModal.tsx` using the Dentists `MiniCapture` (which already exposes `messagePlaceholder`, `messageMinLength`, `messageMinWords`, `onSuccess` · so the Solicitors F4 prop-parity gap does NOT recur here). Section 4 pins the exact wiring.
6. **Mobile:** desktop-only tool; on mobile render a topic-aware `MobileToolSlot.tsx` wrapping `MiniCapture` (Section 3).

Everything is a client island injected into the blog article. The indexable calculator fleet, gallery, sitemap and embeds are UNTOUCHED (the premium registry is separate from `src/lib/tools/registry.ts`).

**Ground-truth note (already resolved for Dentists · no R2 blocker).** The corrected Dentists compute libs already carry FA 2026 figures: employer NIC 15% above the £5,000 secondary threshold (`NI_SECONDARY = 5000`, `EMPLOYER_NI = 0.15` in `locum-structure.ts` and `principal-extraction.ts`) and dividends 10.75% / 35.75% / 39.35% (`DIVIDEND_BASIC = 0.1075` etc.). These were corrected 2026-07-06 (the wave-2 R1 rate refresh) and TOOLS.md is synced. R2 reuses these libs unchanged; there is NO silent lib edit. The one residual currency note: `associate-take-home.ts` is labelled 2025/26 and uses 2025/26 income-tax bands (unchanged into 2026/27) with no dividend or employer-NIC exposure, so it is fine to reuse; date its outputs "2025/26 to 2026/27 basis" in copy. `uda-value.ts` hardcodes `CURRENT_YEAR = 2026` (fine for 2026).

---

## 1. Tool set (evaluation → chosen 5)

Five candidates were evaluated against: (a) maps to a high-traffic Dentists taxonomy topic; (b) REUSES an existing golden-tested compute lib; (c) genuinely decision-useful (an A* island, not filler); (d) safe (no advice overreach). All five map to a distinct topic and reuse a lib, so all five SHIP (Dentists has a richer 5-lib fleet than Solicitors' 4).

| Candidate | Topic | Reuses lib | Verdict |
|---|---|---|---|
| Associate take-home + locum-structure planner | `associate` | `associate-take-home` + `locum-structure` | **SHIP (Tool 1)** · largest blog cluster (associate-tax 32 + locum-tax 11 posts); two libs compose into "take-home then compare sole trader / Ltd / umbrella" |
| Principal profit-extraction planner | `principal` | `principal-extraction` | **SHIP (Tool 2)** · practice-accounting 27 + practice-finance 29; partnership vs Ltd with the NHS-pension trap surfaced (HP §2.C, §5) |
| Practice purchase affordability + valuation | `buying` | `practice-valuation` (+ a thin affordability helper) | **SHIP (Tool 3)** · buying-a-practice 17; valuation range + a deposit / borrowing / cover check |
| Practice sale net-of-tax (BADR) | `selling` | `practice-valuation` + NEW `practice-sale-cgt.ts` | **SHIP (Tool 4)** · goodwill-and-practice-sale 15; valuation range then BADR 18% / £1m net proceeds (HP §4). Port the Solicitors `practice-sale-cgt.ts` pattern |
| UDA / NHS contract value planner | `nhs` | `uda-value` | **SHIP (Tool 5)** · nhs-contracts 16 + nhs-pension 14; effective UDA vs benchmark + real-terms erosion |

Result: **5 premium tools**, one per high-value topic. `compliance` (vat-and-compliance 16 + general + specialist-services) stays a specialist-contact topic with no calculator, matching taxonomy (`compliance.primaryCalculator = null`). `uda-calc` in `TopicKey` is a legacy alias; blog posts route via `nhs`, so map `uda-calc → uda-nhs-planner` too (see Section 3) for defensive completeness.

Notes that apply to ALL five tools:
- `intro`, field `help`, `explainer.paragraphs`, and `note` copy authored to the A* bar and citing the relevant HP position in prose (e.g. "employer NIC is 15% above the £5,000 secondary threshold from 6 April 2025", HP §5). Do NOT print raw statute refs inside headline numbers.
- Every `note` ends with an honest limitations sentence and a "these are estimates, not advice for your practice" close.
- `PremiumResult.headline.tone` is `"good"` or `"warn"` only.
- Every tool's compute() imports the EXISTING exported pure fns; zero maths is forked. The only new maths is the thin, golden-tested `practice-sale-cgt.ts` (Tool 4) and a small `affordability` helper inline in Tool 3's config (or a tiny lib · see Tool 3).

---

### Tool 1 · Associate take-home and locum-structure planner (`associate`)

**key / slug:** `associate-take-home-planner` · **toolId:** `associate-take-home-premium` · **topic:** `associate`
**title:** "Dental associate take-home and structure planner"
**intro:** "See what you keep from your associate fees after income tax, Class 4 and Class 2 National Insurance, then compare working as a sole trader against a limited company or umbrella if you locum."

**Compute reuse / extension:** compose two existing libs, no new maths.
- `calcAssociateTakeHome(grossFees, associatePct, labPct, expenses, pensionContribution)` (from `compute/associate-take-home.ts`) for the sole-trader associate take-home (associate share, lab, profit, income tax, Class 4, Class 2, net, effective rate).
- `calcLocumStructure(dailyRate, daysPerYear, expenses)` (from `compute/locum-structure.ts`) for the sole trader / Ltd / umbrella comparison, shown in an "If you locum" advanced panel that derives a day-rate proxy from the associate inputs OR takes explicit day-rate inputs (see fields). Keep the two clearly separated: the headline is the associate take-home; the structure comparison is the secondary panel.
- The premium `compute()` wraps both.

**inputs (fields, defaults):**
| id | label | type | default | notes |
|---|---|---|---|---|
| `grossFees` | "Gross fees you generate a year" | currency | 120000 | min 0, max 500000, step 5000 |
| `associatePct` | "Your fee split (%)" | number | 50 | min 0, max 100, step 1 |
| `labPct` | "Lab fees (% of your gross)" | number | 8 | min 0, max 30, step 1 |
| `expenses` | "Other deductible expenses a year" | currency | 3000 | min 0, max 100000, step 500 |
| `pensionContribution` | "NHS Pension contribution a year" | currency | 0 | advanced; min 0, max 60000, step 500; deducted from taxable profit (practitioner arrangement) |
| `dayRate` | "Locum day rate (if you locum)" | currency | 500 | advanced; min 0, max 2000, step 25; drives the structure comparison |
| `locumDays` | "Locum days a year" | number | 220 | advanced; min 0, max 260, step 5 |

**outputs:**
- headline: "Estimated take-home" · value = `netCash` (`gbp`) · sub = "on a £X profit, effective rate Y%" · tone `good`.
- `breakdown` rows: associate share; lab deduction; taxable profit; income tax; Class 4 NIC; Class 2 NIC; total tax and NIC; net take-home; effective tax rate.
- `scenarioResults` (structure comparison, in the advanced panel): "Sole trader", "Limited company", "Umbrella" from `calcLocumStructure`, each `net` + `tax`; `best: true` on the highest `net`.
- **chart series** (grouped bar, full variant only): x-axis "Sole trader", "Limited company", "Umbrella"; series `net` ("Kept after tax", token `var(--gold)`) and `tax` ("Total tax and NIC", token `var(--navy)`).

**result-copy angle:** "Your fee split is not your take-home." Makes the wedge between gross fees and net cash visible, plus an honest structure comparison for locums. The `note` states: sole-trader associate figures only (Ltd associate not modelled in the take-home line); the NHS Pension contribution is treated as deductible (practitioner arrangement, not all associate arrangements qualify, HP §2.C); the Ltd locum route loses NHS-pension access on the dividend portion and IR35 can flip the answer on NHS engagements (HP §1.A); excludes student loans, Marriage Allowance. Date-tag "2025/26 to 2026/27 basis". No em-dashes.

---

### Tool 2 · Principal profit-extraction planner (`principal`)

**key / slug:** `principal-extraction-planner` · **toolId:** `principal-extraction-premium` · **topic:** `principal`
**title:** "Dental principal profit-extraction planner"
**intro:** "Compare taking your practice profit as a sole trader or partnership against extracting it through a limited company, after income tax, National Insurance, corporation tax and dividend tax, with the NHS Pension trade-off made explicit."

**Compute reuse / extension:** direct reuse of `calcPrincipalExtraction(profit, nhsActive, pensionContrib)` (from `compute/principal-extraction.ts`). One call returns `partnership` and `ltd` each `{ net, tax }` plus a `pensionImpact` string. No new maths.

**inputs (fields, defaults):**
| id | label | type | default | notes |
|---|---|---|---|---|
| `profit` | "Practice profit available to extract" | currency | 120000 | min 0, max 1000000, step 5000 |
| `nhsActive` | "Active NHS Pension member?" | toggle | true | drives the pension-impact flag |
| `pensionContrib` | "Employer pension contribution a year" | currency | 0 | advanced; min 0, max 60000, step 1000; deducted before tax (FA 2004 s.196, HP §5) |

**outputs:**
- headline: "Best route keeps" · value = the higher `net` of partnership vs Ltd (`gbp`) · sub = the winning-route label ("as a sole trader or partnership" / "through a limited company") · tone `good`.
- `scenarioResults` (two-column, the wave-1 pattern): column A = "Sole trader / partnership" (net, total tax); column B = "Limited company" (net, total tax, with a sub-note "assumes £12,570 director salary plus dividends, £2,500 admin, no Employment Allowance"). `best: true` on the higher `net`.
- `breakdown` rows: the take-home difference between the two routes; effective tax rate each way; the `pensionImpact` line rendered as a `warn`-toned note row when `nhsActive`.
- **chart series** (grouped bar, full variant only): x-axis "Kept after tax", "Total tax"; series `partnership` and `ltd`.

**result-copy angle:** honest, NOT an incorporation pitch (HP §5: "do NOT present incorporation as a clear tax win at typical dental profit levels in 2025/26; the 2026/27 dividend rise narrows it further"). The `note` MUST state: dividends are not NHS-pensionable, so an incorporated associate or officer-route principal loses accrual on the dividend portion, which for an NHS-active principal with 10+ years ahead can outweigh the headline tax saving (HP §2.C · this is the single most important cross-link and must appear whenever `nhsActive` is true); the company's money is not your money (dividends taxed again on extraction, already in the Ltd figure); a director's loan taken ahead of dividends triggers a s.455 charge at 35.75% on post-6-Apr-2026 loans (HP §5.A); excludes Employment Allowance, salary optimisation above threshold, and the actuarial value of the pension loss itself. No em-dashes.

---

### Tool 3 · Practice purchase affordability and valuation (`buying`)

**key / slug:** `practice-purchase-planner` · **toolId:** `practice-purchase-premium` · **topic:** `buying`
**title:** "Dental practice purchase affordability and valuation calculator"
**intro:** "Estimate an indicative value range for a practice you want to buy from its normalised EBITDA, then sense-check the deal: your deposit, the borrowing required, and whether the practice profit comfortably covers the repayments."

**Compute reuse / extension:**
- `calcPracticeValuation(ebitda, mix, region, demand, tangibleAssets)` (from `compute/practice-valuation.ts`) returns the goodwill and total value RANGE (`multipleLow/High`, `goodwillLow/High`, `totalLow/High`). Reused as-is (indicative UK dental market multiples, 2025/26).
- **New thin affordability helper** (author as a tiny pure lib `compute/practice-affordability.ts`, golden-tested, TL-03 compliant, OR inline in the config if preferred · orchestrator's call; a separate lib is cleaner and mirrors the Tool 4 CGT split). It is NOT a tax calculation, so it needs no HP rate; it is arithmetic only: given a chosen `purchasePrice` (default = mid total value), a `depositPct`, an `interestRate` and a `termYears`, it computes: `deposit`, `loanAmount`, the annual repayment (standard amortising annuity formula), and a `coverRatio` = `ebitda / annualRepayment`. Label the interest rate and term as user assumptions, not house positions.

**inputs (fields, defaults):**
| id | label | type | default | notes |
|---|---|---|---|---|
| `ebitda` | "Normalised EBITDA of the target practice" | currency | 200000 | min 0, max 2000000, step 10000 |
| `mix` | "Practice mix" | select | `mixed` | NHS-heavy / Mixed / Private-heavy |
| `region` | "Region" | select | `midlands` | London / South / Midlands / North / Wales / Northern Ireland |
| `demand` | "Buyer demand" | select | `normal` | Low / Normal / High |
| `tangibleAssets` | "Tangible assets (equipment, fit-out)" | currency | 60000 | min 0, max 1000000, step 5000 |
| `purchasePrice` | "Agreed or expected purchase price" | currency | (default = mid total value) | advanced; drives the affordability layer |
| `depositPct` | "Your deposit (%)" | number | 20 | advanced; min 0, max 100, step 5 |
| `interestRate` | "Loan interest rate (%)" | number | 8 | advanced; min 0, max 20, step 0.5; your assumption, not a house figure |
| `termYears` | "Loan term (years)" | number | 15 | advanced; min 1, max 30, step 1 |

**outputs:**
- headline: "Indicative total value" · value = mid-point of `totalLow/High` (`gbp`) · sub = "goodwill £X to £Y at Zx to Wx EBITDA" · tone `good`.
- `scenarioResults`: column A = "Low (conservative)" (goodwill low, total low), column B = "High (optimistic)" (goodwill high, total high); `best` unset (a range, not a choice).
- `breakdown` rows: goodwill range; tangible assets; total value range; purchase price used; deposit; loan amount; estimated annual repayment; **profit cover ratio** (EBITDA ÷ repayment, shown as e.g. "2.1x"), toned `warn` when cover < 1.25x.
- **chart series** (bar, full variant only): x-axis "Total value (mid)", "Annual repayment", "EBITDA"; single series `value` so the reader sees repayment sit inside EBITDA.

**result-copy angle:** "Can the practice pay for itself?" The valuation range is indicative only (HP §4: treat multiples as ranges, never a single number; corporate buyer premium not modelled); the affordability layer is a sense-check on your own assumptions, not a lending decision. The `note` states: on an asset sale the NHS contract transfers by novation with commissioner consent and some commissioners cut the value 5 to 10% at that point (HP §3), which the model does not price; goodwill amortisation relief for the buying company is 6.5% a year only on post-1-April-2019 acquisitions meeting the qualifying-IP condition (HP §4), not modelled here; interest is deductible against trade profit but loan principal is not (HP §5.B). No em-dashes.

---

### Tool 4 · Practice sale value and net-of-tax planner (`selling`)

**key / slug:** `practice-sale-planner` · **toolId:** `practice-sale-premium` · **topic:** `selling`
**title:** "Dental practice sale value and net proceeds calculator"
**intro:** "Estimate an indicative goodwill and total value for your practice from its normalised EBITDA, then see roughly what you keep after Capital Gains Tax and Business Asset Disposal Relief on a sale."

**Compute reuse / extension:**
- `calcPracticeValuation(ebitda, mix, region, demand, tangibleAssets)` (from `compute/practice-valuation.ts`) for the goodwill and total value range. Reused as-is.
- **New CGT / BADR net-proceeds layer, authored in a NEW pure lib `compute/practice-sale-cgt.ts`** (golden-tested, TL-03: no React / window / document / fetch). **Port the Solicitors `Solicitors/web/src/lib/tools/compute/practice-sale-cgt.ts` pattern verbatim in shape** (same function signature `calcPracticeSaleCgt({ gain, otherIncome, badrEligible, aeaAvailable?, badrLifetimeRemaining? })`, same AEA-then-BADR-then-standard-band stack, same result shape). Trace the constants to the DENTISTS HP:
  - **BADR 18% from 6 April 2026** and **£1,000,000 lifetime limit per individual** · Dentists HP §4 + verification log confirm both at primary source (gov.uk BADR). `BADR_RATE = 0.18`, `BADR_LIFETIME = 1_000_000`.
  - **Annual Exempt Amount £3,000** · standard 2025/26 and 2026/27 (used by the Solicitors lib against its HP §9). Dentists HP does not state the AEA figure explicitly, so **flag F1** (Section 6): confirm £3,000 against a Dentists-side source before ship; it is the estate-standard figure, low risk, but not Dentists-HP-traced in the read.
  - **Standard CGT on business-asset gains above the BADR limit: 18% within any remaining basic-rate band, 24% above**, from 30 October 2024. Same caveat as the AEA · Dentists HP §4 locks BADR precisely but does not restate the standard 18%/24% CGT rates in the excerpt read, so **flag F1** covers this too. The Solicitors lib traces these to its HP §9; use the same values and confirm before ship.
  - The layer takes a chosen chargeable `gain` (default = mid-point goodwill, editable), deducts the AEA, applies BADR 18% within the lifetime limit, then standard 18%/24% above given the seller's other income band.

**inputs (fields, defaults):**
| id | label | type | default | notes |
|---|---|---|---|---|
| `ebitda` | "Normalised EBITDA" | currency | 200000 | min 0, max 2000000, step 10000 |
| `mix` | "Practice mix" | select | `mixed` | NHS-heavy / Mixed / Private-heavy |
| `region` | "Region" | select | `midlands` | London / South / Midlands / North / Wales / Northern Ireland |
| `demand` | "Buyer demand" | select | `normal` | Low / Normal / High |
| `tangibleAssets` | "Tangible assets" | currency | 60000 | advanced; min 0 |
| `chargeableGain` | "Chargeable gain on your interest" | currency | 0 (defaults to mid goodwill when 0) | advanced; drives the CGT layer |
| `otherIncome` | "Your other taxable income this year" | currency | 50000 | advanced; sets the 18% / 24% split |
| `badrEligible` | "Business Asset Disposal Relief expected?" | toggle | true | 18% BADR within the £1,000,000 lifetime limit; requires a qualifying interest held for at least two years |

**outputs:**
- headline: "Indicative total value" · value = mid-point of `totalLow/High` (`gbp`) · sub = "goodwill £X to £Y at Zx to Wx EBITDA" · tone `good`.
- `scenarioResults`: column A = "Low", column B = "High" (goodwill and total each side); `best` unset.
- `breakdown` rows: goodwill range; tangible assets; total value range; estimated chargeable gain; less £3,000 AEA; taxable gain; BADR at 18% (when eligible); CGT at 18% (basic band) and 24% (above) when the gain exceeds the BADR limit; total CGT payable; **net proceeds after CGT**.
- **chart series** (grouped bar, full variant only): x-axis "Goodwill", "Total value", "Net after CGT"; series `low` and `high` (net-after-CGT uses the mid gain for both).

**result-copy angle:** the sale is a live rate lever (HP §4: the 6 April 2026 BADR step to 18% · an unconditional exchange on or before 5 April 2026 fixes the 14% rate even if completion follows, a conditional contract does not, HP §4.A). The `note` MUST state: BADR needs a qualifying interest held for 2 years, and for a share sale the 5% share-capital / 5% voting / officer-or-employee conditions throughout (HP §4); an earn-out is usually taxed at the standard CGT rate not the BADR rate, because the right to the future payment is a separate chargeable asset (HP §4.A); on an asset sale the NHS contract transfers by novation with commissioner consent (HP §3); s.162 incorporation relief can convert an unincorporated practice pre-sale so a later share sale reaches BADR (HP §4); the multiples are indicative 2025/26 market ranges, not a formal valuation. No em-dashes.

---

### Tool 5 · UDA and NHS contract value planner (`nhs`)

**key / slug:** `uda-nhs-planner` · **toolId:** `uda-nhs-premium` · **topic:** `nhs`
**title:** "NHS UDA contract value and real-terms planner"
**intro:** "Work out the effective value of your NHS contract per Unit of Dental Activity, see where it sits against the regional benchmark, and see how much its real value has been eroded by inflation since the contract was last signed or restructured."

**Compute reuse / extension:** direct reuse of `calcUdaValue(region, udas, contractValue, yearSigned)` (from `compute/uda-value.ts`). Returns `effectiveUda`, `yearsSinceSigned`, `cumulativeCpi`, `realValuePerUda`, `benchmarkLow/High`, `positionVsBenchmark`. No new maths.

**inputs (fields, defaults):**
| id | label | type | default | notes |
|---|---|---|---|---|
| `region` | "Region" | select | `england` | England / Wales / Northern Ireland |
| `udas` | "Annual UDA target" | number | 12000 | min 0, max 100000, step 100 |
| `contractValue` | "Annual contract value" | currency | 336000 | min 0, max 5000000, step 1000 |
| `yearSigned` | "Year the contract was last signed or restructured" | number | 2019 | min 2006, max 2026, step 1 |

**outputs:**
- headline: "Your effective UDA value" · value = `effectiveUda` (`£X.XX`) · sub = "£benchmarkLow to £benchmarkHigh regional benchmark · you are `positionVsBenchmark`" · tone `good` when within/above, `warn` when below.
- `breakdown` rows: effective UDA value; regional benchmark range; position vs benchmark; years since signed; cumulative inflation since signing (%); real value per UDA in 2026 pounds.
- **chart series** (bar, full variant only): x-axis "Your UDA value", "Real value today", "Benchmark low", "Benchmark high"; single series `value`.

**result-copy angle:** "There is no national UDA value · only your contract's." (HP §3: always say this; do NOT quote a single national rate; patient charges go towards, not on top of, the contract value.) The `note` MUST state: the benchmark ranges are indicative, actual commissioner rates vary; the 2.5% CPI proxy is deliberately conservative (real erosion has been greater in several years); the tool does not model year-end reconciliation, so deliver 96% to 100% of target and the 4% shortfall carries forward, below 96% the commissioner claws back the overpayment (HP §3.A); Scotland uses the item-of-service SDR, not UDAs, so this tool does not apply there (HP §3). No em-dashes.

---

## 2. Golden test cases per tool

New golden tests go in a NEW file `Dentists/web/src/lib/tools/premium/premium-tools.test.ts` (Vitest, run via `npx vitest run --config packages/web-shared/vitest.config.ts Dentists/web/src/lib/tools/premium/premium-tools.test.ts`). Every figure below was derived by EXECUTING the CURRENT corrected compute libs in Node (not hand-traced). Each new pure lib (`practice-sale-cgt.ts`, `practice-affordability.ts`) gets its own golden block. Any premium `compute()` that only composes existing libs is asserted at the `compute()` level against the traced sub-results. **Pin EXACT figures with a conservation check where the maths allows (net + tax = profit / gain); reject any `typeof`-only assertion.** All new tests must pass BEFORE the toolId is added to `premium/registry.ts`.

**Tool 1 · `associate-take-home-premium`** (traces to `calcAssociateTakeHome` + `calcLocumStructure`, executed 2026-07-06):
1. `grossFees=120000, associatePct=50, labPct=8, expenses=3000, pension=0` → associateShare **60000**, lab **4800**, profit **52200**, taxableProfit **52200**, incomeTax **8312**, class4 **2300.6**, class2 **179.4**, totalTax **10792**, netCash **41408**, effectiveRate ≈ **20.674%**. Conservation: `netCash + totalTax = 52200` (taxableProfit, pension 0). **Trace:** calcAssociateTakeHome executed.
2. `grossFees=200000, associatePct=45, labPct=10, expenses=5000, pension=10000` → profit **76000**, taxableProfit **66000**, incomeTax **13832**, class4 **2576.6**, class2 **179.4**, totalTax **16588**, netCash **49412**. **Trace:** executed.
3. `grossFees=300000, associatePct=50, labPct=8, expenses=8000, pension=15000` → profit **130000**, taxableProfit **115000**, incomeTax **36432**, class4 **3556.6**, totalTax **40168**, netCash **74832**, effectiveRate ≈ **30.898%** (PA taper bites, taxableProfit > 100000). **Trace:** executed.
4. Locum panel `calcLocumStructure(600, 220, 8000)` → gross **132000**, profit **124000**, soleTrader.net **77709** (tax **46291**), ltd.net **74868.32** (tax **49131.68**), umbrella.net **71346.6** (tax **60653.4**). Assert soleTrader wins; conservation soleTrader `net + tax = 124000`. **Trace:** calcLocumStructure executed.

**Tool 2 · `principal-extraction-premium`** (traces to `calcPrincipalExtraction`, executed 2026-07-06):
1. `profit=120000, nhsActive=true, pensionContrib=0` → partnership.net **76489** (tax **43511**), ltd.net **72279.37** (tax **47720.63**). Assert partnership wins (higher net); conservation partnership `net + tax = 120000`. **Trace:** executed.
2. `profit=200000, nhsActive=true, pensionContrib=40000` → partnership.net **176532.5** (tax **63467.5**), ltd.net **127823.40** (tax **72176.60**). Assert the `pensionImpact` string is the NHS-active variant. **Trace:** executed.
3. `profit=90000, nhsActive=false, pensionContrib=0` → partnership.net **63332** (tax **26668**), ltd.net **58112.25** (tax **31887.75**); `pensionImpact` = the "not a factor" variant. **Trace:** executed.

**Tool 3 · `practice-purchase-premium`** (valuation reuse + new affordability helper):
1. Valuation `calcPracticeValuation(200000, "mixed", "midlands", "normal", 60000)` → multipleLow **0.85**, multipleHigh **1.15**, goodwillLow **170000**, goodwillHigh **230000**, totalLow **230000**, totalHigh **290000**. **Trace:** calcPracticeValuation executed.
2. Valuation `calcPracticeValuation(150000, "nhs-heavy", "north", "low", 40000)` → multipleLow **0.5**, multipleHigh **0.8**, goodwillLow **75000**, goodwillHigh **120000**, totalLow **115000**, totalHigh **160000**. **Trace:** executed.
3. Valuation `calcPracticeValuation(300000, "private-heavy", "london", "high", 80000)` → multipleLow **1.25**, multipleHigh **1.65**, goodwillLow **375000**, goodwillHigh **495000**, totalLow **455000**, totalHigh **575000**. **Trace:** executed.
4. Affordability helper `calcAffordability({ purchasePrice: 260000, depositPct: 20, interestRate: 8, termYears: 15, ebitda: 200000 })` → deposit **52000**, loanAmount **208000**, annual repayment via the standard amortising annuity formula `P·r/(1−(1+r)^−n)` on a monthly basis ×12 (author the formula in the lib and pin the exact executed result to the penny in the test), coverRatio = `ebitda / annualRepayment`. **The worker computes the annuity figure by executing the helper and pins that exact value**; assert coverRatio > 1 (deal covers). Conservation: `deposit + loanAmount = purchasePrice`. **Trace:** new helper, arithmetic only (no tax rate).

**Tool 4 · `practice-sale-premium`** (valuation reuse + new CGT lib, executed 2026-07-06):
1. Valuation `calcPracticeValuation(200000, "mixed", "midlands", "normal", 60000)` → as Tool 3 case 1 (mid goodwill **200000**). **Trace:** executed.
2. **New CGT lib** `calcPracticeSaleCgt({ gain: 900000, otherIncome: 50000, badrEligible: true, aeaAvailable: 3000 })` → taxableGain **897000**; all within the £1,000,000 BADR limit → gainAtBadr **897000**, totalCgt = 897000 × 0.18 = **161460**, netProceeds **738540**. Assert to the penny. **Trace:** ported lib executed; HP §4 BADR 18% / £1m.
3. **New CGT lib** over the limit `calcPracticeSaleCgt({ gain: 1200000, otherIncome: 60000, badrEligible: true })` → taxableGain **1197000**; gainAtBadr **1000000** (£180000 CGT), gainAtHigher **197000** at 24% (£47280), totalCgt **227280**, netProceeds **972720**. **Trace:** executed.
4. **New CGT lib** no BADR, higher-rate `calcPracticeSaleCgt({ gain: 400000, otherIncome: 60000, badrEligible: false })` → taxableGain **397000**, all at 24% = **95280**, netProceeds **304720**. And basic-band-available `{ gain: 400000, otherIncome: 20000, badrEligible: false }` → gainAtBasic **30270** (at 18% = 5448.6), gainAtHigher **366730** (at 24% = 88015.2), totalCgt **93463.8**, netProceeds **306536.2**. **Trace:** executed; HP §4 standard 18%/24% (confirm per F1).
5. **New CGT lib** zero taxable `calcPracticeSaleCgt({ gain: 3000, otherIncome: 50000, badrEligible: true })` → taxableGain **0**, totalCgt **0**, netProceeds **3000** (gain equals AEA). **Trace:** executed guard.

**Tool 5 · `uda-nhs-premium`** (traces to `calcUdaValue`, executed 2026-07-06):
1. `region="england", udas=12000, contractValue=336000, yearSigned=2019` → effectiveUda **28**, yearsSinceSigned **7**, cumulativeCpi ≈ **0.18869**, realValuePerUda ≈ **23.5554**, benchmark **25 to 35**, position **within**. **Trace:** executed.
2. `region="england", udas=10000, contractValue=280000, yearSigned=2010` → effectiveUda **28**, yearsSinceSigned **16**, cumulativeCpi ≈ **0.48451**, realValuePerUda ≈ **18.8615**, position **within**. **Trace:** executed.
3. `region="wales", udas=8000, contractValue=240000, yearSigned=2020` → effectiveUda **30**, yearsSinceSigned **6**, benchmark **25 to 38**, position **within**, realValuePerUda ≈ **25.8689**. **Trace:** executed.

---

## 3. Blog island placement map (topic → tool) + MobileToolSlot

The premium island is injected in the article's EARLY split (Section 5) via `<PremiumUpgrade topic={topicForBlogSlug(categorySlug)} placement="blog" category={categorySlug} />`. It resolves to a tool only when a config exists for that topic's toolId. Mapping (topic → toolId), keyed off the Dentists taxonomy `blogCategorySlugs` (the R1 taxonomy already merges casing variants at slug level):

| Topic (`TopicKey`) | Blog category slugs that light up (from taxonomy.ts) | Premium tool (`toolId`) |
|---|---|---|
| `associate` | `associate-tax`, `locum-tax` | `associate-take-home-premium` (Tool 1) |
| `principal` | `practice-accounting`, `practice-finance`, `capital-allowances-and-equipment` | `principal-extraction-premium` (Tool 2) |
| `buying` | `buying-a-practice` | `practice-purchase-premium` (Tool 3) |
| `selling` | `goodwill-and-practice-sale` | `practice-sale-premium` (Tool 4) |
| `nhs` | `nhs-contracts`, `nhs-pension` | `uda-nhs-premium` (Tool 5) |
| `uda-calc` | (legacy alias, no blog slugs) | `uda-nhs-premium` (defensive · same as `nhs`) |
| `compliance` | `vat-and-compliance`, `general`, `specialist-services` | none in R2 (specialist-contact topic) |

So five topics get a premium island; `compliance` keeps exactly today's page. Because the wiring keys off `topicForBlogSlug(categorySlug)`, no per-post frontmatter is needed. `resources.ts` carries all 7 `TopicKey`s: the five mapped, plus `uda-calc → uda-nhs-premium`, plus `compliance → { toolId: "" }` (renders nothing).

**MobileToolSlot notes.** The interactive tool is desktop-only (chart / slider heavy, does not fit a phone). `PremiumUpgrade` renders `MobileToolSlot` in a `sm:hidden` block and the calculator in a `hidden sm:block` block. `MobileToolSlot.tsx` wraps the existing Dentists `MiniCapture` with:
- `formId="mobile_tool"`, `messagePrefix={\`[Mobile tool: ${topic}]\`}`, `role="Other"`,
- `heading` = the topic's `ctaCopy` from taxonomy (e.g. "Calculate your take-home pay as a dental associate or locum", "Optimise your profit extraction as a practice owner", "Value a dental practice before you buy", "Get a valuation estimate before you sell", "Calculate the value of your NHS UDA contract"),
- `blurb` = "Our interactive tool is built for a larger screen. Tell us your practice numbers and a specialist dental accountant will send your figure and the sensible next step, with no obligation.",
- `submitLabel="Send me my figure"`,
- token styling: `className="rounded-2xl border-l-4 border-[var(--gold)] bg-[var(--surface-elevated)] p-5 sm:p-6"`.

No new event names: `MiniCapture` already fires the form-tracking + `lead_submitted` events.

---

## 4. ResultGateModal wiring (in-blog only · three non-negotiables)

Port the wave-1 gate to `Dentists/web/src/components/tools/premium/ResultGateModal.tsx`, using the Dentists `MiniCapture` and tokens. Behaviour matches wave 1 exactly. In `PremiumCalculator`: `const gated = placement === "blog" && !isConverted();` and `const showResult = !gated || revealed;`. `PremiumCalculator` renders `{gateOpen && <ResultGateModal campaign={config.id} topicKey={topicKey} onReveal={revealFromGate} />}` with a `useCallback`-stable `revealFromGate`.

**Non-negotiable 1 · escape hatch ALWAYS reveals.** Closing the modal any way (the X button, the "No thanks, just show my result" link, the backdrop click, or the Esc key) calls `onReveal()` and reveals the figure. The result is NEVER walled off. Each dismiss fires exactly one `track("cta_click", { cta_id: "result_gate_skip", placement: "result_gate" })` (tracked manually in the shared `skip` callback so backdrop + Esc are counted; the buttons carry NO `data-cta` to avoid double-counting from autocapture). Submitting the capture also reveals (via `onSuccess={onReveal}` on `MiniCapture`) and marks the visitor converted through the lead path.

**Non-negotiable 2 · `isConverted()` visitors are NEVER gated.** Import `isConverted` from `@accounting-network/web-shared/analytics/visitMemory`. A visitor who has already converted sees the result instantly and is never shown the gate again. Only in-blog placements gate: `gated = placement === "blog" && !isConverted()`; calculator-page (`placement === "calculator"`) and embed placements never gate.

**Non-negotiable 3 · once per session.** A module-level `let gateModalShownThisSession = false` (as in the wave-1 `PremiumCalculator`) means the interstitial appears at most once per session; after it has shown once, pressing "See your result" on any later in-blog tool reveals directly.

**topicKey threaded as a PROP (wave-1 hardening · do not regress).** `PremiumUpgrade` passes `topicKey={topic}` into `PremiumCalculator`, which passes `topicKey={topicKey}` into `ResultGateModal`. The gate resolves its heading via `getTopic(topicKey)?.ctaCopy`. **NEVER re-derive the topic from the URL inside the gate** (this was fixed in wave 1 · the URL is unreliable inside a client island). `topicKey` typed `TopicKey | null`.

**Allowlisted events ONLY.** Confirmed allowlist (`packages/web-shared/analytics/types.ts`): `cta_click`, `calc_view`, `calc_input_change`, `calc_computed`, `calc_result_viewed`, `gate_view`, `resource_unlocked`, `lead_submitted`, plus the `MiniCapture` form-tracking events. Add NO new event names. `result_gate_skip` is a `cta_id` VALUE on the allowlisted `cta_click` event, not a new event. The premium tool fires `calc_view` / `calc_input_change` / `calc_computed` / `calc_result_viewed` via the shared `track()`.

**MiniCapture prop parity (no F4 here).** The Dentists `MiniCapture` (verified `src/components/forms/MiniCapture.tsx`) ALREADY exposes `messagePlaceholder`, `messageMinLength`, `messageMinWords`, and `onSuccess`. So the gate passes them directly, no `MiniCapture` edit is needed (unlike the Solicitors F4 gap). Gate `MiniCapture` props: `formId="calc_result_gate"`, `messagePrefix={\`[Result gate: ${campaign}]\`}`, `heading={topic?.ctaCopy || "Want a specialist to check your figure?"}`, `messageMinLength={40}`, `messageMinWords={8}`, `onSuccess={onReveal}`, plus the gate blurb / success text below.

**Gate copy (author to A* bar, no em-dashes):** eyebrow "Before you see your result"; heading = topic `ctaCopy`; blurb = "A calculator gives the shape of the answer. Dental practice tax, NHS pensions and practice sales are unforgiving in the detail. Tell us your situation and a specialist dental accountant will confirm your exact figure and the sensible next step, with no obligation."; submitLabel = "Get my figure confirmed"; successText = "Thanks, we will be in touch within one working day. Your result is below."; skip link = "No thanks, just show my result". The accent border on the modal card is `border-[var(--gold)]`; the backdrop is a neutral dark scrim (keep the wave-1 `bg-slate-900/60` or re-skin to `bg-[var(--navy)]/60`, both acceptable · prefer the navy scrim for brand fit). **No "DJH" in any gate string.**

**Non-gated in-blog CTA.** For non-gated in-blog readers (converted visitors who got the result instantly), keep the inline `CalcResultCta` below the result. Gated readers do NOT get the inline form (the interstitial is their capture) to avoid a redundant double-ask.

---

## 5. File manifest (Dentists/web only) + build order

All paths under `Dentists/web/`. "new" = create; "modified" = edit an existing file. **No new npm dependencies.**

**New · premium config vocabulary + spine (pure TS, client-safe):**
- `src/lib/tools/premium/types.ts` · port `Solicitors/web/src/lib/tools/premium/types.ts` verbatim (imports `CalcField / CalcValues / CalcResult / CalcResultRow` from `@accounting-network/web-shared/tools/types` and `TopicKey` from `@/lib/intent/taxonomy`).
- `src/lib/tools/premium/registry.ts` · `PREMIUM_TOOLS: Record<string, PremiumToolConfig>`, `getPremiumTool(toolId)`, `hasPremiumTool(toolId)`. One import + one entry per tool (append-only; add an entry ONLY after that tool's golden tests pass).
- `src/lib/tools/premium/resources.ts` · the topic→toolId spine: `Record<TopicKey, { toolId: string }>` over all 7 Dentists topics (Section 3 map), `resourceForTopic(topic)`.

**New · the five tool configs:**
- `src/lib/tools/premium/configs/associate-take-home.ts` (Tool 1)
- `src/lib/tools/premium/configs/principal-extraction.ts` (Tool 2)
- `src/lib/tools/premium/configs/practice-purchase.ts` (Tool 3)
- `src/lib/tools/premium/configs/practice-sale.ts` (Tool 4)
- `src/lib/tools/premium/configs/uda-nhs.ts` (Tool 5)

**New · new pure compute libs (TL-03: no React / window / document / fetch):**
- `src/lib/tools/compute/practice-sale-cgt.ts` · CGT / BADR net-proceeds layer for Tool 4 (port the Solicitors lib's shape; constants traced to Dentists HP §4 + F1 confirmation for AEA / standard-rate).
- `src/lib/tools/compute/practice-affordability.ts` · deposit / loan / annuity repayment / cover-ratio helper for Tool 3 (arithmetic only, no tax rate). (Optional: inline in the config instead · a lib is preferred for a clean golden.)
- Tools 1, 2, 5 reuse existing `compute/*` libs; no new lib beyond these two.

**New · the renderer + supporting client components (navy/gold token-styled, no radix/recharts):**
- `src/components/tools/premium/PremiumCalculator.tsx` · the dependency-free renderer (native range/select/details, "See your result" gate, analytics, two-column layout, Workings collapsible). Re-skin every `var(--primary)` → `var(--gold)` / `var(--accent)` / `var(--navy)` per the Section 0 token hardening.
- `src/components/tools/premium/PremiumBarChart.tsx` · inline SVG / CSS grouped-bar chart (no recharts), fixed height, full-variant only. Series colours use `var(--gold)` and `var(--navy)`.
- `src/components/tools/premium/PremiumUpgrade.tsx` · topic→tool bridge; `sm:hidden` MobileToolSlot + `hidden sm:block` PremiumCalculator (dynamic import, `ssr:false`, sized loading placeholder to prevent CLS); "Free interactive tool" eyebrow chip (`bg-[var(--navy)]` white text); `sr-only` heading; threads `topicKey={topic}` into `PremiumCalculator`.
- `src/components/tools/premium/MobileToolSlot.tsx` · token-styled `MiniCapture` wrapper (Section 3).
- `src/components/tools/premium/ResultGateModal.tsx` · the in-blog gate (Section 4).
- `src/components/tools/premium/MiniGrid.tsx` · ONLY if a tool declares a `grid` (none of the five do; skip).

**New · tests:**
- `src/lib/tools/premium/premium-tools.test.ts` · all Section 2 golden cases (Vitest, shared config).

**Modified · the injection point (the ONE renderer edit · coordinated append-only):**
- `src/components/blog/BlogPostRenderer.tsx` · verified current state: it splits at mid-scroll via `splitContentAtMidScroll` and injects `<InlineMiniLeadForm topic={post.category} />` before `midSplit.after` only when `midSplit.after` exists. TWO changes:
  1. Compute the topic ONCE at the top from the SLUG, not the human label: `import { topicForBlogSlug } from "@/lib/intent/taxonomy";` and `const topic = topicForBlogSlug(categorySlug);`. (The current `InlineMiniLeadForm topic={post.category}` passes the human label as a readable message tag · leave that as-is to avoid scope creep, OR correct it to the slug-derived topic in the same edit · orchestrator's call. The premium island uses the slug-derived topic regardless.)
  2. Inject the premium island in the EARLY split, mirroring wave 1: render `<PremiumUpgrade topic={topic} placement="blog" category={categorySlug} />` immediately after `midSplit.before` and BEFORE the `InlineMiniLeadForm`, so the tool lands high (early) and the R1 capture stays mid-article. **Short-post fallback:** when `midSplit.after === null` (fewer than 4 H2s), still render `<PremiumUpgrade />` ONCE after the article body, so short posts in mapped categories still get the tool. `PremiumUpgrade` renders nothing when the topic has no premium config, so non-mapped categories are unchanged. Reserve min-height on the island container (already in `PremiumUpgrade`, `minHeight: 48` on the section) to avoid CLS. Keep all server HTML / FAQs / schema / hero / author aside intact (additive only).

**NOT touched (guardrail):** `src/lib/tools/registry.ts`, the shared `Calculator.tsx`, `CalculatorClient.tsx`, the gallery / sitemap / embeds, every existing `compute/*` lib, and `src/lib/intent/taxonomy.ts` (read-only · the topic map is already correct). The premium tier is a separate, additive island system. `Property/**` is READ-ONLY (`git diff baseline -- Property/` must be empty). `packages/web-shared` is NOT edited in this wave.

**Build order:** (1) `types.ts` + empty `registry.ts` + `resources.ts`; (2) new libs `practice-sale-cgt.ts` + `practice-affordability.ts` with their golden blocks in `premium-tools.test.ts`, run tests green; (3) the five configs, adding the per-tool golden block and appending the registry entry ONE tool at a time as each tool's goldens pass; (4) the client components (`PremiumBarChart` → `PremiumCalculator` → `ResultGateModal` → `MobileToolSlot` → `PremiumUpgrade`); (5) the single `BlogPostRenderer.tsx` injection edit; (6) `npm test` then `npm run build --workspace Dentists/web` (both mandatory · vitest + tsc do NOT catch prerender failures).

**Hardening fixes from the template that must not regress (Dentists-specific call-outs):**
- ResultGate three non-negotiables (Section 4): escape always reveals with one `result_gate_skip` per dismiss; `isConverted()` never gated; once per session.
- `topicKey` threaded as a PROP end-to-end, never URL-derived.
- Allowlisted events only; no new event names.
- Grid storage key (if ever used) is `dfp:grid:*`, never `ptp:`. Storage prefix `dfp` is FROZEN.
- Compute the blog topic from the category SLUG (`topicForBlogSlug`), never the human `post.category`.
- Every `var(--primary)` re-skinned to a defined Dentists token (`--gold` / `--accent` / `--navy`); no `--primary` in any shipped premium component (Dentists does not define it).
- Wrap the existing compute libs; zero maths forked (premium `compute()` imports the exported pure fns). The only new maths is `practice-sale-cgt.ts` + `practice-affordability.ts`, each golden-tested.
- No em-dashes; no "DJH"; A* bar; no named-expert credential claims.

---

## 6. Flags (unverifiable / must-resolve before ship)

- **F1 · CGT AEA + standard-rate basis for the new `practice-sale-cgt.ts` (Tool 4).** Dentists HP §4 locks BADR precisely (18% from 6 Apr 2026, £1,000,000 lifetime limit, both primary-source verified in the HP verification log · these ARE Dentists-HP-traced). But the excerpt read does NOT restate the **Annual Exempt Amount £3,000** nor the **standard CGT 18% / 24%** business-asset rates from 30 October 2024 · the Solicitors lib traces those to its own HP §9. They are the estate-standard, cross-site-consistent figures (low risk), but confirm them against a Dentists-side source (or the shared FA / CGT ground truth) before shipping the lib. If the orchestrator prefers, restrict Tool 4's output to the BADR-eligible path (the £1m/18% figures, which ARE HP-traced) and gate the standard-rate rows behind the confirmation. The golden figures in Section 2 use AEA £3,000 and 18%/24%, matching the executed ported lib.
- **F2 · `associate-take-home.ts` year label (Tool 1).** The lib header says "UK 2025/26" and uses 2025/26 income-tax bands and Class 2 £3.45/week. Those bands are unchanged into 2026/27 and the lib has no dividend or employer-NIC exposure, so it is safe to reuse; copy dates its outputs "2025/26 to 2026/27 basis". No lib change. Flagged only so the year label is a conscious choice, not an oversight.
- **F3 · `practice-affordability.ts` interest rate and term are USER assumptions, not house positions.** The affordability layer contains no tax rate; the interest rate (default 8%) and term (default 15 years) are explicitly the reader's own assumptions and are labelled as such in the field `help` and the `note`. No HP trace is needed or claimed. Flagged so QA does not treat the default 8% as a stale house figure.

---

## 8-line summary

1. Five premium in-blog calculator islands for the Dentists site, one per high-value taxonomy topic, each reusing a CORRECTED golden-tested compute lib, injected in the article's early split like wave 1 (generalist + Solicitors).
2. Tool 1 associate take-home + locum structure (`associate`, composes `calcAssociateTakeHome` + `calcLocumStructure`); Tool 2 principal extraction (`principal`, `calcPrincipalExtraction`, NHS-pension trap surfaced, HP §2.C); Tool 3 practice purchase affordability + valuation (`buying`, `calcPracticeValuation` + a new arithmetic affordability helper); Tool 4 practice sale net-of-tax (`selling`, `calcPracticeValuation` + a NEW ported `practice-sale-cgt.ts`, BADR 18%/£1m, HP §4); Tool 5 UDA / NHS value (`nhs`, `calcUdaValue`).
3. Dentists has NO radix / recharts / shadcn stack, so the tier is the dependency-free navy/gold token port of the Solicitors premium components; every `var(--primary)` re-skinned to a DEFINED Dentists token (`--gold` / `--accent` / `--navy`), since Dentists does not define `--primary`.
4. All golden figures were derived by EXECUTING the current corrected libs in Node (employer NIC 15%/£5,000, dividends 10.75/35.75/39.35), with conservation checks; no `typeof`-only assertions; tests gate each registry entry.
5. ResultGateModal is in-blog only with the three non-negotiables (escape always reveals with one `result_gate_skip` per dismiss; `isConverted()` never gated; once per session); `topicKey` is threaded as a PROP end-to-end, never URL-derived; allowlisted events only.
6. The Dentists `MiniCapture` already exposes `messagePlaceholder` / `messageMinLength` / `messageMinWords` / `onSuccess`, so the Solicitors F4 prop-parity gap does NOT recur; no `MiniCapture` edit needed.
7. One coordinated append-only renderer edit (`BlogPostRenderer.tsx`): topic from the category SLUG, premium island in the early split before the R1 capture, short-post fallback; everything else additive; `registry.ts`, taxonomy, shared renderer, gallery, sitemap, embeds and `Property/**` untouched; storage prefix `dfp` frozen.
8. Flags: F1 confirm CGT AEA £3,000 + standard 18%/24% against a Dentists-side source (BADR 18%/£1m ARE HP-traced); F2 `associate-take-home.ts` is dated 2025/26 but the bands carry into 2026/27, reuse-as-is with a "2025/26 to 2026/27 basis" label; F3 the affordability helper's 8% rate / 15-year term are user assumptions, not house figures.
