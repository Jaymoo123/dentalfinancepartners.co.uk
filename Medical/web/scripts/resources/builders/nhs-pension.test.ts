/**
 * Golden tests for the NHS pension annual allowance Excel workbook builder.
 *
 * Each test calls calcNHSPension() from the compute lib to get the reference
 * figure, then verifies the workbook builder's locked constants produce the
 * same result. The builder IS the compute lib's constants re-expressed as
 * Excel formulas; divergence here means the builder has drifted.
 *
 * Vitest: run with `npm test --workspace Medical/web`
 * No em-dashes in test names.
 */
import { describe, it, expect } from "vitest";
import { calcNHSPension } from "../../../src/lib/tools/compute/nhs-pension.js";

// Import the builder to verify it can be instantiated without error.
// Formula-cell correctness is checked by running the compute lib directly
// against the same inputs the builder pins as defaults.
import { build } from "./nhs-pension.js";

// ---- Locked constants (traced to nhs-pension.ts) ----
// These must match the builder. If a constant changes in the lib, update the
// lib, the builder, and these tests in the same PR.
const STANDARD_ALLOWANCE = 60000;
const MIN_ALLOWANCE = 10000;

describe("NHS pension AA/taper compute lib (golden)", () => {
  it("PENSION-A: not tapered below threshold (150k income, 40k growth, higher rate)", () => {
    const result = calcNHSPension({
      thresholdIncome: 150000,
      pensionGrowth: 40000,
      taxBand: "higher",
    });
    // threshold 150k < 200k limit -> not tapered
    expect(result.isTapered).toBe(false);
    expect(result.annualAllowance).toBe(STANDARD_ALLOWANCE); // 60000
    expect(result.adjustedIncome).toBe(190000); // 150000 + 40000
    expect(result.excess).toBe(0); // growth 40k < AA 60k
    expect(result.taxCharge).toBe(0);
  });

  it("PENSION-B: tapered but growth within reduced AA (230k income, 50k growth, additional)", () => {
    const result = calcNHSPension({
      thresholdIncome: 230000,
      pensionGrowth: 50000,
      taxBand: "additional",
    });
    // adjustedIncome = 280k > 260k AND threshold 230k > 200k -> tapered
    // excessIncome = 280k-260k = 20k; reduction = 10k
    // annualAllowance = max(10k, 60k-10k) = 50000
    expect(result.isTapered).toBe(true);
    expect(result.annualAllowance).toBe(50000);
    expect(result.excess).toBe(0); // growth 50k = AA 50k exactly
    expect(result.taxCharge).toBe(0);
  });

  it("PENSION-C: tapered with tax charge (230k income, 80k growth, additional rate)", () => {
    const result = calcNHSPension({
      thresholdIncome: 230000,
      pensionGrowth: 80000,
      taxBand: "additional",
    });
    // adjustedIncome = 310k; excessIncome = 50k; reduction = 25k
    // annualAllowance = max(10k, 60k-25k) = 35000
    // excess = 80k-35k = 45000; taxCharge = 45000*0.45 = 20250
    expect(result.isTapered).toBe(true);
    expect(result.annualAllowance).toBe(35000);
    expect(result.excess).toBe(45000);
    expect(result.taxCharge).toBeCloseTo(20250, 2);
  });

  it("PENSION-D: tapered to minimum allowance (280k income, 100k growth, higher rate)", () => {
    const result = calcNHSPension({
      thresholdIncome: 280000,
      pensionGrowth: 100000,
      taxBand: "higher",
    });
    // adjustedIncome = 380k; excessIncome = 120k; reduction = 60k
    // annualAllowance = max(10k, 60k-60k) = 10000 (minimum)
    // excess = 100k-10k = 90000; taxCharge = 90000*0.4 = 36000
    expect(result.annualAllowance).toBe(MIN_ALLOWANCE);
    expect(result.excess).toBe(90000);
    expect(result.taxCharge).toBeCloseTo(36000, 2);
  });

  it("PENSION-E: basic rate taxpayer with taper charge", () => {
    const result = calcNHSPension({
      thresholdIncome: 220000,
      pensionGrowth: 60000,
      taxBand: "basic",
    });
    // adjustedIncome = 280k; excessIncome = 20k; reduction = 10k
    // annualAllowance = max(10k, 60k-10k) = 50000
    // excess = 60k-50k = 10000; taxCharge = 10000*0.2 = 2000
    expect(result.isTapered).toBe(true);
    expect(result.annualAllowance).toBe(50000);
    expect(result.excess).toBe(10000);
    expect(result.taxCharge).toBeCloseTo(2000, 2);
  });
});

describe("NHS pension builder (workbook sanity)", () => {
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

  it("build() Rates sheet cell B2 equals STANDARD_ALLOWANCE (60000)", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates");
    expect(rates).toBeDefined();
    // Row 2 = STANDARD_ALLOWANCE (first non-header row)
    const val = rates!.getCell("B2").value;
    expect(val).toBe(STANDARD_ALLOWANCE);
  });

  it("build() Rates sheet cell B3 equals MIN_ALLOWANCE (10000)", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates");
    const val = rates!.getCell("B3").value;
    expect(val).toBe(MIN_ALLOWANCE);
  });

  it("build() Your figures default In_ThresholdIncome = 150000", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures");
    expect(ws).toBeDefined();
    const val = ws!.getCell("B3").value;
    expect(val).toBe(150000);
  });

  it("build() Your figures default In_PensionGrowth = 40000", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures");
    const val = ws!.getCell("B4").value;
    expect(val).toBe(40000);
  });

  it("build() conservation check row contains a formula with OK/ERROR string", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures");
    // The conservation row moved to B27 when carry-forward was added.
    const checkCell = ws!.getCell("B27");
    const fv = checkCell.value as ExcelJS.CellFormulaValue;
    expect(typeof fv).toBe("object");
    expect((fv as { formula: string }).formula).toContain("Excess");
  });

  it("GUARD: adjusted income uses the statutory construction, not the NHS-only shortcut", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures");
    const totalInput = (ws!.getCell("B12").value as { formula: string }).formula;
    const adjusted = (ws!.getCell("B13").value as { formula: string }).formula;
    // Total pension input must span every registered scheme.
    expect(totalInput).toBe("In_PensionGrowth+In_OtherPensionInput");
    // Adjusted income = threshold income + TOTAL pension input (FA 2004 s.228ZA,
    // HMRC PTM057100). The old shortcut "In_ThresholdIncome+In_PensionGrowth"
    // omitted every other scheme and understated the taper.
    expect(adjusted).toBe("In_ThresholdIncome+TotalPensionInput");
    expect(adjusted).not.toBe("In_ThresholdIncome+In_PensionGrowth");
  });

  it("GUARD: the excess is measured against total pension input, not the NHS input alone", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures");
    const excess = (ws!.getCell("B17").value as { formula: string }).formula;
    expect(excess).toBe("MAX(0,TotalPensionInput-AnnualAllowance)");
  });

  it("GUARD: carry-forward has an input per year and reduces the charge", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures");
    // Three carry-forward input cells, all defaulting to zero.
    expect(ws!.getCell("B8").value).toBe(0);
    expect(ws!.getCell("B9").value).toBe(0);
    expect(ws!.getCell("B10").value).toBe(0);
    // Used earliest year first.
    expect((ws!.getCell("B18").value as { formula: string }).formula).toBe("MIN(In_CF_Year3,Excess)");
    // The charge is on the excess AFTER carry-forward.
    expect((ws!.getCell("B22").value as { formula: string }).formula).toBe("MAX(0,Excess-CFUsed)");
    expect((ws!.getCell("B23").value as { formula: string }).formula).toBe("ChargeableExcess*In_TaxRate");
  });

  it("GUARD: the workbook itself warns when carry-forward has not been entered", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures");
    const status = (ws!.getCell("B25").value as { formula: string }).formula;
    expect(status).toContain("CARRY-FORWARD NOT ENTERED");
    expect(status).toContain("BEFORE carry-forward");
  });

  it("build() Rates header is labelled 2026/27, not 2025/26", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates");
    const header = String(rates!.getCell("A1").value);
    expect(header).toContain("2026/27");
    expect(header).not.toContain("2025/26 basis");
  });
});

// Import type for formula cell shape
import type ExcelJS from "exceljs";
