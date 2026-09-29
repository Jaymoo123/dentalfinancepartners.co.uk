/**
 * @accounting-network/web-shared/support
 *
 * The estate's floating help widget, as ONE implementation. A site supplies a
 * `WidgetConfig` (taxonomy, route rules, openers, copy, class recipes, storage
 * prefix, lead source, submit client) and mounts:
 *
 *   <IntentProvider config={widgetConfig}>
 *     ...
 *     <SpecialistWidget />
 *   </IntentProvider>
 *
 * Import from specific sub-paths for tree-shaking:
 *
 *   import type { WidgetConfig } from "@accounting-network/web-shared/support/types";
 *   import { makeDeriveTopic } from "@accounting-network/web-shared/support/deriveTopic";
 *   import { createJourneyModel } from "@accounting-network/web-shared/support/journeyModel";
 *   import { evaluate } from "@accounting-network/web-shared/support/engine";
 *   import { defaultWidgetClasses } from "@accounting-network/web-shared/support/classes";
 *   import { IntentProvider } from "@accounting-network/web-shared/support/IntentProvider";
 *   import { SpecialistWidget } from "@accounting-network/web-shared/support/SpecialistWidget";
 */

export * from "./types";
export { makeDeriveTopic } from "./deriveTopic";
export { createJourneyModel, profileKey } from "./journeyModel";
export { evaluate, DEFAULT_THRESHOLDS } from "./engine";
export { defaultWidgetClasses } from "./classes";
