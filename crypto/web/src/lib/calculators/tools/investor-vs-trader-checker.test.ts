import { describe, it, expect } from "vitest";
import { investorVsTraderChecker } from "./investor-vs-trader-checker";

describe("investorVsTraderChecker", () => {
  it("occasional + not organised + not primary income = investor (high confidence)", () => {
    const result = investorVsTraderChecker.compute({ frequency: "occasional", organised: "no", primaryIncome: "no" });
    expect(result.verdict?.text).toBe("Investor (CGT)");
    expect(result.verdict?.positive).toBe(true);
  });

  it("intensive frequency alone = investor (most likely)", () => {
    const result = investorVsTraderChecker.compute({ frequency: "intensive", organised: "no", primaryIncome: "no" });
    expect(result.verdict?.text).toBe("Investor (CGT) most likely");
  });

  it("all three badges = uncertain, specialist review", () => {
    const result = investorVsTraderChecker.compute({ frequency: "intensive", organised: "yes", primaryIncome: "yes" });
    expect(result.verdict?.text).toBe("Uncertain: specialist review recommended");
    expect(result.verdict?.positive).toBe(false);
  });
});
