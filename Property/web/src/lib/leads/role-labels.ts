/**
 * Role label lookup and form surface label utilities.
 *
 * Provides human-readable labels for the lead form's role options and the
 * form surface identifiers stored in extras.form_id.
 *
 * No React. Pure functions. Used by email builders, AI prompts, and sequence gen.
 *
 * Imports the raw niche.config.json directly (not via @/config/niche-loader) so
 * test suites that mock the loader are unaffected and there is no circular
 * dependency risk in email-builder paths, while the labels stay single-sourced.
 */

import nicheConfigJson from "../../../../niche.config.json";

const ROLE_OPTION_MAP: Record<string, string> = Object.fromEntries(
  (nicheConfigJson.lead_form?.role_options ?? []).map((o: { value: string; label: string }) => [o.value, o.label]),
);

/**
 * Returns the display label for a role option value.
 * Falls back to the raw value verbatim for legacy/unknown values (e.g. "landlord",
 * "resource", server-default "Other") so they never render blank.
 */
export function roleLabel(value: string | null | undefined): string {
  if (value == null || value === "") return "";
  return ROLE_OPTION_MAP[value] ?? value;
}

/** Human-readable names for lead capture surfaces keyed by extras.form_id. */
export const SURFACE_LABELS: Record<string, string> = {
  lead_form: "Contact form (full enquiry)",
  exit_intent: "Exit intent form",
  exit_intent_form: "Exit intent form",
  inline_mini: "In-article form",
  calc_result: "Calculator result form",
  calc_result_gate: "Calculator result gate",
  mobile_tool: "Mobile calculator form",
  resource_block: "Resource form",
  specialist_widget: "Ask a specialist widget",
};

/**
 * Returns the display label for a form surface identifier.
 * Falls back to the raw formId string for unknown surfaces.
 * Returns null when formId is absent.
 */
export function surfaceLabel(formId: string | null | undefined): string | null {
  if (!formId) return null;
  return SURFACE_LABELS[formId] ?? formId;
}
