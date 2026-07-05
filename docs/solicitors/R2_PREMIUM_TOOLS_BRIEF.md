# Solicitors R2 premium in-blog calculator fleet · build brief

**Site:** Accounts for Lawyers (Solicitors) · www.accountsforlawyers.co.uk · accountancy for UK law firms (sole practitioners, general partnerships, LLPs, incorporated firms / ABS, SRA-regulated in England and Wales).
**Programme:** R2 of the estate CRO parity programme. R1 shipped the in-blog mid-scroll capture (`InlineMiniLeadForm`). R2 adds premium interactive calculator islands, injected into the article's EARLY split, exactly as Property does.
**Repo:** `C:\Users\user\Documents\Accounting`. Site root: `Solicitors/web/`.
**Author:** Opus architect. **Workers:** Sonnet, following this brief verbatim.

This brief is the single source of truth for the Sonnet workers. Do NOT invent figures. Every number must trace either to an existing Solicitors compute lib (`Solicitors/web/src/lib/tools/compute/*`) or to a `§N` position in `docs/solicitors/house_positions.md` (HP). Where a number cannot be traced, it is flagged in this brief and must NOT ship until the orchestrator resolves it.

Copy discipline (LOCKED, applies to every string authored): UK English; no em-dashes (use commas, parentheses, full stops, middle dots); no "DJH"; no pricing, no client names, anonymised social proof only; compliance-aware tone (client-account rules are unforgiving, so tools that touch client money must be explicitly framed as operational/indicative, never as regulatory advice); gold-standard A* bar (genuinely authoritative, never thin or scammy). The firm is NOT a named qualified expert: no "our chartered/ACA/CTA reviewer" claims anywhere.

---

## 0. Architecture decision (read first · the Solicitors site differs from Property)

Property's premium fleet lives at `Property/web/src/lib/calculators/premium/` + `Property/web/src/components/calculators/premium/` and leans on a shadcn/radix/recharts stack that Property already ships. **The Solicitors site does NOT have that stack.** Verified 2026-07-05:

- Solicitors `package.json` has **no** `radix-ui`, `@radix-ui/*`, `recharts`, `lucide-react`, `class-variance-authority`, `clsx`, or `tailwind-merge`.
- Solicitors has **no** `src/lib/calculators/` dir, **no** `src/components/calculators/` dir, **no** `src/lib/resources/` dir, and **no** shadcn UI primitives (`src/components/ui/` holds only `Breadcrumb`, `CTASection`, `StickyCTA`, `layout-utils`).
- Solicitors calculators use the SHARED renderer `@accounting-network/web-shared/tools/components/Calculator.tsx` (config-driven `GenericTool`), wired through `Solicitors/web/src/components/tools/CalculatorClient.tsx`. Tools live in `src/lib/tools/{compute,configs}/` + `registry.ts`.
- Solicitors design system is **CSS-variable tokens** (`--primary`, `--accent`, `--ink`, `--ink-soft`, `--muted`, `--surface`, `--surface-elevated`, `--border`), NOT tailwind slate/emerald utility classes. `MiniCapture` and `CalcResultCta` already use these tokens.

**Decision: build a self-contained Solicitors premium tier that mirrors Property's SHAPE and behaviour but uses the Solicitors token system and adds NO new npm dependencies.** Concretely:

1. **Port the config vocabulary as-is** (types are pure TypeScript, no UI deps): create `Solicitors/web/src/lib/tools/premium/{types.ts,registry.ts}` modelled 1:1 on Property's `lib/calculators/premium/{types.ts,registry.ts}`. `PremiumToolConfig`, `PremiumResult`, `ScenarioResult`, `GridConfig`, `ChartSpec` etc. are copied verbatim (they only import `CalcField/CalcValues/CalcResult` · provide a tiny local `field-types.ts` shim if the shared `GenericTool` field type is not directly importable; reuse the shared `Field`/tool field type where possible).
2. **Build a dependency-free `PremiumCalculator.tsx`** under `Solicitors/web/src/components/tools/premium/`. Same two-column layout, same "See your result" gate, same analytics events, but:
   - inputs use native `<input type="range">` for sliders, native `<select>`/segmented `<button>` groups, and native `<details>`/`<summary>` for the "Advanced options" and "Show the workings" collapsibles (no radix);
   - the comparison chart is a **lightweight inline SVG/CSS bar chart** component (`PremiumBarChart.tsx`, ~80 lines, no recharts) rendering grouped bars from `ChartResult.data` + `ChartSpec.series`. It must be sized (fixed height, e.g. `h-[180px]`) so there is no CLS. Charts render on the full (calculator-page) variant only, same as Property;
   - all styling uses the `--*` tokens and the existing `btnPrimary` from `@/components/ui/layout-utils`.
3. **Build the topic → tool bridge** as `Solicitors/web/src/components/tools/premium/PremiumUpgrade.tsx` + a minimal `Solicitors/web/src/lib/tools/premium/resources.ts` (the spine): `Record<TopicKey, { toolId }>` keyed by the Solicitors `TopicKey` (`sra-compliance | sole-practitioner | partnership-llp | succession-sale | practice-finance | vat | incorporation`). `getPremiumTool(toolId)` and `hasPremiumTool(toolId)` live in `premium/registry.ts`. `PremiumUpgrade` resolves `topic → resources[topic].toolId → getPremiumTool()` and renders nothing when there is no config (so the injection wiring can be dropped in unconditionally and lights up per authored tool). No email-gated Excel/guide layer in R2 (that was Property Phase C; out of scope here) · the resources spine only needs to carry `toolId`.
4. **Port the result gate**: create `Solicitors/web/src/components/tools/premium/ResultGateModal.tsx` modelled on Property's `ResultGateModal.tsx` but using Solicitors `MiniCapture` (which already exists) and tokens. Section 4 below specifies the exact wiring and safety rules.
5. **Mobile:** desktop-only tool; on mobile render a topic-aware `MobileToolSlot.tsx` that wraps `MiniCapture` (Section 3).

Everything is a client island injected into the blog article and (optionally) below the existing calculator on calculator pages. The indexable calculator fleet, gallery, sitemap and embeds are UNTOUCHED (the premium registry is separate from `lib/tools/registry.ts`).

**Ground-truth rate note that gates two tools (RESOLVE BEFORE BUILD · see Section 6, flag F1).** The existing `solicitor-take-home` compute lib is pinned to **2025/26** rates and **2025/26 dividend rates (8.75% / 33.75% / 39.35%, allowance £500)**. HP §3 and the estate ground truth require **FA 2026 dividend rates from 6 Apr 2026: 10.75% / 35.75% / 39.35%**. Reusing `calcSolicitorTakeHome` unchanged keeps golden-test integrity but ships a 2025/26 dividend basis inside a 2026/27-framed premium tool. The brief's default (below) reuses the lib as-is and dates every output "2025/26 basis"; the orchestrator may instead authorise a year-aware extension. Do not silently change the lib (Phase D STOP rule + golden tests).

---

## 1. Tool set (evaluation → chosen 4, one held)

Five candidates were in scope. Each is scored on: (a) does it map to a high-traffic Solicitors taxonomy topic; (b) can it REUSE an existing compute lib; (c) is it genuinely decision-useful (an A* island, not filler); (d) is it safe (no regulatory-advice overreach).

| Candidate | Topic | Reuses lib | Verdict |
|---|---|---|---|
| Partner / LLP profit + tax planner | `partnership-llp` | `llp-profit-share` + `solicitor-take-home` | **SHIP (Tool 1)** · biggest topic, two libs compose into a genuinely new "allocate then tax each partner" flow |
| Sole-practitioner take-home + structure planner | `sole-practitioner` | `solicitor-take-home` | **SHIP (Tool 2)** · direct, high-intent, sole-trader vs LLP vs Ltd scenario comparison |
| Practice sale / exit value + net-of-CGT planner | `succession-sale` | `law-firm-valuation` (+ CGT/BADR from HP §9) | **SHIP (Tool 3)** · valuation lib exists; adds BADR/CGT net-proceeds, the real seller question |
| SRA client-account interest / reserve stress tool | `sra-compliance` | `sra-client-account-reserve` | **SHIP (Tool 4)** · largest blog cluster (4 category slugs); MUST be framed operational, not regulatory |
| Practice cash-flow / lock-up planner | `practice-finance` | none (would need a new lib) | **HOLD** · no existing lib, and `practice-finance` already has the indemnity tool; lower marginal value. Defer to a later wave to keep R2 reuse-only and shippable |

Result: **4 premium tools**, covering the four highest-value topics, each reusing an existing golden-tested compute lib. `vat` and `incorporation` topics are served indirectly (incorporation logic surfaces inside Tools 1 and 2 as the Ltd scenario; VAT stays a specialist-contact topic with no calculator, matching the existing taxonomy where `vat.primaryCalculator = null`).

Notes that apply to ALL four tools:
- `intro`, field `help`, `explainer.paragraphs`, and `note` copy must be authored to the A* bar and cite the relevant HP position in prose (e.g. "the salaried-member rules, ITTOIA 2005 ss.863A to 863G" for context; do not print raw statute refs in headline numbers).
- Every tool's `note` ends with an honest limitations sentence and a "these are estimates, not advice for your firm" close (mirrors Property).
- No em-dashes. Middle dot `·` is fine for sub-labels.
- The `PremiumResult.headline.tone` is `"good"` or `"warn"` only.

---

### Tool 1 · Partner / LLP profit and tax planner (`partnership-llp`)

**key / slug:** `llp-profit-tax-planner` · **toolId:** `llp-profit-tax-premium` · **topic:** `partnership-llp`
**title:** "LLP profit share and partner tax planner"
**intro:** "Split your firm's distributable profit across the partners, then see what each partner keeps after income tax and Class 4 National Insurance. Compare an equal split against a two-tier or points allocation."

**Compute reuse/extension:** compose two existing libs, no new tax maths.
- `calcLLPProfitShare` (from `compute/llp-profit-share.ts`) allocates `totalProfit` across seniors/juniors/fixed-share by the chosen `method`, returning `partners[]` with `share` and `percentage`.
- For EACH partner's `share`, call `calcSolicitorTakeHome({ profit: share, pensionContrib: 0 })` and read the `partnership` result (`net`, `tax`) · this is the tax-transparent partner charge (income tax + Class 4 NIC), which is exactly HP §2/§3 ("taxed on your profit share, not your drawings").
- The premium `compute()` wraps both: allocate, then map each allocation through take-home.

**inputs (fields, with defaults):**
| id | label | type | default | notes |
|---|---|---|---|---|
| `totalProfit` | "Distributable profit for the year" | currency | 800000 | min 0, max 5,000,000, step 25,000 |
| `method` | "Allocation method" | select | `two-tier` | options: Equal / Two-tier (senior 1.5x) / Points / Fixed-share plus equity |
| `seniorPartners` | "Senior (equity) partners" | number | 3 | min 0, max 40, step 1 |
| `juniorPartners` | "Junior (equity) partners" | number | 2 | min 0, max 40, step 1 |
| `seniorMultiplier` | "Senior points multiplier" | number | 1.5 | advanced; min 1, max 3, step 0.1; only used by Points |
| `fixedSharePartners` | "Fixed-share partners" | number | 0 | advanced; min 0, max 40 |
| `fixedShareEach` | "Fixed share each" | currency | 90000 | advanced; only used by Fixed-share plus equity |

**outputs:**
- headline: "Top partner keeps" · value = the highest partner's post-tax net (`gbp`) · sub = "after income tax and Class 4 NIC on a £X share" · tone `good`.
- `breakdown` rows: total profit; number of partners; total tax across all partners; total kept across all partners; effective tax rate across the firm.
- `scenarioResults` are NOT used (no two-column comparison); instead render a **per-partner grid inside `Workings`** via `result.rows` (label = partner label, value = `share` → `net`), so each partner's allocation and take-home shows. Use `PremiumResult.rows` for the per-partner list, and `breakdown` for firm totals.
- **chart series** (grouped bar, full variant only): x-axis = partner label; series `share` ("Profit share", token accent) and `net` ("Kept after tax", token primary). Cap the chart at the first 8 partners for legibility; note "showing first 8" when truncated.

**result-copy angle:** "You are taxed on your share, not your drawings." The workings make the wedge between allocated profit and take-home visible per partner, which is the single most common partner cash-flow trap (HP §2). The `note` states the LLP pays no corporation tax on trading profit, that drawings are advances against the share, and that the model excludes capital interest, pension relief and the salaried-member re-classification (point to Tool context / the FA 2014 tool). Flag qualifying-loan interest relief on capital buy-in as a real deduction not modelled here (HP §2). No em-dashes.

---

### Tool 2 · Sole-practitioner take-home and structure planner (`sole-practitioner`)

**key / slug:** `sole-practitioner-structure-planner` · **toolId:** `sole-practitioner-premium` · **topic:** `sole-practitioner`
**title:** "Solicitor take-home and structure calculator"
**intro:** "See what you keep from your practice profit as a sole practitioner or partner versus through a limited company, after income tax, National Insurance, corporation tax and dividend tax."

**Compute reuse/extension:** direct reuse of `calcSolicitorTakeHome` (from `compute/solicitor-take-home.ts`). One call returns `partnership`, `soleTrader`, `ltd` each with `{ net, tax }`. No new maths.

**inputs (fields, with defaults):**
| id | label | type | default | notes |
|---|---|---|---|---|
| `profit` | "Annual practice profit (before tax)" | currency | 120000 | min 0, max 1,000,000, step 5,000 |
| `pensionContrib` | "Pension contribution" | currency | 0 | advanced; min 0, max 60,000, step 1,000; deducted from taxable profit |

**outputs:**
- headline: "Best structure keeps" · value = the highest `net` across the three (`gbp`) · sub = the winning structure label ("as a sole trader / partner" or "through a limited company") · tone `good`.
- `scenarioResults` (two-column, the Property pattern): column A = "Sole trader / partner" (net, tax, effective rate); column B = "Limited company" (net, tax, effective rate, with a sub-note that the Ltd figure assumes minimum director salary £12,570 plus dividends, £2,500 admin, no Employment Allowance). `best: true` on whichever `net` is higher.
- `breakdown` rows: the difference in take-home between the two routes; the effective tax rate each way.
- **chart series** (grouped bar, full variant only): x-axis two groups "Kept after tax" and "Total tax"; series `soleTrader` and `ltd`.

**result-copy angle:** honest, not an incorporation sales pitch (HP §3: "do NOT present incorporation as a flat tax win at typical partner profits; the 2026/27 dividend rise narrows it"). The `note` must state: the company's money is not your money (dividends taxed again on extraction, already in the Ltd figure); an SRA-regulated firm cannot incorporate freely and must be authorised by the SRA as a recognised body (or licensed as an ABS if non-lawyer owned) (HP §1); the model excludes student loans, Marriage Allowance, salary optimisation above threshold, and Employment Allowance. Date-tag "2025/26 basis" per flag F1. No em-dashes.

---

### Tool 3 · Practice sale value and net-of-tax planner (`succession-sale`)

**key / slug:** `practice-sale-value-planner` · **toolId:** `practice-sale-premium` · **topic:** `succession-sale`
**title:** "Law firm sale value and net proceeds calculator"
**intro:** "Estimate an indicative goodwill and total value for your firm from its normalised profit, then see roughly what you keep after Capital Gains Tax and Business Asset Disposal Relief on a sale."

**Compute reuse/extension:**
- `calcLawFirmValuation` (from `compute/law-firm-valuation.ts`) returns the goodwill and total value RANGE (`goodwillLow/High`, `totalLow/High`, `multipleLow/High`) from profit + firm type + region + demand + WIP + tangibles. Reused as-is (indicative market multiples, HP §9 / TOOLS.md).
- **New CGT/BADR net-proceeds layer, authored in a NEW pure lib** `compute/practice-sale-cgt.ts` (golden-tested), tracing ONLY to HP: individuals' CGT **18% / 24%** on chargeable assets from 30 Oct 2024, annual exempt amount **£3,000** (2025/26 and 2026/27) (HP §9, verification log); **BADR 18% from 6 Apr 2026** (HP verification log: "10% to 5 Apr 2025; 14% 6 Apr 2025 to 5 Apr 2026; 18% from 6 Apr 2026", with a **£1,000,000 lifetime limit** · VERIFY the lifetime limit at source before ship, flag F2). The layer takes a chosen "gain estimate" (default = mid-point goodwill, editable), deducts the AEA, and applies BADR 18% to the qualifying gain within the lifetime limit, standard 18%/24% above, given the seller's other income band. Keep the layer conservative and clearly indicative.

**inputs (fields, with defaults):**
| id | label | type | default | notes |
|---|---|---|---|---|
| `profit` | "Normalised annual profit (EBITDA)" | currency | 400000 | min 0, max 5,000,000, step 25,000 |
| `firmType` | "Firm type" | select | `partnership-llp` | Sole practitioner / Partnership or LLP / Specialist / High-volume |
| `region` | "Region" | select | `midlands` | London / South / Midlands / North / Wales / Scotland or NI |
| `demand` | "Buyer demand" | select | `normal` | Low / Normal / High |
| `wip` | "Work in progress (WIP)" | currency | 120000 | advanced; min 0 |
| `tangibleAssets` | "Tangible assets" | currency | 40000 | advanced; min 0 |
| `chargeableGain` | "Chargeable gain on your interest" | currency | (default = mid goodwill) | advanced; drives the CGT/BADR layer |
| `otherIncome` | "Your other taxable income this year" | currency | 50000 | advanced; sets the 18%/24% split |
| `badrEligible` | "Business Asset Disposal Relief expected?" | toggle | true | applies 18% BADR within the lifetime limit |

**outputs:**
- headline: "Indicative total value" · value = mid-point of `totalLow/High` (`gbp`) · sub = "goodwill £X to £Y at Zx profit" · tone `good`.
- `scenarioResults`: column A = "Low" (goodwill low, total low), column B = "High" (goodwill high, total high); `best` unset (both are a range, not a choice · set neither `best`, or omit tiles and use breakdown only).
- `breakdown` rows: goodwill range; WIP; tangibles; total value range; estimated chargeable gain; less £3,000 AEA; CGT at BADR 18% (if eligible) / standard 18%/24%; **net proceeds after CGT**.
- **chart series** (grouped bar, full variant only): x-axis "Goodwill", "Total value", "Net after CGT"; series `low` and `high` (net-after-CGT uses the mid gain).

**result-copy angle:** WIP on sale is taxed as income (HP §4, ITTOIA 2005 ss.182 to 185) · the note must warn that unbilled WIP realised on sale is an income receipt, separate from the capital goodwill gain, so the seller's real tax is a mix. State BADR needs a qualifying interest and the two-year conditions, that a salaried/caught member may not qualify (HP §2.A cross-ref), that transferring client-account balances on a sale needs client consent (HP §5), and that the multiples are indicative 2025/26 market ranges, not a formal valuation. No em-dashes.

---

### Tool 4 · SRA client-account reserve and interest stress tool (`sra-compliance`)

**key / slug:** `sra-client-account-planner` · **toolId:** `sra-client-account-premium` · **topic:** `sra-compliance`
**title:** "SRA client account reserve and interest planner"
**intro:** "Size an indicative operational buffer for your client account from your matter mix and volume, and see whether small balances could fall inside the SRA accountant's-report exemption. This is an operational planning tool, not a regulatory requirement."

**Compute reuse/extension:** reuse `calcSraReserve` (from `compute/sra-client-account-reserve.ts`) for `peakClientMoney`, `suggestedReserve`, `lowReserve`, `highReserve`. **CRITICAL FIX REQUIRED (flag F3):** the existing lib and its golden test compute `exemptionEligible = peakClientMoney <= 10000 && avgBalance <= 250`. HP §5/§5.G is explicit and warns twice: the Rule 12.2 exemption is **average not exceeding £10,000 AND maximum not exceeding £250,000** and "do NOT use any £250 figure". The lib's `<= 250` and `peak <= 10000` framing is WRONG against house ground truth. The premium tool must NOT reproduce the `£250` figure. Two clean options, orchestrator picks:
  - (preferred) compute the exemption flag INSIDE the premium `compute()` using the correct HP test (`averageBalance <= 10000 && maxBalance <= 250000`), taking an editable "average client-account balance" and "peak/maximum balance" input, and do NOT surface the lib's `exemptionEligible` field at all; OR
  - fix the lib + its golden test to the correct HP figures under the Phase D review gate, then reuse it.
  Until F3 is resolved this tool ships with the exemption panel DISABLED (reserve sizing only). Do not print `£250`.

**inputs (fields, with defaults):**
| id | label | type | default | notes |
|---|---|---|---|---|
| `openMatters` | "Open matters holding client money" | number | 150 | min 0, max 5,000, step 10 |
| `volume` | "Typical balance per matter" | select | `moderate` | Low (~£2,500) / Moderate (~£8,000) / High (~£25,000) / Very high (~£75,000) |
| `matterType` | "Main matter type" | select | `conveyancing` | Conveyancing / Litigation / Private client / Commercial / Mixed |
| `averageBalance` | "Average client-account balance in the period" | currency | 8000 | advanced; drives the corrected Rule 12.2 test |
| `maxBalance` | "Maximum client-account balance in the period" | currency | 240000 | advanced; drives the corrected Rule 12.2 test |

**outputs:**
- headline: "Suggested operational reserve" · value = `suggestedReserve` (`gbp`) · sub = "range £low to £high on an estimated £peak of client money" · tone `warn` (it is a risk buffer).
- `breakdown` rows: estimated peak client money; matter-type risk factor applied; suggested reserve; low/high band.
- (when F3 resolved) an exemption panel row: "Accountant's report exemption (Rule 12.2)" · value = "Likely within exemption" only when `averageBalance <= 10000 && maxBalance <= 250000`, else "Report likely required" · using the CORRECT £10,000 / £250,000 figures, never £250.
- **chart series** (bar, full variant only): x-axis "Peak client money", "Suggested reserve"; single series `value`.

**result-copy angle:** compliance-aware and explicitly NON-regulatory (HP §5 practical rule: "frame as regulatory/compliance context, NOT tax; do NOT give regulatory-defence or SRA-enforcement advice"). The `note` must state: the SRA Accounts Rules do NOT mandate a firm-side reserve, this is an operational risk-sizing estimate; client money is not the firm's income; the Rule 3.3 banking-facility prohibition and the five-weekly (Rule 8.3) reconciliation are the real controls; reserve decisions belong to the firm's COFA and its accountant. If the exemption panel is shown, state the exact test (average not exceeding £10,000 AND maximum not exceeding £250,000, HP §5.G) and that a firm holding NO client money (Rule 12.1 trigger) needs no report at all. Never write £250. No em-dashes.

---

## 2. Golden test cases per tool

New golden tests go in a NEW file `Solicitors/web/src/lib/tools/premium/premium-tools.test.ts` (Vitest, same runner as `solicitors-tools.test.ts`). Cases below trace to the exact figures already pinned in `compute/solicitors-tools.test.ts` (so composition cannot drift) plus HP. Each new pure lib (`practice-sale-cgt.ts`) gets its own golden block. Any premium `compute()` that only composes existing libs is tested at the `compute()` level against the traced sub-results.

**Tool 1 · `llp-profit-tax-premium`** (allocate then tax):
1. `totalProfit=800000, method="equal", senior=3, junior=2` → `calcLLPProfitShare` gives 5 partners at £160,000 each (traced: existing test line "equal split ... share ≈ 160000"). Each £160,000 share through `calcSolicitorTakeHome({profit:160000})`: PA tapered to 0 (>£125,140), income tax + Class 4 NIC per the take-home lib. Assert per-partner `net` equals `calcSolicitorTakeHome({profit:160000,pensionContrib:0}).partnership.net`, and firm total tax = 5 × that partner tax. **Trace:** llp-profit-share equal-split golden + take-home lib.
2. `totalProfit=800000, method="two-tier", senior=3, junior=2` → senior share £184,615, junior share £123,077 (traced: existing two-tier golden). Assert top-partner `net = calcSolicitorTakeHome({profit:184615}).partnership.net`. **Trace:** two-tier golden.
3. `method="fixed-share-plus-equity", fixedSharePartners=2, fixedShareEach=85000, senior=3, junior=2, seniorMultiplier=1.6` → fixed-share partners £85,000, first senior ≈ £148,235 (traced: existing golden). Assert fixed-share partner net = take-home of £85,000. **Trace:** fixed-share golden.
4. `seniorPartners=0, juniorPartners=0` → empty allocation → headline handles zero partners gracefully (no NaN, net = £0). **Trace:** empty-partners golden.

**Tool 2 · `sole-practitioner-premium`** (direct reuse):
1. `profit=150000, pensionContrib=0` → partnership/sole net ≈ **£91,411.9** (traced verbatim from the take-home golden). Assert scenario A net ≈ 91,411.9. **Trace:** solicitor-take-home default golden.
2. `profit=150000` → Ltd net = `calcSolicitorTakeHome({profit:150000}).ltd.net` (whatever the lib returns); assert winning-structure headline picks the higher of the two. **Trace:** take-home lib.
3. `profit=60000, pensionContrib=10000` → assert pension is deducted from taxable profit before income tax (net > net-without-pension by the tax on £10,000). **Trace:** take-home lib behaviour.
4. `profit=0` → all nets £0, no NaN, headline tone still valid. **Trace:** guard.

**Tool 3 · `practice-sale-premium`** (valuation reuse + new CGT lib):
1. `profit=600000, firmType="partnership-llp", region="midlands", demand="normal", wip=180000, tangibleAssets=40000` → goodwill £600,000–£1,200,000, total £820,000–£1,420,000, multiples 1.0x–2.0x (traced verbatim from the law-firm-valuation default golden). **Trace:** valuation default golden.
2. `firmType="specialist", region="london", demand="high"` → multiples 2.05x–3.75x, goodwill low £2,050,000 at profit £1,000,000 (traced from the valuation "specialist london high" golden). **Trace:** valuation golden.
3. **New CGT lib** `calcPracticeSaleCgt({ gain: 900000, otherIncome: 50000, badrEligible: true, aeaAvailable: 3000 })` → taxable gain £897,000; BADR 18% (from 6 Apr 2026) within £1,000,000 lifetime limit → CGT = £897,000 × 0.18 = **£161,460**; net proceeds = gain − CGT. Assert to the penny. **Trace:** HP §9 AEA £3,000; HP verification log BADR 18% from 6 Apr 2026 (F2: confirm £1,000,000 lifetime limit).
4. **New CGT lib** `badrEligible: false, gain=100000, otherIncome=60000` (higher-rate) → taxable £97,000 at standard 24% (all above basic band) = **£23,280**. **Trace:** HP §9 standard 24%.

**Tool 4 · `sra-client-account-premium`** (reserve reuse + corrected exemption):
1. `openMatters=150, volume="high", matterType="conveyancing"` → peak £3,750,000, suggested reserve £93,750, low £65,625, high £140,625 (traced verbatim from the sra-reserve default golden). **Trace:** sra-reserve default golden.
2. `openMatters=50, volume="low", matterType="private-client"` → suggested reserve ≈ £625 (traced golden). **Trace:** sra-reserve golden.
3. `openMatters=20, volume="very-high", matterType="commercial"` → suggested reserve £12,000 (traced golden). **Trace:** sra-reserve golden.
4. **Corrected exemption test (F3):** `averageBalance=8000, maxBalance=240000` → within exemption TRUE (8,000 ≤ 10,000 AND 240,000 ≤ 250,000). `averageBalance=8000, maxBalance=260000` → FALSE (max exceeds £250,000). `averageBalance=12000, maxBalance=100000` → FALSE (average exceeds £10,000). Assert the tool NEVER produces or prints a `£250` threshold. **Trace:** HP §5.G (average £10,000 / maximum £250,000).

All new tests must pass before the corresponding `toolId` is added to `premium/registry.ts` (mirror Property's "gate enabled on tests passing").

---

## 3. Blog island placement map (topic → tool) + MobileToolSlot

The premium island is injected in the article's EARLY split (see Section 5 for the exact renderer change) via `<PremiumUpgrade topic={topicForBlogSlug(categorySlug)} placement="blog" category={categorySlug} />`. It resolves to a tool only when a config exists for that topic's `toolId`. Mapping (topic → toolId), keyed off the Solicitors taxonomy `blogCategorySlugs`:

| Topic (`TopicKey`) | Blog category slugs that light up (from taxonomy.ts) | Premium tool (`toolId`) |
|---|---|---|
| `partnership-llp` | `partnership-llp-accounting`, `practice-accounting` | `llp-profit-tax-premium` (Tool 1) |
| `sole-practitioner` | `sole-practitioner-tax`, `locum-solicitor-tax`, `fee-earner-tax-compensation` | `sole-practitioner-premium` (Tool 2) |
| `succession-sale` | `practice-sale-succession`, `practice-succession-sale`, `firm-acquisition-merger` | `practice-sale-premium` (Tool 3) |
| `sra-compliance` | `sra-compliance-trust-accounting`, `sra-accounts-rules`, `compliance-risk-colp-cofa`, `conveyancing-compliance` | `sra-client-account-premium` (Tool 4) |
| `practice-finance` | `practice-finance-cash-flow` | none in R2 (held candidate) |
| `vat` | `vat-compliance` | none (no calculator; specialist-contact topic) |
| `incorporation` | `structure-incorporation` | none directly; surfaced via Tool 2's Ltd scenario. Optionally map `incorporation → sole-practitioner-premium` so structure posts get the take-home comparison (RECOMMENDED: add `incorporation` to the resources spine pointing at `sole-practitioner-premium`, since taxonomy already sets `incorporation.primaryCalculator = "solicitor-take-home"`). |

So four topics (five category groups, plus optional incorporation) get a premium island; the rest keep exactly today's page. Because the wiring keys off `topicForBlogSlug(categorySlug)`, no per-post frontmatter is needed.

**MobileToolSlot notes.** The interactive tool is desktop-only (matches Property: the tool is chart/slider heavy and does not fit a phone). `PremiumUpgrade` renders `MobileToolSlot` in a `sm:hidden` block and the calculator in a `hidden sm:block` block. `MobileToolSlot.tsx` wraps the existing Solicitors `MiniCapture` with:
- `formId="mobile_tool"`, `messagePrefix="[Mobile tool: <topic>]"`, `role="Other"` (Solicitors `MiniCapture` default),
- `heading` = the topic's `ctaCopy` from taxonomy (e.g. "Calculate your LLP profit share", "Estimate your take-home as a solicitor", "Value your law firm", "Check your SRA client account reserve"),
- `blurb` = "Our interactive tool is built for a larger screen. Tell us your firm's numbers and a specialist solicitors' accountant will send your figure and the sensible next step, with no obligation.",
- `submitLabel="Send me my figure"`,
- token styling: `className="rounded-2xl border-l-4 border-[var(--primary)] bg-[var(--surface-elevated)] p-5 sm:p-6"`.

No new event names: `MiniCapture` already fires `form_start`/`form_submit`/`lead_submitted`.

---

## 4. ResultGateModal wiring (in-blog only)

Port Property's gate to `Solicitors/web/src/components/tools/premium/ResultGateModal.tsx`, using Solicitors `MiniCapture` and tokens. Behaviour must match Property exactly:

- **In-blog only.** The gate applies ONLY when `placement === "blog"`. Calculator-page islands (`placement === "calculator"`) and embeds are NEVER gated · the result shows immediately.
- **`isConverted()` is never gated.** In `PremiumCalculator`, `const gated = placement === "blog" && !isConverted();` (import `isConverted` from `@accounting-network/web-shared/analytics/visitMemory`). A visitor who has already converted sees their result instantly and is never shown the gate again.
- **Escape hatch ALWAYS reveals.** Closing the modal any way (the X button, the "No thanks, just show my result" link, the backdrop click, or the Esc key) calls `onReveal()` and reveals the figure. The result is NEVER walled off. Submitting the capture also reveals (and marks the visitor converted via the lead path, so they are not gated again).
- **Once per session.** A module-level `let gateModalShownThisSession = false` (as in Property's `PremiumCalculator`) means the interstitial appears at most once per session. After it has shown once, pressing "See your result" on any later in-blog tool reveals directly without re-popping.
- **Allowlist event names only.** The gate fires only allowlisted events (`packages/web-shared/analytics/types.ts`): the "See your result" button carries `data-cta="see_result"` (auto-captured as `cta_click`); the skip/dismiss fires `track("cta_click", { cta_id: "result_gate_skip", placement: "result_gate" })`. Do NOT introduce a new event name · `result_gate_skip` is a `cta_id` value on the allowlisted `cta_click` event, not a new event. The premium tool itself fires `calc_view` / `calc_input_change` / `calc_computed` / `calc_result_viewed` (all allowlisted) via the shared `track()`.
- **`MiniCapture` prop parity.** Property's `ResultGateModal` passes `messagePlaceholder`, `messageMinLength`, `messageMinWords`, `successText`, and `onSuccess` to its `MiniCapture`. The Solicitors `MiniCapture` (verified) does NOT expose `messagePlaceholder`/`messageMinLength`/`messageMinWords`/`onSuccess`. Two options, orchestrator picks (flag F4): (a) extend Solicitors `MiniCapture` to accept those optional props (additive, backwards-compatible, minimal-intervention), OR (b) build the gate against the current `MiniCapture` signature (fixed placeholder + its built-in 10-char message validation) and reveal via a wrapper: pass `formId="calc_result_gate"`, `messagePrefix="[Result gate: <campaign>]"`, `heading` = topic `ctaCopy`, `blurb` = the compliance-aware gate copy, and detect success by lifting `MiniCapture` state or by rendering the reveal button in the success branch. Prefer (a) for parity, but (b) is acceptable and lower-risk for R2.
- **Gate copy (author to A* bar, compliance-aware, no em-dashes):** eyebrow "Before you see your result"; heading = topic `ctaCopy`; blurb = "A calculator gives the shape of the answer. Client account rules and partner tax are unforgiving in the detail. Tell us your firm's situation and a specialist solicitors' accountant will confirm your exact figure and the sensible next step, with no obligation."; success text = "Thanks, we will be in touch within one working day. Your result is below."; skip link = "No thanks, just show my result".
- **Non-gated in-blog CTA.** For non-gated in-blog readers (converted visitors who got the result instantly), keep the inline `CalcResultCta` below the result (as Property does). Gated readers do NOT get the inline form (the interstitial is their capture) to avoid a redundant double-ask.

`PremiumCalculator` renders `{gateOpen && <ResultGateModal campaign={config.id} onReveal={revealFromGate} />}`. Use a `useCallback`-stable `revealFromGate` so the modal's focus/Esc effects are not re-run on unrelated re-renders (Property's exact pattern).

---

## 5. File manifest

All paths under `Solicitors/web/`. "new" = create; "modified" = edit an existing file. No new npm dependencies.

**New · premium config vocabulary + spine (pure TS, client-safe):**
- `src/lib/tools/premium/types.ts` · port Property `lib/calculators/premium/types.ts` (`PremiumToolConfig`, `PremiumResult`, `ScenarioResult`, `GridConfig`, `GridColumn`, `GridRow`, `ChartSpec`, `ChartSeries`, `ChartResult`, `PremiumComputeContext`, `PremiumComputeFn`). Import the field/value/result types from the shared tools types (`@accounting-network/web-shared/tools/types`) or a local shim.
- `src/lib/tools/premium/registry.ts` · `PREMIUM_TOOLS: Record<string, PremiumToolConfig>`, `getPremiumTool(toolId)`, `hasPremiumTool(toolId)`. One import + one entry per tool (append-only). Starts empty; add entries as tools pass their golden tests.
- `src/lib/tools/premium/resources.ts` · the topic→toolId spine: `Record<TopicKey, { toolId: string }>` (keyed by the 7 Solicitors topics), `resourceForTopic(topic)`. Maps `partnership-llp → llp-profit-tax-premium`, `sole-practitioner → sole-practitioner-premium`, `succession-sale → practice-sale-premium`, `sra-compliance → sra-client-account-premium`, optional `incorporation → sole-practitioner-premium`; others carry a placeholder toolId with no registered config (renders nothing).

**New · the four tool configs:**
- `src/lib/tools/premium/configs/llp-profit-tax.ts` (Tool 1)
- `src/lib/tools/premium/configs/sole-practitioner.ts` (Tool 2)
- `src/lib/tools/premium/configs/practice-sale.ts` (Tool 3)
- `src/lib/tools/premium/configs/sra-client-account.ts` (Tool 4)

**New · one new pure compute lib + its extension use:**
- `src/lib/tools/compute/practice-sale-cgt.ts` · CGT/BADR net-proceeds layer for Tool 3 (traces to HP §9 + verification log; no React/window/fetch, per TL-03).
- (Tools 1, 2, 4 reuse existing `compute/*` libs; no new lib beyond the CGT layer.)

**New · the renderer + supporting client components (token-styled, no radix/recharts):**
- `src/components/tools/premium/PremiumCalculator.tsx` · the dependency-free renderer (native range/select/details, "See your result" gate, analytics, two-column layout, Workings collapsible).
- `src/components/tools/premium/PremiumBarChart.tsx` · inline SVG/CSS grouped-bar chart (no recharts), sized, full-variant only.
- `src/components/tools/premium/PremiumUpgrade.tsx` · topic→tool bridge; `sm:hidden` MobileToolSlot + `hidden sm:block` PremiumCalculator; "Free interactive tool" eyebrow; `sr-only` heading.
- `src/components/tools/premium/MobileToolSlot.tsx` · token-styled `MiniCapture` wrapper (Section 3).
- `src/components/tools/premium/ResultGateModal.tsx` · the in-blog gate (Section 4).
- `src/components/tools/premium/MiniGrid.tsx` · ONLY if any tool declares a `grid` (none of the four do in R2, so this is optional; skip unless a later tool needs it).

**New · tests:**
- `src/lib/tools/premium/premium-tools.test.ts` · all golden cases from Section 2 (Vitest, run via `cd Solicitors/web && npx vitest run`).

**Modified · the injection point (the ONE renderer edit):**
- `src/components/blog/BlogPostRenderer.tsx` · verified current state: it injects `<InlineMiniLeadForm topic={post.category} />` at the mid-scroll split. TWO changes:
  1. Compute the topic from the SLUG, not the human label: `import { topicForBlogSlug } from "@/lib/intent/taxonomy";` and `const topic = topicForBlogSlug(categorySlug);`. (The current `InlineMiniLeadForm topic={post.category}` passes the human category label; leave that line as-is to avoid scope creep, OR correct it to the slug in the same edit · orchestrator's call. The premium island uses the slug-derived topic regardless.)
  2. Inject the premium island in the EARLY split, before the R1 mid-scroll capture, mirroring Property. Concretely, add a second, earlier split (after the 1st–2nd H2) OR render `<PremiumUpgrade topic={topic} placement="blog" category={categorySlug} />` immediately after `midSplit.before` and before `<InlineMiniLeadForm />`, so the tool lands high (early) and the R1 capture stays mid-article. `PremiumUpgrade` renders nothing when the topic has no premium config, so posts in non-mapped categories are unchanged. Reserve min-height on the island container to avoid CLS. Keep all server HTML/FAQs/schema intact (additive only).

  Recommended precise wiring (matches Property's "early split" intent): keep `splitContentAtMidScroll` for the R1 form; add the premium island right after the intro/first content block. If a short post has `<4` H2s (no mid-split), still render `<PremiumUpgrade />` once after `midSplit.before` so short posts in mapped categories still get the tool (fallback, mirrors Property's short-post note).

**Modified · only if F4 option (a) is chosen:**
- `src/components/forms/MiniCapture.tsx` · add optional `messagePlaceholder`, `messageMinLength`, `messageMinWords`, `onSuccess` props (additive, defaulted, backwards-compatible). Otherwise unchanged.

**NOT touched (guardrail):** `src/lib/tools/registry.ts`, the shared `Calculator.tsx`, `CalculatorClient.tsx`, the gallery/sitemap/embeds, and every existing `compute/*` lib except the F3 decision on `sra-client-account-reserve.ts`. The premium tier is a separate, additive island system.

---

## 6. Flags (unverifiable / must-resolve before ship)

- **F1 · dividend/year basis (Tools 1, 2).** `solicitor-take-home` compute lib is pinned to **2025/26** and **2025/26 dividend rates (8.75%/33.75%/39.35%)**. HP §3 / estate ground truth = **FA 2026 dividend 10.75%/35.75%/39.35% from 6 Apr 2026**. Brief default: reuse the lib as-is, date every output "2025/26 basis", state the 2026/27 dividend rise narrows incorporation. Orchestrator may authorise a year-aware lib extension (new golden tests, Phase D gate). NOT silently changed.
- **F2 · BADR lifetime limit + rate date (Tool 3 CGT lib).** HP verification log confirms BADR **18% from 6 Apr 2026** (10%/14%/18% schedule). The **£1,000,000 lifetime limit** is standard but is NOT explicitly stated in the HP excerpt read; confirm at primary source (gov.uk BADR) before shipping the CGT lib. CGT 18%/24% and AEA £3,000 ARE HP-traced (§9).
- **F3 · SRA exemption figure bug (Tool 4).** Existing `sra-client-account-reserve.ts` (and its golden test) use `avgBalance <= 250` / `peak <= 10000`, which contradicts HP §5.G ("average £10,000 AND maximum £250,000; do NOT use any £250 figure"). Premium tool must use the CORRECT test and never print £250; exemption panel ships DISABLED until the orchestrator either computes it in the premium layer (preferred) or fixes the lib+test under the Phase D gate. This is also a latent bug in the LIVE indexable SRA calculator worth a separate fix ticket.
- **F4 · MiniCapture prop parity (gate).** Solicitors `MiniCapture` lacks Property's `messagePlaceholder`/`messageMinLength`/`messageMinWords`/`onSuccess`. Either extend it (additive) or build the gate against the current signature. Prefer extend for parity; either is acceptable.

---

## 10-line summary

1. Four premium in-blog calculator islands for the Solicitors site, each reusing an existing golden-tested compute lib, injected in the article's early split like Property.
2. Tool 1 · LLP profit share and partner tax planner (`partnership-llp`): composes `calcLLPProfitShare` + `calcSolicitorTakeHome` to show per-partner take-home ("taxed on your share, not your drawings", HP §2).
3. Tool 2 · Sole-practitioner take-home and structure planner (`sole-practitioner`): direct reuse of `calcSolicitorTakeHome`, sole/partner vs Ltd scenario comparison (honest, not an incorporation pitch, HP §3).
4. Tool 3 · Practice sale value and net-of-tax planner (`succession-sale`): reuses `calcLawFirmValuation` plus a NEW CGT/BADR net-proceeds lib (HP §9); WIP-on-sale-as-income warning (HP §4).
5. Tool 4 · SRA client-account reserve and interest planner (`sra-compliance`): reuses `calcSraReserve`, framed explicitly operational-not-regulatory (HP §5), with a corrected Rule 12.2 exemption test.
6. Held candidate: practice cash-flow/lock-up planner (`practice-finance`) · deferred, no existing lib, keeps R2 reuse-only and shippable.
7. Solicitors has NO radix/recharts/shadcn stack, so the brief builds a dependency-free token-styled renderer (native range/select/details + inline SVG bar chart), not a port of Property's shadcn components.
8. ResultGateModal is in-blog only, never gates `isConverted()`, always reveals on any dismiss (X/link/backdrop/Esc), shows once per session, and fires only allowlisted events (`cta_click`/`calc_*`).
9. Golden tests trace to the exact figures already pinned in `solicitors-tools.test.ts` plus HP; new tests gate each tool's registry entry.
10. Flagged unverifiable/must-resolve items: **F1** take-home lib is 2025/26 dividend basis vs HP 2026/27 10.75%/35.75%; **F2** confirm BADR £1,000,000 lifetime limit at source; **F3** existing SRA lib uses a WRONG "£250" exemption figure (HP §5.G says average £10,000 / maximum £250,000) · must not be reproduced; **F4** Solicitors `MiniCapture` lacks Property's extra gate props.
