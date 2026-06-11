/**
 * Re-export from the shared SDK. The root layout now composes the shared
 * ConsentProvider directly; this shim keeps internal callers (IntentProvider,
 * ConsentToggle) pointing to the same context without a sweeping import change.
 */
export {
  ConsentProvider,
  useConsent,
} from "@accounting-network/web-shared/analytics/react/ConsentProvider";
