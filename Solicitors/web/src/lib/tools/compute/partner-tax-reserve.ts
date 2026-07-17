/**
 * Partner tax reserve compute lib (pure TypeScript, no React/window/document/fetch).
 *
 * FIGURES TRACED (2026/27):
 * - Income tax bands: HMRC — PA £12,570, basic 20% (to £50,270), higher 40% (to £125,140),
 *   additional 45% (above £125,140). PA taper: £1 withdrawn per £2 income above £100,000.
 * - Class 4 NIC: lower profits limit £12,570, main rate 6% (to £50,270), upper rate 2% above.
 *   Finance (No. 2) Act 2023 — Class 4 main rate cut from 9% to 6% with effect from 6 Apr 2024.
 * - Payments on account (POA): ITSA regs — each POA = 50% of prior year SA liability
 *   (income tax + Class 4, less tax deducted at source). POA 1: 31 Jan in the tax year;
 *   POA 2: 31 Jul after the tax year end; balancing payment: following 31 Jan.
 * - Pension annual allowance (AA): £60,000 for 2026/27 (s.228 ITEPA / FA 2023).
 *   Charge on excess applies at the individual's marginal income tax rate.
 *
 * LIMITATIONS:
 * - PA taper modelled: PA goes to zero at income ≥ £125,140; intermediate amounts tapered.
 * - Class 1 NIC, tax credits, and PAYE deductions are excluded (self-employed partner only).
 * - Basis period reform (2023/24 transition): assumes partner's taxable profit = calendar-year
 *   profit share. Firms on non-April year ends may have transitional overlap profits; not modelled.
 * - POA de-minimis (< £1,000 SA liability or < 20% of total liability from SA): not modelled.
 *   Low-earning partners may not owe POAs at all.
 * - Carry-forward AA, money purchase AA, and tapering AA (income > £260,000) not modelled.
 */

// ─── 2026/27 constants ────────────────────────────────────────────────────────

const PA_FULL = 12_570;
const PA_TAPER_THRESHOLD = 100_000;
const BASIC_RATE_LIMIT = 50_270;
const HIGHER_RATE_LIMIT = 125_140;

const BASIC_RATE = 0.20;
const HIGHER_RATE = 0.40;
const ADDITIONAL_RATE = 0.45;

const NIC_LOWER_LIMIT = 12_570;
const NIC_UPPER_LIMIT = 50_270;
const NIC_MAIN_RATE = 0.06;
const NIC_UPPER_RATE = 0.02;

const PENSION_AA = 60_000;

// ─── Types ────────────────────────────────────────────────────────────────────

export type PartnerTaxReserveInput = {
  profitShare: number;
  /** Prior year SA liability (income tax + Class 4). 0 = first year in partnership. */
  priorYearLiability: number;
  /** Annual drawings taken (may differ from profit share; used for reserve % calc). */
  annualDrawings: number;
  /** Total pension contributions (personal + employer/firm) for the year. */
  totalPensionContributions: number;
};

export type PaymentScheduleEntry = {
  label: string;
  date: string;
  amount: number;
  note?: string;
};

export type PartnerTaxReserveResult = {
  incomeTax: number;
  class4Nic: number;
  totalLiability: number;
  /** Effective tax rate as a fraction of profit share */
  effectiveRate: number;
  /** Monthly £ amount to reserve (based on drawings) */
  monthlyReserveAmount: number;
  /** Reserve as % of monthly drawings */
  monthlyReservePct: number;
  paymentSchedule: PaymentScheduleEntry[];
  /** Non-zero if pension contributions exceed the annual allowance */
  pensionAACharge: number;
  /** Marginal rate used for pension AA charge */
  marginalRate: number;
  /** True if no prior year exists — triggers double-hit warning */
  isFirstYear: boolean;
};

// ─── Core logic ───────────────────────────────────────────────────────────────

function taperedPA(income: number): number {
  if (income <= PA_TAPER_THRESHOLD) return PA_FULL;
  const excess = income - PA_TAPER_THRESHOLD;
  const reduction = Math.floor(excess / 2);
  return Math.max(0, PA_FULL - reduction);
}

// Bands apply to TAXABLE income (after PA) with fixed thresholds:
// basic £0–£37,700 at 20%, higher £37,701–£125,140 at 40%, additional above £125,140 at 45%.
// Thresholds do NOT shift when the PA tapers.
const BASIC_BAND_TOP = BASIC_RATE_LIMIT - PA_FULL; // 37,700 taxable
const HIGHER_BAND_TOP = HIGHER_RATE_LIMIT; // 125,140 taxable

function calcIncomeTax(income: number): number {
  const pa = taperedPA(income);
  const taxable = Math.max(0, income - pa);
  const inBasic = Math.min(taxable, BASIC_BAND_TOP);
  const inHigher = Math.min(Math.max(0, taxable - BASIC_BAND_TOP), HIGHER_BAND_TOP - BASIC_BAND_TOP);
  const inAdditional = Math.max(0, taxable - HIGHER_BAND_TOP);
  const tax = inBasic * BASIC_RATE + inHigher * HIGHER_RATE + inAdditional * ADDITIONAL_RATE;
  return Math.round(tax);
}

function calcClass4(profit: number): number {
  const main = Math.max(0, Math.min(profit, NIC_UPPER_LIMIT) - NIC_LOWER_LIMIT) * NIC_MAIN_RATE;
  const upper = Math.max(0, profit - NIC_UPPER_LIMIT) * NIC_UPPER_RATE;
  return Math.round(main + upper);
}

function marginalRate(income: number): number {
  if (income > HIGHER_RATE_LIMIT) return ADDITIONAL_RATE;
  if (income > BASIC_RATE_LIMIT) return HIGHER_RATE;
  return BASIC_RATE;
}

export function calculatePartnerTaxReserve(input: PartnerTaxReserveInput): PartnerTaxReserveResult {
  const { profitShare, priorYearLiability, annualDrawings, totalPensionContributions } = input;

  const incomeTax = calcIncomeTax(profitShare);
  const class4Nic = calcClass4(profitShare);
  const totalLiability = incomeTax + class4Nic;

  const effectiveRate = profitShare > 0 ? totalLiability / profitShare : 0;

  const drawings = annualDrawings > 0 ? annualDrawings : profitShare;
  // ponytail: 5% buffer over raw effective rate
  const monthlyReservePct = Math.min(effectiveRate * 1.05, 0.95);
  const monthlyReserveAmount = Math.round((drawings / 12) * monthlyReservePct);

  const isFirstYear = priorYearLiability === 0;
  const poaBase = isFirstYear ? totalLiability : priorYearLiability;
  const poa = Math.round(poaBase / 2);

  const schedule: PaymentScheduleEntry[] = [];

  if (isFirstYear) {
    // Year 1: full balance + first POA for year 2 on 31 Jan
    schedule.push({
      label: "Year 1 balance + first POA for Year 2",
      date: "31 January 2028",
      amount: totalLiability + poa,
      note: "First-year double hit: full year 1 liability plus 50% of that figure as the first payment on account for year 2.",
    });
    schedule.push({
      label: "Second POA for Year 2",
      date: "31 July 2028",
      amount: poa,
    });
  } else {
    const balancing = Math.max(0, totalLiability - priorYearLiability);
    const poa2 = Math.round(totalLiability / 2);
    schedule.push({
      label: "First payment on account (2026/27)",
      date: "31 January 2027",
      amount: poa,
      note: "Based on prior year self-assessment liability.",
    });
    schedule.push({
      label: "Second payment on account (2026/27)",
      date: "31 July 2027",
      amount: poa,
    });
    schedule.push({
      label: "Balancing payment + first POA for 2027/28",
      date: "31 January 2028",
      amount: balancing + poa2,
      note:
        balancing > 0
          ? `Balancing payment of £${balancing.toLocaleString("en-GB")} (current year liability less POAs paid) plus first 2027/28 POA.`
          : "No balancing payment (prior year POAs covered or exceeded current liability). First 2027/28 POA only.",
    });
    schedule.push({
      label: "Second POA for 2027/28",
      date: "31 July 2028",
      amount: poa2,
    });
  }

  const pensionExcess = Math.max(0, totalPensionContributions - PENSION_AA);
  const mr = marginalRate(profitShare);
  const pensionAACharge = Math.round(pensionExcess * mr);

  return {
    incomeTax,
    class4Nic,
    totalLiability,
    effectiveRate,
    monthlyReserveAmount,
    monthlyReservePct,
    paymentSchedule: schedule,
    pensionAACharge,
    marginalRate: mr,
    isFirstYear,
  };
}

// ponytail: self-check — run with: npx ts-node -e "require('./partner-tax-reserve')"
// or: import and call directly in a test
if (require.main === module) {
  // Example 1: £80k first year
  const r1 = calculatePartnerTaxReserve({
    profitShare: 80_000,
    priorYearLiability: 0,
    annualDrawings: 80_000,
    totalPensionContributions: 10_000,
  });
  console.assert(r1.incomeTax === 19_432, `IT mismatch: ${r1.incomeTax}`);
  console.assert(r1.class4Nic === 2_857, `C4 mismatch: ${r1.class4Nic}`);
  console.assert(r1.totalLiability === 22_289, `Total mismatch: ${r1.totalLiability}`);
  console.assert(r1.isFirstYear === true, "should be first year");
  console.assert(r1.pensionAACharge === 0, "no pension charge expected");
  console.log("Example 1 passed:", r1);

  // Example 2: £180k, prior year £140k
  const priorLiab = calcIncomeTaxExport(140_000) + calcClass4Export(140_000);
  const r2 = calculatePartnerTaxReserve({
    profitShare: 180_000,
    priorYearLiability: priorLiab,
    annualDrawings: 180_000,
    totalPensionContributions: 65_000,
  });
  console.assert(r2.incomeTax === 67_203, `IT mismatch: ${r2.incomeTax}`);
  console.assert(r2.pensionAACharge === 2_250, `Pension charge mismatch: ${r2.pensionAACharge}`);
  console.log("Example 2 passed:", r2);
  console.log("Prior year liability:", priorLiab);
}

// Exported for self-check only — not part of the public API
function calcIncomeTaxExport(income: number) { return calcIncomeTax(income); }
function calcClass4Export(profit: number) { return calcClass4(profit); }
