"use client";

/**
 * Property-specific MiniCapture: wraps the shared component with Property's
 * niche config, submit path, and experiment tracking.
 */
import {
  MiniCapture as SharedMiniCapture,
  type MiniCaptureConfig,
  type MiniCaptureSubmitFn,
} from "@accounting-network/web-shared/leads/MiniCapture";
import { niche } from "@/config/niche-loader";
import { siteConfig } from "@/config/site";
import { submitPropertyLead, type PropertyLeadPayload } from "@/lib/leads/submit-client";
import { trackExperimentView, trackExperimentAction } from "@/lib/experiments/exposure";

const propertyMiniConfig: MiniCaptureConfig = {
  sourceIdentifier: niche.content_strategy.source_identifier,
  consentText: siteConfig.leadConsentText,
  nicheId: niche.niche_id,
  leadForm: {
    roleLabel: niche.lead_form.role_label,
    roleOptions: niche.lead_form.role_options,
    placeholders: niche.lead_form.placeholders,
  },
};

const propertySubmitLead: MiniCaptureSubmitFn = async (payload, honeypot) => {
  return submitPropertyLead(payload as PropertyLeadPayload, honeypot);
};

export function MiniCapture(props: Omit<React.ComponentProps<typeof SharedMiniCapture>, "siteConfig" | "submitLead" | "onExperimentView" | "onExperimentAction">) {
  return (
    <SharedMiniCapture
      {...props}
      siteConfig={propertyMiniConfig}
      submitLead={propertySubmitLead}
      onExperimentView={trackExperimentView}
      onExperimentAction={trackExperimentAction}
    />
  );
}
