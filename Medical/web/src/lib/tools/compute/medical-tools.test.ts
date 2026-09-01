/**
 * Golden tests for Medical site calculator compute libs.
 *
 * All values are pinned to the OLD component outputs (pre-extraction).
 * Any mismatch means the extraction changed behaviour — that is a STOP.
 *
 * STALE-FIGURE NOTES (resolved):
 * - LocumTax student loan thresholds: extraction pinned the OLD 2024/25 values
 *   (24,990/27,295/31,395); the three SL tests below were then deliberately
 *   updated to the user-approved 2025/26 values on 2026-06-11, then re-pinned to
 *   the 2026/27 values (26,900/29,385/33,795) on 2026-08-26 from gov.uk
 *   rates-and-thresholds-for-employers-2026-to-2027, with derivations in each test.
 * - LocumTax Class 4: pinned values charged Class 4 on income after the pension.
 *   That was a defect, not behaviour worth preserving. Corrected 2026-08-26 to
 *   charge it on trading profit per SSCBA 1992 s.15; the affected expectations
 *   carry the old figure in a comment.
 * - LocumTax plan4 label in old UI read "postgraduate" but threshold/rate
 *   matches Scottish Plan 4 — fixed in the new config ("Plan 4 (Scotland)").
 */

import { describe, it, expect } from "vitest";
import { calcLocumTax } from "./locum-tax";
import {
  calcNHSPension,
  CARRY_FORWARD_NOT_ENTERED,
  CARRY_FORWARD_ENTERED,
  NHS_ONLY_ASSUMED,
} from "./nhs-pension";
import { nhsPensionTool } from "../configs/nhs-pension-calculator";
import { calcIncorporation, calcCorporationTax } from "./incorporation";
import { calcGpPartnerDrawings } from "./gp-partner-drawings";
import {
  calcSchemePays,
  getEstimatingFactor,
  SCHEME_PAYS_CURRENT_REAL_INTEREST_RATE,
  SCHEME_PAYS_REAL_INTEREST_RATES,
} from "./nhs-pension-scheme-pays";
import { calcConsultantPrivateVsNhs, calcIncomeTax, calcClass4, calcAA } from "./consultant-private-vs-nhs";
import { calcNHSSuperTieredContribution } from "./nhs-superannuation-tiered-contribution";

// ── LocumTaxCalculator golden tests ───────────────────────────────────────────

describe("calcLocumTax — golden tests (pinned to OLD component outputs)", () => {
  it("default inputs: gross=80000 expenses=5000 pension=10000 no SL", () => {
    // netIncome = 80000 - 5000 - 10000 = 65000
    // taxableIncome = 65000 - 12570 = 52430
    // basicBandIncome = min(52430, 37700) = 37700 => 7540
    // higherBandIncome = min(52430 - 37700, 74870) = 14730 => 5892
    // incomeTax = 7540 + 5892 = 13432
    // Class 4 is charged on PROFIT (80000 - 5000 = 75000), NOT on net income
    // after the pension. SSCBA 1992 s.15; verified 2026-08-26.
    // NI: niableBand1 = min(75000-12570, 37700) = 37700 * 0.06 = 2262
    //     niableBand2 = (75000 - 50270) * 0.02 = 24730 * 0.02 = 494.6
    // NI = 2262 + 494.6 = 2756.6
    // (pre-fix this asserted £2,556.60, computed on 65000, understating it by £200)
    const r = calcLocumTax({ grossIncome: 80000, expenses: 5000, pensionContributions: 10000, studentLoanPlan: "none" });
    expect(r.profit).toBe(75000);
    expect(r.netIncome).toBe(65000);
    expect(r.incomeTax).toBeCloseTo(13432, 0);
    expect(r.nationalInsurance).toBeCloseTo(2756.6, 1);
    expect(r.studentLoanRepayment).toBe(0);
    expect(r.netTakeHome).toBeCloseTo(65000 - 13432 - 2756.6, 0);
    expect(r.effectiveTaxRate).toBeGreaterThan(0);
  });

  it("GUARD: Class 4 is computed on profit and is unaffected by the pension input", () => {
    // The defect this replaces: pension contributions were deducted before
    // Class 4. Same profit, three different pension figures, one Class 4 answer.
    const base = { grossIncome: 80000, expenses: 5000, studentLoanPlan: "none" as const };
    const noPension = calcLocumTax({ ...base, pensionContributions: 0 });
    const somePension = calcLocumTax({ ...base, pensionContributions: 10000 });
    const bigPension = calcLocumTax({ ...base, pensionContributions: 40000 });

    expect(somePension.nationalInsurance).toBe(noPension.nationalInsurance);
    expect(bigPension.nationalInsurance).toBe(noPension.nationalInsurance);

    // And it equals Class 4 computed directly on the £75,000 profit.
    const expected = (50270 - 12570) * 0.06 + (75000 - 50270) * 0.02;
    expect(somePension.nationalInsurance).toBeCloseTo(expected, 6);

    // Income tax, which pension relief genuinely does affect, must still move.
    expect(somePension.incomeTax).toBeLessThan(noPension.incomeTax);
  });

  it("plan2 student loan: gross=80000 expenses=5000 pension=10000", () => {
    // netIncome = 65000; threshold plan2 = 29385 (2026/27, re-pinned 2026-08-26)
    // SL = (65000 - 29385) * 0.09 = 35615 * 0.09 = 3205.35
    const r = calcLocumTax({ grossIncome: 80000, expenses: 5000, pensionContributions: 10000, studentLoanPlan: "plan2" });
    expect(r.studentLoanRepayment).toBeCloseTo(3205.35, 1);
  });

  it("plan1 student loan: gross=60000 expenses=3000 pension=5000", () => {
    // netIncome = 52000; threshold plan1 = 26900 (2026/27, re-pinned 2026-08-26)
    // SL = (52000 - 26900) * 0.09 = 25100 * 0.09 = 2259
    const r = calcLocumTax({ grossIncome: 60000, expenses: 3000, pensionContributions: 5000, studentLoanPlan: "plan1" });
    expect(r.studentLoanRepayment).toBeCloseTo(2259, 1);
  });

  it("plan4 student loan: gross=70000 expenses=4000 pension=8000", () => {
    // netIncome = 58000; threshold plan4 = 33795 (2026/27, re-pinned 2026-08-26)
    // SL = (58000 - 33795) * 0.09 = 24205 * 0.09 = 2178.45
    const r = calcLocumTax({ grossIncome: 70000, expenses: 4000, pensionContributions: 8000, studentLoanPlan: "plan4" });
    expect(r.studentLoanRepayment).toBeCloseTo(2178.45, 1);
  });

  it("income below personal allowance: no income tax", () => {
    const r = calcLocumTax({ grossIncome: 20000, expenses: 5000, pensionContributions: 5000, studentLoanPlan: "none" });
    expect(r.netIncome).toBe(10000);
    expect(r.incomeTax).toBe(0);
  });

  it("profit below NI lower limit: no NI", () => {
    // Profit, not net income, is the test. 13000 - 1000 = 12000 profit < 12570.
    const r = calcLocumTax({ grossIncome: 13000, expenses: 1000, pensionContributions: 5000, studentLoanPlan: "none" });
    expect(r.profit).toBe(12000);
    expect(r.nationalInsurance).toBe(0);
  });

  it("profit above NI lower limit still pays Class 4 even when the pension takes net income below it", () => {
    // 15000 - 1000 = 14000 profit; the 5000 pension does not shelter it.
    const r = calcLocumTax({ grossIncome: 15000, expenses: 1000, pensionContributions: 5000, studentLoanPlan: "none" });
    expect(r.netIncome).toBe(9000);
    expect(r.nationalInsurance).toBeCloseTo((14000 - 12570) * 0.06, 6); // 85.80
  });

  it("additional rate income: gross=200000 expenses=10000 pension=0", () => {
    // netIncome = 190000; PA fully tapered to £0 above £125,140, so taxable = 190000
    // basic: 37700 * 0.2 = 7540
    // higher: (125140 - 37700) * 0.4 = 87440 * 0.4 = 34976
    // additional: (190000 - 125140) * 0.45 = 64860 * 0.45 = 29187
    // incomeTax = 7540 + 34976 + 29187 = 71703
    // (pre-fix this asserted £66,675, using the fixed £74,870 higher band and an
    // untapered PA — both wrong above £100k)
    const r = calcLocumTax({ grossIncome: 200000, expenses: 10000, pensionContributions: 0, studentLoanPlan: "none" });
    expect(r.incomeTax).toBeCloseTo(71703, 0);
  });

  it("pinning: £150k net income -> £53,703 income tax (PA fully tapered, 45%-band split)", () => {
    // netIncome = 150000, PA tapered to £0; 37,700@20% + 87,440@40% + 24,860@45%
    const r = calcLocumTax({ grossIncome: 150000, expenses: 0, pensionContributions: 0, studentLoanPlan: "none" });
    expect(r.incomeTax).toBeCloseTo(53703, 0); // buggy = £54,332
  });

  it("pinning: £45k unchanged by the fix -> £6,486 income tax (PA full)", () => {
    const r = calcLocumTax({ grossIncome: 45000, expenses: 0, pensionContributions: 0, studentLoanPlan: "none" });
    expect(r.incomeTax).toBeCloseTo(6486, 0);
  });

  it("ED-01: NI lower limit constant is 12570 (guard test)", () => {
    // Profit exactly at the lower profits limit: no Class 4.
    const r = calcLocumTax({ grossIncome: 20000, expenses: 7430, pensionContributions: 0, studentLoanPlan: "none" });
    expect(r.profit).toBe(12570);
    expect(r.nationalInsurance).toBe(0);
  });
});

// ── NHSPensionCalculator golden tests ─────────────────────────────────────────

describe("calcNHSPension — golden tests (pinned to OLD component outputs)", () => {
  it("default inputs: threshold=150000 growth=40000 taxBand=higher — not tapered", () => {
    // adjustedIncome = 150000 + 40000 = 190000
    // Not tapered (threshold < 200000)
    // annualAllowance = 60000
    // excess = max(0, 40000 - 60000) = 0
    const r = calcNHSPension({ thresholdIncome: 150000, pensionGrowth: 40000, taxBand: "higher" });
    expect(r.adjustedIncome).toBe(190000);
    expect(r.annualAllowance).toBe(60000);
    expect(r.isTapered).toBe(false);
    expect(r.excess).toBe(0);
    expect(r.taxCharge).toBe(0);
  });

  it("GUARD: adjusted income is threshold income plus TOTAL pension input, not the NHS input alone", () => {
    // The defect this replaces: adjusted income was built from the NHS input
    // amount only, so a doctor with a second scheme could be told they were not
    // tapered when they were. FA 2004 s.228ZA; HMRC PTM057100, read 2026-08-26.
    const nhsOnly = calcNHSPension({ thresholdIncome: 210000, pensionGrowth: 45000, taxBand: "higher" });
    // 210000 + 45000 = 255000, below the 260000 adjusted income limit: no taper.
    expect(nhsOnly.adjustedIncome).toBe(255000);
    expect(nhsOnly.isTapered).toBe(false);

    // Same doctor, £20,000 into a SIPP. Adjusted income must pick that up.
    const withSipp = calcNHSPension({
      thresholdIncome: 210000,
      pensionGrowth: 45000,
      taxBand: "higher",
      otherPensionInput: 20000,
    });
    expect(withSipp.totalPensionInput).toBe(65000);
    expect(withSipp.adjustedIncome).toBe(275000); // 210000 + 65000, NOT 255000
    expect(withSipp.isTapered).toBe(true);
    // reduction = (275000 - 260000) / 2 = 7500; allowance = 52500
    expect(withSipp.annualAllowance).toBe(52500);
    // excess is measured on total input across all schemes: 65000 - 52500
    expect(withSipp.excess).toBe(12500);

    // The shortcut construction must NOT be what the code computes.
    expect(withSipp.adjustedIncome).not.toBe(210000 + 45000);
  });

  it("GUARD: carry-forward is applied, earliest year first, and can extinguish the charge", () => {
    const before = calcNHSPension({ thresholdIncome: 210000, pensionGrowth: 70000, taxBand: "higher" });
    expect(before.excess).toBe(20000);
    expect(before.taxCharge).toBe(8000);

    // £20,000 of unused allowance across the three prior years takes it to nil.
    const after = calcNHSPension({
      thresholdIncome: 210000,
      pensionGrowth: 70000,
      taxBand: "higher",
      carryForward: [8000, 7000, 5000],
    });
    expect(after.excess).toBe(20000); // excess before carry-forward is unchanged
    expect(after.carryForwardUsed).toBe(20000);
    expect(after.chargeableExcess).toBe(0);
    expect(after.taxCharge).toBe(0);

    // Partial carry-forward reduces rather than removes.
    const partial = calcNHSPension({
      thresholdIncome: 210000,
      pensionGrowth: 70000,
      taxBand: "higher",
      carryForward: [5000, 0, 0],
    });
    expect(partial.carryForwardUsed).toBe(5000);
    expect(partial.chargeableExcess).toBe(15000);
    expect(partial.taxCharge).toBe(6000);
  });

  it("tapered case: threshold=210000 growth=70000 taxBand=higher", () => {
    // adjustedIncome = 280000 > 260000 AND threshold > 200000
    // excessIncome = 280000 - 260000 = 20000
    // reduction = 10000
    // annualAllowance = max(10000, 60000 - 10000) = 50000
    // excess = max(0, 70000 - 50000) = 20000
    // taxCharge = 20000 * 0.4 = 8000
    const r = calcNHSPension({ thresholdIncome: 210000, pensionGrowth: 70000, taxBand: "higher" });
    expect(r.isTapered).toBe(true);
    expect(r.annualAllowance).toBe(50000);
    expect(r.excess).toBe(20000);
    expect(r.taxCharge).toBe(8000);
  });

  it("minimum allowance floor: extreme tapering", () => {
    // threshold=250000 growth=100000
    // adjustedIncome = 350000 > 260000
    // excessIncome = 90000; reduction = 45000
    // annualAllowance = max(10000, 60000 - 45000) = 15000
    // excess = 100000 - 15000 = 85000
    // taxCharge = 85000 * 0.45 = 38250 (additional rate)
    const r = calcNHSPension({ thresholdIncome: 250000, pensionGrowth: 100000, taxBand: "additional" });
    expect(r.annualAllowance).toBe(15000);
    expect(r.excess).toBe(85000);
    expect(r.taxCharge).toBe(38250);
  });

  it("minimum floor capped at 10000", () => {
    // threshold=300000 growth=200000 -> adjusted=500000
    // excessIncome = 240000; reduction = 120000
    // annualAllowance = max(10000, 60000-120000) = 10000 (floor)
    const r = calcNHSPension({ thresholdIncome: 300000, pensionGrowth: 200000, taxBand: "basic" });
    expect(r.annualAllowance).toBe(10000);
    expect(r.isTapered).toBe(true);
  });

  it("basic rate tax charge", () => {
    // threshold=210000 growth=70000; excess=20000; basic tax = 20000 * 0.2 = 4000
    const r = calcNHSPension({ thresholdIncome: 210000, pensionGrowth: 70000, taxBand: "basic" });
    expect(r.taxCharge).toBe(4000);
  });

  it("threshold income >= 200000 but adjusted income <= 260000: no taper", () => {
    // threshold=205000 growth=50000; adjusted=255000 < 260000 (adjusted limit not breached)
    const r = calcNHSPension({ thresholdIncome: 205000, pensionGrowth: 50000, taxBand: "higher" });
    expect(r.isTapered).toBe(false);
    expect(r.annualAllowance).toBe(60000);
  });
});

// ── IncorporationCalculator golden tests ──────────────────────────────────────

describe("calcIncorporation — golden tests (pinned to OLD component outputs)", () => {
  it("default inputs: private=100000 expenses=15000 salary=12570 nhs=50000", () => {
    // Sole trader (total £135,000 > £125,140 so PA fully tapers to £0):
    //   soleTraderProfit = 85000; total = 135000; PA=0; taxableAfterPA = 135000
    //   basicBand = 37700 * 0.2 = 7540
    //   higherBand = (125140-37700) * 0.4 = 87440 * 0.4 = 34976
    //   additional = (135000-125140) * 0.45 = 9860 * 0.45 = 4437
    //   incomeTax = 46953
    //   NI: niable1 = min(85000-12570, 37700) = 37700 * 0.06 = 2262
    //       niable2 = (85000-50270) * 0.02 = 34730 * 0.02 = 694.6
    //   NI = 2956.6
    //   totalTax = 46953 + 2956.6 = 49909.6
    // Ltd (unchanged by the PA-taper fix; dividends stay below £125,140 gross):
    // Ltd, re-derived 2026-09-01 after the salary-before-CT, marginal-relief
    // and employer-NIC corrections:
    //   companyProfit = 85000
    //   employerNIC = (12570 - 5000) * 0.15 = 7570 * 0.15 = 1135.50
    //   chargeableProfit = 85000 - 12570 - 1135.50 = 71294.50 (marginal band)
    //   CT = 71294.50*0.25 - (3/200)*(250000 - 71294.50)
    //      = 17823.625 - 0.015*178705.50 = 17823.625 - 2680.5825 = 15143.0425
    //   dividendAmount = 71294.50 - 15143.0425 = 56151.4575
    //   taxableDividends = 56151.4575 - 500 = 55651.4575
    //   totalIncomeBeforeDividends = 50000 + 12570 = 62570
    //   basicRateRemaining = max(0, 50270 - 62570) = 0 (in higher band)
    //   higherRateRemaining = max(0, 125140 - 62570) = 62570
    //   higherRateDividends = min(55651.4575, 62570) = 55651.4575
    //   dividendTax = 55651.4575 * 0.3575 = 19895.39605625
    //   payeIncome = 50000 + 12570 = 62570; PA 12570; taxable 50000
    //     basic 37700*0.2 = 7540; higher (50000-37700)*0.4 = 12300*0.4 = 4920
    //     payeIncomeTax = 12460   (the OLD model taxed the NHS £50,000 only,
    //     charging £7,486 and leaving the director salary untaxed)
    //   ltdTotalTax = 15143.0425 + 1135.50 + 19895.39605625 + 12460 = 48633.93855625
    //   taxSavings = 49909.60 - 48633.93855625 = 1275.66144375
    //   (pre-correction this asserted CT £21,250 / ltdTotalTax £46,854.10 /
    //    taxSavings £3,055.50, on a flat 25% charged before the salary)
    const r = calcIncorporation({ privateIncome: 100000, expenses: 15000, desiredSalary: 12570, nhsIncome: 50000 });
    expect(r.soleTraderTaxableIncome).toBe(135000);
    expect(r.companyProfit).toBe(85000);
    expect(r.employerNIC).toBeCloseTo(1135.5, 6);
    expect(r.corporationTax).toBeCloseTo(15143.0425, 4);
    expect(r.dividendAmount).toBeCloseTo(56151.4575, 4);
    expect(r.dividendTax).toBeCloseTo(19895.39605625, 4);
    expect(r.payeIncomeTax).toBeCloseTo(12460, 6);
    expect(r.soleTraderTotalTax).toBeCloseTo(49909.6, 1);
    expect(r.limitedCompanyTotalTax).toBeCloseTo(48633.93855625, 4);
    expect(r.taxSavings).toBeCloseTo(1275.66144375, 4);
    expect(r.savingsPerMonth).toBeCloseTo(r.taxSavings / 12, 5);
    // Both net rows are now the same definition, so their gap IS the saving.
    expect(r.soleTraderNetIncome).toBeCloseTo(135000 - 49909.6, 4);
    expect(r.limitedCompanyNetIncome - r.soleTraderNetIncome).toBeCloseTo(r.taxSavings, 4);
  });

  it("no NHS income: sole trader vs Ltd", () => {
    // chargeableProfit = 130000 - 12570 - 1135.50 = 116294.50 (marginal band)
    // CT = 116294.50*0.25 - 0.015*(250000-116294.50) = 29073.625 - 2005.5825
    const r = calcIncorporation({ privateIncome: 150000, expenses: 20000, desiredSalary: 12570, nhsIncome: 0 });
    expect(r.soleTraderTaxableIncome).toBe(130000);
    expect(r.corporationTax).toBeCloseTo(27068.0425, 4);
  });

  it("zero private income: no company profit, no CT", () => {
    const r = calcIncorporation({ privateIncome: 0, expenses: 0, desiredSalary: 12570, nhsIncome: 50000 });
    expect(r.companyProfit).toBe(0);
    expect(r.corporationTax).toBe(0);
  });

  it("high income: additional rate dividends apply", () => {
    // Private=300000, NHS=0, expenses=20000, salary=12570
    // companyProfit = 280000; employerNIC = 1135.50
    // chargeableProfit = 280000 - 12570 - 1135.50 = 266294.50 (above £250,000)
    // CT = 266294.50 * 0.25 = 66573.625; dividendAmount = 199720.875
    // taxableDividends = 199220.875; totalIncomeBeforeDividends = 12570
    // basic: 37700 * 0.1075 = 4052.75
    // higher: min(161520.875, 112570 - 37700 = 74870) = 74870 * 0.3575 = 26766.025
    // additional: (199220.875 - 112570) * 0.3935 = 86650.875 * 0.3935 = 34097.1193125
    // dividendTax = 64915.8943125
    const r = calcIncorporation({ privateIncome: 300000, expenses: 20000, desiredSalary: 12570, nhsIncome: 0 });
    expect(r.dividendTax).toBeCloseTo(64915.8943125, 4);
    expect(r.corporationTax).toBeCloseTo(66573.625, 4);
  });

  it("ED-01: break CT rate — test detects the change", () => {
    // chargeableProfit = 190000 - 12570 - 1135.50 = 176294.50 (marginal band)
    // CT = 44073.625 - 0.015*(250000 - 176294.50) = 44073.625 - 1105.5825
    const r1 = calcIncorporation({ privateIncome: 200000, expenses: 10000, desiredSalary: 12570, nhsIncome: 0 });
    expect(r1.corporationTax).toBeCloseTo(42968.0425, 4);
    // A flat 25% on the whole profit, the pre-2026-09-01 behaviour, was £47,500.
    expect(r1.corporationTax).not.toBeCloseTo(190000 * 0.25, 0);
  });
});

// ── Incorporation: the 2026-09-01 corrections, hand-derived ───────────────────
// Wave C defects A, B and C: corporation tax was a flat 25% charged BEFORE the
// director salary, no employer NIC was charged, and the two "net income" rows
// were not the same definition. Every figure below is recomputed by hand in the
// comments from house_positions.md §5 (CT 19% / 25%, limits £50,000 and
// £250,000, standard fraction 3/200; employer secondary Class 1 15% above the
// £5,000 secondary threshold, no Employment Allowance for a single-director
// company) and re-derived, not copied from the code.

describe("calcIncorporation — corporation tax bands, employer NIC and net comparability", () => {
  it("WORKED EXAMPLE: private=120000 expenses=20000 salary=20000 nhs=30000", () => {
    // Chosen so the salary is ABOVE the £5,000 secondary threshold and the
    // chargeable profit lands inside the marginal relief band.
    //
    // Company side:
    //   companyProfit      = 120000 - 20000 = 100000
    //   employerNIC        = (20000 - 5000) * 0.15 = 15000 * 0.15 = 2250
    //   chargeableProfit   = 100000 - 20000 - 2250 = 77750
    //   CT                 = 77750*0.25 - (3/200)*(250000 - 77750)
    //                      = 19437.50 - 0.015*172250 = 19437.50 - 2583.75 = 16853.75
    //   dividendAmount     = 77750 - 16853.75 = 60896.25
    //   taxableDividends   = 60896.25 - 500 = 60396.25
    //   payeIncome         = 30000 + 20000 = 50000; PA 12570; taxable 37430
    //     all inside the £37,700 basic band: payeIncomeTax = 37430*0.2 = 7486
    //   dividend stacking on 50000 of PAYE income:
    //     basicRateRemaining  = 50270 - 50000 = 270  -> 270 * 0.1075 = 29.025
    //     higherRateRemaining = 125140 - 50000 = 75140
    //     higher width        = 75140 - 270 = 74870; 60396.25 - 270 = 60126.25 fits
    //     60126.25 * 0.3575 = 21495.134375
    //   dividendTax        = 29.025 + 21495.134375 = 21524.159375
    //   ltdTotalTax        = 16853.75 + 2250 + 21524.159375 + 7486 = 48113.909375
    //
    // Sole trader side:
    //   profit 100000; taxable 130000; PA tapers to 0 above £125,140
    //   IT  = 37700*0.2 + 87440*0.4 + (130000-125140)*0.45
    //       = 7540 + 34976 + 2187 = 44703
    //   NI  = 37700*0.06 + (100000-50270)*0.02 = 2262 + 994.60 = 3256.60
    //   soleTraderTotalTax = 47959.60
    //
    //   taxSavings = 47959.60 - 48113.909375 = -154.309375 (incorporating costs more)
    const r = calcIncorporation({
      privateIncome: 120000,
      expenses: 20000,
      desiredSalary: 20000,
      nhsIncome: 30000,
    });
    expect(r.employerNIC).toBeCloseTo(2250, 6);
    expect(r.corporationTax).toBeCloseTo(16853.75, 4);
    expect(r.dividendAmount).toBeCloseTo(60896.25, 4);
    expect(r.dividendTax).toBeCloseTo(21524.159375, 4);
    expect(r.payeIncomeTax).toBeCloseTo(7486, 6);
    expect(r.limitedCompanyTotalTax).toBeCloseTo(48113.909375, 4);
    expect(r.soleTraderTotalTax).toBeCloseTo(47959.6, 4);
    expect(r.taxSavings).toBeCloseTo(-154.309375, 4);
    // Net cash in hand, same definition both sides: gross base less total tax.
    expect(r.soleTraderNetIncome).toBeCloseTo(130000 - 47959.6, 4);
    expect(r.limitedCompanyNetIncome).toBeCloseTo(130000 - 48113.909375, 4);
  });

  it("CT spans both bands: 19% at £50,000, marginal relief between, 25% at £250,000", () => {
    // 50000 * 0.19 = 9500, and the marginal-relief formula agrees at the
    // boundary: 50000*0.25 - 0.015*200000 = 12500 - 3000 = 9500.
    expect(calcCorporationTax(50000)).toBeCloseTo(9500, 6);
    expect(calcCorporationTax(49999)).toBeCloseTo(49999 * 0.19, 6);
    // 250000 * 0.25 = 62500, and marginal relief is nil there.
    expect(calcCorporationTax(250000)).toBeCloseTo(62500, 6);
    expect(calcCorporationTax(250001)).toBeCloseTo(250001 * 0.25, 6);
    // Mid band: 150000*0.25 - 0.015*100000 = 37500 - 1500 = 36000 (24% effective).
    expect(calcCorporationTax(150000)).toBeCloseTo(36000, 6);
    // The band is monotonic and never cheaper than the small-profits rate.
    expect(calcCorporationTax(0)).toBe(0);
    expect(calcCorporationTax(-5000)).toBe(0);
    for (let p = 40000; p <= 260000; p += 10000) {
      expect(calcCorporationTax(p)).toBeGreaterThanOrEqual(calcCorporationTax(p - 10000));
      expect(calcCorporationTax(p) / p).toBeGreaterThanOrEqual(0.19 - 1e-9);
      expect(calcCorporationTax(p) / p).toBeLessThanOrEqual(0.25 + 1e-9);
    }
  });

  it("employer NIC: nil at the £5,000 secondary threshold, 15% above it", () => {
    const base = { privateIncome: 100000, expenses: 15000, nhsIncome: 50000 };
    expect(calcIncorporation({ ...base, desiredSalary: 5000 }).employerNIC).toBe(0);
    expect(calcIncorporation({ ...base, desiredSalary: 4000 }).employerNIC).toBe(0);
    expect(calcIncorporation({ ...base, desiredSalary: 5100 }).employerNIC).toBeCloseTo(15, 6);
    // The shipped default salary: 15% of (12570 - 5000) = £1,135.50 a year.
    expect(calcIncorporation({ ...base, desiredSalary: 12570 }).employerNIC).toBeCloseTo(1135.5, 6);
  });

  it("GUARD: the director salary is deducted BEFORE corporation tax", () => {
    // The defect this replaces: CT was charged on the whole profit and the
    // salary came out of the post-tax balance, so the company was taxed on its
    // own salary cost and a bigger salary left CT untouched.
    const base = { privateIncome: 100000, expenses: 15000, nhsIncome: 50000 };
    const small = calcIncorporation({ ...base, desiredSalary: 5000 });
    const large = calcIncorporation({ ...base, desiredSalary: 40000 });
    expect(large.corporationTax).toBeLessThan(small.corporationTax);
    // £5,000 salary, no employer NIC: chargeable profit = 85000 - 5000 = 80000.
    // CT = 80000*0.25 - 0.015*(250000-80000) = 20000 - 2550 = 17450 (21.8%).
    expect(small.corporationTax).toBeCloseTo(17450, 4);
  });

  it("GUARD: both net-income figures are the same definition on every input", () => {
    // The defect this replaces: the company net omitted income tax on the NHS
    // salary, so the two adjacent rows were not comparable. The invariant is
    // that each net equals the same gross base less that route's total tax, so
    // the gap between them IS taxSavings.
    const cases = [
      { privateIncome: 100000, expenses: 15000, desiredSalary: 12570, nhsIncome: 50000 },
      { privateIncome: 60000, expenses: 5000, desiredSalary: 5000, nhsIncome: 0 },
      { privateIncome: 400000, expenses: 30000, desiredSalary: 50000, nhsIncome: 120000 },
      { privateIncome: 0, expenses: 0, desiredSalary: 12570, nhsIncome: 50000 },
    ];
    for (const c of cases) {
      const r = calcIncorporation(c);
      const grossBase = c.privateIncome - c.expenses + c.nhsIncome;
      expect(r.soleTraderNetIncome).toBeCloseTo(grossBase - r.soleTraderTotalTax, 6);
      expect(r.limitedCompanyNetIncome).toBeCloseTo(
        grossBase - r.limitedCompanyTotalTax,
        6,
      );
      expect(r.limitedCompanyNetIncome - r.soleTraderNetIncome).toBeCloseTo(r.taxSavings, 6);
    }
  });
});

// ── NHS Superannuation tiered contribution golden tests ───────────────────────

describe("calcNHSSuperTieredContribution — golden tests (roster Tool 4 worked example)", () => {
  it("GP partner £120,000, higher rate (roster worked example)", () => {
    // £120,000 is Tier 6 (£67,669 and above) => 12.5%
    // employee = 120000 * 0.125 = 15000
    // deemed employer = 120000 * 0.237 = 28440
    // combined = 15000 + 28440 = 43440
    // net of 40% relief = 15000 * 0.6 = 9000
    const r = calcNHSSuperTieredContribution({ pensionablePay: 120000, incomeTaxBand: "higher" });
    expect(r.tierRate).toBe(0.125);
    expect(r.employeeContribution).toBe(15000);
    expect(r.deemedEmployerContribution).toBeCloseTo(28440, 5);
    expect(r.combinedPensionInput).toBeCloseTo(43440, 5);
    expect(r.netOfReliefCost).toBeCloseTo(9000, 5);
  });

  it("stepped cliff edge: £67,668 is Tier 5 (10.7%), £67,669 is Tier 6 (12.5%)", () => {
    // 67668 * 0.107 = 7240.476; 67669 * 0.125 = 8458.625
    const below = calcNHSSuperTieredContribution({ pensionablePay: 67668, incomeTaxBand: "higher" });
    const above = calcNHSSuperTieredContribution({ pensionablePay: 67669, incomeTaxBand: "higher" });
    expect(below.tierRate).toBe(0.107);
    expect(below.employeeContribution).toBeCloseTo(7240.476, 3);
    expect(above.tierRate).toBe(0.125);
    expect(above.employeeContribution).toBeCloseTo(8458.625, 3);
  });

  it("Tier 4 basic-rate case: £40,000 at 9.8%", () => {
    // employee = 40000 * 0.098 = 3920; deemed = 40000 * 0.237 = 9480
    // combined = 13400; net of 20% relief = 3920 * 0.8 = 3136
    const r = calcNHSSuperTieredContribution({ pensionablePay: 40000, incomeTaxBand: "basic" });
    expect(r.tierRate).toBe(0.098);
    expect(r.employeeContribution).toBeCloseTo(3920, 5);
    expect(r.deemedEmployerContribution).toBeCloseTo(9480, 5);
    expect(r.combinedPensionInput).toBeCloseTo(13400, 5);
    expect(r.netOfReliefCost).toBeCloseTo(3136, 5);
  });

  it("additional rate: £200,000 at 12.5%, net of 45% relief", () => {
    // employee = 25000; deemed = 47400; combined = 72400; net = 25000 * 0.55 = 13750
    const r = calcNHSSuperTieredContribution({ pensionablePay: 200000, incomeTaxBand: "additional" });
    expect(r.employeeContribution).toBe(25000);
    expect(r.deemedEmployerContribution).toBeCloseTo(47400, 5);
    expect(r.netOfReliefCost).toBeCloseTo(13750, 5);
  });

  it("zero and negative pay clamp to zero", () => {
    const r = calcNHSSuperTieredContribution({ pensionablePay: -5000, incomeTaxBand: "higher" });
    expect(r.employeeContribution).toBe(0);
    expect(r.deemedEmployerContribution).toBe(0);
    expect(r.combinedPensionInput).toBe(0);
    expect(r.netOfReliefCost).toBe(0);
  });
});

// ── NHS Pension Scheme Pays golden tests ──────────────────────────────────────

describe("calcSchemePays — golden tests (hand-verified)", () => {
  it("roster example: charge=8000 growth=70000 age=45 higher, 2015 Scheme NPA 68", () => {
    // NHSBSA Source A table 2, indexed by complete years to NPA: 68 - 45 = 23
    // years, factor 12.1. Reduction = charge / factor = 8000 / 12.1 = 661.16/yr
    // in current day terms. Break-even = charge / reduction = the factor.
    const r = calcSchemePays({ annualAllowanceCharge: 8000, schemeGrowth: 70000, age: 45, marginalRate: "higher" });
    expect(r.mandatoryEligible).toBe(true);
    expect(r.cashNow).toBe(8000);
    expect(r.yearsToRetirement).toBe(23);
    expect(r.factorTable).toBe("table2-2015");
    expect(r.actuarialFactor).toBe(12.1);
    expect(r.annualPensionReduction).toBeCloseTo(661.16, 2);
    expect(r.breakEvenYears).toBeCloseTo(12.1, 2);
    expect(r.marginalRateValue).toBe(0.4);
    // 2015 Scheme: pension only, no lump sum reduction.
    expect(r.lumpSumReduction).toBe(0);
  });

  it("older member: charge=25000 growth=85000 age=55 additional, 2015 Scheme NPA 68", () => {
    // 68 - 55 = 13 years to NPA, table 2 factor 14.5.
    // reduction = 25000 / 14.5 = 1,724.14/yr; break-even = 14.5 years.
    const r = calcSchemePays({ annualAllowanceCharge: 25000, schemeGrowth: 85000, age: 55, marginalRate: "additional" });
    expect(r.mandatoryEligible).toBe(true);
    expect(r.actuarialFactor).toBe(14.5);
    expect(r.annualPensionReduction).toBeCloseTo(1724.14, 2);
    expect(r.breakEvenYears).toBeCloseTo(14.5, 2);
  });

  it("charge at £2,000 exactly: NOT mandatory (must exceed floor)", () => {
    const r = calcSchemePays({ annualAllowanceCharge: 2000, schemeGrowth: 70000, age: 45, marginalRate: "basic" });
    expect(r.mandatoryEligible).toBe(false);
  });

  it("growth at £60,000 exactly: NOT mandatory (must exceed standard AA)", () => {
    const r = calcSchemePays({ annualAllowanceCharge: 8000, schemeGrowth: 60000, age: 45, marginalRate: "higher" });
    expect(r.mandatoryEligible).toBe(false);
  });

  it("age 67: 1 year to NPA 68, table 2 first row factor 18.2", () => {
    // reduction = 10000 / 18.2 = 549.45/yr
    const r = calcSchemePays({ annualAllowanceCharge: 10000, schemeGrowth: 90000, age: 67, marginalRate: "higher" });
    expect(r.yearsToRetirement).toBe(1);
    expect(r.actuarialFactor).toBe(18.2);
    expect(r.annualPensionReduction).toBeCloseTo(549.45, 2);
  });

  it("zero charge: no reduction, null break-even", () => {
    const r = calcSchemePays({ annualAllowanceCharge: 0, schemeGrowth: 0, age: 45, marginalRate: "basic" });
    expect(r.mandatoryEligible).toBe(false);
    expect(r.annualPensionReduction).toBe(0);
    expect(r.breakEvenYears).toBeNull();
  });
});

/**
 * Source-tied checks, NOT restated constants.
 *
 * The previous version of this suite asserted an invented nine-band age table
 * and an invented 2.35% nominal interest rate. It passed, because it only ever
 * compared the code against itself. These assertions instead pin the code to
 * figures NHSBSA states in its own words, so a factor table swapped for an
 * invented one fails here even if every golden output is updated to match it.
 *
 * Source: NHSBSA member factsheet "NHS Pensions — Annual Allowance —
 * Estimating the cost of Scheme Pays", V5, file stamped 20240712, read
 * 2026-08-26. Tables stamped "Factors in force from 30 March 2023".
 */
describe("calcSchemePays — tied to NHSBSA's published worked examples", () => {
  it("NHSBSA example 1: 1995 Section, NPA 60, currently aged 45 => factor 20.1", () => {
    // Factsheet, verbatim: "If you are a member of the 1995 Section with a
    // normal pension age of 60 and currently aged 45, the factor you would use
    // is 20.1".
    expect(getEstimatingFactor("1995-60", 45, 60).factor).toBe(20.1);
    expect(getEstimatingFactor("1995-60", 45, 60).table).toBe("table1-1995-2008");
  });

  it("NHSBSA example 2: 2015 Scheme, 23 years from NPA 68 => factor 12.1", () => {
    // Factsheet, verbatim: "If you are a member of the 2015 Scheme and 23 years
    // away from your NPA of 68, the factor you would use is 12.1".
    expect(getEstimatingFactor("2015", 45, 68).factor).toBe(12.1);
    expect(getEstimatingFactor("2015", 45, 68).table).toBe("table2-2015");
  });

  it("published table endpoints match the factsheet as printed", () => {
    // Table 1 first and last printed rows, all three NPA columns.
    expect(getEstimatingFactor("1995-55", 22, 55).factor).toBe(17.1);
    expect(getEstimatingFactor("1995-60", 22, 60).factor).toBe(14.2);
    expect(getEstimatingFactor("2008", 22, 65).factor).toBe(10.1);
    expect(getEstimatingFactor("1995-55", 70, 55).factor).toBe(18.8);
    expect(getEstimatingFactor("2008", 70, 65).factor).toBe(15.8);
    // Table 2 first and last printed rows: 1 year => 18.2, 50 years => 8.2.
    expect(getEstimatingFactor("2015", 67, 68).factor).toBe(18.2);
    expect(getEstimatingFactor("2015", 18, 68).factor).toBe(8.2);
  });

  it("factors fall with years to NPA and the table is monotonic, as published", () => {
    // Table 2 is strictly non-increasing from 1 to 50 years. An age-banded or
    // otherwise invented table would not reproduce this shape against
    // years-to-NPA, which is how the fabricated table differed.
    let previous = Infinity;
    for (let years = 1; years <= 50; years += 1) {
      const f = getEstimatingFactor("2015", 68 - years, 68).factor;
      expect(f).toBeLessThanOrEqual(previous);
      previous = f;
    }
  });

  it("the published METHOD holds: reduction = charge / factor, lump sum = 3 x reduction", () => {
    // Factsheet, verbatim: "Reduction to pension: Annual Allowance charge ÷
    // [Factor 1 or Factor 2]" and "Reduction to lump sum (1995 Section members
    // only): 3 x reduction in pension". No interest is compounded on top: the
    // factsheet says the factors "do not include the relevant interest rate in
    // excess of inflation up to retirement" and the answer is "in current day
    // terms". Compounding a nominal rate here would break this identity.
    const r = calcSchemePays({
      annualAllowanceCharge: 8000,
      schemeGrowth: 70000,
      age: 45,
      marginalRate: "higher",
      section: "1995-60",
    });
    expect(r.actuarialFactor).toBe(20.1);
    expect(r.annualPensionReduction).toBeCloseTo(8000 / 20.1, 10);
    expect(r.lumpSumReduction).toBeCloseTo(3 * r.annualPensionReduction, 10);
    // 2008 Section and 2015 Scheme reduce the pension only.
    expect(
      calcSchemePays({
        annualAllowanceCharge: 8000,
        schemeGrowth: 70000,
        age: 45,
        marginalRate: "higher",
        section: "2008",
      }).lumpSumReduction,
    ).toBe(0);
  });

  it("interest is a real rate in excess of CPI, and is disclosure only", () => {
    // Factsheet, verbatim: "interest applied from 31 March 2023: 1.7% in excess
    // of inflation", with 2.4%, 2.8% and 3.0% for the earlier tranches. These
    // are excess-over-CPI rates, never a nominal rate to compound.
    expect(SCHEME_PAYS_CURRENT_REAL_INTEREST_RATE).toBe(0.017);
    expect(SCHEME_PAYS_REAL_INTEREST_RATES.map((t) => t.excessOverCpi)).toEqual([
      0.03, 0.028, 0.024, 0.017,
    ]);
  });
});

// ── GpPartnerDrawings golden tests ────────────────────────────────────────────

describe("calcGpPartnerDrawings — golden tests", () => {
  it("GOLDEN: profit share £120,000, super £120,000, no SL, no buffer => net £61,911 / £5,159/month", () => {
    // PA = 12,570 - (120,000 - 100,000)/2 = £2,570
    // IT: basic 37,700*0.20=7,540; higher 79,730*0.40=31,892; total 39,432
    // C4 NI: 6%*37,700=2,262; 2%*69,730=1,394.60; total ~3,657
    // Super: 120,000*12.5%=15,000 (tier 6)
    // Net: 120,000-39,432-3,657-15,000=61,911; monthly=5,159
    const r = calcGpPartnerDrawings({ profitShare: 120000, superannuablePay: 120000, studentLoanPlan: "none", taxReserveRate: 0 });
    expect(r.personalAllowance).toBeCloseTo(2570, 0);
    expect(r.basicTax).toBeCloseTo(7540, 0);
    expect(r.higherTax).toBeCloseTo(31892, 0);
    expect(r.additionalTax).toBe(0);
    expect(r.incomeTax).toBeCloseTo(39432, 0);
    expect(r.class4NI).toBeCloseTo(3657, 0);
    expect(r.superAmount).toBeCloseTo(15000, 0);
    expect(r.superRate).toBe(0.125);
    expect(r.studentLoanRepayment).toBe(0);
    expect(r.netAnnual).toBeCloseTo(61911, 0);
    expect(r.monthlyDrawings).toBeCloseTo(5159, 0);
  });

  it("full PA intact: profit share £80,000, super £80,000", () => {
    // PA=£12,570; IT=19,432; C4=~2,857; super=10,000; net=~47,711
    const r = calcGpPartnerDrawings({ profitShare: 80000, superannuablePay: 80000, studentLoanPlan: "none", taxReserveRate: 0 });
    expect(r.personalAllowance).toBe(12570);
    expect(r.incomeTax).toBeCloseTo(19432, 0);
    expect(r.class4NI).toBeCloseTo(2857, 0);
    expect(r.superAmount).toBeCloseTo(10000, 0);
    expect(r.netAnnual).toBeCloseTo(47711, 0);
  });

  it("additional rate: profit share £140,000", () => {
    // PA=0; IT=49,203; C4=~4,057; super=17,500; net=~69,240
    const r = calcGpPartnerDrawings({ profitShare: 140000, superannuablePay: 140000, studentLoanPlan: "none", taxReserveRate: 0 });
    expect(r.personalAllowance).toBe(0);
    expect(r.additionalTax).toBeGreaterThan(0);
    expect(r.incomeTax).toBeCloseTo(49203, 0);
    expect(r.netAnnual).toBeCloseTo(69240, 0);
  });

  it("plan2 student loan: (60,000-28,470)*0.09=2,837.70", () => {
    const r = calcGpPartnerDrawings({ profitShare: 60000, superannuablePay: 60000, studentLoanPlan: "plan2", taxReserveRate: 0 });
    expect(r.studentLoanRepayment).toBeCloseTo(2837.7, 1);
  });

  it("5% buffer reduces net by £5,000 on £100k profit", () => {
    const rNoBuf = calcGpPartnerDrawings({ profitShare: 100000, superannuablePay: 100000, studentLoanPlan: "none", taxReserveRate: 0 });
    const rBuf = calcGpPartnerDrawings({ profitShare: 100000, superannuablePay: 100000, studentLoanPlan: "none", taxReserveRate: 0.05 });
    expect(rBuf.bufferAmount).toBeCloseTo(5000, 0);
    expect(rBuf.netAnnual).toBeCloseTo(rNoBuf.netAnnual - 5000, 0);
  });

  it("profit below NI lower limit: no Class 4 NI", () => {
    const r = calcGpPartnerDrawings({ profitShare: 12000, superannuablePay: 12000, studentLoanPlan: "none", taxReserveRate: 0 });
    expect(r.class4NI).toBe(0);
  });
});

// ── ConsultantPrivateVsNHS golden tests ───────────────────────────────────────

describe("calcConsultantPrivateVsNhs — golden tests (roster Tool 10 worked example)", () => {
  it("roster worked example: NHS £150k, private £70k, extra session £15k", () => {
    // Threshold (with extra): 150000+70000+15000=235000 (>200000)
    // Deemed employer: 150000*0.237=35550
    // Adjusted (with extra): 270550 (>260000 => taper fires)
    // AA reduction: (270550-260000)/2=5275; AA with: 54725; AA base: 60000 (no taper before)
    // Tax(235000): PA=0; 37700*0.2+87440*0.4+(235000-125140)*0.45 = 7540+34976+49437 = 91953
    // Tax(220000): 7540+34976+(220000-125140)*0.45 = 85203; incomeTaxOnSession = 6750
    // Class4(85000)=2956.6; Class4(70000)=2656.6; niOnSession=300
    // aaChargeImpact=5275*0.45=2373.75; totalCost=9423.75; net=5576.25; EMR=0.62825
    const r = calcConsultantPrivateVsNhs({
      nhsPensionablePay: 150_000,
      existingPrivateIncome: 70_000,
      extraSessionValue: 15_000,
      otherIncome: 0,
    });
    expect(r.aaTapered).toBe(true);
    expect(r.aaBase).toBe(60_000);
    expect(r.aaWith).toBeCloseTo(54_725, 0);
    expect(r.aaReduction).toBeCloseTo(5_275, 0);
    expect(r.incomeTaxOnSession).toBeCloseTo(6_750, 0);
    expect(r.niOnSession).toBeCloseTo(300, 1);
    expect(r.aaChargeImpact).toBeCloseTo(2_373.75, 1);
    expect(r.totalCost).toBeCloseTo(9_423.75, 0);
    expect(r.netFromSession).toBeCloseTo(5_576.25, 0);
    expect(r.effectiveMarginalRate).toBeCloseTo(0.6282, 3);
  });

  it("no taper: NHS £100k, private £30k, extra session £10k (threshold stays under £200k)", () => {
    // threshold (with): 140000 (<200000 => no taper); aaChargeImpact=0
    // Tax(140000): PA=0; 7540+34976+(140000-125140)*0.45=49203
    // Tax(130000): PA=0; 44703; incomeTaxOnSession=4500
    // Class4(40000)=(40000-12570)*0.06=1645.8; Class4(30000)=1045.8; niOnSession=600
    // totalCost=5100; netFromSession=4900
    const r = calcConsultantPrivateVsNhs({
      nhsPensionablePay: 100_000,
      existingPrivateIncome: 30_000,
      extraSessionValue: 10_000,
      otherIncome: 0,
    });
    expect(r.aaTapered).toBe(false);
    expect(r.aaReduction).toBe(0);
    expect(r.aaChargeImpact).toBe(0);
    expect(r.incomeTaxOnSession).toBeCloseTo(4_500, 0);
    expect(r.niOnSession).toBeCloseTo(600, 1);
    expect(r.totalCost).toBeCloseTo(5_100, 0);
    expect(r.netFromSession).toBeCloseTo(4_900, 0);
  });

  it("calcIncomeTax: PA-taper zone delta £100k to £110k is ~£6,000 (60% effective band)", () => {
    // PA at £110k = 12570-(10000/2) = 7570; taxable=102430
    // basic 37700*0.2=7540; higherWidth=(125140-7570)-37700=79870; inHigher=64730*0.4=25892 => 33432
    // PA at £100k = 12570; taxable=87430; basic 7540; higher 49730*0.4=19892 => 27432; delta=6000
    expect(calcIncomeTax(110_000) - calcIncomeTax(100_000)).toBeCloseTo(6_000, 0);
  });

  it("calcAA: floor of £10,000 on extreme taper", () => {
    expect(calcAA(300_000, 500_000)).toBe(10_000);
  });

  it("calcClass4: 6% main + 2% upper for income spanning both bands", () => {
    // £60,000: inMain=(50270-12570)*0.06=2262; inUpper=9730*0.02=194.6 => 2456.6
    expect(calcClass4(60_000)).toBeCloseTo(2_456.6, 1);
  });

  it("zero extra session value: zero cost and zero EMR", () => {
    const r = calcConsultantPrivateVsNhs({
      nhsPensionablePay: 150_000,
      existingPrivateIncome: 70_000,
      extraSessionValue: 0,
      otherIncome: 0,
    });
    expect(r.netFromSession).toBe(0);
    expect(r.effectiveMarginalRate).toBe(0);
  });
});

// ── NHS pension BROWSER CALCULATOR: the two inputs that carry the fix ─────────
// The workbook was corrected on 2026-08-26; leaving these off the browser
// surface would have recreated the same defect where more people meet it.

describe("nhsPensionTool.compute (browser calculator)", () => {
  const defaults = Object.fromEntries(nhsPensionTool.fields.map((f) => [f.id, f.default]));
  const run = (over: Record<string, number | string | boolean> = {}) =>
    nhsPensionTool.compute({ ...defaults, ...over });
  const rowLabels = (r: ReturnType<typeof run>) => (r.rows ?? []).map((x) => x.label);

  it("exposes an other-schemes input and a carry-forward input, both defaulting to zero", () => {
    const ids = nhsPensionTool.fields.map((f) => f.id);
    expect(ids).toContain("otherPensionInput");
    expect(ids).toContain("carryForward");
    expect(nhsPensionTool.fields.find((f) => f.id === "otherPensionInput")!.default).toBe(0);
    expect(nhsPensionTool.fields.find((f) => f.id === "carryForward")!.default).toBe(0);
  });

  it("GUARD: the consultant with a SIPP is tapered and charged, not told they are fine", () => {
    // £210,000 threshold, £45,000 NHS growth, £20,000 into a SIPP, higher rate.
    // Old behaviour: adjusted income £255,000, no taper, no charge.
    const withoutSipp = run({ thresholdIncome: 210000, pensionGrowth: 45000 });
    expect(withoutSipp.headline.value).toBe("£60,000");

    const r = run({ thresholdIncome: 210000, pensionGrowth: 45000, otherPensionInput: 20000 });
    expect(r.headline.label).toBe("Annual allowance charge");
    expect(r.headline.value).toBe("£5,000");
    expect(r.headline.sub).toContain("Before carry-forward");
    const rows = Object.fromEntries((r.rows ?? []).map((x) => [x.label, x.value]));
    expect(rows["Total pension input, all schemes"]).toBe("£65,000");
    expect(rows["Adjusted income"]).toBe("£275,000");
    expect(rows["Annual allowance 2026/27"]).toBe("£52,500 (tapered)");
    expect(rows["Chargeable excess"]).toBe("£12,500");
  });

  it("GUARD: carry-forward is applied and can take the charge to nil", () => {
    const r = run({ thresholdIncome: 210000, pensionGrowth: 70000, carryForward: 20000 });
    expect(r.headline.label).toBe("Annual allowance");
    expect(r.headline.sub).toBe("Carry-forward removes the excess, no charge");
    const rows = Object.fromEntries((r.rows ?? []).map((x) => [x.label, x.value]));
    expect(rows["Carry-forward applied"]).toBe("£20,000");
    expect(rows["Chargeable excess"]).toBe("£0");

    const partial = run({ thresholdIncome: 210000, pensionGrowth: 70000, carryForward: 5000 });
    expect(partial.headline.value).toBe("£6,000");
    expect(partial.headline.sub).not.toContain("Before carry-forward");
  });

  it("GUARD: both status lines are result rows, in the workbook's own wording", () => {
    const empty = run({ thresholdIncome: 210000, pensionGrowth: 70000 });
    // Not the small-print `note`: these must be rows the reader cannot miss.
    expect(rowLabels(empty)).toContain(CARRY_FORWARD_NOT_ENTERED);
    expect(rowLabels(empty)).toContain(NHS_ONLY_ASSUMED);
    expect(empty.note).not.toContain(CARRY_FORWARD_NOT_ENTERED);

    const filled = run({ thresholdIncome: 210000, pensionGrowth: 70000, carryForward: 5000, otherPensionInput: 1000 });
    expect(rowLabels(filled)).toContain(CARRY_FORWARD_ENTERED);
    expect(rowLabels(filled)).not.toContain(CARRY_FORWARD_NOT_ENTERED);
    expect(rowLabels(filled)).not.toContain(NHS_ONLY_ASSUMED);
  });

  it("GUARD: the calculator and the workbook share one copy of the status wording", async () => {
    // The builder imports these constants rather than repeating the strings, so
    // a reworded status line lands in the xlsx at the next resources:xlsx run.
    const { build } = await import("../../../../scripts/resources/builders/nhs-pension.js");
    const ws = build().getWorksheet("Your figures")!;
    expect((ws.getCell("B25").value as { formula: string }).formula).toContain(CARRY_FORWARD_NOT_ENTERED);
    expect((ws.getCell("B26").value as { formula: string }).formula).toContain(NHS_ONLY_ASSUMED);
  });

  it("the default NHS-only case still returns the standard allowance and no charge", () => {
    const r = run();
    expect(r.headline.value).toBe("£60,000");
    expect(r.headline.sub).toBe("Standard allowance, no excess charge");
  });
});
