"use client";

/**
 * Mobile tool slot for the Medical Accountants UK premium calculator tier.
 *
 * The premium interactive tools are desktop-only (chart and slider heavy). On
 * mobile, this slot wraps MiniCapture in a topic-aware qualified lead capture so
 * mobile intent converts rather than dead-ending. Rendered inside PremiumUpgrade's
 * sm:hidden block.
 *
 * TOKEN DISCIPLINE: Medical uses var(--gold) (alias -> copper #b87333) for the
 * left accent border. NEVER var(--primary).
 *
 * MobileToolSlot notes per brief Section 4:
 *   - formId="mobile_tool"
 *   - messagePrefix="[Mobile tool: {topic}]"
 *   - role="Other"
 *   - heading = topic ctaCopy
 *   - blurb = fixed tool-is-desktop copy (medical specialist copy, no DJH)
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
      blurb="Our interactive tool is built for a larger screen. Tell us your situation and a specialist medical accountant will send your figure and the sensible next step, with no obligation."
      submitLabel="Send me my figure"
      className="rounded-2xl border-l-4 border-[var(--gold)] bg-[var(--surface-elevated)] p-5 sm:p-6"
    />
  );
}
