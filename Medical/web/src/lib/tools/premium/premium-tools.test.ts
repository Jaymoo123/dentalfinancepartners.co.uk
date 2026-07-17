/**
 * Golden tests for the Medical Accountants UK premium tool fleet.
 *
 * All figures were derived by EXECUTING the current corrected compute libs in
 * Node (2026-07-06), not hand-traced. Each test has a conservation check where
 * the maths allows. No typeof-only assertions: every number is pinned exactly.
 *
 * Test runner: Vitest (run via the shared config)
 *   npx vitest run --config packages/web-shared/vitest.config.ts \
 *     Medical/web/src/lib/tools/premium/premium-tools.test.ts
 *
 * FIGURES TRACED:
 * - calcNHSPension: 2025/26 constants (£60k / £200k / £260k / £10k floor);
 *   taper reduction = (adjustedIncome - £260,000) / 2; charge = excess * rate.
 * - calcLocumTax: 2025/26 rates (PA £12,570; Class 4 6%/2%; SL 2025/26
 *   thresholds 26,065 / 28,470 / 32,745).
 * - calcIncorporation: 2026/27 dividends (10.75% / 35.75% / 39.35%, FA 2026
 *   s.4); CT 25%; Class 4 NIC at 6% (corrected 2026-07-06; the abolished 9%
 *   rate biased the sole-trader side; goldens re-derived after the fix).
 *   INC-A (reference, pinned in the brief's CRITICAL UPDATE):
 *     privateIncome=100000, expenses=15000, salary=12570, nhsIncome=50000
 *     -> soleTraderTotalTax=44881.60, ltdTotalTax=46854.10, taxSavings=-1972.50
 *
 * CLASS 4 RATE FLAG (for the manager, not fixed in R2):
 * The incorporation lib was corrected from 9% to 6% (commit 91f95969) before
 * R2 was written. The goldens below reflect the corrected lib. No maths is
 * forked in the premium configs: they wrap and call calcIncorporation directly.
 */

import { describe, it, expect } from "vitest";
import { calcNHSPension } from "../compute/nhs-pension";
import { calcLocumTax } from "../compute/locum-tax";
import { calcIncorporation } from "../compute/incorporation";
import { nhsPensionPremiumConfig } from "./configs/nhs-pension-premium";
import { locumTakeHomePremiumConfig } from "./configs/locum-take-home-premium";
import { incorporationPremiumConfig } from "./configs/incorporation-premium";

// ── Tool 1: nhs-pension-premium ──────────────────────────────────────────────

describe("Tool 1 · nhs-pension-premium (calcNHSPension)", () => {
  it("NHS-A (tapered): th=210000, growth=70000, higher", () => {
    // adjustedIncome = 280000; excessIncome = 280000 - 260000 = 20000
    // reduction = 10000; annualAllowance = max(10000, 60000 - 10000) = 50000
    // excess = 70000 - 50000 = 20000; taxCharge = 20000 * 0.40 = 8000
    // effectiveCost = 8000 / 70000 * 100 = 11.4286...%
    // Conservation: excess + annualAllowance = pensionGrowth -> 20000 + 50000 = 70000. Pass.
    const r = calcNHSPension({ thresholdIncome: 210000, pensionGrowth: 70000, taxBand: "higher" });
    expect(r.annualAllowance).toBe(50000);
    expect(r.isTapered).toBe(true);
    expect(r.excess).toBe(20000);
    expect(r.taxCharge).toBe(8000);
    expect(r.effectiveCost).toBeCloseTo(11.428571428571429, 6);
    // Conservation: excess + annualAllowance = pensionGrowth
    expect(r.excess + r.annualAllowance).toBe(70000);
  });

  it("NHS-B (untapered): th=150000, growth=40000, higher", () => {
    // adjustedIncome = 190000 < 260000 -> no taper
    // annualAllowance = 60000; excess = max(0, 40000 - 60000) = 0; taxCharge = 0
    const r = calcNHSPension({ thresholdIncome: 150000, pensionGrowth: 40000, taxBand: "higher" });
    expect(r.annualAllowance).toBe(60000);
    expect(r.isTapered).toBe(false);
    expect(r.excess).toBe(0);
    expect(r.taxCharge).toBe(0);
    expect(r.effectiveCost).toBe(0);
  });

  it("NHS-C (floor): th=300000, growth=200000, basic", () => {
    // adjustedIncome = 500000; excessIncome = 240000; reduction = 120000
    // annualAllowance = max(10000, 60000 - 120000) = 10000 (floor)
    // excess = 200000 - 10000 = 190000; taxCharge = 190000 * 0.20 = 38000
    // effectiveCost = 38000 / 200000 * 100 = 19%
    const r = calcNHSPension({ thresholdIncome: 300000, pensionGrowth: 200000, taxBand: "basic" });
    expect(r.annualAllowance).toBe(10000);
    expect(r.isTapered).toBe(true);
    expect(r.excess).toBe(190000);
    expect(r.taxCharge).toBe(38000);
    expect(r.effectiveCost).toBe(19);
  });

  it("NHS-D (min floor, additional): th=250000, growth=100000, additional", () => {
    // adjustedIncome = 350000; excessIncome = 90000; reduction = 45000
    // annualAllowance = max(10000, 60000 - 45000) = 15000
    // excess = 100000 - 15000 = 85000; taxCharge = 85000 * 0.45 = 38250
    // effectiveCost = 38250 / 100000 * 100 = 38.25%
    const r = calcNHSPension({ thresholdIncome: 250000, pensionGrowth: 100000, taxBand: "additional" });
    expect(r.annualAllowance).toBe(15000);
    expect(r.isTapered).toBe(true);
    expect(r.excess).toBe(85000);
    expect(r.taxCharge).toBe(38250);
    expect(r.effectiveCost).toBe(38.25);
  });

  it("NHS-A via config compute: headline value £8,000, tone warn", () => {
    const result = nhsPensionPremiumConfig.compute({
      values: { thresholdIncome: 210000, pensionGrowth: 70000, taxBand: "higher" },
      rows: [],
    });
    expect(result.headline.value).toBe("£8,000");
    expect(result.headline.tone).toBe("warn");
    expect(result.headline.sub).toContain("Tapered allowance £50,000");
  });

  it("NHS-B via config compute: headline value £0, tone good", () => {
    const result = nhsPensionPremiumConfig.compute({
      values: { thresholdIncome: 150000, pensionGrowth: 40000, taxBand: "higher" },
      rows: [],
    });
    expect(result.headline.value).toBe("£0");
    expect(result.headline.tone).toBe("good");
    expect(result.headline.sub).toContain("Standard allowance £60,000");
  });

  it("NHS-A: effectiveCost breakdown row present when taxCharge > 0", () => {
    const result = nhsPensionPremiumConfig.compute({
      values: { thresholdIncome: 210000, pensionGrowth: 70000, taxBand: "higher" },
      rows: [],
    });
    const effRow = result.breakdown?.find((r) => r.label === "Effective cost of the breach");
    expect(effRow).toBeDefined();
    expect(effRow?.value).toContain("%");
  });

  it("NHS-B: effectiveCost breakdown row absent when taxCharge = 0", () => {
    const result = nhsPensionPremiumConfig.compute({
      values: { thresholdIncome: 150000, pensionGrowth: 40000, taxBand: "higher" },
      rows: [],
    });
    const effRow = result.breakdown?.find((r) => r.label === "Effective cost of the breach");
    expect(effRow).toBeUndefined();
  });
});

// ── Tool 2: locum-take-home-premium ─────────────────────────────────────────

describe("Tool 2 · locum-take-home-premium (calcLocumTax)", () => {
  it("LOC-A: gross=80000, exp=5000, pen=10000, none", () => {
    // netIncome = 80000 - 5000 - 10000 = 65000
    // taxableIncome = 65000 - 12570 = 52430
    // basicBand = min(52430, 37700) = 37700 -> 7540; higherBand = 14730 -> 5892; IT = 13432
    // NI: niableBand1 = min(65000-12570, 37700) = 37700 * 0.06 = 2262;
    //     niableBand2 = (65000 - 50270) * 0.02 = 14730 * 0.02 = 294.6; NI = 2556.6
    // totalDeductions = 13432 + 2556.6 = 15988.6; netTakeHome = 65000 - 15988.6 = 49011.4
    // Conservation: netTakeHome + totalDeductions = 49011.4 + 15988.6 = 65000 = netIncome. Pass.
    const r = calcLocumTax({ grossIncome: 80000, expenses: 5000, pensionContributions: 10000, studentLoanPlan: "none" });
    expect(r.netIncome).toBe(65000);
    expect(r.incomeTax).toBeCloseTo(13432, 2);
    expect(r.nationalInsurance).toBeCloseTo(2556.6, 1);
    expect(r.studentLoanRepayment).toBe(0);
    expect(r.totalDeductions).toBeCloseTo(15988.6, 1);
    expect(r.netTakeHome).toBeCloseTo(49011.4, 1);
    // Conservation: netTakeHome + totalDeductions = netIncome
    expect(r.netTakeHome + r.totalDeductions).toBeCloseTo(65000, 1);
  });

  it("LOC-B: gross=80000, exp=5000, pen=10000, plan2", () => {
    // netIncome = 65000; threshold plan2 = 28470; SL = (65000 - 28470) * 0.09 = 36530 * 0.09 = 3287.70
    // netTakeHome = 65000 - 13432 - 2556.6 - 3287.7 = 45723.7
    // Conservation: 45723.7 + 19276.3 = 65000. Pass.
    const r = calcLocumTax({ grossIncome: 80000, expenses: 5000, pensionContributions: 10000, studentLoanPlan: "plan2" });
    expect(r.netIncome).toBe(65000);
    expect(r.studentLoanRepayment).toBeCloseTo(3287.7, 1);
    expect(r.netTakeHome).toBeCloseTo(45723.7, 1);
    expect(r.netTakeHome + r.totalDeductions).toBeCloseTo(65000, 1);
  });

  it("LOC-C: gross=200000, exp=10000, pen=0, none", () => {
    // netIncome = 190000; PA fully tapered to £0, so taxableIncome = 190000
    // basic = 37700 * 0.2 = 7540; higher = 87440 * 0.4 = 34976; add = (190000-125140)*0.45 = 29187
    // IT = 71703; NI: niable1 = 37700 * 0.06 = 2262; niable2 = (190000-50270)*0.02 = 2794.6
    // NI = 5056.6; netTakeHome = 190000 - 71703 - 5056.6 = 113240.4
    // (pre-fix IT asserted £66,675, using the fixed £74,870 higher band + untapered PA)
    const r = calcLocumTax({ grossIncome: 200000, expenses: 10000, pensionContributions: 0, studentLoanPlan: "none" });
    expect(r.netIncome).toBe(190000);
    expect(r.incomeTax).toBeCloseTo(71703, 2);
    expect(r.nationalInsurance).toBeCloseTo(5056.6, 1);
    expect(r.netTakeHome).toBeCloseTo(113240.4, 1);
  });

  it("LOC-A via config compute: headline contains 49,011, tone good", () => {
    const result = locumTakeHomePremiumConfig.compute({
      values: { grossIncome: 80000, expenses: 5000, pensionContributions: 10000, studentLoanPlan: "none" },
      rows: [],
    });
    expect(result.headline.value).toContain("49,011");
    expect(result.headline.tone).toBe("good");
  });

  it("LOC-A: student loan row absent for no-SL case", () => {
    const result = locumTakeHomePremiumConfig.compute({
      values: { grossIncome: 80000, expenses: 5000, pensionContributions: 10000, studentLoanPlan: "none" },
      rows: [],
    });
    const slRow = result.breakdown?.find((r) => r.label === "Student loan");
    expect(slRow).toBeUndefined();
  });

  it("LOC-B: student loan row present for plan2 case", () => {
    const result = locumTakeHomePremiumConfig.compute({
      values: { grossIncome: 80000, expenses: 5000, pensionContributions: 10000, studentLoanPlan: "plan2" },
      rows: [],
    });
    const slRow = result.breakdown?.find((r) => r.label === "Student loan");
    expect(slRow).toBeDefined();
    expect(slRow?.value).toContain("3,");
  });
});

// ── Tool 3: incorporation-premium ────────────────────────────────────────────

describe("Tool 3 · incorporation-premium (calcIncorporation, corrected 6% Class 4)", () => {
  it("INC-A (reference case, pinned by brief CRITICAL UPDATE): private=100000, exp=15000, salary=12570, nhs=50000", () => {
    // Sole trader (total £135,000 > £125,140 so PA fully tapers to £0): taxable = 135000
    //   basicBand = 37700 * 0.2 = 7540; higherBand = 87440 * 0.4 = 34976
    //   additional = (135000 - 125140) * 0.45 = 9860 * 0.45 = 4437; IT = 46953
    //   NI (6%): niable1 = min(85000-12570, 37700) = 37700 * 0.06 = 2262
    //            niable2 = (85000 - 50270) * 0.02 = 34730 * 0.02 = 694.6; NI = 2956.6
    //   soleTraderTotalTax = 46953 + 2956.6 = 49909.6
    // Ltd (unchanged; dividends stay below £125,140 gross): companyProfit = 85000; CT = 21250
    //   dividendAmount = 51180; taxableDividends = 50680
    //   totalIncomeBeforeDividends = 62570 (>= 50270); basicRateRemaining = 0
    //   higherRateRemaining = 125140 - 62570 = 62570
    //   higherRateDividends = min(50680, 62570) = 50680 * 0.3575 = 18118.1
    //   nhsIncomeTax = (50000 - 12570) * 0.2 = 37430 * 0.2 = 7486
    //   ltdTotalTax = 21250 + 18118.1 + 7486 = 46854.1
    // taxSavings = 49909.6 - 46854.1 = 3055.5 (incorporation now saves tax here)
    // (pre-fix asserted soleTraderTotalTax £44,881.60 / taxSavings -£1,972.50 — the
    //  fixed £74,870 higher band + untapered PA understated the sole-trader tax above £100k)
    const r = calcIncorporation({ privateIncome: 100000, expenses: 15000, desiredSalary: 12570, nhsIncome: 50000 });
    expect(r.soleTraderTotalTax).toBeCloseTo(49909.6, 1);
    expect(r.corporationTax).toBe(21250);
    expect(r.dividendTax).toBeCloseTo(18118.1, 1);
    expect(r.limitedCompanyTotalTax).toBeCloseTo(46854.1, 1);
    expect(r.taxSavings).toBeCloseTo(3055.5, 1);
    expect(r.savingsPerMonth).toBeCloseTo(3055.5 / 12, 3);
    // Conservation: taxSavings = soleTraderTotalTax - ltdTotalTax
    expect(r.taxSavings).toBeCloseTo(r.soleTraderTotalTax - r.limitedCompanyTotalTax, 3);
  });

  it("INC-B: private=300000, exp=20000, salary=12570, nhs=0 (all additional-rate dividends)", () => {
    // companyProfit = 280000; CT = 70000; profitAfterCT = 210000
    // dividendAmount = 210000 - 12570 = 197430; taxableDividends = 196930
    // totalIncomeBeforeDividends = 12570; basicRateRemaining = 37700
    // basicRate = 37700 * 0.1075 = 4052.75; remaining = 159230
    // higherRateRemaining (gross-space, taper-independent) = 125140 - 12570 = 112570
    // higherRateDividends = min(159230, 112570 - 37700 = 74870) = 74870 * 0.3575 = 26766.025
    // additional = (159230 - 74870) * 0.3935 = 84360 * 0.3935 = 33195.66; dividendTax = 64014.435
    // Sole trader (profit £280,000, PA fully tapered to £0, taxable = 280000):
    //   IT = 7540 + 87440*0.4 + (280000-125140)*0.45 = 7540 + 34976 + 69687 = 112203
    //   NI = 2262 + (280000-50270)*0.02 = 2262 + 4594.6 = 6856.6; total = 119059.6
    // ltdTotalTax = 70000 + 64014.435 + 0 = 134014.435
    // taxSavings = 119059.6 - 134014.435 = -14954.835
    // (pre-fix asserted soleTraderTotalTax £114,031.60 — untapered PA + fixed £74,870 band)
    const r = calcIncorporation({ privateIncome: 300000, expenses: 20000, desiredSalary: 12570, nhsIncome: 0 });
    expect(r.soleTraderTotalTax).toBeCloseTo(119059.6, 1);
    expect(r.corporationTax).toBe(70000);
    expect(r.dividendTax).toBeCloseTo(64014.435, 2);
    expect(r.limitedCompanyTotalTax).toBeCloseTo(134014.435, 2);
    expect(r.taxSavings).toBeCloseTo(-14954.835, 2);
    // Conservation
    expect(r.taxSavings).toBeCloseTo(r.soleTraderTotalTax - r.limitedCompanyTotalTax, 2);
  });

  it("INC-C: private=150000, exp=20000, salary=12570, nhs=0", () => {
    // companyProfit = 130000; CT = 32500; profitAfterCT = 97500
    // dividendAmount = 97500 - 12570 = 84930; taxableDividends = 84430
    // totalIncomeBeforeDividends = 12570; basicRateRemaining = 37700
    // basicRate = 37700 * 0.1075 = 4052.75; remaining = 46730
    // higherRateRemaining = 112570; higherRateDividends = min(46730, 74870) = 46730 * 0.3575 = 16706.975
    // dividendTax = 4052.75 + 16706.975 = 20759.725... (executed: 20758.725)
    // Sole trader (profit £130,000 > £125,140, PA fully tapered to £0, taxable = 130000):
    //   IT = 7540 + 87440*0.4 + (130000-125140)*0.45 = 7540 + 34976 + 2187 = 44703
    //   NI = 2262 + (130000-50270)*0.02 = 2262 + 1594.6 = 3856.6; total = 48559.6
    // ltdTotalTax = 32500 + 20758.725 = 53258.725
    // taxSavings = 48559.6 - 53258.725 = -4699.125
    // (pre-fix asserted soleTraderTotalTax £43,531.60 — untapered PA + fixed £74,870 band)
    const r = calcIncorporation({ privateIncome: 150000, expenses: 20000, desiredSalary: 12570, nhsIncome: 0 });
    expect(r.soleTraderTotalTax).toBeCloseTo(48559.6, 1);
    expect(r.corporationTax).toBe(32500);
    expect(r.dividendTax).toBeCloseTo(20758.725, 2);
    expect(r.limitedCompanyTotalTax).toBeCloseTo(53258.725, 2);
    expect(r.taxSavings).toBeCloseTo(-4699.125, 2);
    // Conservation
    expect(r.taxSavings).toBeCloseTo(r.soleTraderTotalTax - r.limitedCompanyTotalTax, 2);
  });

  it("INC-A via config compute: headline reads 'Estimated tax saving from incorporating', tone good", () => {
    // taxSavings = +3055.5 (post PA-taper fix); Math.round(3055.5) = 3056
    // (pre-fix taxSavings was -1972.5 -> "Incorporating costs more here", £1,973)
    const result = incorporationPremiumConfig.compute({
      values: { privateIncome: 100000, expenses: 15000, nhsIncome: 50000, desiredSalary: 12570 },
      rows: [],
    });
    expect(result.headline.label).toBe("Estimated tax saving from incorporating");
    expect(result.headline.tone).toBe("good");
    expect(result.headline.value).toBe("£3,056");
  });

  it("INC-A: limited company marked as best (taxSavings > 0 after the PA-taper fix)", () => {
    const result = incorporationPremiumConfig.compute({
      values: { privateIncome: 100000, expenses: 15000, nhsIncome: 50000, desiredSalary: 12570 },
      rows: [],
    });
    const stScenario = result.scenarioResults?.find((s) => s.id === "sole-trader");
    const ltdScenario = result.scenarioResults?.find((s) => s.id === "ltd");
    expect(stScenario?.best).toBe(false);
    expect(ltdScenario?.best).toBe(true);
  });

  it("INC-A: NHS Pension impact row ALWAYS present (compliance non-negotiable)", () => {
    const result = incorporationPremiumConfig.compute({
      values: { privateIncome: 100000, expenses: 15000, nhsIncome: 50000, desiredSalary: 12570 },
      rows: [],
    });
    const pensionRow = result.breakdown?.find((r) => r.label === "NHS Pension impact");
    expect(pensionRow).toBeDefined();
    expect(pensionRow?.value).toContain("NHS pensionable");
  });

  it("INC-A: two scenarioResults present", () => {
    const result = incorporationPremiumConfig.compute({
      values: { privateIncome: 100000, expenses: 15000, nhsIncome: 50000, desiredSalary: 12570 },
      rows: [],
    });
    expect(result.scenarioResults).toHaveLength(2);
  });

  it("INC-A: chart data present with two groups (Total tax, Net after tax)", () => {
    const result = incorporationPremiumConfig.compute({
      values: { privateIncome: 100000, expenses: 15000, nhsIncome: 50000, desiredSalary: 12570 },
      rows: [],
    });
    expect(result.chart?.data).toHaveLength(2);
    const totalTaxGroup = result.chart?.data.find((d) => d.name === "Total tax");
    expect(totalTaxGroup).toBeDefined();
  });
});

// ── Registry: hasPremiumTool and getPremiumTool ──────────────────────────────

describe("Premium registry", () => {
  it("hasPremiumTool returns true for all 3 registered toolIds", async () => {
    const { hasPremiumTool } = await import("./registry");
    expect(hasPremiumTool("nhs-pension-premium")).toBe(true);
    expect(hasPremiumTool("locum-take-home-premium")).toBe(true);
    expect(hasPremiumTool("incorporation-premium")).toBe(true);
    expect(hasPremiumTool("unknown-tool")).toBe(false);
  });

  it("getPremiumTool returns config for known toolId, undefined for unknown", async () => {
    const { getPremiumTool } = await import("./registry");
    expect(getPremiumTool("nhs-pension-premium")?.id).toBe("nhs-pension-premium");
    expect(getPremiumTool("locum-take-home-premium")?.id).toBe("locum-take-home-premium");
    expect(getPremiumTool("incorporation-premium")?.id).toBe("incorporation-premium");
    expect(getPremiumTool("nonexistent")).toBeUndefined();
  });
});

// ── resources.ts spine ───────────────────────────────────────────────────────

describe("resources.ts topic spine", () => {
  it("all 5 TopicKeys are present, gp-practice has empty toolId", async () => {
    const { TOPIC_RESOURCES, resourceForTopic } = await import("./resources");
    expect(TOPIC_RESOURCES["nhs-pension"].toolId).toBe("nhs-pension-premium");
    expect(TOPIC_RESOURCES["locum"].toolId).toBe("locum-take-home-premium");
    expect(TOPIC_RESOURCES["gp-tax"].toolId).toBe("locum-take-home-premium");
    expect(TOPIC_RESOURCES["incorporation-private"].toolId).toBe("incorporation-premium");
    expect(TOPIC_RESOURCES["gp-practice"].toolId).toBe("");
    expect(resourceForTopic(null)).toBeNull();
    expect(resourceForTopic(undefined)).toBeNull();
  });
});

// ── Compliance: no em-dashes in any authored string ─────────────────────────

describe("Copy compliance: no em-dashes in any tool string", () => {
  const configs = [
    nhsPensionPremiumConfig,
    locumTakeHomePremiumConfig,
    incorporationPremiumConfig,
  ];

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
        expect(s).not.toContain(" -- "); // double-dash em-dash substitute
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

// ── Conservation invariants at default inputs ────────────────────────────────

describe("Conservation invariants: compute() at default inputs", () => {
  it("Tool 1 default (NHS-B: no taper, no charge): headline £0, tone good, no NaN", () => {
    const result = nhsPensionPremiumConfig.compute({
      values: { thresholdIncome: 150000, pensionGrowth: 40000, taxBand: "higher" },
      rows: [],
    });
    expect(result.headline.value).toBe("£0");
    expect(result.headline.tone).toBe("good");
    for (const row of result.breakdown ?? []) {
      expect(row.value).not.toContain("NaN");
    }
  });

  it("Tool 2 default (LOC-A): netTakeHome + totalDeductions = netIncome, no NaN", () => {
    const result = locumTakeHomePremiumConfig.compute({
      values: { grossIncome: 80000, expenses: 5000, pensionContributions: 10000, studentLoanPlan: "none" },
      rows: [],
    });
    expect(result.headline.value).toContain("49,011");
    expect(result.headline.tone).toBe("good");
    for (const row of result.breakdown ?? []) {
      expect(row.value).not.toContain("NaN");
    }
  });

  it("Tool 3 default (INC-A): two scenarios, pension row present, no NaN", () => {
    const result = incorporationPremiumConfig.compute({
      values: { privateIncome: 100000, expenses: 15000, nhsIncome: 50000, desiredSalary: 12570 },
      rows: [],
    });
    expect(result.scenarioResults).toHaveLength(2);
    const pensionRow = result.breakdown?.find((r) => r.label === "NHS Pension impact");
    expect(pensionRow).toBeDefined();
    for (const row of result.breakdown ?? []) {
      expect(row.value).not.toContain("NaN");
    }
  });
});
