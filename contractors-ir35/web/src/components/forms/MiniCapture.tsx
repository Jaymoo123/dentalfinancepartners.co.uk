"use client";

/**
 * Thin site adapter: wires the shared MiniCapture to Contractor Tax Accountants.
 *
 * Consumers import from "@/components/forms/MiniCapture" and get an identical
 * prop surface to the old local component, so no call sites change (ResourceGate,
 * InlineMiniLeadForm, CalcResultCta, MobileToolSlot, ResultGateModal, ExitIntentModal).
 *
 * Multi-step mode: enabled at deploy via NEXT_PUBLIC_MINIFORMS_MULTISTEP=1 (the
 * shared component reads the flag). Single-step (default/unset) preserves the
 * existing single-role behaviour via the `role` prop. Petrol-cyan (#0e7490) +
 * amber palette drives through --brand-primary. Do not add logic here; extend shared.
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
import { submitContractorLead } from "@/lib/leads/submit-client";

const miniCaptureConfig: MiniCaptureConfig = {
  sourceIdentifier: niche.content_strategy.source_identifier, // "contractors-ir35"
  consentText: siteConfig.leadConsentText,
  nicheId: niche.niche_id, // "contractors-ir35"
  leadForm: {
    // IR35-vertical segment: inside/outside IR35, umbrella, going limited, director review, other.
    roleLabel: niche.lead_form.role_label,
    roleOptions: niche.lead_form.role_options,
    placeholders: {
      name: niche.lead_form.placeholders.name,
      email: niche.lead_form.placeholders.email,
      phone: niche.lead_form.placeholders.phone,
    },
  },
};

const submitLead: MiniCaptureSubmitFn = (payload, honeypot) =>
  submitContractorLead(payload, honeypot);

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
