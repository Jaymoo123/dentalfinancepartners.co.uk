import { describe, it, expect } from "vitest";
import { stakingMiningIncomeEstimator } from "./staking-mining-income-estimator";

describe("stakingMiningIncomeEstimator", () => {
  it("income within £1,000 allowance: zero tax", () => {
    const result = stakingMiningIncomeEstimator.compute({ stakingMiningIncome: 800, otherIncome: 20000 });
    expect(result.headline.value).toBe("£0");
  });

  it("income above allowance, all in basic rate band", () => {
    // other income £20k, staking £5k: net staking £4k, marginal rate 20%
    const result = stakingMiningIncomeEstimator.compute({ stakingMiningIncome: 5000, otherIncome: 20000 });
    const tax = result.rows?.find(r => r.label === "Estimated income tax");
    expect(tax?.value).toBe("£800"); // 4000 * 0.20
  });

  it("income tips into higher rate band", () => {
    // other income £49k (taxable £36,430), staking £5k net £4k: some at 20%, rest at 40%
    const result = stakingMiningIncomeEstimator.compute({ stakingMiningIncome: 5000, otherIncome: 49000 });
    const tax = result.rows?.find(r => r.label === "Estimated income tax");
    // 36430 is within basic band (37700); remaining band = 1270; so 1270*0.20 + 2730*0.40 = 254 + 1092 = 1346
    expect(tax?.value).toBe("£1,346");
  });
});
