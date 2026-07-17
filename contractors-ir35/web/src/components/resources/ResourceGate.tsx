"use client";

/**
 * Qualified lead-capture form for Contractor Tax Accountants resource slots.
 *
 * Replaces the email-gated download unlock (retired 2026-07-18, estate-wide
 * de-gate: the email gate was not converting). The guide + xlsx are now open
 * resources; this slot asks for a free-review enquiry instead. Mirrors
 * Property's GateOrForm pattern (MiniCapture, no email-unlock).
 *
 * Signature is kept backwards-compatible (copy / split / placement / category
 * are accepted but no longer drive an email gate) so existing callers compile
 * unchanged. Petrol-cyan (#0e7490) + amber palette via MiniCapture.
 */
import type { TopicKey } from "@/lib/intent/taxonomy";
import { getTopic } from "@/lib/intent/taxonomy";
import { hasEnabledResource } from "@/lib/resources/registry";
import { MiniCapture } from "@/components/forms/MiniCapture";
import type { GateCopy } from "@/lib/resources/copy";

export function ResourceGate({
  topic,
  copy,
}: {
  topic: TopicKey;
  /** Optional heading/blurb override (legacy prop; heading is reused). */
  copy?: GateCopy;
  /** Legacy layout/analytics props, no longer used since the gate retired. */
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
      heading={copy?.heading || t?.ctaCopy || "Get a free review of your contractor tax position"}
      blurb="Tell us about your situation and a specialist will confirm the numbers for your contract and the most efficient next step, with no obligation."
      submitLabel="Request my free review"
      className="not-prose my-10 rounded-2xl border-l-4 border-cyan-700 bg-neutral-50 p-6 sm:p-8"
    />
  );
}
