"use client";

/**
 * Mobile tool slot. The premium tools are desktop-only; on mobile this slot used
 * to be a dead-end "open on desktop" prompt. Shipped default (was the
 * mobile_tool_capture treatment): a topic-aware qualified capture so mobile intent
 * converts instead of bouncing. Rendered inside PremiumUpgrade's mobile-only
 * (`sm:hidden`) block.
 */
import { MiniCapture } from "@/components/forms/MiniCapture";
import { getTopic, type TopicKey } from "@/lib/intent/taxonomy";

export function MobileToolSlot({ topic, label }: { topic: TopicKey; label: string }) {
  const t = getTopic(topic);
  return (
    <MiniCapture
      formId="mobile_tool"
      messagePrefix={`[Mobile tool: ${topic}]`}
      heading={t?.ctaCopy || `Get your ${label} figure`}
      blurb="Our interactive tool is built for a larger screen. Tell us your numbers and a specialist will send your figure and the next sensible step, with no obligation."
      submitLabel="Send me my figure"
      className="rounded-2xl border-l-4 border-emerald-600 bg-slate-50 p-5 sm:p-6"
    />
  );
}
