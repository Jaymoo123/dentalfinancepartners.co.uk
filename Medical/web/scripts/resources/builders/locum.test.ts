/**
 * Golden tests for the locum doctor take-home pay Excel workbook builder.
 *
 * Calls calcLocumTax() from the compute lib for reference figures, then
 * verifies the builder's locked constants and default cell values match.
 * The golden tests are the drift guard between the lib and the workbook.
 *
 * Vitest: run with `npm test --workspace Medical/web`
 * No em-dashes in test names.
 */
import { describe, it, expect } from "vitest";
import { calcLocumTax } from "../../../src/lib/tools/compute/locum-tax.js";
import { build } from "./locum.js";
import type ExcelJS from "exceljs";

// ---- Locked constants (traced to locum-tax.ts) ----
const PA = 12570;
const BRL = 50270;
const NI_LOWER = 12570;
const NI_UPPER = 50270;
const C4_MAIN = 0.06; // 6%: NOT the abolished 9%

describe("locum tax compute lib (golden)", () => {
  it("LOC-A: default case (80k income, 5k expenses, 10k pension, no student loan)", () => {
    const result = calcLocumTax({
      grossIncome: 80000,
      expenses: 5000,
      pensionContributions: 10000,
      studentLoanPlan: "none",
    });
    // netIncome = 80000-5000-10000 = 65000
    // taxableIncome = 65000-12570 = 52430
    // basic = min(52430, 37700)*0.2 = 7540
    // higher: 52430-37700=14730 < 74870 -> 14730*0.4 = 5892; incomeTax = 13432
    // NI: band1 = min(52430,37700)=37700 -> 37700*0.06=2262
    //     above: (65000-50270)*0.02 = 14730*0.02 = 294.6; NI = 2556.6
    // totalDeductions = 13432+2556.6 = 15988.6
    // netTakeHome = 65000-15988.6 = 49011.4
    expect(result.netIncome).toBe(65000);
    expect(result.incomeTax).toBeCloseTo(13432, 2);
    expect(result.nationalInsurance).toBeCloseTo(2556.6, 2);
    expect(result.studentLoanRepayment).toBe(0);
    expect(result.totalDeductions).toBeCloseTo(15988.6, 2);
    expect(result.netTakeHome).toBeCloseTo(49011.4, 1);
  });

  it("LOC-B: 120k income, 10k expenses, no pension, Plan 2 student loan", () => {
    const result = calcLocumTax({
      grossIncome: 120000,
      expenses: 10000,
      pensionContributions: 0,
      studentLoanPlan: "plan2",
    });
    // netIncome = 110000
    // taxableIncome = 110000-12570 = 97430
    // basic = 37700*0.2 = 7540
    // higher = (97430-37700)=59730 < 74870 -> 59730*0.4 = 23892; incomeTax = 31432
    // NI: band1 = 37700*0.06=2262; above = (110000-50270)*0.02=59730*0.02=1194.6; NI=3456.6
    // student loan plan2 threshold=28470: (110000-28470)*0.09=81530*0.09=7337.7
    expect(result.netIncome).toBe(110000);
    expect(result.incomeTax).toBeCloseTo(31432, 2);
    expect(result.nationalInsurance).toBeCloseTo(3456.6, 2);
    expect(result.studentLoanRepayment).toBeCloseTo(7337.7, 1);
    expect(result.totalDeductions).toBeCloseTo(42226.3, 1);
  });

  it("LOC-C: 180k income, 20k expenses, 20k pension, Plan 1 student loan (additional rate)", () => {
    const result = calcLocumTax({
      grossIncome: 180000,
      expenses: 20000,
      pensionContributions: 20000,
      studentLoanPlan: "plan1",
    });
    // netIncome = 140000
    // taxableIncome = 140000-12570 = 127430
    // basic = 37700*0.2 = 7540
    // higher = 74870*0.4 = 29948
    // additional: 127430-112570=14860 -> 14860*0.45=6687; incomeTax=44175
    // NI: band1=37700*0.06=2262; above=(140000-50270)*0.02=89730*0.02=1794.6; NI=4056.6
    // student loan plan1 threshold=26065: (140000-26065)*0.09=113935*0.09=10254.15
    expect(result.netIncome).toBe(140000);
    expect(result.incomeTax).toBeCloseTo(44175, 1);
    expect(result.nationalInsurance).toBeCloseTo(4056.6, 1);
    expect(result.studentLoanRepayment).toBeCloseTo(10254.15, 1);
  });

  it("LOC-D: below NI lower limit (12000 income, no expenses, no pension, no loan)", () => {
    const result = calcLocumTax({
      grossIncome: 12000,
      expenses: 0,
      pensionContributions: 0,
      studentLoanPlan: "none",
    });
    // netIncome = 12000 < PA=12570; incomeTax=0; NI=0
    expect(result.incomeTax).toBe(0);
    expect(result.nationalInsurance).toBe(0);
    expect(result.netTakeHome).toBe(12000);
  });

  it("LOC-E: Class 4 NIC is 6 percent NOT 9 percent (spot check)", () => {
    const result = calcLocumTax({
      grossIncome: 50000,
      expenses: 0,
      pensionContributions: 0,
      studentLoanPlan: "none",
    });
    // netIncome = 50000; NI band1 = (50000-12570) = 37430 at 6% = 2245.8
    // No upper band (50000 < 50270 upper limit)
    expect(result.nationalInsurance).toBeCloseTo(37430 * C4_MAIN, 2);
    // Confirm it is NOT the 9% rate
    expect(result.nationalInsurance).not.toBeCloseTo(37430 * 0.09, 1);
  });

  it("LOC-F: conservation check: netTakeHome + totalDeductions equals netIncome", () => {
    const result = calcLocumTax({
      grossIncome: 100000,
      expenses: 8000,
      pensionContributions: 5000,
      studentLoanPlan: "none",
    });
    const diff = Math.abs(result.netTakeHome + result.totalDeductions - result.netIncome);
    expect(diff).toBeLessThan(0.01);
  });
});

describe("locum builder (workbook sanity)", () => {
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

  it("build() PA constant on Rates sheet equals 12570", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates");
    expect(rates).toBeDefined();
    // Row 2 = PA (first non-header row on Rates sheet)
    const val = rates!.getCell("B2").value;
    expect(val).toBe(PA);
  });

  it("build() BRL constant on Rates sheet equals 50270", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates");
    // Row 3 = BRL
    const val = rates!.getCell("B3").value;
    expect(val).toBe(BRL);
  });

  it("build() C4_MAIN on Rates sheet equals 0.06 (6 percent)", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates");
    // Row 2=PA, 3=BRL, 4=HRL, 5=NI_LOWER, 6=NI_UPPER, 7=C4_MAIN, 8=C4_UPPER_RATE
    const val = rates!.getCell("B7").value;
    expect(val).toBeCloseTo(C4_MAIN, 4); // 0.06
    expect(val as number).toBeLessThan(0.07); // explicitly NOT 0.09
  });

  it("build() default In_GrossIncome = 80000", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures");
    expect(ws).toBeDefined();
    const val = ws!.getCell("B3").value;
    expect(val).toBe(80000);
  });

  it("build() default In_Expenses = 5000", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures");
    const val = ws!.getCell("B4").value;
    expect(val).toBe(5000);
  });

  it("build() default In_Pension = 10000", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures");
    const val = ws!.getCell("B5").value;
    expect(val).toBe(10000);
  });

  it("build() conservation check row is formula-based", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures");
    // Conservation row is at B17 (check: take-home + deductions = net income)
    const checkCell = ws!.getCell("B17");
    const fv = checkCell.value as ExcelJS.CellFormulaValue;
    expect(typeof fv).toBe("object");
    const formula = (fv as { formula: string }).formula;
    expect(formula).toContain("NetTakeHome");
  });

  it("build() NI lower limit constant matches 12570", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates");
    // Row 2=PA, 3=BRL, 4=HRL, 5=NI_LOWER, 6=NI_UPPER, 7=C4_MAIN, 8=C4_UPPER_RATE
    const val = rates!.getCell("B5").value;
    expect(val).toBe(NI_LOWER);
  });

  it("build() NI upper limit constant matches 50270", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates");
    // Row 6 = NI_UPPER
    const val = rates!.getCell("B6").value;
    expect(val).toBe(NI_UPPER);
  });
});
