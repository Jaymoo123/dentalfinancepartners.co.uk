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

      // 7-day rolling conversion = sum(leads) / sum(humans) over the trailing
      // window, so a single low-traffic day doesn't spike the ratio.
      let leadSum = 0;
      let humanSum = 0;
      for (let k = Math.max(0, bi - (ROLLING_DAYS - 1)); k <= bi; k++) {
        const r = bySite[si].get(buckets[k]);
        leadSum += r?.leads ?? 0;
        humanSum += r?.humans ?? 0;
      }
      cPoint[site.site_key] = humanSum > 0 ? leadSum / humanSum : 0;
    });

    sessions.push(sPoint);
    visitors.push(vPoint);
    conversion.push(cPoint);
  });

  return { series, sessions, visitors, conversion };
}
