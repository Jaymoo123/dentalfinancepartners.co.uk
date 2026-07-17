"use client";

/**
 * Property ResultGateModal: resolves topic copy from Property's taxonomy then
 * delegates to the shared ResultGateModal.
 */
import { usePathname } from "next/navigation";
import { ResultGateModal as SharedResultGateModal } from "@accounting-network/web-shared/leads/ResultGateModal";
import { deriveTopic } from "@/lib/intent/deriveTopic";
import { getTopic } from "@/lib/intent/taxonomy";
import { niche } from "@/config/niche-loader";
import { siteConfig } from "@/config/site";
import { submitPropertyLead, type PropertyLeadPayload } from "@/lib/leads/submit-client";
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

export function ResultGateModal({
  campaign,
  onReveal,
}: {
  campaign: string;
  onReveal: () => void;
}) {
  const pathname = usePathname() || "";
  const topic = getTopic(deriveTopic(pathname));
  return (
    <SharedResultGateModal
      campaign={campaign}
      onReveal={onReveal}
      topicCtaCopy={topic?.ctaCopy}
      siteConfig={propertyMiniConfig}
      submitLead={propertySubmitLead}
    />
  );
}
