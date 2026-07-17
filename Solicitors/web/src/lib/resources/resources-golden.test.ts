/**
 * Golden tests for the Solicitors resource workbooks.
 *
 * Each test asserts that the TypeScript compute lib output (the source of truth
 * for all numeric values) matches the expected golden values derived from the
 * lib at the point the xlsx builder was authored.
 *
 * These tests do NOT run the xlsx builder (exceljs is a devDependency and cannot
 * be imported inside Vitest's src/ scope). They assert the lib → value chain, so
 * that any change to a compute lib that breaks a golden value is caught before
 * the xlsx is regenerated and a category's enabled flag is flipped.
 *
 * Golden values were derived by running the libs directly (Node.js / tsx) on
 * 2026-07-06, using the corrected lib constants:
 *   - NI_SECONDARY = 5000 (employer NIC threshold from April 2025)
 *   - Dividend rates: 10.75% / 35.75% / 39.35% (FA 2026 s.4 from 6 April 2026)
 */
import { calcSolicitorTakeHome } from "../tools/compute/solicitor-take-home";
import { describe, it, expect } from "vitest";
import { calcSraReserve } from "@/lib/tools/compute/sra-client-account-reserve";
import { calcLLPProfitShare } from "@/lib/tools/compute/llp-profit-share";
import { calcPracticeSaleCgt } from "@/lib/tools/compute/practice-sale-cgt";
import { calcSolicitorTakeHome } from "@/lib/tools/compute/solicitor-take-home";

const CLOSE_ENOUGH = 0.01; // pennies tolerance for floating-point rounding

// ── R1 SRA reserve ────────────────────────────────────────────────────────────

describe("R1 SRA client account reserve golden values", () => {
  // Sample scenario: 150 matters, moderate volume, conveyancing
  // Volume.moderate avg = 8000 → peak = 150 * 8000 = 1,200,000
  // risk factor conveyancing = 0.025 → central reserve = 30,000
  // low = 30,000 * 0.7 = 21,000, high = 30,000 * 1.5 = 45,000
  const result = calcSraReserve({
    openMatters: 150,
    volume: "moderate",
    matterType: "conveyancing",
    averageBalance: 8000,
    maximumBalance: 240000,
  });

  it("peak client money", () => {
    expect(result.peakClientMoney).toBeCloseTo(1_200_000, 0);
  });

  it("suggested reserve (central)", () => {
    expect(result.suggestedReserve).toBeCloseTo(30_000, 0);
  });

  it("low reserve", () => {
    expect(result.lowReserve).toBeCloseTo(21_000, 0);
  });

  it("high reserve", () => {
    expect(result.highReserve).toBeCloseTo(45_000, 0);
  });

  it("Rule 12.2 exemption — PASS (avg=8000 <= 10000 AND max=240000 <= 250000)", () => {
    expect(result.exemptionEligible).toBe(true);
  });

  it("Rule 12.2 exemption — FAIL when max exceeds 250,000", () => {
    const failMax = calcSraReserve({
      openMatters: 150,
      volume: "moderate",
      matterType: "conveyancing",
      averageBalance: 8000,
      maximumBalance: 260000,  // exceeds £250,000 threshold
    });
    expect(failMax.exemptionEligible).toBe(false);
  });

  it("Rule 12.2 exemption — FAIL when average exceeds 10,000", () => {
    const failAvg = calcSraReserve({
      openMatters: 150,
      volume: "moderate",
      matterType: "conveyancing",
      averageBalance: 12000,  // exceeds £10,000 threshold
      maximumBalance: 100000,
    });
    expect(failAvg.exemptionEligible).toBe(false);
  });
});

// ── R2 Partnership LLP profit allocation ──────────────────────────────────────

describe("R2 LLP profit share golden values", () => {
  // Two-tier: 3 senior (1.5x) + 2 junior (1x), profit = 800,000
  // totalPoints = 3*1.5 + 2*1 = 6.5
  // valuePerPoint = 800,000 / 6.5 = 123,076.923...
  // seniorShare = 123,076.923 * 1.5 = 184,615.384...
  // juniorShare = 123,076.923 * 1.0 = 123,076.923...
  const result = calcLLPProfitShare({
    totalProfit: 800_000,
    method: "two-tier",
    seniorPartners: 3,
    juniorPartners: 2,
    fixedSharePartners: 0,
    fixedShareEach: 0,
    seniorMultiplier: 1.5,
  });

  it("senior partner count", () => {
    const seniors = result.partners.filter((p) => p.label.includes("Senior"));
    expect(seniors).toHaveLength(3);
  });

  it("senior partner share each", () => {
    const seniors = result.partners.filter((p) => p.label.includes("Senior"));
    expect(seniors[0].share).toBeCloseTo(184_615.38, 1);
  });

  it("junior partner share each", () => {
    const juniors = result.partners.filter((p) => p.label.includes("Junior"));
    expect(juniors[0].share).toBeCloseTo(123_076.92, 1);
  });

  it("total allocation reconciles to firm profit", () => {
    const total = result.partners.reduce((sum, p) => sum + p.share, 0);
    expect(total).toBeCloseTo(800_000, 0);
  });
});

// ── R3 Practice sale CGT ──────────────────────────────────────────────────────

describe("R3 practice sale CGT golden values", () => {
  // Scenario A: BADR eligible, gain = 900,000, otherIncome = 50,000
  // AEA = 3,000 → taxableGain = 897,000
  // basicBandRemaining: incomeInBasicBand = min(50000-12570, 50270-12570) = 37,430
  //   basicBandRemaining = (50270-12570) - 37430 = 270
  // BADR eligible: gainAtBadr = min(897000, 1000000) = 897000
  // basicBandAfterBadr = max(0, 270 - 897000) = 0
  // remainingGain after BADR = 0
  // totalCgt = 897000 * 0.18 = 161,460
  // netProceeds = 900,000 - 161,460 = 738,540
  describe("Scenario A — BADR eligible, gain 900k, otherIncome 50k", () => {
    const r = calcPracticeSaleCgt({
      gain: 900_000,
      otherIncome: 50_000,
      badrEligible: true,
      aeaAvailable: 3_000,
      badrLifetimeRemaining: 1_000_000,
    });

    it("taxableGain", () => expect(r.taxableGain).toBeCloseTo(897_000, CLOSE_ENOUGH));
    it("gainAtBadr", () => expect(r.gainAtBadr).toBeCloseTo(897_000, CLOSE_ENOUGH));
    it("totalCgt", () => expect(r.totalCgt).toBeCloseTo(161_460, CLOSE_ENOUGH));
    it("netProceeds", () => expect(r.netProceeds).toBeCloseTo(738_540, CLOSE_ENOUGH));
  });

  // Scenario B: no BADR, gain = 100,000, otherIncome = 60,000
  // AEA = 3,000 (default) → taxableGain = 97,000
  // incomeInBasicBand = min(60000-12570, 50270-12570) = min(47430, 37700) = 37,700
  // basicBandRemaining = 37700 - 37700 = 0 (ALL basic band used by income)
  // gainAtBasic = 0, gainAtHigher = 97000
  // totalCgt = 97000 * 0.24 = 23,280
  // netProceeds = 100,000 - 23,280 = 76,720
  describe("Scenario B — no BADR, gain 100k, otherIncome 60k", () => {
    const r = calcPracticeSaleCgt({
      gain: 100_000,
      otherIncome: 60_000,
      badrEligible: false,
    });

    it("taxableGain", () => expect(r.taxableGain).toBeCloseTo(97_000, CLOSE_ENOUGH));
    it("gainAtBadr", () => expect(r.gainAtBadr).toBe(0));
    it("gainAtBasic", () => expect(r.gainAtBasic).toBe(0));
    it("gainAtHigher", () => expect(r.gainAtHigher).toBeCloseTo(97_000, CLOSE_ENOUGH));
    it("totalCgt", () => expect(r.totalCgt).toBeCloseTo(23_280, CLOSE_ENOUGH));
    it("netProceeds", () => expect(r.netProceeds).toBeCloseTo(76_720, CLOSE_ENOUGH));
  });
});

// ── R4 Solicitor take-home ────────────────────────────────────────────────────

describe("R4 solicitor take-home golden values (corrected 2026-07-06)", () => {
  // profit = 120,000, pensionContrib = 0
  // Partnership / sole trader:
  //   IT: PA = 12570, basic = 50270-12570 = 37700, higher = min(120000-12570-37700, 125140-50270) = 69730... wait
  //   taxable = 120000
  //   PA = min(12570, max(0, 12570-(120000-100000)/2)) = max(0, 12570-10000) = 2570
  //   above PA = 120000-2570 = 117430
  //   basic = min(117430, 37700) = 37700
  //   higher band top (taxable) = 125140-PA = 125140-2570 = 122570; width = 122570-37700 = 84870
  //   higher = min(117430-37700, 84870) = min(79730, 84870) = 79730
  //   additional = max(0, 117430-37700-79730) = 0
  //   IT = 37700*0.20 + 79730*0.40 = 7540+31892 = 39432
  //   Class4: lower band = (50270-12570)*0.06 = 37700*0.06 = 2262
  //           upper = (120000-50270)*0.02 = 69730*0.02 = 1394.6
  //           total C4 = 3656.6
  //   Net = 120000 - 39432 - 3656.6 = 76911.4 ✓
  //
  // Ltd:
  //   salary = 12570
  //   employerNI = (12570-5000)*0.15 = 7570*0.15 = 1135.5
  //   profitAfterSalary = 120000-12570-1135.5 = 106294.5
  //   CT (between 50k and 250k): 50000*0.19 + (106294.5-50000)*0.265 = 9500+14918.0425 = 24418.04
  //   afterCT = 106294.5-24418.04 = 81876.46
  //   dividend = 81876.46
  //   salaryTax = max(0,12570-12570)*0.20 = 0 (salary = PA so no IT)
  //   employeeNI on salary = (12570-12570)*0.08 = 0 (at primary threshold, zero bracket)
  //   dividendTax: paUsedBySalary=12570, paLeftForDiv=0, taxableDividend=max(0,81876.46-0-500)=81376.46
  //   basicBand=37700, salaryInBasic=min(max(0,12570-12570),37700)=0
  //   remBasic=37700-0=37700, remHigher=74870
  //   inBasic=min(81376.46,37700)=37700, inHigher=min(81376.46-37700,74870)=43676.46
  //   divTax=37700*0.1075+43676.46*0.3575=4052.75+15614.33=19667.08
  //   adminCost=2500
  //   ltdNet=12570-0-0+(81876.46-19667.08)-2500=12570+62209.38-2500=72279.38 ≈ 72279.37 ✓
  const result = calcSolicitorTakeHome({ profit: 120_000, pensionContrib: 0 });

  it("partnership take-home", () => {
    expect(result.partnership.net).toBeCloseTo(76_911.4, 0);
  });

  it("soleTrader take-home (equals partnership)", () => {
    expect(result.soleTrader.net).toBeCloseTo(result.partnership.net, 0);
  });

  it("ltd take-home", () => {
    expect(result.ltd.net).toBeCloseTo(72_279.37, 0);
  });

  it("partnership take-home > ltd take-home at profit=120k", () => {
    expect(result.partnership.net).toBeGreaterThan(result.ltd.net);
  });
});

describe("preview-figure drift guards", () => {
  it("junior partner preview figure matches the corrected take-home lib", () => {
    const r = calcSolicitorTakeHome({ profit: 800000 / 6.5, pensionContrib: 0 });
    expect(r.partnership.net).toBeCloseTo(78080.63, 0);
  });
});
