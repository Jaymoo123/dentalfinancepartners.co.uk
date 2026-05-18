"use client";

import { useMemo, useState } from "react";

type PracticeArea = "conveyancing-heavy" | "mixed" | "commercial" | "private-client" | "litigation" | "criminal";
type ClaimsHistory = "none-5y" | "minor-claim" | "moderate-claim" | "major-claim";

const PRACTICE_BASE_RATE: Record<PracticeArea, number> = {
  "conveyancing-heavy": 0.025,
  "mixed": 0.015,
  "commercial": 0.008,
  "private-client": 0.007,
  "litigation": 0.012,
  "criminal": 0.010,
};

const CLAIMS_MULTIPLIER: Record<ClaimsHistory, number> = {
  "none-5y": 1.0,
  "minor-claim": 1.25,
  "moderate-claim": 1.75,
  "major-claim": 3.0,
};

export function IndemnityPremiumCalculator() {
  const [grossFees, setGrossFees] = useState(2000000);
  const [practiceArea, setPracticeArea] = useState<PracticeArea>("mixed");
  const [claimsHistory, setClaimsHistory] = useState<ClaimsHistory>("none-5y");
  const [feeEarnerCount, setFeeEarnerCount] = useState(10);
  const [coverLevel, setCoverLevel] = useState(5);

  const result = useMemo(() => {
    const baseRate = PRACTICE_BASE_RATE[practiceArea];
    const claimsMult = CLAIMS_MULTIPLIER[claimsHistory];
    const coverMultiplier = coverLevel <= 2 ? 1.0 : coverLevel <= 5 ? 1.2 : coverLevel <= 10 ? 1.5 : 2.0;
    const size_penalty = feeEarnerCount > 20 ? 1.1 : 1.0;
    const indicativePremium = grossFees * baseRate * claimsMult * coverMultiplier * size_penalty;
    const low = indicativePremium * 0.8;
    const high = indicativePremium * 1.4;
    return { indicativePremium, low, high };
  }, [grossFees, practiceArea, claimsHistory, feeEarnerCount, coverLevel]);

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8">
      <h3 className="font-serif text-xl font-semibold text-[var(--ink)]">Your firm</h3>
      <div className="mt-5 space-y-4">
        <NumField label="Annual gross fee income (£)" value={grossFees} onChange={setGrossFees} max={50000000} step={50000} />
        <SelectField label="Primary practice area" value={practiceArea} onChange={(v) => setPracticeArea(v as PracticeArea)}>
          <option value="conveyancing-heavy">Conveyancing-heavy (50%+ conveyancing)</option>
          <option value="mixed">Mixed practice</option>
          <option value="commercial">Commercial / corporate</option>
          <option value="private-client">Private client (wills, probate, trusts)</option>
          <option value="litigation">Litigation (commercial or general)</option>
          <option value="criminal">Criminal law</option>
        </SelectField>
        <SelectField label="Claims history (last 5 years)" value={claimsHistory} onChange={(v) => setClaimsHistory(v as ClaimsHistory)}>
          <option value="none-5y">No claims in 5 years</option>
          <option value="minor-claim">Minor claim (settled under £25k)</option>
          <option value="moderate-claim">Moderate claim (£25k-£250k)</option>
          <option value="major-claim">Major claim (£250k+)</option>
        </SelectField>
        <NumField label="Fee-earner count" value={feeEarnerCount} onChange={setFeeEarnerCount} max={500} step={1} />
        <SelectField label="Cover level (£m, sized)" value={String(coverLevel)} onChange={(v) => setCoverLevel(parseInt(v, 10))}>
          <option value="2">£2m (MTC minimum, unincorporated)</option>
          <option value="3">£3m (MTC minimum, incorporated)</option>
          <option value="5">£5m</option>
          <option value="10">£10m</option>
          <option value="20">£20m+</option>
        </SelectField>
      </div>

      <div className="mt-8 rounded-2xl border-l-4 border-[var(--primary)] bg-[var(--primary)]/5 p-5 sm:p-6">
        <h4 className="font-serif text-lg font-semibold text-[var(--ink)]">Indicative annual premium</h4>
        <p className="mt-2 font-serif text-3xl font-bold text-[var(--primary)] sm:text-4xl">
          £{Math.round(result.low).toLocaleString("en-GB")} – £{Math.round(result.high).toLocaleString("en-GB")}
        </p>
        <p className="mt-2 text-sm text-[var(--ink-soft)]">
          Mid-point: £{Math.round(result.indicativePremium).toLocaleString("en-GB")}. Premium tax-deductible as trade expense.
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 text-sm leading-relaxed text-[var(--ink-soft)]">
        <p>
          <strong>Notes:</strong> Indicative model based on UK 2025/26 market rates. Actual premiums depend on the underwriter&apos;s view of the specific firm: AML controls, supervision quality, file management discipline, and the underwriter&apos;s appetite for the practice area.
        </p>
        <p className="mt-3">
          Conveyancing-heavy firms command higher rates due to claims frequency: fraud risk, fund misdirection, registration errors. A single significant claim can double next year&apos;s premium. Specialist brokers (those with strong solicitor PII books) often deliver 10-25% better than generalists.
        </p>
        <p className="mt-3">
          PII premiums are an allowable trade expense for the firm. Self-insured excess and deductibles paid on claims are similarly deductible. Insurance premium is VAT-exempt (no input VAT to reclaim).
        </p>
      </div>
    </div>
  );
}

const inputCls = "mt-1 block w-full min-h-12 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3.5 py-3 text-sm text-[var(--ink)] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/25";

function NumField({ label, value, onChange, max, step }: { label: string; value: number; onChange: (n: number) => void; max: number; step: number }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[var(--ink)]">{label}</label>
      <input type="number" inputMode="numeric" min={0} max={max} step={step} value={value || ""} onChange={(e) => onChange(Math.max(0, Math.min(max, parseInt(e.target.value || "0", 10) || 0)))} className={inputCls} />
    </div>
  );
}

function SelectField({ label, value, onChange, children }: { label: string; value: string; onChange: (v: string) => void; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[var(--ink)]">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={inputCls}>{children}</select>
    </div>
  );
}
