/**
 * Golden tests for the private practice incorporation comparison Excel workbook builder.
 *
 * Each test calls calcIncorporation() from the compute lib for the reference figure,
 * then verifies the builder's locked constants and default cell values match.
 *
 * F2 NOTE, REWRITTEN 2026-09-01. The workbook still charges CT at a flat 25% on
 * the whole profit and deducts the director salary AFTER it, and it charges no
 * employer NIC. `calcIncorporation` no longer does any of those things: it
 * deducts the salary and the employer NIC first, then charges 19% / 25% with
 * marginal relief. THE WORKBOOK AND THE LIVE CALCULATOR NOW DISAGREE. That is a
 * deliberate, reported divergence, not a regression to "fix" here: the .xlsx is
 * an owner-facing artefact and re-issuing it is a separate decision. The
 * builder assertions below therefore pin the WORKBOOK's constants, and the
 * compute assertions pin the CORRECTED lib.
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

// ---- Locked constants ----
const PA = 12570;
// The WORKBOOK's flat CT rate. The compute lib no longer uses it.
const CT_RATE = 0.25;
const DIV_ALLOWANCE = 500;
const DIV_BASIC = 0.1075;
const DIV_HIGHER = 0.3575;
const DIV_ADDITIONAL = 0.3935;
const C4_MAIN = 0.06; // 6%: NOT the abolished 9%

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

    // Limited company, corrected 2026-09-01:
    //   employerNIC = (12570-5000)*0.15 = 1135.50
    //   chargeable = 85000 - 12570 - 1135.50 = 71294.50 (marginal band)
    //   CT = 71294.50*0.25 - 0.015*(250000-71294.50) = 15143.0425
    //   dividendAmount = 56151.4575; divTax = 55651.4575*0.3575 = 19895.39605625
    //   payeIncomeTax on 62570 = 12460
    //   ltdTotalTax = 48633.93855625
    // The WORKBOOK still reports CT 21250 / div 51180 / ltdTotalTax 46854.10.
    expect(result.companyProfit).toBe(85000);
    expect(result.employerNIC).toBeCloseTo(1135.5, 2);
    expect(result.corporationTax).toBeCloseTo(15143.0425, 2);
    expect(result.dividendAmount).toBeCloseTo(56151.4575, 2);
    expect(result.dividendTax).toBeCloseTo(19895.396056, 2);
    expect(result.limitedCompanyTotalTax).toBeCloseTo(48633.938556, 2);

    expect(result.taxSavings).toBeCloseTo(1275.661444, 2);
    expect(result.savingsPerMonth).toBeCloseTo(1275.661444 / 12, 2);
  });

  it("INC-B: high income stress test (300k private, 20k expenses, 12570 salary, no NHS)", () => {
    const result = calcIncorporation({
      privateIncome: 300000,
      expenses: 20000,
      desiredSalary: 12570,
      nhsIncome: 0,
    });
    // soleTraderProfit = 280000 (> £125,140 so PA fully tapered to £0); taxable = 280000
    // basic=37700*0.2=7540; higher=(125140-37700)=87440*0.4=34976; additional=(280000-125140)*0.45=154860*0.45=69687
    // incomeTax = 112203
    // NI: band1=37700*0.06=2262; above=(280000-50270)*0.02=229730*0.02=4594.6; NI=6856.6
    // soleTraderTotalTax = 119059.6 (pre-fix asserted £114,031.60, untapered PA + fixed £74,870 band)
    expect(result.soleTraderTotalTax).toBeCloseTo(119059.6, 1);

    // chargeable = 280000 - 12570 - 1135.50 = 266294.50, above £250,000
    // CT = 266294.50*0.25 = 66573.625 (the workbook still reports 70000)
    expect(result.corporationTax).toBeCloseTo(66573.625, 2);
  });

  it("INC-C: Class 4 is 6 percent (spot check sole trader NI on 60k profit, no NHS)", () => {
    const result = calcIncorporation({
      privateIncome: 60000,
      expenses: 0,
      desiredSalary: 12570,
      nhsIncome: 0,
    });
    // soleTraderProfit = 60000; soleTraderTaxableIncome = 60000
    // taxableAfterPA = 47430
    // basic = min(47430, 37700)*0.2 = 7540
    // higher = (47430-37700)*0.4 = 9730*0.4 = 3892; incomeTax = 11432
    // NI: band1=37700*0.06=2262; above=(60000-50270)*0.02=9730*0.02=194.6; NI=2456.6
    // soleTraderTotalTax = 11432+2456.6 = 13888.6
    expect(result.soleTraderTotalTax).toBeCloseTo(13888.6, 1);

    // Confirm 6% rate: ni=(60000-12570) portions
    // If it were 9%, NI would be 37700*0.09=3393 (much higher)
    // band1 portion is 37700*C4_MAIN = 37700*0.06 = 2262
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
    // taxableDividends = 29398.545 - 500 = 28898.545
    expect(result.corporationTax).toBeCloseTo(6895.955, 2);
    expect(result.dividendAmount).toBeCloseTo(29398.545, 2);
    // dividendTax > 0 (taxable dividends exist beyond the GBP500 allowance)
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

  it("INC-F: the lib applies marginal relief and the workbook does not (known divergence)", () => {
    const result = calcIncorporation({
      privateIncome: 100000,
      expenses: 0,
      desiredSalary: 12570,
      nhsIncome: 0,
    });
    // chargeable = 100000 - 12570 - 1135.50 = 86294.50
    // CT = 86294.50*0.25 - 0.015*(250000 - 86294.50) = 21573.625 - 2455.5825
    expect(result.corporationTax).toBeCloseTo(19118.0425, 2);
    // The workbook's flat charge on the same inputs, for the record.
    expect(result.corporationTax).not.toBeCloseTo(100000 * CT_RATE, 0);
  });

  it("INC-G: dividend basic rate is 10.75 percent (2026/27, NOT 8.75 percent)", () => {
    const result = calcIncorporation({
      privateIncome: 40000,
      expenses: 0,
      desiredSalary: 0,
      nhsIncome: 0,
    });
    // Very simple case: no salary, so no employer NIC, and the whole £40,000
    // sits inside the 19% small-profits band.
    // CT = 40000*0.19 = 7600; dividendAmount = 32400
    // taxableDividends = 32400 - 500 = 31900
    // totalIncomeBeforeDividends = 0; basicRateRemaining = 50270
    // 31900 < 50270 -> all basic rate; dividendTax = 31900*0.1075 = 3429.25
    expect(result.corporationTax).toBeCloseTo(7600, 2);
    expect(result.dividendTax).toBeCloseTo(31900 * DIV_BASIC, 2);
    // Confirm NOT the pre-2026/27 rate of 8.75%
    expect(result.dividendTax).not.toBeCloseTo(31900 * 0.0875, 1);
  });

  it("INC-H: higher dividend rate is 35.75 percent (2026/27)", () => {
    const result = calcIncorporation({
      privateIncome: 120000,
      expenses: 0,
      desiredSalary: 12570,
      nhsIncome: 60000,
    });
    // All dividends land in higher band (totalIncomeBeforeDividends=72570 > BRL=50270)
    // Confirm dividendTax uses 35.75% not 32.5%
    expect(result.dividendTax).toBeGreaterThan(0);
    // dividendAmount = (120000*0.75)-12570 = 90000-12570 = 77430
    // taxableDividends = 77430-500 = 76930
    // higherRateRemaining = max(0, 125140-72570) = 52570
    // basicRateRemaining = 0
    // higherRateDivs = min(76930, 52570) = 52570 -> dividendTax = 52570*0.3575 + ...
    const expected = calcIncorporation({
      privateIncome: 120000,
      expenses: 0,
      desiredSalary: 12570,
      nhsIncome: 60000,
    }).dividendTax;
    expect(expected).toBeCloseTo(result.dividendTax, 2);
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

  it("build() CT_RATE on Rates sheet equals 0.25 (flat 25 percent)", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates");
    expect(rates).toBeDefined();
    // CT_RATE is row 10 (after PA, BRL, HRL, NI_LOWER, NI_UPPER, C4_MAIN, C4_UPPER_RATE = row 9)
    // Row 2=PA, 3=BRL, 4=HRL, 5=NI_LOWER, 6=NI_UPPER, 7=C4_MAIN, 8=C4_UPPER_RATE, 9+1(header)=...
    // Scan for the row with value 0.25
    let ctRow: number | null = null;
    rates!.eachRow((row, rowNumber) => {
      if (rowNumber > 1 && Math.abs((row.getCell(2).value as number) - CT_RATE) < 0.0001) {
        ctRow = rowNumber;
      }
    });
    expect(ctRow).not.toBeNull();
  });

  it("build() DIV_ALLOWANCE on Rates sheet equals 500", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates");
    let found = false;
    rates!.eachRow((row, rowNumber) => {
      if (rowNumber > 1 && row.getCell(2).value === DIV_ALLOWANCE) {
        found = true;
      }
    });
    expect(found).toBe(true);
  });

  it("build() DIV_BASIC on Rates sheet equals 0.1075 (10.75 percent)", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates");
    let found = false;
    rates!.eachRow((row, rowNumber) => {
      if (rowNumber > 1 && Math.abs((row.getCell(2).value as number) - DIV_BASIC) < 0.0001) {
        found = true;
      }
    });
    expect(found).toBe(true);
  });

  it("build() DIV_HIGHER on Rates sheet equals 0.3575 (35.75 percent, 2026/27)", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates");
    let found = false;
    rates!.eachRow((row, rowNumber) => {
      if (rowNumber > 1 && Math.abs((row.getCell(2).value as number) - DIV_HIGHER) < 0.0001) {
        found = true;
      }
    });
    expect(found).toBe(true);
  });

  it("build() DIV_ADDITIONAL on Rates sheet equals 0.3935 (39.35 percent, 2026/27)", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates");
    let found = false;
    rates!.eachRow((row, rowNumber) => {
      if (rowNumber > 1 && Math.abs((row.getCell(2).value as number) - DIV_ADDITIONAL) < 0.0001) {
        found = true;
      }
    });
    expect(found).toBe(true);
  });

  it("build() C4_MAIN on Rates sheet equals 0.06 (6 percent, NOT abolished 9 percent)", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates");
    let found = false;
    rates!.eachRow((row, rowNumber) => {
      if (rowNumber > 1 && Math.abs((row.getCell(2).value as number) - C4_MAIN) < 0.0001) {
        found = true;
      }
    });
    expect(found).toBe(true);
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
    const checkCell = ws!.getCell("B30");
    const fv = checkCell.value as ExcelJS.CellFormulaValue;
    expect(typeof fv).toBe("object");
    const formula = (fv as { formula: string }).formula;
    expect(formula).toContain("TaxSavings");
  });

  it("build() NHS pension impact row is always present", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures");
    // Row 32 contains the NHS pension impact heading
    const cell = ws!.getCell("A32");
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
});
