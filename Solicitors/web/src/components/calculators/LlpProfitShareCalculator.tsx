"use client";

import { useMemo, useState } from "react";

type AllocationMethod = "equal" | "points" | "two-tier" | "fixed-share-plus-equity";

export function LlpProfitShareCalculator() {
  const [totalProfit, setTotalProfit] = useState(800000);
  const [method, setMethod] = useState<AllocationMethod>("two-tier");
  const [seniorPartners, setSeniorPartners] = useState(3);
  const [juniorPartners, setJuniorPartners] = useState(2);
  const [fixedSharePartners, setFixedSharePartners] = useState(2);
  const [fixedShareEach, setFixedShareEach] = useState(85000);
  const [seniorMultiplier, setSeniorMultiplier] = useState(1.6);

  const result = useMemo(() => {
    if (method === "equal") {
      const totalPartners = seniorPartners + juniorPartners;
      if (totalPartners === 0) return { partners: [] };
      const each = totalProfit / totalPartners;
      const partners = [];
      for (let i = 0; i < totalPartners; i++) {
        partners.push({ label: `Partner ${i + 1}`, share: each, percentage: 100 / totalPartners });
      }
      return { partners };
    }
    if (method === "points") {
      const totalPoints = seniorPartners * seniorMultiplier + juniorPartners * 1;
      if (totalPoints === 0) return { partners: [] };
      const valuePerPoint = totalProfit / totalPoints;
      const seniorShare = valuePerPoint * seniorMultiplier;
      const juniorShare = valuePerPoint * 1;
      const partners = [];
      for (let i = 0; i < seniorPartners; i++) partners.push({ label: `Senior partner ${i + 1}`, share: seniorShare, percentage: (seniorShare / totalProfit) * 100 });
      for (let i = 0; i < juniorPartners; i++) partners.push({ label: `Junior partner ${i + 1}`, share: juniorShare, percentage: (juniorShare / totalProfit) * 100 });
      return { partners };
    }
    if (method === "fixed-share-plus-equity") {
      const fixedShareTotal = fixedShareEach * fixedSharePartners;
      const equityProfit = Math.max(0, totalProfit - fixedShareTotal);
      const totalEquityPoints = seniorPartners * seniorMultiplier + juniorPartners * 1;
      const valuePerPoint = totalEquityPoints > 0 ? equityProfit / totalEquityPoints : 0;
      const partners = [];
      for (let i = 0; i < fixedSharePartners; i++) partners.push({ label: `Fixed-share ${i + 1}`, share: fixedShareEach, percentage: (fixedShareEach / totalProfit) * 100 });
      for (let i = 0; i < seniorPartners; i++) {
        const share = valuePerPoint * seniorMultiplier;
        partners.push({ label: `Senior equity ${i + 1}`, share, percentage: (share / totalProfit) * 100 });
      }
      for (let i = 0; i < juniorPartners; i++) {
        const share = valuePerPoint * 1;
        partners.push({ label: `Junior equity ${i + 1}`, share, percentage: (share / totalProfit) * 100 });
      }
      return { partners };
    }
    // two-tier: senior+junior at 1.5x
    const totalPoints = seniorPartners * 1.5 + juniorPartners * 1;
    if (totalPoints === 0) return { partners: [] };
    const valuePerPoint = totalProfit / totalPoints;
    const partners = [];
    for (let i = 0; i < seniorPartners; i++) partners.push({ label: `Senior partner ${i + 1}`, share: valuePerPoint * 1.5, percentage: ((valuePerPoint * 1.5) / totalProfit) * 100 });
    for (let i = 0; i < juniorPartners; i++) partners.push({ label: `Junior partner ${i + 1}`, share: valuePerPoint * 1, percentage: ((valuePerPoint * 1) / totalProfit) * 100 });
    return { partners };
  }, [totalProfit, method, seniorPartners, juniorPartners, fixedSharePartners, fixedShareEach, seniorMultiplier]);

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8">
      <h3 className="font-serif text-xl font-semibold text-[var(--ink)]">Your inputs</h3>
      <div className="mt-5 space-y-4">
        <NumField label="Total profit available for partner allocation (£)" value={totalProfit} onChange={setTotalProfit} max={20000000} step={10000} />
        <SelectField label="Allocation method" value={method} onChange={(v) => setMethod(v as AllocationMethod)}>
          <option value="equal">Equal split (all partners)</option>
          <option value="two-tier">Two-tier (senior 1.5×, junior 1×)</option>
          <option value="points">Points-based (custom senior multiplier)</option>
          <option value="fixed-share-plus-equity">Fixed-share + equity (mixed)</option>
        </SelectField>
        {method === "fixed-share-plus-equity" && (
          <>
            <NumField label="Number of fixed-share partners" value={fixedSharePartners} onChange={setFixedSharePartners} max={20} step={1} />
            <NumField label="Fixed-share amount each (£/yr)" value={fixedShareEach} onChange={setFixedShareEach} max={500000} step={5000} />
          </>
        )}
        <NumField label="Number of senior equity partners" value={seniorPartners} onChange={setSeniorPartners} max={50} step={1} />
        <NumField label="Number of junior equity partners" value={juniorPartners} onChange={setJuniorPartners} max={50} step={1} />
        {method === "points" && (
          <NumField label="Senior partner point multiplier (e.g. 1.5, 2.0)" value={seniorMultiplier} onChange={(v) => setSeniorMultiplier(v)} max={10} step={1} placeholder="e.g. 1.6" />
        )}
      </div>

      <div className="mt-8 rounded-2xl border-l-4 border-[var(--primary)] bg-[var(--primary)]/5 p-5 sm:p-6">
        <h4 className="font-serif text-lg font-semibold text-[var(--ink)]">Allocation</h4>
        <div className="mt-4 space-y-2">
          {result.partners.map((p, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg bg-white p-3 text-sm">
              <span className="font-medium text-[var(--ink)]">{p.label}</span>
              <span className="font-serif text-base font-semibold text-[var(--primary)]">
                £{Math.round(p.share).toLocaleString("en-GB")} ({p.percentage.toFixed(1)}%)
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 text-sm leading-relaxed text-[var(--ink-soft)]">
        <p>
          <strong>Notes:</strong> Indicative LLP profit allocation. Real-world allocations are governed by the LLP agreement and often include adjustments for: capital interest (typically 2-5% on capital account balance), prior partner-specific drawings, lock-in / vesting schedules for new equity partners, and bonus pools that distribute outside the standard methodology.
        </p>
        <p className="mt-3">
          Each partner is then taxed personally on their allocated share at personal income tax + Class 4 NI rates. Fixed-share members should be audited against the FA 2014 Salaried Member Rules; failing all three conditions triggers PAYE on drawings.
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
      <input type="number" inputMode="numeric" min={0} max={max} step={step} value={value || ""} onChange={(e) => onChange(Math.max(0, Math.min(max, parseFloat(e.target.value || "0") || 0)))} placeholder={placeholder} className={inputCls} />
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
