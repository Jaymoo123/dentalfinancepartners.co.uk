import { describe, it, expect } from "vitest";
import { cryptoDisclosureEstimator } from "./crypto-disclosure-estimator";

describe("cryptoDisclosureEstimator", () => {
  it("reasonable care band: 4 years, 0-30% penalty", () => {
    const result = cryptoDisclosureEstimator.compute({ behaviour: "reasonable", annualTaxUnpaid: 1000 });
    const years = result.rows?.find(r => r.label === "Years HMRC can assess");
    const penaltyMax = result.rows?.find(r => r.label === "Penalty range (max)");
    const penaltyMin = result.rows?.find(r => r.label === "Penalty range (min)");
    expect(years?.value).toBe("4 years");
    expect(penaltyMin?.value).toBe("£0");
    expect(penaltyMax?.value).toBe("£1,200"); // 4000 * 0.3
  });

  it("deliberate band: 20 years, 20-70% penalty", () => {
    const result = cryptoDisclosureEstimator.compute({ behaviour: "deliberate", annualTaxUnpaid: 2000 });
    const years = result.rows?.find(r => r.label === "Years HMRC can assess");
    const penaltyMin = result.rows?.find(r => r.label === "Penalty range (min)");
    const penaltyMax = result.rows?.find(r => r.label === "Penalty range (max)");
    expect(years?.value).toBe("20 years");
    expect(penaltyMin?.value).toBe("£8,000"); // 40000 * 0.2
    expect(penaltyMax?.value).toBe("£28,000"); // 40000 * 0.7
  });
});
