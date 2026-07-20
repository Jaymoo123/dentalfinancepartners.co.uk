"use client";

import { useMemo, useState } from "react";

/**
 * UK 2026/27 tax model, salary vs dividend optimiser for a limited company
 * director with no other income.
 *
 * Approach: try every salary value from 0 to a sensible upper bound (£60k)
 * in £10 increments and pick the salary that maximises director net cash,
 * given total available extraction.
 */

const PERSONAL_ALLOWANCE = 12570;
const BASIC_RATE_LIMIT = 50270;
const HIGHER_RATE_LIMIT = 125140;
const NI_PRIMARY_THRESHOLD = 12570;
const NI_SECONDARY_THRESHOLD = 5000;
const EMPLOYEE_NI_BASIC = 0.08;
const EMPLOYER_NI = 0.15;
const INCOME_BASIC = 0.20;
const INCOME_HIGHER = 0.40;
const INCOME_ADDITIONAL = 0.45;
const DIVIDEND_ALLOWANCE = 500;
const DIVIDEND_BASIC = 0.1075; // FA 2026 s.4, from 6 April 2026
const DIVIDEND_HIGHER = 0.3575;
const DIVIDEND_ADDITIONAL = 0.3935;
const CT_SMALL_THRESHOLD = 50000;
const CT_MAIN_THRESHOLD = 250000;
const CT_SMALL_RATE = 0.19;
const CT_MAIN_RATE = 0.25;
const EMPLOYMENT_ALLOWANCE = 10500; // most agencies qualify; one director only company does NOT, assume yes here

type Result = {
  salary: number;
  dividend: number;
  employerNi: number;
  employeeNi: number;
  incomeTax: number;
  dividendTax: number;
  corporationTax: number;
  totalTax: number;
  netCash: number;
};

function calcEmployerNi(salary: number, includeAllowance: boolean): number {
  if (salary <= NI_SECONDARY_THRESHOLD) return 0;
  const liability = (salary - NI_SECONDARY_THRESHOLD) * EMPLOYER_NI;
  const allowance = includeAllowance ? EMPLOYMENT_ALLOWANCE : 0;
  return Math.max(0, liability - allowance);
}

function calcEmployeeNi(salary: number): number {
  if (salary <= NI_PRIMARY_THRESHOLD) return 0;
  // Simplified: only basic NI band considered (the 2% above UEL is rare for most directors at these levels).
  const upperEarningsLimit = 50270;
  const inBand = Math.min(salary, upperEarningsLimit) - NI_PRIMARY_THRESHOLD;
  const above = Math.max(0, salary - upperEarningsLimit);
  return inBand * EMPLOYEE_NI_BASIC + above * 0.02;
}

function calcIncomeTaxOnSalary(salary: number): number {
  let pa = PERSONAL_ALLOWANCE;
  if (salary > 100000) pa = Math.max(0, PERSONAL_ALLOWANCE - (salary - 100000) / 2);
  const taxable = Math.max(0, salary - pa);
  const basic = Math.min(taxable, BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE);
  const higher = Math.max(0, Math.min(taxable - basic, HIGHER_RATE_LIMIT - BASIC_RATE_LIMIT));
  const additional = Math.max(0, taxable - basic - higher);
  return basic * INCOME_BASIC + higher * INCOME_HIGHER + additional * INCOME_ADDITIONAL;
}

function calcDividendTax(salary: number, dividend: number): number {
  // Personal allowance after salary
  let pa = PERSONAL_ALLOWANCE;
  if (salary + dividend > 100000) {
    pa = Math.max(0, PERSONAL_ALLOWANCE - (salary + dividend - 100000) / 2);
  }
  const paUsedBySalary = Math.min(salary, pa);
  const paLeftForDividend = Math.max(0, pa - paUsedBySalary);
  const taxableDividend = Math.max(0, dividend - paLeftForDividend - DIVIDEND_ALLOWANCE);
  if (taxableDividend === 0) return 0;

  const basicBandCapacity = BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE;
  const higherBandCapacity = HIGHER_RATE_LIMIT - BASIC_RATE_LIMIT;
  const salaryInBasic = Math.min(Math.max(0, salary - pa), basicBandCapacity);
  const salaryInHigher = Math.min(
    Math.max(0, salary - pa - salaryInBasic),
    higherBandCapacity,
  );

  const remainingBasic = basicBandCapacity - salaryInBasic;
  const remainingHigher = higherBandCapacity - salaryInHigher;
  let div = taxableDividend;
  let tax = 0;

  const inBasic = Math.min(div, Math.max(0, remainingBasic));
  tax += inBasic * DIVIDEND_BASIC;
  div -= inBasic;

  const inHigher = Math.min(div, Math.max(0, remainingHigher));
  tax += inHigher * DIVIDEND_HIGHER;
  div -= inHigher;

  tax += div * DIVIDEND_ADDITIONAL;
  return tax;
}

function calcCorporationTax(taxableProfit: number): number {
  if (taxableProfit <= 0) return 0;
  if (taxableProfit <= CT_SMALL_THRESHOLD) return taxableProfit * CT_SMALL_RATE;
  if (taxableProfit >= CT_MAIN_THRESHOLD) return taxableProfit * CT_MAIN_RATE;
  // Marginal relief: effective 26.5% on the slice between £50k and £250k.
  const small = CT_SMALL_THRESHOLD * CT_SMALL_RATE;
  const marginal = (taxableProfit - CT_SMALL_THRESHOLD) * 0.265;
  return small + marginal;
}

function modelExtraction(salary: number, profitBeforeDirector: number, useEA: boolean): Result {
  const employerNi = calcEmployerNi(salary, useEA);
  const profitAfterPayroll = profitBeforeDirector - salary - employerNi;
  const corporationTax = calcCorporationTax(Math.max(0, profitAfterPayroll));
  const distributableProfit = Math.max(0, profitAfterPayroll - corporationTax);
  const dividend = distributableProfit;
  const employeeNi = calcEmployeeNi(salary);
  const incomeTax = calcIncomeTaxOnSalary(salary);
  const dividendTax = calcDividendTax(salary, dividend);
  const totalTax = employerNi + corporationTax + employeeNi + incomeTax + dividendTax;
  const netCash = salary - employeeNi - incomeTax + dividend - dividendTax;
  return {
    salary,
    dividend,
    employerNi,
    employeeNi,
    incomeTax,
    dividendTax,
    corporationTax,
    totalTax,
    netCash,
  };
}

function findOptimal(profitBeforeDirector: number, useEA: boolean): Result {
  let best: Result | null = null;
  const maxSalary = Math.min(profitBeforeDirector, 60000);
  for (let s = 0; s <= maxSalary; s += 10) {
    const r = modelExtraction(s, profitBeforeDirector, useEA);
    if (!best || r.netCash > best.netCash) best = r;
  }
  return best!;
}

const fmt = (n: number) => `£${Math.round(n).toLocaleString("en-GB")}`;

export function SalaryDividendCalculator() {
  const [profit, setProfit] = useState(120000);
  const [useEA, setUseEA] = useState(true);

  const optimal = useMemo(() => findOptimal(profit, useEA), [profit, useEA]);
  const salaryOnlyComparison = useMemo(() => {
    const s = Math.min(profit, 60000);
    return modelExtraction(s, profit, useEA);
  }, [profit, useEA]);
  const dividendOnlyComparison = useMemo(() => modelExtraction(0, profit, useEA), [profit, useEA]);

  const optimalVsSalaryOnly = optimal.netCash - salaryOnlyComparison.netCash;
  const optimalVsDividendOnly = optimal.netCash - dividendOnlyComparison.netCash;

  return (
    <div className="space-y-8">
      <div className="bg-slate-50 border border-slate-200 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-slate-900">Your inputs</h2>

        <div className="mt-6">
          <label htmlFor="profit" className="block text-sm font-bold text-slate-900 mb-2">
            Company profit before director extraction
          </label>
          <div className="flex items-center gap-3">
            <span className="text-slate-500">£</span>
            <input
              id="profit"
              type="number"
              value={profit}
              onChange={(e) => setProfit(Math.max(0, Number(e.target.value) || 0))}
              min={0}
              max={5000000}
              step={1000}
              className="w-48 border border-slate-300 px-3 py-2 text-base text-slate-900 focus:outline-none focus:border-indigo-600"
            />
            <span className="text-sm text-slate-500">per year</span>
          </div>
          <input
            type="range"
            value={profit}
            onChange={(e) => setProfit(Number(e.target.value))}
            min={20000}
            max={500000}
            step={1000}
            className="w-full mt-4 accent-indigo-600"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>£20k</span>
            <span>£500k</span>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-3">
          <input
            id="ea"
            type="checkbox"
            checked={useEA}
            onChange={(e) => setUseEA(e.target.checked)}
            className="mt-1 h-4 w-4 accent-indigo-600"
          />
          <label htmlFor="ea" className="text-sm text-slate-700 leading-relaxed">
            <span className="font-semibold text-slate-900">Apply Employment Allowance</span> (£10,500 off employer NI). Most agencies with two or more employees qualify. Single-director companies do not.
          </label>
        </div>
      </div>

      <div className="bg-indigo-700 text-white p-6 sm:p-8">
        <p className="text-sm font-bold uppercase tracking-wider text-indigo-200">Optimal extraction</p>
        <div className="mt-3 grid sm:grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-indigo-200 uppercase tracking-wider">Salary</p>
            <p className="text-3xl sm:text-4xl font-bold font-mono">{fmt(optimal.salary)}</p>
          </div>
          <div>
            <p className="text-xs text-indigo-200 uppercase tracking-wider">Dividend</p>
            <p className="text-3xl sm:text-4xl font-bold font-mono">{fmt(optimal.dividend)}</p>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-indigo-500">
          <p className="text-xs text-indigo-200 uppercase tracking-wider">Director net take-home</p>
          <p className="text-4xl sm:text-5xl font-bold font-mono mt-1">{fmt(optimal.netCash)}</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200">
        <h3 className="px-6 py-4 text-lg font-bold text-slate-900 border-b border-slate-200">
          The tax breakdown
        </h3>
        <dl className="divide-y divide-slate-200">
          <Row label="Corporation tax" value={fmt(optimal.corporationTax)} />
          <Row label="Employer NI" value={fmt(optimal.employerNi)} />
          <Row label="Employee NI" value={fmt(optimal.employeeNi)} />
          <Row label="Income tax (on salary)" value={fmt(optimal.incomeTax)} />
          <Row label="Dividend tax" value={fmt(optimal.dividendTax)} />
          <Row label="Total tax" value={fmt(optimal.totalTax)} highlight />
        </dl>
      </div>

      <div className="bg-white border border-slate-200">
        <h3 className="px-6 py-4 text-lg font-bold text-slate-900 border-b border-slate-200">
          Compared to other strategies
        </h3>
        <dl className="divide-y divide-slate-200">
          <ComparisonRow
            label="vs all-salary extraction"
            diff={optimalVsSalaryOnly}
            netCash={salaryOnlyComparison.netCash}
          />
          <ComparisonRow
            label="vs zero-salary, all-dividend"
            diff={optimalVsDividendOnly}
            netCash={dividendOnlyComparison.netCash}
          />
        </dl>
      </div>
    </div>
  );
}

function Row({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`flex items-center justify-between px-6 py-3 ${highlight ? "bg-slate-50 font-bold" : ""}`}>
      <dt className="text-sm text-slate-700">{label}</dt>
      <dd className="font-mono text-sm text-slate-900">{value}</dd>
    </div>
  );
}

function ComparisonRow({ label, diff, netCash }: { label: string; diff: number; netCash: number }) {
  const positive = diff >= 0;
  return (
    <div className="px-6 py-4">
      <div className="flex items-center justify-between">
        <dt className="text-sm text-slate-700">{label}</dt>
        <dd className={`font-mono text-sm font-bold ${positive ? "text-emerald-700" : "text-rose-700"}`}>
          {positive ? "+" : ""}{Math.round(diff).toLocaleString("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 })}
        </dd>
      </div>
      <p className="mt-1 text-xs text-slate-500">
        That strategy nets {fmt(netCash)}. Optimal nets {fmt(netCash + diff)}.
      </p>
    </div>
  );
}
