"use client";

import { useMemo, useState } from "react";

const PERSONAL_ALLOWANCE = 12570;
const BASIC_RATE_LIMIT = 50270;
const HIGHER_RATE_LIMIT = 125140;
const CLASS4_LOWER = 12570;
const CLASS4_UPPER = 50270;
const NI_PRIMARY = 12570;
const NI_SECONDARY = 9100;
const EMPLOYEE_NI_BASIC = 0.08;
const EMPLOYER_NI = 0.15;
const INCOME_BASIC = 0.20;
const INCOME_HIGHER = 0.40;
const INCOME_ADDITIONAL = 0.45;
const DIVIDEND_ALLOWANCE = 500;
const DIVIDEND_BASIC = 0.0875;
const DIVIDEND_HIGHER = 0.3375;
const DIVIDEND_ADDITIONAL = 0.3935;
const CT_SMALL_THRESHOLD = 50000;
const CT_MAIN_RATE = 0.25;
const CT_SMALL_RATE = 0.19;

function calcIncomeTax(taxable: number): number {
  let pa = PERSONAL_ALLOWANCE;
  if (taxable > 100000) pa = Math.max(0, PERSONAL_ALLOWANCE - (taxable - 100000) / 2);
  const t = Math.max(0, taxable - pa);
  const basic = Math.min(t, BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE);
  const higher = Math.max(0, Math.min(t - basic, HIGHER_RATE_LIMIT - BASIC_RATE_LIMIT));
  const additional = Math.max(0, t - basic - higher);
  return basic * INCOME_BASIC + higher * INCOME_HIGHER + additional * INCOME_ADDITIONAL;
}

function calcClass4(profit: number): number {
  if (profit <= CLASS4_LOWER) return 0;
  const lower = Math.min(profit, CLASS4_UPPER) - CLASS4_LOWER;
  const upper = Math.max(0, profit - CLASS4_UPPER);
  return lower * 0.06 + upper * 0.02;
}

function calcEmployerNi(salary: number): number {
  if (salary <= NI_SECONDARY) return 0;
  return (salary - NI_SECONDARY) * EMPLOYER_NI;
}

function calcEmployeeNi(salary: number): number {
  if (salary <= NI_PRIMARY) return 0;
  const upperEl = 50270;
  const inBand = Math.min(salary, upperEl) - NI_PRIMARY;
  const above = Math.max(0, salary - upperEl);
  return inBand * EMPLOYEE_NI_BASIC + above * 0.02;
}

function calcCorporationTax(profit: number): number {
  if (profit <= 0) return 0;
  if (profit <= CT_SMALL_THRESHOLD) return profit * CT_SMALL_RATE;
  if (profit >= 250000) return profit * CT_MAIN_RATE;
  const small = CT_SMALL_THRESHOLD * CT_SMALL_RATE;
  const marginal = (profit - CT_SMALL_THRESHOLD) * 0.265;
  return small + marginal;
}

function calcDividendTax(salary: number, dividend: number): number {
  let pa = PERSONAL_ALLOWANCE;
  if (salary + dividend > 100000) pa = Math.max(0, PERSONAL_ALLOWANCE - (salary + dividend - 100000) / 2);
  const paUsedBySalary = Math.min(salary, pa);
  const paLeftForDividend = Math.max(0, pa - paUsedBySalary);
  const taxableDividend = Math.max(0, dividend - paLeftForDividend - DIVIDEND_ALLOWANCE);
  if (taxableDividend === 0) return 0;
  const basicBand = BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE;
  const higherBand = HIGHER_RATE_LIMIT - BASIC_RATE_LIMIT;
  const salaryInBasic = Math.min(Math.max(0, salary - pa), basicBand);
  const salaryInHigher = Math.min(Math.max(0, salary - pa - salaryInBasic), higherBand);
  const remBasic = basicBand - salaryInBasic;
  const remHigher = higherBand - salaryInHigher;
  let div = taxableDividend;
  let tax = 0;
  const inBasic = Math.min(div, Math.max(0, remBasic));
  tax += inBasic * DIVIDEND_BASIC;
  div -= inBasic;
  const inHigher = Math.min(div, Math.max(0, remHigher));
  tax += inHigher * DIVIDEND_HIGHER;
  div -= inHigher;
  tax += div * DIVIDEND_ADDITIONAL;
  return tax;
}

export function SolicitorTakeHomeCalculator() {
  const [profit, setProfit] = useState(150000);
  const [pensionContrib, setPensionContrib] = useState(0);

  const result = useMemo(() => {
    // Partnership / LLP: same tax treatment (Class 4 NI + income tax on profit share)
    const partnerIncomeTax = calcIncomeTax(profit - pensionContrib);
    const partnerClass4 = calcClass4(Math.max(0, profit - pensionContrib));
    const partnershipNet = (profit - partnerIncomeTax - partnerClass4) + 0; // pension contribution is personal, comes back as net of relief at marginal rate (already factored by reducing taxable)

    // Sole trader = partnership tax-wise
    const soleTraderNet = partnershipNet;

    // Limited company
    const ltdSalary = 12570;
    const ltdEmployerNi = calcEmployerNi(ltdSalary);
    const ltdProfitAfterSalary = Math.max(0, profit - ltdSalary - ltdEmployerNi - pensionContrib);
    const ltdCt = calcCorporationTax(ltdProfitAfterSalary);
    const ltdAfterCt = ltdProfitAfterSalary - ltdCt;
    const ltdDividend = Math.max(0, ltdAfterCt);
    const ltdSalaryTax = calcIncomeTax(ltdSalary);
    const ltdEmployeeNi = calcEmployeeNi(ltdSalary);
    const ltdDividendTax = calcDividendTax(ltdSalary, ltdDividend);
    const ltdAdminCost = 2500;
    const ltdNet = ltdSalary - ltdSalaryTax - ltdEmployeeNi + (ltdDividend - ltdDividendTax) - ltdAdminCost;

    return {
      partnership: { net: partnershipNet, tax: partnerIncomeTax + partnerClass4 },
      soleTrader: { net: soleTraderNet, tax: partnerIncomeTax + partnerClass4 },
      ltd: { net: ltdNet, tax: ltdSalaryTax + ltdEmployeeNi + ltdEmployerNi + ltdCt + ltdDividendTax + ltdAdminCost },
    };
  }, [profit, pensionContrib]);

  const winner = [
    { name: "Sole Trader", net: result.soleTrader.net },
    { name: "Partnership / LLP", net: result.partnership.net },
    { name: "Limited Company", net: result.ltd.net },
  ].sort((a, b) => b.net - a.net)[0];

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8">
      <h3 className="font-serif text-xl font-semibold text-[var(--ink)]">Your inputs</h3>
      <div className="mt-5 space-y-4">
        <NumField label="Profit available for extraction (£)" value={profit} onChange={setProfit} max={2000000} step={1000} placeholder="e.g. 150000" />
        <NumField label="Personal pension contribution (£/yr)" value={pensionContrib} onChange={setPensionContrib} max={60000} step={500} placeholder="e.g. 20000" />
      </div>

      <div className="mt-8 rounded-2xl border-l-4 border-[var(--primary)] bg-[var(--primary)]/5 p-5 sm:p-6">
        <h4 className="font-serif text-lg font-semibold text-[var(--ink)]">On your figures, {winner.name} wins</h4>
        <p className="mt-2 font-serif text-3xl font-bold text-[var(--primary)]">£{Math.round(winner.net).toLocaleString("en-GB")}</p>
        <p className="mt-2 text-sm text-[var(--ink-soft)]">Annual net take-home under the winning structure.</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <StructureTile name="Sole Trader" data={result.soleTrader} winner={winner.name === "Sole Trader"} note="Class 4 NI + income tax on profit" />
        <StructureTile name="Partnership / LLP" data={result.partnership} winner={winner.name === "Partnership / LLP"} note="Same tax treatment as sole trader" />
        <StructureTile name="Limited Company" data={result.ltd} winner={winner.name === "Limited Company"} note="Corp tax + dividend tax + admin" />
      </div>

      <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 text-sm leading-relaxed text-[var(--ink-soft)]">
        <p>
          <strong>Notes:</strong> Indicative UK 2025/26 model. Partnership and LLP are functionally identical for tax (both tax-transparent — members taxed personally on share). Ltd-co assumes £12,570 salary + remainder as dividend, £2,500 admin cost, no Employment Allowance. Pension contribution treated as deductible from taxable income.
        </p>
        <p className="mt-3">
          The headline tax efficiency of Ltd over partnership/LLP is smaller than commonly believed at 2025/26 rates. The real reasons to incorporate (retained earnings for reinvestment, multiple shareholders, share-sale-friendly future exit, BADR on shares) usually outweigh the headline tax saving — which itself is modest.
        </p>
        <p className="mt-3">
          For senior solicitors making the equity-vs-fee-share decision, see the <a href="/solicitor-guides/fee-share-vs-equity-partner" className="text-[var(--primary)] underline">fee-share vs equity partner</a> pillar guide.
        </p>
      </div>
    </div>
  );
}

const inputCls = "mt-1 block w-full min-h-12 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3.5 py-3 text-sm text-[var(--ink)] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/25";

function NumField({ label, value, onChange, max, step, placeholder }: { label: string; value: number; onChange: (n: number) => void; max: number; step: number; placeholder?: string }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[var(--ink)]">{label}</label>
      <input type="number" inputMode="numeric" min={0} max={max} step={step} value={value || ""} onChange={(e) => onChange(Math.max(0, Math.min(max, parseInt(e.target.value || "0", 10) || 0)))} placeholder={placeholder} className={inputCls} />
    </div>
  );
}

function StructureTile({ name, data, winner, note }: { name: string; data: { net: number; tax: number }; winner: boolean; note: string }) {
  return (
    <div className={`rounded-xl border p-5 ${winner ? "border-[var(--primary)] bg-[var(--primary)]/5" : "border-[var(--border)] bg-[var(--surface)]"}`}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-[var(--ink)]">{name}</p>
        {winner && (
          <span className="rounded-full bg-[var(--primary)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">Best</span>
        )}
      </div>
      <p className="mt-3 font-serif text-2xl font-semibold text-[var(--ink)]">£{Math.round(data.net).toLocaleString("en-GB")}</p>
      <p className="mt-1 text-xs text-[var(--ink-soft)]">net of all tax + admin</p>
      <p className="mt-2 text-xs text-[var(--muted)]">{note}</p>
    </div>
  );
}
