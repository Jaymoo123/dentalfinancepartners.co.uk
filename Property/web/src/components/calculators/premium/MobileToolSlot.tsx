"use client";

import { MobileToolSlot as SharedMobileToolSlot } from "@accounting-network/web-shared/leads/MobileToolSlot";
import { getTopic, type TopicKey } from "@/lib/intent/taxonomy";
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

export function MobileToolSlot({ topic, label }: { topic: TopicKey; label: string }) {
  const t = getTopic(topic);
  return (
    <SharedMobileToolSlot
      topicKey={topic}
      label={label}
      topicCtaCopy={t?.ctaCopy}
      siteConfig={propertyMiniConfig}
      submitLead={propertySubmitLead}
    />
  );
}
