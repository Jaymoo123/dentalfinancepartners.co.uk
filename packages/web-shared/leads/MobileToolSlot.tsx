"use client";

/**
 * Mobile tool slot. Premium tools are desktop-only; on mobile this slot
 * provides a topic-aware qualified capture so mobile intent converts instead
 * of bouncing. Rendered inside PremiumUpgrade's mobile-only (sm:hidden) block.
 *
 * topicKey and topicCtaCopy are passed by the caller (who has access to the
 * site-specific taxonomy). This component never imports site-specific registries.
 */
import type { MiniCaptureConfig, MiniCaptureSubmitFn } from "./MiniCapture";
import { MiniCapture } from "./MiniCapture";

export function MobileToolSlot({
  topicKey,
  label,
  topicCtaCopy,
  siteConfig,
  submitLead,
}: {
  topicKey: string;
  label: string;
  /** Resolved topic CTA copy (caller provides from site taxonomy). */
  topicCtaCopy?: string;
  siteConfig: MiniCaptureConfig;
  submitLead: MiniCaptureSubmitFn;
}) {
  return (
    <MiniCapture
      formId="mobile_tool"
      messagePrefix={`[Mobile tool: ${topicKey}]`}
      heading={topicCtaCopy || `Get your ${label} figure`}
      blurb="Our interactive tool is built for a larger screen. Tell us your numbers and a specialist will send your figure and the next sensible step, with no obligation."
      submitLabel="Send me my figure"
      className="rounded-2xl border-l-4 border-[var(--brand-primary)] bg-slate-50 p-5 sm:p-6"
      postSubmit="redirect"
      siteConfig={siteConfig}
      submitLead={submitLead}
    />
  );
}
