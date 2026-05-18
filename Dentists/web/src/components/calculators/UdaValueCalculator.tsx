"use client";

import { useMemo, useState } from "react";

type Region = "england" | "wales" | "ni";

const REGION_LABELS: Record<Region, string> = {
  england: "England (NHS / GDS contract)",
  wales: "Wales (revised contract)",
  ni: "Northern Ireland (HS dental)",
};

const REGION_TYPICAL_RANGE: Record<Region, [number, number]> = {
  england: [25, 35],
  wales: [25, 38],
  ni: [21, 32],
};

export function UdaValueCalculator() {
  const [region, setRegion] = useState<Region>("england");
  const [udas, setUdas] = useState(3000);
  const [contractValue, setContractValue] = useState(90000);
  const [yearSigned, setYearSigned] = useState(2010);

  const result = useMemo(() => {
    const effectiveUda = udas > 0 ? contractValue / udas : 0;
    const yearsSinceSigned = Math.max(0, 2026 - yearSigned);
    const cumulativeCpi = Math.pow(1.025, yearsSinceSigned) - 1;
    const realValuePerUda = effectiveUda / (1 + cumulativeCpi);
    const [low, high] = REGION_TYPICAL_RANGE[region];
    const benchmarkLow = low;
    const benchmarkHigh = high;
    const positionVsBenchmark =
      effectiveUda < benchmarkLow
        ? "below"
        : effectiveUda > benchmarkHigh
        ? "above"
        : "within";
    return {
      effectiveUda,
      yearsSinceSigned,
      cumulativeCpi,
      realValuePerUda,
      benchmarkLow,
      benchmarkHigh,
      positionVsBenchmark,
    };
  }, [region, udas, contractValue, yearSigned]);

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8">
      <h3 className="font-serif text-xl font-semibold text-[var(--ink)]">
        Your inputs
      </h3>
      <div className="mt-5 space-y-4">
        <Field label="Region">
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value as Region)}
            className={inputCls}
          >
            {(Object.keys(REGION_LABELS) as Region[]).map((r) => (
              <option key={r} value={r}>
                {REGION_LABELS[r]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Annual UDA volume">
          <input
            type="number"
            inputMode="numeric"
            min={0}
            max={50000}
            step={100}
            value={udas || ""}
            onChange={(e) =>
              setUdas(
                Math.max(0, Math.min(50000, parseInt(e.target.value || "0", 10) || 0)),
              )
            }
            className={inputCls}
          />
        </Field>
        <Field label="Annual contract value (£)">
          <input
            type="number"
            inputMode="numeric"
            min={0}
            max={5000000}
            step={500}
            value={contractValue || ""}
            onChange={(e) =>
              setContractValue(
                Math.max(0, Math.min(5000000, parseInt(e.target.value || "0", 10) || 0)),
              )
            }
            className={inputCls}
          />
        </Field>
        <Field label="Year contract last signed / restructured">
          <input
            type="number"
            inputMode="numeric"
            min={2006}
            max={2026}
            step={1}
            value={yearSigned || ""}
            onChange={(e) =>
              setYearSigned(
                Math.max(2006, Math.min(2026, parseInt(e.target.value || "2006", 10) || 2006)),
              )
            }
            className={inputCls}
          />
        </Field>
      </div>

      <div className="mt-8 rounded-2xl border-l-4 border-[var(--gold)] bg-[var(--gold-soft)] p-5 sm:p-6">
        <h4 className="font-serif text-lg font-semibold text-[var(--ink)]">
          Your effective UDA value
        </h4>
        <p className="mt-2 font-serif text-4xl font-bold text-[var(--gold-strong)]">
          £{result.effectiveUda.toFixed(2)}
        </p>
        <p className="mt-2 text-sm text-[var(--ink-soft)]">
          per UDA at current contract value and volume.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <StatTile
          label="Real value at signing (2026 £)"
          value={`£${result.realValuePerUda.toFixed(2)}`}
          note={`After ${(result.cumulativeCpi * 100).toFixed(1)}% cumulative inflation since ${yearSigned}`}
        />
        <StatTile
          label={`${REGION_LABELS[region]} benchmark`}
          value={`£${result.benchmarkLow} – £${result.benchmarkHigh}`}
          note={`Your contract is ${result.positionVsBenchmark} the typical range`}
        />
      </div>

      <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 text-sm leading-relaxed text-[var(--ink-soft)]">
        <p>
          <strong>Notes:</strong> Effective UDA value = contract value ÷ UDA volume. This is the most useful number for comparing across practices and contract years. Benchmarks are 2025/26 indicative; actual figures vary by commissioner, region, and individual contract terms. Real value is adjusted using an assumed 2.5% annual CPI proxy — actual inflation since contract signing has been higher (closer to 4% in some years).
        </p>
        <p className="mt-3">
          The headline figure most dentists know is the "national average UDA" but it masks significant regional and contract-specific variance. Your effective UDA is the only number that actually applies to your accounts.
        </p>
      </div>
    </div>
  );
}

const inputCls =
  "mt-1 block w-full min-h-12 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3.5 py-3 text-sm text-[var(--ink)] focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/25";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[var(--ink)]">{label}</label>
      {children}
    </div>
  );
}

function StatTile({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
        {label}
      </p>
      <p className="mt-2 font-serif text-xl font-semibold text-[var(--ink)]">{value}</p>
      {note && <p className="mt-1 text-xs text-[var(--ink-soft)]">{note}</p>}
    </div>
  );
}
