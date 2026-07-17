"use client";

/**
 * Thin site adapter: wires the shared MiniCapture to the Medical site.
 *
 * Consumers import from "@/components/forms/MiniCapture" and get an
 * identical prop surface to the old local component, so no call sites change.
 *
 * Multi-step mode: enabled at deploy via NEXT_PUBLIC_MINIFORMS_MULTISTEP=1
 * (the shared component reads the flag itself). Single-step (default)
 * preserves the existing single-form behaviour and the `role` prop.
 *
 * Brand tokens (navy #001b3d + copper #b87333) come from the site's CSS
 * variables via the className the call sites already pass.
 */
import type { ComponentProps } from "react";
import {
  MiniCapture as SharedMiniCapture,
  type MiniCaptureConfig,
  type MiniCaptureSubmitFn,
} from "@accounting-network/web-shared/leads/MiniCapture";
import {
  trackExperimentView,
  trackExperimentAction,
} from "@accounting-network/web-shared/experiments/react/exposure";
import { niche } from "@/config/niche-loader";
import { siteConfig } from "@/config/site";
import { submitMedicalLead } from "@/lib/leads/submit-client";

const miniCaptureConfig: MiniCaptureConfig = {
  sourceIdentifier: niche.content_strategy.source_identifier, // "medical"
  consentText: siteConfig.leadConsentText,
  nicheId: niche.niche_id, // "medical"
  leadForm: {
    roleLabel: niche.lead_form.role_label,
    roleOptions: niche.lead_form.role_options,
    placeholders: {
      name: niche.lead_form.placeholders.name,
      email: niche.lead_form.placeholders.email,
      phone: niche.lead_form.placeholders.phone,
    },
  },
};

const submitLead: MiniCaptureSubmitFn = async (payload, honeypot) => {
  const result = await submitMedicalLead(payload, honeypot);
  return { success: result.success, error: result.error };
};

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
