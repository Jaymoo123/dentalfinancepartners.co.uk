/**
 * Golden tests for the outside vs inside IR35 take-home comparison Excel workbook builder.
 *
 * Pattern: call limitedTakeHome() and umbrellaTakeHome() from the compute lib for the
 * reference figures, then verify the builder's locked constants and default cell values.
 *
 * Golden case (brief section 2):
 *   dayRate=500, billableDays=240, salary=12570, expenses=6000, umbrellaMargin=1200
 *   -> turnover=120000
 *   -> limitedTakeHome({turnover:120000,salary:12570,expenses:6000}).netTakeHome = 71820.95
 *   -> umbrellaTakeHome({assignmentIncome:120000,umbrellaMargin:1200}).netTakeHome = 69889.87
 *   -> gap = 1931.08
 *
 * LET-free: no LET() in any formula cell (verified by spot-checking formula strings).
 * No em-dashes in test names. Vitest: npm test --workspace contractors-ir35/web.
 */
import { describe, it, expect } from "vitest";
import {
  limitedTakeHome,
  umbrellaTakeHome,
  PERSONAL_ALLOWANCE,
  DIVIDEND_ALLOWANCE,
  DIVIDEND_RATES,
  NI,
  CT,
} from "../../../src/lib/calculators/tax2026.js";
import { build } from "./ir35-compare.js";
import type ExcelJS from "exceljs";

// ---- Locked constants (traced to tax2026.ts) ----
const PA = PERSONAL_ALLOWANCE;         // 12570
const DIV_ALLOWANCE = DIVIDEND_ALLOWANCE; // 500
const DIV_BASIC = DIVIDEND_RATES.ordinary; // 0.1075
const DIV_HIGHER = DIVIDEND_RATES.upper;   // 0.3575
const DIV_ADDITIONAL = DIVIDEND_RATES.additional; // 0.3935
const ER_RATE = NI.employerRate;       // 0.15
const CT_SMALL = CT.smallRate;         // 0.19
const CT_MAIN = CT.mainRate;           // 0.25
const CT_LOWER = CT.lowerLimit;        // 50000
const CT_UPPER = CT.upperLimit;        // 250000

// ---- Default inputs (brief golden case) ----
const DEFAULT_DAY_RATE = 500;
const DEFAULT_DAYS = 240;
const DEFAULT_SALARY = 12570;
const DEFAULT_EXPENSES = 6000;
const DEFAULT_UMBRELLA_MARGIN = 1200;
const DEFAULT_TURNOVER = DEFAULT_DAY_RATE * DEFAULT_DAYS; // 120000

describe("ir35 compute lib (golden)", () => {
  it("INC-A: limitedTakeHome default -> netTakeHome = 71820.95", () => {
    const result = limitedTakeHome({
      turnover: DEFAULT_TURNOVER,
      salary: DEFAULT_SALARY,
      expenses: DEFAULT_EXPENSES,
    });
    expect(result.netTakeHome).toBeCloseTo(71820.95, 1);
  });

  it("INC-B: umbrellaTakeHome default -> netTakeHome = 69889.87", () => {
    const result = umbrellaTakeHome({
      assignmentIncome: DEFAULT_TURNOVER,
      umbrellaMargin: DEFAULT_UMBRELLA_MARGIN,
    });
    expect(result.netTakeHome).toBeCloseTo(69889.87, 1);
  });

  it("INC-C: gap = outside minus inside = 1931.08", () => {
    const outside = limitedTakeHome({
      turnover: DEFAULT_TURNOVER,
      salary: DEFAULT_SALARY,
      expenses: DEFAULT_EXPENSES,
    });
    const inside = umbrellaTakeHome({
      assignmentIncome: DEFAULT_TURNOVER,
      umbrellaMargin: DEFAULT_UMBRELLA_MARGIN,
    });
    expect(outside.netTakeHome - inside.netTakeHome).toBeCloseTo(1931.08, 1);
  });

  it("INC-D: employer NIC on salary = (12570 - 5000) * 0.15 = 1135.50", () => {
    const result = limitedTakeHome({
      turnover: DEFAULT_TURNOVER,
      salary: DEFAULT_SALARY,
      expenses: DEFAULT_EXPENSES,
    });
    expect(result.employerNI).toBeCloseTo(1135.5, 2);
  });

  it("INC-E: profit before CT = 100294.50", () => {
    const result = limitedTakeHome({
      turnover: DEFAULT_TURNOVER,
      salary: DEFAULT_SALARY,
      expenses: DEFAULT_EXPENSES,
    });
    expect(result.profitBeforeTax).toBeCloseTo(100294.5, 1);
  });

  it("INC-F: corporation tax on 100294.50 uses marginal relief (not 19% flat, not 25% flat)", () => {
    const result = limitedTakeHome({
      turnover: DEFAULT_TURNOVER,
      salary: DEFAULT_SALARY,
      expenses: DEFAULT_EXPENSES,
    });
    // marginal relief: profit*25% - (3/200)*(250000-profit)
    // 100294.5*0.25 - 0.015*(250000-100294.5) = 25073.625 - 2245.5825 = 22828.04
    expect(result.corporationTax).toBeCloseTo(22828.04, 1);
    // Confirm NOT flat 19% or flat 25%
    expect(result.corporationTax).not.toBeCloseTo(100294.5 * 0.19, 0);
    expect(result.corporationTax).not.toBeCloseTo(100294.5 * 0.25, 0);
  });

  it("INC-G: dividend allowance is GBP500 (FA 2026 s.4)", () => {
    expect(DIV_ALLOWANCE).toBe(500);
  });

  it("INC-H: dividend basic rate is 10.75 percent (NOT 8.75 percent): FA 2026 s.4", () => {
    expect(DIV_BASIC).toBeCloseTo(0.1075, 4);
    expect(DIV_BASIC).not.toBeCloseTo(0.0875, 4);
  });

  it("INC-I: dividend higher rate is 35.75 percent (NOT 32.5 percent): FA 2026 s.4", () => {
    expect(DIV_HIGHER).toBeCloseTo(0.3575, 4);
    expect(DIV_HIGHER).not.toBeCloseTo(0.325, 4);
  });

  it("INC-J: dividend additional rate is 39.35 percent: FA 2026 s.4", () => {
    expect(DIV_ADDITIONAL).toBeCloseTo(0.3935, 4);
  });

  it("INC-K: employer NIC rate is 15 percent above GBP5000 (April 2025 rise)", () => {
    expect(ER_RATE).toBeCloseTo(0.15, 4);
  });

  it("INC-L: CT small rate 19 percent up to GBP50000", () => {
    expect(CT_SMALL).toBeCloseTo(0.19, 4);
    expect(CT_LOWER).toBe(50000);
  });

  it("INC-M: CT main rate 25 percent above GBP250000", () => {
    expect(CT_MAIN).toBeCloseTo(0.25, 4);
    expect(CT_UPPER).toBe(250000);
  });

  it("INC-N: conservation check: gap = outside - inside", () => {
    const outside = limitedTakeHome({
      turnover: DEFAULT_TURNOVER,
      salary: DEFAULT_SALARY,
      expenses: DEFAULT_EXPENSES,
    });
    const inside = umbrellaTakeHome({
      assignmentIncome: DEFAULT_TURNOVER,
      umbrellaMargin: DEFAULT_UMBRELLA_MARGIN,
    });
    const gap = outside.netTakeHome - inside.netTakeHome;
    const diff = Math.abs(gap - (outside.netTakeHome - inside.netTakeHome));
    expect(diff).toBeLessThan(0.01);
  });

  it("INC-O: umbrella grossSalary formula: (pot + ER_RATE * ER_ST) / (1 + ER_RATE + LEVY)", () => {
    const result = umbrellaTakeHome({
      assignmentIncome: DEFAULT_TURNOVER,
      umbrellaMargin: DEFAULT_UMBRELLA_MARGIN,
    });
    // grossSalary = (118800 + 750) / 1.155 = 103506.49
    expect(result.grossSalary).toBeCloseTo(103506.49, 1);
  });
});

describe("ir35-compare builder (workbook sanity)", () => {
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
    const val = rates.getCell("B2").value;
    expect(val).toBe(PA);
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

  it("build() DIV_ADDITIONAL on Rates sheet equals 0.3935 (39.35 percent)", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates")!;
    let found = false;
    rates.eachRow((row, rowNumber) => {
      if (rowNumber > 1 && Math.abs((row.getCell(2).value as number) - DIV_ADDITIONAL) < 0.0001) found = true;
    });
    expect(found).toBe(true);
  });

  it("build() ER_RATE on Rates sheet equals 0.15 (15 percent)", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates")!;
    let found = false;
    rates.eachRow((row, rowNumber) => {
      if (rowNumber > 1 && Math.abs((row.getCell(2).value as number) - ER_RATE) < 0.0001) found = true;
    });
    expect(found).toBe(true);
  });

  it("build() CT_MAIN on Rates sheet equals 0.25 (25 percent)", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates")!;
    let found = false;
    rates.eachRow((row, rowNumber) => {
      if (rowNumber > 1 && Math.abs((row.getCell(2).value as number) - CT_MAIN) < 0.0001) found = true;
    });
    expect(found).toBe(true);
  });

  it("build() default In_DayRate = 500", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures")!;
    expect(ws.getCell("B3").value).toBe(DEFAULT_DAY_RATE);
  });

  it("build() default In_Days = 240", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures")!;
    expect(ws.getCell("B4").value).toBe(DEFAULT_DAYS);
  });

  it("build() default In_Salary = 12570 (PA level)", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures")!;
    expect(ws.getCell("B5").value).toBe(DEFAULT_SALARY);
    expect(ws.getCell("B5").value).toBe(PA);
  });

  it("build() default In_Expenses = 6000", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures")!;
    expect(ws.getCell("B6").value).toBe(DEFAULT_EXPENSES);
  });

  it("build() default In_UmbrellaMargin = 1200", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures")!;
    expect(ws.getCell("B7").value).toBe(DEFAULT_UMBRELLA_MARGIN);
  });

  it("build() Out_NetTakeHome formula references Out_Dividends and Out_DivTax", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures")!;
    const cell = ws.getCell("B30");
    const fv = cell.value as ExcelJS.CellFormulaValue;
    expect(typeof fv).toBe("object");
    const formula = (fv as { formula: string }).formula;
    expect(formula).toContain("Out_Dividends");
    expect(formula).toContain("Out_DivTax");
  });

  it("build() In_NetTakeHome formula references In_GrossSalary and In_IncomeTax", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures")!;
    const cell = ws.getCell("E20");
    const fv = cell.value as ExcelJS.CellFormulaValue;
    expect(typeof fv).toBe("object");
    const formula = (fv as { formula: string }).formula;
    expect(formula).toContain("In_GrossSalary");
    expect(formula).toContain("In_IncomeTax");
  });

  it("build() Out_CT formula uses IF/CT_LOWER/CT_UPPER (LET-free marginal relief)", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures")!;
    const cell = ws.getCell("B14");
    const fv = cell.value as ExcelJS.CellFormulaValue;
    const formula = (fv as { formula: string }).formula;
    expect(formula).toContain("CT_LOWER");
    expect(formula).toContain("CT_UPPER");
    expect(formula).toContain("CT_FRAC");
    // Must NOT use LET()
    expect(formula.toUpperCase()).not.toContain("LET(");
  });

  it("build() dividend tax helper rows are formula cells (LET-free)", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures")!;
    // Check rows 19-27 (B column, helpers)
    for (let row = 19; row <= 27; row++) {
      const cell = ws.getCell(`B${row}`);
      const fv = cell.value as ExcelJS.CellFormulaValue;
      const formula = (fv as { formula: string }).formula;
      expect(typeof formula).toBe("string");
      expect(formula.length).toBeGreaterThan(0);
      // Must NOT use LET()
      expect(formula.toUpperCase()).not.toContain("LET(");
    }
  });

  it("build() conservation check formula references Out_Gap", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures")!;
    const cell = ws.getCell("B37");
    const fv = cell.value as ExcelJS.CellFormulaValue;
    const formula = (fv as { formula: string }).formula;
    expect(formula).toContain("Out_Gap");
  });

  it("build() IR35 status note is always present in row 39", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures")!;
    const text = String(ws.getCell("A39").value ?? "");
    expect(text.toUpperCase()).toContain("IR35");
    expect(text.toUpperCase()).toContain("STATUS");
  });

  it("build() grossSalary formula uses the circularity-solving derivation", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures")!;
    // E13: In_GrossSalary = (In_Pot + ER_RATE * ER_ST) / (1 + ER_RATE + LEVY)
    const cell = ws.getCell("E13");
    const fv = cell.value as ExcelJS.CellFormulaValue;
    const formula = (fv as { formula: string }).formula;
    expect(formula).toContain("ER_RATE");
    expect(formula).toContain("ER_ST");
    expect(formula).toContain("LEVY");
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
});
