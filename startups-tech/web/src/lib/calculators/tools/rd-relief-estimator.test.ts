// Golden-figure tests are in __tests__/rd-relief-estimator.test.ts
// This file kept as a smoke test for the tool's basic contract.
import { describe, it, expect } from "vitest";
import { rdReliefEstimator } from "./rd-relief-estimator";

describe("rdReliefEstimator smoke", () => {
  it("returns a headline value for profitable input", () => {
    const result = rdReliefEstimator.compute({
      qualifyingExpenditure: 100000,
      staffCost: 70000,
      profitPosition: "profitable",
      totalExpenditure: 200000,
      ctRate: "25",
    });
    expect(result.headline.value).toBe("£15,000");
  });

  it("returns £0 for zero spend", () => {
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
