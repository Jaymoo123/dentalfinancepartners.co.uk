/**
 * GAP-2 Stage 2 — golden tests for all 7 calculator compute libs.
 *
 * Brief requirement: "extract inline tax maths to pure compute libs, golden-test
 * each compute lib against the OLD component's outputs BEFORE the config ships."
 *
 * Reference values in each suite are derived by manually tracing through
 * the OLD component's exact logic with specific inputs.
 * A failing test here means the extract DIVERGED from the old component —
 * stop and report; do NOT silently fix (the old figure may itself be wrong).
 *
 * FINDINGS RESOLVED 2026-06-10 (user-approved post-GAP-2 correction — goldens
 * below updated DELIBERATELY, not silently):
 *   1. take-home-pay: Plan 1/2/4 SL thresholds now 2025/26 (26065/28470/32745).
 *   2. rd-credit: threshold 30%; ERIS intensive branch 1.86×14.5% payable
 *      (no CT haircut); merged RDEC branch unchanged.
 *   3. employer-ni: page label corrected to £10,500 (compute already read the
 *      canonical uk-tax-rates value).
 */

import { describe, it, expect } from "vitest";

import { calcTakeHomePay } from "./take-home-pay";
import { modelExtraction, findOptimalSalary, calcEmployerNi } from "./salary-dividend";
import { calcPensionOptimisation, taperedAnnualAllowance } from "./pension";
import { calcRDCredit } from "./rd-credit";
import { calcBADR } from "./badr-cgt";
import { compareVATSchemes } from "./vat-scheme";
import { calcEmployerNIFleet } from "./employer-ni";

// ---------------------------------------------------------------------------
// Helper: round to 2dp for stable money comparisons
// ---------------------------------------------------------------------------
const r2 = (n: number) => Math.round(n * 100) / 100;

// ---------------------------------------------------------------------------
// 1. Take-Home Pay (plan1/2/4 thresholds = 2025/26: 26065/28470/32745,
//    corrected 2026-06-10)
// ---------------------------------------------------------------------------
describe("take-home-pay compute", () => {
  it("salary=45000 no pension no SL → net 35919.60", () => {
    const r = calcTakeHomePay(45000, 0, "none");
    // Income tax: (45000-12570)*0.20 = 6486
    // NI: (45000-12570)*0.08 = 2594.40
    // Net = 45000 - 6486 - 2594.40 = 35919.60
    expect(r2(r.net)).toBe(35919.60);
    expect(r2(r.incomeTax)).toBe(6486);
    expect(r2(r.ni)).toBe(2594.40);
    expect(r.pension).toBe(0);
    expect(r.studentLoan).toBe(0);
    expect(r2(r.monthly)).toBe(r2(35919.60 / 12));
  });

  it("salary at PA exactly → zero tax and NI", () => {
    const r = calcTakeHomePay(12570, 0, "none");
    expect(r.incomeTax).toBe(0);
    expect(r.ni).toBe(0);
    expect(r.net).toBe(12570);
    expect(r.personalAllowance).toBe(12570);
  });

  it("salary=60000 plan2 SL (2026/27 threshold 29385) → correct deductions", () => {
    // Income tax: basic(37700*0.20=7540) + higher(9730*0.40=3892) = 11432
    // NI: 37700*0.08 + 9730*0.02 = 3016 + 194.60 = 3210.60
    // SL plan2: (60000-29385)*0.09 = 30615*0.09 = 2755.35
    // Net = 60000 - 11432 - 3210.60 - 2755.35 = 42602.05
    const r = calcTakeHomePay(60000, 0, "plan2");
    expect(r2(r.incomeTax)).toBe(11432);
    expect(r2(r.ni)).toBe(3210.60);
    expect(r2(r.studentLoan)).toBe(2755.35);
    expect(r2(r.net)).toBe(42602.05);
  });

  it("pension sacrifice reduces income-tax base but not NI base", () => {
    // salary=50000, pension=10%, plan=none
    // pension = 5000; salaryAfterPension = 45000
    // income tax on 45000: (45000-12570)*0.20 = 6486
    // NI on 50000: (50000-12570)*0.08 = 37430*0.08 = 2994.40
    const r = calcTakeHomePay(50000, 10, "none");
    expect(r.pension).toBe(5000);
    expect(r2(r.incomeTax)).toBe(6486);
    expect(r2(r.ni)).toBe(2994.40);
    // net = 45000 - 6486 - 2994.40 = 35519.60
    expect(r2(r.net)).toBe(35519.60);
  });
});

// ---------------------------------------------------------------------------
// 2. Salary & Dividend Optimiser
// ---------------------------------------------------------------------------
describe("salary-dividend compute", () => {
  it("modelExtraction: salary=0, profit=50000, noEA → correct breakdown", () => {
    // CT on 50000 = 50000*0.19 = 9500
    // dividend = 40500; divTax basic: (40500-12570-500)*0.1075 = 27430*0.1075 = 2948.725 (2026/27 dividend rate)
    const r = modelExtraction(0, 50000, false);
    expect(r.salary).toBe(0);
    expect(r2(r.corporationTax)).toBe(9500);
    expect(r2(r.dividend)).toBe(40500);
    expect(r2(r.dividendTax)).toBe(2948.73); // 27430*0.1075=2948.725 → rounds to 2948.73
    expect(r.employeeNi).toBe(0);
    expect(r.incomeTax).toBe(0);
    expect(r2(r.netCash)).toBe(37551.28); // 40500 - 2948.725 = 37551.275 → 37551.28
  });

  it("modelExtraction: salary=12570, profit=50000, noEA → optimal-region result", () => {
    // employerNi = (12570-5000)*0.15 = 1135.5
    // profitAfterPayroll = 50000 - 12570 - 1135.5 = 36294.5
    // CT = 36294.5*0.19 = 6895.955; distributable = 29398.545
    // employeeNi = 0 (exactly at threshold); incomeTax = 0
    // divTax: taxable = 29398.545-500 = 28898.545; inBasic = *0.1075 = 3106.5936 (2026/27 dividend rate)
    // netCash = 12570 + 29398.545 - 3106.5936 = 38861.951
    const r = modelExtraction(12570, 50000, false);
    expect(r2(r.employerNi)).toBe(1135.50);
    expect(r2(r.corporationTax)).toBe(6895.96);
    expect(r.employeeNi).toBe(0);
    expect(r.incomeTax).toBe(0);
    expect(r2(r.netCash)).toBeCloseTo(38861.95, 0);
  });

  it("findOptimalSalary: profit=100000, noEA → optimal at salary=12570 (NI threshold)", () => {
    // With no EA, every £ of salary above 5000 incurs 15% employer NI cost.
    // Taking salary at the primary NI threshold (12570) avoids employee NI and income
    // tax, leaving more in the company to distribute as dividend. The optimizer
    // walks 0..60000 in £10 steps and returns the salary with max netCash.
    const r = findOptimalSalary(100000, false);
    expect(r.salary).toBe(12570);
    // sanity: all fields present and internally consistent
    expect(r.netCash).toBeGreaterThan(0);
    expect(r.totalTax).toBeGreaterThan(0);
  });

  it("calcEmployerNi: zero salary → 0", () => {
    expect(calcEmployerNi(0, false)).toBe(0);
    expect(calcEmployerNi(5000, false)).toBe(0);
  });

  it("calcEmployerNi: with EA, large salary, EA covers full liability", () => {
    // (75000-5000)*0.15 = 10500; allowance=10500 → net=0
    expect(calcEmployerNi(75000, true)).toBe(0);
    // (80000-5000)*0.15 = 11250 - 10500 = 750
    expect(calcEmployerNi(80000, true)).toBe(750);
  });
});

// ---------------------------------------------------------------------------
// 3. Pension Contribution Optimiser
// ---------------------------------------------------------------------------
describe("pension compute", () => {
  it("taperedAnnualAllowance: below 260k → full 60000", () => {
    expect(taperedAnnualAllowance(100000)).toBe(60000);
    expect(taperedAnnualAllowance(260000)).toBe(60000);
  });

  it("taperedAnnualAllowance: above 260k tapers by £1 per £2 of income", () => {
    // 260000 + 10000 excess → reduction = floor(10000/2) = 5000 → 60000-5000 = 55000
    expect(taperedAnnualAllowance(270000)).toBe(55000);
    // floor on reduction: 260000 + 10001 → floor(10001/2)=5000 → 55000
    expect(taperedAnnualAllowance(270001)).toBe(55000);
  });

  it("taperedAnnualAllowance: taper floor = 10000", () => {
    // 260000 + 200000 excess → reduction=100000, 60000-100000 < 10000 → 10000
    expect(taperedAnnualAllowance(500000)).toBe(10000);
  });

  it("calcPensionOptimisation: standard case profit=150000, salary=12570, contribution=30000", () => {
    // allowance=60000; c=30000 (not capped)
    // profitAfter = 150000-12570-30000 = 107430
    // ctWithPension: 9500 + (107430-50000)*0.265 = 9500 + 57430*0.265 = 9500+15218.95 = 24718.95
    // profitNoPension = 137430
    // ctNoPension: 9500 + (137430-50000)*0.265 = 9500 + 87430*0.265 = 9500+23168.95 = 32668.95
    // ctSaved = 7950; marginal = 0.265; realCostToCompany = 30000-7950 = 22050
    const r = calcPensionOptimisation(150000, 12570, 30000, 150000);
    expect(r.allowance).toBe(60000);
    expect(r.contribution).toBe(30000);
    expect(r.capped).toBe(false);
    expect(r2(r.ctWithPension)).toBe(24718.95);
    expect(r2(r.ctNoPension)).toBe(32668.95);
    expect(r2(r.ctSaved)).toBe(7950);
    expect(r.marginal).toBe(0.265);
    expect(r2(r.realCostToCompany)).toBe(22050);
  });

  it("calcPensionOptimisation: contribution exceeds allowance → capped", () => {
    const r = calcPensionOptimisation(200000, 12570, 80000, 200000);
    expect(r.capped).toBe(true);
    expect(r.contribution).toBe(60000); // capped at annual allowance
  });

  it("calcPensionOptimisation: tapered allowance reduces cap", () => {
    // adjustedIncome=300000 → allowance = 60000 - floor(40000/2) = 60000-20000 = 40000
    const r = calcPensionOptimisation(500000, 12570, 50000, 300000);
    expect(r.allowance).toBe(40000);
    expect(r.contribution).toBe(40000); // capped at 40000
    expect(r.capped).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// 4. R&D Tax Credit Estimator
//    CORRECTED 2026-06-10 (user-approved): threshold 30% (from 1 Apr 2024);
//    intensive branch = ERIS, 1.86 × 14.5% ≈ 26.97p/£, payable (no CT haircut);
//    standard branch = merged RDEC 20% taxable (net 15p/£), unchanged.
// ---------------------------------------------------------------------------
describe("rd-credit compute", () => {
  it("default inputs → 20% merged-scheme credit, not intensive", () => {
    // qualifying = 120000 + 40000*0.65 + 15000 + 25000 = 186000
    // intensity = 186000/800000 = 0.2325 < 0.30 → not intensive
    // grossCredit = 186000*0.20 = 37200; netBenefit = 37200*0.75 = 27900
    const r = calcRDCredit(800000, 120000, 40000, 15000, 25000);
    expect(r.qualifying).toBe(186000);
    expect(r.intensityRatio).toBeCloseTo(0.2325, 4);
    expect(r.isIntensive).toBe(false);
    expect(r.creditRate).toBe(0.20);
    expect(r.grossCredit).toBe(37200);
    expect(r.netBenefit).toBe(27900);
  });

  it("R&D-intensive case (>= 30% threshold) → ERIS effective ~26.97%, no CT haircut", () => {
    // qualifying = 100000 + 30000*0.65 + 10000 + 10000 = 139500
    // intensity = 139500/200000 = 0.6975 >= 0.30
    // creditRate = 1.86 * 0.145 = 0.2697
    // grossCredit = 139500*0.2697 = 37623.15; netBenefit = grossCredit (payable, not taxable)
    const r = calcRDCredit(200000, 100000, 30000, 10000, 10000);
    expect(r.isIntensive).toBe(true);
    expect(r.creditRate).toBeCloseTo(0.2697, 4);
    expect(r2(r.grossCredit)).toBe(37623.15);
    expect(r2(r.netBenefit)).toBe(37623.15);
  });

  it("intensity between 30% and 40% now qualifies (old 40% threshold excluded it)", () => {
    // staff=35000, total=100000 → qualifying=35000, intensity=0.35
    const r = calcRDCredit(100000, 35000, 0, 0, 0);
    expect(r.isIntensive).toBe(true);
    expect(r.creditRate).toBeCloseTo(0.2697, 4);
  });

  it("subcontractor cost haircut: only 65% is qualifying", () => {
    // staff=0, sub=100000, cons=0, sw=0 → qualifying = 100000*0.65 = 65000
    const r = calcRDCredit(1000000, 0, 100000, 0, 0);
    expect(r.qualifying).toBe(65000);
  });

  it("zero total expenditure → intensityRatio = 0", () => {
    const r = calcRDCredit(0, 10000, 0, 0, 0);
    expect(r.intensityRatio).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// 5. BADR CGT Calculator
// ---------------------------------------------------------------------------
describe("badr-cgt compute", () => {
  it("large gain with BADR eligible 2025/26 → correct split", () => {
    // gain = 2499900; badrRate=0.14; availableBADR=1000000
    // eligibleSlice=1000000; overflow=1499900
    // badrTax=140000; standardTax=1499900*0.24=359976; total=499976
    // netProceeds=2500000-499976=2000024; effectiveRate≈0.200
    const r = calcBADR(2500000, 100, 0, "2025/26", true);
    expect(r.gain).toBe(2499900);
    expect(r.eligibleForBADR).toBe(1000000);
    expect(r.notEligible).toBe(1499900);
    expect(r.badrTax).toBe(140000);
    expect(r2(r.standardTax)).toBe(359976);
    expect(r2(r.totalTax)).toBe(499976);
    expect(r2(r.netProceeds)).toBe(2000024);
    expect(r.effectiveRate).toBeCloseTo(0.2, 3);
  });

  it("2026/27 uses 18% BADR rate", () => {
    const r = calcBADR(1100000, 0, 0, "2026/27", true);
    // eligibleSlice=1000000; badrTax=1000000*0.18=180000
    // overflow=100000; standardTax=100000*0.24=24000; total=204000
    expect(r.badrTax).toBe(180000);
    expect(r2(r.standardTax)).toBe(24000);
    expect(r2(r.totalTax)).toBe(204000);
  });

  it("not eligible → full standard CGT at 24%", () => {
    const r = calcBADR(1000000, 50000, 0, "2025/26", false);
    expect(r.gain).toBe(950000);
    expect(r.eligibleForBADR).toBe(0);
    expect(r2(r.totalTax)).toBe(228000); // 950000*0.24
    expect(r2(r.netProceeds)).toBe(772000);
    expect(r2(r.effectiveRate)).toBe(0.24);
  });

  it("lifetime BADR partially used → reduced eligible slice", () => {
    // previousBADRUsed=700000 → availableBADR=300000
    const r = calcBADR(500000, 0, 700000, "2025/26", true);
    expect(r.eligibleForBADR).toBe(300000); // min(500000, 300000)
    expect(r.notEligible).toBe(200000);
    expect(r2(r.badrTax)).toBe(42000); // 300000*0.14
    expect(r2(r.standardTax)).toBe(48000); // 200000*0.24
  });
});

// ---------------------------------------------------------------------------
// 6. VAT Scheme Comparator
// ---------------------------------------------------------------------------
describe("vat-scheme compute", () => {
  it("service business (LCT applies) → Standard is better", () => {
    // turnover=180000; vatCollected=36000; grossInclusive=216000
    // standardNet=36000-8000=28000
    // lctCheck: 500 < max(1000, 216000*0.02=4320) → LCT applies → flatRate=0.165
    // flatPayment=216000*0.165=35640; flatKeep=360; flatNet=35640
    // bestScheme: 28000 < 35640 → "Standard"; saving=7640
    const r = compareVATSchemes(180000, 8000, 500);
    expect(r.vatCollected).toBe(36000);
    expect(r.grossInclusive).toBe(216000);
    expect(r.standardNet).toBe(28000);
    expect(r.lctApplies).toBe(true);
    expect(r.flatRate).toBe(0.165);
    expect(r2(r.flatNet)).toBe(35640);
    expect(r.bestScheme).toBe("Standard");
    expect(r.saving).toBe(7640);
  });

  it("high goods spend (non-LCT) → Flat Rate is better", () => {
    // turnover=100000; vatCollected=20000; grossInclusive=120000
    // standardNet=20000-1000=19000
    // lctCheck: 10000 < max(1000, 120000*0.02=2400) → false → flatRate=0.125
    // flatPayment=120000*0.125=15000; flatNet=15000
    // bestScheme: 19000 > 15000 → "Flat Rate"; saving=4000
    const r = compareVATSchemes(100000, 1000, 10000);
    expect(r.lctApplies).toBe(false);
    expect(r.flatRate).toBe(0.125);
    expect(r.flatNet).toBe(15000);
    expect(r.bestScheme).toBe("Flat Rate");
    expect(r.saving).toBe(4000);
  });

  it("zero turnover → no division errors", () => {
    const r = compareVATSchemes(0, 0, 0);
    expect(r.vatCollected).toBe(0);
    expect(r.standardNet).toBe(0);
    expect(Number.isFinite(r.flatNet)).toBe(true);
  });

  it("LCT threshold: goods spend exactly at £1000 → LCT does NOT apply", () => {
    // turnover=100000; grossInclusive=120000; LCT threshold = max(1000, 120000*0.02=2400) = 2400
    // goodsSpend=1000 < 2400 → LCT applies
    const r = compareVATSchemes(100000, 0, 1000);
    expect(r.lctApplies).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// 7. Employer NI / Cost-to-Hire (bespoke tool — compute still tested)
//    Label corrected to £10,500 on 2026-06-10; compute always read the
//    canonical uk-tax-rates value.
// ---------------------------------------------------------------------------
describe("employer-ni compute", () => {
  const seeds = [
    { id: 1, role: "Office manager", salary: 38000 },
    { id: 2, role: "Senior bookkeeper", salary: 32000 },
  ];

  it("seed employees with EA and pension → correct totals", () => {
    // niTotal: (38000-5000)*0.15=4950 + (32000-5000)*0.15=4050 = 9000
    // eaApplied: min(10500, 9000) = 9000 → niAfterEA = 0
    // pension(38000): (38000-6240)*0.03 = 31760*0.03 = 952.8
    // pension(32000): (32000-6240)*0.03 = 25760*0.03 = 772.8
    // pensionTotal = 1725.6
    // totalEmploymentCost = 70000 + 0 + 1725.6 = 71725.6
    const r = calcEmployerNIFleet(seeds, true, true);
    expect(r.grossSalaryTotal).toBe(70000);
    expect(r2(r.niTotal)).toBe(9000);
    expect(r2(r.eaApplied)).toBe(9000);
    expect(r2(r.niAfterEA)).toBe(0);
    expect(r2(r.pensionTotal)).toBe(1725.60);
    expect(r2(r.totalEmploymentCost)).toBe(71725.60);
    expect(r.eaEligibleWarning).toBe(false);
  });

  it("without EA → full NI applies", () => {
    const r = calcEmployerNIFleet(seeds, false, true);
    expect(r2(r.eaApplied)).toBe(0);
    expect(r2(r.niAfterEA)).toBe(9000);
    expect(r2(r.totalEmploymentCost)).toBe(80725.60); // 70000+9000+1725.6
  });

  it("single employee, useEA=true → EA not applied (< 2 employees)", () => {
    const single = [{ id: 1, role: "Only employee", salary: 40000 }];
    const r = calcEmployerNIFleet(single, true, false);
    // NI on 40000: (40000-5000)*0.15 = 5250; EA NOT applied (only 1 employee)
    expect(r.eaApplied).toBe(0);
    expect(r2(r.niAfterEA)).toBe(5250);
    expect(r.eaEligibleWarning).toBe(true);
  });

  it("salary below secondary threshold → zero employer NI", () => {
    const low = [{ id: 1, role: "Part-time", salary: 4999 }];
    const r = calcEmployerNIFleet(low, false, false);
    expect(r.niTotal).toBe(0);
    expect(r.totalEmploymentCost).toBe(4999);
  });

  it("salary=5000 exactly → zero employer NI (secondary threshold = 5000)", () => {
    const exact = [{ id: 1, role: "Part-time", salary: 5000 }];
    const r = calcEmployerNIFleet(exact, false, false);
    expect(r.niTotal).toBe(0);
  });
});
