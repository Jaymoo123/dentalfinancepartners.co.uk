import { describe, it, expect } from "vitest";
import { outsideIr35TakeHomeCalculator } from "./tools/outside-ir35-take-home-calculator";
import { insideIr35TakeHomeCalculator } from "./tools/inside-ir35-take-home-calculator";
import { umbrellaVsLimitedCalculator } from "./tools/umbrella-vs-limited-calculator";
import { dividendTaxCalculator } from "./tools/dividend-tax-calculator";
import { corporationTaxCalculator } from "./tools/corporation-tax-calculator";
import { contractorSalaryDividendCalculator } from "./tools/contractor-salary-dividend-calculator";
import { contractorDayRateCalculator } from "./tools/contractor-day-rate-calculator";
import { managedServiceCompanyRiskChecker } from "./tools/managed-service-company-risk-checker";
import { ir35StatusIndicator } from "./tools/ir35-status-indicator";
import { limitedTakeHome, umbrellaTakeHome } from "./tax2026";

/** Parse a gbp()-formatted string like "£71,821" back to a number. */
function parseGbp(s: string): number {
  return Number(s.replace(/[^0-9.-]/g, ""));
}

describe("outsideIr35TakeHomeCalculator (signature golden)", () => {
  const v = { dayRate: 500, billableDays: 240, salary: "12570", annualExpenses: 6000 };

  it("net take-home headline ≈ £71,821", () => {
    const r = outsideIr35TakeHomeCalculator.compute(v);
    expect(Math.abs(parseGbp(r.headline.value) - 71821)).toBeLessThanOrEqual(2);
  });

  it("matches the limitedTakeHome primitive to within £2", () => {
    const primitive = limitedTakeHome({ turnover: 500 * 240, salary: 12570, expenses: 6000 });
    expect(primitive.netTakeHome).toBeCloseTo(71820.95, 0);
    expect(parseGbp(r(v).headline.value)).toBeCloseTo(Math.round(primitive.netTakeHome), 2);
  });

  function r(values: typeof v) {
    return outsideIr35TakeHomeCalculator.compute(values);
  }
});

describe("insideIr35TakeHomeCalculator (signature golden)", () => {
  const v = { dayRate: 500, billableDays: 240, umbrellaMargin: 1200 };

  it("net take-home headline ≈ £69,890", () => {
    const r = insideIr35TakeHomeCalculator.compute(v);
    expect(Math.abs(parseGbp(r.headline.value) - 69890)).toBeLessThanOrEqual(2);
  });

  it("matches the umbrellaTakeHome primitive to within £2", () => {
    const primitive = umbrellaTakeHome({ assignmentIncome: 500 * 240, umbrellaMargin: 1200 });
    expect(primitive.netTakeHome).toBeCloseTo(69889.87, 0);
    const headline = insideIr35TakeHomeCalculator.compute(v).headline.value;
    expect(parseGbp(headline)).toBeCloseTo(Math.round(primitive.netTakeHome), 2);
  });
});

describe("umbrellaVsLimitedCalculator", () => {
  it("headline gap equals limited net minus umbrella net for the same income", () => {
    const v = {
      dayRate: 500,
      billableDays: 240,
      salary: "12570",
      annualExpenses: 6000,
      umbrellaMargin: 1200,
    };
    const ltd = limitedTakeHome({ turnover: 120000, salary: 12570, expenses: 6000 });
    const umb = umbrellaTakeHome({ assignmentIncome: 120000, umbrellaMargin: 1200 });
    const expectedGap = ltd.netTakeHome - umb.netTakeHome;
    const r = umbrellaVsLimitedCalculator.compute(v);
    expect(parseGbp(r.headline.value)).toBeCloseTo(Math.round(expectedGap), 2);
    expect(expectedGap).toBeGreaterThan(0); // outside IR35 keeps more
  });
});

describe("dividendTaxCalculator", () => {
  it("£12,570 salary + £50,000 dividends matches the personalTax dividend figure", () => {
    // PA fully used by salary. £50,000 dividends taxable; £37,700 fills the basic
    // band (£12,570 to £50,270), £12,300 spills into the higher band.
    // £500 allowance is 0%-rated from the basic band up.
    // basic: (37,700 - 500) * 10.75% = 3,999 ; higher: 12,300 * 35.75% = 4,397.25
    const r = dividendTaxCalculator.compute({ salary: 12570, dividends: 50000 });
    const expected = 37200 * 0.1075 + 12300 * 0.3575; // 8,396.25
    expect(parseGbp(r.headline.value)).toBeCloseTo(Math.round(expected), 0);
  });
});

describe("corporationTaxCalculator", () => {
  it("£80,000 profit, no associates, sits in the marginal band", () => {
    const r = corporationTaxCalculator.compute({ profit: 80000, associatedCompanies: 0 });
    // 25% * 80,000 - 3/200 * (250,000 - 80,000) = 20,000 - 2,550 = 17,450
    expect(parseGbp(r.headline.value)).toBeCloseTo(17450, 0);
  });

  it("19% small profits rate at or below £50,000", () => {
    const r = corporationTaxCalculator.compute({ profit: 50000, associatedCompanies: 0 });
    expect(parseGbp(r.headline.value)).toBeCloseTo(9500, 0);
  });
});

describe("contractorSalaryDividendCalculator", () => {
  it("reports the better of the £12,570 and £6,708 salary nets", () => {
    const v = { dayRate: 500, billableDays: 240, annualExpenses: 6000 };
    const high = limitedTakeHome({ turnover: 120000, salary: 12570, expenses: 6000 });
    const low = limitedTakeHome({ turnover: 120000, salary: 6708, expenses: 6000 });
    const best = Math.max(high.netTakeHome, low.netTakeHome);
    const r = contractorSalaryDividendCalculator.compute(v);
    expect(parseGbp(r.headline.value)).toBeCloseTo(Math.round(best), 2);
  });
});

// --- Golden tests for the three newly-wired tools ---

describe("contractorDayRateCalculator (golden)", () => {
  // Defaults: £500/day, 220 days, salary £12,570, expenses £6,000, margin £1,200
  // Engine-computed values (verified 2026-07-17 against tax2026 primitives):
  //   income = 110,000; ltd.netTakeHome = 67,099; umb.netTakeHome = 65,570
  //   gap = 1,529; eqDayRate = 514 (ceiling of bisection result)
  const v = {
    dayRate: 500,
    billableDays: 220,
    salary: "12570",
    annualExpenses: 6000,
    umbrellaMargin: 1200,
  };

  it("outside IR35 headline matches limitedTakeHome (£67,099)", () => {
    const r = contractorDayRateCalculator.compute(v);
    const primitive = limitedTakeHome({ turnover: 110000, salary: 12570, expenses: 6000 });
    expect(parseGbp(r.headline.value)).toBeCloseTo(Math.round(primitive.netTakeHome), 0);
    expect(parseGbp(r.headline.value)).toBe(67099);
  });

  it("inside IR35 (umbrella) net matches umbrellaTakeHome (£65,570)", () => {
    const r = contractorDayRateCalculator.compute(v);
    const primitive = umbrellaTakeHome({ assignmentIncome: 110000, umbrellaMargin: 1200 });
    // find umbrella row
    const umbRow = r.rows?.find((row) => row.label === "Inside IR35 net (umbrella)");
    expect(umbRow).toBeDefined();
    expect(parseGbp(umbRow!.value)).toBeCloseTo(Math.round(primitive.netTakeHome), 0);
    expect(parseGbp(umbRow!.value)).toBe(65570);
  });

  it("equalising inside day rate is £514/day (ceiling of bisection)", () => {
    const r = contractorDayRateCalculator.compute(v);
    const eqRow = r.rows?.find((row) => row.label === "Equalising inside day rate");
    expect(eqRow).toBeDefined();
    expect(eqRow!.value).toBe("£514/day");
  });
});

describe("managedServiceCompanyRiskChecker (golden)", () => {
  // HIGH case: mscBusiness=true + providerBenefits=true (one s.61B(1) factor is sufficient)
  const highInputs = {
    mscBusiness: true,
    providerBenefits: true,
    providerInfluencesFinances: false,
    providerControlsCompany: false,
    providerFacilitates: false,
    youControl: true,
  };

  it("returns HIGH band when mscBusiness and at least one s.61B(1) factor", () => {
    const r = managedServiceCompanyRiskChecker.compute(highInputs);
    expect(r.headline.value).toBe("HIGH");
    expect(r.headline.tone).toBe("warn");
    expect(r.verdict?.positive).toBe(false);
  });

  it("LOW band when no involvement factors and provider not an MSC business", () => {
    const lowInputs = {
      mscBusiness: false,
      providerBenefits: false,
      providerInfluencesFinances: false,
      providerControlsCompany: false,
      providerFacilitates: false,
      youControl: true,
    };
    const r = managedServiceCompanyRiskChecker.compute(lowInputs);
    expect(r.headline.value).toBe("LOW");
    expect(r.headline.tone).toBe("good");
  });
});

describe("ir35StatusIndicator (golden)", () => {
  // GP locum profile: substitution=approval, mutuality=project, control=you,
  // sdc=no, equipment=yes, financialRisk=yes, partAndParcel=no
  // Score: 1+3+2+1+1+1+1 = 10/12 = 83% => outside
  const gpLocumInputs = {
    substitutionRight: "approval",
    mutuality: "project",
    controlOver: "you",
    sdc: "no",
    ownEquipment: "yes",
    financialRisk: "yes",
    partAndParcel: "no",
  };

  it("GP locum scores 83% and lands outside IR35", () => {
    const r = ir35StatusIndicator.compute(gpLocumInputs);
    expect(r.headline.value).toBe("Likely outside IR35");
    expect(r.headline.tone).toBe("good");
    const scoreRow = r.rows?.find((row) => row.label === "Weighted score (outside factors)");
    expect(scoreRow).toBeDefined();
    expect(scoreRow!.value).toContain("10 / 12");
    expect(scoreRow!.value).toContain("83%");
  });

  it("inside profile (no sub, ongoing MOO, client control) scores inside", () => {
    const insideInputs = {
      substitutionRight: "none",
      mutuality: "expected",
      controlOver: "client",
      sdc: "yes",
      ownEquipment: "no",
      financialRisk: "no",
      partAndParcel: "yes",
    };
    const r = ir35StatusIndicator.compute(insideInputs);
    expect(r.headline.value).toBe("Likely inside IR35");
    expect(r.headline.tone).toBe("warn");
  });
});
