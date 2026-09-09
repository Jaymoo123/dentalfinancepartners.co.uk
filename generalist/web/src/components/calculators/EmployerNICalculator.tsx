"use client";

/**
 * Bespoke employer-NI / cost-to-hire calculator.
 *
 * The LOGIC is unchanged and deliberately bespoke: multi-employee payroll rows
 * are payload the generic registry model cannot express (per-employee NI, one
 * Employment Allowance shared across the team, per-employee pension banding).
 *
 * The CHROME is the shared renderer's: same host card, same two-column grid,
 * same navy result panel, same calc_* lifecycle events, so this page stops
 * being the one calculator on the site wearing a different shape.
 */

import { useMemo, useRef, useState } from "react";
import { UK_TAX_RATES as T } from "@/lib/uk-tax-rates";
import { track } from "@accounting-network/web-shared/analytics/track";
import { useInViewOnce } from "@accounting-network/web-shared/analytics/useInViewOnce";

// All employer NI rates and thresholds pulled from lib/uk-tax-rates.ts
// (canonical source, updated annually). Annotated as `number` to widen the
// literal types `as const` infers in the source file.
const SECONDARY_THRESHOLD: number = T.nationalInsurance.employer.secondaryThreshold;
const EMPLOYER_NI_RATE: number = T.nationalInsurance.employer.rate;
const EMPLOYMENT_ALLOWANCE: number = T.nationalInsurance.employer.employmentAllowance;
// Auto-enrolment minimum pension qualifying earnings band lower limit
// (stable since 2014; review annually with The Pensions Regulator).
const PENSION_MIN_QUALIFYING = 6240;
const PENSION_EMPLOYER_MIN_RATE = 0.03;

const SLUG = "employer-ni-calculator";
const EVENT_BASE = { calculator_slug: SLUG, placement: "calculator", tool_kind: "standard" };

type Employee = {
  id: number;
  role: string;
  salary: number;
};

const seedEmployees: Employee[] = [
  { id: 1, role: "Office manager", salary: 38000 },
  { id: 2, role: "Senior bookkeeper", salary: 32000 },
];

const fmt = (n: number) => `£${Math.round(n).toLocaleString("en-GB")}`;

function calcEmployerNi(salary: number): number {
  if (salary <= SECONDARY_THRESHOLD) return 0;
  return (salary - SECONDARY_THRESHOLD) * EMPLOYER_NI_RATE;
}

function calcMinPensionEmployer(salary: number): number {
  if (salary <= PENSION_MIN_QUALIFYING) return 0;
  return (salary - PENSION_MIN_QUALIFYING) * PENSION_EMPLOYER_MIN_RATE;
}

export function EmployerNICalculator({
  resultWrapper = (node) => node,
}: {
  /**
   * Wraps the RESULT COLUMN only, inside the grid cell, so the two-column layout
   * is untouched. Same contract as the shared renderer's prop of the same name:
   * the page passes `(node) => <ResultGate campaign="employer-ni-calculator">`.
   */
  resultWrapper?: (node: React.ReactNode) => React.ReactNode;
} = {}) {
  const [employees, setEmployees] = useState<Employee[]>(seedEmployees);
  const [useEA, setUseEA] = useState(true);
  const [includePension, setIncludePension] = useState(true);
  const interactedRef = useRef(false);
  const computeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const rootRef = useInViewOnce<HTMLDivElement>(() => {
    track("calc_view", EVENT_BASE);
  });

  // Same debounce shape as the shared renderer: one calc_computed per settled
  // burst of edits, calc_result_viewed once on first interaction.
  const onInteract = (fieldId: string) => {
    track("calc_input_change", { ...EVENT_BASE, field_id: fieldId });
    if (!interactedRef.current) {
      interactedRef.current = true;
      track("calc_result_viewed", EVENT_BASE);
    }
    if (computeTimer.current) clearTimeout(computeTimer.current);
    computeTimer.current = setTimeout(() => {
      track("calc_computed", EVENT_BASE);
    }, 800);
  };

  const summary = useMemo(() => {
    const grossSalaryTotal = employees.reduce((sum, e) => sum + e.salary, 0);
    const niPerEmployee = employees.map((e) => calcEmployerNi(e.salary));
    const niTotal = niPerEmployee.reduce((a, b) => a + b, 0);
    const eaApplied = useEA && employees.length >= 2 ? Math.min(EMPLOYMENT_ALLOWANCE, niTotal) : 0;
    const niAfterEA = Math.max(0, niTotal - eaApplied);
    const pensionTotal = includePension
      ? employees.reduce((sum, e) => sum + calcMinPensionEmployer(e.salary), 0)
      : 0;
    const totalEmploymentCost = grossSalaryTotal + niAfterEA + pensionTotal;
    return {
      grossSalaryTotal,
      niTotal,
      eaApplied,
      niAfterEA,
      pensionTotal,
      totalEmploymentCost,
      monthlyTotal: totalEmploymentCost / 12,
      eaEligibleWarning: useEA && employees.length < 2,
    };
  }, [employees, useEA, includePension]);

  function updateEmployee(id: number, patch: Partial<Employee>) {
    setEmployees((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));
    onInteract("employee");
  }

  function addEmployee() {
    const nextId = (employees.at(-1)?.id ?? 0) + 1;
    setEmployees([...employees, { id: nextId, role: "New role", salary: 35000 }]);
    onInteract("add_employee");
  }

  function removeEmployee(id: number) {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
    onInteract("remove_employee");
  }

  return (
    <div ref={rootRef} className="bg-white border-l-4 border-[var(--brand-primary)] p-6 sm:p-8 lg:p-10">
      <div className="mb-6 sm:mb-8">
        <div className="inline-block bg-slate-900 px-3 py-1 text-xs font-bold text-white uppercase tracking-wider mb-2 sm:mb-3">
          Calculator
        </div>
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">
          Employer NI &amp; cost-to-hire calculator
        </h3>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Add each role on your payroll and see the full annual cost: employer NI at 15% above the
          secondary threshold, the Employment Allowance offset, and the minimum auto-enrolment pension.
        </p>
      </div>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-5 sm:space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700">Your team</h4>
            <button
              type="button"
              onClick={addEmployee}
              className="bg-primary-600 px-4 py-2 text-sm font-bold text-white border-b-2 border-primary-800 hover:bg-primary-700 transition-colors"
            >
              + Add employee
            </button>
          </div>

          <div className="space-y-3">
            {employees.map((e) => (
              <div
                key={e.id}
                className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_auto] gap-3 items-end bg-slate-50 p-4 border border-slate-200"
              >
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Role</label>
                  <input
                    type="text"
                    value={e.role}
                    onChange={(ev) => updateEmployee(e.id, { role: ev.target.value })}
                    className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-primary-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Gross salary</label>
                  <div className="flex items-center gap-1">
                    <span className="text-slate-500 text-sm">£</span>
                    <input
                      type="number"
                      value={e.salary}
                      onChange={(ev) =>
                        updateEmployee(e.id, { salary: Math.max(0, Number(ev.target.value) || 0) })
                      }
                      min={0}
                      step={500}
                      className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-primary-600"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeEmployee(e.id)}
                  className="text-rose-700 text-sm hover:underline disabled:opacity-30 disabled:no-underline"
                  disabled={employees.length <= 1}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={useEA}
                onChange={(e) => {
                  setUseEA(e.target.checked);
                  onInteract("employment_allowance");
                }}
                className="mt-1 h-4 w-4 accent-primary-600"
              />
              <span className="text-sm text-slate-700">
                <span className="font-semibold text-slate-900">Apply Employment Allowance</span> (£10,500 off employer NI for 2026/27). Requires at least two employees on the payroll, single-director-only companies do not qualify.
              </span>
            </label>
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={includePension}
                onChange={(e) => {
                  setIncludePension(e.target.checked);
                  onInteract("pension");
                }}
                className="mt-1 h-4 w-4 accent-primary-600"
              />
              <span className="text-sm text-slate-700">
                <span className="font-semibold text-slate-900">Include minimum auto-enrolment pension</span> (3% employer contribution on qualifying earnings)
              </span>
            </label>
          </div>

          {summary.eaEligibleWarning && (
            <p className="text-sm text-amber-800 bg-amber-50 border-l-4 border-amber-500 p-3">
              With only one employee, Employment Allowance has not been applied. Add a second employee or untick the box to remove this warning.
            </p>
          )}
        </div>

        {resultWrapper(
          <div className="bg-slate-900 p-6 sm:p-8 text-white">
            <div className="mb-4 sm:mb-6">
              <div className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-2 text-[var(--brand-primary)]">
                Total annual employment cost
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-mono">
                {fmt(summary.totalEmploymentCost)}
              </div>
              <div className="mt-2 text-xs sm:text-sm text-slate-300 uppercase tracking-wider">
                {fmt(summary.monthlyTotal)} per month across the team
              </div>
            </div>

            <div className="border-t border-slate-700 pt-4 sm:pt-6 space-y-3">
              <ResultRow label="Gross salaries" value={fmt(summary.grossSalaryTotal)} />
              <ResultRow label="Employer NI (gross)" value={fmt(summary.niTotal)} />
              {summary.eaApplied > 0 && (
                <ResultRow label="Less Employment Allowance" value={`-${fmt(summary.eaApplied)}`} />
              )}
              <ResultRow label="Employer NI (net)" value={fmt(summary.niAfterEA)} />
              {includePension && (
                <ResultRow label="Pension (minimum 3% employer)" value={fmt(summary.pensionTotal)} />
              )}
              <ResultRow label="Total employment cost" value={fmt(summary.totalEmploymentCost)} strong />
            </div>

            <div className="mt-5 border-t border-slate-700 pt-4">
              <p className="text-xs text-slate-400 leading-relaxed">
                Does not include employee benefits, software per seat, equipment, training, or recruitment fees. Real all-in cost per hire typically adds 10-20% on top of the figures above.
              </p>
            </div>
          </div>,
        )}
      </div>
    </div>
  );
}

function ResultRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex justify-between items-baseline gap-4">
      <span className="text-xs sm:text-sm text-slate-300">{label}</span>
      <span
        className={`font-semibold font-mono ${strong ? "text-lg sm:text-xl text-white" : "text-base text-slate-200"}`}
      >
        {value}
      </span>
    </div>
  );
}
