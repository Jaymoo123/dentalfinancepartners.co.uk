import { describe, it, expect } from "vitest";
import { humaniseKey, formatValue } from "./worked-example-format";

describe("worked-example result rows", () => {
  // The defect: readers saw the raw config key, "monthlyDrawings: 5159".
  it("humanises camelCase keys, preserving acronyms", () => {
    expect(humaniseKey("monthlyDrawings")).toBe("Monthly drawings");
    expect(humaniseKey("personalAllowance")).toBe("Personal allowance");
    expect(humaniseKey("class4NI")).toBe("Class 4 NI");
    expect(humaniseKey("nhsSuper")).toBe("NHS super");
  });

  it("formats money keys as GBP and leaves everything else alone", () => {
    expect(formatValue("monthlyDrawings", 5159)).toBe("£5,159");
    expect(formatValue("incomeTax", 39432)).toBe("£39,432");
    expect(formatValue("taxReservePct", 0)).toBe("0");
    expect(formatValue("studentLoanPlan", "none")).toBe("none");
  });

  it("never leaks a raw camelCase key into a rendered label", () => {
    for (const key of ["personalAllowance", "incomeTax", "class4NI", "nhsSuper", "netAnnual", "monthlyDrawings"]) {
      expect(humaniseKey(key)).not.toBe(key);
      expect(humaniseKey(key)).not.toMatch(/[a-z][A-Z]/);
    }
  });
});
