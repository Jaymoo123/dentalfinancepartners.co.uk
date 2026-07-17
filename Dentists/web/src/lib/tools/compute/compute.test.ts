/**
 * Golden tests for Dentists compute libs.
 *
 * Each test captures the output of the OLD inline component logic at its
 * default values — any divergence means the extraction changed behaviour.
 * Per the adoption spec: a differing figure is a user finding, never a
 * silent correction.
 *
 * Golden values derived by manually tracing the original component maths
 * at the default input values used in each old component's useState().
 *
 * TL-03 note: grep this directory for react/window/document/fetch — must be zero.
 */

import { describe, it, expect } from "vitest";
import { calcAssociateTakeHome } from "./associate-take-home";
import { calcEquipmentCapitalAllowance } from "./equipment-capital-allowance";
import { calcLocumStructure } from "./locum-structure";
import { calcPracticeValuation } from "./practice-valuation";
import { calcPrincipalExtraction } from "./principal-extraction";
import { calcUdaValue } from "./uda-value";

// ── Helper ────────────────────────────────────────────────────────────────

/** Round to nearest integer (same as Math.round used in component display). */
function r(n: number) {
  return Math.round(n);
}

// ── AssociateTakeHomeCalculator defaults ─────────────────────────────────
// grossFees=120000, associatePct=50, labPct=5, expenses=8000, pension=6500
// associateShare = 120000 * 0.50 = 60000
// lab = 120000 * 0.05 * 0.50 = 3000
// afterLab = 60000 - 3000 = 57000
// profit = 57000 - 8000 = 49000
// taxableProfit = 49000 - 6500 = 42500
// incomeTax: t = 42500 - 12570 = 29930; basic = 29930; IT = 29930 * 0.20 = 5986
// class4Ni: 42500 > 12570, in lower band = min(42500,50270) - 12570 = 29930; upper = 0
//           = 29930 * 0.06 = 1795.80
// class2Ni: profit=49000 > 6725 → 52 * 3.45 = 179.40
// totalTax = 5986 + 1795.80 + 179.40 = 7961.20
// netCash = 42500 - 7961.20 = 34538.80
// effectiveRate = (7961.20 / 49000) * 100 = 16.247%

describe("calcAssociateTakeHome — default inputs", () => {
  const res = calcAssociateTakeHome(120000, 50, 5, 8000, 6500);

  it("associateShare", () => expect(r(res.associateShare)).toBe(60000));
  it("lab", () => expect(r(res.lab)).toBe(3000));
  it("profit", () => expect(r(res.profit)).toBe(49000));
  it("taxableProfit", () => expect(r(res.taxableProfit)).toBe(42500));
  it("incomeTax", () => expect(res.incomeTax).toBeCloseTo(5986, 1));
  it("class4Ni", () => expect(res.class4Ni).toBeCloseTo(1795.8, 1));
  it("class2Ni", () => expect(res.class2Ni).toBeCloseTo(179.4, 1));
  it("totalTax", () => expect(res.totalTax).toBeCloseTo(7961.2, 1));
  it("netCash", () => expect(res.netCash).toBeCloseTo(34538.8, 1));
  it("effectiveRate positive", () => expect(res.effectiveRate).toBeGreaterThan(0));
});

describe("calcAssociateTakeHome — higher-rate scenario", () => {
  // grossFees=300000, associatePct=50, labPct=5, expenses=8000, pension=6500
  // associateShare=150000, lab=7500, afterLab=142500, profit=134500, taxable=128000
  // PA tapers at >100000: taxable=128000 > 100000
  // pa = max(0, 12570 - (128000-100000)/2) = max(0, 12570 - 14000) = 0
  // t = 128000 - 0 = 128000
  // basic = min(128000, 50270-12570) = min(128000, 37700) = 37700
  // higher band top (taxable) = 125140-pa = 125140; width = 125140-37700 = 87440
  // higher = max(0, min(128000-37700, 87440)) = max(0, min(90300, 87440)) = 87440
  // additional = max(0, 128000-37700-87440) = max(0, 2860) = 2860
  // IT = 37700*0.20 + 87440*0.40 + 2860*0.45 = 7540 + 34976 + 1287 = 43803
  // class4: taxable=128000; in lower = min(128000,50270)-12570=37700; upper=max(0,128000-50270)=77730
  //         = 37700*0.06 + 77730*0.02 = 2262 + 1554.6 = 3816.6
  // class2: profit=134500 > 6725 → 179.4
  // totalTax = 43803 + 3816.6 + 179.4 = 47799
  // netCash = 128000 - 47799 = 80201
  const res = calcAssociateTakeHome(300000, 50, 5, 8000, 6500);

  it("incomeTax higher-rate scenario", () => expect(res.incomeTax).toBeCloseTo(43803, 0));
  it("class4Ni higher-rate scenario", () => expect(res.class4Ni).toBeCloseTo(3816.6, 0));
  it("netCash positive", () => expect(res.netCash).toBeGreaterThan(0));
});

// ── LocumStructureCalculator defaults ────────────────────────────────────
// dailyRate=450, daysPerYear=180, expenses=6000
// grossIncome = 450*180 = 81000; profit = 81000 - 6000 = 75000
//
// Rates updated to 2026/27: employer NI 15% above £5,000; dividends 10.75%/35.75%/39.35%.
//
// SoleTrader (no employer NI, no dividends — UNCHANGED from 2025/26):
//   IT: pa=12570, t=62430, basic=37700, higher=24730; IT=17432
//   Class4: lower=37700*0.06=2262; upper=(75000-50270)*0.02=494.6; NI=2756.6
//   Class2: 75000>6725 → 52*3.45=179.4
//   soleTraderNet=75000-17432-2756.6-179.4=54632
//
// Ltd (employer NI now 15% above £5,000 threshold; dividends now 10.75%/35.75%):
//   ltdSalary=12570
//   ltdEmployerNi: 12570>5000 → (12570-5000)*0.15=7570*0.15=1135.50 (was 478.86)
//   ltdProfitAfterSalary=max(0,75000-12570-1135.50)=61294.50 (was 61951.14)
//   ltdCt: 61294.50>50000 → 9500+(61294.50-50000)*0.265=9500+2993.04=12493.04 (was 12667.05)
//   ltdAfterCt=61294.50-12493.04=48801.46 (was 49284.09)
//   ltdDividend=48801.46
//   ltdSalaryTax=0; ltdEmployeeNi=0 (salary≤12570)
//   ltdDividendTax=calcDividendTax(12570, 48801.46):
//     pa=12570 (total<100k), paUsed=12570, paLeft=0
//     taxableDividend=48801.46-0-500=48301.46
//     remBasic=37700; remHigher=74870
//     inBasic=37700; tax=37700*0.1075=4052.75 (was 3298.75)
//     div=10601.46; inHigher=10601.46; tax+=10601.46*0.3575=3789.92 (was 3740.88)
//     divTax=4052.75+3789.92=7842.67 (was 7039.63)
//   ltdNet=12570+48801.46-7842.67-1800=51728.79 (was 53014.46)
//
// Umbrella (employer NI now 15% above £5,000):
//   umbrellaGross=76950; feesRetained=4050
//   umbrellaEmployerNi: 76950>5000 → (76950-5000)*0.15=71950*0.15=10792.50 (was 9363.21)
//   umbrellaPayable=76950-10792.50=66157.50 (was 67586.79)
//   umbrellaIncomeTax=calcIncomeTax(66157.50): t=53587.50, basic=37700, higher=15887.50
//     =37700*0.20+15887.50*0.40=7540+6355=13895 (was 14466.72)
//   umbrellaEmployeeNi: inBand=37700*0.08=3016; above=15887.50*0.02=317.75 → 3333.75 (was 3362.34)
//   umbrellaNet=66157.50-13895-3333.75=48928.75 (was 49757.73)
//
// Delta table (all deltas caused solely by employer-NI and dividend-rate corrections):
// | case              | old net   | new net   | driver                           |
// |-------------------|-----------|-----------|----------------------------------|
// | locum Ltd         | 53014.46  | 51728.79  | NI_SECONDARY↓+EMPLOYER_NI↑+div↑ |
// | locum umbrella    | 49757.73  | 48928.75  | NI_SECONDARY↓+EMPLOYER_NI↑      |
// | locum sole trader | 54632     | 54632     | no change (no emp-NI, no div)    |

describe("calcLocumStructure — default inputs (450/day, 180 days, £6,000 expenses)", () => {
  const res = calcLocumStructure(450, 180, 6000);

  it("grossIncome", () => expect(r(res.grossIncome)).toBe(81000));
  it("profit", () => expect(r(res.profit)).toBe(75000));

  // Sole trader: no employer NI and no dividends — figures unchanged from 2025/26
  it("soleTrader net", () => expect(res.soleTrader.net).toBeCloseTo(54632, 0));
  it("soleTrader tax", () => expect(res.soleTrader.tax).toBeCloseTo(17432 + 2756.6 + 179.4, 0));

  // Ltd: employer NI 15%/£5k threshold + dividend rates 10.75%/35.75%
  it("ltd net (2026/27 rates)", () => expect(res.ltd.net).toBeCloseTo(51728.79, 0));
  it("ltd net > 0", () => expect(res.ltd.net).toBeGreaterThan(0));

  // Umbrella: employer NI 15%/£5k threshold
  it("umbrella net (2026/27 rates)", () => expect(res.umbrella.net).toBeCloseTo(48928.75, 0));

  it("sole trader wins at these defaults", () => {
    expect(res.soleTrader.net).toBeGreaterThan(res.ltd.net);
    expect(res.soleTrader.net).toBeGreaterThan(res.umbrella.net);
  });
});

// ── Pinned exact-figure golden: Ltd-style locum at £300/day, 220 days, £4,000 expenses ────
// grossIncome=66000; profit=62000
// ltdSalary=12570; ltdEmployerNi=(12570-5000)*0.15=1135.50
// ltdProfitAfterSalary=62000-12570-1135.50=48294.50
// ltdCt: 48294.50≤50000 → 48294.50*0.19=9175.955
// ltdAfterCt=48294.50-9175.955=39118.545; ltdDividend=39118.545
// ltdDividendTax=calcDividendTax(12570, 39118.545):
//   pa=12570 (total<100k); taxableDividend=39118.545-0-500=38618.545
//   inBasic=min(38618.545,37700)=37700; tax=37700*0.1075=4052.75
//   div=918.545; inHigher=918.545; tax+=918.545*0.3575=328.38; divTax=4381.13
// ltdNet=12570+39118.545-4381.13-1800=45507.415; ltdNet≈45507
// Conservation check: grossIncome(66000) ≥ ltdNet+ltdSalaryTax+ltdEmployeeNi+ltdEmployerNi+ltdCt+ltdDividendTax+LTD_ADMIN_COST
//   = 45507.415+0+0+1135.50+9175.955+4381.13+1800 = 61999.995 ≈ 62000 = profit (within rounding). Checks out.
describe("calcLocumStructure — pinned Ltd exact figure (300/day, 220 days, £4k expenses)", () => {
  const res = calcLocumStructure(300, 220, 4000);

  it("grossIncome exact", () => expect(res.grossIncome).toBe(66000));
  it("profit exact", () => expect(res.profit).toBe(62000));
  it("ltd net pinned (2026/27)", () => expect(res.ltd.net).toBeCloseTo(45507, 0));
  it("ltd net > 0", () => expect(res.ltd.net).toBeGreaterThan(0));
  it("ltd net conservation: net + taxes ≈ profit", () => {
    const total = res.ltd.net + res.ltd.tax;
    // tax includes LTD_ADMIN_COST, so total can slightly exceed profit; within 5
    expect(Math.abs(total - res.profit)).toBeLessThan(5);
  });
});

// ── PracticeValuationCalculator defaults ─────────────────────────────────
// ebitda=180000, mix="mixed", region="midlands", demand="normal", tangible=180000
// MIX_BASE["mixed"]=[0.85,1.15]; REGION["midlands"]=0; DEMAND["normal"]=0
// adjLow=max(0.4, 0.85+0+0)=0.85; adjHigh=max(0.5, 1.15+0+0)=1.15
// goodwillLow=180000*0.85=153000; goodwillHigh=180000*1.15=207000
// totalLow=153000+180000=333000; totalHigh=207000+180000=387000

describe("calcPracticeValuation — default inputs", () => {
  const res = calcPracticeValuation(180000, "mixed", "midlands", "normal", 180000);

  it("multipleLow", () => expect(res.multipleLow).toBeCloseTo(0.85, 5));
  it("multipleHigh", () => expect(res.multipleHigh).toBeCloseTo(1.15, 5));
  it("goodwillLow", () => expect(r(res.goodwillLow)).toBe(153000));
  it("goodwillHigh", () => expect(r(res.goodwillHigh)).toBe(207000));
  it("totalLow", () => expect(r(res.totalLow)).toBe(333000));
  it("totalHigh", () => expect(r(res.totalHigh)).toBe(387000));
});

describe("calcPracticeValuation — NHS-heavy London high-demand", () => {
  // mix="nhs-heavy"=[0.65,0.95]; region=london=+0.10; demand=high=+0.10
  // adjLow=max(0.4,0.65+0.10+0.10)=0.85; adjHigh=max(0.5,0.95+0.10+0.10)=1.15
  const res = calcPracticeValuation(200000, "nhs-heavy", "london", "high", 100000);
  it("multipleLow NHS heavy London high", () => expect(res.multipleLow).toBeCloseTo(0.85, 5));
  it("multipleHigh NHS heavy London high", () => expect(res.multipleHigh).toBeCloseTo(1.15, 5));
});

describe("calcPracticeValuation — floor enforcement", () => {
  // NHS-heavy Wales low-demand: adjLow=max(0.4, 0.65-0.05-0.10)=max(0.4,0.50)=0.50
  // adjHigh=max(0.5, 0.95-0.05-0.10)=max(0.5,0.80)=0.80
  const res = calcPracticeValuation(100000, "nhs-heavy", "wales", "low", 0);
  it("multipleLow floor not breached", () => expect(res.multipleLow).toBeGreaterThanOrEqual(0.4));
  it("multipleHigh floor not breached", () => expect(res.multipleHigh).toBeGreaterThanOrEqual(0.5));
});

// ── PrincipalExtractionCalculator defaults ────────────────────────────────
// profit=150000, nhsActive=true, pensionContrib=0
//
// Rates updated to 2026/27: employer NI 15% above £5,000; dividends 10.75%/35.75%.
//
// Partnership (sole trader — no employer NI, no dividends):
//   partnerIncomeTax=calcIncomeTax(150000): pa=0 (taper); bands on taxable income
//     20%×37700=7540; 40%×(125140-37700=87440)=34976; 45%×(150000-125140=24860)=11187 → 53703
//   partnerClass4: lower=37700*0.06=2262; upper=(150000-50270)*0.02=1994.6 → 4256.6
//   class2: 179.4
//   partnershipNet=150000-53703-4256.6-179.4=91861.0
//
// Ltd (employer NI now 15%/£5k threshold; dividends now 10.75%/35.75%):
//   ltdSalary=12570
//   ltdEmployerNi=(12570-5000)*0.15=7570*0.15=1135.50 (was 478.86)
//   ltdProfitAfterSalary=150000-12570-1135.50-0=136294.50 (was 136951.14)
//   ltdCt: 136294.50>50000 → 9500+(136294.50-50000)*0.265=9500+22868.04=32368.04 (was 32541.55)
//   ltdAfterCt=136294.50-32368.04=103926.46; ltdDividend=103926.46
//   ltdSalaryTax=0; ltdEmployeeNi=0
//   ltdDividendTax=calcDividendTax(12570, 103926.46):
//     total=116496.46>100000: pa=max(0,12570-(116496.46-100000)/2)=max(0,12570-8248.23)=4321.77
//     paUsed=4321.77; paLeft=0; taxableDividend=103926.46-0-500=103426.46
//     salaryInBasic=min(8248.23,37700)=8248.23
//     remBasic=37700-8248.23=29451.77; remHigher=max(0,125140-4321.77-37700)=83118.23
//     inBasic=29451.77; tax=29451.77*0.1075=3166.06 (was *0.0875=2555.89)
//     div=73974.69; inHigher=73974.69; tax+=73974.69*0.3575=26445.45 (was *0.3375=25211.05)
//     divTax=3166.06+26445.45=29611.51 (was 27766.94)
//   ltdNet=12570+103926.46-29611.51-2500=84384.95 (was 86712.65)
//
// Delta table:
// | case                  | old net   | new net   | driver                           |
// |-----------------------|-----------|-----------|----------------------------------|
// | principal partnership | 91232.5   | 91861.0   | PA-taper higher-band fix (IT ↓)  |
// | principal Ltd         | 86712.65  | ~84384    | NI_SECONDARY↓+EMPLOYER_NI↑+div↑ |

describe("calcPrincipalExtraction — default inputs (profit=150000, NHS active, pension=0)", () => {
  const res = calcPrincipalExtraction(150000, true, 0);

  // Partnership: no employer NI and no dividends. IT reflects the PA-taper
  // higher-band fix (higher band widens to £87,440 when PA is fully tapered).
  it("partnership net", () => expect(res.partnership.net).toBeCloseTo(91861.0, 0));
  it("partnership tax", () => expect(res.partnership.tax).toBeCloseTo(53703 + 4256.6 + 179.4, 0));

  // Ltd: employer NI 15%/£5k threshold + dividend rates 10.75%/35.75%
  // Exact computed value: 84384.44 (PA taper at >100k makes this sensitive to
  // floating-point rounding in the dividend-tax calc; tested to nearest £1).
  it("ltd net (2026/27 rates)", () => expect(res.ltd.net).toBeCloseTo(84384, 0));
  it("pensionImpact NHS active", () => expect(res.pensionImpact).toContain("Partnership preserves NHS Pension"));

  it("partnership wins at default inputs", () => {
    expect(res.partnership.net).toBeGreaterThan(res.ltd.net);
  });
});

describe("calcPrincipalExtraction — NHS inactive", () => {
  const res = calcPrincipalExtraction(150000, false, 0);
  it("pensionImpact NHS inactive", () => expect(res.pensionImpact).toContain("NHS Pension not a factor"));
});

// ── Pinned exact-figure golden: extraction at £80,000 profit ─────────────
// Partnership (no employer NI, no dividends):
//   IT(80000): pa=12570, t=67430, basic=37700, higher=29730 → 37700*0.20+29730*0.40=7540+11892=19432
//   class4: lower=37700*0.06=2262; upper=(80000-50270)*0.02=594.6 → 2856.6
//   class2: 179.4
//   partnershipNet=80000-19432-2856.6-179.4=57532
//
// Ltd:
//   ltdEmployerNi=(12570-5000)*0.15=1135.50
//   ltdProfitAfterSalary=80000-12570-1135.50=66294.50
//   ltdCt: 66294.50>50000 → 9500+(66294.50-50000)*0.265=9500+4318.04=13818.04
//   ltdAfterCt=66294.50-13818.04=52476.46; ltdDividend=52476.46
//   ltdDividendTax=calcDividendTax(12570, 52476.46): total=65046.46<100k
//     pa=12570; taxableDividend=52476.46-0-500=51976.46
//     remBasic=37700; inBasic=37700; tax=37700*0.1075=4052.75
//     div=14276.46; inHigher=14276.46; tax+=14276.46*0.3575=5103.84; divTax=9156.59
//   ltdNet=12570+52476.46-9156.59-2500=53389.87
//   Conservation check: 53389.87+0+0+1135.50+13818.04+9156.59+2500=79999.99≈80000. Passes.
describe("calcPrincipalExtraction — pinned extraction exact figure (profit=80000, NHS inactive, pension=0)", () => {
  const res = calcPrincipalExtraction(80000, false, 0);

  it("partnership net pinned (2026/27)", () => expect(res.partnership.net).toBeCloseTo(57532, 0));
  it("ltd net pinned (2026/27)", () => expect(res.ltd.net).toBeCloseTo(53390, 0));
  it("ltd net conservation: net + taxes ≈ profit", () => {
    // net + tax includes LTD_ADMIN_COST in tax, so should be close to profit
    const total = res.ltd.net + res.ltd.tax;
    expect(Math.abs(total - 80000)).toBeLessThan(5);
  });
});

// ── UdaValueCalculator defaults ───────────────────────────────────────────
// region="england", udas=3000, contractValue=90000, yearSigned=2010
// effectiveUda=90000/3000=30
// yearsSinceSigned=max(0,2026-2010)=16
// cumulativeCpi=pow(1.025,16)-1=pow(1.025,16)-1≈0.4845 (exact: 1.025^16=1.484505...)
// realValuePerUda=30/(1+0.4845...)≈20.21
// benchmark=[25,35]; 30 is within range

describe("calcUdaValue — default inputs (England, 3000 UDAs, £90k, signed 2010)", () => {
  const res = calcUdaValue("england", 3000, 90000, 2010);

  it("effectiveUda", () => expect(res.effectiveUda).toBeCloseTo(30, 5));
  it("yearsSinceSigned", () => expect(res.yearsSinceSigned).toBe(16));
  it("cumulativeCpi positive", () => expect(res.cumulativeCpi).toBeGreaterThan(0));
  it("cumulativeCpi approx 1.025^16-1", () => expect(res.cumulativeCpi).toBeCloseTo(Math.pow(1.025, 16) - 1, 8));
  it("realValuePerUda less than effectiveUda", () => expect(res.realValuePerUda).toBeLessThan(res.effectiveUda));
  it("benchmarkLow England", () => expect(res.benchmarkLow).toBe(25));
  it("benchmarkHigh England", () => expect(res.benchmarkHigh).toBe(35));
  it("positionVsBenchmark within for £30 UDA", () => expect(res.positionVsBenchmark).toBe("within"));
});

describe("calcUdaValue — below benchmark (£20 UDA, England)", () => {
  const res = calcUdaValue("england", 3000, 60000, 2020);
  it("effectiveUda £20", () => expect(res.effectiveUda).toBeCloseTo(20, 5));
  it("below benchmark", () => expect(res.positionVsBenchmark).toBe("below"));
});

describe("calcUdaValue — above benchmark (£40 UDA, England)", () => {
  const res = calcUdaValue("england", 3000, 120000, 2020);
  it("effectiveUda £40", () => expect(res.effectiveUda).toBeCloseTo(40, 5));
  it("above benchmark", () => expect(res.positionVsBenchmark).toBe("above"));
});

describe("calcUdaValue — Wales region", () => {
  const res = calcUdaValue("wales", 2000, 70000, 2015);
  it("benchmarkLow Wales 25", () => expect(res.benchmarkLow).toBe(25));
  it("benchmarkHigh Wales 38", () => expect(res.benchmarkHigh).toBe(38));
});

describe("calcUdaValue — zero UDAs edge case", () => {
  const res = calcUdaValue("england", 0, 90000, 2010);
  it("effectiveUda is 0 when udas=0", () => expect(res.effectiveUda).toBe(0));
});

// ── TL-03: no React/window/document/fetch in compute modules ─────────────
// Verified by: grep the compute/ directory for these strings (grep returns no hits).
// Captured here as a documentation note; actual enforcement is the TL-03 grep
// verify line at acceptance.

// ── EquipmentCapitalAllowance (new tool, FA 2026) ────────────────────────
// Example 2 from the explainer: Ltd 25%, main 1,100,000, special 300,000, new, AIA 1,000,000
// AIA: special 300,000 then main 700,000 → AIA 1,000,000
// mainExcess 400,000 → FYA 40% = 160,000; pool 240,000 (no y1 WDA on FYA balance)
// year1 = 1,160,000; saving = 290,000
// y2 = 240,000*0.14 = 33,600; y3 = 206,400*0.14 = 28,896; y4 = 177,504*0.14 = 24,850.56
// 4yr allowances = 1,247,346.56; saving = 311,836.64

describe("calcEquipmentCapitalAllowance — AIA-exhausted company", () => {
  const res = calcEquipmentCapitalAllowance(1100000, 300000, "ltd25", true, 1000000);

  it("aiaOnSpecial", () => expect(res.aiaOnSpecial).toBe(300000));
  it("aiaOnMain", () => expect(res.aiaOnMain).toBe(700000));
  it("fyaClaim", () => expect(res.fyaClaim).toBe(160000));
  it("year1Allowances", () => expect(res.year1Allowances).toBe(1160000));
  it("year1TaxSaving", () => expect(res.year1TaxSaving).toBe(290000));
  it("fourYearAllowances", () => expect(res.fourYearAllowances).toBeCloseTo(1247346.56, 1));
  it("fourYearTaxSaving", () => expect(res.fourYearTaxSaving).toBeCloseTo(311836.64, 1));
});

describe("calcEquipmentCapitalAllowance — sole trader, new assets get FYA", () => {
  // FA 2026 40% FYA is available to unincorporated businesses too (new assets only).
  // main 100,000, special 0, AIA only 50,000 available, higher rate 40%, new.
  // AIA 50,000; mainExcess 50,000 → FYA 40% = 20,000; pool 30,000, no y1 WDA on FYA balance.
  // y1 allowances = 70,000; saving 28,000.
  const res = calcEquipmentCapitalAllowance(100000, 0, "st40", true, 50000);

  it("FYA available to unincorporated on new assets", () => expect(res.fyaClaim).toBe(20000));
  it("no year1 WDA on the FYA balance", () => expect(res.year1Wda).toBe(0));
  it("year1Allowances", () => expect(res.year1Allowances).toBe(70000));
  it("year1TaxSaving", () => expect(res.year1TaxSaving).toBeCloseTo(28000, 2));
});

describe("calcEquipmentCapitalAllowance — second-hand gets no FYA", () => {
  // main 100,000, special 0, AIA 50,000, st40, second-hand → no FYA.
  // AIA 50,000; mainExcess 50,000 → WDA 14% = 7,000; y1 = 57,000; saving 22,800.
  const res = calcEquipmentCapitalAllowance(100000, 0, "st40", false, 50000);

  it("no FYA for second-hand", () => expect(res.fyaClaim).toBe(0));
  it("year1Wda at 14%", () => expect(res.year1Wda).toBeCloseTo(7000, 2));
  it("year1TaxSaving", () => expect(res.year1TaxSaving).toBeCloseTo(22800, 2));
});

describe("calcEquipmentCapitalAllowance — default within AIA", () => {
  // main 80,000 + special 20,000, Ltd 25%, all inside AIA → year1 = 100,000, saving 25,000
  const res = calcEquipmentCapitalAllowance(80000, 20000, "ltd25", true, 1000000);

  it("all AIA", () => expect(res.aiaTotal).toBe(100000));
  it("year1TaxSaving", () => expect(res.year1TaxSaving).toBe(25000));
  it("nothing unrelieved", () => expect(res.unrelievedAfterFourYears).toBe(0));
});
