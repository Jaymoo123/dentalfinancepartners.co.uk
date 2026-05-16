"use client";

import { useMemo, useState } from "react";

/**
 * Agency valuation calculator — EBITDA × multiple model with adjustments.
 *
 * Typical UK agency multiples (2025 market):
 *  - Boutique generalist agencies: 3-5× adjusted EBITDA
 *  - Specialist / niche agencies (e.g. AI, performance): 5-8×
 *  - High-retention recurring revenue: +0.5-1.5× uplift
 *  - Key-person dependent: -0.5-2× discount
 *  - Concentration risk (top client >30%): -0.5-1× discount
 */

const fmt = (n: number) => `£${Math.round(n).toLocaleString("en-GB")}`;

type RevType = "project" | "retainer";

export function AgencyValuationCalculator() {
  const [revenue, setRevenue] = useState(1200000);
  const [ebitdaPct, setEbitdaPct] = useState(18); // healthy agency ~15-25%
  const [agencyType, setAgencyType] = useState<"generalist" | "specialist" | "premium">("generalist");
  const [retainerPct, setRetainerPct] = useState(50);
  const [topClientPct, setTopClientPct] = useState(20);
  const [keyPersonDependent, setKeyPersonDependent] = useState(false);

  const ebitda = revenue * (ebitdaPct / 100);

  const baseMultiple = useMemo(() => {
    switch (agencyType) {
      case "generalist": return 4;
      case "specialist": return 6;
      case "premium": return 8;
    }
  }, [agencyType]);

  const retainerUplift = retainerPct >= 70 ? 1.0 : retainerPct >= 50 ? 0.5 : 0;
  const concentrationDiscount = topClientPct >= 50 ? -1.5 : topClientPct >= 30 ? -0.5 : 0;
  const keyPersonDiscount = keyPersonDependent ? -1.0 : 0;

  const adjustedMultiple = Math.max(1, baseMultiple + retainerUplift + concentrationDiscount + keyPersonDiscount);
  const valuationLow = ebitda * Math.max(1, adjustedMultiple - 0.5);
  const valuationMid = ebitda * adjustedMultiple;
  const valuationHigh = ebitda * (adjustedMultiple + 0.5);

  return (
    <div className="space-y-8">
      <div className="bg-slate-50 border border-slate-200 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-slate-900">Your agency profile</h2>

        <div className="mt-6 space-y-5">
          <div>
            <label htmlFor="rev" className="block text-sm font-bold text-slate-900">Annual revenue</label>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-slate-500">£</span>
              <input id="rev" type="number" value={revenue} onChange={(e) => setRevenue(Math.max(0, Number(e.target.value) || 0))} min={0} max={50000000} step={10000}
                className="w-44 border border-slate-300 px-3 py-2 text-base text-slate-900 focus:outline-none focus:border-indigo-600" />
            </div>
          </div>

          <div>
            <label htmlFor="ebitda" className="block text-sm font-bold text-slate-900">EBITDA margin (%)</label>
            <p className="text-xs text-slate-500 mt-0.5">Earnings before interest, tax, depreciation and amortisation, as % of revenue. Healthy agencies: 15-25%.</p>
            <input id="ebitda" type="range" value={ebitdaPct} onChange={(e) => setEbitdaPct(Number(e.target.value))} min={0} max={40} step={1}
              className="w-full mt-3 accent-indigo-600" />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>0%</span><span className="font-bold text-slate-900">{ebitdaPct}%</span><span>40%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900">Agency positioning</label>
            <div className="mt-2 grid sm:grid-cols-3 gap-2">
              {([
                { v: "generalist", label: "Generalist", desc: "Mixed services, broad client base" },
                { v: "specialist", label: "Specialist", desc: "Niche vertical or capability (e.g. PPC, AI)" },
                { v: "premium", label: "Premium / boutique", desc: "Established brand, named-client work, scarce capability" },
              ] as const).map((opt) => (
                <button
                  key={opt.v}
                  type="button"
                  onClick={() => setAgencyType(opt.v)}
                  className={`text-left p-3 border-2 transition-all ${
                    agencyType === opt.v ? "border-indigo-600 bg-indigo-50" : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <p className="text-sm font-bold text-slate-900">{opt.label}</p>
                  <p className="text-xs text-slate-500 mt-1">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="ret" className="block text-sm font-bold text-slate-900">Retainer revenue (% of total)</label>
            <p className="text-xs text-slate-500 mt-0.5">Recurring monthly revenue lifts valuation. 70%+ retainer book = strong premium.</p>
            <input id="ret" type="range" value={retainerPct} onChange={(e) => setRetainerPct(Number(e.target.value))} min={0} max={100} step={5}
              className="w-full mt-3 accent-indigo-600" />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>0%</span><span className="font-bold text-slate-900">{retainerPct}%</span><span>100%</span>
            </div>
          </div>

          <div>
            <label htmlFor="conc" className="block text-sm font-bold text-slate-900">Top client (% of revenue)</label>
            <p className="text-xs text-slate-500 mt-0.5">Concentration risk reduces valuation. Top client &gt;30% = buyer concern.</p>
            <input id="conc" type="range" value={topClientPct} onChange={(e) => setTopClientPct(Number(e.target.value))} min={0} max={100} step={5}
              className="w-full mt-3 accent-indigo-600" />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>0%</span><span className="font-bold text-slate-900">{topClientPct}%</span><span>100%</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <input id="kp" type="checkbox" checked={keyPersonDependent} onChange={(e) => setKeyPersonDependent(e.target.checked)}
              className="mt-1 h-4 w-4 accent-indigo-600" />
            <label htmlFor="kp" className="text-sm text-slate-700">
              <span className="font-semibold text-slate-900">Founder-dependent</span> — if the agency would meaningfully suffer without you in the business day-to-day, tick this. Reduces valuation.
            </label>
          </div>
        </div>
      </div>

      <div className="bg-indigo-700 text-white p-6 sm:p-8">
        <p className="text-sm font-bold uppercase tracking-wider text-indigo-200">Estimated valuation range</p>
        <div className="mt-3 grid sm:grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-indigo-200 uppercase tracking-wider">Low</p>
            <p className="text-2xl sm:text-3xl font-bold font-mono">{fmt(valuationLow)}</p>
          </div>
          <div>
            <p className="text-xs text-indigo-200 uppercase tracking-wider">Mid (central estimate)</p>
            <p className="text-3xl sm:text-4xl font-bold font-mono">{fmt(valuationMid)}</p>
          </div>
          <div>
            <p className="text-xs text-indigo-200 uppercase tracking-wider">High</p>
            <p className="text-2xl sm:text-3xl font-bold font-mono">{fmt(valuationHigh)}</p>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-indigo-500 text-sm space-y-1">
          <p>EBITDA: <strong className="font-bold">{fmt(ebitda)}</strong></p>
          <p>Base multiple ({agencyType}): <strong className="font-bold">{baseMultiple}×</strong></p>
          {retainerUplift > 0 && <p>Retainer uplift: <strong className="font-bold">+{retainerUplift}×</strong></p>}
          {concentrationDiscount < 0 && <p>Concentration discount: <strong className="font-bold">{concentrationDiscount}×</strong></p>}
          {keyPersonDiscount < 0 && <p>Founder-dependent discount: <strong className="font-bold">{keyPersonDiscount}×</strong></p>}
          <p className="pt-2 border-t border-indigo-500 mt-2">Adjusted multiple: <strong className="font-bold">{adjustedMultiple.toFixed(1)}×</strong></p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 p-6 text-sm text-slate-600">
        <p>
          <strong className="text-slate-900">Directional only.</strong> Actual sale prices depend on buyer type (trade, PE, strategic), market timing, and dozens of qualitative factors (team retention, IP, contract terms, growth trajectory). A real valuation involves normalised EBITDA adjustments, working capital review and comparable transaction analysis. Book a free call for a tailored exit-planning conversation.
        </p>
      </div>
    </div>
  );
}
