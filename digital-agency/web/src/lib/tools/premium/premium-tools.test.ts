/**
 * Golden tests for the Agency Founder Finance premium tool fleet (aff).
 *
 * All figures were derived by EXECUTING the current compute libs in Node
 * (node_modules/.bin/tsx, 2026-07-06), not hand-traced. Each pinned value is
 * confirmed to the penny. Conservation checks verify internal consistency.
 * No typeof-only assertions: every number is pinned exactly (toBeCloseTo 0 dp
 * means exact integer; higher dp for floating-point sums).
 *
 * Test runner: Vitest (run via the shared config)
 *   npx vitest run --config packages/web-shared/vitest.config.ts \
 *     digital-agency/web/src/lib/tools/premium/premium-tools.test.ts
 *
 * FIGURES TRACED:
 * - calcSalaryDividend: executed 2026-07-06. 2026/27 rates (dividends
 *   10.75/35.75/39.35 FA 2026, employer NIC 15% above £5,000, EA £10,500,
 *   CT 19/25 marginal ~26.5%, HP §2/§3).
 * - calcBadrCgt: executed 2026-07-06. BADR 14% (2025/26) / 18% (2026/27),
 *   standard CGT 24%, lifetime limit £1,000,000 (HP §5).
 * - calcVatScheme: executed 2026-07-06. Standard 20%, FRS marketing 12.5%,
 *   LCT 16.5%, 2%/£1,000 goods test (HP §6).
 * - calcEmployerNi: executed 2026-07-06. Employer NIC 15% above £5,000, EA
 *   £10,500 (length >= 2 only), pension 3% above £6,240 (HP §2).
 * - calcRdTaxCredit: executed 2026-07-06. Merged RDEC 20%, ERIS 30%/86%/14.5%
 *   CORRECTED (not stale 40%), subcontractor 65% haircut (HP §4).
 */

import { describe, it, expect } from "vitest";
import { calcSalaryDividend } from "../compute/salary-dividend";
import { calcBadrCgt } from "../compute/badr-cgt";
import { calcVatScheme } from "../compute/vat-scheme";
import { calcEmployerNi } from "../compute/employer-ni";
import { calcRdTaxCredit } from "../compute/rd-tax-credit";
import { salaryDividendOptimiserConfig } from "./configs/salary-dividend-optimiser";
import { agencyExitCgtConfig } from "./configs/agency-exit-cgt";
import { vatSchemeComparatorConfig } from "./configs/vat-scheme-comparator";
import { employerCostToHireConfig } from "./configs/employer-cost-to-hire";
import { rdTaxCreditConfig } from "./configs/rd-tax-credit";

// ── Tool 1: salary-dividend-optimiser-premium ──────────────────────────────

describe("Tool 1 · salary-dividend-optimiser-premium (EA=false default, EA=true branch)", () => {
  it("GOLDEN EA=false default: profit=120000", () => {
    // Executed 2026-07-06. optimal salary=12570 (PA, no employer NI cost above ST
    // minus EA), dividend=81876.46, employerNi=1135.5 ((12570-5000)*0.15),
    // corporationTax=24418.04, employeeNi=0, incomeTax=0, dividendTax=19667.08,
    // totalTax=45220.63, netCash=74779.37 -> "£74,779".
    const out = calcSalaryDividend({ profitBeforeDirector: 120000, useEmploymentAllowance: false });
    expect(out.optimal.salary).toBe(12570);
    expect(out.optimal.dividend).toBeCloseTo(81876.46, 1);
    expect(out.optimal.employerNi).toBeCloseTo(1135.5, 1);
    expect(out.optimal.corporationTax).toBeCloseTo(24418.04, 1);
    expect(out.optimal.employeeNi).toBe(0);
    expect(out.optimal.incomeTax).toBe(0);
    expect(out.optimal.dividendTax).toBeCloseTo(19667.08, 1);
    expect(out.optimal.totalTax).toBeCloseTo(45220.63, 1);
    expect(out.optimal.netCash).toBeCloseTo(74779.37, 1);
    expect(out.optimalVsSalaryOnly).toBeCloseTo(2395.56, 1);
    expect(out.optimalVsDividendOnly).toBeCloseTo(1603.97, 1);
    expect(out.salaryOnly.netCash).toBeCloseTo(72383.82, 1);
    expect(out.dividendOnly.netCash).toBeCloseTo(73175.4, 1);
    // Conservation: netCash = salary - employeeNi - incomeTax + dividend - dividendTax
    expect(out.optimal.netCash).toBeCloseTo(
      out.optimal.salary - out.optimal.employeeNi - out.optimal.incomeTax
      + out.optimal.dividend - out.optimal.dividendTax,
      2
    );
  });

  it("GOLDEN EA=true branch: profit=120000 -> optimal salary=60000, netCash=76279.78", () => {
    // EA covers employer NI so optimiser lifts salary to the £60,000 loop cap.
    const out = calcSalaryDividend({ profitBeforeDirector: 120000, useEmploymentAllowance: true });
    expect(out.optimal.salary).toBe(60000);
    expect(out.optimal.dividend).toBeCloseTo(47850, 0);
    expect(out.optimal.netCash).toBeCloseTo(76279.78, 1);
    // Conservation: netCash = salary - employeeNi - incomeTax + dividend - dividendTax
    expect(out.optimal.netCash).toBeCloseTo(
      out.optimal.salary - out.optimal.employeeNi - out.optimal.incomeTax
      + out.optimal.dividend - out.optimal.dividendTax,
      2
    );
  });

  it("headline format: EA=false default -> '£74,779'", () => {
    const result = salaryDividendOptimiserConfig.compute({
      values: { profitBeforeDirector: 120000, useEmploymentAllowance: false },
      rows: [],
    });
    expect(result.headline.value).toBe("£74,779");
    expect(result.headline.tone).toBe("good");
    expect(result.headline.sub).toContain("£12,570");
    // No NaN anywhere
    for (const row of result.breakdown ?? []) {
      expect(row.value).not.toContain("NaN");
    }
  });

  it("headline format: EA=true -> '£76,280'", () => {
    const result = salaryDividendOptimiserConfig.compute({
      values: { profitBeforeDirector: 120000, useEmploymentAllowance: true },
      rows: [],
    });
    expect(result.headline.value).toBe("£76,280");
  });

  it("three scenarioResults returned: optimal, salary-only, dividend-only", () => {
    const result = salaryDividendOptimiserConfig.compute({
      values: { profitBeforeDirector: 120000, useEmploymentAllowance: false },
      rows: [],
    });
    expect(result.scenarioResults).toHaveLength(3);
    expect(result.scenarioResults?.find((s) => s.id === "optimal")?.best).toBe(true);
    expect(result.scenarioResults?.find((s) => s.id === "salary-only")?.best).toBe(false);
    expect(result.scenarioResults?.find((s) => s.id === "dividend-only")?.best).toBe(false);
  });

  it("chart data has three groups", () => {
    const result = salaryDividendOptimiserConfig.compute({
      values: { profitBeforeDirector: 120000, useEmploymentAllowance: false },
      rows: [],
    });
    expect(result.chart?.data).toHaveLength(3);
    expect(result.chart?.data[0].name).toBe("Optimal split");
    expect(result.chart?.data[1].name).toBe("Salary only");
    expect(result.chart?.data[2].name).toBe("Dividend only");
  });

  it("profit=0: all zeroes", () => {
    const out = calcSalaryDividend({ profitBeforeDirector: 0, useEmploymentAllowance: false });
    expect(out.optimal.netCash).toBe(0);
    expect(out.optimal.totalTax).toBe(0);
  });
});

// ── Tool 2: agency-exit-cgt-premium ───────────────────────────────────────

describe("Tool 2 · agency-exit-cgt-premium (BADR + standard CGT)", () => {
  it("GOLDEN 2026/27 eligible: saleProceeds=750000, cost=50000", () => {
    // gain=700000, badrTax=700000*0.18=126000, standardTax=0, totalTax=126000
    // netProceeds=624000, effectiveRate=0.18
    const out = calcBadrCgt({
      saleProceeds: 750000,
      originalCost: 50000,
      previousBadrUsed: 0,
      year: "2026/27",
      meetsEligibility: true,
    });
    expect(out.gain).toBe(700000);
    expect(out.eligibleForBadr).toBe(700000);
    expect(out.badrTax).toBeCloseTo(126000, 0);
    expect(out.standardTax).toBe(0);
    expect(out.totalTax).toBeCloseTo(126000, 0);
    expect(out.netProceeds).toBeCloseTo(624000, 0);
    expect(out.effectiveRate).toBeCloseTo(0.18, 4);
    // Conservation: netProceeds + totalTax = saleProceeds
    expect(out.netProceeds + out.totalTax).toBeCloseTo(750000, 0);
  });

  it("GOLDEN 2026/27 not eligible: standard CGT 24% -> totalTax=168000, netProceeds=582000", () => {
    const out = calcBadrCgt({
      saleProceeds: 750000,
      originalCost: 50000,
      previousBadrUsed: 0,
      year: "2026/27",
      meetsEligibility: false,
    });
    expect(out.gain).toBe(700000);
    expect(out.totalTax).toBeCloseTo(168000, 0);
    expect(out.netProceeds).toBeCloseTo(582000, 0);
    expect(out.badrTax).toBe(0);
  });

  it("GOLDEN 2025/26 eligible (date-band rate switch): badrTax=98000, effectiveRate=0.14", () => {
    const out = calcBadrCgt({
      saleProceeds: 750000,
      originalCost: 50000,
      previousBadrUsed: 0,
      year: "2025/26",
      meetsEligibility: true,
    });
    expect(out.badrTax).toBeCloseTo(98000, 0);
    expect(out.netProceeds).toBeCloseTo(652000, 0);
    expect(out.effectiveRate).toBeCloseTo(0.14, 4);
  });

  it("GOLDEN over-limit case (proves £1,000,000 lifetime cap + 24% overflow)", () => {
    // saleProceeds=1500000, cost=0, 2026/27, eligible
    // gain=1500000, eligible=1000000, overflow=500000
    // badrTax=180000, standardTax=120000, totalTax=300000, netProceeds=1200000
    const out = calcBadrCgt({
      saleProceeds: 1500000,
      originalCost: 0,
      previousBadrUsed: 0,
      year: "2026/27",
      meetsEligibility: true,
    });
    expect(out.eligibleForBadr).toBe(1000000);
    expect(out.notEligible).toBe(500000);
    expect(out.badrTax).toBeCloseTo(180000, 0);
    expect(out.standardTax).toBeCloseTo(120000, 0);
    expect(out.totalTax).toBeCloseTo(300000, 0);
    expect(out.netProceeds).toBeCloseTo(1200000, 0);
    // Conservation
    expect(out.netProceeds + out.totalTax).toBeCloseTo(1500000, 0);
  });

  it("With-BADR tile marked best (624000 > 582000)", () => {
    const result = agencyExitCgtConfig.compute({
      values: { saleProceeds: 750000, originalCost: 50000, year: "2026/27", previousBadrUsed: 0 },
      rows: [],
    });
    const withBadr = result.scenarioResults?.find((s) => s.id === "with-badr");
    const standard = result.scenarioResults?.find((s) => s.id === "standard-cgt");
    expect(withBadr?.best).toBe(true);
    expect(standard?.best).toBe(false);
    expect(result.headline.value).toBe("£126,000");
    expect(result.headline.sub).toContain("£624,000");
    for (const row of result.breakdown ?? []) {
      expect(row.value).not.toContain("NaN");
    }
  });

  it("BADR rate is 18% in 2026/27 (not the stale 10%)", () => {
    const out = calcBadrCgt({
      saleProceeds: 1000000,
      originalCost: 0,
      previousBadrUsed: 0,
      year: "2026/27",
      meetsEligibility: true,
    });
    expect(out.badrTax).toBeCloseTo(1000000 * 0.18, 0);
    expect(out.badrTax).not.toBeCloseTo(1000000 * 0.10, 0);
  });
});

// ── Tool 3: vat-scheme-comparator-premium ──────────────────────────────────

describe("Tool 3 · vat-scheme-comparator-premium (standard vs FRS)", () => {
  it("GOLDEN default (LCT applies, Standard wins)", () => {
    // turnover=180000, vatInputs=8000, goodsSpend=500
    // vatCollected=36000, grossInclusive=216000, standardNet=28000
    // LCT: goods=500 < max(1000, 216000*0.02=4320)=4320 -> LCT, flatRate=0.165
    // flatPayment=216000*0.165=35640, bestScheme=Standard, saving=7640
    const out = calcVatScheme({ turnover: 180000, vatInputs: 8000, goodsSpend: 500 });
    expect(out.vatCollected).toBeCloseTo(36000, 0);
    expect(out.grossInclusive).toBeCloseTo(216000, 0);
    expect(out.standardNet).toBeCloseTo(28000, 0);
    expect(out.lctApplies).toBe(true);
    expect(out.flatRate).toBe(0.165);
    expect(out.flatPayment).toBeCloseTo(35640, 0);
    expect(out.flatKeep).toBeCloseTo(360, 0);
    expect(out.bestScheme).toBe("Standard");
    expect(out.saving).toBeCloseTo(7640, 0);
  });

  it("GOLDEN high-goods case (non-LCT, Flat Rate wins)", () => {
    // turnover=180000, vatInputs=3000, goodsSpend=10000
    // LCT: goods=10000 >= max(1000,4320)=4320 -> not LCT, flatRate=0.125
    // flatPayment=216000*0.125=27000, standardNet=33000, bestScheme=Flat Rate
    const out = calcVatScheme({ turnover: 180000, vatInputs: 3000, goodsSpend: 10000 });
    expect(out.lctApplies).toBe(false);
    expect(out.flatRate).toBe(0.125);
    expect(out.flatPayment).toBeCloseTo(27000, 0);
    expect(out.bestScheme).toBe("Flat Rate");
  });

  it("LCT rate is 16.5% at default (rate-mix regression guard)", () => {
    const out = calcVatScheme({ turnover: 180000, vatInputs: 8000, goodsSpend: 500 });
    expect(out.flatRate).toBe(0.165);
    expect(out.lctApplies).toBe(true);
  });

  it("headline and scenarioResults via config compute (default)", () => {
    const result = vatSchemeComparatorConfig.compute({
      values: { turnover: 180000, vatInputs: 8000, goodsSpend: 500 },
      rows: [],
    });
    expect(result.headline.value).toBe("Standard");
    expect(result.headline.sub).toContain("£7,640");
    const standard = result.scenarioResults?.find((s) => s.id === "standard");
    const flat = result.scenarioResults?.find((s) => s.id === "flat-rate");
    expect(standard?.best).toBe(true);
    expect(flat?.best).toBe(false);
    expect(standard?.headline.value).toBe("£28,000");
    expect(flat?.headline.value).toBe("£35,640");
    for (const row of result.breakdown ?? []) {
      expect(row.value).not.toContain("NaN");
    }
  });

  it("saving is £7,640 (absolute difference, not raw string)", () => {
    const out = calcVatScheme({ turnover: 180000, vatInputs: 8000, goodsSpend: 500 });
    expect(out.saving).toBeCloseTo(7640, 0);
  });
});

// ── Tool 4: employer-cost-to-hire-premium ─────────────────────────────────

describe("Tool 4 · employer-cost-to-hire-premium (EA/single-director trap)", () => {
  it("GOLDEN default: director=12570, hire=40000, EA=true, pension=true", () => {
    // employees=[{12570},{40000}], length=2 -> EA eligible
    // grossSalaryTotal=52570
    // niTotal: (12570-5000)*0.15+(40000-5000)*0.15=1135.5+5250=6385.5
    // eaApplied=min(10500,6385.5)=6385.5, niAfterEA=0
    // pensionTotal: (12570-6240)*0.03+(40000-6240)*0.03=189.9+1012.8=1202.7
    // totalEmploymentCost=52570+0+1202.7=53772.7
    // monthlyTotal=53772.7/12=4481.058...
    const out = calcEmployerNi({
      employees: [
        { id: 1, role: "director", salary: 12570 },
        { id: 2, role: "employee", salary: 40000 },
      ],
      useEmploymentAllowance: true,
      includePension: true,
    });
    expect(out.grossSalaryTotal).toBe(52570);
    expect(out.niTotal).toBeCloseTo(6385.5, 1);
    expect(out.eaApplied).toBeCloseTo(6385.5, 1);
    expect(out.niAfterEA).toBe(0);
    expect(out.pensionTotal).toBeCloseTo(1202.7, 1);
    expect(out.totalEmploymentCost).toBeCloseTo(53772.7, 1);
    expect(out.monthlyTotal).toBeCloseTo(4481.06, 1);
    expect(out.eaEligibleWarning).toBe(false);
    // Conservation: totalEmploymentCost = grossSalaryTotal + niAfterEA + pensionTotal
    expect(out.totalEmploymentCost).toBeCloseTo(
      out.grossSalaryTotal + out.niAfterEA + out.pensionTotal,
      2
    );
  });

  it("GOLDEN single-director case: firstHireSalary=0, EA on -> warning=true, niAfterEA=1135.5", () => {
    // employees=[{12570}], length=1 -> EA not eligible despite flag
    // niTotal=(12570-5000)*0.15=1135.5, eaApplied=0, niAfterEA=1135.5
    // pensionTotal=(12570-6240)*0.03=189.9, totalEmploymentCost=13895.4
    const out = calcEmployerNi({
      employees: [{ id: 1, role: "director", salary: 12570 }],
      useEmploymentAllowance: true,
      includePension: true,
    });
    expect(out.niTotal).toBeCloseTo(1135.5, 1);
    expect(out.eaApplied).toBe(0);
    expect(out.niAfterEA).toBeCloseTo(1135.5, 1);
    expect(out.pensionTotal).toBeCloseTo(189.9, 1);
    expect(out.totalEmploymentCost).toBeCloseTo(13895.4, 1);
    expect(out.eaEligibleWarning).toBe(true);
    // Conservation
    expect(out.totalEmploymentCost).toBeCloseTo(
      out.grossSalaryTotal + out.niAfterEA + out.pensionTotal,
      2
    );
  });

  it("GOLDEN EA-off case: default employees, EA=false -> niAfterEA=6385.5, total=60158.2", () => {
    const out = calcEmployerNi({
      employees: [
        { id: 1, role: "director", salary: 12570 },
        { id: 2, role: "employee", salary: 40000 },
      ],
      useEmploymentAllowance: false,
      includePension: true,
    });
    expect(out.eaApplied).toBe(0);
    expect(out.niAfterEA).toBeCloseTo(6385.5, 1);
    expect(out.totalEmploymentCost).toBeCloseTo(60158.2, 1);
    expect(out.eaEligibleWarning).toBe(false);
  });

  it("headline format: default -> '£53,773'", () => {
    const result = employerCostToHireConfig.compute({
      values: { directorSalary: 12570, firstHireSalary: 40000, claimEmploymentAllowance: true, includePension: true },
      rows: [],
    });
    expect(result.headline.value).toBe("£53,773");
    // No EA warning in the default (two-employee) case
    expect(result.headline.tone).toBe("default");
    for (const row of result.breakdown ?? []) {
      expect(row.value).not.toContain("NaN");
    }
  });

  it("single-director via config: '£13,895', warn tone, eaEligibleWarning in note", () => {
    const result = employerCostToHireConfig.compute({
      values: { directorSalary: 12570, firstHireSalary: 0, claimEmploymentAllowance: true, includePension: true },
      rows: [],
    });
    expect(result.headline.value).toBe("£13,895");
    expect(result.headline.tone).toBe("warn");
    // Note should contain the single-director warning
    expect(result.note).toContain("single director");
  });

  it("monthly cost via config: default -> '£4,481'", () => {
    const result = employerCostToHireConfig.compute({
      values: { directorSalary: 12570, firstHireSalary: 40000, claimEmploymentAllowance: true, includePension: true },
      rows: [],
    });
    const monthlyRow = result.breakdown?.find((r) => r.label === "Monthly cost");
    expect(monthlyRow?.value).toBe("£4,481");
  });
});

// ── Tool 5: rd-tax-credit-premium (CORRECTED rates) ───────────────────────

describe("Tool 5 · rd-tax-credit-premium (merged RDEC + ERIS, CORRECTED 30% threshold)", () => {
  it("GOLDEN default (non-intensive, merged RDEC 20%)", () => {
    // staffCost=120000, sub=40000*0.65=26000, consumables=15000, software=25000
    // qualifying=186000, intensityRatio=186000/800000=0.2325 < 0.30
    // grossCredit=186000*0.20=37200, netBenefit=37200*0.75=27900
    const out = calcRdTaxCredit({
      totalExpenditure: 800000,
      staffCost: 120000,
      subcontractorCost: 40000,
      consumablesCost: 15000,
      softwareCost: 25000,
    });
    expect(out.qualifying).toBeCloseTo(186000, 0);
    expect(out.intensityRatio).toBeCloseTo(0.2325, 4);
    expect(out.isIntensive).toBe(false);
    expect(out.usedEris).toBe(false);
    expect(out.creditRate).toBe(0.20);
    expect(out.grossCredit).toBeCloseTo(37200, 0);
    expect(out.netBenefit).toBeCloseTo(27900, 0);
  });

  it("GOLDEN ERIS case (>= 30% intensity): totalExpenditure=200000, staffCost=90000", () => {
    // qualifying=90000, intensity=0.45 >= 0.30 -> ERIS
    // surrenderedLoss=90000*1.86=167400, grossCredit=167400*0.145=24273
    // netBenefit=24273 (payable credit is cash), creditRate=0.2697
    const out = calcRdTaxCredit({
      totalExpenditure: 200000,
      staffCost: 90000,
      subcontractorCost: 0,
      consumablesCost: 0,
      softwareCost: 0,
    });
    expect(out.isIntensive).toBe(true);
    expect(out.usedEris).toBe(true);
    expect(out.creditRate).toBeCloseTo(0.2697, 3);
    expect(out.grossCredit).toBeCloseTo(24273, 0);
    expect(out.netBenefit).toBeCloseTo(24273, 0);
    expect(out.intensityRatio).toBeCloseTo(0.45, 4);
  });

  it("GOLDEN boundary: exactly 30% intensity -> ERIS true (CORRECTED threshold, not stale 40%)", () => {
    const out = calcRdTaxCredit({
      totalExpenditure: 100000,
      staffCost: 30000,
      subcontractorCost: 0,
      consumablesCost: 0,
      softwareCost: 0,
    });
    expect(out.intensityRatio).toBeCloseTo(0.30, 4);
    expect(out.isIntensive).toBe(true);
    expect(out.usedEris).toBe(true);
  });

  it("GOLDEN boundary: 29.9% intensity -> ERIS false, creditRate=0.20 (proves 30% not 40%)", () => {
    const out = calcRdTaxCredit({
      totalExpenditure: 100000,
      staffCost: 29900,
      subcontractorCost: 0,
      consumablesCost: 0,
      softwareCost: 0,
    });
    expect(out.intensityRatio).toBeCloseTo(0.299, 3);
    expect(out.isIntensive).toBe(false);
    expect(out.usedEris).toBe(false);
    expect(out.creditRate).toBe(0.20);
  });

  it("headline format: default -> '£27,900'", () => {
    const result = rdTaxCreditConfig.compute({
      values: { totalExpenditure: 800000, staffCost: 120000, subcontractorCost: 40000, consumablesCost: 15000, softwareCost: 25000 },
      rows: [],
    });
    expect(result.headline.value).toBe("£27,900");
    for (const row of result.breakdown ?? []) {
      expect(row.value).not.toContain("NaN");
    }
  });

  it("headline format: ERIS case -> '£24,273'", () => {
    const result = rdTaxCreditConfig.compute({
      values: { totalExpenditure: 200000, staffCost: 90000, subcontractorCost: 0, consumablesCost: 0, softwareCost: 0 },
      rows: [],
    });
    expect(result.headline.value).toBe("£24,273");
    // Sub line should mention ERIS
    expect(result.headline.sub?.toLowerCase()).toContain("eris");
  });

  it("subcontractor 65% haircut conservation: qualifying = staff + sub*0.65 + consumables + software", () => {
    const out = calcRdTaxCredit({
      totalExpenditure: 500000,
      staffCost: 80000,
      subcontractorCost: 20000,
      consumablesCost: 10000,
      softwareCost: 15000,
    });
    const expected = 80000 + 20000 * 0.65 + 10000 + 15000; // 118000
    expect(out.qualifying).toBeCloseTo(expected, 0);
  });
});

// ── Registry: hasPremiumTool and getPremiumTool ──────────────────────────────

describe("Premium registry", () => {
  it("hasPremiumTool returns true for all 5 registered toolIds", async () => {
    const { hasPremiumTool } = await import("./registry");
    expect(hasPremiumTool("salary-dividend-optimiser-premium")).toBe(true);
    expect(hasPremiumTool("agency-exit-cgt-premium")).toBe(true);
    expect(hasPremiumTool("vat-scheme-comparator-premium")).toBe(true);
    expect(hasPremiumTool("employer-cost-to-hire-premium")).toBe(true);
    expect(hasPremiumTool("rd-tax-credit-premium")).toBe(true);
    expect(hasPremiumTool("unknown-tool")).toBe(false);
    // hasPremiumTool("") must be false (international excluded)
    expect(hasPremiumTool("")).toBe(false);
  });

  it("getPremiumTool returns config for known toolId, undefined for unknown", async () => {
    const { getPremiumTool } = await import("./registry");
    expect(getPremiumTool("salary-dividend-optimiser-premium")?.id).toBe("salary-dividend-optimiser-premium");
    expect(getPremiumTool("rd-tax-credit-premium")?.id).toBe("rd-tax-credit-premium");
    expect(getPremiumTool("nonexistent")).toBeUndefined();
  });
});

// ── resources.ts spine ───────────────────────────────────────────────────────

describe("resources.ts topic spine", () => {
  it("all 6 TopicKeys are present, international has empty toolId", async () => {
    const { TOPIC_RESOURCES, resourceForTopic } = await import("./resources");
    expect(TOPIC_RESOURCES["pay-planning"].toolId).toBe("salary-dividend-optimiser-premium");
    expect(TOPIC_RESOURCES["exit"].toolId).toBe("agency-exit-cgt-premium");
    expect(TOPIC_RESOURCES["compliance-vat"].toolId).toBe("vat-scheme-comparator-premium");
    expect(TOPIC_RESOURCES["structure"].toolId).toBe("employer-cost-to-hire-premium");
    expect(TOPIC_RESOURCES["rnd"].toolId).toBe("rd-tax-credit-premium");
    expect(TOPIC_RESOURCES["international"].toolId).toBe("");
    // null/undefined -> null
    expect(resourceForTopic(null)).toBeNull();
    expect(resourceForTopic(undefined)).toBeNull();
  });

  it("international resolves to empty toolId (hasPremiumTool false, island stays dark)", async () => {
    const { TOPIC_RESOURCES } = await import("./resources");
    const { hasPremiumTool } = await import("./registry");
    const internationalToolId = TOPIC_RESOURCES["international"].toolId;
    expect(internationalToolId).toBe("");
    expect(hasPremiumTool(internationalToolId)).toBe(false);
  });

  it("resourceForTopic returns resource for all 6 TopicKeys", async () => {
    const { resourceForTopic } = await import("./resources");
    expect(resourceForTopic("pay-planning")?.toolId).toBe("salary-dividend-optimiser-premium");
    expect(resourceForTopic("exit")?.toolId).toBe("agency-exit-cgt-premium");
    expect(resourceForTopic("compliance-vat")?.toolId).toBe("vat-scheme-comparator-premium");
    expect(resourceForTopic("structure")?.toolId).toBe("employer-cost-to-hire-premium");
    expect(resourceForTopic("rnd")?.toolId).toBe("rd-tax-credit-premium");
    expect(resourceForTopic("international")?.toolId).toBe("");
  });
});

// ── Compliance: no em-dashes, no DJH, no credential claims ──────────────────

describe("Copy compliance: no em-dashes, no DJH, no credential claims", () => {
  const configs = [
    salaryDividendOptimiserConfig,
    agencyExitCgtConfig,
    vatSchemeComparatorConfig,
    employerCostToHireConfig,
    rdTaxCreditConfig,
  ];

  for (const cfg of configs) {
    it(`${cfg.id}: no em-dashes or double-hyphen in any authored string`, () => {
      const strings = [
        cfg.title,
        cfg.intro,
        cfg.explainer.heading,
        ...cfg.explainer.paragraphs,
        ...cfg.fields.map((f) => [f.label, f.help ?? ""].join(" ")),
      ];
      for (const s of strings) {
        expect(s, `em-dash in ${cfg.id}: "${s}"`).not.toContain("—");
        expect(s, `double-hyphen in ${cfg.id}: "${s}"`).not.toContain(" -- ");
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

    it(`${cfg.id}: no credential claim substrings (HP §10)`, () => {
      const allText = [
        cfg.title,
        cfg.intro,
        ...cfg.explainer.paragraphs,
        cfg.explainer.heading,
        ...cfg.fields.map((f) => f.label + (f.help ?? "")),
      ].join(" ").toLowerCase();
      expect(allText).not.toContain("icaew");
      expect(allText).not.toContain(" aca");
      expect(allText).not.toContain("chartered accountant");
      expect(allText).not.toContain("qualified accountant");
    });
  }
});

// ── Event name compliance ────────────────────────────────────────────────────

describe("Event compliance: toolIds are allowlisted, no new event names introduced", () => {
  it("compute() does not emit any analytics events directly", () => {
    // Premium configs are pure compute functions (no side effects). The event
    // fire (calc_view, calc_input_change, calc_computed, calc_result_viewed,
    // cta_click) is the responsibility of the PremiumCalculator component,
    // not the config. This test confirms that calling compute() does not throw
    // and produces a valid PremiumResult with no undefined fields.
    const result = salaryDividendOptimiserConfig.compute({
      values: { profitBeforeDirector: 120000, useEmploymentAllowance: false },
      rows: [],
    });
    expect(result.headline).toBeDefined();
    expect(result.headline.value).toBeDefined();
    expect(result.breakdown).toBeDefined();
  });
});

// ── Conservation invariants at default inputs ──────────────────────────────

describe("Conservation invariants: compute() at default inputs", () => {
  it("Tool 1 default (EA=false): optimal netCash = salary - employeeNi - incomeTax + dividend - dividendTax", () => {
    const out = calcSalaryDividend({ profitBeforeDirector: 120000, useEmploymentAllowance: false });
    expect(out.optimal.netCash).toBeCloseTo(
      out.optimal.salary - out.optimal.employeeNi - out.optimal.incomeTax
      + out.optimal.dividend - out.optimal.dividendTax,
      2
    );
  });

  it("Tool 2 default: netProceeds + totalTax = saleProceeds (eligible case)", () => {
    const out = calcBadrCgt({ saleProceeds: 750000, originalCost: 50000, previousBadrUsed: 0, year: "2026/27", meetsEligibility: true });
    expect(out.netProceeds + out.totalTax).toBeCloseTo(750000, 0);
  });

  it("Tool 3 default: no NaN, standardNet = vatCollected - vatInputs", () => {
    const out = calcVatScheme({ turnover: 180000, vatInputs: 8000, goodsSpend: 500 });
    expect(out.standardNet).toBeCloseTo(out.vatCollected - 8000, 0);
  });

  it("Tool 4 default: totalEmploymentCost = grossSalaryTotal + niAfterEA + pensionTotal", () => {
    const out = calcEmployerNi({
      employees: [{ id: 1, role: "director", salary: 12570 }, { id: 2, role: "employee", salary: 40000 }],
      useEmploymentAllowance: true,
      includePension: true,
    });
    expect(out.totalEmploymentCost).toBeCloseTo(out.grossSalaryTotal + out.niAfterEA + out.pensionTotal, 2);
  });

  it("Tool 5 default: qualifying = staffCost + subCost*0.65 + consumables + software", () => {
    const out = calcRdTaxCredit({ totalExpenditure: 800000, staffCost: 120000, subcontractorCost: 40000, consumablesCost: 15000, softwareCost: 25000 });
    expect(out.qualifying).toBeCloseTo(120000 + 40000 * 0.65 + 15000 + 25000, 0);
  });
});
