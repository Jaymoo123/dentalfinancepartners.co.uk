"use client";

/**
 * Mobile tool slot for the generalist premium calculator fleet.
 *
 * The interactive premium tools are desktop-only (sliders and charts are
 * cramped on mobile). On mobile, this slot renders a topic-aware qualified
 * capture so mobile intent converts rather than dead-ending.
 *
 * Rendered inside PremiumUpgrade's `sm:hidden` block. Styled with
 * generalist orange-600.
 */

import { MiniCapture } from "@/components/forms/MiniCapture";
import { getTopic, type TopicKey } from "@/lib/intent/taxonomy";

export function MobileToolSlot({ topic, label }: { topic: TopicKey; label: string }) {
  const t = getTopic(topic);
  return (
    <MiniCapture
      formId="mobile_tool"
      messagePrefix={`[Mobile tool: ${topic}]`}
      heading={t?.ctaCopy ?? `Get your ${label} figure`}
      blurb="Our interactive tool is designed for a larger screen. Leave your details and a specialist will send your figure and the next sensible step, with no obligation."
      submitLabel="Send me my figure"
      className="rounded-2xl border-l-4 border-orange-600 bg-slate-50 p-5 sm:p-6"
    />
  );
}
