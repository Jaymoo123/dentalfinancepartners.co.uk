/**
 * Golden tests for Medical site calculator compute libs.
 *
 * All values are pinned to the OLD component outputs (pre-extraction).
 * Any mismatch means the extraction changed behaviour — that is a STOP.
 *
 * STALE-FIGURE NOTES (resolved):
 * - LocumTax student loan thresholds: extraction pinned the OLD 2024/25 values
 *   (24,990/27,295/31,395); the three SL tests below were then deliberately
 *   updated to the user-approved 2025/26 values (26,065/28,470/32,745) on
 *   2026-06-11, with derivations in each test.
 * - LocumTax plan4 label in old UI read "postgraduate" but threshold/rate
 *   matches Scottish Plan 4 — fixed in the new config ("Plan 4 (Scotland)").
 */

import { describe, it, expect } from "vitest";
import { calcLocumTax } from "./locum-tax";
import { calcNHSPension } from "./nhs-pension";
import { calcIncorporation } from "./incorporation";

// ── LocumTaxCalculator golden tests ───────────────────────────────────────────

describe("calcLocumTax — golden tests (pinned to OLD component outputs)", () => {
  it("default inputs: gross=80000 expenses=5000 pension=10000 no SL", () => {
    // netIncome = 80000 - 5000 - 10000 = 65000
    // taxableIncome = 65000 - 12570 = 52430
    // basicBandIncome = min(52430, 37700) = 37700 => 7540
    // higherBandIncome = min(52430 - 37700, 74870) = 14730 => 5892
    // incomeTax = 7540 + 5892 = 13432
    // NI: niableBand1 = min(65000-12570, 37700) = 37700 * 0.06 = 2262
    //     niableBand2 = (65000 - 50270) * 0.02 = 14730 * 0.02 = 294.6
    // NI = 2262 + 294.6 = 2556.6
    const r = calcLocumTax({ grossIncome: 80000, expenses: 5000, pensionContributions: 10000, studentLoanPlan: "none" });
    expect(r.netIncome).toBe(65000);
    expect(r.incomeTax).toBeCloseTo(13432, 0);
    expect(r.nationalInsurance).toBeCloseTo(2556.6, 1);
    expect(r.studentLoanRepayment).toBe(0);
    expect(r.netTakeHome).toBeCloseTo(65000 - 13432 - 2556.6, 0);
    expect(r.effectiveTaxRate).toBeGreaterThan(0);
  });

  it("plan2 student loan: gross=80000 expenses=5000 pension=10000", () => {
    // netIncome = 65000; threshold plan2 = 28470 (2025/26, deliberate correction 2026-06-11)
    // SL = (65000 - 28470) * 0.09 = 36530 * 0.09 = 3287.70
    const r = calcLocumTax({ grossIncome: 80000, expenses: 5000, pensionContributions: 10000, studentLoanPlan: "plan2" });
    expect(r.studentLoanRepayment).toBeCloseTo(3287.7, 1);
  });

  it("plan1 student loan: gross=60000 expenses=3000 pension=5000", () => {
    // netIncome = 52000; threshold plan1 = 26065 (2025/26, deliberate correction 2026-06-11)
    // SL = (52000 - 26065) * 0.09 = 25935 * 0.09 = 2334.15
    const r = calcLocumTax({ grossIncome: 60000, expenses: 3000, pensionContributions: 5000, studentLoanPlan: "plan1" });
    expect(r.studentLoanRepayment).toBeCloseTo(2334.15, 1);
  });

  it("plan4 student loan: gross=70000 expenses=4000 pension=8000", () => {
    // netIncome = 58000; threshold plan4 = 32745 (2025/26, deliberate correction 2026-06-11)
    // SL = (58000 - 32745) * 0.09 = 25255 * 0.09 = 2272.95
    const r = calcLocumTax({ grossIncome: 70000, expenses: 4000, pensionContributions: 8000, studentLoanPlan: "plan4" });
    expect(r.studentLoanRepayment).toBeCloseTo(2272.95, 1);
  });

  it("income below personal allowance: no income tax", () => {
    const r = calcLocumTax({ grossIncome: 20000, expenses: 5000, pensionContributions: 5000, studentLoanPlan: "none" });
    expect(r.netIncome).toBe(10000);
    expect(r.incomeTax).toBe(0);
  });

  it("income below NI lower limit: no NI", () => {
    const r = calcLocumTax({ grossIncome: 15000, expenses: 1000, pensionContributions: 5000, studentLoanPlan: "none" });
    expect(r.netIncome).toBe(9000);
    expect(r.nationalInsurance).toBe(0);
  });

  it("additional rate income: gross=200000 expenses=10000 pension=0", () => {
    // netIncome = 190000; taxableIncome = 190000 - 12570 = 177430
    // basic: 37700 * 0.2 = 7540
    // higher: 74870 * 0.4 = 29948
    // additional: (177430 - 112570) * 0.45 = 64860 * 0.45 = 29187
    // incomeTax = 7540 + 29948 + 29187 = 66675
    const r = calcLocumTax({ grossIncome: 200000, expenses: 10000, pensionContributions: 0, studentLoanPlan: "none" });
    expect(r.incomeTax).toBeCloseTo(66675, 0);
  });

  it("ED-01: break a constant — this test detects the change (guard test)", () => {
    // Change: NI lower limit is 12570, so income at 12570 has no NI
    const r = calcLocumTax({ grossIncome: 20000, expenses: 0, pensionContributions: 7430, studentLoanPlan: "none" });
    // netIncome = 12570, NI threshold exactly met
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
    // Sole trader:
    //   soleTraderProfit = 85000; total = 135000; taxableAfterPA = 122430
    //   basicBand = 37700 * 0.2 = 7540
    //   higherBand = 74870 * 0.4 = 29948
    //   additional = (122430-112570) * 0.45 = 9860 * 0.45 = 4437
    //   incomeTax = 41925
    //   NI: niable1 = min(85000-12570, 37700) = 37700 * 0.06 = 2262
    //       niable2 = (85000-50270) * 0.02 = 34730 * 0.02 = 694.6
    //   NI = 4087.6
    //   totalTax = 41925 + 4087.6 = 44881.6
    // Ltd:
    //   companyProfit = 85000; CT = 21250; profitAfterCT = 63750
    //   dividendAmount = 63750 - 12570 = 51180
    //   taxableDividends = max(0, 51180-500) = 50680
    //   totalIncomeBeforeDividends = 50000 + 12570 = 62570
    //   basicRateRemaining = max(0, 50270 - 62570) = 0 (in higher band)
    //   higherRateRemaining = max(0, 125140 - 62570) = 62570
    //   higherRateDividends = min(50680, 62570) = 50680 * 0.3575 = 18118.1
    //   dividendTax = 18118.1
    //   nhsIncomeTaxableAfterPA = 50000 - 12570 = 37430
    //   nhsIncomeTax = 37430 * 0.2 = 7486
    //   ltdTotalTax = 21250 + 18118.1 + 7486 = 46854.1
    //   Class 4 corrected to 6% (2026-07-06; 9% abolished Apr 2024): soleTraderTotalTax
    //   = 44881.60, taxSavings = 44881.60 - 46854.10 = -1972.50 (incorporation costs more here)
    const r = calcIncorporation({ privateIncome: 100000, expenses: 15000, desiredSalary: 12570, nhsIncome: 50000 });
    expect(r.soleTraderTaxableIncome).toBe(135000);
    expect(r.companyProfit).toBe(85000);
    expect(r.corporationTax).toBe(21250);
    // PINNED 2026-07-06 after the Class 4 rate correction (9% -> 6%): these
    // exact figures exist because typeof-only assertions let the abolished 9%
    // rate survive undetected. Delta vs old = 3% x 37,700 = 1,131.00 exactly.
    expect(r.soleTraderTotalTax).toBeCloseTo(44881.6, 1);
    expect(r.limitedCompanyTotalTax).toBeCloseTo(46854.1, 1);
    expect(r.taxSavings).toBeCloseTo(-1972.5, 1);
    expect(r.savingsPerMonth).toBeCloseTo(r.taxSavings / 12, 5);
  });

  it("no NHS income: sole trader vs Ltd", () => {
    const r = calcIncorporation({ privateIncome: 150000, expenses: 20000, desiredSalary: 12570, nhsIncome: 0 });
    expect(r.soleTraderTaxableIncome).toBe(130000);
    expect(r.corporationTax).toBe(130000 * 0.25);
  });

  it("zero private income: no company profit, no CT", () => {
    const r = calcIncorporation({ privateIncome: 0, expenses: 0, desiredSalary: 12570, nhsIncome: 50000 });
    expect(r.companyProfit).toBe(0);
    expect(r.corporationTax).toBe(0);
  });

  it("high income: additional rate dividends apply", () => {
    // Private=300000, NHS=0, expenses=20000, salary=12570
    // companyProfit = 280000; CT = 70000; profitAfterCT = 210000
    // dividendAmount = 210000 - 12570 = 197430
    // totalIncomeBeforeDividends = 0 + 12570 = 12570
    // basicRateRemaining = 50270 - 12570 = 37700
    // taxableDividends = max(0, 197430 - 500) = 196930
    // basicRate: 37700 * 0.1075 = 4052.75
    // remaining: 196930 - 37700 = 159230
    // higherRateRemaining = 125140 - 12570 = 112570
    // higherRateDividends in higher band: min(159230, 112570 - 37700) = min(159230, 74870) = 74870 * 0.3575 = 26766.025
    // additional: (159230 - 74870) * 0.3935 = 84360 * 0.3935 = 33195.66
    // dividendTax = 4052.75 + 26766.025 + 33195.66 = 64014.435
    const r = calcIncorporation({ privateIncome: 300000, expenses: 20000, desiredSalary: 12570, nhsIncome: 0 });
    expect(r.dividendTax).toBeGreaterThan(60000);
  });

  it("ED-01: break CT rate — test detects the change", () => {
    // CT is 25%; test that taxSavings changes when private income is high
    const r1 = calcIncorporation({ privateIncome: 200000, expenses: 10000, desiredSalary: 12570, nhsIncome: 0 });
    // If CT were 0 (broken), corporationTax would be 0 and taxSavings would be very different
    expect(r1.corporationTax).toBeCloseTo(190000 * 0.25, 0);
  });
});
