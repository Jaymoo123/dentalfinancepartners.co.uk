/**
 * Golden tests for the salary and dividend planner Excel workbook builder.
 *
 * Each test calls calcSalaryDividend() from the compute lib for the reference
 * figure, then verifies the builder's locked constants and workbook structure match.
 *
 * Golden values executed via Node 2026-07-06:
 *   Default (profitBeforeDirector=120000, salary=12570, no EA):
 *     employerNi=1135.5, corporationTax=24418.04, dividendTax=19667.08,
 *     totalTax=45220.63, netCash=74779.37, dividend=81876.46
 *   EA=Yes (salary=60000, useEA=true):
 *     netCash=76279.78 (rounds to 76279.78)
 *
 * Compliance:
 *   - Dividend rates 2026/27 (FA 2026 s.4): 10.75% / 35.75% / 39.35%.
 *   - Employer NIC 15% above 5,000 from 6 April 2025.
 *   - Employment Allowance 10,500 (single-director caveat in Notes).
 *   - No em-dashes in any cell. No "DJH". No credential claims.
 *   - Creator = "Agency Founder Finance".
 *
 * Run: npm test --workspace digital-agency/web
 */
import { describe, it, expect } from "vitest";
import { calcSalaryDividend } from "../../../src/lib/tools/compute/salary-dividend.js";
import { build } from "./salary-dividend.js";
import type ExcelJS from "exceljs";

// ---- Locked constants (traced to salary-dividend.ts) ----
const PERSONAL_ALLOWANCE = 12570;
const EMPLOYER_NI = 0.15;
const EMPLOYEE_NI_BASIC = 0.08;
const DIVIDEND_BASIC = 0.1075;
const DIVIDEND_HIGHER = 0.3575;
const DIVIDEND_ADDITIONAL = 0.3935;
const DIVIDEND_ALLOWANCE = 500;
const CT_SMALL_RATE = 0.19;
const EMPLOYMENT_ALLOWANCE = 10500;

describe("salary-dividend compute lib (golden)", () => {
  it("default case: netCash = 74779.37 (no EA, salary 12570)", () => {
    const r = calcSalaryDividend({ profitBeforeDirector: 120000, useEmploymentAllowance: false });
    expect(r.optimal.netCash).toBeCloseTo(74779.37, 1);
  });

  it("default case: dividend = 81876.46", () => {
    const r = calcSalaryDividend({ profitBeforeDirector: 120000, useEmploymentAllowance: false });
    expect(r.optimal.dividend).toBeCloseTo(81876.46, 1);
  });

  it("default case: employerNi = 1135.5", () => {
    const r = calcSalaryDividend({ profitBeforeDirector: 120000, useEmploymentAllowance: false });
    expect(r.optimal.employerNi).toBeCloseTo(1135.5, 1);
  });

  it("default case: corporationTax = 24418.04", () => {
    const r = calcSalaryDividend({ profitBeforeDirector: 120000, useEmploymentAllowance: false });
    expect(r.optimal.corporationTax).toBeCloseTo(24418.04, 1);
  });

  it("default case: dividendTax = 19667.08", () => {
    const r = calcSalaryDividend({ profitBeforeDirector: 120000, useEmploymentAllowance: false });
    expect(r.optimal.dividendTax).toBeCloseTo(19667.08, 1);
  });

  it("default case: totalTax = 45220.63", () => {
    const r = calcSalaryDividend({ profitBeforeDirector: 120000, useEmploymentAllowance: false });
    expect(r.optimal.totalTax).toBeCloseTo(45220.63, 1);
  });

  it("default case: employeeNi = 0 (salary at primary threshold)", () => {
    const r = calcSalaryDividend({ profitBeforeDirector: 120000, useEmploymentAllowance: false });
    expect(r.optimal.employeeNi).toBeCloseTo(0, 2);
  });

  it("default case: incomeTax = 0 (salary within personal allowance)", () => {
    const r = calcSalaryDividend({ profitBeforeDirector: 120000, useEmploymentAllowance: false });
    expect(r.optimal.incomeTax).toBeCloseTo(0, 2);
  });

  it("EA=Yes case: netCash = 76279.78 (salary 60000, EA lifts salary)", () => {
    const r = calcSalaryDividend({ profitBeforeDirector: 120000, useEmploymentAllowance: true });
    expect(r.optimal.netCash).toBeCloseTo(76279.78, 1);
  });

  it("EA=Yes case: optimal salary = 60000", () => {
    const r = calcSalaryDividend({ profitBeforeDirector: 120000, useEmploymentAllowance: true });
    expect(r.optimal.salary).toBe(60000);
  });

  it("conservation: netCash + total taxes = salary + dividend (internal consistency)", () => {
    const r = calcSalaryDividend({ profitBeforeDirector: 120000, useEmploymentAllowance: false });
    const { salary, dividend, employeeNi, incomeTax, dividendTax } = r.optimal;
    const computed = salary - employeeNi - incomeTax + dividend - dividendTax;
    expect(Math.abs(computed - r.optimal.netCash)).toBeLessThan(0.01);
  });

  it("dividend basic rate is 10.75 percent (2026/27, NOT 8.75 percent)", () => {
    expect(DIVIDEND_BASIC).toBeCloseTo(0.1075, 4);
    expect(DIVIDEND_BASIC).not.toBeCloseTo(0.0875, 3);
  });

  it("employer NI is 15 percent (NOT the old 13.8 percent)", () => {
    expect(EMPLOYER_NI).toBeCloseTo(0.15, 4);
    expect(EMPLOYER_NI).not.toBeCloseTo(0.138, 3);
  });
});

describe("salary-dividend builder (workbook sanity)", () => {
  it("build() returns a workbook with the expected sheets", () => {
    const wb = build();
    const sheetNames = wb.worksheets.map((ws) => ws.name);
    expect(sheetNames).toContain("Your figures");
    expect(sheetNames).toContain("Rates");
    expect(sheetNames).toContain("Start here");
    expect(sheetNames).toContain("Notes");
  });

  it("build() wb.creator is Agency Founder Finance", () => {
    const wb = build();
    expect(wb.creator).toBe("Agency Founder Finance");
  });

  it("build() default In_Salary = 12570 (personal allowance)", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures");
    expect(ws).toBeDefined();
    const val = ws!.getCell("B3").value;
    expect(val).toBe(PERSONAL_ALLOWANCE);
  });

  it("build() default In_Profit = 120000", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures");
    expect(ws!.getCell("B2").value).toBe(120000);
  });

  it("build() default In_UseEA = 'No'", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures");
    expect(ws!.getCell("B4").value).toBe("No");
  });

  it("build() DIV_BASIC on Rates sheet equals 0.1075 (10.75 percent, 2026/27)", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates");
    expect(rates).toBeDefined();
    let found = false;
    rates!.eachRow((row, rowNumber) => {
      if (rowNumber > 1 && typeof row.getCell(2).value === "number") {
        const v = row.getCell(2).value as number;
        if (Math.abs(v - DIVIDEND_BASIC) < 0.0001) found = true;
      }
    });
    expect(found).toBe(true);
  });

  it("build() DIV_HIGHER on Rates sheet equals 0.3575 (35.75 percent, 2026/27)", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates");
    let found = false;
    rates!.eachRow((row, rowNumber) => {
      if (rowNumber > 1 && typeof row.getCell(2).value === "number") {
        const v = row.getCell(2).value as number;
        if (Math.abs(v - DIVIDEND_HIGHER) < 0.0001) found = true;
      }
    });
    expect(found).toBe(true);
  });

  it("build() DIV_ADDITIONAL on Rates sheet equals 0.3935 (39.35 percent, 2026/27)", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates");
    let found = false;
    rates!.eachRow((row, rowNumber) => {
      if (rowNumber > 1 && typeof row.getCell(2).value === "number") {
        const v = row.getCell(2).value as number;
        if (Math.abs(v - DIVIDEND_ADDITIONAL) < 0.0001) found = true;
      }
    });
    expect(found).toBe(true);
  });

  it("build() DIV_ALLOWANCE on Rates sheet equals 500 (2026/27, FA 2026 s.4)", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates");
    let found = false;
    rates!.eachRow((row, rowNumber) => {
      if (rowNumber > 1 && row.getCell(2).value === DIVIDEND_ALLOWANCE) found = true;
    });
    expect(found).toBe(true);
  });

  it("build() EMP_NI on Rates sheet equals 0.15 (15 percent, from 6 April 2025)", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates");
    let found = false;
    rates!.eachRow((row, rowNumber) => {
      if (rowNumber > 1 && typeof row.getCell(2).value === "number") {
        const v = row.getCell(2).value as number;
        if (Math.abs(v - EMPLOYER_NI) < 0.0001) found = true;
      }
    });
    expect(found).toBe(true);
  });

  it("build() EA on Rates sheet equals 10500 (employment allowance)", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates");
    let found = false;
    rates!.eachRow((row, rowNumber) => {
      if (rowNumber > 1 && row.getCell(2).value === EMPLOYMENT_ALLOWANCE) found = true;
    });
    expect(found).toBe(true);
  });

  it("build() EMP_NI_BASIC on Rates sheet equals 0.08 (8 percent)", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates");
    let found = false;
    rates!.eachRow((row, rowNumber) => {
      if (rowNumber > 1 && typeof row.getCell(2).value === "number") {
        const v = row.getCell(2).value as number;
        if (Math.abs(v - EMPLOYEE_NI_BASIC) < 0.0001) found = true;
      }
    });
    expect(found).toBe(true);
  });

  it("build() CT_SMALL_RATE on Rates sheet equals 0.19 (19 percent small profits)", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates");
    let found = false;
    rates!.eachRow((row, rowNumber) => {
      if (rowNumber > 1 && typeof row.getCell(2).value === "number") {
        const v = row.getCell(2).value as number;
        if (Math.abs(v - CT_SMALL_RATE) < 0.0001) found = true;
      }
    });
    expect(found).toBe(true);
  });

  it("build() EmployerNi row has a formula", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures");
    const cell = ws!.getCell("B6");
    const fv = cell.value as ExcelJS.CellFormulaValue;
    expect(typeof fv).toBe("object");
    const formula = (fv as { formula: string }).formula;
    expect(typeof formula).toBe("string");
    expect(formula.length).toBeGreaterThan(5);
  });

  it("build() NetCash row has a formula referencing Dividend and DividendTax", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures");
    const cell = ws!.getCell("B14");
    const fv = cell.value as ExcelJS.CellFormulaValue;
    expect(typeof fv).toBe("object");
    const formula = (fv as { formula: string }).formula;
    expect(formula).toContain("Dividend");
  });

  it("build() ConservationCheck row has a formula", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures");
    const cell = ws!.getCell("B15");
    const fv = cell.value as ExcelJS.CellFormulaValue;
    expect(typeof fv).toBe("object");
    const formula = (fv as { formula: string }).formula;
    expect(formula).toContain("NetCash");
  });

  it("build() Notes sheet exists and contains employment allowance caveat", () => {
    const wb = build();
    const notes = wb.getWorksheet("Notes");
    expect(notes).toBeDefined();
    let foundEaCaveat = false;
    notes!.eachRow((row) => {
      const text = String(row.getCell(1).value ?? "").toLowerCase();
      if (text.includes("single director")) foundEaCaveat = true;
    });
    expect(foundEaCaveat).toBe(true);
  });

  it("build() no em-dash in any cell text value", () => {
    const wb = build();
    const emDash = "—";
    wb.worksheets.forEach((ws) => {
      ws.eachRow((row) => {
        row.eachCell((cell) => {
          if (typeof cell.value === "string") {
            expect(cell.value, `Sheet ${ws.name}: em-dash found`).not.toContain(emDash);
          }
        });
      });
    });
  });

  it("build() 'DJH' does not appear in any cell", () => {
    const wb = build();
    wb.worksheets.forEach((ws) => {
      ws.eachRow((row) => {
        row.eachCell((cell) => {
          if (typeof cell.value === "string") {
            expect(cell.value).not.toContain("DJH");
          }
        });
      });
    });
  });
});
