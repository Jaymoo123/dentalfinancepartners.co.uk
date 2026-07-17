"use client";

/**
 * Blog/calculator slot: qualified "free review" lead capture.
 *
 * ponytail: email-gate (ResourceGate) retired 2026-07-17 — Property pattern
 * mirrored. Guide/xlsx content is now open; this slot captures qualified leads
 * instead. ResourceGate.tsx kept on disk but no longer used by this path.
 */
import { MiniCapture } from "@/components/forms/MiniCapture";
import { getTopic, type TopicKey } from "@/lib/intent/taxonomy";
import type { GateCopy } from "@/lib/resources/copy";

export function GateOrForm({
  topic,
}: {
  topic: TopicKey;
  /** Accepted but ignored — kept for call-site compatibility. */
  copy?: GateCopy;
  split?: boolean;
  placement?: string;
  category?: string;
}) {
  const t = getTopic(topic);
  return (
    <MiniCapture
      formId="resource_block"
      messagePrefix={`[Resource block: ${topic}]`}
      heading={t?.ctaCopy || "Get a free review of your situation"}
      blurb="Skip the spreadsheet. Tell us about your situation and a specialist will review your position and the next sensible step, with no obligation."
      submitLabel="Request my free review"
      className="my-10 rounded-2xl border-l-4 border-orange-600 bg-slate-50 p-6 sm:p-8"
    />
  );
}
