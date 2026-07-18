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
import { calcGpPartnerDrawings } from "./gp-partner-drawings";
import { calcSchemePays } from "./nhs-pension-scheme-pays";
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
    //   companyProfit = 85000; CT = 21250; profitAfterCT = 63750
    //   dividendAmount = 63750 - 12570 = 51180
    //   taxableDividends = max(0, 51180-500) = 50680
    //   totalIncomeBeforeDividends = 50000 + 12570 = 62570
    //   basicRateRemaining = max(0, 50270 - 62570) = 0 (in higher band)
    //   higherRateRemaining = max(0, 125140 - 62570) = 62570
    //   higherRateDividends = min(50680, 62570) = 50680 * 0.3575 = 18118.1
    //   dividendTax = 18118.1
    //   nhsIncomeTaxableAfterPA = 50000 - 12570 = 37430; nhsIncomeTax = 7486
    //   ltdTotalTax = 21250 + 18118.1 + 7486 = 46854.1
    //   taxSavings = 49909.60 - 46854.10 = 3055.50 (incorporation now saves tax here)
    //   (pre-fix asserted soleTraderTotalTax £44,881.60 / taxSavings -£1,972.50,
    //   using the fixed £74,870 higher band and an untapered PA — both wrong above £100k)
    const r = calcIncorporation({ privateIncome: 100000, expenses: 15000, desiredSalary: 12570, nhsIncome: 50000 });
    expect(r.soleTraderTaxableIncome).toBe(135000);
    expect(r.companyProfit).toBe(85000);
    expect(r.corporationTax).toBe(21250);
    expect(r.soleTraderTotalTax).toBeCloseTo(49909.6, 1);
    expect(r.limitedCompanyTotalTax).toBeCloseTo(46854.1, 1);
    expect(r.taxSavings).toBeCloseTo(3055.5, 1);
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
  it("roster example: charge=8000 growth=70000 age=45 higher", () => {
    // factor age 45 (band 45-49) = 19.7; years to 68 = 23
    // debit = 8000 * 1.0235^23 = 8000 * 1.7061648 = 13,649.32
    // reduction = 13,649.32 / 19.7 = 692.86/yr
    // break-even = 8000 / 692.86 = 11.55 years
    const r = calcSchemePays({ annualAllowanceCharge: 8000, schemeGrowth: 70000, age: 45, marginalRate: "higher" });
    expect(r.mandatoryEligible).toBe(true);
    expect(r.cashNow).toBe(8000);
    expect(r.yearsToRetirement).toBe(23);
    expect(r.actuarialFactor).toBe(19.7);
    expect(r.debitAtRetirement).toBeCloseTo(13649.32, 1);
    expect(r.annualPensionReduction).toBeCloseTo(692.86, 1);
    expect(r.breakEvenYears).toBeCloseTo(11.55, 2);
    expect(r.marginalRateValue).toBe(0.4);
  });

  it("older member: charge=25000 growth=85000 age=55 additional", () => {
    // factor age 55 (band 55-59) = 16.6; years to 68 = 13
    // debit = 25000 * 1.0235^13 = 25000 * 1.3525147 = 33,812.87
    // reduction = 33,812.87 / 16.6 = 2,036.92/yr
    // break-even = 25000 / 2036.92 = 12.27 years
    const r = calcSchemePays({ annualAllowanceCharge: 25000, schemeGrowth: 85000, age: 55, marginalRate: "additional" });
    expect(r.mandatoryEligible).toBe(true);
    expect(r.actuarialFactor).toBe(16.6);
    expect(r.debitAtRetirement).toBeCloseTo(33812.87, 1);
    expect(r.annualPensionReduction).toBeCloseTo(2036.92, 1);
    expect(r.breakEvenYears).toBeCloseTo(12.27, 2);
  });

  it("charge at £2,000 exactly: NOT mandatory (must exceed floor)", () => {
    const r = calcSchemePays({ annualAllowanceCharge: 2000, schemeGrowth: 70000, age: 45, marginalRate: "basic" });
    expect(r.mandatoryEligible).toBe(false);
  });

  it("growth at £60,000 exactly: NOT mandatory (must exceed standard AA)", () => {
    const r = calcSchemePays({ annualAllowanceCharge: 8000, schemeGrowth: 60000, age: 45, marginalRate: "higher" });
    expect(r.mandatoryEligible).toBe(false);
  });

  it("age 67 (last band): 1 year to NPA, factor 12.9", () => {
    // debit = 10000 * 1.0235 = 10,235; reduction = 10235 / 12.9 = 793.41/yr
    const r = calcSchemePays({ annualAllowanceCharge: 10000, schemeGrowth: 90000, age: 67, marginalRate: "higher" });
    expect(r.yearsToRetirement).toBe(1);
    expect(r.actuarialFactor).toBe(12.9);
    expect(r.debitAtRetirement).toBeCloseTo(10235, 1);
    expect(r.annualPensionReduction).toBeCloseTo(793.41, 1);
  });

  it("zero charge: no reduction, null break-even", () => {
    const r = calcSchemePays({ annualAllowanceCharge: 0, schemeGrowth: 0, age: 45, marginalRate: "basic" });
    expect(r.mandatoryEligible).toBe(false);
    expect(r.annualPensionReduction).toBe(0);
    expect(r.breakEvenYears).toBeNull();
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
