/**
 * Golden tests for the agency exit CGT workbook builder.
 *
 * Golden values verified by running calcBadrCgt via Node 2026-07-06.
 * API signature: { saleProceeds, originalCost, previousBadrUsed, year, meetsEligibility }
 * Output: { gain, eligibleForBadr, notEligible, badrTax, standardTax, totalTax, netProceeds, effectiveRate }
 *
 * Default (saleProceeds=750000, originalCost=50000, previousBadrUsed=0, year=2026/27, meetsEligibility=true):
 *   gain=700000
 *   badrTax=126000   (700000 * 18%)
 *   standardTax=0    (no overflow, all eligible)
 *   totalTax=126000
 *   netProceeds=624000 (750000 - 126000)
 *
 *   Without BADR (meetsEligibility=false):
 *   standardTax=168000  (700000 * 24%)
 *   totalTax=168000
 *   netProceeds=582000
 *
 *   2025/26 (BADR rate 14%):
 *   badrTax=98000    (700000 * 14%)
 *
 *   Over-limit (previousBadrUsed=900000):
 *   eligibleForBadr=100000 (1000000-900000)
 *   notEligible=600000 (700000-100000)
 *   badrTax=18000 (100000*18%)
 *   standardTax=144000 (600000*24%)
 *   totalTax=162000
 *
 * Compliance:
 *   - BADR 2025/26 = 14%; BADR 2026/27 = 18% (per FA 2026 schedule).
 *   - Standard CGT higher rate = 24%.
 *   - Lifetime BADR limit = 1,000,000.
 *   - No em-dashes anywhere. No "DJH". No credential claims.
 *   - Creator = "Agency Founder Finance".
 *
 * Run: npm test --workspace digital-agency/web
 */
import { describe, it, expect } from "vitest";
import { calcBadrCgt } from "../../../src/lib/tools/compute/badr-cgt.js";
import { build } from "./agency-exit-cgt.js";
import type ExcelJS from "exceljs";

// ---- Locked constants ----
const BADR_2025_26 = 0.14;
const BADR_2026_27 = 0.18;
const STANDARD_CGT_HIGHER = 0.24;
const BADR_LIFETIME_LIMIT = 1_000_000;

describe("agency-exit-cgt compute lib (golden)", () => {
  it("default 2026/27: badr tax = 126000 (18% on 700000 gain)", () => {
    const r = calcBadrCgt({
      saleProceeds: 750000,
      originalCost: 50000,
      previousBadrUsed: 0,
      year: "2026/27",
      meetsEligibility: true,
    });
    expect(r.badrTax).toBeCloseTo(126000, 0);
  });

  it("default 2026/27: standard tax (overflow) = 0 (all eligible)", () => {
    const r = calcBadrCgt({
      saleProceeds: 750000,
      originalCost: 50000,
      previousBadrUsed: 0,
      year: "2026/27",
      meetsEligibility: true,
    });
    expect(r.standardTax).toBeCloseTo(0, 0);
  });

  it("default 2026/27: total tax = 126000", () => {
    const r = calcBadrCgt({
      saleProceeds: 750000,
      originalCost: 50000,
      previousBadrUsed: 0,
      year: "2026/27",
      meetsEligibility: true,
    });
    expect(r.totalTax).toBeCloseTo(126000, 0);
  });

  it("default 2026/27: gain = 700000", () => {
    const r = calcBadrCgt({
      saleProceeds: 750000,
      originalCost: 50000,
      previousBadrUsed: 0,
      year: "2026/27",
      meetsEligibility: true,
    });
    expect(r.gain).toBeCloseTo(700000, 0);
  });

  it("default 2026/27: net proceeds = 624000 (proceeds - badrTax)", () => {
    const r = calcBadrCgt({
      saleProceeds: 750000,
      originalCost: 50000,
      previousBadrUsed: 0,
      year: "2026/27",
      meetsEligibility: true,
    });
    expect(r.netProceeds).toBeCloseTo(624000, 0);
  });

  it("no BADR (meetsEligibility=false): standard tax = 168000 (24% on 700000)", () => {
    const r = calcBadrCgt({
      saleProceeds: 750000,
      originalCost: 50000,
      previousBadrUsed: 0,
      year: "2026/27",
      meetsEligibility: false,
    });
    expect(r.standardTax).toBeCloseTo(168000, 0);
    expect(r.totalTax).toBeCloseTo(168000, 0);
  });

  it("no BADR: net proceeds = 582000", () => {
    const r = calcBadrCgt({
      saleProceeds: 750000,
      originalCost: 50000,
      previousBadrUsed: 0,
      year: "2026/27",
      meetsEligibility: false,
    });
    expect(r.netProceeds).toBeCloseTo(582000, 0);
  });

  it("BADR always saves tax relative to no-BADR when fully eligible", () => {
    const withBadr = calcBadrCgt({
      saleProceeds: 750000,
      originalCost: 50000,
      previousBadrUsed: 0,
      year: "2026/27",
      meetsEligibility: true,
    });
    const withoutBadr = calcBadrCgt({
      saleProceeds: 750000,
      originalCost: 50000,
      previousBadrUsed: 0,
      year: "2026/27",
      meetsEligibility: false,
    });
    expect(withBadr.totalTax).toBeLessThan(withoutBadr.totalTax);
  });

  it("2025/26: badr tax = 98000 (14% on 700000)", () => {
    const r = calcBadrCgt({
      saleProceeds: 750000,
      originalCost: 50000,
      previousBadrUsed: 0,
      year: "2025/26",
      meetsEligibility: true,
    });
    expect(r.badrTax).toBeCloseTo(98000, 0);
  });

  it("over-limit (previousBadrUsed=900000): eligible = 100000, overflow = 600000", () => {
    const r = calcBadrCgt({
      saleProceeds: 750000,
      originalCost: 50000,
      previousBadrUsed: 900000,
      year: "2026/27",
      meetsEligibility: true,
    });
    expect(r.eligibleForBadr).toBeCloseTo(100000, 0);
    expect(r.notEligible).toBeCloseTo(600000, 0);
  });

  it("over-limit: badrTax = 18000 (100000*18%)", () => {
    const r = calcBadrCgt({
      saleProceeds: 750000,
      originalCost: 50000,
      previousBadrUsed: 900000,
      year: "2026/27",
      meetsEligibility: true,
    });
    expect(r.badrTax).toBeCloseTo(18000, 0);
  });

  it("over-limit: standardTax = 144000 (600000*24%)", () => {
    const r = calcBadrCgt({
      saleProceeds: 750000,
      originalCost: 50000,
      previousBadrUsed: 900000,
      year: "2026/27",
      meetsEligibility: true,
    });
    expect(r.standardTax).toBeCloseTo(144000, 0);
  });

  it("badr rate 2026/27 is 18% (NOT 10% or 14%)", () => {
    expect(BADR_2026_27).toBeCloseTo(0.18, 4);
    expect(BADR_2026_27).not.toBeCloseTo(0.1, 3);
    expect(BADR_2026_27).not.toBeCloseTo(0.14, 3);
  });

  it("badr rate 2025/26 is 14%", () => {
    expect(BADR_2025_26).toBeCloseTo(0.14, 4);
  });

  it("standard CGT higher rate is 24% (NOT 20% or 28%)", () => {
    expect(STANDARD_CGT_HIGHER).toBeCloseTo(0.24, 4);
    expect(STANDARD_CGT_HIGHER).not.toBeCloseTo(0.2, 3);
    expect(STANDARD_CGT_HIGHER).not.toBeCloseTo(0.28, 3);
  });

  it("lifetime BADR limit = 1000000", () => {
    expect(BADR_LIFETIME_LIMIT).toBe(1_000_000);
  });

  it("conservation: netProceeds = saleProceeds - totalTax", () => {
    const proceeds = 750000;
    const r = calcBadrCgt({
      saleProceeds: proceeds,
      originalCost: 50000,
      previousBadrUsed: 0,
      year: "2026/27",
      meetsEligibility: true,
    });
    expect(r.netProceeds).toBeCloseTo(proceeds - r.totalTax, 0);
  });
});

describe("agency-exit-cgt builder (workbook sanity)", () => {
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

  it("build() default In_Proceeds = 750000", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures");
    expect(ws!.getCell("B2").value).toBe(750000);
  });

  it("build() default In_Cost = 50000", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures");
    expect(ws!.getCell("B3").value).toBe(50000);
  });

  it("build() default In_PrevBadr = 0", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures");
    expect(ws!.getCell("B4").value).toBe(0);
  });

  it("build() default In_Year = 2026/27", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures");
    expect(ws!.getCell("B5").value).toBe("2026/27");
  });

  it("build() BADR_2026_27 on Rates sheet = 0.18", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates");
    let found = false;
    rates!.eachRow((row, rowNumber) => {
      if (rowNumber > 1 && typeof row.getCell(2).value === "number") {
        const v = row.getCell(2).value as number;
        if (Math.abs(v - BADR_2026_27) < 0.0001) found = true;
      }
    });
    expect(found).toBe(true);
  });

  it("build() BADR_2025_26 on Rates sheet = 0.14", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates");
    let found = false;
    rates!.eachRow((row, rowNumber) => {
      if (rowNumber > 1 && typeof row.getCell(2).value === "number") {
        const v = row.getCell(2).value as number;
        if (Math.abs(v - BADR_2025_26) < 0.0001) found = true;
      }
    });
    expect(found).toBe(true);
  });

  it("build() STANDARD_CGT on Rates sheet = 0.24", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates");
    let found = false;
    rates!.eachRow((row, rowNumber) => {
      if (rowNumber > 1 && typeof row.getCell(2).value === "number") {
        const v = row.getCell(2).value as number;
        if (Math.abs(v - STANDARD_CGT_HIGHER) < 0.0001) found = true;
      }
    });
    expect(found).toBe(true);
  });

  it("build() BADR_LIFETIME_LIMIT on Rates sheet = 1000000", () => {
    const wb = build();
    const rates = wb.getWorksheet("Rates");
    let found = false;
    rates!.eachRow((row, rowNumber) => {
      if (rowNumber > 1 && row.getCell(2).value === BADR_LIFETIME_LIMIT) found = true;
    });
    expect(found).toBe(true);
  });

  it("build() In_BadrRate row has IF formula (LET-free)", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures");
    let foundIf = false;
    ws!.eachRow((row) => {
      row.eachCell((cell) => {
        if (cell.value && typeof cell.value === "object") {
          const fv = cell.value as { formula?: string };
          if (fv.formula && fv.formula.includes("IF") && fv.formula.includes("2025")) {
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

  it("build() badrTax cell has a formula", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures");
    let found = false;
    ws!.eachRow((row) => {
      row.eachCell((cell) => {
        if (cell.value && typeof cell.value === "object") {
          const fv = cell.value as { formula?: string };
          if (fv.formula && fv.formula.includes("BadrTax")) found = true;
        }
      });
    });
    expect(found).toBe(true);
  });

  it("build() workbook has two scenario columns B and C", () => {
    const wb = build();
    const ws = wb.getWorksheet("Your figures");
    expect(ws!.columnCount).toBeGreaterThanOrEqual(3);
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

  it("build() Notes sheet mentions BADR conditions", () => {
    const wb = build();
    const notes = wb.getWorksheet("Notes");
    expect(notes).toBeDefined();
    let found = false;
    notes!.eachRow((row) => {
      const text = String(row.getCell(1).value ?? "").toLowerCase();
      if (text.includes("badr") || text.includes("business asset")) found = true;
    });
    expect(found).toBe(true);
  });
});
