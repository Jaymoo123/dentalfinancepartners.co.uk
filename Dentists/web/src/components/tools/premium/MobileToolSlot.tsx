"use client";

/**
 * Mobile tool slot for the Dentists premium calculator tier.
 *
 * The premium interactive tools are desktop-only (chart and slider heavy). On
 * mobile, this slot wraps MiniCapture in a topic-aware qualified lead capture so
 * mobile intent converts rather than dead-ending. Rendered inside PremiumUpgrade's
 * sm:hidden block.
 *
 * TOKEN DISCIPLINE: Dentists does NOT define --primary. Uses var(--gold) for the
 * left accent border (matching the Dentists MiniCapture default). No var(--primary).
 *
 * MobileToolSlot notes per brief Section 3:
 *   - formId="mobile_tool"
 *   - messagePrefix="[Mobile tool: {topic}]"
 *   - role="Other"
 *   - heading = topic ctaCopy
 *   - blurb = fixed tool-is-desktop copy
 *   - submitLabel="Send me my figure"
 *   - className with left gold border + surface-elevated background
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
      blurb="Our interactive tool is built for a larger screen. Tell us your practice numbers and a specialist dental accountant will send your figure and the sensible next step, with no obligation."
      submitLabel="Send me my figure"
      className="rounded-2xl border-l-4 border-[var(--gold)] bg-[var(--surface-elevated)] p-5 sm:p-6"
    />
  );
}
