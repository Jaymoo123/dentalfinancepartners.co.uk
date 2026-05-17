"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  calculate,
  formatGbp,
  fromSearchParams,
  toSearchParams,
  typeLabel,
  type ValuationType,
} from "@/lib/valuation";

/**
 * Agency valuation calculator — EBITDA × multiple model with adjustments.
 *
 * State is mirrored into the URL on each change (debounced) so any run is
 * shareable: copy the URL, post to LinkedIn, and the dynamic OG card
 * (/api/og/valuation) renders that exact valuation.
 *
 * Typical UK agency multiples (2025 market):
 *  - Boutique generalist agencies: 3-5× adjusted EBITDA
 *  - Specialist / niche agencies (e.g. AI, performance): 5-8×
 *  - High-retention recurring revenue: +0.5-1.5× uplift
 *  - Key-person dependent: -0.5-2× discount
 *  - Concentration risk (top client >30%): -0.5-1× discount
 */

export function AgencyValuationCalculator() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initial = useMemo(() => fromSearchParams(searchParams), []); // eslint-disable-line react-hooks/exhaustive-deps

  const [revenue, setRevenue] = useState(initial.revenue);
  const [ebitdaPct, setEbitdaPct] = useState(initial.ebitdaPct);
  const [agencyType, setAgencyType] = useState<ValuationType>(initial.type);
  const [retainerPct, setRetainerPct] = useState(initial.retainerPct);
  const [topClientPct, setTopClientPct] = useState(initial.topClientPct);
  const [keyPersonDependent, setKeyPersonDependent] = useState(initial.keyPersonDependent);

  const r = useMemo(
    () =>
      calculate({
        revenue,
        ebitdaPct,
        type: agencyType,
        retainerPct,
        topClientPct,
        keyPersonDependent,
      }),
    [revenue, ebitdaPct, agencyType, retainerPct, topClientPct, keyPersonDependent],
  );

  // Sync inputs to URL, debounced 250ms
  const debounceRef = useRef<number | null>(null);
  useEffect(() => {
    if (debounceRef.current !== null) {
      window.clearTimeout(debounceRef.current);
    }
    debounceRef.current = window.setTimeout(() => {
      const sp = toSearchParams({
        revenue,
        ebitdaPct,
        type: agencyType,
        retainerPct,
        topClientPct,
        keyPersonDependent,
      });
      router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
    }, 250);
    return () => {
      if (debounceRef.current !== null) {
        window.clearTimeout(debounceRef.current);
      }
    };
  }, [revenue, ebitdaPct, agencyType, retainerPct, topClientPct, keyPersonDependent, pathname, router]);

  return (
    <div className="space-y-8">
      <div className="bg-slate-50 border border-slate-200 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-slate-900">Your agency profile</h2>

        <div className="mt-6 space-y-5">
          <div>
            <label htmlFor="rev" className="block text-sm font-bold text-slate-900">
              Annual revenue
            </label>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-slate-500">£</span>
              <input
                id="rev"
                type="number"
                value={revenue}
                onChange={(e) => setRevenue(Math.max(0, Number(e.target.value) || 0))}
                min={0}
                max={50000000}
                step={10000}
                className="w-44 border border-slate-300 px-3 py-2 text-base text-slate-900 focus:outline-none focus:border-indigo-600"
              />
            </div>
          </div>

          <div>
            <label htmlFor="ebitda" className="block text-sm font-bold text-slate-900">
              EBITDA margin (%)
            </label>
            <p className="text-xs text-slate-500 mt-0.5">
              Earnings before interest, tax, depreciation and amortisation, as % of revenue. Healthy agencies: 15-25%.
            </p>
            <input
              id="ebitda"
              type="range"
              value={ebitdaPct}
              onChange={(e) => setEbitdaPct(Number(e.target.value))}
              min={0}
              max={40}
              step={1}
              className="w-full mt-3 accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>0%</span>
              <span className="font-bold text-slate-900">{ebitdaPct}%</span>
              <span>40%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900">Agency positioning</label>
            <div className="mt-2 grid sm:grid-cols-3 gap-2">
              {(
                [
                  { v: "generalist", label: "Generalist", desc: "Mixed services, broad client base" },
                  { v: "specialist", label: "Specialist", desc: "Niche vertical or capability (e.g. PPC, AI)" },
                  { v: "premium", label: "Premium / boutique", desc: "Established brand, named-client work, scarce capability" },
                ] as const
              ).map((opt) => (
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
            <label htmlFor="ret" className="block text-sm font-bold text-slate-900">
              Retainer revenue (% of total)
            </label>
            <p className="text-xs text-slate-500 mt-0.5">
              Recurring monthly revenue lifts valuation. 70%+ retainer book = strong premium.
            </p>
            <input
              id="ret"
              type="range"
              value={retainerPct}
              onChange={(e) => setRetainerPct(Number(e.target.value))}
              min={0}
              max={100}
              step={5}
              className="w-full mt-3 accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>0%</span>
              <span className="font-bold text-slate-900">{retainerPct}%</span>
              <span>100%</span>
            </div>
          </div>

          <div>
            <label htmlFor="conc" className="block text-sm font-bold text-slate-900">
              Top client (% of revenue)
            </label>
            <p className="text-xs text-slate-500 mt-0.5">
              Concentration risk reduces valuation. Top client &gt;30% = buyer concern.
            </p>
            <input
              id="conc"
              type="range"
              value={topClientPct}
              onChange={(e) => setTopClientPct(Number(e.target.value))}
              min={0}
              max={100}
              step={5}
              className="w-full mt-3 accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>0%</span>
              <span className="font-bold text-slate-900">{topClientPct}%</span>
              <span>100%</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <input
              id="kp"
              type="checkbox"
              checked={keyPersonDependent}
              onChange={(e) => setKeyPersonDependent(e.target.checked)}
              className="mt-1 h-4 w-4 accent-indigo-600"
            />
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
            <p className="text-2xl sm:text-3xl font-bold font-mono">{formatGbp(r.low)}</p>
          </div>
          <div>
            <p className="text-xs text-indigo-200 uppercase tracking-wider">Mid (central estimate)</p>
            <p className="text-3xl sm:text-4xl font-bold font-mono">{formatGbp(r.mid)}</p>
          </div>
          <div>
            <p className="text-xs text-indigo-200 uppercase tracking-wider">High</p>
            <p className="text-2xl sm:text-3xl font-bold font-mono">{formatGbp(r.high)}</p>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-indigo-500 text-sm space-y-1">
          <p>
            EBITDA: <strong className="font-bold">{formatGbp(r.ebitda)}</strong>
          </p>
          <p>
            Base multiple ({typeLabel(agencyType)}): <strong className="font-bold">{r.baseMultiple}×</strong>
          </p>
          {r.retainerUplift > 0 && (
            <p>
              Retainer uplift: <strong className="font-bold">+{r.retainerUplift}×</strong>
            </p>
          )}
          {r.concentrationDiscount < 0 && (
            <p>
              Concentration discount: <strong className="font-bold">{r.concentrationDiscount}×</strong>
            </p>
          )}
          {r.keyPersonDiscount < 0 && (
            <p>
              Founder-dependent discount: <strong className="font-bold">{r.keyPersonDiscount}×</strong>
            </p>
          )}
          <p className="pt-2 border-t border-indigo-500 mt-2">
            Adjusted multiple: <strong className="font-bold">{r.adjustedMultiple.toFixed(1)}×</strong>
          </p>
        </div>
      </div>

      <ShareCard />

      <div className="bg-white border border-slate-200 p-6 text-sm text-slate-600">
        <p>
          <strong className="text-slate-900">Directional only.</strong> Actual sale prices depend on buyer type (trade, PE, strategic), market timing, and dozens of qualitative factors (team retention, IP, contract terms, growth trajectory). A real valuation involves normalised EBITDA adjustments, working capital review and comparable transaction analysis. Book a free call for a tailored exit-planning conversation.
        </p>
      </div>
    </div>
  );
}

function ShareCard() {
  const [copied, setCopied] = useState(false);
  const [href, setHref] = useState("");

  useEffect(() => {
    setHref(window.location.href);
    const onChange = () => setHref(window.location.href);
    // URL changes via router.replace don't fire popstate — observe via interval
    const id = window.setInterval(onChange, 500);
    return () => window.clearInterval(id);
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(href)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    "I just valued my agency with this free calculator from Agency Founder Finance:",
  )}&url=${encodeURIComponent(href)}`;

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8">
      <h3 className="text-lg font-bold text-slate-900">Share this estimate</h3>
      <p className="mt-1 text-sm text-slate-600">
        The URL encodes your inputs. Share it and your run renders with a
        branded valuation card.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-[#0a66c2] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
            <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.86 3.36-1.86 3.59 0 4.25 2.37 4.25 5.45v6.3zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45z" />
          </svg>
          Share on LinkedIn
        </a>
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2H21.5l-7.475 8.54L23 22h-6.86l-5.37-7.024L4.6 22H1.34l8.005-9.146L1 2h7.03l4.853 6.418L18.244 2zm-1.204 18h1.832L7.04 4H5.077l11.963 16z" />
          </svg>
          Share on X
        </a>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
        >
          {copied ? "Copied!" : "Copy link"}
        </button>
      </div>
    </div>
  );
}
