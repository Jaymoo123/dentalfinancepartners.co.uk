/**
 * Solicitor hourly rate & salary benchmark compute lib (pure TypeScript, no React/window/document/fetch).
 *
 * FIGURES TRACED:
 * - Guideline Hourly Rates (GHR): figures effective 1 January 2025, published by the
 *   Civil Justice Council / judiciary.uk (SPPI-uprated from the 1 January 2024 table).
 *   FLAGGED FOR VERIFICATION against the current judiciary.uk table before deploy.
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

// GHR effective 1 January 2025 (£/hour). FLAG: verify against current judiciary.uk table.
export const GHR_2025: Record<GhrBand, Record<Grade, number>> = {
  "london-1": { A: 566, B: 385, C: 299, D: 205 },
  "london-2": { A: 413, B: 319, C: 269, D: 198 },
  "london-3": { A: 312, B: 246, C: 197, D: 146 },
  "national-1": { A: 288, B: 242, C: 196, D: 151 },
  "national-2": { A: 255, B: 218, C: 178, D: 131 },
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
  const ghrRate = GHR_2025[band][grade];
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
  if (r.ghrRate !== 196) throw new Error("GHR lookup wrong");
  if (r.annualBillings !== 203500) throw new Error("billings wrong");
  if (Math.round(r.employerNic) !== 6450) throw new Error("NIC wrong");
  if (Math.abs(r.costCoverageMultiple - 203500 / 54450) > 1e-9) throw new Error("multiple wrong");
}
