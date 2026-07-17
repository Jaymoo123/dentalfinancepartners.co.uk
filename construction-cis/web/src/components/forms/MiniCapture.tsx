"use client";

/**
 * Site-bound wrapper around the shared MiniCapture component.
 * Injects Trade Tax Specialists config + submit fn so all call-sites
 * import from this path unchanged. Do not add logic here — extend shared.
 *
 * Multi-step mode: enabled at deploy via NEXT_PUBLIC_MINIFORMS_MULTISTEP=1.
 * Single-step (default) preserves the existing single-role behaviour.
 * Trade-type segment options come from niche.lead_form (CIS-specific roles).
 */
import type { ComponentProps } from "react";
import {
  MiniCapture as SharedMiniCapture,
  type MiniCaptureConfig,
  type MiniCaptureSubmitFn,
} from "@accounting-network/web-shared/leads/MiniCapture";
import { niche } from "@/config/niche-loader";
import { siteConfig } from "@/config/site";
import { submitCisLead } from "@/lib/leads/submit-client";
import {
  trackExperimentView,
  trackExperimentAction,
} from "@accounting-network/web-shared/experiments/react/exposure";

const miniCaptureConfig: MiniCaptureConfig = {
  sourceIdentifier: niche.content_strategy.source_identifier, // "construction-cis"
  consentText: siteConfig.leadConsentText,
  nicheId: niche.niche_id, // "construction-cis"
  leadForm: {
    roleLabel: niche.lead_form.role_label, // "I am a..."
    roleOptions: niche.lead_form.role_options, // CIS segments (subcontractor / contractor / etc.)
    placeholders: {
      name: niche.lead_form.placeholders.name,
      email: niche.lead_form.placeholders.email,
      phone: niche.lead_form.placeholders.phone,
    },
  },
};

const submitLead: MiniCaptureSubmitFn = (payload, honeypot) =>
  submitCisLead(payload, honeypot);

export function MiniCapture(
  props: Omit<
    ComponentProps<typeof SharedMiniCapture>,
    "siteConfig" | "submitLead" | "onExperimentView" | "onExperimentAction"
  >,
) {
  return (
    <SharedMiniCapture
      {...props}
      siteConfig={miniCaptureConfig}
      submitLead={submitLead}
      onExperimentView={trackExperimentView}
      onExperimentAction={trackExperimentAction}
    />
  );
}
