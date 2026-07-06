# digital-agency R2 premium in-blog tools brief (Agency Founder Finance, aff)

> Instantiation of `docs/_engines/CRO_PARITY_TEMPLATE.md` §2 (R2 - WS4) and §4 (R2 QA additions) for digital-agency (Wave 5, solo, after the cfp/cis twin). Model the shape on the SHIPPED Dentists premium fleet (`Dentists/web/src/lib/tools/premium/**`, `Dentists/web/src/components/tools/premium/**`) and the two freshest R2 briefs (`docs/construction-cis/R2_PREMIUM_TOOLS_BRIEF.md`, `docs/contractors-ir35/R2_PREMIUM_TOOLS_BRIEF.md`), NOT on Property emerald.
>
> aff is a CLEAN-ENGINE site like cfp: the 8 fleet compute libs in `digital-agency/web/src/lib/tools/compute/*` already export pure numeric functions (`calcSalaryDividend`, `calcBadrCgt`, `calcVatScheme`, `calcEmployerNi`, `calcRdTaxCredit`, …) AND already ship golden tests (`digital-agency/web/src/lib/tools/compute/agency-tools.test.ts`, GREEN). So there is NO extraction/characterisation pre-work (unlike cis). R2 premium wrappers COMPOSE these libs and never fork the maths. Every figure below is traced to `docs/agency/house_positions.md §N` (LOCKED 2026-07-05) and confirmed by EXECUTING the lib in Node (values shown in §2).
>
> This site is HP-LOCKED. `docs/agency/house_positions.md` is the ground truth. UK English. No em-dashes anywhere (commas, parentheses, full stops, middle dots). No DJH anywhere. No credential claims (no ICAEW / ACA / chartered / "qualified"; HP §10). Lead-gen site: no pricing, no client names, anonymised social proof, form-first contact (HP §10). Do NOT write code from this brief; it is the contract Sonnet workers build to and Opus QA judges against.

Storage prefix: **aff** (FROZEN). Grid keys (none used in R2, type parity only): `aff:grid:<toolId>`. Never `ptp:`/`dfp:`/`cfp:`/`bfp:`. Tokens: indigo `--accent: #4f46e5` + slate `--ink: #0f172a`; the site does NOT define `--gold`, `--navy` or `--dark` (those are Dentists-only). Every `var(--gold)`/`var(--navy)`/`var(--dark)` in a ported file is a defect, see §5.

---

## 0. TWO-TOOL-SYSTEMS RECONCILIATION (the audit blocker), and the clean-engine posture

The Wave 4-5 audit flags: "**12 bespoke calculator components layered over the 8-config fleet, two tool systems, reconcile before premium overlays**." Resolved definitively from the tree at branch `estate-cro-parity`:

- **System A (LIVE, the only routed surface): the 8-config fleet.** `src/lib/tools/registry.ts` imports 8 `GenericTool` configs from `src/lib/tools/configs/*`, each of whose `compute` wraps one pure lib in `src/lib/tools/compute/*`. The live calculator pages are `src/app/calculators/[slug]/page.tsx` + `src/app/calculators/page.tsx` (gallery), both deriving ENTIRELY from `allTools()`, rendered through `src/components/tools/CalculatorClient.tsx` -> shared `@accounting-network/web-shared/tools/components/Calculator`. Sitemap and nav also read the registry. This is the indexable SEO surface.
- **System B (ORPHANED, Property-template legacy, NOT a live surface): the 12 `src/components/calculators/*.tsx`** (`AgencyValuationCalculator`, `BADRCalculator`, `EmployerNICalculator`, `IncorporationCostCalculator`, `MTDCheckerCalculator`, `PensionContributionOptimiser`, `PortfolioProfitabilityCalculator`, `RDCreditEstimator`, `SalaryDividendCalculator`, `Section24Calculator`, `TakeHomePayCalculator`, `VATSchemeComparator`). VERIFIED this session: NONE of these are imported anywhere in `src` (grep across the whole tree returns only self-references); no route, gallery, sitemap, dynamic import or barrel references them. Two are self-evidently leftover Property scaffolding (`Section24Calculator` = landlord mortgage-interest relief; `PortfolioProfitabilityCalculator` = landlord portfolio, neither is agency maths). They are dead code superseded by the config fleet.

**Decision (minimal intervention):**
1. Premium tools are NEW in-blog client islands wrapping the LIVE System-A **compute libs** (`src/lib/tools/compute/*.ts`), exactly as cfp wraps `tax2026.ts` and Dentists wraps its `compute/*`. Zero maths forked.
2. The 12 orphaned `components/calculators/*.tsx` are **NOT touched in R2**: not rebuilt, not re-skinned, not deleted, not premium-wrapped. They carry no live SEO and no premium relevance. (Their deletion is a separate cleanup workstream with its own audit; do not bundle it here. R2 is append-only.)
3. The premium registry pattern slots ALONGSIDE the fleet: a SEPARATE `src/lib/tools/premium/registry.ts` (never merged into the fleet `registry.ts`), so the indexable calculator pages, gallery, sitemap and embeds are untouched. Premium tools surface only as additive blog islands.

**Clean-engine consequence.** Because the 8 `compute/*` libs are pure numeric primitives with green goldens, there is NO task-1 extraction (the cis pre-work does not apply here). The premium `compute()` imports the exported functions directly. QA proves premium result === fleet lib output at the same inputs.

**Flags for the manager (do NOT silently "fix" in an R2 worker; none blocks the R2 build):**
1. **Credential claims in the LIVE config fleet + gallery.** `configs/salary-dividend-optimiser.ts` metaDescription says "Built by ICAEW accountants"; `app/calculators/page.tsx` says "built by ICAEW qualified accountants". These breach HP §10 (no credential claims) and are the same class as the ~30 blog pages in HP §9 item 8. They live in R1/content territory, not R2 premium. R2 premium configs I author here MUST be credential-free. Flagged for the content/source sweep.
2. **Fleet config "2025/26" mislabels.** The fleet configs title "2025/26" while using FA 2026 (2026/27) dividend rates. R2 premium configs MUST tag rates correctly (see §1). Do not copy the fleet's mislabel.
3. **Live BADR content defect** (`content/blog/selling-agency-tax-implications.md:143` "10% to 18% on 6 April 2025"; HP §9 item 1). This is an R1 content fix ("fix in the first content-touching commit"), not R2. R2's exit tool copy uses the CORRECT date-band schedule (14% to 5 Apr 2026, 18% from 6 Apr 2026).

---

## 1. THE PREMIUM TOOL FLEET (5 tools + 1 excluded topic)

Five tools, each mapped to one shipped R1 TopicKey (verified against `src/lib/intent/taxonomy.ts`: keys are `international`, `pay-planning`, `rnd`, `exit`, `compliance-vat`, `structure`). Each composes a `compute/*` lib. The spine is EXHAUSTIVE over all 6 TopicKeys (`international` carries an empty toolId, excluded with a stated reason below).

Blog-category -> topic coverage (from `taxonomy.ts` `blogCategorySlugs`): `international-agencies`->international; `salary-and-dividends`->pay-planning; `growth-and-exit`->exit; `tax-and-compliance`+`making-tax-digital`->compliance-vat; `incorporation-and-structure`+`agency-finance-essentials`+`agency-accountant-services`+`contractors-and-ir35`->structure. **`rnd` has `blogCategorySlugs: []`** (no blog category maps to it; R&D content sits inside `tax-and-compliance`). Consequence: the R&D tool (Tool 5) will NOT surface via the R2 blog island; it is built for spine completeness, the CORRECTED-rate golden, and R3 (calculator-page resources on `rd-tax-credit-estimator`, which maps to `rnd`). Do NOT retrofit R1's shipped taxonomy in R2 to force it in-blog (that moves URLs, the S-1 category-fallout risk).

### Tool 1 (FLAGSHIP) - Salary and dividend optimiser
- **key / slug (toolId):** `salary-dividend-optimiser-premium`
- **topic mapping:** `pay-planning` (primary). Blog category `salary-and-dividends` (17 posts); fleet `primaryCalculator` = `salary-dividend-optimiser`. The universal agency-founder question: how do I take money out of my company most efficiently.
- **compute reuse:** wraps `calcSalaryDividend({ profitBeforeDirector, useEmploymentAllowance })` from `compute/salary-dividend.ts` (dividend 10.75/35.75/39.35 FA 2026, employer NI 15%/£5,000, EA £10,500, CT 19/25 with 26.5% marginal, HP §2/§3). NO forked maths. The premium layer adds only presentation and the EA single-director framing.
- **inputs + defaults:** `profitBeforeDirector` currency 120000 (min 0, max 500000, step 1000); `useEmploymentAllowance` toggle **default false** (help: "The Employment Allowance is not available to a company whose only employee is a single director. Most solo founder-director agencies cannot claim it, HP §2. Switch on only if you employ someone other than a single director."). NOTE the fleet config defaults this true; the premium tool defaults **false** because the honest common agency case is a single-director company (HP §2, the load-bearing caveat). The golden pins both branches.
- **outputs:** headline `Optimal net cash` = `fmt(optimal.netCash)`, tone good, sub `Salary <optimal.salary> + Dividend <optimal.dividend>`. Breakdown rows (all `fmt`-rounded whole pounds): optimal salary, dividend, employer NI, corporation tax, employee NI, income tax, dividend tax, total tax (strong), net cash vs salary-only, net cash vs dividend-only. Note MUST state 2026/27 basis (dividends 10.75/35.75/39.35 + £500 allowance, FA 2026, HP §3; employer NIC 15% above £5,000 from 6 Apr 2025, HP §2; CT 19/25 marginal ~26.5%; PA £12,570), the single-director EA exclusion (HP §2), and that there is no single universal optimal salary (HP §2, "always state the EA assumption").
- **chart:** groupedBar, valueFormat currency, three data groups (Optimal split, Salary only, Dividend only), two series: `Net cash` (`var(--accent)` indigo) and `Total tax` (`var(--ink)` slate). Full (calculator-page) variant only; blog stays compact.
- **result-copy angle:** "Salary and dividends are taxed very differently, and the 2026/27 dividend rates rose again. Here is the most efficient split for your profit, and what you keep after every tax. The right salary depends on whether your company can claim the Employment Allowance, so treat this as your starting point, not a fixed answer." Never publish a one-size-fits-all optimal salary.

### Tool 2 - Agency exit CGT and Business Asset Disposal Relief calculator
- **key / slug (toolId):** `agency-exit-cgt-premium`
- **topic mapping:** `exit` (primary). Blog category `growth-and-exit` (25 posts); fleet `primaryCalculator` = `badr-cgt-calculator`. The core exit question: what CGT do I pay when I sell the agency, and how much does BADR save.
- **compute reuse:** wraps `calcBadrCgt({ saleProceeds, originalCost, previousBadrUsed, year, meetsEligibility })` from `compute/badr-cgt.ts` (BADR 14% for 2025/26, 18% for 2026/27; standard CGT higher 24%; £1,000,000 lifetime limit; HP §5). Models BOTH the eligible and standard-CGT positions at the same gain (two `calcBadrCgt` calls, `meetsEligibility` true and false) so the reader sees the BADR saving. NO forked maths.
- **inputs + defaults:** `saleProceeds` currency 750000; `originalCost` currency 50000; `year` select `2025/26`|`2026/27` default `2026/27` (help: "BADR is 14% for disposals to 5 April 2026 and 18% from 6 April 2026, HP §5"); `previousBadrUsed` currency 0 advanced (help: "BADR has a £1,000,000 lifetime limit per person, HP §5").
- **outputs:** headline `Estimated CGT with BADR` = `fmt(eligible.totalTax)`, tone default, sub `Net proceeds <fmt(eligible.netProceeds)> after CGT`. Two `scenarioResults` tiles: `With BADR` (net `fmt(eligible.netProceeds)`, best) and `Standard CGT (if you do not qualify)` (net `fmt(notEligible.netProceeds)`). Breakdown: gain, BADR-eligible slice, BADR at 14%/18% (with the year and date-band), any slice above the lifetime limit at 24%, effective rate, net proceeds (strong). Note MUST state the BADR schedule with its EXACT date band (14% to 5 Apr 2026, 18% from 6 Apr 2026, HP §5), the £1,000,000 lifetime limit, the 2-year qualifying conditions for a share sale (5% ordinary share capital + 5% voting + officer or employee throughout, HP §5), that an earn-out is usually taxed at the standard CGT rate not the BADR rate (the *Marren v Ingles* right-to-future-payment point, HP §5), and MUST NOT reproduce the "10% to 18%" defect (HP §9 item 1). Add the hedged relocation line (UK-primary only, NO UAE figures): "If you plan to sell after leaving the UK, BADR is not available while you are non-resident and the temporary non-residence rule can pull a non-resident disposal back into UK CGT on your return; take specialist advice before relocating (HP §8.A)."
- **chart:** groupedBar, currency, two groups (With BADR, Standard CGT), two series: `Net proceeds` (`var(--accent)`) and `CGT` (`var(--ink)`). Full variant only.
- **result-copy angle:** "On an agency share sale, Business Asset Disposal Relief can cut the CGT on the first £1,000,000 of qualifying gain, but the rate stepped up to 18% from 6 April 2026 and the conditions are strict. Here is your bill with and without it, and what you keep." Never imply BADR is automatic.

### Tool 3 - VAT scheme comparator (standard vs flat rate)
- **key / slug (toolId):** `vat-scheme-comparator-premium`
- **topic mapping:** `compliance-vat` (primary). Blog categories `tax-and-compliance` (61) + `making-tax-digital` (17); fleet `primaryCalculator` = `vat-scheme-comparator`. The load-bearing agency VAT position (HP §6): most agencies are limited-cost traders, so the flat rate is the punitive 16.5% and usually a bad deal.
- **compute reuse:** wraps `calcVatScheme({ turnover, vatInputs, goodsSpend })` from `compute/vat-scheme.ts` (standard 20%, FRS marketing 12.5%, limited-cost-trader 16.5%, 2%/£1,000 goods test, HP §6). NO forked maths.
- **inputs + defaults:** `turnover` currency 180000 (ex-VAT annual turnover); `vatInputs` currency 8000 (help: "Input VAT you could reclaim on the standard scheme"); `goodsSpend` currency 500 (help: "Annual spend on goods, not services. The limited-cost-trader test is goods under 2% of VAT-inclusive turnover or under £1,000 a year, HP §6").
- **outputs:** headline `Better VAT scheme` = `bestScheme` string, tone default, sub the annual difference `fmt(saving)`. Two `scenarioResults` tiles: `Standard scheme` (VAT to pay `fmt(standardNet)`) and `Flat Rate scheme` (VAT to pay `fmt(flatPayment)`), best on the LOWER payment. Breakdown: VAT collected, input VAT reclaimed (standard), standard net, flat rate applied (16.5% limited-cost trader or 12.5%), flat payment, best scheme, annual difference (strong). Note MUST state registration £90,000 / deregistration £88,000 (HP §6), that most agencies are limited-cost traders so the flat rate is 16.5% and usually worse than standard after reclaiming input VAT (HP §6), the 1% first-year discount, MTD for VAT since April 2022, and the overseas/UAE B2B reverse-charge principle as a place-of-supply CHECK not a fixed outcome (OPEN-ITEM, HP §6).
- **chart:** groupedBar, currency, two groups (Standard, Flat Rate), one series `VAT to pay` (`var(--ink)`). Full variant only.
- **result-copy angle:** "The Flat Rate Scheme sounds simpler, but almost every agency is a limited-cost trader, which forces the 16.5% rate on your gross takings. Here is what each scheme actually costs you on your numbers." Balanced, never "always use the flat rate".

### Tool 4 - Employer NIC and cost-of-employment calculator
- **key / slug (toolId):** `employer-cost-to-hire-premium`
- **topic mapping:** `structure` (primary). Blog categories `incorporation-and-structure` (15) + `agency-finance-essentials` (25) + `agency-accountant-services` (13) + `contractors-and-ir35` (19); fleet `primaryCalculator` = `take-home-pay-calculator`. Chosen over take-home-pay (a PAYE-employee calc, least founder-relevant) because employer cost-to-hire is the real structure/scaling money question AND it uniquely surfaces the load-bearing HP §2 Employment Allowance single-director exclusion.
- **compute reuse:** wraps `calcEmployerNi({ employees, useEmploymentAllowance, includePension })` from `compute/employer-ni.ts` (employer NI 15% above £5,000, EA £10,500 applied ONLY where `employees.length >= 2`, single-director restriction enforced, auto-enrolment employer minimum 3% above £6,240, HP §2). NO forked maths. **Input-shaping (NOT a fork, documented for QA):** the tool models the founder-director plus one first hire via two scalar fields and constructs the `employees` array in `compute()`: `[{ salary: directorSalary }, { salary: firstHireSalary }]` when `firstHireSalary > 0`, else `[{ salary: directorSalary }]`. This is why EA correctly becomes available on a genuine first hire (`length >= 2`) and correctly fires `eaEligibleWarning` for a solo director (`length === 1`). The maths (`calcEmployerNi`) is called unchanged; only the input array is assembled.
- **inputs + defaults:** `directorSalary` currency 12570 (help: "Your own salary as director"); `firstHireSalary` currency 40000 (help: "The salary of your first employee. Set to 0 to model a solo director with no employees"); `claimEmploymentAllowance` toggle true (help: "The £10,500 Employment Allowance is only available once you employ someone other than a single director, HP §2"); `includePension` toggle true (help: "Auto-enrolment employer minimum 3% on qualifying earnings above £6,240").
- **outputs:** headline `Total annual employment cost` = `fmt(totalEmploymentCost)`, tone default, sub `Employer NI <fmt(niAfterEA)> after Employment Allowance`. When `eaEligibleWarning` is true, add a warn-toned line: the company has only a single director on the payroll, so the Employment Allowance is not available (HP §2). Breakdown: director salary, first hire salary, gross salary total, employer NI before EA, Employment Allowance applied (negative), employer NI after EA, auto-enrolment pension, total employment cost (strong), monthly cost. Note MUST state employer NIC 15% above the £5,000 secondary threshold from 6 April 2025 (HP §2, never 13.8%/£9,100), the EA £10,500 with the single-director exclusion (HP §2), and that a spouse or first-hire salary must be genuine and market-rate (HP §2).
- **chart:** none (a single cost figure with a breakdown; omit the `chart` spec, mirroring cfp's corporation-tax tool). PremiumCalculator renders headline + breakdown only.
- **result-copy angle:** "Your first employee costs more than their salary: employer National Insurance at 15% and the auto-enrolment pension on top. But hiring someone other than a single director unlocks the £10,500 Employment Allowance, which can wipe out that NIC. Here is the true cost, and whether you can claim it." Surface the single-director trap plainly.

### Tool 5 - R&D tax relief estimator (merged scheme + ERIS, CORRECTED rates)
- **key / slug (toolId):** `rd-tax-credit-premium`
- **topic mapping:** `rnd` (primary). NOTE `rnd` has no blog category, so this tool does NOT surface via the R2 blog island (see §1 note); it is built for the spine, the CORRECTED-rate golden, and R3 calculator-page resources on `rd-tax-credit-estimator`. Fleet `primaryCalculator` = `rd-tax-credit-estimator`.
- **compute reuse:** wraps `calcRdTaxCredit({ totalExpenditure, staffCost, subcontractorCost, consumablesCost, softwareCost })` from `compute/rd-tax-credit.ts`, the CORRECTED lib (merged RDEC 20% -> ~15% net at 25% CT; ERIS intensity threshold **30%** (not the stale 40%), 86% enhanced deduction, 14.5% payable credit, ~26.97p/GBP; subcontractor 65% haircut; HP §4). NO forked maths.
- **inputs + defaults:** `totalExpenditure` currency 800000 (help: "Total expenditure in the period, used for the R&D-intensity ratio"); `staffCost` currency 120000; `subcontractorCost` currency 40000 (help: "65% of qualifying subcontractor cost is claimable"); `consumablesCost` currency 15000; `softwareCost` currency 25000.
- **outputs:** headline `Estimated R&D benefit` = `fmt(netBenefit)`, tone default, sub the scheme applied (merged RDEC 20% credit, or ERIS for a loss-making R&D-intensive SME). Breakdown: qualifying spend, R&D intensity ratio, whether ERIS applies (>= 30% intensity), credit rate, gross credit, net benefit (strong). Note MUST LEAD WITH the eligibility-honesty boundary (HP §4): most agency projects do NOT qualify; qualifying R&D must seek an advance in science or technology through genuine technical uncertainty; routine web development on existing frameworks, creative or routine design, off-the-shelf implementation and marketing campaigns are excluded; HMRC is actively auditing claims with penalties up to 100%. State the merged scheme applies to periods beginning on or after 1 April 2024, ERIS threshold 30% / 86% / 14.5%, and the overseas-subcontractor restriction. This tool is illustrative, never an encouragement to over-claim.
- **chart:** none (single figure + breakdown; omit the `chart` spec).
- **result-copy angle:** "Most agency work does not qualify for R&D relief, and HMRC is auditing claims hard. If you have a genuine technical advance, here is a rough benefit under the merged scheme, or under ERIS if you are a loss-making R&D-intensive SME. Treat this as a first sense-check, not a green light to claim."

### Excluded topic - `international` (UAE / relocation): NO premium tool, stated reason
- **spine entry:** `international -> { toolId: "" }`. `PremiumUpgrade` renders null for it, so `international-agencies` posts (114, the largest category) get no premium island (they keep the R1 InlineMiniLeadForm + NextStepOffer + ExitIntentModal).
- **reason (binding, HP §8 + §10):** the international topic is the UAE/relocation cluster. HP §8 locks ONLY the UK-side positions (temporary non-residence, no automatic UK exit charge, BADR unavailable while non-resident, PE risk principle); ALL UAE-jurisdiction figures (0%/9%, AED 375,000, SBR, QFZP, Golden Visa) are content-derived, unverified, and carry 6 OPEN-ITEMs, with HP §10 mandating a "get UAE specialist advice" hedge and forbidding presenting UAE figures as this firm's own guidance. There is no UK-primary-verified relocation compute lib. A relocation "tax saving" calculator would require firm UAE figures we cannot stand behind and would breach HP §8/§10. The UK-side non-residence caveat is instead carried in Tool 2's note (hedged, no UAE numbers). Do NOT build an `international` premium tool in R2.

### Topic-to-tool spine (`src/lib/tools/premium/resources.ts`, final; R3 will golden against this)
```
pay-planning   -> salary-dividend-optimiser-premium
exit           -> agency-exit-cgt-premium
compliance-vat -> vat-scheme-comparator-premium
structure      -> employer-cost-to-hire-premium
rnd            -> rd-tax-credit-premium
international   -> ""            (excluded; UAE/relocation hedge, HP §8 + §10)
```
`resourceForTopic(topic)` returns the `{ toolId }` for a mapped topic and null for null/undefined. `hasPremiumTool(toolId)` is false for `""`.

---

## 2. GOLDEN TESTS (premium, derived by EXECUTING the libs in Node)

New file `digital-agency/web/src/lib/tools/premium/premium-tools.test.ts`, modelled on `Dentists/web/src/lib/tools/premium/premium-tools.test.ts`. Every figure below was derived by running the actual `compute/*` lib in Node (`npx tsx`) at the stated default inputs; re-execute to confirm to the penny before pinning. No `typeof`-only assertions. Because premium configs wrap the fleet libs directly, the goldens double as proof that the premium result equals the fleet lib output. `fmt(n) = "£" + Math.round(n).toLocaleString("en-GB")`.

- **Tool 1 (salary-dividend), default** (profitBeforeDirector 120000, useEmploymentAllowance FALSE): `optimal.salary` **12570**, `optimal.dividend` **81876.46**, `optimal.employerNi` **1135.5**, `optimal.corporationTax` **24418.04**, `optimal.employeeNi` **0**, `optimal.incomeTax` **0**, `optimal.dividendTax` **19667.08**, `optimal.totalTax` **45220.63**, `optimal.netCash` **74779.37 -> headline "£74,779"**; `optimalVsSalaryOnly` **2395.56 -> "£2,396"**, `optimalVsDividendOnly` **1603.97 -> "£1,604"**; `salaryOnly.netCash` 72383.82, `dividendOnly.netCash` 73175.4. **EA=TRUE branch** (same profit): `optimal.salary` **60000**, `optimal.dividend` **47850**, `optimal.netCash` **76279.78 -> "£76,280"** (EA covers the employer NI so the optimiser lifts salary to the £60,000 loop cap). Pin both branches. Conservation: `optimal.netCash == optimal.salary - optimal.employeeNi - optimal.incomeTax + optimal.dividend - optimal.dividendTax`.
- **Tool 2 (exit CGT/BADR), default** (saleProceeds 750000, originalCost 50000, previousBadrUsed 0, year 2026/27): `gain` **700000**, `eligibleForBadr` **700000**, `badrTax` **126000**, `standardTax` **0**, eligible `totalTax` **126000 -> "£126,000"**, eligible `netProceeds` **624000 -> "£624,000"**, `effectiveRate` **0.18**. Standard-CGT scenario (meetsEligibility false, same inputs): `totalTax` **168000 -> "£168,000"**, `netProceeds` **582000**. Assert `best` on the With-BADR tile (624000 > 582000). **Year 2025/26 case:** `badrTax` **98000 -> "£98,000"**, `netProceeds` 652000, `effectiveRate` 0.14 (proves the date-band rate switch). **Over-limit case** (saleProceeds 1500000, cost 0, 2026/27, eligible): `eligibleForBadr` 1000000, `notEligible` 500000, `badrTax` **180000**, `standardTax` **120000**, `totalTax` **300000** (proves the £1,000,000 lifetime cap + 24% overflow).
- **Tool 3 (VAT), default** (turnover 180000, vatInputs 8000, goodsSpend 500): `vatCollected` **36000**, `grossInclusive` **216000**, `standardNet` **28000**, `lctApplies` **true**, `flatRate` **0.165**, `flatPayment` **35640**, `flatKeep` 360, `bestScheme` **"Standard"**, `saving` **7640 -> "£7,640"**. **High-goods case** (turnover 180000, vatInputs 3000, goodsSpend 10000): `lctApplies` **false**, `flatRate` **0.125**, `flatPayment` **27000**, `bestScheme` **"Flat Rate"** (exercises the non-LCT branch). Assert the LCT rate is 16.5% at default (a rate-mix regression a `typeof` test would miss).
- **Tool 4 (employer cost-to-hire), default** (directorSalary 12570, firstHireSalary 40000, claimEmploymentAllowance true, includePension true -> employees `[{12570},{40000}]`): `grossSalaryTotal` **52570**, `niTotal` **6385.5**, `eaApplied` **6385.5**, `niAfterEA` **0**, `pensionTotal` **1202.7**, `totalEmploymentCost` **53772.7 -> "£53,773"**, `monthlyTotal` **4481.06 -> "£4,481"**, `eaEligibleWarning` **false**. **Single-director case** (firstHireSalary 0 -> employees `[{12570}]`, EA on): `niTotal` **1135.5**, `eaApplied` **0**, `niAfterEA` **1135.5**, `pensionTotal` 189.9, `totalEmploymentCost` **13895.4 -> "£13,895"**, `eaEligibleWarning` **true** (the HP §2 single-director trap; this is the case the tool must warn on). **EA-off case** (default employees, EA off): `eaApplied` **0**, `niAfterEA` **6385.5**, `totalEmploymentCost` **60158.2 -> "£60,158"**. Conservation: `totalEmploymentCost == grossSalaryTotal + niAfterEA + pensionTotal`.
- **Tool 5 (R&D, CORRECTED), default** (totalExpenditure 800000, staffCost 120000, subcontractorCost 40000, consumablesCost 15000, softwareCost 25000): `qualifying` **186000** (`120000 + 40000*0.65 + 15000 + 25000`), `intensityRatio` **0.2325**, `isIntensive` **false**, `usedEris` **false**, `creditRate` **0.20**, `grossCredit` **37200 -> "£37,200"**, `netBenefit` **27900 -> "£27,900"** (`37200 * 0.75`). **ERIS case** (totalExpenditure 200000, staffCost 90000, rest 0): `intensityRatio` **0.45**, `isIntensive` **true**, `usedEris` **true**, `creditRate` **0.2697**, `grossCredit` **24273 -> "£24,273"**, `netBenefit` **24273** (`90000 * 1.86 * 0.145`). **Boundary cases:** intensity exactly 0.30 -> ERIS true; 0.299 -> ERIS false, creditRate 0.20 (proves the CORRECTED 30% threshold, not the stale 40%; mirrors `agency-tools.test.ts`).
- **Config-compute goldens:** assert `<config>.compute({ values: defaults, rows: [], scenario: "" }).headline.value` string + tone for each tool, and that no breakdown/scenario row `value` contains `"NaN"` (NaN-safe `Number(v.x) || 0`, mirrors the fleet configs and the Dentists premium configs).
- **Compliance goldens (copy the Dentists pattern, blocking):** no em-dash (U+2014, or the double-hyphen substitute) in any title/intro/explainer/field label/help/note/scenario-label across all 5 configs; the string `"DJH"` appears nowhere; no credential claim substring (`ICAEW`, `ACA`, `chartered`, `qualified accountant`) in any premium config string (HP §10); every emitted event name is on the `packages/web-shared/analytics/types.ts` allowlist.
- **Registry + spine goldens:** `hasPremiumTool` true for the 5 toolIds and false for unknown; `resourceForTopic` maps every TopicKey and returns null for null/undefined; `international` resolves to the empty toolId (so `hasPremiumTool("")` is false and the island stays dark for that topic).

Run: `npx vitest run --config packages/web-shared/vitest.config.ts digital-agency/web/src/lib/tools/premium/premium-tools.test.ts` and the existing `digital-agency/web/src/lib/tools/compute/agency-tools.test.ts` (must stay GREEN; R2 touches none of the compute libs). Grep the raw output for `failed|npm error` and confirm the exact pass count; never trust an "OK" marker (lesson §5.1).

---

## 3. BLOG ISLAND PLACEMENT MAP (nested routing)

digital-agency uses NESTED blog routing (`/blog/[category]/[slug]`), so the topic is derived from the category SLUG. The R1 `BlogPostRenderer.tsx` ALREADY computes it: `const topicKey = topicForBlogSlug(categorySlug)` at line 57 (using the SLUG, never the human `post.category`). Wire in `digital-agency/web/src/components/blog/BlogPostRenderer.tsx`:

- Import `PremiumUpgrade` from `@/components/tools/premium/PremiumUpgrade`.
- The R1 renderer mounts `<InlineMiniLeadForm topic={topicKey ?? undefined} />` UNCONDITIONALLY at the mid-split (line 222, between the `before` and the `after ? ... : null` halves). Inject `<PremiumUpgrade topic={topicKey} placement="blog" category={categorySlug} />` IMMEDIATELY AFTER that `InlineMiniLeadForm`. Because the mid island is rendered regardless of whether `after` is null, **a single injection point covers both long and short posts** (this renderer needs NO separate short-post fallback branch, unlike the Dentists renderer; do not add one).
- `PremiumUpgrade` renders null for unmapped/excluded topics, so the injection is unconditional and lights up only for the mapped categories below. `international-agencies` posts show nothing (Tool international excluded); no post surfaces the R&D tool (rnd has no blog category).
- Coordinated shared edit: `BlogPostRenderer.tsx` is append-only shared territory; ONE worker owns this injection. R3 will later append `<ResourceGate>` immediately after `<PremiumUpgrade>` in the same spot, so leave the `PremiumUpgrade` as a single clean sibling of `InlineMiniLeadForm`.

Category-slug to topic-to-tool resolution (verify against `taxonomy.ts` + the §1 spine):

| Blog category (slug) | topic | premium tool surfaced |
|---|---|---|
| Salary and Dividends (`salary-and-dividends`) | pay-planning | salary-dividend-optimiser-premium |
| Growth and Exit (`growth-and-exit`) | exit | agency-exit-cgt-premium |
| Tax and Compliance (`tax-and-compliance`) | compliance-vat | vat-scheme-comparator-premium |
| Making Tax Digital (`making-tax-digital`) | compliance-vat | vat-scheme-comparator-premium |
| Incorporation and Structure (`incorporation-and-structure`) | structure | employer-cost-to-hire-premium |
| Agency Finance Essentials (`agency-finance-essentials`) | structure | employer-cost-to-hire-premium |
| Agency Accountant Services (`agency-accountant-services`) | structure | employer-cost-to-hire-premium |
| Contractors and IR35 (`contractors-and-ir35`) | structure | employer-cost-to-hire-premium |
| International Agencies (`international-agencies`) | international | none (excluded, HP §8 + §10) |

---

## 4. ResultGateModal WIRING (three non-negotiables + topicKey-as-prop + one additive MiniCapture prop)

Port `Dentists/web/src/components/tools/premium/ResultGateModal.tsx` to `digital-agency/web/src/components/tools/premium/ResultGateModal.tsx` (aff mirrors the Dentists tree: fleet under `lib/tools/`, components under `components/tools/`). Re-skin to indigo/slate tokens (§5).

**Three non-negotiables (behaviour copied verbatim, live in the ported `PremiumCalculator.tsx`):**
1. **Escape hatch ALWAYS reveals.** X button, backdrop click, Esc key, and the "No thanks, just show my result" link each call `skip()`, which fires exactly one `cta_click { cta_id: "result_gate_skip", placement: "result_gate" }` and reveals the result. `result_gate_skip` is a VALUE on the allowlisted `cta_click` event, not a new event name.
2. **`isConverted()` visitors are NEVER gated.** `gated = placement === "blog" && !isConverted()` inside PremiumCalculator; converted visitors see the result instantly and get the non-gated `CalcResultCta`.
3. **Once per session.** Module-scoped `let gateModalShownThisSession = false` in PremiumCalculator; the gate opens at most once per JS session, thereafter "See your result" reveals directly. **This is the CANONICAL module flag (matches Dentists/Property exactly). It is NOT the `aff_modal_shown` sessionStorage key.** (Verified: `aff_modal_shown` is the exit-intent / deep-scroll modal's own once-per-page cap at `ExitIntentModal.tsx:85,96`; the premium gate is an independent reveal interstitial and must NOT reuse that key, or a reader who saw an exit modal would be denied the gate.)

**topicKey-as-prop:** thread `topicKey` from `PremiumUpgrade -> PremiumCalculator -> ResultGateModal` as a PROP. The gate resolves `getTopic(topicKey)` for its heading; it NEVER re-derives the topic from the URL.

**CalcResultCta prop fix on port.** The Dentists `PremiumCalculator` renders `<CalcResultCta campaign={config.id} />`, but the aff `CalcResultCta` (`src/components/tools/CalcResultCta.tsx`) takes **`slug`**, not `campaign`. On port, change to `<CalcResultCta slug={config.id} />`. The import path `@/components/tools/CalcResultCta` is already correct for aff (no path change needed, unlike the twins).

**MiniCapture gate props (ONE additive prop only).** The aff `MiniCapture` (`src/components/forms/MiniCapture.tsx`) ALREADY accepts `messagePlaceholder`, `messageMinLength` (default 10) and `onSuccess` (verified: props list includes them at lines 48-50, 69-73). The Dentists gate ALSO passes `messageMinWords`, which aff's MiniCapture does NOT yet have. So R2's additive extension is MINIMAL: add ONE prop.
- `messageMinWords?: number` -> when set, `validate()` requires the message to have at least `messageMinWords` words AND at least `messageMinLength` chars; on failure set the `message` field error and emit `form_error` via `ft.onError("message", ...)` (never swallow). When unset, behaviour is unchanged (the current `msg.length < messageMinLength` rule only). Add it to the destructured props and the props type, and thread it into the `useCallback(validate, [messageMinLength, messageMinWords])` dependency list.

This extension is PURELY additive and backward-compatible: every existing MiniCapture caller (calc_result, exit-intent, inline, mobile) passes no `messageMinWords` and behaves identically. It must NOT regress the R1 hardening (honeypot `enquiry_ref` passed to the server at line 152, validation aborts emit `form_error`, no silent drop, consent renders `siteConfig.leadConsentText`). Keep the experiment shims (`experimentKey`/`exposeOnView`) intact even though R2 does not use them (0 experiments running).

**R2 gate is a FULL capture (not email_only).** The gate MiniCapture collects name + phone + email + message (all required), exactly like Dentists. `captureMode: "email_only"` and `extras: { resource_gate: true }` are R3 concerns (the ResourceGate), NOT R2. Do NOT set them on the R2 gate; it is an ordinary qualified lead. The gate MiniCapture call uses `formId="calc_result_gate"`, `messagePrefix="[Result gate: <toolId>]"`, gate-specific `messagePlaceholder`, `messageMinLength` ~40, `messageMinWords` ~8, `onSuccess={onReveal}`, and an agency-specific blurb ("A calculator gives the shape of the answer. Agency salary and dividend planning, VAT, exit relief and R&D claims are unforgiving in the detail. Tell us your situation and an agency finance specialist will confirm your exact figure and the sensible next step, with no obligation.").

**MobileToolSlot:** port `Dentists/web/src/components/tools/premium/MobileToolSlot.tsx` to `components/tools/premium/MobileToolSlot.tsx`; on `sm:hidden` the desktop-only calculator is replaced by a topic-aware MiniCapture (`formId="mobile_tool"`, `messagePrefix="[Mobile tool: <topic>]"`, heading = topic `ctaCopy`, agency desktop-tool blurb, `submitLabel="Send me my figure"`), left border `var(--accent)`.

---

## 5. FILE MANIFEST, BUILD ORDER, REGRESSION INVARIANTS

### File manifest (paths under `digital-agency/web/src/`)
New (lib, mirror the Dentists `lib/tools/premium/` tree):
- `lib/tools/premium/types.ts` (port `Dentists/web/src/lib/tools/premium/types.ts`; import `CalcField/CalcValues/CalcResult/CalcResultRow` from `@accounting-network/web-shared/tools/types` and `TopicKey` from `@/lib/intent/taxonomy`; re-token the doc-comment token names to `--accent`/`--ink`)
- `lib/tools/premium/registry.ts` (SEPARATE from the fleet `registry.ts`; append-only, one line per tool, added only after that tool's golden passes)
- `lib/tools/premium/resources.ts` (the §1 topic-to-toolId spine, exhaustive over all 6 TopicKeys)
- `lib/tools/premium/configs/salary-dividend-optimiser.ts`
- `lib/tools/premium/configs/agency-exit-cgt.ts`
- `lib/tools/premium/configs/vat-scheme-comparator.ts`
- `lib/tools/premium/configs/employer-cost-to-hire.ts`
- `lib/tools/premium/configs/rd-tax-credit.ts`
- `lib/tools/premium/premium-tools.test.ts` (§2 goldens, figures derived by executing the libs)

New (components, mirror the Dentists `components/tools/premium/` tree):
- `components/tools/premium/PremiumCalculator.tsx` (port Dentists; `CalcResultCta slug={config.id}` prop fix, §4; re-token)
- `components/tools/premium/PremiumUpgrade.tsx` (port; re-token; imports `resourceForTopic`/`getPremiumTool` from the premium lib)
- `components/tools/premium/MobileToolSlot.tsx` (port; re-token)
- `components/tools/premium/ResultGateModal.tsx` (port; re-token)
- `components/tools/premium/PremiumBarChart.tsx` (port `Dentists/.../PremiumBarChart.tsx`; re-token)

Edited (coordinated, additive):
- `components/forms/MiniCapture.tsx` (ONE additive prop `messageMinWords`, §4)
- `components/blog/BlogPostRenderer.tsx` (inject `<PremiumUpgrade>` after the mid-split `InlineMiniLeadForm`, §3)

NO edit to any `lib/tools/compute/*.ts`, any `lib/tools/configs/*.ts`, the fleet `lib/tools/registry.ts`, or any `components/calculators/*.tsx` (the orphaned 12, §0). If a worker touches a compute lib, STOP: the premium tools wrap them, they do not change them.

### Build order
1. Premium types + PremiumBarChart + PremiumCalculator + PremiumUpgrade + MobileToolSlot + ResultGateModal (ported, re-tokened indigo/slate, `CalcResultCta slug=` fix).
2. MiniCapture additive `messageMinWords` extension (§4).
3. Five premium configs (each `compute()` imports its `compute/*` lib, never forks) + the resources spine + the registry (append a registry line ONLY after that tool's golden passes).
4. `premium-tools.test.ts` goldens, executed to derive/confirm figures; the existing `agency-tools.test.ts` must stay GREEN.
5. BlogPostRenderer injection (coordinated single owner).
6. Manager integration battery (`npm test --workspace digital-agency/web` + `npm run build --workspace digital-agency/web`), then the R2 gate pipeline.

### Regression invariants (Opus QA blocks on these)
- **Tokens:** indigo/slate only. Brand accent = `var(--accent)` (#4f46e5); dark fill / second chart series = `var(--ink)` (#0f172a). The site does NOT define `--gold`, `--navy` or `--dark`, so any `var(--gold)`/`var(--navy)`/`var(--dark)` in a ported file is a defect: re-token `--gold -> --accent` and `--navy -> --ink` at EVERY occurrence (the Dentists sources use both throughout PremiumCalculator, ResultGateModal, PremiumUpgrade, MobileToolSlot, PremiumBarChart and the configs' `chart.series[].color`). Agency DOES define `--border`, `--surface`, `--surface-elevated`, `--ink`, `--ink-soft`, `--muted`, `--accent`, `--accent-strong`; keep those as-is. Do NOT use `var(--primary)` in component classNames even though aff defines it (estate portability rule); use `var(--accent)`. Grid storage keys `aff:grid:*` never `ptp:`/`dfp:`/`cfp:`/`bfp:` (no grids in R2; type parity only).
- **No maths forked:** every premium `compute()` imports the exported function from its `compute/*` lib; QA recomputes each default-input golden branch-for-branch to the penny with a conservation check, and confirms the premium result equals the fleet lib output. Tool 4's `employees` array-shaping is input assembly, not a fork (calcEmployerNi is called unchanged).
- **ResultGate:** escape always reveals (one `result_gate_skip` per dismiss), `isConverted()` never gated, once per session (MODULE flag `gateModalShownThisSession`, NOT `aff_modal_shown`). topicKey threaded as a prop, never re-derived from the URL. R2 gate is a FULL MiniCapture capture (no `captureMode:"email_only"`, no `extras.resource_gate`, those are R3).
- **Events:** only the allowlist (`calc_view`, `calc_input_change`, `calc_computed`, `calc_result_viewed`, `cta_click`, plus MiniCapture form events `form_start`/`form_submit`/`form_error`/`lead_submitted`). No new names. `gate_view`/`resource_unlocked` are R3.
- **No em-dashes, no "DJH", no credential claims** in any authored string (HP §10). `git diff baseline -- Property/` empty. `packages/web-shared` unchanged (the MiniCapture edit is site-local; if a worker touches web-shared, stop and escalate to the manager).
- **Orphaned components untouched:** no edit to `components/calculators/*.tsx` (§0); the live calculator surface (config fleet, gallery, sitemap, embeds) is untouched by R2.
- **HP fidelity:** dividends 10.75/35.75/39.35 + £500 allowance, FA 2026, 2026/27 (HP §3); employer NIC 15% above £5,000 from 6 Apr 2025, EA £10,500 single-director exclusion (HP §2); CT 19/25 marginal 3/200 ~26.5% (HP §2/§3); BADR 14% to 5 Apr 2026 / 18% from 6 Apr 2026, £1,000,000 lifetime limit, no "10% to 18%" defect (HP §5, §9 item 1); VAT reg £90,000 / dereg £88,000, limited-cost-trader 16.5%, 2%/£1,000 goods test (HP §6); R&D merged 20%/~15% net, ERIS 30%/86%/14.5% with the eligibility-honesty boundary (HP §4); UAE/relocation excluded or UK-primary-hedged only, no firm UAE figures (HP §8, §10). Tag 2026/27 on every volatile rate.
</content>
</invoke>
