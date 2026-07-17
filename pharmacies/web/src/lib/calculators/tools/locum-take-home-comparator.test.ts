import { describe, it, expect } from "vitest";
import { locumTakeHomeComparator } from "./locum-take-home-comparator";

/**
 * Hand-computed golden values for 2026/27.
 *
 * Tax constants (from contractors-ir35/web/src/lib/calculators/tax2026.ts):
 *   PA £12,570 | basic rate 20% on £37,700 | higher 40% | CT 19%/25% marginal
 *   Class 2 £3.45/wk | Class 4 6% (£12,570–£50,270) / 2% above
 *   Dividend rates HP 28: 10.75% / 35.75% / 39.35%, £500 allowance
 *   Employer NIC HP 25: 15% above £5,000
 */

describe("locumTakeHomeComparator", () => {
  // Base case: £400/day, 4 days/wk, 46 weeks, £3,000 expenses
  // annualIncome = 400 * 4 * 46 = £73,600
  const BASE = { dayRate: 400, daysPerWeek: 4, weeksPerYear: 46, annualExpenses: 3_000 };

  it("sole trader: income tax figure", () => {
    // profit = 73600 - 3000 = 70600; taxable = 70600 - 12570 = 58030
    // basic: 37700 * 0.20 = 7540; higher: (58030-37700) * 0.40 = 8132; total = £15,672
    const result = locumTakeHomeComparator.compute(BASE);
    const taxRow = result.rows?.find((r) => r.label === "Income tax");
    expect(taxRow?.value).toBe("−£15,672");
  });

  it("sole trader: class 4 NIC figure", () => {
    // class4Main = (50270-12570)*0.06 = 37700*0.06 = 2262
    // class4Upper = (70600-50270)*0.02 = 20330*0.02 = 406.60 → rounds to 407
    // total class4 = 2262 + 406.60 = 2668.60 → gbp "£2,669"
    const result = locumTakeHomeComparator.compute(BASE);
    const nic4Row = result.rows?.find((r) => r.label === "Class 4 NIC (6% / 2%)");
    expect(nic4Row?.value).toBe("−£2,669");
  });

  it("sole trader: class 2 NIC figure", () => {
    // 3.45 * 52 = 179.40 → gbp "£179"
    const result = locumTakeHomeComparator.compute(BASE);
    const nic2Row = result.rows?.find((r) => r.label === "Class 2 NIC (£3.45/week)");
    expect(nic2Row?.value).toBe("−£179");
  });

  it("sole trader: net take-home", () => {
    // net = 70600 - 15672 - 179.40 - 2668.60 = 70600 - 15672 - 2848 = £52,080
    const result = locumTakeHomeComparator.compute(BASE);
    const stRow = result.rows?.find((r) => r.label === "Sole trader net take-home");
    expect(stRow?.value).toBe("£52,080");
  });

  it("limited company: corporation tax in marginal band", () => {
    // salary=12570, eni=(12570-5000)*0.15=1135.50
    // profitBT = 73600 - 12570 - 1135.50 - 3000 = 56894.50
    // CT = 56894.50*0.25 - (3/200)*(250000-56894.50) = 14223.625 - 2896.5825 = 11327.04 → "£11,327"
    const result = locumTakeHomeComparator.compute(BASE);
    const ctRow = result.rows?.find((r) => r.label === "Corporation tax (HP 27)");
    expect(ctRow?.value).toBe("−£11,327");
  });

  it("limited company: dividend tax", () => {
    // dividends ≈ 45567.46; dBasic=37200 (after £500 allowance), dHigher=7867.46
    // divTax = 37200*0.1075 + 7867.46*0.3575 = 3999 + 2812.62 = 6811.62 → "£6,812"
    const result = locumTakeHomeComparator.compute(BASE);
    const divTaxRow = result.rows?.find((r) => r.label === "Dividend tax (HP 28)");
    expect(divTaxRow?.value).toBe("−£6,812");
  });

  it("limited company: net take-home", () => {
    // net = 12570 + 45567.46 - 0 - 0 - 6811.62 ≈ 51325.84 → "£51,326"
    const result = locumTakeHomeComparator.compute(BASE);
    const ltdRow = result.rows?.find((r) => r.label === "Limited company net take-home");
    expect(ltdRow?.value).toBe("£51,326");
  });

  it("umbrella: net take-home", () => {
    // grossSalary = (72400 + 750) / 1.155 = 63333.33
    // tax = 37700*0.20 + 13063.33*0.40 = 7540 + 5225.33 = 12765.33
    // empNI = (min(50763.33, 37700)*0.08) + (13063.33*0.02) = 3016 + 261.27 = 3277.27
    // net = 63333.33 - 12765.33 - 3277.27 = 47290.73 → "£47,291"
    const result = locumTakeHomeComparator.compute(BASE);
    const umbRow = result.rows?.find((r) => r.label === "Umbrella / PAYE net take-home");
    expect(umbRow?.value).toBe("£47,291");
  });

  it("sole trader above £100k: PA taper + 45%-band split (pinning £150k -> £53,703)", () => {
    // profit = 625*6*40 = 150,000, no expenses; PA fully tapered to £0.
    // taxable 150,000: 37,700@20% + 87,440@40% + 24,860@45% = £53,703 (buggy = £54,332)
    const result = locumTakeHomeComparator.compute({
      dayRate: 625,
      daysPerWeek: 6,
      weeksPerYear: 40,
      annualExpenses: 0,
    });
    const taxRow = result.rows?.find((r) => r.label === "Income tax");
    expect(taxRow?.value).toBe("−£53,703");
  });

  it("zero income: sole trader take-home is clamped to zero", () => {
    // profit=0, tax=0, class2=£179 → without clamp would be negative; tool clamps to £0
    const result = locumTakeHomeComparator.compute({
      dayRate: 0,
      daysPerWeek: 5,
      weeksPerYear: 46,
      annualExpenses: 0,
    });
    const stRow = result.rows?.find((r) => r.label === "Sole trader net take-home");
    expect(stRow?.value).toBe("£0");
  });

  it("ESM4270 warning appears in note", () => {
    const result = locumTakeHomeComparator.compute(BASE);
    expect(result.note).toContain("ESM4270");
    expect(result.note).toContain("IR35");
  });
});
