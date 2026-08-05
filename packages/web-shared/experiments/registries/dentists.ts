/**
 * Dental Finance Partners experiment registry.
 */
import type { SiteExperimentRegistry } from "../types";

export const dentistsRegistry: SiteExperimentRegistry = {
  experiments: [
    // Self-serve packages painted-door (estate-wide, launched 2026-08-05).
    // Single arm at 100%: the test measures absolute demand, not a comparison;
    // registering it stamps props.exp on every event so the console shows the
    // funnel. Upgrade path to a real holdback: add a "control" variant + weights.
    { key: "pkg_pricing_v1", status: "running", variants: [{ id: "on", weight: 100 }] },
  ],
  meta: {
    pkg_pricing_v1: {
      label: "Self-serve packages (pricing page)",
      controlDesc: "No control arm (single-arm demand test)",
      treatmentDesc: "Priced packages page live at /pricing",
      primary: {
        metricLabel: "Chose a package",
        exposureLabel: "saw the pricing page",
        actionLabel: "clicked a package CTA",
      },
    },
  },
};
