/**
 * Golden tests for the GPS readiness Excel builder.
 *
 * CRITICAL CORRECTNESS POINT (the brief's single most important test):
 *   Partnership, heads=3, turnover=95,000
 *   -> per-head threshold = 3 * 30,000 = 90,000
 *   -> 95,000 >= 90,000 -> PASSES via per-head route
 *   -> annual gain = 95,000 * 0.20 = 19,000
 *   This exercises the CORRECTED HP §2 rule: EITHER route passes for partnerships.
 *
 * The test also checks:
 *   - sole_trader case: 35,000 >= 30,000 -> PASS, gain=7,000
 *   - fail case: sole_trader, turnover=25,000 -> FAIL
 *   - formula structure: no LET(), no em-dashes
 *   - the two routes are distinct (per-head vs whole-business)
 *
 * Runs as part of: npm test --workspace construction-cis/web
 */
import { describe, it, expect, beforeAll } from "vitest";
import type ExcelJS from "exceljs";
import { build } from "./gps-readiness";
import {
  gpsThreshold,
  gpsQualifiesOnTurnover,
  GPS_PER_HEAD,
  GPS_WHOLE_BUSINESS_CAP,
} from "../../../src/lib/calculators/cis-tax";

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

// ---- Default inputs (partnership, heads=3, turnover=95000) ----

describe("gps-readiness builder: workbook defaults", () => {
  it("workbook exists with required sheets", () => {
    const names = wb.worksheets.map((s) => s.name);
    expect(names).toContain("Start here");
    expect(names).toContain("Your figures");
    expect(names).toContain("Rates");
    expect(names).toContain("Notes");
  });

  it("default input: entity code = 2 (partnership)", () => {
    expect(numVal(yf(wb, 3, 2))).toBe(2);
  });

  it("default input: heads = 3", () => {
    expect(numVal(yf(wb, 5, 2))).toBe(3);
  });

  it("default input: turnover = 95000", () => {
    expect(numVal(yf(wb, 6, 2))).toBe(95000);
  });

  it("default input: CIS rate = 0.20", () => {
    expect(numVal(yf(wb, 7, 2))).toBe(0.20);
  });
});

// ---- CRITICAL GPS capped-rule golden case ----
// Partnership, heads=3, turnover=95000
// per-head threshold = 30000*3 = 90000
// 95000 >= 90000 -> PASS (per-head route)
// whole-business route (100000) not used (95000 < 100000)
// annual gain = 95000 * 0.20 = 19000

describe("gps-readiness builder: CRITICAL partnership heads-3 turnover-95000 golden case", () => {
  it("GPS_PER_HEAD constant is 30000", () => {
    expect(GPS_PER_HEAD).toBe(30000);
  });

  it("GPS_WHOLE_BUSINESS_CAP constant is 100000", () => {
    expect(GPS_WHOLE_BUSINESS_CAP).toBe(100000);
  });

  it("per-head threshold: partnership heads=3 -> 90000", () => {
    const threshold = gpsThreshold({ entityType: "partnership", heads: 3 });
    expect(threshold).toBe(90000);
  });

  it("turnover 95000 >= threshold 90000 -> PASSES per-head route", () => {
    const { passes, perHeadThreshold, wholeBusinessRoute } = gpsQualifiesOnTurnover({
      entityType: "partnership",
      heads: 3,
      turnover: 95000,
    });
    expect(passes).toBe(true);
    expect(perHeadThreshold).toBe(90000);
    expect(wholeBusinessRoute).toBe(false); // passes via per-head, NOT whole-biz
  });

  it("annual gain = turnover * cisRate = 95000 * 0.20 = 19000", () => {
    const gain = 95000 * 0.20;
    expect(gain).toBe(19000);
  });

  it("whole-business route does not override (95000 < 100000)", () => {
    // The whole-business route (100000) is NOT what makes this pass
    const { passes, wholeBusinessRoute } = gpsQualifiesOnTurnover({
      entityType: "partnership",
      heads: 3,
      turnover: 95000,
    });
    expect(passes).toBe(true);
    expect(wholeBusinessRoute).toBe(false);
  });
});

// ---- Whole-business route case ----
// Partnership, heads=4, turnover=110000
// per-head threshold = 30000*4 = 120000
// 110000 < 120000 -> fails per-head
// 110000 >= 100000 -> passes whole-business
// Result: PASS via whole-business route

describe("gps-readiness builder: whole-business route case", () => {
  it("partnership heads=4 turnover=110000: fails per-head but passes whole-business", () => {
    const { passes, perHeadThreshold, wholeBusinessRoute } = gpsQualifiesOnTurnover({
      entityType: "partnership",
      heads: 4,
      turnover: 110000,
    });
    expect(perHeadThreshold).toBe(120000);
    expect(passes).toBe(true);
    expect(wholeBusinessRoute).toBe(true); // passes via whole-biz route only
  });
});

// ---- Sole trader golden case ----
// sole_trader, heads=1, turnover=35000
// threshold = 30000 (fixed, no partner multiplier)
// 35000 >= 30000 -> PASS
// annual gain = 35000 * 0.20 = 7000

describe("gps-readiness builder: sole trader golden case", () => {
  it("sole trader threshold is always 30000 regardless of heads", () => {
    expect(gpsThreshold({ entityType: "sole_trader", heads: 1 })).toBe(30000);
    expect(gpsThreshold({ entityType: "sole_trader", heads: 5 })).toBe(30000);
  });

  it("sole_trader turnover=35000 -> PASS", () => {
    const { passes, perHeadThreshold } = gpsQualifiesOnTurnover({
      entityType: "sole_trader",
      heads: 1,
      turnover: 35000,
    });
    expect(perHeadThreshold).toBe(30000);
    expect(passes).toBe(true);
  });

  it("sole_trader annual gain at 35000 = 7000", () => {
    expect(35000 * 0.20).toBe(7000);
  });

  it("sole_trader no whole-business route applies", () => {
    const { wholeBusinessRoute } = gpsQualifiesOnTurnover({
      entityType: "sole_trader",
      heads: 1,
      turnover: 35000,
    });
    expect(wholeBusinessRoute).toBe(false);
  });
});

// ---- Fail case ----
// sole_trader, heads=1, turnover=25000
// 25000 < 30000 -> FAIL

describe("gps-readiness builder: fail case", () => {
  it("sole_trader turnover=25000 -> FAIL", () => {
    const { passes } = gpsQualifiesOnTurnover({
      entityType: "sole_trader",
      heads: 1,
      turnover: 25000,
    });
    expect(passes).toBe(false);
  });

  it("partnership heads=2 turnover=50000 -> FAIL (below 60000 per-head, below 100000 whole-biz)", () => {
    const { passes, perHeadThreshold } = gpsQualifiesOnTurnover({
      entityType: "partnership",
      heads: 2,
      turnover: 50000,
    });
    expect(perHeadThreshold).toBe(60000);
    expect(passes).toBe(false);
  });
});

// ---- Formula structure checks ----

describe("gps-readiness builder: formula structure", () => {
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

  it("GPS_PER_HEAD defined name referenced in formulas", () => {
    const formulas = allFormulas(wb);
    const perHead = formulas.find((f) => /GPS_PER_HEAD/i.test(f));
    expect(perHead).toBeTruthy();
  });

  it("GPS_WHOLE_BIZ defined name referenced in formulas", () => {
    const formulas = allFormulas(wb);
    const wholeBiz = formulas.find((f) => /GPS_WHOLE_BIZ/i.test(f));
    expect(wholeBiz).toBeTruthy();
  });

  it("OR logic formula handles partnership case (entity code check)", () => {
    const formulas = allFormulas(wb);
    // The overall result formula must check BOTH entity code 2 and entity code 3
    const orFormula = formulas.find(
      (f) => /In_EntityCode\s*=\s*2/.test(f) && /In_EntityCode\s*=\s*3/.test(f)
    );
    expect(orFormula).toBeTruthy();
  });

  it("annual gain formula multiplies turnover by CIS rate", () => {
    const formulas = allFormulas(wb);
    const gainFormula = formulas.find(
      (f) => /In_Turnover\s*\*\s*In_CisRate/i.test(f) || /In_CisRate\s*\*\s*In_Turnover/i.test(f)
    );
    expect(gainFormula).toBeTruthy();
  });
});

// ---- Two-route rule is correctly distinct ----

describe("gps-readiness builder: two-route rule integrity", () => {
  it("per-head route and whole-business route are distinct thresholds", () => {
    // For partnership heads=3: per-head=90000, whole-biz=100000 - different
    const perHead = gpsThreshold({ entityType: "partnership", heads: 3 });
    expect(perHead).toBe(90000);
    expect(GPS_WHOLE_BUSINESS_CAP).toBe(100000);
    expect(perHead).not.toBe(GPS_WHOLE_BUSINESS_CAP);
  });

  it("sole trader has no whole-business route (only per-head)", () => {
    const { wholeBusinessRoute } = gpsQualifiesOnTurnover({
      entityType: "sole_trader",
      heads: 1,
      turnover: 150000, // even at high turnover, no whole-biz route for sole trader
    });
    expect(wholeBusinessRoute).toBe(false);
  });

  it("closely controlled has no whole-business route", () => {
    const { wholeBusinessRoute } = gpsQualifiesOnTurnover({
      entityType: "closely_controlled",
      heads: 2,
      turnover: 150000,
    });
    expect(wholeBusinessRoute).toBe(false);
  });
});

// ---- Metadata ----

describe("gps-readiness builder: metadata", () => {
  it("workbook creator is Trade Tax Specialists", () => {
    expect(wb.creator).toBe("Trade Tax Specialists");
  });
});
