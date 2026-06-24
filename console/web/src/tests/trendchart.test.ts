/**
 * TrendChart render tests (fixture series, no DOM library needed).
 *
 * The component is "use client" but renders fine via renderToStaticMarkup in
 * the node environment: recharts 3 supports SSR when ResponsiveContainer is
 * given an initialDimension (which TrendChart sets). These tests prove the
 * recovered chart renders real chart output from a serialisable TimePoint[]
 * exactly as the trends page passes it across the RSC boundary.
 */
import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import type { TimePoint } from "@accounting-network/web-shared/console/adminData";
import {
  TrendChart,
  formatBucket,
  formatBucketLong,
  buildLeadMarks,
  leadMarkOpacity,
} from "@/components/TrendChart";

const series: TimePoint[] = [
  { bucket: "2026-06-08T00:00:00Z", sessions: 12, humans: 8, events: 40, leads: 1 },
  { bucket: "2026-06-09T00:00:00Z", sessions: 30, humans: 22, events: 95, leads: 0 },
  { bucket: "2026-06-10T00:00:00Z", sessions: 21, humans: 15, events: 60, leads: 2 },
];

function render(props: Partial<Parameters<typeof TrendChart>[0]> = {}) {
  return renderToStaticMarkup(
    createElement(TrendChart, {
      data: series,
      metric: "sessions",
      label: "Sessions · daily",
      formatType: "day",
      ...props,
    }),
  );
}

describe("TrendChart (recovered Property chart, console port)", () => {
  it("renders the card header with label, total and peak from the fixture series", () => {
    const html = render();
    expect(html).toContain("Sessions · daily");
    expect(html).toContain("63 total");
    expect(html).toContain("peak 30");
  });

  it("renders the recharts chart container from the fixture series", () => {
    // recharts 3 paints the SVG surface on hydration; SSR output carries the
    // sized responsive container + wrapper, which proves the chart mounted
    // from the serialisable series without throwing.
    const html = render();
    expect(html).toContain("recharts-responsive-container");
    expect(html).toContain("recharts-wrapper");
  });

  it("switches metric: leads totals computed from the same serialisable rows", () => {
    const html = render({ metric: "leads", label: "Leads · daily" });
    expect(html).toContain("Leads · daily");
    expect(html).toContain("3 total");
    expect(html).toContain("peak 2");
  });

  it("renders the explicit empty state when the series is empty", () => {
    const html = render({ data: [] });
    expect(html).toContain("No data in this window");
    expect(html).not.toContain("recharts-responsive-container");
  });

  it("formats ticks and tooltip headers in en-GB per granularity", () => {
    const iso = "2026-06-08T14:30:00Z";
    expect(formatBucket(iso, "day")).toBe("08 Jun");
    expect(formatBucket(iso, "time")).toMatch(/14:30|15:30/); // UTC vs BST runner
    expect(formatBucketLong(iso, "day")).toContain("Jun 2026");
    expect(formatBucketLong(iso, "hour")).toContain("Mon");
  });
});

describe("TrendChart lead markers", () => {
  // Midday-UTC buckets so the day label is stable on any runner timezone.
  const leadSeries: TimePoint[] = [
    { bucket: "2026-06-08T12:00:00Z", sessions: 5, humans: 4, events: 9, leads: 1 },
    { bucket: "2026-06-09T12:00:00Z", sessions: 8, humans: 6, events: 12, leads: 0 },
    { bucket: "2026-06-10T12:00:00Z", sessions: 7, humans: 5, events: 11, leads: 2 },
  ];

  it("emits one marker per bucket with leads, skipping zero-lead buckets", () => {
    expect(buildLeadMarks(leadSeries, "humans", "day")).toEqual([
      { tick: "08 Jun", count: 1 },
      { tick: "10 Jun", count: 2 },
    ]);
  });

  it("sums leads from rows that collapse to the same tick (hourly shown as day)", () => {
    const hourly: TimePoint[] = [
      { bucket: "2026-06-08T09:00:00Z", sessions: 1, humans: 1, events: 1, leads: 1 },
      { bucket: "2026-06-08T14:00:00Z", sessions: 1, humans: 1, events: 1, leads: 2 },
      { bucket: "2026-06-09T14:00:00Z", sessions: 1, humans: 1, events: 1, leads: 1 },
    ];
    expect(buildLeadMarks(hourly, "sessions", "day")).toEqual([
      { tick: "08 Jun", count: 3 },
      { tick: "09 Jun", count: 1 },
    ]);
  });

  it("draws no lead markers on the leads metric itself (redundant)", () => {
    expect(buildLeadMarks(leadSeries, "leads", "day")).toEqual([]);
  });

  it("stacks opacity: faint for one lead, denser per extra lead, capped", () => {
    expect(leadMarkOpacity(0)).toBe(0);
    expect(leadMarkOpacity(1)).toBeCloseTo(0.22);
    expect(leadMarkOpacity(2)).toBeCloseTo(0.4);
    expect(leadMarkOpacity(3)).toBeCloseTo(0.58);
    expect(leadMarkOpacity(99)).toBe(0.85);
  });
});
