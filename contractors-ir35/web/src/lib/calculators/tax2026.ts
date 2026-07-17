/**
 * 2026/27 UK tax primitives (rUK: England, Wales, Northern Ireland).
 *
 * Single source of truth for every contractor calculator. Every constant traces
 * to docs/contractors-ir35/house_positions.md (HP-locked 2026-06-12, primary
 * sources gov.uk / legislation.gov.uk / HMRC manuals). Scotland is out of scope.
 *
 * Pure functions only, fully unit-tested in tax2026.test.ts with hand-computed
 * golden values. Do NOT inline tax rates anywhere else; import from here.
 */

// ----- Locked 2026/27 constants (HP §5, §6, §7) -------------------------------
export const TAX_YEAR = "2026/27";

export const PERSONAL_ALLOWANCE = 12570; // HP §5; tapered above £100k, nil at £125,140
export const PA_TAPER_THRESHOLD = 100000;
export const BASIC_RATE_LIMIT = 37700; // taxable income in the 20% band (HRT £50,270 - PA £12,570)
export const ADDITIONAL_RATE_GROSS_THRESHOLD = 125140; // gross income at which the 45% band starts

export const INCOME_TAX = { basic: 0.2, higher: 0.4, additional: 0.45 } as const;

// Dividends 2026/27 (HP §5; FA 2026 s.4)
export const DIVIDEND_ALLOWANCE = 500;
export const DIVIDEND_RATES = { ordinary: 0.1075, upper: 0.3575, additional: 0.3935 } as const;

// National Insurance 2026/27 (HP §6)
export const NI = {
  primaryThreshold: 12570, // employee PT
  upperEarningsLimit: 50270, // employee UEL
  employeeMain: 0.08,
  employeeUpper: 0.02,
  secondaryThreshold: 5000, // employer ST
  employerRate: 0.15,
  employmentAllowance: 10500, // NOT available to a single-director PSC (HP §6/§8)
} as const;

// Apprenticeship Levy: 0.5% of pay bill. Umbrellas (large employers) pass it on,
// so it is funded from the assignment rate in the inside-IR35 / umbrella model.
export const APPRENTICESHIP_LEVY = 0.005;

// Corporation tax FY2026 (HP §7)
export const CT = {
  smallRate: 0.19,
  mainRate: 0.25,
  lowerLimit: 50000,
  upperLimit: 250000,
  marginalFraction: 3 / 200,
} as const;

// ----- Primitives -------------------------------------------------------------

/** Personal allowance after the £100k taper (£1 lost per £2 over £100k). HP §5. */
export function personalAllowance(adjustedNetIncome: number): number {
  if (adjustedNetIncome <= PA_TAPER_THRESHOLD) return PERSONAL_ALLOWANCE;
  const taper = (adjustedNetIncome - PA_TAPER_THRESHOLD) / 2;
  return Math.max(0, PERSONAL_ALLOWANCE - taper);
}

/** Employee primary Class 1 NIC on an annual salary. HP §6. */
export function employeeNI(salary: number): number {
  const main =
    Math.min(Math.max(salary - NI.primaryThreshold, 0), NI.upperEarningsLimit - NI.primaryThreshold) *
    NI.employeeMain;
  const upper = Math.max(salary - NI.upperEarningsLimit, 0) * NI.employeeUpper;
  return main + upper;
}

/** Employer secondary Class 1 NIC on an annual salary. Single-director PSC cannot claim EA. HP §6/§8. */
export function employerNI(salary: number, opts: { employmentAllowance?: boolean } = {}): number {
  let ni = Math.max(salary - NI.secondaryThreshold, 0) * NI.employerRate;
  if (opts.employmentAllowance) ni = Math.max(0, ni - NI.employmentAllowance);
  return ni;
}

/** Corporation tax with marginal relief between £50k and £250k (limits / n associated). HP §7. */
export function corporationTax(profit: number, opts: { associated?: number } = {}): number {
  if (profit <= 0) return 0;
  const n = (opts.associated ?? 0) + 1;
  const lower = CT.lowerLimit / n;
  const upper = CT.upperLimit / n;
  if (profit <= lower) return profit * CT.smallRate;
  if (profit >= upper) return profit * CT.mainRate;
  return profit * CT.mainRate - CT.marginalFraction * (upper - profit);
}

export interface PersonalTaxResult {
  personalAllowance: number;
  incomeTaxOnSalary: number;
  dividendTax: number;
  employeeNI: number;
  /** income tax (salary) + dividend tax + employee NIC */
  totalPersonalTax: number;
}

/**
 * Personal tax for a director taking `salary` (non-dividend earnings) and
 * `dividends`, 2026/27 rUK. Dividends stack on top of salary in their own bands;
 * the £500 dividend allowance is 0%-rated but still consumes band space. HP §5.
 */
export function personalTax(salary: number, dividends: number): PersonalTaxResult {
  const ani = salary + dividends;
  const pa = personalAllowance(ani);

  const paToSalary = Math.min(salary, pa);
  const paToDividends = Math.min(Math.max(pa - salary, 0), dividends);

  // Additional-rate threshold in taxable-income terms. Fixed £125,140 gross minus
  // whatever PA survives the taper (nil above £125,140), never below the basic limit.
  const additionalTaxable = Math.max(BASIC_RATE_LIMIT, ADDITIONAL_RATE_GROSS_THRESHOLD - pa);

  // Income tax on salary (non-dividend), in taxable-income bands.
  const salaryTaxable = salary - paToSalary;
  const sBasic = Math.min(salaryTaxable, BASIC_RATE_LIMIT);
  const sHigher = Math.min(Math.max(salaryTaxable - BASIC_RATE_LIMIT, 0), additionalTaxable - BASIC_RATE_LIMIT);
  const sAdditional = Math.max(salaryTaxable - additionalTaxable, 0);
  const incomeTaxOnSalary =
    sBasic * INCOME_TAX.basic + sHigher * INCOME_TAX.higher + sAdditional * INCOME_TAX.additional;

  // Dividends taxed on top, starting from the band position salary already used.
  const divTaxable = dividends - paToDividends;
  const pos = salaryTaxable;
  const basicRoom = Math.max(0, BASIC_RATE_LIMIT - pos);
  const higherRoom = Math.max(0, additionalTaxable - Math.max(pos, BASIC_RATE_LIMIT));
  let dBasic = Math.min(divTaxable, basicRoom);
  let dHigher = Math.min(divTaxable - dBasic, higherRoom);
  let dAdditional = divTaxable - dBasic - dHigher;

  // £500 dividend allowance: 0%-rated, applied from the lowest band up.
  let allowance = DIVIDEND_ALLOWANCE;
  const aBasic = Math.min(allowance, dBasic);
  dBasic -= aBasic;
  allowance -= aBasic;
  const aHigher = Math.min(allowance, dHigher);
  dHigher -= aHigher;
  allowance -= aHigher;
  const aAdditional = Math.min(allowance, dAdditional);
  dAdditional -= aAdditional;

  const dividendTax =
    dBasic * DIVIDEND_RATES.ordinary + dHigher * DIVIDEND_RATES.upper + dAdditional * DIVIDEND_RATES.additional;

  const eni = employeeNI(salary);

  return {
    personalAllowance: pa,
    incomeTaxOnSalary,
    dividendTax,
    employeeNI: eni,
    totalPersonalTax: incomeTaxOnSalary + dividendTax + eni,
  };
}

export interface LimitedTakeHome {
  turnover: number;
  salary: number;
  employerNI: number;
  expenses: number;
  profitBeforeTax: number;
  corporationTax: number;
  dividends: number;
  incomeTaxOnSalary: number;
  employeeNI: number;
  dividendTax: number;
  netTakeHome: number;
  retentionPct: number;
}

/**
 * Outside-IR35 limited-company take-home: turnover -> salary + employer NIC +
 * expenses -> profit -> CT -> dividends -> personal tax -> net. All reserves
 * distributed as dividends (no retained profit). Single-director PSC (no EA).
 */
export function limitedTakeHome(opts: {
  turnover: number;
  salary?: number;
  expenses?: number;
  employmentAllowance?: boolean;
  associated?: number;
}): LimitedTakeHome {
  const turnover = opts.turnover;
  const salary = opts.salary ?? PERSONAL_ALLOWANCE;
  const expenses = opts.expenses ?? 0;
  const eni = employerNI(salary, { employmentAllowance: opts.employmentAllowance });
  const profitBeforeTax = Math.max(0, turnover - salary - eni - expenses);
  const ct = corporationTax(profitBeforeTax, { associated: opts.associated });
  const dividends = Math.max(0, profitBeforeTax - ct);
  const pt = personalTax(salary, dividends);
  const netTakeHome = salary + dividends - pt.totalPersonalTax;
  return {
    turnover,
    salary,
    employerNI: eni,
    expenses,
    profitBeforeTax,
    corporationTax: ct,
    dividends,
    incomeTaxOnSalary: pt.incomeTaxOnSalary,
    employeeNI: pt.employeeNI,
    dividendTax: pt.dividendTax,
    netTakeHome,
    retentionPct: turnover > 0 ? (netTakeHome / turnover) * 100 : 0,
  };
}

export interface UmbrellaTakeHome {
  assignmentIncome: number;
  umbrellaMargin: number;
  grossSalary: number;
  employerNI: number;
  apprenticeshipLevy: number;
  incomeTax: number;
  employeeNI: number;
  netTakeHome: number;
  retentionPct: number;
}

/**
 * Inside-IR35 / umbrella take-home: from the assignment rate the umbrella margin,
 * employer NIC and apprenticeship levy come out first (HP §12), leaving the gross
 * salary that PAYE income tax + employee NIC are charged on. Solves the employer-
 * cost circularity: pot = salary*(1 + employerRate + levy) - employerRate*ST.
 */
export function umbrellaTakeHome(opts: {
  assignmentIncome: number;
  umbrellaMargin?: number;
}): UmbrellaTakeHome {
  const assignmentIncome = opts.assignmentIncome;
  const margin = opts.umbrellaMargin ?? 0;
  const pot = Math.max(0, assignmentIncome - margin);
  const grossSalary =
    (pot + NI.employerRate * NI.secondaryThreshold) / (1 + NI.employerRate + APPRENTICESHIP_LEVY);
  const eni = employerNI(grossSalary); // single employer, no EA in the umbrella model
  const levy = grossSalary * APPRENTICESHIP_LEVY;
  const pt = personalTax(grossSalary, 0);
  const netTakeHome = grossSalary - pt.incomeTaxOnSalary - pt.employeeNI;
  return {
    assignmentIncome,
    umbrellaMargin: margin,
    grossSalary,
    employerNI: eni,
    apprenticeshipLevy: levy,
    incomeTax: pt.incomeTaxOnSalary,
    employeeNI: pt.employeeNI,
    netTakeHome,
    retentionPct: assignmentIncome > 0 ? (netTakeHome / assignmentIncome) * 100 : 0,
  };
}
