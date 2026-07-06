/**
 * Golden tests for the CIS refund/deduction Excel builder.
 *
 * Asserts that workbook default inputs, formula structure and compute-lib outputs
 * are consistent to the penny. ExcelJS does not evaluate formulas, so formula
 * correctness is tested via:
 *   a) default input cell values match expected golden inputs
 *   b) cis-tax.ts compute lib produces golden outputs for those inputs
 *   c) formula strings are LET-free (no LET() function, Excel-365-only)
 *   d) no em-dashes in any cell text
 *   e) conservation check formula structure is correct
 *
 * Runs as part of: npm test --workspace construction-cis/web
 */
import { describe, it, expect, beforeAll } from "vitest";
import type ExcelJS from "exceljs";
import { build } from "./cis-refund";
import { cisDeduction, saLiability } from "../../../src/lib/calculators/cis-tax";

// ---- Helpers ----

/** Extract all formula strings from all cells in a workbook. */
function allFormulas(wb: ExcelJS.Workbook): string[] {
  const formulas: string[] = [];
  wb.worksheets.forEach((ws) => {
    ws.eachRow((row) => {
      row.eachCell((cell) => {
        if (cell.type === 8 /* formula */ || (cell.value && typeof cell.value === "object" && "formula" in (cell.value as object))) {
          const cv = cell.value as { formula?: string };
          if (cv.formula) formulas.push(cv.formula);
        }
      });
    });
  });
  return formulas;
}

/** Extract all text values from all cells in a workbook. */
function allTextValues(wb: ExcelJS.Workbook): string[] {
  const texts: string[] = [];
  wb.worksheets.forEach((ws) => {
    ws.eachRow((row) => {
      row.eachCell((cell) => {
        const v = cell.value;
        if (typeof v === "string" && v.length > 0) texts.push(v);
        if (v && typeof v === "object" && "richText" in (v as object)) {
          const rt = v as { richText: Array<{ text: string }> };
          rt.richText.forEach((r) => texts.push(r.text));
        }
      });
    });
  });
  return texts;
}

/** Get a cell from "Your figures" worksheet by row and column index (1-based). */
function yf(wb: ExcelJS.Workbook, row: number, col: number): ExcelJS.Cell {
  const ws = wb.getWorksheet("Your figures");
  if (!ws) throw new Error("Your figures sheet not found");
  return ws.getCell(row, col);
}

/** Read a numeric cell value. */
function numVal(cell: ExcelJS.Cell): number {
  const v = cell.value;
  if (typeof v === "number") return v;
  throw new Error(`Expected numeric cell value, got ${typeof v}: ${JSON.stringify(v)}`);
}

// ---- Test setup ----

let wb: ExcelJS.Workbook;
beforeAll(() => {
  wb = build();
});

// ---- Default-case golden tests ----
// Inputs: gross=45000, materials=5000, cisRate=0.20, expenses=4000, otherIncome=0
// cisDeduction: deductionBase=40000, cisDeducted=8000
// saLiability: profit=36000, incomeTax=4686, class4Ni=1405.80, total=6091.80
// refund = 8000 - 6091.80 = 1908.20

describe("cis-refund builder: default golden case", () => {
  it("workbook exists with all 4 sheets", () => {
    const sheetNames = wb.worksheets.map((s) => s.name);
    expect(sheetNames).toContain("Start here");
    expect(sheetNames).toContain("Your figures");
    expect(sheetNames).toContain("Rates");
    expect(sheetNames).toContain("Notes");
  });

  it("default input: gross income = 45000", () => {
    const cell = yf(wb, 3, 2); // B3
    expect(numVal(cell)).toBe(45000);
  });

  it("default input: materials = 5000", () => {
    const cell = yf(wb, 4, 2); // B4
    expect(numVal(cell)).toBe(5000);
  });

  it("default input: CIS rate = 0.20 (registered)", () => {
    const cell = yf(wb, 5, 2); // B5
    expect(numVal(cell)).toBe(0.20);
  });

  it("default input: expenses = 4000", () => {
    const cell = yf(wb, 6, 2); // B6
    expect(numVal(cell)).toBe(4000);
  });

  it("default input: other income = 0", () => {
    const cell = yf(wb, 7, 2); // B7
    expect(numVal(cell)).toBe(0);
  });

  it("compute lib: CIS deduction base = 40000", () => {
    const { deductionBase } = cisDeduction({ gross: 45000, materials: 5000, rate: 0.20 });
    expect(deductionBase).toBe(40000);
  });

  it("compute lib: CIS deducted = 8000", () => {
    const { cisDeducted } = cisDeduction({ gross: 45000, materials: 5000, rate: 0.20 });
    expect(cisDeducted).toBe(8000);
  });

  it("compute lib: SA income tax = 4686.00", () => {
    // saProfit = gross - materials - expenses = 45000 - 5000 - 4000 = 36000
    const { incomeTax } = saLiability({ profit: 36000, otherIncome: 0 });
    expect(incomeTax).toBeCloseTo(4686, 2);
  });

  it("compute lib: SA Class 4 NI = 1405.80", () => {
    const { class4Ni } = saLiability({ profit: 36000, otherIncome: 0 });
    expect(class4Ni).toBeCloseTo(1405.8, 2);
  });

  it("compute lib: SA total liability = 6091.80", () => {
    const { total } = saLiability({ profit: 36000, otherIncome: 0 });
    expect(total).toBeCloseTo(6091.8, 2);
  });

  it("compute lib: refund = 8000 - 6091.80 = 1908.20", () => {
    const { cisDeducted } = cisDeduction({ gross: 45000, materials: 5000, rate: 0.20 });
    const { total } = saLiability({ profit: 36000, otherIncome: 0 });
    const refund = cisDeducted - total;
    expect(refund).toBeCloseTo(1908.2, 2);
  });
});

// ---- Unregistered (30%) golden case ----
// Same gross/materials/expenses/otherIncome, cisRate=0.30
// cisDeducted = 40000 * 0.30 = 12000
// saLiability same = 6091.80
// refund = 12000 - 6091.80 = 5908.20

describe("cis-refund builder: unregistered (30%) golden case", () => {
  it("compute lib: CIS deducted at 30% = 12000", () => {
    const { cisDeducted } = cisDeduction({ gross: 45000, materials: 5000, rate: 0.30 });
    expect(cisDeducted).toBe(12000);
  });

  it("compute lib: refund at 30% = 5908.20", () => {
    const { cisDeducted } = cisDeduction({ gross: 45000, materials: 5000, rate: 0.30 });
    const { total } = saLiability({ profit: 36000, otherIncome: 0 });
    const refund = cisDeducted - total;
    expect(refund).toBeCloseTo(5908.2, 2);
  });
});

// ---- Owe case (negative refund) ----
// gross=30000, materials=20000, cisRate=0.20, expenses=0, otherIncome=30000
// deductionBase=10000, cisDeducted=2000
// saProfit=10000, totalIncome=40000
// taxable=40000-12570=27430, incomeTax=5486, class4Ni=0 (profit<lowerLimit)
// total=5486, refund=2000-5486=-3486

describe("cis-refund builder: owe case (negative refund)", () => {
  it("compute lib: owe case refund = -3486 (positive liability)", () => {
    const { cisDeducted } = cisDeduction({ gross: 30000, materials: 20000, rate: 0.20 });
    const { total } = saLiability({ profit: 10000, otherIncome: 30000 });
    const refund = cisDeducted - total;
    expect(refund).toBeCloseTo(-3486, 1);
  });

  it("compute lib: owe case income tax = 5486 (on 40000 total income)", () => {
    const { incomeTax } = saLiability({ profit: 10000, otherIncome: 30000 });
    expect(incomeTax).toBeCloseTo(5486, 2);
  });

  it("compute lib: owe case Class 4 NI = 0 (profit below lower limit)", () => {
    const { class4Ni } = saLiability({ profit: 10000, otherIncome: 0 });
    expect(class4Ni).toBe(0);
  });
});

// ---- Formula structure checks ----

describe("cis-refund builder: formula structure (LET-free, no em-dashes)", () => {
  it("no LET() calls in any formula (LET is Excel-365-only)", () => {
    const formulas = allFormulas(wb);
    const letFormulas = formulas.filter((f) => /\bLET\s*\(/i.test(f));
    expect(letFormulas).toHaveLength(0);
  });

  it("no em-dashes in any cell text", () => {
    const texts = allTextValues(wb);
    const emdashes = texts.filter((t) => t.includes("—"));
    expect(emdashes).toHaveLength(0);
  });

  it('conservation check formula contains ABS(...)<0.01 pattern', () => {
    const formulas = allFormulas(wb);
    const conserv = formulas.filter((f) => /ABS\(.+\)\s*<\s*0\.01/i.test(f));
    expect(conserv.length).toBeGreaterThanOrEqual(1);
  });

  it("no DJH in any cell text", () => {
    const texts = allTextValues(wb);
    const djh = texts.filter((t) => /\bDJH\b/.test(t));
    expect(djh).toHaveLength(0);
  });

  it("income tax formula uses MIN/MAX pattern (LET-free banded)", () => {
    const formulas = allFormulas(wb);
    const itFormula = formulas.find(
      (f) => /MIN\(.+BRL\).*IT_BASIC/i.test(f) || /IT_BASIC.*MIN\(.+BRL\)/i.test(f)
    );
    expect(itFormula).toBeTruthy();
  });

  it("Class 4 NI formula uses MIN/MAX pattern (LET-free banded)", () => {
    const formulas = allFormulas(wb);
    const c4Formula = formulas.find(
      (f) => /MIN\(.+C4_UPPER_LIM\).*C4_MAIN/i.test(f) || /C4_MAIN.*MIN\(.+C4_UPPER_LIM\)/i.test(f)
    );
    expect(c4Formula).toBeTruthy();
  });
});

// ---- Creator / metadata ----

describe("cis-refund builder: metadata", () => {
  it("workbook creator is Trade Tax Specialists", () => {
    expect(wb.creator).toBe("Trade Tax Specialists");
  });
});
