/**
 * Contractor Tax Accountants (contractors-ir35) experiment registry.
 *
 * Sibling of property.ts / construction.ts etc. Additive only: this file plus one
 * map entry in registries/index.ts onboards the site into the console's
 * Experiments surface; no shared type/assign/makeUseExperiment changes.
 *
 * Empty at launch: this site does not yet wire the IntentProvider personalisation
 * engine, and experiments must be validated with live probes against real traffic
 * (estate rule), which only exists post-deploy. The console renders the
 * "No experiment results yet" empty state correctly for an empty registry.
 *
 * Post-launch fast-follow: port IntentProvider + behaviour-matched offers
 * (calculator / guide / specialist) from construction.ts and register a
 * "personalization" experiment (control ~25% / treatment ~75%), then live-probe.
 */
import type { SiteExperimentRegistry } from "../types";

export const contractorsRegistry: SiteExperimentRegistry = {
  experiments: [],
  meta: {},
};
