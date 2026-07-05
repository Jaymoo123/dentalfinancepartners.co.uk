"use client";

/**
 * Mobile tool slot for the Solicitors premium calculator tier.
 *
 * The premium interactive tools are desktop-only (chart and slider heavy). On
 * mobile, this slot wraps MiniCapture in a topic-aware qualified lead capture so
 * mobile intent converts rather than dead-ending. Rendered inside PremiumUpgrade's
 * sm:hidden block.
 *
 * Styled with the site's CSS variable tokens (no new npm dependencies).
 */
import { MiniCapture } from "@/components/forms/MiniCapture";
import { getTopic, type TopicKey } from "@/lib/intent/taxonomy";

export function MobileToolSlot({ topic }: { topic: TopicKey }) {
  const t = getTopic(topic);
  return (
    <MiniCapture
      formId="mobile_tool"
      messagePrefix={`[Mobile tool: ${topic}]`}
      role="Other"
      heading={t?.ctaCopy || "Get your figure from a specialist"}
      blurb="Our interactive tool is built for a larger screen. Tell us your firm's numbers and a specialist solicitors' accountant will send your figure and the sensible next step, with no obligation."
      submitLabel="Send me my figure"
      className="rounded-2xl border-l-4 border-[var(--primary)] bg-[var(--surface-elevated)] p-5 sm:p-6"
    />
  );
}
