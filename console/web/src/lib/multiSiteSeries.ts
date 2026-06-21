/**
 * Pivots per-site daily timeseries (one web_timeseries call per site) into the
 * shape the MultiSiteTrendChart wants: one row per day, one numeric column per
 * site. Produces three datasets — sessions, visitors, and a 7-day rolling
 * conversion (visitors -> leads) — plus the series metadata (label + colour).
 *
 * Pure / server-side. Works for one site (single line) or all sites (overlay).
 *
 * Note: visitors (humans) are GB-scoped to match the cards; leads are
 * all-country (web_timeseries decouples leads from country), so the conversion
 * line reads "all-country leads per GB visitor" — same convention as the
 * existing per-site ConversionRateChart.
 */
import type { TimePoint } from "@accounting-network/web-shared/console/adminData";

export type SeriesMeta = { key: string; label: string; color: string };
export type MultiPoint = { bucket: string; [siteKey: string]: number | string };

// Distinct, reasonably accessible line colours, cycled by site order.
const PALETTE = [
  "#059669", // emerald
  "#4f46e5", // indigo
  "#7c3aed", // violet
  "#e11d48", // rose
  "#d97706", // amber
  "#0284c7", // sky
  "#0d9488", // teal
  "#c026d3", // fuchsia
];

const ROLLING_DAYS = 7;

export type MultiSiteSeries = {
  series: SeriesMeta[];
  sessions: MultiPoint[];
  visitors: MultiPoint[];
  conversion: MultiPoint[];
};

/**
 * @param sites   active sites in display order (drives colour + legend)
 * @param perSite perSite[i] = the daily TimePoint[] for sites[i]
 */
export function buildMultiSiteSeries(
  sites: { site_key: string; display_name: string }[],
  perSite: TimePoint[][],
  perSiteFunnel: Array<Array<{ date: string; sessions: number; converted_sessions: number }>>,
): MultiSiteSeries {
  const series: SeriesMeta[] = sites.map((s, i) => ({
    key: s.site_key,
    label: s.display_name,
    color: PALETTE[i % PALETTE.length],
  }));

  // Union of all day-buckets across sites, sorted ascending.
  const bucketSet = new Set<string>();
  for (const rows of perSite) for (const r of rows) bucketSet.add(r.bucket);
  const buckets = Array.from(bucketSet).sort();

  // Index each site's rows by bucket for O(1) lookup.
  const bySite = perSite.map((rows) => {
    const m = new Map<string, TimePoint>();
    for (const r of rows) m.set(r.bucket, r);
    return m;
  });

  // Funnel (GB) indexed by YYYY-MM-DD — drives the bounded conversion rate.
  const funnelBySite = perSiteFunnel.map((rows) => {
    const m = new Map<string, { converted_sessions: number; sessions: number }>();
    for (const r of rows) {
      m.set(r.date.slice(0, 10), { converted_sessions: r.converted_sessions, sessions: r.sessions });
    }
    return m;
  });

  const sessions: MultiPoint[] = [];
  const visitors: MultiPoint[] = [];
  const conversion: MultiPoint[] = [];

  buckets.forEach((b, bi) => {
    const sPoint: MultiPoint = { bucket: b };
    const vPoint: MultiPoint = { bucket: b };
    const cPoint: MultiPoint = { bucket: b };

    sites.forEach((site, si) => {
      const row = bySite[si].get(b);
      sPoint[site.site_key] = row?.sessions ?? 0;
      vPoint[site.site_key] = row?.humans ?? 0;

      // 7-day rolling conversion = converted sessions / sessions (GB, stitched).
      // Bounded 0-100% by construction, unlike all-country-leads / GB-visitors
      // which can exceed 100% on low-traffic days.
      let convSum = 0;
      let sessSum = 0;
      for (let k = Math.max(0, bi - (ROLLING_DAYS - 1)); k <= bi; k++) {
        const fr = funnelBySite[si].get(buckets[k].slice(0, 10));
        convSum += fr?.converted_sessions ?? 0;
        sessSum += fr?.sessions ?? 0;
      }
      cPoint[site.site_key] = sessSum > 0 ? convSum / sessSum : 0;
    });

    sessions.push(sPoint);
    visitors.push(vPoint);
    conversion.push(cPoint);
  });

  return { series, sessions, visitors, conversion };
}

/**
 * Weekly average daily visitors, all-time. Each output point is one ISO week
 * (Mon-Sun); its value is that week's MEAN visitors per day. Only calendar days
 * inside the data window count, so the first/last partial weeks aren't diluted,
 * while genuine zero-traffic mid-period days correctly count as 0. One series;
 * render with MultiSiteTrendChart. Accepts estate or per-site daily series.
 */
export function buildWeeklyAvgVisitors(
  daily: Array<{ bucket: string; humans: number }>,
  seriesKey: string,
  seriesLabel: string,
  color: string,
): { series: SeriesMeta[]; points: MultiPoint[] } {
  const series: SeriesMeta[] = [{ key: seriesKey, label: seriesLabel, color }];
  if (daily.length === 0) return { series, points: [] };

  const DAY = 86_400_000;
  const byDay = new Map<number, number>();
  let minDay = Infinity;
  let maxDay = -Infinity;
  for (const r of daily) {
    const d = new Date(r.bucket);
    const dayMs = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    byDay.set(dayMs, (byDay.get(dayMs) ?? 0) + r.humans);
    if (dayMs < minDay) minDay = dayMs;
    if (dayMs > maxDay) maxDay = dayMs;
  }

  // Monday (UTC) of the week containing a given day.
  const mondayOf = (ms: number) => {
    const dow = (new Date(ms).getUTCDay() + 6) % 7; // 0 = Mon .. 6 = Sun
    return ms - dow * DAY;
  };

  const points: MultiPoint[] = [];
  for (let weekStart = mondayOf(minDay); weekStart <= mondayOf(maxDay); weekStart += 7 * DAY) {
    let sum = 0;
    let days = 0;
    for (let d = weekStart; d < weekStart + 7 * DAY; d += DAY) {
      if (d < minDay || d > maxDay) continue; // only days within the data window
      sum += byDay.get(d) ?? 0;
      days += 1;
    }
    if (days > 0) {
      const p: MultiPoint = { bucket: new Date(weekStart).toISOString() };
      p[seriesKey] = Math.round(sum / days);
      points.push(p);
    }
  }
  return { series, points };
}
