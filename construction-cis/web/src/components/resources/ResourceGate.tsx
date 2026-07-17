/**
 * Qualified lead-capture form for Trade Tax Specialists resource slots.
 *
 * Replaces the email-gated download unlock (retired 2026-07-18, estate-wide:
 * the email gate was not converting). The guide and xlsx are now open resources;
 * this slot asks for a free-review enquiry instead. Mirrors Property's
 * GateOrForm pattern (MiniCapture, no email-unlock).
 *
 * Call sites still pass copy / split / placement / category; those props are
 * accepted for compatibility but no longer used (the email-unlock UI they drove
 * is gone). Brand tokens: orange #f97316 + slate-900.
 */
import type { TopicKey } from "@/lib/intent/taxonomy";
import { getTopic } from "@/lib/intent/taxonomy";
import { hasEnabledResource } from "@/lib/resources/registry";
import { MiniCapture } from "@/components/forms/MiniCapture";
import type { GateCopy } from "@/lib/resources/copy";

export function ResourceGate({
  topic,
}: {
  topic: TopicKey;
  copy?: GateCopy;
  split?: boolean;
  placement?: string;
  category?: string;
}) {
  if (!hasEnabledResource(topic)) return null;
  const t = getTopic(topic);
  return (
    <MiniCapture
      formId="resource_block"
      role="resource"
      messagePrefix={`[Resource block: ${topic}]`}
      heading={t?.ctaCopy ?? "Get a free review of your CIS position"}
      blurb="Tell us about your situation and a CIS specialist will review it and the most practical next step, with no obligation."
      submitLabel="Request my free review"
      className="my-10 rounded-2xl border-l-4 border-orange-500 bg-slate-50 p-6 sm:p-8"
    />
  );
}
