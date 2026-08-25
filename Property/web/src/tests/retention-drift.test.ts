/**
 * Drift guard: RETENTION_MONTHS_BY_SOURCE in src/lib/leads/retention.ts must match
 * `company.enquiry_retention_months` in every site's niche.config.json.
 *
 * The purge runs inside the Property app but the `leads` table is shared, so it
 * cannot read each site's own config at runtime and has to carry a mirror. Each
 * number is what that site publishes in its privacy notice ("We keep enquiry data
 * for N months"), so a mismatch means we are either deleting data we told someone
 * we would keep, or keeping data we told them we would delete. Neither is
 * acceptable, and neither is visible without this test.
 */
import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

import {
  RETENTION_MONTHS_BY_SOURCE,
  MAX_RETENTION_MONTHS,
  MIN_RETENTION_MONTHS,
  retentionCutoffIso,
  isPastRetention,
} from "@/lib/leads/retention";

const HERE = path.dirname(fileURLToPath(import.meta.url));
// tests -> src -> web -> Property -> repo root
const ROOT = path.resolve(HERE, "../../../../");

/** Every directory at the repo root holding a niche.config.json. */
function siteConfigs(): { site: string; months: number }[] {
  const out: { site: string; months: number }[] = [];
  for (const entry of readdirSync(ROOT, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith(".")) continue;
    const cfgPath = path.join(ROOT, entry.name, "niche.config.json");
    if (!existsSync(cfgPath)) continue;
    const cfg = JSON.parse(readFileSync(cfgPath, "utf8")) as {
      company?: { enquiry_retention_months?: number };
    };
    const months = cfg.company?.enquiry_retention_months;
    if (typeof months === "number") out.push({ site: entry.name, months });
  }
  return out;
}

describe("retention mirror", () => {
  it("finds the site configs (guards against a silently empty sweep)", () => {
    expect(siteConfigs().length).toBeGreaterThanOrEqual(15);
  });

  it("matches every site's published retention period", () => {
    for (const { site, months } of siteConfigs()) {
      // Source keys are the lowercase directory name, which is what `leads.source`
      // carries (e.g. "Property" -> "property").
      const key = site.toLowerCase();
      expect(
        RETENTION_MONTHS_BY_SOURCE[key],
        `${site}/niche.config.json says ${months} months; the retention mirror says ` +
          `${RETENTION_MONTHS_BY_SOURCE[key]}. Update the mirror, or the site config, ` +
          `so the purge matches what the privacy notice promises.`,
      ).toBe(months);
    }
  });

  it("keeps the longstop at or under the 24 months the data sharing agreement states", () => {
    expect(MAX_RETENTION_MONTHS).toBeLessThanOrEqual(24);
  });

  it("scans with the SHORTEST period so short-promise leads are not missed", () => {
    // Direction guard for the 2026-08 bug: the purge scan filtered on the
    // LONGEST period (24mo), so a 4-month-old lead on a 3-month promise was
    // never even fetched, while isPastRetention correctly said "purge".
    // The scan cutoff must be at least as inclusive as every site's own cutoff.
    // The short-promise fixture is ashfield: property carried the 3-month promise
    // until 2026-08-17, when it moved to 24 with the rest of the estate.
    const nowMs = Date.parse("2026-08-15T00:00:00Z");
    const scanCutoff = retentionCutoffIso(nowMs, MIN_RETENTION_MONTHS);

    const shortest = Object.entries(RETENTION_MONTHS_BY_SOURCE)
      .reduce((a, b) => (b[1] < a[1] ? b : a));
    expect(shortest[1]).toBe(MIN_RETENTION_MONTHS);

    // A 4-month-old lead on the shortest promise IS past it and MUST pass the
    // scan filter (created_at < scanCutoff)...
    const fourMonthsOld = "2026-04-15T00:00:00.000Z";
    expect(isPastRetention(shortest[0], fourMonthsOld, nowMs)).toBe(true);
    expect(fourMonthsOld < scanCutoff).toBe(true);

    // ...while a 4-month-old dentists lead (24-month promise) passes the scan
    // but is correctly rejected by the per-lead check.
    expect(isPastRetention("dentists", fourMonthsOld, nowMs)).toBe(false);
  });
});
