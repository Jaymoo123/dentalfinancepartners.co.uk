import type { ReactNode } from "react";
import type { ForecastMonth, LeadMonth } from "@/lib/estate/snapshot";
import { fmtNum, monthLabel } from "@/lib/estate/snapshot";
import { ChartFigure, VisuallyHiddenTable } from "./FigureCaption";
import {
  HAIRLINE,
  HAIRLINE_STRONG,
  INK,
  INK_45,
  NAVY,
  NAVY_08,
  NAVY_RAW,
  PAPER,
  niceMax,
} from "./chartTokens";

/**
 * Hero chart: historical monthly leads (ink line, single allowed 8%->0% navy
 * fade) plus Poisson forecast (navy dashed mid line, flat navy-08 band, hairline
 * at "today"). Server component; complete without JS (draw-in class only).
 */
export function MonthlyLeadsChart({
  monthly,
  forecast,
  ariaLabel,
  fig,
  caption,
  source,
}: {
  monthly: LeadMonth[];
  forecast: ForecastMonth[];
  ariaLabel: string;
  fig?: number;
  caption?: ReactNode;
  source?: string;
}) {
  const W = 840;
  const H = 360; // ~21:9 desktop via viewBox
  const padL = 44;
  const padR = 20;
  const padT = 24;
  const padB = 34;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const hist = monthly;
  const lastHist = hist[hist.length - 1];
  // Forecast months that extend beyond history (pipeline may repeat the
  // current month; the chart joins from the actual terminal point instead).
  const fc = forecast.filter((f) => !lastHist || f.month > lastHist.month);

  const allMonths = [...hist.map((d) => d.month), ...fc.map((f) => f.month)];
  const n = allMonths.length;
  const maxV = niceMax(
    Math.max(1, ...hist.map((d) => d.count), ...fc.map((f) => f.high))
  );

  const x = (i: number) => padL + (n <= 1 ? plotW / 2 : (i / (n - 1)) * plotW);
  const y = (v: number) => padT + plotH - (v / maxV) * plotH;

  const histPath = hist
    .map((d, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(d.count).toFixed(1)}`)
    .join(" ");
  const areaPath =
    hist.length > 1
      ? `${histPath} L ${x(hist.length - 1).toFixed(1)} ${(padT + plotH).toFixed(1)} L ${x(0).toFixed(1)} ${(padT + plotH).toFixed(1)} Z`
      : "";

  const todayIdx = hist.length - 1;
  // Forecast mid line joins from the terminal historical point.
  const fcLine = lastHist
    ? [{ i: todayIdx, v: lastHist.count }, ...fc.map((f, k) => ({ i: todayIdx + 1 + k, v: f.mid }))]
    : [];
  const fcPath = fcLine
    .map((p, k) => `${k === 0 ? "M" : "L"} ${x(p.i).toFixed(1)} ${y(p.v).toFixed(1)}`)
    .join(" ");
  // Band polygon: join point -> highs -> lows (reversed) -> back to join.
  const bandPts = lastHist
    ? [
        `${x(todayIdx).toFixed(1)},${y(lastHist.count).toFixed(1)}`,
        ...fc.map((f, k) => `${x(todayIdx + 1 + k).toFixed(1)},${y(f.high).toFixed(1)}`),
        ...[...fc].reverse().map((f, k) => `${x(todayIdx + fc.length - k).toFixed(1)},${y(f.low).toFixed(1)}`),
      ].join(" ")
    : "";

  const yTicks = 4;
  const ticks = Array.from({ length: yTicks + 1 }, (_, i) => (maxV / yTicks) * i);
  const labelEvery = Math.max(1, Math.ceil(n / 8));

  return (
    <ChartFigure fig={fig} caption={caption} source={source}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={ariaLabel}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", height: "auto", minHeight: 220, display: "block" }}
      >
        <defs>
          <linearGradient id="mlc-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={NAVY_RAW} stopOpacity={0.08} />
            <stop offset="100%" stopColor={NAVY_RAW} stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* Horizontal hairline gridlines only; labels top-left on the gridline */}
        {ticks.map((t, i) => (
          <g key={i}>
            <line
              x1={padL}
              y1={y(t)}
              x2={W - padR}
              y2={y(t)}
              stroke={t === 0 ? HAIRLINE_STRONG : HAIRLINE}
              strokeWidth={1}
            />
            {t > 0 ? (
              <text
                x={padL}
                y={y(t) - 5}
                fontSize={11}
                fill={INK_45}
                style={{ fontVariantNumeric: "tabular-nums lining-nums" }}
              >
                {fmtNum(t)}
              </text>
            ) : null}
          </g>
        ))}

        {/* Forecast band: flat navy-08 polygon, no border */}
        {bandPts ? <polygon points={bandPts} fill={NAVY_08} stroke="none" /> : null}

        {/* Historical area fade (hero-only allowance) + ink line */}
        {areaPath ? <path d={areaPath} fill="url(#mlc-fade)" stroke="none" /> : null}
        {hist.length > 1 ? (
          <path
            d={histPath}
            fill="none"
            stroke={INK}
            strokeWidth={1.5}
            pathLength={1}
            className="chart-draw"
          />
        ) : null}

        {/* Forecast mid line: navy dashed 2 6 */}
        {fcLine.length > 1 ? (
          <path d={fcPath} fill="none" stroke={NAVY} strokeWidth={1.5} strokeDasharray="2 6" />
        ) : null}

        {/* "Today" hairline + small-caps forecast tag */}
        {lastHist && fc.length > 0 ? (
          <g>
            <line
              x1={x(todayIdx)}
              y1={padT}
              x2={x(todayIdx)}
              y2={padT + plotH}
              stroke={HAIRLINE_STRONG}
              strokeWidth={1}
            />
            <text
              x={x(todayIdx) + 6}
              y={padT + 12}
              fontSize={10}
              fill={INK_45}
              style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}
            >
              forecast
            </text>
          </g>
        ) : null}

        {/* Terminal historical point: 4px navy dot, 2px paper ring */}
        {lastHist ? (
          <circle
            cx={x(todayIdx)}
            cy={y(lastHist.count)}
            r={4}
            fill={NAVY}
            stroke={PAPER}
            strokeWidth={2}
          />
        ) : null}

        {/* X labels */}
        {allMonths.map((m, i) =>
          i % labelEvery === 0 || i === n - 1 ? (
            <text
              key={m}
              x={x(i)}
              y={H - padB + 18}
              textAnchor="middle"
              fontSize={11}
              fill={INK_45}
              style={{ fontVariantNumeric: "tabular-nums lining-nums" }}
            >
              {monthLabel(m)}
            </text>
          ) : null
        )}
      </svg>
      <VisuallyHiddenTable
        caption={ariaLabel}
        headers={["Month", "Leads", "Forecast (low)", "Forecast (mid)", "Forecast (high)"]}
        rows={[
          ...hist.map((d) => [monthLabel(d.month), fmtNum(d.count), "", "", ""]),
          ...fc.map((f) => [monthLabel(f.month), "", fmtNum(f.low), fmtNum(f.mid), fmtNum(f.high)]),
        ]}
      />
    </ChartFigure>
  );
}
