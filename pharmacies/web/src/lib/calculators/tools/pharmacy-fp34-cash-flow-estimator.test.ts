import { describe, it, expect } from "vitest";
import { pharmacyFp34CashFlowEstimator } from "./pharmacy-fp34-cash-flow-estimator";

/**
 * Hand-computed golden values.
 * monthlyClaimValue = items * avgReimbursement
 * advanceAmount = monthlyClaimValue * (advancePct/100)
 * workingCapitalGap = monthlyClaimValue - advanceAmount
 * steadyStateCash = monthlyClaimValue (advance + net settlement)
 */

describe("pharmacyFp34CashFlowEstimator", () => {
  it("standard case: 2000 items, £10, 50% advance, 2-month lag", () => {
    // monthly = £20,000; advance = £10,000; gap = £10,000
    const result = pharmacyFp34CashFlowEstimator.compute({
      monthlyItems: 2_000,
      avgReimbursement: 10,
      advancePct: 50,
      paymentLagMonths: 2,
    });
    const claimRow = result.rows?.find((r) => r.label === "Monthly claim value (illustrative)");
    const advanceRow = result.rows?.find((r) => r.label === "Advance on account (50%)");
    const gapRow = result.rows?.find((r) => r.label === "Working-capital gap to bridge");
    expect(claimRow?.value).toBe("£20,000");
    expect(advanceRow?.value).toBe("£10,000");
    expect(gapRow?.value).toBe("£10,000");
    expect(result.headline.value).toBe("£10,000");
  });

  it("40% advance: gap = 60% of claim", () => {
    // 1000 items * £8 = £8,000; advance = £3,200; gap = £4,800
    const result = pharmacyFp34CashFlowEstimator.compute({
      monthlyItems: 1_000,
      avgReimbursement: 8,
      advancePct: 40,
      paymentLagMonths: 2,
    });
    const claimRow = result.rows?.find((r) => r.label === "Monthly claim value (illustrative)");
    const gapRow = result.rows?.find((r) => r.label === "Working-capital gap to bridge");
    expect(claimRow?.value).toBe("£8,000");
    expect(gapRow?.value).toBe("£4,800");
  });

  it("100% advance: zero working-capital gap", () => {
    // advance = full claim → gap = £0
    const result = pharmacyFp34CashFlowEstimator.compute({
      monthlyItems: 3_000,
      avgReimbursement: 12,
      advancePct: 100,
      paymentLagMonths: 2,
    });
    const gapRow = result.rows?.find((r) => r.label === "Working-capital gap to bridge");
    expect(gapRow?.value).toBe("£0");
    expect(result.headline.value).toBe("£0");
  });

  it("0% advance: gap equals full monthly claim", () => {
    // 500 items * £20 = £10,000; advance = £0; gap = £10,000
    const result = pharmacyFp34CashFlowEstimator.compute({
      monthlyItems: 500,
      avgReimbursement: 20,
      advancePct: 0,
      paymentLagMonths: 2,
    });
    const claimRow = result.rows?.find((r) => r.label === "Monthly claim value (illustrative)");
    const gapRow = result.rows?.find((r) => r.label === "Working-capital gap to bridge");
    expect(claimRow?.value).toBe("£10,000");
    expect(gapRow?.value).toBe("£10,000");
  });

  it("settlement row label includes lag months", () => {
    const result = pharmacyFp34CashFlowEstimator.compute({
      monthlyItems: 1_000,
      avgReimbursement: 10,
      advancePct: 50,
      paymentLagMonths: 3,
    });
    const settlementRow = result.rows?.find((r) =>
      r.label.includes("Full settlement") && r.label.includes("+3"),
    );
    expect(settlementRow).toBeDefined();
    expect(settlementRow?.value).toBe("£10,000");
  });
});
