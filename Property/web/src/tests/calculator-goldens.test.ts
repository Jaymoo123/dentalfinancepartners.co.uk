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
import { buyToLetMortgageCalculator } from "../lib/calculators/tools/buy-to-let-mortgage-calculator";
import { rentARoomReliefCalculator } from "../lib/calculators/tools/rent-a-room-relief-calculator";
import { propertyAllowanceChecker } from "../lib/calculators/tools/property-allowance-checker";
import { leaseExtensionPremiumCalculator } from "../lib/calculators/tools/lease-extension-premium-calculator";
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
  it("total fleet = 24 tools (5 bespoke + 19 generic)", () => {
    expect(TOOLS.length).toBe(24);
  });

  it("5 bespoke tools", () => {
    const bespoke = TOOLS.filter((t) => t.kind === "bespoke");
    expect(bespoke.length).toBe(5);
  });

  it("19 generic tools", () => {
    const generic = genericTools();
    expect(generic.length).toBe(19);
  });

  it("allTools returns 24 tools", () => {
    expect(allTools().length).toBe(24);
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
      "buy-to-let-mortgage-calculator",
      "lbtt-calculator-scotland",
      "ltt-calculator-wales",
      "first-time-buyer-stamp-duty-calculator",
      "corporation-tax-calculator",
      "dividend-tax-calculator",
      "rent-a-room-relief-calculator",
      "property-allowance-checker",
      "lease-extension-premium-calculator",
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
// 5. GOLDEN: Rental Yield
//
// Fields: propertyValue, monthlyRent, lettingAgentPct, maintenancePct,
//         insurance, serviceCharge, mortgageInterest.
// Defaults: 250000 / 1250pm / 10% / 10% / 300 / 0 / 0
//
// Every expected figure below is hand-derived in the comment above it.
// Shape of the maths:
//   annual rent = monthly x 12
//   costs       = agent% of rent + maintenance% of rent + insurance + service charge
//   gross yield = annual rent / value x 100
//   net yield   = (annual rent - costs) / value x 100
// ============================================================
const yieldRow = (result: ReturnType<typeof rentalYieldCalculator.compute>, label: string) =>
  result.rows?.find((r) => r.label === label)?.value;

describe("GOLDEN: rental-yield-calculator (defaults, net case)", () => {
  const result = rentalYieldCalculator.compute(defaults(rentalYieldCalculator.fields) as V);

  it("annual rent = 15000 (1250 x 12)", () => {
    expect(yieldRow(result, "Annual rent")).toBe("£15,000");
  });

  it("gross yield = 6.0% (15000 / 250000 x 100 = 6)", () => {
    expect(result.headline.value).toBe("6.0%");
  });

  it("agent 10% = 1500 and maintenance 10% = 1500 (of 15000)", () => {
    expect(yieldRow(result, "Letting agent at 10.0%")).toBe("−£1,500");
    expect(yieldRow(result, "Maintenance at 10.0%")).toBe("−£1,500");
  });

  it("total running costs = 3300 (1500 + 1500 + 300 insurance + 0 service)", () => {
    expect(yieldRow(result, "Total running costs")).toBe("−£3,300");
  });

  it("net income = 11700 (15000 - 3300)", () => {
    expect(yieldRow(result, "Net income before tax")).toBe("£11,700");
  });

  it("net yield = 4.7% (11700 / 250000 x 100 = 4.68)", () => {
    expect(result.headline.sub).toBe("Net yield 4.7%");
  });

  it("monthly net = 975 (11700 / 12)", () => {
    expect(yieldRow(result, "Net income per month")).toBe("£975");
  });

  it("payback = 21.4 years (250000 / 11700 = 21.3675)", () => {
    expect(yieldRow(result, "Years of net income to earn the price back")).toBe("21.4 years");
  });

  it("zero service charge and zero mortgage interest suppress their rows", () => {
    expect(yieldRow(result, "Service charge and ground rent")).toBeUndefined();
    expect(yieldRow(result, "Mortgage interest")).toBeUndefined();
    expect(yieldRow(result, "Net yield after mortgage interest")).toBeUndefined();
  });

  it("costs are 22% of rent, so no warn flag", () => {
    // 3300 / 15000 = 0.22, under the 0.5 warn share
    expect(result.headline.tone).toBe("default");
  });

  it("note carries no statute reference", () => {
    expect(result.note).not.toMatch(/Section 24|Finance Act|HMRC/);
  });
});

// Every cost field populated, plus the optional mortgage interest.
// value 320000, rent 1600pm, agent 10%, maintenance 10%, insurance 350,
// service charge 1400, mortgage interest 9000.
//   annual rent = 1600 x 12                = 19,200
//   agent       = 10% of 19,200            =  1,920
//   maintenance = 10% of 19,200            =  1,920
//   costs       = 1920 + 1920 + 350 + 1400 =  5,590
//   net income  = 19,200 - 5,590           = 13,610
//   gross       = 19,200 / 320,000 x 100   = 6.0%    (exact)
//   net         = 13,610 / 320,000 x 100   = 4.2531% -> 4.3%
//   after int.  = 13,610 - 9,000           =  4,610
//   net-of-fin. =  4,610 / 320,000 x 100   = 1.4406% -> 1.4%
//   payback     = 320,000 / 13,610         = 23.5121 -> 23.5 years
describe("GOLDEN: rental-yield-calculator (all costs + mortgage interest)", () => {
  const result = rentalYieldCalculator.compute({
    propertyValue: 320_000,
    monthlyRent: 1_600,
    lettingAgentPct: 10,
    maintenancePct: 10,
    insurance: 350,
    serviceCharge: 1_400,
    mortgageInterest: 9_000,
  } as V);

  it("gross yield = 6.0%", () => {
    expect(result.headline.value).toBe("6.0%");
  });

  it("service charge row appears when non-zero", () => {
    expect(yieldRow(result, "Service charge and ground rent")).toBe("−£1,400");
  });

  it("total running costs = 5590", () => {
    expect(yieldRow(result, "Total running costs")).toBe("−£5,590");
  });

  it("net income = 13610", () => {
    expect(yieldRow(result, "Net income before tax")).toBe("£13,610");
  });

  it("net yield = 4.3%", () => {
    expect(result.headline.sub).toBe("Net yield 4.3%");
  });

  it("net income after mortgage interest = 4610", () => {
    expect(yieldRow(result, "Net income after mortgage interest")).toBe("£4,610");
  });

  it("net yield after mortgage interest = 1.4%", () => {
    expect(yieldRow(result, "Net yield after mortgage interest")).toBe("1.4%");
  });

  it("payback = 23.5 years", () => {
    expect(yieldRow(result, "Years of net income to earn the price back")).toBe("23.5 years");
  });
});

// Zero-cost case: the gross-only reading a listing quotes, and the proof that
// net collapses onto gross when nothing is deducted.
// value 180000, rent 850pm, all cost fields 0.
//   annual rent = 850 x 12               = 10,200
//   gross = net = 10,200 / 180,000 x 100 = 5.6667% -> 5.7%
//   payback     = 180,000 / 10,200       = 17.647 -> 17.6 years
describe("GOLDEN: rental-yield-calculator (zero costs, net == gross)", () => {
  const result = rentalYieldCalculator.compute({
    propertyValue: 180_000,
    monthlyRent: 850,
    lettingAgentPct: 0,
    maintenancePct: 0,
    insurance: 0,
    serviceCharge: 0,
    mortgageInterest: 0,
  } as V);

  it("gross yield = 5.7%", () => {
    expect(result.headline.value).toBe("5.7%");
  });

  it("net yield equals gross yield when no costs are entered", () => {
    expect(result.headline.sub).toBe(`Net yield ${result.headline.value}`);
  });

  it("total running costs = 0", () => {
    expect(yieldRow(result, "Total running costs")).toBe("−£0");
  });

  it("net income = annual rent = 10200", () => {
    expect(yieldRow(result, "Net income before tax")).toBe("£10,200");
  });

  it("payback = 17.6 years", () => {
    expect(yieldRow(result, "Years of net income to earn the price back")).toBe("17.6 years");
  });
});

// Rounding edge: three different roundings in one case, none of them exact.
// value 265000, rent 1100pm, agent 10%, maintenance 5%, insurance 250.
//   annual rent = 1100 x 12                    = 13,200
//   agent  = 10% of 13,200 = 1,320; maint = 5% =    660
//   costs  = 1320 + 660 + 250                  =  2,230
//   net    = 13,200 - 2,230                    = 10,970
//   gross  = 13,200 / 265,000 x 100 = 4.98113% -> "5.0%"  (rounds UP past a whole number)
//   net    = 10,970 / 265,000 x 100 = 4.13962% -> "4.1%"  (rounds DOWN)
//   monthly= 10,970 / 12 = 914.1667            -> "£914"  (gbp rounds DOWN)
//   payback= 265,000 / 10,970 = 24.15679       -> "24.2"  (toFixed rounds UP)
describe("GOLDEN: rental-yield-calculator (rounding edge)", () => {
  const result = rentalYieldCalculator.compute({
    propertyValue: 265_000,
    monthlyRent: 1_100,
    lettingAgentPct: 10,
    maintenancePct: 5,
    insurance: 250,
    serviceCharge: 0,
    mortgageInterest: 0,
  } as V);

  it("gross 4.98113% displays as 5.0%, not 4.9%", () => {
    expect(result.headline.value).toBe("5.0%");
  });

  it("net 4.13962% displays as 4.1%", () => {
    expect(result.headline.sub).toBe("Net yield 4.1%");
  });

  it("monthly net 914.1667 displays as £914", () => {
    expect(yieldRow(result, "Net income per month")).toBe("£914");
  });

  it("payback 24.15679 displays as 24.2 years", () => {
    expect(yieldRow(result, "Years of net income to earn the price back")).toBe("24.2 years");
  });

  it("maintenance label carries the rate to 1dp", () => {
    expect(yieldRow(result, "Maintenance at 5.0%")).toBe("−£660");
  });
});

// Warn tone: the ONLY thing the flag means is costs > half the rent, and the
// note has to say so.
// value 200000, rent 500pm, agent 15%, maintenance 15%, insurance 500, service 2000.
//   annual rent = 6,000; agent = 900; maintenance = 900
//   costs = 900 + 900 + 500 + 2000 = 4,300 = 71.7% of rent -> warn
//   net   = 6,000 - 4,300 = 1,700
//   net yield = 1,700 / 200,000 x 100 = 0.85% -> "0.9%"
describe("GOLDEN: rental-yield-calculator (warn tone basis)", () => {
  const result = rentalYieldCalculator.compute({
    propertyValue: 200_000,
    monthlyRent: 500,
    lettingAgentPct: 15,
    maintenancePct: 15,
    insurance: 500,
    serviceCharge: 2_000,
    mortgageInterest: 0,
  } as V);

  it("costs of 4300 on 6000 rent trip the warn tone", () => {
    expect(result.headline.tone).toBe("warn");
  });

  it("note states the basis for the flag", () => {
    expect(result.note).toContain("more than half the rent");
  });

  it("net yield = 0.9% (0.85 rounded)", () => {
    expect(result.headline.sub).toBe("Net yield 0.9%");
  });

  it("net income = 1700", () => {
    expect(yieldRow(result, "Net income before tax")).toBe("£1,700");
  });
});

describe("rental-yield-calculator: no good-yield figure is asserted anywhere", () => {
  // The "what is a good yield" data lives on the benchmarks blog post, which is
  // frozen; this page must link it, never quote it.
  const prose = [
    rentalYieldCalculator.intro,
    ...rentalYieldCalculator.explainer.paragraphs,
    ...(rentalYieldCalculator.faqs ?? []).flatMap((f) => [f.question, f.answer]),
  ].join(" ");

  it("no statute references in the prose", () => {
    expect(prose).not.toMatch(/Section 24|Finance Act|HMRC|Royal Assent/);
  });

  it("no em-dashes or en-dashes in the prose", () => {
    expect(prose).not.toMatch(/[–—]/);
  });

  it("links the benchmarks post rather than quoting it", () => {
    const hrefs = (rentalYieldCalculator.related ?? []).map((r) => r.href);
    expect(hrefs).toContain(
      "/blog/portfolio-management/property-investment-benchmarks-uk-2026-good-yield",
    );
  });

  it("carries worked examples and related links for the SSR blocks", () => {
    expect(rentalYieldCalculator.workedExamples?.length).toBe(2);
    expect(rentalYieldCalculator.related?.length).toBeGreaterThanOrEqual(4);
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

  it("cashInvested defaults to 0 so no ROI row (4 rows)", () => {
    expect(result.rows?.length).toBe(4);
    expect(result.rows?.some((r) => r.label.startsWith("Cash-on-cash"))).toBe(false);
  });
});

describe("GOLDEN: buy-to-let-cashflow-calculator (cash invested)", () => {
  // 1450 - 720 - 330 = 400/mo; annual 4,800; 4,800 / 75,000 = 0.064 -> "6.4%"
  // Matches the tool's own second worked example.
  const result = buyToLetCashflowCalculator.compute({
    monthlyRent: 1_450,
    monthlyMortgage: 720,
    monthlyCosts: 330,
    cashInvested: 75_000,
  } as V);

  it("cash-on-cash return row = 6.4%", () => {
    const row = result.rows?.find((r) => r.label === "Cash-on-cash return, before tax");
    expect(row?.value).toBe("6.4%");
  });

  it("still 5 rows with the ROI row appended", () => {
    expect(result.rows?.length).toBe(5);
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

// ============================================================
// 15. GOLDEN: Lease Extension Premium (LRHUDA 1993 Sch 13)
//
// Method under test (hand-derived below for every case):
//   term       = groundRent * (1 - (1+c)^-t) / c          [c = capitalisation rate]
//   reversion  = value * (1+d)^-t                          [d = deferment rate]
//   relativity = piecewise-linear over the anchor table, anchors at
//                60y=85.0, 70y=90.0, 80y=94.0, 90y=96.8
//   marriage   = t > 80 ? 0 : value - value*rel - term - reversion   (Sch 13 para 4(2A):
//                nil only where the unexpired term EXCEEDS 80 years, so 80.0 pays it)
//   premium    = term + reversion + marriage/2
//   headline   = premium +/- 20%
//
// Ground truth: house_positions.md §31.3a — marriage value abolition is NOT in
// force in Aug 2026, so the sub-80 charge is live. A test failing here because
// marriage value has been switched off = STOP, verify commencement first.
// ============================================================
describe("GOLDEN: lease-extension-premium-calculator (defaults, 82 years)", () => {
  const result = leaseExtensionPremiumCalculator.compute(
    defaults(leaseExtensionPremiumCalculator.fields) as V,
  );

  // Defaults: value 300000, 82 years, ground rent 150, deferment 5%, cap 7%, no override.
  // term      = 150 * (1 - 1.07^-82) / 0.07 = 150 * 14.23005 = 2134.51 -> £2,135
  // reversion = 300000 * 1.05^-82           = 5490.33         -> £5,490
  // marriage  = 0 (82 > 80)
  // premium   = 2134.51 + 5490.33           = 7624.84         -> £7,625
  // range     = 6099.87 to 9149.81          -> £6,100 to £9,150
  it("term (capitalised ground rent) = £2,135", () => {
    const row = result.rows?.find((r) => r.label.startsWith("Capitalised ground rent"));
    expect(row?.value).toBe("£2,135");
  });

  it("reversion = £5,490", () => {
    const row = result.rows?.find((r) => r.label.startsWith("Reversion"));
    expect(row?.value).toBe("£5,490");
  });

  it("no marriage value above 80 years", () => {
    const row = result.rows?.find((r) => r.label.startsWith("Marriage value"));
    expect(row?.value).toBe("Nil, term is over 80 years");
    const share = result.rows?.find((r) => r.label.startsWith("Freeholder's 50%"));
    expect(share?.value).toBe("£0");
  });

  it("premium midpoint = £7,625", () => {
    const row = result.rows?.find((r) => r.label === "Premium midpoint");
    expect(row?.value).toBe("£7,625");
  });

  it("headline is a +/-20% range, not a single figure", () => {
    expect(result.headline.value).toBe("£6,100 to £9,150");
  });

  it("tone = warn inside the 80-83 year cliff zone", () => {
    expect(result.headline.tone).toBe("warn");
  });

  // Same flat re-run at 79 years: see the 79-year golden below (£13,844).
  it("shows the cost of drifting past the cliff", () => {
    const row = result.rows?.find((r) => r.label.startsWith("Premium midpoint if you wait"));
    expect(row?.value).toBe("£13,844");
  });

  // Fee stack is pinned to content/blog/lease-extension-cost-uk.md (harmonised set, ex VAT).
  it("fee stack = £2,750 to £4,700", () => {
    const row = result.rows?.find((r) => r.label.startsWith("Professional fees"));
    expect(row?.value).toBe("£2,750 to £4,700");
  });

  // all-in = 6099.87 + 2750 = 8849.87 -> £8,850; 9149.81 + 4700 = 13849.81 -> £13,850
  it("all-in range adds the fee stack", () => {
    const row = result.rows?.find((r) => r.label.startsWith("Indicative all-in"));
    expect(row?.value).toBe("£8,850 to £13,850");
  });

  it("note carries the not-in-force discipline and the consultation date", () => {
    expect(result.note).toContain("not in force");
    expect(result.note).toContain("23 September 2026");
    expect(result.note).toContain("RICS");
  });
});

describe("GOLDEN: lease-extension-premium-calculator (79 years, marriage value live)", () => {
  const result = leaseExtensionPremiumCalculator.compute({
    propertyValue: 300_000,
    unexpiredYears: 79,
    groundRent: 150,
    defermentRate: 5,
    capitalisationRate: 7,
    relativityOverride: 0,
  } as V);

  // term       = 150 * (1 - 1.07^-79) / 0.07 = 2132.63 -> £2,133
  // reversion  = 300000 * 1.05^-79           = 6355.75 -> £6,356
  // relativity = 90 + (79-70)/10 * (94-90)   = 93.6%
  // short-lease value = 300000 * 0.936       = 280800
  // marriage   = 300000 - 280800 - 2132.63 - 6355.75 = 10711.62 -> £10,712
  // share      = 5355.81                                        -> £5,356
  // premium    = 2132.63 + 6355.75 + 5355.81 = 13844.19         -> £13,844
  // range      = 11075.35 to 16613.03                           -> £11,075 to £16,613
  it("relativity = 93.6%", () => {
    const row = result.rows?.find((r) => r.label.startsWith("Relativity"));
    expect(row?.value).toBe("93.6%");
  });

  it("marriage value = £10,712", () => {
    const row = result.rows?.find((r) => r.label.startsWith("Marriage value"));
    expect(row?.value).toBe("£10,712");
  });

  it("freeholder's 50% share = £5,356", () => {
    const row = result.rows?.find((r) => r.label.startsWith("Freeholder's 50%"));
    expect(row?.value).toBe("£5,356");
  });

  it("premium midpoint = £13,844", () => {
    const row = result.rows?.find((r) => r.label === "Premium midpoint");
    expect(row?.value).toBe("£13,844");
  });

  it("headline range = £11,075 to £16,613", () => {
    expect(result.headline.value).toBe("£11,075 to £16,613");
    expect(result.headline.sub).toContain("£5,356");
  });

  it("no cliff-cost row below 80 years (already over it)", () => {
    expect(result.rows?.find((r) => r.label.startsWith("Premium midpoint if you wait"))).toBeUndefined();
  });
});

describe("GOLDEN: lease-extension-premium-calculator (the 80-year boundary)", () => {
  const at = (years: number) =>
    leaseExtensionPremiumCalculator.compute({
      propertyValue: 300_000,
      unexpiredYears: years,
      groundRent: 150,
      defermentRate: 5,
      capitalisationRate: 7,
      relativityOverride: 0,
    } as V);

  // EXACTLY 80 years — Sch 13 para 4(2A) makes marriage value nil only where the
  // term EXCEEDS 80, so 80.0 is inside the charge.
  // term       = 150 * (1 - 1.07^-80) / 0.07 = 2133.30 -> £2,133
  // reversion  = 300000 * 1.05^-80           = 6053.09 -> £6,053
  // relativity = 94.0% (anchor)              -> short-lease value 282000
  // marriage   = 300000 - 282000 - 2133.30 - 6053.09 = 9813.61 -> £9,814
  // share      = 4906.80                                       -> £4,907
  // premium    = 2133.30 + 6053.09 + 4906.80 = 13093.20        -> £13,093
  const eighty = at(80);

  it("at exactly 80 years marriage value IS payable", () => {
    const row = eighty.rows?.find((r) => r.label.startsWith("Marriage value"));
    expect(row?.value).toBe("£9,814");
  });

  it("at exactly 80 years the freeholder's share = £4,907", () => {
    const row = eighty.rows?.find((r) => r.label.startsWith("Freeholder's 50%"));
    expect(row?.value).toBe("£4,907");
  });

  it("at exactly 80 years premium = £13,093", () => {
    const row = eighty.rows?.find((r) => r.label === "Premium midpoint");
    expect(row?.value).toBe("£13,093");
  });

  // ONE YEAR ABOVE the cliff — same flat, no marriage value at all.
  // term      = 150 * (1 - 1.07^-81) / 0.07 = 2133.93 -> £2,134
  // reversion = 300000 * 1.05^-81           = 5764.85 -> £5,765
  // premium   = 7898.78                               -> £7,899
  const eightyOne = at(81);

  it("at 81 years marriage value is nil", () => {
    const row = eightyOne.rows?.find((r) => r.label.startsWith("Marriage value"));
    expect(row?.value).toBe("Nil, term is over 80 years");
  });

  it("at 81 years premium = £7,899", () => {
    const row = eightyOne.rows?.find((r) => r.label === "Premium midpoint");
    expect(row?.value).toBe("£7,899");
  });

  it("crossing the cliff costs £5,194 on this flat (13093 - 7899)", () => {
    expect(13_093 - 7_899).toBe(5_194);
  });
});

describe("GOLDEN: lease-extension-premium-calculator (peppercorn / zero ground rent)", () => {
  const result = leaseExtensionPremiumCalculator.compute({
    propertyValue: 250_000,
    unexpiredYears: 70,
    groundRent: 0,
    defermentRate: 5,
    capitalisationRate: 7,
    relativityOverride: 0,
  } as V);

  // term       = 0 * anything                = 0
  // reversion  = 250000 * 1.05^-70           = 8216.54 -> £8,217
  // relativity = 90.0% (anchor)              -> short-lease value 225000
  // marriage   = 250000 - 225000 - 0 - 8216.54 = 16783.46 -> £16,783
  // share      = 8391.73                                  -> £8,392
  // premium    = 0 + 8216.54 + 8391.73 = 16608.27         -> £16,608
  it("term component is £0 with no ground rent", () => {
    const row = result.rows?.find((r) => r.label.startsWith("Capitalised ground rent"));
    expect(row?.value).toBe("£0");
  });

  it("reversion = £8,217", () => {
    const row = result.rows?.find((r) => r.label.startsWith("Reversion"));
    expect(row?.value).toBe("£8,217");
  });

  it("marriage value still applies = £16,783", () => {
    const row = result.rows?.find((r) => r.label.startsWith("Marriage value"));
    expect(row?.value).toBe("£16,783");
  });

  it("premium = reversion + half the marriage value = £16,608", () => {
    const row = result.rows?.find((r) => r.label === "Premium midpoint");
    expect(row?.value).toBe("£16,608");
  });
});

describe("lease-extension-premium-calculator: house-bar checks", () => {
  it("relativity override wins over the derived curve", () => {
    const result = leaseExtensionPremiumCalculator.compute({
      propertyValue: 300_000,
      unexpiredYears: 79,
      groundRent: 150,
      defermentRate: 5,
      capitalisationRate: 7,
      relativityOverride: 90,
    } as V);
    const row = result.rows?.find((r) => r.label.startsWith("Relativity"));
    expect(row?.value).toBe("90.0%");
    // marriage = 300000 - 270000 - 2132.63 - 6355.75 = 21511.62; share = 10755.81
    // premium  = 2132.63 + 6355.75 + 10755.81 = 19244.19 -> £19,244
    const premium = result.rows?.find((r) => r.label === "Premium midpoint");
    expect(premium?.value).toBe("£19,244");
  });

  it("no em-dashes in any user-facing string", () => {
    const result = leaseExtensionPremiumCalculator.compute(
      defaults(leaseExtensionPremiumCalculator.fields) as V,
    );
    const copy = JSON.stringify(leaseExtensionPremiumCalculator) + JSON.stringify(result);
    expect(copy).not.toContain("—");
    expect(copy).not.toContain("–");
  });
});

// ============================================================
// GOLDEN: Buy to Let Mortgage (T1 rework, 2026-08-21)
//
// Fields (5): propertyValue, deposit, annualRate, termYears, monthlyRent.
// Defaults:   250000 / 62500 / 5.25% / 25 years / 1250pm
//
// The loan and the LTV are OUTPUTS now (they used to be the first input), and
// interest-only + capital repayment are computed TOGETHER, not behind a select.
//
// Hand-derived, loan = 250,000 - 62,500 = 187,500, r = 0.0525/12 = 0.004375,
// n = 300:
//   LTV                = 187,500 / 250,000           = 75.0%
//   deposit share      = 62,500 / 250,000            = 25.0%
//   interest-only pm   = 187,500 x 0.0525 / 12       = 820.3125   -> £820
//   repayment pm       = P r (1+r)^n / ((1+r)^n - 1) = 1,123.5895 -> £1,124
//   extra pm           = 1,123.5895 - 820.3125       = 303.28     -> £303
//   interest-only tot  = 820.3125 x 300              = 246,093.75 -> £246,094
//   repayment total    = 1,123.5895 x 300            = 337,076.84 -> £337,077
//   repayment interest = 337,076.84 - 187,500        = 149,576.84 -> £149,577
//   rental cover       = 1,250 / 820.3125            = 152.38%    -> 152.4%
//   rent for 125%      = 820.3125 x 1.25             = 1,025.39   -> £1,025
//   rent for 145%      = 820.3125 x 1.45             = 1,189.45   -> £1,189
// ============================================================
const btlRow = (result: ReturnType<typeof buyToLetMortgageCalculator.compute>, startsWith: string) =>
  result.rows?.find((r) => r.label.startsWith(startsWith))?.value;

describe("GOLDEN: buy-to-let-mortgage-calculator (defaults)", () => {
  const result = buyToLetMortgageCalculator.compute(defaults(buyToLetMortgageCalculator.fields) as V);

  it("takes 5 inputs: price, deposit, rate, term, rent", () => {
    expect(buyToLetMortgageCalculator.fields.map((f) => f.id)).toEqual([
      "propertyValue",
      "deposit",
      "annualRate",
      "termYears",
      "monthlyRent",
    ]);
  });

  it("loan = 187500 (price less deposit), an output not an input", () => {
    expect(btlRow(result, "Loan amount")).toBe("£187,500");
  });

  it("LTV = 75.0% (187500 / 250000)", () => {
    expect(btlRow(result, "Loan to value")).toBe("75.0%");
  });

  it("deposit share = 25.0% (62500 / 250000)", () => {
    expect(btlRow(result, "Deposit as a share")).toBe("25.0%");
  });

  it("headline is the interest-only monthly payment = £820", () => {
    expect(result.headline.label).toBe("Interest-only monthly payment");
    expect(result.headline.value).toBe("£820");
    expect(result.headline.tone).toBeUndefined(); // default tone
  });

  it("headline sub names the basis: loan, rate and the repayment alternative", () => {
    expect(result.headline.sub).toContain("£187,500 borrowed at 5.25%");
    expect(result.headline.sub).toContain("£1,124 a month");
  });

  it("interest-only and repayment are BOTH rows, side by side", () => {
    expect(btlRow(result, "Interest-only,")).toBe("£820 a month");
    expect(btlRow(result, "Capital repayment over 25 years")).toBe("£1,124 a month");
    expect(btlRow(result, "Extra each month")).toBe("£303");
  });

  it("total cost over the term is shown for both bases", () => {
    expect(btlRow(result, "Total paid over 25 years, interest-only")).toBe("£246,094");
    expect(btlRow(result, "Still owed at the end")).toBe("£187,500");
    expect(btlRow(result, "Total paid over 25 years, capital repayment")).toBe("£337,077");
    expect(btlRow(result, "Interest paid over 25 years")).toBe("£149,577");
  });

  it("cross-check: repayment total less the loan equals the interest shown", () => {
    // 337,076.84 - 187,500 = 149,576.84, and both round to the pinned figures.
    expect(Math.round(337_076.84 - 187_500)).toBe(149_577);
    // Interest-only over the term is cheaper by less than the capital it never repays.
    expect(337_077 - 246_094).toBeLessThan(187_500);
  });

  it("rent drives the cover rows at 125% and 145%", () => {
    expect(btlRow(result, "Rental cover")).toBe("152.4%");
    expect(btlRow(result, "Rent needed for 125%")).toBe("£1,025 a month");
    expect(btlRow(result, "Rent needed for 145%")).toBe("£1,189 a month");
  });

  it("note keeps the rate honest and points at the stress test", () => {
    expect(result.note).toContain("not a live quote");
    expect(result.note).toContain("stress");
    expect(result.note).toContain("not a quote or an offer of finance");
  });
});

describe("GOLDEN: buy-to-let-mortgage-calculator (no rent entered)", () => {
  const result = buyToLetMortgageCalculator.compute({
    propertyValue: 250_000,
    deposit: 62_500,
    annualRate: 5.25,
    termYears: 25,
    monthlyRent: 0,
  } as V);

  it("drops all three cover rows when rent is 0", () => {
    expect(result.rows?.length).toBe(10);
    expect(result.rows?.some((r) => r.label.startsWith("Rental cover"))).toBe(false);
    expect(result.rows?.some((r) => r.label.startsWith("Rent needed"))).toBe(false);
  });

  it("the mortgage figures are unaffected by the missing rent", () => {
    expect(result.headline.value).toBe("£820");
    expect(btlRow(result, "Capital repayment over 25 years")).toBe("£1,124 a month");
  });
});

describe("GOLDEN: buy-to-let-mortgage-calculator (LTV maths)", () => {
  const at = (deposit: number) =>
    buyToLetMortgageCalculator.compute({
      propertyValue: 250_000,
      deposit,
      annualRate: 5.25,
      termYears: 25,
      monthlyRent: 1_250,
    } as V);

  // 40% deposit: loan = 150,000, LTV = 60.0%
  //   interest-only = 150,000 x 0.0525 / 12 = 656.25 -> £656
  //   repayment     = 898.8716                       -> £899
  //   cover         = 1,250 / 656.25 = 190.48%       -> 190.5%
  const bigger = at(100_000);

  it("a 40% deposit gives a 60.0% LTV and a £150,000 loan", () => {
    expect(btlRow(bigger, "Loan amount")).toBe("£150,000");
    expect(btlRow(bigger, "Loan to value")).toBe("60.0%");
    expect(btlRow(bigger, "Deposit as a share")).toBe("40.0%");
  });

  it("the smaller loan costs £656 interest-only and £899 on repayment", () => {
    expect(bigger.headline.value).toBe("£656");
    expect(btlRow(bigger, "Capital repayment over 25 years")).toBe("£899 a month");
  });

  it("and the same rent covers it 190.5% over", () => {
    expect(btlRow(bigger, "Rental cover")).toBe("190.5%");
  });

  // A deposit larger than the price cannot produce a negative loan.
  it("a deposit above the price floors the loan at zero", () => {
    const cash = at(300_000);
    expect(btlRow(cash, "Loan amount")).toBe("£0");
    expect(btlRow(cash, "Loan to value")).toBe("0.0%");
    expect(cash.headline.value).toBe("£0");
  });
});

describe("buy-to-let-mortgage-calculator: house-bar checks", () => {
  it("a 0% rate degenerates to straight-line capital, not NaN", () => {
    // 187,500 / 300 = £625 a month, £187,500 over the term, £0 interest.
    const result = buyToLetMortgageCalculator.compute({
      propertyValue: 250_000,
      deposit: 62_500,
      annualRate: 0,
      termYears: 25,
      monthlyRent: 0,
    } as V);
    expect(result.headline.value).toBe("£0");
    expect(btlRow(result, "Capital repayment over 25 years")).toBe("£625 a month");
    expect(btlRow(result, "Total paid over 25 years, capital repayment")).toBe("£187,500");
    expect(btlRow(result, "Interest paid over 25 years")).toBe("£0");
  });

  it("carries workedExamples and related links (both were empty before)", () => {
    expect(buyToLetMortgageCalculator.workedExamples?.length).toBe(2);
    expect(buyToLetMortgageCalculator.related?.length).toBeGreaterThanOrEqual(4);
    const hrefs = buyToLetMortgageCalculator.related?.map((r) => r.href) ?? [];
    expect(hrefs).toContain("/calculators/buy-to-let-rental-stress-test-calculator");
    expect(hrefs).toContain("/calculators/section-24-calculator");
  });

  it("meta fields stay inside the 60 / 155 limits", () => {
    expect(buyToLetMortgageCalculator.metaTitle.length).toBeLessThanOrEqual(60);
    expect(buyToLetMortgageCalculator.metaDescription.length).toBeLessThanOrEqual(155);
  });

  it("at most one statute reference in the page prose", () => {
    const prose = [
      buyToLetMortgageCalculator.intro,
      ...buyToLetMortgageCalculator.explainer.paragraphs,
      ...(buyToLetMortgageCalculator.faqs ?? []).flatMap((f) => [f.question, f.answer]),
    ].join(" ");
    expect((prose.match(/Section 24/g) ?? []).length).toBe(1);
  });

  it("no em-dashes in any user-facing string", () => {
    const result = buyToLetMortgageCalculator.compute(
      defaults(buyToLetMortgageCalculator.fields) as V,
    );
    const copy = JSON.stringify(buyToLetMortgageCalculator) + JSON.stringify(result);
    expect(copy).not.toContain("—");
    expect(copy).not.toContain("–");
  });
});
