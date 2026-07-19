# Contractor Tax Accountants — Calculator / Tool Roster Design

Architect doc. Design only. No code shipped by this pass. Brand: Contractor Tax Accountants
(contractors-ir35, PSC contractors, umbrella workers, inside/outside IR35). Tax year 2026/27, rUK.

All new tools trace rates to `docs/contractors-ir35/house_positions.md` and reuse the verified
engine in `contractors-ir35/web/src/lib/calculators/tax2026.ts`. No inlined rates. Every generic
tool follows the shape in `src/lib/calculators/tools/*.ts` (fields → compute → explainer → faqs).

---

## 1. Current fleet (do not duplicate)

Public generic tools (`src/lib/calculators/tools/`) — 7:

| slug | what it does |
|---|---|
| outside-ir35-take-home-calculator | limited-company net from turnover (salary+dividends) |
| inside-ir35-take-home-calculator | umbrella/PAYE net from assignment rate |
| umbrella-take-home-calculator | umbrella net with margin |
| umbrella-vs-limited-calculator | **same rate, both routes, annual gap** (inside vs outside already covered here) |
| dividend-tax-calculator | dividend tax 2026/27 |
| corporation-tax-calculator | CT with marginal relief |
| contractor-salary-dividend-calculator | optimal salary/dividend split |

Premium (gated, `premium/`) — 4: ir35-take-home-compare (outside-vs-inside flagship),
umbrella-vs-limited-premium, salary-dividend-planner, corporation-tax-planner.

Consequence for design: a plain "inside vs outside" or "umbrella vs limited" public tool would
**duplicate** `umbrella-vs-limited-calculator`. Rate-equalisation is therefore designed as a
*result row inside* a new day-rate tool, not a standalone tool (its own search demand is ~sv10).

Engine functions available to reuse: `limitedTakeHome`, `umbrellaTakeHome`, `personalTax`,
`corporationTax`, `employerNI`, `employeeNI`, `personalAllowance`.

**BAND BUG GUARD (locked):** the higher-rate band is variable, not fixed. `tax2026.ts` was just
fixed to compute `additionalTaxable = Math.max(BASIC_RATE_LIMIT, ADDITIONAL_RATE_GROSS_THRESHOLD − pa)`
where `BASIC_RATE_LIMIT = 37,700` (fixed) and the 45% band starts at £125,140 gross. Higher-band
width is `(125,140 − pa) − 37,700`, which is only ~£74,870 when PA is the full £12,570 and shrinks
as PA tapers. **Any new tool that touches income tax MUST call `personalTax` / the engine and MUST
NOT reintroduce a hardcoded £74,870 higher band.** New tools call the engine; they never re-derive bands.

---

## 2. Demand evidence (measured, not assumed)

**BWT pull:** `python -m optimisation_engine.clients.bing_query_client contractors-ir35` →
`0 pages with Bing data`. Confirmed: ir35 has no Bing Webmaster verification yet (owner/manual step).
Not a blocker; cross-site piggyback used instead.

**ir35 OWN GSC** (264 rows, 2026-06-17→07-06, brand-new, positions 20–90 so pre-ranking): themes that
recur across queries — **managed service company / MSC legislation / MSC vs PSC**; **contractor pension /
SIPP / employer contribution** (contractor sipp pos 18.6, sipp employer contribution pos 51); **IR35
status** (ir35 tests, MOO, substitution clause, deemed employment, statement of work ir35, ir35 contract
check); **MVL contractors**; **inside/outside take-home** (outside ir35 take home calculator pos 67).

**Cross-site piggyback (locked rule) — sibling GSC + Bing:**
- **Medical** (Bing, positions 1–7, real clicks): "gp locums work outside ir35 since use their own
  equipment", "how to avoid ir35 as a locum dr", "are gps outside ir35", "ir35 and nhs locum",
  "locum drs and ir35", "echocardiography locum roles outside ir35". Strong latent **IR35 status / SDC**
  demand that ir35 has no tool for.
- **Generalist** (GSC): huge "contractor accounting software" cluster (sv-heavy) — but that is
  product-review intent, not a calculator gap; explicitly NOT chased.
- **Property**: "mtd for contractors comparison" (weak).

**DataForSEO live (UK, keyword_suggestions, search_volume + KD):**

| head query family | monthly volume (combined) | KD | verdict |
|---|---|---|---|
| ir35 calculator / inside ir35 calc | inside ir35 4,400; ir35 calc 3,600; outside 2,400 | 0 | **DOMINATED + already covered** by existing take-home tools; do not clone |
| umbrella company calculator | 1,000 | 0 | **DOMINATED + covered** (umbrella + umbrella-vs-limited exist) |
| inside vs outside ir35 calculator | ~400 (210+70+30+20…) | 0/26 | **covered** by umbrella-vs-limited; differentiate via rate-equalisation row |
| contractor day rate calculator | 260 + 30+30+20 (+ "day rate to salary") | 0 | **WHITESPACE-ish**: high-volume, differentiated framing (rate → all routes) |
| contractor mortgage (+ calculator) | mortgage-for-contractor 880; calculator 170 | 0–5 | **WHITESPACE** for a niche tax site: contractor-specific affordability, lead magnet |
| ir35 status checker | 70 (+ hmrc variant) | 0 | thin direct volume BUT medical piggyback proves intent; **differentiated** (CEST-lite) |
| managed service company (+ legislation/definition hmrc) | 70 + long tail | 10–21 | **DIFFERENTIATED whitespace**: almost no MSC-risk *tool* exists; ir35 own GSC confirms |
| contractor pension calculator | ~10 direct | 38 | thin direct BUT ir35 GSC SIPP/employer-contribution cluster real; **differentiated**, high-value |
| umbrella margin / margin comparison | 10–20 + branded (parasol/paystream) | 5 | thin; fold into umbrella tools, not a headline |
| contractor expenses calculator | ~10 | – | thin; fold into status/SDC, not standalone |

Net read: the generic take-home / IR35-calculator space is **saturated and already covered**. Real
differentiated gaps are **day-rate framing, MSC risk, IR35 status/SDC, contractor pension, contractor
mortgage affordability** — exactly the "differentiated over clone" brief.

---

## 3. New tools chosen

Target ~10 public; currently 7. Adding **3 new public** → **10 public** (plus the day-rate tool
absorbs the rate-equalisation feature, avoiding an 11th thin clone). Two further candidates are
designed but parked as P2/next-wave to keep the fleet lean and every tool data-justified.

### NEW-1 · Contractor Day Rate Calculator — **P1 · public**
- **slug:** `contractor-day-rate-calculator`
- **purpose:** Turn a day rate into annual net take-home across all three routes (outside limited,
  inside umbrella) on one screen, and show the day-rate uplift needed inside to match outside net.
- **target queries / evidence:** "contractor day rate calculator" (DFS sv 260, KD 0), "contractor
  day rate to salary calculator", "contractor day rate calculator inside ir35"; ir35 own GSC
  "outside ir35 take home calculator". Differentiator vs the saturated "ir35 calculator" space:
  it anchors on the number contractors actually negotiate (the day rate) and outputs the
  **inside-rate-that-equalises-outside-net** row that has no standalone demand (sv ~10) but is the
  single most-asked contractor question at renewal.
- **fields:** dayRate (currency, 500), billableDays (number, 220, max 260), directorSalary
  (select 12,570 / 6,708, advanced), annualExpenses (currency, 6,000, advanced), umbrellaMargin
  (currency, 1,200, advanced).
- **compute:** `income = dayRate * billableDays`. `ltd = limitedTakeHome({turnover: income, salary,
  expenses})`; `umb = umbrellaTakeHome({assignmentIncome: income, umbrellaMargin})`. Rate-equalisation:
  find the umbrella assignment rate `A` whose `umbrellaTakeHome(A).netTakeHome == ltd.netTakeHome`
  (monotonic → binary search 20 iterations over `A ∈ [income, income*2]`; engine already solves the
  employer-cost circularity), then `equalisingDayRate = A / billableDays`. All bands/NIC/dividend/CT
  from the engine — **no re-derived £74,870**.
- **worked example:** £500/day × 220 = £110,000. Outside ltd (salary £12,570, £6k expenses): net
  ≈ £75.4k, retention ≈ 68.5%. Inside umbrella (£1,200 margin): net ≈ £62.9k. Equalising inside day
  rate ≈ £590/day (you must bill ~18% more inside to keep the same net). Figures illustrative;
  golden-tested at build.
- **premium:** no. **priority:** P1.
- **note copy must state:** structure does not set status; the outside figure is only available if the
  engagement is genuinely outside IR35.

### NEW-2 · Managed Service Company (MSC) Risk Checker — **P1 · public**
- **slug:** `managed-service-company-risk-checker`
- **purpose:** Screen a contractor's arrangement against the four MSC "involvement" tests (Chapter 9
  ITEPA, s.61B) and the MSC Provider definition, and flag whether their accountant/scheme could make
  them a Managed Service Company — the highest-cost, most-overlooked contractor tax trap (deemed
  employment income + transfer-of-debt to directors).
- **target queries / evidence:** ir35 own GSC "managed service company", "managed service companies",
  "managed service company v s personal service company"; DFS "managed service company" sv 70 +
  "managed service company msc legislation", "managed service company definition hmrc" (KD 10–21,
  low competition). **Whitespace verdict:** competitor calculators are almost all take-home clones;
  a structured MSC-involvement checker barely exists. Genuinely differentiated + vertical-essential.
- **fields (yes/no + select, indicator not a money calc):** providerBenefitsFromServices
  (does your accountant/provider benefit financially from your company beyond a fixed fee?),
  providerInfluencesFinances (do they influence how you're paid / run your finances?),
  providerControlsCompany (do they control or influence company affairs?), standardisedProduct
  (are you in a one-size-fits-all scheme with many other contractors?), fixedMonthlyFeeOnly
  (is your accountant a fee-only adviser who leaves decisions to you?), youControlDividends
  (do you decide your own salary/dividend levels?).
- **compute:** rules-based traffic-light, not tax arithmetic. Any of the four s.61B(1) involvement
  factors present AND a provider "carrying on a business of promoting/facilitating the use of
  companies" → **High risk (likely MSC)**. Fee-only adviser + contractor controls own decisions →
  **Low risk (accountancy services exemption)**. Mixed → **Review**. Output = risk band + which factor
  triggered + plain-English consequence (all income taxed as employment via PAYE; PAYE/NIC debt can be
  transferred to the director personally under the MSC debt-transfer provisions).
- **worked example:** "provider takes a % of my invoices, puts me in their standard scheme, sets my
  dividends" → three factors + promoter → **High risk**, deemed-employment + personal debt-transfer
  warning, CTA to specialist review.
- **premium:** no. **priority:** P1. (No money output → no band bug exposure; still add the honest
  "this is an indicator, not an HMRC determination" disclaimer.)

### NEW-3 · IR35 Status Indicator (CEST-lite / SDC) — **P1 · public**
- **slug:** `ir35-status-indicator`
- **purpose:** A weighted, plain-English inside/outside IR35 indicator built on the three core case-law
  tests (personal service / substitution, control, mutuality of obligation) plus SDC and business-on-
  own-account factors. Not HMRC's CEST; a directional check that tells a contractor which way their
  working practices point before a proper contract review.
- **target queries / evidence:** DFS "ir35 status checker" sv 70 + "hmrc ir35 status checker"; ir35 own
  GSC "ir35 tests", "mutuality of obligation", "substitution clause", "deemed employment",
  "ir35 contract check", "statement of work ir35". **Piggyback (strongest signal):** medical Bing
  positions 1–7 with clicks — "how to avoid ir35 as a locum dr", "are gps outside ir35", "gp locums
  work outside ir35 since use their own equipment", "ir35 and nhs locum". Cross-vertical demand ir35
  currently has no tool to capture. **Differentiated:** most competitor "status" pages are content, not
  an interactive weighted indicator with a status determination narrative.
- **fields (select/yes-no):** substitutionRight (unfettered / with client approval / none),
  controlOverHow (you decide / negotiated / client directs), mutuality (project-by-project, can refuse
  / expected to accept ongoing work), sdc (supervision, direction or control over how you do the work),
  ownEquipment (you provide your own equipment), financialRisk (you correct defects at own cost / carry
  insurance / bear cost of errors), partAndParcel (integrated like an employee: staff perks, fixed
  hours, line manager).
- **compute:** weighted score. Substitution and MOO are the strongest pointers (case-law primacy —
  weight ×3), control ×2, SDC/equipment/risk/part-and-parcel ×1. Score → **Likely outside / Borderline /
  Likely inside** band, with the two factors most pulling toward the result surfaced. No tax maths.
- **worked example:** GP locum: genuine substitute allowed (outside), sets own methods, provides own
  equipment, can refuse sessions → **Likely outside**, with "substitution + no MOO" flagged as decisive;
  disclaimer that the client's Status Determination Statement governs for medium/large clients.
- **premium:** no. **priority:** P1. Honest disclaimer: indicative only, not a substitute for a contract
  review or the client's SDS; overlaps with the CEST tool HMRC provides.

### PARKED / next-wave (designed, not in the 10 — keep fleet lean, revisit on demand data)

**P2 · Contractor Pension (employer-contribution) Optimiser** — `contractor-pension-optimiser`
- Purpose: show the corporation-tax and NIC saving of paying pension **from the company** vs taking the
  same money as dividends, for an outside-IR35 PSC. Evidence: ir35 GSC "contractor sipp" (pos 18.6),
  "sipp employer contribution" (pos 51), "contractor pension contributions"; DFS direct volume thin
  (sv ~10, KD 38) — that thinness is why it is **P2 not P1**. Compute: employer contribution is a
  deductible business expense (reduces CT at 19/25% + marginal via `corporationTax`), NIC-free, within
  the £60,000 annual allowance; compare net-to-pension of the pension route vs dividend route
  (dividends bear CT then dividend tax via `personalTax`). Reuses engine end to end → no band bug.
  Premium candidate (planner-grade). Promote to P1 if a pension content page starts ranking.

**P2 · Contractor Mortgage Affordability** — `contractor-mortgage-affordability-calculator`
- Purpose: estimate borrowing on a **contractor-friendly basis** (day rate × 5 × ~46 weeks annualised,
  the method specialist lenders use) vs the low salary+dividend basis high-street lenders wrongly apply,
  showing the borrowing gap. Evidence: DFS "mortgage for contractor" sv 880, "contractor mortgage
  calculator" sv 170, KD 0 — real volume, but it is a **lead-magnet / off-core** tool (mortgage, not
  tax), hence P2. Compute: annualisedIncome = dayRate × 5 × 46; borrowingContractorBasis =
  annualisedIncome × incomeMultiple (default 4.5); borrowingHighStreetBasis = (salary + dividends) ×
  multiple; gap = difference. No income-tax bands touched. Not premium. Promote if it earns links.

---

## 4. Roster summary

| # | slug | P | premium | status |
|---|---|---|---|---|
| existing ×7 | (see §1) | – | 3 also gated | live |
| NEW-1 | contractor-day-rate-calculator | P1 | no | design |
| NEW-2 | managed-service-company-risk-checker | P1 | no | design |
| NEW-3 | ir35-status-indicator | P1 | no | design |
| parked | contractor-pension-optimiser | P2 | candidate | design |
| parked | contractor-mortgage-affordability-calculator | P2 | no | design |

**Public count after NEW-1..3: 10** (target met). Two P2s held for the next wave so every shipped
tool is data-justified rather than padding to a number.

## 5. Build guardrails (for whoever implements)

1. Every income-tax path calls `personalTax` / the engine. Never re-derive the higher band. Never
   hardcode £74,870. Golden-test each new money tool against hand-computed values in a `*.test.ts`,
   same pattern as `tax2026.test.ts`.
2. MSC-risk and IR35-status are **indicators** (rules/weights), not tax calculators — clear disclaimers
   ("not an HMRC determination", "the client's SDS governs", "does not replace a contract review").
3. Register via one import + one array entry in `registry.ts` (fleet auto-wires gallery/sitemap/nav).
4. No em-dashes in any user-facing copy. Honest `note` in every tool. Rates only from `house_positions.md`.
5. Rate-equalisation lives inside NEW-1, not as its own tool (standalone demand sv ~10).
