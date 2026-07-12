import { describe, it, expect } from "vitest";
import { checkVat } from "./vat-checker";

/**
 * Golden-figure suite for food and drink VAT checker.
 * Decision tree from VAT Notice 709/1 (Catering, take-away food) and
 * VAT Notice 701/14 (Food products).
 * Source: https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027
 *         https://www.gov.uk/guidance/vat-on-food-and-drink (VAT 709/1 / 701/14)
 */

describe("checkVat — eat-in (always 20%)", () => {
  it("cold food eat-in: 20% catering supply", () => {
    // All eat-in is a catering supply, standard-rated regardless of temperature.
    // VAT Notice 709/1.
    const r = checkVat("cold-food", false, "eat-in");
    expect(r.vatRate).toBe(20);
  });

  it("hot food eat-in: 20%", () => {
    const r = checkVat("hot-food", true, "eat-in");
    expect(r.vatRate).toBe(20);
  });

  it("cold sandwich eat-in: 20%", () => {
    // Zero-rated when taken away, but standard when eaten in.
    const r = checkVat("cold-food", false, "eat-in");
    expect(r.vatRate).toBe(20);
  });
});

describe("checkVat — hot takeaway/delivery (always 20%)", () => {
  it("hot food takeaway (chips, cooked meal): 20%", () => {
    // VAT Notice 709/1: hot take-away food is standard-rated.
    const r = checkVat("hot-food", true, "takeaway");
    expect(r.vatRate).toBe(20);
  });

  it("hot drink takeaway (coffee): 20%", () => {
    const r = checkVat("hot-drink", true, "takeaway");
    expect(r.vatRate).toBe(20);
  });

  it("hot food delivery: 20%", () => {
    const r = checkVat("hot-food", true, "delivery");
    expect(r.vatRate).toBe(20);
  });
});

describe("checkVat — cold takeaway non-excepted (0%)", () => {
  it("cold food takeaway (sandwich, salad): 0%", () => {
    // Cold non-excepted food for takeaway is zero-rated. VAT Notice 701/14 Group 1.
    const r = checkVat("cold-food", false, "takeaway");
    expect(r.vatRate).toBe(0);
  });

  it("cold food delivery (prepared salad): 0%", () => {
    const r = checkVat("cold-food", false, "delivery");
    expect(r.vatRate).toBe(0);
  });
});

describe("checkVat — excepted items (always 20%)", () => {
  it("confectionery takeaway: 20% (excepted item)", () => {
    // Confectionery cannot be zero-rated. VAT Notice 701/14 Group 1.
    const r = checkVat("confectionery", false, "takeaway");
    expect(r.vatRate).toBe(20);
  });

  it("crisps and snacks takeaway: 20%", () => {
    const r = checkVat("crisps-snacks", false, "takeaway");
    expect(r.vatRate).toBe(20);
  });

  it("ice cream takeaway: 20%", () => {
    const r = checkVat("ice-cream", false, "takeaway");
    expect(r.vatRate).toBe(20);
  });

  it("cold drink (soft drink) takeaway: 20%", () => {
    // Cold non-dairy soft drinks are excepted items, standard-rated.
    const r = checkVat("cold-drink", false, "takeaway");
    expect(r.vatRate).toBe(20);
  });

  it("confectionery eat-in: 20%", () => {
    const r = checkVat("confectionery", false, "eat-in");
    expect(r.vatRate).toBe(20);
  });
});

describe("checkVat — alcohol (always 20%)", () => {
  it("alcohol eat-in: 20%", () => {
    const r = checkVat("alcohol", false, "eat-in", true);
    expect(r.vatRate).toBe(20);
  });

  it("alcohol takeaway: 20%", () => {
    const r = checkVat("alcohol", false, "takeaway", true);
    expect(r.vatRate).toBe(20);
  });
});

describe("checkVat — rationale and ref populated", () => {
  it("returns non-empty rationale and vatNoticeRef for each branch", () => {
    const cases: Parameters<typeof checkVat>[] = [
      ["cold-food", false, "takeaway"],
      ["hot-food", true, "takeaway"],
      ["cold-food", false, "eat-in"],
      ["confectionery", false, "takeaway"],
      ["alcohol", false, "takeaway", true],
    ];
    for (const c of cases) {
      const r = checkVat(...c);
      expect(r.rationale.length).toBeGreaterThan(10);
      expect(r.vatNoticeRef.length).toBeGreaterThan(5);
    }
  });
});
