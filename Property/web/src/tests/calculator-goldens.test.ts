/**
 * F2 golden tests — pinned to CURRENT compute outputs for every live generic tool.
 *
 * These are the regression net that makes re-pointing imports safe.
 * Rules:
 *  - All inputs are the tool's own field defaults (the "fresh page" state).
 *  - A figure that differs after re-point = STOP.
 *  - A stale figure vs the locked ground truths annotated below = STOP
 *    (record as user finding, never silent-fix).
 *
 * Ground truths (from spec + MEMORY):
 *   SL thresholds 2026/27: £26,065 / £28,470 / £32,745 (Scotland)
 *   EA £10,500 (employment allowance)
 *   FA-2026 WDA 14% + 40% FYA
 *   AMAP 55p first 10k from 2026/27
 *   April-2027 reducer 22%  (tool note should say "rising to 22% from 2027/28")
 *   CGT AEA £3,000; residential rates 18% / 24%
 *   Dividend allowance £500
 *   CT: 19% up to £50k, 25% above £250k
 *   SDLT additional surcharge 5%
 *   LBTT ADS 8%
 *   Property allowance £1,000
 *   Rent-a-room £7,500
 */

import { describe, it, expect } from "vitest";

// -----------------------------------------------------------------------
// Pure compute libs (no Next.js / React dependency)
// -----------------------------------------------------------------------
import { computeCgt } from "../lib/cgt";
import { additionalDwellingSdlt } from "../lib/sdlt";
import { corporationTax, corporationTaxEffectiveRate } from "../lib/corpTax";
import { computeDividendTax, DIV_BASIC, DIV_HIGHER } from "../lib/dividendTax";
import { computeLbtt } from "../lib/lbtt";
import { computeLtt } from "../lib/ltt";
import { firstTimeBuyerSdlt, marginalSdlt, STANDARD_SDLT_BANDS } from "../lib/sdlt";
import { gbp, pct } from "../lib/calculators/format";

// -----------------------------------------------------------------------
// Tool compute functions (via the tool configs)
// These use relative imports to stay out of Next.js module resolution.
// -----------------------------------------------------------------------
import { rentalIncomeTaxCalculator } from "../lib/calculators/tools/rental-income-tax-calculator";
import { rentalYieldCalculator } from "../lib/calculators/tools/rental-yield-calculator";
import { buyToLetCashflowCalculator } from "../lib/calculators/tools/buy-to-let-cashflow-calculator";
import { rentARoomReliefCalculator } from "../lib/calculators/tools/rent-a-room-relief-calculator";
import { propertyAllowanceChecker } from "../lib/calculators/tools/property-allowance-checker";
// Tools that call @/lib/* must be tested through the pure lib functions directly
// (the @/ alias resolves in the app but the tool configs carry compute fns).

// -----------------------------------------------------------------------
// Registry contract
// -----------------------------------------------------------------------
import { TOOLS, allTools, genericTools, getGenericTool, toolPath } from "../lib/calculators/registry";

// -----------------------------------------------------------------------
// Helper: build default values from a tool's fields
// -----------------------------------------------------------------------
function defaults(fields: { id: string; default: unknown }[]): Record<string, unknown> {
  const v: Record<string, unknown> = {};
  for (const f of fields) v[f.id] = f.default;
  return v;
}
type V = Record<string, number | string | boolean>;

// ============================================================
// 1. Registry contract (TL-01)
// ============================================================
describe("registry contract (TL-01)", () => {
  it("total fleet = 16 tools (5 bespoke + 11 generic)", () => {
    expect(TOOLS.length).toBe(16);
  });

  it("5 bespoke tools", () => {
    const bespoke = TOOLS.filter((t) => t.kind === "bespoke");
    expect(bespoke.length).toBe(5);
  });

  it("11 generic tools", () => {
    const generic = genericTools();
    expect(generic.length).toBe(11);
  });

  it("allTools returns 16 tools", () => {
    expect(allTools().length).toBe(16);
  });

  it("getGenericTool finds by slug", () => {
    const t = getGenericTool("rental-yield-calculator");
    expect(t).toBeDefined();
    expect(t?.slug).toBe("rental-yield-calculator");
  });

  it("getGenericTool returns undefined for bespoke slug", () => {
    expect(getGenericTool("stamp-duty-calculator")).toBeUndefined();
  });

  it("toolPath returns /calculators/<slug>", () => {
    expect(toolPath("rental-yield-calculator")).toBe("/calculators/rental-yield-calculator");
  });

  it("expected generic slugs are all present", () => {
    const slugs = genericTools().map((t) => t.slug);
    const expected = [
      "capital-gains-tax-calculator",
      "rental-income-tax-calculator",
      "rental-yield-calculator",
      "buy-to-let-cashflow-calculator",
      "lbtt-calculator-scotland",
      "ltt-calculator-wales",
      "first-time-buyer-stamp-duty-calculator",
      "corporation-tax-calculator",
      "dividend-tax-calculator",
      "rent-a-room-relief-calculator",
      "property-allowance-checker",
    ];
    for (const s of expected) {
      expect(slugs, `missing slug: ${s}`).toContain(s);
    }
  });

  it("expected bespoke slugs are all present", () => {
    const slugs = TOOLS.filter((t) => t.kind === "bespoke").map((t) => t.slug);
    const expected = [
      "stamp-duty-calculator",
      "section-24-calculator",
      "incorporation-cost-calculator",
      "mtd-checker",
      "portfolio-profitability-calculator",
    ];
    for (const s of expected) {
      expect(slugs, `missing bespoke slug: ${s}`).toContain(s);
    }
  });
});

// ============================================================
// 2. Format helpers
// ============================================================
describe("format helpers", () => {
  it("gbp formats with £ and commas", () => {
    expect(gbp(1234)).toBe("£1,234");
    expect(gbp(0)).toBe("£0");
    expect(gbp(1234567.89)).toBe("£1,234,568");
  });

  it("pct formats with default 1dp", () => {
    expect(pct(6.0)).toBe("6.0%");
    expect(pct(5.5, 1)).toBe("5.5%");
    expect(pct(0)).toBe("0.0%");
  });
});

// ============================================================
// 3. GOLDEN: Capital Gains Tax (at defaults)
// Defaults: salePrice=320000, purchasePrice=200000, costs=12000,
//           otherIncome=50000, aeaUsed=false
// ============================================================
describe("GOLDEN: capital-gains-tax-calculator (defaults)", () => {
  const r = computeCgt({
    salePrice: 320_000,
    purchasePrice: 200_000,
    costs: 12_000,
    otherIncome: 50_000,
    aeaUsed: false,
  });

  it("gain = 108000", () => expect(r.gain).toBe(108_000));
  it("AEA = 3000 (not used)", () => expect(r.aea).toBe(3_000));
  it("taxable gain = 105000", () => expect(r.taxableGain).toBe(105_000));

  // PA = 12570, so income above PA = 37430. Basic band = 37700, so unused = 270.
  it("at-basic (18%) = 270", () => expect(r.atBasic).toBe(270));
  it("at-higher (24%) = 104730", () => expect(r.atHigher).toBe(104_730));
  it("tax = gbp(gbp at basic + at higher)", () => {
    const expected = 270 * 0.18 + 104_730 * 0.24;
    expect(r.tax).toBeCloseTo(expected, 2);
  });
  it("headline gbp matches", () => {
    // 270*0.18 + 104730*0.24 = 48.6 + 25135.2 = 25183.8 → rounds to £25,184
    expect(gbp(r.tax)).toBe("£25,184");
  });
  it("effective rate < 25%", () => {
    expect(r.effectiveRate).toBeLessThan(25);
    expect(r.effectiveRate).toBeGreaterThan(20);
  });
});

describe("GOLDEN: CGT with AEA already used", () => {
  const r = computeCgt({
    salePrice: 320_000,
    purchasePrice: 200_000,
    costs: 12_000,
    otherIncome: 50_000,
    aeaUsed: true,
  });
  it("AEA = 0 when already used", () => expect(r.aea).toBe(0));
  it("taxable gain = 108000", () => expect(r.taxableGain).toBe(108_000));
  it("tax is higher than with AEA", () => expect(r.tax).toBeGreaterThan(25_000));
});

// ============================================================
// 4. GOLDEN: Rental Income Tax (at defaults)
// Defaults: rentalIncome=18000, expenses=3000, mortgageInterest=6000, band=higher
// ============================================================
describe("GOLDEN: rental-income-tax-calculator (defaults)", () => {
  const result = rentalIncomeTaxCalculator.compute(defaults(rentalIncomeTaxCalculator.fields) as V);

  it("profit = 15000 (18000 - 3000)", () => {
    // row: Rental profit (before mortgage interest)
    const row = result.rows?.find((r) => r.label.startsWith("Rental profit"));
    expect(row?.value).toBe("£15,000");
  });

  it("tax before credit = 6000 (15000 * 40%)", () => {
    const row = result.rows?.find((r) => r.label.startsWith("Tax before relief"));
    expect(row?.value).toBe("£6,000");
  });

  it("S24 credit = 1200 (6000 * 20%)", () => {
    const row = result.rows?.find((r) => r.label.startsWith("Section 24 credit"));
    expect(row?.value).toBe("−£1,200");
  });

  it("headline tax = 4800", () => {
    expect(result.headline.value).toBe("£4,800");
  });

  it("take-home = 4200 (15000 - 6000 - 4800)", () => {
    // takeHome = profit - mortgageInterest - tax = 15000 - 6000 - 4800 = 4200
    const row = result.rows?.find((r) => r.label.startsWith("Take-home"));
    expect(row?.value).toBe("£4,200");
  });

  it("note mentions rising to 22% from 2027/28", () => {
    // Ground truth: April-2027 reducer 22% - note must reflect this
    expect(result.note).toContain("22%");
    expect(result.note).toContain("2027/28");
  });
});

// ============================================================
// 5. GOLDEN: Rental Yield (at defaults)
// Defaults: propertyValue=250000, annualRent=15000, annualCosts=4000
// ============================================================
describe("GOLDEN: rental-yield-calculator (defaults)", () => {
  const result = rentalYieldCalculator.compute(defaults(rentalYieldCalculator.fields) as V);

  it("gross yield = 6.0%", () => {
    // 15000 / 250000 = 6%
    expect(result.headline.value).toBe("6.0%");
  });

  it("net yield shown in sub", () => {
    // net = (15000 - 4000) / 250000 = 11000/250000 = 4.4%
    expect(result.headline.sub).toBe("Net yield 4.4%");
  });

  it("net income = 11000", () => {
    const row = result.rows?.find((r) => r.label === "Net income before tax");
    expect(row?.value).toBe("£11,000");
  });

  it("monthly net = 917", () => {
    const row = result.rows?.find((r) => r.label === "Net income per month");
    expect(row?.value).toBe("£917"); // 11000/12 = 916.67 → rounds to 917
  });
});

// ============================================================
// 6. GOLDEN: Buy-to-Let Cashflow (at defaults)
// Defaults: monthlyRent=1200, monthlyMortgage=600, monthlyCosts=250
// ============================================================
describe("GOLDEN: buy-to-let-cashflow-calculator (defaults)", () => {
  const result = buyToLetCashflowCalculator.compute(defaults(buyToLetCashflowCalculator.fields) as V);

  it("monthly cashflow = 350 (1200 - 600 - 250)", () => {
    expect(result.headline.value).toBe("£350");
  });

  it("tone = good (positive cashflow)", () => {
    expect(result.headline.tone).toBe("good");
  });

  it("annual cashflow = 4200", () => {
    const row = result.rows?.find((r) => r.label === "Annual cashflow");
    expect(row?.value).toBe("£4,200");
  });
});

// ============================================================
// 7. GOLDEN: LBTT Scotland (at defaults)
// Defaults: price=250000, additional=true, firstTimeBuyer=false
// ============================================================
describe("GOLDEN: lbtt-calculator-scotland (defaults)", () => {
  const r = computeLbtt({ price: 250_000, additional: true, firstTimeBuyer: false });

  it("main LBTT for 250000 standard = 2100 (0 on 145k, 2% on 105k)", () => {
    // 0 on first 145000, 2% on 105000 = 2100
    expect(r.main).toBe(2_100);
  });

  it("ADS = 20000 (8% of 250000)", () => {
    expect(r.ads).toBe(20_000); // 250000 * 0.08 = 20000
  });

  it("total = 22100", () => {
    expect(r.total).toBe(22_100);
  });

  it("headline gbp = £22,100", () => {
    expect(gbp(r.total)).toBe("£22,100");
  });
});

describe("GOLDEN: LBTT first-time-buyer (no ADS)", () => {
  const r = computeLbtt({ price: 175_000, additional: false, firstTimeBuyer: true });
  it("FTB nil band to 175000 means main = 0", () => {
    expect(r.main).toBe(0);
  });
  it("no ADS for non-additional", () => {
    expect(r.ads).toBe(0);
  });
});

// ============================================================
// 8. GOLDEN: LTT Wales (at defaults)
// Defaults: price=250000, additional=true
// ============================================================
describe("GOLDEN: ltt-calculator-wales (defaults)", () => {
  const r = computeLtt({ price: 250_000, additional: true });

  it("higher rates: 5% on 180k + 8.5% on 70k", () => {
    // 180000 * 0.05 = 9000; 70000 * 0.085 = 5950; total = 14950
    expect(r.tax).toBe(14_950);
  });

  it("headline gbp = £14,950", () => {
    expect(gbp(r.tax)).toBe("£14,950");
  });

  it("effective rate for 250k higher = 5.98%", () => {
    expect(pct(r.effectiveRate)).toBe("6.0%"); // (14950/250000)*100 = 5.98 → 6.0%
  });
});

describe("GOLDEN: LTT Wales main rates (price=250000, additional=false)", () => {
  const r = computeLtt({ price: 250_000, additional: false });
  it("main rates: 0% on 225k, 6% on 25k = 1500", () => {
    expect(r.tax).toBe(1_500);
  });
});

// ============================================================
// 9. GOLDEN: First-Time Buyer SDLT (at defaults)
// Defaults: price=350000
// ============================================================
describe("GOLDEN: first-time-buyer-stamp-duty-calculator (defaults)", () => {
  const price = 350_000;
  const ftb = firstTimeBuyerSdlt(price);
  const standard = marginalSdlt(price, STANDARD_SDLT_BANDS);
  const saving = Math.max(0, standard - ftb);

  it("FTB SDLT = 2500 (0% on 300k, 5% on 50k)", () => {
    // 0 on 300000, 5% on 50000 = 2500
    expect(ftb).toBe(2_500);
  });

  it("standard SDLT = 7500 (0 on 125k, 2% on 125k, 5% on 100k)", () => {
    // 0 + 2500 + 5000 = 7500
    expect(standard).toBe(7_500);
  });

  it("saving = 5000", () => {
    expect(saving).toBe(5_000);
  });

  it("relief withdrawn above 500k", () => {
    const above = firstTimeBuyerSdlt(550_000);
    const standardAbove = marginalSdlt(550_000, STANDARD_SDLT_BANDS);
    expect(above).toBe(standardAbove);
  });
});

// ============================================================
// 10. GOLDEN: Corporation Tax (at defaults)
// Defaults: profit=30000
// ============================================================
describe("GOLDEN: corporation-tax-calculator (defaults)", () => {
  const profit = 30_000;
  const tax = corporationTax(profit);
  const eff = corporationTaxEffectiveRate(profit);

  it("CT on 30000 = 5700 (19%)", () => {
    expect(tax).toBe(5_700);
  });

  it("effective rate = 19%", () => {
    expect(eff).toBe(19);
  });

  it("CT on 50000 = 9500 (boundary, still 19%)", () => {
    expect(corporationTax(50_000)).toBe(9_500);
  });

  it("CT on 250000 = 62500 (25%)", () => {
    expect(corporationTax(250_000)).toBe(62_500);
  });

  it("CT on 150000 is between 19% and 25% (marginal relief)", () => {
    const t = corporationTax(150_000);
    expect(t).toBeGreaterThan(150_000 * 0.19);
    expect(t).toBeLessThan(150_000 * 0.25);
  });
});

// ============================================================
// 11. GOLDEN: Dividend Tax (at defaults)
// Defaults: otherIncome=30000, dividends=20000
// ============================================================
describe("GOLDEN: dividend-tax-calculator (defaults)", () => {
  // Sentinel: guards against a silent regression of the FA 2026 s.4 constants.
  it("FA 2026 s.4 constants are correct (10.75% basic, 35.75% higher)", () => {
    expect(DIV_BASIC).toBe(0.1075);
    expect(DIV_HIGHER).toBe(0.3575);
  });

  const r = computeDividendTax({ otherIncome: 30_000, dividends: 20_000 });

  // otherIncome=30000: PA=12570, so income above PA = 17430; basic band = 37700.
  // Room in basic band (after other income) = 37700 - 17430 = 20270.
  // unusedPA = 0 (income 30000 > PA 12570).
  // divAfterPA = 20000.
  // allowanceUsed = min(20000, 500) = 500.
  // taxable = 20000 - 500 = 19500.
  // pos = 17430 + 500 = 17930.
  // room in basic = 37700 - 17930 = 19770.
  // atBasic = min(19500, 19770) = 19500.
  // atHigher = 0. atAdditional = 0.
  // tax = 19500 * 0.1075 = 2096.25 (FA 2026 s.4 rates)

  it("all dividends fall in basic band", () => {
    expect(r.atBasic).toBe(19_500);
    expect(r.atHigher).toBe(0);
    expect(r.atAdditional).toBe(0);
  });

  it("tax = 2096 (rounded to nearest £, FA 2026 s.4 rates)", () => {
    expect(gbp(r.tax)).toBe("£2,096");
  });
});

// ============================================================
// 12. GOLDEN: Rent-a-Room (at defaults)
// Defaults: roomRent=9000, expenses=2000, band=higher
// ============================================================
describe("GOLDEN: rent-a-room-relief-calculator (defaults)", () => {
  const result = rentARoomReliefCalculator.compute(defaults(rentARoomReliefCalculator.fields) as V);

  it("scheme taxable = 1500 (9000 - 7500)", () => {
    const row = result.rows?.find((r) => r.label.startsWith("Rent-a-room"));
    // scheme tax = 1500 * 0.40 = 600
    expect(row?.value).toBe("£600");
  });

  it("normal taxable = 7000 (9000 - 2000)", () => {
    const row = result.rows?.find((r) => r.label.startsWith("Normal basis"));
    // normal tax = 7000 * 0.40 = 2800
    expect(row?.value).toBe("£2,800");
  });

  it("best = scheme (lower at 600)", () => {
    expect(result.headline.value).toBe("£600");
    expect(result.headline.sub).toContain("rent-a-room scheme");
  });
});

// ============================================================
// 13. GOLDEN: Property Allowance Checker (at defaults)
// Defaults: grossIncome=2500, expenses=600, band=higher
// ============================================================
describe("GOLDEN: property-allowance-checker (defaults)", () => {
  const result = propertyAllowanceChecker.compute(defaults(propertyAllowanceChecker.fields) as V);

  it("allowance tax = 600 (2500 - 1000 = 1500 * 40%)", () => {
    const row = result.rows?.find((r) => r.label.startsWith("Using the £1,000"));
    expect(row?.value).toBe("£600");
  });

  it("actual expenses tax = 760 (2500 - 600 = 1900 * 40%)", () => {
    const row = result.rows?.find((r) => r.label.startsWith("Using actual"));
    expect(row?.value).toBe("£760");
  });

  it("best method = £1,000 allowance (lower at 600)", () => {
    expect(result.headline.value).toBe("£600");
    expect(result.headline.sub).toContain("£1,000 allowance");
  });
});

describe("GOLDEN: property allowance covers income <= 1000", () => {
  const result = propertyAllowanceChecker.compute({ grossIncome: 800, expenses: 100, band: "basic" } as V);
  it("returns verdict 'Covered'", () => {
    expect(result.verdict?.text).toContain("Covered");
    expect(result.verdict?.positive).toBe(true);
  });
});

// ============================================================
// 14. Stale-figure checks (ground-truth assertions)
// These ensure the tool text and notes have not drifted from
// spec-locked figures. A failure here = STOP (user finding).
// ============================================================
describe("stale-figure checks (ground-truth sentinels)", () => {
  it("rent-a-room limit constant is 7500", () => {
    // checked against rent-a-room-relief-calculator RENT_A_ROOM_LIMIT
    const result = rentARoomReliefCalculator.compute({ roomRent: 7_500, expenses: 0, band: "basic" } as V);
    // exactly at the limit: taxable = 0, verdict shown
    expect(result.headline.value).toBe("£0");
    expect(result.headline.sub).toContain("£7,500");
  });

  it("property allowance constant is 1000", () => {
    const result = propertyAllowanceChecker.compute({ grossIncome: 1_000, expenses: 0, band: "basic" } as V);
    expect(result.verdict?.positive).toBe(true); // exactly at limit → covered
  });

  it("rental income note mentions 22% from 2027/28 (FA 2026)", () => {
    const result = rentalIncomeTaxCalculator.compute(defaults(rentalIncomeTaxCalculator.fields) as V);
    // Ground truth: April-2027 reducer rises to 22% (no new wedge)
    expect(result.note).toMatch(/22%/);
    expect(result.note).toMatch(/2027\/28/);
  });

  it("CGT AEA is 3000 (not stale)", () => {
    const r = computeCgt({ salePrice: 103_000, purchasePrice: 100_000, costs: 0, otherIncome: 0, aeaUsed: false });
    // gain = 3000, aea = 3000, taxable = 0, tax = 0
    expect(r.aea).toBe(3_000);
    expect(r.tax).toBe(0);
  });

  it("SDLT additional surcharge is 5%", () => {
    // A property at £100,000: standard = 0 (under 125k threshold),
    // additional = 0 + 100000 * 0.05 = 5000.
    const tax = additionalDwellingSdlt(100_000);
    expect(tax).toBe(5_000);
  });

  it("LBTT ADS is 8%", () => {
    const r = computeLbtt({ price: 100_000, additional: true, firstTimeBuyer: false });
    // main: 0 on first 100k (below 145k nil band) + ADS = 100000*0.08 = 8000
    expect(r.ads).toBe(8_000);
  });

  it("CT main rate is 25% at upper limit", () => {
    const tax = corporationTax(300_000);
    expect(tax).toBe(75_000); // 300000 * 0.25
  });

  it("CT small profits rate is 19% at lower limit", () => {
    const tax = corporationTax(50_000);
    expect(tax).toBe(9_500); // 50000 * 0.19
  });
});
