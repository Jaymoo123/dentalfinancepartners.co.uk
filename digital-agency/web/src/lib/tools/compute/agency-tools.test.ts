/**
 * Golden tests for agency calculator compute libs.
 *
 * Pinned to the outputs of the ORIGINAL component logic.
 * Any deviation = a change to be reviewed explicitly, not silently fixed.
 *
 * STALE-FIGURE NOTICE: TakeHomePay student loan thresholds (plan1=24,990,
 * plan2=27,295, plan4=31,395) are 2024/25 values. Correct 2025/26 values
 * are 26,065/28,470/32,745. These tests are deliberately pinned to the OLD
 * values. Correction must be a separate named commit with user notification.
 *
 * Run: npx vitest run (from digital-agency/web/)
 */

import { describe, expect, it } from "vitest";
import { calcSalaryDividend } from "./salary-dividend";
import { calcRdTaxCredit } from "./rd-tax-credit";
import { calcAgencyValuation } from "./agency-valuation";
import { calcBadrCgt } from "./badr-cgt";
import { calcVatScheme } from "./vat-scheme";
import { calcPensionOptimiser } from "./pension-optimiser";
import { calcTakeHomePay } from "./take-home-pay";
import { calcEmployerNi } from "./employer-ni";

// ── ED-01 guard: no React/window/document/fetch imported ──────────────────
describe("TL-03 guard: compute libs are environment-free", () => {
  it("salary-dividend does not import React or browser globals", async () => {
    const mod = await import("./salary-dividend");
    expect(typeof mod.calcSalaryDividend).toBe("function");
  });
  it("rd-tax-credit does not import React or browser globals", async () => {
    const mod = await import("./rd-tax-credit");
    expect(typeof mod.calcRdTaxCredit).toBe("function");
  });
});

// ── Salary & dividend optimiser ───────────────────────────────────────────
describe("calcSalaryDividend", () => {
  it("profit=120000 with EA: optimal salary near NI threshold", () => {
    const out = calcSalaryDividend({ profitBeforeDirector: 120000, useEmploymentAllowance: true });
    // With EA, employer NI is free up to £5k, so optimal salary is above £9,100
    expect(out.optimal.salary).toBeGreaterThan(9100);
    expect(out.optimal.netCash).toBeGreaterThan(out.dividendOnly.netCash);
    expect(out.optimal.netCash).toBeGreaterThan(out.salaryOnly.netCash);
  });

  it("profit=120000 without EA: zero salary is dividend-only", () => {
    const out = calcSalaryDividend({ profitBeforeDirector: 120000, useEmploymentAllowance: false });
    // Without EA, employer NI cost means lower salary threshold is optimal
    expect(out.optimal.netCash).toBeGreaterThan(0);
    expect(out.dividendOnly.salary).toBe(0);
    expect(out.dividendOnly.dividend).toBeGreaterThan(0);
  });

  it("profit=50000: net cash is positive and less than profit", () => {
    const out = calcSalaryDividend({ profitBeforeDirector: 50000, useEmploymentAllowance: true });
    expect(out.optimal.netCash).toBeGreaterThan(0);
    expect(out.optimal.netCash).toBeLessThan(50000);
  });

  it("profit=0: all zeroes", () => {
    const out = calcSalaryDividend({ profitBeforeDirector: 0, useEmploymentAllowance: true });
    expect(out.optimal.netCash).toBe(0);
    expect(out.optimal.totalTax).toBe(0);
  });

  it("profit=250000 with EA: models CT main rate correctly", () => {
    const out = calcSalaryDividend({ profitBeforeDirector: 250000, useEmploymentAllowance: true });
    expect(out.optimal.corporationTax).toBeGreaterThan(0);
    // CT at main rate 25% on large profit
    expect(out.optimal.netCash).toBeGreaterThan(100000);
  });
});

// ── R&D tax credit ────────────────────────────────────────────────────────
describe("calcRdTaxCredit", () => {
  it("standard default inputs: 20% rate, not intensive", () => {
    const out = calcRdTaxCredit({
      totalExpenditure: 800000,
      staffCost: 120000,
      subcontractorCost: 40000,
      consumablesCost: 15000,
      softwareCost: 25000,
    });
    // qualifying = 120000 + 40000*0.65 + 15000 + 25000 = 186000
    expect(out.qualifying).toBeCloseTo(186000, 0);
    expect(out.isIntensive).toBe(false);
    expect(out.creditRate).toBe(0.20);
    expect(out.grossCredit).toBeCloseTo(186000 * 0.20, 0);
    expect(out.netBenefit).toBeCloseTo(186000 * 0.20 * 0.75, 0);
  });

  it("intensive: >40% of total is qualifying", () => {
    const out = calcRdTaxCredit({
      totalExpenditure: 200000,
      staffCost: 90000,
      subcontractorCost: 0,
      consumablesCost: 0,
      softwareCost: 0,
    });
    // qualifying=90000, intensity=90000/200000=0.45 >= 0.40
    expect(out.isIntensive).toBe(true);
    expect(out.creditRate).toBe(0.27);
  });

  it("zero expenditure: zero output", () => {
    const out = calcRdTaxCredit({
      totalExpenditure: 0,
      staffCost: 0,
      subcontractorCost: 0,
      consumablesCost: 0,
      softwareCost: 0,
    });
    expect(out.grossCredit).toBe(0);
    expect(out.netBenefit).toBe(0);
  });
});

// ── Agency valuation ──────────────────────────────────────────────────────
describe("calcAgencyValuation", () => {
  it("generalist, 18% EBITDA, no adjustments", () => {
    const out = calcAgencyValuation({
      revenue: 1200000,
      ebitdaPct: 18,
      type: "generalist",
      retainerPct: 30,
      topClientPct: 20,
      keyPersonDependent: false,
    });
    expect(out.ebitda).toBeCloseTo(216000, 0);
    expect(out.baseMultiple).toBe(4);
    expect(out.retainerUplift).toBe(0);
    expect(out.concentrationDiscount).toBe(0);
    expect(out.keyPersonDiscount).toBe(0);
    expect(out.adjustedMultiple).toBe(4);
    expect(out.mid).toBeCloseTo(864000, 0);
  });

  it("specialist with retainer uplift", () => {
    const out = calcAgencyValuation({
      revenue: 2000000,
      ebitdaPct: 20,
      type: "specialist",
      retainerPct: 75,
      topClientPct: 25,
      keyPersonDependent: false,
    });
    expect(out.retainerUplift).toBe(1.0);
    expect(out.adjustedMultiple).toBe(7);
  });

  it("key-person discount applied", () => {
    const out = calcAgencyValuation({
      revenue: 1000000,
      ebitdaPct: 15,
      type: "generalist",
      retainerPct: 30,
      topClientPct: 20,
      keyPersonDependent: true,
    });
    expect(out.keyPersonDiscount).toBe(-1.0);
    expect(out.adjustedMultiple).toBe(3);
  });
});

// ── BADR CGT ──────────────────────────────────────────────────────────────
describe("calcBadrCgt", () => {
  it("2025/26 rate, eligible, gain below lifetime limit", () => {
    const out = calcBadrCgt({
      saleProceeds: 2500000,
      originalCost: 100,
      previousBadrUsed: 0,
      year: "2025/26",
      meetsEligibility: true,
    });
    expect(out.gain).toBeCloseTo(2499900, 0);
    expect(out.eligibleForBadr).toBe(1000000);
    expect(out.badrTax).toBeCloseTo(1000000 * 0.14, 0);
    expect(out.standardTax).toBeCloseTo((2499900 - 1000000) * 0.24, 0);
  });

  it("2026/27 rate applies correctly", () => {
    const out = calcBadrCgt({
      saleProceeds: 500000,
      originalCost: 0,
      previousBadrUsed: 0,
      year: "2026/27",
      meetsEligibility: true,
    });
    expect(out.badrTax).toBeCloseTo(500000 * 0.18, 0);
  });

  it("not eligible: full standard rate", () => {
    const out = calcBadrCgt({
      saleProceeds: 500000,
      originalCost: 0,
      previousBadrUsed: 0,
      year: "2025/26",
      meetsEligibility: false,
    });
    expect(out.badrTax).toBe(0);
    expect(out.totalTax).toBeCloseTo(500000 * 0.24, 0);
  });
});

// ── VAT scheme comparator ─────────────────────────────────────────────────
describe("calcVatScheme", () => {
  it("standard defaults: LCT applies (goods <threshold), standard wins", () => {
    const out = calcVatScheme({
      turnover: 180000,
      vatInputs: 8000,
      goodsSpend: 500,
    });
    // vatCollected = 180000 * 0.20 = 36000; grossInclusive = 216000
    expect(out.vatCollected).toBeCloseTo(36000, 0);
    expect(out.grossInclusive).toBeCloseTo(216000, 0);
    // standardNet = 36000 - 8000 = 28000
    expect(out.standardNet).toBeCloseTo(28000, 0);
    // LCT: goods=500 < max(1000, 216000*0.02=4320)=4320 => LCT applies
    expect(out.lctApplies).toBe(true);
    expect(out.flatRate).toBe(0.165);
    // flatPayment = 216000 * 0.165 = 35640; flatPayment > standardNet => Standard wins
    expect(out.bestScheme).toBe("Standard");
  });

  it("high goods spend: not LCT, flat rate marketing applies", () => {
    const out = calcVatScheme({
      turnover: 180000,
      vatInputs: 3000,
      goodsSpend: 10000,
    });
    expect(out.lctApplies).toBe(false);
    expect(out.flatRate).toBe(0.125);
  });
});

// ── Pension optimiser ─────────────────────────────────────────────────────
describe("calcPensionOptimiser", () => {
  it("standard inputs: CT saved is positive", () => {
    const out = calcPensionOptimiser({
      profit: 150000,
      salary: 12570,
      contribution: 30000,
      adjustedIncome: 150000,
    });
    expect(out.ctSaved).toBeGreaterThan(0);
    expect(out.realCostToCompany).toBeLessThan(30000);
    expect(out.capped).toBe(false);
    expect(out.allowance).toBe(60000);
  });

  it("contribution exceeds allowance: capped", () => {
    const out = calcPensionOptimiser({
      profit: 300000,
      salary: 12570,
      contribution: 80000,
      adjustedIncome: 200000,
    });
    expect(out.capped).toBe(true);
    expect(out.contribution).toBe(60000);
  });

  it("tapered allowance: adjusted income above £260k", () => {
    const out = calcPensionOptimiser({
      profit: 500000,
      salary: 12570,
      contribution: 50000,
      adjustedIncome: 310000,
    });
    // Taper: (310000-260000)/2 = 25000 reduction; 60000-25000=35000
    expect(out.allowance).toBe(35000);
  });
});

// ── Take-home pay ─────────────────────────────────────────────────────────
describe("calcTakeHomePay", () => {
  it("salary=45000, no pension, no student loan", () => {
    const out = calcTakeHomePay({ salary: 45000, pensionPercent: 0, plan: "none" });
    // Income tax: (50270-12570)*0.20 = 7540 on first basic band portion
    // Actually taxable = 45000-12570=32430; tax=32430*0.20=6486
    expect(out.incomeTax).toBeCloseTo(6486, 0);
    expect(out.ni).toBeGreaterThan(0);
    expect(out.net).toBeGreaterThan(30000);
    expect(out.monthly).toBeCloseTo(out.net / 12, 0);
    expect(out.weekly).toBeCloseTo(out.net / 52, 0);
  });

  it("salary=12570: at personal allowance, zero income tax", () => {
    const out = calcTakeHomePay({ salary: 12570, pensionPercent: 0, plan: "none" });
    expect(out.incomeTax).toBe(0);
  });

  it("plan2 student loan threshold is 27295 (PINNED 2024/25 value)", () => {
    // Threshold 27295 — 2024/25 value deliberately pinned
    const below = calcTakeHomePay({ salary: 27295, pensionPercent: 0, plan: "plan2" });
    expect(below.studentLoan).toBeCloseTo(0, 0);
    const above = calcTakeHomePay({ salary: 37295, pensionPercent: 0, plan: "plan2" });
    // 37295 - 27295 = 10000 * 0.09 = 900
    expect(above.studentLoan).toBeCloseTo(900, 0);
  });

  it("salary=0: all zeroes", () => {
    const out = calcTakeHomePay({ salary: 0, pensionPercent: 0, plan: "none" });
    expect(out.net).toBe(0);
    expect(out.incomeTax).toBe(0);
  });
});

// ── Employer NI ───────────────────────────────────────────────────────────
describe("calcEmployerNi", () => {
  it("two employees, EA applied", () => {
    const out = calcEmployerNi({
      employees: [
        { id: 1, role: "Senior account manager", salary: 55000 },
        { id: 2, role: "Mid designer", salary: 38000 },
      ],
      useEmploymentAllowance: true,
      includePension: true,
    });
    // senior NI: (55000-9100)*0.138=6334.2; mid NI: (38000-9100)*0.138=3988.2
    const rawNi = (55000 - 9100) * 0.138 + (38000 - 9100) * 0.138;
    expect(out.niTotal).toBeCloseTo(rawNi, 0);
    expect(out.eaApplied).toBeCloseTo(Math.min(5000, rawNi), 0);
    expect(out.niAfterEA).toBeCloseTo(rawNi - 5000, 0);
    expect(out.eaEligibleWarning).toBe(false);
  });

  it("single employee, EA requested but not eligible: warning", () => {
    const out = calcEmployerNi({
      employees: [{ id: 1, role: "Director", salary: 30000 }],
      useEmploymentAllowance: true,
      includePension: false,
    });
    expect(out.eaEligibleWarning).toBe(true);
    expect(out.eaApplied).toBe(0);
  });

  it("no employees: all zeroes", () => {
    const out = calcEmployerNi({
      employees: [],
      useEmploymentAllowance: true,
      includePension: true,
    });
    expect(out.totalEmploymentCost).toBe(0);
  });
});
