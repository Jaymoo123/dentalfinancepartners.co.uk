"use client";

/**
 * Mobile tool slot for the Agency Founder Finance premium calculator tier.
 *
 * The premium interactive tools are desktop-only (chart and slider heavy). On
 * mobile, this slot wraps MiniCapture in a topic-aware qualified lead capture so
 * mobile intent converts rather than dead-ending. Rendered inside PremiumUpgrade's
 * sm:hidden block.
 *
 * TOKEN DISCIPLINE: Agency Founder Finance uses var(--accent) #4f46e5 (indigo).
 * Left border uses var(--accent) (the Dentists source used var(--gold); re-tokened).
 * This site does NOT define --gold, --navy or --dark.
 *
 * Per brief Section 4 (MobileToolSlot):
 *   - formId="mobile_tool"
 *   - messagePrefix="[Mobile tool: {topic}]"
 *   - heading = topic ctaCopy
 *   - blurb = agency desktop-tool copy
 *   - submitLabel="Send me my figure"
 *   - className with left accent border + surface-elevated background
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
      blurb="Our interactive tool is built for a larger screen. Tell us your agency numbers and an agency finance specialist will send your figure and the sensible next step, with no obligation."
      submitLabel="Send me my figure"
      className="rounded-2xl border-l-4 border-[var(--accent)] bg-[var(--surface-elevated)] p-5 sm:p-6"
    />
  );
}
