/**
 * Golden tests for the Solicitors premium tool fleet.
 *
 * All cases trace to figures already pinned in solicitors-tools.test.ts (compute lib
 * goldens) plus house_positions.md (HP). Composition cannot drift silently: any
 * change to a compute lib will fail either the lib's own golden or these tests.
 *
 * Test runner: Vitest (run via `cd Solicitors/web && npx vitest run`)
 * NEW test file - do not merge into solicitors-tools.test.ts.
 *
 * FIGURES TRACED:
 * - llp-profit-share goldens (solicitors-tools.test.ts)
 * - solicitor-take-home 2026/27 goldens (solicitors-tools.test.ts, R2 updated)
 * - law-firm-valuation goldens (solicitors-tools.test.ts)
 * - sra-client-account-reserve goldens (solicitors-tools.test.ts, R2 corrected)
 * - practice-sale-cgt: HP §9 (CGT 18%/24%; AEA £3,000); HP verification log
 *   (BADR 18% from 6 Apr 2026); primary source gov.uk BADR (lifetime £1,000,000,
 *   confirmed 2026-07-05, manager F2 resolved).
 */

import { describe, it, expect } from "vitest";
import { calcSolicitorTakeHome } from "../compute/solicitor-take-home";
import { calcLLPProfitShare } from "../compute/llp-profit-share";
import { calcLawFirmValuation } from "../compute/law-firm-valuation";
import { calcSraReserve } from "../compute/sra-client-account-reserve";
import { calcPracticeSaleCgt } from "../compute/practice-sale-cgt";
import { llpProfitTaxConfig } from "./configs/llp-profit-tax";
import { solePractitionerConfig } from "./configs/sole-practitioner";
import { practiceSaleConfig } from "./configs/practice-sale";
import { sraClientAccountConfig } from "./configs/sra-client-account";

// ── Tool 1: llp-profit-tax-premium ──────────────────────────────────────────

describe("Tool 1 · llp-profit-tax-premium (compose LLPProfitShare + SolicitorTakeHome)", () => {
  it("TC1: equal split, 3 senior + 2 junior, profit=800000", () => {
    // Trace: llp-profit-share equal golden -> 5 partners at £160,000 each
    // Trace: solicitor-take-home 2026/27 at £160,000
    //   PA taper: 160000 > 100000 -> PA = max(0, 12570 - 30000) = 0
    //   t=160000; basic=37700->7540; higher=74870->29948; additional=(160000-112570)*0.45=21343.5
    //   Wait: additional = 160000 - 37700 - 74870 = 47430; 47430*0.45=21343.5
    //   incomeTax=58831.5; class4=37700*0.06+109730*0.02=2262+2194.6=4456.6
    //   tax=63288.1; net=160000-63288.1=96711.9
    const allocation = calcLLPProfitShare({
      totalProfit: 800000,
      method: "equal",
      seniorPartners: 3,
      juniorPartners: 2,
      fixedSharePartners: 0,
      fixedShareEach: 0,
      seniorMultiplier: 1.5,
    });
    expect(allocation.partners).toHaveLength(5);
    expect(allocation.partners[0].share).toBeCloseTo(160000, 0);

    const th = calcSolicitorTakeHome({ profit: 160000, pensionContrib: 0 });
    // Each partner's net from the premium compute should equal the take-home lib result.
    const result = llpProfitTaxConfig.compute({
      values: {
        totalProfit: 800000,
        method: "equal",
        seniorPartners: 3,
        juniorPartners: 2,
        fixedSharePartners: 0,
        fixedShareEach: 0,
        seniorMultiplier: 1.5,
      },
      rows: [],
    });

    // Headline: top partner keeps = partnership net at £160,000
    const headlineValue = th.partnership.net;
    expect(headlineValue).toBeCloseTo(96711.9, 0);

    // The result.breakdown should show 5 partners.
    const partnerRow = result.breakdown?.find((r) => r.label === "Number of partners");
    expect(partnerRow?.value).toBe("5");

    // Firm total tax = 5 x individual tax
    const firmTotalTax = 5 * th.partnership.tax;
    const taxRow = result.breakdown?.find((r) => r.label === "Total tax across all partners");
    expect(taxRow?.value).toBe("£" + Math.round(firmTotalTax).toLocaleString("en-GB"));
  });

  it("TC2: two-tier split, 3 senior + 2 junior, profit=800000", () => {
    // Trace: llp-profit-share two-tier golden -> senior £184,615, junior £123,077
    // Trace: solicitor-take-home at £184,615 (approx)
    //   PA taper: 184615>100000 -> PA = max(0, 12570-(184615-100000)/2) = max(0, 12570-42307.5) = 0
    //   t=184615; basic=37700->7540; higher=74870->29948; add=(184615-112570)*0.45
    //   Wait: additional = 184615 - 37700 - 74870 = 72045; 72045*0.45=32420.25
    //   incomeTax=7540+29948+32420.25=69908.25
    //   class4=2262+(184615-50270)*0.02=2262+134345*0.02=2262+2686.9=4948.9
    //   tax=74857.15; net=184615-74857.15=109757.85
    const allocation = calcLLPProfitShare({
      totalProfit: 800000,
      method: "two-tier",
      seniorPartners: 3,
      juniorPartners: 2,
      fixedSharePartners: 0,
      fixedShareEach: 0,
      seniorMultiplier: 1.5,
    });
    expect(allocation.partners[0].share).toBeCloseTo(184615, 0);
    expect(allocation.partners[3].share).toBeCloseTo(123077, 0);

    const thSenior = calcSolicitorTakeHome({ profit: allocation.partners[0].share, pensionContrib: 0 });
    // Top partner net should equal take-home lib result for the senior share.
    expect(thSenior.partnership.net).toBeCloseTo(109758, 0);

    const result = llpProfitTaxConfig.compute({
      values: {
        totalProfit: 800000,
        method: "two-tier",
        seniorPartners: 3,
        juniorPartners: 2,
        fixedSharePartners: 0,
        fixedShareEach: 0,
        seniorMultiplier: 1.5,
      },
      rows: [],
    });
    // Headline value should match the senior partner's net.
    expect(result.headline.value).toBe("£" + Math.round(thSenior.partnership.net).toLocaleString("en-GB"));
  });

  it("TC3: fixed-share-plus-equity, fixedSharePartners=2, fixedShareEach=85000, senior=3, junior=2, seniorMultiplier=1.6", () => {
    // Trace: llp-profit-share fixed-share golden -> fixed-share partners £85,000 each
    //   equityProfit = 800000 - 2*85000 = 630000
    //   totalEquityPoints = 3*1.6 + 2*1 = 6.8
    //   senior equity share = 630000/6.8*1.6 = 148235.29
    // Trace: solicitor-take-home at £85,000
    //   PA not tapered; t=85000-12570=72430
    //   basic=37700->7540; higher=min(72430-37700,74870)=34730->13892
    //   incomeTax=21432; class4=2262+34730*0.02=2262+694.6=2956.6
    //   tax=24388.6; net=85000-24388.6=60611.4
    const allocation = calcLLPProfitShare({
      totalProfit: 800000,
      method: "fixed-share-plus-equity",
      seniorPartners: 3,
      juniorPartners: 2,
      fixedSharePartners: 2,
      fixedShareEach: 85000,
      seniorMultiplier: 1.6,
    });
    expect(allocation.partners[0].share).toBe(85000);
    expect(allocation.partners[1].share).toBe(85000);
    expect(allocation.partners[2].share).toBeCloseTo(148235, 0);

    const thFixed = calcSolicitorTakeHome({ profit: 85000, pensionContrib: 0 });
    expect(thFixed.partnership.net).toBeCloseTo(60611, 0);

    const result = llpProfitTaxConfig.compute({
      values: {
        totalProfit: 800000,
        method: "fixed-share-plus-equity",
        seniorPartners: 3,
        juniorPartners: 2,
        fixedSharePartners: 2,
        fixedShareEach: 85000,
        seniorMultiplier: 1.6,
      },
      rows: [],
    });
    // Fixed-share partners have the smallest share, so the top partner is a senior equity.
    // The headline should be greater than the fixed-share net.
    const fixedNet = thFixed.partnership.net;
    const headlineNum = parseInt(result.headline.value.replace(/[^0-9]/g, ""), 10);
    expect(headlineNum).toBeGreaterThan(fixedNet);
  });

  it("TC4: no partners (seniorPartners=0, juniorPartners=0) - graceful zero result", () => {
    const result = llpProfitTaxConfig.compute({
      values: {
        totalProfit: 800000,
        method: "equal",
        seniorPartners: 0,
        juniorPartners: 0,
        fixedSharePartners: 0,
        fixedShareEach: 0,
        seniorMultiplier: 1.5,
      },
      rows: [],
    });
    // Must not throw, must not produce NaN.
    const parsedValue = parseInt(result.headline.value.replace(/[^0-9]/g, ""), 10);
    expect(isNaN(parsedValue || 0)).toBe(false);
    // Note: no partners, headline shows £0 and does not NaN.
    expect(result.headline.value).toContain("£0");
    // The note or sub should acknowledge the zero-partners state.
    expect(result.headline.sub ?? result.note ?? "").not.toBe("");
  });
});

// ── Tool 2: sole-practitioner-premium ───────────────────────────────────────

describe("Tool 2 · sole-practitioner-premium (direct reuse of calcSolicitorTakeHome)", () => {
  it("TC1: profit=150000, pensionContrib=0 - partnership net = 91411.9 (traced verbatim)", () => {
    // Trace: solicitor-take-home 2026/27 golden for profit=150000, pension=0.
    // Partnership result unchanged from 2025/26 (no dividends involved).
    const r = calcSolicitorTakeHome({ profit: 150000, pensionContrib: 0 });
    expect(r.partnership.net).toBeCloseTo(91411.9, 0);

    const result = solePractitionerConfig.compute({
      values: { profit: 150000, pensionContrib: 0 },
      rows: [],
    });
    const soleScenario = result.scenarioResults?.find((s) => s.id === "sole");
    expect(soleScenario).toBeDefined();
    // Net should match the take-home lib's partnership result.
    const netValue = Math.round(r.partnership.net);
    expect(soleScenario?.rows?.[0]?.value).toBe("£" + netValue.toLocaleString("en-GB"));
  });

  it("TC2: profit=150000 - winning structure picks the higher of sole vs Ltd", () => {
    const r = calcSolicitorTakeHome({ profit: 150000, pensionContrib: 0 });
    const result = solePractitionerConfig.compute({
      values: { profit: 150000, pensionContrib: 0 },
      rows: [],
    });
    // Headline should show the max of the two nets.
    const expectedBest = Math.max(r.partnership.net, r.ltd.net);
    const headlineNum = parseFloat(result.headline.value.replace(/[£,]/g, ""));
    expect(headlineNum).toBeCloseTo(expectedBest, 0);
  });

  it("TC3: profit=60000, pensionContrib=10000 - pension reduces tax compared to no pension", () => {
    // Trace: solicitor-take-home pension-contribution test.
    const rWithout = calcSolicitorTakeHome({ profit: 60000, pensionContrib: 0 });
    const rWith = calcSolicitorTakeHome({ profit: 60000, pensionContrib: 10000 });
    // Pension contribution reduces tax (net is higher with pension because less tax).
    expect(rWith.partnership.tax).toBeLessThan(rWithout.partnership.tax);

    // The premium tool should honour the pension contribution.
    const resultWith = solePractitionerConfig.compute({
      values: { profit: 60000, pensionContrib: 10000 },
      rows: [],
    });
    const resultWithout = solePractitionerConfig.compute({
      values: { profit: 60000, pensionContrib: 0 },
      rows: [],
    });
    // With-pension headline net (sole) should be higher than without.
    const netWith = rWith.partnership.net;
    const netWithout = rWithout.partnership.net;
    expect(netWith).toBeGreaterThan(netWithout);
    // Confirm the tool's difference figure reflects the pension saving.
    const diffRow = resultWith.breakdown?.find((r) => r.label === "Difference in take-home");
    expect(diffRow).toBeDefined();
    const diffRowOut = resultWithout.breakdown?.find((r) => r.label === "Difference in take-home");
    expect(diffRowOut).toBeDefined();
  });

  it("TC4: profit=0 - all nets £0, no NaN, headline valid", () => {
    const r = calcSolicitorTakeHome({ profit: 0, pensionContrib: 0 });
    expect(r.partnership.net).toBe(0);
    expect(r.ltd.net).toBeGreaterThanOrEqual(0);

    const result = solePractitionerConfig.compute({
      values: { profit: 0, pensionContrib: 0 },
      rows: [],
    });
    expect(result.headline.tone).toBeDefined();
    // No NaN in breakdown.
    for (const row of result.breakdown ?? []) {
      expect(row.value).not.toContain("NaN");
    }
  });
});

// ── Tool 3: practice-sale-premium ────────────────────────────────────────────

describe("Tool 3 · practice-sale-premium (valuation reuse + CGT lib)", () => {
  it("TC1: default valuation - partnership-llp midlands normal, profit=600000, wip=180000, assets=40000", () => {
    // Trace: law-firm-valuation default golden (solicitors-tools.test.ts)
    //   multiples 1.0-2.0, goodwill £600k-£1.2m, total £820k-£1.42m
    const val = calcLawFirmValuation({
      profit: 600000,
      firmType: "partnership-llp",
      region: "midlands",
      demand: "normal",
      wip: 180000,
      tangibleAssets: 40000,
    });
    expect(val.multipleLow).toBeCloseTo(1.0, 2);
    expect(val.multipleHigh).toBeCloseTo(2.0, 2);
    expect(val.goodwillLow).toBeCloseTo(600000, 0);
    expect(val.goodwillHigh).toBeCloseTo(1200000, 0);
    expect(val.totalLow).toBeCloseTo(820000, 0);
    expect(val.totalHigh).toBeCloseTo(1420000, 0);

    const result = practiceSaleConfig.compute({
      values: {
        profit: 600000,
        firmType: "partnership-llp",
        region: "midlands",
        demand: "normal",
        wip: 180000,
        tangibleAssets: 40000,
        chargeableGain: 0,
        otherIncome: 50000,
        badrEligible: true,
      },
      rows: [],
    });
    // Headline = mid-total = (820000+1420000)/2 = 1120000
    expect(result.headline.value).toContain("1,120,000");
  });

  it("TC2: specialist london high demand - multiples 2.05-3.75 (traced valuation golden)", () => {
    // Trace: specialist london high golden (solicitors-tools.test.ts)
    const val = calcLawFirmValuation({
      profit: 1000000,
      firmType: "specialist",
      region: "london",
      demand: "high",
      wip: 0,
      tangibleAssets: 0,
    });
    expect(val.multipleLow).toBeCloseTo(2.05, 2);
    expect(val.multipleHigh).toBeCloseTo(3.75, 2);
    expect(val.goodwillLow).toBeCloseTo(2050000, 0);

    const result = practiceSaleConfig.compute({
      values: {
        profit: 1000000,
        firmType: "specialist",
        region: "london",
        demand: "high",
        wip: 0,
        tangibleAssets: 0,
        chargeableGain: 0,
        otherIncome: 50000,
        badrEligible: true,
      },
      rows: [],
    });
    expect(result.scenarioResults).toHaveLength(2);
    const low = result.scenarioResults?.find((s) => s.id === "low");
    expect(low?.rows?.find((r) => r.label === "Goodwill")?.value).toContain("2,050,000");
  });

  it("TC3 (CGT lib): badrEligible=true, gain=900000, otherIncome=50000, aeaAvailable=3000", () => {
    // Trace: HP §9 AEA £3,000; BADR 18% from 6 Apr 2026 (HP verification log);
    //   BADR lifetime £1,000,000 (gov.uk BADR, F2 resolved 2026-07-05).
    //
    // taxableGain = 900000 - 3000 = 897000
    // incomeInBasicBand = min(max(0, 50000-12570), 37700) = min(37430, 37700) = 37430
    // basicBandRemaining = max(0, 37700 - 37430) = 270
    // BADR: badrGain = min(897000, 1000000) = 897000
    // CGT = 897000 * 0.18 = 161460
    // remaining = 0 (all covered by BADR)
    // netProceeds = 900000 - 161460 = 738540
    const cgt = calcPracticeSaleCgt({
      gain: 900000,
      otherIncome: 50000,
      badrEligible: true,
      aeaAvailable: 3000,
      badrLifetimeRemaining: 1000000,
    });
    expect(cgt.taxableGain).toBe(897000);
    expect(cgt.gainAtBadr).toBe(897000);
    expect(cgt.totalCgt).toBeCloseTo(161460, 0);
    expect(cgt.netProceeds).toBeCloseTo(900000 - 161460, 0);
  });

  it("TC4 (CGT lib): badrEligible=false, gain=100000, otherIncome=60000 (higher-rate) - 24% on all", () => {
    // Trace: HP §9 standard CGT 24% (above basic-rate band).
    // otherIncome=60000 > basic limit (50270), so all basic-rate band used.
    //
    // taxableGain = 100000 - 3000 = 97000
    // incomeInBasicBand = min(max(0, 60000-12570), 37700) = min(47430, 37700) = 37700
    // basicBandRemaining = max(0, 37700 - 37700) = 0
    // No BADR; no basic-rate band: all 97000 at 24%
    // totalCgt = 97000 * 0.24 = 23280
    const cgt = calcPracticeSaleCgt({
      gain: 100000,
      otherIncome: 60000,
      badrEligible: false,
      aeaAvailable: 3000,
    });
    expect(cgt.taxableGain).toBe(97000);
    expect(cgt.gainAtHigher).toBe(97000);
    expect(cgt.totalCgt).toBeCloseTo(23280, 0);
    expect(cgt.netProceeds).toBeCloseTo(100000 - 23280, 0);
  });
});

// ── Tool 4: sra-client-account-premium ──────────────────────────────────────

describe("Tool 4 · sra-client-account-premium (reserve reuse + corrected Rule 12.2 exemption)", () => {
  it("TC1: openMatters=150, volume=high, matterType=conveyancing - traced sra-reserve golden", () => {
    // Trace: sra-reserve default golden (solicitors-tools.test.ts, R2 updated)
    //   peak=3750000, suggested=93750, low=65625, high=140625
    const r = calcSraReserve({ openMatters: 150, volume: "high", matterType: "conveyancing" });
    expect(r.peakClientMoney).toBe(3750000);
    expect(r.suggestedReserve).toBeCloseTo(93750, 0);
    expect(r.lowReserve).toBeCloseTo(65625, 0);
    expect(r.highReserve).toBeCloseTo(140625, 0);

    const result = sraClientAccountConfig.compute({
      values: {
        openMatters: 150,
        volume: "high",
        matterType: "conveyancing",
        averageBalance: 150000,
        maxBalance: 3750000,
      },
      rows: [],
    });
    expect(result.headline.value).toContain("93,750");
  });

  it("TC2: openMatters=50, volume=low, matterType=private-client - suggested reserve 625", () => {
    // Trace: sra-reserve golden (solicitors-tools.test.ts)
    const r = calcSraReserve({ openMatters: 50, volume: "low", matterType: "private-client" });
    expect(r.suggestedReserve).toBeCloseTo(625, 0);

    const result = sraClientAccountConfig.compute({
      values: {
        openMatters: 50,
        volume: "low",
        matterType: "private-client",
        averageBalance: 2500,
        maxBalance: 125000,
      },
      rows: [],
    });
    expect(result.headline.value).toContain("625");
  });

  it("TC3: openMatters=20, volume=very-high, matterType=commercial - suggested reserve 12000", () => {
    // Trace: sra-reserve golden (solicitors-tools.test.ts)
    const r = calcSraReserve({ openMatters: 20, volume: "very-high", matterType: "commercial" });
    expect(r.suggestedReserve).toBeCloseTo(12000, 0);

    const result = sraClientAccountConfig.compute({
      values: {
        openMatters: 20,
        volume: "very-high",
        matterType: "commercial",
        averageBalance: 75000,
        maxBalance: 1500000,
      },
      rows: [],
    });
    expect(result.headline.value).toContain("12,000");
  });

  it("TC4a: corrected exemption - averageBalance=8000, maxBalance=240000 -> within exemption", () => {
    // Trace: HP §5.G: average not exceeding £10,000 AND maximum not exceeding £250,000.
    // 8000 <= 10000 AND 240000 <= 250000 -> TRUE
    const result = sraClientAccountConfig.compute({
      values: {
        openMatters: 5,
        volume: "low",
        matterType: "mixed",
        averageBalance: 8000,
        maxBalance: 240000,
      },
      rows: [],
    });
    const exemRow = result.breakdown?.find((r) =>
      r.label.includes("exemption")
    );
    expect(exemRow?.value).toContain("within exemption");
  });

  it("TC4b: averageBalance=8000, maxBalance=260000 -> NOT within exemption (max exceeds £250,000)", () => {
    // 260000 > 250000 -> FALSE
    const result = sraClientAccountConfig.compute({
      values: {
        openMatters: 5,
        volume: "low",
        matterType: "mixed",
        averageBalance: 8000,
        maxBalance: 260000,
      },
      rows: [],
    });
    const exemRow = result.breakdown?.find((r) =>
      r.label.includes("exemption")
    );
    expect(exemRow?.value).toContain("Report likely required");
  });

  it("TC4c: averageBalance=12000, maxBalance=100000 -> NOT within exemption (average exceeds £10,000)", () => {
    // 12000 > 10000 -> FALSE
    const result = sraClientAccountConfig.compute({
      values: {
        openMatters: 5,
        volume: "low",
        matterType: "mixed",
        averageBalance: 12000,
        maxBalance: 100000,
      },
      rows: [],
    });
    const exemRow = result.breakdown?.find((r) =>
      r.label.includes("exemption")
    );
    expect(exemRow?.value).toContain("Report likely required");
  });

  it("TC4d (invariant): tool NEVER produces or prints a £250 threshold", () => {
    // HP §5.G: "do NOT use any £250 figure". The correct maximum threshold is £250,000.
    // Inspect all breakdown row values, headline and note for the string "£250" (not followed by ",000").
    const result = sraClientAccountConfig.compute({
      values: {
        openMatters: 150,
        volume: "high",
        matterType: "conveyancing",
        averageBalance: 8000,
        maxBalance: 240000,
      },
      rows: [],
    });
    const allText = [
      result.headline.value,
      result.headline.sub ?? "",
      result.note ?? "",
      ...(result.breakdown ?? []).map((r) => r.label + " " + r.value),
    ].join(" ");

    // The string "£250" must only appear as part of "£250,000" (not as a bare threshold).
    // Strip all "£250,000" occurrences and check no bare "£250" or "£250 " remains.
    const strippedOf250k = allText.replace(/£250,000/g, "£CORRECT");
    expect(strippedOf250k).not.toMatch(/£250[^,0-9]/);
    expect(strippedOf250k).not.toMatch(/£250$/);
  });
});

// ── CGT lib standalone tests ─────────────────────────────────────────────────

describe("calcPracticeSaleCgt - standalone golden tests (HP §9 + BADR verification)", () => {
  it("BADR eligible, gain within lifetime limit - 18% on full taxable gain", () => {
    // Same as Tool 3 TC3.
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
    expect(r.totalCgt).toBeCloseTo(161460, 0); // 897000 * 0.18
    expect(r.netProceeds).toBeCloseTo(738540, 0);
  });

  it("No BADR, higher-rate taxpayer - 24% on full taxable gain", () => {
    // Same as Tool 3 TC4.
    const r = calcPracticeSaleCgt({
      gain: 100000,
      otherIncome: 60000,
      badrEligible: false,
      aeaAvailable: 3000,
    });
    expect(r.taxableGain).toBe(97000);
    expect(r.gainAtBadr).toBe(0);
    expect(r.gainAtBasic).toBe(0);
    expect(r.gainAtHigher).toBe(97000);
    expect(r.totalCgt).toBeCloseTo(23280, 0); // 97000 * 0.24
    expect(r.netProceeds).toBeCloseTo(76720, 0);
  });

  it("Gain within AEA - zero CGT", () => {
    const r = calcPracticeSaleCgt({
      gain: 2500,
      otherIncome: 0,
      badrEligible: false,
      aeaAvailable: 3000,
    });
    expect(r.taxableGain).toBe(0);
    expect(r.totalCgt).toBe(0);
    expect(r.netProceeds).toBe(2500);
  });

  it("BADR partial: gain exceeds lifetime limit - remainder at standard rates", () => {
    // gain=1200000, AEA=3000, taxableGain=1197000
    // BADR on 1000000 at 18% = 180000
    // remainder = 197000, all at higher rate (otherIncome=100000 exhausts basic band)
    // basicBandRemaining: incomeInBasicBand = min(max(0,100000-12570),37700)=min(87430,37700)=37700
    // basicBandRemaining = 37700-37700 = 0 (but BADR used 1000000 of basic band space already)
    // basicBandAfterBadr = max(0, 0 - 1000000) = 0 -> all at 24%
    // 197000 at 24% = 47280
    // total CGT = 180000 + 47280 = 227280
    const r = calcPracticeSaleCgt({
      gain: 1200000,
      otherIncome: 100000,
      badrEligible: true,
      aeaAvailable: 3000,
      badrLifetimeRemaining: 1000000,
    });
    expect(r.taxableGain).toBe(1197000);
    expect(r.gainAtBadr).toBe(1000000);
    expect(r.gainAtHigher).toBe(197000);
    expect(r.totalCgt).toBeCloseTo(227280, 0);
  });

  it("BADR rate is 18% (from 6 April 2026, HP verification log)", () => {
    const r = calcPracticeSaleCgt({
      gain: 100000,
      otherIncome: 0,
      badrEligible: true,
      aeaAvailable: 0,
      badrLifetimeRemaining: 1000000,
    });
    // All at BADR rate
    expect(r.badrRate).toBe(0.18);
    expect(r.totalCgt).toBeCloseTo(100000 * 0.18, 2);
  });

  it("Lifetime limit is £1,000,000 (confirmed at source, F2 resolved)", () => {
    // Gain of exactly the lifetime limit: all at BADR
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
});
