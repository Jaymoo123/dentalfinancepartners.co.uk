/**
 * Golden + edge-case tests for the divorce-finances calculator fleet.
 * Mirrors construction-cis/web/src/lib/calculators/tools.test.ts style:
 * exact pinned strings, no typeof-only assertions.
 *
 * Ground truth:
 *   Divorce application fee £628, consent order £62, contested financial
 *   order £292 (HMCTS, from 13 July 2026).
 *   Help with Fees: £1,420 single / £2,145 couple / +£710 per child income
 *   thresholds, 50p per £1 taper, £4,250 capital limit (£16,000 at 66+).
 *   Market bands are estimates held in divorce-finance.ts.
 *
 * Run:
 *   npx vitest run --config packages/web-shared/vitest.config.ts \
 *     divorce-finances/web/src/lib/calculators/tools.test.ts
 */

import { describe, it, expect } from "vitest";
import { divorceCostCalculator } from "./tools/divorce-cost-calculator";
import { helpWithFeesChecker } from "./tools/help-with-fees-checker";
import { consentOrderCostCalculator } from "./tools/consent-order-cost-calculator";
import { settlementRangeEstimator } from "./tools/settlement-range-estimator";
import { mediationVsSolicitorCosts } from "./tools/mediation-vs-solicitor-costs";
import { hwfRemission, settlementRange } from "./divorce-finance";
import { TOOLS } from "./registry";

// ---------------------------------------------------------------------------
// Tool 1: divorce-cost-calculator
// ---------------------------------------------------------------------------

describe("divorce-cost-calculator", () => {
  it("defaults: online route + consent order", () => {
    // 628 + VAT(150..300) + 62 + VAT(279..1500)
    // = 628 + 180..360 + 62 + 334.8..1800 = 1204.8..2850
    const r = divorceCostCalculator.compute({ route: "online", finances: "consent", hwfLikely: false });
    expect(r.headline.value).toBe("£1,205 to £2,850");
    expect(r.rows![0].value).toBe("£628");
    for (const row of r.rows!) expect(row.value).not.toContain("NaN");
  });

  it("DIY with no financial order = court fee only, with open-claims warning", () => {
    const r = divorceCostCalculator.compute({ route: "diy", finances: "none", hwfLikely: false });
    expect(r.headline.value).toBe("£628");
    expect(r.note).toContain("claims");
  });

  it("Help with Fees zeroes the court fees", () => {
    // 0 + 0 + 0 + 334.8..1800
    const r = divorceCostCalculator.compute({ route: "diy", finances: "consent", hwfLikely: true });
    expect(r.headline.value).toBe("£335 to £1,800");
    expect(r.rows![0].value).toBe("£0");
  });

  it("contested route uses the £292 fee and warns", () => {
    // 628 + 600..1800 + 292 + 12000..36000 = 13520..38720
    const r = divorceCostCalculator.compute({ route: "solicitor", finances: "contested", hwfLikely: false });
    expect(r.headline.value).toBe("£13,520 to £38,720");
    expect(r.headline.tone).toBe("warn");
    expect(r.rows!.some((row) => row.value === "£292")).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Tool 2: help-with-fees-checker (+ hwfRemission edge cases)
// ---------------------------------------------------------------------------

describe("help-with-fees-checker", () => {
  it("qualifying benefit + low capital = full remission", () => {
    const r = helpWithFeesChecker.compute({
      fee: "628", disposableCapital: 1500, aged66OrOver: false,
      onQualifyingBenefit: true, grossMonthlyIncome: 0, hasPartner: false, children: 0,
    });
    expect(r.verdict!.positive).toBe(true);
    expect(r.headline.value).toBe("£0");
    expect(r.rows!.find((x) => x.label === "Fee remitted")!.value).toBe("£628");
  });

  it("partial remission taper: £60 over threshold pays £30", () => {
    // threshold 1420 + 2*710 = 2840; excess 60; contribution 30
    const r = helpWithFeesChecker.compute({
      fee: "628", disposableCapital: 2000, aged66OrOver: false,
      onQualifyingBenefit: false, grossMonthlyIncome: 2900, hasPartner: false, children: 2,
    });
    expect(r.verdict!.positive).toBe(true);
    expect(r.headline.value).toBe("£30");
    expect(r.rows!.find((x) => x.label === "Fee remitted")!.value).toBe("£598");
    expect(r.rows!.find((x) => x.label.includes("threshold"))!.value).toBe("£2,840");
  });

  it("capital over £4,250 fails regardless of income", () => {
    const r = helpWithFeesChecker.compute({
      fee: "62", disposableCapital: 6000, aged66OrOver: false,
      onQualifyingBenefit: true, grossMonthlyIncome: 0, hasPartner: false, children: 0,
    });
    expect(r.verdict!.positive).toBe(false);
    expect(r.rows!.find((x) => x.label === "Capital test")!.value).toBe("Fail");
    expect(r.headline.value).toBe("£62");
  });

  it("age 66+ raises the capital limit to £16,000", () => {
    const r = helpWithFeesChecker.compute({
      fee: "628", disposableCapital: 6000, aged66OrOver: true,
      onQualifyingBenefit: false, grossMonthlyIncome: 1400, hasPartner: false, children: 0,
    });
    expect(r.verdict!.positive).toBe(true);
    expect(r.rows!.find((x) => x.label.includes("Capital limit"))!.value).toBe("£16,000");
    expect(r.headline.value).toBe("£0");
  });

  it("taper wipes out the remission at high income", () => {
    // single, no kids: excess 3000-1420=1580, 50% = 790 > 628
    const h = hwfRemission({
      fee: 628, grossMonthlyIncome: 3000, hasPartner: false, children: 0,
      onQualifyingBenefit: false, disposableCapital: 0, aged66OrOver: false,
    });
    expect(h.eligible).toBe(false);
    expect(h.contribution).toBe(628);
    expect(h.failedTest).toBe("income");
  });

  it("income exactly at threshold = full remission", () => {
    const h = hwfRemission({
      fee: 628, grossMonthlyIncome: 1420, hasPartner: false, children: 0,
      onQualifyingBenefit: false, disposableCapital: 0, aged66OrOver: false,
    });
    expect(h.remission).toBe(628);
    expect(h.contribution).toBe(0);
  });

  it("capital exactly at the limit fails (limit is exclusive)", () => {
    const h = hwfRemission({
      fee: 628, grossMonthlyIncome: 0, hasPartner: false, children: 0,
      onQualifyingBenefit: true, disposableCapital: 4250, aged66OrOver: false,
    });
    expect(h.eligible).toBe(false);
    expect(h.failedTest).toBe("capital");
  });
});

// ---------------------------------------------------------------------------
// Tool 3: consent-order-cost-calculator
// ---------------------------------------------------------------------------

describe("consent-order-cost-calculator", () => {
  it("defaults: online drafting, clean break, no review", () => {
    // 62 + VAT(279..799 -> but band low uses CONSENT_ORDER_ONLINE) = 62 + 334.8..958.8
    const r = consentOrderCostCalculator.compute({
      draftingRoute: "online", cleanBreak: true, bothRepresented: false,
    });
    expect(r.headline.label).toBe("Estimated clean break order cost");
    expect(r.headline.value).toBe("£397 to £1,021");
    expect(r.rows![0].value).toBe("£62");
  });

  it("DIY = court fee only, with rejection warning", () => {
    const r = consentOrderCostCalculator.compute({
      draftingRoute: "diy", cleanBreak: false, bothRepresented: false,
    });
    expect(r.headline.label).toBe("Estimated consent order cost");
    expect(r.headline.value).toBe("£62");
    expect(r.note).toContain("rejected");
  });

  it("solicitor drafting plus independent review", () => {
    // 62 + 600..1800 + 300..600 = 962..2462
    const r = consentOrderCostCalculator.compute({
      draftingRoute: "solicitor", cleanBreak: true, bothRepresented: true,
    });
    expect(r.headline.value).toBe("£962 to £2,462");
    expect(r.rows!.length).toBe(4);
  });
});

// ---------------------------------------------------------------------------
// Tool 4: settlement-range-estimator (+ model edge cases)
// ---------------------------------------------------------------------------

describe("settlement-range-estimator", () => {
  it("defaults: 12y marriage, 1 child with lower earner, moderate gap", () => {
    // 45..55 base, +5/+10 for child with carer => 50% to 65% of 300,000
    const r = settlementRangeEstimator.compute({
      netAssets: 300000, marriageYears: 12, childrenUnder18: 1,
      lowerEarnerPrimaryCarer: true, incomeDisparity: "moderate",
    });
    expect(r.headline.value).toBe("£150,000 to £195,000");
    expect(r.rows![0].value).toBe("50% to 65%");
    expect(r.note).toContain("INDICATIVE ONLY");
  });

  it("short childless marriage extends the range below equality", () => {
    // 35% to 50% of 150,000
    const r = settlementRangeEstimator.compute({
      netAssets: 150000, marriageYears: 3, childrenUnder18: 0,
      lowerEarnerPrimaryCarer: false, incomeDisparity: "similar",
    });
    expect(r.headline.value).toBe("£52,500 to £75,000");
    expect(r.rows![0].value).toBe("35% to 50%");
  });

  it("long marriage, large gap, children: clamped at 70%", () => {
    const m = settlementRange({
      netAssets: 500000, marriageYears: 20, childrenUnder18: 2,
      incomeDisparity: "large", lowerEarnerPrimaryCarer: true,
    });
    expect(m.shareLow).toBe(0.5);
    expect(m.shareHigh).toBe(0.7);
    expect(m.amountHigh).toBe(350000);
  });

  it("zero and negative assets produce £0, never NaN", () => {
    const r = settlementRangeEstimator.compute({
      netAssets: -5000, marriageYears: 10, childrenUnder18: 0,
      lowerEarnerPrimaryCarer: false, incomeDisparity: "similar",
    });
    expect(r.headline.value).toBe("£0");
    expect(r.headline.value).not.toContain("NaN");
  });

  it("never outputs a single-figure entitlement for normal inputs (always a range)", () => {
    const r = settlementRangeEstimator.compute({
      netAssets: 200000, marriageYears: 8, childrenUnder18: 1,
      lowerEarnerPrimaryCarer: true, incomeDisparity: "large",
    });
    expect(r.headline.value).toContain(" to ");
  });
});

// ---------------------------------------------------------------------------
// Tool 5: mediation-vs-solicitor-costs
// ---------------------------------------------------------------------------

describe("mediation-vs-solicitor-costs", () => {
  it("defaults: 4 sessions at £150, no voucher, online drafting", () => {
    // mediation: 108..144 + 600 + 334.8..958.8 + 62 = 1104.8..1764.8
    // solicitor: 2400..9600 + 334.8..958.8 + 62 = 2796.8..10620.8
    // saving: 1032..9516
    const r = mediationVsSolicitorCosts.compute({
      sessions: 4, sessionCost: 150, childDispute: false, solicitorDrafting: false,
    });
    expect(r.headline.value).toBe("£1,032 to £9,516");
    expect(r.rows![0].value).toBe("£1,105 to £1,765");
    expect(r.rows![1].value).toBe("£2,797 to £10,621");
  });

  it("child dispute applies the £500 voucher (£250 your share)", () => {
    const r = mediationVsSolicitorCosts.compute({
      sessions: 4, sessionCost: 150, childDispute: true, solicitorDrafting: false,
    });
    expect(r.rows![0].value).toBe("£855 to £1,515");
    expect(r.rows!.some((x) => x.value === "£500")).toBe(true);
  });

  it("voucher can never push the mediation cost negative", () => {
    const r = mediationVsSolicitorCosts.compute({
      sessions: 1, sessionCost: 0, childDispute: true, solicitorDrafting: false,
    });
    // miam 108..144 - 250 clamps to 0 at the low end
    expect(r.rows![0].value).not.toContain("-");
  });

  it("saving never displays negative", () => {
    const r = mediationVsSolicitorCosts.compute({
      sessions: 10, sessionCost: 2000, childDispute: false, solicitorDrafting: false,
    });
    expect(r.headline.value.startsWith("£0")).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Fleet-wide compliance invariants
// ---------------------------------------------------------------------------

describe("fleet compliance", () => {
  it("no em or en dashes anywhere in tool copy", () => {
    for (const tool of TOOLS) {
      const json = JSON.stringify(tool);
      expect(json.includes("—"), `${tool.slug} contains an em dash`).toBe(false);
      expect(json.includes("–"), `${tool.slug} contains an en dash`).toBe(false);
    }
  });

  it("every tool has worked examples, FAQs and a specialist-handoff CTA", () => {
    for (const tool of TOOLS) {
      if (tool.kind !== "generic") continue;
      expect(tool.workedExamples!.length, tool.slug).toBeGreaterThan(0);
      expect(tool.faqs!.length, tool.slug).toBeGreaterThanOrEqual(3);
      expect(tool.ctaLabel, tool.slug).toBeTruthy();
    }
  });

  it("slugs are unique", () => {
    const slugs = TOOLS.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("compute never returns NaN at defaults", () => {
    for (const tool of TOOLS) {
      if (tool.kind !== "generic") continue;
      const defaults = Object.fromEntries(tool.fields.map((f) => [f.id, f.default]));
      const r = tool.compute(defaults);
      expect(r.headline.value, tool.slug).not.toContain("NaN");
      for (const row of r.rows ?? []) expect(row.value, tool.slug).not.toContain("NaN");
    }
  });
});
