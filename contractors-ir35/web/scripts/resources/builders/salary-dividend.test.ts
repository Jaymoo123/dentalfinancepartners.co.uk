/**
 * Golden tests for the salary and dividend planner Excel workbook builder.
 *
 * Uses personalTax() from tax2026.ts as the reference. The default scenario
 * (salary=12570, dividends=50000) exercises the basic and higher dividend bands.
 *
 * Golden case:
 *   salary=12570, dividends=50000
 *   -> personalTax(12570, 50000).dividendTax = 8396.25
 *   -> personalTax(12570, 50000).totalPersonalTax = 8396.25
 *      (incomeTaxOnSalary=0 because salary=PA; employeeNI=0 because salary=PT)
 *
 * LET-free: no LET() in any formula cell. No em-dashes in test names.
 * Vitest: npm test --workspace contractors-ir35/web.
 */
import { describe, it, expect } from "vitest";
import {
  personalTax,
  corporationTax,
  PERSONAL_ALLOWANCE,
  DIVIDEND_ALLOWANCE,
  DIVIDEND_RATES,
  CT,
} from "../../../src/lib/calculators/tax2026.js";
import { build } from "./salary-dividend.js";
import type ExcelJS from "exceljs";

const PA = PERSONAL_ALLOWANCE;
const DIV_ALLOWANCE = DIVIDEND_ALLOWANCE;
const DIV_BASIC = DIVIDEND_RATES.ordinary;
const DIV_HIGHER = DIVIDEND_RATES.upper;
const DIV_ADDITIONAL = DIVIDEND_RATES.additional;
const CT_MAIN = CT.mainRate;
const CT_SMALL = CT.smallRate;

const DEFAULT_COMPANY_PROFIT = 100000;
const DEFAULT_SALARY = 12570;
const DEFAULT_DIVIDENDS = 50000;

describe("salary-dividend compute lib (golden)", () => {
  it("PAY-A: personalTax(12570, 50000) dividendTax = 8396.25", () => {
    const result = personalTax(DEFAULT_SALARY, DEFAULT_DIVIDENDS);
    // dBasic_raw=37700; aBasic=500; dBasic=37200; dHigher=12300; aHigher=0
    // tax = 37200*0.1075 + 12300*0.3575 = 3999 + 4397.25 = 8396.25
    expect(result.dividendTax).toBeCloseTo(8396.25, 1);
  });

  it("PAY-B: personalTax(12570, 50000) incomeTaxOnSalary = 0 (salary at PA level)", () => {
    const result = personalTax(DEFAULT_SALARY, DEFAULT_DIVIDENDS);
    expect(result.incomeTaxOnSalary).toBe(0);
  });

  it("PAY-C: personalTax(12570, 50000) employeeNI = 0 (salary at primary threshold)", () => {
    const result = personalTax(DEFAULT_SALARY, DEFAULT_DIVIDENDS);
    expect(result.employeeNI).toBe(0);
  });

  it("PAY-D: personalTax(12570, 50000) totalPersonalTax = 8396.25 (div tax only)", () => {
    const result = personalTax(DEFAULT_SALARY, DEFAULT_DIVIDENDS);
    expect(result.totalPersonalTax).toBeCloseTo(8396.25, 1);
    const diff = Math.abs(
      result.totalPersonalTax - (result.incomeTaxOnSalary + result.dividendTax + result.employeeNI)
    );
    expect(diff).toBeLessThan(0.01);
  });

  it("PAY-E: dividend allowance is GBP500 (FA 2026 s.4): zero-rated", () => {
    expect(DIV_ALLOWANCE).toBe(500);
    // Allowance reduces taxable divs: 37200 (not 37700) at basic rate
    const result = personalTax(DEFAULT_SALARY, DEFAULT_DIVIDENDS);
    // If allowance were 0: 37700*0.1075 + 12300*0.3575 = 4052.75 + 4397.25 = 8450
    // With 500 allowance: 37200*0.1075 + 12300*0.3575 = 3999 + 4397.25 = 8396.25
    const withoutAllowance = 37700 * DIV_BASIC + 12300 * DIV_HIGHER;
    expect(result.dividendTax).toBeLessThan(withoutAllowance);
  });

  it("PAY-F: dividend basic rate is 10.75 percent (NOT 8.75 percent): FA 2026 s.4", () => {
    expect(DIV_BASIC).toBeCloseTo(0.1075, 4);
    expect(DIV_BASIC).not.toBeCloseTo(0.0875, 4);
  });

  it("PAY-G: dividend higher rate is 35.75 percent (NOT 32.5 percent): FA 2026 s.4", () => {
    expect(DIV_HIGHER).toBeCloseTo(0.3575, 4);
    expect(DIV_HIGHER).not.toBeCloseTo(0.325, 4);
  });

  it("PAY-H: dividend additional rate is 39.35 percent: FA 2026 s.4", () => {
    expect(DIV_ADDITIONAL).toBeCloseTo(0.3935, 4);
  });

  it("PAY-I: CT on 100000 uses marginal relief (not 19% flat, not 25% flat)", () => {
    const ct = corporationTax(DEFAULT_COMPANY_PROFIT);
    // marginal relief: 100000*0.25 - 0.015*(250000-100000) = 25000 - 2250 = 22750
    expect(ct).toBeCloseTo(22750, 1);
    expect(ct).not.toBeCloseTo(DEFAULT_COMPANY_PROFIT * 0.19, 0);
    expect(ct).not.toBeCloseTo(DEFAULT_COMPANY_PROFIT * 0.25, 0);
  });

  it("PAY-J: CT on 40000 uses small profits rate 19 percent", () => {
    const ct = corporationTax(40000);
    expect(ct).toBeCloseTo(40000 * CT_SMALL, 2);
  });

  it("PAY-K: CT on 300000 uses main rate 25 percent", () => {
    const ct = corporationTax(300000);
    expect(ct).toBeCloseTo(300000 * CT_MAIN, 2);
  });

  it("PAY-L: PA taper fires above GBP100k ANI", () => {
    // ANI = 120000 -> taper = (120000-100000)/2 = 10000; PA = 12570-10000 = 2570
    const result = personalTax(120000, 0);
    expect(result.personalAllowance).toBeCloseTo(2570, 1);
  });

  it("PAY-M: conservation check: totalPersonalTax = incomeTax + divTax + NI", () => {
    const result = personalTax(DEFAULT_SALARY, DEFAULT_DIVIDENDS);
    const diff = Math.abs(
      result.totalPersonalTax - (result.incomeTaxOnSalary + result.dividendTax + result.employeeNI)
    );
    expect(diff).toBeLessThan(0.01);
  });
});

describe("salary-dividend builder (workbook sanity)", () => {
  it("build() returns a workbook with the expected sheets", () => {
    const wb = build();
    const names = wb.worksheets.map((ws) => ws.name);
    expect(names).toContain("Your figures");
    expect(names).toContain("Rates");
    expect(names).toContain("Start here");
    expect(names).toContain("Notes");
  });

  it("build() wb.creator is Contractor Tax Accountants", () => {
    const wb = build();
    expect(wb.creator).toBe("Contractor Tax Accountants");
  });

  it("build() PA on Rates sheet equals 12570", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates")!;
    expect(rates.getCell("B2").value).toBe(PA);
  });

  it("build() DIV_ALLOWANCE on Rates sheet equals 500", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates")!;
    let found = false;
    rates.eachRow((row, rowNumber) => {
      if (rowNumber > 1 && row.getCell(2).value === DIV_ALLOWANCE) found = true;
    });
    expect(found).toBe(true);
  });

  it("build() DIV_BASIC on Rates sheet equals 0.1075 (10.75 percent)", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates")!;
    let found = false;
    rates.eachRow((row, rowNumber) => {
      if (rowNumber > 1 && Math.abs((row.getCell(2).value as number) - DIV_BASIC) < 0.0001) found = true;
    });
    expect(found).toBe(true);
  });

  it("build() DIV_HIGHER on Rates sheet equals 0.3575 (35.75 percent, 2026/27)", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates")!;
    let found = false;
    rates.eachRow((row, rowNumber) => {
      if (rowNumber > 1 && Math.abs((row.getCell(2).value as number) - DIV_HIGHER) < 0.0001) found = true;
    });
    expect(found).toBe(true);
  });

  it("build() DIV_ADDITIONAL on Rates sheet equals 0.3935", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates")!;
    let found = false;
    rates.eachRow((row, rowNumber) => {
      if (rowNumber > 1 && Math.abs((row.getCell(2).value as number) - DIV_ADDITIONAL) < 0.0001) found = true;
    });
    expect(found).toBe(true);
  });

  it("build() CT_MAIN on Rates sheet equals 0.25", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates")!;
    let found = false;
    rates.eachRow((row, rowNumber) => {
      if (rowNumber > 1 && Math.abs((row.getCell(2).value as number) - CT_MAIN) < 0.0001) found = true;
    });
    expect(found).toBe(true);
  });

  it("build() default P_CompanyProfit = 100000", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures")!;
    expect(ws.getCell("B3").value).toBe(DEFAULT_COMPANY_PROFIT);
  });

  it("build() default P_Salary = 12570 (PA level)", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures")!;
    expect(ws.getCell("B4").value).toBe(DEFAULT_SALARY);
    expect(ws.getCell("B4").value).toBe(PA);
  });

  it("build() default P_Dividends = 50000", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures")!;
    expect(ws.getCell("B5").value).toBe(DEFAULT_DIVIDENDS);
  });

  it("build() P_TotalPersonalTax formula references P_IncomeTax, P_DividendTax, P_EmployeeNI", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures")!;
    const fv = ws.getCell("B32").value as ExcelJS.CellFormulaValue;
    const formula = (fv as { formula: string }).formula;
    expect(formula).toContain("P_IncomeTax");
    expect(formula).toContain("P_DividendTax");
    expect(formula).toContain("P_EmployeeNI");
  });

  it("build() P_DividendTax formula references P_DivBasic and P_AllowB", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures")!;
    const fv = ws.getCell("B30").value as ExcelJS.CellFormulaValue;
    const formula = (fv as { formula: string }).formula;
    expect(formula).toContain("P_DivBasic");
    expect(formula).toContain("P_AllowB");
    expect(formula).toContain("DIV_BASIC");
  });

  it("build() P_CT formula uses marginal relief (CT_LOWER, CT_UPPER, CT_FRAC)", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures")!;
    const fv = ws.getCell("B10").value as ExcelJS.CellFormulaValue;
    const formula = (fv as { formula: string }).formula;
    expect(formula).toContain("CT_LOWER");
    expect(formula).toContain("CT_UPPER");
    expect(formula).toContain("CT_FRAC");
    expect(formula.toUpperCase()).not.toContain("LET(");
  });

  it("build() conservation check formula references P_TotalPersonalTax", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures")!;
    const fv = ws.getCell("B35").value as ExcelJS.CellFormulaValue;
    const formula = (fv as { formula: string }).formula;
    expect(formula).toContain("P_TotalPersonalTax");
  });

  it("build() dividend allowance note is always present in row 37", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures")!;
    const text = String(ws.getCell("A37").value ?? "");
    expect(text.toUpperCase()).toContain("DIVIDEND ALLOWANCE");
    expect(text).toContain("2026/27");
  });

  it("build() no LET() in any Your figures cell formula", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures")!;
    ws.eachRow((row) => {
      row.eachCell((cell) => {
        if (cell.type === 6 /* Formula */) {
          const fv = cell.value as ExcelJS.CellFormulaValue;
          const formula = (fv as { formula?: string }).formula ?? "";
          expect(formula.toUpperCase()).not.toContain("LET(");
        }
      });
    });
  });

  it("build() P_DivCheck row warns when dividends exceed distributable profit", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures")!;
    const fv = ws.getCell("B12").value as ExcelJS.CellFormulaValue;
    const formula = (fv as { formula: string }).formula;
    // Formula should reference P_Dividends and P_ProfitAfterCT
    expect(formula).toContain("P_Dividends");
    expect(formula).toContain("P_ProfitAfterCT");
  });
});
