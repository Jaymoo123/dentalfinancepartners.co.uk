"use client";

import { useMemo, useState } from "react";

type FirmType = "sole-practitioner" | "partnership-llp" | "specialist" | "high-volume";
type Region = "london" | "south" | "midlands" | "north" | "wales" | "scotland-ni";
type MarketDemand = "low" | "normal" | "high";

const FIRM_TYPE_MULTIPLES: Record<FirmType, [number, number]> = {
  "sole-practitioner": [0.6, 1.1],
  "partnership-llp": [1.0, 2.0],
  "specialist": [1.8, 3.5],
  "high-volume": [0.8, 1.5],
};

const REGION_ADJUSTMENT: Record<Region, number> = {
  london: 0.15,
  south: 0.05,
  midlands: 0,
  north: -0.05,
  wales: -0.05,
  "scotland-ni": -0.05,
};

const DEMAND_ADJUSTMENT: Record<MarketDemand, number> = {
  low: -0.15,
  normal: 0,
  high: 0.1,
};

export function LawFirmValuationCalculator() {
  const [profit, setProfit] = useState(600000);
  const [firmType, setFirmType] = useState<FirmType>("partnership-llp");
  const [region, setRegion] = useState<Region>("midlands");
  const [demand, setDemand] = useState<MarketDemand>("normal");
  const [wip, setWip] = useState(180000);
  const [tangibleAssets, setTangibleAssets] = useState(40000);

  const result = useMemo(() => {
    const [low, high] = FIRM_TYPE_MULTIPLES[firmType];
    const adjLow = Math.max(0.4, low + REGION_ADJUSTMENT[region] + DEMAND_ADJUSTMENT[demand]);
    const adjHigh = Math.max(0.5, high + REGION_ADJUSTMENT[region] + DEMAND_ADJUSTMENT[demand]);
    const goodwillLow = profit * adjLow;
    const goodwillHigh = profit * adjHigh;
    const totalLow = goodwillLow + wip + tangibleAssets;
    const totalHigh = goodwillHigh + wip + tangibleAssets;
    return { multipleLow: adjLow, multipleHigh: adjHigh, goodwillLow, goodwillHigh, totalLow, totalHigh };
  }, [profit, firmType, region, demand, wip, tangibleAssets]);

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8">
      <h3 className="font-serif text-xl font-semibold text-[var(--ink)]">Your inputs</h3>
      <div className="mt-5 space-y-4">
        <NumField label="Normalised annual profit (£)" value={profit} onChange={setProfit} max={20000000} step={10000} placeholder="e.g. 600000" />
        <SelectField label="Firm type" value={firmType} onChange={(v) => setFirmType(v as FirmType)}>
          <option value="sole-practitioner">Sole practitioner (small)</option>
          <option value="partnership-llp">Partnership / LLP (mid-market)</option>
          <option value="specialist">Specialist firm (PI / commercial litigation / prestige)</option>
          <option value="high-volume">High-volume (conveyancing factory etc.)</option>
        </SelectField>
        <SelectField label="Region" value={region} onChange={(v) => setRegion(v as Region)}>
          <option value="london">London / South East</option>
          <option value="south">South + South West</option>
          <option value="midlands">Midlands</option>
          <option value="north">North</option>
          <option value="wales">Wales</option>
          <option value="scotland-ni">Scotland / Northern Ireland</option>
        </SelectField>
        <SelectField label="Buyer demand in your area" value={demand} onChange={(v) => setDemand(v as MarketDemand)}>
          <option value="low">Low (soft market, conveyancing depressed post-2022)</option>
          <option value="normal">Normal demand</option>
          <option value="high">High (prime location, strong buyer pool)</option>
        </SelectField>
        <NumField label="Work in Progress (WIP) (£)" value={wip} onChange={setWip} max={5000000} step={5000} placeholder="Recoverable WIP only" />
        <NumField label="Tangible assets (£)" value={tangibleAssets} onChange={setTangibleAssets} max={2000000} step={5000} placeholder="IT, fit-out, furniture etc." />
      </div>

      <div className="mt-8 rounded-2xl border-l-4 border-[var(--primary)] bg-[var(--primary)]/5 p-5 sm:p-6">
        <h4 className="font-serif text-lg font-semibold text-[var(--ink)]">Indicative total value range</h4>
        <p className="mt-2 font-serif text-3xl font-bold text-[var(--primary)] sm:text-4xl">
          £{Math.round(result.totalLow).toLocaleString("en-GB")} – £{Math.round(result.totalHigh).toLocaleString("en-GB")}
        </p>
        <p className="mt-2 text-sm text-[var(--ink-soft)]">
          Goodwill multiple: {result.multipleLow.toFixed(2)}× – {result.multipleHigh.toFixed(2)}× normalised profit, plus WIP and tangible assets.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <StatTile label="Goodwill range" value={`£${Math.round(result.goodwillLow).toLocaleString("en-GB")} – £${Math.round(result.goodwillHigh).toLocaleString("en-GB")}`} />
        <StatTile label="WIP" value={`£${Math.round(wip).toLocaleString("en-GB")}`} />
        <StatTile label="Tangible assets" value={`£${Math.round(tangibleAssets).toLocaleString("en-GB")}`} />
      </div>

      <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 text-sm leading-relaxed text-[var(--ink-soft)]">
        <p>
          <strong>Notes:</strong> Directional model using UK 2025/26 indicative market ranges. Conveyancing-heavy firms are currently depressed by post-2022 market conditions. Specialist firms (personal injury with strong CFA pipeline, niche commercial litigation, prestige private client) command premium multiples. Corporate acquirer premium not modelled — corporate buyers paying for strategic fit sometimes pay above the upper range.
        </p>
        <p className="mt-3">
          <strong>Normalised profit matters more than the multiple.</strong> Add-backs (partner drawings normalised to market salary, personal expenses removed, one-off items called out) typically swing the profit number by 10-20%, which moves the valuation by far more than the multiple range.
        </p>
        <p className="mt-3">
          WIP is recognised on an earnings basis under FRS 102 / FRS 105. Aged WIP (over 6 months) is typically written down or excluded. Litigation WIP is discounted more aggressively than conveyancing.
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

function SelectField({ label, value, onChange, children }: { label: string; value: string; onChange: (v: string) => void; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[var(--ink)]">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={inputCls}>{children}</select>
    </div>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">{label}</p>
      <p className="mt-2 font-serif text-base font-semibold text-[var(--ink)]">{value}</p>
    </div>
  );
}
