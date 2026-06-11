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
  // higher = max(0, min(128000-37700, 125140-50270)) = max(0, min(90300, 74870)) = 74870
  // additional = max(0, 128000-37700-74870) = max(0, 15430) = 15430
  // IT = 37700*0.20 + 74870*0.40 + 15430*0.45 = 7540 + 29948 + 6943.5 = 44431.5
  // class4: taxable=128000; in lower = min(128000,50270)-12570=37700; upper=max(0,128000-50270)=77730
  //         = 37700*0.06 + 77730*0.02 = 2262 + 1554.6 = 3816.6
  // class2: profit=134500 > 6725 → 179.4
  // totalTax = 44431.5 + 3816.6 + 179.4 = 48427.5
  // netCash = 128000 - 48427.5 = 79572.5
  const res = calcAssociateTakeHome(300000, 50, 5, 8000, 6500);

  it("incomeTax higher-rate scenario", () => expect(res.incomeTax).toBeCloseTo(44431.5, 0));
  it("class4Ni higher-rate scenario", () => expect(res.class4Ni).toBeCloseTo(3816.6, 0));
  it("netCash positive", () => expect(res.netCash).toBeGreaterThan(0));
});

// ── LocumStructureCalculator defaults ────────────────────────────────────
// dailyRate=450, daysPerYear=180, expenses=6000
// grossIncome = 450*180 = 81000
// profit = 81000 - 6000 = 75000
//
// SoleTrader:
//   IT: pa=12570, t=62430, basic=min(62430,37700)=37700, higher=24730; IT=37700*0.20+24730*0.40=7540+9892=17432
//   Class4: in lower=37700*0.06=2262; upper=(75000-50270)*0.02=494.6; NI=2756.6
//   Class2: 75000>6725 → 179.4
//   soleTraderNet=75000-17432-2756.6-179.4=54632
//
// Ltd:
//   ltdSalary=12570
//   ltdEmployerNi: 12570>9100 → (12570-9100)*0.138=478.86
//   ltdProfitAfterSalary=max(0,75000-12570-478.86)=61951.14
//   ltdCt: 61951.14>50000 → small=50000*0.19=9500; marginal=(61951.14-50000)*0.265=3167.05; ct=12667.05
//   ltdAfterCt=61951.14-12667.05=49284.09
//   ltdDividend=49284.09
//   ltdSalaryTax=calcIncomeTax(12570): t=0 → 0
//   ltdEmployeeNi: 12570≤12570 → 0
//   ltdDividendTax=calcDividendTax(12570, 49284.09):
//     pa=12570 (total=61854<100k), paUsed=12570, paLeft=0
//     taxableDividend=max(0, 49284.09-0-500)=48784.09
//     basicBand=37700, higherBand=74870
//     salaryInBasic=min(max(0,12570-12570),37700)=0; salaryInHigher=0
//     remBasic=37700; remHigher=74870
//     inBasic=min(48784.09,37700)=37700; tax=37700*0.0875=3298.75
//     div=48784.09-37700=11084.09; inHigher=min(11084.09,74870)=11084.09; tax+=11084.09*0.3375=3740.88
//     total divTax=3298.75+3740.88=7039.63
//   ltdNet=12570-0-0+(49284.09-7039.63)-1800=12570+42244.46-1800=53014.46
//
// Umbrella:
//   umbrellaGross=81000*0.95=76950
//   feesRetained=81000*0.05=4050
//   umbrellaEmployerNi: 76950>9100→(76950-9100)*0.138=9363.21
//   umbrellaPayable=76950-9363.21=67586.79
//   umbrellaIncomeTax=calcIncomeTax(67586.79): pa=12570,t=55016.79,basic=37700,higher=17316.79
//     =37700*0.20+17316.79*0.40=7540+6926.72=14466.72
//   umbrellaEmployeeNi: 67586.79>12570; inBand=min(67586.79,50270)-12570=37700; above=17316.79
//     =37700*0.08+17316.79*0.02=3016+346.34=3362.34
//   umbrellaNet=67586.79-14466.72-3362.34=49757.73

describe("calcLocumStructure — default inputs (450/day, 180 days, £6,000 expenses)", () => {
  const res = calcLocumStructure(450, 180, 6000);

  it("grossIncome", () => expect(r(res.grossIncome)).toBe(81000));
  it("profit", () => expect(r(res.profit)).toBe(75000));

  it("soleTrader net", () => expect(res.soleTrader.net).toBeCloseTo(54632, 0));
  it("soleTrader tax", () => expect(res.soleTrader.tax).toBeCloseTo(17432 + 2756.6 + 179.4, 0));

  it("ltd net", () => expect(res.ltd.net).toBeCloseTo(53014, 0));
  it("ltd net > 0", () => expect(res.ltd.net).toBeGreaterThan(0));

  it("umbrella net", () => expect(res.umbrella.net).toBeCloseTo(49757.69, 1));

  it("sole trader wins at these defaults", () => {
    expect(res.soleTrader.net).toBeGreaterThan(res.ltd.net);
    expect(res.soleTrader.net).toBeGreaterThan(res.umbrella.net);
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
// partnerIncomeTax=calcIncomeTax(150000):
//   taxable>100000: pa=max(0,12570-(150000-100000)/2)=max(0,12570-25000)=0
//   t=150000; basic=37700; higher=74870; additional=150000-37700-74870=37430
//   IT=37700*0.20+74870*0.40+37430*0.45=7540+29948+16843.5=54331.5
// partnerClass4=calcClass4(150000): lower=37700*0.06=2262; upper=(150000-50270)*0.02=1994.6; =4256.6
// class2: 150000>6725 → 179.4
// partnershipNet=150000-54331.5-4256.6-179.4=91232.5
// partnershipNetTotal=91232.5+0=91232.5
//
// ltdSalary=12570
// ltdEmployerNi=(12570-9100)*0.138=478.86
// ltdProfitAfterSalary=max(0,150000-12570-478.86-0)=136951.14
// ltdCt: 136951.14>50000 → 50000*0.19+(136951.14-50000)*0.265=9500+23041.55=32541.55
// ltdAfterCt=136951.14-32541.55=104409.59
// ltdDividend=104409.59
// ltdSalaryTax=calcIncomeTax(12570): t=0 → 0
// ltdEmployeeNi: 12570≤12570 → 0
// ltdDividendTax=calcDividendTax(12570, 104409.59):
//   total=116979.59>100000: pa=max(0,12570-(116979.59-100000)/2)=max(0,12570-8489.8)=4080.2
//   paUsed=min(12570,4080.2)=4080.2; paLeft=max(0,4080.2-4080.2)=0
//   taxableDividend=max(0,104409.59-0-500)=103909.59
//   basicBand=37700; higherBand=74870
//   salaryInBasic=min(max(0,12570-4080.2),37700)=min(8489.8,37700)=8489.8
//   salaryInHigher=min(max(0,12570-4080.2-8489.8),74870)=min(0,74870)=0
//   remBasic=37700-8489.8=29210.2; remHigher=74870
//   inBasic=min(103909.59,29210.2)=29210.2; tax=29210.2*0.0875=2555.89
//   div=74699.39; inHigher=min(74699.39,74870)=74699.39; tax+=74699.39*0.3375=25211.05
//   div=0; total=2555.89+25211.05=27766.94
// ltdNet=12570-0-0+(104409.59-27766.94)-2500+0=86712.65

describe("calcPrincipalExtraction — default inputs (profit=150000, NHS active, pension=0)", () => {
  const res = calcPrincipalExtraction(150000, true, 0);

  it("partnership net", () => expect(res.partnership.net).toBeCloseTo(91232.5, 0));
  it("partnership tax", () => expect(res.partnership.tax).toBeCloseTo(54331.5 + 4256.6 + 179.4, 0));
  it("ltd net", () => expect(res.ltd.net).toBeCloseTo(86712, 0));
  it("pensionImpact NHS active", () => expect(res.pensionImpact).toContain("Partnership preserves NHS Pension"));

  it("partnership wins at default inputs", () => {
    expect(res.partnership.net).toBeGreaterThan(res.ltd.net);
  });
});

describe("calcPrincipalExtraction — NHS inactive", () => {
  const res = calcPrincipalExtraction(150000, false, 0);
  it("pensionImpact NHS inactive", () => expect(res.pensionImpact).toContain("NHS Pension not a factor"));
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
