/**
 * Golden tests for Solicitors site calculator compute libs.
 *
 * All values are pinned to the current lib outputs (post R2 updates).
 * Any mismatch means a lib changed behaviour — that is a STOP.
 *
 * FIGURES CHECKED (2026-07-05 — R2 manager-ordered fixes applied):
 * - SolicitorTakeHome: UPDATED to 2026/27 UK rates (FA 2026 s.4 dividend rates
 *   10.75%/35.75%/39.35% from 6 Apr 2026, HP §3). Partnership/sole-trader golden
 *   values are unchanged (no dividends). Ltd golden values updated to 2026/27
 *   dividend rates. All outputs relabelled 2026/27 basis.
 * - FA2014SalariedMember: purely statutory test (FA 2014 s.863A-863G), no date-sensitive rates.
 *   No stale-figure STOP.
 * - LLPProfitShare: no tax rates, pure allocation arithmetic. No stale-figure STOP.
 * - LawFirmValuation: indicative market multiples, no statutory rates. No stale-figure STOP.
 * - SraReserve: UPDATED exemption test (R2 flag F3). The old `avgBalance <= 250` was
 *   WRONG against HP §5.G. Corrected to `averageBalance <= 10000 && maximumBalance <= 250000`.
 *   The exemptionEligible field now requires averageBalance + maximumBalance inputs; when
 *   omitted, exemptionEligible is undefined (not false).
 * - IndemnityPremium: indicative market rates, not statutory. No stale-figure STOP.
 */

import { describe, it, expect } from "vitest";
import { calcSolicitorTakeHome } from "./solicitor-take-home";
import { calcFA2014SalariedMember } from "./fa2014-salaried-member";
import { calcLLPProfitShare } from "./llp-profit-share";
import { calcLawFirmValuation } from "./law-firm-valuation";
import { calcSraReserve } from "./sra-client-account-reserve";
import { calcIndemnityPremium } from "./indemnity-premium";

// ── SolicitorTakeHomeCalculator golden tests ─────────────────────────────────
// 2026/27 rates (updated R2 2026-07-05). Partnership/sole-trader arithmetic is
// unchanged from 2025/26 (no dividends involved). Ltd arithmetic uses the updated
// 2026/27 dividend rates: 10.75% basic / 35.75% higher / 39.35% additional (FA 2026 s.4).

describe("calcSolicitorTakeHome — golden tests (2026/27 rates, R2 updated)", () => {
  it("default inputs: profit=150000 pension=0", () => {
    // Sole trader / partnership (unchanged from 2025/26 — no dividends):
    //   income tax: PA taper not triggered (150000 > 100000, so PA = max(0, 12570 - 25000) = 0)
    //   t = 150000; basic = 37700 => 7540; higher band top (taxable) = 125140-PA = 125140,
    //     width = 125140-37700 = 87440; higher = min(150000-37700, 87440) = 87440 => 34976;
    //   additional = 150000 - 37700 - 87440 = 24860 => 24860 * 0.45 = 11187
    //   incomeTax = 7540 + 34976 + 11187 = 53703
    //   class4: lower = (50270-12570)=37700 * 0.06=2262; upper = (150000-50270)=99730*0.02=1994.6
    //   class4 = 2262 + 1994.6 = 4256.6
    //   partnershipNet = 150000 - 53703 - 4256.6 = 92040.4
    const r = calcSolicitorTakeHome({ profit: 150000, pensionContrib: 0 });
    expect(r.partnership.net).toBeCloseTo(92040.4, 0);
    expect(r.soleTrader.net).toBeCloseTo(92040.4, 0);
    expect(r.partnership.net).toBe(r.soleTrader.net);
    expect(typeof r.ltd.net).toBe("number");
  });

  it("lower income: profit=60000 pension=0", () => {
    // PA not tapered. taxable = 60000 - 12570 = 47430
    // basic band = min(47430, 37700) = 37700 => 7540
    // higher band = 47430 - 37700 = 9730 => 9730 * 0.40 = 3892
    // incomeTax = 7540 + 3892 = 11432
    // class4 lower = (50270-12570)*0.06 = 37700*0.06 = 2262
    // class4 upper = (60000-50270)*0.02 = 9730*0.02 = 194.6
    // class4 = 2456.6
    // net = 60000 - 11432 - 2456.6 = 46111.4
    const r = calcSolicitorTakeHome({ profit: 60000, pensionContrib: 0 });
    expect(r.partnership.net).toBeCloseTo(46111, 0);
  });

  it("profit below personal allowance: no income tax no NI", () => {
    const r = calcSolicitorTakeHome({ profit: 12000, pensionContrib: 0 });
    expect(r.partnership.tax).toBe(0);
    expect(r.partnership.net).toBe(12000);
  });

  it("pension contribution reduces taxable income", () => {
    const r1 = calcSolicitorTakeHome({ profit: 100000, pensionContrib: 0 });
    const r2 = calcSolicitorTakeHome({ profit: 100000, pensionContrib: 20000 });
    // pension reduces taxable income — net should be higher with pension (less tax)
    // net r2 = profit - tax(80000) - class4(80000) vs r1 = profit - tax(100000) - class4(100000)
    // BUT net = profit - tax - class4 (no deduction of pension from profit itself)
    expect(r2.partnership.tax).toBeLessThan(r1.partnership.tax);
  });

  it("Ltd calculation: salary floor at 12570, employer NI applied", () => {
    const r = calcSolicitorTakeHome({ profit: 150000, pensionContrib: 0 });
    // Ltd net should be positive and less than partnership (at this income, partnership usually wins)
    expect(r.ltd.net).toBeGreaterThan(0);
    expect(typeof r.ltd.tax).toBe("number");
    expect(r.ltd.tax).toBeGreaterThan(0);
  });

  it("Ltd GOLDEN: exact figures pinned on the corrected 2026/27 basis", () => {
    // Pinned 2026-07-06 after the employer-NIC secondary-threshold correction
    // (9,100 -> 5,000 from 6 April 2025). Employer NIC on the 12,570 salary is
    // 15% x (12,570 - 5,000) = 1,135.50; dividend rates 10.75%/35.75%/39.35%
    // (FA 2026 s.4). Values derived by executing the corrected lib; internal
    // conservation holds exactly: net + tax === profit (tax includes the 2,500
    // admin cost). These pins exist because the previous typeof-only assertions
    // let the stale 9,100 threshold survive undetected.
    const r150 = calcSolicitorTakeHome({ profit: 150000, pensionContrib: 0 });
    expect(r150.ltd.net).toBeCloseTo(84384.44, 1);
    expect(r150.ltd.tax).toBeCloseTo(65615.56, 1);
    expect(r150.ltd.net + r150.ltd.tax).toBeCloseTo(150000, 4);
    const r60 = calcSolicitorTakeHome({ profit: 60000, pensionContrib: 0 });
    expect(r60.ltd.net).toBeCloseTo(43591.2, 1);
    expect(r60.ltd.tax).toBeCloseTo(16408.8, 1);
    expect(r60.ltd.net + r60.ltd.tax).toBeCloseTo(60000, 4);
  });

  it("ED-01: break PA taper threshold — this test detects the change (guard test)", () => {
    // At profit=100001, PA taper kicks in (PA = max(0, 12570 - 0.5) = 12569.5)
    // At profit=100000, PA taper starts: (100000-100000)/2 = 0, so PA = 12570
    const r100 = calcSolicitorTakeHome({ profit: 100000, pensionContrib: 0 });
    const r101 = calcSolicitorTakeHome({ profit: 100002, pensionContrib: 0 });
    // r101 should pay more tax per extra pound (PA reduced)
    expect(r101.partnership.tax).toBeGreaterThan(r100.partnership.tax);
  });

  it("ED-01: break class4 upper rate — this test detects the change", () => {
    // At profit=50270, exactly at class4 upper threshold; above = 0
    const r = calcSolicitorTakeHome({ profit: 50270, pensionContrib: 0 });
    // class4 = (50270-12570)*0.06 = 37700*0.06 = 2262
    expect(r.partnership.tax).toBeGreaterThan(0);
    const rAbove = calcSolicitorTakeHome({ profit: 50271, pensionContrib: 0 });
    // extra 1 should be taxed at 2% upper rate
    expect(rAbove.partnership.tax).toBeCloseTo(r.partnership.tax + 0.02 * 1 + 0.40, 1);
  });
});

// ── FA2014SalariedMemberCalculator golden tests ───────────────────────────────

describe("calcFA2014SalariedMember — golden tests (pinned to OLD component outputs)", () => {
  it("default inputs: total=105000 fixed=90000 capital=20000 influence=false", () => {
    // conditionA = 90000/105000*100 = 85.71% >= 80 -> met
    // conditionB = !false = true -> met
    // conditionC = 20000/90000*100 = 22.22% < 25 -> met
    // all_met = true
    const r = calcFA2014SalariedMember({ totalReward: 105000, fixedReward: 90000, capitalContribution: 20000, hasInfluence: false });
    expect(r.conditionA_ratio).toBeCloseTo(85.71, 1);
    expect(r.conditionA_met).toBe(true);
    expect(r.conditionB_met).toBe(true);
    expect(r.conditionC_ratio).toBeCloseTo(22.22, 1);
    expect(r.conditionC_met).toBe(true);
    expect(r.all_met).toBe(true);
    expect(r.verdict).toBe("EMPLOYEE-FOR-TAX (PAYE applies)");
  });

  it("partner-for-tax: fixed=50000 total=100000 (conditionA not met)", () => {
    // conditionA = 50000/100000*100 = 50% < 80 -> NOT met
    const r = calcFA2014SalariedMember({ totalReward: 100000, fixedReward: 50000, capitalContribution: 5000, hasInfluence: false });
    expect(r.conditionA_met).toBe(false);
    expect(r.all_met).toBe(false);
    expect(r.verdict).toBe("PARTNER-FOR-TAX (Class 4 NI on share)");
  });

  it("has influence: conditionB not met -> partner", () => {
    const r = calcFA2014SalariedMember({ totalReward: 105000, fixedReward: 90000, capitalContribution: 20000, hasInfluence: true });
    expect(r.conditionB_met).toBe(false);
    expect(r.all_met).toBe(false);
  });

  it("sufficient capital breaks conditionC: capital=25000 fixed=90000 -> 27.7% >= 25", () => {
    const r = calcFA2014SalariedMember({ totalReward: 105000, fixedReward: 90000, capitalContribution: 25000, hasInfluence: false });
    // conditionC: 25000/90000*100 = 27.77% >= 25 -> NOT met -> all_met = false
    expect(r.conditionC_met).toBe(false);
    expect(r.all_met).toBe(false);
    expect(r.verdict).toBe("PARTNER-FOR-TAX (Class 4 NI on share)");
  });

  it("capitalToFixCondC: fixed=90000 -> ceil(90000*0.25/1000)*1000 = 23000", () => {
    const r = calcFA2014SalariedMember({ totalReward: 105000, fixedReward: 90000, capitalContribution: 20000, hasInfluence: false });
    expect(r.capitalToFixCondC).toBe(23000);
    expect(r.additionalCapitalNeeded).toBe(3000);
  });

  it("ED-01: guard test — conditionA boundary at exactly 80%", () => {
    const r = calcFA2014SalariedMember({ totalReward: 100000, fixedReward: 80000, capitalContribution: 10000, hasInfluence: false });
    // conditionA = 80%: >= 80 -> met
    expect(r.conditionA_met).toBe(true);
    const r2 = calcFA2014SalariedMember({ totalReward: 100000, fixedReward: 79999, capitalContribution: 10000, hasInfluence: false });
    expect(r2.conditionA_met).toBe(false);
  });
});

// ── LlpProfitShareCalculator golden tests ───────────────────────────────────

describe("calcLLPProfitShare — golden tests (pinned to OLD component outputs)", () => {
  it("equal split: 3 senior + 2 junior = 5 partners, profit=800000", () => {
    const r = calcLLPProfitShare({ totalProfit: 800000, method: "equal", seniorPartners: 3, juniorPartners: 2, fixedSharePartners: 2, fixedShareEach: 85000, seniorMultiplier: 1.6 });
    expect(r.partners).toHaveLength(5);
    expect(r.partners[0].share).toBeCloseTo(160000, 0);
    expect(r.partners[0].percentage).toBeCloseTo(20, 1);
  });

  it("two-tier: 3 senior (1.5x) + 2 junior (1x), profit=800000", () => {
    // totalPoints = 3*1.5 + 2*1 = 4.5 + 2 = 6.5
    // valuePerPoint = 800000/6.5 = 123076.92
    // seniorShare = 123076.92 * 1.5 = 184615.38
    // juniorShare = 123076.92 * 1 = 123076.92
    const r = calcLLPProfitShare({ totalProfit: 800000, method: "two-tier", seniorPartners: 3, juniorPartners: 2, fixedSharePartners: 2, fixedShareEach: 85000, seniorMultiplier: 1.6 });
    expect(r.partners).toHaveLength(5);
    expect(r.partners[0].share).toBeCloseTo(184615, 0);
    expect(r.partners[3].share).toBeCloseTo(123077, 0);
  });

  it("points: senior multiplier 1.6, 3 senior + 2 junior, profit=800000", () => {
    // totalPoints = 3*1.6 + 2*1 = 4.8 + 2 = 6.8
    // valuePerPoint = 800000/6.8 = 117647.06
    // seniorShare = 117647.06 * 1.6 = 188235.29
    // juniorShare = 117647.06
    const r = calcLLPProfitShare({ totalProfit: 800000, method: "points", seniorPartners: 3, juniorPartners: 2, fixedSharePartners: 2, fixedShareEach: 85000, seniorMultiplier: 1.6 });
    expect(r.partners[0].share).toBeCloseTo(188235, 0);
    expect(r.partners[3].share).toBeCloseTo(117647, 0);
  });

  it("fixed-share-plus-equity: 2 fixed-share at 85000, 3 senior + 2 junior equity", () => {
    // fixedShareTotal = 2*85000 = 170000
    // equityProfit = 800000 - 170000 = 630000
    // totalEquityPoints = 3*1.6 + 2*1 = 6.8
    // valuePerPoint = 630000/6.8 = 92647.06
    const r = calcLLPProfitShare({ totalProfit: 800000, method: "fixed-share-plus-equity", seniorPartners: 3, juniorPartners: 2, fixedSharePartners: 2, fixedShareEach: 85000, seniorMultiplier: 1.6 });
    expect(r.partners[0].share).toBe(85000);
    expect(r.partners[1].share).toBe(85000);
    expect(r.partners[2].share).toBeCloseTo(148235, 0);
  });

  it("no partners: empty partners array", () => {
    const r = calcLLPProfitShare({ totalProfit: 800000, method: "equal", seniorPartners: 0, juniorPartners: 0, fixedSharePartners: 0, fixedShareEach: 0, seniorMultiplier: 1.5 });
    expect(r.partners).toHaveLength(0);
  });
});

// ── LawFirmValuationCalculator golden tests ──────────────────────────────────

describe("calcLawFirmValuation — golden tests (pinned to OLD component outputs)", () => {
  it("default inputs: profit=600000 partnership-llp midlands normal demand, wip=180000 assets=40000", () => {
    // [low, high] = [1.0, 2.0]; regionAdj = 0; demandAdj = 0
    // adjLow = max(0.4, 1.0) = 1.0; adjHigh = max(0.5, 2.0) = 2.0
    // goodwillLow = 600000; goodwillHigh = 1200000
    // totalLow = 600000 + 180000 + 40000 = 820000
    // totalHigh = 1200000 + 180000 + 40000 = 1420000
    const r = calcLawFirmValuation({ profit: 600000, firmType: "partnership-llp", region: "midlands", demand: "normal", wip: 180000, tangibleAssets: 40000 });
    expect(r.multipleLow).toBeCloseTo(1.0, 2);
    expect(r.multipleHigh).toBeCloseTo(2.0, 2);
    expect(r.goodwillLow).toBeCloseTo(600000, 0);
    expect(r.goodwillHigh).toBeCloseTo(1200000, 0);
    expect(r.totalLow).toBeCloseTo(820000, 0);
    expect(r.totalHigh).toBeCloseTo(1420000, 0);
  });

  it("specialist firm london high demand: multiples 1.8-3.5 + 0.15 + 0.1", () => {
    // adjLow = max(0.4, 1.8+0.15+0.1) = 2.05
    // adjHigh = max(0.5, 3.5+0.15+0.1) = 3.75
    const r = calcLawFirmValuation({ profit: 1000000, firmType: "specialist", region: "london", demand: "high", wip: 0, tangibleAssets: 0 });
    expect(r.multipleLow).toBeCloseTo(2.05, 2);
    expect(r.multipleHigh).toBeCloseTo(3.75, 2);
    expect(r.goodwillLow).toBeCloseTo(2050000, 0);
  });

  it("sole practitioner north low demand: multiples clamp to floor", () => {
    // low = 0.6 - 0.05 - 0.15 = 0.4 -> adjLow = max(0.4, 0.4) = 0.4
    // high = 1.1 - 0.05 - 0.15 = 0.9 -> adjHigh = max(0.5, 0.9) = 0.9
    const r = calcLawFirmValuation({ profit: 200000, firmType: "sole-practitioner", region: "north", demand: "low", wip: 0, tangibleAssets: 0 });
    expect(r.multipleLow).toBeCloseTo(0.4, 2);
    expect(r.multipleHigh).toBeCloseTo(0.9, 2);
  });
});

// ── SraReserveCalculator golden tests ───────────────────────────────────────
// R2 update (2026-07-05): exemptionEligible API changed.
// The field is undefined when averageBalance/maximumBalance are not supplied.
// When supplied, the corrected Rule 12.2 test is: averageBalance <= 10000 AND
// maximumBalance <= 250000 (HP §5.G; the old avgBalance <= 250 was WRONG).

describe("calcSraReserve — golden tests (R2 corrected exemption, 2026-07-05)", () => {
  it("default inputs: 150 matters, high volume, conveyancing — no exemption inputs", () => {
    // avgBalancePerMatter = 25000; peakClientMoney = 150*25000 = 3750000
    // riskFactor = 0.025; suggestedReserve = 3750000*0.025 = 93750
    // lowReserve = 93750*0.7 = 65625; highReserve = 93750*1.5 = 140625
    // exemptionEligible = undefined (no averageBalance/maximumBalance supplied)
    const r = calcSraReserve({ openMatters: 150, volume: "high", matterType: "conveyancing" });
    expect(r.peakClientMoney).toBe(3750000);
    expect(r.suggestedReserve).toBeCloseTo(93750, 0);
    expect(r.lowReserve).toBeCloseTo(65625, 0);
    expect(r.highReserve).toBeCloseTo(140625, 0);
    expect(r.exemptionEligible).toBeUndefined();
  });

  it("150 matters, high volume, conveyancing — exemption inputs provided (large firm, not exempt)", () => {
    // averageBalance=150000 > 10000 -> not exempt
    const r = calcSraReserve({ openMatters: 150, volume: "high", matterType: "conveyancing", averageBalance: 150000, maximumBalance: 3750000 });
    expect(r.exemptionEligible).toBe(false);
  });

  it("low volume private-client: risk factor 0.005", () => {
    // avgBalancePerMatter = 2500; peak = 50*2500 = 125000
    // reserve = 125000*0.005 = 625
    const r = calcSraReserve({ openMatters: 50, volume: "low", matterType: "private-client" });
    expect(r.suggestedReserve).toBeCloseTo(625, 0);
  });

  it("corrected Rule 12.2 exemption: averageBalance <= 10000 AND maximumBalance <= 250000", () => {
    // HP §5.G: average not exceeding £10,000 AND maximum not exceeding £250,000
    // Eligible: averageBalance=8000 <= 10000, maximumBalance=200000 <= 250000
    const rEligible = calcSraReserve({ openMatters: 4, volume: "low", matterType: "mixed", averageBalance: 8000, maximumBalance: 200000 });
    expect(rEligible.exemptionEligible).toBe(true);
    // Not eligible: averageBalance=12000 > 10000
    const rAvgFail = calcSraReserve({ openMatters: 4, volume: "low", matterType: "mixed", averageBalance: 12000, maximumBalance: 200000 });
    expect(rAvgFail.exemptionEligible).toBe(false);
    // Not eligible: maximumBalance=260000 > 250000
    const rMaxFail = calcSraReserve({ openMatters: 4, volume: "low", matterType: "mixed", averageBalance: 8000, maximumBalance: 260000 });
    expect(rMaxFail.exemptionEligible).toBe(false);
  });

  it("very-high volume commercial: large reserve", () => {
    const r = calcSraReserve({ openMatters: 20, volume: "very-high", matterType: "commercial" });
    // avgBalancePerMatter=75000; peak=1500000; riskFactor=0.008; reserve=12000
    expect(r.suggestedReserve).toBeCloseTo(12000, 0);
  });

  it("guard: £250 figure never appears in exemption eligibility (HP §5.G invariant)", () => {
    // The corrected test uses 10000 (average) and 250000 (maximum), never 250.
    // A balance of exactly 250 should have no special meaning.
    const r = calcSraReserve({ openMatters: 1, volume: "low", matterType: "mixed", averageBalance: 250, maximumBalance: 5000 });
    // averageBalance=250 <= 10000 AND maximumBalance=5000 <= 250000 -> eligible
    expect(r.exemptionEligible).toBe(true);
    // A balance just above 250 is also eligible (since 250 is not a threshold)
    const r2 = calcSraReserve({ openMatters: 1, volume: "low", matterType: "mixed", averageBalance: 251, maximumBalance: 5000 });
    expect(r2.exemptionEligible).toBe(true);
  });
});

// ── IndemnityPremiumCalculator golden tests ──────────────────────────────────

describe("calcIndemnityPremium — golden tests (pinned to OLD component outputs)", () => {
  it("default inputs: grossFees=2000000 mixed no-claim 10 fee-earners cover=5", () => {
    // baseRate=0.015; claimsMult=1.0; coverMult=1.2 (>2 and <=5); sizePenalty=1.0 (<=20)
    // premium = 2000000*0.015*1.0*1.2*1.0 = 36000
    // low = 36000*0.8 = 28800; high = 36000*1.4 = 50400
    const r = calcIndemnityPremium({ grossFees: 2000000, practiceArea: "mixed", claimsHistory: "none-5y", feeEarnerCount: 10, coverLevel: 5 });
    expect(r.indicativePremium).toBeCloseTo(36000, 0);
    expect(r.low).toBeCloseTo(28800, 0);
    expect(r.high).toBeCloseTo(50400, 0);
  });

  it("conveyancing-heavy major-claim: high premium", () => {
    // baseRate=0.025; claimsMult=3.0; coverMult=1.2; sizePenalty=1.0
    // premium = 2000000*0.025*3.0*1.2 = 180000
    const r = calcIndemnityPremium({ grossFees: 2000000, practiceArea: "conveyancing-heavy", claimsHistory: "major-claim", feeEarnerCount: 10, coverLevel: 5 });
    expect(r.indicativePremium).toBeCloseTo(180000, 0);
  });

  it("size penalty: >20 fee earners = 1.1x", () => {
    const r1 = calcIndemnityPremium({ grossFees: 1000000, practiceArea: "commercial", claimsHistory: "none-5y", feeEarnerCount: 20, coverLevel: 3 });
    const r2 = calcIndemnityPremium({ grossFees: 1000000, practiceArea: "commercial", claimsHistory: "none-5y", feeEarnerCount: 21, coverLevel: 3 });
    expect(r2.indicativePremium).toBeCloseTo(r1.indicativePremium * 1.1, 0);
  });

  it("cover level £20m+: coverMultiplier = 2.0", () => {
    const r = calcIndemnityPremium({ grossFees: 1000000, practiceArea: "commercial", claimsHistory: "none-5y", feeEarnerCount: 5, coverLevel: 20 });
    // baseRate=0.008; claimsMult=1.0; coverMult=2.0; sizePenalty=1.0
    // premium = 1000000*0.008*1.0*2.0*1.0 = 16000
    expect(r.indicativePremium).toBeCloseTo(16000, 0);
  });

  it("ED-01: guard test — base rate change detection (commercial vs criminal)", () => {
    const rComm = calcIndemnityPremium({ grossFees: 1000000, practiceArea: "commercial", claimsHistory: "none-5y", feeEarnerCount: 5, coverLevel: 2 });
    const rCrim = calcIndemnityPremium({ grossFees: 1000000, practiceArea: "criminal", claimsHistory: "none-5y", feeEarnerCount: 5, coverLevel: 2 });
    // commercial 0.8% vs criminal 1.0% -> criminal should be higher
    expect(rCrim.indicativePremium).toBeGreaterThan(rComm.indicativePremium);
    expect(rCrim.indicativePremium).toBeCloseTo(rComm.indicativePremium * (0.010 / 0.008), 1);
  });
});
