import { describe, it, expect } from "vitest";
import { rdReliefEstimator } from "../rd-relief-estimator";

// Golden figures from the brief (calc-rd-relief-estimator.md, HP1, HP2)
// HP1: Q=100000, 25% CT -> gross 20000, net 15000
// HP1: Q=100000, 19% CT -> gross 20000, net 16200
// HP2: Q=100000, ERIS -> 100000 * 1.86 * 0.145 = 26970

describe("rdReliefEstimator golden figures", () => {
  it("HP1 merged scheme: £100k at 25% CT gives gross £20,000 and net £15,000", () => {
    const result = rdReliefEstimator.compute({
      qualifyingExpenditure: 100000,
      staffCost: 70000,
      profitPosition: "profitable",
      totalExpenditure: 200000,
      ctRate: "25",
    });
    const gross = result.rows?.find((r) => r.label.includes("gross credit"));
    const net = result.rows?.find((r) => r.label.includes("Net benefit"));
    expect(gross?.value).toBe("£20,000");
    expect(net?.value).toBe("£15,000");
    expect(result.headline.value).toBe("£15,000");
  });

  it("HP1 merged scheme: £100k at 19% CT gives gross £20,000 and net £16,200", () => {
    const result = rdReliefEstimator.compute({
      qualifyingExpenditure: 100000,
      staffCost: 70000,
      profitPosition: "profitable",
      totalExpenditure: 200000,
      ctRate: "19",
    });
    const gross = result.rows?.find((r) => r.label.includes("gross credit"));
    const net = result.rows?.find((r) => r.label.includes("Net benefit"));
    expect(gross?.value).toBe("£20,000");
    expect(net?.value).toBe("£16,200");
    expect(result.headline.value).toBe("£16,200");
  });

  it("HP1 marginal CT: £100k shows range £15,000 to £16,200", () => {
    const result = rdReliefEstimator.compute({
      qualifyingExpenditure: 100000,
      staffCost: 70000,
      profitPosition: "profitable",
      totalExpenditure: 200000,
      ctRate: "marginal",
    });
    expect(result.headline.value).toBe("£15,000 to £16,200");
  });

  it("HP2 ERIS: £100k qualifying, loss-making, 30%+ intensity gives payable credit £26,970", () => {
    // intensity: 100000 / 300000 = 33.3% >= 30% -> ERIS
    const result = rdReliefEstimator.compute({
      qualifyingExpenditure: 100000,
      staffCost: 70000,
      profitPosition: "loss",
      totalExpenditure: 300000,
      ctRate: "25",
    });
    expect(result.headline.value).toBe("£26,970");
    const erisRow = result.rows?.find((r) => r.label.includes("ERIS payable credit"));
    expect(erisRow?.value).toBe("£26,970");
    const enhancedRow = result.rows?.find((r) => r.label.includes("Enhanced expenditure"));
    expect(enhancedRow?.value).toBe("£186,000");
  });

  it("HP2 ERIS route also shows merged-scheme alternative", () => {
    const result = rdReliefEstimator.compute({
      qualifyingExpenditure: 100000,
      staffCost: 70000,
      profitPosition: "loss",
      totalExpenditure: 300000,
      ctRate: "25",
    });
    const mergedGrossRow = result.rows?.find((r) => r.label.includes("Merged-scheme alternative"));
    expect(mergedGrossRow?.value).toBe("£20,000");
  });

  it("loss-making below 30% intensity routes to merged scheme with shortfall note", () => {
    // intensity: 100000 / 500000 = 20% < 30% -> merged
    const result = rdReliefEstimator.compute({
      qualifyingExpenditure: 100000,
      staffCost: 70000,
      profitPosition: "loss",
      totalExpenditure: 500000,
      ctRate: "25",
    });
    expect(result.headline.value).toBe("£15,000");
    expect(result.note).toContain("30%");
  });

  it("HP3 claim-notification warning always present", () => {
    const result = rdReliefEstimator.compute({
      qualifyingExpenditure: 100000,
      staffCost: 70000,
      profitPosition: "profitable",
      totalExpenditure: 200000,
      ctRate: "25",
    });
    expect(result.note).toContain("6 months");
    expect(result.note).toContain("HP3");
  });

  it("PAYE-cap flag fires when staff cost < 50% of qualifying spend", () => {
    const result = rdReliefEstimator.compute({
      qualifyingExpenditure: 100000,
      staffCost: 30000, // 30% < 50% -> flag
      profitPosition: "loss",
      totalExpenditure: 300000,
      ctRate: "25",
    });
    expect(result.note).toContain("PAYE/NIC cap");
  });

  it("PAYE-cap flag absent when staff cost >= 50% of qualifying spend", () => {
    const result = rdReliefEstimator.compute({
      qualifyingExpenditure: 100000,
      staffCost: 60000, // 60% >= 50% -> no flag
      profitPosition: "loss",
      totalExpenditure: 300000,
      ctRate: "25",
    });
    expect(result.note).not.toContain("PAYE/NIC cap");
  });

  it("zero qualifying spend returns £0 everywhere", () => {
    const result = rdReliefEstimator.compute({
      qualifyingExpenditure: 0,
      staffCost: 0,
      profitPosition: "profitable",
      totalExpenditure: 200000,
      ctRate: "25",
    });
    expect(result.headline.value).toBe("£0");
  });
});
