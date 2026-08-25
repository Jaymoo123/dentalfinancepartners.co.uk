"use client";

/**
 * SVG charts for the UK Legal Incorporation Index.
 * Dependency-free inline SVG -- no recharts, no new npm dependencies.
 * Uses site CSS variable tokens.
 */

import type { IncorporationYear, SraSnapshot } from "@/lib/research/legal-incorporation-index";

const CHART_H = 220;
const PAD = { top: 24, right: 12, bottom: 40, left: 8 };
const PLOT_W = 560;

function plotH() {
  return CHART_H - PAD.top - PAD.bottom;
}

// ---------------------------------------------------------------------------
// Annual incorporations bar chart
// ---------------------------------------------------------------------------
export function AnnualIncorporationChart({ annual }: { annual: IncorporationYear[] }) {
  if (!annual.length) return null;
  const data = annual.filter((r) => r.total > 0);
  const maxVal = Math.max(...data.map((r) => r.total));
  const ph = plotH();
  const barCount = data.length;
  const groupGap = 6;
  const totalGap = groupGap * (barCount - 1);
  const barW = Math.max(6, Math.floor((PLOT_W - PAD.left - PAD.right - totalGap) / barCount));
  const totalBarsW = barW * barCount + totalGap;
  const leftOff = PAD.left + (PLOT_W - PAD.left - PAD.right - totalBarsW) / 2;
  const scale = (v: number) => (v / maxVal) * ph;

  return (
    <div style={{ height: CHART_H }} aria-hidden="true" className="w-full overflow-hidden">
      <svg
        viewBox={`0 0 ${PLOT_W} ${CHART_H}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
        role="img"
        aria-label="Bar chart of annual law firm incorporations"
      >
        {[0.25, 0.5, 0.75, 1].map((f) => {
          const y = PAD.top + ph - scale(maxVal * f);
          return (
            <line key={f} x1={PAD.left} y1={y} x2={PLOT_W - PAD.right} y2={y}
              stroke="var(--border)" strokeWidth={1} strokeDasharray="4 3" />
          );
        })}
        {data.map((d, i) => {
          const barH = scale(d.total);
          const x = leftOff + i * (barW + groupGap);
          const y = PAD.top + ph - barH;
          return (
            <g key={d.year}>
              <rect x={x} y={y} width={barW} height={Math.max(0, barH)}
                fill="var(--primary)" rx={2} ry={2} opacity={0.85}>
                <title>{d.year}: {d.total.toLocaleString("en-GB")} incorporations</title>
              </rect>
              <text x={x + barW / 2} y={CHART_H - 6} textAnchor="middle"
                fontSize={8} fill="var(--ink-soft)">
                {d.year}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SRA firm structure stacked area (line chart approximation as grouped bars)
// ---------------------------------------------------------------------------
export function SraStructureChart({ series }: { series: SraSnapshot[] }) {
  if (!series.length) return null;
  // Annual July snapshots only (already structured that way)
  const data = series;
  const maxVal = Math.max(...data.map((r) => r.total));
  const ph = plotH();
  const barCount = data.length;
  const groupGap = 4;
  const barW = Math.max(4, Math.floor((PLOT_W - PAD.left - PAD.right - groupGap * (barCount - 1)) / barCount));
  const totalBarsW = barW * barCount + groupGap * (barCount - 1);
  const leftOff = PAD.left + (PLOT_W - PAD.left - PAD.right - totalBarsW) / 2;
  const scale = (v: number) => (v / maxVal) * ph;

  // Stacked bar segments in order: incorporated (primary), llp (secondary), partnership, sole
  const segments: { key: keyof SraSnapshot; color: string; label: string }[] = [
    { key: "incorporated", color: "var(--primary)", label: "Incorporated" },
    { key: "llp", color: "#7c6ff7", label: "LLP" },
    { key: "partnership", color: "#94a3b8", label: "Partnership" },
    { key: "sole", color: "#cbd5e1", label: "Sole practitioner" },
  ];

  return (
    <div style={{ height: CHART_H + 20 }} aria-hidden="true" className="w-full overflow-hidden">
      <svg
        viewBox={`0 0 ${PLOT_W} ${CHART_H + 20}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
        role="img"
        aria-label="Stacked bar chart of SRA firm structure over time"
      >
        {[0.25, 0.5, 0.75, 1].map((f) => {
          const y = PAD.top + ph - scale(maxVal * f);
          return (
            <line key={f} x1={PAD.left} y1={y} x2={PLOT_W - PAD.right} y2={y}
              stroke="var(--border)" strokeWidth={1} strokeDasharray="4 3" />
          );
        })}

        {data.map((d, i) => {
          const x = leftOff + i * (barW + groupGap);
          let stackY = PAD.top + ph;
          return (
            <g key={d.year}>
              {segments.map((seg) => {
                const val = Number(d[seg.key] ?? 0);
                const segH = scale(val);
                stackY -= segH;
                return (
                  <rect key={seg.key} x={x} y={stackY} width={barW} height={Math.max(0, segH)}
                    fill={seg.color} opacity={0.9}>
                    <title>{seg.label}: {val.toLocaleString("en-GB")} ({d.year})</title>
                  </rect>
                );
              })}
              <text x={x + barW / 2} y={CHART_H + 12} textAnchor="middle"
                fontSize={7} fill="var(--ink-soft)">
                {d.year % 2 === 0 ? String(d.year).slice(2) : ""}
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <g transform={`translate(${PAD.left}, ${PAD.top - 10})`}>
          {segments.map((seg, i) => (
            <g key={seg.key} transform={`translate(${i * 110}, 0)`}>
              <rect x={0} y={-8} width={10} height={10} fill={seg.color} rx={1} />
              <text x={14} y={0} fontSize={8} fill="var(--ink-soft)">{seg.label}</text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Survival rate comparison bar chart (2019 cohort, 1/3/5 year)
// ---------------------------------------------------------------------------
export function SurvivalComparisonChart({
  legalPcts,
  allPcts,
  labels,
}: {
  legalPcts: (number | null)[];
  allPcts: (number | null)[];
  labels: string[];
}) {
  const allVals = [...legalPcts, ...allPcts].filter((v): v is number => v !== null);
  const maxVal = Math.max(...allVals, 100);
  const ph = plotH();
  const groupCount = labels.length;
  const groupGap = 18;
  const barGap = 4;
  const barW = Math.max(10, Math.floor((PLOT_W - PAD.left - PAD.right - groupGap * (groupCount - 1)) / (groupCount * 2)));
  const groupW = barW * 2 + barGap;
  const totalW = groupW * groupCount + groupGap * (groupCount - 1);
  const leftOff = PAD.left + (PLOT_W - PAD.left - PAD.right - totalW) / 2;
  const scale = (v: number) => (v / maxVal) * ph;

  return (
    <div style={{ height: CHART_H }} aria-hidden="true" className="w-full overflow-hidden">
      <svg
        viewBox={`0 0 ${PLOT_W} ${CHART_H}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
        role="img"
        aria-label="Survival rate comparison: legal firms vs all industry"
      >
        {[0.25, 0.5, 0.75, 1].map((f) => {
          const y = PAD.top + ph - scale(maxVal * f);
          return (
            <line key={f} x1={PAD.left} y1={y} x2={PLOT_W - PAD.right} y2={y}
              stroke="var(--border)" strokeWidth={1} strokeDasharray="4 3" />
          );
        })}

        {labels.map((label, i) => {
          const groupX = leftOff + i * (groupW + groupGap);
          const legalVal = legalPcts[i];
          const allVal = allPcts[i];
          return (
            <g key={label}>
              {legalVal !== null && (
                <g>
                  <rect x={groupX} y={PAD.top + ph - scale(legalVal)} width={barW}
                    height={Math.max(0, scale(legalVal))} fill="var(--primary)" rx={2} opacity={0.9}>
                    <title>Legal activities {label}: {legalVal.toFixed(1)}%</title>
                  </rect>
                  <text x={groupX + barW / 2} y={PAD.top + ph - scale(legalVal) - 3}
                    textAnchor="middle" fontSize={8} fill="var(--ink)">
                    {legalVal.toFixed(0)}%
                  </text>
                </g>
              )}
              {allVal !== null && (
                <g>
                  <rect x={groupX + barW + barGap} y={PAD.top + ph - scale(allVal)} width={barW}
                    height={Math.max(0, scale(allVal))} fill="#94a3b8" rx={2} opacity={0.9}>
                    <title>All industry {label}: {allVal.toFixed(1)}%</title>
                  </rect>
                  <text x={groupX + barW + barGap + barW / 2} y={PAD.top + ph - scale(allVal) - 3}
                    textAnchor="middle" fontSize={8} fill="var(--ink)">
                    {allVal.toFixed(0)}%
                  </text>
                </g>
              )}
              <text x={groupX + groupW / 2} y={CHART_H - 6} textAnchor="middle"
                fontSize={9} fill="var(--ink-soft)">{label}</text>
            </g>
          );
        })}

        {/* Legend */}
        <g transform={`translate(${PAD.left}, ${PAD.top - 10})`}>
          <rect x={0} y={-8} width={10} height={10} fill="var(--primary)" rx={1} />
          <text x={14} y={0} fontSize={8} fill="var(--ink-soft)">Legal activities (SIC 691)</text>
          <rect x={170} y={-8} width={10} height={10} fill="#94a3b8" rx={1} />
          <text x={184} y={0} fontSize={8} fill="var(--ink-soft)">All industry</text>
        </g>
      </svg>
    </div>
  );
}
