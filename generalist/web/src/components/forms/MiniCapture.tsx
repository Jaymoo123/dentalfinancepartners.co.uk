"use client";

/**
 * Generalist (Holloway Davies) mini lead capture.
 * Thin wrapper: injects site config + submit function into the shared
 * MiniCapture so callers need no changes.
 *
 * Multi-step flow activates when NEXT_PUBLIC_MINIFORMS_MULTISTEP=1.
 */
import {
  MiniCapture as SharedMiniCapture,
  type MiniCaptureConfig,
  type MiniCaptureSubmitFn,
  type MiniCaptureSubmitResult,
} from "@accounting-network/web-shared/leads/MiniCapture";
import {
  trackExperimentView,
  trackExperimentAction,
} from "@accounting-network/web-shared/experiments/react/exposure";
import { niche } from "@/config/niche-loader";
import { siteConfig } from "@/config/site";
import { submitGeneralistLead } from "@/lib/leads/submit-client";

const miniConfig: MiniCaptureConfig = {
  sourceIdentifier: niche.content_strategy.source_identifier,
  consentText: siteConfig.leadConsentText,
  nicheId: niche.niche_id,
  leadForm: {
    roleLabel: niche.lead_form.role_label,
    roleOptions: niche.lead_form.role_options as { value: string; label: string }[],
    placeholders: {
      name: niche.lead_form.placeholders.name,
      email: niche.lead_form.placeholders.email,
      phone: niche.lead_form.placeholders.phone,
    },
  },
};

const submitLead: MiniCaptureSubmitFn = async (
  payload,
  honeypot,
): Promise<MiniCaptureSubmitResult> => {
  const result = await submitGeneralistLead(payload, honeypot);
  return { success: result.success, error: result.error };
};

type SharedProps = Parameters<typeof SharedMiniCapture>[0];

export function MiniCapture(props: Omit<SharedProps, "siteConfig" | "submitLead" | "onExperimentView" | "onExperimentAction">) {
  return (
    <SharedMiniCapture
      {...props}
      siteConfig={miniConfig}
      submitLead={submitLead}
      onExperimentView={trackExperimentView}
      onExperimentAction={trackExperimentAction}
    />
  );
}
