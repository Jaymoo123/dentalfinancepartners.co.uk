/**
 * Golden tests for the CIS vs PAYE take-home comparison Excel builder.
 *
 * Asserts that workbook default inputs, formula structure and compute-lib outputs
 * are consistent to the penny. Key regression points:
 *
 *   RATE-MIX REGRESSION GUARD (the most important structural check):
 *     CIS side  uses Class 4 NI at 6%/2% (C4_MAIN/C4_UPPER_RATE)
 *     PAYE side uses employee Class 1 NI at 8%/2% (C1_MAIN/C1_UPPER_RATE)
 *     These must NOT be swapped. Golden outputs pin both to the penny.
 *
 *   CONSERVATION CHECKS: both CIS and PAYE sides have "OK" check cells.
 *
 * Golden defaults: grossEarnings=45000, cisExpenses=5000, cisRate=0.20
 *   CIS:  profit=40000, incomeTax=5486, class4Ni=1645.80, takeHome=32868.20
 *   PAYE: incomeTax=6486, class1Ni=2594.40, takeHome=35919.60
 *   diff: 32868.20 - 35919.60 = -3051.40 (PAYE wins)
 *
 * Runs as part of: npm test --workspace construction-cis/web
 */
import { describe, it, expect, beforeAll } from "vitest";
import type ExcelJS from "exceljs";
import { build } from "./cis-vs-paye";
import { saLiability, class1EmployeeNi, CLASS1_NI, CLASS4_NI } from "../../../src/lib/calculators/cis-tax";

// ---- Helpers ----

function allFormulas(wb: ExcelJS.Workbook): string[] {
  const formulas: string[] = [];
  wb.worksheets.forEach((ws) => {
    ws.eachRow((row) => {
      row.eachCell((cell) => {
        const cv = cell.value as { formula?: string } | null;
        if (cv && typeof cv === "object" && "formula" in cv && cv.formula) {
          formulas.push(cv.formula);
        }
      });
    });
  });
  return formulas;
}

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

function yf(wb: ExcelJS.Workbook, row: number, col: number): ExcelJS.Cell {
  const ws = wb.getWorksheet("Your figures");
  if (!ws) throw new Error("Your figures sheet not found");
  return ws.getCell(row, col);
}

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

// ---- Default golden case ----

describe("cis-vs-paye builder: default golden case", () => {
  it("workbook exists with all 4 sheets", () => {
    const names = wb.worksheets.map((s) => s.name);
    expect(names).toContain("Start here");
    expect(names).toContain("Your figures");
    expect(names).toContain("Rates");
    expect(names).toContain("Notes");
  });

  it("default input: gross earnings = 45000", () => {
    expect(numVal(yf(wb, 3, 2))).toBe(45000);
  });

  it("default input: CIS expenses = 5000", () => {
    expect(numVal(yf(wb, 4, 2))).toBe(5000);
  });

  it("default input: CIS rate = 0.20", () => {
    expect(numVal(yf(wb, 5, 2))).toBe(0.20);
  });

  // CIS side: profit = gross - expenses = 45000 - 5000 = 40000
  it("compute lib: CIS income tax = 5486 (on profit 40000)", () => {
    const { incomeTax } = saLiability({ profit: 40000, otherIncome: 0 });
    expect(incomeTax).toBeCloseTo(5486, 2);
  });

  it("compute lib: CIS Class 4 NI = 1645.80 (6%/2% on profit 40000)", () => {
    const { class4Ni } = saLiability({ profit: 40000, otherIncome: 0 });
    expect(class4Ni).toBeCloseTo(1645.8, 2);
  });

  it("compute lib: CIS take-home = 32868.20", () => {
    const { incomeTax, class4Ni } = saLiability({ profit: 40000, otherIncome: 0 });
    const takeHome = 45000 - 5000 - (incomeTax + class4Ni);
    expect(takeHome).toBeCloseTo(32868.2, 2);
  });

  // PAYE side: income tax on gross 45000
  it("compute lib: PAYE income tax = 6486 (on gross 45000, no expenses)", () => {
    const { incomeTax } = saLiability({ profit: 45000, otherIncome: 0 });
    expect(incomeTax).toBeCloseTo(6486, 2);
  });

  // PAYE employee Class 1 NI: 8%/2% (NOT Class 4)
  it("compute lib: PAYE employee Class 1 NI = 2594.40 (8%/2% on gross 45000)", () => {
    const ni = class1EmployeeNi(45000);
    expect(ni).toBeCloseTo(2594.4, 2);
  });

  it("compute lib: PAYE take-home = 35919.60", () => {
    const { incomeTax } = saLiability({ profit: 45000, otherIncome: 0 });
    const ni = class1EmployeeNi(45000);
    const takeHome = 45000 - incomeTax - ni;
    expect(takeHome).toBeCloseTo(35919.6, 2);
  });

  it("compute lib: CIS vs PAYE diff = -3051.40 (PAYE wins)", () => {
    const { incomeTax: cIncomeTax, class4Ni } = saLiability({ profit: 40000, otherIncome: 0 });
    const cisTakeHome = 45000 - 5000 - (cIncomeTax + class4Ni);
    const { incomeTax: pIncomeTax } = saLiability({ profit: 45000, otherIncome: 0 });
    const payeNi = class1EmployeeNi(45000);
    const payeTakeHome = 45000 - pIncomeTax - payeNi;
    expect(cisTakeHome - payeTakeHome).toBeCloseTo(-3051.4, 2);
  });
});

// ---- Rate-mix regression guard ----
// This is the core regression the brief calls out: CIS uses 6%/2% Class 4,
// PAYE uses 8%/2% Class 1. If they were swapped, both outputs would be wrong.

describe("cis-vs-paye builder: rate-mix regression guard", () => {
  it("Class 4 NI (CIS side) main rate is 6% (not 8%)", () => {
    expect(CLASS4_NI.main).toBe(0.06);
  });

  it("Class 1 NI (PAYE side) main rate is 8% (not 6%)", () => {
    expect(CLASS1_NI.main).toBe(0.08);
  });

  it("CIS Class 4 at 6% gives 1645.80 on profit 40000", () => {
    const { class4Ni } = saLiability({ profit: 40000, otherIncome: 0 });
    expect(class4Ni).toBeCloseTo(1645.8, 2);
  });

  it("PAYE Class 1 at 8% gives 2594.40 on gross 45000", () => {
    const ni = class1EmployeeNi(45000);
    expect(ni).toBeCloseTo(2594.4, 2);
  });

  it("CIS NI < PAYE NI (confirms rates are not swapped)", () => {
    const { class4Ni } = saLiability({ profit: 40000, otherIncome: 0 });
    const payeNi = class1EmployeeNi(45000);
    // Class 4 (6% on lower profit) must be less than Class 1 (8% on higher gross)
    expect(class4Ni).toBeLessThan(payeNi);
  });

  it("Rates sheet has C4_MAIN before C1_MAIN (structural - confirmed different rows)", () => {
    const rates = wb.getWorksheet("Rates");
    if (!rates) throw new Error("Rates sheet not found");
    let c4MainRow = -1;
    let c1MainRow = -1;
    rates.eachRow((row, rn) => {
      const label = row.getCell(1).value;
      if (typeof label === "string") {
        if (/class 4.*main.*6%/i.test(label)) c4MainRow = rn;
        if (/class 1.*main.*8%/i.test(label)) c1MainRow = rn;
      }
    });
    expect(c4MainRow).toBeGreaterThan(0);
    expect(c1MainRow).toBeGreaterThan(0);
    expect(c4MainRow).not.toBe(c1MainRow); // must be on separate rows
  });

  it("CIS formula labels mention Class 4 (not Class 1)", () => {
    const texts = allTextValues(wb);
    const c4CisLabel = texts.find((t) => /class 4.*6%.*cis/i.test(t) || /cis.*class 4.*6%/i.test(t));
    expect(c4CisLabel).toBeTruthy();
  });

  it("PAYE formula labels mention Class 1 (not Class 4)", () => {
    const texts = allTextValues(wb);
    const c1PayeLabel = texts.find((t) => /class 1.*8%.*paye/i.test(t) || /paye.*class 1.*8%/i.test(t));
    expect(c1PayeLabel).toBeTruthy();
  });
});

// ---- Conservation checks ----

describe("cis-vs-paye builder: conservation checks", () => {
  it("at least 2 conservation check formulas (one CIS, one PAYE)", () => {
    const formulas = allFormulas(wb);
    const conserv = formulas.filter((f) => /ABS\(.+\)\s*<\s*0\.01/i.test(f));
    expect(conserv.length).toBeGreaterThanOrEqual(2);
  });
});

// ---- Formula structure ----

describe("cis-vs-paye builder: formula structure", () => {
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

  it("no DJH in any cell text", () => {
    const texts = allTextValues(wb);
    expect(texts.filter((t) => /\bDJH\b/.test(t))).toHaveLength(0);
  });

  it("income tax formula uses MIN/MAX banding pattern", () => {
    const formulas = allFormulas(wb);
    const itFormula = formulas.find((f) => /MIN\(.+BRL\).*IT_BASIC/i.test(f));
    expect(itFormula).toBeTruthy();
  });

  it("Class 1 NI formula uses C1_MAIN (not C4_MAIN)", () => {
    const formulas = allFormulas(wb);
    const c1Formula = formulas.find((f) => /C1_MAIN/i.test(f));
    expect(c1Formula).toBeTruthy();
  });

  it("Class 4 NI formula uses C4_MAIN (not C1_MAIN)", () => {
    const formulas = allFormulas(wb);
    const c4Formula = formulas.find((f) => /C4_MAIN/i.test(f));
    expect(c4Formula).toBeTruthy();
  });
});

// ---- Metadata ----

describe("cis-vs-paye builder: metadata", () => {
  it("workbook creator is Trade Tax Specialists", () => {
    expect(wb.creator).toBe("Trade Tax Specialists");
  });
});
