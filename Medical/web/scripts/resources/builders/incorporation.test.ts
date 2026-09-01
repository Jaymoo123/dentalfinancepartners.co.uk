/**
 * Golden tests for the private practice incorporation comparison Excel workbook builder.
 *
 * Each test calls calcIncorporation() from the compute lib for the reference figure,
 * then verifies the builder's locked constants and default cell values match.
 *
 * REWRITTEN 2026-09-01: the compute lib was corrected (wave C defects A, B, C) so
 * that director salary AND employer NIC are deducted from company profit before
 * corporation tax, corporation tax charges the real CTA 2010 Part 3 bands (19% to
 * GBP50,000, 25% at GBP250,000+, marginal relief fraction 3/200 between), and
 * employer NIC is 15% of salary above the GBP5,000 secondary threshold. The
 * workbook builder was updated in lockstep, so the workbook and the live
 * calculator now AGREE. That agreement is what this file proves: the compute
 * assertions pin calcIncorporation(), and the builder assertions pin the
 * workbook's formula strings and named constants against the same structure.
 *
 * ExcelJS does not evaluate formulas, so the builder tests below cannot read
 * back a computed cell value. Instead they assert the formula strings encode
 * the corrected structure (salary and employer NIC subtracted before CT, a
 * banded CT formula, not a flat rate) and that the Rates sheet carries the
 * banded constants. The worked numeric values are hand-derived in comments
 * and proven against calcIncorporation() in the compute-lib describe block.
 *
 * NHS Pension impact row ALWAYS present (house_positions.md section 2.C,
 * compliance non-negotiable).
 * Class 4 is 6% (NOT the abolished 9%).
 * Dividend rates 2026/27 (FA 2026 s.4): 10.75% / 35.75% / 39.35%.
 *
 * Vitest: run with `npm test --workspace Medical/web`
 * No em-dashes in test names.
 */
import { describe, it, expect } from "vitest";
import { calcIncorporation } from "../../../src/lib/tools/compute/incorporation.js";
import { build } from "./incorporation.js";
import type ExcelJS from "exceljs";

// ---- Locked constants (banded CT, matching both the lib and the workbook) ----
const PA = 12570;
const CT_SMALL = 0.19;
const CT_MAIN = 0.25;
const CT_LOWER = 50000;
const CT_UPPER = 250000;
const CT_MARGIN = 3 / 200;
const EMP_NIC_RATE = 0.15;
const EMP_NIC_THRESHOLD = 5000;
const DIV_ALLOWANCE = 500;
const DIV_BASIC = 0.1075;
const DIV_HIGHER = 0.3575;
const DIV_ADDITIONAL = 0.3935;
const C4_MAIN = 0.06; // 6%: NOT the abolished 9%

function findRateRow(rates: ExcelJS.Worksheet, value: number, tolerance = 0.0001): number | null {
  let found: number | null = null;
  rates.eachRow((row, rowNumber) => {
    if (rowNumber > 1 && Math.abs((row.getCell(2).value as number) - value) < tolerance) {
      found = rowNumber;
    }
  });
  return found;
}

describe("incorporation compute lib (golden)", () => {
  it("INC-A: default case (100k private, 15k expenses, 12570 salary, 50k NHS)", () => {
    const result = calcIncorporation({
      privateIncome: 100000,
      expenses: 15000,
      desiredSalary: 12570,
      nhsIncome: 50000,
    });
    // Sole trader: profit=85000, taxableIncome=135000 (> £125,140 so PA tapers to £0)
    // Income tax on 135000: 7540 + 87440*0.4 + (135000-125140)*0.45 = 7540+34976+4437 = 46953
    // NI on 85000: 37700*0.06+34730*0.02 = 2262+694.6 = 2956.6
    // soleTraderTotalTax = 49909.6
    expect(result.soleTraderTaxableIncome).toBe(135000);
    expect(result.soleTraderTotalTax).toBeCloseTo(49909.6, 1);

    // Limited company, corrected 2026-09-01, salary and employer NIC deducted before CT:
    //   employerNIC = (12570-5000)*0.15 = 1135.50
    //   chargeable = 85000 - 12570 - 1135.50 = 71294.50 (marginal band)
    //   CT = 71294.50*0.25 - (3/200)*(250000-71294.50) = 17823.625 - 2680.5825 = 15143.0425
    //   dividendAmount = 71294.50 - 15143.0425 = 56151.4575
    //   payeIncome = 50000+12570 = 62570; taxable(PA 12570) = 50000
    //     basic 37700*0.2=7540; higher (50000-37700)*0.4=4920; payeIncomeTax = 12460
    //   dividend stacking on 62570 of PAYE income:
    //     basicRateRemaining = max(0, 50270-62570) = 0
    //     higherRateRemaining = 125140-62570 = 62570
    //     taxableDividends = 56151.4575-500 = 55651.4575, all higher rate (< 62570)
    //     dividendTax = 55651.4575*0.3575 = 19895.396056
    //   ltdTotalTax = 15143.0425 + 1135.50 + 19895.396056 + 12460 = 48633.938556
    expect(result.companyProfit).toBe(85000);
    expect(result.employerNIC).toBeCloseTo(1135.5, 2);
    expect(result.corporationTax).toBeCloseTo(15143.0425, 2);
    expect(result.dividendAmount).toBeCloseTo(56151.4575, 2);
    expect(result.dividendTax).toBeCloseTo(19895.396056, 2);
    expect(result.payeIncomeTax).toBeCloseTo(12460, 2);
    expect(result.limitedCompanyTotalTax).toBeCloseTo(48633.938556, 2);

    expect(result.taxSavings).toBeCloseTo(1275.661444, 2);
    expect(result.savingsPerMonth).toBeCloseTo(1275.661444 / 12, 2);
  });

  it("WORKED EXAMPLE (matches medical-tools.test.ts): private=120000 expenses=20000 salary=20000 nhs=30000", () => {
    // Chosen so the salary is above the £5,000 secondary threshold and the
    // chargeable profit lands inside the marginal relief band. Re-derived
    // independently here, not copied from the compute lib.
    //
    // Company side:
    //   companyProfit    = 120000 - 20000 = 100000
    //   employerNIC      = (20000-5000)*0.15 = 15000*0.15 = 2250
    //   chargeableProfit = 100000 - 20000 - 2250 = 77750
    //   CT               = 77750*0.25 - (3/200)*(250000-77750)
    //                    = 19437.50 - 0.015*172250 = 19437.50 - 2583.75 = 16853.75
    //   dividendAmount   = 77750 - 16853.75 = 60896.25
    //   payeIncome       = 30000+20000 = 50000; taxable 37430 (basic band only)
    //     payeIncomeTax  = 37430*0.2 = 7486
    //   dividend stacking on 50000 of PAYE income:
    //     basicRateRemaining  = 50270-50000 = 270 -> 270*0.1075 = 29.025
    //     taxableDividends    = 60896.25-500 = 60396.25
    //     higherRateDivs      = 60396.25-270 = 60126.25 -> *0.3575 = 21495.134375
    //     dividendTax         = 29.025 + 21495.134375 = 21524.159375
    //   ltdTotalTax = 16853.75 + 2250 + 21524.159375 + 7486 = 48113.909375
    const result = calcIncorporation({
      privateIncome: 120000,
      expenses: 20000,
      desiredSalary: 20000,
      nhsIncome: 30000,
    });
    expect(result.employerNIC).toBeCloseTo(2250, 6);
    expect(result.corporationTax).toBeCloseTo(16853.75, 4);
    expect(result.dividendAmount).toBeCloseTo(60896.25, 4);
    expect(result.dividendTax).toBeCloseTo(21524.159375, 4);
    expect(result.payeIncomeTax).toBeCloseTo(7486, 6);
    expect(result.limitedCompanyTotalTax).toBeCloseTo(48113.909375, 4);
    expect(result.taxSavings).toBeCloseTo(-154.309375, 4);
  });

  it("INC-C: Class 4 is 6 percent (spot check sole trader NI on 60k profit, no NHS)", () => {
    const result = calcIncorporation({
      privateIncome: 60000,
      expenses: 0,
      desiredSalary: 12570,
      nhsIncome: 0,
    });
    expect(result.soleTraderTotalTax).toBeCloseTo(13888.6, 1);
    const expectedNiBand1 = 37700 * C4_MAIN;
    expect(expectedNiBand1).toBeCloseTo(2262, 2);
  });

  it("INC-D: dividend allowance is GBP500 (2026/27, FA 2026 s.4)", () => {
    const result = calcIncorporation({
      privateIncome: 50000,
      expenses: 0,
      desiredSalary: 12570,
      nhsIncome: 0,
    });
    // chargeable = 50000 - 12570 - 1135.50 = 36294.50, inside the 19% band
    // CT = 36294.50 * 0.19 = 6895.955; dividendAmount = 29398.545
    expect(result.corporationTax).toBeCloseTo(6895.955, 2);
    expect(result.dividendAmount).toBeCloseTo(29398.545, 2);
    expect(result.dividendTax).toBeGreaterThan(0);
  });

  it("INC-E: conservation check: taxSavings = soleTraderTotalTax - limitedCompanyTotalTax", () => {
    const result = calcIncorporation({
      privateIncome: 120000,
      expenses: 10000,
      desiredSalary: 12570,
      nhsIncome: 40000,
    });
    const diff = Math.abs(result.taxSavings - (result.soleTraderTotalTax - result.limitedCompanyTotalTax));
    expect(diff).toBeLessThan(0.01);
  });

  it("INC-F: corporation tax applies marginal relief between the two limits", () => {
    const result = calcIncorporation({
      privateIncome: 100000,
      expenses: 0,
      desiredSalary: 12570,
      nhsIncome: 0,
    });
    // chargeable = 100000 - 12570 - 1135.50 = 86294.50
    // CT = 86294.50*0.25 - (3/200)*(250000-86294.50) = 21573.625 - 2455.5825 = 19118.0425
    expect(result.corporationTax).toBeCloseTo(19118.0425, 2);
    // Confirm it is NOT a flat 25% charge on the whole profit.
    expect(result.corporationTax).not.toBeCloseTo(100000 * CT_MAIN, 0);
  });

  it("INC-G: dividend basic rate is 10.75 percent (2026/27, NOT 8.75 percent)", () => {
    const result = calcIncorporation({
      privateIncome: 40000,
      expenses: 0,
      desiredSalary: 0,
      nhsIncome: 0,
    });
    // No salary, so no employer NIC, and the whole £40,000 sits inside the 19% band.
    // CT = 40000*0.19 = 7600; dividendAmount = 32400; taxableDividends = 31900
    expect(result.corporationTax).toBeCloseTo(7600, 2);
    expect(result.dividendTax).toBeCloseTo(31900 * DIV_BASIC, 2);
    expect(result.dividendTax).not.toBeCloseTo(31900 * 0.0875, 1);
  });

  it("INC-H: higher dividend rate is 35.75 percent (2026/27)", () => {
    const result = calcIncorporation({
      privateIncome: 120000,
      expenses: 0,
      desiredSalary: 12570,
      nhsIncome: 60000,
    });
    expect(result.dividendTax).toBeGreaterThan(0);
    const expected = calcIncorporation({
      privateIncome: 120000,
      expenses: 0,
      desiredSalary: 12570,
      nhsIncome: 60000,
    }).dividendTax;
    expect(expected).toBeCloseTo(result.dividendTax, 2);
  });

  it("INC-I: employer NIC is 15 percent above the GBP5,000 secondary threshold", () => {
    const below = calcIncorporation({
      privateIncome: 50000,
      expenses: 0,
      desiredSalary: 4000, // below threshold
      nhsIncome: 0,
    });
    expect(below.employerNIC).toBe(0);

    const above = calcIncorporation({
      privateIncome: 50000,
      expenses: 0,
      desiredSalary: 20000,
      nhsIncome: 0,
    });
    expect(above.employerNIC).toBeCloseTo((20000 - EMP_NIC_THRESHOLD) * EMP_NIC_RATE, 6);
  });
});

describe("incorporation builder (workbook sanity)", () => {
  it("build() returns a workbook with the expected sheets", () => {
    const wb = build();
    const sheetNames = wb.worksheets.map((ws) => ws.name);
    expect(sheetNames).toContain("Your figures");
    expect(sheetNames).toContain("Rates");
    expect(sheetNames).toContain("Start here");
    expect(sheetNames).toContain("Notes");
  });

  it("build() wb.creator is Medical Accountants UK", () => {
    const wb = build();
    expect(wb.creator).toBe("Medical Accountants UK");
  });

  it("build() Rates sheet carries the banded CT constants (19% and 25%, not a flat rate)", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates")!;
    expect(findRateRow(rates, CT_SMALL)).not.toBeNull();
    expect(findRateRow(rates, CT_MAIN)).not.toBeNull();
    expect(findRateRow(rates, CT_LOWER, 0.5)).not.toBeNull();
    expect(findRateRow(rates, CT_UPPER, 0.5)).not.toBeNull();
    expect(findRateRow(rates, CT_MARGIN)).not.toBeNull();
  });

  it("build() Rates sheet carries the employer NIC constants (15% above GBP5,000)", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates")!;
    expect(findRateRow(rates, EMP_NIC_RATE)).not.toBeNull();
    expect(findRateRow(rates, EMP_NIC_THRESHOLD, 0.5)).not.toBeNull();
  });

  it("build() DIV_ALLOWANCE on Rates sheet equals 500", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates")!;
    expect(findRateRow(rates, DIV_ALLOWANCE, 0.5)).not.toBeNull();
  });

  it("build() DIV_BASIC / DIV_HIGHER / DIV_ADDITIONAL on Rates sheet are 2026/27 rates", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates")!;
    expect(findRateRow(rates, DIV_BASIC)).not.toBeNull();
    expect(findRateRow(rates, DIV_HIGHER)).not.toBeNull();
    expect(findRateRow(rates, DIV_ADDITIONAL)).not.toBeNull();
  });

  it("build() C4_MAIN on Rates sheet equals 0.06 (6 percent, NOT abolished 9 percent)", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates")!;
    expect(findRateRow(rates, C4_MAIN)).not.toBeNull();
  });

  it("build() employer NIC formula subtracts the secondary threshold before the 15% rate", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures")!;
    const fv = ws.getCell("B18").value as ExcelJS.CellFormulaValue;
    expect(fv.formula).toContain("In_Salary");
    expect(fv.formula).toContain("EMP_NIC_THRESHOLD");
    expect(fv.formula).toContain("EMP_NIC_RATE");
  });

  it("build() chargeable-profit formula deducts salary AND employer NIC before CT", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures")!;
    const fv = ws.getCell("B19").value as ExcelJS.CellFormulaValue;
    expect(fv.formula).toContain("LTD_CompanyProfit");
    expect(fv.formula).toContain("In_Salary");
    expect(fv.formula).toContain("LTD_EmployerNIC");
  });

  it("build() corporation tax formula is banded (19% / marginal relief / 25%), not flat", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures")!;
    const fv = ws.getCell("B20").value as ExcelJS.CellFormulaValue;
    expect(fv.formula).toContain("CT_LOWER");
    expect(fv.formula).toContain("CT_UPPER");
    expect(fv.formula).toContain("CT_SMALL");
    expect(fv.formula).toContain("CT_MAIN");
    expect(fv.formula).toContain("CT_MARGIN");
    expect(fv.formula).toContain("IF(");
    // References the profit chargeable AFTER salary and employer NIC, not the raw company profit.
    expect(fv.formula).toContain("LTD_ChargeableProfit");
  });

  it("build() dividend amount is chargeable profit minus CT (salary already deducted upstream)", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures")!;
    const fv = ws.getCell("B21").value as ExcelJS.CellFormulaValue;
    expect(fv.formula).toBe("LTD_ChargeableProfit-LTD_CT");
  });

  it("build() PAYE income tax is computed on NHS income plus salary together", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures")!;
    const fv = ws.getCell("B25").value as ExcelJS.CellFormulaValue;
    expect(fv.formula).toContain("LTD_IncomeBeforeDiv");
  });

  it("build() limited company total tax includes employer NIC", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures")!;
    const fv = ws.getCell("B26").value as ExcelJS.CellFormulaValue;
    expect(fv.formula).toContain("LTD_EmployerNIC");
    expect(fv.formula).toContain("LTD_CT");
    expect(fv.formula).toContain("LTD_DividendTax");
    expect(fv.formula).toContain("LTD_PayeIncomeTax");
  });

  it("build() net income rows use the same definition on both sides", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures")!;
    const stNet = (ws.getCell("B14").value as ExcelJS.CellFormulaValue).formula;
    const ltdNet = (ws.getCell("B27").value as ExcelJS.CellFormulaValue).formula;
    expect(stNet).toBe("ST_TaxableIncome-ST_TotalTax");
    expect(ltdNet).toBe("In_NhsIncome+In_Salary+LTD_DividendAmount-LTD_DividendTax-LTD_PayeIncomeTax");
  });

  it("build() default In_PrivateIncome = 100000", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures");
    expect(ws).toBeDefined();
    const val = ws!.getCell("B3").value;
    expect(val).toBe(100000);
  });

  it("build() default In_Expenses = 15000", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures");
    const val = ws!.getCell("B4").value;
    expect(val).toBe(15000);
  });

  it("build() default In_NhsIncome = 50000", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures");
    const val = ws!.getCell("B5").value;
    expect(val).toBe(50000);
  });

  it("build() default In_Salary = 12570", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures");
    const val = ws!.getCell("B6").value;
    expect(val).toBe(PA); // salary pinned at PA
  });

  it("build() conservation check row is formula-based", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures");
    // Conservation check formula references TaxSavings
    const checkCell = ws!.getCell("B33");
    const fv = checkCell.value as ExcelJS.CellFormulaValue;
    expect(typeof fv).toBe("object");
    const formula = (fv as { formula: string }).formula;
    expect(formula).toContain("TaxSavings");
  });

  it("build() NHS pension impact row is always present", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures");
    // Row 35 contains the NHS pension impact heading
    const cell = ws!.getCell("A35");
    const text = String(cell.value ?? "");
    expect(text.toUpperCase()).toContain("NHS PENSION");
  });

  it("build() PA constant on Rates sheet equals 12570", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates");
    // Row 2 = PA
    const val = rates!.getCell("B2").value;
    expect(val).toBe(PA);
  });

  it("build() Notes sheet discloses the not-modelled items, no flat-rate or missing-erNIC claim", () => {
    const wb = build();
    const notes = wb.getWorksheet("Notes")!;
    const allText: string[] = [];
    notes.eachRow((row) => {
      allText.push(String(row.getCell(1).value ?? ""));
    });
    const joined = allText.join("\n");
    expect(joined).not.toContain("flat 25%");
    expect(joined).not.toContain("does not include employer NIC");
    expect(joined.toLowerCase()).toContain("associated companies");
    expect(joined).toContain("Employment Allowance");
    expect(joined.toLowerCase()).toContain("primary class 1 nic");
    expect(joined).not.toContain("—"); // no em-dashes
  });
});
