/**
 * Solicitor hourly rate & salary benchmark compute lib (pure TypeScript, no React/window/document/fetch).
 *
 * FIGURES TRACED:
 * - Guideline Hourly Rates (GHR): figures effective 1 January 2026, published by the
 *   Civil Justice Council / judiciary.uk (SPPI uprating, +2.28% on the 1 January 2025 table).
 *   Verified 2026-07-17 against judiciary.uk/guideline-hourly-rates-2026 and
 *   gov.uk/guidance/solicitors-guideline-hourly-rates (both agree).
 * - Employer NIC: 15% above £5,000 secondary threshold (2025/26 onward, unchanged 2026/27).
 * - Rule of thirds: long-standing law firm profitability convention — fee income splits
 *   roughly one third salary, one third overhead, one third profit, i.e. a fee earner
 *   should bill about 3x their total employment cost.
 *
 * LIMITATIONS: GHR are court-assessment guidelines, not a market rate cap; many firms
 * charge above GHR on solicitor-own-client terms. Salary benchmark is a billings-derived
 * convention, not a survey figure.
 */

export type Grade = "A" | "B" | "C" | "D";
export type GhrBand = "london-1" | "london-2" | "london-3" | "national-1" | "national-2";

// GHR effective 1 January 2026 (£/hour), verified 2026-07-17 (judiciary.uk + gov.uk).
export const GHR_2026: Record<GhrBand, Record<Grade, number>> = {
  "london-1": { A: 579, B: 393, C: 305, D: 210 },
  "london-2": { A: 422, B: 327, C: 276, D: 157 },
  "london-3": { A: 319, B: 262, C: 209, D: 146 },
  "national-1": { A: 295, B: 247, C: 201, D: 142 },
  "national-2": { A: 288, B: 247, C: 200, D: 142 },
};

const EMPLOYER_NIC_RATE = 0.15; // 2026/27
const EMPLOYER_NIC_THRESHOLD = 5000; // 2026/27 secondary threshold

export type RateBenchmarkInput = {
  grade: Grade;
  band: GhrBand;
  chargeRate: number; // £/hour current charge-out rate
  salary: number; // £/year gross salary (or notional salary for partners)
  chargeableHours: number; // billed hours per year
};

export type RateBenchmarkResult = {
  ghrRate: number;
  rateVsGhrPct: number; // charge-out rate as % of GHR
  rateGap: number; // chargeRate - ghrRate (£/hour)
  annualBillings: number;
  employerNic: number;
  totalEmploymentCost: number;
  costCoverageMultiple: number; // billings / total employment cost (rule-of-thirds target ~3x)
  ruleOfThirdsSalary: number; // billings / 3
};

export function calcRateBenchmark(input: RateBenchmarkInput): RateBenchmarkResult {
  const { grade, band, chargeRate, salary, chargeableHours } = input;
  const ghrRate = GHR_2026[band][grade];
  const rateVsGhrPct = ghrRate > 0 ? (chargeRate / ghrRate) * 100 : 0;
  const rateGap = chargeRate - ghrRate;
  const annualBillings = chargeRate * chargeableHours;
  const employerNic = Math.max(0, salary - EMPLOYER_NIC_THRESHOLD) * EMPLOYER_NIC_RATE;
  const totalEmploymentCost = salary + employerNic;
  const costCoverageMultiple = totalEmploymentCost > 0 ? annualBillings / totalEmploymentCost : 0;
  const ruleOfThirdsSalary = annualBillings / 3;
  return {
    ghrRate,
    rateVsGhrPct,
    rateGap,
    annualBillings,
    employerNic,
    totalEmploymentCost,
    costCoverageMultiple,
    ruleOfThirdsSalary,
  };
}

// ponytail: minimal self-check; run with `npx tsx` if logic changes.
export function _selfCheck(): void {
  const r = calcRateBenchmark({
    grade: "C",
    band: "national-1",
    chargeRate: 185,
    salary: 48000,
    chargeableHours: 1100,
  });
  if (r.ghrRate !== 201) throw new Error("GHR lookup wrong");
  if (r.annualBillings !== 203500) throw new Error("billings wrong");
  if (Math.round(r.employerNic) !== 6450) throw new Error("NIC wrong");
  if (Math.abs(r.costCoverageMultiple - 203500 / 54450) > 1e-9) throw new Error("multiple wrong");
}
