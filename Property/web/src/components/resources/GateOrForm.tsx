"use client";

/**
 * Resource block. Shipped default (was the gate_to_form treatment): a topic-aware
 * qualified "free review" capture in the slot, replacing the email-gated Excel
 * download that nobody unlocked (50 views, 0 unlocks).
 *
 * The losing arm (ResourceGate + ResourceGateLazy + ExcelPreview + the
 * /api/resources/deliver route) was deleted 2026-08-16, two months after
 * f90f6cca hard-wired this winner and left it unreachable. The `copy`, `split`,
 * `placement` and `category` props went with it: they only ever fed the gate,
 * and callers were still computing gateCopy() for a value nothing read.
 */
import { MiniCapture } from "@/components/forms/MiniCapture";
import { getTopic, type TopicKey } from "@/lib/intent/taxonomy";

export function GateOrForm({ topic }: { topic: TopicKey }) {
  const t = getTopic(topic);
  return (
    <MiniCapture
      formId="resource_block"
      messagePrefix={`[Resource block: ${topic}]`}
      heading={t?.ctaCopy || "Get a free review of your situation"}
      blurb="Skip the spreadsheet. Tell us about your situation and a specialist will review your position and the next sensible step, with no obligation."
      submitLabel="Request my free review"
      className="my-10 rounded-xl bg-slate-50 p-6 sm:p-8"
      postSubmit="redirect"
    />
  );
}
