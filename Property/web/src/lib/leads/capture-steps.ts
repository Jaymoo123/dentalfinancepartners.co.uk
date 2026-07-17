/**
 * Re-exports the shared capture-steps module.
 * Property-local constants are now the shared defaults (20 chars / 4 words).
 * Internal Property imports of this module continue to work unchanged.
 */
export {
  MINI_MESSAGE_MIN_CHARS,
  MINI_MESSAGE_MIN_WORDS,
  OTHER_ROLE_VALUE,
  ROLE_DETAIL_MAX_CHARS,
  validateStep1,
  validateStep2,
  buildRoleExtras,
  buildThankYouUrl,
  isSafeReturnPath,
  miniformsMultistepEnabled,
} from "@accounting-network/web-shared/leads/capture-steps";

export type { StepDirection, Step1Values, Step2Values } from "@accounting-network/web-shared/leads/capture-steps";
