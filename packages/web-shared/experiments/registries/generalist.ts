/**
 * Generalist (Holloway Davies) experiment registry.
 *
 * Empty -- no experiments running yet. The console's "No experiment results yet"
 * state is the honest display for this site.
 *
 * When an experiment is ready, add an entry to `experiments` with status "running"
 * and its variants, and add a corresponding entry to `meta`.
 */
import type { SiteExperimentRegistry } from "../types";

export const generalistRegistry: SiteExperimentRegistry = {
  experiments: [],
  meta: {},
};
