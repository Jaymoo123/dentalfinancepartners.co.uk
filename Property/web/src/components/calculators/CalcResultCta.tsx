"use client";

import { CalcResultCta as SharedCalcResultCta } from "@accounting-network/web-shared/leads/CalcResultCta";
import { niche } from "@/config/niche-loader";
import { siteConfig } from "@/config/site";
import { submitPropertyLead, type PropertyLeadPayload } from "@/lib/leads/submit-client";
import { trackExperimentView, trackExperimentAction } from "@/lib/experiments/exposure";
import type { MiniCaptureConfig, MiniCaptureSubmitFn } from "@accounting-network/web-shared/leads/MiniCapture";

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

export function CalcResultCta(props: {
  campaign: string;
  label?: string;
  experimentKey?: string;
  exposeOnView?: boolean;
}) {
  return (
    <SharedCalcResultCta
      {...props}
      siteConfig={propertyMiniConfig}
      submitLead={propertySubmitLead}
      onExperimentView={trackExperimentView}
      onExperimentAction={trackExperimentAction}
    />
  );
}
