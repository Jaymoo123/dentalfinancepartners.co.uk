import { describe, it, expect } from "vitest";
import { cryptoCgtEstimator } from "./crypto-cgt-estimator";

describe("cryptoCgtEstimator", () => {
  it("basic-rate whole: gain fully within band", () => {
    // income £20k, gain £10k: netGain £7k (after £3k AEA), remainingBand £17,700, all at 18%
    const result = cryptoCgtEstimator.compute({ totalGain: 10000, otherTaxableIncome: 20000 });
    const tax = result.rows?.find(r => r.label === "Estimated CGT");
    expect(tax?.value).toBe("£1,260"); // 7000 * 0.18
  });

  it("straddles £37,700 band ceiling", () => {
    // income £30k, gain £20k: netGain £17k, remainingBand £7,700, so 7700 at 18% + 9300 at 24%
    const result = cryptoCgtEstimator.compute({ totalGain: 20000, otherTaxableIncome: 30000 });
    const tax = result.rows?.find(r => r.label === "Estimated CGT");
    expect(tax?.value).toBe("£3,618"); // 1386 + 2232
  });

  it("higher-rate flat: income already above band ceiling", () => {
    // income £60k, gain £15k: netGain £12k, all at 24%
    const result = cryptoCgtEstimator.compute({ totalGain: 15000, otherTaxableIncome: 60000 });
    const tax = result.rows?.find(r => r.label === "Estimated CGT");
    expect(tax?.value).toBe("£2,880"); // 12000 * 0.24
  });

  it("gain within AEA returns zero tax", () => {
    const result = cryptoCgtEstimator.compute({ totalGain: 2000, otherTaxableIncome: 30000 });
    expect(result.headline.value).toBe("£0");
  });
});
