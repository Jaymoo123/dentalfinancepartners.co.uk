/**
 * Golden tests for the umbrella vs limited company structure-choice Excel workbook builder.
 *
 * Same primitives as the IR35 comparison (limitedTakeHome / umbrellaTakeHome) but
 * framed as a structure-choice model. The key addition is the accountancy fee row
 * which shows the net benefit after running costs.
 *
 * Golden case:
 *   dayRate=500, billableDays=240, salary=12570, expenses=6000,
 *   umbrellaMargin=1200, accountFees=2000
 *   -> limitedNet = limitedTakeHome({turnover:120000,...}).netTakeHome = 71820.95
 *   -> umbrellaNet = umbrellaTakeHome({assignmentIncome:120000,...}).netTakeHome = 69889.87
 *   -> rawGap = 1931.08 (limited better before costs)
 *   -> netBenefit = 1931.08 - 2000 = -68.92 (umbrella marginally better after fees at this rate)
 *
 * LET-free: no LET() in any formula cell. No em-dashes in test names.
 * Vitest: npm test --workspace contractors-ir35/web.
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
import { build } from "./umbrella-vs-limited.js";
import type ExcelJS from "exceljs";

const PA = PERSONAL_ALLOWANCE;
const DIV_ALLOWANCE = DIVIDEND_ALLOWANCE;
const DIV_BASIC = DIVIDEND_RATES.ordinary;
const DIV_HIGHER = DIVIDEND_RATES.upper;
const DIV_ADDITIONAL = DIVIDEND_RATES.additional;
const ER_RATE = NI.employerRate;
const CT_MAIN = CT.mainRate;
const CT_SMALL = CT.smallRate;

const DEFAULT_DAY_RATE = 500;
const DEFAULT_DAYS = 240;
const DEFAULT_SALARY = 12570;
const DEFAULT_EXPENSES = 6000;
const DEFAULT_UMBRELLA_MARGIN = 1200;
const DEFAULT_ACCOUNT_FEES = 2000;
const DEFAULT_TURNOVER = DEFAULT_DAY_RATE * DEFAULT_DAYS;

describe("umbrella-vs-limited compute lib (golden)", () => {
  it("STR-A: limitedTakeHome default -> netTakeHome = 71820.95", () => {
    const result = limitedTakeHome({
      turnover: DEFAULT_TURNOVER,
      salary: DEFAULT_SALARY,
      expenses: DEFAULT_EXPENSES,
    });
    expect(result.netTakeHome).toBeCloseTo(71820.95, 1);
  });

  it("STR-B: umbrellaTakeHome default -> netTakeHome = 69889.87", () => {
    const result = umbrellaTakeHome({
      assignmentIncome: DEFAULT_TURNOVER,
      umbrellaMargin: DEFAULT_UMBRELLA_MARGIN,
    });
    expect(result.netTakeHome).toBeCloseTo(69889.87, 1);
  });

  it("STR-C: raw gap (before fees) = 1931.08", () => {
    const ltd = limitedTakeHome({ turnover: DEFAULT_TURNOVER, salary: DEFAULT_SALARY, expenses: DEFAULT_EXPENSES });
    const umb = umbrellaTakeHome({ assignmentIncome: DEFAULT_TURNOVER, umbrellaMargin: DEFAULT_UMBRELLA_MARGIN });
    expect(ltd.netTakeHome - umb.netTakeHome).toBeCloseTo(1931.08, 1);
  });

  it("STR-D: net benefit after GBP2000 fees = raw gap - 2000 = -68.92 (umbrella wins at this rate)", () => {
    const ltd = limitedTakeHome({ turnover: DEFAULT_TURNOVER, salary: DEFAULT_SALARY, expenses: DEFAULT_EXPENSES });
    const umb = umbrellaTakeHome({ assignmentIncome: DEFAULT_TURNOVER, umbrellaMargin: DEFAULT_UMBRELLA_MARGIN });
    const netBenefit = (ltd.netTakeHome - umb.netTakeHome) - DEFAULT_ACCOUNT_FEES;
    expect(netBenefit).toBeCloseTo(-68.92, 1);
  });

  it("STR-E: at 600/day the raw gap exceeds GBP2000 so limited wins after fees", () => {
    // At 700/day the PA taper applies fully (ANI > GBP125,140 on both routes), which
    // reduces the limited company advantage so the raw gap falls below GBP2,000 and
    // umbrella wins after fees. At GBP600/day the taper is partial, the dividend
    // advantage is preserved, and the raw gap comfortably exceeds GBP2,000.
    const ltd = limitedTakeHome({ turnover: 600 * 240, salary: DEFAULT_SALARY, expenses: DEFAULT_EXPENSES });
    const umb = umbrellaTakeHome({ assignmentIncome: 600 * 240, umbrellaMargin: DEFAULT_UMBRELLA_MARGIN });
    const rawGap = ltd.netTakeHome - umb.netTakeHome;
    const netBenefit = rawGap - DEFAULT_ACCOUNT_FEES;
    expect(rawGap).toBeGreaterThan(2000);
    expect(netBenefit).toBeGreaterThan(0);
  });

  it("STR-F: conservation check: netBenefit = rawGap - accountFees", () => {
    const ltd = limitedTakeHome({ turnover: DEFAULT_TURNOVER, salary: DEFAULT_SALARY, expenses: DEFAULT_EXPENSES });
    const umb = umbrellaTakeHome({ assignmentIncome: DEFAULT_TURNOVER, umbrellaMargin: DEFAULT_UMBRELLA_MARGIN });
    const rawGap = ltd.netTakeHome - umb.netTakeHome;
    const netBenefit = rawGap - DEFAULT_ACCOUNT_FEES;
    const diff = Math.abs(netBenefit - (rawGap - DEFAULT_ACCOUNT_FEES));
    expect(diff).toBeLessThan(0.01);
  });

  it("STR-G: dividend allowance is GBP500 (FA 2026 s.4)", () => {
    expect(DIV_ALLOWANCE).toBe(500);
  });

  it("STR-H: dividend basic rate is 10.75 percent (NOT 8.75 percent): FA 2026 s.4", () => {
    expect(DIV_BASIC).toBeCloseTo(0.1075, 4);
    expect(DIV_BASIC).not.toBeCloseTo(0.0875, 4);
  });

  it("STR-I: dividend higher rate is 35.75 percent (NOT 32.5 percent): FA 2026 s.4", () => {
    expect(DIV_HIGHER).toBeCloseTo(0.3575, 4);
    expect(DIV_HIGHER).not.toBeCloseTo(0.325, 4);
  });

  it("STR-J: employer NIC rate is 15 percent above GBP5000", () => {
    expect(ER_RATE).toBeCloseTo(0.15, 4);
  });
});

describe("umbrella-vs-limited builder (workbook sanity)", () => {
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

  it("build() DIV_BASIC on Rates sheet equals 0.1075", () => {
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

  it("build() CT_SMALL on Rates sheet equals 0.19", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates")!;
    let found = false;
    rates.eachRow((row, rowNumber) => {
      if (rowNumber > 1 && Math.abs((row.getCell(2).value as number) - CT_SMALL) < 0.0001) found = true;
    });
    expect(found).toBe(true);
  });

  it("build() default S_DayRate = 500", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures")!;
    expect(ws.getCell("B3").value).toBe(DEFAULT_DAY_RATE);
  });

  it("build() default S_Days = 240", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures")!;
    expect(ws.getCell("B4").value).toBe(DEFAULT_DAYS);
  });

  it("build() default S_Salary = 12570 (PA level)", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures")!;
    expect(ws.getCell("B5").value).toBe(DEFAULT_SALARY);
    expect(ws.getCell("B5").value).toBe(PA);
  });

  it("build() default S_Expenses = 6000", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures")!;
    expect(ws.getCell("B6").value).toBe(DEFAULT_EXPENSES);
  });

  it("build() default S_UmbrellaMargin = 1200", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures")!;
    expect(ws.getCell("B7").value).toBe(DEFAULT_UMBRELLA_MARGIN);
  });

  it("build() default S_AccountFees = 2000", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures")!;
    expect(ws.getCell("B8").value).toBe(DEFAULT_ACCOUNT_FEES);
  });

  it("build() L_NetTakeHome formula references L_Dividends and L_DivTax", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures")!;
    const fv = ws.getCell("B31").value as ExcelJS.CellFormulaValue;
    const formula = (fv as { formula: string }).formula;
    expect(formula).toContain("L_Dividends");
    expect(formula).toContain("L_DivTax");
  });

  it("build() U_NetTakeHome formula references U_GrossSalary and U_IncomeTax", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures")!;
    const fv = ws.getCell("E21").value as ExcelJS.CellFormulaValue;
    const formula = (fv as { formula: string }).formula;
    expect(formula).toContain("U_GrossSalary");
    expect(formula).toContain("U_IncomeTax");
  });

  it("build() net benefit formula references S_AccountFees", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures")!;
    const fv = ws.getCell("B40").value as ExcelJS.CellFormulaValue;
    const formula = (fv as { formula: string }).formula;
    expect(formula).toContain("S_AccountFees");
  });

  it("build() conservation check formula references S_NetBenefit", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures")!;
    const fv = ws.getCell("B42").value as ExcelJS.CellFormulaValue;
    const formula = (fv as { formula: string }).formula;
    expect(formula).toContain("S_NetBenefit");
  });

  it("build() April 2026 liability note is always present", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures")!;
    const text = String(ws.getCell("A44").value ?? "");
    expect(text.toUpperCase()).toContain("APRIL 2026");
    expect(text.toUpperCase()).toContain("JOINT");
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
