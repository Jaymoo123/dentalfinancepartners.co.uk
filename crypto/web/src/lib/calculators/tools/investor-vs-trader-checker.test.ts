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

  // HP32 / rates_ledger keys class4_nic_main_rate + class4_nic_upper_rate: Class 4
  // NIC is the extra cost that makes trading treatment worse than CGT, so the
  // trading-outcome copy must never quote income tax alone.
  it("names Class 4 NIC wherever it prices the trading outcome (HP32)", () => {
    const trading = investorVsTraderChecker.compute({ frequency: "intensive", organised: "yes", primaryIncome: "yes" });
    expect(trading.note).toMatch(/Class 4 National Insurance/);
    expect(trading.note).toContain("6%");
    expect(trading.note).toContain("2%");
    const copy = [investorVsTraderChecker.metaDescription, ...investorVsTraderChecker.explainer.paragraphs].join(" ");
    for (const m of copy.match(/up to 45%[^.]*\./g) ?? []) {
      expect(m).toMatch(/Class 4|NIC|National Insurance/);
    }
  });

  it("all three badges = uncertain, specialist review", () => {
    const result = investorVsTraderChecker.compute({ frequency: "intensive", organised: "yes", primaryIncome: "yes" });
    expect(result.verdict?.text).toBe("Uncertain: specialist review recommended");
    expect(result.verdict?.positive).toBe(false);
  });
});
