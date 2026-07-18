/**
 * Task 2: Golden tests for the construction-cis premium tool fleet.
 *
 * All figures derived by EXECUTING the compute functions (via cis-tax.ts helpers)
 * in Node (2026-07-05), not hand-traced. Each test has a conservation check
 * where the maths allows. No typeof-only assertions: every number is pinned exactly.
 *
 * HP traces:
 *   CIS deduction rates 0%/20%/30% on labour-only base  - HP §1
 *   PA £12,570, basic 20%, higher 40%                   - HP §11a
 *   Class 4 NI 6%/2% on CIS profit                     - HP §11a
 *   Employee Class 1 NI 8%/2%                          - HP §11a
 *   GPS three-test rule + £30k/£100k thresholds         - HP §2
 *   April 2026 anti-fraud regime                        - HP §3
 *
 * Run:
 *   npx vitest run --config packages/web-shared/vitest.config.ts \
 *     construction-cis/web/src/lib/calculators/premium/premium-tools.test.ts
 */

import { describe, it, expect } from "vitest";
import {
  cisDeduction,
  saLiability,
  class1EmployeeNi,
  gpsQualifiesOnTurnover,
  PERSONAL_ALLOWANCE,
  BASIC_RATE_LIMIT,
  INCOME_TAX_RATES,
  CLASS4_NI,
  CLASS1_NI,
  GPS_PER_HEAD,
  GPS_WHOLE_BUSINESS_CAP,
} from "../cis-tax";
import { incomeTaxOn, taperedPersonalAllowance } from "../cis-tax";
import { cisRefundPlannerConfig } from "./configs/cis-refund-planner";
import { cisVsPayeConfig } from "./configs/cis-vs-paye";
import { cisGpsReadinessConfig } from "./configs/cis-gps-readiness";

// ---------------------------------------------------------------------------
// Tool 1: cis-refund-planner-premium
// ---------------------------------------------------------------------------

describe("Tool 1 - cis-refund-planner-premium", () => {
  it("TC1: default inputs (grossIncome=45000, materials=5000, registered, expenses=4000, otherIncome=0)", () => {
    // cisDeduction: deductionBase = 45000-5000=40000; cisDeducted = 40000*0.20=8000
    // profit = max(0, 40000-4000) = 36000
    // saLiability({profit:36000, otherIncome:0}):
    //   taxable = max(0, 36000-12570) = 23430
    //   incomeTax = 23430*0.20 = 4686
    //   class4Lower = min(23430,37700)*0.06 = 23430*0.06 = 1405.8
    //   class4Upper = 0
    //   class4Ni = 1405.8; total = 4686+1405.8 = 6091.8
    // refund = 8000-6091.8 = 1908.2 -> gbp = "£1,908"
    // Conservation: cisDeducted - totalLiability = refund -> 8000 - 6091.8 = 1908.2
    const { deductionBase, cisDeducted } = cisDeduction({ gross: 45000, materials: 5000, rate: 0.20 });
    const profit = Math.max(0, deductionBase - 4000);
    const { incomeTax, class4Ni, total: totalLiability } = saLiability({ profit, otherIncome: 0 });

    expect(deductionBase).toBe(40000);
    expect(cisDeducted).toBe(8000);
    expect(profit).toBe(36000);
    expect(incomeTax).toBeCloseTo(4686, 2);
    expect(class4Ni).toBeCloseTo(1405.8, 2);
    expect(totalLiability).toBeCloseTo(6091.8, 2);
    // Conservation: cisDeducted - totalLiability = refund
    expect(cisDeducted - totalLiability).toBeCloseTo(1908.2, 1);

    // Config compute golden
    const result = cisRefundPlannerConfig.compute({
      values: {
        grossIncome: 45000,
        materialsInvoiced: 5000,
        status: "registered",
        expenses: 4000,
        otherIncome: 0,
        reclaimRoute: "sole-trader",
      },
      rows: [],
    });
    expect(result.headline.label).toBe("Estimated CIS refund");
    expect(result.headline.value).toBe("£1,908");
    expect(result.headline.tone).toBe("good");
    expect(result.headline.sub).toContain("£8,000");
    expect(result.headline.sub).toContain("£6,092");
    // Breakdown rows - no NaN
    for (const row of result.breakdown ?? []) {
      expect(row.value).not.toContain("NaN");
    }
    // Chart data present
    expect(result.chart?.data).toHaveLength(1);
    const chartDatum = result.chart?.data[0];
    expect(Number(chartDatum?.cisDeducted)).toBeCloseTo(8000, 1);
    expect(Number(chartDatum?.actualTax)).toBeCloseTo(6091.8, 1);
  });

  it("TC2: unregistered rate 30% (grossIncome=45000, materials=5000, expenses=4000)", () => {
    // deductionBase=40000; cisDeducted=40000*0.30=12000
    // profit=36000; totalLiability=6091.8 (same)
    // refund=12000-6091.8=5908.2 -> "£5,908"
    const { cisDeducted } = cisDeduction({ gross: 45000, materials: 5000, rate: 0.30 });
    expect(cisDeducted).toBe(12000);

    const result = cisRefundPlannerConfig.compute({
      values: {
        grossIncome: 45000,
        materialsInvoiced: 5000,
        status: "unregistered",
        expenses: 4000,
        otherIncome: 0,
        reclaimRoute: "sole-trader",
      },
      rows: [],
    });
    expect(result.headline.value).toBe("£5,908");
    expect(result.headline.label).toBe("Estimated CIS refund");
  });

  it("TC3: owe case (low deductions, high other income) - headline 'Estimated tax to pay'", () => {
    // grossIncome=20000, materials=0, rate=20, expenses=0, otherIncome=40000
    // deductionBase=20000; cisDeducted=4000
    // profit=20000; totalIncome=20000+40000=60000
    // taxable=60000-12570=47430
    // incomeTax=37700*0.20 + (47430-37700)*0.40 = 7540 + 9730*0.40 = 7540+3892 = 11432
    // class4Lower=min(7430,37700)*0.06=7430*0.06=445.8 (profit=20000, 20000-12570=7430)
    // class4Upper=0; class4Ni=445.8; totalLiability=11432+445.8=11877.8
    // refund=4000-11877.8=-7877.8 -> owe case -> "£7,878" (round abs)
    const result = cisRefundPlannerConfig.compute({
      values: {
        grossIncome: 20000,
        materialsInvoiced: 0,
        status: "registered",
        expenses: 0,
        otherIncome: 40000,
        reclaimRoute: "sole-trader",
      },
      rows: [],
    });
    expect(result.headline.label).toBe("Estimated tax to pay");
    expect(result.headline.tone).toBe("warn");
    expect(result.headline.value).toBe("£7,878");
  });
});

// ---------------------------------------------------------------------------
// Tool 2: cis-vs-paye-premium
// ---------------------------------------------------------------------------

describe("Tool 2 - cis-vs-paye-premium", () => {
  it("TC1: default inputs (grossEarnings=45000, cisExpenses=5000, cisRate=20)", () => {
    // CIS PATH:
    // cisProfit = max(0, 45000-5000) = 40000
    // saLiability({profit:40000, otherIncome:0}):
    //   taxable = max(0,40000-12570) = 27430
    //   incomeTax = 27430*0.20 = 5486
    //   class4Lower = min(27430,37700)*0.06 = 27430*0.06 = 1645.8
    //   class4Ni = 1645.8; total = 5486+1645.8 = 7131.8
    // cisTakeHome = 45000-5000-7131.8 = 32868.2 -> "£32,868"
    //
    // PAYE PATH:
    // payeTaxable = max(0,45000-12570) = 32430
    // payeIncomeTax = min(32430,37700)*0.20 = 32430*0.20 = 6486
    // class1EmployeeNi(45000):
    //   lower = min(45000-12570,37700)*0.08 = min(32430,37700)*0.08 = 32430*0.08 = 2594.4
    //   upper = 0
    //   payeNi = 2594.4
    // payeTakeHome = 45000-6486-2594.4 = 35919.6 -> "£35,920"
    //
    // takeHomeDiff = 32868.2-35919.6 = -3051.4 -> PAYE advantage -> "£3,051"
    //
    // Conservation: cisTakeHome + cisTotalTax + cisExpenses = gross
    //   32868.2 + 7131.8 + 5000 = 45000. Pass.
    // Conservation: payeTakeHome + payeTotalTax = gross
    //   35919.6 + (6486+2594.4) = 35919.6 + 9080.4 = 45000. Pass.

    const cisLiability = saLiability({ profit: 40000, otherIncome: 0 });
    const cisTakeHome = 45000 - 5000 - cisLiability.total;
    const payeNi = class1EmployeeNi(45000);
    const payeTaxable = Math.max(0, 45000 - PERSONAL_ALLOWANCE);
    const payeIncomeTax = Math.min(payeTaxable, BASIC_RATE_LIMIT) * INCOME_TAX_RATES.basic;
    const payeTakeHome = 45000 - payeIncomeTax - payeNi;

    expect(cisLiability.incomeTax).toBeCloseTo(5486, 2);
    expect(cisLiability.class4Ni).toBeCloseTo(1645.8, 2);
    expect(cisTakeHome).toBeCloseTo(32868.2, 1);
    // Conservation CIS: takeHome + tax + expenses = gross
    expect(cisTakeHome + cisLiability.total + 5000).toBeCloseTo(45000, 1);

    expect(payeNi).toBeCloseTo(2594.4, 2);
    expect(payeIncomeTax).toBeCloseTo(6486, 2);
    expect(payeTakeHome).toBeCloseTo(35919.6, 1);
    // Conservation PAYE: takeHome + total tax = gross
    expect(payeTakeHome + payeIncomeTax + payeNi).toBeCloseTo(45000, 1);

    // Verify PAYE uses Class 1 (8%), not Class 4 (6%) - regression guard
    expect(CLASS1_NI.main).toBe(0.08);
    expect(CLASS4_NI.main).toBe(0.06);
    expect(CLASS1_NI.main).not.toBe(CLASS4_NI.main);

    // Config compute golden
    const result = cisVsPayeConfig.compute({
      values: { grossEarnings: 45000, cisExpenses: 5000, cisRate: "20" },
      rows: [],
    });
    expect(result.headline.label).toBe("PAYE take-home advantage");
    expect(result.headline.value).toBe("£3,051");
    expect(result.headline.sub).toContain("£32,868");
    expect(result.headline.sub).toContain("£35,920");
    // Two scenarios
    expect(result.scenarioResults).toHaveLength(2);
    const cisScenario = result.scenarioResults?.find((s) => s.id === "cis");
    const payeScenario = result.scenarioResults?.find((s) => s.id === "paye");
    expect(cisScenario?.headline.value).toBe("£32,868");
    expect(payeScenario?.headline.value).toBe("£35,920");
    expect(payeScenario?.best).toBe(true);
    expect(cisScenario?.best).toBe(false);
    // PAYE NI row exists and is Class 1 (not Class 4)
    const payeNiRow = payeScenario?.rows?.find((r) => r.label.includes("NI"));
    expect(payeNiRow?.label).toContain("Class 1");
    // NaN guard
    for (const s of result.scenarioResults ?? []) {
      for (const row of s.rows ?? []) {
        expect(row.value).not.toContain("NaN");
      }
    }
  });

  it("TC2: high expenses cisExpenses=25000, gross=45000 - CIS take-home may change", () => {
    // cisProfit = 20000; saLiability({profit:20000}):
    //   taxable = 20000-12570 = 7430
    //   incomeTax = 7430*0.20 = 1486
    //   class4Lower = 7430*0.06 = 445.8
    //   total = 1931.8
    // cisTakeHome = 45000-25000-1931.8 = 18068.2
    // diff = 18068.2-35919.6 = -17851.4 -> PAYE wins
    const result = cisVsPayeConfig.compute({
      values: { grossEarnings: 45000, cisExpenses: 25000, cisRate: "20" },
      rows: [],
    });
    expect(result.headline.label).toBe("PAYE take-home advantage");
    // No NaN
    for (const s of result.scenarioResults ?? []) {
      for (const row of s.rows ?? []) {
        expect(row.value).not.toContain("NaN");
      }
    }
  });

  it("TC3: GPS rate, no expenses (cisRate=0, cisExpenses=0) - CIS wins on tax basis", () => {
    // cisProfit=45000; taxable=45000-12570=32430
    // incomeTax=32430*0.20=6486
    // class4Lower=32430*0.06=1945.8; total=8431.8
    // cisTakeHome=45000-0-8431.8=36568.2
    // payeTakeHome=35919.6
    // diff=36568.2-35919.6=648.6 -> CIS advantage
    const result = cisVsPayeConfig.compute({
      values: { grossEarnings: 45000, cisExpenses: 0, cisRate: "0" },
      rows: [],
    });
    expect(result.headline.label).toBe("CIS take-home advantage");
    // Chart data present
    expect(result.chart?.data).toHaveLength(2);
  });
});

// ---------------------------------------------------------------------------
// Tool 3: cis-gps-readiness-premium (CORRECTED HP §2 rule)
// ---------------------------------------------------------------------------

describe("Tool 3 - cis-gps-readiness-premium (corrected HP §2 rule)", () => {
  it("TC1: sole trader, turnover=35000 - passes per-head route (threshold=30000)", () => {
    // gpsQualifiesOnTurnover: entityType=sole_trader, heads=1, turnover=35000
    // perHeadThreshold=30000; 35000>=30000 -> passes=true
    const result = gpsQualifiesOnTurnover({ entityType: "sole_trader", heads: 1, turnover: 35000 });
    expect(result.passes).toBe(true);
    expect(result.perHeadThreshold).toBe(30000);
    expect(result.wholeBusinessRoute).toBe(false);

    // Annual gain = 35000 * 0.20 = 7000
    const config = cisGpsReadinessConfig.compute({
      values: { entityType: "sole_trader", annualTurnover: 35000, heads: 1, filedOnTime: true, noOverdueTax: true },
      rows: [],
    });
    expect(config.headline.value).toBe("Likely eligible");
    expect(config.headline.tone).toBe("good");
    // Annual gain in breakdown
    const gainRow = config.breakdown?.find((r) => r.label.includes("annual cash-flow"));
    expect(gainRow?.value).toBe("£7,000");
    // No NaN
    for (const row of config.breakdown ?? []) {
      expect(row.value).not.toContain("NaN");
    }
  });

  it("TC2: sole trader, turnover=25000 - below threshold (30000), fails", () => {
    const result = gpsQualifiesOnTurnover({ entityType: "sole_trader", heads: 1, turnover: 25000 });
    expect(result.passes).toBe(false);

    const config = cisGpsReadinessConfig.compute({
      values: { entityType: "sole_trader", annualTurnover: 25000, heads: 1, filedOnTime: true, noOverdueTax: true },
      rows: [],
    });
    expect(config.headline.value).toContain("not met");
    expect(config.headline.tone).toBe("warn");
  });

  it("TC3 (KEY GPS DEFECT FIX): partnership, 3 partners, turnover=95000 - passes per-head route (90000)", () => {
    // Correct rule: perHeadThreshold = 30000*3=90000; 95000>=90000 -> passes
    // Fleet also passes this case (95000>=90000) - both agree here
    const result = gpsQualifiesOnTurnover({ entityType: "partnership", heads: 3, turnover: 95000 });
    expect(result.passes).toBe(true);
    expect(result.perHeadThreshold).toBe(90000);
    expect(result.wholeBusinessRoute).toBe(false); // per-head route is sufficient
  });

  it("TC4 (CRITICAL DELTA): partnership, 5 partners, turnover=120000 - PASSES whole-business route (fleet FAILS)", () => {
    // CAPLESS fleet: threshold = 30000*5=150000; 120000<150000 -> FAIL
    // CORRECT HP §2: perHeadThreshold=150000 (fails per-head); 120000>=100000 whole-business -> PASS
    // Delta: fleet FAILS, this scorer PASSES (HP §2 correct rule)
    const result = gpsQualifiesOnTurnover({ entityType: "partnership", heads: 5, turnover: 120000 });
    expect(result.passes).toBe(true);
    expect(result.wholeBusinessRoute).toBe(true);
    expect(result.perHeadThreshold).toBe(GPS_PER_HEAD * 5); // 150000

    // Config golden: passes
    const config = cisGpsReadinessConfig.compute({
      values: { entityType: "partnership", annualTurnover: 120000, heads: 5, filedOnTime: true, noOverdueTax: true },
      rows: [],
    });
    expect(config.headline.value).toBe("Likely eligible");
    expect(config.headline.tone).toBe("good");
    // Annual gain = 120000 * 0.20 = 24000
    const gainRow = config.breakdown?.find((r) => r.label.includes("annual cash-flow"));
    expect(gainRow?.value).toBe("£24,000");
  });

  it("TC5: partnership, 5 partners, turnover=95000 - FAILS both routes (perHead=150000, wholeBusiness=100000)", () => {
    // perHeadThreshold=150000; 95000<150000 (fails per-head)
    // 95000<100000 (fails whole-business)
    // -> FAILS (both routes)
    const result = gpsQualifiesOnTurnover({ entityType: "partnership", heads: 5, turnover: 95000 });
    expect(result.passes).toBe(false);
  });

  it("TC6: boundaries at exact whole-business cap = 100000 (partnership, 5 partners)", () => {
    // Exactly at the cap: 100000 >= 100000 whole-business -> PASSES
    const result = gpsQualifiesOnTurnover({ entityType: "partnership", heads: 5, turnover: 100000 });
    expect(result.passes).toBe(true);
    expect(result.wholeBusinessRoute).toBe(true);

    // Just below: 99999 < 100000 AND < 150000 -> FAILS
    const below = gpsQualifiesOnTurnover({ entityType: "partnership", heads: 5, turnover: 99999 });
    expect(below.passes).toBe(false);
  });

  it("TC7: GPS_PER_HEAD and GPS_WHOLE_BUSINESS_CAP constants are correct (HP §2)", () => {
    expect(GPS_PER_HEAD).toBe(30000);
    expect(GPS_WHOLE_BUSINESS_CAP).toBe(100000);
  });

  it("TC8: compliance failure overrides turnover pass", () => {
    const config = cisGpsReadinessConfig.compute({
      values: { entityType: "sole_trader", annualTurnover: 50000, heads: 1, filedOnTime: false, noOverdueTax: true },
      rows: [],
    });
    expect(config.headline.value).not.toBe("Likely eligible");
    expect(config.headline.tone).toBe("warn");
  });

  it("TC9: annual gain = turnover * 0.20 (HP §1)", () => {
    // For turnover=35000: gain=7000
    const config35 = cisGpsReadinessConfig.compute({
      values: { entityType: "sole_trader", annualTurnover: 35000, heads: 1, filedOnTime: true, noOverdueTax: true },
      rows: [],
    });
    const gainRow35 = config35.breakdown?.find((r) => r.label.includes("annual cash-flow"));
    expect(gainRow35?.value).toBe("£7,000");

    // For turnover=100000: gain=20000
    const config100 = cisGpsReadinessConfig.compute({
      values: { entityType: "sole_trader", annualTurnover: 100000, heads: 1, filedOnTime: true, noOverdueTax: true },
      rows: [],
    });
    const gainRow100 = config100.breakdown?.find((r) => r.label.includes("annual cash-flow"));
    expect(gainRow100?.value).toBe("£20,000");
  });
});

// ---------------------------------------------------------------------------
// Registry: hasPremiumTool and getPremiumTool
// ---------------------------------------------------------------------------

describe("Premium registry", () => {
  it("hasPremiumTool returns true for all 3 registered toolIds and false for unknown", async () => {
    const { hasPremiumTool } = await import("./registry");
    expect(hasPremiumTool("cis-refund-planner-premium")).toBe(true);
    expect(hasPremiumTool("cis-vs-paye-premium")).toBe(true);
    expect(hasPremiumTool("cis-gps-readiness-premium")).toBe(true);
    expect(hasPremiumTool("unknown-tool")).toBe(false);
    expect(hasPremiumTool("")).toBe(false);
  });

  it("getPremiumTool returns config for known toolId, undefined for unknown", async () => {
    const { getPremiumTool } = await import("./registry");
    expect(getPremiumTool("cis-refund-planner-premium")?.id).toBe("cis-refund-planner-premium");
    expect(getPremiumTool("cis-vs-paye-premium")?.id).toBe("cis-vs-paye-premium");
    expect(getPremiumTool("cis-gps-readiness-premium")?.id).toBe("cis-gps-readiness-premium");
    expect(getPremiumTool("nonexistent")).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// resources.ts topic spine
// ---------------------------------------------------------------------------

describe("resources.ts topic spine", () => {
  it("all 6 TopicKeys are present, empty-string topics resolve correctly", async () => {
    const { TOPIC_RESOURCES, resourceForTopic } = await import("./resources");
    expect(TOPIC_RESOURCES["cis-refund"].toolId).toBe("cis-refund-planner-premium");
    expect(TOPIC_RESOURCES["cis-deductions"].toolId).toBe("cis-refund-planner-premium");
    expect(TOPIC_RESOURCES["gross-payment-status"].toolId).toBe("cis-gps-readiness-premium");
    expect(TOPIC_RESOURCES["limited-company"].toolId).toBe("cis-vs-paye-premium");
    expect(TOPIC_RESOURCES["self-assessment"].toolId).toBe("");
    expect(TOPIC_RESOURCES["vat-reverse-charge"].toolId).toBe("");
    // Null / undefined safety
    expect(resourceForTopic(null)).toBeNull();
    expect(resourceForTopic(undefined)).toBeNull();
    // Empty-string toolId should not have a premium tool
    const { hasPremiumTool } = await import("./registry");
    expect(hasPremiumTool("")).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Compliance: no em-dashes, no "DJH" in any authored string
// ---------------------------------------------------------------------------

describe("Copy compliance: no em-dashes, no DJH in any tool string", () => {
  const configs = [cisRefundPlannerConfig, cisVsPayeConfig, cisGpsReadinessConfig];

  for (const cfg of configs) {
    it(`${cfg.id}: no em-dashes in title, intro, explainer, field labels/help`, () => {
      const strings = [
        cfg.title,
        cfg.intro,
        cfg.explainer.heading,
        ...cfg.explainer.paragraphs,
        ...cfg.fields.map((f) => [f.label, f.help ?? ""].join(" ")),
      ];
      for (const s of strings) {
        expect(s).not.toContain("—"); // em-dash U+2014
        expect(s).not.toContain(" -- ");  // double-dash substitute
      }
    });

    it(`${cfg.id}: no "DJH" in any authored string`, () => {
      const allText = [
        cfg.title,
        cfg.intro,
        ...cfg.explainer.paragraphs,
        cfg.explainer.heading,
        ...cfg.fields.map((f) => f.label + (f.help ?? "")),
      ].join(" ");
      expect(allText).not.toContain("DJH");
    });
  }
});

// ---------------------------------------------------------------------------
// Conservation invariants at default inputs (NaN guard)
// ---------------------------------------------------------------------------

describe("Conservation invariants: default inputs, no NaN", () => {
  it("Tool 1 default: no NaN in breakdown, headline is a currency string", () => {
    const result = cisRefundPlannerConfig.compute({
      values: {
        grossIncome: 45000,
        materialsInvoiced: 5000,
        status: "registered",
        expenses: 4000,
        otherIncome: 0,
        reclaimRoute: "sole-trader",
      },
      rows: [],
    });
    expect(result.headline.value).toMatch(/^£[\d,]+$/);
    for (const row of result.breakdown ?? []) {
      expect(row.value).not.toContain("NaN");
    }
  });

  it("Tool 2 default: no NaN, two scenarios present", () => {
    const result = cisVsPayeConfig.compute({
      values: { grossEarnings: 45000, cisExpenses: 5000, cisRate: "20" },
      rows: [],
    });
    expect(result.scenarioResults).toHaveLength(2);
    for (const s of result.scenarioResults ?? []) {
      for (const row of s.rows ?? []) {
        expect(row.value).not.toContain("NaN");
      }
    }
  });

  it("Tool 3 default: no NaN, breakdown has 5 rows, annual gain row present", () => {
    const result = cisGpsReadinessConfig.compute({
      values: { entityType: "sole_trader", annualTurnover: 35000, heads: 1, filedOnTime: true, noOverdueTax: true },
      rows: [],
    });
    expect(result.breakdown).toHaveLength(5);
    for (const row of result.breakdown ?? []) {
      expect(row.value).not.toContain("NaN");
    }
  });
});

// ---------------------------------------------------------------------------
// incomeTaxOn: PA taper + additional rate (2026-07-18 band-bug fix)
// ---------------------------------------------------------------------------

describe("incomeTaxOn - PA taper and additional rate", () => {
  it("below taper: 60,000 -> basic 7,540 + higher (9,730 x 40%) = 11,432", () => {
    expect(taperedPersonalAllowance(60000)).toBe(12570);
    expect(incomeTaxOn(60000)).toBeCloseTo(7540 + 9730 * 0.4, 2);
  });

  it("taper zone: 120,000 -> PA 2,570, tax 39,432", () => {
    // PA = 12,570 - (120,000-100,000)/2 = 2,570; taxable = 117,430
    // basic 37,700 @ 20% = 7,540; higher = 79,730 @ 40% = 31,892; total 39,432
    expect(taperedPersonalAllowance(120000)).toBe(2570);
    expect(incomeTaxOn(120000)).toBeCloseTo(39432, 2);
  });

  it("additional rate: 150,000 -> PA 0, tax 53,703", () => {
    // taxable 150,000; basic 7,540; higher band width 125,140-37,700 = 87,440 @ 40% = 34,976
    // additional (150,000-125,140) = 24,860 @ 45% = 11,187; total 53,703
    expect(taperedPersonalAllowance(150000)).toBe(0);
    expect(incomeTaxOn(150000)).toBeCloseTo(53703, 2);
  });

  it("saLiability routes through incomeTaxOn (130,000 profit)", () => {
    const { incomeTax } = saLiability({ profit: 130000 });
    expect(incomeTax).toBeCloseTo(incomeTaxOn(130000), 6);
  });
});
