# Trade Tax Specialists (construction-cis) — Tool Roster Design

Status: DESIGN ONLY (no code, no build, no commit). Architect: Opus.
Date: 2026-07-17. Rates: 2026/27 (FA 2026 enacted 18 Mar 2026).

Brand: Trade Tax Specialists (tradetaxspecialists.co.uk). Audience: CIS
subcontractors, contractors and construction trades (sole traders, partnerships,
limited companies). No pricing, no client names, faceless authority, lead-gen
handoff model.

---

## 1. Existing public roster (8 tools — do NOT duplicate)

| # | slug | what it does | category |
|---|------|--------------|----------|
| 1 | `cis-deduction-calculator` | CIS withheld on a labour base at 0/20/30% | CIS Basics |
| 2 | `cis-take-home-calculator` | Net from a single invoice after CIS, annualised | CIS Basics |
| 3 | `cis-invoice-splitter` | Labour vs materials split, CIS base, VAT/DRC position (DRC as a known input toggle) | CIS Basics |
| 4 | `cis-refund-estimator` | Likely refund from over-deduction | CIS Refunds |
| 5 | `cis-self-assessment-calculator` | Annual SA income tax + Class 4 NI vs CIS deducted → refund/owe | CIS Refunds |
| 6 | `cis-back-years-calculator` | Multi-year refund claim across the 4 prior years | CIS Refunds |
| 7 | `cis-vs-paye-comparison` | CIS self-employment vs PAYE employment | CIS Comparisons |
| 8 | `cis-gps-eligibility-checker` | Three GPS qualifying tests, pass/fail + saving | CIS Compliance |

Premium (3, additive client islands, not indexable): `cis-refund-planner`,
`cis-vs-paye`, `cis-gps-readiness`.

Shared maths lives in `web/src/lib/calculators/cis-tax.ts` (single source of
truth). New tools reuse those helpers, never re-implement rates.

---

## 2. Measurement (real demand, not assumed)

### Bing (fresh pull 2026-07-17, 60 rows — young site, sparse but signal-rich)
Dominant themes in cis's own Bing data:
- **CIS penalties / appeals**: ~15 distinct queries (penalty notice, nil-return
  late penalty appeal, "highest penalty for non-compliance", CIS return dates).
- **VAT domestic reverse charge (DRC)**: "can a subcontractor charge vat if
  outside CIS", "if a subcontractor charges vat on DRC what amount does 20% CIS
  come off", "chain of reverse vat when subcontractor works for a subcontractor",
  "does DRC apply to a builder with £1m turnover", "which vat code for cis
  subcontractors that are not vat registered". This is DECISION pain, not math.
- **Payment & deduction statement (PDS)** generation: many "how to complete /
  write a cis payment and deduction statement", "digital PDS valid?".
- **Employment status**: "cest for cis workers", "false self-employment labour
  only cis", "what lenders treat cis workers as employed".

### GSC (construction-cis accessible — 763 rows, fresh to 2026-07-15)
Top head demand (impressions, all at weak positions p12–p88 = whitespace):
- `accountant for roofers` family: **351 impr** across 3 variants
  (accountants for roofers 118, roofers accountant 117, accountant for roofers 116).
- CIS software / payroll software: `cis software free` 44, `cis payroll software`
  32, `payroll software for cis` 16 (informational — NOT a tool we build).
- `self-assessment for cis subcontractors` 22, `cis refund/reclaim` family ~80 combined.
- Trade "accountant for" tail: joiners 22, bricklayers 18/6/6, plasterers 8,
  `accountant for tradesmen west midlands`, `tax laws for bricklayers small businesses`.

### Cross-site GSC piggyback (locked rule — cis is young, lean on siblings)
"accountant/tax for [trade]" demand, all sites, sized by trade:

| trade | impressions | distinct queries | verdict |
|-------|-------------|------------------|---------|
| builder | 354 | 7 | strong |
| roofer | 351 | 3 | strong |
| plumber | 134 | 2 | strong |
| tradesmen (generic) | 62 | 4 | moderate |
| joiner/carpenter | 22 | 1 | tail |
| bricklayer | 18 | 3 | tail |
| plasterer | 8 | 2 | tail |
| electrician | 5 | 1 | tail |
| groundworker/drainage | 4 | 1 | tail |

DRC demand also heavy on **generalist** GSC/Bing (domestic reverse charge
construction 7, plus ~15 more construction-DRC queries) — piggyback confirms
DRC is an estate-wide construction gap cis should own.

### DataForSEO live SERP (candidate tool head queries, GB, 2026-07-17)
- `roofer tax calculator` → **ZERO organic results** = pure whitespace.
- `cis gross payment status calculator` → **ZERO organic** (but GPS already
  covered by our checker + premium scorer, so we do NOT re-build it).
- DRC calculators (`vat domestic reverse charge calculator`,
  `construction reverse charge vat calculator`) → dominated by generic VAT
  math calculators (online-vat-calculator, reversevatcalculator, vatulator) +
  gov.uk. **None answer "does DRC apply to me"** — the decision checker is whitespace.
- `cest calculator construction` / `subcontractor or employee calculator` →
  dominated by contractorcalculator.co.uk, gov.uk CEST, IR35 umbrella firms
  (paystream, contractorumbrella). Crowded, IR35-adjacent → **P2** for a young site.
- `sole trader vs limited company calculator construction` → accountancy blogs
  (dnsassociates, bluerocket, 123financials); no CIS-specific EPS-vs-SA calculator
  → CIS angle is whitespace.
- `builder take home pay calculator` / `plumber tax calculator uk` →
  contractorcalculator / paystream / gasengineersoftware; none CIS-trade-branded.
- `cis late filing penalty calculator` → gov.uk + a few accountancy pages;
  no clean interactive penalty+appeal tool → whitespace, and matches the single
  largest Bing theme.
- `accountant for builders` returned SV 70 LOW comp; rest returned no SV via
  Google Ads endpoint (long-tail, but GSC impressions prove live demand).

Failed steps: none. All measurement ran. Google Ads search-volume endpoint
returned `None` for most long-tail terms (expected for sub-100 SV tails); GSC
impressions are the authoritative demand signal here.

---

## 3. Design principle applied (anti-duplication)

Two temptations rejected on the ponytail ladder:

1. **One take-home calculator per trade** (roofers/electricians/plumbers/
   scaffolders). REJECTED. The math is identical to `cis-take-home` /
   `cis-self-assessment`; 5 near-clone tools would be thin duplicates and fail the
   A* bar. The "accountant for [trade]" demand is a LANDING-PAGE intent (local
   service), not 5 distinct calculators. Instead: **one trade-aware take-home +
   expenses estimator** with a trade selector that pre-loads trade-typical
   expense profiles (roofer, electrician, plumber, bricklayer, joiner, plasterer,
   groundworker, painter, general builder). Each trade landing page embeds it
   with its trade pre-selected. One tool, N landing-page hosts, genuine value.

2. **A GPS modeller / readiness tool.** REJECTED — already covered by the public
   `cis-gps-eligibility-checker` plus the premium `cis-gps-readiness` scorer.

---

## 4. NEW tools (validated, designed)

Target ~12 public. Current 8 + 4 new = **12**. All P1/P2 below.

Global FLAG for every income-tax tool below — 2026/27 bands:
- Personal allowance £12,570; basic-rate band width **£37,700** (fixed).
- Higher-rate band width = **(125,140 − PA) − 37,700**, NOT a fixed 74,870. PA
  tapers £1 per £2 of income over £100,000, so above £100k the higher band widens
  as PA shrinks and PA hits £0 at £125,140 (additional rate 45% above).
- Existing `saLiability` in `cis-tax.ts` uses the fixed £37,700 basic band and
  40% above with a flat PA — correct up to £100k, but the PA taper is NOT modelled.
  New tools that admit incomes ≥ £100k (esp. the sole-trader-vs-limited tool)
  MUST add the taper. Recommend extending `cis-tax.ts` with a `paAfterTaper(income)`
  helper and a `higherBandWidth(pa)` so all tools share one correct band engine.

---

### NEW 1 — VAT Domestic Reverse Charge Checker  ·  P1  ·  free
- **slug**: `cis-reverse-charge-checker`
- **purpose**: Tells a construction business whether the VAT domestic reverse
  charge applies to a specific invoice, and exactly what to put on it — the
  DECISION, not the VAT arithmetic the generic calculators already do.
- **target queries / evidence**: cis Bing — "can a subcontractor charge vat if
  outside CIS", "does DRC apply to a builder with £1m turnover", "which vat code
  for cis subcontractors not vat registered", "chain of reverse vat"; generalist
  GSC/Bing — "domestic reverse charge construction" (7), "when does domestic
  reverse charge apply", "how does a contractor know when to use reverse charge
  vat", "wording for construction industry reverse charge vat". **Whitespace
  verdict: WHITESPACE for the decision tool** — existing rankers only do the VAT
  math, none answer applicability + invoice wording.
- **fields**:
  1. Your role on this job (select: subcontractor supplying / contractor receiving)
  2. Are you VAT-registered? (toggle)
  3. Is the customer VAT-registered? (toggle)
  4. Is the customer CIS-registered (in the CIS chain)? (toggle)
  5. Is the customer the END USER or intermediary supplier (e.g. the property
     owner / developer selling on)? (toggle: "customer confirmed end user")
  6. Are the services within scope of CIS (construction operations, not pure
     professional/architectural or zero-rated new-build)? (toggle)
  7. Net invoice value (currency, for the illustrative wording line only)
- **compute spec (decision tree, HMRC VAT Notice 735 / CIS rules)**:
  - DRC applies when ALL true: supply is a specified construction service within
    CIS scope, BOTH parties VAT-registered, BOTH in the CIS chain, customer is
    NOT the end user and NOT an intermediary that has notified end-user status,
    and the supply is standard or reduced-rated (not zero-rated).
  - If DRC applies → supplier does NOT charge VAT; invoice states
    "Reverse charge: customer to account to HMRC for the VAT" and shows the VAT
    rate/amount the customer must self-account (20% of net = £X, for reference).
    CIS deduction is still calculated on the labour element of the NET (VAT-exclusive)
    figure — answers the exact Bing query "what amount does the 20% CIS come off"
    (answer: the net labour, VAT never enters the CIS base).
  - If DRC does NOT apply, branch the reason: not VAT-registered → no VAT / normal;
    end user → normal VAT charged; outside CIS scope → normal VAT; zero-rated
    new-build → 0% VAT, no reverse charge.
- **worked example**: subcontractor VAT-reg, customer VAT-reg + CIS-reg + not end
  user, net £3,000 standard-rated → DRC APPLIES. Invoice: net £3,000, VAT £0
  charged, note "Reverse charge: customer to account for £600 output VAT to HMRC".
  Registered subcontractor 20% CIS on £3,000 labour = £600 withheld; net received
  £2,400. (VAT and CIS are independent; the £600 reverse-charge VAT is not paid to
  the subcontractor and is not part of the CIS base.)
- **premium**: no. **priority**: **P1** (largest converging Bing+sibling theme,
  clean whitespace, vertical-essential, low build risk — pure decision logic).

---

### NEW 2 — CIS Late Filing Penalty & Appeal Estimator  ·  P1  ·  free
- **slug**: `cis-penalty-calculator`
- **purpose**: Works out the CIS300 late-filing penalty for one or more late
  monthly returns and flags whether an appeal (reasonable excuse / nil-return
  cap) is likely available — the single biggest theme in cis's own Bing data.
- **target queries / evidence**: cis Bing (dominant cluster) — "cis late filing
  penalty", "cis return sent late filing penalty", "can i appeal a cis late
  filing penalty when the return was nil", "highest penalty for cis
  non-compliance", "how much is the penalty for not filing cis on time",
  "cis penalties hmrc". DataForSEO: `cis late filing penalty calculator` served
  only gov.uk + scattered accountancy pages, no clean interactive tool.
  **Whitespace verdict: WHITESPACE** (no dominant interactive penalty+appeal tool).
- **fields**:
  1. How many months is the return overdue? (number / select 1 day–12+ months)
  2. Number of late monthly returns (number — penalties stack per return)
  3. Was each return a NIL return? (toggle — informs the cap and appeal angle)
  4. Is this the first CIS default? (toggle — first-offence / reasonable-excuse angle)
- **compute spec (CIS penalty regime, no rate change 2026/27)**:
  - Per late CIS300: £100 at 1 day late; £200 at 2 months; at 6 months the
    greater of 5% of CIS deductions due (nil for a nil return) or £300; same again
    at 12 months (with a higher tax-geared band where deliberate withholding is
    involved — flag, do not auto-assume). Fixed penalties stack per return.
  - Nil returns: the tax-geared 6/12-month elements are £nil, so a run of late
    NIL returns is capped at the £100+£200+£300+£300 fixed ladder per return —
    surface this because "appeal a nil-return late penalty" is a top query.
  - Output: total penalty exposure + a per-return breakdown + an "appeal likely?"
    flag (reasonable excuse categories + the well-established nil-return
    disproportionality argument), routing to the CTA.
- **worked example**: 3 nil monthly returns, each 3 months late, first default →
  each return £100 + £200 = £300 fixed (no tax-geared element on nil), total £900;
  appeal flag ON (nil returns, first default, reasonable-excuse eligible).
- **premium**: no. **priority**: **P1** (largest Bing theme by volume; converts
  distressed searchers into appeal/filing leads; pure arithmetic + rules, no band-bug risk).

---

### NEW 3 — Trade Take-Home & Expenses Estimator (trade-aware)  ·  P1  ·  free
- **slug**: `trade-take-home-calculator`
- **purpose**: A single annual take-home estimator with a TRADE selector that
  pre-loads trade-typical allowable expense profiles, giving each "accountant for
  [trade]" landing page a genuine interactive asset without cloning the tool per trade.
- **target queries / evidence**: GSC "accountant for roofers" family 351 impr,
  builder 354, plumber 134, plus joiner/bricklayer/plasterer/tradesmen tail — all
  at p12–p88 (weak = capturable). DataForSEO: `roofer tax calculator` = ZERO
  organic (pure whitespace); `builder take home pay calculator` / `plumber tax
  calculator uk` dominated only by generic contractor-calculator/umbrella sites,
  none CIS-trade-branded. **Whitespace verdict: WHITESPACE for trade-branded CIS
  take-home; the generic head is contested but the trade + CIS framing is open.**
- **fields**:
  1. Trade (select: general builder, roofer, electrician, plumber, bricklayer,
     joiner/carpenter, plasterer, painter/decorator, groundworker, scaffolder,
     "other trade") — pre-fills field 4 with a trade-typical expense default the
     user can override.
  2. Annual gross CIS income (currency)
  3. Materials you supply (currency)
  4. Allowable expenses (currency, pre-filled per trade: e.g. roofer higher tools/
     PPE/ladder-access, groundworker higher plant/mileage, electrician higher
     tools/testing/certification, painter lower) — override allowed.
  5. CIS deduction rate (0/20/30%)
  6. Annual business mileage (number → AMAP 55p first 10k, 25p after)
- **compute spec (2026/27)**:
  - Mileage allowance: `min(miles,10000)*0.55 + max(0,miles-10000)*0.25`, added to
    expenses. (**AMAP 55p from 6 Apr 2026** — note the source figure is now 55p, not 45p.)
  - Profit = gross − materials − expenses − mileage allowance.
  - Income tax on (profit + PA logic): PA £12,570; basic band £37,700 @ 20%;
    higher @ 40%; **PA taper above £100k and higher-band width =
    (125,140 − PA) − 37,700 for high earners** (share the `cis-tax.ts` band helper).
  - Class 4 NI: 6% (£12,570–£50,270), 2% above.
  - CIS deducted at rate on labour base; take-home = profit − tax − Class 4 NI;
    refund/owe vs CIS deducted shown as a secondary row.
  - Headline: estimated annual take-home + effective take-home %; sub: refund/owe.
- **worked example**: roofer, £48,000 gross, £6,000 materials, £4,500 expenses
  (roofer default), 8,000 miles → mileage £4,400; profit £33,100; tax
  (£33,100−£12,570=£20,530 @20%) £4,106; Class 4 NI (£20,530 @6%) £1,231.80;
  take-home ≈ £27,762; CIS at 20% on labour £8,400 → refund ≈ £3,062 due.
- **premium**: no. **priority**: **P1** (unlocks the whole "accountant for
  [trade]" landing-page cluster; one tool, many hosts). **Band-bug FLAG applies.**

---

### NEW 4 — Sole Trader vs Limited Company for CIS Subbies  ·  P2  ·  free
- **slug**: `cis-sole-trader-vs-limited`
- **purpose**: Compares the two structures specifically for a CIS subcontractor,
  including the CIS-unique EPS monthly-reclaim (limited) vs Self Assessment
  year-end reclaim (sole trader) cash-flow difference — the angle no generic
  incorporation calculator covers.
- **target queries / evidence**: GSC sibling — "cis sole trader vs limited
  company", "can i back out of a sole trader vs limited company"; DataForSEO
  head dominated by generic incorporation blogs but **no CIS-specific EPS-vs-SA
  calculator** → CIS angle whitespace; generic "sole trader vs limited" is a
  saturated, high-competition head (P2, not P1, on a young site).
- **fields**:
  1. Annual gross CIS income (currency)
  2. Materials + expenses (currency)
  3. Planned salary if limited (currency, default £12,570)
  4. CIS deduction rate (0/20/30%)
- **compute spec (2026/27)**:
  - **Sole trader route**: profit taxed as NEW 3 (income tax + Class 4 NI); CIS
    deductions reclaimed via Self Assessment at year end.
  - **Limited route**: director salary (Class 1 employee NI 8%/2%; employer NIC
    **15% over £5,000 secondary threshold**); corporation tax on profit (19% small
    / 25% main with marginal relief £50k–£250k); dividends at **10.75% basic /
    35.75% higher / 39.35% additional** (FA 2026 s.4) after the £500 dividend
    allowance; **BADR 18%** noted for eventual exit; CIS deductions reclaimed
    MONTHLY via the Employer Payment Summary (EPS) against PAYE — the cash-flow win.
  - **Income-tax bands**: MUST use PA taper + higher-band width
    (125,140 − PA) − 37,700 because this tool routinely models incomes ≥ £100k.
  - Output: net-in-pocket each route + the CIS-specific cash-flow timing note
    (EPS monthly vs SA annual) + a break-even income callout. VAT reg threshold
    **£90,000** referenced where turnover is near it.
- **worked example**: £60,000 gross, £10,000 materials+expenses, £12,570 salary,
  20% CIS. Sole trader: profit £50,000, tax+NI ≈ £11,432, net ≈ £38,568. Limited:
  salary £12,570 + CT on ~£37,430 profit + dividends taxed at 10.75%/35.75% →
  net modestly higher at this level plus monthly EPS reclaim vs annual SA wait.
  (Illustrative; tool computes the exact delta.)
- **premium**: no. **priority**: **P2** (valuable + CIS-differentiated but the
  head query is competitive and the compute is the heaviest; ship after P1s).
  **Band-bug FLAG applies — this is the tool most exposed to it.**

---

## 5. Deferred / rejected (documented, not built)

| candidate | verdict | reason |
|-----------|---------|--------|
| CEST-lite / subcontractor-vs-employee | DEFER (P3) | Real demand ("cest for cis workers", "false self-employment labour only cis") but SERP crowded by contractorcalculator + gov.uk CEST + IR35 umbrellas; IR35-adjacent, better fit for `contractors-ir35` sibling. Revisit once cis has authority. |
| GPS modeller / readiness calculator | REJECT | Already covered: public `cis-gps-eligibility-checker` + premium `cis-gps-readiness`. Zero-organic SERP is tempting but we already occupy it. |
| Per-trade take-home clones (roofer/electrician/…) | REJECT | Thin duplicates of NEW 3; fail A* bar. Trade demand served by NEW 3's trade selector on per-trade landing pages. |
| Payment & Deduction Statement generator | DEFER | Strong Bing demand ("how to complete a cis payment and deduction statement", "is a digital PDS valid") but this is a document-generator / content-piece, not a calculator; better as a template + guide asset than a fleet tool. Note for content team. |
| Standalone mileage / tools capital-allowance tool | FOLD INTO NEW 3 | Mileage (AMAP 55p) and trade tools/PPE expenses are the expense inputs of NEW 3; a separate tool would be thin. |
| Standalone construction VAT (DRC) invoice math | REJECT | The math already lives in `cis-invoice-splitter`; the gap is the DECISION, which NEW 1 fills. |

---

## 6. Resulting roster (12 public)

Existing 8 + NEW 1–4 = **12 public tools** (Property-parity depth), plus the 3
existing premium islands.

Priority build order: **P1** — `cis-reverse-charge-checker`,
`cis-penalty-calculator`, `trade-take-home-calculator`; then **P2** —
`cis-sole-trader-vs-limited`.

Cross-cutting build note: before the two income-tax tools (NEW 3, NEW 4), extend
`web/src/lib/calculators/cis-tax.ts` with a shared PA-taper + higher-band-width
engine (`paAfterTaper(income)`, `higherBandWidth(pa)`) and have those tools —
and ideally back-patch `saLiability` — consume it, so the band-width bug
(fixed 74,870 vs correct (125,140 − PA) − 37,700) cannot recur per tool.
