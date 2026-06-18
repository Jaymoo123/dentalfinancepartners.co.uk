/**
 * Estate-wide registry map.
 *
 * Keyed by siteKey (matches the `site_key` column in the sites table and the
 * [siteKey] URL param in the console). The console reads experiment metadata
 * from here instead of the deleted console/web/src/config/experimentMeta.ts.
 *
 * Sites with no experiments have empty registries (experiments: [], meta: {}).
 * The console's "No experiment results yet" empty state handles them correctly.
 */
import type { SiteExperimentRegistry } from "../types";
import { propertyRegistry } from "./property";
import { generalistRegistry } from "./generalist";
import { dentistsRegistry } from "./dentists";
import { medicalRegistry } from "./medical";
import { solicitorsRegistry } from "./solicitors";
import { agencyRegistry } from "./agency";
import { constructionRegistry } from "./construction";
import { contractorsRegistry } from "./contractors";

export const siteRegistries: Record<string, SiteExperimentRegistry> = {
  property: propertyRegistry,
  generalist: generalistRegistry,
  dentists: dentistsRegistry,
  medical: medicalRegistry,
  solicitors: solicitorsRegistry,
  "digital-agency": agencyRegistry,
  "construction-cis": constructionRegistry,
  "contractors-ir35": contractorsRegistry,
};

/**
 * Returns the metadata for an experiment key on a given site, with a graceful
 * fallback for unknown ids.
 *
 * Unknown ids arrive when a new experiment is live in the DB but has not yet
 * been added to the registry. The fallback renders the raw id (title-cased) with
 * generic control/treatment labels so no data is hidden.
 *
 * If siteKey is unknown (no registry exists for it), falls back to the global
 * lookup across all registries, then to the generic fallback.
 */
import type { ExperimentMeta } from "../types";

export function getExperimentMeta(siteKey: string, key: string): ExperimentMeta {
  const registry = siteRegistries[siteKey];
  if (registry) {
    const meta = registry.meta[key];
    if (meta) return meta;
  }
  // Unknown id fallback -- preserves the graceful behaviour the console tests pin.
  return {
    label: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    controlDesc: "Control",
    treatmentDesc: "Treatment",
  };
}
