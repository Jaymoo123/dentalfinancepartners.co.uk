/**
 * Guard for the ten `/research` charts: every value a chart draws must be
 * reachable as text, and must sit OUTSIDE every subtree the accessibility tree
 * drops.
 *
 * Two attributes produce that behaviour and neither is checked by proxy here:
 *
 *   `aria-hidden="true"` removes the element AND its entire subtree from the
 *   accessibility tree. A value nested anywhere inside the hidden chart wrapper
 *   is therefore unreachable however plainly it is written in the HTML, which
 *   is why this test locates each hidden subtree by index and asserts the value
 *   appears somewhere outside all of them, not merely that it appears.
 *
 *   `role="img"` collapses its subtree to a single leaf, so a chart carrying it
 *   exposes its accessible name and nothing else. There must be none. recharts'
 *   `accessibilityLayer` prop also sets `role="application"` plus `tabIndex=0`
 *   on the svg surface, which would put a focus stop inside an `aria-hidden`
 *   subtree, so that prop must stay off these charts too.
 *
 * The values asserted are read from the committed snapshots, so this test also
 * fails if a chart quietly stops rendering the data it is given.
 */

import { readFileSync } from "fs";
import path from "path";

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  DensityByRegionChart,
  LocationCountByRegionChart,
} from "@/components/research/DentalDensityCharts";
import {
  NationalActivityChart,
  RecoveryIndexChart,
  RegionalRecoveryChart,
} from "@/components/research/DentalActivityCharts";
import {
  EarningsTimeSeriesChart,
  EarningsBreakdownChart,
} from "@/components/research/DentalEarningsCharts";
import {
  AnnualFormationChart,
  MonthlyFormationChart,
  SeasonalityChart,
} from "@/components/research/DentalFormationCharts";
import type { DentalActivitySnapshot } from "@/lib/research/dental-activity-index";
import type { DentalCompanyFormationSnapshot } from "@/lib/research/dental-company-formation-index";
import type { DentalEarningsSnapshot } from "@/lib/research/dental-earnings-index";
import type { DentalPracticeDensitySnapshot } from "@/lib/research/dental-practice-density";
import activityRaw from "@/data/nhs-dental-activity-index.json";
import earningsRaw from "@/data/nhs-dental-earnings-index.json";
import densityRaw from "@/data/dental-practice-density.json";
import formationRaw from "@/data/dental-company-formation-index.json";

const activity = activityRaw as unknown as DentalActivitySnapshot;
const earnings = earningsRaw as unknown as DentalEarningsSnapshot;
const density = densityRaw as unknown as DentalPracticeDensitySnapshot;
const formation = formationRaw as unknown as DentalCompanyFormationSnapshot;

const CHART_SOURCES = [
  "DentalActivityCharts.tsx",
  "DentalDensityCharts.tsx",
  "DentalEarningsCharts.tsx",
  "DentalFormationCharts.tsx",
].map((f) => path.resolve(__dirname, "../components/research", f));

/** Ranges of the rendered markup that an `aria-hidden` ancestor removes from
 *  the accessibility tree, found by walking the tags and tracking depth. */
function hiddenRanges(html: string): Array<[number, number]> {
  const ranges: Array<[number, number]> = [];
  const tag = /<(\/?)([a-zA-Z][-a-zA-Z0-9]*)((?:"[^"]*"|'[^']*'|[^>"'])*?)(\/?)>/g;
  const stack: Array<{ name: string; hidden: boolean; start: number }> = [];
  const VOID = new Set(["br", "hr", "img", "input", "meta", "link", "source", "path", "circle", "rect", "line", "polyline", "polygon", "stop", "use", "ellipse"]);
  let m: RegExpExecArray | null;
  while ((m = tag.exec(html))) {
    const [full, close, name, attrs, selfClose] = m;
    if (close) {
      const open = stack.pop();
      if (open?.hidden) ranges.push([open.start, m.index + full.length]);
      continue;
    }
    if (selfClose || VOID.has(name.toLowerCase())) continue;
    stack.push({
      name,
      hidden: /\saria-hidden(=["']?(true|)["']?)?(\s|$)/.test(attrs + " "),
      start: m.index,
    });
  }
  return ranges;
}

function assertReachable(html: string, values: string[]) {
  const hidden = hiddenRanges(html);
  for (const value of values) {
    const positions: number[] = [];
    for (let i = html.indexOf(value); i !== -1; i = html.indexOf(value, i + 1)) positions.push(i);
    expect(positions.length, `"${value}" never rendered`).toBeGreaterThan(0);
    const reachable = positions.some((p) => !hidden.some(([s, e]) => p >= s && p < e));
    expect(reachable, `"${value}" renders only inside an aria-hidden subtree`).toBe(true);
  }
}

function render(element: Parameters<typeof renderToStaticMarkup>[0]): string {
  return renderToStaticMarkup(element);
}

describe("research charts expose their values to assistive technology", () => {
  const cases: Array<{ name: string; html: () => string; values: string[] }> = [
    {
      name: "DensityByRegionChart",
      html: () =>
        render(createElement(DensityByRegionChart, { regions: density.regions.filter((r) => r.per_100k !== null) })),
      values: ["London", "26.2", "North East", "16.8"],
    },
    {
      name: "LocationCountByRegionChart",
      html: () => render(createElement(LocationCountByRegionChart, { regions: density.regions })),
      values: ["London", "2,397", "North East", "461"],
    },
    {
      name: "NationalActivityChart",
      html: () => render(createElement(NationalActivityChart, { monthly: activity.series.national })),
      values: ["Mar 2026", "6,621,885"],
    },
    {
      name: "RecoveryIndexChart",
      html: () => render(createElement(RecoveryIndexChart, { monthly: activity.series.national })),
      values: ["Mar 2026", "103.5"],
    },
    {
      name: "RegionalRecoveryChart",
      html: () => render(createElement(RegionalRecoveryChart, { regional: activity.series.regional })),
      values: ["Greater Manchester", "4,522,272"],
    },
    {
      name: "EarningsTimeSeriesChart",
      html: () => render(createElement(EarningsTimeSeriesChart, { series: earnings.timeseries_england })),
      values: ["2024/25", "£167,500", "£84,500", "£83,000"],
    },
    {
      name: "EarningsBreakdownChart",
      html: () => render(createElement(EarningsBreakdownChart, { series: earnings.timeseries_england })),
      values: ["Gross earnings", "£167,500", "Net income", "£83,000"],
    },
    {
      name: "AnnualFormationChart",
      html: () => render(createElement(AnnualFormationChart, { annual: formation.incorporations.annual })),
      values: ["2016", "950", "2025", "2,272"],
    },
    {
      name: "MonthlyFormationChart",
      html: () =>
        render(
          createElement(MonthlyFormationChart, {
            monthly: formation.incorporations.monthly,
            provisionalMonths: formation.meta.provisional_months,
          }),
        ),
      values: ["Mar 2026", "306", "Provisional", "Settled"],
    },
    {
      name: "SeasonalityChart",
      html: () =>
        render(
          createElement(SeasonalityChart, {
            data: [
              { month: "Mar", avg: 165, isMarch: true },
              { month: "Dec", avg: 113, isMarch: false },
            ],
          }),
        ),
      values: ["Mar", "165", "Dec", "113"],
    },
  ];

  for (const c of cases) {
    it(`${c.name} renders its values outside every aria-hidden subtree`, () => {
      const html = c.html();
      assertReachable(html, c.values);
    });

    it(`${c.name} emits no role that collapses or captures its subtree`, () => {
      const html = c.html();
      expect(html).not.toContain('role="img"');
      expect(html).not.toContain('role="application"');
    });
  }

  // The rendered assertion above cannot see recharts' own role: recharts draws
  // nothing at all until it has measured a non-zero width, so no svg surface
  // exists in server markup and `role="application"` could not appear there even
  // if `accessibilityLayer` were set. The prop is therefore asserted at source,
  // which is where the decision is made, and the trace that makes the assertion
  // meaningful is recharts/lib/container/RootSurface.js: role and tabIndex are
  // set if and only if the accessibility layer is on.
  it("no research chart turns recharts' accessibilityLayer on", () => {
    for (const file of CHART_SOURCES) {
      const source = readFileSync(file, "utf8");
      expect(source, `${file} sets accessibilityLayer`).not.toMatch(/^\s*accessibilityLayer\s*$/m);
      expect(source, `${file} sets a role`).not.toMatch(/\brole=/);
    }
  });

  it("every research chart marks its svg wrapper aria-hidden", () => {
    for (const file of CHART_SOURCES) {
      const source = readFileSync(file, "utf8");
      const containers = source.match(/<ChartContainer/g) ?? [];
      const hidden = source.match(/<ChartContainer aria-hidden/g) ?? [];
      expect(hidden.length, `${file} has an unhidden ChartContainer`).toBe(containers.length);
      expect(containers.length).toBeGreaterThan(0);
    }
  });

  it("the hidden-range walker actually finds hidden subtrees", () => {
    // The guard is only worth anything if it can tell hidden from visible, so
    // prove the mechanism on a known-bad shape before trusting it above.
    const bad = '<div aria-hidden="true"><span>4,522,272</span></div>';
    expect(() => assertReachable(bad, ["4,522,272"])).toThrow();
    const good = '<span>4,522,272</span><div aria-hidden="true"><svg></svg></div>';
    expect(() => assertReachable(good, ["4,522,272"])).not.toThrow();
  });
});
