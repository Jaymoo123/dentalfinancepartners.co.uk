"use client";

/**
 * Property's inline result-capture form: resolves topic copy from Property's
 * taxonomy then renders the shared MiniCapture directly beneath a calculator
 * result. Replaces ResultGateModal (deleted) now that results are never held.
 */
import { usePathname } from "next/navigation";
import { MiniCapture } from "@accounting-network/web-shared/leads/MiniCapture";
import { deriveTopic } from "@/lib/intent/deriveTopic";
import { getTopic } from "@/lib/intent/taxonomy";
import { niche, sourceIdentifier } from "@/config/niche-loader";
import { siteConfig } from "@/config/site";
import { submitPropertyLead, type PropertyLeadPayload } from "@/lib/leads/submit-client";
import type { MiniCaptureConfig, MiniCaptureSubmitFn } from "@accounting-network/web-shared/leads/MiniCapture";

const propertyMiniConfig: MiniCaptureConfig = {
  sourceIdentifier,
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

export function ResultCaptureForm({ campaign }: { campaign: string }) {
  const pathname = usePathname() || "";
  const topic = getTopic(deriveTopic(pathname));
  return (
    <MiniCapture
      formId="calc_result_form"
      messagePrefix={`[Result form: ${campaign}]`}
      heading={topic?.ctaCopy || "Want a specialist to check your figure?"}
      blurb="A calculator gives the shape of the answer. Tell us your situation and a specialist will confirm your exact figure and the legitimate ways to reduce it, with no obligation."
      submitLabel="Get my figure confirmed"
      successText="Sent. Check your email and phone now, we have just messaged you to arrange your free review."
      className="mt-4"
      messagePlaceholder="The more detail the better. Tell us about your situation, rough figures, and what you're trying to work out. A couple of sentences is ideal."
      siteConfig={propertyMiniConfig}
      submitLead={propertySubmitLead}
    />
  );
}
