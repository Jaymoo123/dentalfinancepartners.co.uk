/**
 * Unit tests for estate-tax.ts pure helpers, plus per-tool compute smoke
 * tests for the 7-tool wills-probate fleet.
 *
 * Run:
 *   npx vitest run --config packages/web-shared/vitest.config.ts \
 *     wills-probate/web/src/lib/calculators/tools.test.ts
 */

import { describe, it, expect } from "vitest";
import {
  NRB,
  RNRB,
  PROBATE_FEE,
  PROBATE_FEE_THRESHOLD,
  availableRnrb,
  combinedThreshold,
  ihtDue,
  giftTaperRate,
  isExceptedEstate,
  pensionsIht2027Delta,
} from "./estate-tax";

import { pensionsIht2027Estimator } from "./tools/pensions-iht-2027-estimator";
import { probateTimelineEstimator } from "./tools/probate-timeline-estimator";
import { ihtThresholdCalculator } from "./tools/iht-threshold-calculator";
import { probateCostCalculator } from "./tools/probate-cost-calculator";
import { doINeedProbateChecker } from "./tools/do-i-need-probate-checker";
import { probateDiyVsSolicitor } from "./tools/probate-diy-vs-solicitor";
import { makingAWillChecklist } from "./tools/making-a-will-checklist";

// ---------------------------------------------------------------------------
// estate-tax.ts unit tests
// ---------------------------------------------------------------------------

describe("availableRnrb - taper boundary", () => {
  it("no taper at exactly £2,000,000", () => {
    expect(availableRnrb(2_000_000, true)).toBe(RNRB);
  });

  it("tapers by £1 per £2 over £2,000,000, e.g. £2,100,000 -> RNRB - 50,000", () => {
    // over = 100,000; taper = 50,000; available = 175,000 - 50,000 = 125,000
    expect(availableRnrb(2_100_000, true)).toBe(125_000);
  });

  it("fully tapered away at or above £2,350,000", () => {
    expect(availableRnrb(2_350_000, true)).toBe(0);
    expect(availableRnrb(3_000_000, true)).toBe(0);
  });

  it("zero when home does not pass to descendants, regardless of estate size", () => {
    expect(availableRnrb(500_000, false)).toBe(0);
  });
});

describe("combinedThreshold - married and transferred allowance", () => {
  it("single, home to descendants, small estate: NRB + RNRB, no transfer", () => {
    const t = combinedThreshold({
      married: false,
      widowedTransferPct: 0,
      homeToDescendants: true,
      estateValue: 400_000,
    });
    expect(t.nrb).toBe(NRB);
    expect(t.rnrb).toBe(RNRB);
    expect(t.total).toBe(NRB + RNRB);
  });

  it("widowed with 100% transferable allowance: threshold doubles to £1,000,000", () => {
    const t = combinedThreshold({
      married: false,
      widowedTransferPct: 100,
      homeToDescendants: true,
      estateValue: 500_000,
    });
    expect(t.total).toBe((NRB + RNRB) * 2);
    expect(t.total).toBe(1_000_000);
  });

  it("married flag ignores widowedTransferPct (this deceased's own single-estate threshold)", () => {
    const t = combinedThreshold({
      married: true,
      widowedTransferPct: 100,
      homeToDescendants: true,
      estateValue: 500_000,
    });
    expect(t.total).toBe(NRB + RNRB);
  });
});

describe("ihtDue - standard vs charity rate", () => {
  it("40% standard rate on taxable excess", () => {
    expect(ihtDue(100_000)).toBe(40_000);
  });

  it("36% reduced rate when charity flag set", () => {
    expect(ihtDue(100_000, true)).toBe(36_000);
  });

  it("zero or negative taxable amount gives zero tax", () => {
    expect(ihtDue(0)).toBe(0);
    expect(ihtDue(-50_000)).toBe(0);
  });
});

describe("giftTaperRate - PET taper bands", () => {
  it("under 3 years: 0% reduction (full tax)", () => {
    expect(giftTaperRate(1)).toBe(0);
    expect(giftTaperRate(2.9)).toBe(0);
  });

  it("3-4 years: 20% reduction", () => {
    expect(giftTaperRate(3)).toBe(20);
    expect(giftTaperRate(3.9)).toBe(20);
  });

  it("6-7 years: 80% reduction", () => {
    expect(giftTaperRate(6.5)).toBe(80);
  });

  it("7+ years: fully exempt (100% reduction)", () => {
    expect(giftTaperRate(7)).toBe(100);
    expect(giftTaperRate(20)).toBe(100);
  });
});

describe("isExceptedEstate - reporting threshold edges", () => {
  it("gross exactly at £325,000 -> excepted", () => {
    expect(isExceptedEstate({ gross: 325_000, netChargeable: 0, spouseCharityExempt: false })).toBe(true);
  });

  it("gross £325,001, not spouse/charity exempt -> not excepted", () => {
    expect(isExceptedEstate({ gross: 325_001, netChargeable: 10_000, spouseCharityExempt: false })).toBe(false);
  });

  it("gross £3,000,000, fully spouse/charity exempt, nil net chargeable -> excepted", () => {
    expect(isExceptedEstate({ gross: 3_000_000, netChargeable: 0, spouseCharityExempt: true })).toBe(true);
  });

  it("gross £3,000,001, fully exempt -> exceeds the £3m cap, not excepted", () => {
    expect(isExceptedEstate({ gross: 3_000_001, netChargeable: 0, spouseCharityExempt: true })).toBe(false);
  });
});

describe("probate fee threshold (used by probate-cost-calculator)", () => {
  it("estate at exactly £5,000 pays no fee", () => {
    expect(5_000 > PROBATE_FEE_THRESHOLD).toBe(false);
  });

  it("estate at £5,001 is above the threshold, fee applies", () => {
    expect(5_001 > PROBATE_FEE_THRESHOLD).toBe(true);
    // £526 from 13 July 2026 (was £300)
    expect(PROBATE_FEE).toBe(526);
  });
});

describe("pensionsIht2027Delta - pension pushes estate over RNRB taper", () => {
  it("estate under £2m before pension, over £2m after: RNRB is newly lost", () => {
    // exPension = 1,800,000; pension = 400,000 -> withPension = 2,200,000
    const r = pensionsIht2027Delta({
      estateExPension: 1_800_000,
      pensionPot: 400_000,
      married: false,
      widowedTransferPct: 0,
      homeToDescendants: true,
    });
    expect(r.rnrbLostByPensionInclusion).toBeGreaterThan(0);
    expect(r.delta).toBeGreaterThan(0);
    // Effective marginal rate exceeds the headline 40% because of RNRB taper knock-on
    expect(r.effectiveMarginalRate).toBeGreaterThan(40);
  });

  it("estate well under threshold, small pension: no RNRB loss, standard 40% marginal rate", () => {
    const r = pensionsIht2027Delta({
      estateExPension: 100_000,
      pensionPot: 50_000,
      married: false,
      widowedTransferPct: 0,
      homeToDescendants: true,
    });
    expect(r.rnrbLostByPensionInclusion).toBe(0);
    // Both estateExPension and withPension are under the NRB+RNRB threshold -> no tax at all
    expect(r.delta).toBe(0);
  });

  it("delta is never negative (adding a pension never reduces IHT)", () => {
    const r = pensionsIht2027Delta({
      estateExPension: 500_000,
      pensionPot: 200_000,
      married: false,
      widowedTransferPct: 0,
      homeToDescendants: true,
    });
    expect(r.delta).toBeGreaterThanOrEqual(0);
    expect(Number.isFinite(r.ihtNow)).toBe(true);
    expect(Number.isFinite(r.iht2027)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Per-tool compute smoke tests
// ---------------------------------------------------------------------------

function expectFiniteRows(rows?: { value: string }[]) {
  expect(rows).toBeDefined();
  for (const row of rows!) {
    expect(row.value).not.toContain("NaN");
    expect(row.value).not.toContain("undefined");
  }
}

describe("Tool - pensions-iht-2027-estimator", () => {
  it("default inputs produce finite headline and rows", () => {
    const r = pensionsIht2027Estimator.compute({
      estateExPension: 400_000,
      pensionPot: 300_000,
      maritalStatus: "single",
      homeToDescendants: true,
      widowedTransferPct: 100,
    });
    expect(r.headline.value).not.toContain("NaN");
    expectFiniteRows(r.rows);
  });
});

describe("Tool - probate-timeline-estimator", () => {
  it("default inputs give a positive month range", () => {
    const r = probateTimelineEstimator.compute({
      willExists: true,
      ihtPayable: "none",
      complexity: "average",
      applicationStopped: "no",
    });
    expect(r.headline.value).toMatch(/\d+(\.\d+)? to \d+(\.\d+)?\s*months/);
    expectFiniteRows(r.rows);
  });

  it("no will adds an extra delay row", () => {
    const r = probateTimelineEstimator.compute({
      willExists: false,
      ihtPayable: "iht400",
      complexity: "complex",
      applicationStopped: "yes",
    });
    const delayRow = r.rows!.find((row) => row.label.includes("No will"));
    expect(delayRow).toBeDefined();
  });
});

describe("Tool - iht-threshold-calculator", () => {
  it("estate within threshold: zero IHT, good tone", () => {
    const r = ihtThresholdCalculator.compute({
      estateValue: 400_000,
      maritalStatus: "single",
      homeToDescendants: true,
      widowedTransferPct: 0,
      charityTenPct: false,
    });
    expect(r.headline.value).toBe("£0");
    expect(r.headline.tone).toBe("good");
  });

  it("estate above threshold: positive IHT due", () => {
    const r = ihtThresholdCalculator.compute({
      estateValue: 900_000,
      maritalStatus: "single",
      homeToDescendants: true,
      widowedTransferPct: 0,
      charityTenPct: false,
    });
    // taxable = 900,000 - 500,000 = 400,000; IHT = 160,000
    expect(r.headline.value).toBe("£160,000");
    expectFiniteRows(r.rows);
  });
});

describe("Tool - probate-cost-calculator", () => {
  it("DIY route with no property: low cost, court fee only", () => {
    const r = probateCostCalculator.compute({
      estateValue: 200_000,
      route: "diy",
      propertyInEstate: false,
      iht400Needed: false,
      foreignAssets: false,
    });
    expectFiniteRows(r.rows);
    expect(r.headline.value).toMatch(/£/);
  });

  it("estate at or under £5,000 threshold: no probate fee row shown as £0", () => {
    const r = probateCostCalculator.compute({
      estateValue: 4_000,
      route: "diy",
      propertyInEstate: false,
      iht400Needed: false,
      foreignAssets: false,
    });
    const feeRow = r.rows!.find((row) => row.label.includes("Probate application fee"));
    expect(feeRow?.value).toBe("£0, exempt");
  });
});

describe("Tool - do-i-need-probate-checker", () => {
  it("sole property triggers a positive-probate-needed verdict", () => {
    const r = doINeedProbateChecker.compute({
      soleProperty: true,
      jointProperty: "none",
      bankTotalSole: 15_000,
      premiumBonds: false,
      sharesOrInvestments: false,
      everythingToSpouseJointly: false,
    });
    expect(r.verdict?.text).toBe("Probate is very likely needed");
    expect(r.verdict?.positive).toBe(false);
  });

  it("everything jointly held, no property, low balance: probably not needed", () => {
    const r = doINeedProbateChecker.compute({
      soleProperty: false,
      jointProperty: "joint-tenants",
      bankTotalSole: 2_000,
      premiumBonds: false,
      sharesOrInvestments: false,
      everythingToSpouseJointly: true,
    });
    expect(r.verdict?.text).toBe("Probate is probably not needed");
    expect(r.verdict?.positive).toBe(true);
  });
});

describe("Tool - probate-diy-vs-solicitor", () => {
  it("no red flags: DIY/fixed-fee recommended", () => {
    const r = probateDiyVsSolicitor.compute({
      estateValue: 300_000,
      disputeRisk: false,
      insolvent: false,
      foreignAssets: false,
      iht400Needed: false,
      trustsInvolved: false,
    });
    expect(r.verdict?.positive).toBe(true);
    expectFiniteRows(r.rows);
  });

  it("dispute risk + IHT400: specialist recommended", () => {
    const r = probateDiyVsSolicitor.compute({
      estateValue: 800_000,
      disputeRisk: true,
      insolvent: false,
      foreignAssets: false,
      iht400Needed: true,
      trustsInvolved: false,
    });
    expect(r.verdict?.positive).toBe(false);
    expect(r.verdict?.text).toBe("Specialist support recommended");
  });
});

describe("Tool - making-a-will-checklist", () => {
  it("children + property + blended family produce guardianship and trust rows", () => {
    const r = makingAWillChecklist.compute({
      ownProperty: true,
      children: true,
      blendedFamily: true,
      businessAssets: false,
      foreignAssets: false,
      previousWill: false,
    });
    expect(r.verdict?.positive).toBe(true);
    const guardianRow = r.rows!.find((row) => row.label.includes("guardian"));
    const blendedRow = r.rows!.find((row) => row.label.includes("blended family"));
    expect(guardianRow).toBeDefined();
    expect(blendedRow).toBeDefined();
    expectFiniteRows(r.rows);
  });

  it("minimal circumstances still produce the baseline signing/storage items", () => {
    const r = makingAWillChecklist.compute({
      ownProperty: false,
      children: false,
      blendedFamily: false,
      businessAssets: false,
      foreignAssets: false,
      previousWill: false,
    });
    const signRow = r.rows!.find((row) => row.label === "Sign correctly");
    expect(signRow).toBeDefined();
  });
});
