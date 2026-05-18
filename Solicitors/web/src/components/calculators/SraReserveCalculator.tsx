"use client";

import { useMemo, useState } from "react";

type MatterType = "conveyancing" | "litigation" | "private-client" | "commercial" | "mixed";
type Volume = "low" | "moderate" | "high" | "very-high";

const VOLUME_AVERAGE_BALANCE: Record<Volume, number> = {
  low: 2500,
  moderate: 8000,
  high: 25000,
  "very-high": 75000,
};

const MATTER_RISK_FACTOR: Record<MatterType, number> = {
  conveyancing: 0.025,
  litigation: 0.01,
  "private-client": 0.005,
  commercial: 0.008,
  mixed: 0.012,
};

export function SraReserveCalculator() {
  const [openMatters, setOpenMatters] = useState(150);
  const [volume, setVolume] = useState<Volume>("high");
  const [matterType, setMatterType] = useState<MatterType>("conveyancing");

  const result = useMemo(() => {
    const avgBalance = VOLUME_AVERAGE_BALANCE[volume];
    const peakClientMoney = openMatters * avgBalance;
    const riskFactor = MATTER_RISK_FACTOR[matterType];
    const suggestedReserve = peakClientMoney * riskFactor;
    const lowReserve = suggestedReserve * 0.7;
    const highReserve = suggestedReserve * 1.5;
    const exemptionEligible = peakClientMoney <= 10000 && avgBalance <= 250;
    return { peakClientMoney, suggestedReserve, lowReserve, highReserve, exemptionEligible };
  }, [openMatters, volume, matterType]);

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8">
      <h3 className="font-serif text-xl font-semibold text-[var(--ink)]">Your client money profile</h3>
      <div className="mt-5 space-y-4">
        <NumField label="Average number of open matters with client money" value={openMatters} onChange={setOpenMatters} max={5000} step={5} placeholder="e.g. 150" />
        <SelectField label="Typical client money volume" value={volume} onChange={(v) => setVolume(v as Volume)}>
          <option value="low">Low (under £5,000 per matter typical)</option>
          <option value="moderate">Moderate (£5,000-£15,000 per matter)</option>
          <option value="high">High (£15,000-£50,000 per matter, conveyancing-typical)</option>
          <option value="very-high">Very high (£50,000+ per matter, high-value conveyancing or commercial)</option>
        </SelectField>
        <SelectField label="Primary matter type" value={matterType} onChange={(v) => setMatterType(v as MatterType)}>
          <option value="conveyancing">Conveyancing (residential / commercial)</option>
          <option value="litigation">Litigation</option>
          <option value="private-client">Private client (probate, trust)</option>
          <option value="commercial">Commercial / corporate</option>
          <option value="mixed">Mixed</option>
        </SelectField>
      </div>

      {result.exemptionEligible && (
        <div className="mt-8 rounded-2xl border border-emerald-300 bg-emerald-50 p-5">
          <p className="text-sm font-semibold text-emerald-900">
            Likely de minimis exempt
          </p>
          <p className="mt-2 text-sm text-emerald-900">
            Your firm may qualify for the Rule 12.2 exemption from the annual SRA Accountant&apos;s Report: peak client money ≤£10,000 and average balance ≤£250. Confirm with your specialist accountant. Reserve calculations below are still useful for risk management but the Accountant&apos;s Report obligation does not apply.
          </p>
        </div>
      )}

      <div className="mt-8 rounded-2xl border-l-4 border-[var(--primary)] bg-[var(--primary)]/5 p-5 sm:p-6">
        <h4 className="font-serif text-lg font-semibold text-[var(--ink)]">Indicative client money reserve</h4>
        <p className="mt-2 font-serif text-3xl font-bold text-[var(--primary)] sm:text-4xl">
          £{Math.round(result.lowReserve).toLocaleString("en-GB")} – £{Math.round(result.highReserve).toLocaleString("en-GB")}
        </p>
        <p className="mt-2 text-sm text-[var(--ink-soft)]">
          Peak client money exposure: ~£{Math.round(result.peakClientMoney).toLocaleString("en-GB")}. Suggested mid-point reserve: £{Math.round(result.suggestedReserve).toLocaleString("en-GB")}.
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 text-sm leading-relaxed text-[var(--ink-soft)]">
        <p>
          <strong>Notes:</strong> The "reserve" here is not a regulatory requirement — the SRA Accounts Rules don&apos;t mandate a specific firm-side reserve. It&apos;s a prudent operational buffer to cover: shortfalls discovered at reconciliation that need to be funded from office account pending investigation, residual balances awaiting client return, and contingency for client money interest payments where the firm&apos;s policy applies.
        </p>
        <p className="mt-3">
          Conveyancing-heavy firms typically maintain larger operational reserves than commercial or private-client firms, reflecting the higher value and frequency of client money movements.
        </p>
        <p className="mt-3">
          This is a directional figure for risk-management planning. Actual reserve decisions should be discussed with your COFA and accountant based on the firm&apos;s specific risk profile.
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

function SelectField({ label, value, onChange, children }: { label: string; value: string; onChange: (v: string) => void; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[var(--ink)]">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={inputCls}>{children}</select>
    </div>
  );
}
