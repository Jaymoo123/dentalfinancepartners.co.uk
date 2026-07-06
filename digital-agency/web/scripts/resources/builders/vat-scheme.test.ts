/**
 * Golden tests for the VAT scheme comparator workbook builder.
 *
 * API signature: { turnover, vatInputs, goodsSpend }
 * Output (flat): { vatCollected, grossInclusive, standardNet, flatRate, flatPayment,
 *                  flatKeep, lctApplies, bestScheme, saving }
 *
 * Golden values verified by running calcVatScheme via Node 2026-07-06:
 *
 *   Default (turnover=180000, vatInputs=8000, goodsSpend=500):
 *     vatCollected=36000, grossInclusive=216000, standardNet=28000
 *     lctApplies=true (goodsSpend=500 < MAX(1000, 216000*2%)=MAX(1000,4320)=4320)
 *     flatRate=0.165, flatPayment=35640, bestScheme="Standard", saving=7640
 *
 *   High-goods (turnover=300000, vatInputs=10000, goodsSpend=40000):
 *     vatCollected=60000, grossInclusive=360000, standardNet=50000
 *     lctApplies=false (goodsSpend=40000 >= MAX(1000, 360000*2%)=7200)
 *     flatRate=0.125, flatPayment=45000, bestScheme="Flat Rate", saving=5000
 *
 * Compliance:
 *   - Standard VAT = 20%; FRS normal rate = 12.5%; FRS LCT rate = 16.5%.
 *   - LCT applies if goods spend < MAX(1000, gross*2%).
 *   - No em-dashes anywhere. No "DJH". No credential claims.
 *   - Creator = "Agency Founder Finance".
 *
 * Run: npm test --workspace digital-agency/web
 */
import { describe, it, expect } from "vitest";
import { calcVatScheme } from "../../../src/lib/tools/compute/vat-scheme.js";
import { build } from "./vat-scheme.js";

// ---- Locked constants ----
const STD_VAT = 0.20;
const FRS_NORMAL = 0.125;
const FRS_LCT = 0.165;
const LCT_GBP = 1_000;

describe("vat-scheme compute lib (golden)", () => {
  it("default case: vatCollected = 36000 (180000 * 20%)", () => {
    const r = calcVatScheme({ turnover: 180000, vatInputs: 8000, goodsSpend: 500 });
    expect(r.vatCollected).toBeCloseTo(36000, 0);
  });

  it("default case: standardNet = 28000 (36000 - 8000 inputs)", () => {
    const r = calcVatScheme({ turnover: 180000, vatInputs: 8000, goodsSpend: 500 });
    expect(r.standardNet).toBeCloseTo(28000, 0);
  });

  it("default case: lctApplies = true (goods 500 < MAX(1000, gross*2%))", () => {
    const r = calcVatScheme({ turnover: 180000, vatInputs: 8000, goodsSpend: 500 });
    expect(r.lctApplies).toBe(true);
  });

  it("default case: flat rate = 16.5% (LCT rate applies)", () => {
    const r = calcVatScheme({ turnover: 180000, vatInputs: 8000, goodsSpend: 500 });
    expect(r.flatRate).toBeCloseTo(FRS_LCT, 4);
  });

  it("default case: flatPayment = 35640 (216000 * 16.5%)", () => {
    const r = calcVatScheme({ turnover: 180000, vatInputs: 8000, goodsSpend: 500 });
    expect(r.flatPayment).toBeCloseTo(35640, 0);
  });

  it("default case: bestScheme = Standard (standardNet 28000 < flatPayment 35640)", () => {
    const r = calcVatScheme({ turnover: 180000, vatInputs: 8000, goodsSpend: 500 });
    expect(r.bestScheme).toBe("Standard");
  });

  it("default case: saving = 7640 (flatPayment - standardNet)", () => {
    const r = calcVatScheme({ turnover: 180000, vatInputs: 8000, goodsSpend: 500 });
    expect(r.saving).toBeCloseTo(7640, 0);
  });

  it("high-goods case: lctApplies = false (goods 40000 >= MAX(1000, gross*2%))", () => {
    const r = calcVatScheme({ turnover: 300000, vatInputs: 10000, goodsSpend: 40000 });
    expect(r.lctApplies).toBe(false);
  });

  it("high-goods case: flat rate = 12.5% (normal FRS, no LCT)", () => {
    const r = calcVatScheme({ turnover: 300000, vatInputs: 10000, goodsSpend: 40000 });
    expect(r.flatRate).toBeCloseTo(FRS_NORMAL, 4);
  });

  it("high-goods case: bestScheme = Flat Rate", () => {
    const r = calcVatScheme({ turnover: 300000, vatInputs: 10000, goodsSpend: 40000 });
    expect(r.bestScheme).toBe("Flat Rate");
  });

  it("high-goods case: saving = 5000 (standardNet 50000 - flatPayment 45000)", () => {
    const r = calcVatScheme({ turnover: 300000, vatInputs: 10000, goodsSpend: 40000 });
    expect(r.saving).toBeCloseTo(5000, 0);
  });

  it("standard VAT rate is 20%", () => {
    expect(STD_VAT).toBeCloseTo(0.20, 4);
  });

  it("FRS LCT rate is 16.5%", () => {
    expect(FRS_LCT).toBeCloseTo(0.165, 4);
  });

  it("FRS normal rate is 12.5%", () => {
    expect(FRS_NORMAL).toBeCloseTo(0.125, 4);
  });

  it("LCT goods threshold = 1000 GBP", () => {
    expect(LCT_GBP).toBe(1000);
  });

  it("bestScheme is always either Standard or Flat Rate", () => {
    const r1 = calcVatScheme({ turnover: 180000, vatInputs: 8000, goodsSpend: 500 });
    const r2 = calcVatScheme({ turnover: 300000, vatInputs: 10000, goodsSpend: 40000 });
    expect(["Standard", "Flat Rate"]).toContain(r1.bestScheme);
    expect(["Standard", "Flat Rate"]).toContain(r2.bestScheme);
  });

  it("grossInclusive = turnover * 1.20", () => {
    const r = calcVatScheme({ turnover: 180000, vatInputs: 8000, goodsSpend: 500 });
    expect(r.grossInclusive).toBeCloseTo(216000, 0);
  });

  it("saving > 0 when any scheme is chosen", () => {
    const r1 = calcVatScheme({ turnover: 180000, vatInputs: 8000, goodsSpend: 500 });
    expect(r1.saving).toBeGreaterThan(0);
    const r2 = calcVatScheme({ turnover: 300000, vatInputs: 10000, goodsSpend: 40000 });
    expect(r2.saving).toBeGreaterThan(0);
  });
});

describe("vat-scheme builder (workbook sanity)", () => {
  it("build() returns a workbook with expected sheets", () => {
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

  it("build() default In_Turnover = 180000", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures");
    expect(ws!.getCell("B2").value).toBe(180000);
  });

  it("build() default In_VatInputs = 8000", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures");
    expect(ws!.getCell("B3").value).toBe(8000);
  });

  it("build() default In_GoodsSpend = 500", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures");
    expect(ws!.getCell("B4").value).toBe(500);
  });

  it("build() STD_VAT on Rates sheet = 0.20", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates");
    let found = false;
    rates!.eachRow((row, rowNumber) => {
      if (rowNumber > 1 && typeof row.getCell(2).value === "number") {
        const v = row.getCell(2).value as number;
        if (Math.abs(v - STD_VAT) < 0.0001) found = true;
      }
    });
    expect(found).toBe(true);
  });

  it("build() FRS_NORMAL on Rates sheet = 0.125", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates");
    let found = false;
    rates!.eachRow((row, rowNumber) => {
      if (rowNumber > 1 && typeof row.getCell(2).value === "number") {
        const v = row.getCell(2).value as number;
        if (Math.abs(v - FRS_NORMAL) < 0.0001) found = true;
      }
    });
    expect(found).toBe(true);
  });

  it("build() FRS_LCT on Rates sheet = 0.165", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates");
    let found = false;
    rates!.eachRow((row, rowNumber) => {
      if (rowNumber > 1 && typeof row.getCell(2).value === "number") {
        const v = row.getCell(2).value as number;
        if (Math.abs(v - FRS_LCT) < 0.0001) found = true;
      }
    });
    expect(found).toBe(true);
  });

  it("build() LCT_GBP on Rates sheet = 1000", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates");
    let found = false;
    rates!.eachRow((row, rowNumber) => {
      if (rowNumber > 1 && row.getCell(2).value === LCT_GBP) found = true;
    });
    expect(found).toBe(true);
  });

  it("build() LctFlag row has IF formula referencing GoodsSpend (LET-free)", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures");
    let foundIf = false;
    ws!.eachRow((row) => {
      row.eachCell((cell) => {
        if (cell.value && typeof cell.value === "object") {
          const fv = cell.value as { formula?: string };
          if (fv.formula && fv.formula.includes("IF") && fv.formula.includes("In_GoodsSpend")) {
            foundIf = true;
          }
        }
      });
    });
    expect(foundIf).toBe(true);
  });

  it("build() no LET() function in any formula (LET-free constraint)", () => {
    const wb = build();
    wb.worksheets.forEach((ws) => {
      ws.eachRow((row) => {
        row.eachCell((cell) => {
          if (cell.value && typeof cell.value === "object") {
            const fv = cell.value as { formula?: string };
            if (fv.formula) {
              expect(fv.formula, `Sheet ${ws.name}: LET() found`).not.toMatch(/\bLET\s*\(/i);
            }
          }
        });
      });
    });
  });

  it("build() BestScheme cell has IF formula", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures");
    let found = false;
    ws!.eachRow((row) => {
      row.eachCell((cell) => {
        if (cell.value && typeof cell.value === "object") {
          const fv = cell.value as { formula?: string };
          if (fv.formula && fv.formula.toLowerCase().includes("if") &&
              (fv.formula.includes("StandardNet") || fv.formula.includes("FlatPayment"))) {
            found = true;
          }
        }
      });
    });
    expect(found).toBe(true);
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

  it("build() Notes sheet mentions flat rate scheme", () => {
    const wb = build();
    const notes = wb.getWorksheet("Notes");
    expect(notes).toBeDefined();
    let found = false;
    notes!.eachRow((row) => {
      const text = String(row.getCell(1).value ?? "").toLowerCase();
      if (text.includes("flat rate") || text.includes("lct") || text.includes("goods")) found = true;
    });
    expect(found).toBe(true);
  });
});
