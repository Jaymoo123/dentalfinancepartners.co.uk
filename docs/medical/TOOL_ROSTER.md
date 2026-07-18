# Medical Accountants — Calculator / Tool Roster Design

Design doc (not a build spec commitment). Architect: Opus. Date: 2026-07-17.
Brand: Medical Accountants (GPs, salaried doctors, locums, hospital consultants, private practice).
Target: ~10 public tools at Property-parity depth. Currently 3 public + 3 premium.

> **STATUS UPDATE 2026-07-18 (QA pass):** target reached. 10 public tools now live in
> `medical/web/src/lib/tools/registry.ts` (all 7 new tools built). Correction: the session-6
> wave-2 build had registered tools 4-7 and 10 in the PREMIUM registry only (non-indexable);
> the 2026-07-18 QA pass added proper public GenericTool configs + compute modules + goldens
> and wired them into the public registry. Premium siblings retained per the Premium column.
> llms.txt updated to list all 10.

No em-dashes in user-facing copy (locked rule). Every take-home / income-tax tool must
use the CORRECT band arithmetic (see "Income-tax band rule" at the foot of this doc).

---

## 1. Demand evidence (measured, not assumed)

Source: fresh Bing Webmaster pull `bing_query_data` (site_key='medical'), last date 2026-07-17
(~737 rows, all current). Theme aggregation by impressions:

| Theme | Distinct queries | Impressions | Read |
|---|---|---|---|
| NHS pension (AA / taper / scheme pays / superannuation) | 217 | 1,043 | Flagship. #1 vertical pain confirmed. |
| Locum (A/B forms, superannuation, take-home, IR35) | 143 | 772 | Second pillar. Form-A/B superannuation is the loud sub-theme. |
| Expenses (GMC, mileage, flat-rate, CPD, subsistence) | 70 | 384 | Strong, currently no tool. |
| GP partner (drawings, salary, superannuation, NI) | 69 | 338 | Strong, currently no tool. |
| VAT (medical exemption) | 76 | 332 | Content/eligibility, not a calculator (see §4). |
| Take-home / salary / PAYE | 19 | 75 | Covered by locum tool + proposed salaried tool. |
| IR35 | 6 | 22 | Thin on-site; covered as a lens inside locum/incorporation. |
| Incorporation | 1 | 3 | Thin on-site demand but vertical-essential (private practice). Keep existing. |

Representative real queries (verbatim, top of each theme):

- NHS pension: "what are income tax allowances on nhs pension" (24), "optimising my gp nhs
  pension" (20), "nhs pensions how to work out pensions allowance" (18), "annual allowance
  pension nhs" (12), "tax on nhs pension" (12), "medical consultant pension tax" (10).
- Superannuation (tiered contribution): "how much does a self employed gp pay in superannuation
  uk when earning £200,000" (8), "how much does a self employed gp pay in superannuation uk" (8),
  "pension contribution gp" (20). Cross-site piggyback: Dentists Bing has a near-identical loud
  cluster ("how to calculate a dentists superannuation earnings" 10, "superannuation tax bracket
  dentist" 8, "how do you calculate the nhs superannuation for dentist" 6) — same NHS tiered
  contribution table, confirms the calculation-intent demand.
- Locum Form A/B (superannuation record forms): "locum a form gp" (24), "gp locum a form april
  2026" (20), "gp locum form a" (16), "locum b form 2026" (15), "locum form b" (14),
  "locum a and b forms" (10). Dozens of tax-year-stamped variants. Users want to know what to
  put on the form, i.e. the superannuable-profit and tiered-contribution figure.
- GP partner: "gp partner wage" (12), "gp partner salary uk" (12), "how much subsistence expenses
  can i claim as a gp partner" (12), "gp partnership national insurance" (12), "difference between
  salaried gp and gp partner" (10), "do gp partners pay national insurance" (10),
  "gp patner income of 112k with pension paid equatea to how much without pension" (12).
- Salaried vs partner: "difference between salaried gp and gp partner" (10), "salaried gp vs gp
  partner" (8).
- Expenses: "should a salaried gp claim for mileage allowance for visiting patients at home" (12),
  "medicine flat rate expenses" (12), "hmrc doctors expenses" (12), "cpd for gp's for tax relief"
  (12, clk 6, pos 1), "gmc fees 2026" (15).

GSC for medical: not pulled this session (no medical GSC token found alongside the GA4/GSC kit;
the ga4_token.json covers GA4 properties, not Search Console for medical). Bing depth + cross-site
piggyback is sufficient to justify the roster. GSC re-pull flagged as a follow-up, not a blocker.

## 2. Competitor whitespace (DataForSEO live UK SERPs, google/organic, 2026-07-17)

`google_ads` search-volume returned mostly null for the long-tail calculator phrases (normal
for zero-volume-tagged tool queries); the SERP composition is the real signal.

| Candidate head query | Verdict | Top-10 makeup |
|---|---|---|
| gp superannuation calculator | WHITESPACE (empty SERP) | No relevant results returned. Pure gap. |
| nhs pension tax charge calculator | WHITESPACE (empty SERP) | No calculator ranks. Pure gap. |
| scheme pays calculator nhs | WHITESPACE for a tool | NHSBSA / BMA / SPPA guides only, no interactive accountant tool. |
| gp partner drawings calculator | WINNABLE | 1 public-sector calc (publicsectorcalculators.co.uk) + Reddit + savingtool; no medical-accountant tool. |
| salaried gp vs gp partner calculator | WINNABLE | Reddit + kudosaccounting + savingtool; no proper side-by-side comparison tool. |
| nhs pension annual allowance calculator | DOMINATED (but already ranking) | NHSBSA/NHS Employers ready reckoner, HL, BMA. Site already appears organically; keep + deepen, do not duplicate. |
| locum doctor take home pay calculator | DOMINATED | locumdoctortax.co.uk, mindthebleep, savingtool, acctek, gmprofessional. Existing locum tool competes; extend not add. |
| doctor tax calculator uk | DOMINATED | nhstaxcalculator, mindthebleep, juniordoctorfinance, savingtool. |
| consultant private practice tax calculator | PARTIAL | mindthebleep consultant calc + gov.uk + generic self-employed calcs; no consultant private-vs-NHS modeller. Winnable as a niche modeller. |

Net read: the differentiated wins are the NHS-pension-adjacent compute tools (superannuation tiered
contribution, scheme-pays cost, AA charge) and the GP-partner / salaried-vs-partner comparison tools.
Generic "doctor take-home" is saturated by doctor-finance hobby calculators, so we compete there only
through the vertical-specific angle (self-employed locum, already built) rather than a new generic one.

---

## 3. Existing tools (read first — extend, do not duplicate)

Public fleet (`Medical/web/src/lib/tools/registry.ts`):

1. `nhs-pension-annual-allowance` — NHS Pension Annual Allowance Calculator. Threshold income +
   pension growth in, tapered allowance + charge out. NOTE: current compute uses
   adjustedIncome = thresholdIncome + pensionGrowth (a simplification; real adjusted income adds
   the employer/deemed contribution). New pension tools should NOT re-simplify; see P1 notes.
2. `locum-tax-calculator` — Locum Doctor Tax Calculator. Gross in, net take-home out. Income tax +
   Class 4 NI + student loan. Self-employed only.
3. `private-practice-incorporation` — Sole trader vs Ltd. 2026/27 dividend rates (10.75/35.75/39.35),
   25% CT.

Premium islands (`Medical/web/src/lib/tools/premium/registry.ts`, blog-embedded, non-indexable):
`nhs-pension-premium`, `locum-take-home-premium`, `incorporation-premium`. These reuse the same
compute libs. Premium is additive; a public tool and its premium sibling can coexist.

Gaps vs demand: NO tool for superannuation (tiered contribution), scheme-pays cost, GP partner
drawings, salaried vs partner, salaried-doctor take-home, or expenses/flat-rate. That is where the
new roster lands.

---

## 4. New tool roster

Seven new public tools take the fleet from 3 to 10. Each is data-justified or vertical-essential.
Priority: P1 = build first (highest demand x whitespace). Premium column = whether a blog-embedded
premium sibling is also warranted.

### Summary table

| # | Slug | Purpose | Priority | Premium |
|---|---|---|---|---|
| 4 | `nhs-superannuation-tiered-contribution` | GP/locum NHS pension employee contribution by tier | P1 | Yes |
| 5 | `nhs-pension-scheme-pays` | Cost of settling an AA charge via Scheme Pays vs cash | P1 | Yes |
| 6 | `gp-partner-drawings-planner` | Partner profit share to monthly drawings after tax/super/NI | P1 | Yes |
| 7 | `salaried-gp-vs-partner` | Side-by-side net position: salaried GP vs GP partner | P1 | Yes |
| 8 | `salaried-doctor-take-home` | PAYE take-home for salaried GP / consultant (NHS + private) | P2 | No |
| 9 | `doctor-expenses-tax-relief` | Allowable expenses + medical flat-rate + CPD/GMC relief | P2 | No |
| 10 | `consultant-private-vs-nhs` | Marginal-rate modeller: extra private session vs pension impact | P2 | Yes |

Reaches the ~10 target exactly: 3 existing + 7 new = 10 public tools.

VAT is deliberately NOT a calculator. The 332 impressions are eligibility/rules intent
("vat medical exemption rules"), best served by a content page + a simple yes/no eligibility
checker if anything, not a numeric calculator. Left out of the roster to avoid thin filler.

---

### Tool 4 — `nhs-superannuation-tiered-contribution` (P1, premium: yes)

Purpose: the loudest un-served calculation on the site. Given NHS pensionable pay (or GP
superannuable profit), return the employee contribution using the 2025/26 tiered rate table, plus
the deemed employer contribution. This is exactly what a GP or locum needs to complete Form A/B and
to feed the AA and drawings tools.

Target queries (evidence): "how much does a self employed gp pay in superannuation uk when earning
£200,000" (8), "how much does a self employed gp pay in superannuation uk" (8), "pension
contribution gp" (20), "gp locum a form april 2026" (20), "locum b form 2026" (15) plus the whole
Form-A/B cluster (~200+ combined impressions). SERP: "gp superannuation calculator" is empty
whitespace. Cross-site: identical loud demand on Dentists (same NHS scheme).

Input fields:
- `role`: select — Salaried GP / GP partner (self-employed) / GP locum / Officer (hospital doctor).
- `pensionablePay`: currency — NHS pensionable pay for salaried/officer, OR superannuable profit
  for partners/locums. Help text switches by role.
- `taxYear`: select — 2025/26 (default), 2026/27 (rates confirmed at build time).
- `incomeTaxBand`: select (basic/higher/additional) — for the tax-relief-on-contribution note only.

Compute spec:
- Apply the NHS Pension employee contribution TIER TABLE (2025/26 tiers, banded by pensionable pay;
  BUILDER MUST source the current NHSBSA tier thresholds/rates at build time — these change annually
  and are not in this doc's ground-truth block). Contribution = pensionablePay x tier rate.
- Deemed employer contribution rate applied (currently 23.7% of pensionable pay for 2024/25 onward;
  builder to confirm the live figure — this feeds "adjusted income" in the AA tool).
- Net-of-relief cost = employee contribution x (1 - marginal income-tax rate) for the note.
- Output: employee contribution (£ and %), deemed employer contribution (£), combined pension input
  proxy, and a "carry this figure into the Annual Allowance calculator" cross-link.

Worked example: GP partner, superannuable profit £120,000, 2025/26. Tier for £120k band applied
(builder inserts live rate), e.g. 12.5% => employee contribution ~£15,000; deemed employer 23.7%
=> ~£28,440; combined ~£43,440 (feeds AA growth proxy). Higher-rate relief brings net employee cost
to ~£9,000.

Premium sibling: yes — add a multi-year projection + "which tier will next year's pay rise push me
into" band-crossing warning.

Note for builder: this is NOT a take-home tool, so the income-tax band rule below is only relevant
to the optional relief note, not to a full tax computation.

---

### Tool 5 — `nhs-pension-scheme-pays` (P1, premium: yes)

Purpose: once the AA tool shows a charge, the next question is always "do I pay it now in cash or use
Scheme Pays and lose future pension?". No accountant tool ranks for this; only NHSBSA/BMA guides.

Target queries: "scheme pays calculator nhs" (whitespace SERP), plus the AA cluster spilling into
scheme-pays intent ("nhs pensions and no pension input amount", "does the annual allowance for
pension apply to capitalisation cost in nhs"). Premium nhs-pension config already references Scheme
Pays eligibility (charge > £2,000, growth > £60k, 31 July election) — this promotes that to a tool.

Input fields:
- `annualAllowanceCharge`: currency — the AA charge (default pulled conceptually from tool 1).
- `age`: number — current age (for the actuarial reduction factor band).
- `marginalRate`: select (basic/higher/additional) — for the "cash cost after any relief" framing.

Compute spec:
- Eligibility gate: charge must exceed £2,000 AND scheme growth exceeded £60,000 to elect
  mandatory Scheme Pays (state clearly; below that, voluntary only).
- Cash option = the charge, payable now.
- Scheme Pays option = charge settled by the scheme, converted to a pension debit that grows with
  the scheme's actuarial factor until retirement. Show the estimated pension reduction using an
  age-banded actuarial factor (builder sources the current NHSBSA Scheme Pays factor table; this is
  the "hardware calibration knob" — the factor is not a fixed constant and must be tunable).
- Output: side-by-side "Pay in cash now: £X" vs "Scheme Pays: £0 now, ~£Y/yr less pension at 68",
  plus a break-even framing and the 31 July election-deadline reminder.

Worked example: charge £8,000, age 45, higher rate. Cash cost now £8,000. Scheme Pays: £0 now; using
an illustrative factor the £8,000 debit grows to a ~£380/yr pension reduction from age 68 (builder
inserts live factor). Verdict copy: neither is "free"; Scheme Pays trades cash now for pension later.

Premium sibling: yes — layer a 3-year carry-forward interaction (does unused prior-year AA remove
the charge before Scheme Pays is even needed?).

---

### Tool 6 — `gp-partner-drawings-planner` (P1, premium: yes)

Purpose: translate an annual partnership profit share into sustainable monthly drawings after tax,
Class 4 NI, and superannuation are set aside. GP partners routinely over- or under-draw because tax
and super are paid in lumps; this smooths it.

Target queries: "gp partner wage" (12), "gp partner salary uk" (12), "if you are a partner in a gp
practice do you put money into the business" (12), "gp partnership national insurance" (12),
"do gp partners pay national insurance" (10), "gp partner drawings - take home pay per month"
(Reddit ranks for this — demand, no tool). SERP: only publicsectorcalculators + Reddit; winnable.

Input fields:
- `profitShare`: currency — annual partnership profit share.
- `superannuablePay`: currency — superannuable profit (help: use tool 4 output).
- `studentLoanPlan`: select (none/plan1/plan2/plan4).
- `taxReservePct`: number, default 30 — optional buffer the partner wants held back on top of the
  computed liability (calibration knob for cautious partners).

Compute spec (this IS a take-home tool — apply the income-tax band rule below):
- Taxable profit = profitShare (partnership profit is trading income; super is NOT deductible for
  income tax but IS collected — model both flows).
- Income tax on profitShare using the CORRECT bands: personal allowance taper above £100k; basic
  band fixed £37,700; higher-band width = (125,140 - PA) - 37,700; additional above £125,140.
- Class 4 NI: 6% on £12,570-£50,270, 2% above (Class 2 flat, note only).
- Superannuation employee contribution set aside (from tool 4 / superannuablePay x tier rate).
- Student loan if applicable.
- Sustainable monthly drawings = (profitShare - income tax - Class 4 NI - super - student loan) / 12,
  optionally net of the extra taxReservePct buffer shown separately.
- Output: headline monthly drawings, the annual set-aside breakdown, and a "vs salaried GP" cross-link
  to tool 7.

Worked example: profit share £120,000, superannuable £120,000, no student loan, PA fully tapered off
above £125,140 (here PA still partly present at £120k: PA = 12,570 - (120,000-100,000)/2 = £2,570).
Income tax computed on the reduced-PA bands; Class 4 NI ~£3,244; super per tool 4. Monthly sustainable
drawings shown after all set-asides.

Premium sibling: yes — cashflow calendar (payments-on-account timing, super collection dates).

---

### Tool 7 — `salaried-gp-vs-partner` (P1, premium: yes)

Purpose: the classic career-decision comparison. Same headline pay, very different net position once
you factor employer NIC exposure, superannuation tier, drawings volatility, and self-employed NI.

Target queries: "difference between salaried gp and gp partner" (10, pos 1.2), "salaried gp vs gp
partner" (8, pos 1), "gp partner salary uk" (12). SERP: Reddit + kudosaccounting + savingtool; no
proper side-by-side. Winnable and high-intent.

Input fields:
- `salariedPay`: currency — salaried GP gross salary offer.
- `partnerProfitShare`: currency — partner profit share offer.
- `superTier`: informational — derived from each pay level via tool 4 logic.
- `studentLoanPlan`: select.

Compute spec (take-home tool — income-tax band rule applies to BOTH columns):
- Salaried column: PAYE income tax + Class 1 employee NI (8% / 2% bands) + employee super (tier on
  salary) + student loan => net.
- Partner column: income tax + Class 4 NI + employee super (tier on superannuable profit) + student
  loan => net; flag drawings volatility and that partner bears a share of practice risk.
- Output: two net-pay columns, the £ and % difference, and a plain-English "the extra £X gross as a
  partner nets £Y after the higher super tier and self-employed profile" verdict. No advice, just the
  numbers plus the non-financial factors listed as a note (indemnity, holiday, autonomy, risk).

Worked example: salaried £90,000 vs partner £110,000. Both run through correct bands; partner's higher
super tier and Class 4 vs Class 1 shift the net gap below the £20k headline gap. Tool shows the real net.

Premium sibling: yes — add pension-value column (partner vs salaried accrual differs) and a
5-year projection.

---

### Tool 8 — `salaried-doctor-take-home` (P2, premium: no)

Purpose: PAYE take-home for a salaried GP or hospital doctor, including NHS super deduction and any
private sessional income on top. Fills the gap between the self-employed locum tool and the partner
tools. Generic "doctor take-home" SERP is saturated, so this competes on the vertical-specific NHS
super + private-top-up angle, not as a generic salary calculator.

Target queries: "gp salary with tax" (12), "gp salary uk" cluster, "how is salaried gp pension
contributions paid?" (6), "salaried gp claim for mileage" (12). Lower priority because the generic
NHS salary calculators (nhstaxcalculator, mindthebleep, savingtool) dominate the head term.

Input fields:
- `nhsSalary`: currency.
- `privateSessionalIncome`: currency, default 0 (self-assessment top-up).
- `superTierPay`: informational (derived).
- `studentLoanPlan`: select.

Compute spec (take-home tool — income-tax band rule applies):
- PAYE income tax on total (NHS salary + private), correct bands incl. PA taper.
- Class 1 NI on the salaried portion; Class 4 on the private self-employed portion.
- Employee NHS super deduction (tier on NHS salary).
- Output: monthly and annual net, deduction breakdown, note that private income needs a self-
  assessment return.

Worked example: NHS salary £85,000 + private £15,000. Correct bands (PA intact below £100k),
Class 1 on salary, Class 4 on private, super tier on the £85k salary => net.

Premium: no. A public tool is enough; demand does not justify a premium island.

---

### Tool 9 — `doctor-expenses-tax-relief` (P2, premium: no)

Purpose: estimate the tax relief a doctor can claim on allowable professional expenses, including the
HMRC medical flat-rate expense, GMC/BMA/royal-college fees, indemnity, and CPD. Answers the loud
"what can I claim" cluster with an actual pounds-of-relief figure rather than a list.

Target queries: "should a salaried gp claim for mileage allowance for visiting patients at home" (12),
"medicine flat rate expenses" (12), "hmrc doctors expenses" (12), "cpd for gp's for tax relief"
(12, clk 6, pos 1), "gmc fees 2026" (15), "how much subsistence expenses can i claim as a gp
partner" (12), "is cpd tax deductible" (6). Strong 384-impression theme, zero current tool.

Input fields (checkbox/currency mix):
- `marginalRate`: select (basic/higher/additional) — relief is at the marginal rate.
- `gmcFees`, `indemnity`, `royalCollegeBma`, `cpdCourses`, `journalsEquipment`: currency each.
- `businessMileage`: number (miles) — apply AMAP: 45p first 10,000 miles rising to 55p from 6 Apr
  2026 (ground truth), 25p thereafter. Salaried doctors claim mileage relief where not reimbursed.
- `useFlatRate`: checkbox — apply the HMRC medical flat-rate expense instead of itemised where
  higher (builder sources the current flat-rate figure).

Compute spec:
- Total allowable = sum of itemised costs + AMAP mileage relief (or flat rate if elected/higher).
- Tax relief = total allowable x marginal rate. NI relief note for self-employed (reduces Class 4).
- Output: total claimable expenses, tax relief in pounds, and a "salaried doctors claim via a P87 or
  self-assessment; partners/locums via the return" routing note.

Worked example: higher-rate GP, GMC £433 + indemnity £4,000 + royal college £500 + CPD £1,200 +
3,000 business miles at 55p (£1,650) = £7,783 allowable => relief at 40% = ~£3,113.

Premium: no. Straightforward relief estimate; no comparison depth to justify a premium island.

Builder note: AMAP 55p first-10k applies from 6 Apr 2026 (per ground truth); 45p for 2025/26.
Pick the rate by the selected tax year. GMC fee, flat-rate figure and college fees must be sourced
live at build (they change annually) — do not hardcode from this doc.

---

### Tool 10 — `consultant-private-vs-nhs` (P2, premium: yes)

Purpose: for hospital consultants weighing extra private sessions, model the marginal net of one more
private session AFTER the interaction with the AA taper. A consultant near the £200k threshold can
find an extra private session triggers taper and is effectively taxed above 60% once lost allowance
is counted. This is a genuinely under-served, high-value niche.

Target queries: "medical consultant pension tax" (10), "consultant private practice tax calculator"
(partial SERP), plus the AA/taper cluster. Vertical-essential for the consultant segment even though
raw volume is thinner than the GP themes.

Input fields:
- `nhsPensionablePay`: currency — drives adjusted income + deemed employer contribution.
- `existingPrivateIncome`: currency.
- `extraSessionValue`: currency — the marginal private income being considered.
- `otherIncome`: currency, default 0.

Compute spec (take-home tool — income-tax band rule applies):
- Compute threshold income and adjusted income (adjusted = threshold + deemed employer NHS
  contribution, per tool 4's employer rate — do NOT re-use tool 1's simplification of
  threshold + growth).
- Determine tapered AA before and after the extra session (taper: -£1 per £2 of adjusted income above
  £260,000, floor £10,000; both tests: threshold > £200k AND adjusted > £260k).
- Marginal net of the extra session = extra income - income tax (correct bands, incl. PA taper
  60% zone £100k-£125,140) - NI - any additional AA charge caused by the newly lost allowance.
- Output: "£X extra gross nets £Y" with the effective marginal rate highlighted (often >60%, sometimes
  >80% once AA charge is included), and a verdict on whether the session is worth it net.

Worked example: consultant NHS pensionable £150k, existing private £70k (threshold ~£220k, adjusted
~£220k + deemed employer ~£35k = ~£255k, just under taper). Extra session £15k pushes adjusted over
£260k, tapers AA, and lands in the 45% band => marginal effective rate shown well above headline 45%.

Premium sibling: yes — full multi-session curve showing the net-per-session cliff.

---

## 5. Income-tax band rule (LOCKED — every take-home / income-tax tool)

Flagged tools that MUST use this: 6, 7, 8, 10 (and any relief-at-marginal-rate logic in 4, 5, 9).

- Personal allowance (PA) = £12,570, tapered £1 for every £2 of adjusted net income above £100,000,
  fully gone at £125,140.
- Basic-rate band is FIXED at £37,700 (income £12,571 to £50,270 when PA is full).
- Higher-rate band width = (125,140 - PA) - 37,700. Do NOT use a fixed £74,870; that is only correct
  when PA = £12,570. Once PA tapers, the higher band widens, which is what creates the ~60% effective
  zone between £100,000 and £125,140.
- Additional rate (45%) above £125,140.
- Dividend rates 2026/27: 10.75% / 35.75% / 39.35% (FA 2026 s.4). BADR 18% from 6 Apr 2026.
  Employer NIC 15% with £5,000 secondary threshold from Apr 2025.

## 6. NHS / pension ground truth used

- NHS pension standard annual allowance £60,000; taper thresholds threshold income £200,000 /
  adjusted income £260,000; floor £10,000; taper -£1 per £2 above £260,000.
- Adjusted income = threshold income + deemed employer NHS contribution (NOT threshold + growth;
  tool 1 currently simplifies this — new tools 4/10 must model the deemed employer rate properly).
- AMAP mileage: 45p first 10,000 miles for 2025/26, rising to 55p from 6 Apr 2026 (then 25p).

Figures that CHANGE ANNUALLY and MUST be sourced live at build (not hardcoded from this doc):
NHS employee superannuation tier thresholds/rates, deemed employer contribution rate, Scheme Pays
actuarial factor table, HMRC medical flat-rate expense, GMC/royal-college fee levels.

## 7. Build order

P1 (build first, highest demand x whitespace): 4 superannuation, 5 scheme-pays, 6 partner drawings,
7 salaried-vs-partner. These four plus the existing 3 already give a strong 7-tool fleet centred on
the #1 NHS-pension pain.

P2: 8 salaried take-home, 9 expenses relief, 10 consultant private-vs-NHS. Completes the 10-tool
target and rounds out salaried and consultant segments.

## 8. Follow-ups / open items

- GSC pull for medical was not run this session (no medical Search Console token in the kit). Re-pull
  before build to confirm Google-side demand mirrors Bing; low risk given Bing depth + cross-site.
- Superannuation tier table, deemed employer rate, Scheme Pays factors, flat-rate and fee figures are
  the load-bearing annual variables. Each P1/P2 tool spec above names which it needs; builder sources
  them live and leaves them tunable (the calibration knob), never baked in as constants.
