"use client";

/**
 * Resource block. Shipped default (was the gate_to_form treatment): a topic-aware
 * qualified "free review" capture in the slot, replacing the email-gated Excel
 * download that nobody unlocked (50 views, 0 unlocks).
 */
import { MiniCapture } from "@/components/forms/MiniCapture";
import { getTopic, type TopicKey } from "@/lib/intent/taxonomy";
import type { GateCopy } from "@/lib/resources/copy";

export function GateOrForm({
  topic,
}: {
  topic: TopicKey;
  copy: GateCopy;
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
      className="my-10 rounded-2xl border-l-4 border-emerald-600 bg-slate-50 p-6 sm:p-8"
      postSubmit="redirect"
    />
  );
}
