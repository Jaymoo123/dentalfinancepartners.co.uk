/**
 * Probate Compass (wills-probate) lead-nurture composition.
 *
 * PLACEHOLDER — Phase 2 builds out the real contactability + detail-capture
 * sequences (see construction-cis/web/src/config/lead-nurture.ts for the
 * pattern to port). Every sequence here has zero steps, so the shared
 * lead-nurture engine has nothing to send; LEAD_NURTURE_ENABLED being unset
 * already gates this at runtime, this file just keeps the build green while
 * the wills-probate sequences do not exist yet.
 *
 * // ponytail: empty sequences, real copy comes with Phase 2 nurture wave.
 */

import type {
  LeadMessageContext,
  LeadNurtureConfig,
  LeadNurtureStateRow,
  NurtureLead,
} from "@accounting-network/web-shared/lead-nurture/config";
import {
  computeMissingContact,
  type MissingContactField,
} from "@accounting-network/web-shared/lead-nurture/lead-nurture-shared";
import { mintLeadToken } from "@accounting-network/web-shared/lead-nurture/tokens";
import { getSiteUrl } from "./niche-loader";

const SEQUENCE_NAME = "wills_probate_contactability";
const DETAIL_CAPTURE_SEQUENCE_NAME = "wills_probate_detail_capture";

export type LeadSequenceVariant = "contactability" | "detail_capture";
export const LEAD_SEQUENCE_NAMES = {
  contactability: SEQUENCE_NAME,
  detail_capture: DETAIL_CAPTURE_SEQUENCE_NAME,
} as const;

export function routePrimarySequence(lead: {
  full_name?: string | null;
  phone?: string | null;
}): string {
  return computeMissingContact(lead).length > 0
    ? DETAIL_CAPTURE_SEQUENCE_NAME
    : SEQUENCE_NAME;
}

export function missingPhraseFor(missing: MissingContactField[]): string {
  const hasName = missing.includes("name");
  const hasPhone = missing.includes("phone");
  if (hasName && hasPhone) return "your name and a phone number";
  if (hasPhone) return "a phone number we can reach you on";
  if (hasName) return "your name";
  return "";
}

export function ctaLabelFor(missing: MissingContactField[] | undefined): string {
  const m = missing ?? [];
  const hasName = m.includes("name");
  const hasPhone = m.includes("phone");
  if (hasName && hasPhone) return "Add your details";
  if (hasPhone) return "Add your number";
  if (hasName) return "Add your name";
  return "Add your details";
}

function base(): string {
  return getSiteUrl().replace(/\/$/, "");
}

/** Minimal, always-valid message context. No steps ever consume it (yet). */
export async function buildLeadMessageContext(
  lead: NurtureLead,
  _state?: LeadNurtureStateRow | null,
): Promise<LeadMessageContext> {
  const b = base();
  const missing = computeMissingContact(lead);
  return {
    firstName: (lead.full_name ?? "").trim().split(/\s+/)[0] || "there",
    bookingUrl: `${b}/book`,
    confirmUrl: `${b}/api/leads/confirm/${mintLeadToken(lead.id, "confirm")}`,
    optOutText: "Reply STOP to opt out.",
    optOutUrl: `${b}/api/leads/optout/${mintLeadToken(lead.id, "optout")}`,
    siteUrl: b,
    missingFields: missing,
    missingPhrase: missingPhraseFor(missing),
  };
}

/** Empty sequence — Phase 2 replaces `steps: []` with the real cadence. */
export function buildCisLeadNurtureConfig(
  variant: LeadSequenceVariant = "contactability",
): LeadNurtureConfig {
  const sequenceName = LEAD_SEQUENCE_NAMES[variant];
  return {
    siteKey: "wills-probate",
    sequenceName,
    steps: [],
  };
}

export function buildCisLeadNurtureConfigs(): LeadNurtureConfig[] {
  return [
    buildCisLeadNurtureConfig("contactability"),
    buildCisLeadNurtureConfig("detail_capture"),
  ];
}

export const LEAD_SEQUENCE_NAME = SEQUENCE_NAME;
