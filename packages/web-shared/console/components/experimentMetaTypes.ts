/**
 * Shared types for experiment metadata.
 *
 * @deprecated Types have moved to packages/web-shared/experiments/types.ts,
 * which is the single source of truth. This module re-exports them for
 * backwards compatibility -- all imports already resolve correctly.
 *
 * ExperimentCards.tsx and any other consumers will continue to work unchanged.
 */
export type {
  ExperimentPrimary,
  ExperimentMeta,
} from "../../experiments/types";
