"use client";

/**
 * Mobile tool slot for the contractors-ir35 premium calculator tier.
 *
 * The premium interactive tools are desktop-only (chart and slider heavy). On
 * mobile, this slot wraps MiniCapture in a topic-aware qualified lead capture so
 * mobile intent converts rather than dead-ending. Rendered inside PremiumUpgrade's
 * sm:hidden block.
 *
 * TOKEN DISCIPLINE: cfp does NOT define --gold, --navy or --dark. Uses var(--accent)
 * for the left accent border (petrol-cyan #0e7490). No --gold, --navy or --dark here.
 *
 * MobileToolSlot per brief Section 4:
 *   - formId="mobile_tool"
 *   - messagePrefix="[Mobile tool: {topic}]"
 *   - role="Other"
 *   - heading = topic ctaCopy
 *   - blurb = contractor desktop-tool copy
 *   - submitLabel="Send me my figure"
 *   - className with left var(--accent) border + surface-elevated background
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
      heading={t?.ctaCopy || "Get your figure from a contractor specialist"}
      blurb="Our interactive tool is built for a larger screen. Tell us your contracting situation and a contractor specialist will send you the figures and the sensible next step, with no obligation."
      submitLabel="Send me my figure"
      className="rounded-2xl border-l-4 border-[var(--accent)] bg-neutral-50 p-5 sm:p-6"
    />
  );
}
