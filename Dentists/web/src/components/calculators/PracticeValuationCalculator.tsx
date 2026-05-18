"use client";

import { useMemo, useState } from "react";

type PracticeMix = "nhs-heavy" | "mixed" | "private-heavy";
type Region = "london" | "south" | "midlands" | "north" | "wales" | "ni";
type Demand = "low" | "normal" | "high";

const MIX_BASE: Record<PracticeMix, [number, number]> = {
  "nhs-heavy": [0.65, 0.95],
  mixed: [0.85, 1.15],
  "private-heavy": [1.05, 1.45],
};

const REGION_ADJUST: Record<Region, number> = {
  london: 0.1,
  south: 0.05,
  midlands: 0,
  north: -0.05,
  wales: -0.05,
  ni: -0.05,
};

const DEMAND_ADJUST: Record<Demand, number> = {
  low: -0.1,
  normal: 0,
  high: 0.1,
};

export function PracticeValuationCalculator() {
  const [ebitda, setEbitda] = useState(180000);
  const [mix, setMix] = useState<PracticeMix>("mixed");
  const [region, setRegion] = useState<Region>("midlands");
  const [demand, setDemand] = useState<Demand>("normal");
  const [tangibleAssets, setTangibleAssets] = useState(180000);

  const result = useMemo(() => {
    const [low, high] = MIX_BASE[mix];
    const adjLow = Math.max(0.4, low + REGION_ADJUST[region] + DEMAND_ADJUST[demand]);
    const adjHigh = Math.max(0.5, high + REGION_ADJUST[region] + DEMAND_ADJUST[demand]);
    const goodwillLow = ebitda * adjLow;
    const goodwillHigh = ebitda * adjHigh;
    const totalLow = goodwillLow + tangibleAssets;
    const totalHigh = goodwillHigh + tangibleAssets;
    return {
      multipleLow: adjLow,
      multipleHigh: adjHigh,
      goodwillLow,
      goodwillHigh,
      totalLow,
      totalHigh,
    };
  }, [ebitda, mix, region, demand, tangibleAssets]);

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8">
      <h3 className="font-serif text-xl font-semibold text-[var(--ink)]">Your inputs</h3>
      <div className="mt-5 space-y-4">
        <NumField
          label="Normalised EBITDA (£/yr)"
          value={ebitda}
          onChange={setEbitda}
          max={5000000}
          step={5000}
          placeholder="e.g. 180000"
        />
        <SelectField label="Practice mix" value={mix} onChange={(v) => setMix(v as PracticeMix)}>
          <option value="nhs-heavy">NHS-heavy (over 75% NHS)</option>
          <option value="mixed">Mixed NHS / private</option>
          <option value="private-heavy">Private-heavy (over 75% private)</option>
        </SelectField>
        <SelectField label="Region" value={region} onChange={(v) => setRegion(v as Region)}>
          <option value="london">London / South East</option>
          <option value="south">South + South West</option>
          <option value="midlands">Midlands</option>
          <option value="north">North</option>
          <option value="wales">Wales</option>
          <option value="ni">Northern Ireland</option>
        </SelectField>
        <SelectField label="Buyer demand in your area" value={demand} onChange={(v) => setDemand(v as Demand)}>
          <option value="low">Lower demand (rural / contract risk / aging facility)</option>
          <option value="normal">Normal demand</option>
          <option value="high">High demand (prime location / good buyer pool)</option>
        </SelectField>
        <NumField
          label="Tangible assets (chairs, X-ray, equipment, F&F) (£)"
          value={tangibleAssets}
          onChange={setTangibleAssets}
          max={2000000}
          step={5000}
          placeholder="e.g. 180000"
        />
      </div>

      <div className="mt-8 rounded-2xl border-l-4 border-[var(--gold)] bg-[var(--gold-soft)] p-5 sm:p-6">
        <h4 className="font-serif text-lg font-semibold text-[var(--ink)]">
          Indicative total value range
        </h4>
        <p className="mt-2 font-serif text-3xl font-bold text-[var(--gold-strong)] sm:text-4xl">
          £{Math.round(result.totalLow).toLocaleString("en-GB")} – £{Math.round(result.totalHigh).toLocaleString("en-GB")}
        </p>
        <p className="mt-2 text-sm text-[var(--ink-soft)]">
          Goodwill multiple: {result.multipleLow.toFixed(2)}× – {result.multipleHigh.toFixed(2)}× EBITDA, plus tangible assets.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <StatTile
          label="Goodwill value range"
          value={`£${Math.round(result.goodwillLow).toLocaleString("en-GB")} – £${Math.round(result.goodwillHigh).toLocaleString("en-GB")}`}
        />
        <StatTile
          label="Tangible assets"
          value={`£${Math.round(tangibleAssets).toLocaleString("en-GB")}`}
        />
      </div>

      <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 text-sm leading-relaxed text-[var(--ink-soft)]">
        <p>
          <strong>Notes:</strong> This is a directional EBITDA × multiple model using 2025/26 UK dental market indicative ranges. Actual transaction values depend on buyer type (corporate vs independent), contract specifics, lease vs freehold position, associate retention, and individual negotiation. Corporate acquirer premium not modelled — corporate buyers paying for strategic fit sometimes pay above the upper range here.
        </p>
        <p className="mt-3">
          Normalised EBITDA matters more than the multiple. Add-backs (principal salary to market, personal expenses removed, one-off items) typically swing the EBITDA by 10-20%, which moves the valuation by far more than the multiple range does.
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
        inputMode="numeric"
        min={0}
        max={max}
        step={step}
        value={value || ""}
        onChange={(e) =>
          onChange(Math.max(0, Math.min(max, parseInt(e.target.value || "0", 10) || 0)))
        }
        placeholder={placeholder}
        className={inputCls}
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[var(--ink)]">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls}
      >
        {children}
      </select>
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
