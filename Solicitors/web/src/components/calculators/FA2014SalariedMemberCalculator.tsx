"use client";

import { useMemo, useState } from "react";

export function FA2014SalariedMemberCalculator() {
  const [totalReward, setTotalReward] = useState(105000);
  const [fixedReward, setFixedReward] = useState(90000);
  const [capitalContribution, setCapitalContribution] = useState(20000);
  const [hasInfluence, setHasInfluence] = useState(false);

  const result = useMemo(() => {
    const conditionA_ratio = totalReward > 0 ? (fixedReward / totalReward) * 100 : 0;
    const conditionA_met = conditionA_ratio >= 80;
    const conditionB_met = !hasInfluence;
    const conditionC_ratio = fixedReward > 0 ? (capitalContribution / fixedReward) * 100 : 0;
    const conditionC_met = conditionC_ratio < 25;

    const all_met = conditionA_met && conditionB_met && conditionC_met;
    const verdict = all_met ? "EMPLOYEE-FOR-TAX (PAYE applies)" : "PARTNER-FOR-TAX (Class 4 NI on share)";
    const capitalToFixCondC = Math.ceil(fixedReward * 0.25 / 1000) * 1000;
    const additionalCapitalNeeded = Math.max(0, capitalToFixCondC - capitalContribution);

    return {
      conditionA_ratio, conditionA_met,
      conditionB_met,
      conditionC_ratio, conditionC_met,
      all_met, verdict,
      capitalToFixCondC,
      additionalCapitalNeeded,
    };
  }, [totalReward, fixedReward, capitalContribution, hasInfluence]);

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8">
      <h3 className="font-serif text-xl font-semibold text-[var(--ink)]">Your position</h3>
      <div className="mt-5 space-y-4">
        <NumField label="Total annual reward from the LLP (£)" value={totalReward} onChange={setTotalReward} max={2000000} step={1000} placeholder="Fixed + variable + benefits" />
        <NumField label="Fixed / non-profit-dependent reward (£) — 'disguised salary'" value={fixedReward} onChange={setFixedReward} max={2000000} step={1000} placeholder="Reward not contingent on profit" />
        <NumField label="Capital contribution to the LLP (£)" value={capitalContribution} onChange={setCapitalContribution} max={2000000} step={1000} placeholder="Your capital account balance" />
        <div>
          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
            <input type="checkbox" checked={hasInfluence} onChange={(e) => setHasInfluence(e.target.checked)} className="h-4 w-4 accent-[var(--primary)]" />
            <span className="text-sm font-semibold text-[var(--ink)]">
              I have meaningful influence over LLP decisions (management committee, voting on substantive matters)
            </span>
          </label>
        </div>
      </div>

      <div className={`mt-8 rounded-2xl border-l-4 p-5 sm:p-6 ${result.all_met ? "border-red-500 bg-red-50" : "border-emerald-500 bg-emerald-50"}`}>
        <h4 className="font-serif text-lg font-semibold text-[var(--ink)]">Verdict</h4>
        <p className={`mt-2 font-serif text-2xl font-bold sm:text-3xl ${result.all_met ? "text-red-700" : "text-emerald-700"}`}>
          {result.verdict}
        </p>
      </div>

      <div className="mt-6 space-y-3">
        <ConditionRow
          label="Condition A — disguised salary ≥ 80% of total reward"
          value={`${result.conditionA_ratio.toFixed(1)}%`}
          met={result.conditionA_met}
          note={result.conditionA_met ? "Condition A IS met (fails the test)" : "Condition A NOT met (passes)"}
        />
        <ConditionRow
          label="Condition B — limited LLP influence"
          value={hasInfluence ? "You have influence" : "Limited influence"}
          met={result.conditionB_met}
          note={result.conditionB_met ? "Condition B IS met (fails the test)" : "Condition B NOT met (passes)"}
        />
        <ConditionRow
          label="Condition C — capital < 25% of disguised salary"
          value={`${result.conditionC_ratio.toFixed(1)}%`}
          met={result.conditionC_met}
          note={result.conditionC_met ? "Condition C IS met (fails the test)" : "Condition C NOT met (passes)"}
        />
      </div>

      {result.all_met && result.additionalCapitalNeeded > 0 && (
        <div className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 p-5">
          <p className="text-sm font-semibold text-amber-900">Fix to break Condition C:</p>
          <p className="mt-2 text-sm text-amber-900">
            Lift your capital contribution to <strong>£{result.capitalToFixCondC.toLocaleString("en-GB")}</strong> (25% + £1 of disguised salary). That&apos;s additional capital of <strong>£{result.additionalCapitalNeeded.toLocaleString("en-GB")}</strong>. Qualifying loan interest relief under ITA 2007 s.398 makes the borrowing cost deductible.
          </p>
        </div>
      )}

      <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 text-sm leading-relaxed text-[var(--ink-soft)]">
        <p>
          <strong>Notes:</strong> Indicative model of the Finance Act 2014 Salaried Member Rules for LLP members. All three conditions (A + B + C) must be met for the member to be deemed an employee for tax. Failing any single condition keeps the member as partner. Condition C is typically the most flexible defensive lever — capital contribution structuring.
        </p>
        <p className="mt-3">
          This calculator gives a directional read on the FA 2014 position. Real audits consider additional facts: nature of management influence, structure of bonus arrangements, the "disguised salary" classification of any deferred compensation, capital account interest treatment.
        </p>
      </div>
    </div>
  );
}

const inputCls =
  "mt-1 block w-full min-h-12 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3.5 py-3 text-sm text-[var(--ink)] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/25";

function NumField({ label, value, onChange, max, step, placeholder }: { label: string; value: number; onChange: (n: number) => void; max: number; step: number; placeholder?: string }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[var(--ink)]">{label}</label>
      <input type="number" inputMode="numeric" min={0} max={max} step={step} value={value || ""} onChange={(e) => onChange(Math.max(0, Math.min(max, parseInt(e.target.value || "0", 10) || 0)))} placeholder={placeholder} className={inputCls} />
    </div>
  );
}

function ConditionRow({ label, value, met, note }: { label: string; value: string; met: boolean; note: string }) {
  return (
    <div className={`rounded-xl border p-4 ${met ? "border-amber-300 bg-amber-50" : "border-emerald-300 bg-emerald-50"}`}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-semibold text-[var(--ink)]">{label}</p>
        <p className={`text-sm font-bold ${met ? "text-amber-900" : "text-emerald-900"}`}>{value}</p>
      </div>
      <p className={`mt-1 text-xs ${met ? "text-amber-900" : "text-emerald-900"}`}>{note}</p>
    </div>
  );
}
