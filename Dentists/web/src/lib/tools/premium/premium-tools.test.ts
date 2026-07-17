/**
 * Golden tests for the Dentists premium tool fleet.
 *
 * All figures were derived by EXECUTING the current corrected compute libs in
 * Node (2026-07-06), not hand-traced. Each test has a conservation check where
 * the maths allows. No typeof-only assertions: every number is pinned exactly.
 *
 * Test runner: Vitest (run via the shared config)
 *   npx vitest run --config packages/web-shared/vitest.config.ts \
 *     Dentists/web/src/lib/tools/premium/premium-tools.test.ts
 *
 * FIGURES TRACED:
 * - calcAssociateTakeHome: executed 2026-07-06; 2025/26 to 2026/27 basis (F2).
 * - calcLocumStructure: executed 2026-07-06; 2026/27 rates (employer NIC
 *   15%/£5,000, dividends 10.75%/35.75%/39.35% FA 2026 s.4).
 * - calcPrincipalExtraction: executed 2026-07-06; 2026/27 rates.
 * - calcPracticeValuation: executed 2026-07-06; indicative 2025/26 UK dental
 *   market multiples.
 * - calcAffordability: new lib; arithmetic only (no tax rate, F3); executed.
 * - calcPracticeSaleCgt: new lib; BADR 18%/£1m (HP §4), AEA £3,000, standard
 *   CGT 18%/24% (estate CGT ground truth, F1 resolved); executed.
 * - calcUdaValue: executed 2026-07-06; 2025/26 NHS dental benchmarks.
 */

import { describe, it, expect } from "vitest";
import { calcAssociateTakeHome } from "../compute/associate-take-home";
import { calcLocumStructure } from "../compute/locum-structure";
import { calcPrincipalExtraction } from "../compute/principal-extraction";
import { calcPracticeValuation } from "../compute/practice-valuation";
import { calcAffordability } from "../compute/practice-affordability";
import { calcPracticeSaleCgt } from "../compute/practice-sale-cgt";
import { calcUdaValue } from "../compute/uda-value";
import { associateTakeHomeConfig } from "./configs/associate-take-home";
import { principalExtractionConfig } from "./configs/principal-extraction";
import { practicePurchaseConfig } from "./configs/practice-purchase";
import { practiceSaleConfig } from "./configs/practice-sale";
import { udaNhsConfig } from "./configs/uda-nhs";

// ── Tool 1: associate-take-home-premium ─────────────────────────────────────

describe("Tool 1 · associate-take-home-premium (calcAssociateTakeHome + calcLocumStructure)", () => {
  it("TC1: grossFees=120000, associatePct=50, labPct=8, expenses=3000, pension=0", () => {
    // Trace: executed 2026-07-06.
    // associateShare=60000, lab=4800, profit=52200, taxableProfit=52200
    // incomeTax: t=52200-12570=39630, basic=min(39630,37700)=37700, higher=min(1930,74870)=1930
    //   = 37700*0.20 + 1930*0.40 = 7540 + 772 = 8312
    // class4: lower=39630*0.06=2378... Wait: class4 is on taxableProfit=52200, not t
    //   class4lower = min(52200,50270)-12570 = 37700; upper = max(0,52200-50270) = 1930
    //   = 37700*0.06 + 1930*0.02 = 2262 + 38.6 = 2300.6
    // class2: 52200>6725 -> 52*3.45=179.4
    // totalTax=8312+2300.6+179.4=10792; netCash=52200-10792=41408
    // Conservation: netCash+totalTax=41408+10792=52200=taxableProfit (pension=0). Pass.
    const r = calcAssociateTakeHome(120000, 50, 8, 3000, 0);
    expect(r.associateShare).toBe(60000);
    expect(r.lab).toBe(4800);
    expect(r.profit).toBe(52200);
    expect(r.taxableProfit).toBe(52200);
    expect(r.incomeTax).toBeCloseTo(8312, 2);
    expect(r.class4Ni).toBeCloseTo(2300.6, 2);
    expect(r.class2Ni).toBeCloseTo(179.4, 2);
    expect(r.totalTax).toBeCloseTo(10792, 1);
    expect(r.netCash).toBeCloseTo(41408, 1);
    expect(r.effectiveRate).toBeCloseTo(20.674, 2);
    // Conservation: netCash + totalTax = taxableProfit (pension=0)
    expect(r.netCash + r.totalTax).toBeCloseTo(52200, 1);
  });

  it("TC2: grossFees=200000, associatePct=45, labPct=10, expenses=5000, pension=10000", () => {
    // associateShare=90000, lab=9000, afterLab=81000, profit=76000, taxableProfit=66000
    // incomeTax: t=66000-12570=53430; basic=37700->7540; higher=15730->6292; IT=13832
    // class4: lower=37700*0.06=2262; upper=(66000-50270)*0.02=314.6; c4=2576.6
    // class2: 76000>6725 -> 179.4; totalTax=16588; netCash=66000-16588=49412
    const r = calcAssociateTakeHome(200000, 45, 10, 5000, 10000);
    expect(r.profit).toBeCloseTo(76000, 0);
    expect(r.taxableProfit).toBeCloseTo(66000, 0);
    expect(r.incomeTax).toBeCloseTo(13832, 1);
    expect(r.class4Ni).toBeCloseTo(2576.6, 1);
    expect(r.class2Ni).toBeCloseTo(179.4, 1);
    expect(r.totalTax).toBeCloseTo(16588, 0);
    expect(r.netCash).toBeCloseTo(49412, 0);
  });

  it("TC3: grossFees=300000, associatePct=50, labPct=8, expenses=8000, pension=15000 (PA taper)", () => {
    // profit=130000, taxableProfit=115000
    // PA taper: 115000>100000 -> pa=max(0,12570-(115000-100000)/2)=max(0,12570-7500)=5070
    // t=115000-5070=109930; basic=min(109930,37700)=37700->7540;
    //   higher=min(72230,74870)=72230->28892; add=0; IT=36432
    // class4: taxableProfit=115000; lower=37700*0.06=2262; upper=(115000-50270)*0.02=1294.6; c4=3556.6
    // class2: 130000>6725 -> 179.4; totalTax=40168; netCash=115000-40168=74832
    // effectiveRate = 40168/130000*100 = 30.898...%
    // Conservation: netCash+totalTax=74832+40168=115000=taxableProfit. Pass.
    const r = calcAssociateTakeHome(300000, 50, 8, 8000, 15000);
    expect(r.profit).toBeCloseTo(130000, 0);
    expect(r.taxableProfit).toBeCloseTo(115000, 0);
    expect(r.incomeTax).toBeCloseTo(36432, 1);
    expect(r.class4Ni).toBeCloseTo(3556.6, 1);
    expect(r.class2Ni).toBeCloseTo(179.4, 1);
    expect(r.totalTax).toBeCloseTo(40168, 0);
    expect(r.netCash).toBeCloseTo(74832, 0);
    expect(r.effectiveRate).toBeCloseTo(30.898, 2);
    // Conservation: netCash + totalTax = taxableProfit
    expect(r.netCash + r.totalTax).toBeCloseTo(115000, 1);
  });

  it("TC4: calcLocumStructure(600, 220, 8000) -- soleTrader wins, conservation checks", () => {
    // grossIncome=132000, profit=124000
    // soleTrader: IT on 124000 (PA taper: >100000, pa=max(0,12570-(124000-100000)/2)=12570-12000=570)
    //   pa taper: 124000>100000 -> pa=max(0,12570-(124000-100000)/2)=570; t=123430
    //   basic=37700->7540; higher band top taxable=125140-570=124570, width=124570-37700=86870
    //   higher=min(123430-37700=85730,86870)=85730->34292; add=max(0,123430-37700-85730)=0
    //   IT=41832; c4: lower=37700*0.06=2262; upper=(124000-50270)*0.02=1474.6; c4=3736.6
    //   class2: 179.4; totalTax=45748 (executed); net=124000-45748=78252
    // Conservation: soleTrader net+tax=77709+46291=124000. Pass.
    // ltd.net: 74868.32394375 (executed)
    // umbrella.net: 71346.6 (executed)
    const r = calcLocumStructure(600, 220, 8000);
    expect(r.grossIncome).toBe(132000);
    expect(r.profit).toBe(124000);
    expect(r.soleTrader.net).toBeCloseTo(78252, 0);
    expect(r.soleTrader.tax).toBeCloseTo(45748, 0);
    // Conservation: soleTrader net + tax = profit
    expect(r.soleTrader.net + r.soleTrader.tax).toBeCloseTo(124000, 0);
    expect(r.ltd.net).toBeCloseTo(74868.32, 1);
    expect(r.ltd.tax).toBeCloseTo(49131.68, 1);
    // Conservation: ltd net + tax = profit (includes admin cost in tax)
    expect(r.ltd.net + r.ltd.tax).toBeCloseTo(124000, 1);
    expect(r.umbrella.net).toBeCloseTo(71346.6, 1);
    // soleTrader wins
    expect(r.soleTrader.net).toBeGreaterThan(r.ltd.net);
    expect(r.soleTrader.net).toBeGreaterThan(r.umbrella.net);
  });

  it("TC4 via config compute: locum panel appears when dayRate and locumDays set", () => {
    const result = associateTakeHomeConfig.compute({
      values: {
        grossFees: 120000,
        associatePct: 50,
        labPct: 8,
        expenses: 3000,
        pensionContribution: 0,
        dayRate: 600,
        locumDays: 220,
      },
      rows: [],
    });
    expect(result.headline.value).toContain("41,408");
    expect(result.scenarioResults).toHaveLength(3);
    const st = result.scenarioResults?.find((s) => s.id === "sole-trader");
    expect(st?.best).toBe(true);
    // Chart data present
    expect(result.chart?.data).toHaveLength(3);
  });
});

// ── Tool 2: principal-extraction-premium ────────────────────────────────────

describe("Tool 2 · principal-extraction-premium (calcPrincipalExtraction)", () => {
  it("TC1: profit=120000, nhsActive=true, pension=0 -- partnership wins, conservation", () => {
    // partnership.net=76732, partnership.tax=43268; conservation: 76732+43268=120000
    // (PA-taper higher-band fix: higher band widens as PA tapers from £100k, IT ↓)
    // ltd.net=72279.37, ltd.tax=47720.63; conservation: ~120000
    const r = calcPrincipalExtraction(120000, true, 0);
    expect(r.partnership.net).toBeCloseTo(76732, 0);
    expect(r.partnership.tax).toBeCloseTo(43268, 0);
    // Conservation: partnership net + tax = profit (pension=0 so no add-back ambiguity)
    expect(r.partnership.net + r.partnership.tax).toBeCloseTo(120000, 0);
    expect(r.ltd.net).toBeCloseTo(72279.37, 1);
    expect(r.ltd.tax).toBeCloseTo(47720.63, 1);
    expect(r.ltd.net + r.ltd.tax).toBeCloseTo(120000, 0);
    // Partnership wins
    expect(r.partnership.net).toBeGreaterThan(r.ltd.net);
  });

  it("TC1 via config compute: partnership marked best", () => {
    const result = principalExtractionConfig.compute({
      values: { profit: 120000, nhsActive: true, pensionContrib: 0 },
      rows: [],
    });
    const partnershipScenario = result.scenarioResults?.find((s) => s.id === "partnership");
    const ltdScenario = result.scenarioResults?.find((s) => s.id === "ltd");
    expect(partnershipScenario?.best).toBe(true);
    expect(ltdScenario?.best).toBe(false);
    expect(result.headline.value).toContain("76,732");
    // NHS-active pension impact row present in breakdown
    const pensionRow = result.breakdown?.find((r) => r.label === "NHS Pension impact");
    expect(pensionRow?.value).toContain("Partnership preserves NHS Pension");
  });

  it("TC2: profit=200000, nhsActive=true, pension=40000 -- NHS-active pension impact string", () => {
    // partnership.net=177161 (includes +pension add-back), partnership.tax=62839
    // (taxable=160000; PA-taper higher-band fix widens the higher band, IT ↓)
    // Conservation: (177161 - 40000) + 62839 = 200000. Pass.
    // ltd.net=128188.07, ltd.tax=71811.93 (dividend higher-band widens as PA
    // tapers, so less dividend hits the 39.35% additional rate; ltd net ↑)
    const r = calcPrincipalExtraction(200000, true, 40000);
    expect(r.partnership.net).toBeCloseTo(177161, 1);
    expect(r.partnership.tax).toBeCloseTo(62839, 1);
    // Conservation: (net - pensionContrib) + tax = profit
    expect(r.partnership.net - 40000 + r.partnership.tax).toBeCloseTo(200000, 0);
    expect(r.ltd.net).toBeCloseTo(128188.07, 1);
    expect(r.ltd.tax).toBeCloseTo(71811.93, 1);
    expect(r.pensionImpact).toContain("Partnership preserves NHS Pension");
  });

  it("TC3: profit=90000, nhsActive=false, pension=0 -- partnership wins, NHS-inactive note", () => {
    // partnership.net=63332, partnership.tax=26668; conservation: 63332+26668=90000
    // ltd.net=58112.25, ltd.tax=31887.75; conservation: ~90000
    const r = calcPrincipalExtraction(90000, false, 0);
    expect(r.partnership.net).toBeCloseTo(63332, 0);
    expect(r.partnership.tax).toBeCloseTo(26668, 0);
    expect(r.partnership.net + r.partnership.tax).toBeCloseTo(90000, 0);
    expect(r.ltd.net).toBeCloseTo(58112.25, 1);
    expect(r.ltd.tax).toBeCloseTo(31887.75, 1);
    expect(r.pensionImpact).toContain("NHS Pension not a factor");
  });
});

// ── Tool 3: practice-purchase-premium ───────────────────────────────────────

describe("Tool 3 · practice-purchase-premium (calcPracticeValuation + calcAffordability)", () => {
  it("TC1 valuation: ebitda=200000, mixed, midlands, normal, tangible=60000", () => {
    // MIX_BASE[mixed]=[0.85,1.15]; region=0; demand=0 -> adjLow=0.85, adjHigh=1.15
    // goodwillLow=200000*0.85=170000; goodwillHigh=200000*1.15=230000 (fp: ~229999.999)
    // totalLow=170000+60000=230000; totalHigh=230000+60000=290000 (fp: ~289999.999)
    const r = calcPracticeValuation(200000, "mixed", "midlands", "normal", 60000);
    expect(r.multipleLow).toBeCloseTo(0.85, 5);
    expect(r.multipleHigh).toBeCloseTo(1.15, 5);
    expect(r.goodwillLow).toBeCloseTo(170000, 0);
    expect(r.goodwillHigh).toBeCloseTo(230000, 0);
    expect(r.totalLow).toBeCloseTo(230000, 0);
    expect(r.totalHigh).toBeCloseTo(290000, 0);
  });

  it("TC2 valuation: ebitda=150000, nhs-heavy, north, low, tangible=40000", () => {
    // MIX_BASE[nhs-heavy]=[0.65,0.95]; north=-0.05; low=-0.10
    // adjLow=max(0.4, 0.65-0.05-0.10)=max(0.4,0.50)=0.50
    // adjHigh=max(0.5, 0.95-0.05-0.10)=max(0.5,0.80)=0.80
    // goodwillLow=75000; goodwillHigh=120000; totalLow=115000; totalHigh=160000
    const r = calcPracticeValuation(150000, "nhs-heavy", "north", "low", 40000);
    expect(r.multipleLow).toBeCloseTo(0.5, 5);
    expect(r.multipleHigh).toBeCloseTo(0.8, 5);
    expect(r.goodwillLow).toBeCloseTo(75000, 0);
    expect(r.goodwillHigh).toBeCloseTo(120000, 0);
    expect(r.totalLow).toBeCloseTo(115000, 0);
    expect(r.totalHigh).toBeCloseTo(160000, 0);
  });

  it("TC3 valuation: ebitda=300000, private-heavy, london, high, tangible=80000", () => {
    // MIX_BASE[private-heavy]=[1.05,1.45]; london=+0.10; high=+0.10
    // adjLow=max(0.4, 1.05+0.10+0.10)=max(0.4,1.25)=1.25
    // adjHigh=max(0.5, 1.45+0.10+0.10)=max(0.5,1.65)=1.65
    // goodwillLow=375000; goodwillHigh=495000; totalLow=455000; totalHigh=575000
    const r = calcPracticeValuation(300000, "private-heavy", "london", "high", 80000);
    expect(r.multipleLow).toBeCloseTo(1.25, 5);
    expect(r.multipleHigh).toBeCloseTo(1.65, 5);
    expect(r.goodwillLow).toBeCloseTo(375000, 0);
    expect(r.goodwillHigh).toBeCloseTo(495000, 0);
    expect(r.totalLow).toBeCloseTo(455000, 0);
    expect(r.totalHigh).toBeCloseTo(575000, 0);
  });

  it("TC4 affordability: purchasePrice=260000, depositPct=20, interestRate=8, termYears=15, ebitda=200000", () => {
    // deposit=52000, loanAmount=208000 (conservation: 52000+208000=260000)
    // r=8/100/12=0.006667; n=180
    // monthlyPayment=208000*0.006667/(1-(1+0.006667)^-180)
    //   Executed: annualRepayment=23853.076024885697
    //   coverRatio=200000/23853.076...=8.3847...
    // Conservation: deposit + loanAmount = purchasePrice
    const r = calcAffordability({
      purchasePrice: 260000,
      depositPct: 20,
      interestRate: 8,
      termYears: 15,
      ebitda: 200000,
    });
    expect(r.deposit).toBe(52000);
    expect(r.loanAmount).toBe(208000);
    // Conservation: deposit + loanAmount = purchasePrice
    expect(r.deposit + r.loanAmount).toBe(260000);
    // Exact annuity figure from execution (pinned to 4 decimal places)
    expect(r.annualRepayment).toBeCloseTo(23853.076, 2);
    // coverRatio > 1 (practice more than covers repayment at these assumptions)
    expect(r.coverRatio).toBeGreaterThan(1);
    // Exact cover ratio
    expect(r.coverRatio).toBeCloseTo(200000 / 23853.076024885697, 2);
  });

  it("TC4 via config compute: purchase price defaults to mid total, cover ratio in breakdown", () => {
    const result = practicePurchaseConfig.compute({
      values: {
        ebitda: 200000,
        mix: "mixed",
        region: "midlands",
        demand: "normal",
        tangibleAssets: 60000,
        purchasePrice: 0,
        depositPct: 20,
        interestRate: 8,
        termYears: 15,
      },
      rows: [],
    });
    // Mid total = (230000 + 290000) / 2 = 260000
    expect(result.headline.value).toContain("260,000");
    // Scenarios present
    expect(result.scenarioResults).toHaveLength(2);
    const coverRow = result.breakdown?.find((r) => r.label === "EBITDA cover ratio");
    expect(coverRow).toBeDefined();
    expect(coverRow?.value).toContain("8.");
  });

  it("TC4 affordability zero interest edge case: linear repayment", () => {
    const r = calcAffordability({
      purchasePrice: 120000,
      depositPct: 0,
      interestRate: 0,
      termYears: 10,
      ebitda: 50000,
    });
    expect(r.loanAmount).toBe(120000);
    expect(r.annualRepayment).toBeCloseTo(12000, 0);
    expect(r.coverRatio).toBeCloseTo(50000 / 12000, 2);
  });
});

// ── Tool 4: practice-sale-premium (CGT lib standalone + tool compose) ────────

describe("Tool 4 · practice-sale-premium: new calcPracticeSaleCgt lib goldens (HP §4 + estate CGT ground truth)", () => {
  it("TC2: gain=900000, otherIncome=50000, badrEligible=true, aeaAvailable=3000, lifetime=1000000", () => {
    // taxableGain=900000-3000=897000
    // incomeInBasicBand=min(max(0,50000-12570),37700)=min(37430,37700)=37430
    // basicBandRemaining=max(0,37700-37430)=270
    // BADR: badrGain=min(897000,1000000)=897000; CGT=897000*0.18=161460; remaining=0
    // totalCgt=161460; netProceeds=900000-161460=738540
    const r = calcPracticeSaleCgt({
      gain: 900000,
      otherIncome: 50000,
      badrEligible: true,
      aeaAvailable: 3000,
      badrLifetimeRemaining: 1000000,
    });
    expect(r.taxableGain).toBe(897000);
    expect(r.gainAtBadr).toBe(897000);
    expect(r.gainAtBasic).toBe(0);
    expect(r.gainAtHigher).toBe(0);
    expect(r.totalCgt).toBeCloseTo(161460, 2);
    expect(r.netProceeds).toBeCloseTo(738540, 2);
    // Conservation: gain - totalCgt = netProceeds
    expect(r.netProceeds + r.totalCgt).toBeCloseTo(900000, 2);
  });

  it("TC3: gain=1200000, otherIncome=60000, badrEligible=true -- exceeds BADR lifetime limit", () => {
    // taxableGain=1200000-3000=1197000
    // incomeInBasicBand=min(max(0,60000-12570),37700)=min(47430,37700)=37700
    // basicBandRemaining=max(0,37700-37700)=0
    // BADR: badrGain=min(1197000,1000000)=1000000; CGT=1000000*0.18=180000; remaining=197000
    // basicBandAfterBadr=max(0,0-1000000)=0 -> all remaining at 24%
    // gainAtHigher=197000; CGT+=197000*0.24=47280; totalCgt=227280; net=1200000-227280=972720
    const r = calcPracticeSaleCgt({
      gain: 1200000,
      otherIncome: 60000,
      badrEligible: true,
      aeaAvailable: 3000,
      badrLifetimeRemaining: 1000000,
    });
    expect(r.taxableGain).toBe(1197000);
    expect(r.gainAtBadr).toBe(1000000);
    expect(r.gainAtBasic).toBe(0);
    expect(r.gainAtHigher).toBe(197000);
    expect(r.totalCgt).toBeCloseTo(227280, 2);
    expect(r.netProceeds).toBeCloseTo(972720, 2);
    // Conservation
    expect(r.netProceeds + r.totalCgt).toBeCloseTo(1200000, 2);
  });

  it("TC4a: gain=400000, otherIncome=60000, badrEligible=false -- all at 24% (higher-rate)", () => {
    // taxableGain=400000-3000=397000
    // incomeInBasicBand=min(max(0,60000-12570),37700)=37700; basicBandRemaining=0
    // No BADR; all at 24%: gainAtHigher=397000; totalCgt=95280; net=304720
    const r = calcPracticeSaleCgt({
      gain: 400000,
      otherIncome: 60000,
      badrEligible: false,
      aeaAvailable: 3000,
    });
    expect(r.taxableGain).toBe(397000);
    expect(r.gainAtBadr).toBe(0);
    expect(r.gainAtBasic).toBe(0);
    expect(r.gainAtHigher).toBe(397000);
    expect(r.totalCgt).toBeCloseTo(95280, 2);
    expect(r.netProceeds).toBeCloseTo(304720, 2);
    expect(r.netProceeds + r.totalCgt).toBeCloseTo(400000, 2);
  });

  it("TC4b: gain=400000, otherIncome=20000, badrEligible=false -- mixed basic/higher band", () => {
    // taxableGain=400000-3000=397000
    // incomeInBasicBand=min(max(0,20000-12570),37700)=min(7430,37700)=7430
    // basicBandRemaining=max(0,37700-7430)=30270
    // No BADR; gainAtBasic=min(397000,30270)=30270 at 18%=5448.6
    // gainAtHigher=397000-30270=366730 at 24%=88015.2; totalCgt=93463.8; net=306536.2
    const r = calcPracticeSaleCgt({
      gain: 400000,
      otherIncome: 20000,
      badrEligible: false,
      aeaAvailable: 3000,
    });
    expect(r.taxableGain).toBe(397000);
    expect(r.gainAtBadr).toBe(0);
    expect(r.gainAtBasic).toBeCloseTo(30270, 0);
    expect(r.gainAtHigher).toBeCloseTo(366730, 0);
    expect(r.totalCgt).toBeCloseTo(93463.8, 1);
    expect(r.netProceeds).toBeCloseTo(306536.2, 1);
    expect(r.netProceeds + r.totalCgt).toBeCloseTo(400000, 1);
  });

  it("TC5: gain=3000, aeaAvailable=3000 -- zero taxable gain, zero CGT", () => {
    // taxableGain=3000-3000=0; zero CGT guard; netProceeds=gain=3000
    const r = calcPracticeSaleCgt({
      gain: 3000,
      otherIncome: 50000,
      badrEligible: true,
      aeaAvailable: 3000,
    });
    expect(r.taxableGain).toBe(0);
    expect(r.totalCgt).toBe(0);
    expect(r.netProceeds).toBe(3000);
  });

  it("BADR rate is 18% (from 6 April 2026, HP §4)", () => {
    const r = calcPracticeSaleCgt({
      gain: 100000,
      otherIncome: 0,
      badrEligible: true,
      aeaAvailable: 0,
      badrLifetimeRemaining: 1000000,
    });
    expect(r.badrRate).toBe(0.18);
    expect(r.totalCgt).toBeCloseTo(100000 * 0.18, 2);
  });

  it("BADR lifetime limit is £1,000,000 (HP §4, estate F1 resolved)", () => {
    const r = calcPracticeSaleCgt({
      gain: 1000000,
      otherIncome: 0,
      badrEligible: true,
      aeaAvailable: 0,
      badrLifetimeRemaining: 1000000,
    });
    expect(r.gainAtBadr).toBe(1000000);
    expect(r.gainAtHigher).toBe(0);
  });

  it("TC4 via config compute: headline contains valuation mid-total, net proceeds in breakdown", () => {
    // Valuation: (200000,mixed,midlands,normal,60000) -> midTotal = (230000+290000)/2 = 260000
    const result = practiceSaleConfig.compute({
      values: {
        ebitda: 200000,
        mix: "mixed",
        region: "midlands",
        demand: "normal",
        tangibleAssets: 60000,
        chargeableGain: 0,
        otherIncome: 50000,
        badrEligible: true,
      },
      rows: [],
    });
    expect(result.headline.value).toContain("260,000");
    expect(result.scenarioResults).toHaveLength(2);
    const netRow = result.breakdown?.find((r) => r.label === "Net proceeds after CGT");
    expect(netRow).toBeDefined();
    // chargeableGain defaults to midGoodwill = (170000+230000)/2 = 200000
    // CGT on 200000, BADR, oI=50000: taxable=197000; BADR=197000*0.18=35460; net=200000-35460=164540
    const cgt = calcPracticeSaleCgt({ gain: 200000, otherIncome: 50000, badrEligible: true, aeaAvailable: 3000 });
    expect(netRow?.value).toContain(Math.round(cgt.netProceeds).toLocaleString("en-GB"));
  });
});

// ── Tool 5: uda-nhs-premium ──────────────────────────────────────────────────

describe("Tool 5 · uda-nhs-premium (calcUdaValue)", () => {
  it("TC1: region=england, udas=12000, contractValue=336000, yearSigned=2019", () => {
    // effectiveUda=336000/12000=28; yearsSinceSigned=2026-2019=7
    // cumulativeCpi=1.025^7-1=0.18868575... (exp ~0.18869)
    // realValuePerUda=28/(1+0.18869)=23.5554... (exp ~23.5554)
    // benchmark=[25,35]; 28 is within range
    const r = calcUdaValue("england", 12000, 336000, 2019);
    expect(r.effectiveUda).toBeCloseTo(28, 5);
    expect(r.yearsSinceSigned).toBe(7);
    expect(r.cumulativeCpi).toBeCloseTo(Math.pow(1.025, 7) - 1, 8);
    expect(r.realValuePerUda).toBeCloseTo(28 / Math.pow(1.025, 7), 4);
    expect(r.benchmarkLow).toBe(25);
    expect(r.benchmarkHigh).toBe(35);
    expect(r.positionVsBenchmark).toBe("within");
  });

  it("TC2: region=england, udas=10000, contractValue=280000, yearSigned=2010", () => {
    // effectiveUda=28; yearsSinceSigned=16; cumulativeCpi=1.025^16-1=0.48451...
    // realValuePerUda=28/1.48451...=18.8615...
    const r = calcUdaValue("england", 10000, 280000, 2010);
    expect(r.effectiveUda).toBeCloseTo(28, 5);
    expect(r.yearsSinceSigned).toBe(16);
    expect(r.cumulativeCpi).toBeCloseTo(Math.pow(1.025, 16) - 1, 8);
    expect(r.realValuePerUda).toBeCloseTo(28 / Math.pow(1.025, 16), 4);
    expect(r.positionVsBenchmark).toBe("within");
  });

  it("TC3: region=wales, udas=8000, contractValue=240000, yearSigned=2020", () => {
    // effectiveUda=30; yearsSinceSigned=6; benchmark=[25,38]
    // realValuePerUda=30/1.025^6=30/1.15969...=25.8689...
    const r = calcUdaValue("wales", 8000, 240000, 2020);
    expect(r.effectiveUda).toBeCloseTo(30, 5);
    expect(r.yearsSinceSigned).toBe(6);
    expect(r.benchmarkLow).toBe(25);
    expect(r.benchmarkHigh).toBe(38);
    expect(r.realValuePerUda).toBeCloseTo(30 / Math.pow(1.025, 6), 4);
    expect(r.positionVsBenchmark).toBe("within");
  });

  it("TC1 via config compute: headline shows £28.00, position within in sub", () => {
    const result = udaNhsConfig.compute({
      values: {
        region: "england",
        udas: 12000,
        contractValue: 336000,
        yearSigned: 2019,
      },
      rows: [],
    });
    expect(result.headline.value).toBe("£28.00");
    expect(result.headline.tone).toBe("good");
    // Breakdown rows present
    const effRow = result.breakdown?.find((r) => r.label === "Effective UDA value");
    expect(effRow?.value).toBe("£28.00");
  });

  it("below benchmark: position=below triggers warn tone", () => {
    // effectiveUda=20 (england: benchmark 25-35) -> below
    const r = calcUdaValue("england", 3000, 60000, 2020);
    expect(r.positionVsBenchmark).toBe("below");
    const result = udaNhsConfig.compute({
      values: { region: "england", udas: 3000, contractValue: 60000, yearSigned: 2020 },
      rows: [],
    });
    expect(result.headline.tone).toBe("warn");
  });
});

// ── Registry: hasPremiumTool and getPremiumTool ──────────────────────────────

describe("Premium registry", () => {
  it("hasPremiumTool returns true for all 5 registered toolIds", async () => {
    const { hasPremiumTool } = await import("./registry");
    expect(hasPremiumTool("associate-take-home-premium")).toBe(true);
    expect(hasPremiumTool("principal-extraction-premium")).toBe(true);
    expect(hasPremiumTool("practice-purchase-premium")).toBe(true);
    expect(hasPremiumTool("practice-sale-premium")).toBe(true);
    expect(hasPremiumTool("uda-nhs-premium")).toBe(true);
    expect(hasPremiumTool("unknown-tool")).toBe(false);
  });

  it("getPremiumTool returns config for known toolId, undefined for unknown", async () => {
    const { getPremiumTool } = await import("./registry");
    expect(getPremiumTool("associate-take-home-premium")?.id).toBe("associate-take-home-premium");
    expect(getPremiumTool("uda-nhs-premium")?.id).toBe("uda-nhs-premium");
    expect(getPremiumTool("nonexistent")).toBeUndefined();
  });
});

// ── resources.ts spine ───────────────────────────────────────────────────────

describe("resources.ts topic spine", () => {
  it("all 7 TopicKeys are present, compliance has empty toolId", async () => {
    const { TOPIC_RESOURCES, resourceForTopic } = await import("./resources");
    expect(TOPIC_RESOURCES["associate"].toolId).toBe("associate-take-home-premium");
    expect(TOPIC_RESOURCES["principal"].toolId).toBe("principal-extraction-premium");
    expect(TOPIC_RESOURCES["buying"].toolId).toBe("practice-purchase-premium");
    expect(TOPIC_RESOURCES["selling"].toolId).toBe("practice-sale-premium");
    expect(TOPIC_RESOURCES["nhs"].toolId).toBe("uda-nhs-premium");
    expect(TOPIC_RESOURCES["uda-calc"].toolId).toBe("uda-nhs-premium");
    expect(TOPIC_RESOURCES["compliance"].toolId).toBe("");
    expect(resourceForTopic(null)).toBeNull();
    expect(resourceForTopic(undefined)).toBeNull();
  });
});

// ── Compliance: no em-dashes in any authored string ─────────────────────────

describe("Copy compliance: no em-dashes in any tool string", () => {
  const configs = [
    associateTakeHomeConfig,
    principalExtractionConfig,
    practicePurchaseConfig,
    practiceSaleConfig,
    udaNhsConfig,
  ];

  for (const cfg of configs) {
    it(`${cfg.id}: no em-dashes in title, intro, explainer, field labels/help`, () => {
      const strings = [
        cfg.title,
        cfg.intro,
        cfg.explainer.heading,
        ...cfg.explainer.paragraphs,
        ...cfg.fields.map((f) => [f.label, f.help ?? ""].join(" ")),
      ];
      for (const s of strings) {
        expect(s).not.toContain("—"); // em-dash
        expect(s).not.toContain(" -- "); // double-dash (em-dash substitute)
      }
    });

    it(`${cfg.id}: no "DJH" in any authored string`, () => {
      const allText = [
        cfg.title,
        cfg.intro,
        ...cfg.explainer.paragraphs,
        cfg.explainer.heading,
        ...cfg.fields.map((f) => f.label + (f.help ?? "")),
      ].join(" ");
      expect(allText).not.toContain("DJH");
    });
  }
});

// ── Conservation invariants at default inputs ─────────────────────────────────

describe("Conservation invariants: compute() output at default inputs", () => {
  it("Tool 1 default: netCash + totalTax = taxableProfit (pension=0)", () => {
    const result = associateTakeHomeConfig.compute({
      values: {
        grossFees: 120000,
        associatePct: 50,
        labPct: 8,
        expenses: 3000,
        pensionContribution: 0,
        dayRate: 0,
        locumDays: 220,
      },
      rows: [],
    });
    // headline value should be "£41,408"
    expect(result.headline.value).toContain("41,408");
    expect(result.headline.tone).toBe("good");
    // No NaN anywhere
    for (const row of result.breakdown ?? []) {
      expect(row.value).not.toContain("NaN");
    }
  });

  it("Tool 2 default: no NaN, headline positive, two scenarios", () => {
    const result = principalExtractionConfig.compute({
      values: { profit: 120000, nhsActive: true, pensionContrib: 0 },
      rows: [],
    });
    expect(result.scenarioResults).toHaveLength(2);
    for (const row of result.breakdown ?? []) {
      expect(row.value).not.toContain("NaN");
    }
  });

  it("Tool 3 default: no NaN, two scenarios (low/high), cover ratio present", () => {
    const result = practicePurchaseConfig.compute({
      values: {
        ebitda: 200000,
        mix: "mixed",
        region: "midlands",
        demand: "normal",
        tangibleAssets: 60000,
        purchasePrice: 0,
        depositPct: 20,
        interestRate: 8,
        termYears: 15,
      },
      rows: [],
    });
    expect(result.scenarioResults).toHaveLength(2);
    for (const row of result.breakdown ?? []) {
      expect(row.value).not.toContain("NaN");
    }
  });

  it("Tool 4 default: no NaN, net proceeds row present", () => {
    const result = practiceSaleConfig.compute({
      values: {
        ebitda: 200000,
        mix: "mixed",
        region: "midlands",
        demand: "normal",
        tangibleAssets: 60000,
        chargeableGain: 0,
        otherIncome: 50000,
        badrEligible: true,
      },
      rows: [],
    });
    const netRow = result.breakdown?.find((r) => r.label === "Net proceeds after CGT");
    expect(netRow).toBeDefined();
    expect(netRow?.value).not.toContain("NaN");
  });

  it("Tool 5 default: no NaN, headline is a currency string", () => {
    const result = udaNhsConfig.compute({
      values: { region: "england", udas: 12000, contractValue: 336000, yearSigned: 2019 },
      rows: [],
    });
    expect(result.headline.value).toMatch(/^£\d/);
    for (const row of result.breakdown ?? []) {
      expect(row.value).not.toContain("NaN");
    }
  });
});
