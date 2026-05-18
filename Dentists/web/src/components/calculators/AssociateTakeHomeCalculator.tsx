"use client";

import { useMemo, useState } from "react";

const PERSONAL_ALLOWANCE = 12570;
const BASIC_RATE_LIMIT = 50270;
const HIGHER_RATE_LIMIT = 125140;
const CLASS4_LOWER = 12570;
const CLASS4_UPPER = 50270;
const CLASS4_RATE_LOWER = 0.06;
const CLASS4_RATE_UPPER = 0.02;
const INCOME_BASIC = 0.20;
const INCOME_HIGHER = 0.40;
const INCOME_ADDITIONAL = 0.45;
const CLASS2_WEEKLY = 3.45;

function calcIncomeTax(taxable: number): number {
  let pa = PERSONAL_ALLOWANCE;
  if (taxable > 100000) {
    pa = Math.max(0, PERSONAL_ALLOWANCE - (taxable - 100000) / 2);
  }
  const t = Math.max(0, taxable - pa);
  const basic = Math.min(t, BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE);
  const higher = Math.max(0, Math.min(t - basic, HIGHER_RATE_LIMIT - BASIC_RATE_LIMIT));
  const additional = Math.max(0, t - basic - higher);
  return basic * INCOME_BASIC + higher * INCOME_HIGHER + additional * INCOME_ADDITIONAL;
}

function calcClass4(profit: number): number {
  if (profit <= CLASS4_LOWER) return 0;
  const inLower = Math.min(profit, CLASS4_UPPER) - CLASS4_LOWER;
  const inUpper = Math.max(0, profit - CLASS4_UPPER);
  return inLower * CLASS4_RATE_LOWER + inUpper * CLASS4_RATE_UPPER;
}

export function AssociateTakeHomeCalculator() {
  const [grossFees, setGrossFees] = useState(120000);
  const [associatePct, setAssociatePct] = useState(50);
  const [labPct, setLabPct] = useState(5);
  const [expenses, setExpenses] = useState(8000);
  const [pensionContribution, setPensionContribution] = useState(6500);

  const result = useMemo(() => {
    const associateShare = grossFees * (associatePct / 100);
    const lab = grossFees * (labPct / 100) * (associatePct / 100);
    const afterLab = associateShare - lab;
    const profit = Math.max(0, afterLab - expenses);
    const nhsPensionEstimate = pensionContribution;
    const taxableProfit = profit - nhsPensionEstimate;
    const incomeTax = calcIncomeTax(taxableProfit);
    const class4Ni = calcClass4(Math.max(0, taxableProfit));
    const class2Ni = profit > 6725 ? 52 * CLASS2_WEEKLY : 0;
    const totalTax = incomeTax + class4Ni + class2Ni;
    const netCash = taxableProfit - totalTax;
    return {
      associateShare,
      lab,
      profit,
      taxableProfit,
      incomeTax,
      class4Ni,
      class2Ni,
      totalTax,
      netCash,
      effectiveRate: profit > 0 ? (totalTax / profit) * 100 : 0,
    };
  }, [grossFees, associatePct, labPct, expenses, pensionContribution]);

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8">
      <h3 className="font-serif text-xl font-semibold text-[var(--ink)]">Your inputs</h3>
      <div className="mt-5 space-y-4">
        <NumField
          label="Gross fees you generate at the practice (£/yr)"
          value={grossFees}
          onChange={setGrossFees}
          max={500000}
          step={1000}
          placeholder="e.g. 120000"
        />
        <NumField
          label="Your associate fee split (%)"
          value={associatePct}
          onChange={setAssociatePct}
          max={100}
          step={1}
          placeholder="e.g. 50"
        />
        <NumField
          label="Lab fee deduction (% of gross)"
          value={labPct}
          onChange={setLabPct}
          max={20}
          step={0.5}
          placeholder="e.g. 5"
        />
        <NumField
          label="Other deductible expenses (indemnity, CPD, GDC, motor) (£/yr)"
          value={expenses}
          onChange={setExpenses}
          max={50000}
          step={250}
          placeholder="e.g. 8000"
        />
        <NumField
          label="NHS Pension contribution (£/yr)"
          value={pensionContribution}
          onChange={setPensionContribution}
          max={50000}
          step={250}
          placeholder="e.g. 6500"
        />
      </div>

      <div className="mt-8 rounded-2xl border-l-4 border-[var(--gold)] bg-[var(--gold-soft)] p-5 sm:p-6">
        <h4 className="font-serif text-lg font-semibold text-[var(--ink)]">
          Estimated annual take-home
        </h4>
        <p className="mt-2 font-serif text-4xl font-bold text-[var(--gold-strong)]">
          £{Math.round(result.netCash).toLocaleString("en-GB")}
        </p>
        <p className="mt-2 text-sm text-[var(--ink-soft)]">
          After income tax + Class 2/4 NI + pension. Effective rate: {result.effectiveRate.toFixed(1)}%.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <StatTile label="Associate share before lab" value={`£${Math.round(result.associateShare).toLocaleString("en-GB")}`} />
        <StatTile label="Lab fee deduction" value={`£${Math.round(result.lab).toLocaleString("en-GB")}`} />
        <StatTile label="Taxable profit" value={`£${Math.round(result.taxableProfit).toLocaleString("en-GB")}`} />
        <StatTile label="Income tax" value={`£${Math.round(result.incomeTax).toLocaleString("en-GB")}`} />
        <StatTile label="Class 4 NI" value={`£${Math.round(result.class4Ni).toLocaleString("en-GB")}`} />
        <StatTile label="Class 2 NI" value={`£${Math.round(result.class2Ni).toLocaleString("en-GB")}`} />
      </div>

      <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 text-sm leading-relaxed text-[var(--ink-soft)]">
        <p>
          <strong>Notes:</strong> Estimate uses UK 2025/26 income tax bands and NI rates for sole-trader associates. Class 2 NI applied where profits exceed £6,725. NHS Pension contribution treated as deductible from taxable profit (it is, via the practitioner pensions arrangement). Does not include student loan repayments, Marriage Allowance, or other personal reliefs.
        </p>
        <p className="mt-3">
          This is directional only — for a Ltd-co associate, IR35 status affects extractable amount materially. Book a scoping call for accurate modelling on your actual position.
        </p>
      </div>
    </div>
  );
}

const inputCls =
  "mt-1 block w-full min-h-12 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3.5 py-3 text-sm text-[var(--ink)] focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/25";

function NumField({
  label,
  value,
  onChange,
  max,
  step,
  placeholder,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  max: number;
  step: number;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[var(--ink)]">{label}</label>
      <input
        type="number"
        inputMode="decimal"
        min={0}
        max={max}
        step={step}
        value={value || ""}
        onChange={(e) =>
          onChange(Math.max(0, Math.min(max, parseFloat(e.target.value || "0") || 0)))
        }
        placeholder={placeholder}
        className={inputCls}
      />
    </div>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
        {label}
      </p>
      <p className="mt-2 font-serif text-lg font-semibold text-[var(--ink)]">{value}</p>
    </div>
  );
}
